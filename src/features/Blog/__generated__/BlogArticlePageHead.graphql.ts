/**
 * @generated SignedSource<<70c5a9938c476746cc89e82432833334>>
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
  readonly " $fragmentType": "BlogArticlePageHead";
};
export type BlogArticlePageHead = BlogArticlePageHead$data;
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
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "74a678a46945e84055f5b8520f1d2441";

export default node;
