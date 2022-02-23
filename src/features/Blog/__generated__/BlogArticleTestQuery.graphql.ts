/**
 * @generated SignedSource<<be2ba2051f1ad4419e2f8b3c9264dc01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BlogArticleTestQuery$variables = {};
export type BlogArticleTestQuery$data = {
  readonly articleEntryByPath: {
    readonly " $fragmentSpreads": FragmentRefs<"BlogArticle">;
  } | null;
};
export type BlogArticleTestQuery = {
  variables: BlogArticleTestQuery$variables;
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
          storageKey: 'articleEntryByPath(path:"test-path")',
        },
      ],
    },
    params: {
      cacheID: "e1aa28b30dadd6fecda4a0d2d255c4a0",
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
          "articleEntryByPath.publishedOn": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "Date",
          },
          "articleEntryByPath.tags": {
            enumValues: null,
            nullable: false,
            plural: true,
            type: "EntryTag",
          },
          "articleEntryByPath.tags.displayName": v1 /*: any*/,
          "articleEntryByPath.tags.name": v1 /*: any*/,
          "articleEntryByPath.title": v1 /*: any*/,
          "articleEntryByPath.updatedOn": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Date",
          },
        },
      },
      name: "BlogArticleTestQuery",
      operationKind: "query",
      text: 'query BlogArticleTestQuery {\n  articleEntryByPath(path: "test-path") {\n    ...BlogArticle\n  }\n}\n\nfragment BlogArticle on ArticleEntry {\n  title\n  body\n  publishedOn\n  updatedOn\n  tags {\n    name\n    displayName\n  }\n}\n',
    },
  };
})();

(node as any).hash = "4c4de6e4dba691d135043210d3ed8d97";

export default node;
