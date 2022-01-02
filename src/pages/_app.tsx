import { styled } from "@linaria/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RelayEnvironmentProvider } from "react-relay";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";
import "../styles/globals.css";

const siteName = "izum.in";
const url = "https://izum.in/";
const description = "Masayuki Izumi is a software engineer specializing in Web frontend and backend technologies";
const gaId = "G-SE8VNVJKBN";

function MyApp({ Component, pageProps }: AppProps) {
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
          <Script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}" />
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
      <Main>
        <Component {...pageProps} />
      </Main>
    </RelayEnvironmentProvider>
  );
}

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
`;

export default MyApp;
