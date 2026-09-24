"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WillDraftingState, completeAnnualReview } from "@/lib/willDraftingStore";
import AppleSwitch from "./AppleSwitch";
import {
  Users,
  Building2,
  PieChart,
  Scale,
  ShieldCheck,
  ScrollText,
  Lightbulb,
  Check,
  Printer,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface AnnualReviewTabProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function AnnualReviewTab({ state, onStateChange }: AnnualReviewTabProps) {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    family: true,
    assets: true,
    beneficiaries: true,
    executor: true,
    guardian: true,
    specialWishes: true,
  });

  const [hasCompletedThisSession, setHasCompletedThisSession] = useState(false);

  const reviewItems: {
    id: string;
    title: string;
    Icon: React.ElementType;
    prompt: string;
    detail: string;
    editStep: number;
  }[] = [
    {
      id: "family",
      title: "Family Structure Verification",
      Icon: Users,
      prompt: "Have there been any new births, adoptions, marriages, separations, or deaths in your immediate family circle?",
      detail: `Currently registered: ${state.familyMembers.length} members (${state.familyMembers.map((m) => m.name).join(", ") || "None"})`,
      editStep: 3,
    },
    {
      id: "assets",
      title: "Real Estate & Asset Portfolio",
      Icon: Building2,
      prompt: "Have you acquired new property, sold registered assets, closed bank accounts, or started a new business?",
      detail: `Currently cataloged: ${state.assets.length} assets with estimated value of ₹ ${(state.assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0) / 100000).toFixed(1)} Lakhs`,
      editStep: 4,
    },
    {
      id: "beneficiaries",
      title: "Beneficiary Allocations",
      Icon: PieChart,
      prompt: "Do the percentage allocations of your estate still reflect your current testamentary intentions without friction?",
      detail: `Residuary legatee: ${state.residuaryBeneficiaryName || "Sunita Sharma"}`,
      editStep: 5,
    },
    {
      id: "executor",
      title: "Executor Capacity & Residence",
      Icon: Scale,
      prompt: "Are your primary and alternate executors still willing, capable, and residing in India to administer your estate under ISA 1925?",
      detail: `Primary Executor: ${state.executorPrimary?.name || "Sunita Sharma"} • Alternate: ${state.executorAlternate?.name || "Rahul Sharma"}`,
      editStep: 6,
    },
    {
      id: "guardian",
      title: "Testamentary Guardian Suitability",
      Icon: ShieldCheck,
      prompt: "If you have minor children, do your chosen guardians remain the best legal and physical caregivers?",
      detail: state.familyMembers.some((f) => f.isMinor)
        ? `Primary Guardian: ${state.guardianPrimary?.name || "Appointed"}`
        : "No minor children currently registered (Clause not invoked)",
      editStep: 7,
    },
    {
      id: "specialWishes",
      title: "Special Wishes & Digital Assets",
      Icon: ScrollText,
      prompt: "Do your instructions regarding sentimental heirlooms, pet provisions, and digital asset custody remain current?",
      detail: state.specialWishes?.personalMessageToFamily ? "Personal message to family recorded" : "No custom directives specified",
      editStep: 8,
    },
  ];

  const totalItems = reviewItems.length;
  const verifiedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((verifiedCount / totalItems) * 100);
  const hasAnyUpdatesNeeded = verifiedCount < totalItems;

  const handleToggle = (id: string, value: boolean) => {
    setChecklist((prev) => ({ ...prev, [id]: value }));
  };

  const handleComplete = () => {
    const updated = completeAnnualReview();
    onStateChange(updated);
    setHasCompletedThisSession(true);
  };

  // SVG circular progress calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Hero Card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 247, 240, 0.85))",
          backdropFilter: "blur(20px)",
          borderRadius: "22px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "2.25rem 2.25rem",
          boxShadow: "0 10px 30px rgba(27, 42, 74, 0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "320px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(124, 148, 115, 0.15)", color: "var(--color-sage)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-sage)" }}></span>
            Section 39 • Annual Will Health Check
          </div>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 700, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Is your Will still aligned with your life?
          </h2>
          <p style={{ color: "var(--color-slate)", fontSize: "0.95rem", margin: "0.6rem 0 1.25rem", lineHeight: 1.6, maxWidth: "680px" }}>
            Life moves fast—new properties, marriages, or relocated executors can quietly render portions of a Will ambiguous. Verify each of the 6 pillars below to certify your testamentary posture for 2026.
          </p>

          <div
            style={{
              padding: "0.85rem 1.15rem",
              borderRadius: "14px",
              backgroundColor: "rgba(201, 162, 39, 0.08)",
              border: "1px solid rgba(201, 162, 39, 0.25)",
              fontSize: "0.825rem",
              color: "var(--color-navy)",
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
            }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(201, 162, 39, 0.15)", color: "var(--color-gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Lightbulb size={18} />
          </div>
            <span>
              <strong>Statutory Note:</strong> Under the Indian Succession Act 1925, a registered or unregistered Will does <em>not</em> expire over time. This annual audit prevents unintended partial intestacy.
            </span>
          </div>
        </div>

        {/* Progress Dial Widget */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.5rem 1.75rem",
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(27, 42, 74, 0.06)",
            minWidth: "190px",
          }}
        >
          <div style={{ position: "relative", width: "96px", height: "96px" }}>
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="rgba(27, 42, 74, 0.08)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="var(--color-sage)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)", lineHeight: 1 }}>
                {progressPercent}%
              </span>
              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
                AUDITED
              </span>
            </div>
          </div>

          <div style={{ marginTop: "0.85rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {verifiedCount} of {totalItems} Verified
            </div>
            <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", marginTop: "2px" }}>
              {state.lastAnnualReviewDate ? `Certified ${state.lastAnnualReviewDate.split("T")[0]}` : "Pending Review"}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Certification Toast / Banner */}
      {hasCompletedThisSession && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(124, 148, 115, 0.15), rgba(124, 148, 115, 0.05))",
            border: "1.5px solid var(--color-sage)",
            borderRadius: "20px",
            padding: "1.5rem 1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            boxShadow: "0 6px 20px rgba(124, 148, 115, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "var(--color-sage)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(124, 148, 115, 0.35)",
              }}
            >
              <Check size={24} strokeWidth={3} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                Annual Review Certified for 2026
              </h4>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "var(--color-slate)" }}>
                You have confirmed that your testamentary intentions remain accurate. A digital audit entry has been saved to your legal ledger.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(27, 42, 74, 0.15)",
              color: "var(--color-navy)",
              fontSize: "0.825rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Printer size={16} /> Print Audit Record
          </button>
        </div>
      )}

      {/* 6 Apple-grade Interactive Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            6-Point Statutory Review Checklist
          </h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Toggle switch off if updates are needed
          </span>
        </div>

        {reviewItems.map((item) => {
          const isVerified = checklist[item.id] ?? true;
          return (
            <div
              key={item.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: isVerified ? "1px solid rgba(27, 42, 74, 0.08)" : "1.5px solid var(--color-gold)",
                padding: "1.5rem 1.75rem",
                boxShadow: isVerified ? "0 4px 16px rgba(0, 0, 0, 0.02)" : "0 6px 20px rgba(201, 162, 39, 0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, minWidth: "280px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: isVerified ? "rgba(124, 148, 115, 0.12)" : "rgba(201, 162, 39, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                    <item.Icon size={20} color="var(--color-navy)" />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      {item.title}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px",
                        backgroundColor: isVerified ? "rgba(124, 148, 115, 0.12)" : "rgba(201, 162, 39, 0.15)",
                        color: isVerified ? "var(--color-sage)" : "#A37A12",
                      }}
                    >
                      {isVerified ? "Verified" : "Updates Needed"}
                    </span>
                  </div>
                  <p style={{ margin: "0.35rem 0 0.5rem", fontSize: "0.875rem", color: "var(--color-charcoal)", lineHeight: 1.5 }}>
                    {item.prompt}
                  </p>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    {item.detail}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                {!isVerified && (
                  <Link
                    href={`/start?step=${item.editStep}`}
                    style={{
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      color: "var(--color-navy)",
                      padding: "0.45rem 0.95rem",
                      borderRadius: "10px",
                      backgroundColor: "rgba(27, 42, 74, 0.06)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    Edit Module <span>→</span>
                  </Link>
                )}

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                  <AppleSwitch
                    checked={isVerified}
                    onChange={(val) => handleToggle(item.id, val)}
                    activeColor="var(--color-sage)"
                  />
                  <span style={{ fontSize: "0.7rem", color: isVerified ? "var(--color-sage)" : "var(--text-muted)", fontWeight: 600 }}>
                    {isVerified ? "Accurate" : "Needs Edit"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Action Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: "var(--color-navy)", fontSize: "1.05rem" }}>
            Ready to record your annual review?
          </div>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {hasAnyUpdatesNeeded
              ? `${totalItems - verifiedCount} module(s) flagged for revision. You can edit them in the questionnaire anytime.`
              : "All 6 statutory modules verified with no conflicting life changes."}
          </p>
        </div>

        <button
          onClick={handleComplete}
          className="btn btn-gold"
          style={{
            padding: "0.75rem 1.75rem",
            fontSize: "0.95rem",
            borderRadius: "12px",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(201, 162, 39, 0.25)",
            cursor: "pointer",
          }}
        >
          Confirm & Complete Annual Review
        </button>
      </div>
    </div>
  );
}

