import { prisma } from "@/server/utils/prisma";
import { ToggleLanguage } from "@/server/domain/entities/Settings";

export class SettingsService {
  static async getSettings(userId: string) {
    try {
      const settings = await prisma.settings.findUnique({
        where: {
          userId,
        },
      });

      return settings;
    } catch (error) {
      return error;
    }
  }

  static async updateSettings({ userId, langCode }: ToggleLanguage) {
    try {
      // Check if the record exists
      const existingSettings = await prisma.settings.findUnique({
        where: { userId },
      });

      if (!existingSettings) {
        const created = await prisma.settings.create({
          data: {
            userLangs: [langCode],
            userId,
          },
        });
        return created;
      }

      const { userLangs } = existingSettings;

      let payload;

      if (userLangs.includes(langCode)) {
        payload = userLangs.filter(lang => lang !== langCode);
      } else {
        payload = [...userLangs, langCode]
      }

      const updated = await prisma.settings.update({

        where: { userId },
        data: {
          userId,
          userLangs: payload,
        },
      });

      return updated;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }
}
