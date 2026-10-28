"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  Users2,
  Briefcase,
  Store,
  ShieldAlert,
  ShieldCheck,
  Scale,
} from "lucide-react";

interface EnterpriseScenario {
  id: string;
  label: string;
  icon: "building" | "users" | "briefcase" | "store" | "spreadsheet";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const ENTERPRISE_SCENARIOS: EnterpriseScenario[] = [
  {
    id: "pvt-ltd-equity",
    label: "Pvt Ltd Equity & Board Transmission",
    icon: "building",
    heading: "Pvt Ltd Equity & Board Seat Succession Protocol",
    challengeSummary:
      "When a majority promoter dies, company bank accounts and board meetings freeze. Surviving co-founders may refuse to register share transmission or grant directorship to heirs.",
    legalMechanism:
      "Under Section 56 of the Companies Act, 2013 and Table F Articles of Association (Regulations 23 to 27), shares transmit to testamentary heirs upon production of a probated Will or Succession Certificate. A well-aligned Shareholders Agreement (SHA) mandates board seat inheritance and contains clear pre-emption buy-sell protocols.",
    statutoryPrecedent:
      "Companies Act, 2013 s. 56 & Shakti Yezdani v. Jayanand Salgaonkar (2023 SC)",
    recommendedInstrument:
      "Harmonized Promoter Will + Restated AoA Table F Covenants + SHA Deed of Adherence",
    checklist: [
      "Review AoA transmission clauses against Section 56 statutory requirements",
      "Draft a Board Transmission Resolution template and Form SH-4 indemnity",
      "Insert compulsory tag-along and drag-along covenants in the SHA",
      "Ensure personal Will explicitly names specific equity lot numbers and demat folios",
    ],
  },
  {
    id: "family-constitution",
    label: "Family Constitution & Council",
    icon: "users",
    heading: "Family Constitution & Multi-Gen Council Charter",
    challengeSummary:
      "Multi-generational family businesses face destructive rivalries between working family members who manage operations and non-working branches seeking higher cash dividends.",
    legalMechanism:
      "A formal Family Constitution (Pariwarik Samvidhan) establishes a two-tier governance structure: a Family Council for strategic harmony and a Corporate Board for business execution. It defines employment eligibility, next-generation training, exit valuation formulas, and a mandatory private arbitration tribunal under the Arbitration and Conciliation Act, 1996.",
    statutoryPrecedent:
      "Indian Contract Act, 1872 & Indian Trusts Act, 1882 (Enforceability of Family Pacts)",
    recommendedInstrument:
      "Family Constitution & Charter + Family Council By-Laws + Voting Trust Deed",
    checklist: [
      "Establish qualifications and compensation rules for next-generation family members",
      "Draft clear dividend payout thresholds balancing reinvestment and branch income",
      "Define pre-agreed share buyout formulas to prevent hostile fire-sales",
      "Set up an independent advisory committee with external senior counsel",
    ],
  },
  {
    id: "partnership-firm",
    label: "Partnership Firm Section 42(c)",
    icon: "briefcase",
    heading: "Partnership Firm Dissolution Defense & Continuity",
    challengeSummary:
      "Under Section 42(c) of the Indian Partnership Act, 1932, a partnership firm automatically dissolves upon the death of any partner unless there is an express contrary agreement in the Partnership Deed.",
    legalMechanism:
      "We amend the Partnership Deed to insert a perpetual continuity clause under Section 42(c). This covenant states that the firm shall continue with surviving partners, while granting the deceased partner's designated legal heir either automatic admission as an active partner or full capital account settlement through Keyman insurance proceeds.",
    statutoryPrecedent:
      "Section 42(c), Indian Partnership Act, 1932 & CIT v. Seth Govindram Sugar Mills (SC)",
    recommendedInstrument:
      "Amended & Restated Partnership Deed + Complementary Testamentary Will",
    checklist: [
      "Verify that the existing partnership deed has an explicit Section 42(c) non-dissolution clause",
      "Define standard accounting valuation for capital accounts, goodwill, and work-in-progress",
      "Procure partnership Keyman Insurance to fund capital payouts without choking cash flow",
      "Execute heir admission protocols and fresh Form A filing before the Registrar of Firms",
    ],
  },
  {
    id: "llp-transmission",
    label: "LLP Management vs Economic Rights",
    icon: "spreadsheet",
    heading: "LLP Designated Partner Succession & Management",
    challengeSummary:
      "Under Section 24 of the LLP Act, 2008, death causes cessation of partnership. The legal heir receives financial profits but has zero statutory right to participate in LLP management or voting.",
    legalMechanism:
      "A standard LLP agreement locks heirs out of executive control. Our corporate advocates amend Schedule 1 of the LLP Agreement to provide pre-approved admission protocols. This enables qualified legal heirs to become Designated Partners and obtain Director Identification Numbers (DPIN) through MCA Form 4 filings within 30 days.",
    statutoryPrecedent:
      "Sections 24 and 25, Limited Liability Partnership Act, 2008",
    recommendedInstrument:
      "Supplementary LLP Agreement + Testamentary Will + MCA Form 3/4 Protocol",
    checklist: [
      "Structure transfer of both economic rights and Designated Partner managerial status",
      "Specify educational and operational criteria for heirs seeking board management seats",
      "Set up backup designated partners to prevent the LLP from falling below statutory minimums",
      "File MCA Form 3 and Form 4 within statutory 30-day timelines with registrar",
    ],
  },
  {
    id: "proprietorship-msme",
    label: "Proprietorship MSME & GST Continuity",
    icon: "store",
    heading: "MSME Sole Proprietorship Going-Concern Will",
    challengeSummary:
      "A sole proprietorship dies with the proprietor. PAN, bank accounts, MSME Udyam registration, and GSTIN are cancelled, leading to immediate operational stoppage and vendor contract cancellation.",
    legalMechanism:
      "Under GST Circular No. 96/15/2019-GST and Section 18(6) of the CGST Act, 2017, a sole proprietorship can be transferred as a going concern to a designated legal heir. Unutilized Input Tax Credit (ITC) transfers via Form GST ITC-02 upon production of a valid Will and legal heir documentation.",
    statutoryPrecedent:
      "CBIC Circular No. 96/15/2019-GST & Section 29(5) CGST Act, 2017",
    recommendedInstrument:
      "Testamentary Going-Concern Business Will + Pre-Incorporation OPC Conversion Plan",
    checklist: [
      "Include a specialized testamentary bequest specifying transfer of goodwill, licenses, and inventory",
      "Prepare Form GST ITC-02 documentation to preserve accumulated input tax credits",
      "Transfer MSME Udyam registration and trademark rights to the designated successor",
      "Evaluate pre-emptive conversion into a One Person Company (OPC) or Pvt Ltd company",
    ],
  },
];

export default function BusinessSuccessionInteractive() {
  const [activeTab, setActiveTab] = useState<string>("pvt-ltd-equity");

  const currentScenario =
    ENTERPRISE_SCENARIOS.find((item) => item.id === activeTab) ||
    ENTERPRISE_SCENARIOS[0];

  return (
    <section className="w-full my-12 sm:my-16">
      <div className="rounded-[28px] sm:rounded-[36px] bg-[#172228] text-[#FAF7F0] p-6 sm:p-10 lg:p-12 border border-white/10 shadow-[0_8px_32px_rgba(23,34,40,0.18)]">
        {/* Top Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
            <Scale className="w-4 h-4" />
            <span>Interactive Legal Architecture</span>
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
            Promoter Business Succession Diagnostic
          </h2>
          <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-white/80">
            Select your enterprise structure below to discover how Indian
            corporate laws, partnership covenants, and testamentary documents
            work together to prevent operational deadlock:
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          {ENTERPRISE_SCENARIOS.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#C65378] text-white shadow-sm"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {item.icon === "building" && <Building2 className="w-4 h-4" />}
                {item.icon === "users" && <Users2 className="w-4 h-4" />}
                {item.icon === "briefcase" && <Briefcase className="w-4 h-4" />}
                {item.icon === "spreadsheet" && (
                  <FileSpreadsheet className="w-4 h-4" />
                )}
                {item.icon === "store" && <Store className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Challenge & Statutory Mechanism */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2">
                Enterprise Diagnostic Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-4 leading-snug">
                {currentScenario.heading}
              </h3>
            </div>

            {/* Critical Trap Box */}
            <div className="rounded-2xl bg-red-950/30 border border-red-500/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-[0.12em] mb-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>The Unplanned Operational Risk</span>
              </div>
              <p className="text-[14px] sm:text-[14.5px] leading-[1.65] text-white/90">
                {currentScenario.challengeSummary}
              </p>
            </div>

            {/* Legal Solution */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[#C65378] text-xs font-bold uppercase tracking-[0.12em] mb-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Statutory Mechanism &amp; Precedent</span>
              </div>
              <p className="text-[14px] sm:text-[14.5px] leading-[1.65] text-white/90 mb-3">
                {currentScenario.legalMechanism}
              </p>
              <div className="pt-3 border-t border-white/10 text-xs text-white/60">
                <strong className="text-white/80">Key Authority:</strong>{" "}
                {currentScenario.statutoryPrecedent}
              </div>
            </div>
          </div>

          {/* Right Column: Instrument & Checklist */}
          <div className="lg:col-span-5 bg-white text-[#172228] rounded-[24px] p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
                Recommended Legal Instruments
              </div>
              <h4 className="text-base font-semibold text-[#111827] mb-4 leading-snug">
                {currentScenario.recommendedInstrument}
              </h4>

              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-3">
                Statutory Execution Checklist
              </div>
              <ul className="space-y-3 text-xs sm:text-[13px] text-[#374151] mb-6">
                {currentScenario.checklist.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#172228]/10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors text-center"
              >
                <span>Book Advocate Succession Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
