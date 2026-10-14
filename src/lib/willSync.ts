"use client";

import { getWillStorageKey, createBlankState, type WillDraftingState } from "@/lib/willDraftingStore";

/**
 * Browser <-> server sync for the Will.
 *
 * `localStorage` stays as a fast offline cache, but the server (`wills` collection) is the source of
 * truth: it holds the verification flag and the lock, which the browser can never set on its own.
 *
 *  - every local save marks the cache "dirty" and schedules a 1-second debounced PUT /api/will
 *  - on sign-in or guest mount we hydrate: server wins unless there are unsynced local edits
 */

const STATE_EVENT = "willdrafting_state_change";
export const SYNC_STATUS_EVENT = "willdrafting_sync_status";
const SAVE_DEBOUNCE_MS = 1000; // Exactly 1 second debounced cloud push

let suppress = false;
let pendingTimer: ReturnType<typeof setTimeout> | undefined;

const dirtyKey = (key: string) => `${key}__dirty`;
const ownerKey = (key: string) => `${key}__owner`;

export type SyncState = "idle" | "saving" | "saved" | "error" | "offline";

function emitSyncStatus(status: SyncState, errorMessage?: string | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SYNC_STATUS_EVENT, {
      detail: {
        status,
        lastSavedAt: status === "saved" ? new Date().toISOString() : undefined,
        errorMessage,
      },
    })
  );
}

/**
 * Ties the local cache to a specific account id. A cache that belongs to a different account
 * (e.g. the account was deleted and re-created with the same email) is discarded.
 */
export function bindCacheToAccount(email: string, userId: string): void {
  if (typeof window === "undefined") return;
  const key = getWillStorageKey(email);
  if (localStorage.getItem(ownerKey(key)) === userId) return;
  localStorage.removeItem(key);
  localStorage.removeItem(dirtyKey(key));
  localStorage.setItem(ownerKey(key), userId);
}

export interface ServerWillMeta {
  exists: boolean;
  locked: boolean;
  detailsVerified: boolean;
  paid: boolean;
  isGuest?: boolean;
}

function readLocal(key: string): WillDraftingState | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as WillDraftingState) : null;
  } catch {
    return null;
  }
}

/** Writes server state into the cache and tells mounted pages to re-read it (without re-syncing). */
function writeLocalFromServer(key: string, state: WillDraftingState, verified: boolean, verifiedAt: string | null) {
  const next = { ...state, detailsVerified: verified, detailsVerifiedAt: verifiedAt ?? undefined };
  const serialized = JSON.stringify(next);
  if (localStorage.getItem(key) === serialized) return;
  localStorage.setItem(key, serialized);
  localStorage.removeItem(dirtyKey(key));
  suppress = true;
  try {
    window.dispatchEvent(new Event(STATE_EVENT));
  } finally {
    suppress = false;
  }
}

export type PushResult = { ok: boolean; locked?: boolean; unauthenticated?: boolean; error?: string };

async function pushToServer(email?: string | null): Promise<PushResult> {
  const key = getWillStorageKey(email);
  const state = readLocal(key);
  if (!state) return { ok: true };

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    emitSyncStatus("offline");
    return { ok: false, error: "Offline" };
  }

  emitSyncStatus("saving");

  try {
    const body = JSON.stringify({ state });
    const res = await fetch("/api/will", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: body.length < 60_000,
    });

    if (res.ok) {
      localStorage.removeItem(dirtyKey(key));
      emitSyncStatus("saved");
      return { ok: true };
    }
    if (res.status === 401) {
      emitSyncStatus("error", "Please sign in.");
      return { ok: false, unauthenticated: true };
    }
    if (res.status === 423) {
      await hydrateWillFromServer(email);
      emitSyncStatus("error", "Will is locked.");
      return { ok: false, locked: true };
    }
    const data = await res.json().catch(() => ({}));
    const errorMsg = data.error || "Could not save your Will.";
    emitSyncStatus("error", errorMsg);
    return { ok: false, error: errorMsg };
  } catch {
    const errorMsg = "Network error while saving your Will.";
    emitSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error", errorMsg);
    return { ok: false, error: errorMsg };
  }
}

/**
 * Writes the given state straight to the DB (PUT /api/will) without going through localStorage first.
 */
export async function saveWillStateToServer(state: WillDraftingState): Promise<PushResult> {
  if (pendingTimer) clearTimeout(pendingTimer);
  emitSyncStatus("saving");
  try {
    const res = await fetch("/api/will", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    if (res.ok) {
      emitSyncStatus("saved");
      return { ok: true };
    }
    if (res.status === 401) {
      emitSyncStatus("error", "Please sign in first.");
      return { ok: false, unauthenticated: true, error: "Please sign in first." };
    }
    if (res.status === 423) {
      emitSyncStatus("error", "Will is verified & locked.");
      return { ok: false, locked: true, error: "Will is verified & locked. Use Edit Will to unlock it first." };
    }
    const data = await res.json().catch(() => ({}));
    const errorMsg = data.error || "Could not save to the database.";
    emitSyncStatus("error", errorMsg);
    return { ok: false, error: errorMsg };
  } catch {
    emitSyncStatus("error", "Network error while saving.");
    return { ok: false, error: "Network error while saving." };
  }
}

/** Called after each local save. Debounced to 1 second. */
export function scheduleWillSync(email?: string | null): void {
  if (suppress || typeof window === "undefined") return;
  localStorage.setItem(dirtyKey(getWillStorageKey(email)), "1");
  emitSyncStatus("saving");
  if (pendingTimer) clearTimeout(pendingTimer);
  pendingTimer = setTimeout(() => void pushToServer(email), SAVE_DEBOUNCE_MS);
}

/** Saves right now (used before asking the server to verify the Will). */
export async function syncWillNow(email?: string | null): Promise<PushResult> {
  if (pendingTimer) clearTimeout(pendingTimer);
  return pushToServer(email);
}

/** Flushes unsynced edits when the tab is hidden or closing. */
export function flushDirtyWill(email?: string | null): void {
  const key = getWillStorageKey(email);
  if (localStorage.getItem(dirtyKey(key)) === "1") {
    if (pendingTimer) clearTimeout(pendingTimer);
    void pushToServer(email);
  }
}

/**
 * Reconciles the cache with the server copy.
 * Supports both guest sessions and authenticated users.
 */
let hydrateInFlight: Promise<(ServerWillMeta & { ok: boolean }) | null> | null = null;

export function hydrateWillFromServer(email?: string | null): Promise<(ServerWillMeta & { ok: boolean }) | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!hydrateInFlight) {
    hydrateInFlight = runHydrate(email).finally(() => {
      hydrateInFlight = null;
    });
  }
  return hydrateInFlight;
}

async function runHydrate(email?: string | null): Promise<(ServerWillMeta & { ok: boolean }) | null> {
  try {
    const res = await fetch("/api/will", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const key = getWillStorageKey(email);
    const dirty = localStorage.getItem(dirtyKey(key)) === "1";

    const meta: ServerWillMeta = {
      exists: Boolean(data.exists),
      locked: Boolean(data.locked),
      detailsVerified: Boolean(data.detailsVerified),
      paid: Boolean(data.paid),
      isGuest: Boolean(data.isGuest),
    };

    if (!data.exists) {
      if (dirty && readLocal(key)) {
        await pushToServer(email);
      } else {
        const blank = createBlankState();
        writeLocalFromServer(key, blank, false, null);
      }
      return { ...meta, ok: true };
    }

    if (data.locked) {
      writeLocalFromServer(key, data.state, true, data.detailsVerifiedAt ?? null);
      return { ...meta, ok: true };
    }

    if (dirty) {
      await pushToServer(email);
      return { ...meta, ok: true };
    }

    writeLocalFromServer(key, data.state, false, null);
    return { ...meta, ok: true };
  } catch {
    return null;
  }
}

/** Revokes verification on the server and adopts the unlocked copy. */
export async function unlockWillOnServer(email: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/will/unlock", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data.error || "Could not unlock your Will." };
    await hydrateWillFromServer(email);
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error." };
  }
}

/** Server-side print authorisation: owner + paid + verified + unchanged. */
export async function authorizeWillDownload(): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const res = await fetch("/api/will/download", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, status: res.status, error: data.error || "Download is not available." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error." };
  }
}

/**
 * Asks the server for the PDF of the verified Will (POST /api/will/pdf) and saves it in the browser.
 */
export async function downloadWillPdf(): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const res = await fetch("/api/will/pdf", { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, status: res.status, error: data.error || "Download is not available." };
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Last-Will-and-Testament.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error." };
  }
}
