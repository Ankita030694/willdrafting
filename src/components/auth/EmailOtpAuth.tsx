"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import InfoTooltip from "@/components/wizard/InfoTooltip";

export interface EmailOtpAuthProps {
  /** "signup" additionally collects name + mobile (applied only if the email is new). */
  mode: "signin" | "signup";
  onSuccess: () => void;
  initialEmail?: string;
  initialName?: string;
  initialPhone?: string;
  interestedPlanId?: string;
  submitLabel?: string;
  /** Immediately emails a code on mount (used right after a lead form, where details are known). */
  autoSend?: boolean;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.85rem",
  borderRadius: "10px",
  border: "1px solid rgba(23, 34, 40, 0.18)",
  fontSize: "0.9rem",
  color: "#172228",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "#172228",
  marginBottom: "0.3rem",
};

const buttonStyle = (disabled: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "0.85rem",
  fontSize: "0.92rem",
  fontWeight: 700,
  backgroundColor: "#C65378",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "12px",
  cursor: disabled ? "not-allowed" : "pointer",
  marginTop: "0.4rem",
  boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
  opacity: disabled ? 0.7 : 1,
  transition: "all 0.15s ease",
});

export default function EmailOtpAuth({
  mode,
  onSuccess,
  initialEmail = "",
  initialName = "",
  initialPhone = "",
  interestedPlanId,
  submitLabel,
  autoSend = false,
}: EmailOtpAuthProps) {
  const [step, setStep] = useState<"details" | "code">("details");
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  const requestCode = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          ...(mode === "signup" ? { name: name.trim(), phone: phone.trim() } : {}),
          ...(interestedPlanId ? { interestedPlanId } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (typeof data.retryAfterSeconds === "number") setCooldown(data.retryAfterSeconds);
        setError(data.error || "Could not send the code. Please try again.");
        return false;
      }
      setInfo(`We emailed a 6-digit code to ${email.trim()}.`);
      setCooldown(45);
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && (!name.trim() || !phone.trim())) {
      setError("Please enter your name and mobile number.");
      return;
    }
    if (await requestCode()) {
      setCode("");
      setStep("code");
    }
  };

  const autoSent = useRef(false);
  useEffect(() => {
    // Guard against React dev double-invoking effects, which would burn the resend cooldown.
    if (!autoSend || autoSent.current || !initialEmail) return;
    autoSent.current = true;
    void (async () => {
      if (await requestCode()) {
        setCode("");
        setStep("code");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSend, initialEmail]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await signIn("email-otp", {
        email: email.trim(),
        otp: code,
        redirect: false,
      });
      if (res?.error) {
        setError("That code is incorrect or has expired. Please try again or request a new code.");
        return;
      }
      onSuccess();
    } catch {
      setError("Unable to sign in. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const messages = (
    <>
      {error && (
        <div
          role="alert"
          style={{
            padding: "0.7rem 0.85rem",
            backgroundColor: "rgba(220, 38, 38, 0.08)",
            border: "1px solid rgba(220, 38, 38, 0.25)",
            borderRadius: "10px",
            color: "#991B1B",
            fontSize: "0.82rem",
          }}
        >
          {error}
        </div>
      )}
      {info && !error && (
        <div
          style={{
            padding: "0.7rem 0.85rem",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: "10px",
            color: "#065F46",
            fontSize: "0.82rem",
          }}
        >
          {info}
        </div>
      )}
    </>
  );

  if (step === "code") {
    return (
      <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
        {messages}
        <div>
          <label htmlFor="otpCode" style={labelStyle}>
            Enter 6-digit code *
            <InfoTooltip
              text="Enter the 6-digit verification code just sent to your email inbox (check Spam/Promotions if not visible within 30 seconds)."
              hindiText="आपके ईमेल पर भेजा गया 6-अंकों का सत्यापन कोड दर्ज करें (यदि इनबॉक्स में न दिखे तो स्पैम फोल्डर जांचें)।"
            />
          </label>
          <input
            id="otpCode"
            ref={codeRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            style={{ ...inputStyle, fontSize: "1.4rem", letterSpacing: "0.5rem", textAlign: "center" }}
          />
        </div>
        <button type="submit" disabled={loading} style={buttonStyle(loading)}>
          {loading ? "Verifying..." : submitLabel || "Verify & Continue →"}
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
          <button
            type="button"
            onClick={() => {
              setStep("details");
              setError("");
              setInfo("");
            }}
            style={{ background: "none", border: "none", color: "#55636D", cursor: "pointer", padding: 0 }}
          >
            ← Change email
          </button>
          <button
            type="button"
            disabled={cooldown > 0 || loading}
            onClick={requestCode}
            style={{
              background: "none",
              border: "none",
              color: cooldown > 0 ? "#9CA3AF" : "#C65378",
              fontWeight: 600,
              cursor: cooldown > 0 ? "not-allowed" : "pointer",
              padding: 0,
            }}
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleDetails} style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
      {messages}
      {mode === "signup" && (
        <div>
          <label htmlFor="otpName" style={labelStyle}>
            Full Name (as per Aadhaar/PAN) *
            <InfoTooltip
              text="Enter your full legal name as printed on your PAN or Aadhaar Card to link your Will account."
              hindiText="अपने वसीयत खाते को जोड़ने के लिए पैन या आधार कार्ड के अनुसार अपना पूरा कानूनी नाम दर्ज करें।"
            />
          </label>
          <input
            id="otpName"
            type="text"
            required
            placeholder="Rajesh Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            autoComplete="name"
          />
        </div>
      )}
      <div>
        <label htmlFor="otpEmail" style={labelStyle}>
          Email Address *
          <InfoTooltip
            text="Enter your active email address where your 6-digit login OTP and encrypted Will backup will be sent."
            hindiText="अपना सक्रिय ईमेल पता दर्ज करें जहां 6-अंकों का ओटीपी और सुरक्षित वसीयत बैकअप भेजा जाएगा।"
          />
        </label>
        <input
          id="otpEmail"
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          autoComplete="email"
          autoFocus={mode === "signin"}
        />
      </div>
      {mode === "signup" && (
        <div>
          <label htmlFor="otpPhone" style={labelStyle}>
            10-Digit Mobile Number *
            <InfoTooltip
              text="Enter your 10-digit Indian mobile number for account security and legal support updates."
              hindiText="खाते की सुरक्षा और कानूनी सहायता अपडेट के लिए अपना 10-अंकों का मोबाइल नंबर दर्ज करें।"
            />
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(23, 34, 40, 0.18)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                padding: "0.75rem 0.85rem",
                backgroundColor: "#FAF7F0",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#55636D",
                borderRight: "1px solid rgba(23, 34, 40, 0.12)",
              }}
            >
              +91
            </span>
            <input
              id="otpPhone"
              type="tel"
              required
              maxLength={10}
              placeholder="98XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              style={{ flex: 1, padding: "0.75rem 0.85rem", border: "none", outline: "none", fontSize: "0.9rem", color: "#172228" }}
              autoComplete="tel-national"
            />
          </div>
        </div>
      )}
      <button type="submit" disabled={loading} style={buttonStyle(loading)}>
        {loading ? "Sending code..." : submitLabel || "Email Me a Code →"}
      </button>
    </form>
  );
}
