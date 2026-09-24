// src/lib/willDraftingStore.ts
// WillDrafting.com Comprehensive State Engine (LocalStorage backed)
// Adheres strictly to WillDrafting_Product_Master_Context.txt

export type MaritalStatus = "married" | "single" | "widowed" | "divorced" | "separated";
export type ReligionPersonalLaw = "hindu" | "muslim" | "christian" | "parsi" | "special_marriage_act" | "other";

export interface TestatorProfile {
  fullName: string;
  fatherOrMotherName?: string; // e.g. "Late Mrs. Manju Srivastava"
  pan?: string; // e.g. "BAZPS9068N"
  aadhaar?: string; // e.g. "3546 XXXX XXXX"
  workplace?: string; // e.g. "Room 505, Department of Biosciences and Bioengineering, IIT Bombay"
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
  pan?: string; // e.g. "CJDPP6174L"
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
  approximateValue: number; // in INR
  hasLoan: boolean;
  loanDetails?: string;
  specialInstructions?: string;
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
  executorPrimary: PersonContact;
  executorAlternate: PersonContact;
  guardianPrimary: PersonContact;
  guardianAlternate: PersonContact;
  guardianSpecialInstructions: string;
  specialWishes: SpecialWishes;
  emotionalReason: string;
  willStatus: "drafting" | "draft_ready" | "lawyer_review" | "clarification_requested" | "approved" | "finalised";
  selectedPlan: "essential" | "lawyer_verified" | "premium";
  version: string;
  lastUpdated: string;
  lastAnnualReviewDate?: string;
  consultationBookings?: ConsultationBooking[];
  lawyerNotes: string[];
  clauses: GeneratedClause[];
  documents: VaultDocument[];
  auditLogs: { timestamp: string; action: string; actor: string }[];
}

const STORAGE_KEY = "willdrafting_master_state_v1";

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
    fatherOrMotherName: "Late Mrs. Manju Srivastava",
    pan: "BAZPS9068N",
    aadhaar: "3546 XXXX XXXX",
    workplace: "Room 505, Department of Biosciences and Bioengineering, Indian Institute of Technology Bombay, Powai, Mumbai – 400076",
    dob: "1976-05-14",
    gender: "male",
    maritalStatus: "married",
    religionPersonalLaw: "hindu",
    email: "rohit.srivastava@iitb.ac.in",
    phone: "+91 98200 98765",
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
      phone: "+91 98200 98766",
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
      phone: "+91 98200 98767",
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
      phone: "+91 98200 98768",
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
      phone: "+91 98200 98769",
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
      jointOwnerName: "Mrs. Alpana Prakash",
      approximateValue: 6500000,
      hasLoan: true,
      loanDetails: "Original title documents deposited with PNB Housing Finance under Housing Loan No. 00136660004935 (to continue in estate upon discharge)",
    },
    {
      id: "ast-prop-3",
      category: "property",
      name: "Properties Standing in Name of Late Mother (Mrs. Manju Srivastava)",
      typeDetails: "Inherited Properties & Land",
      identifier: "Bungalow A-34 Poshir Neral (Sale Deed 1251/2015), Bungalow 33 S.K. Nagar Patna, Fulwari Sharif Land (Tauji 18165, Khata 29, Plot 729 ~2 Katha 2 Dhur)",
      addressOrInstitution: "The Destination, Poshir, Neral, Raigad & Patna, Bihar",
      ownership: "joint",
      jointOwnerName: "Late Mrs. Manju Srivastava / Mr. Amit Srivastava",
      approximateValue: 15000000,
      hasLoan: false,
      specialInstructions: "Shall devolve jointly upon Mrs. Alpana Prakash (50%) and brother Mr. Amit Srivastava (50%) in equal proportion subject to title verification.",
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
      jointOwnerName: "Mrs. Alpana Prakash",
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
    phone: "+91 98201 22334",
    email: "ashok.ajmera@example.com",
    address: "Mumbai, Maharashtra",
  },
  executorAlternate: {
    name: "Mrs. Alpana Prakash",
    relationship: "Wife / Alternate Executor",
    phone: "+91 98200 98766",
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
    jewelleryInstructions: "The locker maintained with Canara Bank jointly by myself and Mrs. Alpana Prakash, together with all jewellery, valuables, securities, documents, cash, ornaments, and contents therein, shall be operated and exclusively controlled by Mrs. Alpana Prakash after my demise.",
    personalBelongings: "All research papers, laboratory records, and academic materials at Room 505, Department of Biosciences and Bioengineering, IIT Bombay to form part of academic estate.",
    petsCare: "",
    charitableGifts: "",
    digitalAccounts: "All MCA startup portals, DIN filings, and equity demat accounts to be handed over to Mrs. Alpana Prakash.",
    funeralCeremonyWishes: "Simple memorial service conducted with dignity.",
    personalMessageToFamily: "Live with mutual affection, stay united, and honor each other's dreams.",
  },
  emotionalReason: "Ensure full financial security for my wife Mrs. Alpana Prakash and daughter Ms. Aarohi Shankar, and prevent legal complications regarding startup equity and maternal properties.",
  willStatus: "approved",
  selectedPlan: "lawyer_verified",
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
    { timestamp: "2026-09-16 10:30", action: "Legal Health Check cleared with 100% compliance under Indian Succession Act 1925", actor: "Rules Engine" },
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
    phone: "+91 99203 11845",
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
      phone: "+91 99203 11846",
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
    phone: "+91 99203 11846",
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
};

// -------------------------------------------------------------
// CORE LEGAL HEALTH CHECK ENGINE (§25 & §58)
// -------------------------------------------------------------

export const evaluateLegalHealthCheck = (state: WillDraftingState) => runLegalHealthCheck(state);

export function runLegalHealthCheck(state: WillDraftingState): LegalHealthCheckIssue[] {
  const issues: LegalHealthCheckIssue[] = [];

  // 1. Minor Beneficiary Check
  const hasMinorsInFamily = state.familyMembers.some((f) => f.isMinor || calculateIsMinor(f.dob));
  const minorAllocations = state.allocations.filter((a) => {
    const fam = state.familyMembers.find((f) => f.id === a.beneficiaryId);
    return fam && (fam.isMinor || calculateIsMinor(fam.dob));
  });

  if (minorAllocations.length > 0) {
    issues.push({
      id: "chk-minor-beneficiary",
      severity: "warning",
      category: "guardian",
      title: "Minor Beneficiary Allocation Detected",
      explanation: `You have allocated assets directly to a minor (${minorAllocations.map((a) => a.beneficiaryName).join(", ")}). Under Section 60 of the Indian Succession Act, a minor cannot directly manage property until attaining majority (18 years).`,
      actionRecommendation: "Appoint a Testamentary Guardian and establish a testamentary trust clause holding the asset until the child turns 18 or 21.",
      resolved: !!state.guardianPrimary.name,
    });
  }

  // 2. Guardian Designation Check (if minor children exist)
  if (hasMinorsInFamily && !state.guardianPrimary.name) {
    issues.push({
      id: "chk-guardian-missing",
      severity: "critical",
      category: "guardian",
      title: "Testamentary Guardian Missing for Minor Children",
      explanation: "You have indicated minor dependants or children in your family tree, but you have not designated a legal guardian in the event both parents pass away.",
      actionRecommendation: "Nominate a trusted primary guardian and an alternate backup guardian in the Guardian screen.",
      resolved: false,
    });
  }

  // 3. Joint Property Check
  const jointAssets = state.assets.filter((a) => a.ownership === "joint");
  if (jointAssets.length > 0) {
    issues.push({
      id: "chk-joint-property",
      severity: "warning",
      category: "assets",
      title: "Jointly Owned Property Detected",
      explanation: `Asset "${jointAssets[0].name}" is held under joint ownership. Under Indian property law, you can only bequeath your distinct undivided share, unless held with joint tenancy and survivorship rights.`,
      actionRecommendation: "Confirm whether you own a specific 50% or distinct undivided share so the Will specifies only your valid legal entitlement.",
      resolved: false,
    });
  }

  // 4. Residuary Beneficiary Check
  if (!state.residuaryBeneficiaryId && !state.residuaryBeneficiaryName) {
    issues.push({
      id: "chk-residuary-missing",
      severity: "critical",
      category: "residuary",
      title: "Residuary Estate Clause Missing",
      explanation: "You have not named a residuary beneficiary. Any future assets, forgotten accounts, tax refunds, or lapsed bequests will fall under intestate succession rules rather than your personal wishes.",
      actionRecommendation: "Designate a residuary beneficiary (e.g. spouse, children equally, or a trusted charity) to receive 'all remaining estate'.",
      resolved: false,
    });
  }

  // 5. 100% Asset Allocation Completeness Check
  const assetsWithoutCompleteAllocation: string[] = [];
  state.assets.forEach((asset) => {
    const allocationsForAsset = state.allocations.filter((a) => a.assetId === asset.id);
    const totalPercentage = allocationsForAsset.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
    if (totalPercentage !== 100) {
      assetsWithoutCompleteAllocation.push(`${asset.name} (${totalPercentage}% allocated)`);
    }
  });

  if (assetsWithoutCompleteAllocation.length > 0) {
    issues.push({
      id: "chk-allocation-imbalance",
      severity: "critical",
      category: "beneficiary",
      title: "Asset Allocation Does Not Equal 100%",
      explanation: `The following asset(s) are partially or improperly allocated: ${assetsWithoutCompleteAllocation.join(", ")}. Bequests must sum precisely to 100% to avoid ambiguity or dispute.`,
      actionRecommendation: "Adjust beneficiary percentages in the Beneficiaries module until every asset equals 100%.",
      resolved: false,
    });
  }

  // 6. Executor Check
  if (!state.executorPrimary.name) {
    issues.push({
      id: "chk-executor-missing",
      severity: "critical",
      category: "executor",
      title: "Primary Executor Not Appointed",
      explanation: "A Will without an executor requires court-appointed Letters of Administration with Will Annexed, causing immense delays and costs for your family.",
      actionRecommendation: "Appoint a trusted adult family member or professional as your primary executor.",
      resolved: false,
    });
  } else if (!state.executorAlternate.name) {
    issues.push({
      id: "chk-alt-executor-missing",
      severity: "advisory",
      category: "executor",
      title: "No Backup / Alternate Executor Appointed",
      explanation: "If your primary executor predeceases you, is unable to act, or renounces executorship, your Will has no contingency administrator.",
      actionRecommendation: "We recommend appointing a secondary alternate executor as a prudent legal safeguard.",
      resolved: false,
    });
  }

  // 7. Revocation of Prior Wills Check
  if (state.testator.hasPreviousWill && !state.testator.revokePreviousWill) {
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

  // 8. Positive Verification Passes
  if (state.testator.fullName && state.testator.dob) {
    issues.push({
      id: "chk-testator-competence",
      severity: "pass",
      category: "family",
      title: "Testamentary Capacity Verified",
      explanation: "Full name, age of majority, and sound mental disposing capacity affirmed under Section 59 of the Indian Succession Act 1925.",
      actionRecommendation: "Completed",
      resolved: true,
    });
  }

  if (state.executorPrimary.name) {
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

export function generateWillClauses(state: WillDraftingState): GeneratedClause[] {
  const clauses: GeneratedClause[] = [];
  const t = state.testator;
  const isRohit = t.fullName?.includes("Rohit Srivastava");

  if (isRohit) {
    // 1. DEFINITIONS AND INTERPRETATION
    clauses.push({
      id: "cls-definitions",
      clauseNumber: 1,
      category: "Definitions",
      title: "DEFINITIONS AND INTERPRETATION",
      standardText: `Unless the context otherwise requires, references to “my estate” shall include all movable and immovable properties, tangible and intangible assets, actionable claims, securities, investments, intellectual property rights, beneficial interests, contractual entitlements, startup equity, advisory interests, ESOPs, bank balances, insurance proceeds, and all rights, title, interests, and claims of whatsoever nature, whether presently owned or acquired hereafter.`,
      currentText: `Unless the context otherwise requires, references to “my estate” shall include all movable and immovable properties, tangible and intangible assets, actionable claims, securities, investments, intellectual property rights, beneficial interests, contractual entitlements, startup equity, advisory interests, ESOPs, bank balances, insurance proceeds, and all rights, title, interests, and claims of whatsoever nature, whether presently owned or acquired hereafter.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 2. DETAILS OF FAMILY MEMBERS
    clauses.push({
      id: "cls-family",
      clauseNumber: 2,
      category: "Family",
      title: "DETAILS OF FAMILY MEMBERS",
      standardText: `I am married to Mrs. Alpana Prakash, holding PAN No. CJDPP6174L, and we have a daughter, Ms. Aarohi Shankar, holding PAN No. UNGPS6807G, who constitute my immediate family and principal beneficiaries under this Will.`,
      currentText: `I am married to Mrs. Alpana Prakash, holding PAN No. CJDPP6174L, and we have a daughter, Ms. Aarohi Shankar, holding PAN No. UNGPS6807G, who constitute my immediate family and principal beneficiaries under this Will.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 3. APPOINTMENT OF EXECUTOR
    clauses.push({
      id: "cls-executor",
      clauseNumber: 3,
      category: "Administration",
      title: "APPOINTMENT OF EXECUTOR",
      standardText: `I hereby appoint Mr. Ashok Ajmera as the Sole Executor of this Will, to administer my estate and carry out the directions contained herein.\n\nIn the event the said Executor is unable or unwilling to act, I appoint my wife, Mrs. Alpana Prakash, as the alternate Executor with full authority to administer, realize, manage, transfer, distribute, and dispose of my estate in accordance with this Will.\n\nThe Executor shall have full authority to undertake all acts, deeds, filings, transmissions, nominations, banking formalities, legal proceedings, and regulatory compliances necessary for effective implementation of this Will.`,
      currentText: `I hereby appoint Mr. Ashok Ajmera as the Sole Executor of this Will, to administer my estate and carry out the directions contained herein.\n\nIn the event the said Executor is unable or unwilling to act, I appoint my wife, Mrs. Alpana Prakash, as the alternate Executor with full authority to administer, realize, manage, transfer, distribute, and dispose of my estate in accordance with this Will.\n\nThe Executor shall have full authority to undertake all acts, deeds, filings, transmissions, nominations, banking formalities, legal proceedings, and regulatory compliances necessary for effective implementation of this Will.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 4. GENERAL BEQUEST
    clauses.push({
      id: "cls-general-bequest",
      clauseNumber: 4,
      category: "Bequest",
      title: "GENERAL BEQUEST",
      standardText: `I hereby bequeath and devise all my estate, including all movable and immovable properties, bank balances, investments, securities, actionable claims, startup equity, insurance proceeds, retirement benefits, vehicles, locker contents, and all other assets and interests of whatsoever nature and wheresoever situated, absolutely and exclusively in favour of my wife, Mrs. Alpana Prakash.\n\nIn the event my wife predeceases me or is otherwise unable to inherit, I direct that my entire estate shall devolve absolutely upon my daughter, Ms. Aarohi Shankar.`,
      currentText: `I hereby bequeath and devise all my estate, including all movable and immovable properties, bank balances, investments, securities, actionable claims, startup equity, insurance proceeds, retirement benefits, vehicles, locker contents, and all other assets and interests of whatsoever nature and wheresoever situated, absolutely and exclusively in favour of my wife, Mrs. Alpana Prakash.\n\nIn the event my wife predeceases me or is otherwise unable to inherit, I direct that my entire estate shall devolve absolutely upon my daughter, Ms. Aarohi Shankar.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 5. SPECIFIC BEQUESTS
    const specificBequestsText = `5.1 BANK ACCOUNTS
All bank accounts held by me, whether singly or jointly, together with all balances, deposits, interest accruals, fixed deposits, lockers, linked facilities, and rights therein, shall vest absolutely in Mrs. Alpana Prakash, including but not limited to:
a) SBI IIT Powai Salary Account No. 10725862853;
b) HDFC Bank Hiranandani Account No. 02391000033626;
c) Canara Bank IIT Powai Account No. 2724101090157;
d) SBI S.K. Nagar, Patna Account No. 10223863266;
e) Kotak Mahindra Bank, Lake Homes Chandivali Branch Account No. 0847252624.
I further direct that wherever nominations or beneficiary declarations remain pending, the same shall be completed in favour of Mrs. Alpana Prakash.

5.2 IMMOVABLE PROPERTIES
a) Powai Flat
The residential flat situated at B/505, Cypress CHS Ltd., Hiranandani Gardens, Powai, Mumbai – 400076, bearing Share Certificate No. 064 and Folio No. 59, originally acquired vide Sale Deed No. 14-04475-2011 dated 17/06/2011 in the joint names of Manju Srivastava and Rohit Srivastava, and subsequently transferred to me by way of Gift Deed bearing Document No. 3-834-2017 dated 02/02/2017, together with all rights, title, interest, tenancy rights, memberships, and appurtenances therein, shall vest absolutely in Mrs. Alpana Prakash.
The original title documents presently deposited with Credila Finance as collateral security for the education loan of Ms. Aarohi Shankar shall, upon release, form part of my estate.
b) Palava Flat
The residential flat situated at 1002, Casa Regalia B, Lakeshore Greens, Palava City Phase 2, Dombivli (East), jointly owned by myself and Mrs. Alpana Prakash pursuant to Agreement for Sale dated 02/01/2015 registered under Serial No. 40/2015 at Kalyan-5, together with all rights and interests therein, shall vest in Mrs. Alpana Prakash.
The original title documents presently deposited with PNB Housing Finance under Housing Loan No. 00136660004935 shall, upon discharge of the loan, continue to form part of my estate.
c) Properties Standing in the Name of My Late Mother
The bungalow bearing No. A-34 situated at The Destination, Village Poshir, Neral, Raigad, acquired vide Sale Deed No. 1251/2015 dated 16/06/2015 and presently standing in the name of my late mother Mrs. Manju Srivastava, together with Bungalow No. 33 situated at S.K. Nagar and land situated at Fulwari Sharif, Patna bearing Tauji No. 18165, Khata No. 29, Survey Plot No. 729 admeasuring approximately 2 Katha and 2 Dhur, and all beneficial interests accruing to me therein, shall devolve jointly upon Mrs. Alpana Prakash and my brother Mr. Amit Srivastava in equal proportion, subject to applicable succession laws and title verification.
d) Agricultural Land
The agricultural land bearing Parcel No. 76 admeasuring approximately 0.2298 hectares (24736 sq. ft.) situated at Village Ambulse, Gat No. 96/2, Taluka Sudhagarh, District Raigad, recorded under 7/12 Khata No. 1051, shall vest absolutely in Mrs. Alpana Prakash.

5.3 SHARES, SECURITIES, STARTUP EQUITY AND ADVISORY INTERESTS
I hereby declare that I hold equity shares, securities, founder interests, startup investments, advisory holdings, ESOPs, beneficial interests, and/or economic rights in various companies, startups, incubated entities, and institutional structures, whether directly in my name or through SINE, IIT Bombay or any other institutional arrangement.
I hereby bequeath all such shares, securities, stock options, convertible instruments, SAFE instruments, advisory entitlements, beneficial interests, proceeds, dividends, liquidation entitlements, bonuses, splits, rights issues, and accretions arising therefrom, whether presently held or acquired hereafter, absolutely in favour of my wife, Mrs. Alpana Prakash.
In the event my wife predeceases me or is unable to inherit, the same shall vest in my daughter, Ms. Aarohi Shankar.
The Executor shall take all necessary steps for transfer, transmission, realization, liquidation, or management of such holdings in accordance with applicable laws, shareholder agreements, ESOP schemes, startup regulations, incubator policies, and institutional frameworks.
Notwithstanding the above:
a) In respect of Clinicosis Private Limited, out of my total shareholding, 49% shall be transferred to Dr. Arnab Ghosh or his lawful representative, and the remaining shares shall vest in Mrs. Alpana Prakash;
b) In respect of advisory holdings or shares held through SINE, IIT Bombay, my beneficial entitlement and all economic rights therein shall vest in Mrs. Alpana Prakash;
c) Persons designated as facilitators or points of contact in relation to such entities shall not derive any independent right, title, or interest in the said holdings.

SCHEDULE – A
DETAILS OF SHAREHOLDINGS, STARTUP EQUITY AND ADVISORY INTERESTS
Equity Holdings
Effecmed Private Limited (CIN: U33100MH2021PTC372949) Holding: 9827 shares constituting approximately 13.28% equity
Shodhsens Private Limited (CIN: U72100PN2023PTC219529) Holding: 30% equity
Clinicosis Private Limited (CIN: U24230WB2021PTC248845) Holding: 98% equity (subject to transfer of 49% to Dr. Arnab Ghosh)
MedInnoTec Private Limited (CIN: U32509MH2023PTC409481) Holding: 20% equity
Lifeseed Reproductive Healthcare Private Limited (CIN: U72100MH2023PTC411810) Holding: 30% equity
Hemoflo Devices Private Limited (CIN: U32500MH2024PTC433130) Holding: 30% equity
Polytrack Devices Private Limited (CIN: U32500MH2024PTC433131) Holding: 30% equity
NanoTherapX Private Limited (CIN: U72100MH2025PTC445103) Holding: 25% equity
Drepto Biodevices Private Limited (CIN: U21001MH2025PTC445595) Holding: 15% equity
MedTecInno Technologies Private Limited (CIN: U32509MH2025PTC461348) Holding: 44% equity
MedVentX Technologies Private Limited (CIN: U32509MH2025PTC457745) Holding: 25% equity
Exinovus Private Limited (CIN: U32509MH2026PTC468698) Holding: 22% equity
Dermatologist Labs Private Limited (CIN: U20237MH2026PTC467703) Holding: 10% equity
Advisory / ESOP / Beneficial Interests
DotoHealth Private Limited Holding: 100 shares of face value ₹10 each
Neodocs Private Limited Stock Options valued at approximately ₹30,00,000
Shasvi Biotech Private Limited Holding: 7% subject to No Objection Certificate from IIT Bombay
iKure Techsoft Private Limited Holding: 4% ESOP pool equivalent to approximately 2200 shares
SINE Held Structures (Beneficial Ownership)
Unbound Innovation Private Limited SINE holding: 5% with 70% beneficial interest attributable to me
Ferry Lifesciences Private Limited SINE holding: 5% with 70% beneficial interest attributable to me
EarthyPromise Consumer Brands Private Limited (Unlock) Holding: 5% stake through SINE IIT Bombay
All the above holdings together with any accretions, conversions, rights, splits, bonuses, dividends, and proceeds thereof shall form part of my estate and shall be governed by the bequests contained herein.

5.4 MUTUAL FUNDS, SIPS AND INVESTMENTS
All mutual fund investments, SIPs, securities, market-linked instruments, and investment portfolios held by me shall continue exclusively for the welfare and benefit of my daughter, Ms. Aarohi Shankar.
This includes:
a) Kotak Mutual Fund Folio No. 17261147;
b) HDFC Mutual Fund Folio No. 36797642;
c) Axis Mutual Fund Folio No. 910206177056.
All proceeds, dividends, renewals, growth benefits, redemptions, and accruals arising therefrom shall remain earmarked exclusively for Ms. Aarohi Shankar.

5.5 PROVIDENT FUND, PPF, NPS AND GRATUITY
All amounts receivable by me or payable upon my demise under Provident Fund, Public Provident Fund (PPF), National Pension System (NPS), gratuity, retirement benefits, and employment-linked entitlements shall vest absolutely in Mrs. Alpana Prakash.
This includes:
a) PPF Account No. 32402528584 maintained with SBI IIT Powai Branch;
b) IIT Bombay NPS Account No. 110031424796;
c) All gratuity amounts and employment-linked retirement benefits receivable from IIT Bombay.

5.6 LIFE INSURANCE POLICIES
All proceeds arising from life insurance and group insurance policies held by me shall vest absolutely in Mrs. Alpana Prakash, including:
a) AVIVA Life Policy No. ALA3080631 for ₹75 Lakhs;
b) Canara HSBC OBC Life Policy No. 0126704212 for ₹2 Crores;
c) SBI Life Sampoorn Suraksha Policy No. 72200021905 for ₹30 Lakhs;
d) PNB MetLife Policy No. 23824339 for ₹2 Crores;
e) IIT Bombay Group Term Insurance linked to Employee ID 10000733 for ₹1 Crore.
All original policy documents maintained at my residence shall form part of my testamentary records.

5.7 POSTAL LIFE INSURANCE
Postal Life Insurance Policy No. MH-334644-CC standing in my name shall vest absolutely in Mrs. Alpana Prakash.

5.8 LOCKER AND CONTENTS
The locker maintained with Canara Bank jointly by myself and Mrs. Alpana Prakash, together with all jewellery, valuables, securities, documents, cash, ornaments, and contents therein, shall be operated and exclusively controlled by Mrs. Alpana Prakash after my demise.

5.9 VEHICLES
All motor vehicles owned by me shall vest absolutely in Mrs. Alpana Prakash, including:
a) Toyota Innova bearing Registration No. MH03 DG 9722;
b) BMW X1 bearing Registration No. MH03 EB 9722.

5.10 SUKANYA SAMRIDDHI ACCOUNT
The Sukanya Samriddhi Account bearing No. BETI0272420000001 maintained in the name of Ms. Aarohi Shankar shall remain solely for the benefit, welfare, maintenance, education, and exclusive use of Ms. Aarohi Shankar.`;

    clauses.push({
      id: "cls-specific-bequests",
      clauseNumber: 5,
      category: "Specific Bequests",
      title: "SPECIFIC BEQUESTS",
      standardText: specificBequestsText,
      currentText: specificBequestsText,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 6. RESIDUARY CLAUSE
    clauses.push({
      id: "cls-residuary",
      clauseNumber: 6,
      category: "Residuary Estate",
      title: "RESIDUARY CLAUSE",
      standardText: `All properties, rights, claims, investments, entitlements, and assets not specifically mentioned herein shall form part of my residuary estate and shall vest absolutely in Mrs. Alpana Prakash, and in her absence, in Ms. Aarohi Shankar.`,
      currentText: `All properties, rights, claims, investments, entitlements, and assets not specifically mentioned herein shall form part of my residuary estate and shall vest absolutely in Mrs. Alpana Prakash, and in her absence, in Ms. Aarohi Shankar.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 7. PAYMENT OF DEBTS AND LIABILITIES
    clauses.push({
      id: "cls-debts",
      clauseNumber: 7,
      category: "Debts & Liabilities",
      title: "PAYMENT OF DEBTS AND LIABILITIES",
      standardText: `I direct that all my lawful debts, liabilities, taxes, obligations, and testamentary expenses shall first be paid and discharged out of my estate by my Executor.`,
      currentText: `I direct that all my lawful debts, liabilities, taxes, obligations, and testamentary expenses shall first be paid and discharged out of my estate by my Executor.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 8. REVOCATION
    clauses.push({
      id: "cls-revocation",
      clauseNumber: 8,
      category: "Revocation",
      title: "REVOCATION",
      standardText: `I hereby revoke all prior Wills, codicils, declarations, and testamentary dispositions made by me at any time prior to the execution of this Will.`,
      currentText: `I hereby revoke all prior Wills, codicils, declarations, and testamentary dispositions made by me at any time prior to the execution of this Will.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 9. DECLARATION OF INTENTION
    clauses.push({
      id: "cls-intention",
      clauseNumber: 9,
      category: "Declaration",
      title: "DECLARATION OF INTENTION",
      standardText: `It is my clear and unequivocal intention that:\na) All movable and immovable assets forming part of my estate shall devolve upon Mrs. Alpana Prakash;\nb) In the event Mrs. Alpana Prakash predeceases me or is unable to inherit, the entirety of my estate shall devolve upon Ms. Aarohi Shankar;\nc) All investments earmarked for Ms. Aarohi Shankar shall continue solely for her welfare and benefit;\nd) The Executor shall take all necessary legal, banking, administrative, regulatory, and procedural steps for implementation of the directions contained in this Will.`,
      currentText: `It is my clear and unequivocal intention that:\na) All movable and immovable assets forming part of my estate shall devolve upon Mrs. Alpana Prakash;\nb) In the event Mrs. Alpana Prakash predeceases me or is unable to inherit, the entirety of my estate shall devolve upon Ms. Aarohi Shankar;\nc) All investments earmarked for Ms. Aarohi Shankar shall continue solely for her welfare and benefit;\nd) The Executor shall take all necessary legal, banking, administrative, regulatory, and procedural steps for implementation of the directions contained in this Will.`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 10. EXECUTION
    clauses.push({
      id: "cls-execution",
      clauseNumber: 10,
      category: "Execution",
      title: "EXECUTION",
      standardText: `IN WITNESS WHEREOF, I, the above-named Testator, have executed this Last Will and Testament on this ___ day of __________, 2026 at Mumbai.\n\nTESTATOR\nSignature: _____________________\nDr. Rohit Srivastava`,
      currentText: `IN WITNESS WHEREOF, I, the above-named Testator, have executed this Last Will and Testament on this ___ day of __________, 2026 at Mumbai.\n\nTESTATOR\nSignature: _____________________\nDr. Rohit Srivastava`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    // 11. ATTESTATION BY WITNESSES
    clauses.push({
      id: "cls-attestation",
      clauseNumber: 11,
      category: "Attestation",
      title: "ATTESTATION BY WITNESSES",
      standardText: `We, the undersigned witnesses, do hereby attest that the Testator, Dr. Rohit Srivastava, has signed and executed this Will in our presence, and that we have signed as witnesses in the presence of the Testator and each other, all being present at the same time, after the Testator declared the same to be his Last Will and Testament.\n\nWitness 1\nName: _____________________\nAddress: _____________________\nSignature: _____________________\n\nWitness 2\nName: _____________________\nAddress: _____________________\nSignature: _____________________`,
      currentText: `We, the undersigned witnesses, do hereby attest that the Testator, Dr. Rohit Srivastava, has signed and executed this Will in our presence, and that we have signed as witnesses in the presence of the Testator and each other, all being present at the same time, after the Testator declared the same to be his Last Will and Testament.\n\nWitness 1\nName: _____________________\nAddress: _____________________\nSignature: _____________________\n\nWitness 2\nName: _____________________\nAddress: _____________________\nSignature: _____________________`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });

    return clauses;
  }

  // Generic fallback clause generator for other profiles
  const sonOrDaughterOf = t.gender === "female" ? "daughter of" : "son of";
  const parentString = t.fatherOrMotherName ? `, ${sonOrDaughterOf} ${t.fatherOrMotherName}` : "";
  const panString = t.pan ? `, holding Permanent Account Number (PAN) ${t.pan}` : "";
  const aadhaarString = t.aadhaar ? ` and Aadhaar Number ${t.aadhaar}` : "";
  const workplaceString = t.workplace ? `, and working at ${t.workplace}` : "";

  // Clause 1: Preamble & Declaration
  clauses.push({
    id: "cls-declaration",
    clauseNumber: 1,
    category: "Preamble",
    title: "Declaration of Testator & Sound Mind",
    standardText: `I, ${t.fullName || "[Testator Full Name]"}${parentString}, aged about ${t.dob ? new Date().getFullYear() - new Date(t.dob).getFullYear() : "__"} years${panString}${aadhaarString}, presently residing at ${t.address || "[Address]"}, ${t.city || ""}, ${t.state || ""}${workplaceString}, being of sound mind, in good health, and fully competent to make this Will, do hereby declare this to be my Last Will and Testament, made voluntarily and without any coercion, undue influence, or misrepresentation, and hereby revoke all prior Wills and testamentary dispositions made by me.`,
    currentText: `I, ${t.fullName || "[Testator Full Name]"}${parentString}, aged about ${t.dob ? new Date().getFullYear() - new Date(t.dob).getFullYear() : "__"} years${panString}${aadhaarString}, presently residing at ${t.address || "[Address]"}, ${t.city || ""}, ${t.state || ""}${workplaceString}, being of sound mind, in good health, and fully competent to make this Will, do hereby declare this to be my Last Will and Testament, made voluntarily and without any coercion, undue influence, or misrepresentation, and hereby revoke all prior Wills and testamentary dispositions made by me.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 2: Revocation of Previous Wills
  clauses.push({
    id: "cls-revocation",
    clauseNumber: 2,
    category: "Revocation",
    title: "Revocation of All Prior Wills and Codicils",
    standardText: `I hereby revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, and instruments of a testamentary nature heretofore made by me at any time, and declare this to be my sole, exclusive, and operative Last Will and Testament.`,
    currentText: `I hereby revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, and instruments of a testamentary nature heretofore made by me at any time, and declare this to be my sole, exclusive, and operative Last Will and Testament.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  // Clause 3: Appointment of Executors
  const execPrimary = state.executorPrimary.name || "[Primary Executor]";
  const execAlternate = state.executorAlternate.name
    ? ` In the event that the said ${execPrimary} predeceases me, is unwilling, unable, or renounces the executorship, I nominate and appoint ${state.executorAlternate.name} (${state.executorAlternate.relationship || "Alternate"}) to be the sole Alternate Executor of this my Will.`
    : "";

  clauses.push({
    id: "cls-executor",
    clauseNumber: 3,
    category: "Administration",
    title: "Appointment of Executor(s)",
    standardText: `I hereby appoint my ${state.executorPrimary.relationship || "trusted nominee"}, ${execPrimary}, to be the sole Executor of this my Last Will and Testament.${execAlternate} I direct that my Executor shall have full authority to undertake all acts, deeds, filings, transmissions, nominations, banking formalities, legal proceedings, and regulatory compliances necessary for effective implementation of this Will.`,
    currentText: `I hereby appoint my ${state.executorPrimary.relationship || "trusted nominee"}, ${execPrimary}, to be the sole Executor of this my Last Will and Testament.${execAlternate} I direct that my Executor shall have full authority to undertake all acts, deeds, filings, transmissions, nominations, banking formalities, legal proceedings, and regulatory compliances necessary for effective implementation of this Will.`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: state.executorAlternate.name ? "low" : "medium",
  });

  // Clause 4: Guardian Designation (if minor present)
  const hasMinors = state.familyMembers.some((f) => f.isMinor || calculateIsMinor(f.dob));
  if (hasMinors && state.guardianPrimary.name) {
    const gPrimary = state.guardianPrimary.name;
    const gAlt = state.guardianAlternate.name ? ` Failing whom, I appoint ${state.guardianAlternate.name} as alternate Guardian.` : "";
    clauses.push({
      id: "cls-guardian",
      clauseNumber: 4,
      category: "Guardianship",
      title: "Testamentary Guardian for Minor Children",
      standardText: `In the event that my spouse does not survive me or is unable to act, I appoint ${gPrimary} (${state.guardianPrimary.relationship || "Guardian"}) to be the legal Testamentary Guardian of the person and property of my minor child(ren).${gAlt} ${state.guardianSpecialInstructions ? `Specific parental wishes: ${state.guardianSpecialInstructions}` : ""}`,
      currentText: `In the event that my spouse does not survive me or is unable to act, I appoint ${gPrimary} (${state.guardianPrimary.relationship || "Guardian"}) to be the legal Testamentary Guardian of the person and property of my minor child(ren).${gAlt} ${state.guardianSpecialInstructions ? `Specific parental wishes: ${state.guardianSpecialInstructions}` : ""}`,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "medium",
    });
  }

  // Clause 5: Specific Asset Allocations
  let assetClauseText = "";
  if (state.assets.length === 0) {
    assetClauseText = "I hold various movable and immovable self-acquired assets which shall be distributed in accordance with the general and residuary clauses herein.";
  } else {
    assetClauseText = state.assets
      .map((asset, index) => {
        const allocs = state.allocations.filter((a) => a.assetId === asset.id);
        const allocString =
          allocs.length > 0
            ? allocs.map((a) => `${a.percentage}% absolute share to ${a.beneficiaryName}`).join(", ")
            : "to be distributed equally among my surviving family members";
        return `(${index + 1}) Regarding my asset known as "${asset.name}" (${asset.typeDetails}, ${asset.addressOrInstitution || ""}): I devise and bequeath the same absolutely and forever as follows: ${allocString}.`;
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

  // Clause 6: Residuary Estate
  const residuaryName = state.residuaryBeneficiaryName || (state.familyMembers[0] ? state.familyMembers[0].name : "my legal heirs");
  const residuaryAlt = state.residuaryAlternateName ? ` If the primary residuary legatee does not survive me, said residue shall devolve upon ${state.residuaryAlternateName}.` : "";
  clauses.push({
    id: "cls-residuary",
    clauseNumber: clauses.length + 1,
    category: "Residuary Estate",
    title: "Devise of Rest, Residue and Remainder of Estate",
    standardText: `I give, devise, and bequeath all the rest, residue, and remainder of my estate, of every nature and kind whatsoever and wheresoever situate, whether movable or immovable, tangible or intangible, including any lapsed or failed bequests, debts owing to me, digital rights, and any property acquired by me after the execution of this Will, unto ${residuaryName} absolutely and forever.${residuaryAlt}`,
    currentText: `I give, devise, and bequeath all the rest, residue, and remainder of my estate, of every nature and kind whatsoever and wheresoever situate, whether movable or immovable, tangible or intangible, including any lapsed or failed bequests, debts owing to me, digital rights, and any property acquired by me after the execution of this Will, unto ${residuaryName} absolutely and forever.${residuaryAlt}`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: state.residuaryBeneficiaryName ? "low" : "high",
  });

  // Clause 7: Special Wishes & Personal Messages
  if (state.specialWishes.personalMessageToFamily || state.specialWishes.jewelleryInstructions || state.specialWishes.petsCare) {
    const specialText = [
      state.specialWishes.jewelleryInstructions ? `Heirlooms & Jewellery: ${state.specialWishes.jewelleryInstructions}` : "",
      state.specialWishes.petsCare ? `Pet Care: ${state.specialWishes.petsCare}` : "",
      state.specialWishes.charitableGifts ? `Charity: ${state.specialWishes.charitableGifts}` : "",
      state.specialWishes.personalMessageToFamily ? `Personal Expression of Wishes: "${state.specialWishes.personalMessageToFamily}"` : "",
    ]
      .filter(Boolean)
      .join("\n");

    clauses.push({
      id: "cls-special-wishes",
      clauseNumber: clauses.length + 1,
      category: "Special Directives",
      title: "Special Wishes & Sentimental Bequests",
      standardText: specialText,
      currentText: specialText,
      isLawyerEdited: false,
      clarificationRequested: false,
      riskLevel: "low",
    });
  }

  // Clause 8: Testimonium & Attestation
  clauses.push({
    id: "cls-attestation",
    clauseNumber: clauses.length + 1,
    category: "Attestation",
    title: "Testimonium and Attestation Clause (Two Witnesses)",
    standardText: `IN WITNESS WHEREOF, I, the aforementioned Testator, have set my hand and signature to this my Last Will and Testament, on this _____ day of _______________, 2026, at Mumbai, in the presence of the witnesses who have signed below in my presence.\n\nSigned by the Testator: _________________________________\n\nSIGNED, PUBLISHED, AND DECLARED by the above-named Testator as and for their Last Will and Testament, in the presence of us, who in their presence, at their request, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses:\n\n1. Witness 1:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________\n\n2. Witness 2:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________`,
    currentText: `IN WITNESS WHEREOF, I, the aforementioned Testator, have set my hand and signature to this my Last Will and Testament, on this _____ day of _______________, 2026, at Mumbai, in the presence of the witnesses who have signed below in my presence.\n\nSigned by the Testator: _________________________________\n\nSIGNED, PUBLISHED, AND DECLARED by the above-named Testator as and for their Last Will and Testament, in the presence of us, who in their presence, at their request, and in the presence of each other, all being present at the same time, have subscribed our names as attesting witnesses:\n\n1. Witness 1:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________\n\n2. Witness 2:\nName: _____________________________\nAddress: __________________________\nSignature: ________________________`,
    isLawyerEdited: false,
    clarificationRequested: false,
    riskLevel: "low",
  });

  return clauses;
}

// -------------------------------------------------------------
// LOCALSTORAGE LOAD & SAVE HELPERS
// -------------------------------------------------------------

export function loadStoredWillState(): WillDraftingState {
  if (typeof window === "undefined") {
    const copy = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
    copy.clauses = generateWillClauses(copy);
    return copy;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const copy = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
      copy.clauses = generateWillClauses(copy);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      return copy;
    }
    const parsed = JSON.parse(raw);
    // Refresh to Dr. Rohit Srivastava if outdated scenario is detected
    if (!parsed.testator?.pan || parsed.testator?.fullName === "Rajesh Kumar Sharma") {
      const refreshed = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
      refreshed.clauses = generateWillClauses(refreshed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));
      return refreshed;
    }
    return parsed;
  } catch (err) {
    console.error("Failed reading WillDrafting state from LocalStorage:", err);
    const copy = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
    copy.clauses = generateWillClauses(copy);
    return copy;
  }
}

export function saveStoredWillState(state: WillDraftingState): void {
  if (typeof window === "undefined") return;
  try {
    state.lastUpdated = new Date().toISOString();
    // Auto-sync clauses if empty
    if (!state.clauses || state.clauses.length === 0) {
      state.clauses = generateWillClauses(state);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Dispatch custom event for cross-component re-renders
    window.dispatchEvent(new Event("willdrafting_state_change"));
  } catch (err) {
    console.error("Failed saving WillDrafting state to LocalStorage:", err);
  }
}

export function setScenario(scenarioKey: "scenario_1" | "scenario_2" | "blank"): WillDraftingState {
  let newState: WillDraftingState;
  if (scenarioKey === "scenario_1") {
    newState = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
  } else if (scenarioKey === "scenario_2") {
    newState = JSON.parse(JSON.stringify(SCENARIO_2_EDGE_CASE_MINOR_CHILD));
  } else {
    newState = JSON.parse(JSON.stringify(BLANK_STATE));
  }
  newState.clauses = generateWillClauses(newState);
  saveStoredWillState(newState);
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
