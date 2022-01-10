import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RelayEnvironmentProvider } from "react-relay";
import "sanitize.css";
import { Layout } from "../Layout";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";

const siteName = "izum.in";
const url = "https://izum.in/";
const description = "Masayuki Izumi is a software engineer specializing in Web frontend and backend technologies";
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;

function MyApp({ Component, pageProps, err }: AppProps & { err?: any }) {
  const environment = useInitRelayEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
        <link rel="icon" href="/favicon.png" />
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
      <Layout>
        <Component {...pageProps} err={err} />
      </Layout>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
