/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "@/client/ui/layouts/Layout";
import { ThemeProvider } from "styled-components";
import { theme } from "@/client/ui/utils/globalStyles";

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;
