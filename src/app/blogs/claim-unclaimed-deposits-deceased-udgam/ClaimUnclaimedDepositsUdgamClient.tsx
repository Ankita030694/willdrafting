"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Landmark,
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
  Search,
  FileText,
  Check,
  PhoneCall,
  Briefcase,
  Layers,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Info,
  DollarSign,
  Users,
} from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

const TOC_ITEMS: TocItem[] = [
  { id: "what-is-udgam-portal", label: "1. What is the RBI UDGAM Portal?" },
  { id: "scale-of-unclaimed-dea-fund", label: "2. The RBI DEA Fund Explained" },
  { id: "step-by-step-udgam-search", label: "3. Step-by-Step UDGAM Search Guide" },
  { id: "required-documents-nominee-rules", label: "4. Documents: With or Without Nominee" },
  { id: "bank-claim-thresholds-limits", label: "5. Small Claims vs Large Claims" },
  { id: "account-types-savings-fd-ppf", label: "6. Claims by Account: Savings, FD, PPF" },
  { id: "claim-pathways-comparison", label: "7. Comparison of 3 Claim Pathways" },
  { id: "timeline-expectations-settlement", label: "8. Settlement Timeline Expectations" },
  { id: "how-will-prevents-frozen-money", label: "9. How a Will Prevents Frozen Money" },
  { id: "common-rejections-solutions", label: "10. Common Rejection Pitfalls" },
  { id: "statutory-citations-framework", label: "11. Legal Framework & Citations" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const COMPARISON_ROWS = [
  {
    parameter: "Who Can Claim?",
    nominee: "Registered Nominee on bank records",
    simplifiedHeir: "All Legal Heirs jointly (or 1 heir with NOCs)",
    courtHeir: "Legal Heirs named in Court Certificate",
    withWill: "Executor or Beneficiaries under Will",
  },
  {
    parameter: "Court Order Needed?",
    nominee: "No court order required",
    simplifiedHeir: "No (Settled under Bank Board Policy)",
    courtHeir: "Yes (Succession Certificate Part X ISA)",
    withWill: "No (Unless probate mandated / challenged)",
  },
  {
    parameter: "Applicable Balance Limit",
    nominee: "Unlimited amount",
    simplifiedHeir: "Up to bank threshold (e.g. ₹1 Lakh to ₹5 Lakhs)",
    courtHeir: "Above threshold or disputed balances",
    withWill: "Unlimited estate value",
  },
  {
    parameter: "Legal Status of Recipient",
    nominee: "Trustee / Custodian for legal heirs",
    simplifiedHeir: "Beneficial owner as statutory legal heir",
    courtHeir: "Court-recognized legal successor",
    withWill: "Absolute beneficiary under testator wishes",
  },
  {
    parameter: "Indemnity Bond Required?",
    nominee: "No (Only standard receipt / claim form)",
    simplifiedHeir: "Yes (Stamped bond with 1 or 2 sureties)",
    courtHeir: "No (Court administration bond already filed)",
    withWill: "Executor discharge receipt",
  },
  {
    parameter: "Settlement Timeframe",
    nominee: "Strictly 15 days (RBI Mandate)",
    simplifiedHeir: "30 to 45 working days",
    courtHeir: "6 to 12 months in court + 15 days bank",
    withWill: "15 to 30 days upon executor verification",
  },
  {
    parameter: "Risk of Family Disputes",
    nominee: "High (Heirs can sue nominee trustee)",
    simplifiedHeir: "Medium (Requires NOC from all known heirs)",
    courtHeir: "Low (Binding court decree with citation)",
    withWill: "Very Low (Clear written testamentary intent)",
  },
];

const FAQS = [
  {
    q: "What is the RBI UDGAM portal and what does it do?",
    a: "UDGAM (Unclaimed Deposits - Gateway to Access inforMation) is an official centralized search portal launched by the Reserve Bank of India (RBI). It allows citizens, nominees, and legal heirs to search across 30+ participating public, private, and foreign banks in one place to locate inoperative accounts and unclaimed fixed deposits, recurring deposits, or savings balances.",
  },
  {
    q: "Can I receive the unclaimed money directly online through UDGAM?",
    a: "No. UDGAM is strictly an information discovery portal, not a payment gateway. It helps you identify where unclaimed deposits exist and generates a unique Unclaimed Deposit Reference Number (UDRN). To claim the money, the registered nominee or legal heirs must visit the respective bank branch and submit physical claim documentation.",
  },
  {
    q: "What happens to a bank account after 10 years of inactivity?",
    a: "Under Section 26 of the Banking Regulation Act, 1949, any savings account, current account, or fixed deposit that remains un-operated or unclaimed for 10 consecutive years is categorized as an unclaimed deposit. Under Section 26A, banks are legally required to transfer these balances, along with accrued interest, to the RBI's Depositor Education and Awareness (DEA) Fund.",
  },
  {
    q: "Can legal heirs still claim the money after it goes to the RBI DEA Fund?",
    a: "Yes, 100%. Transferring funds to the RBI DEA Fund never takes away your ownership rights. The depositor, registered nominee, or lawful legal heirs retain an absolute, permanent right to reclaim the principal balance plus applicable interest from the bank at any time. The bank settles your claim from its own funds and subsequently claims reimbursement from the RBI.",
  },
  {
    q: "How fast must a bank settle a claim if a nominee is registered?",
    a: "Under RBI Master Directions on Settlement of Claims in respect of Deceased Depositors, banks are mandated to settle claims submitted by registered nominees within a strict maximum of 15 calendar days from receiving all completed claim documents and KYC proofs.",
  },
  {
    q: "Does a nominee become the absolute owner of the deceased's bank balance?",
    a: "No. In landmark rulings including Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023) and Sarbati Devi (1983), the Supreme Court of India confirmed that a bank nominee is merely a fiduciary trustee and provisional custodian. The nominee receives the money to give valid discharge to the bank, but holds the funds in trust for the legal heirs entitled under personal succession law or the deceased's Will.",
  },
  {
    q: "Can legal heirs claim unclaimed bank deposits without a court succession certificate?",
    a: "Yes, provided the total deposit balance falls within the bank's simplified threshold (typically up to ₹1 Lakh to ₹5 Lakhs, depending on the individual bank board's approved policy). In such cases, legal heirs can settle the account by submitting an Indemnity Bond with sureties, Affidavits, NOCs from other co-heirs, and a Legal Heir Certificate without entering civil court.",
  },
  {
    q: "When does a bank insist on a court Succession Certificate or Probate?",
    a: "Banks mandate a Succession Certificate issued by a competent Civil Court under Part X of the Indian Succession Act, 1925 (Sections 370-390) when: (1) The claim exceeds the bank's simplified ceiling (e.g. over ₹5 Lakhs at SBI), (2) There are conflicting claims or disputes among family members, or (3) There is suspicion of fraud or absence of clear legal heirship proofs.",
  },
  {
    q: "How does having a Will prevent bank deposits from becoming unclaimed?",
    a: "A comprehensive Will drafted on WillDrafting.in creates an itemized Schedule of Assets listing every bank, branch, account number, and FD folio. It names an Executor empowered under Section 211 of the Indian Succession Act to collect all estate assets, and harmonizes nominations with testamentary bequests. This prevents forgotten accounts from drifting into dormancy and avoids years of court litigation.",
  },
  {
    q: "What details are required to search for a deceased person on UDGAM?",
    a: "To search on UDGAM, you need the deceased account holder's full legal name and at least one matching official identifier: PAN card number, Voter ID, Passport number, Driving License, Date of Birth, Date of Death, or their registered postal address.",
  },
];

const SEARCH_STEPS = [
  {
    step: "01",
    title: "Register on UDGAM Portal",
    desc: "Visit https://udgam.rbi.org.in. Create an account using your active mobile number and set a password. Verify with the OTP sent to your phone.",
  },
  {
    step: "02",
    title: "Select 'Deceased Person' Tab",
    desc: "Switch the search toggle from 'Individual' to 'Deceased Person' on the search dashboard to enable family search parameters.",
  },
  {
    step: "03",
    title: "Enter Legal Name & Identifier",
    desc: "Type the deceased person's full name as per bank records. Provide at least one matching identifier: PAN, Voter ID, Passport, DOB, Date of Death, or Address.",
  },
  {
    step: "04",
    title: "Select Banks & Run Search",
    desc: "You can select specific banks (like SBI, PNB, HDFC) or choose 'All Banks' to scan across all 30+ participating financial institutions at once.",
  },
  {
    step: "05",
    title: "Record UDRN & Account Details",
    desc: "If matches are found, the portal displays the Bank Name, Branch, and a unique Unclaimed Deposit Reference Number (UDRN). Print or screenshot this result.",
  },
  {
    step: "06",
    title: "Visit the Bank Branch with Documents",
    desc: "Take the UDRN slip, death certificate, identity proofs, and relationship certificates to the branch to initiate formal claim processing.",
  },
];

export default function ClaimUnclaimedDepositsUdgamClient() {
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

  const [activeId, setActiveId] = useState<string>("what-is-udgam-portal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"nominee" | "small" | "large">("nominee");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    "doc-1": true,
    "doc-2": true,
    "doc-3": false,
    "doc-4": true,
    "doc-5": false,
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
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const targets = document.querySelectorAll(".scroll-target");
    targets.forEach((target) => observerRef.current?.observe(target));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Landmark className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN BANKING REGULATIONS &bull; POST-DEATH ASSET RECOVERY</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, zero em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            How to Claim Unclaimed Bank Deposits of Deceased via UDGAM
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Step-by-step statutory roadmap to find forgotten accounts on RBI&apos;s UDGAM portal, submit deceased depositor claim forms, navigate small claim thresholds, and reclaim money from the DEA Fund.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer text-sm sm:text-base"
            >
              <span>Draft a Will to Protect Your Accounts</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#step-by-step-udgam-search"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all text-sm sm:text-base"
            >
              <span>View Step-by-Step Guide</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Unclaimed Deposits in DEA Fund */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹78,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Unclaimed in RBI DEA Fund
              </span>
            </div>

            {/* Stat 2: Participating Banks */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                30+ Banks
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Live on UDGAM Portal
              </span>
            </div>

            {/* Stat 3: Nominee Settlement Timeline */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15 Days
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                RBI Nominee Mandate
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
                <span className="text-sm min-[400px]:text-base sm:text-lg font-extrabold text-[#172228] leading-none">
                  4.9 / 5.0
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#55636D] mt-1">
                  Verified Legal Team
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
                Governed by Section 26 & Section 26A of Banking Regulation Act, 1949 and RBI Master Directions on Deceased Depositors.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE SUMMARY: 5 GOLDEN RULES FOR UNCLAIMED DEPOSITS
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                Quick Facts About Claiming Deceased Bank Balances in India
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>UDGAM is a Search Tool, Not a Cash Counter:</strong> RBI&apos;s UDGAM portal identifies which bank branch holds the dormant account and generates a reference number (UDRN). You must visit the bank branch in person to claim the funds.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Money is Never Permanently Lost:</strong> Under Section 26A of the Banking Regulation Act, 1949, deposits inactive for 10+ years move to the RBI DEA Fund. However, legal heirs retain a permanent right to claim the full principal plus applicable interest at any time.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominees Get Paid in 15 Days:</strong> If a nominee was registered by the deceased, RBI rules strictly mandate that the bank settle the claim within 15 calendar days without demanding probate or succession certificates.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Simplified Limits Without Court:</strong> For accounts without a nominee, banks allow claims up to their board-approved threshold (typically ₹1 Lakh to ₹5 Lakhs) using simple indemnity bonds, avoiding civil court fees.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>A Will Stops Orphan Accounts:</strong> Creating an itemized asset registry and matching nominations with a Will ensures your family never leaves money behind in dormant bank accounts.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL ASSET (Image requested by user) */}
            <div className="rounded-2xl border border-[#172228]/10 bg-white p-4 sm:p-6 shadow-xs overflow-hidden">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#172228]/10 bg-[#FAF7F0] shadow-inner">
                <Image
                  src="/images/claim-unclaimed-deposits-deceased-udgam.jpg"
                  alt="Claim Unclaimed Deposits of Deceased Person on RBI UDGAM Portal with Death Certificate"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#55636D] border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>Centralized Discovery: Search Inactive Savings, FDs, RDs & PPF on UDGAM</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold text-[11px]">
                  Official RBI Portal: udgam.rbi.org.in
                </span>
              </div>
            </div>

            {/* SECTION 1: WHAT IS UDGAM */}
            <section id="what-is-udgam-portal" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>SECTION 1: THE DISCOVERY PLATFORM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. What is the RBI UDGAM Portal and What Does It Do?
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When a loved one passes away, families often struggle to piece together their financial footprint. Old bank passbooks get misplaced, fixed deposit receipts are lost during house moves, or senior citizens quietly maintain savings accounts that their children never knew existed.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                To solve this national challenge, the Reserve Bank of India (RBI), in collaboration with Reserve Bank Information Technology Pvt. Ltd. (ReBIT) and Indian Financial Technology &amp; Allied Services (IFTAS), launched the <strong>UDGAM portal</strong> (Unclaimed Deposits - Gateway to Access inforMation).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>What UDGAM Does</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
                    <li>&bull; Searches across 30+ major banks simultaneously.</li>
                    <li>&bull; Scans savings accounts, current accounts, and term deposits.</li>
                    <li>&bull; Generates an Unclaimed Deposit Reference Number (UDRN).</li>
                    <li>&bull; Reveals the exact bank name and home branch location.</li>
                  </ul>
                </div>

                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#C65378] text-sm">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>What UDGAM Does NOT Do</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
                    <li>&bull; It does NOT disburse money directly into your bank account.</li>
                    <li>&bull; It cannot bypass physical document verification at the branch.</li>
                    <li>&bull; It does not override court orders or succession rules.</li>
                    <li>&bull; It cannot settle disputes among rival legal heirs.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2: SCALE OF UNCLAIMED MONEY & DEA FUND */}
            <section id="scale-of-unclaimed-dea-fund" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 2: THE STATUTORY MECHANISM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Scale of Unclaimed Money: The RBI DEA Fund Explained
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Why does bank money become &quot;unclaimed&quot; in India? The answer lies in the 10-year rule enacted under Section 26 of the Banking Regulation Act, 1949.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                If an operative account (savings or current) or a fixed/recurring deposit sees zero customer-initiated transactions for a continuous period of 10 years, the bank is legally required to classify the funds as an unclaimed deposit.
              </p>

              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">
                  Section 26A and the Depositor Education and Awareness (DEA) Fund
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In 2014, Parliament amended the Banking Regulation Act to introduce Section 26A, creating the Depositor Education and Awareness (DEA) Fund managed directly by the RBI. Every month, scheduled commercial banks and cooperative banks must transfer all balances remaining unclaimed for 10 years to this fund.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 space-y-2">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#C65378]" />
                    <span>Scale of Unclaimed Wealth Sitting in the DEA Fund</span>
                  </div>
                  <p>
                    According to official parliamentary disclosures and RBI annual reports, over <strong>₹78,213 Crore</strong> sits in the DEA Fund across public and private banks. When including regional rural banks and cooperative lenders, the total approaches nearly <strong>₹90,000+ Crore</strong>. Over 80% of these accounts belonged to depositors who passed away without leaving a clear inventory or Will for their heirs.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900 font-medium">
                  <strong>Statutory Guarantee:</strong> Transfer of your deceased relative&apos;s money to the DEA Fund does NOT mean the Government has confiscated it. You have an irrevocable statutory right to claim both the principal and accrued interest anytime. The bank pays you first, and then seeks reimbursement from the RBI DEA Fund.
                </div>
              </div>
            </section>

            {/* SECTION 3: STEP-BY-STEP UDGAM SEARCH */}
            <section id="step-by-step-udgam-search" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Search className="w-4 h-4" />
                <span>SECTION 3: PORTAL ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Step-by-Step Guide: How to Search Deceased on UDGAM
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Searching for a deceased relative&apos;s unclaimed accounts on UDGAM takes less than 10 minutes. Follow these practical steps to pull up dormant bank records:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {SEARCH_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#C65378]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#C65378] font-extrabold text-sm flex items-center justify-center mb-3">
                        {step.step}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5 mt-2">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Pro Tip for Accurate Search Results</span>
                </div>
                <p>
                  Senior citizens often registered accounts decades ago with slight spelling variations, or only initial letters (e.g., &quot;R. K. Sharma&quot; instead of &quot;Ramesh Kumar Sharma&quot;). If your first search returns zero results, try searching with PAN card number or Date of Birth. PAN is the most reliable cross-bank identifier.
                </p>
              </div>
            </section>

            {/* SECTION 4: REQUIRED DOCUMENTS */}
            <section id="required-documents-nominee-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 4: VERIFICATION DOSSIER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Required Documents: Claiming with or Without a Nominee
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Once you have identified the bank and generated the UDRN, you must assemble the claim dossier. The exact paperwork depends entirely on whether a registered nominee exists on the account.
              </p>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveTab("nominee")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "nominee"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Scenario A: With Registered Nominee
                </button>
                <button
                  onClick={() => setActiveTab("small")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "small"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Scenario B: Without Nominee (Under Bank Limit)
                </button>
                <button
                  onClick={() => setActiveTab("large")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "large"
                      ? "bg-[#C65378] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Scenario C: High-Value / Disputed Claims
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "nominee" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">
                      Checklist for Registered Nominee Claim (Fast-Track 15-Day Route)
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      RBI Fast-Track
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    If the deceased registered your name as nominee during their lifetime, the procedure is simple and cannot be delayed by bank staff.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Deceased Depositor Claim Form (Annexure A):</strong> Signed by the nominee. Available at branch or downloadable from bank website.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Original Death Certificate:</strong> Issued by the Municipal Corporation / Registrar of Births &amp; Deaths (branch verifies and returns original).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>KYC of the Nominee:</strong> Self-attested PAN card, Aadhaar card, and current address proof of the nominee.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Original Passbook / Term Deposit Receipt:</strong> If lost, a standard Indemnity for Lost Deposit Receipt on ₹100 stamp paper.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Cancelled Cheque of Nominee:</strong> For direct electronic bank transfer (NEFT/RTGS) of the claimed amount.</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                    <strong>Crucial Supreme Court Rule:</strong> As established in <em>Shakti Yezdani (2023)</em>, the nominee receives money as a trustee. If other legal heirs exist, the nominee must distribute their statutory shares or risk civil litigation.
                  </div>
                </div>
              )}

              {activeTab === "small" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">
                      Checklist for Legal Heirs Without Nominee (Simplified Threshold)
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Indemnity Route
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    When no nominee was registered, but the balance is within the bank&apos;s board-approved limit (e.g. up to ₹5 Lakhs), no court succession certificate is required.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Joint Claim Form:</strong> Signed by all legal heirs (spouse, children, mother under Hindu Succession Act Class 1).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Legal Heir Certificate / Surviving Member Certificate:</strong> Issued by the Tehsildar, Revenue Authority, or Sub-Divisional Magistrate (SDM).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Letter of Disclaimer / Relinquishment (Annexure C):</strong> Signed by other heirs if they wish payment made into one heir&apos;s account.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Stamped Letter of Indemnity (Annexure B):</strong> Executed on state-mandated non-judicial stamp paper with 1 or 2 independent sureties.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Sureties&apos; KYC &amp; Worth Proof:</strong> Salary slips, ITR copies, or municipal tax receipts proving financial solvency of the sureties.</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "large" && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">
                      Checklist for High-Value or Contested Balances
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Court Decree
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    If the balance exceeds the bank&apos;s ceiling or multiple relatives are fighting over the funds, the bank will refuse indemnity and insist on a formal court decree.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Court Succession Certificate:</strong> Issued by a competent Senior Civil Judge / District Court under Part X (Sections 370-390) of the Indian Succession Act, 1925, specifically listing the bank accounts and FD numbers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Probate of Will / Letters of Administration:</strong> If the deceased left a Will, and the property falls in Kolkata, Chennai, Mumbai or where probate is mandatory under Section 213.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Certified Copy of Court Order:</strong> Attested by the court registry along with fee receipts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>KYC of the Court-Appointed Administrator / Legal Successor:</strong> Complete identity proofs and bank account details.</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-rose-50 rounded-xl text-xs text-[#C65378] flex items-center justify-between">
                    <span>Need help applying for a Succession Certificate in court?</span>
                    <Link
                      href="/services/succession-certificate"
                      className="font-bold underline hover:text-[#a13c5d] inline-flex items-center gap-1"
                    >
                      <span>Succession Lawyers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 5: BANK CLAIM THRESHOLDS */}
            <section id="bank-claim-thresholds-limits" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CreditCard className="w-4 h-4" />
                <span>SECTION 5: MONETARY CEILINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Bank Claim Thresholds: Small Claims vs Large Claims
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under RBI directives, every bank&apos;s Board of Directors has established an internal monetary ceiling. Within this limit, branch managers can settle claims on an indemnity basis without asking grieving families to spend tens of thousands on court fees and lawyers.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                      <th className="p-3 font-extrabold">Bank / Institution</th>
                      <th className="p-3 font-extrabold">Simplified Ceiling (No Court Order)</th>
                      <th className="p-3 font-extrabold">Surety Requirement</th>
                      <th className="p-3 font-extrabold">Authority Level for Approval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">State Bank of India (SBI)</td>
                      <td className="p-3 font-semibold text-emerald-700">Up to ₹5,00,000</td>
                      <td className="p-3">Two independent sureties of equal net worth</td>
                      <td className="p-3">Branch Manager / AGM</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Punjab National Bank (PNB)</td>
                      <td className="p-3 font-semibold text-emerald-700">Up to ₹2,50,000 / ₹5,00,000</td>
                      <td className="p-3">One or two solvent sureties</td>
                      <td className="p-3">Chief Manager / Circle Office</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Bank of Baroda (BOB)</td>
                      <td className="p-3 font-semibold text-emerald-700">Up to ₹2,50,000</td>
                      <td className="p-3">Two sureties with income proof</td>
                      <td className="p-3">Branch Head / Regional Head</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">Canara Bank</td>
                      <td className="p-3 font-semibold text-emerald-700">Up to ₹2,00,000</td>
                      <td className="p-3">One acceptable surety</td>
                      <td className="p-3">Divisional Office / Branch Head</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">HDFC Bank &amp; ICICI Bank</td>
                      <td className="p-3 font-semibold text-emerald-700">₹1,00,000 to ₹5,00,000*</td>
                      <td className="p-3">Based on customer risk categorization</td>
                      <td className="p-3">Cluster Head / Nodal Officer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Note: Bank board policies are revised periodically. Always request the specific bank branch&apos;s latest Deceased Depositor Claim Policy circular before executing stamp papers.
              </p>
            </section>

            {/* SECTION 6: CLAIMS BY ACCOUNT TYPE */}
            <section id="account-types-savings-fd-ppf" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>SECTION 6: ASSET CATEGORIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Claim Process by Account: Savings, FDs, RDs &amp; PPF
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Different financial products have distinct interest calculation rules and operational procedures when transferred to the DEA Fund:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C65378]" />
                    <span>Savings &amp; Current Accounts</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Once marked inoperative, savings accounts continue to earn regular savings interest until they hit the 10-year mark. After transfer to the DEA Fund, the RBI specifies a statutory interest rate (currently around 3% per annum). Current accounts do not earn interest unless held under specific court-mandated escrow arrangements.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#5F7E75]" />
                    <span>Fixed Deposits (FDs) &amp; Recurring Deposits (RDs)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Term deposits earn the agreed contractual interest until their maturity date. If the deposit is not renewed or claimed after maturity, banks apply the prevailing savings account rate or contracted rate (whichever is lower) under RBI master directions until transfer to the DEA Fund. Both principal and interest are refunded upon claim.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-600" />
                    <span>Public Provident Fund (PPF) Accounts</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    PPF accounts mature after 15 years. Upon the death of the subscriber, the account cannot be continued by legal heirs; it must be closed. Under PPF Scheme 2019 rules, interest continues to accrue at the post-office savings rate until closure. Claims are filed at the managing post office or bank branch using Form G (nominee) or Form H (legal heirs).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span>Safe Deposit Lockers</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an operative account linked to a bank locker becomes dormant and rent is unpaid, banks follow RBI locker breaking guidelines. Breaking is conducted before independent witnesses, a panchnama and video recording are executed, and inventoried contents are sealed in an envelope for the legal heirs or court-appointed executor.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="claim-pathways-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 7: HEAD-TO-HEAD COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Head-to-Head Comparison: Three Bank Claim Pathways
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding which route your family qualifies for is essential before you spend money on stamp paper, affidavits, or legal counsel:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-extrabold min-w-[140px]">Feature</th>
                      <th className="p-3.5 font-extrabold min-w-[170px] bg-[#1f2d35]">1. Nominee Route</th>
                      <th className="p-3.5 font-extrabold min-w-[180px]">2. Simplified Indemnity</th>
                      <th className="p-3.5 font-extrabold min-w-[190px]">3. Succession Certificate</th>
                      <th className="p-3.5 font-extrabold min-w-[180px] bg-rose-950/40 text-rose-200">4. Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="p-3 font-bold text-slate-900">{row.parameter}</td>
                        <td className="p-3 bg-slate-50/30">{row.nominee}</td>
                        <td className="p-3">{row.simplifiedHeir}</td>
                        <td className="p-3">{row.courtHeir}</td>
                        <td className="p-3 bg-rose-50/30 font-medium text-slate-900">{row.withWill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: TIMELINE EXPECTATIONS */}
            <section id="timeline-expectations-settlement" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>SECTION 8: TURNAROUND TIMES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Timeline Expectations: How Long Does Settlement Take?
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                How quickly will the bank transfer the money to your account? The answer depends strictly on documentation completeness and regulatory deadlines:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Nominee Claim (Complete KYC &amp; Death Certificate)</div>
                    <div className="text-xs text-slate-500">RBI Master Direction mandates strict disposal</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold self-start sm:self-center">
                    Strictly 15 Calendar Days
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Simplified Legal Heir Claim (Indemnity &amp; NOCs)</div>
                    <div className="text-xs text-slate-500">Internal branch verification and surety validation</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold self-start sm:self-center">
                    30 to 45 Working Days
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Succession Certificate Route (Civil Court)</div>
                    <div className="text-xs text-slate-500">Court filings, newspaper notice, hearings &amp; decree</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold self-start sm:self-center">
                    6 to 12 Months
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <strong>Crucial Consumer Right:</strong> You do NOT have to wait for the RBI to release money to the bank. The bank is legally obligated to settle your verified claim from its own liquidity first. The bank later files an internal monthly claim for reimbursement with the RBI DEA Fund.
              </p>
            </section>

            {/* SECTION 9: HOW A WILL PREVENTS THIS (CONVERSION BRIDGE) */}
            <section id="how-will-prevents-frozen-money" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>SECTION 9: PROACTIVE ESTATE PLANNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. How a Will and Matched Nominees Prevent Frozen Money
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Why did over <strong>₹78,000 Crore</strong> end up stranded in the DEA Fund in the first place? In 95% of cases, it happens because of two simple mistakes:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">1. Zero Asset Catalog</div>
                  <p className="text-slate-600">Family members had no single document listing where the deceased held bank accounts, FD certificates, or demat holdings.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">2. Mismatched or Missing Nominees</div>
                  <p className="text-slate-600">The nominee was either never added, had predeceased the account holder, or differed from what the legal heirs expected.</p>
                </div>
              </div>

              {/* Conversion Card linking to /start */}
              <div className="rounded-2xl bg-[#172228] text-white p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>THE PERMANENT SOLUTION</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                  Don&apos;t Let Your Hard-Earned Savings Sit in the RBI DEA Fund
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Drafting a legally binding Will on WillDrafting.in takes just 15 minutes. It lets you catalog all your bank accounts, name an Executor empowered under Section 211 of the Indian Succession Act, and align your bank nominations with your true heirs.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer shadow-lg"
                  >
                    <span>Create Your Will Online in 15 Mins</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/tools/succession-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                  >
                    <span>Check Legal Heir Shares</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON REJECTIONS */}
            <section id="common-rejections-solutions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>SECTION 10: PITFALLS &amp; DEFENSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Common Rejection Reasons and How to Avoid Them
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Bank legal departments reject roughly 25% of first-time deceased depositor claims due to avoidable clerical errors:
              </p>

              <div className="space-y-3">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Name Discrepancies Between Bank Records and Death Certificate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    If the deceased is recorded as &quot;S. P. Gupta&quot; in the passbook but &quot;Satya Prakash Gupta&quot; on the death certificate, submit a Notarized One-and-the-Same Person Affidavit along with supporting Aadhaar/PAN history.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Omitting Married Daughters from Legal Heir List</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    Under Hindu Succession Act amendments and Supreme Court rulings (<em>Vineeta Sharma 2020</em>), married daughters are equal coparceners and Class 1 legal heirs. The bank will reject claims if daughters are omitted from the claim form or disclaimer NOCs.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Insolvent or Family-Member Sureties on Indemnity Bond</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-4">
                    Most banks mandate that the sureties signing the Indemnity Bond must be independent third parties (not heirs receiving the money) with verifiable income proofs or real estate ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS */}
            <section id="statutory-citations-framework" className="scroll-target scroll-mt-28 space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4" />
                <span>SECTION 11: REGULATORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Framework and Official Statutory Citations
              </h3>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>
                  <strong>Banking Regulation Act, 1949:</strong> Section 26 (Return of Unclaimed Deposits), Section 26A (Depositor Education and Awareness Fund), Section 45ZA to 45ZF (Nomination Facilities).
                </li>
                <li>
                  <strong>RBI Master Directions:</strong> Master Direction on Settlement of Claims in respect of Deceased Depositors (DBOD.No.Leg.BC.95/09.07.005/2004-05 &amp; subsequent updates).
                </li>
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 211 (Character and property of executor or administrator as such), Section 213 (Right of executor or legatee when established), Part X (Sections 370-390, Grant of Succession Certificate).
                </li>
                <li>
                  <strong>Supreme Court of India Precedents:</strong> <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023)</em>, <em>Smt. Sarbati Devi v. Smt. Usha Devi (1983) 1 SCC 500</em>, and <em>Ram Chander Talwar v. Devender Kumar Talwar (2010)</em>.
                </li>
              </ul>

              <div className="pt-4 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Explore Related Post-Death Guides &amp; Services:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/blogs/legal-heir-certificate-vs-succession-certificate"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Legal Heir vs Succession Certificate &rarr;
                  </Link>
                  <Link
                    href="/services/succession-certificate"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Succession Certificate Legal Service &rarr;
                  </Link>
                  <Link
                    href="/blogs/demat-shares-transmission-after-death-sebi"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Demat Shares Transmission SEBI Guide &rarr;
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Property Transfer After Death Without Will &rarr;
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Free Will Format (English) &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 12: DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Claiming Deceased Deposits
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear statutory answers to common questions about claiming unclaimed money from UDGAM and the RBI DEA Fund.
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
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author & Action Cards)
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
                Bar Council enrolled advocate with 18+ years of expertise in testamentary litigation, bank claim dispute settlements, and probate matters at WillDrafting.in.
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
{/* CARD 2: ACTION CTA CARD */}
            <div className="hidden lg:block bg-[#172228] rounded-3xl p-6 text-white text-center shadow-lg shadow-slate-900/10 space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL &amp; SECURE</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Protect Your Family&apos;s Bank Accounts
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avoid frozen accounts and court delays. Draft an advocate-verified, court-ready Will in 15 minutes with our step-by-step wizard.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <span>Draft Your Will Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>Need guidance? Consult our team</span>
              </div>
            </div>

            {/* CARD 3: INTERACTIVE TOOLS */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Interactive Succession Tools
              </h4>
              <div className="space-y-2">
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Calculate legal heir shares under Hindu/Muslim law &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/will-checklist"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Will Preparation Checklist</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    18-point audit before signing your Will &rarr;
                  </div>
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Probate Requirement Checker</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Check if court probate is mandatory in your city &rarr;
                  </div>
                </Link>
              </div>
            </div>

            {/* CARD 4: RELATED TEMPLATES & GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Related Legal Resources
              </h4>
              <div className="space-y-2">
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Legal Heir vs Succession Cert</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Which certificate do you need for banks? &rarr;
                  </div>
                </Link>
                <Link
                  href="/services/succession-certificate"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Court Succession Certificate</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Advocate assistance for court petitions &rarr;
                  </div>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Will Format in India (English)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Clause-annotated plain paper template &rarr;
                  </div>
                </Link>
                <Link
                  href="/blogs/demat-shares-transmission-after-death-sebi"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">SEBI Demat Transmission</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    ₹15 Lakh threshold &amp; Form ISR-5 rules &rarr;
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
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
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
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
