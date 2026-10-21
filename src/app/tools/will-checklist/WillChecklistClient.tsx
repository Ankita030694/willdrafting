"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Landmark,
  Home,
  Wallet,
  TrendingUp,
  Briefcase,
  Coins,
  Key,
  FileCheck,
  Layers,
  Users,
  FolderCheck,
  Stethoscope,
  HeartHandshake,
  FileSpreadsheet,
  Download,
  Car,
  FolderLock,
  Globe,
  BadgeAlert,
  Percent,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary-brief", label: "1. Executive Summary & Core Rules" },
  { id: "interactive-checklist-tool", label: "2. Interactive Will Checklist Tool" },
  { id: "testator-identity-fitness", label: "3. Your Identity & Fitness Proofs" },
  { id: "asset-documentation-matrix", label: "4. Documents Needed for 15 Asset Types" },
  { id: "testamentary-appointments", label: "5. Choosing Your Executor & Guardian" },
  { id: "visual-blueprint", label: "6. The 4 Essential Pillars of a Will" },
  { id: "step-by-step-sop", label: "7. Step-by-Step Guide to Signing Your Will" },
  { id: "common-checklist-mistakes", label: "8. Common Mistakes to Avoid" },
  { id: "special-scenarios", label: "9. Special Rules: NRIs, HUF & Crypto" },
  { id: "stamp-paper-registration-rules", label: "10. Plain Paper Legality vs Registration" },
  { id: "institutional-backing", label: "11. Legal Backing & Verification" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Relevant Laws & Official Portals" },
];

interface AssetClassItem {
  id: string;
  name: string;
  category: "real_estate" | "financial" | "retirement" | "personal" | "business_digital" | "liabilities";
  iconName: string;
  shortDesc: string;
  primaryDocs: string[];
  keyDetailsNeeded: string[];
  statutoryWarning: string;
}

const ASSET_CLASSES: AssetClassItem[] = [
  {
    id: "immovable_property",
    name: "1. Immovable Real Estate (Flats, Houses, Plots, Land)",
    category: "real_estate",
    iconName: "Home",
    shortDesc: "Self-acquired or partitioned flats, independent houses, plots, and agricultural land.",
    primaryDocs: [
      "Registered Sale Deed, Conveyance Deed, or Gift Deed (clear photocopy)",
      "Latest Municipal Property Tax Receipt showing owner name",
      "Khata Certificate and Extract (A-Khata / B-Khata / Patta / Jamabandi)",
      "Cooperative Housing Society Share Certificate (for society flats)",
      "Nil Encumbrance Certificate (EC) for past 13 to 30 years",
    ],
    keyDetailsNeeded: [
      "Exact municipal property address with flat and floor number",
      "Survey number, CTS number, Khasra/Khatauni numbers",
      "Carpet area and super built-up area in square feet or meters",
      "Four-side boundary demarcations (North, South, East, West)",
      "Undivided Share of Land (UDS) percentage for apartments",
    ],
    statutoryWarning:
      "Ancestral coparcenary land: You can only bequeath your undivided share under Section 30 of the Hindu Succession Act, not the entire joint family land.",
  },
  {
    id: "bank_accounts_fds",
    name: "2. Bank Accounts & Fixed Deposits (Savings, Current, FD, RD)",
    category: "financial",
    iconName: "Landmark",
    shortDesc: "Savings accounts, current accounts, fixed deposit receipts, and recurring deposits.",
    primaryDocs: [
      "Bank passbook front page or latest account statement showing bank seal",
      "Fixed Deposit Receipts (FDRs) or electronic deposit confirmation slips",
      "Customer Identification File (CIF) summary printout",
    ],
    keyDetailsNeeded: [
      "Bank legal name and specific branch address",
      "11-character Indian Financial System Code (IFSC)",
      "Complete account number and Customer ID",
      "Fixed deposit receipt numbers and maturity dates",
    ],
    statutoryWarning:
      "Supreme Court precedent (Sarbati Devi & Shakti Yezdani): A bank nominee is merely a temporary trustee. Ownership vests strictly in your Will beneficiary.",
  },
  {
    id: "demat_equities",
    name: "3. Demat Accounts & Listed Shares (NSDL / CDSL)",
    category: "financial",
    iconName: "TrendingUp",
    shortDesc: "Publicly listed shares, exchange traded funds (ETFs), and equity holdings in demat form.",
    primaryDocs: [
      "Client Master Report (CMR) with Depository Participant (DP) stamp",
      "Consolidated Account Statement (CAS) issued by NSDL or CDSL",
      "Latest broker holding statement (Zerodha, Groww, ICICI Direct, HDFC)",
    ],
    keyDetailsNeeded: [
      "Depository Name (NSDL or CDSL)",
      "Depository Participant Name (e.g., Zerodha Broking Ltd)",
      "DP ID (8 digits) and Client ID (8 digits) or combined 16-digit Demat ID",
      "Name of depository account holder matching Aadhaar record",
    ],
    statutoryWarning:
      "SEBI transmission rules require verified DP ID details. Mismatched initials delay transmission by 6 to 12 months.",
  },
  {
    id: "mutual_funds_sip",
    name: "4. Mutual Funds, SIPs & Sovereign Gold Bonds (SGB)",
    category: "financial",
    iconName: "Wallet",
    shortDesc: "Direct or regular mutual fund folios, ongoing SIPs, and RBI Sovereign Gold Bonds.",
    primaryDocs: [
      "CAMS / KFintech Consolidated Account Statement (CAS)",
      "Individual Asset Management Company (AMC) folio statement",
      "RBI Retail Direct certificate of holding for Sovereign Gold Bonds",
    ],
    keyDetailsNeeded: [
      "Asset Management Company (AMC) name (e.g., SBI Mutual Fund)",
      "Folio Number and scheme name",
      "Registrar & Transfer Agent (RTA) details (CAMS or KFintech)",
      "RBI Retail Direct Investor ID for Sovereign Gold Bonds",
    ],
    statutoryWarning:
      "Folio numbers are mandatory for off-market transmission under SEBI circulars. Mentioning only fund names creates legal ambiguities.",
  },
  {
    id: "retirement_pension",
    name: "5. Retirement & Pension Funds (PPF, EPF, NPS, Gratuity)",
    category: "retirement",
    iconName: "Briefcase",
    shortDesc: "Public Provident Fund, Employees Provident Fund, National Pension System, and gratuity claims.",
    primaryDocs: [
      "PPF Passbook front page showing account number and post office or bank branch",
      "EPF Member Passbook and Universal Account Number (UAN) card",
      "NPS Statement showing Permanent Retirement Account Number (PRAN)",
    ],
    keyDetailsNeeded: [
      "PPF Account Number and issuing branch details",
      "12-digit EPF Universal Account Number (UAN)",
      "12-digit NPS PRAN Card number and Tier-I / Tier-II allocation",
      "Employer details for pending statutory gratuity claims",
    ],
    statutoryWarning:
      "Statutory provident funds have special nomination forms under EPF Act. Reconcile your Will with your statutory nomination forms to prevent employer disputes.",
  },
  {
    id: "insurance_policies",
    name: "6. Life & Term Insurance Policies (Life, ULIP, Health)",
    category: "financial",
    iconName: "ShieldCheck",
    shortDesc: "Term life insurance policies, traditional endowment plans, ULIPs, and accidental covers.",
    primaryDocs: [
      "Original Policy Bond document or First Premium Receipt (FPR)",
      "Latest annual policy endorsement or status certificate",
      "Registered nominee endorsement record",
    ],
    keyDetailsNeeded: [
      "Insurance company legal name (e.g., LIC of India, HDFC Life)",
      "Exact Policy Number and Sum Assured amount",
      "Policy type (Term Life, Whole Life, Endowment, ULIP)",
      "Nominee details endorsed under Section 39 of Insurance Act",
    ],
    statutoryWarning:
      "Under 2015 amendments to Section 39 of Insurance Act, beneficial nominees (parents, spouse, children) acquire full title, overriding distant claimants.",
  },
  {
    id: "bank_lockers",
    name: "7. Safe Deposit Lockers & Bank Vaults",
    category: "personal",
    iconName: "FolderLock",
    shortDesc: "Bank safe deposit lockers containing family jewelry, documents, or bullion.",
    primaryDocs: [
      "Locker Allotment Letter issued by the bank",
      "Locker Rent Agreement and latest annual rent debit receipt",
      "Key identification number tag",
    ],
    keyDetailsNeeded: [
      "Bank name, branch location, and locker identification number",
      "Single or joint operation mandate (Either or Survivor / Former or Survivor)",
      "Explicit authority given to your named Executor to open the locker",
      "Instructions for an inventory memorandum in presence of bank manager",
    ],
    statutoryWarning:
      "Banks strictly freeze single-operated lockers upon holder's death until an executor produces a probate or legal heir certificate.",
  },
  {
    id: "motor_vehicles",
    name: "8. Motor Vehicles (Cars, Two-Wheelers, Commercial)",
    category: "personal",
    iconName: "Car",
    shortDesc: "Personal cars, two-wheelers, luxury vehicles, and commercial transport fleets.",
    primaryDocs: [
      "Original Registration Certificate (RC smart card)",
      "Comprehensive vehicle insurance policy document",
      "Pollution Under Control (PUC) certificate",
    ],
    keyDetailsNeeded: [
      "Vehicle Registration Number (e.g., DL-01-AB-1234)",
      "Vehicle Make, Model, and Year of manufacture",
      "Chassis Number and Engine Number",
      "Regional Transport Office (RTO) jurisdiction",
    ],
    statutoryWarning:
      "Under Section 56 of Central Motor Vehicles Rules, an heir must report the transfer within 30 days of death to prevent vehicle impoundment.",
  },
  {
    id: "gold_jewelry",
    name: "9. Gold, Silver, Jewelry & Family Valuables",
    category: "personal",
    iconName: "Award",
    shortDesc: "Precious gold jewelry, diamond ornaments, silver utensils, and ancestral heirlooms.",
    primaryDocs: [
      "Original purchase invoices and hallmarking / BIS certificates",
      "Government-Approved Valuer valuation certificate (for high-value jewelry)",
      "Photographs or detailed family inventory list of unique heirloom pieces",
    ],
    keyDetailsNeeded: [
      "Approximate total gross weight and net weight in grams or tolas",
      "Description of specific sets (e.g., diamond necklace, temple jewelry)",
      "Location of storage (e.g., Bank Locker #42 at SBI South Extension)",
      "Exact beneficiary assigned to each specific piece",
    ],
    statutoryWarning:
      "Vague descriptions like 'all my jewelry' trigger intense family litigation. Itemize distinctive ornaments clearly in your Will.",
  },
  {
    id: "business_equity",
    name: "10. Business Interests & Partnership Capital (Pvt Ltd, LLP)",
    category: "business_digital",
    iconName: "Briefcase",
    shortDesc: "Shares in private limited companies, LLP capital contribution, and partnership firm shares.",
    primaryDocs: [
      "Memorandum and Articles of Association (MoA & AoA)",
      "Registered Partnership Deed or LLP Agreement",
      "Physical Share Certificates or Demat holding statement of unlisted shares",
      "Latest Audited Balance Sheet of the firm or company",
    ],
    keyDetailsNeeded: [
      "Company or Firm legal name and Corporate Identity Number (CIN / LLPIN)",
      "Director Identification Number (DIN) if holding directorship",
      "Number of equity shares, distinctive numbers, and face value",
      "Percentage of capital share and profit-sharing ratio",
    ],
    statutoryWarning:
      "Check the Articles of Association (AoA) or Partnership Deed. Many agreements require surviving partners' consent before an heir inherits voting rights.",
  },
  {
    id: "intellectual_property",
    name: "11. Intellectual Property & Royalties (Copyright, Patents)",
    category: "business_digital",
    iconName: "Scale",
    shortDesc: "Patents, trademarks, book copyrights, music royalties, and technical inventions.",
    primaryDocs: [
      "Trademark Registration Certificate issued by Controller General of Patents",
      "Patent Grant Certificate",
      "Copyright Registration Certificate or Publishing / Royalty Contract",
    ],
    keyDetailsNeeded: [
      "Registration number and classification under IP statutes",
      "Title of the literary, musical, artistic, or technological creation",
      "Details of royalty disbursement agencies or publishing houses",
      "Instructions on whether the beneficiary can license or sell the rights",
    ],
    statutoryWarning:
      "Copyright in India survives 60 years after the author's death under Section 22 of the Copyright Act, 1957. Royalties can support your family for decades.",
  },
  {
    id: "digital_assets",
    name: "12. Digital Assets, Cryptocurrencies & Online Accounts",
    category: "business_digital",
    iconName: "Key",
    shortDesc: "Crypto exchange accounts, hardware wallets, domain names, monetized websites, and emails.",
    primaryDocs: [
      "Public blockchain wallet addresses (Bitcoin, Ethereum, Solana)",
      "Account statements from registered crypto exchanges (CoinDCX, WazirX)",
      "Domain name registration receipts (GoDaddy, Namecheap)",
    ],
    keyDetailsNeeded: [
      "Account usernames and registered email IDs for cloud accounts",
      "Public addresses for crypto wallets and exchange user IDs",
      "List of monetized social media channels, blogs, or SaaS platforms",
      "Appointment of a Digital Executor with explicit access authorization",
    ],
    statutoryWarning:
      "NEVER write private seed phrases or passwords inside your Will. Wills become public documents upon probate or registration. Keep credentials in a secure offline vault.",
  },
  {
    id: "loans_given",
    name: "13. Personal Loans Given & Debt Receivables (Debts Due)",
    category: "liabilities",
    iconName: "FileSpreadsheet",
    shortDesc: "Money lent to relatives, friends, or third parties supported by formal agreements.",
    primaryDocs: [
      "Executed Loan Agreements or Demand Promissory Notes (DPN)",
      "Bank transfer receipts showing transaction reference (UTR) numbers",
      "Written acknowledgment of debt signed by the borrower",
    ],
    keyDetailsNeeded: [
      "Borrower's full legal name, father's name, PAN, and residential address",
      "Principal amount lent and agreed interest rate",
      "Date of disbursement and maturity or repayment timeline",
      "Instructions: Whether the debt should be recovered or forgiven",
    ],
    statutoryWarning:
      "Under the Limitation Act, 1963, debt recovery suits must be filed within 3 years. Ensure your promissory notes are legally enforceable.",
  },
  {
    id: "debts_liabilities",
    name: "14. Debts, Mortgages & Outstanding Liabilities (Payables)",
    category: "liabilities",
    iconName: "BadgeAlert",
    shortDesc: "Home loans, personal loans, business borrowings, credit card debts, and tax dues.",
    primaryDocs: [
      "Home Loan Sanction Letter and latest Loan Account Statement",
      "Mortgage deed or Memorandum of Deposit of Title Deeds",
      "Credit card outstanding statements and personal loan schedules",
    ],
    keyDetailsNeeded: [
      "Lender institution name and loan account number",
      "Outstanding principal balance and mortgaged property details",
      "Designated source of funds or specific asset to clear liabilities",
      "Order of debt repayment under Sections 320 to 325 of Indian Succession Act",
    ],
    statutoryWarning:
      "Heirs are only liable for debts up to the value of the estate they inherit. Creditors cannot claim an heir's personal assets.",
  },
  {
    id: "foreign_assets",
    name: "15. Foreign / Cross-Border Assets (Overseas Land, Stocks, NRI)",
    category: "real_estate",
    iconName: "Globe",
    shortDesc: "Real estate in the USA, UK, UAE, Canada, overseas bank accounts, and foreign stocks.",
    primaryDocs: [
      "Foreign property title deeds or mortgage statements",
      "Overseas bank account statements and brokerage statements",
      "Tax returns filed in the country of residence (IRS 1040, HMRC)",
    ],
    keyDetailsNeeded: [
      "Foreign asset physical location and foreign legal descriptions",
      "Overseas bank Routing Number / IBAN and SWIFT code",
      "Clear declaration of jurisdiction under the Two-Will Strategy",
      "Exclusion of foreign assets if a separate foreign Will is executed",
    ],
    statutoryWarning:
      "Real estate is governed by the law of the place where it is located (lex situs). Having a single Indian Will handle US/UK real estate often stalls foreign probate.",
  },
];

interface AppointmentItem {
  id: string;
  role: string;
  statute: string;
  importance: string;
  requiredDetails: string[];
  docChecklist: string[];
}

const APPOINTMENTS: AppointmentItem[] = [
  {
    id: "primary_executor",
    role: "Primary Executor (Person who carries out your Will)",
    statute: "Section 211, Indian Succession Act, 1925",
    importance:
      "The trusted person responsible for carrying out your wishes. They will collect your assets, clear any unpaid bills or loans, and distribute your property exactly as written in your Will.",
    requiredDetails: [
      "Full legal name matching Aadhaar or Passport",
      "Father's or spouse's name",
      "Permanent residential address and mobile phone number",
      "Government identity proof number (Aadhaar or PAN card)",
    ],
    docChecklist: [
      "Photocopy of Executor's Aadhaar or PAN card",
      "Confirmation that this person agrees to take on the executor role",
    ],
  },
  {
    id: "alternate_executor",
    role: "Backup Executor (In case your first choice cannot act)",
    statute: "Section 222, Indian Succession Act, 1925",
    importance:
      "A backup person who steps in if your primary executor passes away before you, becomes too ill, or is unable to handle the responsibility. This saves your family from visiting court.",
    requiredDetails: [
      "Full legal name and relationship to you",
      "Father's or spouse's name",
      "Complete residential address and contact details",
      "Government identity proof number",
    ],
    docChecklist: [
      "Photocopy of Backup Executor's ID proof",
      "Contact details kept safely in your family records file",
    ],
  },
  {
    id: "minor_guardian",
    role: "Guardian for Minor Children (Under 18 years)",
    statute: "Section 60 ISA & Section 9 Hindu Minority & Guardianship Act, 1956",
    importance:
      "The trusted person who will take legal custody and care of your young children if both parents pass away. Without this, a court decides who raises your children.",
    requiredDetails: [
      "Full legal name, age, and relationship to minor child",
      "Permanent residential address",
      "Clear financial allocation from your assets to support the child's living and education",
      "Consent of the guardian to care for the child",
    ],
    docChecklist: [
      "Minor child's birth certificate copy",
      "Guardian's Aadhaar or Passport copy",
    ],
  },
  {
    id: "independent_witnesses",
    role: "Two Independent Witnesses",
    statute: "Section 63(c) & Section 67, Indian Succession Act, 1925",
    importance:
      "Two adult friends or neighbors who watch you sign your Will and sign it themselves. CRITICAL: Under Section 67, neither witness nor their husband/wife can receive any property or money from your Will!",
    requiredDetails: [
      "Full legal names and ages of two independent adult witnesses",
      "Father's or spouse's names",
      "Residential addresses and professions",
      "Aadhaar, Voter ID, or Passport numbers",
    ],
    docChecklist: [
      "Aadhaar or Voter ID copies of Witness 1 and Witness 2",
      "Verification that neither witness is named as an heir in the Will",
    ],
  },
  {
    id: "residual_beneficiary",
    role: "Receiver of Remaining Assets (Residuary Beneficiary)",
    statute: "Sections 102 & 103, Indian Succession Act, 1925",
    importance:
      "The person who inherits any leftover or future assets not specifically listed in your Will (such as new bank accounts, bonus shares, or forgotten deposits).",
    requiredDetails: [
      "Full legal name and relationship to you",
      "Aadhaar or PAN number",
      "Residential address",
    ],
    docChecklist: [
      "Beneficiary Aadhaar card copy",
      "Clear wording assigning 100% of all leftover property to this person",
    ],
  },
];

const FAQS = [
  {
    q: "Do I need any government documents to write a Will in India?",
    a: "No special government stamp paper or certificate is required to make a valid Will. Under the Indian Succession Act, 1925, you can write your Will on plain white A4 paper. However, to make sure your family has zero problems later during bank transfers or property mutation, you should keep photocopies of your Aadhaar/PAN, property registry papers, bank passbooks, Demat Client Master Reports, and ID proofs for your two witnesses.",
  },
  {
    q: "Do I need original property registry papers while making a Will?",
    a: "No. You never need to hand over or attach original property deeds. Clear photocopies or digital PDF scans are more than enough. You only need them to copy accurate legal details into the Will, such as the sale deed number, survey/khasra number, flat and carpet area, and boundary details.",
  },
  {
    q: "Do I need a doctor's certificate to make a Will?",
    a: "While Indian law does not strictly mandate a doctor's certificate for young adults, getting a simple fitness certificate from an MBBS or MD doctor is strongly recommended for seniors aged 60 and above. The doctor simply certifies that you are in sound mental health and understand your decisions, which prevents dissatisfied relatives from falsely claiming dementia or mental weakness later.",
  },
  {
    q: "What documents do my two witnesses need to provide?",
    a: "Each witness needs to provide their full legal name, father's or spouse's name, residential address, and an ID proof number (like Aadhaar, Voter ID, or Passport). Remember: under Section 67 of the Indian Succession Act, neither witness nor their spouse can receive any gift or property under the Will.",
  },
  {
    q: "Do I need stamp paper to make a valid Will?",
    a: "No. Under the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty across India. Writing a Will on ₹100 or ₹500 stamp paper does not make it any more legal than plain A4 paper.",
  },
  {
    q: "What bank and share details should I write in my Will?",
    a: "For bank accounts: write the bank name, branch address, account number, and IFSC code. For demat shares: get your Client Master Report (CMR) and write the 16-digit Demat ID and depository name (NSDL or CDSL). For mutual funds: list the AMC name (e.g. SBI Mutual Fund) and folio number.",
  },
  {
    q: "Does a bank nominee get the money instead of the person named in my Will?",
    a: "No. The Supreme Court of India (in Sarbati Devi and Shakti Yezdani, Dec 2023) has ruled that a bank or demat nominee is merely a caretaker (trustee) who holds the funds temporarily. The ultimate legal ownership belongs strictly to the beneficiary you name in your Will.",
  },
  {
    q: "What documents do I need if I choose to register my Will?",
    a: "Registration is completely optional under Section 18(e) of the Registration Act, 1908. If you want to register it at the Sub-Registrar Office, bring two printouts of the Will, original PAN and Aadhaar of the testator, original ID proofs of two witnesses, two passport-size photos of everyone, and a doctor's fitness certificate.",
  },
  {
    q: "How should I list digital accounts, cryptocurrencies, and emails?",
    a: "List the platform name, your registered username or email, and public crypto wallet addresses. Never write confidential passwords, PINs, or 12-word seed phrases inside your Will, because Wills become public documents if probated or registered. Keep passwords in a secure password manager or offline vault.",
  },
  {
    q: "What is a 'leftover assets' clause and why is it important?",
    a: "A 'leftover assets' clause (legally called a residuary clause under Sections 102 and 103 of the Indian Succession Act) names who gets any assets not specifically listed in the Will, as well as property or bank accounts you acquire in the future. This prevents any part of your estate from falling into legal limbo.",
  },
];

export default function WillChecklistClient() {
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

  // State management
  const [activeId, setActiveId] = useState<string>("executive-summary-brief");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Selected asset classes (which ones the user owns)
  const [ownedAssets, setOwnedAssets] = useState<Record<string, boolean>>({
    immovable_property: true,
    bank_accounts_fds: true,
    demat_equities: true,
    mutual_funds_sip: true,
    retirement_pension: true,
    insurance_policies: true,
    bank_lockers: false,
    motor_vehicles: true,
    gold_jewelry: true,
    business_equity: false,
    intellectual_property: false,
    digital_assets: false,
    loans_given: false,
    debts_liabilities: true,
    foreign_assets: false,
  });

  // Individual checked documents within selected assets
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    "immovable_property_doc_0": true,
    "immovable_property_doc_1": true,
    "immovable_property_doc_2": false,
    "bank_accounts_fds_doc_0": true,
    "bank_accounts_fds_doc_1": true,
    "demat_equities_doc_0": true,
    "mutual_funds_sip_doc_0": true,
    "retirement_pension_doc_0": true,
    "insurance_policies_doc_0": true,
    "motor_vehicles_doc_0": true,
    "gold_jewelry_doc_0": false,
    "debts_liabilities_doc_0": true,
  });

  // Checked appointments
  const [checkedAppointments, setCheckedAppointments] = useState<Record<string, boolean>>({
    primary_executor: true,
    alternate_executor: true,
    minor_guardian: false,
    independent_witnesses: true,
    residual_beneficiary: true,
  });

  // Testator core proofs check
  const [testatorProofs, setTestatorProofs] = useState<Record<string, boolean>>({
    aadhaar_pan: true,
    address_proof: true,
    doctor_certificate: false,
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

  const toggleAssetOwned = (assetId: string) => {
    setOwnedAssets((prev) => ({ ...prev, [assetId]: !prev[assetId] }));
  };

  const toggleDocChecked = (docKey: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docKey]: !prev[docKey] }));
  };

  const toggleAppointment = (appId: string) => {
    setCheckedAppointments((prev) => ({ ...prev, [appId]: !prev[appId] }));
  };

  const toggleTestatorProof = (key: string) => {
    setTestatorProofs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Readiness Calculations
  const selectedAssetsList = useMemo(() => {
    return ASSET_CLASSES.filter((a) => ownedAssets[a.id]);
  }, [ownedAssets]);

  const totalPossibleDocs = useMemo(() => {
    let count = 0;
    selectedAssetsList.forEach((a) => {
      count += a.primaryDocs.length;
    });
    // Add appointments and testator proofs
    count += APPOINTMENTS.length;
    count += Object.keys(testatorProofs).length;
    return count;
  }, [selectedAssetsList, testatorProofs]);

  const totalCompletedDocs = useMemo(() => {
    let completed = 0;
    selectedAssetsList.forEach((a) => {
      a.primaryDocs.forEach((_, idx) => {
        if (checkedDocs[`${a.id}_doc_${idx}`]) completed++;
      });
    });
    APPOINTMENTS.forEach((app) => {
      if (checkedAppointments[app.id]) completed++;
    });
    Object.values(testatorProofs).forEach((val) => {
      if (val) completed++;
    });
    return completed;
  }, [selectedAssetsList, checkedDocs, checkedAppointments, testatorProofs]);

  const readinessPercent = useMemo(() => {
    if (totalPossibleDocs === 0) return 0;
    return Math.round((totalCompletedDocs / totalPossibleDocs) * 100);
  }, [totalCompletedDocs, totalPossibleDocs]);

  // Generate clean text for copying to clipboard
  const generatedSummaryText = useMemo(() => {
    let out = "INDIAN WILL DRAFTING DOCUMENTATION DOSSIER\n";
    out += `Generated via WillDrafting.in on ${new Date().toLocaleDateString("en-IN")}\n`;
    out += `Readiness Score: ${readinessPercent}% (${totalCompletedDocs}/${totalPossibleDocs} Items Verified)\n`;
    out += "=========================================================\n\n";

    out += "1. TESTATOR IDENTIFICATION & CAPACITY:\n";
    out += `- PAN & Aadhaar Card: ${testatorProofs.aadhaar_pan ? "[VERIFIED]" : "[PENDING]"}\n`;
    out += `- Residential Address Proof: ${testatorProofs.address_proof ? "[VERIFIED]" : "[PENDING]"}\n`;
    out += `- Doctor's Mental Fitness Certificate (MBBS/MD): ${
      testatorProofs.doctor_certificate ? "[VERIFIED]" : "[PENDING - Recommended for age 60+]"
    }\n\n`;

    out += "2. TESTAMENTARY APPOINTMENTS:\n";
    APPOINTMENTS.forEach((app) => {
      out += `- ${app.role}: ${checkedAppointments[app.id] ? "[DETAILS READY]" : "[PENDING]"}\n`;
    });
    out += "\n";

    out += "3. VERIFIED ASSET INVENTORY & REQUIRED DOCUMENTS:\n";
    selectedAssetsList.forEach((asset, i) => {
      out += `[${i + 1}] ${asset.name}\n`;
      asset.primaryDocs.forEach((doc, dIdx) => {
        const isChecked = checkedDocs[`${asset.id}_doc_${dIdx}`];
        out += `    ${isChecked ? "[✓]" : "[ ]"} ${doc}\n`;
      });
      out += `    Key Will Details: ${asset.keyDetailsNeeded.slice(0, 2).join("; ")}\n\n`;
    });

    out += "=========================================================\n";
    out += "NEXT STEP: Ready to convert this checklist into a legally valid Will?\n";
    out += "Start your online draft in 15 minutes at https://www.willdrafting.in/start\n";
    return out;
  }, [
    readinessPercent,
    totalCompletedDocs,
    totalPossibleDocs,
    testatorProofs,
    checkedAppointments,
    selectedAssetsList,
    checkedDocs,
  ]);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generatedSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintChecklist = () => {
    window.print();
  };

  const filteredAssets = useMemo(() => {
    if (filterCategory === "all") return ASSET_CLASSES;
    return ASSET_CLASSES.filter((a) => a.category === filterCategory);
  }, [filterCategory]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C65378_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <FolderCheck className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT &bull; ASSET INVENTORY &amp; AUDIT</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Documents Required for a Will in India: Complete Checklist
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Interactive verification checklist across 15 asset classes, executor appointments, and Section 63 witness formalities. Audit your paperwork before drafting your legally binding Will.
          </p>

          {/* Hero CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft Your Will Online in 15 Mins</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#interactive-checklist-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>Launch Interactive Checklist</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Legal Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Succession Expertise
              </span>
            </div>

            {/* Stat 2: Wills Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills Drafted
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Assets Secured
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,300+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial & Interactive Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Statutory Compliance Badge in Sidebar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Compliance</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Verified under Indian Succession Act 1925, Hindu Succession Act 1956, and Registration Act 1908.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <div className="space-y-10 md:space-y-14 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <section
              id="executive-summary-brief"
              className="scroll-target rounded-2xl bg-white border border-slate-200/80 border-l-[6px] border-l-[#C65378] p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE SUMMARY BRIEF
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                1. Executive Summary: Core Checklist for Indian Wills
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                Drafting a legally binding Will in India requires systematic preparation. Many families assume making a Will needs stamp paper or complex court filings. Under the Indian Succession Act, 1925, standard plain white paper is 100% legal. However, missing asset identifiers or improper witnesses trigger severe probate hurdles.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200/60">
                  <CheckCircle2 className="w-5 h-5 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-slate-900 block font-bold mb-0.5">
                      Zero Stamp Duty Required:
                    </strong>
                    Wills are exempt from stamp duty across India under Schedule I of the Indian Stamp Act, 1899.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200/60">
                  <CheckCircle2 className="w-5 h-5 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-slate-900 block font-bold mb-0.5">
                      Two Independent Witnesses:
                    </strong>
                    Under Section 67, neither witness nor their spouse can receive any bequest in the Will.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200/60">
                  <CheckCircle2 className="w-5 h-5 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-slate-900 block font-bold mb-0.5">
                      Photocopies Suffice for Drafting:
                    </strong>
                    You do not surrender original deeds. Clear copies provide title numbers, boundaries, and Khata details.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-slate-200/60">
                  <CheckCircle2 className="w-5 h-5 text-[#5F7E75] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-slate-900 block font-bold mb-0.5">
                      Doctor Certificate for Seniors:
                    </strong>
                    Medical fitness proof under Section 59 shields against future claims of dementia or coercion.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: INTERACTIVE WILL CHECKLIST TOOL */}
            <section
              id="interactive-checklist-tool"
              className="scroll-target rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <FolderCheck className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  INTERACTIVE PLANNING ENGINE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                2. Interactive Will Checklist: 15 Assets &amp; Appointments
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                Select the asset categories you own below. Check off the documents you have gathered. The tool calculates your Will-Readiness Score in real time and compiles a personalized document dossier.
              </p>

              {/* Progress & Scorecard Bar */}
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#172228] to-slate-900 text-white p-5 md:p-6 mb-8 shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                      DOCUMENT READINESS GAUGE
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                      {readinessPercent < 40
                        ? "Initial Planning Stage"
                        : readinessPercent < 75
                        ? "Good Progress: Major Papers Verified"
                        : "Will-Ready: Comprehensive Dossier Prepared"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-white leading-none">
                        {readinessPercent}%
                      </div>
                      <span className="text-[10px] text-slate-300 uppercase tracking-wider">
                        {totalCompletedDocs} of {totalPossibleDocs} Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C65378] to-rose-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${readinessPercent}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <span>Selected Assets: {selectedAssetsList.length} of 15</span>
                  <span>Testator ID &amp; Appointments: {Object.values(checkedAppointments).filter(Boolean).length} of 5 Ready</span>
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Dossier Copied!" : "Copy Dossier"}</span>
                  </button>
                </div>
              </div>

              {/* Step A: Testator ID Proofs */}
              <div className="mb-8 p-5 rounded-2xl bg-[#FAF7F0] border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-4 h-4 text-[#172228]" />
                  <h4 className="text-sm sm:text-base font-extrabold text-[#172228]">
                    Phase 1: Testator Core Proofs (You)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={testatorProofs.aadhaar_pan}
                      onChange={() => toggleTestatorProof("aadhaar_pan")}
                      className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-bold block text-slate-900">Aadhaar &amp; PAN Card</span>
                      Identity and tax records
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={testatorProofs.address_proof}
                      onChange={() => toggleTestatorProof("address_proof")}
                      className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-bold block text-slate-900">Residential Proof</span>
                      Voter ID, passport, or utility bill
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-slate-300 transition-all">
                    <input
                      type="checkbox"
                      checked={testatorProofs.doctor_certificate}
                      onChange={() => toggleTestatorProof("doctor_certificate")}
                      className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                    />
                    <div className="text-xs text-slate-700">
                      <span className="font-bold block text-slate-900">Doctor Fitness Cert.</span>
                      MBBS mental capacity certificate
                    </div>
                  </label>
                </div>
              </div>

              {/* Step B: Filter Tabs for 15 Asset Classes */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                  <h4 className="text-sm sm:text-base font-extrabold text-[#172228] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C65378]" />
                    <span>Phase 2: Asset Inventory (Toggle What You Own)</span>
                  </h4>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {[
                      { id: "all", label: "All 15" },
                      { id: "real_estate", label: "Property" },
                      { id: "financial", label: "Banking & Equities" },
                      { id: "retirement", label: "Pension" },
                      { id: "personal", label: "Valuables" },
                      { id: "business_digital", label: "Business & Crypto" },
                      { id: "liabilities", label: "Debts" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setFilterCategory(tab.id)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          filterCategory === tab.id
                            ? "bg-[#172228] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Asset Cards Grid */}
                <div className="space-y-4">
                  {filteredAssets.map((asset) => {
                    const isOwned = ownedAssets[asset.id];
                    return (
                      <div
                        key={asset.id}
                        className={`rounded-2xl border transition-all ${
                          isOwned
                            ? "bg-white border-slate-300 shadow-xs"
                            : "bg-slate-50/70 border-slate-200 opacity-75"
                        } p-4 sm:p-5`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`toggle-${asset.id}`}
                              checked={isOwned}
                              onChange={() => toggleAssetOwned(asset.id)}
                              className="w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                            />
                            <label
                              htmlFor={`toggle-${asset.id}`}
                              className="text-sm sm:text-base font-extrabold text-slate-900 cursor-pointer"
                            >
                              {asset.name}
                            </label>
                          </div>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                              isOwned
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {isOwned ? "Included in Will" : "Not Applicable"}
                          </span>
                        </div>

                        {/* Expandable sub-checklist if owned */}
                        {isOwned && (
                          <div className="mt-4 space-y-3.5">
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                              {asset.shortDesc}
                            </p>

                            <div>
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                                GATHER THESE DOCUMENTS:
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {asset.primaryDocs.map((doc, docIdx) => {
                                  const docKey = `${asset.id}_doc_${docIdx}`;
                                  const isChecked = !!checkedDocs[docKey];
                                  return (
                                    <label
                                      key={docIdx}
                                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                        isChecked
                                          ? "bg-rose-50/40 border-[#C65378]/30 text-slate-900 font-medium"
                                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleDocChecked(docKey)}
                                        className="mt-0.5 rounded text-[#C65378] focus:ring-[#C65378]"
                                      />
                                      <span>{doc}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Statutory Callout */}
                            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold">Key Rule: </strong>
                                {asset.statutoryWarning}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step C: Key Appointments Checklist */}
              <div className="mb-8 p-5 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#172228]" />
                  <h4 className="text-sm sm:text-base font-extrabold text-[#172228]">
                    Phase 3: Essential Appointments &amp; Witness Verification
                  </h4>
                </div>

                <div className="space-y-3">
                  {APPOINTMENTS.map((app) => {
                    const isReady = checkedAppointments[app.id];
                    return (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-[#FAF7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`app-${app.id}`}
                              checked={isReady}
                              onChange={() => toggleAppointment(app.id)}
                              className="w-4 h-4 rounded text-[#C65378] focus:ring-[#C65378] cursor-pointer"
                            />
                            <label
                              htmlFor={`app-${app.id}`}
                              className="text-sm font-bold text-slate-900 cursor-pointer"
                            >
                              {app.role}
                            </label>
                            <span className="text-[10px] text-slate-500 font-semibold">
                              ({app.statute})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                            {app.importance}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full self-start sm:self-auto shrink-0 ${
                            isReady
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isReady ? "Details Ready" : "Pending Details"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Copy, Print, Start Will */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopySummary}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Dossier Copied!" : "Copy Full Dossier"}</span>
                  </button>

                  <button
                    onClick={handlePrintChecklist}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-700" />
                    <span>Print Checklist</span>
                  </button>
                </div>

                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-all shadow-md shadow-rose-950/15 cursor-pointer"
                >
                  <span>Start Your Will with This Checklist</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>

            {/* SECTION 2: TESTATOR IDENTIFICATION & FITNESS DOCUMENTS */}
            <section
              id="testator-identity-fitness"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  STATUTORY EVIDENCE REQUIREMENTS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Testator Identification &amp; Medical Fitness Documents
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Under Section 59 of the Indian Succession Act, 1925, every person of sound mind not being a minor may dispose of their property by Will. To make a Will bulletproof against frivolous legal challenges, documentation begins with proof of legal identity and testamentary capacity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-[#FAF7F0] space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <UserCheck className="w-4 h-4 text-[#172228]" />
                    <span>Government ID &amp; PAN</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aadhaar card (for biometrics and permanent address) and PAN card (for financial asset linkage). Discrepancies between your name on bank records and Aadhaar must be reconciled via an alias clause in your Will.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-[#FAF7F0] space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Stethoscope className="w-4 h-4 text-[#C65378]" />
                    <span>Doctor Fitness Certificate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Essential for testators aged 60 and above or those undergoing treatment. A certified MBBS or MD practitioner attests that you understand the nature of your assets and the effect of your dispositions.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-[#FAF7F0] space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Free Will Declaration</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The text must explicitly state you are executing the document out of free volition, without coercion, undue influence, or fraud (Section 61, Indian Succession Act, 1925).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: 15-ASSET DOCUMENTATION MATRIX */}
            <section
              id="asset-documentation-matrix"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  CROSS-CATEGORY COMPLIANCE MATRIX
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Comprehensive 15-Asset Documentation Matrix
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                The table below outlines the exact documents, critical identifying clauses, and legal risks for each asset category in India. Use this matrix when assembling your family records.
              </p>

              {/* Data Table with Dark Navy Header */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs text-slate-700 min-w-[700px]">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Asset Class</th>
                      <th className="py-3 px-4">Primary Proof Required</th>
                      <th className="py-3 px-4">Mandatory Will Identifiers</th>
                      <th className="py-3 px-4">Consequence If Omitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Residential Flat</td>
                      <td className="py-3 px-4">Sale Deed + Society Certificate</td>
                      <td className="py-3 px-4">CTS/Survey No., Carpet Area, UDS %</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Society freezes transfer</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Bank Accounts &amp; FDs</td>
                      <td className="py-3 px-4">Passbook Front Page / FDR</td>
                      <td className="py-3 px-4">Account No., Branch IFSC, CIF ID</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Nominee dispute in court</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Demat &amp; Equities</td>
                      <td className="py-3 px-4">Client Master Report (CMR)</td>
                      <td className="py-3 px-4">16-Digit Demat ID, DP Name</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Lengthy SEBI legal heir claim</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Mutual Fund Folios</td>
                      <td className="py-3 px-4">Consolidated CAS (CAMS/KFin)</td>
                      <td className="py-3 px-4">AMC Name, Folio Number</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Freezes monthly redemptions</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">PPF &amp; EPF UAN</td>
                      <td className="py-3 px-4">PPF Passbook / EPF UAN Card</td>
                      <td className="py-3 px-4">12-Digit UAN, Bank/PO Branch</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">PF commissioner delays release</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Safe Deposit Locker</td>
                      <td className="py-3 px-4">Locker Allotment Agreement</td>
                      <td className="py-3 px-4">Locker No., Branch, Key Tag</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Bank demands probate order</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Motor Vehicles</td>
                      <td className="py-3 px-4">Registration Certificate (RC)</td>
                      <td className="py-3 px-4">Registration No., Chassis/Engine No.</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">RTO penalizes late succession</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Gold &amp; Jewelry</td>
                      <td className="py-3 px-4">Valuation Certificate / Invoices</td>
                      <td className="py-3 px-4">Gross/Net Weight, Item Descriptions</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Family partition litigation</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Pvt Ltd / LLP Shares</td>
                      <td className="py-3 px-4">Share Certificates / MoA / AoA</td>
                      <td className="py-3 px-4">CIN, No. of Shares, Folio Numbers</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Board refuses transfer to heir</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Digital / Crypto</td>
                      <td className="py-3 px-4">Public Wallet Address Record</td>
                      <td className="py-3 px-4">Platform User ID, Vault Reference</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">Assets lost forever upon death</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: TESTAMENTARY APPOINTMENTS */}
            <section
              id="testamentary-appointments"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  CRITICAL STATUTORY APPOINTMENTS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Testamentary Appointments: Executor &amp; Guardian Rules
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                A Will is only as effective as the people appointed to execute it. In India, appointing the right legal officers avoids the high cost of applying for Letters of Administration from the District Court or High Court.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Executor Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-[#FAF7F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      Executor &amp; Alternate Executor
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Sec 211 &amp; 222 ISA
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 211, the executor is your legal representative. All property vests in them upon your death. Always name an alternate executor in case the primary passes away or declines to act.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Full legal name and relationship</li>
                    <li>Aadhaar / Voter ID number and permanent address</li>
                    <li>Authority to collect funds, pay debts, and represent before SRO</li>
                  </ul>
                </div>

                {/* Guardian Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-[#FAF7F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      Testamentary Guardian
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      Sec 60 ISA / HMGA 1956
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you have children under 18 years, appoint a testamentary guardian. Without this appointment, relatives can fight over child custody and asset control in guardianship court.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Name trusted adult relative or friend</li>
                    <li>Specify allocation of funds for child education</li>
                    <li>Condition for assets to release when child turns 18 or 21</li>
                  </ul>
                </div>

                {/* Witnesses Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-[#FAF7F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      Two Independent Witnesses
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                      Sec 63(c) &amp; 67 ISA
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A minimum of two adult witnesses must see you sign. Under Section 67, an attesting witness cannot receive any bequest under the Will. If an heir signs as a witness, their inheritance becomes void.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Use independent doctors, neighbors, or colleagues</li>
                    <li>Collect full name, father name, address, and ID proof</li>
                    <li>Both witnesses must sign in your visual presence</li>
                  </ul>
                </div>

                {/* Residual Beneficiary Card */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-[#FAF7F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      Residual Legatee
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Sec 102 &amp; 103 ISA
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The residuary legatee inherits everything not specifically bequeathed. This sweeps up future investments, unclaimed tax refunds, and forgotten bank accounts automatically.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Prevents partial intestacy under Section 102</li>
                    <li>Usually spouse, children, or a family trust</li>
                    <li>Ensures zero wealth falls into intestate succession</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT */}
            <section
              id="visual-blueprint"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  VISUAL BLUEPRINT
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Visual Blueprint: 4 Pillars of a Challenge-Proof Will
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                This diagram illustrates the four essential statutory pillars of Indian Will drafting: Testator proof, asset ownership documents, legal appointments, and execution formalities under Section 63.
              </p>

              {/* Infographic Image Container */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/images/will-checklist-blueprint-infographic.svg"
                    alt="Visual Blueprint: Indian Will Preparation Checklist and Statutory Documentation Workflow under Indian Succession Act, 1925"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span>Figure 1: Statutory Documentation &amp; Execution Blueprint (ISA 1925)</span>
                  <a
                    href="/images/will-checklist-blueprint-infographic.svg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C65378] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6: STEP-BY-STEP SOP */}
            <section
              id="step-by-step-sop"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  VERIFIED EXECUTION PROTOCOL
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Step-by-Step SOP: Checklist to Legally Executed Will
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Follow this six-stage standard operating procedure to transition from gathering documents to executing a legally binding Will in India.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    step: "Stage 1",
                    title: "Compile Asset Documentation & Account Folios",
                    desc: "Gather clear photocopies of title deeds, property tax receipts, Demat Client Master Reports (CMR), bank passbooks, and policy bonds. Do not surrender originals.",
                  },
                  {
                    step: "Stage 2",
                    title: "Map Beneficiaries & Appoint Primary / Alternate Executors",
                    desc: "Assign specific percentages or assets to heirs. Choose a responsible primary executor and an alternate executor to manage probate without family friction.",
                  },
                  {
                    step: "Stage 3",
                    title: "Obtain Registered Medical Practitioner Fitness Certificate",
                    desc: "If aged 60 or older, visit an MBBS/MD doctor on the day of signing. Obtain a written certificate attesting to sound mind and memory under Section 59.",
                  },
                  {
                    step: "Stage 4",
                    title: "Select Two Independent Attesting Witnesses",
                    desc: "Ensure neither witness nor their spouses are beneficiaries in the Will. Verify their Aadhaar cards and residential proofs under Section 67 compliance.",
                  },
                  {
                    step: "Stage 5",
                    title: "Sign Simultaneously in Physical Visual Presence (Section 63)",
                    desc: "Sign or place thumb impression at the foot of every single page. Both witnesses must see you sign and subscribe their signatures in your presence.",
                  },
                  {
                    step: "Stage 6",
                    title: "Safe Custody & Optional Sub-Registrar Office Registration",
                    desc: "Will registration is optional under Section 18(e) of Registration Act. Store the original Will in a bank locker or safe custody and inform your named executor.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-4 hover:border-slate-300 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black flex items-center justify-center text-sm shrink-0 border border-rose-200">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#C65378]">
                          {item.step}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: COMMON CHECKLIST MISTAKES */}
            <section
              id="common-checklist-mistakes"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                  DEFENSIVE DRAFTING WARNINGS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Four Fatal Checklist Mistakes to Avoid in India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Even sophisticated families make documentation mistakes that lead to years of high court litigation. Avoid these four common traps.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <BadgeAlert className="w-4 h-4 text-rose-600" />
                    <span>Beneficiary Acting as Witness</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Under Section 67 of the Indian Succession Act, if a beneficiary or their spouse signs as an attesting witness, the Will remains valid but the bequest to that person becomes void. Never use your children or spouse as witnesses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <BadgeAlert className="w-4 h-4 text-rose-600" />
                    <span>Confusing Nominee with Ownership</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Nomination does not confer ownership. Under Supreme Court rulings in Sarbati Devi and Shakti Yezdani, a nominee is merely a trustee. If your Will names someone else, your Will prevails over the nominee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <BadgeAlert className="w-4 h-4 text-rose-600" />
                    <span>Omitting the Residuary Clause</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    If you list five properties but forget your Demat account or buy land next year, those unlisted assets trigger partial intestacy. A residuary clause disposes of all unlisted and future assets safely.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <BadgeAlert className="w-4 h-4 text-rose-600" />
                    <span>Writing Passwords in Public Will</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Never write crypto private keys, bank PINs, or email passwords in the body of a Will. Wills become public documents during probate or registration. Keep credentials in a private offline safe.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: SPECIAL SCENARIOS */}
            <section
              id="special-scenarios"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  SPECIAL ESTATE SITUATIONS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Special Scenarios: NRIs, HUF &amp; Digital Currencies
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Certain estate types require specialized documentation checklists to ensure cross-border and corporate compliance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Globe className="w-4 h-4 text-[#C65378]" />
                    <span>Non-Resident Indians (NRIs)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    NRIs owning Indian property must execute an Indian Will specifically governed by Indian Succession Act, 1925. Foreign Wills require expensive ancillary probate and court fee stamps in India under Section 228.
                  </p>
                  <Link
                    href="/service/nri-will-india"
                    className="inline-flex items-center gap-1 text-xs text-[#C65378] font-bold hover:underline"
                  >
                    <span>Read NRI Two-Will Strategy Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Building className="w-4 h-4 text-[#172228]" />
                    <span>Hindu Undivided Family (HUF)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A coparcener cannot bequeath entire HUF property. Under Section 30 of the Hindu Succession Act, 1956, you can only bequeath your undivided coparcenary share that would fall to you upon deemed partition.
                  </p>
                  <Link
                    href="/blogs/ancestral-vs-self-acquired-property-will-hindu-succession-act"
                    className="inline-flex items-center gap-1 text-xs text-[#C65378] font-bold hover:underline"
                  >
                    <span>Ancestral vs Self-Acquired Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <span>Cryptocurrency &amp; Digital Web</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Virtual Digital Assets (VDAs) require designating a Digital Executor under the Information Technology Act, 2000. Maintain an offline digital asset inventory with exchange accounts and public wallet addresses.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Briefcase className="w-4 h-4 text-[#5F7E75]" />
                    <span>MSME &amp; Private Company Equity</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check the Articles of Association (AoA) for pre-emption rights or buy-sell restrictions. Ensure your Will coordinates with surviving directors to enable smooth transmission of share certificates.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: PLAIN PAPER VS REGISTRATION RULES */}
            <section
              id="stamp-paper-registration-rules"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  STATUTORY VALIDITY COMPARISON
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Plain Paper Validity vs SRO Will Registration Rules
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Many testators spend unnecessary money on stamp paper. Understand the statutory distinction between a plain paper Will and a registered Will in India.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
                  <thead className="bg-[#172228] text-white uppercase text-[11px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4">Plain Paper Will</th>
                      <th className="py-3 px-4">Registered Will (SRO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Validity</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">100% Valid under Sec 63 ISA</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">100% Valid under Sec 63 ISA</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Stamp Paper Duty</td>
                      <td className="py-3 px-4">Zero (Exempt under Stamp Act)</td>
                      <td className="py-3 px-4">Zero (Only nominal registration fee)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Witness Requirement</td>
                      <td className="py-3 px-4">Minimum 2 independent adults</td>
                      <td className="py-3 px-4">Minimum 2 independent adults present at SRO</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Registration Status</td>
                      <td className="py-3 px-4">Optional under Sec 18(e) Reg. Act</td>
                      <td className="py-3 px-4">Registered in Book 3 at SRO</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Evidentiary Value</td>
                      <td className="py-3 px-4">High Court proof required if contested</td>
                      <td className="py-3 px-4 text-[#C65378] font-bold">Strong presumption of genuine execution</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Loss of Document</td>
                      <td className="py-3 px-4">Risk of loss unless copies stored</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Certified copy available from SRO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: INSTITUTIONAL BACKING */}
            <section
              id="institutional-backing"
              className="scroll-target space-y-4 rounded-2xl bg-[#172228] text-white p-6 md:p-8 shadow-md"
            >
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-rose-300" />
                <span className="text-xs font-black uppercase tracking-wider text-rose-300">
                  INSTITUTIONAL LEGAL SOLUTIONS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                11. Institutional Verification: AMA Succession Services
              </h2>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal">
                WillDrafting.in is powered by AMA Legal Solutions, a premier Indian succession law practice. Our advocates verify estate documents, resolve complex ancestral land titles, and draft customized testamentary instruments for families across 28 Indian states.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    DOCUMENT REVIEW
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    Advocate Title Audit
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High court succession lawyers review property title deeds, Khata records, and share folios for unambiguous phrasing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    DOORSTEP REGISTRATION
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    SRO Section 31 Home Visit
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    For senior citizens and unwell testators, we arrange Sub-Registrar home visits under Section 31 of the Registration Act.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    PROBATE ASSISTANCE
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    High Court Probate
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Complete representation for mandatory probate in Mumbai, Kolkata, and Chennai, and Succession Certificates nationwide.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <span className="text-xs text-slate-300">
                  Need an advocate to audit your gathered documents?
                </span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#172228] text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Book Advocate Consultation</span>
                </a>
              </div>
            </section>

            {/* SECTION 11: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  DIRECT LEGAL ANSWERS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. Frequently Asked Questions: Documents for Indian Will
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                Clear answers to common questions regarding document requirements, stamp paper, registration, and witness formalities in India.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      aria-expanded={openFaq === idx}
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F0]/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: STATUTORY CITATIONS */}
            <section
              id="statutory-citations"
              className="scroll-target space-y-4 rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  LEGAL AUTHORITIES &amp; STATUTORY CUSTODY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                13. Statutory Citations &amp; Verified Government Portals
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                All checklist rules on this page adhere to established Indian succession statutes and Supreme Court binding authorities.
              </p>

              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 59 (Testamentary capacity), Section 63 (Execution formalities), Section 67 (Witness voidance), Sections 102 &amp; 103 (Residuary bequests), Section 211 (Executor vesting).
                </li>
                <li>
                  <strong>Hindu Succession Act, 1956:</strong> Section 30 (Testamentary disposition of coparcenary share in joint family property).
                </li>
                <li>
                  <strong>Registration Act, 1908:</strong> Section 18(e) (Optional registration of Wills), Section 31 (Registration at private residence for elderly/ill testators).
                </li>
                <li>
                  <strong>Indian Stamp Act, 1899:</strong> Schedule I (Exemption of Wills and Codicils from stamp duty).
                </li>
                <li>
                  <strong>Supreme Court of India Precedents:</strong> <em>Smt. Sarbati Devi v. Smt. Usha Devi (1984)</em> and <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar (Dec 2023)</em> settling the primacy of Wills over bank and Demat nominations.
                </li>
              </ul>

              {/* Verified Portals Row */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                  VERIFIED STATUTORY REPOSITORIES:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: "India Code (ISA 1925)", url: "https://www.indiacode.nic.in" },
                    { name: "Supreme Court of India Judgments", url: "https://main.sci.gov.in" },
                    { name: "SEBI Master Circular (Transmission)", url: "https://www.sebi.gov.in" },
                    { name: "RBI Retail Direct (SGB/Gilts)", url: "https://rbiretaildirect.org.in" },
                  ].map((portal, pIdx) => (
                    <a
                      key={pIdx}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <ExternalLink className="w-3 h-3 text-[#C65378]" />
                      <span>{portal.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author, Emergency CTA, Trust Cards)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR / REVIEWER CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#172228] to-[#2a3c46] text-white flex items-center justify-center font-extrabold text-base mx-auto border-2 border-white shadow-xs">
                AMA
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Advocate Harshvardhan Sharma
                </h4>
                <p className="text-[11px] text-[#C65378] font-bold">
                  Senior Succession Counsel, High Court of Delhi
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                15+ years advising families on estate planning, testamentary trust structuring, and contentious probate proceedings across India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                <span>Bar Council of Delhi Verified</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: DIRECT ACTION CTA CARD */}
            <div className="hidden lg:block bg-gradient-to-b from-[#172228] to-[#121c21] rounded-2xl p-6 text-white text-center shadow-md space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-300 text-[10px] font-black uppercase tracking-wider">
                WILL-READY CHECKLIST READY
              </span>
              <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                Ready to Draft Your Legally Binding Will?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Our guided online software pre-fills your asset details, matches Section 63 witness requirements, and creates a court-ready Will in 15 minutes.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C65378] text-white text-xs font-extrabold hover:bg-[#a13c5d] transition-all shadow-md shadow-rose-950/20 cursor-pointer"
              >
                <span>Draft Your Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>256-Bit Bank-Grade Confidentiality</span>
              </div>
            </div>

            {/* CARD 3: TRUST & COMPLIANCE CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                COMPLIANCE GUARANTEE
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Section 63 ISA Compliant Attestation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Valid on Standard Plain White A4 Paper</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero Stamp Duty / No Stamp Paper Needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Vetted by High Court Succession Advocates</span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TOOLS & TEMPLATES */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                RELATED TOOLS &amp; GUIDES
              </span>
              <div className="space-y-2">
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-xs"
                >
                  <span className="font-bold text-slate-900 block">
                    Succession Share Calculator
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Calculate legal heir shares under Hindu &amp; Muslim law &rarr;
                  </span>
                </Link>

                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition-all text-xs"
                >
                  <span className="font-bold text-slate-900 block">
                    Standard Will Format India
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Clause-annotated printable Will template &rarr;
                  </span>
                </Link>

                <Link
                  href="/service/nri-will-india"
                  className="block p-2.5 rounded-xl border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all text-xs"
                >
                  <span className="font-bold text-slate-900 block">
                    NRI Two-Will Strategy
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Cross-border estate planning for non-residents &rarr;
                  </span>
                </Link>

                <Link
                  href="/blogs/nominee-vs-legal-heir-india-supreme-court-rule"
                  className="block p-2.5 rounded-xl border border-slate-200/80 hover:border-purple-200 hover:bg-purple-50/30 transition-all text-xs"
                >
                  <span className="font-bold text-slate-900 block">
                    Nominee vs Legal Heir Guide
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Supreme Court precedents on bank &amp; Demat nominees &rarr;
                  </span>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Format in India
                </Link>
                <Link
                  href="/service/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Probate Requirement Checker
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Share Calculator
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
