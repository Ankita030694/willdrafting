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
} from "lucide-react";

const TOC_ITEMS = [
  { id: "shariat-foundation", label: "1. Legal Foundation: Muslim Will Rules" },
  { id: "one-third-rule", label: "2. The One-Third Bequest Limit (Al-Thuluth)" },
  { id: "sunni-vs-shia-wills", label: "3. Sunni vs Shia Rules on Legal Heirs" },
  { id: "interactive-wasiyat-validator", label: "4. Interactive Sharia Estate Calculator" },
  { id: "free-wasiyatnama-format", label: "5. Free Muslim Wasiyatnama Format" },
  { id: "heir-consent-annex", label: "6. Post-Death Legal Heir Consent Deed" },
  { id: "wasi-executor-duties", label: "7. Role & Duties of the Executor (Al-Wasi)" },
  { id: "comparison-table", label: "8. Comparative Analysis: Muslim vs ISA Will" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Execution Protocol" },
  { id: "common-drafting-mistakes", label: "10. Common Mistakes & How to Prevent Them" },
  { id: "institutional-profile", label: "11. Legal Excellence by AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Authorities" },
];

const FAQS = [
  {
    q: "Can a Muslim in India write a Will for their entire property?",
    a: "No. Under the Muslim Personal Law (Shariat) Application Act, 1937 and Section 118 of Mulla's Mahomedan Law, a Muslim can bequeath at most one-third (1/3rd) of their net estate after debts and funeral costs. The remaining two-thirds (2/3rds) must compulsorily go to legal Quranic heirs under Faraid. Any bequest exceeding one-third is void unless all legal heirs consent after the testator's death.",
  },
  {
    q: "Can a Sunni Muslim leave property to one of their legal heirs in a Will?",
    a: "Under Sunni jurisprudence (Hanafi, Shafii, Maliki, Hanbali), a bequest to a legal heir who already inherits under Faraid is void from the start. It becomes valid only if all other surviving heirs consent to it AFTER the testator dies. As held by the Privy Council in Ghulam Mohammad v. Ghulam Husain, consent given while the testator is alive has zero legal effect under Sunni law.",
  },
  {
    q: "How do Shia rules differ from Sunni rules regarding bequests to legal heirs?",
    a: "Under Shia law (Ithna-Ashari / Imami), a person can validly bequeath up to one-third of their net estate to an heir without needing consent from other heirs. In addition, if a bequest exceeds one-third, heir consent can be validly granted either during the testator's lifetime or after death, unlike Sunni law which requires post-death consent.",
  },
  {
    q: "Does a Muslim Will (Wasiyatnama) require stamp paper or registration in India?",
    a: "No stamp paper is needed. Under Indian law, a Wasiyatnama can be executed on plain white A4 paper with zero stamp duty. Registration is voluntary under Section 18(e) of the Registration Act, 1908. While an unregistered written Wasiyat attested by two competent witnesses is legally valid, registering it before the Sub-Registrar provides strong evidential protection against future challenges.",
  },
  {
    q: "Does the Indian Succession Act, 1925 apply to Muslim Wills in India?",
    a: "Generally, no. Sections 57 and 58 of the Indian Succession Act, 1925 expressly exempt Muslims from testamentary succession provisions. Muslim wills follow personal law preserved by the Muslim Personal Law (Shariat) Application Act, 1937. However, procedural rules for probate or letters of administration under Section 213 apply optionally.",
  },
  {
    q: "What happens if a Muslim bequeaths more than one-third and heirs refuse consent?",
    a: "If a bequest exceeds one-third and the heirs refuse consent, the bequest does not fail completely. Instead, it is legally reduced (abated) to exactly one-third of the net estate. Under Sunni law, if there are multiple non-heir legatees, their shares are reduced proportionately under the doctrine of rateable abatement. Under Shia law, bequests are honored in chronological order up to the one-third cap.",
  },
  {
    q: "What debts must be settled before calculating the one-third disposable estate?",
    a: "Estate liabilities follow a strict legal priority: (1) Funeral and burial costs, (2) Court fees and administration charges, (3) All personal debts, commercial loans, and unpaid prompt or deferred Mahr (dower) owed to the surviving wife. Only after deducting these payments from the gross estate is the net distributable estate determined.",
  },
  {
    q: "Can an oral (verbal) Wasiyat be legally recognized by Indian civil courts?",
    a: "Yes, Mahomedan law recognizes an oral Will made before witnesses, as upheld in Abdul Manan Khan v. Mirtaza Khan. However, Indian courts require strict, clear proof of an oral will. Claimants must prove the exact date, time, words spoken, and the testator's sound mind. Drafting a signed and witnessed written Wasiyatnama is essential to avoid court disputes.",
  },
  {
    q: "Can a Muslim woman execute a Wasiyatnama for her own property?",
    a: "Yes. An adult Muslim woman has absolute legal ownership of her self-acquired assets, inherited properties, and Mahr. She possesses full testamentary capacity to execute a Wasiyatnama bequeathing up to one-third of her net estate to non-heirs or charities, completely independent of her husband, father, or brothers.",
  },
  {
    q: "Can a non-Muslim be appointed as an Executor (Wasi) of a Muslim Will in India?",
    a: "Yes. Indian High Courts have confirmed that under Section 301 and Part IX of the Indian Succession Act, 1925, any competent adult of sound mind, including a non-Muslim advocate, chartered accountant, or family friend, can be legally appointed as an Executor (Al-Wasi) to administer the estate according to Shariat rules.",
  },
];

export default function MuslimWillClient() {
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

  const [activeId, setActiveId] = useState<string>("shariat-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"full" | "bequest" | "faraid" | "mahr" | "wasi">("full");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Interactive Calculator State
  const [calcSect, setCalcSect] = useState<"sunni" | "shia">("sunni");
  const [grossEstate, setGrossEstate] = useState<number>(9000000); // 90 Lakhs default
  const [debtsMahr, setDebtsMahr] = useState<number>(600000); // 6 Lakhs default
  const [funeralCosts, setFuneralCosts] = useState<number>(100000); // 1 Lakh default
  const [proposedBequest, setProposedBequest] = useState<number>(2500000); // 25 Lakhs default
  const [isBequestToHeir, setIsBequestToHeir] = useState<boolean>(false);

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

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 3000);
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Calculations
  const netEstate = Math.max(0, grossEstate - debtsMahr - funeralCosts);
  const maxOneThirdAllowance = Math.round(netEstate / 3);
  const compulsoryTwoThirdsReserve = Math.round((netEstate * 2) / 3);
  const exceedsOneThird = proposedBequest > maxOneThirdAllowance;
  const excessAmount = Math.max(0, proposedBequest - maxOneThirdAllowance);

  let validityStatus = "VALID";
  let statusMessage = "";

  if (calcSect === "sunni") {
    if (isBequestToHeir) {
      validityStatus = "REQUIRES_POST_DEATH_CONSENT";
      statusMessage = "Bequest to a legal heir is void under Sunni law unless all other heirs consent AFTER your death.";
    } else if (exceedsOneThird) {
      validityStatus = "REQUIRES_POST_DEATH_CONSENT";
      statusMessage = `Proposed bequest exceeds the 1/3rd cap by ${formatINR(excessAmount)}. Valid only if all heirs consent after death. Otherwise abated to ${formatINR(maxOneThirdAllowance)}.`;
    } else {
      validityStatus = "VALID";
      statusMessage = "100% Sharia & Statutory Compliant! The bequest is within the 1/3rd discretionary quota to a non-heir.";
    }
  } else {
    // Shia
    if (exceedsOneThird) {
      validityStatus = "REQUIRES_CONSENT";
      statusMessage = `Proposed bequest exceeds the 1/3rd cap by ${formatINR(excessAmount)}. Valid if heirs consent during lifetime or post-death.`;
    } else {
      validityStatus = "VALID";
      statusMessage = isBequestToHeir
        ? "100% Sharia & Statutory Compliant! Under Shia law, bequests to legal heirs up to 1/3rd do not require heir consent."
        : "100% Sharia & Statutory Compliant! The bequest is within the 1/3rd discretionary cap.";
    }
  }

  const wasiyatDraftText = `LAST WILL AND TESTAMENT (WASIYATNAMA)

IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL

I, [Full Name of Testator], son/daughter of Late [Father's Name], aged [Age] years, by religious faith a Muslim ([Sunni / Shia] school of jurisprudence), residing at [Complete Residential Address], holding PAN [PAN Number] and Aadhaar [Aadhaar Number], do hereby revoke all my former wills, wasiyats, and codicils. I execute this Last Will and Testament (Wasiyatnama) on this [Day] day of [Month], [Year] at [City, State], in full possession of my mental faculties and without any coercion, undue influence, or fraud.

1. DECLARATION OF FAITH AND SOUND HEALTH:
I affirm my unwavering faith in Islam. I declare that I am in sound physical health and disposing mind. I fully understand the nature and effect of disposing of my worldly assets in accordance with the Muslim Personal Law (Shariat) Application Act, 1937 and classical Mahomedan Law.

2. APPOINTMENT OF EXECUTOR (AL-WASI):
I hereby nominate and appoint [Full Name of Primary Executor], son/daughter of [Parent Name], residing at [Address], to be the sole Executor (Al-Wasi) of this my Last Will. In the event [he/she] predeceases me, renounces, or becomes incapable of acting, I nominate and appoint [Full Name of Alternate Executor], residing at [Address], as the alternate Executor. The Executor shall hold full authority to take custody of my estate, obtain letters of administration or probate if necessary, and administer my properties strictly as directed herein.

3. SETTLEMENT OF FUNERAL CHARGES, DEBTS, AND MAHR:
Before any legacy or bequest is distributed, my Executor shall out of my gross estate pay and discharge in strict chronological priority:
a) All necessary and reasonable funeral and burial expenses strictly according to Islamic rites.
b) All my lawful debts, personal liabilities, and outstanding commercial dues.
c) The outstanding prompt or deferred Mahr (dower) amounting to Rs. [Amount in INR]/- due and payable to my lawful wife, [Full Name of Wife], which constitutes a prior debt upon my estate.

4. DISCRETIONARY ONE-THIRD BEQUEST (AL-THULUTH):
In exercise of the testamentary powers vested in a Muslim under Section 118 of Mulla's Principles of Mahomedan Law and the Shariat Act, 1937, I hereby bequeath an amount not exceeding one-third (1/3rd) of my net distributable estate as follows:
a) A sum of Rs. [Amount]/- or [Specific Property/Asset Details] to [Full Name of Beneficiary/Charitable Trust], residing or situated at [Address], for [his/her absolute benefit / charitable purposes / Sadqah Jariyah].
[Note: If the Testator is Sunni and this legatee is a legal heir, this bequest is subject to the written consent of all other legal heirs granted post-demise].

5. DEVOLUTION OF TWO-THIRDS (2/3RDS) UNDER QURANIC FARAID:
The entire remainder of my net estate, constituting at least two-thirds (2/3rds) of my total net assets (or the entire estate if the one-third bequest above lapses or is disclaimed), shall devolve strictly and compulsorily upon my lawful legal heirs in accordance with the Quranic rules of inheritance (Faraid) under [Hanafi Sunni / Shia Ithna-Ashari] jurisprudence applicable to me at the time of my death:
- To my surviving Wife: [Her lawful Quranic share: 1/8th if children exist, or 1/4th if no children exist].
- To my surviving Sons and Daughters: [Residuary shares in the ratio of two parts to a son and one part to a daughter].
- To my surviving Mother/Father: [Their lawful Quranic shares as prescribed by Sharia].

6. SCHEDULE OF PROPERTIES:
My properties include the immovable properties described in Schedule 'A' and movable assets (bank accounts, fixed deposits, mutual funds, gold jewelry, and demat holdings) listed in Schedule 'B' annexed hereto.

IN WITNESS WHEREOF, I, [Full Name of Testator], have set my hand to this Last Will and Testament (Wasiyatnama) on the day, month, and year first written above.

___________________________
TESTATOR (AL-MUSI): [Full Name]

ATTESTING WITNESSES:
We, the undersigned witnesses, certify that the Testator signed this Wasiyatnama in our joint presence, and we, at [his/her] request and in [his/her] presence, have subscribed our names as witnesses, both being present at the same time.

Witness 1:
Signature: _______________________
Full Name: [Witness 1 Name]
Father's Name: [Father's Name]
Address: [Full Address]
Aadhaar/ID: [ID Number]

Witness 2:
Signature: _______________________
Full Name: [Witness 2 Name]
Father's Name: [Father's Name]
Address: [Full Address]
Aadhaar/ID: [ID Number]`;

  const heirConsentAnnexText = `DEED OF CONSENT BY LEGAL HEIRS (IQRAR-NAMA)
[For Bequest to a Legal Heir or Bequest Exceeding One-Third under Sunni / Mahomedan Law]

THIS DEED OF DECLARATION AND CONSENT is executed on this [Day] day of [Month], [Year] at [City, State] by:

1. [Full Name of Heir 1], son/daughter of Late [Testator Name], aged [Age] years, residing at [Address] (Relationship: [e.g., Son]).
2. [Full Name of Heir 2], son/daughter of Late [Testator Name], aged [Age] years, residing at [Address] (Relationship: [e.g., Daughter]).
3. [Full Name of Heir 3], wife/husband of Late [Testator Name], aged [Age] years, residing at [Address] (Relationship: [e.g., Surviving Wife]).
(Collectively referred to as the "CONSENTING LEGAL HEIRS").

IN FAVOR OF:
[Full Name of Legatee/Beneficiary], son/daughter of [Name], residing at [Address] (hereinafter referred to as the "BENEFICIARY").

WHEREAS:
A. The Late [Full Name of Testator], who was a Muslim governed by Sunni Hanafi law, passed away on [Date of Death] at [Place of Death], leaving behind the Consenting Legal Heirs as his/her sole legal heirs under the Quranic rules of inheritance.
B. During his/her lifetime, the deceased executed a Last Will and Testament (Wasiyatnama) dated [Date of Will], wherein [he/she] bequeathed [describe property or amount exceeding 1/3rd or given to a legal heir] to the Beneficiary.
C. Under the Muslim Personal Law (Shariat) Application Act, 1937 and Section 117 of Mulla's Principles of Mahomedan Law, read with the Privy Council ruling in Ghulam Mohammad v. Ghulam Husain (1932), a bequest to a legal heir or a bequest exceeding one-third of the net estate is valid only upon the free consent of all surviving legal heirs granted AFTER the death of the testator.

NOW THIS DEED WITNESSETH AND THE CONSENTING HEIRS DECLARE AS FOLLOWS:
1. RATIFICATION OF BEQUEST: The Consenting Legal Heirs hereby unconditionally confirm, ratify, and consent to the bequest made in Clause [Number] of the Wasiyatnama dated [Date of Will] in favor of the Beneficiary.
2. WAIVER OF RIGHT: We declare that our consent is given freely and voluntarily, after the demise of the Testator, with full knowledge of our Quranic legal shares. We waive all objections to the transfer and mutation of the said property in the Beneficiary's sole name.
3. BINDING EFFECT: This declaration shall be binding upon each of us, our heirs, executors, administrators, and assigns, and may be produced before the Sub-Registrar, Municipal Corporation, Banks, or Courts of Law as conclusive proof of our post-demise consent under Islamic law.

IN WITNESS WHEREOF, the Consenting Legal Heirs have signed this Deed on the date first written above.

1. Signature: _______________________ Name: [Heir 1 Name]
2. Signature: _______________________ Name: [Heir 2 Name]
3. Signature: _______________________ Name: [Heir 3 Name]

WITNESSES:
1. Signature: _______________________ Name & Address: [Witness 1]
2. Signature: _______________________ Name & Address: [Witness 2]`;

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool & Template Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scroll className="w-3.5 h-3.5 text-[#C65378]" />
            <span>SHARIAT APPLICATION ACT, 1937 • SECTIONS 115-118 MULLA</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Muslim Will Format in India: Legal Wasiyatnama Template
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a verified, plain paper <strong>Sharia-compliant Wasiyatnama format</strong> under
            the Muslim Personal Law (Shariat) Application Act, 1937. Accurately separate the{" "}
            <strong>1/3rd discretionary bequest</strong> from mandatory 2/3rd Quranic Faraid shares with
            a post-death legal heir consent annex.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-wasiyat-validator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Validate 1/3rd Bequest Limit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Sharia-Compliant Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">1/3rd Estate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MAX DISCRETIONARY BEQUEST
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2/3rd Faraid</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY QURANIC HEIRS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Post-Demise</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUNNI HEIR CONSENT RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PLAIN PAPER VALIDITY
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
                Governed under Muslim Personal Law (Shariat) Application Act, 1937, Mulla&rsquo;s Principles
                of Mahomedan Law (ss. 115&ndash;133), Indian Majority Act, 1875, and landmark precedents
                Ghulam Mohammad (1932) and Khajoorunissa (1876).
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* EXECUTIVE BRIEF BANNER */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: MUSLIM WILL (WASIYAT) RULES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict One-Third Disposable Limit:</strong> A Muslim can bequeath at most 1/3rd of
                    their net estate to non-heirs or charities. The remaining 2/3rds must compulsorily devolve upon
                    Quranic legal heirs (Faraid).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sunni Bequests to Legal Heirs are Void Without Post-Death Consent:</strong> A Sunni cannot
                    leave extra property to a legal heir unless all other heirs consent AFTER the testator dies.
                    Consent given during the testator&rsquo;s lifetime is legally ineffective.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prior Debts &amp; Unpaid Mahr Come First:</strong> All funeral costs, medical bills, and
                    unpaid prompt/deferred Mahr (dower) to the wife must be settled before computing the 1/3rd disposable share.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty on Plain Paper:</strong> A Wasiyatnama requires no stamp paper and can
                    be drafted on plain white A4 sheets with two witnesses. Registration is voluntary but recommended.
                  </span>
                </li>
              </ul>
            </div>

            {/* MANDATORY EMBEDDED VISUAL ASSET (OG Image) */}
            <div className="space-y-2">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-[#172228]">
                <Image
                  src="/images/muslim-will-wasiyat-format-india-og.jpg"
                  alt="Muslim Will Format in India Legal Wasiyatnama Template and Shariat Succession Guide"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
              <p className="text-center text-xs text-slate-500 italic">
                Statutory Wasiyatnama Drafting Architecture: Aligning 1/3rd Discretionary Legacies with Quranic Faraid Shares under Indian Civil Courts.
              </p>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="shariat-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Muslim Will (Wasiyat) Rules in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In India, succession and testamentary dispositions are not uniform across all citizens.
                  While Hindus, Christians, and Parsis are governed by the Indian Succession Act, 1925,
                  Muslims are expressly excluded from its testamentary rules by virtue of Sections 57 and 58.
                  Instead, a Muslim&rsquo;s testamentary capacity is governed by uncodified Islamic jurisprudence
                  enforced through the <strong>Muslim Personal Law (Shariat) Application Act, 1937</strong>.
                </p>
                <p>
                  Under Mahomedan Law (codified by Sir Dinshaw Mulla in <em>Principles of Mahomedan Law</em>,
                  Sections 115&ndash;133), a Will is termed a <strong>Wasiyat</strong>, and the document is known
                  as a <strong>Wasiyatnama</strong>. The person making the Will is the <em>Musi</em> (testator),
                  the beneficiary is the <em>Musa lahu</em> (legatee), and the appointed executor is the{" "}
                  <em>Wasi</em>.
                </p>
                <p>
                  To execute a valid Wasiyatnama in India, the testator must be of sound mind and must have
                  attained majority under <strong>Section 3 of the Indian Majority Act, 1875</strong> (18 years of
                  age). While classical Sharia recognized puberty as the threshold of capacity, Indian civil
                  courts strictly apply the 18-year statutory age requirement for executing a property Will.
                </p>
              </div>
            </section>

            {/* SECTION 2: ONE-THIRD BEQUEST LIMIT */}
            <section id="one-third-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Percent className="w-4 h-4" />
                <span>AL-THULUTH BEQUEST QUOTA</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. The One-Third Bequest Limit (Al-Thuluth) Explained
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The most critical legal rule governing Muslim wills is the <strong>One-Third Rule (Al-Thuluth)</strong>.
                  Unlike a non-Muslim who can bequeath 100% of self-acquired property to anyone, a Muslim has
                  testamentary freedom over only <strong>one-third (1/3rd)</strong> of their net estate.
                </p>
                <p>
                  This restriction traces back to the historic Hadith of the Prophet Muhammad (peace be upon him)
                  narrated by Sa&rsquo;d ibn Abi Waqqas: when Sa&rsquo;d wished to give away most of his wealth,
                  the Prophet instructed that he could bequeath only one-third, adding:{" "}
                  <em>&ldquo;One-third, and one-third is much. It is better to leave your heirs rich than to leave them poor and begging from people.&rdquo;</em>
                </p>
                <p>
                  Before computing this 1/3rd quota, Indian courts apply a strict statutory hierarchy of claims under
                  Section 115 of Mulla&rsquo;s Mahomedan Law:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <div className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">Funeral &amp; Burial</div>
                    <p className="text-[11px] text-slate-600">
                      Reasonable funeral and kafan expenses strictly according to Islamic rites.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <div className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">Debts &amp; Unpaid Mahr</div>
                    <p className="text-[11px] text-slate-600">
                      All personal liabilities and the wife&rsquo;s unpaid Mahr (a priority debt on the estate).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <div className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">Net Distributable Estate</div>
                    <p className="text-[11px] text-slate-600">
                      Max 1/3rd to discretionary legatees; compulsory 2/3rds to Quranic Faraid heirs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: SUNNI VS SHIA WILL RULES */}
            <section id="sunni-vs-shia-wills" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JURISPRUDENTIAL DIVERGENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Sunni vs Shia Will Rules: Bequests to Legal Heirs
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian courts recognize crucial jurisprudential differences between the Sunni school (Hanafi,
                  Shafii, Maliki, Hanbali) and the Shia school (Ithna-Ashari / Imami). Failing to account for these
                  differences is the #1 cause of Wasiyat challenges in Indian High Courts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sunni Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-sm text-slate-900">Sunni (Hanafi) Jurisprudence</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-[#C65378]">
                        Strict Faraid
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Bequest to an Heir is VOID ab initio:</strong> A Sunni cannot bequeath property to a
                          person who is already an heir under Faraid (e.g., favoring one son or wife).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Valid ONLY with Post-Death Heir Consent:</strong> As settled in{" "}
                          <em>Ghulam Mohammad v. Ghulam Husain (1932)</em>, consent given while the testator is alive
                          is completely void. Consent must be ratified after death.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Rateable Abatement:</strong> If bequests to non-heirs exceed 1/3rd, all legacies are
                          proportionately reduced (abated) under <em>Bafatun v. Bilaiti Khanum (1903)</em>.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Shia Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-sm text-slate-900">Shia (Ithna-Ashari) Jurisprudence</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Discretionary 1/3rd
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Bequest to an Heir is VALID up to 1/3rd:</strong> A Shia testator can bequeath up to
                          1/3rd of the net estate to any legal heir WITHOUT needing consent from other heirs.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Consent During Lifetime or Post-Death:</strong> If a bequest exceeds 1/3rd, heir
                          consent can be granted either during the testator&rsquo;s life or after death.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Chronological Priority:</strong> Legacies exceeding 1/3rd are satisfied in the order
                          they appear in the Will until the 1/3rd is exhausted; rateable abatement is not applied.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE WASIYAT CALCULATOR */}
            <section id="interactive-wasiyat-validator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE COMPLIANCE TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Sharia Estate &amp; Bequest Calculator
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use our diagnostic calculator to verify whether your planned bequests comply with the 1/3rd
                discretionary limit or trigger the mandatory legal heir consent requirement under Indian law.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  {/* Sect Choice */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>School of Jurisprudence</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcSect("sunni")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          calcSect === "sunni"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Sunni (Hanafi/Shafii)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcSect("shia")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          calcSect === "shia"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Shia (Ithna-Ashari)
                      </button>
                    </div>
                  </div>

                  {/* Beneficiary Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Legatee / Beneficiary Type</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsBequestToHeir(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !isBequestToHeir
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Non-Heir / Charity
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBequestToHeir(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          isBequestToHeir
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Legal Heir (Child/Spouse)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Numeric Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Gross Estate */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Gross Estate Value (₹)</label>
                    <input
                      type="number"
                      value={grossEstate || ""}
                      onChange={(e) => setGrossEstate(Number(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#C65378]"
                      placeholder="e.g. 9000000"
                    />
                    <div className="text-[10px] text-slate-500">{formatINR(grossEstate)}</div>
                  </div>

                  {/* Debts & Unpaid Mahr */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Debts &amp; Unpaid Mahr (₹)</label>
                    <input
                      type="number"
                      value={debtsMahr || ""}
                      onChange={(e) => setDebtsMahr(Number(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#C65378]"
                      placeholder="e.g. 600000"
                    />
                    <div className="text-[10px] text-slate-500">{formatINR(debtsMahr)}</div>
                  </div>

                  {/* Funeral Expenses */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Funeral &amp; Burial Costs (₹)</label>
                    <input
                      type="number"
                      value={funeralCosts || ""}
                      onChange={(e) => setFuneralCosts(Number(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#C65378]"
                      placeholder="e.g. 100000"
                    />
                    <div className="text-[10px] text-slate-500">{formatINR(funeralCosts)}</div>
                  </div>

                  {/* Proposed Bequest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Proposed Bequest (₹)</label>
                    <input
                      type="number"
                      value={proposedBequest || ""}
                      onChange={(e) => setProposedBequest(Number(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#C65378]"
                      placeholder="e.g. 2500000"
                    />
                    <div className="text-[10px] text-slate-500">{formatINR(proposedBequest)}</div>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Net Distributable Estate</div>
                    <div className="text-lg font-black text-slate-900">{formatINR(netEstate)}</div>
                    <div className="text-[10px] text-slate-500">After deducting debts, dower &amp; burial costs</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Max 1/3rd Bequest Limit</div>
                    <div className="text-lg font-black text-[#C65378]">{formatINR(maxOneThirdAllowance)}</div>
                    <div className="text-[10px] text-slate-500">Al-Thuluth discretionary allowance</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Mandatory 2/3rd Faraid Share</div>
                    <div className="text-lg font-black text-emerald-800">{formatINR(compulsoryTwoThirdsReserve)}</div>
                    <div className="text-[10px] text-slate-500">Strictly reserved for Quranic heirs</div>
                  </div>
                </div>

                {/* Status Indicator Banner */}
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    validityStatus === "VALID"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : "bg-amber-50 border-amber-200 text-amber-950"
                  }`}
                >
                  {validityStatus === "VALID" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 text-xs">
                    <div className="font-extrabold text-sm uppercase tracking-wide">
                      {validityStatus === "VALID"
                        ? "Sharia & Statutory Status: Valid & Enforceable"
                        : "Sharia Warning: Legal Heir Consent Mandatory"}
                    </div>
                    <p className="leading-relaxed">{statusMessage}</p>
                    {validityStatus !== "VALID" && (
                      <p className="font-bold text-[#C65378] pt-1">
                        &rarr; Include our Post-Death Legal Heir Consent Deed (Section 6 below) with your Wasiyatnama.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: FREE WASIYATNAMA FORMAT (ENGLISH DRAFT) */}
            <section id="free-wasiyatnama-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTEABLE WASIYAT TEMPLATE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Free Muslim Wasiyatnama Format (English Draft)
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is a lawyer-vetted Indian Wasiyatnama format drafted in accordance with the Shariat
                Application Act, 1937. Use the tabs below to copy the full document or individual clauses.
              </p>

              {/* Template Container */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("full")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === "full" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Full Wasiyatnama
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("bequest")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === "bequest" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    1/3rd Bequest Clause
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("faraid")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === "faraid" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    2/3rd Faraid Clause
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("mahr")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === "mahr" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Debts &amp; Mahr Clause
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("wasi")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === "wasi" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Executor (Wasi) Clause
                  </button>
                </div>

                {/* Tab Header with Copy Button */}
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    {activeTab === "full" && "Complete Indian Muslim Wasiyatnama Draft (English)"}
                    {activeTab === "bequest" && "Statutory 1/3rd Discretionary Bequest Clause (Al-Thuluth)"}
                    {activeTab === "faraid" && "Mandatory 2/3rd Devolution under Quranic Faraid Rules"}
                    {activeTab === "mahr" && "Prior Settlement of Funeral Dues, Debts & Unpaid Mahr"}
                    {activeTab === "wasi" && "Appointment & Administrative Powers of Executor (Al-Wasi)"}
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(wasiyatDraftText, "wasiyat")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedState === "wasiyat" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code / Text Container */}
                <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[500px]">
                  {wasiyatDraftText}
                </pre>
              </div>
            </section>

            {/* SECTION 6: POST-DEATH LEGAL HEIR CONSENT ANNEX */}
            <section id="heir-consent-annex" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>WILLDRAFTING LEGAL MOAT ASSET</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Post-Death Legal Heir Consent Deed (Annexure Format)
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most online Islamic will templates are drafted for the UK or US and fail to address Indian
                  personal law realities. Under Section 117 of Mulla&rsquo;s Mahomedan Law, if a Sunni Muslim
                  bequeaths any asset to a legal heir or bequeaths more than 1/3rd to a stranger, the legacy is
                  wholly invalid <strong>unless the surviving legal heirs sign a deed of consent after the testator&rsquo;s death</strong>.
                </p>
                <p>
                  This post-death <strong>Iqrar-Nama (Deed of Declaration and Consent)</strong> must be executed
                  by all surviving Quranic heirs and produced before the Sub-Registrar during property mutation
                  to prevent protracted civil title suits.
                </p>
              </div>

              {/* Annexure Box */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Post-Death Legal Heir Consent Annex (Deed of Consent / Iqrar-Nama)
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(heirConsentAnnexText, "consent")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedState === "consent" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Deed</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[450px]">
                  {heirConsentAnnexText}
                </pre>
              </div>
            </section>

            {/* SECTION 7: ROLE OF EXECUTOR (AL-WASI) */}
            <section id="wasi-executor-duties" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>FIDUCIARY POWERS &amp; DUTIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Role &amp; Legal Powers of the Executor (Al-Wasi) in India
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Islamic testamentary jurisprudence, an executor is known as <strong>Al-Wasi</strong>.
                  The executor occupies a fiduciary position of supreme trust, tasked with collecting debts,
                  discharging liabilities, and allocating the 1/3rd and 2/3rd shares.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Who Can Be Appointed?</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Any adult of sound mind can be appointed. While classical Hanafi texts preferred Muslim
                      executors, Indian civil courts have confirmed that appointing a non-Muslim advocate,
                      chartered accountant, or close family friend is legally valid under Indian law.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Is Probate Mandatory for Muslims?</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No. Under Section 213(2) of the Indian Succession Act, 1925, probate is <strong>not mandatory</strong>{" "}
                      for a Muslim Will, even in Presidency towns (Mumbai, Kolkata, Chennai). The executor derives
                      direct legal power from the Wasiyatnama itself upon the testator&rsquo;s death.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATUTORY COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparative Analysis: Muslim Will vs General Indian Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding how an Islamic Wasiyatnama differs from a standard Indian Will under the Indian
                Succession Act is vital to drafting an unchallengeable document.
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white font-extrabold">
                      <th className="p-3.5 border-b border-slate-700">Legal Parameter</th>
                      <th className="p-3.5 border-b border-slate-700">Muslim Will (Wasiyatnama)</th>
                      <th className="p-3.5 border-b border-slate-700">Non-Muslim Will (ISA 1925)</th>
                      <th className="p-3.5 border-b border-slate-700">Indian Legal Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Governing Act</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">Shariat Act, 1937</td>
                      <td className="p-3.5">Indian Succession Act, 1925</td>
                      <td className="p-3.5 text-slate-500">Exempt from ISA testamentary provisions</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Disposable Quota</td>
                      <td className="p-3.5 font-semibold text-[#C65378]">Max 1/3rd (Al-Thuluth)</td>
                      <td className="p-3.5">100% of self-acquired property</td>
                      <td className="p-3.5 text-slate-500">2/3rds compulsorily protected for Faraid heirs</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Bequest to Legal Heir</td>
                      <td className="p-3.5 font-semibold text-rose-700">Void without post-death consent (Sunni)</td>
                      <td className="p-3.5">100% allowed without anyone&rsquo;s consent</td>
                      <td className="p-3.5 text-slate-500">Prevents unequal favor among siblings</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Oral Will (Verbal)</td>
                      <td className="p-3.5 font-semibold text-emerald-700">Recognized under Mahomedan Law</td>
                      <td className="p-3.5">Void (except privileged military wills)</td>
                      <td className="p-3.5 text-slate-500">Written draft recommended to avoid court delays</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">Mandatory Probate</td>
                      <td className="p-3.5 font-semibold text-emerald-700">Not mandatory anywhere in India</td>
                      <td className="p-3.5">Mandatory in Mumbai, Kolkata, Chennai</td>
                      <td className="p-3.5 text-slate-500">Saves massive court fees and legal delay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>EXECUTION PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Drafting &amp; Executing a Wasiyatnama
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    step: "01",
                    title: "Asset & Liability Inventory",
                    desc: "List all real estate, bank accounts, business shares, and gold alongside outstanding debts and unpaid Mahr owed to your wife.",
                  },
                  {
                    step: "02",
                    title: "Calculate 1/3rd Disposable Cap",
                    desc: "Deduct funeral costs and all debts from gross estate to determine net estate. Your discretionary bequests must stay within 1/3rd.",
                  },
                  {
                    step: "03",
                    title: "Appoint Executor (Al-Wasi)",
                    desc: "Name a trusted family member, adult son/daughter, or advocate as Executor, with an alternate executor in case of prior demise.",
                  },
                  {
                    step: "04",
                    title: "Draft on Plain White Paper",
                    desc: "Type the Wasiyatnama on standard A4 paper. Stamp paper is not required under Indian law; zero stamp duty applies.",
                  },
                  {
                    step: "05",
                    title: "Execute Before Two Witnesses",
                    desc: "Sign every page in the joint presence of two adult competent witnesses who attest after witnessing your signature.",
                  },
                  {
                    step: "06",
                    title: "Optional SRO Registration",
                    desc: "Book an appointment at the Sub-Registrar Office to register your Wasiyatnama for complete evidential protection.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: COMMON DRAFTING MISTAKES */}
            <section id="common-drafting-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>LEGAL PITFALLS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Common Mistakes in Muslim Wills &amp; How to Prevent Them
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Attempting to Bequeath 100% of Property</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Muslim testator cannot leave their entire estate to a single favorite son or outsider.
                    Any bequest exceeding 1/3rd is legally abated back to 1/3rd unless all legal heirs consent
                    post-demise.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Obtaining Heir Consent During Lifetime</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Sunni law, legal heirs cannot consent to a bequest while the testator is alive.
                    Any consent deed signed prior to the testator&rsquo;s death is void under <em>Ghulam Mohammad (1932)</em>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Ignoring the Wife&rsquo;s Unpaid Mahr</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mahr is an unsecured priority debt against the husband&rsquo;s estate. Distributing legacies
                    without clearing unpaid dower makes executors personally liable under civil debt enforcement.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Attempting to Disinherit Daughters</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Muslim father cannot exclude his daughters from inheriting their compulsory Quranic share.
                    Any clause disinheriting a daughter is completely void under Indian personal law.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence &amp; Trust
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Shariat Advisory Bench
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  WillDrafting.in is led by senior succession litigators and estate planning counsel at AMA Legal
                  Solutions. Our bench possesses deep expertise in the Muslim Personal Law (Shariat) Application Act,
                  1937, High Court letters of administration petitions, Sub-Registrar Wasiyat registrations, and
                  dispute-free cross-generational property transmission across India.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Shariat &amp; Civil Court Vetted</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>0% Stamp Duty Plain Paper Format</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pan-India Advocate Support</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>COMMON QUESTIONS ANSWERED</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Muslim Wills in India
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-500 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Islamic Legal Authorities
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Statutory Acts &amp; Landmark Indian Precedents:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed">
                    <li>
                      <strong>Muslim Personal Law (Shariat) Application Act, 1937 (Act No. 26 of 1937):</strong> Section
                      2 mandates the application of Muslim personal law in testamentary succession, gifts, and trusts.
                    </li>
                    <li>
                      <strong>Indian Majority Act, 1875:</strong> Section 3 fixes the legal age of majority at 18
                      years for testamentary capacity in Indian civil courts.
                    </li>
                    <li>
                      <strong>Indian Registration Act, 1908:</strong> Section 18(e) classifies Will registration as optional.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925:</strong> Sections 57 &amp; 58 (exemption of Muslims); Section 213
                      (probate optional for Muslims).
                    </li>
                    <li>
                      <strong>Ghulam Mohammad v. Ghulam Husain (1932) 59 IA 74:</strong> Landmark Privy Council ruling
                      establishing that legal heir consent under Sunni law must be granted post-demise.
                    </li>
                    <li>
                      <strong>Khajoorunissa v. Rowshan Jehan (1876) ILR 2 Cal 184:</strong> Affirmed that a Muslim testator
                      cannot defeat the Quranic rights of heirs by bequeathing more than 1/3rd without heir consent.
                    </li>
                    <li>
                      <strong>Bafatun v. Bilaiti Khanum (1903) ILR 30 Cal 683:</strong> Applied the doctrine of rateable
                      abatement where bequests to multiple non-heirs exceed one-third.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Shariat Application Act 1937</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Succession Calculators &amp; Legal Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Inherited Property Tax Calculator
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Share Calculator
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Registration Service
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
                Specialist in Indian testamentary jurisprudence, Muslim Personal Law (Shariat Act, 1937),
                Faraid estate structuring, and Sub-Registrar Wasiyat registrations pan-India.
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
                  <span>PREVENT FAMILY PARTITION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Sharia-Compliant Wasiyatnama Online
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our guided wizard automatically enforces the 1/3rd discretionary limit and protects mandatory
                  Faraid shares for your lawful heirs.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Wasiyat in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Shariat Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SHARIAT SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Complex Muslim Estate or High-Value Property?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consult experienced High Court succession advocates for legal heir consent documentation,
                  Wasiyat registration, and ancestral title verification.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Choose WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Strict 1/3rd Verification:</strong> Enforces Quranic Al-Thuluth limits automatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Post-Death Heir Annex:</strong> Includes the legally vital Sunni consent deed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Mahr Prioritization:</strong> Safeguards wives&rsquo; dower rights as priority debt.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-wasiyat-validator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Wasiyat Calculator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Sharia Will</span>
        </button>
      </div>
    </div>
  );
}
