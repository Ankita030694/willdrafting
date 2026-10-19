// src/lib/willDraftingStore.ts
// WillDrafting.com Comprehensive State Engine (LocalStorage backed)
// Adheres strictly to WillDrafting_Product_Master_Context.txt

export type MaritalStatus = "married" | "single" | "widowed" | "divorced" | "separated";
export type ReligionPersonalLaw = "hindu" | "muslim" | "christian" | "parsi" | "special_marriage_act" | "other";

import { normalizeWillState } from "./inputSanitizers";
import { formatDDMMYYYY } from "./utils";
export { formatDDMMYYYY };

export interface TestatorProfile {
  fullName: string;
  fatherOrMotherName?: string; // e.g. "Ramesh Sharma"
  pan?: string; // e.g. "ABCDE1234F"
  aadhaar?: string; // e.g. "1234 5678 9012"
  workplace?: string; // e.g. "Company Name or Profession"
  dob: string; // YYYY-MM-DD
  gender: "male" | "female" | "other" | "";
  maritalStatus: MaritalStatus;
  religionPersonalLaw: ReligionPersonalLaw;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  citizenship: string;
  hasPreviousWill: boolean;
  revokePreviousWill: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: "spouse" | "son" | "daughter" | "father" | "mother" | "brother" | "sister" | "other";
  customRelationship?: string;
  pan?: string; // e.g. "ABCDE1234F"
  dob: string; // YYYY-MM-DD
  isMinor: boolean;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export type AssetCategory =
  | "property"
  | "bank_account"
  | "investments"
  | "shares"
  | "mutual_funds"
  | "jewellery"
  | "vehicles"
  | "business"
  | "insurance"
  | "digital"
  | "other";

export interface Asset {
  id: string;
  category: AssetCategory;
  name: string; // e.g., "Gurgaon 3BHK Apartment"
  typeDetails: string; // Residential Flat, Savings A/c, Equity Portfolio
  identifier: string; // Survey/Khata/Flat No, Account number ending, Demat ID, Reg No
  addressOrInstitution: string; // e.g., "DLF Phase 5, Gurgaon" or "HDFC Bank, Cyber City"
  ownership: "sole" | "joint";
  jointOwnerName?: string;
  jointOwnerRelationship?: string;
  ownershipPercentage?: number; // Testator's ownership share % (100 for sole, e.g. 50/40 for joint)
  approximateValue: number; // in INR
  hasLoan: boolean;
  loanDetails?: string;
  specialInstructions?: string;
  customCategoryName?: string;
  policyNumber?: string;
  insuranceCompany?: string;
  sumAssured?: number;
  maturityDate?: string;
  nomineeName?: string;
}

export interface BeneficiaryAllocation {
  id: string;
  assetId: string; // references Asset.id
  beneficiaryId: string; // references FamilyMember.id or custom beneficiary
  beneficiaryName: string;
  percentage: number; // 0 to 100
  specificBequestCondition?: string;
}

export interface PersonContact {
  name: string;
  relationship: string;
  dob?: string;
  phone: string;
  email: string;
  address: string;
}

export interface SpecialWishes {
  hasNoSpecialWishes?: boolean;
  jewelleryInstructions: string;
  personalBelongings: string;
  petsCare: string;
  charitableGifts: string;
  digitalAccounts: string;
  funeralCeremonyWishes: string;
  personalMessageToFamily: string;
}

export interface LegalHealthCheckIssue {
  id: string;
  severity: "critical" | "warning" | "advisory" | "pass";
  title: string;
  explanation: string;
  actionRecommendation: string;
  category: "family" | "assets" | "beneficiary" | "executor" | "guardian" | "residuary";
  resolved: boolean;
}

export interface GeneratedClause {
  id: string;
  clauseNumber: number;
  category: string;
  title: string;
  standardText: string;
  currentText: string;
  isLawyerEdited: boolean;
  clarificationRequested: boolean;
  clarificationMessage?: string;
  riskLevel: "low" | "medium" | "high";
}

export interface VaultDocument {
  id: string;
  title: string;
  category: "will_draft" | "property_deed" | "nomination" | "identity_proof" | "insurance";
  version: string;
  dateAdded: string;
  fileSize: string;
  status: "verified" | "pending_review" | "archived";
}

export interface ConsultationBooking {
  id: string;
  lawyerId: string;
  lawyerName: string;
  lawyerFee: string;
  dateTime: string;
  topic: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface WillDraftingState {
  currentStep: number;
  testator: TestatorProfile;
  familyMembers: FamilyMember[];
  assets: Asset[];
  allocations: BeneficiaryAllocation[];
  residuaryBeneficiaryId: string;
  residuaryBeneficiaryName: string;
  residuaryAlternateId: string;
  residuaryAlternateName: string;
  residuaryPrimary01Name?: string;
  residuaryPrimary02Name?: string;
  residuaryBackup01Name?: string;
  residuaryBackup02Name?: string;
  executorPrimary: PersonContact;
  executorAlternate: PersonContact;
  guardianPrimary: PersonContact;
  guardianAlternate: PersonContact;
  guardianSpecialInstructions: string;
  specialWishes: SpecialWishes;
  emotionalReason: string;
  willStatus: "drafting" | "draft_ready" | "lawyer_review" | "clarification_requested" | "approved" | "finalised";
  selectedPlan: "essential" | "lawyer_verified" | "premium";
  isReviewed?: boolean;
  version: string;
  lastUpdated: string;
  lastAnnualReviewDate?: string;
  consultationBookings?: ConsultationBooking[];
  lawyerNotes: string[];
  clauses: GeneratedClause[];
  documents: VaultDocument[];
  auditLogs: { timestamp: string; action: string; actor: string }[];
  detailsVerified?: boolean;
  detailsVerifiedAt?: string;
}

export const DEFAULT_STORAGE_KEY = "willdrafting_master_state_v1";
export const ACTIVE_USER_STORAGE_KEY = "willdrafting_active_user";

export function getWillStorageKey(userEmailOrId?: string | null): string {
  let keyId = userEmailOrId;
  if (!keyId && typeof window !== "undefined") {
    keyId = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
  }
  if (keyId && keyId.trim()) {
    const sanitized = keyId.trim().toLowerCase().replace(/[^a-z0-9]/g, "_");
    return `willdrafting_user_${sanitized}`;
  }
  return DEFAULT_STORAGE_KEY;
}

export function setActiveUser(userEmailOrId?: string | null): void {
  if (typeof window === "undefined") return;
  if (userEmailOrId && userEmailOrId.trim()) {
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, userEmailOrId.trim());
  } else {
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
  }
}

// Helper to compute minor status from DOB
export function calculateIsMinor(dobString: string): boolean {
  if (!dobString) return false;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < 18;
}

// -------------------------------------------------------------
// SCENARIOS SPECIFIED IN SECTION 3 & SECTION 51 OF MASTER CONTEXT
// -------------------------------------------------------------

export const SCENARIO_1_STANDARD_MARRIED: WillDraftingState = {
  currentStep: 14,
  testator: {
    fullName: "Dr. Rohit Srivastava",
    fatherOrMotherName: "Manju Srivastava",
    pan: "BAZPS9068N",
    aadhaar: "3546 XXXX XXXX",
    workplace: "Room 505, Department of Biosciences and Bioengineering, Indian Institute of Technology Bombay, Powai, Mumbai – 400076",
    dob: "1976-05-14",
    gender: "male",
    maritalStatus: "married",
    religionPersonalLaw: "hindu",
    email: "rohit.srivastava@iitb.ac.in",
    phone: "",
    address: "201 Barberry, Nahar Amrit Shakti, Chandivali",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400072",
    citizenship: "Indian",
    hasPreviousWill: false,
    revokePreviousWill: true,
  },
  familyMembers: [
    {
      id: "fam-alpana",
      name: "Mrs. Alpana Prakash",
      relationship: "spouse",
      pan: "CJDPP6174L",
      dob: "1978-08-12",
      isMinor: false,
      phone: "",
      email: "alpana.prakash@example.com",
      address: "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072",
      notes: "Wife and Principal Beneficiary under this Will",
    },
    {
      id: "fam-aarohi",
      name: "Ms. Aarohi Shankar",
      relationship: "daughter",
      pan: "UNGPS6807G",
      dob: "2004-03-20",
      isMinor: false,
      phone: "",
      email: "aarohi.shankar@example.com",
      address: "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072",
      notes: "Daughter and Contingent / Exclusive Beneficiary for Mutual Funds & Sukanya Samriddhi",
    },
    {
      id: "fam-amit",
      name: "Mr. Amit Srivastava",
      relationship: "brother",
      dob: "1974-11-10",
      isMinor: false,
      phone: "",
      email: "amit.srivastava@example.com",
      address: "S.K. Nagar, Patna, Bihar",
      notes: "Brother of Testator (Co-heir for Maternal Properties in Neral & Patna in equal 50% proportion)",
    },
    {
      id: "fam-arnab",
      name: "Dr. Arnab Ghosh",
      relationship: "other",
      dob: "1982-01-01",
      isMinor: false,
      phone: "",
      email: "arnab.ghosh@clinicosis.com",
      address: "Kolkata, West Bengal",
      notes: "Co-founder / Transferee for 49% shareholding of Clinicosis Private Limited",
    },
  ],
  assets: [
    // 5.1 Bank Accounts
    {
      id: "ast-bank-1",
      category: "bank_account",
      name: "SBI IIT Powai Salary Account",
      typeDetails: "Salary Account",
      identifier: "Account No. 10725862853",
      addressOrInstitution: "State Bank of India, IIT Powai Branch, Mumbai",
      ownership: "sole",
      approximateValue: 1200000,
      hasLoan: false,
    },
    {
      id: "ast-bank-2",
      category: "bank_account",
      name: "HDFC Bank Hiranandani Account",
      typeDetails: "Savings Account",
      identifier: "Account No. 02391000033626",
      addressOrInstitution: "HDFC Bank, Hiranandani Gardens, Powai, Mumbai",
      ownership: "sole",
      approximateValue: 850000,
      hasLoan: false,
    },
    {
      id: "ast-bank-3",
      category: "bank_account",
      name: "Canara Bank IIT Powai Account",
      typeDetails: "Savings Account",
      identifier: "Account No. 2724101090157",
      addressOrInstitution: "Canara Bank, IIT Powai Branch, Mumbai",
      ownership: "sole",
      approximateValue: 650000,
      hasLoan: false,
    },
    {
      id: "ast-bank-4",
      category: "bank_account",
      name: "SBI S.K. Nagar Patna Account",
      typeDetails: "Savings Account",
      identifier: "Account No. 10223863266",
      addressOrInstitution: "State Bank of India, S.K. Nagar Branch, Patna, Bihar",
      ownership: "sole",
      approximateValue: 450000,
      hasLoan: false,
    },
    {
      id: "ast-bank-5",
      category: "bank_account",
      name: "Kotak Mahindra Bank Lake Homes Chandivali Account",
      typeDetails: "Savings Account",
      identifier: "Account No. 0847252624",
      addressOrInstitution: "Kotak Mahindra Bank, Lake Homes Chandivali Branch, Mumbai",
      ownership: "sole",
      approximateValue: 500000,
      hasLoan: false,
    },
    // 5.2 Immovable Properties
    {
      id: "ast-prop-1",
      category: "property",
      name: "Powai Flat (B/505, Cypress CHS Ltd.)",
      typeDetails: "Residential Flat",
      identifier: "Share Certificate No. 064, Folio No. 59 (Sale Deed 14-04475-2011 & Gift Deed 3-834-2017)",
      addressOrInstitution: "B/505, Cypress CHS Ltd., Hiranandani Gardens, Powai, Mumbai – 400076",
      ownership: "sole",
      approximateValue: 32000000,
      hasLoan: true,
      loanDetails: "Original title documents deposited with Credila Finance as collateral security for education loan of Ms. Aarohi Shankar (to form part of estate upon release)",
    },
    {
      id: "ast-prop-2",
      category: "property",
      name: "Palava Flat (1002, Casa Regalia B)",
      typeDetails: "Residential Flat",
      identifier: "Serial No. 40/2015 at Kalyan-5 (Agreement for Sale dated 02/01/2015)",
      addressOrInstitution: "1002, Casa Regalia B, Lakeshore Greens, Palava City Phase 2, Dombivli (East)",
      ownership: "joint",
      jointOwnerName: "Alpana Prakash",
      jointOwnerRelationship: "Spouse",
      approximateValue: 6500000,
      hasLoan: true,
      loanDetails: "Original title documents deposited with PNB Housing Finance under Housing Loan No. 00136660004935 (to continue in estate upon discharge)",
    },
    {
      id: "ast-prop-3",
      category: "property",
      name: "Inherited Properties (Mother's Estate)",
      typeDetails: "Inherited Properties & Land",
      identifier: "Bungalow A-34 Poshir Neral (Sale Deed 1251/2015), Bungalow 33 S.K. Nagar Patna, Fulwari Sharif Land (Tauji 18165, Khata 29, Plot 729 ~2 Katha 2 Dhur)",
      addressOrInstitution: "The Destination, Poshir, Neral, Raigad & Patna, Bihar",
      ownership: "joint",
      jointOwnerName: "Amit Srivastava",
      jointOwnerRelationship: "Brother",
      approximateValue: 15000000,
      hasLoan: false,
      specialInstructions: "Shall devolve jointly upon Alpana Prakash (50%) and brother Amit Srivastava (50%) in equal proportion subject to title verification.",
    },
    {
      id: "ast-prop-4",
      category: "property",
      name: "Agricultural Land (Sudhagarh, Raigad)",
      typeDetails: "Agricultural Land",
      identifier: "Parcel No. 76 (~0.2298 hectares / 24,736 sq. ft.), Gat No. 96/2, 7/12 Khata No. 1051",
      addressOrInstitution: "Village Ambulse, Gat No. 96/2, Taluka Sudhagarh, District Raigad, Maharashtra",
      ownership: "sole",
      approximateValue: 3500000,
      hasLoan: false,
    },
    // 5.3 Schedule A Startups & Advisory
    {
      id: "ast-eq-1",
      category: "business",
      name: "Effecmed Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U33100MH2021PTC372949 | 9827 shares (~13.28% equity)",
      addressOrInstitution: "Effecmed Private Limited",
      ownership: "sole",
      approximateValue: 2500000,
      hasLoan: false,
    },
    {
      id: "ast-eq-2",
      category: "business",
      name: "Shodhsens Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U72100PN2023PTC219529 | 30% equity",
      addressOrInstitution: "Shodhsens Private Limited",
      ownership: "sole",
      approximateValue: 3000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-3",
      category: "business",
      name: "Clinicosis Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U24230WB2021PTC248845 | 98% equity",
      addressOrInstitution: "Clinicosis Private Limited",
      ownership: "sole",
      approximateValue: 5000000,
      hasLoan: false,
      specialInstructions: "49% transferred to Dr. Arnab Ghosh or his lawful representative; remaining shares vest in Mrs. Alpana Prakash.",
    },
    {
      id: "ast-eq-4",
      category: "business",
      name: "MedInnoTec Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32509MH2023PTC409481 | 20% equity",
      addressOrInstitution: "MedInnoTec Private Limited",
      ownership: "sole",
      approximateValue: 2000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-5",
      category: "business",
      name: "Lifeseed Reproductive Healthcare Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U72100MH2023PTC411810 | 30% equity",
      addressOrInstitution: "Lifeseed Reproductive Healthcare Private Limited",
      ownership: "sole",
      approximateValue: 2500000,
      hasLoan: false,
    },
    {
      id: "ast-eq-6",
      category: "business",
      name: "Hemoflo Devices Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32500MH2024PTC433130 | 30% equity",
      addressOrInstitution: "Hemoflo Devices Private Limited",
      ownership: "sole",
      approximateValue: 2000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-7",
      category: "business",
      name: "Polytrack Devices Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32500MH2024PTC433131 | 30% equity",
      addressOrInstitution: "Polytrack Devices Private Limited",
      ownership: "sole",
      approximateValue: 2000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-8",
      category: "business",
      name: "NanoTherapX Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U72100MH2025PTC445103 | 25% equity",
      addressOrInstitution: "NanoTherapX Private Limited",
      ownership: "sole",
      approximateValue: 2000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-9",
      category: "business",
      name: "Drepto Biodevices Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U21001MH2025PTC445595 | 15% equity",
      addressOrInstitution: "Drepto Biodevices Private Limited",
      ownership: "sole",
      approximateValue: 1500000,
      hasLoan: false,
    },
    {
      id: "ast-eq-10",
      category: "business",
      name: "MedTecInno Technologies Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32509MH2025PTC461348 | 44% equity",
      addressOrInstitution: "MedTecInno Technologies Private Limited",
      ownership: "sole",
      approximateValue: 3500000,
      hasLoan: false,
    },
    {
      id: "ast-eq-11",
      category: "business",
      name: "MedVentX Technologies Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32509MH2025PTC457745 | 25% equity",
      addressOrInstitution: "MedVentX Technologies Private Limited",
      ownership: "sole",
      approximateValue: 2000000,
      hasLoan: false,
    },
    {
      id: "ast-eq-12",
      category: "business",
      name: "Exinovus Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U32509MH2026PTC468698 | 22% equity",
      addressOrInstitution: "Exinovus Private Limited",
      ownership: "sole",
      approximateValue: 1800000,
      hasLoan: false,
    },
    {
      id: "ast-eq-13",
      category: "business",
      name: "Dermatologist Labs Private Limited",
      typeDetails: "Startup Equity",
      identifier: "CIN: U20237MH2026PTC467703 | 10% equity",
      addressOrInstitution: "Dermatologist Labs Private Limited",
      ownership: "sole",
      approximateValue: 1000000,
      hasLoan: false,
    },
    {
      id: "ast-adv-1",
      category: "shares",
      name: "Advisory / ESOP Holdings (DotoHealth, Neodocs, Shasvi, iKure)",
      typeDetails: "Advisory & Stock Options",
      identifier: "DotoHealth (100 shares ₹10), Neodocs (Options ₹30L), Shasvi (7% subj to IITB NOC), iKure (4% ESOP ~2200 shares)",
      addressOrInstitution: "Various Tech & Biotech Startups",
      ownership: "sole",
      approximateValue: 4500000,
      hasLoan: false,
    },
    {
      id: "ast-sine-1",
      category: "shares",
      name: "SINE Held Structures Beneficial Ownership",
      typeDetails: "Incubator Beneficial Holdings",
      identifier: "Unbound Innovation (5% SINE, 70% beneficial), Ferry Lifesciences (5% SINE, 70% beneficial), EarthyPromise Unlock (5% SINE IITB)",
      addressOrInstitution: "SINE, IIT Bombay",
      ownership: "sole",
      approximateValue: 5000000,
      hasLoan: false,
    },
    // 5.4 Mutual Funds & SIPs
    {
      id: "ast-mf-1",
      category: "investments",
      name: "Mutual Fund Portfolios (Kotak, HDFC, Axis)",
      typeDetails: "Mutual Funds & SIPs",
      identifier: "Kotak MF Folio 17261147, HDFC MF Folio 36797642, Axis MF Folio 910206177056",
      addressOrInstitution: "Kotak, HDFC & Axis Asset Management Companies",
      ownership: "sole",
      approximateValue: 4800000,
      hasLoan: false,
      specialInstructions: "All proceeds, dividends, and growth benefits earmarked exclusively for the welfare and benefit of daughter Ms. Aarohi Shankar.",
    },
    // 5.5 Provident Fund, PPF, NPS & Gratuity
    {
      id: "ast-ret-1",
      category: "bank_account",
      name: "Provident Fund, PPF, NPS & Gratuity",
      typeDetails: "Retirement Benefits & PPF",
      identifier: "PPF A/c 32402528584 (SBI IIT Powai), NPS A/c 110031424796, Gratuity & Retirement Entitlements",
      addressOrInstitution: "IIT Bombay & State Bank of India",
      ownership: "sole",
      approximateValue: 6500000,
      hasLoan: false,
    },
    // 5.6 Life Insurance Policies
    {
      id: "ast-ins-1",
      category: "insurance",
      name: "Life Insurance & Group Term Policies",
      typeDetails: "Life & Group Term Insurance",
      identifier: "AVIVA ALA3080631 (₹75L), Canara HSBC 0126704212 (₹2Cr), SBI Life 72200021905 (₹30L), PNB MetLife 23824339 (₹2Cr), IIT Bombay Group Term Emp ID 10000733 (₹1Cr)",
      addressOrInstitution: "AVIVA, Canara HSBC, SBI Life, PNB MetLife, IIT Bombay",
      ownership: "sole",
      approximateValue: 60500000,
      hasLoan: false,
    },
    // 5.7 Postal Life Insurance
    {
      id: "ast-pli-1",
      category: "insurance",
      name: "Postal Life Insurance Policy",
      typeDetails: "Postal Life Insurance",
      identifier: "Policy No. MH-334644-CC",
      addressOrInstitution: "Department of Posts, India",
      ownership: "sole",
      approximateValue: 1000000,
      hasLoan: false,
    },
    // 5.8 Locker and Contents
    {
      id: "ast-lkr-1",
      category: "jewellery",
      name: "Canara Bank Joint Locker & Contents",
      typeDetails: "Bank Locker & Valuables",
      identifier: "Canara Bank IIT Powai Locker",
      addressOrInstitution: "Canara Bank, IIT Powai Branch, Mumbai",
      ownership: "joint",
      jointOwnerName: "Alpana Prakash",
      jointOwnerRelationship: "Spouse",
      approximateValue: 2500000,
      hasLoan: false,
    },
    // 5.9 Vehicles
    {
      id: "ast-veh-1",
      category: "vehicles",
      name: "Motor Vehicles (Toyota Innova & BMW X1)",
      typeDetails: "Motor Vehicles",
      identifier: "Toyota Innova MH03 DG 9722, BMW X1 MH03 EB 9722",
      addressOrInstitution: "Mumbai, Maharashtra",
      ownership: "sole",
      approximateValue: 4500000,
      hasLoan: false,
    },
    // 5.10 Sukanya Samriddhi Account
    {
      id: "ast-ssa-1",
      category: "bank_account",
      name: "Sukanya Samriddhi Account",
      typeDetails: "Sukanya Samriddhi Scheme",
      identifier: "Account No. BETI0272420000001",
      addressOrInstitution: "State Bank of India / Post Office",
      ownership: "sole",
      approximateValue: 1500000,
      hasLoan: false,
      specialInstructions: "Solely for the benefit, welfare, maintenance, education, and exclusive use of Ms. Aarohi Shankar.",
    },
  ],
  allocations: [
    { id: "alc-1", assetId: "ast-bank-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-2", assetId: "ast-bank-2", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-3", assetId: "ast-bank-3", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-4", assetId: "ast-bank-4", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-5", assetId: "ast-bank-5", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-6", assetId: "ast-prop-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-7", assetId: "ast-prop-2", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    // Maternal properties: 50% Alpana Prakash, 50% Amit Srivastava
    { id: "alc-8", assetId: "ast-prop-3", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 50 },
    { id: "alc-9", assetId: "ast-prop-3", beneficiaryId: "fam-amit", beneficiaryName: "Mr. Amit Srivastava", percentage: 50 },
    { id: "alc-10", assetId: "ast-prop-4", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-11", assetId: "ast-eq-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-12", assetId: "ast-eq-2", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    // Clinicosis: 49% Dr. Arnab Ghosh, 51% Mrs. Alpana Prakash
    { id: "alc-13", assetId: "ast-eq-3", beneficiaryId: "fam-arnab", beneficiaryName: "Dr. Arnab Ghosh", percentage: 49 },
    { id: "alc-14", assetId: "ast-eq-3", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 51 },
    { id: "alc-15", assetId: "ast-eq-4", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-16", assetId: "ast-eq-5", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-17", assetId: "ast-eq-6", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-18", assetId: "ast-eq-7", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-19", assetId: "ast-eq-8", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-20", assetId: "ast-eq-9", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-21", assetId: "ast-eq-10", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-22", assetId: "ast-eq-11", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-23", assetId: "ast-eq-12", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-24", assetId: "ast-eq-13", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-25", assetId: "ast-adv-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-26", assetId: "ast-sine-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    // Mutual funds exclusively for daughter Aarohi
    { id: "alc-27", assetId: "ast-mf-1", beneficiaryId: "fam-aarohi", beneficiaryName: "Ms. Aarohi Shankar", percentage: 100 },
    // Ret benefits to Alpana
    { id: "alc-28", assetId: "ast-ret-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    // Insurance to Alpana
    { id: "alc-29", assetId: "ast-ins-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-30", assetId: "ast-pli-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-31", assetId: "ast-lkr-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    { id: "alc-32", assetId: "ast-veh-1", beneficiaryId: "fam-alpana", beneficiaryName: "Mrs. Alpana Prakash", percentage: 100 },
    // Sukanya Samriddhi exclusively for Aarohi
    { id: "alc-33", assetId: "ast-ssa-1", beneficiaryId: "fam-aarohi", beneficiaryName: "Ms. Aarohi Shankar", percentage: 100 },
  ],
  residuaryBeneficiaryId: "fam-alpana",
  residuaryBeneficiaryName: "Mrs. Alpana Prakash",
  residuaryAlternateId: "fam-aarohi",
  residuaryAlternateName: "Ms. Aarohi Shankar",
  executorPrimary: {
    name: "Mr. Ashok Ajmera",
    relationship: "Sole Executor / Trusted Advisor",
    phone: "",
    email: "ashok.ajmera@example.com",
    address: "Mumbai, Maharashtra",
  },
  executorAlternate: {
    name: "Mrs. Alpana Prakash",
    relationship: "Wife / Alternate Executor",
    phone: "",
    email: "alpana.prakash@example.com",
    address: "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072",
  },
  guardianPrimary: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianAlternate: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianSpecialInstructions: "",
  specialWishes: {
    hasNoSpecialWishes: true,
    jewelleryInstructions: "",
    personalBelongings: "",
    petsCare: "",
    charitableGifts: "",
    digitalAccounts: "",
    funeralCeremonyWishes: "",
    personalMessageToFamily: "",
  },
  emotionalReason: "Ensure full financial security for my wife Mrs. Alpana Prakash and daughter Ms. Aarohi Shankar, and prevent legal complications regarding startup equity and maternal properties.",
  willStatus: "approved",
  selectedPlan: "essential",
  version: "1.0",
  lastUpdated: new Date().toISOString().split("T")[0],
  lawyerNotes: [
    "Original title documents for Powai Flat deposited with Credila Finance for Ms. Aarohi Shankar's education loan (form part of estate upon release).",
    "Palava Flat title deeds deposited with PNB Housing Finance under Loan No. 00136660004935 (continue in estate upon discharge).",
    "Maternal properties to devolve 50/50 jointly upon Mrs. Alpana Prakash and brother Mr. Amit Srivastava.",
    "Schedule A startup equities: Clinicosis 49% transferred to Dr. Arnab Ghosh; SINE beneficial ownership 70% to vest in Mrs. Alpana Prakash.",
    "Mutual funds and Sukanya Samriddhi account earmarked exclusively for Ms. Aarohi Shankar.",
  ],
  clauses: [],
  documents: [
    {
      id: "doc-1",
      title: "Last Will & Testament (Dr. Rohit Srivastava v1.0)",
      category: "will_draft",
      version: "v1.0",
      dateAdded: "2026-09-16",
      fileSize: "480 KB",
      status: "verified",
    },
    {
      id: "doc-2",
      title: "Powai Flat Cypress CHS Share Certificate & Gift Deed",
      category: "property_deed",
      version: "Registered",
      dateAdded: "2026-09-16",
      fileSize: "4.2 MB",
      status: "verified",
    },
    {
      id: "doc-3",
      title: "Palava Flat Registered Agreement for Sale (Serial 40/2015)",
      category: "property_deed",
      version: "Registered",
      dateAdded: "2026-09-16",
      fileSize: "3.8 MB",
      status: "verified",
    },
    {
      id: "doc-4",
      title: "Schedule A Startup Equity Holding Certificates & SINE Undertakings",
      category: "identity_proof",
      version: "Certified",
      dateAdded: "2026-09-16",
      fileSize: "5.5 MB",
      status: "verified",
    },
  ],
  auditLogs: [
    { timestamp: "2026-09-16 10:00", action: "Will Deed compiled with full Schedule A startup equity and asset coverage", actor: "Dr. Rohit Srivastava" },
    { timestamp: "2026-09-16 10:30", action: "Legal Health Check cleared with 100% compliance under Indian succession law", actor: "Rules Engine" },
    { timestamp: "2026-09-16 11:15", action: "All statutory clauses and Schedule A verified by Legal Counsel", actor: "Advocate & Legal Advisory Team" },
  ],
};

export const SCENARIO_DR_ROHIT_SRIVASTAVA = SCENARIO_1_STANDARD_MARRIED;

// SCENARIO 2: Edge Case with Minor Child + Joint Property + Missing Residuary (Triggers Health Check)
export const SCENARIO_2_EDGE_CASE_MINOR_CHILD: WillDraftingState = {
  currentStep: 10, // At Legal Health Check
  testator: {
    fullName: "Vikram Malhotra",
    dob: "1984-04-18",
    gender: "male",
    maritalStatus: "married",
    religionPersonalLaw: "hindu",
    email: "vikram.malhotra@techcorp.in",
    phone: "",
    address: "Flat 401, Palm Grove Heights, Hiranandani Estate, Thane West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400607",
    citizenship: "Indian",
    hasPreviousWill: true,
    revokePreviousWill: true,
  },
  familyMembers: [
    {
      id: "fam-101",
      name: "Anita Malhotra",
      relationship: "spouse",
      dob: "1987-08-14",
      isMinor: false,
      phone: "",
      email: "anita.m@techcorp.in",
    },
    {
      id: "fam-102",
      name: "Aarav Malhotra",
      relationship: "son",
      dob: "2015-05-20", // 11 years old -> MINOR!
      isMinor: true,
    },
  ],
  assets: [
    {
      id: "ast-101",
      category: "property",
      name: "Hiranandani Estate 2BHK Apartment",
      typeDetails: "Residential Flat (1,150 sq.ft)",
      identifier: "Flat 401, Palm Grove",
      addressOrInstitution: "Thane West, Maharashtra",
      ownership: "joint", // JOINT OWNERSHIP -> Health Check flag!
      jointOwnerName: "Anita Malhotra (Spouse)",
      approximateValue: 14000000,
      hasLoan: true,
      loanDetails: "SBI Home Loan ₹42 Lakhs outstanding",
    },
    {
      id: "ast-102",
      category: "business",
      name: "Proprietary Software Consultancy",
      typeDetails: "Sole Proprietorship",
      identifier: "GSTIN: 27AABCV1234F1Z9",
      addressOrInstitution: "Mumbai",
      ownership: "sole",
      approximateValue: 5000000,
      hasLoan: false,
    },
  ],
  allocations: [
    {
      id: "alc-101",
      assetId: "ast-101",
      beneficiaryId: "fam-102", // Bequeathing to minor Aarav!
      beneficiaryName: "Aarav Malhotra (Minor - 11 yrs)",
      percentage: 100,
    },
    {
      id: "alc-102",
      assetId: "ast-102",
      beneficiaryId: "fam-101",
      beneficiaryName: "Anita Malhotra",
      percentage: 80, // Note: only 80%! -> Allocation check trigger
    },
  ],
  residuaryBeneficiaryId: "", // MISSING RESIDUARY! -> Health Check flag!
  residuaryBeneficiaryName: "",
  residuaryAlternateId: "",
  residuaryAlternateName: "",
  executorPrimary: {
    name: "Anita Malhotra",
    relationship: "Spouse",
    phone: "",
    email: "anita.m@techcorp.in",
    address: "Hiranandani Estate, Thane West",
  },
  executorAlternate: {
    name: "", // MISSING ALTERNATE EXECUTOR!
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianPrimary: {
    name: "", // MISSING GUARDIAN FOR MINOR!
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianAlternate: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianSpecialInstructions: "",
  specialWishes: {
    jewelleryInstructions: "",
    personalBelongings: "",
    petsCare: "",
    charitableGifts: "",
    digitalAccounts: "GitHub repositories & AWS credentials to be handed over to business partner.",
    funeralCeremonyWishes: "Simple memorial service.",
    personalMessageToFamily: "Take good care of Aarav's higher education.",
  },
  emotionalReason: "Protect minor son's future & ensure business assets are not frozen.",
  willStatus: "draft_ready",
  selectedPlan: "lawyer_verified",
  version: "0.9 Draft",
  lastUpdated: new Date().toISOString().split("T")[0],
  lawyerNotes: [
    "ATTENTION: Minor beneficiary detected without testamentary guardian.",
    "Joint property requires clarification regarding survivorship vs tenancy-in-common.",
    "Asset 'Proprietary Software Consultancy' only allocated to 80%; 20% unallocated.",
  ],
  clauses: [],
  documents: [],
  auditLogs: [
    { timestamp: "2026-09-14 14:00", action: "Draft questionnaire saved with 3 warnings", actor: "Vikram Malhotra" },
  ],
};

export const BLANK_STATE: WillDraftingState = {
  currentStep: 1,
  testator: {
    fullName: "",
    fatherOrMotherName: "",
    pan: "",
    aadhaar: "",
    workplace: "",
    dob: "",
    gender: "",
    maritalStatus: "married",
    religionPersonalLaw: "hindu",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    citizenship: "Indian",
    hasPreviousWill: false,
    revokePreviousWill: true,
  },
  familyMembers: [],
  assets: [],
  allocations: [],
  residuaryBeneficiaryId: "",
  residuaryBeneficiaryName: "",
  residuaryAlternateId: "",
  residuaryAlternateName: "",
  residuaryPrimary01Name: "",
  residuaryPrimary02Name: "",
  residuaryBackup01Name: "",
  residuaryBackup02Name: "",
  executorPrimary: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  executorAlternate: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianPrimary: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianAlternate: {
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianSpecialInstructions: "",
  specialWishes: {
    hasNoSpecialWishes: true,
    jewelleryInstructions: "",
    personalBelongings: "",
    petsCare: "",
    charitableGifts: "",
    digitalAccounts: "",
    funeralCeremonyWishes: "",
    personalMessageToFamily: "",
  },
  emotionalReason: "",
  willStatus: "drafting",
  selectedPlan: "lawyer_verified",
  version: "0.1 Draft",
  lastUpdated: new Date().toISOString().split("T")[0],
  lawyerNotes: [],
  clauses: [],
  documents: [],
  auditLogs: [],
  detailsVerified: false,
};

// -------------------------------------------------------------
// CORE LEGAL HEALTH CHECK ENGINE (§25 & §58)
// -------------------------------------------------------------

export const evaluateLegalHealthCheck = (state: WillDraftingState) => runLegalHealthCheck(state);

export function runLegalHealthCheck(rawState: WillDraftingState): LegalHealthCheckIssue[] {
  const state = normalizeWillState(rawState, true);
  const issues: LegalHealthCheckIssue[] = [];
  const t = state.testator;

  const formatPersonDetails = (n?: string) => (n || "").trim().toLowerCase();

  // Helper: calculate exact age from YYYY-MM-DD
  const getExactAge = (dobStr?: string): number | null => {
    if (!dobStr) return null;
    const birth = new Date(dobStr);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const testatorAge = getExactAge(t.dob);

  // 1. Testator Natural Person Check (Section 59, ISA 1925)
  const corporateNamePattern =
    /\b(solutions|pvt|private|ltd|limited|llp|inc|corp|corporation|enterprise|enterprises|company|co\.|associates|firm|consultancy|technologies|services|group|agency|foundation|trust|huf)\b/i;
  if (t.fullName?.trim() && corporateNamePattern.test(t.fullName.trim())) {
    issues.push({
      id: "chk-testator-non-natural",
      severity: "critical",
      category: "family",
      title: "Testator Name Appears to Be a Company or Firm",
      explanation: `Under Section 59 of the Indian Succession Act, 1925, only a natural living human being can execute a Will. A company, firm, or non-natural entity ("${t.fullName.trim()}") cannot execute a valid Will.`,
      actionRecommendation: "Enter your personal full legal name as per your Aadhaar / PAN card in Step 1 (About You).",
      resolved: false,
    });
  }

  // 2. Testator Majority & Date of Birth Check (Section 59, ISA 1925)
  if (!t.dob || testatorAge === null) {
    issues.push({
      id: "chk-testator-dob-missing",
      severity: "critical",
      category: "family",
      title: "Testator Date of Birth Missing",
      explanation: "Your Date of Birth is not recorded. Under Section 59 of the Indian Succession Act, 1925, proving that the Testator has attained the age of majority (18+ years) is mandatory for testamentary capacity.",
      actionRecommendation: "Provide your accurate Date of Birth in Step 1 (About You).",
      resolved: false,
    });
  } else if (testatorAge < 18) {
    issues.push({
      id: "chk-testator-minor",
      severity: "critical",
      category: "family",
      title: "Testator Under 18 Years of Age (Minor)",
      explanation: `Your recorded Date of Birth indicates an age of ${testatorAge} years. Under Section 59 of the Indian Succession Act, 1925, a minor cannot legally execute a Will.`,
      actionRecommendation: "Verify and correct your Date of Birth in Step 1 (About You).",
      resolved: false,
    });
  }

  // 3. Testator Identity & Address Completeness Check
  const missingIdentityFields: string[] = [];
  if (!t.fatherOrMotherName?.trim()) missingIdentityFields.push("Father's / Mother's Name");
  if (!t.pan?.trim() && !t.aadhaar?.trim()) missingIdentityFields.push("PAN or Aadhaar Number");
  if (!t.address?.trim() || !t.city?.trim() || !t.state?.trim() || !t.pincode?.trim()) {
    missingIdentityFields.push("Complete Residential Address & Pincode");
  }
  if (missingIdentityFields.length > 0) {
    issues.push({
      id: "chk-testator-identity-incomplete",
      severity: "warning",
      category: "family",
      title: "Testator Identification Details Incomplete",
      explanation: `The following identification particulars are missing from your profile: ${missingIdentityFields.join(", ")}. Probate courts rely on parentage, ID numbers, and residential address to prevent identity disputes.`,
      actionRecommendation: "Complete your parent's name, PAN/Aadhaar, and full address in Step 1 (About You).",
      resolved: false,
    });
  }

  // 4. Marital Status vs. Family Tree & Asset/Wishes Consistency Check
  const hasSpouseInFamily = state.familyMembers.some((f) => f.relationship === "spouse");
  const hasChildrenInFamily = state.familyMembers.some(
    (f) => f.relationship === "son" || f.relationship === "daughter"
  );
  const jointSpouseAsset = state.assets.find(
    (a) => a.ownership === "joint" && /\b(wife|husband|spouse)\b/i.test(a.jointOwnerRelationship || a.jointOwnerName || "")
  );
  const wishesMentionSpouse =
    !state.specialWishes?.hasNoSpecialWishes &&
    /\b(wife|husband|spouse)\b/i.test(
      [
        state.specialWishes?.jewelleryInstructions,
        state.specialWishes?.personalBelongings,
        state.specialWishes?.personalMessageToFamily,
      ]
        .filter(Boolean)
        .join(" ")
    );

  if ((t.maritalStatus === "married" || jointSpouseAsset || wishesMentionSpouse) && !hasSpouseInFamily) {
    const triggerDetail =
      t.maritalStatus === "married"
        ? "your marital status is set to 'Married'"
        : jointSpouseAsset
        ? `asset "${jointSpouseAsset.name}" names a Wife/Husband/Spouse as co-owner`
        : "your Special Wishes refer to your Wife/Husband/Spouse";
    issues.push({
      id: "chk-marital-family-mismatch",
      severity: "critical",
      category: "family",
      title: "Spouse Referenced But Missing from Family Tree",
      explanation: `Contradiction detected: ${triggerDetail}, yet no Spouse is listed in your Family Tree (Clause 2). Omitting a surviving spouse from the family declaration or misclassifying their relationship can trigger a serious legal challenge.`,
      actionRecommendation: "Add your Spouse with the 'Spouse' relationship in Step 2 (Family), or update your Marital Status / asset co-owner details if unmarried.",
      resolved: false,
    });
  } else if (t.maritalStatus === "single" && (hasSpouseInFamily || hasChildrenInFamily)) {
    issues.push({
      id: "chk-marital-family-mismatch",
      severity: "warning",
      category: "family",
      title: "Marital Status 'Single' Conflicts with Family Tree",
      explanation: "You selected 'Single (Never Married)' in Step 1, but your Family Tree includes a Spouse or Child.",
      actionRecommendation: "Update your Marital Status in Step 1 (About You) to match your family structure.",
      resolved: false,
    });
  }

  // 5. Unexplained Exclusion of Class I / Natural Legal Heirs
  const residuaryNamesLower = [
    state.residuaryBeneficiaryName,
    state.residuaryPrimary01Name,
    state.residuaryPrimary02Name,
    state.residuaryAlternateName,
    state.residuaryBackup01Name,
    state.residuaryBackup02Name,
  ]
    .map(formatPersonDetails)
    .filter(Boolean);

  const disinheritedNaturalHeirs = state.familyMembers.filter((f) => {
    const isNaturalClassI =
      f.relationship === "spouse" ||
      f.relationship === "son" ||
      f.relationship === "daughter" ||
      f.relationship === "mother";
    if (!isNaturalClassI) return false;
    const hasAssetShare = state.allocations.some(
      (a) =>
        (a.beneficiaryId === f.id || formatPersonDetails(a.beneficiaryName) === formatPersonDetails(f.name)) &&
        Number(a.percentage) > 0
    );
    const isResiduary =
      state.residuaryBeneficiaryId === f.id ||
      state.residuaryAlternateId === f.id ||
      residuaryNamesLower.includes(formatPersonDetails(f.name));
    return !hasAssetShare && !isResiduary;
  });

  if (disinheritedNaturalHeirs.length > 0 && !state.emotionalReason?.trim()) {
    issues.push({
      id: "chk-disinherited-natural-heir",
      severity: "warning",
      category: "family",
      title: "Natural Legal Heir Excluded Without Recorded Reason",
      explanation: `Immediate legal heir(s) (${disinheritedNaturalHeirs.map((h) => `${h.name} - ${h.relationship}`).join(", ")}) receive 0% of your assets and are not named as Residuary Legatees. Under Indian probate jurisprudence, unexplained exclusion of a spouse, child, or mother can be challenged as a suspicious circumstance.`,
      actionRecommendation: "Either allocate a share in Step 4 (Beneficiaries) or record a brief reason in Step 8 (Intent & Emotional Will) explaining why they are otherwise provided for.",
      resolved: false,
    });
  }

  // 6. Unallocated Non-Relative ("other") in Family List
  const unreferencedNonRelatives = state.familyMembers.filter((f) => {
    if (f.relationship !== "other") return false;
    const fName = formatPersonDetails(f.name);
    const hasAssetShare = state.allocations.some(
      (a) => (a.beneficiaryId === f.id || formatPersonDetails(a.beneficiaryName) === fName) && Number(a.percentage) > 0
    );
    const isResiduary =
      state.residuaryBeneficiaryId === f.id ||
      state.residuaryAlternateId === f.id ||
      residuaryNamesLower.includes(fName);
    const isExecutorOrGuardian =
      formatPersonDetails(state.executorPrimary.name) === fName ||
      formatPersonDetails(state.executorAlternate.name) === fName ||
      formatPersonDetails(state.guardianPrimary.name) === fName ||
      formatPersonDetails(state.guardianAlternate.name) === fName;
    return !hasAssetShare && !isResiduary && !isExecutorOrGuardian;
  });

  if (unreferencedNonRelatives.length > 0) {
    issues.push({
      id: "chk-unallocated-non-relative",
      severity: "warning",
      category: "family",
      title: "Non-Relative Listed With 0% Bequest & No Role",
      explanation: `You added ${unreferencedNonRelatives.map((f) => `"${f.name}" (${f.customRelationship || "Other"})`).join(", ")} in Step 2, but they are not allocated any asset share, residuary share, or executor/guardian role.`,
      actionRecommendation: "Either assign them a bequest in Step 4 (Beneficiaries) or remove them from Step 2 (Family) so the Will does not list unreferenced third parties.",
      resolved: false,
    });
  }

  // 7. Minor Beneficiary Check & Guardian Checks
  const hasMinorsInFamily = state.familyMembers.some((f) => f.isMinor || calculateIsMinor(f.dob));
  const minorAllocations = state.allocations.filter((a) => {
    const fam = state.familyMembers.find(
      (f) => f.id === a.beneficiaryId || formatPersonDetails(f.name) === formatPersonDetails(a.beneficiaryName)
    );
    return fam && (fam.isMinor || calculateIsMinor(fam.dob)) && Number(a.percentage) > 0;
  });

  if (minorAllocations.length > 0) {
    issues.push({
      id: "chk-minor-beneficiary",
      severity: "warning",
      category: "guardian",
      title: "Minor Beneficiary Allocation Detected",
      explanation: `You have allocated assets directly to a minor (${minorAllocations.map((a) => a.beneficiaryName).join(", ")}). Under Section 60 of the Indian Succession Act, a minor cannot directly manage property until attaining majority (18 years).`,
      actionRecommendation: "Appoint a Testamentary Guardian and establish a testamentary trust clause holding the asset until the child turns 18.",
      resolved: !!state.guardianPrimary.name,
    });
  }

  if (hasMinorsInFamily && !state.guardianPrimary.name?.trim()) {
    issues.push({
      id: "chk-guardian-missing",
      severity: "critical",
      category: "guardian",
      title: "Testamentary Guardian Missing for Minor Children",
      explanation: "You have minor children in your family tree, but you have not designated a legal guardian in the event both parents pass away.",
      actionRecommendation: "Nominate a trusted adult primary guardian and an alternate backup guardian in Step 6 (Guardian).",
      resolved: false,
    });
  } else if (hasMinorsInFamily && state.guardianPrimary.name?.trim()) {
    const gPrimLower = formatPersonDetails(state.guardianPrimary.name);
    const gAltLower = formatPersonDetails(state.guardianAlternate.name);
    const guardianMinorMatch = state.familyMembers.find(
      (f) =>
        (f.isMinor || calculateIsMinor(f.dob)) &&
        (formatPersonDetails(f.name) === gPrimLower || (gAltLower && formatPersonDetails(f.name) === gAltLower))
    );
    if (guardianMinorMatch) {
      issues.push({
        id: "chk-guardian-conflict",
        severity: "critical",
        category: "guardian",
        title: "Minor Cannot Be Appointed as Legal Guardian",
        explanation: `"${guardianMinorMatch.name}" is a minor (<18 years) and cannot legally act as a Testamentary Guardian.`,
        actionRecommendation: "Appoint a competent adult (18+ years) as Guardian in Step 6.",
        resolved: false,
      });
    } else if (gAltLower && gPrimLower === gAltLower) {
      issues.push({
        id: "chk-guardian-conflict",
        severity: "critical",
        category: "guardian",
        title: "Primary and Alternate Guardian Are the Same Person",
        explanation: `You have named "${state.guardianPrimary.name}" as both Primary and Alternate Guardian. An alternate guardian must be a different adult who can step in if the primary guardian is unable to act.`,
        actionRecommendation: "Choose a distinct individual as Alternate Guardian in Step 6.",
        resolved: false,
      });
    }
  }

  // 8. Joint Property Check
  const jointAssets = state.assets.filter((a) => a.ownership === "joint");
  const incompleteJointAssets = jointAssets.filter(
    (a) =>
      !a.jointOwnerName?.trim() ||
      !a.ownershipPercentage ||
      a.ownershipPercentage <= 0 ||
      a.ownershipPercentage >= 100
  );
  if (incompleteJointAssets.length > 0) {
    issues.push({
      id: "chk-joint-property",
      severity: "warning",
      category: "assets",
      title: "Jointly Owned Property Details Incomplete",
      explanation: `Asset "${incompleteJointAssets[0].name}" is held under joint ownership, but the co-owner name or your specific undivided ownership share (1%–99%) has not been specified.`,
      actionRecommendation: "Confirm your specific ownership percentage (e.g., 50%) and co-owner details in Step 3 (Assets) so the Will specifies only your valid legal entitlement.",
      resolved: false,
    });
  } else if (jointAssets.length > 0) {
    issues.push({
      id: "chk-joint-property",
      severity: "pass",
      category: "assets",
      title: "Joint Ownership Share Verified",
      explanation: `Your specific undivided ownership share (${jointAssets.map((a) => `${a.name}: ${a.ownershipPercentage || 50}%`).join(", ")}) and co-owner details are recorded.`,
      actionRecommendation: "Completed",
      resolved: true,
    });
  }

  // 9. Encumbered Assets / Active Loan Check (Section 167, ISA 1925)
  const encumberedMissingDetails = state.assets.filter((a) => a.hasLoan && !a.loanDetails?.trim());
  if (encumberedMissingDetails.length > 0) {
    issues.push({
      id: "chk-encumbered-asset-loan",
      severity: "warning",
      category: "assets",
      title: "Mortgaged / Loan Asset Missing Lender Details",
      explanation: `You marked ${encumberedMissingDetails.map((a) => `"${a.name}"`).join(", ")} as having an active loan/mortgage, but did not specify the lender or loan details. Under Section 167 of the Indian Succession Act, 1925, clarity on encumbrances prevents disputes over who discharges the debt.`,
      actionRecommendation: "Add the bank/lender name and loan details for encumbered assets in Step 3 (Assets).",
      resolved: false,
    });
  }

  // 10. Insurance Policy Nominee vs. Will Beneficiary Mismatch (Section 39, Insurance Act 1938)
  const insuranceNomineeConflicts = state.assets.filter((a) => {
    if (a.category !== "insurance" || !a.nomineeName?.trim()) return false;
    const allocs = state.allocations.filter((al) => al.assetId === a.id && Number(al.percentage) > 0);
    if (allocs.length === 0) return false;
    const nomLower = formatPersonDetails(a.nomineeName);
    return !allocs.some((al) => formatPersonDetails(al.beneficiaryName) === nomLower);
  });
  if (insuranceNomineeConflicts.length > 0) {
    issues.push({
      id: "chk-insurance-nominee-mismatch",
      severity: "warning",
      category: "assets",
      title: "Insurance Policy Nominee Differs from Will Beneficiary",
      explanation: `For insurance policy ${insuranceNomineeConflicts.map((a) => `"${a.name}" (Nominee: ${a.nomineeName})`).join(", ")}, the beneficiary allocated in your Will differs from the recorded policy nominee. Under Section 39 of the Insurance Act, 1938, a 'beneficial nominee' (spouse, child, or parent) can claim statutory entitlement unless nominations are aligned.`,
      actionRecommendation: "Either align the insurance nominee with your Will beneficiary or update your policy nomination with the insurer.",
      resolved: false,
    });
  }

  // 11. Foreign / Cross-Border Immovable Property Check (Lex Situs - Section 5(1), ISA 1925)
  const foreignCountryPattern =
    /\b(nepal|usa|united states|uk|united kingdom|england|dubai|uae|abu dhabi|canada|australia|singapore|germany|france|new zealand|malaysia|thailand|sri lanka|bangladesh|switzerland|japan)\b/i;
  const foreignImmovableAssets = state.assets.filter(
    (a) =>
      a.category === "property" &&
      foreignCountryPattern.test(`${a.addressOrInstitution || ""} ${a.name || ""} ${a.identifier || ""}`)
  );
  if (foreignImmovableAssets.length > 0) {
    issues.push({
      id: "chk-foreign-immovable-property",
      severity: "warning",
      category: "assets",
      title: "Cross-Border Immovable Property Detected (Lex Situs Rule)",
      explanation: `Immovable property ${foreignImmovableAssets.map((a) => `"${a.name}" (${a.addressOrInstitution})`).join(", ")} appears to be located outside India. Under Section 5(1) of the Indian Succession Act, 1925, succession to immovable property is governed by the local law of the country where the land is situated (lex situs), not Indian law.`,
      actionRecommendation: "Verify local inheritance and foreign ownership laws in that jurisdiction or execute a separate mirror Will in that country.",
      resolved: false,
    });
  }

  // 12. Specific Jewellery Asset vs. Special Wishes Jewellery Contradiction Check (Section 88, ISA 1925)
  const hasScheduledJewellery = state.assets.some((a) => a.category === "jewellery");
  const hasSpecialWishJewellery =
    !state.specialWishes?.hasNoSpecialWishes && Boolean(state.specialWishes?.jewelleryInstructions?.trim());
  if (hasScheduledJewellery && hasSpecialWishJewellery) {
    issues.push({
      id: "chk-jewellery-wish-conflict",
      severity: "warning",
      category: "assets",
      title: "Both Scheduled Jewellery & General Jewellery Wish Present",
      explanation: `You itemized jewellery in your Asset Schedule (Clause 6) and also wrote a Jewellery directive in Special Wishes ("${state.specialWishes.jewelleryInstructions.trim()}"). To prevent a conflict under Section 88 of the Indian Succession Act, 1925, ensure your Special Wish applies only to remaining unscheduled jewellery or matches your Schedule beneficiaries.`,
      actionRecommendation: "Review Step 4 (Beneficiaries) and Step 7 (Special Wishes) to ensure your jewellery instructions do not contradict each other.",
      resolved: false,
    });
  }

  // 13. Muslim Personal Law (Shariat) Testamentary Rules Check
  if (t.religionPersonalLaw === "muslim") {
    issues.push({
      id: "chk-muslim-personal-law",
      severity: "warning",
      category: "beneficiary",
      title: "Muslim Personal Law (Shariat) 1/3rd & Legal Heir Consent Rule",
      explanation: "Under Muslim Personal Law (Shariat), a Testator cannot bequeath more than one-third (1/3rd) of their net estate (after funeral expenses and debts) without the consent of the legal heirs after the Testator's demise. Furthermore, under Sunni law, any bequest to a legal heir requires post-demise consent of the remaining legal heirs.",
      actionRecommendation: "Review your asset allocations in Step 4 with Shariat inheritance shares in mind, or consult legal counsel to obtain heir consent documentation.",
      resolved: false,
    });
  }

  // 14. Residuary Beneficiary Checks
  if (!state.residuaryBeneficiaryId && !state.residuaryBeneficiaryName?.trim()) {
    issues.push({
      id: "chk-residuary-missing",
      severity: "critical",
      category: "residuary",
      title: "Residuary Estate Clause Missing",
      explanation: "You have not named a residuary beneficiary. Any future assets, unlisted accounts, tax refunds, or lapsed bequests will fall into partial intestacy rather than your chosen legatee.",
      actionRecommendation: "Designate a residuary beneficiary in Step 4 (Beneficiaries) to receive all remaining unlisted estate.",
      resolved: false,
    });
  } else if (
    state.residuaryBeneficiaryName?.trim() &&
    state.residuaryAlternateName?.trim() &&
    formatPersonDetails(state.residuaryBeneficiaryName) === formatPersonDetails(state.residuaryAlternateName)
  ) {
    issues.push({
      id: "chk-residuary-duplicate",
      severity: "warning",
      category: "residuary",
      title: "Primary and Backup Residuary Legatee Are the Same Person",
      explanation: `You selected "${state.residuaryBeneficiaryName}" as both Primary and Backup Residuary Legatee. If they predecease you, the backup clause cannot operate unless a different person is named.`,
      actionRecommendation: "Select a different person as the Backup Residuary Legatee in Step 4 (Beneficiaries).",
      resolved: false,
    });
  }

  // 15. Asset Presence, 100% Allocation Completeness & Orphaned Beneficiary Check
  if (state.assets.length === 0) {
    issues.push({
      id: "chk-no-assets",
      severity: "critical",
      category: "assets",
      title: "No Assets Added to Will Schedule",
      explanation: "Your Will currently has 0 itemized assets in the Schedule of Asset Distribution.",
      actionRecommendation: "Add your immovable and movable assets in Step 3 (Assets).",
      resolved: false,
    });
  } else {
    const assetsWithoutCompleteAllocation: string[] = [];
    state.assets.forEach((asset) => {
      const allocationsForAsset = state.allocations.filter((a) => a.assetId === asset.id);
      const totalPercentage = allocationsForAsset.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
      if (Math.round(totalPercentage * 100) / 100 !== 100) {
        assetsWithoutCompleteAllocation.push(`${asset.name} (${totalPercentage}% allocated)`);
      }
    });

    if (assetsWithoutCompleteAllocation.length > 0) {
      issues.push({
        id: "chk-allocation-imbalance",
        severity: "critical",
        category: "beneficiary",
        title: "Asset Allocation Does Not Equal 100%",
        explanation: `The following asset(s) are partially or improperly allocated: ${assetsWithoutCompleteAllocation.join(", ")}. Bequests must sum precisely to 100% to avoid partial intestacy or ambiguity.`,
        actionRecommendation: "Adjust beneficiary percentages in Step 4 (Beneficiaries) until every asset equals 100%.",
        resolved: false,
      });
    }
  }

  const orphanedAllocations = state.allocations.filter((a) => {
    if ((Number(a.percentage) || 0) <= 0) return false;
    return !state.familyMembers.some(
      (f) => f.id === a.beneficiaryId || formatPersonDetails(f.name) === formatPersonDetails(a.beneficiaryName)
    );
  });
  if (orphanedAllocations.length > 0) {
    issues.push({
      id: "chk-orphan-allocation",
      severity: "critical",
      category: "beneficiary",
      title: "Allocation References Removed Beneficiary",
      explanation: `An asset allocation references "${orphanedAllocations[0].beneficiaryName}", who is no longer in your Family & Beneficiaries list.`,
      actionRecommendation: "Reassign the share to an active beneficiary in Step 4 (Beneficiaries).",
      resolved: false,
    });
  }

  // 16. Executor Checks (Section 222 & 223, ISA 1925)
  if (!state.executorPrimary.name?.trim()) {
    issues.push({
      id: "chk-executor-missing",
      severity: "critical",
      category: "executor",
      title: "Primary Executor Not Appointed",
      explanation: "A Will without an executor requires court-appointed Letters of Administration with Will Annexed, causing delays and legal costs for your family.",
      actionRecommendation: "Appoint a trusted adult family member or professional as your Primary Executor in Step 5 (Executor).",
      resolved: false,
    });
  } else {
    const execPrimLower = formatPersonDetails(state.executorPrimary.name);
    const execAltLower = formatPersonDetails(state.executorAlternate.name);
    const executorMinorMatch = state.familyMembers.find(
      (f) =>
        (f.isMinor || calculateIsMinor(f.dob)) &&
        (formatPersonDetails(f.name) === execPrimLower || (execAltLower && formatPersonDetails(f.name) === execAltLower))
    );

    if (executorMinorMatch) {
      issues.push({
        id: "chk-executor-conflict",
        severity: "critical",
        category: "executor",
        title: "Minor Cannot Be Appointed as Executor",
        explanation: `Under Section 223 of the Indian Succession Act, 1925, probate cannot be granted to a minor. "${executorMinorMatch.name}" is under 18 years of age.`,
        actionRecommendation: "Appoint an adult (18+ years) as Executor in Step 5 (Executor).",
        resolved: false,
      });
    } else if (execAltLower && execPrimLower === execAltLower) {
      issues.push({
        id: "chk-executor-conflict",
        severity: "critical",
        category: "executor",
        title: "Primary and Alternate Executor Are the Same Person",
        explanation: `You named "${state.executorPrimary.name}" as both Primary and Alternate Executor. The Alternate Executor must be a different person who can act if the Primary Executor is unable to serve.`,
        actionRecommendation: "Appoint a different adult as Alternate Executor in Step 5 (Executor).",
        resolved: false,
      });
    }

    if (!state.executorPrimary.address?.trim() || !state.executorPrimary.phone?.trim()) {
      issues.push({
        id: "chk-executor-details-incomplete",
        severity: "warning",
        category: "executor",
        title: "Primary Executor Address or Phone Missing",
        explanation: `You appointed "${state.executorPrimary.name}" as Primary Executor, but their residential address or mobile number is missing. Probate petitions require the Executor's full address and contact details.`,
        actionRecommendation: "Add the Primary Executor's address and phone number in Step 5 (Executor).",
        resolved: false,
      });
    }

    if (!state.executorAlternate.name?.trim()) {
      issues.push({
        id: "chk-alt-executor-missing",
        severity: "advisory",
        category: "executor",
        title: "No Backup / Alternate Executor Appointed",
        explanation: "If your primary executor predeceases you, is unable to act, or renounces executorship, your Will has no contingency administrator.",
        actionRecommendation: "We recommend appointing a secondary alternate executor in Step 5 (Executor) as a prudent legal safeguard.",
        resolved: false,
      });
    }
  }

  // 17. Revocation of Prior Wills Check
  if (t.hasPreviousWill && !t.revokePreviousWill) {
    issues.push({
      id: "chk-revocation-conflict",
      severity: "critical",
      category: "family",
      title: "Existing Will Revocation Conflict",
      explanation: "You noted having an earlier Will, but have not authorized its express revocation. Having multiple concurrent unrevoked Wills leads to litigation.",
      actionRecommendation: "Include an explicit revocation clause superseding any previous testamentary documents.",
      resolved: false,
    });
  }

  // 18. Positive Verification Passes
  if (
    t.fullName?.trim() &&
    !corporateNamePattern.test(t.fullName.trim()) &&
    t.dob &&
    testatorAge !== null &&
    testatorAge >= 18
  ) {
    issues.push({
      id: "chk-testator-competence",
      severity: "pass",
      category: "family",
      title: "Testamentary Capacity Verified",
      explanation: `Natural person identity ("${t.fullName.trim()}"), age of majority (${testatorAge} years), and sound disposing mind affirmed under Section 59 of the Indian Succession Act, 1925.`,
      actionRecommendation: "Completed",
      resolved: true,
    });
  }

  if (state.executorPrimary.name?.trim()) {
    issues.push({
      id: "chk-executor-valid",
      severity: "pass",
      category: "executor",
      title: "Executive Officer Designated",
      explanation: `Primary executor "${state.executorPrimary.name}" designated to carry out probate and asset transfer.`,
      actionRecommendation: "Completed",
      resolved: true,
    });
  }

  return issues;
}

export function generateWillClauses(rawState: WillDraftingState): GeneratedClause[] {
  const state = normalizeWillState(rawState, true);
  const clauses: GeneratedClause[] = [];
  const t = state.testator;

  const formatContactSummary = (p?: PersonContact): string => {
    if (!p) return "";
    const parts: string[] = [];
    if (p.dob) parts.push(`DOB: ${formatDDMMYYYY(p.dob)}`);
    if (p.address?.trim()) parts.push(`residing at ${p.address.trim()}`);
    if (p.phone?.trim()) parts.push(`Mobile: ${p.phone.trim()}`);
    if (p.email?.trim()) parts.push(`Email: ${p.email.trim()}`);
    return parts.length > 0 ? ` (${parts.join(", ")})` : "";
  };

  // Clause 1: Revocation of Previous Wills
  const revocationText = t.hasPreviousWill
    ? `I declare that I had previously executed a Will / testamentary disposition, and I hereby expressly revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, and instruments of a testamentary nature heretofore made by me at any time, and declare this instrument to be my sole, exclusive, and operative Last Will and Testament.`
    : `I hereby revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, and instruments of a testamentary nature (if any) heretofore made by me at any time, and declare this instrument to be my sole, exclusive, and operative Last Will and Testament.`;

  clauses.push({
    id: "cls-revocation",
    clauseNumber: 1,
    category: "Revocation",
    title: "Revocation of All Prior Wills and Codicils",
    standardText: revocationText,
    currentText: revocationText,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 2: Declaration of Immediate Family Members & Named Legatees (Step 3)
  if (state.familyMembers && state.familyMembers.length > 0) {
    const formatMemberLine = (f: FamilyMember, idx: number, isNonRelative: boolean) => {
      const relLabel = (
        f.relationship === "other" && f.customRelationship
          ? f.customRelationship
          : f.relationship || "Beneficiary"
      ).trim();
      const details: string[] = [];
      if (f.dob) details.push(`born ${formatDDMMYYYY(f.dob)}`);
      if (f.isMinor || calculateIsMinor(f.dob)) details.push("Minor");
      if (f.pan?.trim()) details.push(`PAN: ${f.pan.trim()}`);
      if (f.address?.trim()) {
        const cleanAddr =
          f.address.trim() === "Same as your address (Will creator)"
            ? "the Testator's residential address"
            : f.address.trim();
        details.push(`residing at ${cleanAddr}`);
      }
      if (f.phone?.trim()) details.push(`Mobile: ${f.phone.trim()}`);
      if (f.email?.trim()) details.push(`Email: ${f.email.trim()}`);
      if (f.notes?.trim() && !/^(parents|peers|children)$/i.test(f.notes.trim())) {
        details.push(`Note: ${f.notes.trim()}`);
      }

      const relPhrase = isNonRelative ? `(${relLabel})` : `my ${relLabel}`;
      return `  (${String.fromCharCode(97 + idx)}) ${(f.name || "").trim()}, ${relPhrase}${
        details.length > 0 ? ` - ${details.join(", ")}` : ""
      }`;
    };

    const naturalFamily = state.familyMembers.filter((f) => f.relationship !== "other");
    const otherLegatees = state.familyMembers.filter((f) => f.relationship === "other");

    const sections: string[] = [];
    if (naturalFamily.length > 0) {
      const familyListText = naturalFamily.map((f, i) => formatMemberLine(f, i, false)).join(";\n");
      sections.push(
        `I hereby declare that my immediate family consists of the following surviving family members:\n${familyListText}.`
      );
    }
    if (otherLegatees.length > 0) {
      const otherListText = otherLegatees.map((f, i) => formatMemberLine(f, i, true)).join(";\n");
      sections.push(
        `In addition to my family members above, I have also identified the following non-relative individual(s) / entity(ies) in connection with this Will:\n${otherListText}.`
      );
    }
    sections.push(
      `All testamentary provisions, bequests, and directions contained in this Will are made with full knowledge and conscious consideration of my family structure and obligations.`
    );

    const fullFamilyText = sections.join("\n\n");

    clauses.push({
      id: "cls-family",
      clauseNumber: clauses.length + 1,
      category: "Family",
      title:
        otherLegatees.length > 0
          ? "Declaration of Family Members & Named Legatees"
          : "Declaration of Immediate Family Members",
      standardText: fullFamilyText,
      currentText: fullFamilyText,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });
  }

  // Clause 3: Appointment of Executors (Step 6)
  const execPrimary = (state.executorPrimary.name || "").trim() || "[Primary Executor]";
  const execPrimaryRel = (state.executorPrimary.relationship || "").trim() || "trusted nominee";
  const execPrimaryDetails = formatContactSummary(state.executorPrimary);
  const execAlternateName = (state.executorAlternate.name || "").trim();
  const execAlternateRel = (state.executorAlternate.relationship || "").trim() || "Alternate";
  const execAlternateDetails = formatContactSummary(state.executorAlternate);
  const execAlternate = execAlternateName
    ? ` In the event that the said ${execPrimary} predeceases me, is unwilling, unable, or renounces the executorship, I nominate and appoint ${execAlternateName} (${execAlternateRel})${execAlternateDetails} to be the sole Alternate Executor of this my Will.`
    : "";

  const executorClauseText = `I hereby appoint my ${execPrimaryRel}, ${execPrimary}${execPrimaryDetails}, to be the sole Executor of this my Last Will and Testament.${execAlternate} I direct that my Executor shall have full authority to undertake all acts, deeds, filings, transmissions, nominations, banking formalities, legal proceedings, and regulatory compliances necessary for effective implementation of this Will.`;

  clauses.push({
    id: "cls-executor",
    clauseNumber: clauses.length + 1,
    category: "Administration",
    title: "Appointment of Executor(s)",
    standardText: executorClauseText,
    currentText: executorClauseText,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: execAlternateName ? "low" : "medium",
  });

  // Clause 3b: Guardian Designation (if minor present)
  const hasMinors = state.familyMembers.some((f) => f.isMinor || calculateIsMinor(f.dob));
  if (hasMinors && state.guardianPrimary.name?.trim()) {
    const gPrimary = state.guardianPrimary.name.trim();
    const gPrimaryRel = (state.guardianPrimary.relationship || "").trim() || "Guardian";
    const gPrimaryDetails = formatContactSummary(state.guardianPrimary);
    const gAltName = state.guardianAlternate.name?.trim();
    const gAltRel = (state.guardianAlternate.relationship || "").trim();
    const gAltDetails = formatContactSummary(state.guardianAlternate);
    const gAlt = gAltName
      ? ` Failing whom, I appoint ${gAltName}${gAltRel ? ` (${gAltRel})` : ""}${gAltDetails} as alternate Testamentary Guardian.`
      : "";
    const guardianText = `In the event that my spouse does not survive me or is unable to act, I appoint ${gPrimary} (${gPrimaryRel})${gPrimaryDetails} to be the legal Testamentary Guardian of the person and property of my minor child(ren).${gAlt}${state.guardianSpecialInstructions?.trim() ? ` Specific parental instructions regarding guardianship and upbringing: "${state.guardianSpecialInstructions.trim()}".` : ""}`;

    clauses.push({
      id: "cls-guardian",
      clauseNumber: clauses.length + 1,
      category: "Guardianship",
      title: "Testamentary Guardian for Minor Children",
      standardText: guardianText,
      currentText: guardianText,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "medium",
    });
  }

  // Clause 4: Payment of Debts, Liabilities & Testamentary Expenses (Step 11)
  clauses.push({
    id: "cls-debts",
    clauseNumber: clauses.length + 1,
    category: "Debts & Liabilities",
    title: "Payment of Just Debts, Liabilities & Testamentary Expenses",
    standardText: `I direct that all my just and lawful debts, liabilities, hospital and medical dues, income and property taxes, funeral costs, and the testamentary charges incurred in connection with the administration of my estate shall first be paid and discharged out of my estate by my Executor before any bequests or distributions are made.`,
    currentText: `I direct that all my just and lawful debts, liabilities, hospital and medical dues, income and property taxes, funeral costs, and the testamentary charges incurred in connection with the administration of my estate shall first be paid and discharged out of my estate by my Executor before any bequests or distributions are made.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 5: Survivorship Condition (Step 10)
  clauses.push({
    id: "cls-survivorship",
    clauseNumber: clauses.length + 1,
    category: "Survivorship",
    title: "Survivorship Condition (30-Day Rule)",
    standardText: `I direct that any beneficiary named in this Will who fails to survive me by a period of 30 (thirty) clear days shall be deemed to have predeceased me, and the bequest devised in favour of such deceased beneficiary shall lapse and fall into my residuary estate, unless an alternate beneficiary has been specifically designated herein.`,
    currentText: `I direct that any beneficiary named in this Will who fails to survive me by a period of 30 (thirty) clear days shall be deemed to have predeceased me, and the bequest devised in favour of such deceased beneficiary shall lapse and fall into my residuary estate, unless an alternate beneficiary has been specifically designated herein.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 6: Specific Asset Allocations (Steps 4 & 5)
  let assetClauseText = "";
  if (state.assets.length === 0) {
    assetClauseText = "I hold various movable and immovable self-acquired assets which shall be distributed in accordance with the general and residuary clauses herein.";
  } else {
    assetClauseText = state.assets
      .map((asset, index) => {
        const allocs = state.allocations.filter((a) => a.assetId === asset.id);
        const isJoint = asset.ownership === "joint";
        const ownPct = isJoint ? (asset.ownershipPercentage || 50) : 100;
        const coOwnerStr = isJoint && asset.jointOwnerName?.trim()
          ? ` (held jointly with ${asset.jointOwnerName.trim()}${asset.jointOwnerRelationship?.trim() ? `, ${asset.jointOwnerRelationship.trim()}` : ""})`
          : "";
        const allocString =
          allocs.length > 0
            ? allocs
                .map((a) =>
                  isJoint
                    ? `${a.percentage}% of my ${ownPct}% undivided share to ${(a.beneficiaryName || "").trim()}${a.specificBequestCondition?.trim() ? ` (${a.specificBequestCondition.trim()})` : ""}`
                    : `${a.percentage}% absolute share to ${(a.beneficiaryName || "").trim()}${a.specificBequestCondition?.trim() ? ` (${a.specificBequestCondition.trim()})` : ""}`
                )
                .join(", ")
            : "to devolve under the Residuary Estate Clause herein";
        const idOrPolicy = asset.identifier?.trim() || (asset.policyNumber?.trim() ? `Policy No. ${asset.policyNumber.trim()}` : "");
        const locOrInsurer = asset.addressOrInstitution?.trim() || asset.insuranceCompany?.trim() || "";
        const assetDesc = [asset.typeDetails?.trim(), idOrPolicy, locOrInsurer].filter(Boolean).join(", ");
        const loanPhrase = asset.hasLoan
          ? ` [Encumbrance / Active Loan: ${asset.loanDetails?.trim() || "Subject to existing loan/mortgage under Section 167, Indian Succession Act, 1925"}]`
          : "";
        const nomineePhrase = asset.nomineeName?.trim() ? ` [Recorded Nominee: ${asset.nomineeName.trim()}]` : "";
        const instrPhrase = asset.specialInstructions?.trim() ? ` [Special Direction: ${asset.specialInstructions.trim()}]` : "";
        const subjectPhrase = isJoint
          ? `Regarding my ${ownPct}% undivided joint share${coOwnerStr} in the asset known as "${(asset.name || "").trim()}"`
          : `Regarding my asset known as "${(asset.name || "").trim()}"`;
        return `(${index + 1}) ${subjectPhrase}${assetDesc ? ` (${assetDesc})` : ""}${loanPhrase}${nomineePhrase}${instrPhrase}: I devise and bequeath the same absolutely and forever as follows: ${allocString}.`;
      })
      .join("\n\n");
  }

  clauses.push({
    id: "cls-assets",
    clauseNumber: clauses.length + 1,
    category: "Specific Bequests",
    title: "Distribution of Specified Movable & Immovable Properties",
    standardText: assetClauseText,
    currentText: assetClauseText,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: state.assets.some((a) => a.ownership === "joint") ? "high" : "low",
  });

  // Clause 7: Residuary Estate (Step 5)
  const primaryRes1 = (state.residuaryBeneficiaryName || state.residuaryPrimary01Name || "").trim();
  const primaryRes2 = (state.residuaryPrimary02Name || "").trim();
  const residuaryPrimaryPhrase =
    primaryRes1 && primaryRes2 && primaryRes1.toLowerCase() !== primaryRes2.toLowerCase()
      ? `${primaryRes1} and ${primaryRes2} jointly and in equal shares`
      : primaryRes1 || (state.familyMembers[0] ? state.familyMembers[0].name.trim() : "my natural legal heirs");

  const backupRes1 = (state.residuaryAlternateName || state.residuaryBackup01Name || "").trim();
  const backupRes2 = (state.residuaryBackup02Name || "").trim();
  const residuaryBackupPhrase =
    backupRes1 && backupRes2 && backupRes1.toLowerCase() !== backupRes2.toLowerCase()
      ? `${backupRes1} and ${backupRes2} jointly and in equal shares`
      : backupRes1;

  const residuaryAlt = residuaryBackupPhrase
    ? ` If the primary residuary legatee(s) do not survive me, said residue shall devolve upon ${residuaryBackupPhrase} absolutely and forever.`
    : "";

  clauses.push({
    id: "cls-residuary",
    clauseNumber: clauses.length + 1,
    category: "Residuary Estate",
    title: "Devise of Rest, Residue and Remainder of Estate",
    standardText: `I give, devise, and bequeath all the rest, residue, and remainder of my estate, of every nature and kind whatsoever and wheresoever situate, whether movable or immovable, tangible or intangible, including any lapsed or failed bequests, debts owing to me, tax refunds, digital rights, and any property acquired by me after the execution of this Will, unto ${residuaryPrimaryPhrase} absolutely and forever.${residuaryAlt}`,
    currentText: `I give, devise, and bequeath all the rest, residue, and remainder of my estate, of every nature and kind whatsoever and wheresoever situate, whether movable or immovable, tangible or intangible, including any lapsed or failed bequests, debts owing to me, tax refunds, digital rights, and any property acquired by me after the execution of this Will, unto ${residuaryPrimaryPhrase} absolutely and forever.${residuaryAlt}`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: primaryRes1 ? "low" : "high",
  });

  // Clause 8: Special Wishes & Personal Directives (Consolidated from Steps 8 & 9)
  const sw = state.specialWishes;
  const faithName = ((): string => {
    const r = (t.religionPersonalLaw || "").trim().toLowerCase();
    if (r === "hindu") return "Hindu";
    if (r === "muslim") return "Muslim";
    if (r === "christian") return "Christian";
    if (r === "parsi") return "Parsi (Zoroastrian)";
    if (r === "special_marriage_act") return "secular";
    return "";
  })();
  const faithSuffix = faithName ? ` in accordance with the ${faithName} faith and customs` : "";
  const hasScheduledJewellery = state.assets.some((a) => a.category === "jewellery");

  const rawWishEntries: string[] = [];
  if (sw && !sw.hasNoSpecialWishes) {
    if (sw.jewelleryInstructions?.trim()) {
      const jewelleryPrefix = hasScheduledJewellery
        ? "Unscheduled Jewellery & Family Heirlooms (save and except for the specific jewellery items expressly itemized in the Schedule of Asset Distribution above, which shall devolve strictly as scheduled therein)"
        : "Jewellery & Heirlooms";
      rawWishEntries.push(`${jewelleryPrefix}: ${sw.jewelleryInstructions.trim()}`);
    }
    if (sw.personalBelongings?.trim()) {
      rawWishEntries.push(`Personal Keepsakes & Belongings: ${sw.personalBelongings.trim()}`);
    }
    if (sw.digitalAccounts?.trim()) {
      rawWishEntries.push(`Digital Accounts & Online Media: ${sw.digitalAccounts.trim()}`);
    }
    if (sw.petsCare?.trim()) {
      rawWishEntries.push(`Pet Care & Maintenance: ${sw.petsCare.trim()}`);
    }
    if (sw.charitableGifts?.trim()) {
      rawWishEntries.push(`Charitable Gifts & Donations: ${sw.charitableGifts.trim()}`);
    }
    if (sw.funeralCeremonyWishes?.trim()) {
      rawWishEntries.push(
        `Funeral & Last Rites Instructions: I direct that my funeral, obsequies, and last rites shall be performed in a dignified and modest manner${faithSuffix}, under the supervision and care of my family and Executor, and all reasonable expenses incurred thereon shall be defrayed out of my estate. In particular, I express the following specific preference: "${sw.funeralCeremonyWishes.trim()}".`
      );
    }
    if (sw.personalMessageToFamily?.trim()) {
      rawWishEntries.push(
        `Personal Message & Blessings to Family: It is my sincere wish and prayer that my family members live together in peace, affection, and mutual respect, and accept this distribution of my estate in the loving spirit in which it is made: "${sw.personalMessageToFamily.trim()}"`
      );
    }
  }
  if (state.emotionalReason?.trim()) {
    rawWishEntries.push(
      `Motivation & Testamentary Intent: I make this Will being motivated by the following sincere purpose: "${state.emotionalReason.trim()}". It is my hope that this Will reflects my deep care for my family and provides them clarity, security, and peace of mind.`
    );
  }

  if (rawWishEntries.length > 0) {
    const numberedWishes = rawWishEntries.map(
      (entry, i) => `(${String.fromCharCode(97 + i)}) ${entry}`
    );
    const specialText = `I hereby make the following special testamentary bequests, funeral directives, and personal wishes:\n\n${numberedWishes.join("\n\n")}`;

    clauses.push({
      id: "cls-special-wishes",
      clauseNumber: clauses.length + 1,
      category: "Special Directives",
      title: "Special Wishes, Keepsakes & Personal Directives",
      standardText: specialText,
      currentText: specialText,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });
  } else {
    clauses.push({
      id: "cls-funeral",
      clauseNumber: clauses.length + 1,
      category: "Funeral Directives",
      title: "Funeral & Last Rites Instructions",
      standardText: `I direct that my funeral, obsequies, and last rites shall be performed in a dignified and modest manner${faithSuffix}, under the supervision and care of my family and Executor, and all reasonable expenses incurred thereon shall be defrayed out of my estate.`,
      currentText: `I direct that my funeral, obsequies, and last rites shall be performed in a dignified and modest manner${faithSuffix}, under the supervision and care of my family and Executor, and all reasonable expenses incurred thereon shall be defrayed out of my estate.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });
  }

  // Clause 11: Severability and Statutory Construction (Step 12)
  clauses.push({
    id: "cls-severability",
    clauseNumber: clauses.length + 1,
    category: "Interpretation",
    title: "Severability and Construction",
    standardText: `If any clause, phrase, or provision of this Will is adjudged invalid, void, or unenforceable by any court of competent jurisdiction under the Indian Succession Act, 1925, or any other applicable statutory provision, such adjudication shall not affect the validity or enforceability of the remaining provisions of this Will, which shall remain operative and continue in full force and effect.`,
    currentText: `If any clause, phrase, or provision of this Will is adjudged invalid, void, or unenforceable by any court of competent jurisdiction under the Indian Succession Act, 1925, or any other applicable statutory provision, such adjudication shall not affect the validity or enforceability of the remaining provisions of this Will, which shall remain operative and continue in full force and effect.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 12: Exclusion of Prior Claims & Estranged Persons (Step 12)
  clauses.push({
    id: "cls-exclusion",
    clauseNumber: clauses.length + 1,
    category: "Exclusion",
    title: "Exclusion of Prior Claims and Non-Beneficiaries",
    standardText: `I have intentionally made no testamentary provision for any other relative, person, or distant claimant not expressly named as a beneficiary in this Will. I hereby declare that no person other than the beneficiaries named herein shall have any right, title, claim, or demand in or to any part of my estate.`,
    currentText: `I have intentionally made no testamentary provision for any other relative, person, or distant claimant not expressly named as a beneficiary in this Will. I hereby declare that no person other than the beneficiaries named herein shall have any right, title, claim, or demand in or to any part of my estate.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 13: Testimonium & Attestation (Step 14)
  const executionPlace = [t.city, t.state].filter(Boolean).join(", ") || "India";
  const executionYear = new Date().getFullYear();
  const attestationText = `IN WITNESS WHEREOF, I, the aforementioned Testator, have set my hand and signature to this my Last Will and Testament, on this _____ day of _______________, ${executionYear}, at ${executionPlace}, in the presence of the witnesses who have signed below in my presence.\n\nSigned by the Testator: _________________________________\n\nSIGNED, PUBLISHED, AND DECLARED by the above-named Testator as and for their Last Will and Testament, in the presence of us, who in their presence, at their request, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses:\n\n1. Witness 1:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________\n\n2. Witness 2:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________`;
  clauses.push({
    id: "cls-attestation",
    clauseNumber: clauses.length + 1,
    category: "Attestation",
    title: "Testimonium and Attestation Clause (Two Witnesses)",
    standardText: attestationText,
    currentText: attestationText,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  return clauses;
}

export const generateDefaultClauses = generateWillClauses;

export function createBlankState(userProfile?: {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}): WillDraftingState {
  const blank: WillDraftingState = JSON.parse(JSON.stringify(BLANK_STATE));
  if (userProfile?.name) {
    blank.testator.fullName = userProfile.name;
  }
  if (userProfile?.email) {
    blank.testator.email = userProfile.email;
  }
  if (userProfile?.phone) {
    blank.testator.phone = userProfile.phone;
  }
  blank.lastUpdated = new Date().toISOString();
  blank.clauses = generateWillClauses(blank);
  return blank;
}

export function loadStoredWillState(
  userEmailOrId?: string | null,
  userProfile?: { name?: string | null; email?: string | null; phone?: string | null }
): WillDraftingState {
  if (typeof window === "undefined") {
    return createBlankState(userProfile);
  }
  try {
    const key = getWillStorageKey(userEmailOrId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      const freshBlank = createBlankState(userProfile);
      localStorage.setItem(key, JSON.stringify(freshBlank));
      return freshBlank;
    }
    const parsed = JSON.parse(raw);

    // If existing stored data in this account is the pre-loaded demo persona (Dr. Rohit Srivastava or Rajesh Kumar Sharma),
    // and the user has logged in or is starting freshly, reset this account to 0 data (BLANK_STATE).
    const isOldDemoData =
      parsed.testator?.pan === "BAZPS9068N" ||
      parsed.testator?.fullName === "Dr. Rohit Srivastava" ||
      parsed.testator?.fullName === "Rajesh Kumar Sharma";

    if (isOldDemoData) {
      const freshBlank = createBlankState(userProfile);
      localStorage.setItem(key, JSON.stringify(freshBlank));
      return freshBlank;
    }

    // Ensure array integrity
    if (!Array.isArray(parsed.familyMembers)) parsed.familyMembers = [];
    if (!Array.isArray(parsed.assets)) parsed.assets = [];
    if (!Array.isArray(parsed.allocations)) parsed.allocations = [];
    if (!parsed.testator) parsed.testator = { ...BLANK_STATE.testator };

    return parsed;
  } catch (err) {
    console.error("Failed reading WillDrafting state from LocalStorage:", err);
    return createBlankState(userProfile);
  }
}

export function saveStoredWillState(state: WillDraftingState, userEmailOrId?: string | null): void {
  if (typeof window === "undefined") return;
  try {
    const key = getWillStorageKey(userEmailOrId);
    const existingRaw = localStorage.getItem(key);
    if (existingRaw) {
      try {
        const existingParsed = JSON.parse(existingRaw);
        if (existingParsed?.detailsVerified === true) {
          // Once verified via OTP, details are permanently locked and cannot be overwritten locally.
          return;
        }
      } catch {
        // ignore parse errors
      }
    }
    const cleanState = normalizeWillState(state, false);
    cleanState.lastUpdated = new Date().toISOString();
    // Auto-sync clauses if empty
    if (!cleanState.clauses || cleanState.clauses.length === 0) {
      cleanState.clauses = generateWillClauses(cleanState);
    }
    localStorage.setItem(key, JSON.stringify(cleanState));
    // Dispatch custom event for cross-component re-renders
    window.dispatchEvent(new Event("willdrafting_state_change"));
  } catch (err) {
    console.error("Failed saving WillDrafting state to LocalStorage:", err);
  }
}

export function resetToBlankState(
  userEmailOrId?: string | null,
  userProfile?: { name?: string | null; email?: string | null; phone?: string | null }
): WillDraftingState {
  const blank = createBlankState(userProfile);
  saveStoredWillState(blank, userEmailOrId);
  return blank;
}

export function restoreDrRohitBackup(userEmailOrId?: string | null): WillDraftingState {
  const copy: WillDraftingState = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
  copy.clauses = generateWillClauses(copy);
  saveStoredWillState(copy, userEmailOrId);
  return copy;
}

export function exportWillDataAsJson(state: WillDraftingState, filename = "willdrafting_backup.json"): void {
  if (typeof window === "undefined") return;
  try {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to export will data as JSON:", err);
  }
}

export function setScenario(
  scenarioKey: "scenario_1" | "scenario_2" | "blank",
  userEmailOrId?: string | null
): WillDraftingState {
  let newState: WillDraftingState;
  if (scenarioKey === "scenario_1") {
    newState = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
  } else if (scenarioKey === "scenario_2") {
    newState = JSON.parse(JSON.stringify(SCENARIO_2_EDGE_CASE_MINOR_CHILD));
  } else {
    newState = JSON.parse(JSON.stringify(BLANK_STATE));
  }
  newState.clauses = generateWillClauses(newState);
  saveStoredWillState(newState, userEmailOrId);
  return newState;
}


export function completeAnnualReview(): WillDraftingState {
  const state = loadStoredWillState();
  const todayStr = new Date().toISOString();
  state.lastAnnualReviewDate = todayStr;
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: todayStr,
    action: "Completed Annual Will Health Review (Certified no conflicting life changes)",
    actor: state.testator.fullName || "Testator",
  });
  saveStoredWillState(state);
  return state;
}

export function bookConsultation(booking: {
  lawyerId: string;
  lawyerName: string;
  lawyerFee: string;
  dateTime: string;
  topic: string;
  notes?: string;
}): WillDraftingState {
  const state = loadStoredWillState();
  const newBooking: ConsultationBooking = {
    id: `book-${Date.now()}`,
    ...booking,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  state.consultationBookings = state.consultationBookings || [];
  state.consultationBookings.unshift(newBooking);
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: new Date().toISOString(),
    action: `Booked 30-min strategy consultation with ${booking.lawyerName} (${booking.topic})`,
    actor: state.testator.fullName || "Testator",
  });
  saveStoredWillState(state);
  return state;
}

export function uploadVaultDocument(doc: {
  title: string;
  category: VaultDocument["category"];
  fileSize: string;
  version?: string;
}): WillDraftingState {
  const state = loadStoredWillState();
  const newDoc: VaultDocument = {
    id: `vault-doc-${Date.now()}`,
    title: doc.title,
    category: doc.category,
    version: doc.version || "v1.0",
    dateAdded: new Date().toISOString().split("T")[0],
    fileSize: doc.fileSize,
    status: "verified",
  };
  state.documents = state.documents || [];
  state.documents.unshift(newDoc);
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: new Date().toISOString(),
    action: `Uploaded supporting document: "${doc.title}" to secure Will Vault`,
    actor: state.testator.fullName || "Testator",
  });
  saveStoredWillState(state);
  return state;
}

export function deleteVaultDocument(id: string): WillDraftingState {
  const state = loadStoredWillState();
  const doc = state.documents?.find((d) => d.id === id);
  state.documents = (state.documents || []).filter((d) => d.id !== id);
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: new Date().toISOString(),
    action: `Removed vault document: "${doc?.title || id}"`,
    actor: state.testator.fullName || "Testator",
  });
  saveStoredWillState(state);
  return state;
}

export function updateWillVersion(reason: string): WillDraftingState {
  const state = loadStoredWillState();
  // Parse version like "v1.2" -> "v1.3"
  let currentNum = 1.0;
  if (state.version && state.version.startsWith("v")) {
    const parsed = parseFloat(state.version.replace("v", ""));
    if (!isNaN(parsed)) currentNum = parsed;
  }
  const nextVersion = `v${(currentNum + 0.1).toFixed(1)}`;
  const prevVersion = state.version || "v1.0";
  state.version = nextVersion;

  // Archive previous draft to vault
  state.documents = state.documents || [];
  state.documents.unshift({
    id: `vault-will-${Date.now()}`,
    title: `Last Will & Testament (Archived ${prevVersion})`,
    category: "will_draft",
    version: prevVersion,
    dateAdded: new Date().toISOString().split("T")[0],
    fileSize: "480 KB",
    status: "archived",
  });

  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: new Date().toISOString(),
    action: `Created new Will version ${nextVersion} triggered by: ${reason}`,
    actor: state.testator.fullName || "Testator",
  });
  saveStoredWillState(state);
  return state;
}

export function setWillStatus(status: WillDraftingState["willStatus"]): WillDraftingState {
  const state = loadStoredWillState();
  state.willStatus = status;
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    timestamp: new Date().toISOString(),
    action: `Updated Will status to: ${status.replace("_", " ").toUpperCase()}`,
    actor: "Legal System / Lawyer Workspace",
  });
  saveStoredWillState(state);
  return state;
}
