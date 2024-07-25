import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS } from "@/server/utils/httpstatus";
import { SettingsService } from "@/server/services/SettingsService";
import { Settings } from "@/server/domain/entities/Settings";

export class SettingsController {
  static async getSettings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const settings = await SettingsService.getSettings(req.query.userId as string);

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
      const body = JSON.parse(req.body);

      const updatedSettings = await SettingsService.updateSettings({
        userId: body.userId,
        userLangs: body.userLangs,
      } as Settings);

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
