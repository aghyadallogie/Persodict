import { ToggleLanguage } from "@/server/domain/entities/Settings";
import useSWRMutation from "swr/mutation";
import SettingsService from "../services/SettingsService";
import { useGetUserSettings } from "./useGetUserSettings";

export const useToggleLangCase = ({ userId }: ToggleLanguage  ) => {
    const { mutate } = useGetUserSettings(userId);

    const { trigger } = useSWRMutation(
        "/api/settings",
        SettingsService.toggleLang,
        {
            onSuccess: () => {
                mutate();
            }
        }
    );

    return { toggleLang: trigger };
};