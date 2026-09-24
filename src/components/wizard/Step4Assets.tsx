"use client";

import React, { useState } from "react";
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
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Filter,
  DollarSign,
  Lock,
  ExternalLink,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step4AssetsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Assets({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step4AssetsProps) {
  const [assets, setAssets] = useState<Asset[]>(state.assets || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Form state
  const [category, setCategory] = useState<AssetCategory>("property");
  const [name, setName] = useState("");
  const [typeDetails, setTypeDetails] = useState("Residential Flat");
  const [identifier, setIdentifier] = useState("");
  const [addressOrInstitution, setAddressOrInstitution] = useState("");
  const [ownership, setOwnership] = useState<"sole" | "joint">("sole");
  const [jointOwnerName, setJointOwnerName] = useState("");
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
      color: "#1B2A4A",
      quickTypes: ["Residential Flat", "Bungalow / Villa", "Maternal Inherited Property", "Agricultural Land", "Commercial Office"],
    },
    bank_account: {
      label: "Bank & FD",
      Icon: Landmark,
      color: "#C9A227",
      quickTypes: ["Salary Account", "Savings Account", "Fixed Deposit (FD)", "PPF Account", "NPS Account", "Sukanya Samriddhi Account"],
    },
    investments: {
      label: "Mutual Funds",
      Icon: TrendingUp,
      color: "#7C9473",
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
      color: "#7C9473",
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
    setHasLoan(false);
    setModalOpen(true);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      category,
      name: name.trim(),
      typeDetails,
      identifier: identifier.trim() || undefined as any,
      addressOrInstitution: addressOrInstitution.trim() || undefined as any,
      ownership,
      jointOwnerName: ownership === "joint" ? jointOwnerName.trim() : undefined,
      approximateValue,
      hasLoan,
    };

    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);
    onUpdate((prev) => ({
      ...prev,
      assets: updatedAssets,
    }));

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

  const filteredAssets = assets.filter((a) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "property") return a.category === "property";
    if (activeFilter === "financial") return a.category === "bank_account" || a.category === "investments" || a.category === "shares" || a.category === "mutual_funds";
    if (activeFilter === "valuable") return a.category === "jewellery" || a.category === "business" || a.category === "vehicles" || a.category === "digital" || a.category === "other";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header with Stats & Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 4 of 14 • Assets & Wealth Register
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Catalog Your Wealth Portfolio
            </h2>
            <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
              (संपत्ति, बैंक खाता, सोना एवं शेयर)
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-gold)", backgroundColor: "rgba(201, 162, 39, 0.12)", padding: "0.15rem 0.55rem", borderRadius: "999px" }}>
              Total: {formatCurrency(totalAssetValue)} ({assets.length} items)
            </span>
          </div>
        </div>

        {/* Filter Tabs & Quick Add Button & Audio Assistant */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <AudioAssistantButton
            textToSpeak="What assets do you own? Tap the Add Asset button to add your house, bank accounts, gold, shares, startup equity, vehicles, or insurance. You can specify exact account numbers and values."
            label="Listen / सुनें 🔊"
          />
          <div style={{ display: "flex", gap: "0.25rem", backgroundColor: "rgba(27, 42, 74, 0.05)", padding: "0.2rem", borderRadius: "10px" }}>
            {[
              { id: "all", label: `All (${assets.length})` },
              { id: "property", label: "Real Estate" },
              { id: "financial", label: "Banking & Equities" },
              { id: "valuable", label: "Valuables" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: "0.35rem 0.65rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: activeFilter === tab.id ? "var(--color-navy)" : "transparent",
                  color: activeFilter === tab.id ? "#FFFFFF" : "var(--color-slate)",
                  fontSize: "0.76rem",
                  fontWeight: activeFilter === tab.id ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleOpenAdd("property")}
            className="btn btn-gold"
            style={{
              padding: "0.45rem 0.95rem",
              fontSize: "0.8rem",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontWeight: 700,
              boxShadow: "0 2px 10px rgba(201, 162, 39, 0.25)",
              cursor: "pointer",
            }}
          >
            <Plus size={14} /> + Add Asset
          </button>
        </div>
      </div>

      {/* Assets Grid (Full Width, Scrollable Container) */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingRight: "0.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => {
              const cfg = categoryConfigs[asset.category] || categoryConfigs.other;
              const CatIcon = cfg.Icon;
              return (
                <div
                  key={asset.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid rgba(27, 42, 74, 0.08)",
                    padding: "1rem 1.15rem",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            backgroundColor: `${cfg.color}15`,
                            color: cfg.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <CatIcon size={18} />
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {asset.name}
                          </h4>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              backgroundColor: "rgba(27, 42, 74, 0.05)",
                              color: "var(--color-navy)",
                              padding: "0.1rem 0.4rem",
                              borderRadius: "999px",
                              marginTop: "0.15rem",
                            }}
                          >
                            {asset.typeDetails || cfg.label}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteAsset(asset.id)}
                        aria-label="Remove asset"
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(27, 42, 74, 0.35)",
                          cursor: "pointer",
                          padding: "0.3rem",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#E11D48")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27, 42, 74, 0.35)")}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ marginTop: "0.65rem", display: "flex", flexDirection: "column", gap: "0.2rem", fontSize: "0.76rem", color: "var(--color-slate)" }}>
                      {asset.identifier && (
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          <strong>ID:</strong> {asset.identifier}
                        </div>
                      )}
                      <div>
                        <strong>Ownership:</strong> {asset.ownership === "sole" ? "Sole (100%)" : `Joint: ${asset.jointOwnerName || "Co-owner"}`}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.55rem",
                      borderTop: "1px solid rgba(27, 42, 74, 0.06)",
                    }}
                  >
                    <div>
                      <span style={{ display: "block", fontSize: "0.65rem", color: "var(--color-slate)", textTransform: "uppercase" }}>
                        Valuation
                      </span>
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                        {formatCurrency(asset.approximateValue)}
                      </span>
                    </div>

                    {asset.hasLoan && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          backgroundColor: "rgba(201, 162, 39, 0.15)",
                          color: "var(--color-navy)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "999px",
                        }}
                      >
                        Mortgaged
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
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
                  Catalog your real estate, bank deposits, or mutual fund folios.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAdd("property")}
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
      </div>

      {/* Navigation Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: "10px",
            border: "1px solid rgba(27, 42, 74, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-slate)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Save & Continue to Allocations <ArrowRight size={16} />
        </button>
      </div>

      {/* Apple Sheet Modal for Adding Asset */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(22, 35, 60, 0.65)",
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
                  Add Asset to Register
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  Cataloged for distribution in your Will under Indian Succession Act 1925.
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

            <form onSubmit={handleAddAsset} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                          backgroundColor: addressOrInstitution === bank ? "rgba(201, 162, 39, 0.15)" : "rgba(27, 42, 74, 0.04)",
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
                        color: approximateValue === preset.val ? "var(--color-navy)" : "var(--color-slate)",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
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
                <div>
                  <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                    Joint Owner Name & Relationship *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sunita Sharma (Wife, 50% Share)"
                    value={jointOwnerName}
                    onChange={(e) => setJointOwnerName(e.target.value)}
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
                    Directs executor on clearance of liabilities under Section 325 ISA
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
                    boxShadow: "0 4px 14px rgba(201, 162, 39, 0.3)",
                  }}
                >
                  Save Asset to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
