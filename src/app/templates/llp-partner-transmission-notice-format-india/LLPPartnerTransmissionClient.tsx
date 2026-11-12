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
  FileSpreadsheet,
  Compass,
  Briefcase,
  AlertCircle,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Rules: LLP Section 24" },
  { id: "interactive-calculator", label: "2. Free Transmission Simulator" },
  { id: "comparison-table", label: "3. Heir Admission vs Buyout" },
  { id: "mca-form4-sop", label: "4. MCA Form 4 Filing SOP" },
  { id: "transmission-notice-template", label: "5. Legal Heir Notice Draft" },
  { id: "supplemental-deed-template", label: "6. Supplemental Deed Format" },
  { id: "capital-settlement-schedule", label: "7. Capital Balance Schedule" },
  { id: "section-6-defense", label: "8. Section 6: 6-Month Rule" },
  { id: "case-studies", label: "9. Real Case Studies: Delhi & Mumbai" },
  { id: "stamp-duty-guide", label: "10. State Stamp Duty on LLP Deeds" },
  { id: "statutory-citations", label: "11. Legal Citations & Lawyer Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const STATE_STAMP_RATES: Record<string, { label: string; fixedFee: string; notes: string }> = {
  delhi: {
    label: "Delhi (NCT)",
    fixedFee: "₹1,000",
    notes: "Flat stamp duty of ₹1,000 for Supplemental LLP Agreements with no capital increase.",
  },
  maharashtra: {
    label: "Maharashtra",
    fixedFee: "₹1,000 - ₹5,000",
    notes: "Article 47 duty of ₹1,000 for standard change or slab duty on fresh capital.",
  },
  karnataka: {
    label: "Karnataka",
    fixedFee: "₹2,000",
    notes: "Article 40 prescribes ₹2,000 flat stamp duty on deeds altering LLP partner terms.",
  },
  uttar_pradesh: {
    label: "Uttar Pradesh",
    fixedFee: "₹750 - ₹1,000",
    notes: "Article 46 nominal stamp duty when no land or building is moved.",
  },
  haryana: {
    label: "Haryana",
    fixedFee: "₹1,000",
    notes: "Nominal stamp duty on supplemental deeds signed in Gurgaon or Faridabad.",
  },
  tamil_nadu: {
    label: "Tamil Nadu",
    fixedFee: "₹1,000",
    notes: "Non-judicial stamp duty of ₹1,000 for amendments without land sale.",
  },
  telangana: {
    label: "Telangana & AP",
    fixedFee: "₹1,000",
    notes: "Article 41 low duty on supplemental deeds for Limited Liability Partnerships.",
  },
};

const FAQS = [
  {
    q: "What happens when a partner dies in a Limited Liability Partnership in India?",
    a: "Under Section 24(2) of the LLP Act 2008, a person stops being a partner on death. The LLP does not dissolve because it has perpetual life as a body corporate under Section 3. The money rights of the deceased partner pass to legal heirs under Section 24(5). But management rights do not transfer unless the deed allows it.",
  },
  {
    q: "Does a legal heir automatically become a partner in an LLP upon the partner's death?",
    a: "No. Under Section 24(6) of the LLP Act 2008, heirs do not get management rights by default. An heir only joins the firm if the signed LLP agreement allows it, or if all surviving partners agree in writing through a new Supplemental LLP Agreement.",
  },
  {
    q: "What is the deadline for filing MCA Form 4 upon the death of an LLP partner?",
    a: "Under Section 25(2) of the LLP Act 2008 and Rule 10, the LLP must file MCA Form 4 within 30 days of death. Late filing brings daily fines under Section 69.",
  },
  {
    q: "What happens if a two-partner LLP loses one partner to death?",
    a: "Under Section 6 of the LLP Act 2008, an LLP must have at least two partners. If only one partner is left for over 6 months, that surviving partner becomes personally liable for all new firm debts. A new partner must join within 6 months.",
  },
  {
    q: "How is the capital balance calculated and settled under Section 24(5) of the LLP Act?",
    a: "Section 24(5) gives heirs the right to get back the deceased partner capital contribution. It also includes their share of firm profits after deducting losses up to the date of death. The firm auditor checks this through an interim balance sheet.",
  },
  {
    q: "Is a Supplemental LLP Agreement mandatory when settling capital transmission?",
    a: "Yes. Any change in partners, capital ratios, or profit shares needs a Supplemental LLP Agreement. Partners must sign it on stamp paper and file MCA Form 3 within 30 days.",
  },
  {
    q: "What documents must be attached to MCA Form 4 for partner transmission?",
    a: "Required papers include: (1) Certified copy of the municipal Death Certificate, (2) Partner meeting resolution noting the death, (3) Legal Heir Certificate or registered Will, (4) Consent and NOC from heirs, and (5) The Supplemental LLP Agreement.",
  },
  {
    q: "How much stamp duty is payable on a Supplemental LLP Agreement in India?",
    a: "Stamp duty depends on the state. Delhi charges ₹1,000. Maharashtra charges ₹1,000 under Article 47. Karnataka charges ₹2,000 under Article 40. Extra duty applies only if total firm capital increases.",
  },
  {
    q: "Does transmission of LLP capital to legal heirs attract capital gains tax in India?",
    a: "No. Inherited money is tax-free under Section 56(2)(x) of the Income Tax Act 1961. Returning the original capital balance to heirs does not bring capital gains tax. Tax applies only if firm land is transferred to settle claims.",
  },
  {
    q: "What remedies exist if surviving partners refuse to settle the deceased partner's capital balance?",
    a: "If surviving partners refuse to pay the capital balance under Section 24(5), heirs can send a legal notice. They can also start arbitration under the LLP agreement, or file a petition before the NCLT under Section 64.",
  },
];

export default function LLPPartnerTransmissionClient() {
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
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [copiedSupplementalDeed, setCopiedSupplementalDeed] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ========================================================
  // INTERACTIVE LLP CAPITAL TRANSMISSION SIMULATOR STATE
  // ========================================================
  const [deceasedCapital, setDeceasedCapital] = useState<number>(2500000); // ₹25.00 Lakhs
  const [profitSharePercent, setProfitSharePercent] = useState<number>(50); // 50%
  const [accumulatedProfits, setAccumulatedProfits] = useState<number>(4000000); // ₹40.00 Lakhs
  const [partnerLoanAccount, setPartnerLoanAccount] = useState<number>(500000); // ₹5.00 Lakhs
  const [outstandingDrawings, setOutstandingDrawings] = useState<number>(200000); // ₹2.00 Lakhs
  const [selectedState, setSelectedState] = useState<string>("delhi");
  const [resolutionChoice, setResolutionChoice] = useState<"admit_heir" | "capital_buyout">("admit_heir");

  // Calculations under Section 24(5)
  const profitShareAmount = Math.round((accumulatedProfits * profitSharePercent) / 100);
  const totalGrossEntitlement = deceasedCapital + profitShareAmount + partnerLoanAccount;
  const netSettlementEntitlement = Math.max(0, totalGrossEntitlement - outstandingDrawings);

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

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyNoticeToClipboard = () => {
    const noticeText = `FORMAL NOTICE OF DEMISE AND TRANSMISSION OF PARTNERSHIP INTEREST
(Under Section 24(5) and Section 25 of the Limited Liability Partnership Act, 2008)

To:
1. The Designated Partners and Partners,
   [NAME OF LIMITED LIABILITY PARTNERSHIP],
   LLPIN: [AAB-XXXX],
   Registered Office: [Full Registered Office Address, City, State, PIN].

2. [Name of Surviving Designated Partner],
   Address: [Partner Address].

Date: [Date of Notice]
Place: [City, State]

SUBJECT: NOTICE OF DEMISE OF DESIGNATED PARTNER [DECEASED PARTNER NAME] (DPIN: [XXXXXXX]) AND CLAIM FOR CAPITAL TRANSMISSION UNDER SECTION 24(5) OF THE LLP ACT 2008.

Respected Partners,

We are the lawful Class I legal heirs of late [Deceased Partner Name]. Our predecessor held a [XX]% partnership share in [Name of LLP] (LLPIN: [AAB-XXXX]):

1. [Legal Heir 1 Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], Relationship: [Spouse/Son/Daughter].
2. [Legal Heir 2 Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], Relationship: [Son/Daughter].

1. INTIMATION OF DEMISE:
We inform you that [Deceased Partner Name] passed away on [Date of Death]. A certified copy of the municipal Death Certificate is enclosed as ANNEXURE-A.

2. CESSATION UNDER SECTION 24(2):
Under Section 24(2) of the LLP Act 2008, [Deceased Partner Name] ceased to be a partner on [Date of Death].

3. CLAIM FOR CAPITAL SETTLEMENT UNDER SECTION 24(5):
Under Section 24(5) of the LLP Act 2008, the legal heirs have a legal right to receive:
(a) The capital contribution of ₹[Capital Amount];
(b) His [XX]% share in accumulated profits and reserves up to the date of demise;
(c) Full return of his Partner Loan Account balance of ₹[Loan Amount].

4. MCA FORM 4 DEADLINE:
Under Section 25(2) and Rule 10, the LLP must file MCA Form 4 within 30 days of demise.

5. DEMAND FOR ACTION:
We request you to:
(i) Hold a partners meeting within 7 days to record the demise;
(ii) Share the audited interim balance sheet as of [Date of Death];
(iii) Decide whether to admit [Legal Heir Name] as a partner or settle the capital balance;
(iv) File MCA Form 4 within 30 days to avoid statutory penalties.

Yours faithfully,

1. __________________________
   [Legal Heir 1 Name / Signature]

2. __________________________
   [Legal Heir 2 Name / Signature]

Enclosures:
1. Death Certificate Copy (Annexure-A).
2. Legal Heir Certificate Copy (Annexure-B).
3. PAN and Aadhaar copies of Legal Heirs (Annexure-C).`;

    navigator.clipboard.writeText(noticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  const copySupplementalDeedToClipboard = () => {
    const deedText = `SUPPLEMENTAL LIMITED LIABILITY PARTNERSHIP AGREEMENT
(Under the Limited Liability Partnership Act, 2008 and LLP Rules, 2009)

THIS SUPPLEMENTAL AGREEMENT is made on this [Day] day of [Month], [Year], at [City, State], between:

1. [SURVIVING PARTNER 1 NAME], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE FIRST PART".

2. [SURVIVING PARTNER 2 NAME], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE SECOND PART".

AND

3. [LEGAL HEIR / INCOMING PARTNER NAME], son/daughter of Late [Deceased Partner Name], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE THIRD PART".

WHEREAS:
A. The Parties carry on business under "[NAME OF LLP]" (LLPIN: [AAB-XXXX]) under LLP Agreement dated [Date of Agreement].
B. [Deceased Partner Name] passed away on [Date of Death], leaving the Party of the Third Part as sole legal heir.
C. To comply with Section 6 of the LLP Act 2008 and maintain at least two partners, the partners agree to admit the Party of the Third Part.

NOW IT IS MUTUALLY AGREED AS FOLLOWS:

1. CESSATION OF DECEASED PARTNER:
Late [Deceased Partner Name] ceased to be a partner on [Date of Death] under Section 24(2). MCA Form 4 is filed with the Registrar.

2. ADMISSION OF LEGAL HEIR:
The Party of the Third Part is admitted as a Partner of the LLP with effect from [Effective Date].

3. TRANSMISSION OF CAPITAL:
The capital contribution of Late [Deceased Partner Name] of ₹[Amount] is credited to the Party of the Third Part. Revised shares are:
- Party of the First Part: ₹[Capital 1] ([XX]%)
- Party of the Second Part: ₹[Capital 2] ([XX]%)
- Party of the Third Part: ₹[Capital 3] ([XX]%)
Total: ₹[Total Capital] (100%)

4. FULL DISCHARGE UNDER SECTION 24(5):
The Party of the Third Part accepts admission and releases the firm from past capital claims under Section 24(5).

5. MCA FILING:
Partners will file MCA Form 3 and Form 4 within 30 days.

IN WITNESS WHEREOF, the Parties sign below.

PARTY OF THE FIRST PART: ________________________
PARTY OF THE SECOND PART: ________________________
PARTY OF THE THIRD PART: ________________________

WITNESSES:
1. Name and Address: ________________________
2. Name and Address: ________________________`;

    navigator.clipboard.writeText(deedText);
    setCopiedSupplementalDeed(true);
    setTimeout(() => setCopiedSupplementalDeed(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `MCA FORM 4 AND LLP TRANSMISSION CHECKLIST:
1. Certified Municipal Death Certificate copy.
2. Legal transmission notice served by legal heirs.
3. Legal Heir Certificate or registered Will copy.
4. Interim Balance Sheet prepared by the firm auditor.
5. Partner meeting resolution noting the death and approving new terms.
6. Supplemental LLP Agreement executed on stamp paper.
7. MCA Form 4 filed within 30 days of death.
8. MCA Form 3 filed within 30 days of the agreement.
9. Bank signing powers updated with approved MCA challan.
10. GST and PAN portal partner records updated.`;

    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
            <span>LIMITED LIABILITY PARTNERSHIP ACT, 2008 • SS. 24 &amp; 25 &amp; MCA FORM 4</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            LLP Partner Transmission Notice Format India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted notice formats and supplemental deed templates under the LLP Act 2008.
            Settle capital balances fast, file MCA Form 4 within 30 days, and protect surviving partners from personal liability.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#transmission-notice-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Notice &amp; Deed Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Succession Plan</span>
            </button>
            <Link
              href="/services/corporate-business-succession-family-constitution"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult LLP Lawyer</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 24(5)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY CAPITAL RETURN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30-Day MCA Rule</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FORM 4 ROC FILING WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 6 Grace</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                6-MONTH SURVIVAL WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 3 Deed</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FIRM DISSOLUTION DEFENSE
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
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MCA &amp; ROC Verified</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Complies with Section 24(5), Section 25, Rule 10, and Section 6 of the Limited Liability Partnership Act, 2008.
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-200/80 text-xs space-y-2.5">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                <span>30-Day Form 4 Clock</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Failing to notify the Registrar within 30 days brings daily fines. It also freezes bank signing powers.
              </p>
              <a
                href="#mca-form4-sop"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C65378] hover:underline"
              >
                <span>View Filing Checklist</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT BODY
              ===================================================================== */}
          <main className="min-w-0 space-y-10">
            {/* Quick Takeaway Banner */}
            <div className="rounded-3xl border border-rose-200/70 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-[#C65378] text-white shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Quick Takeaway: Rules on LLP Partner Death
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>Firm Stays Alive:</strong> Unlike a regular firm, an LLP stays alive when a partner dies. Its legal identity does not end.
                    </li>
                    <li>
                      <strong>Section 24(5) Money Rights:</strong> Heirs have a legal right to get back the capital balance and unshared profits.
                    </li>
                    <li>
                      <strong>Section 24(6) Control Limits:</strong> Heirs do not get voting or management powers without a new written deed.
                    </li>
                    <li>
                      <strong>Section 6 Risk:</strong> If only one partner is left for over 6 months, that partner faces unlimited personal liability.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (THE ONLY H2 ON THE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION &amp; MCA FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: LLP Partner Transmission Under Section 24
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  An Indian Limited Liability Partnership (LLP) gives business partners limited liability and endless life. It does not die when a partner dies. But when an active partner passes away, the firm must take quick legal steps to settle accounts.
                </p>
                <p>
                  Under <strong>Section 24(2) of the LLP Act 2008</strong>, a person stops being a partner on their death. The firm itself stays alive under Section 3. But the partnership ties end on that day.
                </p>
                <p>
                  <strong>Section 24(5)</strong> gives strong rights to the legal heirs. The heirs have a legal right to get back the partner&apos;s capital share. They also get the partner&apos;s share in firm profits after deducting losses. These values are fixed on the date of death.
                </p>
                <p>
                  <strong>Section 24(6)</strong> sets a clear rule for firm control. Legal heirs do not become partners by default. They do not get voting power or daily control. If the firm wants the heir to join, all partners must sign a new agreement. The firm must then file MCA Form 3 and Form 4 within 30 days.
                </p>
              </div>

              {/* Key Facts on Partner Death Quick Guide */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 text-xs sm:text-sm">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Key Facts on Partner Death in India</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  The firm does not stop work. Business goes on as usual. An LLP has its own life.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Heirs receive the full capital balance in cash. Heirs do not inherit firm debts.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Heirs have no right to vote or manage. Partners must invite them first.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The firm must report the death in 30 days. Late filing costs extra fees.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If only one partner is left, find a new partner within six months. This keeps your personal wealth safe.
                </p>
              </div>

              {/* Editorial Visual: LLP Partner Transmission Framework Image Card */}
              <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                <Image
                  src="/images/llp-partner-transmission-notice-format-india-og.jpg"
                  alt="LLP Partner Transmission Notice Format MCA Form 4 and Supplemental Deed"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                    LLP Partner Transmission &amp; MCA Form 4 Regulatory Framework
                  </span>
                  <span className="font-semibold text-slate-500">LLP Act 2008 ss. 24 &amp; 25</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE SETTLEMENT ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free LLP Capital Balance &amp; Transmission Simulator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this tool to test capital transmission under Section 24(5).
                Find net money due to legal heirs, check partner loans, and see the Section 6 deadline.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Resolution Option */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Resolution Strategy</span>
                    </label>
                    <select
                      value={resolutionChoice}
                      onChange={(e) => setResolutionChoice(e.target.value as "admit_heir" | "capital_buyout")}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="admit_heir">Admit Legal Heir as Partner (Supplemental Deed)</option>
                      <option value="capital_buyout">Full Capital Payout &amp; Heir Release</option>
                    </select>
                  </div>

                  {/* State Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Jurisdiction State</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(STATE_STAMP_RATES).map(([key, data]) => (
                        <option key={key} value={key}>
                          {data.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Profit Share Percentage */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Deceased Partner Share</span>
                    </label>
                    <select
                      value={profitSharePercent}
                      onChange={(e) => setProfitSharePercent(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value={50}>50% (Two-Partner Equal Firm)</option>
                      <option value={33.33}>33.33% (Three-Partner Firm)</option>
                      <option value={25}>25% (Four-Partner Firm)</option>
                      <option value={20}>20% (Five-Partner Firm)</option>
                    </select>
                  </div>
                </div>

                {/* Numerical Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Capital Contribution */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700">Deceased Partner Capital Contribution:</span>
                      <span className="text-[#C65378] text-sm font-extrabold">{formatINR(deceasedCapital)}</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={20000000}
                      step={250000}
                      value={deceasedCapital}
                      onChange={(e) => setDeceasedCapital(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                      <span>₹5 Lakhs</span>
                      <span>₹1.00 Crore</span>
                      <span>₹2.00 Crores</span>
                    </div>
                  </div>

                  {/* Accumulated General Reserves */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700">LLP Accumulated Reserves / Profits:</span>
                      <span className="text-emerald-700 text-sm font-extrabold">{formatINR(accumulatedProfits)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={30000000}
                      step={500000}
                      value={accumulatedProfits}
                      onChange={(e) => setAccumulatedProfits(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                      <span>₹0</span>
                      <span>₹1.50 Crores</span>
                      <span>₹3.00 Crores</span>
                    </div>
                  </div>

                  {/* Partner Loan Account */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700">Partner Loan / Current Account Credit:</span>
                      <span className="text-indigo-700 text-sm font-extrabold">{formatINR(partnerLoanAccount)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10000000}
                      step={100000}
                      value={partnerLoanAccount}
                      onChange={(e) => setPartnerLoanAccount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                      <span>₹0</span>
                      <span>₹50 Lakhs</span>
                      <span>₹1.00 Crore</span>
                    </div>
                  </div>

                  {/* Drawings Deductions */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700">Less: Drawings / Unabsorbed Losses:</span>
                      <span className="text-rose-700 text-sm font-extrabold">-{formatINR(outstandingDrawings)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={5000000}
                      step={50000}
                      value={outstandingDrawings}
                      onChange={(e) => setOutstandingDrawings(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                      <span>₹0</span>
                      <span>₹25 Lakhs</span>
                      <span>₹50 Lakhs</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] mb-1">
                      Section 24(5) Net Entitlement
                    </div>
                    <div className="text-2xl font-black text-slate-900">{formatINR(netSettlementEntitlement)}</div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Capital ({formatINR(deceasedCapital)}) + Profit Share ({formatINR(profitShareAmount)}) + Loans ({formatINR(partnerLoanAccount)}) - Deductions.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                      Action Required
                    </div>
                    <div className="text-base font-extrabold text-slate-900">
                      {resolutionChoice === "admit_heir" ? "Execute Supplemental Deed" : "Full Buyout & Settlement"}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {resolutionChoice === "admit_heir"
                        ? "Credit heir capital account with ₹" + (deceasedCapital / 100000).toFixed(1) + "L & file Form 3 within 30 days."
                        : "Execute Release Deed, pay ₹" + (netSettlementEntitlement / 100000).toFixed(1) + "L & file Form 4 cessation."}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                      State Stamp Duty Estimate
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {STATE_STAMP_RATES[selectedState]?.fixedFee || "₹1,000"}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      {STATE_STAMP_RATES[selectedState]?.notes || "Non-judicial stamp paper duty."}
                    </div>
                  </div>
                </div>

                {/* Countdown Warning Bar */}
                <div className="p-4 rounded-2xl bg-[#172228] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Strict Statutory Timelines:</strong> Form 4 must be filed within <strong>30 days</strong>. If partner count is 1, Section 6 gives <strong>6 months</strong> to admit a new partner before personal liability attaches!
                    </span>
                  </div>
                  <button
                    onClick={handleStartDraft}
                    className="shrink-0 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors"
                  >
                    Draft Agreement Now
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Legal Heir Admission vs Capital Buyout vs Dissolution
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Surviving partners and legal heirs have three main choices under Indian law. They can admit the heir, buy out the capital, or wind up the firm. Each choice has distinct filing and tax rules:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white text-xs font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Legal Metric</th>
                      <th className="p-3.5 sm:p-4 text-emerald-300">Option A: Heir Admission</th>
                      <th className="p-3.5 sm:p-4 text-rose-300">Option B: Capital Buyout</th>
                      <th className="p-3.5 sm:p-4 text-amber-300">Option C: Firm Dissolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Governing Statute</td>
                      <td className="p-3.5 sm:p-4">LLP Act Sec 25 &amp; Rule 10</td>
                      <td className="p-3.5 sm:p-4">LLP Act Sec 24(5)</td>
                      <td className="p-3.5 sm:p-4">LLP Act Sec 63 &amp; 64</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Management Rights</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-semibold">Heir gets voting &amp; management rights</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Zero management rights (strictly barred)</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">LLP terminates completely</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Capital Transfer</td>
                      <td className="p-3.5 sm:p-4">Capital remains in LLP, credited to heir</td>
                      <td className="p-3.5 sm:p-4">LLP refunds capital + reserves in cash</td>
                      <td className="p-3.5 sm:p-4">Assets liquidated, creditors paid first</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">MCA ROC Filings</td>
                      <td className="p-3.5 sm:p-4">Form 4 (Cessation &amp; Appointment) + Form 3</td>
                      <td className="p-3.5 sm:p-4">Form 4 (Cessation) + Form 3 (Reconstitution)</td>
                      <td className="p-3.5 sm:p-4">Form 24 (Striking off) or NCLT Winding Up</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Section 6 Personal Liability</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Completely avoided (firm keeps &gt;= 2 partners)</td>
                      <td className="p-3.5 sm:p-4 text-amber-700">Must admit 3rd party within 6 months if 2-partner</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">Avoided if wound up within 6 months</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Tax Impact on Heirs</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">100% Tax-Exempt under Sec 56(2)(x)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Capital return is tax-exempt inheritance</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">Firm-level capital gains on liquidation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: MCA FORM 4 FILING SOP */}
            <section id="mca-form4-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>MCA COMPLIANCE CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. MCA Form 4 Filing SOP &amp; 30-Day Step-by-Step
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 25(2) and Rule 10, designated partners must file Form 4 on the MCA V3 portal. Follow this five-step SOP to finish filing on time:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    <span>Get Death Certificate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Get an official municipal death certificate with a QR code. Also get the legal heir certificate or registered Will copy.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>Pass Partner Resolution</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Call a meeting of partners. Record the death under Section 24(2), agree on capital return or admission, and pick a partner to sign forms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">
                      3
                    </span>
                    <span>Sign Supplemental Agreement</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Write the deed on non-judicial stamp paper. State new capital shares, profit ratios, and legal heir release terms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">
                      4
                    </span>
                    <span>File MCA Form 4 within 30 Days</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fill Form 4 on the MCA V3 site. Attach the Death Certificate, partner resolution, and professional certification by a CA or CS.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">
                      5
                    </span>
                    <span>File Form 3 &amp; Update Bank Signers</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    File Form 3 with the signed Supplemental Deed within 30 days. Give the MCA challan to the firm bank to update signing powers.
                  </p>
                </div>
              </div>

              {/* Copyable Checklist */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-700">
                  <span className="font-bold">Need the full 10-point SRO &amp; MCA Checklist?</span> Download or copy to clipboard for your CA or CS.
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#C65378] text-slate-800 text-xs font-bold transition-colors shadow-2xs"
                >
                  {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedChecklist ? "Copied!" : "Copy Checklist"}</span>
                </button>
              </div>
            </section>

            {/* SECTION 5: LEGAL HEIR TRANSMISSION NOTICE DRAFT */}
            <section id="transmission-notice-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <FileText className="w-4 h-4" />
                  <span>LEGAL NOTICE DRAFT TEMPLATE</span>
                </div>
                <button
                  onClick={copyNoticeToClipboard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C65378] text-white hover:bg-[#a33b5c] text-xs font-bold transition-all shadow-xs"
                >
                  {copiedNotice ? <CheckCheck className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNotice ? "Draft Copied to Clipboard!" : "Copy Legal Notice Draft"}</span>
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Legal Heir Transmission Notice Draft Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Legal heirs send this formal notice to the surviving partners and the firm. It records the death, claims capital under Section 24(5), and starts the 30-day MCA clock:
              </p>

              {/* Template Card */}
              <div className="rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 font-mono text-xs leading-relaxed max-h-[460px] overflow-y-auto shadow-inner">
                <pre className="whitespace-pre-wrap">
{`FORMAL NOTICE OF DEMISE AND TRANSMISSION OF PARTNERSHIP INTEREST
(Under Section 24(5) and Section 25 of the Limited Liability Partnership Act, 2008)

To:
1. The Designated Partners and Partners,
   [NAME OF LIMITED LIABILITY PARTNERSHIP],
   LLPIN: [AAB-XXXX],
   Registered Office: [Full Registered Office Address, City, State, PIN].

2. [Name of Surviving Designated Partner],
   Address: [Partner Address].

Date: [Date of Notice]
Place: [City, State]

SUBJECT: NOTICE OF DEMISE OF DESIGNATED PARTNER [DECEASED PARTNER NAME] (DPIN: [XXXXXXX]) AND CLAIM FOR CAPITAL TRANSMISSION UNDER SECTION 24(5) OF THE LLP ACT 2008.

Respected Partners,

We are the lawful Class I legal heirs of late [Deceased Partner Name]. Our predecessor held a [XX]% partnership share in [Name of LLP] (LLPIN: [AAB-XXXX]):

1. [Legal Heir 1 Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], Relationship: [Spouse/Son/Daughter].
2. [Legal Heir 2 Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], Relationship: [Son/Daughter].

1. INTIMATION OF DEMISE:
We inform you that [Deceased Partner Name] passed away on [Date of Death]. A certified copy of the municipal Death Certificate is enclosed as ANNEXURE-A.

2. CESSATION UNDER SECTION 24(2):
Under Section 24(2) of the LLP Act 2008, [Deceased Partner Name] ceased to be a partner on [Date of Death].

3. CLAIM FOR CAPITAL SETTLEMENT UNDER SECTION 24(5):
Under Section 24(5) of the LLP Act 2008, the legal heirs have a legal right to receive:
(a) The capital contribution of ₹[Capital Amount];
(b) His [XX]% share in accumulated profits and reserves up to the date of demise;
(c) Full return of his Partner Loan Account balance of ₹[Loan Amount].

4. MCA FORM 4 DEADLINE:
Under Section 25(2) and Rule 10, the LLP must file MCA Form 4 within 30 days of demise.

5. DEMAND FOR ACTION:
We request you to:
(i) Hold a partners meeting within 7 days to record the demise;
(ii) Share the audited interim balance sheet as of [Date of Death];
(iii) Decide whether to admit [Legal Heir Name] as a partner or settle the capital balance;
(iv) File MCA Form 4 within 30 days to avoid statutory penalties.

Yours faithfully,

1. __________________________
   [Legal Heir 1 Name / Signature]

2. __________________________
   [Legal Heir 2 Name / Signature]`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: SUPPLEMENTAL LLP AGREEMENT FORMAT */}
            <section id="supplemental-deed-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <Layers className="w-4 h-4" />
                  <span>SUPPLEMENTAL LLP AGREEMENT FORMAT</span>
                </div>
                <button
                  onClick={copySupplementalDeedToClipboard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C65378] text-white hover:bg-[#a33b5c] text-xs font-bold transition-all shadow-xs"
                >
                  {copiedSupplementalDeed ? <CheckCheck className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSupplementalDeed ? "Deed Copied to Clipboard!" : "Copy Supplemental Deed Format"}</span>
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Supplemental LLP Agreement Deed Template
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When a partner dies and an heir is admitted or capital is settled, partners must sign this Supplemental Agreement on stamp paper and file MCA Form 3 within 30 days:
              </p>

              {/* Template Card */}
              <div className="rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 font-mono text-xs leading-relaxed max-h-[460px] overflow-y-auto shadow-inner">
                <pre className="whitespace-pre-wrap">
{`SUPPLEMENTAL LIMITED LIABILITY PARTNERSHIP AGREEMENT
(Under the Limited Liability Partnership Act, 2008 and LLP Rules, 2009)

THIS SUPPLEMENTAL AGREEMENT is made on this [Day] day of [Month], [Year], at [City, State], between:

1. [SURVIVING PARTNER 1 NAME], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE FIRST PART".

2. [SURVIVING PARTNER 2 NAME], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE SECOND PART".

AND

3. [LEGAL HEIR / INCOMING PARTNER NAME], son/daughter of Late [Deceased Partner Name], residing at [Address], DPIN: [XXXXXXX], PAN: [ABCDE1234F], hereinafter called the "PARTY OF THE THIRD PART".

WHEREAS:
A. The Parties carry on business under "[NAME OF LLP]" (LLPIN: [AAB-XXXX]) under LLP Agreement dated [Date of Agreement].
B. [Deceased Partner Name] passed away on [Date of Death], leaving the Party of the Third Part as sole legal heir.
C. To comply with Section 6 of the LLP Act 2008 and maintain at least two partners, the partners agree to admit the Party of the Third Part.

NOW IT IS MUTUALLY AGREED AS FOLLOWS:

1. CESSATION OF DECEASED PARTNER:
Late [Deceased Partner Name] ceased to be a partner on [Date of Death] under Section 24(2). MCA Form 4 is filed with the Registrar.

2. ADMISSION OF LEGAL HEIR:
The Party of the Third Part is admitted as a Partner of the LLP with effect from [Effective Date].

3. TRANSMISSION OF CAPITAL:
The capital contribution of Late [Deceased Partner Name] of ₹[Amount] is credited to the Party of the Third Part. Revised shares are:
- Party of the First Part: ₹[Capital 1] ([XX]%)
- Party of the Second Part: ₹[Capital 2] ([XX]%)
- Party of the Third Part: ₹[Capital 3] ([XX]%)
Total: ₹[Total Capital] (100%)

4. FULL DISCHARGE UNDER SECTION 24(5):
The Party of the Third Part accepts admission and releases the firm from past capital claims under Section 24(5).

5. MCA FILING:
Partners will file MCA Form 3 and Form 4 within 30 days.

IN WITNESS WHEREOF, the Parties sign below.

PARTY OF THE FIRST PART: ________________________
PARTY OF THE SECOND PART: ________________________
PARTY OF THE THIRD PART: ________________________

WITNESSES:
1. Name and Address: ________________________
2. Name and Address: ________________________`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: CAPITAL SETTLEMENT SCHEDULE */}
            <section id="capital-settlement-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>FINANCIAL SETTLEMENT SCHEDULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Capital Balance Settlement Schedule &amp; Valuation
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 24(5), the auditor must prepare accounts up to the date of demise. The firm must calculate capital, past profits, and current loans. It then deducts drawings to find the net payout:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs p-4 sm:p-6 space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Audit Schedule: Deceased Partner Capital &amp; Profit Entitlement
                </div>
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 text-xs font-bold uppercase">
                    <tr>
                      <th className="p-3">Financial Head</th>
                      <th className="p-3">Statutory Basis</th>
                      <th className="p-3 text-right">Calculation Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">1. Original Capital Contribution</td>
                      <td className="p-3">LLP Agreement Schedule</td>
                      <td className="p-3 text-right font-mono">100% of Fixed Capital Account</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">2. Share in Accumulated Profits</td>
                      <td className="p-3">Sec 24(5)(b) LLP Act</td>
                      <td className="p-3 text-right font-mono">Profit Ratio × Unallocated Reserves</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">3. Current Year Interim Profits</td>
                      <td className="p-3">Interim P&amp;L till Date of Demise</td>
                      <td className="p-3 text-right font-mono">Pro-rata Interim Operating Profit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">4. Partner Loan Account (if any)</td>
                      <td className="p-3">Unsecured Loan Ledger</td>
                      <td className="p-3 text-right font-mono">Principal + Agreed Interest till Demise</td>
                    </tr>
                    <tr className="bg-rose-50/50">
                      <td className="p-3 font-semibold text-rose-900">5. Less: Partner Drawings &amp; Debts</td>
                      <td className="p-3 text-rose-700">Sec 24(5) Proviso</td>
                      <td className="p-3 text-right font-mono text-rose-700">Deducted from Gross Settlement</td>
                    </tr>
                    <tr className="bg-emerald-50 font-bold text-slate-900">
                      <td className="p-3">NET SECTION 24(5) SETTLEMENT</td>
                      <td className="p-3 text-emerald-800">Statutory Entitlement</td>
                      <td className="p-3 text-right text-emerald-800 font-mono">Lump Sum or Agreed Installments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: SECTION 6 DEFENSE */}
            <section id="section-6-defense" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>SECTION 6 RISK MITIGATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 6 Defense: The 6-Month Survival Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most Indian LLPs start with just two partners. If one partner dies, only one partner remains. Under Section 6, the firm cannot run with one partner for more than six months. If it does, the surviving partner loses the corporate shield and faces full personal liability for all debts.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-xs sm:text-sm text-amber-900 leading-relaxed space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>The Section 6(2) Personal Liability Trap</span>
                  </div>
                  <p>
                    Under Section 6(2), if an LLP carries on business with one partner for over six months, the sole partner becomes personally liable for all firm obligations incurred during that time.
                  </p>
                </div>
                <p>
                  To protect against this risk, the surviving partner should pick one of three paths before the 180-day clock runs out:
                </p>
                <ol className="space-y-2 list-decimal list-inside text-xs sm:text-sm">
                  <li>
                    <strong>Admit the Legal Heir:</strong> Sign a deed admitting the spouse or adult child within 60 days, and file MCA Form 3 and 4.
                  </li>
                  <li>
                    <strong>Bring in a New Partner:</strong> If heirs do not want to join, admit a trusted business associate as a partner.
                  </li>
                  <li>
                    <strong>Wind Up the Firm:</strong> If the business cannot go on, file MCA Form 24 for striking off before six months pass.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 9: REAL-WORLD CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Case Studies: Delhi Tech LLP &amp; Mumbai Trading Firm
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Real case studies show how timely notices and deeds protect business owners and families:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase">
                    Delhi NCT • Two-Partner Tech LLP
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Surviving Partner Protected from Section 6 Personal Debt
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A tech partner in New Delhi died suddenly. The firm had client contracts of ₹1.8 Crore. The remaining partner faced personal debt as month five was ending.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Legal Solution:</strong> Our team drafted the Section 24 intimation notice and negotiated admitting the spouse as a partner. We filed MCA Form 4 and Form 3 on day 165. This saved the corporate shield and kept bank accounts active.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                    Mumbai • Three-Partner Trading LLP
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Peaceful Capital Buyout with No Court Fight
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 40% equity partner passed away. His heirs asked for ₹3 Crore and threatened an NCLT court case.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Legal Solution:</strong> We used Section 24(5) audit rules. A certified audit fixed net capital and reserves at ₹1.15 Crore. The firm and heirs signed a quarterly payout deed. The heirs gave a full release, and Form 4 was filed on time.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STAMP DUTY ON SUPPLEMENTAL LLP DEEDS */}
            <section id="stamp-duty-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>STATE-WISE STAMP DUTY SCHEDULE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. State Stamp Duty Rules on Supplemental LLP Deeds
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A Supplemental LLP Agreement must be executed on state non-judicial stamp paper where the registered office is located:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {Object.entries(STATE_STAMP_RATES).map(([key, data]) => (
                  <div key={key} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="font-extrabold text-slate-900">{data.label}</div>
                    <div className="font-bold text-[#C65378] text-sm">{data.fixedFee}</div>
                    <p className="text-[11px] text-slate-500 leading-snug">{data.notes}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & LAWYER PROFILE */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; LAWYER PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Statutory Citations &amp; Lawyer Profile Desk
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The legal rules in this template come from these key laws:
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm">
                  <li>
                    <strong>LLP Act 2008:</strong> Sections 3, 6, 7, 24, 25, and 64.
                  </li>
                  <li>
                    <strong>LLP Rules 2009:</strong> Rule 10 for Form 4 and Rule 21 for Form 3.
                  </li>
                  <li>
                    <strong>Income Tax Act 1961:</strong> Section 56(2)(x) for tax-free inheritance.
                  </li>
                </ul>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="font-extrabold text-slate-900 text-base">Lawyer Anuj Anand Malik</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate &amp; Corporate Succession Counsel • AMA Legal Solutions
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Specializes in corporate business succession, family constitutions, LLP dispute resolution, and cross-border inheritance structures. Advises founders and partner families across India.
                    </p>
                  </div>
                  <Link
                    href="/services/corporate-business-succession-family-constitution"
                    className="shrink-0 px-4 py-2.5 rounded-full bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Consult Counsel
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: LLP Transmission
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS (Readability Moat - Score >= 50.0) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Plan LLP Succession Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A partner death can freeze bank accounts. It can stop daily trade. Putting clear succession terms in your deed keeps your firm and family safe.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple 30-Day MCA Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  File MCA Form 4 within 30 days of partner death. The firm must audit the books fast and upload the form on the MCA portal.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">The Six-Month Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An LLP needs two partners. If one dies, add a new partner within six months. This stops personal debt on the last partner.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Who Gets the Capital?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The heirs get the capital share in cash. They also get past profits. The firm pays this after checking the audit sheet.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">No Default Partner Rights</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Heirs do not get to run the firm by default. They have no vote in firm choices. All partners must agree before an heir can join.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft simple notices and deeds. We help you file on time and protect your business from court fights.
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
                Expert in Indian corporate succession, LLP partner transmissions, MCA compliance, and business continuity agreements at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING / SUCCESSION (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT CORPORATE SUCCESSION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Business Equity &amp; Co-Partners
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A registered Will coupled with a business succession deed ensures smooth equity transmission without freezing company bank accounts.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Business Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; MCA Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - CORPORATE RETAINER TALK (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Briefcase className="w-3 h-3" />
                  <span>LLP SUCCESSION RETAINER DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing LLP Partner Death or Capital Valuation Dispute?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our corporate attorneys draft custom Section 24 settlement deeds, assist with MCA Form 4 filings, and defend surviving partners from Section 6 liability.
                </p>
                <Link
                  href="/services/corporate-business-succession-family-constitution"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Schedule Corporate Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Firms Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 24(5) Precision:</strong> Protects statutory capital and profit calculations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>30-Day MCA Form 4:</strong> Avoids daily compounding late penalties under Section 69.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 6 Veil Protection:</strong> Defends surviving partners from unlimited liability.
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
          href="#transmission-notice-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notice Draft</span>
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
