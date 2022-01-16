/**
 * @generated SignedSource<<dd556df2593d23c4d594c790d59792a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeQuery$variables = {
  cursor?: string | null;
  count: number;
  tags: ReadonlyArray<string>;
  filteredByTags: boolean;
};
export type HomeQueryVariables = HomeQuery$variables;
export type HomeQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PickedEntryListEntries" | "EntryListEntries" | "EntryListEntriesByTags">;
};
export type HomeQueryResponse = HomeQuery$data;
export type HomeQuery = {
  variables: HomeQueryVariables;
  response: HomeQuery$data;
};

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
      name: "count",
      variableName: "count",
    },
    v5 = {
      kind: "Variable",
      name: "cursor",
      variableName: "cursor",
    },
    v6 = {
      kind: "Variable",
      name: "tags",
      variableName: "tags",
    },
    v7 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "path",
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "url",
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      concreteType: "EntrySource",
      kind: "LinkedField",
      name: "source",
      plural: false,
      selections: [v11 /*: any*/],
      storageKey: null,
    },
    v13 = [v8 /*: any*/, v10 /*: any*/, v12 /*: any*/],
    v14 = {
      kind: "Variable",
      name: "after",
      variableName: "cursor",
    },
    v15 = {
      kind: "Variable",
      name: "first",
      variableName: "count",
    },
    v16 = [v14 /*: any*/, v15 /*: any*/],
    v17 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    v18 = {
      alias: null,
      args: null,
      concreteType: "EntryTag",
      kind: "LinkedField",
      name: "tags",
      plural: true,
      selections: [
        v11 /*: any*/,
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
    v19 = [v17 /*: any*/, v8 /*: any*/, v10 /*: any*/, v18 /*: any*/, v12 /*: any*/],
    v20 = [
      {
        alias: null,
        args: null,
        concreteType: "EntryEdge",
        kind: "LinkedField",
        name: "edges",
        plural: true,
        selections: [
          v7 /*: any*/,
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
              v7 /*: any*/,
              {
                kind: "InlineFragment",
                selections: [v17 /*: any*/, v8 /*: any*/, v9 /*: any*/, v18 /*: any*/, v12 /*: any*/],
                type: "ArticleEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v19 /*: any*/,
                type: "ExternalArticleEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v19 /*: any*/,
                type: "SlideEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v19 /*: any*/,
                type: "OSSEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v19 /*: any*/,
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
    v21 = [v14 /*: any*/, v15 /*: any*/, v6 /*: any*/];
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/, v3 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "HomeQuery",
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "PickedEntryListEntries",
        },
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
          alias: null,
          args: null,
          concreteType: null,
          kind: "LinkedField",
          name: "pickedEntries",
          plural: true,
          selections: [
            v7 /*: any*/,
            {
              kind: "InlineFragment",
              selections: [v8 /*: any*/, v9 /*: any*/],
              type: "ArticleEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v13 /*: any*/,
              type: "ExternalArticleEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v13 /*: any*/,
              type: "SlideEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v13 /*: any*/,
              type: "OSSEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v13 /*: any*/,
              type: "PodcastEntry",
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
        {
          condition: "filteredByTags",
          kind: "Condition",
          passingValue: false,
          selections: [
            {
              alias: null,
              args: v16 /*: any*/,
              concreteType: "EntryConnection",
              kind: "LinkedField",
              name: "entries",
              plural: false,
              selections: v20 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: v16 /*: any*/,
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
              args: v21 /*: any*/,
              concreteType: "EntryConnection",
              kind: "LinkedField",
              name: "entriesByTags",
              plural: false,
              selections: v20 /*: any*/,
              storageKey: null,
            },
            {
              alias: null,
              args: v21 /*: any*/,
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
      cacheID: "babf54feca575758ff124a9c7b9695a4",
      id: null,
      metadata: {},
      name: "HomeQuery",
      operationKind: "query",
      text: "query HomeQuery(\n  $cursor: String\n  $count: Int!\n  $tags: [String!]!\n  $filteredByTags: Boolean!\n) {\n  ...PickedEntryListEntries\n  ...EntryListEntries_1G22uz @skip(if: $filteredByTags)\n  ...EntryListEntriesByTags_3EtMAt @include(if: $filteredByTags)\n}\n\nfragment EntryItem on Entry {\n  __isEntry: __typename\n  ... on ArticleEntry {\n    title\n    path\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on ExternalArticleEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on SlideEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on OSSEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n  ... on PodcastEntry {\n    title\n    url\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n    source {\n      name\n    }\n  }\n}\n\nfragment EntryListEntriesByTags_3EtMAt on Query {\n  entriesByTags(first: $count, after: $cursor, tags: $tags) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListEntries_1G22uz on Query {\n  entries(first: $count, after: $cursor) {\n    edges {\n      __typename\n      cursor\n      node {\n        __typename\n      }\n    }\n    ...EntryListView\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment EntryListView on EntryConnection {\n  edges {\n    node {\n      __typename\n      ... on ArticleEntry {\n        publishedOn\n      }\n      ... on ExternalArticleEntry {\n        publishedOn\n      }\n      ... on SlideEntry {\n        publishedOn\n      }\n      ... on OSSEntry {\n        publishedOn\n      }\n      ... on PodcastEntry {\n        publishedOn\n      }\n      ...EntryItem\n    }\n  }\n}\n\nfragment PickedEntryListEntries on Query {\n  pickedEntries {\n    __typename\n    ... on ArticleEntry {\n      title\n      path\n    }\n    ... on ExternalArticleEntry {\n      title\n      url\n      source {\n        name\n      }\n    }\n    ... on SlideEntry {\n      title\n      url\n      source {\n        name\n      }\n    }\n    ... on OSSEntry {\n      title\n      url\n      source {\n        name\n      }\n    }\n    ... on PodcastEntry {\n      title\n      url\n      source {\n        name\n      }\n    }\n  }\n}\n",
    },
  };
})();

(node as any).hash = "52b44afe1027999a6fc97291d7f116a5";

export default node;
