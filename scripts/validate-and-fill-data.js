//@ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ogs = require("open-graph-scraper");

const datafile = path.join(process.cwd(), "data.yml");
const rawData = fs.readFileSync(datafile, "utf-8");

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
 * @typedef Entry
 * @property {string} url
 * @property {string} publishedOn
 * @property {Source | undefined} source
 * @property {string[]} tags
 */

/**
 * @typedef Schema
 * @property {Tag[]} tags
 * @property {Source[]} sources
 * @property {SourceType[]} sourceTypes
 * @property {Entry[]} entries
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
 * @param {Entry} entry
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
 * @param {Entry} entry
 */
function validateEntry(entry) {
  const warnings = [];

  for (const attr of ["title", "tags", "publishedOn"]) {
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
  if (entry.source == null) {
    warnings.push(`failed to determine source`);
  }

  if (warnings.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`${entry.url}\n${warnings.map((w) => `- ${w}`).join("\n")}\n`);
  }
}

void Promise.all(
  data.entries.map((entry) => {
    return (
      ogs({ url: entry.url })
        .then(({ result }) => {
          if (result.success) {
            return { ...entry, title: result.ogTitle };
          }
          throw result.error;
        })
        // fill mediaType
        .then((entry) => ({ ...entry, source: inferSource(entry) }))
        // sort tags
        .then((entry) => ({ ...entry, tags: entry.tags.sort() }))
        // validate
        .then((entry) => {
          validateEntry(entry);
          return entry;
        })
    );
  })
)
  .then((entries) => {
    return entries.sort((e1, e2) => new Date(e2.publishedOn).getTime() - new Date(e1.publishedOn).getTime());
  })
  .then((entries) => {
    fs.writeFileSync(
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
  });
