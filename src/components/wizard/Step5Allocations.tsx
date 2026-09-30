"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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

interface Step5AllocationsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Allocations({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step5AllocationsProps) {
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
    if (list.length === 0) return "Not allocated";
    if (list.length === 1) {
      return `${list[0].beneficiaryName} gets 100%`;
    }
    const isEquallySplit = list.every((item) => Math.abs(item.percentage - 100 / list.length) < 2);
    const parts = list.map((item) => `${item.beneficiaryName} ${item.percentage}%`);
    if (isEquallySplit) {
      return `${parts.join(" · ")}, split equally`;
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
    }
  };

  // Apply Quick Presets
  const applyPreset = (
    assetId: string,
    preset: "spouse_100" | "equal_children" | "spouse_children_50_50"
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
    } else if (preset === "spouse_children_50_50") {
      const remaining = allocations.filter((a) => a.assetId !== assetId);
      const newAdds: BeneficiaryAllocation[] = [];

      if (spouse) {
        newAdds.push({
          id: `alc-${Date.now()}-sp`,
          assetId,
          beneficiaryId: spouse.id,
          beneficiaryName: spouse.name,
          percentage: 50,
        });
      }
      if (children.length > 0) {
        const pool = spouse ? 50 : 100;
        const share = Math.floor(pool / children.length);
        const remainder = pool - share * children.length;
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
      setSrAnnouncement("Applied 50% Spouse and 50% Children split.");
    }
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(198, 83, 120, 0.12)", color: "var(--color-gold)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 5 of 14 • Testamentary Bequests & Shares
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Distribute Your Assets
            </h2>
            <span style={{ fontSize: "0.88rem", color: "var(--color-gold)", fontWeight: 600 }}>
              (संपत्ति का बंटवारा)
            </span>
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
              Quick Mode
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
              List Mode ({assets.length})
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
              Review Summary
            </button>
          </div>

          <AudioAssistantButton
            textToSpeak="Who should receive this asset? Tap any family member card to give 100 percent or select multiple people to divide it equally. You can also tap Change Amounts to enter custom percentages."
            label="Listen / सुनें 🔊"
          />
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
                      Asset {currentIndex + 1} of {assets.length}
                    </span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ color: "var(--color-sage)", fontWeight: 600 }}>{saveStatus}</span>
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
                    Skip for now →
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
                  Who should get this?
                </h4>

                {/* Quick Presets Chips */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-slate)" }}>
                    Presets:
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
                      100% Spouse
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
                      Equal Children
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
                      50% Spouse / 50% Children
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
                          {member.relationship}
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
                Tip: Press number keys <strong>1-{family.length}</strong> to pick, <strong>Enter</strong> to continue, <strong>S</strong> for same as last.
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
                      ? "Choose at least one person"
                      : formatAllocationSummary(currentAsset.id)}
                  </span>
                </div>

                {/* 6. "Change amounts" inline panel toggle */}
                {currentAssetAllocs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowChangeAmounts(!showChangeAmounts)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-gold)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.2rem 0.4rem",
                    }}
                  >
                    <Sliders size={13} />
                    <span>{showChangeAmounts ? "Hide custom amounts" : "Change amounts"}</span>
                    {showChangeAmounts ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
              </div>

              {/* 6. Inline Expandable Panel: Shows ONLY selected people with steppers + sliders */}
              {showChangeAmounts && currentAssetAllocs.length > 0 && (
                <div
                  style={{
                    backgroundColor: "rgba(23, 34, 40, 0.02)",
                    borderRadius: "14px",
                    border: "1px solid rgba(23, 34, 40, 0.08)",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Fine-Tune Percentages:
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: leftToAssign === 0 ? "var(--color-sage)" : "#E11D48",
                      }}
                    >
                      {leftToAssign === 0
                        ? "✓ 100% Balanced"
                        : leftToAssign > 0
                        ? `Left to assign: ${leftToAssign}%`
                        : `Over allocated by ${Math.abs(leftToAssign)}%`}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {currentAssetAllocs.map((alc) => {
                      return (
                        <div
                          key={alc.beneficiaryId}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            backgroundColor: "#FFFFFF",
                            padding: "0.6rem 0.85rem",
                            borderRadius: "10px",
                            border: "1px solid rgba(23, 34, 40, 0.06)",
                          }}
                        >
                          <div style={{ width: "130px", flexShrink: 0 }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)" }}>
                              {alc.beneficiaryName}
                            </div>
                          </div>

                          {/* Minus/Plus Steppers */}
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <button
                              type="button"
                              onClick={() =>
                                handleManualPercentageChange(
                                  currentAsset.id,
                                  alc.beneficiaryId,
                                  alc.percentage - 5
                                )
                              }
                              disabled={alc.percentage <= 0}
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                border: "1px solid rgba(23, 34, 40, 0.15)",
                                background: "#FFFFFF",
                                cursor: "pointer",
                                fontWeight: 800,
                                fontSize: "1rem",
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={alc.percentage}
                              onChange={(e) =>
                                handleManualPercentageChange(
                                  currentAsset.id,
                                  alc.beneficiaryId,
                                  Number(e.target.value)
                                )
                              }
                              style={{
                                width: "50px",
                                textAlign: "center",
                                padding: "0.25rem",
                                borderRadius: "6px",
                                border: "1px solid rgba(23, 34, 40, 0.15)",
                                fontWeight: 800,
                                fontSize: "0.85rem",
                                color: "var(--color-navy)",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleManualPercentageChange(
                                  currentAsset.id,
                                  alc.beneficiaryId,
                                  alc.percentage + 5
                                )
                              }
                              disabled={alc.percentage >= 100}
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                border: "1px solid rgba(23, 34, 40, 0.15)",
                                background: "#FFFFFF",
                                cursor: "pointer",
                                fontWeight: 800,
                                fontSize: "1rem",
                              }}
                            >
                              +
                            </button>
                          </div>

                          {/* Existing slider as secondary control */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={alc.percentage}
                            onChange={(e) =>
                              handleManualPercentageChange(
                                currentAsset.id,
                                alc.beneficiaryId,
                                Number(e.target.value)
                              )
                            }
                            style={{
                              flex: 1,
                              accentColor: "var(--color-navy)",
                              cursor: "pointer",
                              height: "5px",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
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
                      Yes, apply to all {smartPrompt.remainingCount}
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
                      No, I&apos;ll choose each
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
                    <ArrowLeft size={14} /> Back
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
                        Same as last: {lastAllocationSummary.summary}
                      </span>
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  {!isCurrentComplete && (
                    <span style={{ fontSize: "0.76rem", color: "#E11D48", fontWeight: 600 }}>
                      {currentAssetAllocs.length === 0
                        ? "Choose at least one person"
                        : currentTotalPct > 100
                        ? "Total exceeds 100%"
                        : `Needs ${leftToAssign}% more`}
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
                      {currentIndex === assets.length - 1 ? "Review All & Continue →" : "Next Asset →"}
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

                    {/* Edit Button -> Opens Quick Mode for this asset */}
                    <button
                      type="button"
                      onClick={() => {
                        const targetIdx = assets.findIndex((a) => a.id === asset.id);
                        if (targetIdx >= 0) setCurrentIndex(targetIdx);
                        setViewMode("quick");
                      }}
                      style={{
                        padding: "0.3rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(198, 83, 120, 0.3)",
                        backgroundColor: "#FFFFFF",
                        color: "var(--color-gold)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      Edit
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
                      onClick={() => {
                        const idx = assets.findIndex((a) => a.id === asset.id);
                        if (idx >= 0) setCurrentIndex(idx);
                        setViewMode("quick");
                      }}
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
                            onClick={() => {
                              const idx = assets.findIndex((a) => a.id === asset.id);
                              if (idx >= 0) setCurrentIndex(idx);
                              setViewMode("quick");
                            }}
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
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Mandatory Statutory Clause • ISA §102
              </span>
              <h4 style={{ margin: "0.15rem 0 0", fontSize: "1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                Residuary Estate Safety Net
              </h4>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "var(--color-slate)" }}>
                Who receives any unspecified or future wealth? Appointing a residuary legatee guarantees zero intestacy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Primary Residuary Legatee:
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
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Alternate Residuary Legatee:
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MULTI-SELECT BULK MODAL                                                   */}
      {/* ========================================================================= */}
      {multiSelectModalOpen && (
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
              maxWidth: "520px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  Assign to {selectedAssetIds.length} Selected Assets
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--color-slate)" }}>
                  Select who receives all {selectedAssetIds.length} assets equally:
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMultiSelectModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-slate)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {family.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleApplyBulkAllocation([member.id])}
                  style={{
                    padding: "0.75rem 0.85rem",
                    borderRadius: "12px",
                    border: "1.5px solid rgba(23, 34, 40, 0.12)",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(198, 83, 120, 0.1)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                    }}
                  >
                    {member.name.slice(0, 1)}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      100% {member.name}
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                      {member.relationship}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {children.length > 1 && (
              <button
                type="button"
                onClick={() => handleApplyBulkAllocation(children.map((c) => c.id))}
                style={{
                  padding: "0.75rem",
                  borderRadius: "12px",
                  border: "1.5px solid var(--color-gold)",
                  backgroundColor: "rgba(198, 83, 120, 0.08)",
                  color: "var(--color-gold)",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Split Equally Among All Children
              </button>
            )}
          </div>
        </div>
      )}

      {/* Global Wizard Footer */}
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
          onClick={() => {
            onUpdate((prev) => ({
              ...prev,
              allocations,
              residuaryBeneficiaryName: residuaryName.trim(),
              residuaryAlternateName: residuaryAltName.trim(),
            }));
            onNext();
          }}
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
            cursor: "pointer",
          }}
        >
          Save & Continue to Executors →
        </button>
      </div>
    </div>
  );
}
