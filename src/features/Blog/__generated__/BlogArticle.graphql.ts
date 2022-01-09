/**
 * @generated SignedSource<<a7ac4cc9cd8046a871539ed175f05b23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticle$data = {
  readonly title: string;
  readonly body: string;
  readonly " $fragmentType": "BlogArticle";
};
export type BlogArticle = BlogArticle$data;
export type BlogArticle$key = {
  readonly " $data"?: BlogArticle$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlogArticle">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "BlogArticle",
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
      name: "body",
      storageKey: null,
    },
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "0c4f87490e4b343968b6fdb2efd969dd";

export default node;
