/**
 * @generated SignedSource<<2c94fdb1d90dbcad0b5a139dc174e2ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryListFilteredByTagsPaginationQuery$variables = {
  count: number;
  cursor?: string | null;
  tags: ReadonlyArray<string>;
};
export type EntryListFilteredByTagsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntryListEntriesByTags">;
};
export type EntryListFilteredByTagsPaginationQuery = {
  variables: EntryListFilteredByTagsPaginationQuery$variables;
  response: EntryListFilteredByTagsPaginationQuery$data;
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
    v4 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v6 = {
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
    v7 = [
      v4 /*: any*/,
      v5 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      v6 /*: any*/,
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
              name: "count",
              variableName: "count",
            },
            {
              kind: "Variable",
              name: "cursor",
              variableName: "cursor",
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
                      kind: "InlineFragment",
                      selections: [
                        v4 /*: any*/,
                        v5 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "path",
                          storageKey: null,
                        },
                        v6 /*: any*/,
                      ],
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v7 /*: any*/,
                      type: "ExternalArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v7 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v7 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v7 /*: any*/,
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
      cacheID: "1768cc9acbec5265e713465829654d50",
      id: null,
      metadata: {},
      name: "EntryListFilteredByTagsPaginationQuery",
      operationKind: "query",
      text: "query EntryListFilteredByTagsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $tags: [String!]!\n) {\n  ...EntryListEntriesByTags_3EtMAt\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    path\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on ExternalArticleEntry {\n    title\n    url\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on SlideEntry {\n    title\n    url\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on OSSEntry {\n    title\n    url\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on PodcastEntry {\n    title\n    url\n    publishedOn\n    source {\n      name\n    }\n  }\n}\n\nfragment EntryListEntriesByTags_3EtMAt on Query {\n  entriesByTags(first: $count, after: $cursor, tags: $tags) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ... on ArticleEntry {\n        publishedOn\n      }\n      ... on ExternalArticleEntry {\n        publishedOn\n      }\n      ... on SlideEntry {\n        publishedOn\n      }\n      ... on OSSEntry {\n        publishedOn\n      }\n      ... on PodcastEntry {\n        publishedOn\n      }\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "accd672d512caabf67b9fdd797b5a50a";

export default node;
