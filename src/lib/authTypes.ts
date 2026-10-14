export type AppRole = "user" | "superadmin";
export type AuthStatus = "unverified" | "verified";
export type PaymentStatus = "unpaid" | "paid";
export type FunnelStage = "lead" | "registered" | "customer";

/** Plans are not finalised yet; ids mirror the ones used in the wizard's plan step. */
export const PLAN_IDS = ["essential", "lawyer_verified", "premium"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

/** Shape of the custom claims we keep inside the Auth.js JWT. */
export interface AppToken {
  sub?: string;
  email?: string | null;
  name?: string | null;
  role?: AppRole;
  phone?: string | null;
  authStatus?: AuthStatus;
  paymentStatus?: PaymentStatus;
  funnelStage?: FunnelStage;
  needsPhone?: boolean;
  /** Unix seconds when the claims were last re-read from MongoDB. */
  refreshedAt?: number;
  /** Unix seconds when the superadmin signed in (superadmin sessions are short). */
  adminIssuedAt?: number;
  [key: string]: unknown;
}

/** Superadmin sessions expire after 8 hours, regardless of the 30 day user session. */
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;
/** Normal user claims are re-read from MongoDB at most this often (plus on sign-in / update()). */
export const CLAIMS_REFRESH_SECONDS = 5 * 60;
