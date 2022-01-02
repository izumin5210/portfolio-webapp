import { styled } from "@linaria/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RelayEnvironmentProvider } from "react-relay";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";
import { caption } from "../lib/styles/typo";
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
      <Main>
        <Component {...pageProps} />
        <Footer>
          This site uses Google Analytics. For more information, please refer to{" "}
          <FooterAnchor
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics Terms of Use
          </FooterAnchor>
          .
        </Footer>
      </Main>
    </RelayEnvironmentProvider>
  );
}

const Main = styled.main`
  margin: 0 auto;
  max-width: 960px;
`;

const Footer = styled.footer`
  padding: 8px;
  ${caption}
  color: rgba(0, 0, 0, 0.84);
`;

const FooterAnchor = styled.a`
  &:hover,
  &:focus,
  &:active {
    color: #00bcd4;
  }
  text-decoration: underline;
`;

export default MyApp;
