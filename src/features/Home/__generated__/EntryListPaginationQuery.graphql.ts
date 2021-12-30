/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListPaginationQueryVariables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type EntryListPaginationQueryResponse = {
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries">;
};
export type EntryListPaginationQuery = {
  readonly response: EntryListPaginationQueryResponse;
  readonly variables: EntryListPaginationQueryVariables;
};

/*
query EntryListPaginationQuery(
  $count: Int
  $cursor: String
) {
  ...EntryListEntries
}

fragment EntryItem on Entry {
  __isEntry: __typename
  ... on ArticleEntry {
    title
    url
  }
  ... on SlideEntry {
    title
    url
  }
  ... on OSSEntry {
    title
    url
  }
  ... on PodcastEntry {
    title
    url
  }
}

fragment EntryListEntries on Query {
  entries(first: $count, after: $cursor) {
    edges {
      node {
        __typename
        ...EntryItem
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
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
    ],
    v1 = [
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
    ],
    v2 = [
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
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "EntryListPaginationQuery",
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "EntryListEntries",
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "EntryListPaginationQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "EntryConnection",
          kind: "LinkedField",
          name: "entries",
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
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: "LinkedField",
                  name: "node",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "__typename",
                      storageKey: null,
                    },
                    {
                      kind: "TypeDiscriminator",
                      abstractKey: "__isEntry",
                    },
                    {
                      kind: "InlineFragment",
                      selections: v2 /*: any*/,
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v2 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v2 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v2 /*: any*/,
                      type: "PodcastEntry",
                      abstractKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "cursor",
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
          args: v1 /*: any*/,
          filters: null,
          handle: "connection",
          key: "EntryListEntries_entries",
          kind: "LinkedHandle",
          name: "entries",
        },
      ],
    },
    params: {
      cacheID: "4eb64d8ed30e546f1b90d77a3080aa2b",
      id: null,
      metadata: {},
      name: "EntryListPaginationQuery",
      operationKind: "query",
      text: "query EntryListPaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...EntryListEntries\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    url\n  }\n  ... on SlideEntry {\n    title\n    url\n  }\n  ... on OSSEntry {\n    title\n    url\n  }\n  ... on PodcastEntry {\n    title\n    url\n  }\n}\n\nfragment EntryListEntries on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        ...EntryItem\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "f713eb72200e220935b37400af179db0";
export default node;
