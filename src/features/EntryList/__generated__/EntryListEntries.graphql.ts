/**
 * @generated SignedSource<<ddfe5fd75438388cb8828d3f98cc20f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryListEntries$data = {
  readonly entries: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    } | null> | null;
    readonly " $fragmentSpreads": FragmentRefs<"EntryListView">;
  };
  readonly " $fragmentType": "EntryListEntries";
};
export type EntryListEntries$key = {
  readonly " $data"?: EntryListEntries$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryListEntries">;
};

const node: ReaderFragment = (function () {
  var v0 = ["entries"],
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
        operation: require("./EntryListPaginationQuery.graphql"),
      },
    },
    name: "EntryListEntries",
    selections: [
      {
        alias: "entries",
        args: null,
        concreteType: "EntryConnection",
        kind: "LinkedField",
        name: "__EntryListEntries_entries_connection",
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

(node as any).hash = "224c81c45ac78942fca6e5fa6e05573e";

export default node;
