import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { DEFAULT_SECURITY_HEADERS, getPublicOrigin } from "@/lib/http";

const PROXY_SECURITY_HEADERS: Record<string, string> = {
  ...DEFAULT_SECURITY_HEADERS,
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https:; media-src 'self' data: blob: https:; object-src 'none'; base-uri 'self'; form-action 'self' https:; frame-ancestors 'self';",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

function withSecurityHeaders<T extends Response>(res: T): T {
  for (const [key, value] of Object.entries(PROXY_SECURITY_HEADERS)) {
    if (!res.headers.has(key)) {
      res.headers.set(key, value);
    }
  }
  return res;
}

function isProtectedRoute(pathname: string): boolean {
  return (
    pathname === "/authority" ||
    pathname.startsWith("/authority/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/start" ||
    pathname.startsWith("/start/") ||
    pathname === "/complete-profile"
  );
}

const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const origin = getPublicOrigin(req);
  const session = req.auth;
  const isLoggedIn = Boolean(session?.user);
  const role = session?.user?.role;
  const needsPhone = Boolean(session?.user?.needsPhone);

  // 1. Superadmin Portal Protection (/authority and sub-routes)
  if (pathname === "/authority" || pathname.startsWith("/authority/")) {
    if (!isLoggedIn || role !== "superadmin") {
      const loginUrl = new URL("/nullify", origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return withSecurityHeaders(NextResponse.redirect(loginUrl));
    }
    return withSecurityHeaders(NextResponse.next());
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
      return withSecurityHeaders(NextResponse.redirect(loginUrl));
    }

    // Edge-case R2: If user logged in via Google and hasn't provided phone yet
    if (needsPhone && pathname !== "/complete-profile") {
      return withSecurityHeaders(
        NextResponse.redirect(new URL("/complete-profile", origin))
      );
    }

    return withSecurityHeaders(NextResponse.next());
  }

  // 3. Complete Profile route protection
  if (pathname === "/complete-profile") {
    if (!isLoggedIn) {
      return withSecurityHeaders(NextResponse.redirect(new URL("/login", origin)));
    }
    if (!needsPhone) {
      return withSecurityHeaders(
        NextResponse.redirect(new URL("/start/dashboard", origin))
      );
    }
    return withSecurityHeaders(NextResponse.next());
  }

  return withSecurityHeaders(NextResponse.next());
});

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  if (!isProtectedRoute(req.nextUrl.pathname)) {
    return withSecurityHeaders(NextResponse.next());
  }

  const response = await (
    authMiddleware as unknown as (
      request: NextRequest,
      ev: NextFetchEvent
    ) => Promise<Response | undefined>
  )(req, event);

  return withSecurityHeaders(response ?? NextResponse.next());
}

export const config = {
  matcher: [
    "/",
    "/:path*",
    "/dashboard/:path*",
    "/dashboard",
    "/start",
    "/start/:path*",
    "/authority/:path*",
    "/authority",
    "/complete-profile",
  ],
};
