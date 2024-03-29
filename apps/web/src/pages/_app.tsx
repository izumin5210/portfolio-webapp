import { NextPage } from "next";
import type { AppProps as OriginalAppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ReactElement, ReactNode } from "react";
import "sanitize.css";
import { Layout } from "../Layout";
import { LoadThemeScript } from "../lib/ui/useTheme";
import { publicEnv } from "../publicEnv";
import { SystemInfoRibbon } from "../util/SystemInfoRibbon";

const siteName = "izum.in";
const url = "https://izum.in/";
const description = "Masayuki Izumi is a software engineer specializing in Web frontend and backend technologies";
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;

type NextPageWithLayout = NextPage<any, any> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppProps = OriginalAppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, err }: AppProps & { err?: any }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta property="og:title" content={siteName} key="title" />
        <meta property="og:description" name="description" content={description} key="description" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content={url} key="url" />
        <meta property="og:site_name" content="izum.in" key="site_name" />
        <meta name="twitter:creator" content="@izumin5210" />
        <meta name="twitter:site" content="@izumin5210" />
        <link rel="canonical" href={url} key="canonical" />
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" href="/blog/feed" title="izum.in/blog" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {publicEnv.previewedPrNum != null && <meta name="robots" content="noindex,nofollow,noarchive" />}
      </Head>
      <LoadThemeScript />
      {process.env.NODE_ENV === "production" ? (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <Script strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      <SystemInfoRibbon build={process.env.NODE_ENV} previewedPrNum={publicEnv.previewedPrNum} />
      {getLayout(<Component {...pageProps} err={err} />)}
    </>
  );
}

export default MyApp;
