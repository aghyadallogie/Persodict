import Head from "next/head";
import styled from "styled-components";
import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
import SessionLayout from "@/client/ui/layouts/Layout";
import { NextPageWithLayout } from "../../types/global";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { SettingsService } from "@/server/services/SettingsService";
import { Settings } from "@/server/domain/entities/Settings";

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
  <SessionLayout title="Persodict">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  const settings = await SettingsService.getSettings(userEmail!);
  const userLangs = (settings as Settings)?.userLangs;

  if (!userLangs) {
    return {
      redirect: {
        destination: '/settings',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userLangs: userLangs || [],
    },
  };
};