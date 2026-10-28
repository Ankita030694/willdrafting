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
  PhoneCall,
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
  Download,
  Info,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Which Certificate Do You Need?" },
  { id: "comparison-matrix", label: "2. Direct Comparison: Key Differences" },
  { id: "asset-decision-matrix", label: "3. Asset-by-Asset Guide (Which Certificate for What?)" },
  { id: "succession-cert-procedure", label: "4. How to Get a Succession Certificate from Court" },
  { id: "legal-heir-procedure", label: "5. How to Get a Legal Heir Certificate from Tehsildar" },
  { id: "visual-blueprint", label: "6. Visual Flowchart: Which One Should You Apply For?" },
  { id: "documents-required", label: "7. Documents Needed for Both Certificates" },
  { id: "state-portals", label: "8. State-by-State Online Portals" },
  { id: "post-issuance-steps", label: "9. What to Do After You Receive the Certificate" },
  { id: "cost-and-timeline", label: "10. Costs & Timelines Compared" },
  { id: "avoid-with-a-will", label: "11. How Writing a Will Saves You from Both" },
  { id: "legal-services", label: "12. Our Legal Support & Services" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Relevant Laws & Official Portals" },
];

const COMPARISON_ROWS = [
  {
    parameter: "Issuing Authority",
    legalHeir: "Tehsildar, Talukdar, Mandal Revenue Officer (MRO), or Sub-Divisional Magistrate (SDM)",
    successionCert: "Civil District Judge or Senior Civil Judge having territorial & pecuniary jurisdiction",
    winner: "Legal Heir (Faster Administrative)",
  },
  {
    parameter: "Governing Statute",
    legalHeir: "State Land Revenue Codes, citizen charters, and state revenue department orders",
    successionCert: "Part X of the Indian Succession Act, 1925 (Central Act No. 39 of 1925)",
    winner: "Succession Cert (Parliamentary Statute)",
  },
  {
    parameter: "Core Legal Purpose",
    legalHeir: "Identifies surviving family kinship for pensions, compassionate jobs, and municipal mutation",
    successionCert: "Conclusively establishes title to recover debts and transfer negotiable securities",
    winner: "Succession Cert (Confers Legal Title)",
  },
  {
    parameter: "Asset Applicability",
    legalHeir: "Immovable land mutation, employee benefits, insurance dues, small bank balances",
    successionCert: "Movable assets strictly: Bank FDs, demat shares, mutual funds, government bonds",
    winner: "Depends on asset category",
  },
  {
    parameter: "Immovable Property Scope",
    legalHeir: "Accepted for municipal and land revenue records mutation (with registered deeds)",
    successionCert: "Barred under Section 370; cannot be granted for land, flats, or real estate",
    winner: "Legal Heir Certificate Only",
  },
  {
    parameter: "Statutory Indemnity for Banks",
    legalHeir: "No statutory indemnity; banks accept at discretion with indemnity bond and sureties",
    successionCert: "Absolute statutory protection under Section 381; debtors are fully discharged",
    winner: "Succession Cert (Complete Protection)",
  },
  {
    parameter: "Application & Court Fees",
    legalHeir: "Nominal administrative fee: ₹20 to ₹100 depending on state e-District portal",
    successionCert: "Ad valorem court fees under Court Fees Act: typically 2% to 7.5% of total asset value",
    winner: "Legal Heir (Significantly Cheaper)",
  },
  {
    parameter: "Processing Timeline",
    legalHeir: "15 to 30 days after revenue inspector or Patwari field verification",
    successionCert: "6 to 12 months due to civil petition, newspaper notices, hearings, and bond execution",
    winner: "Legal Heir (Much Faster)",
  },
  {
    parameter: "Public Notice Requirement",
    legalHeir: "None required in most states; local village or ward verification is conducted",
    successionCert: "Mandatory public citation in national and local newspapers with 30-45 day objection window",
    winner: "Legal Heir (Private)",
  },
  {
    parameter: "Appellate & Revocation Forum",
    legalHeir: "Revenue Sub-Divisional Magistrate, District Collector, or Civil Title Suit",
    successionCert: "High Court appeal under Section 384; court revocation under Section 383",
    winner: "Succession Cert (High Court Jurisdiction)",
  },
];

const ASSET_DECISION_CARDS = [
  {
    asset: "Immovable Property (Flats, Houses, Land)",
    badge: "Real Estate",
    requiredDoc: "Legal Heir Certificate + Registered Relinquishment Deed",
    explanation:
      "Section 370 bars civil courts from granting a succession certificate for real estate. Revenue offices accept a Legal Heir Certificate. Heirs also sign a registered Release Deed or Family Settlement Deed to complete municipal mutation.",
    color: "emerald",
  },
  {
    asset: "Bank Savings Accounts & Fixed Deposits",
    badge: "Banking Assets",
    requiredDoc: "Nominee First; Legal Heir Cert if < ₹5L; Succession Cert if > ₹5L",
    explanation:
      "A registered nominee receives bank funds quickly upon submitting a death certificate. If no nominee exists, banks allow small claims using a Legal Heir Certificate and indemnity bond. High balances require a court certificate.",
    color: "blue",
  },
  {
    asset: "Demat Shares, Stocks & Mutual Funds",
    badge: "Capital Markets",
    requiredDoc: "Succession Certificate (or SEBI simplified transmission if < ₹5L)",
    explanation:
      "SEBI rules allow share transmission on a Legal Heir Certificate up to ₹5 Lakhs per company. For larger stock portfolios or contested shares, depositories require a Succession Certificate.",
    color: "rose",
  },
  {
    asset: "Government Pension, Gratuity & GPF",
    badge: "Public Sector",
    requiredDoc: "Legal Heir Certificate (Surviving Member Certificate)",
    explanation:
      "Government departments and treasuries accept a Legal Heir Certificate. They use it to sanction family pensions, release employee gratuity, and process compassionate jobs.",
    color: "amber",
  },
  {
    asset: "Life Insurance & Postal Life Insurance",
    badge: "Insurance Policies",
    requiredDoc: "Nominee Claim; Legal Heir Certificate if No Nominee",
    explanation:
      "Under Section 39 of the Insurance Act, 1938, registered nominees receive the insurance payout directly. If no nominee is on record, insurers pay the claim using a Legal Heir Certificate.",
    color: "indigo",
  },
  {
    asset: "Motor Vehicles (Cars, Commercial Fleets)",
    badge: "Transport Department",
    requiredDoc: "Legal Heir Certificate + RTO Form 31 + NOC",
    explanation:
      "The regional transport office (RTO) transfers car ownership under Rule 56 of the Central Motor Vehicles Rules. The applicant submits a Legal Heir Certificate and NOC from other family members.",
    color: "teal",
  },
];

const STATE_PORTAL_DATA = [
  {
    state: "Delhi NCT",
    portal: "e-District Delhi",
    certificateName: "Surviving Member Certificate",
    authority: "Sub-Divisional Magistrate (SDM)",
    fee: "₹20 + nominal portal fee",
    timeline: "14 to 21 Days",
    url: "https://edistrict.delhigovt.nic.in",
  },
  {
    state: "Maharashtra",
    portal: "Aaple Sarkar",
    certificateName: "Varisa Pramanpatra (Legal Heir)",
    authority: "Tehsildar / Taluka Executive Magistrate",
    fee: "₹50 (MahaOnline fee)",
    timeline: "15 to 30 Days",
    url: "https://aaplesarkar.mahaonline.gov.in",
  },
  {
    state: "Tamil Nadu",
    portal: "e-Sevai (TNeGA)",
    certificateName: "Legal Heirship Certificate",
    authority: "Taluk Tahsildar (Revenue Department)",
    fee: "₹60 (e-Sevai service charges)",
    timeline: "15 Days",
    url: "https://www.tnesevai.tn.gov.in",
  },
  {
    state: "Karnataka",
    portal: "Seva Sindhu / Nadakacheri",
    certificateName: "Surviving Family Member Certificate",
    authority: "Tahsildar / Atalji Janasnehi Kendra",
    fee: "₹40 (service charge)",
    timeline: "14 to 21 Days",
    url: "https://sevasindhu.karnataka.gov.in",
  },
  {
    state: "Uttar Pradesh",
    portal: "eSathi UP",
    certificateName: "Varisan Praman Patra",
    authority: "Tehsildar / Revenue Inspector",
    fee: "₹30 to ₹50",
    timeline: "15 to 30 Days",
    url: "https://esathi.up.gov.in",
  },
  {
    state: "West Bengal",
    portal: "e-District West Bengal",
    certificateName: "Legal Heir Certificate",
    authority: "Block Development Officer (BDO) / SDO",
    fee: "₹20 nominal",
    timeline: "21 to 30 Days",
    url: "https://edistrict.wb.gov.in",
  },
  {
    state: "Telangana",
    portal: "MeeSeva Telangana",
    certificateName: "Family Member Certificate",
    authority: "Tahsildar (Revenue Mandal)",
    fee: "₹45 (MeeSeva charges)",
    timeline: "15 Days",
    url: "https://ts.meeseva.telangana.gov.in",
  },
  {
    state: "Andhra Pradesh",
    portal: "MeeSeva AP",
    certificateName: "Family Member Certificate",
    authority: "Tahsildar (Mandal Revenue)",
    fee: "₹45 (MeeSeva charges)",
    timeline: "15 Days",
    url: "https://ap.meeseva.gov.in",
  },
  {
    state: "Gujarat",
    portal: "Digital Gujarat",
    certificateName: "Pedhinama / Varai Certificate",
    authority: "Talati / Mamlatdar Office",
    fee: "₹50 (digital portal fee)",
    timeline: "15 to 25 Days",
    url: "https://www.digitalgujarat.gov.in",
  },
  {
    state: "Rajasthan",
    portal: "e-Mitra Rajasthan",
    certificateName: "Warisan Praman Patra",
    authority: "Tehsildar / Sub-Divisional Officer",
    fee: "₹50 (kiosk service fee)",
    timeline: "21 to 30 Days",
    url: "https://emitra.rajasthan.gov.in",
  },
  {
    state: "Kerala",
    portal: "e-District Kerala",
    certificateName: "Relationship / Legal Heirship",
    authority: "Tahsildar (Taluk Office)",
    fee: "₹40 to ₹60",
    timeline: "15 to 30 Days",
    url: "https://edistrict.kerala.gov.in",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the main difference between a Legal Heir Certificate and a Succession Certificate?",
    a: "A Legal Heir Certificate (also known as Varisu or Surviving Member Certificate) is a quick government document issued by your local revenue officer (Tehsildar or SDM) within 15 to 30 days for just ₹20 to ₹100. It proves family relationship for government pensions, employment dues, and property tax changes. A Succession Certificate is a formal judicial order issued only by a District Civil Court after 6 to 12 months, requiring 2% to 7.5% court fees. It is needed strictly to claim bank balances, fixed deposits, shares, and mutual funds left by someone who died without a Will.",
  },
  {
    q: "Can I get a Succession Certificate for a house, flat, or land?",
    a: "No! Under Section 370 of the Indian Succession Act, 1925, a Succession Certificate cannot be issued for real estate or agricultural land. To transfer inherited land or a flat left without a Will, the family must use a Legal Heir Certificate and register a family Release Deed at the Sub-Registrar Office, or apply for Letters of Administration in court.",
  },
  {
    q: "Can I use a Legal Heir Certificate to claim bank money and shares?",
    a: "For smaller amounts (usually under ₹5 Lakhs), many banks and mutual funds will release the money using a Legal Heir Certificate and an indemnity bond. However, for larger amounts (often above ₹5 to ₹15 Lakhs) or if there is any dispute among family members, banks and share registries will legally demand a court-issued Succession Certificate (under Section 381).",
  },
  {
    q: "Who issues a Legal Heir Certificate in India?",
    a: "A Legal Heir Certificate is issued by local government revenue authorities, usually the Tehsildar, Talukdar, Mandal Revenue Officer (MRO), or Sub-Divisional Magistrate (SDM) of the district where the deceased person lived.",
  },
  {
    q: "How much does each certificate cost?",
    a: "A Legal Heir Certificate costs only a nominal fee of ₹20 to ₹100 on your state government portal. A Succession Certificate is much more expensive: the court fee alone is 2% to 7.5% of the total bank money and shares (up to ₹75,000+ in states like Maharashtra, and uncapped in others), plus ₹6,000 to ₹12,000 for mandatory newspaper advertisements and lawyer fees.",
  },
  {
    q: "How long does it take to get each certificate?",
    a: "A Legal Heir Certificate usually takes only 15 to 30 days after local revenue verification. A Succession Certificate takes 6 to 12 months in court, because the court must publish public notices in newspapers, allow 30 to 45 days for anyone to object, conduct hearings, and prepare the final sealed decree.",
  },
  {
    q: "Can a Legal Heir Certificate be cancelled if someone cheated?",
    a: "Yes. If an applicant fraudulently left out a sister, brother, or mother from the application, the Sub-Divisional Magistrate (SDM) or District Collector can cancel the certificate immediately upon complaint. The aggrieved family member can also file a civil suit in court.",
  },
  {
    q: "What happens if there is already a nominee on the bank account?",
    a: "Under Supreme Court rulings (Sarbati Devi and Shakti Yezdani) and RBI rules, a nominee can collect the money from the bank immediately without needing any court certificate. However, the nominee does not become the owner; they must distribute the money among all rightful legal heirs.",
  },
  {
    q: "How does writing a Will save my family from both certificates?",
    a: "Yes! If the person wrote a valid Will, the beneficiaries inherit directly. Banks and financial institutions transfer money and shares based on the Will and death certificate. Your family never needs to pay thousands in court fees or spend months visiting government offices.",
  },
  {
    q: "Where can I apply online for a Legal Heir Certificate?",
    a: "Most states offer easy online applications through state portals: e-District Delhi in Delhi, Aaple Sarkar in Maharashtra, e-Sevai in Tamil Nadu, Seva Sindhu in Karnataka, eSathi in Uttar Pradesh, and MeeSeva in Telangana and Andhra Pradesh.",
  },
];

export default function LegalHeirCertificateVsSuccessionCertificateClient() {
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
  const [activeTab, setActiveTab] = useState<"legal-heir" | "succession">("legal-heir");

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
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT 1925 &bull; POST-DEATH INHERITANCE GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Legal Heir Certificate vs Succession Certificate Explained
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Compare an administrative Legal Heir Certificate from the Tehsildar with a judicial Succession Certificate from the Civil Court. Learn asset rules, court fees, timelines, and how a valid Will bypasses both.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft Your Will Online in 15 Minutes</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#asset-decision-matrix"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Decision Flowchart</span>
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
                Estates &amp; Wills Handled
              </span>
            </div>

            {/* Stat 3: Asset Value */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹1,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Asset Value Protected
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
                Google &amp; Legal Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-5 xl:gap-6 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-4 overflow-hidden">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-2.5 rounded-lg transition-colors leading-snug ${
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

              <div className="mt-4 pt-3 border-t border-[#172228]/10">
                <div className="flex items-start gap-2 bg-[#FAF7F0] p-2.5 rounded-xl border border-[#172228]/5">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#55636D] leading-tight">
                    Statutory Compliance: Part X, Indian Succession Act, 1925 &amp; State Revenue Rules
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <div className="space-y-8 md:space-y-10 min-w-0">
            
            {/* SECTION 0: EXECUTIVE SUMMARY / BRIEF BOX */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-[5px] border-l-[#C65378] p-5 sm:p-6 shadow-xs border border-[#172228]/5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-3">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>Executive Legal Brief</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#172228] mb-4">
                Key Takeaways: Choosing Between Both Certificates
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#55636D]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172228]">Different Issuers:</strong> A Legal Heir Certificate comes from the local Tehsildar. A Succession Certificate comes from a Civil District Judge.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172228]">No Real Estate for Succession Certificate:</strong> Under Section 370 of the Indian Succession Act, courts cannot grant a Succession Certificate for land, houses, or flats.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172228]">Bank Claim Limits:</strong> Small bank deposits can often be settled using a Legal Heir Certificate. Large balances require a Succession Certificate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172228]">Cost and Time Gap:</strong> A Legal Heir Certificate takes 15 to 30 days and costs under ₹100. A Succession Certificate takes 6 to 12 months in court and incurs court fees up to 7.5%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172228]">Best Protection:</strong> Writing a valid Will avoids both certificates. The named executor transfers assets directly under Section 211.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>Statutory Authority &amp; Legal Hierarchy</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                1. Statutory Framework: Indian Succession Act &amp; State Rules
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                When a person dies without a Will in India, their estate follows intestate succession rules. Family members face strict demands from banks, mutual funds, and revenue offices. Each agency asks for legal proof before releasing money or transferring property records.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The main difference begins with legal origin. A <strong>Succession Certificate</strong> is created by a central law. It is governed by Part X of the Indian Succession Act, 1925 (Sections 370 to 390). Only a Civil District Judge can issue it after a formal court hearing.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                In contrast, a <strong>Legal Heir Certificate</strong> has no central parliamentary act. It is an administrative document issued under state land revenue codes. Local officers like the Tehsildar, Talukdar, or SDM issue it after local Patwari field verification.
              </p>
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-950 block mb-1">
                    Crucial Legal Distinction:
                  </strong>
                  A Legal Heir Certificate only proves family relationship. It does not give legal title to any specific bank deposit or share. Only a court Succession Certificate protects banks from future liability under Section 381.
                </div>
              </div>
            </section>

            {/* SECTION 2: COMPARISON MATRIX */}
            <section id="comparison-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span>Head-to-Head Evaluation</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                2. Head-to-Head Comparison: Core Differences at a Glance
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Review this direct legal comparison before applying. Understanding these parameters helps you avoid wasted fees and needless delays.
              </p>

              <div className="rounded-2xl border border-[#172228]/10 overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Parameter</th>
                        <th className="py-3.5 px-4 font-bold">Legal Heir Certificate</th>
                        <th className="py-3.5 px-4 font-bold">Succession Certificate</th>
                        <th className="py-3.5 px-4 font-bold">Practical Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#172228]/10">
                      {COMPARISON_ROWS.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]/50"}>
                          <td className="py-3 px-4 font-bold text-[#172228] whitespace-nowrap">
                            {row.parameter}
                          </td>
                          <td className="py-3 px-4 text-[#55636D]">{row.legalHeir}</td>
                          <td className="py-3 px-4 text-[#55636D]">{row.successionCert}</td>
                          <td className="py-3 px-4 font-medium text-[#C65378] whitespace-nowrap">
                            {row.winner}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: ASSET-BY-ASSET DECISION MATRIX */}
            <section id="asset-decision-matrix" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Decision Flowchart</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                3. Which Certificate Do You Need: Asset-by-Asset Guide
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The document you need depends on the type of asset. Follow this guide to see whether you should visit the Tehsildar or approach the District Court.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {ASSET_DECISION_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-[#172228]">
                          {card.badge}
                        </span>
                        <span className="text-xs font-bold text-[#5F7E75]">Scenario #{idx + 1}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#172228] leading-tight">
                        {card.asset}
                      </h3>
                      <div className="mt-2 text-xs font-bold text-[#C65378] bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                        Required: {card.requiredDoc}
                      </div>
                      <p className="text-xs text-[#55636D] leading-relaxed mt-2.5">
                        {card.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: SUCCESSION CERTIFICATE IN COURT */}
            <section id="succession-cert-procedure" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                <span>Part X Indian Succession Act</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                4. Succession Certificate in Court: Part X Jurisdiction
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Part X of the Indian Succession Act, 1925 governs the judicial recovery of debts and securities. Understanding these core sections protects your rights during court proceedings:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#C65378] font-mono">
                      Section 370
                    </span>
                    <span>No Immovable Real Estate</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#55636D] mt-1.5 leading-relaxed">
                    This section bars courts from granting succession certificates for real estate. Land and apartments require partition deeds, Letters of Administration, or probate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#C65378] font-mono">
                      Section 371 &amp; 372
                    </span>
                    <span>Filing the Court Petition</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#55636D] mt-1.5 leading-relaxed">
                    The petition must be filed where the deceased lived. The applicant must list all debts, bank accounts, folio numbers, and surviving relatives under oath.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#C65378] font-mono">
                      Section 381
                    </span>
                    <span>Complete Protection for Banks</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#55636D] mt-1.5 leading-relaxed">
                    This key rule protects debtors. Any bank or company that pays money to the certificate holder is completely freed from all future legal liability.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#C65378] font-mono">
                      Section 383 &amp; 384
                    </span>
                    <span>Revocation and Appeals</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#55636D] mt-1.5 leading-relaxed">
                    A judge can cancel a certificate obtained by fraud or false statements. Any appeal against the District Judge decision goes directly to the High Court.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/services/succession-certificate"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C65378] hover:underline"
                >
                  <span>Need an advocate to file your succession petition? View WillDrafting.in service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* SECTION 5: LEGAL HEIR CERTIFICATE AT TEHSILDAR */}
            <section id="legal-heir-procedure" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4 text-[#C65378]" />
                <span>Administrative Revenue Hierarchy</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                5. Legal Heir Certificate: Tehsildar &amp; SDM Procedure
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Getting a Legal Heir Certificate is an administrative process. Family members apply online through the state revenue portal or visit the local Tehsil office.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Next, the file goes to the local Patwari or Village Administrative Officer. The officer visits your neighborhood to verify surviving family members against death and birth records.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                After the field officer submits their report, the Tehsildar or SDM approves the certificate. The entire procedure usually takes between 15 and 30 business days.
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                <h3 className="text-sm font-bold text-[#172228] mb-2">
                  Recognized Class I Legal Heirs Under Hindu Succession Act:
                </h3>
                <div className="flex flex-wrap gap-2 text-xs text-[#55636D]">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Surviving Spouse (Widow/Widower)</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Sons</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Daughters</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Mother</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Children of Predeceased Son/Daughter</span>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span>Statutory Blueprint</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                6. Visual Blueprint: Decision Flowchart &amp; Framework
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The visual comparison below illustrates the core distinction between a Legal Heir Certificate and a Succession Certificate. Notice how property mutation and family kinship follow the revenue track, while bank accounts, shares, and court decrees follow the judicial track.
              </p>

              <div className="rounded-2xl border border-[#172228]/10 bg-white p-4 sm:p-6 shadow-xs overflow-hidden">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#172228]/10 bg-[#FAF7F0] shadow-inner">
                  <Image
                    src="/images/legal-heir-certificate-vs-succession-certificate-comparison.jpg"
                    alt="Legal Heir Certificate vs Succession Certificate Split Comparison Guide"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-contain"
                    priority
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#55636D]">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#C65378]" />
                    <span>Visual comparison: Legal Heir Certificate (Revenue Tehsildar) vs Succession Certificate (Civil Court)</span>
                  </div>
                  <a
                    href="/images/legal-heir-certificate-vs-succession-certificate-comparison.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline"
                  >
                    <span>View High-Resolution Image</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: DOCUMENTS REQUIRED CHECKLIST */}
            <section id="documents-required" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>Documentation SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                7. Documents Required: Comprehensive Preparation SOP
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Missing paperwork causes delay in both revenue offices and courts. Select a tab below to check the exact document list for each procedure.
              </p>

              {/* Document Tabs */}
              <div className="flex gap-2 border-b border-[#172228]/10 pb-2">
                <button
                  onClick={() => setActiveTab("legal-heir")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "legal-heir"
                      ? "bg-[#172228] text-white shadow-xs"
                      : "bg-white text-[#55636D] hover:bg-slate-100"
                  }`}
                >
                  Legal Heir Certificate (Tehsildar Pack)
                </button>
                <button
                  onClick={() => setActiveTab("succession")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "succession"
                      ? "bg-[#172228] text-white shadow-xs"
                      : "bg-white text-[#55636D] hover:bg-slate-100"
                  }`}
                >
                  Succession Certificate (Court Pack)
                </button>
              </div>

              {activeTab === "legal-heir" ? (
                <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 space-y-3 shadow-xs">
                  <h3 className="text-base font-bold text-[#172228]">
                    Required Paperwork for Revenue Tehsildar Application:
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#55636D]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Original Death Certificate:</strong> Issued by the Municipal Corporation or Registrar of Births &amp; Deaths.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Identity &amp; Address Proofs:</strong> Aadhaar Cards, PAN cards, or Passports of all surviving legal heirs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Family Tree Affidavit:</strong> Notarized self-declaration on ₹10 or ₹100 stamp paper naming all legitimate heirs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Deceased Residence Proof:</strong> Electricity bill, voter ID, or registered sale deed confirming permanent address.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>NOC from Co-Heirs:</strong> Signed declarations from surviving siblings or co-heirs if one member applies on behalf of all.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Service / Pension Book:</strong> Official service letter if applying for government employee dues or compassionate appointment.</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#172228]/10 p-5 space-y-3 shadow-xs">
                  <h3 className="text-base font-bold text-[#172228]">
                    Required Paperwork for Section 372 Civil Court Petition:
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#55636D]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Verified Court Petition:</strong> Drafted by an advocate specifying date of death, ordinary residence, and legal grounds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Certified Schedule of Debts &amp; Securities:</strong> Bank passbooks, FD receipts, demat client master list (CML), share certificates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Original Death Certificate:</strong> Municipal death certificate of the deceased.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>List of Surviving Class I / Class II Relatives:</strong> Full names, ages, occupations, and residential addresses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Ad Valorem Court Fee Stamp:</strong> State-specific court fee receipt calculated on total asset valuation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                      <span><strong>Indemnity Bond &amp; Surety Undertakings:</strong> Signed surety bonds with local property owners or solvency guarantees as directed by the judge.</span>
                    </li>
                  </ul>
                </div>
              )}
            </section>

            {/* SECTION 8: STATE PORTAL DIRECTORY */}
            <section id="state-portals" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span>Pan-India E-Governance</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                8. State Portal Directory: Where to Apply Across India
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Most states offer online applications for Legal Heir certificates. The directory below lists the designated portals, fees, and processing times for major states:
              </p>

              <div className="rounded-2xl border border-[#172228]/10 overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-3.5 font-bold">State / UT</th>
                        <th className="py-3 px-3.5 font-bold">Designated Portal</th>
                        <th className="py-3 px-3.5 font-bold">Certificate Name</th>
                        <th className="py-3 px-3.5 font-bold">Issuing Authority</th>
                        <th className="py-3 px-3.5 font-bold">Fee &amp; SLA</th>
                        <th className="py-3 px-3.5 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#172228]/10">
                      {STATE_PORTAL_DATA.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]/50"}>
                          <td className="py-2.5 px-3.5 font-bold text-[#172228]">{row.state}</td>
                          <td className="py-2.5 px-3.5 font-medium text-[#C65378]">{row.portal}</td>
                          <td className="py-2.5 px-3.5 text-[#55636D]">{row.certificateName}</td>
                          <td className="py-2.5 px-3.5 text-[#55636D]">{row.authority}</td>
                          <td className="py-2.5 px-3.5 text-[#55636D] text-[11px]">
                            {row.fee} &bull; {row.timeline}
                          </td>
                          <td className="py-2.5 px-3.5 whitespace-nowrap">
                            <a
                              href={row.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#172228] hover:text-[#C65378]"
                            >
                              <span>Apply Portal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEPS AFTER GETTING CERTIFICATE */}
            <section id="post-issuance-steps" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span>Post-Issuance Roadmap</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                9. Next Steps: Claiming Assets After Certificate Issuance
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                Getting the certificate is only the first step. To transfer title or access funds, heirs submit certified copies to each asset institution:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#172228]">
                      1. Immovable Property Mutation
                    </h3>
                    <p className="text-xs text-[#55636D] mt-1 leading-relaxed">
                      Submit your Legal Heir Certificate and a registered{" "}
                      <Link href="/templates/release-deed-format" className="text-[#C65378] underline font-medium">
                        relinquishment deed
                      </Link>{" "}
                      to the local municipality. This updates property tax records. Read our guide on{" "}
                      <Link href="/blogs/property-transfer-after-death-without-will-india" className="text-[#C65378] underline font-medium">
                        property transfer after death without a Will
                      </Link>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <Landmark className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#172228]">
                      2. Bank Accounts &amp; Fixed Deposits
                    </h3>
                    <p className="text-xs text-[#55636D] mt-1 leading-relaxed">
                      Present certified copies of your certificate and indemnity bond to the bank branch. For dormant accounts, check our guide on{" "}
                      <Link href="/blogs/claim-unclaimed-deposits-deceased-udgam" className="text-[#C65378] underline font-medium">
                        claiming unclaimed bank deposits on UDGAM
                      </Link>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-3">
                  <Award className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#172228]">
                      3. Demat Shares &amp; Mutual Funds
                    </h3>
                    <p className="text-xs text-[#55636D] mt-1 leading-relaxed">
                      Submit Form ISR-5 and certified court certificates to depository participants. Read our complete guide on{" "}
                      <Link href="/blogs/demat-shares-transmission-after-death-sebi" className="text-[#C65378] underline font-medium">
                        SEBI demat transmission rules after death
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COST & TIMELINE COMPARISON */}
            <section id="cost-and-timeline" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Financial &amp; Time Investment</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                10. Cost &amp; Timeline Comparison: Court Fees vs SRO Delays
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                A Succession Certificate costs more because of ad valorem court fees. Instead of a flat charge, state laws calculate fees as a percentage of total assets:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-center">
                  <span className="text-xs font-bold text-[#55636D] uppercase">Maharashtra</span>
                  <div className="text-lg font-extrabold text-[#172228] mt-1">2% to 7.5%</div>
                  <span className="text-[11px] text-[#55636D] block mt-1">Max Cap ₹75,000 under Court Fees Act</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-center">
                  <span className="text-xs font-bold text-[#55636D] uppercase">Delhi NCT</span>
                  <div className="text-lg font-extrabold text-[#172228] mt-1">Approx 2.5% to 4%</div>
                  <span className="text-[11px] text-[#55636D] block mt-1">Ad valorem on total security portfolio</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs text-center">
                  <span className="text-xs font-bold text-[#55636D] uppercase">Karnataka &amp; WB</span>
                  <div className="text-lg font-extrabold text-[#172228] mt-1">3% to 6%</div>
                  <span className="text-[11px] text-[#55636D] block mt-1">Graduated slabs with state-specific ceilings</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                <span>Want to calculate your exact state court fee for movable assets?</span>
                <Link
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="px-4 py-2 rounded-full bg-[#172228] text-white font-bold hover:bg-black transition-all whitespace-nowrap"
                >
                  Use Free Court Fee Calculator
                </Link>
              </div>
            </section>

            {/* SECTION 11: HOW A WILL AVOIDS BOTH (CONVERSION BRIDGE) */}
            <section id="avoid-with-a-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Strategic Estate Planning</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                11. How a Valid Will Avoids Both Certificates Entirely
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                The struggle of visiting revenue offices, newspaper notices, and court hearings happens only when someone dies without a Will.
              </p>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                When you make a valid Last Will and Testament, your wishes govern your estate. Here is how a Will protects your family:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-700">
                    <AlertCircle className="w-4 h-4" />
                    <span>Without a Will (Intestate)</span>
                  </div>
                  <h3 className="text-base font-bold text-[#172228]">Months of Bureaucracy</h3>
                  <ul className="space-y-1.5 text-xs text-[#55636D]">
                    <li>&bull; Heirs must apply to Tehsildar or file court petitions</li>
                    <li>&bull; Pay 2% to 7.5% in ad valorem court fees</li>
                    <li>&bull; Wait 6 to 12 months for newspaper citation windows</li>
                    <li>&bull; High risk of bitter family disputes over asset shares</li>
                    <li>&bull; Locked bank accounts and demat portfolios during court delay</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>With a Will (Testamentary)</span>
                  </div>
                  <h3 className="text-base font-bold text-[#172228]">Direct, Immediate Vesting</h3>
                  <ul className="space-y-1.5 text-xs text-[#55636D]">
                    <li>&bull; Named executor holds legal authority under Section 211</li>
                    <li>&bull; Zero succession court fees on debts and securities</li>
                    <li>&bull; Immediate transmission to designated beneficiaries</li>
                    <li>&bull; Clear distribution eliminates sibling and family friction</li>
                    <li>&bull; Print-ready, advocate-verified Will in 15 minutes</li>
                  </ul>
                </div>
              </div>

              {/* Conversion Callout Banner */}
              <div className="rounded-2xl bg-[#172228] text-white p-6 sm:p-8 text-center space-y-4 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Protect Your Family from Court Battles and Heavy Fees
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Draft an advocate-verified, legally binding Will customized for Indian law. Free from stamp duty, completely private, and valid across all Indian states.
                </p>
                <div className="pt-2">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                  >
                    <span>Start Your Will Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 12: PROFESSIONAL LEGAL SERVICES */}
            <section id="legal-services" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>WillDrafting.in</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                12. Professional Succession Legal Services by AMA
              </h3>
              <p className="text-sm md:text-base text-[#55636D] leading-relaxed">
                If your family is handling an intestate demise, dealing with revenue departments and civil courts can be hard. WillDrafting.in offers full legal support:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs space-y-2">
                  <Gavel className="w-5 h-5 text-[#C65378]" />
                  <h3 className="text-sm font-bold text-[#172228]">Succession Petition</h3>
                  <p className="text-xs text-[#55636D]">
                    Drafting, filing, newspaper citations, and court appearances before the District Judge.
                  </p>
                  <Link href="/services/succession-certificate" className="text-xs font-bold text-[#C65378] inline-flex items-center gap-1">
                    <span>Learn More</span> &rarr;
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs space-y-2">
                  <Scale className="w-5 h-5 text-[#5F7E75]" />
                  <h3 className="text-sm font-bold text-[#172228]">Probate of Will</h3>
                  <p className="text-xs text-[#55636D]">
                    Mandatory probate petitions in Mumbai, Chennai, Kolkata, and High Court jurisdictions.
                  </p>
                  <Link href="/services/probate-lawyer" className="text-xs font-bold text-[#C65378] inline-flex items-center gap-1">
                    <span>Learn More</span> &rarr;
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs space-y-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-[#172228]">Succession Calculator</h3>
                  <p className="text-xs text-[#55636D]">
                    Calculate exact legal shares under Hindu, Muslim, and Christian personal laws.
                  </p>
                  <Link href="/tools/succession-calculator" className="text-xs font-bold text-[#C65378] inline-flex items-center gap-1">
                    <span>Use Tool</span> &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>Direct Answers</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                13. Frequently Asked Questions: Succession &amp; Heirship
              </h3>

              <div className="space-y-3 pt-2">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#172228]/10 overflow-hidden shadow-xs transition-colors hover:bg-slate-50/50"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228] cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#55636D] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#55636D] leading-relaxed border-t border-[#172228]/5">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & LINKS */}
            <section id="statutory-citations" className="scroll-target space-y-4 border-t border-[#172228]/10 pt-8">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Authoritative Legal Sources</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight leading-snug">
                14. Statutory Citations &amp; Official Government Portals
              </h3>

              <div className="space-y-2 text-xs text-[#55636D] leading-relaxed">
                <p><strong>Primary Legislation:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Indian Succession Act, 1925 (Act No. 39 of 1925), Part X, Sections 370–390.</li>
                  <li>Court Fees Act, 1870 (Act No. 7 of 1870), Schedule I, Article 12 (Ad Valorem Succession Fees).</li>
                  <li>Hindu Succession Act, 1956 (Act No. 30 of 1956), Sections 8, 9, 10, &amp; Schedule of Class I Heirs.</li>
                  <li>Insurance Act, 1938, Section 39 (Beneficial Nominee Provisions).</li>
                  <li>State Land Revenue Acts (e.g. Maharashtra Land Revenue Code 1966, UP Revenue Code 2006).</li>
                </ul>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#172228] block mb-2">Verified Government Portals:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>India Code (ISA 1925)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://services.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>eCourts Services India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://udgam.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100"
                  >
                    <span>RBI UDGAM Portal</span>
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
                    Succession Certificate Lawyer Service
                  </Link>
                  <Link
                    href="/tools/succession-certificate-court-fee-calculator"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Court Fee Calculator India
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200"
                  >
                    Succession Share Calculator
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
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-bold flex items-center justify-center text-sm shrink-0">
                  AAM
                </div>
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
                Advocate Anuj Anand Malik has over 15 years of experience in testamentary law, civil court succession petitions, and high-value estate planning at WillDrafting.in.
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
                Facing Frozen Bank Accounts or Shares?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our estate lawyers draft and file Section 372 succession petitions across all major Indian District Courts. Fast turnaround, transparent fees.
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
                  <span><strong>Zero Court Fees:</strong> Saves up to 7.5% ad valorem court fees on movable assets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No 12-Month Delay:</strong> Direct estate vesting under Section 211 of ISA 1925.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Advocate Verified:</strong> Every draft reviewed by senior succession counsel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Section 63 Compliant:</strong> Two-witness execution blocks ready for printing.</span>
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
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-[#172228]/5 hover:border-[#C65378]/30 transition-all hover:bg-slate-50"
                >
                  <div className="font-bold text-xs text-[#172228]">Intestate Succession Calculator</div>
                  <div className="text-[10px] text-[#C65378] font-semibold mt-0.5 flex items-center gap-1">
                    <span>Calculate Legal Heir Shares</span> &rarr;
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
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Relinquishment Deed Format
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Property Transfer After Death
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
