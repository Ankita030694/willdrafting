import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = Boolean(session?.user);
  const role = session?.user?.role;
  const needsPhone = Boolean(session?.user?.needsPhone);

  // 1. Superadmin Portal Protection (/authority and sub-routes)
  if (pathname.startsWith("/authority")) {
    if (!isLoggedIn || role !== "superadmin") {
      const loginUrl = new URL("/nullify", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Client Dashboard Route Protection (/dashboard and sub-routes)
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname === "/start/dashboard") {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Edge-case R2: If user logged in via Google and hasn't provided phone yet
    if (needsPhone && pathname !== "/complete-profile") {
      return NextResponse.redirect(new URL("/complete-profile", req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  // 3. Complete Profile route protection
  if (pathname === "/complete-profile") {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    if (!needsPhone) {
      return NextResponse.redirect(new URL("/start/dashboard", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/start/dashboard",
    "/authority/:path*",
    "/authority",
    "/complete-profile",
  ],
};
