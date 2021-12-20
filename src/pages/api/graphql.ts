import * as fs from "fs/promises";
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import * as yaml from "js-yaml";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { types } from "../../api/graphql";

type Entry = {
  title: string;
  url: string;
  publishedOn: string;
  tags: string[];
  mediaType: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const schema = new GraphQLSchema({
    types: Object.values(types),
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        entries: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(types.Entry))),
          async resolve() {
            const rawData = await fs.readFile(path.join(process.cwd(), "data.yml"), "utf-8");
            const data = yaml.load(rawData) as { entries: Entry };
            return data.entries;
          },
        },
      },
    }),
  });
  const request = {
    body: req.body,
    headers: req.headers,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    method: req.method!,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: "/api/graphql",
      })
    );
    return;
  }

  const { operationName, query, variables } = getGraphQLParameters(request);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });

  await sendResult(result, res);
}
