import { SettingsAdapter } from "@/client/domain/adapters/SettingtsAdapter";
import { ToggleLanguage } from "@/server/domain/entities/Settings";

class SettingsService implements SettingsAdapter {
  async getUserSettings(userId: string) {
    const res = await fetch(`/api/settings?userId=${userId}`);
    const data = await res.json();

    return data;
  }

  // @ts-expect-error  // Ignoring TypeScript error for compatibility with the API response
  async toggleLang(
    key: string,
    { arg }: { arg: ToggleLanguage }
  ): Promise<ToggleLanguage | undefined> {
    const res = await fetch("/api/settings", {
      body: JSON.stringify(arg),
      method: "PATCH"
    });

    const data = (await res.json());  
  
    return data;
  }
}

export default new SettingsService();