import crypto from "crypto";
import { ObjectId } from "mongodb";
import { willsCol } from "@/lib/db/collections";
import type { WillDoc } from "@/lib/db/types";
import { findAccountById, type Account } from "@/lib/accounts";
import { BLANK_STATE, runLegalHealthCheck, type WillDraftingState } from "@/lib/willDraftingStore";
import { normalizeWillState } from "@/lib/inputSanitizers";

/** Hard cap on a saved will (JSON bytes) so the endpoint cannot be used to store arbitrary blobs. */
export const MAX_WILL_BYTES = 1_500_000;

/** Statuses that imply payment. A client may only keep them if the account really paid. */
const PAID_ONLY_STATUSES = new Set(["approved", "finalised", "lawyer_review", "clarification_requested"]);

export interface SessionAccount {
  account: Account;
  userId: ObjectId;
  email: string;
  /** Paid customers live in `users`; everyone else is a lead. This is the only source of truth. */
  paid: boolean;
}

/** Resolves the signed-in session id to a real account (null when deleted / unknown). */
export async function resolveSessionAccount(sessionUserId: string | undefined | null): Promise<SessionAccount | null> {
  if (!sessionUserId) return null;
  const account = await findAccountById(sessionUserId);
  if (!account) return null;
  return {
    account,
    userId: account.doc._id,
    email: account.doc.email,
    paid: account.kind === "user",
  };
}

export function hashWillState(state: unknown): string {
  if (!state || typeof state !== "object") {
    return crypto.createHash("sha256").update(JSON.stringify(state)).digest("hex");
  }
  const s = state as Record<string, unknown>;
  const canonical = {
    testator: s.testator ?? null,
    familyMembers: s.familyMembers ?? [],
    assets: s.assets ?? [],
    allocations: s.allocations ?? [],
    residuaryBeneficiaryId: s.residuaryBeneficiaryId ?? null,
    residuaryBeneficiaryName: s.residuaryBeneficiaryName ?? null,
    residuaryPrimary02Name: s.residuaryPrimary02Name ?? null,
    residuaryAlternateId: s.residuaryAlternateId ?? null,
    residuaryAlternateName: s.residuaryAlternateName ?? null,
    residuaryBackup02Name: s.residuaryBackup02Name ?? null,
    executorPrimary: s.executorPrimary ?? null,
    executorAlternate: s.executorAlternate ?? null,
    guardianPrimary: s.guardianPrimary ?? null,
    guardianAlternate: s.guardianAlternate ?? null,
    specialWishes: s.specialWishes ?? null,
    emotionalReason: s.emotionalReason ?? null,
    funeralWishes: s.funeralWishes ?? null,
  };
  return crypto.createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

export function isWillHashValid(state: unknown, storedHash: string | null | undefined): boolean {
  if (!storedHash) return false;
  if (storedHash === hashWillState(state)) return true;
  const legacyHash = crypto.createHash("sha256").update(JSON.stringify(state)).digest("hex");
  return storedHash === legacyHash;
}

export async function getWill(userId: ObjectId): Promise<WillDoc | null> {
  const col = await willsCol();
  return col.findOne({ userId });
}

export async function getGuestWill(sessionId: string): Promise<WillDoc | null> {
  const col = await willsCol();
  return col.findOne({ sessionId, isGuest: true });
}

export async function deleteWill(userId: ObjectId): Promise<boolean> {
  const col = await willsCol();
  const res = await col.deleteOne({ userId });
  return res.deletedCount > 0;
}

export async function deleteGuestWill(sessionId: string): Promise<boolean> {
  const col = await willsCol();
  const res = await col.deleteOne({ sessionId, isGuest: true });
  return res.deletedCount > 0;
}

/** What the client is allowed to see about a will document. */
export function publicWill(will: WillDoc, paid: boolean) {
  return {
    exists: true as const,
    state: will.state,
    version: will.version,
    updatedAt: will.updatedAt,
    detailsVerified: Boolean(will.detailsVerified),
    detailsVerifiedAt: will.detailsVerifiedAt ?? null,
    locked: Boolean(will.lockedAt || will.detailsVerified),
    paid,
    isGuest: Boolean(will.isGuest),
  };
}

/** Removes client-controlled flags that only the server may set, clamps paid-only statuses, and normalizes all strings. */
export function sanitizeIncomingState(raw: unknown, paid: boolean): WillDraftingState | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const state = { ...(raw as Record<string, unknown>) };
  delete state.detailsVerified;
  delete state.detailsVerifiedAt;

  if (!state.testator || typeof state.testator !== "object") return null;
  for (const key of ["familyMembers", "assets", "allocations"]) {
    if (!Array.isArray(state[key])) state[key] = [];
  }
  if (!paid && typeof state.willStatus === "string" && PAID_ONLY_STATUSES.has(state.willStatus)) {
    state.willStatus = "draft_ready";
  }
  return normalizeWillState(state as unknown as WillDraftingState, true);
}

export type SaveWillResult =
  | { ok: true; will: WillDoc }
  | { ok: false; reason: "locked"; will: WillDoc };

/** Saves the questionnaire. Permanently refuses writes once the will is locked (verified via OTP). */
export async function saveWill(session: SessionAccount, state: WillDraftingState): Promise<SaveWillResult> {
  const col = await willsCol();
  const now = new Date();

  for (let attempt = 0; attempt < 2; attempt++) {
    const existing = await col.findOne({ userId: session.userId });

    if (existing) {
      if (existing.lockedAt || existing.detailsVerified) {
        return { ok: false, reason: "locked", will: existing };
      }
      const res = await col.findOneAndUpdate(
        { _id: existing._id, lockedAt: null as never },
        {
          $set: {
            state,
            email: session.email,
            updatedAt: now,
            detailsVerified: false,
            detailsVerifiedAt: null,
            lockedAt: null,
            verifiedHash: null,
          },
          $inc: {
            version: 1,
          },
        },
        { returnDocument: "after" }
      );
      if (res) return { ok: true, will: res };
      continue;
    }

    const doc: WillDoc = {
      _id: new ObjectId(),
      userId: session.userId,
      email: session.email,
      state,
      version: 1,
      detailsVerified: false,
      detailsVerifiedAt: null,
      lockedAt: null,
      verifiedHash: null,
      unlockCount: 0,
      downloadCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    try {
      await col.insertOne(doc);
      return { ok: true, will: doc };
    } catch (err) {
      if ((err as { code?: number }).code === 11000) continue; // parallel first save
      throw err;
    }
  }

  const latest = await col.findOne({ userId: session.userId });
  if (latest) return { ok: true, will: latest };
  throw new Error("Could not save the will.");
}

/** Saves a guest questionnaire by sessionId with a 30-day TTL. */
export async function saveGuestWill(sessionId: string, state: WillDraftingState): Promise<SaveWillResult> {
  const col = await willsCol();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  for (let attempt = 0; attempt < 2; attempt++) {
    const existing = await col.findOne({ sessionId, isGuest: true });

    if (existing) {
      if (existing.lockedAt || existing.detailsVerified) {
        return { ok: false, reason: "locked", will: existing };
      }
      const res = await col.findOneAndUpdate(
        { _id: existing._id, lockedAt: null as never },
        {
          $set: {
            state,
            updatedAt: now,
            expiresAt,
            detailsVerified: false,
            detailsVerifiedAt: null,
            lockedAt: null,
            verifiedHash: null,
          },
          $inc: {
            version: 1,
          },
        },
        { returnDocument: "after" }
      );
      if (res) return { ok: true, will: res };
      continue;
    }

    const doc: WillDoc = {
      _id: new ObjectId(),
      sessionId,
      isGuest: true,
      state,
      version: 1,
      detailsVerified: false,
      detailsVerifiedAt: null,
      lockedAt: null,
      verifiedHash: null,
      unlockCount: 0,
      downloadCount: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt,
    };
    try {
      await col.insertOne(doc);
      return { ok: true, will: doc };
    } catch (err) {
      if ((err as { code?: number }).code === 11000) continue; // parallel first save
      throw err;
    }
  }

  const latest = await col.findOne({ sessionId, isGuest: true });
  if (latest) return { ok: true, will: latest };
  throw new Error("Could not save guest will.");
}

/**
 * Claims a guest draft when a user registers or logs in.
 * If the user already has a saved will, we keep the user's existing will.
 * Otherwise, the guest will is converted into the user's permanent will.
 */
export async function claimGuestWill(userId: ObjectId, email: string, sessionId: string): Promise<WillDoc | null> {
  const col = await willsCol();
  const guestWill = await col.findOne({ sessionId, isGuest: true });
  if (!guestWill) return null;

  const existingUserWill = await col.findOne({ userId });
  if (existingUserWill) {
    return existingUserWill;
  }

  const now = new Date();
  const updated = await col.findOneAndUpdate(
    { _id: guestWill._id, isGuest: true },
    {
      $set: {
        userId,
        email,
        isGuest: false,
        updatedAt: now,
      },
      $unset: {
        sessionId: 1,
        expiresAt: 1,
      },
      $inc: { version: 1 },
    },
    { returnDocument: "after" }
  );

  return updated;
}

export interface Completeness {
  ok: boolean;
  problems: string[];
}

/** Server-side re-run of the legal health check. The client's opinion is never trusted. */
export function assessWillCompleteness(state: WillDraftingState): Completeness {
  const problems: string[] = [];
  try {
    const merged = { ...BLANK_STATE, ...state } as WillDraftingState;
    if (!merged.testator?.fullName?.trim()) problems.push("Testator's full name is missing.");
    for (const issue of runLegalHealthCheck(merged)) {
      if (issue.severity === "critical") problems.push(`${issue.title}: ${issue.actionRecommendation}`);
    }
  } catch {
    problems.push("The will data is incomplete or corrupted. Please review every step.");
  }
  return { ok: problems.length === 0, problems };
}

/** Marks the will verified and locks it. Atomic: only succeeds on an unlocked will. */
export async function markWillVerified(userId: ObjectId): Promise<WillDoc | null> {
  const col = await willsCol();
  const will = await col.findOne({ userId });
  if (!will) return null;
  const now = new Date();
  return col.findOneAndUpdate(
    { _id: will._id, lockedAt: null as never },
    {
      $set: {
        detailsVerified: true,
        detailsVerifiedAt: now,
        lockedAt: now,
        verifiedHash: hashWillState(will.state),
        updatedAt: now,
      },
    },
    { returnDocument: "after" }
  );
}

/** Unlocks for editing. Verification is revoked, so downloading again needs a fresh OTP. */
export async function unlockWill(userId: ObjectId): Promise<WillDoc | null> {
  const col = await willsCol();
  return col.findOneAndUpdate(
    { userId },
    {
      $set: {
        detailsVerified: false,
        detailsVerifiedAt: null,
        lockedAt: null,
        verifiedHash: null,
        updatedAt: new Date(),
      },
      $inc: { unlockCount: 1 },
    },
    { returnDocument: "after" }
  );
}

export type DownloadCheck =
  | { ok: true; will: WillDoc }
  | { ok: false; status: number; error: string };

/** The single gate for printing / PDF: owner + paid + verified + untouched since verification. */
export async function authorizeDownload(session: SessionAccount): Promise<DownloadCheck> {
  if (!session.paid) return { ok: false, status: 402, error: "Payment is required before the Will can be downloaded." };

  const will = await getWill(session.userId);
  if (!will) return { ok: false, status: 404, error: "No saved Will was found. Complete the questionnaire first." };
  if (!will.detailsVerified || !will.lockedAt) {
    return { ok: false, status: 403, error: "Please complete the 1-by-1 details review and Email OTP verification in Step 9 (Full Review) before downloading." };
  }
  if (!isWillHashValid(will.state, will.verifiedHash)) {
    return { ok: false, status: 409, error: "The Will changed after verification. Please verify again." };
  }

  const col = await willsCol();
  await col.updateOne(
    { _id: will._id },
    { $inc: { downloadCount: 1 }, $set: { lastDownloadedAt: new Date() } }
  );
  return { ok: true, will };
}
