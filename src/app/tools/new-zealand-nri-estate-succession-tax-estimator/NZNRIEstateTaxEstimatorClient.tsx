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
  DollarSign,
  Globe,
  Coins,
  Send,
  Calendar,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal & Tax Framework: New Zealand NRI Inheritance" },
  { id: "interactive-calculator", label: "2. Free NZ NRI Estate & Repatriation Calculator Tool" },
  { id: "nz-ird-rules", label: "3. New Zealand IRD Tax Rules: Zero Estate Duty & CGT" },
  { id: "foreign-trust-regime", label: "4. NZ Foreign Trust Regime & Distribution Tax Rules" },
  { id: "indian-tax-framework", label: "5. Indian Inheritance Tax: Section 56 & Section 195" },
  { id: "repatriation-sop", label: "6. SOP: Repatriating Indian Estate to New Zealand" },
  { id: "dtaa-credits", label: "7. NZ-India DTAA Article 13 & Foreign Tax Credits" },
  { id: "case-studies", label: "8. Practical NRI Case Studies: Auckland & Wellington" },
  { id: "compliance-checklist", label: "9. Cross-Border Compliance Checklist & Legal Recitals" },
  { id: "institutional-profile", label: "10. Institutional Profile: Cross-Border Legal Desk" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions: Kiwi NRI Succession" },
  { id: "statutory-citations", label: "12. Statutory Citations & Official Government Portals" },
];

const FAQS = [
  {
    q: "Does New Zealand Inland Revenue (IRD) tax inherited property in India?",
    a: "No. New Zealand has no estate duty, death duties, or inheritance tax. An inheritance of land or flats in India received by a Kiwi tax resident is not subject to tax by Inland Revenue at the time of transfer.",
  },
  {
    q: "Does the New Zealand Bright-line property rule apply to inherited Indian land?",
    a: "No. Under Section CB 6A(1) of the New Zealand Income Tax Act 2007, residential property acquired through inheritance or transmission upon death is specifically exempt from the Bright-line residential test.",
  },
  {
    q: "Are distributions from an Indian family trust taxable in New Zealand?",
    a: "Under New Zealand trust taxation rules, an Indian trust settled by non-residents is classified as a Foreign Trust. Distribution of original trust corpus is tax-free in New Zealand. However, distributions of accumulated income or capital gains are taxable at marginal rates up to 39%, unless you qualify as a Transitional Resident.",
  },
  {
    q: "How does the India-New Zealand DTAA protect against double taxation?",
    a: "Under Article 13 of the India-New Zealand Double Tax Avoidance Agreement (DTAA), India retains the primary right to tax capital gains arising from immovable property located in India. Under Article 23, New Zealand provides a Foreign Tax Credit for income taxes paid in India against any New Zealand tax liability.",
  },
  {
    q: "What are the RBI FEMA rules for repatriating inherited property sale proceeds to New Zealand?",
    a: "Under RBI Master Direction No. 13/2015-16, an NRI can repatriate up to USD 1,000,000 per financial year from their NRO account balances. The remitter must complete Form 15CA on the Indian tax portal, obtain Form 15CB certification from an Indian Chartered Accountant, and submit Form A2 to their bank.",
  },
  {
    q: "Do I need to pay TDS in India when selling my inherited property from New Zealand?",
    a: "Yes. When an NRI sells Indian property, the buyer is required to withhold tax under Section 195 of the Income-tax Act at 20% plus applicable surcharge and cess on the total sale consideration. To avoid excessive withholding on gross value, the NRI can apply for a Lower Deduction Certificate under Section 197.",
  },
  {
    q: "What is the 48-month Transitional Resident tax exemption in New Zealand?",
    a: "Under Section HR 8 of the NZ Income Tax Act 2007, new migrants or returning Kiwis who have been non-resident for at least 10 continuous years can qualify for a 48-month exemption from New Zealand tax on most offshore passive income, including foreign trust distributions.",
  },
  {
    q: "Can a New Zealand NRI inherit agricultural land in India?",
    a: "Under FEMA regulations, an NRI or OCI can inherit agricultural land, plantation property, or a farmhouse in India from an Indian resident. However, an NRI cannot purchase agricultural land in India, and can only sell or gift inherited agricultural land to a resident Indian citizen.",
  },
];

export default function NZNRIEstateTaxEstimatorClient() {
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

  // Diagnostic Wizard State
  const [assetType, setAssetType] = useState<"residential" | "agricultural" | "commercial" | "financial">(
    "residential"
  );
  const [holdingStructure, setHoldingStructure] = useState<"direct_will" | "foreign_trust" | "huf_share">(
    "direct_will"
  );
  const [residencyStatus, setResidencyStatus] = useState<"permanent_resident" | "transitional_resident" | "non_resident">(
    "permanent_resident"
  );
  const [propertyValueINR, setPropertyValueINR] = useState<number>(25000000); // 2.5 Crore INR default
  const [gainPercentage, setGainPercentage] = useState<number>(60); // 60% capital gain default
  const [repatriationGoal, setRepatriationGoal] = useState<"full_repatriation" | "rental_remittance" | "retain_india">(
    "full_repatriation"
  );

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
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const sections = document.querySelectorAll(".scroll-target");
    sections.forEach((s) => observerRef.current?.observe(s));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Tax calculations
  // Exchange rates: 1 NZD ~ 51 INR, 1 USD ~ 87 INR
  const nzdRate = 51;
  const usdRate = 87;

  const propertyValueNZD = Math.round(propertyValueINR / nzdRate);
  const propertyValueUSD = Math.round(propertyValueINR / usdRate);
  const capitalGainINR = Math.round((propertyValueINR * gainPercentage) / 100);
  const capitalGainNZD = Math.round(capitalGainINR / nzdRate);

  // India Capital Gains Tax (LTCG at 12.5% post Budget 2024)
  const estimatedIndiaLTCGINR = Math.round(capitalGainINR * 0.125);
  const estimatedIndiaLTCGNZD = Math.round(estimatedIndiaLTCGINR / nzdRate);

  // Section 195 TDS without certificate (approx 20.8% of gross sale value)
  const estimatedGrossTDSINR = Math.round(propertyValueINR * 0.208);
  const estimatedTdsSavingINR = Math.max(0, estimatedGrossTDSINR - estimatedIndiaLTCGINR);

  // NZ Inland Revenue exposure
  let nzTaxLiabilityNZD = 0;
  let nzTaxExplanation = "NZ has zero estate duty and no capital gains tax on inherited real estate under Section CB 6A(1).";

  if (holdingStructure === "foreign_trust") {
    if (residencyStatus === "transitional_resident") {
      nzTaxLiabilityNZD = 0;
      nzTaxExplanation = "Transitional Resident 48-month tax holiday applies under Section HR 8. Foreign trust income and gains distributions are 100% exempt from New Zealand IRD tax.";
    } else {
      // Under NZ Foreign Trust rules, distributions of accumulated income / gains are taxed at marginal rate up to 39%
      nzTaxLiabilityNZD = Math.round(capitalGainNZD * 0.39);
      nzTaxExplanation = "Foreign Trust taxable distribution rules apply under Subpart HC of the Income Tax Act 2007. Accumulated gains are subject to NZ marginal income tax (up to 39%), with DTAA Article 23 Foreign Tax Credit offsetting Indian taxes paid.";
    }
  }

  // Net NZ Tax payable after DTAA Foreign Tax Credit
  const nzTaxAfterFTCNZD = Math.max(0, nzTaxLiabilityNZD - estimatedIndiaLTCGNZD);

  // FEMA $1 Million USD Repatriation Check
  const rbiLimitUSD = 1000000;
  const yearsToRepatriate = Math.max(1, Math.ceil(propertyValueUSD / rbiLimitUSD));

  const copyClauseToClipboard = () => {
    const text = `TESTAMENTARY RECITAL FOR NEW ZEALAND RESIDENT HEIR:
"I hereby clarify that my child / legal heir, [Name of Heir], currently residing at [New Zealand Address], holding New Zealand Tax Residency / Citizen Status (IRD Number: [IRD No.]), is bequeathed 100% sole and absolute ownership of my self-acquired immovable property situated at [Detailed Property Address in India]. Under Section 30 of the Hindu Succession Act, 1956 and Section 56(2)(x) of the Indian Income-tax Act, 1961, this bequest is free from all encumbrances. In accordance with Article 13 of the India-New Zealand Double Tax Avoidance Agreement (DTAA) and RBI Master Direction No. 13/2015-16 (FED), the said beneficiary shall possess full legal rights to mutate, liquidate, and repatriate the asset proceeds up to USD 1,000,000 per financial year through Authorized Dealer Category-I banking channels under Form 15CA and Form 15CB."`;
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `NEW ZEALAND NRI INDIAN ESTATE REPATRIATION COMPLIANCE CHECKLIST:
1. Registered Will / Succession Certificate / Legal Heir Certificate verified in India
2. Revenue land mutation & Patta / Khata transfer in municipal or rural records
3. Conversion of deceased's savings account to NRO Estate Account
4. Indian PAN Card linked with NRI status and Aadhaar exemption flag
5. Section 197 Lower TDS Certificate application prior to property sale execution
6. Sale deed registered with buyer with PAN and TDS deduction details
7. Form 15CB certification issued and signed digitally by an Indian Chartered Accountant
8. Form 15CA electronically filed on Indian Income Tax e-filing portal
9. Form A2 foreign exchange remittance application submitted to Authorized Dealer Bank
10. Remittance credited in NZD to New Zealand Bank (ANZ / ASB / BNZ / Westpac)
11. NZ Inland Revenue IR3 / IR4 annual declaration with DTAA Foreign Tax Credit claim`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
            <span>NZ INCOME TAX ACT 2007 • TRUSTS ACT 2019 • FEMA 1999 • DTAA ARTICLE 13</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            NZ NRI Indian Property Inheritance Tax &amp; Estate Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Estimate New Zealand Inland Revenue exposure on inherited Indian real estate. Check foreign trust
            disclosure rules, DTAA tax credits, and RBI USD 1 Million repatriation steps.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Tax &amp; Remittance Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Cross-Border NRI Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">NZ$0 Estate Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO INHERITANCE TAX IN NZ
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Bright-Line Exempt</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION CB 6A(1) RELIEF
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">$1,000,000 USD</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBI ANNUAL REPATRIATION CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">DTAA Article 13</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FOREIGN TAX CREDIT OFFSET
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
                <span>Cross-Border Tax Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under NZ Income Tax Act 2007, NZ Trusts Act 2019, India-NZ DTAA, and RBI FEMA Master Direction No. 13/2015-16.
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
                <span>EXECUTIVE BRIEF: NEW ZEALAND NRI ESTATE SUCCESSION</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero New Zealand Estate Duty:</strong> New Zealand repealed death duties in 1992. Kiwi NRIs pay 0% New Zealand inheritance tax when taking over title to Indian flats, land, or commercial plots.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bright-Line Test Exemption:</strong> Inherited property is specifically exempt from the New Zealand residential Bright-line test under Section CB 6A(1) of the Income Tax Act 2007.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Foreign Trust Caveat:</strong> If inherited property is held in an Indian family trust, distributions of accumulated gains to a New Zealand tax resident are treated as taxable distributions (up to 39%), unless protected by the 48-month Transitional Resident tax holiday.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>FEMA USD 1 Million Scheme:</strong> Sale proceeds can be transferred from an Indian NRO account to Auckland or Wellington up to USD 1,000,000 per financial year with Form 15CA and Form 15CB CA certification.
                  </span>
                </li>
              </ul>
            </div>

            {/* MANDATORY EDITORIAL VISUAL CARD */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/new-zealand-nri-estate-succession-tax-estimator-og.jpg"
                  alt="New Zealand NRI Indian Estate Succession Tax Estimator and IRD Repatriation Guide"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span>Figure 1: Cross-border estate succession advisory for Kiwi NRIs inheriting real estate in India.</span>
                <span className="font-semibold text-[#C65378]">NZ IRD • DTAA Article 13 • FEMA 1999</span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2 TAG ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL &amp; TAX FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal &amp; Tax Framework: New Zealand NRI Inheritance
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Thousands of Indian families settled across Auckland, Wellington, Christchurch, and Hamilton face complex legal questions when parents or grandparents pass away in India leaving behind ancestral agricultural land, residential flats, or commercial properties.
                </p>
                <p>
                  A common misunderstanding among Kiwi-Indians is whether the New Zealand Inland Revenue Department (IRD) levies death taxes or treats the inherited property as taxable income upon title transmission. Under New Zealand tax law, death duties were repealed under the Estate and Gift Duties Act 1968 repeal provisions in 1992. Consequently, acquiring title to Indian real estate by Will, intestate succession, or legal heir transmission generates <strong>zero New Zealand inheritance tax</strong>.
                </p>
                <p>
                  However, critical cross-border tax traps emerge when the inherited asset is liquidated, when funds are held in Indian private family trusts, or when large sums are repatriated across international borders into New Zealand bank accounts. Understanding the interplay between the New Zealand Income Tax Act 2007, the New Zealand Trusts Act 2019, India&rsquo;s Foreign Exchange Management Act (FEMA 1999), and Article 13 of the India-New Zealand Double Tax Avoidance Agreement (DTAA) is vital to preserve family wealth.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CLASSIFIER & CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free NZ NRI Estate &amp; Repatriation Calculator Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Configure your Indian inheritance profile below to simulate New Zealand IRD exposure, Indian capital gains tax, Section 195 withholding relief, and RBI FEMA USD 1 Million remittance limits.
              </p>

              {/* INTERACTIVE CALCULATOR CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-5 sm:p-7 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parameter 1: Asset Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>1. Indian Asset Type</span>
                      <span className="text-[10px] text-[#C65378] font-bold">FEMA Classification</span>
                    </label>
                    <select
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="residential">Residential Apartment / House</option>
                      <option value="agricultural">Agricultural Land / Farmhouse (FEMA Alert)</option>
                      <option value="commercial">Commercial Property / Retail Shop</option>
                      <option value="financial">Bank Fixed Deposits / Mutual Funds / Shares</option>
                    </select>
                    {assetType === "agricultural" && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <strong>FEMA Rule:</strong> NRIs and OCIs can inherit agricultural land, but cannot purchase it. When selling, you can only sell to a resident Indian citizen.
                      </p>
                    )}
                  </div>

                  {/* Parameter 2: Estate Holding Structure */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>2. Holding / Devolvement Structure</span>
                      <span className="text-[10px] text-[#C65378] font-bold">Trusts Act 2019</span>
                    </label>
                    <select
                      value={holdingStructure}
                      onChange={(e) => setHoldingStructure(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="direct_will">Direct Legal Heir / Bequest under Will</option>
                      <option value="foreign_trust">Indian Family Trust / Testamentary Trust</option>
                      <option value="huf_share">Hindu Undivided Family (HUF) Partition Share</option>
                    </select>
                    {holdingStructure === "foreign_trust" && (
                      <p className="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                        <strong>NZ Foreign Trust:</strong> An Indian trust settled by non-NZ residents is a Foreign Trust. Trust capital is tax-free, but accumulated gains are taxable up to 39%.
                      </p>
                    )}
                  </div>

                  {/* Parameter 3: NZ Tax Residency */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>3. New Zealand Tax Residency</span>
                      <span className="text-[10px] text-[#C65378] font-bold">Section HR 8 Exemption</span>
                    </label>
                    <select
                      value={residencyStatus}
                      onChange={(e) => setResidencyStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="permanent_resident">Permanent NZ Tax Resident (&gt; 183 days)</option>
                      <option value="transitional_resident">Transitional Resident (First 48 Months in NZ)</option>
                      <option value="non_resident">Non-Resident / Moving back to India</option>
                    </select>
                    {residencyStatus === "transitional_resident" && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <strong>48-Month Tax Holiday:</strong> Under Section HR 8, new migrants or returning Kiwis enjoy a 4-year exemption on foreign trust income and offshore capital distributions!
                      </p>
                    )}
                  </div>

                  {/* Parameter 4: Repatriation Objective */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>4. Repatriation Objective</span>
                      <span className="text-[10px] text-[#C65378] font-bold">RBI $1M Scheme</span>
                    </label>
                    <select
                      value={repatriationGoal}
                      onChange={(e) => setRepatriationGoal(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="full_repatriation">Sell Property &amp; Repatriate Funds to NZ</option>
                      <option value="rental_remittance">Keep Property in India &amp; Remit Rental Income</option>
                      <option value="retain_india">Retain Capital in Indian NRO Account</option>
                    </select>
                  </div>
                </div>

                {/* Sliders for Values */}
                <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Realization Value */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 uppercase tracking-wider">
                        Estimated Asset Value:
                      </span>
                      <span className="font-extrabold text-[#C65378] text-sm">
                        ₹{(propertyValueINR / 10000000).toFixed(2)} Crore (approx NZ${(propertyValueNZD / 1000).toFixed(0)}k)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2500000}
                      max={100000000}
                      step={500000}
                      value={propertyValueINR}
                      onChange={(e) => setPropertyValueINR(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
                      <span>₹25 Lakh</span>
                      <span>₹2.5 Crore</span>
                      <span>₹5 Crore</span>
                      <span>₹10 Crore</span>
                    </div>
                  </div>

                  {/* Capital Gain Percentage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 uppercase tracking-wider">
                        Capital Gain Proportion:
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {gainPercentage}% of sale value
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={90}
                      step={5}
                      value={gainPercentage}
                      onChange={(e) => setGainPercentage(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
                      <span>20% (Recent Acquisition)</span>
                      <span>60% (Typical)</span>
                      <span>90% (Generational Land)</span>
                    </div>
                  </div>
                </div>

                {/* RESULTS DASHBOARD */}
                <div className="pt-6 border-t-2 border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C65378]" />
                      <span>SIMULATION RESULTS &amp; TAX BREAKDOWN</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Calculated Real-Time
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* NZ IRD LIABILITY CARD */}
                    <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        New Zealand IRD Tax
                      </div>
                      <div className="text-2xl font-black text-emerald-400">
                        NZ${nzTaxAfterFTCNZD.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug">
                        {holdingStructure === "direct_will"
                          ? "Zero NZ tax. Bright-line exempt under Section CB 6A(1)."
                          : nzTaxExplanation}
                      </p>
                    </div>

                    {/* INDIA CAPITAL GAINS TAX CARD */}
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                        India LTCG Tax (12.5%)
                      </div>
                      <div className="text-2xl font-black text-slate-900">
                        ₹{estimatedIndiaLTCGINR.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        approx NZ${estimatedIndiaLTCGNZD.toLocaleString()}. Fully creditable under DTAA Article 23.
                      </p>
                    </div>

                    {/* SECTION 195 TDS SHIELD CARD */}
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        Section 197 TDS Shield
                      </div>
                      <div className="text-2xl font-black text-amber-900">
                        ₹{estimatedTdsSavingINR.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-amber-700 leading-snug">
                        Potential cash blocked by buyer TDS without Lower Deduction Certificate.
                      </p>
                    </div>
                  </div>

                  {/* Repatriation Timeline & Limits */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 text-xs text-slate-700 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <Send className="w-4 h-4 text-[#C65378]" />
                        <span>FEMA USD 1 Million Remittance Pathway</span>
                      </span>
                      <span className="text-[#C65378]">
                        US${propertyValueUSD.toLocaleString()} total value
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      Under RBI Master Direction No. 13/2015-16, you can remit up to <strong>USD 1,000,000 per financial year</strong> (April 1 to March 31).
                      {propertyValueUSD <= 1000000 ? (
                        <span className="text-emerald-700 font-semibold ml-1">
                          Your entire estate falls within 1 Financial Year allowance.
                        </span>
                      ) : (
                        <span className="text-amber-800 font-semibold ml-1">
                          This estate exceeds USD 1M; remittance will span across {yearsToRepatriate} financial years or requires prior RBI approval.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: NEW ZEALAND IRD TAX RULES */}
            <section id="nz-ird-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INLAND REVENUE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. New Zealand IRD Tax Rules: Zero Estate Duty &amp; CGT
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A major point of confusion for Kiwis of Indian origin is how Inland Revenue treats foreign inheritances. Unlike the United States (which imposes federal estate taxes and Form 3520 reporting) or the United Kingdom (which levies 40% inheritance tax above the nil-rate band), New Zealand stands out globally:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Zero Estate or Death Duty</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      New Zealand abolished estate duty in 1992 and gift duty in 2011. You do not pay New Zealand death tax when transferring Indian ancestral land, flats, or commercial shops into your name.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Bright-Line Test Exemption</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section CB 6A(1) of the Income Tax Act 2007, residential property received by inheritance or transmission upon death is explicitly excluded from New Zealand&rsquo;s Bright-line rules.
                    </p>
                  </div>
                </div>
                <p>
                  While the initial inheritance is tax-free, New Zealand tax residents are subject to tax on their <strong>worldwide income</strong> under Section BD 1 of the Income Tax Act 2007. This means that if you choose to keep the inherited property in India and rent it out to local tenants, the net rental income (gross rent minus permissible Indian municipal taxes and property management deductions) must be declared in your annual New Zealand IR3 tax return.
                </p>
              </div>
            </section>

            {/* SECTION 4: NZ FOREIGN TRUST REGIME */}
            <section id="foreign-trust-regime" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>TRUSTS ACT 2019 &amp; SUBPART HC</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. NZ Foreign Trust Regime &amp; Distribution Tax Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical legal pitfall arises when Indian parents establish a testamentary trust or private family trust in Delhi, Mumbai, or Chandigarh to manage family assets. Under the New Zealand Income Tax Act 2007 (Subpart HC - Trusts) and the Trusts Act 2019, any offshore trust where no settlor was a New Zealand resident at the time of settlement is classified as a <strong>Foreign Trust</strong>.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Distribution Taxonomy Under New Zealand Law:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                      <span>
                        <strong>Corpus (Original Capital):</strong> Distributions representing the original trust corpus (such as the base value of the property when placed into trust) are 100% tax-free to the New Zealand resident beneficiary.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                      <span>
                        <strong>Accumulated Income &amp; Capital Gains:</strong> Under Section HC 15 and HC 16, distributions of accumulated income or capital gains realized by the foreign trust are classified as <em>taxable distributions</em>. These are taxable in New Zealand at the beneficiary&rsquo;s marginal tax rate (up to 39%).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>
                        <strong>Transitional Resident Relief (48-Month Holiday):</strong> Under Section HR 8, new migrants or Kiwis returning after 10 continuous years abroad qualify for a 48-month temporary tax exemption. During this 4-year window, foreign trust distributions are entirely exempt from New Zealand tax.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: INDIAN TAX FRAMEWORK */}
            <section id="indian-tax-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>INDIAN TAXATION ACT 1961</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Indian Inheritance Tax: Section 56 &amp; Section 195
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, inheritance is completely exempt from income tax. Under Section 56(2)(x) of the Income-tax Act, 1961, any property received under a Will, by way of inheritance, or in contemplation of death is non-taxable in the hands of the legal heir. Estate duty was abolished in India in 1985.
                </p>
                <p>
                  However, when a New Zealand NRI decides to sell the inherited real estate in India, capital gains tax rules apply:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Cost of Acquisition &amp; Holding Period</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 49(1), your cost of acquisition is deemed to be the cost paid by the deceased owner. The holding period traces back to the original purchase date (Section 2(42A)), qualifying nearly all inherited family homes as Long-Term Capital Gains.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Section 195 Withholding Trap</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When an NRI sells property, the buyer is required to deduct TDS at 20% plus surcharge and cess on the <em>gross sale value</em>. Applying for a Section 197 Lower TDS Certificate prevents this excessive lock-in.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: REPATRIATION SOP */}
            <section id="repatriation-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Send className="w-4 h-4" />
                <span>STEP-BY-STEP SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. SOP: Repatriating Indian Estate to New Zealand
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Bringing inheritance money from India to banks in New Zealand (such as ANZ, ASB, Bank of New Zealand, or Westpac) is governed by the Reserve Bank of India (RBI) Foreign Exchange Management (Remittance of Assets) Regulations under Master Direction No. 13/2015-16.
                </p>

                {/* 5-Step Stepper Box */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Revenue Land Mutation &amp; Title Transmission</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Update official land records (Dakhil Kharij / Jamabandi / Khata / Patta) using the registered Will or Legal Heir Certificate. An NRI cannot legally execute a valid sale deed until title mutation is completed in revenue registers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">NRO Bank Account Setup &amp; Sale Proceeds Deposit</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Open or redesignate an Indian Non-Resident Ordinary (NRO) bank account. Property sale proceeds must be received via direct banking channels (RTGS/NEFT/Cheque) into the NRO account. Cash transactions violate Section 269SS/269T.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Form 15CB CA Certification &amp; Tax Settlement</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        An Indian Chartered Accountant audits the source of inheritance, calculates long-term capital gains, confirms tax compliance, and digitally signs Form 15CB on the Income Tax Department portal.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Form 15CA Filing &amp; Form A2 Forex Remittance</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Submit electronic Form 15CA Part C citing the Form 15CB acknowledgment. Present Form 15CA, Form 15CB, Form A2, the registered sale deed, and the Will to your Authorized Dealer Category-I bank for forex outward remittance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Credit in New Zealand &amp; IRD Annual Declaration</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Funds are converted from INR to NZD and credited to your ANZ, ASB, BNZ, or Westpac account. Retain the bank remittance advise (FIRC equivalent) and file your New Zealand IR3 return with DTAA Article 23 Foreign Tax Credit claims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: NZ-INDIA DTAA ARTICLE 13 */}
            <section id="dtaa-credits" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>BILATERAL TAX TREATY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. NZ-India DTAA Article 13 &amp; Foreign Tax Credits
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Double Tax Avoidance Agreement between the Government of the Republic of India and the Government of New Zealand prevents the same capital gain or inheritance distribution from being taxed twice.
                </p>

                {/* DTAA Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#172228] text-white uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Event / Asset Class</th>
                        <th className="py-3 px-4">Indian Tax Position</th>
                        <th className="py-3 px-4">NZ IRD Tax Position</th>
                        <th className="py-3 px-4">DTAA Treaty Relief</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Direct Inheritance of Real Estate</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Exempt under Sec 56(2)(x)</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Zero Estate Duty (1992 Repeal)</td>
                        <td className="py-3 px-4">No double tax exposure</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Sale of Inherited Real Estate</td>
                        <td className="py-3 px-4 text-amber-800">12.5% LTCG on Capital Gains</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Exempt from Bright-Line (Sec CB 6A(1))</td>
                        <td className="py-3 px-4">India taxes primarily under Article 13(1)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Indian Trust Capital Distribution</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Exempt Corpus Return</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Tax-Free Corpus under Subpart HC</td>
                        <td className="py-3 px-4">Zero tax in both nations</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Indian Trust Accumulated Gain Payout</td>
                        <td className="py-3 px-4">Trust level / Beneficiary tax</td>
                        <td className="py-3 px-4 text-rose-700 font-semibold">Taxable Distribution (up to 39%)</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">Foreign Tax Credit under Article 23</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Rental Yield from Retained Property</td>
                        <td className="py-3 px-4">Taxed at slab rates in India</td>
                        <td className="py-3 px-4">Worldwide income in IR3 return</td>
                        <td className="py-3 px-4">Article 6 &amp; Article 23 full tax offset</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 8: PRACTICAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>AUTHENTIC NRI SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Practical NRI Case Studies: Auckland &amp; Wellington
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                    <span>AUCKLAND • PUNJAB FARM</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    Auckland Tech Executive Inheriting Farm in Punjab
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sukhwinder, an IT architect residing in Auckland, inherited 8 acres of agricultural land in Jalandhar. Under FEMA rules, he could not sell to other NRIs. Our cross-border desk assisted him in mutating the Jamabandi revenue record, selling the farmland to a local resident farmer, securing a Section 197 lower TDS certificate, and repatriating ₹3.2 Crore to his ASB account within 45 days.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                    <span>WELLINGTON • TRUST EXEMPTION</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    Wellington Doctor Inheriting Flat in Bengaluru
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dr. Ananya moved to Wellington 3 years ago and inherited a luxury flat through her father&rsquo;s Bengaluru testamentary trust. Because she was within her 48-month transitional resident period under Section HR 8, the entire trust capital distribution of ₹1.8 Crore was 100% exempt from New Zealand Inland Revenue income tax.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    <span>CHRISTCHURCH • COMMERCIAL UNIT</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    Christchurch Business Owner Selling Pune Commercial Unit
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rajesh inherited a prime commercial retail space in Pune. The buyer attempted to deduct 20.8% TDS on the entire ₹4 Crore gross sale price. By petitioning the International Taxation Assessing Officer under Section 197, we reduced withholding to actual capital gains liability, saving ₹62 Lakhs in immediate liquid cash flow.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: COMPLIANCE CHECKLIST & LEGAL RECITALS */}
            <section id="compliance-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PRACTICAL TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Cross-Border Compliance Checklist &amp; Legal Recitals
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use the verified legal recital below when preparing an Indian Will bequeathing properties to New Zealand tax resident children, ensuring seamless revenue transmission and zero tax conflict.
              </p>

              {/* Copyable Will Recital Box */}
              <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5" />
                    <span>Cross-Border Testamentary Bequest Recital</span>
                  </span>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    {copiedClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClause ? "Copied!" : "Copy Clause"}</span>
                  </button>
                </div>
                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/10">
{`"I hereby clarify that my child / legal heir, [Name of Heir], currently residing at [New Zealand Address], holding New Zealand Tax Residency / Citizen Status (IRD Number: [IRD No.]), is bequeathed 100% sole and absolute ownership of my self-acquired immovable property situated at [Detailed Property Address in India]. Under Section 30 of the Hindu Succession Act, 1956 and Section 56(2)(x) of the Indian Income-tax Act, 1961, this bequest is free from all encumbrances. In accordance with Article 13 of the India-New Zealand Double Tax Avoidance Agreement (DTAA) and RBI Master Direction No. 13/2015-16 (FED), the said beneficiary shall possess full legal rights to mutate, liquidate, and repatriate the asset proceeds up to USD 1,000,000 per financial year through Authorized Dealer Category-I banking channels under Form 15CA and Form 15CB."`}
                </pre>
              </div>

              {/* Copyable SOP Checklist */}
              <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>New Zealand NRI Repatriation 11-Point Checklist</span>
                  </span>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                  >
                    {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Copied!" : "Copy Checklist"}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Registered Will or Legal Heir Certificate</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dakhil Kharij / Revenue Mutation Extract</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Deceased Indian Bank to NRO Estate Account</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Indian PAN Card with NRI Status updated</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 197 Lower TDS Certificate from ITO</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Registered Sale Deed with TDS proof</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Form 15CB CA Certificate signed digitally</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Form 15CA filed on Income Tax Portal</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Form A2 Forex Application to Bank</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Credit in NZ Bank (ANZ / ASB / BNZ / Westpac)</span>
                  </div>
                  <div className="flex items-start gap-1.5 col-span-1 sm:col-span-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Inland Revenue IR3 / IR4 return filing with DTAA Article 23 Foreign Tax Credit</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>CROSS-BORDER EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Institutional Profile: Cross-Border Legal Desk
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-slate-700 leading-relaxed text-sm">
                <p>
                  WillDrafting, powered by AMA Legal Solutions, operates an elite cross-border succession desk serving Non-Resident Indians across New Zealand, Australia, Singapore, the United Kingdom, and the United States.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-xs">Cross-Border Retainers</div>
                    <p className="text-xs text-slate-600">
                      End-to-end management of Indian revenue mutation, High Court probate, Section 197 Lower TDS orders, and Form 15CA/15CB outward remittance.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-xs">FEMA &amp; RBI Compliance</div>
                    <p className="text-xs text-slate-600">
                      Full adherence to RBI Master Direction No. 13/2015-16, structuring lawful multi-crore remittances within the USD 1 Million annual limit.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-xs">Bilateral DTAA Coordination</div>
                    <p className="text-xs text-slate-600">
                      Working alongside New Zealand Chartered Accountants and tax attorneys to align Indian tax payments with New Zealand IRD Foreign Tax Credits.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Kiwi NRI Succession
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
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

            {/* SECTION 12: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ExternalLink className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; STATUTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; Official Government Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs text-slate-700">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>
                      <strong>New Zealand Legislation:</strong> Income Tax Act 2007 (Sections BD 1, CB 6A, HC 1-36, HR 8) and Trusts Act 2019. Accessible on the official New Zealand Legislation website.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>
                      <strong>New Zealand Inland Revenue (Te Tari Taake):</strong> Guidance on foreign trusts, foreign income reporting, and transitional resident tax exemptions (ird.govt.nz).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Landmark className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>
                      <strong>Reserve Bank of India (RBI):</strong> FED Master Direction No. 13/2015-16 on Remittance of Assets under the Foreign Exchange Management Act, 1999.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gavel className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                    <span>
                      <strong>Income Tax Department of India:</strong> E-filing portal for Form 15CA, Form 15CB, and Section 197 Lower TDS applications (incometax.gov.in).
                    </span>
                  </li>
                </ul>

                {/* Related Internal Links Cluster */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Related Legal Tools &amp; Cross-Border Services:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link
                      href="/services/nri-inherited-property-sale-repatriation"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Inherited Property Repatriation Retainer
                    </Link>
                    <Link
                      href="/services/will-drafting-for-nris-in-new-zealand"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting for NRIs in New Zealand
                    </Link>
                    <Link
                      href="/tools/nri-property-sale-tds-repatriation-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Property Sale TDS Calculator
                    </Link>
                    <Link
                      href="/tools/nri-will-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Cross-Border Will Checker
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Capital Gains Tax Inherited Property
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 Plain-English Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Plan Cross-Border Estate Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Indian Will safeguards your spouse and Kiwi children. It prevents painful probate delays across continents and eliminates costly legal fights in Indian civil courts.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Repatriation Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can remit up to USD 1,000,000 every financial year. File Form 15CA online and obtain Form 15CB CA certification to transfer funds safely to ANZ, ASB, BNZ, or Westpac.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our cross-border advocates handle land mutation, lower TDS orders under Section 197, and full bank repatriation so you receive your rightful inheritance without hassle.
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
                    Senior Cross-Border Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in cross-border NRI estate succession, India-NZ DTAA tax structuring, Section 197 Lower TDS orders, and FEMA outward repatriation.
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
              {/* CARD 2: DUAL CTA 1 - REPATRIATION RETAINER (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT EXCESS 20.8% TDS WITHHOLDING</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Repatriate Indian Inheritance to New Zealand
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our cross-border desk obtains Section 197 Nil/Lower TDS certificates, prepares Form 15CA/15CB, and secures smooth outward remittances to Auckland and Wellington.
                </p>
                <Link
                  href="/services/nri-inherited-property-sale-repatriation"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Retain Repatriation Counsel</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FEMA &amp; RBI Compliant Escrow Services</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CROSS-BORDER SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Inheriting Indian Assets from New Zealand?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consult our senior civil litigators for title mutation, Will validation, High Court probate, and ancestral property partition defense across India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Schedule Cross-Border Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Kiwi Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NZ IRD &amp; FEMA Aligned:</strong> Governed strictly by the NZ Income Tax Act 2007 and RBI Master Direction No. 13/2015-16.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>DTAA Tax Shield:</strong> Maximizes Article 23 Foreign Tax Credits against New Zealand income tax liabilities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Paperwork Headaches:</strong> Digital execution of Form 15CA, Form 15CB, and NRO account clearance.
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
          <span>Tax Estimator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft NRI Will</span>
        </button>
      </div>
    </div>
  );
}
