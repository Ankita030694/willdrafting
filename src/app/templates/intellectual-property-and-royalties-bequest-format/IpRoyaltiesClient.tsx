"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Scale,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Calculator,
  Copy,
  FileText,
  AlertCircle,
  Clock,
  Building2,
  CheckSquare,
  Award,
  Layers,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Intellectual Property Succession in India: Legal Scope" },
  { id: "ip-royalty-diagnostic-tool", label: "2. Free IP & Royalty Succession Diagnostic Tool" },
  { id: "copyright-60-year-rule", label: "3. Copyright Act Section 22: The 60-Year Post-Mortem Rule" },
  { id: "master-ip-clause-format", label: "4. Master IP & Royalties Will Clause Format" },
  { id: "publisher-royalty-direction", label: "5. Publisher & Music Label Royalty Direction Notice Format" },
  { id: "trademark-patent-transmission", label: "6. Trademark & Patent Transmission: Section 45 & Form TM-M" },
  { id: "software-digital-creator-ip", label: "7. Software Code, Digital Content & Creator Royalties" },
  { id: "moral-vs-economic-rights", label: "8. Moral Rights vs Economic Rights Under Section 57" },
  { id: "step-by-step-ip-sop", label: "9. Step-by-Step SOP: Transferring IP Rights After Death" },
  { id: "common-ip-will-mistakes", label: "10. Five Costly Mistakes in IP Estate Planning" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: IP & Royalties Will" },
  { id: "statutory-citations", label: "13. Statutory Authority & Official Government Portals" },
];

const FAQS = [
  {
    q: "What happens to intellectual property and royalties when an author dies in India?",
    a: "Under Section 22 of the Copyright Act, copyright stays valid for 60 years after the author dies. Book royalties and music fees do not stop. They pass to the heirs named in the Will.",
  },
  {
    q: "How can an author ensure book royalties pass only to their spouse?",
    a: "Add a clear clause in your Will that names your spouse as the sole heir for all books and contracts. Also prepare a signed notice to ask your publisher to pay your spouse directly.",
  },
  {
    q: "Can registered trademarks and brand names be bequeathed in an Indian Will?",
    a: "Yes. Under Section 37 and Section 45 of the Trade Marks Act, a brand mark is personal wealth that passes by Will. Your heir must file Form TM-M with the Registrar to update the owner name.",
  },
  {
    q: "How are patent licensing royalties and ownership transferred after death?",
    a: "Under Section 68 and Section 69 of the Patents Act, patent rights and fee streams pass via your Will. Your heir must file Form 16 or Form 20 with the Patent Office to record the new owner.",
  },
  {
    q: "What are moral rights under Section 57 of the Copyright Act?",
    a: "Moral rights protect your name as creator and stop harmful edits to your work. While cash rights pass to anyone you pick, moral rights let your family guard your legacy.",
  },
  {
    q: "Do publishers require probate or a succession certificate to release royalties?",
    a: "Big firms like Penguin, HarperCollins, and Amazon KDP need proof of heirship. A registered Will often works. In metro cities or family fights, they may ask for Probate or a Court Succession Paper.",
  },
  {
    q: "How should software source code, SaaS apps, and creator accounts be willed?",
    a: "List your Git code, app store IDs, cloud servers, and YouTube AdSense in a Digital Schedule. Name a tech-savvy executor so your family does not lose access to payouts.",
  },
  {
    q: "What happens if a Will leaves out an IP bequest clause?",
    a: "If a Will skips IP rights, royalties fall into the general estate or split by intestate rules. Family disputes can cause book firms to freeze all royalty payments for years.",
  },
];

export default function IpRoyaltiesClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-purpose-scope");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedDirection, setCopiedDirection] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE IP & ROYALTY DIAGNOSTIC TOOL
  // ==========================================
  const [ipCategory, setIpCategory] = useState<string>("literary_books");
  const [revenueChannel, setRevenueChannel] = useState<string>("publishing_contracts");
  const [bequestIntent, setBequestIntent] = useState<string>("sole_spouse");
  const [registrationStatus, setRegistrationStatus] = useState<string>("registered");

  // Dynamic Rule Computation
  let statutoryPeriod = "Life of Author + 60 Years";
  let governingLaw = "Copyright Act, 1957 Section 22";
  let requiredForm = "Notice to Publisher + Registered Will & Executor Letter";
  let recommendedStrategy = "Name one sole heir for all book contracts and royalty bank streams.";

  if (ipCategory === "literary_books") {
    statutoryPeriod = "60 years after the year the author dies.";
    governingLaw = "Copyright Act, 1957 Section 22 and Section 30.";
    requiredForm = "Publisher Payout Notice + Registered Will and Executor Assent.";
    recommendedStrategy = "Use a clear clause giving print, ebook, and audio rights to your spouse or child.";
  } else if (ipCategory === "music_streaming") {
    statutoryPeriod = "60 years post-mortem for songs and 60 years for audio tracks.";
    governingLaw = "Copyright Act, 1957 Sections 22, 26, and 27.";
    requiredForm = "IPRS or PPL Transfer Form + Copy of Will and Death Paper.";
    recommendedStrategy = "List both label deals and music society royalties in your Will.";
  } else if (ipCategory === "trademark_brand") {
    statutoryPeriod = "10 years per term, renewable forever.";
    governingLaw = "Trade Marks Act, 1999 Sections 37 and 45.";
    requiredForm = "File Form TM-M with the Registrar of Trade Marks.";
    recommendedStrategy = "Pass the brand mark together with business goodwill so it stays valid.";
  } else if (ipCategory === "patent_technology") {
    statutoryPeriod = "20 years from patent filing date under Section 53.";
    governingLaw = "Patents Act, 1970 Sections 53, 68, and 69.";
    requiredForm = "File Form 16 or Form 20 with the Patent Office to update the roll.";
    recommendedStrategy = "Assign active tech licenses and fee rights directly to your chosen heir.";
  } else {
    // software_saas
    statutoryPeriod = "60 years post-mortem as literary code under Section 2(o).";
    governingLaw = "Copyright Act, 1957 Section 2(o) and IT Act, 2000.";
    requiredForm = "Digital Asset Schedule + App Store Account Handover Notice.";
    recommendedStrategy = "Name a digital executor to handle Git repos, API keys, and cloud billing.";
  }

  const copyClauseToClipboard = () => {
    const text = `BEQUEST OF INTELLECTUAL PROPERTY, COPYRIGHTS, AND FUTURE ROYALTIES

1. IDENTIFICATION OF INTELLECTUAL PROPERTY ASSETS:
I declare that I am the sole author, originator, and legal owner of the following intellectual property assets, including but not limited to:
(a) All copyrights, title, and ownership rights in my published and unpublished literary works, manuscripts, books, articles, screenplay drafts, and translations, including [Title of Book 1, ISBN: _____] and [Title of Book 2, ISBN: _____];
(b) All registered trademarks, brand names, and logos registered in my name under the Trade Marks Act, 1999, specifically Trademark No. [_______] in Class [___];
(c) All granted patents, patent applications, and proprietary technologies filed with the Indian Patent Office, specifically Patent No. [_______];
(d) All proprietary software codebases, SaaS applications, digital media libraries, and developer accounts;
(e) All publishing contracts, licensing agreements, movie adaptation option deals, translation rights, and digital distribution agreements executed by me during my lifetime.

2. SPECIFIC BEQUEST OF INTELLECTUAL PROPERTY & ROYALTIES:
I hereby specifically give, devise, and bequeath all my right, title, interest, and ownership in the aforesaid intellectual property assets, together with:
(a) All past accrued, current, and future royalty payments, advances, public lending rights, licensing fees, syndication revenues, and streaming payouts arising therefrom; and
(b) All right to grant future licenses, negotiate republications, authorize translations, or assign commercial rights under Section 18 and Section 30 of the Copyright Act, 1957;
ABSOLUTELY AND FOREVER unto my [Spouse / Son / Daughter / Named Beneficiary], [Full Legal Name of Beneficiary], son/daughter/spouse of [Name], residing at [Complete Residential Address], for their sole and exclusive use and benefit.

3. DIRECTIONS TO EXECUTOR AND PUBLISHERS:
I hereby direct my Executor named herein:
(a) To immediately notify all publishing houses, literary agencies, digital distributors, and collection societies (including IPRS, PPL, and IRRO) of my demise and this testamentary bequest;
(b) To execute all necessary forms, transmission applications (including Form TM-M under the Trade Marks Act, 1999, and transmission forms under the Patents Act, 1970), and formal deeds of assent to effectuate the complete transfer of my intellectual property and royalty streams to [Full Legal Name of Beneficiary];
(c) To instruct all publishers and distributors to remit all future royalty payouts directly to the dedicated bank account of [Full Legal Name of Beneficiary].

4. MORAL RIGHTS & INTEGRITY OF WORK:
Pursuant to Section 57 of the Copyright Act, 1957, I authorize my said beneficiary and my Executor to assert and defend my moral rights as author, including my right of paternity and integrity, and to restrain any distortion, mutilation, or derogatory alteration of my published works.`;
    navigator.clipboard.writeText(text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyDirectionToClipboard = () => {
    const text = `FORMAL NOTICE OF DIRECTION FOR TRANSMISSION OF PUBLISHING ROYALTIES

TO:
The Royalties & Contracts Department,
[Name of Publishing House / Music Label / Digital Distributor],
[Address of Publisher / Distributor],
Email: [contracts@publisher.com]

DATE: [Day, Month, Year]

SUBJECT: Notice of Testamentary Bequest and Direction for Transmission of Royalties in respect of Author Late [Full Name of Author]

RE: Publishing Agreement(s) Dated: [Agreement Date]
Work(s) Covered: [Title of Book / Album / Software], ISBN / Catalog No: [_______]

Dear Sir / Madam,

1. We write to formally inform you of the sad demise of the distinguished author, Late [Full Name of Author], who departed this life on [Date of Death]. A certified copy of the Death Certificate is enclosed herewith for your records.

2. During their lifetime, Late [Full Name of Author] executed their Last Will and Testament dated [Date of Will]. Under Clause [___] of the said Will, the deceased specifically bequeathed all copyrights, publishing agreements, and all accrued and future royalty payments arising from the aforementioned work(s) absolutely unto:
   Beneficiary Name: [Full Name of Beneficiary]
   Relationship to Deceased: [Spouse / Son / Daughter]
   Residential Address: [Complete Address of Beneficiary]
   PAN: [Permanent Account Number]
   Bank Account Details: [Bank Name, Account No, IFSC Code]

3. Pursuant to Section 22 and Section 30 of the Copyright Act, 1957, copyright ownership subsists for 60 years post-mortem. You are hereby formally called upon and directed to:
   (a) Update your contract records and author ledger to record the transmission of rights in favor of [Full Name of Beneficiary];
   (b) Remit all future royalty statements, tax deduction certificates (Form 16A), and royalty payments directly to the aforesaid bank account;
   (c) Cease remitting any funds to the deceased's prior bank account.

4. Enclosed herewith please find:
   (i) Certified Copy of Death Certificate;
   (ii) Notarized Copy of the Last Will and Testament;
   (iii) Executor's Letter of Assent / Succession Certificate;
   (iv) PAN Card and Address Proof of the Beneficiary;
   (v) Cancelled Cheque for bank transfer verification.

Yours faithfully,

___________________________                       ___________________________
[Signature of Executor]                            [Signature of Beneficiary]
[Name of Executor]                                 [Name of Beneficiary]
Executor to the Estate of Late [Author Name]       Legatee & Legal Successor`;
    navigator.clipboard.writeText(text);
    setCopiedDirection(true);
    setTimeout(() => setCopiedDirection(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `IP & ROYALTY SUCCESSION FILING CHECKLIST (INDIA):
1. Certified Copy of the Deceased Author's / Creator's Death Certificate
2. Original or Notarized Copy of the Registered Will containing IP Bequest Clause
3. List of Published Works, ISBNs, Trademark Reg. Nos., and Patent Grant Nos.
4. Copy of existing Publishing Contracts, Royalty Agreements, and Licensing Deeds
5. Form TM-M (for trademark transmission to Registrar of Trade Marks under Section 45)
6. Form 16 / Form 20 (for patent transmission to Controller of Patents under Section 69)
7. Formal Direction Notice to Publishing Houses and Collection Societies (IPRS, PPL, IRRO)
8. Executor's Written Letter of Assent under Section 332 of the Indian Succession Act
9. Beneficiary KYC: PAN Card, Aadhaar Card, and Bank Account Verification Details
10. Grant of Probate / Succession Certificate (where required by publishers or disputed)`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

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
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#FAF7F0]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65378]/20 border border-[#C65378]/40 text-rose-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>COPYRIGHT ACT 1957 • TRADE MARKS ACT 1999 • PATENTS ACT 1970</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Intellectual Property &amp; Royalties Will Clause Format
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Protect your book royalties, copyrights, brand marks, and patents. Copy our verified Indian Will clause
            format. Keep your spouse and kids safe with clear payout rules under Indian law.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#master-ip-clause-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get IP Will Clause Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">60 Years</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                POST-MORTEM COPYRIGHT ROYALTIES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form TM-M</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TRADEMARK SUCCESSION FILING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 68</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PATENT LICENSING ASSIGNMENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Freeze</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DIRECT PUBLISHER TRANSMISSION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
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
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Review Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                This draft follows Indian Copyright, Brand, and Patent laws. It stops book firms from holding back funds
                when a creator dies.
              </p>
            </div>

            {/* Quick Limitation Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>The 60-Year Clock</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Copyright does not end when you die. It earns money for 60 full years after death. A clear Will stops
                family fights over those funds.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: IP &amp; ROYALTY SUCCESSION IN INDIA</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>60-Year Payouts:</strong> Under Section 22 of the Copyright Act, book and music royalties stay
                    active for 60 years after death.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Account Freeze:</strong> Top book firms like Penguin, HarperCollins, and Amazon KDP pause
                    payouts unless a clear Will names your heir.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Brands &amp; Patents:</strong> Brand marks need Form TM-M under Section 45. Patent deals follow
                    Section 68 of the Patents Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Moral Rights Kept:</strong> Section 57 lets your heirs protect your name and stop bad edits to
                    your work.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/intellectual-property-and-royalties-bequest-format-og.jpg"
                  alt="Intellectual Property and Royalties Will Clause Format India under Copyright Act"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  IP Will Series: Format for Indian Authors, Creators &amp; Patent Owners
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  VERIFIED UNDER COPYRIGHT ACT 1957
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              {/* STRICT SINGLE H2 TAG FOR ENTIRE PAGE (<= 70 characters, 0 em-dashes) */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Intellectual Property Succession in India: Legal Scope
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Most standard Indian Will drafts list only flats, plots, and bank cash. They leave out creative rights.
                  This gap hurts writers, songwriters, coders, and patent owners.
                </p>
                <p>
                  In India, creative work is legal wealth. It pays steady cash long after the creator dies. If you write
                  books, hold a patent, or own a brand mark, you must add a clear clause in your Will.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Law Rule: Section 22 of the Copyright Act, 1957
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    Copyright lasts for 60 years in any book, play, song, or art work. The 60 years start from the first day
                    of the new year after the author dies.
                  </p>
                </div>
                <p>
                  Without a clear clause, your royalties fall into the rest of the estate. If kin fight in court, book
                  firms stop sending cheques. The cash stays locked until a judge passes an order.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DIAGNOSTIC TOOL */}
            <section id="ip-royalty-diagnostic-tool" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC &amp; VALUATION TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free IP &amp; Royalty Succession Diagnostic Tool
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Pick your asset type and payout source below. See how long the right lasts and what forms your family needs.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: IP Asset Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Type of Creative Work:
                    </label>
                    <select
                      value={ipCategory}
                      onChange={(e) => setIpCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="literary_books">Books, Novels &amp; Guides (Literary Works)</option>
                      <option value="music_streaming">Songs, Audio Tracks &amp; Film Rights (IPRS / OTT)</option>
                      <option value="trademark_brand">Registered Brand Names &amp; Logos (Trademarks)</option>
                      <option value="patent_technology">Patents &amp; Tech Designs (Licensing Fees)</option>
                      <option value="software_saas">Software Code &amp; Mobile Apps (SaaS / Play Store)</option>
                    </select>
                  </div>

                  {/* Select 2: Commercial Channel */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Current Payout Source:
                    </label>
                    <select
                      value={revenueChannel}
                      onChange={(e) => setRevenueChannel(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="publishing_contracts">Book Firms (Penguin, HarperCollins, Amazon KDP)</option>
                      <option value="collection_societies">Music Societies (IPRS, PPL India, IRRO)</option>
                      <option value="licensing_agreements">Direct Brand &amp; Tech Deals</option>
                      <option value="app_stores">App Stores (Google Play, Apple Developer)</option>
                    </select>
                  </div>

                  {/* Select 3: Bequest Intention */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Who Gets the Rights:
                    </label>
                    <select
                      value={bequestIntent}
                      onChange={(e) => setBequestIntent(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="sole_spouse">Spouse Only (100% Payouts &amp; Rights)</option>
                      <option value="split_heirs">Split Equal Among Kids &amp; Spouse</option>
                      <option value="private_trust">Family Trust for Minor Kids</option>
                      <option value="co_creator">Co-Author or Business Partner</option>
                    </select>
                  </div>

                  {/* Select 4: Registration Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Official Filing Status:
                    </label>
                    <select
                      value={registrationStatus}
                      onChange={(e) => setRegistrationStatus(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="registered">Filed with Govt Office (Copyright / TM / Patent)</option>
                      <option value="contractual">Signed Contract Only (No Govt Filing)</option>
                    </select>
                  </div>
                </div>

                {/* Diagnostic Result Card */}
                <div className="rounded-2xl bg-gradient-to-br from-rose-50/90 to-amber-50/70 border border-rose-200/80 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Sparkles className="w-4 h-4" />
                    <span>YOUR LEGAL CHECKUP RESULT</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-white/90 rounded-xl border border-rose-100">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                        How Long Rights Last:
                      </span>
                      <span className="text-slate-900 font-extrabold text-sm mt-0.5 block">
                        {statutoryPeriod}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/90 rounded-xl border border-rose-100">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                        Governing Law:
                      </span>
                      <span className="text-slate-900 font-extrabold text-sm mt-0.5 block">
                        {governingLaw}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/90 rounded-xl border border-rose-100 sm:col-span-2">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                        Required Filing Step:
                      </span>
                      <span className="text-slate-700 font-medium text-xs mt-1 block">
                        {requiredForm}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/95 rounded-xl border border-[#C65378]/30 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Best Plan for Your Will:</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {recommendedStrategy}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COPYRIGHT ACT 60-YEAR RULE */}
            <section id="copyright-60-year-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>POST-MORTEM EARNINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Copyright Act Section 22: The 60-Year Post-Mortem Rule
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  How long do book royalties last after death? Section 22 of the Copyright Act, 1957 gives a clear rule.
                  Rights stay active for 60 full years after the year the author dies.
                </p>
                <p>
                  Suppose a writer dies on July 15, 2026. The 60-year clock starts on January 1, 2027. Rights stay safe
                  until December 31, 2086. For six decades, all print fees, foreign rights, and film deals belong to the
                  heir named in the Will.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs">Section 22: Books, Plays, and Art</div>
                    <p className="text-xs text-slate-600">
                      Covers novels, guides, poems, plays, and scripts. Protection lasts for life plus 60 years.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs">Section 26: Music and Films</div>
                    <p className="text-xs text-slate-600">
                      Covers audio tracks and films for 60 years from the year after release.
                    </p>
                  </div>
                </div>
                <p>
                  If an author leaves no Will, rights split equally among Class I heirs. When heirs disagree, firms cannot
                  pick whom to pay. Money sits idle in escrow.
                </p>
              </div>
            </section>

            {/* SECTION 4: MASTER IP BEQUEST CLAUSE FORMAT */}
            <section id="master-ip-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTEABLE WILL CLAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Master IP &amp; Royalties Will Clause Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Copy and paste this full clause into your Indian Will. It covers books, brand marks, patents, and all
                future payouts.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                      TEMPLATE CLAUSE: INTELLECTUAL PROPERTY &amp; ROYALTIES
                    </span>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors"
                  >
                    {copiedClause ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClause ? "Copied to Clipboard!" : "Copy Full Clause"}</span>
                  </button>
                </div>

                <div className="p-6 bg-slate-50 font-mono text-[11px] sm:text-xs text-slate-800 leading-relaxed overflow-x-auto max-h-[500px] border-b border-slate-200">
                  <pre className="whitespace-pre-wrap font-mono">
{`BEQUEST OF INTELLECTUAL PROPERTY, COPYRIGHTS, AND FUTURE ROYALTIES

1. IDENTIFICATION OF INTELLECTUAL PROPERTY ASSETS:
I declare that I am the sole author, originator, and legal owner of the following intellectual property assets:
(a) All copyrights, title, and ownership rights in my published and unpublished literary works, manuscripts, books, articles, screenplay drafts, and translations, including [Title of Book 1, ISBN: _____] and [Title of Book 2, ISBN: _____];
(b) All registered trademarks, brand names, and logos registered in my name under the Trade Marks Act, 1999, specifically Trademark No. [_______] in Class [___];
(c) All granted patents, patent applications, and proprietary technologies filed with the Indian Patent Office, specifically Patent No. [_______];
(d) All proprietary software codebases, SaaS applications, digital media libraries, and developer accounts;
(e) All publishing contracts, licensing agreements, movie adaptation option deals, translation rights, and digital distribution agreements executed by me during my lifetime.

2. SPECIFIC BEQUEST OF INTELLECTUAL PROPERTY & ROYALTIES:
I hereby specifically give, devise, and bequeath all my right, title, interest, and ownership in the aforesaid intellectual property assets, together with:
(a) All past accrued, current, and future royalty payments, advances, public lending rights, licensing fees, syndication revenues, and streaming payouts arising therefrom; and
(b) All right to grant future licenses, negotiate republications, authorize translations, or assign commercial rights under Section 18 and Section 30 of the Copyright Act, 1957;
ABSOLUTELY AND FOREVER unto my [Spouse / Son / Daughter / Named Beneficiary], [Full Legal Name of Beneficiary], son/daughter/spouse of [Name], residing at [Complete Residential Address], for their sole and exclusive use and benefit.

3. DIRECTIONS TO EXECUTOR AND PUBLISHERS:
I hereby direct my Executor named herein:
(a) To immediately notify all publishing houses, literary agencies, digital distributors, and collection societies (including IPRS, PPL, and IRRO) of my demise and this testamentary bequest;
(b) To execute all necessary forms, transmission applications (including Form TM-M under the Trade Marks Act, 1999, and transmission forms under the Patents Act, 1970), and formal deeds of assent to effectuate the complete transfer of my intellectual property and royalty streams to [Full Legal Name of Beneficiary];
(c) To instruct all publishers and distributors to remit all future royalty payouts directly to the dedicated bank account of [Full Legal Name of Beneficiary].

4. MORAL RIGHTS & INTEGRITY OF WORK:
Pursuant to Section 57 of the Copyright Act, 1957, I authorize my said beneficiary and my Executor to assert and defend my moral rights as author, including my right of paternity and integrity, and to restrain any distortion, mutilation, or derogatory alteration of my published works.`}
                  </pre>
                </div>

                <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ready for use in plain-paper or registered Indian Wills.</span>
                  </span>
                  <button
                    onClick={copyClauseToClipboard}
                    className="font-bold text-[#C65378] hover:underline"
                  >
                    Click to Copy Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 5: PUBLISHER ROYALTY DIRECTION NOTICE */}
            <section id="publisher-royalty-direction" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>OFFICIAL NOTICE TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Publisher &amp; Music Label Royalty Direction Notice Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Send this notice to book firms, music labels, or Amazon KDP after the author dies. It tells them to send
                all payouts straight to the heir's bank account.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-[#172228] text-white p-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                      FORMAL PUBLISHER ROYALTY TRANSMISSION NOTICE
                    </span>
                  </div>
                  <button
                    onClick={copyDirectionToClipboard}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors"
                  >
                    {copiedDirection ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDirection ? "Copied!" : "Copy Notice Draft"}</span>
                  </button>
                </div>

                <div className="p-6 bg-slate-50 font-mono text-[11px] sm:text-xs text-slate-800 leading-relaxed overflow-x-auto max-h-[440px] border-b border-slate-200">
                  <pre className="whitespace-pre-wrap font-mono">
{`FORMAL NOTICE OF DIRECTION FOR TRANSMISSION OF PUBLISHING ROYALTIES

TO:
The Royalties & Contracts Department,
[Name of Publishing House / Music Label / Digital Distributor],
[Address of Publisher / Distributor],
Email: [contracts@publisher.com]

DATE: [Day, Month, Year]

SUBJECT: Notice of Testamentary Bequest and Direction for Transmission of Royalties in respect of Author Late [Full Name of Author]

RE: Publishing Agreement(s) Dated: [Agreement Date]
Work(s) Covered: [Title of Book / Album / Software], ISBN / Catalog No: [_______]

Dear Sir / Madam,

1. We write to formally inform you of the sad demise of the distinguished author, Late [Full Name of Author], who departed this life on [Date of Death]. A certified copy of the Death Certificate is enclosed herewith for your records.

2. During their lifetime, Late [Full Name of Author] executed their Last Will and Testament dated [Date of Will]. Under Clause [___] of the said Will, the deceased specifically bequeathed all copyrights, publishing agreements, and all accrued and future royalty payments arising from the aforementioned work(s) absolutely unto:
   Beneficiary Name: [Full Name of Beneficiary]
   Relationship to Deceased: [Spouse / Son / Daughter]
   Residential Address: [Complete Address of Beneficiary]
   PAN: [Permanent Account Number]
   Bank Account Details: [Bank Name, Account No, IFSC Code]

3. Pursuant to Section 22 and Section 30 of the Copyright Act, 1957, copyright ownership subsists for 60 years post-mortem. You are hereby formally called upon and directed to:
   (a) Update your contract records and author ledger to record the transmission of rights in favor of [Full Name of Beneficiary];
   (b) Remit all future royalty statements, tax deduction certificates (Form 16A), and royalty payments directly to the aforesaid bank account;
   (c) Cease remitting any funds to the deceased's prior bank account.

4. Enclosed herewith please find:
   (i) Certified Copy of Death Certificate;
   (ii) Notarized Copy of the Last Will and Testament;
   (iii) Executor's Letter of Assent / Succession Certificate;
   (iv) PAN Card and Address Proof of the Beneficiary;
   (v) Cancelled Cheque for bank transfer verification.

Yours faithfully,

___________________________                       ___________________________
[Signature of Executor]                            [Signature of Beneficiary]
[Name of Executor]                                 [Name of Beneficiary]
Executor to the Estate of Late [Author Name]       Legatee & Legal Successor`}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 6: TRADEMARK & PATENT TRANSMISSION */}
            <section id="trademark-patent-transmission" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>GOVERNMENT REGISTRY FILINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Trademark &amp; Patent Transmission: Section 45 &amp; Form TM-M
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Passing a copyright does not shift brand marks or patents. You must update records at the Indian IP
                  Office.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                      Trademark Transfer: Section 45
                    </div>
                    <p className="text-xs text-slate-600">
                      When a brand owner dies, the heir must write to the Registrar under Section 45. File Form TM-M with
                      the Will, Death Paper, and proof of claim.
                    </p>
                    <div className="text-[11px] font-bold text-[#C65378]">
                      Tip: Pass the brand mark with business goodwill.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                      Patent Transfer: Section 68 &amp; 69
                    </div>
                    <p className="text-xs text-slate-600">
                      Under Section 68 of the Patents Act, a transfer must be in writing and filed. The heir files Form 16 or
                      Form 20 with the Patent Office to update the record.
                    </p>
                    <div className="text-[11px] font-bold text-[#C65378]">
                      Tip: Pay yearly patent fees on time.
                    </div>
                  </div>
                </div>
                <p>
                  If you skip the registry step, you cannot sue copycats. A judge will not hear a case from an unlisted
                  owner.
                </p>
              </div>
            </section>

            {/* SECTION 7: SOFTWARE CODE & DIGITAL CREATORS */}
            <section id="software-digital-creator-ip" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DIGITAL ASSETS &amp; SOFTWARE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Software Code, Digital Content &amp; Creator Royalties
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Today, creators earn via YouTube, apps, SaaS tools, and online courses. Under Section 2(o) of the
                  Copyright Act, computer code counts as a literary work.
                </p>
                <p>If you build apps or make videos, list these items in your Will:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs">
                  <li>
                    <strong>Code Repos:</strong> GitHub and GitLab accounts, private code, and tech docs.
                  </li>
                  <li>
                    <strong>App Accounts:</strong> Google Play Console, Apple Developer IDs, and payout links.
                  </li>
                  <li>
                    <strong>Media Income:</strong> YouTube AdSense, Spotify for Artists, and fan pages.
                  </li>
                  <li>
                    <strong>Cloud Servers:</strong> AWS, Azure, and cloud hosts that run your apps.
                  </li>
                </ul>
                <p>
                  Pick a tech-savvy executor in your Will. Give them clear power under the IT Act to manage logins and pass
                  income to your family.
                </p>
              </div>
            </section>

            {/* SECTION 8: MORAL RIGHTS VS ECONOMIC RIGHTS */}
            <section id="moral-vs-economic-rights" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>SECTION 57 PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Moral Rights vs Economic Rights Under Section 57
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Indian law splits rights into two parts: money rights and moral rights. Know both before you draft your
                  Will.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <span className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider">
                      Money Rights (Section 14)
                    </span>
                    <p className="text-xs text-slate-700">
                      The right to print, sell, license, and collect fees. You can gift or will these rights to anyone.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <span className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
                      Moral Rights (Section 57)
                    </span>
                    <p className="text-xs text-slate-700">
                      The right to claim credit as author and stop bad edits. You cannot sell these rights. Your heirs hold
                      them to guard your name.
                    </p>
                  </div>
                </div>
                <p>
                  Even if a trust collects the cash, your heirs can sue under Section 57(2) if someone alters your work in a
                  harmful way.
                </p>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-ip-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>PRACTICAL PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Transferring IP Rights After Death
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <ol className="space-y-3.5 list-decimal pl-5">
                  <li>
                    <strong>Find the Will and Contracts:</strong> Get the signed Will, book deals, brand files, and patent
                    papers.
                  </li>
                  <li>
                    <strong>Get Death Papers:</strong> Obtain five to ten certified copies of the Death Certificate.
                  </li>
                  <li>
                    <strong>Send the Payout Notice:</strong> Your executor signs the notice and adds the Will, KYC, and
                    bank cheque.
                  </li>
                  <li>
                    <strong>File Form TM-M for Brands:</strong> For registered brand marks, file Form TM-M at the Trademark
                    Office.
                  </li>
                  <li>
                    <strong>File Form 16 or 20 for Patents:</strong> Send the patent transfer form to update the Patent
                    Register.
                  </li>
                  <li>
                    <strong>Update Music Bodies (IPRS / PPL):</strong> Send member transfer forms to shift monthly music
                    payout streams.
                  </li>
                  <li>
                    <strong>Get Court Probate if Asked:</strong> If a firm doubts the Will, apply for probate or a Succession
                    Paper in court.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 10: COMMON MISTAKES */}
            <section id="common-ip-will-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>AVOID EXPENSIVE ERRORS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Five Costly Mistakes in IP Estate Planning
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-800 shrink-0">1.</span>
                    <span className="text-slate-700">
                      <strong>Leaving Out Future Work:</strong> Forgetting unwritten books, audio rights, or future film
                      deals in the Will.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-800 shrink-0">2.</span>
                    <span className="text-slate-700">
                      <strong>Splitting Brand and Business:</strong> Giving a brand mark to a child without the linked
                      business voids the mark.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-800 shrink-0">3.</span>
                    <span className="text-slate-700">
                      <strong>Hiding Digital Logins:</strong> Leaving no account list for Amazon KDP, YouTube, or app
                      stores.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-800 shrink-0">4.</span>
                    <span className="text-slate-700">
                      <strong>Wrong Executor Pick:</strong> Choosing an executor who does not grasp contracts or patent due
                      dates.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <span className="font-bold text-rose-800 shrink-0">5.</span>
                    <span className="text-slate-700">
                      <strong>Trusting Bank Nominees:</strong> Thinking a bank nominee owns the royalties. A nominee only
                      holds cash; only a Will grants ownership.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  WillDrafting, backed by AMA Legal Solutions, helps Indian authors, coders, and founders protect their
                  creative wealth.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="font-extrabold text-slate-900 text-sm">Pan-India</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">High Court Practice.</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="font-extrabold text-slate-900 text-sm">IP Specialized</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Copyright &amp; TM Bar.</div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="font-extrabold text-slate-900 text-sm">15 Mins</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">Online Will Drafting.</div>
                  </div>
                </div>
                <p>
                  Our lawyers make sure your work pays your family for decades, with zero publisher delays or family fights.
                </p>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: IP &amp; Royalties Will
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Authority &amp; Official Government Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Key Indian Laws for Creative Rights in a Will:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Copyright Act, 1957 Section 22:</strong> 60-year post-mortem term for published works.
                    </li>
                    <li>
                      <strong>Copyright Act, 1957 Section 30:</strong> Grant of licenses and future fee streams.
                    </li>
                    <li>
                      <strong>Trade Marks Act, 1999 Section 37 &amp; 45:</strong> Brand transfers and Form TM-M filing.
                    </li>
                    <li>
                      <strong>Patents Act, 1970 Section 68 &amp; 69:</strong> Written transfer and Patent Roll update.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 Section 63:</strong> Rules for signing and witnessing a Will.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Copyright Act 1957</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://copyright.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Copyright Office of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ipindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Controller of Patents &amp; Trade Marks</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Formats &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/digital-assets-crypto-schedule-will-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Digital Assets &amp; Crypto Schedule Format
                    </Link>
                    <Link
                      href="/templates/codicil-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Codicil Amendment Format
                    </Link>
                    <Link
                      href="/templates/executor-consent-and-renunciation-letter-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Executor Consent Letter Format
                    </Link>
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Attesting Witness Sworn Note
                    </Link>
                    <Link
                      href="/templates"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All Legal Templates Hub
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain English Summary Cards at Bottom */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write an IP Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your books, songs, and brand create wealth for 60 years after death. A clear Will stops book firms
                  from freezing cash. It keeps your spouse and kids safe.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write your Will on plain paper. No stamp paper is needed in India. Sign it in front of two adult
                  witnesses to make your IP bequest valid.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team drafts clear IP clauses covering book deals, brands, and patents. We make sure your family
                  gets every rupee of royalties fast.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian copyright wills, book royalties, brand transfers, and creative estate planning.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SECURE YOUR CREATIVE ROYALTIES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Fight-Proof Will for Your IP
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Protect your books, songs, brand marks, and patents. Keep payouts flowing to your spouse and heirs
                  with no court freeze.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Vetted &amp; Copyright Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5" />
                  <span>IP LEGAL REVIEW DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Custom IP Succession Help?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have complex book contracts, multi-owner patents, or film rights? Talk to our senior IP estate lawyers.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult IP Succession Lawyer</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>IP Filing Papers Required</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Death Certificate copy.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Signed Will with IP Clause.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Book &amp; Brand Contracts.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Form TM-M for Brands.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Form 16 / 20 for Patents.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Signed Payout Notice.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}