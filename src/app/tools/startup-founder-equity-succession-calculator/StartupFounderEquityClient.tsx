"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Building2,
  Lock,
  PhoneCall,
  Sparkles,
  FileCheck,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  PieChart,
  Clock,
  TrendingUp,
  GitBranch,
  Check,
  Info,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Founder Equity Succession" },
  { id: "interactive-calculator", label: "2. Free Cap Table & ESOP Vesting Simulator" },
  { id: "reverse-vesting-mechanics", label: "3. Reverse Vesting: Cliff vs Death Acceleration" },
  { id: "nominee-vs-legal-heir", label: "4. Nominee vs Legal Heir: Shakti Yezdani Rule" },
  { id: "transmission-section-56", label: "5. Transmission of Shares: Section 56 Protocols" },
  { id: "cap-table-deadlocks", label: "6. Cap Table Deadlock: Co-Founder Protections" },
  { id: "comparative-analysis", label: "7. Legal Comparison: Founder Succession Frameworks" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Founder Equity Transmission" },
  { id: "startup-case-studies", label: "9. Real-World Case Studies: Bengaluru, Gurugram" },
  { id: "legal-clauses-templates", label: "10. Founder Succession Legal Clauses & Drafting" },
  { id: "institutional-profile", label: "11. Institutional Profile: Corporate Succession" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Founder Equity" },
  { id: "statutory-citations", label: "13. Statutory Citations & Regulatory Portals" },
];

const FAQS = [
  {
    q: "What happens to unvested founder shares if a co-founder passes away?",
    a: "Your founder contract decides what happens. Under basic reverse vesting, unvested shares return to the company at face value. If your contract has an early death vesting clause, 50% to 100% of those shares vest fast. They pass straight to your family estate.",
  },
  {
    q: "Does a nominee under Form SH-13 become the absolute owner of startup shares?",
    a: "No. The Supreme Court settled this in the Shakti Yezdani case in 2023. A nominee is just a trustee. They hold the shares for the real heirs. Only a valid Will decides who owns the shares.",
  },
  {
    q: "What happens to founder ESOPs upon death under Indian law?",
    a: "Under SEBI rules, all granted stock options vest right away upon death. For private startups, the company ESOP plan sets the rule. A good ESOP scheme gives immediate vesting to the heirs.",
  },
  {
    q: "Can surviving co-founders get locked out if a founder dies without a Will?",
    a: "Yes. If a founder dies without a Will, shares freeze for 12 to 24 months. Heirs must get a court grant. During this time, the board cannot pass big resolutions or close new funding rounds.",
  },
  {
    q: "How does transmission of private company shares work under Section 56?",
    a: "Transmission happens by law when a member dies. No stamp duty is due. The heir gives a death slip, KYC papers, and a valid Will to the board. The board must approve the change within 60 days.",
  },
  {
    q: "Can a founder bequeath private limited shares to someone outside the family in a Will?",
    a: "Yes. Under Section 30 of the Indian Succession Act, you can leave your shares to anyone in a Will. But company rules may give other founders the first right to buy those shares at fair price.",
  },
  {
    q: "What is the difference between share transfer and share transmission?",
    a: "A share transfer is a sale or gift during life. It needs a transfer deed and stamp duty. Share transmission happens by law after death. It needs no transfer deed and zero stamp duty.",
  },
  {
    q: "How can startup co-founders fund a post-death equity buyout?",
    a: "Founders use a buy-sell contract funded by keyman life insurance. When a founder dies, insurance pays tax-free cash to the surviving founder. That cash buys out the shares from the family at fair value.",
  },
];

export default function StartupFounderEquityClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  // Interactive Simulator State
  const [totalEquityPercent, setTotalEquityPercent] = useState<number>(28);
  const [valuationCr, setValuationCr] = useState<number>(25);
  const [totalSharesCount, setTotalSharesCount] = useState<number>(1000000);
  const [vestingMonths, setVestingMonths] = useState<number>(48);
  const [cliffMonths, setCliffMonths] = useState<number>(12);
  const [tenureServedMonths, setTenureServedMonths] = useState<number>(18);
  const [accelerationMode, setAccelerationMode] = useState<"full" | "twelve_months" | "none">("twelve_months");

  // Governance Checklist State
  const [hasWill, setHasWill] = useState<boolean>(false);
  const [hasFormSH13, setHasFormSH13] = useState<boolean>(true);
  const [hasCrossPurchaseSHA, setHasCrossPurchaseSHA] = useState<boolean>(false);
  const [hasKeymanInsurance, setHasKeymanInsurance] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Calculation Engine
  const calculations = useMemo(() => {
    const founderTotalShares = (totalEquityPercent / 100) * totalSharesCount;
    const valuePerShare = (valuationCr * 10000000) / totalSharesCount;
    const founderTotalValue = (totalEquityPercent / 100) * valuationCr;

    // Check Cliff
    let baseVestedRatio = 0;
    if (tenureServedMonths >= cliffMonths) {
      baseVestedRatio = Math.min(1, tenureServedMonths / vestingMonths);
    } else {
      baseVestedRatio = 0;
    }

    let unvestedRatio = 1 - baseVestedRatio;
    let acceleratedRatio = 0;

    if (accelerationMode === "full") {
      acceleratedRatio = unvestedRatio;
    } else if (accelerationMode === "twelve_months") {
      const extraRatio = 12 / vestingMonths;
      acceleratedRatio = Math.min(unvestedRatio, extraRatio);
    } else {
      acceleratedRatio = 0;
    }

    const totalEstateRatio = Math.min(1, baseVestedRatio + acceleratedRatio);
    const forfeitedRatio = Math.max(0, 1 - totalEstateRatio);

    const estateShares = Math.round(founderTotalShares * totalEstateRatio);
    const estateEquityPercent = Number((totalEquityPercent * totalEstateRatio).toFixed(2));
    const estateValueCr = Number((founderTotalValue * totalEstateRatio).toFixed(2));

    const forfeitedShares = Math.round(founderTotalShares * forfeitedRatio);
    const forfeitedEquityPercent = Number((totalEquityPercent * forfeitedRatio).toFixed(2));
    const forfeitedValueCr = Number((founderTotalValue * forfeitedRatio).toFixed(2));

    const survivingFoundersEquityPercent = Number((100 - totalEquityPercent).toFixed(2));
    const survivingAfterClawbackPercent = Number((survivingFoundersEquityPercent + forfeitedEquityPercent).toFixed(2));

    // Risk Meter Evaluation
    let riskScore = 15;
    if (!hasWill) riskScore += 35;
    if (!hasFormSH13) riskScore += 20;
    if (!hasCrossPurchaseSHA) riskScore += 20;
    if (!hasKeymanInsurance) riskScore += 10;
    riskScore = Math.min(100, riskScore);

    return {
      founderTotalShares,
      valuePerShare,
      founderTotalValue,
      baseVestedPercent: Number((totalEquityPercent * baseVestedRatio).toFixed(2)),
      acceleratedPercent: Number((totalEquityPercent * acceleratedRatio).toFixed(2)),
      estateShares,
      estateEquityPercent,
      estateValueCr,
      forfeitedShares,
      forfeitedEquityPercent,
      forfeitedValueCr,
      survivingAfterClawbackPercent,
      riskScore,
    };
  }, [
    totalEquityPercent,
    valuationCr,
    totalSharesCount,
    vestingMonths,
    cliffMonths,
    tenureServedMonths,
    accelerationMode,
    hasWill,
    hasFormSH13,
    hasCrossPurchaseSHA,
    hasKeymanInsurance,
  ]);

  const handleCopySummary = () => {
    const text = `WillDrafting.in Startup Founder Equity Succession Summary:
- Total Founder Equity: ${totalEquityPercent}% (${calculations.founderTotalShares.toLocaleString()} shares)
- Company Valuation: ₹${valuationCr} Crores
- Tenure Completed: ${tenureServedMonths} of ${vestingMonths} months (Cliff: ${cliffMonths} months)
- Acceleration Trigger: ${accelerationMode === "full" ? "100% Full Acceleration" : accelerationMode === "twelve_months" ? "+12 Months Acceleration" : "No Acceleration (Forfeiture)"}
- Vested Equity to Estate: ${calculations.estateEquityPercent}% (₹${calculations.estateValueCr} Cr)
- Unvested Forfeited Equity: ${calculations.forfeitedEquityPercent}% (₹${calculations.forfeitedValueCr} Cr)
- Cap Table Deadlock Risk: ${calculations.riskScore}%
- Next Steps: Execute a Registered Founder Will and SHA Cross-Purchase Clause under Companies Act 2013 ss. 56 & 72.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleCopyClause = () => {
    const clauseText = `CLAUSE: DEATH AND DISABILITY EQUITY ACCELERATION (FOUNDER SUCCESSION)
"In the event of the demise or permanent total disability of the Founder prior to the completion of the Reverse Vesting Period, notwithstanding anything contained in this Agreement or the Articles of Association, [One Hundred Percent (100%) / an additional Twelve (12) Months] of the unvested Founder Shares shall immediately and automatically accelerate and become fully vested equity. 

The Company and the Surviving Founders shall cause the Board of Directors to pass a formal transmission resolution within thirty (30) days under Section 56 of the Companies Act, 2013, registering the duly designated Nominee or Legal Heir (as evidenced by a probated Last Will and Testament or Succession Certificate) as the absolute beneficial owner of such Vested Shares in the Register of Members (Form MGT-1)."`;

    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>COMPANIES ACT, 2013 • SECTIONS 56, 72 &amp; SEBI SBEB 2021</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, strictly 1 H1 on page, zero em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Startup Founder Equity Succession Calculator India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your vested shares and unvested equity clawbacks. See how your shares pass under the Companies Act 2013. Protect your co-founders from voting deadlocks.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Cap Table Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Founder Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 72 CA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NOMINEE IS TRUSTEE, NOT OWNER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 56</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                AUTOMATIC SHARE TRANSMISSION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SEBI Reg 9(11)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                IMMEDIATE ESOP DEATH VESTING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Deadlock</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WILL &amp; BUY-SELL SHA PROTECTIONS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Corporate Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 56 and 72 of the Companies Act 2013 and SEBI rules. Backed by Supreme Court rulings in Shakti Yezdani and Aruna Oswal.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: FOUNDER EQUITY SUCCESSION IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vested vs Unvested Shares:</strong> Vested shares belong to your estate. They pass to your family. Unvested shares return to the company unless your contract gives quick vesting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee Myth Busted:</strong> A nominee is not the real owner. In 2023, the Supreme Court ruled that a nominee is just a trustee. Only a signed Will gives full title to your family.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Co-Founder Lockout Danger:</strong> Without a buyback clause and a Will, shares freeze in court for two years. Co-founders cannot raise funds. The company can freeze up.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL OG ASSET EMBED */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/startup-founder-equity-succession-calculator-og.jpg"
                  alt="Startup Founder Equity Succession Calculator and Cap Table Tool"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white pointer-events-none">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#C65378] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
                    Founder Succession Architecture
                  </span>
                  <div className="text-sm sm:text-lg font-bold">
                    Indian Startup Co-Founders Reviewing Cap Table Transmission &amp; Vesting Continuity
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>
                    Governed under Companies Act, 2013 ss. 56 &amp; 72 and SEBI (SBEB) Regulations 2021.
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                  Tool Slug: startup-founder-equity-succession-calculator
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY ONE H2 TAG ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: Founder Equity Transmission in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Founding a startup takes hard work. You build products and raise funds. Yet most founders forget about share succession. When a founder dies, their shares face company law, family law, and private shareholder rules.
                </p>
                <p>
                  Private company shares are personal movable assets. Under Section 44 of the Companies Act 2013, shares pass as set by the company rules. When a member dies, their shares pass by transmission under Section 56 of the Act. No stamp duty is paid on this transfer.
                </p>
                <p>
                  Still, transmission is not instant. Without a clear Will, shares freeze in court for one to two years. Family members may ask for board seats or block investor votes. This can stop company work in its tracks.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Cap Table &amp; ESOP Vesting Simulator Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Set your founder share, vesting period, and company valuation below. See what passes to your family and what goes back to the firm if you pass away early.
              </p>

              {/* Calculator Main Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Founder Equity */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900 uppercase">
                      <span>Founder Equity Share (%)</span>
                      <span className="text-[#C65378] font-black text-sm">{totalEquityPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={70}
                      step={1}
                      value={totalEquityPercent}
                      aria-label="Founder Equity Share Percentage"
                      onChange={(e) => setTotalEquityPercent(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>5% (Seed)</span>
                      <span>28% (Typical Co-founder)</span>
                      <span>70% (Solo Founder)</span>
                    </div>
                  </div>

                  {/* Company Valuation */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900 uppercase">
                      <span>Company Valuation (₹ Crores)</span>
                      <span className="text-[#C65378] font-black text-sm">₹{valuationCr} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={200}
                      step={1}
                      value={valuationCr}
                      aria-label="Company Valuation in Crores"
                      onChange={(e) => setValuationCr(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>₹1 Cr (Early Bootstrapped)</span>
                      <span>₹25 Cr (Pre-Series A)</span>
                      <span>₹200 Cr (Growth Stage)</span>
                    </div>
                  </div>

                  {/* Tenure Completed */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900 uppercase">
                      <span>Tenure Served at Demise</span>
                      <span className="text-slate-900 font-extrabold text-sm">{tenureServedMonths} Months</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={48}
                      step={1}
                      value={tenureServedMonths}
                      aria-label="Tenure Served at Demise in Months"
                      onChange={(e) => setTenureServedMonths(Number(e.target.value))}
                      className="w-full accent-slate-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>1 Mo</span>
                      <span className="text-amber-700 font-bold">12 Mo (Cliff)</span>
                      <span>24 Mo</span>
                      <span>48 Mo (Full)</span>
                    </div>
                  </div>

                  {/* Reverse Vesting Schedule Setting */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-900 uppercase">
                      Vesting &amp; Cliff Term
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={vestingMonths}
                        onChange={(e) => setVestingMonths(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 focus:outline-none focus:border-[#C65378]"
                      >
                        <option value={48}>4-Year Plan (48 Mo)</option>
                        <option value={36}>3-Year Plan (36 Mo)</option>
                        <option value={60}>5-Year Plan (60 Mo)</option>
                      </select>
                      <select
                        value={cliffMonths}
                        onChange={(e) => setCliffMonths(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 focus:outline-none focus:border-[#C65378]"
                      >
                        <option value={12}>1-Year Cliff (12 Mo)</option>
                        <option value={6}>6-Month Cliff (6 Mo)</option>
                        <option value={0}>0-Month Cliff (None)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SHA Death Acceleration Clause Option */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#C65378]" />
                    <span>Contract Death Vesting Clause</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setAccelerationMode("twelve_months")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        accelerationMode === "twelve_months"
                          ? "border-[#C65378] bg-rose-50/70 shadow-xs"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">+12 Months Credit</div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Adds 1 extra year of vesting to your estate.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccelerationMode("full")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        accelerationMode === "full"
                          ? "border-[#C65378] bg-rose-50/70 shadow-xs"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">100% Full Vesting</div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        All unvested shares vest right away upon death.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccelerationMode("none")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        accelerationMode === "none"
                          ? "border-[#C65378] bg-rose-50/70 shadow-xs"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">Strict Return</div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Unvested shares return to the firm at par value.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Governance Readiness Toggles */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Succession Checklist (Check Your Risk)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={hasWill}
                        onChange={(e) => setHasWill(e.target.checked)}
                        className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Founder Will Signed</div>
                        <div className="text-[11px] text-slate-500">Stops long court grant delays</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={hasFormSH13}
                        onChange={(e) => setHasFormSH13(e.target.checked)}
                        className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Form SH-13 Nominee Filed</div>
                        <div className="text-[11px] text-slate-500">Gives quick trustee entry under s. 72</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={hasCrossPurchaseSHA}
                        onChange={(e) => setHasCrossPurchaseSHA(e.target.checked)}
                        className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Buy-Sell Clause in Place</div>
                        <div className="text-[11px] text-slate-500">Gives other founders the right to buy shares</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={hasKeymanInsurance}
                        onChange={(e) => setHasKeymanInsurance(e.target.checked)}
                        className="w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Keyman Insurance Policy</div>
                        <div className="text-[11px] text-slate-500">Gives ready cash to pay heirs fair value</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* RESULTS DASHBOARD */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-7 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-widest">
                        SIMULATION REPORT
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white">
                        Founder Equity Distribution &amp; Deadlock Audit
                      </div>
                    </div>
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                    >
                      {copiedSummary ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSummary ? "Copied!" : "Copy Report"}</span>
                    </button>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Vested to Estate */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] uppercase font-bold text-emerald-400">
                        Vested to Founder Estate
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {calculations.estateEquityPercent}%
                      </div>
                      <div className="text-xs text-white/70">
                        ₹{calculations.estateValueCr} Cr ({calculations.estateShares.toLocaleString()} shares)
                      </div>
                    </div>

                    {/* Card 2: Forfeited / Repurchased */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] uppercase font-bold text-rose-300">
                        Returned to Company
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {calculations.forfeitedEquityPercent}%
                      </div>
                      <div className="text-xs text-white/70">
                        ₹{calculations.forfeitedValueCr} Cr ({calculations.forfeitedShares.toLocaleString()} shares)
                      </div>
                    </div>

                    {/* Card 3: Deadlock Risk Level */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] uppercase font-bold text-amber-300">
                        Voting Deadlock Risk
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {calculations.riskScore}%
                      </div>
                      <div className="text-xs text-white/70">
                        {calculations.riskScore > 60
                          ? "High Risk (Freeze Hazard)"
                          : calculations.riskScore > 30
                          ? "Medium Risk (Delay Hazard)"
                          : "Low Risk (Safe & Smooth)"}
                      </div>
                    </div>
                  </div>

                  {/* Visual Cap Table Distribution Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-white/80">
                      <span>Post-Event Share Split</span>
                      <span>100% Total Company Shares</span>
                    </div>
                    <div className="w-full h-5 rounded-full overflow-hidden flex bg-white/10 p-0.5">
                      <div
                        style={{ width: `${calculations.survivingAfterClawbackPercent}%` }}
                        className="h-full bg-slate-400 rounded-l-full transition-all"
                        title={`Surviving Shareholders: ${calculations.survivingAfterClawbackPercent}%`}
                      />
                      <div
                        style={{ width: `${calculations.estateEquityPercent}%` }}
                        className="h-full bg-[#C65378] transition-all"
                        title={`Deceased Founder Estate: ${calculations.estateEquityPercent}%`}
                      />
                      {calculations.forfeitedEquityPercent > 0 && (
                        <div
                          style={{ width: `${calculations.forfeitedEquityPercent}%` }}
                          className="h-full bg-emerald-500 rounded-r-full transition-all"
                          title={`Returned Shares: ${calculations.forfeitedEquityPercent}%`}
                        />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/70 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                        <span>Other Founders &amp; VCs ({calculations.survivingAfterClawbackPercent}%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C65378]" />
                        <span>Deceased Founder Estate ({calculations.estateEquityPercent}%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>Returned to Pool ({calculations.forfeitedEquityPercent}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Analysis & Actionable Advisory */}
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-xs space-y-2">
                    <div className="font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Legal Risk Diagnosis for Your Cap Table</span>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {!hasWill && !hasCrossPurchaseSHA ? (
                        <>
                          <strong>High Danger:</strong> Without a Will, your {calculations.estateEquityPercent}% vested
                          shares freeze up. Your family must get a court grant. This takes over one year. Co-founders
                          cannot pass special votes. New funding rounds will stop.
                        </>
                      ) : !hasCrossPurchaseSHA ? (
                        <>
                          <strong>Contract Gap:</strong> Your Will names who gets your shares. But surviving founders
                          have no clear right to buy them back. Outside family members will hold {calculations.estateEquityPercent}%
                          of the vote.
                        </>
                      ) : (
                        <>
                          <strong>Clean Structure:</strong> Your shares and cap table are safe. Shares pass fast under
                          Section 56. Other founders hold an easy path to buy the shares and keep moving.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Protect Your Cap Table: Draft Founder Will Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: REVERSE VESTING MECHANICS */}
            <section id="reverse-vesting-mechanics" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>EQUITY CLIFFS &amp; ACCELERATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Reverse Vesting: Cliff Vesting vs Premature Demise
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most venture funds ask founders to sign reverse vesting deals. You own the shares from day one. But the firm can buy back unvested shares at par value if you leave.
                </p>
                <p>
                  A standard plan runs for 48 months with a 12-month cliff. If a founder dies in Month 8, they miss the cliff. The firm buys back 100% of their shares for pennies. The family gets nothing for eight months of hard work.
                </p>
                <p>
                  Smart founders add a death vesting clause. This clause gives 100% vesting or adds 12 months of credit on death. This gives the family fair cash value for the founder&apos;s labor.
                </p>
              </div>
            </section>

            {/* SECTION 4: NOMINEE VS LEGAL HEIR (SHAKTI YEZDANI PRECEDENT) */}
            <section id="nominee-vs-legal-heir" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Nominee vs Legal Heir: Landmark Supreme Court Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many founders believe that filing Form SH-13 makes the nominee the full owner of company shares. This is not true under Indian law.
                </p>
                <p>
                  In December 2023, the Supreme Court settled this issue in the Shakti Yezdani case. The court ruled clearly on share nomination:
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/70 border-l-4 border-l-[#C65378] text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="font-extrabold text-[#C65378] uppercase tracking-wider">
                    Supreme Court Ruling in Shakti Yezdani (2023):
                  </div>
                  <p className="italic">
                    A nominee under Section 72 of the Companies Act is only a trustee. They hold the shares for the real legal heirs. Succession law wins over company nomination.
                  </p>
                </div>
                <p>
                  If you name a co-founder as nominee, your spouse and kids can still sue. Only a valid Will under Section 30 of the Indian Succession Act decides who truly gets your shares.
                </p>
              </div>
            </section>

            {/* SECTION 5: TRANSMISSION OF SHARES (SECTION 56) */}
            <section id="transmission-section-56" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>BOARD RESOLUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Transmission of Shares: Section 56 Board Protocols
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 56 of the Companies Act 2013, share transmission is simple. A share sale needs a transfer deed and stamp duty. Transmission happens by law after death. No stamp duty is charged.
                </p>
                <p>
                  To complete the transmission, the heir gives the board:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>Original share papers or demat slip.</li>
                  <li>Certified copy of the death paper.</li>
                  <li>Copy of the probated Will or court succession grant.</li>
                  <li>KYC papers like PAN card and Aadhaar.</li>
                  <li>A signed bond in favor of the company.</li>
                </ul>
                <p>
                  The board must pass the transmission vote within 60 days. They then enter the heir&apos;s name in the share register. If they delay without reason, the heir can move the company court under Section 58.
                </p>
              </div>
            </section>

            {/* SECTION 6: CAP TABLE DEADLOCKS */}
            <section id="cap-table-deadlocks" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>GOVERNANCE HAZARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Cap Table Deadlock: Protecting Surviving Co-Founders
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Giving value to the family is vital. But keeping the startup alive is just as critical. When a key founder passes away, the surviving partner must run the firm alone.
                </p>
                <p>
                  If 30% of voting shares pass to non-working family members, big issues follow:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <div className="font-bold text-rose-900">Quorum Loss</div>
                    <div className="text-slate-600">
                      Unregistered shares cannot vote. The board cannot pass 75% special votes under Section 114.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <div className="font-bold text-rose-900">Blocked VC Rounds</div>
                    <div className="text-slate-600">
                      New investors ask for 100% founder signatures. Relatives may refuse to sign the term sheet.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <div className="font-bold text-rose-900">Dead Equity Weight</div>
                    <div className="text-slate-600">
                      A silent family owner holding big equity stops you from hiring a replacement leader.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <div className="font-bold text-rose-900">Cash Drain</div>
                    <div className="text-slate-600">
                      Surviving founders lack personal cash to buy out heirs without an insurance plan.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPARATIVE ANALYSIS TABLE */}
            <section id="comparative-analysis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Legal Comparison: Founder Succession Frameworks
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                Compare the four ways to handle startup shares under Indian law.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white border-b border-slate-800">
                      <th className="p-3.5 font-bold">Succession Plan</th>
                      <th className="p-3.5 font-bold">Speed of Transfer</th>
                      <th className="p-3.5 font-bold">Voting Rights</th>
                      <th className="p-3.5 font-bold">Co-Founder Safety</th>
                      <th className="p-3.5 font-bold">Dispute Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">No Will (Intestate)</td>
                      <td className="p-3.5 text-rose-700 font-bold">12 to 24 Months</td>
                      <td className="p-3.5 text-slate-600">Frozen in court</td>
                      <td className="p-3.5 text-rose-700 font-bold">None (High Risk)</td>
                      <td className="p-3.5 text-rose-700 font-bold">Very High</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Nominee Only (SH-13)</td>
                      <td className="p-3.5 text-amber-700 font-bold">30 to 60 Days</td>
                      <td className="p-3.5 text-slate-600">Trustee only</td>
                      <td className="p-3.5 text-amber-700 font-bold">Low (Heirs can sue)</td>
                      <td className="p-3.5 text-amber-700 font-bold">Medium to High</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Signed Founder Will</td>
                      <td className="p-3.5 text-emerald-700 font-bold">30 to 45 Days</td>
                      <td className="p-3.5 text-slate-600">Goes to named heir</td>
                      <td className="p-3.5 text-slate-700 font-medium">Medium</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Very Low</td>
                    </tr>
                    <tr className="hover:bg-rose-50/50 bg-rose-50/30">
                      <td className="p-3.5 font-bold text-[#C65378]">Will + Buy-Sell Agreement</td>
                      <td className="p-3.5 text-emerald-700 font-bold">15 to 30 Days</td>
                      <td className="p-3.5 text-slate-600">Smooth buyout path</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Full Safety</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Zero Risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>PROCEDURAL TIMELINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Founder Equity Transmission Plan
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                Follow this simple 5-step path to move shares under the Companies Act 2013 without hurting operations.
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "Stage 1",
                    days: "Days 1 to 15",
                    title: "Notice of Death & Board Notice",
                    desc: "Co-founders get the death paper. The board holds a quick meeting to mark shares as pending in company books.",
                  },
                  {
                    step: "Stage 2",
                    days: "Days 16 to 30",
                    title: "Vesting Audit & Share Count",
                    desc: "The company lawyer checks the contract. They count vested shares, add early death vesting, and note clawed back shares.",
                  },
                  {
                    step: "Stage 3",
                    days: "Days 31 to 60",
                    title: "Transmission Request under Section 56",
                    desc: "The heir gives the transmission form with the signed Will and KYC papers. No stamp duty is needed.",
                  },
                  {
                    step: "Stage 4",
                    days: "Days 61 to 90",
                    title: "Board Vote & Share Book Update",
                    desc: "The board votes to approve the transfer within 60 days. They issue fresh share slips and update the member list.",
                  },
                  {
                    step: "Stage 5",
                    days: "Days 91 to 180",
                    title: "Buy-Sell Payout & Family Settlement",
                    desc: "If a buy-sell plan exists, other founders use insurance funds to buy out the shares. The family gets cash fast.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white flex items-start gap-4 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                          {item.days}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: REAL-WORLD CASE STUDIES */}
            <section id="startup-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>PRACTICAL SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real-World Case Studies: Bengaluru, Gurugram, Mumbai
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                    Bengaluru SaaS Startup (Series A)
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    CTO Passes Away in Month 14 of 48-Month Plan
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A CTO held 30% shares in a ₹60 Cr SaaS firm. He passed away in Month 14. His contract held a 12-month death vesting clause.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Result:</strong> Base shares were 8.75%. The death clause added 7.5%. His spouse received 16.25% shares worth ₹9.75 Cr under his Will. Unvested shares went back to pool for a new leader.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                    Gurugram D2C Startup (Seed Stage)
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Founder Dies Without Will, Nominee Faces Court Fight
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A founder held 40% equity. He named his co-founder as nominee on Form SH-13. After his death, his parents sued under Hindu law.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Result:</strong> Under the Shakti Yezdani rule, the court held the nominee was only a trustee. Shares froze for 18 months. The firm lost a ₹12 Cr funding deal.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: LEGAL CLAUSES & TEMPLATES */}
            <section id="legal-clauses-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>DRAFTING TOOLKIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Founder Succession Legal Clauses &amp; Drafting Kits
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                Use this legal clause to add death vesting to your founder agreement or Will.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                    Model SHA Clause: Founder Death Acceleration &amp; Transmission
                  </span>
                  <button
                    onClick={handleCopyClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    {copiedClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClause ? "Copied!" : "Copy Clause"}</span>
                  </button>
                </div>
                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
{`"In the event of the demise or permanent total disability of the Founder prior to the completion of the Reverse Vesting Period, notwithstanding anything contained in this Agreement or the Articles of Association, [One Hundred Percent (100%) / an additional Twelve (12) Months] of the unvested Founder Shares shall immediately and automatically accelerate and become fully vested equity.

The Company and the Surviving Founders shall cause the Board of Directors to pass a formal transmission resolution within thirty (30) days under Section 56 of the Companies Act, 2013, registering the duly designated Nominee or Legal Heir (as evidenced by a probated Last Will and Testament or Succession Certificate) as the absolute beneficial owner of such Vested Shares in the Register of Members (Form MGT-1)."`}
                </pre>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Corporate Succession Desk
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  AMA Legal Solutions and WillDrafting provide clear Will planning, share vesting reviews, and succession help for Indian startup founders and angels.
                </p>
                <p>
                  Our legal team helps you link the Companies Act 2013 with family law. We make sure your startup shares stay safe with clear Wills, solid buy-sell deals, and proper Form SH-13 papers.
                </p>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Founder Equity Succession
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS & SPOKES */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; REGULATORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Regulatory Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.mca.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Ministry of Corporate Affairs (MCA)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>SEBI (SBEB &amp; Sweat Equity) Regulations</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court: Shakti Yezdani (2023)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Companies Act 2013 ss. 56 &amp; 72</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Corporate Estate Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/services/corporate-business-succession-family-constitution"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Corporate Succession &amp; Family Constitution
                    </Link>
                    <Link
                      href="/tools/esops-rsus-inheritance-rules-tax-guide"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      ESOPs &amp; RSUs Inheritance Tax Guide
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Share Calculator
                    </Link>
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Timeline &amp; Fee Tool
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Template India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN ENGLISH 3-CARD SUMMARY GRID */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Draft a Founder Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your startup shares have huge future value. A signed Will sends your shares straight to your heirs. It stops court fights that stall your company.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Plain-English Transfer Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Shares pass fast under Section 56 transmission. Zero stamp duty is owed. But you must name a nominee and back it with a valid Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Protects You</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We check your shareholder contract, draft death vesting rules, and set up your founder Will. We keep both your family and co-founders safe.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Corporate &amp; Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in startup equity plans, company succession rules, and private firm share transfers across India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT CAP TABLE DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Startup Equity with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Your shares belong to you. Make sure your equity and options pass smoothly to your family without stopping company growth.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Founder Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Companies Act &amp; Succession Act Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - CORPORATE RETAINER (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Building2 className="w-3 h-3" />
                  <span>CORPORATE SUCCESSION DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need a Custom Founder Buy-Sell SHA or Constitution?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our corporate team drafts buy-sell agreements, keyman trust plans, and board share transmission papers across India.
                </p>
                <Link
                  href="/services/corporate-business-succession-family-constitution"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Startup Succession Audit</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Founders Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Backed:</strong> Governed by the <em>Shakti Yezdani (2023)</em> nomination doctrine.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Reverse Vesting Compliant:</strong> Integrates single-trigger and double-trigger death clauses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Friction:</strong> Audits Section 56 transmission and Form MGT-1 compliance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Cap Table Tool</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Will</span>
        </button>
      </div>
    </div>
  );
}
