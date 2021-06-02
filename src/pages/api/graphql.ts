import { promises as fs } from "fs";
import * as path from "path";
import { ApolloServer, Config, gql } from "apollo-server-micro";

const typeDefs: Config["typeDefs"] = gql`
  type Query {
    postByPath(publishedDate: String!, slug: String!): Post
  }
  type Post {
    slug: String!
    title: String!
    content: String!
    publishedDate: String!
  }
`;

const postsDir = path.join(process.cwd(), "_posts");

const resolvers: Config["resolvers"] = {
  Query: {
    postByPath: (_source, args, _ccontext, _info) => {
      const content = fs.readFile(path.join(postsDir, args.publishedDate, `${args.slug}.md`), "utf8");
      return {
        slug: args.slug,
        publishedDate: args.publishedDate,
        content,
        title: "Title", // TODO
      };
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
