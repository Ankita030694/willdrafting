"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Layers,
  Globe,
  Coins,
  Briefcase,
  Shield,
  FileSpreadsheet,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "institutional-framework", label: "1. Institutional Legal Framework" },
  { id: "fee-calculator", label: "2. Fee Structure Calculator" },
  { id: "succession-matrix", label: "3. 4-Tier Family Office Matrix" },
  { id: "trust-vs-holdco", label: "4. Trust vs HoldCo Comparator" },
  { id: "service-deliverables", label: "5. 4-Phase Delivery Roadmap" },
  { id: "asset-ringfencing", label: "6. IBC Sec 32A & Ring-Fencing" },
  { id: "fema-cross-border", label: "7. FEMA & Cross-Border Wealth" },
  { id: "family-constitution", label: "8. Family Constitution & Governance" },
  { id: "case-studies", label: "9. Ultra-HNI Case Studies" },
  { id: "senior-partner", label: "10. Senior Partner Profile" },
  { id: "partner-consultation", label: "11. Partner Consultation Booking" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const FAQS = [
  {
    q: "What is the difference between a simple Will and a Private Family Trust?",
    a: "A simple Will only works after death. It needs court probate in cities like Mumbai and Kolkata. This causes long delays. A Private Trust works right away during your lifetime. It stops court fights. It protects family assets from business debts. It keeps your wealth 100% private.",
  },
  {
    q: "Does transferring property or shares into a Private Trust attract tax in India?",
    a: "No. Moving assets into an irrevocable trust is tax-free. Section 47(iii) of the Income Tax Act exempts capital gains on gifts and trusts. Also, Section 56(2)(x) exempts transfers to relatives. You pay zero capital gains tax when funding the trust.",
  },
  {
    q: "How does Section 32A of the IBC protect trust assets from business debts?",
    a: "Promoters often sign personal guarantees for business loans. If a company defaults, banks pursue promoter assets. But assets placed in an irrevocable trust while solvent stay safe. Creditors cannot touch them under Section 32A of the IBC.",
  },
  {
    q: "Can promoters transfer listed shares to a trust without open offers under SEBI rules?",
    a: "Yes. Promoters can move shares to family trusts without open offers. SEBI SAST Regulation 10(1)(a)(ii) gives an automatic exemption. The trust must name family members as the only trustees and heirs. This keeps promoter control intact.",
  },
  {
    q: "How do FEMA and Overseas Investment Rules 2022 govern cross-border wealth?",
    a: "Indian residents can send up to $250,000 each year under the RBI LRS limit. Under FEMA rules 2022, you can invest in foreign firms and hold foreign bank accounts. You must report these assets in Form FC and Schedule FA to avoid heavy penalties.",
  },
  {
    q: "Is a Family Constitution legally binding in Indian courts?",
    a: "Yes. In Kale v. Dy. Director of Consolidation, the Supreme Court upheld family deals. We link the charter to company Articles of Association. We also add voting pacts. This makes the family charter fully binding under the Indian Contract Act.",
  },
  {
    q: "When should a family office use a HoldCo versus a Private Trust?",
    a: "A Holding Company (HoldCo) manages operating businesses and pools group cash. An Irrevocable Private Trust holds the equity shares of that HoldCo. This hybrid model gives you full business control with ironclad creditor safety.",
  },
  {
    q: "How does Section 6 of the MWPA 1874 protect family insurance proceeds?",
    a: "An insurance policy taken under Section 6 of the MWPA creates an immediate trust for your wife and children. By law, no bank, court, creditor, or tax officer can attach these policy funds. The money goes directly to your family.",
  },
  {
    q: "How do you protect foreign bank accounts from Black Money Act penalties?",
    a: "Foreign assets face 300% tax fines if left undeclared. Our lawyers ensure full compliance with RBI FEMA guidelines. We report all foreign bank accounts and offshore trusts in Schedule FA of your tax return.",
  },
  {
    q: "What is the typical retainer fee and timeline for setting up a family trust?",
    a: "Our fixed retainers range from ₹1,50,000 to ₹10,00,000+ based on entity size and foreign assets. Most family trusts and corporate restructurings take 6 to 12 weeks from initial audit to final SRO registration.",
  },
];

export default function UltraHniFamilyOfficeClient() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>("institutional-framework");
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Calculator State
  const [netWorthTier, setNetWorthTier] = useState<string>("tier2"); // tier1: 25-75 Cr, tier2: 75-250 Cr, tier3: 250 Cr+
  const [structureType, setStructureType] = useState<string>("hybrid"); // trust, holdco, hybrid
  const [jurisdiction, setJurisdiction] = useState<string>("multi"); // domestic, multi
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "trust",
    "constitution",
    "holdco",
    "fema",
  ]);

  // Matrix Active Tier Tab
  const [activeMatrixTier, setActiveMatrixTier] = useState<number>(1);

  // ScrollSpy for Table of Contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Calculate Fee & Retainer Sizing
  const calculatedFeeData = useMemo(() => {
    let baseMin = 150000;
    let baseMax = 350000;
    let weeks = "6-8 Weeks";
    let bigLawFee = "₹12,00,000+ ($500/hr)";

    if (netWorthTier === "tier2") {
      baseMin = 350000;
      baseMax = 650000;
      weeks = "8-12 Weeks";
      bigLawFee = "₹25,00,000+ ($550/hr)";
    } else if (netWorthTier === "tier3") {
      baseMin = 650000;
      baseMax = 1200000;
      weeks = "12-16 Weeks";
      bigLawFee = "₹50,00,000+ ($650/hr)";
    }

    if (jurisdiction === "multi") {
      baseMin += 100000;
      baseMax += 250000;
    }

    const savings = "60% to 75% Fixed Retainer Advantage";

    return {
      feeRange: `₹${(baseMin / 100000).toFixed(2)} Lakh - ₹${(baseMax / 100000).toFixed(2)} Lakh`,
      timeline: weeks,
      bigLawFee,
      savings,
    };
  }, [netWorthTier, structureType, jurisdiction, selectedServices]);

  const toggleService = (key: string) => {
    if (selectedServices.includes(key)) {
      setSelectedServices(selectedServices.filter((s) => s !== key));
    } else {
      setSelectedServices([...selectedServices, key]);
    }
  };

  const copyTrustClause = () => {
    const clauseText = `IRREVOCABLE PRIVATE FAMILY TRUST CLAUSE (SECTION 5 & 6 INDIAN TRUSTS ACT, 1882):
"The Settlor hereby absolutely, irrevocably, and unconditionally assigns, transfers, and conveys unto the Trustees the Initial Trust Fund and Scheduled Trust Assets TO HAVE AND TO HOLD the same in Trust for the sole and exclusive benefit of the Specified Beneficiaries. Neither the Settlor, nor any of his creditors, bankruptcy trustees, or commercial claimants shall possess any right, reversionary interest, lien, or power of revocation over the Trust Estate. All distributions of income and corpus shall remain at the sole, absolute discretion of the Independent Board of Trustees, strictly immune from personal guarantee attachments or insolvency proceedings under the Insolvency and Bankruptcy Code, 2016."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN TRUSTS ACT, 1882 • COMPANIES ACT, 2013 • FEMA 1999 • SEBI SAST</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Ultra HNI Estate Planning &amp; Family Office Advisory
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Institutional legal architecture for promoters, business founders, and single family
            offices in India. Protect generational wealth through irrevocable private trusts,
            holding companies, cross-border FEMA structures, and binding family constitutions.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#fee-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Advisory Retainer</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#partner-consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#C65378]" />
              <span>Book Partner Consultation</span>
            </a>
            <Link
              href="/services/business-succession-family-constitution-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Business Succession</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹500 Cr+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ASSETS LEGALLY STRUCTURED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 47(iii)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX-NEUTRAL TRUST SETTLEMENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">IBC Sec 32A</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CREDITOR RING-FENCING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SEBI Reg 10</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAKEOVER EXEMPTION ROADMAP
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
                <span>Institutional Practice</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Indian Trusts Act 1882, Companies Act 2013, FEMA 1999,
                SEBI SAST Regulations 2011, and Income Tax Act 1961 Section 47(iii) and 56(2)(x).
              </p>
            </div>

            {/* Quick Consultation Jump Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Confidential Briefing</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Structuring an estate above ₹50 Crore across multiple family branches? Speak with
                our Senior Estate Partner under full legal privilege.
              </p>
              <a
                href="#partner-consultation"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Book Partner Session</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL & INTERACTIVE ASSETS
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/ultra-hni-family-office-estate-planning-advisory-og.jpg"
                  alt="Ultra HNI Estate Planning Lawyer and Family Office Advisory Services India"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Ultra-HNI Estate &amp; Family Office Blueprint: Irrevocable Trusts, HoldCos, Cross-Border FEMA &amp; Asset Ring-Fencing
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: ULTRA-HNI WEALTH GOVERNANCE ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Beyond Retail Wills:</strong> Retail wills require public court probate in
                    presidency cities, invite contested suits, and leave business assets vulnerable to personal creditor claims.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Irrevocable Trust Shield:</strong> Assets transferred into an irrevocable
                    private trust become immune to commercial insolvency under Section 32A of the IBC.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tax-Neutral Settlement:</strong> Section 47(iii) and 56(2)(x) of the
                    Income Tax Act ensure that transfers of shares and properties to relatives via trust incur zero capital gains.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>SEBI Open Offer Exemption:</strong> Transfers of promoter shares to private family
                    trusts enjoy general exemptions under SEBI SAST Regulation 10(1)(a)(ii).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cross-Border FEMA Harmony:</strong> Harmonize Indian assets with foreign
                    holdings under RBI LRS limits and Overseas Investment Rules 2022 without Black Money Act exposure.
                  </span>
                </li>
              </ul>
            </div>

            
            {/* PLAIN ENGLISH GUIDE BOX */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Summary: Why High Net Worth Families Use Private Trusts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Zero Tax on Transfer</p>
                  <p className="text-slate-600 mt-1">Move your shares and land for free. Section 47 protects family gifts. No capital gains tax applies. We make sure all papers stay valid.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Safe from Debts</p>
                  <p className="text-slate-600 mt-1">Keep business loans away from your home. Creditors cannot touch trust assets. Your family stays secure. Your wealth is safe.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">No Court Probate</p>
                  <p className="text-slate-600 mt-1">Skip slow High Court probate cases. The trust continues on its own. Successor trustees step in fast. No waiting for court orders.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Keep Family Peace</p>
                  <p className="text-slate-600 mt-1">Stop sibling fights before they start. A family charter sets clear rules. All heirs know their share. Everyone stays united.</p>
                </div>
              </div>
            </div>


            {/* STEP BY STEP PLAIN GUIDE */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Simple 4-Step Process: How We Help Your Family
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">1. We Check Your Assets</p>
                  <p className="text-slate-600 mt-1">We list all land, flats, bank accounts, and company shares. We check loan guarantees. We review your family goals.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">2. We Plan the Shield</p>
                  <p className="text-slate-600 mt-1">We pick the best trust or holding setup for you. We make sure it is tax-free. We check all FEMA rules.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">3. We Draft the Papers</p>
                  <p className="text-slate-600 mt-1">Our senior lawyers draft your trust deed and family rules. We update company articles. We make terms crystal clear.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">4. We Register Your Trust</p>
                  <p className="text-slate-600 mt-1">We handle the Sub-Registrar Office filing. We complete share transfers. We hand you the final papers.</p>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 ON PAGE) */}
            <section id="institutional-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Institutional Legal Framework: Private Trusts &amp; HoldCos
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  High-net-worth founders, promoters, and family business dynasties in India face
                  complex legal challenges. When family wealth exceeds ₹50 Crore, relying solely on
                  a testamentary Will creates severe structural vulnerabilities. A simple Will takes
                  effect only upon death, requires cumbersome probate in High Courts under Section 213
                  of the Indian Succession Act, and offers zero protection against business liabilities during the founder&apos;s lifetime.
                </p>
                <p>
                  Our institutional practice structures comprehensive estate architecture through the{" "}
                  <strong>Indian Trusts Act, 1882</strong> and the <strong>Companies Act, 2013</strong>.
                  By establishing an <em>Irrevocable Discretionary Private Family Trust</em>, the founder
                  legally divorces asset ownership from personal identity. Under Sections 5 and 6 of the
                  Indian Trusts Act, trust assets vest in professional or family trustees for designated
                  beneficiaries, creating an impenetrable legal barrier.
                </p>
                <p>
                  Under <strong>Section 47(iii) of the Income Tax Act, 1961</strong>, the transfer of
                  capital assets, whether equity shares in operating companies or valuable immovable
                  properties, to an irrevocable trust is expressly exempt from capital gains tax.
                  Simultaneously, Section 56(2)(x) exemptions apply when all named beneficiaries are
                  lineal relatives, making the entire restructuring exercise completely tax-neutral.
                </p>
                <p>
                  In the landmark ruling of <em>Shakti Yezdani v. Jayanand Salgaonkar (2023 SC)</em>,
                  the Supreme Court held that corporate share nominees are merely temporary custodians.
                  Nominees have no beneficial title. Establishing an institutional private trust guarantees
                  that equity transmission follows your governance blueprint rather than contested nominee claims.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE FEE CALCULATOR */}
            <section id="fee-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>TRANSPARENT INSTITUTIONAL RETAINER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Ultra-HNI Advisory Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Big law firms charge open-ended hourly retainers exceeding $500 per hour with zero
                predictability. Our family office practice operates on transparent, milestone-linked
                fixed retainers. Use this calculator to estimate your bespoke project scope and timeline.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Asset Size */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 1: Total Family Net Worth / Asset Pool</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "tier1", label: "₹25 Cr - ₹75 Cr", sub: "Emerging Family Office" },
                      { id: "tier2", label: "₹75 Cr - ₹250 Cr", sub: "Single Family Office" },
                      { id: "tier3", label: "₹250 Cr - ₹1,000 Cr+", sub: "Conglomerate Dynasty" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setNetWorthTier(opt.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          netWorthTier === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="text-sm font-extrabold text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Structuring Architecture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Step 2: Primary Restructuring Vehicle</span>
                    </label>
                    <select
                      value={structureType}
                      onChange={(e) => setStructureType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="trust">Irrevocable Private Family Trust</option>
                      <option value="holdco">Family Holding Company (Core Investment Co)</option>
                      <option value="hybrid">Hybrid Structure (Trust + HoldCo + Operating Cos)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Step 3: Jurisdictional Scope</span>
                    </label>
                    <select
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="domestic">Domestic India Only (Indian Trusts Act &amp; Cos Act)</option>
                      <option value="multi">Cross-Border (India + Singapore / DIFC / US / UK)</option>
                    </select>
                  </div>
                </div>

                {/* Step 4: Included Modules */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Retainer Modules Included
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { key: "trust", label: "Trust Deed Drafting & SRO Registration" },
                      { key: "constitution", label: "Family Constitution & Council Charter" },
                      { key: "holdco", label: "AoA Transmission Restructuring & Table F" },
                      { key: "fema", label: "FEMA LRS & Overseas Asset Harmonization" },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/30 cursor-pointer hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(item.key)}
                          onChange={() => toggleService(item.key)}
                          className="rounded text-[#C65378] focus:ring-[#C65378] w-4 h-4"
                        />
                        <span className="font-semibold text-slate-800">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Output Display Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-[#22353E] text-white p-5 sm:p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-bold text-rose-200 uppercase tracking-wider">
                        ESTIMATED FIXED LEGAL RETAINER
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {calculatedFeeData.feeRange}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        ESTIMATED TIMELINE
                      </div>
                      <div className="text-lg font-bold text-emerald-400 mt-1">
                        {calculatedFeeData.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-slate-400">Traditional Big Law Estimate:</div>
                      <div className="font-bold text-rose-300 mt-0.5">{calculatedFeeData.bigLawFee}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-slate-400">WillDrafting Cost Advantage:</div>
                      <div className="font-bold text-emerald-300 mt-0.5">{calculatedFeeData.savings}</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#partner-consultation"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Lock In Transparent Retainer Terms</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: MULTI-TIERED FAMILY OFFICE SUCCESSION MATRIX */}
            <section id="succession-matrix" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>4-TIER ARCHITECTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Multi-Tiered Family Office Succession Matrix
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                An institutional family office structure separates assets into dedicated legal silos.
                This ring-fences commercial operating risks from family living wealth and real estate.
                Explore the four primary tiers below:
              </p>

              {/* Tab Navigation for Matrix */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
                {[
                  { tier: 1, label: "Tier 1: Corporate Equity & Shares" },
                  { tier: 2, label: "Tier 2: Real Estate & Land Parcels" },
                  { tier: 3, label: "Tier 3: Overseas & Cross-Border FEMA" },
                  { tier: 4, label: "Tier 4: Philanthropy & Family Foundation" },
                ].map((tab) => (
                  <button
                    key={tab.tier}
                    type="button"
                    onClick={() => setActiveMatrixTier(tab.tier)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeMatrixTier === tab.tier
                        ? "bg-[#172228] text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tier Content Panels */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
                {activeMatrixTier === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                      <Building2 className="w-5 h-5 text-[#C65378]" />
                      <span>Tier 1: Corporate Equity, Unlisted Shares &amp; Listed Securities</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Promoter equity in active manufacturing, fintech, or service entities carries
                      operational risks. We structure a Core Investment Company (CIC) or dedicated
                      equity holding trust. The trust holds operating shares, immunizing them against
                      director personal guarantee attachments under Section 32A of the IBC.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">SEBI SAST Exemption:</div>
                        <div className="text-slate-600">
                          Transferring listed promoter shares to private family trusts complies with Regulation 10(1)(a)(ii) with zero open-offer penalty.
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Articles of Association (AoA):</div>
                        <div className="text-slate-600">
                          Table F transmission rules amended to ensure board seats pass solely to appointed family trustees.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMatrixTier === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                      <Landmark className="w-5 h-5 text-[#C65378]" />
                      <span>Tier 2: High-Value Residential, Commercial &amp; Ancestral Real Estate</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Physical properties across Mumbai, Delhi NCR, Bengaluru, and ancestral lands
                      often generate fierce co-heir disputes. We place real estate into a dedicated
                      Property Investment Trust with clear life-interest and tenancy rights for the spouse.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Zero SRO Mutation Fights:</div>
                        <div className="text-slate-600">
                          Title remains vested in the Trust. Subsequent generational transfers occur without court probate or SRO stamp duty leaks.
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Coparcenary Shield:</div>
                        <div className="text-slate-600">
                          Harmonizes coparcenary daughter equality under Vineeta Sharma with non-coparcenary commercial acquisitions.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMatrixTier === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                      <Globe className="w-5 h-5 text-[#C65378]" />
                      <span>Tier 3: Offshore Subsidiaries, Foreign Securities &amp; FEMA Compliance</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Founders with children in the United States, United Kingdom, Singapore, or UAE
                      need cross-border harmony. We coordinate Indian trust deeds with foreign asset
                      trusts in Singapore or DIFC, ensuring full compliance with FEMA Overseas Investment Rules 2022.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Black Money Act Defense:</div>
                        <div className="text-slate-600">
                          100% transparent Schedule FA disclosures in Indian tax returns, preventing draconian 300% penalty exposure.
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">LRS Remittance Protocol:</div>
                        <div className="text-slate-600">
                          Optimizes $250,000 per family member annual LRS remittances under RBI liberalized guidelines.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMatrixTier === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                      <Award className="w-5 h-5 text-[#C65378]" />
                      <span>Tier 4: Philanthropy, CSR Allocations &amp; Family Foundation</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Enduring dynasties dedicate 10% to 25% of annual dividends to educational, healthcare,
                      or environmental causes. We set up Section 8 Companies or Public Charitable Trusts
                      with 12AB and 80G registrations, fulfilling mandatory corporate CSR commitments while preserving dynasty values.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Next-Gen Leadership:</div>
                        <div className="text-slate-600">
                          Engages non-executive family heirs in governance, grant-making, and charitable oversight boards.
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-extrabold text-slate-900">Tax Exemption Continuity:</div>
                        <div className="text-slate-600">
                          Charitable corpus grows completely exempt from Indian income taxes under Section 11 of the Income Tax Act.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 4: TRUST VS HOLDCO TAX COMPARATOR */}
            <section id="trust-vs-holdco" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE GOVERNANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Trust vs Family HoldCo Governance &amp; Tax Analysis
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Promoters frequently debate whether to consolidate family wealth inside a Holding
                Company (HoldCo) or an Irrevocable Private Family Trust. The table below analyzes both
                options under Indian corporate and tax jurisprudence:
              </p>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-4 px-4 sm:px-6 font-extrabold">Structuring Dimension</th>
                      <th className="py-4 px-4 sm:px-6 font-extrabold text-rose-200">
                        Irrevocable Private Trust
                      </th>
                      <th className="py-4 px-4 sm:px-6 font-extrabold text-slate-200">
                        Corporate HoldCo (CIC)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Governing Legislation
                      </td>
                      <td className="py-3.5 px-4 sm:px-6">Indian Trusts Act, 1882</td>
                      <td className="py-3.5 px-4 sm:px-6">Companies Act, 2013 &amp; RBI NBFC Norms</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Capital Gains on Asset Transfer
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                        Exempt under Section 47(iii)
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-amber-800">
                        Taxable unless qualifying under Sec 47(iv)/(v)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Creditor &amp; Insolvency Shield
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                        Absolute (Protected under IBC Sec 32A)
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-amber-800">
                        Vulnerable if promoter pledged shares
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Confidentiality &amp; Privacy
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                        100% Private (No public registry)
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                        Public (MCA filings, RoC balance sheets)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Probate Exemption upon Death
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                        Immediate continuity via successor trustees
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                        Requires share transmission &amp; probate in presidency towns
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Annual Regulatory Compliance
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-bold">
                        Minimal (Trust ITR filing only)
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                        Heavy (Statutory audits, AGMs, RoC forms)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                        Recommended Best Practice
                      </td>
                      <td colSpan={2} className="py-3.5 px-4 sm:px-6 bg-rose-50/40 text-slate-800 font-semibold">
                        <strong>The Institutional Hybrid Model:</strong> Hold operating businesses
                        inside a Corporate HoldCo, while 100% of the HoldCo shares are owned by an
                        Irrevocable Private Family Trust. This delivers commercial flexibility with
                        flawless creditor ring-fencing.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            
            {/* SRO REGISTRATION CHECKLIST IN PLAIN WORDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                SRO Trust Registration Checklist
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Original Trust Deed</p>
                  <p className="text-slate-600 mt-1">Printed on non-judicial stamp paper. Signed by settlor and trustees. All pages initialed. Clean execution.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">ID Proof Papers</p>
                  <p className="text-slate-600 mt-1">PAN cards and Aadhaar cards. Required for all parties. Self-attested copies ready. Two passport photos.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Two Adult Witnesses</p>
                  <p className="text-slate-600 mt-1">Independent adult witnesses present. Original IDs with them. Watch parties sign. Complete official proof.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">SRO Challan Receipt</p>
                  <p className="text-slate-600 mt-1">Online fee receipt paid. Appointment slip booked. Fast-track biometric verification. Done in one visit.</p>
                </div>
              </div>
            </div>


            {/* PROMOTER SHARE SAFEGUARDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Key Safeguards for Company Promoters
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Voting Power Stays Intact</p>
                  <p className="text-slate-600 mt-1">Trustees vote as a single bloc. No split voting on company boards. Full promoter control remains.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">No Open Offer Under SEBI</p>
                  <p className="text-slate-600 mt-1">Regulation 10 exempts family trusts. No public buyout needed. Clean transfer of listed shares.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Table F Transmission Rules</p>
                  <p className="text-slate-600 mt-1">Update company articles. Ensure seamless board succession. Avoid disputes with minority partners.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Keyman Insurance Escrow</p>
                  <p className="text-slate-600 mt-1">Company buys Keyman cover. Funds clear bank debts. Liquid cash for business continuity.</p>
                </div>
              </div>
            </div>

            {/* SECTION 5: SERVICE DELIVERABLES MATRIX */}
            <section id="service-deliverables" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>4-PHASE ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Institutional Retainer Deliverables &amp; Roadmap
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Our ultra-HNI advisory team manages the entire execution lifecycle over a 12-week
                institutional roadmap. Every milestone is led directly by Senior Partners:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phase 1 */}
                <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-[#C65378] text-[11px] font-extrabold">
                      PHASE 1: WEEKS 1-2
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Diagnostic Discovery &amp; Comprehensive Asset Audit
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Complete asset cataloging across real estate, shares, and foreign holdings</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Reviewing personal guarantees, pledge agreements, and loan covenants</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Confidential interviews with founder and key family heirs</span>
                    </li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-extrabold">
                      PHASE 2: WEEKS 3-4
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Structural Architecture, Tax &amp; FEMA Blueprints
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Designing Trust vs HoldCo legal blueprints with tax neutrality analysis</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>SEBI SAST open offer exemption structuring under Regulation 10</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Cross-border FEMA compliance review for NRI and foreign resident children</span>
                    </li>
                  </ul>
                </div>

                {/* Phase 3 */}
                <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-extrabold">
                      PHASE 3: WEEKS 5-8
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Legal Drafting: Trust Deeds, Family Charter &amp; AoA
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Drafting Irrevocable Discretionary Trust Deeds with protective powers</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Drafting Family Constitution, Council Charters, and Dispute SOPs</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Drafting Companies Act AoA amendments and Table F share transmission clauses</span>
                    </li>
                  </ul>
                </div>

                {/* Phase 4 */}
                <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                      PHASE 4: WEEKS 9-12
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Execution, SRO Filing, Demat Transmission &amp; Closure
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Supervising trust deed registration at local Sub-Registrar Offices (SRO)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Executing off-market Demat share transfers to trust accounts</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Handing over institutional Family Office Governance Binder to Board</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: RING-FENCING & ASSET PROTECTION */}
            <section id="asset-ringfencing" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Shield className="w-4 h-4" />
                <span>WEALTH RING-FENCING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. IBC Section 32A Ring-Fencing &amp; Wealth Defense
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In modern Indian commercial law, promoters face severe personal exposure. When a
                  company borrows from consortium lenders, founders routinely execute personal guarantees.
                  If the business encounters insolvency, lenders invoke personal insolvency under Part III
                  of the <strong>Insolvency and Bankruptcy Code, 2016 (IBC)</strong>.
                </p>
                <p>
                  To shield family living assets from business collapse, timing is paramount. Assets
                  settled into an <em>Irrevocable Private Trust</em> while the promoter is fully solvent,
                  with no overdue debts or impending litigation, are legally immune to resolution
                  professional attachment. Under Section 32A of the IBC and settled Indian jurisprudence,
                  trust properties do not form part of the promoter&apos;s personal liquidation estate.
                </p>
                <p>
                  Furthermore, our partners structure executive life insurance policies under{" "}
                  <strong>Section 6 of the Married Women&apos;s Property Act, 1874 (MWPA)</strong>.
                  A policy taken under the MWPA creates an immediate, non-revocable statutory trust in
                  favor of the wife and children. By statute, neither the husband, his commercial creditors,
                  court receivers, nor the Income Tax Department can touch the policy proceeds.
                </p>

                {/* FEATURED INJUNCTION SAFEGUARD CARD */}
                <div className="my-6 rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Gavel className="w-4 h-4" />
                    <span>LITIGATION SAFEGUARD: STOPPING ALIENATION OF FAMILY ASSETS</span>
                  </div>
                  
                  {/* Secondary Image Visual */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100">
                    <Image
                      src="/images/application-for-temporary-injunction-probate-format-og.jpg"
                      alt="Application for Temporary Injunction in Probate Suit Order 39 Rules 1 and 2 CPC"
                      width={1200}
                      height={675}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Testamentary Injunctions: Order 39 Rules 1 &amp; 2 CPC Court Safeguards
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If rogue relatives or estranged branches attempt to sell, mortgage, or create
                      third-party rights over high-value family estates before succession is resolved,
                      our litigation partners file urgent Temporary Injunction Petitions under Order 39
                      Rules 1 and 2 CPC and seek appointment of an Administrator Pendente Lite under Section
                      247 of the Indian Succession Act to preserve the corpus intact.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/templates/partition-deed-format-between-family-members"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
                    >
                      <span>Explore Family Partition Deed Format</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Copyable Statutory Trust Clause Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Sample Irrevocable Ring-Fencing Clause</span>
                    </span>
                    <button
                      type="button"
                      onClick={copyTrustClause}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      {copiedClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] sm:text-xs font-mono text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {`The Settlor hereby absolutely, irrevocably, and unconditionally assigns, transfers, and conveys unto the Trustees the Scheduled Trust Assets TO HAVE AND TO HOLD the same in Trust for the sole and exclusive benefit of the Specified Beneficiaries. Neither the Settlor, nor any of his creditors, bankruptcy trustees, or commercial claimants shall possess any right, lien, or power of revocation over the Trust Estate. All distributions shall remain at the sole, absolute discretion of the Independent Board of Trustees, strictly immune from personal guarantee attachments or insolvency proceedings under the Insolvency and Bankruptcy Code, 2016.`}
                  </pre>
                </div>
              </div>
            </section>

            
            {/* FEMA TIPS IN PLAIN WORDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                FEMA and Foreign Wealth Rules Made Simple
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Annual LRS Limits</p>
                  <p className="text-slate-600 mt-1">Send up to 250,000 USD each year. Every family member gets this limit. Use it for foreign investments.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">RNOR Tax Holiday</p>
                  <p className="text-slate-600 mt-1">Returning NRIs get two tax-free years. Foreign income is not taxed in India. Plan gifts early.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Schedule FA Filings</p>
                  <p className="text-slate-600 mt-1">Declare all foreign bank accounts. Report overseas shares in your ITR. Stay 100% compliant with tax laws.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">DTAA Double Tax Relief</p>
                  <p className="text-slate-600 mt-1">Avoid paying tax twice. Claim tax treaty credits in India. Keep your global wealth secure.</p>
                </div>
              </div>
            </div>


            {/* TRUSTEE DUTIES IN PLAIN WORDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Choosing the Right Trustees for Your Family
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Family Trustees</p>
                  <p className="text-slate-600 mt-1">Senior family members manage decisions. They know family values. They protect living needs.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Independent Trustees</p>
                  <p className="text-slate-600 mt-1">Respected legal or financial experts. They provide neutrality. They help settle disputes calmly.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Protector Role</p>
                  <p className="text-slate-600 mt-1">The founder can act as Protector. Veto power over big asset sales. Complete peace of mind.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Corporate Trustees</p>
                  <p className="text-slate-600 mt-1">Institutional trust companies. Continuous governance across decades. No reliance on single individuals.</p>
                </div>
              </div>
            </div>

            {/* SECTION 7: CROSS-BORDER FEMA & MULTI-JURISDICTION */}
            <section id="fema-cross-border" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>CROSS-BORDER SUCCESSION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Cross-Border FEMA &amp; Multi-Jurisdiction Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most modern ultra-HNI families are cross-border by nature. Founders reside in India,
                  while adult children may be citizens or green card holders in the United States,
                  United Kingdom, Singapore, or Canada. This geographical spread introduces severe
                  cross-border legal friction under FEMA and foreign tax codes.
                </p>
                <p>
                  Under the <strong>Foreign Exchange Management Act, 1999 (FEMA)</strong> and the{" "}
                  <strong>FEMA (Overseas Investment) Rules, 2022</strong>, Indian resident parents
                  cannot freely gift foreign securities or offshore holdings without adhering to
                  strict reporting norms. Remittances from India are governed by the RBI&apos;s Liberalised
                  Remittance Scheme (LRS), capped at $250,000 per financial year per individual.
                </p>
                <p>
                  For returning NRIs, <strong>Section 6(6) of the Income Tax Act</strong> provides a
                  vital 2-year tax shelter as a <em>Resident but Not Ordinarily Resident (RNOR)</em>.
                  During this RNOR window, foreign interest, dividends, and capital gains remain immune
                  from Indian income tax, providing a unique golden window to settle offshore trusts or gift securities tax-free.
                </p>
                <p>
                  Our advisory harmonizes Indian domestic trusts with offshore structures in Singapore
                  or the Dubai International Financial Centre (DIFC). We eliminate double taxation risks
                  under Double Tax Avoidance Agreements (DTAA) while ensuring total compliance with
                  Schedule FA foreign asset disclosures.
                </p>
              </div>
            </section>

            
            {/* 3-WAY COMPARISON IN PLAIN WORDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Comparison: Simple Will vs Private Trust vs HoldCo
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <p className="font-bold text-slate-900">1. Simple Will</p>
                  <p className="text-slate-600">Works only after death. Needs court probate. Relatives can contest it. Offers zero asset protection. High court fees apply.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <p className="font-bold text-slate-900">2. Irrevocable Private Trust</p>
                  <p className="text-slate-600">Works during your life. No court probate needed. Protects assets from bank debts. Completely private. No family fights.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1">
                  <p className="font-bold text-slate-900">3. Family Holding Company</p>
                  <p className="text-slate-600">Best for running group firms. Pools cash and dividends. Governed by company law. Shares can sit inside a private trust.</p>
                </div>
              </div>
            </div>


            {/* WHY A FAMILY CHARTER MATTERS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Why Every Family Business Needs a Charter
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Clear Voting Rules</p>
                  <p className="text-slate-600 mt-1">Decide who votes on big deals. Set clear board seats. Keep leadership smooth. Avoid deadlocks.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Fair Dividend Payouts</p>
                  <p className="text-slate-600 mt-1">Set annual cash shares. Ensure non-working heirs receive fair payouts. Prevent fights over profits.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Private Mediation</p>
                  <p className="text-slate-600 mt-1">Resolve fights in private. Elder counsels step in first. Keep family disputes out of public courts.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Next-Gen Training</p>
                  <p className="text-slate-600 mt-1">Prepare children for future roles. Define entry rules for business. Foster family unity and pride.</p>
                </div>
              </div>
            </div>

            {/* SECTION 8: FAMILY CONSTITUTION & GOVERNANCE */}
            <section id="family-constitution" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>DYNASTY HARMONY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Family Constitution, Council &amp; Dispute Protocols
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Eighty percent of family business wealth dissolves by the third generation. The
                  cause is rarely commercial failure; it is internal sibling warfare, divergent
                  expectations, and ambiguous decision-making rules. A <strong>Family Constitution</strong>{" "}
                  is the foundational charter that safeguards multi-generational peace.
                </p>
                <p>
                  In the landmark ruling of <em>Kale v. Dy. Director of Consolidation (1976 SC)</em>,
                  the Supreme Court held that family arrangements must be upheld to maintain family
                  peace and avoid protracted litigation. We translate family values into legally
                  enforceable contracts by mirroring the Constitution in the company Articles of Association (AoA)
                  and Shareholders Agreements (SHA).
                </p>
                <p>
                  A robust Family Constitution drafted by our practice establishes:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Family Council Governance:</strong> Rules for voting, entry of next-generation
                      spouses, and qualifications required for executive board appointments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dividend vs Growth Allocation:</strong> Formulaic dividend policies providing
                      liquidity for non-working branch members while funding business reinvestment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Private Dispute Resolution Protocol:</strong> Mandatory confidential mediation
                      by trusted elder counsels before any party can approach court or NCLT tribunals.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            
            {/* 4 QUICK FACTS IN PLAIN WORDS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Facts About Private Trusts in India
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Total Privacy</p>
                  <p className="text-slate-600 mt-1">Trust deeds are private. No public MCA records. No online balance sheets. Complete family discretion.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Instant Succession</p>
                  <p className="text-slate-600 mt-1">Successor trustees take charge fast. No waiting for wills. No court disputes. Smooth family transition.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Creditor Shield</p>
                  <p className="text-slate-600 mt-1">Company debts stay away. Section 32A protects your home. Trust assets stay safe. True legal peace.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Zero Tax Leaks</p>
                  <p className="text-slate-600 mt-1">Transfer assets tax free. Section 47 exempts trust gifts. No capital gains tax. 100% tax neutral.</p>
                </div>
              </div>
            </div>


            {/* IMMEDIATE BENEFITS FOR FOUNDERS */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Immediate Benefits for Startup and SME Founders
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Pre-IPO Structuring</p>
                  <p className="text-slate-600 mt-1">Move equity before listing. Lock in low values. Protect family shares early. Enjoy smooth IPOs.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Founder Share Control</p>
                  <p className="text-slate-600 mt-1">Retain board control. Vote shares as a unit. Avoid minority disputes. Build your business safely.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Next-Gen Support</p>
                  <p className="text-slate-600 mt-1">Fund children education easily. Set up medical emergency pools. Provide steady living allowances.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Fixed Retainer Pricing</p>
                  <p className="text-slate-600 mt-1">Pay transparent fixed retainers. No costly hourly bills. Work directly with partners. Total clarity.</p>
                </div>
              </div>
            </div>

            {/* SECTION 9: REAL ULTRA-HNI CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>PROVEN PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Case Studies: Tech Unicorns &amp; Family Empires
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review how our senior counsels have resolved complex multi-generational structuring
                challenges for prominent Indian business promoters:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Case Study 1 */}
                <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>SECTOR: B2B SAAS / FINTECH</span>
                    <span className="text-[#C65378] font-extrabold">₹650 CR VALUATION</span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Pre-IPO Founder Ring-Fencing &amp; Trust Setup
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A technology founder preparing for an institutional IPO held 42% personal equity.
                    Our practice established an Irrevocable Discretionary Trust, transferred 30% equity
                    under Section 47(iii) exemption, and obtained SEBI SAST Regulation 10 open-offer exemption.
                    The founder successfully ring-fenced family wealth prior to public listing.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Tax Leakage Prevented: ₹0</span>
                    <span>Status: Fully Implemented</span>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>SECTOR: MANUFACTURING DYNASTY</span>
                    <span className="text-[#C65378] font-extrabold">₹1,200 CR ASSETS</span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Resolving Multi-Branch Deadlock via HoldCo &amp; Charter
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Three branches of a third-generation industrial family deadlocked over plant modernization.
                    We drafted a binding Family Constitution, restructured the holding entity into dual share
                    classes (voting equity for operational leaders, preferred fixed dividend shares for non-executive heirs),
                    and prevented public NCLT oppression litigation.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Litigation Averted: 100%</span>
                    <span>Status: Generational Peace</span>
                  </div>
                </div>
              </div>
            </section>

            
            {/* WHY WILLDRAFTING LEADS IN TRUST LAW */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Why Promoters Trust AMA Legal Solutions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Proven Court Experience</p>
                  <p className="text-slate-600 mt-1">Our partners argue in High Courts. We draft deeds that stand trial. No legal loopholes. Full safety.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">No Billable Hours</p>
                  <p className="text-slate-600 mt-1">We charge set fees. You know your costs on day one. No bill shock. Pure transparency.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Direct Partner Access</p>
                  <p className="text-slate-600 mt-1">Work directly with senior counsel. No junior associates. Fast turnarounds. Reliable advice.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Complete Discretion</p>
                  <p className="text-slate-600 mt-1">All talks stay under legal privilege. Strict non disclosure terms. Your estate stays private.</p>
                </div>
              </div>
            </div>


            {/* 4 CORE GUARANTEES */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Our 4 Guarantees for Every Family Office
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="font-bold text-slate-900">100% Tax Neutral</p>
                  <p className="text-slate-600 mt-1">No gift tax leaks. No capital gains tax. Full Section 47 benefits. Valid tax certificates.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="font-bold text-slate-900">Zero Creditor Risk</p>
                  <p className="text-slate-600 mt-1">Personal guarantees cannot attach trust land. Safe under Section 32A. Your family home is safe.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="font-bold text-slate-900">Seamless SRO Filing</p>
                  <p className="text-slate-600 mt-1">We handle all stamp papers. We attend the Sub Registrar Office. Quick and stress free.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <p className="font-bold text-slate-900">Generational Unity</p>
                  <p className="text-slate-600 mt-1">Keep children united. Stop inheritance disputes. Preserve your family name for decades.</p>
                </div>
              </div>
            </div>

            {/* SECTION 10: SENIOR PARTNER PROFILE */}
            <section id="senior-partner" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>LEGAL COUNSEL CREDENTIALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Senior Partner Profile &amp; Counsel Credentials
              </h3>

              {/* Partner Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#172228] to-[#2B3E48] text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                    AAM
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-extrabold text-slate-900">
                      Advocate Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Partner &amp; Head of Commercial Estate Planning, AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-600">
                      Advocate on Record, High Court of Delhi &amp; Supreme Court Practice
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Advocate Anuj Anand Malik leads the private client and family office practice at
                  AMA Legal Solutions. He has structured private family trusts, corporate succession
                  blueprints, and cross-border estates exceeding ₹500 Crore in cumulative asset value.
                  His team bridges complex corporate tax laws, SEBI regulations, and Indian trust
                  jurisprudence to provide ironclad generational protection.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-xl bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-sm">15+ Years</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Legal Experience</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-sm">₹500 Cr+</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Wealth Structured</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-sm">100%</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Client Privilege</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-sm">Fixed Fees</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Zero Billable Leaks</div>
                  </div>
                </div>
              </div>
            </section>

            
            {/* 4 STEPS TO GET STARTED */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                How to Begin Your Family Trust Setup
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">1. Book a Call</p>
                  <p className="text-slate-600 mt-1">Contact our team online. Set a private talk. All talks stay protected. Full privacy guaranteed.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">2. Share Your Goals</p>
                  <p className="text-slate-600 mt-1">List your key assets. Share your family wishes. We review all papers. We find the right setup.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">3. Approve the Draft</p>
                  <p className="text-slate-600 mt-1">Our partners write your deed. We check every clause. You review the draft. Total peace of mind.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">4. Register and Relax</p>
                  <p className="text-slate-600 mt-1">We attend the registry office. We complete all filings. Your family wealth stays safe forever.</p>
                </div>
              </div>
            </div>

            {/* SECTION 11: DIRECT PARTNER CONSULTATION CTA */}
            <section id="partner-consultation" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>CONFIDENTIAL PRIVILEGE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Confidential Partner Legal Retainer Booking
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Take the first proactive step to insulate your family dynasty against creditor risks,
                tax leaks, and contested court disputes. Request a direct consultation with our
                Senior Estate Planning Partner:
              </p>

              {/* Consultation Card (NO MOBILE NUMBER) */}
              <div className="rounded-3xl bg-gradient-to-br from-[#172228] via-[#1E2E36] to-[#121C22] text-white p-6 sm:p-8 md:p-10 shadow-xl space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Attorney-Client Privilege Protected</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                    Schedule Your Comprehensive Family Office Diagnostic
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Our Senior Partners personally review your entity holding structures, existing wills,
                    and personal guarantee liabilities under non-disclosure agreements before recommending
                    an optimal trust or holding company architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fixed retainer milestone quotes with zero hourly surprises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct partner drafting with zero junior handoffs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cross-border coordination with US, UK &amp; Singapore counsels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% confidential private trust execution</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <span>Request Confidential Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services/business-succession-family-constitution-lawyer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-colors"
                  >
                    <span>Explore Business Succession</span>
                  </Link>
                </div>
              </div>
            </section>

            
            {/* WHO NEEDS THIS ADVISORY */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Who Needs Family Office Estate Advisory?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Company Promoters</p>
                  <p className="text-slate-600 mt-1">Founders with over ₹25 Crore equity. You need to protect your shares. We keep your voting control intact.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Real Estate Owners</p>
                  <p className="text-slate-600 mt-1">Families with multiple plots and buildings. You want to avoid family partition suits. We divide land peacefully.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Cross-Border Families</p>
                  <p className="text-slate-600 mt-1">Parents with NRI children in the US or UK. You must follow FEMA rules. We handle all cross-border taxes.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Business Dynasties</p>
                  <p className="text-slate-600 mt-1">Third-generation family businesses. You want to stop sibling disputes. A clear family constitution protects peace.</p>
                </div>
              </div>
            </div>


            {/* COMMON MISTAKES BOX */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Common Wealth Planning Mistakes to Avoid
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Relying on a Simple Will</p>
                  <p className="text-slate-600 mt-1">A simple Will leads to court probate delays. Heirs fight in High Courts. A private trust avoids this risk.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Bank Nominee Confusion</p>
                  <p className="text-slate-600 mt-1">Nominees are not legal owners. The Supreme Court confirmed this rule. Only a trust ensures true inheritance.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">Personal Loan Guarantees</p>
                  <p className="text-slate-600 mt-1">Business defaults risk family homes. An irrevocable trust ring-fences your wealth before lenders take action.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-900">FEMA Reporting Lapses</p>
                  <p className="text-slate-600 mt-1">Foreign bank accounts face heavy penalties if not reported. We ensure strict Schedule FA disclosures in your tax return.</p>
                </div>
              </div>
            </div>


            {/* QUICK FAQ SUMMARY */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quick Answers to Key Family Office Questions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Is a Trust Tax-Free?</p>
                  <p className="text-slate-600 mt-1">Yes. Section 47 exempts gifts to family trusts. You pay zero capital gains tax when transferring shares.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">Can Creditors Attach Assets?</p>
                  <p className="text-slate-600 mt-1">No. Irrevocable trusts protect assets from creditors under Section 32A of the IBC. You must set it up while solvent.</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <p className="font-bold text-slate-900">How Long Does it Take?</p>
                  <p className="text-slate-600 mt-1">Setting up a full family trust takes 6 to 12 weeks. We draft, verify, and register everything with local authorities.</p>
                </div>
              </div>
            </div>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Family Office Law
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to critical legal and tax questions regarding ultra-HNI wealth
                governance in India:
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm hover:bg-slate-50/50 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR PROFILE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#172228] to-[#2B3E48] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Partner &amp; Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in institutional private trusts, corporate share transmission, FEMA wealth
                succession, and promoter creditor defense at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - PARTNER RETAINER BOOKING */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>INSTITUTIONAL RING-FENCING</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Shield Generational Wealth Against Creditor Claims
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  An irrevocable private family trust legally ring-fences living assets, real estate,
                  and company equity against future business insolvency under Section 32A of the IBC.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Partner Briefing</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict Non-Disclosure &amp; Full Privilege</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - BUSINESS SUCCESSION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>FAMILY CONSTITUTION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Harmonize Operating Companies &amp; Multi-Branch Heirs
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our corporate counsels draft custom Shareholders Agreements, amend Table F company
                  Articles, and establish Family Council charters to ensure seamless generational continuity.
                </p>
                <Link
                  href="/services/business-succession-family-constitution-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Explore Business Succession</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Family Offices Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tax-Neutral Transfers:</strong> Section 47(iii) and 56(2)(x) compliance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>IBC Insolvency Shield:</strong> Ring-fences assets from corporate guarantees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Transparent Fixed Retainers:</strong> Zero hourly $500/hr billing inflation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR (NO MOBILE NUMBER) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#fee-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Fee Calculator</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Partner Call</span>
        </Link>
      </div>
    </div>
  );
}
