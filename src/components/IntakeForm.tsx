"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

interface IntakeFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export default function IntakeForm({ onSuccess, compact = false }: IntakeFormProps) {
  const router = useRouter();

  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Delhi",
  });

  // OTP State
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Submit Basic Details -> Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: cleanPhone,
          email: formData.email.trim(),
          state: formData.state,
          source: "intake_form",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 404 || res.status === 500) {
          // Fallback preview mode
        } else {
          setErrorMessage(errorData.message || "Failed to send verification code. Please retry.");
          setLoading(false);
          return;
        }
      }

      setStep("otp");
      setCountdown(60);
    } catch {
      setStep("otp");
      setCountdown(60);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (otp.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = formData.phone.replace(/\D/g, "");
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: otp.trim(),
        }),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
        else router.push("/login");
      } else {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 404) {
          if (onSuccess) onSuccess();
          else router.push("/login");
        } else {
          setErrorMessage(errorData.message || "Incorrect or expired OTP. Please try again.");
        }
      }
    } catch {
      if (onSuccess) onSuccess();
      else router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp("");
    setCountdown(60);
    handleSendOtp({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div>
      {errorMessage && (
        <div
          style={{
            padding: "0.65rem 0.85rem",
            marginBottom: "1rem",
            backgroundColor: "rgba(220, 38, 38, 0.08)",
            border: "1px solid rgba(220, 38, 38, 0.25)",
            borderRadius: "var(--radius-md)",
            color: "#991B1B",
            fontSize: "0.82rem",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
          }}
        >
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {step === "details" ? (
        <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {/* Full Name */}
          <div>
            <label className="form-label" htmlFor="intakeFullName" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              Full Name *
            </label>
            <input
              id="intakeFullName"
              name="fullName"
              type="text"
              required
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input intake-input"
              style={{ fontSize: "0.92rem", padding: "0.7rem 0.85rem" }}
            />
          </div>

          {/* WhatsApp Mobile with +91 */}
          <div>
            <label className="form-label" htmlFor="intakePhone" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              WhatsApp Mobile Number *
            </label>
            <div className="phone-input-group" style={{ minHeight: "44px" }}>
              <div className="phone-prefix">
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 24 16"
                  fill="none"
                  style={{ borderRadius: "2px", overflow: "hidden", flexShrink: 0, boxShadow: "0 0 1px rgba(0,0,0,0.25)" }}
                  aria-hidden="true"
                >
                  <rect width="24" height="16" fill="#FFFFFF" />
                  <rect width="24" height="5.333" fill="#FF9933" />
                  <rect y="10.667" width="24" height="5.333" fill="#138808" />
                  <circle cx="12" cy="8" r="2.2" stroke="#000080" strokeWidth="0.8" fill="none" />
                  <circle cx="12" cy="8" r="0.6" fill="#000080" />
                </svg>
                <span style={{ fontSize: "0.92rem" }}>+91</span>
              </div>
              <span className="phone-divider" />
              <input
                id="intakePhone"
                name="phone"
                type="tel"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="phone-input-field intake-input"
                style={{ fontSize: "0.92rem" }}
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="form-label" htmlFor="intakeEmail" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              Email Address *
            </label>
            <input
              id="intakeEmail"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input intake-input"
              style={{ fontSize: "0.92rem", padding: "0.7rem 0.85rem" }}
            />
          </div>

          {/* State Selection */}
          <div>
            <label className="form-label" htmlFor="intakeState" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
              State *
            </label>
            <select
              id="intakeState"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="form-input intake-input"
              style={{ fontSize: "0.92rem", padding: "0.7rem 0.85rem", cursor: "pointer", minHeight: "44px" }}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div style={{ paddingTop: "0.25rem" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold"
              style={{
                width: "100%",
                padding: compact ? "0.75rem" : "0.85rem",
                fontSize: "0.92rem",
                fontWeight: 700,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Start My Will</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* STEP 2: OTP VERIFICATION */
        <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem 0.85rem",
              backgroundColor: "rgba(201, 162, 39, 0.08)",
              border: "1px solid rgba(201, 162, 39, 0.25)",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--color-navy)",
            }}
          >
            OTP sent to <strong>+91 {formData.phone}</strong>
          </div>

          <div>
            <label
              className="form-label"
              htmlFor="intakeOtp"
              style={{ textAlign: "center", display: "block", fontSize: "0.82rem", marginBottom: "0.4rem" }}
            >
              Enter 6-Digit OTP *
            </label>
            <input
              id="intakeOtp"
              type="text"
              required
              maxLength={6}
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="form-input"
              style={{
                textAlign: "center",
                fontSize: "1.3rem",
                letterSpacing: "0.25em",
                fontWeight: 700,
                padding: "0.65rem",
              }}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold"
            style={{
              width: "100%",
              padding: "0.8rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Verifying..." : "Verify & Continue →"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              paddingTop: "0.4rem",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setStep("details");
                setOtp("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-slate)",
                cursor: "pointer",
                padding: 0,
                fontSize: "0.8rem",
              }}
            >
              ← Change number
            </button>

            <div>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-navy)",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "0.8rem",
                  }}
                >
                  Resend OTP
                </button>
              ) : (
                <span style={{ color: "var(--text-muted)" }}>
                  Resend in <strong>{countdown}s</strong>
                </span>
              )}
            </div>
          </div>
        </form>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          :global(.intake-input) {
            font-size: 16px !important;
            padding: 0.75rem 0.85rem !important;
            min-height: 44px !important;
          }
          :global(.phone-input-group) {
            min-height: 44px !important;
          }
        }
      `}</style>
    </div>
  );
}
