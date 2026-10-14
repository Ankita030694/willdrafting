"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlanId } from "@/lib/authTypes";
import { IS_TEST_PRICING, PLANS, toRupeeString } from "@/lib/plans";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Kept for callers; unlocking now happens after PayU redirects back to the dashboard. */
  onUnlocked?: () => void;
}

/** Submits a hidden form so the browser POSTs the signed fields straight to PayU's checkout. */
function postToPayu(action: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.style.display = "none";
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("essential");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push("/login?callbackUrl=/start/14");
        return;
      }
      if (!res.ok) {
        if (data.needsPhone) {
          router.push("/complete-profile");
          return;
        }
        throw new Error(data.error || "Could not start the payment.");
      }

      // Leaves the site for PayU; keep the button in its loading state.
      postToPayu(data.action, data.fields);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed.");
      setLoading(false);
    }
  };

  const TIERS: { id: PlanId; title: string; sub: string; features: string[]; badge?: string }[] = [
    {
      id: "essential",
      title: "Auto Verified",
      sub: "Essential Will",
      badge: "Recommended",
      features: ["Statutory PDF download", "Dual-witness signing guide", "Digital vault backup"],
    },
    {
      id: "lawyer_verified",
      title: "Manually Verified",
      sub: "Lawyer Verified",
      features: ["Everything in Auto Verified", "Line-by-line review by advocate"],
    },
    {
      id: "premium",
      title: "Connect to Lawyer",
      sub: "Lawyer Verified / Queries",
      features: ["Advocate connects on call", "Advocate verification & audit", "Answers for further queries"],
    },
  ];
  const rupees = (id: PlanId) =>
    (PLANS[id].priceRupees).toLocaleString("en-IN");

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(23, 34, 40, 0.6)",
        backdropFilter: "blur(4px)",
        overflowY: "auto",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          backgroundColor: "#FAF7F0",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(23, 34, 40, 0.35)",
          border: "1px solid rgba(23, 34, 40, 0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(23, 34, 40, 0.12)",
            background: "#FFFFFF",
            color: "#55636D",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ✕
        </button>

        <div style={{ padding: "1.75rem 2rem 0.5rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.2rem 0.7rem",
              borderRadius: 999,
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              color: "#C65378",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Email verified &#10003;
          </span>
          <h2 style={{ margin: "0.7rem 0 0.3rem", fontSize: "1.55rem", fontWeight: 600, color: "#172228", lineHeight: 1.25 }}>
            Choose your plan &amp; unlock your Will
          </h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#55636D", lineHeight: 1.5 }}>
            Pay once to generate your official, watermark-free Will. Prefer to look around first? You can explore the dashboard and pay later.
          </p>
        </div>

        <div style={{ padding: "1.25rem 2rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {error && (
            <div role="alert" style={{ padding: "0.7rem 0.9rem", backgroundColor: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.25)", color: "#991B1B", borderRadius: 10, fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.85rem" }}>
            {TIERS.map((t) => {
              const active = selectedPlan === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedPlan(t.id)}
                  aria-pressed={active}
                  style={{
                    textAlign: "left",
                    position: "relative",
                    padding: "1.1rem 1rem",
                    borderRadius: 14,
                    cursor: "pointer",
                    backgroundColor: "#FFFFFF",
                    border: active ? "2px solid #C65378" : "1px solid rgba(23, 34, 40, 0.15)",
                    boxShadow: active ? "0 6px 18px rgba(198, 83, 120, 0.18)" : "none",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {t.badge && (
                    <span style={{ position: "absolute", top: -10, right: 12, backgroundColor: "#C65378", color: "#fff", fontSize: "0.62rem", fontWeight: 700, padding: "2px 9px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {t.badge}
                    </span>
                  )}
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#172228" }}>{t.title}</div>
                  <div style={{ fontSize: "0.74rem", color: "#55636D", marginTop: 1 }}>({t.sub})</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#172228", margin: "0.5rem 0 0.1rem" }}>&#8377;{rupees(t.id)}</div>
                  <div style={{ fontSize: "0.7rem", color: "#5F7E75", fontWeight: 600 }}>One-time &middot; No GST</div>
                  <ul style={{ margin: "0.75rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {t.features.map((f) => (
                      <li key={f} style={{ fontSize: "0.76rem", color: "#334155", display: "flex", gap: 6, lineHeight: 1.35 }}>
                        <span style={{ color: "#204031", fontWeight: 700 }}>&#10003;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.95rem",
                borderRadius: 999,
                backgroundColor: "#C65378",
                color: "#FFFFFF",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                boxShadow: "0 4px 14px rgba(198, 83, 120, 0.3)",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Redirecting to secure payment..." : `Pay \u20b9${rupees(selectedPlan)} securely & unlock Will`}
            </button>
            {IS_TEST_PRICING && (
              <p style={{ margin: 0, textAlign: "center", fontSize: "0.72rem", color: "#C65378", fontWeight: 600 }}>
                Development mode: test prices (₹1 / ₹2 / ₹3) are being charged.
              </p>
            )}
            <p style={{ margin: 0, textAlign: "center", fontSize: "0.74rem", color: "#55636D" }}>
              No GST or hidden charges. Secure payment via PayU (UPI, cards, net banking).
            </p>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: 999,
                backgroundColor: "transparent",
                color: "#172228",
                border: "1.5px solid rgba(23, 34, 40, 0.25)",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Explore dashboard first (pay later)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
