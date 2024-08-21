import SettingsService from "@/client/application/services/SettingsService";
import useSWRMutation from "swr/mutation";

export const useUpdateSettingsCase = () => {

  const { trigger } = useSWRMutation(
    "/api/settings",
    SettingsService.toggleLang,
    { revalidate: true }
  );

  return { updateSettings: trigger };
};