"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { WillDraftingState, Asset, AssetCategory } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import CloudSyncBadge from "@/components/wizard/CloudSyncBadge";
import WillPreviewModal from "@/components/dashboard/WillPreviewModal";
import {
  Building2,
  TrendingUp,
  Landmark,
  Gem,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  FileText,
  ArrowRight,
  Download,
  Eye,
  LogOut,
} from "lucide-react";

interface StartAssetWealthDashboardProps {
  state?: WillDraftingState;
  lang?: "en" | "hi";
  onJumpToStep?: (step: number) => void;
  onStateChange?: (newState: WillDraftingState) => void;
}

// Indian Currency Formatter (Crores & Lakhs)
function formatIndianCurrency(num: number): string {
  if (!num || isNaN(num)) return "₹0";
  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹${cr >= 100 ? cr.toFixed(1) : cr.toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    const lk = num / 100000;
    return `₹${lk >= 100 ? lk.toFixed(1) : lk.toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

function formatFullINR(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

interface CategoryGroup {
  id: string;
  name: string;
  hindiName: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  matchCategories: AssetCategory[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "real_estate",
    name: "Real Estate & Properties",
    hindiName: "अचल संपत्ति एवं भूमि",
    icon: <Building2 size={16} />,
    color: "#172228",
    bgColor: "rgba(23, 34, 40, 0.05)",
    borderColor: "rgba(23, 34, 40, 0.12)",
    matchCategories: ["property"],
  },
  {
    id: "financial",
    name: "Financial Securities & Stocks",
    hindiName: "शेयर, म्यूचुअल फंड व प्रतिभूतियां",
    icon: <TrendingUp size={16} />,
    color: "#C65378",
    bgColor: "rgba(198, 83, 120, 0.08)",
    borderColor: "rgba(198, 83, 120, 0.2)",
    matchCategories: ["investments", "shares", "mutual_funds"],
  },
  {
    id: "bank",
    name: "Bank Accounts & FDs",
    hindiName: "बैंक खाते व सावधि जमा",
    icon: <Landmark size={16} />,
    color: "#5F7E75",
    bgColor: "rgba(95, 126, 117, 0.08)",
    borderColor: "rgba(95, 126, 117, 0.2)",
    matchCategories: ["bank_account"],
  },
  {
    id: "jewellery",
    name: "Gold, Jewellery & Valuables",
    hindiName: "सोना, आभूषण व मूल्यवान वस्तुएं",
    icon: <Gem size={16} />,
    color: "#C9A227",
    bgColor: "rgba(201, 162, 39, 0.08)",
    borderColor: "rgba(201, 162, 39, 0.2)",
    matchCategories: ["jewellery"],
  },
  {
    id: "other",
    name: "Business & Movable Assets",
    hindiName: "व्यापारिक व अन्य चल संपत्तियां",
    icon: <Briefcase size={16} />,
    color: "#49585F",
    bgColor: "rgba(73, 88, 95, 0.08)",
    borderColor: "rgba(73, 88, 95, 0.2)",
    matchCategories: ["business", "vehicles", "insurance", "digital", "other"],
  },
];

export default function StartAssetWealthDashboard({
  state: propState,
  lang = "en",
  onJumpToStep,
}: StartAssetWealthDashboardProps) {
  const storeState = useWillStore((s) => s.state);
  const state = propState || storeState;
  const router = useRouter();
  const { data: session, update } = useSession();
  const isHi = lang === "hi";

  const [assetInventoryOpen, setAssetInventoryOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [dbPaid, setDbPaid] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const checkLivePaymentStatus = async () => {
      try {
        const res = await fetch("/api/payment/user-status", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (data.paymentStatus === "paid" && isMounted) {
          setDbPaid(true);
          if (session?.user?.paymentStatus !== "paid") {
            await update();
          }
        }
      } catch {
        // ignore
      }
    };
    checkLivePaymentStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  // Status Detection
  const isPaid =
    dbPaid ||
    session?.user?.paymentStatus === "paid" ||
    state.willStatus === "finalised" ||
    state.willStatus === "approved";

  const isReviewed = Boolean(
    state.isReviewed ||
      state.willStatus === "approved" ||
      (typeof window !== "undefined" &&
        localStorage.getItem("willdrafting_review_completed") === "true")
  );

  const isAllDetailsSubmitted = Boolean(
    state.testator?.fullName &&
      state.familyMembers &&
      state.familyMembers.length > 0 &&
      state.assets &&
      state.assets.length > 0 &&
      (state.allocations?.length > 0 ||
        (state as unknown as { assetAllocations?: unknown[] }).assetAllocations?.length) &&
      state.executorPrimary?.name
  );

  // Calculate Net Worth
  const assets: Asset[] = state.assets || [];
  const totalNetWorth = assets.reduce(
    (sum, a) => sum + (Number(a.approximateValue) || 0),
    0
  );

  // Compute values per category
  const categoryStats = CATEGORY_GROUPS.map((group) => {
    const matching = assets.filter((a) =>
      group.matchCategories.includes(a.category)
    );
    const value = matching.reduce(
      (sum, a) => sum + (Number(a.approximateValue) || 0),
      0
    );
    const count = matching.length;
    const percentage =
      totalNetWorth > 0 ? ((value / totalNetWorth) * 100).toFixed(1) : "0.0";

    return {
      ...group,
      count,
      value,
      percentage: Number(percentage),
      items: matching,
    };
  }).filter((cat) => cat.count > 0 || cat.id === "real_estate" || cat.id === "financial");

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const testatorName = state.testator?.fullName?.trim() || session?.user?.name?.trim() || "[Testator Full Name]";
  const testatorCity = state.testator?.city
    ? `${state.testator.city}${state.testator.state ? `, ${state.testator.state}` : ""}`
    : state.testator?.state || "[Residential Address]";
  const executorName = state.executorPrimary?.name?.trim() || "[Primary Executor]";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: "0.2rem 0.4rem 2rem",
      }}
    >
      {/* =========================================================================
          TOP USER STATUS & LOGOUT BAR
          ========================================================================= */}
      <div
        className="dash-user-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          padding: "0.75rem 1.15rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          boxShadow: "0 2px 8px rgba(23, 34, 40, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "var(--color-navy)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {(session?.user?.name || state.testator.fullName || "User")
              .split(" ")
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join("")
              .toUpperCase() || "U"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="dash-user-title-row" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#172228" }}>
                {session?.user?.name || state.testator.fullName || (isHi ? "खाता" : "Account")}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                  backgroundColor: isPaid ? "rgba(95, 126, 117, 0.12)" : "rgba(198, 83, 120, 0.1)",
                  color: isPaid ? "#5F7E75" : "#C65378",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {isPaid ? (isHi ? "✓ योजना सक्रिय" : "✓ Plan Active") : (isHi ? "🔒 भुगतान अपेक्षित" : "🔒 Plan Pending")}
              </span>
            </div>
            <span style={{ fontSize: "0.74rem", color: "#55636D", display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>
              {session?.user?.email || state.testator.email || (session?.user ? "Logged In" : "Guest Mode")}
            </span>
          </div>
        </div>

        <div className="dash-user-actions" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <CloudSyncBadge lang={isHi ? "hi" : "en"} />
          {(isPaid || isAllDetailsSubmitted) && (
          <button
            type="button"
            onClick={() => onJumpToStep ? onJumpToStep(14) : navigateTo("/start/13")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.9rem",
              borderRadius: "8px",
              backgroundColor: "var(--color-navy)",
              color: "#FFFFFF",
              fontSize: "0.78rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <FileText size={13} style={{ flexShrink: 0 }} />
            <span>{isHi ? "अंतिम वसीयत देखें" : "View Final Will"}</span>
          </button>
          )}

          {session?.user ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out of your account"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                color: "#DC2626",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)")}
            >
              <LogOut size={13} style={{ flexShrink: 0 }} />
              <span>{isHi ? "लॉगआउट" : "Logout"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                border: "1px solid rgba(23, 34, 40, 0.2)",
                backgroundColor: "#FFFFFF",
                color: "#172228",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <span>{isHi ? "लॉगिन करें" : "Login"}</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          HERO CARD: TOTAL ASSET WEALTH & NET WORTH VALUATION
          (Only Portfolio is visible when unpaid)
          Scaled down by 20% for 80% viewport density
          ========================================================================= */}
      <div
        className="dash-hero-card"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "1.3rem 1.5rem",
          boxShadow: "0 3px 16px -2px rgba(23, 34, 40, 0.04), 0 2px 5px -1px rgba(23, 34, 40, 0.02)",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C65378" }}>
                {isHi ? "एस्टेट वेल्थ पोर्टफोलियो" : "Estate Wealth Portfolio"}
              </span>
              <span style={{ fontSize: "0.62rem", color: "rgba(23, 34, 40, 0.2)" }}>•</span>
              <span style={{ fontSize: "0.62rem", color: "#49585F", fontWeight: 500 }}>
                {isHi ? "अनुसूची ए इन्वेंटरी" : "Schedule A Asset Inventory"}
              </span>
            </div>
            <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#172228", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {formatIndianCurrency(totalNetWorth)}
            </h1>
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.68rem", color: "#49585F" }}>
              {isHi
                ? `कुल संपत्ति मूल्य: ${formatFullINR(totalNetWorth)} (${assets.length} पंजीकृत संपत्तियां)`
                : `Total Declared Value: ${formatFullINR(totalNetWorth)} across ${assets.length} registered asset holdings`}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
            <div
              style={{
                padding: "0.35rem 0.7rem",
                borderRadius: "6px",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.08)",
                fontSize: "0.64rem",
                color: "#172228",
                fontWeight: 600,
              }}
            >
              🏢 {assets.filter((a) => a.category === "property").length} {isHi ? "अचल संपत्तियां" : "Properties"}
            </div>
            <div
              style={{
                padding: "0.35rem 0.7rem",
                borderRadius: "6px",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.08)",
                fontSize: "0.64rem",
                color: "#172228",
                fontWeight: 600,
              }}
            >
              📈 {assets.filter((a) => ["investments", "shares", "mutual_funds"].includes(a.category)).length} {isHi ? "सिक्योरिटीज / निवेश" : "Securities"}
            </div>
          </div>
        </div>

        {/* Proportional Multi-colored Allocation Bar */}
        {totalNetWorth > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "999px",
                overflow: "hidden",
                display: "flex",
                backgroundColor: "rgba(23, 34, 40, 0.06)",
              }}
            >
              {categoryStats.map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    width: `${cat.percentage}%`,
                    height: "100%",
                    backgroundColor: cat.color,
                    transition: "width 0.4s ease",
                  }}
                  title={`${cat.name}: ${cat.percentage}% (${formatIndianCurrency(cat.value)})`}
                />
              ))}
            </div>

            {/* Legend underneath bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.62rem", color: "#49585F", paddingTop: "0.15rem" }}>
              {categoryStats.map((cat) => (
                <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: cat.color }} />
                  <span style={{ fontWeight: 700, color: "#172228" }}>{cat.percentage}%</span>
                  <span>{isHi ? cat.hindiName : cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          CATEGORY BREAKDOWN CARDS (Scaled down by 20%)
          ========================================================================= */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem" }}>
          <div style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#172228" }}>
            {isHi ? "परिसंपत्ति वर्ग विभाजन" : "Asset Class Breakdown"}
          </div>
          <span style={{ fontSize: "0.64rem", color: "#49585F" }}>
            {categoryStats.length} {isHi ? "सक्रिय श्रेणियां" : "Active Categories"}
          </span>
        </div>

        <div className="dash-category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: "0.7rem", width: "100%" }}>
          {categoryStats.map((cat) => (
            <div
              key={cat.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "13px",
                padding: "0.95rem",
                border: `1px solid ${cat.borderColor}`,
                boxShadow: "0 2px 6px rgba(23, 34, 40, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.6rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <div
                    style={{
                      width: "29px",
                      height: "29px",
                      borderRadius: "7px",
                      backgroundColor: cat.bgColor,
                      color: cat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      color: cat.color,
                      backgroundColor: cat.bgColor,
                      padding: "2px 6px",
                      borderRadius: "999px",
                    }}
                  >
                    {cat.percentage}%
                  </span>
                </div>

                <div style={{ fontSize: "0.66rem", fontWeight: 600, color: "#49585F" }}>
                  {isHi ? cat.hindiName : cat.name}
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#172228", marginTop: "0.15rem" }}>
                  {formatIndianCurrency(cat.value)}
                </div>
              </div>

              <div style={{ fontSize: "0.6rem", color: "#55636D", borderTop: "1px solid rgba(23, 34, 40, 0.06)", paddingTop: "0.4rem" }}>
                {cat.count} {cat.count === 1 ? (isHi ? "परिसंपत्ति" : "Asset Holding") : (isHi ? "परिसंपत्तियां" : "Asset Holdings")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          COLLAPSIBLE ASSET INVENTORY (Scaled down by 20%)
          ========================================================================= */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "13px",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          boxShadow: "0 2px 8px rgba(23, 34, 40, 0.02)",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={() => setAssetInventoryOpen(!assetInventoryOpen)}
          style={{
            width: "100%",
            padding: "0.8rem 1rem",
            backgroundColor: "#FFFFFF",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#172228" }}>
              {isHi
                ? `📁 संपूर्ण संपत्ति सूची देखें (${assets.length} संपत्तियां)`
                : `📁 View Complete Asset Inventory (${assets.length} Assets)`}
            </span>
            <span style={{ fontSize: "0.6rem", color: "#49585F", fontWeight: 500 }}>
              {isHi ? "• केवल पढ़ने के लिए विवरण" : "• Read-Only Portfolio Summary"}
            </span>
          </div>

          <div style={{ color: "#49585F", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.64rem", fontWeight: 600 }}>
            <span>{assetInventoryOpen ? (isHi ? "छिपाएं ▲" : "Collapse ▲") : (isHi ? "विस्तार करें ▼" : "Expand ▼")}</span>
          </div>
        </button>

        {assetInventoryOpen && (
          <div style={{ borderTop: "1px solid rgba(23, 34, 40, 0.06)", padding: "0.6rem 1rem 1rem" }}>
            {assets.length === 0 ? (
              <p style={{ margin: "0.8rem 0", color: "#49585F", fontSize: "0.68rem", textAlign: "center" }}>
                {isHi ? "कोई संपत्ति पंजीकृत नहीं है।" : "No assets currently registered in questionnaire."}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {assets.map((asset, idx) => (
                  <div
                    key={asset.id || idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "8px",
                      backgroundColor: "#FAF7F0",
                      border: "1px solid rgba(23, 34, 40, 0.07)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(23, 34, 40, 0.1)",
                          color: "#172228",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.64rem",
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#172228" }}>
                          {asset.name || `Asset #${idx + 1}`}
                        </div>
                        <div style={{ fontSize: "0.6rem", color: "#49585F", marginTop: "1px" }}>
                          <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
                            {asset.category.replace("_", " ")}
                          </span>
                          {asset.addressOrInstitution && ` • ${asset.addressOrInstitution}`}
                          {asset.ownership && ` • ${asset.ownership === "sole" ? "Sole Owner (100%)" : "Joint Ownership"}`}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#172228" }}>
                        {formatFullINR(asset.approximateValue)}
                      </div>
                      <div style={{ fontSize: "0.58rem", color: "#5F7E75", fontWeight: 600 }}>
                        {formatIndianCurrency(asset.approximateValue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
          NEXT STEP STATUS / ACTION BAR (When Unpaid: Only Portfolio Visible)
          No Will Preview rendered until user has paid!
          Scaled down by 20% for 80% viewport density
          ========================================================================= */}
      {!isPaid ? (
        <div
          className="dash-next-step-bar"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            padding: "1rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            boxShadow: "0 2px 8px rgba(23, 34, 40, 0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                backgroundColor: isReviewed ? "rgba(198, 83, 120, 0.12)" : "rgba(23, 34, 40, 0.06)",
                color: isReviewed ? "#C65378" : "#172228",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={18} />
            </div>
            <div>
              <div style={{ margin: "0 0 0.15rem", fontSize: "0.86rem", fontWeight: 700, color: "#172228" }}>
                {isReviewed
                  ? (isHi ? "वसीयत तैयार है - बस योजना चुनें" : "Will ready to download, just select the plan")
                  : isAllDetailsSubmitted
                  ? (isHi ? "सभी विवरण सबमिट किए गए - कृपया समीक्षा करें" : "All details submitted, please review, select plan and have your fill")
                  : (isHi ? "प्रश्नावली पूरी करें" : "Complete details to unlock Will generation")}
              </div>
              <p style={{ margin: 0, fontSize: "0.68rem", color: "#49585F" }}>
                {isReviewed
                  ? (isHi
                      ? "आपकी संपत्ति और लाभार्थियों का विवरण सत्यापित हो चुका है। अपनी कानूनी योजना (₹2,490 से) चुनें और तुरंत वसीयत डाउनलोड करें।"
                      : "All assets and beneficiaries are reviewed. Choose your certification plan to unlock and download your court-ready Will.")
                  : isAllDetailsSubmitted
                  ? (isHi
                      ? "अपनी वसीयत तैयार करने से पहले चरण 9 में अपने विवरण और संपत्ति आवंटन की समीक्षा करें।"
                      : "Audit your submitted information and allocations in Step 9 to compile your official court-ready Will.")
                  : (isHi
                      ? "अपनी संपत्तियों और नामांकनों को पंजीकृत करने के लिए प्रश्नावली पूरी करें।"
                      : "Register your family nominations and asset bequests to generate your legally binding Will.")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isReviewed) {
                navigateTo("/start/12");
              } else if (isAllDetailsSubmitted) {
                navigateTo("/start/09");
              } else {
                navigateTo("/start/01");
              }
            }}
            style={{
              padding: "0.55rem 1.35rem",
              borderRadius: "8px",
              backgroundColor: isReviewed ? "#C65378" : "#172228",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: "none",
              cursor: "pointer",
              boxShadow: isReviewed
                ? "0 3px 12px rgba(198, 83, 120, 0.25)"
                : "0 3px 12px rgba(23, 34, 40, 0.2)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {isReviewed
              ? (isHi ? "योजना चुनें और वसीयत अनलॉक करें (चरण 12) →" : "Select Plan to Download Will (Step 12) →")
              : isAllDetailsSubmitted
              ? (isHi ? "विवरण की समीक्षा करें (चरण 9) →" : "Review Details (Step 9) →")
              : (isHi ? "प्रश्नावली जारी रखें →" : "Continue Questionnaire →")}
          </button>
        </div>
      ) : (
        /* Render Will Deed Document ONLY when user has PAID */
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 3px 16px -2px rgba(23, 34, 40, 0.04), 0 2px 5px -1px rgba(23, 34, 40, 0.02)",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
            position: "relative",
            minHeight: "350px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Document Card Header Bar */}
          <div
            style={{
              padding: "0.72rem 1.1rem",
              backgroundColor: "#FAF7F0",
              borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(23, 34, 40, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#172228",
                }}
              >
                <FileText size={13} />
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#172228" }}>
                {isHi ? "आपकी आधिकारिक कानूनी वसीयत" : "Official Court-Ready Will Deed"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  color: "#5F7E75",
                  backgroundColor: "rgba(95, 126, 117, 0.12)",
                  border: "1px solid rgba(95, 126, 117, 0.25)",
                  padding: "0.16rem 0.5rem",
                  borderRadius: "999px",
                }}
              >
                {isHi ? "सत्यापित • सक्रिय वसीयत" : "Verified • Court-Admissible"}
              </span>
            </div>
          </div>

          {/* Realistic Legal Document Paper */}
          <div
            className="dash-will-paper"
            style={{
              flex: 1,
              padding: "1.75rem 2.2rem",
              backgroundColor: "#FFFEFC",
              userSelect: "text",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#172228",
              lineHeight: 1.55,
              fontSize: "0.75rem",
            }}
          >
            {/* Document Title */}
            <div style={{ textAlign: "center", borderBottom: "2px solid #172228", paddingBottom: "0.7rem", marginBottom: "1.1rem" }}>
              <h2 style={{ fontSize: "1.08rem", fontWeight: 800, letterSpacing: "0.06em", margin: 0, textTransform: "uppercase" }}>
                THE LAST WILL AND TESTAMENT
              </h2>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase" }}>
                OF {testatorName}
              </p>
              <p style={{ margin: "0.15rem 0 0", fontSize: "0.62rem", color: "#49585F", fontStyle: "italic" }}>
                Executed in accordance with the Indian Succession Act, 1925
              </p>
            </div>

            <p style={{ margin: "0 0 0.8rem" }}>
              <strong>I, {testatorName}</strong>, residing at {testatorCity}, being of sound mind and disposing memory, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking any and all prior wills, codicils, and testamentary dispositions made by me at any time heretofore.
            </p>

            <p style={{ margin: "0 0 0.8rem" }}>
              <strong>1. REVOCATION OF ALL PRIOR WILLS &amp; CODICILS:</strong> I hereby revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, and instruments of a testamentary nature heretofore made by me at any time, and declare this to be my sole, exclusive, and operative Last Will and Testament.
            </p>

            <p style={{ margin: "0 0 0.8rem" }}>
              <strong>2. APPOINTMENT OF EXECUTOR:</strong> I hereby appoint <strong>{executorName}</strong> as the sole and primary Executor of this my Will. In the event that they predecease me or are unable or unwilling to act, I appoint the alternate executor designated in my Schedule of Appointments.
            </p>

            <p style={{ margin: "0 0 0.8rem" }}>
              <strong>3. BEQUEST OF ESTATE &amp; SCHEDULE A ASSETS:</strong> I direct that all my just debts, testamentary expenses, and liabilities be settled as soon as practicable. Thereafter, I devise, bequeath, and direct that my estate comprising {assets.length} registered asset holdings with an aggregate declared valuation of {formatFullINR(totalNetWorth)} be apportioned to my beneficiaries according to Schedule B attached hereto.
            </p>

            <p style={{ margin: "0 0 1rem" }}>
              <strong>4. RESIDUARY CLAUSE:</strong> All the rest, residue, and remainder of my estate, both real, personal, and movable, of whatsoever nature and wheresoever situated, I give, devise, and bequeath in equal proportions to my designated legal heirs.
            </p>

            <div className="dash-will-sig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem", marginTop: "1.2rem", borderTop: "1px dashed #CBD5E1", paddingTop: "0.8rem" }}>
              <div>
                <p style={{ fontWeight: 700, margin: "0 0 1rem", fontSize: "0.66rem" }}>SIGNED BY THE TESTATOR:</p>
                <div style={{ borderBottom: "1px solid #172228", width: "135px", marginBottom: "0.2rem" }} />
                <p style={{ fontSize: "0.62rem", margin: 0 }}>({testatorName})</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, margin: "0 0 1rem", fontSize: "0.66rem" }}>IN THE PRESENCE OF TWO WITNESSES:</p>
                <div style={{ borderBottom: "1px solid #172228", width: "135px", marginBottom: "0.2rem" }} />
                <p style={{ fontSize: "0.62rem", margin: 0 }}>Independent Attesting Witnesses</p>
              </div>
            </div>
          </div>

          {/* Centered Overlay with Download & Preview Actions */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              backgroundColor: "rgba(250, 247, 240, 0.42)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              padding: "1.2rem",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "43px",
                height: "43px",
                borderRadius: "13px",
                backgroundColor: "#172228",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 5px 14px rgba(23, 34, 40, 0.18)",
              }}
            >
              <Download size={19} />
            </div>

            <div style={{ maxWidth: "350px" }}>
              <h3 style={{ margin: "0 0 0.2rem", fontSize: "1rem", fontWeight: 800, color: "#172228" }}>
                {isHi ? "आपकी कानूनी वसीयत तैयार है" : "Your Court-Ready Will is Active & Ready"}
              </h3>
              <p style={{ margin: 0, fontSize: "0.68rem", color: "#49585F", lineHeight: 1.45 }}>
                {isHi
                  ? "आधिकारिक कानूनी विलेख, गवाह सत्यापन पृष्ठ और डिजिटल प्रति डाउनलोड करें।"
                  : "Official certified deed ready with dual-witness attestation guidelines and Schedule A inventory."}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem" }}>
              <button
                type="button"
                onClick={() => navigateTo("/start/13")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.64rem 1.75rem",
                  borderRadius: "10px",
                  backgroundColor: "#172228",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 3px 14px rgba(23, 34, 40, 0.28)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <span>{isHi ? "📥 वसीयत डाउनलोड करें (चरण 13) →" : "📥 Download Will (Step 13) →"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewModalOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#172228",
                  fontSize: "0.66rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  textDecoration: "underline",
                  padding: "0.2rem 0.4rem",
                }}
              >
                <Eye size={12} />
                <span>{isHi ? "मोडल में तुरंत देखें" : "Quick Preview in Modal"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Will Preview Modal */}
      <WillPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        state={state}
      />
    </div>
  );
}
