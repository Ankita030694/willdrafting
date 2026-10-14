"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Where to land after signing in. */
  redirectTo?: string;
}

/**
 * Sign-up / sign-in popup opened from the "Start now" CTAs.
 * Users either continue with Google or create an account with their email (one-time code).
 */
export default function SignupModal({ isOpen, onClose, redirectTo }: SignupModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [googleError, setGoogleError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Everyone lands on the dashboard: payment is asked for later, when they finalise & download the Will.
  const landing = redirectTo ?? "/start/dashboard";

  const handleGoogle = async () => {
    setGoogleError("");
    try {
      await signIn("google", { callbackUrl: landing });
    } catch {
      setGoogleError("Google Sign-In is unavailable right now. Please use the email code option.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(23, 34, 40, 0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          maxHeight: "calc(100dvh - 2rem)",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          padding: "2rem 1.75rem 1.75rem",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.35)",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(23, 34, 40, 0.12)",
            backgroundColor: "#FAF7F0",
            color: "#64748B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={16} />
        </button>

        <h2 id="signup-modal-title" style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 800, color: "#172228" }}>
          {mode === "signup" ? "Start now" : "Welcome back"}
        </h2>
        <p style={{ margin: "0 0 1.25rem", fontSize: "0.86rem", color: "#55636D", lineHeight: 1.5 }}>
          {mode === "signup"
            ? "Create your free account to start drafting your Will."
            : "Sign in with a one-time code sent to your email."}
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          style={{
            width: "100%",
            padding: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.65rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(23, 34, 40, 0.15)",
            borderRadius: "12px",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#172228",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          <span>Continue with Google</span>
        </button>
        {googleError && (
          <div role="alert" style={{ marginBottom: "0.9rem", fontSize: "0.8rem", color: "#991B1B" }}>
            {googleError}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(23, 34, 40, 0.1)" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em" }}>
            OR WITH EMAIL
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(23, 34, 40, 0.1)" }} />
        </div>

        {/* key forces a fresh form when switching between sign-up and sign-in */}
        <EmailOtpAuth
          key={mode}
          mode={mode}
          submitLabel={mode === "signup" ? "Create account →" : undefined}
          onSuccess={() => {
            onClose();
            router.push(landing);
          }}
        />

        <div style={{ marginTop: "1.1rem", textAlign: "center", fontSize: "0.82rem", color: "#55636D" }}>
          {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            style={{ background: "none", border: "none", color: "#C65378", fontWeight: 700, cursor: "pointer", padding: 0 }}
          >
            {mode === "signup" ? "Sign in" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
