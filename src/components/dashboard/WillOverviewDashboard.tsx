"use client";

import React from "react";
import Link from "next/link";
import {
  WillDraftingState,
  Asset,
  BeneficiaryAllocation,
  saveStoredWillState,
} from "@/lib/willDraftingStore";
import { getUrlForStep } from "@/lib/questionnaireFlow";
import FamilyTreeCanvas from "./FamilyTreeCanvas";
import {
  Users,
  Landmark,
  Scale,
  ShieldCheck,
  ScrollText,
  HeartHandshake,
  ArrowRight,
  Check,
  AlertTriangle,
  Minus,
  ChevronRight,
  User,
  Baby,
  Heart,
  FileText,
  Edit3,
  Eye,
  CreditCard,
  Building,
  Briefcase,
  Car,
  Gem,
  Cpu,
  BarChart3,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function formatCurrencyINR(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
  return `₹${val.toLocaleString("en-IN")}`;
}

const CATEGORY_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  property: { label: "Real Estate", icon: <Building size={15} />, color: "var(--color-navy)" },
  bank_account: { label: "Bank & Deposits", icon: <CreditCard size={15} />, color: "var(--color-slate)" },
  investments: { label: "Investments", icon: <BarChart3 size={15} />, color: "var(--color-gold)" },
  shares: { label: "Shares & Equity", icon: <BarChart3 size={15} />, color: "#6366F1" },
  mutual_funds: { label: "Mutual Funds", icon: <BarChart3 size={15} />, color: "#0EA5E9" },
  jewellery: { label: "Jewellery & Gold", icon: <Gem size={15} />, color: "#E11D48" },
  vehicles: { label: "Vehicles", icon: <Car size={15} />, color: "var(--color-sage)" },
  business: { label: "Business", icon: <Briefcase size={15} />, color: "#D97706" },
  insurance: { label: "Insurance", icon: <ShieldCheck size={15} />, color: "#059669" },
  digital: { label: "Digital Assets", icon: <Cpu size={15} />, color: "#7C3AED" },
  other: { label: "Other", icon: <FileText size={15} />, color: "#64748B" },
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION COMPLETION STATUS
   ═══════════════════════════════════════════════════════════════════ */

interface SectionStatus {
  label: string;
  status: "complete" | "partial" | "empty";
  stepUrl: string;
  stepNum: number;
}

function getSectionStatuses(state: WillDraftingState): SectionStatus[] {
  const hasTestator = Boolean(state.testator?.fullName?.trim());
  const hasFamily = state.familyMembers.length > 0;
  const hasAssets = state.assets.length > 0;
  const hasAllocations = state.allocations.length > 0;
  const hasExecutor = Boolean(state.executorPrimary?.name?.trim());
  const hasGuardian = Boolean(state.guardianPrimary?.name?.trim());
  const hasMinors = state.familyMembers.some((f) => f.isMinor);
  const hasWishes = Boolean(
    state.specialWishes?.funeralCeremonyWishes ||
    state.specialWishes?.digitalAccounts ||
    state.specialWishes?.jewelleryInstructions ||
    state.specialWishes?.personalBelongings ||
    state.specialWishes?.petsCare ||
    state.specialWishes?.charitableGifts ||
    state.specialWishes?.personalMessageToFamily ||
    state.specialWishes?.hasNoSpecialWishes
  );
  const hasEmotional = Boolean(state.emotionalReason?.trim());

  return [
    {
      label: "Personal Information",
      status: hasTestator ? "complete" : "empty",
      stepUrl: getUrlForStep(2),
      stepNum: 2,
    },
    {
      label: "Family & People",
      status: hasFamily ? "complete" : "empty",
      stepUrl: getUrlForStep(3),
      stepNum: 3,
    },
    {
      label: "Assets & Wealth",
      status: hasAssets ? "complete" : "empty",
      stepUrl: getUrlForStep(4),
      stepNum: 4,
    },
    {
      label: "Asset Distribution",
      status: hasAssets && hasAllocations
        ? "complete"
        : hasAssets && !hasAllocations
        ? "partial"
        : "empty",
      stepUrl: getUrlForStep(5),
      stepNum: 5,
    },
    {
      label: "Executors",
      status: hasExecutor ? "complete" : "empty",
      stepUrl: getUrlForStep(6),
      stepNum: 6,
    },
    {
      label: "Guardians",
      status: !hasMinors ? "complete" : hasGuardian ? "complete" : "empty",
      stepUrl: getUrlForStep(7),
      stepNum: 7,
    },
    {
      label: "Special Wishes",
      status: hasWishes ? "complete" : "empty",
      stepUrl: getUrlForStep(8),
      stepNum: 8,
    },
    {
      label: "Emotional Purpose",
      status: hasEmotional ? "complete" : "empty",
      stepUrl: getUrlForStep(9),
      stepNum: 9,
    },
  ];
}

function getNextIncompleteStep(state: WillDraftingState): number {
  const sections = getSectionStatuses(state);
  for (const s of sections) {
    if (s.status !== "complete") return s.stepNum;
  }
  return 10; // All done → review
}

/* ═══════════════════════════════════════════════════════════════════
   CARD WRAPPER
   ═══════════════════════════════════════════════════════════════════ */

function SectionCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        border: "1px solid var(--border-card)",
        boxShadow: "0 4px 16px rgba(23, 34, 40, 0.04)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  editLabel,
  editUrl,
  icon,
  count,
}: {
  title: string;
  editLabel?: string;
  editUrl?: string;
  icon?: React.ReactNode;
  count?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
        {icon && (
          <span style={{ color: "var(--color-gold)", display: "flex" }}>{icon}</span>
        )}
        <h3
          style={{
            margin: 0,
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--color-navy)",
          }}
        >
          {title}
        </h3>
        {count && (
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.15rem 0.55rem",
              borderRadius: "999px",
              backgroundColor: "rgba(198, 83, 120, 0.1)",
              color: "var(--color-gold)",
            }}
          >
            {count}
          </span>
        )}
      </div>
      {editUrl && (
        <Link
          href={editUrl}
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--color-gold)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid rgba(198, 83, 120, 0.2)",
            backgroundColor: "rgba(198, 83, 120, 0.06)",
            transition: "var(--transition)",
          }}
        >
          <Edit3 size={13} />
          {editLabel || "Edit"}
        </Link>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

interface WillOverviewDashboardProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function WillOverviewDashboard({
  state,
  onStateChange,
}: WillOverviewDashboardProps) {
  const sections = getSectionStatuses(state);
  const completedSections = sections.filter((s) => s.status === "complete").length;
  const totalSections = sections.length;
  const progressPercent = Math.round((completedSections / totalSections) * 100);
  const nextStepNum = getNextIncompleteStep(state);
  const nextStepUrl = getUrlForStep(nextStepNum);

  const family = state.familyMembers || [];
  const assets = state.assets || [];
  const allocations = state.allocations || [];

  const totalAssetValue = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);
  const beneficiaryNames = [...new Set(allocations.map((a) => a.beneficiaryName))];

  // Group assets by category for value summary
  const categoryTotals: Record<string, number> = {};
  assets.forEach((a) => {
    const key = a.category || "other";
    categoryTotals[key] = (categoryTotals[key] || 0) + (a.approximateValue || 0);
  });
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  // Allocation completeness per asset
  const getAssetAllocationTotal = (assetId: string): number => {
    return allocations
      .filter((a) => a.assetId === assetId)
      .reduce((sum, a) => sum + (a.percentage || 0), 0);
  };

  const handleFamilyStateChange = (newState: WillDraftingState) => {
    saveStoredWillState(newState);
    onStateChange(newState);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 1rem",
        width: "100%",
      }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HEADER — Title + Progress + Continue CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SectionCard>
        <div style={{ padding: "2rem 2rem 1.75rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.65rem",
                  fontWeight: 800,
                  color: "var(--color-navy)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                My Will Overview
              </h1>
              <p
                style={{
                  margin: "0.35rem 0 0",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  maxWidth: "480px",
                }}
              >
                A summary of everything you've entered for your Will. Review your information and continue where you left off.
              </p>
            </div>

            <Link
              href={nextStepUrl}
              className="btn btn-gold"
              style={{
                padding: "0.7rem 1.5rem",
                fontSize: "0.875rem",
                borderRadius: "12px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "var(--shadow-gold)",
                flexShrink: 0,
              }}
            >
              Continue Questionnaire
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Progress Bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                }}
              >
                Your Will Progress
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "var(--color-gold)",
                }}
              >
                {completedSections} of {totalSections} sections completed
              </span>
            </div>
            <div
              style={{
                height: "8px",
                backgroundColor: "rgba(23, 34, 40, 0.08)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background:
                    progressPercent === 100
                      ? "linear-gradient(90deg, var(--color-sage), #7C9473)"
                      : "linear-gradient(90deg, var(--color-gold), #E06D92)",
                  borderRadius: "999px",
                  transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "0.4rem",
              }}
            >
              {progressPercent}% complete
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SUMMARY METRIC CARDS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="will-overview-summary-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {/* People */}
        <SectionCard>
          <div style={{ padding: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Users size={16} color="var(--color-gold)" />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                }}
              >
                People
              </span>
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "var(--color-navy)",
              }}
            >
              {family.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {family.length === 1 ? "family member" : "family members"} added
            </div>
          </div>
        </SectionCard>

        {/* Assets */}
        <SectionCard>
          <div style={{ padding: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Landmark size={16} color="var(--color-gold)" />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                }}
              >
                Assets
              </span>
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "var(--color-navy)",
              }}
            >
              {assets.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {assets.length === 1 ? "asset" : "assets"} registered
            </div>
          </div>
        </SectionCard>

        {/* Beneficiaries */}
        {beneficiaryNames.length > 0 && (
          <SectionCard>
            <div style={{ padding: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Heart size={16} color="var(--color-gold)" />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                  }}
                >
                  Beneficiaries
                </span>
              </div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "var(--color-navy)",
                }}
              >
                {beneficiaryNames.length}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                receiving allocations
              </div>
            </div>
          </SectionCard>
        )}

        {/* Estimated Estate Value */}
        {totalAssetValue > 0 && (
          <SectionCard>
            <div style={{ padding: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <BarChart3 size={16} color="var(--color-gold)" />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                  }}
                >
                  Estimated Estate
                </span>
              </div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "var(--color-navy)",
                }}
              >
                {formatCurrencyINR(totalAssetValue)}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                total declared value
              </div>
            </div>
          </SectionCard>
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. FAMILY TREE (EXISTING COMPONENT)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FamilyTreeCanvas state={state} onStateChange={handleFamilyStateChange} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. PEOPLE & ROLES
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SectionCard>
        <SectionHeader
          title="People & Roles"
          icon={<Users size={18} />}
          editUrl={getUrlForStep(3)}
          editLabel="Edit Family"
        />
        <div style={{ padding: "1.25rem 1.5rem" }}>
          {/* Testator row */}
          {state.testator?.fullName && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Testator (Will Maker)
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(198, 83, 120, 0.06)",
                  borderRadius: "12px",
                  border: "1px solid rgba(198, 83, 120, 0.12)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-navy)",
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {state.testator.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                    }}
                  >
                    {state.testator.fullName}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {state.testator.religionPersonalLaw
                      ? state.testator.religionPersonalLaw.replace(/_/g, " ")
                      : ""}
                    {state.testator.city ? ` • ${state.testator.city}` : ""}
                    {state.testator.state ? `, ${state.testator.state}` : ""}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Family members grouped by relationship */}
          {family.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {family.map((member) => {
                const isMinor = member.isMinor;
                const icon =
                  member.relationship === "spouse" ? (
                    <Heart size={14} />
                  ) : isMinor ? (
                    <Baby size={14} />
                  ) : (
                    <User size={14} />
                  );
                return (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "12px",
                      border: "1px solid var(--border-subtle)",
                      backgroundColor: "var(--bg-card-subtle)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: isMinor
                          ? "rgba(198, 83, 120, 0.12)"
                          : "rgba(95, 126, 117, 0.12)",
                        color: isMinor ? "var(--color-gold)" : "var(--color-sage)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--color-navy)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {member.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          textTransform: "capitalize",
                        }}
                      >
                        {member.customRelationship || member.relationship}
                        {isMinor ? " • Minor" : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                padding: "1.5rem",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              <Users size={24} style={{ opacity: 0.3, marginBottom: "0.5rem" }} />
              <div>No family members added yet.</div>
              <Link
                href={getUrlForStep(3)}
                style={{
                  color: "var(--color-gold)",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  marginTop: "0.4rem",
                  display: "inline-block",
                }}
              >
                Add Family Members →
              </Link>
            </div>
          )}

          {/* Executor & Guardian Appointments */}
          {(state.executorPrimary?.name || state.guardianPrimary?.name) && (
            <div style={{ marginTop: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Important Appointments
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "0.65rem",
                }}
              >
                {state.executorPrimary?.name && (
                  <AppointmentCard
                    role="Primary Executor"
                    name={state.executorPrimary.name}
                    relationship={state.executorPrimary.relationship}
                  />
                )}
                {state.executorAlternate?.name && (
                  <AppointmentCard
                    role="Alternate Executor"
                    name={state.executorAlternate.name}
                    relationship={state.executorAlternate.relationship}
                  />
                )}
                {state.guardianPrimary?.name && (
                  <AppointmentCard
                    role="Primary Guardian"
                    name={state.guardianPrimary.name}
                    relationship={state.guardianPrimary.relationship}
                  />
                )}
                {state.guardianAlternate?.name && (
                  <AppointmentCard
                    role="Alternate Guardian"
                    name={state.guardianAlternate.name}
                    relationship={state.guardianAlternate.relationship}
                  />
                )}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <Link
                  href={getUrlForStep(6)}
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--color-gold)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Edit3 size={12} /> Edit Appointments
                </Link>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. ASSETS & WEALTH
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SectionCard>
        <SectionHeader
          title="Assets & Wealth"
          icon={<Landmark size={18} />}
          count={assets.length > 0 ? `${assets.length} assets` : undefined}
          editUrl={getUrlForStep(4)}
          editLabel="Edit Assets"
        />
        <div style={{ padding: "1.25rem 1.5rem" }}>
          {assets.length > 0 ? (
            <>
              {/* Value Summary by Category */}
              {sortedCategories.length > 0 && totalAssetValue > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Estate Value Breakdown
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {sortedCategories.map(([cat, val]) => {
                      const info = CATEGORY_LABELS[cat] || CATEGORY_LABELS.other;
                      const pct = Math.round((val / totalAssetValue) * 100);
                      return (
                        <div key={cat}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "0.2rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                color: "var(--color-navy)",
                              }}
                            >
                              <span style={{ color: info.color, display: "flex" }}>
                                {info.icon}
                              </span>
                              {info.label}
                            </div>
                            <span
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                color: "var(--color-navy)",
                              }}
                            >
                              {formatCurrencyINR(val)}{" "}
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 500 }}>
                                ({pct}%)
                              </span>
                            </span>
                          </div>
                          <div
                            style={{
                              height: "4px",
                              backgroundColor: "rgba(23, 34, 40, 0.06)",
                              borderRadius: "999px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${pct}%`,
                                height: "100%",
                                backgroundColor: info.color,
                                borderRadius: "999px",
                                transition: "width 0.4s ease",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border-subtle)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Total Estimated Estate Value
                    </span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      {formatCurrencyINR(totalAssetValue)}
                    </span>
                  </div>
                </div>
              )}

              {/* Individual Asset List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {assets.map((asset) => {
                  const info = CATEGORY_LABELS[asset.category] || CATEGORY_LABELS.other;
                  const assetAllocations = allocations.filter((a) => a.assetId === asset.id);
                  const totalPct = assetAllocations.reduce((s, a) => s + (a.percentage || 0), 0);
                  const isFullyAllocated = totalPct >= 99.5 && totalPct <= 100.5;

                  return (
                    <div
                      key={asset.id}
                      style={{
                        padding: "0.85rem 1rem",
                        borderRadius: "14px",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: "var(--bg-card-subtle)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
                          <span
                            style={{
                              color: info.color,
                              display: "flex",
                              flexShrink: 0,
                            }}
                          >
                            {info.icon}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "var(--color-navy)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {asset.name}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                              {info.label}
                              {asset.ownership === "joint"
                                ? ` • Joint (${asset.ownershipPercentage || 50}%)`
                                : " • Sole Ownership"}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: "var(--color-navy)",
                            }}
                          >
                            {formatCurrencyINR(asset.approximateValue || 0)}
                          </div>
                          {assetAllocations.length > 0 && (
                            <span
                              style={{
                                fontSize: "0.68rem",
                                fontWeight: 600,
                                padding: "0.1rem 0.4rem",
                                borderRadius: "999px",
                                backgroundColor: isFullyAllocated
                                  ? "rgba(95, 126, 117, 0.12)"
                                  : "rgba(225, 29, 72, 0.08)",
                                color: isFullyAllocated
                                  ? "var(--color-sage)"
                                  : "#BE123C",
                              }}
                            >
                              {isFullyAllocated
                                ? "100% Allocated"
                                : `${Math.round(totalPct)}% Allocated`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              <Landmark size={28} style={{ opacity: 0.3, marginBottom: "0.5rem" }} />
              <div>No assets added yet.</div>
              <Link
                href={getUrlForStep(4)}
                style={{
                  color: "var(--color-gold)",
                  fontWeight: 600,
                  textDecoration: "none",
                  marginTop: "0.4rem",
                  display: "inline-block",
                }}
              >
                Add Asset →
              </Link>
            </div>
          )}
        </div>
      </SectionCard>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. ASSET DISTRIBUTION
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {allocations.length > 0 && (
        <SectionCard>
          <SectionHeader
            title="Asset Distribution"
            icon={<Scale size={18} />}
            editUrl={getUrlForStep(5)}
            editLabel="Review Allocation"
          />
          <div style={{ padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {assets
                .filter((a) => allocations.some((al) => al.assetId === a.id))
                .map((asset) => {
                  const assetAllocs = allocations.filter((al) => al.assetId === asset.id);
                  const totalPct = assetAllocs.reduce((s, a) => s + (a.percentage || 0), 0);
                  const isComplete = totalPct >= 99.5 && totalPct <= 100.5;

                  return (
                    <div
                      key={asset.id}
                      style={{
                        padding: "1rem",
                        borderRadius: "14px",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: "var(--bg-card-subtle)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "var(--color-navy)",
                          }}
                        >
                          {asset.name}
                        </span>
                        {!isComplete && (
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "0.15rem 0.5rem",
                              borderRadius: "999px",
                              backgroundColor: "rgba(225, 29, 72, 0.08)",
                              color: "#BE123C",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.2rem",
                            }}
                          >
                            <AlertTriangle size={11} />
                            {Math.round(totalPct)}% assigned
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.35rem",
                        }}
                      >
                        {assetAllocs.map((alloc) => (
                          <div
                            key={alloc.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.82rem",
                                color: "var(--color-navy)",
                                fontWeight: 500,
                              }}
                            >
                              {alloc.beneficiaryName}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div
                                style={{
                                  width: "80px",
                                  height: "4px",
                                  backgroundColor: "rgba(23, 34, 40, 0.06)",
                                  borderRadius: "999px",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${alloc.percentage}%`,
                                    height: "100%",
                                    backgroundColor: "var(--color-sage)",
                                    borderRadius: "999px",
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: "var(--color-navy)",
                                  minWidth: "35px",
                                  textAlign: "right",
                                }}
                              >
                                {alloc.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </SectionCard>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. SPECIAL WISHES
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SectionCard>
        <SectionHeader
          title="Special Wishes"
          icon={<ScrollText size={18} />}
          editUrl={getUrlForStep(8)}
        />
        <div style={{ padding: "1.25rem 1.5rem" }}>
          {state.specialWishes?.hasNoSpecialWishes ? (
            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", padding: "0.5rem 0" }}>
              No special wishes added.
            </div>
          ) : (
            <SpecialWishesSummary wishes={state.specialWishes} />
          )}
        </div>
      </SectionCard>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. EMOTIONAL PURPOSE
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {state.emotionalReason?.trim() && (
        <SectionCard>
          <SectionHeader
            title="Emotional Purpose"
            icon={<HeartHandshake size={18} />}
            editUrl={getUrlForStep(9)}
          />
          <div style={{ padding: "1.25rem 1.5rem" }}>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--color-navy)",
                lineHeight: 1.6,
                fontStyle: "italic",
                padding: "0.5rem 1rem",
                borderLeft: "3px solid var(--color-gold)",
                backgroundColor: "rgba(198, 83, 120, 0.04)",
                borderRadius: "0 8px 8px 0",
              }}
            >
              "{state.emotionalReason}"
            </div>
          </div>
        </SectionCard>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. SECTION COMPLETION STATUS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SectionCard>
        <SectionHeader title="Will Preparation Status" icon={<FileText size={18} />} />
        <div style={{ padding: "1rem 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {sections.map((section) => {
              const statusIcon =
                section.status === "complete" ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : section.status === "partial" ? (
                  <AlertTriangle size={14} />
                ) : (
                  <Minus size={14} />
                );
              const statusColor =
                section.status === "complete"
                  ? "var(--color-sage)"
                  : section.status === "partial"
                  ? "#D97706"
                  : "var(--text-muted)";
              const statusText =
                section.status === "complete"
                  ? "Complete"
                  : section.status === "partial"
                  ? "Review Needed"
                  : "Not Started";

              return (
                <Link
                  key={section.label}
                  href={section.stepUrl}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.7rem 0.75rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "var(--transition)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-card-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--color-navy)",
                    }}
                  >
                    {section.label}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: statusColor,
                      }}
                    >
                      {statusText}
                    </span>
                    <span style={{ color: statusColor, display: "flex" }}>{statusIcon}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. BOTTOM CTA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ textAlign: "center", padding: "1rem 0 2rem" }}>
        <Link
          href={nextStepUrl}
          className="btn btn-gold"
          style={{
            padding: "0.85rem 2rem",
            fontSize: "0.95rem",
            borderRadius: "14px",
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "var(--shadow-gold)",
          }}
        >
          Continue Questionnaire
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function AppointmentCard({
  role,
  name,
  relationship,
}: {
  role: string;
  name: string;
  relationship?: string;
}) {
  return (
    <div
      style={{
        padding: "0.7rem 0.85rem",
        borderRadius: "12px",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-card-subtle)",
      }}
    >
      <div
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-gold)",
          marginBottom: "0.25rem",
        }}
      >
        {role}
      </div>
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "var(--color-navy)",
        }}
      >
        {name}
      </div>
      {relationship && (
        <div
          style={{
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            textTransform: "capitalize",
          }}
        >
          {relationship}
        </div>
      )}
    </div>
  );
}

function SpecialWishesSummary({
  wishes,
}: {
  wishes: WillDraftingState["specialWishes"];
}) {
  if (!wishes) {
    return (
      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", padding: "0.5rem 0" }}>
        No special wishes added yet.
      </div>
    );
  }

  const items: { label: string; value: string }[] = [];
  if (wishes.jewelleryInstructions) items.push({ label: "Jewellery", value: wishes.jewelleryInstructions });
  if (wishes.personalBelongings) items.push({ label: "Personal Belongings", value: wishes.personalBelongings });
  if (wishes.petsCare) items.push({ label: "Pet Care", value: wishes.petsCare });
  if (wishes.charitableGifts) items.push({ label: "Charitable Gifts", value: wishes.charitableGifts });
  if (wishes.digitalAccounts) items.push({ label: "Digital Accounts", value: wishes.digitalAccounts });
  if (wishes.funeralCeremonyWishes) items.push({ label: "Funeral Wishes", value: wishes.funeralCeremonyWishes });
  if (wishes.personalMessageToFamily) items.push({ label: "Personal Message", value: wishes.personalMessageToFamily });

  if (items.length === 0) {
    return (
      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", padding: "0.5rem 0" }}>
        No special wishes added yet.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            padding: "0.6rem 0.85rem",
            borderRadius: "10px",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-card-subtle)",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-gold)",
              marginBottom: "0.2rem",
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: "0.825rem",
              color: "var(--color-navy)",
              lineHeight: 1.5,
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
