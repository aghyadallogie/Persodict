import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS } from "../utils/httpstatus";
import { SettingsService } from "../services/SettingsService";
import { Settings } from "../domain/entities/Settings";

export class SettingsController {
  static async getSettings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const settings = await SettingsService.getSettings();

      return res.send({
        data: settings,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      return {
        message: "Something went wrong!",
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }
  }

  static async updateSettings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const updatedSettings = await SettingsService.updateSettings({
        userId: req.body.userId,
        userLangs: req.body.userLangs,
      });

      return res.send({
        data: updatedSettings,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      return {
        error,
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
  }
}
