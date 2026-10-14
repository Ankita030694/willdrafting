// src/lib/devDummyData.ts
// Developer utilities for one-click sample data filling across the 14-step onboarding wizard.

import {
  WillDraftingState,
  FamilyMember,
  Asset,
  BeneficiaryAllocation,
  generateWillClauses,
  BLANK_STATE,
} from "./willDraftingStore";

export const SAMPLE_TESTATOR = {
  fullName: "Aarav Vikram Malhotra",
  fatherOrMotherName: "Late Mr. Vikramaditya Malhotra",
  pan: "AAAPM1234K",
  aadhaar: "4829 1048 5920",
  workplace: "Senior Director of Engineering, Infosys Technologies, Electronic City, Bengaluru",
  dob: "1982-08-15",
  gender: "male" as const,
  maritalStatus: "married" as const,
  religionPersonalLaw: "hindu" as const,
  email: "aarav.malhotra@example.com",
  phone: "9876543210",
  address: "Flat 1204, Tower B, Prestige Palms, ECC Road, Whitefield",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560066",
  citizenship: "Indian",
  hasPreviousWill: false,
  revokePreviousWill: true,
};

export const SAMPLE_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "fam-spouse",
    name: "Pooja Aarav Malhotra",
    relationship: "spouse",
    pan: "BBBPK5678L",
    dob: "1985-04-12",
    isMinor: false,
    phone: "9876543211",
    email: "pooja.malhotra@example.com",
    address: "Flat 1204, Tower B, Prestige Palms, ECC Road, Whitefield, Bengaluru – 560066",
    notes: "Wife and Principal Beneficiary under this Will",
  },
  {
    id: "fam-child1",
    name: "Kabir Malhotra",
    relationship: "son",
    pan: "",
    dob: "2012-10-05", // Age 14 (Minor)
    isMinor: true,
    phone: "",
    email: "",
    address: "Flat 1204, Tower B, Prestige Palms, ECC Road, Whitefield, Bengaluru – 560066",
    notes: "Elder son (Minor)",
  },
  {
    id: "fam-child2",
    name: "Ananya Malhotra",
    relationship: "daughter",
    pan: "",
    dob: "2016-06-20", // Age 10 (Minor)
    isMinor: true,
    phone: "",
    email: "",
    address: "Flat 1204, Tower B, Prestige Palms, ECC Road, Whitefield, Bengaluru – 560066",
    notes: "Younger daughter (Minor)",
  },
  {
    id: "fam-brother",
    name: "Rohan Malhotra",
    relationship: "brother",
    pan: "CCCPR9012M",
    dob: "1988-12-01",
    isMinor: false,
    phone: "9876543212",
    email: "rohan.malhotra@example.com",
    address: "Sector 45, Gurgaon, Haryana – 122003",
    notes: "Brother of Testator & Alternate Executor",
  },
];

export const SAMPLE_ASSETS: Asset[] = [
  {
    id: "ast-flat-1",
    category: "property",
    name: "Whitefield 3BHK Apartment (Prestige Palms)",
    typeDetails: "Residential Apartment",
    identifier: "Flat No. 1204, Tower B, Khata No. 892/12",
    addressOrInstitution: "Prestige Palms, ECC Road, Whitefield, Bengaluru – 560066",
    ownership: "sole",
    approximateValue: 18500000,
    hasLoan: true,
    loanDetails: "Home Loan with HDFC Bank (A/C 64829104, outstanding ~₹32 Lakhs)",
  },
  {
    id: "ast-bank-1",
    category: "bank_account",
    name: "HDFC Bank Savings & Fixed Deposit",
    typeDetails: "Savings Account + Term Deposit",
    identifier: "A/C No. 50100293847291",
    addressOrInstitution: "HDFC Bank, Whitefield Branch, Bengaluru",
    ownership: "sole",
    approximateValue: 2500000,
    hasLoan: false,
  },
  {
    id: "ast-mf-1",
    category: "investments",
    name: "Zerodha Demat Equity & Mutual Funds",
    typeDetails: "Equity Shares & Index Funds Portfolio",
    identifier: "Demat BO ID: 1208160019283746",
    addressOrInstitution: "Zerodha Broking Limited, Bengaluru",
    ownership: "sole",
    approximateValue: 4200000,
    hasLoan: false,
    specialInstructions: "To be liquidated or held for children Kabir and Ananya's higher university education.",
  },
  {
    id: "ast-car-1",
    category: "vehicles",
    name: "Hyundai Tucson SUV",
    typeDetails: "Four Wheeler Motor Vehicle",
    identifier: "Reg. No. KA 03 MN 8492",
    addressOrInstitution: "Registered at Indiranagar RTO, Bengaluru",
    ownership: "sole",
    approximateValue: 2400000,
    hasLoan: false,
  },
  {
    id: "ast-jewel-1",
    category: "jewellery",
    name: "Family Gold Jewellery & Heirlooms",
    typeDetails: "Hallmarked Gold (approx 450 grams)",
    identifier: "Held in HDFC Bank Locker No. 214",
    addressOrInstitution: "HDFC Bank, Whitefield Branch",
    ownership: "sole",
    approximateValue: 3150000,
    hasLoan: false,
    specialInstructions: "To be maintained by spouse Pooja for our children's future weddings.",
  },
];

export const SAMPLE_ALLOCATIONS: BeneficiaryAllocation[] = [
  { id: "alc-1", assetId: "ast-flat-1", beneficiaryId: "fam-spouse", beneficiaryName: "Pooja Aarav Malhotra", percentage: 100 },
  { id: "alc-2", assetId: "ast-bank-1", beneficiaryId: "fam-spouse", beneficiaryName: "Pooja Aarav Malhotra", percentage: 100 },
  { id: "alc-3", assetId: "ast-mf-1", beneficiaryId: "fam-child1", beneficiaryName: "Kabir Malhotra", percentage: 50 },
  { id: "alc-4", assetId: "ast-mf-1", beneficiaryId: "fam-child2", beneficiaryName: "Ananya Malhotra", percentage: 50 },
  { id: "alc-5", assetId: "ast-car-1", beneficiaryId: "fam-spouse", beneficiaryName: "Pooja Aarav Malhotra", percentage: 100 },
  { id: "alc-6", assetId: "ast-jewel-1", beneficiaryId: "fam-spouse", beneficiaryName: "Pooja Aarav Malhotra", percentage: 100 },
];

export const SAMPLE_SPECIAL_WISHES = {
  hasNoSpecialWishes: true,
  jewelleryInstructions: "Gold jewellery and heirloom sets to be kept in HDFC locker and used for children's future education/marriages.",
  personalBelongings: "My library of technical books, laptop, and musical equipment to be passed to Kabir Malhotra.",
  petsCare: "Family pet dog 'Bruno' to stay with spouse with ₹1,50,000 earmarked for veterinary and food care.",
  charitableGifts: "₹50,000 to Akshaya Patra Foundation for midday meal programs.",
  digitalAccounts: "All Google Photos and cloud family drives transferred to spouse; online developer profiles archived.",
  funeralCeremonyWishes: "Simple, dignified Hindu rites at local electric crematorium; no ostentatious rituals.",
  personalMessageToFamily: "To my dear Pooja, Kabir, and Ananya: Everything I built was for our shared happiness. Always stand united, cherish each other, and live with kindness and truth.",
};

export const SAMPLE_EXECUTORS = {
  primary: {
    name: "Rohan Malhotra",
    relationship: "Brother",
    phone: "9876543212",
    email: "rohan.malhotra@example.com",
    address: "Sector 45, Gurgaon, Haryana – 122003",
  },
  alternate: {
    name: "Pooja Aarav Malhotra",
    relationship: "Spouse",
    phone: "9876543211",
    email: "pooja.malhotra@example.com",
    address: "Flat 1204, Tower B, Prestige Palms, Whitefield, Bengaluru – 560066",
  },
};

export const SAMPLE_GUARDIANS = {
  primary: {
    name: "Rohan Malhotra",
    relationship: "Uncle / Paternal Brother",
    phone: "9876543212",
    email: "rohan.malhotra@example.com",
    address: "Sector 45, Gurgaon, Haryana – 122003",
  },
  alternate: {
    name: "Meera Rohan Malhotra",
    relationship: "Aunt / Sister-in-law",
    phone: "9876543219",
    email: "meera.malhotra@example.com",
    address: "Sector 45, Gurgaon, Haryana – 122003",
  },
  specialInstructions: "To ensure emotional continuity, good health, and undisturbed schooling for Kabir and Ananya in Bengaluru till university graduation.",
};

export const SAMPLE_MOTIVATION =
  "To eliminate all ambiguities, ensure undisputed financial independence for my spouse Pooja, and provide a secure, dignified future for my children Kabir and Ananya without any family disputes.";

export function getStepFillMeta(stepNum: number): { title: string; actionLabel: string; description: string } {
  switch (stepNum) {
    case 1:
      return {
        title: "Welcome Overview",
        actionLabel: "Start Step 2 (About You)",
        description: "Proceeds directly to the personal profile questionnaire.",
      };
    case 2:
      return {
        title: "About You (Testator)",
        actionLabel: "Fill Sample Testator Profile",
        description: "Fills legal name, PAN, Aadhaar, DOB, Bengaluru address & religion.",
      };
    case 3:
      return {
        title: "My Family (Beneficiaries)",
        actionLabel: "Fill 4 Sample Family Members",
        description: "Adds spouse Pooja, minor son Kabir, minor daughter Ananya & brother Rohan.",
      };
    case 4:
      return {
        title: "Assets Register",
        actionLabel: "Fill 5 Sample Assets (₹3.07 Cr)",
        description: "Adds Prestige apartment, HDFC bank account, Demat portfolio, SUV & Gold.",
      };
    case 5:
      return {
        title: "Beneficiary Allocations",
        actionLabel: "Auto-Allocate Assets & Residuary",
        description: "Allocates apartment & bank to spouse, shares between children, sets residuary.",
      };
    case 6:
      return {
        title: "Executors & Trustees",
        actionLabel: "Fill Primary & Alternate Executors",
        description: "Sets brother Rohan as primary executor and spouse Pooja as alternate.",
      };
    case 7:
      return {
        title: "Testamentary Guardians",
        actionLabel: "Fill Guardians for Minors",
        description: "Appoints uncle Rohan & aunt Meera as guardians for Kabir & Ananya.",
      };
    case 8:
      return {
        title: "Special Wishes & Directives",
        actionLabel: "Fill Wishes, Pet Care & Charity",
        description: "Adds locker instructions, pet Bruno's fund, ₹50k charity & funeral rites.",
      };
    case 9:
      return {
        title: "Emotional Purpose & Note",
        actionLabel: "Fill Emotional Purpose Note",
        description: "Adds heartfelt message to family explaining testamentary intentions.",
      };
    case 10:
      return {
        title: "Full Review Dossier",
        actionLabel: "Populate Complete Will for Review",
        description: "Ensures all sections have complete data for exhaustive in-place review.",
      };
    case 11:
      return {
        title: "Legal Health Check",
        actionLabel: "Validate 100% Legal Compliance",
        description: "Ensures all Indian Succession Act compliance checks pass cleanly.",
      };
    case 12:
      return {
        title: "Clause Assembly",
        actionLabel: "Compile Statutory Clauses",
        description: "Generates all statutory legal clauses according to personal law.",
      };
    case 13:
      return {
        title: "Plan Selection",
        actionLabel: "Select Lawyer-Verified Plan",
        description: "Sets plan to Lawyer Verified (₹2,499) with advocate review.",
      };
    case 14:
      return {
        title: "Final Will & Execution",
        actionLabel: "Set Status to Draft Ready",
        description: "Marks Will as finalised & ready for witness attestation.",
      };
    default:
      return {
        title: `Step ${stepNum}`,
        actionLabel: `Fill Step ${stepNum} Dummy Data`,
        description: "Populate sample values for this step.",
      };
  }
}

/**
 * Fills dummy data for a specific single step in the 14-step questionnaire.
 */
export function fillStepDummyData(
  stepNum: number,
  currentState: WillDraftingState,
  userEmail?: string | null
): WillDraftingState {
  const next: WillDraftingState = JSON.parse(JSON.stringify(currentState));

  switch (stepNum) {
    case 1:
      next.currentStep = 2;
      break;

    case 2:
      next.testator = {
        ...SAMPLE_TESTATOR,
        email: userEmail || currentState.testator?.email || SAMPLE_TESTATOR.email,
      };
      break;

    case 3:
      next.familyMembers = JSON.parse(JSON.stringify(SAMPLE_FAMILY_MEMBERS));
      break;

    case 4:
      next.assets = JSON.parse(JSON.stringify(SAMPLE_ASSETS));
      break;

    case 5:
      // Ensure family and assets exist first if empty
      if (!next.familyMembers || next.familyMembers.length === 0) {
        next.familyMembers = JSON.parse(JSON.stringify(SAMPLE_FAMILY_MEMBERS));
      }
      if (!next.assets || next.assets.length === 0) {
        next.assets = JSON.parse(JSON.stringify(SAMPLE_ASSETS));
      }
      next.allocations = JSON.parse(JSON.stringify(SAMPLE_ALLOCATIONS));
      next.residuaryBeneficiaryId = "fam-spouse";
      next.residuaryBeneficiaryName = "Pooja Aarav Malhotra";
      next.residuaryAlternateId = "fam-brother";
      next.residuaryAlternateName = "Rohan Malhotra";
      break;

    case 6:
      next.executorPrimary = { ...SAMPLE_EXECUTORS.primary };
      next.executorAlternate = { ...SAMPLE_EXECUTORS.alternate };
      break;

    case 7:
      next.guardianPrimary = { ...SAMPLE_GUARDIANS.primary };
      next.guardianAlternate = { ...SAMPLE_GUARDIANS.alternate };
      next.guardianSpecialInstructions = SAMPLE_GUARDIANS.specialInstructions;
      break;

    case 8:
      next.specialWishes = { ...SAMPLE_SPECIAL_WISHES };
      break;

    case 9:
      next.emotionalReason = SAMPLE_MOTIVATION;
      if (!next.specialWishes) {
        next.specialWishes = { ...SAMPLE_SPECIAL_WISHES };
      } else {
        next.specialWishes.personalMessageToFamily = SAMPLE_SPECIAL_WISHES.personalMessageToFamily;
      }
      break;

    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return fillAllDummyData(currentState, userEmail);

    default:
      break;
  }

  next.lastUpdated = new Date().toISOString();
  next.clauses = generateWillClauses(next);
  return next;
}

/**
 * Fills complete dummy data across all 14 steps at once.
 */
export function fillAllDummyData(
  currentState: WillDraftingState,
  userEmail?: string | null
): WillDraftingState {
  const next: WillDraftingState = JSON.parse(JSON.stringify(currentState));

  next.testator = {
    ...SAMPLE_TESTATOR,
    email: userEmail || currentState.testator?.email || SAMPLE_TESTATOR.email,
  };
  next.familyMembers = JSON.parse(JSON.stringify(SAMPLE_FAMILY_MEMBERS));
  next.assets = JSON.parse(JSON.stringify(SAMPLE_ASSETS));
  next.allocations = JSON.parse(JSON.stringify(SAMPLE_ALLOCATIONS));
  next.residuaryBeneficiaryId = "fam-spouse";
  next.residuaryBeneficiaryName = "Pooja Aarav Malhotra";
  next.residuaryAlternateId = "fam-brother";
  next.residuaryAlternateName = "Rohan Malhotra";
  next.executorPrimary = { ...SAMPLE_EXECUTORS.primary };
  next.executorAlternate = { ...SAMPLE_EXECUTORS.alternate };
  next.guardianPrimary = { ...SAMPLE_GUARDIANS.primary };
  next.guardianAlternate = { ...SAMPLE_GUARDIANS.alternate };
  next.guardianSpecialInstructions = SAMPLE_GUARDIANS.specialInstructions;
  next.specialWishes = { ...SAMPLE_SPECIAL_WISHES };
  next.emotionalReason = SAMPLE_MOTIVATION;
  next.selectedPlan = "lawyer_verified";
  next.willStatus = "draft_ready";
  next.lastUpdated = new Date().toISOString();
  next.clauses = generateWillClauses(next);

  return next;
}

/**
 * Clears data for only the specific active step so developers can test empty states.
 */
export function clearStepData(
  stepNum: number,
  currentState: WillDraftingState
): WillDraftingState {
  const next: WillDraftingState = JSON.parse(JSON.stringify(currentState));

  switch (stepNum) {
    case 2:
      next.testator = { ...BLANK_STATE.testator };
      break;
    case 3:
      next.familyMembers = [];
      break;
    case 4:
      next.assets = [];
      break;
    case 5:
      next.allocations = [];
      next.residuaryBeneficiaryId = "";
      next.residuaryBeneficiaryName = "";
      next.residuaryAlternateId = "";
      next.residuaryAlternateName = "";
      break;
    case 6:
      next.executorPrimary = { ...BLANK_STATE.executorPrimary };
      next.executorAlternate = { ...BLANK_STATE.executorAlternate };
      break;
    case 7:
      next.guardianPrimary = { ...BLANK_STATE.guardianPrimary };
      next.guardianAlternate = { ...BLANK_STATE.guardianAlternate };
      next.guardianSpecialInstructions = "";
      break;
    case 8:
      next.specialWishes = { ...BLANK_STATE.specialWishes };
      break;
    case 9:
      next.emotionalReason = "";
      break;
    default:
      break;
  }

  next.lastUpdated = new Date().toISOString();
  next.clauses = generateWillClauses(next);
  return next;
}
