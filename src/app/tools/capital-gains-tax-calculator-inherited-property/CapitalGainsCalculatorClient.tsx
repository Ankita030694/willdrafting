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
  Printer,
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
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
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
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
} from "lucide-react";

// Official Cost Inflation Index (CII) Table notified by CBDT (Base 2001-02 = 100)
const CII_TABLE: Record<string, number> = {
  "2001-02": 100,
  "2002-03": 105,
  "2003-04": 109,
  "2004-05": 113,
  "2005-06": 117,
  "2006-07": 122,
  "2007-08": 129,
  "2008-09": 137,
  "2009-10": 148,
  "2010-11": 167,
  "2011-12": 184,
  "2012-13": 200,
  "2013-14": 220,
  "2014-15": 240,
  "2015-16": 254,
  "2016-17": 264,
  "2017-18": 272,
  "2018-19": 280,
  "2019-20": 289,
  "2020-21": 301,
  "2021-22": 317,
  "2022-23": 331,
  "2023-24": 348,
  "2024-25": 363,
  "2025-26": 377,
};

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. What is Inherited Property Tax?" },
  { id: "interactive-calculator", label: "2. Interactive Capital Gains Calculator" },
  { id: "budget-2024-amendment", label: "3. Budget 2024: 12.5% Flat vs 20% Indexation" },
  { id: "section-49-cost-holding", label: "4. Section 49(1) Cost & Bombay HC Precedent" },
  { id: "pre-2001-valuation-fmv", label: "5. Pre-2001 Valuations: FMV vs Circle Rate" },
  { id: "section-54-multi-heir", label: "6. Multi-Heir Exemption Multiplier (Sec 54EC)" },
  { id: "nri-tds-section-195", label: "7. NRI Sellers: Sec 195 TDS & Form 13" },
  { id: "comparison-table-regimes", label: "8. Regime Comparison: Old vs New vs Grandfathered" },
  { id: "step-by-step-sale-sop", label: "9. Step-by-Step SOP: Inherited Property Sale" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Delhi, Pune, Mumbai" },
  { id: "legal-clause-templates", label: "11. Section 49(1) Recital & Form 13 Checklist" },
  { id: "institutional-profile", label: "12. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Do I have to pay tax when I inherit a property in India?",
    a: "No. Under Section 47(iii) of the Income Tax Act, 1961, receiving property through a Will, gift, or intestate succession is strictly excluded from the definition of transfer. There is no inheritance tax or gift tax when the title transfers into your name. Tax liability arises only when you subsequently sell that inherited property.",
  },
  {
    q: "How do I calculate the cost of acquisition for inherited property?",
    a: "Under Section 49(1) of the Income Tax Act, the cost of acquisition is deemed to be the cost for which the previous owner purchased the property. If the previous owner also inherited it, you trace back to the last owner who bought it with cash. If bought before April 1, 2001, you can adopt the Fair Market Value (FMV) as of April 1, 2001, capped at the Stamp Duty circle rate as per Section 55(2)(b)(ii).",
  },
  {
    q: "Does indexation start from my father's purchase year or the year he passed away?",
    a: "Under the landmark Bombay High Court decision in CIT v. Manjula J. Shah (2013) 355 ITR 474 (affirmed by the Supreme Court and followed by Delhi, Karnataka, and Gujarat High Courts), the Cost Inflation Index (CII) benefit applies from the year in which the PREVIOUS owner purchased the asset (or 2001-02 if purchased earlier), not from the date of inheritance or probate. This saves significant tax for heirs.",
  },
  {
    q: "What is the Budget 2024 grandfathering option for properties bought before July 23, 2024?",
    a: "In the Finance (No. 2) Act, 2024, the Central Government inserted a grandfathering proviso into Section 112. For immovable property acquired before July 23, 2024 by Resident Individuals or HUFs, taxpayers can compute capital gains under both options: (1) 20% with indexation, or (2) 12.5% flat without indexation, and pay whichever calculates to lower tax.",
  },
  {
    q: "Can multiple legal heirs selling one property each claim ₹50 Lakh in Section 54EC bonds?",
    a: "Yes! Co-heirs who inherit a house as tenants-in-common are separate independent taxpayers under Section 26 of the Income Tax Act. Each co-owner is taxed only on their proportionate share of the capital gain, and each co-owner can independently invest up to ₹50 Lakhs in Section 54EC capital gains bonds (REC, NHAI, PFC, IRFC). For example, three siblings can legally shelter ₹1.5 Crore in capital gains across the family.",
  },
  {
    q: "How can an NRI seller avoid 20% to 23.9% TDS on gross consideration under Section 195?",
    a: "When an NRI sells property in India, the buyer is legally obligated to deduct TDS under Section 195. If no lower deduction certificate is presented, the buyer deducts TDS on the FULL sale price at 12.5% or 20% plus surcharge and cess. To avoid locking up tens of lakhs in cash, the NRI seller must apply online on TRACES for a Lower Deduction Certificate under Section 197 (Form 13) before executing the sale deed.",
  },
  {
    q: "How does Section 54 exemption apply to inherited residential house sale?",
    a: "Under Section 54, if the inherited property sold was a residential house held for more than 24 months (including previous owner's holding tenure), you can claim 100% exemption on the long-term capital gain by purchasing another residential house in India within 1 year before or 2 years after the sale, or constructing within 3 years. The maximum exemption limit is capped at ₹10 Crore.",
  },
  {
    q: "What documents are required to prove cost of acquisition to the Income Tax Department?",
    a: "You need: (1) The registered sale deed or conveyance deed of the previous owner, (2) Mutation extract or property card showing your name as heir, (3) Probate copy or registered Will or Legal Heir Certificate, (4) For pre-2001 properties, a certified valuation report from a Government Registered Valuer showing April 1, 2001 FMV alongside the circle rate certificate from the Sub-Registrar Office, and (5) Bank statements or receipts of transfer expenses.",
  },
];

export default function CapitalGainsCalculatorClient() {
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

  // Calculator Form State
  const [residency, setResidency] = useState<"resident" | "nri">("resident");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial_plot">("residential");
  const [acquisitionEra, setAcquisitionEra] = useState<"pre_2001" | "between_2001_and_2024" | "post_july_2024">("between_2001_and_2024");
  const [acquisitionYear, setAcquisitionYear] = useState<string>("2006-07");
  const [saleYear, setSaleYear] = useState<string>("2024-25");
  const [numberOfHeirs, setNumberOfHeirs] = useState<number>(2);

  // Financial Inputs (in INR)
  const [grossSalePrice, setGrossSalePrice] = useState<number>(20000000); // ₹2.00 Cr
  const [circleRateValue, setCircleRateValue] = useState<number>(18000000); // ₹1.80 Cr
  const [originalPurchaseCost, setOriginalPurchaseCost] = useState<number>(2500000); // ₹25 Lakhs
  const [fmv2001, setFmv2001] = useState<number>(3000000); // ₹30 Lakhs (for pre-2001)
  const [sdv2001, setSdv2001] = useState<number>(2800000); // ₹28 Lakhs (stamp duty circle rate 2001)
  const [improvementCost, setImprovementCost] = useState<number>(500000); // ₹5 Lakhs
  const [improvementYear, setImprovementYear] = useState<string>("2012-13");
  const [transferExpenses, setTransferExpenses] = useState<number>(200000); // ₹2 Lakhs (brokerage, legal)
  const [section54Investment, setSection54Investment] = useState<number>(0); // Reinvestment in new house
  const [section54ECInvestment, setSection54ECInvestment] = useState<number>(0); // Bonds (REC/NHAI)

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

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleResetCalculator = () => {
    setResidency("resident");
    setPropertyType("residential");
    setAcquisitionEra("between_2001_and_2024");
    setAcquisitionYear("2006-07");
    setSaleYear("2024-25");
    setNumberOfHeirs(2);
    setGrossSalePrice(20000000);
    setCircleRateValue(18000000);
    setOriginalPurchaseCost(2500000);
    setFmv2001(3000000);
    setSdv2001(2800000);
    setImprovementCost(500000);
    setImprovementYear("2012-13");
    setTransferExpenses(200000);
    setSection54Investment(0);
    setSection54ECInvestment(0);
  };

  // ==========================================
  // MATHEMATICAL TAX COMPUTATION ENGINE
  // ==========================================

  // 1. Effective Deemed Base Cost under Section 49(1) & 55(2)(b)
  let effectiveBaseCost = originalPurchaseCost;
  let baseCIIYear = acquisitionYear;

  if (acquisitionEra === "pre_2001") {
    // Under Section 55(2)(b)(ii), FMV as on April 1, 2001 cannot exceed circle rate (sdv2001)
    const cappedFmv = sdv2001 > 0 ? Math.min(fmv2001, sdv2001) : fmv2001;
    effectiveBaseCost = Math.max(originalPurchaseCost, cappedFmv);
    baseCIIYear = "2001-02";
  }

  const saleCII = CII_TABLE[saleYear] || 363;
  const acqCII = CII_TABLE[baseCIIYear] || 100;
  const impCII = CII_TABLE[improvementYear] || 200;

  // 2. Full Value of Consideration under Section 50C Check
  // Safe harbour tolerance is 10% (110% of gross sale price)
  const isCircleRateHigher = circleRateValue > grossSalePrice * 1.1;
  const fullValueOfConsideration = isCircleRateHigher ? circleRateValue : grossSalePrice;
  const netConsideration = Math.max(0, fullValueOfConsideration - transferExpenses);

  // 3. REGIME A: Old Regime (20% WITH Cost Inflation Indexation)
  // Indexed Cost of Acquisition (ICOA)
  const indexedCostOfAcquisition = Math.round(effectiveBaseCost * (saleCII / acqCII));
  // Indexed Cost of Improvement (ICOI)
  const indexedCostOfImprovement =
    improvementCost > 0 ? Math.round(improvementCost * (saleCII / impCII)) : 0;
  const totalIndexedCost = indexedCostOfAcquisition + indexedCostOfImprovement;

  const grossCapitalGainsOld = Math.max(0, netConsideration - totalIndexedCost);

  // Multi-heir Section 54EC Bond Ceiling: ₹50 Lakhs per heir
  const maxAllowable54EC = 5000000 * numberOfHeirs;
  const appliedSection54EC = Math.min(section54ECInvestment, maxAllowable54EC);

  // Section 54 residential exemption ceiling: ₹10 Crores (Finance Act 2023)
  const appliedSection54Old =
    propertyType === "residential"
      ? Math.min(section54Investment, Math.min(grossCapitalGainsOld, 100000000))
      : 0;

  const totalDeductionsOld = Math.min(
    grossCapitalGainsOld,
    appliedSection54Old + appliedSection54EC
  );
  const netTaxableGainsOld = Math.max(0, grossCapitalGainsOld - totalDeductionsOld);
  // Basic tax 20% + 4% Health & Education Cess = 20.8%
  const totalTaxOld = Math.round(netTaxableGainsOld * 0.208);

  // 4. REGIME B: New Regime (12.5% FLAT Without Indexation)
  const totalActualCost = effectiveBaseCost + improvementCost;
  const grossCapitalGainsNew = Math.max(0, netConsideration - totalActualCost);

  const appliedSection54New =
    propertyType === "residential"
      ? Math.min(section54Investment, Math.min(grossCapitalGainsNew, 100000000))
      : 0;

  const totalDeductionsNew = Math.min(
    grossCapitalGainsNew,
    appliedSection54New + appliedSection54EC
  );
  const netTaxableGainsNew = Math.max(0, grossCapitalGainsNew - totalDeductionsNew);
  // Basic tax 12.5% + 4% Health & Education Cess = 13.0%
  const totalTaxNew = Math.round(netTaxableGainsNew * 0.13);

  // 5. Grandfathering Applicability Check
  // Proviso to Section 112 (Finance (No. 2) Act, 2024):
  // Available to Resident Individuals / HUFs for properties acquired before July 23, 2024.
  const isGrandfatheringEligible =
    residency === "resident" && acquisitionEra !== "post_july_2024";

  let winningRegime = "Regime B (12.5% Flat)";
  let taxDifference = 0;
  let taxFinalPayable = totalTaxNew;

  if (isGrandfatheringEligible) {
    if (totalTaxOld < totalTaxNew) {
      winningRegime = "Regime A (20% with Indexation)";
      taxDifference = totalTaxNew - totalTaxOld;
      taxFinalPayable = totalTaxOld;
    } else {
      winningRegime = "Regime B (12.5% Flat)";
      taxDifference = totalTaxOld - totalTaxNew;
      taxFinalPayable = totalTaxNew;
    }
  } else {
    // Non-residents or post-July 23, 2024 acquisitions have flat 12.5% rate
    winningRegime = "Statutory 12.5% Flat Rate (No Grandfathering)";
    taxFinalPayable = totalTaxNew;
  }

  // Per Heir Breakdown
  const sharePerHeir = 1 / numberOfHeirs;
  const taxPerHeir = Math.round(taxFinalPayable / numberOfHeirs);
  const netTaxableGainPerHeir = Math.round(
    (isGrandfatheringEligible && totalTaxOld < totalTaxNew ? netTaxableGainsOld : netTaxableGainsNew) /
      numberOfHeirs
  );

  // NRI Section 195 TDS Computation
  // Default TDS without Form 13: 12.5% (or 20%) + ~10% Surcharge + 4% Cess on GROSS Sale Price
  // Typical buyer deduction rate: 14.3% (under new 12.5% rate) or 20.8%
  const defaultNriTdsRate = 0.143;
  const defaultGrossTdsWithoutForm13 = Math.round(grossSalePrice * defaultNriTdsRate);
  const tdsWithForm13 = taxFinalPayable;
  const lockedCashflowSaved = Math.max(0, defaultGrossTdsWithoutForm13 - tdsWithForm13);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE FOR SALE DEED OF INHERITED PROPERTY (SECTION 49(1) COMPLIANCE):
"AND WHEREAS the late [Full Name of Testator/Parent], son/daughter of [Grandparent Name], had originally acquired absolute registered title and ownership of the Schedule Property vide Registered Sale Deed dated [Date of Original Purchase], bearing Document No. [Doc Number], registered in Book I, Volume [Vol], at Pages [Pages], in the Office of the Sub-Registrar at [SRO Location], for a total purchase consideration of Rs. [Original Purchase Amount]/-.

AND WHEREAS the said [Original Owner] departed this life on [Date of Demise] at [Place], leaving behind his/her Last Will and Testament dated [Date of Will] (duly probated vide Order dated [Date] by the Hon'ble [High Court/District Court Name] in Testamentary Petition No. [Pet Number]) / leaving behind the Vendors as his/her sole legal surviving Class I heirs under the provisions of the Hindu Succession Act, 1956.

AND WHEREAS by virtue of the said testamentary bequest / intestate inheritance and subsequent Mutation Order No. [Mutation No.] dated [Date], the Vendors herein are the absolute, undisputed co-owners and legal representatives of the deceased under Section 49(1) of the Income Tax Act, 1961, holding full authority to alienate, transfer, and execute this Conveyance Deed free from all encumbrances, lis pendens, or third-party claims."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `NRI FORM 13 LOWER TDS APPLICATION CHECKLIST (SECTION 197):
1. Copy of Agreement for Sale / Memorandum of Understanding with the Buyer.
2. Chain of Title Deeds: Previous Owner's Registered Purchase Deed + Registered Will / Probate / Legal Heir Certificate.
3. Revenue Mutation Record / Property Card / Khata Extract reflecting the NRI seller's name.
4. Valuation Report as on April 1, 2001 by Government Registered Valuer (if bought before 2001) + SRO Circle Rate Certificate.
5. Section 54 / 54EC Reinvestment Proofs (Purchase deed of new house / advance receipt / REC-NHAI bond application form).
6. Calculation sheet showing 12.5% Flat vs 20% Indexation Capital Gains computation.
7. Active PAN Card of NRI Seller, Passport Copy, Indian NRO Bank Account Details, and TRACES Portal Login credentials.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>FINANCE (NO. 2) ACT, 2024 • SECTIONS 49(1), 54 &amp; 112</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Capital Gains Tax on Inherited Property Calculator India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly compare <strong>12.5% Flat Tax vs 20% Indexation</strong> under the Budget 2024
            grandfathering option. Accurately compute Section 49(1) cost to previous owner, Section
            54/54EC multi-heir exemptions, and Section 195 NRI TDS deductions.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Inherited Property Tax</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 112</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GRANDFATHERING PROVISO
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">CII 363 / 377</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                OFFICIAL CBDT INDICES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹50L × Heirs</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 54EC BOND MULTIPLIER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 13</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NRI LOWER TDS RELIEF
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
                Governed under Sections 2(42A), 45, 47(iii), 48, 49(1), 50C, 54, 54EC, 55(2)(b),
                112 & 195 of the Income Tax Act, 1961, read with Finance (No. 2) Act, 2024 and
                landmark precedent CIT v. Manjula J. Shah.
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
                <span>EXECUTIVE BRIEF: INHERITED PROPERTY TAX RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Tax on Inheritance:</strong> Under Section 47(iii), receiving property
                    through a registered Will or intestate legal heir succession attracts 0% capital gains
                    or income tax. Tax is triggered only when the heir sells.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 49(1) Cost Deeming:</strong> Your acquisition cost is deemed to be the
                    purchase price paid by the previous owner who bought it with cash. The holding tenure
                    of your parents or ancestors is added to yours under Section 2(42A).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Budget 2024 Grandfathering:</strong> If your parent acquired the immovable
                    property before July 23, 2024, resident taxpayers can compute tax under both 20% with
                    indexation and 12.5% flat without indexation and pay whichever is lower.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Multi-Heir Section 54EC Multiplier:</strong> Each co-owner sibling gets an
                    independent ₹50 Lakh bond exemption limit. Three siblings can legally shelter up to
                    ₹1.50 Crore of capital gains tax-free.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Tax on Inherited Property in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common misconception among property owners in India is that inheriting real estate
                  triggers estate tax or gift tax. Following the complete abolition of the Estate Duty Act
                  in 1985, India levies <strong>zero inheritance tax</strong>. Under Section 47(iii) of the
                  Income Tax Act, 1961, any transfer of a capital asset under a gift, Will, or irrevocable
                  trust is expressly excluded from capital gains taxation.
                </p>
                <p>
                  However, when the legal heir or legatee subsequently enters into a registered agreement
                  to sell that inherited real estate, Section 45 of the Act charges capital gains tax.
                  Because the heir acquired the asset without paying consideration, the Income Tax Act
                  invokes special statutory mechanics under <strong>Section 49(1)</strong>, treating the
                  cost of acquisition as the cost incurred by the previous owner who acquired it by
                  purchase.
                </p>
                <p>
                  Furthermore, Section 2(42A) Explanation 1(i)(b) mandates that the period for which the
                  previous owner held the property must be aggregated with the heir&rsquo;s holding period.
                  Because Indian family real estate is typically held for decades, virtually all inherited
                  property sales qualify as Long-Term Capital Assets (holding period exceeding 24 months).
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE TAX CALCULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Capital Gains Tax &amp; Grandfathering Tool
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your property details below to compare the 12.5% Flat Tax Regime against the 20%
                Indexation Regime under the Finance (No. 2) Act 2024 grandfathering clause.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Controls: Residency & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Residency Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Residency Status</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setResidency("resident")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          residency === "resident"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Resident Indian
                      </button>
                      <button
                        type="button"
                        onClick={() => setResidency("nri")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          residency === "nri"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        NRI (Sec 195 TDS)
                      </button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Property Category</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPropertyType("residential")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          propertyType === "residential"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Residential Flat/House
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType("commercial_plot")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          propertyType === "commercial_plot"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Plot / Commercial
                      </button>
                    </div>
                  </div>

                  {/* Co-Owners / Legal Heirs */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Number of Co-Heirs</span>
                      </span>
                      <span className="text-[#C65378] font-black">{numberOfHeirs} Heirs</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setNumberOfHeirs(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                            numberOfHeirs === count
                              ? "bg-rose-50 text-[#C65378] border border-rose-300 ring-2 ring-rose-200"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {count} {count === 1 ? "Heir" : "Heirs"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Acquisition Era Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>When Did Previous Owner / Parent Acquire The Property?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setAcquisitionEra("pre_2001")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        acquisitionEra === "pre_2001"
                          ? "border-rose-300 bg-rose-50/50 ring-2 ring-rose-200/60"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">Before April 1, 2001</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Eligible for April 1, 2001 FMV substitution capped at circle rate.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAcquisitionEra("between_2001_and_2024")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        acquisitionEra === "between_2001_and_2024"
                          ? "border-rose-300 bg-rose-50/50 ring-2 ring-rose-200/60"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">
                        Apr 1, 2001 to Jul 22, 2024
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Qualifies for Budget 2024 Grandfathering: 20% vs 12.5% choice!
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAcquisitionEra("post_july_2024")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        acquisitionEra === "post_july_2024"
                          ? "border-rose-300 bg-rose-50/50 ring-2 ring-rose-200/60"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">
                        On or After July 23, 2024
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Flat 12.5% without indexation applies strictly.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Financial Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Gross Sale Price */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Agreed Sale Consideration (₹)</span>
                      <span className="text-[#C65378]">{formatINR(grossSalePrice)}</span>
                    </div>
                    <input
                      type="number"
                      step={100000}
                      value={grossSalePrice}
                      onChange={(e) => setGrossSalePrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-500">Total agreed price in sale deed.</p>
                  </div>

                  {/* Stamp Duty Circle Rate Value */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Circle Rate / Ready Reckoner (₹)</span>
                      <span className="text-slate-600">{formatINR(circleRateValue)}</span>
                    </div>
                    <input
                      type="number"
                      step={100000}
                      value={circleRateValue}
                      onChange={(e) => setCircleRateValue(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-500">
                      {isCircleRateHigher
                        ? "Warning: Sec 50C applies circle rate as consideration!"
                        : "Complies within Section 50C 10% safe harbour tolerance."}
                    </p>
                  </div>

                  {/* Transfer Expenses */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Transfer Expenses (Brokerage, Legal)</span>
                      <span className="text-slate-600">{formatINR(transferExpenses)}</span>
                    </div>
                    <input
                      type="number"
                      step={10000}
                      value={transferExpenses}
                      onChange={(e) => setTransferExpenses(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-500">Allowable deduction under Section 48(i).</p>
                  </div>

                  {/* Era Specific Cost Inputs */}
                  {acquisitionEra === "pre_2001" ? (
                    <>
                      {/* Original Cost */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Original Purchase Cost (Pre-2001)</span>
                          <span className="text-slate-600">{formatINR(originalPurchaseCost)}</span>
                        </div>
                        <input
                          type="number"
                          step={50000}
                          value={originalPurchaseCost}
                          onChange={(e) => setOriginalPurchaseCost(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        />
                        <p className="text-[10px] text-slate-500">Actual price paid by ancestor.</p>
                      </div>

                      {/* FMV as on April 1, 2001 */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>April 1, 2001 Fair Market Value (₹)</span>
                          <span className="text-slate-600">{formatINR(fmv2001)}</span>
                        </div>
                        <input
                          type="number"
                          step={50000}
                          value={fmv2001}
                          onChange={(e) => setFmv2001(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        />
                        <p className="text-[10px] text-slate-500">Certified by Registered Valuer.</p>
                      </div>

                      {/* SDV Circle Rate as on April 1, 2001 */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>April 1, 2001 Stamp Duty Rate (₹)</span>
                          <span className="text-slate-600">{formatINR(sdv2001)}</span>
                        </div>
                        <input
                          type="number"
                          step={50000}
                          value={sdv2001}
                          onChange={(e) => setSdv2001(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        />
                        <p className="text-[10px] text-slate-500">Section 55(2)(b)(ii) statutory ceiling.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Purchase Year */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Previous Owner Purchase Year</span>
                          <span className="text-[#C65378] font-bold">CII: {CII_TABLE[acquisitionYear]}</span>
                        </div>
                        <select
                          value={acquisitionYear}
                          onChange={(e) => setAcquisitionYear(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        >
                          {Object.keys(CII_TABLE)
                            .filter((yr) => yr !== "2025-26")
                            .map((yr) => (
                              <option key={yr} value={yr}>
                                FY {yr} (CII: {CII_TABLE[yr]})
                              </option>
                            ))}
                        </select>
                        <p className="text-[10px] text-slate-500">
                          Manjula J. Shah rule: Use parent&rsquo;s acquisition year index.
                        </p>
                      </div>

                      {/* Original Cost */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Original Purchase Cost (₹)</span>
                          <span className="text-slate-600">{formatINR(originalPurchaseCost)}</span>
                        </div>
                        <input
                          type="number"
                          step={50000}
                          value={originalPurchaseCost}
                          onChange={(e) => setOriginalPurchaseCost(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        />
                        <p className="text-[10px] text-slate-500">From parent&rsquo;s registered sale deed.</p>
                      </div>

                      {/* Sale Year */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Assessment Sale Year</span>
                          <span className="text-[#C65378] font-bold">CII: {CII_TABLE[saleYear]}</span>
                        </div>
                        <select
                          value={saleYear}
                          onChange={(e) => setSaleYear(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                        >
                          <option value="2024-25">FY 2024-25 (Current Year CII: 363)</option>
                          <option value="2025-26">FY 2025-26 (Projected CII: 377)</option>
                        </select>
                        <p className="text-[10px] text-slate-500">Financial year in which sale deed is signed.</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Exemption Sliders: Section 54 and Section 54EC */}
                <div className="pt-6 border-t border-slate-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#C65378]" />
                        <span>Reinvestment Tax Exemptions (Section 54 &amp; 54EC)</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Reduce your capital gains tax legally through verified statutory reinvestments.
                      </p>
                    </div>
                    <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Family Bond Cap: {formatINR(maxAllowable54EC)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Section 54 Slider */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Sec 54: Reinvestment in New Residential House</span>
                        <span className="text-[#C65378]">{formatINR(section54Investment)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={Math.min(grossSalePrice, 50000000)}
                        step={500000}
                        value={section54Investment}
                        onChange={(e) => setSection54Investment(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>₹0</span>
                        <span>Max statutory cap: ₹10 Crores</span>
                        <span>{formatINR(Math.min(grossSalePrice, 50000000))}</span>
                      </div>
                    </div>

                    {/* Section 54EC Slider */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Sec 54EC: Capital Gain Bonds (REC/NHAI/PFC)</span>
                        <span className="text-[#C65378]">{formatINR(section54ECInvestment)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={maxAllowable54EC}
                        step={250000}
                        value={section54ECInvestment}
                        onChange={(e) => setSection54ECInvestment(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>₹0</span>
                        <span>₹50L limit per heir ({numberOfHeirs} heirs)</span>
                        <span>{formatINR(maxAllowable54EC)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset & Quick Print Action Strip */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetCalculator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Default Values</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Calculation Report</span>
                  </button>
                </div>

                {/* =========================================================================
                    REAL-TIME STATUTORY COMPARISON RESULTS MATRIX
                    ========================================================================= */}
                <div className="space-y-6 pt-4">
                  {/* WINNER RECOMMENDATION CALLOUT CARD */}
                  <div
                    className={`rounded-3xl border-2 p-6 transition-all shadow-md ${
                      isGrandfatheringEligible
                        ? totalTaxOld < totalTaxNew
                          ? "bg-blue-50/70 border-blue-300 text-blue-950"
                          : "bg-rose-50/70 border-rose-300 text-rose-950"
                        : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-current/15">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-current/20 shadow-2xs">
                          <Award className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>BUDGET 2024 GRANDFATHERING WINNER</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                          Optimal Choice: {winningRegime}
                        </h3>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-xs uppercase font-bold opacity-75">Statutory Savings</div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-700">
                          {isGrandfatheringEligible && taxDifference > 0
                            ? `Saves ${formatINR(taxDifference)} in Tax!`
                            : "Standard Flat Rate"}
                        </div>
                      </div>
                    </div>

                    <p className="pt-3 text-xs sm:text-sm leading-relaxed opacity-90">
                      {isGrandfatheringEligible ? (
                        <>
                          Under the <strong>Grandfathering Proviso to Section 112</strong> inserted by
                          Finance (No. 2) Act 2024, resident taxpayers selling pre-July 23, 2024 properties
                          hold the statutory right to choose the lower tax computation. Here,{" "}
                          <strong>{winningRegime}</strong> produces the lowest total tax burden of{" "}
                          <strong>{formatINR(taxFinalPayable)}</strong>.
                        </>
                      ) : (
                        <>
                          Because the seller is an NRI or the property was acquired after July 23, 2024,
                          the grandfathering indexation option is unavailable by statute. The property is
                          taxed at the flat 12.5% rate under amended Section 112.
                        </>
                      )}
                    </p>
                  </div>

                  {/* SIDE-BY-SIDE TWO REGIMES BREAKDOWN TABLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A: Old Regime (20% with CII) */}
                    <div
                      className={`rounded-2xl border p-5 space-y-4 ${
                        isGrandfatheringEligible && totalTaxOld <= totalTaxNew
                          ? "bg-white border-blue-400 ring-2 ring-blue-100 shadow-sm"
                          : "bg-white/80 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                            REGIME A (OLD LAW)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            20% With Indexation (CII)
                          </div>
                        </div>
                        {isGrandfatheringEligible && totalTaxOld <= totalTaxNew && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                            RECOMMENDED
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Net Sale Consideration</span>
                          <span className="font-semibold text-slate-900">{formatINR(netConsideration)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Indexed Cost of Acquisition</span>
                          <span className="font-semibold text-slate-900">{formatINR(indexedCostOfAcquisition)}</span>
                        </div>
                        {indexedCostOfImprovement > 0 && (
                          <div className="flex justify-between py-1 border-b border-slate-50">
                            <span className="text-slate-600">Indexed Cost of Improvement</span>
                            <span className="font-semibold text-slate-900">{formatINR(indexedCostOfImprovement)}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Gross Long Term Gain</span>
                          <span className="font-bold text-slate-900">{formatINR(grossCapitalGainsOld)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 text-emerald-700 font-semibold">
                          <span>Sec 54 &amp; 54EC Exemptions</span>
                          <span>- {formatINR(totalDeductionsOld)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 font-extrabold text-slate-900">
                          <span>Net Taxable Capital Gain</span>
                          <span>{formatINR(netTaxableGainsOld)}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-sm font-black text-blue-800">
                          <span>Total Tax Payable (20.8%)</span>
                          <span>{formatINR(totalTaxOld)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Option B: New Regime (12.5% Flat without CII) */}
                    <div
                      className={`rounded-2xl border p-5 space-y-4 ${
                        !isGrandfatheringEligible || totalTaxNew < totalTaxOld
                          ? "bg-white border-rose-400 ring-2 ring-rose-100 shadow-sm"
                          : "bg-white/80 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                            REGIME B (BUDGET 2024)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            12.5% Flat (No Indexation)
                          </div>
                        </div>
                        {(!isGrandfatheringEligible || totalTaxNew < totalTaxOld) && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800">
                            RECOMMENDED
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Net Sale Consideration</span>
                          <span className="font-semibold text-slate-900">{formatINR(netConsideration)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Actual Cost of Acquisition</span>
                          <span className="font-semibold text-slate-900">{formatINR(effectiveBaseCost)}</span>
                        </div>
                        {improvementCost > 0 && (
                          <div className="flex justify-between py-1 border-b border-slate-50">
                            <span className="text-slate-600">Actual Cost of Improvement</span>
                            <span className="font-semibold text-slate-900">{formatINR(improvementCost)}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Gross Long Term Gain</span>
                          <span className="font-bold text-slate-900">{formatINR(grossCapitalGainsNew)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 text-emerald-700 font-semibold">
                          <span>Sec 54 &amp; 54EC Exemptions</span>
                          <span>- {formatINR(totalDeductionsNew)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 font-extrabold text-slate-900">
                          <span>Net Taxable Capital Gain</span>
                          <span>{formatINR(netTaxableGainsNew)}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-sm font-black text-[#C65378]">
                          <span>Total Tax Payable (13.0%)</span>
                          <span>{formatINR(totalTaxNew)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MULTI-HEIR SPLIT SUMMARY CARD */}
                  {numberOfHeirs > 1 && (
                    <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-5 space-y-2">
                      <div className="flex items-center gap-2 font-extrabold text-emerald-950 text-sm">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span>Multi-Heir Individual Allocation ({numberOfHeirs} Co-Owners)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-emerald-100">
                          <div className="text-slate-500 font-semibold">Ownership Share Each</div>
                          <div className="font-black text-slate-900 text-sm mt-0.5">
                            {(sharePerHeir * 100).toFixed(1)}% of Estate
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-emerald-100">
                          <div className="text-slate-500 font-semibold">Net Taxable Gain Each</div>
                          <div className="font-black text-slate-900 text-sm mt-0.5">
                            {formatINR(netTaxableGainPerHeir)}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-emerald-100">
                          <div className="text-slate-500 font-semibold">Individual Tax Liability</div>
                          <div className="font-black text-[#C65378] text-sm mt-0.5">
                            {formatINR(taxPerHeir)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NRI SECTION 195 TDS IMPACT ESTIMATOR */}
                  {residency === "nri" && (
                    <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-extrabold text-amber-950 text-sm">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>NRI Section 195 TDS &amp; Form 13 Savings Analysis</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                          CRITICAL CASHFLOW ACTION
                        </span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        Without a Lower Deduction Certificate under Section 197 (Form 13), Indian property
                        buyers are legally required to deduct TDS on the <strong>gross sale price</strong>{" "}
                        at 14.3% to 23.9%, locking up your funds until income tax refund processing.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-amber-200">
                          <div className="text-slate-500 font-semibold">Default TDS on Gross Consideration</div>
                          <div className="font-black text-rose-700 text-sm mt-0.5">
                            {formatINR(defaultGrossTdsWithoutForm13)}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-amber-200">
                          <div className="text-slate-500 font-semibold">Actual Net Tax with Form 13</div>
                          <div className="font-black text-emerald-700 text-sm mt-0.5">
                            {formatINR(tdsWithForm13)}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-amber-200">
                          <div className="text-slate-500 font-semibold">Cashflow Saved from Lockup</div>
                          <div className="font-black text-blue-700 text-sm mt-0.5">
                            {formatINR(lockedCashflowSaved)}
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[11px] text-amber-800">
                          Need Form 13 filed on TRACES before registration?
                        </span>
                        <Link
                          href="/services/nri-inherited-property-sale-repatriation"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] hover:underline"
                        >
                          <span>Explore NRI Property Repatriation Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: INHERITED PROPERTY CAPITAL GAINS</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Income Tax Act 1961</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/capital-gains-tax-calculator-inherited-property-og.jpg"
                  alt="Capital Gains Tax on Inherited Property Calculator India - Statutory Blueprint & Grandfathering Guide"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* SECTION 3: BUDGET 2024 AMENDMENT */}
            <section id="budget-2024-amendment" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FINANCE (NO. 2) ACT 2024</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Budget 2024 Amendment: 12.5% Flat vs 20% Indexation
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  On July 23, 2024, the Union Budget initially proposed eliminating indexation benefits
                  for immovable property and slashing the Long-Term Capital Gains (LTCG) tax rate from 20%
                  to 12.5%. This sparked widespread outrage among middle-class homeowners and inherited
                  property legatees, as assets held over 15 to 30 years face massive inflation gains
                  without corresponding real financial appreciation.
                </p>
                <p>
                  In response, Parliament passed an official amendment introducing a{" "}
                  <strong>Grandfathering Proviso in Section 112</strong> of the Income Tax Act. For any
                  house, apartment, or land acquired before July 23, 2024 by Resident Individuals or HUFs,
                  the assessee holds the statutory option to calculate tax under both regimes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Old Regime (20% with CII):</strong> Gross sale consideration minus Indexed Cost
                    of Acquisition (ICOA) and Indexed Improvement Costs (ICOI).
                  </li>
                  <li>
                    <strong>New Regime (12.5% without CII):</strong> Gross sale consideration minus actual
                    purchase price and actual improvement expenditures.
                  </li>
                  <li>
                    <strong>The Grandfathering Rule:</strong> If the tax computed under the 20% indexation
                    regime is lower than 12.5%, the excess tax is waived!
                  </li>
                </ul>
                <p>
                  In the case of inherited property, the date of acquisition for grandfathering is governed
                  by the date the <strong>previous owner</strong> bought the property. Thus, if your father
                  purchased a home in 1998 and passed away in 2025, you retain the grandfathering option to
                  choose 20% with indexation!
                </p>
              </div>
            </section>

            {/* SECTION 4: SECTION 49(1) & MANJULA J. SHAH PRECEDENT */}
            <section id="section-49-cost-holding" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 49(1) Cost to Previous Owner &amp; Bombay HC Rule
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 49(1) of the Income Tax Act provides that where an assessee acquires an asset
                  under a gift, Will, succession, inheritance, or distribution on partition of a Hindu
                  Undivided Family (HUF), the cost of acquisition is deemed to be the cost for which the
                  previous owner acquired it.
                </p>
                <p>
                  For years, the Income Tax Department argued that while the cost is deemed from the
                  previous owner, the Cost Inflation Index (CII) could only be applied from the year the
                  heir actually became the owner. This bureaucratic interpretation caused immense tax
                  hardship.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>CIT v. Manjula J. Shah (2013) 355 ITR 474 (Bombay High Court)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Bombay High Court conclusively held that when computing indexed cost of acquisition
                    under Section 48 read with Section 49(1) and Section 2(42A), the indexation multiplier
                    must be calculated with reference to the financial year in which the{" "}
                    <strong>previous owner acquired the property</strong>. This ruling was subsequently
                    upheld by the Delhi High Court (Arun Shungloo Trust), Gujarat High Court, and Karnataka
                    High Court, becoming settled law across India.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: PRE-2001 VALUATIONS */}
            <section id="pre-2001-valuation-fmv" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>BASE YEAR VALUATION MECHANICS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Pre-2001 Valuations: April 1, 2001 FMV vs Stamp Duty
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When inheriting ancestral properties bought before April 1, 2001 (e.g., properties
                  purchased in the 1960s, 70s, or 80s for just a few thousand rupees), using original
                  purchase price would lead to catastrophic tax. To eliminate this distortion, Section
                  55(2)(b) grants taxpayers the legal right to substitute the{" "}
                  <strong>Fair Market Value (FMV) as of April 1, 2001</strong> as the deemed base cost.
                </p>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Section 55(2)(b)(ii) Ready Reckoner Cap (Budget 2020 Amendment)</span>
                  </div>
                  <p className="leading-relaxed">
                    Under the amendment introduced by Finance Act 2020, the Fair Market Value as of April
                    1, 2001 adopted by the taxpayer cannot exceed the <strong>Stamp Duty Value</strong>{" "}
                    (circle rate or ready reckoner rate) of the property as on April 1, 2001. Taxpayers must
                    obtain both:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>
                      A formal Valuation Report from an IBBI or Income Tax Department Registered Valuer.
                    </li>
                    <li>
                      A certified extract of the April 1, 2001 Circle Rate from the local Sub-Registrar
                      Office (SRO).
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* SECTION 6: SECTION 54 & 54EC MULTI-HEIR MULTIPLIER */}
            <section id="section-54-multi-heir" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CO-OWNER TAX OPTIMIZATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Section 54 &amp; 54EC Multi-Heir Exemption Multiplier
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most powerful tax-saving opportunities in Indian real estate occurs when
                  multiple siblings or legal heirs inherit a property together as tenants-in-common.
                </p>
                <p>
                  Under Section 26 of the Income Tax Act, where property is owned by two or more persons
                  having definite and ascertainable shares, they are assessed not as an Association of
                  Persons (AOP), but <strong>individually as independent assessees</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Section 54EC: ₹50 Lakh Per Heir Multiplier</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Section 54EC permits investing capital gains in notified bonds (NHAI, REC, PFC,
                      IRFC) within 6 months of sale. The statutory cap of ₹50 Lakhs applies{" "}
                      <strong>per assessee</strong>. Thus, 3 co-heir siblings can invest ₹50 Lakhs EACH,
                      legally shielding ₹1.50 Crore of capital gains from tax!
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span>Section 54: Independent House Reinvestments</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Each co-heir can independently decide how to reinvest their share. One sibling can
                      purchase a new residential apartment under Section 54, while another invests in
                      Section 54EC bonds, and a third pays the 12.5% tax. Each heir files their own
                      individual ITR.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: NRI SELLERS SECTION 195 & FORM 13 */}
            <section id="nri-tds-section-195" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>CROSS-BORDER TAXATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. NRI Sellers: Section 195 TDS &amp; Form 13 Lower Deduction
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For Non-Resident Indians (NRIs) inheriting and liquidating real estate in India, tax
                  withholding is the single biggest operational obstacle. While resident sellers face a
                  nominal 1% TDS under Section 194-IA (only if sale price exceeds ₹50 Lakhs), NRI sellers
                  fall under <strong>Section 195</strong>.
                </p>
                <p>
                  Under Section 195, the buyer is legally obligated to deduct TDS at the full rate of 12.5%
                  or 20% plus highest applicable surcharge (up to 15%) and 4% Health &amp; Education Cess on
                  the <strong>entire gross sale consideration</strong>!
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>The Solution: Section 197 Lower Deduction Certificate (Form 13)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To prevent 20%+ of your gross property value being locked with the Indian Tax
                    Department for over 12 to 18 months, the NRI seller must submit an online application
                    in <strong>Form 13 on the TRACES portal</strong> before executing the sale deed. The
                    Assessing Officer examines the Section 49(1) purchase deeds and Section 54/54EC
                    reinvestments, issuing a statutory certificate directing the buyer to deduct TDS only on
                    the actual net capital gain, or at NIL rate.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/services/nri-inherited-property-sale-repatriation"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:text-[#a33b5c]"
                    >
                      <span>Learn about AMA Legal Solutions NRI Property Sale &amp; Repatriation Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table-regimes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON TABLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison Table: Pre-2024 vs Post-2024 Real Estate Tax
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Key differences between the pre-Budget 2024 regime, the flat 12.5% amendment, and the
                grandfathered relaxation for inherited property:
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Feature</th>
                      <th className="py-3.5 px-4">Pre-July 23, 2024 Regime</th>
                      <th className="py-3.5 px-4">Budget 2024 New Regime</th>
                      <th className="py-3.5 px-4">Grandfathered (Pre-2024 Asset)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">LTCG Tax Rate</td>
                      <td className="py-3 px-4">20% + 4% Cess (20.8%)</td>
                      <td className="py-3 px-4">12.5% + 4% Cess (13.0%)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">LOWER of 20% or 12.5%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Cost Inflation Index</td>
                      <td className="py-3 px-4">Full CII Indexation</td>
                      <td className="py-3 px-4 text-rose-700">No Indexation</td>
                      <td className="py-3 px-4">Available under 20% option</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Inheritance Cost Base</td>
                      <td className="py-3 px-4">Section 49(1) Parent&rsquo;s Cost</td>
                      <td className="py-3 px-4">Section 49(1) Parent&rsquo;s Cost</td>
                      <td className="py-3 px-4">Section 49(1) Parent&rsquo;s Cost</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Indexation Start Year</td>
                      <td className="py-3 px-4">Manjula J. Shah: Parent&rsquo;s Year</td>
                      <td className="py-3 px-4">N/A (No indexation)</td>
                      <td className="py-3 px-4 font-bold text-blue-700">Parent&rsquo;s Acquisition Year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Pre-2001 FMV Option</td>
                      <td className="py-3 px-4">Capped at Circle Rate 2001</td>
                      <td className="py-3 px-4">Capped at Circle Rate 2001</td>
                      <td className="py-3 px-4">Capped at Circle Rate 2001</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">NRI TDS Requirement</td>
                      <td className="py-3 px-4">Sec 195 at 20.8% on Gross</td>
                      <td className="py-3 px-4">Sec 195 at 12.5% on Gross</td>
                      <td className="py-3 px-4">Sec 195 (Apply for Form 13)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sale-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Inherited Property Sale Checklist
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Establish Undisputed Title & Revenue Mutation",
                    desc: "Before advertising or negotiating with buyers, ensure the municipal mutation, Khata transfer, or property card reflects all legal heirs. Obtain probate (if in Mumbai, Chennai, or Kolkata) or Letters of Administration, or registered Surviving Member Certificate.",
                  },
                  {
                    step: 2,
                    title: "Obtain Ancestor Title Deeds & Cost Records",
                    desc: "Locate the registered deed under which the previous owner acquired the property. If lost, apply for certified copies from the Sub-Registrar Office under Section 57 of the Registration Act, 1908.",
                  },
                  {
                    step: 3,
                    title: "Commission Registered Valuation for Pre-2001 Assets",
                    desc: "If acquired before April 1, 2001, commission a registered valuer for an April 1, 2001 FMV report. Concurrently obtain a written circle rate certificate as of April 1, 2001 from the SRO.",
                  },
                  {
                    step: 4,
                    title: "Execute Multi-Heir Partition or Family Settlement Deed",
                    desc: "If multiple heirs hold shares, executing a registered Family Settlement Deed or Relinquishment Deed clarifies individual percentage entitlements for Section 26 independent assessment.",
                  },
                  {
                    step: 5,
                    title: "Draft Clear Section 49(1) Sale Deed Recitals",
                    desc: "Ensure the draft sale deed recites the exact chain of title, testamentary bequest, and indemnity, protecting the buyer from unknown claims and verifying cost records for your ITR.",
                  },
                  {
                    step: 6,
                    title: "File Form 13 (If NRI) & Invest in Section 54/54EC",
                    desc: "NRI sellers must submit Form 13 on TRACES 4 to 6 weeks before registration. Upon receipt of sale proceeds, execute Section 54 residential purchase within 2 years or Section 54EC bond deposit within 6 months.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD APPLICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Real Inheritance Tax Scenarios
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario A: Ancestral Delhi House (Bought 1996)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Delhi NCR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Father bought a South Delhi villa in 1996 for ₹15 Lakhs. Deceased in 2021. April 1,
                    2001 FMV and circle rate was ₹45 Lakhs. The son sold the villa in FY 2024-25 for ₹3.50
                    Crore.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Old Regime (20% with CII 363):</span>
                      <span className="font-bold text-slate-900">Tax = ₹38.80 Lakhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">New Regime (12.5% Flat on ₹3.05 Cr):</span>
                      <span className="font-bold text-slate-900">Tax = ₹39.65 Lakhs</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Son Saves Under Grandfathering:</span>
                      <span>₹85,000 Saved via 20% CII</span>
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario B: 3 Siblings Selling Mumbai Flat (Bought 2005)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Mumbai CHS
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mother bought a Bandra apartment in 2005 for ₹40 Lakhs (CII 117). Sold in 2024 for ₹2.40
                    Crore. Three siblings inherit equal 1/3rd shares (gain = ₹38.7 Lakhs each under indexed
                    cost).
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Individual Gain Each:</span>
                      <span className="font-bold text-slate-900">₹38,70,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Each Sibling Sec 54EC Bond Deposit:</span>
                      <span className="font-bold text-emerald-700">₹38,70,000 (Within ₹50L cap)</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-black flex justify-between border-t border-slate-200">
                      <span>Total Family Tax Payable:</span>
                      <span>₹0 (100% Legally Exempt!)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL RECITAL & FORM 13 CHECKLIST */}
            <section id="legal-clause-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTEABLE LEGAL ASSETS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Legal Recitals &amp; Form 13 Checklist
              </h2>

              {/* Template Box 1: Section 49(1) Sale Deed Recital */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 49(1) Sale Deed Recital Clause for Inherited Property
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"AND WHEREAS the late [Full Name of Testator/Parent], son/daughter of [Grandparent Name], had originally acquired absolute registered title and ownership of the Schedule Property vide Registered Sale Deed dated [Date of Original Purchase], bearing Document No. [Doc Number], registered in Book I, Volume [Vol], at Pages [Pages], in the Office of the Sub-Registrar at [SRO Location], for a total purchase consideration of Rs. [Original Purchase Amount]/-.

AND WHEREAS the said [Original Owner] departed this life on [Date of Demise] at [Place], leaving behind his/her Last Will and Testament dated [Date of Will] (duly probated vide Order dated [Date] by the Hon'ble [High Court/District Court Name] in Testamentary Petition No. [Pet Number]) / leaving behind the Vendors as his/her sole legal surviving Class I heirs under the provisions of the Hindu Succession Act, 1956.

AND WHEREAS by virtue of the said testamentary bequest / intestate inheritance and subsequent Mutation Order No. [Mutation No.] dated [Date], the Vendors herein are the absolute, undisputed co-owners and legal representatives of the deceased under Section 49(1) of the Income Tax Act, 1961, holding full authority to alienate, transfer, and execute this Conveyance Deed free from all encumbrances, lis pendens, or third-party claims."`}
                </pre>
              </div>

              {/* Template Box 2: Form 13 Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    NRI Form 13 TRACES Application Checklist (Section 197)
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
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
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Agreement to Sell / MOU with the buyer</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Parent purchase deed &amp; registered Will/Probate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>April 1, 2001 Valuation report &amp; SRO Circle rate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 54/54EC reinvestment proof documents</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Tax Advocacy Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier succession technology and estate planning
                  platform, powered by AMA Legal Solutions. Our multidisciplinary bench includes senior
                  High Court testamentary litigators, chartered property valuation experts, and cross-border
                  tax advocates. We have structured over 15,000 challenge-proof Wills and assisted hundreds
                  of resident families and NRIs in seamless inheritance transmission, Form 13 TDS
                  clearances, and dispute-free property liquidations.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/nri-inherited-property-sale-repatriation"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>NRI Inherited Property Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Calculator</span>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Inherited Property Tax
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to common questions about capital gains tax, grandfathering, indexation,
                and NRI sale procedures in India:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
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
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Income Tax Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Provisions of the Income Tax Act, 1961:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 2(42A):</strong> Inclusion of previous owner holding tenure in
                      determining Long-Term Capital Asset status.
                    </li>
                    <li>
                      <strong>Section 47(iii):</strong> Express exclusion of transfers under Will or
                      inheritance from capital gains tax.
                    </li>
                    <li>
                      <strong>Section 49(1):</strong> Deemed cost of acquisition for property acquired
                      under succession, inheritance, or Will.
                    </li>
                    <li>
                      <strong>Section 55(2)(b):</strong> Substitution of April 1, 2001 Fair Market Value
                      capped at Stamp Duty Value.
                    </li>
                    <li>
                      <strong>Section 112 Proviso (Finance Act 2024):</strong> Grandfathering relief
                      allowing lower of 20% with CII or 12.5% flat tax for pre-July 23, 2024 assets.
                    </li>
                    <li>
                      <strong>Section 195 &amp; 197:</strong> Withholding tax on Non-Resident Indian
                      property transfers and Form 13 Lower Deduction Certificate.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://incometaxindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Income Tax Department Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.tdscpc.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>TRACES Portal (Form 13)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Income Tax Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/services/nri-inherited-property-sale-repatriation"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Property Sale Repatriation Desk
                    </Link>
                  </div>
                </div>
              </div>
            </section>
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
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, High Court probate petitions, Section
                49(1) inheritance dispute defense, and cross-border NRI estate structuring.
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
                  <span>PREVENT FUTURE CAPITAL GAINS DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Co-Heir Partition Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted, legally registered Will establishes precise ownership shares,
                  enabling your children to each claim independent ₹50 Lakh Section 54EC exemptions.
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
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>TAX SCRUTINY &amp; FORM 13 DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Selling High-Value Inherited Property or NRI Asset?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our tax litigators handle Section 197 Form 13 Lower TDS petitions, Section 50C circle rate
                  challenges, and ancestral title verification pan-India.
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
                      <strong>Budget 2024 Precision:</strong> Incorporates the latest Section 112 grandfathering proviso.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Multi-Heir Split:</strong> Calculates independent per-heir 54EC bond exemptions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NRI TDS Prevention:</strong> Quantifies trapped cashflow under Section 195.
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
          <span>Tax Calculator</span>
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
