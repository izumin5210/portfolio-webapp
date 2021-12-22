/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type HomeQueryVariables = {};
export type HomeQueryResponse = {
  readonly entries: ReadonlyArray<{
    readonly title?: string | undefined;
    readonly url?: string | undefined;
  }>;
};
export type HomeQuery = {
  readonly response: HomeQueryResponse;
  readonly variables: HomeQueryVariables;
};

/*
query HomeQuery {
  entries {
    __typename
    ... on ArticleEntry {
      title
      url
    }
    ... on SlideEntry {
      title
      url
    }
    ... on OSSEntry {
      title
      url
    }
    ... on PodcastEntry {
      title
      url
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
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
        name: "url",
        storageKey: null,
      },
    ],
    v1 = {
      kind: "InlineFragment",
      selections: v0 /*: any*/,
      type: "ArticleEntry",
      abstractKey: null,
    },
    v2 = {
      kind: "InlineFragment",
      selections: v0 /*: any*/,
      type: "SlideEntry",
      abstractKey: null,
    },
    v3 = {
      kind: "InlineFragment",
      selections: v0 /*: any*/,
      type: "OSSEntry",
      abstractKey: null,
    },
    v4 = {
      kind: "InlineFragment",
      selections: v0 /*: any*/,
      type: "PodcastEntry",
      abstractKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "HomeQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: null,
          kind: "LinkedField",
          name: "entries",
          plural: true,
          selections: [v1 /*: any*/, v2 /*: any*/, v3 /*: any*/, v4 /*: any*/],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "HomeQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: null,
          kind: "LinkedField",
          name: "entries",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "__typename",
              storageKey: null,
            },
            v1 /*: any*/,
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "dca0f25e74ac570f92642e5d8213aae3",
      id: null,
      metadata: {},
      name: "HomeQuery",
      operationKind: "query",
      text: "query HomeQuery {\n  entries {\n    __typename\n    ... on ArticleEntry {\n      title\n      url\n    }\n    ... on SlideEntry {\n      title\n      url\n    }\n    ... on OSSEntry {\n      title\n      url\n    }\n    ... on PodcastEntry {\n      title\n      url\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "7051a491108cb70214a931ce0023941c";
export default node;
