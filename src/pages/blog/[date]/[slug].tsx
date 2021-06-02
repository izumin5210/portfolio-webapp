import { GetStaticPaths, GetStaticProps } from "next";
import { Post, PostRoot } from "../../../components/blog";

type Props = {
  post: Post;
};

const Entry = (props: Props) => {
  return <PostRoot {...props} />;
};

type Params = {
  date: string;
  slug: string;
};

const runQuery = async (query: string, { variables = {} }: { variables?: any } = {}) => {
  const resp = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data, error } = await resp.json();
  if (error) {
    throw error;
  }
  return data;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }
  const { slug, date } = params;
  const query = `
    query PostByPath($slug: String!, $publishedDate: String!) {
      postByPath(slug: $slug, publishedDate: $publishedDate) { slug, title, content, publishedDate }
    }
  `;
  const data: { postByPath: Post } = await runQuery(query, { variables: { slug, publishedDate: date } });
  if (data.postByPath == null) {
    return { notFound: true };
  }
  return {
    props: { post: data.postByPath },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = "query PostPaths { posts { slug, publishedDate } }";
  const data = await runQuery(query);
  return {
    paths: data.posts.map((post: any) => ({
      params: {
        slug: post.slug,
        date: post.publishedDate,
      },
    })),
    fallback: "blocking",
  };
};

export default Entry;
