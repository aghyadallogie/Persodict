import { ToggleLanguage } from "@/server/domain/entities/Settings";
import useSWRMutation from "swr/mutation";
import { useGetUserSettings } from "./useGetUserSettings";
import SettingsService from "@/client/application/services/SettingsService";

export const useToggleLangCase = ({ userId }: ToggleLanguage) => {
    const { mutate } = useGetUserSettings(userId);

    const { trigger, isMutating } = useSWRMutation(
        "/api/settings",
        SettingsService.toggleLang,
        {
            onSuccess: () => {
                mutate();
            }
        }
    );

    return { toggleLang: trigger, isLoading: isMutating };
};