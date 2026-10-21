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
  Coins,
  Calculator,
  ChevronRight,
  FileSpreadsheet,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is a Succession Certificate?" },
  { id: "eligible-assets", label: "2. Which Assets Qualify (Bank Accounts, Shares & FDs)" },
  { id: "comparison-matrix", label: "3. Succession Certificate vs Legal Heir Certificate" },
  { id: "eligibility-criteria", label: "4. Who is Eligible to Apply?" },
  { id: "visual-blueprint", label: "5. Visual Guide to the Court Process" },
  { id: "step-by-step-sop", label: "6. Step-by-Step Court Process" },
  { id: "mandatory-documents", label: "7. Documents & Paperwork Required" },
  { id: "court-fee-structure", label: "8. State Court Fees & Maximum Limits" },
  { id: "procedural-timeline", label: "9. Expected Court Timelines" },
  { id: "caveats-and-objections", label: "10. What Happens if a Relative Objects?" },
  { id: "why-draft-a-will", label: "11. How Writing a Will Saves You from Court" },
  { id: "ama-legal-services", label: "12. Our Legal Support & Services" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Relevant Laws & Official Resources" },
];

const FAQS = [
  {
    q: "What is a Succession Certificate in simple words?",
    a: "A Succession Certificate is an official document issued by a District Civil Court under Part X (Sections 370-390) of the Indian Succession Act, 1925. When someone passes away without leaving a Will, this court certificate gives their legal heirs the official authority to claim bank balances, fixed deposits, shares, and mutual funds.",
  },
  {
    q: "Can I use a Succession Certificate for a house, flat, or land?",
    a: "No! Under Section 370 of the Indian Succession Act, a Succession Certificate is strictly for movable assets (bank accounts, shares, mutual funds, PF, or money owed to the deceased). It can NEVER be used for land, flats, or houses. For land or property left without a Will, family heirs must get a Legal Heir Certificate for revenue mutation or apply for Letters of Administration in court.",
  },
  {
    q: "What is the difference between a Succession Certificate and a Legal Heir Certificate?",
    a: "A Legal Heir Certificate (also called Varisu or Surviving Member Certificate) is issued by a local revenue officer (like the Tehsildar or SDM) to establish family relationships for government pensions, employment dues, and property tax name changes. A Succession Certificate is a formal judicial order issued ONLY by a District Court, and is required by banks and mutual funds when someone passes away without a Will and significant money (usually over ₹5 to ₹15 Lakhs) is involved.",
  },
  {
    q: "Which court do I need to go to?",
    a: "Under Section 371 of the Act, you must file the petition in the District Civil Court where the deceased person was permanently living at the time of death. If they had no permanent residence in India, it can be filed in the District Court where their bank accounts or shares are located.",
  },
  {
    q: "How long does it take to get a Succession Certificate from court?",
    a: "If no family member objects (uncontested), it typically takes 3 to 6 months. This gives the court time to issue public newspaper notices (giving 30 to 45 days for anyone to object), verify family identity papers, and calculate the court fees. If a relative disputes the claim, the case can take 12 to 24 months.",
  },
  {
    q: "How much is the court fee for a Succession Certificate?",
    a: "Court fees are calculated as a percentage (typically 2% to 7%) of the total bank balances and shares being claimed. Some states place a ceiling cap (for example, Maharashtra caps the maximum fee at ₹75,000), while other states have no maximum cap. You can check the exact fee for your state using our online court fee calculator.",
  },
  {
    q: "Can all siblings apply together in one petition?",
    a: "Yes! All legal heirs can apply together as joint petitioners. Alternatively, one family member can apply on behalf of everyone, provided all other brothers, sisters, and the surviving parent sign written No Objection Certificates (NOCs) and consent affidavits.",
  },
  {
    q: "Does a bank nominee own the money instead of the certificate holder?",
    a: "No. The Supreme Court of India (Sarbati Devi and Shakti Yezdani) has clarified that a bank nominee is merely a temporary caretaker (trustee) who holds the funds for the true legal heirs. The person holding a court Succession Certificate has the full legal right to receive the funds from the nominee.",
  },
  {
    q: "Can an NRI apply for a Succession Certificate without visiting India?",
    a: "Yes. An NRI can execute a Special Power of Attorney (PoA) in their country of residence, attested by the local Indian Embassy or apostilled. Their authorized lawyer or relative in India can then file the court petition, attend hearings, and collect the certificate without the NRI having to travel to India.",
  },
  {
    q: "How does writing a Will avoid this court process entirely?",
    a: "A Succession Certificate is needed strictly when someone dies without a Will. If the deceased wrote a valid Will naming an executor and beneficiaries, banks and mutual funds transfer the money directly based on the Will and death certificate. This completely spares your family from paying 2% to 7% court fees, spending on newspaper advertisements, and waiting 6 months in court.",
  },
];

export default function SuccessionCertificateClient() {
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
            <span>INDIAN SUCCESSION ACT 1925 &bull; PART X &bull; DISTRICT CIVIL COURT ADVOCACY</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Succession Certificate in India: Court Process &amp; Lawyers
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Claim deceased bank balances, demat shares, mutual fund folios, and institutional debts with complete legal backing. AMA Legal Solutions drafts your civil court petition, coordinates newspaper citations, and secures the judicial grant end-to-end.
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
              href="/tools/succession-certificate-court-fee-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <Calculator className="w-4 h-4 text-rose-300" />
              <span>Calculate State Court Fees</span>
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
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Civil Court Counsel
              </span>
            </div>

            {/* Stat 2: Petitions Secured */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                1,200+ Petitions
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Certificates Secured
              </span>
            </div>

            {/* Stat 3: Value Recovered */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹450Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Financial Assets Claimed
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
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm min-[400px]:text-base sm:text-lg font-black text-[#172228] leading-none">
                    4.8/5
                  </span>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-0.5">
                  350+ Verified Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Widescreen Layout)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Table of Contents
                </span>
              </div>
              <nav className="max-h-[calc(100vh-170px)] overflow-y-auto space-y-1 text-xs pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-2.5 rounded-lg transition-colors leading-snug ${
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
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                <span>Part X ISA 1925 Verified</span>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <div className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-[5px] border-l-[#C65378] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                <BookmarkIcon className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: SUCCESSION CERTIFICATES AT A GLANCE</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Statutory Jurisdiction:</strong> Issued exclusively by a competent District Civil Court under Part X (Sections 370 to 390) of the Indian Succession Act, 1925.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Movable Financial Scope:</strong> Applies strictly to debts and securities (bank balances, fixed deposits, mutual funds, shares, and government securities). It does NOT transfer title to immovable real estate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Conclusive Statutory Indemnity:</strong> Under Section 381, a court-issued Succession Certificate affords complete legal indemnity to banks and debtors upon disbursing funds to the certificate holder.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Nominee Status Overridden:</strong> Nominees are legal custodians, not absolute owners. The certificate holder has paramount authority to receive and distribute deceased estate assets among lawful heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Procedural Timeline:</strong> Uncontested court petitions require 3 to 6 months including mandatory newspaper publication. Having an executed Will completely avoids this court process.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY DEFINITION & FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>PART X OF THE INDIAN SUCCESSION ACT, 1925</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Statutory Definition: Succession Certificate Framework
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  When an individual dies intestate in India without leaving an operative Last Will and Testament, their movable financial assets become legally frozen. Commercial banks, mutual fund asset management companies, depository participants (NSDL and CDSL), and insurance corporations cannot lawfully release funds to family members without formal judicial protection.
                </p>
                <p>
                  Part X of the Indian Succession Act, 1925 provides the statutory mechanism for unfreezing these funds. Under <strong>Section 370</strong>, the District Civil Court grants a Succession Certificate to the rightful legal heirs, empowering them to collect outstanding debts and securities and give a valid discharge to the debtors.
                </p>
                <p>
                  Crucially, <strong>Section 381</strong> creates a statutory indemnity shield. Any commercial bank, corporation, or debtor that disburses money in good faith to the holder of a Succession Certificate is permanently indemnified against all future claims by rival relatives or claimants. This legal guarantee is why institutions routinely demand a Succession Certificate before transmitting substantial assets.
                </p>
              </div>

              {/* Statutory Section Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <Landmark className="w-4 h-4 text-[#C65378]" />
                    <span>Section 371: Court Jurisdiction</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Petitions must be filed before the District Court within whose territorial limits the deceased had their permanent ordinary residence at the time of death, or where their movable assets are situated.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Section 381: Complete Discharge</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The certificate establishes conclusive title against debtors. Payment made to the certificate holder affords absolute legal protection to the issuing bank or financial entity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: MOVABLE ASSETS COVERED */}
            <section id="eligible-assets" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4 text-[#C65378]" />
                <span>SCOPE OF MOVABLE DEBTS &amp; SECURITIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Eligible Movable Assets: Debts &amp; Securities Covered
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Section 370 of the Indian Succession Act strictly delineates the scope of a Succession Certificate to <strong>&quot;debts and securities&quot;</strong>. It cannot be utilized to transfer title to real estate, agricultural parcels, or residential buildings.
                </p>
                <p>
                  The table below outlines the movable asset categories routinely covered in our court petitions and how financial authorities evaluate claims:
                </p>
              </div>

              {/* Asset Data Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Movable Asset Classification &amp; Institutional Authority
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 min-w-[620px]">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Asset Category</th>
                        <th className="px-4 py-3">Verifying Institution</th>
                        <th className="px-4 py-3">Typical Statutory Limit</th>
                        <th className="px-4 py-3">Court Certificate Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Bank Savings &amp; Fixed Deposits</td>
                        <td className="px-4 py-3">Scheduled Commercial Banks (RBI)</td>
                        <td className="px-4 py-3 font-mono">Above ₹5 Lakh (without nominee)</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Mandatory for Full Disbursal</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Demat Equity Shares &amp; Debentures</td>
                        <td className="px-4 py-3">NSDL, CDSL &amp; Listed Corporates</td>
                        <td className="px-4 py-3 font-mono">Above ₹5 Lakh (SEBI circulars)</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Compulsory for Transmission</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Mutual Fund Folios &amp; SIPs</td>
                        <td className="px-4 py-3">AMFI, CAMS &amp; KFintech RTAs</td>
                        <td className="px-4 py-3 font-mono">Above ₹5 Lakh threshold</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Mandatory for Redemption</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Unclaimed Shares &amp; Dividends</td>
                        <td className="px-4 py-3">IEPF Authority (Ministry of Corporate Affairs)</td>
                        <td className="px-4 py-3 font-mono">Form IEPF-5 Claims</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Primary Legal Proof for Heirs</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Employee Provident Fund &amp; Gratuity</td>
                        <td className="px-4 py-3">EPFO &amp; Corporate Employer Trusts</td>
                        <td className="px-4 py-3 font-mono">Unnominated or disputed balance</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Required when claims conflict</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Post Office PPF, NSC &amp; KVP</td>
                        <td className="px-4 py-3">Department of Posts (India Post)</td>
                        <td className="px-4 py-3 font-mono">Accounts above ₹1 Lakh</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Required in Absence of Nomination</td>
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
                <span>HEAD-TO-HEAD COMPARISON MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Comparison Guide: Succession vs Legal Heir Certificate
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  A common point of confusion for bereaved families is whether they need a <strong>Legal Heir Certificate (Varisu)</strong> or a <strong>Succession Certificate</strong>. Both prove family lineage, but their legal weight and institutional acceptance differ fundamentally.
                </p>
                <p>
                  While a Legal Heir Certificate is an administrative document issued by local revenue officials (Tehsildar), a Succession Certificate is a decree issued by a Civil Court under judicial stamp. For an in-depth exploration, review our detailed guide on{" "}
                  <Link
                    href="/blogs/legal-heir-certificate-vs-succession-certificate"
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Legal Heir Certificate vs Succession Certificate
                  </Link>.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Legal Instrument Comparison: Court Grant vs Administrative Order
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 min-w-[640px]">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Parameter</th>
                        <th className="px-4 py-3">Succession Certificate</th>
                        <th className="px-4 py-3">Legal Heir Certificate (Varisu)</th>
                        <th className="px-4 py-3">Letters of Administration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Issuing Authority</td>
                        <td className="px-4 py-3 font-semibold text-emerald-800">District Civil Court / High Court</td>
                        <td className="px-4 py-3 text-slate-600">Tehsildar / Taluk Revenue Officer</td>
                        <td className="px-4 py-3 font-semibold text-emerald-800">District Judge / High Court</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Governing Statute</td>
                        <td className="px-4 py-3 font-mono">Part X (Sec 370-390) ISA 1925</td>
                        <td className="px-4 py-3 font-mono">State Revenue Department Rules</td>
                        <td className="px-4 py-3 font-mono">Sec 218 &amp; 232 ISA 1925</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Permissible Assets</td>
                        <td className="px-4 py-3 font-bold text-slate-900">Movable Debts &amp; Securities Only</td>
                        <td className="px-4 py-3 text-slate-600">Lineage verification &amp; family pensions</td>
                        <td className="px-4 py-3 font-bold text-slate-900">Both Movable &amp; Immovable Estates</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Bank Acceptance</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">100% Conclusive (Sec 381)</td>
                        <td className="px-4 py-3 text-rose-700 font-semibold">Rejected for claims &gt; ₹5 Lakh</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">100% Conclusive</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Typical Processing Time</td>
                        <td className="px-4 py-3 font-mono">3 to 6 Months (Court Hearing)</td>
                        <td className="px-4 py-3 font-mono">15 to 30 Days (Revenue Inquiry)</td>
                        <td className="px-4 py-3 font-mono">6 to 12 Months</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Applicable Fees</td>
                        <td className="px-4 py-3 text-slate-700">2% to 7% state court fee</td>
                        <td className="px-4 py-3 text-emerald-700">Nominal revenue stamp (₹20 to ₹100)</td>
                        <td className="px-4 py-3 text-slate-700">Ad-valorem state probate duty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: ELIGIBILITY & WHO CAN APPLY */}
            <section id="eligibility-criteria" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4 text-[#C65378]" />
                <span>LOCUS STANDI &amp; SUCCESSION LAWS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Eligibility Criteria: Who Can File Court Petition
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Under Section 372 of the Indian Succession Act, any individual claiming a beneficial interest in the debts or securities of the deceased has locus standi to petition the court. The applicant must establish their exact statutory pedigree under their respective personal succession laws:
                </p>
              </div>

              {/* 2x2 Grid of Succession Classes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Class I Heirs (Hindu Succession Act, 1956)</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Widow, sons, daughters, and mother inherit simultaneously in equal shares. Class I heirs have the foremost priority to file the petition or grant mutual No Objection Certificates (NOCs) to a co-heir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>Class II Heirs &amp; Agnates / Cognates</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If no Class I heir survives, Class II relatives (father, siblings, grandchildren, nephews/nieces) can petition the court in the exact preferential order specified in the Schedule to the Act.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-purple-600" />
                    <span>Christian &amp; Parsi Statutory Rules</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governed directly by Chapter II &amp; III of the Indian Succession Act, 1925. The surviving spouse takes one-third of the estate, with two-thirds distributed equally among surviving children.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span>Joint Petitions &amp; Minor Legal Heirs</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All legal heirs may file jointly as co-petitioners. Minor children must be represented through their natural guardian (mother or father) or a court-appointed legal guardian under the Guardians and Wards Act.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>VISUAL COURT PROTOCOL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Visual Blueprint: Court Petition &amp; Issuance Flowchart
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The diagram below illustrates the complete statutory journey under Part X of the Indian Succession Act, 1925. From gathering asset schedules and filing the verified petition to newspaper publication and certificate sealing, every milestone requires precise legal compliance.
              </p>

              {/* Responsive Container for Blueprint Image */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/succession-certificate-og.jpg"
                    alt="Visual Blueprint of Succession Certificate Legal Procedure and Civil Court Advocacy in India"
                    width={1376}
                    height={768}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: Official Succession Certificate filing framework, court citations, and financial asset transmission
                  </span>
                  <Link
                    href="/images/succession-certificate-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>SIX-STAGE STATUTORY PROCEDURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Step-by-Step SOP: Six-Stage Court Petition Procedure
              </h2>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      1
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 1: Asset Auditing &amp; Locus Standi Verification
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    Our testamentary advocates conduct an exhaustive audit of all frozen assets. We verify bank passbooks, fixed deposit receipts, demat account statements, and mutual fund folios. We confirm that the deceased had no known testamentary Will and establish the petitioner&apos;s legal pedigree under personal succession laws.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      2
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 2: Drafting Petition Under Section 372 of ISA
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    We prepare a comprehensive court petition detailing: (a) exact date and time of demise; (b) ordinary place of residence of the deceased; (c) full family genealogical tree; (d) detailed Schedule of Debts and Securities with exact asset valuations; and (e) solemn verification that no prior petition or conflicting grant exists.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      3
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 3: Filing in District Court &amp; Summons to Heirs
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    The petition is filed before the competent District Judge or Senior Civil Judge. The court examines preliminary documentation, admits the case, registers a testamentary civil miscellaneous petition (TEST CAS), and issues formal summons to all non-applicant legal heirs.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      4
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 4: Mandatory Newspaper Publication &amp; 30-Day Notice
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    Under Section 373(1), the judge orders publication of public citations in two daily newspapers—one in the regional vernacular language and one in English circulated in the district. The citation grants the general public and potential creditors a statutory window of 30 to 45 days to file written objections (caveats).
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      5
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 5: Summary Judicial Inquiry &amp; Evidence Recording
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    Upon expiry of the public citation window without objections, the court conducts a summary judicial inquiry under Section 373(2). Our counsel presents the petitioner, marks the original Death Certificate as Exhibit P1, and tenders supporting affidavits and NOCs from other legal heirs.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs shrink-0">
                      6
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Stage 6: Court Fee Deposit, Surety Bond &amp; Certificate Grant
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                    The District Judge passes the final judgment granting the Succession Certificate. The petitioner deposits the requisite state judicial stamp duty, executes an indemnity bond with sureties under Section 375 if ordered, and receives the sealed parchment certificate signed by the Registrar.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: MANDATORY DOCUMENTS */}
            <section id="mandatory-documents" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>COMPREHENSIVE FILING DOSSIER</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Mandatory Documents: Filing Checklist &amp; Affidavits
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Defective documentation is the primary reason petitions languish in court registries. Our legal team drafts, reviews, and assembles the complete court dossier prior to filing:
                </p>
              </div>

              {/* Checklist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Petitioner &amp; Deceased Identification</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                    <li>Original Death Certificate issued by Municipal Corporation</li>
                    <li>Aadhaar Card, PAN Card, and Voter ID of the deceased</li>
                    <li>KYC documentation of all petitioners and surviving legal heirs</li>
                    <li>Notarized Surviving Member Certificate or family tree affidavit</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Schedule of Debts &amp; Securities</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                    <li>Original bank letters confirming frozen balances and FD values</li>
                    <li>Client Master List (CML) and holding statement from Demat DP</li>
                    <li>Mutual fund consolidated account statement (CAS) with NAV dates</li>
                    <li>Insurance policy schedules and unpaid corporate dividend records</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>No Objection &amp; Consent Affidavits</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                    <li>NOC Affidavits from non-petitioner heirs on non-judicial stamp paper</li>
                    <li>Passport copies and Embassy-notarized PoA for overseas NRIs</li>
                    <li>Relinquishment or disclaimer statements for specific securities</li>
                    <li>Guardianship affidavits where minor children are co-heirs</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Court Registry Compliances</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                    <li>Verified Petition under Section 372 signed by advocate</li>
                    <li>Vakalatnama authorizing AMA Legal Solutions advocates</li>
                    <li>Process fee chalan for service of summons to respondents</li>
                    <li>Draft citation formats for vernacular and English newspapers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 8: COURT FEE STRUCTURE */}
            <section id="court-fee-structure" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4 text-[#C65378]" />
                <span>STATE COURT FEES &amp; STATUTORY CAPS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Court Fee Structure: State-Wise Percentage &amp; Caps
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Court fees for Succession Certificates are regulated by individual State Court Fees Acts. While some states impose an ad-valorem percentage with an upper ceiling, other states calculate fees proportionally without any maximum cap.
                </p>
                <p>
                  Understanding your exact court fee liability prevents surprise expenses before the final grant:
                </p>
              </div>

              {/* State Fee Comparison Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Succession Certificate Court Fee Matrix Across Major States
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 min-w-[620px]">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">State / Jurisdiction</th>
                        <th className="px-4 py-3">Applicable Act</th>
                        <th className="px-4 py-3">Fee Rate</th>
                        <th className="px-4 py-3">Statutory Upper Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Maharashtra (Mumbai / Pune)</td>
                        <td className="px-4 py-3 font-mono">Maharashtra Court Fees Act</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">2% to 7.5% sliding scale</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Capped at ₹75,000 Maximum</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Delhi (District Courts)</td>
                        <td className="px-4 py-3 font-mono">Court Fees (Delhi Amendment) Act</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">4% to 6% ad-valorem</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">No Upper Cap (Ad-valorem)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Karnataka (Bengaluru)</td>
                        <td className="px-4 py-3 font-mono">Karnataka Court-Fees Act, 1958</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">2.5% to 7.5% graded</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">No Upper Cap</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">West Bengal (Kolkata)</td>
                        <td className="px-4 py-3 font-mono">West Bengal Court-fees Act, 1970</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">2% to 6% graduated</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">No Upper Cap</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">Uttar Pradesh (Noida / Lucknow)</td>
                        <td className="px-4 py-3 font-mono">Court Fees Act (UP Amendment)</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">5% to 7.5% slab</td>
                        <td className="px-4 py-3 text-rose-700 font-bold">No Upper Cap</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Court Fee Calculator Link Card */}
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C65378] text-white flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Calculate Your Exact Court Fee</h4>
                    <p className="text-xs text-slate-600">
                      Use our interactive calculator to see exact state fees and stamp paper duty for your asset valuation.
                    </p>
                  </div>
                </div>
                <Link
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] shrink-0"
                >
                  <span>Open Fee Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 9: PROCEDURAL TIMELINE */}
            <section id="procedural-timeline" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>REALISTIC CASE PROGRESSION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Procedural Timeline: Petition Filing to Final Grant
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  While judicial procedures in India can occasionally encounter scheduling delays, an uncontested Succession Certificate petition managed by experienced counsel follows a structured, milestone-driven progression:
                </p>
              </div>

              {/* Timeline Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-[#172228] px-5 py-3 text-white">
                  <div className="font-bold text-sm tracking-wide">
                    Testamentary Milestone Timeline (Uncontested Petition)
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 min-w-[620px]">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Timeframe</th>
                        <th className="px-4 py-3">Procedural Milestone</th>
                        <th className="px-4 py-3">Court Action</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 1 to 2</td>
                        <td className="px-4 py-3">Asset audit, KYC verification &amp; petition drafting</td>
                        <td className="px-4 py-3">Registry scrutiny and filing registration</td>
                        <td className="px-4 py-3 text-blue-700 font-bold">Filing Completed</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 3 to 4</td>
                        <td className="px-4 py-3">First judicial admission &amp; notice issuance</td>
                        <td className="px-4 py-3">Judge directs newspaper publication &amp; summons</td>
                        <td className="px-4 py-3 text-amber-700 font-bold">Citations Issued</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 5 to 9</td>
                        <td className="px-4 py-3">Statutory public notice window</td>
                        <td className="px-4 py-3">Waiting period for objections (30 to 45 days)</td>
                        <td className="px-4 py-3 text-slate-700 font-mono">Notice Window</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 10 to 13</td>
                        <td className="px-4 py-3">Summary judicial hearing &amp; evidence recording</td>
                        <td className="px-4 py-3">Petitioner statement recorded; NOCs verified</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Evidence Closed</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 14 to 17</td>
                        <td className="px-4 py-3">Final arguments &amp; judgment pronouncement</td>
                        <td className="px-4 py-3">Court passes order granting Succession Certificate</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold">Order Pronounced</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900 font-mono">Weeks 18 to 22</td>
                        <td className="px-4 py-3">Stamp paper deposit, bond execution &amp; certificate seal</td>
                        <td className="px-4 py-3">Registrar signs and seals the physical certificate</td>
                        <td className="px-4 py-3 text-emerald-800 font-extrabold">Final Certificate Issued</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 10: CAVEATS & OBJECTIONS */}
            <section id="caveats-and-objections" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                <span>CONTESTED SUCCESSION ADVOCACY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Caveats &amp; Objections: Handling Contested Succession
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  While the majority of petitions proceed smoothly on uncontested grounds, complications arise when a estranged relative, rival claimant, or purported testamentary legatee enters the fray:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Filing of Caveats Under Section 284</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A party anticipating foul play can file a caveat before the District Judge. Once registered, no order or certificate can be granted without first serving formal notice to the caveator.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span>Production of an Alleged Will</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If an objector produces a purported Last Will, the summary inquiry is suspended. Under Section 370, if a Will exists, probate or letters of administration must be determined before a succession certificate can issue.
                    </p>
                  </div>
                </div>
                <p>
                  AMA Legal Solutions provides robust courtroom advocacy to defeat vexatious objections, prove locus standi, and protect legitimate legal heirs from fraudulent obstruction.
                </p>
              </div>
            </section>

            {/* SECTION 11: WHY DRAFT A WILL (CONVERSION BRIDGE) */}
            <section id="why-draft-a-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>PREVENTIVE ESTATE PLANNING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. Why Draft a Will: Avoid Lengthy Court Proceedings
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Applying for a Succession Certificate is an emergency post-death remedy required only because the deceased did not execute an operative Last Will and Testament during their lifetime.
                </p>
                <p>
                  Consider what families endure during the succession certificate process:
                </p>
              </div>

              {/* Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
                  <h4 className="font-bold text-rose-950 text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Dying Without a Will (Intestate)</span>
                  </h4>
                  <ul className="text-xs text-rose-900/80 space-y-1.5 list-disc pl-5">
                    <li>3 to 6 months of frozen bank accounts and mutual funds</li>
                    <li>2% to 7% state court fees on total financial wealth</li>
                    <li>Public newspaper notices disclosing family wealth</li>
                    <li>Mandatory court appearances and surety indemnity bonds</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Executing a Registered Will With WillDrafting</span>
                  </h4>
                  <ul className="text-xs text-emerald-900/80 space-y-1.5 list-disc pl-5">
                    <li>Direct transmission to designated beneficiaries in 15 days</li>
                    <li>Zero ad-valorem civil court fees (no percentage tax)</li>
                    <li>Total privacy without public newspaper notices</li>
                    <li>Complete protection against distant family disputes</li>
                  </ul>
                </div>
              </div>

              {/* Conversion Callout Banner */}
              <div className="p-5 rounded-2xl bg-[#172228] text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-base text-white">
                    Protect Your Family From Court Delays
                  </h4>
                  <p className="text-xs text-slate-300">
                    Draft a legally valid, lawyer-verified Last Will and Testament online in under 15 minutes.
                  </p>
                </div>
                <button
                  onClick={handleStartDraft}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer shadow-md"
                >
                  <span>Draft Your Will Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 12: AMA LEGAL SERVICES SCOPE */}
            <section id="ama-legal-services" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4 text-[#C65378]" />
                <span>END-TO-END CIVIL COURT REPRESENTATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. AMA Legal Services: End-to-End Court Representation
              </h2>
              <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  AMA Legal Solutions is a premier Indian law firm with a dedicated Testamentary and Estate Succession Practice. We take complete ownership of your succession certificate proceedings from initial filing to institutional payout:
                </p>
              </div>

              {/* Service Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-[#C65378] mb-2.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Petition Drafting</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Custom drafting under Section 372 of ISA with verified asset schedules, eliminating court registry scrutiny objections.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2.5">
                    <Gavel className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Court Advocacy</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Regular appearances before the District Judge, managing citations, newspaper coordination, and witness examination.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2.5">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Bank Liaison</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Post-grant execution with bank nodal officers, NSDL/CDSL depositories, and mutual fund RTAs for seamless fund release.
                  </p>
                </div>
              </div>

              {/* Consultation Call Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      Speak Directly With an Estate Advocate
                    </h4>
                    <p className="text-xs text-slate-600">
                      Discuss your frozen bank accounts or mutual funds with senior testamentary counsel.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#2b3c45] transition-all shrink-0"
                >
                  <span>Book Case Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>CLEAR ANSWERS TO CRITICAL QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Frequently Asked Questions: Succession Certificate India
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-white border border-slate-200 overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>STATUTORY CITATIONS &amp; LANDMARK PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                14. Statutory Citations: High Court Precedents &amp; Acts
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Every succession petition drafted by AMA Legal Solutions adheres strictly to codified statutes and landmark Supreme Court of India precedents:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-xs text-slate-600">
                  <li>
                    <strong>Part X (Sections 370 to 390), Indian Succession Act, 1925:</strong> The foundational statutory scheme governing the grant of succession certificates for debts and securities across India.
                  </li>
                  <li>
                    <strong>Ram Chander Talwar &amp; Anr v. Devinder Kumar Talwar &amp; Ors (2010) 10 SCC 671:</strong> The Supreme Court affirmed that a nominee under Section 45ZA of the Banking Regulation Act holds money only as a trustee for legal heirs, and does not gain beneficial title.
                  </li>
                  <li>
                    <strong>Shakti Yezdani &amp; Anr v. Jayanand Salgaonkar &amp; Ors (2023) 14 SCC 512:</strong> The Supreme Court held that nomination provisions under the Companies Act do not create a separate line of succession or override the succession certificate granted to statutory heirs.
                  </li>
                  <li>
                    <strong>Smt. Sarbati Devi &amp; Anr v. Smt. Usha Devi (1984) 1 SCC 424:</strong> Landmark ruling establishing that life insurance nomination serves only to provide a valid receipt to the insurer without affecting distribution among Class I heirs.
                  </li>
                </ul>

                {/* Related Internal Links */}
                <div className="pt-4">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-2">
                    Related Legal Silo Guides:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link
                      href="/blogs/legal-heir-certificate-vs-succession-certificate"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors border border-slate-200"
                    >
                      Legal Heir vs Succession Certificate Guide
                    </Link>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors border border-slate-200"
                    >
                      Court Fee Calculator India
                    </Link>
                    <Link
                      href="/service/probate-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors border border-slate-200"
                    >
                      Probate of Will Lawyers
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors border border-slate-200"
                    >
                      Free Probate Checker Tool
                    </Link>
                    <Link
                      href="/service/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors border border-slate-200"
                    >
                      Will Registration Service
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author, Case Evaluation, Trust, Links)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR / COUNSEL PROFILE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 border border-rose-200">
                  AMA
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Adv. Anuj Anand</h3>
                  <p className="text-[11px] font-semibold text-[#C65378]">
                    Senior Testamentary Counsel
                  </p>
                  <p className="text-[10px] text-slate-500">Bar Council of Delhi &bull; 18+ Yrs</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Specializing in high-value civil court estate petitions, succession certificates, and financial asset transmission before District Courts and High Courts pan-India.
              </p>
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Verified Legal Counsel</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Available
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: FREE CASE EVALUATION CTA CARD */}
            <div className="hidden lg:block bg-[#172228] text-white rounded-2xl p-5 text-center shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200 mb-3">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL CASE AUDIT</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                Facing Frozen Bank Accounts or Shares?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Let our advocates analyze your deceased asset schedule and advise whether a succession certificate or legal heir certificate is needed.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all cursor-pointer shadow-md mb-2.5"
              >
                <span>Schedule Advocate Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-[10px] text-slate-400">
                100% Confidential &bull; Zero Obligation Evaluation
              </p>
            </div>

            {/* CARD 3: TRUST & COMPLIANCE CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>AMA Practice Guarantees</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Fixed Retainers:</strong> Transparent legal fees with zero unexpected registry billings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Pan-India Courts:</strong> Filing capability across Delhi NCR, Mumbai, Bengaluru, and Kolkata.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>NRI Remote Power:</strong> Full representation without requiring NRI clients to travel to India.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Direct Bank Transmission:</strong> Liaison with bank managers until frozen funds reach your account.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TOOLS & SERVICES */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                Related Legal Tools
              </h4>
              <div className="space-y-2">
                <Link
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all group"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Court Fee Calculator &rarr;
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Check state percentages &amp; maximum caps
                  </div>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all group"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Is Probate Required? &rarr;
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    5-question diagnostic risk score
                  </div>
                </Link>

                <Link
                  href="/service/probate-lawyer"
                  className="block p-2.5 rounded-xl border border-slate-200 hover:border-[#C65378] hover:bg-rose-50/30 transition-all group"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Probate of Will Lawyers &rarr;
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    High Court testamentary petition representation
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
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Court Fee Calculator India
                </Link>
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Relinquishment Deed Format
                </Link>
                <Link
                  href="/service/probate-lawyer"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Probate of Will Lawyers
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
