/**
 * @generated SignedSource<<2eced056efd5ebba84b18592f19ff6b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticleTestQuery$variables = {};
export type BlogArticleTestQueryVariables = BlogArticleTestQuery$variables;
export type BlogArticleTestQuery$data = {
  readonly articleEntryByPath: {
    readonly " $fragmentSpreads": FragmentRefs<"BlogArticle">;
  } | null;
};
export type BlogArticleTestQueryResponse = BlogArticleTestQuery$data;
export type BlogArticleTestQuery = {
  variables: BlogArticleTestQueryVariables;
  response: BlogArticleTestQuery$data;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "path",
        value: "test-path",
      },
    ],
    v1 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "String",
    },
    v2 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "Date",
    };
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "BlogArticleTestQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
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
          storageKey: 'articleEntryByPath(path:"test-path")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "BlogArticleTestQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
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
          storageKey: 'articleEntryByPath(path:"test-path")',
        },
      ],
    },
    params: {
      cacheID: "2c1da5e2fc57bbe45f6e7e32e1ab043a",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          articleEntryByPath: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "ArticleEntry",
          },
          "articleEntryByPath.body": v1 /*: any*/,
          "articleEntryByPath.publishedOn": v2 /*: any*/,
          "articleEntryByPath.tags": {
            enumValues: null,
            nullable: false,
            plural: true,
            type: "String",
          },
          "articleEntryByPath.title": v1 /*: any*/,
          "articleEntryByPath.updatedOn": v2 /*: any*/,
        },
      },
      name: "BlogArticleTestQuery",
      operationKind: "query",
      text: 'query BlogArticleTestQuery {\n  articleEntryByPath(path: "test-path") {\n    ...BlogArticle\n  }\n}\n\nfragment BlogArticle on ArticleEntry {\n  title\n  body\n  publishedOn\n  updatedOn\n  tags\n}\n',
    },
  };
})();

(node as any).hash = "4c4de6e4dba691d135043210d3ed8d97";

export default node;
