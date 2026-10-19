"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  WillDraftingState,
  Asset,
  FamilyMember,
  BeneficiaryAllocation,
  saveStoredWillState,
  formatDDMMYYYY,
} from "@/lib/willDraftingStore";
import { getUrlForStep, QUESTIONNAIRE_STEPS } from "@/lib/questionnaireFlow";
import FamilyTreeCanvas from "./FamilyTreeCanvas";
import {
  Users,
  Landmark,
  Scale,
  ShieldCheck,
  ScrollText,
  HeartHandshake,
  ArrowRight,
  ArrowUpDown,
  Check,
  AlertTriangle,
  Minus,
  ChevronRight,
  User,
  Baby,
  Heart,
  FileText,
  Edit3,
  CreditCard,
  Building,
  Briefcase,
  Car,
  Gem,
  Cpu,
  BarChart3,
  ExternalLink,
  X,
  Sparkles,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   CURRENCY & CATEGORY HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function formatCurrencyINR(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
  return `₹${val.toLocaleString("en-IN")}`;
}

const CATEGORY_META: Record<
  string,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  property: { label: "Real Estate", icon: <Building size={13} />, color: "#172228", bg: "rgba(23, 34, 40, 0.06)" },
  bank_account: { label: "Bank Accounts & FDs", icon: <CreditCard size={13} />, color: "#5F7E75", bg: "rgba(95, 126, 117, 0.12)" },
  investments: { label: "Mutual Funds & SIPs", icon: <BarChart3 size={13} />, color: "#C65378", bg: "rgba(198, 83, 120, 0.1)" },
  shares: { label: "Stocks & Shares", icon: <BarChart3 size={13} />, color: "#49585F", bg: "rgba(73, 88, 95, 0.1)" },
  mutual_funds: { label: "Mutual Funds", icon: <BarChart3 size={13} />, color: "#5F7E75", bg: "rgba(95, 126, 117, 0.1)" },
  jewellery: { label: "Gold & Jewellery", icon: <Gem size={13} />, color: "#C9A227", bg: "rgba(201, 162, 39, 0.12)" },
  vehicles: { label: "Vehicles & Cars", icon: <Car size={13} />, color: "#49585F", bg: "rgba(23, 34, 40, 0.05)" },
  business: { label: "Business Ownership", icon: <Briefcase size={13} />, color: "#172228", bg: "rgba(23, 34, 40, 0.08)" },
  insurance: { label: "Life Insurance", icon: <ShieldCheck size={13} />, color: "#5F7E75", bg: "rgba(95, 126, 117, 0.12)" },
  digital: { label: "Email & Social Accounts", icon: <Cpu size={13} />, color: "#C65378", bg: "rgba(198, 83, 120, 0.08)" },
  other: { label: "Other Belongings", icon: <FileText size={13} />, color: "#49585F", bg: "rgba(73, 88, 95, 0.08)" },
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION COMPLETION CALCULATION
   ═══════════════════════════════════════════════════════════════════ */

interface SectionStatus {
  key: string;
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
    { key: "testator", label: "About You", status: hasTestator ? "complete" : "empty", stepUrl: getUrlForStep(2), stepNum: 2 },
    { key: "family", label: "Your Family", status: hasFamily ? "complete" : "empty", stepUrl: getUrlForStep(3), stepNum: 3 },
    { key: "assets", label: "Properties & Wealth", status: hasAssets ? "complete" : "empty", stepUrl: getUrlForStep(4), stepNum: 4 },
    {
      key: "allocations",
      label: "Who Gets What",
      status: hasAssets && hasAllocations ? "complete" : hasAssets && !hasAllocations ? "partial" : "empty",
      stepUrl: getUrlForStep(5),
      stepNum: 5,
    },
    { key: "executors", label: "Will Manager (Executor)", status: hasExecutor ? "complete" : "empty", stepUrl: getUrlForStep(6), stepNum: 6 },
    {
      key: "guardians",
      label: "Guardian for Children",
      status: !hasMinors ? "complete" : hasGuardian ? "complete" : "empty",
      stepUrl: getUrlForStep(7),
      stepNum: 7,
    },
    { key: "wishes", label: "Special Wishes & Notes", status: hasWishes ? "complete" : "empty", stepUrl: getUrlForStep(8), stepNum: 8 },
    { key: "emotional", label: "Why You Made This Will", status: hasEmotional ? "complete" : "empty", stepUrl: getUrlForStep(9), stepNum: 9 },
  ];
}

function getNextIncompleteStep(state: WillDraftingState): number {
  const sections = getSectionStatuses(state);
  for (const s of sections) {
    if (s.status !== "complete") return s.stepNum;
  }
  return 10;
}

/* ═══════════════════════════════════════════════════════════════════
   GAUGE COMPONENT (Like Image 2 / Image 3)
   ═══════════════════════════════════════════════════════════════════ */

function SemiCircleGauge({ percent }: { percent: number }) {
  const radius = 38;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ position: "relative", width: "105px", height: "56px", margin: "0 auto" }}>
      <svg width="105" height="56" viewBox="0 0 105 56" style={{ overflow: "visible" }}>
        <path
          d="M 14 52 A 38 38 0 0 1 91 52"
          fill="none"
          stroke="rgba(23, 34, 40, 0.08)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 14 52 A 38 38 0 0 1 91 52"
          fill="none"
          stroke="url(#bentoGaugeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <defs>
          <linearGradient id="bentoGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C65378" />
            <stop offset="100%" stopColor="#5F7E75" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontWeight: 800,
          fontSize: "1.15rem",
          color: "#172228",
          lineHeight: 1,
        }}
      >
        {percent}%
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MODAL TYPES
   ═══════════════════════════════════════════════════════════════════ */

type ModalKey =
  | "testator"
  | "assets"
  | "family"
  | "allocations"
  | "appointments"
  | "wishes"
  | "emotional"
  | "readiness"
  | null;

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
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [familyTab, setFamilyTab] = useState<"list" | "tree">("list");
  const [assetViewMode, setAssetViewMode] = useState<"detailed" | "summary">("detailed");

  // Calculations
  const sections = useMemo(() => getSectionStatuses(state), [state]);
  const completedSections = sections.filter((s) => s.status === "complete").length;
  const totalSections = sections.length;
  const progressPercent = Math.round((completedSections / totalSections) * 100);
  const nextStepNum = getNextIncompleteStep(state);
  const nextStepUrl = getUrlForStep(nextStepNum);

  const family = state.familyMembers || [];
  const assets = state.assets || [];
  const allocations = state.allocations || [];

  const totalAssetValue = useMemo(
    () => assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0),
    [assets]
  );

  const beneficiaryNames = useMemo(
    () => [...new Set(allocations.map((a) => a.beneficiaryName))],
    [allocations]
  );

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    assets.forEach((a) => {
      const key = a.category || "other";
      totals[key] = (totals[key] || 0) + (a.approximateValue || 0);
    });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [assets]);

  const minorChildren = family.filter((f) => f.isMinor);
  const hasMinors = minorChildren.length > 0;

  // 4 Core Category Aggregations for 2-Column Grid in Estate Card
  const propertyAssets = useMemo(() => assets.filter((a) => a.category === "property"), [assets]);
  const propertyTotal = useMemo(() => propertyAssets.reduce((sum, a) => sum + (a.approximateValue || 0), 0), [propertyAssets]);

  const bankAssets = useMemo(() => assets.filter((a) => a.category === "bank_account"), [assets]);
  const bankTotal = useMemo(() => bankAssets.reduce((sum, a) => sum + (a.approximateValue || 0), 0), [bankAssets]);

  const investmentAssets = useMemo(
    () => assets.filter((a) => a.category === "investments" || a.category === "shares" || a.category === "mutual_funds"),
    [assets]
  );
  const investmentTotal = useMemo(() => investmentAssets.reduce((sum, a) => sum + (a.approximateValue || 0), 0), [investmentAssets]);

  const otherAssets = useMemo(
    () => assets.filter((a) => a.category !== "property" && a.category !== "bank_account" && a.category !== "investments" && a.category !== "shares" && a.category !== "mutual_funds"),
    [assets]
  );
  const otherTotal = useMemo(() => otherAssets.reduce((sum, a) => sum + (a.approximateValue || 0), 0), [otherAssets]);

  // Group assets by category for the columns (Real Estate & Life Insurance prioritized as requested)
  const CATEGORY_PRIORITY: Record<string, number> = {
    insurance: 1,
    property: 2,
    bank_account: 3,
    investments: 4,
    shares: 5,
    mutual_funds: 6,
    business: 7,
    jewellery: 8,
    vehicles: 9,
    digital: 10,
    other: 11,
  };

  const assetsByCategory = useMemo(() => {
    const groups: Record<
      string,
      { meta: (typeof CATEGORY_META)[string]; items: Asset[]; total: number }
    > = {};

    assets.forEach((a) => {
      const catKey = a.category || "other";
      if (!groups[catKey]) {
        groups[catKey] = {
          meta: CATEGORY_META[catKey] || CATEGORY_META.other,
          items: [],
          total: 0,
        };
      }
      groups[catKey].items.push(a);
      groups[catKey].total += a.approximateValue || 0;
    });

    return Object.entries(groups).sort((a, b) => {
      const pA = CATEGORY_PRIORITY[a[0]] ?? 99;
      const pB = CATEGORY_PRIORITY[b[0]] ?? 99;
      return pA - pB;
    });
  }, [assets]);

  // Allocation completeness check
  const unallocatedAssets = assets.filter((asset) => {
    const assetAllocs = allocations.filter((al) => al.assetId === asset.id);
    const sum = assetAllocs.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
    return sum < 99.5 || sum > 100.5;
  });

  // Testator formatted legal metadata
  const testatorAge = useMemo(() => {
    if (!state.testator.dob) return null;
    const birth = new Date(state.testator.dob);
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, [state.testator.dob]);

  const testatorDobFormatted = useMemo(() => {
    if (!state.testator.dob) return null;
    return formatDDMMYYYY(state.testator.dob);
  }, [state.testator.dob]);

  const personalLawFormatted = useMemo(() => {
    const raw = (state.testator.religionPersonalLaw || "").trim().toLowerCase();
    if (!raw || raw === "hindu") return "Indian Succession Act, 1925";
    if (raw === "muslim") return "Muslim Personal Law (Shariat)";
    if (raw === "christian") return "Indian Succession Act, 1925";
    if (raw === "parsi") return "Indian Succession Act (Parsi)";
    return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [state.testator.religionPersonalLaw]);

  const workplaceConcise = useMemo(() => {
    const wp = state.testator.workplace;
    if (!wp) return "Not Provided";
    const parts = wp.split(",");
    return parts.slice(0, 2).join(",").trim();
  }, [state.testator.workplace]);

  const domicileConcise = useMemo(() => {
    const t = state.testator;
    if (!t.city && !t.state && !t.pincode) return "Not Provided";
    return `${t.city || ""}${t.state ? `, ${t.state}` : ""}${t.pincode ? ` (${t.pincode})` : ""}`.replace(/^,\s*/, "");
  }, [state.testator]);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="bento-dashboard-root">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BENTO GRID CANVAS (Non-scrollable, fits 100vh on desktop)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bento-canvas-grid">
        {/* ── CARD 1: ABOUT YOU (WILL CREATOR & JURISDICTION) ───────────────── */}
        <div className="bento-card bento-card-testator">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <User size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">About You</h3>
                <span className="bento-card-subtitle">Will Creator & Jurisdiction</span>
              </div>
            </div>
            <span className="bento-pill bento-pill-blue" title="Statutory Governing Code">
              <Scale size={11} style={{ marginRight: "3px" }} />
              {personalLawFormatted}
            </span>
          </div>

          <div className="bento-card-body" style={{ gap: "0.4rem" }}>
            {/* Identity Bar with Rich Demographics & Parentage */}
            <div className="bento-testator-main">
              <div
                className="bento-avatar"
                style={{
                  background: "linear-gradient(135deg, #172228 0%, #2F3E46 100%)",
                  boxShadow: "0 2px 6px rgba(23,34,40,0.15)",
                }}
              >
                {(state.testator.fullName || "TM")
                  .split(" ")
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <h4 className="bento-testator-name" title={state.testator.fullName || "Not Specified"}>
                    {state.testator.fullName || "Click to add your name"}
                  </h4>
                  <span title="Testator Identity & Age of Majority Verified" style={{ display: "inline-flex", alignItems: "center" }}>
                    <CheckCircle2 size={13} style={{ color: "#2E7D32" }} />
                  </span>
                </div>
                <p className="bento-testator-meta">
                  <span>{testatorAge ? `${testatorAge} Yrs` : "Adult"}{testatorDobFormatted ? ` (${testatorDobFormatted})` : ""}</span>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span style={{ textTransform: "capitalize" }}>{state.testator.gender || "Male"}</span>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span style={{ textTransform: "capitalize" }}>{state.testator.maritalStatus || "Married"}</span>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span>{state.testator.citizenship || "Indian Citizen"}</span>
                </p>
                {state.testator.fatherOrMotherName && (
                  <p className="bento-testator-parentage" title={`Statutory Parentage: ${state.testator.fatherOrMotherName}`}>
                    {state.testator.gender === "female" ? "D/o" : "S/o"} {state.testator.fatherOrMotherName}
                  </p>
                )}
              </div>
            </div>

            {/* 6-Item Dense Data Matrix: Concise, Structured & High-Value */}
            <div className="bento-testator-grid">
              {/* 1. PAN Card */}
              <div className="bento-info-tile" title={`Permanent Account Number: ${state.testator.pan || "Not Provided"}`}>
                <span className="bento-tile-label"><ShieldCheck size={11} style={{ color: "#2E7D32" }} /> PAN Card:</span>
                <span className="bento-tile-value" style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>
                  {state.testator.pan || "Not Provided"}
                </span>
              </div>

              {/* 2. Aadhaar UID */}
              <div className="bento-info-tile" title={`Govt Verified Aadhaar: ${state.testator.aadhaar || "Not Provided"}`}>
                <span className="bento-tile-label"><CreditCard size={11} style={{ color: "#1976D2" }} /> Aadhaar UID:</span>
                <span className="bento-tile-value">
                  {state.testator.aadhaar || "Not Provided"}
                </span>
              </div>

              {/* 3. Workplace / Institution */}
              <div className="bento-info-tile" title={state.testator.workplace || "Not Provided"}>
                <span className="bento-tile-label"><Building size={11} style={{ color: "#6A1B9A" }} /> Workplace:</span>
                <span className="bento-tile-value">
                  {workplaceConcise}
                </span>
              </div>

              {/* 4. Domicile / Residence */}
              <div className="bento-info-tile" title={`${state.testator.address || ""}, ${state.testator.city || ""} - ${state.testator.pincode || ""}`}>
                <span className="bento-tile-label"><MapPin size={11} style={{ color: "#D84315" }} /> Domicile:</span>
                <span className="bento-tile-value">
                  {domicileConcise}
                </span>
              </div>

              {/* 5. Contact Email */}
              <div className="bento-info-tile" title={`Official Email: ${state.testator.email || "Not Provided"}`}>
                <span className="bento-tile-label"><Mail size={11} style={{ color: "#00838F" }} /> Contact:</span>
                <span className="bento-tile-value" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {state.testator.email || "Not Provided"}
                </span>
              </div>

              {/* 6. Will Status */}
              <div className="bento-info-tile" title={state.testator.hasPreviousWill ? "Revokes Earlier Will" : "First & Original Will"}>
                <span className="bento-tile-label"><ScrollText size={11} style={{ color: "#C65378" }} /> Will Status:</span>
                <span className="bento-tile-value">
                  {state.testator.hasPreviousWill ? "Replaces Earlier Will" : "First & Original Will"}
                </span>
              </div>
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("testator")}>
              View Details
            </button>
            <Link href={getUrlForStep(2)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 2 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 2: PROPERTIES & WEALTH (BY ASSET / BY CATEGORY TOGGLE) ── */}
        <div className="bento-card bento-card-assets">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                <Landmark size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Properties & Wealth</h3>
                <span className="bento-card-subtitle">
                  {assets.length} Assets in {assetsByCategory.length} Categories
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div className="bento-view-toggle">
                <button
                  type="button"
                  className={`bento-view-toggle-btn ${assetViewMode === "detailed" ? "active" : ""}`}
                  onClick={() => setAssetViewMode("detailed")}
                >
                  By Asset
                </button>
                <button
                  type="button"
                  className={`bento-view-toggle-btn ${assetViewMode === "summary" ? "active" : ""}`}
                  onClick={() => setAssetViewMode("summary")}
                >
                  By Category
                </button>
              </div>
              <strong style={{ fontSize: "1.05rem", fontWeight: 800, color: "#172228" }}>
                {formatCurrencyINR(totalAssetValue)}
              </strong>
            </div>
          </div>

          <div className="bento-card-body" style={{ gap: "0.35rem" }}>
            {/* Proportion Bar */}
            <div className="bento-stacked-bar" style={{ height: "5px", margin: "0.05rem 0 0.2rem" }}>
              {categoryTotals.length > 0 ? (
                categoryTotals.map(([cat, val]) => {
                  const pct = Math.max(3, Math.round((val / (totalAssetValue || 1)) * 100));
                  const meta = CATEGORY_META[cat] || CATEGORY_META.other;
                  return (
                    <div
                      key={cat}
                      className="bento-stacked-segment"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                      title={`${meta.label}: ${formatCurrencyINR(val)} (${pct}%)`}
                    />
                  );
                })
              ) : (
                <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(23, 34, 40, 0.08)" }} />
              )}
            </div>

            {/* Vertically Scrollable Asset Table: By Asset or By Category */}
            <div className="bento-assets-table-container">
              {assetViewMode === "detailed" ? (
                <table className="bento-assets-table">
                  <thead>
                    <tr>
                      <th style={{ width: "24%" }}>Category</th>
                      <th style={{ width: "34%" }}>Asset / Description</th>
                      <th style={{ width: "24%" }}>Identifier / Location</th>
                      <th style={{ width: "18%", textAlign: "right" }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsByCategory.length > 0 ? (
                      assetsByCategory.map(([catKey, group]) =>
                        group.items.map((asset, index) => {
                          const isFirstInGroup = index === 0;
                          const isLastInGroup = index === group.items.length - 1;
                          const ident = asset.identifier || asset.addressOrInstitution || "-";
                          const isJoint = asset.ownership === "joint";

                          return (
                            <tr
                              key={asset.id}
                              className="bento-table-item-row"
                              style={{
                                borderBottom: isLastInGroup ? "2px solid rgba(23, 34, 40, 0.08)" : "1px solid rgba(23, 34, 40, 0.04)",
                              }}
                            >
                              {isFirstInGroup && (
                                <td
                                  rowSpan={group.items.length}
                                  className="bento-table-cat-cell"
                                >
                                  <div className="bento-table-cat-box">
                                    <span className="bento-table-cat-title">
                                      <span
                                        className="bento-icon-badge"
                                        style={{
                                          backgroundColor: group.meta.bg,
                                          color: group.meta.color,
                                          width: "18px",
                                          height: "18px",
                                          padding: "2px",
                                        }}
                                      >
                                        {group.meta.icon}
                                      </span>
                                      {group.meta.label}
                                    </span>
                                    <div className="bento-table-cat-meta">
                                      <span style={{ fontSize: "0.58rem", color: "#49585F" }}>
                                        {group.items.length} {group.items.length === 1 ? "Asset" : "Assets"}
                                      </span>
                                    </div>
                                    <span className="bento-table-cat-total">
                                      {formatCurrencyINR(group.total)}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td>
                                <span className="bento-table-asset-name" title={asset.name}>
                                  {asset.name}
                                </span>
                                {asset.typeDetails && (
                                  <span className="bento-table-asset-sub">{asset.typeDetails}</span>
                                )}
                              </td>
                              <td>
                                <span className="bento-table-asset-ident" title={ident}>
                                  {ident}
                                </span>
                                {isJoint && (
                                  <span
                                    style={{
                                      fontSize: "0.52rem",
                                      color: "#9E7408",
                                      fontWeight: 600,
                                      marginTop: "0.1rem",
                                      display: "block",
                                    }}
                                  >
                                    Joint ({asset.ownershipPercentage || 50}%)
                                  </span>
                                )}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <strong className="bento-table-asset-val">
                                  {formatCurrencyINR(asset.approximateValue || 0)}
                                </strong>
                              </td>
                            </tr>
                          );
                        })
                      )
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center", padding: "1rem", color: "#49585F" }}>
                          No assets listed yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="bento-assets-table">
                  <thead>
                    <tr>
                      <th style={{ width: "24%" }}>Category</th>
                      <th style={{ width: "16%" }}>No. of Assets</th>
                      <th style={{ width: "20%" }}>Total Value</th>
                      <th style={{ width: "40%" }}>Assets Included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsByCategory.length > 0 ? (
                      assetsByCategory.map(([catKey, group]) => (
                        <tr key={catKey} className="bento-table-item-row">
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                              <span
                                className="bento-icon-badge"
                                style={{
                                  backgroundColor: group.meta.bg,
                                  color: group.meta.color,
                                  width: "20px",
                                  height: "20px",
                                  padding: "2px",
                                }}
                              >
                                {group.meta.icon}
                              </span>
                              <strong style={{ fontSize: "0.74rem", color: "#172228" }}>{group.meta.label}</strong>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: "0.62rem", color: "#49585F", fontWeight: 600 }}>
                              {group.items.length} {group.items.length === 1 ? "Asset" : "Assets"}
                            </span>
                          </td>
                          <td>
                            <strong style={{ fontSize: "0.76rem", color: "#172228" }}>
                              {formatCurrencyINR(group.total)}
                            </strong>
                          </td>
                          <td>
                            <div className="bento-summary-chips">
                              {group.items.map((item) => (
                                <span key={item.id} className="bento-summary-chip" title={`${item.name} • ${formatCurrencyINR(item.approximateValue || 0)}`}>
                                  {item.name.length > 18 ? `${item.name.slice(0, 18)}…` : item.name}
                                  <strong>({formatCurrencyINR(item.approximateValue || 0)})</strong>
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center", padding: "1rem", color: "#49585F" }}>
                          No categories or assets listed yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("assets")}>
              View All Items ({assets.length})
            </button>
            <Link href={getUrlForStep(4)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 4 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 3: YOUR FAMILY (1 COLUMN WIDTH & SCROLLABLE IN MODAL) ── */}
        <div className="bento-card bento-card-family">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <Users size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Your Family</h3>
                <span className="bento-card-subtitle">{family.length} Family Members</span>
              </div>
            </div>
            {hasMinors && (
              <span className="bento-pill bento-pill-amber" title="Children under 18 need a guardian appointed">
                <AlertTriangle size={11} /> {minorChildren.length} Minor
              </span>
            )}
          </div>

          <div className="bento-card-body" style={{ gap: "0.35rem", overflow: "hidden" }}>
            {/* 1-Column List of Family Members with In-Box Scrolling */}
            <div className="bento-family-1col-list">
              {family.length > 0 ? (
                family.map((member) => (
                  <div key={member.id} className="bento-family-row">
                    <div className="bento-family-row-left">
                      <div className="bento-mini-avatar" style={{ flexShrink: 0 }}>
                        {member.relationship === "spouse" ? (
                          <Heart size={12} color="#C65378" />
                        ) : member.isMinor ? (
                          <Baby size={12} color="#C9A227" />
                        ) : (
                          <User size={12} color="#5F7E75" />
                        )}
                      </div>
                      <div className="bento-family-row-meta">
                        <span className="bento-family-row-name" title={member.name}>
                          {member.name}
                        </span>
                        <span className="bento-family-row-role">
                          {member.customRelationship || member.relationship}
                        </span>
                      </div>
                    </div>
                    {member.isMinor && (
                      <span className="bento-pill bento-pill-amber" style={{ fontSize: "0.55rem", padding: "0.08rem 0.35rem" }}>
                        Under 18
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "0.76rem", color: "#49585F", padding: "0.5rem" }}>
                  No family members added yet.
                </div>
              )}
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("family")}>
              Family Tree & List
            </button>
            <Link href={getUrlForStep(3)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 3 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 4: WILL PROGRESS (UTILIZING 1 COLUMN SPACE) ─── */}
        <div className="bento-card bento-card-gauge">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <ShieldCheck size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Will Progress</h3>
                <span className="bento-card-subtitle">{completedSections} of {totalSections} Steps Done</span>
              </div>
            </div>
            <span className="bento-pill bento-pill-gold">Step {nextStepNum}</span>
          </div>

          <div className="bento-card-body" style={{ gap: "0.5rem", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.6rem" }}>
              <SemiCircleGauge percent={progressPercent} />
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <strong style={{ fontSize: "0.82rem", color: "#172228", display: "block" }}>
                  {progressPercent === 100 ? "Ready to Finalize" : "Draft in Progress"}
                </strong>
                <span style={{ fontSize: "0.68rem", color: "#49585F", display: "block", marginTop: "0.15rem", lineHeight: 1.35 }}>
                  {progressPercent === 100
                    ? "All required steps complete. Ready for download & signing."
                    : `${totalSections - completedSections} more section(s) remaining.`}
                </span>
              </div>
            </div>

            {/* Clean Next Recommended Action Block */}
            <div
              style={{
                backgroundColor: "#FAF7F0",
                borderRadius: "10px",
                padding: "0.45rem 0.65rem",
                border: "1px solid rgba(23, 34, 40, 0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: "0.58rem", color: "#7A8B94", display: "block", fontWeight: 600, textTransform: "uppercase" }}>
                  Next Action
                </span>
                <span style={{ fontSize: "0.72rem", color: "#172228", fontWeight: 700, display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  Step {nextStepNum}: {sections.find((s) => s.stepNum === nextStepNum)?.label || "Continue Draft"}
                </span>
              </div>
              <span className="bento-pill bento-pill-blue" style={{ fontSize: "0.58rem" }}>
                Pending
              </span>
            </div>
          </div>

          <div className="bento-card-footer" style={{ gap: "0.4rem" }}>
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("readiness")}>
              Checklist
            </button>
            <Link href={nextStepUrl} className="bento-btn-primary">
              Continue <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── CARD 5: WHO GETS WHAT (SHARING YOUR WEALTH) ─────── */}
        <div className="bento-card bento-card-allocations">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                <Scale size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Who Gets What</h3>
                <span className="bento-card-subtitle">{beneficiaryNames.length} Beneficiaries Named</span>
              </div>
            </div>
            <span
              className={`bento-pill ${
                unallocatedAssets.length === 0 ? "bento-pill-green" : "bento-pill-amber"
              }`}
            >
              {unallocatedAssets.length === 0 ? "100% Divided" : `${unallocatedAssets.length} Unallocated`}
            </span>
          </div>

          <div className="bento-card-body" style={{ gap: "0.35rem", overflow: "hidden" }}>
            <div className="bento-allocations-list">
              {assets.map((asset) => {
                const assetAllocs = allocations.filter((a) => a.assetId === asset.id);
                const totalPct = assetAllocs.reduce((s, a) => s + (a.percentage || 0), 0);
                const isComplete = totalPct >= 99.5 && totalPct <= 100.5;

                return (
                  <div key={asset.id} className="bento-alloc-row">
                    <div className="bento-alloc-left">
                      <span className="bento-alloc-name">{asset.name}</span>
                      <span className="bento-alloc-shares">
                        {assetAllocs.length > 0
                          ? assetAllocs.map((a) => `${a.beneficiaryName.split(" ")[0]} (${a.percentage}%)`).join(", ")
                          : "Not divided yet"}
                      </span>
                    </div>
                    <span className={`bento-pct-badge ${isComplete ? "complete" : "warning"}`}>
                      {Math.round(totalPct)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("allocations")}>
              Allocations ({allocations.length})
            </button>
            <Link href={getUrlForStep(5)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 5 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 6: PEOPLE YOU TRUST (MANAGER & GUARDIAN) ───── */}
        <div className="bento-card bento-card-appointments">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(201, 162, 39, 0.12)", color: "#9E7408" }}>
                <Briefcase size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">People You Trust</h3>
                <span className="bento-card-subtitle">Will Manager & Guardian</span>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
            <div className="bento-appointment-blocks">
              {/* Column 1: Will Manager (Primary + Alternate) */}
              <div className="bento-appoint-item">
                <div className="bento-appoint-top">
                  <span className="bento-appoint-role" style={{ color: "#5F7E75" }}>
                    👔 Will Manager
                  </span>
                </div>
                <div style={{ margin: "0.2rem 0" }}>
                  <strong className="bento-appoint-name" title={state.executorPrimary?.name || "Pending appointment"}>
                    {state.executorPrimary?.name || "Not Chosen Yet"}
                  </strong>
                  <span className="bento-appoint-rel">
                    {state.executorPrimary?.relationship ? `${state.executorPrimary.relationship} • Executes Will` : "Executes your Will"}
                  </span>
                </div>
                <div className="bento-appoint-extra" title={state.executorAlternate?.name ? `Backup: ${state.executorAlternate.name}` : "No backup chosen"}>
                  {state.executorAlternate?.name ? (
                    <span>Backup: <strong>{state.executorAlternate.name}</strong></span>
                  ) : (
                    <span style={{ color: "#7A8B94" }}>Backup: None</span>
                  )}
                </div>
              </div>

              {/* Column 2: Guardian for Minor Children */}
              <div className="bento-appoint-item">
                <div className="bento-appoint-top">
                  <span className="bento-appoint-role" style={{ color: hasMinors ? "#C9A227" : "#49585F" }}>
                    👶 Child Guardian
                  </span>
                  {hasMinors && !state.guardianPrimary?.name && (
                    <span className="bento-pill bento-pill-amber" style={{ fontSize: "0.52rem", padding: "0.06rem 0.28rem" }}>
                      Needed
                    </span>
                  )}
                </div>
                <div style={{ margin: "0.2rem 0" }}>
                  <strong className="bento-appoint-name" title={state.guardianPrimary?.name || "Guardian"}>
                    {state.guardianPrimary?.name || (hasMinors ? "Choose Guardian" : "Not Needed")}
                  </strong>
                  <span className="bento-appoint-rel">
                    {state.guardianPrimary?.relationship || (hasMinors ? "For children under 18" : "No minors")}
                  </span>
                </div>
                <div className="bento-appoint-extra">
                  {hasMinors ? (
                    <span style={{ color: "#9E7408", fontWeight: 600 }}>Cares for {minorChildren.length} minor child(ren)</span>
                  ) : (
                    <span style={{ color: "#7A8B94" }}>All children adults</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("appointments")}>
              View Details
            </button>
            <Link href={getUrlForStep(6)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 6 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 7: SPECIAL WISHES & NOTES ─────────────────── */}
        <div className="bento-card bento-card-wishes">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <ScrollText size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Special Wishes & Notes</h3>
                <span className="bento-card-subtitle">Personal Instructions</span>
              </div>
            </div>
          </div>

          <div className="bento-card-body">
            <div className="bento-directives-rich-grid">
              {/* Box 1: Funeral & Ceremonies */}
              <div className="bento-directive-rich-card">
                <span className="bento-directive-title" style={{ display: "block", marginBottom: "0.15rem" }}>
                  ⚱️ Last Rites
                </span>
                <p className="bento-directive-desc">
                  {state.specialWishes?.funeralCeremonyWishes || "Customary rituals as per traditions."}
                </p>
              </div>

              {/* Box 2: Digital Accounts */}
              <div className="bento-directive-rich-card">
                <span className="bento-directive-title" style={{ display: "block", marginBottom: "0.15rem" }}>
                  💻 Digital Accounts
                </span>
                <p className="bento-directive-desc">
                  {state.specialWishes?.digitalAccounts || "Executor authorized to close accounts."}
                </p>
              </div>

              {/* Box 3: Jewellery & Heirlooms */}
              <div className="bento-directive-rich-card">
                <span className="bento-directive-title" style={{ display: "block", marginBottom: "0.15rem" }}>
                  💍 Jewellery
                </span>
                <p className="bento-directive-desc">
                  {state.specialWishes?.jewelleryInstructions || "Shared peacefully among family."}
                </p>
              </div>

              {/* Box 4: Pet Care & Family Note */}
              <div className="bento-directive-rich-card">
                <span className="bento-directive-title" style={{ display: "block", marginBottom: "0.15rem" }}>
                  🐾 Notes & Pets
                </span>
                <p className="bento-directive-desc">
                  {state.specialWishes?.petsCare || state.specialWishes?.personalMessageToFamily || "Personal instructions & family harmony."}
                </p>
              </div>
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("wishes")}>
              All Wishes
            </button>
            <Link href={getUrlForStep(8)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 8 ↗
            </Link>
          </div>
        </div>

        {/* ── CARD 8: WHY YOU MADE THIS WILL ──────────────────── */}
        <div className="bento-card bento-card-emotional">
          <div className="bento-card-header">
            <div className="bento-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <HeartHandshake size={15} />
              </span>
              <div>
                <h3 className="bento-card-title">Why You Made This Will</h3>
                <span className="bento-card-subtitle">Personal Declaration</span>
              </div>
            </div>
          </div>

          <div className="bento-card-body" style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <div className="bento-quote-box" style={{ margin: 0, padding: "0.6rem 0.8rem" }}>
              <p className="bento-quote-text" style={{ WebkitLineClamp: 4, fontStyle: "italic", lineHeight: 1.45, fontSize: "0.76rem" }}>
                "{state.emotionalReason || "To ensure my loved ones are provided for smoothly and to prevent any future confusion or disagreements among family members."}"
              </p>
            </div>
          </div>

          <div className="bento-card-footer">
            <button type="button" className="bento-btn-secondary" onClick={() => setActiveModal("emotional")}>
              Read Statement
            </button>
            <Link href={getUrlForStep(9)} className="bento-btn-edit">
              <Edit3 size={11} /> Step 9 ↗
            </Link>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          POPUP MODALS (Detailed Views with Step Redirection)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeModal && (
        <div className="bento-modal-overlay" onClick={closeModal}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* 1. ABOUT YOU (WILL CREATOR) MODAL */}
            {activeModal === "testator" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                      <User size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">About You (Will Creator)</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">Your personal details and background information • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(2)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 2 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-grid-2">
                    <div className="bento-data-row">
                      <span className="bento-data-label">Your Full Legal Name:</span>
                      <strong className="bento-data-val">{state.testator.fullName || "-"}</strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Parent's Name:</span>
                      <strong className="bento-data-val">{state.testator.fatherOrMotherName || "-"}</strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Family / Succession Law:</span>
                      <strong className="bento-data-val">
                        {personalLawFormatted}
                      </strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Marital Status:</span>
                      <strong className="bento-data-val" style={{ textTransform: "capitalize" }}>
                        {state.testator.maritalStatus || "-"}
                      </strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Date of Birth:</span>
                      <strong className="bento-data-val">
                        {testatorDobFormatted || state.testator.dob || "-"}{testatorAge ? ` (Age ${testatorAge})` : ""}
                      </strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Citizenship:</span>
                      <strong className="bento-data-val">{state.testator.citizenship || "Indian Citizen"}</strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Gender:</span>
                      <strong className="bento-data-val" style={{ textTransform: "capitalize" }}>
                        {state.testator.gender || "-"}
                      </strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Official Email:</span>
                      <strong className="bento-data-val">{state.testator.email || "-"}</strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">PAN Card Number:</span>
                      <strong className="bento-data-val" style={{ fontFamily: "monospace" }}>{state.testator.pan || "-"}</strong>
                    </div>
                    <div className="bento-data-row">
                      <span className="bento-data-label">Aadhaar Identification:</span>
                      <strong className="bento-data-val">{state.testator.aadhaar || "-"}</strong>
                    </div>
                    <div className="bento-data-row" style={{ gridColumn: "span 2" }}>
                      <span className="bento-data-label">Occupation / Work:</span>
                      <strong className="bento-data-val">{state.testator.workplace || "-"}</strong>
                    </div>
                    <div className="bento-data-row" style={{ gridColumn: "span 2" }}>
                      <span className="bento-data-label">Home Address:</span>
                      <strong className="bento-data-val">
                        {state.testator.address || "-"}, {state.testator.city} {state.testator.state} -{" "}
                        {state.testator.pincode}
                      </strong>
                    </div>
                    <div className="bento-data-row" style={{ gridColumn: "span 2" }}>
                      <span className="bento-data-label">Previous Will Status:</span>
                      <strong className="bento-data-val">
                        {state.testator.hasPreviousWill
                          ? "You had an earlier Will - this new Will officially cancels and replaces it."
                          : "No earlier Will. This is your first official Will."}
                      </strong>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 2. PROPERTIES & WEALTH MODAL */}
            {activeModal === "assets" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                      <Landmark size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Properties & Wealth List</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">
                        {assets.length} items listed • Total Estimated Value: {formatCurrencyINR(totalAssetValue)} • Scroll for full details ↕
                      </p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(4)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 4 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-list">
                    {assets.length > 0 ? (
                      assets.map((asset) => {
                        const meta = CATEGORY_META[asset.category] || CATEGORY_META.other;
                        const assetAllocs = allocations.filter((a) => a.assetId === asset.id);
                        const totalPct = assetAllocs.reduce((s, a) => s + (a.percentage || 0), 0);

                        return (
                          <div key={asset.id} className="bento-modal-card-item">
                            <div className="bento-modal-card-top">
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span className="bento-icon-badge" style={{ backgroundColor: meta.bg, color: meta.color }}>
                                  {meta.icon}
                                </span>
                                <div>
                                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#172228" }}>
                                    {asset.name}
                                  </h4>
                                  <span style={{ fontSize: "0.75rem", color: "#49585F" }}>
                                    {meta.label} • {asset.ownership === "joint" ? `Shared (${asset.ownershipPercentage || 50}%)` : "Sole Owner (100%)"}
                                  </span>
                                </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <strong style={{ fontSize: "1rem", color: "#172228" }}>
                                  {formatCurrencyINR(asset.approximateValue || 0)}
                                </strong>
                                <div style={{ fontSize: "0.72rem", color: totalPct === 100 ? "#5F7E75" : "#C9A227", fontWeight: 600 }}>
                                  {totalPct}% Divided
                                </div>
                              </div>
                            </div>
                            <div className="bento-modal-card-details">
                              {asset.identifier && (
                                <div>
                                  <span className="bento-data-label">Account / Reg No:</span> {asset.identifier}
                                </div>
                              )}
                              {asset.addressOrInstitution && (
                                <div>
                                  <span className="bento-data-label">Bank Name / Address:</span> {asset.addressOrInstitution}
                                </div>
                              )}
                              {asset.hasLoan && (
                                <div style={{ color: "#C65378" }}>
                                  <span className="bento-data-label">Active Loan:</span> {asset.loanDetails || "Active loan against this asset"}
                                </div>
                              )}
                              {asset.specialInstructions && (
                                <div>
                                  <span className="bento-data-label">Special Notes:</span> {asset.specialInstructions}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ textAlign: "center", color: "#49585F" }}>No properties or assets listed yet.</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 3. YOUR FAMILY MODAL */}
            {activeModal === "family" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                      <Users size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Your Family Members</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">{family.length} family members listed • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <div className="bento-tab-switch">
                      <button
                        type="button"
                        className={`bento-tab-btn ${familyTab === "list" ? "active" : ""}`}
                        onClick={() => setFamilyTab("list")}
                      >
                        List View
                      </button>
                      <button
                        type="button"
                        className={`bento-tab-btn ${familyTab === "tree" ? "active" : ""}`}
                        onClick={() => setFamilyTab("tree")}
                      >
                        Family Tree
                      </button>
                    </div>
                    <Link href={getUrlForStep(3)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 3 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  {familyTab === "list" ? (
                    <div className="bento-modal-list">
                      {family.length > 0 ? (
                        family.map((member) => (
                          <div key={member.id} className="bento-modal-card-item">
                            <div className="bento-modal-card-top">
                              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <div className="bento-avatar" style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}>
                                  {member.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#172228" }}>
                                    {member.name}
                                  </h4>
                                  <span style={{ fontSize: "0.75rem", color: "#49585F", textTransform: "capitalize" }}>
                                    {member.customRelationship || member.relationship}
                                    {member.isMinor ? " • Under 18" : ""}
                                  </span>
                                </div>
                              </div>
                              {member.isMinor && (
                                <span className="bento-pill bento-pill-amber">Child Under 18</span>
                              )}
                            </div>
                            <div className="bento-modal-card-details">
                              {member.dob && (
                                <div>
                                  <span className="bento-data-label">Date of Birth:</span> {formatDDMMYYYY(member.dob)}
                                </div>
                              )}
                              {member.pan && (
                                <div>
                                  <span className="bento-data-label">PAN Card:</span> {member.pan}
                                </div>
                              )}
                              {member.phone && (
                                <div>
                                  <span className="bento-data-label">Phone:</span> {member.phone}
                                </div>
                              )}
                              {member.email && (
                                <div>
                                  <span className="bento-data-label">Email:</span> {member.email}
                                </div>
                              )}
                              {member.address && (
                                <div>
                                  <span className="bento-data-label">Home Address:</span> {member.address}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ textAlign: "center", color: "#49585F" }}>No family members added yet.</p>
                      )}
                    </div>
                  ) : (
                    <div style={{ height: "420px", overflow: "hidden", borderRadius: "14px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                      <FamilyTreeCanvas state={state} onStateChange={onStateChange} />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 4. WHO GETS WHAT (ALLOCATIONS) MODAL */}
            {activeModal === "allocations" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                      <Scale size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Who Gets What (Dividing Your Wealth)</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">How each property and asset is shared among your family • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(5)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 5 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-list">
                    {assets.map((asset) => {
                      const assetAllocs = allocations.filter((a) => a.assetId === asset.id);
                      const totalPct = assetAllocs.reduce((s, a) => s + (a.percentage || 0), 0);
                      const isComplete = totalPct >= 99.5 && totalPct <= 100.5;

                      return (
                        <div key={asset.id} className="bento-modal-card-item">
                          <div className="bento-modal-card-top">
                            <div>
                              <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#172228" }}>
                                {asset.name}
                              </h4>
                              <span style={{ fontSize: "0.75rem", color: "#49585F" }}>
                                Estimated Value: {formatCurrencyINR(asset.approximateValue || 0)}
                              </span>
                            </div>
                            <span className={`bento-pill ${isComplete ? "bento-pill-green" : "bento-pill-amber"}`}>
                              {totalPct}% Divided
                            </span>
                          </div>

                          <div style={{ marginTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            {assetAllocs.map((al) => (
                              <div
                                key={al.id}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0.4rem 0.6rem",
                                  backgroundColor: "#FAF7F0",
                                  borderRadius: "8px",
                                }}
                              >
                                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#172228" }}>
                                  {al.beneficiaryName}
                                </span>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                  <div style={{ width: "90px", height: "5px", backgroundColor: "rgba(23, 34, 40, 0.08)", borderRadius: "999px", overflow: "hidden" }}>
                                    <div style={{ width: `${al.percentage}%`, height: "100%", backgroundColor: "#5F7E75" }} />
                                  </div>
                                  <strong style={{ fontSize: "0.82rem", color: "#172228", minWidth: "35px", textAlign: "right" }}>
                                    {al.percentage}%
                                  </strong>
                                </div>
                              </div>
                            ))}
                            {assetAllocs.length === 0 && (
                              <div style={{ fontSize: "0.78rem", color: "#C65378", fontStyle: "italic" }}>
                                ⚠️ You have not chosen who receives this asset yet.
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* 5. PEOPLE YOU TRUST (APPOINTMENTS) MODAL */}
            {activeModal === "appointments" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(201, 162, 39, 0.12)", color: "#9E7408" }}>
                      <Briefcase size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">People You Trust (Manager & Guardian)</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">The trusted people who will carry out your Will and care for your family • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(6)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit Manager (Step 6) ↗
                    </Link>
                    <Link href={getUrlForStep(7)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit Guardian (Step 7) ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-grid-2">
                    <div className="bento-modal-card-item">
                      <span className="bento-data-label">Will Manager (Primary Executor):</span>
                      <strong style={{ fontSize: "1.05rem", color: "#172228", display: "block", marginTop: "0.2rem" }}>
                        {state.executorPrimary?.name || "Not Chosen Yet ⚠️"}
                      </strong>
                      <p style={{ fontSize: "0.78rem", color: "#49585F", margin: "0.2rem 0 0" }}>
                        Relationship: {state.executorPrimary?.relationship || "-"}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#49585F", margin: "0.4rem 0 0" }}>
                        The person responsible for carrying out your Will, settling any pending dues, and distributing assets to your loved ones.
                      </p>
                    </div>

                    <div className="bento-modal-card-item">
                      <span className="bento-data-label">Backup Will Manager (Alternate):</span>
                      <strong style={{ fontSize: "1.05rem", color: "#172228", display: "block", marginTop: "0.2rem" }}>
                        {state.executorAlternate?.name || "None Chosen"}
                      </strong>
                      <p style={{ fontSize: "0.78rem", color: "#49585F", margin: "0.2rem 0 0" }}>
                        Relationship: {state.executorAlternate?.relationship || "-"}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#49585F", margin: "0.4rem 0 0" }}>
                        Steps in to manage your Will if your primary manager is unable or unavailable.
                      </p>
                    </div>

                    <div className="bento-modal-card-item" style={{ gridColumn: "span 2" }}>
                      <span className="bento-data-label">Guardian for Children Under 18:</span>
                      <strong style={{ fontSize: "1.05rem", color: "#172228", display: "block", marginTop: "0.2rem" }}>
                        {state.guardianPrimary?.name || (hasMinors ? "Appointment Required for Minor Children ⚠️" : "Not Required (No children under 18)")}
                      </strong>
                      <p style={{ fontSize: "0.78rem", color: "#49585F", margin: "0.2rem 0 0" }}>
                        Relationship: {state.guardianPrimary?.relationship || "-"}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#49585F", margin: "0.4rem 0 0" }}>
                        Will have legal custody and take loving care of your children until they turn 18.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 6. SPECIAL WISHES MODAL */}
            {activeModal === "wishes" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                      <ScrollText size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Special Wishes & Personal Notes</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">Important personal instructions beyond financial assets • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(8)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 8 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-list">
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>⚱️ Last Rites & Funeral Instructions</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
                        {state.specialWishes?.funeralCeremonyWishes || "Perform customary rituals according to family traditions."}
                      </p>
                    </div>
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>💻 Email, Online Accounts & Social Media</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
                        {state.specialWishes?.digitalAccounts || "Your Will Manager is authorized to access, back up, or close your email and online accounts."}
                      </p>
                    </div>
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>💍 Family Jewellery & Precious Belongings</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
                        {state.specialWishes?.jewelleryInstructions || "To be shared among family members peacefully and fairly."}
                      </p>
                    </div>
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>🐾 Care for Pets</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
                        {state.specialWishes?.petsCare || "No special pet instructions provided."}
                      </p>
                    </div>
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>🏛️ Charity & Good Causes</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0" }}>
                        {state.specialWishes?.charitableGifts || "No donation to charity (all assets go to family)."}
                      </p>
                    </div>
                    <div className="bento-modal-card-item">
                      <strong style={{ color: "#172228", fontSize: "0.9rem" }}>💌 Personal Note to Family</strong>
                      <p style={{ fontSize: "0.82rem", color: "#49585F", margin: "0.3rem 0 0", fontStyle: "italic" }}>
                        "{state.specialWishes?.personalMessageToFamily || "Live in peace, respect each other, and maintain family harmony."}"
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 7. WHY YOU MADE THIS WILL MODAL */}
            {activeModal === "emotional" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                      <HeartHandshake size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Why You Made This Will</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">Explaining your intentions clearly helps avoid family disagreements • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <Link href={getUrlForStep(9)} className="bento-modal-btn-redirect">
                      <Edit3 size={13} /> Edit in Step 9 ↗
                    </Link>
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div
                    style={{
                      padding: "1.25rem",
                      backgroundColor: "#FAF7F0",
                      borderRadius: "14px",
                      borderLeft: "4px solid #C65378",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      color: "#172228",
                      fontStyle: "italic",
                    }}
                  >
                    "{state.emotionalReason || "I make this Will of my own free choice, in good health and sound mind, to ensure my family is protected and all my assets are shared peacefully without any confusion or disputes."}"
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#49585F", marginTop: "1rem" }}>
                    Explaining clearly why you made this Will and that you did so with a calm, sound mind ensures courts and authorities easily uphold your true wishes without any family dispute.
                  </p>
                </div>
              </>
            )}

            {/* 8. WILL PROGRESS CHECKLIST MODAL */}
            {activeModal === "readiness" && (
              <>
                <div className="bento-modal-header">
                  <div className="bento-modal-title-group">
                    <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                      <ShieldCheck size={18} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <h2 className="bento-modal-title">Your 14-Step Will Progress Checklist</h2>
                        <span className="bento-modal-scroll-pill">
                          <ArrowUpDown size={10} /> Scrollable Window
                        </span>
                      </div>
                      <p className="bento-modal-sub">{completedSections} of {totalSections} main sections completed • Scroll for full details ↕</p>
                    </div>
                  </div>
                  <div className="bento-modal-actions">
                    <button type="button" className="bento-modal-close" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="bento-modal-body">
                  <div className="bento-modal-list">
                    {QUESTIONNAIRE_STEPS.slice(1).map((s) => {
                      const sec = sections.find((x) => x.stepNum === s.step);
                      const isComplete = sec ? sec.status === "complete" : s.step < nextStepNum;

                      return (
                        <Link
                          key={s.step}
                          href={s.path}
                          className="bento-checklist-row"
                          onClick={closeModal}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <span className={`bento-step-num-circle ${isComplete ? "complete" : ""}`}>
                              {isComplete ? "✓" : s.displayNum}
                            </span>
                            <div>
                              <strong style={{ fontSize: "0.88rem", color: "#172228" }}>{s.title}</strong>
                              <span style={{ fontSize: "0.72rem", color: "#49585F", display: "block" }}>
                                {s.hindiTitle}
                              </span>
                            </div>
                          </div>
                          <span className={`bento-pill ${isComplete ? "bento-pill-green" : "bento-pill-blue"}`}>
                            {isComplete ? "Completed ✓" : "Continue Step →"}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Bottom Scroll Helper Bar across ALL modal boxes */}
            <div className="bento-modal-scroll-footer">
              <ArrowUpDown size={12} color="#C65378" />
              <span>Scroll up / down to explore full section details</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
