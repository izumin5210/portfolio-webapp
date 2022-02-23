/**
 * @generated SignedSource<<31add90bdb70f90f889434d5bb929410>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryListPaginationQuery$variables = {
  count: number;
  cursor?: string | null;
};
export type EntryListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntryListEntries">;
};
export type EntryListPaginationQuery = {
  variables: EntryListPaginationQuery$variables;
  response: EntryListPaginationQuery$data;
};

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
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      concreteType: "EntryTag",
      kind: "LinkedField",
      name: "tags",
      plural: true,
      selections: [
        v5 /*: any*/,
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "displayName",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      concreteType: "EntrySource",
      kind: "LinkedField",
      name: "source",
      plural: false,
      selections: [v5 /*: any*/],
      storageKey: null,
    },
    v8 = [
      v3 /*: any*/,
      v4 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      v6 /*: any*/,
      v7 /*: any*/,
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
              name: "count",
              variableName: "count",
            },
            {
              kind: "Variable",
              name: "cursor",
              variableName: "cursor",
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
                      kind: "InlineFragment",
                      selections: [
                        v3 /*: any*/,
                        v4 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "path",
                          storageKey: null,
                        },
                        v6 /*: any*/,
                        v7 /*: any*/,
                      ],
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v8 /*: any*/,
                      type: "ExternalArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v8 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v8 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v8 /*: any*/,
                      type: "PodcastEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "TypeDiscriminator",
                      abstractKey: "__isEntry",
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
      cacheID: "4eb57cdfdad2a7f4008350c54c337ab0",
      id: null,
      metadata: {},
      name: "EntryListPaginationQuery",
      operationKind: "query",
      text: "query EntryListPaginationQuery(\n  $count: Int!\n  $cursor: String\n) {\n  ...EntryListEntries_1G22uz\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    path\n    tags {\n      name\n      ...EntryItemTag\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on ExternalArticleEntry {\n    title\n    url\n    tags {\n      name\n      ...EntryItemTag\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags {\n      name\n      ...EntryItemTag\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags {\n      name\n      ...EntryItemTag\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags {\n      name\n      ...EntryItemTag\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n}\n\nfragment EntryItemTag on EntryTag {\n  name\n  displayName\n}\n\nfragment EntryListEntries_1G22uz on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ... on ArticleEntry {\n        publishedOn\n      }\n      ... on ExternalArticleEntry {\n        publishedOn\n      }\n      ... on SlideEntry {\n        publishedOn\n      }\n      ... on OSSEntry {\n        publishedOn\n      }\n      ... on PodcastEntry {\n        publishedOn\n      }\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "224c81c45ac78942fca6e5fa6e05573e";

export default node;
