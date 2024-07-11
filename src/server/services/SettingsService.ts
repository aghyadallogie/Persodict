import { Settings } from "../domain/entities/Settings";
import { prisma } from "../utils/prisma";

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

  static async updateSettings({ userId, userLangs }: Settings) {
    try {
      // Check if the record exists
      const existingSettings = await prisma.settings.findUnique({
        where: { userId },
      });

      if (!existingSettings) {
        // Handle the case where the record does not exist
        const created = await prisma.settings.create({
          data: {
            userLangs,
            userId,
          },
        });
        return created;
      }

      // Update the existing record
      const updated = await prisma.settings.update({
        where: { userId },
        data: {
          userId,
          userLangs,
        },
      });
      return updated;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }
}
