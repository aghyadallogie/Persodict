import { prisma } from "@/server/utils/prisma";
import { ToggleLanguage } from "@/server/domain/entities/Settings";
import { Settings } from "@prisma/client";

export class SettingsService {
  /**
   * Retrieves the settings for a specific user.
   *
   * This method queries the database to find the settings associated with the provided `userId`.
   * If no settings are found, it explicitly returns `null`.
   *
   * @param {string} userId - The unique identifier of the user whose settings are to be fetched.
   * @returns {Promise<Settings | null>} A promise resolving to the user's settings or `null` if not found.
   * @throws Will throw an error if the settings cannot be fetched due to a database error.
   */
  static async getSettings(userId: string): Promise<Settings | null> {
    try {
      const settings = await prisma.settings.findUnique({
        where: { userId },
      });

      return settings ?? null;
    } catch (error) {
      console.error("Error fetching user settings:", error);
      throw new Error("Failed to fetch user settings");
    }
  }

  /**
   * Updates the settings for a specific user by adding or removing a language code.
   *
   * This method first checks if the user has existing settings. If not, it creates a new
   * settings record with the provided `langCode` set as the user's language. If the
   * settings exist, it checks if the `langCode` is already in the user's language list.
   * If it is, it removes the language code from the list. If not, it adds the language
   * code to the list.
   *
   * @param {ToggleLanguage} { userId, langCode } - The user ID and the language code to be toggled.
   * @returns {Promise<Settings>} A promise resolving to the updated user settings.
   * @throws Will throw an error if the settings cannot be updated due to a database error.
   */
  static async updateSettings({ userId, langCode }: ToggleLanguage) {
    try {
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

      const updatedUserLangs = userLangs.includes(langCode)
        ? userLangs.filter((lang) => lang !== langCode)
        : [...userLangs, langCode];

      const updated = await prisma.settings.update({
        where: { userId },
        data: {
          userLangs: updatedUserLangs,
        },
      });

      return updated;
    } catch (error) {
      console.error("Error updating settings:", error);
      throw new Error("Failed to update user settings");
    }
  }
}