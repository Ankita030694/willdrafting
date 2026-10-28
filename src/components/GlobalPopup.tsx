"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import IntakeForm from "@/components/IntakeForm";
import LeadNextStepModal, { type LeadDetails } from "@/components/LeadNextStepModal";

export default function GlobalPopup() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && Boolean(session?.user);
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<LeadDetails | null>(null);

  // Never show the intake form popup if the user is already signed in
  useEffect(() => {
    if (isLoggedIn && isOpen) {
      setIsOpen(false);
    }
  }, [isLoggedIn, isOpen]);

  // Automatically dismiss popup and lead modal when user enters the dashboard or wizard
  useEffect(() => {
    if (
      pathname?.startsWith("/start/dashboard") ||
      pathname?.startsWith("/dashboard") ||
      pathname?.startsWith("/authority") ||
      pathname?.startsWith("/nullify") ||
      pathname?.startsWith("/print")
    ) {
      setIsOpen(false);
      setLead(null);
    }
  }, [pathname]);

  useEffect(() => {
    // Wait until session status is known; never auto-show popup to logged-in users
    if (status === "loading" || isLoggedIn) return;

    // Check if running in production or explicit test override via ?popup=true
    const isProd = process.env.NODE_ENV === "production";
    const hasQueryOverride =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("popup") === "true";

    // Allow custom event trigger from any CTA button on the page:
    // window.dispatchEvent(new CustomEvent("open-intake-popup"))
    const handleOpenEvent = () => {
      if (!isLoggedIn) setIsOpen(true);
    };
    window.addEventListener("open-intake-popup", handleOpenEvent);

    const isSuppressedRoute =
      pathname?.startsWith("/start") ||
      pathname?.startsWith("/dashboard") ||
      pathname?.startsWith("/login") ||
      pathname?.startsWith("/complete-profile") ||
      pathname?.startsWith("/authority") ||
      pathname?.startsWith("/nullify") ||
      pathname?.startsWith("/print");

    // Global popup logic: only visible in production (or ?popup=true query override) for unauthenticated visitors
    if ((isProd && !isSuppressedRoute) || hasQueryOverride) {
      const alreadyDismissed = sessionStorage.getItem("wd_global_popup_dismissed");
      if (!alreadyDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3000); // 3 seconds delay after entering website

        return () => {
          clearTimeout(timer);
          window.removeEventListener("open-intake-popup", handleOpenEvent);
        };
      }
    }

    return () => {
      window.removeEventListener("open-intake-popup", handleOpenEvent);
    };
  }, [pathname, status, isLoggedIn]);

  // Close modal and remember dismissal for current browser session
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("wd_global_popup_dismissed", "true");
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (lead) {
    return <LeadNextStepModal lead={lead} onDismiss={() => setLead(null)} />;
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        backgroundColor: "rgba(18, 29, 52, 0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "popupFadeIn 0.25s ease-out forwards",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="editorial-card"
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "2.25rem",
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "popupSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Close Button (X) */}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "1px solid rgba(27, 42, 74, 0.12)",
            backgroundColor: "rgba(27, 42, 74, 0.04)",
            color: "var(--color-slate)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "1.2rem",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(27, 42, 74, 0.1)";
            e.currentTarget.style.color = "var(--color-navy)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(27, 42, 74, 0.04)";
            e.currentTarget.style.color = "var(--color-slate)";
          }}
        >
          ✕
        </button>

        {/* Clean Header without logo */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "var(--color-navy)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Start Your Will
          </div>
        </div>

        {/* Embedded Intake Form */}
        <IntakeForm
          compact
          onSuccess={(saved) => {
            setIsOpen(false);
            sessionStorage.setItem("wd_global_popup_dismissed", "true");
            setLead(saved);
          }}
        />
      </div>

      <style jsx>{`
        @keyframes popupFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popupSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
