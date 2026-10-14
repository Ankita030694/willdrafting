"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type View = "hidden" | "checking" | "success" | "failed" | "pending" | "invalid";

/**
 * Shown on the dashboard after PayU sends the customer back (?payment=...&txn=...).
 * It never trusts the query string: it asks the server, which confirms with PayU, then refreshes
 * the session so the paid state comes from the database rather than the URL.
 */
export default function PaymentReturnBanner() {
  const params = useSearchParams();
  const router = useRouter();
  const { update } = useSession();
  const [result, setResult] = useState<View | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const ran = useRef(false);

  const flag = params.get("payment");
  const txn = params.get("txn");

  // Outcomes that need no server round-trip are derived, not stored.
  let view: View = "hidden";
  if (flag && !dismissed) {
    if (flag === "invalid") view = "invalid";
    else if (flag === "failed") view = "failed";
    else if (!txn) view = "pending";
    else view = result ?? "checking";
  }

  useEffect(() => {
    if (!flag || flag === "invalid" || flag === "failed" || !txn || ran.current) return;
    ran.current = true;

    const confirm = async () => {
      for (let attempt = 0; attempt < 6; attempt++) {
        try {
          const res = await fetch(`/api/payment/status?txn=${encodeURIComponent(txn)}`, {
            cache: "no-store",
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.outcome === "paid") {
            await update();
            setResult("success");
            router.refresh();
            return;
          }
          if (res.ok && data.outcome === "failed") {
            setResult("failed");
            return;
          }
        } catch {
          // network blip: retry
        }
        await new Promise((r) => setTimeout(r, 3000));
      }
      setResult("pending");
    };
    // Deliberately not cancelled on cleanup: the `ran` guard makes this a one-shot, and React
    // dev double-invokes effects, which would otherwise abort the only polling loop.
    void confirm();
  }, [flag, txn, update, router]);

  if (view === "hidden") return null;

  const palette: Record<Exclude<View, "hidden">, { bg: string; fg: string; text: string }> = {
    checking: { bg: "#EFF6FF", fg: "#1E3A8A", text: "Confirming your payment with the bank. Please do not close this page..." },
    success: { bg: "#DCFCE7", fg: "#166534", text: "Payment successful! Your Will is now unlocked. A receipt will be sent to your email." },
    failed: { bg: "#FEF2F2", fg: "#991B1B", text: "Your payment did not go through and you have not been charged. You can try again anytime." },
    pending: { bg: "#FFFBEB", fg: "#92400E", text: "Your payment is still being confirmed. If money was deducted, your Will unlocks automatically within a few minutes - no need to pay again." },
    invalid: { bg: "#FEF2F2", fg: "#991B1B", text: "We could not verify this payment response. If money was deducted, it will reflect on your account shortly." },
  };
  const p = palette[view];

  return (
    <div
      role="status"
      style={{
        margin: "0 0 1rem",
        padding: "0.85rem 1.1rem",
        borderRadius: "10px",
        backgroundColor: p.bg,
        color: p.fg,
        fontSize: "0.9rem",
        fontWeight: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <span>{p.text}</span>
      {view !== "checking" && (
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            router.replace("/start/dashboard");
          }}
          aria-label="Dismiss"
          style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontSize: "1rem" }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
