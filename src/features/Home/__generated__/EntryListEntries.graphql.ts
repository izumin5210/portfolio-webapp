/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import EntryListPaginationQuery from "./EntryListPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type EntryListEntries = {
  readonly entries: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title?: string | undefined;
        readonly url?: string | undefined;
      } | null;
    } | null> | null;
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
    v1 = [
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
    argumentDefinitions: [
      {
        kind: "RootArgument",
        name: "count",
      },
      {
        kind: "RootArgument",
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
                    kind: "InlineFragment",
                    selections: v1 /*: any*/,
                    type: "ArticleEntry",
                    abstractKey: null,
                  },
                  {
                    kind: "InlineFragment",
                    selections: v1 /*: any*/,
                    type: "SlideEntry",
                    abstractKey: null,
                  },
                  {
                    kind: "InlineFragment",
                    selections: v1 /*: any*/,
                    type: "OSSEntry",
                    abstractKey: null,
                  },
                  {
                    kind: "InlineFragment",
                    selections: v1 /*: any*/,
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
    ],
    type: "Query",
    abstractKey: null,
  };
})();
(node as any).hash = "46994b8119426e2f5cc94f07ded54d31";
export default node;
