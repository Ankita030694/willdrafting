"use client";

import React from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";

export type DashboardTab =
  | "overview"
  | "vault"
  | "update"
  | "annual-review"
  | "consultation"
  | "execution";

interface DashboardTabsNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  state: WillDraftingState;
}

export default function DashboardTabsNav({
  activeTab,
  onSelectTab,
  state,
}: DashboardTabsNavProps) {
  const docCount = state.documents?.length || 0;
  const bookingCount = state.consultationBookings?.length || 0;

  // Check if annual review is due (if not done in 365 days or never done)
  const isAnnualReviewDue = !state.lastAnnualReviewDate;

  const tabs: {
    id: DashboardTab;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeType?: "warning" | "neutral" | "success";
  }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "vault",
      label: "Will Vault",
      badge: docCount,
      badgeType: "neutral",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "update",
      label: "Update My Will",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      ),
    },
    {
      id: "annual-review",
      label: "Annual Review",
      badge: isAnnualReviewDue ? "Due" : "Verified",
      badgeType: isAnnualReviewDue ? "warning" : "success",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "consultation",
      label: "Lawyer Consultation",
      badge: bookingCount > 0 ? bookingCount : undefined,
      badgeType: "success",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "execution",
      label: "Signing & Execution",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m18 2 4 4-12 12H6v-4z" />
          <path d="m14 6 4 4" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: "4.75rem",
        zIndex: 90,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0.25rem 0",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.95rem 1.15rem",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--color-navy)" : "var(--color-slate)",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: isActive ? "3px solid var(--color-gold)" : "3px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "var(--transition)",
                }}
              >
                <span
                  style={{
                    color: isActive ? "var(--color-gold)" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>

                {tab.badge !== undefined && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "999px",
                      backgroundColor:
                        tab.badgeType === "warning"
                          ? "rgba(201, 162, 39, 0.15)"
                          : tab.badgeType === "success"
                          ? "rgba(124, 148, 115, 0.18)"
                          : "rgba(27, 42, 74, 0.08)",
                      color:
                        tab.badgeType === "warning"
                          ? "var(--color-navy)"
                          : tab.badgeType === "success"
                          ? "var(--color-navy)"
                          : "var(--color-slate)",
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
