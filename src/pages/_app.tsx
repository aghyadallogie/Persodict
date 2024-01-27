/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";
import Layout from "@/client/ui/layouts/Layout";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Head>
      <link
        href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
        rel="stylesheet"
      />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default App;
