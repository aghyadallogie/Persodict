import { Settings } from "../domain/entities/Settings";
import {prisma} from '../utils/prisma';

export class SettingsService {
  static async getSettings() {   
    try {
      const settings = await prisma.settings.findUnique({
        where: {
          userId: "aghy",
        },
      });

      return settings;
    } catch (error) {
        return error;
    }
  }

  static async updateSettings({userId, userLangs}: Settings) {    
    try {
        const updated = await prisma.settings.create({
            data: {
                userId: userId,
                userLangs: userLangs
            }
        })

        return updated;
    } catch (error) {
        return error;
    }
  }
}
