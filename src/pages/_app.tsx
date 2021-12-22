import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useInitRelayEnvironment } from "../lib/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useInitRelayEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
