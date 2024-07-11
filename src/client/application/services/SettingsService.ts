import { SettingsAdapter } from "@/client/domain/adapters/SettingtsAdapter";
import { UserSettings } from "@/client/domain/entities/Settings";

class SettingsService implements SettingsAdapter {
  async getUserSettings(userId: string) {
    const res = await fetch(`/api/settings?userId=${userId}`);
    const data = await res.json();

    return data;
  }

  async updateUserSettings(
    url: string,
    { arg }: { arg: UserSettings }
  ): Promise<UserSettings | undefined> {
    const res = await fetch("/api/settings", {
      body: JSON.stringify(arg),
      method: "PATCH",
    });

    const data = (await res.json()) as UserSettings;

    return data;
  }
}

export default new SettingsService();
