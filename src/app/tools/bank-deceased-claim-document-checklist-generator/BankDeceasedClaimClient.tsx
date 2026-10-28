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
  Shield,
  FileSpreadsheet,
  AlertCircle,
  FolderCheck,
} from "lucide-react";

// Top 12 Indian Banks Configuration & Board-Approved Deceased Claim Thresholds
interface BankConfig {
  name: string;
  shortName: string;
  simplifiedThreshold: number; // in INR
  courtOrderTrigger: number; // in INR
  suretiesRequired: number;
  claimFormName: string;
  disclaimerFormName: string;
  indemnityFormName: string;
  suretyFormName: string;
  processingTatDays: number;
  portalUrl: string;
  notes: string;
}

const TOP_BANKS: Record<string, BankConfig> = {
  sbi: {
    name: "State Bank of India (SBI)",
    shortName: "SBI",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Annexure-A (Application for Settlement of Claim)",
    disclaimerFormName: "Annexure-C (Letter of Disclaimer on Stamp Paper)",
    indemnityFormName: "Annexure-D (Letter of Indemnity on Stamp Paper)",
    suretyFormName: "Annexure-E (Letter of Guarantee & Net Worth Declaration)",
    processingTatDays: 15,
    portalUrl: "https://sbi.co.in",
    notes: "Threshold revised to ₹5,00,000 under revised deceased depositor policy.",
  },
  hdfc: {
    name: "HDFC Bank",
    shortName: "HDFC",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 1000000,
    suretiesRequired: 2,
    claimFormName: "Form 8 (Deceased Claim Application Form)",
    disclaimerFormName: "Form 8C (Letter of Relinquishment / Disclaimer)",
    indemnityFormName: "Form 8B (Indemnity cum Guarantee Agreement)",
    suretyFormName: "Form 8A (Declaration of Sureties with ITR Proof)",
    processingTatDays: 15,
    portalUrl: "https://www.hdfcbank.com",
    notes: "Branch discretion up to ₹5 Lakhs; Circle Head approval up to ₹10 Lakhs.",
  },
  icici: {
    name: "ICICI Bank",
    shortName: "ICICI",
    simplifiedThreshold: 1000000,
    courtOrderTrigger: 1000000,
    suretiesRequired: 2,
    claimFormName: "Form D2 (Deceased Claim Form without Nominee)",
    disclaimerFormName: "Annexure III (Consent & Relinquishment Declaration)",
    indemnityFormName: "Annexure I (Letter of Indemnity on Stamp Paper)",
    suretyFormName: "Annexure II (Surety Information & Net Worth Sheet)",
    processingTatDays: 15,
    portalUrl: "https://www.icicibank.com",
    notes: "Highest simplified private bank limit: up to ₹10,00,000 without court order.",
  },
  pnb: {
    name: "Punjab National Bank (PNB)",
    shortName: "PNB",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "PNB Form 1093 (Settlement Claim Form without Nominee)",
    disclaimerFormName: "PNB Form 1096 (Letter of Relinquishment)",
    indemnityFormName: "PNB Form 1094 (Indemnity Bond on Stamp Paper)",
    suretyFormName: "PNB Form 1095 (Surety Undertaking & Financial Proof)",
    processingTatDays: 15,
    portalUrl: "https://www.pnbindia.in",
    notes: "₹5,00,000 threshold strictly enforced across all nationalized branches.",
  },
  bob: {
    name: "Bank of Baroda (BoB)",
    shortName: "BoB",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Form 237 (Deceased Claim Form Non-Nominee)",
    disclaimerFormName: "Form 239 (Letter of Relinquishment / Disclaimer)",
    indemnityFormName: "Form 238 (Letter of Indemnity with Sureties)",
    suretyFormName: "Form 240 (Surety Net Worth & Assessment Statement)",
    processingTatDays: 15,
    portalUrl: "https://www.bankofbaroda.in",
    notes: "Claims above ₹5 Lakhs require District Court Succession Certificate.",
  },
  axis: {
    name: "Axis Bank",
    shortName: "Axis Bank",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Form DA (Deceased Depositor Settlement Form)",
    disclaimerFormName: "Annexure IV (Letter of Disclaimer by Legal Heirs)",
    indemnityFormName: "Annexure III (Letter of Indemnity on Stamp Paper)",
    suretyFormName: "Annexure V (Surety Net Worth & KYC Declaration)",
    processingTatDays: 15,
    portalUrl: "https://www.axisbank.com",
    notes: "Centralized legal approval required for non-nominee claims exceeding ₹2 Lakhs.",
  },
  canara: {
    name: "Canara Bank",
    shortName: "Canara",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "NF 745 (Claim Application without Nomination)",
    disclaimerFormName: "NF 747 (Letter of Disclaimer & Consent)",
    indemnityFormName: "NF 746 (Indemnity cum Surety Bond on Stamp Paper)",
    suretyFormName: "NF 748 (Declaration of Respectable Persons & Sureties)",
    processingTatDays: 15,
    portalUrl: "https://canarabank.com",
    notes: "Accepts Tahsildar Family Tree / Surviving Member Certificate as primary proof.",
  },
  union: {
    name: "Union Bank of India",
    shortName: "Union Bank",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Form CD-2 (Settlement Application for Legal Heirs)",
    disclaimerFormName: "Annexure III (Letter of Relinquishment by Legal Heirs)",
    indemnityFormName: "Annexure II (Indemnity Bond on Non-Judicial Stamp Paper)",
    suretyFormName: "Annexure IV (Surety Statement & Income Assessment)",
    processingTatDays: 15,
    portalUrl: "https://www.unionbankofindia.co.in",
    notes: "Settled at Regional Office level for balances between ₹2 Lakhs and ₹5 Lakhs.",
  },
  kotak: {
    name: "Kotak Mahindra Bank",
    shortName: "Kotak",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Form KMBL-DC2 (Deceased Claim Application Form)",
    disclaimerFormName: "Annexure 3 (Relinquishment & Disclaimer Affidavit)",
    indemnityFormName: "Annexure 2 (Indemnity Bond with 2 Sureties)",
    suretyFormName: "Annexure 4 (Surety Income & Net Worth Declaration)",
    processingTatDays: 15,
    portalUrl: "https://www.kotak.com",
    notes: "Sureties must hold active bank accounts with minimum 2-year clean history.",
  },
  indusind: {
    name: "IndusInd Bank",
    shortName: "IndusInd",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "IB-DC Form 2 (Claim Form for Heirs without Nominee)",
    disclaimerFormName: "Schedule C (Legal Heir Relinquishment Letter)",
    indemnityFormName: "Schedule B (Indemnity Agreement on Stamp Paper)",
    suretyFormName: "Schedule D (Surety Guarantee & Salary/ITR Copy)",
    processingTatDays: 15,
    portalUrl: "https://www.indusind.com",
    notes: "Mandatory video KYC verification of all claiming legal heirs.",
  },
  boi: {
    name: "Bank of India (BoI)",
    shortName: "BoI",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Form L-2 (Application for Settlement without Nominee)",
    disclaimerFormName: "Form L-4 (Disclaimer & No Objection Certificate)",
    indemnityFormName: "Form L-3 (Letter of Indemnity on Requisite Stamp Paper)",
    suretyFormName: "Form L-5 (Surety Declaration & Net Worth Statement)",
    processingTatDays: 15,
    portalUrl: "https://bankofindia.co.in",
    notes: "Branch manager authorized up to ₹1 Lakh; Assistant General Manager up to ₹5 Lakhs.",
  },
  central: {
    name: "Central Bank of India",
    shortName: "Central Bank",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Annexure A (Settlement Form for Deceased Depositors)",
    disclaimerFormName: "Annexure C (Relinquishment of Claim by Legal Heirs)",
    indemnityFormName: "Annexure B (Letter of Indemnity cum Guarantee)",
    suretyFormName: "Annexure D (Surety Net Worth & Assessment Report)",
    processingTatDays: 15,
    portalUrl: "https://centralbankofindia.co.in",
    notes: "Public sector guidelines mandate settlement within 15 days upon complete papers.",
  },
  other: {
    name: "Other Scheduled Commercial Bank",
    shortName: "Commercial Bank",
    simplifiedThreshold: 500000,
    courtOrderTrigger: 500000,
    suretiesRequired: 2,
    claimFormName: "Standard Deceased Depositor Claim Application",
    disclaimerFormName: "Standard Legal Heir Disclaimer / Relinquishment Letter",
    indemnityFormName: "Indemnity Bond on Non-Judicial Stamp Paper",
    suretyFormName: "Surety Net Worth Declaration with Financial Proof",
    processingTatDays: 15,
    portalUrl: "https://www.rbi.org.in",
    notes: "RBI Master Direction sets standard ceiling between ₹5,00,000 and ₹10,00,000.",
  },
};

// State-wise Stamp Paper Values for Bank Indemnity Bonds
const STAMP_DUTY_BY_STATE: Record<string, { stampDuty: string; notaryRequired: boolean }> = {
  maharashtra: { stampDuty: "₹500 Non-Judicial Stamp Paper", notaryRequired: true },
  delhi: { stampDuty: "₹100 to ₹200 Non-Judicial e-Stamp Paper", notaryRequired: true },
  karnataka: { stampDuty: "₹200 to ₹500 e-Stamp Paper", notaryRequired: true },
  tamilnadu: { stampDuty: "₹100 Non-Judicial Stamp Paper", notaryRequired: true },
  up: { stampDuty: "₹100 to ₹500 Non-Judicial Stamp Paper", notaryRequired: true },
  westbengal: { stampDuty: "₹100 Non-Judicial Stamp Paper", notaryRequired: true },
  gujarat: { stampDuty: "₹300 to ₹500 Non-Judicial Stamp Paper", notaryRequired: true },
  telangana: { stampDuty: "₹100 Non-Judicial Stamp Paper", notaryRequired: true },
  other: { stampDuty: "₹100 to ₹500 Non-Judicial Stamp Paper (Check local stamp schedule)", notaryRequired: true },
};

const TOC_ITEMS = [
  { id: "rbi-statutory-framework", label: "1. RBI Master Directions: Settlement of Deceased Claims" },
  { id: "interactive-checklist-tool", label: "2. Bank Deceased Claim Document Checklist Generator" },
  { id: "nominee-vs-legal-heir", label: "3. Nominee vs Legal Heir Rights: Banking Regulation Act" },
  { id: "bank-threshold-comparison", label: "4. Top 12 Indian Banks Deceased Claim Threshold Limits" },
  { id: "indemnity-surety-rules", label: "5. Indemnity Bond & Surety Requirements for Bank Claims" },
  { id: "locker-safe-custody-rules", label: "6. Safety Locker & Safe Custody Claim Rules After Demise" },
  { id: "succession-certificate-trigger", label: "7. When Is a Court Succession Certificate Truly Mandatory?" },
  { id: "step-by-step-claim-sop", label: "8. Step-by-Step SOP: Claiming Bank Balance of Deceased" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: SBI, HDFC & ICICI Bank Claims" },
  { id: "copy-paste-templates", label: "10. Copy-Paste Bank Deceased Claim Affidavits & Bonds" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence & Trust" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Bank Deceased Claims" },
  { id: "statutory-citations", label: "13. Statutory Citations & Official Banking Portals" },
];

const FAQS = [
  {
    q: "How do I claim money from a deceased person's bank account in India?",
    a: "To claim money from a deceased depositor's account, check if a nominee is registered. If a registered nominee exists, submit the bank claim form, original death certificate, nominee KYC documents, and passbook. The bank will release funds within 15 days. If no nominee exists, all legal heirs must jointly submit claim forms, legal heir certificate, letter of disclaimer, and an indemnity bond with sureties.",
  },
  {
    q: "What is the maximum balance a bank can settle without a succession certificate?",
    a: "Under RBI Master Directions, every bank's Board fixes an indemnity threshold for settling claims without demanding a court succession certificate. For State Bank of India, Punjab National Bank, Bank of Baroda, and Axis Bank, this threshold is ₹5,00,000. ICICI Bank allows simplified settlement up to ₹10,00,000 against an indemnity bond and solvent sureties.",
  },
  {
    q: "Does a nominee become the absolute owner of the deceased's bank account?",
    a: "No. The Supreme Court of India held in Smt. Sarbati Devi v. Smt. Usha Devi and Ram Chander Talwar v. Devender Kumar Talwar that a nominee is merely a statutory trustee authorized to receive funds and give a valid discharge to the bank. The money forms part of the deceased person's estate and belongs to the legal heirs under personal succession law.",
  },
  {
    q: "How much time does a bank have to settle a deceased claim under RBI guidelines?",
    a: "Under RBI Master Direction on Customer Service in Banks (DBR.No.Leg.BC.21/09.07.006/2015-16), banks are strictly mandated to settle claims in respect of deceased depositors and release payments to survivors or nominees within a period not exceeding 15 calendar days from the date of receipt of the complete claim.",
  },
  {
    q: "What documents are required to claim a bank account without a nominee?",
    a: "Documents required for non-nominee claims include: (1) Prescribed Bank Deceased Claim Form signed by all legal heirs, (2) Original death certificate, (3) Revenue Legal Heir Certificate or Surviving Member Certificate, (4) Letter of Disclaimer (Annexure C) from heirs relinquishing rights, (5) Indemnity Bond (Annexure D) on non-judicial stamp paper, (6) Two solvent sureties with income proof, and (7) KYC documents of all heirs.",
  },
  {
    q: "Why do banks ask for two sureties or guarantors on an indemnity bond?",
    a: "When a claim is settled without a court order, banks require an Indemnity Bond signed by the claimant and two independent solvent sureties. This protects the bank against financial liability in case another unknown legal heir or creditor subsequently emerges and claims the deposited funds.",
  },
  {
    q: "How can legal heirs claim contents of a bank safety locker after the holder dies?",
    a: "Under Section 45ZE of the Banking Regulation Act, 1949, if a locker has a registered nominee, the bank allows locker access to the nominee after preparing an inventory in the presence of the branch manager, nominee, and two independent witnesses. If there is no nominee, all legal heirs must jointly attend the inventory or provide a registered power of attorney.",
  },
  {
    q: "What can I do if a bank branch manager refuses to settle a claim without a court order?",
    a: "If the account balance is below the bank Board threshold and no court injunction exists, demanding a succession certificate violates RBI circular DBOD.No.Leg.BC.95/2004-05. You can submit a formal written grievance to the Branch Manager citing RBI directions. If unresolved within 30 days, file an online complaint with the RBI Banking Ombudsman on the CMS portal.",
  },
];

export default function BankDeceasedClaimClient() {
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

  const [activeId, setActiveId] = useState<string>("rbi-statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  // Generator Form Inputs
  const [selectedBankKey, setSelectedBankKey] = useState<string>("sbi");
  const [accountType, setAccountType] = useState<"savings" | "fd_rd" | "joint_survivor" | "locker" | "multiple">("savings");
  const [claimAmount, setClaimAmount] = useState<number>(450000);
  const [nomineeStatus, setNomineeStatus] = useState<"registered" | "no_nominee" | "predeceased">("no_nominee");
  const [heirStatus, setHeirStatus] = useState<"sole_heir" | "multiple_amicable" | "disputed">("multiple_amicable");
  const [willStatus, setWillStatus] = useState<"no_will" | "registered_will" | "probated_will">("no_will");
  const [suretiesAvailable, setSuretiesAvailable] = useState<"yes" | "no">("yes");
  const [selectedState, setSelectedState] = useState<string>("maharashtra");

  // Checklist interactive tick items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

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

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    setSelectedBankKey("sbi");
    setAccountType("savings");
    setClaimAmount(450000);
    setNomineeStatus("no_nominee");
    setHeirStatus("multiple_amicable");
    setWillStatus("no_will");
    setSuretiesAvailable("yes");
    setSelectedState("maharashtra");
    setCheckedItems({});
  };

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

  const bank = TOP_BANKS[selectedBankKey] || TOP_BANKS.sbi;
  const stateDuty = STAMP_DUTY_BY_STATE[selectedState] || STAMP_DUTY_BY_STATE.maharashtra;

  // ==========================================
  // STATUTORY SETTLEMENT ROUTE ENGINE
  // ==========================================
  let routeCategory: "nominee_survivor" | "simplified_indemnity" | "mandatory_court" = "simplified_indemnity";
  let routeTitle = "";
  let routeBadgeColor = "";
  let routeSummary = "";
  let courtOrderRequired = false;
  let indemnityRequired = false;
  let tatDays = 15;

  if (accountType === "joint_survivor") {
    routeCategory = "nominee_survivor";
    routeTitle = "Direct Survivorship Operation (No Court Order or Indemnity Needed)";
    routeBadgeColor = "bg-blue-100 text-blue-900 border-blue-300";
    routeSummary =
      "Under RBI Circular DBOD.No.Leg.BC.95/2004-05, surviving joint account holders have immediate operational authority upon submitting the original death certificate and KYC.";
    courtOrderRequired = false;
    indemnityRequired = false;
    tatDays = 7;
  } else if (nomineeStatus === "registered" && heirStatus !== "disputed") {
    routeCategory = "nominee_survivor";
    routeTitle = "Direct Statutory Release to Registered Nominee (15-Day Rule)";
    routeBadgeColor = "bg-blue-100 text-blue-900 border-blue-300";
    routeSummary =
      "Under Section 45ZA of the Banking Regulation Act, 1949 and RBI Master Directions, the bank is legally obligated to release the deposit to the nominee within 15 calendar days without demanding an indemnity bond, surety, or court order.";
    courtOrderRequired = false;
    indemnityRequired = false;
    tatDays = 15;
  } else if (heirStatus === "disputed") {
    routeCategory = "mandatory_court";
    routeTitle = "Mandatory Civil Court Succession Certificate (Dispute Detected)";
    routeBadgeColor = "bg-rose-100 text-rose-900 border-rose-300";
    routeSummary =
      "Because legal heirs dispute the estate or have filed objections with the branch, the bank cannot settle internally. A Succession Certificate under Section 372 of the Indian Succession Act or Probate is mandatory.";
    courtOrderRequired = true;
    indemnityRequired = false;
    tatDays = 180;
  } else if (willStatus === "probated_will") {
    routeCategory = "nominee_survivor";
    routeTitle = "Settlement Based on Probated Will / Court Decree";
    routeBadgeColor = "bg-blue-100 text-blue-900 border-blue-300";
    routeSummary =
      "The executor or legatee named in the probated Will receives settlement directly upon submitting the certified court decree. No indemnity bond or surety is required.";
    courtOrderRequired = false;
    indemnityRequired = false;
    tatDays = 15;
  } else if (claimAmount > bank.courtOrderTrigger) {
    routeCategory = "mandatory_court";
    routeTitle = `Mandatory Succession Certificate (Exceeds ${bank.shortName} Limit of ${formatINR(bank.courtOrderTrigger)})`;
    routeBadgeColor = "bg-amber-100 text-amber-900 border-amber-300";
    routeSummary = `The total deposit of ${formatINR(claimAmount)} exceeds ${bank.shortName}'s Board-approved simplified threshold of ${formatINR(bank.courtOrderTrigger)}. The branch is statutorily bound to demand a Succession Certificate issued by a competent District Court.`;
    courtOrderRequired = true;
    indemnityRequired = false;
    tatDays = 180;
  } else {
    routeCategory = "simplified_indemnity";
    routeTitle = `Simplified Claim Settlement via Indemnity Bond (Within ${bank.shortName} Limit)`;
    routeBadgeColor = "bg-slate-100 text-slate-900 border-slate-300";
    routeSummary = `The deposit amount of ${formatINR(claimAmount)} is within ${bank.shortName}'s Board-approved threshold (${formatINR(bank.simplifiedThreshold)}). As per RBI directions, the branch CANNOT insist on a court order and must settle the claim against an Indemnity Bond with two solvent sureties.`;
    courtOrderRequired = false;
    indemnityRequired = true;
    tatDays = 15;
  }

  // Dynamic document checklist generation
  interface DocItem {
    id: string;
    title: string;
    category: "Identity & Demise" | "Bank Forms" | "Legal Heir Proof" | "Indemnity & Sureties" | "Locker & Special";
    mandatory: boolean;
    description: string;
  }

  const checklistDocs: DocItem[] = [
    {
      id: "doc-death-cert",
      title: "Original Death Certificate of Deceased Depositor",
      category: "Identity & Demise",
      mandatory: true,
      description: "Computerized Municipal Corporation or Registrar of Births and Deaths certificate. Carry original for branch verification plus self-attested copies.",
    },
    {
      id: "doc-passbook",
      title: `Original ${bank.shortName} Passbook, Cheque Book, or Fixed Deposit Receipts (TDR/STDR)`,
      category: "Identity & Demise",
      mandatory: true,
      description: "If passbook or FDR is misplaced, submit a formal indemnity for lost instrument along with police non-cognizable (NC) report.",
    },
    {
      id: "doc-claimant-kyc",
      title: "Officially Valid KYC Documents of Claimant(s) / Nominee",
      category: "Identity & Demise",
      mandatory: true,
      description: "Self-attested PAN Card and proof of address (Aadhaar Card, Passport, or Voter ID) of all claiming individuals, along with passport photographs.",
    },
  ];

  if (routeCategory === "nominee_survivor") {
    if (accountType === "joint_survivor") {
      checklistDocs.push({
        id: "doc-survivorship-letter",
        title: "Survivorship Operation Request Letter",
        category: "Bank Forms",
        mandatory: true,
        description: "Application by surviving account holder(s) requesting deletion of deceased holder's name and continuation or closure of the account.",
      });
    } else {
      checklistDocs.push({
        id: "doc-nominee-claim-form",
        title: `${bank.shortName} Deceased Claim Form for Nominee (DA-1 Record)`,
        category: "Bank Forms",
        mandatory: true,
        description: "Standard claim format for registered nominee. Branch cross-verifies against the original Form DA-1 recorded in core banking software.",
      });
      checklistDocs.push({
        id: "doc-bank-account-proof",
        title: "Cancelled Cheque / Bank Statement of Nominee Account",
        category: "Identity & Demise",
        mandatory: true,
        description: "For electronic credit of claim proceeds via NEFT/RTGS into nominee's individual bank account.",
      });
    }
  }

  if (routeCategory === "simplified_indemnity") {
    checklistDocs.push({
      id: "doc-bank-claim-app",
      title: `${bank.claimFormName}`,
      category: "Bank Forms",
      mandatory: true,
      description: `Complete application prescribed by ${bank.name}, duly signed by ALL surviving legal heirs of the deceased depositor.`,
    });
    checklistDocs.push({
      id: "doc-legal-heir-cert",
      title: "Revenue Legal Heir Certificate / Surviving Member Certificate",
      category: "Legal Heir Proof",
      mandatory: true,
      description: "Official certificate issued by the Revenue Tahsildar, Sub-Divisional Magistrate (SDM), or Municipal Authority establishing family tree.",
    });
    checklistDocs.push({
      id: "doc-disclaimer-relinquishment",
      title: `${bank.disclaimerFormName}`,
      category: "Legal Heir Proof",
      mandatory: heirStatus === "multiple_amicable",
      description: "Signed by all non-claiming legal heirs relinquishing their share and authorizing one heir to receive the proceeds on their behalf.",
    });
    checklistDocs.push({
      id: "doc-respectable-affidavit",
      title: "Affidavit of Two Independent Respectable Persons",
      category: "Legal Heir Proof",
      mandatory: true,
      description: "Declaration on non-judicial stamp paper from 2 neighbors, gazetted officers, or community members confirming the deceased's family members.",
    });
    checklistDocs.push({
      id: "doc-indemnity-bond",
      title: `${bank.indemnityFormName} on ${stateDuty.stampDuty}`,
      category: "Indemnity & Sureties",
      mandatory: true,
      description: `Binding legal undertaking executed by the claimant heir and ${bank.suretiesRequired} solvent sureties, notarized under Indian law.`,
    });
    checklistDocs.push({
      id: "doc-surety-kyc-proof",
      title: `${bank.suretyFormName} with Income / Net Worth Proofs`,
      category: "Indemnity & Sureties",
      mandatory: true,
      description: `Proof of solvency for ${bank.suretiesRequired} sureties (latest ITR V, salary slips, municipal property tax receipt, or chartered accountant certificate).`,
    });
  }

  if (routeCategory === "mandatory_court") {
    checklistDocs.push({
      id: "doc-succession-cert",
      title: "Certified Copy of Court Succession Certificate (with Schedule of Debts)",
      category: "Legal Heir Proof",
      mandatory: true,
      description: `Issued by competent District Court or Civil Judge under Section 372 of Indian Succession Act, specifically listing ${bank.shortName} account & balance.`,
    });
    checklistDocs.push({
      id: "doc-court-petition-copy",
      title: "Certified Copy of Succession Petition & Order Sheet",
      category: "Legal Heir Proof",
      mandatory: true,
      description: "Complete certified pleadings showing notice publication in newspapers and absence of pending appeals or stays.",
    });
    checklistDocs.push({
      id: "doc-court-claim-app",
      title: `${bank.shortName} Formal Disbursement Application by Certificate Holder`,
      category: "Bank Forms",
      mandatory: true,
      description: "Disbursement request submitted by the person in whose name the court has granted succession certificate / letters of administration.",
    });
  }

  if (accountType === "locker") {
    checklistDocs.push({
      id: "doc-locker-keys",
      title: "Original Locker Key of the Deceased Hirer",
      category: "Locker & Special",
      mandatory: true,
      description: "If key is lost, locker must be broken open by bank technician in presence of bank manager, two witnesses, and heirs, at hirer's cost.",
    });
    checklistDocs.push({
      id: "doc-locker-inventory",
      title: "Statutory Locker Inventory Protocol & Video Recording",
      category: "Locker & Special",
      mandatory: true,
      description: "Under Section 45ZE, bank prepares detailed inventory of articles in the presence of two independent witnesses before handing over contents.",
    });
  }

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients (NO GREEN) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
            <span>RBI MASTER DIRECTIONS • BANKING REGULATION ACT SECTIONS 45ZA TO 45ZF</span>
          </div>

          {/* Strict H1 Tag (Length 48 chars, 0 em-dashes, distinct from title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Bank Deceased Claim Document Checklist Generator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly generate your customized bank deceased account claim checklist across top 12 Indian
            banks. Compare Board-approved <strong>simplified indemnity limits (₹5L to ₹10L)</strong> against
            court succession certificate rules, and enforce the <strong>RBI 15-day settlement mandate</strong>.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checklist-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Generate Bank Document Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Will to Protect Bank Accounts</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals - STRICTLY NO GREEN)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-blue-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 Days TAT</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBI STATUTORY SETTLEMENT LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹5L - ₹10L</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SIMPLIFIED INDEMNITY THRESHOLD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 45ZA - 45ZF</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BANKING REGULATION ACT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">12 Top Banks</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EXACT ANNEXURE COMPLIANCE
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

            {/* Statutory Compliance Badge (NO GREEN) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under RBI Master Direction on Customer Service in Banks (DBR.No.Leg.BC.21/09.07.006/2015-16),
                Sections 45ZA to 45ZF of the Banking Regulation Act, 1949, and landmark Supreme Court ruling
                Smt. Sarbati Devi v. Smt. Usha Devi.
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
                <span>EXECUTIVE BRIEF: RBI DECEASED CLAIM RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee 15-Day Direct Release:</strong> Under RBI circulars, if a valid nominee
                    is registered on bank records, the branch manager must release funds within 15 calendar days.
                    Banks are prohibited from demanding legal heir certificates or indemnity bonds from nominees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Simplified Claim Threshold (₹5L - ₹10L):</strong> When an account lacks a nominee,
                    banks cannot routinely demand court succession certificates for balances up to Board-approved
                    thresholds (SBI, PNB, BoB: ₹5,00,000; ICICI: ₹10,00,000). Settlement is done against an
                    Indemnity Bond with two solvent sureties.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nominee is Trustee, Not Owner:</strong> The Supreme Court has repeatedly confirmed
                    that a nominee receives funds merely as a custodian for the legal heirs. The money remains
                    subject to the laws of succession under the Hindu Succession Act or Indian Succession Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Right to Ombudsman Remedy:</strong> If a branch manager delays settlement beyond 15
                    days or unlawfully demands a court order for claims below ₹5 Lakhs, claimants can file an
                    instant complaint with the RBI Banking Ombudsman under the Integrated Ombudsman Scheme, 2021.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="rbi-statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. RBI Master Directions: Settlement of Deceased Claims
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every year, thousands of grieving Indian families encounter bureaucratic roadblocks when
                  attempting to access bank accounts, fixed deposits, and lockers left behind by deceased family
                  members. Branch managers frequently confuse claimants by asking for court succession certificates,
                  even when clear regulatory mechanisms exist for swift settlement.
                </p>
                <p>
                  To eliminate harassment of surviving family members, the Reserve Bank of India issued clear
                  directives in its <strong>Master Direction on Customer Service in Banks</strong> (updating
                  landmark circular DBOD.No.Leg.BC.95/09.07.005/2004-05). Under these statutory directions, banks
                  must follow a simplified, time-bound protocol to settle claims of deceased depositors.
                </p>
                <p>
                  The RBI guidelines divide deceased depositor settlements into two distinct categories:
                  accounts with a registered nomination or survivorship clause, and accounts without nomination.
                  For accounts without nomination, the RBI explicitly directs banks not to insist on succession
                  certificates or letters of administration in claims up to a threshold limit fixed by the
                  bank&rsquo;s Board of Directors.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKLIST GENERATOR */}
            <section id="interactive-checklist-tool" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE COMPLIANCE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Bank Deceased Claim Document Checklist Generator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select the bank, account type, claim balance, and nominee status below. Our legal engine will
                diagnose whether your claim qualifies for simplified settlement, display exact bank annexures,
                calculate required stamp duty, and produce an instant printable document checklist.
              </p>

              {/* Generator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Control Row 1: Bank Selector & Account Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-slate-100">
                  {/* Bank Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Select Bank (Top 12 Indian Banks)</span>
                    </label>
                    <select
                      value={selectedBankKey}
                      onChange={(e) => setSelectedBankKey(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      {Object.entries(TOP_BANKS).map(([k, b]) => (
                        <option key={k} value={k}>
                          {b.name} (Simplified Limit: {formatINR(b.simplifiedThreshold)})
                        </option>
                      ))}
                    </select>
                    <div className="text-[11px] text-slate-500 pt-0.5">
                      {bank.notes}
                    </div>
                  </div>

                  {/* Account Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Deposit / Facility Category</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: "savings", label: "Savings / Current" },
                        { id: "fd_rd", label: "Fixed Deposit (FD/RD)" },
                        { id: "joint_survivor", label: "Joint (Either/Survivor)" },
                        { id: "locker", label: "Safety Locker" },
                        { id: "multiple", label: "Multiple Accounts" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAccountType(item.id as typeof accountType)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center leading-tight ${
                            accountType === item.id
                              ? "bg-slate-900 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Control Row 2: Aggregate Claim Amount & Quick Chips */}
                <div className="space-y-3 pb-6 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Total Balance in Deceased Account(s) (₹)</span>
                    </label>
                    <span className="text-[#C65378] font-black text-sm sm:text-base">
                      {formatINR(claimAmount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={claimAmount || ""}
                      onChange={(e) => setClaimAmount(Math.max(0, Number(e.target.value)))}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      placeholder="e.g. 450000"
                    />
                  </div>

                  {/* Quick Select Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[100000, 350000, 500000, 800000, 1000000, 1500000, 2500000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setClaimAmount(val)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          claimAmount === val
                            ? "bg-rose-100 text-[#C65378] border border-rose-300"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {formatINR(val)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control Row 3: Nominee Status & Legal Heir Scenario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6 border-b border-slate-100">
                  {/* Nominee Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Nomination on Record</span>
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: "registered", title: "Valid Nominee Registered", desc: "Form DA-1 registered with bank" },
                        { id: "no_nominee", title: "No Nominee Appointed", desc: "Intestate or blank nomination" },
                        { id: "predeceased", title: "Nominee Pre-Deceased", desc: "Nominee died before depositor" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setNomineeStatus(item.id as typeof nomineeStatus)}
                          className={`w-full p-2.5 rounded-xl text-left border transition-all text-xs ${
                            nomineeStatus === item.id
                              ? "border-rose-300 bg-rose-50/50 ring-2 ring-rose-200/60 font-bold text-slate-900"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-extrabold">{item.title}</div>
                          <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Legal Heir Agreement Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Family &amp; Legal Heir Status</span>
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: "sole_heir", title: "Sole Surviving Legal Heir", desc: "No other Class I / surviving heirs" },
                        { id: "multiple_amicable", title: "Multiple Heirs with Mutual Consent", desc: "All heirs agree; NOC / disclaimer available" },
                        { id: "disputed", title: "Contested / Disputed Heirs", desc: "Objection raised or court dispute pending" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setHeirStatus(item.id as typeof heirStatus)}
                          className={`w-full p-2.5 rounded-xl text-left border transition-all text-xs ${
                            heirStatus === item.id
                              ? "border-rose-300 bg-rose-50/50 ring-2 ring-rose-200/60 font-bold text-slate-900"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-extrabold">{item.title}</div>
                          <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Will Status & State Stamp Duty */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Will Availability</span>
                      </label>
                      <select
                        value={willStatus}
                        onChange={(e) => setWillStatus(e.target.value as typeof willStatus)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="no_will">No Will (Intestate Succession)</option>
                        <option value="registered_will">Registered Will Available</option>
                        <option value="probated_will">Probated Will / Letters of Admin</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>State (for Stamp Paper Value)</span>
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="maharashtra">Maharashtra (₹500 Stamp Paper)</option>
                        <option value="delhi">Delhi NCR (₹100-200 e-Stamp)</option>
                        <option value="karnataka">Karnataka (₹200-500 e-Stamp)</option>
                        <option value="tamilnadu">Tamil Nadu (₹100 Stamp Paper)</option>
                        <option value="up">Uttar Pradesh (₹100-500 Stamp)</option>
                        <option value="westbengal">West Bengal (₹100 Stamp)</option>
                        <option value="gujarat">Gujarat (₹300-500 Stamp)</option>
                        <option value="telangana">Telangana (₹100 Stamp)</option>
                        <option value="other">Other State / UT</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* =============================================================
                    DYNAMIC SETTLEMENT DIAGNOSTIC CARD (NO GREEN)
                    ============================================================= */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        SETTLEMENT ROUTE DIAGNOSTIC
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        {routeTitle}
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold ${routeBadgeColor}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>Statutory TAT: ~{tatDays} Days</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {routeSummary}
                  </p>

                  {/* Bank Threshold Comparison Bar */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{bank.shortName} Simplified Claim Limit:</span>
                      <span>{formatINR(bank.simplifiedThreshold)}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          claimAmount <= bank.simplifiedThreshold ? "bg-blue-600" : "bg-amber-600"
                        }`}
                        style={{
                          width: `${Math.min(100, Math.round((claimAmount / bank.simplifiedThreshold) * 100))}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Claim: {formatINR(claimAmount)}</span>
                      <span>
                        {claimAmount <= bank.simplifiedThreshold
                          ? `Within simplified threshold (No court order needed)`
                          : `Exceeds threshold by ${formatINR(claimAmount - bank.simplifiedThreshold)}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =============================================================
                    CUSTOMIZED DOCUMENT CHECKLIST (INTERACTIVE)
                    ============================================================= */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                        <FolderCheck className="w-5 h-5 text-[#C65378]" />
                        <span>Customized Document Checklist ({checklistDocs.length} Items)</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tick the items as you assemble your dossier for {bank.shortName} branch submission.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Checklist</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Checklist Items Stack */}
                  <div className="space-y-2.5">
                    {checklistDocs.map((doc, idx) => {
                      const isChecked = !!checkedItems[doc.id];
                      return (
                        <div
                          key={doc.id}
                          onClick={() => toggleCheckItem(doc.id)}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isChecked
                              ? "bg-blue-50/60 border-blue-200 text-slate-900"
                              : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>

                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                                {idx + 1}. {doc.title}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {doc.category}
                              </span>
                              {doc.mandatory && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] border border-rose-200">
                                  Mandatory
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stamp Duty & Notary Advisory Notice (NO GREEN) */}
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Stamp Duty &amp; Notary Compliance for {selectedState.toUpperCase()}:</span>
                    </div>
                    <p className="leading-relaxed">
                      For non-nominee claims requiring an Indemnity Bond (Annexure D / Form 8B), purchase{" "}
                      <strong>{stateDuty.stampDuty}</strong>. The bond must be attested before a First-Class
                      Judicial Magistrate or an Advocate Notary Public registered with the Government of India.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT (NO GREEN) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: BANK DECEASED ACCOUNT CLAIM DOSSIER</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">RBI Master Direction</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/bank-deceased-claim-document-checklist-generator-og.jpg"
                  alt="Bank Deceased Claim Document Checklist Generator - RBI 15-Day Settlement and Bank"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Verified against Banking Regulation Act Sections 45ZA to 45ZF &amp; Top 12 Bank Annexures</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Official Standardized Banking Dossier
                </div>
              </div>
            </div>

            {/* SECTION 3: NOMINEE VS LEGAL HEIR RIGHTS */}
            <section id="nominee-vs-legal-heir" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Nominee vs Legal Heir Rights: Banking Regulation Act
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A widespread misconception among Indian citizens is that a nominee inherits absolute ownership
                  of the bank deposit upon the account holder&rsquo;s death. This belief is legally incorrect.
                  Section 45ZA of the Banking Regulation Act, 1949 explicitly clarifies that payment made by
                  the bank to a nominee constitutes a valid discharge of the bank&rsquo;s liability.
                </p>
                <p>
                  In the landmark case of <strong>Smt. Sarbati Devi v. Smt. Usha Devi (1984 1 SCC 424)</strong>,
                  the Supreme Court of India held that nomination does not operate as a third-party Will. The nominee
                  is merely an authorized agent or trustee empowered to receive the proceeds from the bank and
                  give a legal discharge.
                </p>
                <p>
                  This principle was reaffirmed for banking deposits in <strong>Ram Chander Talwar v. Devender
                  Kumar Talwar (2010 10 SCC 671)</strong>, where the Supreme Court confirmed that the money
                  belongs to the legal heirs according to the deceased&rsquo;s personal succession law (such as
                  the Hindu Succession Act or Indian Succession Act). If the nominee refuses to distribute the
                  money among legal heirs, the heirs can initiate a civil suit for recovery and partition.
                </p>
              </div>

              {/* Comparison Table: Nominee vs Legal Heir (NO GREEN) */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-4">Nominee (Sec 45ZA)</th>
                      <th className="py-3 px-4">Legal Heir (Succession Law)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Status</td>
                      <td className="py-3 px-4">Statutory Custodian / Trustee</td>
                      <td className="py-3 px-4 font-bold text-blue-700">Beneficial Absolute Owner</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Right to Bank Payout</td>
                      <td className="py-3 px-4 font-bold text-blue-700">Direct 15-Day Payout from Branch</td>
                      <td className="py-3 px-4">Can claim through nominee or court</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Bank Discharge</td>
                      <td className="py-3 px-4">Bank fully discharged under Sec 45ZA(2)</td>
                      <td className="py-3 px-4">Cannot hold bank liable after payment to nominee</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Overridden by Will?</td>
                      <td className="py-3 px-4 text-rose-700">Yes, a valid registered Will overrides nominee</td>
                      <td className="py-3 px-4 font-bold text-blue-700">Legatee named in Will inherits funds</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Dispute Jurisdiction</td>
                      <td className="py-3 px-4">Bank Ombudsman / Branch Grievance</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Competent Civil Court / District Judge</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: TOP 12 BANKS THRESHOLD COMPARISON */}
            <section id="bank-threshold-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>BANKING BENCHMARK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Top 12 Indian Banks Deceased Claim Threshold Limits
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                While bank websites often bury Annexures inside 40-page PDF guidelines, the table below aggregates
                the Board-approved simplified claim limits, required sureties, and applicable forms across
                India&rsquo;s 12 major public and private sector banks:
              </p>

              {/* Table Container (NO GREEN) */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-3">Bank Name</th>
                      <th className="py-3.5 px-3">Simplified Limit (Without Court)</th>
                      <th className="py-3.5 px-3">Sureties</th>
                      <th className="py-3.5 px-3">Primary Claim Forms</th>
                      <th className="py-3.5 px-3">Court Order Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {Object.entries(TOP_BANKS).slice(0, 12).map(([key, b]) => (
                      <tr key={key} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3 font-bold text-slate-900">{b.name}</td>
                        <td className="py-3 px-3 font-bold text-blue-700">{formatINR(b.simplifiedThreshold)}</td>
                        <td className="py-3 px-3">{b.suretiesRequired} Solvent Sureties</td>
                        <td className="py-3 px-3 text-[11px] font-mono">{b.claimFormName}</td>
                        <td className="py-3 px-3 font-semibold text-rose-700">Above {formatINR(b.courtOrderTrigger)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: INDEMNITY & SURETY RULES */}
            <section id="indemnity-surety-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>RISK MITIGATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Indemnity Bond &amp; Surety Requirements for Bank Claims
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When settling a deceased depositor claim without a registered nominee or court order, the bank
                  assumes legal risk. If an estranged child, a subsequent spouse, or an undisclosed creditor
                  appears later with claims against the estate, the bank could face litigation.
                </p>
                <p>
                  To protect against this financial exposure, banks require the claimant to execute an
                  <strong>Indemnity Bond</strong> (usually Annexure D or Form 8B). Under this contract, the
                  claimant agrees to indemnify and hold harmless the bank against any future claims, losses, or legal
                  costs arising from releasing the funds.
                </p>
                <p>
                  Banks also mandate <strong>two solvent sureties (guarantors)</strong> who sign the indemnity bond.
                  The sureties must possess a combined net worth equal to or greater than the claim amount.
                  Acceptable proof of solvency includes recent Income Tax Return (ITR-V) acknowledgments, employer
                  salary certificates, or municipal property tax receipts.
                </p>
              </div>
            </section>

            {/* SECTION 6: LOCKER & SAFE CUSTODY RULES */}
            <section id="locker-safe-custody-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>SAFE DEPOSIT ACCESS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Safety Locker &amp; Safe Custody Claim Rules After Demise
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Claiming the contents of a bank safety locker follows specialized statutory protocols under
                  <strong>Sections 45ZC to 45ZF of the Banking Regulation Act, 1949</strong>. Unlike savings
                  deposits, banks do not own or hold title to locker contents; they act strictly as bailees.
                </p>
                <p>
                  <strong>Locker With Nomination:</strong> Under Section 45ZE, if a sole hirer dies with a
                  registered nominee, the branch manager must grant locker access to the nominee. Before handing
                  over contents, an inventory is prepared in the presence of the branch manager, nominee, and two
                  independent witnesses. The bank does not demand a succession certificate from the nominee.
                </p>
                <p>
                  <strong>Locker Without Nomination:</strong> All legal heirs must jointly attend the branch to
                  open the locker, conduct inventory, and receive contents. If one heir cannot attend in person,
                  they must execute a registered Power of Attorney or formal Letter of Relinquishment in favor of
                  the attending heir.
                </p>
              </div>
            </section>

            {/* SECTION 7: SUCCESSION CERTIFICATE TRIGGER */}
            <section id="succession-certificate-trigger" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL INTERVENTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. When Is a Court Succession Certificate Truly Mandatory?
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Branch managers sometimes unlawfully demand court orders for small balances. Claimants should
                  know exactly when a <strong>Succession Certificate</strong> under Section 372 of the Indian
                  Succession Act, 1925 is legally required:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-xs sm:text-sm">
                  <li>
                    <strong>Aggregate Balance Exceeds Board Limit:</strong> When the deceased&rsquo;s total
                    balances across all accounts in that bank exceed the threshold (e.g. &gt; ₹5 Lakhs in SBI or
                    &gt; ₹10 Lakhs in ICICI).
                  </li>
                  <li>
                    <strong>Active Legal Dispute Among Heirs:</strong> If any family member submits a written
                    objection or legal notice to the branch asserting a conflicting claim.
                  </li>
                  <li>
                    <strong>Absence of Solvent Sureties:</strong> If the legal heirs cannot produce two
                    acceptable guarantors with income tax proof to sign the bank&rsquo;s indemnity bond.
                  </li>
                  <li>
                    <strong>Doubtful Title or Conflicting Wills:</strong> When multiple unprobated Wills or
                    conflicting testamentary documents are submitted to the bank.
                  </li>
                </ul>
                <p>
                  In presidential towns (Mumbai, Kolkata, and Chennai), if the deceased left a Will, Section 213
                  of the Indian Succession Act may require <strong>probate</strong> before the bank releases
                  substantial balances.
                </p>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP CLAIM SOP */}
            <section id="step-by-step-claim-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Claiming Bank Balance of Deceased
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Inform Branch & Freeze Debit Operations",
                    desc: "Submit a written notice of demise along with a photocopy of the death certificate. The bank freezes debit mandates, standing instructions, and auto-debits to prevent fraudulent withdrawals.",
                  },
                  {
                    step: 2,
                    title: "Check Nomination Registration Status (Form DA-1)",
                    desc: "Ask the branch operations manager to verify whether a nominee exists in the core banking system. Request an official copy of the deceased depositor claim form kit.",
                  },
                  {
                    step: 3,
                    title: "Obtain Revenue Legal Heir / Surviving Member Certificate",
                    desc: "If no nominee is recorded, apply to the local Revenue Tahsildar or Municipal Corporation for a formal Legal Heir Certificate or Surviving Member Certificate establishing the family tree.",
                  },
                  {
                    step: 4,
                    title: "Execute Non-Judicial Stamp Paper Indemnity & NOC",
                    desc: "Purchase non-judicial stamp paper in accordance with state stamp duty. Have the indemnity bond and co-heir disclaimer letters executed and attested by a Notary Public.",
                  },
                  {
                    step: 5,
                    title: "Submit Complete Dossier with Acknowledgment Slip",
                    desc: "Submit all original forms, death certificate, and KYC proofs at the home branch. Obtain a stamped duplicate acknowledgment slip with the branch inward date.",
                  },
                  {
                    step: 6,
                    title: "Enforce RBI 15-Day Settlement Deadline",
                    desc: "Under RBI Master Directions, the bank must credit proceeds to the claimant's account within 15 days. If delayed, submit an escalation letter to the Principal Nodal Officer.",
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

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: SBI, HDFC &amp; ICICI Bank Claims
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: Father Demise with ₹4.2 Lakhs in SBI (No Nominee)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      SBI Branch
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father in Lucknow passed away leaving ₹4.20 Lakhs in an SBI savings account without a nominee.
                    The branch manager initially demanded a court succession certificate.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Actual SBI Board Limit:</span>
                      <span className="font-bold text-slate-900">₹5,00,000 Simplified Threshold</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Legal Action Taken:</span>
                      <span className="font-bold text-blue-700">Submitted Annexures A, C, D &amp; E</span>
                    </div>
                    <div className="pt-1 text-blue-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Outcome:</span>
                      <span>Disbursed in 12 days without court</span>
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: Mother Demise with ₹18 Lakhs in HDFC FDs
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      HDFC Bank
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mother left fixed deposits worth ₹18 Lakhs across 3 accounts without nomination. Because the sum
                    exceeded HDFC&rsquo;s ₹10 Lakh discretionary ceiling, succession certificate was mandatory.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">HDFC Discretionary Ceiling:</span>
                      <span className="font-bold text-slate-900">₹10,00,000 Maximum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Legal Pathway:</span>
                      <span className="font-bold text-slate-900">Sec 372 District Court Petition</span>
                    </div>
                    <div className="pt-1 text-slate-900 font-black flex justify-between border-t border-slate-200">
                      <span>Resolution:</span>
                      <span>Settled within 6 days of court decree</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPY-PASTE TEMPLATES */}
            <section id="copy-paste-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>LEGAL DRAFTING ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Bank Deceased Claim Affidavits &amp; Bonds
              </h3>

              {/* Template Box 1: Statutory Indemnity Bond */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Statutory Bank Deceased Claim Indemnity Bond (Annexure D / Form 8B Format)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `LETTER OF INDEMNITY WITH RESPECT TO PAYMENT OF BALANCE IN DECEASED CONSTITUENT'S ACCOUNT WITHOUT PRODUCTION OF LEGAL REPRESENTATION:
To: The Branch Manager, [Bank Name], [Branch Address].

WHEREAS late Shri/Smt. [Name of Deceased Depositor], residing at [Deceased Address], held Savings/Fixed Deposit Account No. [Account Number] with your branch, having a balance of Rs. [Claim Amount]/- (Rupees [Amount in Words] only);

AND WHEREAS the said account holder expired on [Date of Death] leaving behind the following legal heirs:
1. [Name of Heir 1], [Relationship], Age: [Age], Residing at [Address]
2. [Name of Heir 2], [Relationship], Age: [Age], Residing at [Address]

AND WHEREAS the said deceased died intestate without leaving any Will, and no grant of Probate, Letters of Administration, or Succession Certificate has been applied for or obtained;

AND WHEREAS at our request, the Bank has agreed to pay the sum of Rs. [Claim Amount]/- to Shri/Smt. [Claimant Name] on behalf of all legal heirs without insisting on production of a grant of legal representation from a Court of Law;

NOW THEREFORE, in consideration of the premises, WE, the undersigned Claimant and Sureties, jointly and severally agree to indemnify and keep indemnified the Bank against all claims, demands, actions, proceedings, losses, and damages which may be brought against or suffered by the Bank on account of making the aforesaid payment.

IN WITNESS WHEREOF, we have executed this Deed of Indemnity on this [Day] of [Month], [Year] on requisite Non-Judicial Stamp Paper.

1. Signature of Claimant: _______________________
2. Signature of Surety 1: _______________________ (PAN: ______________, Net Worth: Rs. ____________)
3. Signature of Surety 2: _______________________ (PAN: ______________, Net Worth: Rs. ____________)
Attested before me: NOTARY PUBLIC / OATH COMMISSIONER`,
                        "indemnity"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate === "indemnity" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Indemnity Bond</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"LETTER OF INDEMNITY (NON-JUDICIAL STAMP PAPER):
To: The Branch Manager, [Bank Name], [Branch Address].
WHEREAS late [Deceased Depositor Name] held Account No. [Account Number] with balance Rs. [Claim Amount]/-;
AND WHEREAS the deceased expired on [Date of Death] leaving behind the undersigned as surviving legal heirs;
NOW THEREFORE, in consideration of the Bank paying the deposit balance to [Claimant Name], WE, the Claimant and Sureties, jointly and severally agree to indemnify and hold harmless the Bank against all future claims, suits, or demands from any person whatsoever."`}
                </pre>
              </div>

              {/* Template Box 2: Letter of Disclaimer / Relinquishment */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Letter of Disclaimer / Relinquishment / NOC from Legal Heirs (Annexure C)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `LETTER OF DISCLAIMER / NO OBJECTION CERTIFICATE (ANNEXURE C FORMAT):
To: The Branch Manager, [Bank Name], [Branch Address].

Sub: Settlement of balance in Account No. [Account Number] of Late Shri/Smt. [Name of Deceased]

Dear Sir/Madam,
1. We, the undersigned, are the legal heirs of late Shri/Smt. [Name of Deceased Depositor], who died on [Date of Demise].
2. We hereby declare that we do not claim any right, title, or interest in the amount of Rs. [Claim Amount]/- lying in the credit of the aforesaid account.
3. We have no objection whatsoever if the entire balance, along with accrued interest, is paid directly to Shri/Smt. [Name of Claimant Heir], who is the [Relationship] of the deceased.
4. The receipt given by the said [Name of Claimant Heir] shall be a full, valid, and absolute discharge to the Bank for the payment of the said deposit balance.

Signatures of Relinquishing Legal Heirs:
1. Name: [Heir 1 Name], Signature: __________________
2. Name: [Heir 2 Name], Signature: __________________
Date: [Date], Place: [Place]`,
                        "disclaimer"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate === "disclaimer" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Disclaimer Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Expressly waives claims of non-claiming heirs</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Authorizes one single heir to receive NEFT credit</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Provides full legal discharge to bank branch</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Can be executed on plain paper or ₹100 stamp paper</span>
                  </div>
                </div>
              </div>

              {/* Template Box 3: RBI 15-Day Escalation Demand Letter */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    RBI 15-Day Escalation Demand Letter to Branch Manager
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `FORMAL GRIEVANCE & DEMAND NOTICE UNDER RBI DECEASED DEPOSITOR MASTER DIRECTION:
Date: [Date]
To:
The Branch Manager / Principal Nodal Officer,
[Bank Name], [Branch Address].

Sub: Failure to settle Deceased Depositor Claim in A/c No. [Account Number] within RBI 15-day timeline

Sir/Madam,
1. I am writing with reference to Deceased Claim Application submitted on [Submission Date] (Inward Acknowledgment No. [Ack No.]) regarding the account of late Shri/Smt. [Deceased Name].
2. All required documents, including Death Certificate, Annexures, Legal Heir proofs, and Indemnity Bond with sureties, were duly submitted in full compliance with your Bank's deceased claim checklist.
3. Under the Reserve Bank of India Master Direction on Customer Service in Banks (DBR.No.Leg.BC.21/09.07.006/2015-16, Clause 4.2), banks are strictly mandated to settle claims and release payments to claimants within a period not exceeding 15 calendar days from receipt of the claim.
4. More than [Number of Days Elapsed] days have elapsed, yet the proceeds have not been credited.
5. Please note that if the claim is not settled within 48 hours of receipt of this notice, I shall be compelled to escalate this violation to the RBI Banking Ombudsman under the Reserve Bank - Integrated Ombudsman Scheme, 2021 (CMS Portal).

Yours faithfully,
[Claimant Full Name], [Contact Phone], [Email Address]`,
                        "escalation"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedTemplate === "escalation" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Escalation Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"FORMAL NOTICE UNDER RBI MASTER DIRECTION (CLAUSE 4.2):
To: The Branch Manager, [Bank Name].
Sub: Delayed Deceased Claim in Account No. [Account No.] beyond 15 days.
Please take notice that failure to disburse funds within 15 days violates RBI Master Direction DBR.No.Leg.BC.21/09.07.006/2015-16. Unless disbursed within 48 hours, this matter will be escalated to the RBI Banking Ombudsman on the CMS Portal."`}
                </pre>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE (NO GREEN) */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; TRUST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Banking &amp; Succession Advocacy Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Bar Council Verified Banking Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier estate planning and succession technology platform,
                  powered by AMA Legal Solutions. Our multidisciplinary legal bench specializes in testamentary
                  disputes, District Court succession certificate petitions, Banking Ombudsman escalations,
                  and deceased depositor transmissions across all 12 major public and private banks. We have assisted
                  over 15,000 Indian families in drafting challenge-proof Wills and expediting asset transmissions.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/templates/indemnity-bond-format-bank-deceased-claim"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Indemnity Bond Template</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Inherited Capital Gains Tax</span>
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

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Bank Deceased Claims
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Clear, legally verified answers to common questions about bank account claims, indemnity bonds,
                nomination rules, and RBI timelines:
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Official Banking Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Banking &amp; Succession Enactments in India:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Banking Regulation Act, 1949:</strong> Sections 45ZA to 45ZF (Nomination and safe custody).
                    </li>
                    <li>
                      <strong>RBI Master Direction on Customer Service in Banks:</strong> DBR.No.Leg.BC.21/09.07.006/2015-16.
                    </li>
                    <li>
                      <strong>Reserve Bank - Integrated Ombudsman Scheme, 2021:</strong> Redressal of bank claim delays.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925:</strong> Sections 370 to 389 (Succession Certificate for bank debts).
                    </li>
                    <li>
                      <strong>Supreme Court Landmark Precedents:</strong> Smt. Sarbati Devi (1984) and Ram Chander Talwar (2010).
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://cms.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>RBI CMS Ombudsman Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Reserve Bank of India (Official)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Banking Regulation Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Inherited Capital Gains Tax Calculator
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Heir Share Calculator
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
              RIGHT COLUMN: STICKY SIDEBAR (NO GREEN)
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
                Specialist in Indian banking jurisprudence, High Court succession petitions, deceased depositor
                indemnity litigation, and RBI Ombudsman proceedings.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-blue-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* VISUAL BLUEPRINT THUMBNAIL (NO GREEN) */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs bg-white p-3 space-y-2">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  <Image
                    src="/images/bank-deceased-claim-document-checklist-generator-og.jpg"
                    alt="Bank Deceased Claim Document Checklist Dossier"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="320px"
                  />
                </div>
                <div className="text-[11px] font-bold text-slate-700 text-center flex items-center justify-center gap-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Standardized Bank Claim Dossier</span>
                </div>
              </div>

              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT BANK ACCOUNT FREEZES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family from Bank Indemnity Headaches
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally registered Will clearly designates bank account bequeathals, preventing branch
                  freeze disputes and eliminating the need for costly court succession certificates.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>BANK DISPUTE &amp; SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Branch Delays or Unlawful Court Demands?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our banking advocates issue formal RBI demand notices, draft challenge-proof indemnity bonds,
                  and file District Court succession certificate petitions.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST (NO GREEN) */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>RBI Directives Compliance:</strong> Enforces 15-day turnaround and Board limits.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Bank Annexures:</strong> Covers SBI, HDFC, ICICI, PNB, and 8 other banks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>State Stamp Duty Guidance:</strong> Calculates exact stamp paper requirements.
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
          href="#interactive-checklist-tool"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Checklist Tool</span>
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
