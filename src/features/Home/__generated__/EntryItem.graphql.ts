/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryItem = {
  readonly title?: string | undefined;
  readonly url?: string | undefined;
  readonly tags?: ReadonlyArray<string> | undefined;
  readonly publishedOn?: unknown | undefined;
  readonly " $refType": "EntryItem";
};
export type EntryItem$data = EntryItem;
export type EntryItem$key = {
  readonly " $data"?: EntryItem$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryItem">;
};

const node: ReaderFragment = (function () {
  var v0 = [
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
  ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "EntryItem",
    selections: [
      {
        kind: "InlineFragment",
        selections: v0 /*: any*/,
        type: "ArticleEntry",
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
    ],
    type: "Entry",
    abstractKey: "__isEntry",
  };
})();
(node as any).hash = "834fced1f5dcfe78dce5218fe670a7ba";
export default node;
