import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SSRData } from "next-urql";
import { BlogArticlePage, BlogArticlePageQuery } from "../../../../../features/Blog/BlogArticlePage";
import { getPath } from "../../../../../lib/next-typed-routes";
import { initUrqlClient, withUrqlClient } from "../../../../../util/urqlSSR";

const BlogArticle = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <BlogArticlePage articlePath={props.articlePath} />;
};

export const getServerSideProps: GetServerSideProps<
  { articlePath: string; urqlState: SSRData },
  { year: string; month: string; day: string; path: string }
> = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const articlePath = getPath("/blog/[year]/[month]/[day]/[path]", { params: ctx.params! });

  const { client, ssrCache } = initUrqlClient();
  const res = await client?.query(BlogArticlePageQuery, { articlePath }).toPromise();
  if (res?.data?.articleEntryByPath == null) {
    return { notFound: true };
  }

  return {
    props: {
      articlePath,
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(BlogArticle);
