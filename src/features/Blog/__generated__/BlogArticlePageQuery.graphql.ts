/**
 * @generated SignedSource<<c7f8a71ff88c3e0ac985caa61fb1ea6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticlePageQuery$variables = {
  articlePath: string;
};
export type BlogArticlePageQueryVariables = BlogArticlePageQuery$variables;
export type BlogArticlePageQuery$data = {
  readonly articleEntryByPath: {
    readonly " $fragmentSpreads": FragmentRefs<"BlogArticlePageHead" | "BlogArticle">;
  } | null;
};
export type BlogArticlePageQueryResponse = BlogArticlePageQuery$data;
export type BlogArticlePageQuery = {
  variables: BlogArticlePageQueryVariables;
  response: BlogArticlePageQuery$data;
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
      name: "BlogArticlePageQuery",
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
              name: "BlogArticlePageHead",
            },
            {
              args: null,
              kind: "FragmentSpread",
              name: "BlogArticle",
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
      name: "BlogArticlePageQuery",
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
              kind: "ScalarField",
              name: "path",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "metaDescription",
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "298bc2ca503cf73c192dd21bb058bc7f",
      id: null,
      metadata: {},
      name: "BlogArticlePageQuery",
      operationKind: "query",
      text: "query BlogArticlePageQuery(\n  $articlePath: String!\n) {\n  articleEntryByPath(path: $articlePath) {\n    ...BlogArticlePageHead\n    ...BlogArticle\n  }\n}\n\nfragment BlogArticle on ArticleEntry {\n  title\n  body\n  publishedOn\n  updatedOn\n  tags {\n    name\n    displayName\n  }\n}\n\nfragment BlogArticlePageHead on ArticleEntry {\n  title\n  path\n  metaDescription\n}\n",
    },
  };
})();

(node as any).hash = "4683b18a382a6db6e39069a9ecd3b5fd";

export default node;
