import type { NextApiRequest, NextApiResponse } from "next";
import { HTTP_STATUS_CODE } from "./httpstatus";

export const errorHandler = (
  err: unknown,
  req: NextApiRequest,
  res: NextApiResponse
): void => {
  const { message = "Unknown error" } = err as Error;

  res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message,
    status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  });
};