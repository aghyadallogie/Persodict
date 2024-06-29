import { SettingsModule } from "@/client/ui/modules/Settings/SettingsModule";
import type { Settings } from "@/server/domain/entities/Settings";
import { SettingsService } from "@/server/services/SettingsService";
import { Wrapper } from "..";
import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { NextPageWithLayout } from "../../../types/global";
import SessionLayout from "@/client/ui/layouts/Layout";

interface PageProps {
  userLangs: string[];
}

const Settings: NextPageWithLayout = ({ userLangs }: PageProps) => {
  const { userSettings } = useGetUserSettings({
    userId: "aghy",
    userLangs,
  });

  return (
    <Wrapper>
      <SettingsModule userLangs={userSettings.userLangs} />
    </Wrapper>
  );
};

export default Settings;

Settings.getLayout = (router, pageProps, PageComponent) => (
  <SessionLayout title="Settings">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps = async () => {
  const settings = await SettingsService.getSettings();

  return {
    props: {
      revalidate: 18000,
      userLangs: (settings as Settings).userLangs,
    },
  };
};
