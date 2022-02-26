import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ReactElement, ReactNode } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import "sanitize.css";
import { Layout } from "../Layout";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";

const siteName = "izum.in";
const url = "https://izum.in/";
const description = "Masayuki Izumi is a software engineer specializing in Web frontend and backend technologies";
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, err }: AppPropsWithLayout & { err?: any }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  const environment = useInitRelayEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Head>
        <title>{siteName}</title>
        <meta property="og:title" content={siteName} key="title" />
        <meta property="og:description" name="description" content={description} key="description" />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:url" content={url} key="url" />
        <meta property="og:site_name" content="izum.in" key="site_name" />
        <link rel="canonical" href={url} key="canonical" />
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" href="/blog/feed" title="izum.in/blog" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
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
      {getLayout(<Component {...pageProps} err={err} />)}
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
