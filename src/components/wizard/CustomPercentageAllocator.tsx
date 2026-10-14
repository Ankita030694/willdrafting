"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FamilyMember } from "@/lib/willDraftingStore";
import { Plus, Trash2, CheckCircle2, AlertCircle, AlertTriangle, Sparkles } from "lucide-react";
import { sanitizePercent } from "@/lib/inputSanitizers";

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
  const toNum = (v: number | string): number => {
    const n = typeof v === "number" ? v : parseInt(String(v), 10);
    return isNaN(n) ? 0 : n;
  };

  // Rows that carry a real share (0% rows are ignored when comparing with the parent's copy)
  const keyOf = (list: { beneficiaryId: string; percentage: number | string }[]) =>
    JSON.stringify(list.filter((r) => toNum(r.percentage) > 0).map((r) => [r.beneficiaryId, toNum(r.percentage)]));

  const buildRowsFromProps = (): AllocationEntry[] => {
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
  };

  // Initialize rows from initialAllocations or default to first family member
  const [rows, setRows] = useState<AllocationEntry[]>(buildRowsFromProps);

  // Calculate total percentage dynamically
  const totalAllocated = useMemo(() => {
    return rows.reduce((sum, r) => sum + toNum(r.percentage), 0);
  }, [rows]);

  const remaining = 100 - totalAllocated;

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
        percentage: toNum(r.percentage),
      }));
      onChangeRef.current(sanitized, isValid);
    }
  }, [rows, isValid]);

  // Re-sync local rows when the parent hands us a genuinely different allocation
  // (e.g. beneficiary cards toggled outside this component).
  const propsKey = keyOf(initialAllocations || []);
  const lastPropsKeyRef = useRef(propsKey);
  useEffect(() => {
    if (propsKey === lastPropsKeyRef.current) return;
    lastPropsKeyRef.current = propsKey;
    if (keyOf(rows) === propsKey) return; // parent just echoed what we emitted
    const next = buildRowsFromProps();
    prevSerializedRef.current = JSON.stringify(next); // external change: don't echo it back
    setRows(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsKey]);

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

  /**
   * Applies a new value to one row while guaranteeing the combined total never exceeds 100%.
   * Any excess is taken away from the OTHER rows, starting with the earliest one
   * (e.g. A=60, B set to 60 -> A becomes 40).
   */
  function applyPercentage(currentRows: AllocationEntry[], changedIndex: number, rawValue: number): AllocationEntry[] {
    const n = currentRows.length;
    if (n === 0) return currentRows;
    if (n === 1) return [{ ...currentRows[0], percentage: 100 }];

    const value = Math.max(0, Math.min(100, Math.round(rawValue)));
    const next = currentRows.map((r, i) => (i === changedIndex ? { ...r, percentage: value } : { ...r }));

    let excess = next.reduce((s, r) => s + toNum(r.percentage), 0) - 100;
    for (let i = 0; i < next.length && excess > 0; i++) {
      if (i === changedIndex) continue;
      const cur = toNum(next[i].percentage);
      const take = Math.min(cur, excess);
      next[i] = { ...next[i], percentage: cur - take };
      excess -= take;
    }
    return next;
  }

  // Handle typing in a percentage box (digits only, 0-100)
  const handlePercentageChange = (index: number, rawVal: string) => {
    const cleaned = sanitizePercent(rawVal);
    if (cleaned === "") {
      setRows((prev) => prev.map((r, i) => (i === index ? { ...r, percentage: "" } : r)));
      return;
    }
    setRows((prev) => applyPercentage(prev, index, parseInt(cleaned, 10)));
  };

  // Add another person: they receive whatever is still unallocated; if nothing is left, everyone is split equally
  const handleAddPerson = () => {
    const unselected = family.find((f) => !selectedBeneficiaryIds.has(f.id));
    if (!unselected) return;

    const left = 100 - totalAllocated;
    if (left > 0) {
      setRows([...rows, { beneficiaryId: unselected.id, beneficiaryName: unselected.name, percentage: left }]);
      return;
    }

    const newCount = rows.length + 1;
    const share = Math.floor(100 / newCount);
    const rem = 100 - share * newCount;
    setRows([
      ...rows.map((r) => ({ ...r, percentage: share })),
      {
        beneficiaryId: unselected.id,
        beneficiaryName: unselected.name,
        percentage: share + rem,
      },
    ]);
  };

  // Remove person and simultaneously rebalance remainder to 100%
  const handleRemovePerson = (index: number) => {
    if (rows.length <= 1) return;
    const remainingRows = rows.filter((_, i) => i !== index);
    if (remainingRows.length === 1) {
      setRows([{ ...remainingRows[0], percentage: 100 }]);
      return;
    }
    const currentSum = remainingRows.reduce((s, r) => s + toNum(r.percentage), 0);
    if (currentSum > 0) {
      let acc = 0;
      const rebalanced = remainingRows.map((r, idx) => {
        if (idx === remainingRows.length - 1) {
          return { ...r, percentage: 100 - acc };
        }
        const share = Math.round((toNum(r.percentage) / currentSum) * 100);
        acc += share;
        return { ...r, percentage: share };
      });
      setRows(rebalanced);
    } else {
      const share = Math.floor(100 / remainingRows.length);
      const rem = 100 - share * remainingRows.length;
      setRows(
        remainingRows.map((r, idx) => ({
          ...r,
          percentage: idx === remainingRows.length - 1 ? share + rem : share,
        }))
      );
    }
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
                {/* Beneficiary Dropdown with Primary 01 / Primary 02 / Backup Badge */}
                <div style={{ flex: "1 1 240px", minWidth: "200px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      padding: "0.3rem 0.65rem",
                      borderRadius: "8px",
                      backgroundColor:
                        idx === 0
                          ? "rgba(198, 83, 120, 0.12)"
                          : idx === 1
                          ? "rgba(201, 162, 39, 0.15)"
                          : "rgba(95, 126, 117, 0.12)",
                      color:
                        idx === 0
                          ? "var(--color-gold)"
                          : idx === 1
                          ? "#B45309"
                          : "var(--color-sage)",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      flexShrink: 0,
                      border:
                        idx === 0
                          ? "1px solid rgba(198, 83, 120, 0.25)"
                          : idx === 1
                          ? "1px solid rgba(201, 162, 39, 0.3)"
                          : "1px solid rgba(95, 126, 117, 0.25)",
                    }}
                  >
                    {idx === 0 ? "Primary 01" : idx === 1 ? "Primary 02" : `Backup 0${idx - 1}`}
                  </span>
                  <select
                    value={row.beneficiaryId}
                    onChange={(e) => handleBeneficiaryChange(idx, e.target.value)}
                    aria-label="Select beneficiary"
                    style={{
                      flex: 1,
                      minWidth: 0,
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

                {/* Percentage text input (digits only) + delete */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={3}
                      autoComplete="off"
                      value={row.percentage === "" ? "" : String(row.percentage)}
                      onChange={(e) => handlePercentageChange(idx, e.target.value)}
                      onBlur={() => {
                        if (row.percentage === "") handlePercentageChange(idx, "0");
                      }}
                      placeholder="0"
                      aria-label="Percentage value"
                      style={{
                        width: "92px",
                        height: "44px",
                        textAlign: "center",
                        padding: "0.2rem 1.4rem 0.2rem 0.3rem",
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
                        right: "10px",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "var(--color-navy)",
                        pointerEvents: "none",
                      }}
                    >
                      %
                    </span>
                  </div>

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
          <span>{isHi ? "अन्य व्यक्ति जोड़ें" : "Add another person"}</span>
        </button>
      )}

      {/* Live total / remaining indicator (combined share can never exceed 100%) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          borderRadius: "12px",
          backgroundColor: isValid ? "rgba(95, 126, 117, 0.08)" : "rgba(245, 158, 11, 0.08)",
          border: isValid ? "1px solid rgba(95, 126, 117, 0.22)" : "1px solid rgba(245, 158, 11, 0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          {isValid ? (
            <CheckCircle2 size={18} color="var(--color-sage)" />
          ) : (
            <AlertCircle size={18} color="#B45309" />
          )}
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {isHi ? `कुल आबंटन: ${totalAllocated}%` : `Total allocated: ${totalAllocated}%`}
              {!isValid && remaining > 0 && (
                <span style={{ color: "#B45309" }}>
                  {isHi ? ` • ${remaining}% शेष` : ` • ${remaining}% remaining`}
                </span>
              )}
            </div>
            <div style={{ fontSize: "0.74rem", color: "var(--color-slate)" }}>
              {isHi
                ? "कुल हिस्सा 100% से अधिक नहीं हो सकता। अधिक होने पर पहले व्यक्ति का हिस्सा अपने-आप घट जाएगा।"
                : "Total can never exceed 100%. If it goes over, the earlier person's share is reduced automatically."}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          {rows.map((r, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.22rem 0.6rem",
                borderRadius: "999px",
                backgroundColor: "#FFFFFF",
                color: "var(--color-navy)",
                border: "1px solid rgba(27, 42, 74, 0.12)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
            >
              {i === 0 ? "Primary 01" : i === 1 ? "Primary 02" : `Backup 0${i - 1}`}: {toNum(r.percentage)}%
            </span>
          ))}
        </div>
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
