"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { safeCallbackPath } from "@/lib/authValidation";
import EmailOtpAuth from "@/components/auth/EmailOtpAuth";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackPath(searchParams.get("callbackUrl"));
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorMessage] = useState("");
  const errorMessage =
    errorState || (searchParams.get("error") ? "Sign-in failed. Please try again." : "");
  const [successMessage, setSuccessMessage] = useState("");

  const emailParam = searchParams.get("email") || "";

  const handleAuthSuccess = () => {
    router.push(callbackUrl);
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error("Google sign in error:", err);
      setErrorMessage("Google Sign-In is currently being initialized. Please use the email code option.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#FAF7F0" }}>
      <Navbar />

      <main
        style={{
          flex: "1 0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "6.5rem",
          paddingBottom: "3rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            backgroundColor: "#FFFFFF",
            padding: "2.25rem 2rem",
            borderRadius: "24px",
            boxShadow: "0 14px 45px -8px rgba(23, 34, 40, 0.12)",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            margin: "auto 0",
          }}
        >
          {/* Brand Heading */}
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#C65378",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.35rem",
              }}
            >
              Indian Legal Estate Vault
            </span>
            <h1
              style={{
                fontSize: "1.55rem",
                color: "#172228",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              {mode === "signin" ? "Sign In to Your Account" : "Create Your Secure Account"}
            </h1>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#FAF7F0",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "1.25rem",
              border: "1px solid rgba(23, 34, 40, 0.06)",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              style={{
                flex: 1,
                padding: "0.55rem 0",
                fontSize: "0.85rem",
                fontWeight: mode === "signin" ? 700 : 500,
                color: mode === "signin" ? "#172228" : "#55636D",
                backgroundColor: mode === "signin" ? "#FFFFFF" : "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: mode === "signin" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage("");
                setSuccessMessage("");
              }}
              style={{
                flex: 1,
                padding: "0.55rem 0",
                fontSize: "0.85rem",
                fontWeight: mode === "signup" ? 700 : 500,
                color: mode === "signup" ? "#172228" : "#55636D",
                backgroundColor: mode === "signup" ? "#FFFFFF" : "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: mode === "signup" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              Create Account
            </button>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
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
              transition: "all 0.15s ease",
              marginBottom: "1.2rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.2rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(23, 34, 40, 0.1)" }} />
            <span style={{ fontSize: "0.75rem", color: "#55636D", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(23, 34, 40, 0.1)" }} />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                padding: "0.75rem 0.85rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(220, 38, 38, 0.08)",
                border: "1px solid rgba(220, 38, 38, 0.25)",
                borderRadius: "10px",
                color: "#991B1B",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div
              style={{
                padding: "0.75rem 0.85rem",
                marginBottom: "1rem",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                borderRadius: "10px",
                color: "#065F46",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* PASSWORDLESS EMAIL-CODE FORM (key resets the form when switching tabs) */}
          <EmailOtpAuth
            key={mode}
            mode={mode}
            initialEmail={emailParam}
            onSuccess={handleAuthSuccess}
          />

          {/* Privacy Note */}
          <div
            style={{
              marginTop: "1.4rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(23, 34, 40, 0.08)",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "#55636D",
              lineHeight: 1.4,
            }}
          >
            🔒 All personal information is protected under bank-grade encryption in accordance with the Indian Succession Act.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F0" }}>
          <span>Loading...</span>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
