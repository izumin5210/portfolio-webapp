/**
 * @generated SignedSource<<00e917455e5754af4695756f6170e828>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntryItem_tag$data = {
  readonly name: string;
  readonly displayName: string;
  readonly " $fragmentType": "EntryItem_tag";
};
export type EntryItem_tag = EntryItem_tag$data;
export type EntryItem_tag$key = {
  readonly " $data"?: EntryItem_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntryItem_tag">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "EntryItem_tag",
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

(node as any).hash = "df58fbca6fedab77b678efa23d204e26";

export default node;
