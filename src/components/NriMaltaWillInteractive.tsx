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
  ShieldCheck,
} from "lucide-react";

interface NriMaltaScenario {
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

const NRI_MALTA_SCENARIOS: NriMaltaScenario[] = [
  {
    id: "maltese-legitim-eu-brussels-iv",
    label: "Maltese Legitim & Brussels IV",
    icon: "globe",
    heading: "Shielding Indian Assets from Maltese Civil Code Legitim",
    challengeSummary:
      "Maltese Civil Code Articles 614 to 653 give children a forced share called legitim. Without a choice of law, default EU rules may expose Indian assets to forced share claims.",
    legalMechanism:
      "Under Article 22 of EU rules, Indian citizens can choose Indian law for their estate. Under Section 5 of the Indian Succession Act, this choice gives you total freedom to divide your Indian land and flats as you wish.",
    statutoryPrecedent:
      "Maltese Civil Code (Cap 16) Title III & EU Regulation 650/2012 Art. 22",
    recommendedInstrument:
      "Separate Indian Will with EU Brussels IV Article 22 Choice of Law",
    checklist: [
      "State Indian citizenship and passport details clearly",
      "Elect Indian Succession Act 1925 under EU Regulation 650/2012 Article 22",
      "Ring-fence Indian assets from Maltese forced heirship rules",
    ],
  },
  {
    id: "mfea-apostille-plain-paper",
    label: "MFEA Apostille & Execution",
    icon: "building",
    heading: "Plain Paper Signing in Malta & MFEA Apostille Protocol",
    challengeSummary:
      "NRIs in Valletta, Birkirkara, and Sliema often think they must travel to India to sign a Will. You do not need to fly to India.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign your Indian Will on plain paper before two adult witnesses in Malta. A Maltese Notary stamp and a Foreign Ministry apostille in Valletta give strong proof.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Indian Will with Maltese Notary Attestation & MFEA Apostille",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries",
      "Optional attestation before a Maltese Notary Public under Cap 55",
      "Attach a Hague Apostille from the Ministry for Foreign Affairs in Valletta",
    ],
  },
  {
    id: "fintech-igaming-bank-assets",
    label: "Fintech & Digital Wealth",
    icon: "coins",
    heading: "Protecting Indian Demat, Mutual Funds & Bank Accounts",
    challengeSummary:
      "Indians in Malta hold savings in bank deposits, mutual funds, and demat accounts. Many think bank nominees become owners after death.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees are only temporary caretakers. A clear Indian Will names your true heirs. This saves your family from expensive court certificates and speeds up bank transfers.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi (1984) & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Will Schedule with Depository DP IDs & Bank IFSC Codes",
    checklist: [
      "List NRE, NRO, and FCNR bank accounts with IFSC codes",
      "Specify depository participant IDs for mutual funds and stocks",
      "Name trusted India-based executors for digital asset claims",
    ],
  },
  {
    id: "dual-will-probate-shield",
    label: "Dual-Will Cross-Border Plan",
    icon: "landmark",
    heading: "Dual-Will Strategy: Preventing Cross-Border Court Delays",
    challengeSummary:
      "A single worldwide Will causes severe legal delays. Maltese probate papers are rejected by Indian land offices and banks.",
    legalMechanism:
      "Indian High Courts require ancillary probate under Section 228 with certified court copies. Writing two separate Wills lets both estates settle fast without court roadblocks.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 59, 228 & Maltese Civil Code Cap 16",
    recommendedInstrument:
      "Geographically Ring-Fenced Indian Will with Foreign Exclusion Clauses",
    checklist: [
      "Exclude Maltese assets and bank balances from your Indian Will",
      "Ensure the Indian Will does not revoke your Maltese testamentary papers",
      "Keep original hard copies with your appointed India executor",
    ],
  },
];

export default function NriMaltaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>(
    "maltese-legitim-eu-brussels-iv"
  );

  const currentScenario =
    NRI_MALTA_SCENARIOS.find((item) => item.id === activeTab) ||
    NRI_MALTA_SCENARIOS[0];

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Globe2 className="w-4 h-4" />
          <span>Cross-Border Estate Navigator</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Malta-India Succession Scenarios
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Cross-border estate planning between Malta and India requires careful
          statutory alignment. Select your scenario below to see the governing
          succession rules, court precedents, and drafting checklists:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_MALTA_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] hover:text-[#172228] border border-[#172228]/10 hover:border-[#172228]/30"
              }`}
            >
              {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
              {scenario.icon === "building" && (
                <Building2 className="w-4 h-4" />
              )}
              {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
              {scenario.icon === "landmark" && (
                <Landmark className="w-4 h-4" />
              )}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Governing Statutory Framework
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#FAF7F0] border border-[#172228]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                The Core Succession Challenge
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                Statutory Legal Mechanism
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                Recommended Legal Instrument
              </span>
              <span className="inline-block text-sm font-semibold text-[#172228] bg-[#FAF7F0] px-3.5 py-1.5 rounded-lg border border-[#172228]/10">
                {currentScenario.recommendedInstrument}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0]/60 rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                Drafting &amp; Execution Checklist
              </h4>
              <ul className="space-y-3 text-[13.5px] sm:text-[14px] text-[#49585F] leading-snug">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Consult Cross-Border Estate Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
