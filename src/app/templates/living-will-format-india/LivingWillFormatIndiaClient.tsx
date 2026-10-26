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
  HeartPulse,
  Activity,
  Stethoscope,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "legal-framework-2023", label: "1. What is a Living Will? (2023 Rules)" },
  { id: "statutory-checklist", label: "2. Simple Legal Checklist" },
  { id: "clause-annotated-template", label: "3. Free Living Will Format (Explained)" },
  { id: "surrogate-decision-maker", label: "4. Choosing Your Healthcare Proxy" },
  { id: "visual-blueprint", label: "5. How It Works in Hospitals" },
  { id: "step-by-step-sop", label: "6. 6 Steps to Make Your Living Will" },
  { id: "three-diy-mistakes", label: "7. 3 Common Mistakes to Avoid" },
  { id: "comparison-matrix", label: "8. 2018 vs 2023: What Changed?" },
  { id: "procedural-timeline", label: "9. Hospital Review Process" },
  { id: "specialized-scenarios", label: "10. Dementia, Pain Relief & Organs" },
  { id: "institutional-backing", label: "11. Lawyer Verified & Trusted" },
  { id: "frequently-asked-questions", label: "12. Questions People Often Ask" },
  { id: "statutory-citations", label: "13. Official Legal References" },
];

const TEMPLATE_TEXT = `ADVANCE MEDICAL DIRECTIVE (LIVING WILL)
[Under Article 21 of the Constitution of India & Supreme Court Guidelines in Common Cause (2018 & 2023)]

I, [Full Name], son/daughter/wife of [Father's/Spouse's Name], aged [Age] years, residing at [Complete Home Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number], voluntarily make this Advance Medical Directive (Living Will).

1. DECLARATION OF SOUND MIND AND FREE WILL
I confirm that I am in good health and thinking clearly. I have thought about this deeply and am making this directive of my own free choice, without anyone pressuring, forcing, or misleading me.

2. MY CONSTITUTIONAL RIGHT TO DIGNITY
This document is made under my fundamental right to live and die with dignity guaranteed under Article 21 of the Constitution of India, as recognized by the Supreme Court of India in Common Cause (2018) and simplified by the Supreme Court order on 24 January 2023.

3. WHEN DOES THIS DIRECTIVE TAKE EFFECT?
This document shall be used ONLY if and when ALL of the following happen:
(a) I am unconscious or permanently unable to make or speak my healthcare choices, certified by doctors; AND
(b) I have a terminal illness, advanced incurable disease, permanent vegetative state (coma), or brain death with no realistic chance of recovery; AND
(c) The hospital's doctors confirm that further machines or treatments cannot cure me and only prolong the painful process of dying.

4. MEDICAL TREATMENTS I DO NOT WANT
In the hopeless medical circumstances described above, I direct my medical team as follows:
(a) CPR (Chest Compressions & Electric Shocks): Please do not restart my heart with electric shocks or aggressive chest compressions.
(b) Ventilator (Breathing Machine): Please do not put me on an invasive breathing machine (ventilator), or if I am already on one, please safely and peacefully remove it under proper pain relief.
(c) Artificial Tube Feeding: Please do not force food or liquids through surgical tubes if it only prolongs a painful, unconscious state.
(d) Kidney Dialysis & Artificial Life Support: Please do not continue dialysis or artificial organ machines merely to delay natural death.

5. PAIN RELIEF AND DIGNITY ARE COMPULSORY
Even though I am refusing machines that keep me alive artificially:
(a) I demand all necessary pain relief medicines, sedatives, and comfort care so that I remain completely peaceful and free from pain.
(b) Dignified end-of-life care, cleanliness, and physical comfort must be provided at all times until I pass away naturally.

6. MY TRUSTED HEALTHCARE PROXY (DECISION-MAKER)
To make sure my wishes are respected when I cannot speak for myself, I appoint the following trusted family members/friends:

PRIMARY PROXY:
Name: [Full Name of Primary Proxy]
Relationship: [Relationship, e.g., Spouse / Son / Daughter]
Address: [Complete Address]
Phone: [Phone Number] | Email: [Email Address]
Aadhaar / ID No.: [ID Number]

BACKUP PROXY (if Primary is unavailable or unwell):
Name: [Full Name of Backup Proxy]
Relationship: [Relationship]
Address: [Complete Address]
Phone: [Phone Number] | Email: [Email Address]
Aadhaar / ID No.: [ID Number]

I authorize them to speak with my doctors, review my medical records, and ensure my wishes in this Living Will are respected.

7. ORGAN DONATION PREFERENCES (OPTIONAL)
[Select one option:]
[ ] Upon brain death, I gladly donate my viable organs and tissues to save the lives of others.
[ ] I do not consent to organ donation.

8. I CAN CANCEL THIS AT ANY TIME
I keep the full right to cancel or update this Living Will at any time while I am healthy and thinking clearly.

SIGNED BY ME:
I, [Full Name], have signed this Advance Medical Directive on [Day] of [Month], [Year] at [City/Town].

___________________________________
MY SIGNATURE / THUMB IMPRESSION
[Full Name]

WITNESS SIGNATURES (TWO INDEPENDENT ADULTS)
We declare that the person named above signed this Living Will in our presence while thinking clearly. Neither of us is named as a healthcare proxy in this document.

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
Phone / Aadhaar No.: [ID Number]

NOTARY PUBLIC / GAZETTED OFFICER ATTESTATION
[As permitted under Supreme Court of India Order Dated 24 January 2023]

Before me, [Name of Notary Public / Gazetted Officer], at [City/Place], on [Date], appeared [Full Name of Declarant], who signed this document voluntarily in my presence.

Signature & Official Seal: ___________________________
Registration Number: [Reg Number]
Date & Place: [Date, City]`;

const CLAUSE_ANNOTATIONS = [
  {
    clause: "Sound Mind Declaration",
    statute: "Article 21 & Supreme Court 2018",
    rationale:
      "Plain words: Confirms you are thinking clearly when making these healthcare choices. This stops anyone from claiming later that you were confused or pressured.",
  },
  {
    clause: "When It Takes Effect",
    statute: "Supreme Court Guidelines (2023)",
    rationale:
      "Plain words: Protects you completely. Treatment is only stopped if you are unconscious, doctors agree recovery is impossible, and machines would only prolong suffering.",
  },
  {
    clause: "Refusing Ventilators & CPR",
    statute: "Medical Guidelines & Supreme Court",
    rationale:
      "Plain words: Clearly names ventilators and chest compressions so doctors have exact legal permission not to put you on painful artificial machines when death is near.",
  },
  {
    clause: "Naming a Trusted Proxy & Backup",
    statute: "Healthcare Power of Attorney Principle",
    rationale:
      "Plain words: You pick a family member to speak for you with doctors. Naming a backup ensures someone is always there if your first choice is unwell or far away.",
  },
  {
    clause: "Pain Relief is Guaranteed",
    statute: "Right to Pain-Free Care under Article 21",
    rationale:
      "Plain words: Guarantees that even if you refuse machines, doctors MUST give you full pain medicines, sedatives, and gentle care so you feel zero discomfort.",
  },
  {
    clause: "Signed by Notary or Gazetted Officer",
    statute: "Supreme Court Order (January 2023)",
    rationale:
      "Plain words: The big 2023 relief! You no longer need to visit a judicial magistrate. Any registered Notary or government Gazetted Officer can sign and stamp it.",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "You are 18+ and Thinking Clearly",
    subtext: "You understand your choices and are making this document of your own free choice.",
  },
  {
    id: "check-2",
    label: "Clear Medical Instructions",
    subtext: "Clearly specifies your wishes regarding ventilators, CPR, and feeding tubes.",
  },
  {
    id: "check-3",
    label: "Healthcare Proxy & Backup Appointed",
    subtext: "You named a trusted person (and an alternate) to represent you before doctors.",
  },
  {
    id: "check-4",
    label: "Two Independent Witnesses",
    subtext: "Signed before two adults who are not appointed as your healthcare proxy.",
  },
  {
    id: "check-5",
    label: "Stamped by Notary or Gazetted Officer",
    subtext: "Certified by any local Notary Public or Gazetted Officer (no court visit needed).",
  },
  {
    id: "check-6",
    label: "Copies Shared with Family & Doctor",
    subtext: "Gave a copy to your proxy, your family doctor, and saved it on your phone or ABHA.",
  },
];

const FAQS = [
  {
    q: "Is a Living Will legally valid in India?",
    a: "Yes, 100%. The Supreme Court of India confirmed in 2018 and January 2023 that every citizen has a constitutional right under Article 21 to die with dignity. When you make a Living Will following Supreme Court rules, all hospitals and doctors across India are legally bound to follow your wishes.",
  },
  {
    q: "Do I still need to visit a court or magistrate to make a Living Will?",
    a: "No! Under the old 2018 rules, people had to visit a Judicial Magistrate court, which caused huge delays. On 24 January 2023, the Supreme Court removed that rule. Today, you only need two witnesses and a simple stamp from any local Notary Public or Gazetted Officer.",
  },
  {
    q: "Do I need stamp paper for a Living Will?",
    a: "No stamp paper is needed. Under the Indian Stamp Act, 1899, stamp duty only applies to buying property or commercial agreements. Personal health directives like a Living Will carry zero stamp duty and can be printed on normal white A4 paper.",
  },
  {
    q: "Who can be my two witnesses?",
    a: "Any two adults above 18 years who are thinking clearly. They can be trusted friends, neighbours, or colleagues. Just make sure you do not pick the same person you named as your healthcare proxy.",
  },
  {
    q: "What does my healthcare proxy (trusted person) do?",
    a: "If you ever become unconscious or unable to speak, your healthcare proxy shows your Living Will to the hospital, discusses your care with doctors, and makes sure your medical team honors your wishes.",
  },
  {
    q: "Does a Living Will mean doctors will stop treating treatable illnesses?",
    a: "No, never! A Living Will only takes effect if you have a terminal illness or permanent coma with zero hope of recovery, as certified by hospital medical boards. If you have a curable infection, fracture, or pneumonia, doctors will treat you with full care.",
  },
  {
    q: "Can I change or cancel my Living Will later?",
    a: "Yes, at any time. As long as you are healthy and thinking clearly, you can cancel your Living Will simply by writing a note or making a fresh one.",
  },
  {
    q: "How is a Living Will different from a regular property Will?",
    a: "A regular Will deals with who gets your flat, money, and assets after your death. A Living Will (Advance Medical Directive) deals with your medical treatment choices while you are alive but unconscious. Everyone should have both.",
  },
  {
    q: "Does a Living Will allow active euthanasia (lethal injections) in India?",
    a: "No, absolutely not. Indian law only allows passive euthanasia—meaning stopping artificial machines when recovery is impossible and death is natural and inevitable. Giving any lethal injection or active drug to cause death is completely illegal under Indian criminal law.",
  },
  {
    q: "Where should I keep copies of my Living Will?",
    a: "Keep the original safely at home. Give a signed copy to your healthcare proxy and your family doctor so they have it immediately during an emergency. You can also save a photo/PDF on your phone or link it to your Ayushman Bharat Health Account (ABHA).",
  },
];

export default function LivingWillFormatIndiaClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-framework-2023");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": true,
    "check-4": false,
    "check-5": true,
    "check-6": false,
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
        {/* Decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <HeartPulse className="w-4 h-4 text-[#C65378]" />
            <span>ARTICLE 21 &bull; ADVANCE MEDICAL DIRECTIVE TEMPLATE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Living Will Format in India: Advance Medical Directive
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Download our free, advocate-drafted Living Will format updated for the January 2023 Supreme Court order. Learn notary attestation rules, medical board procedures, and protect your dignity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft Your Will & Directive in 15 Min</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clause-annotated-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Free Format Below</span>
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

            {/* Stat 2: Wills & Directives Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Cases Handled
              </span>
            </div>

            {/* Stat 3: Supreme Court Compliance */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                2023 Rules
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                SC Order Verified
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
                <span>Constitutional Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Drafted under Article 21 of the Indian Constitution & Supreme Court Order in Common Cause (M.A. 1699/2019).
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
                  QUICK SUMMARY: 4 ESSENTIAL RULES OF A LIVING WILL IN INDIA
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What Every Indian Family Should Know About Living Wills
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Legal Right to Dignity:</strong> The Supreme Court of India has confirmed that you have a fundamental right under Article 21 to die with dignity, free from unwanted machines when recovery is impossible.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>No Court Visits Needed (2023 Order):</strong> You do not need to go to a magistrate court anymore. Any local Notary Public or Gazetted Officer can verify and stamp your Living Will.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Witnesses Required:</strong> Sign it in front of two adult witnesses who see you sign and sign in front of you.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Appoint a Healthcare Proxy:</strong> Name a trusted family member or friend who can speak with doctors and ensure your medical choices are followed in the hospital.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: LEGAL FRAMEWORK & SC 2023 GUIDELINES */}
            <section id="legal-framework-2023" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: THE BASICS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. What is a Living Will and Is It Legal in India?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A Living Will (also called an Advance Medical Directive) is a legal document where you state your medical treatment choices in advance. If you ever become critically ill, slip into an irreversible coma, or are kept alive only on artificial machines with zero hope of recovery, this document tells doctors what you want.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                In a landmark ruling, the Supreme Court of India declared that every citizen has a constitutional right to live and die with dignity under Article 21. You have the right to refuse painful, artificial life-support machines if death is natural and unavoidable.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">
                  How the Supreme Court Simplified the Process in 2023
                </p>
                <p>
                  Recognizing these bottlenecks, on 24 January 2023, a Constitution Bench headed by Justice K.M. Joseph simplified the entire procedure. Citizens no longer need to approach a magistrate to execute a Living Will. Attestation by a practicing Notary Public or Gazetted Officer is now sufficient, making the process fast, accessible, and practical.
                </p>
              </div>
            </section>

            {/* SECTION 2: STATUTORY CHECKLIST */}
            <section id="statutory-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 2: COMPLIANCE AUDIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Statutory Checklist: Advance Medical Directive Validity
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before printing your Living Will, review these statutory essentials. Check each item to confirm that your document adheres to current Indian legal standards.
              </p>

              {/* Checklist Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    Directive Compliance Score: {checkedCount} / {CHECKLIST_ITEMS.length}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      isAllValid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "100% Legally Compliant" : "Review Pending Items"}
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
                      Excellent. Your Advance Medical Directive satisfies all statutory criteria laid down by the Supreme Court of India.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Please check the remaining points to guarantee your directive is enforceable in Indian hospitals without delay.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: CLAUSE-ANNOTATED LIVING WILL FORMAT */}
            <section id="clause-annotated-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 3: FREE DOWNLOADABLE TEMPLATE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Clause-Annotated Living Will Format for India
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is a comprehensive, advocate-approved Living Will template aligned with the 2023 Supreme Court guidelines. You can copy the text or print it directly on standard paper.
              </p>

              {/* Template Container with Copy & Print Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Advance Medical Directive (Updated for 2023 SC Order)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                      title="Print template"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50/50 max-h-[520px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all border-b border-slate-200">
                  {TEMPLATE_TEXT}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                  <span className="text-center sm:text-left">
                    Need a comprehensive estate plan covering both your Living Will and property Will?
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Create Full Estate Plan Online</span>
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

            {/* SECTION 4: SURROGATE HEALTHCARE DECISION-MAKER */}
            <section id="surrogate-decision-maker" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>SECTION 4: SURROGATE DECISION-MAKER</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Surrogate Healthcare Decision-Maker Legal Rules
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A Living Will cannot enforce itself. When a patient falls into a coma or persistent vegetative state, someone must physically deliver the document to the hospital administration and advocate for the patient. This role is performed by the <strong>Surrogate Decision-Maker</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Primary Surrogate Authority</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The primary surrogate is typically a spouse, adult child, or trusted companion. They possess the legal authority to give written consent for withholding or withdrawing futile treatment and to review medical charts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Alternate Surrogate Protection</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Always nominate an alternate surrogate. If your primary surrogate is traveling, emotionally overwhelmed, or predeceased, the alternate can step in without requiring emergency court orders.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Stethoscope className="w-4 h-4 text-[#D29E0D]" />
                    <span>Hospital Medical Board Coordination</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The surrogate liaises directly with the hospital&apos;s Primary Medical Board and Secondary Medical Board, ensuring that the patient&apos;s written wishes are not overridden by well-meaning but detached relatives.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Protection Against Financial Exploitation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Surrogate powers are strictly confined to medical choices. The surrogate holds zero authority over bank accounts or real estate, protecting the declarant from property fraud.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Activity className="w-4 h-4" />
                <span>SECTION 5: VISUAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Visual Blueprint: Living Will Execution & Review SOP
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Executing and activating an Advance Medical Directive involves a two-phase protocol. The diagram below illustrates the complete statutory workflow under the 2023 Supreme Court guidelines.
              </p>

              {/* Responsive Container for Blueprint Image */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/living-will-process-infographic.svg"
                    alt="Visual Blueprint and SOP for Advance Medical Directive in India under 2023 Supreme Court Order"
                    width={1200}
                    height={720}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: Supreme Court of India 2023 procedure for Living Will execution and hospital panels
                  </span>
                  <Link
                    href="/images/living-will-process-infographic.svg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution SVG</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6: NUMBERED STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                <span>SECTION 6: EXECUTION WORKFLOW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Step-by-Step SOP: Six Stages from Drafting to Activation
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Executing an Advance Medical Directive does not require complex litigation. Follow these six progressive milestones to ensure your directive is legally water-tight.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Drafting the Directive and Specific Treatment Limits",
                    desc: "Express your clear personal preferences regarding invasive ventilation, CPR, artificial nutrition, and pain relief. Use precise legal and medical terms.",
                  },
                  {
                    step: "2",
                    title: "Appointing Primary and Alternate Surrogates",
                    desc: "Designate two responsible individuals who understand your values and can represent your interests before doctors when you cannot communicate.",
                  },
                  {
                    step: "3",
                    title: "Execution in Presence of Two Independent Witnesses",
                    desc: "Sign or place your mark on every page in the direct physical presence of two independent adults who attest to your voluntary capacity.",
                  },
                  {
                    step: "4",
                    title: "Attestation by a Notary Public or Gazetted Officer",
                    desc: "Appear before a practicing Notary Public or Gazetted Officer. They record their official satisfaction that execution was voluntary. No JMFC visit needed.",
                  },
                  {
                    step: "5",
                    title: "Deposit Copies with Custodians and Family Doctor",
                    desc: "Give certified copies to your surrogates and family doctor. Deposit a copy with the local municipal authority or integrate it into your ABHA digital health record.",
                  },
                  {
                    step: "6",
                    title: "Hospital Medical Boards and JMFC Intimation",
                    desc: "When terminal illness occurs, the hospital convenes a Primary and Secondary Medical Board (within 48 hours each). The JMFC is informed, and dignified care is provided.",
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

            {/* SECTION 7: THREE CRITICAL DIY MISTAKES */}
            <section id="three-diy-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>SECTION 7: COMMON MISTAKES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Three Critical DIY Mistakes in Indian Living Wills
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Because living wills are relatively new in India, drafting errors are frequent. Avoid these three fatal pitfalls when creating your document.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Following Outdated 2018 Magistrate Rules
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Many outdated online templates still state that a Judicial Magistrate must countersign the directive. Following this obsolete procedure leads to wasted time and court rejections.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Mixing Medical Directives with Property Wills
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Never combine your Advance Medical Directive and your property distribution into a single document. Property wills only take effect post-mortem, while living wills operate during life.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Keeping the Directive Secret from Family & Doctor
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Living Will locked in a secret bank locker is useless in an emergency ICU admission. Your surrogate and family physician must hold certified copies ready for immediate presentation.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARATIVE MATRIX TABLE */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 8: STATUTORY COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparative Matrix: 2018 Judgment vs 2023 Modified Rules
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Examine the profound differences between the original 2018 guidelines and the 2023 Supreme Court modifications that made living wills genuinely accessible.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[620px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Procedural Element</th>
                      <th className="p-3.5 sm:p-4">2018 Supreme Court Guidelines</th>
                      <th className="p-3.5 sm:p-4 text-rose-200">2023 Modified Rules (Current Law)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Execution & Attestation</td>
                      <td className="p-3.5 text-rose-700">Compulsory countersigning by JMFC</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Attestation by Notary or Gazetted Officer</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Hospital Primary Board</td>
                      <td className="p-3.5">Treating doctor + 3 specialists (20+ yrs)</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Treating doctor + 2 specialists (5+ yrs)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Secondary Medical Board</td>
                      <td className="p-3.5 text-rose-700">Formed by District Collector (caused weeks of delay)</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Formed directly by Hospital with CMO nominee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Board Turnaround Time</td>
                      <td className="p-3.5">No specific strict deadline defined</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Decisions mandated within 48 hours each</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Magistrate Approval Role</td>
                      <td className="p-3.5 text-rose-700">JMFC had to visit hospital & approve withdrawal</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">JMFC only intimated; no physical visit or sign-off needed</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Digital Registry Custody</td>
                      <td className="p-3.5">Physical custody with District Court registry</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">Local municipal records & digital health accounts (ABHA)</td>
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
                9. Procedural Timeline: Primary and Secondary Medical Boards
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding the hospital activation timeline gives peace of mind that a patient will not be left to suffer prolonged invasive procedures against their will.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[550px]">
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Action Item</th>
                      <th className="p-3">Statutory Panel</th>
                      <th className="p-3">Mandated Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 1</td>
                      <td className="p-3">Patient Incapacity & Directive Presentation</td>
                      <td className="p-3">Treating Physician & Surrogate</td>
                      <td className="p-3 text-emerald-600 font-bold">Immediate (Day 0)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 2</td>
                      <td className="p-3">Primary Medical Board Examination</td>
                      <td className="p-3 font-mono text-xs">Treating Doctor + 2 Specialists</td>
                      <td className="p-3 font-semibold">Within 48 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 3</td>
                      <td className="p-3">Secondary Medical Board Concurrence</td>
                      <td className="p-3 font-mono text-xs">CMO Nominee + 2 Specialists</td>
                      <td className="p-3 font-semibold">Within 48 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 4</td>
                      <td className="p-3">Intimation Sent to Judicial Magistrate</td>
                      <td className="p-3 font-mono text-xs">Jurisdictional JMFC</td>
                      <td className="p-3">Same Day (Information Only)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Stage 5</td>
                      <td className="p-3">Palliative Care & Withdrawal of Futile Support</td>
                      <td className="p-3">Hospital Palliative Care Unit</td>
                      <td className="p-3 text-emerald-600 font-bold">Continuous Comfort</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SECTION 10: COMPLEX SCENARIOS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Specialized Scenarios: Dementia, Palliative Care & Organs
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Advance care planning often intersects with specific medical and legal dilemmas. Review these four specialized scenarios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <HeartPulse className="w-4 h-4 text-[#C65378]" />
                    <span>Living Will vs Regular Property Will</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A property Will governs who inherits your assets after death. A Living Will protects your bodily autonomy while alive. Both are vital components of a complete estate plan.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <span>Early-Stage Dementia & Alzheimer&apos;s</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Living Will must be executed while you are mentally sound. Individuals in early stages of cognitive decline should execute their directive immediately, alongside a doctor&apos;s fitness certificate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Stethoscope className="w-4 h-4 text-[#D29E0D]" />
                    <span>Palliative Care vs Passive Euthanasia</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Withdrawing life support does not mean abandoning the patient. Palliative care continues vigorously, ensuring adequate pain relief, oxygen for ease of breathing, and total dignity.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Organ Donation Synchronization</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You can include organ donation wishes directly in your Advance Medical Directive. This allows medical teams to harvest viable organs for life-saving transplants following brain death declaration.
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
                      India&apos;s Dedicated Estate Planning & Healthcare Directive Portal
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAF7F0] border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>In Collaboration with</span>
                    <strong className="text-slate-900">AMA Legal Solutions</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every legal template, clause annotation, and workflow on WillDrafting.in is designed and verified by senior succession advocates from AMA Legal Solutions. We ensure strict compliance with constitutional precedents, the Indian Succession Act, and the latest Supreme Court modified guidelines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">2023 SC Compliance</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Simplified Notary Rules</div>
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
                Frequently Asked Questions: Living Wills in India
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to common questions about executing, witnessing, and enforcing an Advance Medical Directive in India.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer"
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
                Statutory Citations: Supreme Court Orders and Article 21
              </h2>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Constitution of India:</strong> Article 21 (Fundamental right to life, bodily autonomy, and human dignity).
                </li>
                <li>
                  <strong>Supreme Court of India:</strong> <em>Common Cause (A Regd. Society) v. Union of India (2018) 5 SCC 1</em> (Constitution Bench recognized validity of Living Wills and passive euthanasia).
                </li>
                <li>
                  <strong>Supreme Court of India (Order dated 24 January 2023):</strong> <em>Miscellaneous Application No. 1699 of 2019 in Writ Petition (Civil) No. 215 of 2005</em> (Simplified procedure, substituted JMFC with Notary/Gazetted Officer attestation, expedited hospital medical boards).
                </li>
                <li>
                  <strong>National Health Authority (NHA):</strong> Guidelines for electronic storage of Advance Directives under Ayushman Bharat Digital Mission (ABDM / ABHA).
                </li>
              </ul>

              <div className="pt-3 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Explore Related Free Templates & Guides:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Will Format in India (Property & Assets) &rarr;
                  </Link>
                  <Link
                    href="/templates/will-format-hindi"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    वसीयतनामा फॉर्मेट (Hindi Will Format) &rarr;
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
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 18+ years of expertise in succession planning, advance directives, and constitutional rights at AMA Legal Solutions.
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
                Protect Your Family & Bodily Dignity Today
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Draft your legally compliant Will and Advance Medical Directive with advocate verification in just 15 minutes.
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
                    <strong>2023 SC Order Compliant:</strong> Notary attestation without court delays.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty:</strong> Valid on plain paper across all Indian states.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Surrogate Protections:</strong> Clear healthcare attorney nomination.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Palliative Safeguards:</strong> Continuous pain relief guaranteed.
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
                  <div className="font-bold text-xs text-slate-900">Will Format in India</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Plain paper format for property & assets &rarr;
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
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Format in India
                </Link>
                <Link
                  href="/templates/codicil-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Codicil Format India
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Preparation Checklist
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Share Calculator
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
