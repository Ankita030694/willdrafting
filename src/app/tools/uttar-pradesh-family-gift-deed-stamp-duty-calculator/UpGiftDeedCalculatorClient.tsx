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
  XCircle,
  ClipboardCheck,
  MapPin,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. UP ₹5,000 Family Gift Deed Scheme" },
  { id: "interactive-calculator", label: "2. Interactive UP Stamp Duty Calculator" },
  { id: "blood-relative-matrix", label: "3. Blood-Relative Eligibility Matrix" },
  { id: "property-scope-2026", label: "4. Flats, Farms & Commercial Shops (2026)" },
  { id: "standard-vs-concessional", label: "5. Standard 7% vs ₹5,000 Fee Table" },
  { id: "noida-lucknow-rules", label: "6. Noida, Greater Noida & Lucknow Rules" },
  { id: "igrsup-registration-stepper", label: "7. Step-by-Step IGRSUP Filing Guide" },
  { id: "document-checklist", label: "8. Required Documents for UP SRO" },
  { id: "disqualifiers-tax-rules", label: "9. 5-Year Lock-In, Tax & Elder Safeguards" },
  { id: "practical-case-studies", label: "10. Worked Examples: Noida, Lucknow, Agra" },
  { id: "gift-deed-recital-templates", label: "11. UP Gift Deed Clause & SRO Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Trust" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official UP Orders & Portals" },
];

const FAQS = [
  {
    q: "Does UP's ₹5,000 flat stamp duty apply to Noida and Lucknow flats?",
    a: "Yes. Under UP Notification No. 18/2023/995 dated August 3, 2023, flats, homes, plots, and farm land gifted to close family in Noida, Greater Noida, Lucknow, Ghaziabad, and all UP districts carry a flat ₹5,000 stamp duty cap. For Noida leasehold flats, you must also apply for a Noida Authority Transfer Memo.",
  },
  {
    q: "Are commercial shops and industrial plots covered under the UP ₹5,000 gift deed scheme?",
    a: "Yes. At first, the August 3, 2023 UP order covered only homes and farm land. After the UP Cabinet vote on January 6, 2026, Notification No. 01/2026/26 dated January 8, 2026 added shops, offices, and factory plots to the same ₹5,000 family stamp duty cap.",
  },
  {
    q: "Which blood relatives qualify for the ₹5,000 gift deed stamp duty in Uttar Pradesh?",
    a: "The UP order covers 13 close ties between real people: father, mother, husband, wife, son, daughter, son-in-law, daughter-in-law, real brother, real sister, widow of a late real brother, grandson, and granddaughter. Uncles, aunts, nephews, nieces, cousins, and in-law parents do not qualify.",
  },
  {
    q: "What other government fees apply besides the ₹5,000 stamp duty on IGRSUP?",
    a: "Along with the ₹5,000 stamp duty cap, UP takes a ₹1,000 fee, making the base stamp and processing cost ₹6,000. Under Section 78 of the Registration Act in UP, a separate 1% filing fee on the circle rate may also show on the IGRSUP slip. Always check the live slip on igrsup.gov.in before you pay.",
  },
  {
    q: "What is the 5-year lock-in rule on UP concessional family gift deeds?",
    a: "Both the August 2023 and January 2026 UP orders bar quick re-gifts. If a family member gets a flat or shop under the ₹5,000 cap and gifts that same asset again within 5 years, the cap will not work. Full 7% or 5% stamp duty applies on the next gift.",
  },
  {
    q: "Can a company, firm, trust, or HUF use UP's ₹5,000 gift deed concession?",
    a: "No. The UP stamp duty cut applies only to gifts from one real person to another real person. If the giver or taker is a firm, company, LLP, trust, HUF, or group, full 7% city or 5% rural stamp duty applies.",
  },
  {
    q: "Is income tax payable when a parent gifts a UP flat to a son or daughter?",
    a: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, land or a flat gifted by parents, kids, a spouse, or siblings is 100% tax-free for the receiver. Note that if a husband gifts a rented flat to his wife, future rent is taxed in the husband's return under Section 64 clubbing rules.",
  },
  {
    q: "Should UP parents transfer a house via a ₹5,000 Gift Deed or a Registered Will?",
    a: "A Gift Deed shifts title right away and is hard to cancel under Section 126 of the Transfer of Property Act. A Will needs zero stamp duty, lets you keep full life control, and can be changed anytime. Parents who still pick a Gift Deed should add a clear Section 23 care clause.",
  },
];

type RelationKey =
  | "son_daughter"
  | "spouse"
  | "parents"
  | "siblings"
  | "in_laws_child"
  | "grandchildren"
  | "brother_widow"
  | "parents_in_law"
  | "uncle_aunt_nephew"
  | "friend_third_party";

type PropertyTypeKey = "residential" | "agricultural" | "commercial" | "industrial";
type ZoneKey = "noida_gnida" | "urban_up" | "rural_up";
type DoneeGenderKey = "male" | "female" | "joint_mf";
type EntityTypeKey = "individual" | "legal_entity";
type LockInKey = "clear" | "within_5_years";

interface RelationOption {
  id: RelationKey;
  label: string;
  desc: string;
  upEligible: boolean;
  itExempt: "exempt" | "check" | "taxable";
  clubbingRisk: boolean;
  proofHint: string;
}

const RELATION_OPTIONS: RelationOption[] = [
  {
    id: "son_daughter",
    label: "Son or Daughter",
    desc: "Direct parent to child transfer",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: false,
    proofHint: "Child's Aadhaar, Passport, or Birth Certificate naming parent",
  },
  {
    id: "spouse",
    label: "Husband or Wife",
    desc: "Transfer between married spouses",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: true,
    proofHint: "Marriage Certificate, Passport, or Aadhaar with spouse name",
  },
  {
    id: "parents",
    label: "Father or Mother",
    desc: "Child gifting property to parent",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: false,
    proofHint: "Donor's Birth Certificate, Passport, or Class 10 marksheet",
  },
  {
    id: "siblings",
    label: "Real Brother or Sister",
    desc: "Full blood siblings (same parents)",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: false,
    proofHint: "Both IDs/Passports showing common father and mother names",
  },
  {
    id: "in_laws_child",
    label: "Son-in-Law / Daughter-in-Law",
    desc: "Spouse of donor's son or daughter",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: true,
    proofHint: "Child's birth proof plus Marriage Certificate of child and spouse",
  },
  {
    id: "grandchildren",
    label: "Grandson or Granddaughter",
    desc: "Child of donor's son or daughter",
    upEligible: true,
    itExempt: "exempt",
    clubbingRisk: false,
    proofHint: "Lineage ID chain linking grandparent, parent, and grandchild",
  },
  {
    id: "brother_widow",
    label: "Widow of Deceased Brother",
    desc: "Wife of donor's late real brother",
    upEligible: true,
    itExempt: "check",
    clubbingRisk: false,
    proofHint: "Brother's Death Certificate, Marriage proof, and common parent IDs",
  },
  {
    id: "parents_in_law",
    label: "Father-in-Law / Mother-in-Law",
    desc: "Not in UP's 13-relative list",
    upEligible: false,
    itExempt: "exempt",
    clubbingRisk: false,
    proofHint: "Standard UP stamp duty applies (excluded from UP ₹5,000 cap)",
  },
  {
    id: "uncle_aunt_nephew",
    label: "Uncle, Aunt, Nephew or Cousin",
    desc: "Extended family outside UP cap",
    upEligible: false,
    itExempt: "taxable",
    clubbingRisk: false,
    proofHint: "Standard UP stamp duty applies; verify Sec 56(2)(x) tax rules",
  },
  {
    id: "friend_third_party",
    label: "Friend or Unrelated Person",
    desc: "Non-relative transfer",
    upEligible: false,
    itExempt: "taxable",
    clubbingRisk: false,
    proofHint: "Full UP stamp duty + Income Tax at slab rate on circle value",
  },
];

function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

export default function UpGiftDeedCalculatorClient() {
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
  const [propertyValue, setPropertyValue] = useState<number>(8000000); // ₹80 Lakh default
  const [relation, setRelation] = useState<RelationKey>("son_daughter");
  const [propertyType, setPropertyType] = useState<PropertyTypeKey>("residential");
  const [zone, setZone] = useState<ZoneKey>("noida_gnida");
  const [doneeGender, setDoneeGender] = useState<DoneeGenderKey>("male");
  const [entityType, setEntityType] = useState<EntityTypeKey>("individual");
  const [lockInStatus, setLockInStatus] = useState<LockInKey>("clear");

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
    setPropertyValue(8000000);
    setRelation("son_daughter");
    setPropertyType("residential");
    setZone("noida_gnida");
    setDoneeGender("male");
    setEntityType("individual");
    setLockInStatus("clear");
  };

  // =========================================================================
  // UP STAMP DUTY & ELIGIBILITY CALCULATION ENGINE
  // =========================================================================
  const safeValue = Math.max(100000, Math.min(propertyValue || 0, 500000000));
  const selectedRelation =
    RELATION_OPTIONS.find((r) => r.id === relation) || RELATION_OPTIONS[0];

  const isUrban = zone !== "rural_up";
  const baseStandardRate = isUrban ? 0.07 : 0.05; // 7% Urban/Dev Authority, 5% Rural Gram Panchayat

  // UP 2025 Women's Stamp Duty Rebate: 1% rebate for properties up to ₹1 Crore (max ₹1 Lakh savings)
  const qualifiesForWomenRebate = safeValue <= 10000000;
  let effectiveStandardRate = baseStandardRate;
  if (doneeGender === "female" && qualifiesForWomenRebate) {
    effectiveStandardRate = baseStandardRate - 0.01;
  } else if (doneeGender === "joint_mf" && qualifiesForWomenRebate) {
    effectiveStandardRate = baseStandardRate - 0.005;
  }

  const standardStampDuty = Math.round(safeValue * effectiveStandardRate);
  const standardRegFee = Math.round(safeValue * 0.01); // 1% UP Registration Fee (Section 78)
  const totalStandardCost = standardStampDuty + standardRegFee;

  // Disqualifier checks for UP ₹5,000 flat stamp duty scheme
  const disqualifiers: string[] = [];
  if (!selectedRelation.upEligible) {
    disqualifiers.push(
      `"${selectedRelation.label}" is outside the 13 close family relations notified by the UP Stamp Department.`
    );
  }
  if (entityType === "legal_entity") {
    disqualifiers.push(
      "Gifts involving a company, firm, LLP, trust, HUF, or society are barred. Both parties must be individuals."
    );
  }
  if (lockInStatus === "within_5_years") {
    disqualifiers.push(
      "This property was already gifted under UP's ₹5,000 scheme within the last 5 years. The 5-year lock-in bars a second concessional gift."
    );
  }

  const isConcessionEligible = disqualifiers.length === 0;
  const governingOrder =
    propertyType === "commercial" || propertyType === "industrial"
      ? "UP Notification No. 01/2026/26 (Jan 8, 2026)"
      : "UP Notification No. 18/2023/995 (Aug 3, 2023)";

  // Exact Statutory Stamp Duty Cap (max ₹5,000) + ₹1,000 Processing Fee
  const payableStampDuty = isConcessionEligible
    ? Math.min(standardStampDuty, 5000)
    : standardStampDuty;
  const processingFee = isConcessionEligible ? 1000 : 0;
  const baseConcessionalFees = payableStampDuty + processingFee; // ₹6,000 for standard eligible transfer
  const registrationFee1Pct = standardRegFee;
  const totalWith1PctReg = baseConcessionalFees + registrationFee1Pct;

  const netStampDutySaved = Math.max(0, standardStampDuty - payableStampDuty);
  const stampSavingsPercent =
    standardStampDuty > 0
      ? Math.round((netStampDutySaved / standardStampDuty) * 1000) / 10
      : 0;

  const standardRateLabel = `${(effectiveStandardRate * 100).toFixed(
    effectiveStandardRate * 100 % 1 === 0 ? 0 : 1
  )}%`;

  const copyClauseToClipboard = () => {
    const clauseText = `UTTAR PRADESH FAMILY GIFT DEED (DAAN PATRA) STATUTORY RECITAL CLAUSE
"This Deed of Gift is executed out of natural love and affection without any monetary consideration by the Donor (an individual natural person) in favour of the Donee, who is the Donor's real [Son / Daughter / Spouse / Parent / Real Brother / Real Sister / Daughter-in-Law / Son-in-Law / Grandchild].

This transfer qualifies for concessional maximum stamp duty of Rs. 5,000/- under Section 9(1)(a) and Article 33 of Schedule 1-B of the Indian Stamp Act, 1899 (as amended in Uttar Pradesh), read with UP Stamp & Registration Notification No. 18/2023/995/94-S.R.-2-2023-700(29)/2021 dated 03.08.2023 [and Notification No. 01/2026/26/XCIV-2-2026-700(29)-2021 dated 08.01.2026 for commercial/industrial property].

Neither the Donor nor the Donee is a company, firm, trust, or body corporate, and the Schedule Property has not been acquired via a concessional family Gift Deed within the preceding five (5) years.

[OPTIONAL SENIOR CITIZEN PROTECTION CLAUSE - SECTION 23 MWPSC ACT, 2007]:
This Gift is subject to the express condition that the Donee shall provide basic amenities, residence, medical care, and physical needs to the Donor during the Donor's lifetime. Failure to honour this condition shall render this transfer voidable at the Donor's option before the Maintenance Tribunal under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `IGRSUP SUB-REGISTRAR DOCUMENT CHECKLIST: UP ₹5,000 FAMILY GIFT DEED
1. Drafted Gift Deed (Daan Patra) printed on ₹5,000 SHCIL e-Stamp Paper (plus ₹1,000 processing fee receipt).
2. Online IGRSUP Pre-Registration Application Receipt & SRO Slot Booking Slip (igrsup.gov.in).
3. Original Prior Registered Title Deed (Sale Deed / Lease Deed / Allotment Letter) establishing Donor's ownership.
4. Latest Revenue / Municipal Record: UP Bhulekh Khatauni (rural/land), House Tax Receipt, or Builder/RWA No Dues Certificate.
5. Relationship Proof proving blood tie (Birth Certificate, Passport, Marriage Certificate, Parivar Register, or Aadhaar chain).
6. PAN Card, Aadhaar Card, and 2 passport photos each of Donor and Donee.
7. Two independent adult witnesses with original Aadhaar & PAN cards.
8. Circle Rate Valuation Sheet downloaded from IGRSUP for the exact sector/locality.
9. For Noida / Greater Noida / YEIDA Leasehold Flats: Apply for Authority Transfer Memorandum (TM) after SRO registration.`;
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
            <span>INDIAN STAMP ACT, 1899 (UP) • ART. 33 • AUG 2023 &amp; JAN 2026 ORDERS</span>
          </div>

          {/* Strict Single H1 Tag (48 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            UP ₹5,000 Family Gift Deed Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check if your transfer qualifies for Uttar Pradesh&rsquo;s ₹5,000 flat stamp duty cap
            plus ₹1,000 fee. Compare savings against 7% urban and 5% rural rates across Noida,
            Lucknow, Ghaziabad, and UP.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate UP Gift Duty</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Or Draft a Will Online (₹0 Stamp)</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Flat ₹5,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BLOOD RELATIVE STAMP CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹1,000 Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NOMINAL PROCESSING CHARGE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">13 Relations</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NOTIFIED UP FAMILY MEMBERS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Jan 2026 Rule</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SHOPS &amp; FACTORIES INCLUDED
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
                <span>UP Statutory Scope</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Models Section 9(1)(a) &amp; Article 33 Schedule 1-B of the Indian Stamp Act, 1899
                (UP), Notification No. 18/2023/995 (Aug 2023), and Notification No. 01/2026/26 (Jan
                2026).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE CALCULATOR
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>QUICK ANSWER: UP ₹5,000 FAMILY GIFT DEED RULE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flat ₹5,000 Stamp Duty + ₹1,000 Fee:</strong> Close blood relatives in
                    Uttar Pradesh pay a maximum ₹5,000 stamp duty plus a ₹1,000 processing fee,
                    instead of 7% urban or 5% rural stamp duty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Covers Noida/Lucknow Flats &amp; Commercial Shops:</strong> Homes and
                    farm land were covered on August 3, 2023. On January 8, 2026, UP extended the
                    same ₹5,000 cap to commercial shops, offices, and industrial plots.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Check Registration &amp; Leasehold Fees:</strong> The UP order caps
                    stamp duty at ₹5,000. Separate 1% registration charges under Section 78 on
                    IGRSUP and Noida Authority Transfer Memorandum fees can still apply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 5-Year Lock-In &amp; Individual Rule:</strong> Only individuals
                    qualify, never companies or trusts. If the donee re-gifts the same property
                    within 5 years, standard 7% or 5% stamp duty applies.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON THE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>UP STAMP DUTY LAW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: UP ₹5,000 Family Gift Deed Scheme
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  By rule, gifting a home or plot in Uttar Pradesh costs the same stamp duty as a
                  sale deed. Under Article 33 of Schedule 1-B of the Indian Stamp Act, 1899 (UP),
                  buyers pay 7% in cities and 5% in rural areas.
                </p>
                <p>
                  Most online fee tools still show that full 7% charge. They miss two major tax cut
                  orders passed by the UP Stamp Dept under Section 9(1)(a) of the Stamp Act.
                </p>
                <p>
                  First, <strong>Notification No. 18/2023/995</strong> dated{" "}
                  <strong>August 3, 2023</strong> set a flat <strong>₹5,000</strong> stamp duty cap
                  on flats, homes, plots, and farm land gifted among 13 close family ties. Second,{" "}
                  <strong>Notification No. 01/2026/26</strong> dated{" "}
                  <strong>January 8, 2026</strong> added shops, offices, and plant plots to the
                  same ₹5,000 cap across UP.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE UP STAMP DUTY CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE UP DUTY &amp; ELIGIBILITY ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free UP Family Gift Deed Stamp Duty Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your property&rsquo;s circle rate value and select the family relationship,
                property type, and city zone. Check instant eligibility for the ₹5,000 cap and see
                your exact savings.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Circle Rate / Market Value */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label
                      htmlFor="up-property-value"
                      className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                    >
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>Step 1: Property Circle Rate / Market Value (INR)</span>
                    </label>
                    <span className="text-base sm:text-lg font-black text-[#C65378]">
                      {formatINR(safeValue)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        id="up-property-value"
                        type="number"
                        min={100000}
                        max={500000000}
                        step={100000}
                        value={propertyValue}
                        onChange={(e) => {
                          const parsed = Number(e.target.value);
                          setPropertyValue(Number.isNaN(parsed) ? 0 : parsed);
                        }}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                        aria-label="Property circle rate value in Indian Rupees"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: "₹25L", val: 2500000 },
                        { label: "₹50L", val: 5000000 },
                        { label: "₹80L", val: 8000000 },
                        { label: "₹1 Cr", val: 10000000 },
                        { label: "₹2 Cr", val: 20000000 },
                        { label: "₹5 Cr", val: 50000000 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setPropertyValue(preset.val)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                            propertyValue === preset.val
                              ? "bg-[#172228] text-white border-[#172228]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={500000}
                    max={50000000}
                    step={500000}
                    value={Math.min(Math.max(safeValue, 500000), 50000000)}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                    aria-label="Slide to adjust property circle rate value"
                  />
                  <p className="text-[11px] text-slate-500">
                    Under UP Stamp (Valuation of Property) Rules, 1997, duty is computed on the
                    district DM Circle Rate or declared value, whichever is higher.
                  </p>
                </div>

                {/* Step 2: Donor to Donee Relationship */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Who Is Receiving the Gifted Property (Donee)?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {RELATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRelation(opt.id)}
                        className={`text-left p-3 rounded-2xl border transition-all ${
                          relation === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs text-slate-900">{opt.label}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              opt.upEligible
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {opt.upEligible ? "₹5,000 Cap" : "Full Duty"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Property Category & Location Zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Property Type</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "residential",
                          label: "Residential Flat / House",
                          desc: "Covered since Aug 2023",
                        },
                        {
                          id: "agricultural",
                          label: "Agricultural / Farm Land",
                          desc: "Covered since Aug 2023",
                        },
                        {
                          id: "commercial",
                          label: "Commercial Shop / Office",
                          desc: "Added Jan 8, 2026",
                        },
                        {
                          id: "industrial",
                          label: "Industrial Plot / Factory",
                          desc: "Added Jan 8, 2026",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPropertyType(opt.id as PropertyTypeKey)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            propertyType === opt.id
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
                      <MapPin className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: UP City / Location Zone</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "noida_gnida",
                          label: "Noida, Greater Noida & YEIDA (Urban)",
                          desc: "7% standard benchmark + Leasehold TM check",
                        },
                        {
                          id: "urban_up",
                          label: "Lucknow, Ghaziabad, Agra, Kanpur & Urban UP",
                          desc: "7% standard municipal / dev authority benchmark",
                        },
                        {
                          id: "rural_up",
                          label: "Rural Gram Panchayat (Outside Urban Limits)",
                          desc: "5% standard rural stamp duty benchmark",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setZone(opt.id as ZoneKey)}
                          className={`w-full text-left p-3 rounded-xl border transition-all ${
                            zone === opt.id
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

                {/* Step 5: Donee Gender & Statutory Disqualifiers */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Step 5: Donee Gender (Sets Standard Rate Benchmark)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: "male",
                          label: "Male Sole Donee",
                          desc: isUrban ? "7% Standard Rate" : "5% Standard Rate",
                        },
                        {
                          id: "female",
                          label: "Female Sole Donee",
                          desc: qualifiesForWomenRebate
                            ? `${isUrban ? "6%" : "4%"} (1% UP Women Rebate <= ₹1 Cr)`
                            : `${isUrban ? "7%" : "5%"} (Value exceeds ₹1 Cr rebate cap)`,
                        },
                        {
                          id: "joint_mf",
                          label: "Joint Male + Female",
                          desc: qualifiesForWomenRebate
                            ? `${isUrban ? "6.5%" : "4.5%"} (0.5% Joint Rebate <= ₹1 Cr)`
                            : `${isUrban ? "7%" : "5%"} (Value exceeds ₹1 Cr rebate cap)`,
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDoneeGender(opt.id as DoneeGenderKey)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            doneeGender === opt.id
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

                  {/* Statutory Compliance Checks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                        Check A: Are Both Donor &amp; Donee Individuals?
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEntityType("individual")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            entityType === "individual"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          Yes (Individuals)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEntityType("legal_entity")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            entityType === "legal_entity"
                              ? "bg-rose-600 text-white border-rose-600"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          Firm / Co / Trust
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                        Check B: Re-Gifted Within Last 5 Years?
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setLockInStatus("clear")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            lockInStatus === "clear"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          No (Clear Title)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLockInStatus("within_5_years")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            lockInStatus === "within_5_years"
                              ? "bg-rose-600 text-white border-rose-600"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          Yes (&lt; 5 Years)
                        </button>
                      </div>
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
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  {/* Top Verdict Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        UP FAMILY GIFT DEED ELIGIBILITY &amp; FEE REPORT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {isConcessionEligible
                          ? "Eligible for UP ₹5,000 Flat Stamp Duty Cap"
                          : "Ineligible: Standard UP Stamp Duty Applies"}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        Governing Rule:{" "}
                        <span className="text-rose-200 font-semibold">
                          {isConcessionEligible
                            ? governingOrder
                            : "Indian Stamp Act, 1899 (UP) Art. 33 Standard Rate"}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        isConcessionEligible
                          ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                          : "bg-rose-500/20 border-rose-400/40 text-rose-200"
                      }`}
                    >
                      {isConcessionEligible ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-300" />
                      )}
                      <span>
                        {isConcessionEligible ? "₹5,000 Cap Qualified" : `${standardRateLabel} Duty Triggered`}
                      </span>
                    </div>
                  </div>

                  {/* 3 Primary Financial Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isConcessionEligible
                          ? "CONCESSIONAL STAMP + PROCESSING"
                          : `STANDARD UP STAMP DUTY (${standardRateLabel})`}
                      </div>
                      <div
                        className={`text-xl sm:text-2xl font-black ${
                          isConcessionEligible ? "text-emerald-400" : "text-rose-300"
                        }`}
                      >
                        {formatINR(baseConcessionalFees)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {isConcessionEligible
                          ? `${formatINR(payableStampDuty)} Stamp + ₹1,000 Processing`
                          : `Calculated on ${formatINR(safeValue)} circle value`}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        IGRSUP REGISTRATION FEE (1%)
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {formatINR(registrationFee1Pct)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Sec. 78 UP Reg. Fee • Est. Total: {formatINR(totalWith1PctReg)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        NET STAMP DUTY SAVED VS {standardRateLabel}
                      </div>
                      <div
                        className={`text-xl sm:text-2xl font-black ${
                          netStampDutySaved > 0 ? "text-amber-300" : "text-slate-400"
                        }`}
                      >
                        {formatINR(netStampDutySaved)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {netStampDutySaved > 0
                          ? `${stampSavingsPercent}% lower than ${formatINR(standardStampDuty)}`
                          : `Standard duty payable: ${formatINR(standardStampDuty)}`}
                      </div>
                    </div>
                  </div>

                  {/* Side-by-Side Comparison Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="font-bold text-slate-300">Standard UP Gift / Sale</div>
                      <div className="text-sm font-black text-white">
                        {formatINR(standardStampDuty)} Stamp
                      </div>
                      <div className="text-[11px] text-slate-400">
                        + {formatINR(standardRegFee)} Reg. Fee = {formatINR(totalStandardCost)}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 space-y-1">
                      <div className="font-bold text-emerald-300">UP Family Gift Concession</div>
                      <div className="text-sm font-black text-white">
                        {isConcessionEligible
                          ? `${formatINR(payableStampDuty)} + ₹1,000 Fee`
                          : "Not Qualified"}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {isConcessionEligible
                          ? `Base ₹6,000 (+ ${formatINR(registrationFee1Pct)} 1% Sec. 78 Reg.)`
                          : "Check disqualifier list below"}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1">
                      <div className="font-bold text-rose-200">Registered Will in UP</div>
                      <div className="text-sm font-black text-white">₹0 Stamp Duty</div>
                      <div className="text-[11px] text-slate-300">
                        Nominal SRO fee (~₹500 to ₹1,000) + full lifetime control
                      </div>
                    </div>
                  </div>

                  {/* Disqualifiers or Statutory Alerts */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Notes &amp; Statutory Checks for Your Transfer:</span>
                    </div>

                    {disqualifiers.length > 0 && (
                      <ul className="space-y-1.5 text-rose-200 text-xs">
                        {disqualifiers.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>Disqualified:</strong> {reason}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <ul className="space-y-1.5 text-xs text-slate-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Required Relationship Proof:</strong> {selectedRelation.proofHint}
                          .
                        </span>
                      </li>
                      {zone === "noida_gnida" && (
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                          <span>
                            <strong>Noida / Greater Noida / YEIDA Leasehold Alert:</strong> Most
                            flats here are 99-year leasehold. After SRO registration, apply for an
                            Authority Transfer Memorandum (TM). Blood relatives generally receive a
                            50% discount on authority transfer charges plus a ₹1,000 processing fee.
                          </span>
                        </li>
                      )}
                      {selectedRelation.itExempt === "exempt" && (
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Income Tax Section 56(2)(x):</strong> 100% tax-free in the
                            receiver&rsquo;s hands.{" "}
                            {selectedRelation.clubbingRisk
                              ? "Caution: Under Section 64(1)(iv)/(vi), future rent or profit from property gifted to a spouse or daughter-in-law is clubbed in the donor's tax return."
                              : "No gift tax applies on registration."}
                          </span>
                        </li>
                      )}
                      {selectedRelation.itExempt === "check" && (
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                          <span>
                            <strong>Income Tax Review Advised:</strong> UP grants the ₹5,000 stamp
                            cap to a deceased brother&rsquo;s widow, but confirm Section 56(2)(x)
                            tax exemption with a CA before filing ITR.
                          </span>
                        </li>
                      )}
                      {selectedRelation.itExempt === "taxable" && (
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                          <span>
                            <strong>Income Tax Risk (Section 56(2)(x)):</strong> Gifts to non-relatives
                            worth over ₹50,000 are taxed as &ldquo;Income from Other Sources&rdquo;
                            at the receiver&rsquo;s slab rate on the full circle rate value.
                          </span>
                        </li>
                      )}
                    </ul>

                    <div className="pt-2 text-emerald-300 text-xs font-semibold border-t border-white/10">
                      <strong>Transparency Note:</strong> UP notifications cap Stamp Duty at ₹5,000
                      (plus ₹1,000 processing fee). Always verify the live IGRSUP portal challan
                      for final SRO registration fees before purchasing e-stamp paper.
                    </div>
                  </div>

                  {/* Tool Dual Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href="/services/gift-deed-drafting-registration"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Hire UP Gift Deed Advocate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#172228] font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Prefer a Will? Draft Online in 15 Mins</span>
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
                  <span>UTTAR PRADESH FAMILY GIFT DEED COST GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  IGRSUP &amp; Art. 33 UP
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/uttar-pradesh-family-gift-deed-stamp-duty-calculator-og.jpg"
                  alt="UP Family Gift Deed ₹5,000 Stamp Duty Calculator and IGRSUP Registration Guide"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                UP&rsquo;s ₹5,000 flat stamp duty scheme lets parents and children register family
                property gifts in Noida, Lucknow, and across Uttar Pradesh at a fraction of 7% sale
                duty.
              </p>
            </div>

            {/* SECTION 3: BLOOD-RELATIVE ELIGIBILITY MATRIX */}
            <section id="blood-relative-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>WHO QUALIFIES UNDER UP RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Blood-Relative Eligibility Matrix Under UP Rules
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The UP Stamp Department uses a strict list of 13 family members. Even one missing
                tie, such as gifting to a nephew or father-in-law, triggers full 7% urban or 5%
                rural stamp duty.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Donor to Donee Relation</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        UP ₹5,000 Stamp Cap
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Income Tax Sec. 56(2)(x)
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Practical Rule / Proof</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Son or Daughter
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Tax-Free</td>
                      <td className="p-3.5 sm:p-4">Birth certificate, passport, or Aadhaar link.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Father or Mother</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Tax-Free</td>
                      <td className="p-3.5 sm:p-4">Donor&rsquo;s ID naming father or mother.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Husband or Wife</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-amber-700 font-semibold">
                        Gift Free; Rent Clubbed
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Sec. 64(1)(iv) clubs future rental income with donor.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Son-in-Law / Daughter-in-Law
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-amber-700 font-semibold">
                        Gift Free; Sec. 64 Applies
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Marriage certificate + parent-child proof required.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Real Brother or Real Sister
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Tax-Free</td>
                      <td className="p-3.5 sm:p-4">Full blood siblings; cousins are excluded.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Widow of Deceased Real Brother
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-amber-700 font-semibold">
                        Verify with CA
                      </td>
                      <td className="p-3.5 sm:p-4">Brother&rsquo;s death paper + marriage proof.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Grandson / Granddaughter
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (₹5,000)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Tax-Free</td>
                      <td className="p-3.5 sm:p-4">
                        Children of a son or daughter both qualify.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Father-in-Law / Mother-in-Law
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Not Eligible (7%/5%)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-semibold">100% Tax-Free</td>
                      <td className="p-3.5 sm:p-4">
                        Exempt from IT, but NOT in UP&rsquo;s ₹5,000 stamp list.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Uncle, Aunt, Nephew, Niece, Cousin
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Not Eligible (7%/5%)</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">
                        Often Taxable (Check)
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Full stamp duty applies; nephew/niece gifts are taxable.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-rose-50/30">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Company, Firm, LLP, Trust or HUF
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Strictly Barred</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Tax Rules Vary</td>
                      <td className="p-3.5 sm:p-4">
                        UP notification covers natural persons only.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PROPERTY TYPES & 2026 COMMERCIAL SHOP EXPANSION */}
            <section id="property-scope-2026" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>2023 VS 2026 UP CABINET EXPANSION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Residential, Farm &amp; Commercial Shop Rules (2026)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A frequent question from Noida and Lucknow owners is whether commercial shops get
                the ₹5,000 stamp duty benefit. Until late 2025, shops were excluded. In January
                2026, the UP Government expanded the cap to cover business real estate too.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-black text-[#C65378] uppercase tracking-wider text-[11px]">
                    Aug 3, 2023 Order
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">
                    Residential &amp; Agricultural Land
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Notification No. 18/2023/995 capped stamp duty at ₹5,000 for apartments, houses,
                    residential plots, and farm land gifted within the family.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-2xs space-y-2">
                  <div className="font-black text-emerald-700 uppercase tracking-wider text-[11px]">
                    Jan 8, 2026 Expansion
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">
                    Commercial Shops &amp; Industrial Plots
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Following the Jan 6, 2026 UP Cabinet decision, Notification No. 01/2026/26 added
                    shops, showrooms, offices, factories, and warehouses to the ₹5,000 cap.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-2xs space-y-2">
                  <div className="font-black text-amber-800 uppercase tracking-wider text-[11px]">
                    Still Excluded in UP
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">
                    Corporate &amp; Rapid Re-Gifts
                  </div>
                  <p className="text-amber-950 leading-relaxed">
                    Properties owned by private companies, partnership firms, LLPs, or trusts cannot
                    use the ₹5,000 cap. Re-gifting within 5 years is also barred.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: STANDARD 7% VS CONCESSIONAL ₹5,000 COMPARISON TABLE */}
            <section id="standard-vs-concessional" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>COST SAVINGS BENCHMARK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Standard 7% vs Concessional ₹5,000 Fee Comparison
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The table below shows how much stamp duty UP families save across different circle
                rate slabs. Note that under UP&rsquo;s enhanced women&rsquo;s rebate, female buyers
                get a 1% stamp duty discount on non-family transfers up to ₹1 Crore.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Property Circle Value</th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Urban Male (7%)</th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Urban Female (6% / 7%)</th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Rural Area (5%)</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        UP Family Gift Cap
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-amber-300">
                        Urban Male Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {[
                      {
                        val: "₹25 Lakh",
                        m: "₹1,75,000",
                        f: "₹1,50,000 (6%)",
                        r: "₹1,25,000",
                        cap: "₹5,000 + ₹1,000",
                        save: "₹1,70,000",
                      },
                      {
                        val: "₹50 Lakh",
                        m: "₹3,50,000",
                        f: "₹3,00,000 (6%)",
                        r: "₹2,50,000",
                        cap: "₹5,000 + ₹1,000",
                        save: "₹3,45,000",
                      },
                      {
                        val: "₹1 Crore",
                        m: "₹7,00,000",
                        f: "₹6,00,000 (6%)",
                        r: "₹5,00,000",
                        cap: "₹5,000 + ₹1,000",
                        save: "₹6,95,000",
                      },
                      {
                        val: "₹2 Crore",
                        m: "₹14,00,000",
                        f: "₹14,00,000 (7%)",
                        r: "₹10,00,000",
                        cap: "₹5,000 + ₹1,000",
                        save: "₹13,95,000",
                      },
                      {
                        val: "₹5 Crore",
                        m: "₹35,00,000",
                        f: "₹35,00,000 (7%)",
                        r: "₹25,00,000",
                        cap: "₹5,000 + ₹1,000",
                        save: "₹34,95,000",
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">{row.val}</td>
                        <td className="p-3.5 sm:p-4">{row.m}</td>
                        <td className="p-3.5 sm:p-4">{row.f}</td>
                        <td className="p-3.5 sm:p-4">{row.r}</td>
                        <td className="p-3.5 sm:p-4 font-bold text-emerald-700">{row.cap}</td>
                        <td className="p-3.5 sm:p-4 font-extrabold text-[#C65378]">{row.save}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                Note: Table compares Stamp Duty and processing fee. Statutory 1% Registration Fee
                under Section 78 is checked separately on the IGRSUP portal at the time of slot
                booking.
              </p>
            </section>

            {/* SECTION 6: NOIDA, GREATER NOIDA & LUCKNOW LEASEHOLD RULES */}
            <section id="noida-lucknow-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>CITY-SPECIFIC TRANSFER RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Noida, Greater Noida &amp; Lucknow Leasehold Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Registering the Gift Deed at the Sub-Registrar Office is step one. Your next step
                  depends on whether the flat or plot is leasehold or freehold.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-[#C65378] uppercase tracking-wider text-[11px]">
                      Noida / Greater Noida / YEIDA
                    </div>
                    <div className="font-bold text-slate-900">Authority Transfer Memorandum</div>
                    <p className="text-slate-600 leading-relaxed">
                      Most group housing flats are 99-year leasehold. After SRO filing, submit the
                      registered gift deed and builder NDC to the Authority for a Transfer
                      Memorandum. Blood relatives typically get a 50% cut in authority transfer
                      charges.
                    </p>
                    <Link
                      href="/locations/noida"
                      className="inline-flex items-center gap-1 text-[#C65378] font-bold pt-1 hover:underline"
                    >
                      <span>Noida Estate Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-[#C65378] uppercase tracking-wider text-[11px]">
                      Lucknow &amp; Ghaziabad
                    </div>
                    <div className="font-bold text-slate-900">LDA, GDA &amp; Nagar Nigam Mutation</div>
                    <p className="text-slate-600 leading-relaxed">
                      Freehold plots and houses in Gomti Nagar, Indirapuram, or Vasundhara need
                      Nagar Nigam house tax mutation. Leasehold LDA or Awas Vikas units need
                      authority record update after SRO filing.
                    </p>
                    <div className="flex gap-3 pt-1">
                      <Link
                        href="/locations/lucknow"
                        className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline"
                      >
                        <span>Lucknow</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href="/locations/ghaziabad"
                        className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline"
                      >
                        <span>Ghaziabad</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black text-[#C65378] uppercase tracking-wider text-[11px]">
                      Rural UP &amp; Agricultural Land
                    </div>
                    <div className="font-bold text-slate-900">UP Bhulekh Dakhil Kharij</div>
                    <p className="text-slate-600 leading-relaxed">
                      For farm land and village plots, apply for online mutation (Dakhil Kharij)
                      before the Tehsildar so the donee&rsquo;s name reflects on the UP Bhulekh
                      Khatauni extract within 35 to 45 days.
                    </p>
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="inline-flex items-center gap-1 text-[#C65378] font-bold pt-1 hover:underline"
                    >
                      <span>Mutation Service</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE DUAL CONVERSION CTA */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-3.5 h-3.5" />
                  <span>NEED AN ADVOCATE-DRAFTED UP GIFT DEED?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Download Our Blood-Relative Format or Book End-to-End UP SRO Registration
                </div>
                <p className="text-xs text-slate-600">
                  Includes UP ₹5,000 notification recitals, Section 23 senior citizen care clauses,
                  and IGRSUP filing support.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                <Link
                  href="/templates/gift-deed-format-blood-relatives-india"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs transition-colors"
                >
                  <span>View Gift Format</span>
                </Link>
                <Link
                  href="/services/gift-deed-drafting-registration"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-sm"
                >
                  <span>Book Gift Deed Lawyer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* SECTION 7: IGRSUP ONLINE REGISTRATION STEPPER */}
            <section
              id="igrsup-registration-stepper"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>IGRSUP PORTAL STEPPER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step IGRSUP Online Registration Guide
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Every immovable property gift in Uttar Pradesh must be registered under Section 17
                of the Registration Act, 1908 and Section 123 of the Transfer of Property Act. Follow
                these six steps on the IGRSUP portal:
              </p>

              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Step 1: Check Circle Rate on IGRSUP",
                    desc: "Go to igrsup.gov.in and open the rate check tool. Pick your district, tehsil, sector, and asset type to find the exact DM Circle Rate.",
                  },
                  {
                    title: "Step 2: Write the UP Family Gift Deed (Daan Patra)",
                    desc: "Draft a clear Gift Deed noting love and care, zero cash price, exact blood tie, UP Order No. 18/2023/995 or 01/2026/26, and a Section 23 care clause for senior parents.",
                  },
                  {
                    title: "Step 3: Fill Online Form on IGRSUP",
                    desc: "Open 'Sampatti Panjikaran' on igrsup.gov.in. Pick 'Daan Patra' (Gift Deed), choose the exact blood tie, and type giver, taker, witness, and flat details.",
                  },
                  {
                    title: "Step 4: Buy ₹5,000 e-Stamp & Pay Portal Fees",
                    desc: "Buy the ₹5,000 SHCIL e-Stamp sheet and pay the ₹1,000 fee plus the due filing fee online via the Rajkosh / IGRSUP web link.",
                  },
                  {
                    title: "Step 5: Visit UP Sub-Registrar Desk for Thumb Scans",
                    desc: "Book your SRO time slot. The giver, receiver, and two adult witnesses must go together with live IDs and family proof for photos and thumb scans.",
                  },
                  {
                    title: "Step 6: Finish Name Change (Mutation)",
                    desc: "Take home your stamped Gift Deed. File for Khatauni name change on UP Bhulekh, Nagar Nigam house tax update, or Noida/GNIDA Transfer Memo.",
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

            {/* SECTION 8: REQUIRED DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SRO VERIFICATION PAPERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Required Document Checklist for UP SRO Filing
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Sub-Registrars in Noida, Lucknow, and across UP verify relationship proof strictly
                before approving the ₹5,000 stamp cap. Carry these originals and photocopies:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    group: "Donor & Donee KYC Papers",
                    items: [
                      "Original Aadhaar Card and PAN Card of both donor and donee",
                      "Two passport-size color photos of each party",
                      "Proof of blood relation (Birth Certificate, Marriage Certificate, Passport, or Parivar Register)",
                    ],
                  },
                  {
                    group: "Property Title & Valuation Papers",
                    items: [
                      "Original prior registered Sale Deed, Lease Deed, or Allotment Letter",
                      "Latest UP Bhulekh Khatauni (land) or Nagar Nigam tax receipt (urban home)",
                      "IGRSUP Circle Rate calculation sheet and builder/RWA No Dues Certificate",
                    ],
                  },
                  {
                    group: "Stamp, Fee & Portal Slips",
                    items: [
                      "SHCIL e-Stamp certificate for ₹5,000 stamp duty",
                      "Online ₹1,000 processing fee and IGRSUP registration fee payment receipt",
                      "IGRSUP pre-registration application slip and SRO appointment token",
                    ],
                  },
                  {
                    group: "Witness & Execution Papers",
                    items: [
                      "Two adult witnesses with original Aadhaar and PAN cards",
                      "Printed Gift Deed signed by donor, accepted by donee, and attested by witnesses",
                      "If a party uses a Power of Attorney, only a registered POA is accepted",
                    ],
                  },
                ].map((box, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
                  >
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-[#C65378]">
                      {box.group}
                    </div>
                    <ul className="space-y-1.5 text-slate-700">
                      {box.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: 5-YEAR LOCK-IN, INCOME TAX & SENIOR CITIZEN RISKS */}
            <section id="disqualifiers-tax-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL RISKS &amp; TAX SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. 5-Year Lock-In, Income Tax &amp; Senior Citizen Risks
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before rushing to use UP&rsquo;s ₹5,000 gift scheme, check four vital legal rules
                  that affect ownership, taxes, and elder security:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm">
                      1. The 5-Year Re-Gifting Lock-In
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Under both the 2023 and 2026 UP orders, if a receiver re-gifts the same asset
                      within 5 years of registration, the ₹5,000 cap is barred. Full 7% or 5% duty
                      applies to that second gift.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm">
                      2. Section 64 Income Tax Clubbing
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Gifts to close relatives are tax-free under Section 56(2)(x). Yet if a husband
                      gifts a flat or shop to his wife (or a parent gifts to a daughter-in-law),
                      future rent is taxed in the donor&rsquo;s return under Section 64(1)(iv) and
                      64(1)(vi).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm">
                      3. Acceptance &amp; Irrevocability (TPA ss. 122-126)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      In <em>Renikuntla Rajamma v. K. Sarwanamma</em> (2014) 9 SCC 445, the Supreme
                      Court held that a registered gift accepted during the donor&rsquo;s life is
                      valid even if the donor keeps living there. Once registered, you cannot cancel
                      a gift simply by changing your mind.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-amber-950 text-sm">
                      4. Senior Citizen Section 23 Care Clause
                    </div>
                    <p className="text-amber-950 leading-relaxed">
                      Parents over 60 who gift their home risk losing shelter if children neglect
                      them. Following <em>Sudesh Chhikara (2022)</em> and{" "}
                      <em>Urmila Dixit (2025)</em>, add an express maintenance condition in the Gift
                      Deed, or use our{" "}
                      <Link
                        href="/tools/senior-citizen-section-23-gift-revocation-checker"
                        className="text-[#C65378] font-bold underline"
                      >
                        Section 23 Revocation Checker
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL-WORLD UP SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Examples: Noida, Lucknow &amp; Agra Transfers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Noida Sector 75 Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Eligible
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifts ₹1.2 Crore Leasehold Flat to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> Standard 7% urban duty would be ₹8,40,000. Under the
                    August 2023 UP order, Stamp Duty drops to ₹5,000 plus ₹1,000 processing fee,
                    saving ₹8,35,000 in stamp duty.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Extra Step:</strong> File SRO registration first, then apply for a Noida
                    Authority Transfer Memorandum with the 50% blood-relative fee discount.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">
                      Lucknow Commercial Shop
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Jan 2026 Rule
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Mother Gifts ₹80 Lakh Gomti Nagar Shop to Son
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> Before 2026, a commercial shop paid full 7% duty
                    (₹5,60,000). Under Notification No. 01/2026/26 (Jan 8, 2026), Stamp Duty is
                    capped at ₹5,000 plus ₹1,000 processing fee.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Savings:</strong> The family saves ₹5,55,000 in stamp duty and pays 0%
                    income tax under Section 56(2)(x).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Agra Uncle to Nephew</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Ineligible
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Uncle Gifts ₹60 Lakh Freehold House to Nephew
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> A nephew is outside UP&rsquo;s 13 notified
                    relations. Full 7% urban stamp duty (₹4,20,000) plus 1% registration fee
                    (₹60,000) applies.
                  </p>
                  <p className="text-rose-800 font-semibold leading-relaxed">
                    <strong>Smarter Path:</strong> A Registered Will costs ₹0 stamp duty and avoids
                    Section 56(2)(x) income tax on a non-relative gift.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPYABLE CLAUSE TEMPLATES & CHECKLIST */}
            <section
              id="gift-deed-recital-templates"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>READY-TO-USE LEGAL DRAFTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. UP Gift Deed Clause Templates &amp; SRO Checklist
              </h3>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    UP Family Gift Deed Concessional Recital &amp; Section 23 Clause
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
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"This Deed of Gift is executed out of natural love and affection without any monetary consideration by the Donor (an individual) in favour of the Donee, who is the Donor's real [Son / Daughter / Spouse / Parent / Real Brother / Real Sister / Daughter-in-Law / Son-in-Law / Grandchild].

This transfer qualifies for concessional maximum stamp duty of Rs. 5,000/- under Section 9(1)(a) and Article 33 of Schedule 1-B of the Indian Stamp Act, 1899 (as amended in Uttar Pradesh), read with UP Notification No. 18/2023/995 dated 03.08.2023 [and Notification No. 01/2026/26 dated 08.01.2026 for commercial/industrial property].

Neither party is a firm, company, or trust, and this property has not been received via a concessional family Gift Deed within the last five (5) years."`}
                </pre>
              </div>

              {/* Template Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Quick SRO Filing Checklist for UP Family Gift Deeds
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
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>₹5,000 SHCIL e-Stamp + ₹1,000 Processing Receipt</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Blood Relation Proof (Birth / Marriage / Passport)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Prior Registered Title Deed &amp; Latest Khatauni / Tax Slip</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Donor, Donee &amp; 2 Witnesses with Aadhaar + PAN</span>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property Transfer &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  advocates draft dispute-free Gift Deeds, Registered Wills, and mutation filings
                  across Noida, Greater Noida, Ghaziabad, Lucknow, and all UP districts.
                </p>

                {/* Related Tools & Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Drafting</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed vs Will Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Delhi Gift Duty Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Maharashtra Duty Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
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
                13. Frequently Asked Questions: UP Family Gift Deeds
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
                        aria-expanded={isOpen}
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
                14. Official UP Notifications &amp; Statutory Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All calculations on this page follow official Uttar Pradesh Stamp &amp;
                  Registration Department orders, Indian property statutes, and Supreme Court
                  precedents. This tool provides general legal information, not individual legal
                  advice.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://igrsup.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>IGRSUP Official Portal (UP Stamp &amp; Registration)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://upbhulekh.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>UP Bhulekh Land Records Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Stamp Act &amp; Transfer of Property Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Portal (Section 56(2)(x) &amp; 64)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Templates &amp; UP Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      All Legal Calculators Hub
                    </Link>
                    <Link
                      href="/services/gift-deed-drafting-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gift Deed Drafting Service
                    </Link>
                    <Link
                      href="/templates/gift-deed-format-blood-relatives-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Blood-Relative Gift Deed Format
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Checker
                    </Link>
                    <Link
                      href="/templates/revocation-of-gift-deed-senior-citizens-act-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Section 23 Gift Cancellation Format
                    </Link>
                    <Link
                      href="/locations/uttar-pradesh"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Uttar Pradesh Will Guide
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

            {/* PLAIN-ENGLISH SUMMARY CARDS (Readability & User Clarity) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check UP Gift Duty First?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Checking the UP blood-relative list before you buy e-stamp saves lakhs of rupees.
                  One wrong relation or entity name cancels the ₹5,000 cap and brings back 7% duty.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Gift Deed vs Registered Will</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Gift Deed shifts title now, so you give up control of your home today. A Will
                  costs zero stamp duty, keeps your home safe in your name, and passes it cleanly
                  later.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers verify your title chain, circle rate, and Noida or Lucknow rules. We
                  draft clear deeds with elder safety terms and guide your family at the SRO desk.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Dual Conversion CTAs)
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
                Specializes in Uttar Pradesh property transfers, IGRSUP Gift Deeds, Noida Authority
                mutations, Section 23 senior protections, and dispute-proof Wills.
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
              {/* CARD 2: DUAL CTA 1 - SELF-SERVE WILL DRAFTING (/start) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>KEEP 100% LIFETIME OWNERSHIP</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Want Zero Stamp Duty &amp; Full Control? Draft a Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A Gift Deed gives away your flat today. A Registered Will costs ₹0 stamp duty and
                  lets you stay 100% owner for life.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <Link
                  href="/start"
                  className="block text-[11px] text-rose-200 hover:text-white underline font-semibold"
                >
                  Explore Self-Serve Will Platform
                </Link>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (/contact) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>UP GIFT DEED &amp; IGRSUP DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Noida, Lucknow or UP Gift Deed Drafting?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advocates handle title checks, ₹5,000 stamp drafting, Section 23 clauses, SRO
                  registration, and Noida TM mutation.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book AMA Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why UP Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2023 &amp; 2026 Orders Modelled:</strong> Covers homes, farm land,
                      shops, and industrial plots accurately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Surprises:</strong> Flags 1% registration fees, 5-year
                      lock-in, and Noida leasehold TM rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Elder Safeguards Built In:</strong> Protects senior donors with
                      express Section 23 clauses or Wills.
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
          <span>UP Duty Tool</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Book Lawyer</span>
        </Link>
      </div>
    </div>
  );
}
