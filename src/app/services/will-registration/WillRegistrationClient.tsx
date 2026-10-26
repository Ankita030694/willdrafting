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
  Check,
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
  FileCheck,
  MapPin,
  Home,
  Users,
  Building2,
  Stamp,
  Fingerprint,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Is Will Registration Compulsory in India?" },
  { id: "registered-vs-unregistered", label: "2. Registered vs Unregistered Wills (Key Differences)" },
  { id: "section-31-home-visit", label: "3. Home Registration for Seniors & Bedridden Persons" },
  { id: "documents-checklist", label: "4. Documents Needed at the Registrar's Office" },
  { id: "visual-blueprint", label: "5. Visual Guide to Will Registration" },
  { id: "step-by-step-sop", label: "6. Step-by-Step Guide to Registering Your Will" },
  { id: "strategic-defense", label: "7. When is Will Registration Strongly Recommended?" },
  { id: "state-by-state-guide", label: "8. State Government Fees & Online Portals" },
  { id: "procedural-timeline", label: "9. Expected Registration Timelines" },
  { id: "specialized-scenarios", label: "10. Special Situations: Seniors & Overseas NRIs" },
  { id: "service-pricing", label: "11. Service Plans & Transparent Fees" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Relevant Laws & Official Portals" },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "Two Printed Copies of Your Will",
    subtext: "Printed cleanly on standard white A4 sheets. No expensive stamp paper is required by law.",
  },
  {
    id: "check-2",
    label: "Original Aadhaar & PAN Card (Yours)",
    subtext: "Government photo identity proof for official biometric and fingerprint verification at the registrar's office.",
  },
  {
    id: "check-3",
    label: "Two Independent Witnesses with Original IDs",
    subtext: "Adult friends or neighbors who are not receiving any property or money under the Will (Section 67).",
  },
  {
    id: "check-4",
    label: "Passport-Sized Photographs for Everyone",
    subtext: "Two recent passport-sized color photos each for you and both of your attesting witnesses.",
  },
  {
    id: "check-5",
    label: "Doctor's Mental Fitness Certificate",
    subtext: "Recommended for seniors aged 60 and above to prove sound mind and prevent false claims later.",
  },
  {
    id: "check-6",
    label: "Sub-Registrar Appointment Receipt & Challan",
    subtext: "Online appointment confirmation slip and fee payment receipt from your state government registration portal.",
  },
];

const FAQS = [
  {
    q: "Is Will registration mandatory under Indian law?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registering a Will is completely optional. A Will written on plain white paper and signed in front of two witnesses is 100% legally valid (Section 63, Indian Succession Act). However, registering your Will at the Sub-Registrar Office provides undeniable government proof that you personally signed it while in sound health, making it almost impossible for anyone to falsely claim forgery later.",
  },
  {
    q: "How much does it cost to register a Will with the government?",
    a: "Unlike buying a house which attracts heavy 5% to 7% stamp duty, Wills are 100% exempt from stamp duty across India under the Indian Stamp Act, 1899. Government registration fees are nominal, usually between ₹100 and ₹500 depending on your state (for example, just ₹100 in Maharashtra and Delhi).",
  },
  {
    q: "Can a government officer visit my home to register a senior citizen's Will?",
    a: "Yes! Under Section 31 of the Registration Act, 1908, if someone is elderly, sick, or cannot easily travel, the Sub-Registrar can personally visit their home or hospital room to complete registration. You simply submit a doctor's certificate and pay a small official home-visit fee. AMA Legal Solutions assists in organizing this entire doorstep visit.",
  },
  {
    q: "Who can be witnesses for registering my Will?",
    a: "You need two adult witnesses with original government ID proofs (such as Aadhaar or PAN card). CRITICAL: Under Section 67 of the Indian Succession Act, neither witness nor their spouse can receive any gift or property under the Will. If an heir signs as a witness, their inheritance becomes void.",
  },
  {
    q: "What documents must I take on registration day?",
    a: "Bring two printed copies of your Will on plain A4 paper, original Aadhaar and PAN cards for yourself and both witnesses, two passport-size photographs of each person, photocopies of your property registry papers, and a doctor's mental fitness certificate (if you are a senior citizen).",
  },
  {
    q: "Can other relatives or the public read my registered Will while I am alive?",
    a: "No. Under Section 57(2) of the Registration Act, 1908, Wills are stored in a special confidential government book called 'Book 3'. No one—not even your children, spouse, or relatives—can read, view, or obtain a copy of your registered Will during your lifetime without your written consent.",
  },
  {
    q: "Can someone still challenge a registered Will in court?",
    a: "Anyone can file a lawsuit, but challenging a registered Will is extremely difficult. Under Section 114 of the Indian Evidence Act (now Bharatiya Sakshya Adhiniyam, 2023), courts presume that government officers performed their duties properly. The challenger must present solid evidence of fraud or mental incapacity to overturn a registered Will.",
  },
  {
    q: "Can I change or cancel my registered Will later?",
    a: "Yes! A Will only takes effect after your death. As long as you are alive and of sound mind, you can change or cancel your Will at any time (Section 62, Indian Succession Act). You can write a short amendment (a Codicil) or execute a completely new Will that revokes the earlier one.",
  },
  {
    q: "Can an NRI register a Will without visiting India?",
    a: "To register a Will in India, the person must appear in person before the Sub-Registrar (a Power of Attorney cannot register a Will on your behalf). However, an NRI does not need to rush to India just for this: you can safely draft and sign a plain-paper Will in your country of residence before two witnesses under Section 63, and register it during your next trip to India if you wish.",
  },
  {
    q: "What happens if the original registered Will is lost?",
    a: "If the original paper is lost or damaged, your executor can simply apply for an official certified copy from the Sub-Registrar Office where it was registered. Under Section 76 of the Evidence Act, this government-certified copy has full legal authority and is accepted by courts, banks, and municipal offices.",
  },
];

export default function WillRegistrationClient() {
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
            <Stamp className="w-4 h-4 text-[#C65378]" />
            <span>SUB-REGISTRAR OFFICE (SRO) &bull; SECTION 31 DOORSTEP VISITS</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Will Registration Service in India: SRO Process &amp; Home Visits
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Secure done-for-you Will registration across Indian Sub-Registrar Offices. We manage SRO appointment booking, witness vetting, Section 31 private residence visits for senior citizens, and certified copy delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Book Will Registration Service</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#state-by-state-guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View State SRO Fees &amp; Portals</span>
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
                Succession Practice
              </span>
            </div>

            {/* Stat 2: Wills Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Registered
              </span>
            </div>

            {/* Stat 3: Value Secured */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estates Protected
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
                Governed under Sections 18, 31, 40 &amp; 41 of the Registration Act, 1908 and Section 63 of the Indian Succession Act, 1925.
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
                  EXECUTIVE BRIEF: WILL REGISTRATION IN INDIA
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Core Rules for Registering a Will at the Sub-Registrar Office
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Optional Under Law:</strong> Section 18(e) of the Registration Act, 1908 makes Will registration optional. Unregistered plain-paper Wills are valid under Section 63 of the Indian Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Ad-Valorem Stamp Duty:</strong> Wills are completely exempt from stamp duty across India. Only nominal government registration charges apply (typically ₹100 to ₹500).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 31 Doorstep Visits:</strong> Elderly, infirm, or bedridden testators can have the Sub-Registrar visit their private residence upon medical certification.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Confidential Book 3 Protection:</strong> Wills are recorded in Book 3. These government records remain private during your life, preventing curious relatives from snooping.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>LEGAL JURISDICTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Statutory Framework: Will Registration Under 1908 Act
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Indian law gives you full control over your wealth. You can write your Will on plain paper. Section 18 of the Registration Act makes Will registration optional. A Will signed before two witnesses is fully valid in court. However, registering your Will turns it into an official public record.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                During registration, you visit the Sub-Registrar. The officer checks your identity cards. They speak with your two witnesses. The officer checks that you sign freely and in good health. Under Section 114 of the Evidence Act, courts accept official government acts as genuine.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The Supreme Court backed this rule in the Pentakota case. The court held that a registrar seal proves real signing. Registration does not stop all lawsuits. But it places a heavy burden on anyone who tries to fight your Will.
              </p>
            </section>

            {/* SECTION 2: REGISTERED VS UNREGISTERED WILLS MATRIX */}
            <section id="registered-vs-unregistered" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Registered vs Unregistered Wills: Legal Protection Matrix
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many people ask if they should register their Will. Both registered and plain paper Wills are valid in India. But a registered Will gives stronger protection to your heirs. Review the table below to compare your choices.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="py-3 px-4 font-bold">Legal Parameter</th>
                        <th className="py-3 px-4 font-bold">Unregistered Plain Will</th>
                        <th className="py-3 px-4 font-bold">Notarized Will</th>
                        <th className="py-3 px-4 font-bold">SRO Registered Will</th>
                        <th className="py-3 px-4 font-bold">Strategic Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Legal Validity</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Valid (Section 63 ISA)</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Valid (Section 63 ISA)</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Valid (SRO Authenticated)</td>
                        <td className="py-3 px-4 text-slate-600">All three forms are legally recognized in India.</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">Evidentiary Presumption</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">Zero Presumption</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">Weak (Affidavit Only)</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Strong (Section 114 BSA)</td>
                        <td className="py-3 px-4 text-slate-600">SRO endorsement creates a legal presumption of due execution.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Posthumous Loss Recovery</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">Impossible if Lost</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">Rarely Traceable</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Certified Copy Available</td>
                        <td className="py-3 px-4 text-slate-600">Sub-Registrar archives allow certified copy retrieval anytime.</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">Capacity &amp; Forgery Defense</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">Vulnerable to Claims</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">Moderate Defense</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Formidable Defense</td>
                        <td className="py-3 px-4 text-slate-600">Live photograph and thumb impressions defeat forgery claims.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Bank &amp; Mutation Speed</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">Requires Affidavits</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">Moderate Acceptance</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Fast Institutional Acceptance</td>
                        <td className="py-3 px-4 text-slate-600">Revenue officers process municipal mutation faster with SRO copies.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: SECTION 31 HOME VISITS */}
            <section id="section-31-home-visit" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4 text-[#C65378]" />
                <span>SENIOR CITIZEN ACCESS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Section 31 Home Visit: Registration for Senior Citizens
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many senior citizens want to register their Will. But visiting a busy office can harm their health. Stairs and crowds cause real stress. Section 31 of the Registration Act solves this through home visits.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under Section 31, the registrar comes to your home or hospital room. You only need to show a valid medical reason. Old age, illness, or disability all qualify. You attach a doctor note showing you cannot travel safely.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The state charges a small fee for home visits. The officer brings official books to your home. They check your ID and record your thumb prints at your bedside. Our legal team prepares the medical forms and books the officer visit for you.
              </p>
            </section>

            {/* SECTION 4: DOCUMENTS CHECKLIST */}
            <section id="documents-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>PRE-APPOINTMENT AUDIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Essential Documents Checklist for SRO Will Registration
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Going to the registry office without the right papers wastes time. Missing papers cause delays. Use this checklist to ensure your documents are ready before your registration date.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Registration Day Readiness: {checkedCount} of {CHECKLIST_ITEMS.length} Completed
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      isAllValid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "Ready for SRO" : "Action Needed"}
                  </span>
                </div>

                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        checkedItems[item.id]
                          ? "bg-emerald-50/50 border-emerald-200 text-slate-900"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          checkedItems[item.id] ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                        }`}
                      >
                        {checkedItems[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5">{item.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Fingerprint className="w-4 h-4 text-[#C65378]" />
                <span>PROCEDURAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Visual Blueprint: End-to-End Will Registration Workflow
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The visual below shows official Will registration at the Sub-Registrar Office under the 1908 Act. It features an authenticated Will, registrar endorsement, and official records.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs p-3 sm:p-4">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#FAF7F0] border border-slate-100 shadow-inner">
                  <Image
                    src="/images/notarized-will-vs-registered-will-india-og.jpg"
                    alt="Authentic Will Registration at Government Sub-Registrar Office in India under Registration Act 1908"
                    fill
                    className="object-cover hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 px-1 text-xs text-slate-500">
                  <span>Figure 1: Plain Will vs Notarized Will vs Registered Will on Advocate Chamber Desk in India.</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="/images/notarized-will-vs-registered-will-india-og.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#C65378] hover:underline"
                    >
                      <span>View Full Photo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-slate-300">&bull;</span>
                    <a
                      href="/images/will-registration-blueprint-infographic.svg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      <span>Statutory Flowchart (SVG)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP PROTOCOL */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>STANDARD OPERATING PROCEDURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Step-by-Step Protocol: SRO Will Registration SOP
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Our legal chamber uses a proven six-step path to register your Will. We make the entire process fast, simple, and free from courthouse stress.
              </p>

              <div className="space-y-4">
                {/* Stage 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Drafting &amp; Succession Law Audit</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      Our advocates draft your Will to ensure strict compliance with Section 63 of the Indian Succession Act. We verify asset schedules, executor nominations, and ensure plain-paper printouts require zero stamp duty.
                    </p>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">SRO Portal Slot Booking &amp; Fee Challan</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      We submit your application on the relevant state portal (DORIS, Kaveri 2.0, IGRS, etc.), pay nominal government registration fees, and generate your priority appointment token.
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Witness Selection &amp; Section 67 Vetting</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      We screen your attesting witnesses to confirm that neither they nor their spouses receive any bequests under the Will. This safeguards your family against disqualification under Section 67.
                    </p>
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">SRO Appearance or Section 31 Doorstep Visit</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      Our advocate accompanies you to the Sub-Registrar Office for guided execution. If you opted for a Section 31 home visit, we coordinate the officer’s visit directly to your residence.
                    </p>
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Biometric Verification &amp; Statutory Endorsement</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      The Sub-Registrar captures live webcam photos and thumb impressions of all parties. The officer then stamps the statutory certificates under Section 58 and 59 on your original Will.
                    </p>
                  </div>
                </div>

                {/* Stage 6 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#172228] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Book 3 Entry &amp; Certified Copy Delivery</h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      Your Will is officially entered in Book 3. You receive the original registered document bearing a government seal, and we provide digital vault backups for lifelong peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STRATEGIC DEFENSE */}
            <section id="strategic-defense" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>STRATEGIC ASSET SHIELD</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Strategic Defense: When Will Registration Is Vital
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Any adult in India can register a Will. But registration is most critical in four family and property situations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">Disinheriting Natural Legal Heirs</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When you leave property to one child while excluding others, excluded heirs often allege coercion or fraud. A registered Will provides official proof of your voluntary intention.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">Multi-State Immovable Properties</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Transferring apartments or commercial lands across different municipal corporations requires mutation. Revenue officers process municipal mutation much faster when presented with an SRO registered Will.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">Second Marriages &amp; Blended Families</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Estate disputes frequently arise between stepchildren and surviving spouses. Registering your Will prevents hostile relatives from alleging that your signature was forged.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">Senior Citizens Aged 70 and Above</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Litigants often challenge Wills made by seniors by alleging senility or dementia. The Sub-Registrar’s official endorsement and biometric capture decisively defeats such capacity challenges.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: STATE-BY-STATE GUIDE */}
            <section id="state-by-state-guide" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4 text-[#C65378]" />
                <span>STATE REVENUE MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. State-by-State Guide: SRO Portals &amp; Fee Structures
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                State fees for registering a Will are very low in India. Unlike buying land, registering a Will costs only a few hundred rupees. Below is a list of state fees and portals.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="py-3 px-4 font-bold">State / Union Territory</th>
                        <th className="py-3 px-4 font-bold">Official Registration Portal</th>
                        <th className="py-3 px-4 font-bold">SRO Registration Fee</th>
                        <th className="py-3 px-4 font-bold">Section 31 Home Visit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Delhi NCR</td>
                        <td className="py-3 px-4">DORIS (Revenue Dept)</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 + ₹100 Pasting</td>
                        <td className="py-3 px-4">Available (₹1,000 Govt Commission)</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">Maharashtra (Mumbai/Pune)</td>
                        <td className="py-3 px-4">IGRS Maharashtra / e-Stepin</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 + ₹20/page scanning</td>
                        <td className="py-3 px-4">Available on medical grounds</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Karnataka (Bengaluru)</td>
                        <td className="py-3 px-4">Kaveri 2.0 Portal</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹200 + User charges</td>
                        <td className="py-3 px-4">Available via SRO Application</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">Tamil Nadu (Chennai)</td>
                        <td className="py-3 px-4">TNREGINET Portal</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 + Document fees</td>
                        <td className="py-3 px-4">Available for senior citizens</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Uttar Pradesh (Noida/Lucknow)</td>
                        <td className="py-3 px-4">IGRSUP Portal</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 fixed fee</td>
                        <td className="py-3 px-4">Available upon Doctor certificate</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">West Bengal (Kolkata)</td>
                        <td className="py-3 px-4">WBRegistration Portal</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 nominal fee</td>
                        <td className="py-3 px-4">Available under SRO Rules</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Telangana (Hyderabad)</td>
                        <td className="py-3 px-4">IGRS Telangana</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">₹100 to ₹500 fee</td>
                        <td className="py-3 px-4">Available on application</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: PROCEDURAL TIMELINE */}
            <section id="procedural-timeline" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calendar className="w-4 h-4 text-[#C65378]" />
                <span>EXECUTION MILESTONES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Procedural Timeline: Execution to Certified Delivery
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                With our legal team guiding you, Will registration takes only 3 to 5 business days. The timeline below explains each step from first draft to final delivery.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#172228] text-white">
                        <th className="py-3 px-4 font-bold">Stage Milestone</th>
                        <th className="py-3 px-4 font-bold">Expected Time</th>
                        <th className="py-3 px-4 font-bold">Key Action Performed</th>
                        <th className="py-3 px-4 font-bold">Deliverable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">1. Draft Audit</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 1</td>
                        <td className="py-3 px-4">Succession lawyer verifies personal law &amp; assets</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Vetted Will Draft</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">2. Portal Booking</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 1 - 2</td>
                        <td className="py-3 px-4">SRO appointment slot reserved &amp; fee challan paid</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Appointment Token</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">3. Witness Screening</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 2</td>
                        <td className="py-3 px-4">Witness IDs &amp; Section 67 eligibility confirmed</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Witness Pack Ready</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">4. Registration Day</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 3</td>
                        <td className="py-3 px-4">Physical visit or Section 31 home execution</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Biometrics Recorded</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">5. SRO Endorsement</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 3 - 4</td>
                        <td className="py-3 px-4">Registrar stamps official registration certificate</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Book 3 Catalog Entry</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">6. Copy Delivery</td>
                        <td className="py-3 px-4 font-mono text-xs">Day 4 - 5</td>
                        <td className="py-3 px-4">Original registered Will dispatched with backup</td>
                        <td className="py-3 px-4 text-emerald-600 font-semibold">Official Registered Will</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 10: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4 text-[#C65378]" />
                <span>CASE ROADMAPS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Specialized Scenarios: Senior Heirs &amp; NRI Testators
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Will registration changes based on your family needs. Here is how our team handles four common client cases.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] mb-2 uppercase">
                    <span>Scenario A</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Bedridden Senior in Hospital or Home</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We petition the Sub-Registrar under Section 31 with an official doctor’s capacity certificate. The officer visits the hospital or residence, captures biometrics, and registers the Will without disturbing the patient.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] mb-2 uppercase">
                    <span>Scenario B</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">NRI Testator Visiting India on Short Leave</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For NRIs visiting Delhi, Mumbai, or Bengaluru on vacation, we prepare the draft and secure advance SRO appointment tokens before your flight lands, allowing registration within a 2-hour window.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] mb-2 uppercase">
                    <span>Scenario C</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Amending an Already Registered Will</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If your original Will was registered, amending it with an unregistered note can cause legal conflicts. We draft and register a formal Codicil at the same SRO office to maintain an unbroken public record.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C65378] mb-2 uppercase">
                    <span>Scenario D</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Sealed Cover Deposit (Sections 42 to 46)</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Testators who require complete secrecy can deposit their Will in a wax-sealed envelope with the District Registrar. The sealed cover is kept in a fireproof safe until death under Section 43.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PLANS & PRICING */}
            <section id="service-pricing" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>PLANS &amp; PRICING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. Service Plans &amp; Transparent Pricing for Will Drafting
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                All our plans offer clear pricing with zero hidden costs. Choose the legal plan that matches your estate goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Plan 1: Essential */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#55636D]">Tier 1</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">Auto Verified</h3>
                    <div className="mt-4 mb-4">
                      <span className="text-3xl font-extrabold text-[#172228]">₹2,490</span>
                      <span className="text-xs text-slate-500 block mt-1">One-time &bull; Print Ready</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant statutory plain-paper draft</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 63 ISA compliant clauses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Downloadable PDF and Word copy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>SRO self-registration checklist</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl border border-[#172228] text-[#172228] font-bold text-xs text-center hover:bg-[#172228] hover:text-white transition-all cursor-pointer"
                  >
                    Select Essential
                  </a>
                </div>

                {/* Plan 2: Lawyer Verified */}
                <div className="bg-white rounded-2xl border-2 border-[#C65378] p-6 flex flex-col justify-between shadow-md relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65378] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Tier 2</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">Lawyer Verified</h3>
                    <div className="mt-4 mb-4">
                      <span className="text-3xl font-extrabold text-[#172228]">₹4,990</span>
                      <span className="text-xs text-slate-500 block mt-1">High Court Advocate Review</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Personal review by succession counsel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Multi-asset &amp; business clause vetting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>1 Phone consultation with advocate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sub-Registrar appointment booking pack</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-all cursor-pointer"
                  >
                    Select Lawyer Verified
                  </a>
                </div>

                {/* Plan 3: Connect to Lawyer */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#55636D]">Tier 3</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">Connect to Lawyer</h3>
                    <div className="mt-4 mb-4">
                      <span className="text-3xl font-extrabold text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500 block mt-1">Senior Counsel Consultation</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Comprehensive 1-on-1 strategy call</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Complex family trusts &amp; foreign assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Section 31 home visit coordination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Priority advocate accompaniment options</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl border border-[#172228] text-[#172228] font-bold text-xs text-center hover:bg-[#172228] hover:text-white transition-all cursor-pointer"
                  >
                    Select Premium
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. Frequently Asked Questions: Will Registration India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Find direct answers to common questions about Will registration, state fees, and Section 31 home visits in India.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left py-4 px-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
                      aria-expanded={openFaq === index}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          openFaq === index ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target space-y-6 pt-6 border-t border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  13. Statutory Citations &amp; Official Government Portals
                </h2>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li>Registration Act, 1908: Section 18(e) (Optional registration of Wills), Section 31 (Registration at private residence), Section 40 &amp; 41 (Procedure on deposit and registration of Wills), Section 57(2) (Confidentiality of Book 3).</li>
                  <li>Indian Succession Act, 1925: Section 63 (Execution of unprivileged Wills), Section 67 (Void bequests to attesting witnesses), Section 62 (Revocability of Wills).</li>
                  <li>Indian Stamp Act, 1899: Schedule I (Complete exemption of Wills and Codicils from stamp duty across India).</li>
                  <li>Bharatiya Sakshya Adhiniyam, 2023 / Indian Evidence Act, 1872: Section 114 (Presumption of regularity of official acts by public officers).</li>
                  <li>Supreme Court Landmark Precedents: <em>Pentakota Satyanarayana v. Pentakota Seetharanyam (2005) 8 SCC 67</em>; <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (1959) Supp 2 SCR 426</em>.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  Verified Government Registration Portals
                </h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://doris.delhigovt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>DORIS Delhi Portal</span>
                  </a>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>IGRS Maharashtra</span>
                  </a>
                  <a
                    href="https://kaveri.karnataka.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Kaveri 2.0 Karnataka</span>
                  </a>
                  <a
                    href="https://tnreginet.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>TNREGINET Tamil Nadu</span>
                  </a>
                  <a
                    href="https://igrsup.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>IGRSUP Uttar Pradesh</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  Related Internal Succession Guides
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/will-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    Will Format in India
                  </Link>
                  <Link
                    href="/templates/codicil-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    Codicil Format to Amend Will
                  </Link>
                  <Link
                    href="/service/nri-will-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    NRI Will Drafting Services
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    Will Preparation Checklist
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    Probate Requirement Checker
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#C65378] text-xs font-semibold transition-colors"
                  >
                    View All Pricing Plans
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR / ADVOCATE BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/in/iamanujmalik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-900 text-sm hover:text-[#C65378] transition-colors block"
                  >
                    Advocate Anuj Anand Malik
                  </a>
                  <div className="text-[11px] font-semibold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                  <div className="text-[10px] text-slate-500">High Court Bar Association</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Specialist in testamentary law, Sub-Registrar execution, probate petitions, and dispute-proof estate planning across India.
              </p>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bar Council Enrolled</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] font-semibold hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: ACTION CTA CARD (Brand Navy Background) */}
            <div className="hidden lg:block rounded-3xl p-6 bg-[#172228] text-white text-center shadow-lg shadow-navy-950/20">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[10px] font-black uppercase tracking-wider mb-3">
                CONFIDENTIAL LEGAL DESK
              </div>
              <h3 className="text-lg md:text-xl font-bold leading-tight mb-2">
                Need Sub-Registrar Registration Assistance?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Our advocates handle SRO token booking, witness coordination, and Section 31 home visits across major Indian cities.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full block py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Schedule SRO Registration
              </a>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
                <span>Pan-India SRO Legal Coordination</span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>100% Confidential Book 3 Service</span>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
              <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>Our Registration Guarantees</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty:</strong> Guaranteed plain-paper legal validity under Schedule I.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 67 Audit:</strong> Independent witness screening protecting bequests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Doorstep Option:</strong> Section 31 private attendance for immobile seniors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Digital Safe Vault:</strong> Lifelong encrypted backup of registered Will details.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED SERVICES & GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Related Legal Resources
              </div>

              <Link
                href="/templates/will-format-india"
                className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
              >
                <div className="font-bold text-xs text-slate-900">Will Format in India</div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 text-[#C65378]">
                  <span>Clause-annotated printable template</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/service/nri-will-india"
                className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
              >
                <div className="font-bold text-xs text-slate-900">NRI Will Drafting Hub</div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 text-[#C65378]">
                  <span>Two-Will strategy for foreign assets</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/pricing"
                className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
              >
                <div className="font-bold text-xs text-slate-900">Will Drafting Pricing</div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 text-[#C65378]">
                  <span>Starting ₹2,490 with advocate review</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
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
                  Free Indian Will Format
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
