/* eslint-disable */
import * as graphql from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  fragment BlogArticle on ArticleEntry {\n    title\n    body\n    publishedOn\n    updatedOn\n    tags {\n      name\n      displayName\n    }\n  }\n":
    graphql.BlogArticleFragmentDoc,
  "\n  query GetBlogArticleOgImagePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticleOgImagePageCard\n    }\n  }\n":
    graphql.GetBlogArticleOgImagePageDocument,
  "\n  fragment BlogArticleOgImagePageCard on ArticleEntry {\n    title\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n  }\n":
    graphql.BlogArticleOgImagePageCardFragmentDoc,
  "\n  query GetBlogArticlePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticlePageHead\n      ...BlogArticle\n    }\n  }\n":
    graphql.GetBlogArticlePageDocument,
  "\n  fragment BlogArticlePageHead on ArticleEntry {\n    title\n    path\n    metaDescription\n  }\n":
    graphql.BlogArticlePageHeadFragmentDoc,
  "\n  query GetEntriesPage($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {\n    ...PickedEntryListEntries\n    ...EntryList\n    ...EntryListByTags @include(if: $filteredByTags)\n  }\n":
    graphql.GetEntriesPageDocument,
  "\n  fragment EntryItem on Entry {\n    ... on ArticleEntry {\n      title\n      path\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on ExternalArticleEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on SlideEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on OSSEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on PodcastEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n  }\n":
    graphql.EntryItemFragmentDoc,
  "\n  fragment EntryList on Query {\n    entries(first: $count, after: $cursor) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n":
    graphql.EntryListFragmentDoc,
  "\n  fragment EntryListByTags on Query {\n    entriesByTags(first: $count, after: $cursor, tags: $tags) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n":
    graphql.EntryListByTagsFragmentDoc,
  "\n  fragment EntryListView on EntryConnection {\n    edges {\n      node {\n        __typename\n        ... on ArticleEntry {\n          publishedOn\n        }\n        ... on ExternalArticleEntry {\n          publishedOn\n        }\n        ... on SlideEntry {\n          publishedOn\n        }\n        ... on OSSEntry {\n          publishedOn\n        }\n        ... on PodcastEntry {\n          publishedOn\n        }\n        ...EntryItem\n      }\n    }\n  }\n":
    graphql.EntryListViewFragmentDoc,
  "\n  query GetEntryList($cursor: String, $count: Int!) {\n    ...EntryList\n  }\n": graphql.GetEntryListDocument,
  "\n  query GetEntryListByTags($cursor: String, $count: Int!, $tags: [String!]!) {\n    ...EntryListByTags\n  }\n":
    graphql.GetEntryListByTagsDocument,
  "\n  fragment PickedEntryListEntries on Query {\n    pickedEntries {\n      __typename\n      ... on ArticleEntry {\n        title\n        path\n      }\n      ... on ExternalArticleEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on SlideEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on OSSEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on PodcastEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n    }\n  }\n":
    graphql.PickedEntryListEntriesFragmentDoc,
};

export function gql(
  source: "\n  fragment BlogArticle on ArticleEntry {\n    title\n    body\n    publishedOn\n    updatedOn\n    tags {\n      name\n      displayName\n    }\n  }\n"
): typeof documents["\n  fragment BlogArticle on ArticleEntry {\n    title\n    body\n    publishedOn\n    updatedOn\n    tags {\n      name\n      displayName\n    }\n  }\n"];
export function gql(
  source: "\n  query GetBlogArticleOgImagePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticleOgImagePageCard\n    }\n  }\n"
): typeof documents["\n  query GetBlogArticleOgImagePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticleOgImagePageCard\n    }\n  }\n"];
export function gql(
  source: "\n  fragment BlogArticleOgImagePageCard on ArticleEntry {\n    title\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n  }\n"
): typeof documents["\n  fragment BlogArticleOgImagePageCard on ArticleEntry {\n    title\n    tags {\n      name\n      displayName\n    }\n    publishedOn\n  }\n"];
export function gql(
  source: "\n  query GetBlogArticlePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticlePageHead\n      ...BlogArticle\n    }\n  }\n"
): typeof documents["\n  query GetBlogArticlePage($articlePath: String!) {\n    articleEntryByPath(path: $articlePath) {\n      ...BlogArticlePageHead\n      ...BlogArticle\n    }\n  }\n"];
export function gql(
  source: "\n  fragment BlogArticlePageHead on ArticleEntry {\n    title\n    path\n    metaDescription\n  }\n"
): typeof documents["\n  fragment BlogArticlePageHead on ArticleEntry {\n    title\n    path\n    metaDescription\n  }\n"];
export function gql(
  source: "\n  query GetEntriesPage($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {\n    ...PickedEntryListEntries\n    ...EntryList\n    ...EntryListByTags @include(if: $filteredByTags)\n  }\n"
): typeof documents["\n  query GetEntriesPage($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {\n    ...PickedEntryListEntries\n    ...EntryList\n    ...EntryListByTags @include(if: $filteredByTags)\n  }\n"];
export function gql(
  source: "\n  fragment EntryItem on Entry {\n    ... on ArticleEntry {\n      title\n      path\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on ExternalArticleEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on SlideEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on OSSEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on PodcastEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n  }\n"
): typeof documents["\n  fragment EntryItem on Entry {\n    ... on ArticleEntry {\n      title\n      path\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on ExternalArticleEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on SlideEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on OSSEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n    ... on PodcastEntry {\n      title\n      url\n      # tags {\n      #   name\n      #   ...EntryItemTag\n      # }\n      publishedOn\n      source {\n        name\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  fragment EntryList on Query {\n    entries(first: $count, after: $cursor) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n"
): typeof documents["\n  fragment EntryList on Query {\n    entries(first: $count, after: $cursor) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n"];
export function gql(
  source: "\n  fragment EntryListByTags on Query {\n    entriesByTags(first: $count, after: $cursor, tags: $tags) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n"
): typeof documents["\n  fragment EntryListByTags on Query {\n    entriesByTags(first: $count, after: $cursor, tags: $tags) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      ...EntryListView\n    }\n  }\n"];
export function gql(
  source: "\n  fragment EntryListView on EntryConnection {\n    edges {\n      node {\n        __typename\n        ... on ArticleEntry {\n          publishedOn\n        }\n        ... on ExternalArticleEntry {\n          publishedOn\n        }\n        ... on SlideEntry {\n          publishedOn\n        }\n        ... on OSSEntry {\n          publishedOn\n        }\n        ... on PodcastEntry {\n          publishedOn\n        }\n        ...EntryItem\n      }\n    }\n  }\n"
): typeof documents["\n  fragment EntryListView on EntryConnection {\n    edges {\n      node {\n        __typename\n        ... on ArticleEntry {\n          publishedOn\n        }\n        ... on ExternalArticleEntry {\n          publishedOn\n        }\n        ... on SlideEntry {\n          publishedOn\n        }\n        ... on OSSEntry {\n          publishedOn\n        }\n        ... on PodcastEntry {\n          publishedOn\n        }\n        ...EntryItem\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  query GetEntryList($cursor: String, $count: Int!) {\n    ...EntryList\n  }\n"
): typeof documents["\n  query GetEntryList($cursor: String, $count: Int!) {\n    ...EntryList\n  }\n"];
export function gql(
  source: "\n  query GetEntryListByTags($cursor: String, $count: Int!, $tags: [String!]!) {\n    ...EntryListByTags\n  }\n"
): typeof documents["\n  query GetEntryListByTags($cursor: String, $count: Int!, $tags: [String!]!) {\n    ...EntryListByTags\n  }\n"];
export function gql(
  source: "\n  fragment PickedEntryListEntries on Query {\n    pickedEntries {\n      __typename\n      ... on ArticleEntry {\n        title\n        path\n      }\n      ... on ExternalArticleEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on SlideEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on OSSEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on PodcastEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n    }\n  }\n"
): typeof documents["\n  fragment PickedEntryListEntries on Query {\n    pickedEntries {\n      __typename\n      ... on ArticleEntry {\n        title\n        path\n      }\n      ... on ExternalArticleEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on SlideEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on OSSEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n      ... on PodcastEntry {\n        title\n        url\n        source {\n          name\n        }\n      }\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
