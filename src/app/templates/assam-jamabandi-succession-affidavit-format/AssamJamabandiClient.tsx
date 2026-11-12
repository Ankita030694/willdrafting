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
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  MapPin,
  Copy,
  CheckCheck,
  Users,
  FileText,
  FileSpreadsheet,
  Calculator,
  Stamp,
  Plus,
  Trash2,
  ClipboardCheck,
  Layers,
  Compass,
} from "lucide-react";

// Table of Contents Items (all <= 70 chars, 0 em-dashes, matching section IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Assam Jamabandi & Dharitree Rules" },
  { id: "interactive-patta-builder", label: "2. Free Affidavit & Patta Checker" },
  { id: "patta-classification-table", label: "3. Patta Table: Myadi vs Eksona" },
  { id: "periodic-vs-annual-guide", label: "4. Periodic vs Annual Patta Guide" },
  { id: "jamabandi-affidavit-template", label: "5. Dharitree Mutation Affidavit" },
  { id: "circle-officer-guide", label: "6. Circle Officer & Sec 52 Notice" },
  { id: "dharitree-filing-sop", label: "7. Sewa Setu Steps & Checklist" },
  { id: "assam-case-studies", label: "8. Real Assam Mutation Cases" },
  { id: "statutory-citations", label: "9. Official Portals & Citations" },
  { id: "frequently-asked-questions", label: "10. Assam Mutation FAQs" },
];

const ASSAM_DISTRICTS = [
  "Kamrup Metro (Guwahati)",
  "Kamrup (Amingaon)",
  "Dibrugarh",
  "Jorhat",
  "Nagaon",
  "Sonitpur (Tezpur)",
  "Cachar (Silchar)",
  "Tinsukia",
  "Barpeta",
  "Sivasagar",
  "Golaghat",
  "Bongaigaon",
  "Lakhimpur",
  "Darrang",
];

type PattaTypeKey = "periodic_khiraj" | "annual_eksona" | "nisf_khiraj" | "tribal_belt";
type MutationRouteKey = "field_uncontested" | "office_will" | "office_contested";
type PersonalLawKey = "hindu" | "muslim" | "christian" | "customary";

const PATTA_CONFIG: Record<
  PattaTypeKey,
  {
    label: string;
    shortName: string;
    statutorySection: string;
    canInherit: string;
    canWill: string;
    canSell: string;
    routeAdvice: string;
    timeline: string;
  }
> = {
  periodic_khiraj: {
    label: "Periodic Khiraj (Myadi Patta)",
    shortName: "Periodic Myadi Patta",
    statutorySection: "Section 9, ALRR 1886 (Land-Holder)",
    canInherit: "Yes (Full Statutory Right)",
    canWill: "Yes (Valid & Mutable)",
    canSell: "Yes (Fully Transferable)",
    routeAdvice:
      "File uncontested inheritance via Field Mutation (Lat Mandal) or Will-based transfer via Circle Officer Office Mutation.",
    timeline: "30 to 45 Days",
  },
  annual_eksona: {
    label: "Annual Patta (Eksona Patta)",
    shortName: "Annual Eksona Patta",
    statutorySection: "Section 11, ALRR 1886 (Settlement-Holder)",
    canInherit: "Limited (Year-to-Year Heir Entry)",
    canWill: "No (Barred Under Sec 11)",
    canSell: "No (Non-Transferable)",
    routeAdvice:
      "Annual Patta cannot pass by a Will or Sale Deed. Heirs must first record succession and convert AP to PP on Mission Basundhara.",
    timeline: "45 to 90 Days (With Conversion)",
  },
  nisf_khiraj: {
    label: "Nisf-Khiraj / Lakhiraj Estate",
    shortName: "Nisf-Khiraj Estate",
    statutorySection: "ALRR 1886 Special Tenures",
    canInherit: "Yes (Heritable Share)",
    canWill: "Yes (Subject to Estate Rules)",
    canSell: "Yes (Subject to Revenue Clearance)",
    routeAdvice:
      "Requires Circle Officer Office Mutation with original Nisf-Khiraj Patta extracts and revenue paid receipts.",
    timeline: "45 to 60 Days",
  },
  tribal_belt: {
    label: "Tribal Belt / Block Land (Ch. X)",
    shortName: "Chapter X Tribal Belt",
    statutorySection: "Chapter X (ss. 160-171), ALRR 1886",
    canInherit: "Yes (Among Eligible Heirs)",
    canWill: "Restricted (To Protected Class Only)",
    canSell: "Barred to Non-Notified Persons",
    routeAdvice:
      "Heir must prove protected class eligibility under Chapter X. Transfers to non-notified outsiders are void.",
    timeline: "45 to 75 Days",
  },
};

const PERSONAL_LAWS: Record<
  PersonalLawKey,
  {
    label: string;
    statute: string;
    heirSummary: string;
  }
> = {
  hindu: {
    label: "Hindu / Sikh / Jain / Buddhist",
    statute: "Hindu Succession Act, 1956 (Class I)",
    heirSummary:
      "Spouse, sons, married or unmarried daughters, and mother inherit equal shares. Predeceased child branches take by representation.",
  },
  muslim: {
    label: "Muslim Personal Law (Shariat)",
    statute: "Muslim Personal Law (Shariat) Act, 1937",
    heirSummary:
      "All Quranic sharers and residuaries, including widow, widower, sons, daughters, and living parents, must be named in the family tree.",
  },
  christian: {
    label: "Christian Succession Rules",
    statute: "Indian Succession Act, 1925 (Part V)",
    heirSummary:
      "Spouse takes one-third when children survive, and sons and daughters share the balance equally.",
  },
  customary: {
    label: "Sixth Schedule / Tribal Customary",
    statute: "Autonomous Council & Customary Rules",
    heirSummary:
      "Succession follows verified tribal custom or Autonomous Council land rules alongside Chapter X ALRR limits.",
  },
};

const FAQS = [
  {
    q: "What stamp paper value is needed for an Assam Jamabandi mutation affidavit?",
    a: "Under Article 4 of Schedule I to the Indian Stamp Act as amended in Assam, print your affidavit on ₹100 non-judicial stamp paper or e-stamp. Sign it before a Notary Public or First Class Executive Magistrate.",
  },
  {
    q: "Can Annual Patta or Eksona Patta land in Assam be transferred by Will?",
    a: "No. Under Section 11 of the Assam Land and Revenue Regulation, 1886, an Annual Patta holder only holds a one-year settlement right. You cannot sell, gift, or Will Annual Patta land until you convert it to Periodic Myadi Patta.",
  },
  {
    q: "How do legal heirs inherit Annual Patta land after the pattadar dies?",
    a: "Heirs can request temporary heir entry for the current settlement year. To gain permanent ownership, apply on the Mission Basundhara portal to convert the Annual Patta into a Periodic Khiraj Myadi Patta.",
  },
  {
    q: "What is the difference between Field Mutation and Office Mutation on Dharitree?",
    a: "Field Mutation applies to uncontested rural inheritance where the Lat Mandal verifies possession on site and updates Chitha records under Section 53A. Office Mutation goes before the Circle Officer under Sections 50 to 53 for urban Guwahati plots, Wills, or disputes.",
  },
  {
    q: "Must married daughters be named in the Assam succession affidavit?",
    a: "Yes. Under the Hindu Succession Act, 1956 and Indian personal laws, married daughters hold equal inheritance rights in Periodic Myadi Patta land. Leaving out any daughter makes the affidavit false and leads to Circle Officer rejection.",
  },
  {
    q: "How long does the Circle Officer notice period under Section 52 take?",
    a: "Under Section 52 of the Assam Land and Revenue Regulation, 1886 and Rule 215 of the Assam Land Records Manual, the Circle Officer issues a public notice inviting objections. Co-pattadars usually get 15 to 30 days to respond before the mutation order passes.",
  },
  {
    q: "Is probate compulsory in Assam to mutate Periodic Patta land under a Will?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, 1925, probate is only mandatory in Mumbai, Kolkata, and Chennai presidency towns. In Assam, heirs can submit a valid Will directly to the Circle Officer.",
  },
  {
    q: "Where do I file the Assam Jamabandi succession mutation online?",
    a: "Apply online on the Assam Sewa Setu portal or Mission Basundhara portal with your death certificate, Next of Kin certificate, Jamabandi copy, and sworn affidavit. The file routes directly to your Circle Officer on Dharitree.",
  },
];

interface HeirRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: "Living" | "Married & Living" | "Predeceased" | "Minor";
  shareNote: string;
}

export default function AssamJamabandiClient() {
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
  const [copiedAffidavit, setCopiedAffidavit] = useState(false);
  const [copiedNotary, setCopiedNotary] = useState(false);
  const [copiedCoNotice, setCopiedCoNotice] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Builder State
  const [district, setDistrict] = useState<string>("Kamrup Metro (Guwahati)");
  const [revenueCircle, setRevenueCircle] = useState<string>("Dispur");
  const [mouza, setMouza] = useState<string>("Beltola");
  const [village, setVillage] = useState<string>("Hengrabari");
  const [pattaType, setPattaType] = useState<PattaTypeKey>("periodic_khiraj");
  const [mutationRoute, setMutationRoute] = useState<MutationRouteKey>("field_uncontested");
  const [personalLaw, setPersonalLaw] = useState<PersonalLawKey>("hindu");
  const [pattaNo, setPattaNo] = useState<string>("PP No. 418");
  const [dagNo, setDagNo] = useState<string>("Dag No. 1024");
  const [landArea, setLandArea] = useState<string>("2 Katha 10 Lecha");
  const [deceasedName, setDeceasedName] = useState<string>("Late Bhabesh Chandra Das");
  const [deathDate, setDeathDate] = useState<string>("18-06-2026");
  const [applicantName, setApplicantName] = useState<string>("Pranjal Das");

  const [heirs, setHeirs] = useState<HeirRow[]>([
    {
      id: 1,
      name: "Smt. Anjali Das",
      age: "64",
      relation: "Spouse (Widow)",
      status: "Living",
      shareNote: "Class I Equal Share",
    },
    {
      id: 2,
      name: "Sri Pranjal Das",
      age: "39",
      relation: "Son (Applicant)",
      status: "Living",
      shareNote: "Class I Equal Share",
    },
    {
      id: 3,
      name: "Smt. Barnali Das Kalita",
      age: "35",
      relation: "Daughter",
      status: "Married & Living",
      shareNote: "Equal Share (HSA s. 6 & 8)",
    },
    {
      id: 4,
      name: "Late Dipak Das (Spouse: Rina / Son: Aarav, 14)",
      age: "Deceased",
      relation: "Predeceased Son Branch",
      status: "Predeceased",
      shareNote: "Per Stirpes Branch Share",
    },
  ]);

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Full Name of Legal Heir",
        age: "32",
        relation: "Daughter / Son / Mother",
        status: "Living",
        shareNote: "Eligible Heir Share",
      },
    ]);
  };

  const updateHeirRow = (id: number, field: keyof HeirRow, value: string) => {
    setHeirs((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const removeHeirRow = (id: number) => {
    if (heirs.length <= 1) return;
    setHeirs((prev) => prev.filter((row) => row.id !== id));
  };

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

  const currentPatta = PATTA_CONFIG[pattaType];
  const currentLaw = PERSONAL_LAWS[personalLaw];

  const heirListFormatted = heirs
    .map(
      (h, idx) =>
        `${idx + 1}. ${h.name} | Age: ${h.age} | Relation: ${h.relation} | Status: ${h.status} | Share Basis: ${h.shareNote}`
    )
    .join("\n");

  const affidavitTemplateText = `AFFIDAVIT FOR JAMABANDI SUCCESSION & FIELD MUTATION (NAMJARI)
(Submitted on Dharitree / Sewa Setu Portal under Sections 50-53 & 53A of the Assam Land and Revenue Regulation, 1886)
[To be printed on Rs. 100/- Assam Non-Judicial Stamp Paper / e-Stamp under Article 4]

BEFORE THE LEARNED CIRCLE OFFICER, ${revenueCircle.toUpperCase()} REVENUE CIRCLE, ${district.toUpperCase()}, ASSAM
THROUGH THE LAT MANDAL, ${mouza.toUpperCase()} MOUZA, ${village.toUpperCase()} REVENUE VILLAGE

I, ${applicantName}, aged about [Age] years, son/daughter/spouse of [Father/Spouse Name], resident of Village/Locality: ${village}, Mouza: ${mouza}, P.O. [Post Office], P.S. [Police Station], Revenue Circle: ${revenueCircle}, District: ${district}, Assam, PIN: [781XXX], Aadhaar No: [XXXX-XXXX-XXXX], do hereby solemnly affirm and state on oath as follows:

1. RECORDED PATTADAR & LAND SCHEDULE:
That my deceased [Relation], ${deceasedName}, was the recorded Pattadar / landholder in peaceful possession of land measuring ${landArea}, covered by ${dagNo} and ${pattaNo} (${currentPatta.shortName}), situated at Revenue Village: ${village}, Mouza: ${mouza}, under ${revenueCircle} Revenue Circle, District: ${district}, Assam, as reflected in the Jamabandi and Chitha records.

2. DATE OF DEMISE & TESTAMENTARY STATUS:
That the said recorded Pattadar ${deceasedName} passed away on ${deathDate} at [Place of Death], as evidenced by Death Certificate No. [Reg. No.] dated [Issue Date] issued by [Registrar of Births & Deaths / GMC / Local Body]. ${
    mutationRoute === "office_will"
      ? "The deceased left behind a valid Will dated [Will Date] (Registered at SRO [SRO Name] as Deed No. [No.] / Unregistered), bequeathing the schedule land to the beneficiary named below."
      : "The deceased died intestate without leaving any Will or testamentary instrument regarding the schedule land."
  }

3. TENURE CLASSIFICATION (${currentPatta.shortName.toUpperCase()}):
That the schedule land is recorded as ${currentPatta.label} under ${currentPatta.statutorySection}. ${
    pattaType === "annual_eksona"
      ? "This succession affidavit is filed strictly for inheritance entry / Mission Basundhara conversion from Annual Patta to Periodic Myadi Patta, and not for any prohibited sale or testamentary alienation."
      : "The land confers permanent, heritable, and transferable landholder rights eligible for mutation in the Jamabandi and Chitha."
  }

4. COMPLETE FAMILY TREE & SURVIVING LEGAL HEIRS (${currentLaw.statute}):
That upon the demise of ${deceasedName}, the following persons (including married daughters and predeceased branch heirs, if any) are the ONLY surviving legal heirs entitled to succeed:
${heirListFormatted}

5. NEGATIVE DECLARATION & POSSESSION CONFIRMATION:
I solemnly declare that apart from the heirs listed in Paragraph 4, the deceased left behind no other spouse, son, married or unmarried daughter, adopted child, or surviving mother/father entitled to inherit. The legal heirs are in actual physical possession of the land. No title suit, injunction, or revenue appeal is pending before any Civil Court or Tribunal.

6. CO-PATTADAR & LAND CEILING COMPLIANCE:
That the mutation sought does not violate the Assam Fixation of Ceiling on Land Holdings Act, 1956 (50 Bigha limit)${
    pattaType === "tribal_belt"
      ? " and strictly complies with Chapter X of the Assam Land and Revenue Regulation, 1886 governing protected Tribal Belt/Block occupants."
      : " and all co-pattadars / heirs have no objection to the Jamabandi entry."
  }

7. VERIFICATION & PENAL LIABILITY:
I verify that Paragraphs 1 to 6 are true to my knowledge and belief. I understand that concealing any legal heir or furnishing false particulars attracts prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 (BNS) and automatic cancellation of the mutation order.

Place: ${revenueCircle}, ${district}, Assam
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Full Name: ${applicantName}`;

  const notaryAndWitnessBoxText = `NOTARY PUBLIC / EXECUTIVE MAGISTRATE & WITNESS IDENTIFICATION BLOCK (ASSAM)

PART A: SOLEMN AFFIRMATION BEFORE NOTARY / MAGISTRATE
Solemnly affirmed and signed before me by Shri/Smt. ${applicantName}, personally identified by Aadhaar No. [XXXX-XXXX-XXXX] and the identifying witnesses below, on this [Day] day of [Month], [Year] at ${revenueCircle}, ${district}, Assam.

Notary Public / First Class Executive Magistrate:
Official Seal & Signature: _______________________
Registration No. & Validity: _______________________
Notarial Register Entry: Page [__], Sl. No. [__]

PART B: LOCAL WITNESSES FOR LAT MANDAL FIELD ENQUIRY (ASSAM LAND RECORDS MANUAL)
We, the undersigned adult residents / neighboring pattadars of ${village} Village, ${mouza} Mouza, ${revenueCircle} Circle, personally knew Late ${deceasedName} and confirm that the heirs named in Paragraph 4 are true, complete, and in physical possession of ${dagNo}, ${pattaNo}.

1. Witness 1 Name: _______________________ | Dag/Patta No.: ____________
   Address: _______________________ | Aadhaar: [XXXX-XXXX-XXXX] | Sign: ______________
2. Witness 2 Name: _______________________ | Dag/Patta No.: ____________
   Address: _______________________ | Aadhaar: [XXXX-XXXX-XXXX] | Sign: ______________`;

  const circleOfficerNoticeTemplate = `APPLICATION & SECTION 52 GENERAL NOTICE FORMAT FOR CIRCLE OFFICER MUTATION
(Under Sections 50, 52 & 53 of Assam Land and Revenue Regulation, 1886 & Rule 215, ALRM)

PART A: MUTATION PETITION TO CIRCLE OFFICER (${
    mutationRoute === "field_uncontested" ? "FIELD MUTATION - SEC 53A" : "OFFICE MUTATION - SEC 50-53"
  })
To,
The Circle Officer,
${revenueCircle} Revenue Circle, District ${district}, Assam.

Subject: Prayer for Inheritance Mutation (Namjari) in Jamabandi & Chitha for ${dagNo}, ${pattaNo} (${currentPatta.shortName}), Village ${village}, Mouza ${mouza}.

Sir/Madam,
I, ${applicantName}, one of the legal heirs of Late ${deceasedName} (who expired on ${deathDate}), humbly state that the deceased was the recorded Pattadar of land measuring ${landArea} under ${dagNo} and ${pattaNo}. Attached herewith are the Death Certificate, Next of Kin (NOK) Certificate, Sworn Legal Heir Affidavit on Rs. 100 stamp paper, latest Jamabandi copy, and land revenue (Khajana) receipt.
It is prayed that the names of all lawful heirs listed in the affidavit be entered in place of Late ${deceasedName} via Dharitree ${
    mutationRoute === "field_uncontested" ? "Field Mutation" : "Office Mutation"
  } after local Lat Mandal verification and statutory Section 52 notice.

Date: [DD-MM-YYYY] | Applicant Signature: ___________________

----------------------------------------------------------------------

PART B: CO-HEIR / MARRIED DAUGHTER NO-OBJECTION & SECTION 52 NOTICE REPLY
(To be filed if one heir waives share or confirms notice service under Section 52 ALRR)
Before the Circle Officer, ${revenueCircle} Revenue Circle
In Re: Mutation Case No. [Dharitree Case No.] / Notice under Section 52 ALRR, 1886

I, [Name of Co-Heir / Married Daughter], aged [Age] years, daughter/son of Late ${deceasedName}, acknowledge receipt of the Section 52 General Notice dated [Notice Date] regarding ${dagNo}, ${pattaNo} at Village ${village}, Mouza ${mouza}.
I confirm that I am a lawful heir of the deceased Pattadar and state that I have [NO OBJECTION to recording my name jointly with my co-heirs / voluntarily consented to separate partition / confirm the attached Registered Will dated (Date)]. I request the Circle Officer to pass the Mutation Order in Dharitree accordingly.

Signature of Co-Heir / Noticee: ___________________ | Date: [DD-MM-YYYY]`;

  const dharitreeChecklistText = `ASSAM DHARITREE & SEWA SETU SUCCESSION MUTATION CHECKLIST (10 DOCUMENTS)
1. Death Certificate of the recorded Pattadar issued by the Registrar of Births & Deaths / GMC / Municipality.
2. Next of Kin (NOK) Certificate applied through Sewa Setu (sewasetu.assam.gov.in) and issued by Deputy Commissioner / Circle Officer.
3. Legal Heir Succession Affidavit printed on Rs. 100 Assam e-Stamp / Non-Judicial Stamp Paper, sworn before Notary or Executive Magistrate.
4. Latest Certified Jamabandi Copy (Record of Rights) and Chitha Copy downloaded from Dharitree / ILRMS.
5. Up-to-date Land Revenue Payment Receipt (Khajana / Touzi receipt) showing zero arrears.
6. Self-attested Aadhaar Card, PAN Card, or Voter ID of the applicant and all surviving legal heirs (including married daughters).
7. Proof of relationship (Birth Certificate, HSLC Admit Card, Ration Card, or Marriage Certificate for married daughters).
8. Registered Will copy (only if applying for Will-based Office Mutation on Periodic Myadi Patta).
9. Mission Basundhara Conversion Application / Order (mandatory if land is Annual / Eksona Patta before any sale or Will transfer).
10. Two local neighbor witness statements and spot photos for Lat Mandal physical verification during Field Mutation.`;

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>ASSAM LAND &amp; REVENUE REGULATION, 1886 • SS. 50-53 &amp; HSA 1956</span>
          </div>

          {/* Strict Single H1 Tag (43 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Assam Jamabandi Succession Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a free Assam Jamabandi mutation affidavit format for Dharitree and Sewa Setu.
            Check Periodic Myadi Patta vs Annual Eksona Patta rules and copy our Circle Officer
            Section 52 notice draft.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#jamabandi-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Affidavit Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Assam Legal Will</span>
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Assam Revenue Counsel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">ALRR ss. 50-53</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DHARITREE FIELD MUTATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Myadi Patta</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HERITABLE &amp; TRANSFERABLE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Eksona Patta</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC 11 CONVERSION RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹100 e-Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ASSAM ART. 4 AFFIDAVIT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Builder)
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
                <span>Assam Land Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Assam Land &amp; Revenue Regulation 1886 ss. 9, 11, 50-53A, Assam Land
                Records Manual Rule 215, Stamp Act Art. 4, and HSA 1956.
              </p>
            </div>

            {/* Document Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Circle Office Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fill your Dag, Patta, and heir names below. Then copy the clean affidavit for Sewa
                Setu and your Lat Mandal check.
              </p>
              <a
                href="#jamabandi-affidavit-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Affidavit Draft</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE BUILDER
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/assam-jamabandi-succession-affidavit-format-og.jpg"
                  alt="Assam Jamabandi Succession Affidavit Format for Dharitree Field Mutation"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Assam Jamabandi Mutation Format: Dharitree Field Check, Periodic vs Annual Patta
                    &amp; Circle Officer Notice Guide
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: ASSAM JAMABANDI MUTATION ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Myadi vs Eksona Rule:</strong> Only Periodic Khiraj (Myadi Patta) land
                    can be freely sold or passed by a Will. Annual (Eksona) Patta under Section 11
                    must be converted on Mission Basundhara first.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Field vs Office Mutation:</strong> Uncontested village heir claims go via
                    Lat Mandal Field Mutation (Section 53A). Urban Guwahati plots, Wills, and
                    disputes go to the Circle Officer (Sections 50 to 53).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Assam ₹100 e-Stamp Rule:</strong> Print the sworn heir affidavit on ₹100
                    non-judicial stamp paper under Article 4 (Assam Amendment) and sign before a
                    Notary or Executive Magistrate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Include Married Daughters:</strong> Every living spouse, son, married
                    daughter, and branch of a predeceased child must appear in your affidavit table.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Probate Needed in Assam:</strong> Assam sits outside Presidency
                    Towns, so heirs can submit a valid Will directly to the Circle Officer without
                    court probate.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE MAIN H2 <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Assam Jamabandi &amp; Dharitree Mutation Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a landholder (<em>pattadar</em>) passes away in Assam, the heirs must update
                  their names in the village land books. This step is called <strong>Namjari</strong>{" "}
                  or <strong>succession mutation</strong>. Today, all updates run through the{" "}
                  <strong>Dharitree (ILRMS)</strong> land system and the{" "}
                  <strong>Sewa Setu</strong> online portal.
                </p>
                <p>
                  Two core records track land in Assam. First, the <strong>Chitha</strong> is the
                  primary field book that lists every plot by <strong>Dag Number</strong>, land use,
                  and actual occupant. Second, the <strong>Jamabandi</strong> is the Record of Rights
                  that groups plots under a <strong>Patta Number</strong> with each owner&apos;s
                  name and tax share.
                </p>
                <p>
                  Chapter IV of the <strong>Assam Land and Revenue Regulation, 1886 (ALRR)</strong>{" "}
                  sets the law for every mutation file. Under <strong>Section 50</strong>, any person
                  who gets land by death or transfer must report it to the Circle Officer within six
                  months. Under <strong>Section 52</strong>, the officer sends a public notice so
                  co-owners can object.
                </p>
                <p>
                  Under <strong>Section 53</strong> and <strong>Section 53A</strong>, the{" "}
                  <strong>Lat Mandal</strong> (village revenue staff) checks actual possession on
                  the plot. If nobody objects, the Circle Officer passes a mutation order and updates
                  the Dharitree Jamabandi. A clean <strong>Assam Jamabandi mutation affidavit</strong>{" "}
                  prevents queries in Guwahati, Dibrugarh, Jorhat, and Silchar circles.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DHARITREE AFFIDAVIT & PATTA CHECKER */}
            <section id="interactive-patta-builder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE DHARITREE BUILDER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Dharitree Affidavit &amp; Patta Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your district, Patta type, and legal heirs below. This tool checks if your land
                can pass by Will, picks Field vs Office Mutation, and builds your ready affidavit.
              </p>

              {/* Builder Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Patta Type, Mutation Route, Personal Law */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Patta Classification</span>
                    </label>
                    <select
                      value={pattaType}
                      onChange={(e) => setPattaType(e.target.value as PattaTypeKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(PATTA_CONFIG).map(([key, cfg]) => (
                        <option key={key} value={key}>
                          {cfg.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Mutation Route</span>
                    </label>
                    <select
                      value={mutationRoute}
                      onChange={(e) => setMutationRoute(e.target.value as MutationRouteKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="field_uncontested">Field Mutation (No Will / Uncontested)</option>
                      <option value="office_will">Office Mutation (Registered / Valid Will)</option>
                      <option value="office_contested">Office Mutation (Contested / Urban Plot)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Succession Law</span>
                    </label>
                    <select
                      value={personalLaw}
                      onChange={(e) => setPersonalLaw(e.target.value as PersonalLawKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(PERSONAL_LAWS).map(([key, law]) => (
                        <option key={key} value={key}>
                          {law.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: District, Circle, Mouza, Village */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Assam District</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {ASSAM_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Revenue Circle
                    </label>
                    <input
                      type="text"
                      value={revenueCircle}
                      onChange={(e) => setRevenueCircle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Dispur / Guwahati"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mouza Name
                    </label>
                    <input
                      type="text"
                      value={mouza}
                      onChange={(e) => setMouza(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Beltola / Ulubari"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Revenue Village
                    </label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Hengrabari"
                    />
                  </div>
                </div>

                {/* Row 3: Patta No, Dag No, Area */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Patta Number
                    </label>
                    <input
                      type="text"
                      value={pattaNo}
                      onChange={(e) => setPattaNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Dag Number
                    </label>
                    <input
                      type="text"
                      value={dagNo}
                      onChange={(e) => setDagNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Land Area (Bigha/Katha/Lecha)
                    </label>
                    <input
                      type="text"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Row 4: Deceased & Applicant */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Late Pattadar Name
                    </label>
                    <input
                      type="text"
                      value={deceasedName}
                      onChange={(e) => setDeceasedName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Date of Death
                    </label>
                    <input
                      type="text"
                      value={deathDate}
                      onChange={(e) => setDeathDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Applicant (Deponent) Name
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Editable Heirs Rows */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Legal Heirs in Jamabandi File ({heirs.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={addHeirRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Heir Row</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {heirs.map((row, idx) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                      >
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => updateHeirRow(row.id, "name", e.target.value)}
                            aria-label={`Heir ${idx + 1} Name`}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={row.age}
                            onChange={(e) => updateHeirRow(row.id, "age", e.target.value)}
                            aria-label={`Heir ${idx + 1} Age`}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={row.relation}
                            onChange={(e) => updateHeirRow(row.id, "relation", e.target.value)}
                            aria-label={`Heir ${idx + 1} Relation`}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            value={row.status}
                            onChange={(e) => updateHeirRow(row.id, "status", e.target.value)}
                            aria-label={`Heir ${idx + 1} Status`}
                            className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-900"
                          >
                            <option value="Living">Living</option>
                            <option value="Married & Living">Married</option>
                            <option value="Predeceased">Predeceased</option>
                            <option value="Minor">Minor</option>
                          </select>
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeHeirRow(row.id)}
                            aria-label={`Remove heir ${idx + 1}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Computed Summary Box (Brand Navy) */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        DHARITREE ELIGIBILITY &amp; PATTA REPORT ({revenueCircle.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {currentPatta.timeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Will &amp; Transfer Right
                      </div>
                      <div className="text-base sm:text-lg font-black text-white mt-1">
                        {currentPatta.canWill}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentPatta.statutorySection}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Affidavit Stamp Value
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        ₹100 Assam e-Stamp
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Art. 4, Indian Stamp (Assam) Act
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Succession Rule Used
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                        {currentLaw.statute}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        All {heirs.length} listed heirs populate below
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white">Circle Office Guidance:</div>
                    <p className="leading-relaxed text-[11px]">
                      {currentPatta.routeAdvice}{" "}
                      {pattaType === "annual_eksona" && mutationRoute === "office_will"
                        ? "Warning: A Will bequest on an Annual Eksona Patta will face objection under Section 11 unless converted to Periodic Myadi Patta first."
                        : currentLaw.heirSummary}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: PATTA CLASSIFICATION TABLE (MANDATORY ASSET) */}
            <section id="patta-classification-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>ASSAM LAND TENURE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Patta Classification Table: Myadi vs Eksona
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Most legal sites treat every Assam Patta the same. Under the 1886 Regulation, your
                right to inherit, sell, or write a Will depends on the exact Patta class:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Patta Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Periodic Khiraj (Myadi)</th>
                      <th className="py-3.5 px-4">Annual Patta (Eksona)</th>
                      <th className="py-3.5 px-4">Chapter X Tribal Belt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Governing Section</td>
                      <td className="py-3 px-4 font-bold text-slate-900">Section 9, ALRR 1886</td>
                      <td className="py-3 px-4">Section 11, ALRR 1886</td>
                      <td className="py-3 px-4">Chapter X (ss. 160-171)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Holder Legal Status</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Full Land-Holder (Permanent)
                      </td>
                      <td className="py-3 px-4 text-amber-800 font-semibold">
                        Settlement-Holder (1-Year Lease)
                      </td>
                      <td className="py-3 px-4">Protected Class Occupant</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Inheritable by Heirs?</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Yes (Direct Jamabandi entry)
                      </td>
                      <td className="py-3 px-4">Limited yearly heir entry only</td>
                      <td className="py-3 px-4">Yes, within protected heirs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Can Be Willed?</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        YES (Fully valid by Will)
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-700">
                        NO (Barred until converted)
                      </td>
                      <td className="py-3 px-4 text-amber-800 font-semibold">
                        Only to protected class
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Sale or Bank Mortgage</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Allowed freely</td>
                      <td className="py-3 px-4 font-bold text-rose-700">Strictly barred</td>
                      <td className="py-3 px-4">Restricted (DC sanction)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Dharitree Portal Step</td>
                      <td className="py-3 px-4">Field or Office Mutation</td>
                      <td className="py-3 px-4">Mission Basundhara AP-to-PP</td>
                      <td className="py-3 px-4">CO check + Tribal proof</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: PERIODIC VS ANNUAL PATTA LEGAL STATUS GUIDE */}
            <section id="periodic-vs-annual-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT: SECTION 9 VS SECTION 11</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Periodic vs Annual Patta Legal Status Guide
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many families in Guwahati, Dibrugarh, and Jorhat get their mutation file rejected
                  because they do not check whether their ancestor held a{" "}
                  <strong>Periodic Patta</strong> or an <strong>Annual Patta</strong>. Both look
                  similar in old paper records, yet the law treats them very differently.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-700">
                      Section 9 ALRR 1886
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                      Transferable
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Periodic Khiraj (Myadi Patta) Rights
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Myadi Patta holder is a true <em>land-holder</em> under Section 9. The land
                    carries permanent, heritable, and transferable title. Heirs can mutate it
                    directly on Dharitree, sell plots, take bank loans, or pass it by a registered
                    Will.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-rose-700">
                      Section 11 ALRR 1886
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[11px] font-bold">
                      Non-Transferable
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Annual Patta (Eksona Patta) Restrictions
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An Eksona Patta is only a one-year temporary lease under Section 11. The
                    occupant is a <em>settlement-holder</em>, not a full owner. You cannot transfer
                    Annual Patta land by Sale Deed, Gift Deed, or Will. Only direct heir succession
                    for the current year or government AP-to-PP conversion is valid.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Mission Basundhara Conversion Fix:</strong> If your late father held
                  Annual (Eksona) Patta land, first file for succession entry or apply on{" "}
                  <strong>Mission Basundhara</strong> for AP-to-PP (Annual to Periodic Patta)
                  conversion. Once you pay the conversion premium and receive a Periodic Myadi
                  Patta, full sale and Will rights unlock right away.
                </span>
              </div>
            </section>

            {/* SECTION 5: DHARITREE AFFIDAVIT FORMAT (MANDATORY ASSET) */}
            <section
              id="jamabandi-affidavit-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DHARITREE &amp; SEWA SETU SWORN DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Assam Jamabandi Field Mutation Affidavit Format
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy the sworn draft below. All fields you entered in Section 2 update live inside
                this affidavit. Print it on ₹100 Assam e-Stamp paper before signing at a Notary.
              </p>

              {/* Main Affidavit Draft Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      ASSAM JAMABANDI SUCCESSION AFFIDAVIT (ENGLISH)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(affidavitTemplateText, setCopiedAffidavit)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedAffidavit ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Affidavit!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Affidavit Format</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[560px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {affidavitTemplateText}
                </div>
                <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <span>Compliant with ALRR 1886 ss. 50-53 &amp; Stamp Act Art. 4 (Assam)</span>
                  <button
                    type="button"
                    onClick={() => copyText(affidavitTemplateText, setCopiedAffidavit)}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>

              {/* Notary & Lat Mandal Witness Block */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Stamp className="w-4 h-4" />
                    <span>NOTARY SEAL &amp; LAT MANDAL WITNESS BLOCK</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(notaryAndWitnessBoxText, setCopiedNotary)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedNotary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Witness Box Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Witness Box</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {notaryAndWitnessBoxText}
                </div>
              </div>
            </section>

            {/* SECTION 6: CIRCLE OFFICER GUIDE BOX & SECTION 52 NOTICE TEMPLATE */}
            <section id="circle-officer-guide" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCheck className="w-4 h-4" />
                <span>CIRCLE OFFICER GUIDE BOX &amp; NOTICE DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Circle Officer Guide &amp; Section 52 Notice Draft
              </h3>

              {/* Circle Officer Guide Box */}
              <div className="rounded-3xl bg-white border border-[#172228]/15 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                    CIRCLE OFFICER FIELD VS OFFICE MUTATION GUIDE BOX
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[11px] font-bold">
                    ALRR ss. 50, 52, 53 &amp; 53A
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Field Mutation (Section 53A)
                    </div>
                    <p>
                      Used for clear, uncontested rural succession where all heirs agree. The Lat
                      Mandal visits the Dag plot, checks possession, talks to neighbor pattadars, and
                      updates the Chitha before the Circle Officer signs off.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-slate-200/80 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-sm">
                      Office Mutation (Sections 50 to 53)
                    </div>
                    <p>
                      Used in Guwahati Municipal (GMC) urban circles, Will-based transfers, or when a
                      co-pattadar objects. The Circle Officer issues a mandatory{" "}
                      <strong>Section 52 General Notice</strong> (15 to 30 days) and passes a formal
                      order after hearing parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Circle Officer Notice Template Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <FileText className="w-4 h-4" />
                    <span>CIRCLE OFFICER APPLICATION &amp; SECTION 52 NOTICE TEMPLATE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(circleOfficerNoticeTemplate, setCopiedCoNotice)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedCoNotice ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Notice Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Circle Officer Draft</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {circleOfficerNoticeTemplate}
                </div>
              </div>
            </section>

            {/* SECTION 7: DHARITREE & SEWA SETU FILING SOP */}
            <section id="dharitree-filing-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>STEP-BY-STEP PORTAL WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Dharitree &amp; Sewa Setu Filing Steps &amp; Checklist
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Download Certified Jamabandi & Chitha",
                    desc: "Check your Dag No., Patta No., and Patta Type (Myadi vs Eksona) on Dharitree / ILRMS. Clear any pending Khajana land revenue dues.",
                  },
                  {
                    step: 2,
                    title: "Get Next of Kin (NOK) Certificate on Sewa Setu",
                    desc: "Apply on sewasetu.assam.gov.in for the Next of Kin certificate with the death certificate, Aadhaar cards, and family proof.",
                  },
                  {
                    step: 3,
                    title: "Sign Sworn Affidavit on ₹100 e-Stamp Paper",
                    desc: "Print our Assam Jamabandi affidavit on ₹100 stamp paper. Sign it before a Notary or Executive Magistrate with two local witnesses.",
                  },
                  {
                    step: 4,
                    title: "Submit Mutation Case on Sewa Setu / Basundhara",
                    desc: "Upload the affidavit, NOK certificate, death certificate, and tax receipt. Your file automatically enters the Circle Officer Dharitree queue.",
                  },
                  {
                    step: 5,
                    title: "Lat Mandal Inspection & Section 52 Notice",
                    desc: "The Lat Mandal checks plot possession on site and records neighbor statements. For Office Mutation, the Circle Officer runs a 15-to-30 day Section 52 notice.",
                  },
                  {
                    step: 6,
                    title: "Approve Order & Print Updated Jamabandi",
                    desc: "Once the Circle Officer passes the order, the Jamabandi updates in Dharitree. Download the new Record of Rights showing all heir names.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist Copy Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Complete Circle Office Mutation Checklist (10 Papers)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keep all 10 scans ready before uploading to Sewa Setu or visiting the Lat Mandal.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(dharitreeChecklistText, setCopiedChecklist)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Checklist Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 10-Item Checklist</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* DUAL CONVERSION CTA BANNER INSIDE MAIN FLOW */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                    <Lock className="w-3 h-3 text-[#C65378]" />
                    <span>ASSAM REVENUE &amp; WILL DESK</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Need Help with Dharitree Mutation or a Registered Assam Will?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Consult our Assam revenue counsel for Annual-to-Periodic Patta conversion,
                    Section 52 objection defense, or draft a registered Will on Panjeeyan for Myadi
                    Patta land.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Consult Assam Revenue Counsel</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Draft a Legal Will Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 8: REAL CASE STUDIES */}
            <section id="assam-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL ASSAM SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Real Case Studies: Guwahati, Dibrugarh &amp; Silchar
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: DISPUR CIRCLE, GUWAHATI</span>
                    <span className="text-slate-500 font-semibold">Periodic Myadi Patta</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Mutating Myadi Patta Plot After Pattadar Death with Married Sisters
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers in Beltola tried to mutate their late father&apos;s Periodic Khiraj
                    Patta without listing their married sister. The Circle Officer paused the file
                    during the Section 52 notice. After filing our revised affidavit naming all
                    Class I heirs and the sister&apos;s consent, Dharitree updated cleanly in 28
                    days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: DIBRUGARH REVENUE CIRCLE</span>
                    <span className="text-slate-500 font-semibold">Annual Eksona Patta</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Converting Grandfather&apos;s Eksona Land Before Family Sale
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Heirs tried to transfer land based on an unregistered Will covering an Annual
                    Patta in Dibrugarh. The Circle Officer rejected the Will transfer under Section
                    11 ALRR. The family first logged inheritance possession, converted Eksona Patta
                    to Periodic Myadi Patta via Mission Basundhara, and secured clean title.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: SILCHAR, CACHAR</span>
                    <span className="text-slate-500 font-semibold">Predeceased Heir Branch</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Adding Widow &amp; Minor Grandson to Jamabandi Field Mutation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    During Lat Mandal verification in Silchar, neighbors reported that a predeceased
                    son had left a wife and young child. Updating the affidavit table with their
                    names and HSLC/Birth proof avoided an objection suit and completed the Chitha
                    entry.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL ASSAM PORTALS &amp; LAWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Official Assam Portals &amp; Legal Citations
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Assam Land and Revenue Regulation, 1886 (ss. 9, 11, 50-53A):</strong>{" "}
                    Defines Periodic land-holder rights, Annual settlement-holder limits, mandatory
                    mutation reporting, Section 52 notice, and field mutation.
                  </li>
                  <li>
                    <strong>Assam Land Records Manual (Rule 215):</strong> Sets Lat Mandal local
                    field verification rules, Chitha updates, and notice service steps.
                  </li>
                  <li>
                    <strong>Indian Stamp Act, 1899 (Assam Amendment Art. 4):</strong> Sets the ₹100
                    non-judicial stamp duty rate on sworn affidavits across Assam.
                  </li>
                  <li>
                    <strong>Hindu Succession Act, 1956 &amp; Indian Succession Act, 1925:</strong>{" "}
                    Establishes equal Class I heir shares and exempts Assam Wills from mandatory
                    Section 213 presidency-town probate.
                  </li>
                </ul>

                {/* Verified 200 OK Official Portals */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://sewasetu.assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>Sewa Setu Assam</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ilrms.assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Dharitree (ILRMS) Assam</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://basundhara.assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Mission Basundhara</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://landrevenue.assam.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Assam Land Revenue Dept</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>India Code Statutes</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Internal Hub & Spoke Links (Verified 200 OK Routes) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    All Legal Templates Hub
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Assam Revenue Counsel Desk
                  </Link>
                  <Link
                    href="/locations/assam"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Will Drafting in Assam
                  </Link>
                  <Link
                    href="/locations/dispur"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Dispur &amp; GMDA Succession Guide
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Property Mutation Service
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Legal Heir Certificate Help
                  </Link>
                  <Link
                    href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All-India Legal Heir Affidavit
                  </Link>
                  <Link
                    href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Heir vs Succession Tool
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: FAQS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Frequently Asked Questions: Assam Mutation
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
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

            {/* Plain-English Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will protects your Periodic Myadi Patta land in Assam. Because probate is
                  not mandatory in Assam, heirs can apply straight to the Circle Officer.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Check Your Patta Class</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Check whether your Jamabandi says Periodic Khiraj or Annual Patta. Convert any
                  Eksona Patta on Mission Basundhara before selling or writing a Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers review your Dag, Patta, and Next of Kin records. We draft error-free
                  affidavits, Section 52 replies, and registered Assam Wills.
                </p>
              </div>
            </div>
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
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises families across Assam and India on Dharitree Jamabandi mutations, Myadi
                Patta title audits, and succession Wills at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reviewed Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - ASSAM REVENUE COUNSEL (Primary Conversion /contact) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Landmark className="w-3 h-3 text-[#C65378]" />
                  <span>ASSAM REVENUE COUNSEL DESK</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Stuck with Dharitree Mutation or Eksona Conversion?
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Speak with our estate lawyers for Circle Officer Section 52 notices, Annual-to-Myadi
                  conversions, and custom Assam succession affidavits.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Consult Assam Revenue Counsel</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guwahati &amp; All-Assam Circle Coverage</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - DRAFT WILL (/start) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  <span>SECURE MYADI PATTA TITLE</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Protect Periodic Patta Land with a Registered Will
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In Assam, probate is not mandatory under Section 213 ISA. Draft your Will online
                  and register it on Panjeeyan to prevent Circle Office delays.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <Link
                  href="/services/property-mutation-dakhil-kharij-service"
                  className="block text-[11px] font-bold text-[#C65378] hover:underline"
                >
                  Explore Land Mutation Service
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Assam Families Use This Draft
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>ALRR ss. 50-53 Ready:</strong> Fits Circle Officer and Lat Mandal checks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Myadi vs Eksona Clarity:</strong> Stops invalid Annual Patta Will claims.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>₹100 Assam Stamp Compliant:</strong> Matches Article 4 state stamp rules.
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
          href="#jamabandi-affidavit-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Affidavit Draft</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Consult Counsel</span>
        </Link>
      </div>
    </div>
  );
}
