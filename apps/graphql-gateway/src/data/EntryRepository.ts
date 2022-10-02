import * as fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { ArticleEntry, DateString, Entry, isArticleEntry } from "./types";

export class EntryRepository {
  private readonly data: {
    entries: Entry[];
  };

  constructor() {
    const rawData = fs.readFileSync(path.join(process.cwd(), "..", "..", "data.yml"), "utf-8");
    const parsedData = yaml.load(rawData) as any;
    this.data = {
      entries: (parsedData.entries as Entry[]).sort((e1, e2) => -compareDate(e1.publishedOn, e2.publishedOn)),
    };
  }

  public async listEntries(props: {
    pageToken: string | undefined;
    pageSize: number;
  }): Promise<[entries: Entry[], nextPageToken: string | undefined]> {
    return this.paginateEntries(this.data.entries, props);
  }

  public async listEntriesByTags({
    tags,
    ...props
  }: {
    tags: string[];
    pageToken: string | undefined;
    pageSize: number;
  }): Promise<[entries: Entry[], nextPageToken: string | undefined]> {
    const tagSet = new Set(tags);
    const entries = this.data.entries.filter((e) => e.tags.map((t) => t.name).some((t) => tagSet.has(t)));
    return this.paginateEntries(entries, props);
  }

  public async listPickedEntries(): Promise<Entry[]> {
    return this.data.entries.filter((e) => e.picked);
  }

  public async listArticleEntries(props: {
    pageToken: string | undefined;
    pageSize: number;
  }): Promise<[entries: ArticleEntry[], nextPageToken: string | undefined]> {
    const entries = this.data.entries.filter(isArticleEntry);
    return this.paginateEntries(entries, props);
  }

  public async getArticleEntryByPath(path: string): Promise<ArticleEntry | null> {
    return this.data.entries.find((e): e is ArticleEntry => isArticleEntry(e) && e.path === path) ?? null;
  }

  private paginateEntries<T extends { uuid: string }>(
    entries: T[],
    props: {
      pageToken: string | undefined;
      pageSize: number;
    }
  ): [entries: T[], nextPageToken: string | undefined] {
    let startIdx = 0;
    if (props.pageToken != null) {
      const lastItemIdx = entries.findIndex((e) => e.uuid === props.pageToken);
      if (lastItemIdx === -1) throw new Error(`invalid page token: ${props.pageToken}`);
      startIdx = lastItemIdx + 1;
    }
    const paginatedEntries = entries.slice(startIdx, startIdx + props.pageSize);
    const nextPageToken = paginatedEntries[paginatedEntries.length - 1]?.uuid;

    return [paginatedEntries, nextPageToken];
  }
}

function dateStringToObject(str: DateString): { year: number; month: number; day: number } {
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m == null) {
    throw new Error(`invalid date: ${str}`);
  }
  return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
}

function compareDate(ds1: DateString, ds2: DateString): number {
  const d1 = dateStringToObject(ds1);
  const d2 = dateStringToObject(ds2);
  if (d1.year !== d2.year) return d1.year - d2.year;
  if (d1.month !== d2.month) return d1.month - d2.month;
  return d1.day - d2.day;
}
