/**
 * @generated SignedSource<<deb1856a1460cb38388ca1e191669ca8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticleOgImagePage_Image$data = {
  readonly title: string;
  readonly tags: ReadonlyArray<{
    readonly name: string;
    readonly displayName: string;
  }>;
  readonly publishedOn: any;
  readonly " $fragmentType": "BlogArticleOgImagePage_Image";
};
export type BlogArticleOgImagePage_Image$key = {
  readonly " $data"?: BlogArticleOgImagePage_Image$data;
  readonly " $fragmentSpreads": FragmentRefs<"BlogArticleOgImagePage_Image">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "BlogArticleOgImagePage_Image",
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

(node as any).hash = "3ec74757f17d788875edf6dc6a0e2bb1";

export default node;
