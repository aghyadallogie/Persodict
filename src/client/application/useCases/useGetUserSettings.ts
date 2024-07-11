import useSWR from "swr";
import SettingsService from "../services/SettingsService";
import { UserSettings } from "@/client/domain/entities/Settings";

export const useGetUserSettings = (settings: UserSettings) => {
  const fetcher = (url: string) => SettingsService.getUserSettings(settings.userId);

  const { data, error } = useSWR("/api/settings", fetcher, {
    fallbackData: {
      data: settings,
      status: "test",
    },
  });

  return { userSettings: data?.data, error };
};
