"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import WizardButton from "./button";
import {
  WillDraftingState,
  BeneficiaryAllocation,
  Asset,
} from "@/lib/willDraftingStore";
import {
  PieChart,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  Search,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  Sliders,
  List,
  Zap,
  RotateCcw,
  CheckSquare,
  Square,
  Building,
  Landmark,
  ShieldCheck,
  X,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import CustomPercentageAllocator from "./CustomPercentageAllocator";


interface Step5AllocationsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

const relationshipHindiMap: Record<string, string> = {
  spouse: "जीवनसाथी",
  husband: "पति",
  wife: "पत्नी",
  son: "पुत्र",
  daughter: "पुत्री",
  father: "पिता",
  mother: "माता",
  brother: "भाई",
  sister: "बहन",
  sibling: "भाई/बहन",
  friend: "मित्र",
  charity: "दान / ट्रस्ट",
  other: "अन्य",
};

export default function Step5Allocations({
  state,
  onUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step5AllocationsProps) {
  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;

  const assets: Asset[] = useMemo(() => state.assets || [], [state.assets]);
  const family = useMemo(() => state.familyMembers || [], [state.familyMembers]);

  const [allocations, setAllocations] = useState<BeneficiaryAllocation[]>(
    state.allocations || []
  );
  const [residuaryName, setResiduaryName] = useState(
    state.residuaryBeneficiaryName || (state.familyMembers[0]?.name || "")
  );
  const [residuaryAltName, setResiduaryAltName] = useState(
    state.residuaryAlternateName || (state.familyMembers[1]?.name || "")
  );

  // View mode: 'quick' (default) | 'list' | 'review'
  const [viewMode, setViewMode] = useState<"quick" | "list" | "review">("quick");

  // Quick mode index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Inline "Change amounts" panel expanded per asset
  const [showChangeAmounts, setShowChangeAmounts] = useState(false);

  // Save status badge text
  const [saveStatus, setSaveStatus] = useState<string>("Saved automatically");

  // History tracking for "Same as last one"
  const [lastAllocationSummary, setLastAllocationSummary] = useState<{
    summary: string;
    allocations: { beneficiaryId: string; beneficiaryName: string; percentage: number }[];
  } | null>(null);

  // Smart Repetition state
  const consecutiveRef = useRef<{
    signature: string;
    count: number;
    allocs: { beneficiaryId: string; beneficiaryName: string; percentage: number }[];
  }>({ signature: "", count: 0, allocs: [] });

  const [smartPrompt, setSmartPrompt] = useState<{
    visible: boolean;
    personSummary: string;
    typeLabel: string;
    category: string;
    remainingCount: number;
    allocs: { beneficiaryId: string; beneficiaryName: string; percentage: number }[];
  } | null>(null);

  const [undoState, setUndoState] = useState<{
    previousAllocations: BeneficiaryAllocation[];
    affectedCount: number;
    timeoutId: NodeJS.Timeout | null;
  } | null>(null);

  // Screen reader live announcement
  const [srAnnouncement, setSrAnnouncement] = useState("");

  // List mode state
  const [searchQuery, setSearchQuery] = useState("");
  const [listFilter, setListFilter] = useState<"all" | "needs_attention" | "custom" | "done">("all");
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [multiSelectModalOpen, setMultiSelectModalOpen] = useState(false);

  // Single Asset Custom Allocation Modal (Requirement 1 & 2)
  const [singleAssetModalAsset, setSingleAssetModalAsset] = useState<Asset | null>(null);

  // Bulk Allocation Modal: Option 1 ("equal") vs Option 2 ("custom") (Requirement 3)
  const [bulkDistributionMode, setBulkDistributionMode] = useState<"equal" | "custom">("equal");
  const [bulkEqualSelectedIds, setBulkEqualSelectedIds] = useState<string[]>([]);

  // Review expanded groups
  const [expandedPersonInReview, setExpandedPersonInReview] = useState<string | null>(null);

  const currentAsset: Asset | undefined = assets[currentIndex];

  // Helper: Get allocations for an asset
  const getAssetAllocations = (assetId: string) => {
    return allocations.filter((alc) => alc.assetId === assetId);
  };

  // Helper: Get total percentage for an asset
  const getAssetTotalPct = (assetId: string) => {
    return getAssetAllocations(assetId).reduce((sum, a) => sum + (a.percentage || 0), 0);
  };

  // Human readable allocation summary string
  const formatAllocationSummary = (assetId: string) => {
    const list = getAssetAllocations(assetId);
    if (list.length === 0) return isHi ? "किसी को आवंटित नहीं" : "Not allocated";
    if (list.length === 1) {
      return isHi
        ? `${list[0].beneficiaryName} को 100% मिलता है`
        : `${list[0].beneficiaryName} gets 100%`;
    }
    const isEquallySplit = list.every((item) => Math.abs(item.percentage - 100 / list.length) < 2);
    const parts = list.map((item) => `${item.beneficiaryName} ${item.percentage}%`);
    if (isEquallySplit) {
      return isHi
        ? `${parts.join(" · ")}, बराबर बंटवारा`
        : `${parts.join(" · ")}, split equally`;
    }
    return parts.join(" · ");
  };

  // Persist state upwards whenever allocations or residuary changes
  const persistChanges = (newAllocations: BeneficiaryAllocation[]) => {
    setAllocations(newAllocations);
    setSaveStatus("Saved");
    setTimeout(() => setSaveStatus("Saved automatically"), 1400);

    onUpdate((prev) => ({
      ...prev,
      allocations: newAllocations,
      residuaryBeneficiaryName: residuaryName.trim(),
      residuaryAlternateName: residuaryAltName.trim(),
    }));
  };

  // Equal Split calculation among a set of beneficiary IDs
  const applyEqualSplit = (assetId: string, memberIds: string[]) => {
    if (memberIds.length === 0) {
      const remaining = allocations.filter((a) => a.assetId !== assetId);
      persistChanges(remaining);
      setSrAnnouncement("All beneficiaries deselected.");
      return;
    }

    const share = Math.floor(100 / memberIds.length);
    const remainder = 100 - share * memberIds.length;

    const newAdds: BeneficiaryAllocation[] = memberIds.map((id, idx) => {
      const mem = family.find((f) => f.id === id);
      const name = mem ? mem.name : "Beneficiary";
      return {
        id: `alc-${Date.now()}-${id}`,
        assetId,
        beneficiaryId: id,
        beneficiaryName: name,
        percentage: idx === memberIds.length - 1 ? share + remainder : share,
      };
    });

    const otherAllocations = allocations.filter((a) => a.assetId !== assetId);
    const next = [...otherAllocations, ...newAdds];
    persistChanges(next);

    const names = newAdds.map((a) => a.beneficiaryName).join(" and ");
    setSrAnnouncement(`${names} selected, equal split totaling 100%.`);
  };

  // Toggle beneficiary card
  const handleTogglePerson = (assetId: string, memberId: string) => {
    const currentList = getAssetAllocations(assetId);
    const isSelected = currentList.some((a) => a.beneficiaryId === memberId);

    if (isSelected) {
      const remainingIds = currentList
        .filter((a) => a.beneficiaryId !== memberId)
        .map((a) => a.beneficiaryId);
      applyEqualSplit(assetId, remainingIds);
    } else {
      const newIds = [...currentList.map((a) => a.beneficiaryId), memberId];
      applyEqualSplit(assetId, newIds);
      if (newIds.length > 1) {
        setShowChangeAmounts(true);
      }
    }
  };

  // Apply Quick Presets
  const applyPreset = (
    assetId: string,
    preset:
      | "spouse_100"
      | "equal_children"
      | "spouse_children_50_50"
      | "spouse_children_60_40"
      | "spouse_children_70_30"
      | "equal_all"
  ) => {
    const spouse = family.find((f) => f.relationship === "spouse");
    const children = family.filter(
      (f) => f.relationship === "son" || f.relationship === "daughter"
    );

    let targetIds: string[] = [];
    if (preset === "spouse_100" && spouse) {
      targetIds = [spouse.id];
      applyEqualSplit(assetId, targetIds);
    } else if (preset === "equal_children" && children.length > 0) {
      targetIds = children.map((c) => c.id);
      applyEqualSplit(assetId, targetIds);
    } else if (preset === "equal_all" && family.length > 0) {
      targetIds = family.map((f) => f.id);
      applyEqualSplit(assetId, targetIds);
    } else if (
      (preset === "spouse_children_50_50" ||
        preset === "spouse_children_60_40" ||
        preset === "spouse_children_70_30") &&
      spouse
    ) {
      const spousePct =
        preset === "spouse_children_60_40"
          ? 60
          : preset === "spouse_children_70_30"
          ? 70
          : 50;
      const childrenPct = 100 - spousePct;

      const remaining = allocations.filter((a) => a.assetId !== assetId);
      const newAdds: BeneficiaryAllocation[] = [
        {
          id: `alc-${Date.now()}-sp`,
          assetId,
          beneficiaryId: spouse.id,
          beneficiaryName: spouse.name,
          percentage: spousePct,
        },
      ];

      if (children.length > 0) {
        const share = Math.floor(childrenPct / children.length);
        const remainder = childrenPct - share * children.length;
        children.forEach((c, idx) => {
          newAdds.push({
            id: `alc-${Date.now()}-ch-${idx}`,
            assetId,
            beneficiaryId: c.id,
            beneficiaryName: c.name,
            percentage: idx === children.length - 1 ? share + remainder : share,
          });
        });
      }
      persistChanges([...remaining, ...newAdds]);
      setShowChangeAmounts(true);
      setSrAnnouncement(`Applied ${spousePct}% Spouse and ${childrenPct}% Children split.`);
    }
  };

  // Single-click: assign unallocated remainder to this beneficiary
  const handleSetRemaining = (assetId: string, beneficiaryId: string) => {
    const currentList = getAssetAllocations(assetId);
    const othersTotal = currentList
      .filter((a) => a.beneficiaryId !== beneficiaryId)
      .reduce((sum, a) => sum + (a.percentage || 0), 0);
    const remaining = Math.max(0, 100 - othersTotal);
    handleManualPercentageChange(assetId, beneficiaryId, remaining);
  };

  // Auto-balance remaining unallocated percentages across all selected beneficiaries
  const handleAutoBalance = (assetId: string) => {
    const currentList = getAssetAllocations(assetId);
    if (currentList.length === 0) return;
    const currentTotal = currentList.reduce((sum, a) => sum + (a.percentage || 0), 0);
    const diff = 100 - currentTotal;
    if (diff === 0) return;

    const share = Math.floor(diff / currentList.length);
    const remainder = diff - share * currentList.length;
    const updated = currentList.map((a, idx) => ({
      ...a,
      percentage: Math.max(0, Math.min(100, a.percentage + share + (idx === currentList.length - 1 ? remainder : 0))),
    }));
    const otherAllocs = allocations.filter((a) => a.assetId !== assetId);
    persistChanges([...otherAllocs, ...updated]);
  };

  // Stepper / Slider manual percentage update
  const handleManualPercentageChange = (
    assetId: string,
    beneficiaryId: string,
    newPct: number
  ) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newPct)));
    const currentList = getAssetAllocations(assetId);

    const updated = currentList.map((a) =>
      a.beneficiaryId === beneficiaryId ? { ...a, percentage: clamped } : a
    );

    const otherAllocs = allocations.filter((a) => a.assetId !== assetId);
    persistChanges([...otherAllocs, ...updated]);
  };

  // "Same as last one"
  const handleApplySameAsLast = () => {
    if (!lastAllocationSummary || !currentAsset) return;

    const remaining = allocations.filter((a) => a.assetId !== currentAsset.id);
    const newAdds: BeneficiaryAllocation[] = lastAllocationSummary.allocations.map(
      (la) => ({
        id: `alc-${Date.now()}-${la.beneficiaryId}`,
        assetId: currentAsset.id,
        beneficiaryId: la.beneficiaryId,
        beneficiaryName: la.beneficiaryName,
        percentage: la.percentage,
      })
    );

    const next = [...remaining, ...newAdds];
    persistChanges(next);
    setSrAnnouncement(`Applied ${lastAllocationSummary.summary} to ${currentAsset.name}`);
  };

  // Smart Repetition Check after an answer
  const recordAnswerAndCheckRepetition = (asset: Asset) => {
    const assetAllocs = getAssetAllocations(asset.id);
    if (assetAllocs.length === 0) return;

    // Create signature: sorted list of beneficiaryId:pct
    const sig = assetAllocs
      .map((a) => `${a.beneficiaryId}:${a.percentage}`)
      .sort()
      .join("|");

    if (sig === consecutiveRef.current.signature) {
      consecutiveRef.current.count += 1;
    } else {
      consecutiveRef.current = {
        signature: sig,
        count: 1,
        allocs: assetAllocs.map((a) => ({
          beneficiaryId: a.beneficiaryId,
          beneficiaryName: a.beneficiaryName,
          percentage: a.percentage,
        })),
      };
    }

    // Save for "Same as last one"
    const summary = formatAllocationSummary(asset.id);
    setLastAllocationSummary({
      summary,
      allocations: assetAllocs.map((a) => ({
        beneficiaryId: a.beneficiaryId,
        beneficiaryName: a.beneficiaryName,
        percentage: a.percentage,
      })),
    });

    // Check if 3 consecutive answers match
    if (consecutiveRef.current.count >= 3) {
      // Find remaining assets with matching category or type
      const remainingInGroup = assets.slice(currentIndex + 1).filter((a) => {
        return (
          a.category === asset.category ||
          (a.typeDetails && a.typeDetails === asset.typeDetails)
        );
      });

      if (remainingInGroup.length > 0) {
        setSmartPrompt({
          visible: true,
          personSummary: summary,
          typeLabel: asset.typeDetails || asset.category,
          category: asset.category,
          remainingCount: remainingInGroup.length,
          allocs: consecutiveRef.current.allocs,
        });
      }
    }
  };

  // Apply smart prompt to all remaining in group
  const handleApplySmartRepetition = () => {
    if (!smartPrompt || !currentAsset) return;

    const previousSnapshot = [...allocations];
    const targetAssets = assets.slice(currentIndex + 1).filter((a) => {
      return (
        a.category === currentAsset.category ||
        (a.typeDetails && a.typeDetails === currentAsset.typeDetails)
      );
    });

    const targetIds = new Set(targetAssets.map((a) => a.id));
    const kept = allocations.filter((a) => !targetIds.has(a.assetId));

    const newAdds: BeneficiaryAllocation[] = [];
    targetAssets.forEach((ta) => {
      smartPrompt.allocs.forEach((template) => {
        newAdds.push({
          id: `alc-${Date.now()}-${ta.id}-${template.beneficiaryId}`,
          assetId: ta.id,
          beneficiaryId: template.beneficiaryId,
          beneficiaryName: template.beneficiaryName,
          percentage: template.percentage,
        });
      });
    });

    const updated = [...kept, ...newAdds];
    persistChanges(updated);

    // Setup Undo with 10 second timeout
    if (undoState?.timeoutId) clearTimeout(undoState.timeoutId);
    const timeout = setTimeout(() => {
      setUndoState(null);
    }, 10000);

    setUndoState({
      previousAllocations: previousSnapshot,
      affectedCount: targetAssets.length,
      timeoutId: timeout,
    });

    setSmartPrompt(null);
  };

  const handleUndoSmartRepetition = () => {
    if (!undoState) return;
    if (undoState.timeoutId) clearTimeout(undoState.timeoutId);
    persistChanges(undoState.previousAllocations);
    setUndoState(null);
    setSrAnnouncement("Undone bulk allocation changes.");
  };

  // Next asset button click
  const handleNextAsset = () => {
    if (!currentAsset) return;
    recordAnswerAndCheckRepetition(currentAsset);
    setShowChangeAmounts(false);

    if (currentIndex < assets.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setViewMode("review");
    }
  };

  // Skip for now
  const handleSkipAsset = () => {
    setShowChangeAmounts(false);
    if (currentIndex < assets.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setViewMode("review");
    }
  };

  // Keyboard navigation on desktop (1-9 to pick person, Enter for Next, S for Same as last, Backspace for Back)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "quick" || !currentAsset) return;
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // 1 to 9 keys toggle person
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= family.length) {
        e.preventDefault();
        const member = family[num - 1];
        if (member) handleTogglePerson(currentAsset.id, member.id);
        return;
      }

      // Enter for Next asset (if 100% complete)
      if (e.key === "Enter") {
        const total = getAssetTotalPct(currentAsset.id);
        if (total === 100) {
          e.preventDefault();
          handleNextAsset();
        }
        return;
      }

      // S key for "Same as last one"
      if (e.key === "s" || e.key === "S") {
        if (lastAllocationSummary) {
          e.preventDefault();
          handleApplySameAsLast();
        }
        return;
      }

      // Backspace for previous asset
      if (e.key === "Backspace" && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex((prev) => prev - 1);
        setShowChangeAmounts(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, currentAsset, currentIndex, family, allocations, lastAllocationSummary]);

  // Status for current asset
  const currentTotalPct = currentAsset ? getAssetTotalPct(currentAsset.id) : 0;
  const isCurrentComplete = currentTotalPct === 100;
  const currentAssetAllocs = currentAsset ? getAssetAllocations(currentAsset.id) : [];
  const selectedMemberIds = new Set(currentAssetAllocs.map((a) => a.beneficiaryId));
  const leftToAssign = 100 - currentTotalPct;

  // Family presets availability
  const spouse = family.find((f) => f.relationship === "spouse");
  const children = family.filter(
    (f) => f.relationship === "son" || f.relationship === "daughter"
  );

  // Filtered Assets for List Mode
  const filteredListAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (asset.typeDetails && asset.typeDetails.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      const total = getAssetTotalPct(asset.id);
      if (listFilter === "needs_attention") return total !== 100;
      if (listFilter === "done") return total === 100;
      if (listFilter === "custom") {
        const allocs = getAssetAllocations(asset.id);
        const isStandard =
          allocs.length === 1 && allocs[0].percentage === 100;
        return total === 100 && !isStandard;
      }
      return true;
    });
  }, [assets, searchQuery, listFilter, allocations]);

  // Multi-select bulk allocation
  const handleApplyBulkAllocation = (memberIds: string[]) => {
    if (selectedAssetIds.length === 0 || memberIds.length === 0) return;

    const share = Math.floor(100 / memberIds.length);
    const remainder = 100 - share * memberIds.length;

    const targetSet = new Set(selectedAssetIds);
    const kept = allocations.filter((a) => !targetSet.has(a.assetId));

    const newAdds: BeneficiaryAllocation[] = [];
    selectedAssetIds.forEach((assetId) => {
      memberIds.forEach((mid, idx) => {
        const mem = family.find((f) => f.id === mid);
        newAdds.push({
          id: `alc-${Date.now()}-${assetId}-${mid}`,
          assetId,
          beneficiaryId: mid,
          beneficiaryName: mem ? mem.name : "Beneficiary",
          percentage: idx === memberIds.length - 1 ? share + remainder : share,
        });
      });
    });

    persistChanges([...kept, ...newAdds]);
    setSelectedAssetIds([]);
    setMultiSelectModalOpen(false);
    setSrAnnouncement(`Updated ${selectedAssetIds.length} assets with selected allocation.`);
  };

  // Save custom percentage allocations for a single asset (from modal or inline)
  const handleSaveSingleAssetAllocation = (
    assetId: string,
    newAllocs: { beneficiaryId: string; beneficiaryName: string; percentage: number }[]
  ) => {
    const targetAsset = assets.find((a) => a.id === assetId);
    const targetName = targetAsset ? targetAsset.name : "Asset";
    const otherAllocs = allocations.filter((a) => a.assetId !== assetId);
    const formatted: BeneficiaryAllocation[] = newAllocs.map((item) => ({
      id: `alc-${Date.now()}-${assetId}-${item.beneficiaryId}`,
      assetId,
      beneficiaryId: item.beneficiaryId,
      beneficiaryName: item.beneficiaryName,
      percentage: item.percentage,
    }));
    persistChanges([...otherAllocs, ...formatted]);
    setSingleAssetModalAsset(null);
    setSrAnnouncement(`Updated allocation for ${targetName}.`);
  };

  // Apply custom percentage distribution across all selected assets (Requirement 3)
  const handleApplyBulkAllocationWithDistribution = (
    distribution: { beneficiaryId: string; beneficiaryName: string; percentage: number }[]
  ) => {
    if (selectedAssetIds.length === 0 || distribution.length === 0) return;
    const targetSet = new Set(selectedAssetIds);
    const kept = allocations.filter((a) => !targetSet.has(a.assetId));

    const newAdds: BeneficiaryAllocation[] = [];
    selectedAssetIds.forEach((assetId) => {
      distribution.forEach((item) => {
        newAdds.push({
          id: `alc-${Date.now()}-${assetId}-${item.beneficiaryId}`,
          assetId,
          beneficiaryId: item.beneficiaryId,
          beneficiaryName: item.beneficiaryName,
          percentage: item.percentage,
        });
      });
    });

    persistChanges([...kept, ...newAdds]);
    setSelectedAssetIds([]);
    setMultiSelectModalOpen(false);
    setSrAnnouncement(`Updated ${selectedAssetIds.length} assets with custom allocation.`);
  };

  // Review Summary Data
  const reviewGroups = useMemo(() => {
    const summary: Record<string, { memberName: string; assets: Asset[]; isShared?: boolean }> = {};

    assets.forEach((asset) => {
      const assetAllocs = getAssetAllocations(asset.id);
      if (assetAllocs.length === 1 && assetAllocs[0].percentage === 100) {
        const name = assetAllocs[0].beneficiaryName;
        if (!summary[name]) {
          summary[name] = { memberName: name, assets: [] };
        }
        summary[name].assets.push(asset);
      } else if (assetAllocs.length > 1) {
        if (!summary["Shared"]) {
          summary["Shared"] = { memberName: "Shared / Split", assets: [], isShared: true };
        }
        summary["Shared"].assets.push(asset);
      }
    });

    return summary;
  }, [assets, allocations]);

  const incompleteAssets = useMemo(() => {
    return assets.filter((a) => getAssetTotalPct(a.id) !== 100);
  }, [assets, allocations]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        minHeight: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Screen Reader Live Region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
        {srAnnouncement}
      </div>

      {/* Top Header with Mode Tabs & Audio Assistant */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "अपनी संपत्ति का बंटवारा करें" : "Distribute Your Assets"}
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Quick mode vs List mode vs Review view toggle */}
          <div
            role="tablist"
            style={{
              display: "inline-flex",
              backgroundColor: "rgba(23, 34, 40, 0.06)",
              borderRadius: "10px",
              padding: "3px",
              gap: "2px",
            }}
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "quick"}
              onClick={() => setViewMode("quick")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: viewMode === "quick" ? "#FFFFFF" : "transparent",
                color: viewMode === "quick" ? "var(--color-navy)" : "var(--color-slate)",
                boxShadow: viewMode === "quick" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <Zap size={13} color={viewMode === "quick" ? "var(--color-gold)" : "currentColor"} />
              {isHi ? "त्वरित मोड" : "Quick Mode"}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "list"}
              onClick={() => setViewMode("list")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: viewMode === "list" ? "#FFFFFF" : "transparent",
                color: viewMode === "list" ? "var(--color-navy)" : "var(--color-slate)",
                boxShadow: viewMode === "list" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <List size={13} />
              {isHi ? `सूची मोड (${assets.length})` : `List Mode (${assets.length})`}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "review"}
              onClick={() => setViewMode("review")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "8px",
                border: "none",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: viewMode === "review" ? "#FFFFFF" : "transparent",
                color: viewMode === "review" ? "var(--color-navy)" : "var(--color-slate)",
                boxShadow: viewMode === "review" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s ease",
              }}
            >
              <PieChart size={13} />
              {isHi ? "सारांश देखें" : "Review Summary"}
            </button>
          </div>

          <AudioAssistantButton
            textToSpeak={
              isHi
                ? "यह संपत्ति किसे मिलनी चाहिए? किसी भी परिवार के सदस्य के कार्ड पर टैप करके उन्हें 100 प्रतिशत दें या बराबर बांटने के लिए एकाधिक लोगों को चुनें।"
                : "Who should receive this asset? Tap any family member card to give 100 percent or select multiple people to divide it equally."
            }
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />

          <LanguageToggle lang={currentLang} onChangeLang={handleToggleLang} size="sm" />
        </div>
      </div>

      {/* Undo Notification Pill if bulk repetition was applied */}
      {undoState && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 1rem",
            backgroundColor: "rgba(23, 34, 40, 0.95)",
            color: "#FFFFFF",
            borderRadius: "12px",
            fontSize: "0.82rem",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span>
            ✓ <strong>{undoState.affectedCount} assets</strong> updated with your preset.
          </span>
          <button
            type="button"
            onClick={handleUndoSmartRepetition}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "0.25rem 0.65rem",
              fontSize: "0.76rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <RotateCcw size={12} /> Undo
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. QUICK MODE (DEFAULT FOCUSED ONE-ASSET SCREEN)                          */}
      {/* ========================================================================= */}
      {viewMode === "quick" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", minHeight: 0 }}>
          {assets.length === 0 ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
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
              <PieChart size={32} color="var(--color-slate)" />
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                No assets added yet
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-slate)", maxWidth: "420px" }}>
                You can return to Step 4 to catalog your bank accounts, properties, or investments, or proceed to appoint executors.
              </p>
              <button
                type="button"
                onClick={onBack}
                className="btn btn-gold"
                style={{ padding: "0.55rem 1.25rem", borderRadius: "10px", fontSize: "0.85rem", fontWeight: 700 }}
              >
                ← Return to Step 4 (Assets)
              </button>
            </div>
          ) : currentAsset ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: isCurrentComplete
                  ? "1.5px solid var(--color-sage)"
                  : currentTotalPct > 100
                  ? "1.5px solid #E11D48"
                  : "1px solid rgba(27, 42, 74, 0.1)",
                boxShadow: "0 8px 30px rgba(27, 42, 74, 0.04)",
                padding: "1.35rem 1.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.15rem",
              }}
            >
              {/* 1. Progress line: "Asset X of Y" + slim progress bar + "Saved automatically" + "Skip for now" */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.76rem", color: "var(--color-slate)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontWeight: 800, color: "var(--color-navy)", fontSize: "0.82rem" }}>
                      {isHi ? `संपत्ति ${currentIndex + 1} / ${assets.length}` : `Asset ${currentIndex + 1} of ${assets.length}`}
                    </span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ color: "var(--color-sage)", fontWeight: 600 }}>
                      {saveStatus === "Saved automatically"
                        ? isHi ? "स्वतः सहेजा गया" : "Saved automatically"
                        : isHi ? "सहेजा गया" : "Saved"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSkipAsset}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-slate)",
                      textDecoration: "underline",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {isHi ? "अभी छोड़ें →" : "Skip for now →"}
                  </button>
                </div>

                {/* Slim progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(27, 42, 74, 0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((currentIndex + 1) / assets.length) * 100}%`,
                      height: "100%",
                      backgroundColor: "var(--color-gold)",
                      transition: "width 0.25s ease",
                    }}
                  />
                </div>
              </div>

              {/* 2. Asset summary: Name & Type Details */}
              <div>
                <h3
                  style={{
                    margin: "0 0 0.2rem",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-navy)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {currentAsset.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      color: "var(--color-slate)",
                      backgroundColor: "rgba(23, 34, 40, 0.05)",
                      padding: "0.15rem 0.55rem",
                      borderRadius: "999px",
                    }}
                  >
                    {currentAsset.typeDetails || currentAsset.category}
                  </span>
                  {currentAsset.identifier && (
                    <span style={{ fontSize: "0.74rem", color: "var(--color-slate)" }}>
                      ID: {currentAsset.identifier}
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Question, large: "Who should get this?" */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {isHi ? "यह संपत्ति किसे मिलनी चाहिए?" : "Who should get this?"}
                </h4>

                {/* Quick Presets Chips */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-slate)" }}>
                    {isHi ? "त्वरित विकल्प:" : "Presets:"}
                  </span>
                  {spouse && (
                    <button
                      type="button"
                      onClick={() => applyPreset(currentAsset.id, "spouse_100")}
                      style={{
                        padding: "0.22rem 0.55rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(198, 83, 120, 0.08)",
                        border: "1px solid rgba(198, 83, 120, 0.25)",
                        color: "var(--color-gold)",
                        cursor: "pointer",
                      }}
                    >
                      {isHi ? "100% जीवनसाथी" : "100% Spouse"}
                    </button>
                  )}
                  {children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => applyPreset(currentAsset.id, "equal_children")}
                      style={{
                        padding: "0.22rem 0.55rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(27, 42, 74, 0.05)",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        color: "var(--color-navy)",
                        cursor: "pointer",
                      }}
                    >
                      {isHi ? "बच्चों में बराबर" : "Equal Children"}
                    </button>
                  )}
                  {spouse && children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => applyPreset(currentAsset.id, "spouse_children_50_50")}
                      style={{
                        padding: "0.22rem 0.55rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(27, 42, 74, 0.05)",
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        color: "var(--color-navy)",
                        cursor: "pointer",
                      }}
                    >
                      {isHi ? "50% जीवनसाथी / 50% बच्चे" : "50% Spouse / 50% Children"}
                    </button>
                  )}
                </div>
              </div>

              {/* 4. Beneficiary buttons: Grid (2 cols on mobile, 3 to 4 on desktop) */}
              <div
                role="group"
                aria-label="Select beneficiaries for this asset"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              >
                {family.map((member, idx) => {
                  const isSelected = selectedMemberIds.has(member.id);
                  const memberAlloc = currentAssetAllocs.find((a) => a.beneficiaryId === member.id);
                  const initials = member.name
                    .split(" ")
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <button
                      key={member.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => handleTogglePerson(currentAsset.id, member.id)}
                      style={{
                        minHeight: "76px",
                        borderRadius: "14px",
                        padding: "0.75rem 0.85rem",
                        border: isSelected
                          ? "2px solid var(--color-gold)"
                          : "1.5px solid rgba(23, 34, 40, 0.1)",
                        backgroundColor: isSelected ? "rgba(198, 83, 120, 0.08)" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        cursor: "pointer",
                        textAlign: "left",
                        position: "relative",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {/* Avatar Circle with Initials */}
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: isSelected ? "var(--color-gold)" : "rgba(27, 42, 74, 0.08)",
                          color: isSelected ? "#FFFFFF" : "var(--color-navy)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected ? <Check size={18} strokeWidth={3} /> : initials}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "var(--color-navy)",
                            lineHeight: 1.25,
                            wordBreak: "break-word",
                          }}
                        >
                          {member.name}
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--color-slate)",
                            textTransform: "capitalize",
                          }}
                        >
                          {isHi ? (relationshipHindiMap[member.relationship.toLowerCase()] || member.relationship) : member.relationship}
                        </span>
                      </div>

                      {/* Percentage Badge if selected */}
                      {isSelected && memberAlloc && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "var(--color-gold)",
                            backgroundColor: "#FFFFFF",
                            padding: "0.15rem 0.45rem",
                            borderRadius: "999px",
                            border: "1px solid rgba(198, 83, 120, 0.25)",
                            flexShrink: 0,
                          }}
                        >
                          {memberAlloc.percentage}%
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Desktop hint */}
              <div style={{ fontSize: "0.7rem", color: "var(--color-slate)", opacity: 0.8 }} className="hidden sm:block">
                {isHi ? (
                  <>सुझाव: चुनने के लिए <strong>1-{family.length}</strong> दबाएं, आगे बढ़ने के लिए <strong>Enter</strong> दबाएं, पिछले जैसा रखने के लिए <strong>S</strong> दबाएं।</>
                ) : (
                  <>Tip: Press number keys <strong>1-{family.length}</strong> to pick, <strong>Enter</strong> to continue, <strong>S</strong> for same as last.</>
                )}
              </div>

              {/* 5. Live result line under the grid, in plain words */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "12px",
                  backgroundColor: isCurrentComplete
                    ? "rgba(95, 126, 117, 0.1)"
                    : "rgba(23, 34, 40, 0.04)",
                  border: isCurrentComplete
                    ? "1px solid rgba(95, 126, 117, 0.25)"
                    : "1px solid rgba(23, 34, 40, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  {isCurrentComplete ? (
                    <CheckCircle2 size={16} color="var(--color-sage)" />
                  ) : (
                    <AlertCircle size={16} color={currentTotalPct > 100 ? "#E11D48" : "var(--color-gold)"} />
                  )}
                  <span
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: isCurrentComplete
                        ? "var(--color-sage)"
                        : currentTotalPct > 100
                        ? "#E11D48"
                        : "var(--color-navy)",
                    }}
                  >
                    {currentAssetAllocs.length === 0
                      ? (isHi ? "कम से कम एक व्यक्ति चुनें" : "Choose at least one person")
                      : formatAllocationSummary(currentAsset.id)}
                  </span>
                </div>

                {/* 6. "Change amounts" and "Open Modal" action triggers */}
                {currentAsset && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setSingleAssetModalAsset(currentAsset)}
                      style={{
                        padding: "0.25rem 0.65rem",
                        borderRadius: "8px",
                        border: "1.5px solid var(--color-gold)",
                        backgroundColor: "rgba(198, 83, 120, 0.08)",
                        color: "var(--color-gold)",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Sliders size={13} />
                      <span>{isHi ? "कस्टम वितरण मोडल खोलें" : "Customize in Modal"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowChangeAmounts(!showChangeAmounts)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-gold)",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.2rem 0.4rem",
                      }}
                    >
                      <span>{showChangeAmounts ? (isHi ? "त्वरित बदलाव छिपाएं" : "Hide inline") : (isHi ? "त्वरित इनलाइन बदलाव" : "Quick inline")}</span>
                      {showChangeAmounts ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Inline Expandable Panel: Unified CustomPercentageAllocator (Requirement 1) */}
              {showChangeAmounts && currentAsset && (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(27, 42, 74, 0.12)",
                    padding: "1rem",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <CustomPercentageAllocator
                    key={`inline-${currentAsset.id}`}
                    family={family}
                    initialAllocations={currentAssetAllocs.map((a) => ({
                      beneficiaryId: a.beneficiaryId,
                      beneficiaryName: a.beneficiaryName,
                      percentage: a.percentage,
                    }))}
                    showActions={false}
                    onChange={(updatedAllocs, isValid) => {
                      if (isValid) {
                        const otherAllocs = allocations.filter((a) => a.assetId !== currentAsset.id);
                        const formatted: BeneficiaryAllocation[] = updatedAllocs.map((item) => ({
                          id: `alc-${Date.now()}-${currentAsset.id}-${item.beneficiaryId}`,
                          assetId: currentAsset.id,
                          beneficiaryId: item.beneficiaryId,
                          beneficiaryName: item.beneficiaryName,
                          percentage: item.percentage,
                        }));
                        persistChanges([...otherAllocs, ...formatted]);
                      }
                    }}
                    isHi={isHi}
                  />
                </div>
              )}

              {/* Smart Repetition Friendly Prompt Card */}
              {smartPrompt && smartPrompt.visible && (
                <div
                  style={{
                    backgroundColor: "rgba(198, 83, 120, 0.08)",
                    border: "1.5px solid var(--color-gold)",
                    borderRadius: "14px",
                    padding: "0.95rem 1.15rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <Sparkles size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--color-navy)" }}>
                        You assigned {smartPrompt.personSummary} for the last 3 assets.
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--color-slate)", marginTop: "2px" }}>
                        Would you like to apply the same allocation to the other{" "}
                        <strong>{smartPrompt.remainingCount} {smartPrompt.typeLabel}</strong> assets?
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginLeft: "1.75rem" }}>
                    <button
                      type="button"
                      onClick={handleApplySmartRepetition}
                      style={{
                        padding: "0.4rem 0.95rem",
                        borderRadius: "8px",
                        backgroundColor: "var(--color-gold)",
                        color: "#FFFFFF",
                        border: "none",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                    >
                      {isHi ? `हाँ, शेष सभी ${smartPrompt.remainingCount} पर लागू करें` : `Yes, apply to all ${smartPrompt.remainingCount}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmartPrompt(null)}
                      style={{
                        padding: "0.4rem 0.85rem",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        color: "var(--color-slate)",
                        border: "1px solid rgba(23, 34, 40, 0.15)",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                    >
                      {isHi ? "नहीं, मैं प्रत्येक के लिए चुनूंगा" : "No, I'll choose each"}
                    </button>
                  </div>
                </div>
              )}

              {/* 7. Primary Action Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid rgba(23, 34, 40, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentIndex > 0) {
                        setCurrentIndex((prev) => prev - 1);
                        setShowChangeAmounts(false);
                      } else {
                        onBack();
                      }
                    }}
                    style={{
                      padding: "0.55rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.15)",
                      backgroundColor: "#FFFFFF",
                      color: "var(--color-slate)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <ArrowLeft size={14} /> {isHi ? "पीछे" : "Back"}
                  </button>

                  {/* "Same as last one" button */}
                  {lastAllocationSummary && (
                    <button
                      type="button"
                      onClick={handleApplySameAsLast}
                      title={lastAllocationSummary.summary}
                      style={{
                        padding: "0.55rem 0.95rem",
                        borderRadius: "10px",
                        border: "1.5px solid rgba(198, 83, 120, 0.4)",
                        backgroundColor: "rgba(198, 83, 120, 0.06)",
                        color: "var(--color-gold)",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <RotateCcw size={13} />
                      <span className="truncate max-w-[200px]">
                        {isHi ? "पिछले जैसा:" : "Same as last:"} {lastAllocationSummary.summary}
                      </span>
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  {!isCurrentComplete && (
                    <span style={{ fontSize: "0.76rem", color: "#E11D48", fontWeight: 600 }}>
                      {currentAssetAllocs.length === 0
                        ? (isHi ? "कम से कम एक व्यक्ति चुनें" : "Choose at least one person")
                        : currentTotalPct > 100
                        ? (isHi ? "कुल 100% से अधिक है" : "Total exceeds 100%")
                        : (isHi ? `${leftToAssign}% और आवंटित करें` : `Needs ${leftToAssign}% more`)}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleNextAsset}
                    disabled={!isCurrentComplete}
                    className="btn btn-gold"
                    style={{
                      padding: "0.65rem 1.6rem",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      cursor: isCurrentComplete ? "pointer" : "not-allowed",
                      opacity: isCurrentComplete ? 1 : 0.5,
                      boxShadow: isCurrentComplete ? "0 4px 14px rgba(198, 83, 120, 0.25)" : "none",
                    }}
                  >
                    <span>
                      {currentIndex === assets.length - 1
                        ? (isHi ? "सभी की समीक्षा करें और आगे बढ़ें →" : "Review All & Continue →")
                        : (isHi ? "अगली संपत्ति →" : "Next Asset →")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LIST MODE (COMPACT TABLE WITH MULTI-SELECT & FILTER TABS)              */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem", minHeight: 0 }}>
          {/* Search & Filter Strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.6rem",
              backgroundColor: "#FFFFFF",
              padding: "0.6rem 0.85rem",
              borderRadius: "14px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
            }}
          >
            {/* Search Input */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flex: "1 1 200px" }}>
              <Search size={15} color="var(--color-slate)" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "0.82rem",
                  width: "100%",
                  color: "var(--color-navy)",
                }}
              />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap" }}>
              {(["all", "needs_attention", "custom", "done"] as const).map((filterKey) => {
                const labels: Record<string, string> = {
                  all: `All (${assets.length})`,
                  needs_attention: `Needs Attention (${incompleteAssets.length})`,
                  custom: "Custom",
                  done: `Done (${assets.length - incompleteAssets.length})`,
                };
                const isSel = listFilter === filterKey;
                return (
                  <button
                    key={filterKey}
                    type="button"
                    onClick={() => setListFilter(filterKey)}
                    style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: isSel ? "var(--color-navy)" : "rgba(23, 34, 40, 0.05)",
                      color: isSel ? "#FFFFFF" : "var(--color-slate)",
                    }}
                  >
                    {labels[filterKey]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Multi-Select Action Bar */}
          {selectedAssetIds.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 1rem",
                borderRadius: "12px",
                backgroundColor: "var(--color-navy)",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              <span>{selectedAssetIds.length} assets selected</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setMultiSelectModalOpen(true)}
                  style={{
                    backgroundColor: "var(--color-gold)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.35rem 0.85rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Set Who Gets These
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAssetIds([])}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Asset Rows Table Container */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
            }}
          >
            {filteredListAssets.length > 0 ? (
              filteredListAssets.map((asset) => {
                const totalPct = getAssetTotalPct(asset.id);
                const isComplete = totalPct === 100;
                const isChecked = selectedAssetIds.includes(asset.id);
                const summaryText = formatAllocationSummary(asset.id);

                return (
                  <div
                    key={asset.id}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid rgba(27, 42, 74, 0.08)",
                      padding: "0.65rem 0.95rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {/* Checkbox + Name + Type */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flex: 1, minWidth: 0 }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            setSelectedAssetIds(selectedAssetIds.filter((id) => id !== asset.id));
                          } else {
                            setSelectedAssetIds([...selectedAssetIds, asset.id]);
                          }
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          color: isChecked ? "var(--color-gold)" : "rgba(23, 34, 40, 0.3)",
                        }}
                      >
                        {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>

                      {/* Status Dot */}
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: isComplete
                            ? "var(--color-sage)"
                            : totalPct > 100
                            ? "#E11D48"
                            : "var(--color-gold)",
                          flexShrink: 0,
                        }}
                      />

                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }} className="truncate">
                          {asset.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-slate)" }}>
                          {asset.typeDetails || asset.category}
                        </div>
                      </div>
                    </div>

                    {/* Allocation Summary Badge */}
                    <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <span
                        style={{
                          fontSize: "0.76rem",
                          fontWeight: 600,
                          color: isComplete ? "var(--color-navy)" : "#E11D48",
                          backgroundColor: isComplete ? "rgba(23, 34, 40, 0.04)" : "rgba(225, 29, 72, 0.08)",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "999px",
                          display: "inline-block",
                          maxWidth: "100%",
                        }}
                        className="truncate"
                      >
                        {summaryText}
                      </span>
                    </div>

                    {/* Edit Button -> Opens Custom Allocation Modal for this asset (Requirement 2) */}
                    <button
                      type="button"
                      onClick={() => setSingleAssetModalAsset(asset)}
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(198, 83, 120, 0.4)",
                        backgroundColor: "rgba(198, 83, 120, 0.05)",
                        color: "var(--color-gold)",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      {isHi ? "आवंटन बदलें" : "Edit Allocation"}
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-slate)", fontSize: "0.85rem" }}>
                No assets match your search or filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. REVIEW SUMMARY VIEW (GROUPED BY BENEFICIARY + NEEDS ATTENTION)          */}
      {/* ========================================================================= */}
      {viewMode === "review" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", minHeight: 0, overflowY: "auto" }}>
          {/* Needs Attention Alert if any incomplete assets */}
          {incompleteAssets.length > 0 && (
            <div
              style={{
                backgroundColor: "rgba(225, 29, 72, 0.08)",
                border: "1.5px solid #FDA4AF",
                borderRadius: "14px",
                padding: "0.85rem 1.15rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#BE123C", fontWeight: 700, fontSize: "0.88rem" }}>
                <AlertCircle size={16} />
                <span>Needs Attention ({incompleteAssets.length} assets unallocated or unbalanced):</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {incompleteAssets.map((asset) => {
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSingleAssetModalAsset(asset)}
                      style={{
                        padding: "0.25rem 0.65rem",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #FDA4AF",
                        color: "#BE123C",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {asset.name} (Edit)
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Group Cards per Person */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "var(--color-navy)" }}>
              Allocation Portfolio Summary by Beneficiary:
            </h4>

            {Object.entries(reviewGroups).map(([personName, group]) => {
              const isExpanded = expandedPersonInReview === personName;
              return (
                <div
                  key={personName}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid rgba(27, 42, 74, 0.08)",
                    padding: "0.85rem 1.1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <div
                    onClick={() =>
                      setExpandedPersonInReview(isExpanded ? null : personName)
                    }
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(198, 83, 120, 0.12)",
                          color: "var(--color-gold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                        }}
                      >
                        <Users size={15} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--color-navy)" }}>
                          {group.memberName}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--color-slate)" }}>
                          Receives <strong>{group.assets.length}</strong> {group.assets.length === 1 ? "asset" : "assets"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gold)" }}>
                        {isExpanded ? "Hide Assets" : "View Assets"}
                      </span>
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </div>
                  </div>

                  {/* Expanded asset list */}
                  {isExpanded && (
                    <div
                      style={{
                        paddingTop: "0.5rem",
                        borderTop: "1px solid rgba(23, 34, 40, 0.06)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                      }}
                    >
                      {group.assets.map((asset) => (
                        <div
                          key={asset.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.78rem",
                            backgroundColor: "rgba(23, 34, 40, 0.02)",
                            padding: "0.35rem 0.65rem",
                            borderRadius: "8px",
                          }}
                        >
                          <span style={{ fontWeight: 600, color: "var(--color-navy)" }}>
                            {asset.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSingleAssetModalAsset(asset)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--color-gold)",
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: "0.72rem",
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Residuary Estate Safety Net (Preserved for Statutory ISA §102 Compliance) */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {isHi ? "अनिवार्य सुरक्षा नियम" : "Essential Safety Net"}
                </span>
                <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", backgroundColor: "rgba(27, 42, 74, 0.04)", padding: "0.15rem 0.5rem", borderRadius: "6px" }}>
                  Legal term: Residuary Clause (ISA §102)
                </span>
              </div>
              <h4 style={{ margin: "0.25rem 0 0", fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)", lineHeight: 1.4 }}>
                {isHi
                  ? "यदि कोई संपत्ति छूट गई हो या भविष्य में मिले, तो वह किसे मिले?"
                  : "Who gets anything you haven't specifically mentioned?"}
              </h4>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-gold)", marginTop: "0.15rem" }}>
                {isHi
                  ? "शेष बची हुई संपत्ति (Remaining Assets)"
                  : "Remaining assets (Any property, money or other assets not specifically assigned in your Will)"}
              </div>
              <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.5 }}>
                {isHi
                  ? "यदि भविष्य में कोई नई संपत्ति अर्जित होती है या कोई संपत्ति छूट जाती है, तो यह नियम तय करता है कि वह किसे मिलेगी। इससे परिवार में कभी कोई विवाद या अदालती बंटवारा नहीं होता।"
                  : "If you acquire new wealth in the future or forget to mention any asset, choosing a primary recipient ensures everything is smoothly transferred without dispute or court delays."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  {isHi
                    ? "मुख्य प्राप्तकर्ता (बची हुई संपत्ति के लिए):"
                    : "Primary person to receive remaining assets:"}
                </label>
                <select
                  value={residuaryName}
                  onChange={(e) => {
                    setResiduaryName(e.target.value);
                    onUpdate((prev) => ({ ...prev, residuaryBeneficiaryName: e.target.value }));
                  }}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(23, 34, 40, 0.15)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                  }}
                >
                  {family.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name} ({f.relationship})
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", marginTop: "0.2rem", display: "block" }}>
                  {isHi ? "कानूनी नाम: प्राथमिक अवशेष लाभार्थी (Primary Residuary Legatee)" : "Legal term: Primary Residuary Legatee"}
                </span>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  {isHi
                    ? "बैकअप प्राप्तकर्ता (यदि मुख्य व्यक्ति उपलब्ध न हो):"
                    : "Backup person (If primary person does not survive):"}
                </label>
                <select
                  value={residuaryAltName}
                  onChange={(e) => {
                    setResiduaryAltName(e.target.value);
                    onUpdate((prev) => ({ ...prev, residuaryAlternateName: e.target.value }));
                  }}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(23, 34, 40, 0.15)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                  }}
                >
                  <option value="">None / Direct</option>
                  {family
                    .filter((f) => f.name !== residuaryName)
                    .map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.relationship})
                      </option>
                    ))}
                </select>
                <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", marginTop: "0.2rem", display: "block" }}>
                  {isHi ? "कानूनी नाम: वैकल्पिक अवशेष लाभार्थी (Alternate Residuary Legatee)" : "Legal term: Alternate Residuary Legatee"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MULTI-SELECT BULK MODAL                                                   */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SINGLE ASSET CUSTOM ALLOCATION MODAL (REQUIREMENT 2)                       */}
      {/* ========================================================================= */}
      {singleAssetModalAsset && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSingleAssetModalAsset(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "var(--color-gold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {singleAssetModalAsset.typeDetails || singleAssetModalAsset.category}
                </span>
                <h3 style={{ margin: "0.15rem 0 0", fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {singleAssetModalAsset.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSingleAssetModalAsset(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-slate)",
                  padding: "0.25rem",
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <CustomPercentageAllocator
              key={singleAssetModalAsset.id}
              family={family}
              initialAllocations={getAssetAllocations(singleAssetModalAsset.id).map((a) => ({
                beneficiaryId: a.beneficiaryId,
                beneficiaryName: a.beneficiaryName,
                percentage: a.percentage,
              }))}
              showActions={true}
              assetTitle={singleAssetModalAsset.name}
              assetSubtitle="Choose how much of this asset each person should receive."
              saveButtonLabel={isHi ? "आवंटन सहेजें" : "Save Allocation"}
              onCancel={() => setSingleAssetModalAsset(null)}
              onSave={(updatedAllocs) => handleSaveSingleAssetAllocation(singleAssetModalAsset.id, updatedAllocs)}
              isHi={isHi}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MULTI-SELECT BULK MODAL (REQUIREMENT 3: EQUAL VS CUSTOM)                  */}
      {/* ========================================================================= */}
      {multiSelectModalOpen && selectedAssetIds.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setMultiSelectModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "580px",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "var(--color-gold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isHi ? "सामूहिक आवंटन" : "Bulk Allocation"}
                </span>
                <h3 style={{ margin: "0.15rem 0 0", fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  Assign to {selectedAssetIds.length} Selected Assets
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMultiSelectModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-slate)",
                  padding: "0.25rem",
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Distribution Method Selector: Option 1 vs Option 2 (Requirement 3) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              {/* Option 1: Distribute Equally */}
              <button
                type="button"
                onClick={() => setBulkDistributionMode("equal")}
                style={{
                  padding: "0.85rem 0.95rem",
                  borderRadius: "14px",
                  border:
                    bulkDistributionMode === "equal"
                      ? "2px solid var(--color-gold)"
                      : "1.5px solid rgba(27, 42, 74, 0.12)",
                  backgroundColor:
                    bulkDistributionMode === "equal" ? "rgba(198, 83, 120, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {isHi ? "समान रूप से बांटें" : "Distribute Equally"}
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--color-slate)", marginTop: "2px", lineHeight: 1.3 }}>
                  {isHi ? "प्रत्येक चुने हुए सदस्य को बराबर हिस्सा दें।" : "Give each selected beneficiary an equal share."}
                </div>
              </button>

              {/* Option 2: Custom Distribution */}
              <button
                type="button"
                onClick={() => setBulkDistributionMode("custom")}
                style={{
                  padding: "0.85rem 0.95rem",
                  borderRadius: "14px",
                  border:
                    bulkDistributionMode === "custom"
                      ? "2px solid var(--color-gold)"
                      : "1.5px solid rgba(27, 42, 74, 0.12)",
                  backgroundColor:
                    bulkDistributionMode === "custom" ? "rgba(198, 83, 120, 0.06)" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {isHi ? "कस्टम प्रतिशत वितरण" : "Custom Distribution"}
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--color-slate)", marginTop: "2px", lineHeight: 1.3 }}>
                  {isHi ? "चुनें कि किस व्यक्ति को कितना प्रतिशत मिलना चाहिए।" : "Choose exactly how much each beneficiary should receive."}
                </div>
              </button>
            </div>

            {/* TAB CONTENT: OPTION 1 - Distribute Equally */}
            {bulkDistributionMode === "equal" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.45rem" }}>
                    {isHi ? "किन सदस्यों में बराबर बांटना है? (क्लिक करके चुनें):" : "Select beneficiaries to share equally:"}
                  </div>

                  {/* Beneficiary Toggle Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {family.map((member) => {
                      const isChecked = bulkEqualSelectedIds.includes(member.id);
                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => {
                            if (isChecked) {
                              setBulkEqualSelectedIds(bulkEqualSelectedIds.filter((id) => id !== member.id));
                            } else {
                              setBulkEqualSelectedIds([...bulkEqualSelectedIds, member.id]);
                            }
                          }}
                          style={{
                            padding: "0.65rem 0.8rem",
                            borderRadius: "12px",
                            border: isChecked
                              ? "2px solid var(--color-gold)"
                              : "1.5px solid rgba(27, 42, 74, 0.12)",
                            backgroundColor: isChecked ? "rgba(198, 83, 120, 0.08)" : "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.55rem",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              backgroundColor: isChecked ? "var(--color-gold)" : "rgba(27, 42, 74, 0.08)",
                              color: isChecked ? "#FFFFFF" : "var(--color-navy)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              flexShrink: 0,
                            }}
                          >
                            {isChecked ? <Check size={16} strokeWidth={3} /> : member.name.slice(0, 1)}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)" }} className="truncate">
                              {member.name}
                            </div>
                            <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                              {member.relationship}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Preset Buttons */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setBulkEqualSelectedIds(children.map((c) => c.id))}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(198, 83, 120, 0.3)",
                          backgroundColor: "#FFFFFF",
                          color: "var(--color-gold)",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        All Children ({children.length})
                      </button>
                    )}
                    {spouse && children.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setBulkEqualSelectedIds([spouse.id, ...children.map((c) => c.id)])}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(198, 83, 120, 0.3)",
                          backgroundColor: "#FFFFFF",
                          color: "var(--color-gold)",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Spouse & Children
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setBulkEqualSelectedIds(family.map((f) => f.id))}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(27, 42, 74, 0.2)",
                        backgroundColor: "#FFFFFF",
                        color: "var(--color-navy)",
                        fontSize: "0.74rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      All Family
                    </button>
                  </div>
                </div>

                {/* Live Preview Before Applying (Requirement 3) */}
                <div
                  style={{
                    backgroundColor: "rgba(27, 42, 74, 0.03)",
                    borderRadius: "14px",
                    border: "1px solid rgba(27, 42, 74, 0.1)",
                    padding: "0.95rem 1.15rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-navy)" }}>
                      {selectedAssetIds.length} Selected Assets
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "var(--color-slate)" }}>
                      {bulkEqualSelectedIds.length > 0 ? "Equal Split (100% Total)" : "None selected"}
                    </span>
                  </div>

                  {bulkEqualSelectedIds.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {bulkEqualSelectedIds.map((id, idx) => {
                        const mem = family.find((f) => f.id === id);
                        const count = bulkEqualSelectedIds.length;
                        const share = Math.floor(100 / count);
                        const remainder = 100 - share * count;
                        const pct = idx === count - 1 ? share + remainder : share;

                        return (
                          <div
                            key={id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "0.35rem 0.6rem",
                              backgroundColor: "#FFFFFF",
                              borderRadius: "8px",
                              border: "1px solid rgba(27, 42, 74, 0.06)",
                            }}
                          >
                            <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--color-navy)" }}>
                              {mem ? mem.name : "Beneficiary"} ({mem?.relationship})
                            </span>
                            <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--color-gold)" }}>
                              {pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.78rem", color: "#E11D48", padding: "0.4rem 0" }}>
                      Please select at least one person to distribute these assets.
                    </div>
                  )}
                </div>

                {/* Primary Action Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.25rem" }}>
                  <button
                    type="button"
                    onClick={() => setMultiSelectModalOpen(false)}
                    style={{
                      padding: "0.65rem 1.25rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.2)",
                      backgroundColor: "#FFFFFF",
                      color: "var(--color-navy)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      height: "46px",
                    }}
                  >
                    {isHi ? "रद्द करें" : "Cancel"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyBulkAllocation(bulkEqualSelectedIds)}
                    disabled={bulkEqualSelectedIds.length === 0}
                    style={{
                      padding: "0.65rem 1.6rem",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor:
                        bulkEqualSelectedIds.length > 0 ? "var(--color-gold)" : "rgba(27, 42, 74, 0.2)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      cursor: bulkEqualSelectedIds.length > 0 ? "pointer" : "not-allowed",
                      height: "46px",
                      boxShadow:
                        bulkEqualSelectedIds.length > 0 ? "0 4px 14px rgba(198, 83, 120, 0.3)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {isHi
                      ? `${selectedAssetIds.length} संपत्तियों पर लागू करें`
                      : `Apply to ${selectedAssetIds.length} Assets`}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: OPTION 2 - Custom Distribution (Exact same CustomPercentageAllocator) */}
            {bulkDistributionMode === "custom" && (
              <CustomPercentageAllocator
                key={`bulk-custom-${selectedAssetIds.join("-")}`}
                family={family}
                initialAllocations={
                  bulkEqualSelectedIds.length > 0
                    ? bulkEqualSelectedIds.map((id, idx) => {
                        const mem = family.find((f) => f.id === id);
                        const count = bulkEqualSelectedIds.length;
                        const share = Math.floor(100 / count);
                        const remainder = 100 - share * count;
                        return {
                          beneficiaryId: id,
                          beneficiaryName: mem ? mem.name : "Beneficiary",
                          percentage: idx === count - 1 ? share + remainder : share,
                        };
                      })
                    : family.slice(0, 2).map((mem, idx) => ({
                        beneficiaryId: mem.id,
                        beneficiaryName: mem.name,
                        percentage: idx === 0 ? (family.length > 1 ? 50 : 100) : 50,
                      }))
                }
                showActions={true}
                assetTitle={`${selectedAssetIds.length} Selected Assets`}
                assetSubtitle="Choose exactly how much each beneficiary should receive across all selected assets."
                saveButtonLabel={
                  isHi
                    ? `${selectedAssetIds.length} संपत्तियों पर लागू करें`
                    : `Apply to ${selectedAssetIds.length} Assets`
                }
                onCancel={() => setMultiSelectModalOpen(false)}
                onSave={(customAllocs) => handleApplyBulkAllocationWithDistribution(customAllocs)}
                isHi={isHi}
              />
            )}
          </div>
        </div>
      )}

      {/* Global Wizard Footer */}
      <WizardButton 
        onBack={onBack} 
        onNext={() => {
          onUpdate((prev) => ({
            ...prev,
            allocations,
            residuaryBeneficiaryName: residuaryName.trim(),
            residuaryAlternateName: residuaryAltName.trim(),
          }));
          onNext();
        }}
      />
    </div>
  );
}
