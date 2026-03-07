import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  const applicantClose = ["employer", "employerRegistration/path*"];
  if (
    isAuth &&
    token?.role === "applicant" &&
    applicantClose.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  const employerClose = ["/applicantRegistration", "/onBoarding"];
  if (
    isAuth &&
    token?.role === "employer" &&
    employerClose.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.redirect(new URL("/employer", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/profile/:path*"],
};
