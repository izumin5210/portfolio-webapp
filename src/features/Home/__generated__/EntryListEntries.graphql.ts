/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import EntryListPaginationQuery from "./EntryListPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type EntryListEntries = {
  readonly entries: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"EntryListView">;
  };
  readonly " $refType": "EntryListEntries";
};
export type EntryListEntries$data = EntryListEntries;
export type EntryListEntries$key = {
  readonly " $data"?: EntryListEntries$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries">;
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
        kind: "RootArgument",
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
        operation: EntryListPaginationQuery,
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
          {
            args: null,
            kind: "FragmentSpread",
            name: "EntryListView",
          },
        ],
        storageKey: null,
      },
    ],
    type: "Query",
    abstractKey: null,
  };
})();
(node as any).hash = "2a9d210b6a559ec63713aa0f6dbefafb";
export default node;
