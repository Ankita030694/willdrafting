"use client";

import { create } from "zustand";
import {
  WillDraftingState,
  createBlankState,
  loadStoredWillState,
  saveStoredWillState,
  resetToBlankState,
} from "@/lib/willDraftingStore";
import { normalizeWillState } from "@/lib/inputSanitizers";
import {
  scheduleWillSync,
  flushDirtyWill,
  syncWillNow,
  hydrateWillFromServer,
  SYNC_STATUS_EVENT,
  type SyncState,
} from "@/lib/willSync";
import { getOrSetClientGuestSession } from "@/lib/guestSession";

interface WillStoreState {
  state: WillDraftingState;
  syncStatus: SyncState;
  lastSavedAt: string | null;
  errorMessage: string | null;
  userEmail: string | null;
  guestSessionId: string | null;
  isHydrated: boolean;

  // Lifecycle
  initSession: (email?: string | null) => Promise<void>;
  setSyncStatus: (status: SyncState, errorMessage?: string | null) => void;

  // Data Actions
  updateState: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  updateTestator: (patch: Partial<WillDraftingState["testator"]>) => void;
  setFullState: (newState: WillDraftingState) => void;
  markVerifiedLocally: (verifiedAt?: string) => void;
  flushSyncNow: () => Promise<void>;
  resetToBlank: () => void;
}

export const useWillStore = create<WillStoreState>((set, get) => {
  // Listen for sync status events and server state changes from willSync.ts
  if (typeof window !== "undefined") {
    window.addEventListener(SYNC_STATUS_EVENT, ((e: CustomEvent) => {
      const detail = e.detail as { status: SyncState; lastSavedAt?: string; errorMessage?: string | null };
      set((prev) => ({
        ...prev,
        syncStatus: detail.status,
        lastSavedAt: detail.lastSavedAt || prev.lastSavedAt,
        errorMessage: detail.errorMessage || null,
      }));
    }) as EventListener);

    window.addEventListener("willdrafting_state_change", () => {
      const email = get().userEmail;
      const latest = loadStoredWillState(email);
      set({ state: latest });
    });
  }

  return {
    state: createBlankState(),
    syncStatus: "idle",
    lastSavedAt: null,
    errorMessage: null,
    userEmail: null,
    guestSessionId: null,
    isHydrated: false,

    initSession: async (email?: string | null) => {
      const resolvedEmail = email || null;
      let guestSession: string | null = null;
      if (!resolvedEmail) {
        guestSession = getOrSetClientGuestSession();
      }

      // 1. Initialise from local cache (fastest paint)
      const initialLocal = loadStoredWillState(resolvedEmail);

      set({
        state: initialLocal,
        userEmail: resolvedEmail,
        guestSessionId: guestSession,
        isHydrated: true,
      });

      // 2. Hydrate from server (cloud reconciliation)
      try {
        await hydrateWillFromServer(resolvedEmail);
        const reconciled = loadStoredWillState(resolvedEmail);
        set({ state: reconciled });
      } catch (err) {
        console.warn("Could not hydrate will from cloud:", err);
      }
    },

    setSyncStatus: (status: SyncState, errorMessage?: string | null) => {
      set({ syncStatus: status, errorMessage: errorMessage || null });
    },

    updateState: (updater: (prev: WillDraftingState) => WillDraftingState) => {
      const current = get().state;
      // Permanent Lock: Once details are verified via Email OTP, no details can be edited anywhere.
      if (current.detailsVerified) {
        return;
      }
      const rawUpdated = updater(current);
      const cleanState = normalizeWillState(rawUpdated, false);
      const userEmail = get().userEmail;

      // 1. 0ms Immediate In-Memory Update
      set({
        state: cleanState,
        syncStatus: typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "saving",
      });

      // 2. 0ms Synchronous localStorage write
      saveStoredWillState(cleanState, userEmail);

      // 3. 1-second Debounced Cloud Sync
      scheduleWillSync(userEmail);
    },

    updateTestator: (patch: Partial<WillDraftingState["testator"]>) => {
      if (get().state.detailsVerified) return;
      get().updateState((prev) => ({
        ...prev,
        testator: {
          ...prev.testator,
          ...patch,
        },
      }));
    },

    setFullState: (newState: WillDraftingState) => {
      if (get().state.detailsVerified) return;
      get().updateState(() => newState);
    },

    markVerifiedLocally: (verifiedAt?: string) => {
      const current = get().state;
      const userEmail = get().userEmail;
      const lockedState: WillDraftingState = {
        ...current,
        isReviewed: true,
        detailsVerified: true,
        detailsVerifiedAt: verifiedAt || new Date().toISOString(),
      };
      set({ state: lockedState, syncStatus: "saved" });
      saveStoredWillState(lockedState, userEmail);
    },

    flushSyncNow: async () => {
      if (get().state.detailsVerified) return;
      const userEmail = get().userEmail;
      flushDirtyWill(userEmail);
      await syncWillNow(userEmail);
    },

    resetToBlank: () => {
      if (get().state.detailsVerified) return;
      const userEmail = get().userEmail;
      const blank = resetToBlankState(userEmail);
      set({ state: blank });
      scheduleWillSync(userEmail);
    },
  };
});
