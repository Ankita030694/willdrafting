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
  Building,
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
  FileText,
  Copy,
  CheckCheck,
  TrendingUp,
  Layers,
  Globe,
  Coins,
  Share2,
  AlertCircle,
  Briefcase,
  Download,
} from "lucide-react";

interface DocumentRequirement {
  id: string;
  name: string;
  code?: string;
  mandatory: boolean;
  description: string;
  authority: string;
}

const STATE_STAMP_RATES: Record<string, { stampDuty: number; description: string }> = {
  maharashtra: { stampDuty: 500, description: "₹500 Non-Judicial Stamp Paper (Article 34)" },
  delhi: { stampDuty: 100, description: "₹100 e-Stamp Paper + Notarization" },
  karnataka: { stampDuty: 200, description: "₹200 e-Stamp Paper (Article 29)" },
  tamilnadu: { stampDuty: 100, description: "₹100 Non-Judicial Stamp Paper" },
  westbengal: { stampDuty: 100, description: "₹100 Stamp Paper + Notary Attestation" },
  gujarat: { stampDuty: 300, description: "₹300 e-Stamp Paper (Article 33)" },
  uttarpradesh: { stampDuty: 100, description: "₹100 Stamp Paper + Notary Affidavit" },
  other: { stampDuty: 100, description: "₹100 or State Prescribed Stamp Paper" },
};

const TOC_ITEMS = [
  { id: "regulatory-framework", label: "1. SEBI & AMFI Regulatory Rules" },
  { id: "interactive-document-finder", label: "2. Interactive Document Finder" },
  { id: "sebi-transmission-limits", label: "3. ₹5 Lakh vs ₹15 Lakh Thresholds" },
  { id: "supreme-court-nominee-ruling", label: "4. Supreme Court Shakti Yezdani Ruling" },
  { id: "depository-transmission-guide", label: "5. CDSL & NSDL Form ISR-5 Guide" },
  { id: "mutual-fund-transmission-guide", label: "6. CAMS & KFintech Form T2 & T3" },
  { id: "physical-shares-transmission", label: "7. Physical Shares Form ISR-4 SOP" },
  { id: "regulatory-comparison-table", label: "8. Transmission Route Comparison" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP Protocol" },
  { id: "practical-case-studies", label: "10. Real Case Studies: CDSL & CAMS" },
  { id: "legal-recital-templates", label: "11. Copy-Paste Indemnity Clauses" },
  { id: "institutional-profile", label: "12. Legal Profile & Trust Signals" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "official-statutory-citations", label: "14. Official Portals & Citations" },
];

const FAQS = [
  {
    q: "What is the revised SEBI threshold for demat share transmission without court documents?",
    a: "Under the SEBI Master Circular on Simplification of Transmission Procedures, the threshold limit for securities held in dematerialized mode (CDSL or NSDL) without requiring a Succession Certificate or Probate is ₹15,00,000 (Rupees Fifteen Lakh) per depository participant account as of the application date. For physical shares, the simplified limit is ₹5,00,000 per listed company.",
  },
  {
    q: "Does a registered nominee become the absolute owner of demat shares after the holder dies?",
    a: "No. The Supreme Court of India in Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023) held that a nominee is only a fiduciary custodian or trustee of the securities. Depository participants (CDSL/NSDL) and RTAs legally discharge their liability by transferring shares to the nominee. However, beneficial ownership vests in legal heirs under the deceased person's Will or personal succession laws.",
  },
  {
    q: "What is Form ISR-5 and when is it required?",
    a: "Form ISR-5 is SEBI's standardized Request for Transmission of Securities by Nominee or Legal Heir. It is mandatory for transferring demat and physical shares from a deceased investor's account. It captures deceased investor details, claimant details, depository account information, and is submitted with annexures including Indemnity Bond (Annexure B) and NOC (Annexure C).",
  },
  {
    q: "How are mutual fund units transmitted when a nominee is registered?",
    a: "When a registered nominee claims mutual fund folios through RTAs like CAMS or KFintech, they must submit AMFI Form T2 (Transmission Request Form for Nominee). They need to attach an attested copy of the death certificate, KYC verification, and bank details verification (such as a cancelled cheque with pre-printed name or Form T3 Annexure I bank attestation).",
  },
  {
    q: "What documents are required to claim mutual funds if there is no nominee?",
    a: "If there is no nominee and total folio value is up to ₹5,00,000, heirs use AMFI Form T3 along with a Legal Heirship Certificate or Surviving Member Certificate, Indemnity Bond (Annexure II), Affidavits from all heirs (Annexure III), and NOC from relinquishing heirs (Annexure IV). If folio value exceeds ₹5,00,000, a court-issued Succession Certificate or Probated Will is required.",
  },
  {
    q: "What happens to joint demat accounts when one holder passes away?",
    a: "In a joint demat account with survivorship ('Either or Survivor' or joint holding), shares do not go through succession. The surviving holder submits a name deletion request along with the original or attested death certificate and Client Master List (CML). The deceased holder's name is removed and the account is converted to the surviving holder.",
  },
  {
    q: "Can physical share certificates still be transmitted into physical format?",
    a: "No. SEBI LODR Regulation 40 mandates that RTAs cannot issue physical share certificates upon transmission. Instead, the RTA processes transmission and issues a Letter of Confirmation (Form ISR-4). The legal heir must submit this Letter of Confirmation to their Depository Participant within 120 days to credit the shares in demat format.",
  },
  {
    q: "When is a Succession Certificate mandatory for shares and mutual funds?",
    a: "A Succession Certificate issued under Section 372 of the Indian Succession Act, 1925 is mandatory when the deceased investor held securities as a sole holder without a valid nominee, and the portfolio value exceeds ₹15 Lakhs for demat shares or ₹5 Lakhs for physical shares and mutual funds, or when legal heirs have conflicting claims.",
  },
];

export default function DematTransmissionFinderClient() {
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

  const [activeId, setActiveId] = useState<string>("regulatory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedNoc, setCopiedNoc] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Diagnostic Finder State
  const [holdingMode, setHoldingMode] = useState<"demat" | "mutual_fund" | "physical">("demat");
  const [ownershipStatus, setOwnershipStatus] = useState<"joint_survivor" | "sole_nominee" | "sole_no_nominee">("sole_no_nominee");
  const [portfolioValue, setPortfolioValue] = useState<number>(850000);
  const [depository, setDepository] = useState<string>("cdsl");
  const [numberOfHeirs, setNumberOfHeirs] = useState<number>(2);
  const [selectedState, setSelectedState] = useState<string>("maharashtra");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Active section spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(TOC_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute Regulatory Logic
  const isJoint = ownershipStatus === "joint_survivor";
  const hasNominee = ownershipStatus === "sole_nominee";
  const noNominee = ownershipStatus === "sole_no_nominee";

  // Thresholds: Demat = 15 Lakh, Physical = 5 Lakh, Mutual Funds = 5 Lakh
  const simplifiedThreshold = holdingMode === "demat" ? 1500000 : 500000;
  const isSimplifiedEligible = noNominee ? portfolioValue <= simplifiedThreshold : true;
  const isCourtOrderMandatory = noNominee && portfolioValue > simplifiedThreshold;

  // Determine Form Codes
  let primaryFormCode = "Form ISR-5";
  let primaryFormName = "SEBI Form ISR-5 (Request for Transmission of Securities)";
  let routeBadge = "Simplified SEBI Transmission";

  if (isJoint) {
    routeBadge = "Joint Account Deletion Route";
    primaryFormCode = holdingMode === "mutual_fund" ? "AMFI Deletion Request" : "Annexure JA / Form ISR-5";
    primaryFormName = holdingMode === "mutual_fund" ? "AMFI Request for Deletion of Deceased Joint Holder" : "Depository Request for Deletion of Deceased Joint Holder Name";
  } else if (hasNominee) {
    routeBadge = "Nominee Transmission Route";
    primaryFormCode = holdingMode === "mutual_fund" ? "AMFI Form T2" : "SEBI Form ISR-5 (Nominee)";
    primaryFormName = holdingMode === "mutual_fund" ? "AMFI Form T2 (Transmission Request by Nominee)" : "SEBI Form ISR-5 (Transmission Request by Registered Nominee)";
  } else if (isSimplifiedEligible) {
    routeBadge = "Simplified Heir Route (No Court Order)";
    primaryFormCode = holdingMode === "mutual_fund" ? "AMFI Form T3" : "SEBI Form ISR-5 (Legal Heir)";
    primaryFormName = holdingMode === "mutual_fund" ? "AMFI Form T3 (Transmission without Nominee up to ₹5 Lakh)" : "SEBI Form ISR-5 with Annexure B Indemnity & Annexure C NOC";
  } else {
    routeBadge = "Mandatory Succession Certificate Route";
    primaryFormCode = holdingMode === "mutual_fund" ? "AMFI Form T3 + Court Order" : "SEBI Form ISR-5 + Court Order";
    primaryFormName = "Court Succession Certificate / Probated Will + Form ISR-5 / Form T3";
  }

  // Document Checklist Builder
  const requiredDocuments: DocumentRequirement[] = [];

  // 1. Death Certificate (Always mandatory)
  requiredDocuments.push({
    id: "death_cert",
    name: "Death Certificate of Deceased Investor",
    mandatory: true,
    description: "Original or notarized / gazetted copy of municipal Death Certificate reflecting registration number and QR code.",
    authority: "Local Municipal Corporation / Registrar of Births and Deaths",
  });

  // 2. Identification Documents
  requiredDocuments.push({
    id: "kyc_docs",
    name: "Self-Attested PAN Card & Aadhaar of Claimant(s)",
    mandatory: true,
    description: "Clear self-attested copies of PAN Card and Aadhaar of the claimant(s). Names must strictly match the demat account.",
    authority: "UIDAI / Income Tax Department",
  });

  // 3. Client Master List (CMR / CML)
  if (holdingMode === "demat" || holdingMode === "physical") {
    requiredDocuments.push({
      id: "cmr_report",
      name: "Client Master Report (CMR / CML) of Claimant Demat Account",
      mandatory: true,
      description: "Original Client Master List of the claimant's demat account, printed on Depository Participant letterhead with official seal and authorized signature.",
      authority: "Claimant's Depository Participant (Zerodha, Groww, ICICI Direct, HDFC Sec, etc.)",
    });
  }

  // 4. Bank Account Verification
  requiredDocuments.push({
    id: "bank_verification",
    name: "Bank Account Proof / Cancelled Cheque Leaf",
    mandatory: true,
    description: "Original cancelled cheque leaf with claimant's name pre-printed, or bank attestation letter with authorized signature.",
    authority: "Claimant's Scheduled Commercial Bank",
  });

  // 5. Holding-specific or Route-specific forms
  if (isJoint) {
    requiredDocuments.push({
      id: "joint_form",
      name: `${primaryFormCode}: Deletion of Deceased Name`,
      mandatory: true,
      description: "Signed request form for deletion of deceased holder's name and retention/transfer of securities to surviving holder(s).",
      authority: "Depository Participant (CDSL/NSDL) or RTA (CAMS/KFintech)",
    });
  } else if (hasNominee) {
    requiredDocuments.push({
      id: "nominee_form",
      name: `${primaryFormCode}: Transmission Form by Nominee`,
      mandatory: true,
      description: "Duly signed transmission request form executed by the registered nominee.",
      authority: "Depository Participant / RTA",
    });
  } else if (isSimplifiedEligible) {
    // Simplified legal heir route
    requiredDocuments.push({
      id: "legal_heir_proof",
      name: "Legal Heirship / Surviving Member Certificate",
      code: "Revenue Proof",
      mandatory: true,
      description: "Legal Heir Certificate or Surviving Member Certificate issued by the Tahsildar, Sub-Divisional Magistrate (SDM), or e-District Portal.",
      authority: "Competent Revenue Authority / District Magistrate",
    });
    requiredDocuments.push({
      id: "form_isr5",
      name: `${primaryFormCode}: Transmission Request Form`,
      code: primaryFormCode,
      mandatory: true,
      description: "Standardized transmission request form signed by the claiming legal heir.",
      authority: "SEBI / AMFI",
    });
    requiredDocuments.push({
      id: "indemnity_bond",
      name: "Indemnity Bond on Non-Judicial Stamp Paper",
      code: holdingMode === "mutual_fund" ? "AMFI Annexure II" : "Form ISR-5 Annexure B",
      mandatory: true,
      description: `Executed on ${STATE_STAMP_RATES[selectedState]?.description || "appropriate state stamp paper"} indemnifying against adverse claims.`,
      authority: "State Stamp Office / Notary Public",
    });
    if (numberOfHeirs > 1) {
      requiredDocuments.push({
        id: "noc_affidavit",
        name: `No-Objection Certificate (NOC) from ${numberOfHeirs - 1} Non-Claiming Legal Heir(s)`,
        code: holdingMode === "mutual_fund" ? "AMFI Annexure IV" : "Form ISR-5 Annexure C",
        mandatory: true,
        description: `Individual notarized NOC affidavits signed by remaining ${numberOfHeirs - 1} legal heir(s) relinquishing title in favor of claimant.`,
        authority: "Notary Public / Oath Commissioner",
      });
      requiredDocuments.push({
        id: "individual_affidavits",
        name: "Individual Affidavits from All Surviving Legal Heirs",
        code: holdingMode === "mutual_fund" ? "AMFI Annexure III" : "Form ISR-5 Annexure D",
        mandatory: true,
        description: "Affidavit verifying the full family tree and confirming no other legal heirs exist.",
        authority: "Notary Public",
      });
    }
  } else {
    // Court Order Mandatory Route (> 15L demat or > 5L MF/physical)
    requiredDocuments.push({
      id: "succession_cert",
      name: "Court Succession Certificate / Probated Will",
      code: "Section 372 Indian Succession Act",
      mandatory: true,
      description: "Certified true copy of Succession Certificate issued by District Court / High Court with schedule listing the specific DP account, folios, or ISINs.",
      authority: "Competent Civil Court / High Court having Jurisdiction",
    });
    requiredDocuments.push({
      id: "court_transmission_form",
      name: `${primaryFormCode}: Transmission Form with Court Decree`,
      code: primaryFormCode,
      mandatory: true,
      description: "Transmission form submitted by the court-certified legal representative or administrator.",
      authority: "Depository Participant / RTA",
    });
  }

  // Physical shares additional requirement: Form ISR-4
  if (holdingMode === "physical") {
    requiredDocuments.push({
      id: "original_share_certs",
      name: "Original Physical Share Certificates",
      mandatory: true,
      description: "Original paper share certificates surrendered to the RTA for cancellation and dematerialization.",
      authority: "Issuing Listed Company",
    });
    requiredDocuments.push({
      id: "form_isr4",
      name: "Form ISR-4 (Request for Issue of Letter of Confirmation)",
      code: "Form ISR-4",
      mandatory: true,
      description: "Application for Letter of Confirmation to dematerialize physical shares into claimant's demat account within 120 days.",
      authority: "SEBI / Listed Company RTA",
    });
  }

  const toggleCheckDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrintChecklist = () => {
    window.print();
  };

  const copySummaryToClipboard = () => {
    const lines = [
      `WILLDRAFTING.IN • SEBI & AMFI SECURITIES TRANSMISSION SUMMARY`,
      `Asset Type: ${holdingMode === "demat" ? "Demat Shares (CDSL/NSDL)" : holdingMode === "mutual_fund" ? "Mutual Fund Folios" : "Physical Share Certificates"}`,
      `Ownership Status: ${isJoint ? "Joint Account (Survivor)" : hasNominee ? "Sole Holder with Nominee" : "Sole Holder without Nominee"}`,
      `Portfolio Valuation: ₹${portfolioValue.toLocaleString("en-IN")}`,
      `Regulatory Route: ${routeBadge}`,
      `Primary Transmission Form: ${primaryFormName}`,
      `Estimated Processing Time: ${isCourtOrderMandatory ? "6 to 12 Months (Court Certificate)" : "15 to 30 Business Days (Direct RTA/DP)"}`,
      `Required Documents:`,
      ...requiredDocuments.map((doc, idx) => `${idx + 1}. ${doc.name} (${doc.authority})`),
      `Generated on https://www.willdrafting.in/tools/demat-mutual-fund-transmission-document-finder`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const copyClauseToClipboard = () => {
    const clauseText = `INDEMNITY BOND CLAUSE FOR TRANSMISSION OF SECURITIES (FORM ISR-5 ANNEXURE B):
"WHEREAS the late [Deceased Investor Name] was the sole holder of securities held under Depository Participant ID: [DP ID], Client ID: [Client ID] / Folio No(s): [Folio Numbers] issued by [Company / Mutual Fund Name], comprising [Number of Shares / Units] shares/units;

AND WHEREAS the said [Deceased Name] departed this life on [Date of Demise] at [Place of Demise], leaving behind the undersigned as his/her sole legal heir(s) under the applicable law of intestate succession;

AND WHEREAS the market value of the said securities does not exceed the statutory threshold of Rs. 15,00,000/- (Rupees Fifteen Lakhs only) for demat securities / Rs. 5,00,000/- for physical securities as notified by SEBI Circular No. SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65;

NOW THEREFORE, in consideration of the Depository Participant / Registrar and Transfer Agent transmitting the said securities in favor of the Claimant [Claimant Name], we the undersigned Claimant and Sureties hereby jointly and severally indemnify, protect, and hold harmless the Company, RTA, and Depository against all claims, actions, suits, losses, or legal liabilities arising from any third-party claim against the said transmitted securities."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyNocToClipboard = () => {
    const nocText = `NO OBJECTION CERTIFICATE (NOC) AFFIDAVIT FROM LEGAL HEIRS (FORM ISR-5 ANNEXURE C):
"I, [Full Name of Non-Claiming Legal Heir], son/daughter/spouse of Late [Deceased Investor Name], aged [Age] years, residing at [Permanent Address], do hereby solemnly affirm and declare on oath as under:

1. That I am the [Relationship, e.g. Son / Daughter / Mother] and one of the legal heirs of Late [Deceased Investor Name] who expired on [Date of Death].
2. That the deceased was holding [Number of Shares / Units] under DP ID: [DP ID], Client ID: [Client ID] / Folio No: [Folio No].
3. That I have no objection whatsoever to the transmission of the aforesaid securities exclusively in the name of my [Relationship, e.g. Brother / Sister / Mother], namely [Full Name of Claimant Legal Heir].
4. That I hereby unconditionally relinquish, renounce, and surrender all my right, title, interest, and claim in the aforesaid securities in favor of the Claimant, without any monetary claim or future reservation."`;
    navigator.clipboard.writeText(nocText);
    setCopiedNoc(true);
    setTimeout(() => setCopiedNoc(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Strict Reference Match)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>SEBI MASTER CIRCULAR 2024 • AMFI BEST PRACTICES • FORM ISR-5</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            SEBI Demat &amp; Mutual Fund Transmission Document Finder
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly identify exact <strong>SEBI Form ISR-5</strong> and <strong>AMFI Form T2/T3</strong> requirements.
            Verify whether your demat shares, mutual fund units, or physical certificates qualify for the
            <strong> ₹15 Lakh simplified threshold</strong> or require a court-issued Succession Certificate.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-document-finder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Find Required Transmission Documents</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹15 Lakh</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEBI DEMAT SIMPLIFIED LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹5 Lakh</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PHYSICAL SHARES &amp; MF LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form ISR-5</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNIFIED SEBI TRANSMISSION FORM
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">AMFI T2 / T3</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CAMS &amp; KFINTECH MF FORMS
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
                Governed under SEBI Master Circular for RTAs &amp; Depositories, SEBI LODR Regulation 40,
                AMFI Best Practice Guidelines, and Sections 213, 218 &amp; 372 of the Indian Succession Act, 1925.
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
                <span>EXECUTIVE BRIEF: SECURITIES TRANSMISSION RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transmission vs Transfer:</strong> Transmission occurs by operation of law
                    upon death. No stamp duty or consideration is payable on transfer of ownership,
                    unlike voluntary secondary market trades.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Revised SEBI ₹15 Lakh Limit:</strong> If no nominee is registered, demat
                    portfolios up to ₹15,00,000 can be claimed without court probate or succession
                    certificates by submitting Form ISR-5, Indemnity Bond, and family NOC affidavits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee Fiduciary Duty:</strong> Under Supreme Court ruling in <em>Shakti Yezdani (2023)</em>,
                    a registered nominee receives title only as a custodian. The nominee is legally bound to
                    distribute proceeds to lawful legal heirs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mutual Fund ₹5 Lakh Limit:</strong> Mutual fund folios without nominees follow
                    AMFI Form T3 up to ₹5,00,000. Portfolios above ₹5,00,000 strictly require court succession documents.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: REGULATORY FRAMEWORK */}
            <section id="regulatory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>REGULATORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Regulatory Framework: SEBI &amp; AMFI Transmission Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Transmission of financial securities in India is governed by strict regulatory circulars
                  issued by the Securities and Exchange Board of India (SEBI) and the Association of Mutual
                  Funds in India (AMFI). When an investor passes away, their shares, debentures, exchange-traded
                  funds (ETFs), and mutual fund folios cannot be sold directly. They must undergo formal
                  transmission to the surviving joint holder, registered nominee, or legal heirs.
                </p>
                <p>
                  Historically, claiming securities after death was one of the most bureaucratic processes in India.
                  Heirs had to obtain court succession certificates even for modest shareholdings. In May 2022,
                  SEBI issued Circular <strong>SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65</strong>, establishing a
                  unified operational framework that raised simplified transmission thresholds to ₹15 Lakhs for
                  demat holdings and ₹5 Lakhs for physical shares.
                </p>
                <p>
                  Today, Registrars and Share Transfer Agents (RTAs) like CAMS, KFintech, Link Intime, and Bigshare,
                  along with depositories Central Depository Services India Limited (CDSL) and National Securities
                  Depository Limited (NSDL), follow standardized forms. This tool unifies these fragmented rules
                  into an actionable, personalized document checklist.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DOCUMENT FINDER */}
            <section id="interactive-document-finder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE COMPLIANCE TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Demat &amp; Mutual Fund Document Finder Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your asset details below to instantly determine exact form codes, document checklists,
                and whether court succession intervention is mandatory under current SEBI and AMFI regulations.
              </p>

              {/* Tool Card Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Control 1: Holding Mode */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 1: Select Holding Mode / Asset Type</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setHoldingMode("demat")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        holdingMode === "demat"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                        <span>Demat Shares &amp; ETFs</span>
                        {holdingMode === "demat" && <Check className="w-4 h-4 text-[#C65378]" />}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Held with CDSL / NSDL Depository (Zerodha, Groww, ICICI, etc.)
                      </div>
                      <div className="mt-2 inline-block px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800 text-[10px] font-bold">
                        Simplified limit: Up to ₹15 Lakhs
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHoldingMode("mutual_fund")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        holdingMode === "mutual_fund"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                        <span>Mutual Fund Folios</span>
                        {holdingMode === "mutual_fund" && <Check className="w-4 h-4 text-[#C65378]" />}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Direct AMC or RTA folios (CAMS / KFintech platforms)
                      </div>
                      <div className="mt-2 inline-block px-2 py-0.5 rounded bg-amber-100/80 text-amber-800 text-[10px] font-bold">
                        Simplified limit: Up to ₹5 Lakhs
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHoldingMode("physical")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        holdingMode === "physical"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                        <span>Physical Share Certificates</span>
                        {holdingMode === "physical" && <Check className="w-4 h-4 text-[#C65378]" />}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        Paper certificates issued by listed companies
                      </div>
                      <div className="mt-2 inline-block px-2 py-0.5 rounded bg-amber-100/80 text-amber-800 text-[10px] font-bold">
                        Simplified limit: Up to ₹5 Lakhs
                      </div>
                    </button>
                  </div>
                </div>

                {/* Control 2: Ownership & Nominee Status */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>Step 2: Ownership &amp; Nominee Registration Status</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setOwnershipStatus("joint_survivor")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        ownershipStatus === "joint_survivor"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">Joint Account with Survivor</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Either/Survivor or joint holding with surviving holder(s).
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOwnershipStatus("sole_nominee")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        ownershipStatus === "sole_nominee"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">Sole Holder WITH Nominee</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Valid nominee registered on depository / AMC records.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOwnershipStatus("sole_no_nominee")}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        ownershipStatus === "sole_no_nominee"
                          ? "border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/70"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">Sole Holder WITHOUT Nominee</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        No nominee recorded or nominee predeceased the holder.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Control 3: Portfolio Value Slider & Input */}
                <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Step 3: Total Portfolio Market Value (₹)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Entered Value:</span>
                      <span className="text-base sm:text-lg font-black text-[#172228]">
                        ₹{portfolioValue.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={50000}
                    max={5000000}
                    step={25000}
                    value={portfolioValue}
                    onChange={(e) => setPortfolioValue(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] text-slate-500 font-semibold self-center mr-1">Presets:</span>
                    {[200000, 500000, 1000000, 1500000, 2500000, 4000000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setPortfolioValue(preset)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          portfolioValue === preset
                            ? "bg-[#C65378] text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        ₹{(preset / 100000).toFixed(preset % 100000 === 0 ? 0 : 1)}L
                      </button>
                    ))}
                  </div>

                  {/* Threshold Hint */}
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                    <span>
                      SEBI simplified threshold for {holdingMode === "demat" ? "Demat Securities" : "Physical Shares / Mutual Funds"} is{" "}
                      <strong>₹{(simplifiedThreshold / 100000).toFixed(0)} Lakhs</strong>.
                    </span>
                  </div>
                </div>

                {/* Control 4: Depository / RTA, Heirs & State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Depository / RTA Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Depository / RTA</span>
                    </label>
                    <select
                      value={depository}
                      onChange={(e) => setDepository(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="cdsl">CDSL (Central Depository)</option>
                      <option value="nsdl">NSDL (National Securities)</option>
                      <option value="cams">CAMS (Mutual Funds)</option>
                      <option value="kfintech">KFintech (MF &amp; Shares)</option>
                      <option value="linkintime">Link Intime India</option>
                      <option value="bigshare">Bigshare Services</option>
                    </select>
                  </div>

                  {/* Number of Legal Heirs */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Total Legal Heirs</span>
                      </span>
                      <span className="text-[#C65378] font-black">{numberOfHeirs} Heirs</span>
                    </label>
                    <select
                      value={numberOfHeirs}
                      onChange={(e) => setNumberOfHeirs(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={1}>1 Legal Heir (Sole Heir)</option>
                      <option value={2}>2 Legal Heirs (e.g. Spouse + Child)</option>
                      <option value={3}>3 Legal Heirs (e.g. Sibling Co-heirs)</option>
                      <option value={4}>4+ Legal Heirs</option>
                    </select>
                  </div>

                  {/* Claimant State for Stamp Duty */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>State for Stamp Duty</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="maharashtra">Maharashtra (₹500)</option>
                      <option value="delhi">Delhi (₹100)</option>
                      <option value="karnataka">Karnataka (₹200)</option>
                      <option value="tamilnadu">Tamil Nadu (₹100)</option>
                      <option value="westbengal">West Bengal (₹100)</option>
                      <option value="gujarat">Gujarat (₹300)</option>
                      <option value="uttarpradesh">Uttar Pradesh (₹100)</option>
                      <option value="other">Other States (₹100-200)</option>
                    </select>
                  </div>
                </div>

                {/* =============================================================
                    DIAGNOSTIC OUTPUT CARD: STATUTORY RESULTS & CHECKLIST
                    ============================================================= */}
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-5 sm:p-6 space-y-6 shadow-xs">
                  {/* Status Banner */}
                  <div
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCourtOrderMandatory
                        ? "bg-purple-50/80 border-purple-200 text-purple-900"
                        : isJoint
                        ? "bg-blue-50/80 border-blue-200 text-blue-900"
                        : hasNominee
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                        : "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-xs font-extrabold uppercase tracking-wide border shadow-2xs">
                          {routeBadge}
                        </span>
                        <span className="text-xs font-semibold">
                          {isCourtOrderMandatory
                            ? "Value Exceeds Statutory Simplified Cap"
                            : "Court Order NOT Required"}
                        </span>
                      </div>
                      <div className="text-sm sm:text-base font-extrabold">
                        {isCourtOrderMandatory
                          ? `Portfolio (₹${(portfolioValue / 100000).toFixed(1)}L) exceeds the ₹${(simplifiedThreshold / 100000).toFixed(0)}L cap. Succession Certificate is mandatory.`
                          : isJoint
                          ? "Surviving joint holder steps into title directly via name deletion."
                          : hasNominee
                          ? "Registered nominee can claim directly using Form ISR-5 or AMFI Form T2."
                          : `Eligible for Simplified SEBI Transmission without Succession Certificate (Portfolio <= ₹${(simplifiedThreshold / 100000).toFixed(0)}L).`}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isCourtOrderMandatory ? (
                        <Link
                          href="/services/succession-certificate"
                          className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Succession Certificate Help</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Direct RTA Filing</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold uppercase text-slate-500">Primary Form</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5 truncate">{primaryFormCode}</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold uppercase text-slate-500">Est. Timeline</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">
                        {isCourtOrderMandatory ? "6 to 12 Months" : "15 to 30 Days"}
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold uppercase text-slate-500">Indemnity Stamp</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">
                        {isJoint || hasNominee ? "Nil (Not Req.)" : `₹${STATE_STAMP_RATES[selectedState]?.stampDuty || 100}`}
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-bold uppercase text-slate-500">NOC Affidavits</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">
                        {noNominee && numberOfHeirs > 1 ? `${numberOfHeirs - 1} Relinquishing` : "0 (Not Req.)"}
                      </div>
                    </div>
                  </div>

                  {/* Checklist Header & Action Bar */}
                  <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#C65378]" />
                        <span>Statutory Document Checklist ({requiredDocuments.length} Required)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Check off each item as you assemble your transmission dossier.
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={copySummaryToClipboard}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                      >
                        {copiedSummary ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Dossier</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handlePrintChecklist}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] hover:bg-slate-800 text-xs font-bold text-white transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Checklist</span>
                      </button>
                    </div>
                  </div>

                  {/* Checklist List Items */}
                  <div className="space-y-2.5">
                    {requiredDocuments.map((doc, idx) => {
                      const isChecked = checkedDocs[doc.id] || false;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => toggleCheckDoc(doc.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked
                              ? "bg-emerald-50/70 border-emerald-300"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-[#C65378] accent-[#C65378] focus:ring-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-xs font-extrabold ${
                                  isChecked ? "line-through text-slate-400" : "text-slate-900"
                                }`}
                              >
                                {idx + 1}. {doc.name}
                              </span>
                              {doc.code && (
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                                  {doc.code}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                                Mandatory
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{doc.description}</p>
                            <div className="text-[11px] text-[#5F7E75] font-semibold flex items-center gap-1 pt-0.5">
                              <Landmark className="w-3 h-3" />
                              <span>Issuing Authority: {doc.authority}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL STATUTORY GUIDE BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: SEBI DEMAT &amp; MUTUAL FUND TRANSMISSION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">SEBI &amp; AMFI Master Guidelines</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/demat-mutual-fund-transmission-document-finder-og.jpg"
                  alt="SEBI Demat and Mutual Fund Transmission Document Finder and Legal Checklist"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-600">
                <span>Unified transmission documentation protocol under SEBI Master Circular 2024 and AMFI guidelines.</span>
                <span className="text-[11px] font-bold text-[#C65378] shrink-0">Updated for CDSL, NSDL, CAMS &amp; KFintech</span>
              </div>
            </div>

            {/* SECTION 3: SEBI TRANSMISSION LIMITS */}
            <section id="sebi-transmission-limits" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATUTORY THRESHOLDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. SEBI Transmission Limits: ₹5 Lakh vs ₹15 Lakh Threshold
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To eliminate undue hardship on grieving families, SEBI established separate simplified limits
                  depending on whether securities are held in electronic demat mode or paper physical share certificates:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C65378]" />
                      <span>Demat Securities (CDSL &amp; NSDL)</span>
                    </div>
                    <div className="text-2xl font-extrabold text-[#C65378]">Up to ₹15,00,000</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Calculated per Depository Participant account as on the date of application. If the total
                      market value across all holdings in that single demat account is ₹15 Lakhs or less, legal heirs
                      can claim securities without presenting a court succession certificate.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5F7E75]" />
                      <span>Physical Share Certificates</span>
                    </div>
                    <div className="text-2xl font-extrabold text-[#5F7E75]">Up to ₹5,00,000</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Calculated per listed entity as on the application date. For physical shares, each listed company
                      evaluates the ₹5 Lakh threshold independently. However, once transmitted, shares cannot be
                      delivered in physical format; they must be converted to demat.
                    </p>
                  </div>
                </div>
                <p>
                  If a single demat account holds shares valued at ₹15,00,001 or higher and there is no registered
                  nominee, the Depository Participant has zero statutory discretion. They are prohibited by law
                  from releasing the portfolio until a certified copy of a Succession Certificate, Probated Will,
                  or Letters of Administration is presented.
                </p>
              </div>
            </section>

            {/* SECTION 4: SUPREME COURT NOMINEE RULING */}
            <section id="supreme-court-nominee-ruling" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Landmark SC Ruling: Shakti Yezdani on Nominee Rights
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A pervasive myth among Indian investors is that appointing a nominee makes them the absolute,
                  undisputed owner of the shares upon the investor&rsquo;s demise. In December 2023, the Supreme Court of
                  India delivered a definitive landmark judgment in{" "}
                  <strong>Shakti Yezdani &amp; Anr. v. Jayanand Jayant Salgaonkar &amp; Anr. (2023) SCC Online SC 1564</strong>,
                  resolving decades of conflicting High Court views on Section 72 of the Companies Act, 2013 and the
                  Depositories Act, 1996.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
                  <div className="font-extrabold flex items-center gap-1.5 text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>The Supreme Court Ratio Decidendi:</span>
                  </div>
                  <p>
                    The Supreme Court held that nomination does not constitute a "third line of succession". A nominee
                    is merely a fiduciary trustee or custodian whose appointment ensures the company or depository can
                    discharge its liability. Beneficial ownership and succession rights remain strictly governed by the
                    deceased person&rsquo;s Will or intestate succession laws (such as the Hindu Succession Act, 1956 or
                    Indian Succession Act, 1925).
                  </p>
                </div>
                <p>
                  <strong>What this means in practice:</strong> When a father nominates one child on his demat account,
                  the broker and depository legally transfer the shares to that nominated child. However, the other legal
                  heirs (such as siblings or surviving spouse) retain full legal entitlement to their proportionate shares.
                  If the nominee refuses to partition or distribute the portfolio, the heirs can file a civil partition
                  suit to compel distribution.
                </p>
              </div>
            </section>

            {/* SECTION 5: DEPOSITORY TRANSMISSION GUIDE */}
            <section id="depository-transmission-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DEPOSITORY OPERATIONAL GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Depository Transmission: CDSL vs NSDL Form ISR-5 Guide
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Both Central Depository Services India Limited (CDSL) and National Securities Depository Limited (NSDL)
                  mandate <strong>Form ISR-5</strong> as the universal transmission application. However, operational
                  workflows involve several specific technical requirements:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Client Master Report (CMR / CML) Verification</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Securities cannot be transferred into a bank account. The claimant must possess an active demat
                      account in their own name. The DP requires a physically signed and stamped Client Master Report
                      verifying the claimant&rsquo;s 16-digit Beneficiary Owner ID (BOID).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Signature Mismatch and Form ISR-2</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the deceased investor&rsquo;s signature on the old DP account records differs from the death
                      intimation documents, or if the claimant&rsquo;s bank signature does not match their PAN card, SEBI
                      mandates <strong>Form ISR-2</strong> (Banker&rsquo;s Verification of Signature).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Annexure B (Indemnity) &amp; Annexure C (NOC)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For accounts without nominees under ₹15 Lakhs, Annexure B must be printed on non-judicial stamp
                      paper as prescribed by the claimant&rsquo;s state stamp act, executed by the claimant and two
                      financially sound third-party sureties, and attested by a Notary Public.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: MUTUAL FUND TRANSMISSION GUIDE */}
            <section id="mutual-fund-transmission-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>MUTUAL FUND SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Mutual Fund Transmission: CAMS &amp; KFintech Form T2 &amp; T3
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Unlike demat accounts which aggregate all shares under one depository, mutual funds are maintained
                  either directly across Asset Management Companies (AMCs) or via primary RTAs: <strong>CAMS</strong>
                  (Computer Age Management Services) and <strong>KFintech</strong>.
                </p>
                <p>
                  AMFI guidelines standardize mutual fund transmission into specific form codes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>AMFI Form T2 (Transmission to Nominee):</strong> Used when a registered nominee claims the
                    folio. Requires KYC acknowledgment, attested death certificate, and a cancelled cheque leaf of the
                    nominee with name pre-printed.
                  </li>
                  <li>
                    <strong>AMFI Form T3 (Transmission where No Nominee is Registered):</strong> Used when no nominee
                    exists and the aggregate holding value is up to ₹5,00,000. Requires Annexure II (Indemnity Bond on
                    stamp paper), Annexure III (Affidavits from all heirs), and Annexure IV (NOC from non-claimants).
                  </li>
                  <li>
                    <strong>Minor Nominee Transmission:</strong> If the nominee is a minor, the legal or natural parent
                    must submit proof of birth date (Birth Certificate or Passport) and proof of legal guardianship.
                  </li>
                  <li>
                    <strong>Folio Reinvestment vs Payout:</strong> Upon transmission, the RTA issues new unit certificates
                    or updates the folio under the claimant&rsquo;s PAN. The claimant can choose to retain the ongoing SIP
                    investments or redeem the accumulated corpus into their verified bank account.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: PHYSICAL SHARES TRANSMISSION */}
            <section id="physical-shares-transmission" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PHYSICAL SHARES PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Physical Shares Transmission: SEBI Form ISR-4 Demat SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Millions of Indian families hold physical paper share certificates purchased in the 1980s and 1990s
                  by deceased parents. Under Regulation 40 of SEBI (Listing Obligations and Disclosure Requirements)
                  Regulations, 2015, listed companies are strictly barred from re-issuing physical share certificates.
                </p>
                <p>
                  The modern statutory procedure for transmitting physical share certificates requires two connected steps:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                        1
                      </span>
                      <span>Submission of Form ISR-4 to RTA</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Legal heirs submit the original share certificates, Form ISR-5, Indemnity Bond, and Form ISR-4 to
                      the respective company&rsquo;s RTA. The RTA verifies the signature, title, and cancels the physical paper.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white text-[10px] font-black flex items-center justify-center">
                        2
                      </span>
                      <span>Demat Credit via Demat Request Form (DRF)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The RTA issues an official <strong>Letter of Confirmation (LOC)</strong> in Form ISR-4. The legal
                      heir must submit this letter to their Depository Participant within <strong>120 days</strong> to
                      credit the shares directly into their demat account.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: REGULATORY COMPARISON TABLE */}
            <section id="regulatory-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Regulatory Comparison: Joint vs Nominee vs Legal Heirs
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                The table below summarizes transmission procedures across all holding formats and regulatory routes:
              </p>

              {/* Structured HTML Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white border-b border-slate-700">
                      <th className="p-3.5 font-bold">Ownership Scenario</th>
                      <th className="p-3.5 font-bold">Holding Mode</th>
                      <th className="p-3.5 font-bold">Value Threshold</th>
                      <th className="p-3.5 font-bold">Primary Form</th>
                      <th className="p-3.5 font-bold">Court Order Req.?</th>
                      <th className="p-3.5 font-bold">Est. Processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">Joint Account with Survivor</td>
                      <td className="p-3.5">Demat or MF</td>
                      <td className="p-3.5 font-semibold text-emerald-700">No Limit</td>
                      <td className="p-3.5 font-mono">Annexure JA / Form ISR-5</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">No</span>
                      </td>
                      <td className="p-3.5 font-semibold">7–15 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">Sole Holder WITH Nominee</td>
                      <td className="p-3.5">Demat Shares</td>
                      <td className="p-3.5 font-semibold text-emerald-700">No Limit</td>
                      <td className="p-3.5 font-mono">Form ISR-5 (Nominee)</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">No</span>
                      </td>
                      <td className="p-3.5 font-semibold">15–21 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">Sole Holder WITH Nominee</td>
                      <td className="p-3.5">Mutual Funds</td>
                      <td className="p-3.5 font-semibold text-emerald-700">No Limit</td>
                      <td className="p-3.5 font-mono">AMFI Form T2</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">No</span>
                      </td>
                      <td className="p-3.5 font-semibold">15–21 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">Sole Holder WITHOUT Nominee</td>
                      <td className="p-3.5">Demat Shares</td>
                      <td className="p-3.5 font-semibold text-amber-700">Up to ₹15 Lakhs</td>
                      <td className="p-3.5 font-mono">Form ISR-5 + Annex B/C</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">No</span>
                      </td>
                      <td className="p-3.5 font-semibold">21–30 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">Sole Holder WITHOUT Nominee</td>
                      <td className="p-3.5">Mutual Funds</td>
                      <td className="p-3.5 font-semibold text-amber-700">Up to ₹5 Lakhs</td>
                      <td className="p-3.5 font-mono">AMFI Form T3 + Annex II/III</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">No</span>
                      </td>
                      <td className="p-3.5 font-semibold">21–30 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 bg-rose-50/40">
                      <td className="p-3.5 font-bold text-rose-950">Sole Holder WITHOUT Nominee</td>
                      <td className="p-3.5">Demat Shares</td>
                      <td className="p-3.5 font-extrabold text-rose-700">&gt; ₹15 Lakhs</td>
                      <td className="p-3.5 font-mono">Succession Cert. + ISR-5</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">MANDATORY</span>
                      </td>
                      <td className="p-3.5 font-semibold text-rose-900">6–12 Months</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 bg-rose-50/40">
                      <td className="p-3.5 font-bold text-rose-950">Sole Holder WITHOUT Nominee</td>
                      <td className="p-3.5">Mutual Funds / Physical</td>
                      <td className="p-3.5 font-extrabold text-rose-700">&gt; ₹5 Lakhs</td>
                      <td className="p-3.5 font-mono">Succession Cert. + Form T3</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">MANDATORY</span>
                      </td>
                      <td className="p-3.5 font-semibold text-rose-900">6–12 Months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Securities Transmission Procedure
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">STAGE 1</span>
                    <span>Intimation of Death &amp; Account Freezing</span>
                  </div>
                  <p className="text-slate-600">
                    Immediately notify the Depository Participant or RTA with an attested copy of the death certificate.
                    The DP freezes the account to prevent unauthorized debit transactions while allowing dividend accruals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">STAGE 2</span>
                    <span>Portfolio Valuation on Application Date</span>
                  </div>
                  <p className="text-slate-600">
                    Request an official Holding Statement showing the closing market valuation of all securities.
                    This establishes whether total value falls below the ₹15 Lakh demat or ₹5 Lakh physical/MF threshold.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">STAGE 3</span>
                    <span>Execution of Stamp Paper Documents</span>
                  </div>
                  <p className="text-slate-600">
                    Procure e-Stamp or non-judicial stamp paper of appropriate state value. Execute the Indemnity Bond
                    (Annexure B / Annexure II) with two independent witnesses/sureties and notarize the NOC affidavits.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">STAGE 4</span>
                    <span>Dossier Submission &amp; Depository Verification</span>
                  </div>
                  <p className="text-slate-600">
                    Submit the complete physical dossier to the DP or RTA branch. The DP issues an acknowledgment slip
                    and verifies signatures, KYC records, and relationship certificates against PAN and municipal databases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px]">STAGE 5</span>
                    <span>Credit of Securities &amp; Deceased Account Closure</span>
                  </div>
                  <p className="text-slate-600">
                    Upon verification (typically 15 to 30 days), the depository transfers the securities into the
                    claimant&rsquo;s demat account via an off-market transmission transaction and formally closes the deceased account.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>REAL-WORLD RESOLUTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: CDSL, CAMS &amp; RTA Recoveries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">CASE STUDY A: MUMBAI</div>
                  <div className="font-extrabold text-sm text-slate-900">₹12.5L Demat Portfolio with No Nominee</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A resident died intestate leaving shares worth ₹12,50,000 in a Zerodha CDSL account without nomination.
                    His widow and two adult children submitted Form ISR-5, a ₹500 Maharashtra Indemnity Bond, and two
                    notarized NOC affidavits. The entire portfolio was successfully transmitted in 24 days without court probate.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75]">CASE STUDY B: DELHI</div>
                  <div className="font-extrabold text-sm text-slate-900">₹32L Mutual Funds Requiring Court Decree</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A deceased investor held mutual fund folios across HDFC and ICICI Prudential valued at ₹32 Lakhs with
                    predeceased nominee. Because the portfolio exceeded the ₹5 Lakh AMFI cap, AMA Legal Solutions petitioned
                    the Saket District Court for a Succession Certificate, successfully securing title for the heirs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">CASE STUDY C: BENGALURU</div>
                  <div className="font-extrabold text-sm text-slate-900">₹4.2L Legacy Physical Shares (Form ISR-4)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Heirs discovered physical certificates of a blue-chip company valued at ₹4,20,000. Under SEBI rules,
                    they submitted Form ISR-5 and Form ISR-4 to KFintech. The RTA issued a Letter of Confirmation, and the
                    shares were credited electronically into the son&rsquo;s demat account within 45 days.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: LEGAL RECITALS & COPY-PASTE CLAUSES */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>TEMPLATE REPOSITORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Legal Recitals &amp; Copy-Paste Indemnity Bond Clauses
              </h3>

              {/* Template Box 1: Form ISR-5 Annexure B Indemnity Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    SEBI Form ISR-5 Annexure B: Standard Indemnity Bond Recital
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
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
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"WHEREAS the late [Deceased Investor Name] was the sole holder of securities held under Depository Participant ID: [DP ID], Client ID: [Client ID] / Folio No(s): [Folio Numbers] issued by [Company / Mutual Fund Name], comprising [Number of Shares / Units] shares/units;

AND WHEREAS the said [Deceased Name] departed this life on [Date of Demise] at [Place of Demise], leaving behind the undersigned as his/her sole legal heir(s) under the applicable law of intestate succession;

AND WHEREAS the market value of the said securities does not exceed the statutory threshold of Rs. 15,00,000/- (Rupees Fifteen Lakhs only) for demat securities / Rs. 5,00,000/- for physical securities as notified by SEBI Circular No. SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65;

NOW THEREFORE, in consideration of the Depository Participant / Registrar and Transfer Agent transmitting the said securities in favor of the Claimant [Claimant Name], we the undersigned Claimant and Sureties hereby jointly and severally indemnify, protect, and hold harmless the Company, RTA, and Depository against all claims, actions, suits, losses, or legal liabilities arising from any third-party claim against the said transmitted securities."`}
                </pre>
              </div>

              {/* Template Box 2: Form ISR-5 Annexure C NOC Affidavit */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    SEBI Form ISR-5 Annexure C: Legal Heir No-Objection Affidavit
                  </div>
                  <button
                    type="button"
                    onClick={copyNocToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedNoc ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Affidavit</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I, [Full Name of Non-Claiming Legal Heir], son/daughter/spouse of Late [Deceased Investor Name], aged [Age] years, residing at [Permanent Address], do hereby solemnly affirm and declare on oath as under:

1. That I am the [Relationship, e.g. Son / Daughter / Mother] and one of the legal heirs of Late [Deceased Investor Name] who expired on [Date of Death].
2. That the deceased was holding [Number of Shares / Units] under DP ID: [DP ID], Client ID: [Client ID] / Folio No: [Folio No].
3. That I have no objection whatsoever to the transmission of the aforesaid securities exclusively in the name of my [Relationship, e.g. Brother / Sister / Mother], namely [Full Name of Claimant Legal Heir].
4. That I hereby unconditionally relinquish, renounce, and surrender all my right, title, interest, and claim in the aforesaid securities in favor of the Claimant, without any monetary claim or future reservation."`}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Testamentary &amp; Securities Practice
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading estate planning and wealth succession technology platform, backed
                  by senior advocates at AMA Legal Solutions. Our multidisciplinary team assists families across India and
                  NRI investors in handling complex demat share transmission, mutual fund portfolio claims, IEPF
                  unclaimed dividend recoveries, and High Court Succession Certificate petitions.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/succession-certificate"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession Certificate Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession vs Legal Heir Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker Tool</span>
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
                13. Frequently Asked Questions: Securities Transmission
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-shadow hover:shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: OFFICIAL PORTALS & STATUTORY CITATIONS */}
            <section id="official-statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; REFERENCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Portals, Regulatory Circulars &amp; Citations
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Circulars &amp; Statutory Authority:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>SEBI Circular SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65:</strong> Simplification of
                      procedure for transmission of securities in dematerialized and physical format.
                    </li>
                    <li>
                      <strong>SEBI LODR Regulation 40:</strong> Mandatory dematerialization and prohibition on physical
                      share certificate issuance upon transmission.
                    </li>
                    <li>
                      <strong>AMFI Circular on Standardization of Transmission:</strong> AMFI Best Practices Guidelines
                      Circular No. 97/2021-22 for mutual fund transmission forms T1, T2, T3, T4, and T5.
                    </li>
                    <li>
                      <strong>Supreme Court of India:</strong> <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023)</em>{" "}
                      holding that a nominee is only a fiduciary custodian for legal heirs.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925:</strong> Section 372 governing jurisdiction and grant of
                      Succession Certificates for debts and securities exceeding simplified thresholds.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>SEBI Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.cdslindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>CDSL Depository Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.cdslindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>NSDL Depository Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.kfintech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>CAMS Investor Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.kfintech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>KFintech RTA Services</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Succession Tools &amp; Legal Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Heir vs Succession Certificate Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/services/succession-certificate"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Certificate Legal Service
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Capital Gains Tax Calculator
                    </Link>
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All Succession &amp; Will Tools
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
                Specialist in Indian testamentary jurisprudence, SEBI transmission disputes, High Court probate
                petitions, and nominee-vs-heir litigation under the Indian Succession Act, 1925.
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
                  <span>PREVENT ASSET TRANSMISSION FREEZES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Demat Shares &amp; Mutual Funds
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally registered Will clearly designates who inherits your shares and mutual fund folios,
                  preventing family disputes and bypassing costly court succession certificate delays.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online in 15 Mins</span>
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
                  <span>PORTFOLIOS OVER ₹15 LAKHS?</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Court Succession Certificate?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court advocates file and expedite Succession Certificate and Probate petitions pan-India
                  for demat accounts, mutual funds, and physical shares.
                </p>
                <Link
                  href="/services/succession-certificate"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Get Succession Certificate Assistance</span>
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
                      <strong>SEBI Master Circular Compliant:</strong> Form ISR-5, Annexure B &amp; C templates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>AMFI Form T2 / T3 Integration:</strong> Standardized for CAMS &amp; KFintech.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>State Stamp Duty Calculator:</strong> State-wise indemnity bond stamp rates.
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
          href="#interactive-document-finder"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Document Finder</span>
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
