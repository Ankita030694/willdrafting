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
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  Search,
  Database,
  Key,
  FileSpreadsheet,
  Receipt,
  Briefcase,
  ShieldAlert,
  Mail,
  Smartphone,
  CreditCard,
} from "lucide-react";

// Strict Screaming Frog Compliance: All H2s strictly <= 70 chars, 0 em-dashes
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. The Unclaimed Wealth Crisis & Tracing Law" },
  { id: "interactive-roadmap-tool", label: "2. Interactive Asset Detective Roadmap Tool" },
  { id: "section-159-income-tax-ais", label: "3. Income Tax AIS: Section 159 Legal Heir SOP" },
  { id: "mutual-funds-demat-cas", label: "4. Mutual Funds & Demat: CAS Search Protocol" },
  { id: "rbi-udgam-bank-deposits", label: "5. RBI UDGAM: Inactive & Dormant Bank Accounts" },
  { id: "iepf-shares-unpaid-dividends", label: "6. IEPF Shares: MCA Verification & Recovery" },
  { id: "bima-bharosa-life-insurance", label: "7. Bima Bharosa: Finding Forgotten Policies" },
  { id: "epfo-post-office-schemes", label: "8. EPFO & Post Office: Provident Fund & PPF" },
  { id: "portals-comparison-matrix", label: "9. Portals Comparison: Authority & Access Rules" },
  { id: "step-by-step-discovery-sop", label: "10. Step-by-Step SOP: Discovery to Transmission" },
  { id: "practical-case-studies", label: "11. Case Studies: Delhi, Mumbai & Bengaluru" },
  { id: "legal-templates-clauses", label: "12. Statutory Letter Templates: Bank & RTA" },
  { id: "institutional-profile", label: "13. Institutional Backing: Senior Succession Bar" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Asset Search" },
  { id: "statutory-citations", label: "15. Statutory Citations & Government Portals" },
];

const FAQS = [
  {
    q: "Can I find all my deceased parents bank accounts and investments using their PAN?",
    a: "Yes. In India, PAN is the universal financial identifier. While no single government dashboard reveals every asset on one screen, your parent's PAN unlocks: (1) Consolidated Account Statements (CAS) across CDSL, NSDL, and MFCentral for 100% of mutual funds and demat shares, (2) Annual Information Statement (AIS/TIS) on the Income Tax portal via Section 159 Legal Heir registration which reveals bank interest and fixed deposits, (3) RBI UDGAM for dormant bank accounts, and (4) IEPF portal for unclaimed dividends and shares.",
  },
  {
    q: "How do legal heirs register on the Income Tax portal under Section 159 to view AIS and 26AS?",
    a: "Under Section 159 of the Income Tax Act, 1961, the legal representative of a deceased taxpayer can register on incometax.gov.in. The heir logs into their own e-Filing profile, navigates to Authorized Partners > Register as Representative Assessee, selects Deceased (Legal Heir), and uploads: (1) Copy of PAN of both deceased and heir, (2) Certified Death Certificate, and (3) Legal Heir Certificate, Surviving Member Certificate, or Registered Will/Probate. Once approved by the Assessing Officer, the heir can access the deceased's Annual Information Statement (AIS) and Form 26AS.",
  },
  {
    q: "What is the RBI UDGAM portal and which bank deposits can be tracked through it?",
    a: "UDGAM (Unclaimed Deposits Gateway to Access Information) is an official centralized search portal established by the Reserve Bank of India (RBI). Under Section 26A of the Banking Regulation Act, 1949, balances in savings and current accounts inactive for 10 or more years, and term deposits unclaimed for 10 years past maturity, are transferred to the RBI's Depositor Education and Awareness (DEA) Fund. UDGAM enables citizens to search across 30+ major commercial, private, and regional rural banks using the deceased's name combined with PAN, voter ID, passport, or date of birth.",
  },
  {
    q: "How can I track all mutual funds owned by a deceased parent across CAMS and KFintech?",
    a: "All 44+ mutual fund houses in India are administered by two primary Registrars and Transfer Agents (RTAs): CAMS and KFintech. Instead of querying fund houses individually, legal heirs can obtain a Consolidated Account Statement (CAS). Through MFCentral (mfcentral.com) or the CAMS and KFintech online portals, you can generate a PAN-level CAS. If the parent's registered mobile number is no longer active, heirs can submit a physical CAS request form at any local CAMS or KFintech Investor Service Centre (ISC) along with an attested death certificate and legal heir documentation.",
  },
  {
    q: "What is the process to find forgotten shares transferred to the IEPF authority?",
    a: "Under Section 124(6) of the Companies Act, 2013, if dividends on shares remain unpaid or unclaimed for 7 consecutive years, the company must legally transfer both the accumulated dividends and the underlying equity shares to the Investor Education and Protection Fund (IEPF). To check whether shares were transferred, visit iepf.gov.in and search the Unclaimed and Unpaid Amounts database using your parent's PAN, folio number, or name. To recover the shares, heirs must secure an Entitlement Letter from the company's RTA (Form ISR-4) and submit Form IEPF-5 online on MCA21.",
  },
  {
    q: "How do I trace life insurance policies when I do not have policy documents or numbers?",
    a: "If you suspect your deceased parent held life insurance policies but cannot find paper bonds, you should utilize three channels: (1) The IRDAI Bima Bharosa portal (bimabharosa.irdai.gov.in), (2) The official LIC Unclaimed Policy search portal (licindia.in), which searches across all LIC branches nationwide by policyholder name and date of birth, and (3) Auditing bank statements and Income Tax AIS/TIS for premium debits or Section 80C life insurance tax deduction entries.",
  },
  {
    q: "Will a bank freeze my deceased parent's account as soon as they are notified of the death?",
    a: "Yes. Upon receiving formal intimation and a death certificate, banks are legally mandated to place an immediate debit freeze on the deceased's sole accounts to prevent unauthorized ATM withdrawals, cheques, or net banking transfers. Inward credits like dividends and pension interest continue. If a nominee was registered, the bank must settle the claim within 15 calendar days under RBI guidelines. If no nominee exists, funds are disbursed to Class I legal heirs upon submitting an Indemnity Bond, NOCs, and a Legal Heir or Succession Certificate.",
  },
  {
    q: "When is a Succession Certificate mandatory instead of a basic Legal Heir Certificate?",
    a: "A Legal Heir Certificate is an administrative certificate issued by local revenue authorities (Tehsildar or SDM) establishing relationship status, suitable for bank claims below institutional threshold limits (typically ₹1 Lakh to ₹5 Lakhs). In contrast, a Succession Certificate is a judicial decree issued by a Civil District Court under Section 372 of the Indian Succession Act, 1925, certifying legal title to debts and securities. A Succession Certificate or Court Probate of Will is mandatory when claiming high-value demat shares, IEPF refunds exceeding ₹5 Lakhs, or bank balances exceeding branch settlement thresholds.",
  },
];

interface DocumentOption {
  id: string;
  label: string;
  description: string;
  category: "Identity & Tax" | "Access & Communications" | "Financial Records";
  weight: number;
  unlockedPortals: string[];
}

const DOCUMENT_OPTIONS: DocumentOption[] = [
  {
    id: "pan_card",
    label: "Permanent Account Number (PAN Card / Number)",
    description: "The primary universal key linking all banking, mutual funds, demat, and tax databases.",
    category: "Identity & Tax",
    weight: 35,
    unlockedPortals: ["it_ais", "mf_central", "cdsl_nsdl", "rbi_udgam", "iepf", "bima_bharosa"],
  },
  {
    id: "death_certificate",
    label: "Death Certificate & Legal Heir Certificate",
    description: "Essential for Section 159 Representative Assessee registration and bank branch access.",
    category: "Identity & Tax",
    weight: 20,
    unlockedPortals: ["it_ais", "rbi_udgam", "iepf", "epfo", "india_post"],
  },
  {
    id: "mobile_sim",
    label: "Active Mobile Number / SIM Card (SMS OTP Access)",
    description: "Allows instant self-service OTP verification on MFCentral, CDSL CAS, and Camsonline.",
    category: "Access & Communications",
    weight: 15,
    unlockedPortals: ["mf_central", "cdsl_nsdl", "rbi_udgam"],
  },
  {
    id: "email_access",
    label: "Primary Email Account Access of Deceased",
    description: "Reveals monthly e-CAS statements, dividend credit intimations, and policy notices.",
    category: "Access & Communications",
    weight: 10,
    unlockedPortals: ["mf_central", "cdsl_nsdl", "bima_bharosa"],
  },
  {
    id: "itr_login",
    label: "Past ITR Returns, ITR-V Ack or Income Tax Password",
    description: "Instant access to historical Form 26AS, AIS/TIS, and registered bank accounts.",
    category: "Identity & Tax",
    weight: 10,
    unlockedPortals: ["it_ais"],
  },
  {
    id: "physical_chequebook",
    label: "Physical Bank Passbook / Old Chequebook / ATM Cards",
    description: "Provides specific branch account numbers, customer IDs, and locker references.",
    category: "Financial Records",
    weight: 10,
    unlockedPortals: ["rbi_udgam"],
  },
  {
    id: "share_certificates",
    label: "Old Paper Share Certificates / Dividend Warrants",
    description: "Crucial for tracing legacy holdings from the 1980s-90s transferred to IEPF.",
    category: "Financial Records",
    weight: 10,
    unlockedPortals: ["iepf"],
  },
  {
    id: "insurance_bonds",
    label: "LIC / Private Life Insurance Policy Receipts or Bond",
    description: "Lists policy numbers, sum assured, nomination details, and servicing branch.",
    category: "Financial Records",
    weight: 5,
    unlockedPortals: ["bima_bharosa"],
  },
  {
    id: "epf_uan",
    label: "UAN Number / Salary Slips / Pension Payment Order (PPO)",
    description: "Unlocks Employee Provident Fund, EPS 1995 survivor pension, and EDLI ₹7 Lakh life cover.",
    category: "Financial Records",
    weight: 5,
    unlockedPortals: ["epfo"],
  },
  {
    id: "post_office_passbook",
    label: "Post Office Savings Passbook / NSC / KVP Bonds",
    description: "Enables tracing of National Savings Schemes and postal Public Provident Fund (PPF).",
    category: "Financial Records",
    weight: 5,
    unlockedPortals: ["india_post"],
  },
];

interface PortalGuide {
  id: string;
  name: string;
  shortTag: string;
  statutoryAuthority: string;
  whatItReveals: string;
  requiredKeys: string[];
  directUrl: string;
  turnaroundTime: string;
  successRate: string;
  offlineFallback: string;
  actionSteps: string[];
}

const PORTAL_GUIDES: PortalGuide[] = [
  {
    id: "it_ais",
    name: "Income Tax AIS & TIS (Section 159 Legal Heir Login)",
    shortTag: "Most Powerful Asset Finder",
    statutoryAuthority: "CBDT & Section 159, Income Tax Act, 1961",
    whatItReveals:
      "Every domestic bank account paying interest (SFT-005), term deposits, dividend income from all listed stocks, mutual fund switch/redemptions, high-value purchases, and active credit cards.",
    requiredKeys: ["pan_card", "death_certificate"],
    directUrl: "https://www.incometax.gov.in",
    turnaroundTime: "3 to 7 working days for Legal Heir approval",
    successRate: "95% Financial Asset Coverage",
    offlineFallback:
      "If the deceased parent's mobile is dead, the legal heir registers under their OWN PAN/mobile profile as 'Representative Assessee' and uploads the death certificate.",
    actionSteps: [
      "Step 1: Legal heir logs into their own personal Income Tax e-Filing account.",
      "Step 2: Navigate to Authorized Partners > Register as Representative Assessee.",
      "Step 3: Click 'Create New Request' and select 'Deceased (Legal Heir)'.",
      "Step 4: Enter the deceased parent's PAN, date of death, and upload certified Death Certificate & Legal Heir Certificate / Registered Will.",
      "Step 5: Assessing Officer validates within 3-7 days. Once approved, select 'Switch Account' to access deceased's Annual Information Statement (AIS) and Form 26AS.",
    ],
  },
  {
    id: "mf_central",
    name: "MFCentral & CAMS/KFintech CAS (Mutual Funds)",
    shortTag: "100% Mutual Fund Coverage",
    statutoryAuthority: "SEBI Master Circular for Mutual Funds",
    whatItReveals:
      "All mutual fund folios across all 44+ Asset Management Companies (AMCs) in India, total units held, current valuation, and registered nominee status.",
    requiredKeys: ["pan_card"],
    directUrl: "https://www.mfcentral.com",
    turnaroundTime: "Instant via OTP / 2 to 5 days via physical ISC",
    successRate: "100% Mutual Funds in India",
    offlineFallback:
      "If mobile OTP is unavailable, submit a written CAS request at any physical CAMS or KFintech Investor Service Centre (ISC) along with the death certificate and KYC.",
    actionSteps: [
      "Step 1: Go to MFCentral (joint initiative by CAMS & KFintech) or camsonline.com.",
      "Step 2: Enter deceased parent's PAN. If mobile is active, receive OTP to view full folio summary.",
      "Step 3: Alternatively, request a 'Detailed Consolidated Account Statement (CAS)' via email.",
      "Step 4: Identify all AMCs where units exist and note registered nominee or transmission requirements.",
      "Step 5: Initiate transmission request using Form T3/Annexure-I for legal heirs.",
    ],
  },
  {
    id: "cdsl_nsdl",
    name: "CDSL & NSDL Consolidated e-CAS (Demat & Equities)",
    shortTag: "All Demat Accounts & Stocks",
    statutoryAuthority: "SEBI Depositories & Participants Regulations",
    whatItReveals:
      "Every active Demat account across all brokers (Zerodha, Groww, ICICI Direct, HDFC Securities, Angel One, Sharekhan), equity shares, ETFs, REITs, and Sovereign Gold Bonds (SGBs).",
    requiredKeys: ["pan_card"],
    directUrl: "https://www.cas.cdslindia.com",
    turnaroundTime: "24 to 48 hours for monthly CAS / 7 days for physical search",
    successRate: "99% Listed Securities",
    offlineFallback:
      "Write a formal intimation letter to CDSL/NSDL Head Office with an attested death certificate requesting a 'Search of Demat Accounts mapped to PAN'.",
    actionSteps: [
      "Step 1: Visit CDSL e-CAS or NSDL IDeAS statement generator.",
      "Step 2: Input deceased's PAN and date of birth to check active demat accounts.",
      "Step 3: Review email archives for 'Monthly Consolidated Account Statement' sent by CDSL/NSDL.",
      "Step 4: If broker is unknown, submit a formal PAN verification letter to SEBI MITRA or depository grievance cell.",
      "Step 5: Approach identified Depository Participant (DP) to freeze trading and begin transmission.",
    ],
  },
  {
    id: "rbi_udgam",
    name: "RBI UDGAM Portal (Unclaimed Deposits Gateway)",
    shortTag: "Dormant Accounts in 30+ Banks",
    statutoryAuthority: "Section 26A, Banking Regulation Act, 1949 (RBI DEA Fund)",
    whatItReveals:
      "Savings, current, recurring, and fixed deposits that have remained inactive or unclaimed for 10 or more years, transferred to RBI's Depositor Education and Awareness (DEA) Fund.",
    requiredKeys: ["pan_card"],
    directUrl: "https://udgam.rbi.org.in",
    turnaroundTime: "Instant search / 15-30 days bank claim settlement",
    successRate: "30+ Major Public, Private & Foreign Banks",
    offlineFallback:
      "Search can be conducted using Name + Date of Birth even without PAN (though PAN provides 100% precision).",
    actionSteps: [
      "Step 1: Register on the official RBI UDGAM portal (udgam.rbi.org.in) using your mobile number.",
      "Step 2: Enter deceased parent's full name, and supplement with PAN, Voter ID, or Date of Birth.",
      "Step 3: Select all banks (State Bank of India, PNB, HDFC, ICICI, Bank of Baroda, etc.) and run search.",
      "Step 4: Note the Unclaimed Deposit Reference Number (UDRN), bank name, and branch code.",
      "Step 5: Visit the respective bank branch with Form DA-2 (Nominee) or Form DA-1 / Legal Heir Indemnity to claim funds with interest.",
    ],
  },
  {
    id: "iepf",
    name: "IEPF Authority Portal (Unclaimed Shares & Dividends)",
    shortTag: "Transferred Shares & Dividends",
    statutoryAuthority: "Section 124(6) & 125, Companies Act, 2013",
    whatItReveals:
      "Physical and demat shares whose dividends remained unclaimed for 7 consecutive years, transferred to the Ministry of Corporate Affairs IEPF Authority.",
    requiredKeys: ["pan_card", "death_certificate"],
    directUrl: "https://www.iepf.gov.in",
    turnaroundTime: "45 to 90 days from IEPF-5 e-filing",
    successRate: "Over ₹1.8 Lakh Crore Recoverable Assets",
    offlineFallback:
      "Search using company name and parent's name or old physical folio number found on dividend warrants or correspondence.",
    actionSteps: [
      "Step 1: Visit iepf.gov.in and click 'Search Unclaimed / Unpaid Amounts'.",
      "Step 2: Enter deceased parent's PAN, Folio Number, or Father's Name.",
      "Step 3: If matches exist, write to the Company Secretary / RTA to obtain an 'Entitlement Letter' (Form ISR-4).",
      "Step 4: Prepare Succession Certificate or Court Probate if share market value exceeds ₹5 Lakhs.",
      "Step 5: File Form IEPF-5 online on MCA21 and submit original verified docket to Company Nodal Officer.",
    ],
  },
  {
    id: "bima_bharosa",
    name: "IRDAI Bima Bharosa & LIC Unclaimed Portal",
    shortTag: "Forgotten Life Insurance Policies",
    statutoryAuthority: "IRDAI Protection of Policyholders' Interests Regulations",
    whatItReveals:
      "Unclaimed death claims, maturity payouts, survival benefits, or excess premium refunds held across LIC and all 23 private life insurers in India.",
    requiredKeys: ["pan_card"],
    directUrl: "https://bimabharosa.irdai.gov.in",
    turnaroundTime: "Instant portal check / 15-30 days policy claim payout",
    successRate: "All 24 Indian Life Insurers",
    offlineFallback:
      "Use the official LIC website 'Unclaimed Amounts of Policyholders' tool requiring only policyholder name and date of birth.",
    actionSteps: [
      "Step 1: Visit LIC India portal (licindia.in) > Unclaimed Amounts of Policyholders.",
      "Step 2: Enter deceased's Name, Date of Birth, and PAN to check all LIC divisional offices.",
      "Step 3: Check IRDAI Bima Bharosa portal for private life insurers (HDFC Life, ICICI Pru, SBI Life, Max Life).",
      "Step 4: Cross-check deceased's bank account statements for auto-debits to life insurance companies.",
      "Step 5: Submit Claim Form 3783 (Death Claim) along with original policy bond or indemnity bond if bond is lost.",
    ],
  },
  {
    id: "epfo",
    name: "EPFO UAN Member Portal & Pension (EPS 1995)",
    shortTag: "PF Balances, Pension & EDLI ₹7L",
    statutoryAuthority: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
    whatItReveals:
      "Accumulated provident fund balances, monthly widow/orphan survivor pension under EPS 1995, and free life insurance payout under EDLI Scheme (up to ₹7,00,000).",
    requiredKeys: ["epf_uan", "death_certificate"],
    directUrl: "https://www.epfindia.gov.in",
    turnaroundTime: "15 to 30 days via Employer or Regional PF Commissioner",
    successRate: "All Salaried Employees in India",
    offlineFallback:
      "If UAN is unknown, obtain the parent's PF account number from previous employer HR or Form 16.",
    actionSteps: [
      "Step 1: Check deceased's salary slips or Form 16 for the 12-digit Universal Account Number (UAN).",
      "Step 2: Log into the EPFO Unified Member Portal or submit death intimation to the parent's last employer.",
      "Step 3: File Composite Claim Form (Death Cases) comprising Form 20 (PF settlement), Form 10D (Monthly Pension for spouse/children), and Form 5IF (EDLI ₹7 Lakh life insurance).",
      "Step 4: Attach attested death certificate, canceled cheque of legal heir bank account, and joint photograph of claimants.",
      "Step 5: EPFO processes and credits funds directly via NEFT within 20 days.",
    ],
  },
  {
    id: "india_post",
    name: "India Post National Savings Schemes (PPF, NSC, KVP)",
    shortTag: "Postal PPF & Small Savings",
    statutoryAuthority: "Government Savings Promotion Act, 1873 (Amended 2018)",
    whatItReveals:
      "Public Provident Fund (PPF) accounts, National Savings Certificates (NSC), Senior Citizen Savings Scheme (SCSS), Kisan Vikas Patra (KVP), and Monthly Income Scheme (MIS) held at post offices.",
    requiredKeys: ["death_certificate"],
    directUrl: "https://www.indiapost.gov.in",
    turnaroundTime: "15 to 45 days at Head Post Office",
    successRate: "Extremely Common for Indian Senior Citizens",
    offlineFallback:
      "Physical visit to the local Sub-Post Office or Head Post Office with parent's address proof to verify ledger records.",
    actionSteps: [
      "Step 1: Inspect family home lockers for brown post office passbooks or physical certificate certificates.",
      "Step 2: Check deceased parent's bank passbooks for annual transfers into PPF account (15-year tenure).",
      "Step 3: Submit Form 11 (Claim for settlement of deceased depositor account) at the Post Office.",
      "Step 4: If claim value is up to ₹5 Lakhs, settlement is processed against Legal Heir Certificate + Indemnity Bond (Form 13).",
      "Step 5: If claim value exceeds ₹5 Lakhs and no nomination exists, Court Succession Certificate is mandatory.",
    ],
  },
];

export default function UnclaimedAssetsSearchClient() {
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
  const [copiedBankLetter, setCopiedBankLetter] = useState<boolean>(false);
  const [copiedRtaLetter, setCopiedRtaLetter] = useState<boolean>(false);
  const [copiedActionPlan, setCopiedActionPlan] = useState<boolean>(false);

  // Document Checklist State (Default: PAN + Death Certificate)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([
    "pan_card",
    "death_certificate",
    "mobile_sim",
  ]);

  const [activePortalTab, setActivePortalTab] = useState<string>("it_ais");

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

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetChecklist = () => {
    setSelectedDocs(["pan_card", "death_certificate", "mobile_sim"]);
  };

  const handleSelectAll = () => {
    setSelectedDocs(DOCUMENT_OPTIONS.map((d) => d.id));
  };

  // Compute Discovery Score
  const totalWeight = DOCUMENT_OPTIONS.reduce((acc, curr) => acc + curr.weight, 0);
  const currentWeight = DOCUMENT_OPTIONS.filter((d) => selectedDocs.includes(d.id)).reduce(
    (acc, curr) => acc + curr.weight,
    0
  );

  // Scaled probability: 0 to 98% (because 100% of untraced cash/gold without paperwork is impossible)
  const discoveryScore = Math.min(98, Math.round((currentWeight / totalWeight) * 100));

  // Determine Unlocked Portals
  const unlockedPortalIds = new Set<string>();
  DOCUMENT_OPTIONS.forEach((doc) => {
    if (selectedDocs.includes(doc.id)) {
      doc.unlockedPortals.forEach((p) => unlockedPortalIds.add(p));
    }
  });

  const unlockedPortals = PORTAL_GUIDES.filter((p) => unlockedPortalIds.has(p.id));
  const lockedPortals = PORTAL_GUIDES.filter((p) => !unlockedPortalIds.has(p.id));

  // Copy Bank Statement Intimation Letter
  const copyBankLetter = () => {
    const letter = `FORMAL INTIMATION & DISCLOSURE APPLICATION UNDER SECTION 159 & RBI DECEASED ACCOUNT CIRCULAR
To:
The Branch Manager,
[Name of Bank], [Branch Name & City]

Subject: Intimation of Demise of Account Holder Late [Deceased Parent Full Name] (PAN: [Deceased PAN]) and Request for Statement of Inoperative / Savings / Fixed Deposit Accounts & Locker Inventory.

Respected Sir / Madam,

1. I, [Legal Heir Full Name], residing at [Your Address], am the lawful legal heir / representative of Late [Deceased Parent Full Name], who passed away on [Date of Death] at [City/State]. A certified copy of the Death Certificate is enclosed herewith for your verification.

2. Deceased Account Particulars:
   - Name of Deceased: Late [Deceased Parent Full Name]
   - PAN of Deceased: [Deceased PAN]
   - Suspected Account Number(s) / Customer ID / Chequebook Reference: [Account Number or "All Accounts under PAN"]

3. Under Section 159 of the Income Tax Act, 1961, and the Reserve Bank of India Master Circular on Settlement of Claims in respect of Deceased Depositors (DBOD.No.Leg.BC.95/09.07.005/2004-05), you are hereby requested to:
   a) Place an immediate caution / debit freeze on all sole accounts held by the deceased to safeguard funds;
   b) Provide a certified Account Statement / Balance Certificate for all Savings, Current, Inoperative, Fixed Deposit (FD/RD), and Locker accounts standing in the name of the deceased;
   c) Disclose whether any valid nomination is registered under Form DA-1 in your records;
   d) Provide the bank's standard deceased claim application docket (Form DA-2 / Indemnity format).

4. Please find attached self-attested copies of:
   - Certified Death Certificate
   - Copy of PAN & Aadhaar of the Deceased
   - Proof of Legal Heirship (Legal Heir Certificate / Surviving Member Certificate / Registered Will)
   - Identity & Address Proof of the Applicant Legal Heir (PAN & Aadhaar)

Kindly process this intimation and provide the account statements within 7 working days.

Yours faithfully,
[Your Signature]
[Your Full Name]
[Your Email Address]
[Date & City]`;
    navigator.clipboard.writeText(letter);
    setCopiedBankLetter(true);
    setTimeout(() => setCopiedBankLetter(false), 3000);
  };

  // Copy RTA / Folio Search Letter
  const copyRtaLetter = () => {
    const letter = `STATUTORY FOLIO SEARCH & HOLDING CONFIRMATION REQUEST UNDER SEBI MASTER CIRCULAR
To:
The Compliance Officer / Investor Relations,
[Name of RTA: CAMS / KFintech / Link Intime / Bigshare / MUDS],
[Address of RTA]

Subject: Request for Search and Holding Statement of Equity Shares / Mutual Fund Folios held by Deceased Investor Late [Deceased Parent Full Name] (PAN: [Deceased PAN]).

Dear Sir / Madam,

1. This is to formally inform you of the sad demise of Late [Deceased Parent Full Name] on [Date of Death]. I am the surviving lawful legal heir of the deceased.

2. Investor Credentials:
   - Deceased Investor Full Name: Late [Deceased Parent Full Name]
   - PAN: [Deceased PAN]
   - Suspected Folio Number(s) / Company Name: [Folio Numbers or "All Folios registered against PAN"]
   - Registered Address: [Address as per old records]

3. Under SEBI Master Circular on Transmission of Securities (SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65), please perform a central PAN-level database query and issue:
   a) Certified Statement of Holdings for all folios standing in the name of the deceased;
   b) Unclaimed / Unpaid Dividend history and whether any shares have been transferred to the IEPF Authority under Section 124(6) of the Companies Act, 2013;
   c) Form ISR-4 / Transmission Requirement Docket outlining whether claim is within the simplified threshold (up to ₹5 Lakhs for physical / ₹15 Lakhs for demat) or requires a Court Succession Certificate.

Enclosures:
1. Notarized copy of Death Certificate.
2. Self-attested PAN and Aadhaar of Deceased.
3. Self-attested PAN, Aadhaar, and Client Master List (CML) of Applicant Legal Heir.
4. Client Request Form (Form ISR-1 / ISR-2) with bank attestation.

Yours sincerely,
[Your Signature]
[Your Full Name]
[Date & City]`;
    navigator.clipboard.writeText(letter);
    setCopiedRtaLetter(true);
    setTimeout(() => setCopiedRtaLetter(false), 3000);
  };

  // Copy Action Plan
  const copyActionPlan = () => {
    const planText = `UNCLAIMED ASSETS DISCOVERY ROADMAP FOR DECEASED PARENT (WillDrafting.in):
Discovery Probability: ${discoveryScore}%
Documents in hand: ${selectedDocs.map((id) => DOCUMENT_OPTIONS.find((d) => d.id === id)?.label).join(", ")}

PRIORITIZED 8-PORTAL ACTION CHECKLIST:
1. Income Tax AIS/TIS: Register on incometax.gov.in under Sec 159 (Representative Assessee) to download AIS showing all banks, interest, and dividends.
2. MFCentral: Check mfcentral.com using PAN for 100% mutual fund folios nationwide.
3. CDSL/NSDL e-CAS: Generate Consolidated Account Statement for all brokers and equity holdings.
4. RBI UDGAM: Search udgam.rbi.org.in for dormant bank accounts inactive for 10+ years across 30+ banks.
5. IEPF Portal: Check iepf.gov.in for unpaid dividends & shares transferred under Section 124(6) of Companies Act.
6. IRDAI Bima Bharosa & LIC: Search licindia.in unclaimed portal for forgotten life insurance death claims.
7. EPFO / UAN: File Form 20, 10D, and Form 5IF (EDLI ₹7 Lakh life cover) via employer.
8. India Post: File Form 11 at local Head Post Office for PPF, NSC, and postal savings certificates.

Generated via WillDrafting.in Unclaimed Assets Search Roadmap Tool.`;
    navigator.clipboard.writeText(planText);
    setCopiedActionPlan(true);
    setTimeout(() => setCopiedActionPlan(false), 3000);
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
            <span>INCOME TAX SEC 159 • RBI UDGAM • SEBI CAS • IEPF MCA21</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Find Deceased Parents Bank Accounts &amp; Investments
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Over <strong>₹1.8 Lakh Crore</strong> in unclaimed bank deposits, shares, mutual funds, and
            policies sits forgotten in India. Use our free interactive <strong>Asset Detective Roadmap</strong>{" "}
            to systematically trace hidden financial assets across 8 official statutory portals.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-roadmap-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Launch Asset Detective Tool</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Protect Heirs with a Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">98%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ASSET DISCOVERY VIA PAN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30+ Banks</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBI UDGAM PORTAL ACCESS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 159</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LEGAL HEIR AIS ACCESS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹1.8 Lakh Cr</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                UNCLAIMED INDIAN WEALTH
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
                <span>Statutory Authorities</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Income Tax Act Sec 159, Banking Regulation Act Sec 26A, Companies Act
                Sec 124(6), SEBI Transmission Master Circulars &amp; Indian Succession Act, 1925.
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
                <span>EXECUTIVE BRIEF: TRACING DECEASED PARENTS ASSETS IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>PAN Is Your Master Key:</strong> You do not need to visit 50 bank branches.
                    A single PAN number unlocks Consolidated Account Statements (CAS) across CDSL, NSDL,
                    and MFCentral, tracing 100% of mutual funds, shares, and Demat accounts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 159 Legal Heir AIS:</strong> Register as a Representative Assessee
                    on the Income Tax portal under Section 159. Download the deceased parent&apos;s AIS/TIS
                    to see all banks paying interest, fixed deposits, and dividend records.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>RBI UDGAM for Dormant Bank Deposits:</strong> Accounts inactive for 10+ years
                    are moved to the RBI DEA Fund. The centralized UDGAM portal searches over 30 public
                    and private banks instantly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>IEPF Shares Recovery:</strong> Shares with 7 consecutive years of unpaid
                    dividends are transferred to the MCA IEPF Authority. Legal heirs can reclaim them via
                    Form IEPF-5 and an RTA Entitlement Letter.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL BANNER CARD (OG Image display on page) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
              <div className="relative w-full aspect-[16/9] sm:aspect-[1.91/1] bg-slate-900">
                <Image
                  src="/images/unclaimed-assets-search-roadmap-tool-og.jpg"
                  alt="Unclaimed Assets Search Roadmap Tool India: Tracing Deceased Parents Bank Accounts"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50/50 via-white to-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    STATUTORY ASSET DISCOVERY PROTOCOL
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    8-Portal Verification Blueprint for Indian Legal Heirs
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Legal Heir Workflow</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY REALITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. The Unclaimed Wealth Crisis: Why 98% of Assets Can Be Traced
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Every year in India, thousands of families face an overwhelming crisis when an elderly
                  parent passes away suddenly without having documented their financial assets. In traditional
                  Indian households, parents often maintained bank accounts, fixed deposits, post office
                  certificates, and physical shares across multiple institutions without discussing them with
                  their children or spouse.
                </p>
                <p>
                  According to official government disclosures, over <strong>₹1.8 Lakh Crore</strong> of
                  unclaimed wealth currently sits locked across the Reserve Bank of India&apos;s Depositor
                  Education and Awareness (DEA) Fund, the Ministry of Corporate Affairs&apos; Investor
                  Education and Protection Fund (IEPF), unclaimed insurance proceeds, and dormant mutual fund
                  folios.
                </p>
                <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 sm:p-5 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>The #1 Legal Blind Spot of Surviving Families</span>
                  </div>
                  <p>
                    Most heirs assume they must manually visit dozens of physical bank branches or hire
                    unlicensed recovery agents charging 20% to 30% cuts. In reality, modern Indian financial
                    regulations have linked virtually every legitimate financial holding to the deceased&apos;s
                    Permanent Account Number (PAN). By utilizing the 8 statutory portals detailed in this roadmap,
                    legal heirs can systematically identify and claim up to 98% of all domestic assets directly.
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================================
                SECTION 2: THE INTERACTIVE TOOL (ASSET DETECTIVE ROADMAP)
                ===================================================================== */}
            <section
              id="interactive-roadmap-tool"
              className="scroll-target scroll-mt-28 rounded-3xl bg-white border border-slate-200 shadow-md p-5 sm:p-7 md:p-8 space-y-8"
            >
              {/* Tool Header */}
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold uppercase tracking-wider">
                    <Search className="w-3.5 h-3.5" />
                    <span>Interactive Asset Detective Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetChecklist}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Reset to default selection"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Plan</span>
                    </button>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  2. Interactive Asset Detective: 8-Portal Discovery Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select the documents and credentials you currently have in hand. The tool dynamically
                  calculates your asset traceability score and reveals the exact statutory discovery steps.
                </p>
              </div>

              {/* STEP 1: DOCUMENT SELECTOR MATRIX */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" />
                    <span>STEP 1: SELECT AVAILABLE DOCUMENTS &amp; ACCESS</span>
                  </div>
                  <button
                    onClick={handleSelectAll}
                    className="text-xs text-[#C65378] hover:underline font-bold"
                  >
                    Select All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DOCUMENT_OPTIONS.map((doc) => {
                    const isChecked = selectedDocs.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleDoc(doc.id)}
                        className={`cursor-pointer rounded-2xl border p-3.5 sm:p-4 transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? "bg-rose-50/60 border-[#C65378] shadow-xs"
                            : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#C65378] text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            {doc.label}
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                            {doc.description}
                          </p>
                          <span className="inline-block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                            {doc.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: DYNAMIC DISCOVERY SCOREBOARD */}
              <div className="rounded-3xl bg-[#172228] text-white p-5 sm:p-7 shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                      DISCOVERY DIAGNOSTIC RESULT
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      Asset Traceability Probability Score
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-3xl sm:text-4xl font-black text-rose-400">
                        {discoveryScore}%
                      </div>
                      <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        {discoveryScore >= 80
                          ? "Comprehensive Traceability"
                          : discoveryScore >= 50
                          ? "Moderate Traceability"
                          : "Basic Discovery Scope"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="w-full h-3 rounded-full bg-white/15 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-500"
                      style={{ width: `${discoveryScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-white/70">
                    <span>Low Discovery (0-40%)</span>
                    <span>Standard Coverage (40-75%)</span>
                    <span>Full 8-Portal Access (75-98%)</span>
                  </div>
                </div>

                {/* Dynamic Insight Box based on PAN */}
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-xs text-white/90 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-200">
                    <Key className="w-4 h-4 text-rose-300" />
                    <span>
                      {selectedDocs.includes("pan_card")
                        ? "Master Key Detected: Deceased PAN Unlocks Centralized Verification"
                        : "Crucial Notice: Deceased PAN Not Selected"}
                    </span>
                  </div>
                  <p className="leading-relaxed text-xs text-white/80">
                    {selectedDocs.includes("pan_card")
                      ? "Because you have the deceased parent's PAN, you can unlock 100% of mutual funds (MFCentral), all Demat brokers (CDSL/NSDL e-CAS), dormant bank accounts (RBI UDGAM), and all interest-paying banks via Income Tax Section 159 legal heir login."
                      : "Without the deceased parent's PAN, asset tracing requires manual searching using full name, date of birth, and old addresses on RBI UDGAM and physical visits to banks with certified death certificates."}
                  </p>
                </div>
              </div>

              {/* STEP 3: UNLOCKED STATUTORY PORTAL PLAYBOOKS */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>STEP 2: EXPLORE UNLOCKED PORTAL DISCOVERY GUIDES</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {unlockedPortals.length} of {PORTAL_GUIDES.length} Portals Unlocked
                  </span>
                </div>

                {/* Portal Tabs Selector */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {PORTAL_GUIDES.map((portal) => {
                    const isUnlocked = unlockedPortalIds.has(portal.id);
                    const isSelected = activePortalTab === portal.id;
                    return (
                      <button
                        key={portal.id}
                        onClick={() => setActivePortalTab(portal.id)}
                        className={`py-2 px-3.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                          isSelected
                            ? "bg-[#172228] text-white border-[#172228] shadow-sm"
                            : isUnlocked
                            ? "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isUnlocked ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                        />
                        <span>{portal.name.split(" ")[0]}</span>
                        <span className="text-[10px] opacity-80">({portal.shortTag})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Portal Detail Box */}
                {(() => {
                  const currentPortal =
                    PORTAL_GUIDES.find((p) => p.id === activePortalTab) || PORTAL_GUIDES[0];
                  const isCurrentUnlocked = unlockedPortalIds.has(currentPortal.id);

                  return (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                isCurrentUnlocked
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-[#C65378]"
                              }`}
                            >
                              {isCurrentUnlocked ? "Unlocked & Ready" : "Document Missing"}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {currentPortal.statutoryAuthority}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900">
                            {currentPortal.name}
                          </h3>
                        </div>
                        <a
                          href={currentPortal.directUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shrink-0"
                        >
                          <span>Visit Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="space-y-1.5 bg-white rounded-2xl p-4 border border-slate-200/80">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#C65378]">
                            <Search className="w-3.5 h-3.5" />
                            <span>WHAT THIS PORTAL REVEALS</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed text-xs">
                            {currentPortal.whatItReveals}
                          </p>
                        </div>

                        <div className="space-y-1.5 bg-white rounded-2xl p-4 border border-slate-200/80">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-emerald-700">
                            <Clock className="w-3.5 h-3.5" />
                            <span>PROCESSING METRICS &amp; SCOPE</span>
                          </div>
                          <div className="space-y-1 text-xs text-slate-700">
                            <div>
                              <strong>Turnaround:</strong> {currentPortal.turnaroundTime}
                            </div>
                            <div>
                              <strong>Discovery Precision:</strong> {currentPortal.successRate}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step by step action execution list */}
                      <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                        <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-[#C65378]" />
                          <span>STEP-BY-STEP EXECUTION PROTOCOL</span>
                        </div>
                        <div className="space-y-2">
                          {currentPortal.actionSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <span className="w-5 h-5 rounded-full bg-rose-50 text-[#C65378] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Offline / Dead Mobile Fallback Notice */}
                      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-950">
                          <Info className="w-4 h-4 text-amber-600" />
                          <span>Offline Fallback &amp; Inactive Mobile Workaround:</span>
                        </div>
                        <p className="leading-relaxed">{currentPortal.offlineFallback}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* ACTION BUTTONS: COPY PLAN & DRAFT WILL */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={copyActionPlan}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  {copiedActionPlan ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span>Roadmap Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Complete Action Plan</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Public Verification Protocols</span>
                </div>
              </div>
            </section>

            {/* SECTION 3: INCOME TAX AIS & TIS */}
            <section id="section-159-income-tax-ais" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>CENTRALIZED TAX DATABASE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Income Tax AIS: Section 159 Legal Heir Registration SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The Single Most Comprehensive Tool for tracing unknown financial assets in India is the{" "}
                  <strong>Annual Information Statement (AIS)</strong> and{" "}
                  <strong>Taxpayer Information Summary (TIS)</strong> maintained by the Directorate of Income
                  Tax (Systems). Under the Income Tax Act, 1961, all scheduled commercial banks, cooperative
                  banks, depository participants, mutual fund registrars, and asset management companies are
                  mandated to report financial transactions through the Statement of Financial Transactions
                  (SFT).
                </p>
                <p>
                  Even if your deceased parent had 12 different savings accounts or fixed deposits across
                  various cooperative banks that you never knew about, every bank that credited savings interest
                  above ₹10,000 or term deposit interest exceeding ₹40,000 (₹50,000 for senior citizens) was
                  legally required to file Form 26AS / SFT-005 reporting the deceased&apos;s PAN.
                </p>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-xs">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>How Legal Heirs Gain Authorized Access under Section 159</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Heirs often mistakenly attempt to log in using the deceased parent&apos;s credentials, only
                    to find that the registered mobile number has been disconnected by the telecom operator.
                    The official legal procedure under Section 159 is as follows:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>Login to Your Own Profile:</strong> The legal heir must log into their own
                      personal e-Filing portal profile at <code>incometax.gov.in</code>.
                    </li>
                    <li>
                      <strong>Representative Assessee Request:</strong> Navigate to{" "}
                      <em>Authorized Partners &gt; Register as Representative Assessee</em> and click{" "}
                      <em>Create New Request</em>.
                    </li>
                    <li>
                      <strong>Select Category:</strong> Choose <em>Deceased (Legal Heir)</em>.
                    </li>
                    <li>
                      <strong>Upload Proof Docket:</strong> Provide: (a) PAN of the deceased, (b) Date of
                      death, (c) Certified death certificate, (d) Legal Heir Certificate, Surviving Member
                      Certificate, or registered Will / Probate, and (e) Indemnity Bond if applicable.
                    </li>
                    <li>
                      <strong>Assessing Officer Approval:</strong> The jurisdictional Assessing Officer
                      reviews the documents and approves access within 3 to 7 working days.
                    </li>
                    <li>
                      <strong>Switch Account &amp; Download AIS:</strong> Once approved, the heir uses the{" "}
                      <em>Switch Account</em> toggle on the top right of the screen to enter the deceased
                      parent&apos;s dashboard, where the full AIS, TIS, and Form 26AS can be downloaded in
                      PDF/JSON format.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* SECTION 4: MUTUAL FUNDS & DEMAT CAS */}
            <section id="mutual-funds-demat-cas" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>SECURITIES &amp; EQUITIES TRACE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Mutual Funds &amp; Demat: CAS Protocol via CDSL &amp; MFCentral
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Tracing stock portfolios and mutual fund folios was historically an exhausting process
                  requiring correspondence with dozens of individual asset management companies. Under SEBI
                  guidelines, all market holdings are now mapped to the investor&apos;s PAN in centralized
                  depository databases.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2 text-[#C65378]">
                      <Building2 className="w-4 h-4" />
                      <span>MFCentral (Mutual Funds Unified)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Jointly launched by CAMS and KFintech, MFCentral covers all 44+ mutual fund houses in
                      India. Legal heirs can generate a Consolidated Account Statement (CAS) summarizing all
                      active folios, systematic investment plans (SIPs), and folio balances simply by
                      entering the deceased&apos;s PAN.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2 text-[#5F7E75]">
                      <Database className="w-4 h-4" />
                      <span>CDSL &amp; NSDL (Demat Shares e-CAS)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Whether your parent held Demat accounts with Zerodha, Groww, ICICI Direct, HDFC
                      Securities, or a local broker, CDSL and NSDL generate a monthly e-CAS aggregating all
                      equities, exchange-traded funds (ETFs), and Sovereign Gold Bonds (SGBs) under their PAN.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: RBI UDGAM PORTAL */}
            <section id="rbi-udgam-bank-deposits" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>CENTRAL BANK RECOVERY GATEWAY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. RBI UDGAM Portal: Trace Dormant &amp; Inactive Bank Accounts
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 26A of the Banking Regulation Act, 1949, all commercial and cooperative banks
                  in India are required to transfer balances from savings and current accounts that have not
                  been operated for 10 consecutive years, or term deposits unclaimed for 10 years after
                  maturity, to the <strong>Depositor Education and Awareness (DEA) Fund</strong> maintained by
                  the Reserve Bank of India.
                </p>
                <p>
                  To eliminate the hurdle of visiting multiple banks, the RBI developed{" "}
                  <strong>UDGAM (Unclaimed Deposits Gateway to Access Information)</strong>. The portal covers
                  over 30 major banks representing more than 90% of all unclaimed deposits in India, including
                  State Bank of India, Punjab National Bank, Central Bank of India, Bank of Baroda, HDFC Bank,
                  ICICI Bank, Axis Bank, and Kotak Mahindra Bank.
                </p>
                <div className="rounded-2xl bg-rose-50/70 border border-rose-200/80 p-4 sm:p-5 text-xs sm:text-sm text-slate-800 space-y-2">
                  <div className="font-bold text-[#C65378] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>How to Claim UDGAM Deposits Once Traced</span>
                  </div>
                  <p>
                    UDGAM provides the specific Bank Name, Branch Name, and Unclaimed Deposit Reference Number
                    (UDRN). Once you locate an entry, you do not file the claim with the RBI; you visit the
                    identified home branch. If a nominee exists, the branch must settle within 15 days under
                    RBI guidelines. If no nominee is registered, Class I legal heirs submit Form DA-2 along
                    with an Indemnity Bond and Legal Heir Certificate.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: IEPF SHARES & UNPAID DIVIDENDS */}
            <section id="iepf-shares-unpaid-dividends" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MINISTRY OF CORPORATE AFFAIRS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. IEPF Shares &amp; Dividends: MCA Verification &amp; Recovery
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 124(6) of the Companies Act, 2013, if dividends declared by a listed Indian
                  corporation remain unpaid or unclaimed for seven consecutive years, the company is legally
                  obligated to transfer both the unpaid dividends and the underlying equity shares to the{" "}
                  <strong>Investor Education and Protection Fund (IEPF) Authority</strong> under the Ministry of
                  Corporate Affairs (MCA).
                </p>
                <p>
                  In many Indian families, grandparents or parents bought 100 shares of blue-chip companies
                  (like Reliance, Tata Motors, L&amp;T, ITC, or HUL) in the 1980s or 1990s as physical paper
                  certificates. Because physical dividends were sent by post to old ancestral addresses, they
                  went unclaimed. Today, with stock splits and bonus issues, those 100 shares are frequently
                  worth ₹20 Lakhs to ₹1.5 Crores, but sit held in the name of the IEPF Authority!
                </p>
                <p>
                  To verify and reclaim these shares, legal heirs must:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    Search the MCA IEPF portal database using the parent&apos;s PAN or old folio number.
                  </li>
                  <li>
                    Approach the company Registrar &amp; Transfer Agent (RTA) for Form ISR-4 (Entitlement
                    Letter).
                  </li>
                  <li>
                    Obtain a Civil District Court Succession Certificate or Probate if the total market value
                    exceeds ₹5 Lakhs (or execute an Indemnity Bond under Rule 7 if below threshold).
                  </li>
                  <li>
                    E-file Form IEPF-5 on the MCA21 portal and submit the verified physical claim docket.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 7: BIMA BHAROSA & LIFE INSURANCE */}
            <section id="bima-bharosa-life-insurance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>IRDAI CENTRALIZED REPOSITORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Bima Bharosa &amp; Life Insurance: Finding Forgotten Policies
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Life Insurance Corporation of India (LIC) and private life insurers hold thousands of crores
                  in unclaimed maturity proceeds, survival benefits, and death claims. When policy documents
                  are lost or damaged, legal heirs have two primary statutory search mechanisms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 text-sm text-[#C65378]">
                      LIC Central Unclaimed Portal
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Visit <code>licindia.in</code> and open the &quot;Unclaimed Amounts of Policyholders&quot;
                      search tool. You can search across all 2,000+ LIC branches nationwide by simply entering
                      the policyholder&apos;s name and date of birth.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-bold text-slate-900 text-sm text-emerald-700">
                      IRDAI Bima Bharosa Portal
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Operated by the Insurance Regulatory and Development Authority of India (IRDAI), the{" "}
                      <strong>Bima Bharosa</strong> grievance and search system helps trace active and
                      unclaimed policies across private life insurers like HDFC Life, ICICI Prudential, SBI
                      Life, Max Life, and Tata AIA.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: EPFO & POST OFFICE */}
            <section id="epfo-post-office-schemes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4" />
                <span>RETIREMENT &amp; SMALL SAVINGS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. EPFO &amp; Post Office Schemes: Tracing Provident Fund &amp; PPF
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For salaried parents, substantial wealth is frequently locked in the Employees&apos;
                  Provident Fund (EPFO), which encompasses three distinct benefits:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>EPF Accumulation (Form 20):</strong> The full employee and employer provident fund
                    balance with compound interest credited up to the date of settlement.
                  </li>
                  <li>
                    <strong>EPS 1995 Survivor Pension (Form 10D):</strong> Monthly life pension payable to the
                    surviving spouse for life, along with monthly pension for up to two children until age 25.
                  </li>
                  <li>
                    <strong>EDLI Life Insurance Cover (Form 5IF):</strong> Under the Employees&apos; Deposit
                    Linked Insurance Scheme, legal heirs are entitled to an automatic, free life insurance payout
                    of up to <strong>₹7,00,000</strong> without any separate insurance policy document.
                  </li>
                </ol>
                <p className="pt-2">
                  Similarly, elderly parents frequently invested in India Post Small Savings Schemes like
                  National Savings Certificates (NSC), Senior Citizen Savings Scheme (SCSS), and Public
                  Provident Fund (PPF). Under the Government Savings Promotion Rules, 2018, claims up to ₹5
                  Lakhs can be settled by the Head Postmaster against an Indemnity Bond (Form 13) and Legal Heir
                  Certificate without requiring a court order.
                </p>
              </div>
            </section>

            {/* SECTION 9: PORTALS COMPARISON MATRIX */}
            <section id="portals-comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE STATUTORY DIRECTORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Official Portals Comparison: Authority &amp; Access Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The following comparison table summarizes the 8 statutory portals, their governing legal
                  authorities, the primary search parameters required, and typical turnaround times:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-4 font-bold">Portal / Channel</th>
                        <th className="py-3 px-4 font-bold">Governing Authority</th>
                        <th className="py-3 px-4 font-bold">What is Traced</th>
                        <th className="py-3 px-4 font-bold">Search Input</th>
                        <th className="py-3 px-4 font-bold">Resolution Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Income Tax AIS / TIS</td>
                        <td className="py-3 px-4">CBDT (Sec 159 ITA)</td>
                        <td className="py-3 px-4">Bank interest, FDs, Dividends, Stock Sales</td>
                        <td className="py-3 px-4">Deceased PAN + Legal Heir Auth</td>
                        <td className="py-3 px-4">3 to 7 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">MFCentral (CAS)</td>
                        <td className="py-3 px-4">SEBI (CAMS &amp; KFintech)</td>
                        <td className="py-3 px-4">100% Mutual Fund Folios Nationwide</td>
                        <td className="py-3 px-4">PAN + Mobile OTP / Physical ISC</td>
                        <td className="py-3 px-4">Instant / 2-5 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">CDSL / NSDL e-CAS</td>
                        <td className="py-3 px-4">SEBI Depositories</td>
                        <td className="py-3 px-4">Demat Accounts, Equities, Bonds, SGBs</td>
                        <td className="py-3 px-4">PAN + Depository Query</td>
                        <td className="py-3 px-4">24 to 48 Hours</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">RBI UDGAM</td>
                        <td className="py-3 px-4">Reserve Bank of India (DEA Fund)</td>
                        <td className="py-3 px-4">Dormant Accounts across 30+ Banks</td>
                        <td className="py-3 px-4">Name + PAN / DOB / Voter ID</td>
                        <td className="py-3 px-4">Instant Search</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">IEPF Authority</td>
                        <td className="py-3 px-4">Ministry of Corporate Affairs</td>
                        <td className="py-3 px-4">Shares &amp; Dividends unpaid for 7 years</td>
                        <td className="py-3 px-4">PAN, Folio Number, or Name</td>
                        <td className="py-3 px-4">45 to 90 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">Bima Bharosa / LIC</td>
                        <td className="py-3 px-4">IRDAI</td>
                        <td className="py-3 px-4">Unclaimed Life Policies across 24 Insurers</td>
                        <td className="py-3 px-4">Policyholder Name + DOB / PAN</td>
                        <td className="py-3 px-4">Instant Search</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">EPFO Portal</td>
                        <td className="py-3 px-4">Ministry of Labour (EPFO)</td>
                        <td className="py-3 px-4">PF Balance, EPS Pension, EDLI ₹7L Cover</td>
                        <td className="py-3 px-4">UAN / Aadhaar / Employer PF ID</td>
                        <td className="py-3 px-4">15 to 30 Days</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">India Post POSB</td>
                        <td className="py-3 px-4">Department of Posts</td>
                        <td className="py-3 px-4">PPF, NSC, KVP, SCSS Small Savings</td>
                        <td className="py-3 px-4">Passbook / Form 11 at Head PO</td>
                        <td className="py-3 px-4">15 to 45 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-discovery-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PROCEDURAL ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Asset Discovery to Claim Transmission
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To maximize efficiency and prevent duplicate legal paperwork, legal heirs should execute
                  their post-death discovery in four sequential phases:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-[#C65378]">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] text-xs flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Phase 1: Securing Foundational Credentials</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Secure the original Death Certificate (obtain at least 15-20 certified copies from the
                      municipal registrar), keep the deceased parent&apos;s physical PAN card, Aadhaar card,
                      and maintain their mobile SIM card active for at least 6 to 12 months.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-[#5F7E75]">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#5F7E75] text-xs flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Phase 2: Digital Database Audit</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Register under Section 159 on the Income Tax portal. Run searches across MFCentral, CDSL
                      e-CAS, RBI UDGAM, and the IEPF portal. Compile a master inventory of all bank accounts,
                      folios, and demat accounts.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-indigo-700">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold">
                        3
                      </span>
                      <span>Phase 3: Legal Heirship Fortification</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Obtain an administrative Legal Heir Certificate or Surviving Member Certificate from the
                      Tehsildar / SDM. If total share portfolios exceed ₹5-15 Lakhs or bank claims exceed branch
                      limits, file for a Court Succession Certificate under Section 372 of the Indian
                      Succession Act.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2 text-amber-700">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold">
                        4
                      </span>
                      <span>Phase 4: Transmission Execution</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit transmission claims: Form DA-2 for banks with nominees, SEBI Form ISR-4 for
                      demat/mutual fund units, Form IEPF-5 for MCA shares, and Form 11 at post offices.
                      Coordinate mutual releases among co-heirs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>REAL-WORLD SUCCESS STORIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Case Studies: Delhi, Mumbai &amp; Bengaluru Recoveries
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                {/* Case 1 */}
                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      CASE 1: DELHI (THE DORMANT LOCKER &amp; INOPERATIVE FDS)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      ₹42 Lakhs Recovered
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Following the death of a retired Central Government engineer in Rohini, Delhi, his two
                    daughters had no documentation other than his pension passbook. By registering as legal
                    heirs under Section 159 on the Income Tax portal, their counsel downloaded his AIS, which
                    revealed two previously unknown fixed deposit accounts in a public sector bank paying ₹1.8
                    Lakh annual interest. Further search on RBI UDGAM uncovered an inoperative savings account
                    with ₹14 Lakhs. Both claims were successfully disbursed within 30 days.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      CASE 2: MUMBAI (1990S PHYSICAL SHARES TRANSFERRED TO IEPF)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      ₹1.15 Crore Recovered
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A family in Matunga discovered 200 physical share certificates of an Indian FMCG major
                    dating back to 1994 in an old metal trunk. Querying the IEPF portal confirmed that the
                    shares and 14 unpaid dividend tranches had been transferred to IEPF under Section 124(6).
                    AMA Legal Solutions filed a Section 372 Succession Certificate petition before the Bombay
                    High Court, secured an Entitlement Letter from the RTA, and filed Form IEPF-5, crediting
                    12,000 split shares directly into the widow&apos;s demat account.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      CASE 3: BENGALURU (MUTUAL FUND TRANSMISSION WITHOUT NOMINEE)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      ₹28 Lakhs Transmitted
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An IT professional in Whitefield passed away intestate. While the spouse had access to
                    his primary bank account, he had invested in 6 different equity mutual funds across CAMS and
                    KFintech without registering a nominee. Using MFCentral CAS, the surviving spouse mapped
                    all folios. With a Surviving Member Certificate and mutual No-Objection Affidavits from the
                    deceased&apos;s parents, the units were transmitted to the spouse under SEBI Form ISR-4
                    within 18 days.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: STATUTORY LETTER TEMPLATES */}
            <section id="legal-templates-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>DOWNLOADABLE LEGAL FORMATS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Letter Templates: Bank Intimation &amp; Folio Search
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Use these lawyer-drafted, copy-pasteable legal notice templates to formally request account
                disclosures from banks and Registrars &amp; Transfer Agents (RTAs) without unnecessary delays:
              </p>

              {/* TEMPLATE 1: BANK INTIMATION */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                      TEMPLATE 1: BANK BRANCH ASSET INTIMATION
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Deceased Account Balance &amp; Statement Disclosure Application
                    </div>
                  </div>
                  <button
                    onClick={copyBankLetter}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0"
                  >
                    {copiedBankLetter ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bank Application</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
{`To:
The Branch Manager, [Bank Name], [Branch Location]
Subject: Intimation of Demise of Late [Parent Full Name] (PAN: [PAN]) and Request for Statement of Inoperative / Savings / Fixed Deposit Accounts & Locker Inventory.

Respected Sir / Madam,
1. I, [Legal Heir Name], residing at [Address], am the lawful legal heir / representative of Late [Parent Full Name], who passed away on [Date of Death]. Certified Death Certificate is enclosed.
2. Under Section 159 of Income Tax Act and RBI Master Circular DBOD.No.Leg.BC.95/09.07.005/2004-05:
   a) Please place an immediate caution / debit freeze on all sole accounts of the deceased;
   b) Issue certified statement of all Savings, Current, Inoperative, Fixed Deposit, and Locker accounts;
   c) Disclose whether any valid nomination exists under Form DA-1;
   d) Provide your branch deceased claim settlement forms.

Enclosed: Death Certificate, PAN & Aadhaar of Deceased, Legal Heirship Proof, Heir ID Proof.

Yours faithfully,
[Your Name]`}
                </pre>
              </div>

              {/* TEMPLATE 2: RTA / FOLIO SEARCH */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-0.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                      TEMPLATE 2: RTA / DEPOSITORY FOLIO QUERY
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Mutual Fund &amp; Listed Equity Share Holding Request Letter
                    </div>
                  </div>
                  <button
                    onClick={copyRtaLetter}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0"
                  >
                    {copiedRtaLetter ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy RTA Letter</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
{`To:
The Compliance Officer, [RTA Name: CAMS / KFintech / Link Intime], [Address]
Subject: Request for Search and Holding Statement of Equity Shares / Mutual Fund Folios of Deceased Investor Late [Parent Full Name] (PAN: [PAN]).

Dear Sir / Madam,
1. Sad demise of Late [Parent Full Name] on [Date of Death]. I am the surviving lawful legal heir.
2. Under SEBI Master Circular SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2022/65:
   a) Perform PAN-level query and issue Statement of Holdings across all folios;
   b) Disclose unpaid dividend history and whether shares are transferred to IEPF under Sec 124(6);
   c) Issue Form ISR-4 transmission docket.

Enclosed: Notarized Death Certificate, Deceased PAN, Legal Heir ID & Client Master List (CML).

Yours sincerely,
[Your Name]`}
                </pre>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL COUNSEL &amp; LITIGATION DESK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Institutional Backing: Senior Succession Advocates &amp; Team
              </h3>
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Advocate Anuj Anand Malik
                    </h3>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession &amp; High Court Probate Counsel • AMA Legal Solutions
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-slate-400" />
                      <span>Bar Council of Delhi • Supreme Court &amp; Delhi High Court Bar</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Specializing in complex testamentary disputes, Section 372 Succession Certificate
                  petitions, high-stakes IEPF share recovery litigation, and Section 159 legal heir
                  representation across North India, Maharashtra, and Karnataka. Backed by AMA Legal
                  Solutions&apos; dedicated corporate secretarial and High Court litigation bench.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Advocate Representation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>Offices in Delhi NCR &amp; Associate Desks Pan-India</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Tracing Deceased Parents Assets
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3 bg-[#FAF7F0]/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTAL DIRECTORY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Authorities &amp; Official Government Portal Directory
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <a
                  href="https://udgam.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">RBI UDGAM Central Portal</div>
                    <div className="text-slate-500 text-[11px]">udgam.rbi.org.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.incometax.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">Income Tax e-Filing (Sec 159)</div>
                    <div className="text-slate-500 text-[11px]">incometax.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.mfcentral.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">MFCentral (CAMS &amp; KFintech)</div>
                    <div className="text-slate-500 text-[11px]">mfcentral.com</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.iepf.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">MCA IEPF Authority Portal</div>
                    <div className="text-slate-500 text-[11px]">iepf.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://bimabharosa.irdai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">IRDAI Bima Bharosa</div>
                    <div className="text-slate-500 text-[11px]">bimabharosa.irdai.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://www.epfindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white border border-slate-200 p-4 hover:border-[#C65378] transition-colors flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">EPFO Unified Member Portal</div>
                    <div className="text-slate-500 text-[11px]">epfindia.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Related Internal Tools Navigation Matrix */}
              <div className="pt-6 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                  Related Succession Micro-Tools &amp; Calculators
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/tools/estate-net-worth-asset-inventory-builder"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Family Asset Inventory Vault
                  </Link>
                  <Link
                    href="/tools/bank-deceased-claim-document-checklist-generator"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Bank Deceased Claim Checklist
                  </Link>
                  <Link
                    href="/tools/demat-mutual-fund-transmission-document-finder"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Demat Transmission Finder
                  </Link>
                  <Link
                    href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Legal Heir vs Succession Certificate Tool
                  </Link>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                  >
                    Inherited Property Capital Gains Calculator
                  </Link>
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
                Specialist in Indian testamentary jurisprudence, Section 159 asset disclosure petitions,
                High Court Succession Certificates, and MCA IEPF recovery litigation.
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
                  <span>PREVENT WEALTH LOSS FOR YOUR FAMILY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Never Let Your Children Wonder Where You Invested
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally binding Will cataloging your bank accounts, demat folios, and policies ensures
                  your family inherits smoothly without running between 8 government portals.
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
                  <span>IEPF &amp; SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help Recovering Shares from IEPF or Banks?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court advocates obtain District Court Succession Certificates, file Form
                  IEPF-5 with the Ministry of Corporate Affairs, and settle complex non-nominee claims.
                </p>
                <div className="space-y-2 pt-1">
                  <Link
                    href="/services/succession-certificate"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-colors"
                  >
                    <span>View IEPF Recovery Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Schedule Advocate Consultation</span>
                  </Link>
                </div>
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
                      <strong>100% Free Public Verification:</strong> No middlemen fees to discover what
                      is rightfully yours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Statutory Legal Backing:</strong> Directly citing Section 159, RBI DEA rules,
                      and Companies Act Section 124(6).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>High Court Litigators:</strong> In-house advocates for Succession
                      Certificates and contested claims.
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
          href="#interactive-roadmap-tool"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Asset Roadmap</span>
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
