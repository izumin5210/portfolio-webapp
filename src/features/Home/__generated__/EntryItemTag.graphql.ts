/**
 * @generated SignedSource<<9952a36e4af0acf5ba3fbc5a390129df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryItemTag$data = {
  readonly name: string;
  readonly displayName: string;
  readonly " $fragmentType": "EntryItemTag";
};
export type EntryItemTag$key = {
  readonly " $data"?: EntryItemTag$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryItemTag">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "EntryItemTag",
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
  type: "EntryTag",
  abstractKey: null,
};

(node as any).hash = "af4bc866335112ef0e67127a3ed95666";

export default node;
