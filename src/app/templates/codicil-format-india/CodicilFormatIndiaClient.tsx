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
  RefreshCw,
  GitCommit,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is a Codicil?" },
  { id: "section-63-checklist", label: "2. Simple Legal Checklist" },
  { id: "clause-annotated-template", label: "3. Free Codicil Format (Explained)" },
  { id: "codicil-vs-new-will", label: "4. Codicil or New Will: Which to Choose?" },
  { id: "section-71-pen-alterations", label: "5. Never Cross Out Words with a Pen" },
  { id: "visual-blueprint", label: "6. Parts of an Indian Codicil" },
  { id: "step-by-step-sop", label: "7. Easy Step-by-Step Guide" },
  { id: "three-fatal-mistakes", label: "8. 3 Common Mistakes to Avoid" },
  { id: "conflict-resolution-rules", label: "9. How Codicils & Wills Work Together" },
  { id: "specialized-scenarios", label: "10. 4 Everyday Situations" },
  { id: "institutional-backing", label: "11. Lawyer Verified & Trusted" },
  { id: "frequently-asked-questions", label: "12. Questions People Often Ask" },
  { id: "statutory-citations", label: "13. Official Legal References" },
];

const CODICIL_TEMPLATE_TEXT = `FIRST CODICIL TO MY LAST WILL AND TESTAMENT

I, [Full Name], son/daughter/wife of [Father's/Spouse's Name], aged [Age] years, residing at [Complete Home Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number], make this First Codicil on this [Day] of [Month], [Year] to update my Last Will dated [Date of Original Will].

BACKGROUND:
1. On [Date of Original Will], I signed my Last Will (the "Original Will"), which is [registered at the Sub-Registrar Office of [SRO Name] / executed on plain paper in front of two witnesses].
2. I now wish to make a few specific changes to that Will as explained below, while keeping everything else in my original Will exactly as it is.

1. DECLARATION OF SOUND MIND
I confirm that I am in good health and thinking clearly. I am making these changes entirely by my own choice, without anyone forcing, misleading, or pressuring me.

2. CHANGING MY EXECUTOR (MY TRUSTED MANAGER)
In my original Will, I named [Name of Old Executor] as my Executor.
I now cancel their appointment. In their place, I appoint [Name of New Executor], son/daughter of [Father's Name], residing at [Address], holding Aadhaar [Aadhaar Number], as the sole Executor of my Will and this Codicil.
If they are unable to act, I appoint [Name of Alternate Executor], residing at [Address], as my backup Executor.

3. ADDING OR UPDATING A SPECIFIC GIFT / ASSET
Since making my original Will, I have acquired new savings or wish to change how an asset is given.
I update that part of my Will as follows:
"I give my [Asset Description, e.g. Fixed Deposit No. [FD Number] with [Bank Name, Branch] / Demat Account No. [Demat Number] with [Broker]] completely and permanently to my [Relationship], [Full Name of Beneficiary], son/daughter/wife of [Name], residing at [Address], as their absolute property."

4. CONFIRMING EVERYTHING ELSE REMAINS THE SAME
Except for the specific changes written in this Codicil, I confirm that all other terms of my original Will dated [Date of Original Will] remain 100% active and unchanged. My original Will and this Codicil must be read together as one complete set of instructions.

SIGNED BY ME:
I, [Full Name], have signed this Codicil on [Day] of [Month], [Year] at [City/Town].

___________________________________
MY SIGNATURE / THUMB IMPRESSION
[Full Name]

WITNESS SIGNATURES (UNDER SECTION 63, INDIAN SUCCESSION ACT, 1925)
Signed by the above-named person as their First Codicil in our presence. Both of us were present together, watched them sign, and we are signing below in their presence. We confirm that neither of us, nor our spouses, receive any property or money under the original Will or this Codicil.

WITNESS 1:
Signature: ___________________________
Full Name: [Witness 1 Name]
Father's/Spouse's Name: [Name]
Age & Occupation: [Age / Occupation]
Home Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]

WITNESS 2:
Signature: ___________________________
Full Name: [Witness 2 Name]
Father's/Spouse's Name: [Name]
Age & Occupation: [Age / Occupation]
Home Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]`;

const CLAUSE_ANNOTATIONS = [
  {
    clause: "Reference to the Original Will",
    statute: "Section 2(b), Indian Succession Act, 1925",
    rationale:
      "Plain words: Clearly mentions the date and details of your original Will so anyone reading knows exactly which document is being updated.",
  },
  {
    clause: "Sound Mind Declaration",
    statute: "Section 59, Indian Succession Act, 1925",
    rationale:
      "Plain words: Confirms you are thinking clearly when making this change, so nobody can claim later that you were unwell or confused.",
  },
  {
    clause: "Canceling Only the Specific Clause",
    statute: "Section 62, Indian Succession Act, 1925",
    rationale:
      "Plain words: Pinpoints the exact clause being updated (like changing an executor) without disturbing the rest of your original Will.",
  },
  {
    clause: "Naming the New Person or Asset",
    statute: "Sections 82 & 83, Indian Succession Act, 1925",
    rationale:
      "Plain words: Clearly identifies the new beneficiary or updated bank account number so there is zero confusion.",
  },
  {
    clause: "Confirming the Rest of the Will",
    statute: "Section 64, Indian Succession Act, 1925",
    rationale:
      "Plain words: A vital legal sentence confirming that all other parts of your original Will remain 100% active and in full effect.",
  },
  {
    clause: "Two Independent Witnesses",
    statute: "Section 63(c), Indian Succession Act, 1925",
    rationale:
      "Plain words: Just like a Will, a Codicil MUST be signed in front of two adult independent witnesses who get nothing from the estate.",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "Accurate Original Will Details",
    subtext: "Mentions the exact date and details of the original Will you are updating.",
  },
  {
    id: "check-2",
    label: "You are Thinking Clearly (Sound Mind)",
    subtext: "You understand the changes and are making them of your own free choice (Section 59).",
  },
  {
    id: "check-3",
    label: "Specific Clause Numbers Named",
    subtext: "Clearly specifies which clause or person is being changed, avoiding vague wording.",
  },
  {
    id: "check-4",
    label: "Confirms Rest of the Will Stays Active",
    subtext: "Clearly states that all other parts of the original Will remain 100% valid.",
  },
  {
    id: "check-5",
    label: "Two Independent Witnesses",
    subtext: "Signed before two adults who receive nothing under the Will or Codicil (Section 67).",
  },
  {
    id: "check-6",
    label: "Plain Paper is 100% Legal",
    subtext: "Printed cleanly on normal white A4 paper. No stamp paper or stamp duty required.",
  },
];

const FAQS = [
  {
    q: "What is a Codicil in simple words?",
    a: "A Codicil is simply an official 'update note' or add-on to an existing Will. Instead of rewriting your entire Will from scratch, you attach a Codicil to make a small change—like updating an executor's name or adding a new bank fixed deposit.",
  },
  {
    q: "Do I need stamp paper for a Codicil in India?",
    a: "No. Under the Indian Stamp Act, 1899, both Wills and Codicils are completely exempt from stamp duty across India. You can execute a 100% legally binding Codicil on standard white A4 paper.",
  },
  {
    q: "How many witnesses are needed for a Codicil?",
    a: "You need at least two adult witnesses (above 18 years), just like a regular Will (Section 63). They must watch you sign, and then sign in front of you. They should not be people who receive property under the Will.",
  },
  {
    q: "Can I just cross out words with a pen on my original Will?",
    a: "Never do this! Under Section 71 of the Indian Succession Act, crossing out words, writing in the margins, or using white correction fluid on a signed Will has zero legal value. In fact, it makes courts and banks suspicious of tampering. Always make a clean Codicil instead.",
  },
  {
    q: "Can someone who gets property in my Will sign as a witness to the Codicil?",
    a: "No! Under Section 67 of the Indian Succession Act, if any beneficiary (or their spouse) signs as a witness, they completely lose their inheritance. Always choose independent friends, colleagues, or your family doctor.",
  },
  {
    q: "When should I make a Codicil vs making a fresh new Will?",
    a: "Use a Codicil for small, simple updates: changing an executor, adding a new bank account, or updating an address. If you want to make major changes to how your property is divided, or if you got married or divorced, it is much safer and cleaner to make a brand-new Will that replaces the old one.",
  },
  {
    q: "Does a Codicil need to be registered at the government office?",
    a: "Registration is optional. A Codicil on plain paper is legally valid. However, if your original Will was registered at the Sub-Registrar's office, it is good practice to register the Codicil there too so government records match.",
  },
  {
    q: "What happens if a Codicil conflicts with the original Will?",
    a: "The Codicil wins. Under Indian law, because the Codicil was made later, it represents your latest wishes. Whatever is updated in the Codicil overrides the older clause in the original Will, while everything else in the Will stays active.",
  },
  {
    q: "Can I have more than one Codicil?",
    a: "Yes, you can have a First Codicil, Second Codicil, etc. But having too many add-on papers can confuse family members and banks. If you find yourself making changes for the second or third time, it is much better to create a clean, single new Will.",
  },
  {
    q: "Does my existing executor handle the Codicil too?",
    a: "Yes. Unless your Codicil specifically changes the executor, the executor named in your original Will has full legal authority to carry out both the original Will and the Codicil together.",
  },
];

export default function CodicilFormatIndiaClient() {
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
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": false,
    "check-4": true,
    "check-5": true,
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
    navigator.clipboard.writeText(CODICIL_TEMPLATE_TEXT);
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
            <RefreshCw className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT &bull; WILL AMENDMENT TEMPLATE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Legally Valid Codicil Format in India to Amend a Will
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Download our free, clause-annotated Codicil format for Indian Wills. Learn Section 63 witness rules, compare Codicils versus new Wills, and modify your estate plan safely.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Amend or Update Your Will Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clause-annotated-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Free Codicil Format</span>
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
                Succession Expertise
              </span>
            </div>

            {/* Stat 2: Wills & Amendments Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Drafted
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Secured
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
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
                Governed by Section 2(b), Section 62 & Section 63 of the Indian Succession Act, 1925.
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
                  QUICK SUMMARY: 4 GOLDEN RULES FOR CHANGING A WILL
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                How to Legally Update Your Will in India
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>What is a Codicil?</strong> It is an official one-page add-on attached to your existing Will to make small updates without rewriting everything.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty:</strong> Just like a Will, a Codicil is 100% legal on plain white A4 paper. You do not need stamp paper.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Witnesses Required:</strong> Two adult witnesses must see you sign. Never let someone who receives property sign as a witness (Section 67).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Never Strike Out with a Pen:</strong> Crossing out words with a pen or using correction fluid on your original Will has zero legal value and makes courts suspicious (Section 71). Always use a separate Codicil.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: THE BASICS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. What is a Codicil and How Does It Work in India?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Life changes over time. You might open a new bank account, sell a plot, or realize that the executor you chose years ago has moved abroad or become unwell. In India, you do not need to rewrite your entire Will from scratch for minor updates.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 2(b) of the Indian Succession Act, 1925, a Codicil is simply a formal legal document that adds to, updates, or explains parts of your existing Will. Once signed, the law treats your original Will and your Codicil together as a single complete document.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">
                  Written on Plain White Paper
                </p>
                <p>
                  Under Schedule I of the Indian Stamp Act, 1899, a Codicil is completely exempt from stamp duty. You can type or write it on normal A4 white paper.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKLIST */}
            <section id="section-63-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 2: COMPLIANCE AUDIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Audit: Section 63 & 71 Validity Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before signing your Codicil, audit it against these six statutory checkpoints. Ensure your amendment complies with Section 63 and Section 71 of the Indian Succession Act.
              </p>

              {/* Checklist Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    Codicil Validity Audit Score: {checkedCount} / {CHECKLIST_ITEMS.length}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      isAllValid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "100% Legally Compliant" : "Pending Checkpoints"}
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
                      All criteria met. Your Codicil satisfies Section 63 and Section 71 execution standards.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Please review all criteria to prevent probate objections or statutory invalidation.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: CLAUSE-ANNOTATED CODICIL FORMAT */}
            <section id="clause-annotated-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 3: FREE DOWNLOADABLE FORMAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Clause-Annotated Codicil Format: Free Printable Template
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is a comprehensive Codicil format approved by succession advocates. It covers executor replacement, specific bequest modifications, and statutory republication. Copy it directly or print it for execution.
              </p>

              {/* Template Container with Copy & Print Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Standard Indian Codicil Template (Plain Paper Ready)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      title="Copy Codicil to clipboard"
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
                  {CODICIL_TEMPLATE_TEXT}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                  <span className="text-center sm:text-left">
                    Want this custom-filled and reviewed by an advocate in 15 minutes?
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Update Your Will Online</span>
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

            {/* SECTION 4: CODICIL VS NEW WILL MATRIX */}
            <section id="codicil-vs-new-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 4: DECISION MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Codicil or New Will: Comprehensive Decision Matrix
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Deciding between executing a Codicil and drafting an entirely new Will depends on the scope of changes and future litigation risk. Use this comparison table to choose the safest path.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[620px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Decision Parameter</th>
                      <th className="p-3.5 sm:p-4">When to Use a Codicil</th>
                      <th className="p-3.5 sm:p-4">When to Draft a New Will</th>
                      <th className="p-3.5 sm:p-4">Advocate Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Scope of Amendment</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Minor administrative updates</td>
                      <td className="p-3.5 text-slate-700 font-medium">Major estate redistribution</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">New Will for property shares</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Executor Changes</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Ideal (Replace single executor)</td>
                      <td className="p-3.5 text-slate-700 font-medium">Acceptable but unnecessary</td>
                      <td className="p-3.5 font-semibold text-emerald-700">Codicil is faster & simpler</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Life Events (Marriage/Divorce)</td>
                      <td className="p-3.5 text-rose-600 font-medium">Not recommended</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Essential requirement</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">Always draft fresh Will</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Prior Amendments Count</td>
                      <td className="p-3.5 text-emerald-700 font-medium">First amendment (0 prior codicils)</td>
                      <td className="p-3.5 text-emerald-700 font-medium">2 or more existing codicils</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">Avoid codicil spaghetti</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Probate Scrutiny Risk</td>
                      <td className="p-3.5 text-slate-600">Low if cleanly cross-referenced</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Lowest (Single clean document)</td>
                      <td className="p-3.5 font-semibold text-emerald-700">New Will avoids confusion</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Sub-Registrar Process</td>
                      <td className="p-3.5 text-slate-600">Register at same original SRO</td>
                      <td className="p-3.5 text-slate-700">Can register fresh anywhere</td>
                      <td className="p-3.5 font-semibold text-slate-800">Match original registration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: SECTION 71 WARNING */}
            <section id="section-71-pen-alterations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>SECTION 5: CRITICAL STATUTORY WARNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 71 Warning: Why Pen Alterations Invalidate a Will
              </h3>
              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-5 sm:p-6 space-y-3 text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>The Pen-and-Ink Trap Under Section 71 of the Indian Succession Act</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Many testators try to cross out lines with a pen. Some write notes in the margins or use white correction fluid. Never do this. Under Section 71 of the Indian Succession Act, handwritten marks made after signing have no legal effect.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Pen scribbles create grave suspicion in court. Judges may suspect tampering or fraud. This can tie your family in bitter court disputes. Always execute a clean, separate Codicil to change your Will.
                </p>
                <div className="pt-2 border-t border-amber-200 text-xs font-semibold text-amber-950 flex flex-wrap items-center gap-4">
                  <span>&bull; Never strike out text with a pen</span>
                  <span>&bull; Never use white-out or correction fluid</span>
                  <span>&bull; Always execute a separate Codicil</span>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>SECTION 6: VISUAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Visual Blueprint: Anatomy of an Indian Codicil Document
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                An enforceable Codicil follows an orderly statutory structure. Below is the blueprint showing how recitals, specific amendments, republication, and Section 63 witness attestation connect.
              </p>

              {/* Full width image card container */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/codicil-format-india-og.jpg"
                    alt="Visual Blueprint and Anatomy of a Valid Codicil to a Will in India"
                    width={1920}
                    height={1080}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: Standard structure and attestation of a Section 63 compliant Codicil
                  </span>
                  <Link
                    href="/images/codicil-format-india-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                <span>SECTION 7: EXECUTION WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Five Milestones to Execute a Codicil
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Executing a Codicil in India is straightforward when you follow these five sequential milestones.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Locate and Review Baseline Will",
                    desc: "Retrieve your original Will. Check its signing date and registration details. Note the exact clause numbers you want to change.",
                  },
                  {
                    step: "2",
                    title: "Draft Targeted Amendment Clauses",
                    desc: "Write down the exact clause to cancel. State the new replacement terms clearly. Do not touch clauses that remain unchanged.",
                  },
                  {
                    step: "3",
                    title: "Insert Mandatory Republication Clause",
                    desc: "Include a clear ratification clause. This confirms that all other terms of your original Will remain in full force.",
                  },
                  {
                    step: "4",
                    title: "Execute Before Two Independent Witnesses",
                    desc: "Sign each page in front of two adult witnesses under Section 63. Ensure neither witness is an heir or spouse of an heir.",
                  },
                  {
                    step: "5",
                    title: "Attach to Original Will & Store Securely",
                    desc: "Attach the signed Codicil securely to your original Will. Keep both documents in a safe place with your named executor.",
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

            {/* SECTION 8: THREE FATAL CODICIL MISTAKES */}
            <section id="three-fatal-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>SECTION 8: COMMON MISTAKES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Three Fatal Codicil Mistakes That Trigger Court Disputes
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Avoid these three common drafting and execution mistakes when amending an Indian Will.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Writing Directly on the Original Will
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crossing out words or writing in margins violates Section 71. Courts treat unexecuted pen marks as suspicious tampering. This can ruin your entire Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Allowing an Heir to Sign as Witness
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67, any bequest made to an attesting witness or their spouse becomes void. An heir who witnesses your Codicil legally forfeits their share.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Leaving Out Republication Clause
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You must explicitly ratify your original Will. Omitting this clause creates legal confusion about which terms remain operative in court.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: HOW CODICILS RELATE TO WILLS */}
            <section id="conflict-resolution-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 9: JUDICIAL INTERPRETATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. How a Codicil Relates to the Original Will in Court
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding how Indian courts interpret a Will and its Codicil together is essential for dispute-free estate administration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <GitCommit className="w-4 h-4 text-[#C65378]" />
                    <span>The Doctrine of Republication</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signing a valid Codicil republishes the original Will. The court reads both documents together as one single estate plan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <span>Rule of Later Testamentary Intent</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an amended clause in your Codicil conflicts with an old clause, the Codicil prevails. It reflects your most recent wishes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">
                  Probate Procedure When a Codicil Exists
                </p>
                <p>
                  In mandatory probate jurisdictions like Mumbai, Chennai, and Kolkata, submit both documents together. The court grants probate of the Will and Codicil as one unified document.
                </p>
              </div>
            </section>

            {/* SECTION 10: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SECTION 10: COMMON USE CASES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Specialized Scenarios for Codicils in India
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review these four common real-world scenarios where executing a Codicil is the ideal legal solution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Replacing an Executor</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If your executor passes away or moves abroad, use a Codicil. You can name a new executor without changing any property gifts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#5F7E75]" />
                    <span>Adding New Financial Assets</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When opening new fixed deposits or mutual funds, use a Codicil. You can assign these new holdings to your loved ones easily.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Calendar className="w-4 h-4 text-[#D29E0D]" />
                    <span>Updating a Married Name</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If a family member changes their surname after marriage, update it with a Codicil. This avoids delays during bank transmission.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Modifying Cash Legacies</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Adjust specific cash gifts to trusted staff or charities. This preserves your main family division of real estate.
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Verification: Powered by AMA Legal
              </h3>
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
                    <div className="font-extrabold text-slate-900 text-sm">18-Point Audit</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Legal Health Check</div>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Codicils & Will Amendments
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to common questions about executing, witnessing, and registering a Codicil in India.
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
              <h3 className="text-lg font-bold text-slate-900">
                Statutory Citations and Official Legal Resources
              </h3>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 2(b) (definition of codicil), Section 59 (testamentary capacity), Section 62 (revocability), Section 63 (two-witness attestation rules), Section 64 (incorporation of papers), Section 67 (bequest to witness void), and Section 71 (effect of obliteration or alteration).
                </li>
                <li>
                  <strong>Indian Stamp Act, 1899:</strong> Schedule I, Entry 64 (wills and codicils exempt from stamp duty).
                </li>
                <li>
                  <strong>Registration Act, 1908:</strong> Section 18(e) (optional registration of wills and codicils).
                </li>
                <li>
                  <strong>Supreme Court of India:</strong> Principles of testamentary construction and doctrine of republication in succession disputes.
                </li>
              </ul>

              <div className="pt-3 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Explore Related Free Templates & Guides:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Will Format in India (English) &rarr;
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
                    href="/services/will-registration"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Will Registration Service &rarr;
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Succession Calculator &rarr;
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
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </div>
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
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C65378] hover:underline"
                >
                  Connect on LinkedIn
                </a>
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
                Need to Amend or Update Your Will?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avoid drafting errors. Use our guided step-by-step wizard to create an advocate-verified, court-ready Will or Codicil in 15 minutes.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Draft Amendment Now</span>
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
                    <strong>Statutory Republication:</strong> Ratifies all unchanged original clauses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dispute Resistant:</strong> Prevents Section 71 pen scribble invalidation.
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
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Will Format in India (English)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Standard plain paper Will format &rarr;
                  </div>
                </Link>
                <Link
                  href="/templates/will-format-hindi"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">वसीयतनामा फॉर्मेट (Hindi)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Complete format in Devanagari &rarr;
                  </div>
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Notarized vs Registered Will</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Evidentiary weight comparison &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Calculate legal heir shares &rarr;
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
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Format in India
                </Link>
                <Link
                  href="/services/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
                <Link
                  href="/templates/living-will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Living Will Format
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
