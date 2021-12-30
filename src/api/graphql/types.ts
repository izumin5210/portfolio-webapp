import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from "graphql";
import { connectionDefinitions } from "graphql-relay";

export const ArticleEntry = new GraphQLObjectType({
  name: "ArticleEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const SlideEntry = new GraphQLObjectType({
  name: "SlideEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const OSSEntry = new GraphQLObjectType({
  name: "OSSEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const PodcastEntry = new GraphQLObjectType({
  name: "PodcastEntry",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const Entry = new GraphQLUnionType({
  name: "Entry",
  types: [ArticleEntry, SlideEntry, OSSEntry, PodcastEntry],
  resolveType(source) {
    switch (source.mediaType) {
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
