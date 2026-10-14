import crypto from "crypto";

/**
 * Short-lived, single-purpose token that lets the headless browser (which has no login session)
 * open the internal print page for ONE user's verified Will. Minted only after authorizeDownload().
 */
const TTL_MS = 60_000;

function secret(): string {
  const s = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET must be set to sign print tokens.");
  return s;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(`will-pdf:${payload}`).digest("hex");
}

export function mintPdfToken(userId: string): string {
  const payload = `${userId}.${Date.now() + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

/** Returns the user id if the token is authentic and not expired, otherwise null. */
export function verifyPdfToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, exp, sig] = parts;
  const payload = `${userId}.${exp}`;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (!Number.isFinite(Number(exp)) || Date.now() > Number(exp)) return null;
  return userId;
}
