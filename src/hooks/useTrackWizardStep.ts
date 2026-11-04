"use client";

import { useEffect, useRef } from "react";

/**
 * Tells the server which questionnaire step (internal 1-14) a signed-in user opened, so admins can
 * see where people stop. Fire-and-forget: tracking must never slow down or break the wizard.
 */
export function useTrackWizardStep(step: number, enabled: boolean): void {
  const lastSent = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || lastSent.current === step) return;
    lastSent.current = step;
    void fetch("/api/will/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step }),
      keepalive: true,
    }).catch(() => {});
  }, [step, enabled]);
}
