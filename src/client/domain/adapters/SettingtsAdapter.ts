import { ToggleLanguage } from "@/server/domain/entities/Settings";
import { ToggleLanguageArgs, UserSettings } from "@/client/domain/entities/Settings";

export interface SettingsAdapter {
    toggleLang(key: string, args: ToggleLanguageArgs): Promise<ToggleLanguage | undefined>;
    getUserSettings(userId: string): Promise<UserSettings>;
}