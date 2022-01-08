//@ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

import { readFileSync } from "fs";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import ogs from "open-graph-scraper";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkStringify from "remark-stringify";

const datafile = path.join(process.cwd(), "data.yml");
const rawData = readFileSync(datafile, "utf-8");

/**
 * @typedef Source
 * @property {string} name
 * @property {string} type
 * @property {string} urlPattern
 */

/**
 * @typedef SourceType
 * @property {string} name
 */

/**
 * @typedef Tag
 * @property {string} name
 * @property {string[] | undefined} dependsOn
 */

/**
 * @typedef ArticleEntry
 * @property {string | undefined} title
 * @property {string} path
 * @property {string} publishedOn
 * @property {string[]} tags
 * @property {boolean} picked
 */

/**
 * @typedef ExternalEntry
 * @property {string | undefined} title
 * @property {string} url
 * @property {string} publishedOn
 * @property {Source | undefined} source
 * @property {string[]} tags
 * @property {boolean} picked
 */

/**
 * @typedef Schema
 * @property {Tag[]} tags
 * @property {Source[]} sources
 * @property {SourceType[]} sourceTypes
 * @property {(ArticleEntry | ExternalEntry)[]} entries
 */

// prettier-ignore
const data = /** @type {Schema} */ (yaml.load(rawData));

const tagByName = data.tags.reduce(
  (obj, tag) => ({ ...obj, [tag.name]: tag }),
  /** @type {Object<string, Tag>} */ ({})
);

for (const tag of data.tags) {
  for (const dt of tag.dependsOn ?? []) {
    // eslint-disable-next-line no-console
    if (tagByName[dt] == null) console.warn(`tag "${dt}" is not defined`);
  }
}

/**
 * @param {ExternalEntry} entry
 * @return {Source | undefined}
 */
function inferSource(entry) {
  for (const src of data.sources) {
    if (new RegExp(src.urlPattern).test(entry.url)) {
      return { ...src };
    }
  }
}

/**
 * @param {ExternalEntry} entry
 * @return {string | undefined}
 */
function refineTitle(entry) {
  if (entry.title == null) return entry.title;
  switch (entry.source?.name) {
    case "GitHub": {
      return entry.title.replace(/^GitHub - /, "");
    }
    case "Qiita": {
      return entry.title.replace(/ - Qiita$/, "");
    }
    case "Wantedly Engineer Blog": {
      return entry.title.replace(/ \| Wantedly Engineer Blog$/, "");
    }
    case "Wantedly Engineering Podcast": {
      return entry.title.replace(/ by Wantedly Engineering Podcast$/, "");
    }
    default: {
      return entry.title;
    }
  }
}

/**
 * @param {ExternalEntry|ArticleEntry} entry
 */
function validateEntry(entry) {
  const warnings = [];

  for (const attr of ["title", "tags", "publishedOn", "picked"]) {
    if (/** @type {any} */ (entry)[attr] == null) {
      warnings.push(`${attr} is required`);
    }
  }

  for (const t of entry.tags) {
    // eslint-disable-next-line no-console
    if (tagByName[t] == null) warnings.push(`tag "${t}" is not defined`);
    for (const dt of tagByName[t]?.dependsOn ?? []) {
      if (!entry.tags.includes(dt)) {
        warnings.push(`tag "${dt}" is required because depended by "${t}"`);
      }
    }
  }

  if (!("path" in entry)) {
    if (entry.source == null) {
      warnings.push(`failed to determine source`);
    }

    if (warnings.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(`${entry.url}\n${warnings.map((w) => `- ${w}`).join("\n")}\n`);
    }
  }
}

/**
 * @returns {Promise<ArticleEntry[]>}
 */
async function loadArticleEntries() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml.load });
  const dir = path.join(process.cwd(), "_articles");
  const filenames = await fs.readdir(dir);
  return Promise.all(
    filenames.map(async (filename) => {
      const body = await fs.readFile(path.join(dir, filename), { encoding: "utf8" });
      const result = await processor.process(body);
      return {
        title: /** @type{string} */ (result.data.title),
        publishedOn: /** @type{string} */ (result.data.publishedOn),
        tags: /** @type{string[]} */ (result.data.tags),
        path: `/articles/${path.basename(filename, ".md")}`,
        picked: false,
        source: {
          type: "article",
          name: "izum.in/blog",
        },
      };
    })
  );
}

void Promise.all([
  Promise.all(
    /** @type {ExternalEntry[]} */ (data.entries.filter((entry) => !("path" in entry))).map((entry) => {
      return ogs({ url: entry.url, timeout: 10 * 1000 })
        .then(({ result }) => {
          if (result.success) {
            return { ...entry, title: result.ogTitle };
          }
          // eslint-disable-next-line no-console
          console.error(`failed to fetch title: ${entry.url}`);
          return entry;
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error(`failed to fetch title: ${entry.url}`);
          return entry;
        })
        .then((entry) => ({ ...entry, source: inferSource(entry) }))
        .then((entry) => ({ ...entry, title: refineTitle(entry) }))
        .then((entry) => ({ ...entry, picked: entry.picked ?? false }));
    })
  ),
  loadArticleEntries(),
])
  .then(([entries1, entries2]) => [...entries1, ...entries2])
  // sort tags
  .then((entries) => entries.map((entry) => ({ ...entry, tags: entry.tags.sort() })))
  // validate
  .then((entries) => {
    for (const entry of entries) {
      validateEntry(entry);
    }
    return entries;
  })
  .then((entries) => {
    return entries.sort((e1, e2) => new Date(e2.publishedOn).getTime() - new Date(e1.publishedOn).getTime());
  })
  .then(async (entries) => {
    await fs.writeFile(
      datafile,
      yaml.dump({
        ...data,
        sources: data.sources.sort((s1, s2) => {
          if (s1.name < s2.name) return -1;
          if (s1.name > s2.name) return 1;
          return 0;
        }),
        sourceTypes: data.sourceTypes.sort((s1, s2) => {
          if (s1.name < s2.name) return -1;
          if (s1.name > s2.name) return 1;
          return 0;
        }),
        tags: data.tags.sort((t1, t2) => {
          if (t1.name < t2.name) return -1;
          if (t1.name > t2.name) return 1;
          return 0;
        }),
        entries,
      }),
      "utf-8"
    );
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
