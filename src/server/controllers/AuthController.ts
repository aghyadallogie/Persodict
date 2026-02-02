import { AuthService } from "@/server/services/AuthService";
import { HTTP_STATUS, HTTP_STATUS_CODE } from "@/server/utils/httpstatus";
import type { NextApiRequest, NextApiResponse } from "next";

export class AuthController {
  /**
   * Handles user registration requests.
   *
   * This method extracts email and password from the request body,
   * validates them, and calls AuthService to register the user.
   * Returns a success response with the user's id and email.
   *
   * @param {NextApiRequest} req - The API request object containing email and password in the body.
   * @param {NextApiResponse} res - The API response object used to send back the result or error.
   */
  static async register(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Handle both parsed and unparsed request bodies
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { email, password } = body;

      if (!email || !password) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: "Email and password are required",
          status: HTTP_STATUS.BAD_REQUEST,
        });
      }

      const user = await AuthService.register(email, password);

      return res.status(HTTP_STATUS_CODE.OK).json({
        data: user,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      console.error("Error registering user:", error);

      const errorMessage = error instanceof Error ? error.message : "Failed to register user";
      const statusCode = errorMessage.includes("already exists")
        ? HTTP_STATUS_CODE.BAD_REQUEST
        : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

      return res.status(statusCode).json({
        message: errorMessage,
        status: statusCode === HTTP_STATUS_CODE.BAD_REQUEST ? HTTP_STATUS.BAD_REQUEST : HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
