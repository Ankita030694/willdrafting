"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  WillDraftingState,
  loadStoredWillState,
  saveStoredWillState,
  SCENARIO_1_STANDARD_MARRIED,
} from "@/lib/willDraftingStore";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { DashboardTab } from "@/components/dashboard/DashboardTabsNav";
import WillOverviewDashboard from "@/components/dashboard/WillOverviewDashboard";

function StartDashboardContent() {
  const router = useRouter();
  const [state, setState] = useState<WillDraftingState>(SCENARIO_1_STANDARD_MARRIED);
  const [mounted, setMounted] = useState(false);
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
    if (tab === "overview") {
      // Already on overview → do nothing
      return;
    }
    // Navigate to the main /dashboard page with the requested tab
    router.push(`/dashboard?tab=${tab}`);
  };

  const handleStateChange = (newState: WillDraftingState) => {
    saveStoredWillState(newState);
    setState(newState);
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
            Loading your Will Overview...
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
      {/* Desktop Sidebar — same as /dashboard */}
      <div className="dashboard-sidebar-wrapper">
        <DashboardSidebar
          activeTab="overview"
          onSelectTab={handleTabChange}
          state={state}
          onOpenSandbox={() => {}}
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
              activeTab="overview"
              onSelectTab={(tab) => {
                setMobileSidebarOpen(false);
                handleTabChange(tab);
              }}
              state={state}
              onOpenSandbox={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
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
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>My Will Overview</span>
          <div style={{ width: "24px" }} />
        </div>

        {/* Dashboard Content */}
        <main style={{ flex: "1 0 auto", padding: "2rem 0.5rem 3rem" }}>
          <WillOverviewDashboard state={state} onStateChange={handleStateChange} />
        </main>
      </div>

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
            backgroundColor: "var(--bg-page)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>
            Loading My Will Overview...
          </div>
        </div>
      }
    >
      <StartDashboardContent />
    </Suspense>
  );
}
