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
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  TrendingUp,
  Users,
  FileText,
  Layers,
  AlertOctagon,
  Stethoscope,
  PenTool,
  Eye,
  FileWarning,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. How to Check Will Validity in India" },
  { id: "interactive-audit-checker", label: "2. Interactive Section 63 Audit Checker" },
  { id: "section-63-three-pillars", label: "3. Section 63: 3 Mandatory Execution Rules" },
  { id: "section-67-witness-trap", label: "4. Section 67 Witness Disqualification Trap" },
  { id: "suspicious-circumstances-test", label: "5. Supreme Court Suspicious Circumstances" },
  { id: "plain-paper-vs-registered", label: "6. Plain Paper, Handwritten, eSign & Video" },
  { id: "testamentary-capacity-sec-59", label: "7. Section 59 Sound Mind & Doctor Proof" },
  { id: "comparison-table-defects", label: "8. Comparison: Fatal vs Curable Defects" },
  { id: "step-by-step-remediation-sop", label: "9. Step-by-Step SOP: Fix a Defective Will" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Valid vs Void Wills" },
  { id: "legal-clause-templates", label: "11. Copy-Paste Section 63(c) & Doctor Clauses" },
  { id: "institutional-profile", label: "12. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "How do I check if a Will is valid in India?",
    a: "You can check if a Will is valid by auditing four statutory requirements under the Indian Succession Act, 1925: (1) Under Section 59, the testator must be at least 18 years old and of sound mind, (2) Under Section 61, the Will must be free from fraud, coercion, or undue influence, (3) Under Section 63(a) and 63(b), the testator must sign or affix a thumb mark with the clear intention of executing a Will, and (4) Under Section 63(c), at least two witnesses must attest the Will in the testator's presence.",
  },
  {
    q: "Is a plain-paper DIY Will valid without registration or stamp paper?",
    a: "Yes. Under Indian law, a Will attracts zero stamp duty and does not need to be written on stamp paper. Furthermore, Section 18(e) of the Registration Act, 1908 makes Will registration completely optional. A Will written or printed on plain white paper is 100% legally valid if it strictly satisfies the two-witness execution rules of Section 63 of the Indian Succession Act.",
  },
  {
    q: "What happens if a beneficiary or their spouse signs as an attesting witness?",
    a: "This is one of the most common DIY Will mistakes. Under Section 67 of the Indian Succession Act, 1925, if an attesting witness (or their wife or husband) is given any property or cash in the Will, that specific gift becomes legally void. While Section 67 strictly voids the gift in Christian and Parsi Wills, Indian courts also treat a beneficiary witness in Hindu, Sikh, and Jain Wills as a grave suspicious circumstance indicating undue influence.",
  },
  {
    q: "Does lack of a doctor's medical certificate make a Will invalid?",
    a: "No. Section 63 does not require a doctor's certificate for a Will to be legally valid. However, if the testator is over 65 years old, hospitalized, or suffering from physical illness, rival family members often challenge the Will under Section 59 claiming dementia or mental incapacity. Having a registered MBBS or MD doctor sign a mental fitness certificate on the same day makes the Will nearly impossible to challenge on capacity grounds.",
  },
  {
    q: "Is an Aadhaar eSign, DocuSign, or digitally signed PDF Will valid in India?",
    a: "No, it is 100% void. Under Section 1(4) read with Entry 3 of the First Schedule to the Information Technology Act, 2000, testamentary dispositions and Wills are explicitly excluded from digital signature validity. You can draft your Will online, but you must print it on physical paper and sign it in wet ink (or physical thumbprint) in front of two physical witnesses.",
  },
  {
    q: "Is an unwitnessed handwritten Will valid in India?",
    a: "No. Some foreign countries recognize unwitnessed handwritten (holographic) Wills, but Indian law does not. Under Section 63(c) of the Indian Succession Act, every unprivileged civilian Will in India, whether handwritten in a diary or typed on a computer, must be attested by at least two witnesses. Without two witnesses, a handwritten note has zero testamentary validity.",
  },
  {
    q: "What are 'suspicious circumstances' under the Supreme Court's H. Venkatachala Iyengar ruling?",
    a: "In H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443), the Supreme Court held that even if technical execution is proved, the propounder must dispel any suspicious circumstances surrounding the Will. Common red flags include: shaky or illogical signature placement, active participation of the main beneficiary in hiring the lawyer or bringing witnesses, unexplained exclusion of a dependent wife or child, and blank spaces filled in different ink.",
  },
  {
    q: "How should I fix a defective Will that I already signed or registered?",
    a: "Never cross out lines, use whitener, or write margin notes on an already signed Will, as uninitialed alterations are invalid under Section 71 of the Indian Succession Act. Instead, under Section 62 and Section 70, you should execute a fresh, clean Will that includes an explicit Revocation Clause cancelling all prior Wills, and sign it before two independent adult witnesses.",
  },
];

interface AuditQuestion {
  id: string;
  number: number;
  category: string;
  statute: string;
  question: string;
  helpText: string;
  options: {
    value: "pass" | "warn" | "fail";
    label: string;
    points: number;
    isFatal?: boolean;
    defectTitle?: string;
    defectDetail?: string;
    remedy?: string;
    passNote?: string;
  }[];
}

const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: "q1_capacity",
    number: 1,
    category: "Pillar I: Testamentary Capacity",
    statute: "Section 59, ISA 1925",
    question: "Was the testator 18+ years old and of sound disposing mind when signing?",
    helpText: "The testator must understand the nature of the act, the extent of their property, and the family members being included or excluded.",
    options: [
      {
        value: "pass",
        label: "Yes, 18+ & Alert Mind",
        points: 10,
        passNote: "Satisfies Section 59 adult age and sound disposing mind requirement.",
      },
      {
        value: "warn",
        label: "Elderly / Mild Forgetfulness (No Dementia)",
        points: 4,
        defectTitle: "Section 59 Capacity Challenge Vulnerability",
        defectDetail:
          "Old age or mild memory loss does not invalidate a Will by itself, but rival heirs frequently allege lack of sound mind in probate court if no contemporaneous medical proof exists.",
        remedy:
          "Attach a same-day Mental Fitness Certificate signed by a registered MBBS/MD doctor and record a 3-minute smartphone video of the testator reading and signing the Will.",
      },
      {
        value: "fail",
        label: "No (Minor Under 18 / Coma / Advanced Dementia)",
        points: 0,
        isFatal: true,
        defectTitle: "FATAL DEFECT: Lack of Testamentary Capacity (Section 59 ISA)",
        defectDetail:
          "Under Section 59 Explanation 4 of the Indian Succession Act, 1925, a minor (under 18) or a person who does not know what they are doing due to illness, dementia, or unconsciousness cannot make a valid Will.",
        remedy:
          "A Will signed without lucid mental capacity is void ab initio. If the testator has lucid intervals (Section 59 Explanation 3), execution must occur strictly during a doctor-certified lucid period.",
      },
    ],
  },
  {
    id: "q2_signature_medium",
    number: 2,
    category: "Pillar II: Execution Medium",
    statute: "Section 63(a) ISA & IT Act Sch. I",
    question: "How did the testator sign or execute the Will document?",
    helpText: "Indian law requires physical execution on paper. Digital signatures and standalone videos are excluded by statute.",
    options: [
      {
        value: "pass",
        label: "Wet-Ink Signature on Physical Paper (or Thumbprint with Clause)",
        points: 12,
        passNote: "Complies with Section 63(a) physical signature or explained mark requirement.",
      },
      {
        value: "warn",
        label: "Thumb Impression Without Medical Reason Clause",
        points: 4,
        defectTitle: "Unexplained Thumb Impression Risk (Section 63(a) ISA)",
        defectDetail:
          "While a thumbprint (LTI for males, RTI for females) is valid under Section 63(a), an unexplained thumbprint by a literate person invites allegations that the thumb was pressed while the testator was unconscious.",
        remedy:
          "Add a specific 'Read-Over, Explained & Medical Reason Endorsement Clause' stating why a thumb impression was affixed (e.g., Parkinson's tremors, stroke, or arthritis).",
      },
      {
        value: "fail",
        label: "Aadhaar eSign / DSC / Unwitnessed Video / Unsigned Draft",
        points: 0,
        isFatal: true,
        defectTitle: "FATAL DEFECT: Invalid Execution Medium (Sec 63(a) & IT Act Sch. I)",
        defectDetail:
          "Under Entry 3 of the First Schedule to the Information Technology Act, 2000, Wills are explicitly excluded from electronic signatures. An Aadhaar eSign PDF, unsigned draft, or standalone video recording is 100% legally void.",
        remedy:
          "Print the Will on physical paper immediately and sign it in wet ink (or physical thumb mark) in the physical presence of two adult witnesses.",
      },
    ],
  },
  {
    id: "q3_witness_count",
    number: 3,
    category: "Pillar II: Mandatory Attestation",
    statute: "Section 63(c), ISA 1925",
    question: "How many adult witnesses signed (attested) the Will?",
    helpText: "Even a notarized or handwritten Will requires the statutory minimum number of attesting witnesses.",
    options: [
      {
        value: "pass",
        label: "2 or More Adult Witnesses",
        points: 15,
        passNote: "Meets the mandatory two-witness threshold under Section 63(c) ISA.",
      },
      {
        value: "fail",
        label: "Only 1 Witness Signed",
        points: 0,
        isFatal: true,
        defectTitle: "FATAL DEFECT: Only One Attesting Witness (Section 63(c) ISA)",
        defectDetail:
          "Section 63(c) of the Indian Succession Act strictly mandates that an unprivileged Will 'shall be attested by two or more witnesses.' A Will signed by only one witness is legally invalid and cannot be probated.",
        remedy:
          "Have the testator acknowledge their signature in the presence of a second independent adult witness who then signs in the testator's presence, or re-execute a fresh Will with two witnesses.",
      },
      {
        value: "fail",
        label: "0 Witnesses (Only Testator Signed or Only Notarized)",
        points: 0,
        isFatal: true,
        defectTitle: "FATAL DEFECT: Unwitnessed Will (Section 63(c) ISA)",
        defectDetail:
          "An unwitnessed Will (even if 100% handwritten by the testator or stamped by a Notary alone) is completely void under Section 63(c) of the Indian Succession Act, 1925.",
        remedy:
          "Execute the Will afresh in the physical presence of at least two independent adult attesting witnesses.",
      },
    ],
  },
  {
    id: "q4_mutual_presence",
    number: 4,
    category: "Pillar II: Presence Sequence",
    statute: "Section 63(c), ISA 1925",
    question: "Did each witness sign the Will in the physical presence of the testator?",
    helpText: "Many DIY Wills fail because someone takes the signed paper to a neighbor's house or office in another room to get witness signatures.",
    options: [
      {
        value: "pass",
        label: "Yes, Both Signed in Testator's Physical Presence",
        points: 10,
        passNote: "Satisfies Section 63(c) mutual presence and sight-line rule.",
      },
      {
        value: "fail",
        label: "No, Witnesses Signed in Another Room or Later Away from Testator",
        points: 0,
        isFatal: true,
        defectTitle: "FATAL DEFECT: Witnesses Did Not Sign in Testator's Presence (Sec 63(c))",
        defectDetail:
          "Under Section 63(c), each witness must either see the testator sign or receive a personal acknowledgment from the testator, AND each witness MUST sign the Will in the presence of the testator. Taking the paper elsewhere for witness signatures invalidates attestation.",
        remedy:
          "Re-execute the Will where the testator and both witnesses are seated together in the same room with an unobstructed line of sight.",
      },
    ],
  },
  {
    id: "q5_witness_beneficiary",
    number: 5,
    category: "Pillar III: Witness Independence",
    statute: "Section 67, ISA 1925",
    question: "Is either attesting witness a beneficiary (or the spouse of a beneficiary) in the Will?",
    helpText: "For example: Did your wife, son, daughter, or son-in-law (whose spouse inherits) sign as one of the two witnesses?",
    options: [
      {
        value: "pass",
        label: "No, Both Are Neutral Non-Beneficiaries (Friends/Colleagues/CA)",
        points: 10,
        passNote: "Zero Section 67 conflict of interest; witnesses are 100% independent.",
      },
      {
        value: "fail",
        label: "Yes, a Beneficiary or Beneficiary's Spouse Signed as Witness",
        points: 0,
        isFatal: false, // Handled dynamically based on religion in scoring engine
        defectTitle: "CRITICAL TRAP: Beneficiary or Spouse Signed as Witness (Section 67 ISA)",
        defectDetail:
          "Under Section 67 of the Indian Succession Act, any bequest made to an attesting witness or their spouse is utterly VOID (strictly enforced for Christian/Parsi/SMA Wills). For Hindu, Sikh, and Jain Wills, Supreme Court rulings treat a beneficiary witness as a grave suspicious circumstance of undue influence.",
        remedy:
          "Immediately re-execute the Will using two neutral adult witnesses (such as family friends, neighbors, colleagues, a Chartered Accountant, or a family doctor) who receive zero benefit under the Will.",
      },
    ],
  },
  {
    id: "q6_witness_age",
    number: 6,
    category: "Pillar III: Probate Proof",
    statute: "Section 67, BSA 2023 (Sec 68 IEA)",
    question: "Are the attesting witnesses younger than the testator and identifiable with KYC details?",
    helpText: "Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023, at least one witness must testify in court after the testator's death.",
    options: [
      {
        value: "pass",
        label: "Yes, Younger Witnesses With Full Address & Aadhaar/PAN Noted",
        points: 6,
        passNote: "Ensures smooth post-death witness deposition under Section 67 BSA 2023.",
      },
      {
        value: "warn",
        label: "Witnesses Are 75+ / Older Than Testator / Missing Address",
        points: 2,
        defectTitle: "Post-Death Probate Proof Risk (Section 67 & 68 BSA 2023)",
        defectDetail:
          "If an 80-year-old testator chooses two 82-year-old friends as witnesses, both witnesses may pass away before the Will comes up for probate, forcing heirs into complex Section 68 BSA secondary handwriting verification.",
        remedy:
          "Choose attesting witnesses who are 10 to 20 years younger than the testator and clearly print their full name, father's name, residential address, and mobile/PAN number below their signature.",
      },
    ],
  },
  {
    id: "q7_attestation_clause",
    number: 7,
    category: "Pillar II: Drafting Formalities",
    statute: "Section 63(c) Read With Janki Narayan Bhoir SC",
    question: "Does the Will contain a formal Section 63(c) Attestation Clause above the witness signatures?",
    helpText: "An attestation clause explicitly records that the testator signed in the presence of the witnesses and the witnesses signed in the testator's presence.",
    options: [
      {
        value: "pass",
        label: "Yes, Complete Section 63(c) Attestation Paragraph Included",
        points: 8,
        passNote: "Contains formal attestation recital establishing presumption of due execution.",
      },
      {
        value: "warn",
        label: "No, Witnesses Just Signed Under the Word 'Witnesses'",
        points: 3,
        defectTitle: "Missing Formal Attestation Clause (Section 63(c) Vulnerability)",
        defectDetail:
          "While Section 63(c) states no particular form of attestation is mandatory, omitting the attestation paragraph removes the legal presumption of due execution (omnia praesumuntur rite esse acta) if witnesses later forget details during cross-examination.",
        remedy:
          "Include our copy-paste Section 63(c) Simultaneous Attestation Clause right above the witness signature blocks.",
      },
    ],
  },
  {
    id: "q8_page_signatures",
    number: 8,
    category: "Pillar III: Anti-Tampering",
    statute: "Section 71, ISA 1925 & SC Precedents",
    question: "Is the Will signed by the testator on EVERY page, with zero uninitialed cuttings or ink changes?",
    helpText: "Unsigned intermediate pages or handwritten corrections without full countersignatures are prime targets for probate objections.",
    options: [
      {
        value: "pass",
        label: "Yes, Signed on Every Page & Clean Print (No Uninitialed Edits)",
        points: 7,
        passNote: "Eliminates page-substitution allegations and Section 71 alteration disputes.",
      },
      {
        value: "warn",
        label: "Signed Only on Last Page OR Contains Uninitialed Overwriting",
        points: 2,
        defectTitle: "Page Substitution & Section 71 Unattested Alteration Risk",
        defectDetail:
          "Under Section 71 of the Indian Succession Act, any obliteration, interlineation, or alteration made after execution has ZERO legal effect unless signed by the testator and attested by the witnesses in the margin. Signing only the last page also allows challengers to allege that middle pages were swapped.",
        remedy:
          "Ensure the testator signs at the bottom of every single numbered page (Page 1 of N) and never make handwritten edits without full testator + witness countersignatures.",
      },
    ],
  },
  {
    id: "q9_revocation_residuary",
    number: 9,
    category: "Pillar III: Completeness",
    statute: "Sections 70 & 102, ISA 1925",
    question: "Does the Will include both a Prior Will Revocation Clause and a Residuary Clause?",
    helpText: "A Residuary Clause covers any bank account, mutual fund, or property you forgot to list or acquired after making the Will.",
    options: [
      {
        value: "pass",
        label: "Yes, Includes Both Revocation & Residuary Clauses",
        points: 6,
        passNote: "Prevents partial intestacy under Section 102 and conflicts with older Wills.",
      },
      {
        value: "warn",
        label: "Missing Revocation Clause or Missing Residuary Clause",
        points: 2,
        defectTitle: "Partial Intestacy & Prior Will Conflict Risk (Sec 70 & 102 ISA)",
        defectDetail:
          "Without a Residuary Clause (Section 102 ISA), any unlisted or newly purchased asset falls into intestate succession, forcing your heirs to get a separate Succession Certificate. Also, for NRIs, an overly broad global revocation clause can accidentally revoke a foreign US/UK Will!",
        remedy:
          "Insert an Indian-Situs Revocation Clause and a comprehensive Residuary Clause covering all present and future unlisted movable and immovable assets.",
      },
    ],
  },
  {
    id: "q10_exclusion_reason",
    number: 10,
    category: "Pillar III: Suspicious Circumstances",
    statute: "H. Venkatachala Iyengar & Kavita Kanwar SC Rules",
    question: "If any Class I natural heir (spouse, son, daughter) is excluded or given less, is a reason stated?",
    helpText: "In Hindu/Muslim/Christian families, disinheriting a child or spouse without mentioning why triggers intense court scrutiny.",
    options: [
      {
        value: "pass",
        label: "Balanced Distribution OR Clear Reason Stated for Exclusion",
        points: 6,
        passNote: "Dispels unnatural disposition suspicion under H. Venkatachala Iyengar.",
      },
      {
        value: "warn",
        label: "Natural Heir Excluded or Left Out Without Any Explanation",
        points: 1,
        defectTitle: "Unexplained Exclusion of Natural Heir (Supreme Court Red Flag)",
        defectDetail:
          "In Kavita Kanwar v. Pamela Mehta (2020 SC) and Ram Piari v. Bhagwant (1990 SC), the Supreme Court noted that silently omitting a natural Class I legal heir without stating why is treated as a strong suspicious circumstance suggesting coercion or forgetfulness.",
        remedy:
          "Explicitly name all Class I legal heirs in the family tree clause and add a polite, factual Exclusion Clause explaining why a particular heir is receiving a smaller or nil share.",
      },
    ],
  },
  {
    id: "q11_doctor_certificate",
    number: 11,
    category: "Pillar I: Medical Safeguard",
    statute: "Section 59 ISA Evidentiary Shield",
    question: "Is a Doctor's Mental Fitness Certificate attached or endorsed on the Will?",
    helpText: "Highly recommended for testators above age 65, or anyone with chronic illness, hospitalization, or unequal asset distribution.",
    options: [
      {
        value: "pass",
        label: "Yes, MBBS/MD Doctor Certificate Signed on Same Date",
        points: 5,
        passNote: "Gold-standard clinical defense against mental incapacity allegations.",
      },
      {
        value: "warn",
        label: "No Doctor Certificate Attached",
        points: 2,
        defectTitle: "No Clinical Fitness Endorsement (Recommended for Seniors 65+)",
        defectDetail:
          "While not mandatory by statute, 80% of Indian probate caveats allege that an elderly parent was on heavy medication, senile, or mentally unfit on the date of signing.",
        remedy:
          "Have a registered Medical Practitioner (MBBS/MD) examine the testator on the day of signing and endorse our Doctor Fitness Clause with their Registration Number and stamp.",
      },
    ],
  },
  {
    id: "q12_registration_propounder",
    number: 12,
    category: "Pillar III: Undue Influence Shield",
    statute: "Section 61 ISA & Registration Act s. 18/40",
    question: "Was the Will registered at the Sub-Registrar Office, and were beneficiaries kept out of the signing room?",
    helpText: "Active participation by the main beneficiary during drafting or signing is the #1 ground for 'undue influence' under Section 61.",
    options: [
      {
        value: "pass",
        label: "Registered at SRO (or Clean Execution With Beneficiaries Absent)",
        points: 5,
        passNote: "Strong safeguard against Section 61 undue influence and forgery claims.",
      },
      {
        value: "warn",
        label: "Major Beneficiary Arranged Execution / Sat in Signing Room",
        points: 0,
        defectTitle: "Active Participation of Major Beneficiary (Section 61 & SC Rule)",
        defectDetail:
          "Under H. Venkatachala Iyengar (1959 SC) and Shivakumar v. Sharanabasappa (2020 SC), if the primary beneficiary dictates the Will, brings their own friends as witnesses, or sits in the room controlling the testator, courts presume undue influence unless strictly disproved.",
        remedy:
          "Re-execute the Will independently without any beneficiary present in the room, and consider registering it at the Sub-Registrar Office under Section 40 of the Registration Act.",
      },
    ],
  },
];

export default function WillValidityAuditClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedDoctorClause, setCopiedDoctorClause] = useState<boolean>(false);

  // Context Selectors
  const [religionLaw, setReligionLaw] = useState<"hindu_sikh_jain" | "christian_parsi_sma" | "muslim_shariat">(
    "hindu_sikh_jain"
  );
  const [testatorAgeGroup, setTestatorAgeGroup] = useState<"under_65" | "65_to_75" | "above_75">("65_to_75");
  const [muslimExceedsOneThird, setMuslimExceedsOneThird] = useState<boolean>(false);

  // Answers state: index of selected option (0, 1, or 2) for each of the 12 questions
  // Default represents a typical slightly flawed DIY Plain-Paper Will so users immediately see an insightful diagnostic
  const [answers, setAnswers] = useState<Record<string, number>>({
    q1_capacity: 0,
    q2_signature_medium: 0,
    q3_witness_count: 0,
    q4_mutual_presence: 0,
    q5_witness_beneficiary: 0,
    q6_witness_age: 0,
    q7_attestation_clause: 1, // Missing formal attestation clause
    q8_page_signatures: 0,
    q9_revocation_residuary: 0,
    q10_exclusion_reason: 0,
    q11_doctor_certificate: 1, // No doctor certificate
    q12_registration_propounder: 0,
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

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  // Preset Scenarios
  const applyPreset = (preset: "bulletproof" | "typical_diy" | "beneficiary_witness" | "fatal_esign") => {
    if (preset === "bulletproof") {
      setMuslimExceedsOneThird(false);
      setAnswers({
        q1_capacity: 0,
        q2_signature_medium: 0,
        q3_witness_count: 0,
        q4_mutual_presence: 0,
        q5_witness_beneficiary: 0,
        q6_witness_age: 0,
        q7_attestation_clause: 0,
        q8_page_signatures: 0,
        q9_revocation_residuary: 0,
        q10_exclusion_reason: 0,
        q11_doctor_certificate: 0,
        q12_registration_propounder: 0,
      });
    } else if (preset === "typical_diy") {
      setMuslimExceedsOneThird(false);
      setAnswers({
        q1_capacity: 0,
        q2_signature_medium: 0,
        q3_witness_count: 0,
        q4_mutual_presence: 0,
        q5_witness_beneficiary: 0,
        q6_witness_age: 1,
        q7_attestation_clause: 1,
        q8_page_signatures: 1,
        q9_revocation_residuary: 1,
        q10_exclusion_reason: 1,
        q11_doctor_certificate: 1,
        q12_registration_propounder: 0,
      });
    } else if (preset === "beneficiary_witness") {
      setMuslimExceedsOneThird(false);
      setAnswers({
        q1_capacity: 0,
        q2_signature_medium: 0,
        q3_witness_count: 0,
        q4_mutual_presence: 0,
        q5_witness_beneficiary: 1, // Spouse/beneficiary signed as witness!
        q6_witness_age: 0,
        q7_attestation_clause: 1,
        q8_page_signatures: 0,
        q9_revocation_residuary: 0,
        q10_exclusion_reason: 0,
        q11_doctor_certificate: 1,
        q12_registration_propounder: 1,
      });
    } else if (preset === "fatal_esign") {
      setMuslimExceedsOneThird(false);
      setAnswers({
        q1_capacity: 0,
        q2_signature_medium: 2, // Aadhaar eSign / Unsigned
        q3_witness_count: 2, // 0 Witnesses
        q4_mutual_presence: 1,
        q5_witness_beneficiary: 0,
        q6_witness_age: 0,
        q7_attestation_clause: 1,
        q8_page_signatures: 1,
        q9_revocation_residuary: 1,
        q10_exclusion_reason: 0,
        q11_doctor_certificate: 1,
        q12_registration_propounder: 0,
      });
    }
  };

  // ==========================================
  // STATUTORY COURT-DEFENSIBILITY SCORING ENGINE
  // ==========================================
  let rawPoints = 0;
  let hasFatalDefect = false;
  const detectedDefects: {
    title: string;
    detail: string;
    remedy: string;
    statute: string;
    severity: "FATAL" | "HIGH" | "MODERATE";
  }[] = [];
  const passedSafeguards: {
    questionNum: number;
    statute: string;
    note: string;
  }[] = [];

  AUDIT_QUESTIONS.forEach((q) => {
    const selectedIdx = answers[q.id] ?? 0;
    const chosen = q.options[selectedIdx] || q.options[0];

    // Adjust doctor certificate points if testator is under 65
    let effectivePoints = chosen.points;
    if (q.id === "q11_doctor_certificate" && selectedIdx === 1 && testatorAgeGroup === "under_65") {
      effectivePoints = 4;
    }

    rawPoints += effectivePoints;

    if (chosen.value === "pass" && chosen.passNote) {
      passedSafeguards.push({
        questionNum: q.number,
        statute: q.statute,
        note: chosen.passNote,
      });
    } else if (chosen.defectTitle && chosen.defectDetail && chosen.remedy) {
      let isQuestionFatal = Boolean(chosen.isFatal);
      let severityLevel: "FATAL" | "HIGH" | "MODERATE" = isQuestionFatal
        ? "FATAL"
        : chosen.value === "fail"
        ? "HIGH"
        : "MODERATE";

      // Section 67 religious nuance: For Christian/Parsi/SMA Wills, beneficiary witness strictly voids the bequest
      if (q.id === "q5_witness_beneficiary" && selectedIdx === 1) {
        if (religionLaw === "christian_parsi_sma") {
          isQuestionFatal = true;
          severityLevel = "FATAL";
        } else {
          severityLevel = "HIGH";
        }
      }

      if (isQuestionFatal) {
        hasFatalDefect = true;
      }

      detectedDefects.push({
        title: chosen.defectTitle,
        detail: chosen.defectDetail,
        remedy: chosen.remedy,
        statute: q.statute,
        severity: severityLevel,
      });
    }
  });

  // Additional Muslim Shariat 1/3rd Wasiyat check
  if (religionLaw === "muslim_shariat" && muslimExceedsOneThird) {
    rawPoints = Math.max(0, rawPoints - 25);
    detectedDefects.unshift({
      title: "Shariat 1/3rd Wasiyat Limit & Heir Consent Trap",
      detail:
        "Under the Muslim Personal Law (Shariat) Application Act, 1937 (Mulla's Principles ss. 115-118), a Muslim cannot bequeath more than 1/3rd of their net estate via Wasiyat, and under Sunni Hanafi law, any bequest to a legal heir is invalid unless the remaining Faraid legal heirs give express consent AFTER the testator's death.",
      remedy:
        "Restrict your Wasiyat bequest to 1/3rd of the net estate for non-heirs, obtain a post-death Heir Consent Annex, or use a lifetime Hiba (gift) for transferring shares above 1/3rd.",
      statute: "Shariat Act, 1937 & Mulla ss. 115-118",
      severity: "HIGH",
    });
  }

  // If a fatal statutory defect exists (e.g., 0/1 witness, eSign only, witnesses signed away from testator, or lack of capacity),
  // cap the Court-Defensibility Score so the user is never misled into thinking a 1-witness Will is 85% valid!
  const finalScore = hasFatalDefect ? Math.min(rawPoints, 25) : Math.min(100, Math.max(0, rawPoints));

  let verdictTitle = "Ironclad & Court-Defensible Will";
  let verdictBadge = "90-100 • STATUTORY PASS";
  let verdictColorClass = "bg-emerald-50/80 border-emerald-300 text-emerald-950";

  if (hasFatalDefect) {
    verdictTitle = "Fatal Statutory Defect Detected (Void / Unenforceable)";
    verdictBadge = "CRITICAL FAILURE • SECTION 63 / 67";
    verdictColorClass = "bg-rose-50/90 border-rose-400 text-rose-950";
  } else if (finalScore < 65) {
    verdictTitle = "High Probate Litigation Risk (Redraft Strongly Advised)";
    verdictBadge = "HIGH VULNERABILITY • CAVEAT RISK";
    verdictColorClass = "bg-amber-50/90 border-amber-300 text-amber-950";
  } else if (finalScore < 90) {
    verdictTitle = "Legally Valid Under Section 63, But Vulnerable in Court";
    verdictBadge = "MODERATE RISK • FORTIFY DRAFT";
    verdictColorClass = "bg-blue-50/80 border-blue-300 text-blue-950";
  }

  const copyAttestationToClipboard = () => {
    const clauseText = `SECTION 63(c) SIMULTANEOUS WITNESS ATTESTATION CLAUSE (INDIAN SUCCESSION ACT, 1925):
"SIGNED, EXECUTED, AND DECLARED by the above-named Testator, [Full Name of Testator], as and for his/her Last Will and Testament, consisting of [Total Pages] pages (each page having been individually signed by the Testator), in our joint physical presence, who at his/her request, in his/her physical presence, and in the physical presence of each other, have hereunto subscribed our respective names and signatures as Attesting Witnesses on this [Day] day of [Month], [Year] at [City, State]. We further affirm that at the time of execution, the Testator appeared to be of sound, alert, and disposing mind, memory, and understanding, and executed this Will voluntarily of his/her own free agency without any coercion or undue influence.

WITNESS 1:
Signature: _______________________
Full Name: [Name of Witness 1]
S/o, D/o, W/o: [Parent/Spouse Name]
Age: [Age] Years | Occupation: [Occupation]
Address: [Full Residential Address with PIN Code]
ID Proof (Aadhaar/PAN): [ID Number]

WITNESS 2:
Signature: _______________________
Full Name: [Name of Witness 2]
S/o, D/o, W/o: [Parent/Spouse Name]
Age: [Age] Years | Occupation: [Occupation]
Address: [Full Residential Address with PIN Code]
ID Proof (Aadhaar/PAN): [ID Number]"`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyDoctorClauseToClipboard = () => {
    const doctorText = `REGISTERED MEDICAL PRACTITIONER (DOCTOR) MENTAL FITNESS CERTIFICATE FOR WILL (SECTION 59 COMPLIANCE):
"I, Dr. [Full Name of Doctor], holding Medical Registration No. [MCI/SMC Registration Number], practicing at [Hospital/Clinic Name & Address], hereby certify that I have personally examined [Full Name of Testator], aged [Age] years, son/daughter/wife of [Name], residing at [Address], today on [Date] at [Time AM/PM].

Based on my clinical examination, I confirm that the Testator is fully conscious, well-oriented to time, place, and person, and is of sound and disposing state of mind. He/she suffers from no cognitive impairment, delusion, or mental incapacity that would affect his/her ability to understand the nature and effect of executing this Last Will and Testament.

Signature of Doctor: _______________________
Name: Dr. [Full Name], [MBBS / MD]
Registration No.: [Reg. No. & State Medical Council]
Date & Official Clinic Stamp: [Date]"`;
    navigator.clipboard.writeText(doctorText);
    setCopiedDoctorClause(true);
    setTimeout(() => setCopiedDoctorClause(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 59, 61, 63 &amp; 67</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Check If Will Is Valid in India: Section 63 Audit Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Run a free <strong>12-Question Statutory Diagnostic</strong> on your plain-paper or registered
            Will. Instantly calculate your <strong>0 to 100 Court-Defensibility Score</strong> and detect
            fatal Section 63(c) attestation defects, Section 67 beneficiary-witness traps, and Supreme Court
            suspicious circumstances.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-audit-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Start 12-Point Will Validity Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Redraft a Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 63(c)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2 MANDATORY WITNESSES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 67</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WITNESS BEQUEST TRAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0 to 100</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COURT DEFENSIBILITY SCORE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">12-Point Test</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUPREME COURT AUDIT
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
                Governed under Sections 59, 61, 63, 67, 70 &amp; 71 of the Indian Succession Act, 1925,
                Section 67 of the Bharatiya Sakshya Adhiniyam, 2023, and landmark Supreme Court ruling H.
                Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443).
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
                <span>EXECUTIVE BRIEF: WILL VALIDITY IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Plain-Paper Wills Are Valid:</strong> A Will does not need stamp paper or
                    compulsory registration under Section 18(e) of the Registration Act, 1908. However, it
                    must strictly satisfy Section 63 of the Indian Succession Act, 1925.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two-Witness Rule Is Mandatory:</strong> Under Section 63(c), every civilian Will
                    (even if handwritten or notarized) must be attested by at least two adult witnesses who
                    sign in the physical presence of the testator.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Never Use a Beneficiary or Spouse as Witness:</strong> Under Section 67, if an
                    attesting witness or their spouse is a beneficiary, their inheritance becomes void (for
                    Christian/Parsi Wills) or triggers a major court suspicion (for Hindu Wills).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Aadhaar eSign &amp; Video-Only Wills Are Void:</strong> The Information Technology
                    Act, 2000 First Schedule explicitly excludes Wills. Only a physical paper document signed
                    in wet ink or thumb mark is valid in court.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. How to Check If a Will Is Valid in India Under Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every week, thousands of Indian families ask whether a plain-paper or homemade Will is
                  legally valid. The short answer is yes, provided it complies with the statutory execution
                  rules. A fatal defect in a Will is rarely discovered while the testator is alive. It
                  surfaces only after death, when a bank, housing society, Tehsildar, or Probate Court
                  rejects the document.
                </p>
                <p>
                  To check if a Will is valid in India, courts apply a two-tier legal test under the{" "}
                  <strong>Indian Succession Act, 1925</strong>. First, the Will must pass the mandatory
                  statutory execution checklist under <strong>Sections 59, 61, 63, and 67</strong>. If a Will
                  fails Section 63 (for example, having only one witness or being signed via Aadhaar eSign),
                  no judge can save it.
                </p>
                <p>
                  Second, even if a Will is properly signed and witnessed, it must survive the{" "}
                  <strong>Supreme Court&rsquo;s Suspicious Circumstances Test</strong> established in{" "}
                  <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)</em>. Our interactive
                  audit tool below checks your draft against both statutory validity and courtroom
                  defensibility in 60 seconds.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE 12-QUESTION AUDIT CHECKER */}
            <section id="interactive-audit-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Section 63 Will Validity Audit Checker
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answer the 12 statutory questions below based on your current draft or existing Will. The tool
                instantly computes your <strong>0 to 100 Court-Defensibility Score</strong> and flags every
                legal vulnerability.
              </p>

              {/* Audit Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Context Controls: Religion/Law & Testator Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                  {/* Personal Law Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Testator&rsquo;s Personal Law / Religion</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setReligionLaw("hindu_sikh_jain")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          religionLaw === "hindu_sikh_jain"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Hindu / Sikh / Jain
                      </button>
                      <button
                        type="button"
                        onClick={() => setReligionLaw("christian_parsi_sma")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          religionLaw === "christian_parsi_sma"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Christian / Parsi / SMA
                      </button>
                      <button
                        type="button"
                        onClick={() => setReligionLaw("muslim_shariat")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          religionLaw === "muslim_shariat"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Muslim (Wasiyat)
                      </button>
                    </div>
                  </div>

                  {/* Testator Age Group Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Testator&rsquo;s Age Group at Execution</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTestatorAgeGroup("under_65")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          testatorAgeGroup === "under_65"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Under 65 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setTestatorAgeGroup("65_to_75")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          testatorAgeGroup === "65_to_75"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        65 to 75 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setTestatorAgeGroup("above_75")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          testatorAgeGroup === "above_75"
                            ? "bg-rose-50 text-[#C65378] border border-rose-300 ring-2 ring-rose-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Above 75 Yrs
                      </button>
                    </div>
                  </div>
                </div>

                {/* Muslim Wasiyat 1/3rd Rule Extra Check (Shown when Muslim is selected) */}
                {religionLaw === "muslim_shariat" && (
                  <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-emerald-950">
                          Muslim Personal Law (Shariat) Wasiyat Check:
                        </div>
                        <p className="text-xs text-emerald-900">
                          Does the Will give more than 1/3rd of the net estate, or bequeath property to a
                          Faraid legal heir (under Sunni law) without other heirs&rsquo; post-death consent?
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setMuslimExceedsOneThird(false)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            !muslimExceedsOneThird
                              ? "bg-emerald-800 text-white"
                              : "bg-white text-emerald-900 border border-emerald-200"
                          }`}
                        >
                          Within 1/3rd Cap
                        </button>
                        <button
                          type="button"
                          onClick={() => setMuslimExceedsOneThird(true)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            muslimExceedsOneThird
                              ? "bg-[#C65378] text-white"
                              : "bg-white text-emerald-900 border border-emerald-200"
                          }`}
                        >
                          Exceeds 1/3rd / To Heir
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Scenario Presets */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Quick Test Presets (Or Customize All 12 Questions Below):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => applyPreset("typical_diy")}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-left transition-all"
                    >
                      <div className="font-extrabold text-xs text-slate-900">Typical DIY Plain-Paper</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">Valid but missing safeguards</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("beneficiary_witness")}
                      className="p-2.5 rounded-xl border border-rose-200 hover:border-rose-300 bg-rose-50/40 text-left transition-all"
                    >
                      <div className="font-extrabold text-xs text-rose-950">Spouse/Heir as Witness</div>
                      <div className="text-[10px] text-rose-700 mt-0.5">Section 67 witness trap</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("fatal_esign")}
                      className="p-2.5 rounded-xl border border-rose-200 hover:border-rose-300 bg-rose-50/40 text-left transition-all"
                    >
                      <div className="font-extrabold text-xs text-rose-950">eSign / No Witnesses</div>
                      <div className="text-[10px] text-rose-700 mt-0.5">Fatal Section 63 failure</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("bulletproof")}
                      className="p-2.5 rounded-xl border border-emerald-200 hover:border-emerald-300 bg-emerald-50/40 text-left transition-all"
                    >
                      <div className="font-extrabold text-xs text-emerald-950">100/100 Ironclad Will</div>
                      <div className="text-[10px] text-emerald-700 mt-0.5">Full Supreme Court compliance</div>
                    </button>
                  </div>
                </div>

                {/* 12-QUESTION INTERACTIVE LIST */}
                <div className="space-y-4">
                  {AUDIT_QUESTIONS.map((q) => {
                    const selectedIdx = answers[q.id] ?? 0;
                    const chosenOption = q.options[selectedIdx] || q.options[0];
                    const isPass = chosenOption.value === "pass";
                    const isFail = chosenOption.value === "fail";

                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl border p-4 sm:p-5 transition-all space-y-3 ${
                          isPass
                            ? "bg-white border-slate-200/90"
                            : isFail
                            ? "bg-rose-50/40 border-rose-300"
                            : "bg-amber-50/40 border-amber-300"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                              {q.number}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {q.category}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {q.statute}
                          </span>
                        </div>

                        <div>
                          <div className="font-extrabold text-sm sm:text-base text-slate-900">
                            {q.question}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{q.helpText}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                          {q.options.map((opt, idx) => {
                            const isSelected = selectedIdx === idx;
                            let activeStyle = "bg-slate-900 text-white border-slate-900 shadow-xs";
                            if (isSelected && opt.value === "pass") {
                              activeStyle = "bg-emerald-700 text-white border-emerald-700 shadow-xs";
                            } else if (isSelected && opt.value === "warn") {
                              activeStyle = "bg-amber-600 text-white border-amber-600 shadow-xs";
                            } else if (isSelected && opt.value === "fail") {
                              activeStyle = "bg-[#C65378] text-white border-[#C65378] shadow-xs";
                            }

                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelectOption(q.id, idx)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left border transition-all flex items-center justify-between gap-2 ${
                                  isSelected
                                    ? activeStyle
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                <span className="leading-snug">{opt.label}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reset & Print Strip */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => applyPreset("typical_diy")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Audit Answers</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Diagnostic Audit Report</span>
                  </button>
                </div>

                {/* =========================================================================
                    REAL-TIME COURT-DEFENSIBILITY SCORE & VULNERABILITY REPORT
                    ========================================================================= */}
                <div className="space-y-6 pt-4">
                  {/* SCORE BANNER CARD */}
                  <div className={`rounded-3xl border-2 p-6 transition-all shadow-md ${verdictColorClass}`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-current/15">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-current/20 shadow-2xs">
                          <Award className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>{verdictBadge}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight">{verdictTitle}</h3>
                      </div>
                      <div className="text-left md:text-right shrink-0">
                        <div className="text-xs uppercase font-bold opacity-75">
                          Court-Defensibility Score
                        </div>
                        <div className="text-3xl sm:text-4xl font-black">
                          {finalScore} <span className="text-lg font-bold opacity-70">/ 100</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden my-4 border border-current/15">
                      <div
                        className={`h-full transition-all duration-500 ${
                          hasFatalDefect
                            ? "bg-[#C65378]"
                            : finalScore >= 90
                            ? "bg-emerald-600"
                            : finalScore >= 65
                            ? "bg-blue-600"
                            : "bg-amber-600"
                        }`}
                        style={{ width: `${Math.max(5, finalScore)}%` }}
                      />
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {hasFatalDefect ? (
                        <>
                          <strong>Urgent Legal Warning:</strong> Your audit triggered at least one{" "}
                          <strong>Fatal Statutory Defect</strong> under the Indian Succession Act, 1925. Even
                          if other clauses are well-written, a fatal defect renders the Will (or the specific
                          witness bequest under Section 67) legally unenforceable in an Indian Probate Court.
                          See the exact defect breakdown below.
                        </>
                      ) : finalScore >= 90 ? (
                        <>
                          <strong>Excellent Compliance:</strong> Your Will satisfies all mandatory pillars of{" "}
                          <strong>Section 59, Section 63(a)-(c), and Section 67</strong>, and incorporates
                          proactive safeguards against Supreme Court suspicious circumstances.
                        </>
                      ) : (
                        <>
                          <strong>Action Recommended:</strong> Your Will meets basic execution thresholds,
                          but contains <strong>{detectedDefects.length} drafting or evidentiary gaps</strong>{" "}
                          that rival legal heirs can exploit in a Probate Caveat under Section 284 of the
                          Indian Succession Act. Review the remediation steps below.
                        </>
                      )}
                    </p>
                  </div>

                  {/* SIDE-BY-SIDE VULNERABILITIES VS PASSED SAFEGUARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left Card: Detected Vulnerabilities & Fatal Defects */}
                    <div className="rounded-2xl border border-rose-200 bg-white p-5 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                            VULNERABILITY DIAGNOSTIC
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            Defects &amp; Risks Found ({detectedDefects.length})
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800">
                          {detectedDefects.length === 0 ? "0 ISSUES" : "NEEDS FIX"}
                        </span>
                      </div>

                      {detectedDefects.length === 0 ? (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
                          <div className="font-extrabold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Zero Statutory Vulnerabilities Detected!</span>
                          </div>
                          <p className="leading-relaxed">
                            All 12 audit checkpoints passed. Ensure the original physical Will is stored
                            safely outside a sole-operated bank locker so your Executor can access it.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                          {detectedDefects.map((defect, i) => (
                            <div
                              key={i}
                              className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                                defect.severity === "FATAL"
                                  ? "bg-rose-50/70 border-rose-300 text-rose-950"
                                  : "bg-amber-50/60 border-amber-200 text-slate-900"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                    defect.severity === "FATAL"
                                      ? "bg-[#C65378] text-white"
                                      : "bg-amber-200 text-amber-950"
                                  }`}
                                >
                                  {defect.severity}
                                </span>
                                <span className="text-[10px] font-bold opacity-75">{defect.statute}</span>
                              </div>
                              <div className="font-extrabold text-xs sm:text-sm">{defect.title}</div>
                              <p className="text-[11px] leading-relaxed opacity-90">{defect.detail}</p>
                              <div className="pt-1.5 border-t border-current/10 text-[11px] font-semibold text-emerald-800">
                                <strong>How to Fix:</strong> {defect.remedy}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Card: Passed Safeguards & Conversion Funnel */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                              COMPLIANCE SUMMARY
                            </div>
                            <div className="font-extrabold text-base text-slate-900">
                              Passed Statutory Checks ({passedSafeguards.length}/12)
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                            VERIFIED
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs">
                          {passedSafeguards.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-900">
                                  Q{item.questionNum} ({item.statute}):{" "}
                                </span>
                                <span className="text-slate-600">{item.note}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Remedial Dual Action Box */}
                      <div className="p-4 rounded-2xl bg-[#172228] text-white space-y-3 mt-4">
                        <div className="text-xs font-extrabold text-rose-200 uppercase tracking-wider">
                          Fix Every Defect in 15 Minutes
                        </div>
                        <p className="text-xs text-white/85 leading-relaxed">
                          Do not leave your family exposed to a 10-year Probate Court battle. Replace a
                          defective DIY draft with a 100% Section 63 compliant Will or book Sub-Registrar
                          registration support.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={handleStartDraft}
                            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-extrabold transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Redraft Will Online</span>
                          </button>
                          <Link
                            href="/services/will-registration"
                            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white text-[#172228] hover:bg-slate-100 text-xs font-extrabold transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                            <span>Will Registration Help</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: SECTION 63 WILL VALIDITY AUDIT</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/will-validity-section-63-audit-checker-og.jpg"
                  alt="Check If Will Is Valid in India - Section 63 Audit Checker and Court-Defensibility Guide"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* SECTION 3: SECTION 63 THREE PILLARS */}
            <section id="section-63-three-pillars" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MANDATORY EXECUTION STATUTE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 63 Indian Succession Act: 3 Mandatory Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 63 of the Indian Succession Act, 1925 is the backbone of testamentary validity in
                  India. It applies to all unprivileged Wills made by Hindus, Buddhists, Sikhs, Jains,
                  Christians, Parsis, and persons married under the Special Marriage Act. Every valid Will
                  must satisfy three non-negotiable clauses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-[#C65378]" />
                      <span>1. Section 63(a): Signature or Mark</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The testator must sign or affix their thumb mark to the Will, or another person must
                      sign it in the testator&rsquo;s physical presence and strictly by their direction.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>2. Section 63(b): Intent Placement</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The signature or mark must be placed so that it clearly appears the testator intended
                      to give legal effect to the writing as a Last Will and Testament.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>3. Section 63(c): Two Witnesses</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      At least two witnesses must see the testator sign (or receive personal acknowledgment)
                      and each witness must sign the Will in the physical presence of the testator.
                    </p>
                  </div>
                </div>
                <p>
                  In <em>Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91</em>, the Supreme Court
                  clarified how Section 63(c) interacts with Section 68 of the Indian Evidence Act (now{" "}
                  <strong>Section 67 of the Bharatiya Sakshya Adhiniyam, 2023</strong>). Even though only one
                  attesting witness needs to be called to court to prove the Will, that witness must testify
                  that <strong>both</strong> witnesses attested the document in the testator&rsquo;s presence.
                </p>
              </div>
            </section>

            {/* SECTION 4: SECTION 67 WITNESS DISQUALIFICATION */}
            <section id="section-67-witness-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertOctagon className="w-4 h-4" />
                <span>BENEFICIARY WITNESS TRAP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 67 Witness Disqualification and Void Bequests
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When families write a DIY Will at home, the testator often asks their wife, son, daughter,
                  or son-in-law to sign as one of the two attesting witnesses. This triggers the notorious{" "}
                  <strong>Section 67 Trap</strong> of the Indian Succession Act, 1925.
                </p>
                <p>
                  Under Section 67, a Will is not invalid merely because a witness is a beneficiary. However,
                  any bequest, legacy, or property gift made to an attesting witness (or to the{" "}
                  <strong>wife or husband</strong> of that attesting witness) is <strong>utterly void</strong>!
                  In other words, the witness remains competent to prove the Will in court, but they and their
                  spouse lose the inheritance given to them in that Will.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Crucial Distinction: Hindu/Sikh/Jain Wills vs Christian/Parsi Wills</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 57 and Schedule III of the Indian Succession Act, Section 67 is omitted for
                    Hindu, Buddhist, Sikh, and Jain Wills, whereas it applies with full statutory force to
                    Christian, Parsi, and Special Marriage Act Wills. However, even in a Hindu Will, having a
                    beneficiary or their spouse sign as a witness is treated by High Courts as a major{" "}
                    <strong>suspicious circumstance</strong> proving active interference. Always use two
                    neutral, non-beneficiary witnesses!
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: SUPREME COURT SUSPICIOUS CIRCUMSTANCES */}
            <section id="suspicious-circumstances-test" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SUPREME COURT JURISPRUDENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Supreme Court Suspicious Circumstances Checklist
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In the landmark judgment{" "}
                  <strong>H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)</strong>, reaffirmed
                  in <em>Kavita Kanwar v. Pamela Mehta (2020) 11 SCC 209</em> and{" "}
                  <em>Shivakumar v. Sharanabasappa (2020) 11 SCC 277</em>, the Supreme Court held that a Will
                  speaks from the death of the testator, when the author can no longer be called to verify it.
                </p>
                <p>
                  Therefore, if a Will is surrounded by &ldquo;suspicious circumstances,&rdquo; the burden
                  lies heavily on the beneficiary (propounder) to satisfy the judicial conscience of the
                  court. The top red flags that cause Indian courts to strike down even signed Wills include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Active Participation of the Propounder:</strong> The main beneficiary hired the
                    typist, dictated the clauses, brought their own personal friends as witnesses, or sat in
                    the room while the parent signed.
                  </li>
                  <li>
                    <strong>Unexplained Exclusion of Natural Heirs:</strong> A wife, minor child, or daughter
                    is completely disinherited without a single sentence explaining why.
                  </li>
                  <li>
                    <strong>Abnormal Signature Placement:</strong> Cramped text on the last page or a
                    signature floating far below the text, suggesting the testator signed a blank paper earlier.
                  </li>
                  <li>
                    <strong>Contradictory Asset Descriptions:</strong> Listing HUF coparcenary property as
                    100% self-acquired property, or failing to check whether{" "}
                    <Link
                      href="/tools/probate-checker"
                      className="text-[#C65378] font-bold hover:underline"
                    >
                      court probate is mandatory in your city
                    </Link>
                    .
                  </li>
                </ul>
                <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-800">
                    <strong>Preparing to Draft or Re-Execute Your Will?</strong> Use our interactive document
                    readiness tool before inviting witnesses.
                  </div>
                  <Link
                    href="/tools/will-checklist"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C65378] hover:text-[#a33b5c] shrink-0"
                  >
                    <span>Open Will Document Checklist Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6: PLAIN PAPER, HANDWRITTEN, ESIGN & VIDEO WILLS */}
            <section id="plain-paper-vs-registered" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>EXECUTION FORMAT MYTHS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Plain Paper, Handwritten, eSign, and Video Will Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Modern technology and foreign movies have created widespread confusion in India regarding
                  digital Wills, video Wills, and handwritten notes. Here is the exact statutory position for
                  each format:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Plain-Paper &amp; Handwritten Wills (VALID)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A typed or handwritten Will on plain A4 paper is 100% valid if signed by the testator
                      and attested by two witnesses under Section 63. In{" "}
                      <em>Joyce Primrose Prestor v. Vera Marie Vas (1996 SC)</em>, the Supreme Court noted
                      that a cleanly written holographic Will carries a strong presumption of genuineness,
                      provided it is duly witnessed.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-rose-800 flex items-center gap-2">
                      <X className="w-4 h-4 text-[#C65378]" />
                      <span>Aadhaar eSign, DSC &amp; Video-Only Wills (VOID)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 1(4) read with Entry 3 of the First Schedule to the Information Technology
                      Act, 2000, Wills are excluded from electronic signatures. Similarly, a standalone spoken
                      video without a signed, two-witness paper Will is void. However, recording a video{" "}
                      <em>while signing the paper Will</em> is admissible as corroborative evidence under
                      Section 63 of the Bharatiya Sakshya Adhiniyam, 2023.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 59 SOUND MIND & DOCTOR PROOF */}
            <section id="testamentary-capacity-sec-59" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stethoscope className="w-4 h-4" />
                <span>TESTAMENTARY CAPACITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Section 59 Sound Mind and Medical Fitness Proof
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under <strong>Section 59 of the Indian Succession Act, 1925</strong>, every person of sound
                  mind who is not a minor can dispose of their property by Will. Importantly, Explanations 1,
                  2, and 3 to Section 59 clarify that a person who is deaf, dumb, or blind can make a valid
                  Will if they understand what they do by it, and a person who is ordinarily unwell can make a
                  valid Will during a lucid interval.
                </p>
                <p>
                  However, when a senior citizen (above 65 or 70 years) executes a Will, disgruntled relatives
                  almost always allege age-related cognitive decline, Alzheimer&rsquo;s, or heavy hospital
                  medication. Having a registered MBBS or MD physician append a short clinical fitness
                  certificate on the Will itself (or on the same date) neutralizes capacity challenges in
                  court.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Bedridden or Hospitalized Senior Citizen? Use Section 31 Home Visit</span>
                  </div>
                  <p className="leading-relaxed">
                    If an elderly testator cannot climb stairs or visit the Sub-Registrar Office due to
                    illness, Section 31 of the Registration Act, 1908 empowers the Sub-Registrar to attend the
                    testator&rsquo;s private residence or hospital bedside to register the Will officially.{" "}
                    <Link
                      href="/services/will-registration"
                      className="font-bold text-[#C65378] hover:underline"
                    >
                      Book AMA Legal Solutions Will Registration Assistance
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: COMPARISON TABLE */}
            <section id="comparison-table-defects" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON TABLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison Table: Fatal Defects vs Curable Errors
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this quick statutory reference table to distinguish mistakes that make a Will completely
                void from errors that create litigation risk or remain legally valid:
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Scenario / Defect in Will</th>
                      <th className="py-3.5 px-4">Governing Statute</th>
                      <th className="py-3.5 px-4">Legal Status in Court</th>
                      <th className="py-3.5 px-4">Required Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Signed by only 1 witness (or 0 witnesses)
                      </td>
                      <td className="py-3 px-4">Section 63(c) ISA</td>
                      <td className="py-3 px-4 font-bold text-rose-700">100% VOID</td>
                      <td className="py-3 px-4">Re-execute immediately with 2 adult witnesses</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Signed via Aadhaar eSign, DSC, or DocuSign
                      </td>
                      <td className="py-3 px-4">IT Act 2000 Sch. I Entry 3</td>
                      <td className="py-3 px-4 font-bold text-rose-700">100% VOID</td>
                      <td className="py-3 px-4">Print on physical paper &amp; sign in wet ink</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Standalone video recording without written Will
                      </td>
                      <td className="py-3 px-4">Section 63 ISA</td>
                      <td className="py-3 px-4 font-bold text-rose-700">100% VOID</td>
                      <td className="py-3 px-4">Execute written Will; use video only as support</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Beneficiary or spouse signed as witness
                      </td>
                      <td className="py-3 px-4">Section 67 ISA</td>
                      <td className="py-3 px-4 font-bold text-amber-700">
                        Bequest Void (Sec 67) / High Risk
                      </td>
                      <td className="py-3 px-4">Re-execute with 2 independent neutral witnesses</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Uninitialed crossings or handwritten edits
                      </td>
                      <td className="py-3 px-4">Section 71 ISA</td>
                      <td className="py-3 px-4 font-bold text-amber-700">Alteration Ignored / Void</td>
                      <td className="py-3 px-4">Print clean fresh Will or execute formal Codicil</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Written on plain paper (No stamp paper / Unregistered)
                      </td>
                      <td className="py-3 px-4">Registration Act s. 18(e)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">100% LEGALLY VALID</td>
                      <td className="py-3 px-4">Optional SRO registration recommended for high value</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        No Doctor Certificate attached
                      </td>
                      <td className="py-3 px-4">Section 59 ISA</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Valid (Vulnerable if age 65+)
                      </td>
                      <td className="py-3 px-4">Attach MBBS/MD fitness certificate for seniors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP REMEDIATION SOP */}
            <section id="step-by-step-remediation-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>REMEDIATION PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: How to Fix a Defective DIY Will
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Do Not Cross Out or Overwrite Your Old Will",
                    desc: "Under Section 71 of the Indian Succession Act, striking out names or squeezing in handwritten lines after signing has zero legal effect unless countersigned by the testator and both witnesses. Overwriting also triggers forensic tampering objections.",
                  },
                  {
                    step: 2,
                    title: "Draft a Fresh Will With an Express Revocation Clause",
                    desc: "Under Section 62 and Section 70, the cleanest way to cure any defect in an earlier unregistered or registered Will is to execute a brand-new Will that explicitly revokes all prior testamentary dispositions.",
                  },
                  {
                    step: 3,
                    title: "Include a Family Tree, Exclusion Rationale, and Residuary Clause",
                    desc: "List all Class I legal heirs clearly. If any natural heir is receiving a smaller share, state a calm, non-defamatory reason. Add a Residuary Clause under Section 102 so no bank account or future asset is left in intestacy.",
                  },
                  {
                    step: 4,
                    title: "Select Two Younger, Non-Beneficiary Witnesses",
                    desc: "Choose two adult witnesses (friends, neighbors, colleagues, or professionals) who are younger than you and who are neither beneficiaries nor married to any beneficiary in the Will.",
                  },
                  {
                    step: 5,
                    title: "Sign Every Page in One Sitting With Doctor Endorsement",
                    desc: "Sign at the bottom of every page in wet ink in the physical presence of both witnesses, and have both witnesses sign the Section 63(c) attestation block in your presence. Have a doctor sign the mental fitness certificate on the same day.",
                  },
                  {
                    step: 6,
                    title: "Destroy the Defective Unregistered Draft or Register at SRO",
                    desc: "Once the new Will is signed and witnessed, physically shred the old defective unregistered draft under Section 70 so two conflicting versions never surface after your lifetime.",
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

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>COURTROOM REALITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Studies: Valid vs Invalid Wills in Court
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: Son-in-Law Signed as Witness (Mumbai)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Section 67 Defect
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Christian widow in Bandra drafted a DIY Will leaving her ₹4.5 Crore apartment to her
                    daughter. To save time, she asked her neighbour (Witness 1) and her daughter&rsquo;s
                    husband (Witness 2) to sign as witnesses.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Audit Score Before Fix:</span>
                      <span className="font-bold text-rose-700">25 / 100 (Fatal Sec 67 Trap)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Legal Consequence:</span>
                      <span className="font-bold text-slate-900">Daughter&rsquo;s bequest void under Sec 67!</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Remediation by WillDrafting:</span>
                      <span>Re-executed with 2 neutral witnesses (100/100)</span>
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: Unregistered Plain-Paper Will (Bengaluru)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Upheld Valid
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old retired engineer printed his Will on plain white A4 paper, signed every page
                    in front of two 45-year-old colleagues, attached an MBBS doctor fitness note, and included
                    a clear reason for unequal distribution.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Audit Score:</span>
                      <span className="font-bold text-emerald-700">98 / 100 (Court-Defensible)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stamp Duty &amp; Registration Paid:</span>
                      <span className="font-bold text-slate-900">₹0 (Optional under Sec 18(e))</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-black flex justify-between border-t border-slate-200">
                      <span>Court Outcome:</span>
                      <span>100% Upheld Under Section 63 ISA</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL CLAUSE TEMPLATES */}
            <section id="legal-clause-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTEABLE LEGAL ASSETS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Section 63(c) Attestation and Doctor Clauses
              </h2>

              {/* Template Box 1: Section 63(c) Simultaneous Witness Attestation Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 63(c) Simultaneous Witness Attestation Block
                  </div>
                  <button
                    type="button"
                    onClick={copyAttestationToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Attestation Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"SIGNED, EXECUTED, AND DECLARED by the above-named Testator, [Full Name of Testator], as and for his/her Last Will and Testament, consisting of [Total Pages] pages (each page having been individually signed by the Testator), in our joint physical presence, who at his/her request, in his/her physical presence, and in the physical presence of each other, have hereunto subscribed our respective names and signatures as Attesting Witnesses on this [Day] day of [Month], [Year] at [City, State]. We further affirm that at the time of execution, the Testator appeared to be of sound, alert, and disposing mind, memory, and understanding, and executed this Will voluntarily of his/her own free agency without any coercion or undue influence.

WITNESS 1:
Signature: _______________________
Full Name: [Name of Witness 1] | Age: [Age] Years
Address: [Full Residential Address with PIN Code]
ID Proof (Aadhaar/PAN): [ID Number]

WITNESS 2:
Signature: _______________________
Full Name: [Name of Witness 2] | Age: [Age] Years
Address: [Full Residential Address with PIN Code]
ID Proof (Aadhaar/PAN): [ID Number]"`}
                </pre>
              </div>

              {/* Template Box 2: Doctor's Mental Fitness Certificate Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 59 Registered Doctor Mental Fitness Certificate Block
                  </div>
                  <button
                    type="button"
                    onClick={copyDoctorClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedDoctorClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Doctor Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I, Dr. [Full Name of Doctor], holding Medical Registration No. [MCI/SMC Registration Number], practicing at [Hospital/Clinic Name & Address], hereby certify that I have personally examined [Full Name of Testator], aged [Age] years, residing at [Address], today on [Date] at [Time AM/PM].

Based on my clinical examination, I confirm that the Testator is fully conscious, well-oriented to time, place, and person, and is of sound and disposing state of mind. He/she suffers from no cognitive impairment, delusion, or mental incapacity that would affect his/her ability to understand the nature and effect of executing this Last Will and Testament.

Signature of Doctor: _______________________
Name: Dr. [Full Name], [MBBS / MD]
Registration No.: [Reg. No. & State Medical Council] | Official Stamp"`}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Testamentary Legal Practice
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Testamentary Audit &amp; Probate Litigation Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier estate planning and succession platform, backed by
                  AMA Legal Solutions. Our High Court testamentary litigators have audited, registered, and
                  defended over 15,000 Wills across Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Pune, and
                  Hyderabad. Every Will generated on our platform automatically embeds Section 63(c)
                  attestation blocks, Section 67 witness safeguards, and Supreme Court compliant exclusion
                  clauses.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Will Registration &amp; Home Visit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate &amp; Will Contest Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Interactive Legal Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Will Validity in India
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Direct plain-English answers to common questions on how to check if a Will is valid in India:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations and Official Legal Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Statutes &amp; Supreme Court Authorities:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 59, Indian Succession Act, 1925:</strong> Testamentary capacity, adult
                      age requirement, and sound disposing mind rules.
                    </li>
                    <li>
                      <strong>Section 61, Indian Succession Act, 1925:</strong> Invalidity of Wills obtained
                      by fraud, coercion, or importunity taking away free agency.
                    </li>
                    <li>
                      <strong>Section 63(a), (b) &amp; (c), Indian Succession Act, 1925:</strong> Mandatory
                      signature, placement, and two-witness attestation rules.
                    </li>
                    <li>
                      <strong>Section 67, Indian Succession Act, 1925:</strong> Disqualification of gifts to
                      attesting witnesses and their spouses.
                    </li>
                    <li>
                      <strong>Section 67, Bharatiya Sakshya Adhiniyam, 2023 (formerly Sec 68 IEA):</strong>{" "}
                      Proof of execution of document required by law to be attested.
                    </li>
                    <li>
                      <strong>H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443):</strong> Supreme
                      Court benchmark on proving Wills and dispelling suspicious circumstances.
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
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators, Checkers &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      All Succession Tools Hub
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
                      Will Drafting Document Checklist
                    </Link>
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gift Deed vs Will Stamp Duty Calculator
                    </Link>
                    <Link
                      href="/tools/huf-coparcenary-share-partition-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      HUF Coparcenary Share Calculator
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
                      Will Registration Service India
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
                Specialist in Indian testamentary litigation, Section 63 probate trials, caveat defense, and
                challenge-proof estate structuring across Indian High Courts.
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
                  <span>100% SECTION 63 COMPLIANT</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Found a Defect in Your DIY Will? Fix It Today
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Generate a court-defensible Will with built-in Section 63(c) attestation blocks, residuary
                  clauses, and doctor fitness certificates in 15 minutes.
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
                  <span>Lawyer Reviewed &amp; Probate Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>WILL REVIEW &amp; REGISTRATION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Lawyer to Audit, Register, or Contest a Will?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advocates provide Sub-Registrar registration assistance, Section 31 home visits for
                  senior citizens, and High Court probate representation.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 63 Precision:</strong> Flags fatal witness and signature errors
                      instantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 67 Detector:</strong> Prevents void bequests to beneficiary spouses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SC Precedent Aligned:</strong> Built on H. Venkatachala Iyengar standards.
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
          href="#interactive-audit-checker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Validity Audit</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
