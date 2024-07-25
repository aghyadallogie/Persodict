import { SettingsModule } from "@/client/ui/modules/Settings/SettingsModule";
import type { Settings } from "@/server/domain/entities/Settings";
import { SettingsService } from "@/server/services/SettingsService";
import { Wrapper } from "..";
import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { NextPageWithLayout } from "@/types/global";
import SessionLayout from "@/client/ui/layouts/Layout";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

interface PageProps {
  userLangs: string[];
}

// @ts-ignorets-ignore
const Settings: NextPageWithLayout = ({ userLangs }: PageProps) => {
  const { data: session } = useSession();

  const { userSettings } = useGetUserSettings({
    userId: session?.user?.email as string,
    userLangs,
  });

  return (
    <Wrapper>
      <SettingsModule userLangs={userSettings?.userLangs} />
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