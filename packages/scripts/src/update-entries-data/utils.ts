import fs from "fs/promises";
import yaml from "js-yaml";
import ogs from "open-graph-scraper";
import path from "path";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { remarkH1AsTitle } from "remark-h1-as-title";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { ArticleEntry, ExternalEntry, Schema, Source, Tag } from "./types.js";

export function getTagMap(schema: Schema): Record<string, Tag> {
  const tagByName = schema.tags.reduce((obj, tag) => ({ ...obj, [tag.name]: tag }), {} as Record<string, Tag>);

  for (const tag of schema.tags) {
    const warnings = [];

    if (tag.name == null) warnings.push("name is required");
    if (!tag.name.match(/^\w[\w\-]+$/)) warnings.push("name is invalid format");
    if (tag.displayName == null) warnings.push("displayName is required");
    for (const dt of tag.dependsOn ?? []) {
      // eslint-disable-next-line no-console
      if (tagByName[dt] == null) warnings.push(`dependent tag "${dt}" is not defined`);
    }

    if (warnings.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(`${tag.name}\n${warnings.map((w) => `- ${w}`).join("\n")}\n`);
    }
  }

  return tagByName;
}

export async function fillExternalEntryMetadataFromWeb(
  entry: ExternalEntry,
  { skip }: { skip: boolean }
): Promise<ExternalEntry> {
  if (skip) return entry;

  try {
    const { result } = await ogs({ url: entry.url, timeout: 10 * 1000 });
    if (result.success) {
      return { ...entry, title: result.ogTitle };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("failed to fetch metadata: `${entry.title}`");
  }
  return entry;
}

export function inferSource(entry: ExternalEntry, schema: Schema): Source | undefined {
  for (const src of schema.sources) {
    if (new RegExp(src.urlPattern).test(entry.url)) {
      return { ...src };
    }
  }
}

export function refineTitle(entry: ExternalEntry): string | undefined {
  if (entry.title == null) return entry.title;
  switch (entry.source?.name) {
    case "GitHub": {
      return entry.title.replace(/^GitHub - /, "").replace(/^[\w\-]+\//, "");
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

export function validateEntry(
  entry: ExternalEntry | ArticleEntry,
  tagByName: Record<string, Tag & { dependsOn?: string[] }>
) {
  const warnings = [];

  for (const attr of ["title", "tags", "publishedOn", "picked"] as const) {
    if (entry[attr] == null) {
      warnings.push(`${attr} is required`);
    }
  }

  for (const t of entry.tags) {
    if (tagByName[t.name] == null) warnings.push(`tag "${t.name}" is not defined`);
    for (const dt of tagByName[t.name]?.dependsOn ?? []) {
      if (!entry.tags.find((t) => t.name === dt)) {
        warnings.push(`tag "${dt}" is required because depended by "${t.name}"`);
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

export async function loadArticleEntries(): Promise<ArticleEntry[]> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkH1AsTitle)
    .use(remarkExtractFrontmatter, { yaml: yaml.load });
  const dir = path.join(process.cwd(), "_articles");
  const filenames = await fs.readdir(dir);
  return Promise.all(
    filenames.map(async (filename): Promise<ArticleEntry> => {
      const [_basename, publishedOn, pathSuffix] =
        path.basename(filename, ".md").match(/(\d{4}-\d{2}-\d{2})-(.*)/) ?? [];
      const body = await fs.readFile(path.join(dir, filename), { encoding: "utf8" });
      const result = await processor.process(body);
      return {
        title: result.data.title as string,
        publishedOn,
        updatedOn: result.data.updatedOn as string,
        tags: (result.data.tags as string[]).map((name) => ({ name })),
        path: `/blog/${publishedOn.replace(/-/g, "/")}/${pathSuffix}`,
        picked: false,
        source: {
          type: "article",
          name: "izum.in/blog",
        },
      };
    })
  );
}
