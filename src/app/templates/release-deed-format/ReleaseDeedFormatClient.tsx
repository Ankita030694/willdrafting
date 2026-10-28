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
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Home,
  Layers,
  GitCommit,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is a Release Deed?" },
  { id: "validity-checklist", label: "2. Simple Legal Checklist" },
  { id: "clause-annotated-template", label: "3. Free Release Deed Format (Explained)" },
  { id: "three-way-comparison", label: "4. Release Deed vs Gift Deed vs Sale" },
  { id: "when-not-to-use", label: "5. When You CANNOT Use a Release Deed" },
  { id: "state-stamp-duty-overview", label: "6. State-by-State Stamp Duty Rates" },
  { id: "visual-blueprint", label: "7. Parts of a Release Deed" },
  { id: "step-by-step-sop", label: "8. Easy Step-by-Step Guide" },
  { id: "three-fatal-mistakes", label: "9. 3 Common Mistakes to Avoid" },
  { id: "will-conversion-bridge", label: "10. How a Will Avoids This Hassle" },
  { id: "specialized-scenarios", label: "11. 4 Everyday Situations" },
  { id: "institutional-backing", label: "12. Lawyer Verified & Trusted" },
  { id: "frequently-asked-questions", label: "13. Questions People Often Ask" },
  { id: "statutory-citations", label: "14. Official Legal References" },
];

const RELEASE_DEED_TEMPLATE_TEXT = `DEED OF RELINQUISHMENT / RELEASE DEED
(Giving Up Share in Inherited Property Among Family Co-Heirs)
[Under Section 17 of the Registration Act, 1908]

THIS DEED OF RELINQUISHMENT is made and executed on this [Day] of [Month], [Year] at [City/District, State].

BETWEEN:

1. [Full Name of Person Giving Up Share], son/daughter/wife of [Father's/Spouse's Name], aged [Age] years, residing at [Complete Home Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number],
hereinafter called the "RELEASOR" (the person giving up their share);

AND

2. [Full Name of Family Member Receiving Share], son/daughter/wife of [Father's/Spouse's Name], aged [Age] years, residing at [Complete Home Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number],
hereinafter called the "RELEASEE" (the family co-owner receiving the share).

BACKGROUND AND FAMILY HISTORY:
1. Late [Name of Deceased Owner], who was the absolute owner of the property described in the Schedule below, passed away on [Date of Death] without making any Will.
2. Under Indian succession laws, the following family members jointly inherited the property as co-owners:
   (a) [Name of Heir 1, e.g. Son / Brother] (Releasee herein)
   (b) [Name of Heir 2, e.g. Daughter / Sister] (Releasor herein)
   (c) [Name of Heir 3, if any]
3. The Releasor, out of natural love, affection, and family harmony, wishes to permanently give up their undivided [e.g. 1/2 or 1/3] share in this inherited property in favour of the Releasee [without taking any money / in exchange for an agreed family settlement of Rs. [Amount]].

TERMS OF THE DEED:

1. PERMANENT SURRENDER OF SHARE
The Releasor permanently and unconditionally gives up and transfers their entire undivided [e.g. 1/3] share, right, and claim in the property to the Releasee forever.

2. FULL OWNERSHIP TO THE RECEIVING FAMILY MEMBER
From today, the Releasee becomes the absolute owner of the given-up share and can live in, rent, renovate, or sell the property without any objection or interference from the Releasor or their children.

3. FINAL AND CANNOT BE CANCELLED
The Releasor confirms that this decision is final and permanent. Neither the Releasor nor their children or future heirs can ever claim any right or share in this property in the future.

4. HANDOVER OF KEYS AND PAPERS
The Releasor has handed over full physical possession of the property, along with original title documents and municipal tax receipts, to the Releasee.

5. PERMISSION FOR NAME CHANGE IN GOVERNMENT RECORDS
The Releasor gives complete consent to the local municipal corporation, development authority, or electricity/water boards to update all property records (mutation, khata, electricity bill) solely into the name of the Releasee.

6. GUARANTEE OF CLEAN TITLE
The Releasor confirms that they have not sold, mortgaged, or pledged their share to any bank or third party, and that their share is completely free from loans or court disputes.

7. STAMP DUTY AND REGISTRATION
This document is being registered at the Sub-Registrar's Office under Section 17 of the Registration Act, 1908, with the required government stamp duty paid.

SCHEDULE OF THE PROPERTY
(Details of the Inherited Property)
- Property / Flat / Plot No.: [Flat / House Number]
- Floor & Building Name: [Building / Society Name]
- Survey / Khasra / Plot No.: [Survey / Khasra Number]
- Full Address: [Street, Area, City, PIN Code, State]
- Undivided Share Given Up: [e.g. 1/3rd Undivided Share, approx. [X] sq. ft.]
BOUNDARIES:
- North: [Road / Neighboring Flat]
- South: [Road / Neighboring Flat]
- East:  [Road / Neighboring Flat]
- West:  [Road / Neighboring Flat]

SIGNED BY BOTH PARTIES:

_________________________________             _________________________________
SIGNATURE / THUMB IMPRESSION                  SIGNATURE / THUMB IMPRESSION
(Person Giving Up Share)                      (Family Member Receiving Share)
[Full Name of Releasor]                       [Full Name of Releasee]

WITNESSES (TWO ADULT WITNESSES):
Signed in front of us at the Sub-Registrar Office:

WITNESS 1:
Signature: ___________________________
Full Name: [Witness 1 Name]
Father's/Spouse's Name: [Name]
Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]

WITNESS 2:
Signature: ___________________________
Full Name: [Witness 2 Name]
Father's/Spouse's Name: [Name]
Address: [Complete Address]
Phone / Aadhaar No.: [ID Number]`;

const CLAUSE_ANNOTATIONS = [
  {
    clause: "Family History & Joint Inheritance",
    statute: "Section 8, Hindu Succession Act, 1956",
    rationale:
      "Plain words: Documents that the parent passed away without a Will, explaining how both family members became legal co-owners of the property.",
  },
  {
    clause: "Must Already Be a Co-Owner",
    statute: "Supreme Court (Kuppuswamy Chettiar Case)",
    rationale:
      "Plain words: A release deed can ONLY be used between existing family co-owners. You cannot use it to give property to an outsider or stranger.",
  },
  {
    clause: "Exact Share Given Up",
    statute: "Section 17(1)(b), Registration Act, 1908",
    rationale:
      "Plain words: Clearly states the exact fractional share (like 1/2 or 1/3) being surrendered, preventing future confusion about who owns how much.",
  },
  {
    clause: "Love and Affection / Settlement",
    statute: "Section 25, Indian Contract Act, 1872",
    rationale:
      "Plain words: Clarifies whether the share is given freely out of family love or in exchange for a mutual settlement amount, which decides stamp duty and tax.",
  },
  {
    clause: "Permanent & Cannot Be Cancelled",
    statute: "Section 31, Specific Relief Act, 1963",
    rationale:
      "Plain words: Confirms that once registered, the person giving up the share cannot change their mind later or file a court case to take it back.",
  },
  {
    clause: "Permission for Name Change (Mutation)",
    statute: "Municipal Corporation / Revenue Laws",
    rationale:
      "Plain words: Gives official permission to the municipal corporation and electricity board to transfer the property papers completely into the receiver's name.",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "Both Parties are Already Legal Co-Owners",
    subtext: "Both the person giving up and receiving are legal co-heirs who inherited the property.",
  },
  {
    id: "check-2",
    label: "Death Certificate & Heir Certificate Ready",
    subtext: "Municipal death certificate of the original owner and family legal heir proof are available.",
  },
  {
    id: "check-3",
    label: "Accurate Property Details & Boundaries",
    subtext: "Flat number, survey/khasra number, and East-West-North-South boundaries are clearly written.",
  },
  {
    id: "check-4",
    label: "Correct State e-Stamp Paper Purchased",
    subtext: "Government e-stamp purchased under the family release deed category in your state.",
  },
  {
    id: "check-5",
    label: "Sub-Registrar Slot Booked for Registration",
    subtext: "Compulsory registration booked at the Sub-Registrar's office under Section 17.",
  },
  {
    id: "check-6",
    label: "Two Adult Witnesses with Original Aadhaar Cards",
    subtext: "Two witnesses ready to accompany you to the registrar office for biometric verification.",
  },
];

const FAQS = [
  {
    q: "What is a relinquishment deed under Indian property law?",
    a: "A relinquishment deed (also called a Release Deed or Haq-Tyag Patra) is a formal legal document where one family member willingly gives up their share of an inherited property to another co-owner (for example, a brother giving his share to his sister, or children giving their shares to their mother). Once registered, the person giving up the share has no legal claim left over that property.",
  },
  {
    q: "Can I give away property I bought myself using a release deed?",
    a: "No. A release deed is strictly for property inherited together by legal heirs. If you bought the house yourself with your own money, your children do not own any share while you are alive. To transfer your self-bought home to a family member, you must use a Gift Deed, a Sale Deed, or write a Will.",
  },
  {
    q: "Can I give up my property share in favor of someone outside the family?",
    a: "No. Under Indian law (settled by the Supreme Court in Kuppuswamy Chettiar v. Arumugam Chettiar), a release deed can only give more share to someone who is already a co-owner of that inherited property. If you want to transfer property to an outsider or distant friend, you must execute a Gift Deed or Sale Deed, which requires paying full commercial stamp duty.",
  },
  {
    q: "Do I have to register a release deed, or is a notary stamp enough?",
    a: "Registration at the local Sub-Registrar Office (SRO) is 100% compulsory under Section 17 of the Registration Act, 1908. A release deed on plain paper, notary stamp, or ₹100 affidavit has zero legal standing in court (Section 49). Without government registration, the property remains legally shared.",
  },
  {
    q: "What is the difference between a Release Deed and a Gift Deed?",
    a: "A Release Deed is only for inherited property between co-heirs (e.g. siblings), usually costs very low government stamp duty (often ₹1,000 to ₹5,000 in many states), and allows one co-owner to step aside. A Gift Deed can transfer any property (including self-bought flats) to anyone (family or outsider), but usually attracts much higher government stamp duty (3% to 7% of property value in most states).",
  },
  {
    q: "How much stamp duty and registration fee do I need to pay?",
    a: "Because it keeps property within the family, many states offer huge discounts: (1) Delhi: Fixed ₹1,000 stamp duty + ₹100 registration fee. (2) Maharashtra: Nominal ₹200 duty under Article 52 between blood relatives. (3) Uttar Pradesh: Nominal ₹5,000 duty for blood relatives. Non-family transfers or releases involving cash payment attract standard market stamp duty rates.",
  },
  {
    q: "Can I cancel a release deed after signing it if I change my mind?",
    a: "No. Once a release deed is registered at the Sub-Registrar Office, it is permanent and cannot be cancelled unilaterally. You cannot simply go back and ask for it to be undone. A civil court will only cancel it if you can prove you were cheated, threatened, or forced into signing (fraud or coercion) within 3 years under the Limitation Act.",
  },
  {
    q: "Can a married daughter give up her share in ancestral or father's property?",
    a: "Yes. Under the Hindu Succession Act (and reaffirmed by the Supreme Court in Vineeta Sharma v. Rakesh Sharma), daughters have equal birth rights in ancestral property just like sons, whether married or unmarried. If a married daughter wishes to let her mother or brother keep the ancestral house, she can legally execute a registered release deed.",
  },
  {
    q: "What documents do I need to take to the Sub-Registrar's office?",
    a: "You will need: (1) Original property title deed (Registry/Sale deed of the deceased owner), (2) Death certificate of the deceased parent/owner, (3) Legal Heir Certificate or Surviving Member Certificate showing all family heirs, (4) Original Aadhaar & PAN cards of all family members giving up or receiving shares, (5) Two adult witnesses with original Aadhaar cards, and (6) Government e-stamp paper and appointment receipt.",
  },
  {
    q: "How does writing a Will save my family from needing release deeds later?",
    a: "If you write a clear Will during your lifetime specifying who gets each property, your beneficiaries inherit directly. If you don't leave a Will, all legal heirs automatically become joint co-owners. Later, to sell or transfer the house, all siblings must visit government registrar offices, gather paperwork, pay fees, and execute release deeds. A simple Will saves your family from this hassle.",
  },
];

export default function ReleaseDeedFormatClient() {
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
    "check-3": true,
    "check-4": false,
    "check-5": false,
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

    const elements = document.querySelectorAll(".scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(RELEASE_DEED_TEMPLATE_TEXT);
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
            <Layers className="w-4 h-4 text-[#C65378]" />
            <span>PROPERTY SUCCESSION &bull; SECTION 17 REGISTRATION ACT</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Relinquishment Deed Format in India: Complete Legal Template
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Download our free, clause-annotated Relinquishment Deed format for inherited properties. Compare Release Deeds versus Gift Deeds, check state stamp duties, and register at the Sub-Registrar safely.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Will & Avoid Release Deeds</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#clause-annotated-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Free Release Deed Format</span>
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
                Property & Succession
              </span>
            </div>

            {/* Stat 2: Deeds & Wills Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                12,500+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estates Advised
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹3,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Family Assets Secured
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
                  1,450+
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
                Governed by Section 17 &amp; 49 of the Registration Act, 1908 and Section 8 of the Hindu Succession Act, 1956.
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
                  EXECUTIVE BRIEF: RELINQUISHMENT DEEDS IN INDIA
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 mb-3">
                Key Legal Rules for Relinquishing Inherited Property Shares
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Co-Owners Only:</strong> A relinquishment deed can only transfer shares to existing legal co-heirs. You cannot relinquish property to an outsider or stranger.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Compulsory Registration:</strong> Under Section 17(1)(b) of the Registration Act, 1908, registration at the Sub-Registrar Office is mandatory. Unregistered deeds are void.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Concessional Family Stamp Duty:</strong> Most Indian states offer reduced stamp duty (e.g. ₹1,000 in Delhi, ₹200 in Maharashtra, ₹5,000 in UP) for blood relatives.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Irrevocable Once Registered:</strong> Once registered, a release deed cannot be cancelled unilaterally. It requires a civil court order proving fraud or coercion.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: Relinquishment vs Release Deed
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When a Hindu, Sikh, Jain, or Buddhist property owner passes away intestate without leaving a valid Will, their property devolves upon their legal heirs as co-owners. Under Section 8 and Section 10 of the Hindu Succession Act, 1956, all Class I heirs receive undivided shares. For example, if a father dies leaving a widow, son, and daughter, each heir inherits a 1/3rd undivided share.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Often, family members decide that one co-heir should hold the entire property. A daughter or son may wish to surrender their legal share to their mother or brother without dividing the house. In Indian property law, this transfer is accomplished through a <strong>Relinquishment Deed</strong> (known locally as a <em>Haq-Tyag Patra</em>).
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">
                  The Doctrine of Enlargement of Pre-Existing Title
                </p>
                <p>
                  In the landmark ruling <em>Kuppuswamy Chettiar v. A.S.P.A. Arumugam Chettiar (AIR 1967 SC 1395)</em>, the Supreme Court of India established that a release deed does not create a new title. Instead, it extinguishes the releasor&apos;s interest and enlarges the pre-existing interest of the co-owner. Therefore, a relinquishment deed can only be executed between persons who are already joint co-owners.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKLIST */}
            <section id="validity-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>SECTION 2: COMPLIANCE AUDIT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Audit: Section 17 Registration Checklist
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before presenting your relinquishment deed at the Sub-Registrar Office, verify your preparation against these six essential statutory checkpoints.
              </p>

              {/* Checklist Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    Registration Audit Score: {checkedCount} / {CHECKLIST_ITEMS.length}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      isAllValid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {isAllValid ? "100% SRO Ready" : "Pending Checkpoints"}
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
                      All checkpoints verified. Your documentation complies with Section 17 of the Registration Act, 1908.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Please complete all items. Missing death certificates or incorrect e-stamps lead to immediate SRO rejection.
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: CLAUSE-ANNOTATED FORMAT */}
            <section id="clause-annotated-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 3: FREE DOWNLOADABLE FORMAT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Clause-Annotated Format: Free Printable Release Deed
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is a full legal template for a Relinquishment Deed approved by succession and real estate advocates. Copy the text directly or print it for execution on non-judicial e-stamp paper.
              </p>

              {/* Template Container with Copy & Print Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Standard Indian Relinquishment Deed Template (Section 17 Compliant)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                      title="Copy Release Deed to clipboard"
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
                  {RELEASE_DEED_TEMPLATE_TEXT}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                  <span className="text-center sm:text-left">
                    Want to avoid release deeds entirely? A Will transfers property directly without SRO fees.
                  </span>
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all shrink-0 cursor-pointer"
                  >
                    <span>Draft a Will in 15 Mins</span>
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

            {/* SECTION 4: 3-WAY COMPARISON MATRIX */}
            <section id="three-way-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 4: COMPARATIVE ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. 3-Way Matrix: Release vs Gift vs Relinquishment Deed
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Homeowners frequently confuse Relinquishment Deeds, Release Deeds, and Gift Deeds. Choosing the incorrect instrument leads to Sub-Registrar rejections and unnecessary stamp duty.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[650px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Comparison Parameter</th>
                      <th className="p-3.5 sm:p-4">Relinquishment Deed</th>
                      <th className="p-3.5 sm:p-4">Commercial Release Deed</th>
                      <th className="p-3.5 sm:p-4">Gift Deed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Eligible Parties</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Co-heirs &amp; blood relatives only</td>
                      <td className="p-3.5 text-slate-700 font-medium">Any co-owners or partners</td>
                      <td className="p-3.5 text-slate-700 font-medium">Anyone (relatives or third parties)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Eligible Property Type</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Inherited / ancestral property</td>
                      <td className="p-3.5 text-slate-700 font-medium">Jointly purchased assets</td>
                      <td className="p-3.5 text-slate-700 font-medium">Self-acquired or partitioned share</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Monetary Consideration</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Usually nil (love &amp; affection)</td>
                      <td className="p-3.5 text-slate-700 font-medium">Permitted (buyout settlements)</td>
                      <td className="p-3.5 text-rose-600 font-medium">Strictly prohibited by law</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Effect on Ownership Title</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Enlarges existing co-heir title</td>
                      <td className="p-3.5 text-slate-700 font-medium">Extinguishes claimant share</td>
                      <td className="p-3.5 text-slate-700 font-medium">Creates a brand new absolute title</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Stamp Duty Burden</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Concessional / nominal rate</td>
                      <td className="p-3.5 text-amber-700 font-medium">Standard / ad valorem duty</td>
                      <td className="p-3.5 text-amber-700 font-medium">Moderate to full market duty</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Registration Requirement</td>
                      <td className="p-3.5 text-rose-600 font-bold">Mandatory (Section 17)</td>
                      <td className="p-3.5 text-rose-600 font-bold">Mandatory (Section 17)</td>
                      <td className="p-3.5 text-rose-600 font-bold">Mandatory (Section 123 TPA)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Best Practical Use Case</td>
                      <td className="p-3.5 text-emerald-700 font-medium">Transferring inherited house to mother</td>
                      <td className="p-3.5 text-slate-700 font-medium">Settling co-investor disputes</td>
                      <td className="p-3.5 text-slate-700 font-medium">Living parent transferring home</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: WHEN NOT TO USE */}
            <section id="when-not-to-use" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>SECTION 5: CRITICAL LEGAL WARNING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Critical Rules: When NOT to Use a Relinquishment Deed
              </h2>
              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-5 sm:p-6 space-y-4 text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>Four Situations Where Relinquishment Deeds Are Legally Invalid</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-white/80 rounded-xl border border-amber-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">1. Self-Acquired Property of Living Owner</h4>
                    <p className="text-slate-600 leading-relaxed">
                      A parent cannot execute a relinquishment deed to transfer self-acquired property to their son or daughter. Children possess no pre-existing co-ownership interest during the parent&apos;s lifetime. The parent must execute a Gift Deed or a Will.
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 rounded-xl border border-amber-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">2. Transfer to Third Parties or Strangers</h4>
                    <p className="text-slate-600 leading-relaxed">
                      You cannot relinquish property in favour of a distant relative, in-law, or stranger who is not an inherited co-heir. The Sub-Registrar will reclassify the deed as a conveyance or sale deed and demand full market stamp duty with penalties.
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 rounded-xl border border-amber-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">3. Undivided Coparcenary Prior to Partition</h4>
                    <p className="text-slate-600 leading-relaxed">
                      A coparcener cannot selectively relinquish their share in one specific parcel of joint family property while holding onto others. Coparcenary interests require either a complete family settlement or formal partition deed.
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 rounded-xl border border-amber-200 space-y-1.5">
                    <h4 className="font-bold text-slate-900">4. Attempting to Defraud Debt Creditors</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Relinquishing property to escape bank recoveries or civil court attachments violates Section 53 of the Transfer of Property Act. Creditors can file a suit to declare such transfers fraudulent and void.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: STATE STAMP DUTY OVERVIEW */}
            <section id="state-stamp-duty-overview" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SECTION 6: STAMP DUTY SCHEDULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. State Stamp Duty Guide: Rates for Blood Relatives
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Stamp duty rates on release deeds vary significantly across Indian states. Most state legislatures provide concessional rates when the deed is executed between immediate family members without monetary consideration.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[620px]">
                  <thead className="bg-slate-900 text-white font-semibold">
                    <tr>
                      <th className="p-3.5 sm:p-4">State / Union Territory</th>
                      <th className="p-3.5 sm:p-4">Duty (Blood Relatives)</th>
                      <th className="p-3.5 sm:p-4">Registration Fee</th>
                      <th className="p-3.5 sm:p-4">Governing Legal Schedule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Delhi (NCT)</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">₹1,000 flat stamp duty</td>
                      <td className="p-3.5 text-slate-600">₹100 + scanning charges</td>
                      <td className="p-3.5 text-slate-600">Indian Stamp (Delhi Amendment) Act</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Maharashtra</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">₹200 flat stamp duty</td>
                      <td className="p-3.5 text-slate-600">₹200 fixed fee</td>
                      <td className="p-3.5 text-slate-600">Article 52, Maharashtra Stamp Act</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Uttar Pradesh</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">₹5,000 nominal duty</td>
                      <td className="p-3.5 text-slate-600">1% of valuation (max ₹10,000)</td>
                      <td className="p-3.5 text-slate-600">UP Stamp Notification (Family Remission)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Karnataka</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">₹1,000 to ₹5,000 (area based)</td>
                      <td className="p-3.5 text-slate-600">₹500 fixed registration fee</td>
                      <td className="p-3.5 text-slate-600">Article 44, Karnataka Stamp Act</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Tamil Nadu</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">1% market value (max ₹25,000)</td>
                      <td className="p-3.5 text-slate-600">1% fee (max ₹4,000)</td>
                      <td className="p-3.5 text-slate-600">Tamil Nadu Stamp Act Schedule I</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Haryana</td>
                      <td className="p-3.5 text-emerald-700 font-semibold">Concessional family slab</td>
                      <td className="p-3.5 text-slate-600">Standard slab fee</td>
                      <td className="p-3.5 text-slate-600">Haryana Stamp Rules (Blood Relatives)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                <span className="font-bold text-slate-800">State Revenue Caveat:</span> State stamp duty rates and municipal surcharges are subject to periodic state budgetary notifications. Always verify current fees at your local Sub-Registrar Office before purchasing non-judicial e-stamp paper.
              </div>
            </section>

            {/* SECTION 7: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>SECTION 7: VISUAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Visual Blueprint: Anatomy of an Indian Release Deed
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                A legally enforceable Relinquishment Deed follows an orderly statutory structure. Below is the blueprint illustrating how title recitals, share extinction, municipal mutation consent, and SRO registration connect.
              </p>

              {/* Full width image card container */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/release-deed-format-og.jpg"
                    alt="Visual Blueprint and Anatomy of a Valid Relinquishment Deed in India"
                    width={1200}
                    height={630}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: Complete statutory architecture and registration workflow of a Release Deed
                  </span>
                  <Link
                    href="/images/release-deed-format-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-[#5F7E75]" />
                <span>SECTION 8: EXECUTION WORKFLOW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Five Milestones to SRO Registration
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Registering a Relinquishment Deed in India requires following five strict procedural milestones.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1",
                    title: "Establish Legal Heirship and Chain of Title",
                    desc: "Obtain the official death certificate of the deceased owner and a legal heir certificate from the revenue tehsildar or municipal authority. Gather original parent title deeds.",
                  },
                  {
                    step: "2",
                    title: "Draft Deed with Specific Property Schedule",
                    desc: "Draft the relinquishment deed defining the exact fractional share surrendered and listing 4-sided North, South, East, and West boundaries with survey and ward details.",
                  },
                  {
                    step: "3",
                    title: "Purchase State e-Stamp Paper",
                    desc: "Procure the non-judicial e-stamp paper through Stock Holding Corporation of India (SHCIL) or state portal under the designated family release deed article.",
                  },
                  {
                    step: "4",
                    title: "Book SRO Slot & Biometric Attestation",
                    desc: "Schedule an online SRO appointment. All releasors, releasees, and two adult witnesses must appear physically with original Aadhaar cards and PAN cards for biometric scanning.",
                  },
                  {
                    step: "5",
                    title: "Collect Registered Deed & File for Property Mutation",
                    desc: "Collect the registered deed containing the Sub-Registrar seal and volume number. File a mutation petition at the municipal corporation or tehsil to update tax records.",
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

            {/* SECTION 9: THREE FATAL MISTAKES */}
            <section id="three-fatal-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>SECTION 9: COMMON MISTAKES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Three Fatal Mistakes That Trigger SRO Rejections
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Avoid these three common drafting and procedural errors when executing an Indian release deed.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Relying on Unregistered ₹100 Notary Affidavits
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 17 &amp; 49 of the Registration Act, an unregistered affidavit on ₹100 stamp paper has zero legal validity in court. It cannot transfer title or allow municipal mutation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Relinquishing to Non-Heir or In-Law
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Executing a release deed in favour of a son-in-law or distant cousin who was not an inherited co-heir leads to cancellation by the SRO or reclassification as a costly sale deed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                    #3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Relinquishing Living Parent&apos;s Property
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A living person cannot relinquish self-acquired property to their heirs. You can only relinquish inherited joint co-ownership. Living owners must use a Gift Deed or Will.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: WILL CONVERSION BRIDGE */}
            <section id="will-conversion-bridge" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 10: THE PROACTIVE ALTERNATIVE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Estate Strategy: How a Will Would Have Avoided This
              </h2>
              <div className="rounded-2xl bg-gradient-to-br from-rose-50/70 to-slate-50 border border-rose-200 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Why Families Incur Unnecessary Costs Without a Will
                    </h3>
                    <p className="text-xs text-slate-500">
                      Relinquishment deeds are only required when someone dies intestate without a Will.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  When a property owner dies without a Will, all legal heirs automatically become co-owners. Transferring the family home to the surviving mother or a designated son then forces daughters, brothers, and sisters to spend weeks coordinating appointments, traveling to the Sub-Registrar Office, and paying registration charges.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed">
                  If the owner writes a simple, legally valid Will during their lifetime, the property passes directly to the intended beneficiary. No release deed is needed. No co-owner consent is required. Municipal mutation proceeds directly on the basis of the Will.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-sm hover:bg-[#a13c5d] transition-all shadow-md cursor-pointer"
                  >
                    <span>Draft Your Will on Plain Paper Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/blogs/gift-deed-vs-will-india"
                    className="text-xs font-semibold text-[#172228] hover:text-[#C65378] underline decoration-slate-300"
                  >
                    Read our Gift Deed vs Will Strategic Comparison &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SECTION 11: COMMON USE CASES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Four Specialized Scenarios for Property Release
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review these four common real-world scenarios where executing a registered Relinquishment Deed is the standard legal procedure.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Siblings Relinquishing to Widowed Mother</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Following the father&apos;s intestate demise, adult children execute a registered release deed surrendering their 2/3rd collective shares to their mother, making her the sole 100% owner.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Building className="w-4 h-4 text-[#5F7E75]" />
                    <span>Married Daughter Releasing Ancestral Share</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the 2005 Hindu Succession Amendment, daughters are equal coparceners. A married daughter can formally release her ancestral share in favour of her brother to prevent future partition claims.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Calendar className="w-4 h-4 text-[#D29E0D]" />
                    <span>NRI Co-Heir Executing via Special POA</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An NRI co-heir residing abroad signs a Special Power of Attorney (POA) attested by the Indian Consulate, authorizing a trusted family member in India to register the release deed on their behalf.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>Co-Owner Buyout with Financial Consideration</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    One co-heir pays an agreed financial settlement to another co-heir to acquire their share. The release deed recites the exact bank transaction details and acts as proof of full satisfaction.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: COMPANY PROFILE */}
            <section id="institutional-backing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>SECTION 12: INSTITUTIONAL BACKING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Verification: Powered by AMA Legal
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">WillDrafting.in</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      India&apos;s Dedicated Estate Planning &amp; Succession Portal
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FAF7F0] border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700">
                    <span>In Collaboration with</span>
                    <strong className="text-slate-900">AMA Legal Solutions</strong>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every legal template, statutory analysis, and estate planning workflow on WillDrafting.in is drafted and regularly audited by experienced succession advocates from AMA Legal Solutions. We ensure strict alignment with the Indian Succession Act, 1925, Hindu Succession Act, 1956, and state-specific Sub-Registrar registration guidelines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">Section 17 Compliant</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Registration Ready</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">State Stamp Check</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Duty Optimization</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className="font-extrabold text-slate-900 text-sm">Advocate Verified</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Court Tested Clauses</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span>SECTION 13: DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Relinquishment Deeds
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Find clear answers to common questions about executing, witnessing, and registering a Relinquishment Deed in India.
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

            {/* SECTION 14: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4" />
                <span>SECTION 14: STATUTORY CITATIONS &amp; REFERENCES</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Statutory Citations and Official Legal Resources
              </h2>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Registration Act, 1908:</strong> Section 17(1)(b) (compulsory registration of non-testamentary instruments transferring or extinguishing immovable property rights) and Section 49 (inadmissibility of unregistered documents).
                </li>
                <li>
                  <strong>Hindu Succession Act, 1956:</strong> Section 8 (general rules of succession in case of males), Section 10 (distribution among Class I heirs), and 2005 Amendment Section 6 (coparcenary rights of daughters).
                </li>
                <li>
                  <strong>Supreme Court of India:</strong> <em>Kuppuswamy Chettiar v. A.S.P.A. Arumugam Chettiar (AIR 1967 SC 1395)</em> (release deed valid only between pre-existing co-owners) and <em>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</em> (daughters as coparceners by birth).
                </li>
                <li>
                  <strong>Transfer of Property Act, 1882:</strong> Section 122 &amp; 123 (gift deed essentials) and Section 53 (fraudulent transfers).
                </li>
              </ul>

              <div className="pt-3 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Explore Related Legal Templates &amp; Guides:</div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates/will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Will Format in India (English) &rarr;
                  </Link>
                  <Link
                    href="/templates/codicil-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Codicil Format in India &rarr;
                  </Link>
                  <Link
                    href="/templates/living-will-format-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Living Will Format (Medical Directive) &rarr;
                  </Link>
                  <Link
                    href="/blogs/gift-deed-vs-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Gift Deed vs Will in India &rarr;
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
                Bar Council enrolled advocate with 18+ years of expertise in testamentary litigation, property succession, and estate structuring at AMA Legal Solutions.
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
                <span>CONFIDENTIAL &amp; SECURE</span>
              </div>
              <h3 className="text-lg font-bold leading-snug">
                Avoid Release Deeds with a Legal Will
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevent future property disputes among children. Use our guided wizard to create an advocate-verified, challenge-proof Will in 15 minutes.
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
                    <strong>Section 17 Compliant:</strong> Ready for Sub-Registrar biometric registration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Precise Fractional Shares:</strong> Clearly specifies 1/2, 1/3, or 1/4th shares.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mutation Ready:</strong> Includes explicit municipal tax and khata transfer clause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dispute Resistant:</strong> Contains perpetual waiver of future partition suits.
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
                  href="/templates/codicil-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Codicil Format in India</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Amend an existing Will safely &rarr;
                  </div>
                </Link>
                <Link
                  href="/blogs/gift-deed-vs-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors"
                >
                  <div className="font-bold text-xs text-slate-900">Gift Deed vs Will in India</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Tax &amp; stamp duty comparison &rarr;
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
                  href="/blogs/gift-deed-vs-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Gift Deed vs Will
                </Link>
                <Link
                  href="/services/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
