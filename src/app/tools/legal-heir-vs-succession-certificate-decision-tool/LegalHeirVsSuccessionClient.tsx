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
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Layers,
  Globe,
  Coins,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

// Table of contents anchors matching strict <= 70 chars H2 headings with 0 em-dashes
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Rules: Succession Act vs Revenue Codes" },
  { id: "decision-wizard", label: "2. Interactive Decision Tool: Find Required Document" },
  { id: "comparison-matrix", label: "3. Detailed Comparison: Five Key Post-Death Documents" },
  { id: "bank-claims-rbi", label: "4. Bank Accounts & FDs: RBI Master Circular Thresholds" },
  { id: "demat-shares-sebi", label: "5. Demat & Mutual Funds: SEBI Simplified Transmission" },
  { id: "immovable-property", label: "6. Immovable Property: Revenue Mutation vs Civil Court" },
  { id: "court-procedure-sop", label: "7. Step-by-Step SOP: Obtaining Succession Certificate" },
  { id: "court-fee-schedules", label: "8. State-Wise Court Fees & Ad Valorem Stamp Duty Rates" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: Real Post-Death Scenarios" },
  { id: "legal-templates-formats", label: "10. Copy-Paste Legal Formats & Document Checklist" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence & Trust" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Succession & Heirship" },
  { id: "statutory-citations", label: "13. Statutory Citations & Official Government Portals" },
];

const FAQS = [
  {
    q: "Do I need a succession certificate or a legal heir certificate?",
    a: "The answer depends on what asset you want to claim and its monetary value. A Legal Heir Certificate is issued by the local Tehsildar or revenue office for administrative family identification, pension claims, and property tax record updates. A Succession Certificate is issued only by a competent Civil Court under Section 370 of the Indian Succession Act, 1925 for movable assets (bank balances, fixed deposits, demat shares, mutual funds) where no nominee is registered and the claim exceeds simplified institutional limits.",
  },
  {
    q: "Why did the bank reject my Tehsildar Legal Heir Certificate?",
    a: "Banks reject Tehsildar certificates because revenue authorities have no power to adjudicate debt ownership. Under Section 381 of the Indian Succession Act, 1925, only a Civil Court Succession Certificate provides complete statutory indemnity to a debtor bank against future rival claimants. If the balance exceeds the bank's internal indemnity limit (commonly ₹5 Lakhs to ₹15 Lakhs) and no nominee exists, bank legal circulars make a court decree mandatory.",
  },
  {
    q: "Can I get a succession certificate for a house, flat, or agricultural land?",
    a: "No. Under Section 370(1) of the Indian Succession Act, 1925, a Succession Certificate is strictly limited to movable debts and securities. It cannot be granted for immovable property such as houses, agricultural land, or flats. For transferring immovable property, legal heirs must apply for revenue mutation using a registered Will, Legal Heir Certificate, or obtain Letters of Administration from a Civil Court.",
  },
  {
    q: "What is the simplified SEBI threshold for transmitting demat shares without court orders?",
    a: "Under the SEBI Master Circular on Transmission of Securities, if no nominee is registered, legal heirs can transmit demat shares up to a market value of ₹15 Lakhs per account through a simplified non-court process. You submit Form ISR-5, a notarized indemnity bond, and NOCs from all co-heirs. For portfolios exceeding ₹15 Lakhs without nomination, a Civil Court Succession Certificate, Probate, or Letters of Administration is mandatory.",
  },
  {
    q: "What is a Surviving Member Certificate and where is it used?",
    a: "A Surviving Member Certificate (SMC) is an official document issued in the National Capital Territory of Delhi by the Revenue Department (SDM/Tehsildar) through the Delhi e-District portal. It lists all surviving family members of the deceased. In Delhi, Sub-Registrar Offices and civic bodies insist on an SMC rather than a traditional Legal Heir Certificate for property mutation and administrative claims.",
  },
  {
    q: "When is Probate of a Will strictly mandatory in India?",
    a: "Under Section 57 and Section 213 of the Indian Succession Act, 1925, Probate is strictly mandatory for Wills executed by Hindus, Buddhists, Sikhs, or Jains within the historical Presidency Towns of Mumbai, Kolkata, and Chennai, or where the immovable property bequeathed under the Will is situated within those territorial limits. In other parts of India, probate is optional unless demanded by institutional authorities or contested in court.",
  },
  {
    q: "How much court fee is charged for a succession certificate petition?",
    a: "Court fees for succession certificates are levied ad valorem as a percentage of the gross movable debt or security value under State Court Fees Acts. For example, in Maharashtra, the court fee is 2% to 7.5% but strictly capped at a statutory maximum of ₹75,000. In Delhi, it is approximately 4% of the asset value. In Karnataka and Tamil Nadu, state-specific graduated slabs apply.",
  },
  {
    q: "How long does it take to get a Succession Certificate from a Civil Court?",
    a: "Obtaining a Succession Certificate typically takes 6 to 9 months in an uncontested civil court proceeding. The timeline is dictated by mandatory statutory procedures: filing the verified petition under Section 372, issuing newspaper publication citations in English and vernacular dailies, waiting 30 to 45 days for public objections, recording petitioner evidence, and depositing court fees before the final certificate is drawn up.",
  },
];

type StateKey =
  | "maharashtra"
  | "delhi"
  | "karnataka"
  | "tamilnadu"
  | "westbengal"
  | "telangana_ap"
  | "other_states";

type AssetCategory = "movable_bank" | "movable_demat" | "immovable_property" | "mixed_estate";

type ValueBracket = "under_5l" | "5l_to_15l" | "15l_to_50l" | "above_50l";

type NomineeStatus =
  | "nominee_present"
  | "no_nominee_no_will"
  | "registered_will"
  | "unregistered_will"
  | "dispute_heirs";

export default function LegalHeirVsSuccessionClient() {
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
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  // 4-Click Decision Wizard States
  const [selectedState, setSelectedState] = useState<StateKey>("maharashtra");
  const [assetCategory, setAssetCategory] = useState<AssetCategory>("movable_bank");
  const [valueBracket, setValueBracket] = useState<ValueBracket>("15l_to_50l");
  const [customValue, setCustomValue] = useState<number>(2500000); // ₹25 Lakhs
  const [nomineeStatus, setNomineeStatus] = useState<NomineeStatus>("no_nominee_no_will");

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

  const handleResetWizard = () => {
    setSelectedState("maharashtra");
    setAssetCategory("movable_bank");
    setValueBracket("15l_to_50l");
    setCustomValue(2500000);
    setNomineeStatus("no_nominee_no_will");
  };

  // ==========================================
  // DECISION WIZARD LOGIC ENGINE
  // ==========================================
  interface DecisionResult {
    documentName: string;
    issuingAuthority: string;
    governingStatute: string;
    estimatedTimeline: string;
    estimatedCourtFee: string;
    acceptanceScore: { bank: boolean; demat: boolean; sro: boolean };
    rejectionRisk: "Low" | "Medium" | "High" | "Critical";
    rejectionReason: string;
    recommendedActions: string[];
    statutoryBadge: string;
  }

  const computeDecision = (): DecisionResult => {
    const isPresidencyTown =
      selectedState === "maharashtra" ||
      selectedState === "westbengal" ||
      selectedState === "tamilnadu";
    const isDelhi = selectedState === "delhi";

    // Scenario 1: Disputes among heirs
    if (nomineeStatus === "dispute_heirs") {
      return {
        documentName:
          assetCategory === "immovable_property"
            ? "Partition Suit / Civil Court Title Decree"
            : "Civil Court Succession Certificate / Contested Probate",
        issuingAuthority: "Senior Civil Judge / District Judge Court",
        governingStatute: "Indian Succession Act, 1925 Part X & Code of Civil Procedure, 1908",
        estimatedTimeline: "12 to 24 Months (Subject to trial and witness cross-examination)",
        estimatedCourtFee: calculateCourtFee(selectedState, customValue),
        acceptanceScore: { bank: true, demat: true, sro: true },
        rejectionRisk: "Critical",
        rejectionReason:
          "Neither banks, nor brokers, nor the Tehsildar will release funds or mutate title when rival heirs raise formal legal objections.",
        recommendedActions: [
          "Do not waste money filing for a Tehsildar Legal Heir Certificate, as contested revenue inquiries will be summarily dismissed.",
          "File an immediate caveat or petition before the Senior Civil Judge having territorial jurisdiction.",
          "Seek interim protection or an injunction on bank accounts to prevent illegal withdrawals by rival claimants.",
          "Consult an experienced High Court testamentary advocate to structure settlement or trial representation.",
        ],
        statutoryBadge: "CONTESTED CIVIL LITIGATION",
      };
    }

    // Scenario 2: Nominee Present (No Dispute)
    if (nomineeStatus === "nominee_present") {
      if (assetCategory === "movable_bank" || assetCategory === "movable_demat") {
        return {
          documentName: "Direct Transmission to Nominee (Deceased Claim Form + KYC)",
          issuingAuthority: "Designated Branch Manager (Bank) or Depository Participant / RTA (Demat)",
          governingStatute:
            "Banking Regulation Act, 1949 s. 45ZA; SEBI (LODR) Regulations; Insurance Act s. 39",
          estimatedTimeline: "7 to 15 Working Days (Compliant with RBI 15-day settlement mandate)",
          estimatedCourtFee: "₹0 Court Fees (Only nominal notarization charges)",
          acceptanceScore: { bank: true, demat: true, sro: false },
          rejectionRisk: "Low",
          rejectionReason:
            "Nomination is registered. Bank or depository must release funds to the nominee without demanding a court order.",
          recommendedActions: [
            "Submit original Death Certificate, deceased claim Annexure, and nominee PAN/Aadhaar/cancelled cheque.",
            "Remember: As ruled by the Supreme Court in Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023), a nominee holds movable funds as a trustee for all legal heirs under personal succession law.",
            "Distribute the proceeds among all Class I legal heirs according to personal law shares to avoid future suits.",
          ],
          statutoryBadge: "FAST-TRACK DIRECT DISCHARGE",
        };
      }
    }

    // Scenario 3: Immovable Property (Real Estate)
    if (assetCategory === "immovable_property") {
      if (nomineeStatus === "registered_will" || nomineeStatus === "unregistered_will") {
        if (isPresidencyTown && nomineeStatus === "registered_will") {
          return {
            documentName: "Probate of Will under Section 276",
            issuingAuthority: "High Court (Original Testamentary Division) or Principal District Court",
            governingStatute: "Indian Succession Act, 1925 Sections 57, 213, 276",
            estimatedTimeline: "6 to 10 Months (Includes official gazette and newspaper citations)",
            estimatedCourtFee: calculateCourtFee(selectedState, customValue),
            acceptanceScore: { bank: true, demat: true, sro: true },
            rejectionRisk: "Low",
            rejectionReason:
              "Probate is legally mandatory in Mumbai, Kolkata, and Chennai for properties bequeathed under a Will. SRO and Housing Society will mandate it.",
            recommendedActions: [
              "File testamentary petition in the High Court / District Court with original Will and Death Certificate.",
              "Obtain written consent affidavits from all Class I legal heirs to avoid citations and contest.",
              "Once probate is granted with the court seal, submit to the Sub-Registrar and Cooperative Housing Society for title transfer.",
            ],
            statutoryBadge: "MANDATORY PROBATE JURISDICTION",
          };
        } else {
          return {
            documentName: "Revenue Mutation via Registered Will / Letters of Administration",
            issuingAuthority: "Tehsildar / Taluk Office / Sub-Registrar Office (e-District)",
            governingStatute: "State Land Revenue Code & Indian Succession Act s. 218",
            estimatedTimeline: "30 to 60 Days (Revenue notice period)",
            estimatedCourtFee: "Nominal administrative fees (₹200 - ₹2,000)",
            acceptanceScore: { bank: false, demat: false, sro: true },
            rejectionRisk: "Low",
            rejectionReason:
              "Outside Mumbai, Kolkata, and Chennai, probate is generally not mandatory for Hindu Wills unless challenged.",
            recommendedActions: [
              "Submit registered Will copy, Death Certificate, and legal heir family tree to local revenue authority (e-District).",
              "Execute Registered Release Deed / NOC from other siblings if they are relinquishing their rights.",
              "Update municipal property tax records and land revenue records (Khata / Patta / 7/12 extract).",
            ],
            statutoryBadge: "NON-PRESIDENCY WILL MUTATION",
          };
        }
      }

      // Immovable Property with NO Will (Intestate)
      return {
        documentName: isDelhi
          ? "Surviving Member Certificate (SMC) + Registered Relinquishment Deed"
          : "Legal Heir Certificate (Varisanu) + Revenue Record Mutation",
        issuingAuthority: isDelhi
          ? "SDM / Tehsildar (Delhi e-District Portal)"
          : "Tehsildar / Taluk Office / Revenue Divisional Officer (RDO)",
        governingStatute: "State Land Revenue Code & Registration Act, 1908 s. 17",
        estimatedTimeline: "20 to 45 Days",
        estimatedCourtFee: "Nominal Government Fee (₹100 - ₹500) + Mutation Stamp Charges",
        acceptanceScore: { bank: false, demat: false, sro: true },
        rejectionRisk: "Medium",
        rejectionReason:
          "SRO allows mutation of ancestral property on Legal Heir Certificate if all heirs sign joint mutation or Release Deeds. Note: Civil Courts CANNOT issue a Succession Certificate for immovable land.",
        recommendedActions: [
          "Apply for Legal Heir Certificate / SMC on state revenue portal with family tree affidavit.",
          "All surviving legal heirs must execute a registered Partition Deed or Relinquishment Deed.",
          "Submit mutation order to civic body to update house tax and electricity/water bills.",
        ],
        statutoryBadge: "REVENUE LAND MUTATION",
      };
    }

    // Scenario 4: Movable Financial Assets (Bank Accounts & FDs)
    if (assetCategory === "movable_bank") {
      if (valueBracket === "under_5l") {
        return {
          documentName: "Simplified Bank Deceased Claim (Indemnity Bond + Legal Heir Certificate / SMC)",
          issuingAuthority: "Bank Branch Manager (under RBI Master Circular Framework)",
          governingStatute: "RBI Master Direction on Customer Service in Banks (Deceased Depositor Settlement)",
          estimatedTimeline: "15 to 21 Working Days",
          estimatedCourtFee: "₹0 (Only stamp duty on Indemnity Bond: ₹200 - ₹500)",
          acceptanceScore: { bank: true, demat: false, sro: false },
          rejectionRisk: "Low",
          rejectionReason:
            "Value is under ₹5 Lakhs. Under RBI directives, banks must not insist on court succession certificates for small balances.",
          recommendedActions: [
            "Download Bank Deceased Claim Form Annexure A & Indemnity Bond Form Annexure B.",
            "Provide Tehsildar Legal Heir Certificate or notarized Family Tree affidavit.",
            "Arrange two creditworthy third-party sureties or guarantors required by public sector banks (SBI, PNB).",
            "Obtain stamped NOCs from all co-heirs consenting to credit one primary account.",
          ],
          statutoryBadge: "SIMPLIFIED BANK INDEMNITY",
        };
      }

      if (valueBracket === "5l_to_15l") {
        return {
          documentName:
            "Bank Indemnity Claim with Two Independent Sureties OR Civil Court Succession Certificate",
          issuingAuthority: "Bank Regional Head / Senior Civil Judge Court",
          governingStatute: "Indian Succession Act s. 370 & Bank Customer Service Board Policy",
          estimatedTimeline: "20 Days (If bank approves indemnity) to 6 Months (If branch insists on court)",
          estimatedCourtFee: calculateCourtFee(selectedState, customValue),
          acceptanceScore: { bank: true, demat: true, sro: false },
          rejectionRisk: "High",
          rejectionReason:
            "This is the danger zone. Many branches (especially SBI, Canara, BoB) refuse Tehsildar certificates above ₹5 Lakhs and invoke Section 370.",
          recommendedActions: [
            "Approach the Branch Manager first with a Legal Heir Certificate and offer two high-net-worth sureties.",
            "If the bank gives written rejection demanding a court decree, do not argue; file a Section 372 petition in Civil Court immediately.",
            "Save time by combining all family accounts and bank FDs into a single petition.",
          ],
          statutoryBadge: "HIGH RISK OF BANK REJECTION",
        };
      }

      // Above ₹15 Lakhs without Nominee
      return {
        documentName: "Civil Court Succession Certificate under Section 370",
        issuingAuthority: "Senior Civil Judge / District Delegate Court (Territorial Jurisdiction)",
        governingStatute: "Indian Succession Act, 1925 Part X (Sections 370 to 390)",
        estimatedTimeline: "6 to 9 Months (Mandatory 30-45 days newspaper citations + evidence)",
        estimatedCourtFee: calculateCourtFee(selectedState, customValue),
        acceptanceScore: { bank: true, demat: true, sro: false },
        rejectionRisk: "Critical",
        rejectionReason:
          "Public and private banks universally reject Tehsildar Legal Heir Certificates for non-nominee balances above ₹15 Lakhs. Section 381 court protection is strictly insisted upon.",
        recommendedActions: [
          "File petition under Section 372 of Indian Succession Act before the Senior Civil Judge.",
          "Attach certified Death Certificate, family tree, and bank balance confirmation certificates.",
          "Court will issue citation notices in one English and one vernacular newspaper for 30-45 days.",
          "Pay required state ad valorem court fee to receive the final court stamped Succession Certificate.",
        ],
        statutoryBadge: "MANDATORY COURT DECREE",
      };
    }

    // Scenario 5: Movable Assets (Demat Shares & Mutual Funds)
    if (assetCategory === "movable_demat") {
      if (valueBracket === "under_5l" || valueBracket === "5l_to_15l") {
        return {
          documentName: "SEBI Simplified Demat Transmission (Form ISR-5 + Annexure D Indemnity)",
          issuingAuthority: "Depository Participant (CDSL / NSDL) & Mutual Fund RTAs (CAMS / KFintech)",
          governingStatute: "SEBI Master Circular on Simplification of Procedure for Transmission of Securities",
          estimatedTimeline: "21 to 30 Working Days",
          estimatedCourtFee: "₹0 (Only stamp duty on non-judicial indemnity bond: ₹500)",
          acceptanceScore: { bank: false, demat: true, sro: false },
          rejectionRisk: "Low",
          rejectionReason:
            "Value is under SEBI's ₹15 Lakh simplified transmission ceiling for demat securities. Court certificate is not required.",
          recommendedActions: [
            "Fill SEBI Form ISR-5 transmission request form.",
            "Execute Annexure D Indemnity Bond on non-judicial stamp paper with one surety.",
            "Submit Annexure C NOC from non-claiming legal heirs or Annexure E Family Settlement Deed.",
            "Attach Client Master Report (CMR) of claimant's demat account and certified death certificate.",
          ],
          statutoryBadge: "SEBI SIMPLIFIED TRANSMISSION",
        };
      }

      // Demat Portfolio Above ₹15 Lakhs without Nominee
      return {
        documentName: "Civil Court Succession Certificate / Probate / Letters of Administration",
        issuingAuthority: "Senior Civil Judge / District Court / High Court Testamentary Bench",
        governingStatute: "Indian Succession Act, 1925 Part X & SEBI Transmission Guidelines",
        estimatedTimeline: "6 to 9 Months",
        estimatedCourtFee: calculateCourtFee(selectedState, customValue),
        acceptanceScore: { bank: true, demat: true, sro: false },
        rejectionRisk: "Critical",
        rejectionReason:
          "SEBI regulations explicitly prohibit RTAs (CAMS, KFintech) and DPs from transmitting non-nominee portfolios exceeding ₹15 Lakhs without a competent court certificate.",
        recommendedActions: [
          "Collate latest CAS (Consolidated Account Statement) showing exact share quantities and market values.",
          "File Section 372 petition specifying individual ISIN numbers, folio numbers, and market valuation.",
          "Deposit ad valorem court fee once the civil judge passes the decree.",
          "Submit certified court certificate with Form ISR-5 to the DP / RTA for final share transfer.",
        ],
        statutoryBadge: "MANDATORY SEBI COURT THRESHOLD",
      };
    }

    // Scenario 6: Mixed Estate (Both Real Estate + Bank/Demat)
    return {
      documentName:
        nomineeStatus === "registered_will"
          ? "Probate of Will (or Letters of Administration with Will Annexed)"
          : "Letters of Administration (under Section 218) OR Separate LHC + Succession Certificate",
      issuingAuthority: "District Civil Court / High Court Testamentary Jurisdiction",
      governingStatute: "Indian Succession Act, 1925 Parts VIII & X",
      estimatedTimeline: "8 to 12 Months",
      estimatedCourtFee: calculateCourtFee(selectedState, customValue),
      acceptanceScore: { bank: true, demat: true, sro: true },
      rejectionRisk: "High",
      rejectionReason:
        "Succession Certificates cover only movable funds, while Legal Heir Certificates do not satisfy high-value banks. Letters of Administration legally covers both movable and immovable assets under a single court decree.",
      recommendedActions: [
        "If you have high-value real estate AND bank accounts > ₹15L without a Will, consider Letters of Administration under Section 218 to resolve both in one proceeding.",
        "Alternatively, obtain a Tehsildar Legal Heir Certificate for property mutation and a Succession Certificate for bank/demat assets.",
        "Consult an advocate to compute the optimal court fee strategy.",
      ],
      statutoryBadge: "COMPREHENSIVE ESTATE ADMINISTRATION",
    };
  };

  const calculateCourtFee = (state: StateKey, value: number): string => {
    switch (state) {
      case "maharashtra":
        // 2% to 7.5% capped at ₹75,000 under Bombay Court Fees Act
        const calcMH = Math.round(value * 0.05);
        const feeMH = Math.min(calcMH, 75000);
        return `₹${feeMH.toLocaleString("en-IN")} (Capped at statutory max ₹75,000 in Maharashtra)`;

      case "delhi":
        // ~4% ad valorem
        const feeDL = Math.round(value * 0.04);
        return `₹${feeDL.toLocaleString("en-IN")} (Approx 4% ad valorem under Court Fees Act)`;

      case "karnataka":
        // Slabs from 2.5% to 6%
        const feeKA = Math.round(value * 0.035);
        return `₹${feeKA.toLocaleString("en-IN")} (Graduated slab under Karnataka Court Fees Act)`;

      case "westbengal":
        // ~3% - 5%
        const feeWB = Math.round(value * 0.04);
        return `₹${feeWB.toLocaleString("en-IN")} (Under West Bengal Court Fees Act)`;

      case "tamilnadu":
        // ~3%
        const feeTN = Math.round(value * 0.03);
        return `₹${feeTN.toLocaleString("en-IN")} (Under Tamil Nadu Court Fees Act)`;

      default:
        const feeGeneral = Math.round(value * 0.04);
        return `₹${feeGeneral.toLocaleString("en-IN")} (Approx 3% - 5% State Ad Valorem Court Fee)`;
    }
  };

  const decision = computeDecision();

  const copyToClipboard = (text: string, templateKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(templateKey);
    setTimeout(() => setCopiedTemplate(null), 3000);
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Reference Tool)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • PARTS VIII &amp; X • STATE REVENUE RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Legal Heir vs Succession Certificate Decision Tool India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly determine whether your family needs a <strong>Tehsildar Legal Heir Certificate,
            Civil Court Succession Certificate, Probate, or Surviving Member Certificate</strong>. Check
            RBI bank thresholds, SEBI demat rules, state court fees, and avoid costly bank rejections.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#decision-wizard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch 4-Click Decision Tool</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 370-390</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CIVIL COURT SUCCESSION CODE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹5L - ₹15L</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBI SIMPLIFIED BANK LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹15 Lakhs</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEBI DEMAT TRANSMISSION CAP
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹75,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MAHARASHTRA COURT FEE CEILING
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
                Governed under Indian Succession Act, 1925 (Part VIII ss. 217-315 &amp; Part X ss.
                370-390), State Land Revenue Codes, RBI Deceased Depositor Master Directions, and SEBI
                Master Circular on Securities Transmission.
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
                <span>EXECUTIVE BRIEF: POST-DEATH CERTIFICATE REALITY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Quora &amp; Reddit #1 Post-Death Confusion:</strong> Thousands of families spend
                    2 to 3 months obtaining a Tehsildar Legal Heir Certificate, only for SBI, HDFC, or
                    Zerodha to reject it outright and demand a Civil Court Succession Certificate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Movable vs Immovable Statutory Divide:</strong> Under Section 370(1), a Civil
                    Court can issue a Succession Certificate ONLY for movable debts and securities (banks,
                    shares, FDs). It CANNOT be granted for land, houses, or flats.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Institutional Indemnity Rules:</strong> Banks and brokerages are legally
                    protected under Section 381 when paying against a Succession Certificate. A Tehsildar
                    certificate provides zero statutory discharge for large non-nominee balances.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Presidency Town Probate Mandate:</strong> In Mumbai, Kolkata, and Chennai, Wills
                    bequeathing immovable property strictly require High Court Probate under Section 213,
                    rendering plain Legal Heir Certificates invalid for society or SRO transfer.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY RULES */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Succession Act vs Revenue Codes
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a family member passes away in India, grief is quickly compounded by bureaucratic
                  hurdles. Financial institutions, government offices, and real estate registrars demand
                  proof of inheritance before releasing funds or mutating property. However, Indian law does
                  not have a single universal post-death certificate.
                </p>
                <p>
                  Instead, Indian succession is split between two distinct statutory regimes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  <li>
                    <strong>Part X (Sections 370–390) of the Indian Succession Act, 1925:</strong> Empowers
                    only a Civil Court (District Judge or Senior Civil Judge) to grant a Succession
                    Certificate for movable debts and securities. Under Section 381, this certificate is
                    conclusive against all debtors and indemnifies the bank.
                  </li>
                  <li>
                    <strong>State Land Revenue Codes &amp; Administrative Circulars:</strong> Authorize local
                    executive revenue officers (Tehsildar, Talukdar, or SDM) to issue a Legal Heir
                    Certificate (Varisanu / Varisu) or Surviving Member Certificate (SMC). This document
                    is purely administrative and does not establish conclusive legal ownership.
                  </li>
                </ul>
                <p>
                  Applying to the wrong authority wastes months of valuable time and thousands of rupees in
                  fruitless visits. Use the interactive tool below to get the exact legal path for your
                  specific assets and state.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE 4-CLICK DECISION TOOL */}
            <section id="decision-wizard" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE 4-CLICK DECISION TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Decision Tool: Find Required Document
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your State, Asset Type, Monetary Value, and Nomination status. The diagnostic engine
                cross-references the Indian Succession Act, RBI Master Directions, and SEBI regulations to
                display the exact document needed.
              </p>

              {/* Wizard Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* 4 Steps Grid */}
                <div className="space-y-6">
                  {/* STEP 1: STATE / METRO JURISDICTION */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Step 1: Jurisdiction &amp; State</span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-normal">
                        Affects Court Fees &amp; Probate Rules
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedState("maharashtra")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "maharashtra"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Maharashtra</div>
                        <div className="text-[10px] opacity-80">Mumbai (₹75k Fee Cap)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("delhi")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "delhi"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Delhi NCR</div>
                        <div className="text-[10px] opacity-80">e-District SMC System</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("karnataka")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "karnataka"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Karnataka</div>
                        <div className="text-[10px] opacity-80">Bengaluru &amp; Tahsildar</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("westbengal")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "westbengal"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">West Bengal</div>
                        <div className="text-[10px] opacity-80">Kolkata (Presidency)</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("tamilnadu")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "tamilnadu"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Tamil Nadu</div>
                        <div className="text-[10px] opacity-80">Chennai e-Sevai / Court</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("telangana_ap")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                          selectedState === "telangana_ap"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Telangana &amp; AP</div>
                        <div className="text-[10px] opacity-80">Hyderabad MRO / Court</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedState("other_states")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border col-span-2 ${
                          selectedState === "other_states"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Other Indian States &amp; UTs</div>
                        <div className="text-[10px] opacity-80">UP, Gujarat, Punjab, Haryana, etc.</div>
                      </button>
                    </div>
                  </div>

                  {/* STEP 2: ASSET CATEGORY */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Step 2: Asset Category &amp; Nature</span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-normal">
                        Movable vs Immovable Statutory Scope
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setAssetCategory("movable_bank")}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          assetCategory === "movable_bank"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm mb-1">
                          <Landmark className="w-4 h-4 text-[#C65378]" />
                          <span>Bank &amp; FDs</span>
                        </div>
                        <p className="text-[11px] opacity-80">
                          Savings accounts, fixed deposits, lockers, recurring deposits
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAssetCategory("movable_demat")}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          assetCategory === "movable_demat"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm mb-1">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span>Demat &amp; Funds</span>
                        </div>
                        <p className="text-[11px] opacity-80">
                          Shares, mutual fund folios, bonds, IEPF unclaimed stock
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAssetCategory("immovable_property")}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          assetCategory === "immovable_property"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm mb-1">
                          <Building className="w-4 h-4 text-[#C65378]" />
                          <span>Real Estate</span>
                        </div>
                        <p className="text-[11px] opacity-80">
                          Apartment, flat, ancestral house, agricultural plot, shop
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAssetCategory("mixed_estate")}
                        className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          assetCategory === "mixed_estate"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm mb-1">
                          <Layers className="w-4 h-4 text-purple-500" />
                          <span>Mixed Estate</span>
                        </div>
                        <p className="text-[11px] opacity-80">
                          Combination of bank accounts, stocks, and real estate
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* STEP 3: CLAIM OR ASSET VALUATION */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Step 3: Total Asset / Claim Value</span>
                      </span>
                      <span className="text-xs font-bold text-[#C65378]">
                        Selected: {formatINR(customValue)}
                      </span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setValueBracket("under_5l");
                          setCustomValue(400000);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          valueBracket === "under_5l"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Under ₹5 Lakhs</div>
                        <div className="text-[10px] opacity-80">Within Bank Indemnity Limit</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setValueBracket("5l_to_15l");
                          setCustomValue(1200000);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          valueBracket === "5l_to_15l"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">₹5L to ₹15 Lakhs</div>
                        <div className="text-[10px] opacity-80">SEBI Demat Simplified Cap</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setValueBracket("15l_to_50l");
                          setCustomValue(2500000);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          valueBracket === "15l_to_50l"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">₹15L to ₹50 Lakhs</div>
                        <div className="text-[10px] opacity-80">Court Certificate Zone</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setValueBracket("above_50l");
                          setCustomValue(8000000);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          valueBracket === "above_50l"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Above ₹50 Lakhs</div>
                        <div className="text-[10px] opacity-80">High-Value Estate</div>
                      </button>
                    </div>

                    {/* Numerical Input Slider for fine adjustments */}
                    <div className="pt-2 flex items-center gap-3">
                      <input
                        type="range"
                        min={100000}
                        max={10000000}
                        step={100000}
                        value={customValue}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setCustomValue(val);
                          if (val < 500000) setValueBracket("under_5l");
                          else if (val <= 1500000) setValueBracket("5l_to_15l");
                          else if (val <= 5000000) setValueBracket("15l_to_50l");
                          else setValueBracket("above_50l");
                        }}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* STEP 4: WILL & NOMINEE / DISPUTE STATUS */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Step 4: Will, Nominee &amp; Heir Concord</span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-normal">
                        Triggers Litigation Risk
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNomineeStatus("nominee_present")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          nomineeStatus === "nominee_present"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Registered Nominee Active</div>
                        <div className="text-[10px] opacity-80">Bank/Demat has valid nominee on file</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNomineeStatus("no_nominee_no_will")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          nomineeStatus === "no_nominee_no_will"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">No Nominee + No Will</div>
                        <div className="text-[10px] opacity-80">All heirs agree &amp; cooperate</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNomineeStatus("registered_will")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          nomineeStatus === "registered_will"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Registered Will Executed</div>
                        <div className="text-[10px] opacity-80">Named Executor / Sole Beneficiary</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNomineeStatus("unregistered_will")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border transition-all ${
                          nomineeStatus === "unregistered_will"
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="font-extrabold">Plain Paper / Notarized Will</div>
                        <div className="text-[10px] opacity-80">Unregistered testamentary paper</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNomineeStatus("dispute_heirs")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold text-left border col-span-1 sm:col-span-2 transition-all ${
                          nomineeStatus === "dispute_heirs"
                            ? "bg-[#C65378] text-white border-[#C65378] shadow-xs"
                            : "bg-rose-50/60 text-rose-900 border-rose-200 hover:bg-rose-100"
                        }`}
                      >
                        <div className="font-extrabold">Hostile Siblings / Heir Dispute</div>
                        <div className="text-[10px] opacity-90">
                          One or more legal heirs refuse to sign NOCs or claim unequal shares
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* =================================================================
                    DYNAMIC DIAGNOSTIC RESULT PANEL
                    ================================================================= */}
                <div className="pt-6 border-t border-slate-200/90 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-black tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>{decision.statutoryBadge}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetWizard}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Report</span>
                      </button>
                    </div>
                  </div>

                  {/* Highlighted Result Card */}
                  <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C65378]/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-300">
                        EXACT MANDATORY DOCUMENT REQUIRED
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                        {decision.documentName}
                      </h3>
                    </div>

                    {/* Metadata 4-Box Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
                      <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                          Issuing Authority
                        </div>
                        <div className="font-extrabold text-white">{decision.issuingAuthority}</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                          Estimated Timeline
                        </div>
                        <div className="font-extrabold text-white flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>{decision.estimatedTimeline}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                          Estimated Court / Govt Fee
                        </div>
                        <div className="font-extrabold text-emerald-300">
                          {decision.estimatedCourtFee}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                          Bank Rejection Risk
                        </div>
                        <div
                          className={`font-black uppercase tracking-wider flex items-center gap-1 ${
                            decision.rejectionRisk === "Critical" || decision.rejectionRisk === "High"
                              ? "text-rose-400"
                              : "text-emerald-300"
                          }`}
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{decision.rejectionRisk} Risk</span>
                        </div>
                      </div>
                    </div>

                    {/* Warning Callout Box */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Institutional Caution:</strong> {decision.rejectionReason}
                      </div>
                    </div>

                    {/* Actionable Next Steps */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Recommended Action Plan:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                        {decision.recommendedActions.map((action, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call to Actions inside Result */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        href="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Consult Succession Advocate</span>
                      </Link>
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Prevent This with a Will</span>
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
                  <span>STATUTORY VISUAL GUIDE: LEGAL HEIR VS SUCCESSION CERTIFICATE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/legal-heir-vs-succession-certificate-decision-tool-og.jpg"
                  alt="Legal Heir vs Succession Certificate Decision Tool India - Statutory Jurisdictional Guide"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* SECTION 3: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY COMPARISON MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Detailed Comparison: Five Key Post-Death Documents
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding the legal distinctions between these five certificates prevents
                jurisdictional errors and institutional rejections.
              </p>

              {/* Responsive Table Wrapper */}
              <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                      <th className="p-3.5 font-bold uppercase tracking-wider w-[18%]">Feature / Parameter</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider w-[20%] text-rose-300">
                        Legal Heir Certificate (LHC)
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider w-[21%] text-emerald-300">
                        Succession Certificate (SC)
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider w-[21%]">
                        Probate of Will
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider w-[20%]">
                        Surviving Member Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Governing Statute</td>
                      <td className="p-3.5">State Land Revenue Rules</td>
                      <td className="p-3.5 font-semibold text-slate-900 bg-emerald-50/40">
                        Indian Succession Act, 1925 (Part X s. 370)
                      </td>
                      <td className="p-3.5">Indian Succession Act, 1925 (Part VIII s. 217)</td>
                      <td className="p-3.5">Delhi Revenue Department e-District Rules</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Issuing Authority</td>
                      <td className="p-3.5">Tehsildar / Talukdar / RDO / e-District</td>
                      <td className="p-3.5 font-semibold text-slate-900 bg-emerald-50/40">
                        Civil Judge / District Judge Court
                      </td>
                      <td className="p-3.5">High Court / District Court (Testamentary)</td>
                      <td className="p-3.5">SDM / Tehsildar (Delhi Revenue Dept)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Asset Scope</td>
                      <td className="p-3.5">Administrative &amp; Revenue Record Mutation</td>
                      <td className="p-3.5 font-semibold text-rose-700 bg-emerald-50/40">
                        Strictly Movable (Debts, Banks, Shares, FDs)
                      </td>
                      <td className="p-3.5">Both Movable and Immovable Assets in Will</td>
                      <td className="p-3.5">Delhi Municipal &amp; SRO Land Mutation</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Conclusive Title Proof</td>
                      <td className="p-3.5 text-rose-600 font-semibold">No (Fiscal / Administrative only)</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/40">
                        Yes for Debts (Sec 381 Full Indemnity)
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">Yes (Judgment in Rem)</td>
                      <td className="p-3.5 text-rose-600 font-semibold">No (Administrative only)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Bank Acceptance</td>
                      <td className="p-3.5">Only for Small Balances (&lt; ₹5L) with Indemnity</td>
                      <td className="p-3.5 font-bold text-slate-900 bg-emerald-50/40">
                        100% Mandatory for Large Non-Nominee Balances
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">100% Mandatory if Will Bequests Funds</td>
                      <td className="p-3.5">Accepted in Delhi for claims with Indemnity</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">SEBI Demat &gt; ₹15L</td>
                      <td className="p-3.5 text-rose-600 font-semibold">Rejected by RTAs (CAMS/KFin)</td>
                      <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/40">
                        Mandatory under SEBI Circular
                      </td>
                      <td className="p-3.5 text-emerald-700 font-bold">Accepted under SEBI Circular</td>
                      <td className="p-3.5 text-rose-600 font-semibold">Rejected if &gt; ₹15 Lakhs</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Newspaper Citation</td>
                      <td className="p-3.5">Not Required (Local Notice Board)</td>
                      <td className="p-3.5 font-semibold text-slate-900 bg-emerald-50/40">
                        Mandatory (English &amp; Vernacular Dailies)
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900">Mandatory (Official Gazette / Dailies)</td>
                      <td className="p-3.5">Not Required</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Typical Timeline</td>
                      <td className="p-3.5">15 to 30 Days</td>
                      <td className="p-3.5 font-semibold text-slate-900 bg-emerald-50/40">6 to 9 Months</td>
                      <td className="p-3.5">6 to 12 Months</td>
                      <td className="p-3.5">15 to 21 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-50/60">Government / Court Fee</td>
                      <td className="p-3.5">Nominal (₹50 - ₹200)</td>
                      <td className="p-3.5 font-semibold text-slate-900 bg-emerald-50/40">
                        2% to 7.5% Ad Valorem (MH capped ₹75k)
                      </td>
                      <td className="p-3.5">State Specific Ad Valorem Schedule</td>
                      <td className="p-3.5">Nominal e-District Fee (₹50)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: BANK ACCOUNTS & FDs */}
            <section id="bank-claims-rbi" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>BANKING REGULATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Bank Accounts &amp; FDs: RBI Master Circular Thresholds
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Reserve Bank of India has issued comprehensive directives under its Master Direction
                  on Customer Service in Banks (DBR.No.Leg.BC.21/09.07.006/2015-16) governing deceased
                  depositor claims. Many claimants assume banks are deliberately withholding funds, but
                  branches operate under strict legal liability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>When There IS a Registered Nominee</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 45ZA to 45ZF of the Banking Regulation Act, 1949, the bank must settle
                      the claim to the nominee within <strong>15 days</strong> of receiving the death
                      certificate and KYC. The bank CANNOT demand a succession certificate, probate, or
                      sureties unless restrained by a civil court injunction.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                      <span>When There is NO Nominee (Intestate)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For accounts without nomination, RBI mandates each bank to fix a Board-approved
                      threshold (typically ₹5 Lakhs for public banks, up to ₹15 Lakhs for private banks)
                      where claims can be settled on an Indemnity Bond with two sureties. If the balance
                      exceeds this limit, banks legally insist on a <strong>Succession Certificate</strong>.
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Why Section 381 Matters to Banks:</strong> Under Section 381 of the Indian
                  Succession Act, 1925, payment made by a debtor (bank) to the holder of a Succession
                  Certificate affords full indemnity against all claims. If a bank pays based on a Tehsildar
                  certificate and an estranged child or second wife surfaces later, the bank can be sued for
                  wrongful disbursement. A Succession Certificate protects the bank from all future litigation.
                </p>
              </div>
            </section>

            {/* SECTION 5: DEMAT & MUTUAL FUNDS */}
            <section id="demat-shares-sebi" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>SEBI CAPITAL MARKET RULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Demat &amp; Mutual Funds: SEBI Simplified Transmission
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For physical share certificates, demat accounts with CDSL or NSDL, and mutual fund units
                  serviced by CAMS or KFintech, the Securities and Exchange Board of India (SEBI) has
                  standardized transmission procedures to protect genuine investors.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="font-extrabold text-sm text-slate-900">
                    SEBI Two-Tier Transmission Framework (No Nominee Cases)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1">
                      <div className="font-bold text-emerald-900">Portfolio Up to ₹15 Lakhs (Demat)</div>
                      <p className="text-slate-600">
                        Transmission granted without court order. Requires Form ISR-5, Indemnity Bond
                        (Annexure D) on non-judicial stamp paper with one surety, and NOC from non-claiming
                        heirs (Annexure C).
                      </p>
                    </div>

                    <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl space-y-1">
                      <div className="font-bold text-rose-900">Portfolio Exceeding ₹15 Lakhs</div>
                      <p className="text-slate-600">
                        Court order strictly mandatory. Depository Participants (DPs) and RTAs must insist
                        on a <strong>Civil Court Succession Certificate</strong>, Probate of Will, or
                        Letters of Administration.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 pt-1">
                    *Note: For physical share certificates, SEBI has fixed a lower threshold of ₹5 Lakhs per
                    issuer company. For claiming shares transferred to the <strong>IEPF Authority</strong>
                    (Investor Education and Protection Fund), an unbending Succession Certificate or Probate
                    is mandated regardless of portfolio value if no nominee was registered.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: IMMOVABLE PROPERTY */}
            <section id="immovable-property" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>REAL ESTATE &amp; LAND RULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Immovable Property: Revenue Mutation vs Civil Court
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most persistent errors made by property buyers and heirs in India is applying
                  for a Succession Certificate for land, independent houses, or apartments.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Statutory Exclusion: Section 370(1) Indian Succession Act</span>
                  </div>
                  <p className="leading-relaxed">
                    Under Section 370(1), a Succession Certificate can be granted ONLY in respect of any
                    &ldquo;debt or security&rdquo;. The Supreme Court and High Courts have consistently held
                    that immovable property is NOT a debt or security. Civil courts will dismiss any petition
                    seeking a Succession Certificate for agricultural land or flats.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    How Title to Real Estate is Transferred After Demise:
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>If Deceased Left a Registered Will in Mumbai, Kolkata, or Chennai:</strong> You
                        must file for <strong>Probate</strong> before the High Court. Society transfer and
                        Sub-Registrar mutation cannot be executed without it (Section 213).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>If Deceased Left a Registered Will Outside Presidency Towns:</strong> In Delhi,
                        UP, Bengaluru, and Pune, you can present the registered Will directly to the
                        Tehsildar / SRO alongside legal heir death records for revenue mutation without
                        mandatory probate.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>If Deceased Died Without a Will (Intestate):</strong> Heirs obtain a
                        <strong>Legal Heir Certificate</strong> (or Surviving Member Certificate in Delhi),
                        execute a registered Relinquishment Deed / Partition Deed among themselves, and
                        apply for Khata / 7/12 / Patta mutation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="court-procedure-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>LEGAL PROCEDURE GUIDE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Obtaining Succession Certificate
              </h2>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  When institutional thresholds or bank legal departments mandate a Civil Court Succession
                  Certificate under Section 370, follow this verified 6-step litigation protocol:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Territorial Jurisdiction &amp; Valuation Audit (Section 371)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Identify the Senior Civil Judge or District Delegate having territorial jurisdiction
                        where the deceased ordinarily resided at the time of death, or where the movable
                        assets are located. Collect bank valuation certificates, demat statements, and FD
                        receipts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Drafting &amp; Verification of Petition (Section 372)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Draft the petition containing the exact date and place of demise, genealogical family
                        tree, surviving Class I heirs, absence of rival claimants, and the verified Schedule
                        of Debts and Securities with account numbers and balances.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Notice Issuance &amp; Mandatory Newspaper Citations (Section 373)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The court issues notices to all named respondents and orders publication of citations
                        in two daily newspapers (one English, one vernacular). A mandatory 30 to 45-day
                        window is allowed for public objections.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Recording Petitioner Evidence &amp; Verification
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        When no objections are received, the petitioner steps into the witness box to tender
                        their examination-in-chief affidavit and produce original documents: Death
                        Certificate, Aadhaar cards, bank passbooks, and citation publication newspapers.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Deposition of Ad Valorem Court Fees (Section 379)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The judge pronounces judgment granting the certificate. The petitioner deposits the
                        state-specific ad valorem court fee stamp papers or e-court fee receipt into court.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                      6
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900">
                        Sealing &amp; Execution of Final Certificate (Section 374)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The court registrar draws up the final Succession Certificate bearing the seal of the
                        Civil Court and signature of the Judge. This document is served upon banks and
                        companies for full disbursement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: STATE-WISE COURT FEES */}
            <section id="court-fee-schedules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>COURT FEES &amp; COSTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. State-Wise Court Fees &amp; Ad Valorem Stamp Duty Rates
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Court fee for succession certificates is a state subject under Entry 3 of List II of the
                  Seventh Schedule to the Constitution of India. The fee is charged as an ad valorem
                  percentage of the total estate value specified in the petition schedule.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="p-3 font-bold uppercase tracking-wider">State / Territory</th>
                        <th className="p-3 font-bold uppercase tracking-wider">Applicable Court Fee Rate</th>
                        <th className="p-3 font-bold uppercase tracking-wider">Maximum Statutory Cap</th>
                        <th className="p-3 font-bold uppercase tracking-wider">Governing Act</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Maharashtra (Mumbai/Pune)</td>
                        <td className="p-3">2% up to ₹50,000; 7.5% on balance</td>
                        <td className="p-3 font-bold text-emerald-700">Strictly Capped at ₹75,000</td>
                        <td className="p-3">Maharashtra Court Fees Act, 1959 Schedule I Art. 12</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Delhi NCR</td>
                        <td className="p-3">Approx 4% ad valorem</td>
                        <td className="p-3 text-rose-700 font-semibold">No Upper Cap</td>
                        <td className="p-3">Court Fees Act, 1870 (Delhi Amendment)</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Karnataka (Bengaluru)</td>
                        <td className="p-3">2.5% to 6% graduated slabs</td>
                        <td className="p-3 text-rose-700 font-semibold">No Upper Cap</td>
                        <td className="p-3">Karnataka Court Fees &amp; Suits Valuation Act, 1958</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">West Bengal (Kolkata)</td>
                        <td className="p-3">2% on first ₹50,000; 3% to 5% beyond</td>
                        <td className="p-3 text-rose-700 font-semibold">No Upper Cap</td>
                        <td className="p-3">West Bengal Court Fees Act</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Tamil Nadu (Chennai)</td>
                        <td className="p-3">3% ad valorem</td>
                        <td className="p-3 text-rose-700 font-semibold">No Upper Cap</td>
                        <td className="p-3">Tamil Nadu Court Fees Act, 1955</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Uttar Pradesh</td>
                        <td className="p-3">Approx 5% ad valorem</td>
                        <td className="p-3 text-rose-700 font-semibold">No Upper Cap</td>
                        <td className="p-3">Court Fees (UP Amendment) Act</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-600">
                  Tip: In high-value demat and bank claims in Maharashtra, the ₹75,000 court fee cap makes
                  civil court succession certificates significantly more cost-effective than other states
                  where 4% to 5% uncapped fees can amount to several lakhs.
                </p>
              </div>
            </section>

            {/* SECTION 9: REAL PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>REAL LITIGATION PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Real Post-Death Scenarios
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: SBI ₹28 Lakh FD Rejection in Delhi
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Bank Rejection
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father passed away in Rohini, Delhi leaving ₹28 Lakhs in SBI fixed deposits with no
                    nominee. The two sons spent 3 months obtaining a Tehsildar Legal Heir Certificate. The SBI
                    branch manager rejected it, citing internal policy capping non-nominee indemnity claims at
                    ₹5 Lakhs.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Initial Tehsildar LHC Result:</span>
                      <span className="font-bold text-rose-600">Rejected by SBI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Correct Statutory Remedy:</span>
                      <span className="font-bold text-slate-900">Section 370 Succession Certificate</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Final Court Order:</span>
                      <span>Granted in 7 Months; ₹28L Released with Interest</span>
                    </div>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: ₹65 Lakh Demat Portfolio in Mumbai
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      SEBI Rules
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A deceased mother left listed equity shares worth ₹65 Lakhs in a Zerodha demat account
                    without nomination. The heirs attempted transmission via Form ISR-5 indemnity bond.
                    Zerodha rejected the application because the portfolio exceeded the ₹15 Lakh SEBI cap.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">SEBI ₹15L Exemption Status:</span>
                      <span className="font-bold text-rose-600">Ineligible (Exceeded Cap)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Court Fee Paid in Mumbai:</span>
                      <span className="font-bold text-slate-900">₹75,000 (Capped)</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Outcome:</span>
                      <span>Bombay City Civil Court granted certificate; 100% shares transmitted</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPY-PASTE LEGAL FORMATS */}
            <section id="legal-templates-formats" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTEABLE LEGAL ASSETS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Legal Formats &amp; Document Checklist
              </h2>

              {/* Template Box 1: Bank Deceased Claim Indemnity Bond */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Format 1: Standard Bank Deceased Claim Indemnity Bond (RBI Annexure Compliant)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `STANDARD INDEMNITY BOND FOR SETTLEMENT OF DECEASED DEPOSITOR ACCOUNT WITHOUT NOMINATION (RBI COMPLIANT):

TO: The Branch Manager, [Name of Bank], [Branch Name & Address]

WHEREAS late [Full Name of Deceased], residing at [Deceased Full Residential Address], who was holding Account No. [Savings / Current / FD Account No.] with your branch, died intestate on [Date of Death] at [Place of Death], leaving behind the following legal heirs:
1. [Name of Heir 1], [Age], [Relationship, e.g., Wife]
2. [Name of Heir 2], [Age], [Relationship, e.g., Son]
3. [Name of Heir 3], [Age], [Relationship, e.g., Daughter]

AND WHEREAS the said deceased died without executing any Last Will and Testament and without appointing any nominee on record for the aforesaid account;

AND WHEREAS the total balance lying to the credit of the said account as on date is Rs. [Amount in Figures]/- (Rupees [Amount in Words] only);

AND WHEREAS we, the undersigned legal heirs, have mutually agreed and requested the Bank to settle and pay the entire balance lying in the said account to [Name of Primary Claiming Heir], and we the other co-heirs hereby convey our unequivocal No Objection to the same;

NOW THIS DEED OF INDEMNITY WITNESSETH that in consideration of the Bank agreeing at our request to pay the aforesaid balance without production of a Civil Court Succession Certificate or Letters of Administration, WE, the undersigned Claimants AND the Sureties jointly and severally agree to indemnify and hold harmless the Bank, its successors, and assigns against all claims, demands, actions, proceedings, losses, and damages which may be raised or suffered by the Bank in connection with the said disbursement.

IN WITNESS WHEREOF the Claimants and Sureties have hereunto set their hands on this [Day] day of [Month], [Year].
Claimant Signatures: 1. ____________  2. ____________
Surety 1 (Name & Address): ___________________________ Signature: ____________
Surety 2 (Name & Address): ___________________________ Signature: ____________`,
                        "template1"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate === "template1" ? (
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
{`STANDARD INDEMNITY BOND FOR SETTLEMENT OF DECEASED DEPOSITOR ACCOUNT WITHOUT NOMINATION (RBI COMPLIANT):

TO: The Branch Manager, [Name of Bank], [Branch Name & Address]

WHEREAS late [Full Name of Deceased], residing at [Deceased Residential Address], holding Account No. [Account No.] with your branch, died intestate on [Date of Death], leaving behind the following legal heirs:
1. [Name of Heir 1], [Age], [Relationship, e.g., Wife]
2. [Name of Heir 2], [Age], [Relationship, e.g., Son]
3. [Name of Heir 3], [Age], [Relationship, e.g., Daughter]

AND WHEREAS the said deceased died without executing any Will and without appointing any nominee on record;

AND WHEREAS the total balance lying to the credit of the said account is Rs. [Amount in Figures]/-;

NOW THIS DEED OF INDEMNITY WITNESSETH that in consideration of the Bank paying the balance to [Name of Primary Claiming Heir], WE, the undersigned Claimants and Sureties jointly and severally indemnify the Bank against all future claims, losses, or legal actions.`}
                </pre>
              </div>

              {/* Template Box 2: Section 372 Schedule of Debts */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Format 2: Section 372 Schedule of Debts &amp; Securities (Civil Court Petition)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `SCHEDULE OF DEBTS AND SECURITIES UNDER SECTION 372 OF THE INDIAN SUCCESSION ACT, 1925:

IN THE COURT OF THE PRINCIPAL DISTRICT & SESSIONS JUDGE / SENIOR CIVIL JUDGE AT [DISTRICT NAME]
TESTAMENTARY SUCCESSION PETITION NO. [____] OF 2026

SCHEDULE 'A': PARTICULARS OF MOVABLE DEBTS & SECURITIES OF THE DECEASED [NAME OF DECEASED]:

Item 1:
- Name of Debtor / Bank: State Bank of India, [Branch Name]
- Description of Debt: Savings Bank Account No. [____]
- Ledger Balance as on date of death: Rs. [____]/-
- Accrued Interest up to filing: Rs. [____]/-
- Total Claim Amount: Rs. [____]/-

Item 2:
- Name of Company / Depository: CDSL / [Company Name, e.g., Tata Motors Ltd]
- Description of Security: [Number] Equity Shares, ISIN: [____], Folio / DP ID: [____]
- Market Value as on date of death: Rs. [____]/-

Item 3:
- Name of Mutual Fund / RTA: HDFC Mutual Fund (Folio No. [____])
- Description: [Number] Units in [Scheme Name]
- NAV Valuation as on date of petition: Rs. [____]/-

TOTAL GROSS VALUE OF DEBTS AND SECURITIES: Rs. [____]/-
AD VALOREM COURT FEES PAYABLE THEREON: Rs. [____]/-

VERIFICATION:
I, [Name of Petitioner], do hereby verify and declare that the contents of Schedule 'A' above are true to my personal knowledge, verified from official bank records, and nothing material has been concealed therefrom.
Verified at [Place] on this [Day] day of [Month], [Year].
Petitioner Signature: __________________`,
                        "template2"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate === "template2" ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Exact bank account number and ledger balance certification</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Demat DP ID, Client ID, ISIN codes, and share market value</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mutual fund folio numbers and certified NAV holding statements</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Statutory verification clause sworn before Oath Commissioner</span>
                  </div>
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
                      WillDrafting.in Succession &amp; Testamentary Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Succession Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading estate planning and succession technology
                  platform, powered by AMA Legal Solutions. Our multidisciplinary testamentary bench
                  comprises senior advocates practicing across High Courts, District Courts, and Revenue
                  Tribunals. We have structured over 15,000 challenge-proof Wills and successfully assisted
                  hundreds of families in securing Succession Certificates, uncontested High Court probates,
                  and expedited bank deceased claim settlements pan-India.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/succession-certificate"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession Certificate Petition Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir &amp; SMC Filing Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Requirement Checker</span>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Succession &amp; Heirship
              </h2>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform text-slate-500 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
                <ExternalLink className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Official Government Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>RBI Deceased Depositor Master Circular</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>SEBI Transmission of Securities Master Circular</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://edistrict.delhigovt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Delhi e-District SMC Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://services.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>eCourts Services Case Status Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Bombay High Court Testamentary Department</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators &amp; Succession Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Succession Share Calculator
                    </Link>
                    <Link
                      href="/tools/succession-certificate-court-fee-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Court Fee Calculator India
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Capital Gains Calculator
                    </Link>
                    <Link
                      href="/tools/will-validity-section-63-audit-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Validity Section 63 Checker
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
                Specialist in Indian succession jurisprudence, High Court testamentary proceedings,
                Succession Certificate petitions under Section 370, and cross-border estate disputes.
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
                  <span>PREVENT FUTURE FAMILY LAWSUITS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Save Your Heirs 9 Months in Civil Court
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Without a Will, your family will spend ₹75,000+ in court fees and endure 9 months of
                  hearings to claim their own inheritance. A legally registered Will eliminates succession
                  certificates completely.
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
                  <span>CIVIL COURT PETITION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Bank Rejection or Disputed Succession?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary litigators file Section 372 petitions, publish court citations, and
                  obtain Succession Certificates and High Court probates pan-India.
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
                      <strong>Part X Precision:</strong> Distinguishes movable debts from immovable land.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>RBI &amp; SEBI Alignment:</strong> Factors in latest bank and demat threshold circulars.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Costs:</strong> Accurate state-wise court fee calculation.
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
          href="#decision-wizard"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Decision Tool</span>
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
