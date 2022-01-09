import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { fetchQuery } from "react-relay";
import { BlogArticlePage, BlogArticlePageQuery } from "../../features/Blog/BlogArticlePage";
import { BlogArticlePageQuery as BlogArticlePageQueryType } from "../../features/Blog/__generated__/BlogArticlePageQuery.graphql";
import { initRelayEnvironment } from "../../lib/RelayEnvironment";

const BlogArticle = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return props.queryResult ? <BlogArticlePage queryResult={props.queryResult} /> : null;
};

export const getServerSideProps: GetServerSideProps<
  {
    queryResult: BlogArticlePageQueryType["response"] | undefined;
    initialRecords: any;
  },
  { path: string[] }
> = async (ctx) => {
  const articlePath = `/blog/${(ctx.params?.path ?? []).join("/")}`;
  const env = initRelayEnvironment();

  const queryResult = await fetchQuery<BlogArticlePageQueryType>(env, BlogArticlePageQuery, {
    articlePath,
  }).toPromise();
  const initialRecords = env.getStore().getSource().toJSON();

  return {
    props: {
      queryResult,
      initialRecords,
    },
  };
};

export default BlogArticle;
