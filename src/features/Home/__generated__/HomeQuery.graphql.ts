/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type HomeQueryVariables = {};
export type HomeQueryResponse = {
  readonly " $fragmentRefs": FragmentRefs<"EntryListEntries">;
};
export type HomeQuery = {
  readonly response: HomeQueryResponse;
  readonly variables: HomeQueryVariables;
};

/*
query HomeQuery {
  ...EntryListEntries
}

fragment EntryListEntries on Query {
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
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "HomeQuery",
      selections: [
        {
          args: null,
          kind: "FragmentSpread",
          name: "EntryListEntries",
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
            {
              kind: "InlineFragment",
              selections: v0 /*: any*/,
              type: "ArticleEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v0 /*: any*/,
              type: "SlideEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v0 /*: any*/,
              type: "OSSEntry",
              abstractKey: null,
            },
            {
              kind: "InlineFragment",
              selections: v0 /*: any*/,
              type: "PodcastEntry",
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "1d1e13baa46778fe1ff8840d566beeee",
      id: null,
      metadata: {},
      name: "HomeQuery",
      operationKind: "query",
      text: "query HomeQuery {\n  ...EntryListEntries\n}\n\nfragment EntryListEntries on Query {\n  entries {\n    __typename\n    ... on ArticleEntry {\n      title\n      url\n    }\n    ... on SlideEntry {\n      title\n      url\n    }\n    ... on OSSEntry {\n      title\n      url\n    }\n    ... on PodcastEntry {\n      title\n      url\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "72710290f4b80f5dd0ab88d7e5cf88e4";
export default node;
