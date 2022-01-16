/**
 * @generated SignedSource<<77e774555839ef17a71f5bb53115ea3a>>
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
export type EntryItemTag = EntryItemTag$data;
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
