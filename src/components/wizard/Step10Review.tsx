"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useWillStore } from "@/lib/useWillStore";
import {
  WillDraftingState,
  Asset,
  FamilyMember,
  BeneficiaryAllocation,
  PersonContact,
  SpecialWishes,
  saveStoredWillState,
  AssetCategory,
  formatDDMMYYYY,
  generateWillClauses,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import {
  User,
  Users,
  Landmark,
  PieChart,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Edit3,
  Building,
  Briefcase,
  Car,
  Gem,
  Search,
  Sparkles,
  Heart,
  Mail,
  MapPin,
  CreditCard,
  ScrollText,
  FileText,
  Plus,
  Trash2,
  Check,
  X,
  Phone,
  Eye,
  AlertCircle,
  Lock,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import CloudSyncBadge from "@/components/wizard/CloudSyncBadge";
import WillVerificationModal from "@/components/wizard/WillVerificationModal";
import { useLanguage } from "@/context/LanguageContext";
import { lookupStateFromPin, fetchPincodeDetails } from "@/lib/pincode";
import { sanitizeNameInput, sanitizePan, formatAadhaar, normalizeEmail, toTitleCaseText, toSentenceCase, normalizeIdCode } from "@/lib/inputSanitizers";

interface Step10ReviewProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onJumpToStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

type ModalType =
  | "testator"
  | "family_edit"
  | "asset_view"
  | "asset_edit"
  | "allocations"
  | "executors"
  | "wishes"
  | "emotional"
  | null;

export default function Step10Review({
  state: propState,
  onUpdate: propOnUpdate,
  onJumpToStep,
  onNext,
  onBack,
  lang: propLang,
}: Step10ReviewProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const isHi = propLang === "hi" || context.lang === "hi";
  const testator = state.testator;
  const family = state.familyMembers || [];
  const assets = state.assets || [];
  const allocations = state.allocations || [];
  const isLocked = Boolean(state.detailsVerified);

  // Active in-place modal and item selection
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);

  // In-place form draft states for existing items
  const [testatorDraft, setTestatorDraft] = useState(testator);
  const [familyDraft, setFamilyDraft] = useState<Partial<FamilyMember>>({});
  const [assetDraft, setAssetDraft] = useState<Partial<Asset>>({});
  const [assetDraftAllocation, setAssetDraftAllocation] = useState<{ beneficiaryId: string; percentage: number }>({
    beneficiaryId: family[0]?.id || "",
    percentage: 100,
  });
  const [executorsDraft, setExecutorsDraft] = useState({
    primary: state.executorPrimary || { name: "", relationship: "spouse", address: "", phone: "", email: "" },
    alternate: state.executorAlternate || { name: "", relationship: "sibling", address: "", phone: "", email: "" },
    guardianPrimary: state.guardianPrimary || { name: "", relationship: "relative", address: "", phone: "", email: "" },
    guardianAlternate: state.guardianAlternate || { name: "", relationship: "relative", address: "", phone: "", email: "" },
  });
  const [wishesDraft, setWishesDraft] = useState<SpecialWishes>(state.specialWishes || {});
  const [emotionalDraft, setEmotionalDraft] = useState(state.emotionalReason || "");
  const [residuaryDraft, setResiduaryDraft] = useState({
    primary: state.residuaryBeneficiaryName || family[0]?.name || "",
    alternate: state.residuaryAlternateName || family[1]?.name || "",
  });

  useEffect(() => {
    setTestatorDraft(state.testator);
    setExecutorsDraft({
      primary: state.executorPrimary || { name: "", relationship: "spouse", address: "", phone: "", email: "" },
      alternate: state.executorAlternate || { name: "", relationship: "sibling", address: "", phone: "", email: "" },
      guardianPrimary: state.guardianPrimary || { name: "", relationship: "relative", address: "", phone: "", email: "" },
      guardianAlternate: state.guardianAlternate || { name: "", relationship: "relative", address: "", phone: "", email: "" },
    });
    setWishesDraft(state.specialWishes || {});
    setEmotionalDraft(state.emotionalReason || "");
    setResiduaryDraft({
      primary: state.residuaryBeneficiaryName || (state.familyMembers || [])[0]?.name || "",
      alternate: state.residuaryAlternateName || (state.familyMembers || [])[1]?.name || "",
    });
  }, [
    state.testator,
    state.executorPrimary,
    state.executorAlternate,
    state.guardianPrimary,
    state.guardianAlternate,
    state.specialWishes,
    state.emotionalReason,
    state.residuaryBeneficiaryName,
    state.residuaryAlternateName,
    state.familyMembers,
  ]);

  // Step-by-Step 1-by-1 Category Review State (User Request: Review details 1 by 1 by categories instead of all at once)
  const [reviewMode, setReviewMode] = useState<"stepped" | "all">("stepped");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [reviewedCategoryIds, setReviewedCategoryIds] = useState<Set<string>>(new Set());
  const [modifiedCategoryIds, setModifiedCategoryIds] = useState<Set<string>>(new Set());

  // 1-by-1 Sub-Item Steppers for Category 3 (Assets) and Category 4 (Allocations)
  const [activeAssetIndex, setActiveAssetIndex] = useState<number>(0);
  const [assetViewMode, setAssetViewMode] = useState<"single" | "table" | "category">("single");

  const [activeAllocAssetIndex, setActiveAllocAssetIndex] = useState<number>(0);
  const [allocReviewMode, setAllocReviewMode] = useState<"single" | "summary">("single");

  // Invalidate reviewed status on data modification so user re-verifies altered data
  const invalidateCategoryReview = (catIds: string[]) => {
    if (isLocked) return;
    onUpdate?.((prev) => ({ ...prev, isReviewed: false }));
    if (typeof window !== "undefined") {
      localStorage.removeItem("willdrafting_review_completed");
    }
    setReviewedCategoryIds((prev) => {
      const next = new Set(prev);
      catIds.forEach((id) => next.delete(id));
      return next;
    });
    setModifiedCategoryIds((prev) => {
      const next = new Set(prev);
      catIds.forEach((id) => next.add(id));
      return next;
    });
  };

  // Expandable table rows state (stores set of expanded asset IDs for inline deep-dossier view)
  const [expandedAssetIds, setExpandedAssetIds] = useState<Record<string, boolean>>({});

  const toggleAssetExpand = (id: string) => {
    setExpandedAssetIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllExpanded = useMemo(() => {
    return assets.length > 0 && assets.every((a) => expandedAssetIds[a.id]);
  }, [assets, expandedAssetIds]);

  const handleToggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedAssetIds({});
    } else {
      const all: Record<string, boolean> = {};
      assets.forEach((a) => {
        all[a.id] = true;
      });
      setExpandedAssetIds(all);
    }
  };

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Safe State Updater - commits synchronously without page redirect
  const applyStateUpdate = (updater: (prev: WillDraftingState) => WillDraftingState) => {
    if (isLocked) return;
    if (onUpdate) {
      onUpdate(updater);
    } else {
      const updated = updater(state);
      saveStoredWillState(updated);
    }
  };

  // Controls for Large Asset Dataset UX
  const [assetSearchQuery, setAssetSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Valuation helper
  const totalValuation = useMemo(() => {
    return assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);
  }, [assets]);

  const formatCurrency = (val?: number) => {
    if (!val || val === 0) return "₹0";
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Testator formatted legal metadata
  const testatorAge = useMemo(() => {
    if (!testator.dob) return null;
    const birth = new Date(testator.dob);
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  }, [testator.dob]);

  const testatorDobFormatted = useMemo(() => {
    if (!testator.dob) return null;
    return formatDDMMYYYY(testator.dob);
  }, [testator.dob]);


  // Asset categorization groups
  const categorizedAssets = useMemo(() => {
    const groups: Record<
      string,
      { label: string; icon: React.ReactNode; color: string; items: Asset[]; total: number }
    > = {
      business: { label: "Startup Equity & Companies", icon: <Briefcase size={14} />, color: "#172228", items: [], total: 0 },
      property: { label: "Real Estate & Immovable", icon: <Building size={14} />, color: "#5F7E75", items: [], total: 0 },
      bank_account: { label: "Bank Accounts & FDs", icon: <Landmark size={14} />, color: "#C65378", items: [], total: 0 },
      investments: { label: "Mutual Funds & Demat", icon: <CreditCard size={14} />, color: "#2563EB", items: [], total: 0 },
      vehicles: { label: "Motor Vehicles", icon: <Car size={14} />, color: "#49585F", items: [], total: 0 },
      jewellery: { label: "Gold & Valuables", icon: <Gem size={14} />, color: "#D97706", items: [], total: 0 },
      other: { label: "Other Belongings", icon: <FileText size={14} />, color: "#64748B", items: [], total: 0 },
    };

    assets.forEach((a) => {
      let key: string = a.category?.toLowerCase() || "other";
      if (key === "investment" || key === "shares" || key === "mutual_funds" || key === "digital" || key === "insurance") {
        key = "investments";
      }
      if (!groups[key]) {
        groups[key] = { label: key.replace(/_/g, " "), icon: <FileText size={14} />, color: "#49585F", items: [], total: 0 };
      }
      groups[key].items.push(a);
      groups[key].total += a.approximateValue || 0;
    });

    return Object.entries(groups).filter(([_, grp]) => grp.items.length > 0);
  }, [assets]);

  // Filtered assets for tabular view
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const q = assetSearchQuery.trim().toLowerCase();
      const currentAlc = allocations.find((alc) => alc.assetId === asset.id);
      const matchesSearch =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        (asset.category && asset.category.toLowerCase().includes(q)) ||
        (asset.typeDetails && asset.typeDetails.toLowerCase().includes(q)) ||
        (asset.identifier && asset.identifier.toLowerCase().includes(q)) ||
        (asset.addressOrInstitution && asset.addressOrInstitution.toLowerCase().includes(q)) ||
        (currentAlc?.beneficiaryName && currentAlc.beneficiaryName.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategoryFilter === "all") return true;
      if (selectedCategoryFilter === "business") return asset.category === "business";
      if (selectedCategoryFilter === "property") return asset.category === "property";
      if (selectedCategoryFilter === "bank_account") return asset.category === "bank_account";
      if (selectedCategoryFilter === "investments") {
        return (
          asset.category === "investments" ||
          asset.category === "shares" ||
          asset.category === "mutual_funds" ||
          asset.category === "insurance" ||
          asset.category === "digital"
        );
      }
      if (selectedCategoryFilter === "vehicles") return asset.category === "vehicles";
      if (selectedCategoryFilter === "jewellery") return asset.category === "jewellery";
      return true;
    });
  }, [assets, assetSearchQuery, selectedCategoryFilter, allocations]);

  // Allocations breakdown by beneficiary
  const beneficiaryAllocationSummary = useMemo(() => {
    const summaryMap: Record<
      string,
      { name: string; count: number; totalAssignedValue: number }
    > = {};

    family.forEach((f) => {
      summaryMap[f.id] = { name: f.name, count: 0, totalAssignedValue: 0 };
    });

    allocations.forEach((alc) => {
      const ast = assets.find((a) => a.id === alc.assetId);
      const val = ast?.approximateValue || 0;
      const share = (val * (alc.percentage || 100)) / 100;

      if (summaryMap[alc.beneficiaryId]) {
        summaryMap[alc.beneficiaryId].count += 1;
        summaryMap[alc.beneficiaryId].totalAssignedValue += share;
      } else {
        summaryMap[alc.beneficiaryId] = {
          name: alc.beneficiaryName || "Beneficiary",
          count: 1,
          totalAssignedValue: share,
        };
      }
    });

    return Object.entries(summaryMap).filter(([_, data]) => data.count > 0);
  }, [allocations, assets, family]);

  // Special Wishes items
  const wishesList = useMemo(() => {
    const w = state.specialWishes;
    if (!w) return [];
    const list: { label: string; val: string }[] = [];
    if (w.digitalAccounts) list.push({ label: "Digital Accounts & Cryptographic Passwords", val: w.digitalAccounts });
    if (w.jewelleryInstructions) list.push({ label: "Heirloom & Jewellery Directives", val: w.jewelleryInstructions });
    if (w.personalBelongings) list.push({ label: "Academic, Research & Personal Library", val: w.personalBelongings });
    if (w.charitableGifts) list.push({ label: "Charitable & Institutional Endowment", val: w.charitableGifts });
    if (w.funeralCeremonyWishes) list.push({ label: "Funeral, Cremation & Last Rites", val: w.funeralCeremonyWishes });
    if (w.petsCare) list.push({ label: "Pet Care & Veterinary Maintenance", val: w.petsCare });
    if (w.personalMessageToFamily) list.push({ label: "Personal Message & Blessings to Family", val: w.personalMessageToFamily });
    return list;
  }, [state.specialWishes]);

  // Step-by-Step 1-by-1 Review Categories (Categorized by Wizard Steps)
  const REVIEW_CATEGORIES = useMemo(() => [
    {
      id: "testator",
      stepNum: 2,
      label: "About You",
      hindiLabel: "आपके विवरण",
      fullTitle: "1. Testator Identification & Domicile",
      hindiFullTitle: "1. वसीयतकर्ता पहचान एवं निवास",
      subtitle: "Will Creator, Domicile & Statutory Legal Capacity",
      icon: User,
      color: "#C65378",
      badge: (s: WillDraftingState) => (s.testator?.fullName ? "Verified" : "Action Needed"),
    },
    {
      id: "family",
      stepNum: 3,
      label: "Family & Heirs",
      hindiLabel: "परिवार व उत्तराधिकारी",
      fullTitle: "2. Family Directory & Designated Heirs",
      hindiFullTitle: "2. परिवार सूची व उत्तराधिकारी",
      subtitle: "Spouse, Children, Siblings & Co-beneficiaries",
      icon: Users,
      color: "#2563EB",
      badge: (s: WillDraftingState) => `${s.familyMembers?.length || 0} Heirs`,
    },
    {
      id: "assets",
      stepNum: 4,
      label: "Assets Portfolio",
      hindiLabel: "संपत्ति पोर्टफोलियो",
      fullTitle: "3. Comprehensive Asset Portfolio Register",
      hindiFullTitle: "3. संपूर्ण संपत्ति रजिस्टर",
      subtitle: "Properties, Bank Accounts, Shares, Gold & Valuables",
      icon: Building,
      color: "#5F7E75",
      badge: (s: WillDraftingState) => `${s.assets?.length || 0} Assets`,
    },
    {
      id: "allocations",
      stepNum: 5,
      label: "Allocations & Residuary",
      hindiLabel: "संपत्ति हिस्सा व अवशिष्ट",
      fullTitle: "4. Bequests & Statutory Residuary Safety Net",
      hindiFullTitle: "4. संपत्ति हिस्सा व अवशिष्ट सुरक्षा",
      subtitle: "Specific Asset Distributions & Sweep-up Clause (ISA §102)",
      icon: PieChart,
      color: "#D97706",
      badge: (s: WillDraftingState) => `${s.allocations?.length || 0} Allocated`,
    },
    {
      id: "executors",
      stepNum: 6,
      label: "Executors & Guardians",
      hindiLabel: "निष्पादक व अभिभावक",
      fullTitle: "5. Fiduciary Appointments (Executors & Guardians)",
      hindiFullTitle: "5. निष्पादक व कानूनी अभिभावक",
      subtitle: "Executors & Testamentary Guardians for Children",
      icon: Scale,
      color: "#8B5CF6",
      badge: (s: WillDraftingState) => (s.executorPrimary?.name ? "2 Appointed" : "Required"),
    },
    {
      id: "wishes",
      stepNum: 8,
      label: "Special Wishes",
      hindiLabel: "विशेष इच्छाएं",
      fullTitle: "6. Special Wishes & Sentimental Directives",
      hindiFullTitle: "6. विशेष इच्छाएं एवं निर्देश",
      subtitle: "Heirlooms, Pet Care, Charity, Funeral & Personal Message",
      icon: Sparkles,
      color: "#C9A227",
      badge: (s: WillDraftingState) => (s.specialWishes?.hasNoSpecialWishes ? "Standard (Off)" : "Configured"),
    },
    {
      id: "motivation",
      stepNum: 9,
      label: "Purpose & Legal Checklist",
      hindiLabel: "उद्देश्य व कानूनी जांच",
      fullTitle: "7. Testamentary Purpose & Statutory Execution Checklist",
      hindiFullTitle: "7. वसीयत का उद्देश्य व कानूनी अनुपालन",
      subtitle: "Section 59 Statement to Heirs & Compliance Checklist",
      icon: Heart,
      color: "#059669",
      badge: () => "ISA §59 Ready",
    },
  ], []);

  // -------------------------------------------------------------
  // IN-PLACE MODAL SAVE HANDLERS (EDIT EXISTING ONLY)
  // -------------------------------------------------------------

  useEffect(() => {
    if (isLocked) {
      setReviewedCategoryIds(new Set(REVIEW_CATEGORIES.map((c) => c.id)));
      setModifiedCategoryIds(new Set());
      if (activeModal && activeModal !== "asset_view") {
        setActiveModal(null);
      }
    }
  }, [isLocked, REVIEW_CATEGORIES, activeModal]);

  const [showCriticalLockWarning, setShowCriticalLockWarning] = useState(false);
  const healthIssues = useMemo(() => runLegalHealthCheck(state), [state]);
  const criticalHealthIssues = useMemo(
    () => healthIssues.filter((i) => i.severity === "critical"),
    [healthIssues]
  );

  const handleSaveTestator = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    const corporatePattern = /\b(solutions|pvt|private|ltd|limited|llp|inc|corp|corporation|enterprise|enterprises|company|co\.|associates|firm|consultancy|technologies|services|group|agency|foundation|trust|huf)\b/i;
    if (corporatePattern.test((testatorDraft.fullName || "").trim())) {
      triggerToast(
        isHi
          ? "⚠ केवल जीवित व्यक्ति ही वसीयत बना सकता है (धारा 59)। कृपया अपना व्यक्तिगत नाम दर्ज करें।"
          : "⚠ Only a natural living person can make a Will (Sec. 59). Please enter your personal legal name."
      );
      return;
    }
    applyStateUpdate((prev) => ({
      ...prev,
      testator: { ...testatorDraft },
    }));
    invalidateCategoryReview(["testator"]);
    triggerToast("✓ Updated Testator Profile (Status reset for re-verification)");
    setActiveModal(null);
  };

  const handleOpenEditFamily = (mem: FamilyMember) => {
    if (isLocked) return;
    setSelectedFamilyMember(mem);
    setFamilyDraft({ ...mem });
    setActiveModal("family_edit");
  };

  const handleSaveFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (!familyDraft.name?.trim()) return;

    const cleanName = sanitizeNameInput(familyDraft.name).trim();
    const cleanedMember: FamilyMember = {
      ...(familyDraft as FamilyMember),
      name: cleanName,
      pan: familyDraft.pan ? sanitizePan(familyDraft.pan) : undefined,
      email: familyDraft.email ? normalizeEmail(familyDraft.email) : undefined,
      phone: familyDraft.phone ? familyDraft.phone.replace(/\D/g, "").slice(0, 10) : undefined,
    };

    applyStateUpdate((prev) => {
      const existingIdx = prev.familyMembers.findIndex((m) => m.id === cleanedMember.id);
      const oldName = existingIdx >= 0 ? prev.familyMembers[existingIdx].name : "";
      let updatedMembers: FamilyMember[];
      if (existingIdx >= 0) {
        updatedMembers = [...prev.familyMembers];
        updatedMembers[existingIdx] = cleanedMember;
      } else {
        updatedMembers = [...prev.familyMembers, cleanedMember];
      }
      const updatedAllocations = (prev.allocations || []).map((alc) =>
        alc.beneficiaryId === cleanedMember.id
          ? { ...alc, beneficiaryName: cleanName }
          : alc
      );
      return {
        ...prev,
        familyMembers: updatedMembers,
        allocations: updatedAllocations,
        residuaryBeneficiaryName:
          oldName && prev.residuaryBeneficiaryName === oldName
            ? cleanName
            : prev.residuaryBeneficiaryName,
        residuaryAlternateName:
          oldName && prev.residuaryAlternateName === oldName
            ? cleanName
            : prev.residuaryAlternateName,
      };
    });

    invalidateCategoryReview(["family", "allocations"]);
    triggerToast("✓ Updated Family Member (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleDeleteFamily = (id: string) => {
    if (isLocked) return;
    if (!confirm("Are you sure you want to remove this family member? Their allocated assets will revert to unassigned.")) return;
    applyStateUpdate((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((m) => m.id !== id),
      allocations: prev.allocations.filter((alc) => alc.beneficiaryId !== id),
    }));
    invalidateCategoryReview(["family", "allocations"]);
    triggerToast("✓ Removed Family Member (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleOpenViewAsset = (ast: Asset) => {
    setSelectedAsset(ast);
    setActiveModal("asset_view");
  };

  const handleOpenEditAsset = (ast: Asset) => {
    if (isLocked) return;
    setSelectedAsset(ast);
    const rawJointName = ast.jointOwnerName || "";
    const rawJointRel = ast.jointOwnerRelationship || "";
    let parsedJointName = rawJointName;
    let parsedJointRel = rawJointRel;
    if (!rawJointRel && rawJointName.includes("(") && rawJointName.endsWith(")")) {
      const idx = rawJointName.lastIndexOf("(");
      parsedJointName = sanitizeNameInput(rawJointName.slice(0, idx)).trim();
      parsedJointRel = sanitizeNameInput(rawJointName.slice(idx + 1, -1)).trim();
    }
    setAssetDraft({
      ...ast,
      jointOwnerName: parsedJointName,
      jointOwnerRelationship: parsedJointRel,
    });
    const currentAlc = allocations.find((a) => a.assetId === ast.id);
    setAssetDraftAllocation({
      beneficiaryId: currentAlc?.beneficiaryId || family[0]?.id || "",
      percentage: currentAlc?.percentage || 100,
    });
    setActiveModal("asset_edit");
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    const assetId = assetDraft.id;
    if (!assetDraft.name?.trim() || !assetId) return;

    applyStateUpdate((prev) => {
      const existingIdx = prev.assets.findIndex((a) => a.id === assetId);
      let updatedAssets: Asset[];
      if (existingIdx >= 0) {
        updatedAssets = [...prev.assets];
        updatedAssets[existingIdx] = assetDraft as Asset;
      } else {
        updatedAssets = [...prev.assets, assetDraft as Asset];
      }

      // Update allocation
      const ben = prev.familyMembers.find((f) => f.id === assetDraftAllocation.beneficiaryId);
      const remainingAllocs = prev.allocations.filter((a) => a.assetId !== assetId);
      const newAllocation: BeneficiaryAllocation = {
        id: `alc-${assetId}`,
        assetId: assetId,
        beneficiaryId: assetDraftAllocation.beneficiaryId,
        beneficiaryName: ben?.name || "Beneficiary",
        percentage: assetDraftAllocation.percentage || 100,
      };

      return {
        ...prev,
        assets: updatedAssets,
        allocations: [...remainingAllocs, newAllocation],
      };
    });

    invalidateCategoryReview(["assets", "allocations"]);
    triggerToast("✓ Updated Asset & Allocation (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleDeleteAsset = (id: string) => {
    if (isLocked) return;
    if (!confirm("Are you sure you want to delete this asset from Schedule A?")) return;
    applyStateUpdate((prev) => ({
      ...prev,
      assets: prev.assets.filter((a) => a.id !== id),
      allocations: prev.allocations.filter((a) => a.assetId !== id),
    }));
    invalidateCategoryReview(["assets", "allocations"]);
    triggerToast("✓ Asset deleted (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleSaveAllocations = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    applyStateUpdate((prev) => ({
      ...prev,
      residuaryBeneficiaryName: residuaryDraft.primary,
      residuaryAlternateName: residuaryDraft.alternate,
    }));
    invalidateCategoryReview(["allocations"]);
    triggerToast("✓ Updated Residuary & Allocations (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleSaveExecutors = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    applyStateUpdate((prev) => ({
      ...prev,
      executorPrimary: executorsDraft.primary as PersonContact,
      executorAlternate: executorsDraft.alternate as PersonContact,
      guardianPrimary: executorsDraft.guardianPrimary as PersonContact,
      guardianAlternate: executorsDraft.guardianAlternate as PersonContact,
    }));
    invalidateCategoryReview(["executors"]);
    triggerToast("✓ Fiduciary appointments updated (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleSaveWishes = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    const hasAnyContent = Object.entries(wishesDraft).some(
      ([k, v]) => k !== "hasNoSpecialWishes" && typeof v === "string" && v.trim().length > 0
    );
    applyStateUpdate((prev) => ({
      ...prev,
      specialWishes: {
        ...wishesDraft,
        hasNoSpecialWishes: !hasAnyContent,
      },
    }));
    invalidateCategoryReview(["wishes"]);
    triggerToast("✓ Special wishes updated (Marked for re-verification)");
    setActiveModal(null);
  };

  const handleSaveEmotional = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    applyStateUpdate((prev) => ({
      ...prev,
      emotionalReason: emotionalDraft,
    }));
    invalidateCategoryReview(["motivation"]);
    triggerToast("✓ Purpose statement updated (Marked for re-verification)");
    setActiveModal(null);
  };

  const currentCat = REVIEW_CATEGORIES[activeCategoryIndex] || REVIEW_CATEGORIES[0];
  const isCategoryReviewed = isLocked || reviewedCategoryIds.has(currentCat.id);
  const isCategoryModified = !isLocked && modifiedCategoryIds.has(currentCat.id);

  const handleSelectCategory = (idx: number) => {
    setActiveCategoryIndex(idx);
    const el = document.getElementById("review-category-viewport");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  };

  const handleMarkCategoryReviewed = (id: string) => {
    setReviewedCategoryIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setModifiedCategoryIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    triggerToast(`✓ Marked "${currentCat.label}" as reviewed`);
  };

  const handleCompleteReviewAndVerify = () => {
    if (isLocked) {
      onNext();
      return;
    }
    const nextReviewed = new Set(reviewedCategoryIds);
    nextReviewed.add(currentCat.id);
    setReviewedCategoryIds(nextReviewed);
    setModifiedCategoryIds((prev) => {
      const next = new Set(prev);
      next.delete(currentCat.id);
      return next;
    });

    const firstUnreviewedIdx = REVIEW_CATEGORIES.findIndex((c) => !nextReviewed.has(c.id));
    if (firstUnreviewedIdx !== -1) {
      setReviewMode("stepped");
      handleSelectCategory(firstUnreviewedIdx);
      triggerToast(
        isHi
          ? `कृपया OTP सत्यापन से पहले "${REVIEW_CATEGORIES[firstUnreviewedIdx].hindiLabel}" की 1-by-1 समीक्षा करें।`
          : `Please verify "${REVIEW_CATEGORIES[firstUnreviewedIdx].label}" 1-by-1 before OTP verification.`
      );
      return;
    }

    if (criticalHealthIssues.length > 0 && !showCriticalLockWarning) {
      setShowCriticalLockWarning(true);
      triggerToast(
        isHi
          ? `⚠ स्थायी लॉक से पहले ${criticalHealthIssues.length} गंभीर कानूनी त्रुटि(यों) को ठीक करें।`
          : `⚠ Please review ${criticalHealthIssues.length} critical statutory issue(s) before permanently locking your Will.`
      );
      return;
    }

    onUpdate?.((prev) => ({
      ...prev,
      isReviewed: true,
      clauses: generateWillClauses(prev),
    }));
    if (typeof window !== "undefined") {
      localStorage.setItem("willdrafting_review_completed", "true");
    }
    setOtpModalOpen(true);
  };

  const handleNextCategory = () => {
    setReviewedCategoryIds((prev) => {
      const next = new Set(prev);
      next.add(currentCat.id);
      return next;
    });
    setModifiedCategoryIds((prev) => {
      const next = new Set(prev);
      next.delete(currentCat.id);
      return next;
    });
    if (activeCategoryIndex < REVIEW_CATEGORIES.length - 1) {
      handleSelectCategory(activeCategoryIndex + 1);
    } else {
      handleCompleteReviewAndVerify();
    }
  };

  const handlePrevCategory = () => {
    if (activeCategoryIndex > 0) {
      handleSelectCategory(activeCategoryIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className={`review-dashboard-wrapper ${isLocked ? "is-locked-review" : ""}`}>
      {isLocked && (
        <style>{`
          .review-dashboard-wrapper.is-locked-review .bento-btn-secondary,
          .review-dashboard-wrapper.is-locked-review button[title*="Edit"],
          .review-dashboard-wrapper.is-locked-review button[title*="Add"],
          .review-dashboard-wrapper.is-locked-review button[title*="register a new"] {
            display: none !important;
          }
        `}</style>
      )}

      {isLocked && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            padding: "0.85rem 1.15rem",
            marginBottom: "0.85rem",
            backgroundColor: "#ECFDF5",
            border: "1.5px solid #10B981",
            borderRadius: "14px",
            color: "#065F46",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Lock size={18} style={{ color: "#059669", flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.86rem", display: "block" }}>
                {isHi
                  ? "🔒 सभी वसीयत विवरण ईमेल OTP द्वारा सत्यापित और स्थायी रूप से लॉक हैं"
                  : "🔒 All Will Details Verified via Email OTP & Permanently Locked"}
              </strong>
              <span style={{ fontSize: "0.75rem", color: "#047857" }}>
                {isHi
                  ? "आपने सभी 7 श्रेणियों को 1-by-1 सत्यापित कर लिया है। सुरक्षा के लिए अब कोई भी विवरण संपादित नहीं किया जा सकता।"
                  : "You have verified all 7 categories 1-by-1 and confirmed via OTP. Details are read-only and cannot be edited anywhere."}
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              backgroundColor: "#D1FAE5",
              color: "#065F46",
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
            }}
          >
            {isHi ? "स्थायी रूप से लॉक ✓" : "Permanently Locked ✓"}
          </span>
        </div>
      )}

      {/* Floating Save Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#172228",
            color: "#FFFFFF",
            padding: "0.65rem 1.25rem",
            borderRadius: "999px",
            fontSize: "0.82rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 10000,
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#4ADE80" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CATEGORY STEPPER & PROGRESS (Clean, Noise-Free, Focused)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "0.85rem 1.15rem",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Top Minimalist Bar: Title + Verified Count + Listen + 1-by-1 vs All Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {isHi ? "वसीयत विवरण समीक्षा" : "Review Will Details"}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#166534",
                backgroundColor: "rgba(22, 101, 52, 0.08)",
                padding: "0.12rem 0.55rem",
                borderRadius: "999px",
              }}
            >
              {reviewedCategoryIds.size} of {REVIEW_CATEGORIES.length} {isHi ? "समीक्षित" : "Verified"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CloudSyncBadge lang={isHi ? "hi" : "en"} />
            <AudioAssistantButton
              textToSpeak={`Reviewing ${currentCat.fullTitle}. Verify the details before proceeding to the next step.`}
              hindiText={`${currentCat.hindiFullTitle} की समीक्षा। कृपया अगले चरण पर जाने से पहले विवरणों की जांच करें।`}
              label={isHi ? "सुनें" : "Listen"}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", backgroundColor: "rgba(27, 42, 74, 0.05)", padding: "0.2rem", borderRadius: "8px" }}>
              <button
                type="button"
                onClick={() => setReviewMode("stepped")}
                style={{
                  padding: "0.25rem 0.65rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: reviewMode === "stepped" ? "#FFFFFF" : "transparent",
                  color: reviewMode === "stepped" ? "var(--color-navy)" : "var(--color-slate)",
                  boxShadow: reviewMode === "stepped" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                1-by-1
              </button>
              <button
                type="button"
                onClick={() => setReviewMode("all")}
                style={{
                  padding: "0.25rem 0.65rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: reviewMode === "all" ? "#FFFFFF" : "transparent",
                  color: reviewMode === "all" ? "var(--color-navy)" : "var(--color-slate)",
                  boxShadow: reviewMode === "all" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Step Category Pills (Horizontal, Single-Line, Clean & Noise-Free) */}
        <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: "0.15rem", scrollbarWidth: "thin" }}>
          {REVIEW_CATEGORIES.map((cat, idx) => {
            const isSelected = reviewMode === "stepped" && activeCategoryIndex === idx;
            const isReviewed = reviewedCategoryIds.has(cat.id);
            const isModified = modifiedCategoryIds.has(cat.id);
            const CatIcon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setReviewMode("stepped");
                  handleSelectCategory(idx);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.38rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "999px",
                  border: isSelected
                    ? `2px solid ${cat.color}`
                    : isModified
                    ? "1.5px solid #F59E0B"
                    : isReviewed
                    ? "1px solid rgba(22, 101, 52, 0.25)"
                    : "1px solid rgba(27, 42, 74, 0.1)",
                  backgroundColor: isSelected
                    ? `${cat.color}15`
                    : isModified
                    ? "rgba(245, 158, 11, 0.08)"
                    : isReviewed
                    ? "rgba(22, 101, 52, 0.04)"
                    : "#FAF7F0",
                  color: isSelected ? cat.color : isModified ? "#B45309" : "var(--color-navy)",
                  fontSize: "0.76rem",
                  fontWeight: isSelected ? 800 : 600,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                  boxShadow: isSelected ? `0 2px 8px ${cat.color}22` : "none",
                }}
              >
                <CatIcon size={13} style={{ color: isSelected ? cat.color : isModified ? "#D97706" : "inherit" }} />
                <span>{idx + 1}. {isHi ? cat.hindiLabel : cat.label}</span>
                {isModified ? (
                  <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "#B45309", backgroundColor: "rgba(245, 158, 11, 0.2)", padding: "0.05rem 0.35rem", borderRadius: "999px" }}>
                    ⚠ Re-verify
                  </span>
                ) : isReviewed ? (
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#166534" }}>✓</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Animated Progress Bar */}
        <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(27, 42, 74, 0.06)", borderRadius: "999px", overflow: "hidden" }}>
          <div
            style={{
              width: `${((activeCategoryIndex + 1) / REVIEW_CATEGORIES.length) * 100}%`,
              height: "100%",
              backgroundColor: currentCat.color,
              borderRadius: "999px",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. MODULAR REVIEW CONTENT (1-by-1 in Stepped Mode, or All in Bento Grid)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={reviewMode === "stepped" ? "review-stepped-stack" : "review-bento-grid"} id="review-category-viewport">
        {/* ── MODULE 1: TESTATOR IDENTIFICATION ────────────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 0) && (
        <div className="review-module-card">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <User size={15} />
              </span>
              <div>
                <h3 className="review-card-title">1. Testator Identification</h3>
                <span className="review-card-sub">Will Creator, Domicile & Statutory Legal Capacity</span>
              </div>
            </div>
            <button
              type="button"
              className="bento-btn-secondary"
              onClick={() => {
                setTestatorDraft(testator);
                setActiveModal("testator");
              }}
              title="Edit Testator Profile in place"
            >
              <Edit3 size={11} /> Edit in Place
            </button>
          </div>

          {/* Testator Identity Row */}
          <div className="bento-testator-main">
            <div
              className="bento-avatar"
              style={{
                background: "linear-gradient(135deg, #172228 0%, #2F3E46 100%)",
                boxShadow: "0 2px 6px rgba(23,34,40,0.15)",
              }}
            >
              {(testator.fullName || "TM")
                .split(" ")
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <h4 className="bento-testator-name" title={testator.fullName || "Not Specified"}>
                  {testator.fullName || "Your Full Name"}
                </h4>
                <span title="Statutory Majority & Capacity Verified" style={{ display: "inline-flex" }}>
                  <CheckCircle2 size={13} style={{ color: "#2E7D32" }} />
                </span>
              </div>
              <p className="bento-testator-meta">
                <span>{testatorAge ? `${testatorAge} Yrs` : "Adult"}{testatorDobFormatted ? ` (${testatorDobFormatted})` : ""}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span style={{ textTransform: "capitalize" }}>{testator.gender || "Male"}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span style={{ textTransform: "capitalize" }}>{testator.maritalStatus || "Married"}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>{testator.citizenship || "Indian Citizen"}</span>
              </p>
              {testator.fatherOrMotherName && (
                <p className="bento-testator-parentage" title={`Statutory Parentage: ${testator.fatherOrMotherName}`}>
                  {testator.gender === "female" ? "D/o" : "S/o"} {testator.fatherOrMotherName}
                </p>
              )}
            </div>
          </div>

          {/* 8-Item Dense Data Matrix Showing All A-to-Z Testator Fields */}
          <div className="bento-testator-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <div className="bento-info-tile" title={`PAN: ${testator.pan || "Not Provided"}`}>
              <span className="bento-tile-label"><ShieldCheck size={11} style={{ color: "#2E7D32" }} /> PAN Card:</span>
              <span className="bento-tile-value" style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>
                {testator.pan || "Not Provided"}
              </span>
            </div>
            <div className="bento-info-tile" title={`Aadhaar: ${testator.aadhaar || "Not Provided"}`}>
              <span className="bento-tile-label"><CreditCard size={11} style={{ color: "#1976D2" }} /> Aadhaar UID:</span>
              <span className="bento-tile-value">{testator.aadhaar || "Not Provided"}</span>
            </div>
            <div className="bento-info-tile" title={testator.workplace || "Not Provided"}>
              <span className="bento-tile-label"><Building size={11} style={{ color: "#6A1B9A" }} /> Workplace:</span>
              <span className="bento-tile-value">{testator.workplace || "Not Provided"}</span>
            </div>
            <div className="bento-info-tile" title={`${testator.address || ""}, ${testator.city || ""}`}>
              <span className="bento-tile-label"><MapPin size={11} style={{ color: "#D84315" }} /> Permanent Domicile:</span>
              <span className="bento-tile-value">
                {testator.address ? `${testator.address}, ${testator.city} - ${testator.pincode}` : "Not Provided"}
              </span>
            </div>
            <div className="bento-info-tile" title={testator.email || "Not Provided"}>
              <span className="bento-tile-label"><Mail size={11} style={{ color: "#00838F" }} /> Official Email:</span>
              <span className="bento-tile-value">{testator.email || "Not Provided"}</span>
            </div>
            <div className="bento-info-tile" title={testator.phone || "Not Provided"}>
              <span className="bento-tile-label"><Phone size={11} style={{ color: "#00897B" }} /> Verified Phone:</span>
              <span className="bento-tile-value">{testator.phone || "Not Provided"}</span>
            </div>

            <div className="bento-info-tile" title="Revocation of Prior Wills" style={{ gridColumn: "span 2", backgroundColor: "rgba(46, 125, 50, 0.05)" }}>
              <span className="bento-tile-label"><ScrollText size={11} style={{ color: "#2E7D32" }} /> Prior Will Status:</span>
              <span className="bento-tile-value" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                {testator.hasPreviousWill
                  ? "Previous Will declared and formally revoked under Section 62 of Indian Succession Act."
                  : "First & Original Will — Declaring full testamentary freedom under Section 59."}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* ── MODULE 2: FAMILY DIRECTORY & HEIRS ────────────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 1) && (
        <div className="review-module-card" id="module-family-directory">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}>
                <Users size={15} />
              </span>
              <div>
                <h3 className="review-card-title">2. Family Directory & Heirs</h3>
                <span className="review-card-sub">{family.length} Registered Beneficiaries & Heirs</span>
              </div>
            </div>
            {/* User instruction: For adding new details, user goes to that page only */}
            <button
              type="button"
              className="bento-btn-secondary"
              onClick={() => onJumpToStep(3)}
              title="Go to Step 3 (My Family) to register a new heir"
            >
              <Plus size={11} /> Add New Member (Step 3 ↗)
            </button>
          </div>

          <div className="review-family-grid">
            {family.map((f) => (
              <div key={f.id} className="review-family-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.82rem", color: "#172228" }}>{f.name}</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span
                      style={{
                        fontSize: "0.64rem",
                        fontWeight: 700,
                        textTransform: "capitalize",
                        backgroundColor: f.relationship === "spouse" ? "rgba(198, 83, 120, 0.12)" : "rgba(37, 99, 235, 0.1)",
                        color: f.relationship === "spouse" ? "#C65378" : "#2563EB",
                        padding: "0.1rem 0.45rem",
                        borderRadius: "999px",
                      }}
                    >
                      {f.relationship}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEditFamily(f)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#5E717D",
                        padding: "2px 4px",
                        borderRadius: "4px",
                      }}
                      title="Edit this family member in place"
                    >
                      <Edit3 size={11} />
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: "0.7rem", color: "#5E717D", display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.15rem" }}>
                  <span>{f.isMinor ? "Minor (<18 Yrs)" : "Adult (Statutory Majority)"}</span>
                  {f.dob && <span>• DOB: {formatDDMMYYYY(f.dob)}</span>}
                  {f.pan && <span>• PAN: <span style={{ fontFamily: "monospace" }}>{f.pan}</span></span>}
                </div>

                {(f.phone || f.email) && (
                  <div style={{ fontSize: "0.68rem", color: "#49585F", display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.1rem" }}>
                    {f.phone && <span>📞 {f.phone}</span>}
                    {f.email && <span>✉️ {f.email}</span>}
                  </div>
                )}

                {f.address && (
                  <div style={{ fontSize: "0.68rem", color: "#49585F", marginTop: "0.1rem" }}>
                    📍 {f.address}
                  </div>
                )}

                {f.notes && (
                  <p style={{ fontSize: "0.66rem", color: "#6A7D87", margin: "0.15rem 0 0", lineHeight: 1.25 }}>
                    <strong>Role / Note:</strong> {f.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        )}

        {/* ── MODULE 3: ASSET REGISTER (LARGE DATASET UX WITH FULL VISIBILITY) ── */}
        {(reviewMode === "all" || activeCategoryIndex === 2) && (
        <div className="review-module-card span-full" id="module-asset-register">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                <Landmark size={15} />
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 className="review-card-title">3. Asset Register & Schedule A Inventory</h3>
                  <span className="bento-pill bento-pill-green" style={{ fontSize: "0.68rem" }}>
                    {assets.length} Total Assets • {formatCurrency(totalValuation)}
                  </span>
                </div>
                <span className="review-card-sub">
                  Complete A-to-Z inventory with identifiers, bank folios, ownership, valuation, loan status, and legatee allocations. Edit existing assets in place; add new assets in Step 4.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Expand / Collapse All Toggle */}
              {assetViewMode === "table" && (
                <button
                  type="button"
                  onClick={handleToggleExpandAll}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(23, 34, 40, 0.15)",
                    borderRadius: "6px",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "#49585F",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                  title={isAllExpanded ? "Collapse all asset details" : "Expand all asset details"}
                >
                  {isAllExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {isAllExpanded ? "Collapse All Details" : "Expand All Details"}
                </button>
              )}

              {/* By Category / By Asset View Toggle */}
              <div className="bento-view-toggle">
                <button
                  type="button"
                  className={`bento-toggle-btn ${assetViewMode === "single" ? "active" : ""}`}
                  onClick={() => setAssetViewMode("single")}
                >
                  1-by-1 Review ({assets.length})
                </button>
                <button
                  type="button"
                  className={`bento-toggle-btn ${assetViewMode === "table" ? "active" : ""}`}
                  onClick={() => setAssetViewMode("table")}
                >
                  Full Table
                </button>
                <button
                  type="button"
                  className={`bento-toggle-btn ${assetViewMode === "category" ? "active" : ""}`}
                  onClick={() => setAssetViewMode("category")}
                >
                  By Category ({categorizedAssets.length})
                </button>
              </div>

              {/* User instruction: For adding new details, user goes to that page only */}
              <button
                type="button"
                className="bento-btn-secondary"
                onClick={() => onJumpToStep(4)}
                title="Go to Step 4 (Assets Register) to add a new asset or property"
              >
                <Plus size={11} /> Add New Asset (Step 4 ↗)
              </button>
            </div>
          </div>

          {/* VIEW MODE 0: 1-BY-1 ASSET REVIEW STEPPER (DEFAULT) */}
          {assetViewMode === "single" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {assets.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px dashed rgba(23,34,40,0.15)" }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#5E717D" }}>No assets registered in Schedule A.</p>
                  <button
                    type="button"
                    onClick={() => onJumpToStep(4)}
                    style={{ marginTop: "0.5rem", padding: "0.4rem 0.9rem", backgroundColor: "#5F7E75", color: "#FFF", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}
                  >
                    Go to Step 4 to Add Assets
                  </button>
                </div>
              ) : (() => {
                const safeAssetIdx = Math.min(Math.max(0, activeAssetIndex), assets.length - 1);
                const cur = assets[safeAssetIdx] || assets[0];
                const curAlc = allocations.find((alc) => alc.assetId === cur.id);

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {/* Horizontal Asset Selector Strip */}
                    <div className="sub-stepper-strip">
                      {assets.map((ast, idx) => {
                        const isCur = safeAssetIdx === idx;
                        return (
                          <button
                            key={ast.id || idx}
                            type="button"
                            className={`sub-stepper-tab ${isCur ? "active" : ""}`}
                            onClick={() => setActiveAssetIndex(idx)}
                          >
                            <span>{idx + 1}. {ast.name}</span>
                            <span style={{ fontSize: "0.65rem", opacity: isCur ? 0.95 : 0.65 }}>
                              ({formatCurrency(ast.approximateValue || 0)})
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Single Focused Asset Dossier Card */}
                    <div className="sub-stepper-card">
                      <div className="sub-stepper-card-header">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                          <div
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                              backgroundColor: "rgba(95, 126, 117, 0.12)",
                              color: "#5F7E75",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Landmark size={18} />
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                              <h4 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 800, color: "#172228" }}>
                                {cur.name}
                              </h4>
                              <span
                                style={{
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  padding: "0.1rem 0.45rem",
                                  borderRadius: "4px",
                                  backgroundColor: "rgba(23, 34, 40, 0.06)",
                                  color: "#49585F",
                                  textTransform: "uppercase",
                                }}
                              >
                                {cur.customCategoryName ? `Custom: ${cur.customCategoryName}` : cur.typeDetails || (cur.category || "asset").replace(/_/g, " ")}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  padding: "0.1rem 0.45rem",
                                  borderRadius: "4px",
                                  backgroundColor: cur.ownership === "joint" ? "rgba(37, 99, 235, 0.1)" : "rgba(22, 101, 52, 0.1)",
                                  color: cur.ownership === "joint" ? "#2563EB" : "#166534",
                                }}
                              >
                                {cur.ownership === "joint" ? "Joint 50%" : "Sole 100%"}
                              </span>
                            </div>
                            <span style={{ fontSize: "0.72rem", color: "#5E717D" }}>
                              Schedule A Reference: #{cur.id}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ display: "block", fontSize: "0.66rem", color: "#5E717D", textTransform: "uppercase", fontWeight: 700 }}>
                              Estimated Value
                            </span>
                            <strong style={{ fontSize: "1.1rem", color: "#172228" }}>
                              {formatCurrency(cur.approximateValue || 0)}
                            </strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenEditAsset(cur)}
                            style={{
                              backgroundColor: "#172228",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "6px",
                              padding: "0.3rem 0.65rem",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              whiteSpace: "nowrap",
                              boxShadow: "0 1px 4px rgba(23, 34, 40, 0.15)",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Edit3 size={11} /> Edit Asset in Place
                          </button>
                        </div>
                      </div>

                      {/* Dossier Grid Details */}
                      <div className="sub-stepper-card-grid">
                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><CreditCard size={11} /> Folio / Account / Reg No:</span>
                          <span className="sub-stepper-tile-val" style={{ fontFamily: (cur.policyNumber || cur.identifier) ? "monospace" : "inherit" }}>
                            {cur.identifier || cur.policyNumber || "Not registered"}
                          </span>
                        </div>

                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><Building size={11} /> Institution / Branch / Address:</span>
                          <span className="sub-stepper-tile-val">
                            {cur.insuranceCompany || cur.addressOrInstitution || "On File"}
                          </span>
                        </div>

                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><User size={11} /> Ownership Structure:</span>
                          <span className="sub-stepper-tile-val">
                            {cur.ownership === "joint"
                              ? `Joint (50% with ${cur.jointOwnerName || "Co-owner"})`
                              : "Sole Ownership (100% full title)"}
                          </span>
                        </div>

                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><AlertCircle size={11} /> Encumbrance / Liability:</span>
                          <span className="sub-stepper-tile-val" style={{ color: cur.hasLoan ? "#D97706" : "#2E7D32" }}>
                            {cur.hasLoan ? (cur.loanDetails || "Active loan or mortgage attached") : "Fully unencumbered and debt-free"}
                          </span>
                        </div>

                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><PieChart size={11} /> Designated Legatee Bequest:</span>
                          <span className="sub-stepper-tile-val" style={{ color: "#C65378" }}>
                            {curAlc?.beneficiaryName || "Not assigned"} ({curAlc?.percentage || 100}% share)
                          </span>
                        </div>

                        <div className="sub-stepper-tile">
                          <span className="sub-stepper-tile-label"><Landmark size={11} /> Statutory Classification:</span>
                          <span className="sub-stepper-tile-val">
                            {cur.customCategoryName ? `Custom: ${cur.customCategoryName}` : (cur.category || "Asset").replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>

                      {cur.specialInstructions && (
                        <div
                          style={{
                            padding: "0.55rem 0.75rem",
                            borderRadius: "8px",
                            backgroundColor: "#FAF7F0",
                            border: "1px solid rgba(23, 34, 40, 0.08)",
                            fontSize: "0.73rem",
                            color: "#49585F",
                          }}
                        >
                          <strong style={{ color: "#172228" }}>Special Testamentary Instructions:</strong> {cur.specialInstructions}
                        </div>
                      )}

                      {/* Sub-Stepper Navigation Footer */}
                      <div className="sub-stepper-nav">
                        <button
                          type="button"
                          onClick={() => setActiveAssetIndex((p) => Math.max(0, p - 1))}
                          disabled={safeAssetIdx === 0}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            padding: "0.38rem 0.85rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(23, 34, 40, 0.12)",
                            backgroundColor: "#FFFFFF",
                            color: safeAssetIdx === 0 ? "#9CA3AF" : "#172228",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            cursor: safeAssetIdx === 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          <ArrowLeft size={13} /> Previous Asset
                        </button>

                        <div style={{ textAlign: "center" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#172228" }}>
                            Asset {safeAssetIdx + 1} of {assets.length}
                          </span>
                          <span style={{ display: "block", fontSize: "0.68rem", color: "#5E717D" }}>
                            {cur.name}
                          </span>
                        </div>

                        {safeAssetIdx < assets.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setActiveAssetIndex((p) => Math.min(assets.length - 1, p + 1))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              padding: "0.38rem 0.85rem",
                              borderRadius: "8px",
                              border: "none",
                              backgroundColor: "#5F7E75",
                              color: "#FFFFFF",
                              fontSize: "0.76rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              boxShadow: "0 2px 6px rgba(95, 126, 117, 0.2)",
                            }}
                          >
                            Next Asset <ArrowRight size={13} />
                          </button>
                        ) : (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#166534", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            ✓ All {assets.length} Assets Inspected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* VIEW MODE 1: BY ASSET TABLE (Dense, Scrollable & Filterable) */}
          {assetViewMode === "table" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {/* Filter & Search Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <div className="review-search-bar" style={{ flex: 1, minWidth: "220px" }}>
                  <Search size={13} style={{ color: "#5E717D" }} />
                  <input
                    type="text"
                    className="review-search-input"
                    placeholder="Search by asset name, bank, company, folio number, or beneficiary..."
                    value={assetSearchQuery}
                    onChange={(e) => setAssetSearchQuery(e.target.value)}
                  />
                  {assetSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setAssetSearchQuery("")}
                      style={{ border: "none", background: "transparent", color: "#5E717D", cursor: "pointer", fontSize: "0.75rem" }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Quick Filter Chips */}
                <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "all" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("all")}
                  >
                    All ({assets.length})
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "business" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("business")}
                  >
                    Startups (8)
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "property" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("property")}
                  >
                    Real Estate (5)
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "bank_account" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("bank_account")}
                  >
                    Bank & FDs (6)
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "investments" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("investments")}
                  >
                    Investments (8)
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "vehicles" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("vehicles")}
                  >
                    Vehicles (2)
                  </button>
                  <button
                    type="button"
                    className={`review-filter-chip ${selectedCategoryFilter === "jewellery" ? "active" : ""}`}
                    onClick={() => setSelectedCategoryFilter("jewellery")}
                  >
                    Locker & Gold (2)
                  </button>
                </div>
              </div>

              {/* High-Density Tabular Scrollable Box with All A-to-Z Asset Columns */}
              <div className="review-table-container">
                <table className="bento-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ position: "sticky", top: 0, backgroundColor: "#FAF7F0", zIndex: 2 }}>
                      <th style={{ width: "32px", padding: "0.45rem 0.35rem", textAlign: "center" }}></th>
                      <th style={{ textAlign: "left", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Asset Name & Specific Subtype
                      </th>
                      <th style={{ textAlign: "left", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Folio / ID & Institution
                      </th>
                      <th style={{ textAlign: "left", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Ownership
                      </th>
                      <th style={{ textAlign: "left", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Encumbrance / Loan
                      </th>
                      <th style={{ textAlign: "left", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Designated Legatee
                      </th>
                      <th style={{ textAlign: "right", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D" }}>
                        Valuation (INR)
                      </th>
                      <th style={{ textAlign: "center", padding: "0.45rem 0.75rem", fontSize: "0.68rem", color: "#5E717D", width: "110px" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: "1.5rem", color: "#5E717D", fontSize: "0.8rem" }}>
                          No assets found matching "{assetSearchQuery}".
                        </td>
                      </tr>
                    ) : (
                      filteredAssets.map((a, idx) => {
                        const currentAlc = allocations.find((alc) => alc.assetId === a.id);
                        const isExpanded = !!expandedAssetIds[a.id];

                        return (
                          <React.Fragment key={a.id || idx}>
                            <tr
                              style={{
                                borderBottom: isExpanded ? "none" : "1px solid rgba(23, 34, 40, 0.05)",
                                backgroundColor: isExpanded ? "#FAF7F0" : idx % 2 === 0 ? "#FFFFFF" : "#FAF9F5",
                              }}
                            >
                              {/* Expand Toggle Chevron */}
                              <td style={{ textAlign: "center", padding: "0.45rem 0.35rem" }}>
                                <button
                                  type="button"
                                  className="review-expand-btn"
                                  onClick={() => toggleAssetExpand(a.id)}
                                  title={isExpanded ? "Collapse inline details" : "Expand inline details"}
                                >
                                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                              </td>

                              {/* Asset Name & Subtype */}
                              <td style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem" }}>
                                <strong style={{ color: "#172228", display: "block" }}>{a.name}</strong>
                                <span style={{ fontSize: "0.68rem", color: "#5E717D" }}>
                                  {a.customCategoryName ? `Custom: ${a.customCategoryName}` : a.typeDetails || (a.category || "asset").replace(/_/g, " ")}
                                </span>
                              </td>

                              {/* Identifier & Institution / Policy Details */}
                              <td style={{ padding: "0.45rem 0.75rem", fontSize: "0.72rem", color: "#49585F" }}>
                                <span style={{ display: "block", fontFamily: (a.policyNumber || a.identifier) ? "monospace" : "inherit" }}>
                                  {a.policyNumber ? `Policy: ${a.policyNumber}` : a.identifier || "—"}
                                </span>
                                <span style={{ fontSize: "0.66rem", color: "#5E717D" }}>
                                  {a.insuranceCompany || a.addressOrInstitution || ""}
                                </span>
                              </td>

                              {/* Ownership */}
                              <td style={{ padding: "0.45rem 0.75rem", fontSize: "0.72rem", color: "#49585F" }}>
                                <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
                                  {a.ownership === "joint" ? `Joint (50%${a.jointOwnerName ? ` - ${a.jointOwnerName}` : ""})` : "Sole (100%)"}
                                </span>
                              </td>

                              {/* Encumbrance / Loan */}
                              <td style={{ padding: "0.45rem 0.75rem" }}>
                                {a.hasLoan ? (
                                  <span className="review-badge-loan-active" title={a.loanDetails || "Active Loan"}>
                                    <AlertCircle size={10} /> {a.loanDetails ? a.loanDetails.split(",")[0] : "Active Loan"}
                                  </span>
                                ) : (
                                  <span className="review-badge-loan-clean">
                                    <Check size={10} /> Clean / Debt-Free
                                  </span>
                                )}
                              </td>

                              {/* Designated Beneficiary Legatee */}
                              <td style={{ padding: "0.45rem 0.75rem" }}>
                                <span className="review-badge-legatee">
                                  🎯 {currentAlc?.beneficiaryName || "Residuary Estate"} ({currentAlc?.percentage || 100}%)
                                </span>
                              </td>

                              {/* Valuation */}
                              <td
                                style={{
                                  padding: "0.45rem 0.75rem",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: "#172228",
                                  textAlign: "right",
                                  fontFamily: "monospace",
                                }}
                              >
                                {formatCurrency(a.approximateValue || 0)}
                              </td>

                              {/* Actions */}
                              <td style={{ padding: "0.45rem 0.75rem", textAlign: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem" }}>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenViewAsset(a)}
                                    style={{
                                      border: "none",
                                      backgroundColor: "rgba(23, 34, 40, 0.05)",
                                      color: "#172228",
                                      padding: "0.22rem 0.45rem",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontSize: "0.68rem",
                                      fontWeight: 600,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.2rem",
                                    }}
                                    title="View full statutory dossier modal"
                                  >
                                    <Eye size={10} /> Dossier
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditAsset(a)}
                                    style={{
                                      border: "none",
                                      backgroundColor: "rgba(198, 83, 120, 0.08)",
                                      color: "#C65378",
                                      padding: "0.22rem 0.45rem",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontSize: "0.68rem",
                                      fontWeight: 600,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "0.2rem",
                                    }}
                                    title="Edit this asset in place"
                                  >
                                    <Edit3 size={10} /> Edit
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* INLINE EXPANDED DETAILS DRAWER (ZERO REDIRECTS, ALL DETAILS VISIBLE) */}
                            {isExpanded && (
                              <tr style={{ backgroundColor: "#FAF7F0" }}>
                                <td colSpan={8} style={{ padding: "0", borderBottom: "1px solid rgba(23, 34, 40, 0.12)" }}>
                                  <div className="review-expanded-drawer">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#172228", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                        Complete Schedule A Technical Specification
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleOpenEditAsset(a)}
                                        style={{
                                          backgroundColor: "#C65378",
                                          color: "#FFFFFF",
                                          border: "none",
                                          borderRadius: "4px",
                                          padding: "0.2rem 0.55rem",
                                          fontSize: "0.68rem",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "0.25rem",
                                        }}
                                      >
                                        <Edit3 size={10} /> Edit this Asset in Place
                                      </button>
                                    </div>

                                    <div className="review-detail-grid">
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><Landmark size={10} /> Asset ID & Classification:</span>
                                        <span className="review-detail-tile-val">{a.id} • {(a.category || "asset").replace(/_/g, " ")} ({a.typeDetails || "Standard"})</span>
                                      </div>
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><CreditCard size={10} /> Folio / Account / Reg No:</span>
                                        <span className="review-detail-tile-val" style={{ fontFamily: "monospace" }}>{a.identifier || "Not registered"}</span>
                                      </div>
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><Building size={10} /> Institution / Registered Branch:</span>
                                        <span className="review-detail-tile-val">{a.addressOrInstitution || "On File"}</span>
                                      </div>
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><User size={10} /> Ownership & Share:</span>
                                        <span className="review-detail-tile-val">
                                          {a.ownership === "joint"
                                            ? `Joint (${a.ownershipPercentage ?? 50}%) with ${a.jointOwnerName || "Co-owner"}${a.jointOwnerRelationship ? ` (${a.jointOwnerRelationship})` : ""}`
                                            : "Sole 100% Full Ownership"}
                                        </span>
                                      </div>
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><AlertCircle size={10} /> Encumbrance / Liability:</span>
                                        <span className="review-detail-tile-val" style={{ color: a.hasLoan ? "#D97706" : "#2E7D32" }}>
                                          {a.hasLoan ? (a.loanDetails || "Active Loan Attached") : "Fully unencumbered and debt-free"}
                                        </span>
                                      </div>
                                      <div className="review-detail-tile">
                                        <span className="review-detail-tile-label"><PieChart size={10} /> Testamentary Bequest:</span>
                                        <span className="review-detail-tile-val" style={{ color: "#C65378" }}>
                                          {currentAlc?.beneficiaryName || "Residuary Estate"} ({currentAlc?.percentage || 100}% of Asset)
                                        </span>
                                      </div>
                                    </div>

                                    {a.specialInstructions && (
                                      <div style={{ marginTop: "0.5rem", fontSize: "0.72rem", color: "#49585F", background: "#FFFFFF", padding: "0.4rem 0.65rem", borderRadius: "6px", border: "1px solid rgba(23,34,40,0.06)" }}>
                                        <strong>Testamentary Special Directive:</strong> {a.specialInstructions}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#5E717D" }}>
                <span>Showing {filteredAssets.length} of {assets.length} registered assets (All details visible)</span>
                <span>Combined Estimated Value: <strong style={{ color: "#172228" }}>{formatCurrency(totalValuation)}</strong></span>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: BY CATEGORY SUMMARY CARDS */}
          {assetViewMode === "category" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "0.55rem" }}>
              {categorizedAssets.map(([catKey, grp]) => {
                const percentOfTotal = totalValuation > 0 ? ((grp.total / totalValuation) * 100).toFixed(1) : "0";
                return (
                  <div
                    key={catKey}
                    className="bento-asset-cat-box"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCategoryFilter(catKey);
                      setAssetViewMode("table");
                    }}
                    title="Click to view assets in this category"
                  >
                    <div className="bento-cat-box-icon" style={{ backgroundColor: `${grp.color}15`, color: grp.color }}>
                      {grp.icon}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h5 style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: "#172228" }}>
                          {grp.label}
                        </h5>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#5E717D" }}>
                          {percentOfTotal}%
                        </span>
                      </div>
                      <p style={{ margin: "0.1rem 0 0", fontSize: "0.72rem", color: "#49585F" }}>
                        <strong>{grp.items.length}</strong> items • <strong style={{ color: "#172228" }}>{formatCurrency(grp.total)}</strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        )}

        {/* ── MODULE 4: BEQUESTS & ALLOCATIONS ───────────────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 3) && (
        <div className="review-module-card span-full" id="module-allocations-register">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}>
                <PieChart size={15} />
              </span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 className="review-card-title">4. Bequests & Residuary Estate</h3>
                  <span className="bento-pill bento-pill-blue" style={{ fontSize: "0.68rem" }}>
                    {allocations.length} Active Rules • {assets.length} Assets
                  </span>
                </div>
                <span className="review-card-sub">
                  Review specific asset bequests asset-wise 1-by-1, verifying exact percentage shares and the statutory residuary sweep clause.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div className="bento-view-toggle">
                <button
                  type="button"
                  className={`bento-toggle-btn ${allocReviewMode === "single" ? "active" : ""}`}
                  onClick={() => setAllocReviewMode("single")}
                >
                  1-by-1 Bequests ({assets.length})
                </button>
                <button
                  type="button"
                  className={`bento-toggle-btn ${allocReviewMode === "summary" ? "active" : ""}`}
                  onClick={() => setAllocReviewMode("summary")}
                >
                  Beneficiary Summary
                </button>
              </div>

              <button
                type="button"
                className="bento-btn-secondary"
                onClick={() => {
                  setResiduaryDraft({
                    primary: state.residuaryBeneficiaryName || family[0]?.name || "",
                    alternate: state.residuaryAlternateName || family[1]?.name || "",
                  });
                  setActiveModal("allocations");
                }}
                title="Edit Residuary Legatees in place"
              >
                <Edit3 size={11} /> Edit Residuary Clause
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: 1-BY-1 ASSET ALLOCATION REVIEW (DEFAULT) */}
          {allocReviewMode === "single" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {assets.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px dashed rgba(23,34,40,0.15)" }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#5E717D" }}>No assets registered to allocate.</p>
                  <button
                    type="button"
                    onClick={() => onJumpToStep(4)}
                    style={{ marginTop: "0.5rem", padding: "0.4rem 0.9rem", backgroundColor: "#2563EB", color: "#FFF", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}
                  >
                    Go to Step 4 to Add Assets
                  </button>
                </div>
              ) : (() => {
                const safeAllocIdx = Math.min(Math.max(0, activeAllocAssetIndex), assets.length - 1);
                const curAst = assets[safeAllocIdx] || assets[0];
                const curAstAllocs = allocations.filter((a) => a.assetId === curAst.id);
                const totalAllocPct = curAstAllocs.reduce((sum, a) => sum + (a.percentage || 0), 0);
                const assetVal = curAst.approximateValue || 0;

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {/* Horizontal Asset Selector Strip */}
                    <div className="sub-stepper-strip">
                      {assets.map((ast, idx) => {
                        const isCur = safeAllocIdx === idx;
                        const aAllocs = allocations.filter((a) => a.assetId === ast.id);
                        const aPct = aAllocs.reduce((sum, a) => sum + (a.percentage || 0), 0);
                        return (
                          <button
                            key={ast.id || idx}
                            type="button"
                            className={`sub-stepper-tab ${isCur ? "active" : ""}`}
                            onClick={() => setActiveAllocAssetIndex(idx)}
                          >
                            <span>{idx + 1}. {ast.name}</span>
                            <span
                              style={{
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                color: aPct === 100 ? "#166534" : aPct > 100 ? "#DC2626" : "#D97706",
                                backgroundColor: aPct === 100 ? "rgba(22, 101, 52, 0.12)" : "rgba(245, 158, 11, 0.15)",
                                padding: "0.05rem 0.35rem",
                                borderRadius: "4px",
                              }}
                            >
                              {aPct}%
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Single Focused Asset Allocation Card */}
                    <div className="sub-stepper-card">
                      <div className="sub-stepper-card-header">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                          <div
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                              backgroundColor: "rgba(37, 99, 235, 0.1)",
                              color: "#2563EB",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <PieChart size={18} />
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                              <h4 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 800, color: "#172228" }}>
                                {curAst.name}
                              </h4>
                              <span
                                style={{
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  padding: "0.1rem 0.45rem",
                                  borderRadius: "4px",
                                  backgroundColor: "rgba(23, 34, 40, 0.06)",
                                  color: "#49585F",
                                  textTransform: "uppercase",
                                }}
                              >
                                {curAst.typeDetails || (curAst.category || "Asset").replace(/_/g, " ")}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  padding: "0.1rem 0.45rem",
                                  borderRadius: "4px",
                                  backgroundColor: totalAllocPct === 100 ? "rgba(22, 101, 52, 0.1)" : totalAllocPct > 100 ? "rgba(220, 38, 38, 0.1)" : "rgba(245, 158, 11, 0.15)",
                                  color: totalAllocPct === 100 ? "#166534" : totalAllocPct > 100 ? "#DC2626" : "#B45309",
                                }}
                              >
                                {totalAllocPct === 100 ? "✓ 100% Allocated" : totalAllocPct > 100 ? `⚠ Over-allocated (${totalAllocPct}%)` : `${totalAllocPct}% Allocated (${100 - totalAllocPct}% to Residuary)`}
                              </span>
                            </div>
                            <span style={{ fontSize: "0.72rem", color: "#5E717D" }}>
                              Asset ID: #{curAst.id} • Registered Identifier: {curAst.identifier || curAst.policyNumber || "Standard Portfolio"}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ display: "block", fontSize: "0.66rem", color: "#5E717D", textTransform: "uppercase", fontWeight: 700 }}>
                              Total Asset Valuation
                            </span>
                            <strong style={{ fontSize: "1.1rem", color: "#172228" }}>
                              {formatCurrency(assetVal)}
                            </strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenEditAsset(curAst)}
                            style={{
                              backgroundColor: "#172228",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "6px",
                              padding: "0.3rem 0.65rem",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              whiteSpace: "nowrap",
                              boxShadow: "0 1px 4px rgba(23, 34, 40, 0.15)",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Edit3 size={11} /> Edit Allocation
                          </button>
                        </div>
                      </div>

                      {/* Visual Allocation Bar */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", fontWeight: 700, color: "#49585F" }}>
                          <span>Bequest Share Distribution</span>
                          <span>{totalAllocPct}% Accounted</span>
                        </div>
                        <div className="sub-stepper-alloc-bar">
                          {curAstAllocs.map((alc, aIdx) => {
                            const colors = ["#2563EB", "#C65378", "#059669", "#8B5CF6", "#D97706"];
                            return (
                              <div
                                key={alc.id || aIdx}
                                className="sub-stepper-alloc-segment"
                                style={{
                                  width: `${Math.min(100, alc.percentage || 0)}%`,
                                  backgroundColor: colors[aIdx % colors.length],
                                }}
                                title={`${alc.beneficiaryName}: ${alc.percentage}%`}
                              />
                            );
                          })}
                          {totalAllocPct < 100 && (
                            <div
                              className="sub-stepper-alloc-segment"
                              style={{
                                width: `${100 - totalAllocPct}%`,
                                backgroundColor: "rgba(27, 42, 74, 0.12)",
                              }}
                              title={`Residuary Sweep: ${100 - totalAllocPct}%`}
                            />
                          )}
                        </div>
                      </div>

                      {/* Beneficiary Breakdown List for this Asset */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#5E717D", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          Designated Legatees for {curAst.name}:
                        </span>

                        {curAstAllocs.length === 0 ? (
                          <div style={{ padding: "0.75rem", backgroundColor: "#FAF7F0", borderRadius: "8px", border: "1px dashed rgba(23,34,40,0.15)", fontSize: "0.76rem", color: "#5E717D" }}>
                            ℹ️ No specific legatee assigned. This entire asset automatically falls under the <strong>Residuary Estate Sweep Clause</strong> to <strong>{state.residuaryBeneficiaryName || family[0]?.name || "Primary Residuary Legatee"}</strong>.
                          </div>
                        ) : (
                          curAstAllocs.map((alc, aIdx) => {
                            const ben = family.find((f) => f.id === alc.beneficiaryId || f.name === alc.beneficiaryName);
                            const legateeValue = (assetVal * (alc.percentage || 0)) / 100;

                            return (
                              <div
                                key={alc.id || aIdx}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0.6rem 0.85rem",
                                  backgroundColor: "#FAF7F0",
                                  border: "1px solid rgba(23, 34, 40, 0.06)",
                                  borderRadius: "10px",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                  <div
                                    style={{
                                      width: "28px",
                                      height: "28px",
                                      borderRadius: "50%",
                                      backgroundColor: "#FFFFFF",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "#2563EB",
                                      fontWeight: 800,
                                      fontSize: "0.72rem",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                                    }}
                                  >
                                    {alc.beneficiaryName.charAt(0)}
                                  </div>
                                  <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                      <strong style={{ fontSize: "0.82rem", color: "#172228" }}>
                                        {alc.beneficiaryName}
                                      </strong>
                                      {ben?.relationship && (
                                        <span style={{ fontSize: "0.65rem", color: "#5E717D", textTransform: "capitalize" }}>
                                          ({ben.relationship})
                                        </span>
                                      )}
                                    </div>
                                    <span style={{ fontSize: "0.68rem", color: "#5E717D" }}>
                                      Bequest Share: <strong style={{ color: "#2563EB" }}>{alc.percentage}%</strong> of asset
                                    </span>
                                  </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                  <strong style={{ fontSize: "0.88rem", color: "#172228", display: "block" }}>
                                    {formatCurrency(legateeValue)}
                                  </strong>
                                  <span style={{ fontSize: "0.66rem", color: "#166534", fontWeight: 700 }}>
                                    ✓ Legally Designated
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}

                        {totalAllocPct < 100 && (
                          <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "rgba(245, 158, 11, 0.08)", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.2)", fontSize: "0.72rem", color: "#B45309" }}>
                            ⚡ Remaining <strong>{100 - totalAllocPct}% ({formatCurrency((assetVal * (100 - totalAllocPct)) / 100)})</strong> automatically devolves upon <strong>{state.residuaryBeneficiaryName || family[0]?.name || "Primary Residuary Legatee"}</strong> under the statutory sweep clause.
                          </div>
                        )}
                      </div>

                      {/* Sub-Stepper Navigation Footer */}
                      <div className="sub-stepper-nav">
                        <button
                          type="button"
                          onClick={() => setActiveAllocAssetIndex((p) => Math.max(0, p - 1))}
                          disabled={safeAllocIdx === 0}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            padding: "0.38rem 0.85rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(23, 34, 40, 0.12)",
                            backgroundColor: "#FFFFFF",
                            color: safeAllocIdx === 0 ? "#9CA3AF" : "#172228",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            cursor: safeAllocIdx === 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          <ArrowLeft size={13} /> Previous Asset Allocation
                        </button>

                        <div style={{ textAlign: "center" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#172228" }}>
                            Asset Allocation {safeAllocIdx + 1} of {assets.length}
                          </span>
                          <span style={{ display: "block", fontSize: "0.68rem", color: "#5E717D" }}>
                            {curAst.name}
                          </span>
                        </div>

                        {safeAllocIdx < assets.length - 1 ? (
                          <button
                            type="button"
                            onClick={() => setActiveAllocAssetIndex((p) => Math.min(assets.length - 1, p + 1))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              padding: "0.38rem 0.85rem",
                              borderRadius: "8px",
                              border: "none",
                              backgroundColor: "#2563EB",
                              color: "#FFFFFF",
                              fontSize: "0.76rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
                            }}
                          >
                            Next Asset Allocation <ArrowRight size={13} />
                          </button>
                        ) : (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#166534", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            ✓ All {assets.length} Asset Bequests Inspected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* VIEW MODE 2: CONSOLIDATED BENEFICIARY SUMMARY */}
          {allocReviewMode === "summary" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#5E717D", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Specific Asset Bequests ({allocations.length} Configured Rules)
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {beneficiaryAllocationSummary.map(([id, b]) => {
                  const pct = totalValuation > 0 ? Math.round((b.totalAssignedValue / totalValuation) * 100) : 0;
                  return (
                    <div
                      key={id}
                      style={{
                        background: "#FAF7F0",
                        border: "1px solid rgba(23, 34, 40, 0.06)",
                        borderRadius: "8px",
                        padding: "0.4rem 0.65rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ fontSize: "0.8rem", color: "#172228" }}>{b.name}</strong>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#172228" }}>
                          {formatCurrency(b.totalAssignedValue)} ({pct}%)
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "#5E717D", marginTop: "0.15rem" }}>
                        <span>{b.count} specifically designated assets</span>
                        <span style={{ color: "#2E7D32", fontWeight: 600 }}>100% Allocated ✓</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Universal Residuary Estate Card (Always visible under Module 4) */}
          <div
            style={{
              marginTop: "0.5rem",
              padding: "0.65rem 0.85rem",
              borderRadius: "10px",
              backgroundColor: "rgba(37, 99, 235, 0.05)",
              border: "1px solid rgba(37, 99, 235, 0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <ScrollText size={13} style={{ color: "#2563EB" }} />
                <strong style={{ fontSize: "0.78rem", color: "#172228" }}>Residuary Estate Sweep Clause (Sections 102 & 103, Indian Succession Act)</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResiduaryDraft({
                    primary: state.residuaryBeneficiaryName || family[0]?.name || "",
                    alternate: state.residuaryAlternateName || family[1]?.name || "",
                  });
                  setActiveModal("allocations");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#172228",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  whiteSpace: "nowrap",
                }}
              >
                <Edit3 size={10} /> Edit Sweep Legatee
              </button>
            </div>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#49585F", lineHeight: 1.4 }}>
              All undeclared, subsequent, or leftover properties devolve 100% upon{" "}
              <strong style={{ color: "#172228" }}>{state.residuaryBeneficiaryName || family[0]?.name || "Primary Residuary Legatee"}</strong>, with{" "}
              <strong style={{ color: "#172228" }}>{state.residuaryAlternateName || family[1]?.name || "Alternate Beneficiary"}</strong> as alternate substitute under a 30-day statutory survivorship condition.
            </p>
          </div>
        </div>
        )}

        {/* ── MODULE 5: FIDUCIARY APPOINTMENTS ──────────────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 4) && (
        <div className="review-module-card">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(139, 92, 246, 0.12)", color: "#8B5CF6" }}>
                <Scale size={15} />
              </span>
              <div>
                <h3 className="review-card-title">5. Fiduciary Appointments</h3>
                <span className="review-card-sub">Executors & Testamentary Guardians</span>
              </div>
            </div>
            <button
              type="button"
              className="bento-btn-secondary"
              onClick={() => {
                setExecutorsDraft({
                  primary: state.executorPrimary || { name: "", relationship: "spouse", address: "", phone: "", email: "" },
                  alternate: state.executorAlternate || { name: "", relationship: "sibling", address: "", phone: "", email: "" },
                  guardianPrimary: state.guardianPrimary || { name: "", relationship: "relative", address: "", phone: "", email: "" },
                  guardianAlternate: state.guardianAlternate || { name: "", relationship: "relative", address: "", phone: "", email: "" },
                });
                setActiveModal("executors");
              }}
              title="Edit Fiduciaries in place"
            >
              <Edit3 size={11} /> Edit in Place
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div
              style={{
                background: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.06)",
                borderRadius: "10px",
                padding: "0.5rem 0.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.64rem", fontWeight: 700, color: "#8B5CF6", textTransform: "uppercase" }}>
                  Primary Executor
                </span>
                <span style={{ fontSize: "0.64rem", color: "#2E7D32", fontWeight: 700 }}>Sole Probate Powers</span>
              </div>
              <strong style={{ fontSize: "0.85rem", color: "#172228", display: "block", marginTop: "0.1rem" }}>
                {state.executorPrimary?.name || "Not Appointed"}
              </strong>
              <span style={{ fontSize: "0.7rem", color: "#5E717D" }}>
                {state.executorPrimary?.relationship || "Primary Executor"} • Full authority to obtain probate, liquidate assets, settle debts, and distribute bequests under Sections 211 & 307.
              </span>
            </div>

            <div
              style={{
                background: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.06)",
                borderRadius: "10px",
                padding: "0.5rem 0.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.64rem", fontWeight: 700, color: "#5E717D", textTransform: "uppercase" }}>
                  Alternate Executor
                </span>
                <span style={{ fontSize: "0.64rem", color: "#5E717D", fontWeight: 600 }}>Contingency Substitute</span>
              </div>
              <strong style={{ fontSize: "0.85rem", color: "#172228", display: "block", marginTop: "0.1rem" }}>
                {state.executorAlternate?.name || "Not Appointed"}
              </strong>
              <span style={{ fontSize: "0.7rem", color: "#5E717D" }}>
                {state.executorAlternate?.relationship || "Backup Executor"} • Steps in with equal powers if primary executor predeceases or becomes unable/unwilling to act.
              </span>
            </div>

            <div
              style={{
                padding: "0.45rem 0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(46, 125, 50, 0.06)",
                border: "1px solid rgba(46, 125, 50, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <CheckCircle2 size={13} style={{ color: "#2E7D32", flexShrink: 0 }} />
              <div style={{ fontSize: "0.7rem", color: "#172228" }}>
                <strong>Testamentary Guardianship:</strong> {state.guardianPrimary?.name ? `Guardian appointed (${state.guardianPrimary.name}).` : "No minor guardianship required or appointed."}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* ── MODULE 6: SPECIAL WISHES & DIRECTIVES ─────────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 5) && (
        <div className="review-module-card">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(201, 162, 39, 0.12)", color: "#C9A227" }}>
                <Sparkles size={15} />
              </span>
              <div>
                <h3 className="review-card-title">6. Special Wishes & Directives</h3>
                <span className="review-card-sub">Digital, Personal, Heirlooms & Funeral Directives</span>
              </div>
            </div>
            <button
              type="button"
              className="bento-btn-secondary"
              onClick={() => {
                setWishesDraft(state.specialWishes || {});
                setActiveModal("wishes");
              }}
              title="Edit Special Wishes in place"
            >
              <Edit3 size={11} /> Edit in Place
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {wishesList.length === 0 ? (
              <p style={{ fontSize: "0.75rem", color: "#5E717D", margin: 0 }}>
                Standard statutory disposition; no custom non-financial bequests requested.
              </p>
            ) : (
              wishesList.map((wish, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FAF7F0",
                    border: "1px solid rgba(23, 34, 40, 0.06)",
                    borderRadius: "8px",
                    padding: "0.35rem 0.6rem",
                  }}
                >
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#C9A227", textTransform: "uppercase" }}>
                    {wish.label}
                  </span>
                  <p style={{ margin: "0.1rem 0 0", fontSize: "0.74rem", color: "#172228", lineHeight: 1.25 }}>
                    {wish.val}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        )}

        {/* ── MODULE 7: EMOTIONAL PURPOSE & STATEMENT ───────────── */}
        {(reviewMode === "all" || activeCategoryIndex === 6) && (
        <div className="review-module-card">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                <Heart size={15} />
              </span>
              <div>
                <h3 className="review-card-title">7. Testamentary Purpose & Message</h3>
                <span className="review-card-sub">Section 59 Statement to Family & Heirs</span>
              </div>
            </div>
            <button
              type="button"
              className="bento-btn-secondary"
              onClick={() => {
                setEmotionalDraft(state.emotionalReason || "");
                setActiveModal("emotional");
              }}
              title="Edit Testamentary Purpose in place"
            >
              <Edit3 size={11} /> Edit in Place
            </button>
          </div>

          <div
            style={{
              background: "#FAF7F0",
              border: "1px solid rgba(23, 34, 40, 0.06)",
              borderRadius: "10px",
              padding: "0.65rem 0.85rem",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "#172228",
              lineHeight: 1.45,
            }}
          >
            "{state.emotionalReason ||
              "Through this Will, I wish to secure the future of my family and loved ones, ensuring harmony, clarity, and peace of mind for all my beneficiaries."}"
          </div>
          <span style={{ fontSize: "0.68rem", color: "#5E717D" }}>
            ✓ Demonstrates sound testamentary capacity and genuine intention under Section 59, Indian Succession Act, 1925.
          </span>
        </div>
        )}

        {/* ── MODULE 8: STATUTORY HEALTH & EXECUTION READINESS ────── */}
        {(reviewMode === "all" || activeCategoryIndex === 6) && (
        <div className="review-module-card span-full">
          <div className="review-card-header">
            <div className="review-card-title-group">
              <span className="bento-icon-badge" style={{ backgroundColor: "rgba(46, 125, 50, 0.1)", color: "#2E7D32" }}>
                <CheckCircle2 size={15} />
              </span>
              <div>
                <h3 className="review-card-title">8. Statutory Execution Checklist</h3>
                <span className="review-card-sub">Indian Succession Act, 1925 Compliance Status</span>
              </div>
            </div>
            <span className="bento-pill bento-pill-green" style={{ fontSize: "0.68rem" }}>
              Ready for Health Check (Step 11)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem" }}>
            <div style={{ background: "#FAF7F0", padding: "0.45rem 0.65rem", borderRadius: "8px", border: "1px solid rgba(23,34,40,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Check size={12} style={{ color: "#2E7D32" }} />
                <strong style={{ fontSize: "0.75rem", color: "#172228" }}>Testamentary Capacity</strong>
              </div>
              <p style={{ margin: "0.1rem 0 0", fontSize: "0.68rem", color: "#5E717D" }}>
                Testator is an adult of sound disposing mind and memory with zero duress (Sec. 59).
              </p>
            </div>

            <div style={{ background: "#FAF7F0", padding: "0.45rem 0.65rem", borderRadius: "8px", border: "1px solid rgba(23,34,40,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Check size={12} style={{ color: "#2E7D32" }} />
                <strong style={{ fontSize: "0.75rem", color: "#172228" }}>Revocation Clause</strong>
              </div>
              <p style={{ margin: "0.1rem 0 0", fontSize: "0.68rem", color: "#5E717D" }}>
                Original Will cancels and replaces all earlier testamentary deeds and codicils (Sec. 62).
              </p>
            </div>

            <div style={{ background: "#FAF7F0", padding: "0.45rem 0.65rem", borderRadius: "8px", border: "1px solid rgba(23,34,40,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Check size={12} style={{ color: "#2E7D32" }} />
                <strong style={{ fontSize: "0.75rem", color: "#172228" }}>Attestation Requirement</strong>
              </div>
              <p style={{ margin: "0.1rem 0 0", fontSize: "0.68rem", color: "#5E717D" }}>
                Clause structure complies with 2 adult independent attesting witnesses rule (Sec. 63).
              </p>
            </div>

            <div style={{ background: "#FAF7F0", padding: "0.45rem 0.65rem", borderRadius: "8px", border: "1px solid rgba(23,34,40,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Check size={12} style={{ color: "#2E7D32" }} />
                <strong style={{ fontSize: "0.75rem", color: "#172228" }}>Complete Schedule A</strong>
              </div>
              <p style={{ margin: "0.1rem 0 0", fontSize: "0.68rem", color: "#5E717D" }}>
                {assets.length} declared {assets.length === 1 ? "asset" : "assets"} mapped to designated beneficiaries.
              </p>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Critical Statutory Issues Gate Banner before Permanent OTP Lock */}
      {showCriticalLockWarning && criticalHealthIssues.length > 0 && !isLocked && (
        <div
          role="alert"
          style={{
            marginBottom: "1rem",
            padding: "1rem 1.25rem",
            backgroundColor: "#FEF2F2",
            border: "1.5px solid #FDA4AF",
            borderRadius: "14px",
            color: "#991B1B",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "0.9rem", display: "block", marginBottom: "0.25rem", color: "#991B1B" }}>
                {isHi
                  ? `स्थायी OTP लॉक से पहले ${criticalHealthIssues.length} गंभीर कानूनी बिंदु ध्यान देने योग्य हैं:`
                  : `${criticalHealthIssues.length} Critical Statutory Issue(s) Detected Before Permanent OTP Lock:`}
              </strong>
              <ul style={{ margin: "0.35rem 0 0", paddingLeft: "1.1rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
                {criticalHealthIssues.map((ci) => (
                  <li key={ci.id} style={{ marginBottom: "0.25rem" }}>
                    <strong>{ci.title}:</strong> {ci.explanation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setShowCriticalLockWarning(false)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 700,
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isHi ? "ऊपर विवरण संपादित करें (सलाह)" : "Review & Fix Details Above (Recommended)"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCriticalLockWarning(false);
                onUpdate?.((prev) => ({
                  ...prev,
                  isReviewed: true,
                  clauses: generateWillClauses(prev),
                }));
                if (typeof window !== "undefined") {
                  localStorage.setItem("willdrafting_review_completed", "true");
                }
                setOtpModalOpen(true);
              }}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                color: "#991B1B",
                border: "1px solid #DC2626",
                cursor: "pointer",
              }}
            >
              {isHi ? "फिर भी OTP लॉक जारी रखें" : "Proceed to OTP Lock Anyway"}
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. BOTTOM ACTION & STEP PROCEED BAR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {reviewMode === "stepped" ? (
        <div className="review-stepped-footer">
          <div className="review-stepped-footer-left">
            {activeCategoryIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrevCategory}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1.2rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#49585F",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(23, 34, 40, 0.15)",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <ArrowLeft size={14} />
                <span>
                  {isHi ? "पिछली श्रेणी: " : "Previous: "}
                  <strong>
                    {isHi
                      ? REVIEW_CATEGORIES[activeCategoryIndex - 1]?.hindiLabel
                      : REVIEW_CATEGORIES[activeCategoryIndex - 1]?.label}
                  </strong>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBack}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1.2rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#49585F",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(23, 34, 40, 0.15)",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <ArrowLeft size={14} />
                <span>{isHi ? "पिछले चरण पर वापस" : "Back to Step 8"}</span>
              </button>
            )}
          </div>

          <div className="review-stepped-footer-center">
            <button
              type="button"
              onClick={() => handleMarkCategoryReviewed(currentCat.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.1rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: isCategoryModified
                  ? "#B45309"
                  : isCategoryReviewed
                  ? "#166534"
                  : "#49585F",
                backgroundColor: isCategoryModified
                  ? "rgba(245, 158, 11, 0.12)"
                  : isCategoryReviewed
                  ? "rgba(22, 101, 52, 0.08)"
                  : "#F3F4F6",
                border: isCategoryModified
                  ? "1.5px solid #F59E0B"
                  : isCategoryReviewed
                  ? "1.5px solid rgba(22, 101, 52, 0.3)"
                  : "1px solid rgba(23, 34, 40, 0.12)",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Acknowledge and mark this step category reviewed"
            >
              {isCategoryModified ? (
                <>
                  <span style={{ fontSize: "0.85rem", color: "#D97706" }}>⚠</span>
                  <span>{isHi ? "पुनः सत्यापित करें और समीक्षित चिह्नित करें ✓" : "Re-verify & Mark as Reviewed ✓"}</span>
                </>
              ) : isCategoryReviewed ? (
                <>
                  <CheckCircle2 size={15} style={{ color: "#166534" }} />
                  <span>{isHi ? "समीक्षा पूर्ण ✓" : "Category Reviewed ✓"}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} style={{ color: "#9CA3AF" }} />
                  <span>{isHi ? "इस श्रेणी को समीक्षित चिह्नित करें" : "Mark Category as Reviewed"}</span>
                </>
              )}
            </button>
          </div>

          <div className="review-stepped-footer-right">
            {activeCategoryIndex < REVIEW_CATEGORIES.length - 1 ? (
              <button
                type="button"
                onClick={handleNextCategory}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.6rem 1.35rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: currentCat.color || "#C65378",
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                  boxShadow: `0 4px 14px ${currentCat.color}40`,
                  transition: "all 0.18s ease",
                }}
              >
                <span>
                  {isHi ? "अगली श्रेणी: " : "Next: "}
                  <strong>
                    {isHi
                      ? REVIEW_CATEGORIES[activeCategoryIndex + 1]?.hindiLabel
                      : REVIEW_CATEGORIES[activeCategoryIndex + 1]?.label}
                  </strong>
                </span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteReviewAndVerify}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.65rem 1.5rem",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#059669",
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(5, 150, 105, 0.35)",
                  transition: "all 0.18s ease",
                }}
              >
                <Lock size={15} />
                <span>
                  {isLocked
                    ? isHi
                      ? "कानूनी स्वास्थ्य जांच पर जाएं →"
                      : "Proceed to Health Check →"
                    : isHi
                    ? "OTP दर्ज करें और विवरण स्थायी रूप से लॉक करें →"
                    : "Verify via OTP & Lock All Details →"}
                </span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="review-bottom-actions">
          <button
            type="button"
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1.15rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#49585F",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(23, 34, 40, 0.15)",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <ArrowLeft size={14} /> {isHi ? "पिछले चरण पर वापस" : "Back to Step 8"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <span style={{ fontSize: "0.72rem", color: "#5E717D" }} className="hide-on-mobile-step">
              🔒 {isHi ? "1-by-1 समीक्षा और OTP के बाद विवरण लॉक हो जाएंगे" : "Verify 1-by-1 & enter OTP to permanently lock details"}
            </span>
            <button
              type="button"
              onClick={handleCompleteReviewAndVerify}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.6rem 1.45rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#FFFFFF",
                backgroundColor: "#C65378",
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(198, 83, 120, 0.3)",
                transition: "all 0.18s ease",
              }}
            >
              <Lock size={15} />
              <span>
                {isLocked
                  ? isHi
                    ? "कानूनी स्वास्थ्य जांच (चरण 11) पर जाएं"
                    : "Proceed to Legal Health Check (Step 11)"
                  : isHi
                  ? "OTP द्वारा सत्यापित और लॉक करें"
                  : "Verify via OTP & Lock Details"}
              </span>{" "}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. IN-PLACE EDITING & DOSSIER MODALS (ZERO REDIRECTS FOR EDITS)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* ── MODAL 1: TESTATOR IN-PLACE EDIT MODAL ──────────────── */}
      {activeModal === "testator" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "640px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                  <User size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit Testator Details</h3>
                  <p className="bento-modal-sub">Updates will be saved directly to your will deed without leaving this review page.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTestator}>
              <div className="bento-modal-body">
                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Full Legal Name</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={testatorDraft.fullName || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, fullName: sanitizeNameInput(e.target.value) })}
                      placeholder="e.g., Rajesh Sharma"
                      required
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Parent's Name (Father / Mother)</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={testatorDraft.fatherOrMotherName || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, fatherOrMotherName: sanitizeNameInput(e.target.value) })}
                      placeholder="e.g., Ramesh Sharma"
                    />
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="bento-form-input"
                      value={testatorDraft.dob || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Gender</label>
                    <select
                      className="bento-form-select"
                      value={testatorDraft.gender || "male"}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, gender: e.target.value as any })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Marital Status</label>
                    <select
                      className="bento-form-select"
                      value={testatorDraft.maritalStatus || "married"}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, maritalStatus: e.target.value as any })}
                    >
                      <option value="married">Married</option>
                      <option value="single">Single / Unmarried</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="bento-form-label">Governing Succession Law / Religion</label>
                    <select
                      className="bento-form-select"
                      value={testatorDraft.religionPersonalLaw || "hindu"}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, religionPersonalLaw: e.target.value as any })}
                    >
                      <option value="hindu">Hindu / Sikh / Jain / Buddhist</option>
                      <option value="christian">Christian (ISA 1925)</option>
                      <option value="muslim">Muslim Personal Law (Shariat)</option>
                      <option value="parsi">Parsi (ISA 1925)</option>
                      <option value="other">Other / Secular (ISA 1925)</option>
                    </select>
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">PAN Card Number</label>
                    <input
                      type="text"
                      maxLength={10}
                      className="bento-form-input"
                      value={testatorDraft.pan || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, pan: sanitizePan(e.target.value) })}
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Aadhaar (UID / Last 4)</label>
                    <input
                      type="text"
                      maxLength={14}
                      className="bento-form-input"
                      value={testatorDraft.aadhaar || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, aadhaar: formatAadhaar(e.target.value) })}
                      placeholder="XXXX XXXX 1234"
                    />
                  </div>
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Workplace / Professional Affiliation</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={testatorDraft.workplace || ""}
                    onChange={(e) => setTestatorDraft({ ...testatorDraft, workplace: toTitleCaseText(e.target.value) })}
                    placeholder="e.g., Company Name or Profession"
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Home / Domicile Street Address</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={testatorDraft.address || ""}
                    onChange={(e) => setTestatorDraft({ ...testatorDraft, address: toTitleCaseText(e.target.value) })}
                    placeholder="House / Flat No., Building, Street, Locality"
                  />
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">City</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={testatorDraft.city || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, city: sanitizeNameInput(e.target.value) })}
                      placeholder="e.g., New Delhi"
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">State</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={testatorDraft.state || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, state: sanitizeNameInput(e.target.value) })}
                      placeholder="e.g., Delhi"
                    />
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Pincode</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="bento-form-input"
                      value={testatorDraft.pincode || ""}
                      onChange={async (e) => {
                        const cleanPin = e.target.value.replace(/\D/g, "").slice(0, 6);
                        const match = lookupStateFromPin(cleanPin);
                        setTestatorDraft((prev) => ({
                          ...prev,
                          pincode: cleanPin,
                          state: cleanPin.length < 2 ? "" : (match?.state || ""),
                          city: cleanPin.length < 3 ? "" : (match?.city || ""),
                        }));
                        if (cleanPin.length === 6) {
                          const details = await fetchPincodeDetails(cleanPin);
                          if (details) {
                            setTestatorDraft((prev) => {
                              if (prev.pincode !== cleanPin) return prev;
                              return {
                                ...prev,
                                state: details.state || prev.state,
                                city: details.city || prev.city,
                              };
                            });
                          }
                        }
                      }}
                      placeholder="e.g., 110001"
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Official Email</label>
                    <input
                      type="email"
                      className="bento-form-input"
                      value={testatorDraft.email || ""}
                      onChange={(e) => setTestatorDraft({ ...testatorDraft, email: normalizeEmail(e.target.value) })}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Verified Mobile Phone</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className="bento-form-input"
                    value={testatorDraft.phone || ""}
                    onChange={(e) => setTestatorDraft({ ...testatorDraft, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="bento-modal-footer">
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Testator Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: FAMILY MEMBER IN-PLACE EDIT MODAL ─────────── */}
      {activeModal === "family_edit" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}>
                  <Users size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">
                    Edit {familyDraft.name || "Family Member"}
                  </h3>
                  <p className="bento-modal-sub">Modify beneficiary relationship, legal capacity, and identity details in place.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveFamily}>
              <div className="bento-modal-body">
                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Full Name</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={familyDraft.name || ""}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, name: sanitizeNameInput(e.target.value) })}
                      placeholder="e.g. Sunita Sharma"
                      required
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Relationship to You</label>
                    <select
                      className="bento-form-select"
                      value={familyDraft.relationship || "spouse"}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, relationship: e.target.value as any })}
                    >
                      <option value="spouse">Spouse (Wife/Husband)</option>
                      <option value="son">Son</option>
                      <option value="daughter">Daughter</option>
                      <option value="brother">Brother</option>
                      <option value="sister">Sister</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="other">Other Relative / Co-heir</option>
                    </select>
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="bento-form-input"
                      value={familyDraft.dob || ""}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">PAN Card Number</label>
                    <input
                      type="text"
                      maxLength={10}
                      className="bento-form-input"
                      value={familyDraft.pan || ""}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, pan: sanitizePan(e.target.value) })}
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Email Address</label>
                    <input
                      type="email"
                      className="bento-form-input"
                      value={familyDraft.email || ""}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, email: normalizeEmail(e.target.value) })}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Phone Number</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="bento-form-input"
                      value={familyDraft.phone || ""}
                      onChange={(e) => setFamilyDraft({ ...familyDraft, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Residential Address</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={familyDraft.address || ""}
                    onChange={(e) => setFamilyDraft({ ...familyDraft, address: toTitleCaseText(e.target.value) })}
                    placeholder="Residential address"
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Beneficiary Notes / Role in Will</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={familyDraft.notes || ""}
                    onChange={(e) => setFamilyDraft({ ...familyDraft, notes: toSentenceCase(e.target.value) })}
                    placeholder="e.g. Principal Beneficiary, Contingent heir, etc."
                  />
                </div>
              </div>

              <div className="bento-modal-footer">
                {familyDraft.id && (
                  <button
                    type="button"
                    className="bento-btn-delete"
                    onClick={() => handleDeleteFamily(familyDraft.id!)}
                    style={{ marginRight: "auto" }}
                  >
                    <Trash2 size={12} /> Remove Member
                  </button>
                )}
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: ASSET DEEP DOSSIER VIEW MODAL (INSPECT ALL FIELDS) ─ */}
      {activeModal === "asset_view" && selectedAsset && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                  <Landmark size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">{selectedAsset.name}</h3>
                  <p className="bento-modal-sub">Schedule A Asset Dossier • Complete Technical Details</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="bento-modal-body">
              <div className="bento-modal-grid-2">
                <div className="bento-data-row">
                  <span className="bento-data-label">Asset Name:</span>
                  <strong className="bento-data-val">{selectedAsset.name}</strong>
                </div>
                <div className="bento-data-row">
                  <span className="bento-data-label">Category:</span>
                  <strong className="bento-data-val" style={{ textTransform: "capitalize" }}>
                    {(selectedAsset.category || "other").replace(/_/g, " ")}
                  </strong>
                </div>
                <div className="bento-data-row">
                  <span className="bento-data-label">Specific Subtype:</span>
                  <strong className="bento-data-val">{selectedAsset.typeDetails || "Standard"}</strong>
                </div>
                <div className="bento-data-row">
                  <span className="bento-data-label">Account / Folio / Deed No:</span>
                  <strong className="bento-data-val" style={{ fontFamily: "monospace" }}>
                    {selectedAsset.identifier || "Not specified"}
                  </strong>
                </div>
                <div className="bento-data-row" style={{ gridColumn: "span 2" }}>
                  <span className="bento-data-label">Institution / Location / Branch:</span>
                  <strong className="bento-data-val">{selectedAsset.addressOrInstitution || "On File"}</strong>
                </div>
                <div className="bento-data-row">
                  <span className="bento-data-label">Ownership Type:</span>
                  <strong className="bento-data-val" style={{ textTransform: "capitalize" }}>
                    {selectedAsset.ownership === "joint"
                      ? `Joint (${selectedAsset.ownershipPercentage ?? 50}%${selectedAsset.jointOwnerName ? ` with ${selectedAsset.jointOwnerName}${selectedAsset.jointOwnerRelationship ? ` (${selectedAsset.jointOwnerRelationship})` : ""}` : ""})`
                      : "Sole (100%)"}
                  </strong>
                </div>
                <div className="bento-data-row">
                  <span className="bento-data-label">Approximate Value:</span>
                  <strong className="bento-data-val" style={{ color: "#2E7D32" }}>
                    {formatCurrency(selectedAsset.approximateValue || 0)}
                  </strong>
                </div>

                <div className="bento-data-row">
                  <span className="bento-data-label">Encumbrance / Loan:</span>
                  <strong className="bento-data-val" style={{ color: selectedAsset.hasLoan ? "#D97706" : "#2E7D32" }}>
                    {selectedAsset.hasLoan ? (selectedAsset.loanDetails || "Active Loan") : "Clean / Debt-Free"}
                  </strong>
                </div>

                {/* Allocation mapping */}
                <div className="bento-data-row" style={{ gridColumn: "span 2", backgroundColor: "#FAF7F0", padding: "0.55rem 0.75rem", borderRadius: "8px" }}>
                  <span className="bento-data-label">Designated Beneficiary Allocation:</span>
                  <strong className="bento-data-val" style={{ color: "#C65378" }}>
                    {allocations.find((a) => a.assetId === selectedAsset.id)?.beneficiaryName || "Residuary Estate"} (
                    {allocations.find((a) => a.assetId === selectedAsset.id)?.percentage || 100}%)
                  </strong>
                </div>

                {selectedAsset.specialInstructions && (
                  <div className="bento-data-row" style={{ gridColumn: "span 2" }}>
                    <span className="bento-data-label">Special Testamentary Instructions:</span>
                    <strong className="bento-data-val">{selectedAsset.specialInstructions}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="bento-modal-footer">
              <button
                type="button"
                className="bento-btn-delete"
                onClick={() => handleDeleteAsset(selectedAsset.id)}
                style={{ marginRight: "auto" }}
              >
                <Trash2 size={12} /> Delete Asset
              </button>
              <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                Close
              </button>
              <button
                type="button"
                className="bento-btn-save"
                onClick={() => handleOpenEditAsset(selectedAsset)}
              >
                <Edit3 size={13} /> Edit This Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 4: ASSET IN-PLACE EDIT MODAL (EXISTING ASSET ONLY) ─ */}
      {activeModal === "asset_edit" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "620px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(95, 126, 117, 0.12)", color: "#5F7E75" }}>
                  <Landmark size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit {assetDraft.name || "Asset"}</h3>
                  <p className="bento-modal-sub">Modify valuation, folio identifier, and beneficiary allocation directly in place.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveAsset}>
              <div className="bento-modal-body">
                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Asset Name</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={assetDraft.name || ""}
                      onChange={(e) => setAssetDraft({ ...assetDraft, name: toTitleCaseText(e.target.value) })}
                      placeholder="e.g. HDFC Bank Account"
                      required
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Schedule A Category</label>
                    <select
                      className="bento-form-select"
                      value={assetDraft.category || "bank_account"}
                      onChange={(e) => setAssetDraft({ ...assetDraft, category: e.target.value as AssetCategory })}
                    >
                      <option value="business">Business / Startup Equity</option>
                      <option value="property">Real Estate / Immovable</option>
                      <option value="bank_account">Bank Accounts & FDs</option>
                      <option value="investments">Mutual Funds & Demat</option>
                      <option value="vehicles">Motor Vehicles</option>
                      <option value="jewellery">Gold & Valuables</option>
                      <option value="insurance">Insurance Policies</option>
                      <option value="digital">Digital Assets & IP</option>
                      <option value="other">Other Belongings</option>
                    </select>
                  </div>
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Specific Subtype / Classification</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={assetDraft.typeDetails || ""}
                      onChange={(e) => setAssetDraft({ ...assetDraft, typeDetails: toTitleCaseText(e.target.value) })}
                      placeholder="e.g. Residential 3BHK, Salary Account"
                    />
                  </div>
                  <div>
                    <label className="bento-form-label">Identifier (Account / Folio / Deed No)</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={assetDraft.identifier || ""}
                      onChange={(e) => setAssetDraft({ ...assetDraft, identifier: normalizeIdCode(e.target.value) })}
                      placeholder="e.g. A/C ending 4120"
                    />
                  </div>
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Institution / Location / Branch Address</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={assetDraft.addressOrInstitution || ""}
                    onChange={(e) => setAssetDraft({ ...assetDraft, addressOrInstitution: toTitleCaseText(e.target.value) })}
                    placeholder="e.g. HDFC Bank, Connaught Place"
                  />
                </div>

                <div className="bento-form-row-2">
                  <div>
                    <label className="bento-form-label">Ownership Structure</label>
                    <select
                      className="bento-form-select"
                      value={assetDraft.ownership || "sole"}
                      onChange={(e) => setAssetDraft({ ...assetDraft, ownership: e.target.value as any })}
                    >
                      <option value="sole">Sole Ownership (100%)</option>
                      <option value="joint">Joint Ownership</option>
                    </select>
                  </div>
                  <div>
                    <label className="bento-form-label">Approximate Value (INR)</label>
                    <input
                      type="number"
                      className="bento-form-input"
                      value={assetDraft.approximateValue || ""}
                      onChange={(e) => setAssetDraft({ ...assetDraft, approximateValue: Number(e.target.value) })}
                      placeholder="e.g. 5000000"
                    />
                  </div>
                </div>

                {assetDraft.ownership === "joint" && (
                  <div className="bento-form-row-2">
                    <div>
                      <label className="bento-form-label">Joint Owner Full Name</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={assetDraft.jointOwnerName || ""}
                        onChange={(e) => setAssetDraft({ ...assetDraft, jointOwnerName: sanitizeNameInput(e.target.value) })}
                        placeholder="e.g. Sunita Sharma"
                        required
                      />
                    </div>
                    <div>
                      <label className="bento-form-label">Relationship with Joint Owner</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={assetDraft.jointOwnerRelationship || ""}
                        onChange={(e) => setAssetDraft({ ...assetDraft, jointOwnerRelationship: sanitizeNameInput(e.target.value) })}
                        placeholder="e.g. Spouse, Brother, Father"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Encumbrance / Loan Checkbox */}
                <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    id="asset-loan-check"
                    checked={!!assetDraft.hasLoan}
                    onChange={(e) => setAssetDraft({ ...assetDraft, hasLoan: e.target.checked })}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <label htmlFor="asset-loan-check" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#172228", cursor: "pointer" }}>
                    This asset is subject to an active loan or mortgage
                  </label>
                </div>

                {assetDraft.hasLoan && (
                  <div className="bento-form-row">
                    <label className="bento-form-label">Loan Details & Lender Institution</label>
                    <input
                      type="text"
                      className="bento-form-input"
                      value={assetDraft.loanDetails || ""}
                      onChange={(e) => setAssetDraft({ ...assetDraft, loanDetails: toSentenceCase(e.target.value) })}
                      placeholder="e.g. HDFC Home Loan, Outstanding ₹42 Lakhs"
                    />
                  </div>
                )}

                {/* In-Place Beneficiary Allocation for this Asset */}
                <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 0.85rem", borderRadius: "10px", marginTop: "0.4rem" }}>
                  <label className="bento-form-label" style={{ color: "#C65378" }}>
                    Allocate to Beneficiary Legatee
                  </label>
                  <div className="bento-form-row-2" style={{ marginBottom: 0, marginTop: "0.25rem" }}>
                    <div>
                      <select
                        className="bento-form-select"
                        value={assetDraftAllocation.beneficiaryId}
                        onChange={(e) => setAssetDraftAllocation({ ...assetDraftAllocation, beneficiaryId: e.target.value })}
                      >
                        {family.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} ({f.relationship})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className="bento-form-select"
                        value={assetDraftAllocation.percentage}
                        onChange={(e) => setAssetDraftAllocation({ ...assetDraftAllocation, percentage: Number(e.target.value) })}
                      >
                        <option value={100}>100% (Sole Bequest)</option>
                        <option value={50}>50% (Equal Half)</option>
                        <option value={33}>33.3% (One Third)</option>
                        <option value={25}>25% (Quarter)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bento-form-row" style={{ marginTop: "0.75rem" }}>
                  <label className="bento-form-label">Special Testamentary Instructions (Optional)</label>
                  <input
                    type="text"
                    className="bento-form-input"
                    value={assetDraft.specialInstructions || ""}
                    onChange={(e) => setAssetDraft({ ...assetDraft, specialInstructions: toSentenceCase(e.target.value) })}
                    placeholder="e.g. Lock-in shares for 3 years, preserve ancestral gold, etc."
                  />
                </div>
              </div>

              <div className="bento-modal-footer">
                {assetDraft.id && (
                  <button
                    type="button"
                    className="bento-btn-delete"
                    onClick={() => handleDeleteAsset(assetDraft.id!)}
                    style={{ marginRight: "auto" }}
                  >
                    <Trash2 size={12} /> Delete Asset
                  </button>
                )}
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Asset & Bequest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 5: BEQUESTS & RESIDUARY ALLOCATIONS IN-PLACE EDIT MODAL ─ */}
      {activeModal === "allocations" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "580px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", color: "#2563EB" }}>
                  <PieChart size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit Residuary Estate Sweep Clause</h3>
                  <p className="bento-modal-sub">Sections 102 & 103, Indian Succession Act, 1925.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveAllocations}>
              <div className="bento-modal-body">
                <div className="bento-form-row">
                  <label className="bento-form-label">Primary Residuary Legatee</label>
                  <select
                    className="bento-form-select"
                    value={residuaryDraft.primary}
                    onChange={(e) => setResiduaryDraft({ ...residuaryDraft, primary: e.target.value })}
                  >
                    {family.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.relationship})
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: "0.68rem", color: "#5E717D", marginTop: "0.2rem", display: "block" }}>
                    Inherits 100% of all future, undeclared, lapsed, or leftover estate assets.
                  </span>
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Alternate Residuary Legatee (Contingency)</label>
                  <select
                    className="bento-form-select"
                    value={residuaryDraft.alternate}
                    onChange={(e) => setResiduaryDraft({ ...residuaryDraft, alternate: e.target.value })}
                  >
                    {family.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.relationship})
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: "0.68rem", color: "#5E717D", marginTop: "0.2rem", display: "block" }}>
                    Steps in if primary legatee predeceases or fails to survive the 30-day statutory survivorship clause.
                  </span>
                </div>
              </div>

              <div className="bento-modal-footer">
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Residuary Clause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 6: FIDUCIARY APPOINTMENTS IN-PLACE EDIT MODAL ── */}
      {activeModal === "executors" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "620px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(139, 92, 246, 0.12)", color: "#8B5CF6" }}>
                  <Scale size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit Fiduciary Appointments</h3>
                  <p className="bento-modal-sub">Configure probate executors and testamentary guardians under Indian Succession Act.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveExecutors}>
              <div className="bento-modal-body">
                <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 0.85rem", borderRadius: "10px", marginBottom: "0.75rem" }}>
                  <strong style={{ fontSize: "0.78rem", color: "#8B5CF6", display: "block", marginBottom: "0.35rem" }}>
                    Primary Executor (Sole Administration & Probate)
                  </strong>
                  <div className="bento-form-row-2">
                    <div>
                      <label className="bento-form-label">Full Name</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={executorsDraft.primary.name || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            primary: { ...executorsDraft.primary, name: sanitizeNameInput(e.target.value) },
                          })
                        }
                        placeholder="e.g. Sunita Sharma"
                        required
                      />
                    </div>
                    <div>
                      <label className="bento-form-label">Relationship</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={executorsDraft.primary.relationship || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            primary: { ...executorsDraft.primary, relationship: sanitizeNameInput(e.target.value) },
                          })
                        }
                        placeholder="e.g. Spouse"
                      />
                    </div>
                  </div>
                  <div className="bento-form-row-2" style={{ marginBottom: 0 }}>
                    <div>
                      <label className="bento-form-label">Phone</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        className="bento-form-input"
                        value={executorsDraft.primary.phone || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            primary: { ...executorsDraft.primary, phone: e.target.value.replace(/\D/g, "").slice(0, 10) },
                          })
                        }
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div>
                      <label className="bento-form-label">Email</label>
                      <input
                        type="email"
                        className="bento-form-input"
                        value={executorsDraft.primary.email || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            primary: { ...executorsDraft.primary, email: normalizeEmail(e.target.value) },
                          })
                        }
                        placeholder="executor@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
                  <strong style={{ fontSize: "0.78rem", color: "#5E717D", display: "block", marginBottom: "0.35rem" }}>
                    Alternate Executor (Contingency Substitute)
                  </strong>
                  <div className="bento-form-row-2">
                    <div>
                      <label className="bento-form-label">Full Name</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={executorsDraft.alternate.name || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            alternate: { ...executorsDraft.alternate, name: sanitizeNameInput(e.target.value) },
                          })
                        }
                        placeholder="e.g. Rajesh Sharma"
                        required
                      />
                    </div>
                    <div>
                      <label className="bento-form-label">Relationship</label>
                      <input
                        type="text"
                        className="bento-form-input"
                        value={executorsDraft.alternate.relationship || ""}
                        onChange={(e) =>
                          setExecutorsDraft({
                            ...executorsDraft,
                            alternate: { ...executorsDraft.alternate, relationship: sanitizeNameInput(e.target.value) },
                          })
                        }
                        placeholder="e.g. Brother / Friend"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bento-modal-footer">
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Fiduciaries
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 7: SPECIAL WISHES IN-PLACE EDIT MODAL ────────── */}
      {activeModal === "wishes" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "620px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(201, 162, 39, 0.12)", color: "#C9A227" }}>
                  <Sparkles size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit Special Wishes & Directives</h3>
                  <p className="bento-modal-sub">Non-financial testamentary wishes for your family and executors.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveWishes}>
              <div className="bento-modal-body">
                <div className="bento-form-row">
                  <label className="bento-form-label">Digital Accounts & Cryptographic Passwords</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.digitalAccounts || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, digitalAccounts: e.target.value })}
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Ancestral Heirlooms & Jewellery Directives</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.jewelleryInstructions || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, jewelleryInstructions: e.target.value })}
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Academic, Research & Personal Belongings</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.personalBelongings || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, personalBelongings: e.target.value })}
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Charitable & Institutional Endowment</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.charitableGifts || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, charitableGifts: e.target.value })}
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Funeral, Cremation & Last Rites</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.funeralCeremonyWishes || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, funeralCeremonyWishes: e.target.value })}
                  />
                </div>

                <div className="bento-form-row">
                  <label className="bento-form-label">Pet Care & Veterinary Maintenance</label>
                  <textarea
                    rows={2}
                    className="bento-form-textarea"
                    value={wishesDraft.petsCare || ""}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, petsCare: e.target.value })}
                  />
                </div>
              </div>

              <div className="bento-modal-footer">
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Special Wishes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 8: EMOTIONAL TESTAMENTARY PURPOSE IN-PLACE EDIT MODAL ── */}
      {activeModal === "emotional" && (
        <div className="bento-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="bento-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="bento-modal-header">
              <div className="bento-modal-title-group">
                <span className="bento-icon-badge" style={{ backgroundColor: "rgba(198, 83, 120, 0.1)", color: "#C65378" }}>
                  <Heart size={16} />
                </span>
                <div>
                  <h3 className="bento-modal-title">Edit Testamentary Purpose & Message</h3>
                  <p className="bento-modal-sub">Accompanying Section 59 statement explaining your intent to family and beneficiaries.</p>
                </div>
              </div>
              <button type="button" className="bento-modal-close" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEmotional}>
              <div className="bento-modal-body">
                <div className="bento-form-row">
                  <label className="bento-form-label">Personal Letter / Statement of Intent</label>
                  <textarea
                    rows={6}
                    className="bento-form-textarea"
                    value={emotionalDraft}
                    onChange={(e) => setEmotionalDraft(e.target.value)}
                    placeholder="Write your personal message to your family..."
                    required
                  />
                  <span style={{ fontSize: "0.68rem", color: "#5E717D", marginTop: "0.3rem", display: "block" }}>
                    This personal narrative serves as evidence of sound mind, absence of coercion, and testamentary clarity under Section 59 of the Indian Succession Act.
                  </span>
                </div>
              </div>

              <div className="bento-modal-footer">
                <button type="button" className="bento-btn-cancel" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="bento-btn-save">
                  <Check size={13} /> Save Purpose
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 9: EMAIL OTP VERIFICATION & PERMANENT LOCK ── */}
      <WillVerificationModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        state={state}
        startAtOtp={true}
        onJumpToStep={onJumpToStep}
        onVerified={() => {
          setOtpModalOpen(false);
          triggerToast(
            isHi
              ? "🔒 सभी विवरण OTP द्वारा सत्यापित और स्थायी रूप से लॉक हो गए हैं!"
              : "🔒 All Will details verified via OTP and permanently locked!"
          );
          onNext();
        }}
      />
    </div>
  );
}
