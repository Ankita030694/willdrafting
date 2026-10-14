"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Trigger session update to clear needsPhone flag
        await update();
        router.push("/dashboard");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Failed to update profile. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#FAF7F0" }}>
      <Navbar />

      <main style={{ flex: "1 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.25rem" }}>
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            padding: "2.25rem 2rem",
            boxShadow: "0 10px 35px -5px rgba(23, 34, 40, 0.08)",
            border: "1px solid rgba(23, 34, 40, 0.08)",
          }}
        >
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#C65378", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              One Last Step
            </span>
            <h1 style={{ fontSize: "1.45rem", color: "#172228", fontWeight: 700, margin: "0.3rem 0 0" }}>
              Add Your Mobile Number
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#55636D", marginTop: "0.4rem", lineHeight: 1.4 }}>
              Indian testamentary rules require a verified contact number for legal attestation records.
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                padding: "0.7rem 0.85rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(220, 38, 38, 0.08)",
                border: "1px solid rgba(220, 38, 38, 0.25)",
                borderRadius: "10px",
                color: "#991B1B",
                fontSize: "0.82rem",
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#172228", marginBottom: "0.35rem" }}>
                10-Digit Mobile Number *
              </label>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(23, 34, 40, 0.18)", borderRadius: "10px", overflow: "hidden" }}>
                <span style={{ padding: "0.75rem 0.85rem", backgroundColor: "#FAF7F0", fontSize: "0.88rem", fontWeight: 600, color: "#55636D", borderRight: "1px solid rgba(23, 34, 40, 0.12)" }}>
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  style={{
                    flex: 1,
                    padding: "0.75rem 0.85rem",
                    border: "none",
                    outline: "none",
                    fontSize: "0.9rem",
                    color: "#172228",
                  }}
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "0.92rem",
                fontWeight: 700,
                backgroundColor: "#C65378",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
              }}
            >
              {loading ? "Saving..." : "Continue to Dashboard →"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
