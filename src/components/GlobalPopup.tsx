"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { track } from "@vercel/analytics";
import IntakeForm from "@/components/IntakeForm";
import LeadNextStepModal, { type LeadDetails } from "@/components/LeadNextStepModal";

interface PopupCustomDetail {
  title?: string;
  subtitle?: string;
  source?: string;
}

export default function GlobalPopup() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && Boolean(session?.user);
  const [isOpen, setIsOpen] = useState(false);
  const [lead, setLead] = useState<LeadDetails | null>(null);
  const [popupConfig, setPopupConfig] = useState<PopupCustomDetail>({});

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
    // window.dispatchEvent(new CustomEvent("open-intake-popup", { detail: { title, subtitle, source } }))
    const handleOpenEvent = (ev: Event) => {
      if (!isLoggedIn) {
        const customEv = ev as CustomEvent<PopupCustomDetail>;
        if (customEv.detail) {
          setPopupConfig(customEv.detail);
        } else {
          setPopupConfig({});
        }
        setIsOpen(true);
        try {
          track("popup_opened", {
            trigger: "cta_click",
            source: customEv.detail?.source || "intake_popup",
            page: pathname || "/",
          });
        } catch {
          // ignore
        }
      }
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

    // Global popup logic: trigger after 18s of reading OR 35% scroll depth (after 5s) instead of ambushing at 3s
    if ((isProd && !isSuppressedRoute) || hasQueryOverride) {
      const alreadyDismissed = sessionStorage.getItem("wd_global_popup_dismissed");
      if (!alreadyDismissed) {
        let triggered = false;
        const mountTime = Date.now();

        const triggerAutoPopup = (reason: string) => {
          if (triggered) return;
          triggered = true;
          setPopupConfig({});
          setIsOpen(true);
          try {
            track("popup_opened", { trigger: reason, page: pathname || "/" });
          } catch {
            // ignore
          }
        };

        const timer = setTimeout(
          () => triggerAutoPopup("timer_18s"),
          hasQueryOverride ? 1500 : 18000
        );

        const handleScroll = () => {
          if (triggered || Date.now() - mountTime < 5000) return;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (docHeight > 300 && scrollTop / docHeight >= 0.35) {
            triggerAutoPopup("scroll_35pct");
          }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
          clearTimeout(timer);
          window.removeEventListener("scroll", handleScroll);
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
    try {
      track("popup_dismissed", { page: pathname || "/" });
    } catch {
      // ignore
    }
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
            {popupConfig.title || "Start Your Will"}
          </div>
          {popupConfig.subtitle && (
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--color-slate)",
                margin: "0.35rem 0 0",
                lineHeight: 1.45,
              }}
            >
              {popupConfig.subtitle}
            </p>
          )}
        </div>

        {/* Embedded Intake Form */}
        <IntakeForm
          compact
          source={popupConfig.source || "intake_popup"}
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
