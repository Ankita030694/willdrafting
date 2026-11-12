"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Users,
  FileText,
  FileSpreadsheet,
  Calculator,
  Stamp,
  Plus,
  Trash2,
  ClipboardCheck,
  GitBranch,
  Languages,
  Gavel,
} from "lucide-react";

// Table of Contents Items (<= 70 chars, 0 em-dashes, exact matching section IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Odisha Legal Heir & 2019 Rules" },
  { id: "interactive-odisha-builder", label: "2. Free Odisha Affidavit Builder" },
  { id: "bilingual-affidavit-template", label: "3. English & Odia Draft Formats" },
  { id: "no-civil-suit-undertaking", label: "4. No Civil Suit Pending Box" },
  { id: "stamp-notary-family-grid", label: "5. Odisha Stamp Value & Pedigree" },
  { id: "form2-vs-ror-comparison", label: "6. Form No. II vs RoR vs Court" },
  { id: "tahasildar-hearing-checklist", label: "7. Tahasildar Checklist & SOP" },
  { id: "mother-succession-leasehold", label: "8. Mother Estate & GA/BDA Rules" },
  { id: "odisha-case-studies", label: "9. Real Cases: Bhubaneswar & Cuttack" },
  { id: "statutory-citations", label: "10. Official Portals & Law Links" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
];

const ODISHA_DISTRICTS = [
  "Khordha (Bhubaneswar)",
  "Cuttack",
  "Puri",
  "Sambalpur",
  "Sundargarh (Rourkela)",
  "Ganjam (Berhampur)",
  "Balasore",
  "Mayurbhanj",
  "Jajpur",
  "Kendrapara",
  "Jagatsinghpur",
  "Bhadrak",
  "Angul",
  "Dhenkanal",
  "Koraput",
  "Jharsuguda",
  "Bargarh",
  "Kalahandi",
];

const PERSONAL_LAWS: Record<
  "hindu_father" | "hindu_mother" | "christian" | "muslim",
  {
    label: string;
    statute: string;
    spouseRule: string;
    childrenRule: string;
    note: string;
  }
> = {
  hindu_father: {
    label: "Hindu / Sikh / Jain (Father / Male Estate)",
    statute: "Hindu Succession Act, 1956 (Section 8 Class I)",
    spouseRule: "Widow takes one equal share alongside children and living mother.",
    childrenRule:
      "Sons, married or unmarried daughters, and the mother take equal shares. Any predeceased child branch takes its branch share.",
    note: "Under Vineeta Sharma (2020), married daughters hold full equal birth rights.",
  },
  hindu_mother: {
    label: "Hindu / Sikh / Jain (Mother / Female Estate)",
    statute: "Hindu Succession Act, 1956 (Section 15)",
    spouseRule: "Surviving husband takes one equal share with all sons and daughters.",
    childrenRule:
      "Under Section 15(1), sons, married daughters, and husband share equally. Under Section 15(2), inherited parental land reverts if no child lives.",
    note: "State whether the plot was self-acquired by the mother or inherited.",
  },
  christian: {
    label: "Christian (Indian Succession Act)",
    statute: "Indian Succession Act, 1925 (Part V, ss. 32 to 48)",
    spouseRule: "Surviving spouse takes one-third share with children, or half without children.",
    childrenRule: "Sons and daughters split the remaining estate in equal shares.",
    note: "Attach church marriage or baptism records if old Ration Cards miss links.",
  },
  muslim: {
    label: "Muslim Personal Law (Shariat)",
    statute: "Muslim Personal Law (Shariat) Act, 1937",
    spouseRule:
      "Husband takes 1/4th with kids or 1/2 with none. Wife takes 1/8th with kids or 1/4th with none.",
    childrenRule:
      "Sons and daughters take fixed shares, with daughters taking half of a son's share.",
    note: "Include living parents and every child on the RI genealogical roll.",
  },
};

const FILING_PURPOSE_CONFIG: Record<
  "ror_mutation" | "misc_form_2" | "ga_bda_lease" | "bank_pension",
  {
    label: string;
    stampValue: string;
    portalFee: string;
    noticePeriod: string;
    timeline: string;
    summary: string;
  }
> = {
  ror_mutation: {
    label: "Bhulekh RoR / Patta Mutation (1958 Act)",
    stampValue: "₹10 Min (₹20 / ₹50 Local e-Stamp)",
    portalFee: "₹30 to ₹50 User Fee + ₹20/Notice",
    noticePeriod: "30-Day Form No. 3 Proclamation",
    timeline: "60 to 90 Working Days",
    summary:
      "Updates deceased Rayat Column 2 on Bhulekh Odisha under Section 15 of the 1958 Act and Rule 34 of the Mutation Manual.",
  },
  misc_form_2: {
    label: "Form No. II Legal Heir Certificate (2019 Rules)",
    stampValue: "₹10 Min (Sch. I-A Art. 4)",
    portalFee: "₹0 Online Portal Fee (Nominal CSC Fee)",
    noticePeriod: "15-Day RI Local Proclamation",
    timeline: "30 Days (ORTPSA Target)",
    summary:
      "Issued by the Tahasildar in Form No. II under Rules 3 and 4 of the 2019 Rules for undisputed pension, arrears, and official records.",
  },
  ga_bda_lease: {
    label: "Bhubaneswar GA Dept / BDA / CDA Lease Transfer",
    stampValue: "₹20 to ₹100 Non-Judicial Stamp",
    portalFee: "Dept Substitution Charges Apply",
    noticePeriod: "30-Day Public Press Notice",
    timeline: "45 to 90 Days",
    summary:
      "Needed for 99-year GA leasehold plots in Bhubaneswar or BDA/CDA flats alongside Form No. II and a notarized no-suit indemnity bond.",
  },
  bank_pension: {
    label: "Family Pension, Gratuity & Bank Settlement",
    stampValue: "₹0 Pension Exempt (₹10 Bank Bond)",
    portalFee: "₹0 on e-District Odisha",
    noticePeriod: "15-Day RI Verification",
    timeline: "21 to 30 Days",
    summary:
      "Under Odisha Stamp Act Article 4, affidavits used solely to claim family pension or court filings carry zero stamp duty.",
  },
};

const FAQS = [
  {
    q: "Why is the no civil suit pending line needed in an Odisha legal heir affidavit?",
    a: "Under the Odisha Miscellaneous Certificates Rules, 2019, a Tahasildar can issue Form No. II only in undisputed cases. If a civil or partition suit is pending, the revenue officer lacks power to decide title and will reject or cancel the file.",
  },
  {
    q: "What stamp paper value is required for a legal heir affidavit in Odisha?",
    a: "Under Schedule I-A, Article 4 of the Indian Stamp Act as amended in Odisha, the base stamp duty for an affidavit is Rs. 10. Many local notary desks in Bhubaneswar and Cuttack use Rs. 10 or Rs. 20 stamp paper, while pension and court affidavits are exempt.",
  },
  {
    q: "Do I need both English and Odia drafts for Bhubaneswar Tahasil RoR mutation?",
    a: "Online portals accept English PDFs, while the local Revenue Inspector (RI) and village record clerks check facts faster in Odia. Filing both English and Odia declarations stops clerk queries during spot inquiry.",
  },
  {
    q: "How do I update Bhulekh RoR after my mother's death in Odisha?",
    a: "Collect the death certificate, Form No. II Legal Heir Certificate, Hal Khatiyan copy, and up-to-date Khajana receipt. Apply online on the Odisha Revenue Services portal so the Tahasildar opens a mutation case and issues a Form 3 notice.",
  },
  {
    q: "Who are the legal heirs of a deceased Hindu mother under Section 15 HSA?",
    a: "Under Section 15(1) of the Hindu Succession Act, 1956, a Hindu woman's self-acquired property passes equally to her sons, daughters (including married daughters), and husband. Property inherited from her parents or in-laws follows Section 15(2) if she leaves no children.",
  },
  {
    q: "Can a Form No. II Legal Heir Certificate alone divide disputed ancestral land?",
    a: "No. Form No. II under the 2019 Rules identifies surviving family members for pensions, arrears, bank dues, and undisputed records. It does not decide disputed title or replace a registered partition deed or civil court decree.",
  },
  {
    q: "What can I do if the Tahasildar rejects my legal heir or RoR application?",
    a: "If the Tahasildar rejects Form No. II under the 2019 Rules or refuses RoR mutation under Section 15 of the Odisha Survey and Settlement Act, 1958, you can file an appeal before the Sub-Collector within 30 days of the order.",
  },
  {
    q: "Is probate of a Will compulsory in Odisha for Bhulekh RoR mutation?",
    a: "No. Under Section 213 and Section 57 of the Indian Succession Act, 1925, probate is not compulsory in Odisha. Heirs can present a valid registered Will and death certificate directly before the Tahasildar for RoR name transfer.",
  },
];

interface OdishaHeirRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: "Living" | "Married & Living" | "Predeceased" | "Minor";
  shareNote: string;
}

export default function OdishaLegalHeirClient() {
  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [templateLang, setTemplateLang] = useState<"both" | "en" | "or">("both");
  const [copiedEnglish, setCopiedEnglish] = useState(false);
  const [copiedOdia, setCopiedOdia] = useState(false);
  const [copiedBilingual, setCopiedBilingual] = useState(false);
  const [copiedNoSuitBox, setCopiedNoSuitBox] = useState(false);
  const [copiedNotary, setCopiedNotary] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Odisha Affidavit & Pedigree Builder State
  const [purpose, setPurpose] = useState<
    "ror_mutation" | "misc_form_2" | "ga_bda_lease" | "bank_pension"
  >("ror_mutation");
  const [personalLaw, setPersonalLaw] = useState<
    "hindu_mother" | "hindu_father" | "christian" | "muslim"
  >("hindu_mother");
  const [district, setDistrict] = useState<string>("Khordha (Bhubaneswar)");
  const [tahasil, setTahasil] = useState<string>("Bhubaneswar");
  const [mouza, setMouza] = useState<string>("Patia");
  const [khataPlot, setKhataPlot] = useState<string>("Hal Khata No. 412 / Plot No. 1085");
  const [deceasedName, setDeceasedName] = useState<string>("Late Smt. Saraswati Mohanty");
  const [deathDate, setDeathDate] = useState<string>("18-09-2026");
  const [applicantName, setApplicantName] = useState<string>("Subhransu Sekhar Mohanty");
  const [civilSuitStatus, setCivilSuitStatus] = useState<"none" | "pending">("none");

  const [heirs, setHeirs] = useState<OdishaHeirRow[]>([
    {
      id: 1,
      name: "Sri Prafulla Kumar Mohanty",
      age: "69",
      relation: "Husband (Widower)",
      status: "Living",
      shareNote: "Sec. 15(1) Equal Share",
    },
    {
      id: 2,
      name: "Sri Subhransu Sekhar Mohanty",
      age: "41",
      relation: "Son",
      status: "Living",
      shareNote: "Sec. 15(1) Equal Share",
    },
    {
      id: 3,
      name: "Smt. Lopamudra Patnaik",
      age: "37",
      relation: "Married Daughter",
      status: "Married & Living",
      shareNote: "Equal Legal Heir",
    },
  ]);

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Full Name of Legal Heir",
        age: "34",
        relation: "Son / Daughter / Spouse",
        status: "Living",
        shareNote: "Eligible Heir",
      },
    ]);
  };

  const updateHeirRow = (id: number, field: keyof OdishaHeirRow, value: string) => {
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

  const currentPurpose = FILING_PURPOSE_CONFIG[purpose];
  const currentLaw = PERSONAL_LAWS[personalLaw];

  const heirRowsTextEn = heirs
    .map(
      (h, idx) =>
        `${idx + 1}. ${h.name} | Age: ${h.age} | Relation: ${h.relation} | Status: ${h.status} | Legal Basis: ${h.shareNote}`
    )
    .join("\n");

  const englishAffidavitDraft = `AFFIDAVIT OF LEGAL HEIRS & NO-PARTITION-SUIT DECLARATION
(Under Odisha Miscellaneous Certificates Rules, 2019 & Odisha Survey and Settlement Act, 1958)
[Print on Rs. 10/- or Rs. 20/- Odisha Non-Judicial Stamp Paper / e-Stamp]

BEFORE THE TAHASILDAR / ADDITIONAL TAHASILDAR, ${tahasil.toUpperCase()} TAHASIL,
DISTRICT ${district.toUpperCase()}, ODISHA

I, ${applicantName}, aged about [Age] years, son/daughter/spouse of [Father / Husband Name], permanent resident of Mouza / Ward ${mouza}, PS [Police Station], Tahasil ${tahasil}, District ${district}, Odisha (PIN: [75XXXX]), Aadhaar No: [XXXX-XXXX-XXXX], do hereby solemnly affirm and state on oath as follows:

1. DECEASED RECORDED TENANT (RAYAT) & DEATH PARTICULARS:
That ${deceasedName} was a permanent resident of Mouza ${mouza}, Tahasil ${tahasil}, District ${district}, Odisha, and the recorded owner of the land / residential property under ${khataPlot}. The said deceased passed away intestate (without leaving a registered Will) on ${deathDate} at [Place of Death], as proved by Death Certificate Reg. No. [Reg. No.] dated [Date] issued by [BMC / Municipality / Gram Panchayat].

2. COMPLETE LIST OF SURVIVING LEGAL HEIRS (${currentLaw.statute}):
That at the time of death, the deceased left behind ONLY the following living legal heirs (expressly including spouse, sons, married daughters, and branches of any predeceased child):
${heirRowsTextEn}

3. MANDATORY NO CIVIL SUIT / NO PARTITION SUIT DECLARATION (2019 RULES):
I solemnly affirm that there is NO partition suit, title suit, probate case, or civil dispute pending before any Civil Court or Revenue Authority regarding the legal heirship, succession, or immovable property of ${deceasedName}. Apart from the persons listed in Paragraph 2, the deceased left no other spouse, child, adopted child, or Class I heir.

4. PURPOSE OF FILING (FORM NO. II & BHULEKH ROR MUTATION):
This declaration is submitted before the Tahasildar, ${tahasil} Tahasil, through the Odisha e-District / Odisha Revenue Services portal for: (a) issuance of a Legal Heir Certificate in Form No. II under Rules 3 and 4 of the Odisha Miscellaneous Certificates Rules, 2019, and (b) mutation and correction of the Record of Rights (RoR / Khatiyan) on Bhulekh Odisha under Section 15 of the Odisha Survey and Settlement Act, 1958 and Rule 34 of the Odisha Mutation Manual.

5. VERIFICATION & LEGAL LIABILITY:
I verify that Paragraphs 1 to 4 are true to my personal knowledge and that no material fact or legal heir has been hidden. I understand that any false declaration or concealment of a pending civil suit attracts cancellation under the 2019 Rules and prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023.

Place: ${tahasil}, ${district}, Odisha
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}`;

  const odiaAffidavitDraft = `ଆଇନଗତ ଉତ୍ତରାଧିକାରୀ ଘୋଷଣା ଏବଂ କୌଣସି ଦେୱାନୀ ମୋକଦ୍ଦମା ନଥିବା ଶପଥପତ୍ର
(ଓଡ଼ିଶା ବିବିଧ ପ୍ରମାଣପତ୍ର ନିୟମାବଳୀ, ୨୦୧୯ ଏବଂ ଓଡ଼ିଶା ସର୍ଭେ ଓ ବନ୍ଦୋବସ୍ତ ଆଇନ, ୧୯୫୮ ଅନୁଯାୟୀ)
[ଓଡ଼ିଶା ଷ୍ଟାମ୍ପ ନିୟମ ଅନୁଯାୟୀ ₹୧୦/- ବା ₹୨୦/- ଅଣ-ବିଚାରବିଭାଗୀୟ ଷ୍ଟାମ୍ପ ପେପରରେ ପ୍ରସ୍ତୁତ]

ମାନ୍ୟବର ତହସିଲଦାର / ଅତିରିକ୍ତ ତହସିଲଦାର, ${tahasil} ତହସିଲ,
ଜିଲ୍ଲା: ${district}, ଓଡ଼ିଶାଙ୍କ ସମୀପରେ

ମୁଁ ଶ୍ରୀ/ଶ୍ରୀମତୀ ${applicantName}, ବୟସ ପ୍ରାୟ [ବୟସ] ବର୍ଷ, ପିତା/ସ୍ୱାମୀ [ପିତା ବା ସ୍ୱାମୀଙ୍କ ନାମ], ଗ୍ରାମ/ମୌଜା/ୱାର୍ଡ ${mouza}, ଥାନା [ଥାନା ନାମ], ତହସିଲ ${tahasil}, ଜିଲ୍ଲା ${district}, ଓଡ଼ିଶା, ଆଧାର ନମ୍ବର [XXXX-XXXX-XXXX], ଏତଦ୍ୱାରା ସତ୍ୟପାଠ ପୂର୍ବକ ଘୋଷଣା କରୁଅଛି ଯେ:

୧. ମୃତ ବ୍ୟକ୍ତି ଏବଂ ଜମି/ସମ୍ପତ୍ତିର ବିବରଣୀ:
ମୋର [ସମ୍ପର୍କ] ${deceasedName} ମୌଜା ${mouza}, ତହସିଲ ${tahasil}, ଜିଲ୍ଲା ${district}ର ସ୍ଥାୟୀ ବାସିନ୍ଦା ଥିଲେ ଏବଂ ${khataPlot} ଅନ୍ତର୍ଗତ ସମ୍ପତ୍ତିର ରେକର୍ଡଭୁକ୍ତ ମାଲିକ (ରୟତ) ଥିଲେ । ସେ ତା ${deathDate} ରିଖରେ ବିନା ଇଚ୍ଛାପତ୍ର (Will) ରେ ଇହଲୀଳା ସମ୍ବରଣ କରିଅଛନ୍ତି (ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର ନଂ: [ନମ୍ବର]) ।

୨. ଜୀବିତ ଆଇନଗତ ଉତ୍ତରାଧିକାରୀମାନଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ତାଲିକା (ବିବାହିତା କନ୍ୟାମାନଙ୍କ ସମେତ):
ମୃତ୍ୟୁ ସମୟରେ ମୃତକଙ୍କର କେବଳ ନିମ୍ନଲିଖିତ ବ୍ୟକ୍ତିମାନେ ହିଁ ବୈଧ ଆଇନଗତ ଉତ୍ତରାଧିକାରୀ ଅଟନ୍ତି:
${heirs
  .map(
    (h, idx) =>
      `${idx + 1}. ନାମ: ${h.name} | ବୟସ: ${h.age} | ସମ୍ପର୍କ: ${h.relation} | ସ୍ଥିତି: ${h.status}`
  )
  .join("\n")}

୩. କୌଣସି ଭାଗବଣ୍ଟା ବା ଦେୱାନୀ ମୋକଦ୍ଦମା ବିଚାରାଧୀନ ନଥିବା ବାଧ୍ୟତାମୂଳକ ଘୋଷଣା:
ମୁଁ ଦୃଢ଼ତାର ସହିତ ଘୋଷଣା କରୁଅଛି ଯେ ଉପରୋକ୍ତ ତାଲିକା ବ୍ୟତୀତ ମୃତକଙ୍କର ଅନ୍ୟ କୌଣସି ସ୍ୱାମୀ/ସ୍ତ୍ରୀ, ପୁତ୍ର, ବିବାହିତା ବା ଅବିବାହିତା କନ୍ୟା, ପୋଷ୍ୟ ସନ୍ତାନ କିମ୍ବା ଅନ୍ୟ କୌଣସି ଉତ୍ତରାଧିକାରୀ ନାହାନ୍ତି । ଏଥିସହିତ, ମୃତକଙ୍କ ସମ୍ପତ୍ତି, ଉତ୍ତରାଧିକାର କିମ୍ବା ରେକର୍ଡ ଅଫ୍ ରାଇଟ୍ସ (RoR / ପଟ୍ଟା) ସମ୍ପର୍କରେ କୌଣସି ଦେୱାନୀ ଅଦାଲତରେ କୌଣସି ଭାଗବଣ୍ଟା ମୋକଦ୍ଦମା (Partition Suit) କିମ୍ବା ଦେୱାନୀ ମୋକଦ୍ଦମା (Civil Suit) ବିଚାରାଧୀନ ନାହିଁ ।

୪. ଶପଥପତ୍ରର ଉଦ୍ଦେଶ୍ୟ:
ଓଡ଼ିଶା ବିବିଧ ପ୍ରମାଣପତ୍ର ନିୟମାବଳୀ, ୨୦୧୯ ର ନିୟମ ୩ ଓ ୪ ଅନୁଯାୟୀ ଫର୍ମ ନଂ-୨ (Form No. II) ରେ ଆଇନଗତ ଉତ୍ତରାଧିକାରୀ ପ୍ରମାଣପତ୍ର ପାଇବା ଏବଂ ଭୂଲେଖ ଓଡ଼ିଶା (Bhulekh Odisha) ପୋର୍ଟାଲରେ ଦାଖଲ ଖାରଜ / ନାମଜାରୀ (RoR Mutation) କରିବା ନିମନ୍ତେ ଏହି ଶପଥପତ୍ର ମାନ୍ୟବର ତହସିଲଦାରଙ୍କ ନିକଟରେ ଦାଖଲ କରାଯାଉଅଛି ।

୫. ସତ୍ୟତା ପ୍ରତିପାଦନ:
ଉପରୋକ୍ତ ପାରା ୧ ରୁ ୪ ରେ ଉଲ୍ଲେଖିତ ସମସ୍ତ ତଥ୍ୟ ମୋର ଜ୍ଞାନ ଓ ବିଶ୍ୱାସରେ ସମ୍ପୂର୍ଣ୍ଣ ସତ୍ୟ ଅଟେ । ଯଦି ଭବିଷ୍ୟତରେ କୌଣସି ଉତ୍ତରାଧିକାରୀଙ୍କୁ ଲୁଚାଯାଇଥିବା କିମ୍ବା କୌଣସି ବିଚାରାଧୀନ ମୋକଦ୍ଦମା ତଥ୍ୟ ଗୋପନ ରଖାଯାଇଥିବା ପ୍ରମାଣିତ ହୁଏ, ତେବେ ପ୍ରମାଣପତ୍ର ବାତିଲ ହେବା ସହିତ ମୁଁ ଆଇନ ଅନୁଯାୟୀ ଦଣ୍ଡନୀୟ ହେବି ।

ସ୍ଥାନ: ${tahasil}, ${district}
ତାରିଖ: [DD-MM-YYYY]

ଶପଥକାରୀଙ୍କ ଦସ୍ତଖତ: _______________________
ନାମ: ${applicantName}`;

  const noLitigationClauseText = `MANDATORY NO-CIVIL-SUIT & NO-PARTITION-SUIT UNDERTAKING (ODISHA 2019 RULES)

[ENGLISH CLAUSE - INSERT IN FORM NO. II / BHULEKH ROR AFFIDAVIT]
"I, ${applicantName}, solemnly affirm and declare under the Odisha Miscellaneous Certificates Rules, 2019 that no partition suit, title suit, injunction petition, or other civil proceeding is pending before any Civil Court, High Court, or Revenue Authority concerning the estate, succession, or Record of Rights (RoR) of ${deceasedName} (${khataPlot}, Mouza ${mouza}, Tahasil ${tahasil}). I further affirm that there is no rival claimant to the estate and no suppression of any Class I legal heir, including married daughters. I acknowledge that if any pending suit is later discovered, the Legal Heir Certificate (Form No. II) shall stand cancelled ab initio."

[ODIA CLAUSE - ଓଡ଼ିଆ ଘୋଷଣା]
"ମୁଁ ${applicantName} ଓଡ଼ିଶା ବିବିଧ ପ୍ରମାଣପତ୍ର ନିୟମାବଳୀ, ୨୦୧୯ ଅନୁଯାୟୀ ସତ୍ୟପାଠ ପୂର୍ବକ ଘୋଷଣା କରୁଅଛି ଯେ ${deceasedName} ଙ୍କ ସମ୍ପତ୍ତି, ଉତ୍ତରାଧିକାର କିମ୍ବା ରେକର୍ଡ ଅଫ୍ ରାଇଟ୍ସ (${khataPlot}, ମୌଜା ${mouza}, ତହସିଲ ${tahasil}) ସମ୍ପର୍କରେ କୌଣସି ଦେୱାନୀ ଅଦାଲତରେ କୌଣସି ଭାଗବଣ୍ଟା ମୋକଦ୍ଦମା (Partition Suit) କିମ୍ବା ଦେୱାନୀ ମୋକଦ୍ଦମା (Civil Suit) ବିଚାରାଧୀନ ନାହିଁ । ଯଦି ଭବିଷ୍ୟତରେ କୌଣସି ମୋକଦ୍ଦମା ଗୋପନ ରଖାଯାଇଥିବା ପ୍ରମାଣିତ ହୁଏ, ତେବେ ପ୍ରଦତ୍ତ ଉତ୍ତରାଧିକାରୀ ପ୍ରମାଣପତ୍ର ରଦ୍ଦ ହେବ ।"`;

  const notaryAttestationText = `NOTARY PUBLIC / EXECUTIVE MAGISTRATE ATTESTATION & TWO-WITNESS BLOCK (ODISHA)

PART A: DEPONENT OATH & VERIFICATION
Solemnly affirmed and signed before me by Shri/Smt. ${applicantName}, identified by Aadhaar Card No. [XXXX-XXXX-XXXX] and the two identifying witnesses below, on this [Day] day of [Month], [Year] at ${tahasil}, ${district}, Odisha.

Notary Public / Oath Commissioner / Executive Magistrate:
Signature & Official Seal: ________________________
Reg. No. & Commission Expiry: ________________________
Notarial Register Entry: Page [__], Serial No. [__]

PART B: LOCAL IDENTIFYING / RI ENQUIRY WITNESSES (MOUZA ${mouza.toUpperCase()})
We personally knew ${deceasedName} during their lifetime and confirm that the surviving heirs listed in Paragraph 2 are complete and accurate, and no civil partition suit is pending.

1. Witness 1 Name: ________________________ | Village / Ward: ${mouza}
   Aadhaar No: [XXXX-XXXX-XXXX] | Signature: ________________________
2. Witness 2 Name: ________________________ | Village / Ward: ${mouza}
   Aadhaar No: [XXXX-XXXX-XXXX] | Signature: ________________________`;

  const tahasildarChecklistText = `TAHASILDAR HEARING & RI SPOT VERIFICATION CHECKLIST (ODISHA)
1. Death Certificate of the deceased Rayat (${deceasedName}) issued by BMC / Municipality / Gram Panchayat.
2. Bilingual Legal Heir & No-Suit Affidavit on Rs. 10/- or Rs. 20/- Odisha Non-Judicial Stamp Paper, notarized.
3. Certified Hal Khatiyan (Record of Rights / Patta) copy from Bhulekh Odisha portal.
4. Sabik Khatiyan or Parent Sale/Lease Deed copy (required by RI to trace ancestral links).
5. Up-to-date Land Revenue (Khajana) online payment receipt showing zero arrear dues.
6. Aadhaar Card and Voter ID / PAN of the applicant and every surviving legal heir (including married daughters).
7. Proof of Relationship: Family Ration Card, Birth Certificate, School Certificate, or Marriage Certificate.
8. Two local Mouza / Ward witnesses with Aadhaar IDs for Revenue Inspector (RI) spot enquiry.
9. Service Book first page or Pension PPO copy (only if deceased was an Odisha State / Central Govt employee).
10. Registered Will copy (if testamentary) OR Sub-Collector Section 22 OLR permission (only if SC/ST land transfer).`;

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
            <span>
              ODISHA MISC. CERTIFICATES RULES, 2019 • SURVEY &amp; SETTLEMENT ACT, 1958 • HSA 1956
            </span>
          </div>

          {/* Strict Single H1 Tag (46 chars, distinct from <title>, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Odisha Legal Heir Declaration Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a free English and Odia legal heir affidavit format for Odisha Tahasil and
            Bhulekh RoR mutation. Includes the mandatory no-partition-suit undertaking under the
            2019 Rules and a full Tahasildar hearing checklist.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#bilingual-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Bilingual Affidavit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will Online</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Odisha Revenue Consultation</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form No. II</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                2019 RULES HEIR ORDER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹10 Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ODISHA STAMP ACT ART. 4
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">No-Suit Clause</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CIVIL COURT BAR CHECK
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2 Scripts</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ENGLISH &amp; ODIA (ଓଡ଼ିଆ)
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
                <span>Odisha Revenue Rules</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Odisha Miscellaneous Certificates Rules 2019 (Form No. II), Survey &amp;
                Settlement Act 1958 s. 15, HSA 1956 ss. 8 &amp; 15, and Odisha Stamp Act Art. 4.
              </p>
            </div>

            {/* Quick Start Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Tahasil Hearing Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Copy the English and Odia drafts along with our no-suit clause before visiting your
                Mo Seva Kendra or notary desk.
              </p>
              <a
                href="#bilingual-affidavit-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Bilingual Drafts</span>
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
                  src="/images/odisha-legal-heir-declaration-affidavit-format-og.jpg"
                  alt="Odisha Legal Heir Affidavit Format English and Odia Template for Bhulekh RoR Mutation"
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
                    Odisha Legal Heir Sworn Format: English &amp; Odia Drafts, No-Suit Undertaking
                    &amp; Tahasildar RoR Guide
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: ODISHA AFFIDAVIT ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory No-Suit Undertaking:</strong> Under the Odisha Miscellaneous
                    Certificates Rules, 2019, your affidavit must state that no partition suit or
                    civil suit is pending in court. Most portals miss this line.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>English and Odia Together:</strong> Online e-District accepts English
                    PDFs, while local Revenue Inspectors check family records in Odia. Filing both
                    scripts prevents Tahasil desk objections.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Odisha Stamp Paper Value:</strong> Schedule I-A Article 4 fixes a ₹10
                    minimum duty for an affidavit. Local vendors often supply ₹10 or ₹20 e-stamp
                    sheets, while pure pension claims are exempt.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mother Estate RoR Mutation:</strong> After a mother dies, Section 15 of
                    the Hindu Succession Act gives equal shares to her husband, sons, and married
                    daughters.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Probate Needed in Odisha:</strong> Under Section 213 of the Indian
                    Succession Act, probate is not compulsory in Odisha. A valid registered Will
                    supports direct Bhulekh RoR mutation.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON THE ENTIRE PAGE <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>ODISHA STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Odisha Legal Heir Affidavit &amp; 2019 Certificate Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a land owner or pensioner dies in Odisha without a Will, the family needs
                  official proof of legal heirs. Under the{" "}
                  <strong>Odisha Miscellaneous Certificates Rules, 2019</strong> (Rules 3 and 4),
                  the local Tahasildar issues a <strong>Legal Heir Certificate in Form No. II</strong>{" "}
                  after field checks.
                </p>
                <p>
                  To start that file or to update a Record of Rights (RoR / Khatiyan) on Bhulekh,
                  you must submit an <strong>odisha legal heir affidavit format for ror</strong>.
                  This sworn paper lists the death date, Hal Khata and Plot numbers, and every
                  surviving heir.
                </p>
                <p>
                  Two separate Odisha revenue rules work side by side here. First, the 2019
                  Miscellaneous Certificates Rules govern Form No. II for pension, gratuity,
                  provident fund, bank dues, and undisputed family records. Second, the{" "}
                  <strong>Odisha Survey &amp; Settlement Act, 1958 (Section 15)</strong> and Rule
                  34 of the Odisha Mutation Manual govern RoR name changes on Bhulekh.
                </p>
                <p>
                  Most free samples online omit a crucial clause required under Odisha practice.
                  Your sworn draft must clearly confirm that{" "}
                  <strong>no partition suit or civil suit is pending</strong> in any civil court.
                  If you leave out this undertaking or hide a married daughter, Tahasildars in
                  Bhubaneswar, Cuttack, and Puri can reject or cancel the file.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE ODISHA AFFIDAVIT BUILDER */}
            <section
              id="interactive-odisha-builder"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE DRAFT &amp; SUIT CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Odisha Affidavit &amp; Family Tree Builder
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your Tahasil, Mouza, Khata number, and family tree details below. This tool
                updates both the English and Odia drafts right away and checks civil suit rules.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Filing Purpose & Personal Law */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Purpose of Odisha Affidavit</span>
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(FILING_PURPOSE_CONFIG).map(([key, cfg]) => (
                        <option key={key} value={key}>
                          {cfg.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Applicable Succession Law</span>
                    </label>
                    <select
                      value={personalLaw}
                      onChange={(e) => setPersonalLaw(e.target.value as any)}
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

                {/* Row 2: District, Tahasil, Mouza */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Odisha District</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {ODISHA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Tahasil Name
                    </label>
                    <input
                      type="text"
                      value={tahasil}
                      onChange={(e) => setTahasil(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Bhubaneswar / Cuttack Sadar"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mouza / Ward Name
                    </label>
                    <input
                      type="text"
                      value={mouza}
                      onChange={(e) => setMouza(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Patia / Saheed Nagar"
                    />
                  </div>
                </div>

                {/* Row 3: Deceased, Date of Death, Applicant, Khata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Deceased Owner Name
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
                      Applicant / Deponent
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Hal Khata / Plot No.
                    </label>
                    <input
                      type="text"
                      value={khataPlot}
                      onChange={(e) => setKhataPlot(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Civil Suit Pending Jurisdiction Check */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs text-slate-700 space-y-0.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Is Any Partition or Civil Suit Pending in Court?</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Under the 2019 Rules, Tahasildars cannot issue Form No. II when civil
                      litigation exists on the estate.
                    </p>
                  </div>
                  <div className="inline-flex rounded-full bg-white border border-slate-200 p-1">
                    <button
                      type="button"
                      onClick={() => setCivilSuitStatus("none")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        civilSuitStatus === "none"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      No Suit Pending
                    </button>
                    <button
                      type="button"
                      onClick={() => setCivilSuitStatus("pending")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        civilSuitStatus === "pending"
                          ? "bg-rose-600 text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Civil Suit Pending
                    </button>
                  </div>
                </div>

                {/* Editable Legal Heir Pedigree Rows */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Surviving Legal Heirs ({heirs.length})</span>
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

                {/* Live Computed Summary Box (Navy Brand Card) */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        ODISHA TAHASIL FILING SUMMARY ({tahasil.toUpperCase()})
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        civilSuitStatus === "pending"
                          ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
                          : "bg-white/10 text-emerald-400"
                      }`}
                    >
                      {civilSuitStatus === "pending"
                        ? "Civil Court Jurisdiction Alert"
                        : currentPurpose.timeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Odisha Stamp Duty
                      </div>
                      <div className="text-base sm:text-lg font-black text-white mt-1">
                        {currentPurpose.stampValue}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Schedule I-A Art. 4 (Odisha)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Portal Cost &amp; Notice
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        {currentPurpose.portalFee}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentPurpose.noticePeriod}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Succession Rule Applied
                      </div>
                      <div className="text-sm font-black text-emerald-400 mt-1">
                        {currentLaw.statute}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{currentLaw.note}</div>
                    </div>
                  </div>

                  {civilSuitStatus === "pending" ? (
                    <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-xs text-rose-100 space-y-1.5">
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-300" />
                        <span>Action Alert: Do Not Sign a False No-Suit Affidavit</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        Because a civil or partition suit is pending, the Tahasildar will reject
                        Form No. II under the 2019 Rules. Do not sign a false no-suit line. Ask our
                        Odisha counsel via{" "}
                        <Link href="/contact" className="underline font-bold text-white">
                          Odisha Revenue Consultation
                        </Link>{" "}
                        to apply for a Civil Court Succession Certificate or interim relief.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                      <div className="font-extrabold text-white">Tahasil Filing Tip:</div>
                      <p className="leading-relaxed text-[11px]">
                        {currentPurpose.summary} Keep two local witnesses from {mouza} ready during
                        the Revenue Inspector spot check, and verify RoR fees on our{" "}
                        <Link
                          href="/tools/odisha-bhulekh-ror-mutation-fee-calculator"
                          className="underline font-bold text-rose-200"
                        >
                          Odisha Bhulekh Mutation Fee Calculator
                        </Link>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 3: BILINGUAL AFFIDAVIT FORMAT (ENGLISH & ODIA) */}
            <section
              id="bilingual-affidavit-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Languages className="w-4 h-4" />
                <span>ENGLISH &amp; ODIA DRAFTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Bilingual Legal Heir Affidavit Format (English &amp; Odia)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Generic templates often skip Odia text and fail Bhubaneswar or Cuttack Tahasil
                checks. Copy our English and Odia drafts below. Every edit in Step 2 fills into
                both boxes live.
              </p>

              {/* Language Switcher + Copy All */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1 shadow-2xs">
                  {(
                    [
                      { id: "both", label: "Show Both Drafts" },
                      { id: "en", label: "English Only" },
                      { id: "or", label: "Odia Only (ଓଡ଼ିଆ)" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTemplateLang(tab.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        templateLang === tab.id
                          ? "bg-[#172228] text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      `${englishAffidavitDraft}\n\n====================================\n\n${odiaAffidavitDraft}`,
                      setCopiedBilingual
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  {copiedBilingual ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Both Drafts!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Both (English + Odia)</span>
                    </>
                  )}
                </button>
              </div>

              <div
                className={`grid grid-cols-1 ${
                  templateLang === "both" ? "xl:grid-cols-2" : ""
                } gap-5`}
              >
                {/* English Affidavit Box */}
                {(templateLang === "both" || templateLang === "en") && (
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-rose-300" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          ENGLISH DRAFT (e-DISTRICT / ROR)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyText(englishAffidavitDraft, setCopiedEnglish)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedEnglish ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy English</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 sm:p-5 max-h-[540px] overflow-y-auto bg-slate-50/60 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                      {englishAffidavitDraft}
                    </div>
                  </div>
                )}

                {/* Odia Affidavit Box */}
                {(templateLang === "both" || templateLang === "or") && (
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-[#172228] text-white p-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          ODIA ଶପଥପତ୍ର (TAHASIL / RI DESK)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyText(odiaAffidavitDraft, setCopiedOdia)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5F7E75] hover:bg-[#4e6961] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedOdia ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Odia</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 sm:p-5 max-h-[540px] overflow-y-auto bg-slate-50/60 text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                      {odiaAffidavitDraft}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 4: MANDATORY ASSET - NO CIVIL SUIT PENDING UNDERTAKING BOX */}
            <section
              id="no-civil-suit-undertaking"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT FIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Mandatory No Civil Suit Pending Undertaking Box
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most legal websites miss the single clause Odisha Tahasildars check first. Under
                  the <strong>Odisha Miscellaneous Certificates Rules, 2019</strong>, a Tahasildar
                  is an executive revenue officer, not a civil judge. They cannot decide contested
                  shares or family property fights.
                </p>
                <p>
                  If a partition suit or title suit is pending in a Civil Court, the Tahasildar must
                  refuse or stay Form No. II. Also, hiding a pending court suit cancels the
                  certificate and triggers criminal charges under Sections 229 and 236 of the{" "}
                  <strong>Bharatiya Nyaya Sanhita (BNS), 2023</strong>. Add this standalone
                  undertaking box to any draft before notarizing it.
                </p>
              </div>

              {/* No-Litigation Declaration Box */}
              <div className="rounded-3xl bg-white border-2 border-[#C65378]/30 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NO-LITIGATION &amp; NO-PARTITION-SUIT UNDERTAKING BOX</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(noLitigationClauseText, setCopiedNoSuitBox)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedNoSuitBox ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Clause Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bilingual Clause</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {noLitigationClauseText}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Warning on Hiding Married Daughters:</strong> Under{" "}
                    <em>Vineeta Sharma v. Rakesh Sharma (2020)</em> and HSA s. 8, married daughters
                    are Class I heirs. Never sign an affidavit leaving them out; use a registered{" "}
                    <Link href="/templates/release-deed-format" className="underline font-bold">
                      Release Deed
                    </Link>{" "}
                    if a sister wishes to give up her share voluntarily.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 5: ODISHA STAMP PAPER VALUE, NOTARY SEAL & PEDIGREE TABLE */}
            <section
              id="stamp-notary-family-grid"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>STAMP DUTY &amp; FAMILY TREE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Odisha Stamp Paper Value &amp; Family Tree Grid
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under <strong>Schedule I-A, Article 4 of the Indian Stamp Act (Odisha)</strong>,
                stamp duty on an affidavit depends on how you use it. Check the rates and verify
                your live family tree grid below.
              </p>

              {/* 4 Stamp Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Art. 4 Base Rate
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                      ₹10 Min Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Standard Tahasil &amp; e-District Affidavit
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Odisha law sets ₹10 as the base stamp duty for an affidavit. Local vendors in
                    Bhubaneswar and Cuttack commonly stock ₹10 or ₹20 stamp sheets.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Lease &amp; Indemnity
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      ₹50 - ₹100 Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    GA Dept, BDA, CDA &amp; Bank Bonds
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When an affidavit also includes an indemnity bond for GA leasehold plots, BDA
                    flats, or bank deposits, print on ₹50 or ₹100 stamp paper.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Art. 4 Exemptions
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                      ₹0 Stamp Free
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Family Pension &amp; Court Filings
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Article 4 exemptions, declarations filed solely inside a Court or solely
                    to draw family pension or charitable aid are exempt from stamp duty.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Portal &amp; CSC Cost
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      ₹0 Online / ₹30 RoR
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    e-District &amp; Mo Seva Kendra Fees
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applying directly on e-District Odisha for Form No. II costs ₹0 government fee.
                    Bhulekh RoR mutation charges ₹30 to ₹50 user fees plus ₹20 per Form 3 notice.
                  </p>
                </div>
              </div>

              {/* Family Tree Table Preview */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>ODISHA FAMILY TREE SCHEDULE ({mouza.toUpperCase()})</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Recorded Rayat: <strong>{deceasedName}</strong> | {khataPlot}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-900 font-extrabold">
                        <th className="py-3 px-4">No.</th>
                        <th className="py-3 px-4">Legal Heir Name</th>
                        <th className="py-3 px-4">Age</th>
                        <th className="py-3 px-4">Relation</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Succession Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="bg-rose-50/40">
                        <td className="py-3 px-4 font-bold text-[#C65378]">Root</td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">{deceasedName}</td>
                        <td className="py-3 px-4">Late</td>
                        <td className="py-3 px-4">Recorded Rayat</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Died {deathDate}</td>
                        <td className="py-3 px-4 text-xs">{currentLaw.statute}</td>
                      </tr>
                      {heirs.map((row, idx) => (
                        <tr key={row.id}>
                          <td className="py-3 px-4 font-bold text-slate-900">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{row.name}</td>
                          <td className="py-3 px-4">{row.age}</td>
                          <td className="py-3 px-4">{row.relation}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                row.status === "Predeceased"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs">{row.shareNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notary Attestation & Witness Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>NOTARY / EXECUTIVE MAGISTRATE &amp; WITNESS BLOCK</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(notaryAttestationText, setCopiedNotary)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedNotary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Notary Block Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notary Block</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {notaryAttestationText}
                </div>
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE - FORM NO. II VS BHULEKH ROR VS CIVIL COURT */}
            <section id="form2-vs-ror-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>CHOOSE THE RIGHT INSTRUMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Form No. II Certificate vs Bhulekh RoR vs Court
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many families apply for a Form No. II certificate thinking it updates their Patta on
                its own. Review how the three Odisha legal steps differ:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Form No. II (2019 Rules)</th>
                      <th className="py-3.5 px-4">Bhulekh RoR Mutation</th>
                      <th className="py-3.5 px-4">Civil Court Decree</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Governing Law</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Odisha Misc. Certificates Rules, 2019
                      </td>
                      <td className="py-3 px-4">Odisha Survey &amp; Settlement Act, 1958</td>
                      <td className="py-3 px-4">Indian Succession Act, 1925 / CPC</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Issuing Authority</td>
                      <td className="py-3 px-4">Tahasildar / Addl. Tahasildar</td>
                      <td className="py-3 px-4">Tahasildar (after RI inquiry)</td>
                      <td className="py-3 px-4">Civil Judge (Senior / Junior Div.)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Portal Used</td>
                      <td className="py-3 px-4">edistrict.odisha.gov.in</td>
                      <td className="py-3 px-4">odisharevenueservices.nic.in</td>
                      <td className="py-3 px-4">Physical Civil Court Filing</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">If Suit Pending</td>
                      <td className="py-3 px-4 font-bold text-rose-700">Rejected / Barred</td>
                      <td className="py-3 px-4 font-bold text-rose-700">Stayed until Decree</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Only Valid Forum
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Target Timeline</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">30 Days (ORTPSA)</td>
                      <td className="py-3 px-4">60 to 90 Working Days</td>
                      <td className="py-3 px-4">6 to 18 Months</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Best Use Case</td>
                      <td className="py-3 px-4">
                        Pension, PF, gratuity, bank dues &amp; step 1 for RoR
                      </td>
                      <td className="py-3 px-4">
                        Updates Column 2 of Khatiyan / Patta on Bhulekh
                      </td>
                      <td className="py-3 px-4">
                        Disputed partitions, stocks, shares &amp; contested claims
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: TAHASILDAR HEARING CHECKLIST & STEP-BY-STEP SOP */}
            <section
              id="tahasildar-hearing-checklist"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>TAHASIL HEARING PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Tahasildar Hearing Checklist &amp; e-District SOP
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these six clean steps from notarizing your bilingual affidavit to collecting
                your signed Form No. II certificate and updated Bhulekh Patta:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Print English & Odia Drafts on Odisha Stamp Paper",
                    desc: "Paste both drafts and the No-Suit Undertaking on ₹10 or ₹20 Odisha non-judicial stamp paper (use ₹50/₹100 if attaching a GA or bank indemnity bond).",
                  },
                  {
                    step: 2,
                    title: "Swear Before Notary Public or Executive Magistrate",
                    desc: "Sign before a Notary Public or Executive Magistrate along with Aadhaar ID and two local witnesses from the same Mouza or Ward.",
                  },
                  {
                    step: 3,
                    title: "Apply Online on e-District Odisha or Revenue Services",
                    desc: "Submit Form No. II on edistrict.odisha.gov.in (for Legal Heir Certificate) or file your mutation case on odisharevenueservices.nic.in with scanned PDFs.",
                  },
                  {
                    step: 4,
                    title: "Revenue Inspector (RI) Field Enquiry & Proclamation",
                    desc: "The Tahasildar marks the file to the local RI. The RI checks family ration cards, records witness statements, and issues a local proclamation (or Form 3 notice in RoR cases).",
                  },
                  {
                    step: 5,
                    title: "Attend Tahasildar Hearing & Verify All Legal Heirs",
                    desc: "Appear on the hearing date with original Death Certificate, Sabik/Hal Khatiyan, and Khajana receipts. Confirm no partition suit or co-heir objection exists.",
                  },
                  {
                    step: 6,
                    title: "Download Digital Form No. II or Appeal Within 30 Days",
                    desc: "Download the digitally signed certificate within 30 days under ORTPSA. If a Tahasildar wrongly rejects your application, appeal to the Sub-Collector within 30 days.",
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

              {/* Copyable Tahasildar Checklist Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                      10-Point Tahasildar Hearing &amp; RI Verification Checklist
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Carry original copies of every item below to your Bhubaneswar or district
                      Tahasil hearing.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(tahasildarChecklistText, setCopiedChecklist)}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {[
                    "Death Certificate (BMC / Municipality / Gram Panchayat)",
                    "Bilingual Legal Heir & No-Suit Affidavit (Notarized)",
                    "Certified Hal Khatiyan (RoR) from Bhulekh Odisha",
                    "Sabik Khatiyan or Parent Sale/Lease Deed copy",
                    "Up-to-date Khajana (Land Revenue) payment receipt",
                    "Aadhaar & Voter ID / PAN of all heirs (including daughters)",
                    "Family Ration Card, Birth, or Marriage proof of ties",
                    "Two local Mouza witnesses for RI spot verification",
                    "Service Book / PPO copy (only for Govt employees)",
                    "Registered Will or OLR s. 22 permission (if applicable)",
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-50 text-[#C65378] font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DUAL CONVERSION CTA BANNER INSIDE MAIN FLOW */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                    <Lock className="w-3 h-3 text-[#C65378]" />
                    <span>NO PROBATE REQUIRED IN ODISHA</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Protect Your Odisha Property with a Registered Will or Legal Help
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Under Orissa High Court rulings, probate is not compulsory in Odisha. A valid
                    registered Will saves your family from intestate RoR delays, or talk to our
                    advocates for contested Tahasil hearings.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/start"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Draft Will Online</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Odisha Revenue Consultation</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 8: MOTHER'S ESTATE & BHUBANESWAR GA/BDA RULES */}
            <section
              id="mother-succession-leasehold"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MOTHER ESTATE &amp; LEASEHOLD PLOTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. RoR Mutation After Mother Death &amp; GA / BDA Plots
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Bhubaneswar families apply for Bhulekh RoR mutation after a mother passes
                  away. Under <strong>Section 15(1) of the Hindu Succession Act, 1956</strong>, a
                  Hindu woman&apos;s self-acquired house or plot passes first to her sons, daughters
                  (including married daughters), and husband in equal shares.
                </p>
                <p>
                  However, under <strong>Section 15(2)</strong>, if the mother inherited the land
                  from her own parents and leaves no living child or grandchild, the land returns
                  to her father&apos;s heirs. Your Odisha legal heir affidavit should clearly state
                  whether the mother bought the land herself or inherited it.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Bhubaneswar GA &amp; PG Leasehold Plots:</strong> Residential plots in
                    Saheed Nagar, Nayapalli, or Unit areas are often 99-year General Administration
                    leases. Submit Form No. II, our notarized English/Odia no-suit affidavit, and
                    GA substitution papers together.
                  </li>
                  <li>
                    <strong>BDA &amp; CDA Allotments:</strong> Flats and duplexes allotted by the
                    Bhubaneswar Development Authority (BDA) or Cuttack Development Authority (CDA)
                    also require a Form No. II certificate and 30-day newspaper notice before
                    ownership transfer.
                  </li>
                  <li>
                    <strong>Chaka Bandi &amp; OLR Check:</strong> For farm plots in consolidated
                    Chaka zones or SC/ST rayat land, verify{" "}
                    <Link
                      href="/tools/odisha-bhulekh-ror-mutation-fee-calculator"
                      className="text-[#C65378] font-bold hover:underline"
                    >
                      Chaka Bandi fragmentation &amp; OLR s. 22 limits
                    </Link>{" "}
                    before filing partition or mutation requests.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="odisha-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>REAL ODISHA CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Cases: Bhubaneswar, Cuttack &amp; Puri
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: PATIA, BHUBANESWAR TAHASIL</span>
                    <span className="text-slate-500 font-semibold">Mother Death RoR Fix</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    English &amp; Odia Affidavit After Mother&apos;s Demise in Khordha
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two sons and a married daughter needed RoR mutation for their late mother&apos;s
                    self-acquired Patia plot. The local RI asked for an Odia pedigree declaration
                    plus a no-suit clause. Using our bilingual affidavit under Section 15(1) HSA and
                    the 2019 Rules, the Tahasildar approved the joint Khatiyan in 65 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: CDA SECTOR, CUTTACK SADAR</span>
                    <span className="text-slate-500 font-semibold">Married Daughter &amp; No-Suit</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Curing Rejection Caused by Missing Civil Suit Declaration
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family downloaded a generic online affidavit that skipped the no-partition-suit
                    clause and omitted a married sister. The Cuttack Tahasildar returned the Form
                    No. II file. Re-filing our complete affidavit with the married sister listed and
                    a registered Release Deed cleared both Form No. II and CDA transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: PURI SADAR TAHASIL</span>
                    <span className="text-slate-500 font-semibold">Pending Suit vs Registered Will</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Handling Pending Civil Partition Suits &amp; No-Probate Advantage
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When an estranged cousin filed a civil partition suit in Puri, the Tahasildar
                    stayed the Form No. II certificate under the 2019 Rules. Because the late owner
                    had signed a registered Will and Orissa High Court rules do not require probate,
                    our counsel proved the Will to protect the client&apos;s RoR claim.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL ODISHA PORTALS &amp; LAWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Odisha Portals &amp; Legal Citations
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Odisha Miscellaneous Certificates Rules, 2019 (Rules 3 &amp; 4):</strong>{" "}
                    Sets Form No. II rules for Legal Heir Certificates, RI verification, and
                    30-day appeal to the Sub-Collector.
                  </li>
                  <li>
                    <strong>Odisha Survey &amp; Settlement Act, 1958 (Section 15):</strong>{" "}
                    Governs RoR maintenance, Tahasildar mutation powers, and Sub-Collector appeals.
                  </li>
                  <li>
                    <strong>Indian Stamp Act, 1899 (Odisha Schedule I-A, Art. 4):</strong> Sets ₹10
                    minimum affidavit stamp duty and ₹0 exemptions for court and pension filings.
                  </li>
                  <li>
                    <strong>Hindu Succession Act, 1956 (ss. 6, 8 &amp; 15):</strong> Fixes Class I
                    heirs, married daughter birth rights (<em>Vineeta Sharma 2020</em>), and
                    succession after a mother&apos;s death.
                  </li>
                </ul>

                {/* Official External Portals (Verified 200 OK HTTPS) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://edistrict.odisha.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>Odisha e-District Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://odisharevenueservices.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Odisha Revenue Services (RoR)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://revenue.odisha.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Odisha Revenue Department</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://orissahighcourt.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>High Court of Orissa</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>India Code Central Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Hub-and-Spoke Internal Links (Verified 200 OK Routes) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    All Legal Templates Hub
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    Draft Will Online
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Odisha Revenue Consultation
                  </Link>
                  <Link
                    href="/tools/odisha-bhulekh-ror-mutation-fee-calculator"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Odisha Bhulekh Fee Tool
                  </Link>
                  <Link
                    href="/locations/odisha"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Will Drafting in Odisha
                  </Link>
                  <Link
                    href="/locations/bhubaneswar"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Will Drafting Bhubaneswar
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Legal Heir Service India
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Property Mutation Desk
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Odisha Affidavits
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

            {/* Plain-English Three-Card Summary (Readability Booster) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your spouse and kids safe. In Odisha, probate is not needed,
                  so a registered Will speeds up Bhulekh RoR mutation and stops family fights.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Odisha Stamp Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Print your bilingual heir draft on ₹10 or ₹20 stamp paper. Always keep the no
                  civil suit line inside, and sign before a Notary with two witnesses.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your Hal Khatiyan, Khajana receipts, and family tree. We help
                  you file clean papers for Form No. II and Bhulekh RoR updates.
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
                Advises Indian and NRI families on Odisha RoR mutation, Tahasildar appeals,
                Miscellaneous Certificates Rules, and Will drafting at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SKIP TAHASIL MUTATION DELAYS</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Odisha Land with a Valid Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Probate is not mandatory in Odisha. A valid registered Will lets your heirs update
                  Bhulekh RoR smoothly without intestate fights.
                </p>
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Will Online</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Stamp Duty on Indian Wills</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ODISHA REVENUE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>ODISHA REVENUE DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Facing Form No. II Rejection or Civil Suit Bar?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team assists with Bhubaneswar GA/BDA leasehold substitution, Tahasildar
                  hearings, and 30-day Sub-Collector appeals across Odisha.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Odisha Revenue Consultation</span>
                </Link>
                <Link
                  href="/services/legal-heir"
                  className="block text-[11px] font-bold text-[#C65378] hover:underline"
                >
                  Explore Legal Heir Services
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Odisha Families Use Our Forms
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2019 Rules Ready:</strong> Includes Form No. II and no-suit bar.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Two-Script Draft:</strong> English and Odia side by side.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bhulekh RoR Focus:</strong> Covers Khata, Plot, and Khajana checks.
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
          href="#bilingual-affidavit-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Bilingual Draft</span>
        </a>
        <Link
          href="/start"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Will</span>
        </Link>
      </div>
    </div>
  );
}
