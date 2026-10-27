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
  Building,
  UserCheck,
  Lock,
  Clock,
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
  FileText,
  Layers,
  ShieldAlert,
  Percent,
  Coins,
  Scroll,
  Cross,
  Users,
  HeartHandshake,
  CheckSquare,
  AlertCircle,
  FileQuestion,
  Church,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "legal-foundation", label: "1. Legal Foundation: Indian Succession Act" },
  { id: "witness-rules-section-67", label: "2. Section 67: Witness Disqualification" },
  { id: "marriage-revocation-section-69", label: "3. Section 69: Revocation on Marriage" },
  { id: "mary-roy-precedent", label: "4. Mary Roy: Gender Parity Precedent" },
  { id: "christian-will-template", label: "5. Free Christian Will Format Template" },
  { id: "essential-clauses", label: "6. Essential Clauses: Minors & Church Gifts" },
  { id: "interactive-calculator", label: "7. Testamentary & Witness Eligibility Tool" },
  { id: "succession-comparison-table", label: "8. Christian vs Hindu & Muslim Wills" },
  { id: "probate-and-registration", label: "9. Probate Rules & SRO Registration" },
  { id: "regional-exceptions", label: "10. Regional Nuances: Kerala, Goa & Metro Towns" },
  { id: "step-by-step-sop", label: "11. Step-by-Step SOP: Execution Protocol" },
  { id: "common-drafting-mistakes", label: "12. Common Drafting Mistakes to Avoid" },
  { id: "institutional-profile", label: "13. Legal Excellence: AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Statutory Citations & Landmark Case Law" },
];

const FAQS = [
  {
    q: "Which law governs Wills made by Christians in India?",
    a: "Wills executed by Indian Christians are governed by Part VI (Testamentary Succession, Sections 57 to 191) of the Indian Succession Act, 1925. Unlike Hindus, Buddhists, Jains, and Sikhs who are exempted from certain sections under Schedule III, Indian Christians are fully bound by Part VI, including Section 67 (witness disqualification) and Section 69 (revocation by marriage).",
  },
  {
    q: "What is Section 67 of the Indian Succession Act and why is it critical?",
    a: "Under Section 67, any bequest, legacy, or gift made to an attesting witness, or to the spouse of an attesting witness, is strictly void. While the Will itself remains valid, the beneficiary witness or their spouse cannot legally inherit anything under that Will. Because Hindus are exempt from Section 67 but Christians are strictly governed by it, a Christian testator must never use a family beneficiary or their spouse as an attesting witness.",
  },
  {
    q: "Does getting married automatically revoke an existing Christian Will?",
    a: "Yes. Under Section 69 of the Indian Succession Act, 1925, every Will made by a Christian is automatically revoked upon their subsequent marriage. If you wrote a Will before getting married, that document becomes null and void the moment your marriage is solemnized. If you pass away without making a new Will post-marriage, your entire estate is distributed according to intestate succession under Part V (Sections 31-49).",
  },
  {
    q: "What did the Supreme Court establish in Mary Roy v. State of Kerala?",
    a: "In the historic 1986 Supreme Court judgment of Mary Roy v. State of Kerala (1986 AIR 1011), the bench struck down the Travancore Christian Succession Act, 1916 and Cochin Christian Succession Act, 1921. The Court held that the Indian Succession Act, 1925 applies uniformly across Kerala, giving Christian daughters equal intestate inheritance rights identical to sons, ending decades of gender discrimination.",
  },
  {
    q: "Can a Christian in India bequeath 100% of their property to anyone?",
    a: "Yes. An adult Indian Christian of sound mind has absolute testamentary freedom over all self-acquired and inherited property. Unlike Muslim personal law which limits bequests to one-third, a Christian can bequeath 100% of their property to any person, trust, or institution. The sole exception is in Goa, where the Portuguese Civil Code disposable quota system applies.",
  },
  {
    q: "Can an Indian Christian leave property to a church or charity in a Will?",
    a: "Yes, completely without restrictions. Section 118 of the Indian Succession Act, 1925 originally imposed a 12-month waiting period on bequests to religious or charitable causes. However, in John Vallamattom v. Union of India (2003) 6 SCC 611, the Supreme Court struck down Section 118 as unconstitutional and violative of Article 14. Today, Christians can freely bequeath assets to churches, dioceses, or charities without any waiting period.",
  },
  {
    q: "Is probate compulsory for a Christian Will in India?",
    a: "Following the Indian Succession (Amendment) Act, 2002 (Act 26 of 2002), probate is generally not mandatory for Christian Wills executed outside the historic Presidency Towns (Mumbai, Kolkata, Chennai). However, in high-value estates or when transferring registered real estate with cooperative housing societies or financial institutions, obtaining probate from a District Court or High Court provides the strongest legal protection against title disputes.",
  },
  {
    q: "Does a Christian Will require stamp paper or registration?",
    a: "No stamp paper is required under Indian law. A Christian Will can be executed on plain white A4 paper with zero stamp duty. Registration under Section 18(e) of the Registration Act, 1908 is voluntary. However, registering before the Sub-Registrar provides strong evidential proof of execution and mental soundness.",
  },
  {
    q: "Who can act as an executor for a Christian Will?",
    a: "Any adult of sound mind can be appointed as an executor. You may appoint a trusted family member, close friend, advocate, or chartered accountant. Unlike an attesting witness, an executor CAN also be a named beneficiary under Section 68 of the Indian Succession Act, provided they do not sign as an attesting witness.",
  },
  {
    q: "How does the Goa Civil Code affect Christian Wills in Goa?",
    a: "In Goa, Christians are governed by the Portuguese Civil Code of 1867 under the communion of assets regime. Spouses co-own 50% of marital assets. A testator can only dispose of their disposable quota (Legitima or 'quota disponível', typically 50%), while the remaining half is reserved for forced heirs such as children.",
  },
];

export default function ChristianWillClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"full" | "witness" | "marriage" | "charity" | "attestation">("full");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Diagnostic Tool State
  const [maritalStatus, setMaritalStatus] = useState<"unmarried" | "married" | "widowed">("married");
  const [willTiming, setWillTiming] = useState<"pre_marriage" | "post_marriage">("post_marriage");
  const [witnessType, setWitnessType] = useState<"independent" | "beneficiary_family">("independent");
  const [bequestToWitnessSpouse, setBequestToWitnessSpouse] = useState<boolean>(false);
  const [propertyLocation, setPropertyLocation] = useState<"general" | "presidency" | "goa">("general");
  const [hasChurchBequest, setHasChurchBequest] = useState<boolean>(false);

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

    const elements = document.querySelectorAll(".scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 3000);
  };

  // Diagnostic calculations
  const isSection67Violated = witnessType === "beneficiary_family" || bequestToWitnessSpouse;
  const isSection69Revoked = maritalStatus === "married" && willTiming === "pre_marriage";
  const isGoaReservedShareApplicable = propertyLocation === "goa";
  const isPresidencyProbateRecommended = propertyLocation === "presidency";

  let diagnosticStatus: "VALID" | "DEFECTIVE" | "REVOKED" = "VALID";
  if (isSection69Revoked) {
    diagnosticStatus = "REVOKED";
  } else if (isSection67Violated) {
    diagnosticStatus = "DEFECTIVE";
  }

  // Template Strings
  const fullTemplateText = `LAST WILL AND TESTAMENT OF [TESTATOR FULL LEGAL NAME]
UNDER THE INDIAN SUCCESSION ACT, 1925 (PART VI)

I, [Full Legal Name of Testator], son/daughter/spouse of [Father's/Spouse's Name], aged about [Age] years, residing at [Complete Residential Address], holding Aadhaar No. [XXXX-XXXX-XXXX] and PAN [XXXXXXXXXX], an Indian Christian by faith, do hereby execute, publish, and declare this as my LAST WILL AND TESTAMENT on this [Day] day of [Month], [Year] at [City, State].

1. DECLARATION OF SOUND MIND AND FREE WILL:
I declare that I am of sound, disposing state of mind, memory, and understanding. I execute this Will voluntarily, free from any coercion, duress, undue influence, fraud, or misrepresentation from any person whomsoever.

2. REVOCATION OF PRIOR WILLS (AND MARRIAGE COMPLIANCE):
I hereby revoke and cancel all previous Wills, Codicils, or testamentary dispositions made by me at any time prior to this date. 
[Note: This Will is executed subsequent to my marriage on (Date of Marriage) with (Spouse Name) in strict compliance with Section 69 of the Indian Succession Act, 1925, which automatically revokes any pre-marriage testamentary instruments.]

3. APPOINTMENT OF EXECUTOR:
I hereby nominate, constitute, and appoint [Full Name of Executor], son/daughter of [Father's Name], residing at [Address], to be the sole Executor of this my Last Will and Testament. 
If the said Executor predeceases me or is unable or unwilling to act, I appoint [Alternate Executor Name], residing at [Alternate Address], as the alternate Executor.
My Executor shall pay all my just debts, funeral expenses, medical bills, and testamentary administration costs out of my estate as soon as practicable.

4. DETAILS OF FAMILY AND LEGAL HEIRS:
My immediate family comprises:
- Spouse: [Full Name of Spouse], aged [Age]
- Son: [Full Name of Son], aged [Age]
- Daughter: [Full Name of Daughter], aged [Age]
[Under the Supreme Court ruling in Mary Roy v. State of Kerala, male and female children enjoy equal legal recognition in succession.]

5. SCHEDULE OF ASSETS AND SPECIFIC BEQUESTS:
I am the sole, absolute, and undisputed owner of the following self-acquired and absolute movable and immovable properties:

A. IMMOVABLE PROPERTIES:
- Residential Property: All that piece and parcel of residential flat/house bearing No. [Flat/House No.], situated at [Detailed Address], measuring [Area] sq. ft., purchased vide Registered Sale Deed No. [Doc No.] dated [Date] at the Office of the Sub-Registrar, [SRO Location].
  BEQUEST: I bequeath the absolute, unencumbered ownership of this property to my [Spouse/Son/Daughter - Name].

B. MOVABLE PROPERTIES, BANK ACCOUNTS & INVESTMENTS:
- Savings Bank Account No. [Acc No.] with [Bank Name], [Branch], IFSC [IFSC Code].
- Fixed Deposit Receipts bearing Nos. [FD Numbers] with [Bank Name].
- Demat Account No. [Demat ID] with [Depository Participant Name].
  BEQUEST: All balances, proceeds, and securities standing to the credit of these accounts are bequeathed absolutely to [Name of Legatee].

C. BEQUEST TO RELIGIOUS / CHARITABLE INSTITUTIONS (IF APPLICABLE):
I bequeath a sum of Rs. [Amount in INR]/- to [Church / Parish / Charitable Trust Name], situated at [Address], registered under [Trust Registration / Section 12A], for charitable and community development purposes. (In accordance with the Supreme Court judgment in John Vallamattom v. Union of India striking down Section 118 restrictions).

6. RESIDUARY CLAUSE:
All the rest, residue, and remainder of my estate, both movable and immovable, whatsoever and wheresoever situated, not specifically bequeathed herein, shall vest absolutely in my [Spouse / Children - Name] in equal shares.

7. STATUTORY WITNESS SAFEGUARD (SECTION 67 ISA, 1925):
In strict observance of Section 67 of the Indian Succession Act, 1925, I confirm that neither of the attesting witnesses named below, nor the husband or wife of either attesting witness, is a beneficiary or legatee under this Will.

IN WITNESS WHEREOF, I, the Testator, have signed and subscribed my name to this my Last Will and Testament on this [Day] day of [Month], [Year] at [Location] in the presence of the witnesses named hereunder.

_______________________________________
TESTATOR SIGNATURE / THUMB IMPRESSION
[Full Name of Testator]

ATTESTATION CLAUSE BY TWO INDEPENDENT WITNESSES (SECTION 63 & SECTION 67 COMPLIANCE):
Signed, published, and declared by the above-named Testator, [Testator Name], as and for their Last Will and Testament, in the presence of us, who at their request, in their presence, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses. We certify that neither of us, nor our respective spouses, holds any beneficial interest or legacy under this instrument.

WITNESS 1 (Independent Third Party):
Signature: ___________________________
Full Name: [Witness 1 Legal Name]
S/o or D/o: [Father's Name]
Address: [Full Residential Address]
Aadhaar / ID: [XXXX-XXXX-XXXX]
Occupation: [Profession / Service]

WITNESS 2 (Independent Third Party):
Signature: ___________________________
Full Name: [Witness 2 Legal Name]
S/o or D/o: [Father's Name]
Address: [Full Residential Address]
Aadhaar / ID: [XXXX-XXXX-XXXX]
Occupation: [Profession / Service]

MEDICAL FITNESS CERTIFICATE OF TESTATOR:
I, Dr. [Doctor's Name], MBBS/MD, Regn. No. [Medical Council No.], practicing at [Clinic/Hospital Address], do hereby certify that I have examined [Testator Name] today on [Date] at [Time]. I certify that the Testator is physically and mentally sound, possesses full cognitive faculties, and has testamentary capacity to execute this Last Will and Testament.
Doctor Signature & Stamp: ___________________________`;

  const witnessSafeguardClauseText = `STATUTORY WITNESS SAFEGUARD CLAUSE (SECTION 67 INDIAN SUCCESSION ACT, 1925):
"I, the Testator, explicitly record that this Will is attested by two independent individuals who have zero personal, financial, or testamentary interest in any of the assets described herein. 
In strict compliance with Section 67 of the Indian Succession Act, 1925 (which invalidates any bequest or legacy made to an attesting witness, or to the spouse of an attesting witness), I hereby confirm that:
1. Neither Witness 1 nor Witness 2 is named as an heir, legatee, or beneficiary under this Will.
2. The husband or wife of neither Witness 1 nor Witness 2 is named as an heir, legatee, or beneficiary under this Will.
3. Neither Witness 1 nor Witness 2, nor their respective spouses, shall claim any beneficial right, title, or interest under this instrument, ensuring the unquestionable validity of all bequests declared herein."`;

  const marriageRevocationClauseText = `POST-MARRIAGE RE-AFFIRMATION & SECTION 69 COMPLIANCE RECITAL:
"AND WHEREAS the Testator was married to [Spouse Full Legal Name] on [Date of Marriage] according to Christian rites / under the Special Marriage Act, 1954 at [Location].
AND WHEREAS under Section 69 of the Indian Succession Act, 1925, any prior Will executed by the Testator prior to their marriage stands automatically and wholly revoked by operation of law upon said marriage.
NOW THEREFORE, the Testator executes this fresh Last Will and Testament in full awareness of Section 69, declaring that this instrument supersedes, revokes, and replaces all prior instruments, embodying the Testator's clear testamentary intent post-marriage."`;

  const charityBequestClauseText = `CHURCH & CHARITABLE TRUST BEQUEST CLAUSE (JOHN VALLAMATTOM COMPLIANT):
"I hereby bequeath a sum of Rs. [Amount in INR]/- (or my immovable property detailed in Schedule C) to [Name of Parish Church / Diocese / Christian Charitable Trust / Society], registered under the Societies Registration Act, 1860 / Indian Trusts Act, 1882, situated at [Full Address].
The said bequest shall be utilized by the governing body or parish council exclusively for [educational scholarships / orphanage upkeep / medical relief / church maintenance].
The receipt issued by the Parish Priest, Bishop, or authorized Trustee shall be a full and sufficient discharge to my Executor. 
(Note: As held by the Hon'ble Supreme Court of India in John Vallamattom v. Union of India (2003) 6 SCC 611, striking down Section 118 of the Indian Succession Act, 1925, this charitable bequest requires no 12-month pre-death execution period or statutory registration to take absolute legal effect.)"`;

  const attestationClauseText = `STATUTORY ATTESTATION CLAUSE (SECTION 63 OF THE INDIAN SUCCESSION ACT, 1925):
"Signed, acknowledged, and published by the Testator, [Testator Full Name], in our presence, all being present at the same time, as and for their Last Will and Testament. We, the undersigned attesting witnesses, at the Testator's personal request, in their presence and sight, and in the presence of each other, have hereunto subscribed our names as witnesses on this [Date] at [Place].
Each of us hereby affirms that we are competent adults, of sound mind, and that neither of us, nor our respective spouses, holds any beneficial interest or legacy whatsoever in the estate of the Testator under Section 67 of the Indian Succession Act, 1925."`;

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#172228] text-white py-12 md:py-16 border-b border-[#172228]/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C65378_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-white/70 mb-5 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <span>/</span>
            <span className="text-[#C65378] font-bold">Christian Will Format India</span>
          </nav>

          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-rose-200 mb-5">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 63, 67 &amp; 69 COMPLIANT</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Christian Will Format in India: Plain Paper Legal Guide
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a verified, plain paper Christian Will template under Part VI of the Indian
            Succession Act, 1925. Master the <strong>Section 67 witness disqualification rule</strong>,{" "}
            <strong>Section 69 automatic revocation upon marriage</strong>, and landmark Supreme Court
            precedents including <em>Mary Roy</em> and <em>John Vallamattom</em>.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Draft Challenge-Proof Will</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#christian-will-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Scroll className="w-4 h-4 text-[#C65378]" />
              <span>Free Christian Will Template</span>
            </a>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 67</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WITNESS BEQUEST VOID RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 69</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                AUTO-REVOCATION ON MARRIAGE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Mary Roy</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                1986 SC GENDER EQUALITY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Free</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TESTAMENTARY FREEDOM
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
                Governed under Part VI (Testamentary Succession) and Part V (Intestate Succession) of the
                Indian Succession Act, 1925, read with Supreme Court landmark rulings in Mary Roy (1986)
                and John Vallamattom (2003).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: CHRISTIAN WILL RULES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Testamentary Freedom:</strong> Indian Christians possess absolute
                    authority to bequeath 100% of their self-acquired and absolute assets to any person
                    or institution. There are no forced shares or one-third limitations (unlike Muslim
                    personal law).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 67 Witness Void Trap:</strong> Any bequest to an attesting witness or
                    their spouse is 100% void under Section 67. Family beneficiaries must never sign as
                    attesting witnesses on a Christian Will.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 69 Automatic Revocation:</strong> Marriage automatically revokes an
                    unmarried Christian&apos;s prior Will by operation of law. A fresh Will must be
                    drafted after marriage.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mary Roy Gender Equality:</strong> Christian daughters hold equal succession
                    rights identical to sons across India, following the Supreme Court&apos;s invalidation
                    of discriminatory Travancore/Cochin enactments.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="legal-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Indian Succession Act for Christians
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Succession and testamentary dispositions for Indian Christians are governed exclusively
                  by the <strong>Indian Succession Act, 1925</strong>. Unlike Hindus, Buddhists, Jains,
                  and Sikhs who are regulated under personal statutes read with modified schedules, Indian
                  Christians fall squarely under the uniform provisions of Part VI (Testamentary
                  Succession, Sections 57 to 191) and Part V (Intestate Succession, Sections 31 to 49).
                </p>
                <p>
                  Under Section 59 of the Act, every person of sound mind who is not a minor may dispose of
                  their property by Will. Indian Christians enjoy unrestricted testamentary power over all
                  self-acquired real estate, ancestral shares partitioned into absolute ownership, bank
                  deposits, mutual funds, and family heirlooms. There is no religious tax, compulsory
                  community consent, or forced family share under Christian law in India.
                </p>
                <p>
                  Execution formalities are governed by <strong>Section 63</strong> of the Act. The
                  testator must sign or affix their mark to the Will, or have it signed by another person
                  in their presence and by their direction. Crucially, the Will must be attested by{" "}
                  <strong>at least two competent witnesses</strong>, each of whom must have seen the
                  testator sign or received personal acknowledgement, and each witness must sign in the
                  testator&apos;s physical presence.
                </p>
              </div>
            </section>

            {/* VISUAL FEATURE ASSET: CHRISTIAN TESTAMENT BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL ASSET: CHRISTIAN WILL EXECUTION BLUEPRINT</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/christian-will-format-india-og.jpg"
                  alt="Christian Will Format in India Legal Testament Guide and Indian Succession Act Template"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <div className="pt-2 px-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Verified Legal Asset: Christian Testamentary Template
                </span>
                <span className="text-slate-500 text-[11px]">
                  Governed by Indian Succession Act, 1925 ss. 63, 67 &amp; 69
                </span>
              </div>
            </div>

            {/* SECTION 2: SECTION 67 WITNESS RULES */}
            <section id="witness-rules-section-67" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>COMPETITOR BLIND SPOT #1: SECTION 67</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Section 67 Witness Rule: Disqualification of Beneficiaries
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The single most dangerous error in Indian Christian Will drafting is allowing a child,
                  spouse, or relative who receives property in the Will to sign as an attesting witness.
                  Under <strong>Section 67 of the Indian Succession Act, 1925</strong>:
                </p>
                <blockquote className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs sm:text-sm font-medium italic">
                  &ldquo;A Will shall be treated as not duly executed as to any bequest given or made to
                  any person who attests the execution thereof, or to the wife or husband of such person,
                  or to any person claiming under either of them; but the bequest is void so far only as
                  concerns such person or any person claiming under him...&rdquo;
                </blockquote>
                <p>
                  <strong>Why does this surprise testators?</strong> Because under Section 57 read with
                  Schedule III of the Act, Hindus, Buddhists, Jains, and Sikhs are expressly exempted from
                  Section 67. Many online Will templates and generic forms are drafted based on Hindu
                  rules, where a witness can technically be a beneficiary.
                </p>
                <p>
                  For Indian Christians, Section 67 applies strictly and unconditionally. If a Christian
                  father writes a Will leaving his flat to his daughter, and that daughter (or her husband)
                  signs as one of the two attesting witnesses, <strong>the bequest to the daughter becomes
                  completely VOID</strong>. The Will remains valid, but the flat falls into the residuary
                  estate or intestate succession, entirely defeating the father&apos;s wishes!
                </p>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-slate-800 text-xs sm:text-sm space-y-2">
                  <div className="font-extrabold text-[#C65378] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>GOLDEN RULE FOR CHRISTIAN WILLS:</span>
                  </div>
                  <p>
                    Always select two completely independent witnesses who have zero financial interest
                    in your estate (such as neighbors, family doctors, chartered accountants, or professional
                    colleagues). Never let a beneficiary or a beneficiary&apos;s spouse sign as a witness.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: SECTION 69 MARRIAGE REVOCATION */}
            <section id="marriage-revocation-section-69" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT #2: SECTION 69</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 69 Revocation Rule: Automatic Nullity on Marriage
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Another statutory rule unique to Indian Christians and Parsis is{" "}
                  <strong>Section 69 of the Indian Succession Act, 1925</strong>:
                </p>
                <blockquote className="p-4 rounded-xl bg-rose-50 border-l-4 border-rose-500 text-rose-950 text-xs sm:text-sm font-medium italic">
                  &ldquo;Every Will shall be revoked by the marriage of the maker, except a Will made in
                  exercise of a power of appointment...&rdquo;
                </blockquote>
                <p>
                  Under Section 69, every Will made by a Christian is <strong>automatically and completely
                  revoked upon marriage</strong>. This statutory revocation happens by operation of law,
                  without requiring any written cancellation, tear, or registration entry.
                </p>
                <p>
                  Consider this common scenario: A young Christian professional in Bangalore or Mumbai
                  purchases an apartment at age 26 and executes a registered Will bequeathing it to their
                  parents or siblings. At age 30, they marry. Under Section 69, their earlier Will is{" "}
                  <strong>legally extinguished on the wedding day</strong>. If they tragically pass away
                  years later without executing a post-marriage Will, the earlier registered Will has zero
                  legal standing.
                </p>
                <p>
                  In such a situation, the estate does not pass according to the bachelor Will. Instead,
                  it falls into statutory intestate succession under Sections 31 to 49 of the Act, where
                  the surviving spouse is legally entitled to one-third or one-half of the entire property!
                </p>
              </div>
            </section>

            {/* SECTION 4: MARY ROY PRECEDENT */}
            <section id="mary-roy-precedent" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK SUPREME COURT RULING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Mary Roy Ruling: Equal Inheritance for Christian Daughters
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Prior to 1986, Christian succession in parts of southern India was governed by regional
                  statutes such as the Travancore Christian Succession Act, 1916 and the Cochin Christian
                  Succession Act, 1921. Under Section 28 of the Travancore Act, a daughter was entitled
                  to only one-third of the share of a son or a mere ₹5,000, whichever was lower, and had
                  no right to parental property if stridhan (dowry) was paid.
                </p>
                <p>
                  In the landmark case of <strong>Mary Roy &amp; Ors v. State of Kerala &amp; Ors (1986 AIR
                  1011)</strong>, educator and activist Mary Roy (mother of author Arundhati Roy) challenged
                  this injustice before the Supreme Court. The Constitution Bench held that with the
                  commencement of the Part B States (Laws) Act, 1951, the Travancore and Cochin Acts were
                  repealed retrospectively from 1951, and Chapter II of Part V of the Indian Succession Act,
                  1925 became the governing law for Christians across Kerala.
                </p>
                <p>
                  The impact of Mary Roy was monumental:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Christian daughters hold 100% equal inheritance rights to sons in intestate succession.</li>
                  <li>A Christian mother/widow holds full absolute rights, not merely a life interest.</li>
                  <li>
                    Testators are legally encouraged to draft explicit Wills to ensure properties pass
                    peacefully without invoking family partition suits.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: FREE CHRISTIAN WILL TEMPLATE */}
            <section id="christian-will-template" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL ASSET</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Free Christian Will Format Template: Plain Paper Draft
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use the interactive tabs below to review and copy our lawyer-vetted Christian Will
                formats, complete with mandatory Section 67 witness disqualification safeguards and
                Section 69 marriage revocation recitals.
              </p>

              {/* Template Tabs Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("full")}
                    className={`py-2 px-3.5 rounded-xl transition-all ${
                      activeTab === "full"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Full Christian Will Format
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("witness")}
                    className={`py-2 px-3.5 rounded-xl transition-all ${
                      activeTab === "witness"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Section 67 Witness Clause
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("marriage")}
                    className={`py-2 px-3.5 rounded-xl transition-all ${
                      activeTab === "marriage"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Section 69 Marriage Recital
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("charity")}
                    className={`py-2 px-3.5 rounded-xl transition-all ${
                      activeTab === "charity"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Church / Charity Bequest
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("attestation")}
                    className={`py-2 px-3.5 rounded-xl transition-all ${
                      activeTab === "attestation"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Attestation &amp; Doctor Sign
                  </button>
                </div>

                {/* Tab Content Area */}
                <div className="p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {activeTab === "full" && "Complete Plain Paper Christian Testament Draft"}
                      {activeTab === "witness" && "Mandatory Section 67 Beneficiary Disqualification"}
                      {activeTab === "marriage" && "Mandatory Section 69 Post-Marriage Recital"}
                      {activeTab === "charity" && "Church & Charitable Bequest Clause"}
                      {activeTab === "attestation" && "Two Independent Witnesses & Medical Sign-Off"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        let text = fullTemplateText;
                        if (activeTab === "witness") text = witnessSafeguardClauseText;
                        if (activeTab === "marriage") text = marriageRevocationClauseText;
                        if (activeTab === "charity") text = charityBequestClauseText;
                        if (activeTab === "attestation") text = attestationClauseText;
                        copyToClipboard(text, activeTab);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      {copiedState === activeTab ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-slate-200/90 overflow-x-auto max-h-[500px] whitespace-pre-wrap select-all">
                      {activeTab === "full" && fullTemplateText}
                      {activeTab === "witness" && witnessSafeguardClauseText}
                      {activeTab === "marriage" && marriageRevocationClauseText}
                      {activeTab === "charity" && charityBequestClauseText}
                      {activeTab === "attestation" && attestationClauseText}
                    </pre>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                    <span>
                      Tip: Print on standard white A4 paper. No non-judicial stamp paper required.
                    </span>
                    <button
                      onClick={handleStartDraft}
                      className="text-[#C65378] font-extrabold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Customise this template in our 15-minute wizard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: ESSENTIAL CLAUSES */}
            <section id="essential-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>ESSENTIAL WILL CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Essential Clauses: Residuary Assets, Minors &amp; Church Gifts
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A robust Christian Will must contain specific safeguard clauses to prevent future
                  litigation among legal heirs, parish bodies, or banking institutions:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Church className="w-4 h-4 text-[#C65378]" />
                      <span>Church &amp; Charitable Bequests (Sec 118 Overruled)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Historically, Section 118 required Christian wills donating to charity to be made 12
                      months before death. The Supreme Court in <em>John Vallamattom (2003)</em> declared
                      this unconstitutional. Christians can now bequeath land or cash to churches, dioceses,
                      orphanages, or charities without any waiting period.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <UserCheck className="w-4 h-4 text-[#5F7E75]" />
                      <span>Appointment of Testamentary Guardian</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 60 of the Indian Succession Act, Christian parents can appoint a
                      testamentary guardian for their minor children. This ensures minor assets and custody
                      pass directly to trusted guardians without requiring cumbersome guardianship petitions
                      under the Guardians and Wards Act, 1890.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>Residuary Estate Bequest Clause</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A residuary clause catches all assets acquired after writing the Will, forgotten bank
                      accounts, EPF funds, gratuity, and tax refunds. Without a clear residuary clause,
                      unlisted assets fall into partial intestacy, triggering court disputes among heirs.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Gavel className="w-4 h-4 text-[#5F7E75]" />
                      <span>Executor Powers &amp; Administration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 211, the executor is the legal representative of the deceased for all
                      purposes. An explicit clause granting your executor power to sell securities, collect
                      rents, pay debts, and represent before tax authorities facilitates smooth asset
                      transmission.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE TESTAMENTARY DIAGNOSTIC TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Christian Testamentary &amp; Witness Eligibility Diagnostic Tool
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Check whether your Will complies with Section 67 witness disqualification rules, Section
                69 marriage revocation laws, and regional probate requirements in 30 seconds.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Marital Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Marital Status of Testator
                    </label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-[#C65378]/20 focus:outline-none"
                    >
                      <option value="married">Currently Married</option>
                      <option value="unmarried">Single / Unmarried</option>
                      <option value="widowed">Widowed / Divorced</option>
                    </select>
                  </div>

                  {/* Timing of Will Execution */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Will Execution Timing
                    </label>
                    <select
                      value={willTiming}
                      onChange={(e) => setWillTiming(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-[#C65378]/20 focus:outline-none"
                    >
                      <option value="post_marriage">Executed After Marriage (or currently unmarried)</option>
                      <option value="pre_marriage">Executed Prior to Current Marriage</option>
                    </select>
                  </div>

                  {/* Witness Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Who Will Sign as Witnesses?
                    </label>
                    <select
                      value={witnessType}
                      onChange={(e) => setWitnessType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-[#C65378]/20 focus:outline-none"
                    >
                      <option value="independent">Two Independent Third Parties (Neighbors/Doctors)</option>
                      <option value="beneficiary_family">Child, Sibling, or Other Beneficiary</option>
                    </select>
                  </div>
                </div>

                {/* Additional Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Witness Spouse check */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Is a Witness&apos;s Spouse an Heir?
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBequestToWitnessSpouse(false)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          !bequestToWitnessSpouse
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        No (Clean)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBequestToWitnessSpouse(true)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          bequestToWitnessSpouse
                            ? "bg-rose-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        Yes (Risk)
                      </button>
                    </div>
                  </div>

                  {/* Property Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Primary Property Location
                    </label>
                    <select
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-[#C65378]/20 focus:outline-none"
                    >
                      <option value="general">Rest of India (Delhi, Bangalore, Kerala, etc.)</option>
                      <option value="presidency">Presidency Town (Mumbai, Kolkata, Chennai)</option>
                      <option value="goa">State of Goa (Portuguese Civil Code)</option>
                    </select>
                  </div>

                  {/* Church Bequest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Bequest to Church / Charity?
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setHasChurchBequest(false)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          !hasChurchBequest
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasChurchBequest(true)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                          hasChurchBequest
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Real-Time Compliance Audit Results */}
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200/90 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                      STATUTORY COMPLIANCE REPORT:
                    </div>
                    {diagnosticStatus === "VALID" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        100% STATUTORILY VALID
                      </span>
                    )}
                    {diagnosticStatus === "DEFECTIVE" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                        SECTION 67 BEQUEST VOID
                      </span>
                    )}
                    {diagnosticStatus === "REVOKED" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-black">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        REVOKED BY SECTION 69
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {isSection69Revoked && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900">
                        <strong>Critical Section 69 Violation:</strong> Because you executed this Will prior
                        to your marriage, it was automatically revoked on the day of your marriage. It holds
                        zero legal validity today. You must draft a fresh Will post-marriage.
                      </div>
                    )}

                    {isSection67Violated && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                        <strong>Section 67 Beneficiary Disqualification:</strong> You have selected an heir
                        or their spouse as an attesting witness. Under Section 67 of the Indian Succession Act,
                        any bequest to that person is void by law. Swap the witness for an independent neighbor
                        or doctor immediately.
                      </div>
                    )}

                    {isGoaReservedShareApplicable && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                        <strong>Goa Portuguese Civil Code Note:</strong> Because property is located in Goa,
                        the communion of assets applies. You can only bequeath your 50% disposable quota
                        (quota disponível); the remainder belongs to your spouse or forced heirs.
                      </div>
                    )}

                    {isPresidencyProbateRecommended && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                        <strong>Presidency Town Probate Recommendation:</strong> For immovable properties in
                        Mumbai, Kolkata, or Chennai, High Court probate procedures or letters of
                        administration provide the strongest proof of unencumbered title.
                      </div>
                    )}

                    {hasChurchBequest && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <strong>Church Bequest Fully Protected:</strong> Under the Supreme Court decision in{" "}
                        <em>John Vallamattom (2003)</em>, your church or charitable bequest is 100% legal
                        without requiring a 12-month waiting period or registration.
                      </div>
                    )}

                    {!isSection67Violated && !isSection69Revoked && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                        Your proposed execution framework complies with Sections 63, 67, and 69 of the Indian
                        Succession Act, 1925. Two independent witnesses and post-marriage execution will ensure
                        unshakeable legal standing.
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href="/tools/witness-eligibility-section-67-checker"
                      className="text-xs font-bold text-[#5F7E75] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Use Full Section 67 Witness Eligibility Checker Tool</span>
                    </Link>
                    <button
                      onClick={handleStartDraft}
                      className="px-5 py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a33b5c] transition-colors"
                    >
                      Draft Compliant Will Now
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="succession-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE STATUTORY ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Christian vs Hindu &amp; Muslim Wills
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To understand the unique legal status of Christian Wills in India, examine how the
                  governing statutory rules differ across major religious communities:
                </p>

                {/* Responsive Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                  <table className="w-full text-left text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-bold">
                        <th className="p-3.5 md:p-4 border-r border-slate-800">Legal Parameter</th>
                        <th className="p-3.5 md:p-4 border-r border-slate-800 text-rose-200">
                          Christian Will (ISA, 1925)
                        </th>
                        <th className="p-3.5 md:p-4 border-r border-slate-800">Hindu Will (HSA, 1956)</th>
                        <th className="p-3.5 md:p-4">Muslim Will (Shariat Act)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80">
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">Governing Statute</td>
                        <td className="p-3.5 md:p-4 text-[#C65378] font-bold">
                          Indian Succession Act, 1925 (Part VI)
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Indian Succession Act s. 57 &amp; Hindu Succession Act s. 30
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Muslim Personal Law (Shariat) Application Act, 1937
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">Testamentary Freedom</td>
                        <td className="p-3.5 md:p-4 text-emerald-700 font-bold">
                          100% of entire estate freely bequeathable
                        </td>
                        <td className="p-3.5 md:p-4 text-emerald-700 font-bold">
                          100% of self-acquired &amp; coparcenary share
                        </td>
                        <td className="p-3.5 md:p-4 text-amber-700 font-bold">
                          Strictly capped at 1/3rd of net estate (Al-Thuluth)
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">
                          Section 67 (Witness Bequest Void)
                        </td>
                        <td className="p-3.5 md:p-4 text-rose-700 font-bold">
                          STRICTLY APPLIES: Bequest to witness or spouse is VOID
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Exempted by Schedule III (witness can inherit)
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Witness rules governed by Islamic jurisprudence
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">
                          Section 69 (Revocation on Marriage)
                        </td>
                        <td className="p-3.5 md:p-4 text-rose-700 font-bold">
                          STRICTLY APPLIES: Marriage automatically revokes Will
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Exempted by Schedule III (marriage does not revoke)
                        </td>
                        <td className="p-3.5 md:p-4 text-slate-700">
                          Marriage does not automatically revoke prior Wasiyat
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">Religious / Charity Gifts</td>
                        <td className="p-3.5 md:p-4 text-emerald-700 font-bold">
                          100% free (Section 118 struck down in John Vallamattom)
                        </td>
                        <td className="p-3.5 md:p-4 text-emerald-700 font-bold">100% unrestricted</td>
                        <td className="p-3.5 md:p-4 text-slate-700">Subject to the 1/3rd estate cap</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">Daughters&apos; Rights</td>
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">
                          100% equal intestate rights (Mary Roy 1986 SC)
                        </td>
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">
                          Equal coparcener rights (Vineeta Sharma 2020 SC)
                        </td>
                        <td className="p-3.5 md:p-4 font-bold text-slate-900">
                          Half of male sibling&apos;s share under Quranic Faraid
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: PROBATE & REGISTRATION */}
            <section id="probate-and-registration" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>COURT PROCEDURES &amp; REGISTRATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Probate Rules: Section 213, High Courts &amp; Registration
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A frequent question among Christian families is whether they must obtain a Court Probate
                  to give legal effect to a deceased relative&apos;s Will.
                </p>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900">
                    The 2002 Amendment to Section 213 of the Indian Succession Act
                  </h3>
                  <p>
                    Originally, Section 213(1) of the Indian Succession Act made it mandatory for Christians
                    across India to obtain probate or letters of administration before asserting any right as
                    an executor or legatee in court. This imposed heavy court fee burdens on ordinary families.
                  </p>
                  <p>
                    By the <strong>Indian Succession (Amendment) Act, 2002 (Act 26 of 2002)</strong>,
                    Parliament amended Section 213(2), bringing parity between Indian Christians and Hindus.
                    Today, <strong>probate is not universally mandatory for Christian Wills</strong> executed
                    outside the historical Presidency Towns of Mumbai, Kolkata, and Chennai.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      <span>When is Probate Recommended?</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Immovable properties situated in Mumbai, Kolkata, or Chennai metro regions.</li>
                      <li>High-value commercial real estate where buyer title insurance requires court sanction.</li>
                      <li>Cooperative housing societies that insist on court orders before transmission.</li>
                      <li>When hostile legal heirs threaten to file partition suits alleging coercion.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-[#5F7E75]" />
                      <span>Voluntary SRO Registration</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Registration under Section 18(e) of the Registration Act, 1908 is voluntary. However,
                      registering your Will before the Sub-Registrar creates an unshakeable official record.
                      The Sub-Registrar captures photographs, biometric thumbprints, and verifies identity,
                      neutralizing allegations that the testator was an imposter.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-1">
                    <strong>Need help calculating probate court fees in your state?</strong>
                    <p className="text-xs text-emerald-800">
                      Use our interactive court fee calculator to estimate exact ad-valorem stamp fees across High Courts.
                    </p>
                  </div>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors whitespace-nowrap"
                  >
                    Probate Fee Calculator
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: REGIONAL SUCCESSION NUANCES */}
            <section id="regional-exceptions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>REGIONAL LEGAL JURISDICTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Regional Succession Nuances: Kerala, Goa &amp; Presidency Towns
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian Christian succession involves distinct regional variations across key states:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm text-[#C65378]">
                      Kerala: Post-Mary Roy Uniformity
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Following the Supreme Court&apos;s invalidation of the Travancore and Cochin Christian
                      Succession Acts in <em>Mary Roy (1986)</em>, Christian succession in Kerala follows
                      Part V (Intestate) and Part VI (Testamentary) of the Indian Succession Act, 1925.
                      Sons and daughters hold 100% equal rights. Bequests to local churches, dioceses, or
                      retreat centers take full effect without diocesan sanction or state impediment.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm text-[#5F7E75]">
                      Goa: Portuguese Civil Code of 1867 &amp; Disposable Quota
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In the State of Goa, the Indian Succession Act does not apply to Christians. Succession
                      is governed by the Portuguese Civil Code of 1867 under the uniform civil code framework.
                      Unless a prenuptial agreement provides otherwise, marriage operates under the communion
                      of assets (<em>comunhão de bens</em>), where each spouse owns an undivided 50% share in
                      all properties. A Goan Christian can only dispose of their <strong>disposable quota
                      (quota disponível)</strong>, while the &ldquo;legitime&rdquo; is legally reserved for
                      children (forced heirs).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm text-slate-800">
                      Presidency Towns (Mumbai, Kolkata, Chennai)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 57(a) and historical Letters Patent, immovable properties situated within
                      the original civil jurisdictions of the Bombay High Court, Calcutta High Court, and
                      Madras High Court often follow established testamentary traditions where banks, housing
                      societies, and municipal corporations strongly request probate or letters of
                      administration with the Will annexed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Step-by-Step SOP: Executing a Valid Christian Will
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this verified standard operating procedure to draft and execute a challenge-proof
                  Christian Will in India:
                </p>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Asset Inventory &amp; Schedule Preparation</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Compile a comprehensive schedule of all real estate, bank accounts, demat holdings,
                        insurance policies, and family gold. Clearly designate specific bequests to family
                        members and any planned gifts to churches or charitable trusts.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Post-Marriage Check (Section 69 Compliance)</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Verify that the Will is executed after marriage. If you married after writing an
                        earlier Will, discard that old document immediately and draft a fresh post-marriage
                        Will to satisfy Section 69.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Select Two Independent Witnesses (Section 67)</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Select two trusted, independent adults who have no beneficial interest in your
                        estate. Confirm that neither witness nor their spouse is an heir under the Will.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      4
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Medical Fitness Certification</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        For senior testators (aged 60+), have a registered medical practitioner (MBBS/MD)
                        examine the testator on the day of execution and sign the fitness certificate on the
                        Will itself. This defeats any future claim of lack of testamentary capacity.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      5
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Simultaneous Execution &amp; Attestation</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Print the Will on standard white A4 paper. The testator and both witnesses must be
                        present in the same room. The testator signs each page in the presence of both
                        witnesses. Both witnesses then sign the attestation clause in the testator&apos;s sight.
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      6
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">Optional Sub-Registrar Office Registration</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Book an appointment at the local Sub-Registrar Office having jurisdiction over your
                        residence. Present the original Will, testator and witness IDs, and medical
                        certificate to register the Will in Book III.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: COMMON DRAFTING MISTAKES */}
            <section id="common-drafting-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>RISK PREVENTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Common Drafting Mistakes &amp; Legal Risk Prevention
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Avoid these five critical pitfalls when executing a Christian Will in India:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>1. Making a Family Beneficiary an Attesting Witness</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>The Danger:</strong> Section 67 voids any bequest to an attesting witness or
                      their spouse. If your son signs as a witness, he loses the flat you bequeathed to him.
                      <br />
                      <strong>Solution:</strong> Only independent neighbors, colleagues, or professionals
                      must sign as witnesses.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>2. Relying on an Old Will Executed Before Marriage</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>The Danger:</strong> Section 69 automatically revokes any Will upon marriage.
                      A bachelor Will becomes completely void once you marry.
                      <br />
                      <strong>Solution:</strong> Always draft a fresh Will following marriage or remarriage.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>3. Forgetting a Comprehensive Residuary Clause</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>The Danger:</strong> If you only list specific properties, any assets acquired
                      after drafting the Will fall into intestate succession.
                      <br />
                      <strong>Solution:</strong> Insert a clear residuary clause granting all remaining assets
                      to your spouse or children in equal shares.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>4. Failing to Name an Alternate Executor</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>The Danger:</strong> If your primary executor predeceases you or declines to
                      act, the estate enters administration deadlock requiring court letters of administration.
                      <br />
                      <strong>Solution:</strong> Always appoint a primary executor and a designated alternate
                      executor.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="font-bold text-rose-950 text-sm flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>5. Assuming Non-Judicial Stamp Paper is Mandatory</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>The Danger:</strong> Buying costly stamp paper under the mistaken belief that
                      it adds validity. Indian law imposes zero stamp duty on Wills.
                      <br />
                      <strong>Solution:</strong> Execute on clean, plain white A4 paper. Validity stems from
                      sound mind, signature, and two independent witnesses, not stamp paper.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>EXPERT LEGAL BACKING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Excellence: AMA Legal Solutions Succession Team
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0">
                    AMA
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      AMA Legal Solutions • Succession Practice Group
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Advocate Anuj Anand Malik &amp; Senior Testamentary Counsel • High Court of Delhi &amp; Supreme Court of India
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                    <div className="text-xl font-black text-slate-900">10,000+</div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
                      WILLS DRAFTED &amp; REGISTERED
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                    <div className="text-xl font-black text-slate-900">100%</div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
                      INDIAN SUCCESSION ACT COMPLIANT
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-slate-200/80">
                    <div className="text-xl font-black text-slate-900">Pan-India</div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">
                      PROBATE &amp; SRO REGISTRATION
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our specialized succession team assists Christian families across Kerala, Goa, Mumbai,
                  Tamil Nadu, Bangalore, Delhi NCR, and the North-East in structuring clear, dispute-free
                  Wills. From multi-jurisdiction NRI property planning to High Court probate petitions and
                  church trust bequests, our advocates ensure ironclad legal compliance.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <span>Consult a Succession Advocate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold text-xs sm:text-sm hover:bg-[#a33b5c] transition-colors shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Start Online Self-Serve Will</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>QUESTIONS &amp; ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Christian Wills in India
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scroll className="w-4 h-4" />
                <span>LEGAL AUTHORITIES &amp; STATUTES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Citations, Landmark Case Law &amp; Official Acts
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3 text-xs text-slate-600 leading-relaxed">
                <ul className="space-y-2 list-disc pl-4">
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Part VI (Testamentary Succession,
                    Sections 57-191), Part V (Intestate Succession for Christians, Sections 31-49), Section 63
                    (Execution of Wills), Section 67 (Effect of gift to attesting witness), Section 68
                    (Witness not disqualified by being executor), Section 69 (Revocation by marriage), Section
                    118 (Bequests to religious uses), Section 213 (Probate requirement).
                  </li>
                  <li>
                    <strong>Mary Roy &amp; Ors v. State of Kerala &amp; Ors (1986 AIR 1011):</strong> Supreme
                    Court held Travancore Christian Succession Act, 1916 stood repealed from 1951, ensuring
                    Christian daughters hold equal inheritance rights with sons under Chapter II, Part V of the
                    Indian Succession Act.
                  </li>
                  <li>
                    <strong>John Vallamattom &amp; Anr v. Union of India (2003) 6 SCC 611:</strong> Three-judge
                    Supreme Court bench struck down Section 118 of the Indian Succession Act as unconstitutional
                    and violative of Article 14, removing the 12-month waiting period on Christian charitable bequests.
                  </li>
                  <li>
                    <strong>Indian Succession (Amendment) Act, 2002 (Act 26 of 2002):</strong> Parliament
                    amended Section 213(2), exempting Indian Christians from mandatory probate outside
                    historical Presidency Towns.
                  </li>
                  <li>
                    <strong>Registration Act, 1908:</strong> Section 18(e) (Optional registration of Wills
                    in Book III before the Sub-Registrar).
                  </li>
                </ul>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION SIDEBAR (NO MOBILE NUMBERS)
              ===================================================================== */}
          <aside className="sticky top-24 space-y-5">
            {/* CTA Box 1: Self-Serve Wizard */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ONLINE WILL BUILDER</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                Draft Your Challenge-Proof Christian Will Online
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step guidance tailored to the Indian Succession Act. Section 67 witness safeguards
                and Section 69 marriage checks built into the wizard.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Start Drafting Will (15 Mins)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Box 2: Advocate Consultation (Strictly No Phone Numbers) */}
            <div className="bg-slate-900 text-white rounded-3xl shadow-sm p-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[11px] font-black uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                <span>LEGAL CONSULTATION</span>
              </div>
              <h3 className="text-base font-extrabold text-white leading-snug">
                Need Advocate Guidance on Christian Succession?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Speak directly with senior succession advocates at AMA Legal Solutions. We review family
                bequests, draft bespoke trusts, and assist with High Court probate.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-sm transition-all"
              >
                <span>Schedule Advocate Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Tools Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
                <Calculator className="w-4 h-4 text-[#5F7E75]" />
                <span>RECOMMENDED TOOLS</span>
              </div>
              <div className="space-y-2 text-xs">
                <Link
                  href="/tools/witness-eligibility-section-67-checker"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-[#C65378]"
                >
                  Witness Eligibility &amp; Section 67 Checker
                </Link>
                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-[#C65378]"
                >
                  Probate Court Fee &amp; Timeline Calculator
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-[#C65378]"
                >
                  Inherited Property Capital Gains Tax Calculator
                </Link>
                <Link
                  href="/services/will-registration"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-[#C65378]"
                >
                  Sub-Registrar Will Registration Service
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Legal Standards</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All templates and clauses are drafted under the supervision of Bar Council registered
                advocates with extensive trial and probate experience across Indian High Courts.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
