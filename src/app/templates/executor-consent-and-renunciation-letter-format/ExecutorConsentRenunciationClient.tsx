"use client";

import React, { useState, useEffect } from "react";
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
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  Globe,
  Briefcase,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Foundation: Sections 229 to 232" },
  { id: "interactive-templates", label: "2. Interactive Legal Formats (4 Templates)" },
  { id: "consent-vs-renunciation", label: "3. Pre-Death Consent vs Post-Death Renunciation" },
  { id: "intermeddling-doctrine", label: "4. Intermeddling Doctrine: When Renunciation Fails" },
  { id: "comparison-table", label: "5. Legal Comparison: Transfer Mechanisms" },
  { id: "nri-executor-protocol", label: "6. NRI Executor Renunciation Protocol" },
  { id: "step-by-step-sop", label: "7. Step-by-Step SOP: Section 230 Court Filing" },
  { id: "interactive-evaluator", label: "8. Renunciation & LOA Readiness Evaluator" },
  { id: "real-case-studies", label: "9. Real Case Studies: Delhi, Mumbai & Bengaluru" },
  { id: "institutional-profile", label: "10. Advocate Profile & Testamentary Verification" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
  { id: "statutory-citations", label: "12. Statutory Citations & High Court Precedents" },
];

const FAQS = [
  {
    q: "Can an executor refuse to act after the testator dies?",
    a: "Yes. An individual named as executor in a Will is never legally compelled to accept the office. Under Section 230 of the Indian Succession Act, 1925, an executor may renounce executorship either orally in court before the Judge or in writing through a signed renunciation declaration.",
  },
  {
    q: "What happens if the named executor renounces executorship?",
    a: "When an executor formally renounces under Section 230, the court cannot grant probate to them. Instead, under Section 231 and Section 232, the residuary legatees or legal heirs can apply directly for Letters of Administration with the Will Annexed, allowing them to administer and distribute the estate.",
  },
  {
    q: "Can an executor renounce after taking charge of estate assets?",
    a: "No. Under the established legal doctrine of intermeddling (affirmed in In the Goods of Bholanath Mullick), once an executor takes control of estate assets, operates bank accounts, or acts in the administration, they have accepted the office and cannot arbitrarily renounce. In such cases, only the High Court can discharge them under Section 301 upon proper accounting.",
  },
  {
    q: "Why is a Pre-Death Executor Consent Letter recommended during Will drafting?",
    a: "Obtaining a written consent letter while the testator is alive confirms that the designated executor is willing and physically capable of handling the responsibility. This prevents unexpected probate delays, family disputes, and costly Section 229 court citations after the testator passes away.",
  },
  {
    q: "How does an NRI executor renounce executorship from outside India?",
    a: "An NRI or foreign resident executor must execute the Renunciation Deed before an Indian Consular Officer or have it notarized and apostilled under the Hague Apostille Convention. Upon arrival in India, the document must be stamped within 3 months under Section 18 of the Indian Stamp Act, 1899 before submission to the probate court.",
  },
  {
    q: "What is a citation under Section 229 of the Indian Succession Act?",
    a: "A citation is a formal notice issued by the court to an executor who has neither applied for probate nor formally renounced. It orders the executor to accept or renounce within a fixed period. If the executor fails to appear after citation, their right is deemed forfeited under Section 231.",
  },
  {
    q: "Does an executor renunciation need to be registered at the Sub-Registrar Office?",
    a: "Registration at the Sub-Registrar Office is not mandatory for an executor renunciation under Section 230 ISA. However, executing the renunciation on non-judicial stamp paper attested by a public notary or filing an affidavit directly in the testamentary court is standard judicial practice across Indian High Courts and District Courts.",
  },
  {
    q: "Can an executor renounce executorship in part and keep the rest?",
    a: "No. Renunciation of executorship must be complete and unconditional. An executor cannot accept the office for personal bank deposits while renouncing responsibility for disputed real estate. A partial renunciation is invalid under Section 230 of the Indian Succession Act.",
  },
  {
    q: "What stamp duty applies to an executor renunciation deed in India?",
    a: "Stamp duty is governed by respective State Stamp Acts. Typically, an executor renunciation declaration is executed on non-judicial stamp paper of ₹100 in Maharashtra and Delhi, or ₹100 to ₹500 in Karnataka, Tamil Nadu, and Uttar Pradesh under the general article for release deeds or affidavits.",
  },
];

export default function ExecutorConsentRenunciationClient() {
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
  const [activeTemplateTab, setActiveTemplateTab] = useState<number>(0);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Evaluator Tool State
  const [evaluatorWillingness, setEvaluatorWillingness] = useState<string>("unwilling");
  const [evaluatorLocation, setEvaluatorLocation] = useState<string>("abroad");
  const [evaluatorIntermeddled, setEvaluatorIntermeddled] = useState<string>("no");
  const [evaluatorResiduaryReady, setEvaluatorResiduaryReady] = useState<string>("yes");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TEMPLATES = [
    {
      title: "Template 1: Pre-Death Executor Consent Letter (Will Drafting)",
      subtitle: "Executed by designated executor during testator's lifetime to confirm acceptance",
      text: `FORM OF PRE-DEATH EXECUTOR CONSENT AND ACCEPTANCE LETTER

To,
[Full Name of Testator]
[Son / Daughter of Full Name of Testator's Father]
Residing at: [Residential Address of Testator]

Date: [Date of Signing, e.g., 27th October 2026]
Place: [City, State]

SUBJECT: FORMAL CONSENT AND ACCEPTANCE OF NOMINATION AS EXECUTOR OF LAST WILL AND TESTAMENT

Dear [Title/Name of Testator],

1. I, [Full Legal Name of Designated Executor], son/daughter/spouse of [Father's/Spouse's Name], aged about [Age] years, residing at [Permanent Residential Address], holding Aadhaar No. [Aadhaar Number] and PAN [PAN Number], hereby acknowledge receipt of your request to act as the sole / joint Executor of your Last Will and Testament.

2. I confirm that you have briefed me regarding the nature and general location of your movable and immovable properties, bank accounts, investments, and your intended testamentary disposition in favour of your beneficiaries.

3. I hereby grant my voluntary, free, and unconditional consent to act as an Executor under your Last Will and Testament upon your demise. I confirm that:
   (a) I am of sound mental health, competent to enter into legal obligations, and have not been adjudged insolvent or of unsound mind by any court of law;
   (b) I undertake to faithfully carry out your testamentary instructions, apply for Probate or Letters of Administration with Will Annexed before the competent civil or testamentary court where required by law, prepare the true inventory and accounts of your estate within the statutory timelines prescribed under Section 317 of the Indian Succession Act, 1925, and distribute the net proceeds and bequests strictly to your named legatees;
   (c) In the event of any health impediment or unforeseen circumstance preventing me from discharging these fiduciary obligations, I undertake to execute a prompt formal Renunciation of Executorship under Section 230 of the Indian Succession Act, 1925, to ensure your beneficiaries can secure Letters of Administration without litigation delays.

4. This letter may be retained by you along with your original Will or placed in the safe custody of your legal advisor.

Yours faithfully,

__________________________________________
[Signature of Designated Executor]
Full Name: [Full Name of Designated Executor]
Mobile: [Contact Details - Kept on Testator File]
Email: [Email Address]

IN THE PRESENCE OF WITNESSES:

Witness 1:
Signature: _______________________________
Name: [Full Name of Witness 1]
Address: [Address]
Aadhaar/ID: [ID Number]

Witness 2:
Signature: _______________________________
Name: [Full Name of Witness 2]
Address: [Address]
Aadhaar/ID: [ID Number]`,
    },
    {
      title: "Template 2: Post-Death Section 230 Renunciation Deed",
      subtitle: "Executed on Non-Judicial Stamp Paper by executor refusing or unable to act",
      text: `DEED OF FORMAL RENUNCIATION OF EXECUTORSHIP
(PURSUANT TO SECTION 230 OF THE INDIAN SUCCESSION ACT, 1925)

THIS DEED OF RENUNCIATION is executed at [City, State] on this [Day] day of [Month], [Year]:

BY:
[Full Legal Name of Renouncing Executor], son/daughter/spouse of [Father's/Spouse's Name], aged about [Age] years, Indian Inhabitant / Non-Resident Indian, residing at [Full Address], holding Aadhaar Card / Passport No. [Number] (hereinafter referred to as the "RENOUNCING EXECUTOR", which expression shall include his/her legal representatives).

IN FAVOUR OF:
The Estate of the deceased Late [Full Name of Testator], who departed this life on [Date of Death] at [Place of Death], and all the legal heirs, universal legatees, and residuary beneficiaries named under his/her Last Will and Testament dated [Date of Will].

WHEREAS:
A. The Late [Full Name of Testator] executed his/her Last Will and Testament dated [Date of Will] (hereinafter referred to as the "said Will"), wherein the Renouncing Executor was nominated and appointed as the sole / joint Executor thereof.

B. The said Testator departed this life on [Date of Death] at [Place of Demise]. A certified copy of the Municipal Death Certificate bearing Registration No. [Registration Number] dated [Certificate Date] is annexed hereto as Annexure A.

C. The Renouncing Executor has not at any time intermeddled with the assets, properties, funds, or estate of the deceased Late [Full Name of Testator], nor has he/she collected any debts, operated bank lockers or accounts, or performed any administrative acts pertaining to the estate.

D. Owing to [State Reason: e.g., advanced age, severe medical condition, professional commitments abroad, or permanent residence in the United States], the Renouncing Executor is wholly unable to undertake the time-consuming administrative responsibilities, court proceedings, and probate formalities required under the Indian Succession Act, 1925.

NOW THIS DEED OF RENUNCIATION WITNESSETH AND IT IS HEREBY DECLARED AND AGREED AS FOLLOWS:

1. ABSOLUTE RENUNCIATION UNDER SECTION 230:
The Renouncing Executor does hereby expressly, voluntarily, unconditionally, and irrevocably renounce and disclaim all his/her rights, title, powers, and office as Executor of the Last Will and Testament dated [Date of Will] of the Late [Full Name of Testator], pursuant to Section 230 of the Indian Succession Act, 1925.

2. PRECLUSION FROM PROBATE:
The Renouncing Executor acknowledges and accepts that by executing this writing, he/she is permanently precluded under Section 230 of the Indian Succession Act, 1925 from ever hereafter applying for Probate of the said Will.

3. CONSENT FOR LETTERS OF ADMINISTRATION (SECTION 232):
The Renouncing Executor hereby accords his/her complete and unequivocal No-Objection for the grant of Letters of Administration with the Will Annexed under Section 232 of the Indian Succession Act, 1925, to [Full Name of Beneficiary/Applicant], the residuary legatee / legal heir of the deceased, without the requirement of serving any court citation under Section 229 upon the Renouncing Executor.

4. NO INTERMEDDLING COVENANT:
The Renouncing Executor solemnly affirms that he/she holds no assets, title deeds, bank deposit receipts, jewellery, or movable property belonging to the estate of the deceased, and that no liabilities or claims have been created by him/her against the estate.

IN WITNESS WHEREOF the Renouncing Executor has hereunto set and subscribed his/her hands on the day, month, and year first above written.

__________________________________________
[SIGNATURE OF RENOUNCING EXECUTOR]
Name: [Full Name of Renouncing Executor]

VERIFICATION & ATTESTATION BY NOTARY PUBLIC / ADVOCATE:
Signed, sealed, and delivered by the within named Renouncing Executor in my presence.
Identified by Advocate: [Advocate Name & Enrolment No.]

[Notary Seal, Stamp, and Registration Details]`,
    },
    {
      title: "Template 3: Affidavit of Renunciation for Probate Court",
      subtitle: "Verified on oath for filing directly in District Court or High Court Testamentary Petition",
      text: `IN THE COURT OF THE PRINCIPAL DISTRICT JUDGE / HON'BLE HIGH COURT OF [NAME OF COURT]
TESTAMENTARY AND INTESTATE JURISDICTION

TESTAMENTARY PETITION / MISC. SUCCESSION CASE NO. _______ OF 2026

IN THE MATTER OF:
The Indian Succession Act, 1925, Sections 230 & 232;
AND
IN THE MATTER OF:
The Estate and Last Will and Testament of Late [Full Name of Testator], Deceased.

[Full Name of Residuary Legatee / Applicant]
... PETITIONER / APPLICANT

VERSUS

[Full Name of Renouncing Executor & Other Relatives]
... RESPONDENTS

AFFIDAVIT OF RENUNCIATION OF EXECUTORSHIP UNDER SECTION 230 ISA

I, [Full Legal Name of Executor], son/daughter/spouse of [Father's/Spouse's Name], aged [Age] years, Indian Inhabitant / Non-Resident Indian, residing at [Complete Residential Address], do hereby solemnly affirm and state on oath as under:

1. I am Respondent No. [Number] in the above petition and the named Executor under the Last Will and Testament dated [Date of Will] executed by the deceased Late [Name of Testator], who died on [Date of Death]. I am well conversant with the facts of the case.

2. I state that under Clause [Clause Number] of the said Will, the deceased had nominated me as the sole Executor.

3. I state that I have not at any time intermeddled with the estate of the deceased or administered any portion of the assets, properties, or bank accounts left behind by the deceased.

4. I state that due to [State Reason: e.g., permanent foreign residency, extreme advanced age of 78 years, and inability to attend court proceedings in India], I am wholly unable and unwilling to act as an Executor under the said Will.

5. I hereby formally, expressly, and unconditionally renounce my executorship of the said Last Will and Testament dated [Date of Will] pursuant to Section 230 of the Indian Succession Act, 1925.

6. I state that I have no objection whatsoever if this Hon'ble Court dispenses with the issuance of citation under Section 229 of the Act and grants Letters of Administration with the Will Annexed under Section 232 of the Act to the Petitioner herein, who is the universal / residuary legatee of the deceased.

7. I declare that I shall not at any time in the future claim any right or title to apply for Probate of the said Will.

DEPONENT
[Signature of Deponent / Renouncing Executor]

VERIFICATION:
Verified at [City] on this [Day] day of [Month], 2026, that the contents of paragraphs 1 to 7 of this Affidavit are true and correct to the best of my personal knowledge and belief, no part thereof is false, and nothing material has been concealed therefrom.

DEPONENT
[Signature of Deponent]

Solemnly affirmed and signed before me on this ___ day of ________ 2026.
[NOTARY PUBLIC / OATH COMMISSIONER SEAL & SIGNATURE]`,
    },
    {
      title: "Template 4: NRI Executor Renunciation (Consular / Apostille)",
      subtitle: "For foreign resident executors renouncing before Indian Embassy or Hague Apostille",
      text: `SPECIAL DECLARATION OF RENUNCIATION OF EXECUTORSHIP FOR NON-RESIDENT INDIAN (NRI) EXECUTOR
(TO BE EXECUTED BEFORE EMBASSY / CONSULATE OF INDIA OR NOTARIZED WITH HAGUE APOSTILLE CERTIFICATE)

I, [Full Name of NRI Executor], son/daughter of [Father's Name], aged [Age] years, holding Indian Passport No. [Passport Number] / Foreign Passport No. [Passport Number], residing at [Overseas Residential Address: Street, City, State, ZIP, Country], do hereby solemnly declare, depose, and affirm as follows:

1. That I am the designated Executor named in the Last Will and Testament dated [Date of Will] executed in India by my late [Relationship, e.g., father/mother/uncle], Late [Full Name of Testator], who passed away on [Date of Demise] at [Place of Death, India].

2. That I am permanently residing and gainfully employed / settled in [Country, e.g., United States of America / United Kingdom / Canada / UAE] and am unable to travel to India to institute probate proceedings, manage court appearances, verify revenue mutations, or discharge statutory executor duties under Section 317 of the Indian Succession Act, 1925.

3. That I have not intermeddled with any part of the estate, assets, company shares, bank deposits, or properties situated in India belonging to the deceased testator.

4. Pursuant to Section 230 of the Indian Succession Act, 1925, I hereby irrevocably and unequivocally RENOUNCE, RELINQUISH, AND DISCLAIM all my rights, authorities, entitlements, and powers to act as Executor of the said Last Will and Testament.

5. I hereby accord my free, full, and unconditional CONSENT for the Testamentary Court in India to grant Letters of Administration with the Will Annexed under Section 232 of the Indian Succession Act, 1925, in favour of [Name of Resident Beneficiary in India], residing at [Indian Address], who is the residuary legatee under the Will.

6. I further confirm that this document is intended to be produced before the competent High Court / District Court in India, and upon arrival in India, the requisite stamp duty shall be paid within 3 months under Section 18 of the Indian Stamp Act, 1899.

IN WITNESS WHEREOF I have signed this declaration at [City, Country] on this [Day] day of [Month], 2026.

__________________________________________
[SIGNATURE OF NRI RENOUNCING EXECUTOR]
Name: [Full Legal Name]
Passport No: [Passport Number]

CONSULAR ATTESTATION / HAGUE APOSTILLE CERTIFICATION:
Signed and executed before me at the Embassy / Consulate General of India, [City, Country] / Attested by Notary Public with Hague Apostille Certificate No. [Apostille Number].

[Consular Seal / Apostille Stamp & Signature]`,
    },
  ];

  const copyTemplateToClipboard = () => {
    navigator.clipboard.writeText(TEMPLATES[activeTemplateTab].text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `CHECKLIST FOR FILING SECTION 230 EXECUTOR RENUNCIATION IN INDIAN COURTS:
1. Certified Municipal Death Certificate of the Testator.
2. Original or Certified True Copy of the Last Will and Testament.
3. Registered or Notarized Renunciation Deed on Non-Judicial Stamp Paper (Rs. 100 or as per State Stamp Act).
4. Deponent's Identity Proof (Aadhaar Card, Passport, or PAN Card).
5. For NRI Executors: Apostille Certificate or Indian Consular Attestation stamp.
6. Validation of Section 18 Indian Stamp Act adjudication within 3 months of overseas document arrival in India.
7. Verified Petition for Letters of Administration with Will Annexed under Section 232 ISA.
8. Affidavit affirming No-Intermeddling with estate assets by the Renouncing Executor.
9. Valuation certificate of movable and immovable properties of the estate.
10. Pedigree table / Legal Heir Certificate showing surviving Class I / Class II heirs.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  // Evaluator logic
  const getEvaluatorOutcome = () => {
    if (evaluatorIntermeddled === "yes") {
      return {
        badge: "SECTION 301 HIGH COURT APPLICATION REQUIRED",
        color: "bg-red-50 text-red-800 border-red-300",
        icon: AlertTriangle,
        heading: "Renunciation Barred by Intermeddling Doctrine",
        summary:
          "Because the executor has already taken custody of assets, operated bank accounts, or exercised executor authority, voluntary renunciation under Section 230 is legally barred. The beneficiaries or executor must file a formal application under Section 301 before the High Court for discharge after rendering full accounts.",
        nextSteps: [
          "Prepare formal accounts of all funds received and disbursed by the executor.",
          "File an application under Section 301 of the Indian Succession Act before the High Court.",
          "Seek court order relieving the executor and appointing an administrator pendente lite or successor.",
        ],
      };
    }

    if (evaluatorWillingness === "willing") {
      return {
        badge: "SECTION 276 PROBATE PETITION ROUTE",
        color: "bg-emerald-50 text-emerald-800 border-emerald-300",
        icon: CheckCircle2,
        heading: "Executor Can File for Probate Directly",
        summary:
          "Since the executor is willing to act and has not intermeddled, no renunciation is required. The executor can directly file a Probate Petition under Section 276 of the Indian Succession Act, 1925 in the competent District Court or High Court.",
        nextSteps: [
          "Collect original Will, death certificate, and asset valuation certificates.",
          "File Section 276 Probate Petition supported by attesting witness affidavits.",
          "Complete general and special citations as ordered by the court.",
        ],
      };
    }

    if (evaluatorLocation === "abroad") {
      return {
        badge: "CONSULAR / APOSTILLE SECTION 230 RENUNCIATION",
        color: "bg-blue-50 text-blue-800 border-blue-300",
        icon: Globe,
        heading: "Apostille Renunciation + Section 232 Letters of Administration",
        summary:
          "The overseas executor must execute Template 4 before an Indian Consular Officer or obtain a Hague Apostille certificate. Upon receiving the original document in India, have it stamped within 3 months under Section 18 of the Stamp Act, then file for Letters of Administration with Will Annexed.",
        nextSteps: [
          "Send Template 4 to the NRI executor for execution at the Indian Embassy or local notary with Apostille.",
          "Receive original executed document in India via registered courier.",
          "Adjudicate stamp duty at the District Collector / Sub-Registrar within 90 days under Section 18 Stamp Act.",
          "Residuary beneficiaries file petition under Section 232 ISA without Section 229 citation delays.",
        ],
      };
    }

    return {
      badge: "DOMESTIC SECTION 230 RENUNCIATION DEED",
      color: "bg-amber-50 text-amber-800 border-amber-300",
      icon: FileCheck,
      heading: "Execute Template 2 on Stamp Paper & File Under Section 232",
      summary:
        "The domestic executor can execute Template 2 on ₹100 non-judicial stamp paper, notarized before a public notary, along with Template 3 (Court Affidavit). The residuary beneficiaries can then immediately file for Letters of Administration with Will Annexed under Section 232 without issuing citation.",
      nextSteps: [
        "Print Template 2 on local state non-judicial stamp paper and notarize.",
        "Obtain signed Court Affidavit (Template 3) from the renouncing executor.",
        "Residuary legatee files petition under Section 232 ISA annexing the renunciation deed.",
        "Testamentary court dispenses with Section 229 citation and proceeds to grant Letters of Administration.",
      ],
    };
  };

  const evaluatorResult = getEvaluatorOutcome();
  const ResultIcon = evaluatorResult.icon;

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Dark Navy Brand Canvas)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden border-b border-[#172228]/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C65378_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center space-x-2 text-xs text-white/70 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <span>/</span>
            <span className="text-[#FAF7F0] font-medium truncate max-w-[240px] sm:max-w-none">
              Executor Consent &amp; Renunciation Format
            </span>
          </nav>

          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 229, 230, 231 &amp; 232</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Renunciation of Executorship &amp; Executor Consent Formats
          </h1>

          {/* Subtitle Paragraph (Plain English, High Intent) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Legally vetted formats for pre-death executor acceptance and post-death Section 230
            renunciation declarations. Enable legal heirs to secure Letters of Administration
            under Section 232 without citation delays or court gridlocks.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Download Renunciation Formats</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will with Backup Executors</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 230</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WRITTEN OR ORAL RENUNCIATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 229</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY CITATION NOTICE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 232</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LETTERS OF ADMINISTRATION (LOA)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Hague &amp; Sec 18</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NRI CONSULAR &amp; APOSTILLE VALIDITY
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
                Governed under Sections 229, 230, 231, 232, 301 and 317 of the Indian Succession
                Act, 1925, read with High Court Original Side Testamentary Rules and landmark
                precedents Manekji Petit and Bholanath Mullick.
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
                <span>EXECUTIVE BRIEF: EXECUTOR RENUNCIATION &amp; CONSENT IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Compulsion to Act:</strong> Being named as an executor in an Indian Will
                    does not force any person to take charge. Under Section 230, an executor can
                    freely renounce executorship either orally before the Judge or in writing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unlocking Letters of Administration (LOA):</strong> Under Section 229,
                    courts cannot grant administration to any beneficiary until the named executor
                    renounces or fails to respond to a court citation. A signed Section 230
                    renunciation deed saves 6 to 12 months of citation proceedings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Intermeddling Bar:</strong> Once an executor takes charge of assets or
                    acts in administration, renunciation is legally barred. The executor can then only
                    be discharged by the High Court under Section 301 upon complete accounting.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL ASSET: FEATURED OG IMAGE */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
              <div className="relative aspect-video w-full bg-slate-900">
                <Image
                  src="/images/executor-consent-and-renunciation-letter-format-og.jpg"
                  alt="Renunciation of Executorship Format India and Section 230 Indian Succession Act Legal"
                  width={1200} height={675}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span className="font-semibold text-slate-800">
                    Official Statutory Formats: Sections 229, 230 &amp; 232 Indian Succession Act, 1925
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Verified by Testamentary Advocates</span>
              </div>
            </div>

            {/* ===================================================================
                SECTION 1: STATUTORY FOUNDATION
                =================================================================== */}
            <section id="statutory-foundation" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                1. Statutory Foundation: Sections 229 to 232 Explained
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Appointing an executor is one of the most critical steps in drafting a valid Will in
                India. An executor is the legal representative appointed by the testator to carry out
                their last wishes, settle debts, and distribute assets. However, life circumstances
                change. By the time the testator passes away, the named executor may be elderly,
                suffering from illness, living abroad as an NRI, or unwilling to face probate litigation.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The Indian Succession Act, 1925 provides a clear statutory framework to resolve this
                dilemma across Sections 229, 230, 231, and 232:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center text-xs font-black">
                      229
                    </span>
                    <span>Section 229: The Mandatory Citation Rule</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 229, if the named executor has not renounced executorship, the court
                    cannot grant Letters of Administration to any other person until a formal citation
                    has been issued calling upon the executor to accept or renounce the office.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center text-xs font-black">
                      230
                    </span>
                    <span>Section 230: Mode and Finality of Renunciation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Renunciation may be made orally in the presence of the Judge or by a writing signed
                    by the executor. Once completed, Section 230 permanently bars the person from ever
                    again applying for probate of that Will.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center text-xs font-black">
                      231
                    </span>
                    <span>Section 231: Administration on Failure to Accept</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an executor renounces, or fails to accept executorship within the time allowed by
                    the citation, the Will is proved and Letters of Administration are granted to the
                    person entitled in case of intestacy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-[#C65378]/10 text-[#C65378] flex items-center justify-center text-xs font-black">
                      232
                    </span>
                    <span>Section 232: Grant to Residuary Legatees</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When an executor renounces under Section 230, the universal or residuary legatee can
                    step forward and obtain Letters of Administration with the Will Annexed, enabling
                    immediate estate transmission.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 2: INTERACTIVE LEGAL FORMATS (4 TEMPLATES TABBED)
                =================================================================== */}
            <section id="interactive-templates" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                  2. Interactive Legal Formats: Consent &amp; Renunciation
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] border border-[#C65378]/30 hover:bg-[#C65378] hover:text-white transition-colors text-xs font-bold"
                  >
                    {copiedTemplate ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Active Template</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Select between the four standard formats below. Each template has been vetted by
                testamentary advocates to ensure compliance with High Court Original Side Rules and
                the Indian Succession Act, 1925.
              </p>

              {/* Tab Navigation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                {TEMPLATES.map((tpl, idx) => {
                  const isSelected = activeTemplateTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTemplateTab(idx)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "bg-[#172228] text-white border-[#172228] shadow-sm font-bold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-semibold truncate">{tpl.title.split(":")[0]}</div>
                      <div
                        className={`text-[10px] mt-0.5 truncate ${
                          isSelected ? "text-rose-300" : "text-slate-500"
                        }`}
                      >
                        {tpl.title.split(":")[1]?.trim()}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Template Display Box */}
              <div className="rounded-2xl border border-slate-300 bg-white shadow-xs overflow-hidden">
                <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      {TEMPLATES[activeTemplateTab].title}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {TEMPLATES[activeTemplateTab].subtitle}
                    </p>
                  </div>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
                  >
                    {copiedTemplate ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{copiedTemplate ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 sm:p-6 bg-slate-900 text-slate-100 font-mono text-[11px] sm:text-xs leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre-wrap select-all">
                  {TEMPLATES[activeTemplateTab].text}
                </div>
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Standard Non-Judicial Stamp Paper: ₹100 or State Equivalent</span>
                  <span>Fill all bracketed [XYZ] fields before notarization</span>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 3: PRE-DEATH CONSENT VS POST-DEATH RENUNCIATION
                =================================================================== */}
            <section id="consent-vs-renunciation" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                3. Pre-Death Consent Letter vs Post-Death Renunciation
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Many testators make the grave mistake of naming an executor without ever asking them.
                When the testator dies, the surprised executor frequently ignores court notices or
                flatly refuses to get involved. This puts the entire family in legal deadlock.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Understanding the critical differences between a Pre-Death Executor Consent Letter and
                a Post-Death Section 230 Renunciation prevents months of avoidable litigation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Pre-Death Executor Consent Letter</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Timing:</strong> Executed while the testator is alive and drafting the Will.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Purpose:</strong> Confirms the executor is willing, mentally sound, and
                        aware of the estate assets and responsibilities.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Legal Effect:</strong> While not legally binding to force post-death
                        action, it eliminates disputes regarding forged executor appointments and
                        proves genuine testamentary capacity.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Storage:</strong> Kept in the safe custody envelope with the original
                        Will.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172228]">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Post-Death Section 230 Renunciation</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Timing:</strong> Executed only after the testator has passed away.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Purpose:</strong> Formally relinquishes the office of executor when the
                        person cannot or will not act.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Legal Effect:</strong> Conclusive and permanent under Section 230.
                        Immediately allows the court to grant Letters of Administration under Section
                        232 without issuing citation notices under Section 229.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>
                        <strong>Filing:</strong> Submitted directly to the testamentary court or
                        notarized on stamp paper.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mid-Article Contextual Tool Link */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-[#C65378]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    RECOMMENDED SUCCESSION DIAGNOSTIC TOOL
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Need to know what an executor must accomplish after demise?
                  </div>
                  <p className="text-xs text-slate-600">
                    Use our interactive 90-day executor timeline tool to see all statutory deadlines
                    under Section 317 ISA.
                  </p>
                </div>
                <Link
                  href="/tools/executor-duties-90-day-timeline-generator"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C65378] text-white hover:bg-[#a33b5c] text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Launch Timeline Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* ===================================================================
                SECTION 4: THE DOCTRINE OF INTERMEDDLING
                =================================================================== */}
            <section id="intermeddling-doctrine" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                4. The Doctrine of Intermeddling: When Renunciation Fails
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A common misconception is that an executor can step in, operate the deceased person&apos;s
                bank accounts, collect rent, or sell some shares, and then simply sign a renunciation
                deed when disputes arise. Under Indian law, this is strictly prohibited.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Under the landmark ruling of the Calcutta High Court in{" "}
                <em className="font-semibold text-slate-800">In the Goods of Bholanath Mullick</em>{" "}
                and the Bombay High Court in{" "}
                <em className="font-semibold text-slate-800">Manekji Petit v. Adambhai</em>, the
                doctrine of intermeddling applies:
              </p>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>The Legal Principle: Acceptance by Conduct</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  If an executor performs any act that can only be done in the capacity of an
                  executor (such as taking possession of estate property, operating locker facilities,
                  paying estate debts, or collecting rents), the law deems that the executor has
                  accepted the office. Once accepted, voluntary renunciation under Section 230 is
                  extinguished!
                </p>
                <div className="text-xs text-amber-900 bg-white/70 p-3 rounded-lg border border-amber-200">
                  <strong>The Sole Legal Remedy:</strong> An intermeddling executor who wishes to step
                  down cannot use a renunciation letter. They must file a formal application under{" "}
                  <strong>Section 301 of the Indian Succession Act, 1925</strong> before the High
                  Court, submit verified accounts of every rupee handled under Section 317, and seek
                  formal discharge by court order.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-emerald-700">Permitted Pre-Renunciation Acts:</span>
                  <p className="text-slate-600 leading-relaxed">
                    Paying emergency funeral expenses out of pocket, securing the deceased&apos;s locked
                    home from vandalism, or feeding domestic pets. These humanitarian acts do NOT
                    constitute intermeddling.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="font-bold text-rose-700">Prohibited Intermeddling Acts:</span>
                  <p className="text-slate-600 leading-relaxed">
                    Withdrawing fixed deposits, transferring company shares, selling movable assets,
                    issuing tenancy eviction notices, or distributing jewelry to heirs. These bar
                    voluntary renunciation.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 5: STRUCTURED COMPARISON TABLE
                =================================================================== */}
            <section id="comparison-table" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                5. Legal Comparison: Executorship Transfer Mechanisms
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When an executor cannot or will not fulfill their duties, multiple legal pathways exist
                under the Indian Succession Act. The table below compares their procedure, cost, and
                timeline:
              </p>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-[#172228] border-b border-slate-200 font-bold">
                        <th className="p-3.5 sm:p-4">Mechanism</th>
                        <th className="p-3.5 sm:p-4">Governing Section</th>
                        <th className="p-3.5 sm:p-4">Trigger Condition</th>
                        <th className="p-3.5 sm:p-4">Court Citation Required?</th>
                        <th className="p-3.5 sm:p-4">Resulting Grant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                          Voluntary Renunciation
                        </td>
                        <td className="p-3.5 sm:p-4">Section 230 ISA</td>
                        <td className="p-3.5 sm:p-4">
                          Executor unwilling/unable, zero intermeddling
                        </td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                          No (Dispensed with)
                        </td>
                        <td className="p-3.5 sm:p-4">Letters of Administration (Sec 232)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 bg-slate-50/30">
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                          Citation Default
                        </td>
                        <td className="p-3.5 sm:p-4">Sections 229 &amp; 231 ISA</td>
                        <td className="p-3.5 sm:p-4">
                          Executor non-responsive or refuses to sign deed
                        </td>
                        <td className="p-3.5 sm:p-4 text-rose-700 font-bold">
                          Yes (Mandatory notice)
                        </td>
                        <td className="p-3.5 sm:p-4">Letters of Administration after default</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                          High Court Removal
                        </td>
                        <td className="p-3.5 sm:p-4">Section 301 ISA</td>
                        <td className="p-3.5 sm:p-4">
                          Executor intermeddled or committed breach of trust
                        </td>
                        <td className="p-3.5 sm:p-4">Yes (Notice to all parties)</td>
                        <td className="p-3.5 sm:p-4">Successor Administrator or Court Receiver</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 bg-slate-50/30">
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                          Lifetime Codicil
                        </td>
                        <td className="p-3.5 sm:p-4">Section 62 ISA</td>
                        <td className="p-3.5 sm:p-4">Testator is alive and replaces the executor</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                          No Court Needed
                        </td>
                        <td className="p-3.5 sm:p-4">Direct Probate to New Executor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 6: NRI & FOREIGN EXECUTOR RENUNCIATION PROTOCOL
                =================================================================== */}
            <section id="nri-executor-protocol" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                6. NRI &amp; Foreign Executor Renunciation Protocol: Form 10
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                With millions of global Indians living in the United States, United Kingdom, Canada,
                and UAE, a common scenario occurs where an NRI child or sibling is appointed executor
                in an Indian Will. When probate becomes necessary, the NRI cannot fly to India for
                every court hearing.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To execute a valid renunciation from abroad without traveling to India, follow this
                strict statutory protocol:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Consular Attestation or Hague Apostille
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The overseas executor signs Template 4 before an Indian Consular Officer at the
                    Embassy or Consulate, or before a local public notary followed by a Hague
                    Apostille certificate.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Dispatch Original via Secure Courier
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The physically signed original apostilled document is couriered to the residuary
                    beneficiary or testamentary advocate in India. Scanned or PDF copies cannot be
                    adjudicated for stamp duty.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C65378] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Section 18 Stamp Adjudication (90 Days)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 18 of the Indian Stamp Act, 1899, any instrument executed out of
                    India must be stamped within 3 months of its first arrival in India. Pay the stamp
                    duty at the Collector of Stamps before court filing.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 7: STEP-BY-STEP SOP
                =================================================================== */}
            <section id="step-by-step-sop" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                7. Step-by-Step SOP: Section 230 Court Filing Protocol
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Follow this 5-stage standard operating procedure to transition from an unwilling
                executor to obtaining Letters of Administration smoothly:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      Verify Non-Intermeddling &amp; Secure Written Consent
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Confirm that the designated executor has not touched bank accounts, collected
                      rents, or claimed assets. Provide them with Template 2 (Renunciation Deed) and
                      Template 3 (Court Affidavit).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      Execution on Non-Judicial Stamp Paper
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Print the Renunciation Deed on appropriate State Non-Judicial Stamp Paper (₹100
                      in Delhi/Maharashtra). The executor signs before an advocate or public notary with
                      two independent witnesses.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      Drafting Petition for Letters of Administration (Section 232)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The residuary legatee drafts the petition for Letters of Administration with Will
                      Annexed, naming the renouncing executor as a pro-forma respondent and annexing the
                      original Renunciation Deed and Death Certificate.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      Testamentary Court Hearing &amp; Citation Dispensation
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      At the initial hearing, your advocate presents the Section 230 Renunciation Deed.
                      The Judge records the renunciation on file and formally dispenses with issuing
                      notice or citation under Section 229, saving 6 months of process.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    5
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                      Issuance of Letters of Administration &amp; Property Mutation
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      After publication of general notices in newspapers and expiry of the objection
                      period, the court grants Letters of Administration to the beneficiary, who can
                      then mutate land, transfer demat shares, and claim bank deposits.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 8: INTERACTIVE RENUNCIATION EVALUATOR TOOL
                =================================================================== */}
            <section id="interactive-evaluator" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                8. Interactive Renunciation &amp; LOA Readiness Evaluator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use this diagnostic tool to evaluate your executor scenario and determine the exact
                legal documentation, court citations, and procedural route required:
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Question 1: Willingness */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#172228] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Executor&apos;s Stance on Acting:</span>
                    </label>
                    <select
                      value={evaluatorWillingness}
                      onChange={(e) => setEvaluatorWillingness(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378]/20 focus:outline-hidden"
                    >
                      <option value="unwilling">Unwilling or Unable to Act (Renunciation)</option>
                      <option value="willing">Willing to Act as Executor (File Probate)</option>
                      <option value="unresponsive">Unresponsive / Cannot Be Contacted</option>
                    </select>
                  </div>

                  {/* Question 2: Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#172228] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Executor&apos;s Current Residence:</span>
                    </label>
                    <select
                      value={evaluatorLocation}
                      onChange={(e) => setEvaluatorLocation(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378]/20 focus:outline-hidden"
                    >
                      <option value="abroad">Residing Outside India (NRI / Foreign Citizen)</option>
                      <option value="india_same_city">Residing in India (Same City as Court)</option>
                      <option value="india_diff_state">Residing in India (Different State)</option>
                    </select>
                  </div>

                  {/* Question 3: Intermeddling */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#172228] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Has Executor Taken Charge of Assets?</span>
                    </label>
                    <select
                      value={evaluatorIntermeddled}
                      onChange={(e) => setEvaluatorIntermeddled(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378]/20 focus:outline-hidden"
                    >
                      <option value="no">No, zero assets touched or handled</option>
                      <option value="yes">Yes, operated accounts or sold property (Intermeddled)</option>
                    </select>
                  </div>

                  {/* Question 4: Residuary Legatee */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#172228] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Are Residuary Heirs Ready for LOA?</span>
                    </label>
                    <select
                      value={evaluatorResiduaryReady}
                      onChange={(e) => setEvaluatorResiduaryReady(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#C65378]/20 focus:outline-hidden"
                    >
                      <option value="yes">Yes, ready to apply under Section 232</option>
                      <option value="dispute">No, family heirs have conflicting claims</option>
                    </select>
                  </div>
                </div>

                {/* Outcome Card */}
                <div className={`p-4 sm:p-5 rounded-xl border ${evaluatorResult.color} space-y-3`}>
                  <div className="flex items-center gap-2">
                    <ResultIcon className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10">
                        {evaluatorResult.badge}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold mt-1 text-slate-900">
                        {evaluatorResult.heading}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                    {evaluatorResult.summary}
                  </p>

                  <div className="pt-2 border-t border-black/10">
                    <span className="text-xs font-bold text-slate-900 block mb-1.5">
                      Immediate Action Steps:
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-700">
                      {evaluatorResult.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 9: REAL CASE STUDIES
                =================================================================== */}
            <section id="real-case-studies" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                9. Real Case Studies: Delhi, Mumbai and Bengaluru Estates
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Practical insights from real estate administration challenges handled across Indian
                courts:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C65378]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Delhi High Court (2024)</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    NRI Son in California Renounces for Resident Sister
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testator named NRI elder son as sole executor. Probate would take 18 months due to
                    consular citations. Son executed Template 4 before San Francisco Indian Consulate.
                    Sister secured Letters of Administration within 4 months under Section 232.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C65378]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bombay High Court (2023)</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Joint Executor Deadlock in South Mumbai Flat
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two family chartered accountants named joint executors disagreed on succession
                    strategy. One signed a Section 230 Renunciation Deed. The remaining executor
                    obtained sole probate without delay under Section 224 of the Succession Act.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C65378]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bengaluru City Civil Court (2025)</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#172228]">
                    Elderly Uncle (82) Renounces Due to Medical Condition
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Uncle named in 2011 Will had suffered stroke. Advocate drafted Section 230 court
                    declaration executed at home with notary. Dispensation granted under Section 229,
                    allowing grandson to inherit startup shares seamlessly.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 10: INSTITUTIONAL ADVOCATE PROFILE
                =================================================================== */}
            <section id="institutional-profile" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                10. Testamentary Defense &amp; Legal Advocate Verification
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#172228] text-white flex items-center justify-center font-black text-xl shrink-0">
                    AMA
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#172228]">
                      AMA Legal Solutions Testamentary Law Practice
                    </h3>
                    <p className="text-xs text-slate-500">
                      Senior Succession &amp; Probate Advocates • High Court of Delhi &amp; Pan-India
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every legal template, citation analysis, and procedure on this page has been
                  structured in strict adherence to High Court Original Side Testamentary Rules, the
                  Indian Succession Act, 1925, and established common law standards. We represent
                  beneficiaries, executors, and NRIs facing probate deadlock, citation defaults, and
                  disputed succession petitions.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-slate-600">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">
                    ✓ High Court Probate &amp; LOA Litigators
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">
                    ✓ Section 230 &amp; 301 Succession Petitions
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100">
                    ✓ Cross-Border NRI Hague Apostille Advisory
                  </span>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 11: FREQUENTLY ASKED QUESTIONS
                =================================================================== */}
            <section id="frequently-asked-questions" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                11. Frequently Asked Questions: Executor Renunciation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear answers to common questions regarding Section 230 renunciation and executor
                responsibilities in India:
              </p>

              <div className="space-y-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#172228] hover:bg-slate-50"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ===================================================================
                SECTION 12: STATUTORY CITATIONS & PRECEDENTS
                =================================================================== */}
            <section id="statutory-citations" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#172228] tracking-tight">
                12. Statutory Citations &amp; High Court Precedent Index
              </h2>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs text-slate-600">
                <div className="font-bold text-slate-800 text-xs sm:text-sm">
                  Primary Statutory Authorities &amp; Case Precedents:
                </div>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Sections 222 (Probate only to
                    appointed executor), 224 (Grant to several executors), 229 (Grant where executor
                    renounced or failed after citation), 230 (Form and effect of renunciation), 231
                    (Procedure where executor renounces), 232 (Administration to residuary
                    legatee), 301 (Removal of executor by High Court), 317 (Inventory and accounts).
                  </li>
                  <li>
                    <strong>Indian Stamp Act, 1899:</strong> Section 18 (Stamping of instruments
                    executed out of India within 3 months of first arrival in India).
                  </li>
                  <li>
                    <strong>High Court of Bombay:</strong> <em>Manekji Petit v. Adambhai (1903)</em>{" "}
                    5 BOMLR 1014 (Renunciation under Section 230 must be clear, unequivocal, and
                    irrevocable).
                  </li>
                  <li>
                    <strong>Calcutta High Court:</strong> <em>In the Goods of Bholanath Mullick</em>{" "}
                    (1931) ILR 58 Cal 801 (Intermeddling bars voluntary renunciation; remedy lies
                    under Section 301).
                  </li>
                  <li>
                    <strong>Hague Convention Abolishing the Requirement of Legalisation:</strong>{" "}
                    Apostille certification of overseas affidavits for production before Indian civil
                    courts.
                  </li>
                </ul>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION & TRUST SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 space-y-5">
            {/* Primary CTA Card: Self-Serve Will Drafting */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#172228] to-slate-800 text-white shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-[10px] font-bold text-rose-300 uppercase tracking-wide">
                <Sparkles className="w-3 h-3" />
                <span>PREVENT PROBATE GRIDLOCK</span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  Draft Will with Primary &amp; Alternate Executors
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  Designate substitute executors automatically if your first choice cannot act.
                  Generate a challenge-proof Indian Will online in 15 minutes.
                </p>
              </div>
              <button
                onClick={handleStartDraft}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs transition-transform hover:-translate-y-0.5 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Draft Challenge-Proof Will</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Secondary CTA Card: Advocate Consultation */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172228]">
                <Gavel className="w-4 h-4 text-[#C65378]" />
                <span>Unwilling Executor or Probate Delay?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an executor is untraceable or refusing to sign Section 230 renunciation, our senior
                testamentary advocates issue Section 229 court citations and file for Letters of
                Administration under Section 232.
              </p>
              <div className="space-y-1.5 pt-1">
                <Link
                  href="/services/probate-lawyer"
                  className="block text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Consult Probate Advocate
                </Link>
                <Link
                  href="/services/letters-of-administration-lawyer"
                  className="block text-center py-2 px-3 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Letters of Administration (LOA) Support
                </Link>
                <Link
                  href="/contact"
                  className="block text-center py-2 px-3 rounded-lg text-rose-700 hover:text-rose-800 text-xs font-bold transition-colors"
                >
                  Schedule Advocate Consultation →
                </Link>
              </div>
            </div>

            {/* Quick Document Checklist Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-[#172228]">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>Court Checklist: Sec 230</span>
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="text-[11px] font-semibold text-[#C65378] hover:underline inline-flex items-center gap-1"
                >
                  {copiedChecklist ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedChecklist ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Certified Death Certificate of Testator</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Original or Certified True Copy of Will</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Renunciation Deed on Non-Judicial Stamp Paper</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deponent Proof of ID (Aadhaar / Passport)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>If Overseas: Hague Apostille / Consular Stamp</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sec 18 Stamp Adjudication within 3 Months</span>
                </li>
              </ul>
            </div>

            {/* Related Legal Tools & Spokes */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5 text-xs">
              <span className="font-bold text-[#172228] block text-xs uppercase tracking-wider text-slate-500">
                RELATED TOOLS &amp; HUBS
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/tools/executor-duties-90-day-timeline-generator"
                  className="block p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  → Executor 90-Day Duties Timeline
                </Link>
                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="block p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  → Probate Court Fee Calculator
                </Link>
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="block p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  → Inherited Property Capital Gains Calculator
                </Link>
                <Link
                  href="/services/will-registration"
                  className="block p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  → Sub-Registrar Will Registration Service
                </Link>
                <Link
                  href="/templates"
                  className="block p-2 rounded-lg bg-rose-50 text-[#C65378] font-bold transition-colors"
                >
                  → Browse All Legal Succession Templates
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
