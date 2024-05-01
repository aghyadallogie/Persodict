import { UserSettings } from "../entities/Settings";

export interface SettingsAdapter {
    updateUserSettings(key: string, mutationArgs: any): Promise<UserSettings | undefined>;
}