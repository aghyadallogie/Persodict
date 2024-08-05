import useSWRMutation from "swr/mutation";
import SettingsService from "@/client/application/services/SettingsService";
import { UserSettings } from "@/client/domain/entities/Settings";

export const useUpdateSettingsCase = (settings: UserSettings) => {
  // const fetcher = (url: string) => SettingsService.updateUserSettings(settings.userId, settings);

  const { trigger } = useSWRMutation(
    "/api/settings",
    SettingsService.updateUserSettings,
    { revalidate: true }
  );

  return { updateSettings: trigger };
};