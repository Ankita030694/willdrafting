"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "plain-paper-validity", label: "1. Is Plain Paper Legal?" },
  { id: "section-63-checklist", label: "2. Simple Legal Checklist" },
  { id: "clause-annotated-template", label: "3. Free Will Format (Explained)" },
  { id: "section-67-witness-warning", label: "4. Who Cannot Be a Witness" },
  { id: "visual-blueprint", label: "5. Parts of an Indian Will" },
  { id: "step-by-step-sop", label: "6. Easy 6-Step Guide" },
  { id: "three-diy-mistakes", label: "7. 3 Common Mistakes to Avoid" },
  { id: "comparison-matrix", label: "8. Plain Paper vs Registered Will" },
  { id: "procedural-timeline", label: "9. How Long Does It Take?" },
  { id: "specialized-scenarios", label: "10. Own Property vs Ancestral Property" },
  { id: "institutional-backing", label: "11. Lawyer Verified & Trusted" },
  { id: "frequently-asked-questions", label: "12. Questions People Often Ask" },
  { id: "statutory-citations", label: "13. Official Legal References" },
];

const TEMPLATE_TEXT = `LAST WILL AND TESTAMENT

I, [Full Name], son/daughter/wife of [Father's/Spouse's Name], aged [Age] years, residing at [Complete Home Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number], cancel all my previous Wills or informal notes made earlier, and declare this to be my Last Will.

1. DECLARATION OF SOUND MIND AND FREE WILL
I confirm that I am in good health and thinking clearly. I fully understand what properties and money I own, and who I am giving them to. I am making this Will entirely on my own choice, without anyone forcing, pressuring, or misleading me.

2. APPOINTMENT OF EXECUTOR (MY TRUSTED MANAGER)
I appoint [Name of Executor], son/daughter of [Father's Name], residing at [Address], to be the Executor of this Will. They will carry out my wishes, handle paperwork with banks, housing societies, and transfer assets to my family.
If they are unable or unwilling to act, I appoint [Name of Alternate Executor], residing at [Address], as my backup Executor.

3. CLEARING DEBTS AND FUNERAL EXPENSES
I direct that any genuine personal loans or debts, plus my funeral and last rites expenses, be paid first from my estate before distributing the remaining assets.

4. GIVING MY IMMOVABLE PROPERTIES (FLAT / HOUSE / LAND - SCHEDULE A)
I am the sole, rightful owner of the properties listed in Schedule A below. After my passing:
(a) My residential property at [Full Address, Flat/Plot No., Sub-Registrar Registration Details] will go completely and permanently to my [Relation], [Beneficiary Name 1], who will have 100% ownership to live in, rent, or sell as they wish.
(b) [Add details of any other property, shop, or agricultural land].

5. GIVING MY MOVABLE ASSETS (BANK ACCOUNTS, FD, SHARES, GOLD - SCHEDULE B)
I own the financial assets listed in Schedule B below. After my passing:
(a) The money in my Savings Bank Account No. [Account No.] with [Bank Name, Branch] will go to [Beneficiary Name 2].
(b) My shares and mutual funds under Demat Account No. [DP ID / Client ID] with [Broker/Depository] will go to [Beneficiary Name 3].
(c) [Add details of other bank accounts, fixed deposits, or jewelry].

6. LEFTOVER & FUTURE ASSETS (RESIDUARY CLAUSE)
Any other property, bank account, unexpected tax refund, or new asset I buy in the future that is not specifically mentioned in this Will shall go entirely to my [Relation/Beneficiary Name]. This ensures nothing is left undecided.

7. NOMINEE CLARIFICATION
I make it clear that nominees named in my bank accounts, insurance, or housing societies are only temporary caretakers to receive funds smoothly. The actual and permanent ownership belongs solely to the beneficiaries named in this Will.

SIGNED BY ME:
I, [Full Name], have signed this Will on [Day] of [Month], [Year] at [City/Town].

___________________________________
MY SIGNATURE / THUMB IMPRESSION
[Full Name]

WITNESS SIGNATURES (UNDER SECTION 63, INDIAN SUCCESSION ACT, 1925)
Signed by the above-named person as their Last Will in our presence. Both of us were present at the same time, saw them sign, and we are signing below in their presence. We confirm that neither of us, nor our spouses, are receiving any property or money under this Will.

WITNESS 1:
Signature: ___________________________
Full Name: [Witness 1 Name]
Father's Name: [Father's Name]
Age & Occupation: [Age / Occupation]
Home Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]

WITNESS 2:
Signature: ___________________________
Full Name: [Witness 2 Name]
Father's Name: [Father's Name]
Age & Occupation: [Age / Occupation]
Home Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]

SCHEDULE A: LIST OF PROPERTIES (IMMOVABLE)
1. Property: [Flat / House / Plot Number, Building Name, Street, City]
   Boundaries: East: [ ], West: [ ], North: [ ], South: [ ]
   Registration / Sale Deed Number: [Number & Sub-Registrar Office]

SCHEDULE B: LIST OF MONEY & INVESTMENTS (MOVABLE)
1. Bank Accounts & FDs: [Bank Name, Branch, Account/FD Numbers]
2. Demat & Mutual Funds: [Broker Name, DP ID, Client ID, Folio Numbers]
3. Other Valuables: [Jewelry, vehicles, or lockers]`;

const CLAUSE_ANNOTATIONS = [
  {
    clause: "Sound Mind Declaration",
    statute: "Section 59, Indian Succession Act, 1925",
    rationale:
      "Plain words: You confirm you are thinking clearly and know what you own. This stops unhappy relatives from falsely claiming later in court that you were confused, ill, or manipulated.",
  },
  {
    clause: "Canceling Older Wills",
    statute: "Section 62, Indian Succession Act, 1925",
    rationale:
      "Plain words: Makes it 100% clear that this new Will replaces any older drafts or verbal promises, so your family only follows your latest wishes without any confusion.",
  },
  {
    clause: "Naming an Executor & Backup",
    statute: "Section 222, Indian Succession Act, 1925",
    rationale:
      "Plain words: You pick a trusted person to carry out your wishes (like visiting the bank or transferring the flat). Naming a backup ensures things don't get stuck if your first choice is unwell or unavailable.",
  },
  {
    clause: "Listing Specific Properties",
    statute: "Sections 82 & 83, Indian Succession Act, 1925",
    rationale:
      "Plain words: Writing clear details (like flat number, bank account number, or demat ID) prevents arguments among family members and helps offices transfer the name easily.",
  },
  {
    clause: "Leftover & Future Property Clause",
    statute: "Section 102, Indian Succession Act, 1925",
    rationale:
      "Plain words: A safety net for anything you forgot to list, or any new savings or home you buy later. It automatically gives them to your chosen person so your family never has to fight in court over missing items.",
  },
  {
    clause: "Two Independent Witnesses",
    statute: "Section 63(c), Indian Succession Act, 1925",
    rationale:
      "Plain words: Two adults must see you sign and sign in front of you. Under Indian law, a Will signed without two witnesses is not valid in court.",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "You are 18+ and Thinking Clearly",
    subtext: "You understand what assets you own and who you are giving them to (Section 59).",
  },
  {
    id: "check-2",
    label: "Plain Paper is 100% Legal",
    subtext: "Written or printed on standard white paper. No stamp paper or government stamp fee is needed.",
  },
  {
    id: "check-3",
    label: "You Named an Executor (Trusted Manager)",
    subtext: "You chose a reliable person to carry out your wishes, plus a backup just in case.",
  },
  {
    id: "check-4",
    label: "Two Independent Witnesses Selected",
    subtext: "Two adults who are NOT getting anything from the Will and are not married to someone who is (Section 67).",
  },
  {
    id: "check-5",
    label: "Clear Property & Account Details",
    subtext: "Flats have full addresses; bank accounts and demat accounts have their numbers listed.",
  },
  {
    id: "check-6",
    label: "Leftover Property Clause Included",
    subtext: "A safety clause covering any future savings, property, or overlooked assets so nothing gets stuck.",
  },
];

const FAQS = [
  {
    q: "Do I need stamp paper to make a valid Will in India?",
    a: "No, not at all. Under the Indian Stamp Act, 1899, a Will is completely exempt from stamp duty. You can legally write or print your Will on normal white A4 paper. Buying expensive stamp paper is a waste of money and gives you zero extra legal safety.",
  },
  {
    q: "How many witnesses do I need, and who can be a witness?",
    a: "You need at least two adult witnesses (above 18 years). They must see you sign the Will, and you must see them sign. They can be trusted friends, neighbours, colleagues, or your family doctor. Just make sure they are not receiving any property or money in the Will.",
  },
  {
    q: "Can my son, daughter, or spouse sign as a witness?",
    a: "Never let someone who is getting property in the Will (or their husband/wife) sign as a witness. Under Section 67 of the Indian Succession Act, if a beneficiary signs as a witness, the Will remains valid, BUT that person completely loses their inheritance! To protect their share, always ask independent friends or outsiders to witness.",
  },
  {
    q: "Is it compulsory to register my Will at the government office?",
    a: "No, registration is completely optional under Section 18 of the Registration Act, 1908. A Will written on plain paper at home is just as legally valid. However, registering it at the Sub-Registrar's office provides extra proof that you signed it yourself and were of sound mind, making it very hard for anyone to challenge later.",
  },
  {
    q: "Can I type my Will on a computer, or must it be handwritten?",
    a: "Both typed and handwritten Wills are equally valid in India. Typing and printing on white paper is actually better because it is neat, easy to read, and avoids confusion over messy handwriting. Just make sure you and both witnesses sign with a pen.",
  },
  {
    q: "Does a Will override bank account nominees?",
    a: "Yes! The Supreme Court of India has made it very clear that a nominee is only a temporary caretaker to collect the money from the bank. The permanent, legal ownership belongs to whoever is named in your Will.",
  },
  {
    q: "Can I give away ancestral family property in my Will?",
    a: "You can only give away your own individual share in ancestral property. You cannot give away the whole family property or take away the lawful birthright shares of your children or other family members.",
  },
  {
    q: "Can the executor also receive property in the Will?",
    a: "Yes. An executor can also be a beneficiary (for example, many people name their spouse or elder child as executor). Just remember: that person must NOT sign as a witness.",
  },
  {
    q: "What is a Codicil, and when should I use one?",
    a: "A Codicil is simply a small official update note attached to an existing Will (for example, to update a new bank account or change an executor). If you want to make big changes to how you divide your property, it is much cleaner and safer to make a fresh new Will.",
  },
  {
    q: "How do I make sure no one challenges my Will in court?",
    a: "To make your Will rock-solid: (1) Get a simple fitness certificate from a MBBS doctor confirming you are healthy and thinking clearly; (2) Take a short video on your phone while signing with your two witnesses; (3) Do not let beneficiaries sign as witnesses; and (4) If you are leaving out a close family member, politely mention the reason so nobody can claim you forgot them.",
  },
];

export default function WillFormatIndiaClient() {
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

  const [activeId, setActiveId] = useState<string>("plain-paper-validity");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": false,
    "check-4": true,
    "check-5": false,
    "check-6": true,
  });

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

  const handleCopy = () => {
    navigator.clipboard.writeText(TEMPLATE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllValid = checkedCount === CHECKLIST_ITEMS.length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <FileText className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT &bull; STATUTORY WILL TEMPLATE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Legally Valid Will Format in India for Property & Assets
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Download our free, clause-annotated Indian Will format. Learn why plain paper is 100% legally enforceable, avoid Section 67 witness traps, and protect your family today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft Your Will in 15 Minutes</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clause-annotated-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Free Template Below</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Legal Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Legal Experience
              </span>
            </div>

            {/* Stat 2: Wills / Cases Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Cases Handled
              </span>
            </div>

            {/* Stat 3: Assets Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Protected
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              {/* Google 4-Color 'G' Logo */}
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,300+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Statutory Compliance Badge in Sidebar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Drafted under Section 63 of the Indian Succession Act, 1925 & Schedule I of the Indian Stamp Act, 1899.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  QUICK SUMMARY: 4 GOLDEN RULES OF AN INDIAN WILL
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Essential Rules Every Indian Family Should Know
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>No stamp paper needed:</strong> Writing or typing your Will on ordinary white A4 paper is 100% legal. You do not need to buy costly stamp paper.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Two adult witnesses are compulsory:</strong> Two people above 18 years must watch you sign the Will and then sign it themselves in front of you (Section 63).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Heirs must NOT sign as witnesses:</strong> If your son, daughter, or spouse gets anything in the Will, they should never sign as a witness. If they do, they legally lose their share (Section 67).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Registration is optional:</strong> You do not have to visit a government office. A Will made and signed at home is fully enforceable in court.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: PLAIN PAPER VALIDITY */}
            <section id="plain-paper-validity" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: THE BASICS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Is a Will on Plain Paper Really Legal in India?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Yes, absolutely. Many people in India believe that a Will is only valid if it is bought on expensive green or blue court stamp paper, notarized, or registered. That is completely untrue.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under the Indian Stamp Act, 1899, the government stamp duty on a Will is exactly zero. Under Section 63 of the Indian Succession Act, 1925, the law only requires three simple things: (1) You write down your wishes clearly on plain paper, (2) You sign it yourself, and (3) Two adult witnesses watch you sign and sign in front of you. That is all it takes to make a legally binding Will.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">
                  What the Supreme Court of India Says
                </p>
                <p>
                  The Supreme Court has confirmed in multiple landmark rulings (such as <em>Ishwardeo Narain Singh v. Kamta Devi</em>) that an informal handwritten or typed document on ordinary paper has full legal force as long as your intention is clear and two witnesses signed it.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKLIST */}
            <section id="section-63-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 2: COMPLIANCE AUDIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Checklist: Section 63 Legal Requirements
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before printing your Will, review these essential statutory criteria. Check each item to verify that your document complies with Indian law.
              </p>

              {/* Checklist Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    Legal Validity Audit Score: {checkedCount} / {CHECKLIST_ITEMS.length}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      isAllValid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "100% Legally Compliant" : "Action Items Pending"}
                  </span>
                </div>

                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item) => (
                    <label
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item.id]}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#C65378] focus:ring-[#C65378]"
                      />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.subtext}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {isAllValid ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Excellent. Your Will meets every requirement under Section 63 of the Indian Succession Act, 1925.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Please check the remaining items to ensure your Will does not risk probate delays or legal contest.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: CLAUSE-ANNOTATED TEMPLATE */}
            <section id="clause-annotated-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 3: FREE DOWNLOADABLE TEMPLATE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Clause-Annotated Will Format: Free Downloadable Template
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is a comprehensive, advocate-approved Will format tailored for Indian properties and financial assets. You can copy it directly or print it for execution.
              </p>

              {/* Template Container with Copy & Print Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Standard Indian Will Template (Plain Paper Ready)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Format</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="Print template"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50/50 max-h-[500px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all border-b border-slate-200">
                  {TEMPLATE_TEXT}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                  <span className="text-center sm:text-left">
                    Need this customized with your bank accounts and family details?
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Generate Custom Will Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Clause Annotations Cards */}
              <div className="mt-6 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  Clause-by-Clause Legal Rationale (Why Each Clause Exists)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {CLAUSE_ANNOTATIONS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{item.clause}</span>
                        <span className="text-[10px] font-semibold text-[#C65378] bg-rose-50 px-2 py-0.5 rounded-md">
                          {item.statute}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: SECTION 67 WARNING */}
            <section id="section-67-witness-warning" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>SECTION 4: IMPORTANT WARNING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Who Should NOT Sign as a Witness (Section 67 Warning)
              </h2>
              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-5 sm:p-6 space-y-3 text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>Crucial Rule: Beneficiaries Must Never Sign as Witnesses</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Never ask your son, daughter, spouse, or anyone who is receiving property in your Will to sign as a witness. Under Section 67 of the Indian Succession Act, if someone getting property signs as a witness, <strong>they legally lose their entire inheritance</strong>!
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  The Will remains valid for others, but the person who signed as a witness gets nothing by law. To keep your family members safe, always choose two independent adult witnesses who have no financial share in your property.
                </p>
                <div className="pt-2 border-t border-amber-200 text-xs font-semibold text-amber-950 flex flex-wrap items-center gap-4">
                  <span>&bull; Trusted friends or neighbours</span>
                  <span>&bull; Your family doctor (adds proof of good health)</span>
                  <span>&bull; Colleagues or office peers</span>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>SECTION 5: VISUAL ANATOMY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Visual Blueprint: Anatomy of an Enforceable Indian Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                An enforceable Will follows a logical statutory anatomy. Below is the blueprint illustrating the proper structural hierarchy from title to witness attestation.
              </p>

              {/* Full width container: edge-to-edge on mobile (0px side margin), 100% content column width on desktop */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/will-format-india-og.jpg"
                    alt="Visual Blueprint and Anatomy of a Valid Will Format in India"
                    width={1376}
                    height={768}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: Standard structure of a Section 63 compliant Will in India
                  </span>
                  <Link
                    href="/images/will-format-india-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6: NUMBERED STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                <span>SECTION 6: HOW TO DO IT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Easy 6-Step Guide to Make Your Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Making a Will does not need complicated legal running around. Follow these six straightforward steps:
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Make a Simple List of What You Own",
                    desc: "List your home, flat, plot, bank savings, fixed deposits, mutual funds, gold, and insurance. Keep self-bought assets separate from ancestral property.",
                  },
                  {
                    step: "2",
                    title: "Choose a Trusted Executor (and Backup)",
                    desc: "Pick someone responsible (like a responsible family member or trusted friend) who will handle bank visits and paperwork later. Name an alternate person too.",
                  },
                  {
                    step: "3",
                    title: "Decide Who Gets What & Add a Safety Net Clause",
                    desc: "Clearly name who gets each asset. Always include a leftover clause (residuary clause) so any future savings or forgotten accounts automatically go to your chosen person.",
                  },
                  {
                    step: "4",
                    title: "Print on Normal White A4 Paper",
                    desc: "Print it out on clean white paper. You do not need to buy green stamp paper or pay any stamp fees.",
                  },
                  {
                    step: "5",
                    title: "Sign in Front of Two Witnesses",
                    desc: "Sign (or put your thumbprint) at the bottom of every page. Two adult witnesses must see you sign and sign in front of you. Remember: witnesses must not be beneficiaries.",
                  },
                  {
                    step: "6",
                    title: "Keep It in a Safe Place and Tell Your Executor",
                    desc: "Store the signed original in a safe locker or cupboard at home. Inform your executor where it is kept so they can find it easily when needed.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: THREE FATAL DIY MISTAKES */}
            <section id="three-diy-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>SECTION 7: COMMON MISTAKES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Three Common Mistakes to Avoid
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Simple oversights can cause unnecessary confusion or court disputes for your family. Watch out for these three common traps:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Wasting Money on Stamp Paper
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Buying expensive stamp paper is unnecessary. It adds zero legal benefit and often leads people to crowd small text onto limited pages. Plain white paper is 100% legal.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Having a Family Heir Sign as Witness
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If your spouse or child signs as a witness, Section 67 cancels their inheritance! Always ask trusted friends, colleagues, or your family doctor to be witnesses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Writing Vague Property Descriptions
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Writing just &ldquo;my flat&rdquo; without the flat number, building name, city, or bank account details can cause disputes. Always write the exact address and account numbers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARATIVE MATRIX TABLE */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 8: LEGAL COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparative Matrix: Plain Paper, Notarized, and Registered
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Evaluate the legal differences between plain paper execution, notary attestation, and sub-registrar registration.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[600px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Feature / Metric</th>
                      <th className="p-3.5 sm:p-4">Plain Paper Will</th>
                      <th className="p-3.5 sm:p-4">Notarized Will</th>
                      <th className="p-3.5 sm:p-4">Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Legal Validity</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">100% Valid (Sec 63)</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">100% Valid</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">100% Valid</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty Cost</td>
                      <td className="p-3.5">₹0 (Completely Exempt)</td>
                      <td className="p-3.5">₹0 (Notary Fee only)</td>
                      <td className="p-3.5">Nominal Registration Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Witness Requirement</td>
                      <td className="p-3.5">Minimum 2 Adults</td>
                      <td className="p-3.5">Minimum 2 Adults</td>
                      <td className="p-3.5">2 Witnesses Present at Registrar</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Evidentiary Strength</td>
                      <td className="p-3.5 text-slate-600">Standard Burden of Proof</td>
                      <td className="p-3.5 text-slate-700">Notary Register Entry</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Government Certified Record</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Execution Speed</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Immediate (15 Minutes)</td>
                      <td className="p-3.5">Same Day</td>
                      <td className="p-3.5">Requires Sub-Registrar Slot</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: PROCEDURAL TIMELINE */}
            <section id="procedural-timeline" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>SECTION 9: TIMELINE & MILESTONES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Procedural Timeline: Drafting to Estate Transmission
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understand the lifecycle of your Will from the day of execution through final asset transmission to your loved ones.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[550px]">
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Action Item</th>
                      <th className="p-3">Statutory Governing Authority</th>
                      <th className="p-3">Standard Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 1</td>
                      <td className="p-3">Drafting and Plain Paper Signing</td>
                      <td className="p-3 font-mono text-xs">Sec 63, ISA 1925</td>
                      <td className="p-3 text-emerald-600 font-bold">1 Day</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 2</td>
                      <td className="p-3">Optional Sub-Registrar Registration</td>
                      <td className="p-3 font-mono text-xs">Sec 18, Registration Act</td>
                      <td className="p-3">3 to 7 Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 3</td>
                      <td className="p-3">Safe Custody & Periodic Review</td>
                      <td className="p-3 font-mono text-xs">Codicil Rules</td>
                      <td className="p-3">Lifetime</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 4</td>
                      <td className="p-3">Executor Assumes Administration</td>
                      <td className="p-3 font-mono text-xs">Sec 211, ISA 1925</td>
                      <td className="p-3">Post Demise (Immediate)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 5</td>
                      <td className="p-3">Bank Transmission & Title Mutation</td>
                      <td className="p-3 font-mono text-xs">Municipal & Banking Norms</td>
                      <td className="p-3">15 to 45 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SECTION 10: PROPERTY TYPES EXPLAINED</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Can You Give Away Any Property? (Own Property vs Ancestral Property)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                What you can give in your Will depends on how you acquired the property. Here is how Indian law treats different situations:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Property Bought with Your Own Money</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You have 100% freedom to give properties bought with your own earnings to anyone you wish—your spouse, one child, a friend, or a charity. Nobody in your family can legally stop you.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <span>Ancestral Family Property</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If property came down from your father or grandfather without being divided, you can only give away your own individual share under Section 30 of the Hindu Succession Act. You cannot give away the entire family property.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <UserCheck className="w-4 h-4 text-[#D29E0D]" />
                    <span>Young Children (Under 18 Years)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If your children are minors, name a trusted legal guardian in your Will under Section 9 of the Hindu Minority and Guardianship Act, 1956 to look after them and their inheritance until they turn 18.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Leaving Out a Family Member</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you decide not to leave anything to a child or relative from your self-bought property, briefly write a polite, clear reason (for example: &ldquo;I already helped them buy a home&rdquo;). This stops disputes in court.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: COMPANY PROFILE */}
            <section id="institutional-backing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>SECTION 11: INSTITUTIONAL BACKING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Backing: Powered by AMA Legal Solutions
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">WillDrafting.in</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      India&apos;s Dedicated Estate Planning & Succession Portal
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAF7F0] border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>In Collaboration with</span>
                    <strong className="text-slate-900">AMA Legal Solutions</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every template, legal clause, and automated workflow on WillDrafting.in is designed and regularly audited by experienced advocates from AMA Legal Solutions. We ensure complete alignment with the Indian Succession Act, 1925, Hindu Succession Act, 1956, and state-level registration norms.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">18-Point Check</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Legal Health Audit</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">Zero Stamp Duty</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Statutory Exemption</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">Court Ready PDF</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Instant Generation</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 12: DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Will Formats and Indian Law
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to common questions about executing, witnessing, and registering your Will in India.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors"
                      aria-expanded={openFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4" />
                <span>SECTION 13: STATUTORY CITATIONS & REFERENCES</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Statutory Citations and Official Government Resources
              </h2>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 59 (testamentary capacity), Section 62 (revocability), Section 63 (attestation rules), Section 67 (witness disqualification), and Section 222 (probate granted to executor).
                </li>
                <li>
                  <strong>Indian Stamp Act, 1899:</strong> Schedule I, Entry 64 (wills exempt from stamp duty).
                </li>
                <li>
                  <strong>Registration Act, 1908:</strong> Section 18(e) (registration of wills is optional).
                </li>
                <li>
                  <strong>Supreme Court of India:</strong> <em>Shakti Yezdani v. Jayanand Salgaonkar (2023)</em> (Will overrides nominee rights); <em>Ishwardeo Narain Singh v. Kamta Devi</em> (probate principles).
                </li>
              </ul>

              <div className="pt-3 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Explore Related Free Templates & Guides:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/codicil-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Codicil Format (Amend a Will) &rarr;
                  </Link>
                  <Link
                    href="/templates/living-will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Living Will Format (Advance Medical Directive) &rarr;
                  </Link>
                  <Link
                    href="/templates/will-format-hindi"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    वसीयतनामा फॉर्मेट (Hindi Will Format) &rarr;
                  </Link>
                  <Link
                    href="/blogs/notarized-will-vs-registered-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Notarized Will vs Registered Will &rarr;
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Indian Succession Calculator &rarr;
                  </Link>
                  <Link
                    href="/service/nri-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    NRI Indian Will Drafting &rarr;
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author Bio & Emergency CTAs)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-base shrink-0">
                  RR
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Advocate Rajeshwar Rao</div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 18+ years of expertise in testamentary litigation, probate matters, and estate structuring at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>Verified Legal Review</span>
                </span>
                <span className="font-semibold text-slate-700">AMA Legal</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: ACTION CTA CARD (Berry Rose / Navy) */}
            <div className="hidden lg:block bg-[#172228] rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-900/10 space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL & SECURE</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Want Your Custom Will Drafted in 15 Minutes?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avoid drafting errors. Use our guided step-by-step wizard to produce an advocate-verified, court-ready Will for your family.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Start Free Draft</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>Questions? Call our advocates</span>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Why Use This Template?
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Plain Paper Legal:</strong> Zero stamp duty required anywhere in India.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 63 Compliant:</strong> Built-in two-witness attestation block.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Residuary Protection:</strong> Covers all future and unforeseen assets.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dispute Resistant:</strong> Structured to withstand court probate scrutiny.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TEMPLATES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Related Free Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/templates/codicil-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Codicil Format (Amend a Will)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    How to alter your Will lawfully &rarr;
                  </div>
                </Link>
                <Link
                  href="/templates/will-format-hindi"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">वसीयतनामा फॉर्मेट (Hindi)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Complete format in Devanagari script &rarr;
                  </div>
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Notarized vs Registered Will</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Which provides stronger evidence? &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Calculate legal heir shares under personal law &rarr;
                  </div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/templates/codicil-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Codicil Format (Amend a Will)
                </Link>
                <Link
                  href="/service/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Preparation Checklist
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Notarized vs Registered Will
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
