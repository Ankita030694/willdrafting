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
} from "lucide-react";

interface NriThailandScenario {
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

const NRI_THAILAND_SCENARIOS: NriThailandScenario[] = [
  {
    id: "bangkok-commercial-business",
    label: "Bangkok Business & Commercial Units",
    icon: "building",
    heading: "Commercial Assets & Joint Portfolios in India",
    challengeSummary:
      "Multi-generational Thai-Indian families in Bangkok, Pattaya, and Phuket own commercial showrooms, warehouses, and family business shares in Delhi, Mumbai, or Punjab. Without an Indian Will, company registries and banks freeze accounts.",
    legalMechanism:
      "Section 59 of the Indian Succession Act 1925 gives total freedom over self-made wealth. Our drafting structures clean share transfer and avoids court fights.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 59 & Companies Act 2013 s. 56",
    recommendedInstrument:
      "Indian Will with Corporate Share Folios & Schedule Demarcations",
    checklist: [
      "Record Corporate DIN numbers, company shares, and demat folios",
      "Draft clear floor boundaries and commercial tenancy clauses",
      "Name an Indian resident executor for smooth corporate transmission",
    ],
  },
  {
    id: "thai-ccc-ring-fencing",
    label: "Thai CCC Book VI vs Indian Will",
    icon: "globe",
    heading: "Ring-Fencing Indian Assets from Thai Court Probate",
    challengeSummary:
      "Thai succession law (CCC Book VI) divides estates into 6 statutory classes and marital property (Sin Somros). Thailand is not a reciprocating territory under Section 44A CPC, making Thai court grants un-resealable in India.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. A separate Indian Will ring-fences your Indian flats from Thai marital claims. This stops costly court trials.",
    statutoryPrecedent:
      "Thai CCC Book VI ss. 1599–1672 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Dual Will Architecture with Foreign Asset Exclusion Clause",
    checklist: [
      "Insert explicit jurisdictional ring-fencing clause limiting scope to India",
      "Exclude Thai condominiums, local businesses, and Bangkok bank accounts",
      "Execute independent Thai Will for assets located within Thailand",
    ],
  },
  {
    id: "nre-nro-fema-repatriation",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "Repatriation of Bank Funds & Portfolios Under FEMA",
    challengeSummary:
      "Thai-Indians maintain substantial NRE/NRO fixed deposits and mutual funds in Indian banks. Relying only on bank nomination causes legal freezes, as nominees are merely custodians under Supreme Court rulings.",
    legalMechanism:
      "An Indian Will proves undeniable ownership. Beneficiaries can smoothly repatriate inherited funds up to USD 1,000,000 per financial year through their NRO accounts under RBI FEMA rules using Form 15CA/15CB tax clearances.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction No. 13/2015-16",
    recommendedInstrument:
      "Indian Will with Bank CIF & Depository Account Schedules",
    checklist: [
      "Enumerate all NRE, NRO, and FCNR account numbers and bank IFSC codes",
      "Specify mutual fund folios, demat client IDs, and depository details",
      "Include executor powers to obtain RBI remittance and 15CA/15CB tax clearances",
    ],
  },
  {
    id: "embassy-attestation-signing",
    label: "Embassy Attestation & Section 63",
    icon: "landmark",
    heading: "Plain-Paper Signing & Bangkok Consular Attestation",
    challengeSummary:
      "NRIs in Thailand often believe an Indian Will must be printed on Indian stamp paper or signed before an Indian court registrar, leading to costly and unnecessary travel to India.",
    legalMechanism:
      "Section 63 of the Indian Succession Act 1925 validates a Will executed on plain A4 paper in Thailand when signed before two adult witnesses. Consular attestation at the Embassy of India Bangkok gives extra evidentiary protection.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Diplomatic Officers Act 1948 s. 3",
    recommendedInstrument:
      "Section 63 Compliant Will with Embassy Attestation Protocol",
    checklist: [
      "Print clean engrossed draft on standard white A4 paper in Thailand",
      "Sign in the physical presence of two independent adult witnesses",
      "Optional consular attestation at Embassy of India Bangkok for added protection",
    ],
  },
];

export default function NriThailandWillInteractive() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    NRI_THAILAND_SCENARIOS[0].id
  );

  const activeScenario =
    NRI_THAILAND_SCENARIOS.find((s) => s.id === activeScenarioId) ||
    NRI_THAILAND_SCENARIOS[0];

  return (
    <section className="w-full my-12 sm:my-16 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Estate Planning Navigator</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your NRI Asset Profile in Thailand
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal protections for Thai-Indian business families, Bangkok property owners, and cross-border bank account holders:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_THAILAND_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeScenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveScenarioId(scenario.id)}
              className={`flex items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                isSelected
                  ? "bg-[#172228] text-white border-[#172228] shadow-sm"
                  : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]/40"
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isSelected
                    ? "bg-[#C65378] text-white"
                    : "bg-white text-[#C65378] border border-[#172228]/10"
                }`}
              >
                {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
                {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
                {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
                {scenario.icon === "landmark" && <Landmark className="w-4 h-4" />}
              </div>
              <span className="text-xs sm:text-[13px] font-semibold leading-tight line-clamp-2">
                {scenario.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail Box */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2">
              Cross-Border Legal Strategy
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-4 leading-snug">
              {activeScenario.heading}
            </h3>
            <div className="space-y-4 text-[14.5px] leading-[1.68] text-[#374151]">
              <p>
                <strong className="text-[#111827]">Estate Risk:</strong>{" "}
                {activeScenario.challengeSummary}
              </p>
              <p>
                <strong className="text-[#111827]">Statutory Framework:</strong>{" "}
                {activeScenario.legalMechanism}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#172228]/10 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
              <span className="text-[#6B7280]">Key Legal Authority:</span>
              <span className="font-semibold text-[#111827] bg-white px-3 py-1.5 rounded-full border border-[#172228]/10">
                {activeScenario.statutoryPrecedent}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
                Recommended Solution
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-3">
                {activeScenario.recommendedInstrument}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#49585F] mb-6">
                {activeScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#172228]/10 flex flex-col gap-2.5">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3 px-4 transition-colors"
              >
                <span>Consult High Court Lawyer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#172228] hover:text-[#C65378] py-1 transition-colors text-center"
              >
                <span>Draft Online Indian Will for NRIs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
