import SettingsService from "@/client/application/services/SettingsService";
import useSWR from "swr";

export const useGetUserSettings = (userId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/settings?userId=${userId}`,
    () => SettingsService.getUserSettings(userId)
  );

  return {
    userSettings: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};