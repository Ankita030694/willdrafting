const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: unknown): string {
  return String(raw ?? "").trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/** Returns a clean 10-digit Indian mobile number, or null if it is not valid. */
export function normalizePhone(raw: unknown): string | null {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function cleanName(raw: unknown): string {
  return String(raw ?? "")
    .replace(/[^\p{L}\p{M}\s.'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

/** Returns an error message, or null when the password is acceptable. */
export function validatePassword(password: unknown): string | null {
  const pw = String(password ?? "");
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (pw.length > 72) return "Password must be at most 72 characters.";
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) {
    return "Password must contain at least one letter and one number.";
  }
  return null;
}

/**
 * Only allow post-login redirects back into the dashboard area (prevents open redirects).
 */
export function safeCallbackPath(raw: string | null | undefined, fallback = "/start/dashboard"): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return fallback;
  if (raw.startsWith("/dashboard") || raw.startsWith("/start")) return raw;
  return fallback;
}
