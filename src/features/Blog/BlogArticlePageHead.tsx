import Head from "next/head";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { BlogArticlePageHead$key } from "./__generated__/BlogArticlePageHead.graphql";

export function BlogArticlePageHead(props: { article: BlogArticlePageHead$key }) {
  const data = useFragment(
    graphql`
      fragment BlogArticlePageHead on ArticleEntry {
        title
        path
      }
    `,
    props.article
  );
  const url = `https://izum.in${data.path}`;
  return (
    <Head>
      <title>{data.title} - izum.in/blog</title>
      <meta property="og:title" content={data.title} key="title" />
      <meta property="og:type" content="article" key="type" />
      <meta property="og:url" content={url} key="url" />
      <link rel="canonical" href={url} key="canonical" />
    </Head>
  );
}