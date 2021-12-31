/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EntryListView = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly " $fragmentRefs": FragmentRefs<"EntryItem">;
    } | null;
  } | null> | null;
  readonly " $refType": "EntryListView";
};
export type EntryListView$data = EntryListView;
export type EntryListView$key = {
  readonly " $data"?: EntryListView$data | undefined;
  readonly " $fragmentRefs": FragmentRefs<"EntryListView">;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "EntryListView",
  selections: [
    {
      alias: null,
      args: null,
      concreteType: "EntryEdge",
      kind: "LinkedField",
      name: "edges",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: null,
          kind: "LinkedField",
          name: "node",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "EntryItem",
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "EntryConnection",
  abstractKey: null,
};
(node as any).hash = "9f02d5d54061b3c4a269a8243a50ca6a";
export default node;
