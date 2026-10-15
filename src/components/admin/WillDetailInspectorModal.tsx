"use client";

import React, { useState } from "react";
import type { WillDraftingState } from "@/lib/willDraftingStore";
import { formatDDMMYYYY } from "@/lib/utils";

export interface InspectorOrderItem {
  id?: string;
  txnId: string;
  invoiceNo?: string | null;
  planId: string;
  amount: number;
  status: string;
  gateway: string;
  failureReason?: string | null;
  createdAt?: string | Date;
  paidAt?: string | Date | null;
}

export interface InspectorTarget {
  title: string;
  category:
    | "logged_in_unpaid"
    | "guest_not_logged_in"
    | "logged_in_no_will"
    | "paid_customer";
  guestContactState?: "no_email" | "typed_in_form" | null;
  accountId?: string | null;
  willId?: string | null;
  sessionId?: string | null;
  expiresAt?: string | Date | null;
  name: string;
  email: string;
  phone: string;
  stateLocation?: string;
  authStatus?: string;
  leadStatus?: string | null;
  source?: string | null;
  googleId?: string | null;
  planId?: string | null;
  willCredits?: number;
  isBanned?: boolean;
  message?: string | null;
  version?: number;
  detailsVerified?: boolean;
  detailsVerifiedAt?: string | Date | null;
  lockedAt?: string | Date | null;
  downloadCount?: number;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  progress?: {
    currentStep: number;
    currentStepTitle: string;
    willStatus: string;
    selectedPlan: string | null;
    sectionsCompleted: number;
    completionPercent: number;
    filledSections?: string[];
    missingSections?: string[];
    familyCount: number;
    assetsCount: number;
    allocationsCount: number;
    totalEstateValue: number;
    healthIssues?: Array<{ severity: string; title: string; category: string }>;
  } | null;
  willState?: WillDraftingState | null;
  orders?: InspectorOrderItem[];
  onGrantPlan?: (accountId: string, planId: string) => Promise<void>;
  onUnlockWill?: (accountId: string) => Promise<void>;
}

function formatDateTime(val?: string | Date | null): string {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatINR(val?: number | null): string {
  const n = Number(val || 0);
  if (!n) return "₹0";
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function WillDetailInspectorModal({
  target,
  onClose,
}: {
  target: InspectorTarget | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"will" | "account" | "raw">("will");
  const [grantingPlan, setGrantingPlan] = useState("essential");
  const [busyAction, setBusyAction] = useState(false);

  if (!target) return null;

  const s = target.willState;
  const t = s?.testator;
  const family = Array.isArray(s?.familyMembers) ? s!.familyMembers : [];
  const assets = Array.isArray(s?.assets) ? s!.assets : [];
  const allocations = Array.isArray(s?.allocations) ? s!.allocations : [];
  const assetMap = new Map(assets.map((a) => [a.id, a]));

  const getCategoryBadge = () => {
    if (target.category === "paid_customer") {
      return {
        label: "PAID CUSTOMER (USERS COLLECTION)",
        bg: "rgba(95, 126, 117, 0.14)",
        color: "#3F5C53",
        border: "rgba(95, 126, 117, 0.35)",
      };
    }
    if (target.category === "logged_in_unpaid") {
      return {
        label: "LOGGED IN & DRAFTING • UNPAID (LEADS + WILLS)",
        bg: "rgba(198, 83, 120, 0.12)",
        color: "#A13C5D",
        border: "rgba(198, 83, 120, 0.3)",
      };
    }
    if (target.category === "guest_not_logged_in") {
      if (target.guestContactState === "typed_in_form") {
        return {
          label: "GUEST SESSION • NOT LOGGED IN (TYPED CONTACT IN WIZARD)",
          bg: "#FEF6E7",
          color: "#9A5B13",
          border: "rgba(180, 83, 9, 0.28)",
        };
      }
      return {
        label: "ANONYMOUS GUEST SESSION • NOT LOGGED IN / NO EMAIL ENTERED",
        bg: "#FEF6E7",
        color: "#9A5B13",
        border: "rgba(180, 83, 9, 0.28)",
      };
    }
    return {
      label: "LOGGED IN / CAPTURED LEAD • NO WILL DRAFT SAVED YET",
      bg: "rgba(73, 88, 95, 0.1)",
      color: "#49585F",
      border: "rgba(73, 88, 95, 0.24)",
    };
  };

  const badge = getCategoryBadge();

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(23, 34, 40, 0.58)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          maxHeight: "90vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid rgba(23, 34, 40, 0.1)",
          boxShadow: "0 24px 60px -12px rgba(23, 34, 40, 0.28)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Modal Header */}
        <div
          style={{
            padding: "1.2rem 1.5rem",
            borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
            backgroundColor: "#FAF7F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: "999px",
                  backgroundColor: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.border}`,
                  letterSpacing: "0.03em",
                }}
              >
                {badge.label}
              </span>
              {target.detailsVerified && (
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(95, 126, 117, 0.14)",
                    color: "#3F5C53",
                    border: "1px solid rgba(95, 126, 117, 0.35)",
                  }}
                >
                  OTP VERIFIED & LOCKED
                </span>
              )}
              {target.version ? (
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(23, 34, 40, 0.06)",
                    color: "#49585F",
                  }}
                >
                  Save v{target.version}
                </span>
              ) : null}
            </div>

            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#172228", margin: 0, letterSpacing: "-0.02em" }}>
              {target.name}
            </h2>
            <div style={{ fontSize: "0.8rem", color: "#55636D", marginTop: "0.25rem", display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <span>
                Email: <strong style={{ color: "#172228" }}>{target.email || "Not provided yet"}</strong>
              </span>
              <span>
                Phone: <strong style={{ color: "#172228" }}>{target.phone ? `+91 ${target.phone}` : "Not provided yet"}</strong>
              </span>
              {target.sessionId && (
                <span>
                  Guest Session: <code style={{ fontSize: "0.75rem", color: "#C65378" }}>{target.sessionId}</code>
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(23, 34, 40, 0.14)",
              borderRadius: "8px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#49585F",
              fontSize: "1rem",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            padding: "0.5rem 1.5rem 0",
            borderBottom: "1px solid rgba(23, 34, 40, 0.08)",
            backgroundColor: "#FFFFFF",
          }}
        >
          {[
            { id: "will", label: `Will Questionnaire Details (${target.progress?.completionPercent ?? 0}% Filled)` },
            { id: "account", label: `Account, Session & Checkout (${target.orders?.length ?? 0} Orders)` },
            { id: "raw", label: "Raw DB State JSON" },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "will" | "account" | "raw")}
                style={{
                  padding: "0.65rem 1rem",
                  fontSize: "0.82rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#C65378" : "#55636D",
                  background: "none",
                  border: "none",
                  borderBottom: active ? "2px solid #C65378" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {activeTab === "will" && (
            <>
              {!s ? (
                <div
                  style={{
                    padding: "2.5rem",
                    textAlign: "center",
                    backgroundColor: "#FAF7F0",
                    borderRadius: "12px",
                    border: "1px dashed rgba(23, 34, 40, 0.18)",
                    color: "#55636D",
                    fontSize: "0.88rem",
                  }}
                >
                  This lead/account has not saved a Will questionnaire document in the <code>wills</code> collection yet.
                </div>
              ) : (
                <>
                  {/* Progress & Snapshot Row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ padding: "0.8rem 0.95rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "uppercase", fontWeight: 600 }}>Current Wizard Step</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#172228", marginTop: "0.2rem" }}>
                        Step {target.progress?.currentStep || s.currentStep || 1}/14
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#49585F" }}>{target.progress?.currentStepTitle}</div>
                    </div>

                    <div style={{ padding: "0.8rem 0.95rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "uppercase", fontWeight: 600 }}>Draft Completion</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#C65378", marginTop: "0.2rem" }}>
                        {target.progress?.completionPercent ?? 0}% ({target.progress?.sectionsCompleted ?? 0}/6 sections)
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#49585F" }}>Status: {s.willStatus || "drafting"}</div>
                    </div>

                    <div style={{ padding: "0.8rem 0.95rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "uppercase", fontWeight: 600 }}>Selected Plan</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#172228", marginTop: "0.2rem", textTransform: "capitalize" }}>
                        {(s.selectedPlan || target.planId || "Not chosen").replace(/_/g, " ")}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#49585F" }}>Downloads: {target.downloadCount || 0}</div>
                    </div>

                    <div style={{ padding: "0.8rem 0.95rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "uppercase", fontWeight: 600 }}>Total Estate Value</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.2rem" }}>
                        {formatINR(target.progress?.totalEstateValue)}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#49585F" }}>
                        {assets.length} Assets • {family.length} Family
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Testator Personal Details */}
                  <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#FAF7F0", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.84rem", color: "#172228" }}>
                      1. Testator Profile (About You)
                    </div>
                    <div
                      style={{
                        padding: "0.95rem 1rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "0.75rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      <div><span style={{ color: "#55636D" }}>Full Name:</span> <strong style={{ color: "#172228" }}>{t?.fullName || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Father / Mother Name:</span> <strong style={{ color: "#172228" }}>{t?.fatherOrMotherName || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>DOB:</span> <strong style={{ color: "#172228" }}>{t?.dob ? formatDDMMYYYY(t.dob) : "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Gender:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{t?.gender || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Marital Status:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{t?.maritalStatus || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Religion / Law:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{t?.religionPersonalLaw?.replace(/_/g, " ") || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>PAN:</span> <strong style={{ fontFamily: "monospace", color: "#172228" }}>{t?.pan || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Aadhaar:</span> <strong style={{ fontFamily: "monospace", color: "#172228" }}>{t?.aadhaar || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Email in Will:</span> <strong style={{ color: "#172228" }}>{t?.email || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Phone in Will:</span> <strong style={{ color: "#172228" }}>{t?.phone || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>City / State / PIN:</span> <strong style={{ color: "#172228" }}>{[t?.city, t?.state, t?.pincode].filter(Boolean).join(", ") || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Citizenship:</span> <strong style={{ color: "#172228" }}>{t?.citizenship || "—"}</strong></div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <span style={{ color: "#55636D" }}>Residential Address:</span> <strong style={{ color: "#172228" }}>{t?.address || "—"}</strong>
                      </div>
                      {t?.workplace && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <span style={{ color: "#55636D" }}>Occupation / Workplace:</span> <strong style={{ color: "#172228" }}>{t.workplace}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 2: Family Members */}
                  <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#FAF7F0", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.84rem", color: "#172228" }}>
                      2. Family Members ({family.length})
                    </div>
                    {family.length === 0 ? (
                      <div style={{ padding: "0.9rem 1rem", fontSize: "0.8rem", color: "#55636D" }}>No family members added yet.</div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", backgroundColor: "#FDFBF7", textAlign: "left" }}>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Name</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Relationship</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>DOB / Minor</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>PAN</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {family.map((m) => (
                              <tr key={m.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                                <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600, color: "#172228" }}>{m.name}</td>
                                <td style={{ padding: "0.55rem 0.75rem", textTransform: "capitalize", color: "#49585F" }}>
                                  {m.customRelationship || m.relationship}
                                </td>
                                <td style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>
                                  {m.dob ? formatDDMMYYYY(m.dob) : "—"}{" "}
                                  {m.isMinor && (
                                    <span style={{ fontSize: "0.68rem", backgroundColor: "#FEF6E7", color: "#9A5B13", padding: "1px 6px", borderRadius: "999px", fontWeight: 600 }}>
                                      Minor
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: "0.55rem 0.75rem", fontFamily: "monospace", color: "#172228" }}>{m.pan || "—"}</td>
                                <td style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>
                                  {[m.phone, m.email].filter(Boolean).join(" • ") || "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Estate Assets */}
                  <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#FAF7F0", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.84rem", color: "#172228", display: "flex", justifyContent: "space-between" }}>
                      <span>3. Estate Assets Register ({assets.length})</span>
                      <span style={{ color: "#3F5C53" }}>Total: {formatINR(target.progress?.totalEstateValue)}</span>
                    </div>
                    {assets.length === 0 ? (
                      <div style={{ padding: "0.9rem 1rem", fontSize: "0.8rem", color: "#55636D" }}>No assets added yet.</div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", backgroundColor: "#FDFBF7", textAlign: "left" }}>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Asset & Category</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Identifier / Institution</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Ownership</th>
                              <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Est. Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assets.map((a) => (
                              <tr key={a.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                                <td style={{ padding: "0.55rem 0.75rem" }}>
                                  <div style={{ fontWeight: 600, color: "#172228" }}>{a.name || "Unnamed Asset"}</div>
                                  <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "capitalize" }}>
                                    {(a.customCategoryName || a.category).replace(/_/g, " ")} {a.typeDetails ? `• ${a.typeDetails}` : ""}
                                  </div>
                                </td>
                                <td style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>
                                  <div>{a.identifier || "—"}</div>
                                  <div style={{ fontSize: "0.7rem", color: "#55636D" }}>{a.addressOrInstitution || ""}</div>
                                </td>
                                <td style={{ padding: "0.55rem 0.75rem", textTransform: "capitalize", color: "#49585F" }}>
                                  {a.ownership}
                                  {a.ownership === "joint" && a.jointOwnerName ? ` (${a.ownershipPercentage ?? 50}% w/ ${a.jointOwnerName})` : ""}
                                  {a.hasLoan ? <div style={{ fontSize: "0.68rem", color: "#B91C1C" }}>Loan: {a.loanDetails || "Yes"}</div> : null}
                                </td>
                                <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600, color: "#172228" }}>
                                  {formatINR(a.approximateValue)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Section 4: Beneficiary Allocations & Residuary */}
                  <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#FAF7F0", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.84rem", color: "#172228" }}>
                      4. Beneficiary Allocations & Residuary Estate ({allocations.length})
                    </div>
                    <div style={{ padding: "0.85rem 1rem", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                        <div>
                          <span style={{ color: "#55636D" }}>Primary Residuary Beneficiary:</span>{" "}
                          <strong style={{ color: "#172228" }}>{s.residuaryBeneficiaryName || "—"}</strong>
                          {s.residuaryPrimary02Name ? ` & ${s.residuaryPrimary02Name}` : ""}
                        </div>
                        <div>
                          <span style={{ color: "#55636D" }}>Backup Residuary Beneficiary:</span>{" "}
                          <strong style={{ color: "#172228" }}>{s.residuaryAlternateName || "—"}</strong>
                          {s.residuaryBackup02Name ? ` & ${s.residuaryBackup02Name}` : ""}
                        </div>
                      </div>
                      {allocations.length === 0 ? (
                        <div style={{ color: "#55636D" }}>No specific asset allocations configured yet.</div>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.5rem" }}>
                          {allocations.map((al) => {
                            const assetObj = assetMap.get(al.assetId);
                            return (
                              <div key={al.id} style={{ padding: "0.55rem 0.75rem", backgroundColor: "#FAF7F0", borderRadius: "8px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                                <div style={{ fontWeight: 600, color: "#172228" }}>{assetObj?.name || "Asset"}</div>
                                <div style={{ color: "#49585F", marginTop: "2px" }}>
                                  → <strong style={{ color: "#C65378" }}>{al.beneficiaryName}</strong> ({al.percentage}%)
                                </div>
                                {al.specificBequestCondition && (
                                  <div style={{ fontSize: "0.72rem", color: "#55636D", marginTop: "2px" }}>
                                    Note: {al.specificBequestCondition}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 5: Executors & Guardians */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
                    <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.82rem", color: "#172228" }}>
                        5. Executors
                      </div>
                      <div style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div>
                          <div style={{ color: "#55636D", fontWeight: 600 }}>Primary Executor</div>
                          <div style={{ color: "#172228" }}><strong>{s.executorPrimary?.name || "Not appointed"}</strong> {s.executorPrimary?.relationship ? `(${s.executorPrimary.relationship})` : ""}</div>
                          <div style={{ color: "#49585F" }}>{[s.executorPrimary?.phone, s.executorPrimary?.email, s.executorPrimary?.address].filter(Boolean).join(" • ")}</div>
                        </div>
                        <div style={{ borderTop: "1px solid rgba(23, 34, 40, 0.06)", paddingTop: "0.45rem" }}>
                          <div style={{ color: "#55636D", fontWeight: 600 }}>Alternate Executor</div>
                          <div style={{ color: "#172228" }}><strong>{s.executorAlternate?.name || "Not appointed"}</strong> {s.executorAlternate?.relationship ? `(${s.executorAlternate.relationship})` : ""}</div>
                          <div style={{ color: "#49585F" }}>{[s.executorAlternate?.phone, s.executorAlternate?.email, s.executorAlternate?.address].filter(Boolean).join(" • ")}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.82rem", color: "#172228" }}>
                        6. Testamentary Guardians
                      </div>
                      <div style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div>
                          <div style={{ color: "#55636D", fontWeight: 600 }}>Primary Guardian</div>
                          <div style={{ color: "#172228" }}><strong>{s.guardianPrimary?.name || "Not appointed / N/A"}</strong> {s.guardianPrimary?.relationship ? `(${s.guardianPrimary.relationship})` : ""}</div>
                          <div style={{ color: "#49585F" }}>{[s.guardianPrimary?.phone, s.guardianPrimary?.email].filter(Boolean).join(" • ")}</div>
                        </div>
                        <div style={{ borderTop: "1px solid rgba(23, 34, 40, 0.06)", paddingTop: "0.45rem" }}>
                          <div style={{ color: "#55636D", fontWeight: 600 }}>Alternate Guardian</div>
                          <div style={{ color: "#172228" }}><strong>{s.guardianAlternate?.name || "Not appointed / N/A"}</strong> {s.guardianAlternate?.relationship ? `(${s.guardianAlternate.relationship})` : ""}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Special Wishes & Motivation */}
                  <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#FAF7F0", padding: "0.65rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.82rem", color: "#172228" }}>
                      7. Special Wishes & Emotional Purpose
                    </div>
                    <div style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.6rem" }}>
                      <div><span style={{ color: "#55636D" }}>Jewellery:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.jewelleryInstructions || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Belongings:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.personalBelongings || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Charitable Gifts:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.charitableGifts || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Digital Accounts:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.digitalAccounts || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Funeral Wishes:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.funeralCeremonyWishes || "—"}</strong></div>
                      <div><span style={{ color: "#55636D" }}>Message to Family:</span> <strong style={{ color: "#172228" }}>{s.specialWishes?.personalMessageToFamily || "—"}</strong></div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <span style={{ color: "#55636D" }}>Emotional Purpose:</span> <strong style={{ color: "#172228" }}>{s.emotionalReason || "—"}</strong>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Identity Metadata */}
              <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", padding: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem", fontSize: "0.82rem", backgroundColor: "#FDFBF7" }}>
                <div><span style={{ color: "#55636D" }}>Account ID:</span> <code style={{ fontSize: "0.75rem", color: "#172228" }}>{target.accountId || "None (Anonymous Guest)"}</code></div>
                <div><span style={{ color: "#55636D" }}>Will Doc ID:</span> <code style={{ fontSize: "0.75rem", color: "#172228" }}>{target.willId || "None"}</code></div>
                <div><span style={{ color: "#55636D" }}>Guest Session ID:</span> <code style={{ fontSize: "0.75rem", color: "#C65378" }}>{target.sessionId || "N/A (Registered Account)"}</code></div>
                <div><span style={{ color: "#55636D" }}>Guest TTL Expiry:</span> <strong style={{ color: "#172228" }}>{formatDateTime(target.expiresAt)}</strong></div>
                <div><span style={{ color: "#55636D" }}>Auth Status:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{target.authStatus || (target.sessionId ? "Unauthenticated Guest" : "—")}</strong></div>
                <div><span style={{ color: "#55636D" }}>Lead / Funnel Status:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{target.leadStatus?.replace(/_/g, " ") || "—"}</strong></div>
                <div><span style={{ color: "#55636D" }}>Acquisition Source:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{target.source?.replace(/_/g, " ") || "—"}</strong></div>
                <div><span style={{ color: "#55636D" }}>Google OAuth ID:</span> <code style={{ fontSize: "0.75rem", color: "#172228" }}>{target.googleId || "None"}</code></div>
                <div><span style={{ color: "#55636D" }}>First Created:</span> <strong style={{ color: "#172228" }}>{formatDateTime(target.createdAt)}</strong></div>
                <div><span style={{ color: "#55636D" }}>Last Active / Saved:</span> <strong style={{ color: "#172228" }}>{formatDateTime(target.updatedAt)}</strong></div>
                {target.message && (
                  <div style={{ gridColumn: "1 / -1", padding: "0.65rem", backgroundColor: "#FAF7F0", borderRadius: "8px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                    <span style={{ color: "#55636D" }}>Form Inquiry Message:</span> <strong style={{ color: "#172228" }}>{target.message}</strong>
                  </div>
                )}
              </div>

              {/* Admin Quick Actions for Account */}
              {target.accountId && (target.onGrantPlan || target.onUnlockWill) && (
                <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", padding: "1rem", backgroundColor: "#FAF7F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#172228" }}>
                    Superadmin Account Controls
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                    {target.onGrantPlan && target.category !== "paid_customer" && (
                      <>
                        <select
                          value={grantingPlan}
                          onChange={(e) => setGrantingPlan(e.target.value)}
                          className="form-input"
                          style={{ fontSize: "0.78rem", padding: "0.4rem 0.65rem", width: "auto" }}
                        >
                          <option value="essential">Essential Plan (₹2,490)</option>
                          <option value="lawyer_verified">Lawyer Verified (₹4,990)</option>
                          <option value="premium">Connect to Lawyer (₹9,990)</option>
                        </select>
                        <button
                          type="button"
                          disabled={busyAction}
                          onClick={async () => {
                            if (!target.accountId || !target.onGrantPlan) return;
                            setBusyAction(true);
                            try {
                              await target.onGrantPlan(target.accountId, grantingPlan);
                            } finally {
                              setBusyAction(false);
                            }
                          }}
                          style={{
                            padding: "0.42rem 0.85rem",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: "#5F7E75",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          {busyAction ? "Granting..." : "Grant Paid Access"}
                        </button>
                      </>
                    )}

                    {target.onUnlockWill && target.detailsVerified && (
                      <button
                        type="button"
                        disabled={busyAction}
                        onClick={async () => {
                          if (!target.accountId || !target.onUnlockWill) return;
                          setBusyAction(true);
                          try {
                            await target.onUnlockWill(target.accountId);
                          } finally {
                            setBusyAction(false);
                          }
                        }}
                        style={{
                          padding: "0.42rem 0.85rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          backgroundColor: "#C65378",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Unlock Verified Will
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Orders / Checkout History */}
              <div style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#FAF7F0", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", fontWeight: 700, fontSize: "0.84rem", color: "#172228" }}>
                  Payment Orders & Checkout Attempts ({target.orders?.length ?? 0})
                </div>
                {!target.orders || target.orders.length === 0 ? (
                  <div style={{ padding: "1rem", fontSize: "0.8rem", color: "#55636D" }}>
                    No payment orders initiated yet.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", backgroundColor: "#FDFBF7", textAlign: "left" }}>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Txn ID</th>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Plan</th>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Amount</th>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Status</th>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Gateway / Note</th>
                          <th style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {target.orders.map((o) => (
                          <tr key={o.txnId} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                            <td style={{ padding: "0.55rem 0.75rem", fontFamily: "monospace", fontWeight: 600, color: "#172228" }}>{o.txnId}</td>
                            <td style={{ padding: "0.55rem 0.75rem", textTransform: "capitalize", color: "#49585F" }}>{o.planId.replace(/_/g, " ")}</td>
                            <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600, color: "#172228" }}>₹{o.amount}</td>
                            <td style={{ padding: "0.55rem 0.75rem" }}>
                              <span
                                style={{
                                  padding: "2px 7px",
                                  borderRadius: "999px",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                  textTransform: "uppercase",
                                  backgroundColor:
                                    o.status === "paid"
                                      ? "rgba(95, 126, 117, 0.14)"
                                      : o.status === "failed"
                                      ? "#FEE2E2"
                                      : "#FEF6E7",
                                  color:
                                    o.status === "paid"
                                      ? "#3F5C53"
                                      : o.status === "failed"
                                      ? "#991B1B"
                                      : "#9A5B13",
                                }}
                              >
                                {o.status}
                              </span>
                            </td>
                            <td style={{ padding: "0.55rem 0.75rem", color: "#49585F" }}>
                              {o.gateway} {o.failureReason ? `• ${o.failureReason}` : ""}
                            </td>
                            <td style={{ padding: "0.55rem 0.75rem", color: "#55636D" }}>{formatDateTime(o.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "raw" && (
            <pre
              style={{
                margin: 0,
                padding: "1rem",
                backgroundColor: "#172228",
                color: "#FAF7F0",
                borderRadius: "12px",
                fontSize: "0.75rem",
                overflowX: "auto",
                maxHeight: "60vh",
              }}
            >
              {JSON.stringify(target.willState || target, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "0.9rem 1.5rem",
            borderTop: "1px solid rgba(23, 34, 40, 0.08)",
            backgroundColor: "#FAF7F0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.48rem 1.15rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(198, 83, 120, 0.2)",
            }}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
