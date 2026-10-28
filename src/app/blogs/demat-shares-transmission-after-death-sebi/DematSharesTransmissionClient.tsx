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
  Calendar,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Landmark,
  Gavel,
  Check,
  Layers,
  ArrowUpRight,
  TrendingUp,
  PieChart,
  Briefcase,
  Share2,
  Info,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "sebi-framework", label: "1. SEBI Transmission Framework" },
  { id: "nominee-vs-legal-heir", label: "2. Nominee vs Legal Heir Rights" },
  { id: "transmission-scenarios", label: "3. Five Transmission Scenarios" },
  { id: "sebi-value-tiers", label: "4. SEBI Monetary Tiers (Rs 15 Lakh)" },
  { id: "documentation-checklist", label: "5. Form ISR-5 Document Checklist" },
  { id: "visual-blueprint", label: "6. Visual Process Roadmap" },
  { id: "step-by-step-process", label: "7. Step-by-Step Depository SOP" },
  { id: "multiple-heirs-settlement", label: "8. Multiple Heirs Dispute Settlement" },
  { id: "mutual-fund-transmission", label: "9. Mutual Fund Transmission Rules" },
  { id: "how-a-will-prevents-disputes", label: "10. How a Will Avoids Delays" },
  { id: "common-mistakes", label: "11. 5 Critical Mistakes to Avoid" },
  { id: "institutional-backing", label: "12. Lawyer-Verified Support by AMA" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Regulatory Citations & Links" },
];

const COMPARISON_ROWS = [
  {
    feature: "Governing Authority",
    jointHolder: "Depository Participant (DP)",
    nominee: "Depository Participant (DP)",
    heirUnder15L: "DP & Depository (NSDL/CDSL)",
    heirOver15L: "Civil Court (Succession Order)",
    withWill: "Named Executor & DP",
  },
  {
    feature: "Court Order Required?",
    jointHolder: "No (Immediate transfer)",
    nominee: "No (Transfers as custodian)",
    heirUnder15L: "No (Simplified paperwork)",
    heirOver15L: "Yes (Succession Certificate)",
    withWill: "No (Unless contested or probate)",
  },
  {
    feature: "Value Limit for Simplified Route",
    jointHolder: "Unlimited portfolio value",
    nominee: "Unlimited portfolio value",
    heirUnder15L: "Capped at Rs 15 Lakhs per account",
    heirOver15L: "Above Rs 15 Lakhs threshold",
    withWill: "Unlimited portfolio value",
  },
  {
    feature: "Core Application Form",
    jointHolder: "Form ISR-5 (Joint Transmission)",
    nominee: "Form ISR-5 (Nominee Request)",
    heirUnder15L: "Form ISR-5 + Legal Heir Affidavits",
    heirOver15L: "Form ISR-5 + Court Decree",
    withWill: "Form ISR-5 + Certified Will Copy",
  },
  {
    feature: "Stamp Paper Affidavits Needed?",
    jointHolder: "No",
    nominee: "No",
    heirUnder15L: "Yes (Indemnity, Affidavit, NOC)",
    heirOver15L: "Yes (Court Bond + Depository KYC)",
    withWill: "Executor verification only",
  },
  {
    feature: "Processing Time",
    jointHolder: "7 to 15 Days",
    nominee: "15 to 21 Days",
    heirUnder15L: "30 to 45 Days",
    heirOver15L: "6 to 12 Months (Civil Court)",
    withWill: "21 to 30 Days",
  },
  {
    feature: "Ultimate Ownership Status",
    jointHolder: "Surviving holder becomes full owner",
    nominee: "Trustee only (holds for legal heirs)",
    heirUnder15L: "Legal heirs receive absolute title",
    heirOver15L: "Legal heirs receive judicial title",
    withWill: "Named beneficiaries receive title",
  },
];

const SCENARIO_CARDS = [
  {
    title: "Scenario 1: Surviving Joint Account Holder",
    badge: "Fastest Pathway",
    color: "emerald",
    icon: UsersIcon,
    summary:
      "When two or more individuals hold a demat account and one holder passes away, the surviving holders do not need to share the account with the deceased's heirs immediately.",
    keyRule:
      "The demat shares transfer directly to a new or existing demat account opened in the name of the surviving holder(s) upon filing Form ISR-5 and the death certificate.",
    docs: ["Form ISR-5 signed by surviving holder(s)", "Original or attested death certificate", "Client Master Report (CMR) of survivor account"],
  },
  {
    title: "Scenario 2: Sole Holder with Registered Nominee",
    badge: "Direct Depository Claim",
    color: "blue",
    icon: UserCheck,
    summary:
      "If the deceased was the sole account holder and filed a valid nomination with the broker, the depository transmits the entire shareholding directly to the nominee.",
    keyRule:
      "Under Supreme Court law, the nominee receives the shares quickly without court orders. However, the nominee holds them in trust for distribution to lawful heirs.",
    docs: ["Form ISR-5 signed by nominee", "Original or notarized death certificate", "Nominee CMR report with broker stamp", "Self-attested PAN and Aadhaar card"],
  },
  {
    title: "Scenario 3: Sole Holder Without Nominee (Under Rs 15 Lakh)",
    badge: "SEBI Simplified Route",
    color: "amber",
    icon: FileCheck,
    summary:
      "When no nominee was registered, but the total market value of securities in the demat account is Rs 15 Lakhs or less, SEBI allows a simplified documentation procedure.",
    keyRule:
      "No civil court order is mandatory. Legal heirs submit a Legal Heir Certificate or registered family settlement deed along with indemnity bonds and notarized NOCs.",
    docs: ["Form ISR-5 (Legal Heir request)", "Death certificate of sole holder", "Legal Heir Certificate or Family Deed", "Indemnity Bond & Affidavit on Stamp Paper", "NOC from non-claiming legal heirs"],
  },
  {
    title: "Scenario 4: Sole Holder Without Nominee (Over Rs 15 Lakh)",
    badge: "Court Decree Required",
    color: "rose",
    icon: Gavel,
    summary:
      "If the deceased sole holder left no nomination and the stock portfolio exceeds Rs 15 Lakhs, depositories cannot transfer the shares on simple affidavits.",
    keyRule:
      "A formal petition must be filed before the competent Civil District Judge under Part X of the Indian Succession Act, 1925 to secure a judicial Succession Certificate.",
    docs: ["Form ISR-5 with court decree reference", "Certified Succession Certificate or Letters of Administration", "Death certificate of sole holder", "CMR of all entitled legal heirs", "State ad valorem court fee receipts"],
  },
  {
    title: "Scenario 5: Deceased Left a Valid Last Will & Testament",
    badge: "Testamentary Route",
    color: "indigo",
    icon: Scale,
    summary:
      "When the deceased left a clear, advocate-drafted Will designating specific beneficiaries for the demat shares, the named executor carries out the transfer.",
    keyRule:
      "Shares are transmitted according to the testator's instructions. A formal probate decree is only mandatory if the Will was made in Mumbai, Chennai, or Kolkata, or if disputed.",
    docs: ["Certified copy of the Last Will", "Death certificate of testator", "Executor identification & assent letter", "CMR of named beneficiaries", "Probate grant (only if legally required)"],
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "Form ISR-5 (Request for Transmission of Securities)",
    desc: "Complete SEBI standardized Form ISR-5 specifying account details, claimant identity, and share schedule.",
  },
  {
    id: "check-2",
    label: "Death Certificate of the Deceased Account Holder",
    desc: "Original death certificate or a copy duly notarized or attested by a Gazetted Officer.",
  },
  {
    id: "check-3",
    label: "Client Master Report (CMR) of Claimant's Demat Account",
    desc: "Active demat account summary with 16-digit Beneficiary Owner ID (BO ID), officially signed and sealed by the broker.",
  },
  {
    id: "check-4",
    label: "Self-Attested KYC Documents (PAN & Aadhaar)",
    desc: "Clear photocopies of PAN Card and Aadhaar card of each claimant and legal heir.",
  },
  {
    id: "check-5",
    label: "Affidavit of All Legal Heirs on Non-Judicial Stamp Paper",
    desc: "Affidavit (Annexure D format) identifying all surviving family members and stating undisputed claims.",
  },
  {
    id: "check-6",
    label: "Letter of Indemnity on Non-Judicial Stamp Paper",
    desc: "Indemnity bond (Annexure E format) protecting the depository and listed companies against future adverse claims.",
  },
  {
    id: "check-7",
    label: "No Objection Certificate (NOC) from Other Legal Heirs",
    desc: "NOC (Annexure F format) signed by non-claimant heirs relinquishing rights in favor of the designated claimant.",
  },
  {
    id: "check-8",
    label: "Proof of Legal Heirship (Revenue Certificate or Court Order)",
    desc: "Legal Heir Certificate from Tehsildar (for under Rs 15L) or Succession Certificate from Civil Court (for over Rs 15L).",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between transfer and transmission of shares?",
    a: "A transfer is a voluntary sale or gift of shares made while the holder is alive, requiring a transfer deed and stamp duty. Transmission happens automatically by operation of law upon the death, bankruptcy, or insolvency of the holder, requiring zero stamp duty.",
  },
  {
    q: "Does a nominee become the absolute legal owner of demat shares?",
    a: "No. The Supreme Court of India in Shakti Yezdani v. Jayanand Salgaonkar (2023) confirmed that a nominee is merely a trustee or custodian. While the depository transfers shares to the nominee, the legal ownership belongs to the heirs named in the Will or statutory heirs under succession law.",
  },
  {
    q: "What is the SEBI monetary threshold for transmission without a nominee?",
    a: "Under the SEBI Master Circular dated May 18, 2022, the monetary threshold for demat securities held without a nominee is Rs 15 Lakhs per depository participant account. For physical share certificates, the threshold is Rs 5 Lakhs per listed company.",
  },
  {
    q: "Can demat shares valued under Rs 15 Lakhs be claimed without a court order?",
    a: "Yes. For demat portfolios valued up to Rs 15 Lakhs without a nominee, legal heirs can submit Form ISR-5, the death certificate, a Legal Heir Certificate, an affidavit, an indemnity bond, and No Objection Certificates from non-claimants without filing a civil court petition.",
  },
  {
    q: "When is a Succession Certificate mandatory for demat share transmission?",
    a: "A Succession Certificate granted by a Civil Court under Part X of the Indian Succession Act, 1925 is mandatory when the deceased sole holder did not register a nominee and the portfolio value exceeds Rs 15 Lakhs, or whenever legal heirs raise competing disputes.",
  },
  {
    q: "What happens to a joint demat account when one holder passes away?",
    a: "Under the joint survivorship clause, the shares do not go to legal heirs or nominees immediately. The surviving joint holder(s) submit Form ISR-5 and the death certificate, and the depository transmits the entire portfolio into a demat account opened in the name of the survivor(s).",
  },
  {
    q: "What is Form ISR-5 and where do I submit it?",
    a: "Form ISR-5 is the standardized Transmission Request Form created by SEBI for claiming securities after the holder's demise. You submit Form ISR-5 along with supporting identity and kinship documents directly to the depository participant broker (such as Zerodha, ICICI Direct, or Groww).",
  },
  {
    q: "How can multiple legal heirs divide inherited demat shares?",
    a: "Legal heirs can either open separate individual demat accounts and specify their percentage entitlement on Form ISR-5, or execute a registered Family Settlement Deed or notarized No Objection Certificates (NOC) allowing one heir to receive the shares on behalf of the family.",
  },
  {
    q: "How are mutual fund units transmitted after the death of the investor?",
    a: "Mutual fund units in demat mode follow SEBI depository rules through your broker. Units held in Statement of Account (SoA) mode are transmitted through AMFI Form T2 (for joint holders) or Form T3 (for nominees or legal heirs) submitted via MF Central, CAMS, or KFintech.",
  },
  {
    q: "Does having a registered Will prevent demat transmission delays?",
    a: "Yes. An advocate-drafted registered Will clearly specifies who inherits each stock and names an executor. This removes ambiguity, protects against family disputes, avoids civil court petitions, and saves your family months in paperwork.",
  },
];

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function DematSharesTransmissionClient() {
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

  const [activeId, setActiveId] = useState<string>("sebi-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": true,
    "check-4": true,
    "check-5": false,
    "check-6": false,
    "check-7": false,
    "check-8": false,
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

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <TrendingUp className="w-4 h-4 text-[#C65378]" />
            <span>SEBI MASTER CIRCULAR &bull; CAPITAL MARKETS INHERITANCE GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Transmission of Demat Shares After Death: Complete SEBI Guide
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand SEBI rules for transmission of demat shares after death. Learn nominee rights, the Rs 15 lakh simplified threshold, Form ISR-5 paperwork, and how a Will prevents frozen portfolios.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Will to Protect Your Shares</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#sebi-value-tiers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View SEBI Rs 15L Thresholds</span>
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
            {/* Stat 1: Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Succession Expertise
              </span>
            </div>

            {/* Stat 2: Estates Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estates &amp; Portfolios Managed
              </span>
            </div>

            {/* Stat 3: Asset Value */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹1,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Securities &amp; Assets Protected
              </span>
            </div>

            {/* Stat 4: Client Rating */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <div className="flex items-center gap-1.5">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none">
                  4.9/5
                </span>
                <span className="text-[#C65378] text-sm">★</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Verified Client Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial Layout)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-2.5 rounded-lg transition-all leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-[#55636D] hover:text-[#172228] hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-[#172228]/10 flex items-center gap-2 text-[11px] text-[#55636D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                <span>SEBI Circular Compliant</span>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <div className="space-y-8 md:space-y-10 min-w-0">

            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-[#FAF7F0] border-2 border-[#C65378]/20 border-l-[6px] border-l-[#C65378] p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Executive Brief: Key Takeaways for Families
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#172228] mb-3">
                How Transmission of Demat Shares Operates in India
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#55636D] leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SEBI Standardized Format:</strong> All brokers and depositories (NSDL and CDSL) mandate the unified Form ISR-5.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Nominee is Trustee:</strong> Under Supreme Court rulings, nominees receive shares quickly but hold them for legal heirs.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Rs 15 Lakh Threshold:</strong> Demat portfolios up to Rs 15 Lakh without a nominee do not require civil court orders.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Succession Certificate:</strong> Demat portfolios exceeding Rs 15 Lakh without nomination mandate a court decree.</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: SEBI FRAMEWORK */}
            <section id="sebi-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Regulatory Foundation
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                1. SEBI Transmission Framework: Demat Shares After Death
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                When an individual investor holding shares in an Indian demat account passes away, those investments do not vanish. However, family members cannot simply log into the trading app and sell the shares. Attempting to trade on a deceased person&apos;s account is illegal and triggers account suspension. Instead, the securities must undergo a formal legal process called transmission.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Transmission of shares differs significantly from a regular transfer. A share transfer is a voluntary transaction between two living individuals through a sale or gift, requiring payment of stamp duty. In contrast, transmission occurs automatically by operation of law upon the death of the investor. Under the Depositories Act, 1996 and SEBI regulations, transmission is completely exempt from stamp duty.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                To streamline this process, the Securities and Exchange Board of India (SEBI) issued its landmark Master Circular (Circular No. SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65). This directive established standardized documentation rules across all Depository Participants (DPs) such as Zerodha, Groww, ICICI Direct, HDFC Securities, Angel One, and Upstox, as well as both national depositories, NSDL and CDSL.
              </p>

              {/* Information Callout Box */}
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-start gap-3 text-xs text-blue-950">
                <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-blue-900 mb-1">What Happens to Dividends and Corporate Actions?</strong>
                  <span>During the transmission period, dividends continue to accumulate in the investor&apos;s linked bank account or stay in escrow with the company&apos;s Registrar and Transfer Agent (RTA). Stock splits and bonus shares are credited automatically into the frozen demat account.</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: NOMINEE VS LEGAL HEIR */}
            <section id="nominee-vs-legal-heir" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Judicial Clarity
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                2. Nominee vs Legal Heir: Supreme Court Precedent &amp; Rights
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The most frequent source of family conflict after an investor&apos;s death is the misunderstanding of what a nominee is. Many people assume that being named as a nominee in a demat account makes them the sole legal owner of all the shares. Under Indian succession law, this assumption is completely wrong.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                In a historic verdict delivered on December 14, 2023, the Supreme Court of India in <em>Shakti Yezdani &amp; Anr. v. Jayanand Jayant Salgaonkar &amp; Ors. (2023 INSC 1079)</em> conclusively resolved this issue. The Supreme Court ruled that Section 72 of the Companies Act, 2013 (and the earlier Section 109A of the Companies Act, 1956) does not create an independent line of succession. A nominee is merely a fiduciary agent or trustee.
              </p>

              {/* Supreme Court Callout Card */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#C65378] font-bold text-xs">
                  <Gavel className="w-4 h-4" />
                  <span>Supreme Court Rule: Shakti Yezdani (2023 INSC 1079)</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed italic">
                  &ldquo;A nominee does not become the absolute owner of the shares to the exclusion of the legal heirs. The nomination only provides the company or depository with a valid discharge of its liabilities. The shares form part of the estate of the deceased holder and devolve upon the legal heirs under the law of succession or a valid testamentary Will.&rdquo;
                </p>
              </div>

              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                This means that while the depository broker will transfer the shares into the nominee&apos;s demat account without asking for court orders, the nominee cannot legally pocket the money if other legal heirs exist. If the deceased left a valid Will, the shares belong to the beneficiaries named in that Will. If there is no Will, the shares belong equally to all Class I legal heirs under the Hindu Succession Act or applicable personal law.
              </p>
            </section>

            {/* SECTION 3: FIVE TRANSMISSION SCENARIOS */}
            <section id="transmission-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Case-by-Case Breakdown
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                3. Five Transmission Scenarios: Joint Accounts to Heirs
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The exact documentation you need to submit depends on how the demat account was set up and whether a Will or nominee exists. SEBI categorizes share transmission into five distinct scenarios:
              </p>

              <div className="space-y-4">
                {SCENARIO_CARDS.map((scenario, index) => {
                  const Icon = scenario.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-xs hover:border-[#C65378]/30 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#172228]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-[#172228]">
                            {scenario.title}
                          </h3>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#55636D] self-start sm:self-auto">
                          {scenario.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                        {scenario.summary}
                      </p>
                      <div className="bg-slate-50 rounded-xl p-3 text-xs text-[#172228] border border-slate-100">
                        <strong className="text-[#C65378]">Key Rule: </strong>
                        {scenario.keyRule}
                      </div>
                      <div className="pt-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#55636D] block mb-1.5">
                          Required Documents:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#55636D]">
                          {scenario.docs.map((doc, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: SEBI VALUE TIERS */}
            <section id="sebi-value-tiers" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory Thresholds
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                4. SEBI Monetary Tiers: Rs 15 Lakh Threshold Explained
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Prior to SEBI&apos;s revised guidelines, families without a registered nominee were forced to obtain a court-issued Succession Certificate even for small investments. This caused immense distress because obtaining a court order takes 6 to 12 months and costs up to 7.5% in state court fees.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Under the revised SEBI Master Circular, the threshold for simplified transmission without a nominee has been significantly raised:
              </p>

              {/* Threshold Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border-2 border-emerald-500/20 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Demat Securities</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">NSDL / CDSL</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#172228]">₹15,00,000</div>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Per beneficial owner account. If total market value on date of application is up to ₹15 Lakhs, no Succession Certificate or court probate is required.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border-2 border-blue-500/20 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Physical Certificates</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">Paper Shares</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#172228]">₹5,00,000</div>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Per listed entity. For physical paper shares without nomination, simplified transmission applies up to ₹5 Lakhs per company.
                  </p>
                </div>
              </div>

              {/* Full Comparison Matrix Table */}
              <div className="mt-4 pt-2">
                <h3 className="font-bold text-sm sm:text-base text-[#172228] mb-3">
                  Comprehensive Transmission Comparison Matrix
                </h3>
                <div className="rounded-2xl border border-[#172228]/10 bg-white overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#172228] text-white">
                        <tr>
                          <th className="p-3 font-bold">Key Parameter</th>
                          <th className="p-3 font-bold">Surviving Joint</th>
                          <th className="p-3 font-bold">Nominee</th>
                          <th className="p-3 font-bold">Heir (&le; ₹15L)</th>
                          <th className="p-3 font-bold">Heir (&gt; ₹15L)</th>
                          <th className="p-3 font-bold">With Valid Will</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#172228]/10 text-[#55636D]">
                        {COMPARISON_ROWS.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 font-bold text-[#172228] whitespace-nowrap">{row.feature}</td>
                            <td className="p-3">{row.jointHolder}</td>
                            <td className="p-3">{row.nominee}</td>
                            <td className="p-3 font-medium text-emerald-800 bg-emerald-50/30">{row.heirUnder15L}</td>
                            <td className="p-3 font-medium text-rose-800 bg-rose-50/30">{row.heirOver15L}</td>
                            <td className="p-3 font-medium text-indigo-900 bg-indigo-50/30">{row.withWill}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: DOCUMENT CHECKLIST */}
            <section id="documentation-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Verified Paperwork
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                5. Document Checklist: Form ISR-5 &amp; Statutory Affidavits
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                To prevent rejected applications, submit the exact documents specified in the SEBI Master Circular. Use this interactive checklist to verify your document package before submitting it to your broker:
              </p>

              {/* Interactive Checklist Component */}
              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#172228]/10">
                  <div>
                    <h3 className="font-bold text-sm text-[#172228]">Required Transmission Documents</h3>
                    <p className="text-xs text-[#55636D]">Check off each item as you collect them from family members and government offices.</p>
                  </div>
                  <div className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-[#C65378] border border-rose-100 self-start sm:self-auto">
                    {checkedCount} of {CHECKLIST_ITEMS.length} Completed
                  </div>
                </div>

                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? "bg-slate-50/80 border-[#C65378]/30"
                            : "bg-white border-[#172228]/10 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isChecked
                              ? "bg-[#C65378] text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="text-xs space-y-0.5">
                          <div className={`font-bold ${isChecked ? "text-[#172228]" : "text-[#55636D]"}`}>
                            {item.label}
                          </div>
                          <div className="text-[#55636D] leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Visual Overview
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                6. Demat Share Transmission: Visual Roadmap &amp; Milestones
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Transferring securities and real property following an investor&apos;s death involves clear legal milestones. The visual guide below illustrates how statutory succession laws, property title records, and depository transmission rules connect together.
              </p>

              {/* Visual Infographic Card */}
              <div className="rounded-2xl border border-[#172228]/10 bg-white p-4 sm:p-6 shadow-xs overflow-hidden">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#172228]/10 bg-[#FAF7F0] shadow-inner">
                  <Image
                    src="/images/demat-shares-transmission-sebi-process.jpg"
                    alt="Transmission of Shares After Death SEBI Demat Account Nominee and Legal Heirs Guide"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-contain"
                    priority
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#55636D]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Statutory Property &amp; Securities Succession Overview</span>
                  </div>
                  <a
                    href="/images/demat-shares-transmission-sebi-process.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline"
                  >
                    <span>View Full Size Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-process" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Standard Operating Procedure
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                7. Step-by-Step Guide: How to Approach Your Depository
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Follow this six-stage verified procedure to complete the transmission of demat shares smoothly without unnecessary back-and-forth rejections:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Intimate Depository Participant & Freeze Trading",
                    desc: "Notify the broker or DP immediately in writing along with a copy of the death certificate. The broker will freeze trading access to protect against unauthorized trades while keeping the account open for dividends.",
                  },
                  {
                    step: "2",
                    title: "Open or Verify Claimant's Demat Account",
                    desc: "Shares cannot be remitted as cash or deposited into a regular bank account. Each claimant or nominee must have an active demat account with full KYC compliance.",
                  },
                  {
                    step: "3",
                    title: "Obtain an Officially Stamped Client Master Report (CMR)",
                    desc: "Download and get your broker to physically sign and stamp your CMR. The CMR proves your active Beneficiary Owner ID (BO ID) and DP ID to the transferring depository.",
                  },
                  {
                    step: "4",
                    title: "Determine Portfolio Value under SEBI Formula",
                    desc: "Calculate the total market value of the shares based on the closing price on the date of application. This establishes whether your claim falls under the Rs 15 Lakh simplified ceiling.",
                  },
                  {
                    step: "5",
                    title: "Execute Form ISR-5 & Notarized Affidavits",
                    desc: "Fill in Form ISR-5 accurately. If claiming without nomination, have all legal heirs execute the Affidavit (Annexure D), Letter of Indemnity (Annexure E), and NOC (Annexure F) on non-judicial stamp paper.",
                  },
                  {
                    step: "6",
                    title: "Physical Submission & Depository Verification",
                    desc: "Courier the physical dossier to the DP's central operations hub. Once verified, the DP initiates an off-market transfer, and the shares reflect in the claimant's demat account within 21 to 30 days.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#172228]/10 p-4 sm:p-5 flex items-start gap-4 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <h3 className="font-bold text-[#172228] text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-[#55636D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: MULTIPLE HEIRS DISPUTE SETTLEMENT */}
            <section id="multiple-heirs-settlement" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Family Settlement
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                8. Resolving Disputes Among Multiple Legal Heirs for Shares
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                When a parent dies without a Will, leaving multiple children and a valuable share portfolio, dividing those shares often creates conflict. Under Section 8 of the Hindu Succession Act, 1956, all Class I heirs (surviving spouse, sons, and daughters) inherit equal rights.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                To divide the shares smoothly, families have three legally recognized options:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-[#172228]/10 p-4 space-y-2">
                  <h3 className="font-bold text-sm text-[#172228]">Option A: Apportionment</h3>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Each legal heir opens their own demat account. On Form ISR-5, the family specifies the exact percentage of shares to transfer into each heir&apos;s separate account.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#172228]/10 p-4 space-y-2">
                  <h3 className="font-bold text-sm text-[#172228]">Option B: Relinquishment (NOC)</h3>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    Siblings execute a formal Relinquishment Deed or notarized NOC in favor of one sibling or the surviving mother, allowing one person to hold the entire portfolio.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#172228]/10 p-4 space-y-2">
                  <h3 className="font-bold text-sm text-[#172228]">Option C: Court Partition</h3>
                  <p className="text-xs text-[#55636D] leading-relaxed">
                    If heirs disagree on share values or division, the only remedy is filing a succession petition under Section 372 in Civil Court, which freezes the shares until the judge decides.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: MUTUAL FUND TRANSMISSION */}
            <section id="mutual-fund-transmission" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Mutual Funds &amp; AMCs
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                9. Mutual Fund Transmission: AMFI Rules &amp; Central Portals
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Many investors hold both demat stocks and mutual funds. The transmission process for mutual fund units depends on whether they are held in demat mode or in Statement of Account (SoA) mode with fund houses:
              </p>
              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 space-y-3">
                <div className="space-y-2 text-xs sm:text-sm text-[#55636D]">
                  <p>
                    <strong>Demat Mode Mutual Funds:</strong> If your mutual fund units are held inside your demat account with Zerodha (Coin), Groww, or Angel One, they are transmitted along with your equity shares under SEBI Form ISR-5. You do not need to contact individual fund houses.
                  </p>
                  <p>
                    <strong>Physical / SoA Mode Mutual Funds:</strong> If you bought mutual funds directly or through platforms like Kuvera, Zerodha non-demat, or distributors, units are held under individual folios. You must use AMFI standardized formats:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li><strong>Form T2:</strong> For transmission to surviving joint unitholders.</li>
                    <li><strong>Form T3:</strong> For transmission to registered nominees or legal heirs.</li>
                    <li><strong>Centralized Processing:</strong> You can submit claims centrally across all mutual funds using the <strong>MF Central</strong> portal or through RTAs like CAMS and KFintech.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 10: HOW A WILL AVOIDS DELAYS */}
            <section id="how-a-will-prevents-disputes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Smart Estate Planning
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                10. How a Registered Will Avoids Probate &amp; Court Delays
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The entire headache of transmission, indemnity bonds, surety signatures, and civil court hearings exists solely because an investor passed away without leaving a clear Last Will and Testament.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                When you draft an advocate-verified Will on WillDrafting.in, you eliminate all uncertainty for your family:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 space-y-2">
                  <div className="font-bold text-rose-900 text-sm">Without a Valid Will (Intestate)</div>
                  <ul className="space-y-1 text-rose-950">
                    <li>&bull; Demat account frozen upon notice of demise</li>
                    <li>&bull; Claims above ₹15L require civil court Succession Certificate</li>
                    <li>&bull; Takes 6 to 12 months in court with newspaper notices</li>
                    <li>&bull; Ad valorem court fees of 2% to 7.5% of total share value</li>
                    <li>&bull; Sibling disputes can lock blue-chip shares for years</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                  <div className="font-bold text-emerald-900 text-sm">With a WillDrafting Will (Protected)</div>
                  <ul className="space-y-1 text-emerald-950">
                    <li>&bull; Clear beneficiary designated for each demat account</li>
                    <li>&bull; Named executor holds legal title under Section 211 of ISA 1925</li>
                    <li>&bull; No Succession Certificate required for undisputed Wills</li>
                    <li>&bull; Zero percentage-based court fees on your share portfolio</li>
                    <li>&bull; Straightforward transmission completed in 21 to 30 days</li>
                  </ul>
                </div>
              </div>

              {/* Conversion Call to Action */}
              <div className="rounded-2xl bg-gradient-to-r from-[#172228] to-[#253842] text-white p-6 sm:p-8 text-center space-y-4 shadow-lg">
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Protect Your Demat Portfolio &amp; Family Today
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Do not let your life savings get stuck in broker paperwork or court litigation. Create an advocate-drafted, legally binding Will on plain paper in just 15 minutes.
                </p>
                <div>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer text-sm"
                  >
                    <span>Start Your Will Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 11: COMMON MISTAKES */}
            <section id="common-mistakes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Critical Errors
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                11. Five Critical Mistakes to Avoid During Share Transmission
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Families dealing with the loss of a loved one often make innocent mistakes that result in frozen funds or legal penalties:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "1. Trading on the Deceased Person's Account",
                    desc: "Using the deceased holder's login credentials to sell shares or withdraw funds post-death is an offence under Indian penal law and SEBI regulations. Brokers will immediately freeze the account and reverse unauthorized transactions.",
                  },
                  {
                    title: "2. Assuming the Nominee Can Keep All the Shares",
                    desc: "Relying on nomination to bypass other children or siblings invites civil lawsuits. As settled in Shakti Yezdani (2023), the nominee must distribute the proceeds to lawful legal heirs.",
                  },
                  {
                    title: "3. Submitting an Unsealed Client Master Report",
                    desc: "Depositories reject CMR printouts downloaded directly from apps. The CMR must carry the physical stamp and wet signature of the receiving broker.",
                  },
                  {
                    title: "4. Executing Indemnity Bonds on Incorrect Stamp Value",
                    desc: "Affidavits and Indemnity Bonds must be printed on non-judicial stamp paper compliant with state-specific Stamp Acts (typically ₹100 to ₹500 depending on state rules).",
                  },
                  {
                    title: "5. Ignoring Unclaimed Shares Until They Move to IEPF",
                    desc: "If transmission is ignored and dividends remain unclaimed for seven consecutive years, the shares are transferred to the central government's Investor Education and Protection Fund (IEPF), requiring a complicated refund process.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#172228]/10 p-4 space-y-1">
                    <h3 className="font-bold text-sm text-[#172228]">{item.title}</h3>
                    <p className="text-xs text-[#55636D] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL BACKING */}
            <section id="institutional-backing" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Legal Support
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                12. Lawyer-Verified Guidance: Succession Support by AMA
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                WillDrafting.in is powered by WillDrafting.in, a premier Indian succession law practice. If you are dealing with a complex share transmission involving disputed heirs, missing nominations, or high-value portfolios exceeding Rs 15 Lakhs, our succession advocates provide end-to-end representation.
              </p>

              <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-sm text-[#172228]">Succession Petitions</div>
                    <div className="text-[11px] text-[#55636D] mt-1">Filing Section 372 petitions in Civil Courts nationwide</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-sm text-[#172228]">Family Settlements</div>
                    <div className="text-[11px] text-[#55636D] mt-1">Drafting registered Family Deeds and Relinquishment NOCs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-sm text-[#172228]">Depository Liaison</div>
                    <div className="text-[11px] text-[#55636D] mt-1">Direct coordination with NSDL, CDSL, and RTAs</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-[#55636D]">
                    Need expert assistance with high-value demat transmission?
                  </div>
                  <Link
                    href="/services/succession-certificate"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Consult Our Succession Lawyers</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Direct Answers
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                13. Frequently Asked Questions: Demat Transmission Rules
              </h2>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Find answers to common questions about SEBI demat transmission rules, nominee responsibilities, and succession certificates:
              </p>

              <div className="space-y-3">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-[#172228]/10 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-xs sm:text-sm text-[#172228] pr-2">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-[#55636D] leading-relaxed border-t border-[#172228]/5 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-[#172228]/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Legal Authority
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                14. Official Regulatory Citations &amp; Depository Circulars
              </h2>

              <div className="space-y-2 text-xs text-[#55636D] leading-relaxed">
                <p><strong>Primary Statutes and Master Circulars:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>SEBI Master Circular for Registrars to an Issue and Share Transfer Agents (Circular No. SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65 dated May 18, 2022).</li>
                  <li>Depositories Act, 1996 (Act No. 22 of 1996), Sections 9 &amp; 10 (Fungibility and Depository Records).</li>
                  <li>Companies Act, 2013 (Act No. 18 of 2013), Section 56 (Transfer &amp; Transmission) &amp; Section 72 (Nomination).</li>
                  <li>Indian Succession Act, 1925 (Act No. 39 of 1925), Part X, Sections 370–390 (Grant of Succession Certificates).</li>
                  <li>Supreme Court Landmark Judgment: <em>Shakti Yezdani &amp; Anr. v. Jayanand Jayant Salgaonkar &amp; Ors. (2023 INSC 1079)</em>.</li>
                </ul>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#172228] block mb-2">Verified Government &amp; Depository Portals:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>SEBI Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.cdslindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>NSDL Depository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.cdslindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>CDSL Depository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.mfcentral.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>MF Central Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>India Code (ISA 1925)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/services/succession-certificate"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Succession Certificate Lawyers
                  </Link>
                  <Link
                    href="/tools/succession-certificate-court-fee-calculator"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Court Fee Calculator India
                  </Link>
                  <Link
                    href="/blogs/legal-heir-certificate-vs-succession-certificate"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Legal Heir vs Succession Certificate
                  </Link>
                  <Link
                    href="/templates/release-deed-format"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Relinquishment Deed Format
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author / CTA / Trust / Related)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            
            {/* CARD 1: AUTHOR BIO */}
            <div className="bg-white rounded-3xl border border-[#172228]/10 shadow-xs p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center text-sm shrink-0">AAM</div>
                <div>
                  <h3 className="font-bold text-sm text-[#172228] leading-tight">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </h3>
                  <p className="text-[11px] font-semibold text-[#C65378]">Senior Estate &amp; Succession Counsel</p>
                </div>
              </div>
              <p className="text-xs text-[#55636D] leading-relaxed">
                Advocate Anuj Anand Malik has over 15 years of experience in testamentary succession, demat share transmission petitions, and high-value estate planning at WillDrafting.in.
              </p>
              <div className="mt-3 pt-3 border-t border-[#172228]/10 flex items-center justify-between text-[11px]">
                <span className="text-[#5F7E75] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Council Verified
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
{/* CARD 2: NEED LEGAL ASSISTANCE / EMERGENCY CTA */}
            <div className="hidden lg:block rounded-3xl p-6 bg-[#172228] text-white text-center space-y-3 shadow-md">
              <span className="inline-block text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-rose-200 border border-white/10">
                Confidential Legal Advisory
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">
                Facing Frozen Demat Accounts or Share Disputes?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our estate lawyers draft and file Section 372 succession petitions across all major Indian District Courts for portfolios exceeding Rs 15 Lakhs.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/succession-certificate"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] text-white text-xs font-bold hover:bg-[#a13c5d] transition-all cursor-pointer"
                >
                  <span>Consult Succession Lawyers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-[#5F7E75]" />
                <span>100% Attorney-Client Privilege</span>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-[#172228]/10 shadow-xs p-5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#172228] mb-3">
                Why Plan With WillDrafting
              </h3>
              <ul className="space-y-2.5 text-xs text-[#55636D]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Court Delays:</strong> Direct estate vesting under Section 211 of ISA 1925.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Supreme Court Compliant:</strong> Fully aligns with Shakti Yezdani (2023) precedent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>SEBI Form ISR-5 Ready:</strong> Clear asset schedules for swift broker signoff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Advocate Verified:</strong> Every draft reviewed by senior succession counsel.</span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-[#172228]/10 shadow-xs p-5 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#172228]">
                Related Succession Guides
              </h3>
              <div className="space-y-2">
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="block p-2.5 rounded-xl border border-[#172228]/5 hover:border-[#C65378]/30 transition-all hover:bg-slate-50"
                >
                  <div className="font-bold text-xs text-[#172228]">Legal Heir vs Succession Certificate</div>
                  <div className="text-[10px] text-[#C65378] font-semibold mt-0.5 flex items-center gap-1">
                    <span>Key Differences &amp; Laws</span> &rarr;
                  </div>
                </Link>

                <Link
                  href="/services/succession-certificate"
                  className="block p-2.5 rounded-xl border border-[#172228]/5 hover:border-[#C65378]/30 transition-all hover:bg-slate-50"
                >
                  <div className="font-bold text-xs text-[#172228]">Succession Certificate Lawyers</div>
                  <div className="text-[10px] text-[#C65378] font-semibold mt-0.5 flex items-center gap-1">
                    <span>Court Petition Procedure</span> &rarr;
                  </div>
                </Link>

                <Link
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="block p-2.5 rounded-xl border border-[#172228]/5 hover:border-[#C65378]/30 transition-all hover:bg-slate-50"
                >
                  <div className="font-bold text-xs text-[#172228]">Succession Court Fee Calculator</div>
                  <div className="text-[10px] text-[#C65378] font-semibold mt-0.5 flex items-center gap-1">
                    <span>Estimate State Ad Valorem Fees</span> &rarr;
                  </div>
                </Link>

                <Link
                  href="/templates/release-deed-format"
                  className="block p-2.5 rounded-xl border border-[#172228]/5 hover:border-[#C65378]/30 transition-all hover:bg-slate-50"
                >
                  <div className="font-bold text-xs text-[#172228]">Relinquishment Deed Format</div>
                  <div className="text-[10px] text-[#C65378] font-semibold mt-0.5 flex items-center gap-1">
                    <span>Transfer Share Rights to Co-Heir</span> &rarr;
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
                  href="/services/succession-certificate"
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
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
