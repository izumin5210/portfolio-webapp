import { ApolloServer, Config, gql } from "apollo-server-micro";

const typeDefs: Config["typeDefs"] = gql`
  type Query {
    posts: [Post!]!
    postByPath(publishedDate: String!, slug: String!): Post
  }
  type Post {
    slug: String!
    title: String!
    content: String!
    publishedDate: String!
  }
`;

const posts = [
  {
    slug: "test-post",
    title: "Test post",
    content: "# Test post\nHello, my blog!",
    publishedDate: "2021-06-01",
  },
];

const resolvers: Config["resolvers"] = {
  Query: {
    posts: (_source, _args, _context, _info) => {
      return posts;
    },
    postByPath: (_source, args, _ccontext, _info) => {
      return posts.find((post) => post.publishedDate === args.publishedDate && post.slug === args.slug);
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
