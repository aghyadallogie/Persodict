import { ToggleLanguage } from "@/server/domain/entities/Settings";

export interface SettingsAdapter {
    toggleLang(key: string, args: any): Promise<ToggleLanguage | undefined>;
    getUserSettings(userId: string): Promise<any>;
}