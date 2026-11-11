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
  Scale,
  Building,
  Lock,
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Gavel,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  GitBranch,
  Clock,
  Calendar,
  AlertOctagon,
  CreditCard,
  Briefcase,
  Key,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: OPC Nominee Takeover Mandate" },
  { id: "interactive-calculator", label: "2. Free MCA Statutory Deadline Calculator" },
  { id: "countdown-clock", label: "3. 15-Day Member Intimation vs 30-Day ROC Countdown" },
  { id: "step-by-step-sop", label: "4. Step-by-Step SOP: Transmission & DIR-12 Appointment" },
  { id: "document-checklist", label: "5. Comprehensive Form INC-4 & INC-3 Document Checklist" },
  { id: "bank-mandate-transition", label: "6. Bank Mandate Transition: Restoring Signatory Powers" },
  { id: "risk-comparison", label: "7. Takeover Risk Comparison: Timely vs Delayed Filing" },
  { id: "practical-case-studies", label: "8. Practical Case Studies: Tech, Retail & Services OPC" },
  { id: "legal-recital-templates", label: "9. Board Resolution & Transmission Recital Templates" },
  { id: "institutional-profile", label: "10. Institutional Profile: Corporate Succession Desk" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions: OPC Nominee Takeover" },
  { id: "statutory-citations", label: "12. Statutory Citations & Official MCA V3 Portal Links" },
];

const FAQS = [
  {
    q: "How many days does an OPC nominee have to take over after the sole member dies?",
    a: "Under Rule 4 of the Companies Rules 2014, the nominee becomes the new member right away. The nominee must meet two clear deadlines. First, name a new backup nominee in Form INC-3 within 15 days. Second, file Form INC-4 with the ROC within 30 days of the death.",
  },
  {
    q: "What happens if the deceased sole member was also the sole director of the OPC?",
    a: "When the sole director dies, the board has no members. The company cannot sign papers or pay bills. The new member must pass a written resolution to appoint a new director. Then, file Form DIR-12 with the ROC within 30 days under Section 152.",
  },
  {
    q: "What documents must be attached to Form INC-4 on the MCA portal?",
    a: "You must attach five key papers to Form INC-4. These include the death certificate of the member. You also need Form INC-3 signed by the new nominee. Add their ID and address proof. Include the member resolution and the updated Memorandum of Association.",
  },
  {
    q: "How can the new director unfreeze the OPC corporate bank account?",
    a: "Banks freeze company accounts once they learn of a director death. To unlock the account, take your papers to the bank branch. Show the death certificate and the member resolution. Provide the MCA receipt for Form INC-4 and Form DIR-12 with fresh KYC papers.",
  },
  {
    q: "What is the penalty if Form INC-4 is filed after the 30-day statutory window?",
    a: "Filing after thirty days leads to late fees under Section 403. These fees reach up to 12 times normal rates plus Rs. 100 for each late day. The ROC can also send fine notices under Section 450 to the company and its officers.",
  },
  {
    q: "Does a nominee director need a succession certificate or probate to take over?",
    a: "No. Under Section 3(1)(c) of the Companies Act 2013, the nominee takes over shares by company law. You do not need a court probate or succession certificate for company shares. The named nominee takes over directly without court cases.",
  },
];

export default function OpcNomineeTimelineClient() {
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
  const [copiedTimeline, setCopiedTimeline] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedResolution, setCopiedResolution] = useState<boolean>(false);

  // Default demise date to 5 days ago to demonstrate live countdown
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    return d.toISOString().split("T")[0];
  };

  // Calculator State
  const [demiseDateStr, setDemiseDateStr] = useState<string>(getDefaultDate());
  const [isSoleDirectorDeceased, setIsSoleDirectorDeceased] = useState<boolean>(true);
  const [nomineeHasDin, setNomineeHasDin] = useState<boolean>(false);
  const [nomineeHasDsc, setNomineeHasDsc] = useState<boolean>(false);
  const [bankStatus, setBankStatus] = useState<"active" | "frozen" | "pending_payroll">("frozen");

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

  // Timeline & Calculation Logic
  const demiseDate = new Date(demiseDateStr);
  const today = new Date();
  demiseDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - demiseDate.getTime();
  const daysElapsed = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  const deadline15 = new Date(demiseDate);
  deadline15.setDate(deadline15.getDate() + 15);

  const deadline30 = new Date(demiseDate);
  deadline30.setDate(deadline30.getDate() + 30);

  const daysLeft15 = 15 - daysElapsed;
  const daysLeft30 = 30 - daysElapsed;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Urgency status
  let statusBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let statusLabel = "On Track: Within Grace Window";

  if (daysElapsed > 30) {
    statusBadgeColor = "bg-red-50 text-red-800 border-red-200";
    statusLabel = `Statutory Breach: Overdue by ${daysElapsed - 30} Days`;
  } else if (daysElapsed > 15) {
    statusBadgeColor = "bg-amber-50 text-amber-800 border-amber-200";
    statusLabel = "15-Day Milestone Crossed: 30-Day Form INC-4 Active";
  } else if (daysElapsed >= 10) {
    statusBadgeColor = "bg-rose-50 text-rose-800 border-rose-200";
    statusLabel = `Urgent: ${daysLeft15} Days Left for New Nominee Consent`;
  }

  // Estimated Penalty exposure under Section 403 / 450
  let estimatedDailyPenalty = 0;
  if (daysElapsed > 30) {
    estimatedDailyPenalty = (daysElapsed - 30) * 100;
  }

  const copyTimelineToClipboard = () => {
    const text = `OPC NOMINEE DIRECTOR STATUTORY TIMELINE SUMMARY
Company Type: One Person Company (OPC) under Companies Act, 2013
Date of Demise: ${formatDate(demiseDate)}
Days Elapsed: ${daysElapsed} days

STATUTORY DEADLINES:
1. 15-Day Form INC-3 New Nominee Consent & Intimation:
   Deadline Date: ${formatDate(deadline15)} (${daysLeft15 >= 0 ? `${daysLeft15} days remaining` : `${Math.abs(daysLeft15)} days overdue`})
   Requirement: Nominee designates replacement nominee under Rule 4(3) Companies (Incorporation) Rules, 2014.

2. 30-Day Form INC-4 ROC Notice of Cessation & Transmission:
   Deadline Date: ${formatDate(deadline30)} (${daysLeft30 >= 0 ? `${daysLeft30} days remaining` : `${Math.abs(daysLeft30)} days overdue`})
   Requirement: Mandatory electronic filing on MCA V3 portal with death certificate, INC-3, and altered MoA.

3. 30-Day Form DIR-12 Director Appointment:
   Deadline Date: ${formatDate(deadline30)}
   Requirement: Appoint replacement director under Section 152 to restore bank and operational authority.

STATUS: ${statusLabel}
Penalty Exposure: Rs. ${estimatedDailyPenalty} (Section 403 MCA daily fees)`;

    navigator.clipboard.writeText(text);
    setCopiedTimeline(true);
    setTimeout(() => setCopiedTimeline(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `COMPREHENSIVE OPC NOMINEE TAKEOVER ROC & BANK CHECKLIST
1. Certified True Copy of Death Certificate of sole member.
2. Form INC-3 (Prior Written Consent of New Nominee) signed with identity proof.
3. KYC documents of new nominee (PAN card, Aadhaar card/Passport).
4. Sole Member Written Resolution taking demise on record and approving share transmission.
5. Altered Memorandum of Association (MoA) updating Clause III (Nominee clause).
6. Form DIR-2 (Consent to act as Director) and Form DIR-8 (Non-disqualification intimation).
7. Active Class 3 Digital Signature Certificate (DSC) and DIN for incoming director.
8. Form INC-4 filed on MCA V3 portal with SRN receipt.
9. Form DIR-12 filed on MCA V3 portal for director appointment.
10. Bank signing mandate packet: Board resolution, MCA challans, and fresh signature card.`;

    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const copyResolutionToClipboard = () => {
    const text = `SPECIMEN SOLE MEMBER WRITTEN RESOLUTION FOR OPC NOMINEE TAKEOVER
(Pursuant to Section 3(1)(c) & Section 152 of the Companies Act, 2013)

"RESOLVED THAT pursuant to Section 3(1)(c) of the Companies Act, 2013 and Rule 4 of the Companies (Incorporation) Rules, 2014, and in consequence of the unfortunate demise of [Name of Deceased Member], the sole member and director of [Company Name] OPC on [Date of Demise], the transmission of [Number of Shares] equity shares of face value Rs. [Value] each held by the deceased in favour of [Name of Nominee] (the nominee designated in Clause III of the MoA) be and is hereby taken on record and approved.

RESOLVED FURTHER THAT [Name of Nominee / Appointed Person], holder of DIN [DIN Number], be and is hereby appointed as Director of the company with immediate effect pursuant to Section 152 of the Companies Act, 2013.

RESOLVED FURTHER THAT [Name of New Nominee] having given written consent in Form INC-3 dated [Date], be and is hereby nominated as the Nominee of the company to take effect upon demise or incapacity of the member.

RESOLVED FURTHER THAT the Director be and is hereby authorized to file Form INC-4 and Form DIR-12 on the MCA portal and update the statutory registers of the company."`;

    navigator.clipboard.writeText(text);
    setCopiedResolution(true);
    setTimeout(() => setCopiedResolution(false), 3000);
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
            <span>COMPANIES ACT, 2013 • SECTION 3(1)(c) &amp; RULE 4</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            OPC Nominee Director Death Timeline Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact statutory deadlines for One Person Company nominee takeover. Trace
            15-day member intimation, 30-day Form INC-4 filing, and bank mandate unfreeze.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Clock className="w-4 h-4" />
              <span>Run Countdown Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/corporate-business-succession-family-constitution"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Briefcase className="w-4 h-4 text-[#C65378]" />
              <span>Emergency Corporate Advisory</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RULE 4(3) INC-3 NOMINEE NOTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FORM INC-4 ROC FILING WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form DIR-12</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DIRECTOR APPOINTMENT FILING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Probate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DIRECT STATUTORY TRANSMISSION
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
                <span>Corporate Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Section 3(1)(c) of Companies Act, 2013 and Rule 4 of Companies
                (Incorporation) Rules, 2014. Verified MCA V3 regulatory filing protocol.
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
                <span>EXECUTIVE BRIEF: OPC SOLE FOUNDER SUCCESSION RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fast Share Transfer by Law:</strong> Under Section 3(1)(c), the named
                    nominee becomes the sole owner at once. You need no court probate or succession
                    paper.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>15-Day Nominee Clock:</strong> Under Rule 4(3), the new owner must pick a
                    backup nominee within 15 days. Get their signed consent in Form INC-3.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day Mandatory ROC Filing:</strong> File Form INC-4 on the MCA portal
                    within 30 days of the death. Attach the death certificate and the updated charter.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Director Role and Bank Account:</strong> Appoint a new director fast.
                    File Form DIR-12 with the MCA. Show the filing receipt to your bank to unlock cash.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: OPC Nominee Takeover Mandate
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A One Person Company has just one owner. This sole owner holds all company shares.
                  Most founders also serve as the sole director of the business.
                </p>
                <p>
                  The law protects the company if the owner dies. Under Section 3(1)(c), the charter
                  must name a nominee. This nominee takes over all shares by law. You do not need court
                  probate to claim the shares.
                </p>
                <p>
                  However, you must act fast. Company rules set tight deadlines to report the change.
                  You must file papers on the MCA portal within thirty days. If you miss the date, the
                  ROC adds daily fines and banks freeze your funds.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>STATUTORY COUNTDOWN CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free MCA Statutory Deadline Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick the date when the owner passed away. This tool finds your exact dates for Form
                INC-3, Form INC-4, and director appointment under Indian company rules.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Demise Date Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C65378]" />
                      <span>Date of Demise of Sole Member</span>
                    </label>
                    <input
                      type="date"
                      value={demiseDateStr}
                      onChange={(e) => setDemiseDateStr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    />
                    <p className="text-[11px] text-slate-500">
                      Calculates 15-day and 30-day deadlines from this recorded date.
                    </p>
                  </div>

                  {/* Sole Director Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#C65378]" />
                      <span>Was Deceased Also Sole Director?</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSoleDirectorDeceased(true)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                          isSoleDirectorDeceased
                            ? "border-[#C65378] bg-rose-50 text-[#C65378]"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Yes (Sole Director)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSoleDirectorDeceased(false)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                          !isSoleDirectorDeceased
                            ? "border-[#C65378] bg-rose-50 text-[#C65378]"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        No (Other Directors Exist)
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      If yes, company board is vacant and needs urgent DIR-12 appointment.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-100">
                  {/* Nominee DIN & DSC Readiness */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#C65378]" />
                      <span>Nominee DIN &amp; DSC Readiness</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNomineeHasDin(!nomineeHasDin);
                          setNomineeHasDsc(!nomineeHasDin);
                        }}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          nomineeHasDin
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {nomineeHasDin ? "DIN & DSC Active" : "No DIN / DSC Yet"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBankStatus(bankStatus === "frozen" ? "active" : "frozen")}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          bankStatus === "frozen"
                            ? "border-amber-600 bg-amber-50 text-amber-800"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {bankStatus === "frozen" ? "Bank Frozen" : "Bank Still Active"}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Without a DIN, an urgent Form DIR-3 application must precede Form DIR-12.
                    </p>
                  </div>

                  {/* Calculated Elapsed Days Status */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-1 text-center flex flex-col justify-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Elapsed Time Since Demise
                    </div>
                    <div className="text-2xl font-black text-slate-900">{daysElapsed} Days</div>
                    <div
                      className={`inline-block mx-auto px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${statusBadgeColor}`}
                    >
                      {statusLabel}
                    </div>
                  </div>
                </div>

                {/* COMPUTED STATUTORY DEADLINES DISPLAY */}
                <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="font-extrabold text-base text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-rose-400" />
                      <span>Statutory Compliance Countdown Dashboard</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyTimelineToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors self-start sm:self-auto"
                    >
                      {copiedTimeline ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Timeline</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Dates</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Milestone 1: 15-Day Rule */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                        Milestone 1 • 15 Days
                      </div>
                      <div className="text-sm font-bold text-white">Form INC-3 New Nominee</div>
                      <div className="text-xl font-black text-amber-300">{formatDate(deadline15)}</div>
                      <div className="text-[11px] text-white/80">
                        {daysLeft15 >= 0 ? (
                          <span className="text-emerald-300 font-bold">{daysLeft15} days remaining</span>
                        ) : (
                          <span className="text-rose-400 font-bold">
                            {Math.abs(daysLeft15)} days overdue
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/60 leading-snug pt-1">
                        Nominee must obtain prior written consent from replacement nominee.
                      </p>
                    </div>

                    {/* Milestone 2: 30-Day Form INC-4 */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                        Milestone 2 • 30 Days
                      </div>
                      <div className="text-sm font-bold text-white">Form INC-4 ROC Notice</div>
                      <div className="text-xl font-black text-emerald-300">
                        {formatDate(deadline30)}
                      </div>
                      <div className="text-[11px] text-white/80">
                        {daysLeft30 >= 0 ? (
                          <span className="text-emerald-300 font-bold">{daysLeft30} days remaining</span>
                        ) : (
                          <span className="text-rose-400 font-bold">
                            {Math.abs(daysLeft30)} days overdue
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/60 leading-snug pt-1">
                        File notice of cessation &amp; nomination with death certificate on MCA V3.
                      </p>
                    </div>

                    {/* Milestone 3: DIR-12 Appointment */}
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                        Milestone 3 • 30 Days
                      </div>
                      <div className="text-sm font-bold text-white">Form DIR-12 Director</div>
                      <div className="text-xl font-black text-sky-300">{formatDate(deadline30)}</div>
                      <div className="text-[11px] text-white/80">
                        {isSoleDirectorDeceased ? (
                          <span className="text-amber-300 font-bold">Mandatory: Board Vacant</span>
                        ) : (
                          <span className="text-emerald-300 font-bold">Optional: Board Quorum OK</span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/60 leading-snug pt-1">
                        Appoint replacement director to restore operational and bank authority.
                      </p>
                    </div>
                  </div>

                  {/* Penalty Breakdown Box */}
                  {estimatedDailyPenalty > 0 && (
                    <div className="rounded-xl bg-rose-950/60 border border-rose-500/30 p-3.5 flex items-start gap-3">
                      <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-rose-200">
                          Active MCA Late Filing Surcharge Detected
                        </div>
                        <p className="text-white/80 leading-relaxed text-[11px]">
                          Filing is overdue by {daysElapsed - 30} days. Under Section 403, additional
                          ROC fees accrue at Rs. 100 per day (Estimated penalty to date: Rs.{" "}
                          {estimatedDailyPenalty.toLocaleString("en-IN")}). Immediate filing is required
                          to prevent ROC adjudication notices under Section 450.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tailored Action Plan */}
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-4 sm:p-5 space-y-2">
                  <div className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Immediate Action Plan for Nominee</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-950 leading-relaxed">
                    {!nomineeHasDin && (
                      <li className="flex items-start gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Get a DIN and Digital Key:</strong> You need a DIN to act as a
                          director. Apply for your DIN and digital key today.
                        </span>
                      </li>
                    )}
                    {isSoleDirectorDeceased && (
                      <li className="flex items-start gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Pass a Member Resolution:</strong> Sign a paper to appoint the new
                          director. This step fills the empty board seat.
                        </span>
                      </li>
                    )}
                    {bankStatus === "frozen" && (
                      <li className="flex items-start gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Take Papers to Bank:</strong> Show the death paper and director filing
                          receipt to the bank branch. This unfreezes cash for staff pay.
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT (EMBEDDED IMAGE) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: OPC NOMINEE ACTIVATION TIMELINE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Companies Act, 2013</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/opc-nominee-director-activation-timeline-calculator-og.jpg"
                  alt="OPC Nominee Director Activation Timeline Tool MCA Form INC 4 Checklist"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visual guide outlining the 15-day member intimation, 30-day Form INC-4 ROC notice, and
                bank mandate transition under Section 3(1)(c) and Rule 4.
              </p>
            </div>

            {/* SECTION 3: 15-DAY VS 30-DAY COUNTDOWN */}
            <section id="countdown-clock" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STATUTORY ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. 15-Day Member Intimation vs 30-Day ROC Countdown
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many founders mix up the two legal clocks. Rule 4 sets out two clear jobs with
                  different deadlines. You must meet both dates to stay fully legal.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-extrabold text-[#C65378] uppercase tracking-wider">
                      First Job • 15 Days (Rule 4(3))
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The nominee becomes the new member right away. Within 15 days, this member must
                      pick a new backup nominee. Get their written consent in Form INC-3.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Second Job • 30 Days (Rule 4(4))
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The firm must tell the ROC within 30 days of the death. File Form INC-4 on the
                      MCA site. Attach the death paper, Form INC-3, and the updated charter.
                    </p>
                  </div>
                </div>
                <p>
                  You must attach Form INC-3 to Form INC-4. For this reason, finish the 15-day job
                  first. If you pick a nominee late, you will miss the 30-day filing cutoff.
                </p>
              </div>
            </section>

            {/* SECTION 4: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>PROCEDURAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Step-by-Step SOP: Transmission &amp; DIR-12 Appointment
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these six clear steps to take over your company. This plan keeps your business
                safe and running without court fights:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "Step 1",
                    title: "Get the Official Death Paper from Local Office",
                    desc: "Get the death paper from the municipal office. The nominee writes a letter to the company to take over shares as named in the company charter.",
                  },
                  {
                    step: "Step 2",
                    title: "Pick New Backup Nominee and Sign Form INC-3",
                    desc: "Pick an adult Indian citizen as your new nominee. Have them sign Form INC-3. Collect their PAN card and address proof for company records.",
                  },
                  {
                    step: "Step 3",
                    title: "Sign Member Paper to Appoint the New Director",
                    desc: "If the founder was the only director, the board seat is empty. The new owner signs a paper to appoint a director under Section 152.",
                  },
                  {
                    step: "Step 4",
                    title: "Get a DIN Number and Class 3 Digital Signature",
                    desc: "The new director must hold a DIN. If you do not have one, file Form DIR-3. Buy a digital key and register it on the MCA site.",
                  },
                  {
                    step: "Step 5",
                    title: "File Form INC-4 and Form DIR-12 on MCA Site",
                    desc: "Upload Form INC-4 with the death paper, Form INC-3, and updated charter. File Form DIR-12 for the director. Pay fees and save the receipts.",
                  },
                  {
                    step: "Step 6",
                    title: "Update Member Register and Share Papers",
                    desc: "Sign the share papers over to the new owner. Write the new names in the member book and director book as required by company law.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-16 h-10 rounded-xl bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 5: COMPREHENSIVE DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COMPLIANCE ASSET</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Comprehensive Form INC-4 &amp; INC-3 Document Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Gather all papers before you file on the MCA site. Having every paper ready stops
                delays and helps you avoid extra late fees.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                    Mandatory MCA &amp; ROC Filing Attachments
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Checklist</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {[
                    "Original or certified copy of sole member Death Certificate",
                    "Form INC-3 signed by the new replacement nominee",
                    "PAN card and Aadhaar / Passport of the new nominee",
                    "Written resolution of sole member approving transmission",
                    "Altered Memorandum of Association (Clause III update)",
                    "Form DIR-2 (Consent of Director) for incoming director",
                    "Form DIR-8 (Intimation of non-disqualification)",
                    "Proof of identity and residential address of new director",
                    "Class 3 Digital Signature Certificate registered on MCA",
                    "Original share certificate for transmission endorsement",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: BANK MANDATE TRANSITION BOX */}
            <section id="bank-mandate-transition" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CreditCard className="w-4 h-4" />
                <span>OPERATIONAL RESTORATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Bank Mandate Transition: Restoring Signatory Powers
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                In most OPCs, the sole founder is the only person who can sign checks. When banks learn
                of a death, they freeze debit cards, checks, and net banking right away.
              </p>

              {/* The Bank Mandate Transition Box */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-300">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>STEP-BY-STEP BANK UNFREEZE PROTOCOL</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-amber-300">Phase 1: Notify Bank</div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Write to the bank branch. Show the death paper. Ask them to help protect active
                      tax dues and loan payments.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-emerald-300">Phase 2: Show Filings</div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Show your MCA filing receipts for Form INC-4 and Form DIR-12. Print the updated
                      company page from the MCA site.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-sky-300">Phase 3: New Signatures</div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Give fresh signature cards to the bank manager. Submit the KYC of the new director
                      to unlock net banking access.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-white/90 space-y-1">
                  <div className="font-bold text-amber-200">
                    Bounced Cheque Warning: Section 138 NI Act Risks
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/75">
                    If checks bounce because the bank account is frozen, creditors can sue. File your
                    Form DIR-12 within seven to ten days. This keeps your business safe from court cases.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: RISK COMPARISON TABLE */}
            <section id="risk-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>RISK MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Takeover Risk Comparison: Timely vs Delayed Filing
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                See how filing within 30 days compares to filing late. Timely filing saves you money and
                keeps your business open:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="p-3 sm:p-4">Compliance Parameter</th>
                      <th className="p-3 sm:p-4 text-emerald-800 bg-emerald-50/50">
                        Timely Takeover (Within 30 Days)
                      </th>
                      <th className="p-3 sm:p-4 text-rose-800 bg-rose-50/50">
                        Delayed Takeover (Over 30 Days)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">ROC Filing Fees</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">
                        Standard normal filing fees (Rs. 300 to Rs. 600)
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-semibold">
                        Escalating fees up to 12x plus Rs. 100 per day under Section 403
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Corporate Bank Account</td>
                      <td className="p-3 sm:p-4">
                        Unfrozen within 5 to 7 days upon submitting DIR-12 and INC-4 SRN
                      </td>
                      <td className="p-3 sm:p-4">
                        Accounts remain locked; payroll, vendor payouts, and EMIs bounce
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Statutory GST &amp; TDS</td>
                      <td className="p-3 sm:p-4">
                        GSTR-1, GSTR-3B, and TDS returns filed without disruption
                      </td>
                      <td className="p-3 sm:p-4">
                        GST portal access blocked due to expired DSC; GST suspension risk
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">ROC Company Status</td>
                      <td className="p-3 sm:p-4">Maintained as Active and fully compliant</td>
                      <td className="p-3 sm:p-4">
                        Risk of Registrar issuing notice under Section 450 or striking off
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Family Inheritance Claims</td>
                      <td className="p-3 sm:p-4">
                        Statutory nominee transmission prevails cleanly under corporate law
                      </td>
                      <td className="p-3 sm:p-4">
                        Collateral heirs may seek injunctions, stalling company operations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Practical Case Studies: Tech, Retail &amp; Services OPC
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case Study 1: Bengaluru Tech OPC (14-Day Fast Takeover)
                  </div>
                  <p>
                    A tech founder in Bengaluru passed away suddenly. The firm had 12 staff on salary.
                    The wife was named as nominee in the company charter. She held a DIN and acted
                    at once.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Result:</strong> Counsel helped her sign Form INC-3 on Day 6. She was named
                    director on Day 8. The team filed Form INC-4 on Day 11. HDFC Bank unlocked the
                    account on Day 14. All staff received pay on time.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case Study 2: Mumbai Factory OPC (No Prior DIN)
                  </div>
                  <p>
                    A factory owner in Mumbai died without warning. His mother was the named nominee.
                    She had no DIN or digital signature. The factory had urgent bids due in two weeks.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Result:</strong> Our team got her a digital key in two days. We filed for her
                    DIN right away. She appointed her son as director to run the plant. All ROC forms were
                    filed on Day 23 with zero fines.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case Study 3: Delhi Firm OPC (Family Claim Stopped)
                  </div>
                  <p>
                    When a Delhi consultant passed away, relatives tried to claim the firm. They said
                    the business belonged to the whole family. They asked for court papers before shares
                    could pass.
                  </p>
                  <p className="text-slate-600 text-xs">
                    <strong>Result:</strong> Counsel showed the bank Section 3(1)(c) of the Act. The
                    registered nominee holds the sole right to shares by company law. The bank accepted
                    the nominee without any court cases.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: BOARD RESOLUTION TEMPLATES */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STATUTORY SPECIMEN RECITAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Board Resolution &amp; Transmission Recital Templates
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this written paper to approve the share transfer, appoint the new director, and file
                papers with the Registrar of Companies:
              </p>

              <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-extrabold text-xs text-rose-300 uppercase tracking-wider">
                    Sole Member Written Resolution (Section 3(1)(c) &amp; Section 152)
                  </div>
                  <button
                    type="button"
                    onClick={copyResolutionToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    {copiedResolution ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Template</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Resolution</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
                  {`"RESOLVED THAT pursuant to Section 3(1)(c) of the Companies Act, 2013 and Rule 4 of the Companies (Incorporation) Rules, 2014, and in consequence of the demise of [Name of Deceased Founder], the transmission of [Number of Shares] equity shares in [Company Name] OPC in favour of [Name of Nominee] be and is hereby taken on record.

RESOLVED FURTHER THAT [Name of Appointee], DIN [DIN Number], be and is hereby appointed as Director under Section 152 of the Act.

RESOLVED FURTHER THAT [Name of New Nominee] having consented in Form INC-3, be and is hereby nominated as the replacement nominee of the company.

RESOLVED FURTHER THAT the Director be authorized to file Form INC-4 and Form DIR-12 with the Registrar of Companies."`}
                </pre>
              </div>
            </section>

            {/* SECTION 10: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Institutional Profile: Corporate Succession Desk
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  AMA Legal Solutions runs a skilled corporate team. We help founders and heirs manage
                  company share handovers across India. Our team has company secretaries and court
                  lawyers.
                </p>
                <p>
                  We have guided over 350 company handovers. We solve director vacancies and file MCA
                  papers. We work with ROC offices in Delhi, Mumbai, Bengaluru, and Kolkata to get your
                  forms cleared fast.
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="font-bold text-slate-900 text-sm">
                      Need Help with an OPC Nominee Takeover?
                    </div>
                    <div className="text-xs text-slate-600">
                      Our lawyers draft member papers and handle bank filings within two days.
                    </div>
                  </div>
                  <Link
                    href="/services/corporate-business-succession-family-constitution"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shadow-sm transition-transform hover:-translate-y-0.5 shrink-0"
                  >
                    <span>Corporate Advisory Retainer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: OPC Nominee Takeover
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
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
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

            {/* SECTION 12: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; Official MCA V3 Portal Links
              </h3>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  Official statutory citations governing One Person Company nomination and succession
                  compliance in India:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.mca.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Ministry of Corporate Affairs (MCA V3 Portal)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Companies Act, 2013: Section 3(1)(c)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Companies (Incorporation) Rules, 2014: Rule 4</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Corporate Estate Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/startup-founder-equity-succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Startup Equity Succession Tool
                    </Link>
                    <Link
                      href="/tools/estate-net-worth-asset-inventory-builder"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Estate Asset Inventory Builder
                    </Link>
                    <Link
                      href="/tools/executor-duties-90-day-timeline-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Executor 90-Day Timeline
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Template India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* THREE PLAIN ENGLISH SUMMARY CARDS (Flesch Reading Ease Optimization) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Act Within 30 Days?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You have thirty days to file papers with the ROC. Filing early stops heavy fines. It
                  keeps your company name and status safe. Do not wait until the last week.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Bank Account Freeze Risk</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Banks freeze accounts when a sole director dies. Appoint a new director fast. This lets
                  you pay your staff and keep your business running smoothly.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft all member papers and handle ROC filings on the government portal. We
                  help you unlock bank accounts quickly without legal delays.
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
                    Senior Corporate &amp; Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in corporate business succession, One Person Company takeovers, MCA regulatory
                filings, and dispute-free founder estate structuring.
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
              {/* CARD 2: DUAL CTA 1 - CORPORATE ADVISORY (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT OPERATIONAL PARALYSIS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Emergency OPC Nominee Takeover Retainer
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our corporate team handles member resolutions, Form INC-4, Form DIR-12, and bank signing
                  mandates across India within 48 hours.
                </p>
                <Link
                  href="/services/corporate-business-succession-family-constitution"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Retain Corporate Counsel</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MCA V3 Registered &amp; Bank Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CORPORATE SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Frozen Accounts or ROC Notices?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speak directly with corporate litigators for rapid bank unfreezing petitions, ROC delay
                  condonation, and DIN activations.
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
                  Why Companies Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 3(1)(c) Compliant:</strong> Avoids probate delays with direct
                      statutory share transmission.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Penalty Guarantee:</strong> Files Form INC-4 &amp; DIR-12 well within
                      the 30-day window.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Fast Bank Unfreeze:</strong> Complete board packs ready for SBI, HDFC,
                      ICICI, and Axis bank managers.
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
          <Clock className="w-3.5 h-3.5" />
          <span>Timeline Tool</span>
        </a>
        <Link
          href="/services/corporate-business-succession-family-constitution"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Corporate Retainer</span>
        </Link>
      </div>
    </div>
  );
}
