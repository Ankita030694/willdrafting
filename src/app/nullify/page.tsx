"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function NullifyLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const rawCallback = searchParams.get("callbackUrl");
  const targetUrl =
    rawCallback && rawCallback.startsWith("/authority") ? rawCallback : "/authority";

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "superadmin") {
      router.replace(targetUrl);
    }
  }, [status, session, router, targetUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both administrator email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        identifier: email.trim().toLowerCase(),
        password,
        isAdmin: "true",
        redirect: false,
      });

      if (!res?.error) {
        router.push(targetUrl);
        router.refresh();
      } else {
        setErrorMessage("Invalid administrator credentials. Access denied.");
      }
    } catch {
      setErrorMessage("Network error during administrator authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F0",
        color: "#172228",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          borderRadius: "24px",
          padding: "2.35rem 2.1rem",
          boxShadow: "0 14px 45px -8px rgba(23, 34, 40, 0.12)",
        }}
      >
        {/* Brand Logo & Heading */}
        <div style={{ textAlign: "center", marginBottom: "1.65rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}>
            <Image
              src="/Logofinal.svg"
              alt="WillDrafting.in"
              width={140}
              height={36}
              style={{ height: "34px", width: "auto", objectFit: "contain" }}
              priority
            />
          </div>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "#C65378",
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              padding: "0.22rem 0.7rem",
              borderRadius: "999px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Restricted Authority Portal
          </span>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#172228",
              margin: 0,
              letterSpacing: "-0.015em",
            }}
          >
            Superadmin Sign In
          </h1>
          <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
            Enter your root credentials to access the Authority Console
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: "0.7rem 0.9rem",
              marginBottom: "1.1rem",
              backgroundColor: "rgba(198, 83, 120, 0.08)",
              border: "1px solid rgba(198, 83, 120, 0.28)",
              borderRadius: "12px",
              color: "#a13c5d",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.05rem" }}>
          <div>
            <label
              htmlFor="adminEmail"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#172228",
                marginBottom: "0.35rem",
              }}
            >
              Superadmin Email *
            </label>
            <input
              id="adminEmail"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="admin@willdrafting.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                fontSize: "0.9rem",
                borderRadius: "12px",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.12)",
                color: "#172228",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C65378")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(23, 34, 40, 0.12)")}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <label
                htmlFor="adminPassword"
                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#172228", margin: 0 }}
              >
                Password *
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#49585F",
                  cursor: "pointer",
                  fontSize: "0.76rem",
                  fontWeight: 600,
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
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 0.9rem",
                fontSize: "0.9rem",
                borderRadius: "12px",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.12)",
                color: "#172228",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C65378")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(23, 34, 40, 0.12)")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.35rem",
              width: "100%",
              padding: "0.85rem",
              fontSize: "0.92rem",
              fontWeight: 700,
              borderRadius: "12px",
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              border: "none",
              boxShadow: "0 4px 14px rgba(198, 83, 120, 0.25)",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#a13c5d";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#C65378";
            }}
          >
            {loading ? "Authenticating..." : "Enter Authority Console →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FAF7F0" }} />}>
      <NullifyLoginForm />
    </Suspense>
  );
}
