//@ts-check

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ogs = require("open-graph-scraper");

const datafile = path.join(process.cwd(), "data.yml");
const rawData = fs.readFileSync(datafile, "utf-8");

/**
 * @typedef Entry
 * @property {string} url
 * @property {string} publishedOn
 * @property {string[]} tags
 * @property {string} mediaType
 */

/**
 * @typedef Schema
 * @property {string[]} tags
 * @property {string[]} mediaTypes
 * @property {Entry[]} entries
 */

// prettier-ignore
const data = /** @type {Schema} */ (yaml.load(rawData));

const tagSet = new Set(data.tags);
const mediaTypeSet = new Set(data.mediaTypes);

for (const entry of data.entries) {
  const unknownTags = entry.tags.filter((t) => !tagSet.has(t));
  if (unknownTags.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`unknown tags are found: ${unknownTags}`);
  }
  const unknownMediaTypes = [entry.mediaType].filter((t) => !mediaTypeSet.has(t));
  if (unknownMediaTypes.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`unknown mediaTypes are found: ${unknownMediaTypes}`);
  }
}

void Promise.all(
  data.entries.map((entry) => {
    return ogs({ url: entry.url }).then(({ result }) => {
      if (result.success) {
        return { ...entry, title: result.ogTitle };
      }
      throw result.error;
    });
  })
).then((entries) => {
  fs.writeFileSync(datafile, yaml.dump({ ...data, entries }), "utf-8");
});
