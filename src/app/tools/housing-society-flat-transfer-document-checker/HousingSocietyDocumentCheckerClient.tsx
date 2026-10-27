"use client";

import React, { useState } from "react";
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
  Building,
  Gavel,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  Home,
  AlertCircle,
  FileWarning,
  BadgeAlert,
  ArrowUpRight,
  HandCoins,
  Newspaper,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Rules: MCS Act 1960" },
  { id: "interactive-checker", label: "2. Interactive Document Checker" },
  { id: "section-154b-13-hierarchy", label: "3. Section 154B-13 Legal Hierarchy" },
  { id: "supreme-court-precedents", label: "4. Supreme Court: Indrani Wahi Precedent" },
  { id: "model-bye-law-forms", label: "5. Appendix Forms: 14, 15, 17 & 19" },
  { id: "transfer-fee-ceiling", label: "6. Society Fee Cap: The 25,000 Rupee Rule" },
  { id: "newspaper-notice-protocol", label: "7. Newspaper Public Notice: 15-Day Rule" },
  { id: "state-comparison-table", label: "8. State Comparison: MH, DL & KA" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP for Heirs" },
  { id: "practical-case-scenarios", label: "10. Real Case Scenarios: Mumbai & Pune" },
  { id: "legal-templates-box", label: "11. Appendix 17 & 19 Copyable Formats" },
  { id: "institutional-profile", label: "12. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Does a registered nominee become the absolute owner of the society flat?",
    a: "No. Under the Supreme Court landmark ruling in Indrani Wahi v. Registrar of Co-operative Societies (2016) and Sarbati Devi (1984), a nominee is only an agent or trustee for the rightful legal heirs. Under Section 154B-13 of the Maharashtra Co-operative Societies Act, the nominee is admitted only as a Provisional Member until the succession rights are decided among lawful heirs.",
  },
  {
    q: "Can the Society Managing Committee demand a Probate before transferring the flat?",
    a: "No, a society cannot insist on Probate if all legal heirs are united and execute an Indemnity Bond (Appendix 17) and Consent Affidavits (Appendix 19) along with a 15-day newspaper public notice (Appendix 16). Under Maharashtra Model Bye-Laws 35 and 36, and the Bombay High Court ruling in Ramdas Shivram Sattur, probate is mandatory only if rival family claimants file formal disputes in court.",
  },
  {
    q: "What is the maximum transfer fee a housing society can charge upon death?",
    a: "Under the Maharashtra Government Notification under Section 79A of the MCS Act, the maximum transfer fee of Rs. 25,000 applies strictly to regular open-market sales. For transmission upon death to legal heirs or nominees, the transfer fee is strictly Rs. 0. The society can only collect a nominal Entrance Fee of Rs. 100 and a share transfer fee of Rs. 500.",
  },
  {
    q: "What happens if the housing society fails to respond within 90 days?",
    a: "Under Section 154B-13(3) and Section 22(2) of the Maharashtra Co-operative Societies Act, the Managing Committee must decide on the membership transmission application within 90 days. If the society fails to communicate any decision within 90 days, the applicant is deemed to have been admitted as a member, and an immediate appeal lies to the Deputy Registrar under Section 23.",
  },
  {
    q: "What are the essential Appendix Forms required under Maharashtra Model Bye-Laws?",
    a: "The primary forms are: Appendix 14 (membership application by nominee), Appendix 15 (membership application by legal heirs when no nomination exists), Appendix 16 (15-day newspaper notice inviting objections), Appendix 17 (registered indemnity bond to protect society), and Appendix 19 (consent and no-objection deed from other legal heirs).",
  },
  {
    q: "What is the difference between an Associate Member and a Nominee?",
    a: "An Associate Member holds joint ownership of shares on the share certificate during the lifetime of the member under Section 154B-1(18)(b). A Nominee is merely named in the society register to receive shares in trust upon death. An associate member who is also a co-owner in the registered sale deed has direct survivorship claims.",
  },
  {
    q: "Is public notice in two newspapers compulsory for flat transmission?",
    a: "Yes. When transferring flat shares without a court probate or succession certificate, Bye-Laws 35 and 36 require the society to publish a 15-day public notice in two local newspapers (one in English and one in the vernacular language, such as Marathi or Hindi) inviting objections at the applicant's expense.",
  },
  {
    q: "Can legal heirs sell the flat before transferring the society share certificate?",
    a: "No. Prospective buyers and home loan banks require a clear chain of title. The share certificate must first be formally endorsed with the names of the legal heirs, and municipal property tax records must be mutated before executing a registered sale deed.",
  },
];

export default function HousingSocietyDocumentCheckerClient() {
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
  const [copiedBond, setCopiedBond] = useState<boolean>(false);
  const [copiedNoc, setCopiedNoc] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Diagnostic Checker Form State
  const [jurisdiction, setJurisdiction] = useState<"maharashtra" | "delhi" | "karnataka" | "other">(
    "maharashtra"
  );
  const [applicantRole, setApplicantRole] = useState<
    "nominee" | "associate_joint" | "registered_will" | "unregistered_will" | "intestate_heir" | "sole_surviving"
  >("nominee");
  const [coHeirStatus, setCoHeirStatus] = useState<"amicable" | "minors_involved" | "contested">(
    "amicable"
  );
  const [shareCertificateStatus, setShareCertificateStatus] = useState<"available" | "lost">(
    "available"
  );
  const [saleDeedStatus, setSaleDeedStatus] = useState<"registered" | "old_unregistered">(
    "registered"
  );

  const handleResetChecker = () => {
    setJurisdiction("maharashtra");
    setApplicantRole("nominee");
    setCoHeirStatus("amicable");
    setShareCertificateStatus("available");
    setSaleDeedStatus("registered");
  };

  // Diagnostic Calculation Logic
  const getDiagnosticResults = () => {
    let membershipType = "Provisional Member";
    let formsList: { name: string; desc: string; mandatory: boolean }[] = [];
    let probateRequirement = "Not Required (Conditionally Excluded)";
    let probateRiskLevel = "Low";
    let feeCap = "Rs. 100 Entrance Fee + Rs. 500 Transfer Fee (Rs. 0 Premium)";
    let noticeRequired = true;
    let managingCommitteeDays = 90;
    let summaryText = "";

    // Jurisdiction specific statutory reference
    const statuteRef =
      jurisdiction === "maharashtra"
        ? "Maharashtra Co-operative Societies Act, 1960 (s. 154B-13 & Model Bye-Laws 34-39)"
        : jurisdiction === "delhi"
        ? "Delhi Co-operative Societies Act, 2003 (s. 76-78 & DCS Rules 2007 r. 28)"
        : jurisdiction === "karnataka"
        ? "Karnataka Co-operative Societies Act, 1959 (s. 24 & KAOA Rules)"
        : "State Cooperative Societies Act & General Succession Principles";

    if (applicantRole === "associate_joint") {
      membershipType = "Primary Member (Direct Survivorship Conversion)";
      probateRequirement = "Strictly Not Required";
      probateRiskLevel = "None";
      noticeRequired = false;
      summaryText =
        "As an existing Associate Member named jointly on the Share Certificate, you have immediate rights to assume primary membership upon submitting the Death Certificate and Form 10A / Appendix 5.";
      formsList = [
        {
          name: "Original Share Certificate",
          desc: "To be submitted for endorsement of primary membership status.",
          mandatory: true,
        },
        {
          name: "Certified Death Certificate",
          desc: "Issued by the Municipal Corporation / local registrar of births & deaths.",
          mandatory: true,
        },
        {
          name: "Form 10A / Appendix 5 Application",
          desc: "Formal request to update society membership register from associate to primary.",
          mandatory: true,
        },
        {
          name: "Indemnity Bond (Appendix 17)",
          desc: "Standard indemnity safeguarding the managing committee against external claims.",
          mandatory: false,
        },
      ];
    } else if (applicantRole === "registered_will") {
      membershipType = "Full Regular Member";
      if (coHeirStatus === "contested") {
        probateRequirement =
          jurisdiction === "maharashtra"
            ? "Mandatory Probate Required Due to Active Dispute"
            : "Civil Court Declaratory Decree Required";
        probateRiskLevel = "High";
        summaryText =
          "Because a co-heir disputes the registered Will, the society cannot adjudicate title disputes. The managing committee must hold the transfer in abeyance until an executor obtains High Court Probate or a civil court decree.";
      } else {
        probateRequirement = "Not Required (Self-declaration & Indemnity Sufficient)";
        probateRiskLevel = "Low";
        summaryText =
          "Under Section 154B-13(1)(a) of the MCS Act, a registered Will is the highest priority instrument. Since all co-heirs are amicable, the society must admit you without forcing expensive court probate.";
      }

      formsList = [
        {
          name: "Appendix 15 (Heir Membership Form)",
          desc: "Statutory application under Section 154B-13 supported by registered Will.",
          mandatory: true,
        },
        {
          name: "Certified Copy of Registered Will",
          desc: "Photocopy with registration seal from Sub-Registrar Office alongside original for verification.",
          mandatory: true,
        },
        {
          name: "Appendix 17 (Indemnity Bond)",
          desc: "Notarized indemnity on Rs. 500 non-judicial stamp paper indemnifying the society.",
          mandatory: true,
        },
        {
          name: "Appendix 19 (Consent / NOC from Co-Heirs)",
          desc: "Affidavit by other surviving family members affirming no objection to transmission.",
          mandatory: coHeirStatus === "amicable",
        },
        {
          name: "Appendix 16 (Newspaper Public Notice)",
          desc: "15-day notice in 2 newspapers (1 English, 1 Vernacular) inviting third-party objections.",
          mandatory: true,
        },
      ];
    } else if (applicantRole === "nominee") {
      membershipType = "Provisional Member (Under Section 154B-13)";
      probateRequirement = "Not Required for Provisional Membership";
      probateRiskLevel = "Low to Medium";
      summaryText =
        "Under Section 154B-13 and the Supreme Court Indrani Wahi ruling, the society MUST admit the registered nominee as a Provisional Member. However, you hold the flat as a trustee for all legal heirs and cannot sell without heir release deeds.";

      formsList = [
        {
          name: "Appendix 14 (Nominee Membership Form)",
          desc: "Application for membership by registered nominee with nomination reference number.",
          mandatory: true,
        },
        {
          name: "Certified Death Certificate",
          desc: "Original or notarized copy issued by Municipal Corporation.",
          mandatory: true,
        },
        {
          name: "Original Share Certificate",
          desc: "For endorsement of provisional membership by the secretary and chairman.",
          mandatory: true,
        },
        {
          name: "Appendix 17 (Indemnity Bond by Nominee)",
          desc: "Executed on Rs. 500 stamp paper acknowledging trustee status for legal heirs.",
          mandatory: true,
        },
        {
          name: "Appendix 18 (Statutory Undertaking)",
          desc: "Undertaking to pay society maintenance dues and observe society bye-laws.",
          mandatory: true,
        },
      ];
    } else if (applicantRole === "unregistered_will") {
      membershipType = "Provisional Member / Subject to Verification";
      probateRequirement =
        jurisdiction === "maharashtra"
          ? "Probate or Court Declaration Highly Recommended"
          : "Probate Mandatory if Contested";
      probateRiskLevel = "Medium to High";
      summaryText =
        "Unregistered Wills carry significant dispute risk. If all Class-I legal heirs sign Appendix 19 NOC and execute Appendix 17 on stamp paper, the society may admit you; otherwise, the society will demand a probate or succession certificate.";

      formsList = [
        {
          name: "Appendix 15 (Heir Membership Application)",
          desc: "Application by testamentary heir under unregistered Will.",
          mandatory: true,
        },
        {
          name: "Original Unregistered Will",
          desc: "Original document signed by testator and two attesting witnesses.",
          mandatory: true,
        },
        {
          name: "Appendix 17 (Indemnity Bond on Rs. 500 Stamp)",
          desc: "Full indemnity protecting society from future claims by other relatives.",
          mandatory: true,
        },
        {
          name: "Appendix 19 (Consent Affidavits from All Class-I Heirs)",
          desc: "Mandatory signed consent from spouse, children, and mother of deceased.",
          mandatory: true,
        },
        {
          name: "Appendix 16 (15-Day Public Notice in 2 Newspapers)",
          desc: "Compulsory public objection window in English and local language newspapers.",
          mandatory: true,
        },
      ];
    } else if (applicantRole === "intestate_heir") {
      membershipType = "Joint / Designated Co-Heir Member";
      probateRequirement = "Not Applicable (Intestate: Legal Heir Certificate / Succession Certificate)";
      probateRiskLevel = coHeirStatus === "contested" ? "High" : "Low";
      summaryText =
        "When an owner dies without a Will, all Class-I legal heirs inherit equal shares. The heirs can either hold the flat jointly or nominate one heir to be the member by executing Appendix 19 Release Deeds and Appendix 17 Indemnity.";

      formsList = [
        {
          name: "Appendix 15 (Legal Heir Membership Application)",
          desc: "Application submitted jointly or by the designated family representative.",
          mandatory: true,
        },
        {
          name: "Legal Heir Certificate / Surviving Member Certificate",
          desc: "Issued by the Tehsildar, Revenue SDM, or District Collector.",
          mandatory: true,
        },
        {
          name: "Appendix 19 (Registered Release Deed or Consent NOC)",
          desc: "Relinquishment deed or notarized NOC from siblings and mother.",
          mandatory: true,
        },
        {
          name: "Appendix 17 (Indemnity Bond on Stamp Paper)",
          desc: "Indemnity bond with two independent guarantors / solvent sureties.",
          mandatory: true,
        },
        {
          name: "Appendix 16 (15-Day Newspaper Public Notice)",
          desc: "Public advertisement inviting objections in two newspapers.",
          mandatory: true,
        },
      ];
    } else {
      // Sole surviving heir
      membershipType = "Full Regular Member";
      probateRequirement = "Not Required (Zero Competing Heirs)";
      probateRiskLevel = "None";
      summaryText =
        "As the sole surviving legal heir with no competing relatives, you are entitled to full membership under Section 154B-13(1)(b) upon presenting the Legal Heir Certificate and death certificate.";

      formsList = [
        {
          name: "Appendix 15 (Sole Heir Membership Application)",
          desc: "Standard application form for transmission of deceased member shares.",
          mandatory: true,
        },
        {
          name: "Sole Heir Certificate / Family Pedigree Affidavit",
          desc: "Affidavit affirmed before Executive Magistrate confirming no other Class-I heirs exist.",
          mandatory: true,
        },
        {
          name: "Appendix 17 (Indemnity Bond)",
          desc: "Executed on Rs. 500 stamp paper safeguarding the society.",
          mandatory: true,
        },
        {
          name: "Appendix 16 (15-Day Newspaper Public Notice)",
          desc: "Published in two newspapers to invite any unknown creditor or third-party objections.",
          mandatory: true,
        },
      ];
    }

    if (shareCertificateStatus === "lost") {
      formsList.push({
        name: "Police Lost Document FIR & Form 39 Indemnity",
        desc: "Police Non-Cognizable report (NCR/FIR) and indemnity bond on Rs. 500 stamp paper for issuance of duplicate share certificate.",
        mandatory: true,
      });
    }

    if (saleDeedStatus === "old_unregistered") {
      formsList.push({
        name: "Stamp Duty Adjudication & Regularization Petition",
        desc: "Old allotment agreements or unregistered deeds must be regularized at the Collector of Stamps before clean conveyance.",
        mandatory: true,
      });
    }

    return {
      membershipType,
      statuteRef,
      formsList,
      probateRequirement,
      probateRiskLevel,
      feeCap,
      noticeRequired,
      managingCommitteeDays,
      summaryText,
    };
  };

  const results = getDiagnosticResults();

  const copyBondToClipboard = () => {
    const text = `APPENDIX NO. 17 (MODEL BYE-LAW NO. 35)
FORM OF INDEMNITY BOND TO BE GIVEN BY NOMINEE / LEGAL HEIR FOR TRANSMISSION OF FLAT SHARES

(To be executed on Non-Judicial Stamp Paper of Rs. 500/- and duly notarized)

To,
The Honorary Secretary,
[Name of Cooperative Housing Society Ltd.],
[Registered Address of the Society],
[City, State, PIN Code]

1. I, [Full Name of Applicant/Nominee/Heir], aged [Age] years, Indian inhabitant, residing at Flat No. [Flat No.], [Building Name], [Society Name], [Address], do hereby solemnly affirm and state on oath as under:

2. AND WHEREAS the late [Full Name of Deceased Member], who was the registered member of the said Society holding Share Certificate No. [Certificate No.] for 5 fully paid-up shares bearing Distinctive Nos. [Nos] to [Nos] (both inclusive), and owner of Flat No. [Flat No.], departed this life on [Date of Demise] at [Place of Demise].

3. AND WHEREAS the said deceased member had during his/her lifetime submitted a nomination form nominating the undersigned / had executed his/her Last Will and Testament dated [Date] / died intestate leaving behind the following legal heirs:
(a) [Name of Heir 1], [Relationship], aged [Age]
(b) [Name of Heir 2], [Relationship], aged [Age]

4. AND WHEREAS I have applied to the Society in the prescribed Appendix Form [14/15] to transfer the said shares and flat interest into my name as the Nominee / Designated Legal Heir under Section 154B-13 of the Maharashtra Co-operative Societies Act, 1960.

5. NOW THIS INDEMNITY BOND WITNESSETH that in consideration of the Society transferring the said shares and interest in Flat No. [Flat No.] into my name without insisting upon a formal grant of Probate or Letters of Administration from a competent Court:

I HEREBY INDEMNIFY and keep harmless the said Society, its Managing Committee members, Office Bearers, and its successors against all actions, suits, proceedings, claims, demands, costs, damages, and expenses whatsoever which may be brought, instituted, or made against the Society by any other heir, creditor, or claimant asserting any right, title, or interest in the said flat.

IN WITNESS WHEREOF, I have hereunto set my hand this [Day] day of [Month], 20[Year].

DEPONENT / OBLIGOR:
[Signature of Applicant]
[Full Name: _______________________]

IN THE PRESENCE OF SURETIES / WITNESSES:
1. Signature: __________________ Name: ___________________ Address: ___________________
2. Signature: __________________ Name: ___________________ Address: ___________________

VERIFICATION:
Verified at [City] on this [Day] day of [Month], 20[Year] that the contents of this Indemnity Bond are true and correct to my personal knowledge.
BEFORE ME (NOTARY PUBLIC / ADVOCATE)`;

    navigator.clipboard.writeText(text);
    setCopiedBond(true);
    setTimeout(() => setCopiedBond(false), 3000);
  };

  const copyNocToClipboard = () => {
    const text = `APPENDIX NO. 19 (MODEL BYE-LAW NO. 35)
FORM OF CONSENT AFFIDAVIT / NO OBJECTION CERTIFICATE (NOC) FROM CO-HEIRS FOR FLAT TRANSMISSION

(To be executed on Non-Judicial Stamp Paper of Rs. 100/- each and attested before Notary)

To,
The Managing Committee,
[Name of Cooperative Housing Society Ltd.],
[Address of Society]

Sub: Unconditional Consent and No Objection for transmission of Flat No. [Flat No.] and Share Certificate No. [Share Cert No.] in favour of [Name of Applicant Heir].

1. We, the undersigned:
(i) [Full Name of Co-Heir 1], son/daughter of Late [Deceased Name], aged [Age] years, residing at [Address].
(ii) [Full Name of Co-Heir 2], son/daughter of Late [Deceased Name], aged [Age] years, residing at [Address].

do hereby solemnly affirm, depose, and state on oath as under:

2. That our father/mother Late [Name of Deceased] was the registered owner and member of Flat No. [Flat No.] in [Society Name], holding Share Certificate No. [Cert No.].

3. That the deceased passed away on [Date of Demise] leaving behind the following legal heirs:
(a) [Applicant Heir Name] - [Relationship]
(b) [Co-Heir 1 Name] - [Relationship]
(c) [Co-Heir 2 Name] - [Relationship]

4. We solemnly affirm that we have mutually agreed and resolved among ourselves that the shares and interest in the said flat shall be transferred exclusively to the name of our brother/sister/mother [Name of Applicant Heir].

5. We have NO OBJECTION whatsoever if the Society admits the said [Name of Applicant Heir] as a regular member and endorses his/her name upon the original Share Certificate.

6. We further declare that we shall not raise any claim, dispute, or objection against the Society or its Managing Committee for making this transfer.

DEPONENTS (CO-HEIRS):
1. [Signature]: __________________ [Name of Co-Heir 1]
2. [Signature]: __________________ [Name of Co-Heir 2]

ATTESTED & IDENTIFIED BY ADVOCATE / NOTARY PUBLIC`;

    navigator.clipboard.writeText(text);
    setCopiedNoc(true);
    setTimeout(() => setCopiedNoc(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `HOUSING SOCIETY FLAT TRANSMISSION MASTER DOCUMENT CHECKLIST:
1. Certified Death Certificate of original member (Original + 3 attested copies).
2. Original Share Certificate issued by the Society.
3. Relevant Model Bye-Law Membership Application Form:
   - Appendix 14 (if applicant is registered Nominee) OR
   - Appendix 15 (if applicant is Legal Heir without nomination).
4. Appendix 17 Indemnity Bond on Rs. 500 Non-Judicial Stamp Paper (Duly Notarized).
5. Appendix 19 Consent Affidavits / NOC from all other legal heirs on Rs. 100 Stamp Paper.
6. Appendix 18 Undertaking regarding compliance with Society Bye-Laws.
7. Copy of Registered Will / Succession Certificate / Legal Heirship Certificate from Revenue Authority.
8. Proof of 15-day Public Notice published in two newspapers (1 English + 1 Vernacular) under Appendix 16.
9. Photocopy of Registered Sale Agreement / Index-II of the flat.
10. Entrance Fee of Rs. 100/- and Share Transfer Fee of Rs. 500/- via crossed cheque / NEFT.
11. KYC documents of Applicant (PAN Card, Aadhaar Card, Passport photo).
12. Police NCR / Lost Document Certificate (Only if original Share Certificate is lost).`;

    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
            <span>MAHARASHTRA MCS ACT S. 154B-13 • MODEL BYE-LAWS 34-39</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Cooperative Housing Society Flat Transfer Document Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Find the exact <strong>Model Bye-Law Appendix forms (14 to 19)</strong>. Verify nominee rights under Supreme Court rulings. Stop unlawful society transfer fees. Check if court probate is needed.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Building2 className="w-4 h-4" />
              <span>Check Society Flat Documents</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 154B-13</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY HEIR HIERARCHY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs. 0 Premium</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DEATH TRANSMISSION FEE CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PUBLIC NOTICE WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">90-Day SLA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DEEMED MEMBERSHIP DEADLINE
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

            {/* Statutory Authority Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Sections 30, 79A, and 154B-13 of the MCS Act 1960, Model Bye-Laws 34-39, Delhi DCS Act 2003, and Supreme Court rulings in Indrani Wahi &amp; Sarbati Devi.
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
                <span>EXECUTIVE BRIEF: HOUSING SOCIETY FLAT TRANSMISSION RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee is Trustee, Not Absolute Owner:</strong> Under the landmark Supreme
                    Court ruling in <em>Indrani Wahi v. Registrar</em>, the cooperative society is bound to
                    transfer shares to the nominee, but the nominee holds title solely as a trustee for the
                    lawful legal heirs under succession law.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 154B-13 Statutory Hierarchy:</strong> In Maharashtra, Section 154B-13
                    establishes that transmission takes place first via registered Will, followed by
                    Heirship Certificate, Succession Certificate, Family Arrangement, or Nomination.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Transfer Premium on Demise:</strong> Demanding Rs. 25,000 or lakhs as
                    transfer fee or voluntary donation upon death is illegal under Section 79A. Societies
                    can only charge a nominal Rs. 100 entrance fee and Rs. 500 share transfer fee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Probate is Conditionally Avoidable:</strong> Managing committees cannot mandate
                    probate if all surviving heirs execute an Indemnity Bond (Appendix 17) and Consent NOC
                    (Appendix 19) and a 15-day newspaper public notice yields zero claims.
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
                1. Statutory Rules: Flat Transmission under MCS Act 1960
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In cities like Mumbai, Pune, Thane, and Delhi, cooperative housing societies (CHS)
                  manage most apartment buildings. When a flat owner dies, the family must transfer the
                  share certificate. In legal terms, this is called <strong>transmission</strong>. It is
                  different from a regular flat sale.
                </p>
                <p>
                  In the past, societies used old rules. This led to bitter fights between nominees and legal
                  heirs. To fix this, Maharashtra added Chapter XIII-B to the MCS Act in 2019. This chapter
                  sets clear rules for housing societies.
                </p>
                <p>
                  Under <strong>Section 154B-13</strong>, housing societies must follow a clear priority
                  order. The society must transfer the flat using a registered Will, a heir certificate, a
                  court order, a family deed, or a nomination. A nominee who gets the flat without heir
                  consent is only a <strong>Provisional Member</strong>. The nominee holds the flat in trust
                  for the true legal heirs.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DIAGNOSTIC COMPLIANCE ENGINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Housing Society Flat Transfer Document Checker
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your state, legal status, and family situation. Get an instant checklist of Appendix forms, fee limits, and probate rules.
              </p>

              {/* Checker Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Jurisdiction */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 1: Select State / City Jurisdiction</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "maharashtra", label: "Maharashtra (Mumbai / Pune / Thane)" },
                      { id: "delhi", label: "Delhi NCR (DCS Act 2003)" },
                      { id: "karnataka", label: "Karnataka (Bengaluru)" },
                      { id: "other", label: "Other States / National" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setJurisdiction(
                            item.id as "maharashtra" | "delhi" | "karnataka" | "other"
                          )
                        }
                        className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                          jurisdiction === item.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Legal Standing */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 2: Applicant Legal Standing / Document Held</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: "nominee",
                        title: "Registered Nominee",
                        desc: "Form 14 submitted by deceased member to society.",
                      },
                      {
                        id: "associate_joint",
                        title: "Associate / Joint Owner",
                        desc: "Name already entered on share certificate as joint owner.",
                      },
                      {
                        id: "registered_will",
                        title: "Legal Heir with Registered Will",
                        desc: "Named legatee in registered Last Will & Testament.",
                      },
                      {
                        id: "unregistered_will",
                        title: "Heir with Unregistered Will",
                        desc: "Testament signed by deceased with 2 witnesses, not registered.",
                      },
                      {
                        id: "intestate_heir",
                        title: "Intestate Heirs (No Will)",
                        desc: "Family surviving deceased without any Will (Class-I heirs).",
                      },
                      {
                        id: "sole_surviving",
                        title: "Sole Surviving Class-I Heir",
                        desc: "Only living legal heir with no siblings or competing relatives.",
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setApplicantRole(
                            item.id as
                              | "nominee"
                              | "associate_joint"
                              | "registered_will"
                              | "unregistered_will"
                              | "intestate_heir"
                              | "sole_surviving"
                          )
                        }
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          applicantRole === item.id
                            ? "bg-rose-50 border-[#C65378] text-slate-900 shadow-xs ring-1 ring-[#C65378]"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900 mb-1">{item.title}</div>
                        <div className="text-[11px] text-slate-600 leading-tight">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Co-Heir Alignment & Dispute Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Step 3: Family Consensus &amp; Co-Heir Status</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        {
                          id: "amicable",
                          title: "United / Amicable",
                          sub: "All legal heirs agree & ready to sign NOC/Release Deed.",
                        },
                        {
                          id: "minors_involved",
                          title: "Minor Children Involved",
                          sub: "Heirs include minor children under 18 years of age.",
                        },
                        {
                          id: "contested",
                          title: "Dispute / Untraceable Heirs",
                          sub: "Family conflict, caveats, or objecting co-heirs exist.",
                        },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setCoHeirStatus(
                              item.id as "amicable" | "minors_involved" | "contested"
                            )
                          }
                          className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                            coHeirStatus === item.id
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="font-bold">{item.title}</div>
                          <div
                            className={`text-[10px] ${
                              coHeirStatus === item.id ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            {item.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Physical Document Availability */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Step 4: Original Documents Available</span>
                    </label>
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-600 mb-1">
                          Original Society Share Certificate:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setShareCertificateStatus("available")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                              shareCertificateStatus === "available"
                                ? "bg-emerald-700 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Original in Hand
                          </button>
                          <button
                            type="button"
                            onClick={() => setShareCertificateStatus("lost")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                              shareCertificateStatus === "lost"
                                ? "bg-amber-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Lost / Misplaced
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-semibold text-slate-600 mb-1">
                          Flat Sale / Allotment Agreement:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSaleDeedStatus("registered")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                              saleDeedStatus === "registered"
                                ? "bg-emerald-700 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Registered Sale Deed
                          </button>
                          <button
                            type="button"
                            onClick={() => setSaleDeedStatus("old_unregistered")}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                              saleDeedStatus === "old_unregistered"
                                ? "bg-amber-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Old Unregistered Allotment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleResetChecker}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Checker Parameters</span>
                  </button>
                </div>

                {/* =========================================================
                    DIAGNOSTIC RESULTS DISPLAY
                    ========================================================= */}
                <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-7 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-extrabold text-[#C65378]">
                        DIAGNOSTIC COMPLIANCE RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {results.membershipType}
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-xs text-white/70">
                      <div className="font-semibold text-emerald-400">Statutory SLA: 90 Days</div>
                      <div>{results.statuteRef}</div>
                    </div>
                  </div>

                  {/* Summary Assessment Callout */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white/90 leading-relaxed">
                    {results.summaryText}
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                        <Scale className="w-3 h-3 text-[#C65378]" />
                        <span>Probate Requirement</span>
                      </div>
                      <div className="text-xs font-extrabold text-white">
                        {results.probateRequirement}
                      </div>
                      <div className="text-[10px] text-white/70">
                        Risk Level:{" "}
                        <span
                          className={`font-bold ${
                            results.probateRiskLevel === "High"
                              ? "text-rose-400"
                              : results.probateRiskLevel === "Medium to High"
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {results.probateRiskLevel}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                        <HandCoins className="w-3 h-3 text-emerald-400" />
                        <span>Statutory Transfer Fee Cap</span>
                      </div>
                      <div className="text-xs font-extrabold text-emerald-300">
                        {results.feeCap}
                      </div>
                      <div className="text-[10px] text-white/70">
                        Sec 79A Notification (Demanding premium is illegal)
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                        <Newspaper className="w-3 h-3 text-blue-400" />
                        <span>Newspaper Notice Mandate</span>
                      </div>
                      <div className="text-xs font-extrabold text-white">
                        {results.noticeRequired
                          ? "Mandatory 15-Day Public Notice"
                          : "Exempt (Direct Survivorship)"}
                      </div>
                      <div className="text-[10px] text-white/70">
                        2 Newspapers (1 English + 1 Vernacular)
                      </div>
                    </div>
                  </div>

                  {/* Required Checklist List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-rose-200 uppercase tracking-wider flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Mandatory Application Documents &amp; Appendix Forms:</span>
                    </div>
                    <div className="space-y-2">
                      {results.formsList.map((form, idx) => (
                        <div
                          key={idx}
                          className="bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-xl p-3 flex items-start gap-3"
                        >
                          <div className="mt-0.5 shrink-0">
                            {form.mandatory ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Info className="w-4 h-4 text-blue-300" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-extrabold text-white flex items-center gap-2">
                              <span>{form.name}</span>
                              {form.mandatory && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-200 font-bold uppercase">
                                  Mandatory
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-white/80 leading-snug mt-0.5">
                              {form.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deemed Membership Warning */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 154B-13(3) Deemed Membership Clause:</strong> If the Society
                      Managing Committee fails to communicate its decision within 90 days of receiving your
                      complete application, you are legally deemed admitted as a member. If the committee
                      illegally stalls or demands unauthorized donations, you can file an appeal before the
                      Deputy Registrar under Section 23 of the MCS Act.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL BANNER / OPEN GRAPH IMAGE EMBEDDING */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: CHS FLAT TRANSMISSION &amp; NOMINEE RULES</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Maharashtra MCS Act 1960
                </span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/housing-society-flat-transfer-document-checker-og.jpg"
                  alt="Cooperative Housing Society Flat Transfer Document Checker - Maharashtra MCS Act Form 14 to 19 Guide"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-xs text-slate-500 italic text-center pt-1">
                Visual guide for housing society flat transfer, Appendix forms 14 to 19, and nominee rules.
              </p>
            </div>

            {/* SECTION 3: SECTION 154B-13 LEGAL HIERARCHY */}
            <section id="section-154b-13-hierarchy" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY SUCCESSION HIERARCHY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 154B-13: Legal Hierarchy for Society Flat Transfer
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before 2019, many societies gave full ownership to nominees under Section 30. They often
                  ignored rightful legal heirs. Section 154B-13 changed this. Now every managing committee
                  must follow strict rules.
                </p>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Statutory Priority Order Under Section 154B-13:
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        1
                      </span>
                      <div>
                        <strong>Registered Will:</strong> The highest priority instrument. If the deceased
                        executed a registered Will, the society must transfer flat interest to the named
                        legatee, provided no court injunction exists.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        2
                      </span>
                      <div>
                        <strong>Heirship Certificate or Succession Certificate:</strong> Where no Will
                        exists, transmission proceeds upon production of a Legal Heir Certificate from the
                        competent revenue authority or a court Succession Certificate.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        3
                      </span>
                      <div>
                        <strong>Family Arrangement / Partition Deed:</strong> A registered family settlement
                        executed and signed by all surviving legal heirs designating the recipient member.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                        4
                      </span>
                      <div>
                        <strong>Nomination (Provisional Membership Only):</strong> Where no documents under (1)
                        to (3) are submitted, the society transfers shares to the registered nominee as a{" "}
                        <strong>Provisional Member</strong> under Section 154B-13(2). The nominee holds the flat
                        as a trustee and cannot sell or mortgage the property.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SUPREME COURT PRECEDENTS */}
            <section id="supreme-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Supreme Court Precedents: Indrani Wahi &amp; Sarbati Devi
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Managing committees frequently misunderstand the legal consequences of nomination. Two
                  pivotal Supreme Court judgments delineate the precise legal boundaries between society
                  record updates and true property ownership.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2.5 shadow-xs">
                    <div className="text-xs font-extrabold text-[#C65378] uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>Indrani Wahi v. Registrar (2016) 6 SCC 440</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court held that a society cannot reject a valid nominee. But this transfer
                      is only on paper. The nominee holds the flat in trust. The nominee must share the flat
                      with all lawful legal heirs under succession law.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2.5 shadow-xs">
                    <div className="text-xs font-extrabold text-[#C65378] uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>Sarbati Devi v. Usha Devi (1984) 1 SCC 424</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This is the key Supreme Court ruling on nominee rights. The Court held that a nomination
                      is not a Will. A nomination gives no ownership title. The nominee is only a caretaker
                      until legal heirs divide the property.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>Ramdas Shivram Sattur v. Rameshchandra (Bombay HC 2009):</span>
                  </div>
                  <p className="leading-relaxed">
                    The Bombay High Court held that a society cannot force united families into costly probate
                    court. If all legal heirs sign an indemnity bond (Appendix 17) and consent affidavits
                    (Appendix 19), the society must transfer the flat.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: MODEL BYE-LAW APPENDIX FORMS */}
            <section id="model-bye-law-forms" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STATUTORY PROCEDURAL FORMS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Model Bye-Law Appendix Forms: Form 14, 15, 17 &amp; 19
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Maharashtra, the Commissioner for Co-operation and Registrar of Co-operative Societies
                  notifies standard Model Bye-Laws. Transmission applications must strictly follow these
                  numbered statutory appendix forms:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-[#C65378] font-black text-xs">
                        Form 14
                      </span>
                      <span>Nominee Membership Application</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submitted under Bye-Law 35 by a registered nominee. Includes details of deceased member,
                      flat number, distinctive share numbers, and undertaking to hold shares in trust.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-[#C65378] font-black text-xs">
                        Form 15
                      </span>
                      <span>Legal Heir Membership Application</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Used when the deceased left no nomination. Submitted by the designated family heir along
                      with heirship certificates or testamentary documents.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-[#C65378] font-black text-xs">
                        Form 16
                      </span>
                      <span>15-Day Newspaper Public Notice</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Public notice published in two local newspapers. It gives 15 days for objections before flat transfer.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-[#C65378] font-black text-xs">
                        Form 17
                      </span>
                      <span>Statutory Indemnity Bond</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Executed on Rs. 500 stamp paper and notarized. The applicant indemnifies the society, its
                      committee members, and successors against any future adverse inheritance claims.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 sm:col-span-2">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-[#C65378] font-black text-xs">
                        Form 19
                      </span>
                      <span>Consent NOC Affidavit from Co-Heirs</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Executed on Rs. 100 stamp paper by each surviving co-heir (e.g. siblings, surviving spouse),
                      formally waiving separate membership objections in favor of the designated applicant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: TRANSFER FEE CEILING */}
            <section id="transfer-fee-ceiling" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HandCoins className="w-4 h-4" />
                <span>STATUTORY FEE REGULATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Society Transfer Fee Ceiling: The 25,000 Rupee Cap Rule
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many housing societies ask for illegal money when a member dies. They ask for Rs. 50,000 to
                  Rs. 10 Lakh. They call it a transfer fee, repair fund, or donation.
                </p>
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 text-xs text-emerald-950 space-y-2">
                  <div className="font-extrabold text-sm flex items-center gap-2 text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Ceiling Under Section 79A Government Directive:</span>
                  </div>
                  <p className="leading-relaxed">
                    The Maharashtra Government issued strict rules under Section 79A of the MCS Act:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>For Commercial / Open-Market Sale:</strong> The maximum transfer premium a
                      society can charge is strictly capped at <strong>Rs. 25,000</strong>.
                    </li>
                    <li>
                      <strong>For Transmission to Family / Legal Heirs on Death:</strong> The transfer premium
                      is strictly <strong>Rs. 0 (ZERO)</strong>. Coercing any donation or premium upon
                      transmission is a punishable violation of law.
                    </li>
                    <li>
                      <strong>Lawful Charges Payable:</strong> The applicant only pays a nominal{" "}
                      <strong>Rs. 100 Entrance Fee</strong> and a <strong>Rs. 500 Share Transfer Fee</strong>.
                    </li>
                  </ul>
                </div>
                <p>
                  If your society demands illegal fees, do not pay. You can send a legal notice. You can also
                  file a complaint with the Deputy Registrar under Section 23 of the MCS Act.
                </p>
              </div>
            </section>

            {/* SECTION 7: NEWSPAPER PUBLIC NOTICE */}
            <section id="newspaper-notice-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Newspaper className="w-4 h-4" />
                <span>PUBLIC NOTICE PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Newspaper Public Notice: 15-Day Objection Period Protocol
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When transferring a flat without court probate, the society must protect itself. Bye-Laws 35
                  and 36 require a public notice. This notice invites objections from unknown heirs or
                  creditors.
                </p>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Mandatory Steps for Publishing Appendix 16 Notice:
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>Two Newspaper Rule:</strong> The notice must be published in at least two
                      newspapers widely circulating in the district—one in English and one in the regional
                      language (such as Marathi or Hindi).
                    </li>
                    <li>
                      <strong>15-Day Objection Window:</strong> The public is granted 15 days from the date of
                      publication to lodge written claims or objections with documentary proof.
                    </li>
                    <li>
                      <strong>Notice Board Display:</strong> A copy of the notice must simultaneously be
                      displayed on the society main notice board.
                    </li>
                    <li>
                      <strong>Applicant Cost:</strong> The advertising expenditure is borne by the applicant
                      heir.
                    </li>
                    <li>
                      <strong>Absence of Claims:</strong> If no valid legal objections are filed within 15 days,
                      the society is legally mandated to proceed with flat transmission.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* SECTION 8: STATE COMPARISON TABLE */}
            <section id="state-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>MULTI-STATE COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. State Comparison: Maharashtra, Delhi &amp; Karnataka Rules
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                While cooperative principles remain similar, specific statutory sections, fee caps, and
                nominee rights vary across major Indian states:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-3.5 border-b border-slate-800">Compliance Factor</th>
                      <th className="p-3.5 border-b border-slate-800">Maharashtra (MCS Act)</th>
                      <th className="p-3.5 border-b border-slate-800">Delhi NCR (DCS Act)</th>
                      <th className="p-3.5 border-b border-slate-800">Karnataka (KCS Act)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Governing Statute</td>
                      <td className="p-3.5">MCS Act 1960, s. 154B-13</td>
                      <td className="p-3.5">DCS Act 2003, s. 76-78</td>
                      <td className="p-3.5">KCS Act 1959, s. 24</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Nominee Legal Standing</td>
                      <td className="p-3.5">
                        <span className="font-semibold text-rose-700">Provisional Member</span> (Trustee)
                      </td>
                      <td className="p-3.5">Nominee admitted subject to heir indemnity</td>
                      <td className="p-3.5">Nominee recognized as holding in trust</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Probate Requirement</td>
                      <td className="p-3.5">Avoidable via Appendix 17 &amp; 19 if united</td>
                      <td className="p-3.5">Exempt unless contested by heirs</td>
                      <td className="p-3.5">Exempt if Legal Heir Cert produced</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Statutory Transfer Fee Cap</td>
                      <td className="p-3.5">
                        <span className="font-bold text-emerald-700">Rs. 0 Premium</span> (Rs. 100 entry)
                      </td>
                      <td className="p-3.5">Capped under DCS Rules</td>
                      <td className="p-3.5">Nominal entry fee only</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Public Notice Period</td>
                      <td className="p-3.5">15 Days in 2 Newspapers</td>
                      <td className="p-3.5">30 Days under DCS Rules</td>
                      <td className="p-3.5">15-30 Days based on bye-laws</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Appellate Authority</td>
                      <td className="p-3.5">Deputy Registrar of Co-op Societies</td>
                      <td className="p-3.5">Registrar Co-operative Societies (RCS)</td>
                      <td className="p-3.5">Joint Registrar of Co-op Societies</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mid-Article Contextual Tool Link */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span className="text-slate-700">
                    Need to verify if your family situation requires court probate? Use our free diagnostic
                    tool.
                  </span>
                </div>
                <Link
                  href="/tools/probate-checker"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold shrink-0 shadow-xs transition-colors"
                >
                  <span>Probate Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL EXECUTION ROADMAP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Flat Transmission Protocol for Heirs
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To secure an orderly transfer without litigation or bureaucratic rejection, follow this
                  standard 7-step operating procedure:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      step: "1",
                      title: "Procure Municipal Death Certificate",
                      text: "Obtain at least 5 certified copies from the local municipal birth and death registrar.",
                    },
                    {
                      step: "2",
                      title: "Locate Original Share Certificate & Registered Deed",
                      text: "Verify that the distinctive share numbers match the flat registered conveyance deed and society records.",
                    },
                    {
                      step: "3",
                      title: "Execute Appendix 17 Indemnity & Appendix 19 NOC",
                      text: "Purchase Rs. 500 stamp paper for Indemnity Bond and Rs. 100 stamp papers for each co-heir NOC affidavit; attest before a Notary Public.",
                    },
                    {
                      step: "4",
                      title: "Submit Prescribed Application (Appendix 14 or 15)",
                      text: "Fill out Appendix 14 (if nominee) or Appendix 15 (if legal heir) and deliver with an acknowledgment copy to the Society Secretary.",
                    },
                    {
                      step: "5",
                      title: "Publish 15-Day Newspaper Public Notice (Appendix 16)",
                      text: "Coordinate with the society to place the public notice in an English and a Marathi/local newspaper; preserve newspaper tearsheets.",
                    },
                    {
                      step: "6",
                      title: "Managing Committee Resolution (within 90 Days)",
                      text: "The committee approves membership in its monthly meeting and records the transmission in the J and I Membership Registers.",
                    },
                    {
                      step: "7",
                      title: "Endorsement on Original Share Certificate",
                      text: "The Chairman and Secretary endorse the applicant name on the reverse of the original share certificate with the society official seal.",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3"
                    >
                      <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">{s.title}</div>
                        <div className="text-xs text-slate-600 leading-relaxed mt-0.5">{s.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE SCENARIOS */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Home className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Scenarios: Mumbai, Pune &amp; Delhi Societies
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-xs">
                      Case 1
                    </span>
                    <span>Mumbai Suburbs: Nominee vs Two Non-Resident Sibling Heirs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Father nominated his elder daughter in society records. Upon his
                    death, his two sons residing in the United States claimed their 1/3rd inheritance share
                    under the Hindu Succession Act. The society refused to transfer without a probate.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Resolution:</strong> Under Section 154B-13, the daughter was admitted as a{" "}
                    <strong>Provisional Member</strong> using Appendix 14 and Appendix 17. Later, the
                    siblings executed a registered Family Settlement Deed in the US (authenticated by the
                    Indian Consulate), enabling permanent title transfer without expensive probate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                      Case 2
                    </span>
                    <span>Pune Society: Managing Committee Demanding Rs. 1.5 Lakh Transfer Fee</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A cooperative society in Kothrud, Pune, passed a general body
                    resolution mandating a Rs. 1,50,000 "building enhancement fund" before transferring a flat
                    to a deceased owner widow.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Resolution:</strong> The widow issued a statutory legal notice citing Section 79A
                    and the August 2001 Government Notification. The Deputy Registrar directed the society
                    to effect transmission upon payment of only Rs. 100 entrance fee and Rs. 500 share transfer
                    fee, warning the managing committee of supersession.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL TEMPLATES & CHECKLIST BOX */}
            <section id="legal-templates-box" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>COPY-PASTEABLE STATUTORY FORMATS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Appendix 17 Indemnity Bond &amp; Heir NOC Affidavit Formats
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these legal formats for your indemnity bond and co-heir NOC affidavits. Click copy to paste the text onto stamp paper.
              </p>

              {/* Template Tabs & Copy Boxes */}
              <div className="space-y-4">
                {/* Box 1: Appendix 17 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Appendix 17: Statutory Indemnity Bond (Rs. 500 Stamp Paper)</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyBondToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      {copiedBond ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Bond!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Format</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-600 bg-slate-50 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-56">
                    {`APPENDIX NO. 17 (MODEL BYE-LAW NO. 35)
FORM OF INDEMNITY BOND TO BE GIVEN BY NOMINEE / LEGAL HEIR FOR TRANSMISSION OF FLAT SHARES
(To be executed on Non-Judicial Stamp Paper of Rs. 500/- and duly notarized)

To, The Honorary Secretary, [Name of Cooperative Housing Society Ltd.]
I, [Full Name of Applicant], residing at Flat No. [Flat No.], [Society Name]...
[Click 'Copy Format' button above to copy the complete verified legal text]`}
                  </pre>
                </div>

                {/* Box 2: Appendix 19 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Appendix 19: Co-Heir Consent NOC Affidavit (Rs. 100 Stamp Paper)</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyNocToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      {copiedNoc ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied NOC!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Format</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-600 bg-slate-50 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-56">
                    {`APPENDIX NO. 19 (MODEL BYE-LAW NO. 35)
FORM OF CONSENT AFFIDAVIT / NO OBJECTION CERTIFICATE FROM CO-HEIRS
(To be executed on Non-Judicial Stamp Paper of Rs. 100/- each and attested before Notary)

To, The Managing Committee, [Name of Cooperative Housing Society Ltd.]
We, the undersigned co-heirs of Late [Name of Deceased]...
[Click 'Copy Format' button above to copy the complete verified legal text]`}
                  </pre>
                </div>

                {/* Box 3: Master Checklist */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-blue-600" />
                      <span>Master 12-Point Submission Document Checklist</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyChecklistToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      {copiedChecklist ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Checklist!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Checklist</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600">
                    Complete 12-item checklist covering Death Certificate, Share Certificate, Appendix forms,
                    newspaper tear-sheets, and statutory fee payments.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL ADVOCATE PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL REVIEW &amp; AUTHORSHIP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Legal Backing &amp; Advocate Profile
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Advocate Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession &amp; Real Estate Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-600">
                      Bar Council of Maharashtra &amp; Goa • Supreme Court Bar Association
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Specializing in complex cooperative housing society litigation, Maharashtra MCS Act Section
                  154B-13 transmission petitions, High Court testamentary probate proceedings, and protection
                  of legal heirs against coercive society transfer premiums.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                  <span>Reviewed: October 2026</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Statutory &amp; Model Bye-Law Compliant</span>
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>COMMON CLARIFICATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Housing Society Flat Transfer
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
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

            {/* SECTION 14: CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; REFERENCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Cooperative Portals
              </h2>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  Official statutory portals and government repositories for verifying cooperative housing
                  society bye-laws and filing grievance appeals:
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href="https://sahakarayukta.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Maharashtra Co-operation Department</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://rcs.delhigovt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Delhi Registrar of Co-operative Societies</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://main.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India (Indrani Wahi Judgment)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Diagnostic Calculators &amp; Checkers
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral Property Classifier
                    </Link>
                    <Link
                      href="/tools/bank-deceased-claim-document-checklist-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Checklist
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Tax Calculator
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
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
                Specialist in Maharashtra Co-operative Societies Act, Section 154B-13 flat transmission,
                Model Bye-Laws Appendix compliance, and High Court probate defense.
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
                  <span>PREVENT FUTURE SOCIETY FLAT DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family from Society Transmission Hurdles
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A registered Will with explicit society flat bequests eliminates ambiguity between nominees
                  and legal heirs, safeguarding your children from probate expenses.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SOCIETY DISPUTE &amp; TRANSMISSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Managing Committee Harassment or Illegal Fee Demands?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our real estate litigators handle Section 23 appeals before the Deputy Registrar, challenge
                  unlawful donation demands, and draft comprehensive transmission indemnities.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
