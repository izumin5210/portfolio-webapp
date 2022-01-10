import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { RelayEnvironmentProvider } from "react-relay";
import "sanitize.css";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";
import { backgroundColor, colors } from "../lib/styles/colors";
import { caption } from "../lib/styles/typo";

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
      <Main>
        <EnvRibbon />
        <Component {...pageProps} err={err} />
        <Footer>
          &copy; 2022{" "}
          <a href="https://github.com/izumin5210" rel="noopener noreferrer" target="_blank">
            izumin5210
          </a>
          <br />
          This site uses{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics
          </a>
          .
          <br />
          built at {process.env.BUILT_AT}{" "}
          <a
            href={`https://github.com/izumin5210/portfolio-webapp/commit/${process.env.GIT_SHA}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {process.env.GIT_SHA}
          </a>
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
  color: ${colors.textLowEmphasis};
  text-align: center;

  & a {
    &:hover {
      background: ${backgroundColor({ state: "hover" })};
    }
    &:focus {
      background: ${backgroundColor({ state: "focus" })};
    }
    &:active {
      background: ${backgroundColor({ state: "pressed" })};
    }
    &:focus-visible {
      outline: 2px solid ${colors.blue700};
    }
    &:focus:not(:focus-visible) {
      outline: 0;
    }
    position: relative;
    &:before {
      position: absolute;
      bottom: 2px;
      content: "";
      width: 100%;
      transition: all 300ms;
      border-bottom: 1px dotted ${colors.gray500};
    }
    &:hover,
    &:focus,
    &:active {
      &:before {
        border-bottom: 1px dotted transparent;
      }
    }
    border-radius: 4px;
    color: ${colors.textLowEmphasis};
    text-decoration: none;
    transition: background 300ms;
  }
`;

function EnvRibbon() {
  // FIXME: stop using NODE_ENV
  if (process.env.NODE_ENV === "production") return null;
  return <div className={ribbonCss}>{process.env.NODE_ENV}</div>;
}

const ribbonCss = css`
  position: fixed;
  overflow: hidden;
  top: 16px;
  right: -24px;
  z-index: 10000;
  ${caption};
  width: 108px;
  height: 24px;
  line-height: 24px;
  color: ${colors.textLight};
  transform: rotate(45deg);
  text-align: center;
  background-color: ${colors.gray600};
`;

export default MyApp;
