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
  IndianRupee,
  ClipboardCheck,
  ScrollText,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Bombay HC Probate Fees: Law Overview" },
  { id: "interactive-calculator", label: "2. Bombay HC Probate Fee Calculator" },
  { id: "slab-schedule-breakdown", label: "3. Article 10 Slab Rates & ₹75,000 Cap" },
  { id: "widow-fee-relief", label: "4. ₹10,000 Widow Relief (Aug 2024 Rule)" },
  { id: "section-213-repeal", label: "5. 2025 Section 213 Update for Mumbai" },
  { id: "schedule-three-deductions", label: "6. Schedule III Asset & Debt Deductions" },
  { id: "petition-eligibility", label: "7. Jurisdiction & Eligibility Rules" },
  { id: "comparison-table", label: "8. Probate vs LoA vs Succession Fees" },
  { id: "step-by-step-filing", label: "9. Step-by-Step Bombay HC Filing Guide" },
  { id: "worked-examples", label: "10. Worked Mumbai Estate Fee Examples" },
  { id: "document-checklist", label: "11. Petition Checklist & Valuation Format" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Acts & Related Tools" },
];

const FAQS = [
  {
    q: "What is the maximum probate court fee in the Bombay High Court?",
    a: "Under Schedule I, Article 10 of the Maharashtra Court-fees Act, 1959, the top court fee for probate is ₹75,000 for general petitioners. Even if a Mumbai flat and bank assets are worth ₹5 crore or ₹50 crore, the statutory fee stops at ₹75,000.",
  },
  {
    q: "What is the Maharashtra widow probate court fee concession?",
    a: "On August 9, 2024, Maharashtra issued Notification No. Mudrank-2023/C.R.641/M-1(Policy) under Section 46. It cut the top court fee cap for widows from ₹75,000 to ₹10,000. Widows applying for probate, Letters of Administration, or heirship papers save up to ₹65,000.",
  },
  {
    q: "How are the Bombay High Court probate fee slabs calculated?",
    a: "Fees rise in four steps on the net estate value. Up to ₹1,000 is nil. From ₹1,001 to ₹50,000 is 2%. From ₹50,001 to ₹2,00,000 is 4%. From ₹2,00,001 to ₹3,00,000 is 6%. Above ₹3,00,000 is 7.5%, capped at ₹75,000 (or ₹10,000 for widows).",
  },
  {
    q: "Is probate still mandatory in Mumbai after the 2025 amendment?",
    a: "No. The Repealing and Amending Act, 2025 received Presidential assent on December 20, 2025 and removed Section 213 of the Indian Succession Act. Probate is now optional by statute in Mumbai. Even so, housing societies, banks, and flat buyers often request voluntary probate for clean title.",
  },
  {
    q: "What deductions reduce the net estate value for court fees?",
    a: "Under Section 29 and Schedule III of the Maharashtra Court-fees Act, you can subtract unpaid debts of the deceased, home loan mortgages with due interest, fair funeral costs, and assets held only in trust. This lowers the net value before slabs apply.",
  },
  {
    q: "Can a widow claim a refund if she already paid ₹75,000 in court fees?",
    a: "Yes. After the August 9, 2024 rule, the Bombay High Court has allowed refund requests on qualifying petitions. The Testamentary Department refunds the extra ₹65,000 and keeps only the ₹10,000 cap.",
  },
  {
    q: "Does Letters of Administration have the same fee cap as Probate?",
    a: "Yes. Schedule I, Article 10 covers both Probate of a Will and Letters of Administration, with or without a Will. Both use the exact same percentage slabs, the ₹75,000 general cap, and the ₹10,000 widow cap.",
  },
  {
    q: "Where must a Mumbai probate petition be filed?",
    a: "If the deceased lived in Greater Mumbai or left immovable property inside Greater Mumbai, file on the Original Side of the Bombay High Court. Chapter XXVI of the Bombay High Court (Original Side) Rules, 1980 governs the filing.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

function parseNumericInput(val: string): number {
  const cleaned = val.replace(/[^0-9]/g, "");
  if (!cleaned) return 0;
  const num = Number(cleaned);
  return Number.isFinite(num) ? Math.min(num, 10_000_000_000) : 0;
}

export default function BombayProbateFeeClient() {
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
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedValuation, setCopiedValuation] = useState<boolean>(false);

  // Calculator State
  const [petitionType, setPetitionType] = useState<
    "probate" | "loa_with_will" | "loa_without_will"
  >("probate");
  const [petitionerCategory, setPetitionerCategory] = useState<"general" | "widow">("general");
  const [contestStatus, setContestStatus] = useState<"uncontested" | "contested">("uncontested");

  // Schedule III Annexure A (Gross Assets)
  const [immovableValue, setImmovableValue] = useState<number>(15000000); // ₹1.5 Crore Mumbai flat
  const [bankCashValue, setBankCashValue] = useState<number>(1200000); // ₹12 Lakh bank & FDs
  const [sharesMfValue, setSharesMfValue] = useState<number>(800000); // ₹8 Lakh shares & MF
  const [goldMovableValue, setGoldMovableValue] = useState<number>(500000); // ₹5 Lakh gold/movables

  // Schedule III Annexure B (Permissible Deductions)
  const [mortgageDues, setMortgageDues] = useState<number>(500000); // ₹5 Lakh home loan/mortgage
  const [unpaidDebts, setUnpaidDebts] = useState<number>(150000); // ₹1.5 Lakh debts
  const [funeralExpenses, setFuneralExpenses] = useState<number>(50000); // ₹50k funeral costs

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
    setPetitionType("probate");
    setPetitionerCategory("general");
    setContestStatus("uncontested");
    setImmovableValue(15000000);
    setBankCashValue(1200000);
    setSharesMfValue(800000);
    setGoldMovableValue(500000);
    setMortgageDues(500000);
    setUnpaidDebts(150000);
    setFuneralExpenses(50000);
  };

  const applyPreset = (flat: number, bank: number, shares: number, gold: number, loan: number) => {
    setImmovableValue(flat);
    setBankCashValue(bank);
    setSharesMfValue(shares);
    setGoldMovableValue(gold);
    setMortgageDues(loan);
    setUnpaidDebts(0);
    setFuneralExpenses(50000);
  };

  // Exact Statutory Calculation Engine: Maharashtra Court-fees Act, 1959 (Schedule I, Article 10)
  const calc = useMemo(() => {
    const grossEstate =
      immovableValue + bankCashValue + sharesMfValue + goldMovableValue;
    const totalDeductions = mortgageDues + unpaidDebts + funeralExpenses;
    const netEstate = Math.max(0, grossEstate - totalDeductions);

    // Article 10: If net estate <= Rs 1,000 => Nil
    let slab1Base = 0;
    let slab1Fee = 0;
    let slab2Base = 0;
    let slab2Fee = 0;
    let slab3Base = 0;
    let slab3Fee = 0;
    let slab4Base = 0;
    let slab4Fee = 0;

    if (netEstate > 1000) {
      // Clause (i): When value exceeds Rs 1,000, 2% on the amount/value up to Rs 50,000
      slab1Base = Math.min(netEstate, 50000);
      slab1Fee = slab1Base * 0.02;

      // Clause (ii): 4% on part exceeding Rs 50,000 up to Rs 2,00,000
      if (netEstate > 50000) {
        slab2Base = Math.min(netEstate, 200000) - 50000;
        slab2Fee = slab2Base * 0.04;
      }

      // Clause (iii): 6% on part exceeding Rs 2,00,000 up to Rs 3,00,000
      if (netEstate > 200000) {
        slab3Base = Math.min(netEstate, 300000) - 200000;
        slab3Fee = slab3Base * 0.06;
      }

      // Clause (iv): 7.5% on part exceeding Rs 3,00,000
      if (netEstate > 300000) {
        slab4Base = netEstate - 300000;
        slab4Fee = slab4Base * 0.075;
      }
    }

    const uncappedFee = Math.round(slab1Fee + slab2Fee + slab3Fee + slab4Fee);
    const generalCap = 75000;
    const widowCap = 10000;
    const applicableCap = petitionerCategory === "widow" ? widowCap : generalCap;

    const generalPayableFee = Math.min(uncappedFee, generalCap);
    const payableFee = Math.min(uncappedFee, applicableCap);
    const capSavings = Math.max(0, uncappedFee - payableFee);
    const extraWidowRelief =
      petitionerCategory === "widow" ? Math.max(0, generalPayableFee - payableFee) : 0;

    const isExempt = netEstate <= 1000;
    const isCapped = !isExempt && uncappedFee > applicableCap;

    let statusBadge = "Progressive Slab Fee";
    if (isExempt) {
      statusBadge = "Exempt (Net Estate ≤ ₹1,000)";
    } else if (petitionerCategory === "widow" && isCapped) {
      statusBadge = "Widow Cap Applied (₹10,000 Max)";
    } else if (isCapped) {
      statusBadge = "Statutory Cap Applied (₹75,000 Max)";
    }

    const petitionLabel =
      petitionType === "probate"
        ? "Probate of Will (Rule 374, Form 97)"
        : petitionType === "loa_with_will"
          ? "Letters of Administration with Will (Rule 375)"
          : "Letters of Administration without Will (Intestate)";

    const expectedTimeline =
      contestStatus === "uncontested"
        ? "Approx. 6 to 9 Months (Uncontested Grant)"
        : "Approx. 18 to 36+ Months (Testamentary Suit)";

    const effectiveRate = netEstate > 0 ? (payableFee / netEstate) * 100 : 0;

    return {
      grossEstate,
      totalDeductions,
      netEstate,
      slab1Base,
      slab1Fee: Math.round(slab1Fee),
      slab2Base,
      slab2Fee: Math.round(slab2Fee),
      slab3Base,
      slab3Fee: Math.round(slab3Fee),
      slab4Base,
      slab4Fee: Math.round(slab4Fee),
      uncappedFee,
      applicableCap,
      generalPayableFee,
      payableFee,
      capSavings,
      extraWidowRelief,
      isExempt,
      isCapped,
      statusBadge,
      petitionLabel,
      expectedTimeline,
      effectiveRate,
    };
  }, [
    immovableValue,
    bankCashValue,
    sharesMfValue,
    goldMovableValue,
    mortgageDues,
    unpaidDebts,
    funeralExpenses,
    petitionerCategory,
    petitionType,
    contestStatus,
  ]);

  const copySummaryToClipboard = () => {
    const text = `BOMBAY HIGH COURT PROBATE COURT FEE ESTIMATE (MAHARASHTRA COURT-FEES ACT, 1959)
Petition Type: ${calc.petitionLabel}
Petitioner Category: ${petitionerCategory === "widow" ? "Widow (Aug 9, 2024 Notification Cap: ₹10,000)" : "General Petitioner (Statutory Cap: ₹75,000)"}
Gross Estate (Schedule III Annexure A): ${formatINR(calc.grossEstate)}
Permissible Deductions (Schedule III Annexure B): ${formatINR(calc.totalDeductions)}
Net Taxable Estate Value: ${formatINR(calc.netEstate)}
Uncapped Progressive Slab Total: ${formatINR(calc.uncappedFee)}
Final Ad Valorem Court Fee Payable: ${formatINR(calc.payableFee)} (${calc.statusBadge})
Estimated Timeline: ${calc.expectedTimeline}
Note: Statutory ad valorem court fee only; excludes advocate fees, publication charges, and miscellaneous registry stamps.`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const copyValuationToClipboard = () => {
    const text = `SCHEDULE III - FORM OF VALUATION (SECTION 29, MAHARASHTRA COURT-FEES ACT, 1959)
IN THE HIGH COURT OF JUDICATURE AT BOMBAY
TESTAMENTARY AND INTESTATE JURISDICTION

ANNEXURE A - VALUATION OF MOVABLE AND IMMOVABLE PROPERTY OF THE DECEASED:
1. Immovable Property in Greater Mumbai (Market Value on Date of Death): ${formatINR(immovableValue)}
2. Cash in Hand, Bank Savings Accounts & Fixed Deposits: ${formatINR(bankCashValue)}
3. Shares, Demat Holdings, Mutual Funds & Securities: ${formatINR(sharesMfValue)}
4. Gold Ornaments, Jewellery & Other Movable Effects: ${formatINR(goldMovableValue)}
TOTAL GROSS ESTATE (ANNEXURE A): ${formatINR(calc.grossEstate)}

ANNEXURE B - SCHEDULE OF DEBTS AND PERMISSIBLE DEDUCTIONS:
1. Mortgage Encumbrances & Home Loan Dues (with Interest up to Filing Date): ${formatINR(mortgageDues)}
2. Unpaid Personal Debts & Liabilities Due from Deceased: ${formatINR(unpaidDebts)}
3. Reasonable Funeral & Last Rites Expenses: ${formatINR(funeralExpenses)}
TOTAL DEDUCTIONS (ANNEXURE B): ${formatINR(calc.totalDeductions)}

NET VALUE OF ESTATE (A MINUS B): ${formatINR(calc.netEstate)}
COURT FEE PAYABLE UNDER SCHEDULE I, ARTICLE 10: ${formatINR(calc.payableFee)}`;
    navigator.clipboard.writeText(text);
    setCopiedValuation(true);
    setTimeout(() => setCopiedValuation(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `BOMBAY HIGH COURT PROBATE PETITION DOCUMENT CHECKLIST (CHAPTER XXVI RULES):
1. Original Last Will and Testament (plus certified copy for court record).
2. Original Municipal Death Certificate of the Testator (MCGM / local registrar).
3. Affidavit of at least one Attesting Witness (Rule 384, Bombay HC OS Rules).
4. Executor's Oath and Petition in Form No. 97 (Rule 374) with Verification.
5. Schedule I (Annexure A: Gross Assets with Valuation) & Schedule II (Annexure B: Debts & Deductions).
6. Ready Reckoner / Government Approved Valuer Report for Mumbai immovable flats.
7. Bank Balance Certificates, Demat Holding Statements & Share Certificates on date of death.
8. Consent Affidavits from all non-objecting legal heirs (to avoid Citation delays).
9. Proof of Widow Status (Marriage Certificate + Spouse Death Certificate) to claim ₹10,000 cap.
10. Court Fee Payment Receipt (Maharashtra e-Court Fee / GRAS challan).`;
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
            <span>MAHARASHTRA COURT-FEES ACT, 1959 • SCHEDULE I, ARTICLE 10</span>
          </div>

          {/* Strict H1 Tag (46 chars, 0 em-dashes, distinct from Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Bombay High Court Probate Court Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compute exact Bombay High Court probate and Letters of Administration fees in seconds.
            Check progressive slabs, the ₹75,000 statutory cap, the ₹10,000 widow relief rule, and
            Schedule III debt deductions.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Probate Fee Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Probate-Ready Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹75,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GENERAL MAXIMUM COURT FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WIDOW RELIEF (AUG 2024 RULE)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2% to 7.5%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ARTICLE 10 PROGRESSIVE SLABS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 213 Out</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2025 ACT MADE PROBATE OPTIONAL
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
              <nav
                aria-label="Page sections"
                className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs"
              >
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
                <span>Statutory Verification</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on Maharashtra Court-fees Act, 1959 (Schedule I Art. 10 &amp; Schedule III),
                Aug 9, 2024 Widow Cap Notification, and Bombay High Court (Original Side) Rules.
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
                <span>EXECUTIVE BRIEF: BOMBAY HIGH COURT PROBATE FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hard ₹75,000 Statutory Cap:</strong> Under Schedule I, Article 10 of the
                    Maharashtra Court-fees Act, 1959, probate fees stop at ₹75,000. Once a net
                    estate passes ₹11.27 lakh, the court fee stays fixed at ₹75,000 even for a ₹10
                    crore Mumbai home.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>₹10,000 Cap for Widows (Aug 2024 Relief):</strong> Maharashtra cut the
                    top probate court fee for widows to ₹10,000 under Notification No.
                    Mudrank-2023/C.R.641/M-1(Policy). This saves widows up to ₹65,000.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Net Estate Valuation Rule:</strong> Court fees apply to net value, not
                    gross assets. Under Section 29 and Schedule III, you can deduct debts, home
                    loans, and funeral costs first.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Post-2025 Mumbai Rule:</strong> The Repealing and Amending Act, 2025
                    omitted Section 213 of the Indian Succession Act. Probate is now optional by law
                    in Mumbai, though banks and housing societies often still ask for it.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Bombay High Court Probate Fees: Maharashtra Act Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Probate is a court seal that proves a Will is real and valid. In Greater Mumbai,
                  the Testamentary Department on the Original Side of the Bombay High Court grants
                  probate and Letters of Administration.
                </p>
                <p>
                  The court fee is set by <strong>Schedule I, Article 10</strong> of the{" "}
                  <strong>Maharashtra Court-fees Act, 1959</strong>. The law uses four step-up slabs
                  from 2% to 7.5% on the net estate value. To keep Mumbai flat costs fair, the Act
                  caps the maximum court fee at <strong>₹75,000</strong> for general petitioners.
                </p>
                <p>
                  In August 2024, the Maharashtra government added a major relief rule under{" "}
                  <strong>Section 46</strong> of the Act. If a widow files for probate, Letters of
                  Administration, or a legal heirship paper, her maximum court fee is capped at just{" "}
                  <strong>₹10,000</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>LIVE STATUTORY CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Bombay High Court Probate Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your estate assets, debts, and petitioner status below. See your exact slab
                breakdown, statutory cap savings, and final payable court fee at once.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Petition Type */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Testamentary Petition Type</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "probate" as const,
                        label: "Probate of a Will",
                        desc: "Filed by named Executor under Rule 374 (Form 97)",
                      },
                      {
                        id: "loa_with_will" as const,
                        label: "Letters of Admin (With Will)",
                        desc: "Filed by beneficiary when no executor is named or alive",
                      },
                      {
                        id: "loa_without_will" as const,
                        label: "Letters of Admin (No Will)",
                        desc: "Filed by legal heir for an intestate Mumbai estate",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPetitionType(opt.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          petitionType === opt.id
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

                {/* Step 2: Petitioner Category (Cap Rule) */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Select Petitioner Category (Statutory Cap Rule)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPetitionerCategory("general")}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        petitionerCategory === "general"
                          ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-xs text-slate-900">
                          General Petitioner (Executor / Child / Relative)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                          Max ₹75,000
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Standard Article 10 ceiling of ₹75,000 for net estates above ₹11,26,667.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPetitionerCategory("widow")}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        petitionerCategory === "widow"
                          ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-xs text-slate-900">
                          Widow Petitioner (Aug 9, 2024 Relief)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Max ₹10,000
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Reduced ₹10,000 cap under Sec. 46 Notification for widows (saves up to
                        ₹65,000).
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 3: Schedule III Annexure A (Gross Estate Value) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Gross Estate Assets (Schedule III, Annexure A)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: "₹2L Estate", args: [0, 150000, 50000, 0, 0] as const },
                        { label: "₹8L Estate", args: [0, 500000, 200000, 100000, 0] as const },
                        { label: "₹50L Flat", args: [4500000, 300000, 200000, 0, 0] as const },
                        {
                          label: "₹2 Cr Mumbai Flat",
                          args: [18000000, 1200000, 800000, 500000, 500000] as const,
                        },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            applyPreset(
                              preset.args[0],
                              preset.args[1],
                              preset.args[2],
                              preset.args[3],
                              preset.args[4]
                            )
                          }
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-[10px] font-bold text-slate-700 transition-colors cursor-pointer"
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
                        className="block text-xs font-bold text-slate-800"
                      >
                        Mumbai Flat / Immovable Property (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="immovable-value"
                          type="text"
                          inputMode="numeric"
                          value={immovableValue.toLocaleString("en-IN")}
                          onChange={(e) => setImmovableValue(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Market or Ready Reckoner value on the date of death.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="bank-cash-value"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Bank Accounts, Fixed Deposits &amp; Cash (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="bank-cash-value"
                          type="text"
                          inputMode="numeric"
                          value={bankCashValue.toLocaleString("en-IN")}
                          onChange={(e) => setBankCashValue(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Savings balances, FDs, and accrued bank interest.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="shares-mf-value"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Shares, Demat &amp; Mutual Funds (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="shares-mf-value"
                          type="text"
                          inputMode="numeric"
                          value={sharesMfValue.toLocaleString("en-IN")}
                          onChange={(e) => setSharesMfValue(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Listed equities, bonds, PPF, or mutual fund NAVs.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="gold-movable-value"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Gold, Jewellery &amp; Other Movables (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="gold-movable-value"
                          type="text"
                          inputMode="numeric"
                          value={goldMovableValue.toLocaleString("en-IN")}
                          onChange={(e) => setGoldMovableValue(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Locker jewellery, vehicles, and personal valuables.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4: Schedule III Annexure B (Permissible Deductions) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 4: Permissible Deductions (Schedule III, Annexure B)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="mortgage-dues"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Home Loan / Mortgage (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="mortgage-dues"
                          type="text"
                          inputMode="numeric"
                          value={mortgageDues.toLocaleString("en-IN")}
                          onChange={(e) => setMortgageDues(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="unpaid-debts"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Unpaid Debts &amp; Bills (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="unpaid-debts"
                          type="text"
                          inputMode="numeric"
                          value={unpaidDebts.toLocaleString("en-IN")}
                          onChange={(e) => setUnpaidDebts(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="funeral-expenses"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Funeral Expenses (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="funeral-expenses"
                          type="text"
                          inputMode="numeric"
                          value={funeralExpenses.toLocaleString("en-IN")}
                          onChange={(e) => setFuneralExpenses(parseNumericInput(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Expected Legal Heirs Consensus */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: Expected Legal Heir Response (Timeline Check)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setContestStatus("uncontested")}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        contestStatus === "uncontested"
                          ? "border-[#C65378] bg-rose-50/50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">
                        Uncontested (Consent Affidavits Ready)
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        All legal heirs sign Consent Affidavits. Handled in Testamentary Dept.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContestStatus("contested")}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        contestStatus === "contested"
                          ? "border-[#C65378] bg-rose-50/50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">
                        Contested / Caveat Expected
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Heir files Caveat under Rule 401. Converts into a Testamentary Suit.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        PAYABLE BOMBAY HIGH COURT AD VALOREM COURT FEE
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                        {formatINR(calc.payableFee)}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        {calc.petitionLabel} • Effective Fee Rate: {calc.effectiveRate.toFixed(2)}%
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{calc.statusBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        NET ESTATE VALUE (A MINUS B)
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(calc.netEstate)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Gross {formatINR(calc.grossEstate)} minus {formatINR(calc.totalDeductions)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        STATUTORY CAP SAVINGS
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-400">
                        {formatINR(calc.capSavings)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {calc.extraWidowRelief > 0
                          ? `Includes ${formatINR(calc.extraWidowRelief)} extra widow relief`
                          : `Uncapped slab fee: ${formatINR(calc.uncappedFee)}`}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ESTIMATED BOMBAY HC TIMELINE
                      </div>
                      <div className="text-sm sm:text-base font-bold text-rose-200 leading-snug">
                        {calc.expectedTimeline}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Original Side Testamentary Dept.
                      </div>
                    </div>
                  </div>

                  {/* Live Slab Breakdown Table */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="px-4 py-2.5 bg-white/5 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-rose-200">
                      Schedule I, Article 10 Slab-by-Slab Breakdown
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="text-slate-400 border-b border-white/10">
                          <tr>
                            <th className="py-2.5 px-4 font-semibold">Net Estate Slab</th>
                            <th className="py-2.5 px-4 font-semibold">Rate</th>
                            <th className="py-2.5 px-4 font-semibold">Taxable Slice</th>
                            <th className="py-2.5 px-4 font-semibold text-right">Slab Fee</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-slate-200">
                          <tr>
                            <td className="py-2 px-4">₹1,001 to ₹50,000</td>
                            <td className="py-2 px-4">2%</td>
                            <td className="py-2 px-4">{formatINR(calc.slab1Base)}</td>
                            <td className="py-2 px-4 text-right font-bold">
                              {formatINR(calc.slab1Fee)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">₹50,001 to ₹2,00,000</td>
                            <td className="py-2 px-4">4%</td>
                            <td className="py-2 px-4">{formatINR(calc.slab2Base)}</td>
                            <td className="py-2 px-4 text-right font-bold">
                              {formatINR(calc.slab2Fee)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">₹2,00,001 to ₹3,00,000</td>
                            <td className="py-2 px-4">6%</td>
                            <td className="py-2 px-4">{formatINR(calc.slab3Base)}</td>
                            <td className="py-2 px-4 text-right font-bold">
                              {formatINR(calc.slab3Fee)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">Above ₹3,00,000</td>
                            <td className="py-2 px-4">7.5%</td>
                            <td className="py-2 px-4">{formatINR(calc.slab4Base)}</td>
                            <td className="py-2 px-4 text-right font-bold">
                              {formatINR(calc.slab4Fee)}
                            </td>
                          </tr>
                          <tr className="bg-white/5 text-white font-extrabold">
                            <td className="py-2.5 px-4" colSpan={3}>
                              Final Court Fee After{" "}
                              {petitionerCategory === "widow" ? "₹10,000 Widow Cap" : "₹75,000 Cap"}
                            </td>
                            <td className="py-2.5 px-4 text-right text-emerald-400">
                              {formatINR(calc.payableFee)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Statutory Note */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Note on Your Estimate:</span>
                    </div>
                    <p>
                      {calc.isExempt
                        ? "Your net estate value is ₹1,000 or less. Under Schedule I, Article 10, no ad valorem probate court fee is charged."
                        : petitionerCategory === "widow"
                          ? "As a widow petitioner, your court fee is capped at ₹10,000 under the August 9, 2024 Section 46 Maharashtra notification. Attach the marriage certificate and spouse death certificate with the petition."
                          : calc.isCapped
                            ? "Your uncapped slab total crosses ₹75,000. Under Schedule I, Article 10, the Bombay High Court collects only the flat ₹75,000 statutory cap."
                            : "Your net estate is below the cap threshold, so the exact progressive slab sum applies. Verify all Schedule III deductions to avoid overpaying."}
                    </p>
                    <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10">
                      This covers statutory ad valorem court fees only. Small registry filing
                      stamps, newspaper citation fees, valuer fees, and advocate fees are extra.
                    </p>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={copySummaryToClipboard}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Estimate Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Fee Breakdown</span>
                        </>
                      )}
                    </button>
                    <Link
                      href="/services/probate-lawyer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>Consult Bombay HC Probate Lawyer</span>
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
                  <span>BOMBAY HIGH COURT PROBATE COURT FEE GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Maharashtra Court-fees Act
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/bombay-high-court-probate-court-fee-calculator-og.jpg"
                  alt="Bombay High Court Probate Court Fee Calculator and Maharashtra Slabs Guide"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Schedule I Article 10 probate court fees for Mumbai estates, including the ₹75,000
                general cap and ₹10,000 widow concession.
              </p>
            </div>

            {/* SECTION 3: SLAB SCHEDULE BREAKDOWN */}
            <section id="slab-schedule-breakdown" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SCHEDULE I, ARTICLE 10 RATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 10 Slab Rates &amp; the ₹75,000 Cap
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Maharashtra Court-fees Act charges probate duty on a step-by-step scale. You
                  do not pay 7.5% on the whole estate. Each slice of net value carries its own rate.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-extrabold">Net Estate Value Slab</th>
                        <th className="p-3.5 font-extrabold">Statutory Rate</th>
                        <th className="p-3.5 font-extrabold">Max Fee in Slab</th>
                        <th className="p-3.5 font-extrabold">Cumulative Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Up to ₹1,000</td>
                        <td className="p-3.5">Nil (0%)</td>
                        <td className="p-3.5">₹0</td>
                        <td className="p-3.5 font-semibold">₹0</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">₹1,001 to ₹50,000</td>
                        <td className="p-3.5">2% on amount up to ₹50,000</td>
                        <td className="p-3.5">₹1,000</td>
                        <td className="p-3.5 font-semibold">₹1,000</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">₹50,001 to ₹2,00,000</td>
                        <td className="p-3.5">4% on excess over ₹50,000</td>
                        <td className="p-3.5">₹6,000</td>
                        <td className="p-3.5 font-semibold">₹7,000</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">₹2,00,001 to ₹3,00,000</td>
                        <td className="p-3.5">6% on excess over ₹2,00,000</td>
                        <td className="p-3.5">₹6,000</td>
                        <td className="p-3.5 font-semibold">₹13,000</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-900">Above ₹3,00,000</td>
                        <td className="p-3.5">7.5% on excess over ₹3,00,000</td>
                        <td className="p-3.5 text-[#C65378] font-bold">Capped at ₹75,000</td>
                        <td className="p-3.5 font-extrabold text-emerald-800">
                          Max ₹75,000 (Widows: ₹10,000)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  For general petitioners, the ₹75,000 ceiling triggers at a net estate value of{" "}
                  <strong>₹11,26,667</strong>. For widows, the ₹10,000 ceiling triggers at{" "}
                  <strong>₹2,50,000</strong>. Almost every residential flat in Mumbai crosses both
                  marks, so the cap protects families from huge court charges.
                </p>
              </div>
            </section>

            {/* SECTION 4: WIDOW FEE RELIEF (AUGUST 2024 NOTIFICATION) */}
            <section id="widow-fee-relief" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>SECTION 46 STATE RELIEF</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. ₹10,000 Widow Court Fee Cap (August 2024 Rule)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Earlier, women did not receive probate fee waivers in Maharashtra. In{" "}
                  <em>Shehala Pramod Desai v. Nil</em> (AIR 2012 Bom 168), the court held that
                  matrimonial fee waivers did not cover property probate petitions.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Notification No. Mudrank-2023/C.R.641/M-1(Policy) (August 9, 2024)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Using Section 46 of the Maharashtra Court-fees Act, the Revenue and Forests
                    Department slashed the top court fee cap for widows from{" "}
                    <strong>₹75,000 down to ₹10,000</strong>. This applies to Probate, Letters of
                    Administration, and Legal Heirship applications across Maharashtra courts.
                  </p>
                </div>
                <p>
                  The Bombay High Court actively enforces this rule. In refund orders such as{" "}
                  <em>Subhadra Anant Kesarkar v. Rukmini Vithoba Khedekar</em> (Misc. Petition No.
                  108 of 2025), the court directed the registry to refund the extra ₹65,000 when a
                  widow paid the old ₹75,000 fee on a qualifying filing.
                </p>
              </div>
            </section>

            {/* SECTION 5: 2025 SECTION 213 REPEAL UPDATE */}
            <section id="section-213-repeal" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>2025 STATUTORY AMENDMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Is Probate Still Mandatory in Mumbai After 2025?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For decades, Sections 57 and 213 of the Indian Succession Act, 1925 made probate
                  compulsory for Hindu, Buddhist, Sikh, Jain, and Parsi Wills made in Mumbai or
                  covering Mumbai property. The Supreme Court upheld that rule in{" "}
                  <em>Clarence Pais v. Union of India</em> (2001).
                </p>
                <p>
                  That changed with the <strong>Repealing and Amending Act, 2025</strong>, which
                  received Presidential assent on December 20, 2025. The Act omitted Section 213
                  from the Indian Succession Act. Probate is now legally optional in Mumbai, just as
                  in Delhi or Pune.
                </p>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Why Mumbai Families Still File Voluntary Probate</span>
                  </div>
                  <p className="leading-relaxed">
                    Removing Section 213 does not stop relatives from challenging an unprobated Will.
                    Mumbai co-operative housing societies, banks, and future flat buyers often still
                    ask for a Bombay High Court probate order because it gives final proof of title
                    against the whole world.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: SCHEDULE III DEDUCTIONS */}
            <section
              id="schedule-three-deductions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 29 &amp; SCHEDULE III RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Schedule III Asset Valuation &amp; Debt Deductions
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 29 of the Maharashtra Court-fees Act, the Bombay High Court will not
                  issue a probate grant until you file a verified Schedule III valuation and pay the
                  proper fee. Value each asset as of the date of death.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-emerald-700">
                      Allowed Deductions (Annexure B)
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-700">
                      <li>Unpaid personal debts and loans owed by the deceased.</li>
                      <li>Home loan mortgages plus interest up to the filing date.</li>
                      <li>Fair funeral and last rites costs paid for the deceased.</li>
                      <li>Property held strictly in trust with no personal ownership.</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Not Allowed as Deductions
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-slate-700">
                      <li>Lawyer fees or future probate litigation expenses.</li>
                      <li>Expected capital gains tax on a later sale of the flat.</li>
                      <li>Future maintenance claims without a prior court charge.</li>
                      <li>Voluntary gifts promised by heirs after the death.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: JURISDICTION & ELIGIBILITY */}
            <section id="petition-eligibility" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>CHAPTER XXVI ORIGINAL SIDE RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Who Must File in the Bombay High Court?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Check two points before you pay court fees at the Bombay High Court Original Side:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 1: Greater Mumbai Area
                    </div>
                    <div className="font-bold text-slate-800">Where Were Assets Located?</div>
                    <p className="text-slate-600 leading-relaxed">
                      The deceased lived in Greater Mumbai or owned a flat, bank account, or shares
                      within Greater Mumbai limits. Outside Mumbai, file in the local District Court.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 2: Named Executor
                    </div>
                    <div className="font-bold text-slate-800">Probate vs Letters of Admin</div>
                    <p className="text-slate-600 leading-relaxed">
                      Only an executor named in the Will can seek Probate (Rule 374). If no executor
                      is named, a beneficiary seeks Letters of Administration with Will (Rule 375).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rule 3: Multi-State Assets
                    </div>
                    <div className="font-bold text-slate-800">High Court Reach Under Sec. 273</div>
                    <p className="text-slate-600 leading-relaxed">
                      A Bombay High Court probate grant works across all of India if assets sit in
                      Mumbai and another state, saving multiple district filings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SIDE-BY-SIDE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Probate vs Letters of Administration vs Succession Fee
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare the three court grants available on the Bombay High Court Original Side.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Feature</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Probate of Will</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Letters of Administration
                      </th>
                      <th className="p-3.5 font-extrabold text-amber-200">
                        Succession Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">When Used</td>
                      <td className="p-3.5">Valid Will exists with a named living Executor.</td>
                      <td className="p-3.5">No Will, or Will has no living Executor.</td>
                      <td className="p-3.5">No Will; only debts, bank cash, and shares.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Covers Mumbai Flats?</td>
                      <td className="p-3.5 text-emerald-800 font-bold">Yes (Immovable &amp; Movable)</td>
                      <td className="p-3.5 text-emerald-800 font-bold">Yes (Immovable &amp; Movable)</td>
                      <td className="p-3.5 text-[#C65378] font-bold">No (Movable securities only)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Governing Rule</td>
                      <td className="p-3.5">Sec. 276 ISA; BHC Rule 374 (Form 97)</td>
                      <td className="p-3.5">Sec. 278 ISA; BHC Rule 375</td>
                      <td className="p-3.5">Sec. 372 ISA; BHC Rule 379</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">General Court Fee Cap</td>
                      <td className="p-3.5 font-bold">₹75,000 (Schedule I, Art. 10)</td>
                      <td className="p-3.5 font-bold">₹75,000 (Schedule I, Art. 10)</td>
                      <td className="p-3.5 font-bold">₹75,000 (Schedule I, Art. 10)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Widow Fee Cap (2024)</td>
                      <td className="p-3.5 text-emerald-800 font-bold">₹10,000</td>
                      <td className="p-3.5 text-emerald-800 font-bold">₹10,000</td>
                      <td className="p-3.5 text-emerald-800 font-bold">₹10,000</td>
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
                  <span>TRANSFERRING PROPERTY WHILE ALIVE IN MAHARASHTRA?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Compare Probate Cost Against Maharashtra ₹200 Family Gift Deed Stamp Duty
                </div>
                <p className="text-xs text-slate-600">
                  Check blood-relative stamp duty under Article 34 and Article 52(a) before choosing
                  between a Gift Deed and a Will.
                </p>
              </div>
              <Link
                href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Maharashtra Duty Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP FILING GUIDE */}
            <section id="step-by-step-filing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>BOMBAY HC ORIGINAL SIDE PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Guide to Paying Fees &amp; Filing Probate
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to file a clean petition before the Prothonotary and Senior
                  Master at the Bombay High Court:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Collect Valuation Proof as of Date of Death",
                      desc: "Get the Ready Reckoner or approved valuer report for Mumbai flats, plus bank and demat balance statements on the exact date of death.",
                    },
                    {
                      title: "Draft Form 97 Petition & Schedule III Valuation",
                      desc: "Prepare the petition under Rule 374 and Section 276 with Annexure A (gross assets) and Annexure B (debts, loans, funeral expenses).",
                    },
                    {
                      title: "Attach Attesting Witness Affidavit & Heir Consents",
                      desc: "File at least one attesting witness affidavit under Rule 384. Gather Consent Affidavits from legal heirs to avoid citation delays.",
                    },
                    {
                      title: "Pay Ad Valorem Court Fee Online (GRAS / e-Court Fee)",
                      desc: "Pay the computed fee (capped at ₹75,000, or ₹10,000 with widow status proof) and attach the payment receipt to the filing bundle.",
                    },
                    {
                      title: "Clear Office Objections & Publish Citation",
                      desc: "The Testamentary Department checks the papers. If any heir has not consented, the court issues a Citation notice (and newspaper notice if directed).",
                    },
                    {
                      title: "Receive Sealed Probate Grant",
                      desc: "If no Caveat is filed within 14 days of citation service, the Prothonotary issues the sealed Probate Grant. Present it to the housing society and banks.",
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
            <section id="worked-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>WORKED MUMBAI CALCULATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Bombay High Court Probate Fee Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Bandra Flat (Son)</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Example 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    ₹3.5 Crore Estate Filed by Son as Executor
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> Gross assets ₹3.50 Cr minus ₹10 lakh mortgage =
                    ₹3.40 Cr net estate. Uncapped slab total is ₹25,40,500.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Payable Fee:</strong> Strictly capped at <strong>₹75,000</strong> under
                    Article 10. Cap saves ₹24,65,500.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Dadar Flat (Widow)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Example 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    ₹1.8 Crore Flat Filed by Widow Under 2024 Rule
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> Net estate ₹1.80 Cr. General cap would be ₹75,000.
                    Widow attaches marriage certificate and death certificate.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Payable Fee:</strong> Capped at <strong>₹10,000</strong> under Aug 9,
                    2024 notification. Direct widow relief saves ₹65,000.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Small Bank Estate</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Example 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    ₹6.5 Lakh Bank FDs Filed by Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Valuation:</strong> Gross ₹7 lakh minus ₹50,000 funeral and debts =
                    ₹6,50,000 net estate. Slabs: ₹1,000 + ₹6,000 + ₹6,000 + ₹26,250.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Payable Fee:</strong> Exact progressive total of{" "}
                    <strong>₹39,250</strong> (below the ₹75,000 cap).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: DOCUMENT CHECKLIST & SCHEDULE III TEMPLATE */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>FILING READY TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Bombay HC Document Checklist &amp; Valuation Format
              </h3>

              {/* Box 1: Live Schedule III Valuation Draft */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Schedule III Valuation Summary (Auto-Filled From Your Inputs)
                  </div>
                  <button
                    type="button"
                    onClick={copyValuationToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedValuation ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {`SCHEDULE III - FORM OF VALUATION (SECTION 29, MAHARASHTRA COURT-FEES ACT, 1959)
ANNEXURE A (GROSS ASSETS):
- Mumbai Immovable Property : ${formatINR(immovableValue)}
- Bank Balances & FDs       : ${formatINR(bankCashValue)}
- Shares & Mutual Funds     : ${formatINR(sharesMfValue)}
- Gold & Other Movables     : ${formatINR(goldMovableValue)}
TOTAL GROSS ASSETS (A)      : ${formatINR(calc.grossEstate)}

ANNEXURE B (DEDUCTIONS):
- Mortgage / Home Loan Dues : ${formatINR(mortgageDues)}
- Unpaid Debts              : ${formatINR(unpaidDebts)}
- Funeral Expenses          : ${formatINR(funeralExpenses)}
TOTAL DEDUCTIONS (B)        : ${formatINR(calc.totalDeductions)}

NET ESTATE VALUE (A - B)    : ${formatINR(calc.netEstate)}
ARTICLE 10 COURT FEE PAYABLE: ${formatINR(calc.payableFee)} (${calc.statusBadge})`}
                </pre>
              </div>

              {/* Box 2: Required Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Required Documents for Bombay High Court Probate Filing
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
                    "Original signed Will (plus legible copy for filing)",
                    "Original MCGM / Municipal Death Certificate",
                    "Attesting Witness Affidavit (Bombay HC Rule 384)",
                    "Executor's Oath & Form 97 Petition (Rule 374)",
                    "Schedule III Annexure A (Assets) & Annexure B (Debts)",
                    "Ready Reckoner / Approved Valuer Report for Mumbai Flat",
                    "Bank Balance & Demat Statements on Date of Death",
                    "Heir Consent Affidavits (speeds up grant without Citation)",
                    "Marriage & Spouse Death Certificate (for ₹10,000 Widow Cap)",
                    "Maharashtra GRAS / e-Court Fee Payment Challan",
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
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
                12. Institutional Profile: Bombay Probate &amp; Estate Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Testamentary &amp; Probate Editorial Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our estate lawyers assist
                  families with clear Will drafting, Schedule III asset valuations, Bombay High
                  Court probate petitions, Letters of Administration, and contested testamentary
                  suit defense.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Probate Lawyer Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/letters-of-administration-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Letters of Admin Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/high-court-testamentary-suit-contested-will-defense"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Contested Will Suit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/foreign-will-resealing-ancillary-probate-high-court"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>NRI Ancillary Probate</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Bombay HC Probate Fees
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
                        aria-expanded={isOpen}
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations, Templates &amp; Related Tools
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All fee slabs, caps, and filing rules on this page follow Indian Acts, Maharashtra
                  Government notifications, and Supreme Court or Bombay High Court rulings:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
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
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Maharashtra Court-fees Act, 1959</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court: Clarence Pais (2001)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Probate Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All-India Probate Fee Tool
                    </Link>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Certificate Fee Tool
                    </Link>
                    <Link
                      href="/tools/housing-society-flat-transfer-document-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Housing Society Flat Transfer Tool
                    </Link>
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Attesting Witness Affidavit Format
                    </Link>
                    <Link
                      href="/templates/caveat-petition-high-court-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      High Court Caveat Petition Format
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir NOC Format
                    </Link>
                    <Link
                      href="/templates/will-format-marathi-mrutyupatra"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Marathi Will Format (Mrutyupatra)
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH QUICK SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Probate Fees Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A quick fee check helps your family plan cash early. You see the ₹75,000 cap and
                  the ₹10,000 widow limit right away. You pay only what Maharashtra law sets, with
                  no shock later.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Will Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a Will on plain white paper in Mumbai. No stamp paper is needed.
                  Name one trusted adult to handle your plan, and sign in front of two witnesses so
                  court work stays fast.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This tool gives clear fee math based on state rules. Exact fees depend on your
                  Will, debts, and court checks. Our team reviews your papers and guides your heirs
                  step by step.
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
                Advises families on High Court probate filings, Letters of Administration, estate
                valuation schedules, and dispute-free Will drafting across India.
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
                  <span>PROTECT YOUR MUMBAI ESTATE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Clear, Probate-Ready Will Online
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Name your executor clearly, list your Mumbai flat and bank assets, and cut future
                  court delays for your family.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Section 63 Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>BOMBAY HC PROBATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Filing Probate or Claiming Widow Fee Relief?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary team drafts Form 97 petitions, Schedule III valuations, witness
                  affidavits, and widow fee refund praecipes.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Book Probate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Key Maharashtra Fee Highlights
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>₹75,000 General Cap:</strong> Statutory ceiling under Schedule I,
                      Article 10 for all high-value Mumbai estates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>₹10,000 Widow Cap:</strong> Active under the August 9, 2024 Section
                      46 notification.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Net Valuation Relief:</strong> Deduct home loans, debts, and funeral
                      costs under Schedule III first.
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
