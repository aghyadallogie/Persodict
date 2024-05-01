import useSWR from "swr";
import SettingsService from "../services/SettingsService";
import { UserSettings } from "@/client/domain/entities/Settings";

export const useGetUserSettings = (settings: UserSettings) => {
  const { data } = useSWR("/api/settings", SettingsService.getUserSettings, {
    fallbackData: {
      data: settings,
      status: "test",
    },
  });

  return { userSettings: data?.data };
};
