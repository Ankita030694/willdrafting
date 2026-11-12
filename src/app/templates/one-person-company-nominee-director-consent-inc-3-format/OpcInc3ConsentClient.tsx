"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  FileText,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Download,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Users,
  Building2,
  FileCheck2,
  RefreshCw,
  Sparkles,
  ListChecks,
  ExternalLink,
  Briefcase,
  Compass,
  UserCheck,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "Statutory Rules (Sec 3 & Rule 4)" },
  { id: "inc3-builder", label: "Interactive Form INC-3 Builder" },
  { id: "inc3-format", label: "Editable Form INC-3 Consent Draft" },
  { id: "inc4-replacement", label: "Form INC-4 Change & Withdrawal" },
  { id: "board-resolution", label: "Nominee Shareholder Resolution" },
  { id: "spice-vs-inc4", label: "SPICe+ vs INC-3 vs INC-4 Table" },
  { id: "mca-checklist", label: "MCA V3 Filing & KYC Checklist" },
  { id: "succession-obligations", label: "Nominee Obligations on Demise" },
  { id: "case-studies", label: "Practical OPC Succession Cases" },
  { id: "citations-links", label: "Citations & Related Guides" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const FAQS = [
  {
    q: "What is Form INC-3 and why is it mandatory for an OPC?",
    a: "Form INC-3 is the mandatory prior written consent of a nominee in a One Person Company (OPC). Under Section 3(1)(c) of the Companies Act, 2013 and Rule 4(2) of the Companies (Incorporation) Rules, 2014, the OPC subscriber must obtain this signed consent before filing incorporation or replacing a nominee.",
  },
  {
    q: "Who is eligible to be appointed as an OPC nominee in India?",
    a: "Only a natural person who is an Indian citizen and at least 18 years old can become an OPC nominee. Following the 2021 Incorporation Rules amendment, both resident Indians and Non-Resident Indians (NRIs) can serve as OPC members or nominees. A corporate entity, LLP, trust, or minor cannot become an OPC nominee.",
  },
  {
    q: "Can one individual act as nominee for multiple One Person Companies?",
    a: "No. Under Rule 3(3) of the Companies (Incorporation) Rules, 2014, no natural person shall be a member of more than one OPC or a nominee of more than one OPC at any point in time. If an existing OPC nominee inherits another OPC by death of its member, they must restore single-OPC compliance within 180 days.",
  },
  {
    q: "What KYC documents must accompany Form INC-3 nominee consent?",
    a: "A valid Form INC-3 consent requires self-attested copies of three annexures from the nominee: a PAN card, one identity proof such as Aadhaar card, Passport, Voter ID, or Driving Licence, and a recent proof of present residence such as a bank statement, electricity bill, or telephone bill dated within the last two months.",
  },
  {
    q: "How can an OPC nominee withdraw consent or be replaced by the founder?",
    a: "Under Rule 4(3) and Rule 4(4), a nominee may withdraw consent by sending written notice to both the sole member and the company. The sole member must nominate another eligible person within 15 days and send written notice with the new nominee's Form INC-3 consent. The company must then file Form INC-4 with the Registrar of Companies within 30 days.",
  },
  {
    q: "What happens upon the death or incapacity of the OPC sole member?",
    a: "Under Rule 4(6), the nominee automatically becomes the sole member and assumes full ownership of all OPC shares without needing a court probate or succession certificate. Within 15 days of becoming a member, the incoming owner must nominate a fresh backup nominee in Form INC-3, and the company must intimate the Registrar in Form INC-4 within 30 days.",
  },
  {
    q: "Does the Form INC-3 nominee automatically become a Director on member demise?",
    a: "Section 3(1)(c) transmits shareholding and membership automatically to the nominee, not directorship unless already appointed. If the deceased member was the sole Director, the nominee becomes the sole member, obtains a Director Identification Number (DIN) if not held, appoints themselves or another individual as Director, and files Form DIR-12 alongside Form INC-4.",
  },
  {
    q: "How is Form INC-3 filed on the MCA V3 SPICe+ portal today?",
    a: "For new OPC registrations on MCA V3, nominee particulars and Rule 4(2) consent declarations are integrated directly inside Part B of SPICe+ (Form INC-32). Executing an editable Form INC-3 written consent with self-attested PAN and Aadhaar annexures keeps the signed statutory record ready for both incorporation verification and subsequent Form INC-4 filings.",
  },
];

const INITIAL_CHECKLIST = [
  {
    id: "pan",
    label: "Self-attested PAN Card copy of the Nominee (name must match MCA database)",
    required: "Mandatory",
  },
  {
    id: "idproof",
    label: "Self-attested Identity Proof (Aadhaar Card, Voter ID, Passport, or Driving Licence)",
    required: "Mandatory",
  },
  {
    id: "resproof",
    label: "Present Address Proof dated within 2 months (Bank Statement, Electricity, or Gas Bill)",
    required: "Mandatory",
  },
  {
    id: "consent",
    label: "Signed Form No. INC-3 Nominee Consent & Rule 4(2) Non-Conviction Declaration",
    required: "Mandatory",
  },
  {
    id: "rule3",
    label: "Rule 3(3) Confirmation: Nominee is an Indian citizen (18+) and not nominee in another OPC",
    required: "Mandatory",
  },
  {
    id: "moa",
    label: "OPC Memorandum of Association (MoA) Nominee Clause naming the identical nominee",
    required: "Incorporation",
  },
  {
    id: "inc4",
    label: "Form INC-4 e-Form filing within 30 days (for withdrawal, change, or member demise)",
    required: "Change / Succession",
  },
  {
    id: "din",
    label: "Form DIR-2, DIR-8, and DIN check if the nominee is also acting as OPC Director",
    required: "If Director",
  },
];

export default function OpcInc3ConsentClient() {
  const router = useRouter();
  const { data: session } = useSession();

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Form INC-3 Customizer State
  const [scenario, setScenario] = useState<"incorporation" | "replacement" | "demise">(
    "incorporation"
  );
  const [opcName, setOpcName] = useState<string>("AARAV TECHLABS (OPC) PRIVATE LIMITED");
  const [cinNumber, setCinNumber] = useState<string>("Proposed / U72900DL2026OPC104821");
  const [memberName, setMemberName] = useState<string>("Aarav Sharma");
  const [nomineeName, setNomineeName] = useState<string>("Priya Sharma");
  const [nomineeParent, setNomineeParent] = useState<string>("Rajesh Sharma");
  const [nomineePan, setNomineePan] = useState<string>("ABCDE1234F");
  const [nomineeAadhaarLast4, setNomineeAadhaarLast4] = useState<string>("7482");
  const [nomineeCity, setNomineeCity] = useState<string>("New Delhi");
  const [consentDate, setConsentDate] = useState<string>("12-11-2026");

  // Eligibility quick checks
  const [isNaturalIndian, setIsNaturalIndian] = useState<boolean>(true);
  const [isMajor18, setIsMajor18] = useState<boolean>(true);
  const [isNotOtherOpc, setIsNotOtherOpc] = useState<boolean>(true);

  // INC-4 tab toggle
  const [inc4Tab, setInc4Tab] = useState<"withdrawal" | "memberChange">("withdrawal");

  // Filing checklist interactive state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    pan: true,
    idproof: true,
    resproof: false,
    consent: false,
    rule3: true,
    moa: false,
    inc4: false,
    din: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-18% 0px -65% 0px" }
    );
    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleStartDraft = () => {
    if (session?.user) {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const isEligible = isNaturalIndian && isMajor18 && isNotOtherOpc;

  const inc3DraftText = useMemo(() => {
    const triggerReason =
      scenario === "incorporation"
        ? "at the time of incorporation in the Memorandum of Association"
        : scenario === "replacement"
        ? "as replacement nominee under Rule 4(4) / Rule 4(5) for Form INC-4 filing"
        : "following transmission of membership under Rule 4(6) upon prior member demise";

    return `FORM NO. INC-3
NOMINEE CONSENT FORM
[Pursuant to Section 3(1)(c) of the Companies Act, 2013 and Rule 4(2) of the Companies (Incorporation) Rules, 2014]

To,
The Registrar of Companies / Board of Directors
${opcName}
CIN / SRN Reference: ${cinNumber}

1. PARTICULARS OF THE NOMINEE
   (a) Full Name of Nominee: ${nomineeName}
   (b) Father's / Mother's / Spouse's Name: ${nomineeParent}
   (c) Permanent Account Number (PAN): ${nomineePan}
   (d) Aadhaar Reference (Self-Attested Copy Attached): XXXX-XXXX-${nomineeAadhaarLast4}
   (e) Nationality & Age Status: Indian Citizen, Major (18+ years), Natural Person
   (f) Residential City / Jurisdiction: ${nomineeCity}, India
   (g) Nominee Email Address: [Enter Verified Email ID]
   (h) Occupation: [Enter Occupation]

2. CONSENT TO BECOME MEMBER (SECTION 3(1)(c))
I, ${nomineeName}, S/o / D/o / W/o ${nomineeParent}, resident of ${nomineeCity}, India, hereby give my prior written consent to become the sole member of ${opcName}, nominated ${triggerReason}, in the event of death of ${memberName}, subscriber and sole member of the company, or his/her incapacity to contract.

3. STATUTORY DECLARATIONS UNDER RULE 3 & RULE 4(2)
I solemnly declare and affirm that:
   (i)   I am a natural person and an Indian citizen, eligible under Rule 3(1) of the Companies (Incorporation) Rules, 2014 (as amended in 2021).
   (ii)  I am not a minor and do not suffer from any legal incapacity to contract.
   (iii) Under Rule 3(3), I am neither a member of any other One Person Company nor a nominee in any other One Person Company as on date.
   (iv)  I have not been convicted of any offence in connection with the promotion, formation, or management of any company or LLP during the preceding five years.
   (v)   I have not been found guilty of any fraud, misfeasance, or breach of duty to any company under the Companies Act, 2013 or previous company law during the preceding five years.
   (vi)  I understand that the sole member (${memberName}) may withdraw or change my nomination at any time by written notice in accordance with Rule 4(5) without requiring my consent.

4. MANDATORY SELF-ATTESTED ANNEXURES ATTACHED
   [Annexure A] Self-attested copy of PAN Card (${nomineePan}).
   [Annexure B] Self-attested Identity Proof (Aadhaar ending ${nomineeAadhaarLast4} / Passport / Voter ID).
   [Annexure C] Self-attested Present Residential Address Proof (not older than 2 months).

Date: ${consentDate}
Place: ${nomineeCity}

Signature of the Nominee: ______________________
Name: ${nomineeName}
PAN: ${nomineePan}`;
  }, [
    scenario,
    opcName,
    cinNumber,
    nomineeName,
    nomineeParent,
    nomineePan,
    nomineeAadhaarLast4,
    nomineeCity,
    memberName,
    consentDate,
  ]);

  const inc4WithdrawalText = useMemo(
    () => `NOTICE OF WITHDRAWAL OF CONSENT BY OPC NOMINEE
[Pursuant to Section 3(1)(c) & Rule 4(3) of the Companies (Incorporation) Rules, 2014]

Date: ${consentDate}
Place: ${nomineeCity}

To,
1. ${memberName} (Sole Member, ${opcName})
2. The Board of Directors, ${opcName} (${cinNumber})

Subject: Notice of withdrawal of prior consent as Nominee of ${opcName}

Dear Sir / Madam,

Take notice that I, ${nomineeName} (PAN: ${nomineePan}), having previously given written consent in Form No. INC-3 to act as the nominee of ${opcName}, hereby withdraw my consent as nominee with immediate effect under Rule 4(3) of the Companies (Incorporation) Rules, 2014.

Pursuant to Rule 4(4), the sole member is requested to nominate another eligible natural person within 15 (fifteen) days from the date of receipt of this notice, obtain the new nominee's consent in Form INC-3, and intimate the company so that Form INC-4 may be filed with the Registrar of Companies within 30 (thirty) days.

Kindly acknowledge receipt of this withdrawal notice and update the Memorandum of Association and statutory registers accordingly.

Yours faithfully,

______________________
Signature of Outgoing Nominee
Name: ${nomineeName}
PAN: ${nomineePan}`,
    [consentDate, nomineeCity, memberName, opcName, cinNumber, nomineeName, nomineePan]
  );

  const inc4MemberChangeText = useMemo(
    () => `INTIMATION BY SOLE MEMBER FOR CHANGE OF NOMINEE
[Pursuant to Rule 4(4) / Rule 4(5) of the Companies (Incorporation) Rules, 2014: For Form INC-4 Filing]

Date: ${consentDate}
Place: ${nomineeCity}

To,
The Board of Directors,
${opcName} (${cinNumber})

Subject: Notice of change of Nominee and submission of new Form INC-3 consent

Dear Directors,

In exercise of powers conferred under Section 3(1)(c) of the Companies Act, 2013 read with Rule 4(5) of the Companies (Incorporation) Rules, 2014, I, ${memberName}, being the Sole Member holding 100% equity share capital of ${opcName}, hereby intimate the Company that I am changing the existing nominee of the Company.

1. Outgoing Nominee Name: [Name of Previous Nominee]
2. Reason for Change: Voluntary change by Sole Member / Withdrawal by earlier nominee
3. New Nominee Appointed: ${nomineeName} (PAN: ${nomineePan})

I enclose herewith the signed Form No. INC-3 written consent along with self-attested PAN, Aadhaar, and recent residential address proof of ${nomineeName}. The Company is requested to alter the nominee clause in the Memorandum of Association and file Form No. INC-4 with the Registrar of Companies within 30 (thirty) days of this notice.

______________________
Signature of Sole Member
Name: ${memberName}`,
    [consentDate, nomineeCity, opcName, cinNumber, memberName, nomineeName, nomineePan]
  );

  const boardResolutionText = useMemo(
    () => `CERTIFIED TRUE COPY OF SOLE MEMBER RESOLUTION ENTERED IN MINUTES BOOK
[Pursuant to Section 122(3) & Section 3(1)(c) of the Companies Act, 2013 and Rule 4 of the Companies (Incorporation) Rules, 2014]

Company Name: ${opcName}
CIN: ${cinNumber}
Date of Entry in Minutes Book: ${consentDate}
Place: ${nomineeCity}

RESOLUTION RECORDING APPOINTMENT / TRANSMISSION OF OPC NOMINEE

"RESOLVED THAT pursuant to Section 3(1)(c) and Section 122 of the Companies Act, 2013 read with Rule 4 of the Companies (Incorporation) Rules, 2014, the written consent in Form No. INC-3 received from ${nomineeName} (PAN: ${nomineePan}, Aadhaar ending ${nomineeAadhaarLast4}) to act as the nominee of ${opcName} upon the death or incapacity to contract of the sole member, ${memberName}, be and is hereby noted and taken on record.

RESOLVED FURTHER THAT Clause III / Nominee Clause of the Memorandum of Association of the Company be updated to reflect ${nomineeName} as the lawful nominee, and that the Board / Director of the Company be and is hereby authorised to verify KYC annexures and file Form No. INC-4 (and Form DIR-12 where applicable upon directorship change) on the MCA V3 portal within 30 days.

RESOLVED FURTHER THAT in the event of demise or legal incapacity of the sole member, ${nomineeName} shall step in immediately as the incoming sole member of 100% paid-up share capital under Rule 4(6), apply for Director Identification Number (DIN) if not already held, and nominate a fresh nominee within 15 days."

Signed & Recorded in the OPC Minutes Book under Section 122(4):

______________________
${memberName}
Sole Member & Director
${opcName}`,
    [
      opcName,
      cinNumber,
      consentDate,
      nomineeCity,
      nomineeName,
      nomineePan,
      nomineeAadhaarLast4,
      memberName,
    ]
  );

  const downloadWordDraft = () => {
    const htmlDoc = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Form INC-3 Nominee Consent Draft</title></head>
<body style="font-family: Calibri, Arial, sans-serif; line-height: 1.5; color: #111;">
<p style="font-size: 16pt; font-weight: bold;">FORM NO. INC-3 - NOMINEE CONSENT DRAFT</p>
<p><em>Pursuant to Section 3(1)(c) of the Companies Act, 2013 and Rule 4(2) of the Companies (Incorporation) Rules, 2014</em></p>
<pre style="font-family: Calibri, Arial, sans-serif; white-space: pre-wrap;">${inc3DraftText}</pre>
<hr/>
<p style="font-size: 13pt; font-weight: bold;">ANNEXURE: SOLE MEMBER RESOLUTION (SECTION 122)</p>
<pre style="font-family: Calibri, Arial, sans-serif; white-space: pre-wrap;">${boardResolutionText}</pre>
</body>
</html>`;
    const blob = new Blob([htmlDoc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OPC-Form-INC-3-Nominee-Consent-Draft.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyChecklist = () => {
    const lines = INITIAL_CHECKLIST.map(
      (item, idx) =>
        `${idx + 1}. [${checkedDocs[item.id] ? "DONE" : "TODO"}] ${item.label} (${item.required})`
    ).join("\n");
    copyText(`MCA V3 OPC FORM INC-3 FILING CHECKLIST\n\n${lines}`, "checklist");
  };

  const completedChecklistCount = Object.values(checkedDocs).filter(Boolean).length;

  return (
    <div className="bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* LAYER 1: DARK EXECUTIVE HERO */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-white transition-colors">
              Legal Templates
            </Link>
            <span>/</span>
            <span className="text-[#C65378]">OPC Nominee Consent Form INC-3</span>
          </nav>

          {/* Hero Statutory Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-bold tracking-wide text-rose-200 mb-5">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            Companies Act 2013 • Section 3(1)(c) &amp; Rule 4(2) Compliant
          </div>

          <div className="max-w-4xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-white mb-5">
              OPC Nominee Director Consent Form INC-3 Draft
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
              Customise and download an MCA-compliant Form No. INC-3 nominee consent draft with PAN and Aadhaar annexures, Form INC-4 replacement notices, and OPC member succession resolutions.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#inc3-format"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("inc3-format");
              }}
              className="inline-flex items-center gap-2.5 bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#C65378]/25 transition-all"
            >
              <FileText className="w-4 h-4" />
              Get Editable Form INC-3 Draft
            </Link>
            <Link
              href="/services/corporate-business-succession-family-constitution"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur-sm transition-all"
            >
              <Briefcase className="w-4 h-4 text-rose-300" />
              Book Corporate Succession Review
            </Link>
            <Link
              href="/tools/opc-nominee-director-activation-timeline-calculator"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white underline underline-offset-4 px-2 py-2 transition-colors"
            >
              Calculate 15/30-Day INC-4 Deadlines
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* LAYER 2: EXECUTIVE STATUTORY STATS STRIP */}
      <section className="border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <Scale className="w-5 h-5 text-[#C65378]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Statutory Mandate
                </div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  Section 3(1)(c) &amp; Rule 4
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <Clock className="w-5 h-5 text-[#5F7E75]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Replacement Window
                </div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  15 Days New Nominee • 30 Days INC-4
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-5 h-5 text-[#C65378]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2021 Eligibility Rule
                </div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  Resident Indians &amp; NRIs Allowed
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#5F7E75]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Probate Exemption
                </div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">
                  Automatic Transmission on Demise
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: 3-COLUMN READING & WORKING LAYOUT */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* LEFT STICKY SIDEBAR: TOC & QUICK NAV */}
          <aside className="hidden lg:block sticky top-28 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378] mb-3.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Guide Contents
              </div>
              <nav aria-label="Table of Contents" className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-[#172228] text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="bg-[#172228] text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Mandatory Statutory Alert
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                MCA portal utilities output static XML PDFs without editable PAN/Aadhaar annexure blocks or Member Resolution minutes. Always store signed INC-3 copies in your OPC statutory file.
              </p>
              <button
                type="button"
                onClick={downloadWordDraft}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Word (.doc) Draft
              </button>
            </div>
          </aside>

          {/* CENTER MAIN CONTENT */}
          <div className="space-y-10 min-w-0">
            {/* FEATURED BESPOKE OG IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-3 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#172228]">
                <Image
                  src="/images/one-person-company-nominee-director-consent-inc-3-format-og.jpg"
                  alt="OPC Nominee Director Consent Form INC-3 Format Template and MCA Rules Guide"
                  width={1200}
                  height={675}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="px-3 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Editable Form INC-3 Consent &amp; Form INC-4 Notice Pack
                </span>
                <span>Updated for MCA V3 SPICe+ &amp; 2021 Incorporation Rules</span>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE LEGAL BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-6 sm:p-7 shadow-sm">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378] mb-2">
                Executive Legal Brief
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                A One Person Company (OPC) has only one owner. Indian law keeps the firm alive if that owner dies or cannot sign contracts. Under <strong>Section 3(1)(c) of the Companies Act, 2013</strong>, every OPC must name one backup nominee in its charter.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                First, the founder must take signed written consent in <strong>Form No. INC-3</strong>. You also attach self-attested PAN and Aadhaar KYC copies. If the founder dies, the nominee becomes the sole share owner right away. No court probate or long wait is needed.
              </p>
            </div>

            {/* SECTION 1: SINGLE H2 HEADING (STRICT SEO RULE) */}
            <article id="statutory-foundation" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                <Scale className="w-4 h-4" />
                Statutory Foundation
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172228] mb-5">
                Statutory Rules Under Section 3(1)(c)
              </h2>

              <p className="text-slate-700 leading-relaxed mb-4">
                Section 3(1)(c) makes an OPC safer than a sole shop or solo firm. When a solo trader dies, bank accounts freeze and work stops. In an OPC, the named nominee takes over the shares smoothly.
              </p>
              <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Rule 3 and Rule 4 of the 2014 Incorporation Rules</strong> set clear limits on who can act as nominee. Check each rule below before you file forms on the MCA portal.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5">
                  <div className="flex items-center gap-2 font-bold text-[#172228] text-sm mb-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    Who Can Be a Nominee (Rule 3)
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>Must be a living human being (natural person), never a company or LLP.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>Must hold Indian citizenship and be 18 years or older.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>Both resident Indians (120+ days stay) and NRIs qualify after the April 2021 amendment.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5">
                  <div className="flex items-center gap-2 font-bold text-[#172228] text-sm mb-2">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    Key Restrictions (Rule 3 &amp; Rule 4)
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>One person can be a nominee in only one OPC at any point in time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>Minors cannot hold beneficial interest or become OPC nominees.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                      <span>Nominee has zero voting or dividend rights while the sole member is alive and competent.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* SECTION 2: INTERACTIVE FORM INC-3 BUILDER & ELIGIBILITY CHECKER */}
            <section id="inc3-builder" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                <Sparkles className="w-4 h-4" />
                Live Draft Customizer
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-3">
                Interactive Form INC-3 Draft Customizer
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Enter your OPC and nominee details below. This tool checks Rule 3 rules right away. It also updates your Form INC-3 consent, Form INC-4 notice, and minutes draft live.
              </p>

              {/* Rule 3 Eligibility Toggles */}
              <div className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-4 sm:p-5 mb-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                  Step 1: Verify Rule 3 Nominee Eligibility
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNaturalIndian}
                      onChange={(e) => setIsNaturalIndian(e.target.checked)}
                      className="mt-1 accent-[#C65378]"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Natural person &amp; Indian Citizen (Resident or NRI)
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMajor18}
                      onChange={(e) => setIsMajor18(e.target.checked)}
                      className="mt-1 accent-[#C65378]"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Age 18+ years and competent to contract
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNotOtherOpc}
                      onChange={(e) => setIsNotOtherOpc(e.target.checked)}
                      className="mt-1 accent-[#C65378]"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Not member or nominee in any other OPC
                    </span>
                  </label>
                </div>

                <div
                  className={`mt-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    isEligible
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {isEligible ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Eligible under Rule 3(1) &amp; Rule 3(3). Proceed to generate Form INC-3 consent.
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      Warning: This nominee violates Rule 3 eligibility and RoC will reject SPICe+ or Form INC-4.
                    </>
                  )}
                </div>
              </div>

              {/* Scenario Selector */}
              <div className="mb-5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Step 2: Select Filing Purpose
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "incorporation", label: "New OPC Incorporation (SPICe+)" },
                    { key: "replacement", label: "Change / Replacement (Form INC-4)" },
                    { key: "demise", label: "New Backup Nominee After Demise" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() =>
                        setScenario(opt.key as "incorporation" | "replacement" | "demise")
                      }
                      className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                        scenario === opt.key
                          ? "bg-[#172228] text-white border-[#172228]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    One Person Company Name
                  </label>
                  <input
                    type="text"
                    value={opcName}
                    onChange={(e) => setOpcName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CIN or Proposed SRN
                  </label>
                  <input
                    type="text"
                    value={cinNumber}
                    onChange={(e) => setCinNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sole Member / Founder Name
                  </label>
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nominee Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nominee Father / Mother / Spouse Name
                  </label>
                  <input
                    type="text"
                    value={nomineeParent}
                    onChange={(e) => setNomineeParent(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nominee PAN Number
                  </label>
                  <input
                    type="text"
                    value={nomineePan}
                    onChange={(e) => setNomineePan(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 uppercase focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Aadhaar Last 4 Digits (Masked for Privacy)
                  </label>
                  <input
                    type="text"
                    value={nomineeAadhaarLast4}
                    onChange={(e) =>
                      setNomineeAadhaarLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    maxLength={4}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={nomineeCity}
                      onChange={(e) => setNomineeCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={consentDate}
                      onChange={(e) => setConsentDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#C65378] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: EDITABLE FORM INC-3 TEMPLATE BOX */}
            <section id="inc3-format" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1">
                    Ready-to-Sign Statutory Draft
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#172228]">
                    Editable Form INC-3 Nominee Consent Format
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(inc3DraftText, "inc3")}
                    className="inline-flex items-center gap-2 bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    {copiedKey === "inc3" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied Draft
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Form INC-3
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={downloadWordDraft}
                    className="inline-flex items-center gap-2 bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download .DOC
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Copy this Form INC-3 draft onto clean paper. Attach signed PAN and Aadhaar copies. Let the nominee sign in ink before you file SPICe+ or Form INC-4.
              </p>

              <pre className="bg-[#FAF7F0] border border-slate-300/80 rounded-2xl p-5 text-xs sm:text-sm font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {inc3DraftText}
              </pre>
            </section>

            {/* SECTION 4: FORM INC-4 REPLACEMENT & WITHDRAWAL NOTICE BOX */}
            <section id="inc4-replacement" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                <RefreshCw className="w-4 h-4" />
                Rule 4(3) &amp; Rule 4(5) Compliance
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-3">
                Form INC-4 Change &amp; Withdrawal Notice
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                A nominee can quit at any time, or the owner can pick a new person. Written notices must reach the company first. Then the company files Form INC-4 with the Registrar within 30 days.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setInc4Tab("withdrawal")}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      inc4Tab === "withdrawal"
                        ? "bg-white text-[#172228] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    1. Nominee Withdrawal Notice (Rule 4(3))
                  </button>
                  <button
                    type="button"
                    onClick={() => setInc4Tab("memberChange")}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      inc4Tab === "memberChange"
                        ? "bg-white text-[#172228] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    2. Member Change Intimation (Rule 4(5))
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      inc4Tab === "withdrawal" ? inc4WithdrawalText : inc4MemberChangeText,
                      "inc4"
                    )
                  }
                  className="inline-flex items-center gap-2 bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  {copiedKey === "inc4" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied Notice
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Notice Draft
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-[#FAF7F0] border border-slate-300/80 rounded-2xl p-5 text-xs sm:text-sm font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {inc4Tab === "withdrawal" ? inc4WithdrawalText : inc4MemberChangeText}
              </pre>
            </section>

            {/* SECTION 5: NOMINEE SHAREHOLDER / BOARD RESOLUTION SNIPPET */}
            <section id="board-resolution" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-1">
                    Section 122 OPC Minutes Book Format
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#172228]">
                    OPC Nominee Shareholder Resolution Sample
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(boardResolutionText, "res")}
                  className="inline-flex items-center gap-2 bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  {copiedKey === "res" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied Resolution
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Resolution
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Under Section 122(3) and Section 122(4), an OPC records member notes in a Minutes Book. The sole owner signs and dates this page. Keep this copy when you file Form INC-4 or update the company charter.
              </p>

              <pre className="bg-[#172228] text-slate-100 rounded-2xl p-5 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                {boardResolutionText}
              </pre>
            </section>

            {/* SECTION 6: COMPARISON TABLE */}
            <section id="spice-vs-inc4" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                <Building2 className="w-4 h-4" />
                MCA Portal Workflow Comparison
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-4">
                SPICe+, Form INC-3, and Form INC-4 Matrix
              </h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                Founders often mix up SPICe+, Form INC-3, and Form INC-4 on MCA V3. Use this simple chart to pick the right form.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-bold">Compliance Item</th>
                      <th className="p-3.5 font-bold">Form No. INC-3</th>
                      <th className="p-3.5 font-bold">SPICe+ (INC-32)</th>
                      <th className="p-3.5 font-bold">Form No. INC-4</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Primary Purpose</td>
                      <td className="p-3.5 text-slate-700">Prior written consent of nominee</td>
                      <td className="p-3.5 text-slate-700">New OPC incorporation filing</td>
                      <td className="p-3.5 text-slate-700">Intimation of change or death transmission</td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/60">
                      <td className="p-3.5 font-bold text-slate-900">Governing Rule</td>
                      <td className="p-3.5 text-slate-700">Rule 4(2) &amp; Section 3(1)(c)</td>
                      <td className="p-3.5 text-slate-700">Rule 4(1) &amp; Rule 12</td>
                      <td className="p-3.5 text-slate-700">Rule 4(4), 4(5) &amp; 4(6)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Filing Deadline</td>
                      <td className="p-3.5 text-slate-700">Before MoA execution</td>
                      <td className="p-3.5 text-slate-700">At company registration</td>
                      <td className="p-3.5 text-slate-700">Within 30 days of event</td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/60">
                      <td className="p-3.5 font-bold text-slate-900">Signed By</td>
                      <td className="p-3.5 text-slate-700">Incoming Nominee</td>
                      <td className="p-3.5 text-slate-700">Subscriber DSC + Professional</td>
                      <td className="p-3.5 text-slate-700">OPC Director DSC + Professional</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Mandatory KYC</td>
                      <td className="p-3.5 text-slate-700">PAN, Aadhaar / ID, Address Bill</td>
                      <td className="p-3.5 text-slate-700">Embedded inside Part B</td>
                      <td className="p-3.5 text-slate-700">INC-3 Consent, Notices, Death Proof (if any)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE MCA FILING CHECKLIST */}
            <section id="mca-checklist" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
                    Verification Progress: {completedChecklistCount} / {INITIAL_CHECKLIST.length}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#172228]">
                    MCA V3 Filing &amp; KYC Checklist
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={copyChecklist}
                  className="inline-flex items-center gap-2 bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  {copiedKey === "checklist" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied Checklist
                    </>
                  ) : (
                    <>
                      <ListChecks className="w-3.5 h-3.5" />
                      Copy Filing Checklist
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2.5">
                {INITIAL_CHECKLIST.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checkedDocs[item.id]
                        ? "bg-emerald-50/60 border-emerald-200"
                        : "bg-[#FAF7F0] border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={!!checkedDocs[item.id]}
                        onChange={(e) =>
                          setCheckedDocs((prev) => ({
                            ...prev,
                            [item.id]: e.target.checked,
                          }))
                        }
                        className="mt-1 accent-[#5F7E75]"
                      />
                      <span className="text-sm font-medium text-slate-800">{item.label}</span>
                    </div>
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                      {item.required}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* SECTION 8: SUCCESSION OBLIGATIONS ON MEMBER DEMISE */}
            <section id="succession-obligations" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                <FileCheck2 className="w-4 h-4" />
                Rule 4(6) Transition Protocol
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-4">
                Nominee Obligations Upon Member Demise
              </h3>
              <p className="text-slate-700 leading-relaxed mb-5">
                If the sole member dies or loses capacity, the nominee gains full control at once under Rule 4(6). Follow these four timed steps to keep bank accounts, GST returns, and ROC filings active.
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "Step 1 • Immediate Effect",
                    title: "Automatic Transmission of 100% Shares",
                    desc: "The nominee becomes the sole owner right away. You do not need court probate or a succession paper. Update the share book and print a new share slip.",
                  },
                  {
                    step: "Step 2 • Governance Continuity",
                    title: "Check Directorship & File Form DIR-12 (If Needed)",
                    desc: "Becoming the share owner does not make you a Director by default. If you are not on the Board yet, get a DIN first. Then sign a Section 122 note and file Form DIR-12.",
                  },
                  {
                    step: "Step 3 • Within 15 Days",
                    title: "Appoint a Fresh Backup Nominee in Form INC-3",
                    desc: "Once you become the owner, your OPC has no backup nominee left. Pick a new Indian citizen within 15 days and take their signed Form INC-3.",
                  },
                  {
                    step: "Step 4 • Within 30 Days",
                    title: "File Form INC-4 with Registrar of Companies",
                    desc: "File Form INC-4 within 30 days. Attach the death certificate, the new Form INC-3 consent, and KYC proof. Late filings bring Section 403 fees (2x to 12x) and Section 450 fines.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-[#FAF7F0] border border-slate-200 p-5"
                  >
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378] mb-1">
                      {item.step}
                    </div>
                    <div className="font-bold text-[#172228] text-base mb-1.5">{item.title}</div>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="case-studies" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                <Users className="w-4 h-4" />
                Real Corporate Scenarios
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-5">
                Practical OPC Succession Case Studies
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                    Case 1: NRI Spouse as Nominee
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    A Bengaluru SaaS founder wanted to name his sister in Singapore as his OPC nominee. Because she holds an Indian passport, she is an Indian citizen and meets the 2021 rule. She signed Form INC-3 and attached her PAN, passport, and address proof.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                    Case 2: Sole Director Demise &amp; Will Conflict
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    An OPC founder named his business friend in Form INC-3, while his Will gave all wealth to his wife. When he died, the friend got 100% of the OPC shares under Section 3(1)(c). Always match your Form INC-3 choice with your personal Will.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: CITATIONS & HUB LINKS */}
            <section id="citations-links" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5F7E75] mb-2">
                <Compass className="w-4 h-4" />
                Verified Sources &amp; Tools
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-4">
                Statutory Citations &amp; Related Guides
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <Link
                  href="/services/corporate-business-succession-family-constitution"
                  className="p-4 rounded-2xl border border-slate-200 bg-[#FAF7F0] hover:border-[#C65378] transition-all group"
                >
                  <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                    Advisory Service
                  </div>
                  <div className="font-bold text-sm text-[#172228] group-hover:text-[#C65378] flex items-center justify-between">
                    Corporate &amp; Business Succession Planning
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/tools/opc-nominee-director-activation-timeline-calculator"
                  className="p-4 rounded-2xl border border-slate-200 bg-[#FAF7F0] hover:border-[#C65378] transition-all group"
                >
                  <div className="text-xs font-bold text-[#5F7E75] uppercase mb-1">
                    Interactive Calculator
                  </div>
                  <div className="font-bold text-sm text-[#172228] group-hover:text-[#C65378] flex items-center justify-between">
                    OPC Nominee 15/30-Day Activation Timeline
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/tools/startup-founder-equity-succession-calculator"
                  className="p-4 rounded-2xl border border-slate-200 bg-[#FAF7F0] hover:border-[#C65378] transition-all group"
                >
                  <div className="text-xs font-bold text-[#5F7E75] uppercase mb-1">
                    Founder Equity Tool
                  </div>
                  <div className="font-bold text-sm text-[#172228] group-hover:text-[#C65378] flex items-center justify-between">
                    Startup Founder Equity Succession Calculator
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </Link>

                <Link
                  href="/templates"
                  className="p-4 rounded-2xl border border-slate-200 bg-[#FAF7F0] hover:border-[#C65378] transition-all group"
                >
                  <div className="text-xs font-bold text-[#C65378] uppercase mb-1">
                    Templates Directory
                  </div>
                  <div className="font-bold text-sm text-[#172228] group-hover:text-[#C65378] flex items-center justify-between">
                    Explore All Indian Legal Formats
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </Link>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-200 pt-4">
                <div className="font-bold text-slate-800">Primary Government Portals:</div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="https://www.mca.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline font-semibold"
                  >
                    Ministry of Corporate Affairs (MCA V3)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline font-semibold"
                  >
                    India Code • Companies Act, 2013
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
            <section id="faqs" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
                <BookOpen className="w-4 h-4" />
                Expert Answers
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#172228] mb-5">
                Frequently Asked OPC Form INC-3 Questions
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-slate-200 bg-[#FAF7F0]/70 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228]"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#C65378] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-slate-700 leading-relaxed border-t border-slate-200/70 pt-3 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3 PLAIN-ENGLISH SUMMARY CARDS */}
            <section className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <h4 className="font-bold text-sm text-[#172228] mb-2">Prior Consent Always</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Obtain Form INC-3 consent and PAN/Aadhaar KYC before filing SPICe+ or Form INC-4.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <h4 className="font-bold text-sm text-[#172228] mb-2">Strict 15 &amp; 30 Days</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Appoint a new nominee within 15 days and file Form INC-4 with RoC within 30 days.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <h4 className="font-bold text-sm text-[#172228] mb-2">Align Equity &amp; Will</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Match your OPC nominee with your personal Will to avoid family share disputes.
                </p>
              </div>
            </section>

            {/* DUAL CONVERSION CTA BANNER */}
            <section className="rounded-3xl bg-[#172228] text-white p-7 sm:p-9 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-56 h-56 bg-[#C65378]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
                    Dual Founder Continuity Protection
                  </div>
                  <h4 className="font-serif text-2xl font-bold mb-2">
                    Protect Your OPC Equity &amp; Family Succession
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Combine your statutory Form INC-3 nominee filing with an enforceable founder Will or Corporate Succession review drafted by specialist Indian lawyers.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/services/corporate-business-succession-family-constitution"
                    className="inline-flex items-center justify-center gap-2 bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-sm px-5 py-3 rounded-full transition-colors"
                  >
                    Corporate Succession Plan
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#172228] hover:bg-slate-100 font-bold text-sm px-5 py-3 rounded-full transition-colors"
                  >
                    Consult Our Lawyers
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT STICKY SIDEBAR: AUTHOR BIO + DUAL CTAs */}
          <aside className="hidden lg:block sticky top-28 space-y-5">
            {/* Author Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#172228] text-white flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  AM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Lawyer Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Corporate &amp; Succession Specialist
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Reviewed for strict compliance with Section 3(1)(c) of the Companies Act, 2013 and Rule 4 of the Companies (Incorporation) Rules, 2014.
              </p>
              <div className="text-[11px] font-semibold text-[#5F7E75] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Updated for 2026 MCA V3 Workflows
              </div>
            </div>

            {/* Navy Will + Corporate Continuity CTA */}
            <div className="bg-[#172228] text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Founder Continuity Bundle
              </div>
              <div className="font-serif text-xl font-bold leading-snug">
                Align Your OPC Nominee With a Legal Will
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ensure your OPC equity, company directorship, and personal assets pass cleanly without family litigation.
              </p>
              <button
                type="button"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs py-3 px-4 rounded-full transition-colors"
              >
                Start Your Succession Will
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/services/corporate-business-succession-family-constitution"
                className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs py-2.5 px-4 rounded-full transition-colors"
              >
                Corporate Succession Advisory
              </Link>
            </div>

            {/* White/Rose Advocate Consultation CTA */}
            <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-sm space-y-3">
              <div className="font-bold text-sm text-[#172228]">
                Need Custom INC-3 / INC-4 Review?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get lawyer verification for NRI nominees, cross-border KYC apostille, or sole member transmission.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#C65378] font-bold text-xs py-2.5 px-4 rounded-full transition-colors"
              >
                Request Legal Review
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Trust Points */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Included in This Draft Pack
              </div>
              {[
                "Editable Form INC-3 Consent",
                "PAN & Aadhaar Annexure Schedule",
                "Form INC-4 Withdrawal & Change Notice",
                "Section 122 Sole Member Resolution",
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5F7E75] shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* MOBILE FIXED BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <button
          type="button"
          onClick={downloadWordDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#172228] text-white font-bold text-xs py-3 rounded-full"
        >
          <Download className="w-3.5 h-3.5" />
          Download INC-3
        </button>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#C65378] text-white font-bold text-xs py-3 rounded-full"
        >
          Legal Review
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
