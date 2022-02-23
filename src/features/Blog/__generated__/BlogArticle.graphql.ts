/**
 * @generated SignedSource<<c13e8eae5d10fd8026dc499deb926c4e>>
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
  readonly tags: ReadonlyArray<{
    readonly name: string;
    readonly displayName: string;
  }>;
  readonly " $fragmentType": "BlogArticle";
};
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
  ],
  type: "ArticleEntry",
  abstractKey: null,
};

(node as any).hash = "ed97927e1ca2b40d81d4773d6c5eed14";

export default node;
