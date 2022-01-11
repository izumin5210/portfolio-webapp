/**
 * @generated SignedSource<<f0bff3742a9f5a8b5da8cb53075b2813>>
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
    readonly " $fragmentSpreads": FragmentRefs<"BlogArticle">;
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "f38b5e8a876f79d2de0afc363f91905a",
      id: null,
      metadata: {},
      name: "BlogArticlePageQuery",
      operationKind: "query",
      text: "query BlogArticlePageQuery(\n  $articlePath: String!\n) {\n  articleEntryByPath(path: $articlePath) {\n    ...BlogArticle\n  }\n}\n\nfragment BlogArticle on ArticleEntry {\n  title\n  body\n  publishedOn\n  updatedOn\n  tags\n}\n",
    },
  };
})();

(node as any).hash = "2bcae5a3a631c6f03e6e6f65d20cca67";

export default node;
