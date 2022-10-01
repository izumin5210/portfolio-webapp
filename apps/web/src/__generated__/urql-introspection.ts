import type { IntrospectionData } from "@urql/exchange-graphcache/dist/types/ast";
export const schema = {
  __schema: {
    queryType: { name: "Query" },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: "OBJECT",
        name: "ArticleEntry",
        fields: [
          {
            name: "body",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "ArticleEntryBody", ofType: null } },
            args: [],
          },
          { name: "id", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "path", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "picked", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "publishedOn", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "source",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntrySource", ofType: null } },
            args: [],
          },
          {
            name: "tags",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryTag", ofType: null } },
              },
            },
            args: [],
          },
          { name: "title", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "updatedOn", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "uuid", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ArticleEntryBody",
        fields: [{ name: "markdown", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] }],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ArticleEntryConnection",
        fields: [
          {
            name: "edges",
            type: {
              kind: "NON_NULL",
              ofType: { kind: "LIST", ofType: { kind: "OBJECT", name: "ArticleEntryEdge", ofType: null } },
            },
            args: [],
          },
          {
            name: "pageInfo",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "PageInfo", ofType: null } },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ArticleEntryEdge",
        fields: [
          { name: "cursor", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "node",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "ArticleEntry", ofType: null } },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "UNION",
        name: "Entry",
        possibleTypes: [
          { kind: "OBJECT", name: "ArticleEntry" },
          { kind: "OBJECT", name: "ExternalArticleEntry" },
          { kind: "OBJECT", name: "OSSEntry" },
          { kind: "OBJECT", name: "PodcastEntry" },
          { kind: "OBJECT", name: "SlideEntry" },
        ],
      },
      {
        kind: "OBJECT",
        name: "EntryConnection",
        fields: [
          {
            name: "edges",
            type: {
              kind: "NON_NULL",
              ofType: { kind: "LIST", ofType: { kind: "OBJECT", name: "EntryEdge", ofType: null } },
            },
            args: [],
          },
          {
            name: "pageInfo",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "PageInfo", ofType: null } },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "EntryEdge",
        fields: [
          { name: "cursor", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "node",
            type: { kind: "NON_NULL", ofType: { kind: "UNION", name: "Entry", ofType: null } },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "EntrySource",
        fields: [{ name: "name", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] }],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "EntryTag",
        fields: [
          { name: "displayName", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "name", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ExternalArticleEntry",
        fields: [
          { name: "id", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "picked", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "publishedOn", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "source",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntrySource", ofType: null } },
            args: [],
          },
          {
            name: "tags",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryTag", ofType: null } },
              },
            },
            args: [],
          },
          { name: "title", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "updatedOn", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "url", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "uuid", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "OSSEntry",
        fields: [
          { name: "id", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "picked", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "publishedOn", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "source",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntrySource", ofType: null } },
            args: [],
          },
          {
            name: "tags",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryTag", ofType: null } },
              },
            },
            args: [],
          },
          { name: "title", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "updatedOn", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "url", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "uuid", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "PageInfo",
        fields: [
          { name: "endCursor", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "hasNextPage", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "hasPreviousPage", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "startCursor", type: { kind: "SCALAR", name: "Any" }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "PodcastEntry",
        fields: [
          { name: "id", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "picked", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "publishedOn", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "source",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntrySource", ofType: null } },
            args: [],
          },
          {
            name: "tags",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryTag", ofType: null } },
              },
            },
            args: [],
          },
          { name: "title", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "updatedOn", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "url", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "uuid", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Query",
        fields: [
          {
            name: "articleEntries",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "ArticleEntryConnection", ofType: null } },
            args: [
              { name: "after", type: { kind: "SCALAR", name: "Any" } },
              { name: "before", type: { kind: "SCALAR", name: "Any" } },
              { name: "first", type: { kind: "SCALAR", name: "Any" } },
              { name: "last", type: { kind: "SCALAR", name: "Any" } },
            ],
          },
          {
            name: "articleEntryByPath",
            type: { kind: "OBJECT", name: "ArticleEntry", ofType: null },
            args: [{ name: "path", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } } }],
          },
          {
            name: "entries",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryConnection", ofType: null } },
            args: [
              { name: "after", type: { kind: "SCALAR", name: "Any" } },
              { name: "before", type: { kind: "SCALAR", name: "Any" } },
              { name: "first", type: { kind: "SCALAR", name: "Any" } },
              { name: "last", type: { kind: "SCALAR", name: "Any" } },
            ],
          },
          {
            name: "entriesByTags",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryConnection", ofType: null } },
            args: [
              { name: "after", type: { kind: "SCALAR", name: "Any" } },
              { name: "before", type: { kind: "SCALAR", name: "Any" } },
              { name: "first", type: { kind: "SCALAR", name: "Any" } },
              { name: "last", type: { kind: "SCALAR", name: "Any" } },
              {
                name: "tags",
                type: {
                  kind: "NON_NULL",
                  ofType: { kind: "LIST", ofType: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } } },
                },
              },
            ],
          },
          {
            name: "pickedEntries",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "UNION", name: "Entry", ofType: null } },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "SlideEntry",
        fields: [
          { name: "id", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "picked", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "publishedOn", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          {
            name: "source",
            type: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntrySource", ofType: null } },
            args: [],
          },
          {
            name: "tags",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: { kind: "NON_NULL", ofType: { kind: "OBJECT", name: "EntryTag", ofType: null } },
              },
            },
            args: [],
          },
          { name: "title", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "updatedOn", type: { kind: "SCALAR", name: "Any" }, args: [] },
          { name: "url", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
          { name: "uuid", type: { kind: "NON_NULL", ofType: { kind: "SCALAR", name: "Any" } }, args: [] },
        ],
        interfaces: [],
      },
      { kind: "SCALAR", name: "Any" },
    ],
    directives: [],
  },
} as IntrospectionData;
