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

type GrantType = "probate" | "loa_with_will" | "loa_intestate" | "succession_cert";
type FilingWindow = "within_1_year" | "after_1_year";
type EstateScope = "whole_estate" | "part_estate";
type ForumLocation = "chennai_hc" | "tn_district";
type ContestStatus = "uncontested_op" | "caveat_tos";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Madras HC Probate & TN Court Fees Rules" },
  { id: "interactive-calculator", label: "2. Free Madras HC Probate Fee Calculator" },
  { id: "article-6-cap", label: "3. Article 6 Slab & Rs 25,000 Maximum Cap" },
  { id: "section-213-update", label: "4. 2025 Repeal of Section 213: Chennai Impact" },
  { id: "section-56-deductions", label: "5. Section 56 One-Year Rule & Debt Deductions" },
  { id: "caveat-tos-fees", label: "6. Caveat & TOS Conversion Fee Exposure" },
  { id: "forum-jurisdiction", label: "7. Madras HC Original Side vs District Court" },
  { id: "comparison-table", label: "8. Probate vs LOA vs Succession Certificate" },
  { id: "document-checklist", label: "9. Order XXV Document Checklist for Filing" },
  { id: "step-by-step-sop", label: "10. Step-by-Step Madras HC OP Filing Process" },
  { id: "practical-case-studies", label: "11. Real Cost Examples: Chennai & Tamil Nadu" },
  { id: "legal-recital-templates", label: "12. Affidavit Format & Copyable Checklist" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Portals & Related Tools" },
];

const FAQS = [
  {
    q: "What is the court fee for Probate or Letters of Administration in Madras High Court?",
    a: "Under Article 6 of Schedule I to the Tamil Nadu Court-Fees and Suits Valuation Act, 1955 (amended by Tamil Nadu Act 6 of 2017), the court fee is 3% of the net estate value, capped at a maximum of Rs 25,000. Any net estate above Rs 8,33,333 pays the flat Rs 25,000 cap.",
  },
  {
    q: "Is Probate still mandatory in Chennai after the Repealing and Amending Act, 2025?",
    a: "No. Parliament omitted Section 213 of the Indian Succession Act, 1925 through the Repealing and Amending Act, 2025 (assented December 20, 2025). Probate is no longer a compulsory legal bar in Chennai courts. However, banks, demat firms, housing societies, and property buyers still often ask for a Madras High Court grant to ensure clean title.",
  },
  {
    q: "How does Section 56 change my probate valuation after one year of death?",
    a: "Under Section 56(1), if you file the OP within one year of death, you use the property market value on the date of death. If you file after one year, you must use the market value on the date of filing the petition.",
  },
  {
    q: "Can I deduct loans, debts, and funeral costs from the estate value?",
    a: "Yes. Under Section 56(2) and Schedule III Part I Annexure B, real debts, home loans, and funeral costs can be deducted when you apply for the whole estate. If you apply for only part of the estate, no debt or funeral deduction is allowed.",
  },
  {
    q: "What happens to court fees if an heir files a Caveat and starts a TOS?",
    a: "When an heir enters a caveat under Order XXV and Section 295 of the Indian Succession Act, the OP turns into a Testamentary Original Suit (TOS). Schedule II Article 11(k) mentions half of the Schedule I Article 1 fee on suit conversion, but Madras High Court judgments such as Philo Peter v. Divyanathan (1988), N. Renuka Devi (2016), and B. Nitish Harihar (2021) alongside the 2017 cap strictly regulate extra fee claims.",
  },
  {
    q: "Where do I file: Madras High Court Original Side or a Tamil Nadu District Court?",
    a: "Under Section 300 of the Indian Succession Act and Order XXV of the Original Side Rules, you file in the Madras High Court if the property is inside Greater Chennai limits or the Will maker lived in Chennai. For land in Coimbatore, Madurai, Salem, Trichy, or other districts, you file in the local Principal District Court.",
  },
  {
    q: "Can a prior Succession Certificate fee be credited against Probate duty?",
    a: "Yes. Under Section 56(2)(a) of the Tamil Nadu Court-Fees Act, if you already paid court fees for a Succession Certificate on debts or shares in the same estate, that amount is subtracted from the Probate or Letters of Administration duty.",
  },
  {
    q: "What extra costs apply beyond the Rs 25,000 court fee cap in Chennai?",
    a: "You should budget for newspaper notice ads in one English and one Tamil daily (usually Rs 6,000 to Rs 15,000), small filing and process charges (about Rs 1,500 to Rs 3,500), and stamp paper for an Administration Bond if you seek Letters of Administration instead of Probate.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function MadrasProbateFeeClient() {
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

  // Calculator Inputs
  const [grantType, setGrantType] = useState<GrantType>("probate");
  const [forum, setForum] = useState<ForumLocation>("chennai_hc");
  const [filingWindow, setFilingWindow] = useState<FilingWindow>("within_1_year");
  const [estateScope, setEstateScope] = useState<EstateScope>("whole_estate");
  const [contestStatus, setContestStatus] = useState<ContestStatus>("uncontested_op");

  const [immovableValue, setImmovableValue] = useState<number>(15000000); // Rs 1.50 Cr
  const [movableValue, setMovableValue] = useState<number>(2500000); // Rs 25 Lakh
  const [deductibleDebts, setDeductibleDebts] = useState<number>(1000000); // Rs 10 Lakh
  const [funeralExpenses, setFuneralExpenses] = useState<number>(100000); // Rs 1 Lakh
  const [priorCertFeePaid, setPriorCertFeePaid] = useState<number>(0);

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
    setForum("chennai_hc");
    setFilingWindow("within_1_year");
    setEstateScope("whole_estate");
    setContestStatus("uncontested_op");
    setImmovableValue(15000000);
    setMovableValue(2500000);
    setDeductibleDebts(1000000);
    setFuneralExpenses(100000);
    setPriorCertFeePaid(0);
  };

  // =========================================================================
  // STATUTORY CALCULATION ENGINE (TN COURT-FEES & SUITS VALUATION ACT, 1955)
  // =========================================================================
  const safeImmovable = Math.max(0, Number.isFinite(immovableValue) ? immovableValue : 0);
  const safeMovable = Math.max(0, Number.isFinite(movableValue) ? movableValue : 0);
  const safeDebts = Math.max(0, Number.isFinite(deductibleDebts) ? deductibleDebts : 0);
  const safeFuneral = Math.max(0, Number.isFinite(funeralExpenses) ? funeralExpenses : 0);
  const safePriorCredit = Math.max(0, Number.isFinite(priorCertFeePaid) ? priorCertFeePaid : 0);

  // Succession Certificate only covers debts & securities (movable assets)
  const grossEstate =
    grantType === "succession_cert" ? safeMovable : safeImmovable + safeMovable;

  // Section 56(2)(a): Deductions allowed ONLY for whole-estate Probate / LOA petitions
  const deductionsAllowed =
    grantType !== "succession_cert" && estateScope === "whole_estate";
  const appliedDeductions = deductionsAllowed
    ? Math.min(grossEstate, safeDebts + safeFuneral)
    : 0;
  const netEstate = Math.max(0, grossEstate - appliedDeductions);

  // Schedule I Article 6 (Probate / LOA): 3% subject to max Rs 25,000 (TN Amendment Act 6 of 2017)
  // Schedule I Article 7 (Succession Certificate): 3% on value of debts and securities
  const uncapped3Percent = netEstate > 1000 ? Math.round(netEstate * 0.03) : 0;
  const isCappedAt25k = grantType !== "succession_cert" && uncapped3Percent > 25000;
  const grossStatutoryFee =
    grantType === "succession_cert"
      ? uncapped3Percent
      : Math.min(uncapped3Percent, 25000);

  // Section 56(2)(a) credit for earlier Succession Certificate fee paid
  const appliedCredit =
    grantType !== "succession_cert" ? Math.min(grossStatutoryFee, safePriorCredit) : 0;
  const netCourtFeePayable = Math.max(0, grossStatutoryFee - appliedCredit);

  // Savings due to TN Act 6 of 2017 Rs 25,000 statutory cap
  const capSavings =
    grantType !== "succession_cert" && uncapped3Percent > 25000
      ? uncapped3Percent - 25000
      : 0;

  // Indicative Proviso to Schedule II Article 11(k) comparison (1.5% uncapped exposure vs 2017 cap)
  const rawTosHalfScale = Math.round(netEstate * 0.015);

  // Transparent Ancillary Out-of-Pocket Estimates (separate from statutory court fee)
  const paperPublicationEstimate = forum === "chennai_hc" ? 10000 : 7000;
  const processBattaEstimate = forum === "chennai_hc" ? 2500 : 1500;
  const needsAdminBond =
    grantType === "loa_with_will" || grantType === "loa_intestate";
  const adminBondStampEstimate = needsAdminBond ? 1000 : 0;
  const estimatedAncillaryTotal =
    paperPublicationEstimate + processBattaEstimate + adminBondStampEstimate;
  const estimatedGrandTotal = netCourtFeePayable + estimatedAncillaryTotal;

  const estimatedTimeline =
    contestStatus === "caveat_tos"
      ? "18 to 36 Months (Contested T.O.S. Trial)"
      : forum === "chennai_hc"
        ? "4 to 8 Months (Madras HC Uncontested O.P.)"
        : "5 to 10 Months (TN Principal District Court)";

  const copyClauseToClipboard = () => {
    const text = `SCHEDULE III PART I VALUATION AFFIDAVIT SUMMARY (TN COURT-FEES ACT, 1955)
IN THE HIGH COURT OF JUDICATURE AT MADRAS (TESTAMENTARY AND INTESTATE JURISDICTION)
O.P. No. ______ of 2026

1. Gross Value of Estate (Annexure A): ${formatINR(grossEstate)}
   - Immovable Property (TNREGINET Guideline / Market Value): ${formatINR(safeImmovable)}
   - Movable Assets, Bank FDs, Shares & Securities: ${formatINR(safeMovable)}
2. Permissible Deductions under Section 56(2) (Annexure B): ${formatINR(appliedDeductions)}
   - Bona Fide Debts & Mortgages: ${deductionsAllowed ? formatINR(safeDebts) : "Rs 0 (Not deductible for part-estate / Succession Cert)"}
   - Funeral Expenses: ${deductionsAllowed ? formatINR(safeFuneral) : "Rs 0"}
3. Net Value of Estate for Duty Computation: ${formatINR(netEstate)}
4. Valuation Date Basis (Section 56(1)): ${filingWindow === "within_1_year" ? "Date of Death (Filed within 1 year)" : "Date of Application (Filed after 1 year)"}
5. Statutory Court Fee under Schedule I ${grantType === "succession_cert" ? "Article 7" : "Article 6 (3%, Max Cap Rs 25,000)"}: ${formatINR(netCourtFeePayable)}
6. Forum: ${forum === "chennai_hc" ? "High Court of Judicature at Madras (Original Side - Order XXV)" : "Principal District Court, Tamil Nadu"}`;
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklist = `MADRAS HIGH COURT PROBATE OP FILING CHECKLIST (ORDER XXV O.S. RULES)
1. Original Registered or Unregistered Will (kept in safe custody at Registry).
2. Original Death Certificate of the Testator (Greater Chennai Corporation / Municipal).
3. Legal Heirship Certificate or Family Tree Affidavit listing all Class I heirs.
4. Affidavit of Assets & Liabilities (Schedule III Part I - Annexure A & Annexure B).
5. Affidavit of at least one Attesting Witness proving execution under Section 63 ISA & BSA s. 67.
6. Consent Affidavits (No Objection) from non-contesting legal heirs to avoid caveat delay.
7. Copy of Sale Deed, Patta, Chitta, Town Survey Land Register (TSLR), and EC for Chennai property.
8. Bank statements, Demat CML, and share certificates for movable assets.
9. e-Court Fee receipt / Stamp papers for initial OP filing and final Rs 25,000 capped duty.
10. Administration Bond with sureties (required for Letters of Administration under s. 291 ISA).`;
    navigator.clipboard.writeText(checklist);
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
            <span>TN COURT-FEES ACT, 1955 • ARTICLE 6 &amp; ORDER XXV</span>
          </div>

          {/* Strict H1 Tag (46 characters, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Madras High Court Probate Court Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate your exact Madras High Court Testamentary OP and Letters of Administration fee
            under Article 6 of Schedule I (3% rate capped at Rs 25,000). Check Section 56 deductions,
            caveat TOS risks, and the December 2025 Section 213 repeal rules.
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
              <span>Draft Chennai-Ready Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">3% Ad Valorem</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SCHEDULE I ARTICLE 6 RATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">Rs 25,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TN ACT 6 OF 2017 CEILING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec. 213 Omitted</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DEC 2025 OPTIONAL PROBATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Order XXV</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MADRAS HC ORIGINAL SIDE
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the Tamil Nadu Court-Fees and Suits Valuation Act, 1955 (amended by TN Act
                6 of 2017), Madras HC Order XXV, and the Repealing and Amending Act, 2025.
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
                <span>EXECUTIVE BRIEF: MADRAS HIGH COURT PROBATE FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Capped at Rs 25,000 in Tamil Nadu:</strong> Under Schedule I Article 6
                    (TN Amendment Act 6 of 2017), probate duty is 3% of the net estate, capped at a
                    maximum of Rs 25,000. Even a Rs 5 crore Chennai house pays just Rs 25,000 in
                    statutory probate duty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 213 Repealed in Dec 2025:</strong> Parliament omitted Section
                    213 of the Indian Succession Act, 1925 via the Repealing and Amending Act, 2025.
                    Chennai probate is no longer a compulsory statutory bar, though banks and buyers
                    still request it for safe title.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 56 Timing &amp; Deductions:</strong> File within one year of
                    death to lock in date-of-death market value. You may subtract real debts,
                    mortgages, and funeral costs when filing for the whole estate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caveat &amp; T.O.S. Risk:</strong> If an heir objects by filing a
                    caveat, the OP converts into a Testamentary Original Suit (T.O.S.) under Section
                    295, extending timelines to 18 to 36 months and raising Article 11(k) fee
                    disputes.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL BANNER CARD */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs bg-white">
              <Image
                src="/images/madras-high-court-probate-court-fee-calculator-og.jpg"
                alt="Madras High Court probate court fee calculator for Chennai families"
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY THE ONLY <h2> ON THE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Madras High Court Probate &amp; TN Court Fees Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Probate is a court seal proving that a Will is genuine and valid. When a family
                  files a Testamentary Original Petition (OP) in the High Court of Judicature at
                  Madras, two laws govern the fee and process. These are the Tamil Nadu Court-Fees
                  and Suits Valuation Act, 1955 and Order XXV of the Madras High Court Original Side
                  Rules.
                </p>
                <p>
                  Before 2017, Tamil Nadu charged an uncapped 3% court fee on large estates. Families
                  in Adyar, Anna Nagar, or Mylapore paid lakhs just to unlock one family house. The
                  Tamil Nadu Court-Fees and Suits Valuation (Amendment) Act, 2017 (Tamil Nadu Act 6
                  of 2017) fixed this harsh rule by placing a hard cap of{" "}
                  <strong>Rs 25,000</strong> under Schedule I Article 6.
                </p>
                <p>
                  Today, Tamil Nadu has one of the lowest High Court probate caps in India. That cap
                  is one-third of the Bombay High Court Rs 75,000 cap and half of the Calcutta High
                  Court Rs 50,000 cap. Still, families must plan for valuation checks under Section
                  55, debt deductions under Section 56, newspaper notice fees, and caveat litigation
                  risks.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE PROBATE FEE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Madras High Court Probate Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your petition type, court forum, filing timeline, and estate values below. Get
                your instant Tamil Nadu Court Fees Act calculation, Rs 25,000 cap savings, and total
                filing budget.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Grant Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Type of Testamentary Grant</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "probate",
                        label: "Probate of Will",
                        desc: "Will names an Executor (Art. 6, 3% capped at Rs 25,000)",
                      },
                      {
                        id: "loa_with_will",
                        label: "LOA with Will Annexed",
                        desc: "Valid Will exists, no Executor named or willing (Art. 6)",
                      },
                      {
                        id: "loa_intestate",
                        label: "LOA (No Will)",
                        desc: "No Will left; heirs seek property grant (Art. 6 + Bond)",
                      },
                      {
                        id: "succession_cert",
                        label: "Succession Certificate",
                        desc: "Debts & securities only (Art. 7, 3% movable assets)",
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

                {/* Step 2: Forum, Timing, Scope & Caveat Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Court Forum (Jurisdiction)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "chennai_hc",
                          label: "Madras High Court",
                          desc: "Chennai city property / abode (Order XXV)",
                        },
                        {
                          id: "tn_district",
                          label: "TN District Court",
                          desc: "Coimbatore, Madurai, Salem & other districts",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setForum(opt.id as ForumLocation)}
                          className={`text-left p-3 rounded-xl border transition-all ${
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
                      <Clock className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Filing Window (Section 56 Rule)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "within_1_year",
                          label: "Within 1 Year",
                          desc: "Value on date of death applies (Sec. 56(1)(a))",
                        },
                        {
                          id: "after_1_year",
                          label: "After 1 Year",
                          desc: "Value on filing date applies (Sec. 56(1)(b))",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFilingWindow(opt.id as FilingWindow)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            filingWindow === opt.id
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
                      <Layers className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: Estate Coverage (Deduction Rule)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "whole_estate",
                          label: "Whole Estate",
                          desc: "Debts & funeral expenses deductible",
                        },
                        {
                          id: "part_estate",
                          label: "Part of Estate Only",
                          desc: "Sec. 56(2)(a): zero debt deductions allowed",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setEstateScope(opt.id as EstateScope)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            estateScope === opt.id
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
                      <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                      <span>Step 5: Family Consent / Caveat Status</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "uncontested_op",
                          label: "Uncontested O.P.",
                          desc: "All heirs consent or do not file a caveat",
                        },
                        {
                          id: "caveat_tos",
                          label: "Caveat Filed (T.O.S.)",
                          desc: "Heir objects; converts to Testamentary Suit",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setContestStatus(opt.id as ContestStatus)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            contestStatus === opt.id
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

                {/* Step 3: Numeric Valuation Inputs */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>Step 6: Enter Estate Assets &amp; Annexure B Deductions (INR)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: "Rs 5L", imm: 400000, mov: 100000 },
                        { label: "Rs 25L", imm: 2000000, mov: 500000 },
                        { label: "Rs 1.5 Cr", imm: 12500000, mov: 2500000 },
                        { label: "Rs 5 Cr", imm: 45000000, mov: 5000000 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setImmovableValue(preset.imm);
                            setMovableValue(preset.mov);
                          }}
                          className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-[11px] font-bold text-slate-700 transition-colors"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grantType !== "succession_cert" && (
                      <div className="space-y-1.5">
                        <label
                          htmlFor="immovable-val"
                          className="block text-xs font-bold text-slate-700"
                        >
                          Immovable Property Value (Rs)
                        </label>
                        <input
                          id="immovable-val"
                          type="number"
                          min={0}
                          step={50000}
                          value={immovableValue}
                          onChange={(e) => setImmovableValue(Number(e.target.value) || 0)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20"
                        />
                        <p className="text-[11px] text-slate-500">
                          Flats, house, plots in Chennai / TN (Guideline value)
                        </p>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label
                        htmlFor="movable-val"
                        className="block text-xs font-bold text-slate-700"
                      >
                        Movable Assets / Securities (Rs)
                      </label>
                      <input
                        id="movable-val"
                        type="number"
                        min={0}
                        step={25000}
                        value={movableValue}
                        onChange={(e) => setMovableValue(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/20"
                      />
                      <p className="text-[11px] text-slate-500">
                        Bank FDs, Demat shares, mutual funds, locker gold
                      </p>
                    </div>

                    {grantType !== "succession_cert" && (
                      <>
                        <div className="space-y-1.5">
                          <label
                            htmlFor="debts-val"
                            className="block text-xs font-bold text-slate-700"
                          >
                            Debts &amp; Home Loan Mortgage (Rs)
                          </label>
                          <input
                            id="debts-val"
                            type="number"
                            min={0}
                            step={25000}
                            disabled={!deductionsAllowed}
                            value={deductibleDebts}
                            onChange={(e) => setDeductibleDebts(Number(e.target.value) || 0)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378] disabled:bg-slate-100 disabled:text-slate-400"
                          />
                          <p className="text-[11px] text-slate-500">
                            {deductionsAllowed
                              ? "Annexure B: Deductible under Sec. 56(2)"
                              : "Blocked for Part-Estate petitions"}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="funeral-val"
                            className="block text-xs font-bold text-slate-700"
                          >
                            Funeral &amp; Last Rites Costs (Rs)
                          </label>
                          <input
                            id="funeral-val"
                            type="number"
                            min={0}
                            step={10000}
                            disabled={!deductionsAllowed}
                            value={funeralExpenses}
                            onChange={(e) => setFuneralExpenses(Number(e.target.value) || 0)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378] disabled:bg-slate-100 disabled:text-slate-400"
                          />
                          <p className="text-[11px] text-slate-500">
                            Reasonable expenses per Schedule III Annexure B
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="credit-val"
                            className="block text-xs font-bold text-slate-700"
                          >
                            Prior Succession Cert Fee Paid (Rs)
                          </label>
                          <input
                            id="credit-val"
                            type="number"
                            min={0}
                            step={1000}
                            value={priorCertFeePaid}
                            onChange={(e) => setPriorCertFeePaid(Number(e.target.value) || 0)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                          />
                          <p className="text-[11px] text-slate-500">
                            Credited against Probate duty under Sec. 56(2)(a)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* LIVE RESULTS PANEL */}
                <div className="rounded-2xl bg-[#172228] text-white p-5 sm:p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        {grantType === "succession_cert"
                          ? "SCHEDULE I ARTICLE 7 SUCCESSION CERTIFICATE DUTY"
                          : "SCHEDULE I ARTICLE 6 PROBATE / LOA COURT FEE"}
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                        {formatINR(netCourtFeePayable)}
                      </div>
                      <div className="text-xs text-white/75 mt-1">
                        {isCappedAt25k
                          ? "Statutory Rs 25,000 Maximum Cap Reached (TN Act 6 of 2017)"
                          : grantType === "succession_cert"
                            ? "Computed at 3% on eligible movable debts & securities"
                            : "Computed at 3% on Net Estate Value (below Rs 8,33,333 cap threshold)"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCappedAt25k && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>You Save {formatINR(capSavings)} via Cap</span>
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Breakdown Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/65 text-[11px]">Gross Estate</div>
                      <div className="font-extrabold text-sm sm:text-base mt-0.5">
                        {formatINR(grossEstate)}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/65 text-[11px]">Annexure B Deductions</div>
                      <div className="font-extrabold text-sm sm:text-base text-emerald-300 mt-0.5">
                        - {formatINR(appliedDeductions)}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/65 text-[11px]">Net Taxable Estate</div>
                      <div className="font-extrabold text-sm sm:text-base mt-0.5">
                        {formatINR(netEstate)}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-white/65 text-[11px]">Est. Ancillary Costs</div>
                      <div className="font-extrabold text-sm sm:text-base text-rose-200 mt-0.5">
                        ~ {formatINR(estimatedAncillaryTotal)}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Cost Line-Items */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-white/80">
                      <span>Raw 3% Ad Valorem Duty on Net Estate</span>
                      <span className="font-bold text-white">{formatINR(uncapped3Percent)}</span>
                    </div>
                    {isCappedAt25k && (
                      <div className="flex justify-between text-emerald-300">
                        <span>Less: TN Act 6 of 2017 Cap Relief (Max Rs 25,000)</span>
                        <span className="font-bold">- {formatINR(capSavings)}</span>
                      </div>
                    )}
                    {appliedCredit > 0 && (
                      <div className="flex justify-between text-emerald-300">
                        <span>Less: Section 56(2)(a) Prior Succession Cert Credit</span>
                        <span className="font-bold">- {formatINR(appliedCredit)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/80 pt-1.5 border-t border-white/10">
                      <span>
                        Estimated Newspaper Publication (1 English + 1 Tamil Daily)
                      </span>
                      <span className="font-bold text-white">
                        ~ {formatINR(paperPublicationEstimate)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Process, Batta &amp; Registry Filing Charges (Estimate)</span>
                      <span className="font-bold text-white">
                        ~ {formatINR(processBattaEstimate)}
                      </span>
                    </div>
                    {needsAdminBond && (
                      <div className="flex justify-between text-amber-200">
                        <span>Administration Bond Stamp Paper (Sec. 291 ISA - LOA only)</span>
                        <span className="font-bold">~ {formatINR(adminBondStampEstimate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/15">
                      <span>Estimated Total Out-of-Pocket Budget (Excl. Legal Fees)</span>
                      <span className="text-rose-300">{formatINR(estimatedGrandTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-white/70 pt-1">
                      <span>Expected Court Disposal Timeline</span>
                      <span className="font-bold text-white/90">{estimatedTimeline}</span>
                    </div>
                  </div>

                  {/* Caveat / TOS Warning Banner */}
                  {contestStatus === "caveat_tos" && (
                    <div className="rounded-xl bg-amber-500/15 border border-amber-400/40 p-3.5 text-xs text-amber-100 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-bold text-amber-200">
                          Caveat Entered: Testamentary Original Suit (T.O.S.) Alert
                        </div>
                        <p className="leading-relaxed">
                          When an heir files a caveat under Section 295 ISA, the OP converts into a
                          T.O.S. While the Schedule II Article 11(k) proviso cites half of Schedule
                          I Article 1 (1.5% = {formatINR(rawTosHalfScale)} uncapped on this estate),
                          Madras High Court rulings (<em>Philo Peter</em>,{" "}
                          <em>N. Renuka Devi</em>, and <em>B. Nitish Harihar</em>) and the 2017 cap
                          govern registry fee objections. Consult a Madras HC testamentary advocate
                          before paying excess ad valorem duty.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Section 213 Optional Notice */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 text-xs text-white/85 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>December 2025 Legal Update:</strong> Section 213 of the Indian
                      Succession Act was omitted by the Repealing and Amending Act, 2025. Probate is
                      now legally optional in Chennai, yet remains the gold standard for clearing
                      high-value bank, demat, and buyer title checks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: ARTICLE 6 SLAB & RS 25,000 CAP */}
            <section id="article-6-cap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <IndianRupee className="w-4 h-4" />
                <span>STATUTORY FEE SCHEDULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 6 Probate Fee Formula &amp; Rs 25,000 Maximum Cap
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Schedule I Article 6 of the Tamil Nadu Court-Fees and Suits Valuation Act, 1955
                fixes a single, clean percentage rule. After Tamil Nadu Act 6 of 2017 came into
                force, the court fee stops rising once the net estate crosses{" "}
                <strong>Rs 8,33,333</strong>.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-3 px-4 font-bold">Net Estate Value (Tamil Nadu)</th>
                      <th className="py-3 px-4 font-bold">Rate (Article 6)</th>
                      <th className="py-3 px-4 font-bold">Uncapped 3%</th>
                      <th className="py-3 px-4 font-bold">Actual TN Court Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-semibold">Up to Rs 1,000</td>
                      <td className="py-3 px-4">Exempt</td>
                      <td className="py-3 px-4">Rs 0</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Rs 0</td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold">Rs 5,00,000</td>
                      <td className="py-3 px-4">3% Ad Valorem</td>
                      <td className="py-3 px-4">Rs 15,000</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Rs 15,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Rs 8,33,333 (Cap Threshold)</td>
                      <td className="py-3 px-4">3% Ad Valorem</td>
                      <td className="py-3 px-4">Rs 25,000</td>
                      <td className="py-3 px-4 font-bold text-[#C65378]">Rs 25,000 (Cap Hit)</td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold">Rs 50,00,000 (Rs 50 Lakh)</td>
                      <td className="py-3 px-4">Capped under 2017 Act</td>
                      <td className="py-3 px-4 line-through text-slate-400">Rs 1,50,000</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Rs 25,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Rs 2,00,00,000 (Rs 2 Crore)</td>
                      <td className="py-3 px-4">Capped under 2017 Act</td>
                      <td className="py-3 px-4 line-through text-slate-400">Rs 6,00,000</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Rs 25,000</td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold">Rs 10,00,00,000 (Rs 10 Crore)</td>
                      <td className="py-3 px-4">Capped under 2017 Act</td>
                      <td className="py-3 px-4 line-through text-slate-400">Rs 30,00,000</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Rs 25,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: 2025 REPEAL OF SECTION 213 */}
            <section id="section-213-update" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>2025 STATUTORY LANDMARK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Repeal of Section 213: Is Probate Mandatory in Chennai?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For a full century, Chennai was one of three Presidency towns under Section 57 and
                  Section 213 of the Indian Succession Act, 1925. Any Hindu, Buddhist, Sikh, Jain,
                  or Parsi Will made in Chennai or covering immovable property in Chennai could not
                  be enforced in court without a Madras High Court probate grant.
                </p>
                <p>
                  In December 2025, Parliament enacted the{" "}
                  <strong>Repealing and Amending Act, 2025</strong> (assented December 20, 2025),
                  which <strong>omitted Section 213 in full</strong>. This historic reform removed
                  the compulsory probate bar in Chennai, Mumbai, and Kolkata.
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="font-extrabold text-[#172228]">
                    Why Many Chennai Families Still File for Optional Madras HC Probate:
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Judgment in Rem:</strong> A probate grant binds the whole world, not
                      just the family members in court.
                    </li>
                    <li>
                      <strong>Bank &amp; Demat Release:</strong> High-value bank lockers, shares,
                      and NSDL/CDSL portfolios often demand court proof when no nominee exists.
                    </li>
                    <li>
                      <strong>Clean Resale &amp; Patta Transfer:</strong> Chennai property buyers
                      and home-loan banks trust a probated Will far more than an unprobated paper.
                    </li>
                    <li>
                      <strong>Low Cost:</strong> With the Rs 25,000 cap in Tamil Nadu, securing a
                      court seal costs a tiny fraction of a Chennai flat&rsquo;s value.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECTION 56 TIMING & DEDUCTIONS */}
            <section id="section-56-deductions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>VALUATION &amp; DEDUCTION RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 56 One-Year Rule &amp; Annexure B Debt Deductions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C65378]" />
                    <span>Section 56(1): The One-Year Valuation Rule</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    File your Testamentary OP within <strong>one year of death</strong> to value
                    property as on the date of death. If you file after one year, the Collector
                    values the property at the higher current TNREGINET guideline value on the date
                    of filing.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Section 56(2): Whole Estate vs Part Estate</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    When your petition covers the <strong>entire estate</strong>, Schedule III Part
                    I Annexure B lets you subtract real debts, home loans, and funeral costs. If you
                    seek probate for only <strong>part of the estate</strong>, Section 56(2)(a) bars
                    all debt and funeral deductions.
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Section 55</strong>, the Madras High Court sends a copy of your
                valuation affidavit to the District Collector. The Collector checks whether your
                stated market value matches local guideline rates before final probate duty is
                certified.
              </p>
            </section>

            {/* SECTION 6: CAVEAT & TOS CONVERSION */}
            <section id="caveat-tos-fees" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>CONTENTIOUS LITIGATION RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Caveat &amp; T.O.S. Conversion Court Fee Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  If a sibling or legal heir believes the Will is forged or signed under undue
                  influence, they may file a <strong>Caveat</strong> under Order XXV of the Original
                  Side Rules and Section 148A CPC, supported by an affidavit within 8 days.
                </p>
                <p>
                  Under <strong>Section 295 of the Indian Succession Act, 1925</strong>, once a
                  caveat is accepted, the uncontested Original Petition (O.P.) is converted into a{" "}
                  <strong>Testamentary Original Suit (T.O.S.)</strong>. The executor becomes the
                  plaintiff and the objector becomes the defendant.
                </p>
                <p>
                  The proviso to <strong>Schedule II Article 11(k)</strong> states that on suit
                  conversion, one-half of the Schedule I Article 1 ad valorem scale applies less
                  fees already paid. However, landmark Madras High Court rulings including{" "}
                  <em>Philo Peter &amp; Arputhasamy v. Divyanathan (1988)</em>,{" "}
                  <em>N. Renuka Devi v. E. Lalitha (2016)</em>, and{" "}
                  <em>B. Nitish Harihar v. P. Sivanandam (2021)</em> have repeatedly tested how far
                  ad valorem fees apply when an O.P. converts to a T.O.S., alongside the 2017 Act
                  cap.
                </p>
              </div>
            </section>

            {/* SECTION 7: FORUM JURISDICTION */}
            <section id="forum-jurisdiction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>CHENNAI &amp; TAMIL NADU JURISDICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Madras High Court Original Side vs Tamil Nadu District Court
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3 px-4 font-bold">Factor</th>
                      <th className="py-3 px-4 font-bold">Madras High Court (Original Side)</th>
                      <th className="py-3 px-4 font-bold">TN Principal District Courts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold">Territorial Scope</td>
                      <td className="py-3 px-4">
                        Greater Chennai (Presidency Town) property or fixed abode
                      </td>
                      <td className="py-3 px-4">
                        Coimbatore, Madurai, Salem, Trichy, Chengalpattu &amp; other districts
                      </td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-bold">Governing Rules</td>
                      <td className="py-3 px-4">
                        Order XXV, Madras HC Original Side Rules &amp; Sec. 300 ISA
                      </td>
                      <td className="py-3 px-4">
                        Sections 264, 270 &amp; 276, Indian Succession Act, 1925
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">Statutory Probate Cap</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        3%, capped at Rs 25,000
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        3%, capped at Rs 25,000
                      </td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-bold">Evidence Recording</td>
                      <td className="py-3 px-4">
                        Before the Learned Master (Original Side), High Court
                      </td>
                      <td className="py-3 px-4">Before the Principal District Judge</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">Pan-India Reach</td>
                      <td className="py-3 px-4">
                        Operates across India under Section 273 ISA for out-of-state assets
                      </td>
                      <td className="py-3 px-4">
                        Valid across TN; extra-state assets over Rs 10,000 favor High Court grant
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>GRANT COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Probate vs Letters of Administration vs Succession Certificate
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-3 px-4 font-bold">Legal Grant</th>
                      <th className="py-3 px-4 font-bold">When Used</th>
                      <th className="py-3 px-4 font-bold">Assets Covered</th>
                      <th className="py-3 px-4 font-bold">TN Court Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold">Probate of Will</td>
                      <td className="py-3 px-4">Valid Will exists &amp; names an Executor</td>
                      <td className="py-3 px-4">Both immovable land/flats &amp; movables</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        3% (Max Rs 25,000)
                      </td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-3 px-4 font-bold">LOA (With or Without Will)</td>
                      <td className="py-3 px-4">
                        No Executor named in Will, or deceased died intestate
                      </td>
                      <td className="py-3 px-4">Both immovable &amp; movable estate (+ Bond)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        3% (Max Rs 25,000)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold">Succession Certificate</td>
                      <td className="py-3 px-4">No Will; only bank accounts, FDs, or shares</td>
                      <td className="py-3 px-4">Debts &amp; securities only (No land/flats)</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        3% (Schedule I Art. 7)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>ORDER XXV FILING PAPERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Required Documents for Madras High Court Probate OP
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  {
                    title: "Original Will",
                    detail:
                      "Original signed Will (registered or unregistered) submitted to the Registry.",
                  },
                  {
                    title: "Death Certificate",
                    detail:
                      "Official Death Certificate from Greater Chennai Corporation or Municipality.",
                  },
                  {
                    title: "Legal Heirship Certificate",
                    detail:
                      "TN e-Sevai Legal Heir Certificate or sworn family tree listing all Class I heirs.",
                  },
                  {
                    title: "Affidavit of Assets (Schedule III)",
                    detail:
                      "Annexure A listing gross assets and Annexure B listing deductible debts.",
                  },
                  {
                    title: "Attesting Witness Affidavit",
                    detail:
                      "Sworn statement by at least one witness confirming valid execution under BSA s. 67.",
                  },
                  {
                    title: "Consent Affidavits of Heirs",
                    detail:
                      "Signed No Objection Affidavits from spouse and children to keep the OP uncontested.",
                  },
                  {
                    title: "Chennai Property Title Papers",
                    detail:
                      "Sale Deed, Patta, Town Survey Land Register (TSLR), and Encumbrance Certificate.",
                  },
                  {
                    title: "Bank & Demat Proof",
                    detail:
                      "Latest bank passbook, FD receipts, NSDL/CDSL statement, and PAN/Aadhaar of petitioner.",
                  },
                ].map((doc) => (
                  <div
                    key={doc.title}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">{doc.title}</div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>STEP-BY-STEP COURT PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step Madras High Court Probate OP Process
              </h3>
              <div className="space-y-3">
                {[
                  {
                    step: "Step 1: Draft OP & Schedule III Valuation Affidavit",
                    body: "Prepare the Testamentary OP under Section 276 ISA and Order XXV with Annexure A (assets) and Annexure B (debts). Verify TNREGINET guideline value.",
                  },
                  {
                    step: "Step 2: Registry Filing & Safe Custody of Original Will",
                    body: "File the OP on the Original Side of the Madras High Court, pay initial filing court fees, and deposit the original Will in the Registrar's vault.",
                  },
                  {
                    step: "Step 3: Notice to Heirs & Paper Publication",
                    body: "Serve notices on non-consenting heirs and publish a public citation in one English and one Tamil daily newspaper as directed by the Court.",
                  },
                  {
                    step: "Step 4: Section 55 Collector Valuation & Master Enquiry",
                    body: "The District Collector verifies asset value. The Petitioner (PW1) and one Attesting Witness (PW2) record oral proof and mark exhibits before the Master.",
                  },
                  {
                    step: "Step 5: Pay Rs 25,000 Capped Duty & Receive Grant",
                    body: "The Judge passes the final order granting Probate or LOA. Pay the balance Article 6 duty (max Rs 25,000), execute an Administration Bond if LOA, and collect the sealed grant.",
                  },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">{item.step}</div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>PRACTICAL COST EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Real Cost Examples: Adyar, Anna Nagar &amp; Coimbatore
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-[#C65378] uppercase tracking-wider">
                    Case 1: Adyar Flat (Rs 3.2 Cr)
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    Uncontested Madras HC Probate OP
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Father leaves a Rs 3.2 Cr flat and Rs 30L FDs to daughter as sole Executor. Raw
                    3% would be Rs 10.50 Lakh. Under TN Act 6 of 2017, statutory court fee is capped
                    at <strong>Rs 25,000</strong>. Total out-of-pocket with paper ads is about{" "}
                    <strong>Rs 37,500</strong>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-[#C65378] uppercase tracking-wider">
                    Case 2: Small Estate (Rs 7.5L)
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    Below Cap with Debt Deduction
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Gross estate is Rs 7.5 Lakh with Rs 1.5 Lakh bank debt and Rs 50,000 funeral
                    cost. Filed within 1 year for the whole estate, net value drops to Rs 5.5 Lakh.
                    Article 6 fee at 3% is just <strong>Rs 16,500</strong>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-[#C65378] uppercase tracking-wider">
                    Case 3: Coimbatore House (Rs 1.8 Cr)
                  </div>
                  <div className="font-bold text-slate-900 text-sm">
                    Principal District Court LOA
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Will names no Executor. Heirs file for Letters of Administration with Will
                    Annexed in Coimbatore District Court. Court fee hits the{" "}
                    <strong>Rs 25,000 cap</strong>, plus an Administration Bond under Section 291
                    ISA and local publication.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: COPYABLE SUMMARY & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>READY-TO-USE WORKING SHEETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Copyable Valuation Summary &amp; Order XXV Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="font-extrabold text-sm text-slate-900">
                    Schedule III Valuation Snapshot
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Copy your live calculated Gross Estate ({formatINR(grossEstate)}), Annexure B
                    deductions ({formatINR(appliedDeductions)}), and capped court fee (
                    {formatINR(netCourtFeePayable)}) to share with your Chennai probate counsel.
                  </p>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Valuation Summary Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Valuation Summary</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="font-extrabold text-sm text-slate-900">
                    Order XXV Document Checklist
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Copy the complete 10-point Madras High Court Testamentary OP paper checklist
                    covering Will deposit, witness affidavit, TSLR/Patta, and consent NOCs.
                  </p>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Checklist Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Filing Checklist</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>MADRAS HIGH COURT PROBATE FAQS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: OFFICIAL PORTALS & RELATED TOOLS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Portals &amp; Related WillDrafting Tools
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All fee slabs, caps, and legal rules on this page are verified against Indian
                  statutes, Tamil Nadu court-fee schedules, and reported High Court judgments:
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
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>eCourts India Case Status &amp; Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related Probate Services, Templates &amp; Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/services/probate-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Lawyer Services
                    </Link>
                    <Link
                      href="/services/high-court-testamentary-suit-contested-will-defense"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Contested Will &amp; T.O.S. Defense
                    </Link>
                    <Link
                      href="/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Tamil Nadu Settlement &amp; Release Duty Tool
                    </Link>
                    <Link
                      href="/tools/bombay-high-court-probate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bombay HC Probate Fee Calculator
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Is Probate Needed Checker
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
                      href="/templates/will-format-tamil-uyil-sasanam"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Tamil Will Format (Uyil Sasanam)
                    </Link>
                    <Link
                      href="/locations/chennai"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting in Chennai
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Clear Will?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clean Will saves your spouse and kids from court fights. Name an Executor and
                  list each Chennai house, flat, and bank account clearly so heirs claim assets
                  fast.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Keep Your Probate Cost Low</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In Tamil Nadu, probate duty stops at Rs 25,000. Get signed consent affidavits from
                  all legal heirs early so no caveat turns your simple OP into a long civil suit.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft clean Wills and handle Madras High Court probate OPs end to end.
                  We check your papers, compute exact fees, and guide you at every step.
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
                    Adv. Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specializes in High Court probate petitions, contested T.O.S. defense, cross-border
                NRI estates, and clear Will drafting across India.
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
                  <span>AVOID FUTURE PROBATE DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Court-Ready Chennai Will Online
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Prevent caveats and T.O.S. delays. Name an Executor, add clear witness clauses,
                  and protect your family in 15 minutes.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Now</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - PROBATE ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>MADRAS HC PROBATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Filing a Probate OP or T.O.S. in Chennai?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary lawyers handle Schedule III asset valuation, Master enquiry,
                  caveat defense, and Patta updates across Tamil Nadu.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Probate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Chennai Families Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2017 Cap &amp; 2025 Reform Ready:</strong> Models both the Rs 25,000
                      TN cap and Section 213 repeal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Annexure B Math:</strong> Applies Section 56 whole-estate vs
                      part-estate debt rules cleanly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Order XXV Ready:</strong> Includes Chennai High Court and District
                      Court filing checklists.
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
