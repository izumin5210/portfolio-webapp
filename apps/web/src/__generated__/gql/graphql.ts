/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: unknown;
};

export type ArticleEntry = {
  readonly body: ArticleEntryBody;
  readonly id: Scalars["ID"];
  readonly path: Scalars["String"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
  readonly uuid: Scalars["String"];
};

export type ArticleEntryBody = {
  readonly markdown: Scalars["String"];
};

export type ArticleEntryConnection = {
  readonly edges: ReadonlyArray<Maybe<ArticleEntryEdge>>;
  readonly pageInfo: PageInfo;
};

export type ArticleEntryEdge = {
  readonly cursor: Scalars["String"];
  readonly node: ArticleEntry;
};

export type Entry = ArticleEntry | ExternalArticleEntry | OssEntry | PodcastEntry | SlideEntry;

export type EntryConnection = {
  readonly edges: ReadonlyArray<Maybe<EntryEdge>>;
  readonly pageInfo: PageInfo;
};

export type EntryEdge = {
  readonly cursor: Scalars["String"];
  readonly node: Entry;
};

export type EntrySource = {
  readonly name: Scalars["String"];
};

export type EntryTag = {
  readonly displayName: Scalars["String"];
  readonly name: Scalars["String"];
};

export type ExternalArticleEntry = {
  readonly id: Scalars["ID"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
  readonly url: Scalars["String"];
  readonly uuid: Scalars["String"];
};

export type OssEntry = {
  readonly id: Scalars["ID"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
  readonly url: Scalars["String"];
  readonly uuid: Scalars["String"];
};

export type PageInfo = {
  readonly endCursor: Maybe<Scalars["String"]>;
  readonly hasNextPage: Scalars["Boolean"];
  readonly hasPreviousPage: Scalars["Boolean"];
  readonly startCursor: Maybe<Scalars["String"]>;
};

export type PodcastEntry = {
  readonly id: Scalars["ID"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
  readonly url: Scalars["String"];
  readonly uuid: Scalars["String"];
};

export type Query = {
  readonly articleEntries: ArticleEntryConnection;
  readonly articleEntryByPath: Maybe<ArticleEntry>;
  readonly entries: EntryConnection;
  readonly entriesByTags: EntryConnection;
  readonly pickedEntries: ReadonlyArray<Entry>;
};

export type QueryArticleEntriesArgs = {
  after: InputMaybe<Scalars["String"]>;
  before: InputMaybe<Scalars["String"]>;
  first: InputMaybe<Scalars["Int"]>;
  last: InputMaybe<Scalars["Int"]>;
};

export type QueryArticleEntryByPathArgs = {
  path: Scalars["String"];
};

export type QueryEntriesArgs = {
  after: InputMaybe<Scalars["String"]>;
  before: InputMaybe<Scalars["String"]>;
  first: InputMaybe<Scalars["Int"]>;
  last: InputMaybe<Scalars["Int"]>;
};

export type QueryEntriesByTagsArgs = {
  after: InputMaybe<Scalars["String"]>;
  before: InputMaybe<Scalars["String"]>;
  first: InputMaybe<Scalars["Int"]>;
  last: InputMaybe<Scalars["Int"]>;
  tags: ReadonlyArray<Scalars["String"]>;
};

export type SlideEntry = {
  readonly id: Scalars["ID"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
  readonly url: Scalars["String"];
  readonly uuid: Scalars["String"];
};

export type BlogArticleFragment = {
  readonly id: string;
  readonly title: string;
  readonly publishedOn: unknown;
  readonly updatedOn: unknown | null;
  readonly body: { readonly markdown: string };
  readonly tags: ReadonlyArray<{ readonly name: string; readonly displayName: string }>;
} & { " $fragmentName": "BlogArticleFragment" };

export type GetBlogArticleOgImagePageQueryVariables = Exact<{
  articlePath: Scalars["String"];
}>;

export type GetBlogArticleOgImagePageQuery = {
  readonly articleEntryByPath: {
    " $fragmentRefs": { BlogArticleOgImagePageCardFragment: BlogArticleOgImagePageCardFragment };
  } | null;
};

export type BlogArticleOgImagePageCardFragment = {
  readonly title: string;
  readonly publishedOn: unknown;
  readonly tags: ReadonlyArray<{ readonly name: string; readonly displayName: string }>;
} & { " $fragmentName": "BlogArticleOgImagePageCardFragment" };

export type GetBlogArticlePageQueryVariables = Exact<{
  articlePath: Scalars["String"];
}>;

export type GetBlogArticlePageQuery = {
  readonly articleEntryByPath: {
    " $fragmentRefs": {
      BlogArticlePageHeadFragment: BlogArticlePageHeadFragment;
      BlogArticleFragment: BlogArticleFragment;
    };
  } | null;
};

export type BlogArticlePageHeadFragment = {
  readonly title: string;
  readonly path: string;
  readonly body: { readonly markdown: string };
} & { " $fragmentName": "BlogArticlePageHeadFragment" };

export type GetEntriesPageQueryVariables = Exact<{
  cursor: InputMaybe<Scalars["String"]>;
  count: Scalars["Int"];
  tags: ReadonlyArray<Scalars["String"]> | Scalars["String"];
  filteredByTags: Scalars["Boolean"];
}>;

export type GetEntriesPageQuery = {
  " $fragmentRefs": {
    PickedEntryListEntriesFragment: PickedEntryListEntriesFragment;
    EntryListFragment: EntryListFragment;
    EntryListByTagsFragment: EntryListByTagsFragment;
  };
};

type EntryItem_ArticleEntry_Fragment = {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_ArticleEntry_Fragment" };

type EntryItem_ExternalArticleEntry_Fragment = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_ExternalArticleEntry_Fragment" };

type EntryItem_OssEntry_Fragment = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_OssEntry_Fragment" };

type EntryItem_PodcastEntry_Fragment = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_PodcastEntry_Fragment" };

type EntryItem_SlideEntry_Fragment = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_SlideEntry_Fragment" };

export type EntryItemFragment =
  | EntryItem_ArticleEntry_Fragment
  | EntryItem_ExternalArticleEntry_Fragment
  | EntryItem_OssEntry_Fragment
  | EntryItem_PodcastEntry_Fragment
  | EntryItem_SlideEntry_Fragment;

export type EntryListFragment = {
  readonly entries: { readonly pageInfo: { readonly endCursor: string | null; readonly hasNextPage: boolean } } & {
    " $fragmentRefs": { EntryListViewFragment: EntryListViewFragment };
  };
} & { " $fragmentName": "EntryListFragment" };

export type EntryListByTagsFragment = {
  readonly entriesByTags: {
    readonly pageInfo: { readonly endCursor: string | null; readonly hasNextPage: boolean };
  } & { " $fragmentRefs": { EntryListViewFragment: EntryListViewFragment } };
} & { " $fragmentName": "EntryListByTagsFragment" };

export type EntryListViewFragment = {
  readonly edges: ReadonlyArray<{
    readonly node:
      | ({ readonly __typename: "ArticleEntry"; readonly id: string; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_ArticleEntry_Fragment: EntryItem_ArticleEntry_Fragment };
        })
      | ({ readonly __typename: "ExternalArticleEntry"; readonly id: string; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_ExternalArticleEntry_Fragment: EntryItem_ExternalArticleEntry_Fragment };
        })
      | ({ readonly __typename: "OSSEntry"; readonly id: string; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_OssEntry_Fragment: EntryItem_OssEntry_Fragment };
        })
      | ({ readonly __typename: "PodcastEntry"; readonly id: string; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_PodcastEntry_Fragment: EntryItem_PodcastEntry_Fragment };
        })
      | ({ readonly __typename: "SlideEntry"; readonly id: string; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_SlideEntry_Fragment: EntryItem_SlideEntry_Fragment };
        });
  } | null>;
} & { " $fragmentName": "EntryListViewFragment" };

export type GetEntryListQueryVariables = Exact<{
  cursor: InputMaybe<Scalars["String"]>;
  count: Scalars["Int"];
}>;

export type GetEntryListQuery = { " $fragmentRefs": { EntryListFragment: EntryListFragment } };

export type GetEntryListByTagsQueryVariables = Exact<{
  cursor: InputMaybe<Scalars["String"]>;
  count: Scalars["Int"];
  tags: ReadonlyArray<Scalars["String"]> | Scalars["String"];
}>;

export type GetEntryListByTagsQuery = { " $fragmentRefs": { EntryListByTagsFragment: EntryListByTagsFragment } };

export type PickedEntryListEntriesFragment = {
  readonly pickedEntries: ReadonlyArray<
    | { readonly __typename: "ArticleEntry"; readonly id: string; readonly title: string; readonly path: string }
    | {
        readonly __typename: "ExternalArticleEntry";
        readonly id: string;
        readonly title: string;
        readonly url: string;
        readonly source: { readonly name: string };
      }
    | {
        readonly __typename: "OSSEntry";
        readonly id: string;
        readonly title: string;
        readonly url: string;
        readonly source: { readonly name: string };
      }
    | {
        readonly __typename: "PodcastEntry";
        readonly id: string;
        readonly title: string;
        readonly url: string;
        readonly source: { readonly name: string };
      }
    | {
        readonly __typename: "SlideEntry";
        readonly id: string;
        readonly title: string;
        readonly url: string;
        readonly source: { readonly name: string };
      }
  >;
} & { " $fragmentName": "PickedEntryListEntriesFragment" };

export const BlogArticleFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BlogArticle" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "body" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "markdown" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
          { kind: "Field", name: { kind: "Name", value: "updatedOn" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "tags" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlogArticleFragment, unknown>;
export const BlogArticleOgImagePageCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BlogArticleOgImagePageCard" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "tags" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlogArticleOgImagePageCardFragment, unknown>;
export const BlogArticlePageHeadFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BlogArticlePageHead" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "body" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "markdown" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BlogArticlePageHeadFragment, unknown>;
export const EntryItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "InlineFragment",
            typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "path" } },
                { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ExternalArticleEntry" } },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SlideEntry" } },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OSSEntry" } },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PodcastEntry" } },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntryItemFragment, unknown>;
export const EntryListViewFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryListView" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EntryConnection" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "edges" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "node" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ExternalArticleEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SlideEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OSSEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PodcastEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "publishedOn" } },
                          ],
                        },
                      },
                      { kind: "FragmentSpread", name: { kind: "Name", value: "EntryItem" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntryListViewFragment, unknown>;
export const EntryListFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryList" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "count" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
                { kind: "FragmentSpread", name: { kind: "Name", value: "EntryListView" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntryListFragment, unknown>;
export const EntryListByTagsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryListByTags" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "entriesByTags" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "count" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "tags" },
                value: { kind: "Variable", name: { kind: "Name", value: "tags" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
                { kind: "FragmentSpread", name: { kind: "Name", value: "EntryListView" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EntryListByTagsFragment, unknown>;
export const PickedEntryListEntriesFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PickedEntryListEntries" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pickedEntries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "path" } },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ExternalArticleEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SlideEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OSSEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PodcastEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PickedEntryListEntriesFragment, unknown>;
export const GetBlogArticleOgImagePageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetBlogArticleOgImagePage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "articlePath" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "articleEntryByPath" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "path" },
                value: { kind: "Variable", name: { kind: "Name", value: "articlePath" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "BlogArticleOgImagePageCard" } }],
            },
          },
        ],
      },
    },
    ...BlogArticleOgImagePageCardFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetBlogArticleOgImagePageQuery, GetBlogArticleOgImagePageQueryVariables>;
export const GetBlogArticlePageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetBlogArticlePage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "articlePath" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "articleEntryByPath" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "path" },
                value: { kind: "Variable", name: { kind: "Name", value: "articlePath" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "BlogArticlePageHead" } },
                { kind: "FragmentSpread", name: { kind: "Name", value: "BlogArticle" } },
              ],
            },
          },
        ],
      },
    },
    ...BlogArticlePageHeadFragmentDoc.definitions,
    ...BlogArticleFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetBlogArticlePageQuery, GetBlogArticlePageQueryVariables>;
export const GetEntriesPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEntriesPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Int" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "tags" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "filteredByTags" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "PickedEntryListEntries" } },
          { kind: "FragmentSpread", name: { kind: "Name", value: "EntryList" } },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EntryListByTags" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: { kind: "Variable", name: { kind: "Name", value: "filteredByTags" } },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    ...PickedEntryListEntriesFragmentDoc.definitions,
    ...EntryListFragmentDoc.definitions,
    ...EntryListViewFragmentDoc.definitions,
    ...EntryItemFragmentDoc.definitions,
    ...EntryListByTagsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetEntriesPageQuery, GetEntriesPageQueryVariables>;
export const GetEntryListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEntryList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Int" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryList" } }],
      },
    },
    ...EntryListFragmentDoc.definitions,
    ...EntryListViewFragmentDoc.definitions,
    ...EntryItemFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetEntryListQuery, GetEntryListQueryVariables>;
export const GetEntryListByTagsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEntryListByTags" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Int" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "tags" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryListByTags" } }],
      },
    },
    ...EntryListByTagsFragmentDoc.definitions,
    ...EntryListViewFragmentDoc.definitions,
    ...EntryItemFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetEntryListByTagsQuery, GetEntryListByTagsQueryVariables>;
