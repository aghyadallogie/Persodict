import { UserSettings } from "@/client/domain/entities/Settings";

export interface SettingsAdapter {
    updateUserSettings(key: string, mutationArgs: any): Promise<UserSettings | undefined>;
}