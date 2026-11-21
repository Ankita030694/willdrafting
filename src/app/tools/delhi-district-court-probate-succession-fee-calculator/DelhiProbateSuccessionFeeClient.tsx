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
  { id: "statutory-foundation", label: "1. Delhi Probate & Succession Court Fee Law" },
  { id: "interactive-calculator", label: "2. Delhi District Court Fee Calculator" },
  { id: "article-11-slabs", label: "3. Article 11 Slabs: Probate & LOA Fees" },
  { id: "article-12-slabs", label: "4. Article 12 Rates: Succession Certificate" },
  { id: "jurisdiction-rules", label: "5. District Court vs High Court Jurisdiction" },
  { id: "probate-optional-delhi", label: "6. Is Probate Mandatory in Delhi? (Sec 213)" },
  { id: "valuation-timing", label: "7. SDM Valuation & When to Pay Court Fees" },
  { id: "comparison-table", label: "8. Legal Comparison: Probate vs Succession" },
  { id: "step-by-step-sop", label: "9. Step-by-Step Delhi Court Filing Process" },
  { id: "practical-case-studies", label: "10. Worked Delhi Estate Fee Case Studies" },
  { id: "document-checklist", label: "11. Petition Draft Notes & Document Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Delhi Estate Counsel" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Delhi Fees" },
  { id: "statutory-citations", label: "14. Legal Citations & Official Delhi Portals" },
];

const FAQS = [
  {
    q: "What is the probate court fee percentage in Delhi District Courts?",
    a: "Under Schedule I, Article 11 of the Court Fees Act, 1870 as applied in Delhi, probate and letters of administration carry an uncapped fee of 4% on the net estate value when it exceeds Rs 50,000. Lower slabs apply 2% from Rs 1,001 to Rs 10,000 and 2.5% from Rs 10,001 to Rs 50,000.",
  },
  {
    q: "Is there any upper cap on probate or succession court fees in Delhi?",
    a: "No. Unlike Maharashtra, which caps probate court fees at Rs 75,000, Delhi has no upper ceiling. The 4% probate fee or 2.5% succession certificate fee applies to the full verified net value of the listed estate or securities.",
  },
  {
    q: "What is the court fee for a Succession Certificate in Delhi?",
    a: "Per the Delhi District Courts handbook and Schedule I, Article 12 of the Court Fees Act, 1870, an initial Succession Certificate under Section 374 carries a 2.5% court fee on the total value of debts and securities. Adding missed assets later through an extension under Section 376 attracts a 4% fee on the added value.",
  },
  {
    q: "Is probate of a Will legally mandatory in Delhi?",
    a: "No. Under Sections 57 and 213 of the Indian Succession Act, 1925, probate is not mandatory in Delhi for Wills made by Hindus, Sikhs, Jains, or Buddhists for Delhi properties. The Supreme Court in Kanta Yadav v. Om Prakash Yadav confirmed this rule. However, heirs often seek probate voluntarily if a bank, society, or buyer asks for court proof.",
  },
  {
    q: "When do I have to pay the 4% probate court fee in Delhi?",
    a: "You do not pay the 4% ad valorem fee when filing the petition. Under Section 19-I of the Court Fees Act and the Delhi High Court ruling in Praveena Bhardwaj v. State, you pay only a nominal fixed filing fee at the start. The full 4% e-court fee is paid only after the SDM valuation report arrives and the court approves the grant.",
  },
  {
    q: "Does an estate above Rs 2 crore go to Delhi High Court or District Court?",
    a: "The Rs 2 crore limit under Section 5(2) of the Delhi High Court Act applies to regular civil suits, not succession petitions. You can file Probate or Letters of Administration in the Delhi District Court even if the estate exceeds Rs 2 crore, though the Delhi High Court also has concurrent probate power. Succession Certificates are filed only before the Administrative Civil Judge (ACJ) in the District Court.",
  },
  {
    q: "Can home loans and funeral costs be deducted before calculating Delhi probate fees?",
    a: "Yes. Under Section 19-D and Schedule III (Annexure B) of the Court Fees Act, 1870, you can deduct bona fide funeral costs, unpaid loans, mortgages, and trust assets from the gross estate value. The 4% fee applies only to the net estate value.",
  },
  {
    q: "How do I pay Delhi District Court probate or succession fees?",
    a: "Court fees in Delhi are paid digitally through the Stock Holding Corporation of India Limited (SHCIL) e-Court Fee portal. Select NCT of Delhi, enter the exact court-approved amount, pay via net banking or UPI, and submit the printed e-Court Fee receipt to the court reader before the final certificate is sealed.",
  },
];

type PetitionType =
  | "probate"
  | "letters_of_administration"
  | "succession_initial"
  | "succession_extension";

type DelhiDistrictComplex =
  | "saket"
  | "tis_hazari"
  | "patiala_house"
  | "karkardooma"
  | "rohini"
  | "dwarka";

const DISTRICT_COMPLEXES: Record<
  DelhiDistrictComplex,
  { name: string; districts: string; forum: string }
> = {
  saket: {
    name: "Saket District Court",
    districts: "South & South-East Delhi (GK, Hauz Khas, Defence Colony, Kalkaji, Sarita Vihar)",
    forum: "District Judge / ACJ, Saket Courts Complex",
  },
  tis_hazari: {
    name: "Tis Hazari District Court",
    districts: "Central & West Delhi (Karol Bagh, Civil Lines, Patel Nagar, Rajouri Garden, Janakpuri)",
    forum: "District Judge / ACJ, Tis Hazari Courts Complex",
  },
  patiala_house: {
    name: "Patiala House Court",
    districts: "New Delhi District (Connaught Place, Chanakyapuri, Vasant Vihar, Delhi Cantt)",
    forum: "District Judge / ACJ, Patiala House Courts",
  },
  karkardooma: {
    name: "Karkardooma Court",
    districts: "East, North-East & Shahdara Delhi (Mayur Vihar, Preet Vihar, Vivek Vihar, Seelampur)",
    forum: "District Judge / ACJ, Karkardooma Courts Complex",
  },
  rohini: {
    name: "Rohini District Court",
    districts: "North & North-West Delhi (Pitampura, Shalimar Bagh, Rohini, Model Town, Narela)",
    forum: "District Judge / ACJ, Rohini Courts Complex",
  },
  dwarka: {
    name: "Dwarka District Court",
    districts: "South-West Delhi (Dwarka Sectors, Najafgarh, Kapashera, Palam, Uttam Nagar)",
    forum: "District Judge / ACJ, Dwarka Courts Complex",
  },
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function DelhiProbateSuccessionFeeClient() {
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

  // Calculator State
  const [petitionType, setPetitionType] = useState<PetitionType>("probate");
  const [immovableValue, setImmovableValue] = useState<string>("12000000"); // Rs 1.20 Cr default
  const [movableValue, setMovableValue] = useState<string>("2500000"); // Rs 25 L default
  const [deductibleLiabilities, setDeductibleLiabilities] = useState<string>("500000"); // Rs 5 L default
  const [districtComplex, setDistrictComplex] = useState<DelhiDistrictComplex>("saket");
  const [willLocationRule, setWillLocationRule] = useState<"delhi_only" | "metro_asset">(
    "delhi_only"
  );
  const [isContested, setIsContested] = useState<boolean>(false);

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
    setImmovableValue("12000000");
    setMovableValue("2500000");
    setDeductibleLiabilities("500000");
    setDistrictComplex("saket");
    setWillLocationRule("delhi_only");
    setIsContested(false);
  };

  // Parse numeric values safely
  const parsedImmovable = Math.max(0, Number(immovableValue.replace(/[^0-9]/g, "")) || 0);
  const parsedMovable = Math.max(0, Number(movableValue.replace(/[^0-9]/g, "")) || 0);
  const parsedDebts = Math.max(0, Number(deductibleLiabilities.replace(/[^0-9]/g, "")) || 0);

  const isSuccessionCert =
    petitionType === "succession_initial" || petitionType === "succession_extension";

  // Gross & Net Taxable Estate Value
  // Note: Succession Certificate applies ONLY to movable debts & securities (Part X ISA 1925)
  const grossEstate = isSuccessionCert ? parsedMovable : parsedImmovable + parsedMovable;
  const effectiveDeductions = isSuccessionCert ? 0 : Math.min(parsedDebts, grossEstate);
  const netEstateValue = Math.max(0, grossEstate - effectiveDeductions);

  // Statutory Rate Calculation under Court Fees Act, 1870 (Delhi Schedule I Art. 11 & Art. 12)
  let statutoryRatePercent = 0;
  let statutoryProvision = "Court Fees Act, 1870 - Schedule I, Article 11 (Delhi)";
  let slabLabel = "";
  let adValoremCourtFee = 0;

  if (isSuccessionCert) {
    statutoryProvision = "Court Fees Act, 1870 - Schedule I, Article 12 (Delhi)";
    if (petitionType === "succession_initial") {
      statutoryRatePercent = 2.5;
      slabLabel = "2.5% Flat Ad Valorem (Initial Grant - Sec 374 ISA, Uncapped)";
      adValoremCourtFee = Math.ceil(netEstateValue * 0.025);
    } else {
      statutoryRatePercent = 4.0;
      slabLabel = "4.0% Flat Ad Valorem (Extension on Added Assets - Sec 376 ISA)";
      adValoremCourtFee = Math.ceil(netEstateValue * 0.04);
    }
  } else {
    // Schedule I, Article 11 (Probate or Letters of Administration in Delhi)
    if (netEstateValue <= 1000) {
      statutoryRatePercent = 0;
      slabLabel = "0% Exempt (Net Estate Value up to Rs 1,000)";
      adValoremCourtFee = 0;
    } else if (netEstateValue <= 10000) {
      statutoryRatePercent = 2.0;
      slabLabel = "2.0% Ad Valorem (Slab: Rs 1,001 to Rs 10,000)";
      adValoremCourtFee = Math.ceil(netEstateValue * 0.02);
    } else if (netEstateValue <= 50000) {
      statutoryRatePercent = 2.5;
      slabLabel = "2.5% Ad Valorem (Slab: Rs 10,001 to Rs 50,000)";
      adValoremCourtFee = Math.ceil(netEstateValue * 0.025);
    } else {
      statutoryRatePercent = 4.0;
      slabLabel = "4.0% Uncapped Ad Valorem (Net Estate Above Rs 50,000)";
      adValoremCourtFee = Math.ceil(netEstateValue * 0.04);
    }
  }

  // Initial nominal fixed filing fee (Schedule II Article 1) & surety bond info
  const initialPetitionStamp = 25; // Nominal fixed application fee at institution
  const estimatedCitationLow = 3500;
  const estimatedCitationHigh = 7500;

  // Forum & Jurisdiction Logic
  const complexInfo = DISTRICT_COMPLEXES[districtComplex];
  let courtForumLabel = isSuccessionCert
    ? `Administrative Civil Judge (ACJ) - ${complexInfo.name}`
    : `District Judge / ADJ - ${complexInfo.name}`;
  let forumNote = "";

  if (isSuccessionCert) {
    forumNote =
      "Under Section 371 of the Indian Succession Act, 1925, Succession Certificates are filed exclusively before the Administrative Civil Judge (ACJ) in the District Court, regardless of whether securities exceed Rs 2 crore.";
  } else if (netEstateValue > 20000000) {
    courtForumLabel = `District Judge (${complexInfo.name}) OR Delhi High Court Original Side`;
    forumNote =
      "The Rs 2 crore civil suit threshold does not bar the District Judge from granting Probate or LOA. However, for estates above Rs 2 crore or multi-state assets, petitioners may also file on the Original Side of the Delhi High Court.";
  } else {
    forumNote =
      "File under Section 276 (Probate) or Section 278 (Letters of Administration) before the District Judge having local control where the deceased lived or held property.";
  }

  // Timeline estimate
  let estimatedTimeline = "";
  if (isSuccessionCert) {
    estimatedTimeline = isContested ? "12 to 24 Months (Contested Trial)" : "4 to 7 Months (Uncontested)";
  } else {
    estimatedTimeline = isContested
      ? "18 to 36+ Months (Converted to Regular Civil Suit)"
      : "6 to 12 Months (Including SDM Valuation Report)";
  }

  // Mandatory vs Optional probate note
  const probateMandatoryStatus =
    petitionType === "probate"
      ? willLocationRule === "metro_asset"
        ? "Mandatory Under Section 213 ISA (Property/Will Linked to Mumbai, Kolkata, or Chennai)"
        : "Optional in Delhi Under Section 213 & Kanta Yadav Ruling (Unless Demanded by Bank/Buyer)"
      : petitionType === "letters_of_administration"
      ? "Required When Deceased Left No Will or No Named Executor (Sec 278 ISA)"
      : "Required by Banks/Depositories When Movable Assets Have No Nominee or High Value";

  // Comparison savings vs Maharashtra Rs 75,000 cap (educational benchmark)
  const maharashtraComparisonCap = 75000;
  const excessOverCap = Math.max(0, adValoremCourtFee - maharashtraComparisonCap);

  const copyClauseToClipboard = () => {
    const clauseText = `SCHEDULE III (SECTION 19-I) VALUATION SUMMARY NOTE FOR DELHI PROBATE PETITION
1. Court Forum: ${courtForumLabel}
2. Petition Category: ${
      petitionType === "probate"
        ? "Probate Petition under Section 276, Indian Succession Act, 1925"
        : petitionType === "letters_of_administration"
        ? "Letters of Administration under Section 278, Indian Succession Act, 1925"
        : petitionType === "succession_initial"
        ? "Succession Certificate Petition under Section 372, Indian Succession Act, 1925"
        : "Extension of Succession Certificate under Section 376, Indian Succession Act, 1925"
    }
3. Gross Estate / Asset Value Listed (Annexure A): ${formatINR(grossEstate)}
4. Deductible Debts & Funeral Costs (Annexure B): ${formatINR(effectiveDeductions)}
5. Net Assessable Estate Value: ${formatINR(netEstateValue)}
6. Applicable Statutory Provision: ${statutoryProvision} (${statutoryRatePercent}%)
7. Estimated Ad Valorem e-Court Fee (SHCIL Delhi): ${formatINR(adValoremCourtFee)}
8. Payment Stage: Initial fixed fee (${formatINR(initialPetitionStamp)}) at filing; full ad valorem e-Court Fee paid after SDM valuation & grant order.`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: DELHI DISTRICT COURT PROBATE & SUCCESSION PETITION
1. Original Municipal Death Certificate of the deceased (MCD / NDMC / Delhi Cantt).
2. Original Last Will & Testament (mandatory for Probate under Sec 276 ISA).
3. Affidavit of at least one Attesting Witness verifying Will execution (Sec 281 ISA).
4. List of Class I Legal Heirs / Near Relations with full Delhi addresses for court notice.
5. Schedule of Assets (Annexure A): Sale Deed, Conveyance Deed, DDA/MCD records, Bank Passbooks, FD receipts, Demat statements.
6. Schedule of Debts & Funeral Costs (Annexure B) for net estate deduction (Probate/LOA).
7. Surviving Member Certificate (SMC) issued by Delhi Revenue Department (SDM / e-District).
8. No Objection Certificate (NOC) affidavits from non-contesting legal heirs (speeds up grant).
9. Petitioner's Aadhaar, PAN, and local Delhi address proof.
10. Administration / Indemnity Bond & Surety Bond on SHCIL e-Stamp paper (Sec 291 / Sec 375).
11. SHCIL e-Court Fee Receipt deposited once the court approves final estate valuation.`;
    navigator.clipboard.writeText(checklistText);
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
            <span>COURT FEES ACT, 1870 (DELHI) • SCHEDULE I ARTICLES 11 &amp; 12</span>
          </div>

          {/* Strict Single H1 Tag (56 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Delhi District Court Probate &amp; Succession Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact Delhi e-court fees for Probate, Letters of Administration, and
            Succession Certificates. Check uncapped 4% and 2.5% rates, SDM valuation rules, and
            your right Delhi court complex in seconds.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Delhi Court Fee</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Dispute-Free Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4% Uncapped</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ARTICLE 11 PROBATE &amp; LOA FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2.5% Initial</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ARTICLE 12 SUCCESSION CERT (4% EXT)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">No Upper Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2012 HIKE STRUCK DOWN IN 2013
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Optional Will</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PROBATE NOT MANDATORY IN DELHI
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
                <span>Delhi Statutory Basis</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on Schedule I Articles 11 and 12 of the Court Fees Act, 1870 as applied in
                NCT of Delhi, Indian Succession Act, 1925, and Delhi District Courts rules.
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
                <span>EXECUTIVE BRIEF: DELHI COURT PROBATE &amp; SUCCESSION FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>4% Uncapped Probate &amp; LOA Fee:</strong> Under Schedule I, Article
                    11 of the Court Fees Act, 1870 in Delhi, Probate and Letters of Administration
                    cost 4% on net estate values over Rs 50,000. There is no upper ceiling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2.5% Initial Succession Fee (4% on Extension):</strong> Under Schedule
                    I, Article 12 and the Delhi District Courts handbook, an initial Succession
                    Certificate for bank cash or shares costs 2.5%. Adding missed assets later
                    under Section 376 costs 4%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Upfront Ad Valorem Payment for Probate:</strong> You pay only a
                    small fixed fee when filing a probate case. Under Section 19-I, you deposit the
                    4% SHCIL e-Court Fee only after the SDM valuation report and court order.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Probate Is Optional in Delhi:</strong> Under Sections 57 and 213 of the
                    Indian Succession Act, Hindus, Sikhs, Jains, and Buddhists do not need probate
                    for Delhi properties unless a Will is challenged or an agency insists on it.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE - 54 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Delhi Probate &amp; Succession Court Fee Law (1870 Act)
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Court fees in Delhi follow the central Court Fees Act, 1870 as applied to the
                  National Capital Territory of Delhi. Two parts of Schedule I set the exact fee
                  for estate transfers. Article 11 governs Probate and Letters of Administration.
                  Article 12 governs Succession Certificates.
                </p>
                <p>
                  In 2012, the Delhi assembly passed the Court Fees (Delhi Amendment) Act, 2012 to
                  raise fees steeply. On October 9, 2013, the Delhi High Court struck down that law
                  in <em>Delhi High Court Bar Association v. Govt. of NCT of Delhi</em>. The court
                  held that the hike hurt access to justice under Article 21.
                </p>
                <p>
                  As a result, the earlier Delhi fee structure remains in force today. Unlike
                  Maharashtra, which caps probate court fees at Rs 75,000, Delhi places no maximum
                  limit on ad valorem fees. That makes accurate asset valuation and lawful debt
                  deductions vital before you file in a Delhi District Court.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DELHI COURT FEE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Delhi District Court Probate &amp; Succession Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your petition type, enter estate asset values, and choose your Delhi court
                zone. Get an instant breakdown of SHCIL e-Court Fees, filing stage rules, and court
                jurisdiction.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Petition Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Delhi Court Petition Type</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "probate",
                        label: "Probate of Will (Sec 276)",
                        desc: "Executor proves a valid Will for flats, land, and bank assets (Art. 11 - 4%)",
                      },
                      {
                        id: "letters_of_administration",
                        label: "Letters of Administration (Sec 278)",
                        desc: "No Will exists or no executor is named; covers real estate & cash (Art. 11 - 4%)",
                      },
                      {
                        id: "succession_initial",
                        label: "Succession Certificate - Initial (Sec 372)",
                        desc: "Only for movable debts & securities: bank FDs, shares, PPF (Art. 12 - 2.5%)",
                      },
                      {
                        id: "succession_extension",
                        label: "Succession Certificate - Extension (Sec 376)",
                        desc: "Adding newly found bank accounts or shares to an old grant (Art. 12 - 4%)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPetitionType(opt.id as PetitionType)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
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

                {/* Step 2: Estate Valuation Inputs */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Enter Asset Values &amp; Deductible Debts (INR)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Immovable Property Value */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="immovable-value"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Immovable Property (Circle Rate / Market Value)
                      </label>
                      <input
                        id="immovable-value"
                        type="number"
                        min={0}
                        step={50000}
                        disabled={isSuccessionCert}
                        value={isSuccessionCert ? "0" : immovableValue}
                        onChange={(e) => setImmovableValue(e.target.value)}
                        placeholder="e.g. 12000000"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold outline-none transition-colors ${
                          isSuccessionCert
                            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-white border-slate-300 text-slate-900 focus:border-[#C65378]"
                        }`}
                      />
                      <p className="text-[11px] text-slate-500">
                        {isSuccessionCert
                          ? "Excluded: Succession Certificates cannot cover land or flats."
                          : `Entered: ${formatINR(parsedImmovable)}`}
                      </p>
                    </div>

                    {/* Movable Assets Value */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="movable-value"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {petitionType === "succession_extension"
                          ? "Value of Newly Added Debts & Securities"
                          : "Movable Assets (Bank FDs, Shares, PPF, Cash)"}
                      </label>
                      <input
                        id="movable-value"
                        type="number"
                        min={0}
                        step={25000}
                        value={movableValue}
                        onChange={(e) => setMovableValue(e.target.value)}
                        placeholder="e.g. 2500000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-bold outline-none focus:border-[#C65378]"
                      />
                      <p className="text-[11px] text-slate-500">
                        Entered: {formatINR(parsedMovable)}
                      </p>
                    </div>

                    {/* Deductible Liabilities (Schedule III Annexure B) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="deductible-debts"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Deductible Loans &amp; Funeral Costs (Annexure B)
                      </label>
                      <input
                        id="deductible-debts"
                        type="number"
                        min={0}
                        step={10000}
                        disabled={isSuccessionCert}
                        value={isSuccessionCert ? "0" : deductibleLiabilities}
                        onChange={(e) => setDeductibleLiabilities(e.target.value)}
                        placeholder="e.g. 500000"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold outline-none transition-colors ${
                          isSuccessionCert
                            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-white border-slate-300 text-slate-900 focus:border-[#C65378]"
                        }`}
                      />
                      <p className="text-[11px] text-slate-500">
                        {isSuccessionCert
                          ? "Applies only to Probate/LOA Schedule III deductions."
                          : `Deducted: ${formatINR(effectiveDeductions)}`}
                      </p>
                    </div>
                  </div>

                  {/* Quick Preset Valuation Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Quick Presets:
                    </span>
                    {[
                      { label: "Rs 20 Lakh Bank FDs", imm: "0", mov: "2000000", debt: "0" },
                      { label: "Rs 85 Lakh DDA Flat", imm: "8500000", mov: "500000", debt: "200000" },
                      {
                        label: "Rs 1.5 Cr South Delhi Floor",
                        imm: "15000000",
                        mov: "1500000",
                        debt: "500000",
                      },
                      {
                        label: "Rs 3.5 Cr High-Value Estate",
                        imm: "30000000",
                        mov: "5000000",
                        debt: "1000000",
                      },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setImmovableValue(preset.imm);
                          setMovableValue(preset.mov);
                          setDeductibleLiabilities(preset.debt);
                        }}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-[11px] font-bold text-slate-700 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Delhi District Complex & Case Factors */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="delhi-complex"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-[#C65378]" />
                        <span>Step 3: Select Delhi District Court Zone</span>
                      </label>
                      <select
                        id="delhi-complex"
                        value={districtComplex}
                        onChange={(e) =>
                          setDistrictComplex(e.target.value as DelhiDistrictComplex)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-bold outline-none focus:border-[#C65378]"
                      >
                        {Object.entries(DISTRICT_COMPLEXES).map(([key, item]) => (
                          <option key={key} value={key}>
                            {item.name} ({item.districts.split("(")[0].trim()})
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Covers: {complexInfo.districts}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#C65378]" />
                        <span>Step 4: Case Complexity &amp; Asset Scope</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsContested(false)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            !isContested
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">Uncontested (NOC)</div>
                          <div className="text-[11px] text-slate-600">All heirs give consent</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsContested(true)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isContested
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">Contested / Caveat</div>
                          <div className="text-[11px] text-slate-600">Objection filed by heir</div>
                        </button>
                      </div>
                      {petitionType === "probate" && (
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setWillLocationRule("delhi_only")}
                            className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all ${
                              willLocationRule === "delhi_only"
                                ? "border-[#C65378] bg-rose-50/50 text-[#C65378]"
                                : "border-slate-200 text-slate-700"
                            }`}
                          >
                            Delhi Assets Only
                          </button>
                          <button
                            type="button"
                            onClick={() => setWillLocationRule("metro_asset")}
                            className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all ${
                              willLocationRule === "metro_asset"
                                ? "border-[#C65378] bg-rose-50/50 text-[#C65378]"
                                : "border-slate-200 text-slate-700"
                            }`}
                          >
                            Also Mumbai / Kolkata / Chennai
                          </button>
                        </div>
                      )}
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
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Card)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        {statutoryProvision}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {formatINR(adValoremCourtFee)}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">{slabLabel}</div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 text-xs font-bold text-emerald-300 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                      <span>SHCIL e-Court Fee (Delhi)</span>
                    </div>
                  </div>

                  {/* 4 Key Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        NET ASSESSABLE VALUE
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {formatINR(netEstateValue)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Gross {formatINR(grossEstate)} minus {formatINR(effectiveDeductions)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        INITIAL FILING STAMP
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-300">
                        {formatINR(initialPetitionStamp)} Nominal
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {isSuccessionCert
                          ? "Fee deposited per Sec 379 before grant"
                          : "4% paid only after SDM report & grant"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ESTIMATED TIMELINE
                      </div>
                      <div className="text-sm sm:text-base font-black text-white leading-snug">
                        {estimatedTimeline}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Est. newspaper notice: {formatINR(estimatedCitationLow)} to{" "}
                        {formatINR(estimatedCitationHigh)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        CORRECT DELHI FORUM
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {courtForumLabel}
                      </div>
                      <div className="text-[11px] text-slate-400">NCT of Delhi Jurisdiction</div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Applicability &amp; Court Guidance:</span>
                    </div>
                    <p>
                      <strong>Requirement Check:</strong> {probateMandatoryStatus}.
                    </p>
                    <p>
                      <strong>Forum Rule:</strong> {forumNote}
                    </p>
                    {excessOverCap > 0 && !isSuccessionCert && (
                      <div className="pt-2 text-amber-200 font-semibold border-t border-white/10">
                        <strong>Uncapped Delhi Alert:</strong> Because Delhi has no Rs 75,000 cap
                        like Mumbai, your court fee is {formatINR(excessOverCap)} higher than
                        Maharashtra&rsquo;s cap. Verify first whether mutation or society transfer
                        can proceed without probate under Section 213.
                      </div>
                    )}
                    {petitionType === "succession_extension" && (
                      <div className="pt-2 text-amber-200 font-semibold border-t border-white/10">
                        <strong>4% Extension Cost Notice:</strong> Extending a Delhi Succession
                        Certificate under Section 376 costs 4% instead of 2.5%. List every bank
                        account, FD, PPF, and share folio in the first petition to save 1.5%.
                      </div>
                    )}
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help filing in Saket, Tis Hazari, Patiala House, or Delhi High Court?
                    </div>
                    <Link
                      href="/services/probate-lawyer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Consult Delhi Probate Counsel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT (OG Image with explicit 1200x630 dimensions) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>DELHI COURT PROBATE &amp; SUCCESSION FEE GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Court Fees Act, 1870
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/delhi-district-court-probate-succession-fee-calculator-og.jpg"
                  alt="Delhi District Court Probate and Succession Fee Calculator Guide"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Schedule I Articles 11 and 12 fee structure across Delhi District Courts and Delhi
                High Court.
              </p>
            </div>

            {/* SECTION 3: ARTICLE 11 SLABS (PROBATE & LOA) */}
            <section id="article-11-slabs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SCHEDULE I, ARTICLE 11 (DELHI)</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 11 Slabs: Delhi Probate &amp; LOA Court Fees
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Article 11 of Schedule I sets the court fee for Probate of a Will (Section 276)
                  and Letters of Administration (Section 278). Under Delhi&rsquo;s statutory text,
                  the percentage applies to the entire net estate value once a bracket is crossed.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5 font-extrabold">Net Estate Valuation Bracket</th>
                        <th className="p-3.5 font-extrabold text-rose-200">Delhi Article 11 Rate</th>
                        <th className="p-3.5 font-extrabold text-emerald-300">Maximum Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Up to Rs 1,000</td>
                        <td className="p-3.5">Nil (Exempt)</td>
                        <td className="p-3.5">Rs 0</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Rs 1,001 to Rs 10,000</td>
                        <td className="p-3.5 font-semibold">2% on total net value</td>
                        <td className="p-3.5">No Cap</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-bold text-slate-900">Rs 10,001 to Rs 50,000</td>
                        <td className="p-3.5 font-semibold">2.5% on total net value</td>
                        <td className="p-3.5">No Cap</td>
                      </tr>
                      <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                        <td className="p-3.5 font-bold text-slate-900">Exceeding Rs 50,000</td>
                        <td className="p-3.5 font-extrabold text-[#C65378]">
                          4% on full net estate value
                        </td>
                        <td className="p-3.5 font-bold text-rose-700">No Upper Ceiling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Because nearly every Delhi flat, plot, or bank portfolio exceeds Rs 50,000, the
                  working probate court fee in Delhi is 4% of the net estate value. Remember to
                  deduct home loans, personal debts, and funeral costs under Annexure B first.
                </p>
              </div>
            </section>

            {/* SECTION 4: ARTICLE 12 RATES (SUCCESSION CERTIFICATE) */}
            <section id="article-12-slabs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SCHEDULE I, ARTICLE 12 (DELHI)</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Article 12 Rates: Delhi Succession Certificate Fees
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Succession Certificate under Part X (Sections 370 to 390) of the Indian
                  Succession Act covers only movable debts and securities. You can use it for bank
                  accounts, fixed deposits, shares, mutual funds, PPF, and insurance claims. You
                  cannot use it to transfer a house, flat, or plot.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Initial Grant (Section 374 ISA)
                    </div>
                    <div className="text-2xl font-black text-slate-900">2.5% Ad Valorem</div>
                    <p className="text-slate-600 leading-relaxed">
                      Per the official Delhi District Courts handbook, the court charges 2.5% on
                      the total value of debts and securities listed in the first petition.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Extension Grant (Section 376 ISA)
                    </div>
                    <div className="text-2xl font-black text-slate-900">4.0% Ad Valorem</div>
                    <p className="text-slate-600 leading-relaxed">
                      If you discover a missed bank FD or demat holding later, extending the
                      certificate costs 4% on the added value. Always audit all accounts before
                      filing.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Indemnity &amp; Surety Bond Under Section 375</span>
                  </div>
                  <p className="leading-relaxed">
                    Along with the 2.5% court fee, the Administrative Civil Judge requires an
                    indemnity bond and one sound surety bond matching the asset value. The surety
                    must show proof of solvency, such as a Delhi property paper or fixed deposit.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: DISTRICT COURT VS HIGH COURT JURISDICTION */}
            <section id="jurisdiction-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>DELHI PECUNIARY &amp; TERRITORIAL RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. District Court vs High Court Jurisdiction in Delhi
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families think estates over Rs 2 crore must go to the Delhi High Court. That
                  rule applies to regular civil suits under Section 5(2) of the Delhi High Court
                  Act, 1966. It does not strip Delhi District Courts of testamentary power.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Succession Certificate
                    </div>
                    <div className="font-bold text-slate-800">Only District Court (ACJ)</div>
                    <p className="text-slate-600 leading-relaxed">
                      Filed strictly before the Administrative Civil Judge in the territorial
                      District Court, even if shares or FDs exceed Rs 2 crore.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Probate &amp; LOA (Any Value)
                    </div>
                    <div className="font-bold text-slate-800">District Judge / ADJ</div>
                    <p className="text-slate-600 leading-relaxed">
                      Delhi District Courts hear Probate and Letters of Administration cases of any
                      value where the deceased lived or owned property.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Concurrent High Court Option
                    </div>
                    <div className="font-bold text-slate-800">Delhi High Court Original Side</div>
                    <p className="text-slate-600 leading-relaxed">
                      Also holds concurrent probate power under Section 300 ISA. Often used for
                      complex multi-state estates or high-value Will disputes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: IS PROBATE MANDATORY IN DELHI? */}
            <section id="probate-optional-delhi" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTIONS 57 &amp; 213 INDIAN SUCCESSION ACT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Is Probate Mandatory in Delhi? Supreme Court Law
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before paying a 4% uncapped court fee in Delhi, check whether you legally need
                  probate at all. Under Section 213 read with Section 57 of the Indian Succession
                  Act, 1925, mandatory probate applies only to Wills made in or covering immovable
                  property in Mumbai, Kolkata, or Chennai.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Settled Precedent: Kanta Yadav v. Om Prakash Yadav (SC)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Supreme Court and the Delhi High Court consistently hold that probate is
                    not compulsory in Delhi for Wills executed by Hindus, Sikhs, Jains, or
                    Buddhists. Beneficiaries can apply directly for DDA, MCD, or L&amp;DO mutation
                    using the Will, death certificate, and NOC from other legal heirs.
                  </p>
                </div>
                <p>
                  When should you still file for voluntary probate in Delhi? File when a legal heir
                  disputes the Will, a bank or housing society refuses transfer without a court
                  seal, or a property buyer insists on a judicially proven title.
                </p>
              </div>
            </section>

            {/* SECTION 7: SDM VALUATION & PAYMENT TIMING */}
            <section id="valuation-timing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>SECTION 19-H &amp; 19-I COURT FEES ACT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. SDM Valuation Report &amp; When to Pay Court Fees
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many petitioners worry about paying lakhs in court fees on day one. In{" "}
                  <em>Praveena Bhardwaj v. State</em>, the Delhi High Court clarified Section 19-I
                  of the Court Fees Act. You do not pay the 4% probate fee when filing your
                  petition.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Day 1 (Institution):</strong> Pay only a nominal fixed application
                    stamp under Schedule II Article 1 (typically Rs 25 plus process fees).
                  </li>
                  <li>
                    <strong>Middle Stage (Section 19-H SDM Notice):</strong> The court sends a
                    notice to the Chief Controlling Revenue Authority / concerned SDM. The SDM
                    checks Delhi Circle Rates (Categories A to H) and files a Property Valuation
                    Report in court.
                  </li>
                  <li>
                    <strong>Final Stage (Before Sealing Grant):</strong> Once the judge approves
                    the Will and accepts the SDM valuation, you buy the exact 4% e-Court Fee online
                    via SHCIL and file it with the court reader to receive the sealed grant.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DELHI ESTATE REMEDY MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Probate vs LOA vs Succession
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare Delhi court fees, eligible assets, court forums, and bonding rules before
                choosing your petition.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Parameter</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Probate (Sec 276)</th>
                      <th className="p-3.5 font-extrabold text-amber-200">
                        Letters of Admin (Sec 278)
                      </th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Succession Cert (Sec 372)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Will Needed?</td>
                      <td className="p-3.5">Yes, valid Will naming an executor</td>
                      <td className="p-3.5">No Will (intestate) or no named executor</td>
                      <td className="p-3.5">Used mainly when there is no Will</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Assets Covered</td>
                      <td className="p-3.5">Flats, land, plots &amp; movable assets</td>
                      <td className="p-3.5">Flats, land, plots &amp; movable assets</td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        Movable debts &amp; securities only (No land/flats)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Delhi Court Fee</td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        4% above Rs 50k (Uncapped, Art. 11)
                      </td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        4% above Rs 50k (Uncapped, Art. 11)
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        2.5% initial / 4% extension (Art. 12)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Delhi Court Forum</td>
                      <td className="p-3.5">District Judge / ADJ or Delhi HC</td>
                      <td className="p-3.5">District Judge / ADJ or Delhi HC</td>
                      <td className="p-3.5">Administrative Civil Judge (ACJ) only</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Valuation Authority</td>
                      <td className="p-3.5">SDM Circle Rate Report (Sec 19-H)</td>
                      <td className="p-3.5">SDM Circle Rate Report (Sec 19-H)</td>
                      <td className="p-3.5">Bank / Depository Balance Certificate</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Mandatory in Delhi?</td>
                      <td className="p-3.5">No for Hindus/Sikhs/Jains (Sec 213)</td>
                      <td className="p-3.5">Needed if title/mutation is blocked</td>
                      <td className="p-3.5">Needed when bank/shares lack nominee</td>
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
                  <span>TRANSFERRING DELHI PROPERTY AMONG CO-HEIRS?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Check Delhi Gift Deed vs Rs 100 Relinquishment Deed Duty
                </div>
                <p className="text-xs text-slate-600">
                  When heirs agree after an intestate death in Delhi, a registered Relinquishment
                  Deed can often save lakhs compared to court litigation.
                </p>
              </div>
              <Link
                href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Delhi Stamp Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP DELHI FILING PROCESS */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>DELHI DISTRICT COURT PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Delhi Court Filing Process (6 Steps)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this six-step workflow to file your Probate, Letters of Administration, or
                  Succession Certificate petition cleanly in any Delhi District Court:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Verify Jurisdiction & Audit Every Asset",
                      desc: "Identify the Delhi court complex covering the deceased's last residence or property address. Collect exact bank balances, FD maturity amounts, share folios, and property deeds so nothing is left out.",
                    },
                    {
                      title: "Draft Petition with Schedule III Annexures",
                      desc: "Prepare the verified petition under Section 276, 278, or 372 of the Indian Succession Act. Attach Annexure A (list of assets), Annexure B (deductible debts for Probate/LOA), and the attesting witness affidavit.",
                    },
                    {
                      title: "e-Filing & Initial Nominal Court Stamp",
                      desc: "File the petition via the Delhi District Court e-Filing portal with the nominal initial court fee stamp. Pay only the fixed institution fee at this step.",
                    },
                    {
                      title: "Newspaper Publication & Notice to Legal Heirs",
                      desc: "The court issues notice to all Class I legal heirs and orders a public notice in a Delhi newspaper (typically 30 to 45 days for objections). Collect signed NOC affidavits from supporting relatives.",
                    },
                    {
                      title: "SDM Valuation Report & Witness Evidence",
                      desc: "For immovable properties, the SDM submits the Circle Rate valuation report under Section 19-H. At least one attesting witness appears in court to prove the Will under Section 68 BSA 2023.",
                    },
                    {
                      title: "Deposit SHCIL e-Court Fee & Surety Bond",
                      desc: "Once the judge passes the final judgment, pay the exact 4% or 2.5% e-Court Fee on the SHCIL portal and file the Administration/Indemnity and Surety Bond to collect the sealed certificate.",
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
                <span>WORKED DELHI FEE EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Delhi Estate Fee Case Studies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Saket */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Saket Court Probate</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Article 11
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    South Delhi Flat Worth Rs 1.80 Cr with Rs 20 L Loan
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An executor files Probate in Saket Court. SDM values
                    the flat at Rs 1.80 crore. The deceased owed Rs 20 lakh on a verified bank
                    mortgage listed in Annexure B.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Fee Outcome:</strong> Net estate value is Rs 1.60 crore. At 4% under
                    Article 11, the SHCIL e-Court Fee is Rs 6,40,000. Deducting the loan saved Rs
                    80,000 in court fees.
                  </p>
                </div>

                {/* Case 2: Tis Hazari */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Tis Hazari ACJ</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Article 12
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Rs 40 Lakh Bank FDs &amp; Shares (No Nominee)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A retired officer in Rajouri Garden dies without a Will
                    leaving Rs 25 lakh in bank FDs and Rs 15 lakh in demat shares without a
                    registered nominee.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Fee Outcome:</strong> Heirs apply for a Succession Certificate before
                    the ACJ at Tis Hazari. At 2.5% under Article 12, the court fee is Rs 1,00,000
                    plus surety bond.
                  </p>
                </div>

                {/* Case 3: Dwarka Extension */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Dwarka Extension</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Section 376
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Forgotten Rs 10 Lakh PPF Account Added Later
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Six months after receiving a Succession Certificate in
                    Dwarka Court, the family discovers an older Rs 10 lakh PPF passbook in another
                    branch.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Fee Outcome:</strong> An extension under Section 376 attracts 4% (Rs
                    40,000) instead of 2.5% (Rs 25,000). A complete pre-filing asset search saves
                    Rs 15,000.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SUMMARY TEMPLATE & DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>FILING READY WORKSHEET</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Petition Valuation Summary &amp; Document Checklist
              </h3>

              {/* Box 1: Live Calculation Valuation Note */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Schedule III Court Fee Summary Sheet (Synced to Your Inputs)
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
                  >
                    {copiedClause ? (
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
{`DELHI COURT FEE VALUATION NOTE (COURT FEES ACT, 1870)
Forum: ${courtForumLabel}
Statutory Rule: ${statutoryProvision} (${statutoryRatePercent}%)
Gross Assets Listed (Annexure A): ${formatINR(grossEstate)}
Deductible Liabilities (Annexure B): ${formatINR(effectiveDeductions)}
Net Assessable Value: ${formatINR(netEstateValue)}
Estimated SHCIL e-Court Fee: ${formatINR(adValoremCourtFee)}`}
                </pre>
              </div>

              {/* Box 2: Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Mandatory Document Checklist for Delhi District Courts
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
                    "Original MCD / NDMC Death Certificate of deceased",
                    "Original signed Will (for Probate under Sec 276)",
                    "Attesting Witness Affidavit (Section 281 ISA)",
                    "Delhi e-District Surviving Member Certificate (SMC)",
                    "List of Class I Legal Heirs with current addresses",
                    "NOC Affidavits from non-contesting relatives",
                    "Property Sale Deed / Conveyance Deed / DDA Allotment",
                    "Latest Bank Balance, FD, PPF & Demat Statements",
                    "Proof of Home Loan / Debt for Annexure B deduction",
                    "SHCIL e-Stamp Surety Bond & e-Court Fee Receipt",
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
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
                12. Institutional Profile: Delhi Estate Counsel
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Delhi Probate &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is backed by AMA Legal Solutions. Our Delhi civil and testamentary
                  lawyers appear daily before Saket, Tis Hazari, Patiala House, Karkardooma,
                  Rohini, Dwarka District Courts, and the Delhi High Court. We handle uncontested
                  grants, SDM valuation queries, and contested Will trials.
                </p>

                {/* Internal Service & Tool Links Grid */}
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
                    <span>Succession Cert</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/letters-of-administration-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>LOA Counsel</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker</span>
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
                13. Frequently Asked Questions: Delhi Court Fees
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

            {/* SECTION 14: STATUTORY CITATIONS & RELATED LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations &amp; Official Delhi Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All Delhi fee slabs, filing rules, and case references on this page rely on
                  official Indian statutes and judicial portals. This tool provides general legal
                  information and does not substitute for individualized counsel on your documents.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Court Fees Act 1870 &amp; ISA 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://delhidistrictcourts.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Delhi District Courts Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://delhihighcourt.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>High Court of Delhi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.shcilestamp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>SHCIL Online e-Court Fee (Delhi)</span>
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
                    Related WillDrafting Tools, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Heir vs Succession Tool
                    </Link>
                    <Link
                      href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Gift &amp; Relinquishment Duty
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Attesting Witness Affidavit Format
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heirs NOC Format
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Format India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain-English Bottom Helper Strip (Matches Reference Page) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Plan Ahead in Delhi?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Delhi charges an uncapped 4% probate fee when a Will goes to court. Clear
                  nominations and a well-drafted registered Will help your family avoid long court
                  delays and high costs.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Pay Online via SHCIL</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You do not need physical stamp papers for high court fees in Delhi. Pay exact
                  fees safely through the SHCIL e-Court Fee portal only when the judge orders the
                  grant.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Delhi advocates review your Will, check if mutation works without probate,
                  file your petition, and track SDM valuation reports through final grant release.
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
                Specializes in Delhi District Court probate petitions, ACJ succession certificates,
                SDM valuation compliance, and High Court testamentary defense.
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
                  <span>AVOID 4% UNNECESSARY COURT FEES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Clear Delhi Will That Avoids Court Fights
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Probate is optional in Delhi when your Will is clear and undisputed. Protect your
                  family with a lawyer-reviewed Will today.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Section 63 Compliant &amp; Lawyer Checked</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>DELHI COURT FILING DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Delhi Probate or Succession Certificate?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Delhi advocates handle filing across Saket, Tis Hazari, Patiala House,
                  Karkardooma, Rohini, Dwarka, and Delhi High Court.
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
                  Why Delhi Families Trust Us
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Statutory Rates:</strong> Grounded in Schedule I Articles 11
                      and 12 for NCT of Delhi.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Lawful Debt Deductions:</strong> Applies Schedule III Annexure B
                      offsets to lower fees legally.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>End-to-End Court Support:</strong> Covers SDM reports, citations,
                      surety bonds, and SHCIL e-fees.
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
