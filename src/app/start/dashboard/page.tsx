"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setActiveUser } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import WizardSidebar from "@/components/wizard/WizardSidebar";
import StartAssetWealthDashboard from "@/components/dashboard/StartAssetWealthDashboard";
import PaymentReturnBanner from "@/components/dashboard/PaymentReturnBanner";
import { useLanguage } from "@/context/LanguageContext";
import { getUrlForStep } from "@/lib/questionnaireFlow";
import { Menu } from "lucide-react";

function StartDashboardContent() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setActiveUser(userEmail);
    }
    void useWillStore.getState().initSession(userEmail).then(() => {
      if (session?.user) {
        const cur = useWillStore.getState().state;
        if (!cur.detailsVerified) {
          let changed = false;
          const testator = { ...cur.testator };
          if (!testator.fullName && session.user.name) {
            testator.fullName = session.user.name;
            changed = true;
          }
          if (!testator.email && session.user.email) {
            testator.email = session.user.email;
            changed = true;
          }
          if (!testator.phone && session.user.phone) {
            testator.phone = session.user.phone;
            changed = true;
          }
          if (changed) {
            useWillStore.getState().updateState((prev) => ({
              ...prev,
              testator,
            }));
          }
        }
      }
      setMounted(true);
    });

    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  }, [userEmail, session?.user]);

  const handleStepJump = (step: number) => {
    setMobileDrawerOpen(false);
    const targetUrl = getUrlForStep(step);
    router.push(targetUrl);
  };


  if (!mounted) {
    return (
      <div className="bento-loading-screen">
        <div className="bento-spinner" />
        <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "#172228" }}>
          Loading your Dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="bento-viewport-shell">
      {/* Desktop Left Stepper Sidebar */}
      <div className={`bento-sidebar-stepper-wrapper ${sidebarOpen ? "open" : "closed"}`}>
        <WizardSidebar
          currentStep={1}
          onJumpToStep={handleStepJump}
          lang={lang}
          onChangeLang={setLang}
          hideDashboardLink={true}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="bento-mobile-drawer-overlay"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="bento-mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <WizardSidebar
              currentStep={1}
              onJumpToStep={handleStepJump}
              lang={lang}
              onChangeLang={setLang}
              hideDashboardLink={true}
            />
          </div>
        </div>
      )}

      {/* Main Area: Top Bar + Bento Canvas */}
      <div className="bento-main-container">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="bento-top-header mobile-only">
          <div className="bento-header-left">
            <button
              type="button"
              className="bento-sidebar-toggle-btn mobile-only"
              onClick={() => setMobileDrawerOpen(true)}
              title="Open steps menu"
              aria-label="Open steps menu"
            >
              <Menu size={18} />
            </button>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#172228" }}>
              Dashboard
            </span>
          </div>
        </header>

        {/* Bento Cockpit Canvas */}
        <div className="bento-workspace">
          <main className="bento-main-canvas">
            <PaymentReturnBanner />
            <StartAssetWealthDashboard
              lang={lang}
              onJumpToStep={handleStepJump}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function StartDashboardPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#FAF7F0",
          }}
        >
          <div style={{ fontWeight: 600, color: "#172228" }}>
            Loading Dashboard...
          </div>
        </div>
      }
    >
      <StartDashboardContent />
    </Suspense>
  );
}
