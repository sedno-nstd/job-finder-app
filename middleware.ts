import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  if (
    isAuth &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/employer") && token?.role !== "employer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/employerRegistration/:path*",
    "/register/:path*",
    "/onBoarding/:path*",
    "/dashboard/:path*",
  ],
};
