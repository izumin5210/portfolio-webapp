import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SSRData } from "next-urql";
import Head from "next/head";
import puppeteer from "puppeteer-core";
import { ReactNode } from "react";
import { ReactElement } from "rehype-react/lib";
import {
  BlogArticleOgImagePage,
  BlogArticleOgImagePageQuery,
} from "../../../../../../features/Blog/BlogArticleOgImagePage";
import { getPath } from "../../../../../../lib/next-typed-routes";
import { initUrqlClient, withUrqlClient } from "../../../../../../util/urqlSSR";

function OgImage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return props.articlePath ? <BlogArticleOgImagePage articlePath={props.articlePath} /> : null;
}

export type Query = {
  renderHtml?: boolean;
};

export const getServerSideProps: GetServerSideProps<
  { articlePath?: string; urqlState?: SSRData },
  { year: string; month: string; day: string; path: string }
> = async ({ params, res, query }) => {
  if (query.renderHtml === "true") {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const articlePath = getPath("/blog/[year]/[month]/[day]/[path]", { params: params! });

    const { client, ssrCache } = initUrqlClient();
    const res = await client?.query(BlogArticleOgImagePageQuery, { articlePath }).toPromise();
    if (res?.data?.articleEntryByPath == null) {
      return { notFound: true };
    }

    return {
      props: {
        articlePath,
        urqlState: ssrCache.extractData(),
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
    channel: "chrome",
    args: process.env.NODE_ENV === "production" ? ["--no-sandbox"] : [],
  });
  const page = await browser.newPage();
  const resp = await page.goto(url, { waitUntil: "networkidle2" });
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

export default withUrqlClient(OgImage);
