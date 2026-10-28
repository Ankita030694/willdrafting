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
  Users,
  HeartHandshake,
  CheckSquare,
  AlertCircle,
  FileQuestion,
  Search,
  PenTool,
  Printer,
  Calendar,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-mandate", label: "1. Legal Mandate: Section 63(c) & 281 ISA" },
  { id: "bsa-evidence-rules", label: "2. BSA 2023 Section 67: Needed Witness Proof" },
  { id: "landmark-precedents", label: "3. Landmark Precedents: Janki Narayan to Iyengar" },
  { id: "dual-template-pack", label: "4. Dual Template Pack: Court & Contemporaneous" },
  { id: "comparison-table", label: "5. Comparison Table: Probate vs Contemporaneous" },
  { id: "interactive-tool", label: "6. Free Witness Competency Diagnostic Tool" },
  { id: "step-by-step-sop", label: "7. Step-by-Step SOP: Signing to Court Filing" },
  { id: "critical-defects", label: "8. Critical Legal Defects Causing Rejection" },
  { id: "deceased-witness-protocol", label: "9. Deceased or Hostile Witnesses Protocol" },
  { id: "institutional-profile", label: "10. Professional Legal Backing: AMA Legal" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
  { id: "statutory-citations", label: "12. Legal Citations & High Court Rules" },
];

const FAQS = [
  {
    q: "What is an sworn note of an signing witness for probate?",
    a: "An sworn note of an signing witness is a formal sworn statement required by Will courts. Under Section 281 of the Indian Succession Act, 1925, every petition for probate or letters of care must be checked by at least one signing witness. The witness deposes under oath that the Will maker signed the Will in their presence while possessing a sound and disposing mind.",
  },
  {
    q: "Why is a contemporaneous witness sworn note signed at the time of Will signing?",
    a: "A contemporaneous witness sworn note is signed on the very day the Will is signed. It records that both witnesses were physically present together, saw the Will maker sign of free will, and observed the Will maker in a sound state of mind. It serves as permanent preventative evidence, protecting the estate against future allegations of dementia, fraud, or coercion decades later.",
  },
  {
    q: "Does a filed Will exempt the propounder from calling an signing witness?",
    a: "No. The Supreme Court in Ramesh Verma v. Lajwanti (2017) and Babu Singh v. Ram Sahai (2008) ruled that filing before the SRO does not dispense with witness proof. Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 68 of the Evidence Act), a Will cannot be admitted in evidence until at least one signing witness is called to prove signing.",
  },
  {
    q: "What did the Supreme Court establish in Janki Narayan Bhoir v. Narayan Namdeo Kadam?",
    a: "In Janki Narayan Bhoir (2003) 2 SCC 91, the Supreme Court established that to prove a Will under Section 68 of the Evidence Act, the single witness examined must depose that the Will maker signed in the presence of both witnesses and that both witnesses signed in the presence of the Will maker. If the witness cannot depose to the signing by the co-witness, Section 68 is not satisfied.",
  },
  {
    q: "How is a Will proved in court if both signing witnesses have passed away?",
    a: "Under Section 68 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 69 of the Indian Evidence Act), if all signing witnesses are deceased or untraceable, the propounder must prove two things: (1) that the signature of at least one signing witness is in their handwriting, and (2) that the signature of the Will maker is in the Will maker's genuine handwriting.",
  },
  {
    q: "Can a heir under the Will sign as an signing witness?",
    a: "No, a heir should never act as an signing witness. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an signing witness or their spouse is void for Christians, Parsis, and Jews. For Hindus, Sikhs, Buddhists, and Jains, while Section 67 is not legal, courts treat any Will attested by a heir with extreme suspicion.",
  },
  {
    q: "Can an executor of the Will sign the signing witness sworn note?",
    a: "Yes. Under Section 68 of the Indian Succession Act, 1925, an executor is legally competent to act as an signing witness, provided the executor does not receive a beneficial legacy or personal bequest under the Will. If the executor only receives reasonable office reimbursement, their witness signing remains legally sound.",
  },
  {
    q: "Before which office must the probate signing witness sworn note be sworn?",
    a: "For probate petitions in High Courts (such as Bombay, Calcutta, or Madras) or District Courts, the witness sworn note must be sworn before an Oath Commissioner appointed by the High Court, the Court Registrar, or an authorized Notary Public. For contemporaneous preventative sworn notes, signing before an Executive Magistrate or Notary Public with photographic proof is recommended.",
  },
  {
    q: "What is animus attestandi and why is it essential for witness signing?",
    a: "Animus attestandi is the specific legal intention to attest the signature of the Will maker on the Will. In K. Laxmanan v. Thekkayil Padmini (2009), the Supreme Court clarified that a person who signs merely as a scribe, draftsperson, or registering identifier does not automatically become an signing witness unless they signed with the conscious intention of witnessing signing.",
  },
  {
    q: "What happens if an signing witness turns hostile in court?",
    a: "If an signing witness turns hostile or denies signing, the propounder can invoke Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 71 of the Evidence Act). Under this section, the signing of the Will can be proved by other evidence, such as the testimony of the scribe, the registering officer, the attending doctor, or contemporaneous sworn notes.",
  },
];

const TEMPLATE_CONTEMPORANEOUS = `BEFORE THE EXECUTIVE MAGISTRATE / NOTARY PUBLIC AT [CITY, STATE]

CONTEMPORANEOUS AFFIDAVIT OF ATTESTING WITNESS
(Executed Simultaneously with the Last Will and Testament)

I, [Full Name of Witness 1], son/daughter/wife of [Father's / Husband's Name], aged about [Age] years, residing at [Full Residential Address], holding Aadhaar Card No. [XXXX-XXXX-XXXX] and PAN [XXXXXXXXXX], do hereby solemnly affirm and state on oath as follows:

1. ACQUAINTANCE WITH TESTATOR:
That I have known the Testator, Shri/Smt. [Full Name of Testator], aged about [Age] years, residing at [Testator's Residential Address], personally and intimately for the past [Number] years as a [state relationship, e.g., family friend, neighbour, professional associate].

2. PHYSICAL PRESENCE AT EXECUTION:
That on [Day], the [Date] day of [Month], [Year], at approximately [Time, e.g., 11:30 AM], I was personally present at [Execution Venue, e.g., the residence of the Testator at Flat No. 402, Green Enclave, New Delhi - 110017] along with the second attesting witness, Shri/Smt. [Full Name of Witness 2], residing at [Address of Witness 2].

3. TESTAMENTARY CAPACITY & SOUND DISPOSING MIND:
That at the aforesaid time and place, the Testator was in full possession of their mental faculties, conscious, alert, and of sound disposing mind, memory, and understanding. The Testator was fully aware of the nature, extent, and value of their estate, and completely understood the effect and consequences of the bequests made in their Last Will and Testament dated [Date of Will].

4. VOLUNTARY EXECUTION WITHOUT INFLUENCE:
That the Testator executed the said Will of their own free will and volition, without any coercion, compulsion, fraud, misrepresentation, undue influence, or duress from any family member, beneficiary, or third party whatsoever.

5. SIMULTANEOUS EXECUTION & DUAL ATTESTATION (SECTION 63(c) ISA):
That the execution took place in the following sequential manner in the immediate physical presence of all three persons:
(a) The Testator read and approved each page of the Will, and then signed their name on the bottom of pages 1 to [Total Pages - 1], and affixed their full signature on page [Final Page] in my presence and in the presence of [Name of Witness 2].
(b) Immediately thereafter, at the personal request of the Testator and in their continuous sight and presence, I signed my name as Attesting Witness No. 1 on page [Final Page].
(c) Simultaneously, Shri/Smt. [Name of Witness 2], at the request of the Testator and in the continuous sight and presence of both the Testator and myself, signed their name as Attesting Witness No. 2 on page [Final Page].
(d) All three of us (the Testator and both attesting witnesses) were present together in the same room throughout the execution process and saw each other sign the document.

6. ABSENCE OF PERSONAL BENEFIT:
That neither I nor my spouse, children, or immediate relatives are beneficiaries, legatees, or recipients of any property, asset, or financial interest under the said Last Will and Testament. My attestation is purely disinterested, independent, and made with full animus attestandi.

7. MEDICAL CAPACITY CERTIFICATE:
That the Testator was examined immediately prior to execution by Dr. [Doctor's Name], MBBS/MD, Reg. No. [Medical Registration No.], who certified the sound mental capacity of the Testator, copy whereof is annexed hereto as ANNEXURE-A.

DEPONENT
(Signature of Attesting Witness No. 1)
Name: [Full Name]
Phone / Contact: [Contact Details]

VERIFICATION
I, the deponent above-named, do hereby verify and declare that the contents of paragraphs 1 to 7 of this affidavit are true and correct to my personal knowledge, that no part of it is false, and that nothing material has been concealed therefrom.
Verified at [City] on this [Date] day of [Month], [Year].

DEPONENT
(Signature of Attesting Witness No. 1)

ATTESTED & SWORN BEFORE ME:
[Seal and Signature of Notary Public / Executive Magistrate]`;

const TEMPLATE_PROBATE_COURT = `IN THE HIGH COURT OF JUDICATURE AT [BOMBAY / CALCUTTA / DELHI / MADRAS]
(TESTAMENTARY AND INTESTATE JURISDICTION)
[OR: IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE AT [DISTRICT / CITY]]

TESTAMENTARY PETITION NO. ________ OF 2026

IN THE MATTER OF:
The Indian Succession Act, 1925 (Section 281 & Section 276)
-AND-
IN THE MATTER OF:
The grant of Probate of the Last Will and Testament of [Full Name of Deceased Testator], deceased.

[Full Name of Petitioner / Executor]                  ... PETITIONER

AFFIDAVIT OF ATTESTING WITNESS UNDER SECTION 281 OF THE INDIAN SUCCESSION ACT, 1925

I, [Full Name of Witness], son/daughter/wife of [Father's / Husband's Name], aged about [Age] years, by occupation [Profession], residing at [Full Residential Address], do hereby solemnly affirm and declare on oath as follows:

1. That I was well acquainted with the deceased Testator, [Name of Deceased], during their lifetime, having known them for approximately [Number] years prior to their demise on [Date of Death].

2. That on the [Date] day of [Month], [Year of Execution], I was personally present at [Address of Execution Venue] together with [Full Name of Second Attesting Witness].

3. That the deceased Testator, [Name of Deceased], in our joint presence, affixed their signature [or thumb impression] at the foot of the testamentary paper now produced and shown to me, marked with the letter "A", and dated [Date of Will], purporting to be the Last Will and Testament of the deceased.

4. That the signature [or mark] appearing at the foot of page [Page No.] of Exhibit "A" is in the genuine handwriting of the deceased Testator, which I have seen them write and with which I am personally familiar.

5. That at the time the deceased Testator signed the said Will, they were of sound mind, memory, and disposing understanding, and to the best of my knowledge, belief, and observation, made the said dispositions voluntarily and without any undue influence, fraud, or coercion.

6. That at the request of the deceased Testator and in their physical presence, I subscribed my name as an attesting witness to the said Will.

7. That Shri/Smt. [Name of Second Attesting Witness], the other attesting witness whose signature appears on Exhibit "A", was also present at the same time and subscribed their name as an attesting witness to the said Will in the presence of the deceased Testator and in my presence.

8. That the deceased Testator, myself, and the said [Name of Second Witness] were all present together at the same time and place during the entire transaction, and we witnessed each other execute and attest the said Last Will and Testament.

DEPONENT
(Signature of Attesting Witness)

VERIFICATION UNDER SECTION 280 & 281 OF THE INDIAN SUCCESSION ACT, 1925
I, [Full Name of Deponent], one of the witnesses to the Last Will and Testament of the Testator mentioned in the above petition, do hereby declare that I was present and saw the said Testator affix their signature thereto as declared above. I verify that what is stated in paragraphs 1 to 8 of this affidavit is true to my own knowledge.

Solemnly affirmed at [City] on this [Date] day of [Month], 2026.

DEPONENT
Before me:
[Court Registrar / Oath Commissioner / Notary Public]
Seal of the Court / Notary`;

const TEMPLATE_DECEASED_WITNESS = `IN THE COURT OF THE DISTRICT JUDGE AT [CITY / DISTRICT]
TESTAMENTARY CASE NO. ________ OF 2026

IN THE MATTER OF:
The Last Will and Testament of [Late Name of Testator], Deceased.
-AND-
IN THE MATTER OF:
Section 68 of the Bharatiya Sakshya Adhiniyam, 2023 (Section 69 of the Indian Evidence Act, 1872)

AFFIDAVIT IN PROOF OF HANDWRITING OF DECEASED ATTESTING WITNESS & TESTATOR

I, [Full Name of Deponent], son/daughter/wife of [Father's / Husband's Name], aged [Age] years, residing at [Full Address], do hereby solemnly affirm and state on oath as follows:

1. ACQUAINTANCE WITH DECEASED PARTIES:
That I am the [state relationship, e.g., son, business partner, colleague] of Late Shri [Name of Deceased Attesting Witness 1], who was one of the attesting witnesses to the Last Will and Testament dated [Date of Will] executed by Late Shri [Name of Testator].

2. DEMISE OF ATTESTING WITNESSES:
That both attesting witnesses to the said Will are now deceased:
(a) Shri [Name of Witness 1] passed away on [Date of Death] at [Place of Death]. A certified copy of their Municipal Death Certificate is annexed hereto as EXHIBIT-A1.
(b) Shri [Name of Witness 2] passed away on [Date of Death] at [Place of Death]. A certified copy of their Municipal Death Certificate is annexed hereto as EXHIBIT-A2.

3. PROOF OF HANDWRITING OF ATTESTING WITNESS (SECTION 68 BSA 2023):
That I have frequently seen Late Shri [Name of Witness 1] write and sign their name during their lifetime on numerous official and personal documents. Having examined the original Will dated [Date of Will] (marked Exhibit "W"), I depose that the signature appearing against the label "Attesting Witness No. 1" on page [Page No.] is in the genuine and authentic handwriting of Late Shri [Name of Witness 1].

4. PROOF OF HANDWRITING OF TESTATOR:
That I was also intimately acquainted with Late Shri [Name of Testator], having seen them write and sign repeatedly over [Number] years. I solemnly depose that the signature appearing on pages [X to Y] and the execution signature on the final page of Exhibit "W" is in the genuine handwriting of the Testator.

DEPONENT
Verified at [City] on this [Date] day of [Month], 2026.
DEPONENT
Sworn before me: [Oath Commissioner / Notary Public]`;

const TEMPLATE_OATH_VERIFICATION = `STATUTORY VERIFICATION & OATH ENDORSEMENT CLAUSE
(Compliant with Section 281 ISA, High Court Testamentary Rules & Oaths Act, 1969)

"I, [Deponent Full Name], one of the witnesses to the Last Will and Testament of the Testator mentioned in the accompanying petition, do hereby declare on solemn oath that I was present and saw the said Testator affix their signature [or mark] thereto, and that the said Testator acknowledged the writing annexed to the petition to be their Last Will and Testament in my presence, and that I, together with [Co-Witness Name], subscribed our names as attesting witnesses in the presence of the said Testator and at their request.

I do hereby verify and declare that the statements made in paragraphs [1] to [X] of the accompanying affidavit are true to my personal knowledge, and I sign this verification at [City] on this [Date] day of [Month], 2026."

DEPONENT SIGNATURE: _______________________
NAME: [Full Legal Name]
IDENTIFIED BY ME: [Advocate Name, Enrolment No.]

OATH COMMISSIONER / NOTARY ENDORSEMENT:
Sworn to and signed before me on this [Date] day of [Month], 2026 by the deponent who is personally known to me / identified by Advocate [Name]. The contents of this affidavit were read over and explained to the deponent in [Language], who seemed perfectly to understand the same and signed in my presence.

[SEAL & SIGNATURE OF OATH COMMISSIONER / NOTARY PUBLIC]`;

export default function AttestingWitnessAffidavitClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-mandate");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"contemporaneous" | "probate_court" | "deceased_witness" | "oath_verification">("contemporaneous");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Diagnostic Tool State
  const [witnessCount, setWitnessCount] = useState<number>(2);
  const [simultaneousPresence, setSimultaneousPresence] = useState<boolean>(true);
  const [isBeneficiary, setIsBeneficiary] = useState<boolean>(false);
  const [hasMedicalCert, setHasMedicalCert] = useState<boolean>(true);
  const [animusAttestandi, setAnimusAttestandi] = useState<boolean>(true);
  const [witnessAlive, setWitnessAlive] = useState<boolean>(true);

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

  const handleCopy = (text: string, tabKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(tabKey);
    setTimeout(() => {
      setCopiedState(null);
    }, 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Evaluation logic for Interactive Diagnostic Tool
  let riskScore = 0;
  const issues: string[] = [];
  const strengths: string[] = [];

  if (witnessCount < 2) {
    riskScore += 50;
    issues.push("Fatal defect: Section 63(c) requires a minimum of 2 attesting witnesses.");
  } else {
    strengths.push("Compliant with Section 63(c) 2-witness minimum requirement.");
  }

  if (!simultaneousPresence) {
    riskScore += 25;
    issues.push("High litigation risk: Under Janki Narayan Bhoir doctrine, single witness cannot prove co-witness execution unless both were present together.");
  } else {
    strengths.push("Both witnesses present simultaneously, satisfying Janki Narayan Bhoir rule.");
  }

  if (isBeneficiary) {
    riskScore += 35;
    issues.push("Severe vulnerability: Beneficiary attestation triggers Section 67 disqualification or severe judicial suspicion.");
  } else {
    strengths.push("Independent witness without personal financial interest.");
  }

  if (!animusAttestandi) {
    riskScore += 30;
    issues.push("Defect under K. Laxmanan (2009): Signature without intention to attest does not count as attestation.");
  } else {
    strengths.push("Clear animus attestandi established under legal standards.");
  }

  if (!hasMedicalCert) {
    riskScore += 15;
    issues.push("Vulnerable to dementia/undue influence challenges without a medical capacity certificate.");
  } else {
    strengths.push("Testamentary capacity backed by certified medical practitioner.");
  }

  let verdict = "Optimal Probate Readiness";
  let verdictColor = "text-emerald-700 bg-emerald-50 border-emerald-200";

  if (riskScore >= 45) {
    verdict = "Severe Legal Defects (Probate Likely Denied)";
    verdictColor = "text-rose-800 bg-rose-50 border-rose-200";
  } else if (riskScore > 15) {
    verdict = "Moderate Litigation Vulnerability";
    verdictColor = "text-amber-800 bg-amber-50 border-amber-200";
  }

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Background ambient decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C65378]/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 -left-20 w-80 h-80 rounded-full bg-[#5F7E75]/[0.05] blur-3xl"
      />

      {/* =========================================================================
          LAYER 1: HERO HEADER SECTION (Dark Navy Theme matching Capital Gains)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#172228] via-[#172228]/95 to-[#172228]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#C65378]/10 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium">Signing Witness Sworn Note</span>
          </nav>

          {/* Statutory Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-wider uppercase text-rose-200 mb-6 backdrop-blur-sm">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTION 63(c) &amp; 281 • BSA 2023 SEC 67</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Sworn Note of Signing Witness for Probate of Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download legally validated sworn notes for signing witnesses under <strong>Section 281 of the Indian Succession Act</strong> and <strong>Section 67 of the Bharatiya Sakshya Adhiniyam, 2023</strong>. Includes both court probate filings and preventative contemporaneous signing drafts.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#dual-template-pack"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Download Dual Sworn Note Pack</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 281 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY PROBATE VERIFICATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">BSA 2023 § 67</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WITNESS PROOF MANDATE (EX-SEC 68)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Janki Narayan Rule</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DUAL EXECUTION STANDARD (SC 2003)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Dual Formats</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PREVENTATIVE &amp; COURT READY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tools)
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

            {/* Statutory Authority Badge Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Governance</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 63(c), 67, 68, 280, and 281 of the Indian Succession Act, 1925, read with Sections 67, 68, and 70 of the Bharatiya Sakshya Adhiniyam, 2023, and High Court Will Rules.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* Visual Hero Banner Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/attesting-witness-affidavit-probate-format-og.jpg"
                  alt="Affidavit of Attesting Witness for Probate of Will Format Indian Succession Act Legal"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-rose-50/40 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#C65378]" />
                  <span className="font-semibold text-slate-800">
                    Official Judicial Sworn Note Template Pack for Indian Testamentary Courts
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5F7E75]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High Court Will Bench Compliant</span>
                </div>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: ATTESTING WITNESS AFFIDAVIT RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Needed Section 281 Check:</strong> Under Section 281 of the Indian Succession Act, 1925, no court will register or issue probate without a check declaration signed by at least one signing witness to the Will.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Filing Does Not Prove Signing:</strong> Registering a Will before the SRO does not eliminate the rule to produce an signing witness in court. Under Section 67 BSA 2023 (former Section 68 IEA), witness proof is needed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Janki Narayan Precedent:</strong> Under the Supreme Court ruling in <em>Janki Narayan Bhoir (2003)</em>, the deponent must expressly testify that the Will maker signed before both witnesses and that both witnesses signed in the Will maker's presence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Protection Strategy:</strong> Signing a contemporaneous witness sworn note at the time of Will drafting permanently preserves vital evidence of mental fitness and simultaneous presence, thwarting future fights.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY MANDATE */}
            <section id="statutory-mandate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Mandate: Section 63(c) &amp; Section 281 ISA
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Will is a solemn legal instrument that speaks only after the death of the person who wrote it. Because the Will maker is no longer alive to testify to their intentions, Indian law erects stringent legal safeguards around the signing and proof of Wills.
                </p>
                <p>
                  Under <strong>Section 63(c) of the Indian Succession Act, 1925</strong>, every non-privileged Will must be attested by two or more witnesses. Each witness must either see the Will maker sign or affix their mark, or receive a personal acknowledgment of signature directly from the Will maker. Crucially, each witness must sign the Will in the physical presence of the Will maker.
                </p>
                <p>
                  When the executor applies for a grant of probate or letters of care with the Will annexed, <strong>Section 281 of the Act</strong> mandates that the probate petition itself must be formally checked by at least one signing witness. Without this checked declaration, the Will registry of the High Court or District Court will reject the petition at the threshold stage.
                </p>
              </div>
            </section>

            {/* SECTION 2: EVIDENCE ACT & BSA 2023 */}
            <section id="bsa-evidence-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>EVIDENCE ACT &amp; BHARATIYA SAKSHYA ADHINIYAM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. BSA 2023 Section 67: Why Filed Wills Need Witnesses
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families believe that registering a Will at the SRO office (SRO) makes it self-proving and immune to legal fight. This is a hazardous misconception.
                </p>
                <p>
                  Under <strong>Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>, which replaced Section 68 of the Indian Evidence Act, 1872, any paper required by law to be attested cannot be accepted as evidence in court until at least one signing witness is called to prove signing.
                </p>
                <p>
                  While Section 67 BSA provides an exemption for filed deeds where signing is not mainly denied, the statute contains an express, non-negotiable exception: <em>&ldquo;Provided that it shall not be necessary to call an signing witness in proof of the signing of any paper, not being a will, which has been filed...&rdquo;</em>
                </p>
                <p>
                  This means a filed Will receives <strong>zero legal exemption</strong>. Whether your Will is filed in Delhi, Mumbai, Bengaluru, or Chennai, the propounder must produce an signing witness who can depose to the signing under oath.
                </p>
              </div>
            </section>

            {/* SECTION 3: LANDMARK PRECEDENTS */}
            <section id="landmark-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Landmark Precedents: Janki Narayan Bhoir to Iyengar
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Supreme Court of India has established authoritative jurisprudence defining what an signing witness sworn note must contain:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91
                    </div>
                    <div className="text-xs font-black text-slate-900">
                      The Dual Signing Deposition Standard
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court held that examining one signing witness satisfies the law only if that witness deposes not merely to their own signature, but also confirms that the Will maker signed before both witnesses and that the co-witness signed in the Will maker&rsquo;s presence. If the witness cannot depose to the co-witness&rsquo;s presence, the Will fails.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)
                    </div>
                    <div className="text-xs font-black text-slate-900">
                      Dispelling Suspicious Circumstances
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The historic constitutional bench ruled that the propounder must prove sound Will mind and dispel all suspicious circumstances (such as unnatural gifts or active participation of the heir). A detailed witness sworn note is the primary defense against such suspicions.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      K. Laxmanan v. Thekkayil Padmini (2009) 1 SCC 354
                    </div>
                    <div className="text-xs font-black text-slate-900">
                      Rule of Animus Attestandi
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court established that an signing witness must sign with <em>animus attestandi</em> (the conscious intention to attest the signing). A scribe, lawyer draftsperson, or SRO identifier who signs for office ID cannot be treated as an signing witness unless animus is proven.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Ramesh Verma v. Lajwanti (2017) 1 SCC 257
                    </div>
                    <div className="text-xs font-black text-slate-900">
                      Filing Does Not Prove Witness Signing
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Affirmed that Section 68 of the Evidence Act (Section 67 BSA 2023) is needed even for filed Wills. The Court reiterated that the endorsement of the registering officer cannot substitute the substantive deposition of an signing witness.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: DUAL TEMPLATE PACK */}
            <section id="dual-template-pack" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY DUAL TEMPLATE PACK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Dual Template Pack: Court Probate &amp; Contemporaneous
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select between the <strong>Contemporaneous Preventative Sworn Note</strong> (to execute alongside your Will today) and the <strong>High Court / District Court Probate Petition Sworn Note</strong> (for filing under Section 281 ISA post-demise).
              </p>

              {/* Template Tabs Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab("contemporaneous")}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "contemporaneous"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Contemporaneous Sworn Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("probate_court")}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "probate_court"
                        ? "bg-[#172228] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Probate Court Sworn Note (Sec 281)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("deceased_witness")}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "deceased_witness"
                        ? "bg-[#5F7E75] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Deceased Witness Proof (Sec 68 BSA)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("oath_verification")}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "oath_verification"
                        ? "bg-slate-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Scroll className="w-3.5 h-3.5" />
                    <span>Legal Oath Endorsement</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div>
                  {activeTab === "contemporaneous" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-rose-50/70 border border-[#C65378]/20">
                        <div>
                          <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                            TEMPLATE 1: CONTEMPORANEOUS WITNESS AFFIDAVIT
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Execute before Notary Public on the day of Will signing. Safeguards against future dementia or coercion fights.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(TEMPLATE_CONTEMPORANEOUS, "contemporaneous")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] text-white text-xs font-bold hover:bg-[#a33b5c] transition-colors shrink-0 shadow-2xs"
                        >
                          {copiedState === "contemporaneous" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Template!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Template</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800 whitespace-pre-wrap">
                        {TEMPLATE_CONTEMPORANEOUS}
                      </pre>
                    </div>
                  )}

                  {activeTab === "probate_court" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 border border-slate-300">
                        <div>
                          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            TEMPLATE 2: HIGH COURT / DISTRICT COURT SECTION 281 PROBATE AFFIDAVIT
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Required to be filed by the propounder in Bombay, Calcutta, Delhi, or District Courts to verify the petition.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(TEMPLATE_PROBATE_COURT, "probate_court")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 shadow-2xs"
                        >
                          {copiedState === "probate_court" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Template!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Template</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800 whitespace-pre-wrap">
                        {TEMPLATE_PROBATE_COURT}
                      </pre>
                    </div>
                  )}

                  {activeTab === "deceased_witness" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                        <div>
                          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            TEMPLATE 3: DECEASED WITNESS HANDWRITING AFFIDAVIT (BSA § 68)
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Used when both signing witnesses have passed away or cannot be traced. Proves handwriting under BSA Section 68.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(TEMPLATE_DECEASED_WITNESS, "deceased_witness")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5F7E75] text-white text-xs font-bold hover:bg-[#4d665f] transition-colors shrink-0 shadow-2xs"
                        >
                          {copiedState === "deceased_witness" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Template!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Template</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800 whitespace-pre-wrap">
                        {TEMPLATE_DECEASED_WITNESS}
                      </pre>
                    </div>
                  )}

                  {activeTab === "oath_verification" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
                        <div>
                          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            TEMPLATE 4: STATUTORY VERIFICATION &amp; OATH COMMISSIONER CLAUSE
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Formal witness signing endorsement clause under the Oaths Act, 1969 and High Court Original Side Rules.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(TEMPLATE_OATH_VERIFICATION, "oath_verification")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors shrink-0 shadow-2xs"
                        >
                          {copiedState === "oath_verification" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Template!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Template</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800 whitespace-pre-wrap">
                        {TEMPLATE_OATH_VERIFICATION}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 5: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Comparison Table: Probate vs Contemporaneous Sworn Note
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding the legal distinction between a contemporaneous witness sworn note and a post-death probate court sworn note is critical for estate planning.
              </p>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                <table className="w-full text-left text-xs md:text-sm text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Legal Parameter</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Contemporaneous Sworn Note</th>
                      <th className="py-3.5 px-4 text-slate-900">Section 281 Court Sworn Note</th>
                      <th className="py-3.5 px-4 text-[#5F7E75]">SRO SRO Endorsement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Timing of Signing</td>
                      <td className="py-3 px-4">Same day as Will signing</td>
                      <td className="py-3 px-4">Post-death (during probate petition)</td>
                      <td className="py-3 px-4">Day of SRO filing</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Legal Governing Law</td>
                      <td className="py-3 px-4">Indian Oaths Act, 1969 &amp; Sec 63 ISA</td>
                      <td className="py-3 px-4">Section 281 Indian Succession Act</td>
                      <td className="py-3 px-4">Section 58 Filing Act, 1908</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Primary Evidential Purpose</td>
                      <td className="py-3 px-4">Freezes evidence of sound mind &amp; voluntariness</td>
                      <td className="py-3 px-4">Proves signing to obtain court probate grant</td>
                      <td className="py-3 px-4">Confirms identity of presenter to Registrar</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Office Before Whom Sworn</td>
                      <td className="py-3 px-4">Executive Magistrate / Notary Public</td>
                      <td className="py-3 px-4">High Court Oath Commissioner / Registrar</td>
                      <td className="py-3 px-4">SRO of Assurances</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">If Witness Dies Decades Later</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Admissible under Sec 26 BSA (former Sec 32 IEA)</td>
                      <td className="py-3 px-4 text-rose-700">Cannot be signed; must invoke Sec 68 BSA</td>
                      <td className="py-3 px-4 text-amber-700">Does not prove animus attestandi in court</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-semibold text-slate-900">Protection Against Suspicion</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Maximum (accompanied by medical cert)</td>
                      <td className="py-3 px-4 font-semibold">Standard procedural compliance</td>
                      <td className="py-3 px-4">Moderate (often challenged on capacity)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: INTERACTIVE DIAGNOSTIC TOOL */}
            <section id="interactive-tool" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Free Witness Competency &amp; Legal Eligibility Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Test your signing witnesses against Section 63(c) ISA, Section 67 BSA, and Supreme Court rulings to identify potential legal risks before court submission.
              </p>

              {/* Tool Widget Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Witness Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Number of Witnesses</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWitnessCount(1)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          witnessCount === 1
                            ? "bg-rose-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        1 Witness (Defective)
                      </button>
                      <button
                        type="button"
                        onClick={() => setWitnessCount(2)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          witnessCount >= 2
                            ? "bg-[#172228] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        2+ Witnesses (Valid)
                      </button>
                    </div>
                  </div>

                  {/* Simultaneous Presence */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Simultaneous Presence</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSimultaneousPresence(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          simultaneousPresence
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Together in Room
                      </button>
                      <button
                        type="button"
                        onClick={() => setSimultaneousPresence(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !simultaneousPresence
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Signed Separately
                      </button>
                    </div>
                  </div>

                  {/* Beneficiary Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Witness Heir Check</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsBeneficiary(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !isBeneficiary
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Independent Person
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBeneficiary(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          isBeneficiary
                            ? "bg-rose-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Heir / Spouse
                      </button>
                    </div>
                  </div>

                  {/* Animus Attestandi */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Animus Attestandi</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAnimusAttestandi(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          animusAttestandi
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Intended as Witness
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnimusAttestandi(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !animusAttestandi
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Merely Scribe/Identifier
                      </button>
                    </div>
                  </div>

                  {/* Medical Capacity Certificate */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Medical Capacity Paper</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHasMedicalCert(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          hasMedicalCert
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Doctor Certified
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasMedicalCert(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !hasMedicalCert
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        No Medical Cert
                      </button>
                    </div>
                  </div>

                  {/* Witness Availability */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Witness Current Status</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWitnessAlive(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          witnessAlive
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Alive &amp; Available
                      </button>
                      <button
                        type="button"
                        onClick={() => setWitnessAlive(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !witnessAlive
                            ? "bg-rose-700 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Deceased / Untraceable
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Result Card */}
                <div className={`p-5 rounded-2xl border ${verdictColor} space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-black uppercase tracking-wider">
                      STATUTORY DIAGNOSTIC VERDICT: {verdict}
                    </div>
                    <div className="text-xs font-bold">
                      Calculated Vulnerability Index: {riskScore}/100
                    </div>
                  </div>

                  {issues.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-rose-900 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Identified Legal Risks:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                        {issues.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {strengths.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Checked Legal Safeguards:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                        {strengths.map((strength, idx) => (
                          <li key={idx}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!witnessAlive && (
                    <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-xl text-xs text-amber-900 leading-relaxed">
                      <strong>Legal Recovery Step:</strong> Because witnesses are deceased, invoke Section 68 of the Bharatiya Sakshya Adhiniyam, 2023. File an sworn note proving the handwriting of at least one witness and the genuine signature of the Will maker (use Template 3 above).
                    </div>
                  )}
                </div>

                {/* Contextual Link to Tools */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">Planning the Transfer of Inherited Asset?</div>
                    <div className="text-slate-600">
                      Calculate long-term capital gains tax, Section 49(1) cost basis, and Budget 2024 grandfathering exemptions.
                    </div>
                  </div>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shrink-0"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Open Tax Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Signing, Swearing &amp; Court Filing
              </h3>
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-extrabold">
                      1
                    </div>
                    <span>Pre-Signing Medical Evaluation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Arrange for a Filed Medical Practitioner (MBBS/MD) to examine the Will maker within 24 to 48 hours of signing. The physician must issue a paper certifying that the Will maker is oriented in time, place, and person, and possesses Will disposing capacity.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-extrabold">
                      2
                    </div>
                    <span>Simultaneous Three-Party Signing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Gather the Will maker and both independent signing witnesses in the same room. Ensure the Will maker reads and initials each page and executes the final signature. Both witnesses must observe the signing, and right away sign as witnesses in the Will maker&rsquo;s presence and in view of each other.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-extrabold">
                      3
                    </div>
                    <span>Signing the Contemporaneous Sworn Note</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Have both signing witnesses execute the Contemporaneous Sworn Note (Template 1) on non-judicial stamp paper before a Notary Public or Executive Magistrate. Attach the medical paper, passport photos, and government photo IDs as annexures.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-extrabold">
                      4
                    </div>
                    <span>A Choice SRO Filing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Present the original Will at the SRO office having area over the Will maker&rsquo;s residence. Both witnesses should appear as identifiers to register the paper under Section 18(e) of the Filing Act, 1908.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-extrabold">
                      5
                    </div>
                    <span>Post-Death Section 281 Probate Filing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Upon the demise of the Will maker, the executor files a probate petition in the competent court. Have at least one signing witness execute the Section 281 sworn note (Template 2) before the Court Registrar or an authorized High Court Oath Commissioner.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: CRITICAL DEFECTS */}
            <section id="critical-defects" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>JUDICIAL RISK PREVENTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Critical Legal Defects Causing Sworn Note Rejection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Omission of Co-Witness Deposition</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the <em>Janki Narayan Bhoir</em> doctrine, if the deponent states only &ldquo;I signed in the Will maker&rsquo;s presence&rdquo; without expressly stating that the co-witness also signed in the Will maker&rsquo;s presence, the court cannot grant probate.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Heir Acting as Witness</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 67 ISA, any bequest to an signing witness is completely void for Christians and Parsis. For Hindus, courts view heir witness signing as a strong badge of undue influence.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Signing Without Animus Attestandi</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <em>K. Laxmanan (2009)</em>, the Supreme Court held that signing merely as a typist, scribe, or SRO identifier does not count as witness signing unless the witness signed mainly to attest signing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Defective Check Clause</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Failing to verify the sworn note under Section 280 ISA and the Oaths Act, or stating vague check such as &ldquo;true to the best of my information and belief&rdquo; instead of &ldquo;true to my personal knowledge&rdquo;, leads to dismissal.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: DECEASED OR HOSTILE WITNESSES */}
            <section id="deceased-witness-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>CONTINGENCY EVIDENCE PROCEDURES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Deceased or Hostile Witnesses: Section 68 BSA Protocol
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Because Wills often surface decades after signing, it is very common for both signing witnesses to have passed away or become incapacitated by the time probate is sought.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">
                    Section 68 BSA 2023 (Former Section 69 Indian Evidence Act)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When no signing witness can be found or produced, the law permits secondary proof. The propounder must prove through an acquaintance sworn note (Template 3) that:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                    <li>The witness signing of at least one witness is in their genuine handwriting.</li>
                    <li>The signature of the Will maker is in the Will maker&rsquo;s authentic handwriting.</li>
                    <li>Official certified death papers of both witnesses are filed on record.</li>
                  </ul>
                </div>
                <p>
                  If an signing witness turns hostile in court and colludes with disgruntled legal heirs to deny signing, Section 70 of BSA 2023 (former Section 71 IEA) empowers the propounder to prove signing through other evidence, including the testimony of the scribe, attending doctor, and contemporaneous notarized sworn notes.
                </p>
              </div>
            </section>

            {/* SECTION 10: PROFESSIONAL BACKING */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; ADVOCATE BACKING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Professional Legal Backing: AMA Legal Solutions
              </h3>
              <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">
                      Lawyer Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Estate Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Will Litigator &amp; High Court Probate Expert
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The Will formats and legal protocols published on WillDrafting are curated by Lawyer Anuj Anand Malik and the estate court fights team at AMA Legal Solutions. With extensive experience before High Courts and Will benches across India, our counsel have handled complex probate fights, hostile witness cross-examinations, and Section 281 ISA verifications.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-center text-xs font-bold text-slate-700 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <div className="text-[#C65378] text-base font-extrabold">100%</div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Legal Compliance</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <div className="text-[#C65378] text-base font-extrabold">Section 281</div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Checked Wording</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 col-span-2 sm:col-span-1">
                    <div className="text-[#C65378] text-base font-extrabold">High Court</div>
                    <div className="text-[11px] text-slate-500 uppercase mt-0.5">Registry Ready</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Signing Witness Rules
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 12: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; HIGH COURT RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Citations &amp; High Court Procedural Rules
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Statute / Rule</th>
                      <th className="py-3 px-4">Section / Rule</th>
                      <th className="py-3 px-4">Subject Matter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Indian Succession Act, 1925</td>
                      <td className="py-2.5 px-4">Section 63(c)</td>
                      <td className="py-2.5 px-4">Needed witness signing by two or more witnesses</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Indian Succession Act, 1925</td>
                      <td className="py-2.5 px-4">Section 281</td>
                      <td className="py-2.5 px-4">Check of petition for probate by signing witness</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Bharatiya Sakshya Adhiniyam, 2023</td>
                      <td className="py-2.5 px-4">Section 67 (Ex-Sec 68 IEA)</td>
                      <td className="py-2.5 px-4">Proof of signing of paper required by law to be attested</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Bharatiya Sakshya Adhiniyam, 2023</td>
                      <td className="py-2.5 px-4">Section 68 (Ex-Sec 69 IEA)</td>
                      <td className="py-2.5 px-4">Proof where no signing witness can be found (deceased witnesses)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Bombay High Court Rules</td>
                      <td className="py-2.5 px-4">Rules 374 to 400</td>
                      <td className="py-2.5 px-4">Rules for Will and No-Will Petitions &amp; Affidavits</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Delhi High Court (Original Side) Rules</td>
                      <td className="py-2.5 px-4">Chapter XXIX</td>
                      <td className="py-2.5 px-4">Will and No-Will Area check standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Strictly matching Capital Gains)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR / COUNSEL BIO CARD */}
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
                Expert in Indian testamentary jurisprudence, High Court probate petitions, Section 281 witness verifications, and contested estate defense pan-India.
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
            <div className="space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT FUTURE WITNESS CHALLENGES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Fight-Proof Will with Inbuilt Witness Signing Safeguards
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our guided digital engine includes legal witness signing clauses, doctor fitness annexures, and Section 63(c) dual-witness protocols.
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
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card - NO PHONE NUMBERS) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PROBATE LITIGATION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Filing a Probate Petition or Facing Hostile Witnesses?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Will litigators handle High Court Section 281 petitions, deceased witness handwriting proof under BSA Section 68, and caveat defense pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: QUICK ATTESTATION CHECKLIST */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#172228] uppercase tracking-wider">
                  <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span>5 Rules of Legal Witness Signing</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Minimum 2 adult witnesses required by law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Witnesses must not be heirs or their spouses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Both must see Will maker sign and sign in Will maker&rsquo;s sight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Must sign with clear animus attestandi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Attach contemporaneous medical fitness paper</span>
                  </li>
                </ul>
              </div>

              {/* CARD 5: RELATED LEGAL SERVICES */}
              <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-5 space-y-2.5 text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Will Services
                </div>
                <div className="space-y-1.5">
                  <Link
                    href="/services/probate-lawyer"
                    className="block p-2 rounded-xl bg-white hover:bg-rose-50/50 border border-slate-200/80 transition-colors font-medium text-slate-800"
                  >
                    High Court Probate Lawyer Services →
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="block p-2 rounded-xl bg-white hover:bg-rose-50/50 border border-slate-200/80 transition-colors font-medium text-slate-800"
                  >
                    SRO Will Filing →
                  </Link>
                  <Link
                    href="/templates"
                    className="block p-2 rounded-xl bg-white hover:bg-rose-50/50 border border-slate-200/80 transition-colors font-medium text-slate-800"
                  >
                    View All 30+ Legal Will Templates →
                  </Link>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
