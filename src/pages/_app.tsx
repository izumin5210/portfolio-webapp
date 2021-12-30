import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { styled } from "@linaria/react";

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useInitRelayEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
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
