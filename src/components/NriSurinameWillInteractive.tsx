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
  Calculator,
  Scale,
  FileCheck2,
} from "lucide-react";

interface NriSurinameScenario {
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

const NRI_SURINAME_SCENARIOS: NriSurinameScenario[] = [
  {
    id: "sarnami-ancestral-lineage",
    label: "Sarnami Ancestral Land",
    icon: "globe",
    heading: "Ancestral Claims in Uttar Pradesh, Bihar and Bhojpur",
    challengeSummary:
      "Many families in Paramaribo hold ancestral land in UP and Bihar. Local land officers often pause land mutation if old link records are missing. We help you find your old village land papers. We protect your family land from fraud.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act, Indian land follows Indian law only. OCI cardholders have full rights to inherit ancestral land. We draft clear papers to prove your lineage. Your family keeps full title.",
    statutoryPrecedent:
      "Citizenship Act 1955 s. 7B & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Indian Will with Khasra Schedules & Lineage Pedigree",
    checklist: [
      "Gather old family tree papers and registry records",
      "Trace Tehsil Khasra and Khatauni plot records in UP and Bihar",
      "Ring-fence ancestral land from foreign court disputes",
    ],
  },
  {
    id: "dutch-notary-ringfencing",
    label: "Dutch Will Ring-Fencing",
    icon: "landmark",
    heading: "Ring-Fencing Surinamese Civil Notary Wills",
    challengeSummary:
      "A Will made before a notary in Paramaribo needs Dutch translation and foreign seals. Indian courts also ask for slow probate under Section 228. This costs a lot of time and money for your family.",
    legalMechanism:
      "Writing a separate Indian Will in English under Section 63 keeps your Indian assets safe. It leaves your Dutch assets untouched. It stops foreign court delays. Your heirs can settle land records quickly.",
    statutoryPrecedent:
      "Burgerlijk Wetboek Suriname & Indian Succession Act 1925 s. 228",
    recommendedInstrument:
      "Standalone Indian Will with Jurisdictional Ring-Fence",
    checklist: [
      "Keep Dutch estate assets out of your Indian Will",
      "Sign on plain A4 paper before two adult witnesses",
      "Get optional embassy seals or store in safe custody",
    ],
  },
  {
    id: "paramaribo-urban-investments",
    label: "Urban Flats & Commercial Units",
    icon: "building",
    heading: "Residential Flats & Commercial Plots in Delhi-NCR and Mumbai",
    challengeSummary:
      "Many families in Wanica and Paramaribo own city flats in Delhi, Mumbai, or Lucknow. Housing societies ask for clear legal proof before they transfer flat shares. Nominees cannot take full title alone.",
    legalMechanism:
      "Section 59 of the Indian Succession Act gives you 100% Will freedom over self-made flats. A clear Will lets your heirs update city tax books and housing society papers without court fights.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 59, 213 & State Flat Ownership Acts",
    recommendedInstrument:
      "Indian Will with Specific Apartment Demarcations",
    checklist: [
      "List exact flat numbers, floor maps, and land share",
      "Attach registered sale deed numbers and city tax IDs",
      "Name a trusted Indian agent for local society filings",
    ],
  },
  {
    id: "fema-banking-repatriation",
    label: "NRO Accounts & Repatriation",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Mutual Funds & USD 1M Remittance",
    challengeSummary:
      "Suriname residents hold big bank deposits and mutual funds in India. Bank nominees are only caretakers. Without an Indian Will, Indian banks freeze the money until heirs bring court papers.",
    legalMechanism:
      "A clear Indian Will lets your heirs get a Section 372 court order quickly. Under RBI rules, your heirs can send up to USD 1 Million per year from India to Suriname with zero hassle.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction on Remittance",
    recommendedInstrument:
      "Financial Asset Schedule with Form 15CA/15CB Directives",
    checklist: [
      "List NRE, NRO, and bank accounts with branch IFSC codes",
      "Record Demat Client IDs with NSDL or CDSL depositories",
      "Enable smooth Form 15CA and 15CB bank remittances",
    ],
  },
];

export default function NriSurinameWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("sarnami-ancestral-lineage");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"ancestral" | "urban" | "financial">(
    "ancestral"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"oci_cardholder" | "nri_passport">(
    "oci_cardholder"
  );
  const [hasSurinameWill, setHasSurinameWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_SURINAME_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_SURINAME_SCENARIOS[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-16">
      {/* Header Area */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.14em] uppercase mb-2">
          <Globe2 className="w-4 h-4 text-[#C65378]" />
          <span>Suriname Hindustani Lineage & Estate Blueprint</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] tracking-[-0.02em] mb-3">
          Suriname to India Cross-Border Succession Guide
        </h3>
        <p className="text-[0.98rem] text-[#49585F] leading-relaxed">
          Check your ancestral land rights. Avoid slow Dutch court steps. Keep your family wealth safe in India. We help you write an ironclad Indian Will under the Indian Succession Act, 1925.
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#172228]/5 mb-8">
        {NRI_SURINAME_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-white text-[#111827] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#172228]/10"
                  : "text-[#55636D] hover:text-[#111827] hover:bg-white/60"
              }`}
            >
              {scenario.icon === "globe" && <Globe2 className="w-4 h-4 text-[#C65378]" />}
              {scenario.icon === "landmark" && <Landmark className="w-4 h-4 text-[#5F7E75]" />}
              {scenario.icon === "building" && <Building2 className="w-4 h-4 text-[#C65378]" />}
              {scenario.icon === "coins" && <Coins className="w-4 h-4 text-[#5F7E75]" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Display Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FAF7F0] rounded-2xl p-6 border border-[#172228]/8">
            <h4 className="text-lg sm:text-xl font-bold text-[#111827] mb-3">
              {currentScenario.heading}
            </h4>
            <div className="space-y-4 text-sm text-[#49585F] leading-relaxed">
              <p>
                <strong className="text-[#111827]">Cross-Border Challenge: </strong>
                {currentScenario.challengeSummary}
              </p>
              <p>
                <strong className="text-[#111827]">Statutory Framework: </strong>
                {currentScenario.legalMechanism}
              </p>
              <div className="pt-2 border-t border-[#172228]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#111827]">
                  Authority: {currentScenario.statutoryPrecedent}
                </span>
                <span className="text-[#C65378] font-bold">
                  Recommended: {currentScenario.recommendedInstrument}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#55636D]">
              Essential Cross-Border Action Items
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {currentScenario.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#172228]/8 text-xs sm:text-sm text-[#2D3A41]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Calculator / Diagnostic Box */}
        <div className="lg:col-span-5 bg-[#172228] text-white rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[0.7rem] uppercase tracking-widest text-[#E07090] font-bold">
              Lineage & Estate Assessment
            </span>
            <Scale className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white mb-4">
            Check Your Suriname Estate Enforceability
          </h4>

          <div className="space-y-4 mb-6 text-xs">
            <div>
              <label className="block text-[#8FA3AD] mb-1.5 font-medium">
                1. Primary Indian Asset Category:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAssetType("ancestral")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    assetType === "ancestral"
                      ? "bg-[#C65378] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  Ancestral
                </button>
                <button
                  type="button"
                  onClick={() => setAssetType("urban")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    assetType === "urban"
                      ? "bg-[#C65378] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  Urban Flat
                </button>
                <button
                  type="button"
                  onClick={() => setAssetType("financial")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    assetType === "financial"
                      ? "bg-[#C65378] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  NRO Bank
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#8FA3AD] mb-1.5 font-medium">
                2. Legal Citizenship Status in Suriname:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCitizenshipStatus("oci_cardholder")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    citizenshipStatus === "oci_cardholder"
                      ? "bg-[#5F7E75] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  OCI / PIO Cardholder
                </button>
                <button
                  type="button"
                  onClick={() => setCitizenshipStatus("nri_passport")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    citizenshipStatus === "nri_passport"
                      ? "bg-[#5F7E75] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  Indian Passport NRI
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#8FA3AD] mb-1.5 font-medium">
                3. Existing Will Executed in Suriname:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasSurinameWill("yes")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    hasSurinameWill === "yes"
                      ? "bg-[#C65378] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  Yes (Dutch Notary)
                </button>
                <button
                  type="button"
                  onClick={() => setHasSurinameWill("no")}
                  className={`py-2 px-2 rounded-lg text-center font-medium transition-all ${
                    hasSurinameWill === "no"
                      ? "bg-[#C65378] text-white"
                      : "bg-[#23333C] text-[#8FA3AD] hover:text-white"
                  }`}
                >
                  No Will Drafted
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic Result Output */}
          <div className="p-3.5 bg-[#1F2F38] rounded-xl border border-white/10 mb-5 text-xs">
            <div className="text-[#D4AF37] font-bold mb-1 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4" />
              <span>Recommended Succession Action:</span>
            </div>
            <p className="text-[#C4D1D9] leading-relaxed">
              {assetType === "ancestral" &&
                "Draft an Indian Will with exact plot survey numbers. OCI cardholders can lawfully inherit ancestral farmland from Indian forebears without RBI hurdles."}
              {assetType === "urban" &&
                "Execute a standalone English Will with precise flat numbers. Bypass Dutch probate delays and avoid slow High Court proceedings in India."}
              {assetType === "financial" &&
                "Designate specific heirs for Indian bank deposits. Enables fast Section 372 court orders and direct USD 1M annual remittance under RBI rules."}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/start"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#b04567] transition-colors"
            >
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors"
            >
              <span>Consult High Court Advocate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Direct Interactive Tools Footer Banner */}
      <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-[#5F7E75]" />
          <span className="font-semibold text-[#111827]">
            Calculate Tax & TDS on Repatriation of Inherited Indian Assets:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/tools/capital-gains-tax-calculator-inherited-property"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/15 text-[#111827] font-semibold hover:text-[#C65378] transition-colors"
          >
            Capital Gains Calculator
          </Link>
          <Link
            href="/tools/nri-property-sale-tds-repatriation-calculator"
            className="px-3 py-1.5 rounded-lg bg-white border border-[#172228]/15 text-[#111827] font-semibold hover:text-[#C65378] transition-colors"
          >
            TDS & Repatriation Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
