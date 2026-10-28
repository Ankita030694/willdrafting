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
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  AlertCircle,
  Clock,
  Building2,
  CheckSquare,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Section 284 Probate Caveat: Purpose & Scope" },
  { id: "caveat-limitation-calculator", label: "2. Interactive Caveat & Limitation Calculator" },
  { id: "cpc-vs-isa-caveat-comparison", label: "3. Section 148A CPC vs Section 284 ISA Caveat" },
  { id: "schedule-v-caveat-format", label: "4. Statutory Schedule V Probate Caveat Format" },
  { id: "affidavit-in-support-format", label: "5. Affidavit in Support of Caveat Legal Format" },
  { id: "caveatable-interest-precedents", label: "6. Establishing Caveatable Interest Precedents" },
  { id: "high-court-testamentary-rules", label: "7. High Court Rules: Bombay, Calcutta & Delhi" },
  { id: "contentious-suit-conversion", label: "8. Section 295 ISA: Conversion to Regular Suit" },
  { id: "step-by-step-caveat-sop", label: "9. Step-by-Step SOP: Lodging a Probate Caveat" },
  { id: "common-caveat-mistakes", label: "10. Four Fatal Mistakes When Opposing Probate" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Probate Caveat" },
  { id: "statutory-citations", label: "13. Statutory Provisions & High Court Rules" },
];

const FAQS = [
  {
    q: "What is a caveat against probate under Section 284 of the Indian Succession Act?",
    a: "A probate caveat is a formal notice filed in court under Section 284 and Schedule V of the Indian Succession Act, 1925. It directs the judge not to grant probate or letters of administration without giving you written notice first.",
  },
  {
    q: "How does a Section 284 ISA probate caveat differ from a Section 148A CPC caveat?",
    a: "A civil caveat under Section 148A of the CPC lasts for only 90 days. A probate caveat under Section 284 of the Indian Succession Act stays active under court rules. Once citation is served, you must file a sworn supporting affidavit within 8 to 14 days.",
  },
  {
    q: "What is the strict time limit to file the Affidavit in Support of Caveat?",
    a: "You must file your affidavit within 8 days in the Bombay High Court under Rule 402. In the Calcutta and Delhi High Courts, you have 14 days. If you miss this deadline, the court will dismiss your caveat and may grant probate.",
  },
  {
    q: "Who possesses a valid caveatable interest to oppose probate?",
    a: "Under Supreme Court rulings in Elizabeth Antony and Krishna Kumar Birla, any person who would inherit property if the Will fails holds a valid interest. Class I and Class II legal heirs always hold an automatic right to object.",
  },
  {
    q: "Can a person claiming adverse title to the property file a probate caveat?",
    a: "No. A probate court only tests whether the Will is genuine. It cannot decide who owns the property. If you claim that the deceased did not own the house, you must file a regular civil title suit under the CPC.",
  },
  {
    q: "Can I file a caveat before my sibling applies for probate in court?",
    a: "Yes. Under Section 284(4) of the Act, you can enter a caveat at any time before probate is granted. You can file an advance caveat in the District Court or High Court as soon as you suspect a fake Will.",
  },
  {
    q: "What happens to the probate petition once a caveat and affidavit are filed?",
    a: "Under Section 295 of the Act, the case converts from a simple petition into a regular suit. The applicant becomes the Plaintiff and you become the Defendant. The court conducts a full trial with witness cross-examination.",
  },
  {
    q: "What are the common legal grounds to dispute a Will in the supporting affidavit?",
    a: "Common legal grounds include suspicious circumstances, lack of sound mind, dementia, coercion, fraud, forged signatures, or a newer valid Will that cancels the old one.",
  },
];

export default function CaveatAgainstProbateClient() {
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
  const [copiedCaveat, setCopiedCaveat] = useState<boolean>(false);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE CAVEAT & LIMITATION CALCULATOR
  // ==========================================
  const [applicantRole, setApplicantRole] = useState<string>("class1_heir");
  const [courtJurisdiction, setCourtJurisdiction] = useState<string>("bombay_hc");
  const [challengeGround, setChallengeGround] = useState<string>("suspicious_circumstances");
  const [citationReceived, setCitationReceived] = useState<boolean>(true);
  const [citationDaysAgo, setCitationDaysAgo] = useState<number>(3);

  // Dynamic Rule Computation
  let affidavitLimitDays = 14;
  let courtRuleCitation = "District Court Testamentary Rules";

  if (courtJurisdiction === "bombay_hc") {
    affidavitLimitDays = 8;
    courtRuleCitation = "Bombay High Court (Original Side) Rules, Rule 402";
  } else if (courtJurisdiction === "calcutta_hc") {
    affidavitLimitDays = 14;
    courtRuleCitation = "Calcutta High Court (Original Side) Rules, Chapter XXXV";
  } else if (courtJurisdiction === "delhi_hc") {
    affidavitLimitDays = 14;
    courtRuleCitation = "Delhi High Court (Original Side) Rules, Chapter XXIX";
  } else if (courtJurisdiction === "madras_hc") {
    affidavitLimitDays = 14;
    courtRuleCitation = "Madras High Court (Original Side) Rules, Order XXV";
  } else {
    affidavitLimitDays = 14;
    courtRuleCitation = "Indian Succession Act, 1925 Section 284 & District Rules";
  }

  const daysRemaining = citationReceived ? Math.max(0, affidavitLimitDays - citationDaysAgo) : affidavitLimitDays;
  const isExpired = citationReceived && citationDaysAgo > affidavitLimitDays;

  // Caveatable Interest Assessment
  let hasCaveatableInterest = true;
  let caveatableFeedback = "";

  if (applicantRole === "class1_heir") {
    hasCaveatableInterest = true;
    caveatableFeedback =
      "Valid Legal Right: As a child, spouse, or parent, you would inherit property under Hindu law or personal succession law if the Will is cancelled.";
  } else if (applicantRole === "class2_heir") {
    hasCaveatableInterest = true;
    caveatableFeedback =
      "Valid Family Right: As a brother, sister, or collateral relative, you hold a valid right to object if no closer heirs survive.";
  } else if (applicantRole === "prior_will_beneficiary") {
    hasCaveatableInterest = true;
    caveatableFeedback =
      "Direct Legal Interest: As a beneficiary named in an earlier or later Will, your gift is directly harmed by the disputed paper.";
  } else if (applicantRole === "outside_title_claimant") {
    hasCaveatableInterest = false;
    caveatableFeedback =
      "Title Dispute Warning: A probate court cannot decide who owns the property. You must file a separate civil title suit under the CPC.";
  } else {
    hasCaveatableInterest = false;
    caveatableFeedback =
      "Unsecured Creditor: Lenders do not hold a direct right to contest probate unless clear fraud against the estate is shown.";
  }

  const copyCaveatToClipboard = () => {
    const text = `IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT OF [NAME OF STATE/CITY]
AT [LOCATION]
TESTAMENTARY AND INTESTATE JURISDICTION

CAVEAT PETITION NO. ________ OF 2026

IN THE MATTER OF:
Estate of Late [Full Legal Name of Deceased], deceased.

AND IN THE MATTER OF:
Section 284 read with Schedule V of the Indian Succession Act, 1925

[Full Name of Caveator]
Son/Daughter/Spouse of [Father's/Spouse's Name]
Residing at: [Complete Permanent Address]
... CAVEATOR / OPPONENT

VERSUS

[Full Name of Propounder / Suspected Applicant]
Son/Daughter of [Father's Name]
Residing at: [Complete Residential Address]
... PROPOUNDER / APPLICANT

CAVEAT UNDER SECTION 284 & SCHEDULE V OF THE INDIAN SUCCESSION ACT, 1925

TO,
THE HON'BLE DISTRICT JUDGE / REGISTRAR (TESTAMENTARY)
AND THE DISTRICT DELEGATE:

Let nothing be done in the matter of the estate of the late [Full Name of Deceased], late of [Permanent Residence of Deceased], deceased, who departed this life on the [Day] day of [Month], [Year] at [Place of Death], without notice to [Full Name of Caveator], residing at [Complete Residential Address of Caveator], who is the lawful [Son / Daughter / Spouse / Class I Legal Heir] of the said deceased and holds a bona fide, vital caveatable interest in the estate of the deceased.

Dated this _______ day of _____________, 2026.

ADVOCATE FOR CAVEATOR                                CAVEATOR
[Advocate Name, Enrolment No.]                       [Signature of Caveator]
[Chamber Address & Email]`;
    navigator.clipboard.writeText(text);
    setCopiedCaveat(true);
    setTimeout(() => setCopiedCaveat(false), 3000);
  };

  const copyAffidavitToClipboard = () => {
    const text = `IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT OF [NAME OF STATE/CITY]
AT [LOCATION]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY PETITION / SUIT NO. ________ OF 2026

IN THE MATTER OF:
Petition for Probate / Letters of Administration of the Alleged Will dated [Date of Disputed Will] of Late [Full Name of Deceased].

[Full Name of Propounder]                               ... PETITIONER / PLAINTIFF
VERSUS
[Full Name of Caveator]                                 ... CAVEATOR / DEFENDANT

AFFIDAVIT IN SUPPORT OF CAVEAT
(Filed pursuant to Section 284 ISA read with High Court Testamentary Rules)

I, [Full Name of Caveator], aged about [Age] years, son/daughter/spouse of [Name], residing at [Complete Residential Address], do hereby solemnly affirm and state on oath as follows:

1. That I am the Caveator in the above proceeding and the lawful [relationship, e.g., son / daughter / surviving spouse] of the deceased Late [Full Name of Deceased], who died on [Date of Death]. As a Class I legal heir under Section 8 of the Hindu Succession Act, 1956, I have a direct, substantial caveatable interest in the deceased's estate.

2. That the Petitioner has filed the present petition seeking Probate of an alleged writing dated [Date of Disputed Will] purporting to be the Last Will and Testament of the deceased.

3. That I dispute and challenge the genuineness, validity, and due execution of the alleged Will on the following substantive grounds:
   (a) SUSPICIOUS CIRCUMSTANCES: The alleged Will excludes natural legal heirs without plausible explanation and was drafted under active participation of the sole propounder-beneficiary.
   (b) LACK OF TESTAMENTARY CAPACITY: At the time of alleged execution, the deceased was suffering from severe cognitive illness and was medically unfit to understand the nature or consequences of the disposition.
   (c) UNDUE INFLUENCE AND COERCION: The deceased was kept in total isolation and the document was procured under duress, coercion, and misrepresentation.
   (d) DEFECTIVE ATTESTATION: The alleged Will was not executed or attested in accordance with the mandatory statutory requirements of Section 63 of the Indian Succession Act, 1925.

4. That in view of the aforesaid contentious disputes, the present petition cannot be adjudicated summary-wise and must be registered and tried as a Contentious Testamentary Suit under Section 295 of the Indian Succession Act, 1925.

VERIFICATION:
Verified at [Location] on this [Day] day of [Month], 2026, that the contents of paragraphs 1 to 4 of this Affidavit are true and correct to my knowledge and legal advice received, and no part thereof is false.

DEPONENT`;
    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `PROBATE CAVEAT FILING CHECKLIST (SECTION 284 ISA):
1. Caveat Petition in Schedule V format with full deceased and caveator addresses
2. Duly executed Vakalatnama with court fee and advocate welfare stamp
3. Certified copy of Death Certificate of the testator/deceased
4. Document establishing Caveatable Interest (Aadhaar, Passport, Legal Heir Certificate)
5. Address memorandum and proof of identity of the Caveator
6. High Court / District Court ledger verification of pending testamentary petitions
7. Sworn Affidavit in Support of Caveat detailing suspicious circumstances (within 8/14 days of citation)
8. Process fee for service of caveat notice upon the Propounder / District Delegate`;
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
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 284, 285 &amp; SCHEDULE V</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Caveat Against Probate Format in India: Section 284 Guide
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Protect your legal rights if you suspect a forged Will. Download our free Section 284 caveat format
            and affidavit template. Stop a secret probate grant in High Court or District Court today.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#schedule-v-caveat-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Probate Caveat Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 284</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SCHEDULE V PROBATE CAVEAT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">8 to 14 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STRICT AFFIDAVIT DEADLINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 295</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CONTENTIOUS SUIT CONVERSION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Ex-Parte</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY CITATION NOTICE
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                This page covers Sections 284, 285, 286, and 295 of the Indian Succession Act, 1925. It follows
                High Court rules for Bombay, Calcutta, Madras, and Delhi.
              </p>
            </div>

            {/* Quick Limitation Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Critical Warning</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                A caveat buys you time. You must file your sworn affidavit within 8 days in Bombay or 14 days in
                Delhi and Calcutta after court notice. Missing this date dismisses your caveat.
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
                <span>EXECUTIVE BRIEF: PROBATE CAVEAT RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 284 Caveats:</strong> A caveat blocks the court from issuing a probate grant
                    behind your back.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Different from CPC Caveats:</strong> Standard 90-day civil caveats do not apply to
                    Wills. Probate caveats follow Section 284 and Schedule V.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Filing Deadline:</strong> You must file your sworn supporting affidavit within
                    8 or 14 days of getting court notice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Conversion to Regular Suit:</strong> Under Section 295, filing your affidavit turns
                    the case into a full lawsuit with witness examination.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/caveat-against-probate-format-india-og.jpg"
                  alt="Caveat Against Probate Format India under Section 284 Indian Succession Act Schedule V"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Testamentary Litigation Series: Section 284 &amp; Schedule V Caveat Formats
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  UPDATED FOR 2026 HIGH COURT RULES
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 284 Probate Caveat: Purpose &amp; Scope
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  When a parent dies, family members often worry about forged Wills. A dishonest sibling may
                  secretly apply for probate in court. If no one objects, the court may grant probate without you
                  knowing.
                </p>
                <p>
                  Section 284 of the Indian Succession Act, 1925 stops this. A caveat is a formal legal warning lodged
                  in court. It tells the judge not to issue probate without giving you written notice first.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Statutory Language: Schedule V Form of Caveat
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    Let nothing be done in the matter of the estate of the late deceased without notice to the
                    caveator who holds a vital legal interest.
                  </p>
                </div>
                <p>
                  Once you lodge a caveat, the court registry cannot proceed in secret. The applicant must serve you
                  with a copy of the petition and Will. You can then inspect the Will and contest it.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="caveat-limitation-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC &amp; LIMITATION CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Caveat &amp; Limitation Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Check if you have the legal right to object to a Will. Find your exact deadline to file your sworn
                affidavit in court.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Relationship */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Relationship to the Deceased:
                    </label>
                    <select
                      value={applicantRole}
                      onChange={(e) => setApplicantRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="class1_heir">Class I Legal Heir (Child, Spouse, Mother)</option>
                      <option value="class2_heir">Class II Legal Heir (Sibling, Father, Grandchild)</option>
                      <option value="prior_will_beneficiary">Beneficiary under an Earlier or Later Will</option>
                      <option value="outside_title_claimant">Claimant Asserting Independent Property Title</option>
                      <option value="unsecured_creditor">Unsecured Personal Creditor of Deceased</option>
                    </select>
                  </div>

                  {/* Select 2: Forum */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Court Jurisdiction / Forum:
                    </label>
                    <select
                      value={courtJurisdiction}
                      onChange={(e) => setCourtJurisdiction(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="bombay_hc">Bombay High Court (Original Side Rules)</option>
                      <option value="calcutta_hc">Calcutta High Court (Original Side Rules)</option>
                      <option value="delhi_hc">Delhi High Court (Original Side Rules)</option>
                      <option value="madras_hc">Madras High Court (Original Side Rules)</option>
                      <option value="district_court">District Court / District Delegate Pan-India</option>
                    </select>
                  </div>

                  {/* Select 3: Grounds */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Primary Challenge Ground:
                    </label>
                    <select
                      value={challengeGround}
                      onChange={(e) => setChallengeGround(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="suspicious_circumstances">Suspicious Circumstances &amp; Beneficiary Role</option>
                      <option value="forgery_fraud">Forged Signature / Fake Document</option>
                      <option value="lack_of_capacity">Lack of Sound Mind / Dementia</option>
                      <option value="undue_influence">Coercion, Duress &amp; Undue Pressure</option>
                      <option value="subsequent_revocation">Revoked by Subsequent Registered Will</option>
                    </select>
                  </div>

                  {/* Citation Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Has Court Citation / Notice Been Served on You?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCitationReceived(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          citationReceived
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Yes, Served
                      </button>
                      <button
                        type="button"
                        onClick={() => setCitationReceived(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          !citationReceived
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Not Yet (Advance)
                      </button>
                    </div>
                  </div>
                </div>

                {citationReceived && (
                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Days Elapsed Since Service of Citation: {citationDaysAgo} Day(s)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={citationDaysAgo}
                      onChange={(e) => setCitationDaysAgo(parseInt(e.target.value) || 0)}
                      className="w-full accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Day 0 (Just Served)</span>
                      <span>Day 8 (Bombay HC Limit)</span>
                      <span>Day 14 (Calcutta/Delhi HC Limit)</span>
                      <span>Day 20 (Defaulted)</span>
                    </div>
                  </div>
                )}

                {/* COMPUTED RESULT DISPLAY */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {hasCaveatableInterest ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <span className="font-extrabold text-sm text-slate-900">
                        {hasCaveatableInterest ? "Valid Legal Right Established" : "Warning: Title Dispute"}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                      {courtRuleCitation}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{caveatableFeedback}</p>

                  {citationReceived ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Filing Rule Limit</div>
                        <div className="text-lg font-black text-slate-900">{affidavitLimitDays} Calendar Days</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Days Remaining</div>
                        <div
                          className={`text-lg font-black ${
                            isExpired ? "text-rose-600" : daysRemaining <= 3 ? "text-amber-600" : "text-emerald-700"
                          }`}
                        >
                          {isExpired ? "DEADLINE EXPIRED" : `${daysRemaining} Days Left`}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Procedural Result</div>
                        <div className="text-sm font-bold text-slate-900">
                          {isExpired ? "Risk of Dismissal" : "Converts to Full Suit"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <strong>Advance Caveat Mode:</strong> Lodging a caveat today alerts the court registry.
                      Whenever the other side files their petition, the court must give you formal notice first.
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="cpc-vs-isa-caveat-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PROCEDURAL COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 148A CPC vs Section 284 ISA Caveat
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Many lawyers file a general civil caveat by mistake. But civil caveats under Section 148A of the CPC
                do not work for probate. Here is how Section 284 probate caveats differ:
              </p>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">
                        Procedural Dimension
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-slate-300">
                        Section 148A CPC (Civil Suits)
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-rose-200">
                        Section 284 ISA (Probate Caveat)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Governing Statute</td>
                      <td className="p-3.5">Code of Civil Procedure, 1908 (Section 148A)</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Indian Succession Act, 1925 (Section 284 &amp; Schedule V)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Subject Jurisdiction</td>
                      <td className="p-3.5">General civil suits and interim stay orders</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Probate and Letters of Administration petitions
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Statutory Lifespan</td>
                      <td className="p-3.5 text-rose-700 font-bold">
                        Strictly 90 Days from filing (Section 148A(5))
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Stays active under court rules until notice or renewal
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Post-Notice Obligation</td>
                      <td className="p-3.5">Party appears only to oppose interim stay</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Must file sworn affidavit within 8 days (Bombay) or 14 days (Delhi)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Procedural Impact</td>
                      <td className="p-3.5">Does not change the nature of the lawsuit</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Converts petition into a full contested suit under Section 295
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Standing Threshold</td>
                      <td className="p-3.5">Any party expecting a court order against them</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Must have a direct legal interest in the deceased estate
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: STATUTORY SCHEDULE V CAVEAT FORMAT */}
            <section id="schedule-v-caveat-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Statutory Schedule V Probate Caveat Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use this legal format to lodge a caveat before a District Judge or High Court. Fill in your
                details in the brackets before filing.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Section 284 &amp; Schedule V Statutory Caveat Petition
                  </div>
                  <button
                    type="button"
                    onClick={copyCaveatToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedCaveat ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT OF [NAME OF STATE/CITY]
AT [LOCATION]
TESTAMENTARY AND INTESTATE JURISDICTION

CAVEAT PETITION NO. ________ OF 2026

IN THE MATTER OF:
Estate of Late [Full Legal Name of Deceased], deceased.

AND IN THE MATTER OF:
Section 284 read with Schedule V of the Indian Succession Act, 1925

[Full Name of Caveator]
Son/Daughter/Spouse of [Father's/Spouse's Name]
Residing at: [Complete Permanent Address]
... CAVEATOR / OPPONENT

VERSUS

[Full Name of Propounder / Suspected Applicant]
Son/Daughter of [Father's Name]
Residing at: [Complete Residential Address]
... PROPOUNDER / APPLICANT

CAVEAT UNDER SECTION 284 & SCHEDULE V OF THE INDIAN SUCCESSION ACT, 1925

TO,
THE HON'BLE DISTRICT JUDGE / REGISTRAR (TESTAMENTARY)
AND THE DISTRICT DELEGATE:

Let nothing be done in the matter of the estate of the late [Full Name of Deceased], late of [Permanent Residence of Deceased], deceased, who departed this life on the [Day] day of [Month], [Year] at [Place of Death], without notice to [Full Name of Caveator], residing at [Complete Residential Address of Caveator], who is the lawful [Son / Daughter / Spouse / Class I Legal Heir] of the said deceased and holds a bona fide, vital caveatable interest in the estate of the deceased.

Dated this _______ day of _____________, 2026.

ADVOCATE FOR CAVEATOR                                CAVEATOR
[Advocate Name, Enrolment No.]                       [Signature of Caveator]
[Chamber Address & Email]`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: AFFIDAVIT IN SUPPORT OF CAVEAT FORMAT */}
            <section id="affidavit-in-support-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Affidavit in Support of Caveat Legal Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This affidavit is your main defense against a disputed Will. You must file it within 8 days in
                Bombay or 14 days in Delhi and Calcutta after getting court notice.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Sworn Affidavit in Support of Caveat (Disputing Will)
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT OF [NAME OF STATE/CITY]
AT [LOCATION]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY PETITION / SUIT NO. ________ OF 2026

IN THE MATTER OF:
Petition for Probate / Letters of Administration of the Alleged Will dated [Date of Disputed Will] of Late [Full Name of Deceased].

[Full Name of Propounder]                               ... PETITIONER / PLAINTIFF
VERSUS
[Full Name of Caveator]                                 ... CAVEATOR / DEFENDANT

AFFIDAVIT IN SUPPORT OF CAVEAT
(Filed pursuant to Section 284 ISA read with High Court Testamentary Rules)

I, [Full Name of Caveator], aged about [Age] years, son/daughter/spouse of [Name], residing at [Complete Residential Address], do hereby solemnly affirm and state on oath as follows:

1. That I am the Caveator in the above proceeding and the lawful [relationship, e.g., son / daughter / surviving spouse] of the deceased Late [Full Name of Deceased], who died on [Date of Death]. As a Class I legal heir under Section 8 of the Hindu Succession Act, 1956, I have a direct, substantial caveatable interest in the deceased's estate.

2. That the Petitioner has filed the present petition seeking Probate of an alleged writing dated [Date of Disputed Will] purporting to be the Last Will and Testament of the deceased.

3. That I dispute and challenge the genuineness, validity, and due execution of the alleged Will on the following substantive grounds:
   (a) SUSPICIOUS CIRCUMSTANCES: The alleged Will excludes natural legal heirs without plausible explanation and was drafted under active participation of the sole propounder-beneficiary.
   (b) LACK OF TESTAMENTARY CAPACITY: At the time of alleged execution, the deceased was suffering from severe cognitive illness and was medically unfit to understand the nature or consequences of the disposition.
   (c) UNDUE INFLUENCE AND COERCION: The deceased was kept in total isolation and the document was procured under duress, coercion, and misrepresentation.
   (d) DEFECTIVE ATTESTATION: The alleged Will was not executed or attested in accordance with the mandatory statutory requirements of Section 63 of the Indian Succession Act, 1925.

4. That in view of the aforesaid contentious disputes, the present petition cannot be adjudicated summary-wise and must be registered and tried as a Contentious Testamentary Suit under Section 295 of the Indian Succession Act, 1925.

VERIFICATION:
Verified at [Location] on this [Day] day of [Month], 2026, that the contents of paragraphs 1 to 4 of this Affidavit are true and correct to my knowledge and legal advice received, and no part thereof is false.

DEPONENT`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: CAVEATABLE INTEREST PRECEDENTS */}
            <section id="caveatable-interest-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Establishing Caveatable Interest Precedents
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  You cannot contest a Will just because you are angry. You must prove a real legal interest in the
                  estate. The Supreme Court of India set these clear rules:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. Elizabeth Antony v. Michel Charles John Chown Lengro (1990) 3 SCC 333
                    </div>
                    <p className="text-xs text-slate-600">
                      You must show that you would inherit property if the Will is set aside. Direct legal heirs always
                      have this right.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. Krishna Kumar Birla v. Rajendra Singh Lodha (2008) 4 SCC 300
                    </div>
                    <p className="text-xs text-slate-600">
                      A probate court only tests if the Will is valid. It cannot decide who owns the property. You
                      cannot fight property title in probate court.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. Jagjit Singh v. Pamela Manmohan Singh (2010) 5 SCC 157
                    </div>
                    <p className="text-xs text-slate-600">
                      Natural heirs entitled to inherit under family law have an automatic right to file a caveat. The
                      applicant cannot dismiss their objections without a full trial.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: HIGH COURT TESTAMENTARY RULES */}
            <section id="high-court-testamentary-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>STATE JURISDICTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. High Court Rules: Bombay, Calcutta &amp; Delhi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Bombay High Court */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Bombay High Court</span>
                    <span className="text-[10px] text-rose-600 font-bold">Rule 397-402</span>
                  </div>
                  <p className="text-slate-600">
                    You file a caveat in Form 113. Once you get court citation, you have just 8 days to file your sworn
                    affidavit under Rule 402. Missing this date cancels your caveat.
                  </p>
                </div>

                {/* Calcutta High Court */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Calcutta High Court</span>
                    <span className="text-[10px] text-rose-600 font-bold">Chapter XXXV</span>
                  </div>
                  <p className="text-slate-600">
                    You file your caveat in the court office. You have 14 days to file your supporting affidavit. The
                    case then becomes a full suit before a judge.
                  </p>
                </div>

                {/* Delhi High Court */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Delhi High Court</span>
                    <span className="text-[10px] text-rose-600 font-bold">Chapter XXIX</span>
                  </div>
                  <p className="text-slate-600">
                    You file under Section 284 and Delhi High Court rules. You must file your reply and affidavit within
                    14 days of getting court notice.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: CONTENTIOUS SUIT CONVERSION */}
            <section id="contentious-suit-conversion" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LITIGATION TRANSFORMATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 295 ISA: Conversion to Regular Suit
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Once you file your supporting affidavit, the case changes completely. Under Section 295 of the Act,
                  it stops being a simple request. It turns into a regular civil lawsuit.
                </p>
                <p>
                  The person claiming under the Will becomes the Plaintiff. You become the Defendant. The court must
                  hold a full trial with witness cross-examination.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">Plaintiff Duties</div>
                    <p className="text-slate-600">
                      The Plaintiff must bring at least one attesting witness to court. The witness must prove that the
                      testator signed the Will in sound mind.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">Caveator Rights</div>
                    <p className="text-slate-600">
                      You get the legal right to question witnesses. You can ask for handwriting checks and show that
                      the Will was forged or forced.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-caveat-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL LITIGATION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Lodging a Probate Caveat
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Find the Right Court</div>
                      <p className="text-slate-600 mt-0.5">
                        Check where the deceased lived. File in the High Court or the local District Court.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Draft the Caveat</div>
                      <p className="text-slate-600 mt-0.5">
                        Fill out the Schedule V form. State your relationship and current home address.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Lodge with Registry</div>
                      <p className="text-slate-600 mt-0.5">
                        File the caveat with court fees and a signed advocate Vakalatnama. Get your official caveat number.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Send Court Intimation</div>
                      <p className="text-slate-600 mt-0.5">
                        Ensure the court office sends notice to lower delegates in the district.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Inspect the Will</div>
                      <p className="text-slate-600 mt-0.5">
                        When the applicant files for probate, demand an official copy of the Will and medical records.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">File Your Affidavit</div>
                      <p className="text-slate-600 mt-0.5">
                        Submit your sworn affidavit within 8 or 14 days. Detail why the Will is invalid.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON FATAL MISTAKES */}
            <section id="common-caveat-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>PREVENT PROCEDURAL FORFEITURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Fatal Mistakes When Opposing Probate
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Missing the 8 or 14-Day Limit</span>
                  </div>
                  <p className="text-slate-600">
                    Missing the 8 or 14-Day Limit: If you file a caveat but miss the affidavit deadline, the judge will
                    dismiss your caveat.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Arguing Title Instead of the Will</span>
                  </div>
                  <p className="text-slate-600">
                    Arguing Title Instead of the Will: Never argue about property ownership in probate court. Focus on
                    proving the Will is fake or forced.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Using Section 148A of the CPC</span>
                  </div>
                  <p className="text-slate-600">
                    Using Section 148A of the CPC: A civil caveat expires in 90 days. Always use Section 284 of the
                    Indian Succession Act.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Skipping Land Office Objections</span>
                  </div>
                  <p className="text-slate-600">
                    Skipping Land Office Objections: A court caveat does not stop land mutation. Send written objections
                    to the local registrar as well.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS INTEGRATION */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>INTEGRATED TESTAMENTARY DIAGNOSTIC SUITE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Analyze Legal Validity, Heir Shares &amp; Tax Liabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Before launching a long court contest, check your baseline legal rights and family entitlements with our
                interactive legal tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/tools/probate-checker"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Probate Checker Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Heir Share Calculator</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Capital Gains Tax Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
              </div>
            </div>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Testamentary Litigation Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our senior advocates represent heirs across India.
                  We file urgent Section 284 caveats in the High Courts of Bombay, Calcutta, and Delhi. We also handle
                  full Will contest trials and forensic document checks.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/will-dispute-contest-litigation-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Will Contest Litigation Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Registration Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Legal Templates Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Probate Caveat
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
                13. Statutory Provisions &amp; High Court Rules
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Provisions of the Indian Succession Act, 1925:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 284:</strong> Lodging caveats against probate or letters of administration with
                      District Judge or District Delegate.
                    </li>
                    <li>
                      <strong>Section 285:</strong> Form of notice prescribed in Schedule V.
                    </li>
                    <li>
                      <strong>Schedule V:</strong> Statutory text and statutory language for lodging a testamentary caveat.
                    </li>
                    <li>
                      <strong>Section 288:</strong> Procedure when contention arises before a District Delegate.
                    </li>
                    <li>
                      <strong>Section 295:</strong> Mandatory transformation of contentious petitions into regular suits.
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
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Bombay High Court Testamentary Department</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Succession Guides &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/attesting-witness-affidavit-probate-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Attesting Witness Affidavit Format
                    </Link>
                    <Link
                      href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Pedigree Affidavit Format
                    </Link>
                    <Link
                      href="/templates/revocation-of-will-deed-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Revocation of Will Deed Format
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Disinheritance Exclusion Clause Format
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Agreement Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary law, High Court probate caveats, Section 295 contentious suits, and
                Will defense pan-India.
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
                  <span>PREVENT FUTURE PROBATE LITIGATION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Challenge-Proof Will for Your Family
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clear, registered Will protects your family. It prevents siblings from filing caveats or claiming
                  fraud.
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
                  <span>Doctor Certification &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Gavel className="w-3 h-3" />
                  <span>HIGH COURT LITIGATION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing a Secret or Forged Probate Application?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Facing a fake Will? Our team drafts urgent Section 284 caveats and files affidavits in High Courts and
                  District Courts across India.
                </p>
                <Link
                  href="/services/will-dispute-contest-litigation-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult Will Contest Lawyer</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Filing Documents Required</span>
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
                    <span>Schedule V Caveat Petition</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Vakalatnama &amp; Welfare Stamp</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Testator Death Certificate copy</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Proof of Caveatable Relationship</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Affidavit in Support (8/14 Days)</span>
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
