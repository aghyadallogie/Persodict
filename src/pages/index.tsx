import SessionLayout from "@/client/ui/layouts/Layout";
import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
import { NextPageWithLayout } from "@/types/global";
import Head from "next/head";
import styled from "styled-components";

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Persodict</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <Wrapper>
      <TranslateModule />
    </Wrapper>
  </>
);

export default Home;

export const Wrapper = styled.main`
  margin: auto;
  max-width: 40rem;
`;

Home.getLayout = (router, pageProps, PageComponent) => (
  <SessionLayout title="Persodict | Translate">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps = async () => ({ props: {} });