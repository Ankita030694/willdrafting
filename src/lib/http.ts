import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https://www.google.com https:; media-src 'self' data: blob: https:; object-src 'none'; base-uri 'self'; form-action 'self' https:; frame-ancestors 'self';",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { error: message, ...extra },
    { status, headers: DEFAULT_SECURITY_HEADERS }
  );
}

/** Reads a JSON body without throwing on malformed / empty input. */
export async function readJson(request: NextRequest): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => ({}));
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

export function isLocalhostUrl(urlOrHost: string | undefined | null): boolean {
  if (!urlOrHost) return false;
  return /(^|\/\/)(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/i.test(urlOrHost.trim());
}

/**
 * Resolves the public origin for redirects/OAuth/payment callbacks.
 * In production, ignores any accidental `localhost` value in NEXTAUTH_URL/AUTH_URL or internal container URL.
 */
export function getPublicOrigin(request?: NextRequest): string {
  const isProd = process.env.NODE_ENV === "production";

  if (request) {
    const forwardedHost =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host")?.split(",")[0]?.trim();
    if (forwardedHost && (!isProd || !isLocalhostUrl(forwardedHost))) {
      const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
      const proto = forwardedProto || (isProd && !isLocalhostUrl(forwardedHost) ? "https" : "http");
      return `${proto.replace(/:$/, "")}://${forwardedHost}`;
    }
  }

  const envUrl = (process.env.AUTH_URL || process.env.NEXTAUTH_URL)?.trim();
  if (envUrl && (!isProd || !isLocalhostUrl(envUrl))) {
    try {
      return new URL(envUrl).origin;
    } catch {
      // ignore invalid env URL
    }
  }

  if (request?.nextUrl?.origin && (!isProd || !isLocalhostUrl(request.nextUrl.origin))) {
    return request.nextUrl.origin;
  }

  return isProd ? "https://www.willdrafting.in" : "http://localhost:3000";
}

/**
 * Rewrites a NextRequest's URL origin to the resolved public origin when running in production
 * behind a reverse proxy or when NEXTAUTH_URL was accidentally left as localhost.
 */
export function withPublicOriginRequest(request: NextRequest): NextRequest {
  const publicOrigin = getPublicOrigin(request);
  const currentOrigin = request.nextUrl.origin;
  if (publicOrigin && publicOrigin !== currentOrigin) {
    const rewrittenUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      publicOrigin
    );
    return new NextRequest(rewrittenUrl, request);
  }
  return request;
}

