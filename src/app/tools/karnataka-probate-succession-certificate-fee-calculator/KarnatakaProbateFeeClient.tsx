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
  PhoneCall,
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
  FileText,
  Layers,
  IndianRupee,
  Clock,
  MapPin,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Karnataka Probate & Succession Fee Law" },
  { id: "interactive-calculator", label: "2. Free Karnataka Court Fee Calculator" },
  { id: "article-6-7-slabs", label: "3. Schedule I Art. 6 & 7 Slabs Explained" },
  { id: "section-53-deductions", label: "4. Section 53 Deductions & Valuation Date" },
  { id: "caveat-contested-fee", label: "5. Caveat & Contested Suit Fee Proviso" },
  { id: "section-213-karnataka", label: "6. Is Probate Mandatory in Karnataka?" },
  { id: "eligibility-jurisdiction", label: "7. Eligibility & Court Forum in Karnataka" },
  { id: "comparison-table", label: "8. Probate vs LOA vs Succession Certificate" },
  { id: "step-by-step-sop", label: "9. Step-by-Step P&SC Filing Guide" },
  { id: "practical-examples", label: "10. Worked Examples: Bengaluru & Mysuru" },
  { id: "checklist-templates", label: "11. Document Checklist & Schedule III Guide" },
  { id: "institutional-profile", label: "12. Legal Review & Advisory Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Acts & Related Tools" },
];

const FAQS = [
  {
    q: "What is the maximum court fee for Probate or a Succession Certificate in Karnataka?",
    a: "Under Schedule I, Article 6 of the Karnataka Court-Fees and Suits Valuation Act, 1958 (amended by Act 12 of 2000), values up to Rs 1,000 are exempt. Values from Rs 1,001 to Rs 3,00,000 pay 3%. Values above Rs 3,00,000 pay 5% or Rs 30,000, whichever is less. Most Karnataka courts apply Rs 30,000 as the overall cap, while a literal stacked reading of clauses 6(a) and 6(b) reaches Rs 38,970.",
  },
  {
    q: "Is Probate mandatory for a Will in Bengaluru or Karnataka?",
    a: "No. Probate was not mandatory for Hindu Wills made in Karnataka even earlier. In addition, the Repealing and Amending Act, 2025 removed Section 213 of the Indian Succession Act across India. Still, banks, housing societies, or buyers in Bengaluru may ask for voluntary probate if a Will is unregistered or challenged.",
  },
  {
    q: "How does Karnataka calculate court fees for a Succession Certificate?",
    a: "Schedule I, Article 7 links the Succession Certificate fee directly to the Probate scale in Article 6. You calculate it only on the debts and securities listed in the petition, such as bank FDs, shares, or mutual funds. If you later extend the certificate to new securities under Section 376, you pay 1.5 times the Article 6 rate on the added value.",
  },
  {
    q: "Which debts and expenses can I deduct under Section 53 before paying court fee?",
    a: "Under Section 53(2)(a) and Schedule III (Annexure B), you can subtract genuine debts owed by the deceased, reasonable funeral expenses, and mortgage encumbrances on estate assets. You cannot deduct debts linked to assets excluded from a partial grant petition.",
  },
  {
    q: "Do I pay the full court fee on the day I file the P&SC petition?",
    a: "No. When you file an uncontested P&SC petition, you pay only a small fixed fee of Rs 5, Rs 10, or Rs 25 under Schedule II, Article 11(l). You deposit the ad valorem grant fee via Khajane-2 only after the judge allows the petition and before the court seals the grant.",
  },
  {
    q: "What if a relative files a caveat and contests the Will in Karnataka?",
    a: "Under the proviso to Schedule II, Article 11(l), once a caveat is filed and the court registers the petition as a contested suit, the fee rules change. As clarified in Smt. N. Gajalakshmi v. N. Nagaraja Reddy (2014), the petitioner must then pay half (50%) of the civil suit fee under Schedule I, Article 1 on the estate value, minus the fixed fee already paid.",
  },
  {
    q: "Which court hears Probate and Succession Certificate cases in Bengaluru?",
    a: "Under Section 371 of the Indian Succession Act, the District Judge has primary power. In Bengaluru Urban, you file the P&SC petition before the Principal City Civil and Sessions Judge. In Mysuru, Mangaluru, Hubballi, or other districts, you file in the District Court. Appeals go to the High Court of Karnataka under Section 384.",
  },
];

type GrantType = "probate" | "loa" | "succession_initial" | "succession_extension";
type CapInterpretation = "overall_30k" | "stacked_38970";
type FilingTiming = "within_1_year" | "after_1_year";
type ContestStatus = "uncontested" | "contested_caveat";
type JurisdictionArea = "bengaluru_urban" | "other_district" | "pan_india";

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

export default function KarnatakaProbateFeeClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculator State
  const [grantType, setGrantType] = useState<GrantType>("probate");
  const [grossValue, setGrossValue] = useState<number>(2500000);
  const [deductibleDebts, setDeductibleDebts] = useState<number>(200000);
  const [funeralExpenses, setFuneralExpenses] = useState<number>(50000);
  const [mortgageAmount, setMortgageAmount] = useState<number>(0);
  const [filingTiming, setFilingTiming] = useState<FilingTiming>("within_1_year");
  const [capMode, setCapMode] = useState<CapInterpretation>("overall_30k");
  const [contestStatus, setContestStatus] = useState<ContestStatus>("uncontested");
  const [jurisdictionArea, setJurisdictionArea] = useState<JurisdictionArea>("bengaluru_urban");

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

  const handleReset = () => {
    setGrantType("probate");
    setGrossValue(2500000);
    setDeductibleDebts(200000);
    setFuneralExpenses(50000);
    setMortgageAmount(0);
    setFilingTiming("within_1_year");
    setCapMode("overall_30k");
    setContestStatus("uncontested");
    setJurisdictionArea("bengaluru_urban");
  };

  // Deductions apply to Probate & LOA under Section 53(2)(a); Succession Certificates are assessed on gross listed debts/securities
  const isSuccessionCert =
    grantType === "succession_initial" || grantType === "succession_extension";
  const totalDeductions = isSuccessionCert
    ? 0
    : Math.max(0, deductibleDebts) + Math.max(0, funeralExpenses) + Math.max(0, mortgageAmount);
  const netAssessableValue = Math.max(0, Math.max(0, grossValue) - totalDeductions);

  // Schedule I, Article 6 Computation (Amended by Karnataka Act 12 of 2000)
  // Up to Rs 1,000: Nil
  // Rs 1,001 to Rs 3,00,000: 3% on value in excess of Rs 1,000 up to Rs 3,00,000 (max Rs 8,970)
  // Above Rs 3,00,000: 5% on excess over Rs 3,00,000, or Rs 30,000 whichever is less
  const slabAValue =
    netAssessableValue > 1000 ? Math.min(netAssessableValue, 300000) - 1000 : 0;
  const slabAFee = slabAValue * 0.03;

  const slabBValue = netAssessableValue > 300000 ? netAssessableValue - 300000 : 0;
  const slabBRawFee = slabBValue * 0.05;
  const slabBCappedFee = Math.min(slabBRawFee, 30000);

  const rawStackedBaseFee = slabAFee + slabBCappedFee; // max Rs 38,970
  const baseArticle6Fee =
    capMode === "overall_30k" ? Math.min(slabAFee + slabBRawFee, 30000) : rawStackedBaseFee;

  // Schedule I, Article 7 Extension Multiplier: 1.5x for Section 376 extension
  const isExtension = grantType === "succession_extension";
  const grantCourtFee = Math.round(isExtension ? baseArticle6Fee * 1.5 : baseArticle6Fee);
  const capHit =
    capMode === "overall_30k" ? slabAFee + slabBRawFee >= 30000 : slabBRawFee >= 30000;

  // Schedule II, Article 11(l) Initial Fixed Filing Fee
  let initialFilingFee = 25;
  if (jurisdictionArea !== "pan_india") {
    if (netAssessableValue <= 2000) {
      initialFilingFee = 5;
    } else if (netAssessableValue <= 10000) {
      initialFilingFee = 10;
    } else {
      initialFilingFee = 25;
    }
  }

  // Jurisdiction Forum Text
  const forumLabel =
    jurisdictionArea === "bengaluru_urban"
      ? "Principal City Civil & Sessions Court, Bengaluru (P&SC Filing)"
      : jurisdictionArea === "other_district"
        ? "Principal District & Sessions Court (Deceased's District in Karnataka)"
        : "High Court of Karnataka / Principal District Court (Pan-India Effect)";

  const statutoryArticleLabel = isSuccessionCert
    ? isExtension
      ? "Schedule I, Article 7 (1.5x Sec. 376 Extension)"
      : "Schedule I, Article 7 (pegged to Article 6)"
    : "Schedule I, Article 6 (Act 12 of 2000)";

  const valuationRuleNote =
    filingTiming === "within_1_year"
      ? "Section 53(1): Market value is assessed as on the date of death (filed within 1 year)."
      : "Section 53(1): Market value is assessed as on the date of filing the petition (filed after 1 year).";

  const effectiveRate =
    netAssessableValue > 0 ? ((grantCourtFee / netAssessableValue) * 100).toFixed(2) : "0.00";

  const copyScheduleTemplate = () => {
    const text = `SCHEDULE III (PART I) VALUATION SUMMARY - KARNATAKA COURT-FEES ACT, 1958
(Under Sections 52 & 53, Karnataka Court-Fees and Suits Valuation Act, 1958)

ANNEXURE A - VALUATION OF MOVABLE AND IMMOVABLE PROPERTY:
1. Cash, Bank Balances & Fixed Deposits: Rs. [Amount]
2. Shares, Demat Securities & Mutual Funds: Rs. [Amount]
3. Immovable Property (Site / Flat / Land per Sub-Registrar Guidance Value): Rs. [Amount]
GROSS ESTATE VALUE: ${formatINR(grossValue)}

ANNEXURE B - SCHEDULE OF DEBTS & DEDUCTIONS (Section 53(2)(a)):
1. Bona fide Debts due by Deceased: ${formatINR(deductibleDebts)}
2. Funeral Expenses: ${formatINR(funeralExpenses)}
3. Mortgage Encumbrances on Estate Assets: ${formatINR(mortgageAmount)}
TOTAL DEDUCTIONS: ${formatINR(totalDeductions)}

NET ASSESSABLE VALUE: ${formatINR(netAssessableValue)}
ESTIMATED GRANT COURT FEE (${statutoryArticleLabel}): ${formatINR(grantCourtFee)}
INITIAL FILING FEE (Schedule II, Article 11(l)): ${formatINR(initialFilingFee)}`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `KARNATAKA P&SC FILING CHECKLIST (PROBATE / LOA / SUCCESSION CERTIFICATE)
1. Original Death Certificate of the deceased (BBMP / Municipal / Gram Panchayat).
2. Original Will (with 2 witness affidavits for Probate) or Intestate Heirship Affidavit.
3. Family Tree (Vamshavruksha) issued by Revenue Tahsildar / Nadakacheri.
4. Schedule III Part I Valuation Statement in duplicate (Annexure A & Annexure B).
5. Title deeds, BBMP e-Khata / RTC Pahani, and Sub-Registrar guidance value sheet (for Probate/LOA).
6. Bank letters, FD receipts, demat CML/holdings statements (for Succession Certificate).
7. Identity & address proofs of all legal heirs plus No-Objection Affidavits (for uncontested grant).
8. Khajane-2 (K2) e-Court Fee receipt / challan for initial fee and final grant fee.`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>KARNATAKA COURT-FEES ACT, 1958 • SCHEDULE I ART. 6 &amp; 7</span>
          </div>

          {/* Strict Single H1 Tag (59 chars, 0 em-dashes, distinct from title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Karnataka Probate and Succession Certificate Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Estimate exact court fees for Probate, Letters of Administration, and Succession
            Certificates in Bengaluru and Karnataka. Check 3% and 5% slabs, the Rs 30,000 cap,
            Section 53 deductions, and caveat conversion rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Court Fee Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Valid Will Online</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">3% &amp; 5% Slabs</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SCHEDULE I ART. 6 &amp; 7
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 30,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KARNATAKA ACT 12 OF 2000
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1.5x Rate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC. 376 CERT. EXTENSION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec. 53 Relief</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DEBT &amp; FUNERAL DEDUCTIONS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Calculator)
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Based on the Karnataka Court-Fees and Suits Valuation Act, 1958 (Act 12 of 2000 &amp;
                Act 10 of 2003) and the Indian Succession Act, 1925.
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
                <span>QUICK SUMMARY: KARNATAKA PROBATE &amp; P&amp;SC COURT FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Same Rate for Probate &amp; Succession Certificate:</strong> Schedule I,
                    Article 7 pegs Succession Certificate fees to the exact Article 6 Probate scale.
                    Estates up to Rs 1,000 pay Nil, Rs 1,001 to Rs 3 lakh pay 3%, and excess pays 5%
                    subject to the Rs 30,000 cap clause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominal Filing Fee Upfront:</strong> Uncontested P&amp;SC petitions need
                    only Rs 5 to Rs 25 at filing under Schedule II, Article 11(l). You pay the main
                    grant fee only after the judge allows your petition.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Deductions Lower Your Estate Value:</strong> Under Section 53(2)(a), you
                    can deduct valid debts, funeral costs, and property mortgages before the court
                    assesses Probate or LOA fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caveat Triggers Higher Suit Fee:</strong> If a relative contests the Will
                    via a caveat, the petition turns into a civil suit. You must then pay 50% of the
                    Article 1 ad valorem suit fee on the estate value.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: SINGLE H2 ON THE ENTIRE PAGE (55 chars, 0 em-dashes) */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Karnataka Probate and Succession Court Fee Framework
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a family member passes away in Bengaluru or anywhere in Karnataka, heirs often
                  need a court grant to transfer assets. Banks, demat firms, and land buyers ask for
                  proof of legal title.
                </p>
                <p>
                  Karnataka levies court fees for these grants under the{" "}
                  <strong>Karnataka Court-Fees and Suits Valuation Act, 1958</strong>. Three rules
                  control the total cost. First, <strong>Schedule I, Article 6</strong> sets the fee
                  for Probate and Letters of Administration (LOA). Second,{" "}
                  <strong>Schedule I, Article 7</strong> sets the fee for Succession Certificates.
                  Third, <strong>Schedule II, Article 11(l)</strong> sets the initial petition fee and
                  the contested suit fee.
                </p>
                <p>
                  In 2000, the state passed <strong>Karnataka Act No. 12 of 2000</strong> to give
                  relief to families. Earlier, high-value estates faced an uncapped 10% court fee. The
                  amendment lowered the slabs to 3% and 5% and added a statutory{" "}
                  <strong>Rs 30,000 ceiling clause</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE FEE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Karnataka Probate &amp; Succession Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your petition type and enter the asset values below. The tool computes your net
                assessable estate under Section 53, exact slab fees, and court forum in real time.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Input 1: Grant Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Court Grant / P&amp;SC Petition Type</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "probate",
                        label: "Probate of Will",
                        desc: "Schedule I, Art. 6 (Named executor under valid Will)",
                      },
                      {
                        id: "loa",
                        label: "Letters of Admin (LOA)",
                        desc: "Schedule I, Art. 6 (No Will or no named executor)",
                      },
                      {
                        id: "succession_initial",
                        label: "Succession Certificate",
                        desc: "Schedule I, Art. 7 (Bank FDs, shares & debts only)",
                      },
                      {
                        id: "succession_extension",
                        label: "Cert. Extension (s. 376)",
                        desc: "Schedule I, Art. 7 (1.5x fee on newly added assets)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGrantType(opt.id as GrantType)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          grantType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 2: Asset Value & Section 53 Deductions */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="gross-estate-value"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                      >
                        <IndianRupee className="w-4 h-4 text-[#C65378]" />
                        <span>
                          {isSuccessionCert
                            ? isExtension
                              ? "Value of Newly Added Debts / Securities (Rs)"
                              : "Total Value of Debts & Securities (Rs)"
                            : "Gross Market Value of Estate Assets (Rs)"}
                        </span>
                      </label>
                      <input
                        id="gross-estate-value"
                        type="number"
                        min={0}
                        step={10000}
                        value={grossValue}
                        onChange={(e) => setGrossValue(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378] focus:border-[#C65378]"
                      />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[250000, 500000, 1000000, 2500000, 10000000].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setGrossValue(preset)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                              grossValue === preset
                                ? "bg-[#172228] text-white border-[#172228]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {preset >= 10000000
                              ? "Rs 1 Cr"
                              : `Rs ${(preset / 100000).toFixed(preset % 100000 === 0 ? 0 : 1)}L`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Valuation Timing under Section 53(1) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C65378]" />
                        <span>Section 53(1) Filing Timeline</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          {
                            id: "within_1_year",
                            label: "Within 1 Year of Death",
                            desc: "Value on date of death applies",
                          },
                          {
                            id: "after_1_year",
                            label: "After 1 Year of Death",
                            desc: "Value on filing date applies",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFilingTiming(opt.id as FilingTiming)}
                            className={`text-left p-3 rounded-xl border transition-all ${
                              filingTiming === opt.id
                                ? "border-[#C65378] bg-rose-50/50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 53(2)(a) Deductions for Probate / LOA */}
                  {!isSuccessionCert ? (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                        <span>Section 53(2)(a) Permissible Deductions (Schedule III Annexure B)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label
                            htmlFor="deductible-debts"
                            className="text-[11px] font-bold text-slate-700"
                          >
                            Verified Debts Owed (Rs)
                          </label>
                          <input
                            id="deductible-debts"
                            type="number"
                            min={0}
                            step={5000}
                            value={deductibleDebts}
                            onChange={(e) =>
                              setDeductibleDebts(Math.max(0, Number(e.target.value) || 0))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="funeral-expenses"
                            className="text-[11px] font-bold text-slate-700"
                          >
                            Funeral Expenses (Rs)
                          </label>
                          <input
                            id="funeral-expenses"
                            type="number"
                            min={0}
                            step={5000}
                            value={funeralExpenses}
                            onChange={(e) =>
                              setFuneralExpenses(Math.max(0, Number(e.target.value) || 0))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="mortgage-encumbrances"
                            className="text-[11px] font-bold text-slate-700"
                          >
                            Property Mortgages (Rs)
                          </label>
                          <input
                            id="mortgage-encumbrances"
                            type="number"
                            min={0}
                            step={10000}
                            value={mortgageAmount}
                            onChange={(e) =>
                              setMortgageAmount(Math.max(0, Number(e.target.value) || 0))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Succession Certificate Rule:</strong> Under Schedule I, Article 7,
                        court fee is assessed on the gross value of listed debts and securities.
                        Annexure B estate deductions apply to Probate and LOA under Section 53.
                      </span>
                    </div>
                  )}
                </div>

                {/* Input 3: Cap Mode, Contest Status & Jurisdiction */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {/* Cap Mode */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Article 6 Cap Reading</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "overall_30k",
                          label: "Overall Rs 30,000 Cap",
                          desc: "Common Bengaluru registry practice",
                        },
                        {
                          id: "stacked_38970",
                          label: "Literal Stacked (Rs 38,970)",
                          desc: "Art. 6(a) Rs 8,970 + Art. 6(b) Rs 30k",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCapMode(opt.id as CapInterpretation)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                            capMode === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contested / Caveat Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Proceeding Status</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "uncontested",
                          label: "Uncontested (No Caveat)",
                          desc: "Standard Art. 6 / Art. 7 grant fee",
                        },
                        {
                          id: "contested_caveat",
                          label: "Caveat Filed (Contested)",
                          desc: "Art. 11(l) Proviso: 50% suit scale",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setContestStatus(opt.id as ContestStatus)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                            contestStatus === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Court Jurisdiction */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Asset Location / Effect</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "bengaluru_urban",
                          label: "Bengaluru Urban",
                          desc: "City Civil & Sessions Court",
                        },
                        {
                          id: "other_district",
                          label: "Other Karnataka District",
                          desc: "Principal District Court",
                        },
                        {
                          id: "pan_india",
                          label: "Assets Across India",
                          desc: "Effect throughout India (Rs 25)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setJurisdictionArea(opt.id as JurisdictionArea)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                            jurisdictionArea === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        ESTIMATED KARNATAKA COURT FEE BREAKDOWN
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {formatINR(grantCourtFee)}{" "}
                        <span className="text-xs sm:text-sm font-semibold text-slate-300">
                          (Grant Stage Fee)
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{statutoryArticleLabel}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        NET ASSESSABLE VALUE
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {formatINR(netAssessableValue)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Deductions: {formatINR(totalDeductions)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        INITIAL FILING FEE (ART. 11(l))
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {formatINR(initialFilingFee)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Paid at P&amp;SC filing via Khajane-2
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        EFFECTIVE RATE &amp; CAP STATUS
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-200">
                        {effectiveRate}%{" "}
                        <span className="text-xs font-bold text-slate-300">
                          {capHit ? "(Cap Reached)" : "(Slab Applied)"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Total with Filing: {formatINR(grantCourtFee + initialFilingFee)}
                      </div>
                    </div>
                  </div>

                  {/* Slab Breakdown Strip */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs text-slate-200">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Exact Statutory Slab Calculation:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <div className="text-slate-400">Up to Rs 1,000 (Exempt)</div>
                        <div className="font-bold text-white mt-0.5">Rs 0 (Nil)</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <div className="text-slate-400">Art. 6(a): Rs 1,001 to Rs 3L (3%)</div>
                        <div className="font-bold text-white mt-0.5">
                          {formatINR(slabAFee)} (on {formatINR(slabAValue)})
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5">
                        <div className="text-slate-400">Art. 6(b): Above Rs 3L (5% / Cap)</div>
                        <div className="font-bold text-white mt-0.5">
                          {formatINR(
                            capMode === "overall_30k"
                              ? Math.max(0, baseArticle6Fee - slabAFee)
                              : slabBCappedFee
                          )}{" "}
                          (on {formatINR(slabBValue)})
                        </div>
                      </div>
                    </div>
                    {isExtension && (
                      <div className="text-amber-300 font-semibold pt-1">
                        Section 376 Extension Applied: Base Article 6 fee (
                        {formatINR(baseArticle6Fee)}) multiplied by 1.5 = {formatINR(grantCourtFee)}
                        .
                      </div>
                    )}
                    <div className="pt-2 border-t border-white/10 space-y-1 text-slate-300">
                      <div>
                        <strong className="text-white">Competent Court:</strong> {forumLabel}
                      </div>
                      <div>
                        <strong className="text-white">Valuation Rule:</strong> {valuationRuleNote}
                      </div>
                    </div>
                  </div>

                  {/* Caveat Warning Banner when Contested is Selected */}
                  {contestStatus === "contested_caveat" && (
                    <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-400/40 text-xs text-rose-100 space-y-1.5">
                      <div className="font-extrabold flex items-center gap-2 text-rose-200">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Caveat Triggered: Schedule II, Article 11(l) Proviso Applies</span>
                      </div>
                      <p className="leading-relaxed">
                        Once an objector files a caveat and the court converts the P&amp;SC petition
                        into a contested suit, the Rs 30,000 uncontested cap no longer covers the
                        litigation stage. You must deposit{" "}
                        <strong>50% of the ad valorem civil suit fee under Schedule I, Article 1</strong>{" "}
                        on the estate market value (less the {formatINR(initialFilingFee)} already
                        paid). Ask our Karnataka probate desk to check your exact Article 1 suit
                        valuation before conversion.
                      </p>
                    </div>
                  )}

                  {/* Tool Action Conversion */}
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help filing a Bengaluru P&amp;SC petition or drafting a clear Will?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Consult Karnataka Probate Lawyer</span>
                      </Link>
                      <button
                        onClick={handleStartDraft}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Draft Your Will</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE CARD */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>VISUAL GUIDE: KARNATAKA PROBATE &amp; SUCCESSION COURT FEES</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Karnataka Act 16 of 1958
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/karnataka-probate-succession-certificate-fee-calculator-og.jpg"
                  alt="Karnataka probate and succession certificate court fee calculator for families"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Schedule I Articles 6 and 7 govern court fees for Probates, Letters of
                Administration, and Succession Certificates across Bengaluru and Karnataka.
              </p>
            </div>

            {/* SECTION 3: SCHEDULE I ART 6 & 7 SLABS */}
            <section id="article-6-7-slabs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY FEE TABLE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Schedule I Article 6 &amp; Article 7 Slabs Explained
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Karnataka Act No. 12 of 2000 substituted Schedule I, Article 6 with effect from
                  April 27, 2000. Schedule I, Article 7 adopts the exact same scale for Succession
                  Certificates issued under Part X of the Indian Succession Act, 1925.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-extrabold">Net Estate / Security Value Slab</th>
                        <th className="p-3.5 font-extrabold text-rose-200">Statutory Clause</th>
                        <th className="p-3.5 font-extrabold text-emerald-300">Prescribed Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Up to Rs 1,000</td>
                        <td className="p-3.5">Exempt Threshold</td>
                        <td className="p-3.5 font-bold text-emerald-700">Nil (Rs 0)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Above Rs 1,000 up to Rs 3,00,000
                        </td>
                        <td className="p-3.5">Schedule I, Art. 6(a)</td>
                        <td className="p-3.5 font-bold text-slate-900">
                          3% on excess over Rs 1,000 (max Rs 8,970)
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Above Rs 3,00,000</td>
                        <td className="p-3.5">Schedule I, Art. 6(b)</td>
                        <td className="p-3.5 font-bold text-[#C65378]">
                          5% on excess or Rs 30,000, whichever is less
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Succession Cert. Extension (s. 376)
                        </td>
                        <td className="p-3.5">Schedule I, Art. 7</td>
                        <td className="p-3.5 font-bold text-slate-900">
                          1.5x of Article 6 fee on newly added securities
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Why Our Calculator Shows Both Cap Readings (Rs 30,000 vs Rs 38,970)</span>
                  </div>
                  <p className="leading-relaxed">
                    Court offices in Bengaluru widely treat Rs 30,000 as the total maximum cap for
                    uncontested grants. However, reading clause 6(a) (up to Rs 8,970) plus clause
                    6(b) (up to Rs 30,000) strictly line by line yields Rs 38,970. Always confirm the
                    challan figure with the court sheristedar before paying on Khajane-2.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SECTION 53 DEDUCTIONS & VALUATION DATE */}
            <section id="section-53-deductions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>VALUATION &amp; RELIEF RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 53 Deductions &amp; Valuation Date Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Sections 52, 53, and 56 of the Karnataka Court-Fees Act explain how to value an
                  estate fairly. You must file a valuation statement in duplicate using{" "}
                  <strong>Part I of Schedule III</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 53(1): Date Rule
                    </div>
                    <div className="font-bold text-slate-900">1-Year Filing Window</div>
                    <p className="text-slate-600 leading-relaxed">
                      File within 1 year of death to lock in the market value on the date of death.
                      If you file later, the court uses the higher value on the filing date.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 53(2)(a): Annexure B
                    </div>
                    <div className="font-bold text-slate-900">Allowable Deductions</div>
                    <p className="text-slate-600 leading-relaxed">
                      Subtract verified personal debts, funeral expenses, and active home loan
                      mortgages from the gross estate value before computing the fee.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Sections 52 &amp; 56: DC Check
                    </div>
                    <div className="font-bold text-slate-900">Deputy Commissioner Audit</div>
                    <p className="text-slate-600 leading-relaxed">
                      The court sends a copy of your valuation to the Deputy Commissioner. If assets
                      are undervalued, the DC directs a revision before the grant issues.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: CAVEAT & CONTESTED SUIT FEE PROVISO */}
            <section id="caveat-contested-fee" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>CONTENTIOUS PROBATE LITIGATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Caveat Filing &amp; Contested Suit Fee Proviso
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  An uncontested P&amp;SC petition starts with a tiny fixed court fee of Rs 5, Rs 10,
                  or Rs 25 under <strong>Schedule II, Article 11(l)</strong>. Things change sharply if
                  a disinherited heir enters a caveat under Section 284 of the Indian Succession Act.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Karnataka High Court Rule: Smt. N. Gajalakshmi v. N. Nagaraja Reddy (2014)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the proviso to Schedule II, Article 11(l), once a caveat is filed and the
                    court registers the probate petition as a regular suit, the applicant must pay{" "}
                    <strong>one-half (50%) of the ad valorem civil suit fee</strong> prescribed under
                    Schedule I, Article 1 on the estate value, minus the fee already paid. The High
                    Court confirmed that this higher fee applies only when the matter turns contested,
                    not at initial filing.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: IS PROBATE MANDATORY IN KARNATAKA? */}
            <section id="section-213-karnataka" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>INDIAN SUCCESSION ACT UPDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Is Probate Mandatory for a Will in Karnataka?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  <strong>No, probate is not legally mandatory in Karnataka.</strong> Even before
                  2025, Section 213 of the Indian Succession Act applied mainly to Wills made in
                  Mumbai, Kolkata, and Chennai. The <strong>Repealing and Amending Act, 2025</strong>{" "}
                  has now omitted Section 213 completely across India.
                </p>
                <p>
                  Still, obtaining voluntary probate or Letters of Administration in Bengaluru helps
                  in three real-world situations:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Unregistered Wills for High-Value Flats:</strong> Buyers and home-loan
                    banks often insist on a probated Will before clearing a sale in Bengaluru.
                  </li>
                  <li>
                    <strong>BBMP e-Khata &amp; BDA Transfers:</strong> When a Will leaves property
                    outside immediate Class I heirs, revenue officers may ask for a court order.
                  </li>
                  <li>
                    <strong>Preventing Future Heir Disputes:</strong> A probate order acts as a
                    judgment in rem and settles the Will&rsquo;s validity against the whole world.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: ELIGIBILITY & JURISDICTION */}
            <section id="eligibility-jurisdiction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>ELIGIBILITY &amp; COURT FORUM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Eligibility &amp; Competent Courts in Karnataka
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Picking the right petition and court saves months of delay. Check who can apply and
                  where to file under Sections 222, 276, 278, and 371 of the Indian Succession Act:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Who Can Apply for Probate (Sec. 222):</strong> Only the executor named
                    inside the Will. If no executor is named or the executor died, a beneficiary
                    applies for Letters of Administration with Will annexed.
                  </li>
                  <li>
                    <strong>Who Can Apply for Succession Certificate (Sec. 372):</strong> Legal heirs
                    of a person who died without a Will, strictly for movable debts and securities
                    (FDs, bank cash, shares, bonds, PF, and mutual funds).
                  </li>
                  <li>
                    <strong>Bengaluru Urban Forum:</strong> File P&amp;SC petitions before the{" "}
                    <strong>Principal City Civil and Sessions Judge, Bengaluru</strong> (KG Road /
                    Mayo Hall complex).
                  </li>
                  <li>
                    <strong>Other Karnataka Districts &amp; Appeals:</strong> File in the{" "}
                    <strong>Principal District and Sessions Court</strong> where the deceased lived or
                    held assets. Appeals under Section 384 lie before the{" "}
                    <strong>High Court of Karnataka</strong> (Bengaluru, Dharwad, or Kalaburagi
                    Bench).
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SIDE-BY-SIDE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Probate vs LOA vs Succession Certificate in Karnataka
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare which court order covers land, flats, bank accounts, and shares in Karnataka
                and how each is taxed for court fees.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Parameter</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Probate of Will</th>
                      <th className="p-3.5 font-extrabold text-amber-200">
                        Letters of Admin (LOA)
                      </th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Succession Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">When Required</td>
                      <td className="p-3.5">Deceased left a Will naming an executor.</td>
                      <td className="p-3.5">No Will, or Will has no living executor.</td>
                      <td className="p-3.5">No Will; only movable debts &amp; securities.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Covers Land &amp; Flats?</td>
                      <td className="p-3.5 font-bold text-emerald-700">Yes (All estate assets)</td>
                      <td className="p-3.5 font-bold text-emerald-700">Yes (All estate assets)</td>
                      <td className="p-3.5 font-bold text-[#C65378]">No (Movable debts/shares only)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Karnataka Fee Article</td>
                      <td className="p-3.5">Schedule I, Article 6</td>
                      <td className="p-3.5">Schedule I, Article 6</td>
                      <td className="p-3.5">Schedule I, Article 7 (same as Art. 6)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Sec. 53 Debt Deductions</td>
                      <td className="p-3.5">Allowed (Annexure B)</td>
                      <td className="p-3.5">Allowed (Annexure B)</td>
                      <td className="p-3.5">Assessed on gross listed securities</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Extension Fee</td>
                      <td className="p-3.5">Differential fee on newly found assets</td>
                      <td className="p-3.5">Differential fee on newly found assets</td>
                      <td className="p-3.5 font-bold text-slate-900">
                        1.5x of Article 6 fee (Sec. 376)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>TRANSFERRING PROPERTY DURING LIFETIME IN KARNATAKA?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check Karnataka Gift Deed &amp; Release Deed Stamp Duty (Kaveri 2.0)
                </div>
                <p className="text-xs text-slate-600">
                  Compare family Gift Deed flat Rs 5,000 BBMP slabs and Article 45(b) Release Deed
                  costs against post-death court grants.
                </p>
              </div>
              <Link
                href="/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Stamp Duty Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>P&amp;SC FILING PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Guide to Filing P&amp;SC in Karnataka
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to obtain Probate, LOA, or a Succession Certificate smoothly
                  in Bengaluru or any Karnataka district court:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Collect Death Certificate, Family Tree & Asset Proofs",
                      desc: "Obtain the municipal death certificate, revenue Vamshavruksha (Family Tree) from Nadakacheri, bank balance letters, demat holdings, and BBMP e-Khata or RTC Pahani copies.",
                    },
                    {
                      title: "Prepare Schedule III Valuation & P&SC Petition",
                      desc: "Draft the petition under Section 276, 278, or 372 with duplicate Schedule III Part I valuation sheets listing gross assets (Annexure A) and Section 53 debts (Annexure B).",
                    },
                    {
                      title: "Pay Initial Fixed Fee & File Before District / City Civil Court",
                      desc: "Remit the nominal filing fee (Rs 5 to Rs 25) via Karnataka Khajane-2 e-challan under Schedule II, Article 11(l) and obtain a P&SC case number.",
                    },
                    {
                      title: "Publish Newspaper Citation & Serve Notices",
                      desc: "The court orders a public citation in one English and one Kannada daily newspaper (usually 30 to 45 days) and sends the valuation to the Deputy Commissioner under Section 52.",
                    },
                    {
                      title: "Lead Evidence & Clear Objections",
                      desc: "If no caveat is entered, record petitioner evidence (and one attesting witness for a Will under Section 68 Bharatiya Sakshya Adhiniyam / Evidence Act). If a caveat is filed, convert to a suit.",
                    },
                    {
                      title: "Deposit Final Grant Court Fee on Khajane-2",
                      desc: "Once the judge passes the allowance order, deposit the Article 6 or Article 7 court fee (up to the statutory cap) via Khajane-2 and collect the sealed court grant.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: WORKED EXAMPLES */}
            <section id="practical-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>WORKED FEE ILLUSTRATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Fee Examples: Bengaluru, Mysuru &amp; Hubballi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Bengaluru Flat Probate</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Example 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rs 1.2 Crore Flat with Rs 20 Lakh Home Loan
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Computation:</strong> Gross estate Rs 1,20,00,000 minus Rs 20,00,000
                    mortgage deduction under Section 53 = Rs 1,00,00,000 net value.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Court Fee:</strong> Hits the Karnataka statutory ceiling. Pay Rs 30,000
                    under overall cap practice (or Rs 38,970 under literal stacked Art. 6(a)+6(b))
                    plus Rs 25 filing fee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mysuru Bank FD Claim</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Example 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rs 5,00,000 Bank Fixed Deposits (No Nominee)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Computation:</strong> First Rs 1,000 is Nil. Next Rs 2,99,000 at 3% = Rs
                    8,970. Remaining Rs 2,00,000 above Rs 3 lakh at 5% = Rs 10,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Court Fee:</strong> Total Succession Certificate grant fee under Article
                    7 equals Rs 18,970 (well below the Rs 30,000 cap).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">
                      Hubballi Shares Extension
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Example 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Adding Rs 2,01,000 Demat Shares via Section 376
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Computation:</strong> Base Article 6 fee on Rs 2,01,000 is 3% of Rs
                    2,00,000 = Rs 6,000. Extension multiplier under Article 7 is 1.5x.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Court Fee:</strong> Rs 6,000 x 1.5 = Rs 9,000 court fee to extend the
                    existing Succession Certificate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: CHECKLIST & SCHEDULE III TEMPLATE */}
            <section id="checklist-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>FILING TEMPLATES &amp; CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Document Checklist &amp; Schedule III Valuation Summary
              </h3>

              {/* Box 1: Copyable Schedule III Summary */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Your Live Schedule III (Part I) Valuation Draft Summary
                  </div>
                  <button
                    type="button"
                    onClick={copyScheduleTemplate}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
                  >
                    {copiedSchedule ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {`SCHEDULE III (PART I) VALUATION SUMMARY - KARNATAKA COURT-FEES ACT, 1958
Annexure A (Gross Assets): ${formatINR(grossValue)}
Annexure B (Sec. 53 Deductions - Debts, Funeral, Mortgage): ${formatINR(totalDeductions)}
Net Assessable Value: ${formatINR(netAssessableValue)}
Grant Stage Court Fee (${statutoryArticleLabel}): ${formatINR(grantCourtFee)}
Initial P&SC Filing Fee (Schedule II, Article 11(l)): ${formatINR(initialFilingFee)}`}
                </pre>
              </div>

              {/* Box 2: Required Documents Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Required Document Checklist for Karnataka P&amp;SC Petitions
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
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
                  {[
                    "Original Death Certificate (BBMP / Municipal / Panchayat)",
                    "Original Will & Attesting Witness Affidavit (for Probate)",
                    "Vamshavruksha (Family Tree) from Nadakacheri / Tahsildar",
                    "Duplicate Schedule III Valuation (Annexure A & B)",
                    "BBMP e-Khata / RTC Pahani & Sub-Registrar Guidance Value",
                    "Bank Balance Letters, FD Receipts & Demat Holding Statements",
                    "No-Objection Affidavits (NOC) from Other Legal Heirs",
                    "Khajane-2 (K2) e-Court Fee Challan & Receipt",
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Karnataka Estate Advisory
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Succession &amp; Probate Practice Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our succession lawyers help
                  families across Bengaluru, Mysuru, Mangaluru, and NRI households draft clear Wills,
                  file uncontested P&amp;SC petitions, and defend contested probate suits.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Lawyer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/succession-certificate"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession Cert.</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/letters-of-administration-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>LOA Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-kannada-uyilu"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Kannada Will</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Karnataka Court Fees
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations, Official Portals &amp; Related Tools
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All rates and rules on this page come from official Indian statutes and Karnataka
                  High Court case law. This tool gives general legal estimates and does not replace
                  advice from your advocate on your case papers.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Karnataka Court-Fees Act, 1958</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act, 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Karnataka Gift &amp; Release Duty Tool
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir vs Succession Cert. Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/madras-high-court-probate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Madras HC Probate Fee Tool
                    </Link>
                    <Link
                      href="/tools/bombay-high-court-probate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bombay HC Probate Fee Tool
                    </Link>
                    <Link
                      href="/tools/delhi-district-court-probate-succession-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Probate &amp; Succession Fee Tool
                    </Link>
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Attesting Witness Affidavit Format
                    </Link>
                    <Link
                      href="/templates/caveat-against-probate-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Caveat Against Probate Format
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs NOC Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain-English Reader Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Plan Your Estate Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will saves your family from long court visits. You name who gets your
                  house, flat, land, gold, and bank cash. Put your wishes in writing today.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Keep Court Costs Low</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  File your P&amp;SC case within one year of death to use death-date values. List
                  all debts and loans in Annexure B to cut the net estate value legally.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your title papers, tax records, and bank forms. We draft your
                  Will or P&amp;SC papers in plain words so your heirs get their share fast.
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializes in Indian succession law, Bengaluru &amp; pan-India Probate petitions,
                Succession Certificates, and dispute-free Will drafting.
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
                  <span>PREVENT PROBATE DELAYS</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Write a Clear Registered Will for Your Karnataka Assets
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Protect your Bengaluru flat, land, and bank savings with a lawyer-vetted Will that
                  prevents family fights and costly caveat suits.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>KARNATAKA P&amp;SC FILING DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Filing Probate or Succession Certificate in Bengaluru?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession team handles Schedule III valuation, Khajane-2 court fee challans,
                  and City Civil Court filings end to end.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Karnataka Law:</strong> Built on Schedule I Articles 6 &amp; 7
                      and Act 12 of 2000 amendments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Surprises:</strong> Explains both the Rs 30,000 cap and
                      caveat suit fee triggers clearly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Complete Estate Support:</strong> From Kannada Will formats to
                      Bengaluru P&amp;SC petitions.
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
          <span>Fee Calculator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
