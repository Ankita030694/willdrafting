"use client";
import { downloadWillPdf } from "@/lib/willSync";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import WillDocument from "@/components/will/WillDocument";
import PaywallModal from "./PaywallModal";

import { Lock } from "lucide-react";

interface WillPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: WillDraftingState;
}

export default function WillPreviewModal({
  isOpen,
  onClose,
  state,
}: WillPreviewModalProps) {
  const { data: session, update } = useSession();
  const [dbPaid, setDbPaid] = useState<boolean>(false);
  const isVerified = Boolean(state.detailsVerified);

  React.useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    const checkLivePaymentStatus = async () => {
      try {
        const res = await fetch("/api/payment/user-status", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (data.paymentStatus === "paid" && isMounted) {
          setDbPaid(true);
          if (session?.user?.paymentStatus !== "paid") {
            await update();
          }
        }
      } catch {
        // ignore
      }
    };
    checkLivePaymentStatus();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const isPaid = dbPaid || session?.user?.paymentStatus === "paid";
  const [paywallOpen, setPaywallOpen] = useState(false);

  const [showWatermark, setShowWatermark] = useState(false);

  if (!isOpen) return null;

  if (!isPaid) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(23, 34, 40, 0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "480px",
            padding: "2rem 1.8rem",
            boxShadow: "0 25px 50px -12px rgba(23, 34, 40, 0.35)",
            border: "1px solid rgba(23, 34, 40, 0.12)",
            textAlign: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              color: "#C65378",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}
          >
            <Lock size={26} />
          </div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem", fontWeight: 800, color: "#172228" }}>
            Will Preview Locked
          </h3>
          <p style={{ margin: "0 0 1.5rem", fontSize: "0.82rem", color: "#49585F", lineHeight: 1.5 }}>
            The official legal Will and clauses are not available for preview until a legal plan is selected and payment is completed. Only your asset portfolio is visible during drafting.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <a
              href="/start/12"
              style={{
                display: "block",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                backgroundColor: "#C65378",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(198, 83, 120, 0.25)",
              }}
            >
              Select Plan to Unlock Will (from ₹2,490) →
            </a>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "10px",
                backgroundColor: "transparent",
                border: "1px solid rgba(23, 34, 40, 0.15)",
                color: "#172228",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    if (!isPaid) {
      setPaywallOpen(true);
      return;
    }
    if (!isVerified) {
      window.location.href = "/start/09";
      return;
    }
    downloadWillPdf().then((a) => {
      if (a.ok) return;
      else alert(a.error || "Download is not available.");
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(27, 42, 74, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: "880px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
          border: "1px solid rgba(27, 42, 74, 0.15)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "var(--color-navy)",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "rgba(201, 162, 39, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-gold)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 600, color: "#FFFFFF" }}>
                Legal Document Preview • Statutory Compliant
              </h4>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)" }}>
                Version {state.version || "v1.2"} • {state.clauses?.length || 8} Clauses Assembled
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                style={{ accentColor: "var(--color-gold)", cursor: "pointer" }}
              />
              Show Watermark
            </label>

            <button
              onClick={handlePrint}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-gold)",
                color: "var(--color-charcoal)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              {isPaid ? (isVerified ? "Print / Save PDF" : "🔒 Verify in Step 9") : "🔒 Unlock PDF"}
            </button>

            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Document Body (Legal paper view - only rendered when isPaid is true) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#F1F5F9",
            padding: "2rem 1.5rem",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            id="printable-will-document"
            className={!isVerified ? "unverified-will-read-only" : undefined}
            style={{
              width: "100%",
              maxWidth: "720px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 10px 25px rgba(27, 42, 74, 0.08)",
              border: "1px solid rgba(27, 42, 74, 0.12)",
              padding: "3.5rem 3rem",
              fontFamily: "'Times New Roman', Times, Georgia, serif",
              color: "#000000",
              position: "relative",
              lineHeight: 1.8,
              userSelect: isVerified ? "text" : "none",
              WebkitUserSelect: isVerified ? "text" : "none",
            }}
          >
            {!isVerified && (
              <style>{`@media print { .unverified-will-read-only { display: none !important; } }`}</style>
            )}
            {/* Watermark overlay */}
            {showWatermark && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-35deg)",
                  fontSize: "4.5rem",
                  fontWeight: 900,
                  color: "rgba(0, 0, 0, 0.04)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.15em",
                  userSelect: "none",
                  textTransform: "uppercase",
                }}
              >
                DRAFT
              </div>
            )}

            <WillDocument state={state} />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Status:{" "}
            <strong style={{ color: "var(--color-navy)", textTransform: "uppercase" }}>
              {isVerified ? "OTP VERIFIED & LOCKED" : state.willStatus.replace("_", " ")}
            </strong>
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handlePrint}
              className="btn btn-gold"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", borderRadius: "var(--radius-sm)" }}
            >
              {isPaid ? (isVerified ? "Print / Save as PDF" : "🔒 Verify Details in Step 9") : "🔒 Unlock to Print / Save"}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-card)",
                backgroundColor: "#FFFFFF",
                color: "var(--color-slate)",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
      />
    </div>
  );
}
