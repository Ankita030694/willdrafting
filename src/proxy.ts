import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getPublicOrigin } from "@/lib/http";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const origin = getPublicOrigin(req);
  const session = req.auth;
  const isLoggedIn = Boolean(session?.user);
  const role = session?.user?.role;
  const needsPhone = Boolean(session?.user?.needsPhone);

  // 1. Superadmin Portal Protection (/authority and sub-routes)
  if (pathname.startsWith("/authority")) {
    if (!isLoggedIn || role !== "superadmin") {
      const loginUrl = new URL("/nullify", origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Client Area Protection: dashboard + the whole questionnaire (/start and /start/*).
  //    Guests (not logged in) are always sent to /login first.
  const isProtectedClientRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/start" ||
    pathname.startsWith("/start/");

  if (isProtectedClientRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Edge-case R2: If user logged in via Google and hasn't provided phone yet
    if (needsPhone && pathname !== "/complete-profile") {
      return NextResponse.redirect(new URL("/complete-profile", origin));
    }

    return NextResponse.next();
  }

  // 3. Complete Profile route protection
  if (pathname === "/complete-profile") {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", origin));
    }
    if (!needsPhone) {
      return NextResponse.redirect(new URL("/start/dashboard", origin));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/start",
    "/start/:path*",
    "/authority/:path*",
    "/authority",
    "/complete-profile",
  ],
};
