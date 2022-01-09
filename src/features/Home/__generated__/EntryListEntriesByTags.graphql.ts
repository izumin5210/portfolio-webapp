/**
 * @generated SignedSource<<b5326c2c8c6b01afe01c75107a3263fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryListEntriesByTags$data = {
  readonly entriesByTags: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    } | null> | null;
    readonly " $fragmentSpreads": FragmentRefs<"EntryListView">;
  };
  readonly " $fragmentType": "EntryListEntriesByTags";
};
export type EntryListEntriesByTags = EntryListEntriesByTags$data;
export type EntryListEntriesByTags$key = {
  readonly " $data"?: EntryListEntriesByTags$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryListEntriesByTags">;
};

const node: ReaderFragment = (function () {
  var v0 = ["entriesByTags"],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    };
  return {
    argumentDefinitions: [
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
    kind: "Fragment",
    metadata: {
      connection: [
        {
          count: "count",
          cursor: "cursor",
          direction: "forward",
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: "count",
            cursor: "cursor",
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: [],
        operation: require("./EntryListFilteredByTagsPaginationQuery.graphql"),
      },
    },
    name: "EntryListEntriesByTags",
    selections: [
      {
        alias: "entriesByTags",
        args: [
          {
            kind: "Variable",
            name: "tags",
            variableName: "tags",
          },
        ],
        concreteType: "EntryConnection",
        kind: "LinkedField",
        name: "__EntryListEntries_entriesByTags_connection",
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
              v1 /*: any*/,
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
                selections: [v1 /*: any*/],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            args: null,
            kind: "FragmentSpread",
            name: "EntryListView",
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
    ],
    type: "Query",
    abstractKey: null,
  };
})();

(node as any).hash = "accd672d512caabf67b9fdd797b5a50a";

export default node;
