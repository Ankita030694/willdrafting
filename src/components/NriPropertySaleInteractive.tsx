"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Globe2,
  Banknote,
  SendHorizontal,
} from "lucide-react";

interface StageInfo {
  number: string;
  shortTitle: string;
  title: string;
  statutoryAuthority: string;
  advocateScope: string;
  criticalTrapAvoided: string;
  documentsRequired: string[];
}

const FIVE_STAGES: StageInfo[] = [
  {
    number: "01",
    shortTitle: "Heirship & Probate",
    title: "Stage 1: Legal Heirship, Probate & Succession Regularization",
    statutoryAuthority:
      "Indian Succession Act, 1925 (ss. 213, 218, 232) & State Revenue Codes",
    advocateScope:
      "We examine parent title deeds. We file court probate in Mumbai, Chennai, or Kolkata. For intestate land, we get legal heir certificates. We also draft and register relinquishment deeds from other heirs.",
    criticalTrapAvoided:
      "Selling before proving full legal ownership. Incomplete papers lead to court stays from excluded relatives and lost buyer deposits.",
    documentsRequired: [
      "Original registered Sale Deed of deceased parent",
      "Death Certificate issued by municipal corporation",
      "Registered Will (if any) or family tree affidavit",
      "KYC & passport copies of all surviving legal heirs",
    ],
  },
  {
    number: "02",
    shortTitle: "Municipal Mutation",
    title: "Stage 2: Municipal Mutation & Housing Society Transmission",
    statutoryAuthority:
      "State Municipal Corporation Acts (MCD, BMC, BBMP, GHMC) & Society Acts",
    advocateScope:
      "Our team files mutation papers with municipal land offices. We update property tax records. We secure Khata certificates and housing society share transfers with written society clearance.",
    criticalTrapAvoided:
      "Selling property while tax bills remain in late parents' names. Registrars and buyer banks reject deeds without updated mutation records.",
    documentsRequired: [
      "Probate order, Succession Certificate, or Legal Heir Certificate",
      "All up-to-date paid property tax receipts",
      "Housing Society Share Certificate & NOC application",
      "No-due certificates from local water and electricity boards",
    ],
  },
  {
    number: "03",
    shortTitle: "Sale Deed & PoA",
    title: "Stage 3: Agreement to Sell, Apostilled PoA & SRO Registration",
    statutoryAuthority:
      "Registration Act, 1908 (s. 17), Powers of Attorney Act, 1882 & Stamp Act",
    advocateScope:
      "We draft custom sale contracts with safe FEMA clauses. We prepare apostilled powers of attorney so you do not need to travel. We pay local stamp duty and register the sale deed.",
    criticalTrapAvoided:
      "Using generic online forms that Sub-Registrars reject under the Stamp Act. Never let buyers pay money into resident bank accounts.",
    documentsRequired: [
      "Apostilled / Consulate-attested Specific Power of Attorney",
      "Adjudication certificate from local Collector of Stamps",
      "Draft Agreement to Sell with FEMA repatriation clauses",
      "PAN Card and Overseas Passport copies of NRI seller",
    ],
  },
  {
    number: "04",
    shortTitle: "Sec 197 Lower TDS",
    title: "Stage 4: Section 197 Form 13 Lower TDS Certificate",
    statutoryAuthority:
      "Income Tax Act, 1961 (ss. 49, 195, 197) & Finance (No. 2) Act, 2024",
    advocateScope:
      "Our Chartered Accountants file Form 13 with the tax department. We calculate your original cost under Section 49. We apply Section 54 tax exemptions and secure a Lower TDS order.",
    criticalTrapAvoided:
      "Letting the buyer cut 20% to 23.92% tax on the entire sale price. Without Form 13, tens of lakhs stay frozen with the tax office for years.",
    documentsRequired: [
      "Registered Agreement to Sell with buyer details",
      "Proof of cost of acquisition to previous owner (1980–2001 or later)",
      "Registered valuation report as of April 1, 2001 (if bought before 2001)",
      "Section 54EC capital gains bond commitment or reinvestment proof",
    ],
  },
  {
    number: "05",
    shortTitle: "FEMA 15CA/15CB Wire",
    title: "Stage 5: Form 15CA/15CB & USD 1 Million LRS Remittance",
    statutoryAuthority:
      "FEMA (Remittance of Assets) Regulations, 2016 & Income Tax Act s. 195(6)",
    advocateScope:
      "We place sale proceeds into your NRO bank account. Our Chartered Accountant signs Form 15CB. We file Form 15CA online and help your bank wire funds abroad under the USD 1 Million quota.",
    criticalTrapAvoided:
      "Banks halting wire transfers due to document mismatches. Our combined legal and tax review guarantees smooth bank clearance.",
    documentsRequired: [
      "Form 15CB certified by our practicing Chartered Accountant",
      "Form 15CA online filing acknowledgement receipt",
      "Registered Sale Deed & Section 197 Lower TDS certificate",
      "Form A2 and FEMA declaration submitted to AD Category-I Bank",
    ],
  },
];

export default function NriPropertySaleInteractive() {
  const [activeTab, setActiveTab] = useState<"protocol" | "calculator">(
    "protocol"
  );
  const [activeStage, setActiveStage] = useState(0);

  // Calculator State
  const [salePriceCr, setSalePriceCr] = useState<number>(2.5); // ₹2.5 Cr
  const [costPriceCr, setCostPriceCr] = useState<number>(0.5); // ₹50 Lakhs
  const [exemptionsLakhs, setExemptionsLakhs] = useState<number>(50); // ₹50L in 54EC / Sec 54

  // Calculations
  const grossSaleValue = salePriceCr * 10000000;
  const originalCost = costPriceCr * 10000000;
  const exemptionAmount = exemptionsLakhs * 100000;

  // Capital gain calculation
  const rawCapitalGain = Math.max(0, grossSaleValue - originalCost);
  const taxableGain = Math.max(0, rawCapitalGain - exemptionAmount);

  // Default TDS under Section 195
  const defaultTdsRate = grossSaleValue > 20000000 ? 0.2392 : 0.208;
  const defaultTdsDeducted = Math.round(grossSaleValue * defaultTdsRate);

  // With Form 13 Lower TDS
  const lowerTdsRate = 0.13;
  const actualTdsWithForm13 = Math.round(taxableGain * lowerTdsRate);

  // Cash flow saved
  const cashSaved = Math.max(0, defaultTdsDeducted - actualTdsWithForm13);
  const netProceeds = grossSaleValue - actualTdsWithForm13;
  const netProceedsUSD = Math.round(netProceeds / 87.5);

  const currentStage = FIVE_STAGES[activeStage];

  return (
    <div className="w-full my-12 rounded-[32px] bg-white border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* Component Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#172228]/10">
        <div>
          <div className="inline-flex items-center gap-2 text-[#C65378] text-xs font-bold uppercase tracking-[0.16em] mb-2">
            <Globe2 className="w-4 h-4" />
            <span>Interactive NRI Wealth Advisory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[#111827]">
            Interactive NRI Property Sale &amp; Repatriation Navigator
          </h2>
          <p className="text-xs sm:text-[13.5px] text-[#55636D] mt-1 max-w-2xl">
            Explore our 5-stage legal protocol or calculate how much cash flow you
            save from being frozen with Form 13 Lower TDS.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 bg-[#FAF7F0] rounded-full border border-[#172228]/10 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("protocol")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "protocol"
                ? "bg-[#172228] text-white shadow-xs"
                : "text-[#55636D] hover:text-[#172228]"
            }`}
          >
            5-Stage Roadmap
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "calculator"
                ? "bg-[#C65378] text-white shadow-xs"
                : "text-[#55636D] hover:text-[#172228]"
            }`}
          >
            TDS &amp; Cash Flow Estimator
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: 5-STAGE ROADMAP PROTOCOL
          ========================================================================= */}
      {activeTab === "protocol" && (
        <div>
          {/* Stage Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {FIVE_STAGES.map((s, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FAF7F0] border-[#C65378] shadow-xs"
                      : "bg-white border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isSelected ? "text-[#C65378]" : "text-[#55636D]"
                      }`}
                    >
                      Stage {s.number}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C65378]" />
                    )}
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-[#111827] line-clamp-1">
                    {s.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Card */}
          <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 mb-6 border-b border-[#172228]/10">
              <div>
                <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-[#C65378] mb-1">
                  Active Protocol Checkpoint {currentStage.number} / 05
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] leading-snug">
                  {currentStage.title}
                </h3>
                <div className="text-xs font-medium text-[#55636D] mt-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                  <span>Governing Law: {currentStage.statutoryAuthority}</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] bg-[#172228] hover:bg-[#C65378] text-white px-5 py-2.5 rounded-full transition-colors self-start shrink-0"
              >
                <span>Engage for Stage {currentStage.number}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Scope & Legal Traps */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-2">
                    Scope Handled by Our Advocate + CA Team:
                  </h4>
                  <p className="text-sm sm:text-[14.5px] leading-[1.7] text-[#374151]">
                    {currentStage.advocateScope}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200/80">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                        Critical Risk Avoided for NRIs:
                      </h4>
                      <p className="text-xs sm:text-[13px] text-amber-950 leading-relaxed">
                        {currentStage.criticalTrapAvoided}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Required Documents Checklist */}
              <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-[#172228]/10">
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#C65378]" />
                  <span>Mandatory Documents Checklist:</span>
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
                  {currentStage.documentsRequired.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: TDS & REPATRIATION ESTIMATOR
          ========================================================================= */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#172228]/10 space-y-5">
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65378]">
                Adjust Valuation &amp; Exemption Sliders
              </div>

              {/* Sale Price Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#111827] mb-2">
                  <span>Gross Sale Consideration</span>
                  <span className="font-mono text-sm text-[#C65378]">
                    ₹{salePriceCr.toFixed(2)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.25"
                  value={salePriceCr}
                  onChange={(e) => setSalePriceCr(parseFloat(e.target.value))}
                  className="w-full accent-[#C65378] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#55636D] mt-1">
                  <span>₹50 Lakhs</span>
                  <span>₹5 Crore</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* Cost of Acquisition */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#111827] mb-2">
                  <span>Estimated Cost to Parent (FMV as of 2001)</span>
                  <span className="font-mono text-sm text-[#047857]">
                    ₹{costPriceCr.toFixed(2)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max={Math.min(salePriceCr - 0.1, 4.0)}
                  step="0.1"
                  value={costPriceCr}
                  onChange={(e) => setCostPriceCr(parseFloat(e.target.value))}
                  className="w-full accent-[#047857] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#55636D] mt-1">
                  <span>₹10 Lakhs</span>
                  <span>₹2 Crore</span>
                  <span>₹4 Crore</span>
                </div>
              </div>

              {/* Section 54 / 54EC Reinvestment */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#111827] mb-2">
                  <span>Section 54EC Bonds or Section 54 Exemption</span>
                  <span className="font-mono text-sm text-[#172228]">
                    ₹{exemptionsLakhs} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={exemptionsLakhs}
                  onChange={(e) => setExemptionsLakhs(parseInt(e.target.value))}
                  className="w-full accent-[#172228] cursor-pointer"
                />
                <p className="text-[11px] text-[#55636D] mt-1">
                  * Section 54EC allows investment up to ₹50 Lakhs in REC / NHAI
                  capital gain bonds within 6 months.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-2.5">
              <Banknote className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <span>
                <strong>Why Form 13 matters:</strong> The law makes buyers cut
                20% tax on the full price if you lack a Lower TDS order. Form 13
                restricts tax strictly to your real net gain.
              </span>
            </div>
          </div>

          {/* Results Comparison Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#172228] text-white p-6 sm:p-7 rounded-2xl shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider text-[#C65378] font-bold font-mono">
                  Comparative Cash Flow Outcome
                </span>
                <span className="text-[11px] text-gray-400">Section 195 vs 197</span>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-red-300 font-medium mb-1">
                    Without Form 13 (Sec 195)
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-red-400">
                    ₹{(defaultTdsDeducted / 100000).toFixed(1)} Lakhs
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Frozen TDS on gross consideration
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-[#34D399]/30 bg-[#047857]/10">
                  <div className="text-[11px] text-[#34D399] font-medium mb-1">
                    With Form 13 Certificate
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-[#34D399]">
                    ₹{(actualTdsWithForm13 / 100000).toFixed(1)} Lakhs
                  </div>
                  <div className="text-[11px] text-gray-300 mt-1">
                    TDS only on net capital gain
                  </div>
                </div>
              </div>

              {/* Big Highlight Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#C65378]/20 to-transparent border border-[#C65378]/40">
                <div className="text-xs font-bold text-[#F4EFE6] uppercase tracking-wider mb-1">
                  Cash Flow Saved From Multi-Year IT Freeze:
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1.5">
                  ₹{(cashSaved / 100000).toFixed(2)} Lakhs
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  This money stays in your hands upon registration instead of
                  getting trapped with the Indian Income Tax Department.
                </p>
              </div>

              {/* Repatriation Summary */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-gray-400">
                  Net Repatriable to Overseas Bank:
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{(netProceeds / 10000000).toFixed(2)} Cr (~${netProceedsUSD.toLocaleString()}{" "}
                  USD)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-3.5 transition-colors text-center"
              >
                <span>Hire Legal + CA Team for Form 13</span>
                <SendHorizontal className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/nri-property-sale-tds-repatriation-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-[#172228]/15 hover:border-[#C65378] bg-[#FAF7F0] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-colors text-center"
              >
                <span>Full Repatriation Tool</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
