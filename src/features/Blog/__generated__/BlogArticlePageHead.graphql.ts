/**
 * @generated SignedSource<<a214c3f6412c352c6b56735e5f39343c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticlePageHead$data = {
  readonly title: string;
  readonly path: string;
  readonly metaDescription: string;
  readonly " $fragmentType": "BlogArticlePageHead";
};
export type BlogArticlePageHead$key = {
  readonly " $data"?: BlogArticlePageHead$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlogArticlePageHead">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "BlogArticlePageHead",
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
      kind: "ScalarField",
      name: "path",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "metaDescription",
      storageKey: null,
    },
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "bcb2f137a025c4bf5f8031c8ea7828d9";

export default node;
