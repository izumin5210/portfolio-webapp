import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { publicEnv } from "../publicEnv";

class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  public render() {
    return (
      <Html lang="ja">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
            rel="stylesheet"
          />
          <Script strategy="beforeInteractive">{`window.publicEnv = ${JSON.stringify(publicEnv)};`}</Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
