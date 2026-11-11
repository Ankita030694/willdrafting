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
  History,
  TrendingUp,
  Heart,
  Baby,
  GraduationCap,
  Coins,
  Shield,
  PieChart,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Legal Framework: Minor Child Testamentary Trusts" },
  { id: "corpus-calculator", label: "2. Interactive Child Trust Corpus Calculator" },
  { id: "education-inflation-trap", label: "3. The 10% Education Inflation Trap in India" },
  { id: "visual-statutory-guide", label: "4. Visual Guide: Testamentary Trust Blueprint" },
  { id: "staged-disbursements", label: "5. Staged Milestones: Why Age 18 Handover Fails" },
  { id: "guardian-vs-trustee", label: "6. Legal Separation: Guardians vs Financial Trustees" },
  { id: "section-164-taxation", label: "7. Tax Benefits: Section 164 Individual Slab Relief" },
  { id: "corpus-runout-model", label: "8. Complete Cash Runout & Investment Portfolio Model" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Establishing a Trust in Your Will" },
  { id: "practical-case-studies", label: "10. Practical Case Studies: Bengaluru, Delhi & Mumbai" },
  { id: "ready-will-clauses", label: "11. Customized Testamentary Trust Clause Generator" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Trust Advisory" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Minor Child Trusts" },
  { id: "statutory-citations", label: "14. Statutory Citations & Legal Resources" },
];

const FAQS = [
  {
    q: "How much money should I leave in trust for my minor child in India?",
    a: "The required trust corpus depends on the child's age, 10% annual education inflation, higher education tuition, and monthly guardian living stipends. For example, a 4-year-old child typically requires an initial corpus of ₹1.4 Crore to ₹2.2 Crores invested at 7.5% return to fund private schooling, university degrees, healthcare buffers, and monthly guardian stipends until age 25.",
  },
  {
    q: "What is a testamentary trust for a minor child under Indian law?",
    a: "A testamentary trust is a private trust created directly through a clause in a Will under Sections 5 and 6 of the Indian Trusts Act, 1882. It takes effect only upon the testator's death. The Will designates trustees to manage assets exclusively for the child's maintenance, education, and advancement without court interference.",
  },
  {
    q: "Why is a testamentary trust better than leaving property directly to a minor?",
    a: "Minors cannot legally hold title or enter contracts under the Indian Contract Act. If assets pass directly to a minor, the legal guardian must petition the District Court under Section 29 of the Guardians and Wards Act for permission to sell or encumber property or withdraw large sums. A testamentary trust avoids court delays because trustees possess full legal powers defined in the Will.",
  },
  {
    q: "How does staged age disbursement protect a child at 18, 21, and 25?",
    a: "Handing an entire inheritance to an 18-year-old often leads to rapid depletion and peer exploitation. Staged disbursements release funds in controlled tranches: typically 25% at age 18 for undergraduate studies, 35% at age 21 for postgraduate degrees or career setup, and the remaining 40% at age 25 when the beneficiary has attained financial maturity.",
  },
  {
    q: "How are testamentary trusts for minor children taxed under the Income Tax Act?",
    a: "Under the Proviso to Section 164(1) of the Income Tax Act, 1961, if a testamentary trust is created under a Will for the benefit of relatives and is the only trust created by the testator, the income is not taxed at the Maximum Marginal Rate (MMR). Instead, it is taxed at the normal individual slab rates, saving substantial annual tax.",
  },
  {
    q: "Can the legal guardian and the trustee be different persons?",
    a: "Yes, separating the guardian of the child's person from the financial trustee is best practice under Indian estate planning. The guardian provides loving personal custody and daily care, while the trustees manage the investment portfolio and disburse monthly stipends and institutional fees, establishing a healthy check and balance.",
  },
  {
    q: "How do trustees pay school fees and medical expenses?",
    a: "Under Section 41 of the Indian Trusts Act, trustees hold statutory powers of maintenance and advancement. A well-drafted Will empowers trustees to disburse a fixed monthly stipend directly to the guardian for household expenses, while paying school fees, university tuition, and medical bills directly to institutions via bank transfer.",
  },
  {
    q: "What happens to the trust corpus if the child passes away before age 25?",
    a: "A well-drafted testamentary trust contains a gift-over clause. If the primary child beneficiary passes away before attaining full trust maturity, the remaining corpus devolves upon alternate beneficiaries, such as surviving siblings, named charities, or other family heirs, preventing intestacy disputes.",
  },
];

export default function MinorChildTrustCorpusClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculator Parameters
  const [childAge, setChildAge] = useState<number>(4);
  const [targetAge, setTargetAge] = useState<number>(25);
  const [schoolFeeAnnual, setSchoolFeeAnnual] = useState<number>(200000); // 2 Lakh/year
  const [eduInflation, setEduInflation] = useState<number>(10); // 10% benchmark in India
  const [collegeCostToday, setCollegeCostToday] = useState<number>(2500000); // 25 Lakh today
  const [guardianMonthlyStipend, setGuardianMonthlyStipend] = useState<number>(25000); // 25k/month
  const [livingInflation, setLivingInflation] = useState<number>(6); // 6% CPI
  const [emergencyBufferPct, setEmergencyBufferPct] = useState<number>(10); // 10%
  const [portfolioReturn, setPortfolioReturn] = useState<number>(7.5); // 7.5% safe portfolio

  // Staged milestone splits (percentages)
  const [payout18, setPayout18] = useState<number>(25);
  const [payout21, setPayout21] = useState<number>(35);
  const [payout25, setPayout25] = useState<number>(40);

  // Will Clause Customization Inputs
  const [childName, setChildName] = useState<string>("Aarav Sharma");
  const [childRelation, setChildRelation] = useState<string>("son");
  const [guardianName, setGuardianName] = useState<string>("Pooja Sharma (Maternal Aunt)");
  const [trustee1Name, setTrustee1Name] = useState<string>("Vikram Sharma (Brother / Uncle)");
  const [trustee2Name, setTrustee2Name] = useState<string>("Sunita Rao (Family Legal Counsel)");

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
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    });

    const targets = document.querySelectorAll(".scroll-target");
    targets.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Format INR Currency
  const formatInr = (val: number): string => {
    if (isNaN(val) || val <= 0) return "₹0";
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crore`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  // Comprehensive Mathematical Calculation
  const calcResults = useMemo(() => {
    const yearsTotal = Math.max(1, targetAge - childAge);
    const yearsTo18 = Math.max(0, 18 - childAge);
    const yearsTo21 = Math.max(0, 21 - childAge);
    const rPort = portfolioReturn / 100;
    const rEdu = eduInflation / 100;
    const rLiving = livingInflation / 100;

    let pvSchoolTotal = 0;
    let nominalSchoolTotal = 0;

    for (let yr = 0; yr < yearsTo18; yr++) {
      const outflow = schoolFeeAnnual * Math.pow(1 + rEdu, yr);
      nominalSchoolTotal += outflow;
      pvSchoolTotal += outflow / Math.pow(1 + rPort, yr);
    }

    // College Higher Education Lump Sum at Age 18
    const futureCollegeCost = collegeCostToday * Math.pow(1 + rEdu, yearsTo18);
    const pvCollege = futureCollegeCost / Math.pow(1 + rPort, yearsTo18);

    // Guardian Living Stipend
    let pvGuardianTotal = 0;
    let nominalGuardianTotal = 0;

    for (let yr = 0; yr < yearsTotal; yr++) {
      const annualStipend = guardianMonthlyStipend * 12 * Math.pow(1 + rLiving, yr);
      nominalGuardianTotal += annualStipend;
      pvGuardianTotal += annualStipend / Math.pow(1 + rPort, yr);
    }

    const subtotalPV = pvSchoolTotal + pvCollege + pvGuardianTotal;
    const emergencyBuffer = subtotalPV * (emergencyBufferPct / 100);
    const totalCorpusRequired = subtotalPV + emergencyBuffer;

    const totalNominalOutflow =
      nominalSchoolTotal + futureCollegeCost + nominalGuardianTotal + emergencyBuffer;
    const investmentCompoundingSavings = Math.max(0, totalNominalOutflow - totalCorpusRequired);

    // Staged Payouts at 18, 21, and 25
    const milestonePool = totalCorpusRequired;
    const amountAt18 = (milestonePool * payout18) / 100;
    const amountAt21 = (milestonePool * payout21) / 100;
    const amountAt25 = (milestonePool * payout25) / 100;

    // Monthly stipend at year 1 vs year 10
    const stipendYear1 = guardianMonthlyStipend;
    const stipendYear10 = Math.round(guardianMonthlyStipend * Math.pow(1 + rLiving, 10));

    return {
      yearsTotal,
      yearsTo18,
      yearsTo21,
      pvSchoolTotal,
      nominalSchoolTotal,
      futureCollegeCost,
      pvCollege,
      pvGuardianTotal,
      nominalGuardianTotal,
      emergencyBuffer,
      totalCorpusRequired,
      totalNominalOutflow,
      investmentCompoundingSavings,
      amountAt18,
      amountAt21,
      amountAt25,
      stipendYear1,
      stipendYear10,
    };
  }, [
    childAge,
    targetAge,
    schoolFeeAnnual,
    eduInflation,
    collegeCostToday,
    guardianMonthlyStipend,
    livingInflation,
    emergencyBufferPct,
    portfolioReturn,
    payout18,
    payout21,
    payout25,
  ]);

  const generatedClauseText = useMemo(() => {
    return `// =========================================================================
// TESTAMENTARY TRUST CLAUSE FOR MINOR CHILD (INDIAN TRUSTS ACT, 1882)
// Incorporated into the Last Will & Testament of the Testator
// =========================================================================

1. CREATION OF TESTAMENTARY TRUST:
   I hereby bequeath the sum of ${formatInr(
     calcResults.totalCorpusRequired
   )} (Rupees equivalent) [and/or my designated mutual funds, fixed deposits, insurance proceeds, and real estate assets] unto my appointed Trustees:
   (a) ${trustee1Name}, and
   (b) ${trustee2Name},
   TO HOLD the same UPON TRUST for the sole benefit, education, maintenance, and advancement of my minor ${childRelation}, ${childName} (Date of Birth: [Insert DOB]), until ${childRelation === "daughter" ? "she" : "he"} attains the age of ${targetAge} years.

2. SEPARATION OF POWERS & GUARDIANSHIP:
   I appoint ${guardianName} as the Legal Guardian of the person and custody of my minor ${childRelation}.
   The Trustees shall administer the Trust Funds independently and shall pay unto the said Guardian a monthly maintenance stipend of ${formatInr(
     calcResults.stipendYear1
   )} (subject to an annual inflation escalation of ${livingInflation}%).
   The Guardian shall not be required to petition the District Court under Section 29 of the Guardians and Wards Act, 1890, for ordinary maintenance disbursements.

3. DIRECT PAYMENT OF EDUCATIONAL & MEDICAL EXPENSES:
   Pursuant to Section 41 of the Indian Trusts Act, 1882, the Trustees are expressly authorized and directed to pay all school fees, coaching charges, university tuition, hostel expenses, and medical or hospitalization bills DIRECTLY to the respective educational institutions, hospitals, or service providers upon submission of authentic invoices.

4. STAGED CAPITAL DISBURSEMENTS:
   The capital corpus of the Trust shall not be distributed in a single lump sum upon attaining the age of majority (18 years). Instead, the Trustees shall disburse the corpus in staged tranches as follows:
   (a) Upon attaining the age of 18 Years: ${payout18}% of the remaining Trust Fund (estimated at ${formatInr(
      calcResults.amountAt18
    )}) to fund undergraduate university education or vocational training.
   (b) Upon attaining the age of 21 Years: ${payout21}% of the remaining Trust Fund (estimated at ${formatInr(
      calcResults.amountAt21
    )}) to fund postgraduate education, overseas master's degree, or professional career launch.
   (c) Upon attaining the age of ${targetAge} Years: The entirety of the remaining Trust Corpus (estimated at ${formatInr(
      calcResults.amountAt25
    )}), along with accrued interest, shall be handed over to ${childName} absolutely, whereupon this Trust shall stand dissolved.

5. STATUTORY TAXATION & MMR EXEMPTION:
   This Trust is created under this Will for the benefit of my relative and is the sole trust declared by me. Under the Proviso to Section 164(1) of the Income Tax Act, 1961, the income of this Trust shall be chargeable to tax at the normal individual slab rates applicable to a resident individual, and not at the Maximum Marginal Rate (MMR).

6. GIFT-OVER / CONTINGENCY CLAUSE:
   In the unfortunate event that my ${childRelation}, ${childName}, predeceases me or passes away before attaining the age of ${targetAge} years without leaving lawful issue, the remaining Trust Corpus shall devolve equally upon [Named Alternate Heir / Surviving Siblings / Named Registered Charitable Trust], absolutely.`;
  }, [
    childName,
    childRelation,
    guardianName,
    trustee1Name,
    trustee2Name,
    targetAge,
    calcResults,
    livingInflation,
    payout18,
    payout21,
    payout25,
  ]);

  const copyClauseToClipboard = () => {
    navigator.clipboard.writeText(generatedClauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `TESTAMENTARY TRUST CHECKLIST FOR MINOR CHILDREN (INDIA):
1. Appoint at least 2 independent Trustees (e.g. one family elder and one professional/friend).
2. Nominate a separate Legal Guardian of the child's person under Guardians & Wards Act 1890.
3. Calculate corpus factoring 10% education inflation and monthly guardian stipends.
4. Mandate direct electronic institutional fee payments to prevent diversion.
5. Implement staged milestone disbursements at ages 18, 21, and 25.
6. Invoke Proviso to Section 164(1) of Income Tax Act for individual slab tax relief.
7. Include a clear Gift-Over clause in case the child predeceases before final milestone age.
8. Register the Will with Sub-Registrar and store certified copies with primary trustee.`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-[#172228] to-slate-900 text-white pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs sm:text-sm font-semibold">
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/tools"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Tools
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-[#C65378] font-bold">
              Minor Child Trust Corpus Calculator
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Indian Trusts Act 1882 &bull; Guardians &amp; Wards Act 1890</span>
              </div>

              {/* H1 Tag: Exactly ONE per page (30 to 65 chars, no em-dashes) */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Minor Child Trust Corpus Calculator India
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
                Determine the exact inflation-adjusted trust fund needed in your Indian Will to
                safeguard your minor child. Model 10% school fee inflation, higher education tuition,
                monthly guardian stipends, and staged milestone payouts at ages 18, 21, and 25.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10% Education Inflation Benchmark</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Staged Age Payouts (18 / 21 / 25)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Section 164 Individual Tax Slab</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <a
                  href="#corpus-calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C65378] hover:bg-[#b04567] text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-900/30 transition-all hover:scale-[1.01]"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Launch Trust Corpus Calculator</span>
                </a>
                <button
                  onClick={handleStartDraft}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Draft Indian Will with Trust Clause</span>
                </button>
              </div>
            </div>

            {/* Hero Summary Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-7 space-y-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Statutory Protection Summary
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
                    100% Probate Ready
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Education Cost Runout:</span>
                      <span className="text-slate-300">
                        School fees compounding at 10% p.a. plus undergraduate and overseas masters
                        college funds.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Guardian Living Stipend:</span>
                      <span className="text-slate-300">
                        Monthly financial stipend paid directly to the child&apos;s legal guardian
                        with annual CPI inflation adjustment.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Court Permission Bypassed:</span>
                      <span className="text-slate-300">
                        Trustees act immediately without needing District Court approvals under
                        Section 29 of Guardians and Wards Act.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Zero Upfront Trust Cost:</span>
                      <span className="text-slate-300">
                        A testamentary trust created inside a Will incurs zero registration or stamp
                        duty fees during your lifetime.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/80 text-center">
                  <span className="text-xs text-slate-400">
                    Governed by Indian Trusts Act, 1882 &amp; Income Tax Act, 1961
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER WITH FLOATING TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* DESKTOP STICKY SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 font-bold text-slate-900 text-sm uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#C65378]" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5 text-xs">
                  {TOC_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl transition-all font-medium leading-snug ${
                        activeId === item.id
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar Trust Advisory CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#172228] text-white p-6 shadow-md space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-[#C65378] text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Private Trust Advisory</span>
                </div>
                <div className="text-base font-extrabold text-white leading-snug">
                  Protect Your Child with a Custom Testamentary Trust
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have senior succession advocates draft custom trustee powers, guardian stipends,
                  and spendthrift safeguards into your Will.
                </p>
                <Link
                  href="/services/private-family-trust-formation"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#b04567] text-white font-bold text-xs transition-colors"
                >
                  <span>Explore Trust Advisory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN */}
          <main className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* SECTION 1: STATUTORY FOUNDATION (EXACTLY ONE H2 ON THE PAGE) */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY FOUNDATION &bull; INDIAN TRUSTS ACT 1882</span>
              </div>

              {/* H2 Tag: Exactly ONE per page (<= 70 chars, no em-dashes) */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: Testamentary Trusts for Minors
              </h2>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  Planning for the financial security of a minor child is the single most critical duty
                  of an Indian parent. In India, leaving assets outright to a minor in a Will creates severe
                  legal complications. Under Section 11 of the Indian Contract Act, 1872, a minor cannot
                  enter into a contract or hold legal title to bank accounts, shares, or real estate directly.
                </p>
                <p>
                  When parents leave property directly to a minor without a trust structure, the legal
                  guardian must petition the District Court or Family Court under Section 29 of the
                  Guardians and Wards Act, 1890, to sell property, withdraw mutual funds, or liquidate
                  deposits. This court permission procedure can take 18 to 36 months, freezing the child&apos;s
                  education funds during critical school admissions.
                </p>
                <p>
                  A <strong>Testamentary Trust</strong> created under Sections 5 and 6 of the Indian
                  Trusts Act, 1882, completely eliminates this problem. The trust is declared inside your
                  Will. It costs zero rupees during your lifetime and springs into existence only upon your
                  death. The trustees assume immediate fiduciary control, investing funds conservatively and
                  disbursing monthly maintenance and school fees without any court intervention.
                </p>
              </div>

              {/* 3 Pillars Comparison Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-sm">
                    § 6
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Indian Trusts Act, 1882</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formal declaration of trust intention, subject matter, beneficiary, and trustee
                    appointment inside the Will.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    § 7
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Guardians &amp; Wards Act</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Separation of personal physical custody from financial asset management to avoid
                    conflicts of interest.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                    § 164
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Income Tax Act, 1961</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proviso to Section 164(1) protects testamentary relative trusts from Maximum Marginal
                    Rate taxation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="corpus-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE FINANCIAL ASSET</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Child Trust Corpus Calculator
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Adjust the sliders below to model your child&apos;s age, education inflation, college costs,
                and guardian stipends. The calculator computes the exact present corpus needed to sustain
                your child until full financial maturity at age 25.
              </p>

              {/* Calculator Box */}
              <div className="rounded-3xl bg-white border-2 border-slate-200/90 shadow-md p-6 sm:p-8 space-y-8">
                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Child Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Baby className="w-4 h-4 text-[#C65378]" />
                        <span>Child&apos;s Current Age:</span>
                      </span>
                      <span className="text-sm font-extrabold text-[#C65378] bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                        {childAge} Years Old
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="17"
                      step="1"
                      value={childAge}
                      onChange={(e) => setChildAge(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Infant (0 yrs)</span>
                      <span>Primary (8 yrs)</span>
                      <span>Teen (17 yrs)</span>
                    </div>
                  </div>

                  {/* Target Maturity Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-[#C65378]" />
                        <span>Trust Maturity / Dissolution Age:</span>
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {targetAge} Years Old
                      </span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="25"
                      step="1"
                      value={targetAge}
                      onChange={(e) => setTargetAge(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Age 18 (Majority)</span>
                      <span>Age 21 (UG Grad)</span>
                      <span>Age 25 (Recommended)</span>
                    </div>
                  </div>

                  {/* Annual School Fees */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#C65378]" />
                        <span>Current Annual School &amp; Coaching Fee:</span>
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {formatInr(schoolFeeAnnual)}/yr
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="1000000"
                      step="25000"
                      value={schoolFeeAnnual}
                      onChange={(e) => setSchoolFeeAnnual(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>₹50,000</span>
                      <span>₹5,00,000</span>
                      <span>₹10,00,000</span>
                    </div>
                  </div>

                  {/* Education Inflation Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#C65378]" />
                        <span>Education Inflation Rate (Annual):</span>
                      </span>
                      <span className="text-sm font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                        {eduInflation}% p.a.
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="14"
                      step="0.5"
                      value={eduInflation}
                      onChange={(e) => setEduInflation(parseFloat(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>6% (Conservative)</span>
                      <span>10% (India Average)</span>
                      <span>14% (Tier 1 Metro)</span>
                    </div>
                  </div>

                  {/* College Higher Education Lump Sum */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-[#C65378]" />
                        <span>Higher Education (UG/PG) Cost Today:</span>
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {formatInr(collegeCostToday)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="250000"
                      value={collegeCostToday}
                      onChange={(e) => setCollegeCostToday(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>₹5 Lakh (Indian State)</span>
                      <span>₹25 Lakh (Private B-School/Engg)</span>
                      <span>₹1 Crore (Overseas)</span>
                    </div>
                  </div>

                  {/* Guardian Monthly Living Stipend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-[#C65378]" />
                        <span>Guardian Monthly Living Stipend:</span>
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {formatInr(guardianMonthlyStipend)}/mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="150000"
                      step="5000"
                      value={guardianMonthlyStipend}
                      onChange={(e) => setGuardianMonthlyStipend(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>₹10,000/mo</span>
                      <span>₹50,000/mo</span>
                      <span>₹1,50,000/mo</span>
                    </div>
                  </div>

                  {/* Conservative Portfolio Return */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-[#C65378]" />
                        <span>Trust Portfolio Yield (Post-Tax):</span>
                      </span>
                      <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                        {portfolioReturn}% p.a.
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="10"
                      step="0.25"
                      value={portfolioReturn}
                      onChange={(e) => setPortfolioReturn(parseFloat(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>6% (FDs Only)</span>
                      <span>7.5% (G-Secs &amp; AAA Hybrid)</span>
                      <span>10% (Balanced Advantage)</span>
                    </div>
                  </div>

                  {/* Emergency Healthcare Buffer */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-[#C65378]" />
                        <span>Emergency Healthcare &amp; Legal Buffer:</span>
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {emergencyBufferPct}% of Corpus
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      value={emergencyBufferPct}
                      onChange={(e) => setEmergencyBufferPct(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>5% (Minimal)</span>
                      <span>10% (Recommended)</span>
                      <span>20% (High Resilience)</span>
                    </div>
                  </div>
                </div>

                {/* Staged Milestone Distribution Slider */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <PieChart className="w-4 h-4 text-[#C65378]" />
                      <span>Staged Age Milestone Distribution:</span>
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Split Total: {payout18 + payout21 + payout25}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">Stage 1: Age 18</span>
                        <span className="text-[#C65378]">{payout18}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={payout18}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setPayout18(val);
                          setPayout25(Math.max(0, 100 - val - payout21));
                        }}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block">
                        UG Degree / College Entry: {formatInr(calcResults.amountAt18)}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">Stage 2: Age 21</span>
                        <span className="text-indigo-600">{payout21}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={payout21}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setPayout21(val);
                          setPayout25(Math.max(0, 100 - payout18 - val));
                        }}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block">
                        PG Degree / Career Launch: {formatInr(calcResults.amountAt21)}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">Stage 3: Age {targetAge}</span>
                        <span className="text-emerald-700">{payout25}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="5"
                        value={payout25}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setPayout25(val);
                          setPayout21(Math.max(0, 100 - payout18 - val));
                        }}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block">
                        Full Maturity / Dissolution: {formatInr(calcResults.amountAt25)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RESULTS DASHBOARD */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700/80 gap-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                        RECOMMENDED TESTAMENTARY TRUST CORPUS
                      </span>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
                        {formatInr(calcResults.totalCorpusRequired)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Horizon Period:</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {calcResults.yearsTotal} Years (Age {childAge} to {targetAge})
                      </span>
                    </div>
                  </div>

                  {/* 4 Metrics Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Schooling Runout PV
                      </span>
                      <div className="text-lg font-bold text-white">
                        {formatInr(calcResults.pvSchoolTotal)}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Nominal: {formatInr(calcResults.nominalSchoolTotal)}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        College Tuition PV
                      </span>
                      <div className="text-lg font-bold text-white">
                        {formatInr(calcResults.pvCollege)}
                      </div>
                      <span className="text-[11px] text-rose-300">
                        Cost at 18: {formatInr(calcResults.futureCollegeCost)}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Guardian Stipend PV
                      </span>
                      <div className="text-lg font-bold text-white">
                        {formatInr(calcResults.pvGuardianTotal)}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Nominal: {formatInr(calcResults.nominalGuardianTotal)}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-4 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Emergency &amp; Buffer
                      </span>
                      <div className="text-lg font-bold text-emerald-400">
                        {formatInr(calcResults.emergencyBuffer)}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {emergencyBufferPct}% contingency pool
                      </span>
                    </div>
                  </div>

                  {/* Compounding Moat Stat Callout */}
                  <div className="rounded-2xl bg-rose-950/60 border border-rose-500/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <span className="font-bold text-white">
                          Gross Nominal Outflow Without Trust Compounding:{" "}
                        </span>
                        <span className="text-rose-200">
                          {formatInr(calcResults.totalNominalOutflow)}
                        </span>
                      </div>
                    </div>
                    <div className="text-emerald-300 font-extrabold sm:text-right">
                      Investment Growth Saves: {formatInr(calcResults.investmentCompoundingSavings)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: THE 10% EDUCATION INFLATION TRAP */}
            <section id="education-inflation-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>FINANCIAL BLIND SPOT</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. The 10% Education Inflation Trap in India
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  Most parents make the dangerous mistake of calculating their life insurance and
                  bequest corpus using standard Consumer Price Index (CPI) inflation of 5% to 6%. In
                  India, primary and higher education costs increase at an annual rate of 10% to 12%,
                  more than double the headline inflation rate.
                </p>
                <p>
                  Consider a simple calculation: an annual private school fee of ₹2,00,000 for a 4-year-old
                  child grows to over ₹5,18,000 per year by age 14, and college tuition of ₹25,00,000 today
                  swells to over ₹94,00,000 by the time the child turns 18. If a Will leaves a fixed lump sum
                  based on current prices, the trust runs out of money before the child enters university.
                </p>
                <p>
                  Our calculator incorporates this exact mathematical reality. By modeling higher education
                  as a separate capital event and discounting back to present value at safe portfolio yields,
                  your testamentary trust guarantees that your child never compromises on quality education.
                </p>
              </div>

              {/* Inflation Projection Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="px-4 py-3 text-left">Child Age</th>
                      <th className="px-4 py-3 text-left">Academic Phase</th>
                      <th className="px-4 py-3 text-right">Annual School Fee (10% Infl)</th>
                      <th className="px-4 py-3 text-right">Guardian Monthly Stipend (6% Infl)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Age 4 (Inception)</td>
                      <td className="px-4 py-3">Kindergarten &bull; Pre-Primary</td>
                      <td className="px-4 py-3 text-right font-medium">{formatInr(schoolFeeAnnual)}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatInr(guardianMonthlyStipend)}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">Age 10 (+6 Yrs)</td>
                      <td className="px-4 py-3">Middle School &bull; Sports</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatInr(schoolFeeAnnual * Math.pow(1 + eduInflation / 100, 6))}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatInr(guardianMonthlyStipend * Math.pow(1 + livingInflation / 100, 6))}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Age 15 (+11 Yrs)</td>
                      <td className="px-4 py-3">Secondary &bull; IIT/NEET Coaching</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatInr(schoolFeeAnnual * Math.pow(1 + eduInflation / 100, 11))}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatInr(guardianMonthlyStipend * Math.pow(1 + livingInflation / 100, 11))}
                      </td>
                    </tr>
                    <tr className="bg-rose-50/50 font-bold text-slate-900">
                      <td className="px-4 py-3">Age 18 (+14 Yrs)</td>
                      <td className="px-4 py-3">Undergraduate College Admission</td>
                      <td className="px-4 py-3 text-right text-[#C65378]">
                        Lump Sum: {formatInr(calcResults.futureCollegeCost)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {formatInr(guardianMonthlyStipend * Math.pow(1 + livingInflation / 100, 14))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: STATUTORY VISUAL GUIDE (IMAGE EMBEDDING) */}
            <div id="visual-statutory-guide" className="scroll-target scroll-mt-28 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: MINOR CHILD TESTAMENTARY TRUST</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Indian Trusts Act, 1882 &bull; Section 6
                </span>
              </div>

              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200">
                <Image
                  src="/images/minor-child-testamentary-trust-corpus-calculator-og.jpg"
                  alt="Minor Child Testamentary Trust Corpus Calculator and Staged Will Distribution India"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1 font-medium">
                Visualizing Indian testamentary trust planning: 10% education inflation, monthly
                guardian stipends, and staged distributions at 18, 21, and 25 years.
              </p>
            </div>

            {/* SECTION 5: STAGED MILESTONES (WHY AGE 18 HANDOVER FAILS) */}
            <section id="staged-disbursements" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>WEALTH PRESERVATION ARCHITECTURE</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Staged Milestones: Why Age 18 Handover Fails
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  Under the Majority Act, 1875, an Indian citizen attains the age of majority at 18.
                  If a parent writes a basic Will stating <em>&quot;Everything to my son upon turning 18&quot;</em>,
                  the young adult receives complete, unfettered access to bank accounts, demat portfolios,
                  and family homes on their 18th birthday.
                </p>
                <p>
                  Empirical legal studies across Indian High Courts show that handing multi-crore inheritances
                  to an 18-year-old leads to devastating outcomes: fraudulent investments by opportunistic
                  relatives, aggressive peer pressure, high-risk financial speculation, or sudden loss of
                  educational focus.
                </p>
                <p>
                  A properly constructed testamentary trust uses a <strong>Staged Milestone Distribution</strong>{" "}
                  framework, dividing the inheritance into three developmental milestones:
                </p>
              </div>

              {/* 3 Developmental Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2.5 shadow-2xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                    Age 18 Milestone
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Undergraduate Degree (25%)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Provides college tuition fees and hostel maintenance. The bulk of the principal
                    remains safely locked with the trustees.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2.5 shadow-2xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                    Age 21 Milestone
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Masters &amp; Career (35%)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Funds postgraduate education, overseas specialization, or professional startup
                    capital after graduating college.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2.5 shadow-2xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    Age 25 Milestone
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Full Dissolution (40%)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Final handover of remaining capital and properties when the beneficiary has attained
                    career stability and financial maturity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: GUARDIAN VS TRUSTEE SEPARATION OF POWERS */}
            <section id="guardian-vs-trustee" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>FIDUCIARY CHECKS &amp; BALANCES</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Legal Separation: Guardians vs Financial Trustees
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  A common question Indian parents ask is: <em>&quot;Can I make my sister both the legal
                  guardian of my child and the sole trustee of the money?&quot;</em> While legally
                  permissible, combining both roles in a single person is a major estate planning risk.
                </p>
                <p>
                  Under the Guardians and Wards Act, 1890, the legal guardian exercises physical custody,
                  day-to-day parenting, and medical consent for the minor. If that same guardian controls
                  the bank accounts without oversight, family disputes often arise over personal spending,
                  household blending, or diversion of funds.
                </p>
                <p>
                  Best legal practice mandates a strict <strong>Separation of Powers</strong>:
                </p>
              </div>

              {/* Separation Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="rounded-2xl bg-white border-2 border-slate-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Heart className="w-5 h-5 text-rose-600" />
                    <span>The Legal Guardian (Custody of Child)</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>Provides loving daily home care, schooling support, and health custody.</li>
                    <li>Receives an inflation-adjusted monthly maintenance stipend from the trustees.</li>
                    <li>Submits tuition bills and medical invoices to trustees for direct payment.</li>
                    <li>Cannot sell, pledge, or liquidate trust investments or real estate.</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white border-2 border-slate-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                    <Building className="w-5 h-5 text-[#C65378]" />
                    <span>The Financial Trustees (Custody of Assets)</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>Manage mutual funds, government bonds, bank deposits, and property rentals.</li>
                    <li>Disburse the monthly guardian stipend reliably on the 1st of every month.</li>
                    <li>Pay schools, colleges, and hospitals directly by electronic bank transfer.</li>
                    <li>Release capital milestone distributions at ages 18, 21, and 25.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: INCOME TAX SECTION 164 PROVISO */}
            <section id="section-164-taxation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>INCOME TAX ACT, 1961</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Tax Benefits: Section 164 Individual Slab Relief
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  Normally, private discretionary trusts in India are taxed at the punitive{" "}
                  <strong>Maximum Marginal Rate (MMR)</strong> of 39% or 42.74% on all earned interest,
                  dividends, and capital gains under Section 164 of the Income Tax Act, 1961. This high
                  rate can erode the child&apos;s corpus over a 15-year childhood.
                </p>
                <p>
                  However, the Indian tax code provides a crucial statutory exception for testamentary
                  trusts. Under the <strong>Proviso to Section 164(1)</strong>, where a private trust is
                  created under a Will for the benefit of a relative, and it is the only trust declared by
                  the testator, the income of the trust is NOT taxed at MMR!
                </p>
                <p>
                  Instead, the trustees are assessed as representative assessees under Section 160(1)(iv)
                  and Section 161, and the income is taxed at the <strong>normal individual tax slab rates</strong>.
                  The basic exemption limit (up to ₹3 Lakhs under the new tax regime) applies, saving the
                  minor child lakhs of rupees in tax every single year.
                </p>
              </div>

              {/* Tax Savings Callout Box */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Statutory Formula for Zero-MMR Qualification</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-950">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold block text-slate-900">Rule 1: Created by Will</span>
                    <span>
                      The trust must be incorporated inside a valid Will, taking effect upon death.
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold block text-slate-900">Rule 2: Relative Beneficiary</span>
                    <span>
                      Beneficiaries must be relatives (minor son, daughter, or dependent siblings).
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold block text-slate-900">Rule 3: Sole Trust Declared</span>
                    <span>
                      Must be the only trust created by the testator to prevent tax arbitrage abuse.
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold block text-slate-900">Rule 4: Direct Assessment</span>
                    <span>
                      Assessed in the representative capacity of the minor child under Section 161.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: CASH RUNOUT & INVESTMENT MODEL */}
            <section id="corpus-runout-model" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>FIDUCIARY ASSET ALLOCATION</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Complete Cash Runout &amp; Investment Portfolio Model
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  Under Section 20 of the Indian Trusts Act, 1882, trustees are bound by strict statutory
                  prudence when investing trust property. Trustees cannot invest trust money in speculative
                  assets, unlisted equities, high-risk venture funds, or personal loans.
                </p>
                <p>
                  To achieve the projected 7.5% annual return without endangering capital, experienced
                  Indian estate planners recommend a diversified three-tier portfolio structure:
                </p>
              </div>

              {/* 3-Tier Allocation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    50% Conservative Core
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Sovereign G-Secs &amp; AAA FDs</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Long-term Reserve Bank of India Government of India bonds, target maturity debt funds,
                    and scheduled bank fixed deposits generating safe predictable yields.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    30% Inflation Hedge
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Large-Cap Index &amp; Hybrid</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nifty 50 index mutual funds or balanced advantage funds that generate long-term
                    capital growth to counter the 10% education inflation rate.
                  </p>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    20% Liquidity Bucket
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">Liquid Funds &amp; Sweep FDs</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Overnight funds and high-yield sweep savings accounts to service regular monthly
                    guardian stipends and annual school term fee payments seamlessly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Establishing a Trust in Your Will
              </h3>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Select Two Independent Fiduciary Trustees
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Choose two reliable adults (such as a trusted sibling and a professional advisor).
                      Ensure neither trustee is in financial distress, and designate an alternate trustee
                      if one predeceases.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Nominate a Separate Legal Guardian
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Name the person who will provide day-to-day parenting and home care under the
                      Guardians and Wards Act, 1890. Keep this person distinct from the trustees to ensure
                      fiduciary transparency.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Specify Assets and Funding Bequests
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Identify the funding sources: term insurance policy death proceeds, mutual fund
                      folios, bank fixed deposits, or commercial real estate rental income allocated to the
                      trust.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Draft Explicit Milestone and Maintenance Clauses
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Embed exact percentage distributions at ages 18, 21, and 25. Authorize direct
                      tuition payments under Section 41 and state that income tax is assessed at individual
                      slab rates under Section 164.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-start gap-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      Execute and Register Your Will with Two Witnesses
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sign the Will before two independent witnesses who are not trustees or beneficiaries.
                      Register the Will at the Sub-Registrar&apos;s office to prevent future probate disputes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: REAL-WORLD CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>PRACTICAL APPLICATION</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Bengaluru, Delhi &amp; Mumbai
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Bengaluru Case Study
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                      Tech Founder Couple
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    Single Child (Age 3) with High Overseas Education Ambition
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Rohan and Priya, software architects in Bengaluru, wanted their 3-year-old daughter to
                    study computer science in the US. Standard calculators suggested ₹50 Lakhs. Using our
                    calculator with 10% education inflation, the required college fund at age 18 was ₹1.05
                    Crore. They structured a ₹1.85 Crore testamentary trust funded by their term insurance
                    policies, releasing 30% at age 18, 35% at 21, and 35% at 25.
                  </p>
                </div>

                <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Delhi NCR Case Study
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                      Business Family
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    Two Minor Sons (Ages 5 &amp; 8) and Family Guardian
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A Delhi trader nominated his sister-in-law as guardian and his elder brother plus a
                    chartered accountant as trustees. By separating guardianship from asset management,
                    the trust pays a monthly stipend of ₹40,000 to the guardian for household expenses,
                    while school fees and coaching for both boys are paid directly to institutions,
                    preventing extended family disputes.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: CUSTOMIZED TESTAMENTARY TRUST CLAUSE GENERATOR */}
            <section id="ready-will-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL DRAFTING ASSET</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Customized Testamentary Trust Clause Generator
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Customize your child&apos;s details below to generate a court-tested testamentary trust
                clause compliant with the Indian Trusts Act, 1882. Copy and insert this clause directly
                into your Last Will &amp; Testament.
              </p>

              {/* Clause Customization Inputs */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Child&apos;s Name:</label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378]"
                      placeholder="e.g. Aarav Sharma"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Relationship:</label>
                    <select
                      value={childRelation}
                      onChange={(e) => setChildRelation(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378]"
                    >
                      <option value="son">Son</option>
                      <option value="daughter">Daughter</option>
                      <option value="child">Child</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Legal Guardian Name:</label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378]"
                      placeholder="e.g. Pooja Sharma (Aunt)"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Primary Trustee 1:</label>
                    <input
                      type="text"
                      value={trustee1Name}
                      onChange={(e) => setTrustee1Name(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378]"
                      placeholder="e.g. Vikram Sharma (Brother)"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Primary Trustee 2:</label>
                    <input
                      type="text"
                      value={trustee2Name}
                      onChange={(e) => setTrustee2Name(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378]"
                      placeholder="e.g. Sunita Rao (Advocate / Chartered Accountant)"
                    />
                  </div>
                </div>

                {/* Clause Code Box */}
                <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 text-slate-200 font-mono text-xs overflow-x-auto">
                  <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800">
                    <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider">
                      Ready Indian Will Testamentary Trust Clause
                    </span>
                    <button
                      onClick={copyClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#b04567] text-white font-sans text-xs font-bold transition-colors"
                    >
                      {copiedClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Copied Clause!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">{generatedClauseText}</pre>
                </div>

                {/* Checklist Copy Button */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Need the execution checklist for your Sub-Registrar visit?
                  </span>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Checklist Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Sub-Registrar Checklist</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* DUAL CONVERSION CTA COMPONENT */}
            <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-rose-500/30">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  Dual Legal Protection Pathways
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                  Protect Your Child&apos;s Inheritance Today
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Choose between drafting your own compliant online Will with testamentary trust clauses,
                  or consulting with senior family trust attorneys for bespoke high-net-worth estate
                  planning.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-5 space-y-3 backdrop-blur-sm flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-extrabold text-white text-base">Self-Serve Online Will</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Generate a legally binding Indian Will with minor child trust clauses in under 15
                      minutes. Instant PDF download ready for signature.
                    </p>
                  </div>
                  <button
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#b04567] text-white font-bold text-xs sm:text-sm transition-colors"
                  >
                    <span>Start Online Will Drafting</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/15 p-5 space-y-3 backdrop-blur-sm flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="font-extrabold text-white text-base">
                      Private Family Trust Formation
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Consult with senior advocates at AMA Legal Solutions to structure comprehensive
                      inter-vivos family trusts, overseas bequests, and tax exemptions.
                    </p>
                  </div>
                  <Link
                    href="/services/private-family-trust-formation"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <span>Consult Trust Attorneys</span>
                    <ArrowRight className="w-4 h-4 text-slate-900" />
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>LEGAL EXPERTISE &bull; AMA LEGAL SOLUTIONS</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Trust Advisory
              </h3>

              <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                <p>
                  WillDrafting.in is an institutional estate planning initiative powered by{" "}
                  <strong>AMA Legal Solutions</strong>, a premier Indian legal advisory firm specializing
                  in succession law, private family trusts, cross-border NRI estate planning, and high-value
                  probate litigation.
                </p>
                <p>
                  Our senior succession advocates possess over two decades of combined courtroom and
                  advisory experience across the Supreme Court of India, Delhi High Court, Bombay High
                  Court, and Karnataka High Court. We have structured testamentary trusts for tech founders,
                  business families, single parents, and special-needs guardians nationwide.
                </p>
              </div>

              {/* Verified Credentials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center space-y-1">
                  <div className="text-2xl font-black text-[#C65378]">20+ Yrs</div>
                  <div className="text-[11px] font-semibold text-slate-600">Judicial Experience</div>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center space-y-1">
                  <div className="text-2xl font-black text-[#C65378]">3,500+</div>
                  <div className="text-[11px] font-semibold text-slate-600">Wills &amp; Trusts Drafted</div>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center space-y-1">
                  <div className="text-2xl font-black text-emerald-700">100%</div>
                  <div className="text-[11px] font-semibold text-slate-600">Probate Success Rate</div>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center space-y-1">
                  <div className="text-2xl font-black text-[#C65378]">Zero</div>
                  <div className="text-[11px] font-semibold text-slate-600">Upfront Lifetime Fees</div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>QUESTIONS &amp; ANSWERS</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Minor Child Trusts
              </h3>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS & LEGAL RESOURCES */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL CITATIONS &bull; OFFICIAL PORTALS</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Legal Resources
              </h3>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                <p>
                  Every formula, clause, and recommendation provided on this page adheres strictly to
                  codified Indian statutes and Supreme Court of India precedents:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pt-1">
                  <li>
                    <strong>Indian Trusts Act, 1882:</strong> Sections 5 &amp; 6 (Creation of Trusts),
                    Section 11 (Fiduciary duties), Section 20 (Permissible investments), and Section 41
                    (Maintenance and advancement of minors).
                  </li>
                  <li>
                    <strong>Guardians and Wards Act, 1890:</strong> Section 7 (Appointment of guardians),
                    and Section 29 (Limitation of powers of testamentary guardians over immovable property).
                  </li>
                  <li>
                    <strong>Income Tax Act, 1961:</strong> Section 160(1)(iv) &amp; Section 161
                    (Representative assessees), and Proviso to Section 164(1) (Exemption from MMR for
                    single testamentary relative trusts).
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 63 (Execution of unprivileged
                    Wills) and Section 213 (Probate requirements in Kolkata, Chennai, and Mumbai).
                  </li>
                </ul>
              </div>

              {/* Official External Links Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between hover:border-[#C65378] transition-colors text-xs font-semibold text-slate-800"
                >
                  <span>India Code: Indian Trusts Act, 1882</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://www.incometax.gov.in/iec/foportal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between hover:border-[#C65378] transition-colors text-xs font-semibold text-slate-800"
                >
                  <span>Income Tax Portal: Section 164 Guidelines</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between hover:border-[#C65378] transition-colors text-xs font-semibold text-slate-800"
                >
                  <span>Supreme Court of India Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <Link
                  href="/tools"
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between hover:border-[#C65378] transition-colors text-xs font-semibold text-[#C65378]"
                >
                  <span>View All WillDrafting Legal Tools</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
