"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { DashboardTab } from "./DashboardTabsNav";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  state: WillDraftingState;
  onOpenSandbox: () => void;
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  state,
  onOpenSandbox,
}: DashboardSidebarProps) {
  const docCount = state.documents?.length || 0;
  const bookingCount = state.consultationBookings?.length || 0;
  const isAnnualReviewDue = !state.lastAnnualReviewDate;

  const navItems: {
    id: DashboardTab;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeType?: "warning" | "neutral" | "success";
  }[] = [
    {
      id: "overview",
      label: "My Will Overview",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "vault",
      label: "Will Vault & Deeds",
      badge: docCount,
      badgeType: "neutral",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "update",
      label: "Update My Will",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      ),
    },
    {
      id: "annual-review",
      label: "Annual Health Check",
      badge: isAnnualReviewDue ? "Due" : "Certified",
      badgeType: isAnnualReviewDue ? "warning" : "success",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "execution",
      label: "Execution Guide",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m18 2 4 4-12 12H6v-4z" />
          <path d="m14 6 4 4" />
        </svg>
      ),
    },
  ];

  const initials = (state.testator.fullName || "User")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      style={{
        width: "280px",
        backgroundColor: "var(--color-navy)",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        minHeight: "100vh",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        position: "sticky",
        top: 0,
      }}
      className="dashboard-sidebar-container"
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <Image
            src="/images/With Text.svg"
            alt="WillDrafting.in"
            width={160}
            height={26}
            style={{ height: "26px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>
      </div>

      {/* Primary Action Button: Questionnaire Wizard */}
      <div style={{ padding: "1.25rem 1.25rem 0.5rem" }}>
        <Link
          href="/start"
          className="btn btn-gold"
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            fontSize: "0.85rem",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontWeight: 700,
            boxShadow: "var(--shadow-gold)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Continue Questionnaire</span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: "1rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255, 255, 255, 0.45)" }}>
          Dashboard Modules
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: isActive ? "rgba(201, 162, 39, 0.15)" : "transparent",
                color: isActive ? "var(--color-gold)" : "rgba(255, 255, 255, 0.82)",
                border: "none",
                borderLeft: isActive ? "3px solid var(--color-gold)" : "3px solid transparent",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 500,
                transition: "var(--transition)",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: isActive ? "var(--color-gold)" : "rgba(255, 255, 255, 0.6)" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.45rem",
                    borderRadius: "999px",
                    backgroundColor:
                      item.badgeType === "warning"
                        ? "rgba(201, 162, 39, 0.25)"
                        : item.badgeType === "success"
                        ? "rgba(124, 148, 115, 0.3)"
                        : "rgba(255, 255, 255, 0.15)",
                    color: item.badgeType === "warning" ? "var(--color-gold)" : "#FFFFFF",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div style={{ marginTop: "1.25rem", padding: "0.4rem 0.75rem", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255, 255, 255, 0.45)" }}>
          Resources
        </div>

        <Link
          href="/how-it-works"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.65rem 0.85rem",
            borderRadius: "var(--radius-sm)",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>How It Works</span>
        </Link>

        <Link
          href="/why-make-a-will"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.65rem 0.85rem",
            borderRadius: "var(--radius-sm)",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Legal Protection Guide</span>
        </Link>
      </nav>

      {/* Footer Profile & Sandbox Switcher */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(18, 29, 52, 0.6)",
        }}
      >
        {/* User profile row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--color-navy)",
              border: "1.5px solid var(--color-gold)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {state.testator.fullName || "Rajesh Sharma"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-gold)", textTransform: "capitalize" }}>
              {state.selectedPlan.replace("_", " ")} Plan
            </div>
          </div>
        </div>

        {/* Sandbox Switcher Trigger */}
        <button
          onClick={onOpenSandbox}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "var(--radius-sm)",
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            transition: "var(--transition)",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
          <span>Demo Personas & Sandbox</span>
        </button>

        <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.5)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            ← Home
          </Link>
          <Link href="/login" style={{ color: "inherit", textDecoration: "none" }}>
            Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
}
