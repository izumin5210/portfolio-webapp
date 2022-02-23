/**
 * @generated SignedSource<<6946381248542c5f7807cab48767a9ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticleOgImagePageCard$data = {
  readonly title: string;
  readonly tags: ReadonlyArray<{
    readonly name: string;
    readonly displayName: string;
  }>;
  readonly publishedOn: any;
  readonly " $fragmentType": "BlogArticleOgImagePageCard";
};
export type BlogArticleOgImagePageCard$key = {
  readonly " $data"?: BlogArticleOgImagePageCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlogArticleOgImagePageCard">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "BlogArticleOgImagePageCard",
  selections: [
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
      concreteType: "EntryTag",
      kind: "LinkedField",
      name: "tags",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "name",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "displayName",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "4a4cb6283bfd28a32b7d9f3e5cec3f7c";

export default node;
