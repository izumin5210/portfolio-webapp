/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type HomeQueryVariables = {
  cursor?: string | null | undefined;
  count: number;
};
export type HomeQueryResponse = {
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries">;
};
export type HomeQuery = {
  readonly response: HomeQueryResponse;
  readonly variables: HomeQueryVariables;
};

/*
query HomeQuery(
  $cursor: String
  $count: Int!
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
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "count",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "cursor",
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
    ],
    v3 = [
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "HomeQuery",
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
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: "Operation",
      name: "HomeQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
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
                      selections: v3 /*: any*/,
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v3 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v3 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v3 /*: any*/,
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
          args: v2 /*: any*/,
          filters: null,
          handle: "connection",
          key: "EntryListEntries_entries",
          kind: "LinkedHandle",
          name: "entries",
        },
      ],
    },
    params: {
      cacheID: "e5ebee1ae2f5d1325089e088e208819e",
      id: null,
      metadata: {},
      name: "HomeQuery",
      operationKind: "query",
      text: "query HomeQuery(\n  $cursor: String\n  $count: Int!\n) {\n  ...EntryListEntries\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    url\n  }\n  ... on SlideEntry {\n    title\n    url\n  }\n  ... on OSSEntry {\n    title\n    url\n  }\n  ... on PodcastEntry {\n    title\n    url\n  }\n}\n\nfragment EntryListEntries on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        ...EntryItem\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "a88e6412493d3e5b6978c285b879b359";
export default node;
