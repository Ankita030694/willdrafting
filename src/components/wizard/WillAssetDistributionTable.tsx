"use client";

import React from "react";
import { Asset, Allocation, FamilyMember } from "@/lib/willDraftingStore";

interface WillAssetDistributionTableProps {
  assets: Asset[];
  allocations: Allocation[];
  familyMembers?: FamilyMember[];
  residuaryBeneficiaryName?: string;
  isPrintMode?: boolean;
}

export const formatAssetValue = (val?: number): string => {
  if (!val || val === 0) return "—";
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    const lk = val / 100000;
    return `₹${lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(1)}L`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
};

export const getCategoryLabel = (category?: string, typeDetails?: string): string => {
  if (typeDetails && typeDetails.length > 0 && typeDetails.length <= 25) {
    return typeDetails;
  }
  switch (category) {
    case "property":
      return "Property";
    case "bank_account":
      return "Bank / Savings";
    case "jewellery":
      return "Jewellery";
    case "investment":
      return "Investments / MF";
    case "digital":
      return "Digital Assets";
    case "business":
      return "Equity / Shares";
    case "vehicle":
      return "Vehicle";
    case "insurance":
      return "Insurance / Ret.";
    default:
      return category ? category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ") : "Asset";
  }
};

export default function WillAssetDistributionTable({
  assets = [],
  allocations = [],
  familyMembers = [],
  residuaryBeneficiaryName,
  isPrintMode = false,
}: WillAssetDistributionTableProps) {
  if (!assets || assets.length === 0) {
    return (
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#F8FAFC",
          border: "1px dashed #CBD5E1",
          borderRadius: "8px",
          color: "#475569",
          fontSize: "0.875rem",
          margin: "0.75rem 0",
        }}
      >
        All movable and immovable properties of my estate shall devolve upon the residuary legatee specified in Clause 6.
      </div>
    );
  }

  // Build rows: each asset with its allocations
  type TableRow = {
    rowKey: string;
    assetName: string;
    assetSubtext?: string;
    categoryLabel: string;
    ownershipText: string;
    valuationText: string;
    rawValue: number;
    beneficiaryName: string;
    beneficiaryRel?: string;
    sharePercentage: number;
  };

  const rows: TableRow[] = [];

  assets.forEach((asset, aIdx) => {
    const assetAllocs = allocations.filter((alc) => alc.assetId === asset.id);
    const ownershipPercent =
      asset.ownership === "joint" ? `${asset.ownershipPercentage || 50}%` : "100%";
    const ownershipText =
      asset.ownership === "joint"
        ? `${ownershipPercent} (Joint)`
        : "100% (Sole)";
    const valuationText = formatAssetValue(asset.approximateValue);
    const categoryLabel = getCategoryLabel(asset.category, asset.typeDetails);
    const assetSubtext = [asset.identifier, asset.addressOrInstitution].filter(Boolean).join(" • ");

    if (assetAllocs.length === 0) {
      // No specific allocation, falls to residuary
      rows.push({
        rowKey: `${asset.id}-residuary`,
        assetName: asset.name,
        assetSubtext,
        categoryLabel,
        ownershipText,
        valuationText,
        rawValue: asset.approximateValue || 0,
        beneficiaryName: residuaryBeneficiaryName || "Residuary Legatee / Legal Heirs",
        beneficiaryRel: "Residuary",
        sharePercentage: 100,
      });
    } else {
      assetAllocs.forEach((alc, alcIdx) => {
        const matchingFam = familyMembers.find(
          (f) => f.id === alc.beneficiaryId || f.name.toLowerCase() === alc.beneficiaryName.toLowerCase()
        );
        rows.push({
          rowKey: `${asset.id}-alc-${alc.id || alcIdx}`,
          assetName: asset.name,
          assetSubtext,
          categoryLabel,
          ownershipText,
          valuationText,
          rawValue: asset.approximateValue || 0,
          beneficiaryName: alc.beneficiaryName,
          beneficiaryRel: matchingFam?.relationship,
          sharePercentage: alc.percentage,
        });
      });
    }
  });

  const totalValue = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);

  return (
    <div
      style={{
        margin: "1rem 0 1.25rem 0",
        width: "100%",
        overflowX: "auto",
        pageBreakInside: "avoid",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#0F172A",
          }}
        >
          SCHEDULE OF ASSET DISTRIBUTION
        </div>
        <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
          {assets.length} Itemized {assets.length === 1 ? "Asset" : "Assets"} • Total Approx. {formatAssetValue(totalValue)}
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.85rem",
          color: "#0F172A",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #0F172A",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#F1F5F9",
              borderBottom: "1.5px solid #0F172A",
            }}
          >
            <th
              style={{
                padding: "8px 10px",
                textAlign: "left",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRight: "1px solid #CBD5E1",
                width: "28%",
              }}
            >
              Asset
            </th>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "left",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRight: "1px solid #CBD5E1",
                width: "14%",
              }}
            >
              Type
            </th>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "center",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRight: "1px solid #CBD5E1",
                width: "14%",
              }}
            >
              Ownership
            </th>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "right",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRight: "1px solid #CBD5E1",
                width: "12%",
              }}
            >
              Value
            </th>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "left",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderRight: "1px solid #CBD5E1",
                width: "20%",
              }}
            >
              Beneficiary
            </th>
            <th
              style={{
                padding: "8px 10px",
                textAlign: "center",
                fontWeight: 800,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                width: "12%",
              }}
            >
              Share
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.rowKey}
              style={{
                borderBottom: "1px solid #E2E8F0",
                backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
              }}
            >
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #E2E8F0",
                  lineHeight: 1.35,
                }}
              >
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{row.assetName}</div>
                {row.assetSubtext && (
                  <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                    {row.assetSubtext}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #E2E8F0",
                  color: "#334155",
                  fontWeight: 500,
                }}
              >
                {row.categoryLabel}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  textAlign: "center",
                  borderRight: "1px solid #E2E8F0",
                  fontWeight: 600,
                  color: row.ownershipText.includes("Joint") ? "#B45309" : "#047857",
                  fontSize: "0.8rem",
                }}
              >
                {row.ownershipText}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  textAlign: "right",
                  borderRight: "1px solid #E2E8F0",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 600,
                  color: "#0F172A",
                  whiteSpace: "nowrap",
                }}
              >
                {row.valuationText}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #E2E8F0",
                  lineHeight: 1.35,
                }}
              >
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{row.beneficiaryName}</div>
                {row.beneficiaryRel && (
                  <div style={{ fontSize: "0.72rem", color: "#64748B", textTransform: "capitalize" }}>
                    ({row.beneficiaryRel})
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  textAlign: "center",
                  fontWeight: 800,
                  color: "#0F172A",
                  fontSize: "0.85rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.sharePercentage}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr
            style={{
              backgroundColor: "#F1F5F9",
              borderTop: "1.5px solid #0F172A",
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            <td
              colSpan={3}
              style={{
                padding: "8px 10px",
                borderRight: "1px solid #CBD5E1",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: "#0F172A",
              }}
            >
              Total Portfolio Valuation (Approx.)
            </td>
            <td
              style={{
                padding: "8px 10px",
                textAlign: "right",
                borderRight: "1px solid #CBD5E1",
                color: "#0F172A",
                fontVariantNumeric: "tabular-nums",
                fontWeight: 800,
              }}
            >
              {formatAssetValue(totalValue)}
            </td>
            <td
              colSpan={2}
              style={{
                padding: "8px 10px",
                textAlign: "center",
                color: "#166534",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            >
              ✓ All specified shares strictly absolute & devolving as scheduled
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
