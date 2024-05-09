import { AuthPayload, AuthenticatedApiRequest } from "@/types/global";
import { NextHandler } from "next-connect";
import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { HTTP_STATUS } from "../utils/httpstatus";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: AuthenticatedApiRequest,
  res: NextResponse,
  next: NextHandler
) => {
  if (req.url === "/api/authenticate") {
    await next();
    return;
  }

  const token = getCookie("user", { req, res });

  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHERIZED)
      .send({ message: "Invalid credentials specified" });
    return;
  }

  let jwtToken: JwtPayload & AuthPayload;

  try {
    jwtToken = jwt.verify(String(token), process.env.JWT_SECRET) as JwtPayload &
      AuthPayload;
  } catch {
    res
      .status(HTTP_STATUS.UNAUTHERIZED)
      .send({ message: "Invalid credentials specified" });
    return;
  }

  req.user = jwtToken.user;
  req.apiKey = jwtToken.apiKey;

  await next();
};
