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
  FileText,
  AlertCircle,
  Clock,
  Stethoscope,
  CheckSquare,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "legal-exclusion-basis", label: "1. Legal Rules: Section 30, 59 & 127 Exclusion" },
  { id: "exclusion-clause-builder", label: "2. Free Exclusion Builder & Risk Checklist" },
  { id: "bare-vs-bulletproof-clause", label: "3. Bare Disinheritance vs Factual Clause" },
  { id: "bulletproof-disinheritance-format", label: "4. Bulletproof Disinheritance Clause Format" },
  { id: "in-terrorem-clause-format", label: "5. In Terrorem Penalty Clause (Section 127)" },
  { id: "medical-sound-mind-certificate", label: "6. Doctor Sound Mind Certificate Form" },
  { id: "supreme-court-precedents", label: "7. Supreme Court Rules: Venkatachala & Kavita Kanwar" },
  { id: "factual-justification-checklist", label: "8. Factual Justification Evidence Checklist" },
  { id: "step-by-step-execution-sop", label: "9. Step-by-Step SOP: Challenge-Proof Execution" },
  { id: "fatal-disinheritance-mistakes", label: "10. Four Fatal Mistakes in Heir Exclusion" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Heir Exclusion" },
  { id: "statutory-citations", label: "13. Legal Rules & Official Court Portals" },
];

const FAQS = [
  {
    q: "How can I legally exclude an estranged or abusive son from my self-acquired house?",
    a: "Name your son clearly in the Will and state calm, true facts showing why he gets no share. Under Section 59 of the Indian Succession Act and Section 30 of the Hindu Succession Act, you hold full power over your own house. Also add a rest-of-estate gift so no cash goes back to him under Section 30 of the Act.",
  },
  {
    q: "Why is writing just 'I disinherit him' risky in an Indian probate court?",
    a: "In H. Venkatachala v. B.N. Thimmajamma and Kavita Kanwar v. Pamela Mehta (2020 SC), the Supreme Court said cutting out a close heir with no reason raises doubt. Without clear facts, the judge may doubt your free mind or memory and refuse probate.",
  },
  {
    q: "Are no-contest in terrorem clauses enforceable in India under Section 127 ISA?",
    a: "Indian courts check in terrorem terms under Section 127 of the Indian Succession Act. A Will cannot stop an heir from fighting a fake or forced Will. To stay safe, pair a small token gift with a clear gift-over rule that moves the money to your chosen heir if a false case is filed.",
  },
  {
    q: "Why does Section 30 of the Indian Succession Act matter when excluding a relative?",
    a: "Under Section 30 of the Indian Succession Act, any item missed by your Will goes by default heir rules. If you cut out an estranged son but miss leftover cash or bank funds, that excluded son can still claim a legal share in those items.",
  },
  {
    q: "Do I need a doctor sound mind certificate when excluding a legal heir?",
    a: "Yes, a same-day doctor sound mind note helps whenever a close heir is left out. It proves you knew your family, your assets, and your choice on signing day. This blocks later claims of memory loss or pressure.",
  },
  {
    q: "Should I write harsh details of abuse inside the Will clause itself?",
    a: "Keep the words inside your Will calm, short, and true. State years apart, lack of care, or past gifts without angry insults. Keep police papers, bank proofs, and call logs in a safe sealed file for your executor.",
  },
];

const JUSTIFICATION_CHECKS = [
  {
    id: "named_heir",
    label: "Full legal name, kinship, and current city of the left-out relative are stated clearly",
    weight: 20,
  },
  {
    id: "factual_recital",
    label: "Calm, true, non-abusive reason is written (years apart, neglect, or past gifts)",
    weight: 20,
  },
  {
    id: "residuary_gift",
    label: "Rest-of-estate clause covers 100% of assets so Section 30 ISA does not hand a share back",
    weight: 20,
  },
  {
    id: "heir_absent",
    label: "Favored heir stays outside the room during drafting, doctor check, and Will signing",
    weight: 15,
  },
  {
    id: "doctor_cert",
    label: "Same-day MBBS or MD doctor sound mind form is signed on the Will date",
    weight: 15,
  },
  {
    id: "sro_witnesses",
    label: "Two neutral witnesses and Sub-Registrar filing (or clear video) are set up",
    weight: 10,
  },
];

export default function ExclusionOfEstrangedRelativeClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-exclusion-basis");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCustom, setCopiedCustom] = useState<boolean>(false);
  const [copiedMainClause, setCopiedMainClause] = useState<boolean>(false);
  const [copiedInTerrorem, setCopiedInTerrorem] = useState<boolean>(false);
  const [copiedMedicalForm, setCopiedMedicalForm] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE EXCLUSION BUILDER & CHECKLIST
  // ==========================================
  const [relativeRole, setRelativeRole] = useState<string>("abusive_eldest_son");
  const [assetNature, setAssetNature] = useState<string>("self_acquired_house");
  const [factualGround, setFactualGround] = useState<string>("abuse_and_estrangement");
  const [includeInTerrorem, setIncludeInTerrorem] = useState<boolean>(true);
  const [attachDoctorCert, setAttachDoctorCert] = useState<boolean>(true);
  const [checks, setChecks] = useState<Record<string, boolean>>({
    named_heir: true,
    factual_recital: true,
    residuary_gift: true,
    heir_absent: true,
    doctor_cert: true,
    sro_witnesses: false,
  });

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const defenseScore = JUSTIFICATION_CHECKS.reduce(
    (sum, item) => sum + (checks[item.id] ? item.weight : 0),
    0
  );

  const getRoleLabel = () => {
    if (relativeRole === "abusive_eldest_son") return "my eldest son, [Full Legal Name of Estranged Son]";
    if (relativeRole === "neglectful_younger_son") return "my younger son, [Full Legal Name of Son]";
    if (relativeRole === "estranged_daughter") return "my daughter, [Full Legal Name of Daughter]";
    if (relativeRole === "estranged_spouse") return "my separated spouse, [Full Legal Name of Spouse]";
    return "my relative, [Full Legal Name of Relative]";
  };

  const getGroundClause = () => {
    if (factualGround === "abuse_and_estrangement") {
      return "has severed all family ties with me for the past [Number] years and has subjected me to repeated verbal abuse, threats, and neglect during my old age despite my requests for peace";
    }
    if (factualGround === "years_of_abandonment") {
      return "has lived completely apart from me since [Year], has not kept regular contact, and has given zero physical or medical care during my illnesses";
    }
    if (factualGround === "prior_lifetime_gifts") {
      return "has already received substantial money, education funding, and asset advances from me during my lifetime, including [Specify Gift/Amount], as full satisfaction of his/her expectations";
    }
    return "is well settled independently with strong personal income and needs no financial support from my self-acquired home or savings";
  };

  const buildCustomClause = () => {
    const roleLabel = getRoleLabel();
    const groundText = getGroundClause();
    const assetNote =
      assetNature === "mixed_self_acquired_and_huf"
        ? "All properties covered in this clause are either my self-acquired assets under Section 59 of the Indian Succession Act, 1925 or my separate undivided share disposable by Will under Section 30 of the Hindu Succession Act, 1956."
        : "Every house, flat, bank balance, and investment disposed under this Will is my sole self-acquired asset earned from my own income, over which I hold full power under Section 59 of the Indian Succession Act, 1925.";

    const penaltyBlock = includeInTerrorem
      ? `\n\nNO-CONTEST (IN TERROREM) CONDITIONAL CLAUSE WITH GIFT-OVER:\nI set aside a modest token sum of Rs. 25,000/- (Rupees Twenty-Five Thousand Only) for [Name of Excluded Relative] solely as an act of goodwill. However, if [Name of Excluded Relative] files any caveat, partition suit, or baseless court challenge against this Will without valid proof of fraud or forgery, this conditional legacy shall stand forfeited at once. In that event, the forfeited sum of Rs. 25,000/- shall pass automatically as a gift-over to my primary residuary beneficiary, [Full Name of Primary Beneficiary].`
      : "";

    const doctorNote = attachDoctorCert
      ? `\n\nSOUND MIND CERTIFICATION REFERENCE:\nI have obtained a same-day medical fitness certificate dated [Date] from Dr. [Doctor Name, Reg. No.], confirming my sound disposing mind and full understanding of this exclusion.`
      : "";

    return `EXPRESS EXCLUSION & RESIDUARY DISPOSITION CLAUSE:\n\n1. AWARENESS & ASSET DECLARATION: I, [Full Name of Will Maker], state clearly that I am fully mindful of ${roleLabel}. ${assetNote}\n\n2. FACTUAL REASON FOR EXCLUSION: After calm thought and free from any pressure, I record that ${roleLabel} ${groundText}. For these true and objective reasons, I deliberately exclude [Name of Excluded Relative] from receiving any share, right, title, or claim in my self-acquired residential house at [Property Address] or any other movable or immovable asset.\n\n3. COMPLETE RESIDUARY GIFT (SECTION 30 ISA SAFEGUARD): All my remaining movable and immovable assets not listed separately above shall pass wholly to [Full Name of Primary / Residuary Beneficiary], so that no part of my estate falls into intestacy under Section 30 of the Indian Succession Act, 1925.${penaltyBlock}${doctorNote}`;
  };

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const bulletproofTemplateText = `CLAUSE [X]: EXPRESS DISINHERITANCE OF ESTRANGED SON & COMPLETE RESIDUARY BEQUEST

1. IDENTITY & CONSCIOUS EXCLUSION:
I, [Full Name of Will Maker], aged [Age] years, residing at [Complete Home Address], declare that I am fully aware of my eldest son, [Full Name of Estranged Son], aged about [Age] years, presently residing at [Last Known Address]. I have not omitted his name by oversight or forgetfulness.

2. SELF-ACQUIRED CHARACTER OF ESTATE:
I affirm that my residential house at [House No., Colony, City], together with all bank accounts, fixed deposits, mutual funds, and shares, was acquired strictly out of my own self-earned income and savings. No part of this house is ancestral coparcenary property. Under Section 59 of the Indian Succession Act, 1925 and Section 30 of the Hindu Succession Act, 1956, I hold absolute testamentary freedom over these assets.

3. FACTUAL & OBJECTIVE REASONS FOR EXCLUSION:
I record with calm clarity that for the past [Number] years, my said eldest son [Name] has completely severed family relations with me and my spouse. He has subjected us to repeated harassment, hostile behaviour, and complete neglect during my medical treatments and old age, and has offered zero emotional or financial care. Despite family efforts, he has stayed estranged by his own choice.

4. EXPRESS EXCLUSION & BAR ON CLAIMS:
For these true and deliberate reasons, I exclude [Full Name of Estranged Son], his spouse, and his legal representatives from receiving any share, rupee, residence right, or interest in my self-acquired house or any other property owned by me at the time of my death.

5. COMPLETE RESIDUARY GIFT (PREVENTING SECTION 30 ISA INTESTACY):
To ensure no portion of my estate passes by intestate succession under Section 30 of the Indian Succession Act, 1925, I devise and bequeath my entire residuary estate, including all unlisted cash, jewellery, refunds, and future assets, absolutely and exclusively to [Full Name of Spouse / Dutiful Child], residing at [Address].`;

  const inTerroremTemplateText = `CLAUSE [Y]: CONDITIONAL TOKEN BEQUEST & IN TERROREM GIFT-OVER PROVISION
(Drafted in compliance with Sections 127 & 131 of the Indian Succession Act, 1925)

1. CONDITIONAL TOKEN LEGACY:
Subject strictly to the condition stated in sub-clause (2) below, I direct my Executor to pay a one-time conditional sum of Rs. [25,000 / 50,000]/- (Rupees [Amount in Words] Only) to [Full Name of Excluded / Estranged Relative] within ninety (90) days of the uncontested acceptance of this Will.

2. FORFEITURE UPON VEXATIOUS CONTEST & EXPRESS GIFT-OVER:
If [Full Name of Excluded / Estranged Relative], directly or through any agent or heir, lodges a vexatious caveat under Section 284 of the Indian Succession Act, 1925, files a civil partition suit, or brings frivolous proceedings aimed at delaying distribution or harassing my named beneficiaries (save and except bona fide statutory remedies grounded in proven forgery or coercion, so as not to contravene public policy or Section 127 of the Act), the conditional legacy in sub-clause (1) shall stand revoked immediately.

3. MANDATORY GIFT-OVER DESTINATION:
Upon such forfeiture, the said sum of Rs. [25,000 / 50,000]/- shall not pass as intestate estate under Section 30 of the Indian Succession Act, 1925, but shall vest automatically by way of gift-over in [Full Name of Primary Beneficiary / Residuary Heir], who shall also have the right to seek exemplary litigation costs from the contesting party.`;

  const medicalCertificateText = `DOCTOR'S CERTIFICATE OF SOUND DISPOSING MIND & TESTAMENTARY CAPACITY
(To be executed on the exact date and time of Will signing)

I, Dr. [Full Name of Medical Practitioner], holding qualification [MBBS / MD / Geriatric Specialist], Registration No. [State Medical Council Reg. No.], practicing at [Clinic / Hospital Name and City], do hereby certify as follows:

1. PATIENT EXAMINATION DETAILS:
On [Date: DD/MM/YYYY] at [Time: HH:MM AM/PM], I personally and privately examined [Full Name of Will Maker], aged [Age] years, residing at [Home Address], identified via [Aadhaar / PAN / Passport Last 4 Digits: XXXX]. No beneficiary named in the Will was present inside the examination room during my assessment.

2. COGNITIVE & MENTAL FITNESS FINDINGS:
Upon clinical examination and direct verbal conversation in [Language, e.g., English / Hindi], I found [Mr./Ms. Full Name] to be:
(a) Fully alert, conscious, and oriented to person, place, and current date.
(b) Possessing intact recent and remote memory, capable of recalling all close family members, including estranged relatives.
(c) Capable of understanding the nature, value, and extent of his/her self-acquired property and the practical effect of excluding a legal heir in his/her Last Will and Testament.
(d) Free from any delirium, severe dementia, intoxication, or heavy sedative influence that could impair independent judgment.

3. CONCLUSION:
In my professional medical opinion, [Full Name of Will Maker] is of sound disposing state of mind, clear understanding, and full mental capacity to execute his/her Last Will and Testament voluntarily today.

Date: [DD/MM/YYYY]                           Signature & Official Seal of Doctor:
Place: [City, State]                         [Dr. Full Name & Medical Council Reg. No.]`;

  const checklistCopyText = `FACTUAL JUSTIFICATION & CHALLENGE-PROOF CHECKLIST:
1. Name the estranged relative with full legal name, age, and last known city.
2. State calm, true reasons (years of estrangement, abuse, neglect, or prior lifetime gifts).
3. Include a 100% residuary bequest so Section 30 ISA intestacy cannot hand back a share.
4. Keep the favored heir outside the room during lawyer calls, doctor exam, and signing.
5. Obtain a same-day MBBS/MD sound mind certificate matching the Will date.
6. Keep supporting evidence (police complaints, bank transfers, call logs) in a sealed file.
7. Register the Will at the Sub-Registrar Office or record clear reading and signing video.`;

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
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 30, 59 &amp; 127 • KAVITA KANWAR (2020 SC)</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            How to Exclude an Estranged Relative in an Indian Will
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Writing just &quot;I disinherit him&quot; makes your Will weak in court. Use our tested disinheritance
            clause with factual reasons, an in terrorem penalty box, and a doctor sound mind form today.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#bulletproof-disinheritance-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Exclusion Clause Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 30 &amp; 127</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ISA INTESTACY &amp; CONDITION RULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Kavita Kanwar</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2020 SC SUSPICIOUS CIRCUMSTANCES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">In Terrorem</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GIFT-OVER NO-CONTEST PENALTY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Doctor Form</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SAME-DAY SOUND MIND PROOF
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
                <span>Supreme Court Aligned</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built around Sections 30, 59, 61, 63, and 127 of the Indian Succession Act, 1925, Section 30 HSA, and
                <em> H. Venkatachala</em> and <em>Kavita Kanwar</em>.
              </p>
            </div>

            {/* Quick Limitation Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Critical Warning</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Never write just &quot;I disinherit him&quot; without reasons or a residuary heir. Silent or bare cuts
                trigger suspicious circumstances and Section 30 ISA intestacy claims.
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
                <span>QUICK BRIEF: HOW TO CUT OUT AN ESTRANGED HEIR</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Name &amp; Calm Facts:</strong> Give the son or kin&apos;s full name and true facts so the
                    judge sees you acted with a clear mind.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Close Section 30 ISA Gaps:</strong> Add a full rest-of-estate gift so spare cash does not
                    pass back to the excluded heir.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safe No-Contest Clause:</strong> Pair your in terrorem penalty with a small token gift and
                    a clear gift-over under Section 127 ISA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Same-Day Doctor Form:</strong> Have an MBBS or MD doctor sign a sound mind form on the Will
                    date to beat memory loss claims.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/exclusion-of-estranged-relative-clause-format-og.jpg"
                  alt="Exclude estranged relative in Indian Will clause format and medical form"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Will Protection Series: Estranged Relative Exclusion &amp; In Terrorem Clauses
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  SUPREME COURT COMPLIANT 2026
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE (STRICTLY THE ONLY H2 ON THE PAGE) */}
            <section id="legal-exclusion-basis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LAW RULES &amp; RIGHTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Section 30, 59 &amp; 127 Exclusion
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Many parents in India want to keep an estranged or abusive son out of their self-earned house. Short
                  blog posts often tell you to write one line: &quot;I disinherit my son.&quot; In court, that bare
                  line fails fast.
                </p>
                <p>
                  Under Section 59 of the Indian Succession Act, 1925 and Section 30 of the Hindu Succession Act, 1956,
                  you hold full power over your own house and cash. Yet judges test any Will that cuts out a close child
                  under strict court rules.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Two Legal Traps: Section 30 ISA &amp; Section 127 ISA
                  </div>
                  <p className="text-xs text-slate-700">
                    Under Section 30 of the Indian Succession Act, any asset left out of your Will passes by default heir
                    rules. If you cut out an estranged son but miss spare cash, he can claim a share in that cash. Also,
                    under Section 127 ISA, a no-contest rule that blocks genuine fraud checks is void in law.
                  </p>
                </div>
                <p>
                  A strong Will solves both traps at once. It names the estranged relative, states calm true facts, gives
                  all leftover items to your chosen heir, and adds a doctor sound mind note.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE EXCLUSION BUILDER & FACTUAL CHECKLIST */}
            <section id="exclusion-clause-builder" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE CLAUSE BUILDER &amp; AUDIT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Exclusion Builder &amp; Risk Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Select your family facts and run the factual justification checklist below. Build a custom clause that
                blocks suspicious circumstance claims in court.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Estranged Relative */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Relative Being Excluded:
                    </label>
                    <select
                      value={relativeRole}
                      onChange={(e) => setRelativeRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="abusive_eldest_son">Estranged / Abusive Eldest Son</option>
                      <option value="neglectful_younger_son">Neglectful Younger Son</option>
                      <option value="estranged_daughter">Estranged Adult Daughter</option>
                      <option value="estranged_spouse">Separated Spouse (No Divorce Decree)</option>
                      <option value="collateral_relative">Sibling / Collateral Relative</option>
                    </select>
                  </div>

                  {/* Select 2: Asset Nature */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Nature of Property:
                    </label>
                    <select
                      value={assetNature}
                      onChange={(e) => setAssetNature(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="self_acquired_house">Self-Acquired House &amp; Personal Savings</option>
                      <option value="mixed_self_acquired_and_huf">
                        Self-Acquired Flat + Section 30 HSA Undivided Share
                      </option>
                    </select>
                  </div>

                  {/* Select 3: Factual Reason */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Factual Reason for Exclusion:
                    </label>
                    <select
                      value={factualGround}
                      onChange={(e) => setFactualGround(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="abuse_and_estrangement">Verbal Abuse, Threats &amp; Long Estrangement</option>
                      <option value="years_of_abandonment">Years of Abandonment &amp; Medical Neglect</option>
                      <option value="prior_lifetime_gifts">Substantial Cash or Property Already Given</option>
                      <option value="settled_independently">Settled Independently With High Income</option>
                    </select>
                  </div>

                  {/* Toggle 4: In Terrorem & Doctor Form */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Add Court Defense Shields:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIncludeInTerrorem(!includeInTerrorem)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          includeInTerrorem
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {includeInTerrorem ? "In Terrorem: ON" : "In Terrorem: OFF"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttachDoctorCert(!attachDoctorCert)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          attachDoctorCert
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {attachDoctorCert ? "Doctor Form: ON" : "Doctor Form: OFF"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Factual Justification Checklist inside Interactive Tool */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Factual Justification Readiness Checklist (Click to Score):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {JUSTIFICATION_CHECKS.map((item) => {
                      const active = !!checks[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCheck(item.id)}
                          className={`text-left p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                            active
                              ? "bg-emerald-50/70 border-emerald-200 text-slate-800"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                              active ? "bg-emerald-600 text-white" : "bg-white border border-slate-300"
                            }`}
                          >
                            {active && <Check className="w-3 h-3" />}
                          </div>
                          <span className="leading-snug">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* COMPUTED RESULT DISPLAY */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {defenseScore >= 80 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <span className="font-extrabold text-sm text-slate-900">
                        {defenseScore >= 80
                          ? "Strong Probate Defense Readiness"
                          : defenseScore >= 50
                          ? "Moderate Protection: Add Missing Shields"
                          : "High Suspicious Circumstances Risk"}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                      Defense Score: {defenseScore}%
                    </span>
                  </div>

                  {assetNature === "mixed_self_acquired_and_huf" ? (
                    <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 p-3 rounded-xl leading-relaxed">
                      <strong>HUF &amp; Section 30 HSA Note:</strong> You cannot cut out a child&apos;s own coparcenary
                      birthright in ancestral HUF land. Your Will can only exclude him from your self-acquired assets and
                      dispose of your own separate undivided share.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Self-acquired assets carry full testamentary freedom. Keeping the favored heir out of the signing
                      room and attaching a same-day doctor certificate clears the <em>Kavita Kanwar</em> test.
                    </p>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Live Custom Draft Preview</span>
                      <button
                        type="button"
                        onClick={() => copyText(buildCustomClause(), setCopiedCustom)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedCustom ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Clause!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Custom Clause</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {buildCustomClause()}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="bare-vs-bulletproof-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LITIGATION RISK COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Bare Disinheritance vs Factual Clause
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most Will templates fail because they omit reasons or forget unlisted assets. Compare a bare exclusion
                line against our court-tested format below:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">Legal Factor</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-slate-300">
                        Bare &quot;I Disinherit Him&quot; Line
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-rose-200">
                        Bulletproof Factual Clause Pack
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Heir Naming</td>
                      <td className="p-3.5">Silent cut invites memory loss claims in court</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Full legal name, kinship, and city stated clearly
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Kavita Kanwar Test</td>
                      <td className="p-3.5 text-rose-700 font-bold">
                        High court doubt placed on your chosen heirs
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Calm true facts explain your choice to the judge
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Section 30 ISA Gap</td>
                      <td className="p-3.5">Missed cash passes back to the cut-out heir</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Full rest-of-estate gift seals every spare rupee
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">No-Contest Shield</td>
                      <td className="p-3.5">Zero cost risk for filing fake court blocks</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Section 127 safe token gift plus gift-over rule
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Sound Mind Proof</td>
                      <td className="p-3.5">Rests only on old memory of witnesses years later</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Same-day doctor note proves full mental fitness
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: COPY-PASTE TEMPLATE 1 - BULLETPROOF DISINHERITANCE CLAUSE */}
            <section id="bulletproof-disinheritance-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Bulletproof Disinheritance Clause Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use this full disinheritance clause format when cutting out an estranged or abusive son from your
                self-acquired house. Replace the bracketed fields with your exact facts.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Bulletproof Disinheritance Clause with Factual Recital &amp; Residuary Gift
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(bulletproofTemplateText, setCopiedMainClause)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedMainClause ? (
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
                  {bulletproofTemplateText}
                </pre>
              </div>
            </section>

            {/* SECTION 5: COPY-PASTE TEMPLATE 2 - IN TERROREM PENALTY CLAUSE BOX */}
            <section id="in-terrorem-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. In Terrorem Penalty Clause (Section 127)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                An <em>in terrorem</em> clause deters nuisance caveats by attaching a penalty to baseless lawsuits. Under
                Section 127 of the Indian Succession Act, never threaten an heir who challenges proven forgery. Instead,
                give a small conditional token bequest with an explicit gift-over.
              </p>

              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200/70">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    In Terrorem No-Contest Penalty Clause Box (With Gift-Over)
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(inTerroremTemplateText, setCopiedInTerrorem)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-rose-100 border border-rose-200 text-xs font-bold text-[#C65378] transition-colors cursor-pointer"
                  >
                    {copiedInTerrorem ? (
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
                  {inTerroremTemplateText}
                </pre>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-rose-200/70">
                    <div className="font-bold text-slate-900 mb-1">Why Gift-Over Matters</div>
                    <p className="text-slate-600">
                      Without a named gift-over heir, courts treat an <em>in terrorem</em> clause as an empty threat and
                      may ignore the forfeiture.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-rose-200/70">
                    <div className="font-bold text-slate-900 mb-1">Section 127 ISA Boundary</div>
                    <p className="text-slate-600">
                      Conditions contrary to law or public policy are void under Section 127. Exempting genuine forgery
                      claims keeps the clause valid.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: COPY-PASTE TEMPLATE 3 - MEDICAL SOUND MIND CERTIFICATE FORM */}
            <section id="medical-sound-mind-certificate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stethoscope className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 3</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Doctor Sound Mind Certificate Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Estranged heirs almost always claim the parent had memory loss or dementia. Have an MBBS or MD doctor
                sign this certificate on the same day you sign your Will.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Same-Day Medical Sound Disposing Mind Certificate Form
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(medicalCertificateText, setCopiedMedicalForm)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedMedicalForm ? (
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
                  {medicalCertificateText}
                </pre>
              </div>
            </section>

            {/* SECTION 7: LANDMARK JUDICIAL PRECEDENTS */}
            <section id="supreme-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK SUPREME COURT BENCHMARKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Supreme Court Rules: Venkatachala &amp; Kavita Kanwar
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  A Will speaks only after the Will maker dies. Since you cannot speak in court later, the Supreme Court
                  asks your chosen heir to clear all doubt about your Will:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)
                    </div>
                    <p className="text-xs text-slate-600">
                      The person proving the Will must win the trust of the judge. Cutting out close heirs with no
                      reason raises doubt that the Will maker was forced or confused.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. Kavita Kanwar v. Pamela Mehta &amp; Ors. (2020 SC, Civil Appeal No. 3688 of 2017)
                    </div>
                    <p className="text-xs text-slate-600">
                      When an excluded heir fights a Will and the main winner helped write or sign it, the court rejects
                      probate unless every doubt is cleared with solid proof.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. Ram Piari v. Bhagwant (1990) 3 SCC 364
                    </div>
                    <p className="text-xs text-slate-600">
                      Even when two witnesses sign and testify, cutting out close kids with no clear reason can lead the
                      court to set the Will aside.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: FACTUAL JUSTIFICATION EVIDENCE CHECKLIST */}
            <section id="factual-justification-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>PROOF SUPPORTING YOUR RECITAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Factual Justification Evidence Checklist
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Abuse &amp; Neglect Proof</span>
                    <span className="text-[10px] text-rose-600 font-bold">Senior Citizens Act</span>
                  </div>
                  <p className="text-slate-600">
                    Keep copies of police diary entries, Senior Citizens Tribunal orders, or hospital admission bills
                    showing your estranged relative stayed absent.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Prior Gift Records</span>
                    <span className="text-[10px] text-rose-600 font-bold">Bank &amp; SRO Proof</span>
                  </div>
                  <p className="text-slate-600">
                    Attach bank statements, education fee receipts, or past Gift Deed numbers if you already gave money
                    or land to the excluded heir earlier.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Independence Proof</span>
                    <span className="text-[10px] text-rose-600 font-bold">Kavita Kanwar Shield</span>
                  </div>
                  <p className="text-slate-600">
                    Keep lawyer invoices paid from your own bank account and ensure your chosen heir never sat inside
                    during drafting or registration.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL EXECUTION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Challenge-Proof Execution
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Verify Self-Acquired Title Deeds</div>
                      <p className="text-slate-600 mt-0.5">
                        Confirm the house or flat was bought with your own income. You cannot cut out a child&apos;s
                        birthright in ancestral HUF land.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Draft Calm Factual Recital + Residue</div>
                      <p className="text-slate-600 mt-0.5">
                        Name the estranged relative clearly, state true facts without rage, and include a 100% residuary
                        clause under Section 30 ISA.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Get Same-Day Medical Certificate</div>
                      <p className="text-slate-600 mt-0.5">
                        Visit an MBBS or MD doctor on the signing morning alone. Have them sign the Sound Mind Form.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Select Two Independent Witnesses</div>
                      <p className="text-slate-600 mt-0.5">
                        Pick two younger, healthy witnesses who are not beneficiaries and not related to the favored
                        heir under Section 67 ISA.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Exclude Favored Heir From Signing</div>
                      <p className="text-slate-600 mt-0.5">
                        Ensure the beneficiary inheriting the house waits completely outside while you read and sign the
                        Will before witnesses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Register at SRO &amp; Record Video</div>
                      <p className="text-slate-600 mt-0.5">
                        Register the Will in Book 3 at the Sub-Registrar Office and save a clear date-stamped video of
                        yourself explaining your choice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: FOUR FATAL MISTAKES */}
            <section id="fatal-disinheritance-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>PREVENT PROBATE REJECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Fatal Mistakes in Heir Exclusion
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Writing Only &quot;I Disinherit Him&quot;</span>
                  </div>
                  <p className="text-slate-600">
                    Giving zero factual reasons triggers the suspicious circumstances rule under <em>Kavita Kanwar</em>{" "}
                    and weakens probate.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Omitting a Residuary Clause</span>
                  </div>
                  <p className="text-slate-600">
                    Any cash, refund, or account missed from the Will passes by intestacy under Section 30 ISA straight
                    to the excluded son.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Favored Heir Sitting in the Room</span>
                  </div>
                  <p className="text-slate-600">
                    If the winning child calls the lawyer or attends signing, the court suspects undue influence under
                    Section 61 ISA.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Angry or Defamatory Rants</span>
                  </div>
                  <p className="text-slate-600">
                    Furious insults inside a Will let rival lawyers argue mental instability or emotional manipulation
                    before the judge.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE DUAL CONVERSION & DIAGNOSTIC SUITE */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>DUAL PROTECTION: SELF-SERVE WILL &amp; LITIGATION AUDIT</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Draft a Fight-Proof Will or Get a High Court Litigation Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Start your customized Will online with lawyer review or test your Will against contested probate traps
                using our diagnostic engines:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/start"
                  className="p-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white flex items-center justify-between transition-colors"
                >
                  <span>Start Will Online</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="/services/will-dispute-contest-litigation-lawyer"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Contested Will Audit</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/inofficious-will-contest-vulnerability-audit"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Exclusion Risk Audit</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Asset Title Checker</span>
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
                      WillDrafting.in Will Defense &amp; Drafting Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Will Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our testamentary advocates draft challenge-proof
                  exclusion Wills, coordinate Sub-Registrar Book 3 registration, and defend genuine Wills in High Court
                  probate suits across India.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/will-dispute-contest-litigation-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Contested Will Litigation Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Will Registration Desk</span>
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
                12. Frequently Asked Questions: Heir Exclusion
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
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
                13. Legal Rules &amp; Official Court Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Statutes &amp; Landmark Precedents:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Indian Succession Act, 1925 Section 30:</strong> Property not disposed by a valid Will
                      devolves as intestate estate.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 Section 59 &amp; 61:</strong> Sound mind freedom and invalidity
                      of Wills procured by coercion or fraud.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 Section 127:</strong> Conditional bequests contrary to law or
                      public policy are void.
                    </li>
                    <li>
                      <strong>Hindu Succession Act, 1956 Section 30:</strong> Testamentary disposal power over separate
                      and undivided coparcenary interests.
                    </li>
                    <li>
                      <strong>Supreme Court Benchmarks:</strong> <em>H. Venkatachala Iyengar v. B.N. Thimmajamma</em>{" "}
                      (AIR 1959 SC 443) and <em>Kavita Kanwar v. Pamela Mehta</em> (2020 SC).
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India</span>
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
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Estate Guides &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/caveat-against-probate-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Caveat Against Probate Format
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      General Disinheritance Clause Pack
                    </Link>
                    <Link
                      href="/templates/revocation-of-will-deed-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Revocation of Will Deed Format
                    </Link>
                    <Link
                      href="/templates/codicil-to-registered-will-amendment-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Codicil Amendment Will Format
                    </Link>
                    <Link
                      href="/tools/undue-influence-testamentary-capacity-risk-scorer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Undue Influence Risk Scorer
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your spouse and dutiful kids safe. It stops long court fights. You pick who gets
                  your house, land, shop, gold, and bank cash. Put your plan in writing early.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two
                  adult witnesses. Each witness signs in your view to make it valid.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your asset papers and drafts clean exclusion clauses. We guide your medical certificate
                  and registration steps so your wishes stay protected in court.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD (NO MOBILE NUMBER) */}
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
                Specialist in contested Will defense, High Court probate caveats, exclusion clause drafting, and Indian
                Succession Act litigation across India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - SELF-SERVE WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT PROBATE COURT CHALLENGES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Fight-Proof Will for Your Family
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Build a lawyer-checked Will with clear exclusion clauses and a complete residuary gift in 15 minutes.
                </p>
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Drafting Your Will</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doctor Form &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - LITIGATION AUDIT (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Gavel className="w-3 h-3" />
                  <span>LITIGATION AUDIT DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Expecting an Excluded Heir Lawsuit?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get your existing Will audited for suspicious circumstances under <em>Kavita Kanwar</em> or defend a
                  contested probate suit in High Court.
                </p>
                <Link
                  href="/services/will-dispute-contest-litigation-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Book Will Litigation Audit</span>
                </Link>
              </div>

              {/* CARD 4: FACTUAL JUSTIFICATION CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Exclusion Defense Pack</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(checklistCopyText, setCopiedChecklist)}
                    className="text-[11px] font-bold text-[#C65378] hover:underline cursor-pointer"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Full Relative Name &amp; Factual Reason</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 30 ISA Residuary Clause</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>In Terrorem Clause + Gift-Over</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Same-Day Doctor Sound Mind Form</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>SRO Filing &amp; Video Proof</span>
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
