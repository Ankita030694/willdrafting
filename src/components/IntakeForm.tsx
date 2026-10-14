"use client";

import React, { useState } from "react";
import LeadNextStepModal, { type LeadDetails } from "@/components/LeadNextStepModal";

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
  /** Receives the saved details so the parent can continue the verify / pay / dashboard flow. */
  onSuccess?: (lead: LeadDetails) => void;
  compact?: boolean;
}

export default function IntakeForm({ onSuccess, compact = false }: IntakeFormProps) {
  const [savedLead, setSavedLead] = useState<LeadDetails | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Delhi",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Basic Details directly to MongoDB leads collection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: cleanPhone,
          email: formData.email.trim(),
          state: formData.state,
          source: "intake_popup",
        }),
      });

      if (res.ok) {
        const lead = {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: cleanPhone,
        };
        if (onSuccess) onSuccess(lead);
        else setSavedLead(lead);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMessage(errorData.error || "Failed to submit. Please retry.");
      }
    } catch (err) {
      console.error("Popup lead submission error:", err);
      setErrorMessage("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
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
                inputMode="numeric"
                pattern="[0-9]*"
                required
                maxLength={10}
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, phone: val });
                  if (errorMessage && val.length === 10) setErrorMessage("");
                }}
                className="phone-input-field intake-input"
                style={{ fontSize: "0.92rem" }}
              />
            </div>
            {formData.phone && formData.phone.length > 0 && formData.phone.length < 10 && (
              <span style={{ fontSize: "0.75rem", color: "#DC2626", marginTop: "0.25rem", display: "block" }}>
                Mobile number must contain exactly 10 digits.
              </span>
            )}
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
                <span>Submitting...</span>
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

      <LeadNextStepModal lead={savedLead} onDismiss={() => setSavedLead(null)} />

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
