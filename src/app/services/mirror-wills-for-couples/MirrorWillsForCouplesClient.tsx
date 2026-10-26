"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Users,
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
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Copy,
  Check,
  Printer,
  HeartHandshake,
  Layers,
  Gavel,
  Landmark,
  FileText,
  Home,
  Briefcase,
  Globe,
  Share2,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-distinction", label: "1. Mirror Wills vs Joint Wills: What's the Difference?" },
  { id: "asset-protection-matrix", label: "2. How Couple Wills Protect Your Family" },
  { id: "comparative-legal-analysis", label: "3. Comparison: Mirror Wills vs Joint Wills" },
  { id: "joint-will-vulnerabilities", label: "4. Why Single 'Joint Wills' Cause Legal Trouble in India" },
  { id: "visual-blueprint", label: "5. Visual Blueprint of How Mirror Wills Work" },
  { id: "step-by-step-sop", label: "6. Step-by-Step Guide for Husband and Wife" },
  { id: "protective-clauses", label: "7. Essential Clauses Every Couple Should Include" },
  { id: "statutory-risk-matrix", label: "8. Second Marriages & Children from Previous Marriage" },
  { id: "procedural-timeline", label: "9. What Happens When One Spouse Passes Away?" },
  { id: "specialized-scenarios", label: "10. Common Real-Life Scenarios for Couples" },
  { id: "service-pricing", label: "11. Transparent Plans & Pricing" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Relevant Laws & Court Rulings" },
];

const SAMPLE_MIRROR_CLAUSES = `SAMPLE MIRROR WILL CLAUSES FOR HUSBAND AND WIFE IN INDIA

CLAUSE 1: GIFT TO SURVIVING SPOUSE
"I give all my self-acquired property, bank accounts, investments, and shares to my spouse, [Full Legal Name of Spouse], holding PAN [Spouse PAN], if my spouse survives me by at least thirty (30) days."

CLAUSE 2: THIRTY-DAY SURVIVORSHIP RULE
"If my spouse does not live for thirty (30) full days after my death, my spouse will be treated as having died before me. If we die at the same time in a common accident, Clause 3 will apply right away."

CLAUSE 3: GIFT TO CHILDREN IF SPOUSE DIES FIRST
"If my spouse dies before me or does not survive me by thirty (30) days, I give my entire estate in equal shares to my surviving children, namely [Child 1 Name] and [Child 2 Name] (50% each)."

CLAUSE 4: GUARDIAN FOR MINOR CHILDREN
"If my spouse dies before me and any child is still under 18, I appoint my trusted relative, [Guardian Name], residing at [Address], as the legal guardian under Section 60 of the Indian Succession Act, 1925."

CLAUSE 5: FULL RIGHT TO CHANGE THIS WILL
"This is my separate, independent Will. Under Section 62 of the Indian Succession Act, 1925, I keep the full legal right to change, update, or cancel this Will at any time during my life without asking anyone."`;

export default function MirrorWillsForCouplesClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeId, setActiveId] = useState<string>("statutory-distinction");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedSample, setCopiedSample] = useState(false);
  const [showHighResModal, setShowHighResModal] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".scroll-target");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -40% 0px",
        threshold: 0.05,
      }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      }
    } else {
      router.push("/start");
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(SAMPLE_MIRROR_CLAUSES);
      setCopiedSample(true);
      setTimeout(() => setCopiedSample(false), 2500);
    }
  };

  return (
    <div className="bg-[#FAF7F0] text-[#172228] min-h-screen selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-[#172228] to-[#10181D] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-semibold text-rose-200">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C65378]" />
            <span>ESTATE PLANNING FOR MARRIED COUPLES</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs max-w-4xl mx-auto">
            Mirror Wills for Couples: Two Coordinated Wills in India
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Protect your spouse and children with ease.
            Avoid risky joint wills.
            Make two separate wills that match each other under the Indian Succession Act, 1925.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm sm:text-base hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25 cursor-pointer"
            >
              <span>Draft Your Couple Will Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#comparative-legal-analysis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-bold text-sm sm:text-base hover:bg-white/15 transition-all border border-white/20"
            >
              <span>Mirror vs Joint Will Guide</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP
          ========================================================================= */}
      <section className="bg-gradient-to-r from-rose-50/90 via-amber-50/50 to-slate-100 border-b border-slate-200/80">
        <div className="max-w-[1720px] mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-2 md:pt-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#172228]">20,000+</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#55636D]">Couples Protected</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#172228]">₹4,500Cr+</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#55636D]">Family Assets Coordinated</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#172228]">100%</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#55636D]">Independent Probate</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9 / 5</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#55636D]">Google Client Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          
          {/* LEFT COLUMN: TABLE OF CONTENTS */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Contents Architecture
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-4 border-[#C65378] shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Authority</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                Complies with Sections 59, 62, 63 &amp; 67 of the Indian Succession Act, 1925 and Section 18 of the Registration Act, 1908.
              </p>
            </div>
          </aside>

          {/* MIDDLE COLUMN: EDITORIAL CONTENT */}
          <main className="space-y-8 md:space-y-12 min-w-0">
            
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border-l-[6px] border-l-[#C65378] border border-slate-200/90 p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>EXECUTIVE BRIEF FOR MARRIED COUPLES</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                Key Takeaways: Why Indian Couples Need Mirror Wills
              </h2>
              <ul className="space-y-3 text-sm md:text-base text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Separate Legal Papers:</strong> Mirror wills use two separate documents. Each spouse signs their own will. The terms match and protect the family.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Avoids Joint Will Disputes:</strong> A single joint will is very risky in India. Land registry offices often reject them. Courts find them hard to settle.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Right to Change Your Will:</strong> Under Section 62 of the law, you keep the right to change your will. If life changes, you can write a new will anytime.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day Survival Clause:</strong> If both spouses die in the same accident, assets pass directly to your children. This saves time, court fees, and tax.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Appoint Child Guardians:</strong> Both parents name the same trusted person to raise their children. This stops custody fights among relatives.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY DISTINCTION */}
            <section id="statutory-distinction" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Statutory Distinction: Mirror Wills vs Risky Joint Wills
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many married couples in India ask if they can sign one single will together.
                A single document may sound easy, but Indian law treats joint wills with great caution.
                Most top estate lawyers advise couples to use mirror wills instead.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under the Indian Succession Act, 1925, a will declares how one person wants their property distributed after death.
                With mirror wills, the husband signs his own will, and the wife signs hers.
                The main terms match. Each spouse leaves their property to the other.
                When the second spouse dies, all assets pass to the children.
              </p>
              <div className="bg-rose-50/70 border border-[#C65378]/30 rounded-2xl p-5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-[#C65378] mb-1">
                  <AlertCircle className="w-4 h-4 text-[#C65378]" />
                  <span>The Golden Rule: Section 62 of the Indian Succession Act</span>
                </div>
                <p>
                  Section 62 of the law says that any person who is of sound mind can change or cancel their will at any time.
                  Mirror wills keep this right safe.
                  Each spouse signs in front of two adult witnesses under Section 63.
                  This makes the will fully valid, safe, and easy to prove in court.
                </p>
              </div>
            </section>

            {/* SECTION 2: REPRESENTATIVE ASSET ALLOCATION MATRIX */}
            <section id="asset-protection-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span>PORTFOLIO ALLOCATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Asset Protection Matrix: Representative Couple Estate Plan
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Most modern Indian families own many kinds of assets.
                These include joint flats, single bank accounts, mutual funds, and gold.
                The table below shows how mirror wills protect family property.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Asset Type</th>
                        <th className="py-3.5 px-4 font-bold">How Owned</th>
                        <th className="py-3.5 px-4 font-bold">Risk Without a Will</th>
                        <th className="py-3.5 px-4 font-bold">How a Mirror Will Protects It</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Joint House or Flat</td>
                        <td className="py-3 px-4">Husband and Wife (50:50)</td>
                        <td className="py-3 px-4 text-rose-600 font-medium">Half share splits among in-laws and kids</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Surviving spouse gets full ownership right away</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Shares &amp; Mutual Funds</td>
                        <td className="py-3 px-4">Single Name of Spouse</td>
                        <td className="py-3 px-4 text-rose-600 font-medium">Nominee only holds funds; other heirs can sue</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Given directly to spouse with zero dispute</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Bank Fixed Deposits</td>
                        <td className="py-3 px-4">Either or Survivor Account</td>
                        <td className="py-3 px-4 text-amber-700 font-medium">Survivor collects money but owes shares to heirs</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Will gives absolute ownership to surviving spouse</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Self-Acquired Land or Office</td>
                        <td className="py-3 px-4">Single Name</td>
                        <td className="py-3 px-4 text-rose-600 font-medium">Forced co-ownership with distant family members</td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">Transfers cleanly to spouse, then to children</td>
                      </tr>
                      <tr className="bg-slate-50/90 font-bold text-slate-900">
                        <td className="py-3.5 px-4" colSpan={2}>Overall Family Protection</td>
                        <td className="py-3.5 px-4 text-rose-600">High Risk of Family Disputes</td>
                        <td className="py-3.5 px-4 text-emerald-700">100% Peace of Mind for Both Spouses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparative-legal-analysis" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Comparative Legal Analysis: Mirror Will vs Joint vs Mutual
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many people do not know the difference between mirror wills, joint wills, and mutual wills.
                Each type works very differently in India.
                The comparison table below explains the key differences.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Key Feature</th>
                        <th className="py-3.5 px-4 font-bold text-emerald-400">Mirror Wills (Recommended)</th>
                        <th className="py-3.5 px-4 font-bold text-rose-300">Joint Will (Single Paper)</th>
                        <th className="py-3.5 px-4 font-bold text-amber-300">Mutual Will (Binding Contract)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Number of Documents</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Two separate wills</td>
                        <td className="py-3 px-4 text-rose-600">One single document for both</td>
                        <td className="py-3 px-4 text-slate-600">One or two documents</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Right to Change During Life</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Either spouse can change anytime</td>
                        <td className="py-3 px-4 text-amber-700 font-medium">May need consent of both spouses</td>
                        <td className="py-3 px-4 text-rose-600">Changing it breaches contract</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">After First Spouse Dies</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Surviving spouse can update will</td>
                        <td className="py-3 px-4 text-rose-600">Legal doubts over survivor share</td>
                        <td className="py-3 px-4 text-rose-600">Survivor is locked into terms</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Court Probate Process</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Smooth and fast court approval</td>
                        <td className="py-3 px-4 text-rose-600 font-medium">Hard; court must separate shares</td>
                        <td className="py-3 px-4 text-amber-700">Often challenged by other heirs</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Registration at SRO</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Easy; registered per person</td>
                        <td className="py-3 px-4 text-rose-600 font-medium">Registry offices often object</td>
                        <td className="py-3 px-4 text-slate-600">Requires complex contract terms</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Risk of Lawsuits</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Very low; clear legal rules</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">Very high; frequent family suits</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">High; costly civil disputes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: WHY JOINT WILLS ARE LEGALLY VULNERABLE */}
            <section id="joint-will-vulnerabilities" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span>LEGAL PITFALLS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Why Joint Wills Are Legally Vulnerable under Indian Law
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many couples believe that writing one joint will saves time and money.
                However, Indian court cases show the opposite.
                Here are the three big reasons lawyers advise against single joint wills:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    Sub-Registrar Office Difficulties
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Under the Registration Act, 1908, wills are filed in Book 3.
                    Government software systems require a single name for each will.
                    When two people present one joint document, officers often raise objections.
                    This can delay or block registration for months.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    Probate Delays When the First Spouse Dies
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Probate is required by law in cities like Mumbai, Kolkata, and Chennai.
                    When one spouse passes away, the court must decide how to handle a will when the other spouse is still alive.
                    The Supreme Court stated in <em>Kochu Govindan Kaimal v. Gopalan Nair</em> that a joint will works as two separate wills.
                    Even so, separating joint properties in one paper often leads to years of court delays.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    Lack of Flexibility for the Surviving Spouse
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Life changes after a spouse dies.
                    A surviving partner may need to sell a house to pay for hospital care.
                    A joint will may trap the surviving spouse, making it hard to sell or manage property.
                    Relatives might claim the will cannot be changed, leading to painful lawsuits.
                    Mirror wills avoid this problem completely.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>VISUAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Visual Blueprint: Anatomy of Coordinated Indian Mirror Wills
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Visualizing the legal structure of Mirror Wills ensures no essential protection is overlooked.
                Click on the diagram below to inspect the structure, attestation blocks, and clauses in high resolution.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div
                  className="relative aspect-[1200/630] w-full cursor-pointer bg-[#172228] overflow-hidden"
                  onClick={() => setShowHighResModal(true)}
                >
                  <Image
                    src="/images/mirror-wills-for-couples-og.jpg"
                    alt="Visual Blueprint: Anatomy of Coordinated Indian Mirror Wills for Couples"
                    fill
                    className="object-contain hover:scale-[1.01] transition-transform duration-300"
                    priority
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <span>Figure 1: Standard structure and attestation of coordinated Mirror Wills for couples</span>
                  <a
                    href="/images/mirror-wills-for-couples-og.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline cursor-pointer"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>EXECUTION WORKFLOW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Step-by-Step SOP: Executing Dual Mirror Wills in India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Writing mirror wills requires two steps: matching the plans and signing separate papers.
                Follow these six simple steps to ensure your wills are legally sound.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">List All Your Family Assets</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Make a list of all your properties and investments.
                      Include home deed numbers, bank accounts, mutual funds, and shares.
                      Write down all existing nominee names.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Choose Heirs and Child Guardians</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Agree on who inherits if both of you die together in an accident.
                      Usually, assets go equally to your children.
                      If your children are under 18, name a trusted legal guardian.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Draft Two Separate Wills</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Prepare one will for the husband and one for the wife.
                      Each will gives property to the surviving spouse first.
                      Both wills must state that each person keeps the right to change their own will.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Pick Two Independent Witnesses</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Choose two adults who are not getting anything from the will.
                      Under Section 67 of the law, a beneficiary cannot be a witness.
                      You can use the same two witnesses for both wills, but sign each will separately.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Sign Both Wills on Plain Paper</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Print both wills on clean white A4 paper. Stamp paper is not required in India.
                      Each spouse signs every page while the two witnesses watch.
                      Then, both witnesses sign the attestation block.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Register and Keep in Safe Custody</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Registration is optional under Section 18 of the Registration Act, but it adds safety.
                      Both spouses can register their wills at the local Sub-Registrar office.
                      Store the signed originals in a bank locker and share copies with your executor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: KEY PROTECTIVE CLAUSES */}
            <section id="protective-clauses" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>ESSENTIAL DRAFTING CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Key Protective Clauses Every Married Couple Must Include
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                A strong mirror will protects your family from legal headaches.
                Make sure your lawyer includes these four vital terms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">30-Day Survival Clause</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This clause states that your spouse must live for 30 days after your death to inherit.
                    If both die in the same accident, property goes right to the children.
                    This avoids double probate fees and double stamp duty.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Legal Guardian for Children</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Both parents name the same guardian under Section 60 of the Indian Succession Act.
                    This prevents bitter custody fights among extended relatives if both parents die early.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Equal Shares for Children</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This clause sets clear shares for your children.
                    It also protects grandchildren if a child passes away before you do.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Access to Digital Assets</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This gives your spouse or executor the legal right to access bank apps, demat accounts, and email.
                    It helps your family manage your accounts without long legal disputes.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                      Standard Indian Mirror Will Clauses (ISA 1925)
                    </span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all cursor-pointer"
                  >
                    {copiedSample ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied Clauses</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Sample Clauses</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-4 text-[11px] sm:text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-64 pr-2">
                  {SAMPLE_MIRROR_CLAUSES}
                </pre>
              </div>
            </section>

            {/* SECTION 8: BLENDED FAMILIES & STATUTORY RISK MATRIX */}
            <section id="statutory-risk-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span>RISK MANAGEMENT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Statutory Risk Matrix: Blended Families &amp; Inherited Assets
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Standard mirror wills work great when both spouses have the same children.
                However, for blended families or ancestral property, you need extra care.
                The table below outlines common risks and their legal fixes.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-4 font-bold">Family Setup</th>
                        <th className="py-3 px-4 font-bold">Risk Level</th>
                        <th className="py-3 px-4 font-bold">Risk With Simple Will</th>
                        <th className="py-3 px-4 font-bold">Recommended Legal Fix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">First Marriage with Common Kids</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Low Risk</td>
                        <td className="py-3 px-4">Both parents share the same goal</td>
                        <td className="py-3 px-4 text-emerald-700">Standard mirror wills with 30-day survival rule</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Blended Family with Stepchildren</td>
                        <td className="py-3 px-4 text-rose-600 font-bold">High Risk</td>
                        <td className="py-3 px-4">Surviving spouse could change will and exclude stepkids</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">Life-interest will: spouse gets income, kids get property</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Ancestral Family Property</td>
                        <td className="py-3 px-4 text-amber-700 font-bold">High Risk</td>
                        <td className="py-3 px-4">Cannot gift undivided family land by will</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">Include only self-acquired property and your own share</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Family Business or Startup</td>
                        <td className="py-3 px-4 text-amber-700 font-bold">Medium Risk</td>
                        <td className="py-3 px-4">Spouse without business knowledge may freeze operations</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">Name a business executor to vote while spouse gets profits</td>
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
                <span>SUCCESSION TIMELINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Procedural Timeline: First Death to Final Asset Distribution
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Knowing how mirror wills work over time gives couples peace of mind.
                Here is the sequence of events from signing to final transfer.
              </p>

              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-4 font-bold">Stage</th>
                        <th className="py-3 px-4 font-bold">What Happens</th>
                        <th className="py-3 px-4 font-bold">Legal Action Needed</th>
                        <th className="py-3 px-4 font-bold">Property Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr className="bg-blue-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-blue-900">STAGE 1</td>
                        <td className="py-3 px-4 font-medium">Both Spouses Alive</td>
                        <td className="py-3 px-4">Sign wills before 2 witnesses; optional SRO visit</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">100% Owned by Spouses</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">STAGE 2</td>
                        <td className="py-3 px-4 font-medium">First Spouse Dies</td>
                        <td className="py-3 px-4">Get death certificate; inform banks and societies</td>
                        <td className="py-3 px-4 text-slate-600">30-day survival clock starts</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">STAGE 3</td>
                        <td className="py-3 px-4 font-medium">Day 31 After Demise</td>
                        <td className="py-3 px-4">Surviving spouse claims full property using will</td>
                        <td className="py-3 px-4 text-emerald-700 font-semibold">Transfers to Survivor</td>
                      </tr>
                      <tr className="bg-amber-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-amber-900">STAGE 4</td>
                        <td className="py-3 px-4 font-medium">Survivor Life Stage</td>
                        <td className="py-3 px-4">Survivor lives peacefully; can update will if needed</td>
                        <td className="py-3 px-4 text-slate-800 font-medium">Full Survivor Enjoyment</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">STAGE 5</td>
                        <td className="py-3 px-4 font-medium">Second Spouse Dies</td>
                        <td className="py-3 px-4">Executor steps in; fallback clauses take effect</td>
                        <td className="py-3 px-4 text-blue-700 font-medium">Ready for Distribution</td>
                      </tr>
                      <tr className="bg-emerald-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-900">STAGE 6</td>
                        <td className="py-3 px-4 font-medium">Transfer to Children</td>
                        <td className="py-3 px-4">Children receive equal shares; guardians act if minors</td>
                        <td className="py-3 px-4 text-emerald-700 font-extrabold">Final Generation Settled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 10: FOUR SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4 text-[#C65378]" />
                <span>REAL-WORLD APPLICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Specialized Scenarios: Business Owners, NRIs &amp; Minor Heirs
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Different families have different needs.
                Here is how mirror wills help four common types of couples:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Home className="w-5 h-5 text-[#C65378]" />
                    <h3>Parents with Young Children</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If both parents pass away without naming a guardian, courts must decide custody under the Guardians and Wards Act.
                    This can spark ugly fights between grandparents.
                    Mirror wills name one guardian and set aside funds for your children&apos;s education.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h3>NRI Couples with Assets in India</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Indian real estate is governed by Indian law under Section 5 of the Indian Succession Act.
                    Foreign wills often take a long time to get court approval in India.
                    NRI couples should make separate Indian mirror wills just for their Indian assets.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <h3>Business Founders and Partners</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Company shares must follow company rules.
                    Mirror wills can name a business partner to run the company while your spouse receives all the profits.
                    This keeps the business running smoothly.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <HeartHandshake className="w-5 h-5 text-emerald-600" />
                    <h3>Elderly Couples with a Caregiver Child</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Often, one child takes daily care of elderly parents.
                    Mirror wills allow parents to reward that child with a special share or home right.
                    This prevents other siblings from forcing an immediate sale of the house.
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
                11. AMA Couple Will Service: Advocate Drafting &amp; Transparent Fees
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We offer clear, fixed pricing with no hidden charges.
                Choose the legal drafting plan that fits your family best.
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
                        <span>Couple execution checklist</span>
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
                    Most Popular for Couples
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
                        <span>Dual Will vetting by succession counsel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Tailored 30-day survivorship clause</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Guardian appointment &amp; trust audit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Priority advocate email support</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#C65378] text-white font-bold text-xs text-center hover:bg-[#a13c5d] transition-all cursor-pointer shadow-sm"
                  >
                    Select Lawyer Verified
                  </a>
                </div>

                {/* Plan 3: Premium */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#55636D]">Tier 3</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">Connect to Lawyer</h3>
                    <div className="mt-4 mb-4">
                      <span className="text-3xl font-extrabold text-[#172228]">₹9,990</span>
                      <span className="text-xs text-slate-500 block mt-1">1-on-1 Senior Counsel Consult</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Dedicated 45-min strategy video session</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Multi-property &amp; cross-border asset structuring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Custom life-interest clauses for blended families</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>End-to-end drafting &amp; SRO filing guidance</span>
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

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. Frequently Asked Questions: Mirror Wills for Indian Couples
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Clear answers to questions couples often ask about Indian wills.
              </p>

              <div className="space-y-3">
                {[
                  {
                    q: "What is the difference between a Mirror Will and a Joint Will in India?",
                    a: "A Mirror Will is made up of two separate documents: one for the husband and one for the wife. Each spouse leaves their assets to the other, and then to their children. A Joint Will is a single piece of paper signed by both spouses together. In India, lawyers strongly advise against Joint Wills because if one spouse passes away, the survivor cannot easily update the Will or sell property without court battles. Two separate Mirror Wills give both spouses complete peace of mind.",
                  },
                  {
                    q: "Are Joint Wills legal in India, and why are they risky?",
                    a: "While Joint Wills are technically recognized by courts, they cause major practical nightmares. If one spouse dies, sub-registrars and banks often freeze transfers because the document belongs to two people. Furthermore, if the surviving spouse later needs to sell a house to pay for medical care, they may be blocked by relatives claiming the joint will cannot be changed.",
                  },
                  {
                    q: "Can a surviving spouse change their Mirror Will after the first spouse dies?",
                    a: "Yes. Under Section 62 of the Indian Succession Act, every person has the legal right to update or change their own Will during their lifetime. Because Mirror Wills are two separate documents, the surviving spouse can freely adapt their Will to new life circumstances (such as helping a child buy a house or handling medical needs).",
                  },
                  {
                    q: "What is a 30-day survivorship clause and why is it important?",
                    a: "A 30-day survivorship clause says that your spouse must survive you by at least 30 days to inherit your property. If both husband and wife unfortunately pass away together or within days in a common car or flight accident, your property passes straight to your children, completely avoiding double court cases, double stamp duty, and unnecessary delays.",
                  },
                  {
                    q: "How do Mirror Wills protect young children under 18?",
                    a: "Both parents name the exact same trusted guardian (like an aunt, uncle, or grandparent) in their respective Wills under Section 60 of the Indian Succession Act. If both parents pass away together, there is zero confusion or court fighting among relatives over who raises your young children.",
                  },
                  {
                    q: "Do husband and wife need separate witnesses or the same witnesses?",
                    a: "You can use the exact same two trusted adult witnesses (such as family friends or neighbors). However, husband and wife each sign their own separate document in front of both witnesses. Remember: neither spouse nor any of your children can act as a witness (Section 67).",
                  },
                  {
                    q: "Do Mirror Wills have to be registered at the Sub-Registrar Office?",
                    a: "No, registering a Will is optional under Section 18(e) of the Registration Act, 1908. A Will written on plain white paper with two witnesses is 100% legally valid. However, registering both Wills at the local Sub-Registrar Office provides permanent government proof that neither spouse was pressured or forced.",
                  },
                  {
                    q: "What happens if a couple gets divorced after making Mirror Wills?",
                    a: "In India, unlike some Western countries, divorce does NOT automatically cancel a Will! If you separate or divorce, you must write a fresh Will that explicitly cancels your earlier Will (under Sections 62 and 70 of the Indian Succession Act).",
                  },
                  {
                    q: "How do Mirror Wills protect children from a previous marriage?",
                    a: "If you have children from a previous marriage, simply leaving everything to your new spouse could leave your children with nothing if your spouse later writes a new Will. Instead, a couple's Will can give your spouse a 'life interest' (the right to live in the house and receive rental income for life), while ensuring that ownership permanently transfers to your children afterward.",
                  },
                  {
                    q: "Does a nominee on joint bank accounts or flats override our Mirror Wills?",
                    a: "No! The Supreme Court of India (Ram Chander Talwar and Sarbati Devi) has ruled that a nominee is only a temporary caretaker, not the owner. The wishes written in your valid Will always override bank or housing society nominee records.",
                  },
                ].map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span>LEGAL CITATIONS &amp; VERIFIED SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                13. Statutory Authority Citations &amp; Official Judicial Precedents
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                This legal analysis is grounded in codified Indian succession statutes and binding Supreme Court decisions:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-slate-900">Indian Succession Act, 1925:</strong>
                  <span className="block mt-0.5">
                    Section 59 (Testamentary capacity of adult persons of sound mind); Section 60 (Testamentary guardianship);
                    Section 62 (Statutory revocability and alteration of Wills during life); Section 63 (Mandatory execution before two witnesses);
                    Section 67 (Disqualification of beneficiary witnesses); Section 70 (Methods of revocation).
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-slate-900">Registration Act, 1908:</strong>
                  <span className="block mt-0.5">
                    Section 18(e) (Optional registration of testamentary documents); Section 40 &amp; 41 (Persons entitled to present Wills and registration procedure);
                    Book 3 registry protocols.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-slate-900">Landmark Judicial Precedents:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <em>Kochu Govindan Kaimal v. Thayankoot Thekkethil Gopalan Nair (AIR 1959 SC 71)</em>: Supreme Court establishing that joint wills operate as the separate will of each testator with respect to their property.
                    </li>
                    <li>
                      <em>Dilharshankar C. Bhachech v. Controller of Estate Duty (AIR 1986 SC 1707)</em>: Distinction between mutual wills, agreements, and constructive trusts upon first demise.
                    </li>
                    <li>
                      <em>Ram Chander Talwar &amp; Anr. v. Devender Kumar Talwar (2010 10 SCC 671)</em>: Supreme Court confirming that bank nomination does not confer ownership over the lawful testamentary heirs.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Verified Government &amp; Legal Authorities:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                    <span>India Code: Indian Succession Act 1925</span>
                  </a>
                  <a
                    href="https://main.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                    <span>Supreme Court of India Official Portal</span>
                  </a>
                  <a
                    href="https://amalegalsolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>AMA Legal Solutions Estate Practice</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Related WillDrafting Guides &amp; Services:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/service/will-registration"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                  >
                    <span>Will Registration Service</span>
                  </Link>
                  <Link
                    href="/service/probate-lawyer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                  >
                    <span>Probate Lawyers India</span>
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                  >
                    <span>Free Indian Will Format</span>
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                  >
                    <span>Documents Checklist Tool</span>
                  </Link>
                </div>
              </div>
            </section>

          </main>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside className="space-y-5 sticky top-6">
            
            {/* CARD 1: AUTHOR PROFILE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-bold text-sm font-bold flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Advocate Anuj Anand Malik</h3>
                  <p className="text-[11px] font-semibold text-[#C65378]">Senior Succession Counsel</p>
                  <p className="text-[10px] text-slate-500">AMA Legal Solutions</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                Specializing in high-value family estate planning, cross-border NRI inheritance, and contested probate representation across High Courts in India.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Legal Author</span>
                </span>
                <span className="font-semibold text-slate-700">14+ Yrs Exp</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: CONFIDENTIAL CTA CARD */}
            <div className="hidden lg:block rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C65378]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200 mb-3">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL ESTATE SHIELD</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold leading-snug">
                Planning Your Estate as a Couple?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Avoid costly single joint wills. Protect your spouse and children with customized, legally verified Mirror Wills today.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md"
              >
                <span>Draft Your Couple Will</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Confidential Advocate Consultation</span>
              </div>
            </div>

            {/* CARD 3: TRUST CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs pb-3 border-b border-slate-100">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>The WillDrafting Guarantee</span>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Zero Single Joint Will Risk:</strong> Independent legal instruments eliminate probate deadlocks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Section 63 Compliant:</strong> Two-witness attestation guidelines included with every draft.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">High Court Advocate Vetting:</strong> Backed by senior estate counsel at AMA Legal Solutions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Encrypted Digital Vault:</strong> Safely store your couple drafts with secure access.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Share2 className="w-4 h-4 text-[#C65378]" />
                <span>Essential Estate Guides</span>
              </div>
              
              <Link
                href="/service/will-registration"
                className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
              >
                <span className="font-bold text-xs text-slate-900 block">Will Registration Service</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  Sub-Registrar process &amp; home visits &rarr;
                </span>
              </Link>

              <Link
                href="/tools/will-checklist"
                className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
              >
                <span className="font-bold text-xs text-slate-900 block">Will Preparation Checklist</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  Interactive asset checklist for couples &rarr;
                </span>
              </Link>

              <Link
                href="/templates/codicil-format-india"
                className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
              >
                <span className="font-bold text-xs text-slate-900 block">Codicil Format in India</span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  How to amend an existing Will legally &rarr;
                </span>
              </Link>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
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
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/blogs/will-vs-family-trust-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will vs Family Trust
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION MODAL
          ========================================================================= */}
      {showHighResModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHighResModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                Visual Blueprint: Mirror Wills vs Joint Wills Architecture (Indian Succession Act 1925)
              </span>
              <button
                onClick={() => setShowHighResModal(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-bold"
              >
                Close ✕
              </button>
            </div>
            <div className="relative flex-1 min-h-[400px] md:min-h-[550px] w-full mt-3 bg-[#172228] rounded-xl overflow-hidden">
              <Image
                src="/images/mirror-wills-for-couples-og.jpg"
                alt="High Resolution Visual Blueprint: Mirror Wills Architecture"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}