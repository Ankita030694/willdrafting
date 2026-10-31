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

interface NriItalyScenario {
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

const NRI_ITALY_SCENARIOS: NriItalyScenario[] = [
  {
    id: "punjab-haryana-farmland",
    label: "Punjab & Haryana Farmland",
    icon: "globe",
    heading: "Farmland Inheritance: Intkal & Jamabandi Mutation",
    challengeSummary:
      "Families in Milan, Brescia, or Verona own farm land in Jalandhar, Ludhiana, or Karnal. When an NRI passes away, local revenue staff freeze land mutation. Distant relatives may claim false rights.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. A valid Will gives the Tehsildar clear legal proof under Section 34 of the Punjab Land Revenue Act 1887.",
    statutoryPrecedent:
      "Punjab Land Revenue Act 1887 s. 34 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Indian Will with Khasra, Khewat & Jamabandi Schedules",
    checklist: [
      "Check Tehsil Jamabandi, Khewat, and Khasra land numbers",
      "Draft clear gifts to stop family disputes over farm land",
      "Appoint a trusted person in India to handle land hearings",
    ],
  },
  {
    id: "italian-forced-heirship",
    label: "Quota di Legittima Ring-Fencing",
    icon: "landmark",
    heading: "Bypassing Italian Forced Heirship (Quota di Legittima)",
    challengeSummary:
      "Italian law reserves fixed shares for certain heirs. This is called quota di legittima. Using a generic will in Italy can cause legal fights over your property in India.",
    legalMechanism:
      "A separate Indian Will keeps Indian assets apart. Under Section 59 of the Indian Succession Act, you have full freedom to give your self-made wealth to anyone you choose.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 59 & EU Regulation 650/2012 Art. 22",
    recommendedInstrument:
      "Separate Indian Will with Exclusive Lex Situs Jurisdiction Clause",
    checklist: [
      "Add ring-fencing terms to block foreign forced heirship claims",
      "Apply EU Rule 650/2012 Article 22 to choose Indian law",
      "Ensure your Italian and Indian wills never cancel each other",
    ],
  },
  {
    id: "remote-execution-apostille",
    label: "Apostille & Remote Execution",
    icon: "building",
    heading: "Remote Execution: Italian Apostille vs Plain-Paper Will",
    challengeSummary:
      "Many Indians in Italy think they must fly to India to make a Will. Others think they need hard-to-get embassy visits in Rome or Milan.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign your Will on plain A4 paper. You sign before two adult witnesses. For extra proof, an Italian Notaio signature can receive a Hague apostille stamp.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Succession Act 1925 s. 63",
    recommendedInstrument:
      "Plain-Paper Section 63 Will with Optional Apostille Attestation",
    checklist: [
      "Sign on plain A4 paper with two adult witnesses present",
      "Optional Italian Notaio check with Procura apostille stamp",
      "Pay zero stamp duty in India on testamentary Wills",
    ],
  },
  {
    id: "nro-banking-investments",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Mutual Funds & Repatriation",
    challengeSummary:
      "NRIs hold bank accounts and shares in India. Many believe a bank nominee owns the money after death. That is not true under Indian law.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court held that a nominee is only a caretaker. A valid Indian Will gives true ownership. It allows smooth fund transfer and repatriation under RBI FEMA rules.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions on Remittance",
    recommendedInstrument:
      "Schedule of Moveable Financial Assets & RBI Remittance Clause",
    checklist: [
      "List NRE, NRO, and bank accounts with IFSC codes",
      "Record Demat Client IDs with NSDL and CDSL depositories",
      "Give the executor power to get Form 15CA and 15CB papers",
    ],
  },
];

export default function NriItalyWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>(
    NRI_ITALY_SCENARIOS[0].id
  );

  const activeScenario =
    NRI_ITALY_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_ITALY_SCENARIOS[0];

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Cross-Border Estate Framework</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
          Interactive Italy NRI Succession Diagnostics
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Select your asset profile to explore how Indian succession laws,
          Italian civil rules, and Hague apostille standards interact to protect
          your Indian properties:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_ITALY_SCENARIOS.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] border border-[#172228]/10 hover:border-[#C65378] hover:text-[#C65378]"
              }`}
            >
              {item.icon === "globe" && <Globe2 className="w-3.5 h-3.5" />}
              {item.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
              {item.icon === "building" && <Building2 className="w-3.5 h-3.5" />}
              {item.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Card Body */}
      <div className="rounded-[28px] bg-white border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                Statutory Succession Profile
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
                {activeScenario.heading}
              </h3>

              <div className="space-y-4 text-[14.5px] leading-[1.68] text-[#374151] mb-6">
                <div>
                  <strong className="text-[#111827] block mb-1">
                    The Legal Challenge:
                  </strong>
                  <p className="text-[#49585F]">
                    {activeScenario.challengeSummary}
                  </p>
                </div>

                <div>
                  <strong className="text-[#111827] block mb-1">
                    Statutory Solution:
                  </strong>
                  <p className="text-[#49585F]">
                    {activeScenario.legalMechanism}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#172228]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[#55636D]">Statutory Reference: </span>
                <span className="font-semibold text-[#111827]">
                  {activeScenario.statutoryPrecedent}
                </span>
              </div>
              <div>
                <span className="text-[#55636D]">Recommended Instrument: </span>
                <span className="font-semibold text-[#047857]">
                  {activeScenario.recommendedInstrument}
                </span>
              </div>
            </div>
          </div>

          {/* Right Checklist Box */}
          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-[22px] p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
                Mandatory Drafting Checklist
              </div>
              <ul className="space-y-3 text-[13.5px] text-[#374151] mb-6">
                {activeScenario.checklist.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Consult High Court Lawyer</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#FAF7F0] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] py-3 px-5 border border-[#172228]/15 transition-colors"
              >
                <span>Draft Online Indian Will</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-border Diagnostic Calculators Bar */}
      <div className="mt-8 rounded-2xl bg-white border border-[#172228]/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-[#C65378]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#111827] mb-1">
              Calculating Capital Gains or TDS on Inherited Property in India?
            </h4>
            <p className="text-xs sm:text-[13px] text-[#55636D]">
              Use our interactive calculators to compute capital gains tax,
              indexation relief, and Section 195 TDS on selling inherited assets.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/tools/capital-gains-tax-calculator-inherited-property"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
          >
            <span>Tax Calculator</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tools/nri-property-sale-tds-repatriation-calculator"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#C65378] hover:text-white px-4 py-2.5 rounded-full border border-[#172228]/15 transition-colors"
          >
            <span>TDS Repatriation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
