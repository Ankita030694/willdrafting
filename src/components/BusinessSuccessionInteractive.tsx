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
      "When a majority promoter dies, company bank accounts freeze. Board meetings halt. Co-founders may refuse to transfer shares or grant board seats to heirs.",
    legalMechanism:
      "Under Section 56 of the Companies Act, 2013 and Table F AoA (Regulations 23 to 27), shares pass to heirs upon proof of a Will. A clear Shareholders Agreement (SHA) protects board seats and sets fair share buyout rules.",
    statutoryPrecedent:
      "Companies Act, 2013 s. 56 & Shakti Yezdani v. Jayanand Salgaonkar (2023 SC)",
    recommendedInstrument:
      "Harmonized Promoter Will + Restated AoA Table F Covenants + SHA Deed of Adherence",
    checklist: [
      "Review AoA transmission terms against Section 56 rules",
      "Draft a Board Transmission Resolution and Form SH-4 indemnity",
      "Insert tag-along and drag-along covenants in the SHA",
      "Ensure the Will names exact equity shares and demat folios",
    ],
  },
  {
    id: "family-constitution",
    label: "Family Constitution & Council",
    icon: "users",
    heading: "Family Constitution & Multi-Gen Council Charter",
    challengeSummary:
      "Multi-generation family firms often suffer rivalries. Working heirs run daily operations, while non-working heirs seek bigger cash payouts.",
    legalMechanism:
      "A Family Constitution creates two bodies: a Family Council for harmony and a Corporate Board for business growth. It sets job rules, training paths, exit share valuations, and private arbitration under the Arbitration and Conciliation Act, 1996.",
    statutoryPrecedent:
      "Indian Contract Act, 1872 & Indian Trusts Act, 1882 (Enforceability of Family Pacts)",
    recommendedInstrument:
      "Family Constitution & Charter + Family Council By-Laws + Voting Trust Deed",
    checklist: [
      "Set job rules and pay rates for next-generation family members",
      "Draft clear dividend payout rules balancing growth and family income",
      "Define pre-agreed share buyout formulas to stop hostile sales",
      "Set up an independent advisory team with external senior counsel",
    ],
  },
  {
    id: "partnership-firm",
    label: "Partnership Firm Section 42(c)",
    icon: "briefcase",
    heading: "Partnership Firm Dissolution Defense & Continuity",
    challengeSummary:
      "Under Section 42(c) of the Indian Partnership Act, 1932, a firm ends when any partner dies. This happens unless the deed has a written agreement to continue.",
    legalMechanism:
      "We add a non-dissolution clause to the Partnership Deed under Section 42(c). The firm stays open with surviving partners. Heirs either join as partners or receive full capital payouts via Keyman insurance cash.",
    statutoryPrecedent:
      "Section 42(c), Indian Partnership Act, 1932 & CIT v. Seth Govindram Sugar Mills (SC)",
    recommendedInstrument:
      "Amended & Restated Partnership Deed + Complementary Testamentary Will",
    checklist: [
      "Verify that the deed has a Section 42(c) non-dissolution clause",
      "Define standard accounting rules for capital and work-in-progress",
      "Get partnership Keyman Insurance to fund capital payouts safely",
      "Execute heir entry terms and fresh Form A filing with the Registrar",
    ],
  },
  {
    id: "llp-transmission",
    label: "LLP Management vs Economic Rights",
    icon: "spreadsheet",
    heading: "LLP Designated Partner Succession & Management",
    challengeSummary:
      "Under Section 24 of the LLP Act, 2008, partner death ends partnership rights. Heirs receive financial profits. But they have no legal right to manage or vote in the LLP.",
    legalMechanism:
      "Standard LLP deeds lock heirs out of management. We amend Schedule 1 of the LLP Agreement with pre-approved entry rules. Heirs become Designated Partners and obtain DPINs via MCA Form 4 within 30 days.",
    statutoryPrecedent:
      "Sections 24 and 25, Limited Liability Partnership Act, 2008",
    recommendedInstrument:
      "Supplementary LLP Agreement + Testamentary Will + MCA Form 3/4 Protocol",
    checklist: [
      "Structure transfer of both economic profits and partner voting status",
      "Specify educational and work criteria for heirs seeking board seats",
      "Set up backup designated partners to meet statutory minimums",
      "File MCA Form 3 and Form 4 within statutory 30-day timelines",
    ],
  },
  {
    id: "proprietorship-msme",
    label: "Proprietorship MSME & GST Continuity",
    icon: "store",
    heading: "MSME Sole Proprietorship Going-Concern Will",
    challengeSummary:
      "A sole proprietorship closes when the owner dies. The PAN, bank accounts, and GSTIN are cancelled. This halts operations and cancels vendor contracts.",
    legalMechanism:
      "Under GST Circular 96/15/2019-GST and Section 18(6) of the CGST Act, 2017, a sole proprietorship can pass as a going concern. Unused tax credits transfer via Form GST ITC-02 with a valid Will and heir papers.",
    statutoryPrecedent:
      "CBIC Circular No. 96/15/2019-GST & Section 29(5) CGST Act, 2017",
    recommendedInstrument:
      "Testamentary Going-Concern Business Will + Pre-Incorporation OPC Conversion Plan",
    checklist: [
      "Include a Will bequest passing goodwill, trade licenses, and stock",
      "Prepare Form GST ITC-02 paperwork to keep input tax credits",
      "Transfer MSME Udyam registration and brand trademarks to heirs",
      "Plan early conversion into a One Person Company (OPC) or Pvt Ltd",
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
          <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3">
            Promoter Business Succession Diagnostic
          </h3>
          <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-white/80">
            Pick your business form below. See how corporate laws, deeds, and
            Wills work together to keep your company running without delays:
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
