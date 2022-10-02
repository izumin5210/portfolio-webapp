type D = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YY = `19${D}${D}` | `20${D}${D}`;
type MM = `${0}${Exclude<D, 0>}` | `${1}${0 | 1 | 2}`;
type DD = `${0 | 1 | 2 | 3}${D}`;
export type DateString = `${YY}-${MM}-${DD}`;

const entrySourceTypes = ["externalArticle", "oss", "podcast", "slide", "article"] as const;
export type EntrySourceType = typeof entrySourceTypes[number];

export type EntrySource<Type extends EntrySourceType> = { name: string; type: Type };

export type EntryTag = { name: string; displayName: string };

export type Entry = ExternalEntry | ArticleEntry;

export type ExternalEntry = {
  uuid: string;
  title: string;
  url: string;
  publishedOn: DateString;
  updatedOn: DateString | null;
  source: EntrySource<"externalArticle" | "oss" | "podcast" | "slide">;
  tags: EntryTag[];
  picked: boolean;
};

export type ArticleEntry = {
  uuid: string;
  title: string;
  path: string;
  publishedOn: DateString;
  updatedOn: DateString | null;
  source: EntrySource<"article">;
  tags: EntryTag[];
  picked: boolean;
};

export function isArticleEntry(e: Entry): e is ArticleEntry {
  return e.source.type === "article";
}

export type ArticleEntryBody = {
  markdown: string;
};
