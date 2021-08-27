import { Fragment } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "./_app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="root">
      <Head>
        <link rel="icon" href="https://chriskr.github.io/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
