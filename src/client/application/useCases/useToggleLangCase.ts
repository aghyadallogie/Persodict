import SettingsService from "@/client/application/services/SettingsService";
import { ToggleLanguage } from "@/server/domain/entities/Settings";
import useSWRMutation from "swr/mutation";
import { useGetUserSettings } from "./useGetUserSettings";

export const useToggleLangCase = ({ userId }: ToggleLanguage) => {
    const { mutate } = useGetUserSettings(userId);

    const { trigger, isMutating, error } = useSWRMutation(
        "/api/settings",
        SettingsService.toggleLang,
        {
            onSuccess: () => {
                mutate();
            }
        }
    );

    return { toggleLang: trigger, isLoading: isMutating, error };
};