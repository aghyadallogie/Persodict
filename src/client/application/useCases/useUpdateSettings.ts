import useSWRMutation from "swr/mutation";
import SettingsService from "../services/SettingsService";

export const useUpdateSettingsCase = () => {
  const { trigger } = useSWRMutation(
    "/api/settings",
    SettingsService.updateUserSettings,
    { revalidate: true }
  );

  return { updateSettings: trigger };
};
