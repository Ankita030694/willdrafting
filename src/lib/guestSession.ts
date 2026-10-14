import { NextRequest, NextResponse } from "next/server";

export const GUEST_SESSION_COOKIE = "will_guest_session";
export const GUEST_SESSION_STORAGE_KEY = "willdrafting_guest_session_id";
export const GUEST_SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

/**
 * Generates a collision-resistant guest session identifier.
 */
export function generateGuestSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `gst_${crypto.randomUUID().replace(/-/g, "")}`;
  }
  return `gst_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 12)}`;
}

/**
 * Parses the raw cookie header string and extracts the guest session ID if present.
 */
export function getGuestSessionFromCookieHeader(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${GUEST_SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1].trim()) : null;
}

/**
 * Reads the guest session from a NextRequest, checking:
 * 1. Request cookies (`request.cookies.get(GUEST_SESSION_COOKIE)`)
 * 2. Fallback custom header (`x-guest-session-id`)
 */
export function readGuestSessionFromRequest(request: NextRequest): string | null {
  const fromCookie = request.cookies.get(GUEST_SESSION_COOKIE)?.value?.trim();
  if (fromCookie) return fromCookie;

  const fromHeader = request.headers.get("x-guest-session-id")?.trim();
  if (fromHeader) return fromHeader;

  return null;
}

/**
 * Attaches the guest session cookie to an outgoing NextResponse.
 */
export function setGuestSessionCookie(response: NextResponse, sessionId: string): void {
  response.cookies.set(GUEST_SESSION_COOKIE, sessionId, {
    maxAge: GUEST_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // Accessible to client so it can be preserved in localStorage and headers
  });
}

/**
 * Client-side browser helper:
 * Reads existing guest session from document.cookie or localStorage.
 * If absent, generates a new one and writes to both document.cookie and localStorage.
 */
export function getOrSetClientGuestSession(): string {
  if (typeof window === "undefined") return "";

  // 1. Try reading from cookie
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${GUEST_SESSION_COOKIE}=([^;]+)`));
  let sessionId = match ? decodeURIComponent(match[1].trim()) : null;

  // 2. Try reading from localStorage fallback
  if (!sessionId) {
    try {
      sessionId = localStorage.getItem(GUEST_SESSION_STORAGE_KEY);
    } catch {
      sessionId = null;
    }
  }

  // 3. If neither exists, generate new ID
  if (!sessionId) {
    sessionId = generateGuestSessionId();
  }

  // 4. Ensure both cookie and localStorage are set
  try {
    const isSecure = window.location.protocol === "https:";
    document.cookie = `${GUEST_SESSION_COOKIE}=${encodeURIComponent(sessionId)}; path=/; max-age=${GUEST_SESSION_MAX_AGE}; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    localStorage.setItem(GUEST_SESSION_STORAGE_KEY, sessionId);
  } catch (err) {
    console.warn("Could not persist guest session to storage:", err);
  }

  return sessionId;
}
