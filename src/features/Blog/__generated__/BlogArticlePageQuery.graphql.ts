/**
 * @generated SignedSource<<4f7ab461717efc15124e05bb1b2ce57e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
export type BlogArticlePageQuery$variables = {
  articlePath: string;
};
export type BlogArticlePageQueryVariables = BlogArticlePageQuery$variables;
export type BlogArticlePageQuery$data = {
  readonly articleEntryByPath: {
    readonly title: string;
    readonly body: string;
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
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "path",
            variableName: "articlePath",
          },
        ],
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
            name: "body",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "BlogArticlePageQuery",
      selections: v1 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "BlogArticlePageQuery",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "3fc2b97b7c6243eb4d2b243f00ab6d74",
      id: null,
      metadata: {},
      name: "BlogArticlePageQuery",
      operationKind: "query",
      text: "query BlogArticlePageQuery(\n  $articlePath: String!\n) {\n  articleEntryByPath(path: $articlePath) {\n    title\n    body\n  }\n}\n",
    },
  };
})();

(node as any).hash = "83e59fe4b8f60eda57fa84184660f517";

export default node;
