/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type HomeQueryVariables = {
  cursor?: string | null | undefined;
  count: number;
  tags: Array<string>;
  filteredByTags: boolean;
};
export type HomeQueryResponse = {
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries" | "EntryListEntriesByTags">;
};
export type HomeQuery = {
  readonly response: HomeQueryResponse;
  readonly variables: HomeQueryVariables;
};

/*
query HomeQuery(
  $cursor: String
  $count: Int!
  $tags: [String!]!
  $filteredByTags: Boolean!
) {
  ...EntryListEntries_1CRDnJ @skip(if: $filteredByTags)
  ...EntryListEntriesByTags_1QG3YJ @include(if: $filteredByTags)
}

fragment EntryItem on Entry {
  __isEntry: __typename
  ... on ArticleEntry {
    title
    url
    tags
    publishedOn
  }
  ... on SlideEntry {
    title
    url
    tags
    publishedOn
  }
  ... on OSSEntry {
    title
    url
    tags
    publishedOn
  }
  ... on PodcastEntry {
    title
    url
    tags
    publishedOn
  }
}

fragment EntryListEntriesByTags_1QG3YJ on Query {
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

fragment EntryListEntries_1CRDnJ on Query {
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
      ...EntryItem
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
    v2 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "filteredByTags",
    },
    v3 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "tags",
    },
    v4 = {
      kind: "Variable",
      name: "cursor",
      variableName: "cursor",
    },
    v5 = {
      kind: "Variable",
      name: "first",
      variableName: "count",
    },
    v6 = {
      kind: "Variable",
      name: "tags",
      variableName: "tags",
    },
    v7 = {
      kind: "Variable",
      name: "after",
      variableName: "cursor",
    },
    v8 = [v7 /*: any*/, v5 /*: any*/],
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v10 = [
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
        kind: "ScalarField",
        name: "publishedOn",
        storageKey: null,
      },
    ],
    v11 = [
      {
        alias: null,
        args: null,
        concreteType: "EntryEdge",
        kind: "LinkedField",
        name: "edges",
        plural: true,
        selections: [
          v9 /*: any*/,
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
              v9 /*: any*/,
              {
                kind: "TypeDiscriminator",
                abstractKey: "__isEntry",
              },
              {
                kind: "InlineFragment",
                selections: v10 /*: any*/,
                type: "ArticleEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v10 /*: any*/,
                type: "SlideEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v10 /*: any*/,
                type: "OSSEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v10 /*: any*/,
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
    v12 = [v7 /*: any*/, v5 /*: any*/, v6 /*: any*/];
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/, v3 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "HomeQuery",
      selections: [
        {
          condition: "filteredByTags",
          kind: "Condition",
          passingValue: false,
          selections: [
            {
              args: [v4 /*: any*/, v5 /*: any*/],
              kind: "FragmentSpread",
              name: "EntryListEntries",
            },
          ],
        },
        {
          condition: "filteredByTags",
          kind: "Condition",
          passingValue: true,
          selections: [
            {
              args: [v4 /*: any*/, v5 /*: any*/, v6 /*: any*/],
              kind: "FragmentSpread",
              name: "EntryListEntriesByTags",
            },
          ],
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v3 /*: any*/, v2 /*: any*/],
      kind: "Operation",
      name: "HomeQuery",
      selections: [
        {
          condition: "filteredByTags",
          kind: "Condition",
          passingValue: false,
          selections: [
            {
              alias: null,
              args: v8 /*: any*/,
              concreteType: "EntryConnection",
              kind: "LinkedField",
              name: "entries",
              plural: false,
              selections: v11 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: v8 /*: any*/,
              filters: null,
              handle: "connection",
              key: "EntryListEntries_entries",
              kind: "LinkedHandle",
              name: "entries",
            },
          ],
        },
        {
          condition: "filteredByTags",
          kind: "Condition",
          passingValue: true,
          selections: [
            {
              alias: null,
              args: v12 /*: any*/,
              concreteType: "EntryConnection",
              kind: "LinkedField",
              name: "entriesByTags",
              plural: false,
              selections: v11 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: v12 /*: any*/,
              filters: ["tags"],
              handle: "connection",
              key: "EntryListEntries_entriesByTags",
              kind: "LinkedHandle",
              name: "entriesByTags",
            },
          ],
        },
      ],
    },
    params: {
      cacheID: "6187ce4f3b60e731ab597a0e01faaacc",
      id: null,
      metadata: {},
      name: "HomeQuery",
      operationKind: "query",
      text: "query HomeQuery(\n  $cursor: String\n  $count: Int!\n  $tags: [String!]!\n  $filteredByTags: Boolean!\n) {\n  ...EntryListEntries_1CRDnJ @skip(if: $filteredByTags)\n  ...EntryListEntriesByTags_1QG3YJ @include(if: $filteredByTags)\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    url\n    tags\n    publishedOn\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags\n    publishedOn\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags\n    publishedOn\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags\n    publishedOn\n  }\n}\n\nfragment EntryListEntriesByTags_1QG3YJ on Query {\n  entriesByTags(first: $count, after: $cursor, tags: $tags) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListEntries_1CRDnJ on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "83b52e4c2c64aa1df6021088bd27aabf";
export default node;
