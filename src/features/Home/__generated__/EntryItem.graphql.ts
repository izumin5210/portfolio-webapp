/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryItem = {
  readonly title?: string | undefined;
  readonly path?: string | undefined;
  readonly tags?: ReadonlyArray<string> | undefined;
  readonly publishedOn?: unknown | undefined;
  readonly source?:
    | {
        readonly name: string;
      }
    | undefined;
  readonly url?: string | undefined;
  readonly " $refType": "EntryItem";
};
export type EntryItem$data = EntryItem;
export type EntryItem$key = {
  readonly " $data"?: EntryItem$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryItem">;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "tags",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    v3 = {
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
    v4 = [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      v1 /*: any*/,
      v2 /*: any*/,
      v3 /*: any*/,
    ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "EntryItem",
    selections: [
      {
        kind: "InlineFragment",
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "path",
            storageKey: null,
          },
          v1 /*: any*/,
          v2 /*: any*/,
          v3 /*: any*/,
        ],
        type: "ArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v4 /*: any*/,
        type: "ExternalArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v4 /*: any*/,
        type: "SlideEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v4 /*: any*/,
        type: "OSSEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v4 /*: any*/,
        type: "PodcastEntry",
        abstractKey: null,
      },
    ],
    type: "Entry",
    abstractKey: "__isEntry",
  };
})();
(node as any).hash = "c13203cd7e600b6dc48c675d0ea02725";
export default node;
