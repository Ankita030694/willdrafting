"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  WillDraftingState,
  loadStoredWillState,
  SCENARIO_1_STANDARD_MARRIED,
} from "@/lib/willDraftingStore";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DashboardTab } from "@/components/dashboard/DashboardTabsNav";
import OverviewTab from "@/components/dashboard/OverviewTab";
import VaultTab from "@/components/dashboard/VaultTab";
import UpdateWillTab from "@/components/dashboard/UpdateWillTab";
import AnnualReviewTab from "@/components/dashboard/AnnualReviewTab";
import ConsultationTab from "@/components/dashboard/ConsultationTab";
import ExecutionGuideTab from "@/components/dashboard/ExecutionGuideTab";
import DemoSandboxModal from "@/components/dashboard/DemoSandboxModal";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") as DashboardTab | null;

  const validTabs: DashboardTab[] = [
    "overview",
    "vault",
    "update",
    "annual-review",
    "consultation",
    "execution",
  ];

  const activeTab: DashboardTab =
    rawTab && validTabs.includes(rawTab) ? rawTab : "overview";

  const [state, setState] = useState<WillDraftingState>(SCENARIO_1_STANDARD_MARRIED);
  const [mounted, setMounted] = useState(false);
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const loaded = loadStoredWillState();
    setState(loaded);
    setMounted(true);

    const handleStateChange = () => {
      setState(loadStoredWillState());
    };

    window.addEventListener("willdrafting_state_change", handleStateChange);
    return () => {
      window.removeEventListener("willdrafting_state_change", handleStateChange);
    };
  }, []);

  const handleTabChange = (tab: DashboardTab) => {
    router.push(`/dashboard?tab=${tab}`, { scroll: false });
    setMobileSidebarOpen(false);
  };

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "var(--bg-page)",
          color: "var(--color-navy)",
          fontFamily: "var(--font-main)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid var(--border-card)",
              borderTopColor: "var(--color-gold)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Loading your estate dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--bg-page)",
      }}
    >
      {/* Desktop Sidebar */}
      <div className="dashboard-sidebar-wrapper">
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          state={state}
          onOpenSandbox={() => setSandboxOpen(true)}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.7)",
            backdropFilter: "blur(3px)",
            zIndex: 999,
          }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            style={{ width: "280px", height: "100%", backgroundColor: "var(--color-navy)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardSidebar
              activeTab={activeTab}
              onSelectTab={handleTabChange}
              state={state}
              onOpenSandbox={() => {
                setMobileSidebarOpen(false);
                setSandboxOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile Header Bar */}
        <div
          className="dashboard-mobile-header"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-navy)",
            color: "#FFFFFF",
          }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.25rem",
            }}
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>WillDrafting Portal</span>
          <button
            onClick={() => setSandboxOpen(true)}
            style={{
              background: "none",
              border: "1px solid var(--color-gold)",
              color: "var(--color-gold)",
              borderRadius: "var(--radius-sm)",
              padding: "0.3rem 0.6rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Sandbox
          </button>
        </div>

        {/* Dashboard Top Header */}
        <DashboardHeader state={state} onStateChange={setState} />

        {/* Content Container */}
        <main style={{ flex: "1 0 auto", padding: "2rem 0 4rem" }}>
          <div className="container">
            {activeTab === "overview" && (
              <OverviewTab state={state} onNavigateTab={handleTabChange} />
            )}

            {activeTab === "vault" && (
              <VaultTab state={state} onStateChange={setState} />
            )}

            {activeTab === "update" && (
              <UpdateWillTab state={state} onStateChange={setState} />
            )}

            {activeTab === "annual-review" && (
              <AnnualReviewTab state={state} onStateChange={setState} />
            )}

            {activeTab === "consultation" && (
              <ConsultationTab state={state} onStateChange={setState} />
            )}

            {activeTab === "execution" && <ExecutionGuideTab state={state} />}
          </div>
        </main>
      </div>

      {/* Demo Sandbox Modal */}
      <DemoSandboxModal
        isOpen={sandboxOpen}
        onClose={() => setSandboxOpen(false)}
        currentState={state}
        onStateChange={setState}
      />

      <style jsx global>{`
        @media (max-width: 900px) {
          .dashboard-sidebar-wrapper {
            display: none !important;
          }
          .dashboard-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "var(--bg-page)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>
            Loading Dashboard...
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
