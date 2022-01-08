import * as fs from "fs";
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import yaml from "js-yaml";
import path from "path";
import * as types from "./types";

type Entry = {
  title: string;
  url?: string;
  path?: string;
  publishedOn: string;
  tags: string[];
  source?: { name: string; type: string };
  picked: boolean;
};

type Tag = {
  name: string;
};

const rawData = fs.readFileSync(path.join(process.cwd(), "data.yml"), "utf-8");
const data = yaml.load(rawData) as { entries: Entry[]; tags: Tag[] };

function fetchEntries() {
  return data.entries.sort((e1, e2) => -(new Date(e1.publishedOn).getTime() - new Date(e2.publishedOn).getTime()));
}

export const schema = new GraphQLSchema({
  types: Object.values(types),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      entries: {
        type: new GraphQLNonNull(types.EntryConnection),
        args: connectionArgs,
        async resolve(_root, args) {
          return connectionFromArray(fetchEntries(), args);
        },
      },
      entriesByTags: {
        type: new GraphQLNonNull(types.EntryConnection),
        args: {
          ...connectionArgs,
          tags: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
          },
        },
        async resolve(_root, { tags, ...args }) {
          const entries = fetchEntries().filter((e) => (tags as string[]).every((tag) => e.tags.includes(tag)));
          return connectionFromArray(entries, args);
        },
      },
      pickedEntries: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.Entry))),
        async resolve(_root, _args) {
          return fetchEntries().filter((e) => e.picked);
        },
      },
    },
  }),
});
