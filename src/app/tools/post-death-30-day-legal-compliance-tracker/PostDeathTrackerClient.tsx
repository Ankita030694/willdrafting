"use client";

import React, { useState, useMemo } from "react";
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
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  AlertCircle,
  Calendar,
  Smartphone,
  CreditCard,
  Car,
  FileSpreadsheet,
  Search,
  Filter,
} from "lucide-react";

interface ComplianceItem {
  id: string;
  phase: 1 | 2 | 3 | 4;
  phaseLabel: string;
  title: string;
  authority: string;
  deadlineDays: number;
  deadlineLabel: string;
  urgency: "critical" | "high" | "medium" | "warning";
  penaltyRisk: string;
  description: string;
  actionSteps: string[];
  requiredDocs: string[];
  isDoNotCancel?: boolean;
}

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  // PHASE 1: DAYS 1 TO 7
  {
    id: "medical-death-certificate",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Obtain Medical Certificate of Cause of Death (MCCD)",
    authority: "Registration of Births and Deaths Act, 1969 Section 10(2) / (3)",
    deadlineDays: 1,
    deadlineLabel: "Day 1 to 2",
    urgency: "critical",
    penaltyRisk: "Cannot register death with municipal authority or obtain cremation permit without Form 4/4A.",
    description: "Secure the official Medical Certificate of Cause of Death in Form 4 (for hospital death) or Form 4A (for non-institutional demise) signed by the registered attending doctor.",
    actionSteps: [
      "Collect Form 4 / 4A from the hospital administrative desk or attending doctor.",
      "Verify that the name, age, gender, and cause of demise match government ID records.",
      "Make multiple photocopies before surrendering the original to the crematorium or cemetery.",
    ],
    requiredDocs: ["Hospital discharge summary", "Doctor medical registration details", "Deceased Aadhaar / Voter ID"],
  },
  {
    id: "cremation-burial-receipt",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Secure Cremation or Burial Ground Slip",
    authority: "Municipal Corporation Public Health Bye-Laws",
    deadlineDays: 2,
    deadlineLabel: "Day 1 to 3",
    urgency: "critical",
    penaltyRisk: "Municipal registrars refuse to issue death certificates without an authorized crematorium entry log.",
    description: "Obtain the formal receipt or cremation slip containing the registry entry number, date, and time of final rites from the authorized cremation or burial facility.",
    actionSteps: [
      "Ensure the caretaker records the correct full legal name and permanent address.",
      "Retain the stamped receipt and note down the cremation register serial number.",
      "Take a clear photograph of the receipt on your phone as immediate digital backup.",
    ],
    requiredDocs: ["MCCD Form 4/4A", "ID card of reporting family member", "Address proof of deceased"],
  },
  {
    id: "police-panchnama",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Secure Police Panchnama & Post-Mortem (If Unnatural Death)",
    authority: "Bharatiya Nagarik Suraksha Sanhita (BNSS) s. 194 / CrPC s. 174",
    deadlineDays: 3,
    deadlineLabel: "Day 1 to 4",
    urgency: "critical",
    penaltyRisk: "Life insurance and accidental death claims are rejected without certified police inquest papers.",
    description: "In cases of accidental death, road collisions, or sudden hospital deaths, secure certified true copies of the Police Inquest Report (Panchnama) and Post-Mortem Report.",
    actionSteps: [
      "Collect the preliminary Panchnama copy from the jurisdictional police station.",
      "Apply for the final viscera analysis or chemical autopsy report from the government forensic hospital.",
      "Obtain the certified police non-objection certificate (NOC) for legal claim files.",
    ],
    requiredDocs: ["FIR / DD Entry Copy", "Hospital MLC (Medico-Legal Case) record", "Post-Mortem examination report"],
  },
  {
    id: "secure-original-ids",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Consolidate Original Identity Documents in Secure Folder",
    authority: "Indian Evidence Act / Bharatiya Sakshya Adhiniyam",
    deadlineDays: 5,
    deadlineLabel: "Day 1 to 5",
    urgency: "high",
    penaltyRisk: "Misplacing physical cards causes months of verification delays during bank transmissions.",
    description: "Gather physical Aadhaar card, PAN card, Passport, Voter ID (EPIC), driving license, ration card, and bank passbooks into a fireproof, centralized family file.",
    actionSteps: [
      "Locate all physical government ID cards and bank checkbooks.",
      "Check that names across PAN, Aadhaar, and bank accounts match accurately.",
      "Scan both sides of every document in high-resolution PDF format.",
    ],
    requiredDocs: ["Aadhaar Card", "PAN Card", "Passport", "Voter ID", "Driving License"],
  },
  {
    id: "freeze-credit-cards",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Inform Banks to Block Credit Cards & ATM Debit Cards",
    authority: "RBI Fair Practices Code for Lenders & Credit Card Operations",
    deadlineDays: 5,
    deadlineLabel: "Day 3 to 7",
    urgency: "high",
    penaltyRisk: "Unauthorized post-death transactions can trigger complex fraud investigations with card issuers.",
    description: "Notify credit card issuing banks to block active credit lines and debit cards to prevent recurring auto-debits, fraud, or compounding interest charges.",
    actionSteps: [
      "Call bank customer support or visit the branch to place a hotlist block on all credit cards.",
      "Send written email intimation attaching the death certificate once available.",
      "Check if the credit card carried complimentary personal accident insurance cover.",
    ],
    requiredDocs: ["Credit card statement", "Death intimation email", "Proof of relationship"],
  },
  {
    id: "keep-sim-card-active",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "CRITICAL: Retain & Recharge Aadhaar-Linked Mobile SIM",
    authority: "Telecom Regulatory Authority of India (TRAI) & UIDAI Aadhaar 2FA Rules",
    deadlineDays: 7,
    deadlineLabel: "DO NOT SURRENDER",
    urgency: "warning",
    isDoNotCancel: true,
    penaltyRisk: "Deactivating SIM locks all OTPs for DigiLocker, banking logins, Income Tax e-filing, and mutual funds.",
    description: "Never deactivate or surrender the deceased's mobile number. Keep the SIM active by maintaining a prepaid validity recharge for at least 12 to 18 months.",
    actionSteps: [
      "Insert the deceased's physical SIM into a secure, active family smartphone.",
      "Set up automatic validity recharge alerts to prevent telecom number deactivation.",
      "Use this SIM to receive two-factor authentication (2FA) codes for DigiLocker, EPF, and tax logins.",
    ],
    requiredDocs: ["Existing active SIM card", "Prepaid recharge validity pack"],
  },
  {
    id: "employer-terminal-intimation",
    phase: 1,
    phaseLabel: "Phase 1: Days 1 to 7",
    title: "Intimate Employer HR for Life Insurance & Terminal Benefits",
    authority: "Payment of Gratuity Act, 1972 & Employees' Compensation Act",
    deadlineDays: 7,
    deadlineLabel: "Day 3 to 7",
    urgency: "high",
    penaltyRisk: "Delays in intimation can hold up group term insurance claims and family medical cover continuity.",
    description: "Notify the employer's HR department to initiate processing of corporate group term insurance, gratuity, pending salary, and encashment of accumulated leave.",
    actionSteps: [
      "Submit written intimation of demise along with the hospital death summary.",
      "Request claim forms for Group Term Life Insurance (GTLI) and corporate mediclaim.",
      "Collect Form F (Gratuity Nomination) records from the HR establishment.",
    ],
    requiredDocs: ["Employee ID card", "Death certificate / MCCD", "Nominee bank account details"],
  },

  // PHASE 2: DAYS 8 TO 21
  {
    id: "municipal-death-registration",
    phase: 2,
    phaseLabel: "Phase 2: Days 8 to 21",
    title: "Register Death with Municipal Corporation / Gram Panchayat",
    authority: "Registration of Births and Deaths Act, 1969 Section 8 & 13",
    deadlineDays: 21,
    deadlineLabel: "Strict 21-Day Cutoff",
    urgency: "critical",
    penaltyRisk: "Missing 21 days requires payment of late fee; missing 30 days requires Sub-Divisional Magistrate (SDM) order.",
    description: "File the formal death report with the jurisdictional Registrar of Births and Deaths (Municipal Corporation, Municipality, or Gram Panchayat) within 21 days.",
    actionSteps: [
      "Apply online via CRS portal (crsorgi.gov.in) or visit the local municipal citizen service center.",
      "Submit MCCD Form 4/4A, cremation ground receipt, and applicant ID proof.",
      "Obtain the digital registration acknowledgment slip with statutory entry number.",
    ],
    requiredDocs: ["MCCD Form 4 / 4A", "Cremation / Burial receipt", "Aadhaar of deceased and applicant"],
  },
  {
    id: "order-multiple-death-certificates",
    phase: 2,
    phaseLabel: "Phase 2: Days 8 to 21",
    title: "Procure 15 to 20 Official Copies of Death Certificate",
    authority: "Registration of Births and Deaths Act, 1969 Section 12 & 17",
    deadlineDays: 21,
    deadlineLabel: "Day 10 to 21",
    urgency: "high",
    penaltyRisk: "Banks, insurers, and courts require original or certified copies; color photocopies are routinely rejected.",
    description: "Apply for 15 to 20 digitally signed, official copies of the Death Certificate bearing the QR code and Registrar seal for simultaneous asset transmissions.",
    actionSteps: [
      "Request multiple certified copies from the municipal portal or registrar office.",
      "Verify that spelling of the name, age, father's/husband's name, and date of death match ID cards.",
      "Distribute copies across insurance, bank, RTO, demat, and property files.",
    ],
    requiredDocs: ["Municipal death registration slip", "Application fee receipt"],
  },
  {
    id: "term-life-insurance-intimation",
    phase: 2,
    phaseLabel: "Phase 2: Days 8 to 21",
    title: "File Life Insurance & Accidental Policy Claim Notices",
    authority: "Insurance Regulatory and Development Authority of India (IRDAI) Master Circular",
    deadlineDays: 21,
    deadlineLabel: "Day 10 to 21",
    urgency: "high",
    penaltyRisk: "Inordinate delay in filing insurance claim allows insurers to initiate protracted forensic claim audits.",
    description: "Submit written death claim intimations to all individual life insurance providers (LIC, HDFC Life, ICICI Pru, Max Life) along with original policy bonds.",
    actionSteps: [
      "Submit Claim Form 1 (or insurer online claim module) with death certificate copy.",
      "Furnish original policy document, nominee KYC, and cancelled cheque of nominee account.",
      "Request a stamped claim acknowledgment letter and claim tracking number.",
    ],
    requiredDocs: ["Original Policy Bond", "Death Certificate", "Nominee Aadhaar, PAN & Cancelled Cheque"],
  },
  {
    id: "locate-will-testament",
    phase: 2,
    phaseLabel: "Phase 2: Days 8 to 21",
    title: "Locate Last Will, Codicils, or Bank Locker Keys",
    authority: "Indian Succession Act, 1925 Sections 62, 63 & 213",
    deadlineDays: 21,
    deadlineLabel: "Day 14 to 21",
    urgency: "high",
    penaltyRisk: "Unaware heirs may distribute assets under intestate succession rules, leading to subsequent Will contest suits.",
    description: "Search the deceased's secure lockers, safe deposit boxes, or attorney records to verify if a registered or unregistered Last Will and Testament exists.",
    actionSteps: [
      "Contact the family advocate or executor named by the deceased.",
      "Check safe deposit vaults and family records for original Will and codicils.",
      "If a Will is found, review appointed executors and ascertain if court probate is mandatory in your city.",
    ],
    requiredDocs: ["Original Last Will and Testament", "Codicil documents", "Bank locker key tokens"],
  },
  {
    id: "society-landlord-notice",
    phase: 2,
    phaseLabel: "Phase 2: Days 8 to 21",
    title: "Notify Cooperative Housing Society (CHS) or Landlord",
    authority: "State Cooperative Societies Acts (e.g., Maharashtra MCS Act s. 154B-13)",
    deadlineDays: 21,
    deadlineLabel: "Day 14 to 21",
    urgency: "medium",
    penaltyRisk: "Societies can dispute parking, issue maintenance notices to deceased, or block future NOCs.",
    description: "Submit written intimation to the managing committee of the housing society or landlord, informing them of the demise and submitting nominee records.",
    actionSteps: [
      "Submit written letter to the society secretary with copy of Death Certificate.",
      "Check the society nomination register (Form Appendix 14/15) for registered nominees.",
      "Request issuance of maintenance bills under the name of the nominee or legal estate.",
    ],
    requiredDocs: ["Death Certificate", "Letter to Managing Committee", "Nomination copy"],
  },

  // PHASE 3: DAYS 22 TO 90
  {
    id: "rto-form-31-intimation",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "Submit Vehicle Owner Demise Intimation to RTO",
    authority: "Central Motor Vehicles Rules, 1989 Rule 56(1) & Form 31",
    deadlineDays: 30,
    deadlineLabel: "Strict 30-Day Deadline",
    urgency: "critical",
    penaltyRisk: "Vehicle use without intimation is illegal; motor insurance claims are voided if an accident occurs.",
    description: "Under CMVR Rule 56(1), the person succeeding to vehicle possession must notify the Regional Transport Office (RTO) within 30 days of the owner's death.",
    actionSteps: [
      "Submit written intimation to the registering RTO enclosing death certificate.",
      "Attach proof of vehicle possession (driving license, key possession, parking proof).",
      "Collect the stamped RTO acknowledgment receipt for the vehicle glove compartment.",
    ],
    requiredDocs: ["Original RC (Registration Certificate)", "Death Certificate", "Successor ID proof & Form 31 draft"],
  },
  {
    id: "gst-reg-16-cancellation",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "File Form GST REG-16 (If Sole Proprietor with GSTIN)",
    authority: "Central Goods and Services Tax Act, 2017 Section 29 & Rule 20",
    deadlineDays: 30,
    deadlineLabel: "Mandatory 30-Day Limit",
    urgency: "critical",
    penaltyRisk: "Automated GST portal notices, penalty interest, and inability to claim unutilized input tax credits.",
    description: "If the deceased owned a sole proprietorship with a GSTIN, legal heirs must submit an application for cancellation in Form GST REG-16 within 30 days.",
    actionSteps: [
      "Log into GST portal using deceased's credentials before SIM deactivation.",
      "Submit Form GST REG-16 specifying 'Death of Sole Proprietor' as reason.",
      "Alternatively, transfer business and input tax credits (ITC) to legal heir via Form GST ITC-02.",
    ],
    requiredDocs: ["GSTIN certificate", "Death Certificate", "Legal Heir Certificate / Succession proof"],
  },
  {
    id: "bank-account-nominee-claims",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "Submit Bank Account Deceased Depositor Claim Forms",
    authority: "RBI Master Directions on Settlement of Deceased Claims & Banking Reg Act s. 45ZA",
    deadlineDays: 45,
    deadlineLabel: "Day 30 to 45",
    urgency: "high",
    penaltyRisk: "Unclaimed balances migrate to RBI UDGAM fund after 10 years; interest calculations may cease.",
    description: "Submit bank deceased claim applications. Where a registered nominee exists, RBI mandates settlement within 15 days without requiring court succession certificates.",
    actionSteps: [
      "Submit bank's standardized Deceased Claim Form with certified Death Certificate.",
      "Provide nominee KYC (Aadhaar, PAN) and original passbook / fixed deposit receipts.",
      "For accounts without nomination, submit joint Indemnity Bond and Legal Heir Affidavit.",
    ],
    requiredDocs: ["Deceased Claim Form", "Original Death Certificate", "Nominee KYC", "Passbook / FD receipts"],
  },
  {
    id: "epf-edli-pension-claims",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "Submit EPFO Claims: EDLI Insurance, PF & EPS-95 Pension",
    authority: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
    deadlineDays: 60,
    deadlineLabel: "Day 30 to 60",
    urgency: "high",
    penaltyRisk: "Forfeiture of monthly EPS-95 widow/widower pension arrears and EDLI life assurance payout up to ₹7 Lakhs.",
    description: "File composite claim forms with EPFO to release accumulated provident fund balance, EDLI life insurance cover (up to ₹7,00,000), and monthly family pension under EPS-95.",
    actionSteps: [
      "Submit EPFO Form 20 (PF transfer/withdrawal) and Form 10D (Pension for spouse & children).",
      "Submit Form 5IF for Employees' Deposit Linked Insurance (EDLI) benefit payout.",
      "Attach employer certification, bank account details of spouse, and birth certificates of minor children.",
    ],
    requiredDocs: ["Death Certificate", "UAN & PF Member ID", "Cancelled cheque of claimant", "Children birth proofs"],
  },
  {
    id: "demat-mutual-fund-transmission",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "Transmit Demat Shares & Mutual Funds to Nominees",
    authority: "SEBI Master Circular on Demat Transmission & NSDL/CDSL Bye-Laws",
    deadlineDays: 60,
    deadlineLabel: "Day 30 to 60",
    urgency: "high",
    penaltyRisk: "Shares without transmission can trigger mandatory transfer to IEPF Authority after 7 years.",
    description: "Submit transmission requests to Depository Participants (Zerodha, Groww, ICICI Direct) and Mutual Fund RTAs (CAMS, KFintech) using standardized Annexure forms.",
    actionSteps: [
      "Submit Transmission Request Form (TRF) with original client master list (CML) of nominee.",
      "Attach notarized death certificate, ISR-1 / ISR-2 forms, and KYC compliance documents.",
      "For joint accounts, submit Form to delete deceased name and update primary holder status.",
    ],
    requiredDocs: ["Client Master List (CML)", "Death Certificate", "TRF Annexure Form", "PAN & Aadhaar of Nominee"],
  },
  {
    id: "rto-vehicle-transfer-application",
    phase: 3,
    phaseLabel: "Phase 3: Days 22 to 90",
    title: "Complete Formal Vehicle Ownership Transfer in Form 31",
    authority: "Central Motor Vehicles Rules, 1989 Rule 56(2) & Form 31",
    deadlineDays: 90,
    deadlineLabel: "Strict 90-Day Limit",
    urgency: "critical",
    penaltyRisk: "RTO late fee penalties, registration suspension, and inability to renew vehicle insurance.",
    description: "Submit formal Form 31 application along with valid pollution certificate (PUCC), insurance certificate, and legal heir succession consent to the RTO within 3 months.",
    actionSteps: [
      "Complete Form 31 in duplicate and get signatures/NOC from all other legal heirs.",
      "Submit original RC book, valid insurance policy, and vehicle physical inspection if required.",
      "Pay prescribed vehicle transfer fee and obtain updated Smart Card RC.",
    ],
    requiredDocs: ["Form 31 in duplicate", "Original RC", "Legal Heir NOC / Succession proof", "Valid PUCC & Insurance"],
  },

  // PHASE 4: DAYS 91 TO 365
  {
    id: "immovable-property-mutation",
    phase: 4,
    phaseLabel: "Phase 4: Days 91 to 365",
    title: "Apply for Revenue Mutation of Inherited Real Estate",
    authority: "State Land Revenue Codes (e.g. Maharashtra MLRC, UP Revenue Code)",
    deadlineDays: 180,
    deadlineLabel: "Within 6 Months",
    urgency: "high",
    penaltyRisk: "Title in local municipal records remains under deceased; property tax bills and utility transfers stall.",
    description: "Apply for mutation (Namantaran / Dakhil Kharij) in local land revenue records (7/12, Khata, Jamabandi, or Municipal Property Tax register) in favor of legal heirs.",
    actionSteps: [
      "Submit mutation application to the Tahsildar, Talathi, or Municipal Revenue Office.",
      "Attach registered Will, probate order, or Legal Heir Certificate and legal heir family tree.",
      "Respond to public notice or proclamation issued by revenue authorities during the 30-day notice window.",
    ],
    requiredDocs: ["Registered Will / Probate / Legal Heir Certificate", "Parent title deed", "Property tax receipts", "Death Certificate"],
  },
  {
    id: "legal-heir-or-succession-cert",
    phase: 4,
    phaseLabel: "Phase 4: Days 91 to 365",
    title: "Obtain Legal Heir Certificate or Succession Certificate",
    authority: "Indian Succession Act, 1925 Sections 370–390 & State Revenue Rules",
    deadlineDays: 180,
    deadlineLabel: "Within 6 Months",
    urgency: "high",
    penaltyRisk: "High-value bank accounts without nomination and government asset transfers remain legally frozen.",
    description: "Procure a Surviving Member Certificate / Legal Heir Certificate from the Tehsildar/SDM, or petition the Civil Court for a Succession Certificate if contested.",
    actionSteps: [
      "Apply through state e-District portal or Tehsildar office with family genealogical tree.",
      "If assets exceed bank simplified limits or lack nomination, file succession petition in court.",
      "Secure court-certified Succession Certificate or probate decree.",
    ],
    requiredDocs: ["Family genealogical tree affidavit", "Death Certificate", "Applicant ID proofs", "Ration Card copy"],
  },
  {
    id: "section-159-income-tax",
    phase: 4,
    phaseLabel: "Phase 4: Days 91 to 365",
    title: "Register as Legal Representative & File Section 159 ITR",
    authority: "Income Tax Act, 1961 Section 159 & Section 168",
    deadlineDays: 300,
    deadlineLabel: "Standard ITR Due Date",
    urgency: "critical",
    penaltyRisk: "Late filing fees under Section 234F, forfeiture of tax refunds, and penalty notices on the estate.",
    description: "Register on the Income Tax e-Filing portal as the deceased's Legal Representative. File the final ITR for income earned from April 1 until the date of demise.",
    actionSteps: [
      "Log into your personal e-filing account and submit 'Register as Legal Representative' request.",
      "Upload deceased's PAN, Death Certificate, Legal Heir Certificate/Will, and Indemnity Bond.",
      "Once approved by the Assessing Officer (AO), file the deceased's ITR using the deceased's active PAN.",
    ],
    requiredDocs: ["Active PAN of Deceased", "Death Certificate", "Legal Heir Certificate / Will", "Indemnity Bond"],
  },
  {
    id: "utility-transfer-and-pan-surrender",
    phase: 4,
    phaseLabel: "Phase 4: Days 91 to 365",
    title: "Transfer Utilities & Surrender PAN After All Claims Settle",
    authority: "Electricity Act 2003 & Income Tax Rules (PAN Surrender Protocol)",
    deadlineDays: 365,
    deadlineLabel: "Final Estate Closure",
    urgency: "medium",
    penaltyRisk: "Premature PAN surrender freezes pending IT refunds; delayed utility transfer can lead to billing disconnection.",
    description: "Transfer electricity, water, and gas meters to successor heirs. Only after all tax refunds, ITR assessments, and bank transfers finish, surrender the PAN card.",
    actionSteps: [
      "Submit application to local electricity discom and water board with mutation extract.",
      "Verify that all bank accounts are zeroed and closed with formal closure receipts.",
      "Submit written PAN surrender letter to the jurisdictional Assessing Officer once refunds are credited.",
    ],
    requiredDocs: ["Mutation certificate", "Bank closure statements", "ITR assessment orders", "Original PAN card"],
  },
];

const TOC_ITEMS = [
  { id: "overview-statutory-mandates", label: "1. What to Do After Death in India Checklist" },
  { id: "interactive-compliance-tracker", label: "2. Interactive 30-Day Compliance Tracker" },
  { id: "irreversible-compliance-mistakes", label: "3. The 3 Irreversible Mistakes to Avoid" },
  { id: "phase-1-immediate-actions", label: "4. Phase 1: Days 1 to 7 Immediate Evidence" },
  { id: "phase-2-registration-window", label: "5. Phase 2: Days 8 to 21 Municipal Registration" },
  { id: "phase-3-rto-and-bank-claims", label: "6. Phase 3: Days 22 to 90 RTO & Bank Claims" },
  { id: "phase-4-mutation-and-tax", label: "7. Phase 4: Days 91 to 365 Land Mutation & ITR" },
  { id: "cancel-vs-retain-comparison", label: "8. What to Cancel vs What to Retain Active" },
  { id: "bank-nominee-vs-legal-heir", label: "9. Bank Accounts & RBI Deceased Claim Rules" },
  { id: "motor-vehicle-rto-rules", label: "10. Motor Vehicle Transfer: CMVR Rule 56" },
  { id: "legal-intimation-templates", label: "11. Copy-Paste Legal Notice Templates" },
  { id: "advocate-succession-support", label: "12. Professional Succession Support Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Governing Acts & Official Portals" },
];

const FAQS = [
  {
    q: "What are the most urgent legal formalities required within 21 days of death in India?",
    a: "Under Section 8 of the Registration of Births and Deaths Act, 1969, reporting the death to the local Registrar of Births and Deaths (Municipal Corporation, Municipality, or Gram Panchayat) within 21 days is legally mandatory. Timely reporting ensures issuance of the official Death Certificate without requiring delayed registration approvals or late fees. Families should also collect the Medical Certificate of Cause of Death (MCCD Form 4/4A) from the hospital and secure cremation or burial receipts.",
  },
  {
    q: "Why should families NEVER surrender the deceased person's PAN card immediately?",
    a: "Surrendering or cancelling the deceased's PAN card immediately is a major legal blunder. Under Section 159 of the Income Tax Act, 1961, the legal representative must file the deceased's final Income Tax Return (ITR) and claim any pending tax refunds using the deceased's PAN. Furthermore, banks, mutual fund AMCs, depositories (NSDL/CDSL), and the Sub-Registrar require active PAN verification to process asset transmissions. PAN should only be surrendered after all transmissions and tax assessments are fully completed.",
  },
  {
    q: "Why must the deceased person's mobile number and SIM card be kept active?",
    a: "In India, virtually all financial and statutory portals rely on Aadhaar-based OTP verification and mobile two-factor authentication. DigiLocker, net banking logins, Income Tax e-filing registrations, EPFO UAN portals, mutual fund platforms, and demat accounts transmit verification codes to the mobile number registered in the deceased's name. If you deactivate the SIM card, access to these accounts is locked, creating administrative bottlenecks. Families should maintain an active recharge on the SIM for at least 12 to 18 months.",
  },
  {
    q: "What is the 30-day legal deadline for vehicle ownership transfer under CMVR Rule 56?",
    a: "Under Rule 56(1) of the Central Motor Vehicles Rules, 1989, the person succeeding to the possession of the vehicle must intimate the demise of the registered owner to the Regional Transport Office (RTO) within 30 days of death. Thereafter, under Rule 56(2), a formal application for transfer of ownership using Form 31 must be submitted within 3 months. Failure to report can invalidate third-party motor insurance coverage and lead to vehicle seizure under the Motor Vehicles Act.",
  },
  {
    q: "How do bank nominee claims differ from legal heir inheritance rights in India?",
    a: "Under the Banking Regulation Act, 1949 (Section 45ZA) and landmark Supreme Court rulings (Ram Chander Talwar v. Devinder Kumar Talwar and Sarbati Devi), a bank nominee is merely a statutory trustee authorized to receive the deposit funds to give a valid discharge to the bank. A nominee does not become the absolute owner of the money unless they are also the sole legal heir under a valid Will or personal succession laws. The nominee holds the funds in trust for distribution among all legal heirs.",
  },
  {
    q: "Can bank deposits be claimed without a Succession Certificate if there is no nominee?",
    a: "Yes. Under Reserve Bank of India (RBI) Master Directions, banks have established simplified claim thresholds (typically between ₹50,000 to ₹5,00,000 depending on bank policy) for accounts without nomination. Within this limit, legal heirs can claim funds by submitting a Deceased Claim Form, original death certificate, KYC documents, a joint Indemnity Bond, and an Affidavit signed by all surviving legal heirs, without requiring an expensive court-issued Succession Certificate.",
  },
  {
    q: "What is the deadline for filing the deceased person's Income Tax Return under Section 159?",
    a: "Under Section 159 of the Income Tax Act, 1961, the legal representative is liable to file the return of income for all income earned by the deceased from April 1 of the financial year up to the date of death. The return must be filed by the standard statutory deadline (typically July 31 for non-audit individual taxpayers). The legal representative must register on the Income Tax e-Filing portal by submitting the death certificate, proof of legal representation, and an indemnity bond.",
  },
  {
    q: "What happens if a death is not registered within 21 days in India?",
    a: "Under Section 13 of the Registration of Births and Deaths Act, 1969: (1) Registration between 21 and 30 days requires payment of a late fee to the Registrar. (2) Registration between 30 days and 1 year requires written permission from the designated authority (such as the Sub-Divisional Magistrate or Tehsildar) along with an affidavit. (3) Registration after 1 year can only be done following a formal judicial verification order from a First Class Magistrate or Executive Magistrate.",
  },
];

export default function PostDeathTrackerClient() {
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

  const [activeId, setActiveId] = useState<string>("overview-statutory-mandates");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedRto, setCopiedRto] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Dynamic Date Calculator State
  // Default to today's date formatted as YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  const [dateOfDemise, setDateOfDemise] = useState<string>(todayStr);
  const [selectedPhase, setSelectedPhase] = useState<number | "all" | "warnings">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Quick Preset Helper
  const setPresetDaysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    setDateOfDemise(d.toISOString().split("T")[0]);
  };

  // Statutory Milestone Date Calculations
  const calculatedMilestones = useMemo(() => {
    const baseDate = new Date(dateOfDemise);
    if (isNaN(baseDate.getTime())) {
      return null;
    }

    const addDays = (days: number) => {
      const result = new Date(baseDate);
      result.setDate(result.getDate() + days);
      return result;
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const demise = new Date(baseDate);
    demise.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - demise.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const day21Date = addDays(21);
    const day30Date = addDays(30);
    const day90Date = addDays(90);
    const day180Date = addDays(180);

    const daysRemaining21 = 21 - daysElapsed;
    const daysRemaining30 = 30 - daysElapsed;
    const daysRemaining90 = 90 - daysElapsed;

    return {
      daysElapsed,
      day21Str: formatDate(day21Date),
      day30Str: formatDate(day30Date),
      day90Str: formatDate(day90Date),
      day180Str: formatDate(day180Date),
      daysRemaining21,
      daysRemaining30,
      daysRemaining90,
    };
  }, [dateOfDemise]);

  // Toggle item completion
  const toggleItem = (id: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reset checklist progress
  const resetChecklist = () => {
    setCompletedItems({});
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    return COMPLIANCE_ITEMS.filter((item) => {
      // Phase filtering
      if (selectedPhase === "warnings") {
        if (!item.isDoNotCancel) return false;
      } else if (selectedPhase !== "all") {
        if (item.phase !== selectedPhase) return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inAuth = item.authority.toLowerCase().includes(q);
        const inDocs = item.requiredDocs.some((d) => d.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inAuth && !inDocs) return false;
      }

      return true;
    });
  }, [selectedPhase, searchQuery]);

  // Progress metrics
  const completedCount = useMemo(() => {
    return Object.values(completedItems).filter(Boolean).length;
  }, [completedItems]);

  const progressPercentage = Math.round((completedCount / COMPLIANCE_ITEMS.length) * 100);

  // Copy template snippets
  const copyRtoNoticeToClipboard = () => {
    const text = `FORM 31 INTIMATION OF DEATH OF REGISTERED OWNER TO RTO (RULE 56(1) CMVR 1989):

To,
The Regional Transport Officer (RTO),
[RTO Location / Code, e.g., MH-02 / DL-01],
[City, State, Pin Code]

Subject: Intimation of Demise of Registered Owner of Motor Vehicle Registration No: [Insert Vehicle No., e.g., DL 3C AB 1234] under Rule 56(1) of Central Motor Vehicles Rules, 1989.

Respected Sir/Madam,

I, [Your Full Legal Name], son/daughter/spouse of [Father's/Spouse's Name], residing at [Your Complete Address], do hereby formally intimate your good office regarding the sad demise of the registered owner of the motor vehicle detailed herein:

1. Registration Number of Vehicle: [e.g., DL 3C AB 1234]
2. Class of Vehicle: [e.g., Motor Car / Two-Wheeler]
3. Engine Number: [Insert Engine No.]
4. Chassis Number: [Insert Chassis No.]
5. Name of Deceased Registered Owner: [Full Name of Deceased Parent/Spouse]
6. Date of Demise: [DD/MM/YYYY] at [Place of Demise]

In accordance with Rule 56(1) of the Central Motor Vehicles Rules, 1989, I have succeeded to the possession of the said motor vehicle as the legal heir / surviving spouse / designated legatee.

I am intimating your office within the prescribed period of thirty (30) days from the date of demise. The formal application for transfer of ownership in Form 31, accompanied by the requisite consent of all surviving legal heirs, original Registration Certificate, and verification fees, shall be submitted within three (3) months as required under Rule 56(2).

Enclosures:
1. Certified True Copy of Municipal Death Certificate (Reg No: _____________)
2. Self-Attested Copy of Applicant's Aadhaar Card & Driving License
3. Copy of Vehicle Registration Certificate (RC) & Comprehensive Insurance Certificate

Date: [DD/MM/YYYY]
Place: [City]

Yours Faithfully,

[Signature]
[Your Full Name]
[Address]`;
    navigator.clipboard.writeText(text);
    setCopiedRto(true);
    setTimeout(() => setCopiedRto(false), 3000);
  };

  const copyBankClaimToClipboard = () => {
    const text = `DECEASED DEPOSITOR CLAIM INTIMATION LETTER TO BANK BRANCH MANAGER:

To,
The Branch Manager,
[Bank Name, e.g., State Bank of India / HDFC Bank],
[Branch Address / City]

Subject: Intimation of Death of Account Holder Late [Deceased Full Name] & Claim Settlement for Account No(s): [Insert Account No(s)] under RBI Master Directions.

Respected Sir/Madam,

I regret to inform you that your esteemed customer, Late [Full Name of Deceased], holding Savings/Current Account No(s): [Account Number(s)] and Fixed Deposit No(s): [FD Numbers, if any] at your branch, departed for his/her heavenly abode on [Date of Demise] at [Place].

I, the undersigned [Your Full Name], residing at [Your Address], am the registered Nominee / surviving Class I Legal Heir of the deceased.

As per Reserve Bank of India (RBI) Master Direction on Settlement of Claims in respect of Deceased Depositors:
1. Where valid nomination exists under Section 45ZA of the Banking Regulation Act, 1949, the bank is mandated to settle the deposit proceeds within 15 days upon receipt of claim forms and death certificate, without insisting on court probate or succession certificates.
2. Please provide the standardized Bank Deceased Claim Dossier (Form DA-2 / Claim Form) along with the checklist of required indemnity bonds.

Kindly note that the primary account should not be closed until pending statutory dues, insurance receipts, and terminal transfers are completed.

Enclosures:
1. Self-Attested Copy of Municipal Death Certificate
2. Copy of Account Passbook / Statement
3. KYC Documents of Claimant (Aadhaar & PAN)

Date: [DD/MM/YYYY]
Place: [City]

Yours Sincerely,

[Signature]
[Your Full Name]`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const copyMasterChecklistToClipboard = () => {
    const text = `POST-DEATH 20-POINT MASTER COMPLIANCE DOSSIER CHECKLIST (INDIA):

PHASE 1: IMMEDIATE EVIDENCE & DIGNITY (DAYS 1 TO 7)
[ ] 1. Medical Certificate of Cause of Death (MCCD Form 4 / 4A from hospital)
[ ] 2. Cremation Ground / Cemetery Stamped Receipt with Register Entry No.
[ ] 3. Police Inquest Panchnama & Post-Mortem Report (if accidental / unnatural demise)
[ ] 4. Consolidate Original Identity Documents in Secure Dossier (Aadhaar, PAN, Passport, DL)
[ ] 5. Block Credit Cards & ATM Debit Cards with Banks
[ ] 6. CRITICAL: Maintain Active Recharge on Aadhaar-Linked SIM Card (DO NOT DEACTIVATE!)
[ ] 7. Intimate Employer HR for Corporate Life Insurance, Gratuity & Terminal Pay

PHASE 2: MUNICIPAL REGISTRATION & TERM CLAIMS (DAYS 8 TO 21)
[ ] 8. File Death Registration with Municipal Registrar within Strict 21-Day Cutoff (RBD Act s. 8)
[ ] 9. Procure 15 to 20 Digitally Signed / Stamped Official Copies of Death Certificate
[ ] 10. Submit Written Life Insurance Claim Notices (LIC / Private Insurers Form 1)
[ ] 11. Locate Original Last Will and Testament, Codicils, or Bank Safe Locker Keys
[ ] 12. Notify Cooperative Housing Society (CHS) Managing Committee / Landlord

PHASE 3: RTO STATUTORY NOTICES & FINANCIAL ASSETS (DAYS 22 TO 90)
[ ] 13. File Vehicle Demise Intimation Notice with RTO within Strict 30 Days (CMVR Rule 56(1))
[ ] 14. File Form GST REG-16 Cancellation within 30 Days (if deceased was Sole Proprietor)
[ ] 15. Submit Bank Deceased Depositor Claim Forms under RBI 15-Day Nominee Rules
[ ] 16. File EPFO Composite Claim Forms: EDLI Life Cover (up to ₹7L), PF Balance & EPS-95 Pension
[ ] 17. Submit Demat & Mutual Fund Transmission Requests to RTAs (CAMS/KFintech) & Brokers
[ ] 18. Complete Formal Vehicle RC Ownership Transfer in Form 31 within 3 Months (CMVR Rule 56(2))

PHASE 4: REVENUE MUTATION, TAXES & CLOSURE (DAYS 91 TO 365)
[ ] 19. Apply for Land & Real Estate Mutation (7/12, Khata, Jamabandi, Municipal Records)
[ ] 20. Procure Legal Heir Certificate (Tehsildar) or Court Succession Certificate / Probate
[ ] 21. Register as Legal Representative on Income Tax Portal & File Section 159 ITR
[ ] 22. Transfer Utility Meters (Power, Gas, Water) & Surrender PAN Only After All Refunds Credit`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Strictly matching reference)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>RBD ACT 1969 • CMVR RULE 56 • INCOME TAX ACT SECTION 159</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Post-Death Legal Formalities Checklist &amp; 30-Day Tracker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Navigate the 20+ statutory deadlines after the death of a family member in India.
            Track <strong>21-day death registration</strong>, <strong>30-day RTO Form 31 notices</strong>,
            bank nominee transmissions, and critical document preservation rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-compliance-tracker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Compliance Tracker</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">21 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RBD ACT DEATH REGISTRATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CMVR RTO FORM 31 NOTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 159</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LEGAL REPRESENTATIVE ITR
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Active</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RETAIN PAN &amp; SIM OTPs
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
                Governed under Registration of Births and Deaths Act, 1969, Central Motor Vehicles Rules,
                1989 Rule 56, Income Tax Act, 1961 Section 159, and RBI Master Directions on Deceased
                Depositors.
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
                <span>EXECUTIVE BRIEF: POST-DEATH COMPLIANCE MANDATES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 21-Day Registration Window:</strong> Death must be reported to the local
                    Municipal Corporation or Gram Panchayat within 21 days under Section 8 of the RBD Act,
                    1969 to avoid SDM magistrate verification orders and late fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory 30-Day Vehicle Intimation:</strong> Under Rule 56(1) of CMVR, the
                    successor must notify the RTO of the owner demise within 30 days. Transfer application
                    in Form 31 must follow within 3 months.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>DO NOT Surrender PAN or SIM Card:</strong> Deactivating the deceased&apos;s PAN card
                    or Aadhaar-linked mobile SIM locks 2FA access for DigiLocker, banking portals, and Section
                    159 income tax return filings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>RBI 15-Day Nominee Settlement:</strong> When a bank account has a registered
                    nominee, banks must release funds within 15 days without demanding court probate or
                    succession certificates under RBI guidelines.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL BANNER (Generated OG Image - Clearly Visible) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/images/post-death-30-day-legal-compliance-tracker.jpg"
                  alt="Post-Death 30-Day Legal Compliance Tracker India Checklist"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span>Verified Legal Roadmap for Bereaved Families Across India</span>
                </div>
                <span className="font-semibold text-slate-500">Updated for FY 2024–25 &amp; 2025–26</span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="overview-statutory-mandates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Post-Death Legal Formalities in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a family member passes away in India, grieving relatives face more than 20 legal,
                  banking, and statutory compliance deadlines. Many families believe they only need to obtain
                  a death certificate and visit the local bank branch. However, Indian statutory codes impose
                  time-sensitive filing duties that carry legal penalties if neglected.
                </p>
                <p>
                  Under Section 8 of the <strong>Registration of Births and Deaths Act, 1969</strong>, every
                  death occurring in a household or hospital must be reported to the local Registrar within
                  21 days. If you miss this statutory window, delayed registration rules under Section 13
                  require payment of late fees, sworn affidavits, and formal permission from a Sub-Divisional
                  Magistrate (SDM) or Tehsildar.
                </p>
                <p>
                  Simultaneously, the <strong>Central Motor Vehicles Rules, 1989 (Rule 56)</strong> requires
                  the successor to intimate the Regional Transport Office (RTO) within 30 days of the vehicle
                  owner&apos;s demise. Furthermore, the <strong>Income Tax Act, 1961 (Section 159)</strong> holds
                  the legal representative personally liable for filing the deceased&apos;s final income tax return
                  and settling outstanding taxes from the inherited estate.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE COMPLIANCE TRACKER */}
            <section id="interactive-compliance-tracker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DYNAMIC COMPLIANCE ENGINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive 30-Day Post-Death Compliance Tracker
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select or enter the <strong>Date of Demise</strong> below to automatically compute all
                statutory cutoff dates, municipal deadlines, RTO notice windows, and document protection steps.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Date Input and Preset Controls */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-[#FAF7F0] to-emerald-50/40 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#C65378]" />
                        <span>Step 1: Enter Date of Demise</span>
                      </label>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Statutory deadlines are calculated automatically from this reference date.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={dateOfDemise}
                        onChange={(e) => setDateOfDemise(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      />
                    </div>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/70">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => setPresetDaysAgo(0)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetDaysAgo(7)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      7 Days Ago
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetDaysAgo(14)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      14 Days Ago
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetDaysAgo(20)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      20 Days Ago (Urgent)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetDaysAgo(28)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      28 Days Ago (RTO Notice)
                    </button>
                  </div>
                </div>

                {/* Milestone Summary Cards */}
                {calculatedMilestones && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Day 21 Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        calculatedMilestones.daysRemaining21 < 0
                          ? "bg-rose-50/80 border-rose-300 text-rose-900"
                          : calculatedMilestones.daysRemaining21 <= 5
                          ? "bg-amber-50 border-amber-300 text-amber-900"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                        <span>Day 21 Cutoff</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            calculatedMilestones.daysRemaining21 < 0
                              ? "bg-rose-200 text-rose-800"
                              : calculatedMilestones.daysRemaining21 <= 5
                              ? "bg-amber-200 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {calculatedMilestones.daysRemaining21 < 0
                            ? "Overdue"
                            : `${calculatedMilestones.daysRemaining21} Days Left`}
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold">{calculatedMilestones.day21Str}</div>
                      <div className="text-[11px] text-slate-600 mt-1">RBD Act 1969 Death Registration Deadline</div>
                    </div>

                    {/* Day 30 Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        calculatedMilestones.daysRemaining30 < 0
                          ? "bg-rose-50/80 border-rose-300 text-rose-900"
                          : calculatedMilestones.daysRemaining30 <= 7
                          ? "bg-amber-50 border-amber-300 text-amber-900"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                        <span>Day 30 Cutoff</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            calculatedMilestones.daysRemaining30 < 0
                              ? "bg-rose-200 text-rose-800"
                              : calculatedMilestones.daysRemaining30 <= 7
                              ? "bg-amber-200 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {calculatedMilestones.daysRemaining30 < 0
                            ? "Overdue"
                            : `${calculatedMilestones.daysRemaining30} Days Left`}
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold">{calculatedMilestones.day30Str}</div>
                      <div className="text-[11px] text-slate-600 mt-1">CMVR Rule 56(1) RTO Demise Intimation</div>
                    </div>

                    {/* Day 90 Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                        <span>Day 90 Cutoff</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                          {calculatedMilestones.daysRemaining90 < 0
                            ? "Overdue"
                            : `${calculatedMilestones.daysRemaining90} Days Left`}
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold">{calculatedMilestones.day90Str}</div>
                      <div className="text-[11px] text-slate-600 mt-1">Form 31 Vehicle Transfer Application</div>
                    </div>

                    {/* Day 180 Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
                        <span>6 Months</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                          Target
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold">{calculatedMilestones.day180Str}</div>
                      <div className="text-[11px] text-slate-600 mt-1">Land Mutation &amp; Succession Petitions</div>
                    </div>
                  </div>
                )}

                {/* Progress Bar & Filter Bar */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                        Checklist Completion Progress:
                      </span>
                      <span className="ml-2 text-xs font-bold text-[#C65378]">
                        {completedCount} of {COMPLIANCE_ITEMS.length} Tasks Checked ({progressPercentage}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={resetChecklist}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Dossier</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C65378] to-emerald-600 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  {/* Phase Filter Buttons & Search */}
                  <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPhase("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === "all"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        All Tasks ({COMPLIANCE_ITEMS.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPhase(1)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === 1
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Phase 1 (Days 1–7)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPhase(2)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === 2
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Phase 2 (Days 8–21)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPhase(3)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === 3
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Phase 3 (Days 22–90)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPhase(4)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === 4
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Phase 4 (Days 91–365)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPhase("warnings")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedPhase === "warnings"
                            ? "bg-amber-600 text-white"
                            : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        ⚠️ Do Not Surrender
                      </button>
                    </div>

                    {/* Search box */}
                    <div className="relative min-w-[200px]">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search tasks, documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3.5">
                  {filteredItems.map((item) => {
                    const isDone = Boolean(completedItems[item.id]);

                    return (
                      <div
                        key={item.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isDone
                            ? "bg-slate-50/70 border-slate-200 opacity-80"
                            : item.isDoNotCancel
                            ? "bg-amber-50/50 border-amber-300 ring-1 ring-amber-200/60"
                            : item.urgency === "critical"
                            ? "bg-white border-rose-200 hover:border-rose-300"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-all ${
                              isDone
                                ? "bg-emerald-600 text-white"
                                : "border-2 border-slate-300 hover:border-[#C65378] bg-white"
                            }`}
                            aria-label={`Mark ${item.title} as ${isDone ? "incomplete" : "complete"}`}
                          >
                            {isDone && <Check className="w-4 h-4" />}
                          </button>

                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                    item.isDoNotCancel
                                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                                      : item.urgency === "critical"
                                      ? "bg-rose-100 text-rose-800"
                                      : item.urgency === "high"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {item.deadlineLabel}
                                </span>
                                <span className="text-[11px] font-bold text-slate-500">{item.phaseLabel}</span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-500">{item.authority}</span>
                            </div>

                            <h3
                              className={`text-sm sm:text-base font-extrabold ${
                                isDone ? "line-through text-slate-400" : "text-slate-900"
                              }`}
                            >
                              {item.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Risk Callout */}
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-2">
                              <AlertCircle className="w-3.5 h-3.5 text-[#C65378] shrink-0 mt-0.5" />
                              <span>
                                <strong>Legal Risk if Delayed:</strong> {item.penaltyRisk}
                              </span>
                            </div>

                            {/* Action Steps & Documents Needed */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                              <div className="p-2.5 rounded-xl bg-white border border-slate-100 text-[11px] space-y-1">
                                <span className="font-bold text-slate-800 uppercase tracking-wider block">
                                  Action Steps:
                                </span>
                                <ul className="space-y-1 list-disc list-inside text-slate-600">
                                  {item.actionSteps.map((step, idx) => (
                                    <li key={idx} className="leading-snug">
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white border border-slate-100 text-[11px] space-y-1">
                                <span className="font-bold text-slate-800 uppercase tracking-wider block">
                                  Documents Required:
                                </span>
                                <ul className="space-y-1 list-disc list-inside text-slate-600">
                                  {item.requiredDocs.map((doc, idx) => (
                                    <li key={idx} className="leading-snug">
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 3: THE 3 IRREVERSIBLE MISTAKES */}
            <section id="irreversible-compliance-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT &amp; RANKING MOAT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. The 3 Irreversible Mistakes Bereaved Families Make
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Generic post-death guides instruct families to cancel every card and document immediately.
                In Indian jurisprudence, doing so causes catastrophic administrative paralysis. Understand
                the three critical assets you must <strong>never surrender early</strong>:
              </p>

              <div className="grid grid-cols-1 gap-4">
                {/* Mistake 1 */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base text-rose-900">
                    <X className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>MISTAKE #1: Surrendering the Deceased&apos;s PAN Card Immediately</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Under Section 159 of the Income Tax Act, 1961, the legal representative must file the
                    deceased&apos;s final income tax return. You cannot add a deceased person as a legal
                    representative on the Income Tax e-Filing portal if the PAN is cancelled. Furthermore,
                    mutual fund asset management companies (AMCs), stock depositories (NSDL/CDSL), and
                    sub-registrars require active PAN status to verify historical chain of title.
                  </p>
                  <div className="text-xs font-bold text-rose-900">
                    Rule: Retain the PAN card active until all tax returns, TDS refunds, and transmissions conclude.
                  </div>
                </div>

                {/* Mistake 2 */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base text-amber-900">
                    <Smartphone className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>MISTAKE #2: Deactivating the Aadhaar-Linked Mobile SIM Card</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In India, two-factor authentication (2FA) for DigiLocker, banking logins, EPF member
                    passbooks, and income tax OTPs are transmitted exclusively to the mobile number registered
                    with Aadhaar. If you cancel or let the prepaid SIM lapse, accessing these essential digital
                    services requires months of physical affidavit verification.
                  </p>
                  <div className="text-xs font-bold text-amber-900">
                    Rule: Maintain a basic validity recharge on the SIM card for at least 12 to 18 months.
                  </div>
                </div>

                {/* Mistake 3 */}
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base text-blue-900">
                    <Landmark className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>MISTAKE #3: Closing the Primary Bank Account Prematurely</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Many terminal entitlements, including employer gratuity payouts, pending salary credits,
                    accrued dividends, insurance claim checks, and income tax refunds, are credited directly
                    into the deceased&apos;s primary bank account via ECS/NEFT. While debit cards must be blocked,
                    the account itself should remain open until all inflows have successfully cleared.
                  </p>
                  <div className="text-xs font-bold text-blue-900">
                    Rule: Freeze cards to stop fraud, but leave account active for transmission processing.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: PHASE 1 DAYS 1 TO 7 */}
            <section id="phase-1-immediate-actions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>CHRONOLOGICAL MILESTONES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Phase 1: Days 1 to 7 Immediate Evidence &amp; Medical Records
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The first 7 days require compassionate dignity alongside meticulous evidence gathering.
                  If death occurs in a hospital, request the attending physician to issue the Medical
                  Certificate of Cause of Death in <strong>Form 4</strong>. If the demise takes place at
                  home, call a registered medical practitioner to inspect the deceased and issue <strong>Form 4A</strong>.
                </p>
                <p>
                  At the crematorium or burial ground, verify that the entry clerk logs the full legal name
                  matching the deceased&apos;s government identity card. Obtain the stamped cremation receipt.
                  Municipal registration portals mandate this receipt number as verification before issuing
                  the official death certificate.
                </p>
                <p>
                  Simultaneously, notify credit card issuers to block cards. Credit card liabilities in India
                  are personal and unsecured; legal heirs are not personally liable from their own pocket.
                  Card debt can only be satisfied from the deceased&apos;s unencumbered estate.
                </p>
              </div>
            </section>

            {/* SECTION 5: PHASE 2 DAYS 8 TO 21 */}
            <section id="phase-2-registration-window" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calendar className="w-4 h-4" />
                <span>MUNICIPAL FILINGS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Phase 2: Days 8 to 21 Municipal Death Registration
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The 21-day mark under Section 8 of the Registration of Births and Deaths Act is the most
                  critical statutory cutoff. Most municipal corporations (such as MCD in Delhi, BMC in Mumbai,
                  or BBMP in Bangalore) process institutional hospital deaths automatically. However, for
                  home deaths, family members must file the application directly via the Civil Registration
                  System (CRS) portal at <strong>crsorgi.gov.in</strong>.
                </p>
                <p>
                  Once the certificate is registered, order at least <strong>15 to 20 official copies</strong>.
                  Each bank, insurance provider, mutual fund registrar, housing society, and RTO requires
                  either an original stamped copy or a verifiable QR-coded digital printout. Ordinary photocopies
                  are routinely declined by financial compliance officers.
                </p>
                <p>
                  During this window, also search for the deceased&apos;s Last Will and Testament. If a Will exists,
                  review whether court probate is mandatory. In the presidential towns of Mumbai, Kolkata,
                  and Chennai, Section 213 of the Indian Succession Act mandates court probate for immovable
                  properties bequeathed by Hindu, Buddhist, Sikh, or Jain testators.
                </p>
              </div>
            </section>

            {/* SECTION 6: PHASE 3 DAYS 22 TO 90 */}
            <section id="phase-3-rto-and-bank-claims" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Car className="w-4 h-4" />
                <span>STATUTORY NOTICES &amp; CLAIMS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Phase 3: Days 22 to 90 RTO Notice &amp; Asset Claims
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Phase 3 brings two rigid 30-day compliance cutoffs that many families overlook. First,
                  under Rule 56(1) of the Central Motor Vehicles Rules, the successor in possession of any
                  motor vehicle must notify the RTO in writing within 30 days. Second, if the deceased operated
                  a sole proprietorship with a GSTIN, an application for cancellation in <strong>Form GST REG-16</strong>
                  must be submitted within 30 days to avoid automated tax penalty notices.
                </p>
                <p>
                  For bank accounts, submit deceased claim dossiers under RBI guidelines. If a registered
                  nominee exists under Section 45ZA of the Banking Regulation Act, banks are legally required
                  to settle the balance within 15 days of receiving the claim form and death certificate.
                </p>
                <p>
                  For demat accounts and mutual funds, submit transmission packets to depository participants
                  and RTAs (CAMS / KFintech). Where nominees are registered, submission of the Client Master
                  List (CML) and transmission request form completes the transfer into the nominee&apos;s demat ledger.
                </p>
              </div>
            </section>

            {/* SECTION 7: PHASE 4 DAYS 91 TO 365 */}
            <section id="phase-4-mutation-and-tax" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>LAND MUTATION &amp; ESTATE CLOSURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Phase 4: Days 91 to 365 Land Mutation &amp; Section 159 ITR
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Phase 4 centers on real estate title mutation and final tax compliance. For inherited houses,
                  apartments, and agricultural land, heirs must apply for mutation in local land records (7/12
                  extract, Jamabandi, or Khata). Mutation does not confer title, but it updates municipal tax
                  ledgers and enables legal heirs to pay property taxes and execute utility meter transfers.
                </p>
                <p>
                  Under Section 159 of the Income Tax Act, 1961, the appointed legal representative must file
                  the deceased&apos;s final Return of Income. This return accounts for all income earned from April
                  1 of the relevant financial year up to the exact date of death. The legal representative must
                  first register on the Income Tax e-filing portal by uploading the death certificate and proof
                  of legal heirship.
                </p>
                <p>
                  Only after the Assessing Officer completes processing of the Section 159 return and all tax
                  refunds have cleared into the bank account should the deceased&apos;s PAN card be formally
                  surrendered.
                </p>
              </div>
            </section>

            {/* SECTION 8: STRUCTURED COMPARISON TABLE */}
            <section id="cancel-vs-retain-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>COMPARISON MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Document Guide: What to Cancel vs What to Retain
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this structured comparison matrix to understand exactly which records to block immediately
                versus which documents must be retained active until estate transmission concludes:
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 sm:p-4">Document / Asset</th>
                      <th className="p-3.5 sm:p-4">Immediate Action</th>
                      <th className="p-3.5 sm:p-4">Mandatory Retention</th>
                      <th className="p-3.5 sm:p-4">Statutory Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">PAN Card</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800">
                          DO NOT CANCEL
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Until Section 159 ITR Clears</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Required for legal representative e-filing login, IT refunds, bank KYC, and property sale deeds.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Aadhaar-Linked SIM</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                          RETAIN ACTIVE
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">12 to 18 Months</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Receives 2FA verification OTPs for DigiLocker, net banking, EPFO UAN, and demat accounts.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Primary Bank Account</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800">
                          FREEZE CARDS ONLY
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">6 to 12 Months</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Must remain open to receive insurance claims, employer gratuity, pension arrears, and tax refunds.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Credit Cards</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800">
                          CANCEL IMMEDIATELY
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Days 1 to 7</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Stops automated subscription debits and fraud; unsecured personal debt dies with the individual.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Driving License</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-800">
                          SURRENDER TO RTO
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Within 90 Days</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Surrendered alongside Form 31 vehicle transfer to remove driver records from the Sarathi database.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Indian Passport</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800">
                          CANCEL BUT RETAIN
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Permanent Retention</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Cancel at RPO; retain physical booklet as permanent genealogical and visa proof for NRI heirs.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Voter ID (EPIC)</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-800">
                          SUBMIT FORM 7
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Within 90 Days</td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600">
                        Deletes voter entry from electoral roll to prevent voter impersonation and electoral roll misuse.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: BANK ACCOUNTS & RBI GUIDELINES */}
            <section id="bank-nominee-vs-legal-heir" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CreditCard className="w-4 h-4" />
                <span>BANKING JURISPRUDENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Bank Accounts &amp; RBI Deceased Depositor Guidelines
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical legal distinction under Indian law is that a <strong>bank nominee is not the owner</strong>
                  of deposit proceeds. In landmark decisions including <em>Ram Chander Talwar v. Devinder Kumar Talwar</em>
                  and <em>Sarbati Devi v. Usha Devi</em>, the Supreme Court ruled that a nominee is merely a
                  statutory trustee authorized to receive funds to discharge the bank from liability.
                </p>
                <p>
                  The nominee holds the money in trust for the benefit of all legal heirs entitled to succeed
                  under the Indian Succession Act or the deceased&apos;s Last Will and Testament. If a nominee
                  appropriates the funds without sharing them with other co-heirs, the remaining heirs can
                  file a suit for recovery and partition.
                </p>
                <p>
                  For accounts without nomination, RBI Master Directions permit banks to settle claims under
                  a simplified threshold (ranging from ₹50,000 to ₹5,00,000 depending on bank rules) by
                  submitting an Indemnity Bond and Affidavit. If the deposit exceeds this limit, banks may
                  require a formal court-issued Succession Certificate or Letters of Administration.
                </p>
              </div>
            </section>

            {/* SECTION 10: MOTOR VEHICLE RTO RULES */}
            <section id="motor-vehicle-rto-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Car className="w-4 h-4" />
                <span>MOTOR VEHICLE RULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Motor Vehicle Transfer: CMVR Rule 56 &amp; Form 31
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Vehicle succession is governed under <strong>Rule 56 of the Central Motor Vehicles Rules, 1989</strong>.
                  The rule establishes a dual-stage compliance timeline:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Stage 1 (Within 30 Days):</strong> The person who takes possession of the vehicle
                    must notify the RTO where the vehicle is registered regarding the owner&apos;s death.
                  </li>
                  <li>
                    <strong>Stage 2 (Within 3 Months):</strong> The successor must submit a formal application
                    for transfer of ownership using Form 31, accompanied by the death certificate, original RC,
                    valid insurance, and no-objection certificates (NOCs) from all other legal heirs.
                  </li>
                </ul>
                <p>
                  Driving a deceased person&apos;s vehicle without intimating the RTO carries severe legal exposure.
                  Under the Motor Vehicles Act, 1988, if an uninsured or unregistered vehicle is involved in a
                  fatal collision, insurance companies repudiate third-party liability claims, leaving the driver
                  and heirs personally liable for court compensation decrees.
                </p>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL TEMPLATES */}
            <section id="legal-intimation-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE LEGAL ASSETS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Legal Notice Templates &amp; Claim Forms
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these verified statutory notice templates to communicate with transport authorities,
                bank branch managers, and insurance companies:
              </p>

              {/* Template 1: RTO Notice */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    CMVR Rule 56(1) Form 31 Intimation Notice to RTO
                  </div>
                  <button
                    type="button"
                    onClick={copyRtoNoticeToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedRto ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notice</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`To, The Regional Transport Officer (RTO), [RTO Code, e.g., MH-02 / DL-01]
Subject: Intimation of Demise of Registered Owner of Vehicle No: [Vehicle Number] under Rule 56(1) CMVR 1989.

Respected Sir/Madam,
I, [Your Name], residing at [Your Address], hereby intimate your office regarding the demise of Late [Deceased Full Name] on [Date of Demise], who was the registered owner of motor vehicle bearing registration number [Vehicle Number].

I have succeeded to the possession of the said vehicle as legal heir. This intimation is submitted within thirty (30) days of demise under Rule 56(1). Formal transfer application in Form 31 shall follow within three (3) months under Rule 56(2).

Enclosed: Copy of Municipal Death Certificate, Vehicle RC, and Applicant ID proof.`}
                </pre>
              </div>

              {/* Template 2: Bank Intimation */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    RBI Deceased Depositor Claim Intimation to Bank Manager
                  </div>
                  <button
                    type="button"
                    onClick={copyBankClaimToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBank ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Letter</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`To, The Branch Manager, [Bank Name], [Branch Address]
Subject: Intimation of Demise of Account Holder Late [Deceased Name] & Settlement of Account No: [Account No].

Respected Sir/Madam,
I regret to inform you that Late [Deceased Name], holding Account No: [Account Number] at your branch, passed away on [Date of Demise]. As the registered nominee under Section 45ZA of the Banking Regulation Act, 1949 / surviving legal heir, I request the standardized claim dossier for transmission of deposit proceeds.

Please ensure the primary account remains active to receive pending statutory and insurance credits before final closure.

Enclosed: Certified Copy of Death Certificate, Passbook Copy, and Claimant KYC.`}
                </pre>
              </div>

              {/* Template 3: Master Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Master 20-Point Post-Death Compliance Checklist
                  </div>
                  <button
                    type="button"
                    onClick={copyMasterChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
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
                <p className="text-xs text-slate-600">
                  Click the copy button above to copy the complete 20-point chronological compliance checklist
                  into your notes, email, or WhatsApp to coordinate with family members.
                </p>
              </div>
            </section>

            {/* SECTION 12: PROFESSIONAL SUCCESSION SUPPORT & ADVOCATE REVIEW */}
            <section id="advocate-succession-support" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>INTERACTIVE TOOLS &amp; SUCCESSION SERVICES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Professional Succession Support &amp; Advocate Review
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Handling post-death compliance often uncovers complex estate challenges. Explore our
                companion succession micro-tools and legal services:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/services/succession-certificate"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs flex items-start gap-3 group"
                >
                  <Gavel className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Succession Certificate Services
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Court petitions for claiming frozen bank deposits, securities, and insurance without nomination.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tools/bank-deceased-claim-document-checklist-generator"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs flex items-start gap-3 group"
                >
                  <Building2 className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Bank Deceased Claim Generator
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Generate customized bank claim checklists and indemnity drafts for SBI, HDFC, and ICICI.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tools/demat-mutual-fund-transmission-document-finder"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs flex items-start gap-3 group"
                >
                  <TrendingUp className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Demat &amp; Mutual Fund Finder
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      SEBI transmission rules, Annexure formats, and RTA requirements for shares and mutual funds.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#C65378] transition-all shadow-xs flex items-start gap-3 group"
                >
                  <Calculator className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Probate Court Fee Calculator
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Calculate state-specific ad valorem court fees for high court probate and letters of administration.
                    </p>
                  </div>
                </Link>
              </div>

              {/* Tools Hub & Consultation Links */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-extrabold text-sm sm:text-base">Explore All Interactive Succession Tools</div>
                  <div className="text-xs text-white/80 mt-0.5">
                    Browse our complete suite of 20 statutory calculators, checkers, and checklists.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/tools"
                    className="px-4 py-2 rounded-full bg-white text-[#172228] hover:bg-slate-100 text-xs font-bold transition-colors"
                  >
                    View Tools Hub
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors"
                  >
                    Consult Advocates
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Post-Death Compliance
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL AUTHORITIES &amp; PORTALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Governing Acts, Landmark Rulings &amp; Official Portals
              </h2>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>Statutory Framework:</strong> Registration of Births and Deaths Act, 1969 (Act No.
                  18 of 1969); Central Motor Vehicles Rules, 1989 (Rule 56 &amp; Form 31); Income Tax Act, 1961
                  (Section 159, 168 &amp; 234F); Banking Regulation Act, 1949 (Section 45ZA); Central Goods and
                  Services Tax Act, 2017 (Section 29 &amp; Rule 20).
                </p>
                <p>
                  <strong>Judicial Precedents:</strong> <em>Ram Chander Talwar &amp; Anr. v. Devinder Kumar Talwar</em>
                  (2010) 10 SCC 671 (Supreme Court of India on nominee trustee status); <em>Sarbati Devi v. Usha Devi</em>
                  AIR 1984 SC 346 (Insurance policy nominee rights); <em>CIT v. Manjula J. Shah</em> (2013) 355 ITR 474
                  (Holding period aggregation for inherited capital assets).
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-[11px] font-bold text-slate-700">
                  <a
                    href="https://crsorgi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#C65378]"
                  >
                    <span>CRS Civil Registration Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://parivahan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#C65378]"
                  >
                    <span>Parivahan Sewa (RTO)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#C65378]"
                  >
                    <span>Income Tax e-Filing (Sec 159)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#C65378]"
                  >
                    <span>RBI Deceased Depositor Guidelines</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
                Specialist in Indian testamentary law, post-death legal compliance, bank transmission
                litigation, High Court probate petitions, and Section 159 representation.
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
                  <span>PROTECT YOUR FAMILY BEFORE CRISIS HITS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Spare Your Children from 20+ Succession Bottlenecks
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally drafted Will names clear executors, appoints testamentary guardians, and
                  establishes undisputed ownership shares for smooth asset transmission.
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
                  <span>Legally Enforceable &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SUCCESSION &amp; CLAIM DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Frozen Bank Accounts or Delayed RTO Notice?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates represent families across India in bank deceased claims, SDM delayed
                  death registration orders, and succession petitions.
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
                  Why Bereaved Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dynamic Date Engine:</strong> Calculates statutory cutoffs based on exact date of demise.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Identity Preservation Moat:</strong> Prevents premature PAN surrender and SIM deactivation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Ready-to-Use Notice Drafts:</strong> Copy-pasteable legal notices for RTO and banks.
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
          href="#interactive-compliance-tracker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Launch Tracker</span>
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
