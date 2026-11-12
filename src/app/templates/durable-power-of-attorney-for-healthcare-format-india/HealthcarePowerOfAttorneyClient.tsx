"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Lock,
  Sparkles,
  HelpCircle,
  HeartPulse,
  Stethoscope,
  ClipboardCheck,
  Stamp,
  Users,
  Globe,
} from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
}

const TOC_ITEMS = [
  { id: "indian-legal-framework", label: "1. Indian Legal Framework" },
  { id: "medical-proxy-builder", label: "2. Medical Proxy Readiness Tool" },
  { id: "comparison-matrix", label: "3. Healthcare PoA vs Living Will" },
  { id: "powers-of-attorney-clauses", label: "4. Powers of Attorney Act Clauses" },
  { id: "mha-schedule", label: "5. Mental Healthcare Act Schedule" },
  { id: "notary-attestation", label: "6. Notary Attestation & Stamp Rules" },
  { id: "healthcare-poa-template", label: "7. Free Healthcare Proxy Template" },
  { id: "execution-sop", label: "8. Step-by-Step Execution SOP" },
  { id: "sc-2023-and-nri-rules", label: "9. SC 2023 Rules & NRI Proxies" },
  { id: "case-studies", label: "10. Indian Hospital Case Studies" },
  { id: "statutory-citations", label: "11. Official Statutes & Links" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const STATE_STAMP_GUIDE: Record<
  string,
  { label: string; stampDuty: string; registrationNote: string }
> = {
  delhi: {
    label: "Delhi NCR",
    stampDuty: "Rs. 100 Non-Judicial e-Stamp (SHCIL)",
    registrationNote:
      "Notary Public attestation works for most hospital visits. Optional Sub-Registrar Book IV registration adds court-ready proof.",
  },
  maharashtra: {
    label: "Maharashtra (Mumbai / Pune)",
    stampDuty: "Rs. 500 Non-Judicial Stamp Paper (GRAS e-Stamp)",
    registrationNote:
      "Article 48 Maharashtra Stamp Act applies Rs. 500 duty for non-property authority. Pair with Notary Public seal and hospital record copy.",
  },
  karnataka: {
    label: "Karnataka (Bengaluru)",
    stampDuty: "Rs. 200 to Rs. 500 Karnataka e-Stamp Paper",
    registrationNote:
      "Execute on Karnataka e-Stamp paper with two independent adult witnesses. Add a Section 14 Mental Healthcare Act Schedule for dementia care.",
  },
  tamilnadu: {
    label: "Tamil Nadu (Chennai)",
    stampDuty: "Rs. 100 Non-Judicial Stamp Paper",
    registrationNote:
      "Sign before two witnesses and a Notary Public. Share attested copies with your family physician and hospital medical records desk.",
  },
  haryana: {
    label: "Haryana (Gurugram / Faridabad)",
    stampDuty: "Rs. 100 Haryana e-Stamp Paper",
    registrationNote:
      "Use Haryana e-GRAS stamp paper. Multi-specialty NCR hospitals verify Notary stamp and photo ID numbers of the Proxy and Alternate Proxy.",
  },
  uttarpradesh: {
    label: "Uttar Pradesh (Noida / Lucknow)",
    stampDuty: "Rs. 100 UP e-Stamp Paper",
    registrationNote:
      "Execute before a Notary Public or Gazetted Officer with two witnesses. Optional Section 18 Registration Act filing works at the local Sub-Registrar.",
  },
  gujarat: {
    label: "Gujarat (Ahmedabad / Surat)",
    stampDuty: "Rs. 300 Gujarat Non-Judicial Stamp",
    registrationNote:
      "Notarize with clear Aadhaar/Passport numbers of Donor and Donee. Include a separate MHA 2017 Nominated Representative Schedule.",
  },
  telangana: {
    label: "Telangana (Hyderabad)",
    stampDuty: "Rs. 100 to Rs. 200 Non-Judicial Stamp",
    registrationNote:
      "Sign before two independent witnesses and notarize. Keep a certified digital scan ready for emergency admission desks.",
  },
  westbengal: {
    label: "West Bengal (Kolkata)",
    stampDuty: "Rs. 100 Non-Judicial Stamp Paper",
    registrationNote:
      "Notary Public attestation with clear witness addresses prevents hospital desk queries during ICU emergencies.",
  },
  other: {
    label: "Other Indian State / UT",
    stampDuty: "Rs. 100 to Rs. 500 State Non-Judicial e-Stamp",
    registrationNote:
      "Verify your State Stamp Act entry for non-property Power of Attorney. Execution with 2 witnesses and Notary seal applies nationwide.",
  },
};

const MHA_SCHEDULE_TEXT = `SCHEDULE B: STATUTORY NOMINATED REPRESENTATIVE DECLARATION
[Pursuant to Sections 14, 15, 16, and 17 of the Mental Healthcare Act, 2017 (Act 10 of 2017)]

1. APPOINTOR (DECLARANT) DETAILS
Full Legal Name: [Full Name of Appointor]
Son / Daughter / Spouse of: [Father's / Spouse's Name]
Date of Birth & Age: [DD/MM/YYYY] ([Age] Years)
Residential Address: [Complete Address, City, PIN Code]
Aadhaar / Passport Number: [Last 4 Digits / ID Number]
Email Address: [Email Address]

2. STATUTORY APPOINTMENT UNDER SECTION 14(1)
In exercise of my right under Section 14(1) of the Mental Healthcare Act, 2017, I hereby voluntarily appoint the person named below as my Nominated Representative ("NR") to make healthcare, treatment, admission, and care decisions on my behalf whenever I lack capacity to make mental healthcare decisions due to trauma, coma, ICU delirium, stroke, dementia, or psychiatric illness.

3. PRIMARY NOMINATED REPRESENTATIVE DETAILS
Full Name: [Full Name of Primary Representative, e.g., Daughter / Spouse]
Relationship with Appointor: [Daughter / Son / Spouse / Trusted Relative]
Age: [Age - Must be 18+ Years]
Residential Address: [Complete Address]
Email Address: [Email Address]
Aadhaar / Passport Number: [ID Number]

4. ALTERNATE NOMINATED REPRESENTATIVE (IF PRIMARY IS UNAVAILABLE)
Full Name: [Full Name of Alternate Representative]
Relationship with Appointor: [Relationship]
Age: [Age - Must be 18+ Years]
Residential Address: [Complete Address]
Email Address: [Email Address]
Aadhaar / Passport Number: [ID Number]

5. EXCLUSION OF DEFAULT PRECEDENCE (SECTION 14(4))
I expressly confirm that this written appointment supersedes the default statutory order of precedence under Section 14(4) of the Mental Healthcare Act, 2017. Treating psychiatrists, hospitals, and the Mental Health Review Board shall consult my named Nominated Representative above any other relative or caregiver.

6. CONSENT OF APPOINTED NOMINATED REPRESENTATIVE (SECTION 14(2)(c))
I, [Full Name of Primary Representative], confirm that I am an adult of sound mind and consent in writing to act as Nominated Representative under Section 17 of the Mental Healthcare Act, 2017 in the best interests of the Appointor.

Signature of Primary Representative: ________________________  Date: [DD/MM/YYYY]
Signature of Alternate Representative: ______________________  Date: [DD/MM/YYYY]
Signature of Appointor: _____________________________________  Date: [DD/MM/YYYY]`;

const NOTARY_CERTIFICATE_TEXT = `CERTIFICATE OF ATTESTATION BY NOTARY PUBLIC / GAZETTED OFFICER
[Under Section 2, Powers of Attorney Act, 1882 & Supreme Court Guidelines (2023)]

Executed at: [City, State] | Date: [DD/MM/YYYY] | Register Serial No.: [Notary Sl. No.]

I, [Full Name of Notary Public / Class-I Gazetted Officer], holding Certificate / Registration No. [Notary Registration Number / Government ID], do hereby certify that:

1. The Principal / Executant, Shri/Smt. [Full Name of Principal], aged [Age] years, residing at [Address], personally appeared before me today and produced original photo identity proof ([Aadhaar / Passport No.]).
2. The Principal appeared to be of sound mind, alert, and under no visible coercion, fraud, or undue influence, and voluntarily affixed his/her signature and left thumb impression to this Durable Power of Attorney for Healthcare and Mental Healthcare Nominated Representative Schedule in my presence.
3. Two independent adult attesting witnesses, namely [Witness 1 Name] and [Witness 2 Name], also signed in the presence of the Principal and before me after verifying their identity records.

Official Seal & Stamp of Notary Public / Gazetted Officer:
Signature: ___________________________________
Full Name & Designation: ______________________
Commission Valid Till: [Date]
Place & Date: [City], [DD/MM/YYYY]`;

const FULL_TEMPLATE_TEXT = `DURABLE POWER OF ATTORNEY FOR HEALTHCARE AND MEDICAL PROXY DEED
[Under Section 2 of the Powers of Attorney Act, 1882, Sections 14 to 17 of the Mental Healthcare Act, 2017, and Supreme Court Advance Directive Principles in Common Cause v. Union of India (2018 & 2023)]

[Execute on Non-Judicial e-Stamp Paper as applicable in your State]

KNOW ALL MEN BY THESE PRESENTS that I, [Full Name of Principal], Son/Daughter/Spouse of [Father's/Spouse's Name], aged [Age] years, an Indian citizen residing at [Complete Residential Address, City, State, PIN Code], holding Aadhaar No. [ID Number] and PAN [PAN Number] (hereinafter called the "Principal"), being of sound mind, clear understanding, and free will, do hereby execute this Healthcare Power of Attorney and Surrogate Designation Deed:

WHEREAS:
A. The Principal desires to appoint a trusted adult family member or representative to communicate medical choices, give or refuse informed clinical consent, and supervise hospital care if the Principal becomes unconscious, comatose, incapacitated by accident or stroke, or otherwise unable to express informed medical choices.
B. The Principal recognizes that Indian contract agency rules under Section 201 of the Indian Contract Act, 1872 terminate ordinary agency upon unsoundness of mind unless anchored in statutory medical proxy provisions under the Mental Healthcare Act, 2017 and constitutional Advance Medical Directive principles under Article 21.
C. Therefore, the Principal executes this combined instrument appointing a Medical Proxy under Section 2 of the Powers of Attorney Act, 1882, designating a Statutory Nominated Representative under Sections 14 to 17 of the Mental Healthcare Act, 2017, and naming a Healthcare Surrogate compatible with Supreme Court guidelines.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. APPOINTMENT OF PRIMARY AND ALTERNATE HEALTHCARE PROXY
(a) Primary Medical Proxy (Donee / Attorney):
Full Name: [Full Name of Primary Proxy, e.g., Daughter / Son / Spouse]
Relationship: [Relationship] | Age: [Age] years
Residential Address: [Complete Address]
Email: [Email Address] | Photo ID (Aadhaar / Passport): [ID Number]

(b) Alternate Medical Proxy (if Primary Proxy is unavailable, unwell, or unable to act):
Full Name: [Full Name of Alternate Proxy]
Relationship: [Relationship] | Age: [Age] years
Residential Address: [Complete Address]
Email: [Email Address] | Photo ID (Aadhaar / Passport): [ID Number]

2. TRIGGER AND CONTINUITY OF MEDICAL AUTHORITY
This authority takes effect immediately for coordinating medical records with the Principal's consent, and operates with full binding surrogate authority whenever the treating physician and one independent doctor certify in writing that the Principal temporarily or permanently lacks decision-making capacity due to coma, vegetative state, ICU sedation, head injury, stroke, or neurocognitive impairment.

3. SPECIFIC HEALTHCARE POWERS GRANTED TO THE PROXY
The Principal authorizes the Primary Proxy (or Alternate Proxy) to act on the Principal's behalf in all medical institutions across India:
(a) Access Medical Records: Demand, inspect, and receive full hospital case sheets, ICU charts, diagnostic scans, blood reports, discharge summaries, and digital ABHA health records.
(b) Informed Surgical and Clinical Consent: Sign consent forms for emergency surgeries, anaesthesia, blood transfusions, ICU procedures, dialysis, palliative pain management, and rehabilitation therapies.
(c) Hospital Selection and Transfers: Admit, transfer, or discharge the Principal between hospitals, ICUs, nursing homes, or home-care programs and select specialist physicians or second opinions.
(d) Insurance and TPA Coordination: Submit health insurance cashless pre-authorizations, discharge documents, and reimbursement claims with insurers and TPAs.
(e) Life Support and Dignity Safeguard: Present the Principal's separate Advance Medical Directive (Living Will), if executed, to the Primary and Secondary Medical Boards in terms of the Supreme Court order dated 24 January 2023. The Proxy alone shall not direct active termination of life.

4. DESIGNATION AS STATUTORY NOMINATED REPRESENTATIVE (MHA 2017)
Under Sections 14, 15, 16, and 17 of the Mental Healthcare Act, 2017, the Principal formally designates the Primary Proxy (and failing her/him, the Alternate Proxy) as the Principal's sole Nominated Representative for all capacity-impairment, delirium, dementia, or mental healthcare decisions, overriding the default family precedence order under Section 14(4).

5. EXCLUSION OF GENERAL FINANCIAL OR IMMOVABLE PROPERTY ALIENATION
This Healthcare Power of Attorney does NOT empower the Proxy to sell, mortgage, gift, lease, or transfer any immovable property, shares, or fixed deposits of the Principal. Separate banking mandates or financial Powers of Attorney shall govern monetary transactions.

6. GOOD FAITH INDEMNITY AND REVOCATION
(a) Doctors, hospitals, and diagnostic centres acting in good faith upon instructions of the Primary Proxy (or Alternate Proxy) in reliance upon this attested Deed shall stand fully indemnified.
(b) The Principal reserves the absolute right to revoke or modify this Deed at any time while retaining sound mental capacity by executing a written revocation notice.

IN WITNESS WHEREOF, the Principal has signed this Durable Power of Attorney for Healthcare voluntarily on [DD/MM/YYYY] at [City, State].

_________________________________________
SIGNATURE & LEFT THUMB IMPRESSION OF PRINCIPAL
Name: [Full Name of Principal]

ACCEPTANCE BY HEALTHCARE PROXY / NOMINATED REPRESENTATIVE
I accept this appointment as Primary Medical Proxy and Section 14 Nominated Representative and agree to act strictly in good faith for the Principal's welfare.
Signature: __________________________________   Date: [DD/MM/YYYY]
Name: [Full Name of Primary Proxy]

ATTESTATION BY TWO INDEPENDENT ADULT WITNESSES
We certify that the Principal signed this Deed voluntarily in our joint presence while appearing of sound mind and free will. Neither witness is named as Proxy above.

WITNESS 1:
Signature: __________________________________
Name: [Witness 1 Full Name] | Age: [Age]
Address: [Complete Address] | ID No.: [Aadhaar/PAN]

WITNESS 2:
Signature: __________________________________
Name: [Witness 2 Full Name] | Age: [Age]
Address: [Complete Address] | ID No.: [Aadhaar/PAN]

NOTARY PUBLIC / GAZETTED OFFICER ATTESTATION SEAL
Sworn, signed, and affirmed before me at [City] on [DD/MM/YYYY]. Identity verified via original government ID.
Notary Signature, Seal & Reg. No.: __________________________________`;

const CHECKLIST_STEPS = [
  {
    id: "step-1",
    label: "1. Confirm Principal is 18+ and of Sound Mind",
    detail: "Optional bonus: Attach a short same-day medical fitness certificate from your family doctor if over age 65.",
  },
  {
    id: "step-2",
    label: "2. Name Both a Primary Proxy and Local Alternate",
    detail: "If your child is an NRI abroad, name a trusted local Indian relative as Alternate Co-Proxy for ICU emergencies.",
  },
  {
    id: "step-3",
    label: "3. Attach the MHA 2017 Nominated Representative Schedule",
    detail: "Prevents the Section 14(4) default family hierarchy from delaying psychiatric or dementia admission.",
  },
  {
    id: "step-4",
    label: "4. Print on State Non-Judicial e-Stamp Paper",
    detail: "Typically Rs. 100 to Rs. 500 depending on State Stamp Act rules for non-property authority deeds.",
  },
  {
    id: "step-5",
    label: "5. Get Written Consent Signature from Your Proxy",
    detail: "Section 14(2)(c) of the Mental Healthcare Act requires written acceptance from the appointed representative.",
  },
  {
    id: "step-6",
    label: "6. Sign Before Two Independent Adult Witnesses",
    detail: "Do not use your Primary or Alternate Proxy as an attesting witness.",
  },
  {
    id: "step-7",
    label: "7. Notarize Before a Notary Public (or Sub-Registrar)",
    detail: "Notary seal with register serial number is mandatory for instant credibility at Indian hospital ICUs.",
  },
  {
    id: "step-8",
    label: "8. Distribute Scans to Proxy, Doctor & Health Locker",
    detail: "Give certified copies to your proxy, family physician, and upload an attested PDF to ABHA or DigiLocker.",
  },
];

export default function HealthcarePowerOfAttorneyClient({ faqs }: Props) {
  const { status } = useSession();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string>("indian-legal-framework");
  const [selectedState, setSelectedState] = useState<string>("delhi");
  const [careScope, setCareScope] = useState<string>("combined");
  const [proxyLocation, setProxyLocation] = useState<string>("same_city");
  const [attestationMode, setAttestationMode] = useState<string>("notary");

  const [copiedFull, setCopiedFull] = useState<boolean>(false);
  const [copiedMha, setCopiedMha] = useState<boolean>(false);
  const [copiedNotary, setCopiedNotary] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    "step-1": true,
    "step-2": true,
    "step-3": true,
    "step-4": false,
    "step-5": false,
    "step-6": false,
    "step-7": false,
    "step-8": false,
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
      rootMargin: "-100px 0px -45% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const handleCopyText = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleStep = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const stateInfo = STATE_STAMP_GUIDE[selectedState] || STATE_STAMP_GUIDE.delhi;
  const completedCount = Object.values(checkedSteps).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Dark Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C65378]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-rose-200 text-xs font-bold tracking-wider uppercase">
            <Stethoscope className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Powers of Attorney Act s. 2 &amp; Mental Healthcare Act ss. 14-17</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-tight leading-[1.15] text-white">
            Durable Power of Attorney for Healthcare Format India
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Use this free Indian medical proxy form to name your spouse, daughter, or son to speak with doctors if you fall into a coma. Made strictly for Indian law, not generic US forms.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#healthcare-poa-template"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C65378] hover:bg-[#b54468] text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#C65378]/25 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Healthcare Proxy Format</span>
            </a>

            <a
              href="/start"
              onClick={handleStartDraft}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-[#FAF7F0] font-bold text-sm sm:text-base transition-all shadow-md cursor-pointer"
            >
              <span>Create Online Will &amp; Proxy</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all"
            >
              <span>Request Advocate Review</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: TRUST & STATUTORY STRIP
          ========================================================================= */}
      <div className="bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-2.5 lg:border-r border-slate-200/80 lg:pr-4">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200/80 shrink-0">
                <Scale className="w-4 h-4 text-[#C65378]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#172228] uppercase tracking-wider">
                  Powers of Attorney Act
                </div>
                <div className="text-xs text-slate-600">Section 2 Medical Proxy Deed</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-2.5 lg:border-r border-slate-200/80 lg:pr-4">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200/80 shrink-0">
                <HeartPulse className="w-4 h-4 text-[#5F7E75]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#172228] uppercase tracking-wider">
                  Mental Healthcare Act
                </div>
                <div className="text-xs text-slate-600">Sections 14-17 Schedule Included</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-2.5 lg:border-r border-slate-200/80 lg:pr-4">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200/80 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#172228] uppercase tracking-wider">
                  SC 2023 Surrogate Ready
                </div>
                <div className="text-xs text-slate-600">Common Cause Modified Order</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200/80 shrink-0">
                <Stamp className="w-4 h-4 text-[#5F7E75]" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[#172228] uppercase tracking-wider">
                  Notary &amp; 2 Witnesses
                </div>
                <div className="text-xs text-slate-600">Includes Attestation Certificate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: 3-COLUMN WORKBENCH GRID
          ========================================================================= */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS */}
          <aside className="hidden lg:block sticky top-24 space-y-6">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Template Guide
                </span>
              </div>
              <nav className="space-y-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-all leading-snug ${
                        isActive
                          ? "bg-[#C65378]/10 text-[#C65378] border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#5F7E75]">
                <Building className="w-4 h-4" />
                <span>Governing Authorities</span>
              </div>
              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Powers of Attorney Act, 1882:</strong>{" "}
                  Section 2 authorizes written medical proxy action.
                </p>
                <p>
                  <strong className="text-slate-900">Mental Healthcare Act, 2017:</strong>{" "}
                  Sections 14-17 safeguard surrogate consent during incapacity.
                </p>
                <p>
                  <strong className="text-slate-900">Registration Act, 1908:</strong>{" "}
                  Optional Book IV Sub-Registrar filing under Section 18.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C65378] block">
                Mandatory Components
              </span>
              <a
                href="#healthcare-poa-template"
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#C65378] py-1"
              >
                <span>Healthcare Proxy Deed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#mha-schedule"
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#C65378] py-1"
              >
                <span>MHA 2017 NR Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#notary-attestation"
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#C65378] py-1"
              >
                <span>Notary Attestation Box</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* CENTER COLUMN: MAIN EDITORIAL CONTENT & TOOLS */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL OG IMAGE */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white aspect-[16/9]">
              <Image
                src="/images/durable-power-of-attorney-for-healthcare-format-india-og.jpg"
                alt="Durable Power of Attorney for Healthcare Format India and Nominated Representative Schedule"
                width={1200}
                height={675}
                priority
                className="w-full h-full object-cover"
              />
              <div className="hidden sm:flex items-center justify-between px-6 py-3 bg-[#172228] text-white text-xs">
                <span className="font-semibold text-slate-200">
                  Indian Medical Surrogate &amp; Nominated Representative Draft
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C65378] text-white font-bold text-[11px]">
                  Powers of Attorney Act s. 2 + MHA 2017
                </span>
              </div>
            </div>

            {/* EXECUTIVE BRIEF CALLOUT */}
            <div className="bg-[#F4F8FE] border-l-4 border-l-[#C65378] rounded-r-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Quick Legal Answer: Why US Proxy Forms Fail in India</span>
              </div>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                Yes, you can name your daughter, son, or spouse as your medical proxy in India. Still, generic US proxy forms fail here. Under <strong>Section 201 of the Indian Contract Act, 1872</strong>, an ordinary agency ends if you lose sound mind. To keep your proxy valid in an ICU or coma, our Indian deed joins <strong>Section 2 of the Powers of Attorney Act, 1882</strong> with a <strong>Mental Healthcare Act, 2017 (Sections 14-17)</strong> schedule and <strong>Supreme Court 2023 Living Will rules</strong>.
              </p>
            </div>

            {/* SECTION 1: ONLY <h2> ON THE PAGE (<= 70 CHARS, 0 EM-DASHES) */}
            <section
              id="indian-legal-framework"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 1: INDIAN STATUTORY ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172228] tracking-tight">
                Indian Legal Framework for Healthcare Proxy and Medical Surrogates
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Indian hospitals do not accept spoken family promises in a crisis. When a patient enters a coma from a stroke or road crash, doctors must check who holds legal consent power.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                India has no single US-style Durable Medical Power Act. Instead, lawyers build a three-part deed using active Indian laws and Supreme Court rules.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                    Pillar 1: Care Authority
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    Powers of Attorney Act, 1882 (Section 2)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Lets your named family member read hospital charts, pick doctors, and sign ICU or surgery forms for you.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#5F7E75]">
                    Pillar 2: Stays Active in Coma
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    Mental Healthcare Act, 2017 (Sections 14-17)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Names your Nominated Representative in writing so doctors must ask them if you cannot speak or think clearly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                    Pillar 3: End-of-Life Link
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    Common Cause v. UOI (2023 Modified Order)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Names two proxies to speak with hospital doctor boards if a terminal illness ends recovery hope.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE MEDICAL PROXY READINESS TOOL */}
            <section
              id="medical-proxy-builder"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>SECTION 2: INTERACTIVE STATUTORY CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Indian Healthcare Proxy Stamp &amp; Execution Configurator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Select your Indian state, medical scope, and proxy residence below. See exact stamp paper guidance and required statutory schedules before printing your deed.
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-5 items-stretch">
                {/* Left White Input Panel */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
                  <div>
                    <label
                      htmlFor="state-select"
                      className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2"
                    >
                      1. State of Execution (Stamp Act Jurisdiction)
                    </label>
                    <select
                      id="state-select"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-[#FAF7F0] px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      {Object.entries(STATE_STAMP_GUIDE).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      2. Medical Authority Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "icu", title: "Coma & ICU Care" },
                        { id: "mha", title: "Dementia & MHA" },
                        { id: "combined", title: "Full Proxy + Will" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCareScope(opt.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            careScope === opt.id
                              ? "bg-[#172228] text-white border-[#172228]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      3. Where Does Your Primary Proxy Live?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "same_city", title: "Same Indian City" },
                        { id: "other_city", title: "Other Indian City" },
                        { id: "nri_abroad", title: "NRI Child Abroad" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setProxyLocation(opt.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            proxyLocation === opt.id
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                      4. Preferred Attestation Path
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: "notary", title: "Notary Public + 2 Witnesses" },
                        { id: "sub_registrar", title: "Sub-Registrar Filing (s. 18)" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAttestationMode(opt.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            attestationMode === opt.id
                              ? "bg-[#5F7E75] text-white border-[#5F7E75]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Dark Navy Result Card */}
                <div className="bg-[#172228] text-white rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300">
                        Recommended Execution Plan
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-bold text-emerald-300">
                        {stateInfo.label}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400">
                        Recommended Non-Judicial Stamp Paper
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white">
                        {stateInfo.stampDuty}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {stateInfo.registrationNote}
                    </p>

                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                      <div className="font-bold text-rose-200 uppercase tracking-wider">
                        Mandatory Documents for Your Selection:
                      </div>
                      <div className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Deed Body under Section 2, Powers of Attorney Act, 1882</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          {careScope === "icu"
                            ? "Add Section 14 MHA Schedule anyway to guard against ICU delirium disputes"
                            : "Section 14-17 Mental Healthcare Act Nominated Representative Schedule"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          {attestationMode === "notary"
                            ? "Two adult witnesses + Notary Public Seal (or Gazetted Officer)"
                            : "Two witnesses + Book IV Sub-Registrar entry under Section 18(f) Registration Act"}
                        </span>
                      </div>
                    </div>

                    {proxyLocation === "nri_abroad" && (
                      <div className="bg-rose-500/15 border border-rose-400/30 rounded-xl p-3 text-xs text-rose-100 leading-relaxed">
                        <strong>NRI Alert:</strong> Because your Primary Proxy lives abroad, name an Alternate Co-Proxy residing in India for urgent physical signatures during hospital admission.
                      </div>
                    )}
                  </div>

                  <a
                    href="#healthcare-poa-template"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C65378] hover:bg-[#b54468] text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Jump to Complete Copyable Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON MATRIX */}
            <section
              id="comparison-matrix"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SECTION 3: INSTRUMENT COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Healthcare Power of Attorney vs Living Will vs MHA Representative
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Many families confuse a Medical Proxy with a Living Will or a financial Power of Attorney. Review this matrix to understand what each legal instrument covers in India.
              </p>

              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/90 shadow-sm">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                    <tr className="bg-[#172228] text-white text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4 font-bold">Legal Instrument</th>
                      <th className="py-3.5 px-4 font-bold">Governing Indian Law</th>
                      <th className="py-3.5 px-4 font-bold">Primary Medical Scope</th>
                      <th className="py-3.5 px-4 font-bold">When It Activates</th>
                      <th className="py-3.5 px-4 font-bold">Execution Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                    <tr className="bg-rose-50/40">
                      <td className="py-3.5 px-4 font-bold text-[#172228]">
                        Durable Healthcare Proxy Deed (This Page)
                      </td>
                      <td className="py-3.5 px-4">
                        Powers of Attorney Act s. 2 + Mental Healthcare Act ss. 14-17
                      </td>
                      <td className="py-3.5 px-4">
                        ICU consent, surgeries, hospital transfer, records access, psychiatric care
                      </td>
                      <td className="py-3.5 px-4">
                        Temporary or permanent loss of capacity (coma, stroke, dementia)
                      </td>
                      <td className="py-3.5 px-4">
                        State e-Stamp + 2 witnesses + Notary Public (optional Sub-Registrar)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-[#172228]">
                        Living Will (Advance Medical Directive)
                      </td>
                      <td className="py-3.5 px-4">
                        Article 21 &amp; Common Cause (2018 &amp; Jan 2023 SC Order)
                      </td>
                      <td className="py-3.5 px-4">
                        Refusing ventilators, CPR, or tube feeding in terminal illness
                      </td>
                      <td className="py-3.5 px-4">
                        Terminal stage verified by Primary &amp; Secondary Medical Boards
                      </td>
                      <td className="py-3.5 px-4">
                        Plain paper + 2 witnesses + Notary or Gazetted Officer
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-[#172228]">
                        MHA 2017 Nominated Representative
                      </td>
                      <td className="py-3.5 px-4">
                        Mental Healthcare Act, 2017 Sections 14 to 17
                      </td>
                      <td className="py-3.5 px-4">
                        Admission, medication, treatment, and discharge for mental incapacity
                      </td>
                      <td className="py-3.5 px-4">
                        Whenever patient lacks capacity to make mental healthcare choices
                      </td>
                      <td className="py-3.5 px-4">
                        Signed writing + written acceptance by the named Representative
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-[#172228]">
                        Court Legal Guardianship
                      </td>
                      <td className="py-3.5 px-4">
                        RPWD Act 2016 s. 14 / High Court Parens Patriae Writ
                      </td>
                      <td className="py-3.5 px-4">
                        Full personal care and property control after incapacity strikes
                      </td>
                      <td className="py-3.5 px-4">
                        Only AFTER patient has lost capacity without a prior proxy
                      </td>
                      <td className="py-3.5 px-4">
                        Expensive court petition taking months during a medical crisis
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: POWERS OF ATTORNEY ACT S. 2 & CONTRACT ACT WORKAROUND */}
            <section
              id="powers-of-attorney-clauses"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 4: ESSENTIAL MEDICAL PROXY CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Four Critical Clauses Under Powers of Attorney Act Section 2
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Every valid Indian medical proxy form needs clear hospital powers and safe legal limits. If any core clause is missing, hospital desks may delay ICU consent.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">
                      1. Clear Proxy Identity and Backup Name
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      PoA Act s. 2
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    List full names, family ties, and Aadhaar or Passport numbers for both your main proxy and backup proxy. Doctors check photo IDs fast at admission.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">
                      2. Section 201 Contract Act Fix
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#5F7E75]">
                      Continuity
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Section 201 ends normal business agencies if a maker loses mental clarity. Our draft links ongoing medical power to Section 14 of the Mental Healthcare Act, 2017.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">
                      3. Records, ICU Transfer and Claim Help
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      Clinical Scope
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Name clear rights to view lab reports, sign surgery forms, move patients between hospitals, and file cashless health insurance claims.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">
                      4. Strict Money and Property Guardrail
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#5F7E75]">
                      Safeguard
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Block your proxy from selling houses, land, or fixed deposits. Leaving property out also saves you from high State stamp duty fees.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: MANDATORY ASSET - MENTAL HEALTHCARE ACT 2017 SCHEDULE */}
            <section
              id="mha-schedule"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#5F7E75]">
                <HeartPulse className="w-4 h-4" />
                <span>SECTION 5: MENTAL HEALTHCARE ACT SCHEDULE (SS. 14-17)</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Nominated Representative Declaration Under Mental Healthcare Act, 2017
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                The <strong>Mental Healthcare Act, 2017 (Sections 14 to 17)</strong> protects your care choices during any drop in mental clarity. Any adult can appoint a Nominated Representative in writing. Doctors must talk to this person about care plans under Section 17.
              </p>

              {/* Default Precedence Warning Box */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#172228]">
                  <AlertTriangle className="w-4 h-4 text-[#C65378] shrink-0" />
                  <span>Why You Must Override Section 14(4) Default Order</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Without a signed Section 14 form, doctors follow a strict fallback order under <strong>Section 14(4)</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-slate-200/80">
                    <span className="font-extrabold text-[#C65378] block mb-1">Priority 1</span>
                    <span>Person appointed in your written Advance Directive</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-slate-200/80">
                    <span className="font-extrabold text-slate-700 block mb-1">Priority 2</span>
                    <span>A legal relative (often causing dispute among siblings)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-slate-200/80">
                    <span className="font-extrabold text-slate-700 block mb-1">Priority 3</span>
                    <span>Caregiver or person appointed by Mental Health Review Board</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-slate-200/80">
                    <span className="font-extrabold text-slate-700 block mb-1">Priority 4</span>
                    <span>Director of Social Welfare Department or State nominee</span>
                  </div>
                </div>
              </div>

              {/* Copyable MHA Schedule Box */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-[#5F7E75] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-white" />
                    <span className="text-xs sm:text-sm font-bold">
                      Schedule B: Mental Healthcare Act ss. 14-17 Declaration Format
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(MHA_SCHEDULE_TEXT, setCopiedMha)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedMha ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Schedule Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy MHA Schedule</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 bg-slate-50/70 max-h-[340px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {MHA_SCHEDULE_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 6: MANDATORY ASSET - NOTARY ATTESTATION BOX & REGISTRATION GUIDE */}
            <section
              id="notary-attestation"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>SECTION 6: NOTARIZATION &amp; REGISTRATION RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. Notary Attestation Box &amp; Registration Act 1908 Compliance
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                A plain sheet without stamps often raises doubts at large hospitals. Follow these three quick steps so doctors accept your proxy paper right away.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <h4 className="font-bold text-sm text-[#172228]">
                    Stamp Paper Duty
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Print on Rs. 100 to Rs. 500 non-judicial e-Stamp paper per your State Stamp Act (Rs. 500 in Maharashtra, Rs. 100 in Delhi).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <h4 className="font-bold text-sm text-[#172228]">
                    Notary vs Sub-Registrar
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Notary Public seal with serial number works fast in hospitals. You can also register under <strong>Section 18(f) Indian Registration Act, 1908</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
                  <h4 className="font-bold text-sm text-[#172228]">
                    Two Adult Witnesses
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two adults must watch you sign freely. Never pick your main proxy or backup proxy to sign as a witness.
                  </p>
                </div>
              </div>

              {/* Dedicated Styled Notary Attestation Box */}
              <div className="bg-white border-2 border-[#172228] rounded-2xl shadow-md overflow-hidden">
                <div className="bg-[#172228] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      Official Notary Public / Gazetted Officer Attestation Box
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText(NOTARY_CERTIFICATE_TEXT, setCopiedNotary)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedNotary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Certificate Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notary Box</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 sm:p-6 bg-[#FAF7F0] font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {NOTARY_CERTIFICATE_TEXT}
                </div>
              </div>
            </section>

            {/* SECTION 7: MANDATORY ASSET - FULL HEALTHCARE PROXY DEED TEMPLATE */}
            <section
              id="healthcare-poa-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SECTION 7: COMPLETE DOWNLOADABLE DEED FORMAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Complete Durable Power of Attorney for Healthcare Format (India)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Copy or print the complete legal draft below. Replace every bracketed placeholder with verified identity details before printing on your State e-Stamp paper.
              </p>

              <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      Healthcare Proxy Deed + MHA 2017 Proxy Clause + Notary Block
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(FULL_TEMPLATE_TEXT, setCopiedFull)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      {copiedFull ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Format</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-slate-50/60 max-h-[540px] overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all border-b border-slate-200">
                  {FULL_TEMPLATE_TEXT}
                </div>

                {/* Inline Dual Conversion CTA inside Template Container */}
                <div className="p-4 sm:p-5 bg-rose-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-800">
                  <span className="font-medium text-center sm:text-left">
                    Want a personalized Healthcare Proxy paired with your registered Will and Living Will?
                  </span>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all cursor-pointer"
                    >
                      <span>Start Online Estate Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172228] text-white font-bold hover:bg-slate-800 transition-all"
                    >
                      <span>Talk to Lawyer</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: 8-STEP EXECUTION SOP & INTERACTIVE CHECKLIST */}
            <section
              id="execution-sop"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#5F7E75]">
                <CheckCircle2 className="w-4 h-4" />
                <span>SECTION 8: EXECUTION &amp; HOSPITAL CUSTODY SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Step-by-Step Checklist to Execute Your Healthcare Power of Attorney
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Check each step below before keeping your signed copy with your family. Every point helps hospital teams verify your paper fast in an ICU crisis.
              </p>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Execution Progress: {completedCount} of {CHECKLIST_STEPS.length} Ready
                  </span>
                  <span className="text-xs font-bold text-[#C65378]">
                    {Math.round((completedCount / CHECKLIST_STEPS.length) * 100)}% Complete
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5F7E75] h-2 transition-all duration-300"
                    style={{
                      width: `${(completedCount / CHECKLIST_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {CHECKLIST_STEPS.map((step) => {
                    const checked = Boolean(checkedSteps[step.id]);
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => toggleStep(step.id)}
                        className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          checked
                            ? "bg-emerald-50/50 border-[#5F7E75]/40"
                            : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            checked
                              ? "bg-[#5F7E75] text-white"
                              : "bg-white border border-slate-300"
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-[#172228]">
                            {step.label}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 9: SC 2023 RULES & NRI ELDER CARE SCENARIOS */}
            <section
              id="sc-2023-and-nri-rules"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>SECTION 9: SPECIAL INDIAN SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Supreme Court 2023 Medical Boards &amp; NRI Caregiving Rules
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#172228]">
                    <HeartPulse className="w-4 h-4 text-[#C65378]" />
                    <span>How Your Proxy Works With a Living Will (2023 SC Order)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the Supreme Court order of January 2023 in <em>Common Cause v. Union of India</em>, two doctor boards check any plea to stop life support.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Your proxy cannot demand active euthanasia or pull plugs alone. Instead, your proxy shows your signed{" "}
                    <Link
                      href="/templates/living-will-format-india"
                      className="font-bold text-[#C65378] underline underline-offset-2"
                    >
                      Advance Medical Directive (Living Will)
                    </Link>{" "}
                    to the Primary and Secondary Medical Boards.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#172228]">
                    <Users className="w-4 h-4 text-[#5F7E75]" />
                    <span>NRI Children Caring for Parents in India</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    An adult NRI child in the USA, UK, Canada, or Singapore can be your first proxy in India. List both their foreign home address and OCI or Passport number.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Always name a local backup proxy in your parents&apos; Indian city for quick signatures before flights land. For property bills too, pair this with an{" "}
                    <Link
                      href="/templates/special-power-of-attorney-nri-property-inheritance-format"
                      className="font-bold text-[#5F7E75] underline underline-offset-2"
                    >
                      NRI Special Power of Attorney
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL CASE STUDIES */}
            <section
              id="case-studies"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>SECTION 10: REAL-WORLD HOSPITAL APPLICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Case Studies: How Indian Hospitals Verify Proxy Authority
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                    Case Study 1: Delhi ICU Stroke Coma
                  </span>
                  <h4 className="font-bold text-base text-[#172228]">
                    Daughter Approving Emergency Surgery While Siblings Disagree
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A 71-year-old retired engineer in New Delhi had a brain bleed and fell into a coma. His son lived abroad. His daughter lived nearby and held a notarized Proxy Deed and Section 14 clause on Rs. 100 stamp paper.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    <strong>Outcome:</strong> The ICU team accepted her notarized paper right away. She read brain scan charts and signed for urgent care with zero delay.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#5F7E75] text-xs font-bold">
                    Case Study 2: Bengaluru Early Dementia Care
                  </span>
                  <h4 className="font-bold text-base text-[#172228]">
                    Co-Proxy Design Between NRI Son and Local Sister
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    After an early dementia check, a widow in Bengaluru signed a Healthcare Proxy with a Mental Healthcare Act clause while her mind was clear. She named her NRI son first and her local sister as backup proxy.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    <strong>Outcome:</strong> When memory loss grew worse later, doctors honored both written picks cleanly without any slow High Court guardianship case.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & INTERNAL SPOKES */}
            <section
              id="statutory-citations"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#5F7E75]">
                <Lock className="w-4 h-4" />
                <span>SECTION 11: STATUTORY SOURCES &amp; RELATED RESOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Official Statutes &amp; Related WillDrafting Tools
              </h3>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <div className="font-extrabold text-[#172228] uppercase tracking-wider text-xs">
                      Official Statutory &amp; Court Portals
                    </div>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <a
                          href="https://www.indiacode.nic.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#C65378] underline underline-offset-2"
                        >
                          India Code: Powers of Attorney Act, 1882 &amp; Mental Healthcare Act, 2017
                        </a>
                      </li>
                      <li className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                        <a
                          href="https://www.sci.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#C65378] underline underline-offset-2"
                        >
                          Supreme Court of India: Common Cause Advance Directive Orders (2018 &amp; 2023)
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-extrabold text-[#172228] uppercase tracking-wider text-xs">
                      Connected WillDrafting Templates &amp; Tools
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Link
                        href="/templates"
                        className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                      >
                        All Legal Templates Hub
                      </Link>
                      <Link
                        href="/templates/living-will-format-india"
                        className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                      >
                        Living Will Format India
                      </Link>
                      <Link
                        href="/tools/living-will-advance-directive-eligibility-checker"
                        className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                      >
                        Living Will Eligibility Checker
                      </Link>
                      <Link
                        href="/services/will-registration"
                        className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#C65378] hover:text-[#C65378] transition-colors"
                      >
                        Will Registration Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>SECTION 12: FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Common Questions on Healthcare Power of Attorney in India
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-sm sm:text-base text-[#172228]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PLAIN-ENGLISH 3-CARD QUICK SUMMARY */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div className="text-center max-w-2xl mx-auto space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#5F7E75]">
                  Quick Summary in Simple Words
                </span>
                <div className="text-xl font-extrabold text-[#172228]">
                  How This Format Protects You and Your Family
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-[#172228]">1. Clear Voice in Coma</div>
                  <p className="text-slate-600 leading-relaxed">
                    Your chosen daughter, spouse, or son gets immediate paper authority to speak with ICU doctors and read your charts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-[#172228]">2. Stops Family Disputes</div>
                  <p className="text-slate-600 leading-relaxed">
                    The Mental Healthcare Act Schedule overrides vague default family order so doctors know exactly whose consent counts.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-[#172228]">3. Protects Your Money</div>
                  <p className="text-slate-600 leading-relaxed">
                    Health choices stay strictly separate from property sales so your home and bank assets remain safe.
                  </p>
                </div>
              </div>
            </div>

            {/* BOTTOM DUAL CONVERSION CTA */}
            <div className="bg-[#172228] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Complete Medical &amp; Estate Protection
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  Ready to Prepare Your Will and Healthcare Proxy Together?
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Draft a lawyer-reviewed Will online in minutes or book an advocate review for NRI co-proxy and Sub-Registrar registration support.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#b54468] text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <span>Start Online Will</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-[#FAF7F0] font-bold text-sm transition-all"
                >
                  <span>Consult Advocates</span>
                </Link>
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR: AUTHOR BIO + DUAL CONVERSION CTAs */}
          <aside className="hidden lg:block sticky top-24 space-y-6">
            {/* Author Verification Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  AM
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#172228]">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-xs text-[#5F7E75] font-semibold">
                    Managing Partner, AMA Legal Solutions
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                This format was reviewed against Section 2 of the Powers of Attorney Act, 1882, Sections 14-17 of the Mental Healthcare Act, 2017, and Supreme Court 2023 guidelines.
              </p>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] hover:underline"
              >
                <span>View Editorial Legal Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dual CTA Card 1: Dark Navy /Start */}
            <div className="bg-[#172228] text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>Recommended Pair</span>
              </div>
              <div className="text-lg font-extrabold leading-snug">
                Online Will + Medical Surrogate Plan
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>Covers property succession &amp; guardianship</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>Pairs cleanly with your Healthcare Proxy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>Plain-English execution checklist included</span>
                </li>
              </ul>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C65378] hover:bg-[#b54468] text-white font-bold text-xs transition-all cursor-pointer"
              >
                <span>Draft Your Will Online</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Dual CTA Card 2: White /Contact */}
            <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-xs space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                Custom Advocate Drafting
              </div>
              <div className="text-base font-extrabold text-[#172228]">
                Need NRI Co-Proxy or Registration Help?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have Indian succession advocates draft a custom Medical Proxy, Living Will, and Sub-Registrar filing note for your family.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-rose-50 border border-slate-200 text-[#172228] font-bold text-xs transition-colors"
              >
                <span>Request Legal Assistance</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* SMALL-SCREEN STICKY BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-lg">
        <a
          href="#healthcare-poa-template"
          className="flex-1 text-center py-2.5 rounded-xl bg-[#FAF7F0] border border-slate-200 text-[#172228] font-bold text-xs"
        >
          View Format
        </a>
        <a
          href="/start"
          onClick={handleStartDraft}
          className="flex-1 text-center py-2.5 rounded-xl bg-[#C65378] text-white font-bold text-xs cursor-pointer"
        >
          Draft Online
        </a>
        <Link
          href="/contact"
          className="flex-1 text-center py-2.5 rounded-xl bg-[#172228] text-white font-bold text-xs"
        >
          Consult Lawyer
        </Link>
      </div>
    </div>
  );
}
