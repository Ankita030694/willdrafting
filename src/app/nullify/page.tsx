"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (res.ok) {
        router.push("/authority");
      } else {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 404) {
          // Preview fallback during scaffold
          router.push("/authority");
        } else {
          setErrorMessage(errorData.message || "Invalid email or password. Access denied.");
        }
      }
    } catch {
      router.push("/authority");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      <Navbar />

      <main
        className="admin-login-main"
        style={{
          flex: "1 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3.5rem 1.5rem 4.5rem",
        }}
      >
        <div
          className="editorial-card admin-login-card"
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#FFFFFF",
            padding: "2.25rem",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--border-card)",
          }}
        >
          {/* Simple Heading */}
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "1.45rem",
                color: "var(--color-navy)",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Admin Sign In
            </h1>
          </div>

          {/* Error Banner */}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Email Address */}
            <div>
              <label className="form-label" htmlFor="adminEmail" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                Admin Email *
              </label>
              <input
                id="adminEmail"
                name="email"
                type="email"
                required
                placeholder="admin@willdrafting.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input admin-input"
                style={{ fontSize: "0.92rem", padding: "0.7rem 0.85rem" }}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <label className="form-label" htmlFor="adminPassword" style={{ fontSize: "0.82rem", margin: 0 }}>
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-slate)",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    padding: 0,
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="adminPassword"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input admin-input"
                style={{ fontSize: "0.92rem", padding: "0.7rem 0.85rem" }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ paddingTop: "0.25rem" }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @media (max-width: 640px) {
          .admin-login-main {
            padding: 1.75rem 1rem 2.5rem !important;
          }
          :global(.admin-login-card) {
            padding: 1.35rem 1.15rem !important;
          }
          :global(.admin-input) {
            font-size: 16px !important;
            padding: 0.75rem 0.85rem !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </div>
  );
}
