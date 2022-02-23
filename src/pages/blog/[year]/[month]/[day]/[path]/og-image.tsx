import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import puppeteer from "puppeteer";
import { ReactNode } from "react";
import { fetchQuery } from "react-relay";
import { ReactElement } from "rehype-react/lib";
import {
  BlogArticleOgImagePage,
  BlogArticleOgImagePageQuery,
} from "../../../../../../features/Blog/BlogArticleOgImagePage";
import { BlogArticleOgImagePageQuery as BlogArticleOgImagePageQueryType } from "../../../../../../features/Blog/__generated__/BlogArticleOgImagePageQuery.graphql";
import { getPath } from "../../../../../../lib/next-typed-routes";
import { initRelayEnvironment } from "../../../../../../lib/RelayEnvironment";

function OgImage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return props.queryResult ? <BlogArticleOgImagePage queryResult={props.queryResult} /> : null;
}

export type Query = {
  renderHtml?: boolean;
};

export const getServerSideProps: GetServerSideProps<
  {
    queryResult?: BlogArticleOgImagePageQueryType["response"] | undefined;
    initialRecords?: any;
  },
  { year: string; month: string; day: string; path: string }
> = async ({ params, res, query }) => {
  if (query.renderHtml === "true") {
    const env = initRelayEnvironment();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const articlePath = getPath("/blog/[year]/[month]/[day]/[path]", { params: params! });

    const queryResult = await fetchQuery<BlogArticleOgImagePageQueryType>(env, BlogArticleOgImagePageQuery, {
      articlePath,
    }).toPromise();
    const initialRecords = env.getStore().getSource().toJSON();

    if (queryResult?.articleEntryByPath == null) {
      return { notFound: true };
    }

    return {
      props: {
        queryResult,
        initialRecords,
      },
    };
  }

  const articlePath = getPath("/blog/[year]/[month]/[day]/[path]/og-image", {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    params: params!,
    query: { renderHtml: true },
  });
  const url = `http://0.0.0.0:${process.env.PORT ?? "3000"}/${articlePath.slice(1)}`;

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 630,
    },
  });
  const page = await browser.newPage();
  const resp = await page.goto(url);
  if (resp.status() === 404) {
    return { notFound: true };
  }
  if (resp.status() !== 200) {
    throw new Error("failed to render OG image");
  }
  const buf = await page.screenshot({ type: "png" });

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=604800, max-age=604800`); // 60s * 60m * 24h * 7d
  res.end(buf, "binary");

  await browser.close();
  return { props: {} };
};

OgImage.getLayout = (page: ReactElement): ReactNode => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    {page}
  </>
);

export default OgImage;
