import { cache } from "react";
import { auth } from "@/auth";
import { findAccountById, type Account } from "@/lib/accounts";

/**
 * Who may open the Will questionnaire and dashboard (/start and everything under it).
 *
 *  - Paying customers (`users`) always.
 *  - Accounts created before FREE_DRAFTING_CUTOFF keep the old "draft first, pay at the end" flow,
 *    so nobody who was already drafting loses their Will.
 *  - Everyone else (guests and new unpaid leads) is shown the checkout instead.
 */
export const FREE_DRAFTING_CUTOFF = new Date("2026-11-27T07:30:00Z");

export type StartAccess =
  | { allowed: true; reason: "paid" | "existing" | "admin" }
  | { allowed: false; reason: "guest" | "unpaid" };

/** True when this account may draft a Will (see the rules above). */
export function hasStartAccess(account: Account): boolean {
  if (account.kind === "user") return true;
  const created = account.doc.createdAt instanceof Date ? account.doc.createdAt : new Date(account.doc.createdAt);
  return created.getTime() < FREE_DRAFTING_CUTOFF.getTime();
}

/** Access for the signed-in visitor of this request (memoised for one render pass). */
export const getStartAccess = cache(async (): Promise<StartAccess> => {
  try {
    const session = await auth();
    if (!session?.user?.id) return { allowed: false, reason: "guest" };
    if (session.user.role === "superadmin") return { allowed: true, reason: "admin" };
    const account = await findAccountById(session.user.id);
    if (!account) return { allowed: false, reason: "guest" };
    if (account.kind === "user") return { allowed: true, reason: "paid" };
    return hasStartAccess(account) ? { allowed: true, reason: "existing" } : { allowed: false, reason: "unpaid" };
  } catch (error) {
    console.error("[start-access] could not resolve access:", error);
    return { allowed: false, reason: "guest" };
  }
});
