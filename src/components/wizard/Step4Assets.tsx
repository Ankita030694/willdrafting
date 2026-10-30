"use client";

import React, { useState, useEffect } from "react";
import WizardButton from "./button";
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
  Boxes,
  Plus,
  Trash2,
  Pencil,
  X,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Filter,
  AlertCircle,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import IndianAmountInput from "@/components/ui/IndianAmountInput";
import { sanitizeNameInput, sanitizePercent, toTitleCaseText, normalizeIdCode } from "@/lib/inputSanitizers";
import { useWillStore } from "@/lib/useWillStore";
import InfoTooltip from "@/components/wizard/InfoTooltip";

interface Step4AssetsProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step4Assets({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step4AssetsProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;

  const [assets, setAssets] = useState<Asset[]>(state.assets || []);

  useEffect(() => {
    setAssets(state.assets || []);
  }, [state.assets]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Form state
  const [category, setCategory] = useState<AssetCategory>("bank_account");
  const [name, setName] = useState("");
  const [typeDetails, setTypeDetails] = useState("Savings Account");
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [addressOrInstitution, setAddressOrInstitution] = useState("");
  const [ownership, setOwnership] = useState<"sole" | "joint">("sole");
  const [jointOwnerName, setJointOwnerName] = useState("");
  const [jointOwnerRelationship, setJointOwnerRelationship] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState<number>(50);
  const [approximateValue, setApproximateValue] = useState<number>(1500000);
  const [hasLoan, setHasLoan] = useState(false);
  const [loanDetails, setLoanDetails] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Insurance Specific Fields
  const [policyNumber, setPolicyNumber] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [sumAssured, setSumAssured] = useState<number>(5000000);
  const [nomineeName, setNomineeName] = useState("");

  // Category Configuration
  const categoryConfigs: Record<
    AssetCategory,
    {
      label: string;
      hindiLabel: string;
      Icon: React.ElementType;
      color: string;
      quickTypes: string[];
    }
  > = {
    bank_account: {
      label: "Bank & Fixed Deposits",
      hindiLabel: "बैंक खाते एवं सावधि जमा",
      Icon: Landmark,
      color: "#C65378",
      quickTypes: [
        "Savings Account",
        "Fixed Deposit (FD)",
        "Recurring Deposit (RD)",
        "Salary Account",
        "Public Provident Fund (PPF)",
        "National Pension Scheme (NPS)",
        "Current Account",
      ],
    },
    property: {
      label: "Real Estate & Land",
      hindiLabel: "मकान, फ्लैट एवं जमीन",
      Icon: Building2,
      color: "#172228",
      quickTypes: [
        "Residential Flat / Apartment",
        "Independent House / Villa",
        "Commercial Office / Shop",
        "Agricultural Land",
        "Residential Plot / Land",
        "Inherited Family Property",
      ],
    },
    insurance: {
      label: "Insurance Policies",
      hindiLabel: "जीवन व टर्म बीमा पॉलिसियां",
      Icon: ShieldCheck,
      color: "#0284C7",
      quickTypes: [
        "Term Insurance (Pure Life Cover)",
        "Endowment Policy (Traditional)",
        "Unit Linked Insurance Plan (ULIP)",
        "Whole Life Insurance",
        "Money Back Policy",
        "Postal Life Insurance (PLI)",
        "Group Term Life Cover",
      ],
    },
    investments: {
      label: "Mutual Funds & Stocks",
      hindiLabel: "म्यूचुअल फंड एवं शेयर",
      Icon: TrendingUp,
      color: "#5F7E75",
      quickTypes: [
        "Mutual Fund Portfolio",
        "Direct Stocks & Demat Account",
        "Systematic Investment Plan (SIP)",
        "Sovereign Gold Bonds (SGB)",
        "Corporate Bonds & Debentures",
        "ESOPs & Advisory Equity",
      ],
    },
    jewellery: {
      label: "Jewellery & Gold",
      hindiLabel: "सोना, गहने एवं लॉकर",
      Icon: Gem,
      color: "#E11D48",
      quickTypes: [
        "Gold Ornaments & Jewellery",
        "Diamond & Precious Stones",
        "Silver Bullion & Utensils",
        "Bank Safe Deposit Locker",
      ],
    },
    vehicles: {
      label: "Motor Vehicles",
      hindiLabel: "गाड़ियां एवं वाहन",
      Icon: Car,
      color: "#059669",
      quickTypes: [
        "Four-Wheeler Car",
        "Two-Wheeler Motorcycle / Scooter",
        "Luxury Automobile",
        "Commercial Vehicle",
      ],
    },
    business: {
      label: "Business & Startup Equity",
      hindiLabel: "व्यवसाय व स्टार्टअप शेयर",
      Icon: Briefcase,
      color: "#8B5CF6",
      quickTypes: [
        "Private Limited Company Shares",
        "LLP Partnership Interest",
        "Startup Equity & ESOPs",
        "Sole Proprietorship Business",
        "Family Firm Partnership",
      ],
    },
    other: {
      label: "Other / Custom Assets",
      hindiLabel: "अन्य व कस्टम संपत्तियां",
      Icon: Boxes,
      color: "#EA580C",
      quickTypes: [
        "Artwork & Paintings Collection",
        "Cryptocurrency Hardware Vault",
        "Intellectual Property / Patents & Trademarks",
        "Agricultural Produce & Machinery",
        "Club Equity & Memberships",
        "Personal Loan Receivable",
        "Custom Asset Classification",
      ],
    },
    shares: {
      label: "Equities / Demat",
      hindiLabel: "शेयर एवं डीमैट",
      Icon: TrendingUp,
      color: "#2563EB",
      quickTypes: ["Demat Account", "Direct Stocks", "ESOPs"],
    },
    mutual_funds: {
      label: "Mutual Funds",
      hindiLabel: "म्यूचुअल फंड",
      Icon: TrendingUp,
      color: "#5F7E75",
      quickTypes: ["Mutual Fund Portfolio", "SIP Folios"],
    },
    digital: {
      label: "Digital Assets",
      hindiLabel: "डिजिटल संपत्तियां",
      Icon: Boxes,
      color: "#EA580C",
      quickTypes: ["Crypto Wallet", "Domain Names"],
    },
  };

  // Primary 8 Category Boxes to display
  const primaryBoxes: { id: AssetCategory; defaultVal: number }[] = [
    { id: "bank_account", defaultVal: 1500000 },
    { id: "property", defaultVal: 12500000 },
    { id: "insurance", defaultVal: 5000000 },
    { id: "investments", defaultVal: 2000000 },
    { id: "jewellery", defaultVal: 2500000 },
    { id: "vehicles", defaultVal: 1200000 },
    { id: "business", defaultVal: 3500000 },
    { id: "other", defaultVal: 1000000 },
  ];

  const handleOpenAdd = (defaultCat?: AssetCategory) => {
    setEditingAssetId(null);
    const cat = defaultCat || "bank_account";
    setCategory(cat);
    const cfg = categoryConfigs[cat] || categoryConfigs.other;
    setTypeDetails(cfg.quickTypes[0]);
    setCustomCategoryName("");
    setName("");
    setIdentifier("");
    setAddressOrInstitution("");
    setOwnership("sole");
    setJointOwnerName("");
    setJointOwnerRelationship("");
    setOwnershipPercentage(50);
    setHasLoan(false);
    setLoanDetails("");
    setSpecialInstructions("");

    // Insurance fields
    setPolicyNumber("");
    setInsuranceCompany("");
    setSumAssured(5000000);
    setNomineeName("");

    const box = primaryBoxes.find((b) => b.id === cat);
    setApproximateValue(box ? box.defaultVal : 1500000);
    setModalError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (asset: Asset) => {
    setEditingAssetId(asset.id);
    const cat = asset.category || "other";
    setCategory(cat);
    setTypeDetails(asset.typeDetails || (categoryConfigs[cat]?.quickTypes[0] || ""));
    setCustomCategoryName(asset.customCategoryName || (cat === "other" ? asset.typeDetails : ""));
    setName(asset.name || "");
    setIdentifier(asset.identifier || "");
    setAddressOrInstitution(asset.addressOrInstitution || "");
    setOwnership(asset.ownership || "sole");
    const rawJointName = (asset.jointOwnerName || "").trim();
    const rawJointRel = (asset.jointOwnerRelationship || "").trim();
    const wordMatch = rawJointName.match(
      /^(.+?)\s+(wife|husband|spouse|brother|sister|father|mother|son|daughter|partner)$/i
    );
    if (!rawJointRel && rawJointName.includes("(") && rawJointName.endsWith(")")) {
      const idx = rawJointName.lastIndexOf("(");
      setJointOwnerName(sanitizeNameInput(rawJointName.slice(0, idx)).trim());
      setJointOwnerRelationship(sanitizeNameInput(rawJointName.slice(idx + 1, -1)).trim());
    } else if (!rawJointRel && wordMatch) {
      setJointOwnerName(sanitizeNameInput(wordMatch[1]).trim());
      setJointOwnerRelationship(sanitizeNameInput(wordMatch[2]).trim());
    } else {
      setJointOwnerName(rawJointName);
      setJointOwnerRelationship(rawJointRel);
    }
    setOwnershipPercentage(asset.ownershipPercentage ?? (asset.ownership === "joint" ? 50 : 100));
    setApproximateValue(asset.approximateValue || 0);
    setHasLoan(asset.hasLoan || Boolean(asset.loanDetails?.trim()));
    setLoanDetails(asset.loanDetails || "");
    setSpecialInstructions(asset.specialInstructions || "");

    // Insurance fields
    setPolicyNumber(asset.policyNumber || asset.identifier || "");
    setInsuranceCompany(asset.insuranceCompany || asset.addressOrInstitution || "");
    setSumAssured(asset.sumAssured || asset.approximateValue || 0);
    setNomineeName(asset.nomineeName || "");

    setModalError("");
    setModalOpen(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setModalError(
        isHi
          ? "कृपया संपत्ति का नाम या विवरण दर्ज करें (जैसे: 2BHK फ्लैट, SBI खाता, सोना आदि)।"
          : "Please enter a name or description for this asset (e.g. 2BHK Flat, SBI Savings Account, Gold Jewellery)."
      );
      return;
    }

    if (ownership === "joint" && (!jointOwnerName.trim() || !jointOwnerRelationship.trim())) {
      setModalError(
        isHi
          ? "कृपया सह-स्वामी का पूरा नाम और उनसे अपना संबंध दोनों दर्ज करें।"
          : "Please enter both the Joint Owner's Full Name and their Relationship with you."
      );
      return;
    }

    const finalOwnershipPercentage = ownership === "joint" ? (ownershipPercentage || 50) : 100;
    const finalValuation = category === "insurance" ? (sumAssured || approximateValue) : approximateValue;

    const finalTypeDetails =
      category === "other" && customCategoryName.trim()
        ? sanitizeNameInput(customCategoryName).trim()
        : typeDetails;

    const finalIdentifier =
      category === "insurance" && policyNumber.trim()
        ? policyNumber.trim()
        : identifier.trim();

    const finalInstitution =
      category === "insurance" && insuranceCompany.trim()
        ? insuranceCompany.trim()
        : addressOrInstitution.trim();

    if (editingAssetId) {
      const updatedAssets = assets.map((a) => {
        if (a.id === editingAssetId) {
          return {
            ...a,
            category,
            name: name.trim(),
            typeDetails: finalTypeDetails,
            identifier: finalIdentifier || "",
            addressOrInstitution: finalInstitution || "",
            ownership,
            jointOwnerName: ownership === "joint" ? sanitizeNameInput(jointOwnerName).trim() : undefined,
            jointOwnerRelationship: ownership === "joint" ? sanitizeNameInput(jointOwnerRelationship).trim() : undefined,
            ownershipPercentage: finalOwnershipPercentage,
            approximateValue: finalValuation,
            hasLoan,
            loanDetails: hasLoan && loanDetails.trim() ? loanDetails.trim() : undefined,
            specialInstructions: specialInstructions.trim() || undefined,
            customCategoryName: category === "other" ? sanitizeNameInput(customCategoryName).trim() : undefined,
            policyNumber: category === "insurance" ? policyNumber.trim() : undefined,
            insuranceCompany: category === "insurance" ? insuranceCompany.trim() : undefined,
            sumAssured: category === "insurance" ? sumAssured : undefined,
            nomineeName: nomineeName.trim() ? sanitizeNameInput(nomineeName).trim() : undefined,
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
        typeDetails: finalTypeDetails,
        identifier: finalIdentifier || "",
        addressOrInstitution: finalInstitution || "",
        ownership,
        jointOwnerName: ownership === "joint" ? sanitizeNameInput(jointOwnerName).trim() : undefined,
        jointOwnerRelationship: ownership === "joint" ? sanitizeNameInput(jointOwnerRelationship).trim() : undefined,
        ownershipPercentage: finalOwnershipPercentage,
        approximateValue: finalValuation,
        hasLoan,
        loanDetails: hasLoan && loanDetails.trim() ? loanDetails.trim() : undefined,
        specialInstructions: specialInstructions.trim() || undefined,
        customCategoryName: category === "other" ? sanitizeNameInput(customCategoryName).trim() : undefined,
        policyNumber: category === "insurance" ? policyNumber.trim() : undefined,
        insuranceCompany: category === "insurance" ? insuranceCompany.trim() : undefined,
        sumAssured: category === "insurance" ? sumAssured : undefined,
        nomineeName: nomineeName.trim() ? sanitizeNameInput(nomineeName).trim() : undefined,
      };

      const updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
      onUpdate((prev) => ({
        ...prev,
        assets: updatedAssets,
      }));
    }

    setShowEmptyWarning(false);
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

  const handleProceed = () => {
    if (assets.length === 0) {
      setShowEmptyWarning(true);
      return;
    }
    onUpdate((prev) => ({
      ...prev,
      assets,
    }));
    onNext();
  };

  const totalAssetValue = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);

  const formatCurrency = (val?: number) => {
    if (!val || val === 0) return "₹ 0";
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  // Filtered Assets list
  const filteredAssets =
    activeFilter === "all"
      ? assets
      : assets.filter((a) => {
          if (activeFilter === "investments") {
            return a.category === "investments" || a.category === "shares" || a.category === "mutual_funds";
          }
          if (activeFilter === "other") {
            return a.category === "other" || a.category === "digital";
          }
          return a.category === activeFilter;
        });

  // Group id (matches the category boxes) for any asset category
  const boxIdForCategory = (cat: string) =>
    cat === "shares" || cat === "mutual_funds" ? "investments" : cat === "digital" ? "other" : cat;

  // In the default ("all") view the full list is shown, grouped by category in box order
  const orderedAssets =
    activeFilter === "all"
      ? [...filteredAssets].sort((a, b) => {
          const ia = primaryBoxes.findIndex((bx) => bx.id === boxIdForCategory(a.category));
          const ib = primaryBoxes.findIndex((bx) => bx.id === boxIdForCategory(b.category));
          return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
        })
      : filteredAssets;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      {/* Top Header with Total Valuation and Global Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "अपनी सभी संपत्तियों को दर्ज करें" : "Catalog Your Wealth Portfolio"}
            </h2>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-gold)", backgroundColor: "rgba(198, 83, 120, 0.12)", padding: "0.15rem 0.55rem", borderRadius: "999px" }}>
              {isHi ? "कुल मूल्य" : "Total"}: {formatCurrency(totalAssetValue)} ({assets.length} {isHi ? "दर्ज संपत्तियां" : "registered assets"})
            </span>
          </div>
        </div>

        <div className="wizard-step-header-meta" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <LanguageToggle size="sm" currentLang={currentLang} onToggle={handleToggleLang} />
          <AudioAssistantButton
            textToSpeak="What assets do you own? Tap any category icon box below or the plus button at the top right to add your house, bank accounts, insurance policies, gold, or custom assets."
            hindiText="आपकी कौन-कौन सी संपत्तियां हैं? नीचे दिए गए किसी भी श्रेणी बॉक्स पर या ऊपर दाईं ओर दिए गए प्लस चिह्न पर क्लिक करके अपना मकान, बैंक खाता, बीमा पॉलिसी, सोना या अन्य संपत्ति जोड़ें।"
            label={isHi ? "सुनें" : "Listen"}
          />
          <button
            type="button"
            onClick={() => handleOpenAdd("bank_account")}
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
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={14} strokeWidth={2.5} /> {isHi ? "नई संपत्ति जोड़ें" : "Add Asset"}
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CATEGORY ICON BOXES GRID (With "+" Sign at Top Right)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="assets-category-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "0.75rem",
          width: "100%",
        }}
      >
        {primaryBoxes.map((box) => {
          const cfg = categoryConfigs[box.id] || categoryConfigs.other;
          const BoxIcon = cfg.Icon;
          const catAssets = assets.filter((a) => {
            if (box.id === "investments") {
              return a.category === "investments" || a.category === "shares" || a.category === "mutual_funds";
            }
            if (box.id === "other") {
              return a.category === "other" || a.category === "digital";
            }
            return a.category === box.id;
          });
          const catSubtotal = catAssets.reduce((s, a) => s + (a.approximateValue || 0), 0);
          const isFilterActive = activeFilter === box.id;

          return (
            <div
              key={box.id}
              className="assets-category-card"
              onClick={() => {
                setActiveFilter(activeFilter === box.id ? "all" : box.id);
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: isFilterActive ? `2px solid ${cfg.color}` : "1px solid rgba(27, 42, 74, 0.1)",
                padding: "0.85rem 1rem",
                boxShadow: isFilterActive
                  ? "0 6px 20px rgba(198, 83, 120, 0.12)"
                  : "0 2px 8px rgba(0, 0, 0, 0.02)",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.6rem",
                position: "relative",
              }}
            >
              {/* Top Row: Icon Container on Left, Plus Sign on Top Right */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
                  <BoxIcon size={20} strokeWidth={2.2} />
                </div>

                {/* Plus Sign at Top Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAdd(box.id);
                  }}
                  title={isHi ? `${cfg.hindiLabel} जोड़ें` : `Add ${cfg.label}`}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(198, 83, 120, 0.12)",
                    color: "#C65378",
                    border: "1px solid rgba(198, 83, 120, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C65378";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(198, 83, 120, 0.12)";
                    e.currentTarget.style.color = "#C65378";
                  }}
                >
                  <Plus size={15} strokeWidth={3} />
                </button>
              </div>

              {/* Bottom Details: Category Title & Count/Valuation */}
              <div>
                <h4 style={{ margin: "0 0 0.15rem", fontSize: "0.88rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  {isHi ? cfg.hindiLabel : cfg.label}
                </h4>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.72rem" }}>
                  {catAssets.length > 0 ? (
                    <span style={{ fontWeight: 700, color: "#166534" }}>
                      {catAssets.length} {catAssets.length === 1 ? (isHi ? "मद" : "item") : (isHi ? "मदें" : "items")} • {formatCurrency(catSubtotal)}
                    </span>
                  ) : (
                    <span style={{ color: "var(--color-slate)", fontWeight: 500 }}>
                      {isHi ? "0 दर्ज" : "0 added"}
                    </span>
                  )}

                  {isFilterActive && (
                    <span style={{ color: cfg.color, fontWeight: 700, fontSize: "0.68rem" }}>
                      {isHi ? "सक्रिय फिल्टर" : "Filtered"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. UNDER THAT: SHOW REGISTERED ASSETS LIST & CARDS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {/* Active Filter Title Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.2rem 0.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {activeFilter === "all"
                ? (isHi ? "दर्ज संपत्तियों की सूची" : "Registered Assets Schedule")
                : (isHi ? `फिल्टर: ${categoryConfigs[activeFilter as AssetCategory]?.hindiLabel || activeFilter}` : `Filtered: ${categoryConfigs[activeFilter as AssetCategory]?.label || activeFilter}`)}
            </span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: "999px", backgroundColor: "rgba(27, 42, 74, 0.08)", color: "var(--color-navy)" }}>
              {filteredAssets.length} {filteredAssets.length === 1 ? (isHi ? "संपत्ति" : "asset") : (isHi ? "संपत्तियां" : "assets")}
            </span>
          </div>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              style={{
                fontSize: "0.74rem",
                color: "var(--color-gold)",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isHi ? "सभी संपत्तियां देखें (All) ✕" : "Show All Assets ✕"}
            </button>
          )}
        </div>

        {/* Assets Cards */}
        {filteredAssets.length > 0 ? (
          orderedAssets.map((asset, assetIdx) => {
            const cfg = categoryConfigs[asset.category] || categoryConfigs.other;
            const AssetIcon = cfg.Icon;
            const isInsurance = asset.category === "insurance";
            const isOther = asset.category === "other" || asset.category === "digital";
            const groupId = boxIdForCategory(asset.category);
            const groupCfg = categoryConfigs[groupId as AssetCategory] || cfg;
            const showGroupHeader =
              activeFilter === "all" &&
              (assetIdx === 0 || boxIdForCategory(orderedAssets[assetIdx - 1].category) !== groupId);

            return (
              <React.Fragment key={asset.id}>
              {showGroupHeader && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: assetIdx === 0 ? 0 : "0.6rem",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: groupCfg.color,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: groupCfg.color }} />
                  {isHi ? groupCfg.hindiLabel : groupCfg.label}
                  <span style={{ flex: 1, height: 1, backgroundColor: `${groupCfg.color}30` }} />
                </div>
              )}
              <div
                className="asset-item-card"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "0.85rem 1.15rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.85rem",
                  transition: "all 0.18s ease",
                }}
              >
                {/* Left: Icon + Title + Classification & Ownership Badges */}
                <div className="asset-item-main" style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      backgroundColor: `${cfg.color}15`,
                      color: cfg.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AssetIcon size={22} strokeWidth={2.2} />
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                      <h4 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 800, color: "var(--color-navy)" }}>
                        {asset.name}
                      </h4>

                      {/* Classification Badge */}
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: `${cfg.color}12`,
                          color: cfg.color,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {isOther && asset.customCategoryName
                          ? `${isHi ? "कस्टम:" : "Custom:"} ${asset.customCategoryName}`
                          : asset.typeDetails}
                      </span>

                      {/* Ownership Badge */}
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: asset.ownership === "joint" ? "rgba(198, 83, 120, 0.12)" : "rgba(124, 148, 115, 0.15)",
                          color: asset.ownership === "joint" ? "var(--color-gold)" : "var(--color-sage)",
                        }}
                      >
                        {asset.ownership === "joint"
                          ? isHi
                            ? `संयुक्त स्वामित्व (${asset.ownershipPercentage || 50}% हिस्सा)`
                            : `Joint (${asset.ownershipPercentage || 50}% share)`
                          : isHi
                          ? "पूर्ण स्वामित्व (100%)"
                          : "Sole Ownership (100%)"}
                      </span>
                    </div>

                    {/* Meta Details Row */}
                    <div className="asset-item-meta" style={{ fontSize: "0.76rem", color: "var(--color-slate)", display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
                      {isInsurance ? (
                        <>
                          {asset.policyNumber && (
                            <span>
                              <strong>{isHi ? "पॉलिसी नं:" : "Policy #:"}</strong> {asset.policyNumber}
                            </span>
                          )}
                          {asset.insuranceCompany && (
                            <span>
                              <strong>{isHi ? "कंपनी:" : "Insurer:"}</strong> {asset.insuranceCompany}
                            </span>
                          )}
                          {asset.nomineeName && (
                            <span>
                              <strong>{isHi ? "नामिती:" : "Nominee:"}</strong> {asset.nomineeName}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {asset.identifier && (
                            <span>
                              <strong>{isHi ? "पहचान / खाता नं:" : "Identifier:"}</strong> {asset.identifier}
                            </span>
                          )}
                          {asset.addressOrInstitution && (
                            <span>
                              <strong>{isHi ? "स्थान / संस्थान:" : "Institution / Loc:"}</strong> {asset.addressOrInstitution}
                            </span>
                          )}
                          {asset.jointOwnerName && (
                            <span>
                              <strong>{isHi ? "सह-स्वामी:" : "Co-owner:"}</strong> {asset.jointOwnerName}
                              {asset.jointOwnerRelationship ? ` (${asset.jointOwnerRelationship})` : ""}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Valuation & Action Controls */}
                <div className="asset-item-actions" style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: "0.68rem", textTransform: "uppercase", color: "var(--color-slate)", fontWeight: 700 }}>
                      {isInsurance ? (isHi ? "बीमा राशि / मूल्य" : "Sum Assured") : (isHi ? "अनुमानित मूल्य" : "Estimated Value")}
                    </span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      {formatCurrency(asset.approximateValue)}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(asset)}
                      title={isHi ? "संपादित करें" : "Edit Asset"}
                      style={{
                        padding: "0.35rem 0.65rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        backgroundColor: "#FFFFFF",
                        color: "var(--color-navy)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Pencil size={13} />
                      <span>{isHi ? "संपादित करें" : "Edit"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAsset(asset.id)}
                      title={isHi ? "हटाएं" : "Remove Asset"}
                      style={{
                        padding: "0.35rem 0.6rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(225, 29, 72, 0.2)",
                        backgroundColor: "#FFFFFF",
                        color: "#E11D48",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Trash2 size={13} />
                      <span>{isHi ? "हटाएं" : "Remove"}</span>
                    </button>
                  </div>
                </div>
              </div>
              </React.Fragment>
            );
          })
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1.5px dashed rgba(27, 42, 74, 0.12)",
              padding: "2rem 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Boxes size={32} color="var(--color-slate)" />
            <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {isHi ? "इस श्रेणी में कोई संपत्ति दर्ज नहीं है" : "No assets in this category yet"}
            </h4>
            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--color-slate)" }}>
              {isHi
                ? "ऊपर दिए गए बॉक्स के '+' चिह्न पर क्लिक करके संपत्ति दर्ज करें।"
                : "Click the '+' plus button on any category box above to add your asset."}
            </p>
            <button
              type="button"
              onClick={() => handleOpenAdd(activeFilter === "all" ? "bank_account" : (activeFilter as AssetCategory))}
              className="btn btn-gold"
              style={{
                marginTop: "0.5rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
              }}
            >
              <Plus size={14} strokeWidth={2.5} /> {isHi ? "+ नई संपत्ति जोड़ें" : "+ Add New Asset"}
            </button>
          </div>
        )}
      </div>

      {/* Empty Assets Warning Banner */}
      {showEmptyWarning && (
        <div
          role="alert"
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "#FFFBEB",
            border: "1.5px solid #FCD34D",
            borderRadius: "16px",
            color: "#92400E",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
            <div>
              <strong style={{ fontSize: "0.925rem", display: "block", marginBottom: "0.25rem", color: "#78350F" }}>
                {isHi ? "कोई संपत्ति नहीं जोड़ी गई" : "No Assets Added Yet"}
              </strong>
              <span style={{ fontSize: "0.825rem", lineHeight: 1.5 }}>
                {isHi
                  ? "वसीयत आपकी संपत्तियों, बैंक खातों या बचत को वितरित करती है। अगले चरण में जाने के लिए कृपया कम से कम एक संपत्ति जोड़ें।"
                  : "You haven't added any assets yet. You'll need at least one asset to distribute to your beneficiaries in the next step. Would you like to add one now?"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.65rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => {
                setShowEmptyWarning(false);
                handleOpenAdd("bank_account");
              }}
              className="btn btn-gold"
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isHi ? "+ संपत्ति जोड़ें" : "+ Add Asset"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowEmptyWarning(false);
                onUpdate((prev) => ({ ...prev, assets }));
                onNext();
              }}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "10px",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "1px solid #D97706",
                color: "#78350F",
                cursor: "pointer",
              }}
            >
              {isHi ? "बिना संपत्ति के आगे बढ़ें" : "Proceed Anyway"}
            </button>
          </div>
        </div>
      )}

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={handleProceed} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ADD / EDIT ASSET MODAL SHEET
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.65)",
            backdropFilter: "blur(12px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="wizard-modal-sheet"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "2rem 2.25rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div
              style={{
                width: "42px",
                height: "4px",
                borderRadius: "999px",
                backgroundColor: "rgba(27, 42, 74, 0.2)",
                margin: "-0.5rem auto 1.25rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 800 }}>
                  {editingAssetId
                    ? (isHi ? "संपत्ति विवरण संपादित करें" : "Edit Asset Details")
                    : (isHi ? "नई संपत्ति दर्ज करें" : "Add Asset to Schedule")}
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  {isHi
                    ? "भारतीय उत्तराधिकार कानून के अनुसार संपत्ति का सटीक विवरण दर्ज करें।"
                    : "Specify verified identifiers and valuation for seamless transmission under Indian law."}
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

            <form onSubmit={handleSaveAsset} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Actionable Human Error Notice in Modal */}
              {modalError && (
                <div
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.65rem 0.95rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(225, 29, 72, 0.08)",
                    border: "1.5px solid #FDA4AF",
                    color: "#BE123C",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{modalError}</span>
                </div>
              )}
              {/* Category Selector Grid */}
              <div>
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                  <span>{isHi ? "संपत्ति श्रेणी चुनें *" : "Asset Category *"}</span>
                  <InfoTooltip
                    text="Choose the category that best matches this asset. Each category tailors the legal clauses in Schedule A of your Will (e.g., Survey/Flat No. for real estate vs. Policy No. for insurance)."
                    hindiText="वह श्रेणी चुनें जो इस संपत्ति से सबसे अच्छी तरह मेल खाती हो। प्रत्येक श्रेणी आपकी वसीयत की अनुसूची A (Schedule A) में कानूनी विवरण को अनुकूलित करती है।"
                  />
                </label>
                <div className="asset-modal-cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.45rem" }}>
                  {primaryBoxes.map((box) => {
                    const cfg = categoryConfigs[box.id] || categoryConfigs.other;
                    const isSel = category === box.id;
                    const CatIcon = cfg.Icon;

                    return (
                      <button
                        key={box.id}
                        type="button"
                        onClick={() => {
                          setCategory(box.id);
                          setTypeDetails(cfg.quickTypes[0]);
                          setApproximateValue(box.defaultVal);
                          if (box.id === "insurance") {
                            setSumAssured(box.defaultVal);
                          }
                        }}
                        style={{
                          padding: "0.65rem 0.4rem",
                          borderRadius: "12px",
                          border: isSel ? `2px solid ${cfg.color}` : "1px solid rgba(27, 42, 74, 0.1)",
                          backgroundColor: isSel ? `${cfg.color}12` : "#FFFFFF",
                          color: isSel ? "var(--color-navy)" : "var(--color-slate)",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.3rem",
                          textAlign: "center",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <CatIcon size={18} color={isSel ? cfg.color : "var(--color-slate)"} />
                        <span style={{ fontSize: "0.7rem", fontWeight: isSel ? 700 : 500, lineHeight: 1.2 }}>
                          {isHi ? cfg.hindiLabel : cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  CUSTOM ASSET CLASSIFICATION INPUT (When category === "other")
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {category === "other" && (
                <div
                  style={{
                    backgroundColor: "rgba(234, 88, 12, 0.06)",
                    border: "1.5px solid rgba(234, 88, 12, 0.25)",
                    borderRadius: "14px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                  }}
                >
                  <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 800, color: "#C2410C" }}>
                    <span>{isHi ? "कस्टम संपत्ति वर्गीकरण / प्रकार *" : "Custom Asset Classification / Type *"}</span>
                    <InfoTooltip
                      text="Describe the specific category of this asset (e.g., 'Cryptocurrency Hardware Wallet', 'Fine Art & Paintings', 'Intellectual Property / Patents', or 'Personal Loan Receivable')."
                      hindiText="इस विशेष संपत्ति के प्रकार का वर्णन करें (जैसे, 'क्रिप्टोकरेंसी हार्डवेयर वॉलेट', 'पेंटिंग और कलाकृतियां', 'बौद्धिक संपदा / पेटेंट', या 'दिया गया व्यक्तिगत ऋण')।"
                    />
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      isHi
                        ? "उदा: प्राचीन कलाकृतियां, क्रिप्टो हार्डवेयर वॉलेट, बौद्धिक संपदा..."
                        : "e.g., Rare Art & Antiques, Cryptocurrency Hardware Wallet, Patent / Royalty..."
                    }
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(sanitizeNameInput(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(234, 88, 12, 0.3)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      backgroundColor: "#FFFFFF",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "#9A3412" }}>
                    {isHi ? "त्वरित सुझाव:" : "Quick Suggestions:"}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {[
                      "Artwork & Paintings",
                      "Cryptocurrency Hardware Vault",
                      "Intellectual Property / Trademark",
                      "Agricultural Machinery",
                      "Club Equity / Membership",
                      "Personal Loan Receivable",
                    ].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          setCustomCategoryName(sug);
                          if (!name) setName(sug);
                        }}
                        style={{
                          padding: "0.2rem 0.55rem",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(234, 88, 12, 0.25)",
                          color: "#C2410C",
                          cursor: "pointer",
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-type Classification Pills (for standard categories) */}
              {category !== "other" && (
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-slate)", marginBottom: "0.4rem" }}>
                    <span>{isHi ? "विशिष्ट वर्गीकरण:" : "Asset Classification / Sub-type:"}</span>
                    <InfoTooltip
                      text="Click a sub-type pill (e.g., 'Savings Account', 'Fixed Deposit (FD)', 'Residential Flat / Apartment', 'Demat / Stock Portfolio') to classify the exact nature of the asset."
                      hindiText="संपत्ति की सटीक प्रकृति को वर्गीकृत करने के लिए किसी एक विकल्प (जैसे, 'बचत खाता', 'फिक्स्ड डिपॉजिट', 'आवासीय फ्लैट', 'डीमैट खाता') पर क्लिक करें।"
                    />
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {(categoryConfigs[category]?.quickTypes || []).map((typeOpt) => (
                      <button
                        key={typeOpt}
                        type="button"
                        onClick={() => setTypeDetails(typeOpt)}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "999px",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          backgroundColor: typeDetails === typeOpt ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                          color: typeDetails === typeOpt ? "#FFFFFF" : "var(--color-navy)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {typeOpt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Asset Title / Name */}
              <div>
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  <span>
                    {category === "insurance"
                      ? (isHi ? "बीमा पॉलिसी का नाम / शीर्षक *" : "Insurance Policy Title & Plan Name *")
                      : (isHi ? "संपत्ति का शीर्षक व नाम *" : "Asset Title & Identification Name *")}
                  </span>
                  <InfoTooltip
                    text="Give this asset a clear, recognizable title that will appear as its heading in Schedule A of your Will (e.g., 'HDFC Savings Account - Indiranagar' or '3BHK Apartment in Powai, Mumbai')."
                    hindiText="इस संपत्ति को एक स्पष्ट और पहचानने योग्य शीर्षक दें जो आपकी वसीयत की अनुसूची A में इसके मुख्य नाम के रूप में दिखाई देगा (जैसे, 'एचडीएफसी बचत खाता' या 'पवई, मुंबई में 3BHK फ्लैट')।"
                  />
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    category === "property"
                      ? "e.g., 3BHK Apartment in DLF Phase 5"
                      : category === "bank_account"
                      ? "e.g., HDFC Bank Savings & Fixed Deposits"
                      : category === "insurance"
                      ? "e.g., HDFC Life Click 2 Protect Term Plan"
                      : category === "investments"
                      ? "e.g., Zerodha Demat Equity & Mutual Funds"
                      : category === "vehicles"
                      ? "e.g., Hyundai Creta SX (Petrol)"
                      : category === "other"
                      ? "e.g., Oil Canvas Paintings & Antiques"
                      : "e.g., Asset description"
                  }
                  value={name}
                  onChange={(e) => setName(toTitleCaseText(e.target.value))}
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

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  DETAILED INSURANCE POLICY FIELDS
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              {category === "insurance" ? (
                <div
                  style={{
                    backgroundColor: "rgba(2, 132, 199, 0.05)",
                    border: "1.5px solid rgba(2, 132, 199, 0.2)",
                    borderRadius: "14px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <ShieldCheck size={16} color="#0284C7" />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0369A1", textTransform: "uppercase" }}>
                      {isHi ? "बीमा पॉलिसी का विस्तृत विवरण" : "Insurance Policy Specification"}
                    </span>
                  </div>

                  {/* Insurer Company with Quick Select */}
                  <div>
                    <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                      <span>{isHi ? "बीमा प्रदाता कंपनी *" : "Insurance Provider / Company *"}</span>
                      <InfoTooltip
                        text="Enter the full name of the insurance company issuing the policy (e.g., 'LIC of India', 'HDFC Life Insurance', 'ICICI Prudential')."
                        hindiText="पॉलिसी जारी करने वाली बीमा कंपनी का पूरा नाम दर्ज करें (जैसे, 'भारतीय जीवन बीमा निगम (LIC)', 'एचडीएफसी लाइफ', 'आईसीआईसीआई प्रूडेंशियल')।"
                      />
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Life Insurance Corporation (LIC) / HDFC Life"
                      value={insuranceCompany}
                      onChange={(e) => setInsuranceCompany(toTitleCaseText(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
                      {[
                        "LIC of India",
                        "HDFC Life",
                        "ICICI Prudential",
                        "SBI Life",
                        "Max Life",
                        "Tata AIA",
                        "Bajaj Allianz",
                      ].map((cmp) => (
                        <button
                          key={cmp}
                          type="button"
                          onClick={() => {
                            setInsuranceCompany(cmp);
                            if (!name) setName(`${cmp} Policy`);
                          }}
                          style={{
                            padding: "0.2rem 0.55rem",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            backgroundColor: insuranceCompany === cmp ? "#0284C7" : "#FFFFFF",
                            color: insuranceCompany === cmp ? "#FFFFFF" : "#0369A1",
                            border: "1px solid rgba(2, 132, 199, 0.25)",
                            cursor: "pointer",
                          }}
                        >
                          {cmp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Policy Number and Nominee Row */}
                  <div className="wizard-modal-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        <span>{isHi ? "पॉलिसी नंबर *" : "Policy Number *"}</span>
                        <InfoTooltip
                          text="Enter the exact policy number printed on your insurance policy bond so your beneficiaries can file claims without delay."
                          hindiText="अपने बीमा पॉलिसी बॉन्ड पर छपा सटीक पॉलिसी नंबर दर्ज करें ताकि आपके लाभार्थी बिना किसी देरी के दावा (क्लेम) कर सकें।"
                        />
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 987654321"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(normalizeIdCode(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        <span>{isHi ? "दर्ज नामिती (Nominee)" : "Nominee Recorded with Insurer"}</span>
                        <InfoTooltip
                          text="Enter the name of the person currently listed as the nominee on your policy record. Under Indian law, a nominee is typically a custodian/trustee who receives the payout, whereas the beneficiary named in your Will is the ultimate legal owner."
                          hindiText="पॉलिसी रिकॉर्ड में वर्तमान में दर्ज नॉमिनी का नाम लिखें। भारतीय कानून के तहत नॉमिनी केवल राशि प्राप्त करने वाला ट्रस्टी होता है, जबकि वसीयत में नामित लाभार्थी ही उस राशि का अंतिम कानूनी मालिक होता है।"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Spouse or Child Name"
                        value={nomineeName}
                        onChange={(e) => setNomineeName(sanitizeNameInput(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Identifier & Institution Row */
                <div className="wizard-modal-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  <div>
                    <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                      <span>
                        {category === "bank_account"
                          ? (isHi ? "खाता संख्या (Account No.)" : "Account / Deposit Number")
                          : category === "property"
                          ? (isHi ? "सर्वे / खाता / फ्लैट संख्या" : "Survey / Khata / Flat No.")
                          : category === "vehicles"
                          ? (isHi ? "वाहन पंजीकरण संख्या (Reg No.)" : "Vehicle Registration No.")
                          : (isHi ? "पहचान संदर्भ / संख्या" : "Identifier / Account / Reference No.")}
                      </span>
                      <InfoTooltip
                        text="Enter the unique identifying number for this asset: Account/FD/Locker No. (full or last 4 digits) for banks; Flat/Plot/Survey/CTS No. for property; Demat BO ID or Folio No. for investments; Registration No. for vehicles; or CIN/GSTIN for businesses."
                        hindiText="इस संपत्ति की विशिष्ट पहचान संख्या दर्ज करें: बैंक के लिए खाता/एफडी/लॉकर नंबर (पूरा या अंतिम 4 अंक); संपत्ति के लिए फ्लैट/प्लॉट/सर्वे/खसरा नंबर; निवेश के लिए डीमैट आईडी या फोलियो नंबर; वाहन के लिए पंजीकरण संख्या।"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder={
                        category === "bank_account"
                          ? "e.g., A/C ending 4120"
                          : category === "property"
                          ? "e.g., Survey #412/A, Flat 802"
                          : category === "vehicles"
                          ? "e.g., DL 01 AB 1234"
                          : "e.g., Reference / Identifier"
                      }
                      value={identifier}
                      onChange={(e) => setIdentifier(normalizeIdCode(e.target.value))}
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
                    <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                      <span>
                        {category === "bank_account"
                          ? (isHi ? "बैंक एवं शाखा" : "Bank Name & Branch")
                          : category === "property"
                          ? (isHi ? "संपत्ति का पता / शहर" : "Property Address & City")
                          : category === "investments"
                          ? (isHi ? "ब्रोकर / डिपॉजिटरी" : "Broker / Depository (e.g. Zerodha)")
                          : (isHi ? "स्थान / संस्थान" : "Location / Institution / Custodian")}
                      </span>
                      <InfoTooltip
                        text="Specify where this asset is located or held—for example, the Bank Name & Branch address, the complete postal address of the real estate property, the Broker/Depository (Zerodha/CDSL/NSDL), or the safe locker location where jewellery is stored."
                        hindiText="बताएं कि यह संपत्ति कहां स्थित या रखी गई है—उदाहरण के लिए, बैंक का नाम और शाखा, अचल संपत्ति का पूरा डाक पता, ब्रोकर/डिपॉजिटरी (Zerodha/CDSL/NSDL), या वह लॉकर जहां गहने रखे हैं।"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder={
                        category === "bank_account"
                          ? "e.g., HDFC Bank, Connaught Place"
                          : category === "property"
                          ? "e.g., Gurgaon, Haryana"
                          : "e.g., Institution / City"
                      }
                      value={addressOrInstitution}
                      onChange={(e) => setAddressOrInstitution(toTitleCaseText(e.target.value))}
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
              )}

              {/* Valuation Input & Presets */}
              <div
                style={{
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  borderRadius: "16px",
                  padding: "1.15rem",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    <span>
                      {category === "insurance"
                        ? (isHi ? "बीमा सुरक्षा राशि (Sum Assured)" : "Policy Sum Assured / Maturity Benefit")
                        : (isHi ? "अनुमानित संपत्ति मूल्यांकन" : "Estimated Asset Valuation")}
                    </span>
                    <InfoTooltip
                      text="Enter an approximate current market value or sum assured in Rupees (₹). An exact rupee figure is not required for your Will to be legally valid—this estimate helps you visualize whether your overall wealth distribution across family members is fair."
                      hindiText="रुपये (₹) में अनुमानित वर्तमान बाजार मूल्य या बीमा राशि दर्ज करें। वसीयत की कानूनी वैधता के लिए एकदम सटीक मूल्य आवश्यक नहीं है—यह अनुमान आपको परिवार के सदस्यों के बीच संपत्ति के संतुलित वितरण को समझने में मदद करता है।"
                    />
                  </span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {formatCurrency(category === "insurance" ? sumAssured : approximateValue)}
                  </span>
                </div>

                {/* Quick Presets */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
                  {[
                    { label: "₹ 10 L", val: 1000000 },
                    { label: "₹ 25 L", val: 2500000 },
                    { label: "₹ 50 L", val: 5000000 },
                    { label: "₹ 1.00 Cr", val: 10000000 },
                    { label: "₹ 2.00 Cr", val: 20000000 },
                    { label: "₹ 5.00 Cr", val: 50000000 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => {
                        if (category === "insurance") {
                          setSumAssured(preset.val);
                        }
                        setApproximateValue(preset.val);
                      }}
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "8px",
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        backgroundColor:
                          (category === "insurance" ? sumAssured : approximateValue) === preset.val
                            ? "var(--color-gold)"
                            : "#FFFFFF",
                        color:
                          (category === "insurance" ? sumAssured : approximateValue) === preset.val
                            ? "#FFFFFF"
                            : "var(--color-slate)",
                        border: "1px solid rgba(23, 34, 40, 0.12)",
                        cursor: "pointer",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <IndianAmountInput
                  aria-label={category === "insurance" ? "Sum assured" : "Estimated asset valuation"}
                  value={category === "insurance" ? sumAssured : approximateValue}
                  placeholder="e.g. 25,00,000"
                  onValueChange={(v) => {
                    if (category === "insurance") setSumAssured(v);
                    setApproximateValue(v);
                  }}
                />
              </div>

              {/* Ownership Title Segmented Control */}
              <div>
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                  <span>{isHi ? "स्वामित्व प्रकार (Ownership Title)" : "Ownership Title"}</span>
                  <InfoTooltip
                    text="Select 'Solely Owned (100%)' if the asset is exclusively in your name. Select 'Jointly Owned' if the property deed, bank account, or investment is co-owned with another person."
                    hindiText="यदि संपत्ति पूरी तरह से आपके अकेले के नाम पर है तो 'पूर्ण स्वामित्व (100%)' चुनें। यदि संपत्ति के दस्तावेज या बैंक खाते में कोई सह-स्वामी भी है, तो 'संयुक्त स्वामित्व (Joint)' चुनें।"
                  />
                </label>
                <AppleSegmentedControl
                  options={[
                    { value: "sole", label: isHi ? "पूर्ण स्वामित्व (100% Sole)" : "Solely Owned (100%)" },
                    { value: "joint", label: isHi ? "संयुक्त स्वामित्व (Joint)" : "Jointly Owned with Co-owner" },
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
                  <div className="wizard-modal-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                        <span>{isHi ? "सह-स्वामी का पूरा नाम *" : "Joint Owner Full Name *"}</span>
                        <InfoTooltip
                          text="Enter the full legal name of the co-owner who holds this asset jointly with you on the official title deed or bank record."
                          hindiText="आधिकारिक टाइटल डीड या बैंक रिकॉर्ड में आपके साथ इस संपत्ति के सह-स्वामी का पूरा कानूनी नाम दर्ज करें।"
                        />
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Sunita Sharma"
                        value={jointOwnerName}
                        onChange={(e) => setJointOwnerName(sanitizeNameInput(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "0.7rem 0.85rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                        <span>{isHi ? "सह-स्वामी से संबंध *" : "Relationship with Joint Owner *"}</span>
                        <InfoTooltip
                          text="Specify how the co-owner is related to you (e.g., 'Spouse', 'Son', 'Brother', 'Business Partner')."
                          hindiText="बताएं कि सह-स्वामी आपसे कैसे संबंधित है (जैसे, 'जीवनसाथी', 'बेटा', 'भाई', 'बिजनेस पार्टनर')।"
                        />
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Spouse, Brother, Father"
                        value={jointOwnerRelationship}
                        onChange={(e) => setJointOwnerRelationship(sanitizeNameInput(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "0.7rem 0.85rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "-0.35rem" }}>
                    {["Spouse", "Father", "Mother", "Son", "Daughter", "Brother", "Sister", "Business Partner"].map((relOpt) => (
                      <button
                        key={relOpt}
                        type="button"
                        onClick={() => setJointOwnerRelationship(relOpt)}
                        style={{
                          padding: "0.2rem 0.55rem",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          backgroundColor: jointOwnerRelationship === relOpt ? "#C65378" : "#FFFFFF",
                          color: jointOwnerRelationship === relOpt ? "#FFFFFF" : "var(--color-navy)",
                          border: "1px solid rgba(198, 83, 120, 0.25)",
                          cursor: "pointer",
                        }}
                      >
                        {relOpt}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                        <span>{isHi ? "आपका मालिकाना हिस्सा (%)" : "Your Ownership Share (%)"}</span>
                        <InfoTooltip
                          text="Enter the percentage share of this asset that you legally own (e.g., 50%). Under Indian law, you can only bequeath your own undivided right, title, and share in a jointly owned asset."
                          hindiText="इस संपत्ति में अपने कानूनी स्वामित्व का प्रतिशत हिस्सा दर्ज करें (जैसे, 50%)। भारतीय कानून के तहत आप संयुक्त संपत्ति में केवल अपने स्वयं के अविभाजित हिस्से की ही वसीयत कर सकते हैं।"
                        />
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          value={ownershipPercentage ? String(ownershipPercentage) : ""}
                          onChange={(e) => {
                            const p = sanitizePercent(e.target.value);
                            setOwnershipPercentage(p ? Math.min(99, parseInt(p, 10)) : 0);
                          }}
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
                        <span style={{ fontWeight: 800, color: "var(--color-navy)" }}>%</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
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
                  </div>
                </div>
              )}

              {/* Loan / Encumbrance Switch & Details (Section 167, Indian Succession Act, 1925) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: "rgba(27, 42, 74, 0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      <span>{isHi ? "सक्रिय ऋण / बंधक दायित्व है (धारा 167)" : "Has active loan / mortgage encumbrance (Sec. 167)"}</span>
                      <InfoTooltip
                        text="Switch ON if this asset has an active home loan, car loan, or mortgage. Under Section 167 of the Indian Succession Act, 1925, the beneficiary who inherits a mortgaged asset is legally responsible for paying off the remaining loan unless you explicitly state here that the loan should be settled from your general estate."
                        hindiText="यदि इस संपत्ति पर कोई सक्रिय होम लोन, कार लोन या मॉर्गेज है तो इसे चालू (ON) करें। भारतीय उत्तराधिकार अधिनियम, 1925 की धारा 167 के तहत, जब तक आप स्पष्ट रूप से अन्यथा निर्देश न दें, गिरवी रखी गई संपत्ति पाने वाला लाभार्थी ही शेष ऋण चुकाने के लिए उत्तरदायी होता है।"
                      />
                    </div>
                    <div style={{ fontSize: "0.725rem", color: "var(--color-slate)" }}>
                      {isHi
                        ? "धारा 167 के तहत यह स्पष्ट करता है कि ऋण का भुगतान कौन करेगा"
                        : "Specifies loan liability details under Section 167 of the Indian Succession Act"}
                    </div>
                  </div>
                  <AppleSwitch checked={hasLoan} onChange={setHasLoan} />
                </div>

                {hasLoan && (
                  <div style={{ marginTop: "0.25rem" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                      <span>{isHi ? "ऋणदाता बैंक / ऋण विवरण एवं निर्देश" : "Lender Bank, Loan Account & Repayment Direction"}</span>
                      <InfoTooltip
                        text="Mention the bank/lender name, loan account number, and clarify whether the loan will be cleared by the inheriting beneficiary, covered by a loan-protection insurance policy, or paid out of your general estate."
                        hindiText="ऋणदाता बैंक का नाम, लोन खाता संख्या लिखें और स्पष्ट करें कि शेष ऋण लाभार्थी द्वारा चुकाया जाएगा, लोन-बीमा से कवर होगा, या आपकी सामान्य संपदा से भुगतान किया जाएगा।"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder={
                        isHi
                          ? "उदा: SBI होम लोन खाता नं. 12345 (लाभार्थी द्वारा देय)"
                          : "e.g., SBI Home Loan A/c 12345 - to be discharged by beneficiary"
                      }
                      value={loanDetails}
                      onChange={(e) => setLoanDetails(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(27, 42, 74, 0.15)",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFFFFF",
                        color: "var(--color-navy)",
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Optional Asset-Specific Direction / Special Instructions */}
              <div>
                <label style={{ display: "inline-flex", alignItems: "center", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  <span>{isHi ? "विशेष निर्देश / शर्त (वैकल्पिक)" : "Specific Direction / Condition for this Asset (Optional)"}</span>
                  <InfoTooltip
                    text="Add any practical instructions or conditions for this asset (e.g., 'Original registry papers are kept in SBI Locker #42', 'To be sold and proceeds divided', or 'Use for granddaughter's higher education')."
                    hindiText="इस संपत्ति के लिए कोई व्यावहारिक निर्देश या शर्त जोड़ें (जैसे, 'मूल रजिस्ट्री के कागजात एसबीआई लॉकर #42 में रखे हैं', या 'बेचकर प्राप्त राशि लाभार्थियों में बांटी जाए')।"
                  />
                </label>
                <input
                  type="text"
                  placeholder={
                    isHi
                      ? "उदा: लॉकर की चाबी अलमारी में है / सह-स्वामी के बाद हस्तांतरण"
                      : "e.g., Locker key kept in home safe / specific handover instruction"
                  }
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Actions */}
              <div className="wizard-modal-actions" style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
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
                  {isHi ? "रद्द करें" : "Cancel"}
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
                    ? (isHi ? "बदलाव सहेजें" : "Save Changes")
                    : (isHi ? "संपत्ति सहेजें" : "Save Asset to Schedule")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
