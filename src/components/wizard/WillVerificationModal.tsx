"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  WillDraftingState,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import { syncWillNow, hydrateWillFromServer } from "@/lib/willSync";
import { ShieldCheck, Mail, AlertTriangle, Check, ArrowRight, X, RefreshCw, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";
import InfoTooltip from "@/components/wizard/InfoTooltip";

interface WillVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: WillDraftingState;
  onVerified: () => void;
  onJumpToStep?: (step: number) => void;
  startAtOtp?: boolean;
}

export default function WillVerificationModal({
  isOpen,
  onClose,
  state,
  onVerified,
  onJumpToStep,
}: WillVerificationModalProps) {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const { data: session, status: sessionStatus, update: updateSession } = useSession();

  const userEmail = state.testator.email || session?.user?.email || "";
  const userName = state.testator.fullName || session?.user?.name || "";
  const userPhone = state.testator.phone || session?.user?.phone || "";
  const isAuthenticated = Boolean(session?.user?.id);

  // Check critical statutory issues
  const allIssues = runLegalHealthCheck(state);
  const criticalIssues = allIssues.filter((i) => i.severity === "critical");
  const hasCritical = criticalIssues.length > 0;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-send OTP when opened if authenticated, no critical issues, and OTP hasn't been sent yet
  useEffect(() => {
    if (isOpen && sessionStatus === "authenticated" && isAuthenticated && !hasCritical && userEmail && !otpSent && !sendingOtp) {
      void handleSendOtp();
    }
  }, [isOpen, sessionStatus, isAuthenticated, hasCritical, userEmail]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (isOpen && otpSent) {
      inputRef.current?.focus();
    }
  }, [isOpen, otpSent]);

  if (!isOpen) return null;

  const showGuestInlineAuth = (sessionStatus === "unauthenticated" || needsSignIn) && !isAuthenticated;

  const handleGuestAuthAndLock = async () => {
    setError("");
    setLoading(true);
    try {
      await updateSession();
      const targetEmail = state.testator.email || userEmail;
      // Claim guest draft into the newly authenticated account & sync latest state
      await hydrateWillFromServer(targetEmail);
      await syncWillNow(targetEmail);

      const res = await fetch("/api/will/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedViaLoginOtp: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 422 && Array.isArray(data.problems)) {
          setError(data.problems.join(" • "));
          return;
        }
        setError(data.error || (isHi ? "सत्यापन विफल। कृपया पुनः प्रयास करें।" : "Verification failed. Please try again."));
        return;
      }

      useWillStore.getState().markVerifiedLocally(data.verifiedAt);
      await hydrateWillFromServer(targetEmail);

      setSuccess(true);
      setTimeout(() => {
        onVerified();
        onClose();
      }, 900);
    } catch {
      setError(isHi ? "सत्यापन त्रुटि। कृपया पुनः प्रयास करें।" : "Verification error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!userEmail) {
      setError(isHi ? "ईमेल पता उपलब्ध नहीं है। कृपया चरण 2 में अपना ईमेल दर्ज करें या लॉगिन करें।" : "No email address found. Please enter your email in Step 2 or sign in.");
      return;
    }
    setError("");
    setNeedsSignIn(false);
    setSendingOtp(true);
    try {
      const sync = await syncWillNow(userEmail);
      if (sync.unauthenticated) {
        setNeedsSignIn(true);
        return;
      }
      if (!sync.ok && !sync.locked) {
        setError(sync.error || (isHi ? "वसीयत सहेजी नहीं जा सकी।" : "Could not save your will. Please try again."));
        return;
      }
      const res = await fetch("/api/will/request-verification-otp", {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) {
          setNeedsSignIn(true);
          return;
        }
        if (data.retryAfterSeconds) setCooldown(data.retryAfterSeconds);
        if (res.status === 409 && data.code === "ALREADY_VERIFIED") {
          useWillStore.getState().markVerifiedLocally();
          await hydrateWillFromServer(userEmail);
          onVerified();
          onClose();
          return;
        }
        if (res.status === 422 && Array.isArray(data.problems)) {
          setError(data.problems.join(" • "));
          return;
        }
        setError(data.error || (isHi ? "कोड भेजने में विफल।" : "Failed to send verification code."));
        return;
      }
      setOtpSent(true);
      setCooldown(45);
      if (data.devCode) {
        setDevCode(data.devCode);
      }
    } catch {
      setError(isHi ? "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।" : "Network error. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setError(isHi ? "कृपया 6 अंकों का कोड दर्ज करें।" : "Please enter the complete 6-digit code.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/will/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 422 && Array.isArray(data.problems)) {
          setError(data.problems.join(" • "));
          return;
        }
        setError(data.error || (isHi ? "अमान्य या समाप्त कोड।" : "Invalid or expired verification code."));
        return;
      }

      // Immediately lock client state & pull server verified flags
      useWillStore.getState().markVerifiedLocally(data.verifiedAt);
      await hydrateWillFromServer(userEmail);

      setSuccess(true);
      setTimeout(() => {
        onVerified();
        onClose();
      }, 900);
    } catch {
      setError(isHi ? "सत्यापन त्रुटि। कृपया पुनः प्रयास करें।" : "Verification error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 34, 40, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        className="wizard-modal-sheet"
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(27, 42, 74, 0.1)",
          padding: "2rem",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(27, 42, 74, 0.12)",
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

        {/* Header Icon */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "18px",
              backgroundColor: hasCritical ? "rgba(225, 29, 72, 0.1)" : "rgba(198, 83, 120, 0.1)",
              color: hasCritical ? "#E11D48" : "#C65378",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.75rem",
            }}
          >
            {hasCritical ? <AlertTriangle size={28} /> : <ShieldCheck size={28} />}
          </div>

          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#172228", margin: "0 0 0.4rem" }}>
            {hasCritical
              ? isHi
                ? "आवश्यक विवरण अपूर्ण हैं"
                : "Verify Essential Details First"
              : isHi
              ? "OTP द्वारा विवरण सत्यापित और लॉक करें"
              : "Verify & Lock Will Details via OTP"}
          </h2>

          <p style={{ fontSize: "0.85rem", color: "#55636D", margin: 0, lineHeight: 1.5 }}>
            {hasCritical
              ? isHi
                ? "भारतीय उत्तराधिकार कानून के अनुसार न्यायालय में मान्य होने के लिए निम्नलिखित विवरण आवश्यक हैं:"
                : "Under the Indian Succession Act, the following critical items must be resolved before your Will details can be verified and locked:"
              : isHi
              ? `1-by-1 समीक्षा पूर्ण! आपकी वसीयत के सभी विवरणों को स्थायी रूप से सत्यापित और लॉक करने के लिए ${userEmail} पर 6 अंकों का कोड भेजा गया है। इसके बाद कोई बदलाव नहीं किया जा सकेगा।`
              : `1-by-1 review complete! We've sent a 6-digit verification code to ${userEmail}. Once verified, all Will details will be permanently locked and cannot be edited anywhere.`}
          </p>
        </div>

        {/* STATE A: Critical Issues Block */}
        {hasCritical ? (
          <div>
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECDD3",
                borderRadius: "14px",
                padding: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.82rem", color: "#991B1B", lineHeight: 1.6 }}>
                {criticalIssues.map((issue) => (
                  <li key={issue.id} style={{ marginBottom: "0.35rem" }}>
                    <strong>{issue.title}:</strong> {issue.actionRecommendation}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onJumpToStep?.(10);
                }}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  borderRadius: "12px",
                  backgroundColor: "#C65378",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                }}
              >
                <span>{isHi ? "विवरण पूर्ण करें (चरण 10) →" : "Complete Missing Details (Step 10) →"}</span>
              </button>
            </div>
          </div>
        ) : showGuestInlineAuth && !success ? (
          /* STATE B1: Guest Inline Email OTP Authentication & Lock */
          <div>
            {error && (
              <div
                style={{
                  padding: "0.65rem 0.85rem",
                  marginBottom: "1rem",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECDD3",
                  borderRadius: "10px",
                  color: "#991B1B",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}
            <EmailOtpAuth
              mode="signup"
              initialEmail={userEmail}
              initialName={userName}
              initialPhone={userPhone}
              autoSend={Boolean(userEmail && userName && userPhone)}
              submitLabel={isHi ? "OTP सत्यापित करें और विवरण लॉक करें →" : "Verify OTP & Permanently Lock Details →"}
              onSuccess={() => {
                void handleGuestAuthAndLock();
              }}
            />
          </div>
        ) : (
          /* STATE B2: Authenticated User Email OTP Form */
          <form onSubmit={handleVerify}>
            {error && (
              <div
                style={{
                  padding: "0.65rem 0.85rem",
                  marginBottom: "1rem",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECDD3",
                  borderRadius: "10px",
                  color: "#991B1B",
                  fontSize: "0.82rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div
                style={{
                  padding: "0.65rem 0.85rem",
                  marginBottom: "1rem",
                  backgroundColor: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  borderRadius: "10px",
                  color: "#065F46",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <Check size={16} />
                <span>{isHi ? "सत्यापित! सभी वसीयत विवरण स्थायी रूप से लॉक किए जा रहे हैं..." : "Verified! Permanently locking all Will details..."}</span>
              </div>
            )}

            <div style={{ marginBottom: "1.25rem" }}>
              <label
                htmlFor="verification-code"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#172228",
                  marginBottom: "0.4rem",
                }}
              >
                {isHi ? "6-अंकों का सत्यापन कोड" : "6-Digit Verification Code"}
                <InfoTooltip
                  text="Enter the 6-digit One-Time Password (OTP) sent to your email address to verify and permanently lock your Will details against unauthorized changes."
                  hindiText="अपनी वसीयत के विवरणों को सत्यापित और स्थायी रूप से लॉक करने के लिए अपने ईमेल पर भेजा गया 6-अंकों का ओटीपी (OTP) दर्ज करें।"
                />
              </label>
              <input
                id="verification-code"
                ref={inputRef}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                disabled={loading || success}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  textAlign: "center",
                  letterSpacing: "0.5em",
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  color: "#172228",
                  backgroundColor: "#FAF7F0",
                  border: "1.5px solid rgba(27, 42, 74, 0.18)",
                  borderRadius: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              {devCode && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.35rem 0.65rem",
                    backgroundColor: "#EEF2FF",
                    border: "1px dashed #6366F1",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    color: "#4338CA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Development Test Code: <strong>{devCode}</strong></span>
                  <button
                    type="button"
                    onClick={() => setCode(devCode)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#4F46E5",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Auto-Fill
                  </button>
                </div>
              )}
            </div>

            {/* Resend Action */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.78rem",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ color: "#64748B" }}>
                {isHi ? "कोड प्राप्त नहीं हुआ?" : "Didn't receive the email?"}
              </span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={cooldown > 0 || sendingOtp || loading}
                style={{
                  background: "none",
                  border: "none",
                  color: cooldown > 0 ? "#94A3B8" : "#C65378",
                  fontWeight: 700,
                  cursor: cooldown > 0 ? "default" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <RefreshCw size={12} className={sendingOtp ? "animate-spin" : ""} />
                <span>
                  {cooldown > 0
                    ? isHi
                      ? `${cooldown}s में पुनः भेजें`
                      : `Resend in ${cooldown}s`
                    : isHi
                    ? "कोड पुनः भेजें"
                    : "Resend Code"}
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success || code.length !== 6}
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "0.92rem",
                fontWeight: 700,
                backgroundColor: "#C65378",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "14px",
                cursor: loading || code.length !== 6 ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(198, 83, 120, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                opacity: code.length !== 6 ? 0.65 : 1,
                transition: "all 0.15s ease",
              }}
            >
              {loading ? (
                <span>{isHi ? "सत्यापित हो रहा है..." : "Verifying Code..."}</span>
              ) : success ? (
                <span>{isHi ? "✓ विवरण सत्यापित और लॉक!" : "✓ Details Verified & Locked!"}</span>
              ) : (
                <>
                  <Lock size={16} />
                  <span>{isHi ? "OTP सत्यापित करें और विवरण लॉक करें" : "Verify OTP & Permanently Lock Details"}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security footnote */}
        <div
          style={{
            marginTop: "1.2rem",
            paddingTop: "0.85rem",
            borderTop: "1px solid rgba(27, 42, 74, 0.08)",
            textAlign: "center",
            fontSize: "0.72rem",
            color: "#64748B",
          }}
        >
          🔒 Permanent email OTP lock under Section 59 & 63 of the Indian Succession Act, 1925.
        </div>
      </div>
    </div>
  );
}
