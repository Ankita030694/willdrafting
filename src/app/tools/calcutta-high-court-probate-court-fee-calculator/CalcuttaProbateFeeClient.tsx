"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Clock,
  Receipt,
  IndianRupee,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Basis: WB Court-Fees Act Art. 10" },
  { id: "interactive-calculator", label: "2. Calcutta High Court Fee Calculator" },
  { id: "slab-structure", label: "3. Article 10 Slab Rates & Rs 50,000 Cap" },
  { id: "schedule-three-deductions", label: "4. Schedule III Net Value & Deductions" },
  { id: "section-213-repeal", label: "5. Section 213 Repeal: Do You Need Probate?" },
  { id: "forum-jurisdiction", label: "6. High Court Original Side vs District Court" },
  { id: "mihir-saha-timing", label: "7. When to Pay Fees: Mihir Saha Rule" },
  { id: "comparison-table", label: "8. Probate vs LOA vs Succession Certificate" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Chapter XXXV & GRIPS" },
  { id: "practical-case-studies", label: "10. Kolkata Case Studies: Ballygunge & Salt Lake" },
  { id: "checklist-and-schedule", label: "11. Schedule III Format & Paper Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Estate Counsel" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Kolkata Probate" },
  { id: "statutory-citations", label: "14. Official Acts, Cases & Government Portals" },
];

const FAQS = [
  {
    q: "What is the maximum court fee for probate in Calcutta High Court?",
    a: "Under Schedule I, Article 10 of the West Bengal Court-Fees Act, 1970 (as amended in 2000 and 2002), the top court fee for probate or Letters of Administration is Rs 50,000. The Calcutta High Court confirmed this Rs 50,000 cap in Amitabha Saha v. Sriparna Biswas (2024). Always confirm your exact figure with the Taxing Officer before payment.",
  },
  {
    q: "Is probate still mandatory in Kolkata after the 2025 amendment?",
    a: "No. Parliament removed Section 213 of the Indian Succession Act, 1925 through the Repealing and Amending Act, 2025 (effective December 20, 2025). You do not need probate as a strict legal bar to prove a Will in court. Still, Kolkata Municipal Corporation, Salt Lake societies, and major banks often ask for probate to ensure clear title.",
  },
  {
    q: "When do I pay the ad valorem probate court fee in West Bengal?",
    a: "You pay only a small filing stamp when you submit the petition. In Mihir Saha v. Tanmoy Saha (AIR 2005 Cal 231), the Calcutta High Court held that ad valorem fee liability starts only when the Court grants probate. You deposit the full fee after the Taxing Officer checks your asset valuation.",
  },
  {
    q: "What debts can I deduct under Schedule III of the West Bengal Court-Fees Act?",
    a: "Under Section 32 and Schedule III Annexure B, you can deduct valid unpaid debts of the deceased, home loans or mortgage dues, fair funeral costs, and trust assets held without personal benefit. Court fee applies only to the net estate value left after these deductions.",
  },
  {
    q: "Should I file in Calcutta High Court or Alipore District Court?",
    a: "Both courts have power under Section 300 of the Indian Succession Act, 1925. File in Calcutta High Court Original Side (Chapter XXXV) if the deceased lived in Kolkata city limits or held over Rs 10,000 in assets outside West Bengal. File before the District Judge or District Delegate at Alipore, Barasat, or Howrah if all assets sit in one district.",
  },
  {
    q: "How do I pay probate court fees online in West Bengal?",
    a: "Pay online through the West Bengal WBIFMS-GRIPS portal or the Calcutta High Court e-Courts payment link. Pick the correct judicial court fee head of account, pay via net banking, UPI, or card, and attach the Cyber Receipt (GRN) for the Taxing Officer to verify.",
  },
  {
    q: "What happens if an heir files a caveat against my probate petition?",
    a: "Under Section 284 and Chapter XXXV of the Original Side Rules, any heir with a legal share may file a caveat and affidavit in support. Once contested, the case turns into a Testamentary Suit (T.S.). Witness trials then extend the timeline to 2.5 to 5 years.",
  },
];

interface SlabBreakdownRow {
  label: string;
  rateLabel: string;
  taxableAmount: number;
  fee: number;
}

const STATUTORY_CAP = 50000;

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

function computeWestBengalArticle10(netEstate: number): {
  uncappedFee: number;
  cappedFee: number;
  capApplied: boolean;
  rows: SlabBreakdownRow[];
} {
  const value = Math.max(0, netEstate);
  const slabs = [
    { min: 0, max: 2000, rate: 0, label: "Up to Rs 2,000", rateLabel: "Exempt (0%)" },
    { min: 2000, max: 10000, rate: 0.02, label: "Rs 2,001 to Rs 10,000", rateLabel: "2%" },
    { min: 10000, max: 50000, rate: 0.03, label: "Rs 10,001 to Rs 50,000", rateLabel: "3%" },
    { min: 50000, max: 100000, rate: 0.04, label: "Rs 50,001 to Rs 1,00,000", rateLabel: "4%" },
    { min: 100000, max: 250000, rate: 0.05, label: "Rs 1,00,001 to Rs 2,50,000", rateLabel: "5%" },
    { min: 250000, max: 500000, rate: 0.05, label: "Rs 2,50,001 to Rs 5,00,000", rateLabel: "5%" },
    {
      min: 500000,
      max: Number.POSITIVE_INFINITY,
      rate: 0.055,
      label: "Above Rs 5,00,000",
      rateLabel: "5.5%",
    },
  ];

  const rows: SlabBreakdownRow[] = [];
  let totalUncapped = 0;

  for (const s of slabs) {
    if (value > s.min) {
      const taxableAmount = Math.min(value, s.max) - s.min;
      const fee = taxableAmount * s.rate;
      totalUncapped += fee;
      rows.push({
        label: s.label,
        rateLabel: s.rateLabel,
        taxableAmount,
        fee,
      });
    } else {
      rows.push({
        label: s.label,
        rateLabel: s.rateLabel,
        taxableAmount: 0,
        fee: 0,
      });
    }
  }

  const uncappedFee = Math.round(totalUncapped);
  const capApplied = uncappedFee > STATUTORY_CAP;
  const cappedFee = capApplied ? STATUTORY_CAP : uncappedFee;

  return { uncappedFee, cappedFee, capApplied, rows };
}

export default function CalcuttaProbateFeeClient() {
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
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculator Inputs
  const [grantType, setGrantType] = useState<"probate" | "loa_with_will" | "loa_intestate">(
    "probate"
  );
  const [forum, setForum] = useState<"calcutta_hc" | "district_court">("calcutta_hc");
  const [disputeStatus, setDisputeStatus] = useState<"uncontested" | "contested">("uncontested");
  const [applyStatutoryCap, setApplyStatutoryCap] = useState<boolean>(true);
  const [hasOutOfStateAssets, setHasOutOfStateAssets] = useState<boolean>(false);

  // Gross Assets (Annexure A)
  const [immovableValue, setImmovableValue] = useState<number>(8500000); // Rs 85 Lakh
  const [movableValue, setMovableValue] = useState<number>(2000000); // Rs 20 Lakh

  // Schedule III Deductions (Annexure B)
  const [debtsAndLoans, setDebtsAndLoans] = useState<number>(450000); // Rs 4.5 Lakh
  const [funeralAndTrust, setFuneralAndTrust] = useState<number>(50000); // Rs 50,000

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
    setForum("calcutta_hc");
    setDisputeStatus("uncontested");
    setApplyStatutoryCap(true);
    setHasOutOfStateAssets(false);
    setImmovableValue(8500000);
    setMovableValue(2000000);
    setDebtsAndLoans(450000);
    setFuneralAndTrust(50000);
  };

  const calc = useMemo(() => {
    const grossEstate = Math.max(0, immovableValue) + Math.max(0, movableValue);
    const totalDeductions = Math.min(
      grossEstate,
      Math.max(0, debtsAndLoans) + Math.max(0, funeralAndTrust)
    );
    const netEstate = Math.max(0, grossEstate - totalDeductions);

    const { uncappedFee, cappedFee, capApplied, rows } = computeWestBengalArticle10(netEstate);
    const payableCourtFee = applyStatutoryCap ? cappedFee : uncappedFee;
    const capSavings = applyStatutoryCap && capApplied ? uncappedFee - cappedFee : 0;

    // Practical ancillary court & publication estimates (clearly labeled as non-statutory estimates)
    const citationCostEstimate = forum === "calcutta_hc" ? 20000 : 12000;
    const registryAndMiscEstimate = forum === "calcutta_hc" ? 8500 : 5000;
    const estimatedTotalOutlay = payableCourtFee + citationCostEstimate + registryAndMiscEstimate;

    const effectiveRate = netEstate > 0 ? (payableCourtFee / netEstate) * 100 : 0;

    const timelineLabel =
      disputeStatus === "uncontested"
        ? forum === "calcutta_hc"
          ? "8 to 14 Months"
          : "6 to 12 Months"
        : forum === "calcutta_hc"
          ? "2.5 to 5 Years (Testamentary Suit)"
          : "2 to 4.5 Years (Contentious Suit)";

    const bondNote =
      grantType === "probate"
        ? "No Administration Bond required under Section 291 (Grant to named Executor)."
        : "Administration Bond with surety required under Section 291 unless waived by Court.";

    const recommendedForum = hasOutOfStateAssets
      ? "Calcutta High Court (Original Side) for All-India grant under Section 273."
      : forum === "calcutta_hc"
        ? "Calcutta High Court (Original Side, Chapter XXXV Rules)."
        : "District Judge / District Delegate Court (Alipore, Barasat, Howrah, or local district).";

    return {
      grossEstate,
      totalDeductions,
      netEstate,
      uncappedFee,
      cappedFee,
      capApplied,
      payableCourtFee,
      capSavings,
      rows,
      citationCostEstimate,
      registryAndMiscEstimate,
      estimatedTotalOutlay,
      effectiveRate,
      timelineLabel,
      bondNote,
      recommendedForum,
    };
  }, [
    immovableValue,
    movableValue,
    debtsAndLoans,
    funeralAndTrust,
    applyStatutoryCap,
    forum,
    disputeStatus,
    grantType,
    hasOutOfStateAssets,
  ]);

  const copyScheduleToClipboard = () => {
    const text = `SCHEDULE III VALUATION FORMAT (WEST BENGAL COURT-FEES ACT, 1970 - SECTION 32)
IN THE HIGH COURT AT CALCUTTA (TESTAMENTARY AND INTESTATE JURISDICTION)

ANNEXURE A: VALUATION OF MOVABLE AND IMMOVABLE PROPERTY
1. Immovable Property (Kolkata / West Bengal Flats, Land, Houses): ${formatINR(immovableValue)}
2. Movable Assets (Bank FDs, Shares, Mutual Funds, Gold, Cash): ${formatINR(movableValue)}
GROSS ESTATE VALUE (ANNEXURE A): ${formatINR(calc.grossEstate)}

ANNEXURE B: SCHEDULE OF DEBTS AND DEDUCTIONS
1. Bona Fide Unpaid Debts, Home Loans & Mortgage Dues: ${formatINR(debtsAndLoans)}
2. Funeral Expenses & Non-Beneficial Trust Property: ${formatINR(funeralAndTrust)}
TOTAL DEDUCTIONS (ANNEXURE B): ${formatINR(calc.totalDeductions)}

NET ASSESSABLE ESTATE VALUE (A minus B): ${formatINR(calc.netEstate)}
ESTIMATED AD VALOREM FEE (SCHEDULE I, ARTICLE 10): ${formatINR(calc.payableCourtFee)}
(Subject to scrutiny by Taxing Officer under Chapter XXXV, Rule 4)`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `CALCUTTA HIGH COURT PROBATE FILING CHECKLIST (CHAPTER XXXV RULES)
1. Original signed Will (plus 2 photocopies for registry verification).
2. Original Municipal Death Certificate of the Will maker (KMC or Panchayat).
3. Affidavit of at least one Attesting Witness proving execution under Section 63.
4. Affidavit of Assets and Valuation in Schedule III (Annexure A & Annexure B).
5. Full list of Class I / intestate legal heirs with current postal addresses.
6. Consent Affidavits (No Objection) from non-contesting legal heirs to speed up grant.
7. Title Deeds, KMC Assessment Extract, Bank Statements, and Demat Holding Statements.
8. WBIFMS-GRIPS Cyber Receipt (GRN) for ad valorem court fee paid after Taxing Officer order.`;
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
            <span>WEST BENGAL COURT-FEES ACT, 1970 • SCHEDULE I ARTICLE 10</span>
          </div>

          {/* Strict Single H1 Tag (48 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Calcutta High Court Probate Court Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate your exact West Bengal probate and Letters of Administration fees in seconds.
            Apply Schedule III debt deductions, check the Rs 50,000 cap, and estimate Kolkata filing
            costs.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Probate Court Fee</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/probate-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Gavel className="w-4 h-4 text-[#C65378]" />
              <span>Hire Kolkata Probate Lawyer</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 50,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WB AMENDMENT MAX COURT FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2% to 5.5%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SCHEDULE I ART. 10 SLABS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Chapter XXXV</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CALCUTTA HC ORIGINAL SIDE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">WBIFMS-GRIPS</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ONLINE E-COURT FEE PORTAL
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
                <span>West Bengal Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the West Bengal Court-Fees Act, 1970 (Schedule I Art. 10 &amp; Schedule
                III), Chapter XXXV Original Side Rules, and the 2025 repeal of Section 213.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE CALCULATOR
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>QUICK SUMMARY: CALCUTTA HIGH COURT PROBATE FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Governing Law &amp; Slabs:</strong> Probate and Letters of
                    Administration fees follow Schedule I, Article 10 of the West Bengal Court-Fees
                    Act, 1970. Rates step up from 2% to 5.5% on net estate value.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rs 50,000 Statutory Maximum Cap:</strong> Under the West Bengal
                    Court-Fees Amendments (affirmed in <em>Amitabha Saha v. Sriparna Biswas</em>,
                    Calcutta HC 2024), the court fee hits its Rs 50,000 cap once net assets pass Rs
                    9.84 Lakh.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pay Only Before Final Grant:</strong> Under{" "}
                    <em>Mihir Saha v. Tanmoy Saha</em> (AIR 2005 Cal 231), you pay only a small
                    filing fee at the start. Full ad valorem duty is paid only when the Court grants
                    probate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Post-2025 Section 213 Update:</strong> Parliament omitted Section 213 in
                    December 2025. Probate is now optional in law, yet Kolkata banks, housing
                    societies, and KMC mutation offices still ask for it in high-value transfers.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Basis: West Bengal Court-Fees Act Art. 10
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Probate is a court order that proves a Will is real and valid. In West Bengal, the{" "}
                  <strong>West Bengal Court-Fees Act, 1970</strong> sets the court fee you must pay
                  before a court issues this grant.
                </p>
                <p>
                  <strong>Schedule I, Article 10</strong> covers both Probate of a Will and Letters
                  of Administration. Read with <strong>Section 32</strong> of the Act, no court can
                  sign the final grant until you file a verified asset valuation under{" "}
                  <strong>Schedule III</strong> and pay the proper court fee.
                </p>
                <p>
                  Note one common mix-up in Kolkata courts. Article 10 of Schedule I applies to
                  Probate and Letters of Administration. Article 11 of Schedule I applies only to
                  Succession Certificates for bank debts and shares under Part X of the Indian
                  Succession Act, 1925.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE PROBATE FEE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Calcutta High Court Probate Fee Calculator Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your asset values and Schedule III debts below. See your net taxable estate,
                slab-wise fee breakdown, Rs 50,000 cap savings, and full Kolkata filing budget.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Input Row 1: Grant Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose Petition Type</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "probate",
                        label: "Probate of Will",
                        desc: "Will names an Executor (Section 276). No admin bond needed.",
                      },
                      {
                        id: "loa_with_will",
                        label: "LOA with Will Annexed",
                        desc: "Will exists, but no Executor is named or alive (Section 232).",
                      },
                      {
                        id: "loa_intestate",
                        label: "LOA Without Will",
                        desc: "Person died without a Will; heirs seek court grant (Section 278).",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setGrantType(opt.id as "probate" | "loa_with_will" | "loa_intestate")
                        }
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
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

                {/* Input Row 2: Court Forum & Case Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Filing Court in West Bengal</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "calcutta_hc",
                          label: "Calcutta High Court",
                          desc: "Original Side (Chapter XXXV)",
                        },
                        {
                          id: "district_court",
                          label: "District Court / Delegate",
                          desc: "Alipore, Barasat, Howrah",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setForum(opt.id as "calcutta_hc" | "district_court")}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            forum === opt.id
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

                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Gavel className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Family Consent Status</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "uncontested",
                          label: "Uncontested (Consent)",
                          desc: "All heirs agree; no caveat filed",
                        },
                        {
                          id: "contested",
                          label: "Contested (Caveat Filed)",
                          desc: "Becomes a Testamentary Suit",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDisputeStatus(opt.id as "uncontested" | "contested")}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            disputeStatus === opt.id
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

                {/* Input Row 3: Gross Estate Value (Annexure A) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: Schedule III Annexure A (Gross Estate Value)</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: "Rs 8L", im: 600000, mv: 200000 },
                        { label: "Rs 25L", im: 2000000, mv: 500000 },
                        { label: "Rs 1 Cr", im: 8000000, mv: 2000000 },
                        { label: "Rs 5 Cr", im: 40000000, mv: 10000000 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setImmovableValue(preset.im);
                            setMovableValue(preset.mv);
                          }}
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="immovable-value"
                        className="block text-xs font-bold text-slate-700"
                      >
                        Immovable Property (Flats, Houses, Land in Rs)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                          ₹
                        </span>
                        <input
                          id="immovable-value"
                          type="number"
                          min={0}
                          step={50000}
                          value={immovableValue}
                          onChange={(e) => setImmovableValue(Math.max(0, Number(e.target.value)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Use West Bengal market value (e-Nathikaran / KMC circle rate).
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="movable-value"
                        className="block text-xs font-bold text-slate-700"
                      >
                        Movable Assets (Bank FDs, Shares, Gold, Cash in Rs)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                          ₹
                        </span>
                        <input
                          id="movable-value"
                          type="number"
                          min={0}
                          step={25000}
                          value={movableValue}
                          onChange={(e) => setMovableValue(Math.max(0, Number(e.target.value)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Include savings balances, demat holdings, and locker jewelry value.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Row 4: Schedule III Deductions (Annexure B) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: Schedule III Annexure B (Allowable Deductions)</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="debts-loans"
                        className="block text-xs font-bold text-slate-700"
                      >
                        Unpaid Debts, Home Loans &amp; Mortgages (Rs)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                          ₹
                        </span>
                        <input
                          id="debts-loans"
                          type="number"
                          min={0}
                          step={10000}
                          value={debtsAndLoans}
                          onChange={(e) => setDebtsAndLoans(Math.max(0, Number(e.target.value)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="funeral-trust"
                        className="block text-xs font-bold text-slate-700"
                      >
                        Funeral Costs &amp; Trust Assets Held (Rs)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                          ₹
                        </span>
                        <input
                          id="funeral-trust"
                          type="number"
                          min={0}
                          step={5000}
                          value={funeralAndTrust}
                          onChange={(e) => setFuneralAndTrust(Math.max(0, Number(e.target.value)))}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyStatutoryCap}
                      onChange={(e) => setApplyStatutoryCap(e.target.checked)}
                      className="mt-0.5 accent-[#C65378] w-4 h-4"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      <strong className="text-slate-900 block">
                        Apply West Bengal Rs 50,000 Maximum Cap
                      </strong>
                      Uncheck to compare against uncapped 5.5% progressive math.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasOutOfStateAssets}
                      onChange={(e) => setHasOutOfStateAssets(e.target.checked)}
                      className="mt-0.5 accent-[#C65378] w-4 h-4"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      <strong className="text-slate-900 block">
                        Assets Over Rs 10,000 Outside West Bengal
                      </strong>
                      Triggers Calcutta High Court Original Side All-India grant (Sec 273).
                    </span>
                  </label>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator Inputs</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Card)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        SCHEDULE I ARTICLE 10 ESTIMATED COURT FEE
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {formatINR(calc.payableCourtFee)}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Net Assessable Estate: <strong>{formatINR(calc.netEstate)}</strong>{" "}
                        (Effective Rate: {calc.effectiveRate.toFixed(2)}%)
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>
                        {applyStatutoryCap && calc.capApplied
                          ? "Rs 50,000 Statutory Cap Active"
                          : "Progressive Slab Applied"}
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        UNCAPPED SLAB CALCULATION
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-200">
                        {formatINR(calc.uncappedFee)}
                      </div>
                      <div className="text-[11px] text-emerald-300 font-semibold">
                        {calc.capSavings > 0
                          ? `You save ${formatINR(calc.capSavings)} via Cap`
                          : "Below Rs 50,000 ceiling threshold"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        EST. TOTAL FILING BUDGET*
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {formatINR(calc.estimatedTotalOutlay)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Includes ~{formatINR(calc.citationCostEstimate)} paper notice &amp;{" "}
                        {formatINR(calc.registryAndMiscEstimate)} registry
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        EXPECTED KOLKATA TIMELINE
                      </div>
                      <div className="text-sm sm:text-base font-black text-white leading-snug">
                        {calc.timelineLabel}
                      </div>
                      <div className="text-[11px] text-slate-300">Excludes lawyer fees</div>
                    </div>
                  </div>

                  {/* Slab Breakdown Mini-Table */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Slab-by-Slab Fee Breakdown (West Bengal Act, 1970 Art. 10)</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] sm:text-xs text-slate-200">
                        <thead className="border-b border-white/10 text-slate-400">
                          <tr>
                            <th className="py-1.5 pr-3">Estate Value Slab</th>
                            <th className="py-1.5 px-2">Rate</th>
                            <th className="py-1.5 px-2 text-right">Taxable Slice</th>
                            <th className="py-1.5 pl-2 text-right">Slab Fee</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {calc.rows.map((r) => (
                            <tr key={r.label}>
                              <td className="py-1.5 pr-3">{r.label}</td>
                              <td className="py-1.5 px-2 text-rose-200 font-semibold">
                                {r.rateLabel}
                              </td>
                              <td className="py-1.5 px-2 text-right">
                                {formatINR(r.taxableAmount)}
                              </td>
                              <td className="py-1.5 pl-2 text-right font-bold text-white">
                                {formatINR(r.fee)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Legal Notes */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Forum &amp; Compliance Guidance:</span>
                    </div>
                    <p>
                      <strong>Recommended Forum:</strong> {calc.recommendedForum}
                    </p>
                    <p>
                      <strong>Section 291 Bond Rule:</strong> {calc.bondNote}
                    </p>
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-white/10">
                      *Newspaper citation and registry figures are practical Kolkata estimates, not
                      fixed statutory charges. Final court fee is always verified by the Taxing
                      Officer or Stamp Reporter prior to grant.
                    </p>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help filing in Calcutta High Court or Alipore District Court?
                    </div>
                    <Link
                      href="/services/probate-lawyer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book Kolkata Probate Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>WEST BENGAL PROBATE FEE GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Calcutta High Court
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/calcutta-high-court-probate-court-fee-calculator-og.jpg"
                  alt="Calcutta High Court Probate Court Fee Calculator - West Bengal Art. 10 Slabs"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Schedule I Article 10 probate fee slabs, Rs 50,000 ceiling, and Chapter XXXV
                Original Side filing roadmap for Kolkata estates.
              </p>
            </div>

            {/* SECTION 3: SLAB STRUCTURE & RS 50,000 CAP */}
            <section id="slab-structure" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Receipt className="w-4 h-4" />
                <span>STATUTORY FEE SCHEDULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 10 Slab Rates &amp; Rs 50,000 Maximum Cap
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  West Bengal uses a stepped slab model under Schedule I, Article 10. You do not pay
                  the top rate on the whole estate. Each value slice pays only its own bracket rate.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-extrabold">Net Estate Value Bracket</th>
                        <th className="p-3.5 font-extrabold text-rose-200">Ad Valorem Rate</th>
                        <th className="p-3.5 font-extrabold text-emerald-300">
                          Max Fee in Bracket
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Up to Rs 2,000</td>
                        <td className="p-3.5 text-emerald-700 font-bold">Exempt (0%)</td>
                        <td className="p-3.5">Rs 0</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Rs 2,001 to Rs 10,000</td>
                        <td className="p-3.5">2% on slice above Rs 2,000</td>
                        <td className="p-3.5">Rs 160</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Rs 10,001 to Rs 50,000</td>
                        <td className="p-3.5">3% on slice above Rs 10,000</td>
                        <td className="p-3.5">Rs 1,200</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Rs 50,001 to Rs 1,00,000
                        </td>
                        <td className="p-3.5">4% on slice above Rs 50,000</td>
                        <td className="p-3.5">Rs 2,000</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">
                          Rs 1,00,001 to Rs 5,00,000
                        </td>
                        <td className="p-3.5">5% on slice above Rs 1,00,000</td>
                        <td className="p-3.5">Rs 20,000</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Above Rs 5,00,000</td>
                        <td className="p-3.5 text-[#C65378] font-bold">
                          5.5% on excess (Capped at Rs 50,000)
                        </td>
                        <td className="p-3.5 font-extrabold text-emerald-700">
                          Rs 50,000 Max Total
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Calcutta High Court Ruling on the Rs 50,000 Cap</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    In <em>Amitabha Saha &amp; Anr. v. Smt. Sriparna Biswas</em> (C.O. 1972 of 2019,
                    decided February 16, 2024), the Calcutta High Court noted that the West Bengal
                    Court-Fees Amendment raised the maximum cap from Rs 10,000 to{" "}
                    <strong>Rs 50,000</strong>. Because Taxing Officer scrutiny can still raise
                    valuation queries on multi-state grants, our calculator displays both the capped
                    and uncapped figures clearly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SCHEDULE III DEDUCTIONS */}
            <section id="schedule-three-deductions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SCHEDULE III VALUATION AFFIDAVIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Schedule III Net Value &amp; Legal Debt Deductions
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 32 of the West Bengal Court-Fees Act requires an Affidavit of Valuation in
                  Schedule III format. You list gross assets in Annexure A and subtract valid debts
                  in Annexure B.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Deduction 1
                    </div>
                    <div className="font-bold text-slate-800">Unpaid Loans &amp; Debts</div>
                    <p className="text-slate-600 leading-relaxed">
                      Subtract verified home loans, bank dues, unpaid income tax, and mortgage
                      claims against estate homes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Deduction 2
                    </div>
                    <div className="font-bold text-slate-800">Funeral &amp; Last Rite Costs</div>
                    <p className="text-slate-600 leading-relaxed">
                      Reasonable last rite and funeral costs paid from the estate reduce the net
                      assessable amount.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Deduction 3
                    </div>
                    <div className="font-bold text-slate-800">Trust Assets &amp; Overpayments</div>
                    <p className="text-slate-600 leading-relaxed">
                      Exclude property held only as trustee. Under Section 24, you may seek a refund
                      from the Board of Revenue if you overvalued the estate.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Collector Valuation Inquiry Under Section 31</span>
                  </div>
                  <p className="leading-relaxed">
                    Do not understate Kolkata flat or land values. Under Section 31, the Court sends
                    a copy of your Schedule III affidavit to the Collector. If the Collector finds
                    under-valuation, you must amend the valuation and pay deficit court fees.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECTION 213 REPEAL 2025 */}
            <section id="section-213-repeal" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>2025 PARLIAMENTARY REFORM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 213 Omitted (Dec 2025): Is Probate Still Needed?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For a full century, Section 213 read with Section 57 of the Indian Succession Act
                  made probate mandatory in old Presidency towns like Calcutta. Heirs could not
                  enforce a Kolkata Will in court without probate.
                </p>
                <p>
                  On <strong>December 20, 2025</strong>, Parliament enacted the{" "}
                  <strong>Repealing and Amending Act, 2025</strong> and omitted Section 213 in full.
                  Probate is now legally optional across India, including Kolkata.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>When You Still Need Probate:</strong> Cooperative housing societies in
                    Salt Lake, New Town, and South Kolkata often still ask for probate or consent
                    from all heirs before issuing share transfers.
                  </li>
                  <li>
                    <strong>KMC &amp; BanglarBhumi Mutation:</strong> Mutation clerks ask for either
                    a probated Will or No Objection affidavits from all Class I legal heirs.
                  </li>
                  <li>
                    <strong>Protection Against Family Fights:</strong> Probate is a judgment in rem
                    valid against the whole world. It blocks future forgery or undue influence
                    claims.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 6: FORUM JURISDICTION */}
            <section id="forum-jurisdiction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>JURISDICTION &amp; VENUE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Calcutta High Court Original Side vs District Court
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 300 of the Indian Succession Act, the Calcutta High Court shares
                  probate power with West Bengal District Judges. Choosing the right court saves
                  months of delay.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-black text-slate-900 text-sm">
                      Calcutta High Court (Original Side)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Governed by Clause 34 of the Letters Patent and{" "}
                      <strong>Chapter XXXV of the Original Side Rules, 1914</strong>. Best when the
                      Will maker lived in Kolkata city limits or owned property worth over Rs 10,000
                      outside West Bengal (Section 273 All-India grant).
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-black text-slate-900 text-sm">
                      District Judge / District Delegate Courts
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Includes Alipore (South 24 Parganas), Barasat (North 24 Parganas), Howrah, and
                      Hooghly courts. Under Section 265, a District Delegate handles smooth,
                      uncontested probates faster when all assets sit inside West Bengal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: MIHIR SAHA PAYMENT TIMING */}
            <section id="mihir-saha-timing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PAYMENT TIMING PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. When to Pay Court Fees: Mihir Saha (2005) Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families worry they must pay Rs 50,000 on day one. That is not required under
                  West Bengal law.
                </p>
                <p>
                  In <strong>Mihir Saha &amp; Anr. v. Tanmoy Saha &amp; Ors.</strong> (AIR 2005 Cal
                  231), the Calcutta High Court laid down two firm rules:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Nominal Filing Fee First:</strong> You pay only the fixed Schedule II
                    application stamp when filing the Section 276 petition.
                  </li>
                  <li>
                    <strong>Ad Valorem Fee at Grant Stage:</strong> Liability to pay Schedule I,
                    Article 10 duty arises only when the Court approves the grant. The fee rate
                    active on the date of grant applies.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>GRANT COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison: Probate vs LOA vs Succession Certificate
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare the three court grants available in West Bengal under the Indian Succession
                Act, 1925 and West Bengal Court-Fees Act, 1970.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Parameter</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Probate of Will</th>
                      <th className="p-3.5 font-extrabold text-amber-200">
                        Letters of Administration
                      </th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Succession Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">When Used</td>
                      <td className="p-3.5">Valid Will names an Executor.</td>
                      <td className="p-3.5">No Will, or Will has no living Executor.</td>
                      <td className="p-3.5">No Will; only bank cash, FDs, or shares.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Covers Real Estate?</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Yes (Flats, Land, Cash)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Yes (Flats, Land, Cash)</td>
                      <td className="p-3.5 text-rose-700 font-bold">No (Movable debts only)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">WB Court-Fees Article</td>
                      <td className="p-3.5">Schedule I, Article 10</td>
                      <td className="p-3.5">Schedule I, Article 10</td>
                      <td className="p-3.5">Schedule I, Article 11</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Section 291 Admin Bond</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Not Required</td>
                      <td className="p-3.5">Required with surety</td>
                      <td className="p-3.5">Indemnity bond may be ordered</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Typical Timeline</td>
                      <td className="p-3.5">8 to 14 Months (Uncontested)</td>
                      <td className="p-3.5">9 to 16 Months (Uncontested)</td>
                      <td className="p-3.5">5 to 9 Months (Uncontested)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>GIFTING KOLKATA PROPERTY INSTEAD OF PROBATE?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check West Bengal Gift Deed Rs 1,000 Family Stamp Duty Cap
                </div>
                <p className="text-xs text-slate-600">
                  Compare Calcutta probate expenses against the 0.5% family gift duty cap under the
                  West Bengal Finance Act, 2024.
                </p>
              </div>
              <Link
                href="/tools/west-bengal-gift-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open WB Gift Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>FILING &amp; GRIPS PAYMENT ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Chapter XXXV Filing &amp; GRIPS Payment
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to file a clean probate petition and pay court fees in
                  Kolkata without registry objections:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Draft Section 276 Petition & Schedule III Valuation",
                      desc: "Prepare the petition under Chapter XXXV of Calcutta High Court Original Side Rules. Attach the original Will, death certificate, and Annexure A & B asset schedule.",
                    },
                    {
                      title: "Collect Attesting Witness & Heir Consent Affidavits",
                      desc: "Get an affidavit from at least one attesting witness confirming Section 63 signing. Obtain No Objection consent affidavits from all legal heirs to avoid citation delays.",
                    },
                    {
                      title: "File Petition & Clear Taxing Officer Scrutiny",
                      desc: "File electronically or at the Testamentary Department with the nominal Schedule II filing stamp. The Taxing Officer verifies your Schedule III valuation under Rule 4.",
                    },
                    {
                      title: "Issue Citations & Newspaper Notice",
                      desc: "If any heir has not signed consent, the Court issues special citations and orders a general notice in one English and one Bengali daily in Kolkata.",
                    },
                    {
                      title: "Pay Ad Valorem Fee via WBIFMS-GRIPS",
                      desc: "Once the Court approves the grant, log into WBIFMS-GRIPS (wbifms.gov.in), select Judicial Court Fees for Calcutta High Court, pay via net banking or UPI, and save the Cyber Receipt (GRN).",
                    },
                    {
                      title: "Receive Sealed Grant & File Inventory",
                      desc: "Submit the GRN to the registry to collect the sealed Probate certificate. Under Section 317, file a true inventory within 6 months and final accounts within 1 year.",
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

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>WORKED KOLKATA EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Case Studies: Ballygunge, Salt Lake &amp; Howrah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Ballygunge Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rs 3.20 Crore South Kolkata Estate with Rs 20 Lakh Loan
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> Gross estate is Rs 3.20 Cr. After deducting Rs 20L
                    home loan under Annexure B, net value is Rs 3.00 Cr.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Court Fee:</strong> Uncapped 5.5% math equals Rs 16,45,860. With West
                    Bengal&rsquo;s <strong>Rs 50,000 cap</strong>, the family pays Rs 50,000 court
                    fee in Calcutta High Court.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Salt Lake Sector II</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rs 6 Lakh Bank &amp; Demat Estate (Below Cap)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> A retired professor left Rs 6.50 Lakh in bank FDs and
                    Rs 50,000 unpaid medical bills. Net estate is Rs 6,00,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Court Fee:</strong> Progressive Article 10 slabs compute{" "}
                    <strong>Rs 28,860</strong> (below the Rs 50,000 cap). Filed smoothly at Barasat
                    District Delegate Court.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Kolkata + Mumbai</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Multi-State Assets Under Section 273 All-India Grant
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> Deceased lived in Alipore and owned a Rs 90 Lakh
                    Kolkata home plus a Rs 1.50 Cr Pune flat.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Venue &amp; Fee:</strong> Because assets outside West Bengal exceed Rs
                    10,000, the executor files directly in{" "}
                    <strong>Calcutta High Court Original Side</strong> for one pan-India grant.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SCHEDULE III FORMAT & PAPER CHECKLIST */}
            <section id="checklist-and-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>READY-TO-USE COURT FORMATS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Schedule III Valuation Format &amp; Document Checklist
              </h3>

              {/* Box 1: Live Schedule III Summary */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Your Live Schedule III Valuation Draft (Annexure A &amp; B)
                  </div>
                  <button
                    type="button"
                    onClick={copyScheduleToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
{`SCHEDULE III VALUATION SUMMARY (WEST BENGAL COURT-FEES ACT, 1970 - SECTION 32)
Annexure A - Immovable Assets: ${formatINR(immovableValue)}
Annexure A - Movable Assets:   ${formatINR(movableValue)}
Gross Estate Value:            ${formatINR(calc.grossEstate)}

Annexure B - Debts & Loans:    ${formatINR(debtsAndLoans)}
Annexure B - Funeral & Trust:  ${formatINR(funeralAndTrust)}
Total Deductions:              ${formatINR(calc.totalDeductions)}

Net Assessable Estate Value:   ${formatINR(calc.netEstate)}
Estimated Art. 10 Court Fee:   ${formatINR(calc.payableCourtFee)}`}
                </pre>
              </div>

              {/* Box 2: Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Required Documents for Calcutta High Court Probate
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
                    "Original signed Will (plus 2 clear copies)",
                    "Municipal Death Certificate (KMC / Panchayat)",
                    "Attesting Witness Affidavit (Section 63 proof)",
                    "Schedule III Affidavit of Valuation (Annexure A & B)",
                    "Complete Class I Legal Heirs Address List",
                    "Consent Affidavits from Non-Contesting Heirs",
                    "Title Deeds, KMC Tax Bill & Bank Statements",
                    "WBIFMS-GRIPS Cyber Receipt (GRN) for Court Fee",
                  ].map((doc) => (
                    <div key={doc} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
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
                12. Institutional Profile: West Bengal Estate Counsel
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in High Court Probate &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s dedicated Will and succession platform, powered
                  by AMA Legal Solutions. Our High Court probate team handles uncontested grants,
                  Taxing Officer valuations, caveat defense, and KMC mutation across Kolkata and
                  West Bengal.
                </p>

                {/* Related Tools & Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/bombay-high-court-probate-court-fee-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Bombay HC Fee Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Need Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/letters-of-administration-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>LOA Filing Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/attesting-witness-affidavit-probate-format"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Witness Affidavit Format</span>
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
                13. Frequently Asked Questions: Kolkata Probate Fees
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] cursor-pointer"
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

            {/* SECTION 14: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations, Precedents &amp; Official Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All calculations and rules on this page rely on West Bengal statutes, the Indian
                  Succession Act, 1925, and published Calcutta High Court judgments. This tool gives
                  general legal information and is not individual legal advice.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.calcuttahighcourt.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Calcutta High Court Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://wbifms.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>WBIFMS-GRIPS e-Court Fee Portal</span>
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
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Probate Tools, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      All-India Probate Fee Calculator
                    </Link>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Certificate Fee Tool
                    </Link>
                    <Link
                      href="/tools/west-bengal-gift-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      West Bengal Gift Deed Calculator
                    </Link>
                    <Link
                      href="/services/high-court-testamentary-suit-contested-will-defense"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Contested Will Defense Service
                    </Link>
                    <Link
                      href="/templates/caveat-petition-high-court-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      High Court Caveat Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY STRIP (Matching Reference Design) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Probate Fees Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear cost math helps your family plan ahead. You know the exact Rs 50,000 fee cap
                  and paper notice bills before you step into court.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Write a Clear Will First</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A neat Will names a trusted executor and lists each asset clearly. Good wording
                  stops court delays and helps heirs get title fast.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your Will, value each asset under Schedule III, and file your
                  case in Calcutta High Court or Alipore with zero guesswork.
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
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializes in High Court probate grants, Letters of Administration, contested
                testamentary suits, and clear Will drafting across India.
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
                  <span>AVOID COURT DELAYS FOR YOUR FAMILY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Probate-Ready Will Online in 15 Mins
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Name an executor, list your Kolkata home and bank assets clearly, and cut probate
                  friction for your spouse and kids.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Will Draft</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Section 63 Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - KOLKATA PROBATE DESK (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CALCUTTA HIGH COURT PROBATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need End-to-End Probate Filing in Kolkata?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our West Bengal advocates handle Chapter XXXV petitions, Schedule III valuation,
                  GRIPS court fees, and caveat defense.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
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
                      <strong>West Bengal Act Accuracy:</strong> Exact Schedule I Art. 10 slabs and
                      Rs 50,000 cap math.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2025 Law Updated:</strong> Reflects Section 213 repeal and KMC
                      mutation rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Steps:</strong> Covers Taxing Officer scrutiny and
                      WBIFMS-GRIPS payment.
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
        <Link
          href="/services/probate-lawyer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Probate Lawyer</span>
        </Link>
      </div>
    </div>
  );
}
