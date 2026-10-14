"use client";

import React, { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { setActiveUser } from "@/lib/willDraftingStore";
import { bindCacheToAccount, flushDirtyWill, hydrateWillFromServer, scheduleWillSync } from "@/lib/willSync";

/**
 * Keeps the signed-in user's Will in sync with the server for the whole app:
 * hydrates once per session and uploads every local save (debounced).
 */
function WillSync() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const userId = session?.user?.id;
  const isCustomer = status === "authenticated" && Boolean(email) && session?.user?.role !== "superadmin";
  const lastHydratedEmailRef = React.useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const targetEmail = isCustomer && email ? email : null;

    if (isCustomer && email) {
      if (userId) bindCacheToAccount(email, userId);
      setActiveUser(email);
    }

    if (lastHydratedEmailRef.current !== targetEmail) {
      lastHydratedEmailRef.current = targetEmail;
      void hydrateWillFromServer(targetEmail);
    }

    const onLocalSave = () => scheduleWillSync(targetEmail);
    const onHidden = () => {
      if (document.visibilityState === "hidden") flushDirtyWill(targetEmail);
    };
    const onUnload = () => flushDirtyWill(targetEmail);

    window.addEventListener("willdrafting_state_change", onLocalSave);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("pagehide", onUnload);
    return () => {
      window.removeEventListener("willdrafting_state_change", onLocalSave);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", onUnload);
    };
  }, [isCustomer, email, userId]);

  return null;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WillSync />
      {children}
    </SessionProvider>
  );
}
