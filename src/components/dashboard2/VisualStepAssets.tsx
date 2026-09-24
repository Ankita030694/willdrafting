"use client";

import React, { useState } from "react";
import { WillDraftingState, Asset, AssetCategory } from "@/lib/willDraftingStore";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import { Plus, Trash2, Sparkles, Building, Landmark, Gem, TrendingUp, Briefcase, ShieldCheck, Car, Coins } from "lucide-react";

interface VisualStepAssetsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VisualStepAssets({ state, onUpdate, onNext, onBack }: VisualStepAssetsProps) {
  const [assets, setAssets] = useState<Asset[]>(state.assets || []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // New asset form
  const [selectedCat, setSelectedCat] = useState<AssetCategory>("property");
  const [assetName, setAssetName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [typeDetails, setTypeDetails] = useState("");
  const [approxValue, setApproxValue] = useState<number>(5000000);

  const categories = [
    { id: "property" as const, emoji: "🏠", label: "House / Flat / Land", hindi: "मकान, फ्लैट, जमीन", icon: Building, color: "#1B2A4A" },
    { id: "bank_account" as const, emoji: "🏦", label: "Bank Account & FD", hindi: "बैंक बचत खाता, एफडी", icon: Landmark, color: "#C9A227" },
    { id: "jewellery" as const, emoji: "🪙", label: "Gold & Jewellery", hindi: "सोना, चांदी, गहने, लॉकर", icon: Gem, color: "#E11D48" },
    { id: "investments" as const, emoji: "📈", label: "Mutual Funds & SIPs", hindi: "म्यूचुअल फंड, शेयर", icon: TrendingUp, color: "#2563EB" },
    { id: "business" as const, emoji: "🚀", label: "Startup Equity & CIN", hindi: "कंपनी शेयर, इनक्यूबेशन", icon: Briefcase, color: "#8B5CF6" },
    { id: "insurance" as const, emoji: "🛡️", label: "Life Insurance & LIC", hindi: "जीवन बीमा, पीएलआई", icon: ShieldCheck, color: "#0284C7" },
    { id: "vehicles" as const, emoji: "🚗", label: "Vehicles / Car", hindi: "कार, इनोवा, बाइक", icon: Car, color: "#059669" },
    { id: "other" as const, emoji: "👧", label: "Sukanya Samriddhi / PF", hindi: "सुकन्या समृद्धि, पीपीएफ", icon: Coins, color: "#D97706" },
  ];

  const handleOpenCategory = (cat: AssetCategory) => {
    setSelectedCat(cat);
    setAssetName("");
    setIdentifier("");
    if (cat === "property") setTypeDetails("Residential Flat");
    else if (cat === "bank_account") setTypeDetails("Savings Bank Account");
    else if (cat === "business") setTypeDetails("Startup Equity (CIN)");
    else if (cat === "jewellery") setTypeDetails("Gold & Silver Ornaments");
    else setTypeDetails("Investment Asset");
    setDrawerOpen(true);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim()) return;

    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      category: selectedCat,
      name: assetName.trim(),
      identifier: identifier.trim() || "",
      typeDetails,
      addressOrInstitution: "",
      ownership: "sole",
      approximateValue: approxValue,
      hasLoan: false,
    };

    const updated = [...assets, newAsset];
    setAssets(updated);
    onUpdate((p) => ({ ...p, assets: updated }));
    setDrawerOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    onUpdate((p) => ({
      ...p,
      assets: updated,
      allocations: p.allocations.filter((alc) => alc.assetId !== id),
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto", paddingBottom: "5rem" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          padding: "1.5rem 1.75rem",
          border: "1px solid rgba(15, 29, 56, 0.08)",
          boxShadow: "0 4px 20px rgba(15, 29, 56, 0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(212, 175, 55, 0.15)", color: "var(--color-navy)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
            <Sparkles size={13} color="var(--color-gold)" />
            Step 3 of 6 • Asset Vault
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            What Assets do you Own?
          </h2>
          <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginTop: "0.2rem" }}>
            (आपके पास कौन-कौन सी संपत्तियां हैं?)
          </div>
        </div>

        <AudioAssistantButton
          textToSpeak="What assets do you own? Tap any category below—such as house, bank account, gold, or shares—to add your properties. Clear identifiers make your will bulletproof."
          label="Listen / सुनें 🔊"
        />
      </div>

      {/* 8 Big Tactile Category Buttons */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.25rem 1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.75rem", display: "block" }}>
          Tap to add an asset category / संपत्ति श्रेणी चुनें:
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "0.75rem" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleOpenCategory(c.id)}
              style={{
                padding: "1rem 0.85rem",
                borderRadius: "14px",
                border: "1.5px solid rgba(15, 29, 56, 0.1)",
                backgroundColor: "#F8FAFC",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>{c.emoji}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-navy)" }}>{c.label}</span>
              <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 500, marginTop: "0.15rem" }}>{c.hindi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Registered Assets List */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
            Registered Assets in your Testament ({assets.length} items):
          </span>
          <span style={{ fontSize: "0.8rem", color: "#8A6D1B", fontWeight: 700 }}>
            (पंजीकृत संपत्ति विवरण)
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {assets.map((asset) => {
            const catCfg = categories.find((c) => c.id === asset.category) || categories[0];
            return (
              <div
                key={asset.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "1.1rem 1.35rem",
                  border: "1.5px solid rgba(15, 29, 56, 0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(15, 29, 56, 0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
                  <span style={{ fontSize: "2rem", lineHeight: 1 }}>{catCfg.emoji}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      {asset.name}
                    </h4>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "0.2rem" }}>
                      {asset.identifier || asset.typeDetails || catCfg.label}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {asset.approximateValue && (
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold)", backgroundColor: "rgba(212, 175, 55, 0.12)", padding: "0.25rem 0.65rem", borderRadius: "8px" }}>
                      ₹ {(asset.approximateValue / 100000).toFixed(1)} Lakhs
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(asset.id)}
                    title="Remove asset"
                    style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.35rem" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-Up Bottom Sheet Drawer for Adding Asset */}
      <BottomSheetDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add New Asset"
        hindiTitle="(नई संपत्ति का विवरण जोड़ें)"
      >
        <form onSubmit={handleAddAsset} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Asset Name / Title (संपत्ति का नाम) *
            </label>
            <input
              type="text"
              required
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="e.g. Powai Flat (Cypress CHS) or Canara Bank Account"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Identifier (Account Number / Flat No / CIN / Folio)
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. Account: 0272101053744 or Flat 201"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-gold"
            style={{
              padding: "0.9rem 1.5rem",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              marginTop: "0.5rem",
            }}
          >
            ✓ Save Asset / सुरक्षित करें
          </button>
        </form>
      </BottomSheetDrawer>

      {/* Navigation Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.85rem 1.5rem",
            borderRadius: "12px",
            border: "1.5px solid rgba(15, 29, 56, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
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
            padding: "0.85rem 2rem",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 800,
            cursor: "pointer",
            border: "none",
            flex: 1,
          }}
        >
          Save & Continue to Allocations (बंटवारा तय करें) ➔
        </button>
      </div>
    </div>
  );
}
