import { SettingsModule } from "@/client/ui/modules/Settings/SettingsModule";
import type { Settings } from "@/server/domain/entities/Settings";
import { SettingsService } from "@/server/services/SettingsService";
import { Wrapper } from "..";

interface PageProps {
  userLangs: string[];
}

const Settings = ({ userLangs }: PageProps) => {
  return (
    <Wrapper>
      <SettingsModule userLangs={userLangs} />
    </Wrapper>
  );
};

export default Settings;

export const getServerSideProps = async () => {
  const settings = await SettingsService.getSettings();

  return {
    props: {
      revalidate: 18000,
      userLangs: (settings as Settings).userLangs,
    },
  };
};
