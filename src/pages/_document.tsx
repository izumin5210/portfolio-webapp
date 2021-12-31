import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  public render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet" />
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
