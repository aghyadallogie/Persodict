import useSWRMutation from "swr/mutation";
import SettingsService from "@/client/application/services/SettingsService";
import { UserSettings } from "@/client/domain/entities/Settings";

export const useUpdateSettingsCase = (settings: UserSettings) => {

  const { trigger } = useSWRMutation(
    "/api/settings",
    SettingsService.toggleLang,
    { revalidate: true }
  );

  return { updateSettings: trigger };
};