/**
 * @generated SignedSource<<3a2cddb51051ba998046a72de1012fec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticleOgImagePageQuery$variables = {
  articlePath: string;
};
export type BlogArticleOgImagePageQuery$data = {
  readonly articleEntryByPath: {
    readonly " $fragmentSpreads": FragmentRefs<"BlogArticleOgImagePageCard">;
  } | null;
};
export type BlogArticleOgImagePageQuery = {
  variables: BlogArticleOgImagePageQuery$variables;
  response: BlogArticleOgImagePageQuery$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "articlePath",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "path",
        variableName: "articlePath",
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "BlogArticleOgImagePageQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "ArticleEntry",
          kind: "LinkedField",
          name: "articleEntryByPath",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "BlogArticleOgImagePageCard",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "BlogArticleOgImagePageQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "ArticleEntry",
          kind: "LinkedField",
          name: "articleEntryByPath",
          plural: false,
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "2e369f07bd198c8f86d88973bd99c8b6",
      id: null,
      metadata: {},
      name: "BlogArticleOgImagePageQuery",
      operationKind: "query",
      text: "query BlogArticleOgImagePageQuery(\n  $articlePath: String!\n) {\n  articleEntryByPath(path: $articlePath) {\n    ...BlogArticleOgImagePageCard\n  }\n}\n\nfragment BlogArticleOgImagePageCard on ArticleEntry {\n  title\n  tags {\n    name\n    displayName\n  }\n  publishedOn\n}\n",
    },
  };
})();

(node as any).hash = "565e5d15b421ebb1dc6d810d5a021eb0";

export default node;
