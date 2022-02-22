/**
 * @generated SignedSource<<65d759db68c806a2de69ee6339a2b04b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryItem$data = {
  readonly title?: string;
  readonly path?: string;
  readonly tags?: ReadonlyArray<{
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntryItemTag">;
  }>;
  readonly publishedOn?: any;
  readonly source?: {
    readonly name: string;
  };
  readonly url?: string;
  readonly " $fragmentType": "EntryItem";
};
export type EntryItem$key = {
  readonly " $data"?: EntryItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryItem">;
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
      name: "name",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      concreteType: "EntryTag",
      kind: "LinkedField",
      name: "tags",
      plural: true,
      selections: [
        v1 /*: any*/,
        {
          args: null,
          kind: "FragmentSpread",
          name: "EntryItemTag",
        },
      ],
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      concreteType: "EntrySource",
      kind: "LinkedField",
      name: "source",
      plural: false,
      selections: [v1 /*: any*/],
      storageKey: null,
    },
    v5 = [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "url",
        storageKey: null,
      },
      v2 /*: any*/,
      v3 /*: any*/,
      v4 /*: any*/,
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
          v2 /*: any*/,
          v3 /*: any*/,
          v4 /*: any*/,
        ],
        type: "ArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v5 /*: any*/,
        type: "ExternalArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v5 /*: any*/,
        type: "SlideEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v5 /*: any*/,
        type: "OSSEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v5 /*: any*/,
        type: "PodcastEntry",
        abstractKey: null,
      },
    ],
    type: "Entry",
    abstractKey: "__isEntry",
  };
})();

(node as any).hash = "43860ab8cac161ded5d5e6ef0edd9da0";

export default node;
