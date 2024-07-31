import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  { pages: { signIn: "/" } }
);

export const config = {
  matcher: ["/"],
};