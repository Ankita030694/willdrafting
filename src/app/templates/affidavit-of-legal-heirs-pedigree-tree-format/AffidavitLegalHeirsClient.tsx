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
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
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
  Download,
  AlertCircle,
  Printer,
  Calendar,
  Share2,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "what-is-legal-heir-affidavit", label: "1. What is a Legal Heir & Pedigree Tree Affidavit?" },
  { id: "statutory-framework-laws", label: "2. Statutory Foundation: HSA 1956 & BSA 2023 Rules" },
  { id: "predeceased-vs-surviving-heirs", label: "3. Predeceased vs Surviving Heirs: The Missing Moat" },
  { id: "interactive-pedigree-calculator", label: "4. Interactive Legal Heir & Pedigree Tree Generator" },
  { id: "comparison-lhc-smc-succession", label: "5. Legal Heir vs SMC vs Succession Certificate" },
  { id: "master-affidavit-template", label: "6. Format 1: Legal Heir Affidavit with Pedigree Tree" },
  { id: "regional-pedhinama-vamshavali", label: "7. State Revenue Formats: Pedhinama & Vamshavali" },
  { id: "essential-clauses-negative-declaration", label: "8. Key Clauses: Negative Declaration & Indemnity" },
  { id: "stamp-duty-notarization-sop", label: "9. Step-by-Step SOP: Stamping to Tehsildar Filing" },
  { id: "bank-and-property-case-studies", label: "10. Real Post-Death Case Studies in India" },
  { id: "copyable-legal-undertakings", label: "11. Copy-Paste Revenue & Bank Undertaking Clauses" },
  { id: "institutional-profile", label: "12. Legal Review & Advocate Credentials" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Legal Heirship" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Revenue Portals" },
];

const FAQS = [
  {
    q: "What is a Legal Heir and Pedigree Tree Affidavit in India?",
    a: "A Legal Heir Affidavit with a Pedigree Tree (also termed Vamshavali, Pedhinama, or Shajra-e-Nasab) is a sworn legal statement executed on non-judicial stamp paper. A close relative affirms under solemn oath all surviving Class I legal heirs of a deceased person who died intestate. The embedded pedigree tree details the deceased, surviving heirs, and any predeceased heirs to establish legal title for revenue, banking, and municipal authorities.",
  },
  {
    q: "Why is disclosing predeceased heirs compulsory in the affidavit?",
    a: "Under Section 10 of the Hindu Succession Act, 1956, when a son or daughter dies before the parent (predeceased), their children and the predeceased son's widow inherit their branch's share per stirpes (by representation). If a deponent lists only living children and conceals a predeceased child's family, the affidavit constitutes perjury and fraud, and any revenue certificate issued is void ab initio.",
  },
  {
    q: "What is the stamp paper value required for a Legal Heir Affidavit?",
    a: "The required non-judicial e-stamp paper value varies by state stamp schedule. In Delhi and Uttar Pradesh, it is typically ₹10 or ₹100; in Maharashtra, ₹100; in Karnataka, ₹20 or ₹50; and in Gujarat, ₹50 or ₹100. Always check your local District Collector or Sub-Registrar notification before purchasing e-stamp paper in the deponent's name.",
  },
  {
    q: "Can a Legal Heir Certificate transfer immovable property ownership?",
    a: "A Legal Heir Certificate or Surviving Member Certificate is an administrative revenue record, not an absolute title deed. It allows legal heirs to mutate land revenue records, pay municipal property taxes, and establish tenancy-in-common. To sell or transfer registered ownership, all legal heirs must jointly execute a registered conveyance or release deed.",
  },
  {
    q: "What is the difference between a Legal Heir Certificate and a Succession Certificate?",
    a: "A Legal Heir Certificate is issued by an administrative executive officer (Tehsildar or SDM) within 15 to 30 days at nominal cost, primarily used for bank accounts up to state limits, PF, and utility transfers. A Succession Certificate is granted only by a competent Civil Court under Part X of the Indian Succession Act, 1925, following newspaper publication and ad valorem court fees (often 2% to 7%), required for contested debts and high-value securities.",
  },
  {
    q: "What are the criminal penalties for filing a false legal heir affidavit?",
    a: "Affidavits are sworn evidence under the Oaths Act, 1969. Submitting a false affidavit or concealing a legal heir attracts prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 (formerly Sections 193 and 199 IPC) for perjury and fabricating false evidence, punishable by rigorous imprisonment up to 7 years plus fine.",
  },
  {
    q: "Do married daughters have equal rights in a Legal Heir Affidavit?",
    a: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), daughters are coparceners by birth with rights identical to sons. Married daughters must be included with their marital status and address. Omitting a married daughter invalidates the affidavit.",
  },
  {
    q: "What is a Pedhinama in Gujarat and how does it relate to Vamshavali?",
    a: "Pedhinama is the Gujarati administrative term for a certified genealogical family tree (Vamshavali). It is drafted as an affidavit on stamp paper, witnessed by two non-relative panch witnesses, and verified by the local Talati (Panchayat Secretary) or Revenue Circle Officer before mutating agricultural land records.",
  },
  {
    q: "What is the Delhi Surviving Member Certificate (SMC) process?",
    a: "Under the Revenue Department of GNCTD, Delhi residents apply online on the e-District portal for an SMC. The application requires a notarized self-declaration affidavit with a family tree, death certificate, Aadhaar cards of all heirs, and electricity bill. An SDM field inquiry confirms the surviving family before issuing the digital certificate.",
  },
  {
    q: "How can banks settle deceased claims without a Civil Court Succession Certificate?",
    a: "Under Reserve Bank of India (RBI) Master Directions on Deceased Depositors, banks settle claims where no nomination exists based on: (1) Sworn Legal Heir Affidavit with Pedigree Tree, (2) Death Certificate, (3) Letter of Disclaimer / NOC from non-claiming heirs, and (4) Stamped Indemnity Bond (Form Annexure) with two independent solvent sureties.",
  },
];

export default function AffidavitLegalHeirsClient() {
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

  const [activeId, setActiveId] = useState<string>("what-is-legal-heir-affidavit");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedAffidavit, setCopiedAffidavit] = useState<boolean>(false);
  const [copiedNegativeClause, setCopiedNegativeClause] = useState<boolean>(false);
  const [copiedBankClause, setCopiedBankClause] = useState<boolean>(false);
  const [copiedCHSClause, setCopiedCHSClause] = useState<boolean>(false);

  // Interactive Calculator State: Hindu Succession Act Class I Engine
  const [deceasedGender, setDeceasedGender] = useState<"male" | "female">("male");
  const [deceasedMaritalStatus, setDeceasedMaritalStatus] = useState<"married" | "widowed" | "unmarried">("married");
  const [hasSurvivingSpouse, setHasSurvivingSpouse] = useState<boolean>(true);
  const [survivingSonsCount, setSurvivingSonsCount] = useState<number>(1);
  const [survivingDaughtersCount, setSurvivingDaughtersCount] = useState<number>(1);
  const [isMotherSurviving, setIsMotherSurviving] = useState<boolean>(true);
  const [predeceasedSonsCount, setPredeceasedSonsCount] = useState<number>(0);
  const [predeceasedSonBranches, setPredeceasedSonBranches] = useState<
    Array<{ widow: boolean; childrenCount: number }>
  >([]);
  const [predeceasedDaughtersCount, setPredeceasedDaughtersCount] = useState<number>(0);
  const [predeceasedDaughterBranches, setPredeceasedDaughterBranches] = useState<
    Array<{ childrenCount: number }>
  >([]);

  // Keep predeceased branches in sync with counts
  useEffect(() => {
    if (predeceasedSonBranches.length < predeceasedSonsCount) {
      const added = Array.from(
        { length: predeceasedSonsCount - predeceasedSonBranches.length },
        () => ({ widow: true, childrenCount: 2 })
      );
      setPredeceasedSonBranches([...predeceasedSonBranches, ...added]);
    } else if (predeceasedSonBranches.length > predeceasedSonsCount) {
      setPredeceasedSonBranches(predeceasedSonBranches.slice(0, predeceasedSonsCount));
    }
  }, [predeceasedSonsCount, predeceasedSonBranches]);

  useEffect(() => {
    if (predeceasedDaughterBranches.length < predeceasedDaughtersCount) {
      const added = Array.from(
        { length: predeceasedDaughtersCount - predeceasedDaughterBranches.length },
        () => ({ childrenCount: 2 })
      );
      setPredeceasedDaughterBranches([...predeceasedDaughterBranches, ...added]);
    } else if (predeceasedDaughterBranches.length > predeceasedDaughtersCount) {
      setPredeceasedDaughterBranches(predeceasedDaughterBranches.slice(0, predeceasedDaughtersCount));
    }
  }, [predeceasedDaughtersCount, predeceasedDaughterBranches]);

  // Compute Class I Primary Branches (Denominator in Section 10 HSA)
  const computeShares = () => {
    let primarySharesCount = 0;
    const shareItems: Array<{
      category: string;
      relation: string;
      count: number;
      branchShareFraction: string;
      branchSharePercent: number;
      subDistribution?: string;
    }> = [];

    if (deceasedGender === "male") {
      // 1. Surviving Widow
      const widowCount = deceasedMaritalStatus === "married" && hasSurvivingSpouse ? 1 : 0;
      if (widowCount > 0) primarySharesCount += 1;

      // 2. Surviving Sons
      primarySharesCount += survivingSonsCount;

      // 3. Surviving Daughters
      primarySharesCount += survivingDaughtersCount;

      // 4. Surviving Mother
      const motherCount = isMotherSurviving ? 1 : 0;
      if (motherCount > 0) primarySharesCount += 1;

      // 5. Predeceased Son branches (each branch takes 1 share)
      primarySharesCount += predeceasedSonsCount;

      // 6. Predeceased Daughter branches (each branch takes 1 share)
      primarySharesCount += predeceasedDaughtersCount;

      if (primarySharesCount === 0) {
        return {
          totalBranches: 0,
          items: [],
          summary: "No Class I legal heirs specified. Succession moves to Class II Agnates / Cognates.",
        };
      }

      const branchSharePercent = 100 / primarySharesCount;
      const frac = `1/${primarySharesCount}`;

      if (widowCount > 0) {
        shareItems.push({
          category: "Surviving Spouse",
          relation: "Widow",
          count: 1,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
        });
      }
      if (survivingSonsCount > 0) {
        shareItems.push({
          category: "Living Children",
          relation: "Surviving Son(s)",
          count: survivingSonsCount,
          branchShareFraction: `${survivingSonsCount}/${primarySharesCount} total (${frac} each)`,
          branchSharePercent: branchSharePercent * survivingSonsCount,
          subDistribution: `${frac} (${branchSharePercent.toFixed(2)}%) for each surviving son`,
        });
      }
      if (survivingDaughtersCount > 0) {
        shareItems.push({
          category: "Living Children",
          relation: "Surviving Daughter(s)",
          count: survivingDaughtersCount,
          branchShareFraction: `${survivingDaughtersCount}/${primarySharesCount} total (${frac} each)`,
          branchSharePercent: branchSharePercent * survivingDaughtersCount,
          subDistribution: `${frac} (${branchSharePercent.toFixed(2)}%) for each surviving daughter`,
        });
      }
      if (motherCount > 0) {
        shareItems.push({
          category: "Ascendant",
          relation: "Mother of Deceased",
          count: 1,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
        });
      }

      // Predeceased Son branches breakdown
      predeceasedSonBranches.forEach((branch, idx) => {
        const subHeirCount = (branch.widow ? 1 : 0) + branch.childrenCount;
        const subShare =
          subHeirCount > 0
            ? `${(branchSharePercent / subHeirCount).toFixed(2)}% each (${frac} ÷ ${subHeirCount})`
            : "No sub-heirs reported";
        shareItems.push({
          category: "Predeceased Branch",
          relation: `Branch of Predeceased Son #${idx + 1}`,
          count: subHeirCount,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
          subDistribution: `Divided per stirpes among ${branch.widow ? "Widow + " : ""}${branch.childrenCount} Grandchildren: ${subShare}`,
        });
      });

      // Predeceased Daughter branches breakdown
      predeceasedDaughterBranches.forEach((branch, idx) => {
        const subHeirCount = branch.childrenCount;
        const subShare =
          subHeirCount > 0
            ? `${(branchSharePercent / subHeirCount).toFixed(2)}% each (${frac} ÷ ${subHeirCount})`
            : "No sub-heirs reported";
        shareItems.push({
          category: "Predeceased Branch",
          relation: `Branch of Predeceased Daughter #${idx + 1}`,
          count: subHeirCount,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
          subDistribution: `Divided per stirpes among ${branch.childrenCount} Grandchildren: ${subShare}`,
        });
      });
    } else {
      // Female Deceased (Section 15 & 16 Hindu Succession Act)
      // Property devolves first upon sons and daughters (including children of predeceased children) and husband
      const husbandCount = deceasedMaritalStatus === "married" && hasSurvivingSpouse ? 1 : 0;
      if (husbandCount > 0) primarySharesCount += 1;
      primarySharesCount += survivingSonsCount;
      primarySharesCount += survivingDaughtersCount;
      primarySharesCount += predeceasedSonsCount;
      primarySharesCount += predeceasedDaughtersCount;

      if (primarySharesCount === 0) {
        return {
          totalBranches: 0,
          items: [],
          summary: "No surviving husband or children. Devolves to heirs of the husband or father under Sec 15.",
        };
      }

      const branchSharePercent = 100 / primarySharesCount;
      const frac = `1/${primarySharesCount}`;

      if (husbandCount > 0) {
        shareItems.push({
          category: "Surviving Spouse",
          relation: "Husband",
          count: 1,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
        });
      }
      if (survivingSonsCount > 0) {
        shareItems.push({
          category: "Living Children",
          relation: "Surviving Son(s)",
          count: survivingSonsCount,
          branchShareFraction: `${survivingSonsCount}/${primarySharesCount} total (${frac} each)`,
          branchSharePercent: branchSharePercent * survivingSonsCount,
          subDistribution: `${frac} (${branchSharePercent.toFixed(2)}%) for each son`,
        });
      }
      if (survivingDaughtersCount > 0) {
        shareItems.push({
          category: "Living Children",
          relation: "Surviving Daughter(s)",
          count: survivingDaughtersCount,
          branchShareFraction: `${survivingDaughtersCount}/${primarySharesCount} total (${frac} each)`,
          branchSharePercent: branchSharePercent * survivingDaughtersCount,
          subDistribution: `${frac} (${branchSharePercent.toFixed(2)}%) for each daughter`,
        });
      }
      predeceasedSonBranches.forEach((branch, idx) => {
        const subHeirCount = branch.childrenCount;
        shareItems.push({
          category: "Predeceased Branch",
          relation: `Branch of Predeceased Son #${idx + 1}`,
          count: subHeirCount,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
          subDistribution: `Divided per stirpes among ${subHeirCount} Grandchildren: ${(branchSharePercent / (subHeirCount || 1)).toFixed(2)}% each`,
        });
      });
      predeceasedDaughterBranches.forEach((branch, idx) => {
        const subHeirCount = branch.childrenCount;
        shareItems.push({
          category: "Predeceased Branch",
          relation: `Branch of Predeceased Daughter #${idx + 1}`,
          count: subHeirCount,
          branchShareFraction: frac,
          branchSharePercent: branchSharePercent,
          subDistribution: `Divided per stirpes among ${subHeirCount} Grandchildren: ${(branchSharePercent / (subHeirCount || 1)).toFixed(2)}% each`,
        });
      });
    }

    return {
      totalBranches: primarySharesCount,
      items: shareItems,
      summary: `Estate divides into ${primarySharesCount} equal primary Class I branches under Section 10 of the Hindu Succession Act, 1956.`,
    };
  };

  const calculatedShares = computeShares();

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

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const copyAffidavitToClipboard = () => {
    const fullText = `BEFORE THE EXECUTIVE MAGISTRATE / TEHSILDAR / COMPETENT REVENUE AUTHORITY AT [CITY/DISTRICT]

AFFIDAVIT OF LEGAL HEIRS & GENEALOGICAL PEDIGREE TREE (VAMSHAVALI / PEDHINAMA)
(Under the Oaths Act, 1969 & Bharatiya Sakshya Adhiniyam, 2023)

I, [Full Name of Deponent], son/daughter/wife of Late [Name of Father/Husband], aged about [Age] years, residing at [Complete Residential Address with Pincode], holding Aadhaar No. [Aadhaar Number], do hereby solemnly affirm and declare on oath as follows:

1. That I am the deponent herein and a Class I legal heir of the deceased Late [Full Name of Deceased], who departed this life on [Date of Death] at [Place of Death, e.g. Hospital/Residence, City, State], leaving behind his/her permanent residence at [Deceased Permanent Address].

2. That the original Death Certificate of the deceased, bearing Registration No. [Registration Number] dated [Issue Date], issued by the Registrar of Births and Deaths, [Name of Municipal Corporation / Gram Panchayat], is annexed hereto as Annexure-A.

3. That the deceased was a Hindu by religion and was governed by the provisions of the Hindu Succession Act, 1956 (as amended in 2005) at the time of his/her demise.

4. That the deceased died intestate, without executing any Last Will and Testament, Codicil, Gift Deed, Trust, or any other testamentary disposition regarding his/her movable or immovable properties during his/her lifetime.

5. That the genealogical lineage and pedigree tree (Vamshavali / Pedhinama) of the deceased propositus Late [Name of Deceased] is accurately described below, containing the full details of all surviving and predeceased Class I legal heirs:

========================================================================================================
GENEALOGICAL PEDIGREE TREE TABLE (VAMSHAVALI / PEDHINAMA)
========================================================================================================
S.No. | Full Name of Legal Heir | Age | Relationship with Deceased | Marital Status | Surviving / Predeceased Status | Class of Heir
1.    | [Surviving Spouse Name] | [Age]| Wife / Husband             | Married        | Surviving (Living)             | Class I
2.    | [Son Name 1]            | [Age]| Son                        | Married        | Surviving (Living)             | Class I
3.    | [Daughter Name 1]       | [Age]| Daughter                   | Married        | Surviving (Living)             | Class I
4.    | [Mother Name]           | [Age]| Mother                     | Widowed        | Surviving (Living)             | Class I
5.    | Late [Predeceased Son]  |  --  | Son (Died on [Date])       | Married        | Predeceased (Deceased)         | Class I Branch
   a. | [Widow of Predeceased]  | [Age]| Daughter-in-law (Widow)    | Widowed        | Surviving (Living)             | Class I (Per Stirpes)
   b. | [Grandson/Granddaughter]| [Age]| Grandson / Granddaughter   | Unmarried      | Surviving (Living)             | Class I (Per Stirpes)
========================================================================================================

6. NEGATIVE DECLARATION & NON-CONCEALMENT:
That save and except the persons specifically named in the Pedigree Table above, the deceased Late [Name of Deceased] left behind NO OTHER legal heirs whatsoever, whether natural-born, adopted, legitimate, or illegitimate. There are no other surviving wives, husbands, sons, daughters, mothers, or children of any predeceased children.

7. That no child of the deceased has been given or taken in adoption by any other person, and no divorce proceedings or family partition suits were pending at the time of demise.

8. That this affidavit is executed solemnly for submission before the Tehsildar / Sub-Divisional Magistrate / Sub-Registrar / Municipal Corporation / Banks / Financial Institutions for the issuance of a Legal Heir Certificate / Surviving Member Certificate / Pedhinama and for the lawful mutation and transmission of the estate of the deceased.

9. That I, the deponent herein, undertake to indemnify and hold harmless the Government of India, the Revenue Department, the Municipal Authorities, and any Bank or Financial Institution against any loss, liability, or adverse claim arising out of any misstatement or non-disclosure in this affidavit.

DEPONENT

VERIFICATION:
I, the deponent above-named, do hereby verify and declare on solemn affirmation at [City] on this [Date] day of [Month], [Year], that the contents of paragraphs 1 to 9 of this affidavit are true and correct to my personal knowledge and belief. No part of it is false, and nothing material has been concealed therefrom.

DEPONENT

IDENTIFIED BY ME:
Advocate / Witness 1:
Name: [Full Name]
Enrolment / ID No: [Number]
Address: [Address]
Signature: ______________________

Witness 2 (Local Resident):
Name: [Full Name]
Aadhaar No: [Number]
Address: [Address]
Signature: ______________________

ATTESTATION & JURAT:
Sworn and affirmed before me on this [Date] day of [Month], [Year], at [Location], by the deponent who is personally identified by [Witness Name].

NOTARY PUBLIC / OATH COMMISSIONER
(Seal, Registration No. & Notarial Stamp)`;

    navigator.clipboard.writeText(fullText);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 3000);
  };

  const copyNegativeClauseToClipboard = () => {
    const text = `NEGATIVE DECLARATION UNDER BHARATIYA SAKSHYA ADHINIYAM, 2023:
"I, the deponent herein, do hereby solemnly swear and affirm that the deceased Late [Deceased Name] died intestate leaving behind only the Class I legal heirs specifically enumerated in the genealogical pedigree table above. I categorically declare that there are no other legal heirs, surviving spouse, natural or adopted sons, married or unmarried daughters, surviving mother, or any children of any predeceased child. If any undisclosed claimant comes forward or if any averment is proved false, I shall be personally liable for criminal prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 for perjury and fraud, and I shall fully indemnify all authorities against any resultant loss."`;
    navigator.clipboard.writeText(text);
    setCopiedNegativeClause(true);
    setTimeout(() => setCopiedNegativeClause(false), 3000);
  };

  const copyBankClauseToClipboard = () => {
    const text = `BANK DECEASED CLAIM INDEMNITY & UNDERTAKING CLAUSE:
"WHEREAS Late [Deceased Name] held Savings Bank / Current / Term Deposit Account No. [Account Number] with [Bank Name], [Branch Name], having an outstanding balance of Rs. [Amount]/- at the time of demise.
AND WHEREAS the deceased died intestate leaving behind the claimants as his/her sole legal heirs under the Hindu Succession Act, 1956, as per the notarized Pedigree Tree Affidavit annexed hereto.
NOW THEREFORE, in consideration of the Bank agreeing to pay the said proceeds to [Claimant Name] on behalf of all legal heirs without requiring a Civil Court Succession Certificate, we, the undersigned legal heirs jointly and severally undertake to indemnify and keep indemnified the Bank against all claims, demands, actions, or proceedings by any third party."`;
    navigator.clipboard.writeText(text);
    setCopiedBankClause(true);
    setTimeout(() => setCopiedBankClause(false), 3000);
  };

  const copyCHSClauseToClipboard = () => {
    const text = `CO-OPERATIVE HOUSING SOCIETY FLAT TRANSMISSION INDEMNITY:
"We, the surviving legal heirs of Late [Deceased Name], deceased member of [Society Name] Co-operative Housing Society Ltd., holding Flat No. [Flat No.] and Share Certificate No. [Cert No.], do hereby request the Society to transmit the nominal membership and flat rights in the name of [Nominee / Legal Heir Name]. We solemnly affirm that there are no disputes among the heirs, and we undertake to indemnify the Society and its Managing Committee against all future adverse claims or court litigations."`;
    navigator.clipboard.writeText(text);
    setCopiedCHSClause(true);
    setTimeout(() => setCopiedCHSClause(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>HINDU SUCCESSION ACT, 1956 • BHARATIYA SAKSHYA ADHINIYAM, 2023</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Legal Heir Affidavit &amp; Pedigree Tree Format in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted <strong>Legal Heirship &amp; Pedigree Tree (Vamshavali / Pedhinama)</strong> affidavits.
            Includes complete Class I heir share calculations, predeceased branch disclosures, negative declarations,
            and state revenue SOPs for Tehsildars, SDMs, and banks.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#master-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Download Affidavit Template</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#interactive-pedigree-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Calculator className="w-4 h-4 text-[#C65378]" />
              <span>Compute Class I Heir Shares</span>
            </a>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 10</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CLASS I HEIR RULES (HSA 1956)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Per Stirpes</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PREDECEASED BRANCH REPRESENTATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10 to ₹100</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NON-JUDICIAL E-STAMP PAPER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 229 BNS</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PERJURY SAFEGUARD ON OATH
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Matching Capital Gains Calculator Layout)
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
                Governed under Sections 8, 9, 10, 15 &amp; 16 of the Hindu Succession Act, 1956, read with
                Section 32 of Bharatiya Sakshya Adhiniyam, 2023, Oaths Act, 1969, and Vineeta Sharma v.
                Rakesh Sharma (2020) SC.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE GENERATOR
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: LEGAL HEIR &amp; PEDIGREE AFFIDAVIT RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>First Step in Post-Death Estate Administration:</strong> Every Tehsildar Legal
                    Heir Certificate, Delhi Surviving Member Certificate (SMC), Gujarat Pedhinama, and bank
                    deceased account claim requires a sworn Legal Heir Affidavit with a structured Pedigree Tree.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Predeceased Heir Disclosure Mandate:</strong> Omitting a deceased son or
                    daughter is the number one reason revenue officers reject applications. Children and widows
                    of predeceased heirs inherit per stirpes by representation under Section 10 of HSA 1956.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Married Daughters Have Equal Coparcenary Status:</strong> Under Supreme Court
                    precedent Vineeta Sharma (2020), married daughters possess equal rights by birth. Any
                    affidavit attempting to exclude married daughters is illegal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Solemn Verification &amp; Perjury Liability:</strong> Affidavits must be sworn
                    before a Notary Public or Oath Commissioner with two independent local witnesses. Making
                    false declarations invites criminal prosecution under Section 229 of Bharatiya Nyaya Sanhita, 2023.
                  </span>
                </li>
              </ul>
            </div>

            {/* EMBEDDED OG BANNER VISUAL (Matching Reference Layout) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs space-y-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-100">
                <Image
                  src="/images/affidavit-of-legal-heirs-pedigree-tree-format-og.jpg"
                  alt="Legal Heir Affidavit and Pedigree Tree Format India with Hindu Succession Act Guidelines"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 px-2 py-1 gap-1">
                <span>Figure 1: Statutory Legal Heir Affidavit &amp; Pedigree Tree Framework (Vamshavali / Pedhinama)</span>
                <span className="font-semibold text-[#5F7E75]">Lawyer-Vetted Template</span>
              </div>
            </div>

            {/* SECTION 1: WHAT IS A LEGAL HEIR & PEDIGREE TREE AFFIDAVIT */}
            <section id="what-is-legal-heir-affidavit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL DEFINITION &amp; PURPOSE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. What is a Legal Heir &amp; Pedigree Tree Affidavit?
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When an Indian citizen passes away without leaving a registered Will (known as dying <em>intestate</em>),
                  their estate does not automatically transfer to family members. Before government land revenue
                  offices, municipal corporations, public sector banks, or co-operative housing societies can transfer
                  the deceased person&rsquo;s properties or financial balances, they require lawful proof establishing
                  the exact identities of all surviving family members.
                </p>
                <p>
                  The foundational document required across all Indian states is a <strong>sworn Affidavit of Legal
                  Heirs with an embedded Genealogical Pedigree Tree</strong>. Known regionally as a <em>Vamshavali</em>,
                  <em>Pedhinama</em>, <em>Warasnama</em>, or <em>Shajra-e-Nasab</em>, this document is an evidentiary
                  sworn statement executed on non-judicial stamp paper. In it, a close family deponent solemnly affirms
                  under oath the complete family lineage of the deceased, explicitly accounting for every living and
                  predeceased heir.
                </p>
                <p>
                  Without an accurate pedigree tree affidavit, revenue officers cannot determine whether other rightful
                  claimants exist. An incomplete affidavit creates cloud on title, leads to instant rejection at the
                  Tehsildar office, and exposes the family to protracted title disputes in civil court.
                </p>
              </div>
            </section>

            {/* SECTION 2: STATUTORY FOUNDATION */}
            <section id="statutory-framework-laws" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Statutory Foundation: HSA 1956 &amp; BSA 2023 Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A legal heirship affidavit derives its legal validity from several key Indian statutes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>Hindu Succession Act, 1956 (Sec 8, 9 &amp; 10)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Defines the priority of succession for male intestates. Property passes simultaneously to Class I
                      heirs: widow, mother, sons, daughters, and the branches of predeceased sons and daughters. Class II
                      heirs inherit only if no Class I heir survives.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <BookOpen className="w-4 h-4 text-[#5F7E75]" />
                      <span>Bharatiya Sakshya Adhiniyam, 2023 (BSA Sec 32)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Replaces Section 32(5) and 32(6) of the Indian Evidence Act, 1872. Recognizes genealogical trees,
                      family records, and ancestral pedigrees executed <em>ante litem motam</em> (before disputes arose)
                      as admissible substantive evidence of pedigree.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Gavel className="w-4 h-4 text-[#C65378]" />
                      <span>The Oaths Act, 1969 &amp; Notaries Act, 1952</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mandates that affidavits must be sworn under solemn affirmation before an appointed Notary Public or
                      Oath Commissioner, bearing the official stamp, notarial register entry number, and notary seal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Bharatiya Nyaya Sanhita, 2023 (Sec 229 &amp; 236)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Replaces IPC Sections 193 and 199. Submitting a false affidavit or concealing a legal heir carries
                      rigorous criminal punishment up to 7 years imprisonment for perjury and fabricating false evidence.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PREDECEASED VS SURVIVING HEIRS */}
            <section id="predeceased-vs-surviving-heirs" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT &amp; RANKING MOAT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Predeceased vs Surviving Heirs: The Missing Moat
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most generic affidavit drafts found online make a catastrophic legal mistake: <strong>they only list
                  surviving family members who are currently living</strong>. When this incomplete affidavit is submitted
                  to a Tehsildar, Sub-Divisional Magistrate, or bank legal cell, it is routinely rejected.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>The Per Stirpes Principle under Section 10 Rule 3 &amp; 4:</span>
                  </div>
                  <p>
                    If a son or daughter passed away before the father or mother, that deceased child&rsquo;s branch does
                    <strong> not</strong> vanish. Their surviving children (the deceased&rsquo;s grandchildren) and the
                    predeceased son&rsquo;s widow legally inherit that entire branch&rsquo;s share by representation (<em>per
                    stirpes</em>). If you omit the predeceased branch from your pedigree table, you are legally disinheriting
                    lawful Class I heirs, rendering the certificate liable to be quashed in High Court.
                  </p>
                </div>
                <p>
                  A legally compliant pedigree tree must present two distinct branches:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Surviving Class I Heirs:</strong> Living spouse, living sons, living daughters, and the living
                    mother of the deceased.
                  </li>
                  <li>
                    <strong>Predeceased Heirs &amp; Their Lineage:</strong> Every son or daughter who passed away prior to
                    the propositus, along with full details of their surviving spouse and children who inherit by representation.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE PEDIGREE GENERATOR */}
            <section id="interactive-pedigree-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE SUCCESSION ENGINE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Legal Heir &amp; Pedigree Tree Generator
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Configure the family tree below to compute exact statutory Class I shares under Section 10 of the
                Hindu Succession Act, 1956, and generate a structured pedigree table for your stamp paper affidavit.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Control Row 1: Gender & Marital Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Gender of Deceased
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeceasedGender("male")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          deceasedGender === "male"
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Male (Father / Son)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeceasedGender("female")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          deceasedGender === "female"
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Female (Mother / Daughter)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Marital Status
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["married", "widowed", "unmarried"] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setDeceasedMaritalStatus(st)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border capitalize transition-colors ${
                            deceasedMaritalStatus === st
                              ? "bg-[#172228] text-white border-[#172228]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Surviving Spouse?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={deceasedMaritalStatus !== "married"}
                        onClick={() => setHasSurvivingSpouse(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          deceasedMaritalStatus === "married" && hasSurvivingSpouse
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                        }`}
                      >
                        Yes (Living)
                      </button>
                      <button
                        type="button"
                        disabled={deceasedMaritalStatus !== "married"}
                        onClick={() => setHasSurvivingSpouse(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          deceasedMaritalStatus !== "married" || !hasSurvivingSpouse
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                        }`}
                      >
                        No / Deceased
                      </button>
                    </div>
                  </div>
                </div>

                {/* Control Row 2: Living Children & Mother */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">Surviving Sons</span>
                      <span className="font-black text-[#C65378] text-sm">{survivingSonsCount}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="6"
                      value={survivingSonsCount}
                      onChange={(e) => setSurvivingSonsCount(parseInt(e.target.value) || 0)}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">Surviving Daughters</span>
                      <span className="font-black text-[#C65378] text-sm">{survivingDaughtersCount}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="6"
                      value={survivingDaughtersCount}
                      onChange={(e) => setSurvivingDaughtersCount(parseInt(e.target.value) || 0)}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                  </div>

                  {deceasedGender === "male" && (
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-xs block">
                        Is Mother Surviving? (Class I)
                      </span>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsMotherSurviving(true)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            isMotherSurviving
                              ? "bg-[#5F7E75] text-white border-[#5F7E75]"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          Yes (Living)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsMotherSurviving(false)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                            !isMotherSurviving
                              ? "bg-slate-800 text-white border-slate-800"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          No (Predeceased)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Control Row 3: Predeceased Branches (Moat Feature) */}
                <div className="space-y-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                        Predeceased Children Branches (Per Stirpes Representation)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Disclose any sons or daughters who died before the propositus
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">Predeceased Sons Count</span>
                        <span className="font-black text-[#C65378] text-sm">{predeceasedSonsCount}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3"
                        value={predeceasedSonsCount}
                        onChange={(e) => setPredeceasedSonsCount(parseInt(e.target.value) || 0)}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      {predeceasedSonBranches.map((branch, idx) => (
                        <div key={idx} className="pt-2 border-t border-rose-200/60 text-[11px] text-slate-700 space-y-1">
                          <div className="font-bold text-rose-900">Branch of Predeceased Son #{idx + 1}:</div>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={branch.widow}
                                onChange={(e) => {
                                  const updated = [...predeceasedSonBranches];
                                  updated[idx].widow = e.target.checked;
                                  setPredeceasedSonBranches(updated);
                                }}
                                className="accent-[#C65378] rounded"
                              />
                              <span>Living Widow</span>
                            </label>
                            <label className="flex items-center gap-1.5">
                              <span>Grandchildren:</span>
                              <input
                                type="number"
                                min="0"
                                max="6"
                                value={branch.childrenCount}
                                onChange={(e) => {
                                  const updated = [...predeceasedSonBranches];
                                  updated[idx].childrenCount = Math.max(0, parseInt(e.target.value) || 0);
                                  setPredeceasedSonBranches(updated);
                                }}
                                className="w-12 px-1 py-0.5 border rounded bg-white text-center font-bold"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">Predeceased Daughters Count</span>
                        <span className="font-black text-[#172228] text-sm">{predeceasedDaughtersCount}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3"
                        value={predeceasedDaughtersCount}
                        onChange={(e) => setPredeceasedDaughtersCount(parseInt(e.target.value) || 0)}
                        className="w-full accent-slate-800 cursor-pointer"
                      />
                      {predeceasedDaughterBranches.map((branch, idx) => (
                        <div key={idx} className="pt-2 border-t border-slate-200 text-[11px] text-slate-700 space-y-1">
                          <div className="font-bold text-slate-900">Branch of Predeceased Daughter #{idx + 1}:</div>
                          <div className="flex items-center gap-2">
                            <span>Surviving Grandchildren:</span>
                            <input
                              type="number"
                              min="0"
                              max="6"
                              value={branch.childrenCount}
                              onChange={(e) => {
                                const updated = [...predeceasedDaughterBranches];
                                updated[idx].childrenCount = Math.max(0, parseInt(e.target.value) || 0);
                                setPredeceasedDaughterBranches(updated);
                              }}
                              className="w-12 px-1 py-0.5 border rounded bg-white text-center font-bold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RESULTS SUMMARY BOX */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        STATUTORY SUCCESSION ANALYSIS
                      </div>
                      <div className="text-lg font-black text-white">
                        Total Class I Primary Shares: {calculatedShares.totalBranches}
                      </div>
                    </div>
                    <div className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                      Section 10 Hindu Succession Act, 1956
                    </div>
                  </div>

                  <p className="text-xs text-white/90 leading-relaxed">{calculatedShares.summary}</p>

                  {/* Share breakdown table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/15 text-rose-200">
                          <th className="py-2 pr-3 font-bold">Category</th>
                          <th className="py-2 px-3 font-bold">Relation</th>
                          <th className="py-2 px-3 font-bold">Share Fraction</th>
                          <th className="py-2 px-3 font-bold">Percent Share</th>
                          <th className="py-2 pl-3 font-bold">Branch Per Stirpes Rule</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {calculatedShares.items.map((it, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-2.5 pr-3 font-semibold text-white/90">{it.category}</td>
                            <td className="py-2.5 px-3 font-bold text-white">{it.relation}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-rose-300">{it.branchShareFraction}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-400">{it.branchSharePercent.toFixed(2)}%</td>
                            <td className="py-2.5 pl-3 text-white/80 text-[11px]">{it.subDistribution || "Direct per capita share"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 text-[11px] text-white/70 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                    <span>
                      Need a formal certificate for bank deceased claims or land mutation? Consult our succession advocates.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMPARISON TABLE */}
            <section id="comparison-lhc-smc-succession" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>LEGAL CERTIFICATE COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Legal Heir vs SMC vs Succession Certificate
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many families confuse revenue legal heir certificates with civil court decrees. The table below outlines
                the exact differences across statutory authority, property coverage, fees, and processing times:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Parameter</th>
                        <th className="py-3.5 px-4 font-bold">Legal Heir Certificate (LHC)</th>
                        <th className="py-3.5 px-4 font-bold">Surviving Member Cert (SMC)</th>
                        <th className="py-3.5 px-4 font-bold">Succession Certificate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Issuing Authority</td>
                        <td className="py-3 px-4">Tehsildar / Taluk Office / Revenue Inspector</td>
                        <td className="py-3 px-4">Sub-Divisional Magistrate (SDM) / e-District</td>
                        <td className="py-3 px-4 font-semibold text-rose-800">Competent Civil Court (Civil Judge / District Judge)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Governing Statute</td>
                        <td className="py-3 px-4">State Land Revenue Codes &amp; Manuals</td>
                        <td className="py-3 px-4">Revenue Dept Citizen Charters (Delhi / HR)</td>
                        <td className="py-3 px-4">Indian Succession Act, 1925 (Part X, Sec 372)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Asset Applicability</td>
                        <td className="py-3 px-4">Land mutation, basic bank balances, pension transfer</td>
                        <td className="py-3 px-4">Bank accounts, DDA flats, electricity/water transfer</td>
                        <td className="py-3 px-4 font-semibold text-emerald-800">Movable debts, shares, mutual funds, provident funds</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Legal Conclusiveness</td>
                        <td className="py-3 px-4">Administrative presumption; does not confer title</td>
                        <td className="py-3 px-4">Administrative identification of living members</td>
                        <td className="py-3 px-4 font-semibold text-emerald-800">Statutory immunity for debtors; conclusive legal indemnity</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Time Required</td>
                        <td className="py-3 px-4">15 to 30 days (subject to field inquiry)</td>
                        <td className="py-3 px-4">14 to 21 working days</td>
                        <td className="py-3 px-4 text-amber-800 font-semibold">6 to 12 months (involves newspaper citation)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">Government / Court Fee</td>
                        <td className="py-3 px-4">Nominal (₹10 to ₹50 application fee)</td>
                        <td className="py-3 px-4">Nil or nominal user fee</td>
                        <td className="py-3 px-4 font-bold text-rose-800">Ad valorem court fees (typically 2% to 7% of estate value)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: MASTER AFFIDAVIT TEMPLATE */}
            <section id="master-affidavit-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL DRAFT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Format 1: Legal Heir Affidavit with Pedigree Tree
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Print this format on prescribed non-judicial e-stamp paper (₹10 to ₹100 depending on state rules),
                affix the deponent&rsquo;s passport photograph, sign before a Notary Public, and obtain two local
                witness identifications.
              </p>

              {/* Template Box Container */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Universal Legal Heirship &amp; Pedigree Tree Affidavit Format
                    </div>
                    <div className="text-xs text-slate-500">
                      Compliant with Hindu Succession Act, 1956 &amp; Bharatiya Sakshya Adhiniyam, 2023
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyAffidavitToClipboard}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedAffidavit ? (
                      <>
                        <CheckCheck className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Complete Affidavit</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 sm:p-5 rounded-xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[600px] overflow-y-auto border border-slate-800">
{`BEFORE THE EXECUTIVE MAGISTRATE / TEHSILDAR / COMPETENT REVENUE AUTHORITY AT [CITY/DISTRICT]

AFFIDAVIT OF LEGAL HEIRS & GENEALOGICAL PEDIGREE TREE (VAMSHAVALI / PEDHINAMA)
(Under the Oaths Act, 1969 & Bharatiya Sakshya Adhiniyam, 2023)

I, [Full Name of Deponent], son/daughter/wife of Late [Name of Father/Husband], aged about [Age] years, residing at [Complete Residential Address with Pincode], holding Aadhaar Card No. [Aadhaar Number], do hereby solemnly affirm and state on oath as under:

1. That I am the deponent herein and a permanent resident of the address stated above. I am competent to depose to the facts stated herein as a Class I legal heir of the deceased Late [Full Name of Deceased].

2. That the deceased Late [Full Name of Deceased], who was my [Relationship, e.g. Father/Husband/Mother], departed this life on [Date of Death] at [Place of Death, e.g. Hospital / Residence, City, State].

3. That the Death Certificate of the deceased was duly issued by the Registrar of Births and Deaths, [Name of Municipal Corporation / Gram Panchayat], bearing Registration No. [Registration Number] dated [Issue Date], a true copy whereof is annexed hereto as ANNEXURE-A.

4. That the deceased was a Hindu by religion and was governed by the Hindu Succession Act, 1956 (as amended up to date) in matters of inheritance and succession at the time of his/her demise.

5. That the deceased died intestate, without executing any Last Will and Testament, Codicil, Gift Deed, Trust, or any other testamentary disposition regarding his/her movable or immovable properties during his/her lifetime.

6. That the deceased was survived by the following surviving Class I legal heirs and left behind the genealogical pedigree tree (Vamshavali / Pedhinama) set out below:

---------------------------------------------------------------------------------------------------------------------------------
TABLE OF LEGAL HEIRS & GENEALOGICAL PEDIGREE TREE
---------------------------------------------------------------------------------------------------------------------------------
S.No. | Full Name of Legal Heir  | Age | Relationship with Deceased | Marital Status | Surviving / Predeceased | Class of Heir
1.    | [Surviving Spouse Name]  | [ ] | Wife / Husband             | Married        | Surviving (Living)      | Class I
2.    | [Living Son Name]        | [ ] | Son                        | Married        | Surviving (Living)      | Class I
3.    | [Living Daughter Name]   | [ ] | Daughter                   | Married        | Surviving (Living)      | Class I
4.    | [Living Mother Name]     | [ ] | Mother                     | Widowed        | Surviving (Living)      | Class I
5.    | Late [Predeceased Son]   | --  | Son (Died on [Date])       | Married        | Predeceased (Deceased)  | Class I Branch
  (a) | [Widow of Predeceased]   | [ ] | Daughter-in-law (Widow)    | Widowed        | Surviving (Living)      | Class I (Per Stirpes)
  (b) | [Grandson Name]          | [ ] | Grandson                   | Unmarried      | Surviving (Living)      | Class I (Per Stirpes)
  (c) | [Granddaughter Name]     | [ ] | Granddaughter              | Unmarried      | Surviving (Living)      | Class I (Per Stirpes)
---------------------------------------------------------------------------------------------------------------------------------

7. NEGATIVE DECLARATION & NON-CONCEALMENT:
That save and except the legal heirs specifically named in the Pedigree Table in paragraph 6 above, the deceased Late [Deceased Name] left behind NO OTHER legal heirs whatsoever, whether natural, adopted, legitimate, or illegitimate. There are no other surviving spouses, sons, daughters, mother, or children of any predeceased son or daughter.

8. That no child of the deceased was given or taken in adoption by any third party, and the deceased did not contract any other marriage during his/her lifetime or leave behind any undisclosed family.

9. That this affidavit is executed solemnly for submission before [Name of Authority, e.g. Tehsildar / SDM / Sub-Registrar / Bank Name] for the issuance of a Legal Heir Certificate / Surviving Member Certificate / Pedhinama and for the lawful transmission and mutation of the estate of the deceased.

10. That I, the deponent herein, do hereby declare that if any statement made in this affidavit is found to be false, concealed, or untrue at any stage, I shall be personally liable for criminal prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023, and I shall fully indemnify all authorities against any resultant loss or dispute.

DEPONENT

VERIFICATION:
Verified at [City/Place] on this [Date] day of [Month], [Year], that the contents of paragraphs 1 to 10 of this affidavit are true and correct to the best of my knowledge, information, and belief. No part of it is false, and nothing material has been concealed therefrom.

DEPONENT

IDENTIFICATION:
Identified by me:
1. Advocate / Witness:
   Name: [Advocate Name]
   Enrolment No: [Enrolment Number]
   Signature: __________________________

2. Local Resident Witness:
   Name: [Witness Name]
   Aadhaar No: [Aadhaar Number]
   Address: [Address]
   Signature: __________________________

ATTESTATION BEFORE NOTARY PUBLIC:
Solemnly affirmed and signed before me by the deponent at [City] on this [Date] day of [Month], [Year], who has been identified by the witnesses above-named.

NOTARY PUBLIC / OATH COMMISSIONER
(Seal, Regn No., Notarial Stamp & Volume/Page Entry)`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: REGIONAL PEDHINAMA & VAMSHAVALI */}
            <section id="regional-pedhinama-vamshavali" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>STATE REVENUE PROCEDURES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. State Revenue Formats: Pedhinama &amp; Vamshavali
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  While the substantive rules of intestate succession are governed uniformly by the Hindu Succession Act,
                  each Indian state revenue department prescribes distinct administrative nomenclatures and inquiry rules:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>Delhi: Surviving Member Certificate (SMC)</span>
                      <span className="text-[10px] bg-rose-50 text-[#C65378] px-2 py-0.5 rounded font-black">e-District</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Issued exclusively online through the Revenue Department of GNCTD on the e-District portal.
                      Requires a notarized self-declaration affidavit, municipal death certificate, photo IDs of all heirs,
                      and residence proof. An SDM field verification precedes digital issuance.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>Gujarat: Talati Pedhinama (પેઢીનામું)</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black">Panchayat / Talati</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Compulsory for mutating agricultural 7/12 land records and urban property cards. The deponent files
                      an affidavit on stamp paper with 2 non-relative panch witnesses. The Talati-cum-Mantri verifies village
                      registers and issues the signed Pedhinama.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>Maharashtra: Waras Certificate / Varasnama</span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black">Sec 85 MLRC</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed under Section 85 of the Maharashtra Land Revenue Code, 1966. Filed before the Tahsildar
                      with an affidavit on ₹100 stamp paper. The Talathi posts a 15-day public notice at the Chavdi before
                      updating the 7/12 Ferfar (mutation entry).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-2xs">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>Uttar Pradesh: Varashat &amp; Shajra-e-Nasab</span>
                      <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-black">e-Sathi Portal</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Recorded under Section 33(1) of the UP Revenue Code, 2006. The applicant files Form R-6 (Varashat)
                      online on e-Sathi or Vaad portal with the Shajra-e-Nasab (family genealogical tree). The Lekhpal
                      verifies and the Revenue Inspector passes the Khatauni order within 45 days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: ESSENTIAL CLAUSES */}
            <section id="essential-clauses-negative-declaration" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>LEGAL DRAFTING DEFENSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Key Clauses: Negative Declaration &amp; Indemnity
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A legally robust legal heir affidavit must incorporate three critical statutory safeguards to prevent
                  future revocation or criminal allegations:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">
                      1. The Absolute Negative Declaration Clause
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Revenue officers and banks require an affirmative sworn statement that no other legal heirs exist.
                      This eliminates ambiguity regarding undisclosed marriages, illegitimate children, or informal adoptions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">
                      2. The Ante Litem Motam Recital (BSA Section 32)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 32 of Bharatiya Sakshya Adhiniyam, statements regarding blood relationships are admissible
                      only if made <em>ante litem motam</em> (before any controversy or dispute arose). Expressly stating that
                      the family is harmonious and no suit is pending reinforces evidentiary credibility.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="font-bold text-slate-900 text-sm">
                      3. Statutory Perjury &amp; Institutional Indemnity Undertaking
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The deponent must explicitly covenant to indemnify the issuing government department, registrar, or bank
                      against any third-party claims, acknowledging direct liability under Section 229 of Bharatiya Nyaya Sanhita, 2023.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="stamp-duty-notarization-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PROCEDURAL TIMELINE &amp; EXECUTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Stamping to Tehsildar Filing
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this verified 6-step legal protocol to execute and submit your legal heir affidavit without
                procedural delays:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "Step 1",
                    title: "Procure Certified Municipal Death Certificate",
                    desc: "Obtain the official death certificate issued by the Registrar of Births and Deaths (MCD, BMC, BBMP, or Gram Panchayat). Verify that the deceased's name spelling matches their Aadhaar and PAN cards.",
                  },
                  {
                    step: "Step 2",
                    title: "Compile KYC Documents of All Surviving & Predeceased Heirs",
                    desc: "Collect self-attested copies of Aadhaar card, PAN card, and voter ID for every surviving heir. If any heir predeceased the parent, collect their death certificate and the marriage certificate of their surviving spouse.",
                  },
                  {
                    step: "Step 3",
                    title: "Purchase Non-Judicial e-Stamp Paper",
                    desc: "Purchase e-stamp paper of appropriate denomination (₹10 to ₹100 depending on state rules) through Stock Holding Corporation of India (SHCIL) or licensed stamp vendor, naming the deponent as the first party.",
                  },
                  {
                    step: "Step 4",
                    title: "Draft Affidavit with Embedded Genealogical Pedigree Table",
                    desc: "Print the format verbatim on the e-stamp paper and subsequent green legal ledger sheets. Affix the deponent's recent passport-size photograph on the top right corner.",
                  },
                  {
                    step: "Step 5",
                    title: "Execute Solemn Oath Before Notary Public with Two Witnesses",
                    desc: "Sign each page before an appointed Notary Public or Oath Commissioner. Ensure two independent adult witnesses (not co-heirs, preferably local neighbors or an advocate) identify the deponent and sign.",
                  },
                  {
                    step: "Step 6",
                    title: "Submit on State e-District Portal or Tehsildar Office",
                    desc: "Upload the notarized affidavit along with the application form, electricity bill, and death certificate on the state portal (Delhi e-District, UP e-Sathi, MahaDBT). Await the Patwari / Lekhpal field verification.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 flex flex-col sm:flex-row gap-4 items-start shadow-2xs"
                  >
                    <div className="px-3 py-1.5 rounded-lg bg-[#172228] text-white font-extrabold text-xs shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: REAL POST-DEATH CASE STUDIES */}
            <section id="bank-and-property-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>PRACTICAL PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Post-Death Case Studies in India
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Case Study 1 • Delhi SDM Rejection Resolved
                    </span>
                    <span className="text-slate-400">South Delhi</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Predeceased Son Disclosure Overcomes SMC Rejection
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family in Greater Kailash applied for an e-District Surviving Member Certificate listing only 2 living
                    daughters. During field verification, the local Patwari discovered an elder son had passed away in 2021
                    leaving a widow and a 12-year-old grandson. The SDM immediately issued a show-cause notice for suppression
                    of facts.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AMA Legal Solutions drafted a revised comprehensive Pedigree Tree Affidavit establishing the predeceased
                    son&rsquo;s branch under Section 10 Rule 3. The SDM accepted the amended filing, issuing the SMC with 1/3rd
                    per stirpes protection for the minor grandchild.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Case Study 2 • Bank Fixed Deposit Transmission
                    </span>
                    <span className="text-slate-400">SBI Mumbai</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    ₹38 Lakhs Claim Released Without Succession Certificate
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A deceased businessman in Borivali left ₹38 Lakhs across three fixed deposit accounts without registering
                    a nomination. The branch initially demanded a High Court Succession Certificate, which would have cost
                    ₹1.8 Lakhs in court fees and taken 9 months.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    By submitting our standardized Pedigree Tree Affidavit accompanied by a Stamped Bank Indemnity Bond and
                    NOCs from the two married sisters, the branch legal department approved the claim under RBI Master Directions
                    within 18 working days, saving the family lakhs in legal expenses.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPYABLE UNDERTAKINGS */}
            <section id="copyable-legal-undertakings" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPYABLE ANCILLARY CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Revenue &amp; Bank Undertaking Clauses
              </h2>

              {/* Clause Box 1: Negative Declaration */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Statutory Negative Declaration &amp; Non-Concealment Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyNegativeClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedNegativeClause ? (
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
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I, the deponent herein, do hereby solemnly swear and affirm that the deceased Late [Deceased Name] died intestate leaving behind only the Class I legal heirs specifically enumerated in the genealogical pedigree table above. I categorically declare that there are no other legal heirs, surviving spouse, natural or adopted sons, married or unmarried daughters, surviving mother, or any children of any predeceased child. If any undisclosed claimant comes forward or if any averment is proved false, I shall be personally liable for criminal prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 for perjury and fraud, and I shall fully indemnify all authorities against any resultant loss."`}
                </pre>
              </div>

              {/* Clause Box 2: Bank Indemnity */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Bank Deceased Claim Settlement Indemnity Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyBankClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBankClause ? (
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
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"WHEREAS Late [Deceased Name] held Savings Bank / Current / Term Deposit Account No. [Account Number] with [Bank Name], [Branch Name], having an outstanding balance of Rs. [Amount]/- at the time of demise.
AND WHEREAS the deceased died intestate leaving behind the claimants as his/her sole legal heirs under the Hindu Succession Act, 1956, as per the notarized Pedigree Tree Affidavit annexed hereto.
NOW THEREFORE, in consideration of the Bank agreeing to pay the said proceeds to [Claimant Name] on behalf of all legal heirs without requiring a Civil Court Succession Certificate, we, the undersigned legal heirs jointly and severally undertake to indemnify and keep indemnified the Bank against all claims, demands, actions, or proceedings by any third party."`}
                </pre>
              </div>

              {/* Clause Box 3: Housing Society Transmission */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Co-Operative Housing Society Flat Transmission Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyCHSClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedCHSClause ? (
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
                <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"We, the surviving legal heirs of Late [Deceased Name], deceased member of [Society Name] Co-operative Housing Society Ltd., holding Flat No. [Flat No.] and Share Certificate No. [Cert No.], do hereby request the Society to transmit the nominal membership and flat rights in the name of [Nominee / Legal Heir Name]. We solemnly affirm that there are no disputes among the heirs, and we undertake to indemnify the Society and its Managing Committee against all future adverse claims or court litigations."`}
                </pre>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Review &amp; Advocate Credentials
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Succession Advocacy Bench
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start sm:self-auto">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Advocates</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-900 text-sm">Lead Reviewer</div>
                    <p className="leading-relaxed">
                      Advocate Anuj Anand Malik, Senior Succession &amp; Testamentary Counsel, Bar Council of Delhi.
                      Over 12 years representing families before High Courts and Revenue Authorities.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-900 text-sm">Practice Specialization</div>
                    <p className="leading-relaxed">
                      Indian Succession Act, Hindu Succession Act, High Court Probate Petitions, Tehsildar Legal Heir
                      Certificates, Delhi SMC applications, and bank deceased claim settlements.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-900 text-sm">Statutory Vetting</div>
                    <p className="leading-relaxed">
                      Every template is strictly checked for compliance with the Bharatiya Sakshya Adhiniyam, 2023,
                      Registration Act, 1908, and State Revenue Department circulars.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Legal Heirship
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white transition-all overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#C65378] transition-colors gap-3"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                          <p className="pt-3">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>AUTHORITATIVE SOURCES &amp; PORTALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Revenue Portals
              </h2>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-xs text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <a
                    href="https://www.indiacode.nic.in/handle/123456789/1392"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>India Code: Hindu Succession Act</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>India Code: Bharatiya Sakshya Adhiniyam</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://edistrict.delhigovt.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>Delhi e-District: Surviving Member (SMC)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://anyror.gujarat.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>Gujarat AnyRoR: Pedhinama Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://esathi.up.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>UP e-Sathi: Varashat Application</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60"
                  >
                    <span>RBI Deceased Claims Circulars</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Court Fee Calculator
                    </Link>
                    <Link
                      href="/tools/post-death-30-day-legal-compliance-tracker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Post-Death 30-Day Tracker
                    </Link>
                    <Link
                      href="/tools/bank-deceased-claim-document-checklist-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Checklist
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Capital Gains Calculator
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Standard Will Format India
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Sub-Registrar Will Registration
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Matching Reference Theme)
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
                Specialist in Indian testamentary jurisprudence, Tehsildar legal heir certificates, High Court
                probate petitions, and disputed intestate estate distributions.
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
                  <span>PREVENT LEGAL HEIR CERTIFICATE HEADACHES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Intestate Succession Delays
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  When you die intestate, your family faces months of Tehsildar visits, notary affidavits, and bank
                  scrutiny. A registered Will bypasses the need for legal heir certificates.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) - NO MOBILE NUMBER */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SDM, TEHSILDAR &amp; BANK CLAIM DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Disputed Legal Heirship or Bank Claim Rejection?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates handle Delhi e-District SMC petitions, Gujarat Talati Pedhinamas,
                  Revenue Court Varashat mutations, and bank deceased claim releases pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
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
                      <strong>Predeceased Heir Security:</strong> Eliminates Tehsildar rejections by including representation branches.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>State Specific Formats:</strong> Vetted for Delhi SMC, Gujarat Pedhinama, and UP Varashat.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Deceased Ready:</strong> Complies with RBI deceased depositor settlement guidelines.
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
          href="#interactive-pedigree-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Heir Calculator</span>
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
