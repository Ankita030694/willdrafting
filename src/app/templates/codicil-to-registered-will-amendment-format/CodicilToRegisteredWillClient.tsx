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
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  AlertCircle,
  Clock,
  Building2,
  CheckSquare,
  FileEdit,
  Layers,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-definition-codicil", label: "1. Legal Rule: What is a Codicil?" },
  { id: "codicil-decision-calculator", label: "2. Codicil vs New Will Tool" },
  { id: "codicil-vs-fresh-will", label: "3. Codicil vs Fresh Will Rules" },
  { id: "ready-codicil-deed-format", label: "4. Ready Codicil Format India" },
  { id: "reaffirmation-clause-moat", label: "5. Key Reaffirmation Clause" },
  { id: "adding-property-clauses", label: "6. Add New Flat, Land & Cash" },
  { id: "changing-executors-heirs", label: "7. Change Executors or Heirs" },
  { id: "sro-cross-referencing-guide", label: "8. SRO Book 3 Linking Guide" },
  { id: "section-63-attestation-rules", label: "9. Two Witness Signing Rules" },
  { id: "landmark-court-precedents", label: "10. Court Cases: Bhagat Ram" },
  { id: "step-by-step-codicil-sop", label: "11. Step-by-Step Filing Guide" },
  { id: "five-fatal-codicil-mistakes", label: "12. Four Mistakes to Avoid" },
  { id: "institutional-profile", label: "13. About Our Legal Team" },
  { id: "frequently-asked-questions", label: "14. Codicil FAQs in India" },
  { id: "statutory-citations", label: "15. Legal Links & Portals" },
];

const FAQS = [
  {
    q: "What is a Codicil to a Will in India?",
    a: "Under Section 2(b) of the Indian Succession Act, 1925, a Codicil is a short legal paper. It adds to, changes, or cancels small parts of an old Will. It acts as part of the main Will.",
  },
  {
    q: "Can I use a Codicil to change a registered Will?",
    a: "Yes. Under Section 62 of the Act, you can change a registered Will at any time while in sound mind. Filing the Codicil at the same Sub-Registrar Office prevents future family fights.",
  },
  {
    q: "Why is the Reaffirmation Clause so vital in a Codicil?",
    a: "The Reaffirmation Clause confirms that all other gifts and executor names in your main Will stay valid. Without this line, unclear words can cancel your old gifts by mistake.",
  },
  {
    q: "How many witnesses must sign a Codicil in India?",
    a: "Under Section 63 of the Act, at least two adult witnesses must sign the Codicil. Both must watch you sign and then sign in front of you. Heirs should never sign as witnesses.",
  },
  {
    q: "When should I make a Codicil instead of a brand new Will?",
    a: "Make a Codicil for small updates like adding a new flat, changing a bank account, or naming a new executor. Make a fresh Will if you want to change most of your shares or heirs.",
  },
  {
    q: "Is an unregistered Codicil valid for a registered Will?",
    a: "Yes. Under Section 18 of the Registration Act, filing a Will or Codicil at the office is optional. Still, courts check unregistered changes strictly. Filing it in Book 3 keeps the record clean.",
  },
  {
    q: "How does the Sub-Registrar link a Codicil in Book 3?",
    a: "The clerk enters the Codicil as a new deed in Book 3. They then write a cross-link note on the margin of your old registered Will with the new deed number and page numbers.",
  },
  {
    q: "Can I make more than one Codicil to the same Will?",
    a: "Yes. You can write a First Codicil and a Second Codicil. However, having three or more updates makes things messy in court. If you have many changes, write one fresh Will instead.",
  },
];

export default function CodicilToRegisteredWillClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-definition-codicil");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedReaffirmation, setCopiedReaffirmation] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE CODICIL VS NEW WILL CALCULATOR
  // ==========================================
  const [amendmentType, setAmendmentType] = useState<string>("add_property");
  const [originalWillStatus, setOriginalWillStatus] = useState<string>("registered");
  const [priorCodicilsCount, setPriorCodicilsCount] = useState<number>(0);
  const [stateJurisdiction, setStateJurisdiction] = useState<string>("maharashtra");

  // Dynamic Decision Logic (written in clear plain English)
  let recommendedAction = "Draft a Registered Codicil";
  let recommendationBadge = "Best Choice";
  let recommendationBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
  let complexityScore = "Low Risk";
  let reasonText = "Your change is short and clear. A Codicil updates your old Will cleanly and keeps your other gifts safe.";
  let sroProtocol = "File the Codicil at the Sub-Registrar Office with a copy of your old Will to link Book 3 records.";
  let stampDutyEst = "Rs. 100 to Rs. 500 stamp paper plus nominal office fee.";

  if (amendmentType === "complete_redistribution" || priorCodicilsCount >= 2) {
    recommendedAction = "Draft a Fresh Consolidated Will";
    recommendationBadge = "High Risk Alert";
    recommendationBadgeColor = "bg-rose-100 text-rose-800 border-rose-300";
    complexityScore = "High Risk for Codicil";
    reasonText = "Big changes or 2 or more updates cause mix-ups in court. A fresh Will that cancels all old papers is much safer for your heirs.";
    sroProtocol = "Write a brand new Will with a clear cancel line under Section 62 and file it at your local office.";
  } else if (amendmentType === "disinherit_heir") {
    recommendedAction = "Fresh Will or Codicil with Clear Reasons";
    recommendationBadge = "Extra Care Needed";
    recommendationBadgeColor = "bg-amber-100 text-amber-800 border-amber-300";
    complexityScore = "Medium Risk";
    reasonText = "Cutting out a close heir leads to court fights. Add clear reasons and a doctor fitness note to block fraud claims.";
    sroProtocol = "File the deed at the office with video proof and a signed note from your family doctor.";
  }

  if (originalWillStatus === "unregistered") {
    sroProtocol = "Your old Will is on plain paper. You can sign an unregistered Codicil with two witnesses, or file both together at the office.";
  }

  if (stateJurisdiction === "maharashtra") {
    stampDutyEst = "Rs. 100 stamp paper or plain paper plus Rs. 100 office fee.";
  } else if (stateJurisdiction === "delhi") {
    stampDutyEst = "Rs. 500 e-stamp paper plus Rs. 200 office fee.";
  } else if (stateJurisdiction === "karnataka") {
    stampDutyEst = "Rs. 200 stamp paper plus Rs. 200 Kaveri 2.0 office fee.";
  } else if (stateJurisdiction === "tamilnadu") {
    stampDutyEst = "Rs. 100 stamp paper plus Rs. 500 TNREGINET office fee.";
  } else {
    stampDutyEst = "Rs. 100 to Rs. 200 stamp paper plus state Book 3 office fee.";
  }

  // Copy Handlers
  const copyTemplateToClipboard = () => {
    const text = `FIRST CODICIL TO THE LAST WILL AND TESTAMENT

I, [Full Name of Will Maker], aged about [Age] years, son/daughter/spouse of [Father's / Husband's Name], living at [Complete Residential Address], with Aadhaar No. [XXXX-XXXX-XXXX] and PAN [XXXXXXXXX], do hereby make, publish, and declare this FIRST CODICIL to my Last Will and Testament dated [Date of Original Will]:

WHEREAS:
1. I made my Last Will and Testament dated [Date of Original Will], which was registered on [Date of Registration] at the Office of the Sub-Registrar, [SRO Location/Name], in Book No. 3, Volume No. [Volume], at Pages [Page Numbers], as Document No. [Registration Document No.] of [Year] (called the "Original Will").
2. The said Original Will stays valid and unrevoked by me up to this date.
3. Since making that Original Will, I have bought new assets, and I wish to add them and change small parts of the Original Will as set out below.

NOW THIS FIRST CODICIL WITNESSES AS FOLLOWS:

1. ADDITION OF NEW FLAT OR HOUSE:
I add this gift to Clause [Number] of my Original Will:
"I am the sole owner of Flat No. [Flat Number], situated at [Building/Society Name], [Street/Road], [Area/Locality], [City], [State], PIN [Postal Code], measuring [Area] sq. ft., bought via Sale Deed dated [Date of Sale Deed] as Doc No. [Doc No.] at SRO [Location]. After my death, I give full ownership of this flat and car parking to my [Relationship], [Full Name of Heir], born on [Date of Birth], absolutely and forever."

2. CHANGE OF EXECUTOR (IF NEEDED):
In place of the Executor named in Clause [Number] of my Original Will, I appoint my [Relationship], [Full Name of New Executor], living at [Complete Address], as the sole Executor of my Original Will and this First Codicil.

3. MASTER REAFFIRMATION AND CONFIRMATION CLAUSE:
In all other ways, except where changed or added by this First Codicil, I confirm, ratify, and reaffirm all other terms, gifts, executor names, and rules of my Last Will dated [Date of Original Will]. This First Codicil shall be read as one single part of my Original Will.

IN WITNESS WHEREOF, I, [Full Name of Will Maker], sign this First Codicil on this _______ day of _____________, 2026, at [City], in front of the two witnesses below.

________________________________________
[FULL NAME OF WILL MAKER]

SIGNED AND DECLARED by [Full Name of Will Maker] as their FIRST CODICIL to their Will dated [Date of Original Will], in front of us, who at their request and in their sight sign below as witnesses:

WITNESS 1:
Signature: ______________________________
Full Name: [Witness 1 Full Name]
Address: [Complete Address]

WITNESS 2:
Signature: ______________________________
Full Name: [Witness 2 Full Name]
Address: [Complete Address]`;
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyReaffirmationToClipboard = () => {
    const text = `MASTER REAFFIRMATION CLAUSE:
"In all other ways, except as changed or added by this Codicil, I confirm, ratify, and reaffirm all other terms, gifts, executor appointments, and rules in my Last Will dated [Date of Original Will], registered as Doc No. [Doc No.], Book No. 3, Volume [Vol No.], Pages [Pages] at SRO [SRO Name]. This Codicil shall be read as a full part of my said Last Will."`;
    navigator.clipboard.writeText(text);
    setCopiedReaffirmation(true);
    setTimeout(() => setCopiedReaffirmation(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `CODICIL SIGNING & FILING CHECKLIST:
1. Copy of old registered Will (with Book 3 Doc No.)
2. Printed Codicil on plain or Rs. 100 stamp paper
3. Exact details of new flat, land, or bank cash
4. Master Reaffirmation Clause protecting old gifts
5. Signatures of 2 adult witnesses (not heirs)
6. Doctor fitness note showing sound mind
7. Aadhaar/PAN and 2 photos of Will maker and witnesses
8. Sub-Registrar slot for Book 3 margin link`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

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
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#FAF7F0]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65378]/20 border border-[#C65378]/40 text-rose-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 2(B), 62 &amp; REGISTRATION ACT S. 18</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Codicil to Registered Will Format: Section 62 Amendment Guide
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Bought a new flat or bank deposit after filing your Will? Update small parts without writing the whole Will again.
            Get our free Codicil deed draft and Sub-Registrar filing guide today.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ready-codicil-deed-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileEdit className="w-4 h-4" />
              <span>Get Codicil Deed Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft or Amend Your Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 2(b)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LEGAL CODICIL RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Book 3 SRO</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MARGINAL CROSS-LINK
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 62</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                POWER TO CHANGE WILL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Redraft</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                OLD GIFTS STAY SAFE
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
                This page follows Sections 2(b), 62, and 63 of the Indian Succession Act, 1925, plus Section 18 of the
                Registration Act, 1908.
              </p>
            </div>

            {/* Quick Moat Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span>Key Drafting Rule</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Always add the Master Reaffirmation Clause. Without this line, court fights can break out over whether your
                old gifts were cancelled.
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
                <span>SHORT GUIDE: HOW TO CHANGE YOUR WILL</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Law Rule:</strong> Section 2(b) defines a Codicil as a short paper that adds to or changes a Will. It
                    becomes part of the main Will.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registered Wills:</strong> You can update a registered Will under Section 62. Filing the update at the same
                    office keeps your record crystal clear.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reaffirmation Line:</strong> Always confirm that all other lines in your old Will remain valid and untouched.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Witnesses:</strong> Under Section 63, two adult witnesses must sign in your presence. Heirs must not act
                    as witnesses.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/codicil-to-registered-will-amendment-format-og.jpg"
                  alt="Codicil to Registered Will amendment format under Indian Succession Act Section 62 and Book 3 SRO"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Will Update Series: Section 62 Codicil Deed &amp; Book 3 Office Guide
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  SRO BOOK 3 READY • 2026 EDITION
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY DEFINITION & SCOPE */}
            <section id="statutory-definition-codicil" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>INDIAN SUCCESSION ACT RULES</span>
              </div>
              {/* STRICTLY SINGLE H2 TAG FOR SCREAMING FROG AUDIT */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Definition: What is a Codicil Under Section 2(b)?
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  After writing a Will, people often buy a new flat, open a new bank deposit, or lose a chosen executor. You do not need
                  to throw away your old Will and start from zero. Indian law gives you a clean, low-cost tool called a{" "}
                  <strong>Codicil</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#5F7E75] text-slate-800 space-y-2">
                  <div className="font-bold text-xs uppercase tracking-wider text-[#5F7E75]">
                    Law Definition: Section 2(b), Indian Succession Act, 1925
                  </div>
                  <p className="italic text-xs sm:text-sm">
                    &quot;Codicil means an instrument made in relation to a Will, and explaining, altering or adding to its dispositions,
                    and shall be deemed to form part of the Will.&quot;
                  </p>
                </div>
                <p>
                  Section 62 of the Act says a Will maker can change or cancel a Will at any time while in sound mind. A Codicil works like
                  an extra page joined to your main Will. Once signed by you and two witnesses under Section 63, it updates your Will as of
                  the new date. All other gifts that you did not touch stay safe.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CODICIL VS NEW WILL CALCULATOR */}
            <section id="codicil-decision-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FREE LEGAL TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Codicil vs New Will Decision &amp; Fee Tool
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Check if a short Codicil works for you or if you need a brand new Will. Pick your options below to see your risk level,
                office steps, and stamp fee.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Parameter 1: Type of Amendment */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      What Do You Want to Change?
                    </label>
                    <select
                      value={amendmentType}
                      onChange={(e) => setAmendmentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="add_property">Add New Flat, Plot, or Bank Account</option>
                      <option value="change_executor">Change Executor Name</option>
                      <option value="minor_correction">Fix Name Spelling or Typo</option>
                      <option value="disinherit_heir">Remove or Cut Out a Legal Heir</option>
                      <option value="complete_redistribution">Change Most Shares and Heirs</option>
                    </select>
                  </div>

                  {/* Parameter 2: Original Will Registration */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Is Your Old Will Registered?
                    </label>
                    <select
                      value={originalWillStatus}
                      onChange={(e) => setOriginalWillStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="registered">Yes, Registered at Sub-Registrar Office</option>
                      <option value="unregistered">No, Signed on Plain Paper</option>
                    </select>
                  </div>

                  {/* Parameter 3: Prior Codicils Executed */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Past Codicils Already Signed
                    </label>
                    <select
                      value={priorCodicilsCount}
                      onChange={(e) => setPriorCodicilsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={0}>0 (This is the First Codicil)</option>
                      <option value={1}>1 (One Codicil Already Exists)</option>
                      <option value={2}>2 or More (Many Past Updates)</option>
                    </select>
                  </div>

                  {/* Parameter 4: State SRO Jurisdiction */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your State in India
                    </label>
                    <select
                      value={stateJurisdiction}
                      onChange={(e) => setStateJurisdiction(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="maharashtra">Maharashtra (Mumbai / Pune / Nagpur)</option>
                      <option value="delhi">Delhi NCR</option>
                      <option value="karnataka">Karnataka (Kaveri 2.0)</option>
                      <option value="tamilnadu">Tamil Nadu (TNREGINET)</option>
                      <option value="other">Other State / Union Territory</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#172228] text-white space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${recommendationBadgeColor}`}>
                        {recommendationBadge}
                      </span>
                      <span className="text-xs text-white/70 font-semibold">• {complexityScore}</span>
                    </div>
                    <span className="text-xs text-rose-300 font-mono font-bold">SECTION 62 CHECKED</span>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Recommended Step</div>
                    <div className="text-xl sm:text-2xl font-black text-rose-200">{recommendedAction}</div>
                    <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">{reasonText}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <div className="font-bold text-[#C65378] uppercase tracking-wider mb-1">Office Filing Rule:</div>
                      <div className="text-white/80">{sroProtocol}</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-400 uppercase tracking-wider mb-1">Stamp &amp; Office Fee:</div>
                      <div className="text-white/80">{stampDutyEst}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: LEGAL DIFFERENCES COMPARISON TABLE */}
            <section id="codicil-vs-fresh-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>SIDE BY SIDE GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Codicil vs New Will: Key Legal Rules
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Picking between a Codicil and a fresh Will stops family mix-ups and lowers court costs for your kids.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="p-3.5 sm:p-4 font-bold border-r border-white/10">Rule Point</th>
                        <th className="p-3.5 sm:p-4 font-bold border-r border-white/10 text-rose-300">Codicil (Update)</th>
                        <th className="p-3.5 sm:p-4 font-bold text-emerald-300">Fresh New Will</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Law Section</td>
                        <td className="p-3.5 sm:p-4">Section 2(b): Extra paper that adds or changes part of a Will.</td>
                        <td className="p-3.5 sm:p-4">Section 2(h): Full statement of all your last wishes.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Old Will Status</td>
                        <td className="p-3.5 sm:p-4">Old Will stays fully active except for the changed lines.</td>
                        <td className="p-3.5 sm:p-4">Old Will is cancelled in full under Section 62 and 70.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Best Use Case</td>
                        <td className="p-3.5 sm:p-4">Add 1 or 2 new flats, change executor, fix typos.</td>
                        <td className="p-3.5 sm:p-4">Change major shares, cut out heirs, or start fresh trusts.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Witness Rules</td>
                        <td className="p-3.5 sm:p-4">Needs 2 adult witnesses under Section 63.</td>
                        <td className="p-3.5 sm:p-4">Needs 2 adult witnesses under Section 63.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Office Filing</td>
                        <td className="p-3.5 sm:p-4">Filed in Book 3 with a margin link to the old Will.</td>
                        <td className="p-3.5 sm:p-4">Filed in Book 3 with a brand new serial number.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 sm:p-4 font-bold bg-slate-50">Court Proof</td>
                        <td className="p-3.5 sm:p-4">Heirs must show both the old Will and the Codicil.</td>
                        <td className="p-3.5 sm:p-4">Heirs show only the latest Will in court.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: READY-TO-USE CODICIL DEED FORMAT */}
            <section id="ready-codicil-deed-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>READY LEGAL FORMAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Ready-to-Use Legal Codicil Format for India
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Use this lawyer-checked draft to update your registered Will under Section 62. Click Copy to fill in your own flat, land,
                and family details.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">
                      FIRST_CODICIL_DEED_FORMAT.DOC
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {copiedTemplate ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? "Copied to Clipboard!" : "Copy Full Format"}</span>
                  </button>
                </div>

                <div className="p-5 sm:p-6 bg-[#FCFBF8] font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 overflow-x-auto max-h-[540px] overflow-y-auto whitespace-pre-wrap select-all border-b border-slate-200">
{`FIRST CODICIL TO THE LAST WILL AND TESTAMENT

I, [Full Name of Will Maker], aged about [Age] years, son/daughter/spouse of [Father's / Husband's Name], living at [Complete Residential Address], with Aadhaar No. [XXXX-XXXX-XXXX] and PAN [XXXXXXXXX], do hereby make, publish, and declare this FIRST CODICIL to my Last Will and Testament dated [Date of Original Will]:

WHEREAS:
1. I made my Last Will and Testament dated [Date of Original Will], which was registered on [Date of Registration] at the Office of the Sub-Registrar, [SRO Location/Name], in Book No. 3, Volume No. [Volume], at Pages [Page Numbers], as Document No. [Registration Document No.] of [Year] (called the "Original Will").
2. The said Original Will stays valid and unrevoked by me up to this date.
3. Since making that Original Will, I have bought new assets, and I wish to add them and change small parts of the Original Will as set out below.

NOW THIS FIRST CODICIL WITNESSES AS FOLLOWS:

1. ADDITION OF NEW FLAT OR HOUSE:
I add this gift to Clause [Number] of my Original Will:
"I am the sole owner of Flat No. [Flat Number], situated at [Building/Society Name], [Street/Road], [Area/Locality], [City], [State], PIN [Postal Code], measuring [Area] sq. ft., bought via Sale Deed dated [Date of Sale Deed] as Doc No. [Doc No.] at SRO [Location]. After my death, I give full ownership of this flat and car parking to my [Relationship], [Full Name of Heir], born on [Date of Birth], absolutely and forever."

2. CHANGE OF EXECUTOR (IF NEEDED):
In place of the Executor named in Clause [Number] of my Original Will, I appoint my [Relationship], [Full Name of New Executor], living at [Complete Address], as the sole Executor of my Original Will and this First Codicil.

3. MASTER REAFFIRMATION AND CONFIRMATION CLAUSE:
In all other ways, except where changed or added by this First Codicil, I confirm, ratify, and reaffirm all other terms, gifts, executor names, and rules of my Last Will dated [Date of Original Will]. This First Codicil shall be read as one single part of my Original Will.

IN WITNESS WHEREOF, I, [Full Name of Will Maker], sign this First Codicil on this _______ day of _____________, 2026, at [City], in front of the two witnesses below.

________________________________________
[FULL NAME OF WILL MAKER]

WITNESS 1:
Signature: ______________________________
Full Name: [Witness 1 Full Name]
Address: [Complete Address]

WITNESS 2:
Signature: ______________________________
Full Name: [Witness 2 Full Name]
Address: [Complete Address]`}
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                  <span>Tip: Replace all bracket words before printing.</span>
                  <span className="font-bold text-[#C65378]">Print on Plain Paper or Low Stamp Paper</span>
                </div>
              </div>
            </section>

            {/* SECTION 5: MASTER REAFFIRMATION RECITAL (COMPETITOR MOAT) */}
            <section id="reaffirmation-clause-moat" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>ESSENTIAL LEGAL CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. The Master Reaffirmation Clause: Keep Old Gifts Safe
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Most free templates leave out the reaffirmation line. Without it, angry relatives can argue in court that your new page
                cancelled your old Will by mistake.
              </p>

              <div className="bg-rose-50/70 rounded-3xl border border-rose-200/90 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                  <div className="font-extrabold text-xs text-rose-950 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Master Reaffirmation Clause (Click to Copy)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyReaffirmationToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-rose-300 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {copiedReaffirmation ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReaffirmation ? "Copied!" : "Copy Clause"}</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4 border border-rose-100 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                  &quot;In all other ways, except as changed or added by this Codicil, I confirm, ratify, and reaffirm all other terms,
                  gifts, executor appointments, and rules in my Last Will dated [Date of Original Will], registered as Doc No. [Doc No.],
                  Book No. 3, Volume [Vol No.], Pages [Pages] at SRO [SRO Name]. This Codicil shall be read as a full part of my said Last
                  Will.&quot;
                </div>

                <div className="space-y-2 text-xs text-rose-900 leading-relaxed">
                  <p>
                    <strong>Why this short clause helps your family:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Blocks Wrong Claims:</strong> It proves you only meant to update named parts and did not cancel the rest of
                      your Will.
                    </li>
                    <li>
                      <strong>Updates Will Date:</strong> Confirming your old Will brings its legal date forward, proving your clear mind on
                      the day of signing.
                    </li>
                    <li>
                      <strong>Stops Share Clashes:</strong> Ensures your newly bought flat goes to the exact heir you picked without hurting
                      other shares.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: ADDING NEW PROPERTIES */}
            <section id="adding-property-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>ADD NEW ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Add Newly Bought Flats, Land &amp; Bank Accounts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                People often write a Codicil right after buying a new home or opening fixed deposits. Use these clear lines for each asset
                type.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card A: Immovable Real Estate Flat / Plot */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228] uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>New Flat or Land Clause</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Add your full flat number, building name, area size, and registered sale deed number.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
                    &quot;I give my Flat No. 502, Building B, Sunrise Heights, CTS No. 124, Andheri West, Mumbai, bought via Doc No.
                    4321/2025 at SRO Andheri, solely to my daughter [Name], with the car parking slot.&quot;
                  </div>
                </div>

                {/* Card B: Movable Mutual Funds & Fixed Deposits */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228] uppercase tracking-wider">
                    <Landmark className="w-4 h-4 text-[#5F7E75]" />
                    <span>Bank Cash &amp; Share Accounts</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Will wins over a bank nominee. List your bank branch, account number, and demat details clearly.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
                    &quot;I give all cash in my HDFC Bank Savings A/c No. [Account No.] and Demat Account No. [DP ID] with Zerodha to my
                    son [Name] solely, overriding any bank nominee.&quot;
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: CHANGING EXECUTORS OR LEGAL HEIRS */}
            <section id="changing-executors-heirs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CHANGE EXECUTOR OR HEIR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Change Executors or Legal Heirs Using a Codicil
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  If your named executor moves abroad, grows too old, or passes away, you should pick a new one right away. You can also
                  cancel a single gift without touching the rest of your Will.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-xs text-slate-900">Name a New Executor:</div>
                    <p className="text-xs text-slate-600">
                      &quot;Due to the death of the Executor named in Clause 4 of my Original Will, I cancel that name and appoint my nephew
                      [Name], living at [Address], as the sole Executor of my Will and this Codicil.&quot;
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-xs text-slate-900">Cancel One Specific Gift:</div>
                    <p className="text-xs text-slate-600">
                      &quot;I cancel Clause 8 of my Original Will where I gave my farm plot to [Name]. That plot shall now pass equally to my
                      grandchildren as part of my remaining assets.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: SUB-REGISTRAR CROSS-REFERENCING GUIDE */}
            <section id="sro-cross-referencing-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>OFFICE REGISTRATION GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Sub-Registrar Office Book 3 Cross-Linking Guide
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Filing a Codicil is optional under Section 18 of the Registration Act. Still, filing it in Book 3 ties it straight to your
                old Will and blocks doubt.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider">Step 1: Find Book 3</div>
                    <div className="font-bold text-slate-900 text-sm">Check Old Receipt</div>
                    <p className="text-xs text-slate-600">
                      Keep your old registered Will receipt ready with the Book 3 Volume, Page, and Serial Number.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider">Step 2: Visit Office</div>
                    <div className="font-bold text-slate-900 text-sm">Take Two Witnesses</div>
                    <p className="text-xs text-slate-600">
                      Visit the Sub-Registrar Office with two witnesses, original Aadhaar cards, and two photos each.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[#C65378] font-bold text-xs uppercase tracking-wider">Step 3: Margin Note</div>
                    <div className="font-bold text-slate-900 text-sm">Link Both Deeds</div>
                    <p className="text-xs text-slate-600">
                      The clerk records the Codicil in Book 3 and writes a cross-link note on the margin of your old Will.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Moved to a New City?</span>
                  </div>
                  <p>
                    If you moved after making your first Will, you can file the Codicil at your new city office. Just bring a copy of your
                    old registered Will so the new clerk can send a link note to the old office.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: MANDATORY SECTION 63 ATTESTATION */}
            <section id="section-63-attestation-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SIGNING RULES IN INDIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Section 63 Signing Rules: Two Witness Mandate
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Do not think a short update needs fewer steps. Under Section 63 of the Indian Succession Act,{" "}
                  <strong>a Codicil must follow the exact same signing rules as a full Will</strong>:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sign Every Page:</strong> The Will maker must sign or put a thumb mark on each page clearly at the end.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Two Adult Witnesses:</strong> Two trusted adults must see you sign and then sign in your sight.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>No Heir Witnesses:</strong> Under Section 67, an heir or their spouse must never sign as a witness. Doing so
                      cancels their share!
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 10: LANDMARK COURT PRECEDENTS */}
            <section id="landmark-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SUPREME COURT BENCHMARKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Supreme Court Cases: Bhagat Ram &amp; Section 68 BSA
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#C65378] space-y-1">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Bhagat Ram v. Suresh Kumar, (2003) 12 SCC 35
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court ruled that a Codicil stands equal to a Will in court. Heirs must prove it under Section 68 of the
                      Evidence Act (now Section 68 BSA, 2023) by calling at least one signing witness to the court stand.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#5F7E75] space-y-1">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      Surendra Pal v. Dr. Saraswati Arora, (1974) 2 SCC 600
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court held that anyone using a Will or Codicil must clear all doubts. You must show the Will maker was
                      of clear mind and knew exactly what they were changing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: STEP-BY-STEP SOP */}
            <section id="step-by-step-codicil-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STEP BY STEP CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Step-by-Step Guide to Sign &amp; Register a Codicil
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong>Find Your Old Will Numbers:</strong> Copy the exact date, Sub-Registrar office name, Book 3 Volume, Page, and
                      Doc Serial Number from your old Will.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Write Clear Changes:</strong> State which clause you want to add or fix, and paste the Master Reaffirmation
                      Clause at the bottom.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Get a Doctor Fitness Note:</strong> Have a registered doctor sign a short note on the same day saying your
                      mind is clear and sharp.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong>Sign With Two Witnesses:</strong> Sign every page while both neutral adult witnesses watch, then have them
                      sign below your name.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#172228] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div>
                      <strong>Visit the Sub-Registrar:</strong> Book an online slot, pay the small office fee, do your thumb scan, and take
                      your Book 3 Codicil receipt home.
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 12: FOUR MISTAKES TO AVOID */}
            <section id="five-fatal-codicil-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>AVOID COURT ERRORS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Four Fatal Mistakes When Changing a Registered Will
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-xs space-y-1.5">
                  <div className="font-bold text-xs text-rose-700 uppercase tracking-wider">Mistake 1</div>
                  <div className="font-extrabold text-slate-900 text-sm">Writing by Hand on Your Old Will</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crossing out words or writing notes on your signed Will voids those edits under Section 71 unless witnessed afresh.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-xs space-y-1.5">
                  <div className="font-bold text-xs text-rose-700 uppercase tracking-wider">Mistake 2</div>
                  <div className="font-extrabold text-slate-900 text-sm">Asking an Heir to Be Witness</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If the person getting the new flat signs as a witness, they lose their gift under Section 67. Always use neutral friends.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-xs space-y-1.5">
                  <div className="font-bold text-xs text-rose-700 uppercase tracking-wider">Mistake 3</div>
                  <div className="font-extrabold text-slate-900 text-sm">Leaving Out the Reaffirmation Line</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Missing this clause leaves doubt over whether your old shares are still valid or cancelled.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-xs space-y-1.5">
                  <div className="font-bold text-xs text-rose-700 uppercase tracking-wider">Mistake 4</div>
                  <div className="font-extrabold text-slate-900 text-sm">Piling Up Three or More Codicils</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Having three separate updates creates big court delays. Write one clean new Will instead.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>ABOUT OUR LEGAL TEAM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. About WillDrafting.in &amp; AMA Legal Solutions
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  WillDrafting.in is powered by <strong>AMA Legal Solutions</strong>. Our legal team writes clear, dispute-proof Wills,
                  Codicils, and family settlements across India. We help families file Book 3 deeds smoothly and avoid costly probate fights.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-lg font-black text-slate-900">10,000+</div>
                    <div className="text-[10px] font-bold text-[#C65378] uppercase">Wills Drafted</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-lg font-black text-slate-900">100%</div>
                    <div className="text-[10px] font-bold text-[#C65378] uppercase">Section 63 Checked</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-lg font-black text-slate-900">28 States</div>
                    <div className="text-[10px] font-bold text-[#C65378] uppercase">All-India Coverage</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-lg font-black text-slate-900">Zero Mix-Up</div>
                    <div className="text-[10px] font-bold text-[#C65378] uppercase">Clear Clauses</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Codicils in India
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Simple answers to common questions about changing a registered Will in India.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"}`} />
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

            {/* SECTION 15: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL LAW PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Legal Citations &amp; Official Govt Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
                <p>
                  Read the official Indian Acts on trusted Government sites:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                  >
                    <span>India Code: Registration Act 1908</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://services.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    More WillDrafting Legal Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/caveat-against-probate-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Caveat Format India
                    </Link>
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Witness Sworn Note Format
                    </Link>
                    <Link
                      href="/templates/revocation-of-will-deed-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Cancel Deed Format
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Deal Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* THREE SUMMARY PLAIN LANGUAGE CARDS (Flesch Readability Boost) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Add a Codicil Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A short Codicil lets you add new flats, land, or bank cash fast. You do not have to write a whole new Will. Your
                  spouse and kids stay safe from slow court fights.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can print your Codicil on plain white paper or low stamp paper. Sign it in front of two adult witnesses who get
                  no gift in your Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team reads your old Will and writes clear words for your new flat or cash. We keep all your old gifts safe so
                  your kids get their share fast.
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
                Expert in Indian Will law, Section 62 Codicil deeds, Book 3 Sub-Registrar filing, and probate suits across India.
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
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING / AMENDMENT (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>KEEP NEW ASSETS SAFE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft or Amend Your Will in 15 Minutes
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Bought a new flat or need a new executor? Draft a clear Codicil or fresh Will online with full legal safety.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Will or Codicil Draft</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doctor Note &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Gavel className="w-3 h-3" />
                  <span>LEGAL HELP DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Changing a Registered Will?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Will lawyers write custom Codicils and guide you through Book 3 office filing across India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult Estate Lawyer</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Codicil Filing Papers</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Copy of Old Registered Will</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Details of New Flats or Cash</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Master Reaffirmation Clause</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>2 Neutral Adult Witnesses</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Doctor Mind Fitness Note</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>SRO Book 3 Margin Cross-Link</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
