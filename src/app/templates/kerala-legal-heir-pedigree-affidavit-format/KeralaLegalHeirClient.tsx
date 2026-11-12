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
  GitBranch,
  Languages,
} from "lucide-react";

// Table of Contents Items (<= 70 chars, 0 em-dashes, exact matching IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Kerala Affidavit & Registry Rules" },
  { id: "interactive-pedigree-builder", label: "2. Free Pedigree & Draft Builder" },
  { id: "bilingual-affidavit-template", label: "3. English & Malayalam Drafts" },
  { id: "family-tree-grid", label: "4. Family Tree Grid for Village Office" },
  { id: "stamp-duty-notary-box", label: "5. Stamp Paper Value & Notary Box" },
  { id: "legal-heir-vs-relationship", label: "6. Heir vs Relationship Paper" },
  { id: "edistrict-gazette-sop", label: "7. e-District, Gazette & 30-Day Steps" },
  { id: "personal-succession-laws", label: "8. Hindu, Christian & Muslim Rules" },
  { id: "kerala-case-studies", label: "9. Real Cases: Kozhikode, Kochi & Thrissur" },
  { id: "statutory-citations", label: "10. Official Portals & Law Links" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
];

const KERALA_DISTRICTS = [
  "Kozhikode",
  "Ernakulam",
  "Thiruvananthapuram",
  "Thrissur",
  "Kottayam",
  "Kannur",
  "Malappuram",
  "Palakkad",
  "Kollam",
  "Alappuzha",
  "Idukki",
  "Pathanamthitta",
  "Kasaragod",
  "Wayanad",
];

const PERSONAL_LAWS: Record<
  "hindu" | "christian" | "muslim",
  {
    label: string;
    statute: string;
    spouseRule: string;
    childrenRule: string;
    note: string;
  }
> = {
  hindu: {
    label: "Hindu / Sikh / Jain / Buddhist",
    statute: "Hindu Succession Act, 1956 (Class I Heirs)",
    spouseRule: "Spouse takes one equal share alongside all children.",
    childrenRule:
      "Sons, married daughters, and the mother of a late man take equal shares. If a child died first, their spouse and children take that branch share.",
    note: "Under Vineeta Sharma (2020), married daughters hold full equal birth rights.",
  },
  christian: {
    label: "Christian (All Churches in Kerala)",
    statute: "Indian Succession Act, 1925 (Part V, s. 32 to 48)",
    spouseRule:
      "Spouse takes one-third share with children, or half if there are no children.",
    childrenRule:
      "Sons and daughters split the rest in equal shares. After Mary Roy (1986), old Travancore and Cochin limits do not apply.",
    note: "List both parents and spouse status clearly for the Taluk clerk.",
  },
  muslim: {
    label: "Muslim (Sunni / Shia Personal Law)",
    statute: "Muslim Personal Law (Shariat) Act, 1937",
    spouseRule:
      "Husband takes one-fourth with children, or half with none. Wife takes one-eighth with children, or one-fourth with none.",
    childrenRule:
      "Sons and daughters take fixed Quranic shares. Daughters take half of a son's share from the rest.",
    note: "The Village Officer puts all living sharers and parents on the family tree.",
  },
};

const PURPOSE_CONFIG: Record<
  "legal_heir_form6c" | "relationship_cert" | "pokkuvaravu_mutation" | "bank_pension",
  {
    label: string;
    stampValue: string;
    portalFee: string;
    gazetteNeeded: string;
    timeline: string;
    summary: string;
  }
> = {
  legal_heir_form6c: {
    label: "Legal Heirship Paper (Form 6C)",
    stampValue: "₹50 Stamp Paper (Art. 4)",
    portalFee: "₹15 Portal Fee + Akshaya Fee",
    gazetteNeeded: "Yes, 30-Day Gazette Notice",
    timeline: "45 to 60 Days",
    summary:
      "Signed by the Tahsildar after a Village Officer check and a 30-day Gazette wait. Works for land transfer, banks, and job claims.",
  },
  relationship_cert: {
    label: "Relationship Paper (One Tie)",
    stampValue: "₹50 Sworn Form / Paper",
    portalFee: "₹15 Portal Fee + Akshaya Fee",
    gazetteNeeded: "No Gazette Wait Needed",
    timeline: "7 to 15 Days",
    summary:
      "Signed by the Village Officer or Tahsildar to prove one clear blood tie for pension, visa, insurance, or job aid.",
  },
  pokkuvaravu_mutation: {
    label: "Pokkuvaravu / Land Tax Transfer",
    stampValue: "₹50 Paper (₹100 with Risk Bond)",
    portalFee: "₹20 to ₹50 Online Land Fee",
    gazetteNeeded: "Skipped with Valid Will; needed without Will",
    timeline: "15 to 45 Days",
    summary:
      "Moves the Basic Tax Register (BTR) Thandaper land tax account into the heirs' names under 1966 state rules.",
  },
  bank_pension: {
    label: "Bank Account, Locker & Pension",
    stampValue: "₹50 Paper (₹0 for Pure Pension)",
    portalFee: "₹15 Portal Fee (if Form 6C needed)",
    gazetteNeeded: "Yes if bank asks for Form 6C",
    timeline: "15 to 60 Days",
    summary:
      "Sworn forms made only for family pension are stamp-free under Art. 4. Banks may ask for a risk bond when no nominee exists.",
  },
};

const FAQS = [
  {
    q: "What stamp paper value is needed for a Kerala legal heir affidavit?",
    a: "Under Article 4 of the Kerala Stamp Act, 1959, a standalone affidavit needs ₹50 non-judicial stamp paper or e-stamp. Some Akshaya Centres and offices ask for ₹100 paper when indemnity terms are added.",
  },
  {
    q: "Do I need both English and Malayalam formats for the Village Office?",
    a: "Most Taluk and Village Offices in Kerala accept English drafts. Still, Village Officers and local neighbors check family details much faster in Malayalam. A bilingual format helps avoid desk queries.",
  },
  {
    q: "How long does the Kerala Legal Heirship Certificate take?",
    a: "First, the Village Officer checks your family records and neighbor statements. Next, the Tahsildar sends a notice to the Kerala Gazette for a 30-day wait. If nobody objects, Form 6C is issued in 45 to 60 days total.",
  },
  {
    q: "What is the difference between Legal Heirship and Relationship Certificate?",
    a: "A Legal Heirship Certificate (Form 6C) lists every legal heir after a 30-day Gazette notice and works for land Pokkuvaravu and large bank claims. A Relationship Certificate proves one family link in 7 to 15 days without Gazette notice.",
  },
  {
    q: "Must married daughters be named in the Kerala pedigree table?",
    a: "Yes. Under Hindu, Christian, and Muslim personal laws in Kerala, married daughters hold full legal inheritance rights. Leaving out a married daughter makes the affidavit false under law.",
  },
  {
    q: "Is notary attestation required for a Kerala e-District heir affidavit?",
    a: "Yes. You must sign the printed stamp paper in front of a Notary Public or Gazetted Officer with two witnesses. Later, the Village Officer also checks facts with two local neighbors (Ayalvasi Mozhi).",
  },
  {
    q: "Can NRIs in the Gulf apply for a Kerala legal heir affidavit remotely?",
    a: "Yes. An NRI living in the UAE, Saudi, Qatar, or abroad can sign the affidavit at the Indian Embassy or Consulate. You can also send a Consular Power of Attorney to a relative in Kerala.",
  },
  {
    q: "Does a registered Will remove the need for a Legal Heirship Certificate?",
    a: "Often yes for undisputed land. Under the Kerala Transfer of Registry Rules, 1966 and Kerala High Court rulings, heirs can apply for Pokkuvaravu with a registered Will and death certificate without waiting for Gazette notice.",
  },
];

interface PedigreeRow {
  id: number;
  name: string;
  age: string;
  relation: string;
  status: "Living" | "Married & Living" | "Predeceased" | "Minor";
  includeBranchNote: string;
}

export default function KeralaLegalHeirClient() {
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
  const [templateLang, setTemplateLang] = useState<"both" | "en" | "ml">("both");
  const [copiedEnglish, setCopiedEnglish] = useState(false);
  const [copiedMalayalam, setCopiedMalayalam] = useState(false);
  const [copiedBilingual, setCopiedBilingual] = useState(false);
  const [copiedNotary, setCopiedNotary] = useState(false);
  const [copiedPedigree, setCopiedPedigree] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // Interactive Pedigree & Kerala Affidavit Builder State
  const [district, setDistrict] = useState<string>("Kozhikode");
  const [taluk, setTaluk] = useState<string>("Kozhikode");
  const [village, setVillage] = useState<string>("Chevayur");
  const [deceasedName, setDeceasedName] = useState<string>("Late K. Madhavan Nair");
  const [deathDate, setDeathDate] = useState<string>("14-08-2026");
  const [applicantName, setApplicantName] = useState<string>("Rajeshwari M.");
  const [purpose, setPurpose] = useState<
    "legal_heir_form6c" | "relationship_cert" | "pokkuvaravu_mutation" | "bank_pension"
  >("legal_heir_form6c");
  const [personalLaw, setPersonalLaw] = useState<"hindu" | "christian" | "muslim">("hindu");
  const [hasNriHeir, setHasNriHeir] = useState<boolean>(false);

  const [heirs, setHeirs] = useState<PedigreeRow[]>([
    {
      id: 1,
      name: "Smt. Meenakshi Amma",
      age: "66",
      relation: "Spouse (Widow)",
      status: "Living",
      includeBranchNote: "Class I Equal Share",
    },
    {
      id: 2,
      name: "Sri. Unnikrishnan M.",
      age: "41",
      relation: "Son",
      status: "Living",
      includeBranchNote: "Class I Equal Share",
    },
    {
      id: 3,
      name: "Smt. Rajeshwari M.",
      age: "38",
      relation: "Daughter",
      status: "Married & Living",
      includeBranchNote: "Equal Coparcener (Vineeta Sharma)",
    },
    {
      id: 4,
      name: "Late Babu M. (Spouse: Latha / Son: Arun, 15)",
      age: "Deceased",
      relation: "Predeceased Son Branch",
      status: "Predeceased",
      includeBranchNote: "Per Stirpes Branch Share",
    },
  ]);

  const addHeirRow = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Full Name of Heir",
        age: "35",
        relation: "Daughter / Son / Mother",
        status: "Living",
        includeBranchNote: "Eligible under Personal Law",
      },
    ]);
  };

  const updateHeirRow = (id: number, field: keyof PedigreeRow, value: string) => {
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

  const heirTableTextEn = heirs
    .map(
      (h, idx) =>
        `${idx + 1}. ${h.name} | Age: ${h.age} | Relation: ${h.relation} | Status: ${h.status} | Basis: ${h.includeBranchNote}`
    )
    .join("\n");

  const englishAffidavitDraft = `AFFIDAVIT FOR LEGAL HEIRSHIP CERTIFICATE & FAMILY TREE VERIFICATION
(Submitted via Kerala e-District Portal before the Tahsildar / Village Officer)
[To be printed on Rs. 50/- Kerala Non-Judicial Stamp Paper / e-Stamp]

BEFORE THE TAHSILDAR, ${taluk.toUpperCase()} TALUK, ${district.toUpperCase()} DISTRICT, KERALA
THROUGH THE VILLAGE OFFICER, ${village.toUpperCase()} VILLAGE

I, ${applicantName}, aged about [Age] years, son/daughter/spouse of [Father/Spouse Name], residing at [House Name & Number], [Desam / Ward], ${village} Village, ${taluk} Taluk, ${district} District, Kerala (PIN: [673XXX]), Aadhaar No: [XXXX-XXXX-XXXX], do hereby solemnly affirm and state on oath as follows:

1. ORDINARY RESIDENCE & DEMISE:
That ${deceasedName}, son/daughter/spouse of [Parent Name], was an ordinary and permanent resident of House No. [Door No.], [House Name], ${village} Village, ${taluk} Taluk, ${district} District, Kerala (Ration Card No: [Card No.]). The said deceased passed away intestate (without leaving a registered Will) on ${deathDate} at [Place of Death], as evidenced by Death Certificate No. [Reg. No.] issued by [Local Body / Registrar of Births & Deaths].

2. STATUS OF PARENTS & PREDECEASED HEIRS:
That the father and mother of the deceased both predeceased the deceased on [Dates] (or surviving mother [Name] is listed below). Apart from the persons named in Paragraph 3, no predeceased son or predeceased daughter left behind any living spouse or children except as expressly disclosed in the Family Tree Table below.

3. COMPLETE PEDIGREE & SURVIVING LEGAL HEIRS (${PERSONAL_LAWS[personalLaw].statute}):
That at the time of death, the deceased left behind ONLY the following living legal heirs (and per stirpes branch representatives, if any):
${heirTableTextEn}

4. NEGATIVE DECLARATION (NO OTHER HEIRS):
I solemnly declare that apart from the legal heirs named above, the deceased left no other spouse, son, married or unmarried daughter, adopted child, or surviving mother/father entitled to succeed under applicable personal law. No civil suit or dispute regarding legal heirship is pending before any Court.

5. PURPOSE OF SUBMISSION:
This affidavit is submitted before the Village Officer, ${village} Village, and the Tahsildar, ${taluk} Taluk, for issuance of a Legal Heirship Certificate (Form 6C) / Pokkuvaravu (Transfer of Registry under Kerala Transfer of Registry Rules, 1966) / Bank & Service Settlement.

6. VERIFICATION & PENAL UNDERTAKING:
I verify that the facts in Paragraphs 1 to 5 are true to my personal knowledge and belief. I understand that any false statement or concealment of a legal heir attracts prosecution under Sections 229 and 236 of the Bharatiya Nyaya Sanhita, 2023 (BNS) and cancels the certificate ab initio.

Place: ${taluk}, ${district}, Kerala
Date: [DD-MM-YYYY]

DEPONENT SIGNATURE: _______________________
Name: ${applicantName}`;

  const malayalamAffidavitDraft = `അനന്തരാവകാശ സർട്ടിഫിക്കറ്റിനും കുടുംബവൃക്ഷ പരിശോധനയ്ക്കുമുള്ള സത്യവാങ്മൂലം
(കേരള ഇ-ഡിസ്ട്രിക്റ്റ് പോർട്ടൽ വഴി തഹസിൽദാർ / വില്ലേജ് ഓഫീസർ മുമ്പാകെ സമർപ്പിക്കുന്നത്)
[കേരള സ്റ്റാമ്പ് ആക്ട് ആർട്ടിക്കിൾ 4 പ്രകാരം ₹50/- മുദ്രപ്പത്രത്തിൽ തയ്യാറാക്കേണ്ടത്]

ബഹുമാനപ്പെട്ട ${taluk} താലൂക്ക് തഹസിൽദാർ / ${village} വില്ലേജ് ഓഫീസർ മുമ്പാകെ, ${district} ജില്ല, കേരളം.

${district} ജില്ലയിൽ, ${taluk} താലൂക്കിൽ, ${village} വില്ലേജിൽ, [ദേശം / വാർഡ്], [വീട്ടുപേര് / വീട്ടുനമ്പർ] ൽ താമസിക്കുന്ന [പ്രായം] വയസ്സുള്ള, [അച്ഛന്റെ / പങ്കാളിയുടെ പേര്] മകൻ/മകൾ/ഭാര്യ/ഭർത്താവ് ${applicantName} (ആധാർ നമ്പർ: [XXXX-XXXX-XXXX]) എന്ന ഞാൻ ബോധിപ്പിക്കുന്ന സത്യവാങ്മൂലം:

1. മരണപ്പെട്ടയാളുടെ സ്ഥിരതാമസവും മരണവിവരവും:
എന്റെ [ബന്ധം] ആയ ${deceasedName} ([റേഷൻ കാർഡ് നമ്പർ]) മേൽപ്പറഞ്ഞ മേൽവിലാസത്തിൽ സ്ഥിരതാമസക്കാരനായിരുന്നു/ആയിരുന്നു. ടിയാൻ/ടിയാൾ ${deathDate} തീയതിയിൽ [മരണസ്ഥലം] വെച്ച് വിൽപത്രം (മരണപത്രം) എഴുതിവെക്കാതെ മരണമടഞ്ഞിട്ടുള്ളതാണ്. ([തദ്ദേശസ്ഥാപനം] നൽകിയ മരണസർട്ടിഫിക്കറ്റ് നമ്പർ: [നമ്പർ]).

2. മാതാപിതാക്കളുടെയും മുൻമരണപ്പെട്ട അവകാശികളുടെയും വിവരം:
മരണപ്പെട്ടയാളുടെ അച്ഛനും അമ്മയും ഇതിനകം മരണപ്പെട്ടിട്ടുള്ളവരാണ് (അല്ലെങ്കിൽ ജീവിച്ചിരിക്കുന്ന മാതാവ് താഴെ ചേർത്തിട്ടുണ്ട്). താഴെ പട്ടികയിൽ ചേർത്തവരല്ലാതെ മുൻമരണപ്പെട്ട മക്കളുടെ ഭാര്യയോ കുട്ടികളോ മറ്റു അവകാശികളോ ആരും തന്നെയില്ല.

3. നിയമാനുസൃത അവകാശികളുടെയും കുടുംബവൃക്ഷത്തിന്റെയും (Pedigree) പട്ടിക:
മരണസമയത്ത് ടിയാന്റെ/ടിയാളുടെ നിയമപരമായ അവകാശികളായി താഴെ പറയുന്നവർ മാത്രമാണുള്ളത് (വിവാഹിതരായ പെൺമക്കൾ ഉൾപ്പെടെ):
${heirs
  .map(
    (h, idx) =>
      `${idx + 1}. പേര്: ${h.name} | വയസ്സ്: ${h.age} | ബന്ധം: ${h.relation} | അവസ്ഥ: ${h.status}`
  )
  .join("\n")}

4. മറ്റ് അവകാശികൾ ഇല്ലെന്ന സാക്ഷ്യപ്പെടുത്തൽ:
മേൽപ്പറഞ്ഞ അവകാശികളെ കൂടാതെ മരണപ്പെട്ടയാൾക്ക് മറ്റ് ഭാര്യ/ഭർത്താവ്, മക്കൾ, ദത്തെടുത്ത മക്കൾ, അല്ലെങ്കിൽ മറ്റ് നിയമാനുസൃത അവകാശികൾ ആരും തന്നെയില്ല എന്ന് ഇതിനാൽ ഉറപ്പിച്ചു ബോധിപ്പിക്കുന്നു. ഇതുമായി ബന്ധപ്പെട്ട് യാതൊരു കോടതി തർക്കങ്ങളും നിലവിലില്ല.

5. സത്യവാങ്മൂലത്തിന്റെ ഉദ്ദേശ്യം:
${village} വില്ലേജ് ഓഫീസർ നടത്തുന്ന അന്വേഷണത്തിന്റെയും കേരള ഗസറ്റ് വിജ്ഞാപനത്തിന്റെയും അടിസ്ഥാനത്തിൽ അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ് (Form 6C) ലഭിക്കുന്നതിനും വില്ലേജ് ഓഫീസിൽ ഭൂമിയുടെ പോക്കുവരവ് (തണ്ടപ്പേർ മാറ്റം) / ബാങ്ക് ക്ലെയിം എന്നിവയ്ക്കും വേണ്ടിയാണ് ഈ സത്യവാങ്മൂലം സമർപ്പിക്കുന്നത്.

6. നിയമപരമായ ഉറപ്പ്:
മുകളിൽ പ്രസ്താവിച്ച വിവരങ്ങൾ എന്റെ അറിവിലും വിശ്വാസത്തിലും പൂർണ്ണമായും സത്യവും ശരിയുമാകുന്നു. ഇതിൽ എന്തെങ്കിലും വസ്തുതാവിരുദ്ധമായ വിവരങ്ങളോ അവകാശികളെ മറച്ചുവെക്കലോ ഉള്ളതായി പിന്നീട് തെളിയുന്നപക്ഷം നിയമപ്രകാരമുള്ള ശിക്ഷാനടപടികൾക്ക് വിധേയനാകാൻ ഞാൻ ബാധ്യസ്ഥനാണെന്ന് സമ്മതിച്ചുകൊള്ളുന്നു.

സ്ഥലം: ${taluk}, ${district}
തീയതി: [DD-MM-YYYY]

സത്യവാങ്മൂലം നൽകുന്നയാളുടെ ഒപ്പ്: _______________________
പേര്: ${applicantName}`;

  const notaryAttestationText = `NOTARY PUBLIC / GAZETTED OFFICER ATTESTATION & AYALVASI (NEIGHBOR) VERIFICATION BLOCK

PART A: DEPONENT OATH & NOTARY ATTESTATION
Solemnly affirmed and signed before me by Shri/Smt. ${applicantName}, identified by Aadhaar No. [XXXX-XXXX-XXXX] and the two witnesses below, on this [Day] day of [Month], [Year] at ${taluk}, ${district}, Kerala.

Notary Public / Oath Commissioner / Gazetted Officer:
Signature & Official Seal: ________________________
Reg. No. & Date: ________________________
Serial Entry in Notarial Register: Page [__], Entry [__]

PART B: IDENTIFYING & AYALVASI (NEIGHBOR) WITNESSES FOR VILLAGE OFFICER ENQUIRY
We, the undersigned neighbors residing in ${village} Village, ${taluk} Taluk, ${district} District, personally knew ${deceasedName} and confirm that the family tree and surviving legal heirs listed in Paragraph 3 are true and complete.

1. Neighbor Witness 1 Name: ___________________ | House Name: ___________________
   Aadhaar No: [XXXX-XXXX-XXXX] | Signature: ___________________
2. Neighbor Witness 2 Name: ___________________ | House Name: ___________________
   Aadhaar No: [XXXX-XXXX-XXXX] | Signature: ___________________`;

  const pedigreeGridText = `KERALA FAMILY TREE (KUDUMBA VRIKSHAM) VERIFICATION TABLE
Deceased Propositus: ${deceasedName} | Date of Death: ${deathDate}
Village: ${village} | Taluk: ${taluk} | District: ${district} | Applicable Law: ${PERSONAL_LAWS[personalLaw].statute}

| Sl. | Full Name of Family Member | Age | Relation to Deceased | Status (Living/Married/Predeceased) | Share / Representation Basis |
${heirs
  .map(
    (h, idx) =>
      `| ${idx + 1} | ${h.name} | ${h.age} | ${h.relation} | ${h.status} | ${h.includeBranchNote} |`
  )
  .join("\n")}`;

  const villageChecklistText = `KERALA e-DISTRICT LEGAL HEIRSHIP & VILLAGE OFFICE CHECKLIST
1. Death Certificate issued by Local Self Government (Panchayat / Municipality / Corporation).
2. Bilingual Legal Heir & Pedigree Affidavit printed on ₹50 Kerala Non-Judicial Stamp Paper / e-Stamp, signed before Notary.
3. Copy of Family Ration Card (showing deceased and household members).
4. Aadhaar Card & Address Proof of Applicant and all living Legal Heirs.
5. School Leaving Certificate / SSLC / Birth Certificate / Passport proving parent-child or spouse tie.
6. Marriage Certificate (for married daughters or widow name cross-check).
7. Two Local Neighbor (Ayalvasi) Witnesses with Aadhaar cards during Village Officer field inspection.
8. Service Certificate from Head of Office (only if deceased was a Government / PSU employee).
9. Prior Title Deed (Aadharam) & Latest Land Tax Receipt (Karam Raseethu) if applying for Pokkuvaravu mutation.
10. Consular / Embassy Attested Power of Attorney (only if an heir lives abroad in the Gulf or overseas).`;

  const copyText = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  const currentPurpose = PURPOSE_CONFIG[purpose];
  const currentLaw = PERSONAL_LAWS[personalLaw];

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
            <span>KERALA LAND TAX ACT, 1961 • TRANSFER OF REGISTRY RULES, 1966 • BSA S. 61</span>
          </div>

          {/* Strict Single H1 Tag (45 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Kerala Legal Heir &amp; Pedigree Affidavit Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Get a free English and Malayalam legal heir affidavit format for your Taluk and Village
            Office file. Use our family tree grid, ₹50 stamp paper chart, and step-by-step e-District
            checklist.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#bilingual-affidavit-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Free Sworn Draft</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Write a Kerala Will</span>
            </button>
            <Link
              href="/services/legal-heir"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Talk to Legal Team</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Form 6C</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TALUK HEIR ORDER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹50 Stamp</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STAMP ACT ART. 4
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GAZETTE CLAIM WAIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2 Scripts</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ENGLISH &amp; MALAYALAM
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
                <span>GUIDE SECTIONS</span>
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

            {/* Law Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>State Land Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built for Kerala e-District, Land Tax Act 1961, Registry Rules 1966, Stamp Act Art.
                4, and BSA 2023 s. 61.
              </p>
            </div>

            {/* Quick Start Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Village Office Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Copy the two drafts and attach your family tree table before you visit the Akshaya
                help desk or notary.
              </p>
              <a
                href="#bilingual-affidavit-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Free Drafts</span>
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
                  src="/images/kerala-legal-heir-pedigree-affidavit-format-og.jpg"
                  alt="Kerala Legal Heir Affidavit Format Bilingual Template and Family Tree Guide"
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
                    Kerala Legal Heir Sworn Draft, Family Tree Grid &amp; Village Office Rules
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>KEY FACTS AT A GLANCE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stamp Value:</strong> Print your sworn draft on{" "}
                    <strong>₹50 non-judicial stamp paper</strong> under Art. 4 of the Kerala Stamp
                    Act, 1959.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Two-Language Edge:</strong> File English and Malayalam drafts side by
                    side. Both the Taluk clerk and Village staff read your family tree fast.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Full Family List:</strong> Name every living heir, married daughter,
                    and any spouse or child of a late son or girl.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gazette Wait Rule:</strong> Form 6C takes 45 to 60 days because of a
                    30-day state Gazette wait.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fast Land Transfer:</strong> A signed and filed Will skips the 45-day
                    wait for clear land name changes in most Taluks.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE MAIN H2 <= 70 CHARS) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LAW &amp; LAND RULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Kerala Legal Heir Affidavit &amp; Registry Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a home or plot owner dies in Kerala with no Will, the family must ask for a{" "}
                  <strong>Legal Heirship Certificate (Form 6C)</strong> on e-District. First, the
                  Village Officer checks local records and talks to neighbors. Then the Tahsildar
                  signs and issues the final order.
                </p>
                <p>
                  A <strong>Kerala legal heir affidavit format</strong> is the main sworn proof for
                  this file. You print it on stamp paper and swear that you left no heir out. If a
                  draft skips a married girl or lacks a clear denial line, offices in Kozhikode,
                  Kochi, and Thrissur halt the file right away.
                </p>
                <p>
                  Three state and central acts shape this file. First, the{" "}
                  <strong>Kerala Land Tax Act, 1961</strong> sets tax rules for land kept under a{" "}
                  <em>Thandaper</em> (land tax account). Next, the{" "}
                  <strong>Transfer of Registry Rules, 1966</strong> control <em>Pokkuvaravu</em>{" "}
                  (name change on land books) when the owner dies.
                </p>
                <p>
                  Third, rules of proof come from the <strong>Indian Evidence Act</strong> and{" "}
                  <strong>Bharatiya Sakshya Adhiniyam (BSA), 2023 Section 61</strong>. Under Section
                  61 of BSA, scanned PDFs on e-District carry full legal weight just like paper
                  files. Meanwhile, BSA Section 56 covers direct proof of old title deeds.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE PEDIGREE & AFFIDAVIT BUILDER */}
            <section
              id="interactive-pedigree-builder"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FREE DRAFT &amp; STAMP TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Kerala Pedigree &amp; Affidavit Builder
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Type your Taluk, Village, personal law, and heir rows below. The tool fills in both
                your English and Malayalam drafts and checks your exact stamp cost.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                {/* Row 1: Purpose & Personal Law */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Use Case or Filing Type</span>
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(PURPOSE_CONFIG).map(([key, cfg]) => (
                        <option key={key} value={key}>
                          {cfg.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Family Faith &amp; Heir Law</span>
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

                {/* Row 2: Location & Deceased Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>District Name</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {KERALA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Taluk Name
                    </label>
                    <input
                      type="text"
                      value={taluk}
                      onChange={(e) => setTaluk(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Kozhikode / Kanayannur"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Village Name
                    </label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                      placeholder="e.g. Chevayur / Edappally"
                    />
                  </div>
                </div>

                {/* Row 3: Names & Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Late Owner Name
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
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* NRI Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900">Heir Living Abroad (NRI)?</strong> Turn this
                    on if any heir lives out of India and needs an Embassy seal.
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasNriHeir((v) => !v)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      hasNriHeir
                        ? "bg-[#C65378] text-white"
                        : "bg-white border border-slate-300 text-slate-700"
                    }`}
                  >
                    {hasNriHeir ? "NRI Mode: ON" : "NRI Mode: OFF"}
                  </button>
                </div>

                {/* Editable Pedigree Rows */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Family Tree Members ({heirs.length})</span>
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
                        STAMP &amp; FILING GUIDE ({district.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {currentPurpose.timeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Stamp Duty
                      </div>
                      <div className="text-base sm:text-lg font-black text-white mt-1">
                        {currentPurpose.stampValue}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Stamp Act, 1959 (Sch. I)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Portal Cost
                      </div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        {currentPurpose.portalFee}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {currentPurpose.gazetteNeeded}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Heir Law Used
                      </div>
                      <div className="text-sm font-black text-emerald-400 mt-1">
                        {currentLaw.statute}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{currentLaw.note}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white">Filing Tip:</div>
                    <p className="leading-relaxed text-[11px]">
                      {currentPurpose.summary}{" "}
                      {hasNriHeir
                        ? "Since an heir lives abroad, have the Embassy stamp the NRI form or PoA. Next, pay stamp duty at the District Collector desk."
                        : "Keep two local neighbors ready with Aadhaar cards when the Village Officer visits to check your home records."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: MANDATORY ASSET - BILINGUAL AFFIDAVIT FORMAT */}
            <section
              id="bilingual-affidavit-template"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Languages className="w-4 h-4" />
                <span>ENGLISH &amp; MALAYALAM DRAFTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Bilingual Affidavit Format (English &amp; Malayalam)
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Most sites share plain English forms that miss Taluk and neighbor check rules. Copy
                both our English and Malayalam drafts below. Your entries from Step 2 show up here
                right away.
              </p>

              {/* Language Switcher + Copy All */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1 shadow-2xs">
                  {(
                    [
                      { id: "both", label: "Show Both Drafts" },
                      { id: "en", label: "English Only" },
                      { id: "ml", label: "Malayalam Only" },
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
                      `${englishAffidavitDraft}\n\n====================================\n\n${malayalamAffidavitDraft}`,
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
                      <span>Copy Both (English + Malayalam)</span>
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
                          ENGLISH DRAFT (PORTAL READY)
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

                {/* Malayalam Affidavit Box */}
                {(templateLang === "both" || templateLang === "ml") && (
                  <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="bg-[#172228] text-white p-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          MALAYALAM സത്യവാങ്മൂലം (VILLAGE DESK)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyText(malayalamAffidavitDraft, setCopiedMalayalam)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5F7E75] hover:bg-[#4e6961] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {copiedMalayalam ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Malayalam</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 sm:p-5 max-h-[540px] overflow-y-auto bg-slate-50/60 text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                      {malayalamAffidavitDraft}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 4: MANDATORY ASSET - FAMILY TREE VERIFICATION GRID */}
            <section id="family-tree-grid" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>FAMILY TREE CHECK TEMPLATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Family Tree Verification Grid for Village Office
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The Village Officer checks who lived, who wed, and if any child died before the land
                owner. Add this clean table to your sworn draft so clerks pass your file fast.
              </p>

              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                      FAMILY TREE TABLE (KUDUMBA VRIKSHAM)
                    </div>
                    <div className="text-xs text-slate-600">
                      Late Owner: <strong>{deceasedName}</strong> | Died:{" "}
                      <strong>{deathDate}</strong> | {village} Village, {taluk}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(pedigreeGridText, setCopiedPedigree)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedPedigree ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Grid Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Tree Grid</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-900 font-extrabold">
                        <th className="py-3 px-4">No.</th>
                        <th className="py-3 px-4">Family Member Name</th>
                        <th className="py-3 px-4">Age</th>
                        <th className="py-3 px-4">Relation</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Share Rule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="bg-rose-50/40">
                        <td className="py-3 px-4 font-bold text-[#C65378]">Root</td>
                        <td className="py-3 px-4 font-extrabold text-slate-900">{deceasedName}</td>
                        <td className="py-3 px-4">Late</td>
                        <td className="py-3 px-4">Land Owner</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Died {deathDate}</td>
                        <td className="py-3 px-4">{currentLaw.statute}</td>
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
                          <td className="py-3 px-4 text-xs">{row.includeBranchNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>List Children Who Died First:</strong> If a son or girl died before the
                  owner, list their branch in the grid. Their wife, husband, or kids take that share
                  by law.
                </span>
              </div>
            </section>

            {/* SECTION 5: MANDATORY ASSETS - STAMP PAPER GUIDE & NOTARY SEAL BOX */}
            <section id="stamp-duty-notary-box" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>STAMP ACT &amp; NOTARY SEAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Stamp Paper Value Guide &amp; Notary Box
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Old sites often tell folks to buy ₹20 stamp paper. Under{" "}
                <strong>Schedule I, Article 4 of the Kerala Stamp Act, 1959</strong>, standalone
                affidavits need <strong>₹50 stamp paper</strong>. Check the chart below before you
                buy e-stamp paper.
              </p>

              {/* Stamp Paper Value Guide Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Art. 4 Base Rate
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs">
                      ₹50 Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Single Sworn Legal Heir Form
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Use ₹50 stamp paper or e-Stamp for Form 6C, Relationship claims, and land tax
                    name transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Joint Bond Rate
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      ₹100 Stamp
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Bank Claims &amp; Risk Bonds
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If ₹50 paper is out of stock or your bank asks for a risk bond clause, ₹100
                    stamp paper works fine.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#5F7E75]">
                      Art. 4 Stamp-Free Rule
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                      ₹0 Stamp Free
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Pension or Court Filings
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sworn forms made just to claim family pension or file right inside a court carry
                    zero stamp fee under Art. 4.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-700">
                      Portal &amp; Desk Cost
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs">
                      ₹15 + Akshaya
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Online Portal &amp; Scan Fee
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The web portal fee is ₹15. Akshaya help desks charge a small scan fee, which is
                    often ₹25 to ₹60 in all.
                  </p>
                </div>
              </div>

              {/* Mandatory Notary Attestation Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>NOTARY SEAL &amp; NEIGHBOR WITNESS BOX</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(notaryAttestationText, setCopiedNotary)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedNotary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Notary Box Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notary Box</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {notaryAttestationText}
                </div>
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE - LEGAL HEIRSHIP VS RELATIONSHIP CERTIFICATE */}
            <section
              id="legal-heir-vs-relationship"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>WHICH FORM TO PICK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Legal Heir vs Relationship Certificate Kerala
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Folks often pick the wrong online form. Check how Form 6C, Relationship Certificate,
                and Court Succession differ here:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Point</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Legal Heirship (Form 6C)</th>
                      <th className="py-3.5 px-4">Relationship Certificate</th>
                      <th className="py-3.5 px-4">Court Succession</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Who Signs It</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Tahsildar (Taluk Desk)
                      </td>
                      <td className="py-3 px-4">Village Officer / Tahsildar</td>
                      <td className="py-3 px-4">Civil Court Judge</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Who Is Named</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        All legal heirs of late owner
                      </td>
                      <td className="py-3 px-4">One clear blood link</td>
                      <td className="py-3 px-4">Order for shares &amp; funds</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Gazette Wait</td>
                      <td className="py-3 px-4 font-bold text-rose-700">YES (30-day wait)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">NO Gazette wait</td>
                      <td className="py-3 px-4">Court press notice</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Time Taken</td>
                      <td className="py-3 px-4">45 to 60 days</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">7 to 15 days</td>
                      <td className="py-3 px-4">4 to 9 months</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Best Use Case</td>
                      <td className="py-3 px-4">
                        Land transfer, vehicle RC, bank cash &amp; PF
                      </td>
                      <td className="py-3 px-4">
                        Pension, job aid, visa &amp; life claim
                      </td>
                      <td className="py-3 px-4">
                        Large stocks, mutual funds &amp; disputed funds
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP e-DISTRICT & GAZETTE SOP */}
            <section id="edistrict-gazette-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>STEP-BY-STEP FILING GUIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Kerala e-District, Gazette &amp; 30-Day Filing SOP
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Print Both Drafts on ₹50 Stamp Paper",
                    desc: "Copy our two drafts along with your family tree table. Print them on ₹50 state stamp paper or an e-Stamp sheet.",
                  },
                  {
                    step: 2,
                    title: "Sign at a Notary with Two Witnesses",
                    desc: "Take your Aadhaar and Ration Card to a Notary. Sign in front of two witnesses and get the book entry stamp.",
                  },
                  {
                    step: 3,
                    title: "Upload Files on Kerala e-District",
                    desc: "Log in to edistrict.kerala.gov.in or go to an Akshaya desk near your home. Pay the ₹15 web fee and upload clean PDF scans.",
                  },
                  {
                    step: 4,
                    title: "Village Officer Home Check & Neighbor Sign",
                    desc: "Your file goes to the local Village Office. Staff check your Ration Card and take notes from two local neighbors.",
                  },
                  {
                    step: 5,
                    title: "State Gazette Post & 30-Day Wait",
                    desc: "The Tahsildar sends the checked heir list to the Gazette. Any person gets 30 days from print date to raise a claim.",
                  },
                  {
                    step: 6,
                    title: "Get Digital Form 6C & Start Land Transfer",
                    desc: "Once 30 days end with no dispute, download signed Form 6C. Use it on the state land tax site to update your Thandaper name.",
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

              {/* Copyable Village Office Checklist Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Full Village Office Check List (10 Papers)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Save this list before you go to the Akshaya desk or Taluk hall.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(villageChecklistText, setCopiedChecklist)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>List Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 10-Item List</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* SECTION 8: PERSONAL LAWS IN KERALA */}
            <section
              id="personal-succession-laws"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>FAITH HEIR LAWS IN KERALA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Hindu, Christian &amp; Muslim Heir Rules in Kerala
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Taluk clerks do not use one set list for all faiths. The law depends on the faith
                  of the person who died:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Hindus (Hindu Succession Act, 1956):</strong> Spouse, sons, married or
                    single girls, and mother share as Class I heirs. A 1975 state law also ended
                    joint birth shares in Kerala.
                  </li>
                  <li>
                    <strong>Christians (Indian Succession Act, 1925 Part V):</strong> Under the{" "}
                    <em>Mary Roy v. State of Kerala (1986)</em> ruling, sons and girls take equal
                    shares. The spouse takes one-third when kids live.
                  </li>
                  <li>
                    <strong>Muslims (Muslim Personal Law / Shariat):</strong> The Village staff mark
                    down all Quranic sharers and kin. Spouse, kids, and living parents must all go
                    on the family tree table.
                  </li>
                </ul>
              </div>
            </section>

            {/* DUAL CONVERSION CTA BANNER INSIDE MAIN FLOW */}
            <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                    <Lock className="w-3 h-3 text-[#C65378]" />
                    <span>SKIP THE 45-DAY GAZETTE WAIT</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    Need Legal Help with Land Transfer or a Signed Will?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Under Kerala High Court rules, a clear signed Will lets your heirs update land
                    tax books right away with no 30-day Gazette wait. Or ask our team to run your
                    Form 6C file for you.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Write Your Will Now</span>
                  </button>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-colors"
                  >
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Book Land Transfer Help</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 9: REAL CASE STUDIES */}
            <section id="kerala-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>REAL STATE CASES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real Cases: Kozhikode, Kochi &amp; Thrissur
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 1: CHEVAYUR, KOZHIKODE</span>
                    <span className="text-slate-500 font-semibold">Two-Script Draft Fix</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Fixing Married Daughter Name Gap for Land Tax Transfer
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family in Kozhikode got a query because a married daughter had a new house
                    name on her Ration Card. They filed our two-script sworn draft with her school
                    book and marriage proof. The Village check cleared in 10 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 2: EDAPPALLY, KOCHI</span>
                    <span className="text-slate-500 font-semibold">Gulf NRI Heir Step</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Filing Form 6C While Eldest Son Lived in Dubai
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The elder son lived in Dubai and could not come home. He signed the sworn draft
                    and PoA at the Indian office in Dubai. His kin paid stamp duty at the Kochi
                    office and closed the land name change on time.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE 3: THRISSUR TALUK</span>
                    <span className="text-slate-500 font-semibold">Late Son Branch</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Adding Widow and Minor Child to Family Tree Table
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The first draft left out a late brother&apos;s wife and young son. Putting them
                    in the family tree grid stopped a claim dispute during the 30-day Gazette wait.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: OFFICIAL PORTALS & CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATE PORTALS &amp; LAWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Official Kerala Portals &amp; Legal References
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Kerala Land Tax Act, 1961 &amp; Transfer of Registry Rules, 1966:</strong>{" "}
                    Sets rules for Thandaper tax bills, Village checks, and Pokkuvaravu land name
                    changes.
                  </li>
                  <li>
                    <strong>Kerala Stamp Act, 1959 Schedule I Article 4:</strong> Fixes the ₹50
                    stamp rate for sworn forms and zero-duty pension or court exemptions.
                  </li>
                  <li>
                    <strong>Bharatiya Sakshya Adhiniyam (BSA), 2023 s. 61 &amp; s. 56:</strong>{" "}
                    Gives online e-District scans full force of law next to paper deeds.
                  </li>
                  <li>
                    <strong>Key Court Rulings:</strong> <em>Mary Roy v. State of Kerala (1986)</em>,{" "}
                    <em>Vineeta Sharma v. Rakesh Sharma (2020)</em>, and{" "}
                    <em>Kuruvila v. State of Kerala (2007)</em>.
                  </li>
                </ul>

                {/* Official External Portals (Verified 200 OK HTTPS) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href="https://edistrict.kerala.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    <span>e-District State Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://revenue.kerala.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Land Tax Web Desk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://highcourt.kerala.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>Kerala High Court</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    <span>India Code Laws</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Internal Hub & Spoke Links (Verified 200 OK Routes) */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/tools/kerala-tandapper-pokkuvaravu-mutation-checklist"
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                  >
                    Land Mutation Check Tool
                  </Link>
                  <Link
                    href="/templates/will-format-malayalam-maranapathram"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Malayalam Will Draft
                  </Link>
                  <Link
                    href="/locations/kerala"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    State Will &amp; Heir Guide
                  </Link>
                  <Link
                    href="/services/legal-heir"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Legal Heir Service
                  </Link>
                  <Link
                    href="/templates/affidavit-of-legal-heirs-pedigree-tree-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All-India Tree Format
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    View All Free Forms
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
                11. Frequently Asked Questions: Kerala Heirs
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

            {/* Plain-English Summary Cards (Matching Reference Footer Cards) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your spouse and kids safe. In Kerala, a signed Will helps you
                  skip the 30-day Gazette wait and speed up land name changes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Clean Stamp Paper Rule</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Print your heir draft on ₹50 stamp paper. Sign it at a Notary with two witnesses,
                  and add your full family tree list.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your Ration Card, tax bills, and family tree. We help you file
                  clean forms for Form 6C and land tax name changes.
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
                Works on Indian heir law, Kerala land transfer rules, NRI family proof, and Will
                drafts at AMA Legal.
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
                  <span>SKIP GAZETTE &amp; OFFICE DELAYS</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Keep Your Family Land Safe with a Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  A valid Will lets your heirs update land tax books right away under state court
                  rules without waiting 60 days.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Write Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Stamp Duty on State Wills</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - KERALA LEGAL HEIR & MUTATION HELP */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>LAND &amp; HEIR HELP DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need Help with Form 6C or Land Transfer?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our legal team helps home and Gulf NRI families draft clear forms, answer Village
                  queries, and finish land tax transfers.
                </p>
                <Link
                  href="/services/legal-heir"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Get Legal Heir Help</span>
                </Link>
                <Link
                  href="/contact"
                  className="block text-[11px] font-bold text-[#C65378] hover:underline"
                >
                  Talk to Our Legal Team
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Use Our Forms
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Portal Ready:</strong> Fits Village Desk and Taluk rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Two-Script Draft:</strong> English and local text side by side.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Gulf NRI Ready:</strong> Covers Embassy stamp and PoA steps.
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
          <span>Sworn Format</span>
        </a>
        <button
          type="button"
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Write a Will</span>
        </button>
      </div>
    </div>
  );
}
