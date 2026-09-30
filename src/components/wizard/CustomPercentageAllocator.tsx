"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FamilyMember } from "@/lib/willDraftingStore";
import { Plus, Trash2, CheckCircle2, AlertCircle, AlertTriangle, Sparkles } from "lucide-react";

export interface AllocationEntry {
  beneficiaryId: string;
  beneficiaryName: string;
  percentage: number | string;
}

export interface CustomPercentageAllocatorProps {
  family: FamilyMember[];
  initialAllocations: { beneficiaryId: string; beneficiaryName: string; percentage: number }[];
  onChange?: (allocations: { beneficiaryId: string; beneficiaryName: string; percentage: number }[], isValid: boolean) => void;
  onSave?: (allocations: { beneficiaryId: string; beneficiaryName: string; percentage: number }[]) => void;
  onCancel?: () => void;
  assetTitle?: string;
  assetSubtitle?: string;
  saveButtonLabel?: string;
  showActions?: boolean; // if true, shows modal title, description, and Cancel/Save buttons
  isHi?: boolean;
}

export default function CustomPercentageAllocator({
  family,
  initialAllocations,
  onChange,
  onSave,
  onCancel,
  assetTitle,
  assetSubtitle,
  saveButtonLabel = "Save Allocation",
  showActions = true,
  isHi = false,
}: CustomPercentageAllocatorProps) {
  // Initialize rows from initialAllocations or default to first family member
  const [rows, setRows] = useState<AllocationEntry[]>(() => {
    if (initialAllocations && initialAllocations.length > 0) {
      return initialAllocations.map((a) => ({
        beneficiaryId: a.beneficiaryId,
        beneficiaryName: a.beneficiaryName,
        percentage: a.percentage,
      }));
    }
    if (family.length > 0) {
      return [
        {
          beneficiaryId: family[0].id,
          beneficiaryName: family[0].name,
          percentage: 100,
        },
      ];
    }
    return [];
  });

  // Calculate total percentage dynamically
  const totalAllocated = useMemo(() => {
    return rows.reduce((sum, r) => {
      const val = typeof r.percentage === "number" ? r.percentage : parseInt(r.percentage, 10);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [rows]);

  // Validation: total must equal exactly 100%, rows must not have duplicates or empty percentages
  const isValid = useMemo(() => {
    return (
      totalAllocated === 100 &&
      rows.length > 0 &&
      rows.every(
        (r) =>
          r.beneficiaryId.trim().length > 0 &&
          r.percentage !== "" &&
          !isNaN(Number(r.percentage)) &&
          Number(r.percentage) >= 0 &&
          Number(r.percentage) <= 100
      )
    );
  }, [totalAllocated, rows]);

  // Set of selected IDs to prevent duplicates
  const selectedBeneficiaryIds = useMemo(() => {
    return new Set(rows.map((r) => r.beneficiaryId));
  }, [rows]);

  // Store onChange in ref to prevent re-running effect when parent re-renders
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const isFirstRender = useRef(true);
  const prevSerializedRef = useRef<string>("");

  // Report changes upwards only when user actually modifies rows
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevSerializedRef.current = JSON.stringify(rows);
      return;
    }

    const serialized = JSON.stringify(rows);
    if (serialized === prevSerializedRef.current) {
      return;
    }
    prevSerializedRef.current = serialized;

    if (onChangeRef.current) {
      const sanitized = rows.map((r) => ({
        beneficiaryId: r.beneficiaryId,
        beneficiaryName: r.beneficiaryName,
        percentage: typeof r.percentage === "number" ? r.percentage : parseInt(r.percentage, 10) || 0,
      }));
      onChangeRef.current(sanitized, isValid);
    }
  }, [rows, isValid]);

  // Handle changing person dropdown (prevent selecting already chosen person)
  const handleBeneficiaryChange = (index: number, newId: string) => {
    if (rows.some((r, i) => i !== index && r.beneficiaryId === newId)) return;
    const person = family.find((f) => f.id === newId);
    if (!person) return;

    setRows((prev) =>
      prev.map((r, i) =>
        i === index
          ? { ...r, beneficiaryId: person.id, beneficiaryName: person.name }
          : r
      )
    );
  };

  // Handle changing percentage input (allows raw typing of whole numbers 0 to 100)
  const handlePercentageChange = (index: number, rawVal: string | number) => {
    setRows((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r;
        if (typeof rawVal === "string") {
          if (rawVal === "") return { ...r, percentage: "" };
          const parsed = parseInt(rawVal.replace(/[^0-9]/g, ""), 10);
          if (isNaN(parsed)) return { ...r, percentage: "" };
          const clamped = Math.max(0, Math.min(100, parsed));
          return { ...r, percentage: clamped };
        }
        const clamped = Math.max(0, Math.min(100, Math.round(rawVal)));
        return { ...r, percentage: clamped };
      })
    );
  };

  // Stepper increment / decrement by 1%
  const handleStep = (index: number, delta: number) => {
    setRows((prev) =>
      prev.map((r, i) => {
        if (i !== index) return r;
        const current = typeof r.percentage === "number" ? r.percentage : parseInt(r.percentage, 10) || 0;
        const next = Math.max(0, Math.min(100, current + delta));
        return { ...r, percentage: next };
      })
    );
  };

  // Add another person (preselect next available family member)
  const handleAddPerson = () => {
    const unselected = family.find((f) => !selectedBeneficiaryIds.has(f.id));
    if (!unselected) return;

    const remaining = Math.max(0, 100 - totalAllocated);
    setRows((prev) => [
      ...prev,
      {
        beneficiaryId: unselected.id,
        beneficiaryName: unselected.name,
        percentage: remaining,
      },
    ]);
  };

  // Remove person
  const handleRemovePerson = (index: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Auto balance remaining to 100%
  const handleAutoBalance = () => {
    if (rows.length === 0) return;
    const diff = 100 - totalAllocated;
    if (diff === 0) return;

    const share = Math.floor(diff / rows.length);
    const remainder = diff - share * rows.length;

    setRows((prev) =>
      prev.map((r, i) => {
        const cur = typeof r.percentage === "number" ? r.percentage : parseInt(r.percentage, 10) || 0;
        const add = share + (i === prev.length - 1 ? remainder : 0);
        return {
          ...r,
          percentage: Math.max(0, Math.min(100, cur + add)),
        };
      })
    );
  };

  // Final submit
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid || !onSave) return;
    const finalAllocations = rows.map((r) => ({
      beneficiaryId: r.beneficiaryId,
      beneficiaryName: r.beneficiaryName,
      percentage: typeof r.percentage === "number" ? r.percentage : parseInt(r.percentage, 10) || 0,
    }));
    onSave(finalAllocations);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
      {/* Header section (if showActions is true) */}
      {showActions && (
        <div style={{ borderBottom: "1px solid rgba(27, 42, 74, 0.08)", paddingBottom: "0.85rem" }}>
          {assetTitle && (
            <div
              style={{
                display: "inline-block",
                fontSize: "0.74rem",
                fontWeight: 800,
                color: "var(--color-gold)",
                backgroundColor: "rgba(198, 83, 120, 0.08)",
                padding: "0.2rem 0.6rem",
                borderRadius: "6px",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {assetTitle}
            </div>
          )}
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)" }}>
            {isHi ? "यह संपत्ति किसे मिलनी चाहिए?" : "Who should receive this asset?"}
          </h3>
          <p style={{ margin: "0.3rem 0 0", fontSize: "0.85rem", color: "var(--color-slate)", lineHeight: 1.4 }}>
            {assetSubtitle ||
              (isHi
                ? "चुनें कि प्रत्येक व्यक्ति को इस संपत्ति का कितना हिस्सा मिलना चाहिए।"
                : "Choose how much of this asset each person should receive.")}
          </p>
        </div>
      )}

      {/* Beneficiary Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {rows.map((row, idx) => {
          const numValue = typeof row.percentage === "number" ? row.percentage : parseInt(row.percentage, 10) || 0;

          return (
            <div
              key={`${row.beneficiaryId}-${idx}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                backgroundColor: "#FFFFFF",
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                border: "1.5px solid rgba(27, 42, 74, 0.1)",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
              }}
            >
              {/* Row: Dropdown + Percentage Input with Steppers + Delete */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.65rem",
                }}
              >
                {/* Beneficiary Dropdown */}
                <div style={{ flex: "1 1 200px", minWidth: "160px" }}>
                  <select
                    value={row.beneficiaryId}
                    onChange={(e) => handleBeneficiaryChange(idx, e.target.value)}
                    aria-label="Select beneficiary"
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "10px",
                      border: "1.5px solid rgba(27, 42, 74, 0.16)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      backgroundColor: "#FAFAFA",
                      outline: "none",
                      cursor: "pointer",
                      height: "44px",
                    }}
                  >
                    {family.map((member) => {
                      const isAlreadyChosen = member.id !== row.beneficiaryId && selectedBeneficiaryIds.has(member.id);
                      return (
                        <option key={member.id} value={member.id} disabled={isAlreadyChosen}>
                          {member.name} ({member.relationship}){isAlreadyChosen ? " — (Selected)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Percentage Controls: Stepper - / Input % / Stepper + */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <button
                    type="button"
                    onClick={() => handleStep(idx, -1)}
                    disabled={numValue <= 0}
                    title="Decrease by 1%"
                    aria-label="Decrease percentage by 1%"
                    style={{
                      width: "36px",
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid rgba(27, 42, 74, 0.18)",
                      background: "#FFFFFF",
                      cursor: numValue <= 0 ? "not-allowed" : "pointer",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: "var(--color-navy)",
                      opacity: numValue <= 0 ? 0.35 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>

                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.percentage}
                      onChange={(e) => handlePercentageChange(idx, e.target.value)}
                      placeholder="0"
                      aria-label="Percentage value"
                      style={{
                        width: "72px",
                        height: "44px",
                        textAlign: "center",
                        padding: "0.2rem 1.2rem 0.2rem 0.3rem",
                        borderRadius: "8px",
                        border: "1.5px solid var(--color-navy)",
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: "var(--color-navy)",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "var(--color-navy)",
                        pointerEvents: "none",
                      }}
                    >
                      %
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStep(idx, 1)}
                    disabled={numValue >= 100}
                    title="Increase by 1%"
                    aria-label="Increase percentage by 1%"
                    style={{
                      width: "36px",
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid rgba(27, 42, 74, 0.18)",
                      background: "#FFFFFF",
                      cursor: numValue >= 100 ? "not-allowed" : "pointer",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: "var(--color-navy)",
                      opacity: numValue >= 100 ? 0.35 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>

                  {/* Delete Button (if more than 1 row) */}
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePerson(idx)}
                      title="Remove person"
                      aria-label="Remove person"
                      style={{
                        width: "40px",
                        height: "44px",
                        marginLeft: "0.3rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(225, 29, 72, 0.2)",
                        backgroundColor: "rgba(225, 29, 72, 0.05)",
                        color: "#E11D48",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Slider for smooth dragging */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0 0.2rem" }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={numValue}
                  onChange={(e) => handlePercentageChange(idx, Number(e.target.value))}
                  aria-label="Percentage slider"
                  style={{
                    flex: 1,
                    accentColor: "var(--color-navy)",
                    cursor: "pointer",
                    height: "6px",
                  }}
                />
                <span style={{ fontSize: "0.72rem", color: "var(--color-slate)", minWidth: "30px", textAlign: "right" }}>
                  {numValue}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* "+ Add another person" button */}
      {selectedBeneficiaryIds.size < family.length && (
        <button
          type="button"
          onClick={handleAddPerson}
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.65rem 1rem",
            borderRadius: "10px",
            border: "1.5px dashed var(--color-gold)",
            backgroundColor: "rgba(198, 83, 120, 0.05)",
            color: "var(--color-gold)",
            fontSize: "0.86rem",
            fontWeight: 700,
            cursor: "pointer",
            minHeight: "44px",
            transition: "all 0.15s ease",
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>{isHi ? "+ अन्य व्यक्ति जोड़ें" : "+ Add another person"}</span>
        </button>
      )}

      {/* Prominent Total Allocated Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          padding: "0.95rem 1.15rem",
          borderRadius: "14px",
          backgroundColor:
            totalAllocated === 100
              ? "rgba(95, 126, 117, 0.12)"
              : totalAllocated > 100
              ? "rgba(225, 29, 72, 0.08)"
              : "rgba(198, 83, 120, 0.08)",
          border:
            totalAllocated === 100
              ? "1.5px solid var(--color-sage)"
              : totalAllocated > 100
              ? "1.5px solid #FDA4AF"
              : "1.5px solid rgba(198, 83, 120, 0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          {totalAllocated === 100 ? (
            <CheckCircle2 size={24} color="var(--color-sage)" />
          ) : totalAllocated > 100 ? (
            <AlertTriangle size={24} color="#E11D48" />
          ) : (
            <AlertCircle size={24} color="var(--color-gold)" />
          )}

          <div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                color:
                  totalAllocated === 100
                    ? "var(--color-sage)"
                    : totalAllocated > 100
                    ? "#E11D48"
                    : "var(--color-navy)",
              }}
            >
              Total allocated: {totalAllocated}%
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-slate)", marginTop: "2px" }}>
              {totalAllocated === 100
                ? isHi
                  ? "✓ संपूर्ण 100% आबंटित (मान्य)"
                  : "✓ Exactly 100% allocated (Complete & Valid)"
                : totalAllocated > 100
                ? isHi
                  ? `कुल 100% से ${totalAllocated - 100}% अधिक है। कृपया घटाएं।`
                  : `Allocation exceeds 100% by ${totalAllocated - 100}%. Please reduce percentages.`
                : isHi
                ? `आवंटन अधूरा है: ${100 - totalAllocated}% और आबंटित करना शेष है। कुल 100% होना चाहिए।`
                : `Allocation is incomplete: ${100 - totalAllocated}% left to allocate. Total must equal 100%.`}
            </div>
          </div>
        </div>

        {totalAllocated !== 100 && (
          <button
            type="button"
            onClick={handleAutoBalance}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "8px",
              border: "1px solid var(--color-gold)",
              backgroundColor: "rgba(198, 83, 120, 0.12)",
              color: "var(--color-gold)",
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <Sparkles size={13} />
            <span>⚡ Auto-Balance to 100%</span>
          </button>
        )}
      </div>

      {/* Modal Actions (Cancel / Save Allocation) */}
      {showActions && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "0.5rem",
            paddingTop: "0.95rem",
            borderTop: "1px solid rgba(27, 42, 74, 0.08)",
          }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "0.65rem 1.35rem",
                borderRadius: "10px",
                border: "1px solid rgba(27, 42, 74, 0.2)",
                backgroundColor: "#FFFFFF",
                color: "var(--color-navy)",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                height: "46px",
                minWidth: "90px",
              }}
            >
              {isHi ? "रद्द करें" : "Cancel"}
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={!isValid}
            style={{
              padding: "0.65rem 1.6rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: isValid ? "var(--color-gold)" : "rgba(27, 42, 74, 0.2)",
              color: "#FFFFFF",
              fontSize: "0.9rem",
              fontWeight: 800,
              cursor: isValid ? "pointer" : "not-allowed",
              boxShadow: isValid ? "0 4px 14px rgba(198, 83, 120, 0.3)" : "none",
              height: "46px",
              opacity: isValid ? 1 : 0.6,
              transition: "all 0.15s ease",
            }}
          >
            {saveButtonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
