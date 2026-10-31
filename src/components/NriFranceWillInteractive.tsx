"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Coins,
  Globe2,
  Scale,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

interface NriFranceScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "scale";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_FRANCE_SCENARIOS: NriFranceScenario[] = [
  {
    id: "brussels-iv-election",
    label: "Brussels IV Art. 22 Opt-In",
    icon: "globe",
    heading: "EU Brussels IV Choice of Indian Succession Law",
    challengeSummary:
      "French succession law enforces strict forced heirship (réserve héréditaire Arts. 912-930). French residents risk having Indian properties split under mandatory French quotas unless an explicit national law choice is made.",
    legalMechanism:
      "Under Article 22 of EU Regulation 650/2012 (Brussels IV), Indian passport holders and dual nationals residing in France can elect Indian law as the law governing their succession, safeguarding Indian assets from mandatory French splits.",
    statutoryPrecedent:
      "EU Regulation 650/2012 Art. 22 & French Civil Code Arts. 912-930",
    recommendedInstrument:
      "Indian Will with Brussels IV Professio Juris Clause",
    checklist: [
      "Include explicit Brussels IV Article 22 Indian law choice recital",
      "Ring-fence Indian assets from French Civil Code forced quotas",
      "Coordinate with your French Notaire to prevent conflicting drafts",
    ],
  },
  {
    id: "droits-succession-tax",
    label: "Inheritance Tax Ring-Fencing",
    icon: "scale",
    heading: "French Inheritance Tax & Territorial Ring-Fencing",
    challengeSummary:
      "Under Article 750 ter of the French General Tax Code (CGI), France imposes inheritance tax (droits de succession) up to 60% on worldwide assets for non-direct heirs if the deceased or heir lived in France for 6 of the last 10 years.",
    legalMechanism:
      "A separate Indian Will isolates Indian assets under the Lex Situs rule (Section 5, Indian Succession Act 1925). India has zero estate duty, and proper documentation prevents double tax friction when repatriating sale funds.",
    statutoryPrecedent:
      "French Tax Code Art. 750 ter & Indian Estate Duty Abolition 1985",
    recommendedInstrument:
      "Dual-Will Architecture with Territorial Ring-Fencing",
    checklist: [
      "Define territorial scope strictly to the Republic of India",
      "State zero overlap with French movable and immovable assets",
      "Obtain Form 15CA/15CB for post-inheritance capital repatriation",
    ],
  },
  {
    id: "french-notaire-probate",
    label: "Notaire & Probate Coordination",
    icon: "building",
    heading: "French Notaire & Indian High Court Coordination",
    challengeSummary:
      "French Notaires have no jurisdiction over Indian land records. If an NRI leaves only a French testament, Indian land registries and banks demand slow ancillary probate proceedings under Section 228 of the Indian Succession Act.",
    legalMechanism:
      "Executing two distinct wills—a French Will for French real estate and assurance-vie, and an independent Indian Will for Indian assets—enables immediate execution in India without waiting for French court apostilles.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 228 & French Notarial Code",
    recommendedInstrument:
      "Standalone Indian Will with Mutual Non-Revocation Terms",
    checklist: [
      "Ensure French will does not contain worldwide revocation text",
      "State explicit non-revocation recitals across both documents",
      "Appoint reliable India-resident executors for swift local filing",
    ],
  },
  {
    id: "nre-nro-demat-investments",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "Indian Bank Deposits, Mutual Funds & Equity Folios",
    challengeSummary:
      "NRIs in Paris, Lyon, or Toulouse hold substantial savings in NRE/NRO deposits, mutual funds, and demat accounts in India. Many believe bank nominees become legal owners upon the depositor's demise.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees are merely trustees, not legal heirs. Without an explicit Indian Will, Indian banks freeze accounts and demand court succession certificates.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions on Remittance",
    recommendedInstrument:
      "Indian Testamentary Schedule of Financial Folios",
    checklist: [
      "Catalog NRE and NRO bank accounts with branch IFSC codes",
      "Record Demat Client IDs with NSDL or CDSL depositories",
      "Specify percentage shares to bypass bank account lockouts",
    ],
  },
];

export default function NriFranceWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("brussels-iv-election");

  // 3-Question Diagnostic State
  const [assetType, setAssetType] = useState<
    "urban_real_estate" | "ancestral_agricultural" | "financial_investments"
  >("urban_real_estate");
  const [residencyStatus, setResidencyStatus] = useState<
    "nri_in_france" | "french_citizen_oci"
  >("nri_in_france");
  const [hasFrenchWill, setHasFrenchWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_FRANCE_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_FRANCE_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_real_estate") {
    recommendationTitle = "Indian Urban Real Estate & Society Share Strategy";
    recommendationSummary =
      "For flats, plots, and commercial units in Delhi-NCR, Mumbai, Bengaluru, or Chennai, your Indian Will needs exact municipal survey numbers, undivided land share (UDS), and society share certificate details.";
    actionPoints = [
      "Include registered sale deed dates, Sub-Registrar volumes, and UDS",
      "Elect Indian Succession Act 1925 under Brussels IV Art. 22",
      "Appoint an India-based executor to manage housing society mutation",
    ];
  } else if (assetType === "ancestral_agricultural") {
    recommendationTitle = "Ancestral Farmland & State Revenue Code Shield";
    recommendationSummary =
      "Ancestral agricultural holdings in Punjab, Haryana, UP, or Kerala follow state revenue codes. A French testament is completely unenforceable before Indian Tehsildars.";
    actionPoints = [
      "Record Tehsil Khasra, Khatauni, or Jamabandi plot identifiers",
      "Confirm FEMA compliance for inheriting agricultural land as an NRI",
      "Draft clear bequests to eliminate extended revenue court litigation",
    ];
  } else {
    recommendationTitle = "Financial Asset Folio & Remittance Repatriation Plan";
    recommendationSummary =
      "For NRE/NRO fixed deposits, mutual funds, and demat folios, your Will must detail branch bank CIFs and provide an orderly path for RBI Form 15CA/15CB repatriation.";
    actionPoints = [
      "Catalog all Indian bank account numbers and Demat Client IDs",
      "Clarify that bequests supersede bank nominee custodian status",
      "Streamline post-tax funds repatriation under the $1M USD RBI window",
    ];
  }

  const getScenarioIcon = (icon: string) => {
    switch (icon) {
      case "globe":
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-5 h-5 text-[#C65378]" />;
      case "scale":
        return <Scale className="w-5 h-5 text-[#C65378]" />;
      default:
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Interactive Cross-Border Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
          France NRI Estate Risk Analyzer &amp; Strategy Planner
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Select your primary asset profile and cross-border situation below to
          see how EU Brussels IV, French Civil Code rules, and the Indian
          Succession Act 1925 intersect for your family estate:
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {NRI_FRANCE_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-[#C65378] shadow-md ring-1 ring-[#C65378]"
                  : "bg-white/60 border-[#172228]/10 hover:border-[#172228]/25 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                {getScenarioIcon(scenario.icon)}
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                )}
              </div>
              <span
                className={`text-xs sm:text-[13px] font-bold leading-tight ${
                  isSelected ? "text-[#111827]" : "text-[#55636D]"
                }`}
              >
                {scenario.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Deep Dive Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-1">
              Statutory Blueprint
            </span>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F0] border border-[#172228]/10 text-xs font-semibold text-[#172228] shrink-0">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-1.5">
                The Cross-Border Challenge
              </div>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#047857] mb-1.5">
                The Legal Resolution
              </div>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                Mandatory Drafting Checklist
              </div>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-[#172228]/10">
              <span className="text-[11px] font-semibold text-[#55636D] block mb-1">
                Recommended Solution:
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#111827]">
                {currentScenario.recommendedInstrument}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#172228]/10 bg-[#FAF7F0]/50 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-6 sm:p-9 rounded-b-[28px]">
          <span className="text-xs sm:text-[13px] text-[#55636D]">
            Need our High Court advocates to draft your EU Brussels IV &amp;
            Indian Will?
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors shrink-0"
          >
            <span>Consult France-India Legal Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive 3-Step Diagnostic Tool */}
      <div className="bg-[#F4EFE6] rounded-[28px] p-6 sm:p-9 border border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <FileCheck className="w-4 h-4" />
            <span>Instant Estate Diagnostic</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Personalized Estate Audit for NRIs in France
          </h4>
          <p className="text-xs sm:text-[14px] text-[#49585F]">
            Answer three quick questions about your Indian assets and French
            residency to receive customized legal instructions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-[#55636D] block mb-3">
              1. Primary Indian Asset Class
            </label>
            <div className="space-y-2">
              {[
                { id: "urban_real_estate", label: "Flats & Commercial Units" },
                {
                  id: "ancestral_agricultural",
                  label: "Ancestral Farmland / Plots",
                },
                { id: "financial_investments", label: "NRE/NRO, Stocks & Funds" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setAssetType(
                      opt.id as
                        | "urban_real_estate"
                        | "ancestral_agricultural"
                        | "financial_investments"
                    )
                  }
                  className={`w-full text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all ${
                    assetType === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-[#55636D] block mb-3">
              2. Status in France
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "nri_in_france",
                  label: "Indian Passport Holder (NRI)",
                },
                {
                  id: "french_citizen_oci",
                  label: "French National (OCI Holder)",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setResidencyStatus(
                      opt.id as "nri_in_france" | "french_citizen_oci"
                    )
                  }
                  className={`w-full text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all ${
                    residencyStatus === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 shadow-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-[#55636D] block mb-3">
              3. Existing French Will
            </label>
            <div className="space-y-2">
              {[
                { id: "yes", label: "Yes, Executed with French Notaire" },
                { id: "no", label: "No French Will Executed Yet" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHasFrenchWill(opt.id as "yes" | "no")}
                  className={`w-full text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-all ${
                    hasFrenchWill === opt.id
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Strategic Pathway</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#111827]">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#49585F] max-w-2xl">
              {recommendationSummary}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {actionPoints.map((pt, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF7F0] border border-[#172228]/10 text-xs text-[#374151]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]" />
                  {pt}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white bg-[#C65378] hover:bg-[#a13c5d] px-5 py-3 rounded-full transition-colors text-center"
            >
              <span>Draft Online Indian Will</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#172228] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors text-center"
            >
              <span>Advocate Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
