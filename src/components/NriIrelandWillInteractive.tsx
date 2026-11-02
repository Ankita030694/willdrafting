"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Landmark,
  Coins,
  Globe2,
  Scale,
  ShieldCheck,
} from "lucide-react";

interface NriIrelandScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_IRELAND_SCENARIOS: NriIrelandScenario[] = [
  {
    id: "succession-act-section-111",
    label: "Succession Act 1965 (s. 111)",
    icon: "globe",
    heading: "Preventing Irish Legal Right Share Clashes with Indian Law",
    challengeSummary:
      "Under Section 111 of the Irish Succession Act 1965, a surviving spouse has a legal right share to one-third or one-half of the estate. If an NRI uses only an Irish Will, relatives may try to claim Indian property under Irish law. This creates long court disputes in India.",
    legalMechanism:
      "Section 5 of the Indian Succession Act 1925 applies the lex situs rule. Succession to land and homes in India is ruled only by Indian law. A separate Indian Will protects your Indian property from foreign legal claims and gives you full testamentary freedom.",
    statutoryPrecedent:
      "Irish Succession Act 1965 ss. 111, 115 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Geographic Ring-Fencing Clause",
    checklist: [
      "State your residential status in Ireland and passport or OCI details",
      "Ring-fence all Indian immovable assets from your Irish estate",
      "Elect Indian Succession Act 1925 jurisdiction for all Indian wealth",
    ],
  },
  {
    id: "capital-acquisitions-tax-cat",
    label: "Irish CAT 33% Ring-Fencing",
    icon: "coins",
    heading: "Managing Irish CAT 33% Exposure on Indian Inheritances",
    challengeSummary:
      "Ireland levies Capital Acquisitions Tax (CAT) at 33% on gifts and inheritances. This applies if you live in Ireland. Without clear separation, inherited Indian property can face Irish tax questions.",
    legalMechanism:
      "Under Irish tax law, CAT depends on your tax residence and where assets sit. A dedicated Indian Will provides clear proof of Indian property. This supports clean tax reporting and helps you avoid double tax.",
    statutoryPrecedent:
      "Capital Acquisitions Tax Consolidation Act 2003 & India-Ireland DTAA",
    recommendedInstrument:
      "Tax-Aligned Dual-Will Structure with Cross-Border Audit Trail",
    checklist: [
      "Track Group A (€400,000) and Group B (€40,000) Irish CAT thresholds",
      "Document the Indian situs of all real estate and bank portfolios",
      "Establish separate executor mandates for India and Ireland",
    ],
  },
  {
    id: "execution-notary-apostille",
    label: "Execution & DFA Apostille",
    icon: "building",
    heading: "Plain-Paper Signing in Ireland & DFA Hague Apostille",
    challengeSummary:
      "NRIs in Dublin, Cork, Galway, or Limerick often wonder if they must travel to India to sign a Will. Flying to India is not needed. You can sign your Will right from Ireland.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act 1925, you can sign on plain paper before two adult witnesses. For extra proof, an Irish Notary stamp and a DFA Hague Apostille make the Will solid in Indian courts.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Irish Notary Attestation or Indian Embassy Seal",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Optional: Obtain Irish Notary seal and DFA Hague Apostille in Dublin",
      "Alternative: Consular attestation at Embassy of India in Dublin 4",
    ],
  },
  {
    id: "tech-expats-nro-accounts",
    label: "Tech Expats & Bank Accounts",
    icon: "landmark",
    heading: "Securing NRE, NRO Accounts, Demat Shares & Mutual Funds",
    challengeSummary:
      "Indian tech and health workers in Ireland hold savings in NRE and NRO bank accounts, mutual funds, and demat shares. Many think bank nominees own the money upon death. In India, nominees are only interim caretakers.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees must hand over funds to legal heirs. A valid Indian Will names your true heirs. This lets your family claim bank money quickly without an expensive court certificate.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "Detail NRE, NRO, and FCNR bank accounts with bank branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Appoint an India-resident executor to expedite municipal mutations",
    ],
  },
];

export default function NriIrelandWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("succession-act-section-111");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [residencyStatus, setResidencyStatus] = useState<"indian_passport_nri" | "irish_citizen_oci">(
    "indian_passport_nri"
  );
  const [willStructure, setWillStructure] = useState<"dual_separate_wills" | "undecided">(
    "dual_separate_wills"
  );

  const activeScenario =
    NRI_IRELAND_SCENARIOS.find((s) => s.id === activeTab) || NRI_IRELAND_SCENARIOS[0];

  const getDiagnosticOutput = () => {
    if (willStructure === "undecided") {
      return {
        tag: "Critical Risk: Universal Revocation",
        summary:
          "Executing a single combined Will in Ireland creates grave legal risks. Irish boilerplate clauses often unintentionally revoke previous Indian wills, while Irish probate orders are not directly recognized by Indian revenue authorities.",
        statute: "Indian Succession Act 1925 s. 62 & Irish Succession Act 1965 s. 111",
        action:
          "Draft an autonomous Indian Will with an explicit geographic ring-fencing clause to govern your assets in India.",
      };
    }
    if (assetType === "ancestral_family") {
      return {
        tag: "Recommended: Coparcenary Schedule Will",
        summary:
          "Ancestral property in India requires clear demarcation of your undivided share to prevent partition disputes among siblings or co-heirs under the Hindu Succession Act, 1956.",
        statute: "Hindu Succession Act 1956 s. 6 & Vineeta Sharma v. Rakesh Sharma (2020)",
        action:
          "Map all Class-I heirs and incorporate a precise Schedule A property demarcation with survey boundaries.",
      };
    }
    if (assetType === "financial_portfolios") {
      return {
        tag: "Recommended: Fast-Track Financial Asset Will",
        summary:
          "Bank accounts, mutual funds, and demat shares pass to heirs named in your Will. A verified Will eliminates the need for heirs to obtain a court Succession Certificate in India.",
        statute: "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
        action:
          "List bank IFSC codes, folio numbers, and nominee details with clear instructions for RBI Form 15CA/15CB outward remittance.",
      };
    }
    return {
      tag: "Recommended: Dual-Will Cross-Border Framework",
      summary:
        "Urban residential and commercial realty in India requires compliance with Indian registration laws and municipal property tax rules, fully ring-fenced from Irish CAT and probate.",
      statute: "Indian Succession Act 1925 s. 5 (Lex Situs) & CAT Consolidation Act 2003",
      action:
        "Prepare an Indian Will on plain paper with two witnesses, coordinated with your Irish solicitor for seamless dual-jurisdiction administration.",
    };
  };

  const diagnosticResult = getDiagnosticOutput();

  return (
    <section className="w-full mb-16 sm:mb-24">
      {/* Header */}
      <div className="max-w-3xl mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Legal Hub</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Ireland-India Estate Planning Architecture
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore specific legal scenarios for NRIs living across Dublin, Cork,
          Galway, and Limerick. Assess your cross-border succession options below:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-[#F4EFE6] rounded-2xl mb-8">
        {NRI_IRELAND_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                isActive
                  ? "bg-[#172228] text-white shadow-xs"
                  : "text-[#49585F] hover:text-[#172228] hover:bg-white/60"
              }`}
            >
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#172228]/10 text-xs font-semibold text-[#C65378] mb-4">
            Statutory Focus: {activeScenario.statutoryPrecedent}
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4">
            {activeScenario.heading}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 pb-6 border-t border-[#172228]/10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
                Cross-Border Legal Challenge
              </h4>
              <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                {activeScenario.challengeSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#047857] mb-2">
                Statutory Solution &amp; Indian Law Rule
              </h4>
              <p className="text-[14.5px] leading-[1.68] text-[#49585F]">
                {activeScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#172228]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2">
                Recommended Succession Instrument
              </div>
              <p className="text-[15px] font-semibold text-[#C65378]">
                {activeScenario.recommendedInstrument}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 text-xs text-[#55636D]">
                {activeScenario.checklist.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#047857]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors shrink-0"
            >
              <span>Consult Estate Lawyer</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Estate Risk Diagnostic Tool */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-10">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
            Self-Assessment Tool
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Ireland NRI Cross-Border Succession Diagnostic
          </h3>
          <p className="text-xs sm:text-[14px] leading-relaxed text-[#49585F]">
            Select your Indian asset profile and Irish legal status to receive an
            instant cross-border succession assessment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111827] mb-3">
              1. Indian Asset Portfolio
            </label>
            <div className="space-y-2">
              {[
                { val: "urban_realty", label: "Flats & Commercial Land" },
                { val: "financial_portfolios", label: "NRE/NRO, Demat & MF" },
                { val: "ancestral_family", label: "Ancestral Family Property" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAssetType(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                    assetType === opt.val
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111827] mb-3">
              2. Irish Residency Status
            </label>
            <div className="space-y-2">
              {[
                { val: "indian_passport_nri", label: "NRI (Indian Passport Holder)" },
                { val: "irish_citizen_oci", label: "OCI / Irish Citizen" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setResidencyStatus(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                    residencyStatus === opt.val
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#111827] mb-3">
              3. Will Architecture
            </label>
            <div className="space-y-2">
              {[
                { val: "dual_separate_wills", label: "Separate Irish & Indian Wills" },
                { val: "undecided", label: "Single Worldwide Will (Undecided)" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setWillStructure(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                    willStructure === opt.val
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Result */}
        <div className="bg-white rounded-2xl border border-[#172228]/10 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAF7F0] text-[#C65378] text-xs font-bold uppercase tracking-[0.14em]">
              {diagnosticResult.tag}
            </span>
            <span className="text-xs text-[#55636D]">
              Legal Basis: <strong>{diagnosticResult.statute}</strong>
            </span>
          </div>
          <p className="text-[14.5px] leading-[1.65] text-[#374151] mb-4">
            {diagnosticResult.summary}
          </p>
          <div className="p-3.5 rounded-xl bg-[#FAF7F0] text-xs sm:text-[13px] text-[#172228] font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
            <span>
              <strong>Strategic Action:</strong> {diagnosticResult.action}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
