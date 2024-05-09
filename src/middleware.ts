import { NextRequest, NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";

export default async function middleware(
  req: NextRequest
): Promise<NextResponse | Response | null> {
  const { pathname, search } = req.nextUrl;
  const url = req.nextUrl.clone();
  const token = req.cookies.get("user")?.value ?? false;

  if (token as boolean) {
    const isValid = await jwt.verify(String(token), process.env.JWT_SECRET!);

    if (isValid) {
      if (pathname.startsWith("/login")) {
        url.pathname = "/";

        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("redirect", pathname + search);

  return NextResponse.redirect(url);
}

export const config = {matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|robots.txt).*)']};