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
        metaDescription
      }
    `,
    props.article
  );
  const url = `https://izum.in${data.path}`;
  return (
    <Head>
      <title>{data.title} - izum.in/blog</title>
      <meta property="og:title" content={data.title} key="title" />
      <meta property="og:description" name="description" content={data.metaDescription} key="description" />
      <meta property="og:type" content="article" key="type" />
      <meta property="og:url" content={url} key="url" />
      <meta property="og:image" content={`${url}/og-image`} key="image" />
      <link rel="canonical" href={url} key="canonical" />
    </Head>
  );
}
