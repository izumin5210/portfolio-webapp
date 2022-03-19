/**
 * @generated SignedSource<<446524f0f155397b03d4a6521414eda8>>
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
      name: "publishedOn",
      storageKey: null,
    },
    v2 = {
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
    v3 = [
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
        ],
        type: "ArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v3 /*: any*/,
        type: "ExternalArticleEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v3 /*: any*/,
        type: "SlideEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v3 /*: any*/,
        type: "OSSEntry",
        abstractKey: null,
      },
      {
        kind: "InlineFragment",
        selections: v3 /*: any*/,
        type: "PodcastEntry",
        abstractKey: null,
      },
    ],
    type: "Entry",
    abstractKey: "__isEntry",
  };
})();

(node as any).hash = "14dcd336c04546798af0ad31831ed8ad";

export default node;
