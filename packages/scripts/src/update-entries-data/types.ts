export type Source = {
  name: string;
  type: string;
};

export type SourceType = {
  name: string;
};

export type Tag = {
  name: string;
  displayName?: string;
};

export type ArticleEntry = {
  uuid: string;
  title: string | undefined;
  path: string;
  publishedOn: string;
  source: Source;
  updatedOn: string;
  tags: Tag[];
  picked: boolean;
};

export type ExternalEntry = {
  uuid: string;
  title: string | undefined;
  url: string;
  publishedOn: string;
  source: Source | undefined;
  tags: Tag[];
  picked: boolean;
};

export type Schema = {
  tags: (Tag & { dependsOn?: string[] })[];
  sources: (Source & { urlPattern: string })[];
  sourceTypes: SourceType[];
  entries: (ArticleEntry | ExternalEntry)[];
};
