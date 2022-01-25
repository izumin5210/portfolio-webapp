import fs from "fs/promises";
import yaml from "js-yaml";
import path from "path";
import { ExternalEntry, Schema } from "./types.js";
import {
  fillExternalEntryMetadataFromWeb,
  getTagMap,
  inferSource,
  loadArticleEntries,
  refineTitle,
  validateEntry,
} from "./utils.js";

export async function updateEntriesData({ skipFetchingOg }: { skipFetchingOg: boolean }) {
  const datafile = path.join(process.cwd(), "data.yml");
  const rawData = await fs.readFile(datafile, "utf-8");

  const data = yaml.load(rawData) as Schema;
  const tagByName = getTagMap(data);

  await Promise.all([
    Promise.all(
      data.entries
        .filter((entry): entry is ExternalEntry => !("path" in entry))
        .map((entry) =>
          fillExternalEntryMetadataFromWeb(entry, { skip: skipFetchingOg })
            .then((entry) => ({ ...entry, source: inferSource(entry, data) }))
            .then((entry) => ({ ...entry, title: refineTitle(entry) }))
            .then((entry) => ({ ...entry, picked: entry.picked ?? false }))
        )
    ),
    loadArticleEntries(),
  ])
    .then(([entries1, entries2]) => [...entries1, ...entries2])
    // fill displayName of tags
    .then((entries) =>
      entries.map((entry) => ({
        ...entry,
        tags: entry.tags.map(({ name }) => /** @type {Tag} */ ({ name, displayName: tagByName[name].displayName })),
      }))
    )
    // sort tags
    .then((entries) =>
      entries.map((entry) => ({
        ...entry,
        tags: entry.tags.sort((t1, t2) => {
          if (t1.name < t2.name) return -1;
          if (t1.name > t2.name) return 1;
          return 0;
        }),
      }))
    )
    // validate
    .then((entries) => {
      for (const entry of entries) {
        validateEntry(entry, tagByName);
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
}
