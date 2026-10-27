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
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Scale,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Copy,
  CheckCheck,
  FileText,
  Layers,
  Coins,
  MapPin,
  Building2,
  Info,
  Calendar,
  Download,
  AlertCircle,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
  Search,
  UserCheck,
  Printer,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Statutory Rules: Indian Contract Act & RBI Directives" },
  { id: "comparison-claim-pathways", label: "2. Claim Pathways: Nominee vs Indemnity Bond vs Probate" },
  { id: "interactive-bond-selector", label: "3. Interactive Indemnity Bond Format & Clause Selector" },
  { id: "bank-account-indemnity-template", label: "4. Format 1: Bank Deceased Account Claim Indemnity Bond" },
  { id: "bank-locker-indemnity-template", label: "5. Format 2: Bank Locker Claim Indemnity Bond Template" },
  { id: "two-surety-guarantee-clause", label: "6. Two-Surety Guarantee & Solvent Undertaking Clause" },
  { id: "noc-disclaimer-affidavit", label: "7. Format 3: Legal Heir NOC & Affidavit of Disclaimer" },
  { id: "state-stamp-paper-table", label: "8. State Stamp Duty Denominations for Indemnity Bonds" },
  { id: "step-by-step-settlement-sop", label: "9. Step-by-Step SOP: Settling Bank Deceased Balances" },
  { id: "rbi-thresholds-bank-matrix", label: "10. Bank-Wise Threshold Limits for Deceased Claims" },
  { id: "common-rejection-mistakes", label: "11. Common Reasons Banks Reject Deceased Claim Bonds" },
  { id: "practical-case-scenarios", label: "12. Real Settlement Case Studies: SBI, HDFC & PNB" },
  { id: "institutional-profile", label: "13. Legal Review & Advocate Backing by AMA Solutions" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Bank Deceased Claims" },
  { id: "statutory-citations", label: "15. Statutory Citations & Official Banking Circulars" },
];

const FAQS = [
  {
    q: "What is an Indemnity Bond for a deceased bank account claim?",
    a: "An Indemnity Bond is a legally binding contract executed under Section 124 of the Indian Contract Act, 1872. The claiming legal heirs promise to protect and compensate the bank against any financial loss, damages, or legal expenses if another heir or third party later disputes the payout.",
  },
  {
    q: "When does an Indian bank require an Indemnity Bond instead of a Succession Certificate?",
    a: "When a depositor dies without a registered nominee or survivor clause, commercial banks allow claims on an Indemnity Bond with two solvent sureties up to board-approved threshold limits (typically ₹1 Lakh to ₹5 Lakhs). If the balance exceeds this limit or rival claims exist, banks require a court-issued Succession Certificate.",
  },
  {
    q: "Who is eligible to act as a surety on a deceased depositor indemnity bond?",
    a: "A surety must be an independent adult Indian citizen of verifiable financial solvency who is not a claimant legal heir. Banks usually require sureties to maintain active accounts in the same bank, hold permanent employment, or provide recent Income Tax Returns (ITR) proving net worth equal to or greater than the claim amount.",
  },
  {
    q: "What is the non-judicial stamp paper value required for an indemnity bond?",
    a: "Stamp duty is governed by state stamp legislation. In Maharashtra, it is ₹500 under Article 35 of the Maharashtra Stamp Act. In Delhi, Uttar Pradesh, Tamil Nadu, and West Bengal, it is typically ₹100 under Article 34 of the Indian Stamp Act. In Karnataka, it is ₹200. The document must be executed on non-judicial stamp paper and notarized.",
  },
  {
    q: "Does a nominee need to submit an indemnity bond to withdraw deceased funds?",
    a: "No. Under Section 45ZA of the Banking Regulation Act, 1949 and RBI directives, payment to a valid registered nominee gives the bank a complete statutory discharge. Banks cannot legally demand an indemnity bond, surety, or succession certificate from a registered nominee unless a civil court has issued an injunction.",
  },
  {
    q: "Can one legal heir claim the entire bank balance if other heirs sign an NOC?",
    a: "Yes. When multiple legal heirs survive, they can execute a notarized Affidavit of Disclaimer or No Objection Certificate (NOC) relinquishing their claim in favor of one designated claimant heir. The claimant heir then submits the Indemnity Bond and receives the full payout on behalf of the family.",
  },
  {
    q: "What is the difference between an Indemnity Bond and a court Succession Certificate?",
    a: "An Indemnity Bond is an out-of-court contractual settlement executed within days on non-judicial stamp paper with sureties. A Succession Certificate is a formal court decree issued by a civil judge under Section 372 of the Indian Succession Act, 1925, requiring 6 to 18 months, newspaper citations, and 2% to 4% ad valorem court fees.",
  },
  {
    q: "Is an indemnity bond required for claiming contents of a deceased bank locker?",
    a: "Yes. When a safe deposit locker has no registered nomination, banks require an Indemnity Bond with two sureties along with a formal inventory undertaking before opening the locker in the presence of legal heirs, bank officials, and independent witnesses.",
  },
  {
    q: "What happens if an undisclosed legal heir later files a claim with the bank?",
    a: "Under Sections 124 and 128 of the Indian Contract Act, 1872, the signing legal heirs and their sureties are jointly and severally liable. The bank can legally recover all disputed amounts, litigation expenses, and interest directly from the indemnifiers and sureties.",
  },
  {
    q: "How long do banks take to settle deceased claims after receiving the indemnity bond?",
    a: "Under Reserve Bank of India circular instructions, commercial banks must settle deceased depositor claims within 15 calendar days from the date of submission of complete claim documents, including the duly stamped indemnity bond, surety affidavits, and legal heir proofs.",
  },
];

const STATE_STAMP_DUTY_DATA = [
  { state: "Maharashtra", article: "Article 35, Maharashtra Stamp Act", stampValue: "₹500", mode: "e-Stamp Paper / Franking", notes: "Mandatory notarization with advocate identification." },
  { state: "Delhi (NCT)", article: "Article 34, Indian Stamp Act (Delhi)", stampValue: "₹100", mode: "Stock Holding (SHCIL) e-Stamp", notes: "Standard indemnity bond denomination across all branches." },
  { state: "Karnataka", article: "Article 29, Karnataka Stamp Act", stampValue: "₹200", mode: "e-Stamp Certificate", notes: "Must mention bank branch as second party." },
  { state: "Uttar Pradesh", article: "Article 34, Schedule 1-B, UP Stamp Act", stampValue: "₹100", mode: "e-Stamp Paper", notes: "Affidavit-cum-Indemnity often combined on ₹100 stamp." },
  { state: "Tamil Nadu", article: "Article 34, Indian Stamp Act (TN)", stampValue: "₹100", mode: "Non-Judicial / e-Stamp", notes: "Sureties must sign before Notary Public." },
  { state: "West Bengal", article: "Article 34, Indian Stamp Act (WB)", stampValue: "₹100", mode: "GRIPS e-Challan / Stamp Paper", notes: "Requires two local resident sureties." },
  { state: "Telangana", article: "Article 34, Indian Stamp Act (TS)", stampValue: "₹100", mode: "IGRS Telangana e-Stamp", notes: "Accepted across public and private sector banks." },
  { state: "Gujarat", article: "Article 33, Gujarat Stamp Act", stampValue: "₹300", mode: "e-Stamping / Franking", notes: "Requires proof of solvency for both sureties." },
  { state: "Rajasthan", article: "Article 34, Rajasthan Stamp Act", stampValue: "₹500", mode: "e-Gras Rajasthan e-Stamp", notes: "Recent amendment fixed standard indemnity at ₹500." },
  { state: "Haryana & Punjab", article: "Article 34, Indian Stamp Act", stampValue: "₹100", mode: "e-Stamp Certificate", notes: "Tehsildar legal heir certificate typically attached." },
  { state: "Kerala", article: "Article 34, Kerala Stamp Act", stampValue: "₹200", mode: "e-Stamp / Physical Stamp", notes: "Village Officer family membership certificate required." },
  { state: "Madhya Pradesh", article: "Article 34, MP Stamp Act", stampValue: "₹250", mode: "e-Panjiyan MP e-Stamp", notes: "Branch manager cross-checks surety CIBIL score." },
];

const BANK_THRESHOLDS_DATA = [
  { bank: "State Bank of India (SBI)", threshold: "₹5,00,000", documentRequirement: "Annexure-A claim, Indemnity Bond with 2 sureties, legal heir affidavit, death certificate." },
  { bank: "Punjab National Bank (PNB)", threshold: "₹2,50,000 to ₹5,00,000", documentRequirement: "Form PNB-37, Indemnity Bond on state stamp paper, 2 solvent sureties, NOC of co-heirs." },
  { bank: "HDFC Bank", threshold: "₹5,00,000", documentRequirement: "Deceased claim kit, Indemnity Agreement stamped and notarized, 2 independent account-holder sureties." },
  { bank: "ICICI Bank", threshold: "₹5,00,000", documentRequirement: "Form DA-1 claim application, Indemnity format on stamp paper, surety ITR records or salary slips." },
  { bank: "Canara Bank", threshold: "₹2,00,000 to ₹5,00,000", documentRequirement: "NF-742 format, Indemnity Bond with 2 sureties, family tree certificate issued by Revenue Authority." },
  { bank: "Bank of Baroda (BoB)", threshold: "₹2,50,000 to ₹5,00,000", documentRequirement: "Form 140, Two-surety stamped Indemnity, notarized disclaimer affidavits from other heirs." },
  { bank: "Post Office Savings Bank (DoP)", threshold: "₹5,00,000", documentRequirement: "Form SB-84, Indemnity Bond on non-judicial stamp paper, 2 sureties holding postal accounts." },
];

export default function IndemnityBondClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFormatTab, setActiveFormatTab] = useState<"account" | "locker" | "noc" | "surety">("account");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [stateSearch, setStateSearch] = useState<string>("");

  // Interactive Live Draft Customizer State
  const [claimantName, setClaimantName] = useState<string>("Rajesh Kumar Sharma");
  const [claimantRelation, setClaimantRelation] = useState<string>("Son");
  const [claimantAddress, setClaimantAddress] = useState<string>("Flat 402, Shanti Vihar, Rohini Sector 14, New Delhi - 110085");
  const [deceasedName, setDeceasedName] = useState<string>("Late Satish Kumar Sharma");
  const [dateOfDeath, setDateOfDeath] = useState<string>("15th January 2026");
  const [bankName, setBankName] = useState<string>("State Bank of India");
  const [branchName, setBranchName] = useState<string>("Rohini Sector 14 Branch, New Delhi");
  const [accountNumber, setAccountNumber] = useState<string>("30948572910");
  const [claimAmount, setClaimAmount] = useState<string>("₹3,85,420 (Rupees Three Lakh Eighty-Five Thousand Four Hundred and Twenty Only)");
  const [surety1Name, setSurety1Name] = useState<string>("Virender Nath Gupta");
  const [surety1Address, setSurety1Address] = useState<string>("B-24, Model Town, Delhi - 110009");
  const [surety2Name, setSurety2Name] = useState<string>("Dr. Arvind Trivedi");
  const [surety2Address, setSurety2Address] = useState<string>("C-110, Prashant Vihar, Delhi - 110085");

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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleCopyText = (text: string, formatKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatKey);
    setTimeout(() => setCopiedFormat(null), 3000);
  };

  // Generate Draft Text strings
  const getAccountIndemnityText = () => {
    if (isInteractiveMode) {
      return `INDEMNITY BOND FOR SETTLEMENT OF DECEASED DEPOSITOR ACCOUNT
(To be executed on Non-Judicial Stamp Paper of requisite value as per State Stamp Act and duly notarized)

THIS INDEMNITY BOND is executed on this _____ day of _______________ 2026 at ___________________,

BY:
1. ${claimantName}, aged about _____ years, ${claimantRelation} of ${deceasedName}, residing at ${claimantAddress} (hereinafter referred to as the "PRINCIPAL OBLIGOR / CLAIMANT", which expression shall unless repugnant to the context include his/her legal heirs, executors, and administrators).

IN FAVOUR OF:
${bankName}, a banking corporation constituted under the applicable banking statutes, having its Head Office at ____________________________________ and having a Branch Office amongst other places at ${branchName} (hereinafter referred to as the "BANK", which expression shall unless repugnant to the context include its successors and assigns).

AND IN THE PRESENCE OF THE FOLLOWING SURETIES:
1. ${surety1Name}, aged about _____ years, residing at ${surety1Address} (hereinafter referred to as "SURETY NO. 1");
2. ${surety2Name}, aged about _____ years, residing at ${surety2Address} (hereinafter referred to as "SURETY NO. 2");
(The Sureties and the Principal Obligor are hereinafter collectively referred to as the "OBLIGORS", which expression shall include their respective heirs, legal representatives, executors, and administrators).

WHEREAS:
1. ${deceasedName} (hereinafter referred to as the "DECEASED DEPOSITOR") maintained Savings / Current / Term Deposit Account No. ${accountNumber} with the said ${bankName}, ${branchName}.
2. The Deceased Depositor departed this life intestate on ${dateOfDeath} at ___________________ leaving behind a credit balance of ${claimAmount} standing to the credit of the said account(s).
3. The Deceased Depositor died without registering any nomination in respect of the aforesaid account(s) / the registered nominee predeceased the depositor.
4. The Principal Obligor is the legal heir of the Deceased Depositor and has submitted an application to the Bank requesting the release and payment of the net credit balance standing in the aforesaid account(s) to the Principal Obligor without production of a formal Succession Certificate or Letters of Administration from a competent Court of Law.
5. All other surviving legal heirs of the Deceased Depositor have executed separate Affidavits-cum-No Objection Certificates relinquishing their rights in favor of the Principal Obligor to receive the aforesaid proceeds.
6. The Bank has agreed to entertain the request of the Principal Obligor and release the said sum of ${claimAmount} upon the Obligors executing this Indemnity Bond with two solvent independent sureties guaranteeing to indemnify the Bank against all claims, actions, and damages.

NOW THIS INDEMNITY BOND WITNESSETH AND THE OBLIGORS HEREBY COVENANT AS FOLLOWS:
1. INDEMNITY COVENANT (Section 124, Indian Contract Act, 1872):
In consideration of the Bank paying the sum of ${claimAmount} standing to the credit of Account No. ${accountNumber} to the Principal Obligor without insisting upon a Succession Certificate or Probate from a Court of Law, the Principal Obligor and the Sureties hereby jointly and severally covenant and agree to save harmless and keep indemnified the Bank, its successors, officers, and assigns from and against all claims, demands, actions, suits, proceedings, losses, damages, costs, charges, and expenses whatsoever which the Bank may incur, suffer, or sustain by reason of making such payment to the Principal Obligor.

2. SURETY GUARANTEE & CO-EXTENSIVE LIABILITY (Sections 126 & 128, Indian Contract Act, 1872):
The Sureties hereby unconditionally and irrevocably guarantee the prompt and complete performance of all obligations undertaken by the Principal Obligor. The liability of the Sureties under this Bond shall be joint and several and co-extensive with that of the Principal Obligor. The Bank shall be entitled to proceed against the Sureties or either of them without first exhausting its remedies against the Principal Obligor.

3. REIMBURSEMENT OF COSTS & DEFENSE (Section 125, Indian Contract Act, 1872):
In the event of any third party or rival claimant instituting any legal proceedings against the Bank for recovery of the said deposit balance, the Obligors shall immediately, upon notice from the Bank, defend such suit at their own cost and expense, or reimburse to the Bank all sums, including legal counsel fees, court expenses, and any decree amount that the Bank may be compelled to pay.

4. REPRESENTATION OF LEGAL STATUS:
The Principal Obligor hereby solemnly affirms that the facts stated in the claim application are true and correct, and that there are no other legal heirs, minors, or claimants entitled to a share in the estate of the Deceased Depositor other than those disclosed to the Bank.

IN WITNESS WHEREOF, the Principal Obligor and the Sureties have executed this Indemnity Bond on the day, month, and year first written above.

SIGNATURES:

________________________________________
(PRINCIPAL OBLIGOR / CLAIMANT)
Name: ${claimantName}
Aadhaar No: _____________________________
PAN No: _________________________________

SURETIES:

1. ______________________________________
Signature of Surety No. 1
Name: ${surety1Name}
Address: ${surety1Address}
Occupation: _____________________________
Net Worth / ITR Annual Income: __________

2. ______________________________________
Signature of Surety No. 2
Name: ${surety2Name}
Address: ${surety2Address}
Occupation: _____________________________
Net Worth / ITR Annual Income: __________

WITNESSES:
1. Signature: ___________________________
   Name & Address: ______________________
2. Signature: ___________________________
   Name & Address: ______________________

ATTESTATION BEFORE NOTARY PUBLIC:
Sworn and signed before me on this _____ day of _______________ 2026 by the above-named Principal Obligor and Sureties, who are identified before me by Advocate / Documents.
[NOTARY PUBLIC SEAL, REGISTRATION NUMBER & SIGNATURE]`;
    }

    return `INDEMNITY BOND FOR SETTLEMENT OF DECEASED DEPOSITOR ACCOUNT
(To be executed on Non-Judicial Stamp Paper of requisite value as per State Stamp Act and duly notarized)

THIS INDEMNITY BOND is executed on this _____ day of _______________ 20___ at ___________________,

BY:
1. [NAME OF CLAIMANT/LEGAL HEIR], aged about _____ years, [Relationship: Son/Daughter/Spouse/Parent] of Late [NAME OF DECEASED DEPOSITOR], residing at [RESIDENTIAL ADDRESS OF CLAIMANT] (hereinafter referred to as the "PRINCIPAL OBLIGOR / CLAIMANT", which expression shall unless repugnant to the context include his/her legal heirs, executors, and administrators).

IN FAVOUR OF:
[NAME OF THE BANK], a banking corporation constituted under the applicable banking statutes, having its Head Office at [HEAD OFFICE ADDRESS] and having a Branch Office amongst other places at [BRANCH NAME & ADDRESS] (hereinafter referred to as the "BANK", which expression shall unless repugnant to the context include its successors and assigns).

AND IN THE PRESENCE OF THE FOLLOWING SURETIES:
1. [NAME OF SURETY NO. 1], aged about _____ years, residing at [ADDRESS OF SURETY NO. 1] (hereinafter referred to as "SURETY NO. 1");
2. [NAME OF SURETY NO. 2], aged about _____ years, residing at [ADDRESS OF SURETY NO. 2] (hereinafter referred to as "SURETY NO. 2");
(The Sureties and the Principal Obligor are hereinafter collectively referred to as the "OBLIGORS", which expression shall include their respective heirs, legal representatives, executors, and administrators).

WHEREAS:
1. Late [NAME OF DECEASED DEPOSITOR] (hereinafter referred to as the "DECEASED DEPOSITOR") maintained Savings / Current / Fixed Deposit Account No(s). [ACCOUNT NUMBER(S)] with the said [NAME OF BANK], [BRANCH NAME].
2. The Deceased Depositor departed this life intestate on [DATE OF DEATH] at [PLACE OF DEATH] leaving behind a credit balance of Rs. [AMOUNT IN FIGURES] (Rupees [AMOUNT IN WORDS] Only) standing to the credit of the said account(s).
3. The Deceased Depositor died without registering any nomination in respect of the aforesaid account(s) / the registered nominee predeceased the depositor.
4. The Principal Obligor is the legal heir of the Deceased Depositor and has submitted an application to the Bank requesting the release and payment of the net credit balance standing in the aforesaid account(s) to the Principal Obligor without production of a formal Succession Certificate or Letters of Administration from a competent Court of Law.
5. All other surviving legal heirs of the Deceased Depositor have executed separate Affidavits-cum-No Objection Certificates relinquishing their rights in favor of the Principal Obligor to receive the aforesaid proceeds.
6. The Bank has agreed to entertain the request of the Principal Obligor and release the said sum of Rs. [AMOUNT IN FIGURES] upon the Obligors executing this Indemnity Bond with two solvent independent sureties guaranteeing to indemnify the Bank against all claims, actions, and damages.

NOW THIS INDEMNITY BOND WITNESSETH AND THE OBLIGORS HEREBY COVENANT AS FOLLOWS:
1. INDEMNITY COVENANT (Section 124, Indian Contract Act, 1872):
In consideration of the Bank paying the sum of Rs. [AMOUNT IN FIGURES] standing to the credit of Account No(s). [ACCOUNT NUMBER(S)] to the Principal Obligor without insisting upon a Succession Certificate or Probate from a Court of Law, the Principal Obligor and the Sureties hereby jointly and severally covenant and agree to save harmless and keep indemnified the Bank, its successors, officers, and assigns from and against all claims, demands, actions, suits, proceedings, losses, damages, costs, charges, and expenses whatsoever which the Bank may incur, suffer, or sustain by reason of making such payment to the Principal Obligor.

2. SURETY GUARANTEE & CO-EXTENSIVE LIABILITY (Sections 126 & 128, Indian Contract Act, 1872):
The Sureties hereby unconditionally and irrevocably guarantee the prompt and complete performance of all obligations undertaken by the Principal Obligor. The liability of the Sureties under this Bond shall be joint and several and co-extensive with that of the Principal Obligor. The Bank shall be entitled to proceed against the Sureties or either of them without first exhausting its remedies against the Principal Obligor.

3. REIMBURSEMENT OF COSTS & DEFENSE (Section 125, Indian Contract Act, 1872):
In the event of any third party or rival claimant instituting any legal proceedings against the Bank for recovery of the said deposit balance, the Obligors shall immediately, upon notice from the Bank, defend such suit at their own cost and expense, or reimburse to the Bank all sums, including legal counsel fees, court expenses, and any decree amount that the Bank may be compelled to pay.

4. REPRESENTATION OF LEGAL STATUS:
The Principal Obligor hereby solemnly affirms that the facts stated in the claim application are true and correct, and that there are no other legal heirs, minors, or claimants entitled to a share in the estate of the Deceased Depositor other than those disclosed to the Bank.

IN WITNESS WHEREOF, the Principal Obligor and the Sureties have executed this Indemnity Bond on the day, month, and year first written above.

SIGNATURES:

________________________________________
(PRINCIPAL OBLIGOR / CLAIMANT)
Name: [NAME OF CLAIMANT]
Aadhaar No: [AADHAAR NUMBER]
PAN No: [PAN NUMBER]

SURETIES:

1. ______________________________________
Signature of Surety No. 1
Name: [NAME OF SURETY NO. 1]
Address: [ADDRESS OF SURETY NO. 1]
Occupation: [OCCUPATION / EMPLOYER]
Net Worth / ITR Annual Income: Rs. [AMOUNT]

2. ______________________________________
Signature of Surety No. 2
Name: [NAME OF SURETY NO. 2]
Address: [ADDRESS OF SURETY NO. 2]
Occupation: [OCCUPATION / EMPLOYER]
Net Worth / ITR Annual Income: Rs. [AMOUNT]

WITNESSES:
1. Signature: ___________________________
   Name & Address: ______________________
2. Signature: ___________________________
   Name & Address: ______________________

ATTESTATION BEFORE NOTARY PUBLIC:
Sworn and signed before me on this _____ day of _______________ 20___ by the above-named Principal Obligor and Sureties, who are identified before me by Advocate / Documents.
[NOTARY PUBLIC SEAL, REGISTRATION NUMBER & SIGNATURE]`;
  };

  const getLockerIndemnityText = () => {
    return `INDEMNITY BOND FOR RELEASE OF SAFE DEPOSIT LOCKER CONTENTS OF DECEASED HIRER
(To be executed on Non-Judicial Stamp Paper of requisite value as per State Stamp Act and duly notarized)

THIS INDEMNITY BOND is executed on this _____ day of _______________ 20___ at ___________________,

BY:
[NAME OF CLAIMANT/LEGAL HEIR], aged about _____ years, [Relationship] of Late [NAME OF DECEASED LOCKER HIRER], residing at [RESIDENTIAL ADDRESS] (hereinafter called the "CLAIMANT / PRINCIPAL OBLIGOR");

AND
1. [NAME OF SURETY NO. 1], residing at [ADDRESS OF SURETY NO. 1];
2. [NAME OF SURETY NO. 2], residing at [ADDRESS OF SURETY NO. 2];
(hereinafter collectively called the "SURETIES");

IN FAVOUR OF:
[NAME OF BANK], having its Branch Office at [BRANCH NAME & ADDRESS] (hereinafter called the "BANK").

WHEREAS:
1. Late [NAME OF DECEASED HIRER] was the sole hirer of Safe Deposit Locker No. [LOCKER NUMBER] maintained at the [BRANCH NAME] Branch of the Bank.
2. The Locker Hirer died intestate on [DATE OF DEATH] leaving no registered nomination in respect of the said Locker.
3. The Claimant is the legal heir of the deceased and has requested the Bank to deliver the contents of the said Locker to the Claimant without insisting on a Succession Certificate or Probate.
4. The key of the locker is available / missing (requiring break-open as per RBI operating procedure in the presence of an independent committee and valuer).
5. The Bank has agreed to permit opening of the Locker and handover of contents subject to execution of this Indemnity Bond with two solvent sureties.

NOW THIS BOND WITNESSETH AS FOLLOWS:
1. The Claimant and Sureties jointly and severally undertake to indemnify and hold harmless the Bank, its management, and officers against all claims, suits, demands, and costs arising out of opening the locker and delivering the articles to the Claimant.
2. An inventory of all articles found inside the locker shall be prepared in duplicate in the presence of two independent witnesses, the Bank Custodian, and a Government Approved Valuer (for gold/jewelry), signed by all present.
3. In case any other legal heir, creditor, or claimant establishes a legitimate title or claim over the contents, the Obligors shall reimburse the full assessed value together with legal expenses incurred by the Bank.

IN WITNESS WHEREOF, the parties hereto have set their hands on the date first mentioned above.

Principal Obligor: _______________________
Surety 1: _______________________________
Surety 2: _______________________________
Witness 1: ______________________________
Witness 2: ______________________________
[NOTARY ATTESTATION & SEAL]`;
  };

  const getNocText = () => {
    return `AFFIDAVIT-CUM-NO OBJECTION CERTIFICATE (NOC) BY LEGAL HEIRS
(To be executed on Non-Judicial Stamp Paper of Rs. 100/- or as per State Stamp Act and sworn before Notary Public)

I/We,
1. [NAME OF LEGAL HEIR 1], aged _____ years, [Relationship: Daughter/Son/Spouse], residing at [ADDRESS];
2. [NAME OF LEGAL HEIR 2], aged _____ years, [Relationship: Daughter/Son/Spouse], residing at [ADDRESS];
do hereby solemnly affirm and state on oath as under:

1. That Late [NAME OF DECEASED DEPOSITOR] passed away intestate on [DATE OF DEATH] at [PLACE OF DEATH].
2. That the Deceased was our [Father/Mother/Husband/Wife] and maintained Account No(s). [ACCOUNT NUMBERS] with [NAME OF BANK], [BRANCH NAME].
3. That the following persons are the only surviving Class-I / legal heirs of the Deceased:
   (a) [Name of Heir 1] - [Relationship] - [Age]
   (b) [Name of Heir 2] - [Relationship] - [Age]
   (c) [Name of Claimant Heir] - [Relationship] - [Age]
4. That I/We do not desire to claim any share in the credit balance of Rs. [AMOUNT] lying in the aforesaid account(s) of the Deceased.
5. That I/We have NO OBJECTION whatsoever if the entire proceeds/credit balance standing in the said account(s) are released and paid solely to [NAME OF CLAIMANT HEIR] by the Bank.
6. That the payment made by the Bank to the said [NAME OF CLAIMANT HEIR] shall be a full, valid, and absolute discharge to the Bank against all our claims and demands.

DEPONENT(S):
1. _________________________________
2. _________________________________

VERIFICATION:
Verified at [PLACE] on this _____ day of _______________ 20___ that the contents of paragraphs 1 to 6 of this Affidavit are true and correct to our knowledge. No part is false and nothing material has been concealed.
[DEPONENT SIGNATURES]
[SWORN BEFORE NOTARY PUBLIC WITH SEAL]`;
  };

  const getSuretyAffidavitText = () => {
    return `AFFIDAVIT OF SOLVENCY & NET WORTH BY INDEPENDENT SURETY
(To be executed on Non-Judicial Stamp Paper and attested before a Notary Public)

I, [NAME OF SURETY], aged about _____ years, son/daughter/wife of [FATHER/SPOUSE NAME], residing at [RESIDENTIAL ADDRESS], do hereby solemnly affirm and declare on oath as under:

1. That I am a permanent resident of India and am not a legal heir, beneficiary, or relative seeking inheritance from the estate of Late [NAME OF DECEASED DEPOSITOR].
2. That I know the claimant [NAME OF CLAIMANT] and have agreed to stand as a guarantor/surety on the Indemnity Bond for the release of deceased bank balance of Rs. [AMOUNT] from [NAME OF BANK], [BRANCH NAME].
3. That I am gainfully employed / engaged in business as [PROFESSION / DESIGNATION] at [EMPLOYER / BUSINESS NAME].
4. That my annual gross income as per my latest Income Tax Return (ITR) for Assessment Year 20___-20___ is Rs. [ANNUAL INCOME IN RUPEES].
5. That I possess immovable / movable assets having an aggregate market value exceeding Rs. [TOTAL NET WORTH VALUE IN RUPEES], free from all encumbrances.
6. That my financial solvency is sound, and I am fully capable of honoring my guarantee liability under Sections 126 and 128 of the Indian Contract Act, 1872 up to the full claim amount if called upon by the Bank.

DEPONENT
[SIGNATURE OF SURETY]

VERIFICATION:
Verified at [PLACE] on this _____ day of _______________ 20___ that the contents of this solvency affidavit are true and correct.
[NOTARY ATTESTATION & SEAL]`;
  };

  const filteredStates = STATE_STAMP_DUTY_DATA.filter((item) =>
    item.state.toLowerCase().includes(stateSearch.toLowerCase()) ||
    item.stampValue.toLowerCase().includes(stateSearch.toLowerCase()) ||
    item.article.toLowerCase().includes(stateSearch.toLowerCase())
  );

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
            <span>INDIAN CONTRACT ACT, 1872 (s. 124) • RBI DECEASED DEPOSITOR CLAIMS</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Indemnity Bond Format for Deceased Bank Account Claim
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted indemnity bond templates for settling deceased depositor bank balances and
            lockers without a Succession Certificate. Includes two-surety guarantee clauses, legal heir NOC
            affidavits, and state stamp paper denominations.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-bond-selector"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Copy Indemnity Bond Template</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 124</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIAN CONTRACT ACT 1872
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹5,00,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TYPICAL BANK THRESHOLD LIMIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY RBI DISBURSEMENT SLA
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2 Sureties</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDEPENDENT SOLVENT GUARANTORS
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
                Governed by Section 124 (Contract of Indemnity), Section 126 (Guarantee), and Section 128
                (Surety Liability) of the Indian Contract Act, 1872, read with Reserve Bank of India Master
                Circular DBOD.No.Leg.BC.21/09.07.006/2014-15.
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
                <span>EXECUTIVE BRIEF: DECEASED BANK ACCOUNT SETTLEMENT</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Out-of-Court Settlement:</strong> If a deceased family member had no nominee on
                    their bank account, an Indemnity Bond with two sureties allows legal heirs to claim funds
                    without spending months and thousands of rupees on a civil court Succession Certificate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Foundation:</strong> Under Section 124 of the Indian Contract Act, 1872,
                    claimants legally undertake to compensate the bank for any loss if another heir later files
                    a claim. Section 128 makes sureties jointly liable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>State Stamp Duty Compliance:</strong> The bond must be executed on non-judicial
                    stamp paper (e.g. ₹500 in Maharashtra and Rajasthan, ₹100 in Delhi and UP, ₹200 in Karnataka)
                    and attested before a Notary Public.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>RBI 15-Day SLA:</strong> Commercial banks are legally mandated under RBI guidelines
                    to settle complete deceased claims within 15 calendar days of receiving the stamped bond and
                    supporting heir documents.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL ASSET: HIGH-RESOLUTION EDITORIAL OG BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/indemnity-bond-format-bank-deceased-claim-og.jpg"
                  alt="Indemnity Bond Format for Deceased Bank Account Claim Legal Template and State Stamp Duty"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-semibold text-slate-800">
                  Visual Asset: Official Non-Judicial Stamped Indemnity Bond &amp; Bank Claim Dossier
                </span>
                <span className="text-[11px] text-[#C65378] font-bold">
                  Compliant with RBI Circular DBOD.No.Leg.BC.21/09.07.006/2014-15
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Indian Contract Act &amp; RBI Directives
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When an account holder dies without registering a nominee, their bank account is frozen.
                  Banks face a dilemma: paying money to one family member could expose the branch to lawsuits
                  if another legal heir surfaces later. To resolve this without forcing families into prolonged
                  probate litigation, Indian banking law relies on <strong>Section 124 of the Indian Contract
                  Act, 1872</strong>.
                </p>
                <p>
                  Section 124 defines a contract of indemnity as an agreement where one party promises to save
                  another from loss caused by the promisor or any other person. When you sign an Indemnity Bond
                  for a deceased account claim, you make an enforceable promise to reimburse the bank for any
                  damages or legal expenses if another heir challenges the payout.
                </p>
                <p>
                  Under <strong>RBI Master Circular DBOD.No.Leg.BC.21/09.07.006/2014-15</strong>, banks must
                  establish simplified operational procedures. The Reserve Bank directs commercial lenders not
                  to insist on probate or succession certificates for claims up to internal board thresholds.
                  Instead, banks accept an Indemnity Bond with two independent solvent sureties to ensure fast
                  financial relief for surviving families.
                </p>
              </div>
            </section>

            {/* SECTION 2: COMPARISON TABLE OF CLAIM PATHWAYS */}
            <section id="comparison-claim-pathways" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>LEGAL PATHWAYS COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Claim Pathways: Nominee vs Indemnity Bond vs Probate
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review how different deceased claim procedures compare in terms of court intervention, costs,
                timelines, and legal risks.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Feature</th>
                      <th className="py-3.5 px-4 font-bold">1. Valid Nomination Registered</th>
                      <th className="py-3.5 px-4 font-bold bg-[#C65378] text-white">
                        2. No Nominee: Indemnity Bond
                      </th>
                      <th className="py-3.5 px-4 font-bold">3. Succession Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Governing Statute</td>
                      <td className="py-3 px-4">Banking Regulation Act s. 45ZA</td>
                      <td className="py-3 px-4 font-semibold text-slate-900 bg-rose-50/30">
                        Indian Contract Act s. 124 &amp; RBI Rules
                      </td>
                      <td className="py-3 px-4">Indian Succession Act s. 372</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Court Injunction / Order</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">Not Required</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold bg-rose-50/30">
                        Not Required (Out of Court)
                      </td>
                      <td className="py-3 px-4 text-rose-700 font-semibold">Mandatory Civil Court Petition</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Indemnity Bond &amp; Sureties</td>
                      <td className="py-3 px-4">Strictly Prohibited by RBI</td>
                      <td className="py-3 px-4 font-semibold text-slate-900 bg-rose-50/30">
                        Mandatory Bond + 2 Sureties
                      </td>
                      <td className="py-3 px-4">Optional / Court Security Bond</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Processing Time</td>
                      <td className="py-3 px-4">7 to 15 Days</td>
                      <td className="py-3 px-4 font-bold text-emerald-700 bg-rose-50/30">
                        10 to 15 Days after submission
                      </td>
                      <td className="py-3 px-4 text-rose-700">6 to 18 Months</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Associated Legal Costs</td>
                      <td className="py-3 px-4">Zero (Only KYC xerox)</td>
                      <td className="py-3 px-4 font-semibold bg-rose-50/30">
                        ₹500 to ₹1,500 (Stamp &amp; Notary)
                      </td>
                      <td className="py-3 px-4 text-rose-700">
                        2% to 4% Court Fees + Advocate Fees
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">Applicable Account Value</td>
                      <td className="py-3 px-4">Unlimited balance</td>
                      <td className="py-3 px-4 font-semibold bg-rose-50/30">
                        Up to Bank Board Limit (₹5L typical)
                      </td>
                      <td className="py-3 px-4">Any amount (High balances)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE BOND SELECTOR & LIVE CUSTOMIZER */}
            <section id="interactive-bond-selector" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DRAFT SELECTOR &amp; CUSTOMIZER</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Interactive Indemnity Bond Format &amp; Clause Selector
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your required template below. You can use standard bracketed placeholders or toggle
                the live customizer to enter your deceased family member&apos;s details for a ready-to-print draft.
              </p>

              {/* Format Tab Buttons */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveFormatTab("account")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeFormatTab === "account"
                      ? "bg-white text-[#C65378] shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Format 1: Bank Account Bond
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab("locker")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeFormatTab === "locker"
                      ? "bg-white text-[#C65378] shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Format 2: Safe Deposit Locker
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab("noc")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeFormatTab === "noc"
                      ? "bg-white text-[#C65378] shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Format 3: Legal Heir NOC
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormatTab("surety")}
                  className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeFormatTab === "surety"
                      ? "bg-white text-[#C65378] shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Format 4: Surety Solvency
                </button>
              </div>

              {/* Customizer Toggle Switch */}
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200">
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Live Customizer &amp; Fill-in-the-Blanks Mode
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-600">
                    {isInteractiveMode
                      ? "Customizer is active. Edit fields below to populate your draft."
                      : "Standard placeholder mode. Switch on to auto-fill your family names and account numbers."}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    isInteractiveMode ? "bg-[#C65378]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isInteractiveMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Interactive Form Fields when enabled */}
              {isInteractiveMode && (
                <div className="bg-white rounded-2xl border border-rose-200 p-5 space-y-4 shadow-xs">
                  <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize Your Bank Claim Particulars</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Claimant Full Name</label>
                      <input
                        type="text"
                        value={claimantName}
                        onChange={(e) => setClaimantName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Relationship to Deceased</label>
                      <input
                        type="text"
                        value={claimantRelation}
                        onChange={(e) => setClaimantRelation(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Deceased Depositor Name</label>
                      <input
                        type="text"
                        value={deceasedName}
                        onChange={(e) => setDeceasedName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Date of Death</label>
                      <input
                        type="text"
                        value={dateOfDeath}
                        onChange={(e) => setDateOfDeath(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Branch Name &amp; City</label>
                      <input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Bank Account Number(s)</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Claim Amount (INR &amp; Words)</label>
                      <input
                        type="text"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Surety 1 Full Name</label>
                      <input
                        type="text"
                        value={surety1Name}
                        onChange={(e) => setSurety1Name(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Surety 2 Full Name</label>
                      <input
                        type="text"
                        value={surety2Name}
                        onChange={(e) => setSurety2Name(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 4: FORMAT 1 - BANK ACCOUNT INDEMNITY BOND */}
            <section id="bank-account-indemnity-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>FORMAT 1: COMPLETE VETTED TEMPLATE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Format 1: Bank Deceased Account Claim Indemnity Bond
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                This comprehensive format includes the Section 124 indemnity covenant, Section 128 joint and
                several surety guarantee, court cost reimbursement clause, and notary public attestation block.
              </p>

              {/* Template Display Box */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="bg-slate-900 text-white p-3.5 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Bank Deceased Account Claim Indemnity Bond (Two Sureties)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(getAccountIndemnityText(), "account")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold transition-colors"
                    >
                      {copiedFormat === "account" ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="p-4 sm:p-6 bg-slate-50/70 text-slate-800 text-[11px] sm:text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap max-h-[550px] border-b border-slate-200">
                  {getAccountIndemnityText()}
                </pre>
                <div className="p-3 bg-white text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Adheres to Section 124 of Indian Contract Act, 1872 &amp; RBI Master Circular.</span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(getAccountIndemnityText(), "account")}
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Click here to copy complete text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 5: FORMAT 2 - BANK LOCKER CLAIM INDEMNITY BOND */}
            <section id="bank-locker-indemnity-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>FORMAT 2: SAFE DEPOSIT LOCKERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Format 2: Bank Locker Claim Indemnity Bond Template
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Claiming the contents of a deceased depositor&apos;s safe deposit locker requires special safeguards
                  compared to savings accounts. Lockers contain physical valuables such as family heirloom jewelry,
                  title deeds, and gold bullion. Without nomination, banks insist on opening the locker in the
                  presence of a branch committee, independent panchas (witnesses), and an empanelled government
                  valuer.
                </p>
                <p>
                  This template contains the mandatory <strong>Inventory Undertaking</strong> and indemnifies
                  the bank if a missing key requires drilling or breaking open the lock.
                </p>
              </div>

              {/* Locker Template Box */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="bg-slate-900 text-white p-3.5 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Safe Deposit Locker Deceased Hirer Indemnity Bond</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(getLockerIndemnityText(), "locker")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold transition-colors"
                  >
                    {copiedFormat === "locker" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Locker Draft</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 bg-slate-50/70 text-slate-800 text-[11px] sm:text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap max-h-[450px] border-b border-slate-200">
                  {getLockerIndemnityText()}
                </pre>
              </div>
            </section>

            {/* SECTION 6: TWO-SURETY GUARANTEE & CO-EXTENSIVE LIABILITY */}
            <section id="two-surety-guarantee-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>SURETYSHIP JURISPRUDENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Two-Surety Guarantee &amp; Solvent Undertaking Clause
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Why do Indian banks insist on two sureties rather than accepting an indemnity bond signed only
                  by the claimant? The answer lies in <strong>Sections 126 and 128 of the Indian Contract Act,
                  1872</strong>.
                </p>
                <p>
                  Under Section 128, the liability of a surety is <em>co-extensive</em> with that of the principal
                  debtor unless provided otherwise by contract. This means that if the claimant spends the money
                  and cannot repay the bank when a rival heir files a claim, the bank does not have to search for
                  the claimant&apos;s assets. The bank can directly debit the sureties&apos; accounts or attach
                  their salaries.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Who Can and Cannot Act as a Bank Surety?</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>CANNOT be an inheriting legal heir:</strong> A sibling, child, or spouse who is
                      already an heir cannot sign as a surety. Sureties must be independent third parties.
                    </li>
                    <li>
                      <strong>Must have verifiable solvency:</strong> Banks ask for salary slips (for government
                      or corporate employees) or filed Income Tax Returns (ITR) showing annual income matching
                      or exceeding the claim balance.
                    </li>
                    <li>
                      <strong>Preferred account holder:</strong> Having an active, KYC-compliant account in the
                      same bank branch significantly speeds up bank approval.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 7: FORMAT 3 - LEGAL HEIR NOC & DISCLAIMER AFFIDAVIT */}
            <section id="noc-disclaimer-affidavit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FORMAT 3: HEIR DISCLAIMER &amp; NOC</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Format 3: Legal Heir NOC &amp; Affidavit of Disclaimer
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a deceased parent leaves behind multiple adult children and a surviving spouse, all
                  Class-I heirs share equal rights to the bank balance under Section 8 of the Hindu Succession
                  Act, 1956. However, having four people jointly receive and operate a bank transfer is cumbersome.
                </p>
                <p>
                  Instead, family members can execute this <strong>Affidavit-cum-No Objection Certificate (NOC)</strong>.
                  By signing before a Notary Public, the other heirs formally relinquish their right to receive
                  the payment directly and authorize the bank to disburse the entire sum to one primary claimant.
                </p>
              </div>

              {/* NOC Template Box */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="bg-slate-900 text-white p-3.5 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Legal Heir Affidavit-cum-NOC / Letter of Disclaimer</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(getNocText(), "noc")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold transition-colors"
                  >
                    {copiedFormat === "noc" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy NOC Draft</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-6 bg-slate-50/70 text-slate-800 text-[11px] sm:text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap max-h-[400px] border-b border-slate-200">
                  {getNocText()}
                </pre>
              </div>
            </section>

            {/* SECTION 8: STATE STAMP DUTY TABLE */}
            <section id="state-stamp-paper-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>STATE STAMP PAPER VALUES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. State Stamp Duty Denominations for Indemnity Bonds
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under the Indian Stamp Act, 1899 and state amendments, an indemnity bond must be executed on
                non-judicial stamp paper of the appropriate denomination. Using insufficient stamp duty renders
                the bond inadmissible in evidence under Section 35 of the Stamp Act, causing banks to reject the claim.
              </p>

              {/* State Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by state (e.g. Maharashtra, Delhi, UP)..."
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#C65378] focus:ring-1 focus:ring-[#C65378] bg-white"
                />
              </div>

              {/* Stamp Duty Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">State / Territory</th>
                      <th className="py-3 px-4 font-bold">Statutory Article</th>
                      <th className="py-3 px-4 font-bold text-rose-200">Required Stamp Value</th>
                      <th className="py-3 px-4 font-bold">Mode of Purchase</th>
                      <th className="py-3 px-4 font-bold">Operational Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredStates.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{row.state}</td>
                        <td className="py-2.5 px-4 text-slate-600">{row.article}</td>
                        <td className="py-2.5 px-4 font-extrabold text-[#C65378]">{row.stampValue}</td>
                        <td className="py-2.5 px-4">{row.mode}</td>
                        <td className="py-2.5 px-4 text-[11px] text-slate-600">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SETTLEMENT SOP */}
            <section id="step-by-step-settlement-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STEP-BY-STEP PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Settling Bank Deceased Balances
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-slate-900">Step 1: Obtain Official Death Certificate</div>
                    <p className="text-slate-600 leading-relaxed">
                      Collect the digitized Death Certificate issued by the Municipal Corporation or Registrar of
                      Births and Deaths. Banks verify the QR code online before initiating deceased claim files.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-slate-900">Step 2: Collect Bank Deceased Claim Kit</div>
                    <p className="text-slate-600 leading-relaxed">
                      Visit the home branch and obtain the standard Deceased Claim Application (Annexure-A). Ask
                      the branch manager for the maximum threshold balance allowed under their board policy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-slate-900">Step 3: Purchase Non-Judicial Stamp Paper</div>
                    <p className="text-slate-600 leading-relaxed">
                      Purchase e-stamp paper of the required state value (₹100 to ₹500). Enter the first party as
                      the Legal Heirs and the second party as the Bank. Print the Indemnity Bond draft on the paper.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-slate-900">Step 4: Execute Before Notary Public</div>
                    <p className="text-slate-600 leading-relaxed">
                      The claimant heir, other legal heirs (signing the NOC), and two solvent sureties must appear
                      before a Notary Public. Affix photographs, self-attested Aadhaar and PAN cards, and notary seals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-slate-900">Step 5: Submission &amp; 15-Day Disbursement</div>
                    <p className="text-slate-600 leading-relaxed">
                      Submit the complete dossier to the branch manager and obtain a stamped acknowledgement receipt.
                      Under RBI directives, the bank must disburse the account balance within 15 calendar days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: BANK THRESHOLDS MATRIX */}
            <section id="rbi-thresholds-bank-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>INSTITUTIONAL LIMITS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Bank-Wise Threshold Limits for Deceased Claims
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under RBI rules, each commercial bank fixes its own threshold limit for settling claims without
                a Succession Certificate. Balances below these limits are settled solely on an Indemnity Bond.
              </p>

              {/* Bank Thresholds Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Bank / Institution</th>
                      <th className="py-3 px-4 font-bold text-rose-200">Indemnity Threshold Limit</th>
                      <th className="py-3 px-4 font-bold">Required Annexures &amp; Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {BANK_THRESHOLDS_DATA.map((b, i) => (
                      <tr key={i} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-slate-900">{b.bank}</td>
                        <td className="py-3 px-4 font-extrabold text-[#C65378]">{b.threshold}</td>
                        <td className="py-3 px-4 text-xs">{b.documentRequirement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 11: COMMON REJECTION REASONS */}
            <section id="common-rejection-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>BANK REJECTION SAFEGUARDS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Common Reasons Banks Reject Deceased Claim Bonds
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Name Mismatch on Death Certificate</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    If the name on the passbook is &ldquo;Satish K. Sharma&rdquo; but the municipal death
                    certificate reads &ldquo;Satish Kumar Sharma&rdquo;, the bank will reject the claim unless an
                    alias affidavit is enclosed.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Sureties Being Related Class-I Heirs</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Claimants often have their brother or sister sign as a surety. Banks immediately reject this
                    because a co-heir cannot indemnify their own inheritance under Section 126.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Insufficient Stamp Paper Value</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Printing a bond on a ₹100 stamp in Maharashtra or Rajasthan (where the law mandates ₹500)
                    renders the document legally inadmissible under state stamp acts.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Missing Second Party on e-Stamp</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    When purchasing e-stamp certificates, buyers often leave the second party blank. Bank legal
                    cells require the second party to explicitly name the bank and branch.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: REAL CASE STUDIES */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Real Settlement Case Studies: SBI, HDFC &amp; PNB
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900">Case Study 1: SBI Delhi Account (₹4.20 Lakhs)</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Settled in 12 Days
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A father passed away intestate in Delhi leaving ₹4.20 Lakhs in an SBI savings account with no
                    nominee. The bank initially asked the son for a succession certificate. The family cited the
                    RBI Master Circular and submitted our Two-Surety Indemnity Bond on ₹100 e-stamp paper with NOC
                    affidavits from the mother and sister. SBI approved and disbursed the funds within 12 days.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900">Case Study 2: HDFC Mumbai Locker Claim</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Inventory Handover
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A mother held a locker in Mumbai without nomination. The key was safely in the house. The legal
                    heirs executed Format 2 on ₹500 Maharashtra stamp paper with two colleague sureties. An HDFC
                    custodian and empanelled valuer opened the locker, cataloged 18 items of jewelry, and released
                    the gold to the daughter without any court orders.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900">Case Study 3: PNB Balances Exceeding ₹5 Lakhs</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                      Succession Petition
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    When a depositor left ₹18 Lakhs across multiple fixed deposits in PNB Lucknow, the balance
                    exceeded the bank&apos;s ₹5 Lakh board threshold. While the indemnity bond could not be accepted
                    due to the high amount, AMA Legal Solutions filed an expedited Section 372 Succession Certificate
                    petition before the District Judge, securing release within 6 months.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS BANNER */}
            <div className="rounded-3xl bg-gradient-to-r from-[#172228] to-slate-800 text-white p-6 sm:p-8 shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>EXPLORE INTERACTIVE WILLDRAFTING ASSETS &amp; TOOLS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                Track Post-Death Timelines or Trace Unclaimed Family Deposits
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                Settling bank accounts is only the first step. Use our free interactive tools to track mandatory
                30-day legal compliances, search the RBI UDGAM portal for unclaimed deposits, or calculate capital
                gains tax on inherited property.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/tools/unclaimed-assets-search-roadmap-tool"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#172228] text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Unclaimed Assets Search Tool</span>
                </Link>
                <Link
                  href="/tools/post-death-30-day-legal-compliance-tracker"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/20 text-xs font-bold transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Post-Death 30-Day Tracker</span>
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 text-white hover:bg-white/20 text-xs font-bold transition-colors"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-300" />
                  <span>Inherited Property Tax Calculator</span>
                </Link>
              </div>
            </div>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL REVIEW &amp; ADVOCATE BACKING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Legal Review &amp; Advocate Backing by AMA Solutions
              </h2>
              <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AMA
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Vetted by AMA Legal Solutions Succession Desk
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Supreme Court &amp; High Court Estate Litigators
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every template and statutory provision on this page has been reviewed by senior succession
                  advocates at AMA Legal Solutions. We represent families across India in contested bank account
                  disputes, court Succession Certificate petitions, and high-value locker releases.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-700">Verified Legal Standards • 100% Statutory Adherence</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline"
                  >
                    <span>Schedule Legal Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Bank Deceased Claims
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answers to common practical questions regarding bank deceased depositor claims, indemnity bonds,
                surety liabilities, and RBI circular timelines.
              </p>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200 ${
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

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Citations &amp; Official Banking Circulars
              </h2>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  This guide and its accompanying legal formats are grounded in the following official statutes
                  and regulatory directions:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Indian Contract Act, 1872:</strong> Section 124 (Definition of Contract of Indemnity),
                    Section 125 (Rights of Indemnity-holder), Section 126 (Contract of Guarantee, Surety, Principal
                    Debtor), and Section 128 (Co-extensive nature of surety liability).
                  </li>
                  <li>
                    <strong>Banking Regulation Act, 1949:</strong> Section 45ZA to 45ZF (Nomination facilities in
                    deposit accounts, safe custody, and safety lockers).
                  </li>
                  <li>
                    <strong>Reserve Bank of India Master Circular:</strong> DBOD.No.Leg.BC.21/09.07.006/2014-15
                    dated July 1, 2014 on &ldquo;Settlement of Claims in respect of Deceased Depositors — Simplified
                    Procedure&rdquo;.
                  </li>
                  <li>
                    <strong>Indian Stamp Act, 1899 &amp; State Stamp Acts:</strong> Article 34 / 35 (Stamp duty
                    levy on Indemnity Bonds and Surety Agreements across Indian States).
                  </li>
                  <li>
                    <strong>Supreme Court of India Ruling:</strong> <em>Ram Chander Talwar v. Devinder Kumar Talwar</em> (2010)
                    10 SCC 671 and <em>Shakti Yezdani v. Jayanand Jayant Salgaonkar</em> (2023) SCC OnLine SC 1679
                    (Nominee holds funds only as a trustee for the legal heirs).
                  </li>
                </ul>
                <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-bold text-[#C65378]">
                  <Link href="/templates" className="hover:underline flex items-center gap-1">
                    <span>Back to Templates Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href="/services/succession-certificate" className="hover:underline flex items-center gap-1">
                    <span>Succession Certificate Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href="/services/will-registration" className="hover:underline flex items-center gap-1">
                    <span>Will Registration in India</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                Specialist in Indian testamentary law, bank deceased depositor claim disputes, High Court
                succession certificate petitions, and estate transmission.
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
                  <span>PREVENT BANK ACCOUNT FREEZES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Never Leave Your Family Trapped in Bank Formalities
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A registered Will and up-to-date bank nominations ensure your family can instantly access
                  your savings, fixed deposits, and lockers without needing court petitions or indemnity bonds.
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
                  <span>BANK DECEASED CLAIMS DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Delays or High-Balance Bank Claims?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If the bank refuses your indemnity bond or balances exceed the threshold limit, our succession
                  advocates assist with expedited Succession Certificates and legal notices pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <span>Schedule Advocate Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
                      <strong>Section 124 Compliance:</strong> Validated indemnity covenants protecting both bank
                      and family.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>All-State Stamp Guide:</strong> Exact e-stamp paper denominations to prevent bank rejection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Phone Calls:</strong> Direct online access to lawyer-vetted formats and
                      expert consultation.
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
          href="#interactive-bond-selector"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Copy Bond Format</span>
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
