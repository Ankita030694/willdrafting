"use client";

import React from "react";
import { Asset, BeneficiaryAllocation, FamilyMember } from "@/lib/willDraftingStore";

interface WillAssetDistributionTableProps {
  assets: Asset[];
  allocations: BeneficiaryAllocation[];
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
          backgroundColor: "#FFFFFF",
          border: "1px solid #000000",
          borderRadius: "4px",
          color: "#000000",
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
    assetExtraLines?: string[];
    categoryLabel: string;
    ownershipText: string;
    valuationText: string;
    valuationSubtext?: string;
    rawValue: number;
    beneficiaryName: string;
    beneficiaryRel?: string;
    bequestCondition?: string;
    sharePercentage: number;
    shareSubtext?: string;
  };

  const rows: TableRow[] = [];

  assets.forEach((asset) => {
    const assetAllocs = allocations.filter((alc) => alc.assetId === asset.id);
    const isJoint = asset.ownership === "joint";
    const ownershipNum = isJoint ? (asset.ownershipPercentage || 50) : 100;
    const ownershipPercent = `${ownershipNum}%`;
    const coOwnerDesc = asset.jointOwnerName?.trim()
      ? ` (with ${asset.jointOwnerName.trim()}${asset.jointOwnerRelationship?.trim() ? `, ${asset.jointOwnerRelationship.trim()}` : ""})`
      : "";
    const ownershipText = isJoint
      ? `${ownershipPercent} Joint${coOwnerDesc}`
      : "100% (Sole)";
    const fullAssetValue = asset.approximateValue || (asset.sumAssured ? Number(String(asset.sumAssured).replace(/[^0-9.]/g, "")) || 0 : 0);
    const testatorShareValue = Math.round(fullAssetValue * (ownershipNum / 100));
    const categoryLabel = getCategoryLabel(asset.category, asset.typeDetails);
    const assetSubtext = [
      asset.identifier?.trim() || asset.policyNumber?.trim(),
      asset.addressOrInstitution?.trim() || asset.insuranceCompany?.trim(),
    ]
      .filter(Boolean)
      .join(" • ");

    const assetExtraLines: string[] = [];
    if (asset.policyNumber?.trim() && asset.identifier?.trim() && asset.policyNumber.trim() !== asset.identifier.trim()) {
      assetExtraLines.push(`Policy No: ${asset.policyNumber.trim()}`);
    }
    if (asset.insuranceCompany?.trim() && asset.addressOrInstitution?.trim() && asset.insuranceCompany.trim() !== asset.addressOrInstitution.trim()) {
      assetExtraLines.push(`Insurer: ${asset.insuranceCompany.trim()}`);
    }
    if (asset.sumAssured && Number(asset.sumAssured) > 0) {
      assetExtraLines.push(`Sum Assured: ${formatAssetValue(Number(asset.sumAssured))}`);
    }
    if (asset.maturityDate?.trim()) {
      assetExtraLines.push(`Maturity: ${asset.maturityDate.trim()}`);
    }
    if (asset.nomineeName?.trim()) {
      assetExtraLines.push(`Registered Nominee (Custodian): ${asset.nomineeName.trim()}`);
    }
    if (asset.hasLoan || asset.loanDetails?.trim()) {
      assetExtraLines.push(
        `Encumbrance / Loan: ${asset.loanDetails?.trim() || "Subject to active loan / mortgage"}`
      );
    }
    if (asset.specialInstructions?.trim()) {
      assetExtraLines.push(`Direction: ${asset.specialInstructions.trim()}`);
    }

    if (assetAllocs.length === 0) {
      // No specific allocation, falls to residuary
      rows.push({
        rowKey: `${asset.id}-residuary`,
        assetName: (asset.name || "").trim(),
        assetSubtext,
        assetExtraLines,
        categoryLabel,
        ownershipText,
        valuationText: formatAssetValue(testatorShareValue),
        valuationSubtext: isJoint && fullAssetValue > 0 ? `(${ownershipNum}% of ${formatAssetValue(fullAssetValue)})` : undefined,
        rawValue: testatorShareValue,
        beneficiaryName: (residuaryBeneficiaryName || "Residuary Legatee / Legal Heirs").trim(),
        beneficiaryRel: "Residuary",
        sharePercentage: 100,
        shareSubtext: isJoint ? `of ${ownershipNum}% share` : undefined,
      });
    } else {
      assetAllocs.forEach((alc, alcIdx) => {
        const matchingFam = familyMembers.find(
          (f) => f.id === alc.beneficiaryId || f.name.trim().toLowerCase() === (alc.beneficiaryName || "").trim().toLowerCase()
        );
        const alcPct = Number(alc.percentage) || 0;
        const allocatedValue = Math.round(testatorShareValue * (alcPct / 100));
        let valuationSubtext: string | undefined;
        if (fullAssetValue > 0) {
          if (isJoint && assetAllocs.length > 1) {
            valuationSubtext = `of ${formatAssetValue(testatorShareValue)} share (Total ${formatAssetValue(fullAssetValue)})`;
          } else if (isJoint) {
            valuationSubtext = `(${ownershipNum}% of ${formatAssetValue(fullAssetValue)})`;
          } else if (assetAllocs.length > 1) {
            valuationSubtext = `of ${formatAssetValue(fullAssetValue)} total`;
          }
        }
        const famRel = matchingFam
          ? (matchingFam.relationship === "other" && matchingFam.customRelationship
              ? matchingFam.customRelationship
              : matchingFam.relationship
            )?.trim()
          : undefined;

        rows.push({
          rowKey: `${asset.id}-alc-${alc.id || alcIdx}`,
          assetName: (asset.name || "").trim(),
          assetSubtext,
          assetExtraLines,
          categoryLabel,
          ownershipText,
          valuationText: formatAssetValue(allocatedValue),
          valuationSubtext,
          rawValue: allocatedValue,
          beneficiaryName: (alc.beneficiaryName || "").trim(),
          beneficiaryRel: famRel,
          bequestCondition: alc.specificBequestCondition?.trim() || undefined,
          sharePercentage: alcPct,
          shareSubtext: isJoint ? `of ${ownershipNum}% share` : undefined,
        });
      });
    }
  });

  const totalValue = assets.reduce((sum, a) => {
    const ownNum = a.ownership === "joint" ? (a.ownershipPercentage || 50) : 100;
    const rawVal = a.approximateValue || (a.sumAssured ? Number(String(a.sumAssured).replace(/[^0-9.]/g, "")) || 0 : 0);
    return sum + Math.round(rawVal * (ownNum / 100));
  }, 0);

  return (
    <div
      className="will-schedule-wrapper"
      style={{
        margin: "1rem 0 1.25rem 0",
        width: "100%",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <div
        className="will-schedule-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.25rem",
          marginBottom: "0.5rem",
          pageBreakAfter: "avoid",
          breakAfter: "avoid",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#000000",
          }}
        >
          SCHEDULE OF ASSET DISTRIBUTION
        </div>
        <div style={{ fontSize: "0.75rem", color: "#000000", fontWeight: 600 }}>
          {assets.length} Itemized {assets.length === 1 ? "Asset" : "Assets"} • Total Approx. {formatAssetValue(totalValue)}
        </div>
      </div>

      <table
        className="will-schedule-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.85rem",
          color: "#000000",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #000000",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#F8F8F8",
              borderBottom: "1.5px solid #000000",
              pageBreakInside: "avoid",
              breakInside: "avoid",
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
                borderRight: "1px solid #000000",
                width: "28%",
                color: "#000000",
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
                borderRight: "1px solid #000000",
                width: "14%",
                color: "#000000",
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
                borderRight: "1px solid #000000",
                width: "14%",
                color: "#000000",
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
                borderRight: "1px solid #000000",
                width: "12%",
                color: "#000000",
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
                borderRight: "1px solid #000000",
                width: "20%",
                color: "#000000",
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
                color: "#000000",
              }}
            >
              Share
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.rowKey}
              style={{
                borderBottom: "1px solid #000000",
                backgroundColor: "#FFFFFF",
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #000000",
                  lineHeight: 1.35,
                }}
              >
                <div style={{ fontWeight: 700, color: "#000000" }}>{row.assetName}</div>
                {row.assetSubtext && (
                  <div style={{ fontSize: "0.75rem", color: "#333333", marginTop: "2px" }}>
                    {row.assetSubtext}
                  </div>
                )}
                {row.assetExtraLines && row.assetExtraLines.length > 0 && (
                  <div style={{ fontSize: "0.7rem", color: "#222222", marginTop: "3px" }}>
                    {row.assetExtraLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #000000",
                  color: "#000000",
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
                  borderRight: "1px solid #000000",
                  fontWeight: 600,
                  color: "#000000",
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
                  borderRight: "1px solid #000000",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 600,
                  color: "#000000",
                  lineHeight: 1.35,
                }}
              >
                <div style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{row.valuationText}</div>
                {row.valuationSubtext && (
                  <div style={{ fontSize: "0.68rem", color: "#333333", fontWeight: 500, marginTop: "2px" }}>
                    {row.valuationSubtext}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  borderRight: "1px solid #000000",
                  lineHeight: 1.35,
                }}
              >
                <div style={{ fontWeight: 700, color: "#000000" }}>{row.beneficiaryName}</div>
                {row.beneficiaryRel && (
                  <div style={{ fontSize: "0.72rem", color: "#333333", textTransform: "capitalize" }}>
                    ({row.beneficiaryRel})
                  </div>
                )}
                {row.bequestCondition && (
                  <div style={{ fontSize: "0.68rem", color: "#222222", fontStyle: "italic", marginTop: "2px" }}>
                    Condition: {row.bequestCondition}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "7px 10px",
                  verticalAlign: "top",
                  textAlign: "center",
                  fontWeight: 800,
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1.35,
                }}
              >
                <div>{row.sharePercentage}%</div>
                {row.shareSubtext && (
                  <div style={{ fontSize: "0.68rem", color: "#333333", fontWeight: 500, marginTop: "2px" }}>
                    ({row.shareSubtext})
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr
            style={{
              backgroundColor: "#F8F8F8",
              borderTop: "1.5px solid #000000",
              fontWeight: 700,
              fontSize: "0.8rem",
            }}
          >
            <td
              colSpan={3}
              style={{
                padding: "8px 10px",
                borderRight: "1px solid #000000",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: "#000000",
              }}
            >
              Total Portfolio Valuation (Approx.)
            </td>
            <td
              style={{
                padding: "8px 10px",
                textAlign: "right",
                borderRight: "1px solid #000000",
                color: "#000000",
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
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            >
              All specified shares strictly absolute & devolving as scheduled
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
