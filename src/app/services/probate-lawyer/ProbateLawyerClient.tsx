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
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Gavel,
  Landmark,
  Check,
  Shield,
  Briefcase,
  Users,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is Probate & Why is It Needed?" },
  { id: "mandatory-jurisdictions", label: "2. The 3 Cities Where Probate is Compulsory" },
  { id: "comparison-matrix", label: "3. Probate vs Letters of Administration (Key Differences)" },
  { id: "letters-of-administration", label: "4. How Letters of Administration Work" },
  { id: "visual-blueprint", label: "5. Visual Guide to the Probate Process" },
  { id: "step-by-step-protocol", label: "6. Step-by-Step Court Process" },
  { id: "four-practice-tracks", label: "7. Types of Probate Cases Handled" },
  { id: "court-fee-structure", label: "8. State Court Fees & Maximum Limits" },
  { id: "procedural-timeline", label: "9. Expected Court Timelines" },
  { id: "specialized-scenarios", label: "10. What Happens if a Family Member Objects?" },
  { id: "legal-representation", label: "11. Our Legal Team & Court Representation" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Relevant Laws & Official Resources" },
];

const FAQS = [
  {
    q: "What is Probate of a Will in simple words?",
    a: "Probate is an official certificate issued by a court confirming that a Will is genuine and that the executor named in it has full legal power to distribute the deceased person's property (Section 2(f), Indian Succession Act, 1925). It gives banks, housing societies, and property registrars complete confidence that they are dealing with the rightful person.",
  },
  {
    q: "Is probate required for all Wills across India?",
    a: "No. Under Sections 57 and 213 of the Indian Succession Act, probate is compulsory by law ONLY for Wills signed in Mumbai, Kolkata, or Chennai, or Wills dealing with real estate in those three cities (for Hindus, Buddhists, Sikhs, and Jains). Outside these cities, probate is voluntary by law, though banks or buyers may sometimes request it for high-value properties.",
  },
  {
    q: "Who can apply for probate in court?",
    a: "Under Section 222 of the Act, only the executor explicitly named in the Will can apply for and receive probate. If no executor was named, or if the executor has passed away, the beneficiaries cannot get probate; they must apply for Letters of Administration with Will Annexed instead.",
  },
  {
    q: "What is the difference between Probate and Letters of Administration?",
    a: "A Probate is granted only when there is a valid Will and an active named executor. Letters of Administration are granted by the court when either: (1) The person died without any Will at all, or (2) There is a Will, but no executor was appointed (or the executor has passed away). Both documents give official court authority to manage and distribute the estate.",
  },
  {
    q: "How much is the court fee for probate in Mumbai?",
    a: "In Mumbai (Maharashtra), probate fees are calculated as a percentage of the property value, but the government has capped the maximum court fee at ₹75,000 under the Maharashtra Court Fees Act. This protects families with large estates from paying huge court fees.",
  },
  {
    q: "How long does it take to get probate from court?",
    a: "If no family member objects (uncontested), it typically takes 5 to 9 months in most courts. If a disgruntled relative files an objection (a caveat), the case turns into a regular civil trial, which can take 18 to 36 months.",
  },
  {
    q: "Can a relative challenge the Will during the probate case?",
    a: "Yes. When a probate case is filed, the court issues public newspaper notices and sends summons to all legal heirs. Any heir who feels cheated can file an objection (called a Caveat under Section 284) within the 30-day notice window. The court will then hear their arguments before deciding whether to approve the Will.",
  },
  {
    q: "Can an NRI executor get probate without traveling to India?",
    a: "Yes! An NRI executor living abroad can sign a Special Power of Attorney in their country of residence and have it notarized or certified by the local Indian Embassy. Their Indian lawyer can then file and manage the entire probate case in India without the NRI needing to travel.",
  },
  {
    q: "What happens if the original Will is lost or damaged?",
    a: "Under Section 237 of the Indian Succession Act, a court can grant probate based on a photocopy or carbon copy of a lost Will, provided the family can prove that the original was genuinely executed and was not cancelled or destroyed by the deceased.",
  },
  {
    q: "Do banks always require probate to release money?",
    a: "Not always. For smaller bank accounts with registered nominees, banks usually release the funds upon receiving a death certificate, nominee KYC, and an indemnity bond. However, if the balance is large (e.g. over ₹25 Lakhs) or if multiple family members make conflicting claims, banks will demand a court probate for safety.",
  },
];

export default function ProbateLawyerClient() {
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
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT 1925 &bull; HIGH COURT &amp; DISTRICT COURT PROBATE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Expert Probate Lawyers in India: Will Probate Services
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Secure your legal title with confidence. We file uncontested probate petitions, defend contested Wills, and obtain Letters of Administration across High Courts and District Courts nationwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Schedule Free Case Evaluation</span>
            </Link>
            <Link
              href="/tools/probate-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>Check If Probate Is Required</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                18+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Testamentary Counsel
              </span>
            </div>

            {/* Stat 2: Grants Secured */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                850+ Grants
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Probate &amp; LoA Secured
              </span>
            </div>

            {/* Stat 3: Value Administered */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹1,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estate Assets Cleared
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
                  Verified Reviews
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
                Governed by Sections 2(f), 57, 213, 218, 222, and 276 of the Indian Succession Act, 1925.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE BRIEF: WILL PROBATE SERVICES IN INDIA
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Key Legal Rules for Executors and Heirs
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Definition:</strong> Under Section 2(f) of the Indian Succession Act, probate is the certified court copy of a Will granting estate administration.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Presidency Jurisdictions:</strong> Wills executed or covering immovable property in Mumbai, Kolkata, and Chennai require mandatory probate under Section 57 and Section 213.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Executor Exclusive Standing:</strong> Under Section 222, only the executor named in the Will can apply for probate. Legal heirs apply for Letters of Administration if no executor is active.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Conclusive Title Proof:</strong> A grant of probate operates in rem under Section 216. It binds the entire world and protects banks, buyers, and registrars from conflicting claims.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 2(F) &amp; SECTION 222 OF ISA 1925</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Statutory Framework: Definition of Probate in India
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Probate is an official court order. It proves that a Will is genuine. Under Section 2(f) of the Indian Succession Act, 1925, probate gives the executor full legal power to manage the estate. The court issues a certified copy of the Will under its official seal.
                </p>
                <p>
                  The court does not change the Will. It only checks if the person signed the Will freely. The court also checks if the person had a sound mind. Two adult witnesses must attest the signature under Section 63. Once granted, probate protects the executor. It confirms their legal authority over all assets.
                </p>
                <p>
                  Under Section 222, only the executor named in the Will can apply for probate. If no executor is named, the heirs must apply for Letters of Administration instead.
                </p>
              </div>
            </section>

            {/* SECTION 2: MANDATORY JURISDICTIONS */}
            <section id="mandatory-jurisdictions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span>SECTIONS 57 &amp; 213: TERRITORIAL JURISDICTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Mandatory Jurisdictions: High Court vs District Court
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Whether you need probate depends on where the property is. Under Section 57 and Section 213 of the Indian Succession Act, probate is mandatory for Hindu, Buddhist, Sikh, and Jain Wills in two cases.
                </p>
                <p>
                  First, the Will was signed in Mumbai, Kolkata, or Chennai. Second, the Will deals with land or buildings located inside Mumbai, Kolkata, or Chennai.
                </p>
                <p>
                  In other cities like Delhi, Bengaluru, and Pune, probate is not mandatory by law. Even so, banks, housing societies, and buyers often ask for probate. They need court proof before they release large assets.
                </p>
              </div>

              {/* Data Table: High Court vs District Court Jurisdiction */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs mt-4">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Testamentary Court Jurisdiction Matrix Across India
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Jurisdiction</th>
                        <th className="px-4 py-3">Competent Forum</th>
                        <th className="px-4 py-3">Legal Basis</th>
                        <th className="px-4 py-3">Probate Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Mumbai (Ordinary Original)</td>
                        <td className="px-4 py-3">Bombay High Court (Original Side)</td>
                        <td className="px-4 py-3">Section 57(a) &amp; 213 ISA</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">Mandatory by Law</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Kolkata (Presidency Limits)</td>
                        <td className="px-4 py-3">Calcutta High Court (Original Side)</td>
                        <td className="px-4 py-3">Section 57(a) &amp; 213 ISA</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">Mandatory by Law</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Chennai (City Limits)</td>
                        <td className="px-4 py-3">Madras High Court (Original Side)</td>
                        <td className="px-4 py-3">Section 57(a) &amp; 213 ISA</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">Mandatory by Law</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Delhi &amp; NCR</td>
                        <td className="px-4 py-3">District Judge / Additional District Judge</td>
                        <td className="px-4 py-3">Section 264 ISA</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">Voluntary / Bank Triggered</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Bengaluru &amp; Karnataka</td>
                        <td className="px-4 py-3">City Civil Court / Principal District Judge</td>
                        <td className="px-4 py-3">Section 265 ISA</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">Voluntary / Title Clearance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON MATRIX */}
            <section id="comparison-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>COMPARISON MATRIX: TESTAMENTARY INSTRUMENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Legal Pathways: Probate vs Letters of Administration
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Choosing the right court petition saves both time and legal fees. Many families confuse Probate with Letters of Administration. They also confuse it with Succession Certificates.
                </p>
                <p>
                  Review the guide below. It helps you find the right court process for your family estate.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Testamentary Legal Instrument Comparison
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 min-w-[620px]">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Parameter</th>
                        <th className="px-4 py-3">Probate of Will</th>
                        <th className="px-4 py-3">Letters of Admin (Will)</th>
                        <th className="px-4 py-3">Letters of Admin (No Will)</th>
                        <th className="px-4 py-3">Succession Certificate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Governing Section</td>
                        <td className="px-4 py-3 font-mono">Section 222 ISA</td>
                        <td className="px-4 py-3 font-mono">Section 232 ISA</td>
                        <td className="px-4 py-3 font-mono">Section 218 ISA</td>
                        <td className="px-4 py-3 font-mono">Section 370 ISA</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Will Required?</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Yes (Mandatory)</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Yes (Mandatory)</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">No (Intestate Demise)</td>
                        <td className="px-4 py-3 text-slate-600">Either (Usually No Will)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Who Can Apply?</td>
                        <td className="px-4 py-3 font-semibold text-[#172228]">Named Executor Only</td>
                        <td className="px-4 py-3">Universal Legatee / Heirs</td>
                        <td className="px-4 py-3">Class I Legal Heirs</td>
                        <td className="px-4 py-3">Any Entitled Legal Heir</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Asset Coverage</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">Movable &amp; Immovable</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">Movable &amp; Immovable</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">Movable &amp; Immovable</td>
                        <td className="px-4 py-3 text-rose-700 font-semibold">Movable Debts Only</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Surety Bond Needed?</td>
                        <td className="px-4 py-3 text-slate-600">Rarely (Only by rule)</td>
                        <td className="px-4 py-3 text-amber-700 font-semibold">Yes (Section 291)</td>
                        <td className="px-4 py-3 text-amber-700 font-semibold">Yes (Section 291)</td>
                        <td className="px-4 py-3 text-amber-700 font-semibold">Yes (Court Discretion)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Typical Duration</td>
                        <td className="px-4 py-3 font-semibold">5 to 9 Months</td>
                        <td className="px-4 py-3 font-semibold">6 to 10 Months</td>
                        <td className="px-4 py-3 font-semibold">7 to 12 Months</td>
                        <td className="px-4 py-3 font-semibold">4 to 7 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: LETTERS OF ADMINISTRATION */}
            <section id="letters-of-administration" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 218 &amp; SECTION 232 PROCEDURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Letters of Administration: Estates Without an Executor
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Letters of Administration help when probate is not an option. Under Indian law, families need this court order in two situations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Letters of Administration with Will Annexed</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      First, the deceased left a valid Will, but did not name an executor. It also applies if the executor died or stepped down. This is called Letters of Administration with Will Annexed under Section 232.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Intestate Letters of Administration</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Second, the person died without leaving any Will. The court appoints an administrator to divide the estate among legal heirs under Section 218.
                    </p>
                  </div>
                </div>
                <p>
                  An administrator must sign a court bond with sureties under Section 291. This bond makes sure that the administrator protects the assets. It ensures they divide them fairly.
                </p>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>VISUAL COURT PROTOCOL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Visual Blueprint: End to End Probate Court Procedure
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The diagram below shows the four main stages of the probate process in India. It guides you from checking court rules to getting the final grant under the official court seal.
              </p>

              {/* Responsive Container for Blueprint Image */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/probate-lawyer-og.jpg"
                    alt="Visual Blueprint of Probate of Will Court Procedure and Testamentary Practice in India"
                    width={1376}
                    height={768}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: High Court testamentary petition file, advocate desk, and grant of probate under court seal
                  </span>
                  <Link
                    href="/images/probate-lawyer-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP BY STEP PROTOCOL */}
            <section id="step-by-step-protocol" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>SIX-STAGE STATUTORY PROCEDURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Step by Step Protocol: From Petition to Court Grant
              </h2>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Document Audit &amp; Legal Heir Family Tree Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Our advocates check the original Will, death certificate, and property papers. We also prepare a complete family tree of all legal heirs.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Drafting the Petition &amp; Witness Verification Affidavit
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We draft the probate petition under Section 276. At least one attesting witness must sign a court affidavit under Section 281 to confirm the signing.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Court Filing &amp; Valuation by District Revenue Collector
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We file the case in the High Court or District Court. The court checks the papers. It asks the local revenue officer for a property valuation report.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Special Citations to Heirs &amp; Public Newspaper Publication
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The court sends formal notices to all natural heirs. It also publishes a notice in two daily newspapers. This gives the public 30 days to file any objections.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Recording Attesting Witness Evidence in Court
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If no one objects, the witness appears in court. The witness confirms that the person signed the Will freely. They confirm the person was in good health.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-bold text-sm flex items-center justify-center shrink-0 border border-rose-100">
                    6
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      Issuance of Final Grant Under Judicial Seal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The court verifies the evidence and fees are paid. Then the judge grants probate. The court issues the certified Will copy under its seal.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: FOUR PRACTICE TRACKS */}
            <section id="four-practice-tracks" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                <span>COMPREHENSIVE LITIGATION TRACKS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Four Practice Tracks: Uncontested &amp; Disputed Estates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#5F7E75]">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-base">Uncontested Fast-Track Probate</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This fast track suits families where all heirs agree. We prepare no-objection affidavits. This helps secure the court grant within 5 to 7 months.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C65378]">
                    <Gavel className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-base">Contested Will Defense &amp; Caveats</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our team defends Wills against claims of fraud, pressure, or mental weakness. We protect the true wishes of the deceased in court.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#172228]">
                    <Users className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-base">Letters of Administration</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We help heirs apply for court administration when there is no Will. We also help when there is no active executor. We manage court bonds and asset division.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Landmark className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-base">Cross-Border NRI Ancillary Probate</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We help NRIs validate foreign Wills under Section 228 of the Indian Succession Act. We handle Indian property without requiring travel.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: COURT FEE STRUCTURE */}
            <section id="court-fee-structure" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>STATE COURT FEES ACT PROVISIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Court Fee Structure: State Stamp Duties &amp; Legal Caps
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  State laws set the court fees for probate cases. Fees depend on the net value of the estate after deducting debts.
                </p>
                <p>
                  Some states place a cap on the maximum fee. For example, Maharashtra caps the court fee at ₹75,000 under the Bombay Court Fees Act. This saves money for high-value family estates.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs mt-4">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    State-Wise Probate Court Fee Schedules &amp; Statutory Limits
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">State / Jurisdiction</th>
                        <th className="px-4 py-3">Ad Valorem Fee Rate</th>
                        <th className="px-4 py-3">Statutory Maximum Cap</th>
                        <th className="px-4 py-3">Governing Act</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Maharashtra (Mumbai High Court)</td>
                        <td className="px-4 py-3">2% to 7.5% (Sliding Scale)</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Capped at ₹75,000</td>
                        <td className="px-4 py-3">Maharashtra Court Fees Act, Sched. I</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Delhi (District Courts)</td>
                        <td className="px-4 py-3">Fixed brackets based on value</td>
                        <td className="px-4 py-3 text-slate-600 font-semibold">Tiered rate scale</td>
                        <td className="px-4 py-3">Court Fees (Delhi Amendment) Act</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">West Bengal (Calcutta High Court)</td>
                        <td className="px-4 py-3">2.5% to 5.5% sliding scale</td>
                        <td className="px-4 py-3 text-slate-600 font-semibold">Subject to state ceilings</td>
                        <td className="px-4 py-3">West Bengal Court Fees Act</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Tamil Nadu (Madras High Court)</td>
                        <td className="px-4 py-3">Approx. 3% ad valorem</td>
                        <td className="px-4 py-3 text-slate-600 font-semibold">Scheduled caps by asset</td>
                        <td className="px-4 py-3">Tamil Nadu Court Fees Act</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Karnataka (Bengaluru Courts)</td>
                        <td className="px-4 py-3">Tiered percentages by slab</td>
                        <td className="px-4 py-3 text-slate-600 font-semibold">State schedule</td>
                        <td className="px-4 py-3">Karnataka Court Fees Act</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: PROCEDURAL TIMELINE */}
            <section id="procedural-timeline" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>COURT HEARING DURATION EXPECTATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Procedural Timeline: Filing to Final Grant of Probate
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Court timelines depend on the court schedule and family cooperation. Uncontested cases follow predictable stages.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs mt-3">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Milestone-by-Milestone Timeline Breakdown
                  </div>
                </div>
                <div className="divide-y divide-slate-100 bg-white text-xs">
                  <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-rose-50/40">
                    <div>
                      <div className="font-bold text-slate-900">Stage 1: Petition Preparation &amp; Affidavit Attestation</div>
                      <div className="text-slate-500 text-[11px]">Drafting under Section 276, witness verification affidavit, asset schedules</div>
                    </div>
                    <div className="font-mono font-bold text-[#C65378] text-sm shrink-0">Weeks 1 to 3</div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-bold text-slate-900">Stage 2: Registry Scrutiny &amp; Numbering</div>
                      <div className="text-slate-500 text-[11px]">Curing office objections, depositing court fees, court assignment</div>
                    </div>
                    <div className="font-mono font-bold text-slate-700 text-sm shrink-0">Weeks 3 to 6</div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-bold text-slate-900">Stage 3: Citations, Newspaper Notices &amp; Collector Report</div>
                      <div className="text-slate-500 text-[11px]">Service on natural heirs, 30-day publication window, circle rate valuation</div>
                    </div>
                    <div className="font-mono font-bold text-slate-700 text-sm shrink-0">Months 2 to 4</div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="font-bold text-slate-900">Stage 4: Recording Evidence of Attesting Witness</div>
                      <div className="text-slate-500 text-[11px]">Formal deposition proving testamentary capacity and signature</div>
                    </div>
                    <div className="font-mono font-bold text-slate-700 text-sm shrink-0">Months 4 to 6</div>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-emerald-50/40">
                    <div>
                      <div className="font-bold text-slate-900">Stage 5: Final Judgment &amp; Issuance of Grant Under Seal</div>
                      <div className="text-slate-500 text-[11px]">Engrossment on non-judicial stamp paper and certified copy handover</div>
                    </div>
                    <div className="font-mono font-bold text-emerald-700 text-sm shrink-0">Months 6 to 9</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span>COMPLEX TESTAMENTARY LITIGATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Specialized Scenarios: Caveats &amp; Challenged Wills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-600">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-sm">Lodging or Defending a Caveat (Section 284)</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A caveat stops the court from granting probate without notice. If someone files a caveat under Section 284, the case becomes a contested suit.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Scale className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-sm">Allegations of Undue Influence (Section 61)</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Relatives may claim pressure or memory loss under Section 61. In such cases, we use doctor records and witness words to prove a sound mind.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FileText className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-sm">Lost or Destroyed Original Will (Section 237)</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If the original Will is lost, the court can accept a copy under Section 237. The petitioner must prove that the person did not destroy it.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#5F7E75]">
                    <Building className="w-5 h-5" />
                    <h3 className="font-bold text-slate-900 text-sm">Overseas NRI Executors &amp; Foreign Wills</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    NRI executors can sign a power of attorney abroad. Our advocates then handle all court hearings in India on their behalf.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL REPRESENTATION */}
            <section id="legal-representation" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>AMA LEGAL SOLUTIONS ADVOCATES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. Legal Representation: Expert Succession Advocates
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Probate law requires careful attention to High Court rules and evidence laws. At AMA Legal Solutions, our team guides you at every step.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="font-bold text-slate-900 text-sm">High Court Practice</div>
                    <div className="text-[11px] text-slate-500 mt-1">Bombay, Calcutta, Madras &amp; Delhi High Courts</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="font-bold text-slate-900 text-sm">PAN-India Coverage</div>
                    <div className="text-[11px] text-slate-500 mt-1">District Courts across NCR, Bengaluru, Hyderabad, Pune</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="font-bold text-slate-900 text-sm">Transparent Fixed Fees</div>
                    <div className="text-[11px] text-slate-500 mt-1">Zero hidden costs, milestone-based billing</div>
                  </div>
                </div>
                <p>
                  You may need a quick uncontested grant. Or you may need strong courtroom defense. Our advocates protect your rights with full privacy.
                </p>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>CLEAR ANSWERS TO COMMON QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Frequently Asked Questions: Probate Law in India
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore definitive answers prepared by senior succession advocates regarding probate procedures, costs, and court timelines:
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS & AUTHORITIES */}
            <section
              id="statutory-citations"
              className="scroll-target pt-6 border-t border-slate-200 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>AUTHORITY REFERENCES &amp; INTERNAL RESOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Statutory Citations: Indian Succession Act Provisions
              </h2>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
                <li>
                  <strong>Section 2(f), Indian Succession Act, 1925:</strong> Statutory definition of probate as court-certified copy with grant of administration.
                </li>
                <li>
                  <strong>Sections 57 &amp; 213, Indian Succession Act, 1925:</strong> Mandatory probate requirements for Presidency towns (Mumbai, Kolkata, Chennai).
                </li>
                <li>
                  <strong>Section 216, Indian Succession Act, 1925:</strong> Conclusive effect of grant in rem against all parties.
                </li>
                <li>
                  <strong>Section 218 &amp; 232, Indian Succession Act, 1925:</strong> Grant of Letters of Administration for intestate estates and absent executors.
                </li>
                <li>
                  <strong>Section 222, Indian Succession Act, 1925:</strong> Probate grant strictly restricted to named executors.
                </li>
                <li>
                  <strong>Section 276 &amp; 281, Indian Succession Act, 1925:</strong> Mandatory contents of probate petition and attesting witness verification.
                </li>
                <li>
                  <strong>Section 284, Indian Succession Act, 1925:</strong> Lodging caveats and conversion into contested testamentary suits.
                </li>
              </ul>

              <div className="pt-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Related Succession Tools &amp; Service Pages
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/tools/probate-checker"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Probate Checker Tool &rarr;
                  </Link>
                  <Link
                    href="/service/succession-certificate"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Succession Certificate Lawyer &rarr;
                  </Link>
                  <Link
                    href="/service/nri-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    NRI Will Drafting Services &rarr;
                  </Link>
                  <Link
                    href="/service/will-registration"
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
                  <Link
                    href="/templates/will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Will Format in India &rarr;
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author Bio & Action CTAs)
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
                Bar Council enrolled advocate with 18+ years of expertise in High Court testamentary petitions, probate litigation, and cross-border estate administration at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>Verified Legal Counsel</span>
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
                <span>CONFIDENTIAL &amp; PRIVILEGED</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Need Help with Probate or Letters of Administration?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Speak directly with our senior testamentary counsel. We evaluate your Will, assess court jurisdiction, and outline the exact legal costs within 24 hours.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Book Advocate Case Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="pt-1">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="text-xs text-slate-300 hover:text-white underline underline-offset-2"
                >
                  Or draft a challenge-proof Will online &rarr;
                </a>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Why Choose AMA Legal Solutions?
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>High Court Advocacy:</strong> Direct representation in Mumbai, Calcutta, Madras, and Delhi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Transparent Fees:</strong> Fixed fee agreements with no hidden litigation overheads.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caveat &amp; Dispute Defense:</strong> Proven track record defending contested Wills.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>NRI Remote Filing:</strong> Handled entirely via Power of Attorney without India visits.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TOOLS */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Testamentary Diagnostic Tools
              </h4>
              <div className="space-y-2">
                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Probate Checker Tool</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Assess if your estate requires probate &rarr;
                  </div>
                </Link>
                <Link
                  href="/service/succession-certificate"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Certificate Service</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Court petitions for bank deposits and shares &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Hindu Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Calculate legal heir shares under Section 8 &rarr;
                  </div>
                </Link>
                <Link
                  href="/service/nri-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">NRI Will Drafting Services</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Two-Will strategy for foreign residents &rarr;
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
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
                <Link
                  href="/service/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
                <Link
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Court Fee Calculator India
                </Link>
                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  How to Challenge a Will
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
