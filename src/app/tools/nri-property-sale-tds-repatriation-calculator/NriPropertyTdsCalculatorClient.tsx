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
  Send,
  CreditCard,
  Briefcase,
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

// Screaming Frog Compliant Headings (All <= 70 chars, Strictly ZERO em-dashes)
const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Statutory Rules: NRI Property TDS & FEMA" },
  { id: "interactive-calculator", label: "2. Interactive NRI Property TDS & Cash Flow Tool" },
  { id: "cashflow-blockage-comparison", label: "3. Gross TDS vs Form 13: Cash Flow Moat" },
  { id: "section-195-tds-rates", label: "4. Section 195 TDS Rates: Long vs Short Term" },
  { id: "form-13-lower-tds-process", label: "5. Form 13 Lower TDS: TRACES Filing SOP" },
  { id: "rbi-repatriation-rules", label: "6. RBI USD 1 Million Scheme: FEMA Limits" },
  { id: "form-15ca-15cb-sop", label: "7. Form 15CA & 15CB Outward Remittance SOP" },
  { id: "nro-to-nre-transfer-steps", label: "8. NRO to NRE Account Transfer Pathway" },
  { id: "dtaa-foreign-tax-credit", label: "9. Cross-Border Treaties: DTAA Tax Credit" },
  { id: "practical-case-studies", label: "10. NRI Case Studies: USA, UK, UAE & Canada" },
  { id: "checklist-and-legal-clauses", label: "11. Form 13 Checklist & Sale Deed Recital" },
  { id: "cross-border-legal-profile", label: "12. Cross-Border Legal Advisory: AMA Legal" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: NRI TDS & FEMA" },
  { id: "statutory-citations", label: "14. Statutory Authorities & Official Portals" },
];

const FAQS = [
  {
    q: "Why does the buyer deduct TDS on the full sale price instead of my capital gain?",
    a: "Under Section 195 of the Income Tax Act, 1961, the buyer is legally obligated to withhold tax on payments to non-residents. Because buyers fear heavy penalties and interest under Section 201 for short deduction, they routinely deduct TDS on the entire gross sale consideration unless the NRI seller furnishes an official Lower or Nil Deduction Certificate under Section 197 issued by the Assessing Officer.",
  },
  {
    q: "How much cash-flow blockage does Form 13 save for an NRI selling inherited property?",
    a: "A Form 13 Lower Deduction Certificate limits the withholding tax strictly to the actual capital gains tax liability rather than the gross sale price. For example, on a ₹3.00 Crore property with ₹80 Lakhs in capital gains, default Section 195 TDS blocks approximately ₹44.85 Lakhs (at 14.95%), whereas Form 13 limits tax to approximately ₹11.96 Lakhs, immediately unlocking ₹32.89 Lakhs in liquid funds.",
  },
  {
    q: "Can an NRI repatriate more than USD 1 Million per financial year from inherited property sale?",
    a: "Under the RBI USD 1 Million Scheme (FEMA Remittance of Assets Regulations, 2016), an NRI or OCI can repatriate up to USD 1,000,000 per financial year (April to March) from their NRO account without RBI approval. If sale proceeds exceed USD 1 Million, you may either split remittances across two financial years (e.g., March and April) or apply for prior RBI permission through your Authorized Dealer Category-I bank.",
  },
  {
    q: "What documents are required to file Form 15CA and Form 15CB for outward remittance?",
    a: "Repatriation requires: (1) Form 15CB certified by a Chartered Accountant verifying tax compliance, (2) Form 15CA filed online on the Income Tax e-filing portal, (3) Registered Agreement for Sale / Conveyance Deed, (4) Registered Will, Probate, or Legal Heir Certificate proving inherited title, (5) Proof of tax payment (TDS certificate Form 16A or advance tax challan), and (6) Form A2 and FEMA declaration submitted to your bank.",
  },
  {
    q: "Does an Indian resident buyer need a TAN to buy property from an NRI?",
    a: "Yes. Unlike purchases from resident Indians where buyers deduct 1% TDS using PAN under Section 194-IA, purchasing from an NRI falls strictly under Section 195. The buyer MUST apply for a Tax Deduction and Collection Account Number (TAN) under Form 49B, deposit TDS via Challan ITNS 281 within 7 days from month-end, and file quarterly TDS returns in Form 27Q.",
  },
  {
    q: "How long does it take to obtain a Section 197 Lower TDS Certificate via TRACES?",
    a: "Processing typically requires 3 to 6 weeks from online submission on the TRACES portal. The file is assigned to the International Taxation Ward having jurisdiction over non-residents. Sellers should initiate the application immediately after signing the Agreement for Sale / MoU and well before executing the final registered sale deed.",
  },
  {
    q: "Can multiple NRI siblings selling one inherited property each repatriate USD 1 Million?",
    a: "Yes. The RBI USD 1 Million annual limit applies individually to each separate legal heir holding a distinct PAN card. If three NRI siblings jointly inherit ancestral property in India, each co-owner can independently repatriate up to USD 1 Million per financial year through their respective NRO accounts, enabling up to USD 3 Million in aggregate family transfers.",
  },
  {
    q: "Can NRI sellers claim Double Taxation Relief (DTAA) in the US, UK, or Canada?",
    a: "Yes. Under Article 13 of the India-US DTAA (and corresponding capital gains provisions in UK and Canada treaties), capital gains on immovable real estate are primarily taxable in India where the property is located. However, you can claim a Foreign Tax Credit (FTC) in your home jurisdiction (such as IRS Form 1116 in the United States) to eliminate double taxation.",
  },
];

const CURRENCY_RATES: Record<string, { symbol: string; name: string; defaultRate: number }> = {
  USD: { symbol: "$", name: "US Dollar", defaultRate: 86.5 },
  GBP: { symbol: "£", name: "British Pound", defaultRate: 110.2 },
  EUR: { symbol: "€", name: "Euro", defaultRate: 93.4 },
  AED: { symbol: "AED", name: "UAE Dirham", defaultRate: 23.55 },
  CAD: { symbol: "C$", name: "Canadian Dollar", defaultRate: 63.2 },
  AUD: { symbol: "A$", name: "Australian Dollar", defaultRate: 56.8 },
  SGD: { symbol: "S$", name: "Singapore Dollar", defaultRate: 65.4 },
};

export default function NriPropertyTdsCalculatorClient() {
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
  const [copiedForm13Checklist, setCopiedForm13Checklist] = useState<boolean>(false);
  const [copied15CAChecklist, setCopied15CAChecklist] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"tds" | "repatriation" | "coheirs">("tds");

  // ==========================================
  // CALCULATOR STATE (INPUT PARAMETERS)
  // ==========================================
  // Property & Sale Details
  const [grossSalePrice, setGrossSalePrice] = useState<number>(30000000); // ₹3.00 Cr
  const [circleRateValue, setCircleRateValue] = useState<number>(27000000); // ₹2.70 Cr (Sec 50C check)
  const [acquisitionEra, setAcquisitionEra] = useState<"pre_2001" | "between_2001_and_2024" | "post_july_2024">("between_2001_and_2024");
  const [acquisitionYear, setAcquisitionYear] = useState<string>("2008-09");
  const [saleYear, setSaleYear] = useState<string>("2024-25");
  const [holdingType, setHoldingType] = useState<"long_term" | "short_term">("long_term");

  // Base Cost & Improvements
  const [originalCost, setOriginalCost] = useState<number>(4000000); // ₹40 Lakhs
  const [fmv2001, setFmv2001] = useState<number>(3500000); // ₹35 Lakhs (for pre-2001)
  const [sdv2001, setSdv2001] = useState<number>(3200000); // ₹32 Lakhs (ready reckoner 2001)
  const [improvementCost, setImprovementCost] = useState<number>(600000); // ₹6 Lakhs
  const [improvementYear, setImprovementYear] = useState<string>("2014-15");
  const [transferExpenses, setTransferExpenses] = useState<number>(300000); // ₹3 Lakhs (brokerage, legal)

  // Deductions & Reinvestments
  const [section54Reinvestment, setSection54Reinvestment] = useState<number>(0); // New residential house
  const [section54ECBonds, setSection54ECBonds] = useState<number>(0); // Capital gains bonds (REC/NHAI)

  // Tax Rate Options
  const [ltcgRateOption, setLtcgRateOption] = useState<"12.5_flat" | "20_index">("12.5_flat");

  // Repatriation Tab State
  const [targetCurrency, setTargetCurrency] = useState<string>("USD");
  const [customForexRate, setCustomForexRate] = useState<number>(86.5);
  const [priorRemittancesUsd, setPriorRemittancesUsd] = useState<number>(0);

  // Multi-Heir Tab State
  const [numberOfHeirs, setNumberOfHeirs] = useState<number>(2);

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

  const handleCurrencyChange = (curr: string) => {
    setTargetCurrency(curr);
    if (CURRENCY_RATES[curr]) {
      setCustomForexRate(CURRENCY_RATES[curr].defaultRate);
    }
  };

  const handleResetCalculator = () => {
    setGrossSalePrice(30000000);
    setCircleRateValue(27000000);
    setAcquisitionEra("between_2001_and_2024");
    setAcquisitionYear("2008-09");
    setSaleYear("2024-25");
    setHoldingType("long_term");
    setOriginalCost(4000000);
    setFmv2001(3500000);
    setSdv2001(3200000);
    setImprovementCost(600000);
    setImprovementYear("2014-15");
    setTransferExpenses(300000);
    setSection54Reinvestment(0);
    setSection54ECBonds(0);
    setLtcgRateOption("12.5_flat");
    setTargetCurrency("USD");
    setCustomForexRate(86.5);
    setPriorRemittancesUsd(0);
    setNumberOfHeirs(2);
  };

  // ==========================================
  // MATHEMATICAL TAX & FEMA COMPUTATION ENGINE
  // ==========================================

  // 1. Full Value of Consideration (Section 50C Check)
  // Safe harbour tolerance is 10% (110% of gross sale price)
  const isCircleRateHigher = circleRateValue > grossSalePrice * 1.1;
  const fullValueOfConsideration = isCircleRateHigher ? circleRateValue : grossSalePrice;
  const netConsideration = Math.max(0, fullValueOfConsideration - transferExpenses);

  // 2. Base Cost Deeming (Section 49(1) & Section 55(2)(b))
  let effectiveBaseCost = originalCost;
  let baseCIIYear = acquisitionYear;

  if (acquisitionEra === "pre_2001") {
    // Under Section 55(2)(b)(ii), FMV as on April 1, 2001 cannot exceed circle rate (sdv2001)
    const cappedFmv = sdv2001 > 0 ? Math.min(fmv2001, sdv2001) : fmv2001;
    effectiveBaseCost = Math.max(originalCost, cappedFmv);
    baseCIIYear = "2001-02";
  }

  const saleCII = CII_TABLE[saleYear] || 363;
  const acqCII = CII_TABLE[baseCIIYear] || 100;
  const impCII = CII_TABLE[improvementYear] || 200;

  // 3. Indexed Cost Computations (for 20% indexation option)
  const indexedCostOfAcquisition = Math.round(effectiveBaseCost * (saleCII / acqCII));
  const indexedCostOfImprovement =
    improvementCost > 0 ? Math.round(improvementCost * (saleCII / impCII)) : 0;
  const totalIndexedCost = indexedCostOfAcquisition + indexedCostOfImprovement;

  // Actual cost (without indexation for 12.5% flat)
  const totalActualCost = effectiveBaseCost + improvementCost;

  // 4. Gross Capital Gains
  let grossCapitalGains = 0;
  if (holdingType === "short_term") {
    grossCapitalGains = Math.max(0, netConsideration - totalActualCost);
  } else {
    if (ltcgRateOption === "20_index") {
      grossCapitalGains = Math.max(0, netConsideration - totalIndexedCost);
    } else {
      grossCapitalGains = Math.max(0, netConsideration - totalActualCost);
    }
  }

  // 5. Section 54 and 54EC Reinvestment Deductions
  const maxAllowable54EC = 5000000 * numberOfHeirs; // ₹50L per heir
  const appliedSection54EC = Math.min(section54ECBonds, maxAllowable54EC);

  // Section 54 residential exemption ceiling: ₹10 Crores
  const appliedSection54 = Math.min(section54Reinvestment, Math.min(grossCapitalGains, 100000000));

  const totalDeductions = Math.min(grossCapitalGains, appliedSection54 + appliedSection54EC);
  const netTaxableGains = Math.max(0, grossCapitalGains - totalDeductions);

  // 6. Tax Rate & Surcharge Engine for NRI
  // Surcharge slabs on LTCG under Section 112 are capped at 15%
  let surchargeRate = 0;
  if (netTaxableGains > 10000000) {
    surchargeRate = 0.15; // 15% surcharge above ₹1 Cr
  } else if (netTaxableGains > 5000000) {
    surchargeRate = 0.1; // 10% surcharge between ₹50L and ₹1 Cr
  }

  let baseTaxRate = 0.125;
  if (holdingType === "short_term") {
    baseTaxRate = 0.3; // Slab / MMR 30% for short term
  } else if (ltcgRateOption === "20_index") {
    baseTaxRate = 0.2;
  }

  // Tax + Surcharge + 4% Health & Education Cess
  const effectiveGainTaxRate = baseTaxRate * (1 + surchargeRate) * 1.04;
  const actualTaxLiability = Math.round(netTaxableGains * effectiveGainTaxRate);

  // 7. DEFAULT SECTION 195 TDS ON GROSS SALE CONSIDERATION (Without Form 13)
  // Buyers deduct on FULL sale price at the highest applicable rate
  // For LTCG: 12.5% * 1.15 * 1.04 = 14.95% (or 20% * 1.15 * 1.04 = 23.92%)
  // For STCG: 30% * 1.15 * 1.04 = 35.88%
  let defaultGrossTdsRate = 0.1495; // 14.95% standard for 12.5% rate with max surcharge & cess
  if (holdingType === "short_term") {
    defaultGrossTdsRate = 0.3588; // 35.88%
  } else if (ltcgRateOption === "20_index") {
    defaultGrossTdsRate = 0.2392; // 23.92%
  }

  const defaultGrossTdsWithoutForm13 = Math.round(grossSalePrice * defaultGrossTdsRate);

  // 8. FORM 13 LOWER DEDUCTION TDS (Restricted to Actual Tax Liability)
  const tdsWithForm13 = actualTaxLiability;
  const form13EffectiveRateOnGross =
    grossSalePrice > 0 ? (tdsWithForm13 / grossSalePrice) * 100 : 0;

  // 9. CASH-FLOW BLOCKAGE SAVED (THE MOAT)
  const lockedCashflowSaved = Math.max(0, defaultGrossTdsWithoutForm13 - tdsWithForm13);
  const refundWaitingMonths = "14 to 24 Months";

  // 10. FEMA USD 1 MILLION REPATRIATION ENGINE
  // Net cash available in NRO Account after TDS
  const netNroProceedsWithForm13 = grossSalePrice - tdsWithForm13 - transferExpenses;
  const netNroProceedsWithoutForm13 = grossSalePrice - defaultGrossTdsWithoutForm13 - transferExpenses;

  // Conversion to Target Foreign Currency
  const activeFxRate = customForexRate > 0 ? customForexRate : 86.5;
  const netRemittanceInForeignCurr = Math.round(netNroProceedsWithForm13 / activeFxRate);
  const netRemittanceInUsd = Math.round(netNroProceedsWithForm13 / (CURRENCY_RATES["USD"].defaultRate || 86.5));

  // RBI USD 1,000,000 Annual Cap Checks
  const totalUsdRemittedThisYear = priorRemittancesUsd + netRemittanceInUsd;
  const rbiUsdLimit = 1000000;
  const remainingUsdQuota = Math.max(0, rbiUsdLimit - priorRemittancesUsd);
  const quotaUtilizationPercent = Math.min(100, Math.round((totalUsdRemittedThisYear / rbiUsdLimit) * 100));
  const excessOverUsdLimit = Math.max(0, totalUsdRemittedThisYear - rbiUsdLimit);

  // Multi-Heir Sibling Calculations
  const shareRatio = 1 / numberOfHeirs;
  const grossPerHeir = Math.round(grossSalePrice * shareRatio);
  const gainsPerHeir = Math.round(netTaxableGains * shareRatio);
  const taxPerHeir = Math.round(actualTaxLiability * shareRatio);
  const defaultTdsPerHeir = Math.round(defaultGrossTdsWithoutForm13 * shareRatio);
  const savedCashflowPerHeir = Math.round(lockedCashflowSaved * shareRatio);
  const netNroPerHeir = Math.round(netNroProceedsWithForm13 * shareRatio);
  const usdRepatriationPerHeir = Math.round(netNroPerHeir / (CURRENCY_RATES["USD"].defaultRate || 86.5));

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatCurrency = (val: number, currCode: string) => {
    const symbol = CURRENCY_RATES[currCode]?.symbol || "$";
    return `${symbol}${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(val)}`;
  };

  const copyClauseToClipboard = () => {
    const clauseText = `SPECIAL NRI VENDOR RECITAL & SECTION 195/197 TDS CLAUSE FOR CONVEYANCE DEED:
"AND WHEREAS the VENDOR is an Indian citizen residing outside India and holds the legal status of a Non-Resident Indian (NRI) under Section 6 of the Income Tax Act, 1961, and Foreign Exchange Management Act, 1999 (FEMA).

AND WHEREAS the VENDOR acquired absolute undivided title and legal ownership in the Schedule Property by way of testamentary succession under the registered Last Will and Testament dated [Date of Will] executed by late [Testator Name] (duly probated vide Order dated [Date] by the Hon'ble [Court Name]) / intestate legal inheritance under the Hindu Succession Act, 1956, and subsequent Revenue Mutation Order No. [Mutation Number] dated [Date].

NOW THIS DEED WITNESSETH AND IT IS MUTUALLY AGREED BETWEEN THE PARTIES AS FOLLOWS:
1. TAX DEDUCTION AT SOURCE (SECTION 195 / SECTION 197 COMPLIANCE):
The PURCHASER acknowledges that the VENDOR has applied for and obtained a valid Certificate for Lower / Nil Deduction of Tax under Section 197 of the Income Tax Act, 1961, issued by the Assessing Officer, International Taxation Ward, bearing Certificate No. [Certificate No.], dated [Date], authorizing deduction of tax at source at the certified rate of [Certificate Rate]% on the gross sale consideration.

2. TAN & FORM 27Q OBLIGATION:
The PURCHASER, holding valid TAN No. [Purchaser TAN], undertakes to deduct TDS strictly in terms of the said Section 197 Certificate, deposit the same with the Central Government via Challan ITNS 281 within statutory timelines, file quarterly TDS Return in Form 27Q, and deliver digitally signed TDS Certificate in Form 16A to the VENDOR within 15 days of deposit.

3. NRO ACCOUNT CONSIDERATION & FEMA REPATRIATION:
The entire balance sale consideration shall be paid by the PURCHASER exclusively into the VENDOR's Non-Resident Ordinary (NRO) Bank Account No. [Account No.] maintained with [Bank Name, Branch, IFSC Code], enabling outward remittance under the RBI USD 1,000,000 Scheme read with Form 15CA and Form 15CB."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyForm13Checklist = () => {
    const checklistText = `NRI FORM 13 LOWER TDS APPLICATION CHECKLIST (TRACES PORTAL - SECTION 197):
1. Executed Agreement for Sale / Memorandum of Understanding (MoU) with the Purchaser.
2. Chain of Title Documents: Previous Owner's Registered Purchase Deed + Registered Will / Probate Copy / Legal Heir Certificate.
3. Revenue Mutation Record / Property Card / Khata Extract reflecting the NRI vendor's name.
4. Valuation Report as on April 1, 2001 by Government Registered Valuer (if property acquired before April 1, 2001) + SRO Circle Rate Certificate.
5. Capital Gains Computation Sheet detailing Section 49(1) deemed cost, indexation (if applicable), and Section 54 / 54EC reinvestments.
6. Proof of Section 54 / 54EC Reinvestment (Advance payment receipt for new house / REC-NHAI bond allocation receipt).
7. Active PAN Card of NRI Seller, Valid Indian Passport Copy, Overseas Address Proof, and NRO Bank Account Cancelled Cheque.
8. Purchaser's Full Legal Name, Residential Address, Active PAN Card, and TAN Number (Tax Deduction and Collection Account Number).
9. Copy of Income Tax Returns (ITR) filed in India for the preceding 3 Assessment Years (or affidavit stating nil Indian income).
10. Valid TRACES Portal Login credentials of the NRI Seller to file Form 13 electronically.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedForm13Checklist(true);
    setTimeout(() => setCopiedForm13Checklist(false), 3000);
  };

  const copy15CAChecklist = () => {
    const checklistText = `NRI OUTWARD REPATRIATION CHECKLIST (FORM 15CA, FORM 15CB & AD BANK):
1. Form 15CB: Certificate issued and digitally signed by an independent practicing Chartered Accountant on the Income Tax Portal.
2. Form 15CA (Part C): Electronic undertaking submitted by the NRI remitter on the Income Tax Portal referencing the Form 15CB acknowledgement.
3. Form A2: FEMA Application-cum-Declaration for outward remittance under the USD 1 Million Scheme.
4. Registered Sale Deed / Conveyance Deed executed and registered with the Sub-Registrar of Assurances.
5. Complete Source of Title: Registered Will / Probate / Succession Certificate showing lawful inheritance of the property.
6. Proof of Tax Payment: Form 16A TDS Certificate issued by the Purchaser or Advance Tax Challan receipt (Challan 280).
7. NRO Bank Statement demonstrating credit of the net sale consideration from the purchaser.
8. FEMA Declaration confirming that total remittances from all NRO accounts in India during the current Financial Year do not exceed USD 1,000,000.
9. Outward Remittance Form with beneficiary overseas bank details (SWIFT Code, IBAN / Routing Number, Beneficiary Account Name).`;
    navigator.clipboard.writeText(checklistText);
    setCopied15CAChecklist(true);
    setTimeout(() => setCopied15CAChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Brand Identity)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INCOME TAX ACT SS. 195, 197 &bull; FEMA USD 1M NRO REPATRIATION</span>
          </div>

          {/* Strict Single H1 Tag (Length 57 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            NRI Inherited Property Sale TDS &amp; Repatriation Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Stop buyers from deducting <strong>14.95% to 23.92% TDS on your gross sale price</strong>.
            Calculate exact <strong>Form 13 Lower TDS savings</strong>, unlock locked cash flow, and
            estimate net remittance under the <strong>RBI USD 1 Million NRO Scheme</strong> via Form 15CA &amp; 15CB.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate NRI TDS &amp; Cash Flow</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#C65378]" />
              <span>Consult Cross-Border Advocate</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 195 TDS</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                14.95% - 23.92% GROSS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">Form 13 Relief</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX ON ACTUAL GAIN ONLY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">USD 1,000,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ANNUAL RBI NRO REPATRIATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5F7E75]">Form 15CA/15CB</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY BANK CLEARANCE
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
                <span>Cross-Border Legal Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 49(1), 112, 195 &amp; 197 of the Income Tax Act, 1961, read with
                FEMA (Remittance of Assets) Regulations, 2016, and RBI Master Direction on Remittance
                Facilities for Non-Resident Indians.
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
                <span>EXECUTIVE BRIEF: NRI PROPERTY SALE TAX &amp; REMITTANCE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 195 Default Trap:</strong> Without a Form 13 certificate, buyers are
                    legally mandated to withhold 14.95% to 23.92% TDS on the <em>entire gross sale price</em>,
                    blocking tens of lakhs in liquid capital for 12 to 24 months.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Form 13 Lower TDS Salvation:</strong> Applying for a Section 197 Certificate
                    via TRACES restricts TDS strictly to your actual capital gains tax liability,
                    instantly preserving your liquidity at the time of sale.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>FEMA USD 1 Million Remittance:</strong> Under RBI regulations, every NRI or OCI
                    can repatriate up to USD 1,000,000 per financial year from their NRO account with Form
                    15CA and Form 15CB certification.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Multi-Heir Sibling Multiplier:</strong> Each legal heir has an independent PAN
                    and separate USD 1M annual quota. Three NRI siblings can legally repatriate up to USD
                    3,000,000 in a single financial year without prior RBI approval.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: NRI Property Sale TDS &amp; Repatriation
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Selling real estate in India as a Non-Resident Indian (NRI) or Overseas Citizen of India
                  (OCI) involves two strictly separated statutory regimes: <strong>The Income Tax Act, 1961</strong> (governing
                  capital gains tax and mandatory withholding) and <strong>The Foreign Exchange Management Act, 1999 (FEMA)</strong> (governing
                  cross-border fund repatriation).
                </p>
                <p>
                  Under <strong>Section 195</strong> of the Income Tax Act, any resident purchasing immovable
                  property from a non-resident must deduct Tax Deducted at Source (TDS). Crucially, unlike
                  domestic transactions between resident Indians where the buyer deducts 1% TDS under Section
                  194-IA using PAN, purchases from an NRI require the buyer to obtain a <strong>Tax Deduction and
                  Collection Account Number (TAN)</strong> and file quarterly returns in Form 27Q.
                </p>
                <p>
                  Because Section 195 penalizes buyers with personal liability and interest under Section 201 for
                  under-deduction, standard practice among buyers and their CAs is to deduct tax on the <strong>total
                  gross sale consideration</strong>. To protect sellers from having massive capital blocked, Parliament
                  enacted <strong>Section 197</strong>, enabling NRIs to apply for a Lower or Nil Deduction
                  Certificate in Form 13 before registering the sale deed.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE FINANCIAL TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive NRI Property Sale TDS &amp; Cash Flow Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Calculate your Section 195 TDS on gross sale value, compare it against Form 13 Lower TDS on
                actual capital gains, and estimate your net foreign remittance under the RBI USD 1 Million limit.
              </p>

              {/* Calculator Container Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Tab Switcher */}
                <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100">
                  <button
                    onClick={() => setActiveTab("tds")}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "tds"
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Calculator className="w-4 h-4" />
                    <span>TDS &amp; Cash-Flow Blockage</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("repatriation")}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "repatriation"
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>USD 1M Repatriation &amp; Forex</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("coheirs")}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === "coheirs"
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Multi-Heir Sibling Split</span>
                  </button>
                </div>

                {/* TAB 1: TDS & CASH-FLOW BLOCKAGE */}
                {activeTab === "tds" && (
                  <div className="space-y-6">
                    {/* Top Controls: Era & Holding Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                      {/* Holding Period */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>Holding Period</span>
                        </label>
                        <select
                          value={holdingType}
                          onChange={(e) => setHoldingType(e.target.value as "long_term" | "short_term")}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] focus:bg-white font-medium"
                        >
                          <option value="long_term">Long-Term (&gt; 24 Months) - 12.5% LTCG</option>
                          <option value="short_term">Short-Term (&le; 24 Months) - 30% Slab MMR</option>
                        </select>
                      </div>

                      {/* Acquisition Era */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>Acquisition Era (Parent / Deceased)</span>
                        </label>
                        <select
                          value={acquisitionEra}
                          onChange={(e) =>
                            setAcquisitionEra(e.target.value as "pre_2001" | "between_2001_and_2024" | "post_july_2024")
                          }
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] focus:bg-white font-medium"
                        >
                          <option value="between_2001_and_2024">Between 2001 and July 2024</option>
                          <option value="pre_2001">Before April 1, 2001 (FMV Option)</option>
                          <option value="post_july_2024">After July 23, 2024</option>
                        </select>
                      </div>

                      {/* LTCG Rate Option */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Percent className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>LTCG Computation Regime</span>
                        </label>
                        <select
                          value={ltcgRateOption}
                          disabled={holdingType === "short_term"}
                          onChange={(e) => setLtcgRateOption(e.target.value as "12.5_flat" | "20_index")}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] focus:bg-white font-medium disabled:opacity-50"
                        >
                          <option value="12.5_flat">12.5% Flat Rate (Finance Act 2024)</option>
                          <option value="20_index">20% with Cost Inflation Index (CII)</option>
                        </select>
                      </div>
                    </div>

                    {/* Numeric Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Gross Sale Price */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Gross Sale Consideration (₹)
                          </label>
                          <span className="text-xs font-semibold text-[#C65378]">{formatINR(grossSalePrice)}</span>
                        </div>
                        <input
                          type="number"
                          step="100000"
                          value={grossSalePrice}
                          onChange={(e) => setGrossSalePrice(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Agreed price in Sale Deed / Agreement for Sale.</p>
                      </div>

                      {/* Circle Rate / Ready Reckoner Value */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Stamp Duty Circle Rate (₹)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(circleRateValue)}</span>
                        </div>
                        <input
                          type="number"
                          step="100000"
                          value={circleRateValue}
                          onChange={(e) => setCircleRateValue(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Section 50C check. Safe harbor tolerance is 110%.</p>
                      </div>

                      {/* Original Cost of Acquisition */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            {acquisitionEra === "pre_2001"
                              ? "Original Purchase Cost by Parent (₹)"
                              : "Deemed Cost of Acquisition (₹)"}
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(originalCost)}</span>
                        </div>
                        <input
                          type="number"
                          step="50000"
                          value={originalCost}
                          onChange={(e) => setOriginalCost(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Under Sec 49(1), price paid by original owner who bought it.</p>
                      </div>

                      {/* Year of Acquisition */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Year of Acquisition by Previous Owner
                        </label>
                        <select
                          value={acquisitionYear}
                          disabled={acquisitionEra === "pre_2001"}
                          onChange={(e) => setAcquisitionYear(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-medium disabled:opacity-60"
                        >
                          {Object.keys(CII_TABLE).map((yr) => (
                            <option key={yr} value={yr}>
                              FY {yr} (CII: {CII_TABLE[yr]})
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-slate-500">Indexation traces back to predecessor (CIT v. Manjula J Shah).</p>
                      </div>

                      {/* Pre-2001 Extra Fields */}
                      {acquisitionEra === "pre_2001" && (
                        <>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                Fair Market Value (FMV) on 01-Apr-2001 (₹)
                              </label>
                              <span className="text-xs font-semibold text-slate-600">{formatINR(fmv2001)}</span>
                            </div>
                            <input
                              type="number"
                              step="50000"
                              value={fmv2001}
                              onChange={(e) => setFmv2001(Math.max(0, Number(e.target.value)))}
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                            />
                            <p className="text-[11px] text-slate-500">From Government Approved Valuer Report.</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                Circle Rate on 01-Apr-2001 (₹)
                              </label>
                              <span className="text-xs font-semibold text-slate-600">{formatINR(sdv2001)}</span>
                            </div>
                            <input
                              type="number"
                              step="50000"
                              value={sdv2001}
                              onChange={(e) => setSdv2001(Math.max(0, Number(e.target.value)))}
                              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                            />
                            <p className="text-[11px] text-slate-500">Under Sec 55(2)(b)(ii), FMV cannot exceed 2001 circle rate.</p>
                          </div>
                        </>
                      )}

                      {/* Improvement Cost & Transfer Expenses */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Cost of Improvement / Renovation (₹)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(improvementCost)}</span>
                        </div>
                        <input
                          type="number"
                          step="50000"
                          value={improvementCost}
                          onChange={(e) => setImprovementCost(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Major capital additions with documented invoices.</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Transfer Expenses (Brokerage, Legal, Mutation) (₹)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(transferExpenses)}</span>
                        </div>
                        <input
                          type="number"
                          step="25000"
                          value={transferExpenses}
                          onChange={(e) => setTransferExpenses(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Deductible under Section 48(i) from gross consideration.</p>
                      </div>

                      {/* Section 54 / 54EC Reinvestment Deductions */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Section 54 Reinvestment (New House in India) (₹)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(section54Reinvestment)}</span>
                        </div>
                        <input
                          type="number"
                          step="100000"
                          value={section54Reinvestment}
                          onChange={(e) => setSection54Reinvestment(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Exemption capped at ₹10 Crores under Finance Act 2023.</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Section 54EC Capital Gains Bonds (REC / NHAI) (₹)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">{formatINR(section54ECBonds)}</span>
                        </div>
                        <input
                          type="number"
                          step="50000"
                          value={section54ECBonds}
                          onChange={(e) => setSection54ECBonds(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">
                          Capped at ₹50 Lakhs per legal heir (Max: {formatINR(maxAllowable54EC)} for {numberOfHeirs} heirs).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: USD 1M REPATRIATION & FOREX */}
                {activeTab === "repatriation" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong>FEMA USD 1 Million Scheme (RBI Regulations, 2016):</strong> NRIs and OCIs can remit
                      up to <strong>USD 1,000,000 per financial year (April 1 to March 31)</strong> out of their
                      Non-Resident Ordinary (NRO) bank account balances representing sale proceeds of inherited or
                      self-acquired property.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Currency Selection */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Select Target Repatriation Currency
                        </label>
                        <select
                          value={targetCurrency}
                          onChange={(e) => handleCurrencyChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        >
                          {Object.keys(CURRENCY_RATES).map((code) => (
                            <option key={code} value={code}>
                              {CURRENCY_RATES[code].name} ({CURRENCY_RATES[code].symbol} - {code})
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-slate-500">Destination foreign currency for outward wire.</p>
                      </div>

                      {/* Custom Forex Rate */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Exchange Rate (1 {targetCurrency} = ₹ INR)
                          </label>
                          <span className="text-xs font-semibold text-[#C65378]">₹{customForexRate.toFixed(2)}</span>
                        </div>
                        <input
                          type="number"
                          step="0.05"
                          value={customForexRate}
                          onChange={(e) => setCustomForexRate(Math.max(0.1, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">Adjust to match live Authorized Dealer bank wire card rate.</p>
                      </div>

                      {/* Prior Remittances in current FY */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Prior Remittances in Current FY (in USD)
                          </label>
                          <span className="text-xs font-semibold text-slate-600">
                            {formatCurrency(priorRemittancesUsd, "USD")}
                          </span>
                        </div>
                        <input
                          type="number"
                          step="10000"
                          value={priorRemittancesUsd}
                          onChange={(e) => setPriorRemittancesUsd(Math.max(0, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        />
                        <p className="text-[11px] text-slate-500">
                          Funds already remitted from NRO between April 1 and March 31.
                        </p>
                      </div>

                      {/* Net Sale Proceeds in NRO */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Net Sale Proceeds in NRO Account (₹)
                        </label>
                        <div className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-extrabold text-[#172228]">
                          {formatINR(netNroProceedsWithForm13)} (After Form 13 TDS)
                        </div>
                        <p className="text-[11px] text-slate-500">Automatically synchronized from Tab 1 computations.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: MULTI-HEIR SIBLING SPLIT */}
                {activeTab === "coheirs" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      <strong>Multi-Heir Sibling Advantage under Indian Succession:</strong> Co-owners inheriting
                      property are independent taxpayers under Section 26. Each sibling is entitled to an independent
                      <strong> ₹50 Lakh Section 54EC bond cap</strong> and an independent <strong>USD 1 Million FEMA annual limit</strong>!
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Number of NRI Legal Heirs / Co-Owners
                        </label>
                        <select
                          value={numberOfHeirs}
                          onChange={(e) => setNumberOfHeirs(Math.max(1, Number(e.target.value)))}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C65378] font-bold"
                        >
                          <option value="1">1 Sole Legal Heir (100% Share)</option>
                          <option value="2">2 Siblings / Heirs (50% Share each)</option>
                          <option value="3">3 Siblings / Heirs (33.33% Share each)</option>
                          <option value="4">4 Siblings / Heirs (25% Share each)</option>
                          <option value="5">5 Siblings / Heirs (20% Share each)</option>
                        </select>
                        <p className="text-[11px] text-slate-500">Equal tenancy-in-common assumption.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Aggregate Family FEMA Repatriation Limit
                        </label>
                        <div className="px-3.5 py-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-sm font-extrabold text-emerald-900">
                          {formatCurrency(1000000 * numberOfHeirs, "USD")} (USD {numberOfHeirs} Million Annual Cap)
                        </div>
                        <p className="text-[11px] text-slate-500">Each sibling submits separate Form 15CA/15CB.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =============================================================
                    CALCULATOR RESULTS DASHBOARD (THE CASH-FLOW BLOCKAGE MOAT)
                    ============================================================= */}
                <div className="pt-6 border-t border-slate-200 space-y-6">
                  {/* Hero Metric: Cash-Flow Blockage Saved */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-6 sm:p-7 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#C65378]/25 text-[#fecdd3] text-xs font-bold tracking-wide mb-2 uppercase">
                          <Award className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>Form 13 Liquidity Advantage</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-slate-300">
                          Immediate Cash-Flow Preserved in Your Hands
                        </h3>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1">
                          {formatINR(lockedCashflowSaved)}
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">
                          Difference between buyer&apos;s default Section 195 TDS on gross price vs Section 197 Form 13 TDS.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0 sm:text-right">
                        <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                          <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                            TDS Refund Wait Saved
                          </div>
                          <div className="text-lg font-black text-rose-300">{refundWaitingMonths}</div>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                          <div className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">
                            Certified Form 13 Rate
                          </div>
                          <div className="text-lg font-black text-emerald-400">
                            {form13EffectiveRateOnGross.toFixed(2)}% of Gross
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Side-by-Side Comparison Grid: Default vs Form 13 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Default Sec 195 Card */}
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                          WITHOUT FORM 13 (DEFAULT SEC 195)
                        </span>
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      </div>
                      <div className="text-2xl font-black text-rose-950">{formatINR(defaultGrossTdsWithoutForm13)}</div>
                      <p className="text-xs text-rose-800 leading-relaxed">
                        Buyer deducts {(defaultGrossTdsRate * 100).toFixed(2)}% on FULL ₹{formatINR(grossSalePrice)}.
                        Your money remains frozen with the Income Tax Department until you file ITR and wait for refund.
                      </p>
                      <div className="pt-2 border-t border-rose-200/80 flex justify-between text-xs text-rose-900 font-semibold">
                        <span>Net Inflow at Registration:</span>
                        <span>{formatINR(netNroProceedsWithoutForm13)}</span>
                      </div>
                    </div>

                    {/* With Form 13 Certificate Card */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          WITH FORM 13 CERTIFICATE (SEC 197)
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-2xl font-black text-emerald-950">{formatINR(tdsWithForm13)}</div>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        TDS is restricted strictly to your actual net tax liability on ₹{formatINR(netTaxableGains)} taxable
                        capital gain. Zero excess tax is withheld.
                      </p>
                      <div className="pt-2 border-t border-emerald-200/80 flex justify-between text-xs text-emerald-900 font-semibold">
                        <span>Net Inflow at Registration:</span>
                        <span>{formatINR(netNroProceedsWithForm13)}</span>
                      </div>
                    </div>
                  </div>

                  {/* FEMA Outward Remittance Summary Box */}
                  <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#172228]">
                        <Globe className="w-4 h-4 text-[#C65378]" />
                        <span>FEMA USD 1M OUTWARD REPATRIATION SUMMARY</span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        1 {targetCurrency} = ₹{activeFxRate.toFixed(2)} INR
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-xs text-slate-500 font-semibold">Net NRO Credit</div>
                        <div className="text-sm sm:text-base font-extrabold text-[#172228] mt-0.5">
                          {formatINR(netNroProceedsWithForm13)}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-xs text-slate-500 font-semibold">Forex Remittance</div>
                        <div className="text-sm sm:text-base font-extrabold text-[#C65378] mt-0.5">
                          {formatCurrency(netRemittanceInForeignCurr, targetCurrency)}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-xs text-slate-500 font-semibold">USD Equivalent</div>
                        <div className="text-sm sm:text-base font-extrabold text-[#172228] mt-0.5">
                          {formatCurrency(netRemittanceInUsd, "USD")}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                        <div className="text-xs text-slate-500 font-semibold">Annual Limit Used</div>
                        <div
                          className={`text-sm sm:text-base font-extrabold mt-0.5 ${
                            quotaUtilizationPercent > 100 ? "text-rose-600" : "text-emerald-700"
                          }`}
                        >
                          {quotaUtilizationPercent}% of $1M
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar for USD 1M limit */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>RBI USD 1,000,000 Quota Utilization</span>
                        <span>
                          {formatCurrency(totalUsdRemittedThisYear, "USD")} / $1,000,000
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            quotaUtilizationPercent > 100 ? "bg-rose-500" : "bg-[#C65378]"
                          }`}
                          style={{ width: `${Math.min(100, quotaUtilizationPercent)}%` }}
                        />
                      </div>
                      {excessOverUsdLimit > 0 ? (
                        <p className="text-xs text-rose-600 font-semibold">
                          Alert: Sale proceeds exceed the annual limit by {formatCurrency(excessOverUsdLimit, "USD")}.
                          You can split remittance across March 31 &amp; April 1 or seek prior RBI approval.
                        </p>
                      ) : (
                        <p className="text-xs text-emerald-700 font-medium">
                          Eligible for 100% straight-through bank remittance under Form 15CA/15CB without prior RBI approval.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reset & Print Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleResetCalculator}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Calculator Defaults</span>
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Summary</span>
                      </button>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#C65378] text-white text-xs font-bold hover:bg-[#a33b5c] transition-colors shadow-xs"
                      >
                        <span>Book CA &amp; Advocate Assistance</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>CROSS-BORDER STATUTORY VISUAL GUIDE: NRI PROPERTY TDS &amp; REPATRIATION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Income Tax &amp; FEMA 1999</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1376/768] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/nri-property-sale-tds-repatriation-calculator-og.jpg"
                  alt="NRI Inherited Property Sale TDS &amp; Repatriation Calculator Blueprint - Section 195"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* SECTION 3: GROSS TDS VS FORM 13 CASH FLOW MOAT */}
            <section id="cashflow-blockage-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LIQUIDITY DEFENSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Gross Sale TDS vs Form 13: Cash Flow Blockage Moat
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The fundamental financial mistake committed by Non-Resident Indians when selling property in
                  India is permitting the buyer to deduct tax at source on the <strong>gross sale consideration</strong>.
                  While resident property sellers lose only 1% TDS under Section 194-IA, an NRI selling property
                  faces withholding rates reaching up to <strong>23.92%</strong> on the full contract value.
                </p>
                <p>
                  Consider an NRI who sells an inherited flat in Delhi or Mumbai for ₹3.00 Crores where the
                  indexed cost of acquisition under Section 49(1) is ₹2.20 Crores. The actual long-term capital
                  gain is ₹80 Lakhs, yielding an actual tax liability of approximately ₹11.96 Lakhs. If no Form 13
                  certificate is in place, the buyer will withhold 14.95% on ₹3.00 Crores, deducting <strong>₹44.85
                  Lakhs</strong>.
                </p>
                <p>
                  This creates an immediate <strong>₹32.89 Lakh cash-flow blockage</strong>. Recovering this money
                  requires filing an Indian Income Tax Return (ITR-2), undergoing automated CPC processing, and
                  potentially addressing defective return notices under Section 139(9), locking up capital for 12
                  to 24 months without market interest.
                </p>
              </div>

              {/* Structured Comparison Table 1 */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Feature</th>
                      <th className="py-3.5 px-4 font-bold text-rose-300">Default Sec 195 TDS</th>
                      <th className="py-3.5 px-4 font-bold text-emerald-300">Sec 197 Form 13 Certificate</th>
                      <th className="py-3.5 px-4 font-bold text-slate-300">Resident Sec 194-IA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Tax Base</td>
                      <td className="py-3 px-4 text-rose-700 font-bold">Gross Sale Consideration (100%)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Actual Capital Gains Only</td>
                      <td className="py-3 px-4 text-slate-600">Gross Consideration (&ge; ₹50L)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Effective TDS Rate</td>
                      <td className="py-3 px-4 text-rose-700 font-bold">14.95% to 23.92%</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">0% to Actual Tax % (e.g. 3-6%)</td>
                      <td className="py-3 px-4 text-slate-600">Strictly 1.00%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Buyer TAN Mandate</td>
                      <td className="py-3 px-4 font-semibold text-rose-700">Mandatory (Form 49B)</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">Mandatory (Form 49B)</td>
                      <td className="py-3 px-4 text-slate-600">Not Required (PAN-based)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">TDS Return Form</td>
                      <td className="py-3 px-4">Form 27Q (Quarterly)</td>
                      <td className="py-3 px-4">Form 27Q (Quarterly)</td>
                      <td className="py-3 px-4">Form 26QB (Challan-cum-return)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Cash Flow Impact</td>
                      <td className="py-3 px-4 text-rose-700 font-bold">Massive Blockage (₹20L - ₹60L)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Zero Excess Blockage</td>
                      <td className="py-3 px-4 text-slate-600">Negligible</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">Refund Wait Time</td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">12 to 24 Months via ITR</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">0 Months (Funds In Hand)</td>
                      <td className="py-3 px-4 text-slate-600">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: SECTION 195 TDS RATES */}
            <section id="section-195-tds-rates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Percent className="w-4 h-4" />
                <span>STATUTORY RATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 195 TDS Rates: Long Term vs Short Term Gains
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under the Income Tax Act, the rate of withholding tax under Section 195 depends on whether
                  the immovable property is classified as a <strong>Long-Term Capital Asset</strong> or a <strong>Short-Term
                  Capital Asset</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                      <span>Long-Term Capital Asset (&gt; 24 Months)</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Holding period includes the tenure of the previous owner under Section 2(42A).
                      Under Finance (No. 2) Act 2024, the base rate is 12.5% (or 20% under grandfathered indexation
                      regimes). With surcharge (10% or 15%) and 4% Health &amp; Education Cess, the effective
                      withholding rate ranges between <strong>14.30% and 23.92%</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Short-Term Capital Asset (&le; 24 Months)</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the aggregated holding period is 24 months or less, gains are taxed at the Maximum
                      Marginal Rate (MMR) of 30%. With applicable surcharge (up to 15%) and 4% Cess, the default
                      withholding rate stands between <strong>31.20% and 35.88%</strong> of the gross consideration.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Mid-Article Contextual Tool Link:</strong> If you are selling an inherited property and
                  need to examine whether the 12.5% flat rate or 20% indexation grandfathering yields higher savings,
                  run your numbers on our companion{" "}
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="font-bold text-[#C65378] hover:underline"
                  >
                    Capital Gains Tax on Inherited Property Calculator India
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION 5: FORM 13 LOWER TDS PROCESS */}
            <section id="form-13-lower-tds-process" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Form 13 Lower TDS Certificate: TRACES Filing SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Obtaining a Lower Deduction Certificate under Section 197 is a fully digital process on the
                  Income Tax Department&apos;s <strong>TRACES (TDS Reconciliation Analysis and Correction Enabling
                  System)</strong> portal. Follow this standard operating procedure:
                </p>
                <ol className="space-y-3 list-decimal list-inside text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="leading-relaxed">
                    <strong>Execute Agreement for Sale (MoU):</strong> Settle commercial terms, sale price,
                    payment milestones, and buyer TAN details. A formal contract is mandatory to trigger Form 13.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Obtain Buyer TAN:</strong> The buyer must apply for a TAN in Form 49B. The application
                    on TRACES cannot proceed without the purchaser&apos;s TAN number.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Compile Statutory Title &amp; Cost Dossier:</strong> Gather the previous owner&apos;s registered
                    sale deed, mutation extract, probated Will or Legal Heir Certificate, and pre-2001 valuation report.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Submit Form 13 Online:</strong> Log into TRACES under the NRI seller&apos;s PAN, select
                    &ldquo;Request for Form 13&rdquo;, upload the capital gains computation sheet, and furnish Section 54/54EC proofs.
                  </li>
                  <li className="leading-relaxed">
                    <strong>International Taxation Ward Processing:</strong> The Assessing Officer (AO) reviews
                    the calculations, issues clarification queries if needed, and approves the certificate within 21 to 45 days.
                  </li>
                  <li className="leading-relaxed">
                    <strong>Certificate Issuance &amp; Deed Execution:</strong> The digital certificate specifying the
                    lower TDS percentage is downloaded. The buyer enters this certificate number into Challan ITNS 281
                    and deducts only the certified rate.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 6: RBI USD 1 MILLION SCHEME */}
            <section id="rbi-repatriation-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>FEMA FRAMEWORK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. RBI USD 1 Million Scheme: FEMA Repatriation Limits
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Once the property is sold and net proceeds are credited into your <strong>Non-Resident Ordinary (NRO)
                  bank account</strong>, cross-border remittance to your overseas bank account or Non-Resident External
                  (NRE) account is governed by the <strong>Foreign Exchange Management (Remittance of Assets) Regulations,
                  2016</strong> (Notification No. FEMA 13(R)/2016-RB).
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <h3 className="font-bold text-[#172228] text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Key Rules for Inherited Property Repatriation:</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>No Lock-In Period:</strong> Unlike real estate acquired via foreign exchange where
                        historical restrictions applied, inherited property sale proceeds can be remitted immediately
                        upon sale.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>No Property Cap:</strong> Under Regulation 4(2) of FEMA 13(R), there is no limit on
                        the number of inherited residential or commercial properties whose sale proceeds may be repatriated.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>USD 1,000,000 Annual Ceiling:</strong> An NRI or OCI can remit up to USD 1 Million
                        per financial year (April 1 to March 31). This ceiling includes all balances held in NRO accounts.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Two-Year March/April Splitting Strategy:</strong> If your net proceeds equal USD 1.8
                        Million, you can legally remit USD 900,000 in March (FY 2024-25) and the remaining USD 900,000
                        in April (FY 2025-26) without requiring special RBI permission.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: FORM 15CA & 15CB SOP */}
            <section id="form-15ca-15cb-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Send className="w-4 h-4" />
                <span>REPATRIATION FILINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Form 15CA &amp; 15CB Protocol: Outward Remittance SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To wire funds from an Indian NRO account to an overseas bank account, the Authorized Dealer (AD)
                  bank requires statutory tax clearance under Section 195(6) of the Income Tax Act:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm">Form 15CB (Chartered Accountant Certificate)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Form 15CB is an authoritative certificate issued by an independent Chartered Accountant. The
                      CA examines the sale deed, cost basis, Section 197 certificate or tax deposit challans, and
                      certifies that all Indian taxes have been fully satisfied.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <h3 className="font-bold text-[#172228] text-sm">Form 15CA (Part C - Remitter Undertaking)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After obtaining Form 15CB, the NRI remitter logs onto the Income Tax e-filing portal to submit
                      Form 15CA (Part C). This links the CA certification number, beneficiary bank SWIFT details, and
                      generates an official acknowledgement for the remitting bank.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: NRO TO NRE ACCOUNT TRANSFER */}
            <section id="nro-to-nre-transfer-steps" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CreditCard className="w-4 h-4" />
                <span>BANKING MECHANICS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. NRO to NRE Account Transfer: Step-by-Step Pathway
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many NRIs prefer transferring property sale proceeds from their NRO account to their <strong>Non-Resident
                  External (NRE) account</strong> rather than wiring funds directly abroad. Funds held in an NRE account
                  offer significant advantages:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                  <li>
                    <strong>100% Tax-Free Interest:</strong> Interest earned on NRE fixed deposits is completely exempt
                    from Indian income tax under Section 10(4)(ii).
                  </li>
                  <li>
                    <strong>Freely Repatriable Anytime:</strong> Once funds enter an NRE account, principal and interest
                    can be repatriated to any foreign account in any currency without recurring 15CA/15CB filings.
                  </li>
                  <li>
                    <strong>Same Documentation:</strong> The transfer from NRO to NRE is legally treated as an outward
                    remittance under the USD 1 Million Scheme, requiring the same Form 15CA, Form 15CB, and Form A2.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: DTAA FOREIGN TAX CREDIT */}
            <section id="dtaa-foreign-tax-credit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>CROSS-BORDER TAXATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Cross-Border Tax Treaties: DTAA Foreign Tax Credit
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical concern for NRIs residing in the United States, United Kingdom, Canada, or Australia
                  is avoiding <strong>double taxation</strong> on the same capital gain. Under international tax law
                  and bilateral Double Taxation Avoidance Agreements (DTAA):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs font-bold text-[#172228]">United States (IRS)</div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Report capital gains on Schedule D (Form 1040). Claim Indian TDS as a Foreign Tax Credit via
                      <strong> IRS Form 1116</strong> to offset federal income tax.
                    </p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs font-bold text-[#172228]">United Kingdom (HMRC)</div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Declare gains on the Capital Gains Tax summary (SA108). Claim Foreign Tax Credit Relief (FTCR)
                      under Article 24 of the India-UK Tax Treaty.
                    </p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs font-bold text-[#172228]">Canada (CRA)</div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Report on Schedule 3. Claim foreign taxes paid in India using <strong>Form T2209</strong> (Federal
                      Foreign Tax Credits) under Article 23 of the treaty.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL NRI CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical NRI Case Studies: USA, UK, UAE &amp; Canada
              </h3>
              <div className="space-y-4">
                {/* Case 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#172228] text-sm">
                      Case 1: California NRI Selling Bangalore Ancestral Home
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Saved ₹37.4 Lakhs Blocked TDS
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An NRI tech executive in San Jose sold an inherited bungalow in Indiranagar,
                    Bangalore for ₹4.20 Crores. The deceased father bought it in 2004 for ₹45 Lakhs. The buyer proposed
                    deducting 14.95% TDS on ₹4.20 Crores (₹62.79 Lakhs).
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Solution:</strong> AMA Legal Solutions filed Form 13 on TRACES claiming Section 49(1) deemed
                    cost and ₹50 Lakhs Section 54EC bond investment. The AO issued a Lower TDS certificate at 6.04%,
                    reducing withholding to ₹25.36 Lakhs and immediately saving ₹37.43 Lakhs in blocked liquidity.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#172228] text-sm">
                      Case 2: London Doctor Splitting £1.4M Remittance Over Two FYs
                    </h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      Zero RBI Delays
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An NHS physician in London inherited a commercial building in South Delhi sold
                    for ₹15.00 Crores (approx £1.38 Million / $1.73 Million USD), exceeding the annual USD 1M FEMA ceiling.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Solution:</strong> We structured the transaction with two scheduled wire tranches: USD 900,000
                    remitted on March 26 (FY 2024-25) and the remaining USD 830,000 on April 4 (FY 2025-26). Both transfers
                    went through Authorized Dealer bank clearance under Form 15CA/15CB without needing prior RBI clearance.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#172228] text-sm">
                      Case 3: Dubai NRI &amp; Sister Jointly Selling Mumbai Apartment
                    </h3>
                    <span className="text-xs font-bold text-[#C65378] bg-rose-50 px-2.5 py-0.5 rounded-full">
                      USD 2M Family Headroom
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Two siblings residing in Dubai jointly inherited an apartment in Bandra West,
                    Mumbai sold for ₹8.50 Crores. They needed to remit proceeds to their respective UAE accounts.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Solution:</strong> By establishing equal 50% tenancy-in-common title through their registered
                    Will probate, each sibling utilized their separate PAN to invest ₹50 Lakhs in Section 54EC bonds (total
                    ₹1 Crore tax-free) and claimed separate USD 1M annual remittance limits (USD 2 Million aggregate).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FORM 13 CHECKLIST & LEGAL CLAUSES */}
            <section id="checklist-and-legal-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Form 13 Document Checklist &amp; Sale Deed Recital
              </h3>

              {/* Template Box 1: Sale Deed Recital */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#172228] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Special NRI Vendor &amp; Section 195/197 Sale Deed Clause</span>
                  </span>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
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
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-mono text-slate-800 leading-relaxed overflow-x-auto max-h-56">
                  {`"AND WHEREAS the VENDOR is an Indian citizen residing outside India and holds the status of a Non-Resident Indian (NRI) under Section 6 of the Income Tax Act, 1961, and FEMA, 1999.

AND WHEREAS the VENDOR acquired title by testamentary succession under registered Will dated [Date] (Probated vide Order dated [Date] by the Hon'ble [Court]) / intestate inheritance under the Hindu Succession Act, 1956.

1. SECTION 195/197 TDS COMPLIANCE:
The PURCHASER acknowledges that the VENDOR has obtained a valid Lower Deduction Certificate under Section 197 from the Assessing Officer, International Taxation Ward, bearing No. [Cert No.] dated [Date], authorizing TDS at [Rate]% on gross consideration.

2. TAN & FORM 27Q OBLIGATION:
The PURCHASER (TAN: [Purchaser TAN]) undertakes to deduct TDS strictly as per the Section 197 Certificate, deposit via Challan ITNS 281 within statutory timelines, file Form 27Q, and furnish Form 16A TDS Certificate within 15 days."`}
                </div>
              </div>

              {/* Template Box 2: Form 13 Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#172228] uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Form 13 Lower TDS TRACES Application Checklist</span>
                  </span>
                  <button
                    onClick={copyForm13Checklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedForm13Checklist ? (
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
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Agreement for Sale / MoU with purchaser showing consideration and payment schedule</li>
                  <li>Title Chain: Previous owner&apos;s registered purchase deed + registered Will / Probate copy</li>
                  <li>Revenue Mutation Record / Property Card / Khata Extract reflecting the NRI&apos;s name</li>
                  <li>April 1, 2001 Valuation Report from Government Valuer + SRO Circle Rate certificate (if pre-2001)</li>
                  <li>Section 54 / 54EC Reinvestment Proofs (advance receipt or REC-NHAI application)</li>
                  <li>Purchaser&apos;s active TAN number, PAN card, and residential address details</li>
                </ul>
              </div>

              {/* Template Box 3: Form 15CA / 15CB Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#172228] uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-[#C65378]" />
                    <span>Form 15CA &amp; 15CB Outward Remittance Checklist</span>
                  </span>
                  <button
                    onClick={copy15CAChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copied15CAChecklist ? (
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
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Form 15CB signed digitally by practicing Chartered Accountant on Income Tax portal</li>
                  <li>Form 15CA (Part C) submitted online by NRI remitter quoting Form 15CB ack number</li>
                  <li>Registered Conveyance Deed duly executed and stamped with Sub-Registrar</li>
                  <li>Form 16A TDS Certificate issued by buyer or Advance Tax payment receipt</li>
                  <li>Form A2 (FEMA Outward Remittance application) and source of funds declaration</li>
                </ul>
              </div>
            </section>

            {/* SECTION 12: CROSS-BORDER LEGAL PROFILE */}
            <section id="cross-border-legal-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Cross-Border Legal Advisory: AMA Legal Solutions
              </h3>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-xl shrink-0">
                    AMA
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172228]">AMA Legal Solutions &bull; Cross-Border Practice</h3>
                    <p className="text-xs text-slate-500">
                      Headed by Dr. Rohit Srivastava &amp; Adv. Anant Sharma &bull; New Delhi &bull; Pan-India SRO Representation
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  AMA Legal Solutions provides end-to-end representation for Non-Resident Indians across 40+ countries.
                  Our team coordinates title search verification, Sub-Registrar mutation, Section 197 Form 13 Lower TDS
                  applications before International Taxation Wards, and outward remittances under Form 15CA &amp; 15CB.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Schedule Advocate &amp; CA Consultation</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>COMMONLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: NRI Property TDS &amp; FEMA
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
                <span>OFFICIAL STATUTES &amp; PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Authorities &amp; Official Indian Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.incometax.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#172228]">Income Tax Department of India</div>
                    <div className="text-[11px] text-slate-500">e-Filing Portal for Form 15CA &amp; ITR</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.tdscpc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#172228]">TRACES Portal (TDS CPC)</div>
                    <div className="text-[11px] text-slate-500">Form 13 Lower TDS Online Application</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#172228]">Reserve Bank of India (RBI)</div>
                    <div className="text-[11px] text-slate-500">FEMA Master Direction &bull; USD 1M Scheme</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <Link
                  href="/services/nri-will-india"
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#C65378]">NRI Property Sale Service</div>
                    <div className="text-[11px] text-slate-500">End-to-End Legal &amp; CA Remittance Desk</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C65378]" />
                </Link>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONSULTATION & ACTION CARD
              ===================================================================== */}
          <aside className="sticky top-24 space-y-4">
            {/* Consultation Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#C65378]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-[#172228]">
                    Need Legal or CA Assistance?
                  </div>
                  <div className="text-[11px] text-slate-500">Cross-Border Tax Advisory</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Applying for a Section 197 Lower TDS Certificate (Form 13) or remitting proceeds via Form 15CA &amp; 15CB?
                Our cross-border advocates and chartered accountants represent clients before International Taxation Wards.
              </p>

              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-extrabold shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>

            {/* Will Drafting CTA Card */}
            <div className="bg-gradient-to-br from-[#172228] to-slate-900 rounded-2xl p-5 text-white shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-rose-300 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>PROTECT INHERITANCE</span>
              </div>
              <h4 className="text-sm font-bold text-white">Draft an NRI Will for Your Indian Real Estate</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ensure seamless future transmission without probate delays or title disputes across international borders.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-[#172228] hover:bg-slate-100 text-xs font-extrabold transition-transform hover:-translate-y-0.5"
              >
                <span>Draft Legally Valid Will</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
              </button>
            </div>

            {/* Why WillDrafting Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="text-xs font-bold text-[#172228] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>Why WillDrafting &bull; AMA Legal</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Licensed Supreme Court &amp; High Court Advocates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>In-House Cross-Border CA &amp; FEMA Practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Over 1,200+ Cross-Border Estates Resolved</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
