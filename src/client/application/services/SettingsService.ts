import { SettingsAdapter } from "@/client/domain/adapters/SettingtsAdapter";
import { UserSettings } from "@/client/domain/entities/Settings";

class SettingsService implements SettingsAdapter {
    async updateUserSettings(
        url: string,
        {arg}: {arg: UserSettings}
    ): Promise<UserSettings | undefined> {
        const res = await fetch('/api/settings', {
            body: JSON.stringify(arg),
            method: 'PATCH'
        });
        console.log('arg', arg);
        
        const data = await res.json() as UserSettings;

        return data;
    }
}

export default new SettingsService();