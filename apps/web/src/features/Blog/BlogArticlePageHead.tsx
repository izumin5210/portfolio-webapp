import Head from "next/head";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";

const Fragment = gql(/* GraphQL */ `
  fragment BlogArticlePageHead on ArticleEntry {
    title
    path
    metaDescription
  }
`);

export function BlogArticlePageHead(props: { data: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.data);
  const url = `https://izum.in${fragment.path}`;
  return (
    <Head>
      <title>{fragment.title} - izum.in/blog</title>
      <meta property="og:title" content={fragment.title} key="title" />
      <meta property="og:description" name="description" content={fragment.metaDescription} key="description" />
      <meta property="og:type" content="article" key="type" />
      <meta property="og:url" content={url} key="url" />
      <meta property="og:image" content={`${url}/og-image`} key="image" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <link rel="canonical" href={url} key="canonical" />
    </Head>
  );
}
