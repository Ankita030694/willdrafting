"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";
import PaywallModal from "@/components/dashboard/PaywallModal";

export interface LeadDetails {
  name: string;
  email: string;
  phone: string;
}

interface LeadNextStepModalProps {
  lead: LeadDetails | null;
  /** Called when the user dismisses the verify step; the details are already saved as a lead. */
  onDismiss: () => void;
}

/**
 * The single flow after any lead form (contact page, intake popup):
 *   1. confirm the email with a one-time code (this also signs the visitor in),
 *   2. choose: pay now and build the Will, or explore the dashboard first (pay later).
 * Both choices end on the dashboard, so there is no separate "thank you" dead end.
 */
export default function LeadNextStepModal({ lead, onDismiss }: LeadNextStepModalProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [verified, setVerified] = React.useState(false);

  if (!lead) return null;

  // A leftover session for some other account must not skip verification: the signed-in,
  // verified email has to be the one that was just submitted.
  const sessionMatchesLead =
    status === "authenticated" &&
    session?.user?.authStatus === "verified" &&
    (session.user.email || "").toLowerCase() === lead.email.trim().toLowerCase();
  const signedIn = sessionMatchesLead || verified;
  const goToDashboard = () => {
    onDismiss();
    router.push("/start/dashboard");
    router.refresh();
  };

  if (signedIn) {
    return <PaywallModal isOpen onClose={goToDashboard} />;
  }

  // While the session is still loading, show nothing rather than flashing the verify step.
  if (status === "loading") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="lead-otp-modal-backdrop"
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
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <div
        className="lead-otp-modal-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#FAF7F0",
          border: "1px solid rgba(23, 34, 40, 0.1)",
          borderRadius: "20px",
          padding: "1.75rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "0.9rem",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.12)",
            fontSize: "0.95rem",
            cursor: "pointer",
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
        <h2 style={{ margin: "0 0 0.3rem", paddingRight: "2rem", fontSize: "1.35rem", fontWeight: 600, color: "#172228" }}>
          Thanks{lead.name ? `, ${lead.name.split(" ")[0]}` : ""}! One quick step
        </h2>
        <p style={{ margin: "0 0 1.1rem", fontSize: "0.88rem", color: "#55636D", lineHeight: 1.45 }}>
          Confirm your email to open your dashboard and see how your Will is created.
        </p>
        <EmailOtpAuth
          mode="signup"
          autoSend
          initialEmail={lead.email}
          initialName={lead.name}
          initialPhone={lead.phone}
          onSuccess={() => setVerified(true)}
          submitLabel="Verify & Continue →"
        />
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .lead-otp-modal-backdrop {
            padding: 0.75rem !important;
          }
          .lead-otp-modal-card {
            max-height: calc(100dvh - 1.5rem) !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 1.25rem 1.1rem !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

