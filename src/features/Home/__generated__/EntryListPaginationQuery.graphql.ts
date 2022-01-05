/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListPaginationQueryVariables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  first: number;
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
  ...EntryListEntries_19XkED
}

fragment EntryItem on Entry {
  __isEntry: __typename
  ... on ExternalArticleEntry {
    title
    url
    tags
    publishedOn
    source {
      name
    }
  }
  ... on SlideEntry {
    title
    url
    tags
    publishedOn
    source {
      name
    }
  }
  ... on OSSEntry {
    title
    url
    tags
    publishedOn
    source {
      name
    }
  }
  ... on PodcastEntry {
    title
    url
    tags
    publishedOn
    source {
      name
    }
  }
}

fragment EntryListEntries_19XkED on Query {
  entries(first: $count, after: $cursor) {
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
      ... on ExternalArticleEntry {
        publishedOn
      }
      ... on SlideEntry {
        publishedOn
      }
      ... on OSSEntry {
        publishedOn
      }
      ... on PodcastEntry {
        publishedOn
      }
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
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v3 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "publishedOn",
        storageKey: null,
      },
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
      {
        alias: null,
        args: null,
        concreteType: "EntrySource",
        kind: "LinkedField",
        name: "source",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "name",
            storageKey: null,
          },
        ],
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
          ],
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
                v2 /*: any*/,
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
                    v2 /*: any*/,
                    {
                      kind: "TypeDiscriminator",
                      abstractKey: "__isEntry",
                    },
                    {
                      kind: "InlineFragment",
                      selections: v3 /*: any*/,
                      type: "ExternalArticleEntry",
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
      cacheID: "cb4db060df2fb25d2dcfa40e06832d8b",
      id: null,
      metadata: {},
      name: "EntryListPaginationQuery",
      operationKind: "query",
      text: "query EntryListPaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...EntryListEntries_19XkED\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ExternalArticleEntry {\n    title\n    url\n    tags\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags\n    publishedOn\n    source {\n      name\n    }\n  }\n}\n\nfragment EntryListEntries_19XkED on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ... on ExternalArticleEntry {\n        publishedOn\n      }\n      ... on SlideEntry {\n        publishedOn\n      }\n      ... on OSSEntry {\n        publishedOn\n      }\n      ... on PodcastEntry {\n        publishedOn\n      }\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "2a9d210b6a559ec63713aa0f6dbefafb";
export default node;
