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
  History,
  GitBranch,
  MapPin,
  Clock,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Guide: Pahani RTC & Pouthi Khata" },
  { id: "interactive-checker", label: "2. Free Pouthi Khata Mutation Checker" },
  { id: "klra-sections-rules", label: "3. KLRA Sections 128, 129 & Rules 63-66" },
  { id: "rtc-columns-guide", label: "4. Reading RTC Columns 9, 11 & 12" },
  { id: "will-vs-intestate", label: "5. Contested Will vs Natural Succession" },
  { id: "joint-khata-vs-phodi", label: "6. Joint Pouthi Khata vs Phodi & 11E Sketch" },
  { id: "comparison-table", label: "7. Bhoomi RTC vs e-Swathu vs BBMP e-Khata" },
  { id: "step-by-step-sop", label: "8. Step-by-Step Bhoomi Pouthi Khata SOP" },
  { id: "document-checklist", label: "9. Required Documents & Copyable Draft" },
  { id: "disputes-appeals", label: "10. Objections & Section 136 Appeals" },
  { id: "practical-scenarios", label: "11. Practical Cases: Mysuru, Mandya, Bengaluru" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Pouthi Khata" },
  { id: "statutory-citations", label: "14. Official Portals & Legal Citations" },
];

const FAQS = [
  {
    q: "What is Pouthi Khata in Karnataka land records?",
    a: "Pouthi Khata means inheritance mutation after a land owner passes away. Legal heirs file a report under Section 128 of the Karnataka Land Revenue Act, 1964. Once approved, their names replace the late owner in Column 9 of the Pahani (RTC) on Bhoomi.",
  },
  {
    q: "How many days does Pouthi Khata mutation take on Bhoomi?",
    a: "Under Rules 64 and 65 of the Karnataka Land Revenue Rules, 1966, the Village Accountant posts Form 12 and sends Form 21 notice for 30 days. If no heir objects, the Revenue Inspector approves the mutation. Under Sakala, clean cases usually take 30 to 45 days.",
  },
  {
    q: "Can a Tahsildar approve Pouthi Khata based on a disputed Will?",
    a: "No. In C.N. Nagendra Singh (2002) and Smt. Jayamma v. State of Karnataka (2020), the Karnataka High Court ruled that revenue officers cannot decide if a contested Will is valid. If another heir objects, you must get a civil court decree or probate first.",
  },
  {
    q: "What is the government fee for Pouthi Khata and Vamshavruksha?",
    a: "Official state fees are low. A Vamshavruksha (Family Tree) at Nadakacheri costs about Rs 45 to Rs 50. Rural Pouthi Khata mutation charges are about Rs 50 to Rs 200. A signed i-RTC copy on Bhoomi costs Rs 25, while viewing an RTC online is free.",
  },
  {
    q: "Is an 11E Sketch or Phodi required for Pouthi Khata?",
    a: "No. A joint Pouthi Khata puts all legal heirs together in RTC Column 9 and needs no 11E Sketch or Phodi. You only need Phodi (Hissa division) or an 11E Sketch later if heirs split the land into separate plots or sell one part.",
  },
  {
    q: "What happens if heirs apply for Pouthi Khata more than 3 months after death?",
    a: "Section 128(1) tells heirs to report inheritance within 3 months. If you apply late, Section 128(3) sets a small late fee of Rs 2 for 3 months to 1 year, and Rs 2 to Rs 10 after 1 year. Late filing never cancels your legal right to inherit the land.",
  },
  {
    q: "Where can I appeal if the Tahsildar rejects or stalls my Pouthi Khata?",
    a: "Under Section 136(2) of the Karnataka Land Revenue Act, 1964, you can appeal to the Assistant Commissioner (AC) within 60 days of the order. Against the AC order, you can file a revision petition before the Deputy Commissioner (DC) under Section 136(3).",
  },
  {
    q: "Does Pouthi Khata on Bhoomi apply to Bengaluru BBMP flats or sites?",
    a: "No. Bhoomi Pahani (RTC) and Pouthi Khata cover rural farm and revenue lands. For Bengaluru city plots or flats under BBMP, heirs apply for Khata Transfer on BBMP e-Aasthi or Sakala. Village sites under Gram Panchayats use the e-Swathu portal.",
  },
];

type LandJurisdiction =
  | "agricultural_bhoomi"
  | "gram_panchayat_eswathu"
  | "urban_bbmp_khata"
  | "converted_dc";

type ClaimBasis =
  | "intestate_consensus"
  | "registered_will"
  | "unregistered_will"
  | "court_decree"
  | "family_partition_release";

type DisputeRisk = "undisputed" | "contested_objection";
type ReportingDelay = "within_3_months" | "3_to_12_months" | "over_1_year";
type Column11Status = "joint_clean" | "separate_phodi" | "col11_loan_stay";
type DocReadiness = "docs_ready" | "need_vamshavruksha";

export default function KarnatakaPouthiKhataClient() {
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
  const [landType, setLandType] = useState<LandJurisdiction>("agricultural_bhoomi");
  const [claimBasis, setClaimBasis] = useState<ClaimBasis>("intestate_consensus");
  const [disputeRisk, setDisputeRisk] = useState<DisputeRisk>("undisputed");
  const [reportingDelay, setReportingDelay] = useState<ReportingDelay>("within_3_months");
  const [column11Status, setColumn11Status] = useState<Column11Status>("joint_clean");
  const [docReadiness, setDocReadiness] = useState<DocReadiness>("docs_ready");

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

  const handleReset = () => {
    setLandType("agricultural_bhoomi");
    setClaimBasis("intestate_consensus");
    setDisputeRisk("undisputed");
    setReportingDelay("within_3_months");
    setColumn11Status("joint_clean");
    setDocReadiness("docs_ready");
  };

  // =========================================================================
  // DIAGNOSTIC CHECKER ENGINE (Karnataka Land Revenue Act 1964 & Rules 1966)
  // =========================================================================
  let verdictTitle = "Eligible for Direct Bhoomi Pouthi Khata";
  let statusBadge = "Ready to File (Sec. 128-129)";
  let badgeTone: "emerald" | "amber" | "rose" = "emerald";
  let readinessScore = 95;
  let portalAuthority = "Bhoomi Portal / Nadakacheri (RI & Tahsildar)";
  let noticeWindow = "30-Day Form 21 Notice (Est. 30-45 Days)";
  let feeBreakdown = "Rs 50-200 Mutation + Rs 25 i-RTC";
  let legalProvision = "KLRA Sections 128, 129 & KLR Rules 63-66";
  let legalRationale =
    "All legal heirs agree on natural succession for rural agricultural land. Under Section 128 and Rule 64, the Village Accountant posts Form 12 and sends Form 21 notice for 30 days. With zero objections, the Revenue Inspector updates Column 9 of the Pahani (RTC).";
  let actionPlan =
    "Submit Death Certificate, Nadakacheri Vamshavruksha, RTC copy, and Aadhaar of all heirs via Bhoomi or Nadakacheri. Track MR status online after 30 days.";
  const blockers: string[] = [];

  // 1. Statutory Late Reporting Penalty (KLRA Section 128(3))
  let lateFeeText = "Rs 0 late fee (within 3-month Sec. 128(1) limit)";
  if (reportingDelay === "3_to_12_months") {
    lateFeeText = "Rs 2 statutory late fee (Sec. 128(3), 3-12 months)";
  } else if (reportingDelay === "over_1_year") {
    lateFeeText = "Rs 2 to Rs 10 statutory late fee (Sec. 128(3), over 1 year)";
  }

  // 2. Jurisdiction Routing First
  if (landType === "urban_bbmp_khata") {
    verdictTitle = "Route to BBMP e-Aasthi / Urban Khata Transfer";
    statusBadge = "Non-Bhoomi Urban Route";
    badgeTone = "amber";
    readinessScore = 80;
    portalAuthority = "BBMP e-Aasthi / Municipal Sakala Portal";
    noticeWindow = "15 to 30 Working Days (Sakala Urban)";
    feeBreakdown = "2% of Stamp Duty (deed) or Notified Municipal Fee";
    legalProvision = "BBMP Act 2020 / Karnataka Municipalities Rules";
    legalRationale =
      "Bhoomi Pahani (RTC) applies only to agricultural and revenue survey land. Urban city sites and flats inside BBMP or municipal limits do not use Pouthi Khata on Bhoomi. You must apply for urban Khata Transfer through e-Aasthi or Sakala.";
    actionPlan =
      "Keep the parent title deed, Death Certificate, Family Tree, latest tax paid receipt, and EC ready. Apply online on the municipal e-Aasthi or Sakala portal.";
  } else if (landType === "gram_panchayat_eswathu") {
    verdictTitle = "Route to Gram Panchayat e-Swathu (Form 9 & 11B)";
    statusBadge = "Rural Site e-Swathu Route";
    badgeTone = "amber";
    readinessScore = 82;
    portalAuthority = "Gram Panchayat PDO / e-Swathu Portal";
    noticeWindow = "15 to 30 Days (PDO Verification)";
    feeBreakdown = "Nominal Panchayat Mutation & Tax Arrears Clearance";
    legalProvision = "Karnataka Gram Swaraj & Panchayat Raj Rules";
    legalRationale =
      "Non-agricultural residential sites inside village Gramathana limits use e-Swathu Form 9 and Form 11B instead of Bhoomi agricultural RTC. The Panchayat Development Officer (PDO) verifies the Death Certificate and Family Tree before mutating the site.";
    actionPlan =
      "Clear pending Gram Panchayat house tax, gather Vamshavruksha and Death Certificate, and submit an inheritance Khata transfer request to the PDO on e-Swathu.";
  } else {
    // Agricultural Bhoomi OR DC Converted land still on revenue records
    if (landType === "converted_dc") {
      portalAuthority = "Bhoomi + Local Authority (Post Sec. 95 Order)";
      blockers.push(
        "DC Converted Land: Attach the Section 95 Conversion Order and verify whether the land has shifted from Bhoomi RTC to e-Swathu or Urban e-Khata."
      );
      readinessScore -= 10;
    }

    // Evaluate Claim Basis & Dispute Risk under Full Bench Rulings
    if (
      (claimBasis === "registered_will" || claimBasis === "unregistered_will") &&
      disputeRisk === "contested_objection"
    ) {
      verdictTitle = "Blocked at Revenue Level: Civil Court Decree Needed";
      statusBadge = "Disputed Will (High Court Bar)";
      badgeTone = "rose";
      readinessScore = 30;
      portalAuthority = "Civil Court (Sec. 135 KLRA) -> Then Bhoomi";
      noticeWindow = "Paused Pending Civil Decree / Probate";
      legalProvision = "C.N. Nagendra Singh (2002 FB) & Smt. Jayamma (2020 FB)";
      legalRationale =
        "Two Karnataka High Court Full Bench rulings hold that the Tahsildar and Revenue Inspector cannot decide whether a contested Will is valid. Once a legal heir files an objection during the 30-day Form 21 notice window, revenue officers must stop Will-based mutation and direct parties to a Civil Court.";
      actionPlan =
        "Do not expect the Tahsildar to prove your Will. File a civil suit for declaration or probate under the Indian Succession Act. Alternatively, heirs can enter a joint Pouthi Khata by natural succession until the court rules.";
      blockers.push(
        "Contested Will Bar: Under C.N. Nagendra Singh (ILR 2002 KAR 2750), revenue courts have zero power to test witness proof under Section 63 ISA."
      );
    } else if (claimBasis === "unregistered_will" && disputeRisk === "undisputed") {
      verdictTitle = "Conditional Pouthi Khata: Unregistered Will Scrutiny";
      statusBadge = "Heir NOC Strongly Needed";
      badgeTone = "amber";
      readinessScore = 68;
      portalAuthority = "Tahsildar / Revenue Inspector (Bhoomi)";
      noticeWindow = "30-Day Form 21 Notice (Strict Inquiry)";
      legalProvision = "KLRA Sec. 129 & C.N. Nagendra Singh (2002 FB)";
      legalRationale =
        "Revenue officers inspect unregistered Wills with extra caution. Even if no dispute exists today, the Tahsildar usually demands written No-Objection affidavits from all Class I legal heirs on the Vamshavruksha before mutating an unregistered Will.";
      actionPlan =
        "Collect notarized No-Objection affidavits from every legal heir listed in the Vamshavruksha. If any heir refuses to sign, seek a civil declaration or register a family settlement deed.";
      blockers.push(
        "Unregistered Will Risk: A single objection during the 30-day Form 21 window shifts the case into the Register of Disputed Cases."
      );
    } else if (claimBasis === "registered_will" && disputeRisk === "undisputed") {
      verdictTitle = "Eligible for Will-Based Pouthi Khata (Uncontested)";
      statusBadge = "Uncontested Registered Will";
      badgeTone = "emerald";
      readinessScore = 88;
      portalAuthority = "Bhoomi Portal / Nadakacheri (RI & Tahsildar)";
      noticeWindow = "30-Day Form 21 Notice (Est. 30-45 Days)";
      legalProvision = "KLRA Sec. 128-129 & Smt. Jayamma (2020 FB)";
      legalRationale =
        "Where a Registered Will is completely uncontested by natural heirs during the 30-day Form 21 notice period, revenue authorities can process mutation after checking the Death Certificate, Vamshavruksha, and original Registered Will.";
      actionPlan =
        "Attach the Registered Will, Death Certificate, Vamshavruksha, and consenting affidavits from other legal heirs to ensure smooth approval without objections.";
    } else if (claimBasis === "court_decree") {
      verdictTitle = "Mandatory Mutation Under Final Civil Court Decree";
      statusBadge = "Binding Court Decree (Sec. 135)";
      badgeTone = "emerald";
      readinessScore = 92;
      portalAuthority = "Tahsildar / Bhoomi (Decree Execution)";
      noticeWindow = "15 to 30 Days (Mandatory Entry)";
      legalProvision = "KLRA Section 128 & Section 135";
      legalRationale =
        "Under Section 135 of the Karnataka Land Revenue Act, revenue officers are legally bound to update the Pahani (RTC) to match a final Civil Court decree. The Tahsildar cannot re-examine title once a civil court decides it.";
      actionPlan =
        "Submit a certified copy of the final Decree and Judgment (confirming no pending appellate stay) to the Tahsildar with Form 19-A for direct RTC mutation.";
    } else if (claimBasis === "family_partition_release") {
      verdictTitle = "Fast-Track Kaveri 2.0 J-Slip Mutation Route";
      statusBadge = "Registered Deed (7-Day Notice)";
      badgeTone = "emerald";
      readinessScore = 96;
      portalAuthority = "Sub-Registrar Kaveri 2.0 -> Bhoomi Auto J-Slip";
      noticeWindow = "7-Day Registered Deed Notice (Est. 15-30 Days)";
      feeBreakdown = "Kaveri 2.0 Stamp/Reg Fee + Rs 25 i-RTC";
      legalProvision = "KLRA Section 128(1) Proviso & Rule 63";
      legalRationale =
        "When heirs sign a registered Partition Deed or Release Deed at the Sub-Registrar office, Kaveri 2.0 sends an automatic electronic J-Slip to Bhoomi. Under the Section 128(1) proviso, you do not need to file a separate manual report, and registered deeds follow a shorter 7-day notice window.";
      actionPlan =
        "Track the J-Slip mutation number on Bhoomi. Note that dividing a survey number into partial shares via a Partition Deed requires an 11E Sketch before registration.";
    } else if (disputeRisk === "contested_objection") {
      verdictTitle = "Disputed Case Register: Tahsildar Inquiry Triggered";
      statusBadge = "Contested Sec. 129 Hearing";
      badgeTone = "rose";
      readinessScore = 45;
      portalAuthority = "Tahsildar Court (Disputed Case) / AC Appeal";
      noticeWindow = "30-Day Notice + Summary Hearing (60-120+ Days)";
      legalProvision = "KLRA Section 129(4)-(6) & Section 136(2)";
      legalRationale =
        "When a co-heir or third party objects during the 30-day Form 21 notice window, the Revenue Inspector cannot certify the entry. The case moves to the Register of Disputed Cases for a summary hearing by the Tahsildar. If title itself is disputed, the Tahsildar will ask parties to visit a Civil Court.";
      actionPlan =
        "Ensure every Class I heir (including married daughters and widow) is included in the Vamshavruksha. Excluding a legal heir causes instant objection and rejection.";
      blockers.push(
        "Disputed Mutation Delay: Expect a Tahsildar hearing notice. If rejected unfairly, appeal to the Assistant Commissioner within 60 days under Section 136(2)."
      );
    }
  }

  // 3. Apply Vamshavruksha, Column 11, and Phodi modifiers
  if (docReadiness === "need_vamshavruksha") {
    readinessScore = Math.max(20, readinessScore - 15);
    noticeWindow = `${noticeWindow} + 15-30 Days for Vamshavruksha`;
    feeBreakdown = `${feeBreakdown} + Rs 45-50 Vamshavruksha`;
    blockers.push(
      "Missing Vamshavruksha: Apply first at Nadakacheri (Atalji Janasnehi Kendra) with the Death Certificate, heir ID proofs, and a sworn family tree affidavit."
    );
  }

  if (column11Status === "col11_loan_stay") {
    readinessScore = Math.max(15, readinessScore - 25);
    if (badgeTone === "emerald") badgeTone = "amber";
    blockers.push(
      "RTC Column 11 Flag: Active bank loans, court stays, or PTCL/grant restrictions in Column 11 can freeze mutation or carry over as liabilities. Clear bank NOC or check stay orders first."
    );
  } else if (column11Status === "separate_phodi") {
    readinessScore = Math.max(30, readinessScore - 10);
    blockers.push(
      "Phodi / Hissa Required After Joint Khata: Complete joint Pouthi Khata first. Then apply to the Survey Department (ADLR) for Phodi/Hissa or a licensed surveyor 11E Sketch to split separate boundaries."
    );
  }

  if (landType === "agricultural_bhoomi" && claimBasis !== "family_partition_release") {
    feeBreakdown = `${feeBreakdown} (${lateFeeText})`;
  }

  const copyAffidavitToClipboard = () => {
    const text = `SELF-DECLARATION AFFIDAVIT FOR VAMSHAVRUKSHA & POUTHI KHATA (KARNATAKA)
I, [Full Name], aged [Age] years, son/daughter/wife of [Late Khatedar Name], residing at [Full Address, Village, Hobli, Taluk, District, Karnataka], do hereby solemnly affirm and state as follows:

1. That Late [Name of Deceased Owner] was the recorded Khatedar in Column 9 of Pahani (RTC) for Survey No. [Sy. No. / Hissa No.], measuring [Extent in Acres-Guntas], situated at [Village], [Hobli], [Taluk], [District], Karnataka.
2. That Late [Name of Deceased Owner] passed away on [Date of Death] as evidenced by Death Certificate No. [Number] dated [Date].
3. That the deceased left behind the following and ONLY the following surviving legal heirs:
   (a) [Name 1] - [Relationship] - Age [__]
   (b) [Name 2] - [Relationship] - Age [__]
   (c) [Name 3] - [Relationship] - Age [__]
4. That no other legal heir has been omitted or concealed, and there is no pending civil court injunction barring joint Pouthi Khata mutation under Section 128 of the Karnataka Land Revenue Act, 1964.
5. I request the Tahsildar / Revenue Inspector to issue the Vamshavruksha and enter all surviving legal heirs jointly in Column 9 of the RTC.

Deponent Signature: _______________  Date: [DD/MM/YYYY]`;
    navigator.clipboard.writeText(text);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `KARNATAKA POUTHI KHATA (PAHAN / RTC) DOCUMENT CHECKLIST
1. Original / Certified Death Certificate of the recorded Khatedar.
2. Digitally Signed Vamshavruksha (Family Tree Certificate) from Nadakacheri (AJSK).
3. Latest Bhoomi Pahani (RTC) copy showing deceased name in Column 9 and checking Column 11.
4. Previous Mutation Register (MR) extract showing how deceased got title.
5. Aadhaar Cards, PAN, and mobile numbers of all surviving legal heirs (sons, daughters, spouse, mother).
6. Sworn Joint Family Affidavit / No-Objection Affidavit on stamp paper signed by all heirs.
7. Registered Will (if claiming via Will) OR Certified Civil Court Decree (if claiming via decree).
8. Bank Loan Clearance / NOC (only if an active mortgage appears in Column 11).
9. Land Revenue (Kandaya) paid receipt up to the current assessment year.
10. Section 95 DC Conversion Order (only if land was converted to non-agricultural use).`;
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
            <span>KARNATAKA LAND REVENUE ACT, 1964 • SECTIONS 128, 129 &amp; 136</span>
          </div>

          {/* Strict Single H1 Tag (52 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Karnataka Pahani RTC &amp; Pouthi Khata Mutation Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your Pouthi Khata mutation route on Bhoomi in 60 seconds. Verify Form 21 notice
            days, Nadakacheri Vamshavruksha rules, Column 11 blocks, official fees, and High Court
            Will rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Run Pouthi Khata Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Karnataka Will Online</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">3 Months</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC. 128 REPORTING WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FORM 12 &amp; FORM 21 NOTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 25 i-RTC</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BHOOMI SIGNED PAHANI FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">60 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC. 136(2) AC APPEAL LIMIT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Checker)
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
                <span>Karnataka Revenue Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Based on Sections 128, 129, 135, and 136 of the Karnataka Land Revenue Act, 1964,
                Rules 63 to 66, and Full Bench rulings of the Karnataka High Court.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE CHECKER
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>QUICK SUMMARY: KARNATAKA POUTHI KHATA &amp; PAHANI MUTATION</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>What Pouthi Khata Does:</strong> After a Karnataka land owner dies,
                    heirs apply for Pouthi Khata to shift the land record (Pahani or RTC) into
                    their names in Column 9 on the Bhoomi portal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day Public Notice Rule:</strong> Under Rules 64 and 65, the Village
                    Accountant posts Form 12 and serves Form 21 notice for 30 days. Clean cases
                    usually finish in 30 to 45 days under Sakala.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Contested Wills Cannot Be Decided by Tahsildar:</strong> Under{" "}
                    <em>C.N. Nagendra Singh</em> (2002) and <em>Smt. Jayamma</em> (2020), revenue
                    officers cannot rule on disputed Wills. Heirs must approach a Civil Court.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rural vs City Portal Split:</strong> Bhoomi RTC covers farm and revenue
                    lands only. Village sites use e-Swathu, while Bengaluru urban plots and flats
                    use BBMP e-Aasthi Khata transfer.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Guide: Karnataka Pahani RTC &amp; Pouthi Khata
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Karnataka, a Pahani or RTC (Record of Rights, Tenancy, and Crops) is the key
                  revenue record for rural and farm land. It lists the owner name, total acres and
                  guntas, crop use, and bank loans.
                </p>
                <p>
                  When the recorded owner passes away, the RTC still shows the late owner&rsquo;s
                  name. Legal heirs cannot sell the land, take crop loans, or claim PM-KISAN
                  benefits until they update the record. This inheritance transfer is called{" "}
                  <strong>Pouthi Khata</strong>.
                </p>
                <p>
                  Pouthi Khata follows Sections 128 and 129 of the Karnataka Land Revenue Act,
                  1964. Remember one core legal rule: a Pahani entry tracks land tax and possession.
                  It does not create final civil title if a title fight goes to court.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE POUTHI KHATA MUTATION CHECKER */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Karnataka Pouthi Khata Mutation Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your land type, heir claim basis, and RTC status below. Get your exact
                portal, notice timeline, official fee breakdown, and legal risk alerts right away.
              </p>

              {/* Checker Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-7">
                {/* Question 1: Land Type & Jurisdiction */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: Which land or property type did the owner leave?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(
                      [
                        {
                          id: "agricultural_bhoomi",
                          label: "Farm / Revenue Land (RTC)",
                          desc: "Has a Survey No. and Bhoomi Pahani extract",
                        },
                        {
                          id: "gram_panchayat_eswathu",
                          label: "Village Site (e-Swathu)",
                          desc: "Gramathana home site under Gram Panchayat",
                        },
                        {
                          id: "urban_bbmp_khata",
                          label: "City Plot / Flat (BBMP)",
                          desc: "Urban municipal or BBMP e-Aasthi Khata property",
                        },
                        {
                          id: "converted_dc",
                          label: "DC Converted Land",
                          desc: "Converted under Sec. 95 KLRA from farm land",
                        },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setLandType(option.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          landType === option.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{option.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Basis of Inheritance Claim */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Question 2: On what legal document are heirs claiming mutation?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: "intestate_consensus",
                          label: "No Will (Natural Heirs)",
                          desc: "Standard Pouthi Khata by family succession",
                        },
                        {
                          id: "registered_will",
                          label: "Registered Will (Uyilu)",
                          desc: "Will registered at Sub-Registrar office",
                        },
                        {
                          id: "unregistered_will",
                          label: "Unregistered Will",
                          desc: "Signed Will on plain paper without SRO filing",
                        },
                        {
                          id: "court_decree",
                          label: "Civil Court Decree",
                          desc: "Final partition or title decree from court",
                        },
                        {
                          id: "family_partition_release",
                          label: "Registered Partition / Release",
                          desc: "Registered deed on Kaveri 2.0 among heirs",
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setClaimBasis(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          claimBasis === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3 & Question 4 Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {/* Question 3: Dispute Status */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Question 3: Do all legal heirs agree?</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: "undisputed",
                            label: "All Heirs Agree",
                            desc: "No objection expected during notice",
                          },
                          {
                            id: "contested_objection",
                            label: "Dispute / Objection Likely",
                            desc: "A sibling or heir disputes shares or Will",
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDisputeRisk(opt.id)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            disputeRisk === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 4: Vamshavruksha Status */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-[#C65378]" />
                      <span>Question 4: Is Vamshavruksha ready?</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: "docs_ready",
                            label: "Yes, Both Ready",
                            desc: "Have Death Certificate & Family Tree",
                          },
                          {
                            id: "need_vamshavruksha",
                            label: "Need Family Tree",
                            desc: "Must apply at Nadakacheri first",
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDocReadiness(opt.id)}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            docReadiness === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question 5: Reporting Time Since Death */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C65378]" />
                    <span>Question 5: How long ago did the recorded Khatedar pass away?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: "within_3_months",
                          label: "Within 3 Months",
                          desc: "On time under KLRA Section 128(1)",
                        },
                        {
                          id: "3_to_12_months",
                          label: "3 Months to 1 Year",
                          desc: "Nominal Rs 2 statutory fee under Sec. 128(3)",
                        },
                        {
                          id: "over_1_year",
                          label: "Over 1 Year Ago",
                          desc: "Rs 2 to Rs 10 late fee order by officer",
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setReportingDelay(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          reportingDelay === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 6: Column 11 & Subdivision Need */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C65378]" />
                    <span>Question 6: Check RTC Column 11 &amp; land split need</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: "joint_clean",
                          label: "Clean Col. 11 + Joint Khata",
                          desc: "No loans or stays; all heirs listed together",
                        },
                        {
                          id: "separate_phodi",
                          label: "Need Separate Sub-Plots",
                          desc: "Heirs want individual Hissa numbers (Phodi)",
                        },
                        {
                          id: "col11_loan_stay",
                          label: "Col. 11 Has Loan / Stay / PTCL",
                          desc: "Bank loan, court order, or grant remark listed",
                        },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setColumn11Status(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          column11Status === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Checker to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Card)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        POUTHI KHATA MUTATION DIAGNOSTIC RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {verdictTitle}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        badgeTone === "emerald"
                          ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                          : badgeTone === "amber"
                            ? "bg-amber-500/15 border-amber-400/30 text-amber-300"
                            : "bg-rose-500/20 border-rose-400/40 text-rose-200"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{statusBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        PORTAL &amp; AUTHORITY
                      </div>
                      <div className="text-sm sm:text-base font-black text-emerald-400 leading-snug">
                        {portalAuthority}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Readiness Score: {readinessScore}/100
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        NOTICE &amp; TIMELINE
                      </div>
                      <div className="text-sm sm:text-base font-black text-white leading-snug">
                        {noticeWindow}
                      </div>
                      <div className="text-[11px] text-slate-300">Sakala &amp; KLR Rules</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ESTIMATED GOVT FEES
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {feeBreakdown}
                      </div>
                      <div className="text-[11px] text-slate-400">{legalProvision}</div>
                    </div>
                  </div>

                  {/* Blockers Alert Box if any */}
                  {blockers.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2 text-xs text-amber-100">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Action Alerts Detected ({blockers.length})</span>
                      </div>
                      <ul className="space-y-1.5 list-disc pl-4">
                        {blockers.map((b, i) => (
                          <li key={i} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Explanation:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Next Practical Step:</strong> {actionPlan}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help with contested Pouthi Khata, Section 136 appeals, or a Karnataka
                      Will?
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
                      <Link
                        href="/services/property-mutation-dakhil-kharij-service"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors"
                      >
                        <span>Mutation Legal Help</span>
                      </Link>
                      <button
                        onClick={handleStartDraft}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Draft a Karnataka Will</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
                  <span>KARNATAKA LAND RECORD GUIDE: PAHANI RTC &amp; POUTHI KHATA</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">KLRA 1964</span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/karnataka-pahani-rtc-pouthi-khata-mutation-checker-og.jpg"
                  alt="Karnataka Pahani RTC and Pouthi Khata Mutation Checker Guide"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Checking Karnataka Pahani (RTC) records, Vamshavruksha lineage, and Pouthi Khata
                inheritance mutation under Sections 128 and 129 of the Karnataka Land Revenue Act.
              </p>
            </div>

            {/* SECTION 3: KLRA SECTIONS 128, 129 & KLR RULES 63-66 */}
            <section id="klra-sections-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>APPLICABLE STATUTES &amp; RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. KLRA Sections 128, 129 &amp; Rules 63 to 66 Explained
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every Pouthi Khata in Karnataka follows clear steps laid down in the{" "}
                  <strong>Karnataka Land Revenue Act, 1964</strong> and the{" "}
                  <strong>Karnataka Land Revenue Rules, 1966</strong>. Knowing each section stops
                  officers from making unlawful delays.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 128 KLRA
                    </div>
                    <div className="font-bold text-slate-900">
                      3-Month Reporting Rule &amp; Late Fee
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Heirs must report land acquired by death within 3 months. If delayed 3 to 12
                      months, Section 128(3) sets a Rs 2 late fee. Over 1 year, the fee is Rs 2 to
                      Rs 10. Registered deeds are sent directly by Kaveri 2.0 via J-Slip.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Section 129 KLRA
                    </div>
                    <div className="font-bold text-slate-900">
                      Mutation Register &amp; Disputed Cases
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      The officer logs the claim in the Mutation Register (MR). If no one objects
                      within the notice window, the entry is certified. If anyone objects, it moves
                      to the Register of Disputed Cases for a Tahsildar inquiry.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Rules 63, 64 &amp; 65 (1966 Rules)
                    </div>
                    <div className="font-bold text-slate-900">
                      Form 19-A, Form 12 &amp; Form 21 Notice
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Rule 63 starts the digital Bhoomi entry. Rule 64 posts Form 12 at the village
                      chavadi for 30 days. Rule 65 serves Form 21 notice on interested parties so
                      hidden heirs can object before certification.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Sections 133 &amp; 135 KLRA
                    </div>
                    <div className="font-bold text-slate-900">
                      Presumption &amp; Civil Court Priority
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Section 133 treats RTC entries as true until disproved. Under Section 135, if
                      a Civil Court passes a final title or partition decree, revenue officers must
                      update the RTC to match that decree.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: READING RTC (PAHANI) COLUMNS 9, 11 & 12 */}
            <section id="rtc-columns-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PAHANI (RTC) INSPECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Reading RTC Columns 9, 11 &amp; 12 Before Filing
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before you apply for Pouthi Khata, download a fresh Pahani from Bhoomi. Viewing is
                  free, and a digitally signed i-RTC costs Rs 25. Check these three critical columns
                  first:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Column 9 (Kabzedar)
                    </div>
                    <div className="font-bold text-slate-900">Owner Name &amp; MR Number</div>
                    <p className="text-slate-600 leading-relaxed">
                      Shows the late Khatedar&rsquo;s exact spelling, land extent in Acres-Guntas,
                      and old MR number. After Pouthi Khata, all legal heirs appear here with a new
                      MR number.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Column 11 (Liabilities)
                    </div>
                    <div className="font-bold text-slate-900">Loans, Stays &amp; Grant Rules</div>
                    <p className="text-slate-600 leading-relaxed">
                      Lists bank crop loans, mortgages, pending court stays, or SC/ST PTCL grant
                      bars. A court stay here blocks mutation until vacated. Loans stay attached to
                      the land.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Column 12 (Cultivator)
                    </div>
                    <div className="font-bold text-slate-900">Actual Possession &amp; Crops</div>
                    <p className="text-slate-600 leading-relaxed">
                      Records who farms the land (often marked &ldquo;Swayam&rdquo; for self) and
                      annual crops grown. Check that no outsider is wrongly listed as a tenant
                      before you file.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: WILL VS INTESTATE SUCCESSION (FULL BENCH RULINGS) */}
            <section id="will-vs-intestate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>KARNATAKA HIGH COURT PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Contested Will vs Natural Succession: Full Bench Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Karnataka families get stuck when one child brings a Will to the Tahsildar
                  office and another child objects. Two binding Full Bench rulings of the Karnataka
                  High Court settle this point clearly.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>C.N. Nagendra Singh (ILR 2002 KAR 2750) &amp; Smt. Jayamma (ILR 2020 KAR 1449)</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <li>
                      <strong>No Revenue Trial on Wills:</strong> Revenue officers are tax officers,
                      not civil judges. They cannot examine witnesses or rule if a disputed Will is
                      genuine under Section 63 of the Indian Succession Act.
                    </li>
                    <li>
                      <strong>Uncontested Registered Will:</strong> If all legal heirs on the
                      Vamshavruksha agree and file no objection during the 30-day Form 21 notice,
                      the officer may record the mutation.
                    </li>
                    <li>
                      <strong>Disputed Will Path:</strong> If even one Class I heir objects, the
                      Tahsildar must keep the Will claim aside and direct parties to a Civil Court.
                      Revenue records stay joint or follow the civil court decree.
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Equal Share for Daughters on Ancestral Land</span>
                  </div>
                  <p className="leading-relaxed">
                    Under the Supreme Court ruling in <em>Vineeta Sharma v. Rakesh Sharma</em>{" "}
                    (2020), married and unmarried daughters hold equal rights by birth in ancestral
                    Hindu land. Never omit a daughter from the Nadakacheri Vamshavruksha.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: JOINT POUTHI KHATA VS PHODI & 11E SKETCH */}
            <section id="joint-khata-vs-phodi" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>SUBDIVISION &amp; SURVEY RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Joint Pouthi Khata vs Phodi &amp; 11E Sketch
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Heirs often delay Pouthi Khata because they think they need a land survey first.
                  That is a costly myth. Split the task into two simple phases:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Phase 1 (Joint Pouthi Khata - No Survey Needed):</strong> All legal
                    heirs enter their names together in Column 9 of the same survey number. You do{" "}
                    <strong>not</strong> need an 11E Sketch or Phodi for joint Pouthi Khata.
                  </li>
                  <li>
                    <strong>Phase 2 (Phodi / Hissa - For Separate Plots):</strong> After joint
                    Pouthi Khata finishes, heirs can sign a registered Partition Deed and apply to
                    the Survey Department (ADLR) for Phodi. Phodi assigns separate Hissa numbers
                    like 42/1 and 42/2.
                  </li>
                  <li>
                    <strong>When 11E Sketch Is Mandatory:</strong> Under Karnataka registration
                    rules, if you sell or partition only a part of an agricultural survey number at
                    the Sub-Registrar office, a licensed surveyor&rsquo;s 11E Sketch is mandatory.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>KARNATAKA PORTAL COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Bhoomi Pouthi Khata vs e-Swathu vs BBMP e-Khata
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Filing on the wrong portal leads to instant rejection. Compare Karnataka&rsquo;s
                three property transfer portals below.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Bhoomi (Pouthi Khata)
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-amber-200">
                        e-Swathu (Form 9/11B)
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        BBMP / Urban e-Aasthi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Property Type</td>
                      <td className="p-3.5 sm:p-4">Agricultural &amp; revenue survey land</td>
                      <td className="p-3.5 sm:p-4">Village Gramathana residential sites</td>
                      <td className="p-3.5 sm:p-4">City plots, houses, &amp; Bengaluru flats</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Key Record</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-emerald-800">
                        Pahani (RTC) &amp; MR Extract
                      </td>
                      <td className="p-3.5 sm:p-4">Form 9 &amp; Form 11B</td>
                      <td className="p-3.5 sm:p-4">e-Khata / A-Khata Certificate</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Approving Officer</td>
                      <td className="p-3.5 sm:p-4">Revenue Inspector / Tahsildar</td>
                      <td className="p-3.5 sm:p-4">Panchayat Dev. Officer (PDO)</td>
                      <td className="p-3.5 sm:p-4">Assistant Revenue Officer (ARO)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Notice &amp; Timeline</td>
                      <td className="p-3.5 sm:p-4">30-day Form 21 notice (30-45 days)</td>
                      <td className="p-3.5 sm:p-4">15 to 30 days after PDO check</td>
                      <td className="p-3.5 sm:p-4">15 to 30 working days (Sakala)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Govt Fee</td>
                      <td className="p-3.5 sm:p-4">Rs 50-200 + Rs 25 i-RTC</td>
                      <td className="p-3.5 sm:p-4">Nominal fee + tax clearance</td>
                      <td className="p-3.5 sm:p-4">2% of stamp duty or notified fee</td>
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
                  <span>GIFTING OR RELEASING FAMILY LAND IN KARNATAKA?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Calculate Karnataka Gift Deed &amp; Release Deed Stamp Duty
                </div>
                <p className="text-xs text-slate-600">
                  Check Article 28(b) and Article 45(b) family slabs on Kaveri 2.0 before
                  registering a sibling release deed.
                </p>
              </div>
              <Link
                href="/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Karnataka Stamp Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP PROCESS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step Bhoomi Pouthi Khata Process
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these 6 clear steps to move a late parent&rsquo;s Karnataka agricultural
                  land into the legal heirs&rsquo; names:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Get Official Death Certificate & Inspect RTC",
                      desc: "Collect the registered Death Certificate. Download the latest Pahani (RTC) from Bhoomi to confirm the exact survey number, extent, and clean Column 11 status.",
                    },
                    {
                      title: "Apply for Vamshavruksha at Nadakacheri",
                      desc: "Apply online on the Nadakacheri (AJSK) portal or at your Hobli center with an affidavit listing all heirs. Pay about Rs 45 to Rs 50. The Village Accountant checks the family tree and issues it in 15 to 30 days.",
                    },
                    {
                      title: "File Pouthi Khata Application (Form 19-A)",
                      desc: "Submit the Pouthi Khata request online via Bhoomi Citizen Services or at Gram One, Nadakacheri, or the Taluk Bhoomi counter with Aadhaar copies of all heirs and pay the nominal fee.",
                    },
                    {
                      title: "Track 30-Day Form 12 & Form 21 Notice Period",
                      desc: "The system creates a Mutation Register (MR) entry. The Village Accountant posts Form 12 at the village chavadi and serves Form 21 notices, opening a 30-day window for objections.",
                    },
                    {
                      title: "Revenue Inspector Verification & Certification",
                      desc: "After 30 days pass with zero objections, the Revenue Inspector or Deputy Tahsildar checks the Village Accountant report and digitally certifies the mutation on Bhoomi.",
                    },
                    {
                      title: "Download Updated Signed i-RTC & MR Extract",
                      desc: "Once certified, Bhoomi auto-updates Column 9 with the heirs' names. Pay Rs 25 on Bhoomi to download the digitally signed i-RTC and Mutation Register extract for your permanent records.",
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

            {/* SECTION 9: DOCUMENT CHECKLIST & COPYABLE DRAFT */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DOCUMENTS &amp; DRAFT TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Required Documents &amp; Copyable Affidavit Format
              </h3>

              {/* Template Box 1: Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Complete Karnataka Pouthi Khata Document Checklist
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {[
                    "Certified Death Certificate of recorded Khatedar",
                    "Nadakacheri Vamshavruksha (Family Tree Certificate)",
                    "Latest Bhoomi Pahani (RTC) & old MR extract",
                    "Aadhaar & mobile numbers of all legal heirs",
                    "Sworn Heir Affidavit / No-Objection statement",
                    "Registered Will or Civil Court Decree (if any)",
                    "Land revenue (Kandaya) paid tax receipt",
                    "Bank Loan NOC (if mortgage is in Column 11)",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Box 2: Copyable Self-Declaration Affidavit */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample Vamshavruksha &amp; Pouthi Khata Heir Declaration Draft
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
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
{`"I, [Full Name], son/daughter/wife of Late [Khatedar Name], affirm that Late [Khatedar Name] was the recorded owner in Column 9 of RTC Survey No. [Sy. No. / Hissa] in [Village, Hobli, Taluk, District], Karnataka, and passed away on [Date].

The surviving Class I legal heirs are ONLY: [List all spouse, sons, daughters, and surviving mother]. No heir has been concealed, and no civil court stay bars joint Pouthi Khata mutation under Section 128 of the Karnataka Land Revenue Act, 1964."`}
                </pre>
              </div>
            </section>

            {/* SECTION 10: OBJECTIONS & SECTION 136 APPEALS */}
            <section id="disputes-appeals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>APPEALS &amp; REMEDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Handling Objections &amp; Section 136 Appeals
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  If a sibling files a false objection or an officer deletes your name from the
                  Pahani without notice, Karnataka law gives you a clear three-tier remedy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 1: Tahsildar Court
                    </div>
                    <div className="font-bold text-slate-900">Disputed Case Inquiry (Sec. 129)</div>
                    <p className="text-slate-600 leading-relaxed">
                      If an objection hits during the 30-day Form 21 period, the Tahsildar hears
                      both sides in a summary inquiry and passes a written mutation order.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 2: Assistant Commissioner
                    </div>
                    <div className="font-bold text-slate-900">First Appeal (Sec. 136(2))</div>
                    <p className="text-slate-600 leading-relaxed">
                      File an appeal before the Assistant Commissioner within 60 days of the
                      Tahsildar or RI order. Show proof of missing notice or excluded legal heirs.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Tier 3: DC Revision / Civil Suit
                    </div>
                    <div className="font-bold text-slate-900">Sec. 136(3) &amp; Sec. 135 Suit</div>
                    <p className="text-slate-600 leading-relaxed">
                      Challenge an AC order before the Deputy Commissioner under Section 136(3). For
                      ownership or contested Will fights, file a Civil Court suit under Section 135.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL SCENARIOS */}
            <section id="practical-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL KARNATAKA CASES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Cases: Mysuru, Mandya &amp; Bengaluru
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mysuru Farm Land</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Brothers Exclude Married Sister from Vamshavruksha
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Two sons in Mysuru got Pouthi Khata without listing
                    their married sister in the Family Tree. She found out from Bhoomi online.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> She filed a Section 136(2) appeal before the Assistant
                    Commissioner with her birth proof. The AC cancelled the MR entry and ordered a
                    fresh joint Pouthi Khata with her name added.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mandya Disputed Will</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Younger Son Applies for Khata Using Unregistered Will
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> One son filed an unregistered Will at the Taluk office.
                    His siblings filed written objections during the 30-day Form 21 notice.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> Citing <em>C.N. Nagendra Singh</em> (2002), the
                    Tahsildar refused to decide Will validity and told the son to get a Civil Court
                    decree first.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Bengaluru Rural Plot</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Joint Pouthi Khata Followed by Registered Partition
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Three heirs inherited 4 acres near Devanahalli and
                    wanted separate plots to sell later.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> They finished joint Pouthi Khata first in 38 days
                    without Phodi. Then they obtained an 11E Sketch and registered a Partition Deed
                    on Kaveri 2.0 for separate Hissa numbers.
                  </p>
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
                12. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property Succession &amp; Revenue Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  advocates help Karnataka families draft clear Wills, complete Pouthi Khata and
                  BBMP e-Khata transfers, register Partition and Release Deeds, and fight Section
                  136 revenue appeals.
                </p>

                {/* Related Service & Tool Grid Chips (All Verified 200 OK Routes) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Mutation Legal Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-kannada-uyilu"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Kannada Will Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/locations/karnataka"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Karnataka Will Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/locations/bengaluru"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Bengaluru Will Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Pouthi Khata
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378]"
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Portals &amp; Legal Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All rules on this page come from the Karnataka Land Revenue Act, 1964, Karnataka
                  Land Revenue Rules, 1966, and binding court rulings. Always check current fees on
                  official portals before paying:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://landrecords.karnataka.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Bhoomi Portal (Karnataka RTC)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://nadakacheri.karnataka.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Nadakacheri Portal (Vamshavruksha)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Statutory Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Services &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/karnataka-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Karnataka Gift &amp; Release Stamp Duty Tool
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir vs Succession Certificate Tool
                    </Link>
                    <Link
                      href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Pedigree Affidavit Format
                    </Link>
                    <Link
                      href="/templates/partition-deed-format-between-family-members"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Partition Deed Format
                    </Link>
                    <Link
                      href="/templates/no-objection-certificate-noc-legal-heirs-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir NOC Format
                    </Link>
                    <Link
                      href="/services/legal-heir"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Certificate Service
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH TRUST CARDS (Matching Reference Layout & Readability) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Update Pahani Early?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Updating your family Pahani keeps land safe from fraud and disputes. Heirs get
                  clear records for bank loans, crop aid, and future sale deeds without last-minute
                  delays.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A registered Will in plain words stops family fights after you are gone. You
                  choose who gets each farm plot, city flat, and bank balance with full peace of
                  mind.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">General Legal Info Note</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This checker gives general Karnataka revenue guidance and is not personal legal
                  advice. Land grant rules and civil title claims depend on your exact deeds and
                  RTC entries.
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
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises families across India on succession planning, land revenue mutations,
                family partition deeds, and clear Will drafting.
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
                  <span>PREVENT MUTATION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Karnataka Land with a Clear Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  List exact Survey Numbers, Hissa shares, and heirs clearly so your family avoids
                  contested Pouthi Khata battles.
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
                  <span>Lawyer Reviewed &amp; Ready to Register</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>KARNATAKA MUTATION &amp; APPEAL DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Stuck in a Disputed Pouthi Khata or AC Appeal?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our property advocates help with Section 129 objections, Section 136(2) appeals,
                  Partition Deeds, and Civil Court decrees.
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
                  Why Karnataka Families Trust Us
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Statute-Backed Checks:</strong> Built on KLRA Sections 128, 129, 135,
                      and 136 plus Rules 63 to 66.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>High Court Precedents:</strong> Flags contested Will blocks under{" "}
                      <em>Nagendra Singh</em> and <em>Jayamma</em>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Clear Portal Routing:</strong> Separates Bhoomi RTC, e-Swathu, and
                      BBMP e-Aasthi cleanly.
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
          <FileCheck className="w-3.5 h-3.5" />
          <span>Khata Checker</span>
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
