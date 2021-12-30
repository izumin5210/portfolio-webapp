import * as fs from "fs/promises";
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import yaml from "js-yaml";
import path from "path";
import * as types from "./types";

export const schema = new GraphQLSchema({
  types: Object.values(types),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      entries: {
        type: new GraphQLNonNull(types.EntryConnection),
        args: connectionArgs,
        async resolve(_root, args) {
          type Entry = {
            title: string;
            url: string;
            publishedOn: string;
            tags: string[];
            mediaType: string;
          };
          const rawData = await fs.readFile(path.join(process.cwd(), "data.yml"), "utf-8");
          const data = yaml.load(rawData) as { entries: Entry[] };
          const entries = data.entries.sort(
            (e1, e2) => -(new Date(e1.publishedOn).getTime() - new Date(e2.publishedOn).getTime())
          );
          return connectionFromArray(entries, args);
        },
      },
    },
  }),
});
