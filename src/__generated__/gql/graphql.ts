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
  readonly body: Scalars["String"];
  readonly feedDescriptionHtml: Scalars["String"];
  readonly metaDescription: Scalars["String"];
  readonly path: Scalars["String"];
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly updatedOn: Maybe<Scalars["Date"]>;
};

/** A connection to a list of items. */
export type ArticleEntryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<ArticleEntryEdge>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ArticleEntryEdge = {
  /** A cursor for use in pagination */
  readonly cursor: Scalars["String"];
  /** The item at the end of the edge */
  readonly node: Maybe<ArticleEntry>;
};

export type Entry = ArticleEntry | ExternalArticleEntry | OssEntry | PodcastEntry | SlideEntry;

/** A connection to a list of items. */
export type EntryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<EntryEdge>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EntryEdge = {
  /** A cursor for use in pagination */
  readonly cursor: Scalars["String"];
  /** The item at the end of the edge */
  readonly node: Maybe<Entry>;
};

export type EntrySource = {
  readonly name: Scalars["String"];
};

export type EntryTag = {
  readonly displayName: Scalars["String"];
  readonly name: Scalars["String"];
};

export type ExternalArticleEntry = {
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly url: Scalars["String"];
};

export type OssEntry = {
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly url: Scalars["String"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor: Maybe<Scalars["String"]>;
};

export type PodcastEntry = {
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly url: Scalars["String"];
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
  readonly picked: Scalars["Boolean"];
  readonly publishedOn: Scalars["Date"];
  readonly source: EntrySource;
  readonly tags: ReadonlyArray<EntryTag>;
  readonly title: Scalars["String"];
  readonly url: Scalars["String"];
};

export type BlogArticleTestQueryQueryVariables = Exact<{ [key: string]: never }>;

export type BlogArticleTestQueryQuery = {
  readonly articleEntryByPath: { " $fragmentRefs": { BlogArticleFragment: BlogArticleFragment } } | null;
};

export type BlogArticleFragment = {
  readonly title: string;
  readonly body: string;
  readonly publishedOn: unknown;
  readonly updatedOn: unknown | null;
  readonly tags: ReadonlyArray<{ readonly name: string; readonly displayName: string }>;
} & { " $fragmentName": "BlogArticleFragment" };

export type BlogArticleOgImagePageQueryQueryVariables = Exact<{
  articlePath: Scalars["String"];
}>;

export type BlogArticleOgImagePageQueryQuery = {
  readonly articleEntryByPath: {
    " $fragmentRefs": { BlogArticleOgImagePageCardFragment: BlogArticleOgImagePageCardFragment };
  } | null;
};

export type BlogArticleOgImagePageCardFragment = {
  readonly title: string;
  readonly publishedOn: unknown;
  readonly tags: ReadonlyArray<{ readonly name: string; readonly displayName: string }>;
} & { " $fragmentName": "BlogArticleOgImagePageCardFragment" };

export type BlogArticlePageQueryQueryVariables = Exact<{
  articlePath: Scalars["String"];
}>;

export type BlogArticlePageQueryQuery = {
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
  readonly metaDescription: string;
} & { " $fragmentName": "BlogArticlePageHeadFragment" };

export type EntriesPageQueryQueryVariables = Exact<{
  cursor: InputMaybe<Scalars["String"]>;
  count: Scalars["Int"];
  tags: ReadonlyArray<Scalars["String"]> | Scalars["String"];
  filteredByTags: Scalars["Boolean"];
}>;

export type EntriesPageQueryQuery = {
  " $fragmentRefs": {
    PickedEntryListEntriesFragment: PickedEntryListEntriesFragment;
    EntryListEntriesFragment: EntryListEntriesFragment;
    EntryListEntriesByTagsFragment: EntryListEntriesByTagsFragment;
  };
};

type EntryItem_ArticleEntry_Fragment = {
  readonly title: string;
  readonly path: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_ArticleEntry_Fragment" };

type EntryItem_ExternalArticleEntry_Fragment = {
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_ExternalArticleEntry_Fragment" };

type EntryItem_OssEntry_Fragment = {
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_OssEntry_Fragment" };

type EntryItem_PodcastEntry_Fragment = {
  readonly title: string;
  readonly url: string;
  readonly publishedOn: unknown;
  readonly source: { readonly name: string };
} & { " $fragmentName": "EntryItem_PodcastEntry_Fragment" };

type EntryItem_SlideEntry_Fragment = {
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

export type EntryListEntriesFragment = {
  readonly entries: { readonly edges: ReadonlyArray<{ readonly __typename: "EntryEdge" } | null> | null } & {
    " $fragmentRefs": { EntryListViewFragment: EntryListViewFragment };
  };
} & { " $fragmentName": "EntryListEntriesFragment" };

export type EntryListEntriesByTagsFragment = {
  readonly entriesByTags: { readonly edges: ReadonlyArray<{ readonly __typename: "EntryEdge" } | null> | null } & {
    " $fragmentRefs": { EntryListViewFragment: EntryListViewFragment };
  };
} & { " $fragmentName": "EntryListEntriesByTagsFragment" };

export type EntryListViewFragment = {
  readonly edges: ReadonlyArray<{
    readonly node:
      | ({ readonly __typename: "ArticleEntry"; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_ArticleEntry_Fragment: EntryItem_ArticleEntry_Fragment };
        })
      | ({ readonly __typename: "ExternalArticleEntry"; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_ExternalArticleEntry_Fragment: EntryItem_ExternalArticleEntry_Fragment };
        })
      | ({ readonly __typename: "OSSEntry"; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_OssEntry_Fragment: EntryItem_OssEntry_Fragment };
        })
      | ({ readonly __typename: "PodcastEntry"; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_PodcastEntry_Fragment: EntryItem_PodcastEntry_Fragment };
        })
      | ({ readonly __typename: "SlideEntry"; readonly publishedOn: unknown } & {
          " $fragmentRefs": { EntryItem_SlideEntry_Fragment: EntryItem_SlideEntry_Fragment };
        })
      | null;
  } | null> | null;
} & { " $fragmentName": "EntryListViewFragment" };

export type PickedEntryListEntriesFragment = {
  readonly pickedEntries: ReadonlyArray<
    | { readonly title: string; readonly path: string }
    | { readonly title: string; readonly url: string; readonly source: { readonly name: string } }
    | { readonly title: string; readonly url: string; readonly source: { readonly name: string } }
    | { readonly title: string; readonly url: string; readonly source: { readonly name: string } }
    | { readonly title: string; readonly url: string; readonly source: { readonly name: string } }
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
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
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
          { kind: "Field", name: { kind: "Name", value: "metaDescription" } },
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
                          selections: [{ kind: "Field", name: { kind: "Name", value: "publishedOn" } }],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ExternalArticleEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "publishedOn" } }],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "SlideEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "publishedOn" } }],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "OSSEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "publishedOn" } }],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PodcastEntry" } },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "publishedOn" } }],
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
    ...EntryItemFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EntryListViewFragment, unknown>;
export const EntryListEntriesFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryListEntries" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
      directives: [
        {
          kind: "Directive",
          name: { kind: "Name", value: "refetchable" },
          arguments: [
            {
              kind: "Argument",
              name: { kind: "Name", value: "queryName" },
              value: { kind: "StringValue", value: "EntryListPaginationQuery", block: false },
            },
          ],
        },
        {
          kind: "Directive",
          name: { kind: "Name", value: "argumentDefinitions" },
          arguments: [
            {
              kind: "Argument",
              name: { kind: "Name", value: "count" },
              value: {
                kind: "ObjectValue",
                fields: [
                  {
                    kind: "ObjectField",
                    name: { kind: "Name", value: "type" },
                    value: { kind: "StringValue", value: "Int!", block: false },
                  },
                ],
              },
            },
            {
              kind: "Argument",
              name: { kind: "Name", value: "cursor" },
              value: {
                kind: "ObjectValue",
                fields: [
                  {
                    kind: "ObjectField",
                    name: { kind: "Name", value: "type" },
                    value: { kind: "StringValue", value: "String", block: false },
                  },
                ],
              },
            },
          ],
        },
      ],
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
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "connection" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "key" },
                    value: { kind: "StringValue", value: "EntryListEntries_entries", block: false },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "__typename" } }],
                  },
                },
                { kind: "FragmentSpread", name: { kind: "Name", value: "EntryListView" } },
              ],
            },
          },
        ],
      },
    },
    ...EntryListViewFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EntryListEntriesFragment, unknown>;
export const EntryListEntriesByTagsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EntryListEntriesByTags" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
      directives: [
        {
          kind: "Directive",
          name: { kind: "Name", value: "refetchable" },
          arguments: [
            {
              kind: "Argument",
              name: { kind: "Name", value: "queryName" },
              value: { kind: "StringValue", value: "EntryListFilteredByTagsPaginationQuery", block: false },
            },
          ],
        },
        {
          kind: "Directive",
          name: { kind: "Name", value: "argumentDefinitions" },
          arguments: [
            {
              kind: "Argument",
              name: { kind: "Name", value: "count" },
              value: {
                kind: "ObjectValue",
                fields: [
                  {
                    kind: "ObjectField",
                    name: { kind: "Name", value: "type" },
                    value: { kind: "StringValue", value: "Int!", block: false },
                  },
                ],
              },
            },
            {
              kind: "Argument",
              name: { kind: "Name", value: "cursor" },
              value: {
                kind: "ObjectValue",
                fields: [
                  {
                    kind: "ObjectField",
                    name: { kind: "Name", value: "type" },
                    value: { kind: "StringValue", value: "String", block: false },
                  },
                ],
              },
            },
            {
              kind: "Argument",
              name: { kind: "Name", value: "tags" },
              value: {
                kind: "ObjectValue",
                fields: [
                  {
                    kind: "ObjectField",
                    name: { kind: "Name", value: "type" },
                    value: { kind: "StringValue", value: "[String!]!", block: false },
                  },
                ],
              },
            },
          ],
        },
      ],
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
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "connection" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "key" },
                    value: { kind: "StringValue", value: "EntryListEntries_entriesByTags", block: false },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "__typename" } }],
                  },
                },
                { kind: "FragmentSpread", name: { kind: "Name", value: "EntryListView" } },
              ],
            },
          },
        ],
      },
    },
    ...EntryListViewFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EntryListEntriesByTagsFragment, unknown>;
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
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ArticleEntry" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
export const BlogArticleTestQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BlogArticleTestQuery" },
      directives: [{ kind: "Directive", name: { kind: "Name", value: "relay_test_operation" } }],
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
                value: { kind: "StringValue", value: "test-path", block: false },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "BlogArticle" } }],
            },
          },
        ],
      },
    },
    ...BlogArticleFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<BlogArticleTestQueryQuery, BlogArticleTestQueryQueryVariables>;
export const BlogArticleOgImagePageQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BlogArticleOgImagePageQuery" },
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
} as unknown as DocumentNode<BlogArticleOgImagePageQueryQuery, BlogArticleOgImagePageQueryQueryVariables>;
export const BlogArticlePageQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BlogArticlePageQuery" },
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
} as unknown as DocumentNode<BlogArticlePageQueryQuery, BlogArticlePageQueryQueryVariables>;
export const EntriesPageQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EntriesPageQuery" },
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
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EntryListEntries" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "arguments" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "cursor" },
                    value: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
                  },
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "count" },
                    value: { kind: "Variable", name: { kind: "Name", value: "count" } },
                  },
                ],
              },
              {
                kind: "Directive",
                name: { kind: "Name", value: "skip" },
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
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EntryListEntriesByTags" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "arguments" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "cursor" },
                    value: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
                  },
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "count" },
                    value: { kind: "Variable", name: { kind: "Name", value: "count" } },
                  },
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "tags" },
                    value: { kind: "Variable", name: { kind: "Name", value: "tags" } },
                  },
                ],
              },
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
    ...EntryListEntriesFragmentDoc.definitions,
    ...EntryListEntriesByTagsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<EntriesPageQueryQuery, EntriesPageQueryQueryVariables>;
