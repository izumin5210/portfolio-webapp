import * as fs from "fs/promises";
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import path from "path";
import yaml from "js-yaml";
import * as types from "./types";

export const schema = new GraphQLSchema({
  types: Object.values(types),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      entries: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.Entry))),
        async resolve() {
          type Entry = {
            title: string;
            url: string;
            publishedOn: string;
            tags: string[];
            mediaType: string;
          };
          const rawData = await fs.readFile(path.join(process.cwd(), "data.yml"), "utf-8");
          const data = yaml.load(rawData) as { entries: Entry[] };
          return data.entries.sort(
            (e1, e2) => -(new Date(e1.publishedOn).getTime() - new Date(e2.publishedOn).getTime())
          );
        },
      },
    },
  }),
});
