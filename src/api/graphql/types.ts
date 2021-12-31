import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from "graphql";
import { connectionDefinitions } from "graphql-relay";
import { GraphQLDate } from "graphql-scalars";

export const Date = GraphQLDate;

export const EntrySource = new GraphQLObjectType({
  name: "EntrySource",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ArticleEntry = new GraphQLObjectType({
  name: "ArticleEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
  },
});

export const SlideEntry = new GraphQLObjectType({
  name: "SlideEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
  },
});

export const OSSEntry = new GraphQLObjectType({
  name: "OSSEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
  },
});

export const PodcastEntry = new GraphQLObjectType({
  name: "PodcastEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    publishedOn: { type: new GraphQLNonNull(Date) },
    source: { type: new GraphQLNonNull(EntrySource) },
  },
});

export const Entry = new GraphQLUnionType({
  name: "Entry",
  types: [ArticleEntry, SlideEntry, OSSEntry, PodcastEntry],
  resolveType(source) {
    switch (source.source.type) {
      case "article":
        return "ArticleEntry";
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
