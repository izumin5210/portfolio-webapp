/**
 * @generated SignedSource<<b693d6a7947878cd08e1ba5ffc0d2c58>>
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
export type EntryListFilteredByTagsPaginationQueryVariables = EntryListFilteredByTagsPaginationQuery$variables;
export type EntryListFilteredByTagsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntryListEntriesByTags">;
};
export type EntryListFilteredByTagsPaginationQueryResponse = EntryListFilteredByTagsPaginationQuery$data;
export type EntryListFilteredByTagsPaginationQuery = {
  variables: EntryListFilteredByTagsPaginationQueryVariables;
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
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      concreteType: "EntryTag",
      kind: "LinkedField",
      name: "tags",
      plural: true,
      selections: [
        v6 /*: any*/,
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
    v8 = {
      alias: null,
      args: null,
      concreteType: "EntrySource",
      kind: "LinkedField",
      name: "source",
      plural: false,
      selections: [v6 /*: any*/],
      storageKey: null,
    },
    v9 = [
      v4 /*: any*/,
      v5 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      v7 /*: any*/,
      v8 /*: any*/,
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
                        v7 /*: any*/,
                        v8 /*: any*/,
                      ],
                      type: "ArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v9 /*: any*/,
                      type: "ExternalArticleEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v9 /*: any*/,
                      type: "SlideEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v9 /*: any*/,
                      type: "OSSEntry",
                      abstractKey: null,
                    },
                    {
                      kind: "InlineFragment",
                      selections: v9 /*: any*/,
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
      cacheID: "d368c1e33cdfdd59cc23b1792f4ad2c7",
      id: null,
      metadata: {},
      name: "EntryListFilteredByTagsPaginationQuery",
      operationKind: "query",
      text: "query EntryListFilteredByTagsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $tags: [String!]!\n) {\n  ...EntryListEntriesByTags_3EtMAt\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    path\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on ExternalArticleEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n}\n\nfragment EntryListEntriesByTags_3EtMAt on Query {\n  entriesByTags(first: $count, after: $cursor, tags: $tags) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ... on ArticleEntry {\n        publishedOn\n      }\n      ... on ExternalArticleEntry {\n        publishedOn\n      }\n      ... on SlideEntry {\n        publishedOn\n      }\n      ... on OSSEntry {\n        publishedOn\n      }\n      ... on PodcastEntry {\n        publishedOn\n      }\n      ...EntryItem\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "accd672d512caabf67b9fdd797b5a50a";

export default node;
