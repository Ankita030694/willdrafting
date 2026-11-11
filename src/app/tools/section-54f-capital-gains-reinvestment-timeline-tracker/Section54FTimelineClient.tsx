"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Calendar,
  Clock,
  Coins,
  TrendingDown,
  Percent,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Section 54 vs 54F Reinvestment Rules" },
  { id: "interactive-tracker", label: "2. Free Section 54 & 54F Timeline Tracker" },
  { id: "section-54-vs-54f", label: "3. Section 54 vs Section 54F: Core Differences" },
  { id: "three-statutory-deadlines", label: "4. The 3 Statutory Deadlines: 1-Yr, 2-Yr & 3-Yr" },
  { id: "cgas-deposit-rules", label: "5. Capital Gains Account Scheme (CGAS) Deadlines" },
  { id: "budget-2024-amendments", label: "6. Budget 2024 LTCG Rate Amendments & Grandfathering" },
  { id: "ten-crore-cap", label: "7. The ₹10 Crore Statutory Exemption Cap Limit" },
  { id: "comparison-table", label: "8. Statutory Comparison: Section 54 vs Section 54F" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Inherited Property Reinvestment" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Bengaluru, Delhi & Mumbai" },
  { id: "tax-compliance-checklist", label: "11. Tax Compliance Checklist & Banking Recitals" },
  { id: "institutional-profile", label: "12. Institutional Profile: Tax & Estate Planning Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Section 54 & 54F" },
  { id: "statutory-citations", label: "14. Statutory Citations & Income Tax Department Portals" },
];

const FAQS = [
  {
    q: "What is the key difference between Section 54 and Section 54F?",
    a: "Section 54 applies when you sell a long-term residential house property. To get full tax relief, you only need to reinvest the capital gains amount. In contrast, Section 54F applies when you sell any long-term asset other than a residential house (such as an inherited plot, commercial shop, gold, or shares). Under Section 54F, you must reinvest the entire net sale consideration to receive 100% tax exemption.",
  },
  {
    q: "Can I claim Section 54F if I already own a residential house in India?",
    a: "Yes, but with a strict condition. On the exact date of selling your asset, you must not own more than ONE residential house property (other than the new house you plan to purchase or construct). If you own two or more residential houses on the transfer date, you are legally disqualified from claiming tax relief under Section 54F.",
  },
  {
    q: "What is the deadline for depositing funds into the Capital Gains Account Scheme (CGAS)?",
    a: "If you have not fully utilized your capital gains (Section 54) or net sale proceeds (Section 54F) to buy or build a new house before filing your tax return, you must deposit the unutilized funds into a CGAS account with an authorized bank on or before the due date for filing your Income Tax Return under Section 139(1) (usually July 31 for individuals). Missing this deadline causes full forfeiture of the tax exemption.",
  },
  {
    q: "What are the exact reinvestment timelines under Section 54 and 54F?",
    a: "Both sections offer three distinct time windows: (1) Purchase a ready house within 1 year before the sale date, (2) Purchase a ready house within 2 years after the sale date, or (3) Complete construction of a new residential house within 3 years after the sale date.",
  },
  {
    q: "How does the Budget 2024 LTCG tax rate change affect inherited property sales?",
    a: "Budget 2024 set the long-term capital gains tax rate on real estate at 12.5% without indexation for transfers on or after July 23, 2024. However, for resident individuals and HUFs who acquired property before July 23, 2024 (including inherited property where the predecessor bought it before that date), taxpayers can calculate tax at 20% with indexation or 12.5% without indexation and pay whichever amount is lower.",
  },
  {
    q: "What is the maximum exemption limit under Section 54 and Section 54F?",
    a: "Under amendments introduced in the Finance Act 2023, the maximum capital gains exemption claimable under Section 54 and Section 54F is capped at ₹10 Crore per transaction. Any capital gains or reinvestment cost exceeding ₹10 Crore will not qualify for exemption and will be taxed at applicable LTCG rates.",
  },
  {
    q: "How is the holding period calculated when selling inherited property in India?",
    a: "Under Section 49(1) and Explanation 1(b) to Section 2(42A) of the Income Tax Act, the holding period of the previous owner (the deceased parent or relative) is added to your holding period. If the combined holding period exceeds 24 months, the asset is treated as a long-term capital asset, qualifying for Section 54 or Section 54F relief.",
  },
  {
    q: "What happens if the builder delays possession beyond the 3-year construction deadline?",
    a: "Judicial precedents from multiple High Courts, including the Delhi High Court in Sanjeev Puri and Karnataka High Court in Smt. K.G. Rukminiamma, have held that if a taxpayer has invested the requisite funds within the statutory period and delay is solely due to the builder, the tax exemption should not be denied, provided substantial construction steps were completed.",
  },
];

export default function Section54FTimelineClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedRecital, setCopiedRecital] = useState<boolean>(false);

  // Diagnostic Wizard State
  const [assetType, setAssetType] = useState<"residential_house" | "vacant_plot" | "commercial_asset">(
    "vacant_plot"
  );
  const [saleDateStr, setSaleDateStr] = useState<string>("2024-11-15");
  const [netConsideration, setNetConsideration] = useState<number>(18000000); // 1.8 Crore
  const [capitalGains, setCapitalGains] = useState<number>(12000000); // 1.2 Crore
  const [existingHouses, setExistingHouses] = useState<"0" | "1" | "2_or_more">("1");
  const [reinvestmentMode, setReinvestmentMode] = useState<
    "purchase_ready" | "construction_new" | "purchase_prior" | "cgas_deposit"
  >("construction_new");
  const [filingCategory, setFilingCategory] = useState<"individual_non_audit" | "audit_entity">(
    "individual_non_audit"
  );
  const [plannedReinvestment, setPlannedReinvestment] = useState<number>(18000000); // 1.8 Crore

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

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Helper date calculations
  const parseDateSafe = (dateStr: string): Date => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date(2024, 10, 15) : d;
  };

  const saleDate = parseDateSafe(saleDateStr);

  // Date Formatting Helper
  const formatDateDisplay = (date: Date): string => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 1 Year Prior Window
  const priorOneYearDate = new Date(saleDate);
  priorOneYearDate.setFullYear(priorOneYearDate.getFullYear() - 1);

  // 2 Years After Window (Purchase)
  const afterTwoYearsDate = new Date(saleDate);
  afterTwoYearsDate.setFullYear(afterTwoYearsDate.getFullYear() + 2);

  // 3 Years After Window (Construction)
  const afterThreeYearsDate = new Date(saleDate);
  afterThreeYearsDate.setFullYear(afterThreeYearsDate.getFullYear() + 3);

  // Determine Financial Year and Assessment Year
  const saleMonth = saleDate.getMonth(); // 0-indexed: 0 = Jan, 3 = April
  const saleYear = saleDate.getFullYear();
  const fyStartYear = saleMonth >= 3 ? saleYear : saleYear - 1;
  const fyEndYear = fyStartYear + 1;
  const ayStartYear = fyEndYear;

  // ITR Section 139(1) Due Date
  const itrDueDate = new Date(
    ayStartYear,
    filingCategory === "individual_non_audit" ? 6 : 9, // July (6) or October (9)
    31
  );

  // Section 54 vs Section 54F Logic
  const isSection54 = assetType === "residential_house";
  const isDisqualified54F = !isSection54 && existingHouses === "2_or_more";

  // Reinvestment requirement for 100% relief
  const requiredFor100Percent = isSection54 ? capitalGains : netConsideration;

  // Statutory Exemption Cap (Budget 2023 / 2024 ₹10 Crore Cap)
  const STATUTORY_CAP = 100000000; // ₹10 Crore
  const effectiveReinvestment = Math.min(plannedReinvestment, STATUTORY_CAP);
  const effectiveNetConsideration = Math.min(netConsideration, STATUTORY_CAP);
  const effectiveCapitalGains = Math.min(capitalGains, STATUTORY_CAP);

  let calculatedExemption = 0;
  if (isSection54) {
    calculatedExemption = Math.min(capitalGains, effectiveReinvestment);
  } else if (isDisqualified54F) {
    calculatedExemption = 0;
  } else {
    // Section 54F proportionate calculation
    if (plannedReinvestment >= netConsideration) {
      calculatedExemption = effectiveCapitalGains;
    } else {
      calculatedExemption = Math.round(
        (capitalGains * effectiveReinvestment) / (effectiveNetConsideration || 1)
      );
    }
  }

  // Ensure exemption does not exceed capital gains or cap
  calculatedExemption = Math.min(calculatedExemption, capitalGains, STATUTORY_CAP);
  const taxableCapitalGain = Math.max(0, capitalGains - calculatedExemption);

  // Budget 2024 LTCG Rate: 12.5%
  const estimatedTaxWithReinvestment = Math.round(taxableCapitalGain * 0.125 * 1.04); // including 4% cess
  const estimatedTaxWithoutReinvestment = Math.round(capitalGains * 0.125 * 1.04);
  const taxSaved = Math.max(0, estimatedTaxWithoutReinvestment - estimatedTaxWithReinvestment);

  // Format INR Currency
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyClauseToClipboard = () => {
    const clauseText = `CAPITAL GAINS ACCOUNT SCHEME (CGAS) 1988 DECLARATION FOR BANK MANAGER
To,
The Branch Manager,
[Name of Authorized Public Sector / Schedule Commercial Bank]
[Branch Name and City]

SUBJECT: APPLICATION FOR OPENING CAPITAL GAINS ACCOUNT (TYPE A / TYPE B) UNDER SECTION 54 / 54F OF THE INCOME TAX ACT, 1961

Dear Sir/Madam,
I, [Full Name of Taxpayer], PAN: [Permanent Account Number], residing at [Residential Address], declare as follows:

1. During the Financial Year [e.g., 2024-25] relevant to Assessment Year [e.g., 2025-26], I transferred a long-term capital asset (Inherited Property) on [Date of Sale], yielding Net Sale Proceeds of ₹[Amount] and Long-Term Capital Gains of ₹[Amount].

2. Under the provisions of Section 54 / Section 54F of the Income Tax Act, 1961 read with the Capital Gains Accounts Scheme, 1988, I am entitled to claim tax exemption by reinvesting these proceeds in a new residential house within the statutory period of 2 years (for purchase) or 3 years (for construction).

3. As the statutory due date for filing my Return of Income under Section 139(1) is [July 31 / October 31], and the sale proceeds are not yet fully utilized towards the new house, I hereby deposit ₹[Amount] in your branch under:
   [ ] Type A Account (Savings Deposit)
   [ ] Type B Account (Term Deposit)

4. I request you to open the said account under Form A of the CGAS Rules and provide the Passbook / Deposit Certificate referencing my PAN.

Yours faithfully,
[Signature of Taxpayer]
Date: [Date]`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: SECTION 54 / 54F TAX EXEMPTION & CGAS COMPLIANCE
1. Registered Sale Deed of the transferred inherited property showing exact sale date and consideration.
2. Ancestral provenance papers: Registered Will of deceased parent, Probate order, or Revenue Mutation extract (Patta / Khata / Jamabandi).
3. Section 49(1) cost documentation: Predecessor purchase deed, fair market value valuation as of April 1, 2001 (if acquired prior).
4. Bank statement reflecting receipt of sale proceeds in seller's Indian savings / NRO account.
5. CGAS Account Form A application copy along with bank-acknowledged deposit receipt before Section 139(1) due date.
6. New residential house purchase deed / builder registered agreement for sale / construction contractor invoices.
7. Form C (for withdrawals from CGAS Type A account) showing funds paid directly to builder / vendor.
8. Income Tax Return (ITR-2) acknowledging Schedule CG declarations and CGAS account deposit details.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyRecitalToClipboard = () => {
    const recitalText = `STATUTORY RECITAL CLAUSE FOR PURCHASE DEED / WILL BEQUEST
"The Purchaser / Testator hereby declares that the consideration paid towards the acquisition of the Schedule Property represents the proceeds / capital gains derived from the transfer of ancestral / inherited capital assets sold on [Date of Sale].

This acquisition is made specifically in compliance with the reinvestment provisions of Section 54 / Section 54F of the Income Tax Act, 1961, within the statutory period of two years from the date of transfer, to avail full long-term capital gains tax exemption.

The Purchaser / Testator confirms that on the date of the earlier transfer, they did not own more than one residential house property, fully complying with the statutory proviso to Section 54F(1)."`;
    navigator.clipboard.writeText(recitalText);
    setCopiedRecital(true);
    setTimeout(() => setCopiedRecital(false), 3000);
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
            <span>INCOME TAX ACT, 1961 • SECTIONS 54, 54EC &amp; 54F</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Section 54 &amp; 54F Capital Gains Timeline Tracker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compute exact 1-year prior, 2-year purchase, and 3-year construction deadlines. Track
            Capital Gains Account Scheme (CGAS) bank deposit dates before your Section 139(1) ITR
            filing deadline.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-tracker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Track Reinvestment Deadlines</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Tax-Efficient Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1-Yr / 2-Yr / 3-Yr</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PURCHASE &amp; CONSTRUCTION WINDOWS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 139(1) Cutoff</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CGAS BANK DEPOSIT DEADLINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10 Crore Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BUDGET STATUTORY EXEMPTION LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Budget 2024 LTCG</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                12.5% WITHOUT / 20% WITH INDEXATION
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
                <span>Tax Compliance Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 54, 54EC, and 54F of the Income Tax Act, 1961 as amended by
                the Finance Act 2024. CBDT Circular No. 495 and Capital Gains Accounts Scheme, 1988.
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
                <span>EXECUTIVE BRIEF: INHERITED PROPERTY CAPITAL GAINS &amp; TIMELINES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Plot vs Residential House Difference:</strong> If you sell an inherited
                    residential house, Section 54 applies and you only need to reinvest the{" "}
                    <strong>capital gain</strong>. If you sell an inherited vacant plot, commercial
                    building, or gold, Section 54F applies and you must reinvest the entire{" "}
                    <strong>net sale consideration</strong> to claim 100% tax relief.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The CGAS Deadline Trap:</strong> The statutory purchase window is 2 years
                    and construction is 3 years, but unutilized funds MUST be deposited into a
                    Capital Gains Account Scheme (CGAS) before your Section 139(1) ITR filing due
                    date (usually July 31). Missing this cutoff triggers complete tax disallowance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Budget 2023 &amp; 2024 Limits:</strong> Total capital gains exemption under
                    Section 54 and Section 54F is strictly capped at ₹10 Crore. LTCG tax on real
                    estate is 12.5% without indexation, with a grandfathering choice (20% with
                    indexation) for pre-July 23, 2024 acquisitions by resident individuals and HUFs.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 TAG ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INCOME TAX ACT, 1961 • STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Section 54 vs 54F Reinvestment Rules
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When legal heirs inherit ancestral real estate and subsequently liquidate the property,
                the resulting financial proceeds are subject to capital gains taxation under Chapter IV-E
                of the Income Tax Act, 1961. The Indian tax code provides powerful statutory exemptions
                to shield taxpayers from onerous tax liabilities, provided the sale proceeds are
                channeled into residential housing within rigid statutory timelines.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                However, a catastrophic blind spot for most taxpayers and generalist advisors is confusing
                <strong> Section 54</strong> with <strong>Section 54F</strong>. While both provisions
                encourage housing investment, their qualification gates, reinvestment denominators, and
                statutory disqualifications operate under completely different legal mechanics.
              </p>

              {/* Visual Asset Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Layers className="w-4 h-4 text-[#C65378]" />
                    <span>EDITORIAL GUIDE: REINVESTMENT TIMELINE &amp; CGAS MATRIX</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Income Tax Act</span>
                </div>
                <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  <Image
                    src="/images/section-54f-capital-gains-reinvestment-timeline-tracker-og.jpg"
                    alt="Section 54 and 54F Capital Gains Reinvestment Timeline Tracker India"
                    width={1200}
                    height={675}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
                <p className="text-[11px] text-slate-500 text-center pt-1">
                  Section 54 and Section 54F statutory reinvestment matrix: tracking 1-year prior, 2-year
                  purchase, 3-year construction, and CGAS bank deposit deadlines.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-tracker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE REINVESTMENT ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                2. Free Section 54 &amp; 54F Timeline Tracker
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Select your asset type, enter transfer date, and input consideration amounts. The
                diagnostic calculator computes exact statutory dates, the mandatory CGAS deposit cutoff,
                and tax exemption under Budget 2024 rules.
              </p>

              {/* Tool Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-8 space-y-6">
                {/* Top Control Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Asset Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      1. Type of Asset Sold
                    </label>
                    <select
                      value={assetType}
                      onChange={(e) =>
                        setAssetType(
                          e.target.value as "residential_house" | "vacant_plot" | "commercial_asset"
                        )
                      }
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    >
                      <option value="vacant_plot">
                        Inherited Residential Plot / Vacant Land (Sec 54F)
                      </option>
                      <option value="residential_house">
                        Inherited Residential House / Flat (Sec 54)
                      </option>
                      <option value="commercial_asset">
                        Commercial Shop / Gold / Other Asset (Sec 54F)
                      </option>
                    </select>
                  </div>

                  {/* Transfer Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      2. Date of Transfer / Registered Sale Deed
                    </label>
                    <input
                      type="date"
                      value={saleDateStr}
                      onChange={(e) => setSaleDateStr(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Net Consideration */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        3. Net Sale Consideration (₹)
                      </label>
                      <span className="text-[11px] font-bold text-[#C65378]">
                        {formatINR(netConsideration)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={500000}
                      value={netConsideration}
                      onChange={(e) => setNetConsideration(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    />
                    <div className="flex gap-2 pt-1">
                      {[7500000, 18000000, 35000000, 120000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setNetConsideration(preset)}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                        >
                          ₹{(preset / 10000000).toFixed(1)}Cr
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capital Gains */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        4. Long-Term Capital Gain (₹)
                      </label>
                      <span className="text-[11px] font-bold text-[#5F7E75]">
                        {formatINR(capitalGains)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={500000}
                      value={capitalGains}
                      onChange={(e) => setCapitalGains(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    />
                    <div className="flex gap-2 pt-1">
                      {[5000000, 12000000, 25000000, 100000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCapitalGains(preset)}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                        >
                          ₹{(preset / 10000000).toFixed(1)}Cr
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Existing Houses Owned */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      5. Residential Houses Owned on Sale Date
                    </label>
                    <select
                      value={existingHouses}
                      onChange={(e) => setExistingHouses(e.target.value as "0" | "1" | "2_or_more")}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    >
                      <option value="0">0 Houses (No other residential property)</option>
                      <option value="1">1 House (Eligible under Section 54F Proviso)</option>
                      <option value="2_or_more">
                        2 or More Houses (Disqualified from Sec 54F)
                      </option>
                    </select>
                  </div>

                  {/* Reinvestment Mode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      6. Proposed Reinvestment Mode
                    </label>
                    <select
                      value={reinvestmentMode}
                      onChange={(e) =>
                        setReinvestmentMode(
                          e.target.value as
                            | "purchase_ready"
                            | "construction_new"
                            | "purchase_prior"
                            | "cgas_deposit"
                        )
                      }
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    >
                      <option value="construction_new">
                        Under-Construction / Self-Construction (3-Year Window)
                      </option>
                      <option value="purchase_ready">
                        Purchase Ready / Resale Residential Flat (2-Year Window)
                      </option>
                      <option value="purchase_prior">
                        House Purchased Prior to Sale (1-Year Prior Window)
                      </option>
                      <option value="cgas_deposit">
                        Deposit Unutilized Balance in CGAS Account A/B
                      </option>
                    </select>
                  </div>

                  {/* Taxpayer Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      7. ITR Filing Due Date Category
                    </label>
                    <select
                      value={filingCategory}
                      onChange={(e) =>
                        setFilingCategory(
                          e.target.value as "individual_non_audit" | "audit_entity"
                        )
                      }
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    >
                      <option value="individual_non_audit">
                        Individual / HUF (Non-Audit) • July 31 Due Date
                      </option>
                      <option value="audit_entity">
                        Tax Audit Assessee • October 31 Due Date
                      </option>
                    </select>
                  </div>

                  {/* Planned Reinvestment Amount */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        8. Planned Reinvestment Amount (₹)
                      </label>
                      <span className="text-[11px] font-bold text-slate-800">
                        {formatINR(plannedReinvestment)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={500000}
                      value={plannedReinvestment}
                      onChange={(e) => setPlannedReinvestment(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378] focus:border-transparent outline-none transition"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPlannedReinvestment(netConsideration)}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-rose-50 hover:bg-rose-100 text-[#C65378] font-semibold transition"
                      >
                        100% Net Proceeds
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlannedReinvestment(capitalGains)}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition"
                      >
                        100% Capital Gains
                      </button>
                    </div>
                  </div>
                </div>

                {/* Statutory Disqualification Alert (if applicable) */}
                {isDisqualified54F && (
                  <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 flex items-start gap-3 text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="font-extrabold text-amber-950 uppercase tracking-wide">
                        Statutory Disqualification under Section 54F Proviso
                      </div>
                      <p>
                        You selected that you own 2 or more residential houses on the date of transfer.
                        Under the statutory proviso to Section 54F(1), tax exemption is{" "}
                        <strong>strictly disallowed</strong> if the taxpayer owns more than one
                        residential house (other than the new house) on the date of sale.
                      </p>
                      <p className="font-bold text-[11px] text-amber-900">
                        Alternative Strategy: Consider Section 54EC Capital Gain Bonds (up to ₹50 Lakhs
                        within 6 months) or structured testamentary planning.
                      </p>
                    </div>
                  </div>
                )}

                {/* DYNAMIC RESULTS DASHBOARD */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-950 text-white p-5 sm:p-8 space-y-6">
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C65378] bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
                        {isSection54
                          ? "SECTION 54 APPLICABLE (HOUSE SALE)"
                          : isDisqualified54F
                          ? "SECTION 54F DISQUALIFIED (PROVISO)"
                          : "SECTION 54F APPLICABLE (PLOT / ASSET SALE)"}
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-white mt-2">
                        {isDisqualified54F
                          ? "Zero Exemption Available"
                          : `Exemption Claim: ${formatINR(calculatedExemption)}`}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] text-white/70 font-medium">Tax Saved via Reinvestment</div>
                      <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                        {formatINR(taxSaved)}
                      </div>
                    </div>
                  </div>

                  {/* STATUTORY DEADLINE MATRIX */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-300">
                      <Clock className="w-4 h-4" />
                      <span>STATUTORY TIMELINE MATRIX (REINVESTMENT &amp; CGAS)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {/* 1 Year Prior */}
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1">
                        <div className="text-white/60 font-semibold text-[11px]">1-Year Prior Purchase</div>
                        <div className="text-sm font-bold text-white">
                          {formatDateDisplay(priorOneYearDate)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Earliest valid acquisition date
                        </div>
                      </div>

                      {/* 2 Years Purchase */}
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1">
                        <div className="text-white/60 font-semibold text-[11px]">2-Year Purchase Window</div>
                        <div className="text-sm font-bold text-white">
                          {formatDateDisplay(afterTwoYearsDate)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Final date to register new house
                        </div>
                      </div>

                      {/* 3 Years Construction */}
                      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1">
                        <div className="text-white/60 font-semibold text-[11px]">3-Year Construction Window</div>
                        <div className="text-sm font-bold text-white">
                          {formatDateDisplay(afterThreeYearsDate)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Final construction completion
                        </div>
                      </div>

                      {/* CGAS ITR Cutoff */}
                      <div className="rounded-xl bg-rose-950/40 border border-rose-500/40 p-3 space-y-1">
                        <div className="text-rose-300 font-bold text-[11px] flex items-center justify-between">
                          <span>CGAS Bank Deposit Cutoff</span>
                          <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded font-black">
                            STRICT
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-rose-200">
                          {formatDateDisplay(itrDueDate)}
                        </div>
                        <div className="text-[10px] text-rose-300/80">
                          Sec 139(1) ITR deadline (AY {ayStartYear}-{ayStartYear + 1 - 2000})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FINANCIAL EXEMPTION BREAKDOWN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs">
                    <div className="space-y-1">
                      <div className="text-white/60 text-[11px]">Required for 100% Relief</div>
                      <div className="text-base font-bold text-white">
                        {formatINR(requiredFor100Percent)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isSection54 ? "100% of Capital Gains" : "100% of Net Sale Proceeds"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-white/60 text-[11px]">Taxable Capital Gain</div>
                      <div className="text-base font-bold text-amber-300">
                        {formatINR(taxableCapitalGain)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Portion unexempt or uninvested
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-white/60 text-[11px]">Est. LTCG Tax Liability</div>
                      <div className="text-base font-bold text-rose-400">
                        {formatINR(estimatedTaxWithReinvestment)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Budget 2024 (12.5% + 4% cess)
                      </div>
                    </div>
                  </div>

                  {/* ₹10 Crore Exemption Cap Validator */}
                  {plannedReinvestment > STATUTORY_CAP && (
                    <div className="rounded-xl bg-white/10 p-3 text-xs border border-white/20 flex items-center gap-2.5">
                      <Info className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>
                        <strong>₹10 Crore Cap Applied:</strong> Your investment exceeds ₹10 Crore. Under
                        Finance Act 2023 amendments to Section 54/54F, the statutory exemption is capped
                        at ₹10,00,00,000.
                      </span>
                    </div>
                  )}
                </div>

                {/* Reset & Quick Guide */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Statutory rates updated for Assessment Year 2025-26 &amp; Budget 2024.</span>
                  </div>
                  <button
                    onClick={() => {
                      setAssetType("vacant_plot");
                      setSaleDateStr("2024-11-15");
                      setNetConsideration(18000000);
                      setCapitalGains(12000000);
                      setExistingHouses("1");
                      setReinvestmentMode("construction_new");
                      setFilingCategory("individual_non_audit");
                      setPlannedReinvestment(18000000);
                    }}
                    className="flex items-center gap-1.5 text-[#C65378] font-bold hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Calculator</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: SECTION 54 VS SECTION 54F CORE DIFFERENCES */}
            <section id="section-54-vs-54f" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY PROVISIONS COMPARED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                3. Section 54 vs Section 54F: Core Differences
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The most frequent error committed by heirs selling inherited estate in India is failing
                to distinguish between Section 54 and Section 54F. Although both exemptions require
                reinvesting in residential housing, their foundational legal tests are completely
                different:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="font-extrabold text-[#C65378] text-sm flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>Section 54: Residential House Transfer</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Asset Sold:</strong> Long-term residential house property (villa, flat, or
                    ancestral residential structure).
                  </p>
                  <p className="text-slate-600">
                    <strong>Investment Denominator:</strong> You only need to reinvest the{" "}
                    <strong>Capital Gain</strong> amount.
                  </p>
                  <p className="text-slate-600">
                    <strong>Existing Houses Allowed:</strong> No restriction on how many other homes you
                    already own.
                  </p>
                  <p className="text-slate-600">
                    <strong>Two Houses Relief:</strong> Option to buy two residential houses once in a
                    lifetime if capital gains do not exceed ₹2 Crore.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="font-extrabold text-[#5F7E75] text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4" />
                    <span>Section 54F: Any Asset Other Than House</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>Asset Sold:</strong> Inherited residential plots, vacant land, commercial
                    premises, shares, or gold.
                  </p>
                  <p className="text-slate-600">
                    <strong>Investment Denominator:</strong> You must reinvest the entire{" "}
                    <strong>Net Sale Consideration</strong> (Gross price minus brokerage).
                  </p>
                  <p className="text-slate-600">
                    <strong>Disqualification Proviso:</strong> You must not own more than{" "}
                    <strong>one</strong> residential house on the sale date.
                  </p>
                  <p className="text-slate-600">
                    <strong>Lock-in Condition:</strong> You cannot purchase another house within 2 years
                    or build another within 3 years.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: THE 3 STATUTORY DEADLINES */}
            <section id="three-statutory-deadlines" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>REINVESTMENT TIMEFRAME ANATOMY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                4. The 3 Statutory Deadlines: 1-Yr, 2-Yr &amp; 3-Yr
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Sections 54 and 54F provide three separate statutory windows starting from the exact
                date of transfer (the date the registered conveyance deed is signed):
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Window 1: Purchase 1 Year Prior to Transfer
                  </div>
                  <p className="text-slate-600">
                    If you purchased a ready residential house within 365 days before selling your
                    inherited asset, the capital gains can be set off against that acquisition. This
                    accommodates taxpayers who secured alternative housing before finding a buyer for
                    ancestral property.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Window 2: Purchase Within 2 Years After Transfer
                  </div>
                  <p className="text-slate-600">
                    You have exactly 24 calendar months from the transfer date to execute a registered sale
                    deed for a ready residential flat or existing house in India. The property must be
                    habitable and title must pass to the taxpayer.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    Window 3: Construct Within 3 Years After Transfer
                  </div>
                  <p className="text-slate-600">
                    If you purchase a vacant residential plot and build a new home, or if you book an
                    under-construction apartment from a real estate developer, the construction must be
                    completed within 36 calendar months from the original transfer date.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: CAPITAL GAINS ACCOUNT SCHEME */}
            <section id="cgas-deposit-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>CBDT CIRCULAR NO. 495 &amp; CGAS RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                5. Capital Gains Account Scheme (CGAS) Deadlines
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Although the law grants up to 2 years to purchase and 3 years to construct, taxpayers
                face an urgent interim statutory hurdle: the <strong>Section 139(1) ITR filing deadline</strong>.
              </p>
              <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-5 space-y-3">
                <div className="font-extrabold text-[#C65378] text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Section 139(1) Deposit Requirement</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Under Section 54(2) and Section 54F(4), any portion of the capital gain (Section 54) or
                  net consideration (Section 54F) that has not been spent on the new house prior to the
                  date of furnishing the return of income under Section 139(1) <strong>MUST</strong> be
                  deposited in an authorized Capital Gains Account before that deadline.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white rounded-xl p-3 border border-rose-100">
                    <div className="font-bold text-slate-900">Type A Account (Savings)</div>
                    <p className="text-slate-600 mt-0.5">
                      Operates like a regular savings bank account. Best suited when you are constructing
                      a home and need to make frequent phased stage payments to contractors.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-rose-100">
                    <div className="font-bold text-slate-900">Type B Account (Term Deposit)</div>
                    <p className="text-slate-600 mt-0.5">
                      Operates like a fixed deposit earning higher interest. Ideal when you have identified
                      a ready property and need to release a single lump sum 12 to 18 months later.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: BUDGET 2024 AMENDMENTS */}
            <section id="budget-2024-amendments" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingDown className="w-4 h-4" />
                <span>BUDGET 2024 REAL ESTATE TAX OVERHAUL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                6. Budget 2024 LTCG Rate Amendments &amp; Grandfathering
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The Union Budget presented on July 23, 2024 fundamentally restructured the taxation of
                long-term capital assets in India. For immovable property sold on or after July 23, 2024,
                the statutory tax rate was reduced from 20% to <strong>12.5%</strong>, while indexation
                benefits were formally abolished.
              </p>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="font-bold text-slate-900 text-sm">
                  Crucial Grandfathering Clause for Pre-July 23, 2024 Acquisitions
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Following widespread public representation, the government inserted an amendment
                  allowing resident individuals and HUFs who acquired property before July 23, 2024
                  (including inherited ancestral land where the deceased predecessor purchased it prior to
                  that date) to calculate their tax liability under both methods:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <span className="font-bold text-[#172228]">Option A: 12.5% Without Indexation</span>
                    <p className="text-slate-600 mt-1">
                      Computed on absolute gain (Sale price minus actual historic purchase cost).
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <span className="font-bold text-[#C65378]">Option B: 20% With Indexation</span>
                    <p className="text-slate-600 mt-1">
                      Available for properties acquired before July 23, 2024. You pay whichever is lower.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: ₹10 CRORE EXEMPTION CAP */}
            <section id="ten-crore-cap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>HIGH-NET-WORTH ESTATE RESTRICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                7. The ₹10 Crore Statutory Exemption Cap Limit
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Prior to April 1, 2023, high-net-worth families selling prime ancestral real estate in
                metros like Mumbai, Delhi, and Bengaluru could reinvest ₹20 Crore to ₹50 Crore into luxury
                penthouses and claim 100% tax exemption.
              </p>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="font-bold text-slate-900 text-sm">
                  Statutory Ceiling Imposed by Finance Act 2023
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The Finance Act 2023 amended Section 54 and Section 54F to cap the maximum cost of the new
                  residential property eligible for exemption at <strong>₹10 Crore</strong>. Any capital
                  gain or net consideration exceeding ₹10 Crore is mandatorily taxed at applicable LTCG
                  rates, regardless of how much you invest in the new home.
                </p>
              </div>
            </section>

            {/* SECTION 8: STATUTORY COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>LEGAL PROVISION COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                8. Statutory Comparison: Section 54 vs Section 54F
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-extrabold uppercase tracking-wider">
                      <th className="p-3.5">Statutory Parameter</th>
                      <th className="p-3.5 text-[#C65378]">Section 54</th>
                      <th className="p-3.5 text-[#5F7E75]">Section 54F</th>
                      <th className="p-3.5">Section 54EC Bonds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-bold">Eligible Asset Sold</td>
                      <td className="p-3.5">Residential House Property</td>
                      <td className="p-3.5">Any Asset other than House</td>
                      <td className="p-3.5">Land or Building</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Required Investment</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">Capital Gains only</td>
                      <td className="p-3.5 font-semibold text-[#5F7E75]">Entire Net Consideration</td>
                      <td className="p-3.5">Capital Gains</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Ownership of Other Houses</td>
                      <td className="p-3.5">No statutory restriction</td>
                      <td className="p-3.5 font-bold text-rose-700">Max 1 house allowed</td>
                      <td className="p-3.5">No restriction</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Reinvestment Asset</td>
                      <td className="p-3.5">Residential House in India</td>
                      <td className="p-3.5">Residential House in India</td>
                      <td className="p-3.5">REC, NHAI, PFC, IRFC Bonds</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Maximum Statutory Limit</td>
                      <td className="p-3.5">₹10 Crore Cap</td>
                      <td className="p-3.5">₹10 Crore Cap</td>
                      <td className="p-3.5">₹50 Lakhs per FY</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">Lock-in Period</td>
                      <td className="p-3.5">3 Years from acquisition</td>
                      <td className="p-3.5">3 Years from acquisition</td>
                      <td className="p-3.5">5 Years lock-in</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold">CGAS Scheme Eligible</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Yes (Type A / B)</td>
                      <td className="p-3.5 text-emerald-600 font-bold">Yes (Type A / B)</td>
                      <td className="p-3.5 text-slate-400">Not Applicable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTION PROTOCOL FOR HEIRS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Inherited Property Reinvestment
              </h3>
              <div className="space-y-3">
                {[
                  {
                    step: "Step 1",
                    title: "Establish Inherited Holding Period & Title Provenance",
                    desc: "Obtain mutation certificate, death certificate, and registered Will or succession certificate. Under Section 49(1), ensure the predecessor holding period exceeds 24 months to confirm LTCG eligibility.",
                  },
                  {
                    step: "Step 2",
                    title: "Classify Asset and Determine Applicable Section",
                    desc: "Verify whether the asset is a residential house (Section 54) or plot/commercial land (Section 54F). For Section 54F, verify how many other residential homes you own on the transfer date.",
                  },
                  {
                    step: "Step 3",
                    title: "Calculate Reinvestment Denominator",
                    desc: "Determine whether you must invest the net consideration (Section 54F) or merely the capital gain (Section 54). Account for the ₹10 Crore statutory cap.",
                  },
                  {
                    step: "Step 4",
                    title: "Open Capital Gains Account (CGAS) Before July 31",
                    desc: "If funds are not fully deployed in the new property before filing your ITR under Section 139(1), deposit the unutilized sum in an authorized bank under Type A or Type B account.",
                  },
                  {
                    step: "Step 5",
                    title: "File Form ITR-2 with Schedule CG Disclosures",
                    desc: "Disclose transfer details, Section 49(1) historic cost, applicable section, and the bank branch name, IFSC, and BSR code of your CGAS deposit account.",
                  },
                  {
                    step: "Step 6",
                    title: "Complete Purchase within 2 Years or Construction in 3 Years",
                    desc: "Withdraw funds from the CGAS account using Form C strictly for property acquisition. Maintain registered deed, occupancy certificate, and building contractor invoices.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-xs"
                  >
                    <span className="shrink-0 text-xs font-extrabold uppercase px-2 py-1 rounded bg-rose-50 text-[#C65378] border border-rose-200">
                      {item.step}
                    </span>
                    <div className="space-y-0.5">
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>GROUND REALITIES ACROSS METROS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Bengaluru, Delhi &amp; Mumbai
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Case 1 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="font-bold text-[#C65378] text-sm">
                    Bengaluru: Plot Sale for ₹1.8 Crore
                  </div>
                  <p className="text-slate-600">
                    <strong>Situation:</strong> Tech executive inherited a residential plot in Whitefield
                    from his father. He sold it for ₹1.8 Crore, generating ₹1.2 Crore capital gains. He
                    already owns 1 self-occupied apartment.
                  </p>
                  <p className="text-slate-600">
                    <strong>Solution:</strong> Because it was a plot, Section 54F applied. He was eligible
                    as he only owned 1 house. He reinvested the full ₹1.8 Crore net consideration into a
                    villa under construction, depositing funds into CGAS before July 31, paying zero tax.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="font-bold text-[#5F7E75] text-sm">
                    Delhi: Bungalow Sale with ₹10 Cr Cap
                  </div>
                  <p className="text-slate-600">
                    <strong>Situation:</strong> Three siblings inherited a South Delhi bungalow and sold it
                    for ₹14 Crore, generating ₹11.5 Crore capital gains.
                  </p>
                  <p className="text-slate-600">
                    <strong>Solution:</strong> Section 54 applied. They bought an apartment for ₹12 Crore.
                    Under Budget 2023 cap, only ₹10 Crore qualified for exemption. The remaining ₹1.5 Crore
                    gain was taxed at 12.5% under Budget 2024.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">
                    Mumbai: NRI Flat Sale &amp; 15CA/15CB
                  </div>
                  <p className="text-slate-600">
                    <strong>Situation:</strong> Non-Resident Indian in Dubai inherited a flat in Bandra.
                    Sold for ₹3 Crore. Wanted to remit funds abroad rather than buy another house.
                  </p>
                  <p className="text-slate-600">
                    <strong>Solution:</strong> Section 54 was not utilized as funds were to be repatriated.
                    Assisted with Form 13 Lower TDS certificate (reducing TDS from 20% to 12.5%), Form
                    15CB CA certificate, Form 15CA filing, and RBI $1M remittance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: TAX COMPLIANCE CHECKLIST & BANKING RECITALS */}
            <section id="tax-compliance-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DOCUMENTATION TEMPLATES &amp; CHECKLISTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                11. Tax Compliance Checklist &amp; Banking Recitals
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Use these verified statutory drafts when applying for a CGAS account with public sector
                banks or documenting capital gains provenance in registered purchase deeds.
              </p>

              {/* Box 1: CGAS Declaration Letter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>CGAS Form A Bank Application Declaration</span>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                  {`APPLICATION FOR OPENING CAPITAL GAINS ACCOUNT (TYPE A / TYPE B)
Under Section 54 / 54F of the Income Tax Act, 1961 read with CGAS Scheme 1988

To: The Branch Manager, [Authorized Bank]
1. I, [Taxpayer Name], PAN: [PAN], declare that I transferred long-term inherited property on [Sale Date].
2. The Net Sale Proceeds equal ₹[Amount] and Long-Term Capital Gains equal ₹[Amount].
3. To comply with Section 54 / 54F before the Section 139(1) ITR due date of July 31, I hereby deposit unutilized proceeds of ₹[Amount] into a Type A / Type B Capital Gains Account.
4. I request issue of passbook / deposit receipt referencing my PAN for Income Tax Return filing.`}
                </pre>
              </div>

              {/* Box 2: Purchase Deed Recital */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <span>Purchase Deed Statutory Recital Clause</span>
                  </div>
                  <button
                    onClick={copyRecitalToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    {copiedRecital ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Recital</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                  {`STATUTORY REINVESTMENT RECITAL CLAUSE FOR PURCHASE CONVEYANCE
"The Purchaser declares that the consideration paid towards this Schedule Property represents proceeds derived from the transfer of inherited capital assets sold on [Date]. This acquisition is executed in compliance with Section 54 / 54F of the Income Tax Act within two years of transfer. The Purchaser confirms they did not own more than one residential house on the transfer date."`}
                </pre>
              </div>

              {/* Box 3: Document Verification Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Inheritance Tax Audit Checklist</span>
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Registered Sale Deed of inherited asset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Section 49(1) historic title &amp; mutation records</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CGAS bank acknowledgment prior to July 31</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Schedule CG disclosure in ITR-2 return</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>AMA LEGAL SOLUTIONS SUCCESSION DESK</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Tax &amp; Estate Planning Desk
              </h3>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions, India&rsquo;s premier legal and
                  testamentary advisory practice. Our tax and estate division has structured over
                  ₹2,400 Crore in ancestral real estate transactions, cross-border NRI repatriations,
                  and Section 54/54F compliance filings across Delhi-NCR, Mumbai, Bengaluru, Hyderabad,
                  and Punjab.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-extrabold text-[#172228]">₹2,400+ Cr</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                      Estate Value Handled
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-extrabold text-[#172228]">100% Passed</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                      IT Dept Scrutiny Record
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-extrabold text-[#172228]">15CA / 15CB</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                      In-House CA Certification
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-extrabold text-[#172228]">45+ Years</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">
                      Combined Senior Counsel
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Section 54 &amp; 54F
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; STATUTORY CODES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Income Tax Department Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.incometax.gov.in/iec/foportal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] flex items-center justify-between text-slate-700 transition"
                >
                  <span className="font-semibold">Income Tax Department e-Filing Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] flex items-center justify-between text-slate-700 transition"
                >
                  <span className="font-semibold">India Code: Income Tax Act, 1961</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] flex items-center justify-between text-slate-700 transition"
                >
                  <span className="font-semibold">Supreme Court of India (Tax Precedents)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.rbi.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] flex items-center justify-between text-slate-700 transition"
                >
                  <span className="font-semibold">RBI Master Direction: NRI Remittance</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </section>

            {/* DUAL CONVERSION CTA BANNER */}
            <div className="rounded-3xl bg-gradient-to-r from-[#172228] to-slate-900 text-white p-6 sm:p-10 shadow-xl space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C65378] bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
                  DUAL CONVERSION PATHWAY
                </span>
                <div className="text-xl sm:text-2xl font-black text-white">
                  Protect Your Family Wealth: Write a Tax-Efficient Will or Consult on NRI Property Sale
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Avoid future property disputes and capital gains complications. Draft your legally
                  binding registered Will online, or let our senior tax attorneys structure your
                  inherited property sale and cross-border repatriation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Draft Tax-Efficient Will</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/services/nri-inherited-property-sale-repatriation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition"
                >
                  <Landmark className="w-4 h-4 text-[#5F7E75]" />
                  <span>NRI Property Sale &amp; Repatriation</span>
                </Link>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-5">
            {/* Action Box 1: Dual Conversion Action Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>TAX-EFFICIENT ESTATE DRAFT</span>
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                Plan Real Estate Succession Without Tax Leakage
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inheritance through a Will is 100% tax-free under Section 56(2)(x). Avoid family litigation
                and safeguard Section 54 benefits for your children.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Draft Your Will Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/services/nri-inherited-property-sale-repatriation"
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Landmark className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>NRI Sale &amp; Repatriation Desk</span>
              </Link>
            </div>

            {/* Action Box 2: Quick Reinvestment Summary */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Clock className="w-4 h-4 text-[#5F7E75]" />
                <span>Key Deadlines Cheat Sheet</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>1-Year Prior:</strong> Ready house purchase
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2-Year Window:</strong> Future ready flat purchase
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>3-Year Window:</strong> Complete new construction
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>July 31 / Oct 31:</strong> Mandatory CGAS deposit
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Box 3: Budget 2024 Alert */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <TrendingDown className="w-4 h-4 text-[#C65378]" />
                <span>Budget 2024 LTCG Rate</span>
              </div>
              <div className="text-sm font-bold">12.5% Flat or 20% Grandfathered</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If the property was bought before July 23, 2024, resident heirs can calculate both 12.5%
                without indexation and 20% with indexation and pay whichever is lower.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
