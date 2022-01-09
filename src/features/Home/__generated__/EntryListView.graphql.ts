/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListView = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly __typename: string;
      readonly publishedOn?: unknown | undefined;
      readonly " $fragmentRefs": FragmentRefs<"EntryItem">;
    } | null;
  } | null> | null;
  readonly " $refType": "EntryListView";
};
export type EntryListView$data = EntryListView;
export type EntryListView$key = {
  readonly " $data"?: EntryListView$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryListView">;
};

const node: ReaderFragment = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
  ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "EntryListView",
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
                selections: v0 /*: any*/,
                type: "ArticleEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v0 /*: any*/,
                type: "ExternalArticleEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v0 /*: any*/,
                type: "SlideEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v0 /*: any*/,
                type: "OSSEntry",
                abstractKey: null,
              },
              {
                kind: "InlineFragment",
                selections: v0 /*: any*/,
                type: "PodcastEntry",
                abstractKey: null,
              },
              {
                args: null,
                kind: "FragmentSpread",
                name: "EntryItem",
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "EntryConnection",
    abstractKey: null,
  };
})();
(node as any).hash = "33c6f43391822db580bcee0d61c3b255";
export default node;
