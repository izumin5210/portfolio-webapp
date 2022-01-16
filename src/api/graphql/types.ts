import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from "graphql";
import { connectionDefinitions } from "graphql-relay";
import { GraphQLDate } from "graphql-scalars";
import path from "path";
import * as fs from "fs/promises";

export const Date = GraphQLDate;

export const EntrySource = new GraphQLObjectType({
  name: "EntrySource",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const EntryTag = new GraphQLObjectType({
  name: "EntryTag",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ArticleEntry = new GraphQLObjectType({
  name: "ArticleEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(root): Promise<string> {
        const filename = `${root.path
          .replace("/blog/", "/_articles/")
          .replace(/\/(\d{4})\/(\d{2})\/(\d{2})\//, "/$1-$2-$3-")}.md`;
        return fs.readFile(path.join(process.cwd(), filename), "utf-8");
      },
    },
    path: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EntryTag))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    updatedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
    picked: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const ExternalArticleEntry = new GraphQLObjectType({
  name: "ExternalArticleEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EntryTag))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
    picked: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const SlideEntry = new GraphQLObjectType({
  name: "SlideEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EntryTag))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
    picked: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const OSSEntry = new GraphQLObjectType({
  name: "OSSEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EntryTag))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
    picked: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const PodcastEntry = new GraphQLObjectType({
  name: "PodcastEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EntryTag))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
    picked: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const Entry = new GraphQLUnionType({
  name: "Entry",
  types: [ArticleEntry, ExternalArticleEntry, SlideEntry, OSSEntry, PodcastEntry],
  resolveType(source) {
    switch (source.source.type) {
      case "article":
        return "ArticleEntry";
      case "externalArticle":
        return "ExternalArticleEntry";
      case "slide":
        return "SlideEntry";
      case "oss":
        return "OSSEntry";
      case "podcast":
        return "PodcastEntry";
    }
  },
});

export const { connectionType: EntryConnection } = connectionDefinitions({
  nodeType: Entry,
});
