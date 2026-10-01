"use client";

import React, { useState } from "react";import WizardButton from "./button";

import {
  WillDraftingState,
  Asset,
  AssetCategory,
} from "@/lib/willDraftingStore";
import AppleSegmentedControl from "@/components/dashboard/AppleSegmentedControl";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Building2,
  Landmark,
  TrendingUp,
  Gem,
  Briefcase,
  Car,
  Coins,
  Boxes,
  Plus,
  Trash2,
  Pencil,
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Filter,
  DollarSign,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

interface Step4AssetsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step4Assets({
  state,
  onUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step4AssetsProps) {
  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;

  const [assets, setAssets] = useState<Asset[]>(state.assets || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Form state
  const [category, setCategory] = useState<AssetCategory>("property");
  const [name, setName] = useState("");
  const [typeDetails, setTypeDetails] = useState("Residential Flat");
  const [identifier, setIdentifier] = useState("");
  const [addressOrInstitution, setAddressOrInstitution] = useState("");
  const [ownership, setOwnership] = useState<"sole" | "joint">("sole");
  const [jointOwnerName, setJointOwnerName] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState<number>(50);
  const [approximateValue, setApproximateValue] = useState<number>(7500000); // 75 Lakhs default
  const [hasLoan, setHasLoan] = useState(false);

  // Category visual configuration with Lucide Icons
  const categoryConfigs: Record<
    AssetCategory,
    { label: string; Icon: React.ElementType; color: string; quickTypes: string[] }
  > = {
    property: {
      label: "Real Estate",
      Icon: Building2,
      color: "#172228",
      quickTypes: ["Residential Flat", "Bungalow / Villa", "Maternal Inherited Property", "Agricultural Land", "Commercial Office"],
    },
    bank_account: {
      label: "Bank & FD",
      Icon: Landmark,
      color: "#C65378",
      quickTypes: ["Salary Account", "Savings Account", "Fixed Deposit (FD)", "PPF Account", "NPS Account", "Sukanya Samriddhi Account"],
    },
    investments: {
      label: "Mutual Funds",
      Icon: TrendingUp,
      color: "#5F7E75",
      quickTypes: ["Mutual Fund Portfolio", "Demat / Equities", "SIP Folios", "NPS Account", "Sovereign Gold Bonds"],
    },
    shares: {
      label: "Equities / Demat",
      Icon: TrendingUp,
      color: "#2563EB",
      quickTypes: ["Demat Account", "Direct Stocks Portfolio", "Advisory & Stock Options", "SINE / Incubator Holdings"],
    },
    mutual_funds: {
      label: "Mutual Funds",
      Icon: TrendingUp,
      color: "#5F7E75",
      quickTypes: ["Mutual Fund Portfolio", "SIP Folios", "Large-Cap Index Funds", "Debt / Hybrid MFs"],
    },
    jewellery: {
      label: "Jewellery & Gold",
      Icon: Gem,
      color: "#E11D48",
      quickTypes: ["Bank Locker & Valuables", "Ancestral Gold Ornaments", "Diamond Jewellery", "Silver Bullion / Artifacts"],
    },
    business: {
      label: "Business & Equity",
      Icon: Briefcase,
      color: "#8B5CF6",
      quickTypes: ["Startup Equity (CIN)", "Advisory / ESOP Holdings", "SINE / Incubated Structure", "Private Ltd Shares", "LLP Partnership Interest"],
    },
    vehicles: {
      label: "Vehicles",
      Icon: Car,
      color: "#059669",
      quickTypes: ["Four-Wheeler Car", "Luxury Automobile", "Two-Wheeler Bike"],
    },
    insurance: {
      label: "Insurance",
      Icon: ShieldCheck,
      color: "#0284C7",
      quickTypes: ["Life Insurance Policy", "Group Term Insurance", "Postal Life Insurance", "Endowment Policy"],
    },
    digital: {
      label: "Digital Assets",
      Icon: Coins,
      color: "#EA580C",
      quickTypes: ["Crypto / Hardware Wallet", "Domains & Online IP", "Creator Monetization", "Digital Vault"],
    },
    other: {
      label: "Other Assets",
      Icon: Boxes,
      color: "#64748B",
      quickTypes: ["Artwork & Paintings", "Club Memberships", "Personal Loan Receivable"],
    },
  };

  const handleOpenAdd = (defaultCat?: AssetCategory) => {
    setEditingAssetId(null);
    const cat = defaultCat || "property";
    setCategory(cat);
    setTypeDetails(categoryConfigs[cat].quickTypes[0]);
    if (cat === "property") setApproximateValue(12500000);
    else if (cat === "bank_account") setApproximateValue(1500000);
    else if (cat === "jewellery") setApproximateValue(2500000);
    else setApproximateValue(2000000);

    setName("");
    setIdentifier("");
    setAddressOrInstitution("");
    setOwnership("sole");
    setJointOwnerName("");
    setOwnershipPercentage(50);
    setHasLoan(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (asset: Asset) => {
    setEditingAssetId(asset.id);
    setCategory(asset.category);
    setTypeDetails(asset.typeDetails || (categoryConfigs[asset.category]?.quickTypes[0] || ""));
    setName(asset.name);
    setIdentifier(asset.identifier || "");
    setAddressOrInstitution(asset.addressOrInstitution || "");
    setOwnership(asset.ownership);
    setJointOwnerName(asset.jointOwnerName || "");
    setOwnershipPercentage(asset.ownershipPercentage ?? (asset.ownership === "joint" ? 50 : 100));
    setApproximateValue(asset.approximateValue || 0);
    setHasLoan(asset.hasLoan || false);
    setModalOpen(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalOwnershipPercentage = ownership === "joint" ? (ownershipPercentage || 50) : 100;

    if (editingAssetId) {
      const updatedAssets = assets.map((a) => {
        if (a.id === editingAssetId) {
          return {
            ...a,
            category,
            name: name.trim(),
            typeDetails,
            identifier: identifier.trim() || (undefined as any),
            addressOrInstitution: addressOrInstitution.trim() || (undefined as any),
            ownership,
            jointOwnerName: ownership === "joint" ? jointOwnerName.trim() : undefined,
            ownershipPercentage: finalOwnershipPercentage,
            approximateValue,
            hasLoan,
          };
        }
        return a;
      });

      setAssets(updatedAssets);
      onUpdate((prev) => ({
        ...prev,
        assets: updatedAssets,
      }));
    } else {
      const newAsset: Asset = {
        id: `asset-${Date.now()}`,
        category,
        name: name.trim(),
        typeDetails,
        identifier: identifier.trim() || (undefined as any),
        addressOrInstitution: addressOrInstitution.trim() || (undefined as any),
        ownership,
        jointOwnerName: ownership === "joint" ? jointOwnerName.trim() : undefined,
        ownershipPercentage: finalOwnershipPercentage,
        approximateValue,
        hasLoan,
      };

      const updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
      onUpdate((prev) => ({
        ...prev,
        assets: updatedAssets,
      }));
    }

    setEditingAssetId(null);
    setModalOpen(false);
  };

  const handleDeleteAsset = (id: string) => {
    const updatedAssets = assets.filter((a) => a.id !== id);
    setAssets(updatedAssets);
    onUpdate((prev) => ({
      ...prev,
      assets: updatedAssets,
      allocations: prev.allocations.filter((alc) => alc.assetId !== id),
    }));
  };

  const totalAssetValue = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  const categoryGroups: {
    id: string;
    label: string;
    shortLabel: string;
    categories: AssetCategory[];
    defaultCat: AssetCategory;
    Icon: React.ElementType;
    color: string;
  }[] = [
    {
      id: "accounts",
      label: "Accounts, Bank Deposits & Retirement",
      shortLabel: "Accounts",
      categories: ["bank_account"],
      defaultCat: "bank_account",
      Icon: Landmark,
      color: "#C65378",
    },
    {
      id: "property",
      label: "Land & Real Estate Properties",
      shortLabel: "Land & Real Estate",
      categories: ["property"],
      defaultCat: "property",
      Icon: Building2,
      color: "#172228",
    },
    {
      id: "vehicles",
      label: "Motor Vehicles",
      shortLabel: "Vehicles",
      categories: ["vehicles"],
      defaultCat: "vehicles",
      Icon: Car,
      color: "#059669",
    },
    {
      id: "investments",
      label: "Mutual Funds, Shares & Investments",
      shortLabel: "Mutual Funds & Shares",
      categories: ["investments", "shares", "mutual_funds"],
      defaultCat: "investments",
      Icon: TrendingUp,
      color: "#5F7E75",
    },
    {
      id: "business",
      label: "Business & Startup Equity",
      shortLabel: "Business & Equity",
      categories: ["business"],
      defaultCat: "business",
      Icon: Briefcase,
      color: "#8B5CF6",
    },
    {
      id: "insurance",
      label: "Life & Term Insurance Policies",
      shortLabel: "Insurance",
      categories: ["insurance"],
      defaultCat: "insurance",
      Icon: ShieldCheck,
      color: "#0284C7",
    },
    {
      id: "jewellery",
      label: "Jewellery, Gold & Bank Lockers",
      shortLabel: "Jewellery & Lockers",
      categories: ["jewellery"],
      defaultCat: "jewellery",
      Icon: Gem,
      color: "#E11D48",
    },
    {
      id: "other",
      label: "Digital & Other Assets",
      shortLabel: "Other Assets",
      categories: ["digital", "other"],
      defaultCat: "other",
      Icon: Boxes,
      color: "#64748B",
    },
  ];

  const visibleGroups =
    activeFilter === "all"
      ? categoryGroups.filter((grp) =>
          assets.some((a) => grp.categories.includes(a.category))
        )
      : categoryGroups.filter((grp) => grp.id === activeFilter);

  const activeGroupForAdd =
    categoryGroups.find((g) => g.id === activeFilter)?.defaultCat || "property";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header with Stats & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "अपनी सभी संपत्तियों को दर्ज करें" : "Catalog Your Wealth Portfolio"}
            </h2>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-gold)", backgroundColor: "rgba(198, 83, 120, 0.12)", padding: "0.15rem 0.55rem", borderRadius: "999px" }}>
              {isHi ? "कुल मूल्य" : "Total"}: {formatCurrency(totalAssetValue)} ({assets.length} {isHi ? "मदें" : "items"})
            </span>
          </div>
        </div>

        {/* Language Toggle, Audio Assistant & Add Asset Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <LanguageToggle size="sm" currentLang={currentLang} onToggle={handleToggleLang} />
          <AudioAssistantButton
            textToSpeak="What assets do you own? Tap the Add Asset button to add your house, bank accounts, gold, shares, startup equity, vehicles, or insurance. You can specify exact account numbers and values."
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
          <button
            type="button"
            onClick={() => handleOpenAdd(activeGroupForAdd)}
            className="btn btn-gold"
            style={{
              padding: "0.45rem 0.95rem",
              fontSize: "0.8rem",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(198, 83, 120, 0.25)",
              cursor: "pointer",
            }}
          >
            <Plus size={14} /> {isHi ? "+ नई संपत्ति जोड़ें" : "+ Add Asset"}
          </button>
        </div>
      </div>

      {/* Category Filter Strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          flexWrap: "wrap",
          backgroundColor: "rgba(23, 34, 40, 0.04)",
          padding: "0.3rem",
          borderRadius: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          style={{
            padding: "0.38rem 0.75rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: activeFilter === "all" ? "var(--color-navy)" : "transparent",
            color: activeFilter === "all" ? "#FFFFFF" : "var(--color-slate)",
            fontSize: "0.76rem",
            fontWeight: activeFilter === "all" ? 700 : 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          All ({assets.length})
        </button>

        {categoryGroups.map((grp) => {
          const count = assets.filter((a) => grp.categories.includes(a.category)).length;
          if (count === 0 && grp.id === "other") return null;
          const isSel = activeFilter === grp.id;
          const GrpIcon = grp.Icon;
          return (
            <button
              key={grp.id}
              type="button"
              onClick={() => {
                setActiveFilter(grp.id);
                setExpandedGroups((prev) => ({ ...prev, [grp.id]: true }));
              }}
              style={{
                padding: "0.38rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: isSel ? "var(--color-gold)" : "transparent",
                color: isSel ? "#FFFFFF" : "var(--color-slate)",
                fontSize: "0.76rem",
                fontWeight: isSel ? 700 : 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "all 0.15s ease",
              }}
            >
              <GrpIcon size={13} />
              <span>
                {grp.shortLabel} ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Categorized Single-Column Horizontal Rows Container */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingRight: "0.25rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {visibleGroups.length > 0 ? (
          visibleGroups.map((grp) => {
            const groupAssets = assets.filter((a) => grp.categories.includes(a.category));
            const groupSubtotal = groupAssets.reduce((s, a) => s + (a.approximateValue || 0), 0);
            const GrpIcon = grp.Icon;
            const isExpanded = !!expandedGroups[grp.id];

            return (
              <div
                key={grp.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {/* Category Section Header (Collapsible Dropdown Row) */}
                <div
                  onClick={() => toggleGroup(grp.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    padding: "0.65rem 1rem",
                    borderRadius: "12px",
                    backgroundColor: isExpanded ? "rgba(198, 83, 120, 0.06)" : "rgba(23, 34, 40, 0.04)",
                    border: isExpanded ? "1px solid rgba(198, 83, 120, 0.28)" : "1px solid rgba(23, 34, 40, 0.06)",
                    borderLeft: `4px solid ${grp.color}`,
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                    <GrpIcon size={16} color={grp.color} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {grp.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.1rem 0.5rem",
                        borderRadius: "999px",
                        backgroundColor: "#FFFFFF",
                        color: "var(--color-slate)",
                        border: "1px solid rgba(23, 34, 40, 0.08)",
                      }}
                    >
                      {groupAssets.length} {groupAssets.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Subtotal: <span style={{ color: "var(--color-gold)" }}>{formatCurrency(groupSubtotal)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAdd(grp.defaultCat);
                      }}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--color-gold)",
                        background: "#FFFFFF",
                        border: "1px solid rgba(198, 83, 120, 0.25)",
                        borderRadius: "999px",
                        padding: "0.2rem 0.65rem",
                        cursor: "pointer",
                      }}
                    >
                      + Add {grp.shortLabel}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(grp.id);
                      }}
                      aria-expanded={isExpanded}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "1px solid rgba(23, 34, 40, 0.1)",
                        backgroundColor: isExpanded ? "var(--color-navy)" : "#FFFFFF",
                        color: isExpanded ? "#FFFFFF" : "var(--color-navy)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {/* Single-Column Horizontal Asset Rows (Visible when dropdown is open) */}
                {isExpanded && (
                  groupAssets.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: "0.25rem" }}>
                    {groupAssets.map((asset) => {
                      const cfg = categoryConfigs[asset.category] || categoryConfigs.other;
                      const CatIcon = cfg.Icon;
                      return (
                        <div
                          key={asset.id}
                          className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-5 bg-white rounded-[14px] border border-[#172228]/10 px-4 py-3 shadow-xs hover:border-[#C65378]/40 transition-colors"
                        >
                          {/* 1. Icon + Asset Name + Type Pill */}
                          <div className="flex items-center gap-3 min-w-0 lg:w-[30%] shrink-0">
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                backgroundColor: `${cfg.color}15`,
                                color: cfg.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <CatIcon size={17} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4
                                  style={{
                                    margin: 0,
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    color: "var(--color-navy)",
                                  }}
                                  className="truncate"
                                >
                                  {asset.name}
                                </h4>
                                <span
                                  style={{
                                    fontSize: "0.66rem",
                                    fontWeight: 700,
                                    backgroundColor: "rgba(23, 34, 40, 0.05)",
                                    color: "var(--color-navy)",
                                    padding: "0.08rem 0.45rem",
                                    borderRadius: "999px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {asset.typeDetails || cfg.label}
                                </span>
                              </div>
                              {asset.addressOrInstitution && (
                                <div className="text-[11px] text-[#6B7280] truncate mt-0.5">
                                  {asset.addressOrInstitution}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 2. Identifier / Account / Survey / CIN Details */}
                          <div className="min-w-0 flex-1 text-xs text-[#49585F] lg:border-l lg:border-[#172228]/10 lg:pl-4">
                            {asset.identifier ? (
                              <div className="truncate" title={asset.identifier}>
                                <span className="font-bold text-[#172228]">ID: </span>
                                {asset.identifier}
                              </div>
                            ) : (
                              <span className="text-[#9CA3AF] italic">No identifier recorded</span>
                            )}
                          </div>

                          {/* 3. Ownership & Encumbrance Status */}
                          <div className="flex flex-col gap-1 shrink-0 lg:border-l lg:border-[#172228]/10 lg:pl-4">
                            <span
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                color: "var(--color-slate)",
                                backgroundColor: "rgba(23, 34, 40, 0.04)",
                                padding: "0.2rem 0.55rem",
                                borderRadius: "999px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {asset.ownership === "sole"
                                ? "Sole (100%)"
                                : `Joint: ${asset.jointOwnerName || "Co-owner"}`}
                            </span>
                            {asset.ownership === "joint" && (
                              <span
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  color: "var(--color-gold)",
                                }}
                              >
                                Your Share: {asset.ownershipPercentage || 50}% ({formatCurrency(Math.round((asset.approximateValue * (asset.ownershipPercentage || 50)) / 100))})
                              </span>
                            )}
                            {asset.hasLoan && (
                              <span
                                style={{
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  backgroundColor: "rgba(198, 83, 120, 0.12)",
                                  color: "var(--color-gold)",
                                  padding: "0.18rem 0.5rem",
                                  borderRadius: "999px",
                                  whiteSpace: "nowrap",
                                  alignSelf: "flex-start",
                                }}
                              >
                                Mortgaged
                              </span>
                            )}
                          </div>

                          {/* 4. Valuation & Edit / Remove Actions */}
                          <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 lg:w-[225px] lg:border-l lg:border-[#172228]/10 lg:pl-4">
                            <div className="text-left lg:text-right">
                              <span className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold">
                                Valuation
                              </span>
                              <span className="text-[14px] font-extrabold text-[#172228] whitespace-nowrap">
                                {formatCurrency(asset.approximateValue)}
                              </span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(asset)}
                                aria-label={`Edit ${asset.name}`}
                                style={{
                                  padding: "0.3rem 0.65rem",
                                  borderRadius: "8px",
                                  border: "1px solid rgba(23, 34, 40, 0.15)",
                                  backgroundColor: "#FFFFFF",
                                  color: "var(--color-navy)",
                                  fontSize: "0.74rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.3rem",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "rgba(198, 83, 120, 0.08)";
                                  e.currentTarget.style.borderColor = "var(--color-gold)";
                                  e.currentTarget.style.color = "var(--color-gold)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                                  e.currentTarget.style.borderColor = "rgba(23, 34, 40, 0.15)";
                                  e.currentTarget.style.color = "var(--color-navy)";
                                }}
                              >
                                <Pencil size={12} />
                                <span>{isHi ? "संपादित करें" : "Edit"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteAsset(asset.id)}
                                aria-label={`Remove ${asset.name}`}
                                style={{
                                  padding: "0.3rem 0.6rem",
                                  borderRadius: "8px",
                                  border: "1px solid rgba(225, 29, 72, 0.2)",
                                  backgroundColor: "#FFFFFF",
                                  color: "#E11D48",
                                  fontSize: "0.74rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "rgba(225, 29, 72, 0.08)";
                                  e.currentTarget.style.borderColor = "#E11D48";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                                  e.currentTarget.style.borderColor = "rgba(225, 29, 72, 0.2)";
                                }}
                              >
                                <Trash2 size={12} />
                                <span>{isHi ? "हटाएं" : "Remove"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  ) : (
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "14px",
                        border: "1.5px dashed rgba(23, 34, 40, 0.12)",
                        padding: "1.5rem",
                        textAlign: "center",
                        color: "var(--color-slate)",
                        fontSize: "0.82rem",
                      }}
                    >
                      No assets recorded in <strong>{grp.label}</strong> yet.
                    </div>
                  )
                )}
              </div>
            );
          })
        ) : (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1.5px dashed rgba(27, 42, 74, 0.12)",
              padding: "2.5rem 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <Landmark size={28} color="var(--color-slate)" />
            <div>
              <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                No assets in this category yet
              </h4>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "var(--color-slate)" }}>
                Catalog your bank accounts, real estate, vehicles, or investment folios.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenAdd(activeGroupForAdd)}
              className="btn btn-gold"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.82rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <Plus size={14} /> Add First Asset
            </button>
          </div>
        )}
      </div>

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={onNext} />

      {/* Apple Sheet Modal for Adding Asset */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.65)",
            backdropFilter: "blur(14px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "580px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "2rem 2.25rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle Bar */}
            <div
              style={{
                width: "42px",
                height: "4px",
                borderRadius: "999px",
                backgroundColor: "rgba(27, 42, 74, 0.2)",
                margin: "-0.5rem auto 1.5rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 800 }}>
                  {editingAssetId
                    ? isHi ? "संपत्ति विवरण संपादित करें" : "Edit Asset Details"
                    : isHi ? "रजिस्टर में संपत्ति जोड़ें" : "Add Asset to Register"}
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  {editingAssetId
                    ? isHi ? "मौजूदा संपत्ति के स्वामित्व, विवरण और मूल्य में बदलाव करें।" : "Update existing asset ownership, classification, and valuation."
                    : isHi ? "भारतीय उत्तराधिकार अधिनियम 1925 के तहत आपकी वसीयत के लिए सूचीबद्ध।" : "Cataloged for distribution in your Will under Indian Succession Act 1925."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(27, 42, 74, 0.06)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-slate)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAsset} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Category Segmented Selector */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.5rem" }}>
                  Asset Category *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {(
                    [
                      "property",
                      "bank_account",
                      "investments",
                      "jewellery",
                      "business",
                      "vehicles",
                    ] as AssetCategory[]
                  ).map((cat) => {
                    const cfg = categoryConfigs[cat];
                    const isSel = category === cat;
                    const CatIcon = cfg.Icon;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setTypeDetails(cfg.quickTypes[0]);
                          if (cat === "property") setApproximateValue(12500000);
                          else if (cat === "bank_account") setApproximateValue(1500000);
                          else if (cat === "jewellery") setApproximateValue(2500000);
                        }}
                        style={{
                          padding: "0.75rem 0.5rem",
                          borderRadius: "14px",
                          border: isSel ? `2px solid ${cfg.color}` : "1px solid rgba(27, 42, 74, 0.1)",
                          backgroundColor: isSel ? `${cfg.color}10` : "#FFFFFF",
                          color: isSel ? "var(--color-navy)" : "var(--color-slate)",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.35rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <CatIcon size={20} color={isSel ? cfg.color : "var(--color-slate)"} />
                        <span style={{ fontSize: "0.75rem", fontWeight: isSel ? 700 : 500 }}>{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-type Pills */}
              <div>
                <span style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-slate)", marginBottom: "0.4rem" }}>
                  Asset Classification:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {categoryConfigs[category].quickTypes.map((typeOption) => (
                    <button
                      key={typeOption}
                      type="button"
                      onClick={() => setTypeDetails(typeOption)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: typeDetails === typeOption ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                        color: typeDetails === typeOption ? "#FFFFFF" : "var(--color-navy)",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {typeOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Name / Title */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Asset Title & Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    category === "property"
                      ? "e.g., 3BHK Apartment in DLF Phase 5"
                      : category === "bank_account"
                      ? "e.g., HDFC Bank Savings & Fixed Deposits"
                      : "e.g., Asset name / description"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.95rem",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Identifier & Location */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Identifier (A/C / Survey / Reg No.)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Survey #412/A or A/C ...8902"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Location / Institution
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Gurugram, Haryana / HDFC"
                    value={addressOrInstitution}
                    onChange={(e) => setAddressOrInstitution(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.85rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Quick Institution Pills for Banking & Investments */}
              {(category === "bank_account" || category === "investments" || category === "shares") && (
                <div>
                  <span style={{ display: "block", fontSize: "0.725rem", color: "var(--color-slate)", fontWeight: 600, marginBottom: "0.35rem" }}>
                    Quick Select Bank / Depository:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Zerodha"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => {
                          setAddressOrInstitution(bank);
                          if (!name) setName(`${bank} Account`);
                        }}
                        style={{
                          padding: "0.25rem 0.6rem",
                          borderRadius: "999px",
                          fontSize: "0.725rem",
                          fontWeight: 600,
                          backgroundColor: addressOrInstitution === bank ? "rgba(198, 83, 120, 0.12)" : "rgba(23, 34, 40, 0.04)",
                          border: addressOrInstitution === bank ? "1px solid var(--color-gold)" : "1px solid transparent",
                          color: "var(--color-navy)",
                          cursor: "pointer",
                        }}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Valuation Range Slider & Quick Amount Chips */}
              <div
                style={{
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Estimated Asset Valuation
                  </span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {formatCurrency(approximateValue)}
                  </span>
                </div>

                {/* Quick Amount Buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.85rem" }}>
                  {[
                    { label: "₹ 15 L", val: 1500000 },
                    { label: "₹ 35 L", val: 3500000 },
                    { label: "₹ 75 L", val: 7500000 },
                    { label: "₹ 1.50 Cr", val: 15000000 },
                    { label: "₹ 3.00 Cr", val: 30000000 },
                    { label: "₹ 5.00 Cr", val: 50000000 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setApproximateValue(preset.val)}
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "8px",
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        backgroundColor: approximateValue === preset.val ? "var(--color-gold)" : "#FFFFFF",
                        color: approximateValue === preset.val ? "#FFFFFF" : "var(--color-slate)",
                        border: "1px solid rgba(23, 34, 40, 0.12)",
                        cursor: "pointer",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="50000"
                  max="100000000"
                  step="500000"
                  value={approximateValue}
                  onChange={(e) => setApproximateValue(parseInt(e.target.value, 10))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "999px",
                    accentColor: "var(--color-gold)",
                    cursor: "pointer",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem", fontSize: "0.7rem", color: "var(--color-slate)" }}>
                  <span>₹ 50,000</span>
                  <span>₹ 5.00 Crore</span>
                  <span>₹ 10.00 Crore+</span>
                </div>
              </div>

              {/* Ownership Title Segmented Control */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                  Ownership Title
                </label>
                <AppleSegmentedControl
                  options={[
                    { value: "sole", label: "Solely Owned (100%)" },
                    { value: "joint", label: "Jointly Owned with Co-owner" },
                  ]}
                  value={ownership}
                  onChange={(val) => setOwnership(val as "sole" | "joint")}
                />
              </div>

              {ownership === "joint" && (
                <div
                  style={{
                    backgroundColor: "rgba(198, 83, 120, 0.04)",
                    border: "1.5px solid rgba(198, 83, 120, 0.22)",
                    borderRadius: "14px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <div>
                    <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                      Joint Owner Name & Relationship *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sunita Sharma (Wife)"
                      value={jointOwnerName}
                      onChange={(e) => setJointOwnerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.7rem 0.85rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        fontSize: "0.85rem",
                        color: "var(--color-navy)",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem", flexWrap: "wrap", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                        What percentage of this asset do you own? / Your ownership share *
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={ownershipPercentage}
                          onChange={(e) => setOwnershipPercentage(Math.min(99, Math.max(1, parseInt(e.target.value, 10) || 50)))}
                          style={{
                            width: "56px",
                            padding: "0.25rem 0.4rem",
                            borderRadius: "8px",
                            border: "1.5px solid var(--color-gold)",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            textAlign: "center",
                            color: "var(--color-navy)",
                            backgroundColor: "#FFFFFF",
                          }}
                        />
                        <span style={{ fontWeight: 800, color: "var(--color-navy)", fontSize: "0.9rem" }}>%</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      {[25, 33, 40, 50, 60, 75].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setOwnershipPercentage(pct)}
                          style={{
                            padding: "0.2rem 0.55rem",
                            borderRadius: "6px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            backgroundColor: ownershipPercentage === pct ? "var(--color-gold)" : "#FFFFFF",
                            color: ownershipPercentage === pct ? "#FFFFFF" : "var(--color-navy)",
                            border: "1px solid rgba(27, 42, 74, 0.12)",
                            cursor: "pointer",
                          }}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>

                    <p style={{ margin: 0, fontSize: "0.74rem", color: "var(--color-gold)", fontWeight: 600, lineHeight: 1.35 }}>
                      ⚖️ <strong>Legal Rule:</strong> The Will can only distribute the portion of the asset that you own ({ownershipPercentage}% share = {formatCurrency(Math.round((approximateValue * ownershipPercentage) / 100))}). The remaining {100 - ownershipPercentage}% remains with the co-owner.
                    </p>
                  </div>
                </div>
              )}

              {/* Mortgage Switch */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: "rgba(27, 42, 74, 0.03)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Has active home loan / mortgage encumbrance
                  </div>
                  <div style={{ fontSize: "0.725rem", color: "var(--color-slate)" }}>
                    Guides executor on clearing debts and loan payments before distribution
                  </div>
                </div>
                <AppleSwitch checked={hasLoan} onChange={setHasLoan} />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.15)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-navy)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    flex: 2,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(198, 83, 120, 0.3)",
                  }}
                >
                  {editingAssetId
                    ? isHi ? "बदलाव सहेजें" : "Save Changes"
                    : isHi ? "संपत्ति सहेजें" : "Save Asset to Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
