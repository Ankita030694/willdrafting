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
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  MapPin,
  ClipboardList,
  Clock,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. TN Patta Pass Book Act 1983 & Rules" },
  { id: "interactive-checker", label: "2. Free TN Patta & Chitta Transfer Checker" },
  { id: "patta-types", label: "3. Full Patta vs Joint Patta vs FMB Split" },
  { id: "death-varisu-rules", label: "4. Patta After Death: Varisu & G.O. 478" },
  { id: "will-probate-chennai", label: "5. Patta by Will & Chennai Probate Rules" },
  { id: "auto-mutation-tnreginet", label: "6. TNREGINET Auto-Mutation vs e-Sevai" },
  { id: "fees-timelines-workflow", label: "7. Official Fees, Timelines & VAO Path" },
  { id: "comparison-table", label: "8. Legal Comparison: TN Transfer Paths" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: e-Sevai Transfer" },
  { id: "practical-case-studies", label: "10. Case Studies: Chennai, Kovai, Madurai" },
  { id: "declaration-checklist", label: "11. Heir Declaration & Document Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: TN Land Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: TN Patta" },
  { id: "statutory-citations", label: "14. Official TN Portals & Citations" },
];

const FAQS = [
  {
    q: "Can I transfer Patta in Tamil Nadu using only a registered Will without a Legal Heir Certificate?",
    a: "No. In practice, the Tahsildar asks for a Legal Heir Certificate (Varisu Certificate) along with the Death Certificate and Will. Under Section 10(3) of the Tamil Nadu Patta Pass Book Act, 1983 and Revenue Standing Order 31, the Tahsildar must notify all natural heirs and hear objections before updating the Patta.",
  },
  {
    q: "Is Probate still mandatory in Chennai for Patta transfer based on a Will?",
    a: "No. Parliament passed the Repealing and Amending Act, 2025 on December 20, 2025, which omitted Section 213 of the Indian Succession Act, 1925. Mandatory statutory probate no longer applies in Chennai. Still, if any heir objects to the Will, the Tahsildar will pause the Patta transfer and direct parties to a Civil Court or voluntary probate.",
  },
  {
    q: "What is the official fee for Tamil Nadu Patta name transfer on e-Sevai?",
    a: "The standard e-Sevai service fee is Rs 60 for a Patta transfer without subdivision (NISD). When a land split and FMB sketch are needed (ISD), official subdivision survey charges under G.O. (Ms) No. 370 apply: Rs 400 in rural villages, Rs 500 in municipalities, and Rs 600 in municipal corporations, plus the Rs 60 portal fee.",
  },
  {
    q: "What is the difference between Joint Patta and FMB Sub-Division Patta?",
    a: "A Joint Patta puts all legal heirs together under one survey number without splitting the plot map. It needs no surveyor visit and takes 15 to 30 days. A Sub-Division Patta (ISD) splits the survey field into separate sub-numbers with a new FMB sketch measured by a Firka Surveyor, taking 30 to 60 days.",
  },
  {
    q: "Can Class-II heirs like brothers or sisters get a Varisu Certificate for Patta transfer?",
    a: "Yes. Under Tamil Nadu G.O. (Ms) No. 478 (September 29, 2022) and G.O. (Ms) No. 110 (March 13, 2024), Tahsildars issue online Legal Heir Certificates via e-Sevai for both Class-I heirs and eligible Class-II heirs when no Class-I heir survives.",
  },
  {
    q: "How many days does Tamil Nadu Patta transfer take under the 1987 Rules?",
    a: "Under Rule 9 of the Tamil Nadu Patta Pass Book Rules, 1987 and Revenue norms, transfers without subdivision (NISD) carry a 15-day norm, while subdivision transfers (ISD) carry a 30-day norm. Under Rule 4(2), formal inquiry notices give interested parties 15 to 40 days to reply.",
  },
  {
    q: "Does Patta transfer happen automatically after registering a deed on TNREGINET?",
    a: "Auto-mutation works when a full survey plot is transferred via a registered Sale, Gift, or Settlement Deed and the seller has a matching single Patta. Transfers after death, Joint Pattas, and partial land splits do not auto-mutate and need a manual e-Sevai filing.",
  },
  {
    q: "What should I do if the Tahsildar rejects my Patta transfer request?",
    a: "File a first appeal with the Revenue Divisional Officer (RDO) under Section 12 of the Act (Rule 14). If the RDO rejects it, file a revision petition before the District Revenue Officer (DRO) under Section 13. When title ownership itself is disputed, file a declaration suit in a Civil Court under the Proviso to Section 14.",
  },
];

type AcquisitionBasis =
  | "intestate_death"
  | "registered_will"
  | "unregistered_will"
  | "sale_settlement_gift"
  | "court_decree";

type TransferScope = "full_single" | "joint_patta" | "subdivision_fmb";

type AreaType = "rural" | "municipality" | "corporation";

type HeirConsent =
  | "all_heirs_agree"
  | "one_heir_noc"
  | "class_two_heirs"
  | "heir_objection";

type RecordStatus = "clear_patta" | "natham_grama" | "name_mismatch";

export default function TamilNaduPattaCheckerClient() {
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
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Checker State
  const [acquisitionBasis, setAcquisitionBasis] =
    useState<AcquisitionBasis>("intestate_death");
  const [transferScope, setTransferScope] =
    useState<TransferScope>("joint_patta");
  const [areaType, setAreaType] = useState<AreaType>("corporation");
  const [heirConsent, setHeirConsent] =
    useState<HeirConsent>("all_heirs_agree");
  const [recordStatus, setRecordStatus] = useState<RecordStatus>("clear_patta");

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

    const elements = document.querySelectorAll(
      "section[id], div[id].scroll-target"
    );
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleReset = () => {
    setAcquisitionBasis("intestate_death");
    setTransferScope("joint_patta");
    setAreaType("corporation");
    setHeirConsent("all_heirs_agree");
    setRecordStatus("clear_patta");
  };

  // =========================================================================
  // DIAGNOSTIC ENGINE: TAMIL NADU PATTA & CHITTA NAME TRANSFER CHECKER
  // =========================================================================
  const isSubdivision = transferScope === "subdivision_fmb";
  const subdivisionGovtFee =
    areaType === "rural" ? 400 : areaType === "municipality" ? 500 : 600;
  const eSevaiCharge = 60;

  const isAutoMutationEligible =
    acquisitionBasis === "sale_settlement_gift" &&
    transferScope === "full_single" &&
    heirConsent !== "heir_objection" &&
    recordStatus === "clear_patta";

  const isDisputedTitle =
    heirConsent === "heir_objection" && acquisitionBasis !== "court_decree";

  const isUnregisteredWillRisk =
    acquisitionBasis === "unregistered_will" &&
    heirConsent !== "all_heirs_agree";

  let resultTitle = "Eligible for Online Tamil Nilam Patta Transfer (NISD)";
  let resultBadge = "e-Sevai Tamil Nilam Ready";
  let badgeTone: "emerald" | "amber" | "rose" = "emerald";
  let estimatedFeeText = `Rs ${eSevaiCharge} (e-Sevai Charge)`;
  let feeSubText = "No subdivision survey fee (Rs 0 Govt fee)";
  let timelineText = "15 Days Statutory Norm";
  let timelineSubText = "Practical window: 15 to 30 days";
  let workflowStages: string[] = [
    "e-Sevai Filing",
    "VAO Check",
    "RI Verification",
    "Tahsildar Approval",
  ];
  let legalRationale =
    "Under Section 10 of the Tamil Nadu Patta Pass Book Act, 1983 and RSO 31, legal heirs can update the Patta online via e-Sevai using the Death Certificate and Varisu Certificate without splitting the survey plot.";
  let actionRecommendation =
    "Apply under Tamil Nilam Full Field or Joint Patta Transfer at eservices.tn.gov.in or your nearest e-Sevai centre. Download the e-signed Patta after Tahsildar approval.";

  if (isDisputedTitle) {
    resultTitle = "Revenue Mutation Blocked: Civil Court Decree Needed";
    resultBadge = "Section 14 Civil Court Path";
    badgeTone = "rose";
    estimatedFeeText = "Civil Suit / RDO Stage";
    feeSubText = "Tahsildar cannot decide disputed ownership";
    timelineText = "Stayed Pending Civil Decree";
    timelineSubText = "15-40 day Rule 4(2) inquiry notice first";
    workflowStages = [
      "Tahsildar Sec 10(3) Hearing",
      "RDO Appeal (Sec 12)",
      "Civil Court Suit (Sec 14)",
      "Post-Decree Patta",
    ];
    legalRationale =
      "In Kuppuswami Nainar (1995) and Vishwas Footwear (2011), the Madras High Court held that Tahsildars and RDOs have no power to settle rival title claims. When a legal heir objects, revenue officers must relegate parties to a Civil Court under the Proviso to Section 14.";
    actionRecommendation =
      "Do not rely on repeated e-Sevai filings. Gather your title chain and consult a Tamil Nadu property lawyer for a Civil Court declaration suit or family settlement deed.";
  } else if (isAutoMutationEligible) {
    resultTitle = "Eligible for TNREGINET Auto-Mutation (Full-Field Transfer)";
    resultBadge = "TNREGINET Auto-Sync";
    badgeTone = "emerald";
    estimatedFeeText = "Rs 0 Extra Filing Fee";
    feeSubText = "Triggered automatically at SRO registration";
    timelineText = "Auto-Sync (Few Days to 15 Days)";
    timelineSubText = "Manual e-Sevai fallback if data mismatches";
    workflowStages = [
      "SRO Registration (TNREGINET)",
      "Tamil Nilam Auto-Sync",
      "Tahsildar Digital Sign",
      "Download e-Patta",
    ];
    legalRationale =
      "When an entire survey field with a matching single Patta is transferred by a registered Sale, Gift, or Settlement Deed, TNREGINET sends mutation data straight to Tamil Nilam under Rule 9 of the 1987 Rules.";
    actionRecommendation =
      "Verify that the seller's Patta number and survey details match the registered deed exactly. Track status on eservices.tn.gov.in; file manually on e-Sevai only if sync stalls after 15 days.";
  } else if (isUnregisteredWillRisk) {
    resultTitle = "High Rejection Risk: Unregistered Will Needs Co-Heir NOC or Court Order";
    resultBadge = "Tahsildar Notice & Risk";
    badgeTone = "amber";
    estimatedFeeText = isSubdivision
      ? `Rs ${eSevaiCharge + subdivisionGovtFee} (Est. Portal)`
      : `Rs ${eSevaiCharge} (e-Sevai Charge)`;
    feeSubText = isSubdivision
      ? `Rs 60 e-Sevai + Rs ${subdivisionGovtFee} G.O. 370 Survey`
      : "Plus notary / civil court fees if contested";
    timelineText = "30 to 60+ Days (Inquiry)";
    timelineSubText = "Rule 4(2) mandatory 15-40 day notice to heirs";
    workflowStages = [
      "e-Sevai Filing",
      "Sec 10(3) Notice to Heirs",
      "VAO & RI Inquiry",
      "Tahsildar Order / Civil Court",
    ];
    legalRationale =
      "While the Repealing and Amending Act, 2025 removed mandatory Section 213 probate in Chennai, Madras High Court rulings confirm that a Tahsildar cannot blindly mutate Patta on an unregistered Will without hearing all natural legal heirs under Section 10(3) and RSO 31.";
    actionRecommendation =
      "Obtain written No Objection Certificates (NOCs) or a registered Release Deed from all Class-I legal heirs before applying. If any heir refuses, apply for voluntary probate or a Civil Court decree.";
  } else if (isSubdivision) {
    const areaLabel =
      areaType === "rural"
        ? "Rural Village"
        : areaType === "municipality"
        ? "Municipality"
        : "Corporation (TSLR)";
    resultTitle = `Sub-Division Patta Transfer (ISD + FMB Survey - ${areaLabel})`;
    resultBadge = "ISD Sub-Division & FMB";
    badgeTone = recordStatus === "clear_patta" ? "emerald" : "amber";
    estimatedFeeText = `Rs ${eSevaiCharge + subdivisionGovtFee}`;
    feeSubText = `Rs ${eSevaiCharge} e-Sevai + Rs ${subdivisionGovtFee} G.O. 370 (${areaLabel})`;
    timelineText = "30 Days Statutory Norm";
    timelineSubText = "Practical window: 30 to 60 days with survey";
    workflowStages = [
      "e-Sevai ISD Filing",
      "VAO A-Register Check",
      "Firka Surveyor FMB",
      "RI & Tahsildar Sign",
    ];
    legalRationale =
      "Splitting a survey number or creating separate Pattas for heirs requires a Field Measurement Book (FMB) sub-division survey. A Firka Surveyor inspects the plot boundaries before the Revenue Inspector and Tahsildar issue new sub-division numbers.";
    actionRecommendation =
      "Keep a registered Partition Deed, Release Deed, or Court Final Decree ready showing exact plot dimensions in square feet or cents before paying the G.O. 370 survey fee on e-Sevai.";
  } else if (acquisitionBasis === "registered_will") {
    resultTitle = "Testate Patta Transfer via Registered Will (Post-2025 Rules)";
    resultBadge = "Registered Will Route";
    badgeTone = "emerald";
    estimatedFeeText = `Rs ${eSevaiCharge} (e-Sevai Charge)`;
    feeSubText = "Probate not mandatory after Dec 2025 repeal";
    timelineText = "15 to 40 Days (Notice)";
    timelineSubText = "Rule 4(2) notice to natural legal heirs";
    workflowStages = [
      "e-Sevai Filing",
      "Rule 4(2) Heir Notice",
      "VAO & RI Report",
      "Tahsildar Digital Sign",
    ];
    legalRationale =
      "Parliament omitted Section 213 of the Indian Succession Act via the Repealing and Amending Act, 2025. Revenue officials cannot reject a registered Will solely for lacking probate, even in Chennai. Under Section 10(3), the Tahsildar issues notice to natural heirs and mutates Patta if uncontested.";
    actionRecommendation =
      "Attach the Death Certificate, Varisu Certificate (G.O. 478), Registered Will copy, and signed NOCs from other legal heirs to speed up VAO and Tahsildar clearance.";
  } else if (acquisitionBasis === "court_decree") {
    resultTitle = "Patta Transfer Under Civil Court Final Decree (RSO 31)";
    resultBadge = "Court Decree Route";
    badgeTone = "emerald";
    estimatedFeeText = `Rs ${eSevaiCharge} (e-Sevai Charge)`;
    feeSubText = "Verify appeal stay status before filing";
    timelineText = "15 to 30 Days";
    timelineSubText = "Tahsildar bound by final civil decree";
    workflowStages = [
      "e-Sevai / Taluk Filing",
      "Certified Decree Check",
      "VAO & RI Verification",
      "Tahsildar Compliance",
    ];
    legalRationale =
      "Under Section 14 Proviso of the Tamil Nadu Patta Pass Book Act, 1983 and Revenue Standing Order 31, revenue officers are legally bound to update Patta and Chitta entries in line with a final Civil Court judgment and decree.";
    actionRecommendation =
      "Upload certified copies of both the Judgment and the Final Decree along with a non-appeal confirmation affidavit if the appeal period has expired.";
  }

  // Record-specific overlay warning
  let recordWarning = "";
  if (recordStatus === "natham_grama") {
    recordWarning =
      "Grama Natham / Manaivari Note: Grama Natham house sites are verified under Natham Settlement A-Register records (Thoraya Patta). Extra RDO or Special Tahsildar verification may add 15 to 30 days.";
  } else if (recordStatus === "name_mismatch") {
    recordWarning =
      "UDR / A-Register Mismatch Warning: If the deceased owner's name or survey area has a spelling or UDR error in the Village A-Register, apply first for UDR / Patta Name Correction before filing the name transfer.";
  } else if (heirConsent === "one_heir_noc" && acquisitionBasis === "intestate_death") {
    recordWarning =
      "Exclusive Single Patta Alert: When multiple Class-I heirs exist, Tahsildars normally issue a Joint Patta. To get a Single Patta in only one heir's name, most Taluk offices require a registered Release Deed (Article 55-A TN Stamp Act) rather than a plain paper NOC.";
  } else if (heirConsent === "class_two_heirs") {
    recordWarning =
      "Class-II Heir Note (G.O. 478 & G.O. 110): Ensure your e-Sevai Legal Heir Certificate specifically lists surviving Class-II heirs (siblings/parents) under the 2022/2024 Tamil Nadu guidelines before applying for Patta transfer.";
  }

  // Dynamic Document Checklist Builder
  const requiredDocs: string[] = [];
  if (
    acquisitionBasis === "intestate_death" ||
    acquisitionBasis === "registered_will" ||
    acquisitionBasis === "unregistered_will"
  ) {
    requiredDocs.push("Original Death Certificate of the registered pattadar");
    requiredDocs.push(
      "Tamil Nadu Legal Heir Certificate (Varisu Certificate via e-Sevai under G.O. Ms. No. 478)"
    );
  }
  if (acquisitionBasis === "registered_will") {
    requiredDocs.push(
      "Registered Will copy (Book 3 certified copy from Sub-Registrar Office)"
    );
  }
  if (acquisitionBasis === "unregistered_will") {
    requiredDocs.push(
      "Original Unregistered Will + Attesting Witness details (plus voluntary Probate if contested)"
    );
  }
  if (acquisitionBasis === "sale_settlement_gift") {
    requiredDocs.push(
      "Registered Sale Deed, Gift Deed, or Family Settlement Deed (TNREGINET copy)"
    );
  }
  if (acquisitionBasis === "court_decree") {
    requiredDocs.push(
      "Certified copy of Civil Court Judgment and Final Decree (RSO 31)"
    );
  }
  if (heirConsent === "one_heir_noc") {
    requiredDocs.push(
      "Registered Release Deed (Article 55-A) or notarized No Objection Certificates (NOCs) from all co-heirs"
    );
  }
  if (isSubdivision) {
    requiredDocs.push(
      "Registered Partition Deed / Site Layout Plan with exact boundaries for FMB Sub-Division"
    );
  }
  requiredDocs.push(
    areaType === "rural"
      ? "Existing Patta, Chitta, and A-Register extract (from eservices.tn.gov.in)"
      : "Existing Town Survey Land Register (TSLR) extract / Patta copy"
  );
  requiredDocs.push(
    "Latest Encumbrance Certificate (EC) from TNREGINET (minimum 13 to 30 years)"
  );
  requiredDocs.push(
    "Parent Title Deeds (prior Sale Deed / Settlement Deed) and latest Property Tax / Kist receipt"
  );
  requiredDocs.push(
    "Applicant Aadhaar Card, PAN / Voter ID, and signed Self-Declaration Form"
  );

  const copyAffidavitToClipboard = () => {
    const text = `SELF-DECLARATION FOR TAMIL NADU PATTA & CHITTA NAME TRANSFER (SECTION 10)
I, [Full Name of Applicant], S/o or D/o or W/o [Parent/Spouse Name], residing at [Full Address in Tamil Nadu], solemnly declare as follows:

1. That [Name of Deceased Pattadar] was the lawful owner and registered pattadar of the land/house situated at Village [Village Name], Taluk [Taluk Name], District [District Name], Survey/TSLR No. [Survey No.], Patta No. [Patta No.], measuring [Extent].
2. That the said pattadar passed away on [Date of Death] as per Death Certificate No. [Number].
3. That as per Legal Heir Certificate (Varisu Certificate) No. [Number] issued by the Tahsildar under G.O. (Ms) No. 478, the surviving legal heirs are: [List Names & Relationships].
4. That there is no pending civil suit, injunction, or title dispute concerning the said property.
5. I request the Tahsildar to effect Patta & Chitta mutation under Section 10 of the Tamil Nadu Patta Pass Book Act, 1983 in the names of the rightful heir(s).

Date: [DD/MM/YYYY] | Place: [City/Town, Tamil Nadu] | Signature of Applicant`;
    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `TAMIL NADU PATTA & CHITTA NAME TRANSFER CHECKLIST
Route: ${resultTitle}
Estimated Govt & Portal Fee: ${estimatedFeeText}
Expected Timeline: ${timelineText}

REQUIRED DOCUMENTS:
${requiredDocs.map((d, i) => `${i + 1}. ${d}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>TN PATTA PASS BOOK ACT, 1983 • RSO 31 • G.O. 478 &amp; TAMIL NILAM</span>
          </div>

          {/* Strict H1 Tag (47 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Tamil Nadu Patta &amp; Chitta Name Transfer Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check the exact route, official e-Sevai fees, FMB survey rules, and legal heir papers
            for Tamil Nadu Patta transfer after death, Will, or deed registration.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Run Patta Transfer Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Valid Tamil Nadu Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 60 Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STANDARD E-SEVAI NISD CHARGE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 / 30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NISD VS ISD STATUTORY NORM
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">G.O. 478</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CLASS-I &amp; CLASS-II VARISU ONLINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec. 213 Repealed</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO MANDATORY CHENNAI PROBATE
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
                <span>Tamil Nadu Revenue Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on the Tamil Nadu Patta Pass Book Act, 1983, Rules 1987, RSO 31, G.O. 478,
                G.O. 370, and Madras High Court rulings.
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
                <span>EXECUTIVE BRIEF: TAMIL NADU PATTA &amp; CHITTA TRANSFER</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Patta Shows Tax &amp; Possession:</strong> A Patta and Chitta record
                    who holds the land and pays land tax. Courts hold that a Patta does not by
                    itself create or cancel ownership title.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Death Cases Need Manual e-Sevai Filing:</strong> After an owner passes
                    away, Patta does not change on its own. Heirs must apply on Tamil Nilam via
                    e-Sevai with the Death Certificate and Varisu Certificate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pick the Right Transfer Mode:</strong> Choose Full Field or Joint Patta
                    (NISD, Rs 60) when the plot stays intact. Choose Sub-Division (ISD, Rs 460 to
                    Rs 660) when splitting land on the FMB map.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2025 Chennai Probate Update:</strong> Parliament omitted Section 213 of
                    the Indian Succession Act in December 2025. Probate is no longer compulsory in
                    Chennai, but Tahsildars still notify all legal heirs before changing a Patta.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Tamil Nadu Patta Pass Book Act 1983 &amp; Mutation Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Tamil Nadu, land records are kept under the{" "}
                  <strong>Tamil Nadu Patta Pass Book Act, 1983</strong> and the{" "}
                  <strong>Patta Pass Book Rules, 1987</strong>. The State Revenue Department runs
                  these records online through the Tamil Nilam system and e-Sevai centres.
                </p>
                <p>
                  <strong>Patta</strong> is the land revenue record in the owner&rsquo;s name.{" "}
                  <strong>Chitta</strong> lists the survey number, land area, and soil class (wet
                  or dry). In cities like Chennai, Coimbatore, and Madurai, the matching record is
                  the <strong>Town Survey Land Register (TSLR)</strong>.
                </p>
                <p>
                  <strong>Section 10</strong> of the Act empowers the jurisdictional Tahsildar to
                  update a Patta after death, sale, gift, settlement, or court decree. Under{" "}
                  <strong>Section 10(3)</strong>, the Tahsildar must give notice and hear all
                  interested parties before changing the entry.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Tamil Nadu Patta &amp; Chitta Transfer Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick the 5 options below that match your Tamil Nadu property. Get your exact
                e-Sevai route, official government fee, VAO to Tahsildar workflow, and document
                list right away.
              </p>

              {/* Checker Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Basis of Transfer */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: How did the new owner get this land or house?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: "intestate_death",
                        label: "Death Without Will (Intestate)",
                        desc: "Owner died with no Will; heirs rely on Varisu Certificate",
                      },
                      {
                        id: "registered_will",
                        label: "Registered Will (SRO Book 3)",
                        desc: "Deceased owner left a registered Will naming heirs",
                      },
                      {
                        id: "unregistered_will",
                        label: "Unregistered Will",
                        desc: "Plain paper signed Will not registered at SRO",
                      },
                      {
                        id: "sale_settlement_gift",
                        label: "Sale / Gift / Settlement Deed",
                        desc: "Registered deed on TNREGINET from living owner",
                      },
                      {
                        id: "court_decree",
                        label: "Civil Court Final Decree",
                        desc: "Partition decree or title judgment from Civil Court",
                      },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setAcquisitionBasis(option.id as AcquisitionBasis)
                        }
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          acquisitionBasis === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">
                          {option.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Patta Transfer Type */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Which Patta transfer type do you need?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "full_single",
                        label: "Full-Field Single Patta (NISD)",
                        desc: "Whole survey plot moves to one owner; no land split",
                      },
                      {
                        id: "joint_patta",
                        label: "Joint Patta for All Heirs (NISD)",
                        desc: "Add all legal heirs together under one Patta number",
                      },
                      {
                        id: "subdivision_fmb",
                        label: "Sub-Division Patta (ISD + FMB)",
                        desc: "Split plot into separate survey parts with surveyor",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setTransferScope(opt.id as TransferScope)
                        }
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          transferScope === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Property Area Classification */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: Where is the property located in Tamil Nadu?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "rural",
                        label: "Rural Village Panchayat",
                        desc: "Patta & Chitta records (G.O. 370 ISD fee: Rs 400)",
                      },
                      {
                        id: "municipality",
                        label: "Municipality / Town",
                        desc: "Town Survey / TSLR (G.O. 370 ISD fee: Rs 500)",
                      },
                      {
                        id: "corporation",
                        label: "Municipal Corporation",
                        desc: "Chennai, Kovai, Madurai TSLR (ISD fee: Rs 600)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAreaType(opt.id as AreaType)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          areaType === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Legal Heir & Consent Status */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 4: What is the legal heir and family consent status?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "all_heirs_agree",
                        label: "All Class-I Heirs Agree",
                        desc: "Spouse, kids, or mother agree with no dispute",
                      },
                      {
                        id: "one_heir_noc",
                        label: "Single Heir with NOC",
                        desc: "One heir wants sole Patta; others ready to sign",
                      },
                      {
                        id: "class_two_heirs",
                        label: "Class-II Heirs Only",
                        desc: "Siblings or extended family under G.O. 478 / 110",
                      },
                      {
                        id: "heir_objection",
                        label: "Heir Dispute / Objection",
                        desc: "A family member objects or filed a civil case",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setHeirConsent(opt.id as HeirConsent)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          heirConsent === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Existing Revenue Record Status */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: What is the status of the old Patta or Chitta?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "clear_patta",
                        label: "Clear Existing Patta",
                        desc: "Old Patta / TSLR exists in deceased or seller name",
                      },
                      {
                        id: "natham_grama",
                        label: "Grama Natham / Manaivari",
                        desc: "Village house site with Thoraya / Natham Patta",
                      },
                      {
                        id: "name_mismatch",
                        label: "Missing / UDR Name Error",
                        desc: "Spelling mismatch, old joint name, or UDR error",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRecordStatus(opt.id as RecordStatus)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          recordStatus === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Checker to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        TAMIL NADU PATTA TRANSFER ASSESSMENT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {resultTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          badgeTone === "emerald"
                            ? "text-emerald-400"
                            : badgeTone === "amber"
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}
                      />
                      <span>{resultBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        OFFICIAL FEE ESTIMATE
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {estimatedFeeText}
                      </div>
                      <div className="text-[11px] text-slate-300">{feeSubText}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        PROCESSING TIMELINE
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {timelineText}
                      </div>
                      <div className="text-[11px] text-slate-300">{timelineSubText}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LEGAL AUTHORITY
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        TN Patta Pass Book Act, 1983 (Sec. 10) &amp; RSO 31
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Verify live fee on eservices.tn.gov.in
                      </div>
                    </div>
                  </div>

                  {/* VAO / RI / Surveyor / Tahsildar Workflow Tracker */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>REVENUE APPROVAL TRACKER FOR YOUR CASE</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {workflowStages.map((stage, idx) => (
                        <div
                          key={stage}
                          className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#C65378] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-white leading-tight">
                            {stage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Required Documents for Selected Case */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>REQUIRED DOCUMENTS FOR YOUR SELECTION ({requiredDocs.length})</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyChecklistToClipboard}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
                      >
                        {copiedChecklist ? (
                          <>
                            <CheckCheck className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy List</span>
                          </>
                        )}
                      </button>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {requiredDocs.map((doc) => (
                        <li key={doc} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Basis &amp; Revenue Rule:</span>
                    </div>
                    <p>{legalRationale}</p>
                    {recordWarning && (
                      <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs">
                        <strong>Important Alert:</strong> {recordWarning}
                      </div>
                    )}
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Next Step:</strong> {actionRecommendation}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help with Tamil Nadu Varisu, Patta transfer, or RDO appeal?
                    </div>
                    <Link
                      href="/services/property-mutation-dakhil-kharij-service"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Get Patta Transfer Legal Help</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>TAMIL NADU LAND RECORDS &amp; LEGAL HEIR MUTATION GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Tamil Nilam / e-Sevai</span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/tamil-nadu-patta-chitta-name-transfer-checker-og.jpg"
                  alt="Tamil Nadu Patta and Chitta name transfer checker for legal heirs"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Reviewing Patta, Chitta, TSLR extracts, and Varisu certificates before filing on
                Tamil Nadu e-Sevai prevents VAO and Tahsildar rejections.
              </p>
            </div>

            {/* SECTION 3: FULL PATTA VS JOINT PATTA VS FMB SUB-DIVISION */}
            <section id="patta-types" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>TAMIL NILAM TRANSFER TYPES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Full Patta vs Joint Patta vs FMB Sub-Division
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many applications on e-Sevai fail because families pick the wrong transfer mode.
                  Tamil Nilam splits Patta transfers into three clear types based on whether the
                  plot boundaries change.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Type 1: Full-Field (NISD)
                    </div>
                    <div className="font-bold text-slate-900">Single Owner Whole Plot</div>
                    <p className="text-slate-600 leading-relaxed">
                      Use this when the full survey number moves to one person. No surveyor visit
                      is needed. Only the Rs 60 e-Sevai charge applies.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Type 2: Joint Patta (NISD)
                    </div>
                    <div className="font-bold text-slate-900">Multiple Heirs Together</div>
                    <p className="text-slate-600 leading-relaxed">
                      Best right after an owner dies. All heirs from the Varisu Certificate are
                      added together under one Patta without splitting the map.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Type 3: Sub-Division (ISD)
                    </div>
                    <div className="font-bold text-slate-900">Plot Split &amp; FMB Map</div>
                    <p className="text-slate-600 leading-relaxed">
                      Needed when heirs partition land into separate plots. A Firka Surveyor visits
                      the land, draws a new FMB sketch, and gives new survey sub-numbers.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: PATTA TRANSFER AFTER DEATH & G.O. 478 */}
            <section id="death-varisu-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>INTESTATE SUCCESSION &amp; VARISU CERTIFICATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Patta Transfer After Death: Varisu &amp; G.O. 478
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a land owner dies without leaving a Will, the transfer falls under
                  succession in <strong>Revenue Standing Order 31 (RSO 31)</strong>. You must first
                  get a Death Certificate and a Tamil Nadu Legal Heir Certificate (Varisu
                  Certificate).
                </p>
                <p>
                  Under <strong>G.O. (Ms) No. 478</strong> (issued September 29, 2022) and its
                  update <strong>G.O. (Ms) No. 110</strong> (March 13, 2024), Tahsildars issue
                  Varisu Certificates online through e-Sevai. Both direct Class-I heirs (spouse,
                  children, mother) and eligible Class-II heirs (such as siblings when no Class-I
                  heir survives) can now apply online.
                </p>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Joint Patta vs Exclusive Single Patta After Death</span>
                  </div>
                  <p className="leading-relaxed">
                    Tahsildars normally put every living heir from the Varisu Certificate into a
                    Joint Patta. If siblings want the full Patta in only one heir&rsquo;s name, sign
                    a registered Release Deed under Article 55-A of the Tamil Nadu Stamp Act. You
                    can check the exact cost with our{" "}
                    <Link
                      href="/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator"
                      className="underline font-bold text-[#C65378]"
                    >
                      Tamil Nadu Settlement &amp; Release Deed Stamp Duty Calculator
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: PATTA TRANSFER BY WILL & CHENNAI PROBATE RULES */}
            <section id="will-probate-chennai" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>TESTATE SUCCESSION &amp; 2025 LAW UPDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Patta Transfer by Will &amp; Chennai Probate Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For decades, Section 213 read with Section 57 of the Indian Succession Act, 1925
                  forced families in Chennai (old Madras Presidency Town) to obtain High Court
                  probate before using a Will for Patta transfer.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Major Shift: Repealing and Amending Act, 2025 (Sec. 213 Omitted)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    On December 20, 2025, Parliament omitted Section 213 of the Indian Succession
                    Act. Probate is no longer compulsory by law in Chennai or Tamil Nadu. Revenue
                    officers cannot reject an undisputed Will solely for lacking probate.
                  </p>
                </div>
                <p>
                  Still, a Tahsildar is not a Civil Court. Under <strong>Section 10(3)</strong> and
                  Madras High Court rulings, the Tahsildar must notify all natural heirs listed in
                  the Varisu Certificate. If every heir agrees or stays silent after notice, Patta
                  transfers to the Will beneficiary. If any heir objects, the Tahsildar stops
                  mutation and directs parties to get voluntary probate or a Civil Court decree.
                  Check Madras High Court filing fees using our{" "}
                  <Link
                    href="/tools/madras-high-court-probate-court-fee-calculator"
                    className="underline font-bold text-[#C65378]"
                  >
                    Madras High Court Probate Fee Calculator
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION 6: TNREGINET AUTO-MUTATION VS E-SEVAI */}
            <section id="auto-mutation-tnreginet" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>STAR 2.0 &amp; TAMIL NILAM SYNC</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. TNREGINET Auto-Mutation vs Manual e-Sevai Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Tamil Nadu links the Registration Department portal (<strong>TNREGINET</strong>)
                  with the Revenue database (<strong>Tamil Nilam</strong>). When you register a
                  deed at the Sub-Registrar Office, auto-mutation triggers only if three conditions
                  are met:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    The full survey field is transferred with no partial split or FMB survey.
                  </li>
                  <li>
                    The seller or settlor holds an individual Patta matching the deed exactly.
                  </li>
                  <li>
                    The land is private patta land with zero name or survey mismatch in A-Register.
                  </li>
                </ul>
                <p>
                  Transfers after death, Joint Patta updates, unregistered Wills, and FMB plot
                  splits never auto-mutate. For all such cases, apply manually through the official{" "}
                  <strong>eservices.tn.gov.in</strong> portal or a local e-Sevai centre.
                </p>
              </div>
            </section>

            {/* SECTION 7: FEES, TIMELINES & VAO TO TAHSILDAR PATH */}
            <section id="fees-timelines-workflow" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>OFFICIAL CHARGES &amp; REVENUE CHAIN</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Official Fees, Timelines &amp; VAO to Tahsildar Path
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every Tamil Nilam application moves through a tracked digital queue. Under{" "}
                  <strong>Rule 9</strong> of the 1987 Rules and Commissionerate of Land
                  Administration norms, simple transfers carry a 15-day target and survey splits
                  carry a 30-day target.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Official Tamil Nadu Fee &amp; Appeal Matrix</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>e-Sevai Portal Service Charge:</strong> Rs 60 for Full-Field or Joint
                      Patta transfer without subdivision (NISD).
                    </li>
                    <li>
                      <strong>Sub-Division Survey Charges (G.O. Ms. No. 370):</strong> Rs 400 in
                      rural villages, Rs 500 in municipalities, and Rs 600 in corporations, plus
                      the Rs 60 e-Sevai fee. Always verify live charges on the portal receipt.
                    </li>
                    <li>
                      <strong>Officer Verification Chain:</strong> Application moves from e-Sevai
                      to Village Administrative Officer (VAO), Firka Surveyor (for ISD only),
                      Revenue Inspector (RI), and Zonal Deputy Tahsildar or Tahsildar.
                    </li>
                    <li>
                      <strong>Statutory Appeals (Sections 12 to 14):</strong> Appeal a Tahsildar
                      rejection to the Revenue Divisional Officer (RDO) under Section 12, then seek
                      revision before the District Revenue Officer (DRO) under Section 13.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* SECTION 8: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SIDE-BY-SIDE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Comparison: Patta Transfer Pathways in TN
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare how Tamil Nadu revenue offices process Patta changes across death cases,
                Wills, registered deeds, and FMB plot splits.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Full / Joint Patta (NISD)
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Sub-Division Patta (ISD)
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-amber-200">
                        Contested Will / Dispute
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Portal Route</td>
                      <td className="p-3.5 sm:p-4">
                        TNREGINET Auto-Sync or e-Sevai Tamil Nilam
                      </td>
                      <td className="p-3.5 sm:p-4">e-Sevai Tamil Nilam (ISD Module)</td>
                      <td className="p-3.5 sm:p-4">
                        Tahsildar Sec. 10(3) Notice / Civil Court
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Official Fee</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Rs 60 e-Sevai (Rs 0 if auto-sync)
                      </td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        Rs 60 + Rs 400 / 500 / 600 (G.O. 370)
                      </td>
                      <td className="p-3.5 sm:p-4">Court fee under TN Court-Fees Act</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Surveyor Visit</td>
                      <td className="p-3.5 sm:p-4">Not required (plot stays whole)</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                        Mandatory Firka Surveyor FMB visit
                      </td>
                      <td className="p-3.5 sm:p-4">Only after final court decree</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Expected Timeline</td>
                      <td className="p-3.5 sm:p-4">15 days norm (15-30 days typical)</td>
                      <td className="p-3.5 sm:p-4">30 days norm (30-60 days typical)</td>
                      <td className="p-3.5 sm:p-4">Stayed until court decree / settlement</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Key Proof</td>
                      <td className="p-3.5 sm:p-4">
                        Death Cert + Varisu Cert or Registered Deed
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Registered Partition / Release Deed + Sketch
                      </td>
                      <td className="p-3.5 sm:p-4">
                        Civil Court Final Decree or Voluntary Probate
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>RELEASING A SHARE TO ONE HEIR IN TAMIL NADU?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Calculate Tamil Nadu Settlement &amp; Release Deed Stamp Duty Caps
                </div>
                <p className="text-xs text-slate-600">
                  Check the Article 58 &amp; Article 55-A family Rs 40,000 stamp cap and Rs 10,000
                  fee cap before applying for a Single Patta.
                </p>
              </div>
              <Link
                href="/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Stamp Duty Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>ONLINE FILING WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Online e-Sevai Patta Transfer
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these 6 verified steps to submit a clean Tamil Nadu Patta transfer
                  application with minimal delay:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Verify Existing Patta, Chitta, or TSLR & Download Latest EC",
                      desc: "Check your District, Taluk, Village, and Survey Number on eservices.tn.gov.in. Download the latest Encumbrance Certificate (EC) on tnreginet.gov.in to confirm clear ownership.",
                    },
                    {
                      title: "Obtain Death Certificate & e-Sevai Varisu Certificate",
                      desc: "For death inheritance cases, secure the Legal Heir Certificate online under G.O. (Ms) No. 478 first. Make sure every surviving heir's spelling matches their Aadhaar card.",
                    },
                    {
                      title: "Log In to Tamil Nilam Citizen Portal or Visit e-Sevai Centre",
                      desc: "Open the Revenue Department Patta Transfer service via OTP login. Pick Full-Field / Joint Patta (NISD) or Sub-Division Patta (ISD) matching your deed.",
                    },
                    {
                      title: "Upload Clear PDF Scans & Pay Official Government Fee",
                      desc: "Upload self-attested PDFs of the Death Certificate, Varisu Certificate, Will or Registered Deed, EC, old Patta, and Aadhaar. Pay Rs 60 (NISD) or the G.O. 370 ISD survey fee and save your Application ID.",
                    },
                    {
                      title: "Attend VAO, Firka Surveyor & RI Field Verification",
                      desc: "Cooperate with the VAO when they match your deed with the Village A-Register. For ISD splits, be present on-site when the Firka Surveyor marks plot boundaries for the new FMB sketch.",
                    },
                    {
                      title: "Track Tahsildar Sign-Off & Download Digital Patta",
                      desc: "Track your Application ID on eservices.tn.gov.in. Once the Zonal Deputy Tahsildar or Tahsildar digitally signs the order, download your updated QR-coded Patta and Chitta for free.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL TAMIL NADU SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Case Studies: Chennai, Coimbatore &amp; Madurai
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Chennai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Chennai Adyar House</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    TSLR Transfer via Registered Will After 2025 Repeal
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A father left his Chennai house to his younger daughter
                    through a registered Will. His elder son agreed and gave a signed NOC.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> Because Section 213 was omitted in December 2025, no
                    probate was needed. After a Rule 4(2) notice and VAO check, the Tahsildar
                    updated the TSLR Patta in 24 days.
                  </p>
                </div>

                {/* Case 2: Coimbatore */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Coimbatore Land Split</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Two Brothers Split 1 Acre via Partition Deed
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> After their father died, two brothers first took a
                    Joint Patta, then registered a Partition Deed dividing the land equally.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> They filed an ISD Sub-Division request on e-Sevai,
                    paid the G.O. 370 fee, and got two separate sub-division Pattas after Firka
                    Surveyor FMB mapping.
                  </p>
                </div>

                {/* Case 3: Madurai */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Madurai Disputed Will</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Tahsildar Halts Mutation on Contested Plain Will
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> One heir filed an unregistered Will to claim sole Patta
                    in Madurai. Two sisters filed written objections during the VAO inquiry.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Outcome:</strong> Following <em>Vishwas Footwear (2011)</em>, the
                    Tahsildar refused sole mutation and directed the family to obtain a Civil Court
                    declaration under Section 14.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SELF-DECLARATION FORMAT & CHECKLIST */}
            <section id="declaration-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>READY-TO-USE LEGAL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Self-Declaration Format &amp; Document Checklist
              </h3>

              {/* Template Box 1: Self-Declaration */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Tamil Nadu Legal Heir Patta Transfer Self-Declaration (Sec. 10)
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedAffidavit ? (
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
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`SELF-DECLARATION FOR TAMIL NADU PATTA & CHITTA NAME TRANSFER (SECTION 10)
I, [Full Name of Applicant], S/o or D/o or W/o [Parent/Spouse Name], residing at [Full Address in Tamil Nadu], solemnly declare as follows:

1. That [Name of Deceased Pattadar] was the lawful owner and registered pattadar of the land/house situated at Village [Village Name], Taluk [Taluk Name], District [District Name], Survey/TSLR No. [Survey No.], Patta No. [Patta No.], measuring [Extent].
2. That the said pattadar passed away on [Date of Death] as per Death Certificate No. [Number].
3. That as per Legal Heir Certificate (Varisu Certificate) No. [Number] issued by the Tahsildar under G.O. (Ms) No. 478, the surviving legal heirs are: [List Names & Relationships].
4. That there is no pending civil suit, injunction, or title dispute concerning the said property.
5. I request the Tahsildar to effect Patta & Chitta mutation under Section 10 of the Tamil Nadu Patta Pass Book Act, 1983 in the names of the rightful heir(s).`}
                </pre>
              </div>

              {/* Template Box 2: Quick Master Document Grid */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Core Tamil Nadu e-Sevai Patta Transfer Document Checklist
                  </div>
                  <Link
                    href="/templates/no-objection-certificate-noc-legal-heirs-format"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] hover:underline"
                  >
                    <span>Get Legal Heir NOC Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Death Certificate &amp; e-Sevai Varisu Certificate (G.O. 478)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Existing Patta, Chitta, A-Register, or Urban TSLR Extract</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Registered Deed / Will / Partition Deed / Court Final Decree</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>TNREGINET Encumbrance Certificate (EC) &amp; Latest Tax Receipt</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Tamil Nadu Land Experts
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Tamil Nadu Revenue &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  lawyers assist Tamil Nadu and NRI families with Uyil Sasanam (Tamil Wills),
                  Varisu Certificates, RDO and DRO Patta appeals, and Madras High Court petitions.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Property Mutation Help</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Certificate</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/madras-high-court-probate-court-fee-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Madras Probate Fee</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-tamil-uyil-sasanam"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Tamil Will Format</span>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: TN Patta Transfer
              </h3>
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
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
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

            {/* SECTION 14: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official TN Portals, Acts &amp; Court Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify live Patta records, survey charges, and Tamil Nadu statutes on official
                  government portals. This guide shares general legal information and is not a
                  substitute for individual legal advice.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://eservices.tn.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>TN e-Services Land Records (Tamil Nilam)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://tnreginet.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>TNREGINET Registration &amp; EC Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act, 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Rulings</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related Tamil Nadu Tools, Templates &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/blogs/tamil-nadu-varisu-certificate-and-patta-transfer-after-death-tnesevai"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      TN Varisu &amp; Patta Guide
                    </Link>
                    <Link
                      href="/tools/tamil-nadu-settlement-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      TN Settlement &amp; Release Duty Tool
                    </Link>
                    <Link
                      href="/tools/madras-high-court-probate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Madras HC Probate Fee Tool
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir vs Succession Tool
                    </Link>
                    <Link
                      href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Pedigree Affidavit
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Format
                    </Link>
                    <Link
                      href="/blogs/difference-between-mutation-dakhil-kharij-and-title-ownership-supreme-court"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Mutation vs Ownership Guide
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH QUICK SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Update Patta Fast?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clean Patta in your own name makes bank loans, house sales, and tax payments
                  smooth. It stops delays when your kids or spouse plan to build or sell land later.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Keep Your Family Papers Ready</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Keep the Death paper, Varisu paper, old Patta, and land deed in one clean file.
                  Match each name with Aadhaar cards before you file on e-Sevai.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Write a Clear Will Today</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A signed Will in Tamil or English keeps your spouse and kids safe from land
                  fights. Clear survey and plot numbers make name change much faster later.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Check Your Land Tax Bills</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pay your house tax or land tax on time each year. Keep old tax receipts safe at
                  home. Officers check tax slips to confirm you hold the plot.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Track Status Online Free</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Save your e-Sevai slip after you pay the fee. Use your number on the state land
                  site to see which desk has your file right now.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Ask Before You Split Land</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If heirs want a single plot name, take a Joint Patta first. Then sign a split or
                  release deed so the land survey map stays clean and clear.
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
                    Adv. Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises Indian and NRI families on state land mutation, Patta transfers, Will
                registration, and High Court probate cases across India.
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
                  <span>MAKE FUTURE PATTA TRANSFER EASY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Clear Will with Exact Patta &amp; Survey Numbers
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Listing your exact Patta, Chitta, TSLR, and survey details in a registered Will
                  helps your family avoid land fights and Taluk office delays.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>TAMIL NADU PATTA &amp; RDO APPEAL DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Tahsildar Rejected Your Patta or Varisu Claim?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team assists with e-Sevai Varisu filings, RDO appeals under Section 12,
                  DRO revisions, and Civil Court title suits.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Tamil Nadu Families Trust Us
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2025 Law Updated:</strong> Reflects Section 213 repeal and G.O. 478 /
                      G.O. 110 rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NISD vs ISD Clarity:</strong> Separates Rs 60 e-Sevai transfers from
                      FMB survey splits.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>End-to-End Guidance:</strong> Covers Varisu, Release Deeds, Wills,
                      and RDO appeals.
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
          href="#interactive-checker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Patta Checker</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
