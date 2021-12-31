/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListFilteredByTagsPaginationQueryVariables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  first: number;
  tags: Array<string>;
};
export type EntryListFilteredByTagsPaginationQueryResponse = {
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntriesByTags">;
};
export type EntryListFilteredByTagsPaginationQuery = {
  readonly response: EntryListFilteredByTagsPaginationQueryResponse;
  readonly variables: EntryListFilteredByTagsPaginationQueryVariables;
};

/*
query EntryListFilteredByTagsPaginationQuery(
  $count: Int
  $cursor: String
  $tags: [String!]!
) {
  ...EntryListEntriesByTags_2gAuHF
}

fragment EntryItem on Entry {
  __isEntry: __typename
  ... on ArticleEntry {
    title
    url
    tags
  }
  ... on SlideEntry {
    title
    url
    tags
  }
  ... on OSSEntry {
    title
    url
    tags
  }
  ... on PodcastEntry {
    title
    url
    tags
  }
}

fragment EntryListEntriesByTags_2gAuHF on Query {
  entriesByTags(first: $count, after: $cursor, tags: $tags) {
    edges {
      __typename
      cursor
      node {
        __typename
      }
    }
    ...EntryListView
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment EntryListView on EntryConnection {
  edges {
    node {
      __typename
      ...EntryItem
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "count",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "cursor",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "first",
      },
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "tags",
      },
    ],
    v1 = {
      kind: "Variable",
      name: "tags",
      variableName: "tags",
    },
    v2 = [
      {
        kind: "Variable",
        name: "after",
        variableName: "cursor",
      },
      {
        kind: "Variable",
        name: "first",
        variableName: "count",
      },
      v1 /*: any*/,
    ],
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v4 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "title",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "tags",
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "EntryListFilteredByTagsPaginationQuery",
      selections: [
        {
          args: [
            {
              kind: "Variable",
              name: "cursor",
              variableName: "cursor",
            },
            {
              kind: "Variable",
              name: "first",
              variableName: "first",
            },
            v1 /*: any*/,
          ],
          kind: "FragmentSpread",
          name: "EntryListEntriesByTags",
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "EntryListFilteredByTagsPaginationQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: "EntryConnection",
          kind: "LinkedField",
          name: "entriesByTags",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "EntryEdge",
              kind: "LinkedField",
              name: "edges",
              plural: true,
              selections: [
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "cursor",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    v3 /*: any*/,
                    {
                      kind: "TypeDiscriminator",
                      abstractKey: "__isEntry",
                    },
                    {
                      kind: "InlineFragment",
                      selections: v4 /*: any*/,
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v4 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v4 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v4 /*: any*/,
                      type: "PodcastEntry",
                      abstractKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "PageInfo",
              kind: "LinkedField",
              name: "pageInfo",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "endCursor",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "hasNextPage",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v2 /*: any*/,
          filters: ["tags"],
          handle: "connection",
          key: "EntryListEntries_entriesByTags",
          kind: "LinkedHandle",
          name: "entriesByTags",
        },
      ],
    },
    params: {
      cacheID: "06bce5a76a0de560dd36d172158cbcd1",
      id: null,
      metadata: {},
      name: "EntryListFilteredByTagsPaginationQuery",
      operationKind: "query",
      text: "query EntryListFilteredByTagsPaginationQuery(\n  $count: Int\n  $cursor: String\n  $tags: [String!]!\n) {\n  ...EntryListEntriesByTags_2gAuHF\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    url\n    tags\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags\n  }\n}\n\nfragment EntryListEntriesByTags_2gAuHF on Query {\n  entriesByTags(first: $count, after: $cursor, tags: $tags) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "d703fcd6070cdf48ac8b73d9f86520e7";
export default node;
