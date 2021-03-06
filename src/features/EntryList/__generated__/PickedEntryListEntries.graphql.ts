/**
 * @generated SignedSource<<3440035ea21cc92ba3aeeaa22a40f76d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PickedEntryListEntries$data = {
  readonly pickedEntries: ReadonlyArray<{
    readonly title?: string;
    readonly path?: string;
    readonly url?: string;
    readonly source?: {
      readonly name: string;
    };
  }>;
  readonly " $fragmentType": "PickedEntryListEntries";
};
export type PickedEntryListEntries$key = {
  readonly " $data"?: PickedEntryListEntries$data;
  readonly " $fragmentSpreads": FragmentRefs<"PickedEntryListEntries">;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    v1 = [
      v0 /*: any*/,
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
    ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "PickedEntryListEntries",
    selections: [
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "pickedEntries",
        plural: true,
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
            ],
            type: "ArticleEntry",
            abstractKey: null,
          },
          {
            kind: "InlineFragment",
            selections: v1 /*: any*/,
            type: "ExternalArticleEntry",
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
    ],
    type: "Query",
    abstractKey: null,
  };
})();

(node as any).hash = "ac0df1df19aaede54d94c8f031e34d8b";

export default node;
