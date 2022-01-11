/**
 * @generated SignedSource<<7470addfa69a5614af286a67554f440f>>
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
  readonly publishedOn: any;
  readonly updatedOn: any;
  readonly tags: ReadonlyArray<string>;
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
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "publishedOn",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "updatedOn",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "tags",
      storageKey: null,
    },
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "106febee3de6d2e42c6de598ed4e1715";

export default node;
