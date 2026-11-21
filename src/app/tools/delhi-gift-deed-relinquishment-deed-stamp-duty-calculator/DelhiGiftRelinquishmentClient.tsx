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
  Users,
  FileText,
  Layers,
  IndianRupee,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Delhi Stamp Duty: Gift Deed vs Relinquishment" },
  { id: "interactive-calculator", label: "2. Interactive Gift vs Relinquishment Calculator" },
  { id: "gender-concession", label: "3. Gender Concession: 4% Women vs 6% Men Duty" },
  { id: "relinquishment-rule", label: "4. Relinquishment Deed: Rs 100 to Rs 200 Rule" },
  { id: "circle-rate-guide", label: "5. Delhi Circle Rate Guide: Categories A to H" },
  { id: "reclassification-trap", label: "6. Reclassification Trap: Release vs Gift" },
  { id: "comparison-table", label: "7. Legal Comparison: Gift vs Relinquishment" },
  { id: "doris-ngdrs-checklist", label: "8. DORIS & NGDRS Delhi Sub-Registrar Checklist" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: DDA, South Delhi, Rohini" },
  { id: "legal-recital-templates", label: "10. Copyable Deed Recital & DORIS Checklist" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Delhi Stamp Duty" },
  { id: "statutory-citations", label: "13. Legal Citations & Statutory Portals" },
];

const CIRCLE_CATEGORIES: Record<
  string,
  { label: string; ratePerSqm: number; localities: string }
> = {
  A: {
    label: "Category A",
    ratePerSqm: 774000,
    localities: "Vasant Vihar, Golf Links, Jor Bagh, Shanti Niketan",
  },
  B: {
    label: "Category B",
    ratePerSqm: 245520,
    localities: "Defence Colony, Greater Kailash I & II, Hauz Khas, Green Park",
  },
  C: {
    label: "Category C",
    ratePerSqm: 159840,
    localities: "Lajpat Nagar, Kalkaji, Civil Lines, C.R. Park, Vasant Kunj",
  },
  D: {
    label: "Category D",
    ratePerSqm: 127680,
    localities: "Janakpuri, Karol Bagh, Dwarka, Alaknanda, GK Part III & IV",
  },
  E: {
    label: "Category E",
    ratePerSqm: 70080,
    localities: "Rohini, Chandni Chowk, Alipur, outer DDA flat pockets",
  },
  F: {
    label: "Category F",
    ratePerSqm: 56640,
    localities: "Govindpuri, Uttam Nagar, Dilshad Garden extension",
  },
  G: {
    label: "Category G",
    ratePerSqm: 46200,
    localities: "Sangam Vihar, Dakshinpuri, Deoli, Khanpur",
  },
  H: {
    label: "Category H",
    ratePerSqm: 23280,
    localities: "Regularized pockets and outer rural belts like Sultanpur Majra",
  },
};

const FAQS = [
  {
    q: "What is the stamp duty on a Gift Deed in Delhi for men and women?",
    a: "Delhi charges full conveyance stamp duty on Gift Deeds with no blood-relative discount. Base stamp duty is 4% for a female recipient, 6% for a male recipient, and 5% for joint male-female owners. Properties above Rs 25 lakh under MCD also attract 1% extra MCD transfer duty plus 1% registration fee.",
  },
  {
    q: "How much is the Relinquishment Deed stamp duty in Delhi?",
    a: "A Relinquishment Deed between existing legal co-heirs with zero cash payment costs a flat Rs 100 to Rs 200 in stamp duty. You also pay a Rs 1,000 registration fee and Rs 100 pasting fee at the Delhi Sub-Registrar office.",
  },
  {
    q: "Can I use a Relinquishment Deed to transfer my self-acquired DDA flat to my wife?",
    a: "No. If you are the sole living owner of a self-acquired DDA flat, your wife is not yet a co-owner. A Relinquishment Deed only works when both parties already hold joint legal shares. You must sign a registered Gift Deed and pay 4% women stamp duty plus MCD and registration fees.",
  },
  {
    q: "When does a Relinquishment Deed get treated as a Gift Deed in Delhi?",
    a: "The Sub-Registrar treats a Relinquishment Deed as a Gift Deed or Sale Deed if any money is paid, or if the share goes to someone who is not already a co-heir. In that case, full 4% to 7% duty applies on the Delhi Circle Rate.",
  },
  {
    q: "How are Delhi Circle Rates (Categories A to H) used for Gift Deeds?",
    a: "Delhi groups colonies into Categories A to H with fixed per-square-metre land rates. Stamp duty on a Gift Deed is calculated on the higher of your declared value or the official Circle Rate for that colony.",
  },
  {
    q: "What is the difference between DORIS and NGDRS in Delhi?",
    a: "DORIS Delhi lets you search registered property records from 2005 to January 2024. NGDRS Delhi is the active portal used to enter new deed details, verify SHCIL e-stamps, and book Sub-Registrar appointments.",
  },
];

function formatINR(amount: number): string {
  return "Rs " + Math.round(amount).toLocaleString("en-IN");
}

export default function DelhiGiftRelinquishmentClient() {
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

  // Interactive Calculator State
  const [transferGoal, setTransferGoal] = useState<
    "gift_female" | "gift_male" | "gift_joint" | "relinquish_coheir"
  >("gift_female");
  const [valuationMode, setValuationMode] = useState<"direct" | "circle_rate">("direct");
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // Rs 1 Crore default
  const [circleCategory, setCircleCategory] = useState<string>("D");
  const [areaSqm, setAreaSqm] = useState<number>(100);
  const [jurisdiction, setJurisdiction] = useState<"mcd" | "ndmc">("mcd");
  const [coHeirEligible, setCoHeirEligible] = useState<"valid_coheir" | "non_heir_or_paid">(
    "valid_coheir"
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
    setTransferGoal("gift_female");
    setValuationMode("direct");
    setPropertyValue(10000000);
    setCircleCategory("D");
    setAreaSqm(100);
    setJurisdiction("mcd");
    setCoHeirEligible("valid_coheir");
  };

  // Valuation Calculation
  const selectedCategoryInfo = CIRCLE_CATEGORIES[circleCategory] || CIRCLE_CATEGORIES.D;
  const computedCircleValue = selectedCategoryInfo.ratePerSqm * Math.max(10, areaSqm);
  const effectiveValue =
    valuationMode === "direct" ? Math.max(100000, propertyValue) : computedCircleValue;

  // Gift Deed Calculation (Delhi Schedule IA + MCD Transfer Duty)
  // Base Rate: 4% Women, 6% Men, 5% Joint
  // MCD Transfer Duty: +1% above Rs 25 Lakh under MCD jurisdiction
  const baseGiftRate =
    transferGoal === "gift_female" ? 0.04 : transferGoal === "gift_joint" ? 0.05 : 0.06;
  const mcdExtraRate = jurisdiction === "mcd" && effectiveValue > 2500000 ? 0.01 : 0;
  const giftStampDuty = effectiveValue * baseGiftRate;
  const giftMcdDuty = effectiveValue * mcdExtraRate;
  const giftRegFee = effectiveValue * 0.01 + 100; // 1% + Rs 100 pasting
  const totalGiftOutflow = giftStampDuty + giftMcdDuty + giftRegFee;

  // Relinquishment Deed Calculation (Article 55 Delhi)
  const isRelinquishValid = coHeirEligible === "valid_coheir";
  const relinqStampDuty = isRelinquishValid ? 200 : giftStampDuty + giftMcdDuty;
  const relinqRegFee = isRelinquishValid ? 1100 : giftRegFee; // Rs 1000 + Rs 100 pasting
  const totalRelinqOutflow = relinqStampDuty + relinqRegFee;

  const netSavings = Math.max(0, totalGiftOutflow - totalRelinqOutflow);

  let verdictTitle = "Gift Deed: 4% Women Concession Applies";
  let verdictBadge = "Lifetime Gift Transfer (Delhi)";
  let verdictNote =
    "Because the donee is female, you save 2% on base stamp duty compared to a male recipient. Remember that Delhi gives no family exemption for gifts, and 1% MCD duty applies above Rs 25 lakh.";

  if (transferGoal === "gift_male") {
    verdictTitle = "Gift Deed: 6% Male Stamp Duty Applies";
    verdictBadge = "Standard Male Donee Rate";
    verdictNote =
      "A Gift Deed to a son, husband, or brother attracts 6% base duty plus 1% MCD duty above Rs 25 lakh and 1% registration fee. Adding a female co-donee reduces the base rate to 5%.";
  } else if (transferGoal === "gift_joint") {
    verdictTitle = "Gift Deed: 5% Joint Owner Rate Applies";
    verdictBadge = "Joint Male + Female Rate";
    verdictNote =
      "Gifting jointly to a husband and wife or son and daughter-in-law attracts a blended 5% base stamp duty, plus 1% MCD duty above Rs 25 lakh and 1% registration fee.";
  } else {
    if (isRelinquishValid) {
      verdictTitle = "Relinquishment Deed: Flat Rs 100 to Rs 200 Duty";
      verdictBadge = "Co-Heir Release Eligible";
      verdictNote = `Because all parties are existing co-heirs with zero cash paid, you qualify for flat Rs 100 to Rs 200 stamp duty plus Rs 1,100 registration charges. You save ${formatINR(netSavings)} compared to a Gift Deed.`;
    } else {
      verdictTitle = "Warning: Reclassified as Gift or Sale Deed";
      verdictBadge = "Full Stamp Duty Triggered";
      verdictNote =
        "Paying cash or releasing a share to a non-heir voids the Rs 200 concession. The Delhi Sub-Registrar will charge full 4% to 7% stamp duty on the Circle Rate.";
    }
  }

  const copyClauseToClipboard = () => {
    const clauseText = `DELHI RELINQUISHMENT DEED NO-CONSIDERATION RECITAL CLAUSE
"AND WHEREAS the Releasor and the Releasee are the surviving Class I legal heirs of Late [Name of Deceased Owner], who died intestate on [Date of Death], leaving behind the Schedule Property.

NOW THIS DEED WITNESSETH that out of natural love and affection and WITHOUT ANY MONETARY CONSIDERATION whatsoever, the Releasor hereby releases, relinquishes, and surrenders all his/her undivided [Fraction, e.g., 1/3rd] share, title, and interest in the Schedule Property in favour of the Releasee, who is already a lawful co-owner thereof."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DELHI DORIS & NGDRS SUB-REGISTRAR APPOINTMENT CHECKLIST
1. Original Title Deed / DDA Conveyance Deed / Sale Deed of the property.
2. Death Certificate of the deceased owner (required for Relinquishment Deed).
3. Surviving Member Certificate (SMC) from the Delhi SDM office.
4. SHCIL Non-Judicial e-Stamp Paper (Rs 100-200 for Relinquishment; 4%-7% for Gift).
5. NGDRS Delhi Online Data Entry Slip and SRO Appointment Receipt.
6. Aadhaar Card and PAN Card of Donor/Releasor, Donee/Releasee, and 2 adult witnesses.
7. Registered Deed search printout from DORIS Delhi (2005-2024 records if needed).
8. Demand Draft or e-Payment receipt for Registration Fee (Rs 1,100 or 1% + Rs 100).`;
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
            <span>INDIAN STAMP ACT, 1899 • DELHI SCHEDULE IA &amp; MCD RULES</span>
          </div>

          {/* Strict H1 Tag (<= 70 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Delhi Gift vs Relinquishment Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compare Delhi Gift Deed stamp duty (4% women, 6% men plus 1% MCD duty) against the flat
            Rs 100 to Rs 200 Relinquishment Deed fee among legal co-heirs.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Duty Comparator</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4% / 6%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GIFT DUTY WOMEN VS MEN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">+1% MCD</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TRANSFER DUTY ABOVE 25L
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 100 - 200</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RELINQUISHMENT CO-HEIR DUTY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Category A-H</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DELHI CIRCLE RATE READY
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
                <span>Delhi Registry Rules</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the Indian Stamp Act, 1899 (Delhi Schedule IA), Registration Act Section
                17, and MCD Transfer Duty guidelines.
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
                <span>EXECUTIVE BRIEF: DELHI GIFT VS RELINQUISHMENT DUTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Blood-Relative Gift Discount in Delhi:</strong> Unlike UP or
                    Maharashtra, Delhi charges full stamp duty on Gift Deeds. Women pay 4% and men
                    pay 6% on the higher of market value or Circle Rate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>MCD Transfer Duty &amp; Registration Fee:</strong> Homes above Rs 25
                    lakh under MCD also pay 1% extra MCD transfer duty plus 1% registration fee and
                    Rs 100 pasting charges.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flat Rs 100 to Rs 200 Relinquishment Duty:</strong> Legal co-heirs who
                    inherit a joint home after a parent dies without a Will can release their share
                    for just Rs 100 to Rs 200 in stamp duty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Co-Owner Eligibility Rule:</strong> A living sole owner cannot use a
                    Relinquishment Deed to gift a DDA flat to a spouse. Both parties must already be
                    legal co-owners.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>DELHI STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Delhi Stamp Duty: Gift Deed vs Relinquishment
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Delhi families confuse a Gift Deed with a Relinquishment Deed. Picking the
                  wrong deed can cost lakhs of rupees in extra stamp duty or lead to a Sub-Registrar
                  rejection.
                </p>
                <p>
                  A <strong>Gift Deed</strong> transfers ownership during a person&rsquo;s lifetime
                  without money. Under the Indian Stamp Act, 1899 (Delhi Schedule IA), Delhi gives
                  no family discount on gifts. You must pay 4% for a woman or 6% for a man, plus
                  MCD transfer duty and 1% registration fee.
                </p>
                <p>
                  A <strong>Relinquishment Deed</strong> works only when a property already belongs
                  to multiple legal co-heirs. For example, when a father dies without a Will, his
                  children become co-owners. One child can give up their share to another co-heir
                  for a flat Rs 100 to Rs 200 stamp duty.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DUTY &amp; CIRCLE RATE COMPARATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Gift vs Relinquishment Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your transfer scenario, enter your Delhi property value or Circle Rate
                category, and compare total Sub-Registrar costs side by side.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Transfer Scenario */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose Transfer Type &amp; Recipient Gender</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "gift_female",
                        label: "Gift to Woman (4%)",
                        desc: "Wife, daughter, mother, or sister (2% women rebate)",
                      },
                      {
                        id: "gift_male",
                        label: "Gift to Man (6%)",
                        desc: "Husband, son, father, or brother (standard rate)",
                      },
                      {
                        id: "gift_joint",
                        label: "Joint Gift (5%)",
                        desc: "Joint transfer to one male and one female donee",
                      },
                      {
                        id: "relinquish_coheir",
                        label: "Relinquishment (Rs 200)",
                        desc: "Co-heir giving up inherited share to another co-heir",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setTransferGoal(option.id as typeof transferGoal)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          transferGoal === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{option.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Property Valuation Method */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Property Value or Delhi Circle Rate</span>
                    </label>
                    <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setValuationMode("direct")}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          valuationMode === "direct"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Enter Property Value
                      </button>
                      <button
                        type="button"
                        onClick={() => setValuationMode("circle_rate")}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${
                          valuationMode === "circle_rate"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Circle Rate (Cat A-H)
                      </button>
                    </div>
                  </div>

                  {valuationMode === "direct" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label
                          htmlFor="delhi-property-value"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Property Market / Circle Value (in INR)
                        </label>
                        <input
                          id="delhi-property-value"
                          type="number"
                          min={100000}
                          step={100000}
                          value={propertyValue}
                          onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1 sm:pt-5">
                        {[
                          { label: "50 Lakh", val: 5000000 },
                          { label: "1 Crore", val: 10000000 },
                          { label: "2 Crore", val: 20000000 },
                          { label: "5 Crore", val: 50000000 },
                        ].map((preset) => (
                          <button
                            key={preset.val}
                            type="button"
                            onClick={() => setPropertyValue(preset.val)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                              propertyValue === preset.val
                                ? "bg-rose-50 border-[#C65378] text-[#C65378]"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="circle-cat-select"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Delhi Colony Category (A to H)
                        </label>
                        <select
                          id="circle-cat-select"
                          value={circleCategory}
                          onChange={(e) => setCircleCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-[#C65378]"
                        >
                          {Object.entries(CIRCLE_CATEGORIES).map(([key, info]) => (
                            <option key={key} value={key}>
                              {info.label} ({formatINR(info.ratePerSqm)}/sq.m)
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Areas: {selectedCategoryInfo.localities}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="area-sqm-input"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Plot / Built-up Area (in Sq. Metres)
                        </label>
                        <input
                          id="area-sqm-input"
                          type="number"
                          min={10}
                          max={5000}
                          value={areaSqm}
                          onChange={(e) => setAreaSqm(Number(e.target.value) || 10)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Estimated Circle Value: <strong>{formatINR(effectiveValue)}</strong>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3: Municipal Jurisdiction & Co-Heir Check */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Municipal Zone</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "mcd",
                          label: "MCD Zone",
                          desc: "+1% MCD duty above Rs 25L",
                        },
                        {
                          id: "ndmc",
                          label: "NDMC / Cantt",
                          desc: "Base 4%-6% + 1% Reg Fee",
                        },
                      ].map((z) => (
                        <button
                          key={z.id}
                          type="button"
                          onClick={() => setJurisdiction(z.id as "mcd" | "ndmc")}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            jurisdiction === z.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{z.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{z.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: Co-Heir &amp; Cash Check</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "valid_coheir",
                          label: "Co-Heirs + Zero Cash",
                          desc: "Qualifies for Rs 200 Release",
                        },
                        {
                          id: "non_heir_or_paid",
                          label: "Non-Heir / Cash Paid",
                          desc: "Reclassified as Gift / Sale",
                        },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCoHeirEligible(c.id as typeof coHeirEligible)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            coHeirEligible === c.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{c.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
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
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        DELHI STAMP DUTY COMPARISON RESULT ({formatINR(effectiveValue)} VALUATION)
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {verdictTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{verdictBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        GIFT DEED TOTAL COST
                      </div>
                      <div className="text-lg sm:text-xl font-black text-rose-300">
                        {formatINR(totalGiftOutflow)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        Stamp ({Math.round(baseGiftRate * 100)}%): {formatINR(giftStampDuty)}
                        {mcdExtraRate > 0 && ` + MCD (1%): ${formatINR(giftMcdDuty)}`} + Reg (1%):{" "}
                        {formatINR(giftRegFee)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        RELINQUISHMENT DEED COST
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-400">
                        {formatINR(totalRelinqOutflow)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {isRelinquishValid
                          ? "e-Stamp: Rs 200 + Reg Fee: Rs 1,000 + Pasting: Rs 100"
                          : "Reclassified to full Gift/Sale Stamp Duty"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        POTENTIAL DUTY SAVINGS
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(netSavings)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {isRelinquishValid
                          ? "Saved if parties are legal co-heirs"
                          : "Zero savings when reclassified"}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory Rationale:</span>
                    </div>
                    <p>{verdictNote}</p>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want to avoid heavy Gift Deed stamp duty? Use a registered Will for future
                      transfer.
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Will Online in 15 Mins</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>DELHI STAMP DUTY GUIDE: GIFT DEED VS RELINQUISHMENT</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Delhi Schedule IA
                </span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator-og.jpg"
                  alt="Delhi Gift Deed vs Relinquishment Deed Stamp Duty Calculator"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Comparing 4% and 6% Gift Deed rates plus MCD duty against flat Rs 100 to Rs 200
                Relinquishment Deed fees in Delhi.
              </p>
            </div>

            {/* SECTION 3: GENDER CONCESSION */}
            <section id="gender-concession" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>DELHI GENDER REBATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Gender Concession: 4% Women vs 6% Men Duty
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Delhi gives a 2% stamp duty rebate when a property is gifted or sold to a woman.
                  This rule applies across all Delhi Sub-Registrar offices.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Female Donee: 4%
                    </div>
                    <div className="font-bold text-slate-800">Wife, Daughter, Mother</div>
                    <p className="text-slate-600 leading-relaxed">
                      Base stamp duty is 4%, plus 1% MCD transfer duty above Rs 25 lakh and 1%
                      registration fee.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Male Donee: 6%
                    </div>
                    <div className="font-bold text-slate-800">Son, Husband, Brother</div>
                    <p className="text-slate-600 leading-relaxed">
                      Base stamp duty is 6%, plus 1% MCD transfer duty above Rs 25 lakh and 1%
                      registration fee.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Joint Owners: 5%
                    </div>
                    <div className="font-bold text-slate-800">Male + Female Together</div>
                    <p className="text-slate-600 leading-relaxed">
                      Joint gifts split the rate to 5% base stamp duty, plus 1% MCD duty above Rs
                      25 lakh and 1% registration fee.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: RELINQUISHMENT DEED RULE */}
            <section id="relinquishment-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ARTICLE 55 DELHI SCHEDULE IA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Relinquishment Deed: Rs 100 to Rs 200 Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Relinquishment Deed (also called a Release Deed) lets one co-owner give up their
                  undivided share to another co-owner. It is the cheapest way to settle inherited
                  Delhi homes after a parent passes away without a Will.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Fixed Stamp Duty:</strong> Rs 100 to Rs 200 on an SHCIL non-judicial
                    e-stamp paper.
                  </li>
                  <li>
                    <strong>Registration Fee:</strong> Rs 1,000 fixed fee plus Rs 100 pasting
                    charges at the Sub-Registrar office.
                  </li>
                  <li>
                    <strong>Two Strict Conditions:</strong> Both parties must already be legal
                    co-heirs, and zero money can change hands.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: DELHI CIRCLE RATE GUIDE */}
            <section id="circle-rate-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>DELHI COLONY VALUATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Delhi Circle Rate Guide: Categories A to H
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Delhi divides all colonies into eight Categories from A to H. For a Gift Deed, the
                Sub-Registrar charges stamp duty on the higher of your declared value or the
                official Circle Rate.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Category</th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Sample Delhi Localities</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Land Rate (Per Sq.m)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {Object.entries(CIRCLE_CATEGORIES).map(([cat, info]) => (
                      <tr key={cat} className="hover:bg-slate-50/60">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">{info.label}</td>
                        <td className="p-3.5 sm:p-4">{info.localities}</td>
                        <td className="p-3.5 sm:p-4 font-bold text-[#172228]">
                          {formatINR(info.ratePerSqm)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: RECLASSIFICATION TRAP */}
            <section id="reclassification-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>SUB-REGISTRAR AUDIT WARNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Reclassification Trap: Release vs Gift
              </h3>
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 text-xs sm:text-sm text-amber-950 space-y-2.5">
                <div className="font-extrabold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>When Delhi SRO Rejects Rs 200 Stamp Paper</span>
                </div>
                <p className="leading-relaxed">
                  Under Section 17 of the Registration Act and Indian Stamp Act rules, the
                  Sub-Registrar will reclassify a Relinquishment Deed as a Gift Deed or Sale Deed in
                  three cases:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Non-Owner Recipient:</strong> Releasing a share to a spouse, nephew, or
                    in-law who is not an existing co-heir.
                  </li>
                  <li>
                    <strong>Cash Consideration:</strong> Paying money to a sibling in exchange for
                    signing the release deed.
                  </li>
                  <li>
                    <strong>Living Sole Owner:</strong> A father trying to release his self-acquired
                    DDA flat to his son while alive.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SIDE-BY-SIDE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Legal Comparison: Gift vs Relinquishment
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Delhi Gift Deed
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Delhi Relinquishment Deed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Who Can Use It</td>
                      <td className="p-3.5 sm:p-4">
                        Any living owner gifting to anyone (relative or non-relative).
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Only existing co-owners or legal co-heirs of a joint property.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Delhi Stamp Duty</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#C65378]">
                        4% (Women), 6% (Men), 5% (Joint) + 1% MCD above Rs 25L.
                      </td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">
                        Flat Rs 100 to Rs 200 on e-Stamp paper.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Registration Fee</td>
                      <td className="p-3.5 sm:p-4">1% of Circle Rate + Rs 100 pasting fee.</td>
                      <td className="p-3.5 sm:p-4">Rs 1,000 fixed + Rs 100 pasting fee.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Income Tax Impact</td>
                      <td className="p-3.5 sm:p-4">
                        Exempt under Section 56(2)(x) for defined blood relatives.
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Exempt from capital gains when executed without cash among heirs.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-3.5 h-3.5" />
                  <span>NEED LEGAL DRAFTING &amp; SRO REGISTRATION IN DELHI?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Get a Lawyer-Drafted Relinquishment Deed or Gift Deed
                </div>
                <p className="text-xs text-slate-600">
                  Our Delhi property lawyers handle e-stamping, NGDRS booking, and Sub-Registrar
                  registration.
                </p>
              </div>
              <Link
                href="/services/relinquishment-deed"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore Relinquishment Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: DORIS & NGDRS CHECKLIST */}
            <section id="doris-ngdrs-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SUB-REGISTRAR PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. DORIS &amp; NGDRS Delhi Sub-Registrar Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these five steps to register your Gift Deed or Relinquishment Deed at any
                Delhi Sub-Registrar office.
              </p>
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Verify Past Records on DORIS Delhi",
                    desc: "Check prior registered deeds from 2005 to January 2024 on DORIS Delhi to confirm clean title and exact property measurements.",
                  },
                  {
                    title: "Obtain Surviving Member Certificate (For Relinquishment)",
                    desc: "If a parent died without a Will, get a Surviving Member Certificate (SMC) from the Delhi SDM office before drafting.",
                  },
                  {
                    title: "Purchase SHCIL Non-Judicial e-Stamp",
                    desc: "Buy your e-stamp paper through an authorized SHCIL counter (Rs 100 to Rs 200 for Relinquishment; 4% to 7% for Gift).",
                  },
                  {
                    title: "Enter Deed Data on NGDRS Delhi",
                    desc: "Upload party details, property category (A to H), and witness IDs on NGDRS Delhi and pay the registration fee online.",
                  },
                  {
                    title: "Complete Biometrics at Sub-Registrar Office",
                    desc: "Visit the SRO on your booked slot with original title deeds, Aadhaar, PAN, and two adult witnesses for biometric sign-off.",
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
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>DELHI REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: DDA, South Delhi, Rohini
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Dwarka DDA Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Husband Gifts Self-Acquired DDA Flat to Wife
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A husband owns a Rs 1.2 Crore Category D DDA flat in
                    Dwarka and wants to transfer it to his wife today.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Cost:</strong> Relinquishment is not allowed because the wife is not a
                    co-owner. He pays 4% women duty + 1% MCD duty + 1% reg fee (Rs 7,20,100).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Lajpat Nagar House</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Two Sisters Release Share to Brother After Father&rsquo;s Death
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Father died without a Will, leaving a Rs 4 Crore
                    Category C home to his son and two daughters.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Cost:</strong> Because all three are legal co-heirs and no cash is paid,
                    they execute a Relinquishment Deed for Rs 200 stamp duty + Rs 1,100 reg fee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Rohini Sector 13</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Brother Pays Rs 50 Lakh to Sister for Release Deed
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A brother pays Rs 50 lakh by cheque to his sister to
                    release her half-share in an inherited Rohini flat.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Verdict:</strong> Cash consideration disqualifies the Rs 200 rate. The
                    SRO treats it as a Sale Deed and charges full 6% + 1% MCD + 1% reg fee.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPYABLE RECITAL & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DRAFTING TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copyable Deed Recital &amp; DORIS Checklist
              </h3>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    No-Consideration Clause for Delhi Relinquishment Deed
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
{`"AND WHEREAS the Releasor and the Releasee are the surviving Class I legal heirs of Late [Name of Deceased Owner], who died intestate on [Date of Death], leaving behind the Schedule Property.

NOW THIS DEED WITNESSETH that out of natural love and affection and WITHOUT ANY MONETARY CONSIDERATION whatsoever, the Releasor hereby releases, relinquishes, and surrenders all his/her undivided [Fraction, e.g., 1/3rd] share, title, and interest in the Schedule Property in favour of the Releasee, who is already a lawful co-owner thereof."`}
                </pre>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Paper Checklist: Delhi Sub-Registrar Appointment
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
                    <span>Original Conveyance / Sale Deed</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Death Certificate &amp; Surviving Member Certificate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>SHCIL e-Stamp &amp; NGDRS Appointment Slip</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Aadhaar, PAN &amp; 2 Adult Witnesses</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property lawyers draft
                  Delhi Gift Deeds, Relinquishment Deeds, and registered Wills while ensuring full
                  compliance with Circle Rates and Sub-Registrar rules.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Relinquishment Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift vs Will Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Delhi Stamp Duty
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Citations &amp; Statutory Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All stamp duty calculations on this page follow the Indian Stamp Act, 1899
                  (Delhi Schedule IA) and Section 17 of the Registration Act, 1908:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Stamp Act, 1899</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Ancestral Property Classifier
                    </Link>
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gift Deed vs Will Calculator
                    </Link>
                    <Link
                      href="/services/relinquishment-deed"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Relinquishment Deed Drafting
                    </Link>
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All Legal Calculators
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 3-Card Plain-English Summary Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Compare Deeds?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choosing the right deed saves lakhs in Delhi stamp duty. Co-heirs can settle a
                  home for Rs 200, while lifetime gifts cost 4% to 7%.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Consider a Registered Will</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you want your spouse or kids to get your flat after you, a Will needs zero
                  stamp duty today and keeps full control with you.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Delhi lawyers check your title papers, draft your deed or Will in clear words,
                  and guide you through NGDRS registration.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (NO MOBILE NUMBER)
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
                    Lawyer Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Delhi property transfers, Gift Deeds, Relinquishment Deeds, DDA
                mutations, and registered Wills.
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
                  <span>SAVE LAKHS IN STAMP DUTY</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Transfer Future Ownership with a Registered Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A Gift Deed costs 4% to 7% today. A Will needs zero stamp duty and keeps your flat
                  in your name while you live.
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
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>DELHI DEED &amp; SRO DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need a Delhi Relinquishment or Gift Deed?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Delhi property lawyers verify co-heir status, calculate Circle Rates, and
                  handle NGDRS Sub-Registrar registration.
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
                  Why Delhi Families Use This Tool
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Delhi Slabs:</strong> Includes 4% women, 6% men, and 1% MCD
                      transfer duty.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Circle Rate Built-In:</strong> Estimates Categories A to H values
                      instantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>DORIS &amp; NGDRS Ready:</strong> Clear SRO checklist with zero
                      guesswork.
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
          <span>Duty Calculator</span>
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
