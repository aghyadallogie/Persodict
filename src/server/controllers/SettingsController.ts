import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS, HTTP_STATUS_CODE } from "@/server/utils/httpstatus";
import { SettingsService } from "@/server/services/SettingsService";

export class SettingsController {
  /**
   * Retrieves the settings for a user and sends them in the response.
   *
   * This method extracts the `userId` from the query parameters of the request,
   * fetches the associated settings using the `SettingsService`, and returns
   * them as a JSON response with a status code of 200. If an error occurs during
   * the process, it logs the error and responds with a 500 status code and an
   * error message.
   *
   * @param {NextApiRequest} req - The API request object, containing the query parameters.
   * @param {NextApiResponse} res - The API response object used to send back the settings or error.
   */
  static async getSettings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const settings = await SettingsService.getSettings(
        req.query.userId as string
      );

      return res.status(HTTP_STATUS_CODE.OK).json({
        data: settings,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      console.error("Error fetching settings:", error);

      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong!",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Updates the settings for a user by toggling a language code and responds with the updated settings.
   *
   * This method retrieves `userId` and `langCode` from the request body, validates them,
   * and calls the `SettingsService` to update the user's settings. It returns the updated
   * settings as a JSON response with a status code of 200. If `userId` or `langCode` is missing,
   * it responds with a 400 status code and an error message. If an error occurs during the process,
   * it logs the error and responds with a 500 status code and an error message.
   *
   * @param {NextApiRequest} req - The API request object, containing the body with `userId` and `langCode`.
   * @param {NextApiResponse} res - The API response object used to send back the updated settings or error.
   */
  static async updateSettings(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { userId, langCode } = await JSON.parse(req.body);

      if (!userId || !langCode) {
        throw new Error("Missing userId or langCode");
      }

      const updatedSettings = await SettingsService.updateSettings({
        userId,
        langCode,
      });

      return res.status(HTTP_STATUS_CODE.OK).json({
        data: updatedSettings,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      console.error("Error updating settings:", error);

      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update settings",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
