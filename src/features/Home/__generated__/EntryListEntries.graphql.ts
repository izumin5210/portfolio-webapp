/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListEntries = {
  readonly entries: ReadonlyArray<{
    readonly title?: string | undefined;
    readonly url?: string | undefined;
  }>;
  readonly " $refType": "EntryListEntries";
};
export type EntryListEntries$data = EntryListEntries;
export type EntryListEntries$key = {
  readonly " $data"?: EntryListEntries$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries">;
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
  ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "EntryListEntries",
    selections: [
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "entries",
        plural: true,
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
        storageKey: null,
      },
    ],
    type: "Query",
    abstractKey: null,
  };
})();
(node as any).hash = "b2eea55186baee24ce1737cada7032c3";
export default node;
