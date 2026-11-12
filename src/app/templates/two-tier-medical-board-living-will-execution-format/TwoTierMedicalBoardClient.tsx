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
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Copy,
  CheckCheck,
  Users,
  FileText,
  FileSpreadsheet,
  ClipboardCheck,
  Stethoscope,
  Activity,
  HeartPulse,
  Printer,
  AlertCircle,
  Building2,
} from "lucide-react";

// Table of Contents Items (matching section IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Supreme Court 2023 Board Rules" },
  { id: "interactive-protocol", label: "2. Hospital Protocol & Readiness Tool" },
  { id: "board-comparison-table", label: "3. Primary vs Secondary Board Rules" },
  { id: "primary-board-template", label: "4. Primary Medical Board Format" },
  { id: "secondary-board-template", label: "5. Secondary Board Approval Draft" },
  { id: "jmfc-intimation-template", label: "6. 48-Hour JMFC Intimation Form" },
  { id: "hospital-protocol-sop", label: "7. Hospital ICU Protocol Checklist" },
  { id: "icmr-dnar-guidelines", label: "8. ICMR DNAR & Pain Care Rules" },
  { id: "practical-case-scenarios", label: "9. Hospital Scenarios & Remedies" },
  { id: "statutory-citations", label: "10. Official Citations & Guides" },
  { id: "frequently-asked-questions", label: "11. Medical Board FAQs" },
];

type ClinicalStateKey = "terminal_incurable" | "persistent_vegetative" | "brain_stem_damage" | "treatable_acute";
type DirectiveStatusKey = "notarized_attested" | "gazetted_attested" | "no_living_will";
type BoardProgressKey = "pending_primary" | "primary_approved" | "both_approved" | "board_disagreed";

const CLINICAL_STATES: Record<
  ClinicalStateKey,
  { label: string; eligible: boolean; summary: string }
> = {
  terminal_incurable: {
    label: "Terminal Incurable Illness (No Cure)",
    eligible: true,
    summary:
      "Patient is in an advanced stage of an incurable disease. Life support only delays natural dying without hope of recovery.",
  },
  persistent_vegetative: {
    label: "Persistent Vegetative State (Permanent Coma)",
    eligible: true,
    summary:
      "Patient has permanent brain damage with no awareness or ability to communicate, as shown by clinical tests and scans.",
  },
  brain_stem_damage: {
    label: "Irreversible End-Stage Organ Failure",
    eligible: true,
    summary:
      "Multiple vital organs have failed permanently, and doctors confirm that further aggressive machines are medically futile.",
  },
  treatable_acute: {
    label: "Treatable or Reversible Condition",
    eligible: false,
    summary:
      "If the illness can heal or improve with ICU care, a Living Will does NOT apply. Doctors must treat the patient fully.",
  },
};

const DIRECTIVE_STATUS_MAP: Record<
  DirectiveStatusKey,
  { label: string; ruleNote: string }
> = {
  notarized_attested: {
    label: "Living Will Signed (2 Witnesses + Notary)",
    ruleNote:
      "Valid under the Jan 2023 Supreme Court order. Hospital confirms the copy against the custodian or digital health record.",
  },
  gazetted_attested: {
    label: "Living Will Signed (2 Witnesses + Gazetted Officer)",
    ruleNote:
      "Valid under the Jan 2023 Supreme Court order. No prior court stamp is needed for execution.",
  },
  no_living_will: {
    label: "No Written Living Will (Next-of-Kin Route)",
    ruleNote:
      "Both Primary and Secondary Medical Boards still review the case. Treating doctors need written informed consent from the next of kin.",
  },
};

const HOSPITAL_CHECKLIST_ITEMS = [
  {
    id: "chk-1",
    title: "Treating Doctor Verifies Terminal State & Incapacity",
    detail: "Confirms patient cannot speak for themselves and recovery is medically impossible.",
  },
  {
    id: "chk-2",
    title: "Living Will Verified Against Custodian or Digital Copy",
    detail: "Hospital checks the attested directive with the named surrogate and family doctor.",
  },
  {
    id: "chk-3",
    title: "Primary Board Formed (Treating Doctor + 2 Experts, 5+ Yrs)",
    detail: "Three hospital doctors with at least 5 years experience examine the patient.",
  },
  {
    id: "chk-4",
    title: "Primary Board Clinical Opinion Recorded Within 48 Hours",
    detail: "Panel records clear clinical findings and advises whether to stop life support.",
  },
  {
    id: "chk-5",
    title: "CMO Nominates Doctor for Secondary Medical Board",
    detail: "District Chief Medical Officer names one registered doctor plus two independent experts.",
  },
  {
    id: "chk-6",
    title: "Secondary Board Countersigns Within 48 Hours",
    detail: "Second panel checks patient independently and confirms Primary Board findings.",
  },
  {
    id: "chk-7",
    title: "Written Consent Taken from Surrogate or Next of Kin",
    detail: "Named healthcare proxy signs informed consent after full counselling by doctors.",
  },
  {
    id: "chk-8",
    title: "ICMR DNAR & Pain Relief Plan Added to ICU Chart",
    detail: "Doctors record comfort care, sedatives, and pain control rules before removing support.",
  },
  {
    id: "chk-9",
    title: "Written Intimation Sent to Local JMFC Before Withdrawal",
    detail: "Hospital files copies of the boards' opinions and directive with the Judicial Magistrate.",
  },
];

const FAQS = [
  {
    q: "What is the Two-Tier Medical Board process for a Living Will in India?",
    a: "Under the January 2023 Supreme Court order in Common Cause v. Union of India, two doctor teams check the patient. First, a Primary Board tests if the illness has no cure. Next, a Secondary Board with a district CMO doctor checks the case and gives final sign-off.",
  },
  {
    q: "Who sits on the Primary Medical Board and Secondary Medical Board?",
    a: "The Primary Board has the treating doctor and two experts. Each expert must have 5 or more years of work experience. The Secondary Board has one doctor named by the district CMO and two outside experts with 5 years of experience.",
  },
  {
    q: "How fast must the Primary and Secondary Medical Boards give their opinion?",
    a: "The 2023 Supreme Court order sets a 48-hour goal for each step. The Primary Board should sign its report within 48 hours. After that, the Secondary Board should check the patient and give its view within 48 hours.",
  },
  {
    q: "Does a Judicial Magistrate First Class still need to approve stopping life support?",
    a: "No. Under the 2023 rules, a JMFC judge does not come to the ICU or sign prior court orders. Once both boards agree and the family signs consent, the hospital mails a written notice to the JMFC before stopping life support.",
  },
  {
    q: "What did the Supreme Court change in January 2023 compared to the 2018 order?",
    a: "In 2018, board doctors needed 20 years of work, a Collector set up the second board, and a judge visited the ICU. In 2023, the Court cut experience to 5 years, gave boards 48 hours, and replaced prior court approval with a simple notice.",
  },
  {
    q: "How do ICMR DNAR guidelines apply alongside a Living Will in an ICU?",
    a: "ICMR DNAR rules help ICU doctors decide when chest shocks or CPR will not save a dying patient. Even if machines stop, hospitals must keep giving pain relief, water care, and clean nursing care until the end.",
  },
  {
    q: "What happens if the Primary or Secondary Medical Board refuses to withdraw support?",
    a: "If either board says no, or if the two boards do not agree, the family or hospital can ask the High Court for help under Article 226. The Chief Justice sets up a fast bench to review the case.",
  },
  {
    q: "Can hospitals use the same two-tier board process when a patient left no Living Will?",
    a: "Yes. These rules also protect dying patients in a deep coma who left no Living Will. Both medical boards check the patient, take signed consent from close family, and send notice to the JMFC.",
  },
];

const PRIMARY_BOARD_TEMPLATE = `PRIMARY MEDICAL BOARD CERTIFICATION & CLINICAL OPINION FORMAT
[Under Supreme Court of India Order dated 24 January 2023 in Common Cause v. UOI (MA No. 1699/2019) & ICMR Consensus Guidelines on DNAR]

Hospital Name & Registration No.: [Insert Hospital Name, City, Clinical Establishment Reg. No.]
Hospital Case / IPD / UHID No.: [Insert UHID / IPD Number]
Date & Time of Board Constitution: [DD/MM/YYYY at HH:MM Hours] (48-Hour Clock Starts)

PART A: PATIENT & ADVANCE MEDICAL DIRECTIVE DETAILS
1. Patient Full Name: [Patient Full Name], Age: [Age] Years, Sex: [M/F/Other]
2. Next of Kin / Appointed Surrogate Name: [Surrogate Full Name], Relationship: [Spouse / Child / Nominated Proxy]
3. Advance Medical Directive (Living Will) Status:
   [ ] Executed on [Date] before Two Witnesses and Attested by [Notary Public / Gazetted Officer]
   [ ] Verified against Copy Held by [Surrogate / Custodian / Family Physician / ABHA Record]
   [ ] No Written Living Will Found (Proceeding under Next-of-Kin Informed Consent Route)

PART B: CLINICAL DIAGNOSIS & TERMINAL CONDITION ASSESSMENT
1. Primary Diagnosis & Comorbidities: [Detail advanced terminal illness / irreversible brain damage / multi-organ failure]
2. Patient Decision-Making Capacity: [Confirm patient is unconscious / comatose / lacks capacity to give contemporaneous consent]
3. Summary of Diagnostic Evidence & Prognosis: [List MRI/CT findings, GCS score, ventilator dependency, ICU course, and failed therapeutic trials]
4. Medical Futility Findings:
   We, the members of the Primary Medical Board, have personally examined the patient and reviewed all ICU charts, laboratory reports, and imaging records. We hereby certify that:
   (a) The patient suffers from a terminal and irreversible medical condition with no realistic possibility of recovery; AND
   (b) Further escalation or continuation of artificial life-sustaining treatment (invasive mechanical ventilation / CPR / vasopressors / artificial nutrition) will not cure the condition and will only prolong the dying process and patient suffering.

PART C: PRELIMINARY CLINICAL OPINION (WITHIN 48 HOURS)
Based on our clinical examination and the patient's Advance Medical Directive dated [Date], the Primary Medical Board is of the preliminary opinion that [withholding / withdrawing] artificial life-sustaining treatment is medically appropriate and ethically justified under Common Cause (2023 Modified Order) and ICMR DNAR Guidelines, subject to confirmation by the Secondary Medical Board and informed consent of the appointed surrogate.

Mandatory Continuation of Palliative Care: Irrespective of withdrawal of life support, full palliative care, pain relief, sedation, oral/skin hygiene, and dignified comfort measures shall continue uninterrupted.

PART D: SIGNATURES OF PRIMARY MEDICAL BOARD MEMBERS
(Minimum 3 Doctors: Treating Physician + 2 Subject Experts with >= 5 Years Clinical Experience)

1. Treating Physician: Dr. [Full Name] | Qualification: [MD/MS/DM] | Experience: [XX] Yrs
   NMC / State Medical Council Reg. No.: [Reg. No.] | Signature & Date/Time: ______________________

2. Subject Expert 1: Dr. [Full Name] | Specialty: [Critical Care / Neurology / Medicine] | Experience: [XX] Yrs
   NMC / State Medical Council Reg. No.: [Reg. No.] | Signature & Date/Time: ______________________

3. Subject Expert 2: Dr. [Full Name] | Specialty: [Specialty] | Experience: [XX] Yrs
   NMC / State Medical Council Reg. No.: [Reg. No.] | Signature & Date/Time: ______________________

Date & Time of Final Primary Opinion Submission: [DD/MM/YYYY at HH:MM Hours]`;

const SECONDARY_BOARD_TEMPLATE = `SECONDARY MEDICAL BOARD INDEPENDENT REVIEW & COUNTERSIGNATURE FORMAT
[Under Supreme Court of India Order dated 24 January 2023 in Common Cause v. UOI (MA No. 1699/2019)]

Hospital Name & Location: [Insert Hospital Name, City, State]
Patient Full Name & UHID: [Patient Full Name] | [UHID / IPD Number]
Primary Board Report Reference Date & Time: [DD/MM/YYYY at HH:MM Hours]
Date & Time of Secondary Board Examination: [DD/MM/YYYY at HH:MM Hours]

PART A: INDEPENDENCE & CMO NOMINATION CERTIFICATION
We certify that none of the members of this Secondary Medical Board were part of the Primary Medical Board that issued the preliminary opinion dated [Date]. This Board includes one Registered Medical Practitioner nominated by the District Chief Medical Officer (CMO) and two independent subject experts, each possessing more than 5 years of post-qualification experience.

PART B: INDEPENDENT CLINICAL VERIFICATION
1. Bedside Examination Findings: [Record independent clinical assessment of coma / brain-stem reflexes / terminal organ failure]
2. Review of Primary Medical Board Opinion: We have independently scrutinized the Primary Medical Board report, diagnostic imaging, ICU progress notes, and the attested Advance Medical Directive dated [Date].
3. Verification of Surrogate Understanding & Informed Consent:
   We confirm that the clinical prognosis, futility of continued artificial life support, and mandatory palliative care plan have been clearly explained in plain language to the patient's appointed surrogate / next of kin, [Surrogate Name].

PART C: CONFIRMING OPINION & COUNTERSIGNATURE (WITHIN 48 HOURS)
[ ] CONCURRED & COUNTERSIGNED: We independently confirm the findings of the Primary Medical Board. Continuing artificial life support is medically futile and contrary to the patient's valid Advance Medical Directive. We approve the [withholding / withdrawal] of artificial life-sustaining measures after formal written intimation to the Judicial Magistrate First Class (JMFC).
[ ] DISAGREED / REFUSED: [State clinical reasons for non-concurrence; advise family/hospital of High Court recourse under Article 226 if disputed.]

PART D: WRITTEN CONSENT OF APPOINTED SURROGATE / NEXT OF KIN
I, [Surrogate Full Name], appointed as Surrogate under the patient's Advance Medical Directive dated [Date] (or Next of Kin), confirm that the Secondary Medical Board has explained the terminal prognosis to me. I freely give written consent to honor the patient's directive to [withhold / withdraw] futile artificial life support while maintaining full pain relief and comfort care.

Surrogate / Next of Kin Signature: ______________________ | ID Proof (Aadhaar/PAN): [Last 4 Digits Only] | Date: [DD/MM/YYYY]

PART E: SIGNATURES OF SECONDARY MEDICAL BOARD MEMBERS
1. CMO-Nominated Doctor: Dr. [Full Name] | Designation & District Office: [Details]
   NMC / SMC Reg. No.: [Reg. No.] | Signature & Official Seal: ______________________

2. Independent Expert 1: Dr. [Full Name] | Specialty & Experience: [Specialty, XX Yrs]
   NMC / SMC Reg. No.: [Reg. No.] | Signature & Date/Time: ______________________

3. Independent Expert 2: Dr. [Full Name] | Specialty & Experience: [Specialty, XX Yrs]
   NMC / SMC Reg. No.: [Reg. No.] | Signature & Date/Time: ______________________`;

const JMFC_INTIMATION_TEMPLATE = `INTIMATION TO JUDICIAL MAGISTRATE FIRST CLASS (JMFC) PRIOR TO WITHDRAWAL OF LIFE SUPPORT
[Ex-Post Statutory Intimation under Supreme Court Order dated 24 January 2023 in Common Cause (A Regd. Society) v. Union of India, MA No. 1699/2019 in W.P.(C) No. 215/2005]

TO:
The Learned Judicial Magistrate First Class (JMFC),
[Court Complex Name, Taluka / District],
[City, State]

FROM:
The Medical Superintendent / Hospital Director,
[Full Hospital Name & Address],
[Official Hospital Desk Email / Administrative Reference]

DATE: [DD/MM/YYYY]
SUBJECT: Statutory Intimation under Common Cause (2023 Modified Order) regarding Decision to Withdraw/Withhold Life-Sustaining Treatment for Patient [Patient Full Name], UHID: [UHID]

RESPECTED SIR / MADAM,

1. In compliance with the modified directions issued by the Hon'ble Constitution Bench of the Supreme Court of India on 24 January 2023 in Common Cause v. Union of India (MA No. 1699/2019), this hospital submits formal written intimation prior to giving effect to the decision to [withdraw / withhold] artificial life-sustaining treatment for [Patient Full Name], aged [Age] years, currently admitted in [ICU / Ward Name].

2. Pursuant to the Supreme Court's 2023 framework, the hospital duly verified the patient's Advance Medical Directive dated [Date] (or recorded Next-of-Kin consent) and convened both statutory Medical Boards within the prescribed 48-hour review schedule:
   (a) Primary Medical Board Opinion dated [DD/MM/YYYY at HH:MM] signed by the Treating Physician and two subject experts (each having >= 5 years experience) certifying terminal and irreversible medical futility;
   (b) Secondary Medical Board Confirmation dated [DD/MM/YYYY at HH:MM] countersigned by Dr. [Name], Registered Medical Practitioner nominated by the District Chief Medical Officer (CMO), along with two independent experts;
   (c) Written Informed Consent executed on [DD/MM/YYYY] by the appointed Surrogate / Next of Kin, [Surrogate Name].

3. Copies of the following verified clinical and legal records are enclosed herewith for the official record and safe custody of this Hon'ble Court:
   - Annexure 1: Attested Copy of the Patient's Advance Medical Directive (Living Will)
   - Annexure 2: Signed Primary Medical Board Certification Report
   - Annexure 3: Countersigned Secondary Medical Board Confirmation Report
   - Annexure 4: Written Consent of Appointed Surrogate / Next of Kin & Palliative Care Plan

4. The hospital confirms that continuous pain management, palliative comfort care, and dignified nursing support shall remain in place throughout end-of-life care. Kindly take this statutory intimation on record.

Yours faithfully,

___________________________________
Medical Superintendent / Authorized Hospital Signatory
[Full Name, Designation, Hospital Stamp & Official Email]
Date & Time of Dispatch to JMFC Registry: [DD/MM/YYYY at HH:MM]`;

export default function TwoTierMedicalBoardClient() {
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
  const [copiedPrimary, setCopiedPrimary] = useState<boolean>(false);
  const [copiedSecondary, setCopiedSecondary] = useState<boolean>(false);
  const [copiedJmfc, setCopiedJmfc] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Hospital Protocol State
  const [clinicalState, setClinicalState] = useState<ClinicalStateKey>("terminal_incurable");
  const [directiveStatus, setDirectiveStatus] = useState<DirectiveStatusKey>("notarized_attested");
  const [boardProgress, setBoardProgress] = useState<BoardProgressKey>("both_approved");
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    "chk-1": true,
    "chk-2": true,
    "chk-3": true,
    "chk-4": true,
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

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleChecklistItem = (id: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedChecklistCount = HOSPITAL_CHECKLIST_ITEMS.filter(
    (item) => checkedSteps[item.id]
  ).length;

  const clinicalInfo = CLINICAL_STATES[clinicalState];
  const directiveInfo = DIRECTIVE_STATUS_MAP[directiveStatus];

  const getProtocolOutcome = () => {
    if (!clinicalInfo.eligible) {
      return {
        badge: "LIVING WILL DOES NOT TRIGGER",
        tone: "rose",
        headline: "Full Active Medical Care Must Continue",
        guidance:
          "A Living Will applies only to terminal, irreversible conditions where recovery is impossible. For any curable illness or short-term ICU recovery, doctors must provide full active care.",
        nextStep: "Do NOT convene a withdrawal board. Continue standard treatment.",
      };
    }

    if (boardProgress === "board_disagreed") {
      return {
        badge: "DISPUTE / REFUSAL RECOURSE",
        tone: "amber",
        headline: "Approach High Court under Article 226",
        guidance:
          "If the Primary or Secondary Medical Board refuses withdrawal, or if the two boards disagree, the surrogate, next of kin, or hospital can file a writ petition before the High Court.",
        nextStep: "Request a Division Bench hearing constituted by the Chief Justice of the High Court.",
      };
    }

    if (boardProgress === "both_approved") {
      return {
        badge: "READY FOR JMFC INTIMATION",
        tone: "emerald",
        headline: "Both Boards Approved: Send JMFC Notice",
        guidance:
          "Both the Primary Board and CMO-backed Secondary Board have confirmed terminal futility within 48 hours each. Take written surrogate consent, start full pain care, and intimate the JMFC.",
        nextStep: "Use the Secondary Board & 48-Hour JMFC Intimation forms in Sections 5 and 6 below.",
      };
    }

    return {
      badge: "48-HOUR BOARD REVIEW IN PROGRESS",
      tone: "amber",
      headline:
        boardProgress === "pending_primary"
          ? "Convene Primary Medical Board (48-Hour Clock)"
          : "Refer to Secondary Medical Board with CMO Nominee",
      guidance:
        boardProgress === "pending_primary"
          ? "The hospital must convene the treating physician and two subject experts (5+ years experience) to examine the patient and record their report within 48 hours."
          : "Now ask the District Chief Medical Officer (CMO) to nominate one doctor plus two independent experts (5+ years experience) for the Secondary Board check within 48 hours.",
      nextStep: "Complete the checklist below and prepare the Board report drafts.",
    };
  };

  const outcome = getProtocolOutcome();

  const copyText = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `HOSPITAL TWO-TIER MEDICAL BOARD PROTOCOL CHECKLIST (SUPREME COURT 2023 ORDER):
1. Verify patient lacks decision-making capacity due to coma or terminal illness.
2. Collect attested Advance Medical Directive (2 witnesses + Notary or Gazetted Officer).
3. Match copy against surrogate, family physician, or municipal/ABHA digital record.
4. Constitute Primary Medical Board (Treating Doctor + 2 experts with 5+ years experience).
5. Record Primary Medical Board clinical opinion within 48 hours of referral.
6. Request District Chief Medical Officer (CMO) to nominate 1 doctor for Secondary Board.
7. Constitute Secondary Medical Board (CMO nominee + 2 independent experts with 5+ years experience).
8. Record Secondary Medical Board countersignature within 48 hours of Primary Board report.
9. Take signed Informed Consent from appointed Surrogate (or Next of Kin) and enter ICMR DNAR & pain relief orders.
10. Send formal written intimation with all annexed board reports to the local Judicial Magistrate First Class (JMFC) prior to withdrawal.`;

    copyText(checklistText, setCopiedChecklist);
  };

  const printTemplate = (title: string, body: string) => {
    const printWin = window.open("", "_blank", "width=850,height=900");
    if (!printWin) return;
    printWin.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Georgia, serif; padding: 40px; line-height: 1.6; color: #172228; }
            pre { white-space: pre-wrap; font-family: "Courier New", monospace; font-size: 12px; }
          </style>
        </head>
        <body>
          <pre>${body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>COMMON CAUSE V. UOI (2023 ORDER) &bull; ICMR DNAR GUIDELINES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Two-Tier Medical Board Living Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download Primary and Secondary Medical Board approval formats and the 48-hour Judicial
            Magistrate (JMFC) intimation draft for India. Aligned with the January 2023 Supreme
            Court order in <em>Common Cause</em> and ICMR DNAR clinical rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#primary-board-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Medical Board Formats</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Create Living Will Plan</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Medical Law Desk</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">48 Hours</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EACH BOARD DECISION WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5+ Years</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DOCTOR EXPERIENCE (2023 RULE)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">CMO Nominee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDEPENDENT SECONDARY PANEL
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">JMFC Notice</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EX-POST RECORD (NO PRE-APPROVAL)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Protocol Tool)
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
                <span>Legal &amp; Clinical Basis</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Compliant with <em>Common Cause v. Union of India</em> (2018 &amp; Jan 24, 2023
                Modified Order), Article 21 of the Constitution, and ICMR Consensus Guidelines on
                Do Not Attempt Resuscitation (DNAR).
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>3 Ready Hospital Forms</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need the Primary Board report, Secondary Board countersignature, or JMFC notice?
                Jump straight to the copyable drafts.
              </p>
              <a
                href="#primary-board-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Board Formats</span>
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
                  src="/images/two-tier-medical-board-living-will-execution-format-og.jpg"
                  alt="Two-Tier Medical Board Living Will Format under Supreme Court 2023 Order"
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
                    Hospital Medical Board Execution Pack: Primary Opinion, Secondary Board
                    Countersignature &amp; 48-Hour JMFC Notice
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: TWO-TIER MEDICAL BOARD ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two Doctor Boards:</strong> Before stopping life support, two panels must
                    agree. Both the Primary Board and Secondary Board must check that there is no
                    cure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>48-Hour Goal:</strong> Each medical board should check the patient and
                    sign its report within 48 hours.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>5-Year Doctor Rule:</strong> Board doctors now need 5 years of work
                    experience. This replaces the old 20-year rule from 2018.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>CMO Doctor Check:</strong> The Secondary Board must include one doctor
                    named by the district Chief Medical Officer (CMO) and two outside experts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Simple Court Notice:</strong> Judges do not approve ICU care in advance.
                    Once both boards agree and the family signs consent, the hospital mails notice
                    to the JMFC.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY <h2> ON THE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY &amp; CONSTITUTIONAL FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Supreme Court 2023 Two-Tier Medical Board Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a patient with a valid Living Will enters an Intensive Care Unit (ICU) and
                  cannot speak, doctors cannot stop breathing machines on a verbal family request
                  alone. Indian law requires a strict two-tier hospital check to protect the patient.
                </p>
                <p>
                  In <strong>Common Cause v. Union of India (2018)</strong>, a five-judge Supreme
                  Court bench recognized the right to die with dignity under{" "}
                  <strong>Article 21 of the Constitution</strong>. However, the 2018 rules forced
                  families to wait for a Judicial Magistrate and doctors with 20 years of service.
                </p>
                <p>
                  On <strong>24 January 2023</strong>, the Constitution Bench issued a landmark{" "}
                  <strong>Modified Order (MA No. 1699 of 2019)</strong> to fix those delays. The
                  Court kept the two-tier board safety check, while making it practical for hospitals
                  to act within hours instead of months.
                </p>
                <p>
                  Most online portals still share old 2018 summaries and give no draft forms for the
                  doctors or hospital heads. Below, we provide ready-to-use drafts for the Primary
                  Board report, the Secondary Board approval, and the 48-hour JMFC notice.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE PROTOCOL TOOL */}
            <section id="interactive-protocol" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Activity className="w-4 h-4" />
                <span>INTERACTIVE HOSPITAL COMPLIANCE CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Hospital Board Protocol &amp; Readiness Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this interactive checker to review a live ICU case under the 2023 Supreme Court
                rules. Pick the clinical stage, Living Will status, and board stage to see the exact
                next legal step.
              </p>

              {/* Interactive Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-7">
                {/* 3 Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>1. Clinical Diagnosis</span>
                    </label>
                    <select
                      value={clinicalState}
                      onChange={(e) => setClinicalState(e.target.value as ClinicalStateKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(CLINICAL_STATES).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>2. Living Will Status</span>
                    </label>
                    <select
                      value={directiveStatus}
                      onChange={(e) => setDirectiveStatus(e.target.value as DirectiveStatusKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(DIRECTIVE_STATUS_MAP).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>3. Medical Board Stage</span>
                    </label>
                    <select
                      value={boardProgress}
                      onChange={(e) => setBoardProgress(e.target.value as BoardProgressKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="pending_primary">Primary Board Pending</option>
                      <option value="primary_approved">Primary Approved (Awaiting Secondary)</option>
                      <option value="both_approved">Both Boards Approved</option>
                      <option value="board_disagreed">Boards Disagreed or Refused</option>
                    </select>
                  </div>
                </div>

                {/* Live Legal Context Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-xs font-extrabold text-slate-900">
                      Clinical Threshold Note
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{clinicalInfo.summary}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-xs font-extrabold text-slate-900">
                      Directive Verification Note
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{directiveInfo.ruleNote}</p>
                  </div>
                </div>

                {/* Interactive Checklist Inside Tool */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Quick ICU File Check ({completedChecklistCount} /{" "}
                      {HOSPITAL_CHECKLIST_ITEMS.length} Verified)
                    </span>
                    <span className="text-xs font-bold text-[#C65378]">
                      {Math.round(
                        (completedChecklistCount / HOSPITAL_CHECKLIST_ITEMS.length) * 100
                      )}
                      % Complete
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {HOSPITAL_CHECKLIST_ITEMS.map((item) => {
                      const isDone = !!checkedSteps[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleChecklistItem(item.id)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isDone
                              ? "bg-emerald-50/70 border-emerald-200 text-slate-900"
                              : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                              isDone
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "bg-white border-slate-300"
                            }`}
                          >
                            {isDone && <Check className="w-3 h-3" />}
                          </span>
                          <span className="text-xs font-semibold leading-snug">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Outcome Card */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        PROTOCOL READINESS STATUS
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        outcome.tone === "emerald"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : outcome.tone === "amber"
                          ? "bg-amber-500/20 text-amber-200"
                          : "bg-rose-500/20 text-rose-200"
                      }`}
                    >
                      {outcome.badge}
                    </span>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">
                    {outcome.headline}
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    {outcome.guidance}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-100">
                    <strong>Required Next Step:</strong> {outcome.nextStep}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="board-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>TWO-TIER CLINICAL STRUCTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Primary vs Secondary Medical Board Rules (2023)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Supreme Court requires two separate boards so no single doctor acts alone. Review
                how the two boards differ in makeup, timing, and legal duties under the January 2023
                order:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Protocol Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Primary Medical Board</th>
                      <th className="py-3.5 px-4 text-[#5F7E75]">Secondary Medical Board</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Who Forms the Board?</td>
                      <td className="py-3 px-4">Hospital where the patient is admitted</td>
                      <td className="py-3 px-4">Hospital + District Chief Medical Officer (CMO)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Member Composition</td>
                      <td className="py-3 px-4">Treating physician + at least 2 subject experts</td>
                      <td className="py-3 px-4">
                        1 CMO-nominated doctor + at least 2 other independent experts
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Doctor Experience Rule</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Minimum 5 years (reduced from 20 years in 2023)
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Minimum 5 years (must not sit on Primary Board)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Target Decision Time</td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Preferably within 48 hours of referral
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        Preferably within 48 hours of Primary opinion
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Main Duty</td>
                      <td className="py-3 px-4">
                        Check terminal illness, Living Will copy, and futility of machines
                      </td>
                      <td className="py-3 px-4">
                        Do an independent bedside check and confirm or reject Primary view
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Magistrate (JMFC) Role</td>
                      <td className="py-3 px-4">Not involved during Primary Board review</td>
                      <td className="py-3 px-4">
                        Hospital sends written notice to JMFC after both boards agree
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PRIMARY MEDICAL BOARD CERTIFICATION FORMAT */}
            <section id="primary-board-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MANDATORY ASSET 1: PRIMARY BOARD REPORT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Primary Medical Board Certification Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The treating doctor and two hospital experts write their first view within 48 hours.
                Copy or print this clear form for the ICU file:
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      PRIMARY MEDICAL BOARD CERTIFICATION FORMAT (2023 SC COMPLIANT)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(PRIMARY_BOARD_TEMPLATE, setCopiedPrimary)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      {copiedPrimary ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Primary Format!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Primary Format</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        printTemplate("Primary Medical Board Format", PRIMARY_BOARD_TEMPLATE)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[520px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {PRIMARY_BOARD_TEMPLATE}
                </div>

                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <span>
                    Compliant with <em>Common Cause v. UOI</em> (24 Jan 2023 Order) &amp; ICMR DNAR
                    Guidelines
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(PRIMARY_BOARD_TEMPLATE, setCopiedPrimary)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECONDARY MEDICAL BOARD COUNTERSIGNATURE DRAFT */}
            <section id="secondary-board-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCheck className="w-4 h-4" />
                <span>MANDATORY ASSET 2: SECONDARY BOARD APPROVAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Secondary Medical Board Countersignature Draft
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                After the Primary Board signs, the Secondary Board checks the patient within 48
                hours. Use this form for the CMO doctor sign-off and family consent:
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      SECONDARY MEDICAL BOARD COUNTERSIGNATURE &amp; SURROGATE CONSENT DRAFT
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(SECONDARY_BOARD_TEMPLATE, setCopiedSecondary)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      {copiedSecondary ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Secondary Draft!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Secondary Draft</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        printTemplate("Secondary Medical Board Draft", SECONDARY_BOARD_TEMPLATE)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[520px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {SECONDARY_BOARD_TEMPLATE}
                </div>

                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <span>
                    Includes CMO Nominee declaration and Surrogate Written Informed Consent block
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(SECONDARY_BOARD_TEMPLATE, setCopiedSecondary)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 6: 48-HOUR JUDICIAL INTIMATION FORM */}
            <section id="jmfc-intimation-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MANDATORY ASSET 3: JMFC STATUTORY NOTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. 48-Hour Judicial Intimation Form to JMFC
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under the 2023 Supreme Court order, hospitals do not wait for prior judge orders.
                Before stopping life support, the hospital sends this written notice with board
                reports to the local JMFC court:
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      JMFC JUDICIAL INTIMATION FORM (EX-POST RECORD NOTICE)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(JMFC_INTIMATION_TEMPLATE, setCopiedJmfc)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      {copiedJmfc ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied JMFC Form!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy JMFC Form</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        printTemplate("JMFC Statutory Intimation Form", JMFC_INTIMATION_TEMPLATE)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[500px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {JMFC_INTIMATION_TEMPLATE}
                </div>

                <div className="p-4 bg-rose-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                  <span>
                    Do not have a valid Living Will yet? Draft yours under the 2023 Supreme Court
                    rules.
                  </span>
                  <Link
                    href="/templates/living-will-format-india"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a33b5c] transition-colors shrink-0"
                  >
                    <span>Get Free Living Will Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: HOSPITAL PROTOCOL SOP & CHECKLIST */}
            <section id="hospital-protocol-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>STEP-BY-STEP ICU WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Hospital ICU Protocol &amp; 48-Hour Execution Checklist
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Verify Patient Incapacity & Attested Living Will",
                    desc: "The treating physician confirms the patient is terminally ill and lacks decision-making capacity. The hospital verifies the Living Will against the surrogate's copy or digital custodian record.",
                  },
                  {
                    step: 2,
                    title: "Convene Primary Medical Board (Treating Doctor + 2 Experts)",
                    desc: "The hospital forms a Primary Board with the treating physician and at least two subject experts who hold at least 5 years of experience.",
                  },
                  {
                    step: 3,
                    title: "Record Primary Board Clinical Opinion Within 48 Hours",
                    desc: "The Primary Board examines the patient, checks all scans and labs, and signs its opinion preferably within 48 hours of referral.",
                  },
                  {
                    step: 4,
                    title: "Form Secondary Medical Board with District CMO Nominee",
                    desc: "If the Primary Board supports withdrawal, the hospital sets up a Secondary Board including one doctor nominated by the District Chief Medical Officer (CMO) and two independent experts.",
                  },
                  {
                    step: 5,
                    title: "Secondary Board Countersignature & Surrogate Consent (48 Hours)",
                    desc: "The Secondary Board checks the patient independently within 48 hours and confirms the decision. The appointed surrogate or next of kin signs informed consent.",
                  },
                  {
                    step: 6,
                    title: "Send JMFC Intimation & Deliver Continuous Comfort Care",
                    desc: "Before stopping artificial life support, the hospital sends written notice with all board reports to the JMFC. Full pain relief and palliative comfort care continue without break.",
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
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist Copy Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the Complete 10-Point Hospital Protocol Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Copy all required steps, board composition rules, and JMFC attachments in one
                    click.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Checklist Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 10-Point Checklist</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* SECTION 8: ICMR DNAR & PALLIATIVE CARE GUIDELINES */}
            <section id="icmr-dnar-guidelines" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartPulse className="w-4 h-4" />
                <span>ICMR CLINICAL ETHICS &amp; PALLIATIVE DUTY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. ICMR DNAR Guidelines &amp; Mandatory Comfort Care
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The <strong>ICMR Consensus Guidelines on DNAR</strong> work alongside a Living Will
                  in India. They guide ICU doctors when chest shocks or CPR cannot save a dying
                  patient.
                </p>
                <p>
                  Stopping a breathing machine or noting DNAR never means leaving a patient alone.
                  Doctors must keep full pain relief and bedside nursing active until natural death.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      ICMR DNAR Scope
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">CPR &amp; Shock Only</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    DNAR Applies Only to CPR and Heart Shocks
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A DNAR form stops futile CPR when the heart or lungs fail in terminal illness. It
                    does not stop medicine or nursing care unless both medical boards sign off.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Comfort Duty
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Always Required</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Pain Relief, Comfort &amp; Family Time
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Doctors must give safe pain medicine and keep mouth and skin care active. Close
                    family members get calm bedside time without fear of legal blame.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Active Euthanasia Is Still a Crime:</strong> No Living Will or board note
                  lets anyone give a lethal drug or shot to cause death. Only stopping futile
                  machines is lawful in India.
                </span>
              </div>
            </section>

            {/* SECTION 9: REAL HOSPITAL SCENARIOS & REMEDIES */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL HOSPITAL SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real ICU Scenarios &amp; High Court Remedies
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>SCENARIO 1: TIMELY 48-HOUR BOARD EXECUTION</span>
                    <span className="text-slate-500 font-semibold">Terminal Cancer ICU Case</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Honoring a Valid Living Will Within 4 Days
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 76-year-old man with late-stage cancer falls into a deep coma. His daughter
                    gives the hospital his Living Will naming her as surrogate. Within 48 hours,
                    three Primary Board doctors sign a futility note. Next, the District CMO picks a
                    doctor for the Secondary Board. Within 48 hours more, the second board signs off.
                    The hospital mails notice to the JMFC, and life support stops with full pain
                    care.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>SCENARIO 2: BOARD DELAY OR DISAGREEMENT</span>
                    <span className="text-slate-500 font-semibold">High Court Article 226 Writ</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    What Families Can Do If a Hospital Delays or Says No
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sometimes a hospital stalls out of legal fear, or the two boards disagree. The
                    family or hospital can then file a fast writ case in the{" "}
                    <strong>High Court under Article 226</strong>. The Chief Justice forms a fast
                    bench to check the ICU file and pass clear orders.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STATUTORY CITATIONS & INTERNAL GUIDES */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; RELATED RESOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Legal Citations &amp; Related Guides
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Key Laws and Court Rules in India:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 leading-relaxed">
                  <li>
                    <strong>Constitution of India, Article 21:</strong> Basic right to life, body
                    choice, and dignity near the end of life.
                  </li>
                  <li>
                    <strong>Common Cause (A Regd. Society) v. Union of India (2018) 5 SCC 1:</strong>{" "}
                    Five-judge Supreme Court verdict that made Living Wills legal in India.
                  </li>
                  <li>
                    <strong>
                      Supreme Court Order dated 24 January 2023 (MA No. 1699/2019):
                    </strong>{" "}
                    Ended prior judge consent, cut doctor work years from 20 to 5, and gave each
                    board 48 hours to decide.
                  </li>
                  <li>
                    <strong>ICMR Consensus Guidelines on DNAR (2020):</strong> Medical guide for
                    DNAR orders, family talks, and ongoing pain care.
                  </li>
                </ul>

                {/* Official External Portals (Verified HTTPS) */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-800">Official Government &amp; Court Portals:</div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.sci.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] font-semibold"
                    >
                      <span>Supreme Court of India</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.icmr.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] font-semibold"
                    >
                      <span>ICMR Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://main.mohfw.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] font-semibold"
                    >
                      <span>Ministry of Health (MoHFW)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://abdm.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] font-semibold"
                    >
                      <span>ABDM Digital Health Mission</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Verified Internal Linking Matrix */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-800">Related WillDrafting Guides &amp; Tools:</div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                    >
                      All Legal Templates Hub
                    </Link>
                    <Link
                      href="/templates/living-will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Living Will Format India
                    </Link>
                    <Link
                      href="/tools/living-will-advance-directive-eligibility-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Living Will Eligibility Checker
                    </Link>
                    <Link
                      href="/blogs/nri-children-managing-elderly-parents-estate-and-medical-will-in-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      NRI Guide for Parents&apos; Medical Will
                    </Link>
                    <Link
                      href="/blogs/medical-reimbursement-and-health-insurance-claim-after-patient-death"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Hospital Insurance Claim After Death
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Will Registration Advisory
                    </Link>
                    <Link
                      href="/contact"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Contact Legal Support Desk
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Medical Boards
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
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
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

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Living Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Living Will keeps your family safe from hard ICU choices. You decide your
                  care before an emergency hits. Your loved ones know your exact wishes in writing.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple 2023 Notary Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a Living Will on plain white paper with zero stamp duty. Sign it in
                  front of two adult witnesses and get a local Notary or Gazetted Officer stamp.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team drafts clear Advance Medical Directives and property Wills in simple words.
                  We also help families and hospitals prepare two-tier Medical Board records fast.
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
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate &amp; Medical Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lawyer focused on Indian Will law, Living Wills under Article 21, and ICU medical
                board rules at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - WILL & LIVING WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PROTECT YOUR DIGNITY &amp; ESTATE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Create Your Complete Will &amp; Living Will Plan
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Protect both your family assets and your end-of-life medical choices in clear,
                  court-ready language.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Plan Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2023 SC Order &amp; ISA 1925 Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - MEDICAL BOARD & HOSPITAL ADVISORY */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Stethoscope className="w-3 h-3" />
                  <span>LIVING WILL EXECUTION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Urgent Hospital Medical Board Support?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers help families and hospital teams prepare board reports, CMO letters,
                  and JMFC court notices fast.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Consult Medical Law Desk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Hospitals &amp; Families Trust These Forms
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2023 SC Order Ready:</strong> Follows the 5-year doctor rule and
                      48-hour board clock.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>ICMR DNAR Aligned:</strong> Protects mandatory pain relief and comfort
                      care.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>JMFC Record Notice:</strong> Ready ex-post notice with all four board
                      annexures.
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
          href="#primary-board-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Board Formats</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal Support</span>
        </Link>
      </div>
    </div>
  );
}
