"use client";

import React, { useState, useMemo } from "react";
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
  Layers,
  Calendar,
  AlertCircle,
  FileSignature,
} from "lucide-react";

interface StateRule {
  id: string;
  name: string;
  shortName: string;
  courtName: string;
  rateDescription: string;
  capAmount: number | null;
  citationCost: number;
  collectorValuationCost: number;
  registryMiscCost: number;
  uncontestedMonthsMin: number;
  uncontestedMonthsMax: number;
  contestedYearsMin: number;
  contestedYearsMax: number;
  isPresidentialMandatory: boolean;
  statutoryBasis: string;
  calculateFee: (netValue: number) => { courtFee: number; capApplied: boolean; uncappedFee: number };
}

const STATE_RULES: Record<string, StateRule> = {
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra (Mumbai & District Courts)",
    shortName: "Maharashtra",
    courtName: "Bombay High Court (Original Side) / District Courts",
    rateDescription: "Sliding scale: 2% to 7.5% capped at ₹75,000",
    capAmount: 75000,
    citationCost: 25000,
    collectorValuationCost: 8000,
    registryMiscCost: 7000,
    uncontestedMonthsMin: 8,
    uncontestedMonthsMax: 14,
    contestedYearsMin: 2.5,
    contestedYearsMax: 5.0,
    isPresidentialMandatory: true,
    statutoryBasis: "Bombay Court Fees Act, 1959 Schedule I Art. 11 (Amended by Act 34 of 1994)",
    calculateFee: (netValue: number) => {
      let raw = 0;
      if (netValue <= 50000) {
        raw = netValue * 0.02;
      } else if (netValue <= 200000) {
        raw = 1000 + (netValue - 50000) * 0.04;
      } else if (netValue <= 300000) {
        raw = 7000 + (netValue - 200000) * 0.06;
      } else {
        raw = 13000 + (netValue - 300000) * 0.075;
      }
      const cap = 75000;
      const capApplied = raw > cap;
      return {
        courtFee: Math.round(capApplied ? cap : raw),
        capApplied,
        uncappedFee: Math.round(raw),
      };
    },
  },
  delhi: {
    id: "delhi",
    name: "Delhi NCR (Delhi High Court & District Courts)",
    shortName: "Delhi NCR",
    courtName: "Delhi High Court / Tis Hazari / Saket / Rohini / Dwarka",
    rateDescription: "Flat 4% ad-valorem above ₹50,000 (No statutory cap)",
    capAmount: null,
    citationCost: 20000,
    collectorValuationCost: 10000,
    registryMiscCost: 8000,
    uncontestedMonthsMin: 7,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Court Fees Act, 1870 as applicable to NCT of Delhi, Schedule I Art. 11",
    calculateFee: (netValue: number) => {
      let raw = 0;
      if (netValue <= 1000) {
        raw = 0;
      } else if (netValue <= 10000) {
        raw = netValue * 0.025;
      } else if (netValue <= 50000) {
        raw = 250 + (netValue - 10000) * 0.03;
      } else {
        raw = netValue * 0.04;
      }
      return {
        courtFee: Math.round(raw),
        capApplied: false,
        uncappedFee: Math.round(raw),
      };
    },
  },
  west_bengal: {
    id: "west_bengal",
    name: "West Bengal (Kolkata High Court & District Courts)",
    shortName: "West Bengal",
    courtName: "Calcutta High Court (Original Side) / District Courts",
    rateDescription: "Sliding scale: Up to 5.5% ad-valorem (Uncapped)",
    capAmount: null,
    citationCost: 24000,
    collectorValuationCost: 10000,
    registryMiscCost: 8000,
    uncontestedMonthsMin: 9,
    uncontestedMonthsMax: 16,
    contestedYearsMin: 2.5,
    contestedYearsMax: 5.5,
    isPresidentialMandatory: true,
    statutoryBasis: "West Bengal Court Fees Act, 1970 Schedule I Art. 10 & 11",
    calculateFee: (netValue: number) => {
      let raw = 0;
      if (netValue <= 10000) {
        raw = 0;
      } else if (netValue <= 50000) {
        raw = (netValue - 10000) * 0.02;
      } else if (netValue <= 100000) {
        raw = 800 + (netValue - 50000) * 0.03;
      } else if (netValue <= 250000) {
        raw = 2300 + (netValue - 100000) * 0.04;
      } else if (netValue <= 500000) {
        raw = 8300 + (netValue - 250000) * 0.05;
      } else {
        raw = 20800 + (netValue - 500000) * 0.055;
      }
      return {
        courtFee: Math.round(raw),
        capApplied: false,
        uncappedFee: Math.round(raw),
      };
    },
  },
  tamil_nadu: {
    id: "tamil_nadu",
    name: "Tamil Nadu (Madras High Court & District Courts)",
    shortName: "Tamil Nadu",
    courtName: "Madras High Court (Original Side) / City Civil Court Chennai",
    rateDescription: "3% ad-valorem (Under TN Court Fees Act 1955 Art. 11)",
    capAmount: 25000,
    citationCost: 18000,
    collectorValuationCost: 8000,
    registryMiscCost: 6000,
    uncontestedMonthsMin: 8,
    uncontestedMonthsMax: 14,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.5,
    isPresidentialMandatory: true,
    statutoryBasis: "Tamil Nadu Court Fees and Suits Valuation Act, 1955 Schedule I Art. 11",
    calculateFee: (netValue: number) => {
      const raw = netValue > 1000 ? netValue * 0.03 : 0;
      // In TN, summary probate has a statutory cap of ₹25,000; general testamentary may be 3%
      const cap = 25000;
      const capApplied = raw > cap;
      return {
        courtFee: Math.round(capApplied ? cap : raw),
        capApplied,
        uncappedFee: Math.round(raw),
      };
    },
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka (Bengaluru City Civil & District Courts)",
    shortName: "Karnataka",
    courtName: "City Civil Court Bengaluru / District & Sessions Courts",
    rateDescription: "Sliding scale: Up to 5% to 6% ad-valorem (Uncapped)",
    capAmount: null,
    citationCost: 18000,
    collectorValuationCost: 8000,
    registryMiscCost: 7000,
    uncontestedMonthsMin: 6,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Karnataka Court Fees and Suits Valuation Act, 1958 Schedule I Art. 11",
    calculateFee: (netValue: number) => {
      let raw = 0;
      if (netValue <= 15000) {
        raw = 0;
      } else if (netValue <= 50000) {
        raw = (netValue - 15000) * 0.025;
      } else if (netValue <= 100000) {
        raw = 875 + (netValue - 50000) * 0.035;
      } else if (netValue <= 500000) {
        raw = 2625 + (netValue - 100000) * 0.05;
      } else {
        raw = 22625 + (netValue - 500000) * 0.055;
      }
      return {
        courtFee: Math.round(raw),
        capApplied: false,
        uncappedFee: Math.round(raw),
      };
    },
  },
  telangana: {
    id: "telangana",
    name: "Telangana & Andhra Pradesh (Hyderabad Civil Courts)",
    shortName: "Telangana",
    courtName: "City Civil Court Hyderabad / Secunderabad / District Courts",
    rateDescription: "2% to 3.5% ad-valorem rate",
    capAmount: null,
    citationCost: 16000,
    collectorValuationCost: 7000,
    registryMiscCost: 6000,
    uncontestedMonthsMin: 6,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Telangana Court Fees and Suits Valuation Act, 1956 Art. 11",
    calculateFee: (netValue: number) => {
      const raw = netValue * 0.03;
      return {
        courtFee: Math.round(raw),
        capApplied: false,
        uncappedFee: Math.round(raw),
      };
    },
  },
  uttar_pradesh: {
    id: "uttar_pradesh",
    name: "Uttar Pradesh (Lucknow, Noida, Kanpur, Prayagraj)",
    shortName: "Uttar Pradesh",
    courtName: "District & Sessions Courts / High Court of Judicature at Allahabad",
    rateDescription: "Sliding scale: 2.5% to 3.75% with administrative caps",
    capAmount: 50000,
    citationCost: 15000,
    collectorValuationCost: 7000,
    registryMiscCost: 5000,
    uncontestedMonthsMin: 6,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Court Fees Act, 1870 as amended in Uttar Pradesh",
    calculateFee: (netValue: number) => {
      const raw = netValue * 0.0325;
      const cap = 50000;
      const capApplied = raw > cap;
      return {
        courtFee: Math.round(capApplied ? cap : raw),
        capApplied,
        uncappedFee: Math.round(raw),
      };
    },
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat (Ahmedabad Civil Court & District Courts)",
    shortName: "Gujarat",
    courtName: "City Civil Court Ahmedabad / District Courts",
    rateDescription: "Sliding scale: 2% to 6%, statutory cap ₹75,000",
    capAmount: 75000,
    citationCost: 15000,
    collectorValuationCost: 7000,
    registryMiscCost: 6000,
    uncontestedMonthsMin: 6,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Gujarat Court Fees Act, 2004 Schedule I Art. 11",
    calculateFee: (netValue: number) => {
      const raw = netValue * 0.04;
      const cap = 75000;
      const capApplied = raw > cap;
      return {
        courtFee: Math.round(capApplied ? cap : raw),
        capApplied,
        uncappedFee: Math.round(raw),
      };
    },
  },
  other_india: {
    id: "other_india",
    name: "Other Indian States (Central Base Schedule)",
    shortName: "Rest of India",
    courtName: "Respective Principal District & Sessions Court",
    rateDescription: "Standard 3% to 4% ad-valorem schedule",
    capAmount: null,
    citationCost: 15000,
    collectorValuationCost: 7000,
    registryMiscCost: 6000,
    uncontestedMonthsMin: 6,
    uncontestedMonthsMax: 12,
    contestedYearsMin: 2.0,
    contestedYearsMax: 4.0,
    isPresidentialMandatory: false,
    statutoryBasis: "Court Fees Act, 1870 (Central Act 7 of 1870) Schedule I Art. 11",
    calculateFee: (netValue: number) => {
      const raw = netValue * 0.035;
      return {
        courtFee: Math.round(raw),
        capApplied: false,
        uncappedFee: Math.round(raw),
      };
    },
  },
};

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. What is Probate Court Fee?" },
  { id: "interactive-calculator", label: "2. Free Court Fee Tool" },
  { id: "state-slabs-and-caps", label: "3. State Ad Valorem Slabs & Caps" },
  { id: "citation-and-valuation-costs", label: "4. Citation & Collector Valuations" },
  { id: "high-court-jurisdiction", label: "5. High Court vs District Court" },
  { id: "uncontested-vs-contested", label: "6. Uncontested vs Contested Timelines" },
  { id: "probate-vs-succession-cert", label: "7. Probate vs Estate Paper" },
  { id: "state-comparison-table", label: "8. State-by-State Fee Comparison" },
  { id: "step-by-step-sop", label: "9. Step-by-Step Probate Filing SOP" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Mumbai & Delhi" },
  { id: "legal-templates-and-checklist", label: "11. Schedule III Form & Checklist" },
  { id: "institutional-profile", label: "12. Legal Backing & Lawyer Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "judicial-precedents", label: "14. Precedents & Legal Citations" },
];

const FAQS = [
  {
    q: "How much is the court fee for probate of a Will in India?",
    a: "Court fees depend on the state where you file. In Mumbai, the fee is capped at Rs 75,000 max. In Delhi, you pay 4% with no upper limit. In Kolkata, fees reach up to 5.5%. In Chennai, the rate is 3%. In Bengaluru, court fees range from 5% to 6% of the estate value.",
  },
  {
    q: "Is probate court fee capped in Maharashtra and Mumbai?",
    a: "Yes. Under the Bombay Court Fees Act, 1959 (Article 11 Proviso), the court fee is strictly capped at Rs 75,000. Even if an estate is worth Rs 50 Crore or Rs 500 Crore, you never pay more than Rs 75,000 in court fees in Maharashtra courts.",
  },
  {
    q: "Is probate needed in Delhi, Bengaluru, or other non-presidential cities?",
    a: "No. Under Section 57 and Section 213 of the Indian Succession Act, probate is needed only in Mumbai, Kolkata, and Chennai. The Supreme Court in Kanta Yadav (2019) confirmed that probate is a choice in Delhi, Bengaluru, and other cities unless a fight arises.",
  },
  {
    q: "What is the difference between Probate and Letters of Care?",
    a: "Probate is granted only to an executor named in a Will under Section 222. Letters of Care are granted when there is no Will, or when the Will does not name an executor. Both processes give legal office to transfer assets, but probate requires an existing Will.",
  },
  {
    q: "What are the newspaper citation costs for probate in India?",
    a: "Under Section 283(1)(c), the court orders notices in two newspapers. One paper is in English and one is in the local language. These publication notices alert the public about the Will. Total publication costs usually range between Rs 15,000 and Rs 35,000.",
  },
  {
    q: "How long does it take to obtain an uncontested probate in India?",
    a: "An uncontested probate usually takes 6 to 12 months in District Courts. In High Courts like Bombay or Calcutta, it takes about 8 to 14 months. This includes checking papers, publishing notices, waiting 30 days for objections, and getting the Collector price check report.",
  },
  {
    q: "What happens to the timeline and costs if a probate petition is contested?",
    a: "If a relative files an objection or caveat under Section 284, the case becomes a full lawsuit under Section 295. The court hears witnesses, checks handwriting, and takes formal evidence. A contested case can take 2 to 5 years and increases legal costs.",
  },
  {
    q: "Can debts and funeral expenses be deducted from the probate court fee?",
    a: "Yes. Under Schedule III of the Court Fees Act, 1870, you can deduct funeral costs, home loans, and debts owed by the deceased. You only pay court fee on the remaining net value of the estate.",
  },
];

export default function ProbateFeeCalculatorClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Tool Form State
  const [selectedState, setSelectedState] = useState<string>("maharashtra");
  const [petitionType, setPetitionType] = useState<"probate" | "loa_with_will" | "loa_intestate">("probate");
  const [litigationStatus, setLitigationStatus] = useState<"uncontested" | "contested">("uncontested");

  // Financial Inputs (in INR)
  const [immovableValue, setImmovableValue] = useState<number>(20000000); // ₹2.00 Cr
  const [movableValue, setMovableValue] = useState<number>(5000000); // ₹50 Lakhs
  const [debtsAndLiabilities, setDebtsAndLiabilities] = useState<number>(500000); // ₹5 Lakhs

  const handleResetCalculator = () => {
    setSelectedState("maharashtra");
    setPetitionType("probate");
    setLitigationStatus("uncontested");
    setImmovableValue(20000000);
    setMovableValue(5000000);
    setDebtsAndLiabilities(500000);
  };

  // ==========================================
  // MATHEMATICAL COURT FEE COMPUTATION ENGINE
  // ==========================================
  const grossEstateValue = immovableValue + movableValue;
  const netAssessableEstate = Math.max(0, grossEstateValue - debtsAndLiabilities);

  const activeRule = STATE_RULES[selectedState] || STATE_RULES.maharashtra;
  const feeResult = activeRule.calculateFee(netAssessableEstate);

  const courtFeePayable = feeResult.courtFee;
  const uncappedFee = feeResult.uncappedFee;
  const capSavings = Math.max(0, uncappedFee - courtFeePayable);

  // Ancillary Expenses
  const citationCost = activeRule.citationCost;
  const collectorInquiryCost = activeRule.collectorValuationCost;
  const registryFee = activeRule.registryMiscCost;
  const totalAdministrativeDisbursements = citationCost + collectorInquiryCost + registryFee;

  const totalProbateExpenseEst = courtFeePayable + totalAdministrativeDisbursements;

  // Timeline Calculation
  const isContested = litigationStatus === "contested";
  const estimatedDurationText = isContested
    ? `${activeRule.contestedYearsMin} to ${activeRule.contestedYearsMax} Years (Testamentary Suit under Sec. 295)`
    : `${activeRule.uncontestedMonthsMin} to ${activeRule.uncontestedMonthsMax} Months (High Court / District Court)`;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyScheduleToClipboard = () => {
    const text = `VALUATION OF THE MOVEABLE AND IMMOVEABLE PROPERTY (SCHEDULE III, COURT FEES ACT, 1870):

ANNEXURE A: VALUATION OF THE MOVABLE AND IMMOVABLE PROPERTY OF DECEASED
1. Cash in hand and at bank: Rs. [Amount]
2. Stocks, mutual funds, and gilt-edged securities: Rs. [Amount]
3. Household goods, jewellery, wearing apparel: Rs. [Amount]
4. Immovable Property (Plot/Flat/House): [Property Address], Ready Reckoner / Circle Rate Value: Rs. [Amount]
TOTAL GROSS ASSET VALUATION: Rs. [Total Gross]

ANNEXURE B: SCHEDULE OF DEBTS, LIABILITIES AND DEDUCTIONS
1. Funeral expenses and death-bed hospital expenses: Rs. [Amount]
2. Mortgage debts secured upon the immovable property: Rs. [Amount]
3. Income tax / municipal tax liabilities due at demise: Rs. [Amount]
4. Bona fide personal debts owed by the deceased: Rs. [Amount]
TOTAL ALLOWABLE DEDUCTIONS: Rs. [Total Deductions]

NET TAXABLE VALUE OF ESTATE (ANNEXURE A MINUS ANNEXURE B): Rs. [Net Assessable Estate]
VERIFICATION:
I, [Name of Petitioner / Executor], do hereby declare that the statements made in Annexures A and B are true and correct to the best of my knowledge, information, and belief, and that no part of the estate has been concealed or omitted.`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `PROBATE PETITION MANDATORY DOCUMENT CHECKLIST (HIGH COURT / DISTRICT COURT):
1. Original Last Will and Testament of the deceased (with certified translation if in regional language).
2. Original Death Certificate issued by the Municipal Corporation / Gram Panchayat.
3. Schedule III Valuation Affidavits (Annexure A - Movable/Immovable Assets; Annexure B - Deductions).
4. Affidavit of Attesting Witness (Section 281 Indian Succession Act) affirming sound mind and execution.
5. Petition for Probate under Section 276 (duly verified, signed by Executor, and attested by Oath Commissioner).
6. Family Tree / Genealogy Chart with list of all surviving Class I legal heirs and their present addresses.
7. Clear Title Deeds of immovable properties (Registered Sale Deed / Share Certificate / Property Card).
8. Bank Statements, Share Certificates, Demat CML, and Locker Certificates of deceased.
9. No-Objection Affidavits / Consent Affidavits from other legal heirs (if proceeding uncontested).
10. Vakalatnama executed in favour of High Court testamentary advocate.`;
    navigator.clipboard.writeText(text);
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
            <span>COURT FEES ACT, 1870 • SCHEDULE I ART. 11 • SECTIONS 57 &amp; 213</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Probate Court Fee &amp; Timeline Tool India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly calculate state-wise probate court fees, legal caps (Mumbai ₹75,000 cap vs
            Delhi 4% uncapped), newspaper citation expenses, and realistic High Court procedural
            timelines under the Court Fees Act, 1870.
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
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
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
                MUMBAI STATUTORY CEILING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4% Uncapped</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DELHI AD-VALOREM RATE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CITATION OBJECTION WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 213</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY PROBATE TOWNS
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
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 57, 213, 218, 222, 276, 283 &amp; 295 of the Indian
                Estate Act, 1925 read with the Court Fees Act, 1870 Schedule I Art. 11 and state
                amendment acts.
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
                <span>EXECUTIVE BRIEF: INDIAN PROBATE COURT FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>State Court Fee Rates:</strong> Court fees vary by state under List II Entry 3.
                    Rates range from 2% to 7.5% based on estate value.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mumbai Rs 75,000 Cap:</strong> The Bombay Court Fees Act limits probate fees
                    to Rs 75,000 max. This saves lakhs on Mumbai homes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Delhi 4% Uncapped Rate:</strong> Delhi courts charge a flat 4% fee with no cap.
                    A Rs 5 Crore asset costs Rs 20,00,000 in court fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Where Probate is Needed:</strong> Probate is needed only in Mumbai, Kolkata,
                    and Chennai under Section 57 and Section 213. In Delhi or Bengaluru, it is a choice.
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
                1. Legal Framework: Indian Probate &amp; Letters of Admin
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Probate is a court order that proves a Will is genuine. It gives the executor legal power to
                  distribute assets. In India, rules for probate come under <strong>Part IX of the Indian
                  Estate Act, 1925</strong>. Under Section 222, only the executor named in the Will can
                  apply for probate.
                </p>
                <p>
                  Under <strong>Section 57 and Section 213</strong> of the Act, probate is needed only in
                  three cities. These are <em>Mumbai, Kolkata, and Chennai</em>. This rule applies if the Will
                  was signed in these cities, or if the asset is located there.
                </p>
                <p>
                  In other cities like Delhi, Bengaluru, or Lucknow, probate is a choice. The Supreme Court
                  confirmed this in <em>Clarence Pais (2001)</em> and <em>Kanta Yadav (2019)</em>. You do not
                  need probate to claim your share outside these three cities. But banks or housing societies
                  may still ask for it if family members raise a fight.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE COURT FEE TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Probate Court Fee &amp; Timeline Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your state, enter the asset valuations and allowable deductions, and choose your
                court fights posture to compute exact ad-valorem court fees, legal caps, publication
                expenses, and realistic court timelines.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Controls: State & Petition Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* State Selection */}
                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Court Area (State)</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    >
                      {Object.values(STATE_RULES).map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Building className="w-3 h-3 text-[#5F7E75]" />
                      <span className="truncate">{activeRule.courtName}</span>
                    </div>
                  </div>

                  {/* Petition Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileSignature className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Will Proceeding</span>
                    </label>
                    <select
                      value={petitionType}
                      onChange={(e) =>
                        setPetitionType(e.target.value as "probate" | "loa_with_will" | "loa_intestate")
                      }
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="probate">Probate (Will with Named Executor)</option>
                      <option value="loa_with_will">Letters of Care (Will Annexed)</option>
                      <option value="loa_intestate">Letters of Care (No-Will - No Will)</option>
                    </select>
                    <div className="text-[11px] text-slate-500">
                      {petitionType === "probate"
                        ? "Executor petitions High Court under Section 276"
                        : petitionType === "loa_with_will"
                        ? "Beneficiary petitions under Section 232/234"
                        : "Heirs petition under Section 218 without a Will"}
                    </div>
                  </div>

                  {/* Litigation Status: Uncontested vs Contested */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Family Court Fights Posture</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setLitigationStatus("uncontested")}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                          litigationStatus === "uncontested"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Uncontested (Consent)
                      </button>
                      <button
                        type="button"
                        onClick={() => setLitigationStatus("contested")}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                          litigationStatus === "contested"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Contested (Caveat)
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {litigationStatus === "uncontested"
                        ? "All Class I heirs furnish NOC Affidavits"
                        : "Caveat filed; converted into regular suit"}
                    </div>
                  </div>
                </div>

                {/* Presidential Town Mandatory Flag Banner */}
                {activeRule.isPresidentialMandatory ? (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Needed Probate Area:</strong> In {activeRule.shortName}, probate
                      or Letters of Administration is legally compulsory under Section 57(a) &amp; Section
                      213 of the Indian Succession Act for Wills executed here or covering immovable
                      property in the presidential city.
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>A Choice Area (Kanta Yadav Precedent):</strong> In{" "}
                      {activeRule.shortName}, probate is legally optional for Hindus, Sikhs, Buddhists, and
                      Jains under Section 57(c). Filing is required only if title is disputed or
                      authorities demand formal court validation.
                    </div>
                  </div>
                )}

                {/* Financial Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Gross Immovable Property Valuation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Land Assets (₹)</span>
                      <span className="text-[#C65378] font-black">{formatINR(immovableValue)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Circle rate / Ready Reckoner value of flats, plots, shop shops.
                    </p>
                    <input
                      type="number"
                      step={500000}
                      min={0}
                      value={immovableValue}
                      onChange={(e) => setImmovableValue(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#C65378] focus:outline-hidden"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {[5000000, 10000000, 25000000, 50000000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setImmovableValue(v)}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 hover:bg-slate-200"
                        >
                          {v >= 10000000 ? `₹${v / 10000000} Cr` : `₹${v / 100000}L`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gross Movable Assets Valuation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Cash Assets (₹)</span>
                      <span className="text-[#C65378] font-black">{formatINR(movableValue)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Bank savings, fixed deposits, demat shares, gold jewellery, vehicles.
                    </p>
                    <input
                      type="number"
                      step={100000}
                      min={0}
                      value={movableValue}
                      onChange={(e) => setMovableValue(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#C65378] focus:outline-hidden"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {[1000000, 2500000, 5000000, 10000000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setMovableValue(v)}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 hover:bg-slate-200"
                        >
                          {v >= 10000000 ? `₹${v / 10000000} Cr` : `₹${v / 100000}L`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule III Allowable Deductions */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Schedule III Deductions (₹)</span>
                      <span className="text-emerald-700 font-black">
                        - {formatINR(debtsAndLiabilities)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Funeral expenses, unpaid debts, and outstanding mortgages of deceased.
                    </p>
                    <input
                      type="number"
                      step={50000}
                      min={0}
                      value={debtsAndLiabilities}
                      onChange={(e) =>
                        setDebtsAndLiabilities(Math.max(0, Number(e.target.value) || 0))
                      }
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#C65378] focus:outline-hidden"
                    />
                    <div className="flex flex-wrap gap-1 pt-1">
                      {[200000, 500000, 1000000, 2500000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setDebtsAndLiabilities(v)}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700 hover:bg-slate-200"
                        >
                          {`₹${v / 100000}L`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset & Quick Helper */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    Legal Rule: <strong>{activeRule.statutoryBasis}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleResetCalculator}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                {/* =================================================================
                    CALCULATION RESULTS CARDS
                    ================================================================= */}
                <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-7 md:p-8 space-y-6 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                        NET ASSESSABLE PROBATE VALUATION
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {formatINR(netAssessableEstate)}
                      </div>
                      <div className="text-xs text-white/70 mt-0.5">
                        Gross Estate: {formatINR(grossEstateValue)} less Deductions:{" "}
                        {formatINR(debtsAndLiabilities)}
                      </div>
                    </div>
                    {feeResult.capApplied && (
                      <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Statutory Cap Applied ({formatINR(activeRule.capAmount || 0)})</span>
                      </div>
                    )}
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Metric 1: Statutory Court Fee */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1">
                        <Scale className="w-3 h-3 text-[#C65378]" />
                        <span>Court Fee Payable</span>
                      </div>
                      <div className="text-2xl font-extrabold text-white">
                        {formatINR(courtFeePayable)}
                      </div>
                      <div className="text-[11px] text-white/60">{activeRule.rateDescription}</div>
                    </div>

                    {/* Metric 2: Citation Publication Expense */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#C65378]" />
                        <span>Citation Notices</span>
                      </div>
                      <div className="text-2xl font-extrabold text-white">
                        {formatINR(citationCost)}
                      </div>
                      <div className="text-[11px] text-white/60">English + Vernacular daily</div>
                    </div>

                    {/* Metric 3: Total Administrative Cost */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#C65378]" />
                        <span>Total Legal Cost</span>
                      </div>
                      <div className="text-2xl font-extrabold text-rose-300">
                        {formatINR(totalProbateExpenseEst)}
                      </div>
                      <div className="text-[11px] text-white/60">Court Fee + Citations + Inquiry</div>
                    </div>

                    {/* Metric 4: Estimated Court Timeline */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C65378]" />
                        <span>Expected Timeline</span>
                      </div>
                      <div className="text-lg font-black text-emerald-400">
                        {isContested
                          ? `${activeRule.contestedYearsMin}-${activeRule.contestedYearsMax} Yrs`
                          : `${activeRule.uncontestedMonthsMin}-${activeRule.uncontestedMonthsMax} Mos`}
                      </div>
                      <div className="text-[11px] text-white/60">
                        {isContested ? "Contentious Suit (Sec 295)" : "Uncontested Petition"}
                      </div>
                    </div>
                  </div>

                  {/* Special Statutory Highlights */}
                  {feeResult.capApplied && capSavings > 0 && (
                    <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <strong>Huge Legal Cap Relief:</strong> In {activeRule.shortName}, the
                          uncapped ad-valorem fee would have been <strong>{formatINR(uncappedFee)}</strong>.
                          The statutory ceiling of ₹75,000 saves the estate{" "}
                          <strong>{formatINR(capSavings)}</strong>!
                        </div>
                      </div>
                    </div>
                  )}

                  {!feeResult.capApplied && selectedState === "delhi" && netAssessableEstate > 5000000 && (
                    <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <strong>High Uncapped Fee Warning:</strong> Delhi does not cap probate court
                          fees. On an estate of {formatINR(netAssessableEstate)}, you are paying{" "}
                          <strong>{formatINR(courtFeePayable)}</strong> (4%). If the Will is uncontested
                          and all heirs consent, consider exploring a filed Family Deal Deed or
                          title name change without probate where legally feasible.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Procedural Milestones Breakdown */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Procedural Milestone Breakdown: {activeRule.courtName}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-extrabold text-white">Weeks 1 to 6</div>
                        <div className="text-white/70 text-[11px] mt-0.5">
                          Petition drafting, Schedule III price check sworn notes &amp; registry scrutiny.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-extrabold text-white">Weeks 7 to 12</div>
                        <div className="text-white/70 text-[11px] mt-0.5">
                          Citation issuance, special notices to legal heirs &amp; dual newspaper notices.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-extrabold text-white">Weeks 13 to 22</div>
                        <div className="text-white/70 text-[11px] mt-0.5">
                          30-day public caveat window &amp; Section 19-H Collector price check report.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-extrabold text-white">Weeks 23 to {activeRule.uncontestedMonthsMax * 4}</div>
                        <div className="text-white/70 text-[11px] mt-0.5">
                          Signing witness evidence, court fee deposit &amp; parchment grant delivery.
                        </div>
                      </div>
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
                  <span>STATUTORY VISUAL GUIDE: PROBATE COURT FEES &amp; TIMELINES</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Court Fees Act 1870</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/probate-court-fee-timeline-calculator-og.jpg"
                  alt="Probate Court Fee and Timeline Calculator India - State Ad Valorem Slabs and Caps"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* SECTION 3: STATE AD VALOREM SLABS & CAPS */}
            <section id="state-slabs-and-caps" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATE SLABS &amp; CEILINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. State-Wise Ad Valorem Court Fee Slabs &amp; Legal Caps
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, each state sets its own court fees. Under Entry 3 of List II in the
                  Constitution, states decide how much to charge for civil court cases. That is why
                  probate costs vary widely across Indian cities:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">Maharashtra (Mumbai)</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                        ₹75,000 Max Cap
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed under Schedule I, Article 11 of the Bombay Court Fees Act, 1959. Slabs
                      scale from 2% to 7.5% on estates above ₹3,00,000, but the fee is strictly capped at
                      ₹75,000 under the legal proviso inserted by Maharashtra Act No. 34 of 1994.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">Delhi NCR</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[11px]">
                        4% Uncapped
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed under the Court Fees Act, 1870 as applicable to Delhi. The rate is a flat 4%
                      ad-valorem on estates exceeding ₹50,000 with no maximum ceiling. On a ₹10 Crore
                      asset, the fee is ₹40,00,000.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">West Bengal (Kolkata)</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[11px]">
                        5.5% Top Slab
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed under the West Bengal Court Fees Act, 1970. Rates start at 2% and escalate
                      to 5.5% for estates exceeding ₹5,00,000 on the Original Side of the Calcutta High
                      Court.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">Karnataka (Bengaluru)</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[11px]">
                        5% to 6% Ad-Valorem
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed under the Karnataka Court Fees and Suits Price Check Act, 1958. Levies 5% on
                      estates between ₹1 Lakh and ₹5 Lakhs, and up to 5.5% to 6% on excess amounts without
                      a statewide cap.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: CITATION AND VALUATION COSTS */}
            <section id="citation-and-valuation-costs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PROCEDURAL DISBURSEMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Citation Publication &amp; Collector Price Check Expenses
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Besides court fees, you must budget for basic court expenses. These costs are required
                  by law during the probate process:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Newspaper Notices (Section 283(1)(c))</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The court orders public notices in two daily papers. One paper is in English and one is
                      in the regional language. Total costs usually run between Rs 15,000 and Rs 35,000.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Collector Asset Check (Section 19-H)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The court sends a notice to the local Collector or Tehsildar under Section 19-H. The
                      officer checks the circle rates to confirm the true value of the land or flat.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Court Filing and Notice Fees</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You pay minor court fees to file papers, search for caveats, send notices to legal
                      heirs, and print the final grant on stamped court paper with the court seal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: HIGH COURT VS DISTRICT COURT JURISDICTION */}
            <section id="high-court-jurisdiction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>PECUNIARY JURISDICTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. High Court vs District Court: Area &amp; Filing
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Where do you file your probate case? Under Section 264 of the Indian Succession Act, you
                  usually file before the <strong>District Judge</strong>. But in big cities like Mumbai and
                  Kolkata, you file directly in the <strong>High Court</strong> if the asset value is high:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Court Forum</th>
                        <th className="py-3 px-4">Territorial Coverage</th>
                        <th className="py-3 px-4">Pecuniary Threshold</th>
                        <th className="py-3 px-4">Typical Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Bombay High Court</td>
                        <td className="py-3 px-4">Mumbai City District (Colaba to Mahim/Sion)</td>
                        <td className="py-3 px-4">Estates exceeding ₹1 Crore</td>
                        <td className="py-3 px-4">8 to 14 Months</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Mumbai City Civil Court / Thane</td>
                        <td className="py-3 px-4">Mumbai Suburban (Bandra to Dahisar), Thane, Navi Mumbai</td>
                        <td className="py-3 px-4">Estates up to ₹1 Crore</td>
                        <td className="py-3 px-4">6 to 12 Months</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Delhi High Court</td>
                        <td className="py-3 px-4">NCT of Delhi</td>
                        <td className="py-3 px-4">Estates exceeding ₹2 Crores</td>
                        <td className="py-3 px-4">7 to 12 Months</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Delhi District Courts</td>
                        <td className="py-3 px-4">Saket, Tis Hazari, Patiala House, Rohini, Dwarka</td>
                        <td className="py-3 px-4">Estates up to ₹2 Crores</td>
                        <td className="py-3 px-4">6 to 10 Months</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Calcutta High Court</td>
                        <td className="py-3 px-4">Kolkata City Limits (Original Side)</td>
                        <td className="py-3 px-4">Estates exceeding ₹1 Crore</td>
                        <td className="py-3 px-4">9 to 16 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: UNCONTESTED VS CONTESTED TIMELINES */}
            <section id="uncontested-vs-contested" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>TIMELINE DYNAMICS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Uncontested vs Contested Probate: Procedural Timelines
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  How long does probate take? It depends on whether any relative objects. If someone files
                  a <strong>Caveat under Section 284</strong>, the case takes much longer:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>UNCONTESTED PROBATE (6 TO 12 MONTHS)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If all legal heirs agree and give no-objection sworn notes, the case moves smoothly:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      <li>The court checks your papers in 4 to 6 weeks.</li>
                      <li>Notices go to heirs and local papers in 3 to 4 weeks.</li>
                      <li>The public gets 30 days to raise objections.</li>
                      <li>The local Collector sends the tax price check report.</li>
                      <li>One Will witness confirms the signing under Section 281.</li>
                      <li>The judge signs the order and grants the sealed probate.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                      <AlertTriangle className="w-4 h-4" />
                      <span>CONTESTED PROBATE (2 TO 5+ YEARS)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If a relative files a Caveat under Section 285 and claims the Will is fake:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      <li>The case turns into a full court suit under Section 295.</li>
                      <li>Both sides file written claims over 6 to 12 months.</li>
                      <li>Lawyers cross-examine witnesses and doctors in court.</li>
                      <li>Handwriting experts inspect the signatures on the Will.</li>
                      <li>The judge hears final arguments after 2 to 5 years.</li>
                      <li>Either side can appeal the final order to higher courts.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: PROBATE VS SUCCESSION CERTIFICATE */}
            <section id="probate-vs-succession-cert" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL REMEDY COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Estate Paper vs Probate Comparison
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families ask whether they need a Probate, Letters of Care, or a
                  Estate Paper. Here is how they differ:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Parameter</th>
                        <th className="py-3 px-4">Probate</th>
                        <th className="py-3 px-4">Letters of Care</th>
                        <th className="py-3 px-4">Estate Paper</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Governing Rule</td>
                        <td className="py-3 px-4">Section 222 Indian Succession Act</td>
                        <td className="py-3 px-4">Sections 218, 232 &amp; 234</td>
                        <td className="py-3 px-4">Section 370 to 390 (Part X)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Pre-requisite Will?</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Needed (Will must exist)</td>
                        <td className="py-3 px-4">With Will or No-Will</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Only for No-Will Estate</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Applicable Assets</td>
                        <td className="py-3 px-4 font-bold">Land + Cash Assets</td>
                        <td className="py-3 px-4 font-bold">Land + Cash Assets</td>
                        <td className="py-3 px-4 text-[#C65378] font-bold">Strictly Cash Assets (FDs/Shares)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Who Can Apply?</td>
                        <td className="py-3 px-4">Executor named in Will</td>
                        <td className="py-3 px-4">Heirs or Legal Heirs</td>
                        <td className="py-3 px-4">Surviving Class I Legal Heirs</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Court Fee Treatment</td>
                        <td className="py-3 px-4">Ad-valorem with State Caps</td>
                        <td className="py-3 px-4">Ad-valorem with State Caps</td>
                        <td className="py-3 px-4">Ad-valorem on Cash Value</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 8: STATE COMPARISON TABLE */}
            <section id="state-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATE COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Full State-by-State Court Fee Comparison
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Here is how court fees and timelines compare across major Indian states for an estate
                  worth Rs 2.50 Crores:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">State / Court</th>
                        <th className="py-3 px-4">Ad-Valorem Rate</th>
                        <th className="py-3 px-4">Legal Cap</th>
                        <th className="py-3 px-4">Court Fee on ₹2.5 Cr</th>
                        <th className="py-3 px-4">Needed Section 213?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Maharashtra (Mumbai)</td>
                        <td className="py-3 px-4">2% to 7.5%</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹75,000 Cap</td>
                        <td className="py-3 px-4 font-black text-emerald-700">₹75,000</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">Yes (Mumbai)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Delhi NCR</td>
                        <td className="py-3 px-4">4% ad-valorem</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">None (Uncapped)</td>
                        <td className="py-3 px-4 font-black text-rose-700">₹10,00,000</td>
                        <td className="py-3 px-4 text-slate-600">No (A Choice)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">West Bengal (Kolkata)</td>
                        <td className="py-3 px-4">Up to 5.5%</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">None (Uncapped)</td>
                        <td className="py-3 px-4 font-black text-rose-700">₹13,55,800</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">Yes (Kolkata)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Tamil Nadu (Chennai)</td>
                        <td className="py-3 px-4">3% ad-valorem</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹25,000 (Summary)</td>
                        <td className="py-3 px-4 font-black text-emerald-700">₹25,000 / ₹7.5L</td>
                        <td className="py-3 px-4 font-bold text-emerald-700">Yes (Chennai)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Karnataka (Bengaluru)</td>
                        <td className="py-3 px-4">Up to 5.5%</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">None (Uncapped)</td>
                        <td className="py-3 px-4 font-black text-rose-700">₹13,42,625</td>
                        <td className="py-3 px-4 text-slate-600">No (A Choice)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Gujarat (Ahmedabad)</td>
                        <td className="py-3 px-4">2% to 6%</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹75,000 Cap</td>
                        <td className="py-3 px-4 font-black text-emerald-700">₹75,000</td>
                        <td className="py-3 px-4 text-slate-600">No (A Choice)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL PLAYBOOK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Filing Probate in High Court
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Find the Original Will and Death Certificate",
                    desc: "Find the original signed Will. Make sure two witnesses signed it under Section 63. Get the official death paper from the city office.",
                  },
                  {
                    step: "2",
                    title: "List All Property and Debts (Schedule III)",
                    desc: "List all flats, plots, bank accounts, and shares in Annexure A. List funeral costs and home loans in Annexure B to find the net taxable value.",
                  },
                  {
                    step: "3",
                    title: "Get Witness Affidavit (Section 281)",
                    desc: "Ask one Will witness to sign a short sworn note under Section 281. The witness confirms that the person made the Will in sound health.",
                  },
                  {
                    step: "4",
                    title: "File the Petition in Court (Section 276)",
                    desc: "Your lawyer files the petition under Section 276 with the family tree and original Will in the court registry.",
                  },
                  {
                    step: "5",
                    title: "Send Notices to Heirs and Print in Papers",
                    desc: "Send legal notices to all direct heirs. Publish a notice in two local newspapers under Section 283(1)(c) to inform the public.",
                  },
                  {
                    step: "6",
                    title: "Wait 30 Days for Objections and Tax Check",
                    desc: "Wait for the 30-day notice window to pass. The local Tehsildar checks the asset value under Section 19-H.",
                  },
                  {
                    step: "7",
                    title: "Pay Court Fees and Get the Court Order",
                    desc: "Pay the court fee (up to Rs 75,000 in Mumbai). The court issues the official probate order with its red seal.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Mumbai, Delhi &amp; Bengaluru
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="text-emerald-700">CASE STUDY 1: MUMBAI (BOMBAY HIGH COURT)</span>
                    <span className="font-black text-slate-900">Rs 6.50 Crore Estate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A father left a 3BHK flat in Bandra worth Rs 5.50 Cr and Rs 1 Cr in
                    bank deposits. His Will named his daughter as the sole executor.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Costs:</strong> Without a cap, 7.5% would have cost Rs 48,75,000. But under the
                    Bombay Court Fees Act, the fee was capped at <strong>Rs 75,000</strong>. Adding Rs 25,000
                    for news notices, total court expenses were only Rs 1,15,000.
                  </p>
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                    Result: The daughter got uncontested probate in 9 months at Bombay High Court.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="text-rose-700">CASE STUDY 2: DELHI (SAKET DISTRICT COURT)</span>
                    <span className="font-black text-slate-900">Rs 3.00 Crore Estate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A family owned a home in Greater Kailash worth Rs 2.50 Cr and Rs 50
                    Lakhs in bank accounts. A bank asked for probate to release the funds.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Costs:</strong> Delhi charges 4% without any cap. That meant paying <strong>Rs
                    12,00,000</strong> in court fees. Our lawyers showed the bank that probate is a choice in
                    Delhi under <em>Kanta Yadav</em>. The bank accepted an indemnity bond instead.
                  </p>
                  <div className="text-[11px] font-bold text-[#C65378] bg-rose-50 p-2 rounded-lg">
                    Result: The family saved Rs 12 Lakhs and got their money without probate.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL TEMPLATES */}
            <section id="legal-templates-and-checklist" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>LEGAL TEMPLATES &amp; CHECKLISTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Schedule III Price Check Form &amp; Petition Checklist
              </h3>

              {/* Template Box 1: Schedule III Valuation Format */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Schedule III Form of Price Check Sworn Note (Court Fees Act, 1870)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyScheduleToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors"
                  >
                    {copiedSchedule ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Template</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-64">
{`VALUATION OF THE MOVEABLE AND IMMOVEABLE PROPERTY (SCHEDULE III, COURT FEES ACT, 1870):

ANNEXURE A: VALUATION OF THE MOVABLE AND IMMOVABLE PROPERTY OF DECEASED
1. Cash in hand and at bank: Rs. [Amount]
2. Stocks, mutual funds, and gilt-edged securities: Rs. [Amount]
3. Household goods, jewellery, wearing apparel: Rs. [Amount]
4. Immovable Property (Plot/Flat/House): [Property Address], Ready Reckoner / Circle Rate Value: Rs. [Amount]
TOTAL GROSS ASSET VALUATION: Rs. [Total Gross]

ANNEXURE B: SCHEDULE OF DEBTS, LIABILITIES AND DEDUCTIONS
1. Funeral expenses and death-bed hospital expenses: Rs. [Amount]
2. Mortgage debts secured upon the immovable property: Rs. [Amount]
3. Income tax / municipal tax liabilities due at demise: Rs. [Amount]
4. Bona fide personal debts owed by the deceased: Rs. [Amount]
TOTAL ALLOWABLE DEDUCTIONS: Rs. [Total Deductions]

NET TAXABLE VALUE OF ESTATE (ANNEXURE A MINUS ANNEXURE B): Rs. [Net Assessable Estate]
VERIFICATION:
I, [Name of Petitioner / Executor], do hereby declare that the statements made in Annexures A and B are true and correct to the best of my knowledge, information, and belief, and that no part of the estate has been concealed or omitted.`}
                </pre>
              </div>

              {/* Template Box 2: Probate Petition Mandatory Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>High Court Probate Filing Needed Checklist</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
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
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>1. Original Will:</strong> Signed under Section 63 with translation if regional.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>2. Death Paper:</strong> Certified copy by City Registrar.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>3. Section 281 Sworn Note:</strong> Signing sworn note by signing witness.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>4. Schedule III Forms:</strong> Annexure A assets + Annexure B debt deductions.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>5. Legal Heir Genealogy:</strong> Checked family tree of all Class I heirs.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong>6. Asset Chain Deeds:</strong> Filed sale deeds and share papers.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. AMA Legal Solutions: High Court Will Practice
              </h3>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-rose-100 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900">
                      Lawyer Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate &amp; Will Counsel
                    </div>
                    <div className="text-xs text-slate-500">
                      Bar Council of Delhi • Supreme Court &amp; High Courts Pan-India
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Lawyer Anuj Anand Malik leads the estate practice at AMA Legal Solutions. He has
                  guided hundreds of executors, NRIs, and families in Bombay High Court and Delhi courts.
                  His team helps you draft petitions, publish notices, and handle objections under Section 295.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-700">
                    Checked Will Practice • 100% Legal Compliance
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                  >
                    <span>Schedule Case Talk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Probate Court Fees
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between gap-3 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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

            {/* SECTION 14: JUDICIAL PRECEDENTS & STATUTORY CITATIONS */}
            <section id="judicial-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Governing Judicial Precedents &amp; Legal Offices
              </h3>
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs leading-relaxed">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">Landmark Supreme Court Precedents:</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Clarence Pais &amp; Ors. v. Union of India (2001) 4 SCC 325:</strong> Supreme
                      Court upheld the constitutional validity of Section 213, establishing that probate
                      is needed only in Mumbai, Kolkata, and Chennai.
                    </li>
                    <li>
                      <strong>Kanta Yadav v. Om Prakash Yadav (2019) 10 SCC 437:</strong> Supreme Court
                      reaffirmed that outside presidential towns, probate is not required to claim title or
                      enforce rights under a Hindu Will.
                    </li>
                    <li>
                      <strong>Pamela Manmohan Singh v. State (Delhi High Court, 2000):</strong> Division
                      Bench held that in Delhi, grant of probate is entirely a choice for Hindus, Sikhs,
                      Jains, and Buddhists.
                    </li>
                    <li>
                      <strong>Minaxiben Shashikant Patel v. District Collector (2007) 1 GLR 277:</strong> Gujarat
                      High Court confirmed probate is not needed for real estate situated in Gujarat.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Bombay High Court Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://delhihighcourt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Delhi High Court Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Estate Tools &amp; Legal Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Estate Paper Court Fee Tool
                    </Link>
                    <Link
                      href="/tools/executor-duties-90-day-timeline-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Executor Duties Timeline
                    </Link>
                    <Link
                      href="/services/probate-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      High Court Probate Lawyer Services
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Paper Checklist
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
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
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in High Court probate petitions, Will caveats defense, Schedule III
                asset price check, and cross-border NRI estate transfer pan-India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT EXPENSIVE PROBATE BATTLES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family from Lengthy Court Fights
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A fight-proof, legally drafted Will with named executors and clear witness signing
                  accelerates uncontested probate and eliminates family caveats.
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
                  <span>HIGH COURT TESTAMENTARY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Filing Probate or Facing a Caveat in High Court?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Will litigators handle Section 276 petitions, citation publications,
                  Collector inquiries, and caveat defense in Mumbai, Delhi, and pan-India courts.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Executors Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>State Slabs &amp; Caps:</strong> Automatically applies Maharashtra ₹75,000 cap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Schedule III Deductions:</strong> Accounts for allowable debts and funeral costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Realistic Timelines:</strong> Differentiates uncontested vs contentious suits.
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
          <span>Court Fee Tool</span>
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
