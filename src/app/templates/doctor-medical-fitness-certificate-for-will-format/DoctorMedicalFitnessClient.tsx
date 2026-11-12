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
  Scale,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  MapPin,
  Copy,
  CheckCheck,
  Users,
  FileText,
  FileSpreadsheet,
  Calculator,
  Stethoscope,
  ClipboardCheck,
  Brain,
  HeartPulse,
  Hospital,
  UserCheck,
  Stamp,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (matching H2/H3 IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Section 59 ISA & BSA Proof Rules" },
  { id: "mmse-score-tool", label: "2. Free MMSE Score & Fitness Tool" },
  { id: "comparison-table", label: "3. Generic Note vs Court Format" },
  { id: "mmse-checklist-box", label: "4. MMSE Cognitive Score Checklist" },
  { id: "nmc-guidelines-box", label: "5. NMC Guidelines Compliance Rules" },
  { id: "bedridden-sro-rules", label: "6. Bedridden & SRO Home Visit Rules" },
  { id: "doctor-certificate-template", label: "7. Doctor Certificate & Endorsement" },
  { id: "sro-execution-sop", label: "8. Same-Day Exam & SRO Steps" },
  { id: "supreme-court-precedents", label: "9. Supreme Court Sound Mind Tests" },
  { id: "case-studies", label: "10. Real Cases: 84-Yr & ICU Wills" },
  { id: "statutory-citations", label: "11. Citations, Portals & Guides" },
  { id: "frequently-asked-questions", label: "12. Medical Fitness Certificate FAQs" },
];

type ExecutionModeKey = "sro_office" | "home_visit" | "hospital_bedside";
type RiskProfileKey = "age_80_plus" | "excluded_heir" | "chronic_illness";

const EXECUTION_MODES: Record<
  ExecutionModeKey,
  {
    label: string;
    statute: string;
    note: string;
  }
> = {
  sro_office: {
    label: "Sub-Registrar Office Visit (Ambulatory)",
    statute: "Section 59 ISA & SRO Desk Practice",
    note: "Senior citizen visits the Sub-Registrar Office in person with same-day MBBS fitness note.",
  },
  home_visit: {
    label: "Home Visit by Sub-Registrar (Bedridden)",
    statute: "Registration Act, 1908 ss. 31 & 38",
    note: "Exempts physically infirm testator from office visit and proves sound mind at home.",
  },
  hospital_bedside: {
    label: "Hospital / ICU Bedside Execution",
    statute: "Section 59 Expl. 3 & 4 ISA + BSA s. 45",
    note: "Requires sedation review, lucid interval proof, and specialist MD or Neurologist note.",
  },
};

const RISK_PROFILES: Record<
  RiskProfileKey,
  {
    label: string;
    recommendedDoctor: string;
    extraProof: string;
  }
> = {
  age_80_plus: {
    label: "Elderly Testator (Age 75 to 95+)",
    recommendedDoctor: "MBBS Registered Medical Practitioner or MD Physician",
    extraProof: "Same-day MMSE score sheet plus clear Aadhaar photo ID check.",
  },
  excluded_heir: {
    label: "Disinheriting or Unequal Heir Split",
    recommendedDoctor: "MD General Medicine or Geriatric Specialist",
    extraProof: "Private exam with zero family members inside room plus video record.",
  },
  chronic_illness: {
    label: "Stroke, Parkinson's, Cancer, or Mild Memory Loss",
    recommendedDoctor: "MD Medicine, Neurologist, or Psychiatrist",
    extraProof: "Full medicine chart check plus lucid interval note under Sec 59 Expl. 3.",
  },
};

const FAQS = [
  {
    q: "Is a doctor medical fitness certificate mandatory for Will registration in India?",
    a: "The Indian Succession Act, 1925 does not force every person to add a doctor note. Still, Sub-Registrars routinely ask for an MBBS or MD fitness note when a Will maker is over 70 or 80, weak, or bedridden. Even for a plain-paper Will, a same-day doctor form gives strong proof of a sound mind.",
  },
  {
    q: "Which doctor can sign a mental fitness certificate for a Will?",
    a: "Any Registered Medical Practitioner (RMP) with at least an MBBS degree and a live State Medical Council or NMC number can sign it. If the Will maker had a stroke, dementia, or mental care, an MD doctor, brain doctor, or mind specialist holds more weight in court.",
  },
  {
    q: "Why do short two-line doctor notes fail in Indian probate courts?",
    a: "A short slip saying 'patient is fit' fails under Bharatiya Sakshya Adhiniyam Section 45 (and Section 39 on expert views), which checks the clinical basis of a view. Judges reject vague notes that skip photo ID checks, exam time, MMSE scores, drug checks, and Section 59 tests.",
  },
  {
    q: "What MMSE score supports testamentary sound mind for a Will?",
    a: "On the 30-point Mini-Mental State Exam (MMSE), a score of 24 to 30 shows normal thinking. A score of 19 to 23 shows mild drop, where a Will can still stay valid during a clear interval under Explanation 3 to Section 59 if a doctor records clear home and family recall.",
  },
  {
    q: "What medical certificate is needed for a bedridden testator home visit by the SRO?",
    a: "Under Sections 31 and 38 of the Registration Act, 1908, a sick or bedridden elder who cannot travel safely does not have to visit the office. The doctor note must prove two things: the person cannot travel due to bodily illness, and they stay alert enough to sign a Will.",
  },
  {
    q: "Can a beneficiary stay in the room during the doctor check?",
    a: "No. Under Supreme Court rulings like H. Venkatachala Iyengar and Kavita Kanwar v. Pamela Mehta, an active heir in the room raises court doubt. The doctor must check the Will maker alone so the form proves free choice and zero pressure under Section 61.",
  },
  {
    q: "Should the doctor certificate be dated on the exact day of Will signing?",
    a: "Yes. Sound mind under Section 59 is judged at the exact hour the Will is signed. A note dated weeks before or after holds weak court value. Get the doctor check done on the same morning or hours before signing.",
  },
  {
    q: "Can the same doctor also sign as a witness on the Will?",
    a: "Yes, as long as the doctor gets no gift and is not married to an heir under Section 67 of the Indian Succession Act. Having the doctor sign both the fitness note and as one of two witnesses under Section 63 adds strong proof.",
  },
];

export default function DoctorMedicalFitnessClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCert, setCopiedCert] = useState<boolean>(false);
  const [copiedMmse, setCopiedMmse] = useState<boolean>(false);
  const [copiedHomeVisit, setCopiedHomeVisit] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE MMSE SCORE & FITNESS TOOL
  // ==========================================
  const [testatorAge, setTestatorAge] = useState<number>(84);
  const [executionMode, setExecutionMode] = useState<ExecutionModeKey>("sro_office");
  const [riskProfile, setRiskProfile] = useState<RiskProfileKey>("age_80_plus");

  // 6 MMSE Domains (Total 30 points)
  const [mmseTime, setMmseTime] = useState<number>(5); // max 5
  const [mmsePlace, setMmsePlace] = useState<number>(5); // max 5
  const [mmseRegistration, setMmseRegistration] = useState<number>(3); // max 3
  const [mmseAttention, setMmseAttention] = useState<number>(4); // max 5
  const [mmseRecall, setMmseRecall] = useState<number>(3); // max 3
  const [mmseLanguage, setMmseLanguage] = useState<number>(8); // max 8
  const [mmseCopy, setMmseCopy] = useState<number>(1); // max 1

  const totalMmseScore =
    mmseTime +
    mmsePlace +
    mmseRegistration +
    mmseAttention +
    mmseRecall +
    mmseLanguage +
    mmseCopy;

  const isNormalCognition = totalMmseScore >= 24;
  const isMildImpairment = totalMmseScore >= 19 && totalMmseScore <= 23;

  const mmseVerdict = isNormalCognition
    ? {
        badge: "Normal Cognition (Strong Sec 59 Proof)",
        badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
        title: "Clear Testamentary Sound Mind Verified",
        advice:
          "Score supports full orientation, recall, and comprehension. Standard same-day MBBS or MD certificate with MMSE breakdown and Sub-Registrar endorsement is ideal.",
      }
    : isMildImpairment
    ? {
        badge: "Mild Cognitive Decline (Lucid Interval Protocol)",
        badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30",
        title: "Use Specialist MD + Section 59 Expl. 3 Safeguards",
        advice:
          "Record exact answers showing the testator knows their assets, close heirs, and bequest choices during a lucid interval. Pair with unedited video and MD evaluation.",
      }
    : {
        badge: "Moderate to Severe Decline (High Contest Risk)",
        badgeClass: "bg-rose-500/20 text-rose-300 border-rose-400/30",
        title: "Psychiatrist Capacity Assessment Required",
        advice:
          "Score below 19 carries high risk of court rejection under Section 59. Do not rely on a general note; seek formal Geriatric Psychiatrist testing before any execution.",
      };

  const selectedExec = EXECUTION_MODES[executionMode];
  const selectedRisk = RISK_PROFILES[riskProfile];

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

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const fullCertificateTemplateText = `[ON OFFICIAL CLINIC / HOSPITAL LETTERHEAD]
Dr. [Full Name of Registered Medical Practitioner]
Qualification: [MBBS / MD (General Medicine) / DM / Psychiatrist]
State Medical Council / NMC Reg. No.: [Registration Number]
Clinic / Hospital Address: [Full Clinic or Hospital Street Address, City, PIN]

Date of Examination: [DD/MM/YYYY]
Exact Time of Examination: [HH:MM AM/PM]
Certificate Ref. No.: [Clinic Ref / Year / Number]

TO WHOMSOEVER IT MAY CONCERN
(MEDICAL FITNESS CERTIFICATE FOR EXECUTION & REGISTRATION OF WILL)
(Issued under Section 59 of the Indian Succession Act, 1925, NMC Guidelines, and Sections 39 & 45 of the Bharatiya Sakshya Adhiniyam, 2023)

1. TESTATOR IDENTITY & VERIFICATION:
I hereby certify that I have personally examined [Shri / Smt. Full Legal Name of Testator], Son / Daughter / Wife of [Father's or Spouse's Name], aged [${testatorAge}] years, residing at [Complete Residential Address], on [DD/MM/YYYY] at [HH:MM AM/PM] at [Clinic / Testator's Residence / Hospital Room].
The identity of the above-named patient was verified against original Government Photo ID: [Aadhaar Card / Passport / PAN Last 4 Digits: XXXX], bearing photograph matching the person examined.

2. INDEPENDENT EXAMINATION (NO BENEFICIARY PRESENT):
I confirm that this clinical and mental status examination was conducted in private. No beneficiary, legatee, or interested family member named under the proposed Will was present inside the room or prompted the patient during the assessment.

3. CLINICAL & MMSE COGNITIVE FINDINGS (BSA SECTION 45 GROUNDS OF OPINION):
(a) General Condition: Patient is conscious, cooperative, alert, and oriented to time, place, and person.
(b) Medication & Sedation Review: Current prescription reviewed; patient is NOT under any heavy sedative, narcotic, delirium, or intoxication impairing independent judgment.
(c) Mini-Mental State Examination (MMSE) Score Recorded Today:
    - Orientation to Time (Max 5): [${mmseTime} / 5]
    - Orientation to Place (Max 5): [${mmsePlace} / 5]
    - Immediate Registration (Max 3): [${mmseRegistration} / 3]
    - Attention & Calculation (Max 5): [${mmseAttention} / 5]
    - Delayed Recall (Max 3): [${mmseRecall} / 3]
    - Language, Naming & 3-Step Command (Max 8): [${mmseLanguage} / 8]
    - Visuospatial Copying (Max 1): [${mmseCopy} / 1]
    TOTAL MMSE SCORE: [${totalMmseScore} / 30]

4. TESTAMENTARY SOUND DISPOSING MIND DECLARATION (SECTION 59 ISA, 1925):
Based on clinical interview in [English / Hindi / Regional Language], I confirm that [Shri / Smt. Full Name] possesses a sound disposing mind and full testamentary capacity as of this date and time, specifically demonstrating that he/she:
(i) Understands the legal nature and consequence of executing a Last Will and Testament;
(ii) Recalls the broad extent and location of his/her movable and immovable assets;
(iii) Identifies close family members and natural legal heirs and understands the practical effect of his/her bequests; and
(iv) Exhibits free volition without signs of delusion, hallucination, or external coercion.${
    executionMode === "home_visit" || executionMode === "hospital_bedside"
      ? `

5. PHYSICAL INFIRMITY & SUB-REGISTRAR HOME VISIT CERTIFICATION (SECTIONS 31 & 38, REGISTRATION ACT, 1908):
Due to [advanced age / post-operative recovery / orthopedic immobility / chronic physical ailment], the patient is physically unable to travel to the Sub-Registrar Office without risk or serious inconvenience. However, his/her cognitive faculties remain intact and he/she is fully mentally fit to execute and register the Will via Sub-Registrar private residence visit under Sections 31 and 38 of the Registration Act, 1908.`
      : ""
  }

Patient's Signature / Left Thumb Impression (taken in Doctor's presence): _______________________

Signature of Examining Doctor: _______________________
Full Name: Dr. [Full Name]
Qualification: [MBBS / MD]
NMC / State Medical Council Reg. No.: [Reg. No.]
Official Rubber Stamp & Seal of Doctor / Hospital:

----------------------------------------------------------------------
SUB-REGISTRAR ATTESTATION & EXECUTION ENDORSEMENT BLOCK
(For Use Before Sub-Registrar at Office or Home Visit under Registration Act, 1908)

Endorsed and annexed to Last Will and Testament dated [DD/MM/YYYY] executed by [Shri / Smt. Full Name of Testator].
1. Presented before the Sub-Registrar of Assurances at [Sub-District / City] on [DD/MM/YYYY] at [HH:MM AM/PM].
2. Testator personally verified by photo, biometric thumbprint, and oral confirmation of sound mind and voluntary execution.
3. Optional Doctor Witness Attestation (Section 63 ISA, 1925):
   Name of Examining Doctor (if acting as Witness No. 1 or 2): Dr. [Full Name], Reg. No. [Reg. No.]
   Signature: _______________________   Date: [DD/MM/YYYY]`;

  const mmseSheetText = `MINI-MENTAL STATE EXAMINATION (MMSE) CLINICAL WORKSHEET FOR WILL CAPACITY
Patient / Testator Name: [Full Legal Name] | Age: [${testatorAge}] | Date & Time: [DD/MM/YYYY HH:MM]

1. ORIENTATION TO TIME (5 Points):
   [ ] Year (1)  [ ] Season (1)  [ ] Date (1)  [ ] Day of Week (1)  [ ] Month (1)  -> Score: ___ / 5
2. ORIENTATION TO PLACE (5 Points):
   [ ] Country (1)  [ ] State (1)  [ ] City/Town (1)  [ ] Clinic/House Name (1)  [ ] Floor (1)  -> Score: ___ / 5
3. REGISTRATION / IMMEDIATE MEMORY (3 Points):
   Examiner speaks 3 unrelated words slowly (e.g., Apple, Table, Coin). Patient repeats immediately.  -> Score: ___ / 3
4. ATTENTION & CALCULATION (5 Points):
   Serial 7s backward from 100 (93, 86, 79, 72, 65) OR spell "WORLD" backward (D-L-R-O-W).  -> Score: ___ / 5
5. DELAYED RECALL (3 Points):
   Ask patient to recall the 3 words named earlier after 3 minutes.  -> Score: ___ / 3
6. LANGUAGE & COMPREHENSION (8 Points):
   [ ] Name 2 objects (Pen, Watch) (2)  [ ] Repeat exact phrase (1)  [ ] 3-Stage Command (3)
   [ ] Read & obey written instruction "Close your eyes" (1)  [ ] Write one complete sentence (1)  -> Score: ___ / 8
7. VISUOSPATIAL COPYING (1 Point):
   Copy intersecting pentagons diagram accurately.  -> Score: ___ / 1

TOTAL SCORE: ___ / 30 (24-30 Normal | 19-23 Mild Impairment | 0-18 Specialist Psychiatrist Review)

SECTION 59 BANKS v. GOODFELLOW TESTAMENTARY QUESTIONS RECORDED:
- Why are you signing a document today? (Patient Answer Summary): _________________________
- List your main properties and bank assets: _____________________________________________
- Name your spouse, children, and legal heirs: ___________________________________________`;

  const homeVisitAppText = `APPLICATION TO SUB-REGISTRAR FOR HOME VISIT REGISTRATION (BEDRIDDEN TESTATOR)
(Under Sections 31 & 38 of the Registration Act, 1908)

To,
The Sub-Registrar of Assurances,
[Sub-District / SRO Office Name], [City & State].

Subject: Request for Private Residence Visit (Commission) under Sections 31 & 38 of the Registration Act, 1908 for Will Registration of [Shri / Smt. Full Name], aged [${testatorAge}] years.

Respected Sir / Madam,
1. I am writing on behalf of [Shri / Smt. Full Name of Testator], aged [${testatorAge}] years, residing at [Complete Home Address within your SRO Jurisdiction], who wishes to execute and register his/her Last Will and Testament.
2. Due to [severe physical infirmity / post-surgical bed rest / advanced age and orthopedic immobility], the Testator is unable to travel to the Sub-Registrar Office without medical risk and serious inconvenience, and is therefore exempt from personal attendance under Section 38(1)(a) of the Registration Act, 1908.
3. Enclosed herewith is the original same-day Medical Fitness Certificate dated [DD/MM/YYYY] issued by Dr. [Doctor Full Name, Qualification, NMC Reg. No.], confirming both (a) physical inability to travel and (b) sound disposing mind with MMSE score of [${totalMmseScore} / 30] under Section 59 of the Indian Succession Act, 1925.
4. We request your kind office to fix a date and time for a private residence visit under Section 31 upon payment of prescribed government commission fee and travel charges.

Enclosures:
(1) Original Doctor Medical Fitness Certificate; (2) Draft Will; (3) Aadhaar & PAN of Testator and two independent adult witnesses; (4) Prescribed SRO Home Visit Fee Receipt.

Submitted by: [Name & Relationship] | Date: [DD/MM/YYYY] | Signature: ___________________`;

  const executionChecklistText = `DOCTOR CERTIFICATE & SENIOR WILL EXECUTION CHECKLIST (10 STEPS)
1. Schedule MBBS or MD doctor evaluation on the exact morning of Will signing (never weeks apart).
2. Carry Testator's original Aadhaar Card, PAN Card, or Passport for clinic photo ID verification.
3. Bring a list of current daily medicines so the doctor confirms no heavy sedatives impair judgment.
4. Ensure ALL beneficiaries, spouses, and children step outside the room during the doctor exam.
5. Request the doctor to record all 6 MMSE scores (total / 30) and the four Section 59 comprehension answers.
6. Verify the printed certificate sits on official clinic/hospital letterhead with the NMC or State Medical Council Registration Number.
7. Have the Testator sign or place a Left Thumb Impression (LTI) in front of the doctor on the certificate.
8. If the Testator is bedridden, add the Sections 31 & 38 Registration Act physical immobility clause for SRO Home Visit.
9. Appoint two independent, younger adult witnesses who receive zero benefit under the Will (Section 67 ISA compliance).
10. Record a short unedited video showing the Testator stating their name, date, and free will before signing.`;

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Stethoscope className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT s. 59 • NMC GUIDELINES &amp; BSA s. 45</span>
          </div>

          {/* Strict Single H1 Tag (43 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Doctor Medical Fitness Certificate for Will
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a court-tested Registered Medical Practitioner (RMP) sound mind certificate
            format for elderly and bedridden testators in India. Includes the 30-point MMSE
            score sheet, NMC compliance rules, and Sub-Registrar home visit endorsement.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#doctor-certificate-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Doctor Certificate Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Will Online</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Doctor &amp; Advocate Help</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 59 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SOUND DISPOSING MIND
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">MMSE 24-30</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CLINICAL COGNITIVE SCORE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">NMC Rules</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VERIFIED RMP REG. NUMBER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 31 &amp; 38</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SRO HOME VISIT FOR BEDRIDDEN
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
                <span>Legal &amp; Medical Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Drafted under Indian Succession Act 1925 ss. 59 &amp; 61, Bharatiya Sakshya Adhiniyam
                2023 ss. 39, 45 &amp; 67, Registration Act 1908 ss. 31 &amp; 38, and National Medical
                Commission (NMC) certificate rules.
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Clinic Letterhead Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Visiting an MBBS doctor or Sub-Registrar for an elderly parent&apos;s Will? Copy the
                exact certificate and MMSE sheet below.
              </p>
              <a
                href="#doctor-certificate-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Certificate Draft</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/doctor-medical-fitness-certificate-for-will-format-og.jpg"
                  alt="Doctor Medical Fitness Certificate Format for Will Registration India"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Court-Tested Medical Fitness Certificate for Will: MMSE Score Checklist, NMC Reg. Number &amp; SRO Home Visit Rules
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: WHY SUB-REGISTRARS &amp; COURTS REQUIRE THIS FORMAT</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sub-Registrar Senior Citizen Rule:</strong> When a Will maker is above 70
                    or 80 years old, Sub-Registrars ask for an MBBS doctor&apos;s sound mind note on the
                    same date before registering the Will in Book 3.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Generic Two-Line Notes Fail in Court:</strong> Under Section 45 of the
                    Bharatiya Sakshya Adhiniyam, 2023 (and Section 39 on expert opinions), bare clinic
                    slips fail if they skip objective clinical grounds and test scores.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>MMSE 30-Point Clinical Shield:</strong> Recording exact Mini-Mental State
                    Examination (MMSE) scores across orientation, recall, attention, and language turns a
                    doctor&apos;s opinion into hard medical proof.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bedridden Home Visit Exemption:</strong> Under Sections 31 and 38 of the
                    Registration Act, 1908, a medical note certifying bodily infirmity unlocks a home
                    visit by the Sub-Registrar for immobile parents.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Beneficiary Presence Rule:</strong> Conducting the medical exam
                    privately without heirs in the room protects the Will from Section 61 undue
                    influence claims in High Court probate proceedings.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 59 ISA &amp; BSA Medical Proof Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under <strong>Section 59 of the Indian Succession Act, 1925</strong>, every adult
                  of sound mind can make a valid Will. Old age, weak eyesight, cancer, or being
                  bedridden does not take away that legal right. Illustration (iii) to Section 59 says
                  even a very weak or sick person can make a valid Will if they still hold clear
                  judgment about their assets and family.
                </p>
                <p>
                  However, <strong>Explanation 4 to Section 59</strong> bars a Will made when illness,
                  heavy drugs, or confusion stops the person from knowing what they are doing. At the
                  same time, <strong>Explanation 3 to Section 59</strong> lets a person with memory
                  issues make a valid Will during a clear &ldquo;lucid interval.&rdquo; Proving that
                  lucid state after the Will maker passes away is why a same-day medical record matters.
                </p>
                <p>
                  In Indian evidence law, medical proof is governed by{" "}
                  <strong>Section 39 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong> (which
                  replaced Section 45 of the old Indian Evidence Act, 1872 for expert opinions) and{" "}
                  <strong>Section 45 of the BSA</strong> (which makes the underlying grounds and tests
                  behind a doctor&apos;s opinion legally relevant).
                </p>
                <p>
                  This statutory rule explains why a casual two-line note saying &ldquo;Mr. Sharma is
                  mentally fit&rdquo; collapses during cross-examination. A court-tested certificate
                  must show the clinical tests performed, the MMSE score, the medication check, and
                  the doctor&apos;s active <strong>National Medical Commission (NMC)</strong>{" "}
                  registration number.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE MMSE SCORE & CERTIFICATE BUILDER */}
            <section id="mmse-score-tool" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE MMSE SCORE &amp; CAPACITY TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free MMSE Score &amp; Medical Fitness Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Adjust the testator&apos;s age, signing location, and 6 MMSE cognitive scores below.
                The tool calculates the 30-point clinical score, tells you which doctor qualification
                you need, and updates the copyable certificate draft in Section 7 automatically.
              </p>

              {/* Interactive Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Testator Age: {testatorAge} Years</span>
                    </label>
                    <input
                      type="range"
                      min={60}
                      max={100}
                      value={testatorAge}
                      onChange={(e) => setTestatorAge(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer mt-2"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                      <span>60 yrs</span>
                      <span>80 yrs</span>
                      <span>100 yrs</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Will Signing Location</span>
                    </label>
                    <select
                      value={executionMode}
                      onChange={(e) => setExecutionMode(e.target.value as ExecutionModeKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="sro_office">Sub-Registrar Office (Walk-in)</option>
                      <option value="home_visit">Bedridden Home Visit (Sec 31 &amp; 38)</option>
                      <option value="hospital_bedside">Hospital / ICU Bedside</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Case Challenge Risk</span>
                    </label>
                    <select
                      value={riskProfile}
                      onChange={(e) => setRiskProfile(e.target.value as RiskProfileKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="age_80_plus">Senior Citizen (Age 75+)</option>
                      <option value="excluded_heir">Disinheriting Close Heir</option>
                      <option value="chronic_illness">Stroke / Chronic Illness</option>
                    </select>
                  </div>
                </div>

                {/* MMSE 6-Domain Score Sliders */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>MMSE 30-Point Clinical Domain Scores</span>
                    <span className="text-[#C65378] font-extrabold text-xs">
                      Current Score: {totalMmseScore} / 30
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>1. Orientation to Time</span>
                        <span className="text-[#C65378]">{mmseTime} / 5</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        value={mmseTime}
                        onChange={(e) => setMmseTime(Number(e.target.value))}
                        className="w-full accent-[#172228] cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-500">Year, season, date, day, month.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>2. Orientation to Place</span>
                        <span className="text-[#C65378]">{mmsePlace} / 5</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        value={mmsePlace}
                        onChange={(e) => setMmsePlace(Number(e.target.value))}
                        className="w-full accent-[#172228] cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-500">Country, state, city, clinic/home, floor.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>3. Immediate Registration</span>
                        <span className="text-[#C65378]">{mmseRegistration} / 3</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={3}
                        value={mmseRegistration}
                        onChange={(e) => setMmseRegistration(Number(e.target.value))}
                        className="w-full accent-[#172228] cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-500">Repeat 3 unrelated words right away.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>4. Attention &amp; Calculation</span>
                        <span className="text-[#C65378]">{mmseAttention} / 5</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        value={mmseAttention}
                        onChange={(e) => setMmseAttention(Number(e.target.value))}
                        className="w-full accent-[#172228] cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-500">Serial 7s or spell &ldquo;WORLD&rdquo; backward.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>5. Delayed Recall</span>
                        <span className="text-[#C65378]">{mmseRecall} / 3</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={3}
                        value={mmseRecall}
                        onChange={(e) => setMmseRecall(Number(e.target.value))}
                        className="w-full accent-[#172228] cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-500">Recall the 3 words after 3 minutes.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <span>6. Language &amp; Pentagon Copy</span>
                        <span className="text-[#C65378]">{mmseLanguage + mmseCopy} / 9</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={8}
                          value={mmseLanguage}
                          onChange={(e) => setMmseLanguage(Number(e.target.value))}
                          className="w-full accent-[#172228] cursor-pointer"
                        />
                        <button
                          type="button"
                          onClick={() => setMmseCopy(mmseCopy === 1 ? 0 : 1)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border shrink-0 cursor-pointer ${
                            mmseCopy === 1
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-white text-slate-500 border-slate-200"
                          }`}
                        >
                          Copy: {mmseCopy}/1
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">Naming, 3-step command, writing, drawing.</p>
                    </div>
                  </div>
                </div>

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        SECTION 59 ISA &amp; MMSE EVIDENTIARY EVALUATION
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${mmseVerdict.badgeClass}`}>
                      {mmseVerdict.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Calculated MMSE Score
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {totalMmseScore} / 30 Points
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {mmseVerdict.title}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Recommended Doctor Rank
                      </div>
                      <div className="text-sm sm:text-base font-black text-rose-300 mt-1 leading-snug">
                        {totalMmseScore < 24 || riskProfile !== "age_80_plus"
                          ? "MD Physician / Specialist"
                          : selectedRisk.recommendedDoctor}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Must carry NMC / State Reg. Number
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Execution Protocol
                      </div>
                      <div className="text-sm sm:text-base font-black text-emerald-400 mt-1 leading-snug">
                        {selectedExec.statute}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {selectedExec.note}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <ClipboardCheck className="w-3.5 h-3.5 text-rose-300" />
                      <span>Legal Action Plan for Age {testatorAge}:</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      {mmseVerdict.advice} {selectedRisk.extraProof} These exact MMSE numbers are
                      already synced into the full printable draft in Section 7 below.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>COMPETITOR GAP: WHY GENERIC NOTES FAIL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Generic Doctor Note vs Court-Tested Certificate
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Most families bring a 2-line note on a prescription pad. In contested probate, lawyers
                attack those notes right away under Section 45 of the BSA. Compare what actually holds
                up before Sub-Registrars and High Courts:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Proof Element</th>
                      <th className="py-3.5 px-4">Generic Clinic Slip</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Our MMSE + Sec 59 Format</th>
                      <th className="py-3.5 px-4">Hospital Medical Board</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">MMSE Cognitive Score</td>
                      <td className="py-3 px-4 text-rose-700">Missing (states &ldquo;fit&rdquo; only)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Full 6-Domain / 30 Breakdown</td>
                      <td className="py-3 px-4">Full Neurology / Psychiatry Panel</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">BSA s. 45 Grounds</td>
                      <td className="py-3 px-4 text-rose-700">Fails cross-examination</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Documents tests &amp; drugs checked</td>
                      <td className="py-3 px-4">Hospital chart &amp; CT/MRI attached</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">No Beneficiary Present</td>
                      <td className="py-3 px-4">Not stated</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Explicit private exam clause</td>
                      <td className="py-3 px-4">Hospital board protocol</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">NMC Reg. &amp; Photo ID</td>
                      <td className="py-3 px-4">Often misses ID verification</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Aadhaar/PAN ID &amp; NMC Reg. No.</td>
                      <td className="py-3 px-4">Official hospital ID &amp; stamp</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">SRO Home Visit Clause</td>
                      <td className="py-3 px-4">No Sec 31/38 wording</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Includes Sec 31 &amp; 38 exemption</td>
                      <td className="py-3 px-4">Separate discharge note needed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Best Use Case</td>
                      <td className="py-3 px-4">Routine travel or office leave</td>
                      <td className="py-3 px-4 font-bold text-[#C65378]">Senior &amp; bedridden Wills</td>
                      <td className="py-3 px-4">Terminal ICU or Living Will boards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: MMSE COGNITIVE SCORE CHECKLIST BOX (MANDATORY COMPONENT) */}
            <section id="mmse-checklist-box" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Brain className="w-4 h-4" />
                <span>MANDATORY CLINICAL BENCHMARK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. MMSE Cognitive Score Checklist Box (30 Points)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The <strong>Mini-Mental State Examination (MMSE)</strong> is the standard bedside
                cognitive check doctors use worldwide. Recording the 6 MMSE sub-scores alongside basic
                Section 59 asset questions gives probate judges clear, testable proof of sound mind:
              </p>

              {/* MMSE Checklist Box */}
              <div className="rounded-3xl bg-white border-2 border-[#C65378]/25 shadow-sm p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>MMSE COGNITIVE SCORE CHECKLIST BOX (MAX 30 PTS)</span>
                  </div>
                  <button
                    onClick={() => copyText(mmseSheetText, setCopiedMmse)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedMmse ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">MMSE Sheet Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy MMSE Worksheet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#C65378]">Domain 1 &amp; 2</span>
                      <span className="text-[11px] font-bold text-slate-600">Max 10 Points</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Orientation to Time (5) &amp; Place (5)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Doctor checks if the Will maker knows the current year, season, date, day, month,
                      country, state, city, clinic or home address, and floor level.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#C65378]">Domain 3 &amp; 4</span>
                      <span className="text-[11px] font-bold text-slate-600">Max 8 Points</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Immediate Registration (3) &amp; Attention (5)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Doctor speaks 3 simple objects to repeat right away, then tests working memory
                      with serial 7 subtraction (100, 93, 86, 79, 72) or spelling backward.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#C65378]">Domain 5 &amp; 6</span>
                      <span className="text-[11px] font-bold text-slate-600">Max 12 Points</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Delayed Recall (3), Language (8) &amp; Copy (1)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Tests 3-minute recall of the 3 words, naming objects like a pen and watch,
                      following a 3-step command, writing a sentence, and copying two pentagons.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F4F8FE] border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#5F7E75]">Sec 59 Legal Add-On</span>
                      <span className="text-[11px] font-bold text-slate-600">Banks v. Goodfellow</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Asset, Family &amp; Will Purpose Check
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Doctor confirms the person knows they are making a Will, can list their main
                      house and bank accounts, and names their spouse, sons, and daughters clearly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: NMC GUIDELINES COMPLIANCE BOX (MANDATORY COMPONENT) */}
            <section id="nmc-guidelines-box" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartPulse className="w-4 h-4" />
                <span>NATIONAL MEDICAL COMMISSION STANDARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. NMC Guidelines Compliance Box for Valid Certificates
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under the <strong>National Medical Commission (NMC)</strong> professional conduct and
                medical certificate guidelines, every certificate issued by a Registered Medical
                Practitioner (RMP) is treated as a formal legal record. Missing any rule below lets
                opposing lawyers reject the document:
              </p>

              {/* NMC Compliance Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#5F7E75]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NMC GUIDELINES COMPLIANCE BOX (6 MANDATORY CHECKS)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">1. Active NMC / State Reg. Number</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Every letterhead and stamp must show the doctor&apos;s State Medical Council or
                        NMC registration number. A certificate without a Reg. No. is invalid.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">2. Recognized Allopathic Degree</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Sub-Registrars require an MBBS, MD, or specialist registered under the NMC Act.
                        Unregistered practitioners cannot certify mental capacity.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">3. Photo ID Check &amp; Patient Signature</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Note the Aadhaar or Passport last 4 digits and take the testator&apos;s signature
                        or thumb impression right on the certificate.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">4. Exact Date, Time &amp; Place of Exam</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        NMC ethics strictly bar back-dated or pre-signed blank certificates. Always
                        record the exact hour and date of personal examination.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">5. Objective Clinical Basis</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Record actual findings like orientation, pulse, drug review, and MMSE score,
                        never hearsay claims from family members.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-slate-900">6. Serial Register Entry</div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Ask the clinic to assign a reference number and log it in their clinic register
                        in case a probate court later calls for verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Warning Against Tele-Certificates for Contested Wills:</strong> While NMC
                    Telemedicine rules allow digital notes for minor leave, always insist on an{" "}
                    <em>in-person physical exam</em> for a Will certificate so the doctor can confirm
                    nobody is coaching or pressuring the elder off-camera.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 6: BEDRIDDEN TESTATOR & SRO HOME VISIT RULES */}
            <section id="bedridden-sro-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Hospital className="w-4 h-4" />
                <span>REGISTRATION ACT ss. 31 &amp; 38</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Form of Certificate for Bedridden Testators
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  What if your elderly parent or grandparent cannot travel to the Sub-Registrar Office
                  due to paralysis, hip fracture, oxygen support, or hospital recovery? You do not need
                  to carry them on a stretcher. Under <strong>Section 38(1)(a) of the Registration Act,
                  1908</strong>, a person unable to attend without risk or serious inconvenience due
                  to bodily infirmity is legally exempt.
                </p>
                <p>
                  Under <strong>Section 31 of the Registration Act, 1908</strong>, the Sub-Registrar
                  (or a commissioned officer) visits the home or hospital room in person. To approve
                  this home visit, the Sub-Registrar needs a clear medical certificate plus a short
                  commission application.
                </p>
              </div>

              {/* 4 Clinical Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Scenario A</span>
                    <span className="text-[11px] font-bold text-slate-500">SRO Walk-In (Age 75+)</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Alert Senior Visiting Sub-Registrar Office
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Carry a same-day MBBS or MD certificate stating full sound mind and MMSE score so
                    the SRO officer accepts the Book 3 registration without sending the family back.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Scenario B</span>
                    <span className="text-[11px] font-bold text-slate-500">Bedridden at Home</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    SRO Private Residence Commission (Sec 31 &amp; 38)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certificate must confirm BOTH physical inability to travel and sound mental state.
                    File the Section 31 home visit request with the Sub-Registrar fee receipt.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Scenario C</span>
                    <span className="text-[11px] font-bold text-slate-500">Hospital Ward / Recovery</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Treating Physician &amp; Drug Clearance Note
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Record every daily medicine and confirm the testator is free of opioids or heavy
                    sedation at the exact hour of signing (Section 59 Explanation 4 protection).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Scenario D</span>
                    <span className="text-[11px] font-bold text-slate-500">Excluded Legal Heir</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Specialist Exam + Video + Doctor Witness
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When cutting out a son or daughter, have an MD doctor conduct the check privately and
                    sign as an independent attesting witness under Section 63 ISA.
                  </p>
                </div>
              </div>

              {/* Copyable Home Visit Application Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Stamp className="w-4 h-4" />
                    <span>Sub-Registrar Home Visit Request Draft (Sec 31 &amp; 38)</span>
                  </div>
                  <button
                    onClick={() => copyText(homeVisitAppText, setCopiedHomeVisit)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedHomeVisit ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Application Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Home Visit Application</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap max-h-56 overflow-y-auto">
                  {homeVisitAppText}
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPLETE COURT-TESTED CERTIFICATE FORMAT */}
            <section id="doctor-certificate-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY ON-PAGE ASSET</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Doctor Medical Fitness Certificate &amp; SRO Endorsement
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy this complete, clinic-ready draft and ask your Registered Medical Practitioner to
                print it on official letterhead with their NMC registration number, clinic stamp, and
                same-day exam time:
              </p>

              {/* Template Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      DOCTOR MEDICAL FITNESS CERTIFICATE FORMAT (ENGLISH)
                    </span>
                  </div>
                  <button
                    onClick={() => copyText(fullCertificateTemplateText, setCopiedCert)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedCert ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Complete Format!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Entire Certificate</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {fullCertificateTemplateText}
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <span>Compliant with Section 59 ISA, NMC Guidelines, BSA ss. 39 &amp; 45 &amp; SRO Rules</span>
                  <button
                    onClick={() => copyText(fullCertificateTemplateText, setCopiedCert)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP EXECUTION SOP */}
            <section id="sro-execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Same-Day Doctor Exam &amp; SRO Registration SOP
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Finalize the Will Draft First",
                    desc: "Finish your Will text clearly before the doctor visit. You can build a clean draft online or get lawyer review so nothing shifts after the health check.",
                  },
                  {
                    step: 2,
                    title: "Book a Same-Day Morning Doctor Check",
                    desc: "See an MBBS or MD doctor on the exact date of signing. Carry the elder's Aadhaar or Passport and their daily medicine list.",
                  },
                  {
                    step: 3,
                    title: "Step Out of the Exam Room",
                    desc: "All sons, daughters, spouses, and heirs must wait outside. A private check lets the doctor confirm free choice with zero pressure under Section 61.",
                  },
                  {
                    step: 4,
                    title: "Record MMSE Scores & NMC Details",
                    desc: "Check that the doctor writes all 6 MMSE scores, clinic ref number, exact exam hour, NMC reg number, and clinic stamp on official letterhead.",
                  },
                  {
                    step: 5,
                    title: "Sign Before Two Neutral Witnesses",
                    desc: "Under Section 63 ISA, the Will maker signs before two younger, neutral adult witnesses who get no share. The examining doctor may also sign as Witness No. 1.",
                  },
                  {
                    step: 6,
                    title: "Finish Book 3 Filing or Home Visit",
                    desc: "Give the signed Will and doctor form at the SRO desk, or file a Section 31 & 38 Home Visit plea if the elder cannot leave home.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist Copy Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the 10-Point Clinic &amp; SRO Execution Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Covers ID proofs, drug list, private exam rules, and SRO home visit enclosures.
                  </div>
                </div>
                <button
                  onClick={() => copyText(executionChecklistText, setCopiedChecklist)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Checklist Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 10-Step Checklist</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* SECTION 9: SUPREME COURT PRECEDENTS */}
            <section id="supreme-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SUPREME COURT JURISPRUDENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Supreme Court Rules on Sound Mind &amp; Suspicious Factors
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian probate courts test every senior citizen Will against landmark Supreme Court
                  principles. Under <strong>H. Venkatachala Iyengar v. B.N. Thimmajamma (1959)</strong>{" "}
                  and <strong>Meena Pradhan v. Kamla Pradhan (2023)</strong>, the person relying on the
                  Will must dispel all &ldquo;suspicious circumstances&rdquo; by clear evidence.
                </p>
                <p>
                  In <strong>Niranjan Umeshchandra Joshi v. Mrudula Jyoti Rao (2006)</strong> and{" "}
                  <strong>Kavita Kanwar v. Pamela Mehta (2020)</strong>, the Supreme Court cautioned
                  that when an elderly or sick parent signs a Will favoring one caregiver child while
                  leaving others out, courts demand strong proof of sound mind and independent volition.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Clinical Evidence Beats Bare Assertions:</strong> When a treating doctor
                    documents cognitive metrics like MMSE scores on signing day, vague claims of
                    &ldquo;senility&rdquo; or &ldquo;old-age confusion&rdquo; fail in court.
                  </li>
                  <li>
                    <strong>Keep Heirs Out of Drafting &amp; Medical Rooms:</strong> Active interference by
                    a favored heir in hiring the doctor or answering questions for the elder is a classic
                    red flag under Section 61 ISA.
                  </li>
                  <li>
                    <strong>Proof via Attesting Witness (Section 67 BSA):</strong> Remember that under
                    Section 67 of the BSA (formerly Section 68 IEA), at least one attesting witness must
                    still testify in probate court even if the Will is registered and medically certified.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 10: REAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Scenarios: 84-Yr &amp; Bedridden Wills
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE SCENARIO 1: SOUTH DELHI SRO DESK</span>
                    <span className="text-slate-500 font-semibold">84-Year-Old Grandfather</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Overcoming Sub-Registrar Refusal with Same-Day MMSE Certificate
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An 84-year-old retired engineer arrived at the Delhi Sub-Registrar Office to register
                    his Will, but the clerk turned him away because he lacked an MBBS doctor&apos;s
                    mental fitness note. Using this court-tested format, his MD physician recorded a 28/30
                    MMSE score, verified his Aadhaar ID, and confirmed zero sedatives. The Sub-Registrar
                    completed Book 3 registration smoothly the next morning.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE SCENARIO 2: MUMBAI &amp; BENGALURU HOME VISIT</span>
                    <span className="text-slate-500 font-semibold">Post-Fracture Bedridden Parent</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Registering a Bedridden Mother&apos;s Will via Sec 31 &amp; 38 Commission
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 79-year-old mother recovering from hip surgery could not climb stairs at the SRO
                    while leaving unequal shares to her children. Her orthopedic surgeon and physician
                    co-signed the Section 31/38 physical immobility + 27/30 MMSE fitness format, and an
                    independent doctor stood as attesting witness during the SRO home commission visit.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & INTERNAL SPOKES */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Official Legal Portals, Citations &amp; Related Guides
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Primary Governing Statutes &amp; Official Resources:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Indian Succession Act, 1925 s. 59 &amp; s. 61:</strong> Sound mind capacity,
                    lucid interval rules (Expl. 3), illness/intoxication bar (Expl. 4), and undue
                    influence prohibition. Read official text at{" "}
                    <a
                      href="https://www.indiacode.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>India Code Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Bharatiya Sakshya Adhiniyam, 2023 ss. 39, 45 &amp; 67:</strong> Expert medical
                    opinions (replacing IEA s. 45), relevance of clinical grounds (s. 45), and mandatory
                    attesting witness proof (s. 67).
                  </li>
                  <li>
                    <strong>National Medical Commission (NMC) Guidelines:</strong> Registered Medical
                    Practitioner certificate ethics and registration number verification via{" "}
                    <a
                      href="https://www.nmc.org.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>National Medical Commission</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Registration Act, 1908 ss. 31 &amp; 38 &amp; Supreme Court Judgments:</strong>{" "}
                    Private residence registration for bedridden testators and probate precedents on{" "}
                    <a
                      href="https://www.sci.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Supreme Court of India</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    All Legal Templates Hub
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-[#172228] text-white hover:bg-[#C65378] font-bold"
                  >
                    Self-Serve Online Will (/start)
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Doctor &amp; Advocate Assisted Execution
                  </Link>
                  <Link
                    href="/tools/undue-influence-testamentary-capacity-risk-scorer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Undue Influence Risk Scorer
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Sub-Registrar Will Registration
                  </Link>
                  <Link
                    href="/templates/living-will-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Living Will (Advance Directive)
                  </Link>
                  <Link
                    href="/templates/exclusion-of-estranged-relative-clause-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Heir Exclusion Clause Format
                  </Link>
                  <Link
                    href="/services/will-dispute-contest-litigation-lawyer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Contested Will Defense Desk
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Medical Fitness Certificate
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
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

            {/* PLAIN-ENGLISH SUMMARY CARDS FOR READABILITY */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Add a Doctor Note?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A same-day doctor note protects your parent&apos;s Will. It stops relatives from
                  claiming memory loss or pressure later. Sub-Registrars also ask for it when a Will
                  maker is over 70 or 80.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Bedridden Home Visits</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sick or bedridden elders do not need to travel to the office. A doctor certificate
                  under Sections 31 and 38 lets the Sub-Registrar visit your home or hospital room to
                  register the Will safely.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft clear Wills for senior citizens in plain words. We prepare your
                  MMSE medical form, witness plan, and Sub-Registrar home visit papers so your family
                  stays protected.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (DUAL CONVERSION CTA)
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
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Section 59 testamentary capacity defense, senior citizen Will execution,
                and Sub-Registrar home commission filings at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - SELF-SERVE ONLINE WILL (/start) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SELF-SERVE ONLINE WILL</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Court-Proof Senior Will in 15 Minutes
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Pair this doctor sound mind certificate with a cleanly structured Will compliant with
                  Section 63 of the Indian Succession Act.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start Online Will Draft</span>
                  </button>
                  <Link
                    href="/start"
                    className="block text-[11px] font-bold text-rose-200 hover:text-white underline underline-offset-2"
                  >
                    Explore Self-Serve Will Platform (/start)
                  </Link>
                </div>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Section 59 &amp; 63 Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - DOCTOR & ADVOCATE ASSISTED EXECUTION (/contact) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <UserCheck className="w-3 h-3" />
                  <span>ASSISTED SENIOR EXECUTION</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Doctor &amp; Advocate Assisted Will Execution
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need lawyer-guided coordination for an 80+ parent, MMSE medical form review, or a
                  Sub-Registrar home visit under Sections 31 &amp; 38?
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Book Assisted Execution</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why This Certificate Works
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>MMSE 30-Pt Proof:</strong> Satisfies BSA Section 45 clinical grounds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NMC Reg. Compliant:</strong> Clinic letterhead, ID check &amp; timestamp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SRO Home Visit:</strong> Ready for Sections 31 &amp; 38 bedridden filings.
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
          href="#doctor-certificate-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Certificate Draft</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Assisted Execution</span>
        </Link>
      </div>
    </div>
  );
}
