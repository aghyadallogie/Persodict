import SessionLayout from "@/client/ui/layouts/Layout";
import {SettingsModule} from "@/client/ui/modules/Settings/SettingsModule";
import type {Settings} from "@/server/domain/entities/Settings";
import {SettingsService} from "@/server/services/SettingsService";
import {NextPageWithLayout} from "@/types/global";
import {GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import {Wrapper} from "..";

interface PageProps {
  userLangs: string[];
}

// @ts-ignorets-ignore
const Settings: NextPageWithLayout = ({ userLangs }: PageProps) => {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <SettingsModule userLangs={userLangs} />
    </Wrapper>
  );
};

export default Settings;

Settings.getLayout = (router, pageProps, PageComponent) => (
  <SessionLayout title="Settings">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  const settings = await SettingsService.getSettings(userEmail!);

  return {
    props: {
      revalidate: 18000,
      userLangs: (settings as Settings)?.userLangs || [],
    },
  };
};